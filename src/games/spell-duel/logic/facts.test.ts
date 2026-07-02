import { describe, expect, it } from 'vitest'
import { factKey, factsForTables, parseFactKey, product } from './facts'

describe('factKey', () => {
  it('puts the smaller factor first', () => {
    expect(factKey(6, 7)).toBe('6x7')
  })

  it('is canonical regardless of argument order', () => {
    expect(factKey(7, 6)).toBe('6x7')
    expect(factKey(6, 7)).toBe(factKey(7, 6))
  })

  it('handles equal factors', () => {
    expect(factKey(8, 8)).toBe('8x8')
  })

  it('handles the low end of the range', () => {
    expect(factKey(2, 3)).toBe('2x3')
    expect(factKey(3, 2)).toBe('2x3')
  })

  it('handles the high end of the range', () => {
    expect(factKey(12, 11)).toBe('11x12')
  })
})

describe('parseFactKey', () => {
  it('parses a canonical key back into a Fact', () => {
    expect(parseFactKey('6x7')).toEqual({ a: 6, b: 7 })
  })

  it('parses single-digit factors', () => {
    expect(parseFactKey('2x3')).toEqual({ a: 2, b: 3 })
  })

  it('parses double-digit factors', () => {
    expect(parseFactKey('11x12')).toEqual({ a: 11, b: 12 })
  })

  it('round-trips with factKey', () => {
    const key = factKey(9, 4)
    expect(parseFactKey(key)).toEqual({ a: 4, b: 9 })
  })

  it('throws on malformed input missing the separator', () => {
    expect(() => parseFactKey('67')).toThrow()
  })

  it('throws on malformed input with a bad separator', () => {
    expect(() => parseFactKey('6-7')).toThrow()
  })

  it('throws on non-numeric parts', () => {
    expect(() => parseFactKey('ax7')).toThrow()
  })

  it('throws on empty string', () => {
    expect(() => parseFactKey('')).toThrow()
  })

  it('throws on trailing garbage', () => {
    expect(() => parseFactKey('6x7x8')).toThrow()
  })
})

describe('product', () => {
  it('multiplies the two factors', () => {
    expect(product({ a: 6, b: 7 })).toBe(42)
  })

  it('handles equal factors', () => {
    expect(product({ a: 8, b: 8 })).toBe(64)
  })
})

describe('factsForTables', () => {
  it('returns [] for empty input', () => {
    expect(factsForTables([])).toEqual([])
  })

  it('ignores table values outside 2..12', () => {
    expect(factsForTables([1, 13, 0, -5])).toEqual([])
  })

  it('returns all facts 2..12 for a single table, deduped and canonical', () => {
    const facts = factsForTables([2])
    // every fact with a==2 (min) paired with b in 2..12, PLUS other tables paired with 2 only via that same set
    // canonical facts where at least one factor is 2 and both factors in 2..12
    const expectedKeys = new Set<string>()
    for (let other = 2; other <= 12; other++) {
      expectedKeys.add(factKey(2, other))
    }
    expect(facts.map((f) => factKey(f.a, f.b)).sort()).toEqual([...expectedKeys].sort())
  })

  it('dedupes overlapping facts across multiple selected tables', () => {
    const facts = factsForTables([6, 7])
    const keys = facts.map((f) => factKey(f.a, f.b))
    expect(new Set(keys).size).toBe(keys.length)
    // 6x7 should appear exactly once even though both 6 and 7 are selected
    expect(keys.filter((k) => k === '6x7')).toHaveLength(1)
  })

  it('dedupes duplicate values in the input tables array', () => {
    const a = factsForTables([5])
    const b = factsForTables([5, 5, 5])
    expect(b.map((f) => factKey(f.a, f.b))).toEqual(a.map((f) => factKey(f.a, f.b)))
  })

  it('ignores out-of-range table values mixed with valid ones', () => {
    const withNoise = factsForTables([5, 1, 13])
    const clean = factsForTables([5])
    expect(withNoise).toEqual(clean)
  })

  it('is stably sorted by a then b', () => {
    const facts = factsForTables([3, 9])
    for (let i = 1; i < facts.length; i++) {
      const prev = facts[i - 1]
      const cur = facts[i]
      const inOrder = prev.a < cur.a || (prev.a === cur.a && prev.b <= cur.b)
      expect(inOrder).toBe(true)
    }
  })

  it('only includes facts where both factors are within 2..12', () => {
    const facts = factsForTables([12])
    for (const f of facts) {
      expect(f.a).toBeGreaterThanOrEqual(2)
      expect(f.a).toBeLessThanOrEqual(12)
      expect(f.b).toBeGreaterThanOrEqual(2)
      expect(f.b).toBeLessThanOrEqual(12)
    }
  })

  it('every returned fact has at least one factor in the selected tables', () => {
    const tables = [4, 8]
    const facts = factsForTables(tables)
    for (const f of facts) {
      expect(tables.includes(f.a) || tables.includes(f.b)).toBe(true)
    }
  })

  it('produces the same result regardless of table order', () => {
    const a = factsForTables([4, 9, 2])
    const b = factsForTables([2, 9, 4])
    expect(a).toEqual(b)
  })

  it('returns facts with canonical ordering (a <= b)', () => {
    const facts = factsForTables([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    for (const f of facts) {
      expect(f.a).toBeLessThanOrEqual(f.b)
    }
  })

  it('produces the full 2..12 grid (unique canonical facts) when all tables selected', () => {
    const facts = factsForTables([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    const expected = new Set<string>()
    for (let a = 2; a <= 12; a++) {
      for (let b = a; b <= 12; b++) {
        expected.add(factKey(a, b))
      }
    }
    expect(new Set(facts.map((f) => factKey(f.a, f.b)))).toEqual(expected)
    expect(facts).toHaveLength(expected.size)
  })
})
