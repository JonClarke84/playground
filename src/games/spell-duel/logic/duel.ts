/**
 * The duel state machine — the round loop the UI drives (PRODUCT.md §4.3–4.6).
 */
import { factKey } from './facts'
import { chooseSplit } from './hintSplits'
import { updateStats } from './mastery'
import { makeQuestion } from './questionGen'
import type {
  ActiveRound,
  CastQuality,
  DuelConfig,
  DuelState,
  FinaleTier,
  RoundRecord,
  StatsMap,
} from './types'

export const DEFAULT_ROUNDS = 10

/** Builds a fresh round for the given roundIndex, drawing a question from the live stats/recentKeys. */
function freshRound(config: DuelConfig, stats: StatsMap, recentKeys: string[], roundIndex: number): ActiveRound {
  const question = makeQuestion({
    tables: config.tables,
    stats,
    recentKeys,
    now: config.startAt + roundIndex,
    rng: config.rng,
  })
  return { question, popped: [], hintStage: 0, split: null }
}

/** Starts a new duel: copies stats, deals the first question. */
export function createDuel(config: DuelConfig, stats: StatsMap): DuelState {
  const initialStats: StatsMap = { ...stats }
  return {
    config,
    roundIndex: 0,
    current: freshRound(config, initialStats, [], 0),
    history: [],
    meterHalves: 0,
    stats: initialStats,
    recentKeys: [],
    finished: false,
    lastEvent: null,
  }
}

/** Answers the current round's question with `value`. No-op outside the answering phase. */
export function answer(state: DuelState, value: number): DuelState {
  const current = state.current
  if (current === null || state.finished) return state

  const { question } = current

  if (value !== question.answer) {
    const isKnownUnpopped = question.options.includes(value) && !current.popped.includes(value)
    if (!isKnownUnpopped) return state

    return {
      ...state,
      current: { ...current, popped: [...current.popped, value] },
      lastEvent: { type: 'fizzle', popped: value },
    }
  }

  const quality: CastQuality =
    current.hintStage > 0 ? 'hinted' : current.popped.length > 0 ? 'scrappy' : 'brilliant'
  const meterGained = quality === 'brilliant' ? 2 : 1
  const fact = { a: question.a, b: question.b }

  const record: RoundRecord = {
    fact,
    quality,
    wrongTaps: current.popped.length,
    usedHint: current.hintStage > 0,
  }

  const stats = updateStats(state.stats, {
    fact,
    firstTry: current.popped.length === 0 && current.hintStage === 0,
    usedHint: current.hintStage > 0,
    askedAt: state.config.startAt + state.roundIndex,
  })

  return {
    ...state,
    history: [...state.history, record],
    meterHalves: state.meterHalves + meterGained,
    stats,
    recentKeys: [factKey(fact.a, fact.b), ...state.recentKeys],
    current: null,
    lastEvent: { type: 'cast', quality, meterGained },
  }
}

/** Advances the Hint Wand one stage. No-op outside the answering phase or once fully revealed. */
export function useHint(state: DuelState): DuelState {
  const current = state.current
  if (current === null || state.finished) return state

  if (current.hintStage === 0) {
    const split = chooseSplit(current.question.a, current.question.b, {
      allowSubtraction: state.config.allowSubtraction,
      rng: state.config.rng,
    })
    return {
      ...state,
      current: { ...current, hintStage: 1, split },
      lastEvent: { type: 'hint', stage: 1, split },
    }
  }

  if (current.hintStage === 1 && current.split !== null) {
    const split = current.split
    return {
      ...state,
      current: { ...current, hintStage: 2 },
      lastEvent: { type: 'hint', stage: 2, split },
    }
  }

  return state
}

/** Moves from a resolved cast to the next round, or ends the duel. No-op mid-round. */
export function advance(state: DuelState): DuelState {
  if (state.current !== null || state.finished) return state

  if (state.history.length >= state.config.rounds) {
    return {
      ...state,
      finished: true,
      lastEvent: { type: 'finished', tier: finaleTier(state.meterHalves, state.config.rounds) },
    }
  }

  const roundIndex = state.history.length
  return {
    ...state,
    roundIndex,
    current: freshRound(state.config, state.stats, state.recentKeys, roundIndex),
  }
}

/** Maps the accumulated meter charge to a finale spectacle tier (PRODUCT.md §4.3). */
export function finaleTier(meterHalves: number, rounds: number): FinaleTier {
  const fraction = meterHalves / (rounds * 2)
  if (fraction >= 0.8) return 'grand'
  if (fraction >= 0.45) return 'great'
  return 'good'
}
