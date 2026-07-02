/**
 * Pedagogically-plausible wrong answers for a multiplication fact (PRODUCT.md §4.5).
 */

import type { Rng } from './types'

const MIN_VALUE = 1
const MAX_VALUE = 160

/** True when `value` is a legal distractor candidate for the fact a*b. */
function isValidCandidate(value: number, answer: number): boolean {
  return Number.isInteger(value) && value >= MIN_VALUE && value <= MAX_VALUE && value !== answer
}

/** Digit transposition of a 2-digit number with distinct digits, e.g. 42 -> 24. Null otherwise. */
function transposedDigits(value: number): number | null {
  if (value < 10 || value > 99) return null
  const tens = Math.floor(value / 10)
  const ones = value % 10
  if (tens === ones) return null
  return ones * 10 + tens
}

/**
 * The deduplicated pool of plausible wrong answers for a×b.
 * Strategies: neighbour-table errors, the addition trap, digit transposition
 * of the answer, and near-misses (±1, ±2, ±3).
 */
export function candidateDistractors(a: number, b: number): number[] {
  const answer = a * b
  const raw: number[] = [
    (a - 1) * b,
    (a + 1) * b,
    a * (b - 1),
    a * (b + 1),
    a + b,
    answer - 1,
    answer + 1,
    answer - 2,
    answer + 2,
    answer - 3,
    answer + 3,
  ]

  const transposed = transposedDigits(answer)
  if (transposed !== null) raw.push(transposed)

  const seen = new Set<number>()
  const pool: number[] = []
  for (const candidate of raw) {
    if (!isValidCandidate(candidate, answer)) continue
    if (seen.has(candidate)) continue
    seen.add(candidate)
    pool.push(candidate)
  }
  return pool
}

/**
 * Picks 3 distinct values from the candidate pool without replacement, using the
 * injected rng. Falls back to unique values walking outward from the answer
 * (answer+4, answer-4, answer+5, ...) if the pool is ever short of 3 candidates.
 */
export function generateDistractors(a: number, b: number, rng: Rng): number[] {
  const answer = a * b
  const pool = [...candidateDistractors(a, b)]
  const chosen: number[] = []

  while (chosen.length < 3 && pool.length > 0) {
    const index = Math.floor(rng() * pool.length)
    const [value] = pool.splice(index, 1)
    chosen.push(value)
  }

  if (chosen.length < 3) {
    const used = new Set(chosen)
    let offset = 4
    while (chosen.length < 3) {
      for (const candidate of [answer + offset, answer - offset]) {
        if (chosen.length >= 3) break
        if (!isValidCandidate(candidate, answer)) continue
        if (used.has(candidate)) continue
        used.add(candidate)
        chosen.push(candidate)
      }
      offset += 1
    }
  }

  return chosen
}
