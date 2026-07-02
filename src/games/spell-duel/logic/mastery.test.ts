import { describe, expect, it } from 'vitest'
import { factKey } from './facts'
import {
  applyOutcome,
  emptyStats,
  isMastered,
  MASTERY_THRESHOLD,
  masteryScore,
  updateStats,
} from './mastery'
import type { FactStats, RoundOutcome, StatsMap } from './types'

describe('emptyStats', () => {
  it('returns all zeros', () => {
    expect(emptyStats()).toEqual({
      attempts: 0,
      firstTryCorrect: 0,
      hintUses: 0,
      streak: 0,
      lastAskedAt: 0,
    })
  })
})

describe('applyOutcome', () => {
  const outcome = (overrides: Partial<RoundOutcome> = {}): RoundOutcome => ({
    fact: { a: 6, b: 7 },
    firstTry: true,
    usedHint: false,
    askedAt: 1,
    ...overrides,
  })

  it('treats undefined prev as emptyStats before applying', () => {
    const result = applyOutcome(undefined, outcome({ askedAt: 5 }))
    expect(result).toEqual({
      attempts: 1,
      firstTryCorrect: 1,
      hintUses: 0,
      streak: 1,
      lastAskedAt: 5,
    })
  })

  it('increments attempts every time', () => {
    const prev: FactStats = { attempts: 3, firstTryCorrect: 1, hintUses: 0, streak: 1, lastAskedAt: 2 }
    const result = applyOutcome(prev, outcome({ askedAt: 3 }))
    expect(result.attempts).toBe(4)
  })

  it('increments firstTryCorrect when firstTry and not usedHint', () => {
    const result = applyOutcome(emptyStats(), outcome({ firstTry: true, usedHint: false }))
    expect(result.firstTryCorrect).toBe(1)
  })

  it('does not increment firstTryCorrect when usedHint is true, even if firstTry', () => {
    const result = applyOutcome(emptyStats(), outcome({ firstTry: true, usedHint: true }))
    expect(result.firstTryCorrect).toBe(0)
  })

  it('does not increment firstTryCorrect when firstTry is false', () => {
    const result = applyOutcome(emptyStats(), outcome({ firstTry: false, usedHint: false }))
    expect(result.firstTryCorrect).toBe(0)
  })

  it('increments hintUses when usedHint is true', () => {
    const result = applyOutcome(emptyStats(), outcome({ usedHint: true }))
    expect(result.hintUses).toBe(1)
  })

  it('does not increment hintUses when usedHint is false', () => {
    const result = applyOutcome(emptyStats(), outcome({ usedHint: false }))
    expect(result.hintUses).toBe(0)
  })

  it('increments streak on a first-try, hint-free success', () => {
    const prev: FactStats = { attempts: 2, firstTryCorrect: 2, hintUses: 0, streak: 2, lastAskedAt: 2 }
    const result = applyOutcome(prev, outcome({ firstTry: true, usedHint: false }))
    expect(result.streak).toBe(3)
  })

  it('resets streak to 0 when a hint was used, even if firstTry', () => {
    const prev: FactStats = { attempts: 2, firstTryCorrect: 2, hintUses: 0, streak: 2, lastAskedAt: 2 }
    const result = applyOutcome(prev, outcome({ firstTry: true, usedHint: true }))
    expect(result.streak).toBe(0)
  })

  it('resets streak to 0 on a wrong-first-try (firstTry false)', () => {
    const prev: FactStats = { attempts: 2, firstTryCorrect: 2, hintUses: 0, streak: 2, lastAskedAt: 2 }
    const result = applyOutcome(prev, outcome({ firstTry: false, usedHint: false }))
    expect(result.streak).toBe(0)
  })

  it('sets lastAskedAt to outcome.askedAt', () => {
    const result = applyOutcome(emptyStats(), outcome({ askedAt: 42 }))
    expect(result.lastAskedAt).toBe(42)
  })

  it('is pure: does not mutate the prev object', () => {
    const prev: FactStats = { attempts: 2, firstTryCorrect: 2, hintUses: 0, streak: 2, lastAskedAt: 2 }
    const frozenPrev = { ...prev }
    applyOutcome(prev, outcome())
    expect(prev).toEqual(frozenPrev)
  })
})

describe('masteryScore', () => {
  it('is 0 when stats is undefined', () => {
    expect(masteryScore(undefined)).toBe(0)
  })

  it('is 0 when attempts is 0', () => {
    expect(masteryScore(emptyStats())).toBe(0)
  })

  it('computes 0.6*accuracy + 0.4*(streak/5, capped at 5)', () => {
    const stats: FactStats = { attempts: 10, firstTryCorrect: 10, hintUses: 0, streak: 5, lastAskedAt: 1 }
    expect(masteryScore(stats)).toBeCloseTo(1.0, 10)
  })

  it('caps the streak contribution at 5 (a streak of 10 scores the same as 5)', () => {
    const streak5: FactStats = { attempts: 10, firstTryCorrect: 10, hintUses: 0, streak: 5, lastAskedAt: 1 }
    const streak10: FactStats = { attempts: 10, firstTryCorrect: 10, hintUses: 0, streak: 10, lastAskedAt: 1 }
    expect(masteryScore(streak10)).toBeCloseTo(masteryScore(streak5), 10)
  })

  it('matches the 3-perfect-streak-crosses-threshold property: accuracy 1.0, streak 3 -> 0.84 (mastered)', () => {
    const stats: FactStats = { attempts: 3, firstTryCorrect: 3, hintUses: 0, streak: 3, lastAskedAt: 1 }
    expect(masteryScore(stats)).toBeCloseTo(0.84, 10)
    expect(masteryScore(stats)).toBeGreaterThanOrEqual(MASTERY_THRESHOLD)
  })

  it('matches the streak-2-not-yet property: accuracy 1.0, streak 2 -> 0.76 (not mastered)', () => {
    const stats: FactStats = { attempts: 2, firstTryCorrect: 2, hintUses: 0, streak: 2, lastAskedAt: 1 }
    expect(masteryScore(stats)).toBeCloseTo(0.76, 10)
    expect(masteryScore(stats)).toBeLessThan(MASTERY_THRESHOLD)
  })

  it('is clamped to [0, 1] and never negative', () => {
    const stats: FactStats = { attempts: 5, firstTryCorrect: 0, hintUses: 5, streak: 0, lastAskedAt: 1 }
    const score = masteryScore(stats)
    expect(score).toBeGreaterThanOrEqual(0)
    expect(score).toBeLessThanOrEqual(1)
  })

  it('is clamped to [0, 1] and never exceeds 1', () => {
    const stats: FactStats = { attempts: 1, firstTryCorrect: 1, hintUses: 0, streak: 999, lastAskedAt: 1 }
    const score = masteryScore(stats)
    expect(score).toBeLessThanOrEqual(1)
  })

  it('weights accuracy correctly in isolation (streak 0)', () => {
    const stats: FactStats = { attempts: 4, firstTryCorrect: 2, hintUses: 0, streak: 0, lastAskedAt: 1 }
    // 0.6 * 0.5 + 0.4 * 0 = 0.3
    expect(masteryScore(stats)).toBeCloseTo(0.3, 10)
  })
})

describe('MASTERY_THRESHOLD', () => {
  it('is 0.8', () => {
    expect(MASTERY_THRESHOLD).toBe(0.8)
  })
})

describe('isMastered', () => {
  it('is false for undefined stats', () => {
    expect(isMastered(undefined)).toBe(false)
  })

  it('is false for empty stats', () => {
    expect(isMastered(emptyStats())).toBe(false)
  })

  it('is true once the score reaches the threshold (perfect accuracy, streak 3)', () => {
    const stats: FactStats = { attempts: 3, firstTryCorrect: 3, hintUses: 0, streak: 3, lastAskedAt: 1 }
    expect(isMastered(stats)).toBe(true)
  })

  it('is false just below the threshold (perfect accuracy, streak 2)', () => {
    const stats: FactStats = { attempts: 2, firstTryCorrect: 2, hintUses: 0, streak: 2, lastAskedAt: 1 }
    expect(isMastered(stats)).toBe(false)
  })

  it('is true at exactly the threshold', () => {
    // 0.6*x + 0.4*(5/5) = 0.8 -> x = 2/3
    const stats: FactStats = { attempts: 3, firstTryCorrect: 2, hintUses: 0, streak: 5, lastAskedAt: 1 }
    expect(masteryScore(stats)).toBeCloseTo(MASTERY_THRESHOLD, 10)
    expect(isMastered(stats)).toBe(true)
  })
})

describe('updateStats', () => {
  it('adds a new entry under the canonical key when absent', () => {
    const map: StatsMap = {}
    const outcome: RoundOutcome = { fact: { a: 6, b: 7 }, firstTry: true, usedHint: false, askedAt: 1 }
    const result = updateStats(map, outcome)
    expect(result[factKey(6, 7)]).toEqual({
      attempts: 1,
      firstTryCorrect: 1,
      hintUses: 0,
      streak: 1,
      lastAskedAt: 1,
    })
  })

  it('is immutable: does not mutate the input map', () => {
    const map: StatsMap = {}
    const frozen = { ...map }
    const outcome: RoundOutcome = { fact: { a: 6, b: 7 }, firstTry: true, usedHint: false, askedAt: 1 }
    updateStats(map, outcome)
    expect(map).toEqual(frozen)
  })

  it('returns a new map object (not the same reference)', () => {
    const map: StatsMap = {}
    const outcome: RoundOutcome = { fact: { a: 6, b: 7 }, firstTry: true, usedHint: false, askedAt: 1 }
    const result = updateStats(map, outcome)
    expect(result).not.toBe(map)
  })

  it('replaces only the affected entry, leaving other facts untouched', () => {
    const existing: FactStats = { attempts: 2, firstTryCorrect: 1, hintUses: 0, streak: 1, lastAskedAt: 1 }
    const map: StatsMap = { [factKey(2, 3)]: existing }
    const outcome: RoundOutcome = { fact: { a: 6, b: 7 }, firstTry: true, usedHint: false, askedAt: 2 }
    const result = updateStats(map, outcome)
    expect(result[factKey(2, 3)]).toEqual(existing)
    expect(result[factKey(6, 7)]).toBeDefined()
  })

  it('commutativity: 7x6 and 6x7 update the same entry', () => {
    let map: StatsMap = {}
    map = updateStats(map, { fact: { a: 7, b: 6 }, firstTry: true, usedHint: false, askedAt: 1 })
    map = updateStats(map, { fact: { a: 6, b: 7 }, firstTry: true, usedHint: false, askedAt: 2 })
    const keys = Object.keys(map)
    expect(keys).toHaveLength(1)
    expect(map[factKey(6, 7)]).toEqual({
      attempts: 2,
      firstTryCorrect: 2,
      hintUses: 0,
      streak: 2,
      lastAskedAt: 2,
    })
  })

  it('accumulates across multiple outcomes for the same fact', () => {
    let map: StatsMap = {}
    map = updateStats(map, { fact: { a: 6, b: 7 }, firstTry: true, usedHint: false, askedAt: 1 })
    map = updateStats(map, { fact: { a: 6, b: 7 }, firstTry: false, usedHint: false, askedAt: 2 })
    map = updateStats(map, { fact: { a: 6, b: 7 }, firstTry: true, usedHint: true, askedAt: 3 })
    expect(map[factKey(6, 7)]).toEqual({
      attempts: 3,
      firstTryCorrect: 1,
      hintUses: 1,
      streak: 0,
      lastAskedAt: 3,
    })
  })
})
