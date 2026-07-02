import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  createStore,
  exportAll,
  importAll,
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
