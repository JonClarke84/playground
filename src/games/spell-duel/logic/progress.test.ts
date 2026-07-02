import { describe, expect, it } from 'vitest'
import { starsForTable, tableMastery } from './progress'
import { factKey } from './facts'
import type { FactStats, StatsMap } from './types'

function perfectStats(streak: number, attempts = streak): FactStats {
  return { attempts, firstTryCorrect: attempts, hintUses: 0, streak, lastAskedAt: 1 }
}

function tableStats(table: number, stats: FactStats, count = 11): StatsMap {
  const map: StatsMap = {}
  for (let m = 2; m < 2 + count; m++) {
    map[factKey(table, m)] = stats
  }
  return map
}

describe('tableMastery', () => {
  it('is 0 with no stats', () => {
    expect(tableMastery(7, {})).toBe(0)
  })

  it('is 1 when every fact of the table is fully mastered', () => {
    expect(tableMastery(7, tableStats(7, perfectStats(5)))).toBeCloseTo(1)
  })

  it('averages across all 11 facts of the table', () => {
    // Only 5 of 11 facts touched, each fully mastered → 5/11.
    expect(tableMastery(7, tableStats(7, perfectStats(5), 5))).toBeCloseTo(5 / 11)
  })

  it('uses the canonical key for both orientations', () => {
    const map: StatsMap = { [factKey(12, 7)]: perfectStats(5) }
    expect(tableMastery(7, map)).toBeCloseTo(1 / 11)
    expect(tableMastery(12, map)).toBeCloseTo(1 / 11)
  })
})

describe('starsForTable', () => {
  it('gives 0 stars for an untouched table', () => {
    expect(starsForTable(4, {})).toBe(0)
  })

  it('gives 3 stars for a fully mastered table', () => {
    expect(starsForTable(4, tableStats(4, perfectStats(5)))).toBe(3)
  })

  it('gives 1 star once mastery passes the first threshold', () => {
    // 5/11 fully mastered ≈ 0.45 → 1 star (below the 0.65 two-star bar).
    expect(starsForTable(4, tableStats(4, perfectStats(5), 5))).toBe(1)
  })

  it('gives 2 stars at solid-but-not-perfect coverage', () => {
    // 8/11 fully mastered ≈ 0.73.
    expect(starsForTable(4, tableStats(4, perfectStats(5), 8))).toBe(2)
  })

  it('never returns more than 3', () => {
    for (let t = 2; t <= 12; t++) {
      expect(starsForTable(t, tableStats(t, perfectStats(9)))).toBeLessThanOrEqual(3)
    }
  })
})
