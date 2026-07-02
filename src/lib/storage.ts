/**
 * Versioned localStorage persistence (PRODUCT.md §7.4).
 *
 * Every stored blob is wrapped in an envelope `{ v, data }` under a
 * namespaced key (e.g. "playground:spell-duel"). Loads never throw: bad
 * data is stashed under a `:backup` key and defaults are returned instead.
 * Writes are debounced; a 'pagehide' listener flushes any pending write so
 * progress survives closing the tab.
 */

export const SAVE_DEBOUNCE_MS = 300

const BACKUP_SUFFIX = ':backup'
const NAMESPACE_PREFIX = 'playground:'

export interface StoreDefinition<T> {
  key: string
  version: number
  defaults: T
  migrate?: (fromVersion: number, data: unknown) => T | null
}

export interface PersistedStore<T> {
  load(): T
  save(value: T): void
  saveNow(value: T): void
  clear(): void
}

interface Envelope<T> {
  v: number
  data: T
}

function hasOwn(value: object, prop: string): value is Record<string, unknown> {
  return Object.prototype.hasOwnProperty.call(value, prop)
}

/**
 * Validates the envelope shape only (`v` is a number, `data` is present).
 * The generic `T` on the returned guard is a trust boundary, identical in
 * spirit to `JSON.parse`'s own `any` return type: we cannot verify an
 * arbitrary caller-supplied shape at runtime, only the envelope wrapper.
 */
function isEnvelope<T>(value: unknown): value is Envelope<T> {
  if (typeof value !== 'object' || value === null) return false
  if (!hasOwn(value, 'v') || !hasOwn(value, 'data')) return false
  return typeof value.v === 'number'
}

/** Deep clone via structuredClone so callers never share mutable state with the store. */
function cloneValue<T>(value: T): T {
  return structuredClone(value)
}

function readRaw(key: string): string | null {
  return localStorage.getItem(key)
}

function stashBackup(key: string, raw: string): void {
  try {
    localStorage.setItem(`${key}${BACKUP_SUFFIX}`, raw)
  } catch (error) {
    console.warn(`storage: failed to write backup for "${key}"`, error)
  }
}

function writeEnvelope<T>(key: string, version: number, value: T): void {
  let serialized: string
  try {
    serialized = JSON.stringify({ v: version, data: value })
  } catch (error) {
    console.warn(`storage: failed to serialize value for "${key}"`, error)
    return
  }
  try {
    localStorage.setItem(key, serialized)
  } catch (error) {
    console.warn(`storage: failed to write "${key}"`, error)
  }
}

export function createStore<T>(def: StoreDefinition<T>): PersistedStore<T> {
  let pendingTimer: ReturnType<typeof setTimeout> | null = null
  // Pending state is wrapped in a single-field box so a store of a nullable
  // or `undefined`-inclusive T can legitimately debounce such a save without
  // it being confused with "nothing pending" (no sentinel value needed).
  let pending: { value: T } | null = null

  function flushPending(): void {
    if (pendingTimer === null) return
    clearTimeout(pendingTimer)
    pendingTimer = null
    if (pending !== null) {
      writeEnvelope(def.key, def.version, pending.value)
      pending = null
    }
  }

  function cancelPending(): void {
    if (pendingTimer !== null) {
      clearTimeout(pendingTimer)
      pendingTimer = null
    }
    pending = null
  }

  window.addEventListener('pagehide', flushPending)

  function load(): T {
    const raw = readRaw(def.key)
    if (raw === null) {
      return cloneValue(def.defaults)
    }

    let parsed: unknown
    try {
      parsed = JSON.parse(raw)
    } catch {
      stashBackup(def.key, raw)
      return cloneValue(def.defaults)
    }

    if (!isEnvelope<T>(parsed)) {
      stashBackup(def.key, raw)
      return cloneValue(def.defaults)
    }

    if (parsed.v === def.version) {
      return parsed.data
    }

    if (parsed.v < def.version) {
      if (!def.migrate) {
        return cloneValue(def.defaults)
      }
      const migrated = def.migrate(parsed.v, parsed.data)
      return migrated === null ? cloneValue(def.defaults) : migrated
    }

    // parsed.v > def.version: data from a newer version (e.g. restored from
    // another device running a newer build). Preserve it, don't guess.
    stashBackup(def.key, raw)
    return cloneValue(def.defaults)
  }

  function save(value: T): void {
    if (pendingTimer !== null) {
      clearTimeout(pendingTimer)
    }
    pending = { value }
    pendingTimer = setTimeout(() => {
      pendingTimer = null
      if (pending !== null) {
        writeEnvelope(def.key, def.version, pending.value)
        pending = null
      }
    }, SAVE_DEBOUNCE_MS)
  }

  function saveNow(value: T): void {
    cancelPending()
    writeEnvelope(def.key, def.version, value)
  }

  function clear(): void {
    cancelPending()
    localStorage.removeItem(def.key)
    localStorage.removeItem(`${def.key}${BACKUP_SUFFIX}`)
  }

  return { load, save, saveNow, clear }
}

export function exportAll(): string {
  const result: Record<string, string> = {}
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key === null || !key.startsWith(NAMESPACE_PREFIX)) continue
    const value = localStorage.getItem(key)
    if (value !== null) {
      result[key] = value
    }
  }
  return JSON.stringify(result)
}

function isStringRecord(value: unknown): value is Record<string, string> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false
  }
  return Object.values(value).every((entry) => typeof entry === 'string')
}

export function importAll(json: string): { ok: true } | { ok: false; error: string } {
  let parsed: unknown
  try {
    parsed = JSON.parse(json)
  } catch {
    return { ok: false, error: 'importAll: input is not valid JSON' }
  }

  if (!isStringRecord(parsed)) {
    return {
      ok: false,
      error: 'importAll: input must be an object mapping keys to string values',
    }
  }

  for (const [key, value] of Object.entries(parsed)) {
    if (!key.startsWith(NAMESPACE_PREFIX)) continue
    try {
      localStorage.setItem(key, value)
    } catch (error) {
      console.warn(`storage: failed to import "${key}"`, error)
    }
  }

  return { ok: true }
}
