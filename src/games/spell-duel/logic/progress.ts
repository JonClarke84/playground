/**
 * Per-table progress: mastery coverage and map stars (PRODUCT.md §4.6).
 * Stars only ever go up — the store keeps the best value seen.
 */
import type { StatsMap } from './types'
import { factKey } from './facts'
import { masteryScore } from './mastery'

const FACTS_PER_TABLE = 11 // t×2 … t×12

/** Mean mastery score across every fact involving `table`, 0..1. */
export function tableMastery(table: number, stats: StatsMap): number {
  let sum = 0
  for (let m = 2; m <= 12; m++) {
    sum += masteryScore(stats[factKey(table, m)])
  }
  return sum / FACTS_PER_TABLE
}

export function starsForTable(table: number, stats: StatsMap): 0 | 1 | 2 | 3 {
  const mastery = tableMastery(table, stats)
  if (mastery >= 0.9) return 3
  if (mastery >= 0.65) return 2
  if (mastery >= 0.35) return 1
  return 0
}
