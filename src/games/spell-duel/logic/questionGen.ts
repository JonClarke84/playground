/**
 * Adaptive question selection (PRODUCT.md §4.5).
 */

import { shuffle } from '../../../lib/rng'
import { generateDistractors } from './distractors'
import { factKey, factsForTables } from './facts'
import { masteryScore } from './mastery'
import type { Fact, Question, QuestionRequest } from './types'

const MAX_RECENCY_EXCLUSIONS = 4

/**
 * Picks a fact from the pool of facts covering req.tables, honouring recency
 * exclusion and mastery-weighted random selection, then randomises display
 * orientation (PRODUCT.md §4.5).
 */
export function pickFact(req: QuestionRequest): Fact {
  const pool = factsForTables(req.tables)
  if (pool.length === 0) {
    throw new Error('pickFact: no facts available for the selected tables')
  }

  const excludedCount = Math.min(MAX_RECENCY_EXCLUSIONS, pool.length - 1)
  const excludedKeys = new Set(req.recentKeys.slice(0, excludedCount))
  const candidates = pool.filter((fact) => !excludedKeys.has(factKey(fact.a, fact.b)))

  const weights = candidates.map((fact) => {
    const stats = req.stats[factKey(fact.a, fact.b)]
    return 1 + 4 * (1 - masteryScore(stats))
  })

  const chosen = weightedPick(candidates, weights, req.rng)

  // Swap display orientation 50/50.
  return req.rng() < 0.5 ? chosen : { a: chosen.b, b: chosen.a }
}

/** Weighted random selection: picks an index proportional to its weight. */
function weightedPick<T>(items: readonly T[], weights: readonly number[], rng: () => number): T {
  const total = weights.reduce((sum, weight) => sum + weight, 0)
  let target = rng() * total
  for (let i = 0; i < items.length; i++) {
    target -= weights[i]
    if (target < 0) return items[i]
  }
  return items[items.length - 1]
}

/** Builds a full question: picks a fact, computes the answer, and shuffles 4 options. */
export function makeQuestion(req: QuestionRequest): Question {
  const fact = pickFact(req)
  const answer = fact.a * fact.b
  const distractors = generateDistractors(fact.a, fact.b, req.rng)
  const options = shuffle([answer, ...distractors], req.rng)

  return { a: fact.a, b: fact.b, answer, options }
}
