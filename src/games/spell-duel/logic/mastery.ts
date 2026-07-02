import { factKey } from './facts'
import type { FactStats, RoundOutcome, StatsMap } from './types'

/** A fact's stats before it has ever been attempted. */
export function emptyStats(): FactStats {
  return {
    attempts: 0,
    firstTryCorrect: 0,
    hintUses: 0,
    streak: 0,
    lastAskedAt: 0,
  }
}

/** Folds one round outcome into a fact's stats. Pure; returns a new object. */
export function applyOutcome(prev: FactStats | undefined, outcome: RoundOutcome): FactStats {
  const base = prev ?? emptyStats()
  const cleanSuccess = outcome.firstTry && !outcome.usedHint

  return {
    attempts: base.attempts + 1,
    firstTryCorrect: base.firstTryCorrect + (cleanSuccess ? 1 : 0),
    hintUses: base.hintUses + (outcome.usedHint ? 1 : 0),
    streak: cleanSuccess ? base.streak + 1 : 0,
    lastAskedAt: outcome.askedAt,
  }
}

const STREAK_CAP = 5

/** Mastery score in [0, 1]: 0.6 * accuracy + 0.4 * (min(streak, 5) / 5). */
export function masteryScore(stats: FactStats | undefined): number {
  if (!stats || stats.attempts === 0) return 0

  const accuracy = stats.firstTryCorrect / stats.attempts
  const streakFactor = Math.min(stats.streak, STREAK_CAP) / STREAK_CAP
  const raw = 0.6 * accuracy + 0.4 * streakFactor

  return Math.min(1, Math.max(0, raw))
}

export const MASTERY_THRESHOLD = 0.8

/** Whether a fact's mastery score has reached the threshold. */
export function isMastered(stats: FactStats | undefined): boolean {
  return masteryScore(stats) >= MASTERY_THRESHOLD
}

/** Immutably applies a round outcome to the stats map under its canonical fact key. */
export function updateStats(map: StatsMap, outcome: RoundOutcome): StatsMap {
  const key = factKey(outcome.fact.a, outcome.fact.b)
  return {
    ...map,
    [key]: applyOutcome(map[key], outcome),
  }
}
