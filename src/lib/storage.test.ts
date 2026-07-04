import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  createStore,
  exportAll,
  flushAllStores,
  importAll,
  rotateBackups,
  SAVE_DEBOUNCE_MS,
  type StoreDefinition,
} from './storage'

interface Widget {
  count: number
  label: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const KEY = 'playground:test-widget'

const defaults: Widget = { count: 0, label: 'fresh' }

function defineWidgetStore(
  overrides: Partial<StoreDefinition<Widget>> = {},
): StoreDefinition<Widget> {
  return {
    key: KEY,
    version: 1,
    defaults,
    ...overrides,
  }
}

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  localStorage.clear()
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('createStore: load()', () => {
  it('returns defaults when nothing is stored', () => {
    const store = createStore(defineWidgetStore())
    expect(store.load()).toEqual(defaults)
  })

  it('returned defaults are a deep clone, not a shared reference', () => {
    const store = createStore(defineWidgetStore())
    const first = store.load()
    first.count = 999
    const second = store.load()
    expect(second.count).toBe(0)
  })

  it('round-trips a value written with saveNow', () => {
    const store = createStore(defineWidgetStore())
    const value: Widget = { count: 5, label: 'saved' }
    store.saveNow(value)
    const reloaded = createStore(defineWidgetStore()).load()
    expect(reloaded).toEqual(value)
  })

  it('stores the envelope shape { v, data } under the namespaced key', () => {
    const store = createStore(defineWidgetStore())
    store.saveNow({ count: 3, label: 'x' })
    const raw = localStorage.getItem(KEY)
    expect(raw).not.toBeNull()
    if (raw === null) throw new Error('unreachable')
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) {
      throw new Error('envelope should be an object')
    }
    expect(parsed).toMatchObject({ v: 1, data: { count: 3, label: 'x' } })
  })

  it('falls back to defaults and stashes a backup on unparseable JSON', () => {
    localStorage.setItem(KEY, 'not json{{{')
    const store = createStore(defineWidgetStore())
    expect(store.load()).toEqual(defaults)
    expect(localStorage.getItem(`${KEY}:backup`)).toBe('not json{{{')
  })

  it('falls back to defaults and stashes a backup when parsed JSON is not a valid envelope', () => {
    const raw = JSON.stringify({ nope: true })
    localStorage.setItem(KEY, raw)
    const store = createStore(defineWidgetStore())
    expect(store.load()).toEqual(defaults)
    expect(localStorage.getItem(`${KEY}:backup`)).toBe(raw)
  })

  it('falls back to defaults and stashes a backup when v is not a number', () => {
    const raw = JSON.stringify({ v: 'one', data: { count: 1, label: 'a' } })
    localStorage.setItem(KEY, raw)
    const store = createStore(defineWidgetStore())
    expect(store.load()).toEqual(defaults)
    expect(localStorage.getItem(`${KEY}:backup`)).toBe(raw)
  })

  it('returns data unchanged when v === version', () => {
    const raw = JSON.stringify({ v: 1, data: { count: 42, label: 'match' } })
    localStorage.setItem(KEY, raw)
    const store = createStore(defineWidgetStore())
    expect(store.load()).toEqual({ count: 42, label: 'match' })
  })

  it('calls migrate with the old version and raw data when v < version', () => {
    const raw = JSON.stringify({ v: 1, data: { count: 7 } })
    localStorage.setItem(KEY, raw)
    const migrate = vi.fn((fromVersion: number, data: unknown): Widget | null => {
      if (
        fromVersion === 1 &&
        typeof data === 'object' &&
        data !== null &&
        'count' in data
      ) {
        const count = data.count
        if (typeof count === 'number') {
          return { count, label: 'migrated' }
        }
      }
      return null
    })
    const store = createStore(defineWidgetStore({ version: 2, migrate }))
    const result = store.load()
    expect(migrate).toHaveBeenCalledTimes(1)
    expect(migrate).toHaveBeenCalledWith(1, { count: 7 })
    expect(result).toEqual({ count: 7, label: 'migrated' })
  })

  it('returns defaults when migrate returns null', () => {
    const raw = JSON.stringify({ v: 1, data: { count: 7 } })
    localStorage.setItem(KEY, raw)
    const migrate = (): Widget | null => null
    const store = createStore(defineWidgetStore({ version: 2, migrate }))
    expect(store.load()).toEqual(defaults)
  })

  it('returns defaults when v < version and no migrate function is provided', () => {
    const raw = JSON.stringify({ v: 1, data: { count: 7, label: 'old' } })
    localStorage.setItem(KEY, raw)
    const store = createStore(defineWidgetStore({ version: 2 }))
    expect(store.load()).toEqual(defaults)
  })

  it('falls back to defaults and stashes a backup when v > version (future data)', () => {
    const raw = JSON.stringify({ v: 5, data: { count: 99, label: 'future' } })
    localStorage.setItem(KEY, raw)
    const store = createStore(defineWidgetStore({ version: 1 }))
    expect(store.load()).toEqual(defaults)
    expect(localStorage.getItem(`${KEY}:backup`)).toBe(raw)
  })
})

describe('createStore: save() debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('does not write synchronously', () => {
    const store = createStore(defineWidgetStore())
    store.save({ count: 1, label: 'debounced' })
    expect(localStorage.getItem(KEY)).toBeNull()
  })

  it('writes after SAVE_DEBOUNCE_MS elapses', () => {
    const store = createStore(defineWidgetStore())
    store.save({ count: 1, label: 'debounced' })
    vi.advanceTimersByTime(SAVE_DEBOUNCE_MS)
    const raw = localStorage.getItem(KEY)
    expect(raw).not.toBeNull()
    if (raw === null) throw new Error('unreachable')
    expect(JSON.parse(raw)).toMatchObject({ data: { count: 1, label: 'debounced' } })
  })

  it('coalesces rapid saves into a single write of the latest value', () => {
    const store = createStore(defineWidgetStore())
    store.save({ count: 1, label: 'first' })
    vi.advanceTimersByTime(SAVE_DEBOUNCE_MS / 2)
    store.save({ count: 2, label: 'second' })
    vi.advanceTimersByTime(SAVE_DEBOUNCE_MS / 2)
    // First timer should have been reset by the second save; still nothing written.
    expect(localStorage.getItem(KEY)).toBeNull()
    vi.advanceTimersByTime(SAVE_DEBOUNCE_MS / 2)
    const raw = localStorage.getItem(KEY)
    expect(raw).not.toBeNull()
    if (raw === null) throw new Error('unreachable')
    expect(JSON.parse(raw)).toMatchObject({ data: { count: 2, label: 'second' } })
  })

  it('saveNow writes immediately and cancels a pending debounced save', () => {
    const store = createStore(defineWidgetStore())
    store.save({ count: 1, label: 'pending' })
    store.saveNow({ count: 2, label: 'immediate' })
    const raw = localStorage.getItem(KEY)
    expect(raw).not.toBeNull()
    if (raw === null) throw new Error('unreachable')
    expect(JSON.parse(raw)).toMatchObject({ data: { count: 2, label: 'immediate' } })

    vi.advanceTimersByTime(SAVE_DEBOUNCE_MS)
    const rawAfter = localStorage.getItem(KEY)
    if (rawAfter === null) throw new Error('unreachable')
    // The cancelled pending save from before saveNow must not overwrite it later.
    expect(JSON.parse(rawAfter)).toMatchObject({ data: { count: 2, label: 'immediate' } })
  })

  it('flushes a pending debounced write on pagehide', () => {
    const store = createStore(defineWidgetStore())
    store.save({ count: 3, label: 'flush-me' })
    expect(localStorage.getItem(KEY)).toBeNull()
    window.dispatchEvent(new Event('pagehide'))
    const raw = localStorage.getItem(KEY)
    expect(raw).not.toBeNull()
    if (raw === null) throw new Error('unreachable')
    expect(JSON.parse(raw)).toMatchObject({ data: { count: 3, label: 'flush-me' } })
  })

  it('pagehide is a no-op when there is no pending save', () => {
    const store = createStore(defineWidgetStore())
    store.saveNow({ count: 9, label: 'settled' })
    window.dispatchEvent(new Event('pagehide'))
    const raw = localStorage.getItem(KEY)
    if (raw === null) throw new Error('unreachable')
    expect(JSON.parse(raw)).toMatchObject({ data: { count: 9, label: 'settled' } })
  })

  it('flushes a pending debounced write when document becomes hidden', () => {
    const store = createStore(defineWidgetStore())
    store.save({ count: 4, label: 'hide-me' })
    expect(localStorage.getItem(KEY)).toBeNull()
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get: () => 'hidden',
    })
    document.dispatchEvent(new Event('visibilitychange'))
    const raw = localStorage.getItem(KEY)
    expect(raw).not.toBeNull()
    if (raw === null) throw new Error('unreachable')
    expect(JSON.parse(raw)).toMatchObject({ data: { count: 4, label: 'hide-me' } })
  })

  it('visibilitychange is a no-op when the document becomes visible (not hidden)', () => {
    const store = createStore(defineWidgetStore())
    store.save({ count: 5, label: 'still-pending' })
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get: () => 'visible',
    })
    document.dispatchEvent(new Event('visibilitychange'))
    expect(localStorage.getItem(KEY)).toBeNull()
    vi.advanceTimersByTime(SAVE_DEBOUNCE_MS)
    const raw = localStorage.getItem(KEY)
    if (raw === null) throw new Error('unreachable')
    expect(JSON.parse(raw)).toMatchObject({ data: { count: 5, label: 'still-pending' } })
  })

  it('flushAllStores immediately writes pending saves across multiple stores', () => {
    interface OtherWidget {
      total: number
    }
    const store = createStore(defineWidgetStore())
    const otherStore = createStore<OtherWidget>({
      key: 'playground:test-other-widget',
      version: 1,
      defaults: { total: 0 },
    })

    store.save({ count: 6, label: 'flush-all-1' })
    otherStore.save({ total: 42 })
    expect(localStorage.getItem(KEY)).toBeNull()
    expect(localStorage.getItem('playground:test-other-widget')).toBeNull()

    flushAllStores()

    const raw = localStorage.getItem(KEY)
    const otherRaw = localStorage.getItem('playground:test-other-widget')
    expect(raw).not.toBeNull()
    expect(otherRaw).not.toBeNull()
    if (raw === null || otherRaw === null) throw new Error('unreachable')
    expect(JSON.parse(raw)).toMatchObject({ data: { count: 6, label: 'flush-all-1' } })
    expect(JSON.parse(otherRaw)).toMatchObject({ data: { total: 42 } })

    localStorage.removeItem('playground:test-other-widget')
  })

  it('flushAllStores is a no-op when there is nothing pending', () => {
    const store = createStore(defineWidgetStore())
    store.saveNow({ count: 9, label: 'already-settled' })
    expect(() => flushAllStores()).not.toThrow()
    const raw = localStorage.getItem(KEY)
    if (raw === null) throw new Error('unreachable')
    expect(JSON.parse(raw)).toMatchObject({ data: { count: 9, label: 'already-settled' } })
  })
})

describe('createStore: clear()', () => {
  it('removes the stored key', () => {
    const store = createStore(defineWidgetStore())
    store.saveNow({ count: 1, label: 'x' })
    store.clear()
    expect(localStorage.getItem(KEY)).toBeNull()
    expect(store.load()).toEqual(defaults)
  })

  it('removes the backup key', () => {
    localStorage.setItem(KEY, 'garbage')
    const store = createStore(defineWidgetStore())
    store.load() // populates backup
    expect(localStorage.getItem(`${KEY}:backup`)).not.toBeNull()
    store.clear()
    expect(localStorage.getItem(`${KEY}:backup`)).toBeNull()
  })

  it('cancels a pending debounced write', () => {
    vi.useFakeTimers()
    const store = createStore(defineWidgetStore())
    store.save({ count: 1, label: 'pending' })
    store.clear()
    vi.advanceTimersByTime(SAVE_DEBOUNCE_MS * 2)
    expect(localStorage.getItem(KEY)).toBeNull()
  })
})

describe('createStore: failure handling', () => {
  it('warns and does not crash when localStorage.setItem throws', () => {
    // happy-dom's localStorage binds/caches its methods as own properties on
    // first access via an internal Proxy, so mutating the shared instance's
    // setItem (directly or via vi.spyOn(Storage.prototype, ...)) leaks into
    // later tests. Swap in a throwing Storage-shaped stand-in instead.
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const realLocalStorage = window.localStorage
    const throwingStorage: Storage = {
      length: 0,
      clear: () => {},
      getItem: () => null,
      key: () => null,
      removeItem: () => {},
      setItem: () => {
        throw new Error('QuotaExceededError')
      },
    }
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: throwingStorage,
    })
    try {
      const store = createStore(defineWidgetStore())
      expect(() => store.saveNow({ count: 1, label: 'x' })).not.toThrow()
      expect(warnSpy).toHaveBeenCalled()
    } finally {
      Object.defineProperty(window, 'localStorage', {
        configurable: true,
        value: realLocalStorage,
      })
    }
  })
})

describe('exportAll / importAll', () => {
  it('exportAll includes only playground: namespaced keys as raw strings', () => {
    const store = createStore(defineWidgetStore())
    store.saveNow({ count: 1, label: 'exported' })
    localStorage.setItem('other-app:setting', 'should-not-appear')

    const json = exportAll()
    const parsed: unknown = JSON.parse(json)
    if (!isRecord(parsed)) {
      throw new Error('exportAll should return an object')
    }
    expect(typeof parsed[KEY]).toBe('string')
    expect(parsed['other-app:setting']).toBeUndefined()
  })

  it('round-trips exportAll -> clear -> importAll', () => {
    const store = createStore(defineWidgetStore())
    store.saveNow({ count: 12, label: 'round-trip' })
    const exported = exportAll()

    localStorage.clear()
    expect(store.load()).toEqual(defaults)

    const result = importAll(exported)
    expect(result).toEqual({ ok: true })
    expect(store.load()).toEqual({ count: 12, label: 'round-trip' })
  })

  it('importAll only writes playground: namespaced keys, silently skipping others', () => {
    const json = JSON.stringify({
      [KEY]: JSON.stringify({ v: 1, data: { count: 4, label: 'kept' } }),
      'other-app:setting': 'nope',
    })
    const result = importAll(json)
    expect(result).toEqual({ ok: true })
    expect(localStorage.getItem('other-app:setting')).toBeNull()
    const store = createStore(defineWidgetStore())
    expect(store.load()).toEqual({ count: 4, label: 'kept' })
  })

  it('importAll rejects non-JSON input and writes nothing', () => {
    const before = localStorage.getItem(KEY)
    const result = importAll('not json at all')
    expect(result.ok).toBe(false)
    if (result.ok) throw new Error('unreachable')
    expect(typeof result.error).toBe('string')
    expect(localStorage.getItem(KEY)).toBe(before)
  })

  it('importAll rejects a JSON array and writes nothing', () => {
    const result = importAll(JSON.stringify([1, 2, 3]))
    expect(result.ok).toBe(false)
  })

  it('importAll rejects an object with non-string values and writes nothing', () => {
    const result = importAll(JSON.stringify({ [KEY]: { v: 1, data: {} } }))
    expect(result.ok).toBe(false)
    expect(localStorage.getItem(KEY)).toBeNull()
  })
})

const META_KEY = 'playground:backup:meta'
const TWENTY_HOURS_MS = 20 * 60 * 60 * 1000

describe('rotateBackups', () => {
  it('copies namespaced keys into a slotted backup and advances the slot / meta', () => {
    localStorage.setItem(KEY, 'value-for-key')
    localStorage.setItem('playground:other', 'value-for-other')

    rotateBackups()

    expect(localStorage.getItem(`playground:backup:0:${KEY}`)).toBe('value-for-key')
    expect(localStorage.getItem('playground:backup:0:playground:other')).toBe(
      'value-for-other',
    )

    const rawMeta = localStorage.getItem(META_KEY)
    expect(rawMeta).not.toBeNull()
    if (rawMeta === null) throw new Error('unreachable')
    const meta: unknown = JSON.parse(rawMeta)
    if (typeof meta !== 'object' || meta === null || !('slot' in meta) || !('at' in meta)) {
      throw new Error('meta should be an object with slot and at')
    }
    expect(meta.slot).toBe(1)
    expect(typeof meta.at).toBe('number')
  })

  it('cycles the slot through 0, 1, 2 and back to 0', () => {
    localStorage.setItem(KEY, 'v0')
    rotateBackups()
    expect(JSON.parse(localStorage.getItem(META_KEY) ?? '{}')).toMatchObject({ slot: 1 })

    localStorage.setItem(META_KEY, JSON.stringify({ slot: 1, at: 0 }))
    localStorage.setItem(KEY, 'v1')
    rotateBackups()
    expect(localStorage.getItem(`playground:backup:1:${KEY}`)).toBe('v1')
    expect(JSON.parse(localStorage.getItem(META_KEY) ?? '{}')).toMatchObject({ slot: 2 })

    localStorage.setItem(META_KEY, JSON.stringify({ slot: 2, at: 0 }))
    localStorage.setItem(KEY, 'v2')
    rotateBackups()
    expect(localStorage.getItem(`playground:backup:2:${KEY}`)).toBe('v2')
    expect(JSON.parse(localStorage.getItem(META_KEY) ?? '{}')).toMatchObject({ slot: 0 })
  })

  it('does not touch playground:backup: keys as rotation sources', () => {
    localStorage.setItem(KEY, 'real-value')
    rotateBackups()
    // Force a second rotation regardless of freshness to inspect what got copied.
    localStorage.setItem(META_KEY, JSON.stringify({ slot: 1, at: 0 }))
    rotateBackups()
    // The slot-0 backup written by the first rotation must not itself have been
    // re-copied into a new "playground:backup:0:playground:backup:..." key.
    const keys: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k !== null) keys.push(k)
    }
    expect(keys.some((k) => k.includes('backup:1:playground:backup'))).toBe(false)
  })

  it('skips rotation entirely when existing meta.at is younger than 20 hours', () => {
    const recentAt = Date.now() - (TWENTY_HOURS_MS - 60_000)
    localStorage.setItem(META_KEY, JSON.stringify({ slot: 0, at: recentAt }))
    localStorage.setItem(KEY, 'should-not-be-copied')

    rotateBackups()

    expect(localStorage.getItem(`playground:backup:0:${KEY}`)).toBeNull()
    expect(JSON.parse(localStorage.getItem(META_KEY) ?? '{}')).toMatchObject({
      slot: 0,
      at: recentAt,
    })
  })

  it('rotates when existing meta.at is 20 hours old or older', () => {
    const oldAt = Date.now() - (TWENTY_HOURS_MS + 60_000)
    localStorage.setItem(META_KEY, JSON.stringify({ slot: 0, at: oldAt }))
    localStorage.setItem(KEY, 'should-be-copied')

    rotateBackups()

    expect(localStorage.getItem(`playground:backup:0:${KEY}`)).toBe('should-be-copied')
    const meta: unknown = JSON.parse(localStorage.getItem(META_KEY) ?? '{}')
    expect(meta).toMatchObject({ slot: 1 })
    if (typeof meta !== 'object' || meta === null || !('at' in meta)) {
      throw new Error('meta should have at')
    }
    expect(meta.at).not.toBe(oldAt)
  })

  it('recovers from corrupt meta by rotating as if starting fresh', () => {
    localStorage.setItem(META_KEY, 'not json{{{')
    localStorage.setItem(KEY, 'value-after-corrupt-meta')

    expect(() => rotateBackups()).not.toThrow()

    expect(localStorage.getItem(`playground:backup:0:${KEY}`)).toBe('value-after-corrupt-meta')
    const meta: unknown = JSON.parse(localStorage.getItem(META_KEY) ?? '{}')
    expect(meta).toMatchObject({ slot: 1 })
  })

  it('recovers from meta with the wrong shape by rotating as if starting fresh', () => {
    localStorage.setItem(META_KEY, JSON.stringify({ nope: true }))
    localStorage.setItem(KEY, 'value-after-bad-shape-meta')

    expect(() => rotateBackups()).not.toThrow()

    expect(localStorage.getItem(`playground:backup:0:${KEY}`)).toBe(
      'value-after-bad-shape-meta',
    )
  })
})
