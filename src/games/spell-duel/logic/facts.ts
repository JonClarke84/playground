import type { Fact, FactKey } from './types'

const MIN_TABLE = 2
const MAX_TABLE = 12

/** Canonical fact key: smaller factor first, e.g. "6x7" for both 7×6 and 6×7. */
export function factKey(a: number, b: number): FactKey {
  const min = Math.min(a, b)
  const max = Math.max(a, b)
  return `${min}x${max}`
}

/** Parses a canonical fact key ("6x7") back into a Fact. Throws on malformed input. */
export function parseFactKey(key: FactKey): Fact {
  const match = /^(\d+)x(\d+)$/.exec(key)
  if (!match) {
    throw new Error(`parseFactKey: malformed key "${key}"`)
  }
  const a = Number(match[1])
  const b = Number(match[2])
  return { a, b }
}

/** The product of a fact's two factors. */
export function product(fact: Fact): number {
  return fact.a * fact.b
}

const isValidTable = (n: number): boolean => n >= MIN_TABLE && n <= MAX_TABLE

/**
 * All unique canonical facts {min, max} where at least one factor is a
 * selected table and both factors are within 2..12. Out-of-range table
 * values are ignored; duplicate table values are deduped. Result is stably
 * sorted by a then b.
 */
export function factsForTables(tables: number[]): Fact[] {
  const selected = new Set(tables.filter(isValidTable))
  if (selected.size === 0) return []

  const keys = new Set<FactKey>()
  for (const table of selected) {
    for (let other = MIN_TABLE; other <= MAX_TABLE; other++) {
      keys.add(factKey(table, other))
    }
  }

  const facts = [...keys].map(parseFactKey)
  facts.sort((x, y) => (x.a - y.a) || (x.b - y.b))
  return facts
}
