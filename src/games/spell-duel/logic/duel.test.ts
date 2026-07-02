import { describe, expect, it } from 'vitest'
import { mulberry32 } from '../../../lib/rng'
import { chooseSplit } from './hintSplits'
import { factKey } from './facts'
import { DEFAULT_ROUNDS, advance, answer, createDuel, finaleTier, useHint } from './duel'
import type { DuelConfig, DuelState, StatsMap } from './types'

const baseConfig = (overrides: Partial<DuelConfig> = {}): DuelConfig => ({
  tables: [6],
  rounds: DEFAULT_ROUNDS,
  allowSubtraction: false,
  startAt: 0,
  rng: mulberry32(1),
  ...overrides,
})

/** Deep-freezes a value (and nested objects/arrays) so mutation throws in strict mode. */
function deepFreeze<T>(value: T): T {
  if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
    if (!Object.isFrozen(value)) {
      Object.getOwnPropertyNames(value).forEach((name) => {
        // Index into the object generically via Reflect, no casts required.
        deepFreeze(Reflect.get(value, name))
      })
      Object.freeze(value)
    }
  }
  return value
}

describe('DEFAULT_ROUNDS', () => {
  it('is 10', () => {
    expect(DEFAULT_ROUNDS).toBe(10)
  })
})

describe('createDuel', () => {
  it('initialises a fresh duel state', () => {
    const config = baseConfig()
    const stats: StatsMap = {}
    const state = createDuel(config, stats)

    expect(state.config).toBe(config)
    expect(state.roundIndex).toBe(0)
    expect(state.history).toEqual([])
    expect(state.meterHalves).toBe(0)
    expect(state.recentKeys).toEqual([])
    expect(state.finished).toBe(false)
    expect(state.lastEvent).toBeNull()
    expect(state.current).not.toBeNull()
    expect(state.current?.popped).toEqual([])
    expect(state.current?.hintStage).toBe(0)
    expect(state.current?.split).toBeNull()
  })

  it('copies the input stats map (independent identity, equal content)', () => {
    const stats: StatsMap = {
      '6x7': { attempts: 3, firstTryCorrect: 2, hintUses: 0, streak: 2, lastAskedAt: 3 },
    }
    const state = createDuel(baseConfig(), stats)
    expect(state.stats).toEqual(stats)
  })

  it('produces the same first question for the same seed and config (determinism)', () => {
    const stateA = createDuel(baseConfig({ rng: mulberry32(42) }), {})
    const stateB = createDuel(baseConfig({ rng: mulberry32(42) }), {})
    expect(stateA.current?.question).toEqual(stateB.current?.question)
  })

  it('does not mutate the input stats object', () => {
    const stats: StatsMap = {
      '6x7': { attempts: 1, firstTryCorrect: 1, hintUses: 0, streak: 1, lastAskedAt: 1 },
    }
    const frozenStats = deepFreeze(stats)
    expect(() => createDuel(baseConfig(), frozenStats)).not.toThrow()
  })
})

describe('full 10-round playthrough, all brilliant', () => {
  it('reaches meter 20, tier grand, 10 history records, finished event, stats updated per fact', () => {
    const config = baseConfig({ tables: [6], rounds: 10, startAt: 0, rng: mulberry32(7) })
    let state = createDuel(config, {})

    for (let round = 0; round < 10; round++) {
      expect(state.current).not.toBeNull()
      const question = state.current
      if (question === null) throw new Error('expected an active round')
      state = answer(state, question.question.answer)
      expect(state.lastEvent).toEqual({ type: 'cast', quality: 'brilliant', meterGained: 2 })
      expect(state.current).toBeNull()
      if (round < 9) {
        state = advance(state)
      }
    }

    // Duel is not finished until advance() is called after the 10th history record exists.
    expect(state.finished).toBe(false)
    expect(state.history).toHaveLength(10)
    state = advance(state)

    expect(state.finished).toBe(true)
    expect(state.current).toBeNull()
    expect(state.meterHalves).toBe(20)
    expect(state.lastEvent).toEqual({ type: 'finished', tier: 'grand' })
    expect(state.history).toHaveLength(10)
    expect(state.history.every((record) => record.quality === 'brilliant')).toBe(true)

    // Every fact touched in history should have updated stats: at least one attempt recorded.
    for (const record of state.history) {
      const key = factKey(record.fact.a, record.fact.b)
      const stats = state.stats[key]
      expect(stats).toBeDefined()
      expect(stats?.attempts).toBeGreaterThan(0)
      expect(stats?.firstTryCorrect).toBeGreaterThan(0)
    }
  })
})

describe('hint flow', () => {
  it('stage 0 -> 1 -> 2, split matches chooseSplit, hinted quality, half-notch meter gain', () => {
    const config = baseConfig({ tables: [7], rounds: 1, startAt: 0, rng: mulberry32(3) })
    let state = createDuel(config, {})
    const startingCurrent = state.current
    if (startingCurrent === null) throw new Error('expected an active round')
    const { a, b } = startingCurrent.question

    state = useHint(state)
    expect(state.current?.hintStage).toBe(1)
    expect(state.current?.split).not.toBeNull()
    const expectedSplit = chooseSplit(a, b, { allowSubtraction: config.allowSubtraction, rng: config.rng })
    expect(state.current?.split).toEqual(expectedSplit)
    expect(state.lastEvent).toEqual({ type: 'hint', stage: 1, split: expectedSplit })

    const splitAfterStage1 = state.current?.split ?? null

    state = useHint(state)
    expect(state.current?.hintStage).toBe(2)
    expect(state.current?.split).toEqual(splitAfterStage1)
    expect(state.lastEvent).toEqual({ type: 'hint', stage: 2, split: splitAfterStage1 })

    // A third tap is a no-op.
    const beforeThirdTap = state
    state = useHint(state)
    expect(state).toBe(beforeThirdTap)

    // Now answering correctly should be a 'hinted' cast worth 1 half-notch.
    const question = state.current
    if (question === null) throw new Error('expected an active round')
    state = answer(state, question.question.answer)
    expect(state.lastEvent).toEqual({ type: 'cast', quality: 'hinted', meterGained: 1 })
    expect(state.meterHalves).toBe(1)
    expect(state.history[0].quality).toBe('hinted')
    expect(state.history[0].usedHint).toBe(true)
  })
})

describe('scrappy flow', () => {
  it('one fizzle then correct: popped grows, quality scrappy, streak resets in stats', () => {
    const config = baseConfig({ tables: [8], rounds: 1, startAt: 5, rng: mulberry32(11) })
    const priorStats: StatsMap = {}
    let state = createDuel(config, priorStats)
    const current = state.current
    if (current === null) throw new Error('expected an active round')
    const key = factKey(current.question.a, current.question.b)

    // Seed a streak on this exact fact so we can observe it reset to 0.
    state = {
      ...state,
      stats: {
        ...state.stats,
        [key]: { attempts: 4, firstTryCorrect: 4, hintUses: 0, streak: 4, lastAskedAt: 2 },
      },
    }

    const wrongOption = current.question.options.find((opt) => opt !== current.question.answer)
    if (wrongOption === undefined) throw new Error('expected at least one distractor')

    state = answer(state, wrongOption)
    expect(state.lastEvent).toEqual({ type: 'fizzle', popped: wrongOption })
    expect(state.current?.popped).toEqual([wrongOption])
    expect(state.current).not.toBeNull()

    state = answer(state, current.question.answer)
    expect(state.lastEvent).toEqual({ type: 'cast', quality: 'scrappy', meterGained: 1 })
    expect(state.meterHalves).toBe(1)
    expect(state.history[0].quality).toBe('scrappy')
    expect(state.history[0].wrongTaps).toBe(1)
    expect(state.history[0].usedHint).toBe(false)

    const updatedStats = state.stats[key]
    expect(updatedStats?.streak).toBe(0)
    expect(updatedStats?.attempts).toBe(5)
  })
})

describe('answer with popped or foreign values', () => {
  it('tapping an already-popped value is a no-op', () => {
    const config = baseConfig({ tables: [9], rounds: 1, rng: mulberry32(21) })
    let state = createDuel(config, {})
    const current = state.current
    if (current === null) throw new Error('expected an active round')
    const wrongOption = current.question.options.find((opt) => opt !== current.question.answer)
    if (wrongOption === undefined) throw new Error('expected at least one distractor')

    state = answer(state, wrongOption)
    const afterFirstFizzle = state
    state = answer(state, wrongOption)
    expect(state).toBe(afterFirstFizzle)
  })

  it('tapping a value that is not one of the options is a no-op', () => {
    const config = baseConfig({ tables: [9], rounds: 1, rng: mulberry32(22) })
    const state = createDuel(config, {})
    const current = state.current
    if (current === null) throw new Error('expected an active round')
    const foreignValue = Math.max(...current.question.options) + 1000
    expect(current.question.options).not.toContain(foreignValue)

    const result = answer(state, foreignValue)
    expect(result).toBe(state)
  })
})

describe('phase no-ops', () => {
  it('answer() is a no-op when current is null (between rounds)', () => {
    const config = baseConfig({ tables: [4], rounds: 2, rng: mulberry32(30) })
    let state = createDuel(config, {})
    const current = state.current
    if (current === null) throw new Error('expected an active round')
    state = answer(state, current.question.answer)
    expect(state.current).toBeNull()

    const beforeNoOp = state
    const result = answer(state, current.question.answer)
    expect(result).toBe(beforeNoOp)
  })

  it('answer() is a no-op once the duel is finished', () => {
    const config = baseConfig({ tables: [4], rounds: 1, rng: mulberry32(31) })
    let state = createDuel(config, {})
    const current = state.current
    if (current === null) throw new Error('expected an active round')
    state = answer(state, current.question.answer)
    state = advance(state)
    expect(state.finished).toBe(true)

    const beforeNoOp = state
    const result = answer(state, 12345)
    expect(result).toBe(beforeNoOp)
  })

  it('useHint() is a no-op when current is null', () => {
    const config = baseConfig({ tables: [4], rounds: 2, rng: mulberry32(32) })
    let state = createDuel(config, {})
    const current = state.current
    if (current === null) throw new Error('expected an active round')
    state = answer(state, current.question.answer)
    expect(state.current).toBeNull()

    const beforeNoOp = state
    const result = useHint(state)
    expect(result).toBe(beforeNoOp)
  })

  it('useHint() is a no-op once the duel is finished', () => {
    const config = baseConfig({ tables: [4], rounds: 1, rng: mulberry32(33) })
    let state = createDuel(config, {})
    const current = state.current
    if (current === null) throw new Error('expected an active round')
    state = answer(state, current.question.answer)
    state = advance(state)
    expect(state.finished).toBe(true)

    const beforeNoOp = state
    const result = useHint(state)
    expect(result).toBe(beforeNoOp)
  })

  it('advance() is a no-op when current is not null', () => {
    const config = baseConfig({ tables: [4], rounds: 2, rng: mulberry32(34) })
    const state = createDuel(config, {})
    expect(state.current).not.toBeNull()

    const result = advance(state)
    expect(result).toBe(state)
  })

  it('advance() is a no-op once the duel is finished', () => {
    const config = baseConfig({ tables: [4], rounds: 1, rng: mulberry32(35) })
    let state = createDuel(config, {})
    const current = state.current
    if (current === null) throw new Error('expected an active round')
    state = answer(state, current.question.answer)
    state = advance(state)
    expect(state.finished).toBe(true)

    const beforeNoOp = state
    const result = advance(state)
    expect(result).toBe(beforeNoOp)
  })
})

describe('immutability', () => {
  it('answer() never mutates the input state (deep-frozen input survives)', () => {
    const config = baseConfig({ tables: [5], rounds: 2, rng: mulberry32(40) })
    const state = createDuel(config, {})
    const current = state.current
    if (current === null) throw new Error('expected an active round')
    const snapshot: DuelState = JSON.parse(JSON.stringify(state))
    deepFreeze(state)

    expect(() => answer(state, current.question.answer)).not.toThrow()
    expect(JSON.parse(JSON.stringify(state))).toEqual(snapshot)
  })

  it('useHint() never mutates the input state', () => {
    const config = baseConfig({ tables: [7], rounds: 1, rng: mulberry32(41) })
    const state = createDuel(config, {})
    const snapshot: DuelState = JSON.parse(JSON.stringify(state))
    deepFreeze(state)

    expect(() => useHint(state)).not.toThrow()
    expect(JSON.parse(JSON.stringify(state))).toEqual(snapshot)
  })

  it('advance() never mutates the input state', () => {
    const config = baseConfig({ tables: [5], rounds: 2, rng: mulberry32(42) })
    let state = createDuel(config, {})
    const current = state.current
    if (current === null) throw new Error('expected an active round')
    state = answer(state, current.question.answer)
    const snapshot: DuelState = JSON.parse(JSON.stringify(state))
    deepFreeze(state)

    expect(() => advance(state)).not.toThrow()
    expect(JSON.parse(JSON.stringify(state))).toEqual(snapshot)
  })
})

describe('recentKeys ordering', () => {
  it('grows most-recent-first as rounds are answered', () => {
    const config = baseConfig({ tables: [3], rounds: 3, rng: mulberry32(50) })
    let state = createDuel(config, {})
    const seenKeys: string[] = []

    for (let round = 0; round < 3; round++) {
      const current = state.current
      if (current === null) throw new Error('expected an active round')
      const key = factKey(current.question.a, current.question.b)
      seenKeys.unshift(key)
      state = answer(state, current.question.answer)
      expect(state.recentKeys).toEqual(seenKeys)
      if (round < 2) state = advance(state)
    }
  })
})

describe('finaleTier boundaries', () => {
  it('exactly 0.8 fraction -> grand', () => {
    expect(finaleTier(16, 10)).toBe('grand')
  })

  it('exactly 0.45 fraction -> great', () => {
    expect(finaleTier(9, 10)).toBe('great')
  })

  it('just below 0.8 fraction -> great', () => {
    expect(finaleTier(15, 10)).toBe('great')
  })

  it('just below 0.45 fraction -> good', () => {
    expect(finaleTier(8, 10)).toBe('good')
  })

  it('zero meter -> good', () => {
    expect(finaleTier(0, 10)).toBe('good')
  })

  it('full meter -> grand', () => {
    expect(finaleTier(20, 10)).toBe('grand')
  })
})

describe('all-hinted duel', () => {
  it('lands on tier great, never grand or good, even for a full duel of hinted casts', () => {
    const config = baseConfig({ tables: [7], rounds: 10, allowSubtraction: true, rng: mulberry32(77) })
    let state = createDuel(config, {})

    for (let round = 0; round < 10; round++) {
      state = useHint(state)
      state = useHint(state)
      const current = state.current
      if (current === null) throw new Error('expected an active round')
      state = answer(state, current.question.answer)
      expect(state.lastEvent).toEqual({ type: 'cast', quality: 'hinted', meterGained: 1 })
      if (round < 9) state = advance(state)
    }

    state = advance(state)
    expect(state.finished).toBe(true)
    expect(state.meterHalves).toBe(10)
    expect(state.lastEvent).toEqual({ type: 'finished', tier: 'great' })
  })
})

describe('advance() question generation', () => {
  it('uses config.startAt + roundIndex as the now value and produces a fresh round', () => {
    const config = baseConfig({ tables: [2], rounds: 3, startAt: 100, rng: mulberry32(60) })
    let state = createDuel(config, {})
    expect(state.roundIndex).toBe(0)

    const current = state.current
    if (current === null) throw new Error('expected an active round')
    state = answer(state, current.question.answer)
    state = advance(state)

    expect(state.roundIndex).toBe(1)
    expect(state.current).not.toBeNull()
    expect(state.current?.popped).toEqual([])
    expect(state.current?.hintStage).toBe(0)
    expect(state.current?.split).toBeNull()
  })
})
