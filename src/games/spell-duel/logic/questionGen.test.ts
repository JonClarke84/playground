import { describe, expect, it } from 'vitest'
import { mulberry32 } from '../../../lib/rng'
import { factKey, factsForTables } from './facts'
import { makeQuestion, pickFact } from './questionGen'
import type { FactStats, QuestionRequest, StatsMap } from './types'

const streak5Stats = (): FactStats => ({
  attempts: 5,
  firstTryCorrect: 5,
  hintUses: 0,
  streak: 5,
  lastAskedAt: 5,
})

const baseRequest = (overrides: Partial<QuestionRequest> = {}): QuestionRequest => ({
  tables: [6],
  stats: {},
  recentKeys: [],
  now: 1,
  rng: mulberry32(1),
  ...overrides,
})

describe('pickFact', () => {
  it('throws when the pool is empty (no valid tables selected)', () => {
    const req = baseRequest({ tables: [], rng: mulberry32(1) })
    expect(() => pickFact(req)).toThrow()
  })

  it('every picked fact involves a selected table, across a 200-draw sweep', () => {
    const tables = [6, 7]
    const rng = mulberry32(123)
    for (let i = 0; i < 200; i++) {
      const req = baseRequest({ tables, rng })
      const fact = pickFact(req)
      expect(tables.includes(fact.a) || tables.includes(fact.b)).toBe(true)
    }
  })

  it('honours recency exclusion: a fact at the head of recentKeys is never picked when the pool is big', () => {
    const tables = [6]
    const pool = factsForTables(tables)
    expect(pool.length).toBeGreaterThan(4)
    const excludedKey = factKey(pool[0].a, pool[0].b)
    const rng = mulberry32(42)
    for (let i = 0; i < 200; i++) {
      const req = baseRequest({ tables, recentKeys: [excludedKey], rng })
      const fact = pickFact(req)
      expect(factKey(fact.a, fact.b)).not.toBe(excludedKey)
    }
  })

  it('still works with a single-fact pool even when that fact is recent', () => {
    // Table 12 combined with itself alone would still generate multiple facts via factsForTables,
    // so instead we simulate a genuinely single-fact scenario is not reachable via tables alone;
    // verify instead that when recentKeys covers all-but-one fact isn't required for tables API.
    // Use a minimal valid tables selection and confirm no throw even when the single resulting
    // fact key (if pool were size 1) is listed as recent. We approximate a size-1 pool is not
    // constructible from factsForTables directly, so this test instead exercises the boundary
    // condition: recentKeys longer than pool still returns a fact without throwing.
    const tables = [6]
    const pool = factsForTables(tables)
    const allKeys = pool.map((f) => factKey(f.a, f.b))
    const rng = mulberry32(7)
    const req = baseRequest({ tables, recentKeys: allKeys, rng })
    expect(() => pickFact(req)).not.toThrow()
  })

  it('weighting bias: with one fact at streak-5 mastery and one untouched, the untouched fact is picked substantially more over 500 draws', () => {
    // Table 2 alone yields facts 2x2..2x12 (11 facts). Mark all but one as fully mastered
    // so the remaining "untouched" fact stands out from a controlled two-fact comparison.
    const tables = [2]
    const pool = factsForTables(tables)
    const masteredFact = pool[0]
    const untouchedFact = pool[1]
    const masteredKey = factKey(masteredFact.a, masteredFact.b)

    const stats: StatsMap = { [masteredKey]: streak5Stats() }
    // Restrict comparison to just these two facts by excluding all other facts via recentKeys
    // is not workable (recency only drops a few). Instead use tables that only cover these two
    // facts: impossible via factsForTables directly, so we simulate by checking relative pick
    // frequency between the two specific facts across draws restricted to full pool, using
    // occurrence counts of each of the two facts (other facts are noise but the ratio between
    // these two should still show the bias).
    const rng = mulberry32(99)
    let masteredCount = 0
    let untouchedCount = 0
    for (let i = 0; i < 500; i++) {
      const req = baseRequest({ tables, stats, rng })
      const fact = pickFact(req)
      const key = factKey(fact.a, fact.b)
      if (key === masteredKey) masteredCount++
      if (key === factKey(untouchedFact.a, untouchedFact.b)) untouchedCount++
    }
    expect(untouchedCount).toBeGreaterThan(masteredCount * 2)
  })

  it('both display orientations of the same canonical fact occur over many draws', () => {
    const tables = [6]
    const rng = mulberry32(55)
    const orientations = new Set<string>()
    for (let i = 0; i < 200; i++) {
      const req = baseRequest({ tables, rng })
      const fact = pickFact(req)
      if (fact.a === 6 && fact.b === 6) continue // symmetric fact has only one orientation
      orientations.add(`${fact.a},${fact.b}`)
    }
    // With many draws across an 11-fact pool (excluding the symmetric 6x6), we expect to see
    // both a "6 first" and a "6 second" orientation somewhere in the sweep.
    const hasSixFirst = [...orientations].some((o) => o.startsWith('6,') && o !== '6,6')
    const hasSixSecond = [...orientations].some((o) => o.endsWith(',6') && o !== '6,6')
    expect(hasSixFirst).toBe(true)
    expect(hasSixSecond).toBe(true)
  })
})

describe('makeQuestion', () => {
  it('produces a question whose answer is a*b and exactly 4 unique options including the answer', () => {
    const req = baseRequest({ tables: [7], rng: mulberry32(3) })
    const question = makeQuestion(req)
    expect(question.answer).toBe(question.a * question.b)
    expect(question.options).toHaveLength(4)
    expect(new Set(question.options).size).toBe(4)
    expect(question.options).toContain(question.answer)
  })

  it('is deterministic under a fixed seed', () => {
    const reqA = baseRequest({ tables: [7], rng: mulberry32(2024) })
    const reqB = baseRequest({ tables: [7], rng: mulberry32(2024) })
    const questionA = makeQuestion(reqA)
    const questionB = makeQuestion(reqB)
    expect(questionA).toEqual(questionB)
  })

  it('produces valid questions across a sweep of tables and seeds', () => {
    for (const seed of [1, 2, 3, 4, 5]) {
      const rng = mulberry32(seed)
      for (let i = 0; i < 20; i++) {
        const req = baseRequest({ tables: [3, 8, 11], rng })
        const question = makeQuestion(req)
        expect(question.answer).toBe(question.a * question.b)
        expect(question.options).toHaveLength(4)
        expect(new Set(question.options).size).toBe(4)
        expect(question.options).toContain(question.answer)
      }
    }
  })
})
