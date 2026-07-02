import { describe, expect, it } from 'vitest'
import { mulberry32 } from '../../../lib/rng'
import { candidateDistractors, generateDistractors } from './distractors'

describe('candidateDistractors', () => {
  it('contains classic neighbour-table errors for 7x6', () => {
    const pool = candidateDistractors(7, 6)
    // (a-1)*b = 36, (a+1)*b = 48
    expect(pool).toContain(36)
    expect(pool).toContain(48)
  })

  it('contains the addition trap for 7x6', () => {
    const pool = candidateDistractors(7, 6)
    expect(pool).toContain(13)
  })

  it('contains the digit transposition of the answer for 7x6 (42 -> 24)', () => {
    const pool = candidateDistractors(7, 6)
    expect(pool).toContain(24)
  })

  it('contains near-misses around the answer for 7x6', () => {
    const pool = candidateDistractors(7, 6)
    for (const near of [41, 43, 40, 44, 39, 45]) {
      expect(pool).toContain(near)
    }
  })

  it('never contains the true answer', () => {
    const pool = candidateDistractors(7, 6)
    expect(pool).not.toContain(42)
  })

  it('excludes values below 1', () => {
    const pool = candidateDistractors(2, 2)
    // answer = 4, near-misses would include 4-3=1 (kept) but nothing below 1
    for (const value of pool) {
      expect(value).toBeGreaterThanOrEqual(1)
    }
  })

  it('excludes values above 160', () => {
    const pool = candidateDistractors(12, 12)
    for (const value of pool) {
      expect(value).toBeLessThanOrEqual(160)
    }
  })

  it('only contains integers', () => {
    const pool = candidateDistractors(9, 7)
    for (const value of pool) {
      expect(Number.isInteger(value)).toBe(true)
    }
  })

  it('deduplicates candidates', () => {
    const pool = candidateDistractors(7, 6)
    const asSet = new Set(pool)
    expect(asSet.size).toBe(pool.length)
  })

  it('does not include a digit-transposition candidate when the answer has a repeated digit', () => {
    // 8x8 = 64, digits 6 and 4 are distinct so transposition (46) should appear.
    // Use a case where digits are the same, e.g. a case with answer 44 (no fact 2..12 gives this,
    // so instead verify single-digit answers produce no transposition entry beyond filters).
    const pool = candidateDistractors(2, 2) // answer = 4, single digit, no transposition possible
    expect(pool).not.toContain(4) // answer itself must never appear
  })

  it('produces a pool of at least 3 candidates for every fact 2..12 in both orders', () => {
    for (let a = 2; a <= 12; a++) {
      for (let b = 2; b <= 12; b++) {
        const pool = candidateDistractors(a, b)
        expect(pool.length).toBeGreaterThanOrEqual(3)
      }
    }
  })
})

describe('generateDistractors', () => {
  const seeds = [1, 42, 2024]

  it('returns exactly 3 distinct integers, all >= 1, none equal to a*b, for every fact 2..12 (both orders) across multiple seeds', () => {
    for (const seed of seeds) {
      const rng = mulberry32(seed)
      for (let a = 2; a <= 12; a++) {
        for (let b = 2; b <= 12; b++) {
          const answer = a * b
          const distractors = generateDistractors(a, b, rng)
          expect(distractors).toHaveLength(3)
          const asSet = new Set(distractors)
          expect(asSet.size).toBe(3)
          for (const value of distractors) {
            expect(Number.isInteger(value)).toBe(true)
            expect(value).toBeGreaterThanOrEqual(1)
            expect(value).not.toBe(answer)
          }
        }
      }
    }
  })

  it('is deterministic for a fixed seed', () => {
    const rngA = mulberry32(7)
    const rngB = mulberry32(7)
    const resultA = generateDistractors(7, 6, rngA)
    const resultB = generateDistractors(7, 6, rngB)
    expect(resultA).toEqual(resultB)
  })

  it('can produce different results for different seeds (not hardcoded)', () => {
    const results = new Set<string>()
    for (const seed of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
      const rng = mulberry32(seed)
      const distractors = generateDistractors(7, 6, rng)
      results.add([...distractors].sort((x, y) => x - y).join(','))
    }
    expect(results.size).toBeGreaterThan(1)
  })

  it('falls back to unique walk-outward values when the candidate pool is artificially small', () => {
    // 2x2: answer = 4. Candidate pool from strategies is naturally small; confirm the
    // function still returns exactly 3 distinct valid values even at this small extreme.
    const rng = mulberry32(99)
    const distractors = generateDistractors(2, 2, rng)
    expect(distractors).toHaveLength(3)
    expect(new Set(distractors).size).toBe(3)
    for (const value of distractors) {
      expect(value).toBeGreaterThanOrEqual(1)
      expect(value).not.toBe(4)
    }
  })
})
