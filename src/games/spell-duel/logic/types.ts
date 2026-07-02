/**
 * Shared contracts for Spell Duel game logic (see PRODUCT.md §4).
 *
 * FROZEN FILE: logic modules import from here and may define private types
 * locally, but must not edit this file.
 */

export type { Rng } from '../../../lib/rng'
import type { Rng } from '../../../lib/rng'

/** A multiplication fact. Factors are 2..12. Order matters only for display. */
export interface Fact {
  a: number
  b: number
}

/** Canonical fact key: smaller factor first, e.g. "6x7" for both 7×6 and 6×7. */
export type FactKey = string

/** Per-fact learning record. Counters only ever increase, except streak. */
export interface FactStats {
  /** Completed rounds featuring this fact. */
  attempts: number
  /** Rounds answered correctly on the first tap with no hint. */
  firstTryCorrect: number
  /** Rounds where the Hint Wand was used. */
  hintUses: number
  /** Consecutive first-try, hint-free successes. Resets on anything else. */
  streak: number
  /** Serial ask counter (not wall clock) of the most recent ask. 0 = never asked. */
  lastAskedAt: number
}

export type StatsMap = Record<FactKey, FactStats>

/** How a completed round went, for mastery bookkeeping. */
export interface RoundOutcome {
  fact: Fact
  firstTry: boolean
  usedHint: boolean
  /** Serial ask counter for this round. */
  askedAt: number
}

/**
 * A decomposition of a×b into easier known facts (the Hint Wand, PRODUCT.md §4.4).
 * 'add':    a×b = left + right      e.g. 7×6 → 5×6 + 2×6
 * 'sub':    a×b = left − right      e.g. 9×6 → 10×6 − 1×6
 * 'double': a×b = half, doubled     e.g. 4×8 → 2×8 doubled
 */
export type Split =
  | { kind: 'add'; left: Fact; right: Fact }
  | { kind: 'sub'; left: Fact; right: Fact }
  | { kind: 'double'; half: Fact }

export interface SplitOptions {
  /**
   * Subtraction splits (for 9s) are introduced only after she has seen
   * additive splits. Default false.
   */
  allowSubtraction?: boolean
  /** When present, used to vary strategy between equally valid splits. */
  rng?: Rng
}

/** One question as presented to the player: displayed as `a × b`. */
export interface Question {
  a: number
  b: number
  answer: number
  /** Exactly 4 values: the answer plus 3 distractors, shuffled. */
  options: number[]
}

export interface QuestionRequest {
  /** Selected tables, each 2..12, at least one. */
  tables: number[]
  stats: StatsMap
  /** Canonical keys of recently asked facts, most recent first. */
  recentKeys: FactKey[]
  /** Current serial ask counter (increments once per round, across all duels). */
  now: number
  rng: Rng
}

/**
 * Cast quality — drives sparkle intensity and magic-meter fill.
 * brilliant: first tap, no hint      → 2 half-notches
 * hinted:    correct using the wand  → 1 half-notch
 * scrappy:   correct after wrong tap(s), no hint → 1 half-notch
 */
export type CastQuality = 'brilliant' | 'hinted' | 'scrappy'

export interface RoundRecord {
  fact: Fact
  quality: CastQuality
  wrongTaps: number
  usedHint: boolean
}

export interface DuelConfig {
  tables: number[]
  /** Rounds per duel. Default 10. */
  rounds: number
  allowSubtraction: boolean
  /** Serial ask counter at duel start. */
  startAt: number
  rng: Rng
}

/** 0 = no hint, 1 = split crystals shown, 2 = full array-dots view shown. */
export type HintStage = 0 | 1 | 2

export interface ActiveRound {
  question: Question
  /** Wrong options tapped so far this round (popped, removed from play). */
  popped: number[]
  hintStage: HintStage
  /** Set once hintStage >= 1. */
  split: Split | null
}

export type FinaleTier = 'good' | 'great' | 'grand'

export type DuelEvent =
  | { type: 'cast'; quality: CastQuality; meterGained: number }
  | { type: 'fizzle'; popped: number }
  | { type: 'hint'; stage: HintStage; split: Split }
  | { type: 'finished'; tier: FinaleTier }

export interface DuelState {
  config: DuelConfig
  /** 0-based index of the current round. */
  roundIndex: number
  current: ActiveRound | null
  history: RoundRecord[]
  /** Meter progress in half-notches. Full = rounds × 2. */
  meterHalves: number
  /** Live copy: input stats plus outcomes recorded so far this duel. */
  stats: StatsMap
  recentKeys: FactKey[]
  finished: boolean
  lastEvent: DuelEvent | null
}
