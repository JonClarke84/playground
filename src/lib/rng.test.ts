import { describe, expect, it } from 'vitest'
import { mulberry32, pick, shuffle } from './rng'

describe('mulberry32', () => {
  it('is deterministic for a given seed', () => {
    const a = mulberry32(42)
    const b = mulberry32(42)
    const seqA = [a(), a(), a(), a()]
    const seqB = [b(), b(), b(), b()]
    expect(seqA).toEqual(seqB)
  })

  it('produces values in [0, 1)', () => {
    const rng = mulberry32(7)
    for (let i = 0; i < 1000; i++) {
      const v = rng()
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThan(1)
    }
  })

  it('differs across seeds', () => {
    expect(mulberry32(1)()).not.toEqual(mulberry32(2)())
  })
})

describe('shuffle', () => {
  it('returns a permutation without mutating the input', () => {
    const input = [1, 2, 3, 4, 5, 6]
    const frozen = [...input]
    const result = shuffle(input, mulberry32(3))
    expect(input).toEqual(frozen)
    expect([...result].sort((x, y) => x - y)).toEqual(frozen)
  })

  it('actually reorders across seeds (sanity)', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8]
    const outputs = new Set(
      [1, 2, 3, 4, 5].map((seed) => shuffle(input, mulberry32(seed)).join(',')),
    )
    expect(outputs.size).toBeGreaterThan(1)
  })
})

describe('pick', () => {
  it('picks a member of the array', () => {
    const items = ['a', 'b', 'c']
    const rng = mulberry32(9)
    for (let i = 0; i < 50; i++) {
      expect(items).toContain(pick(items, rng))
    }
  })

  it('throws on empty input', () => {
    expect(() => pick([], mulberry32(1))).toThrow()
  })
})
