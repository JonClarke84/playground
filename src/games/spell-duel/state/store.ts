import { create } from 'zustand'
import { createStore } from '../../../lib/storage'
import type { StatsMap, DuelState } from '../logic/types'
import { starsForTable } from '../logic/progress'
import type { AvatarConfig } from '../avatar/avatarTypes'
import type { CostumeItem } from '../avatar/unlocks'
import { EXAM_REWARDS } from '../avatar/unlocks'

/**
 * Persisted Spell Duel state (PRODUCT.md §7.4).
 * Subtraction splits unlock once she has seen enough additive splits (§4.4).
 */
const ADDITIVE_SPLITS_BEFORE_SUBTRACTION = 6
const EXAM_BONUS_DUST = 10

export interface SpellDuelPersisted {
  avatar: AvatarConfig | null
  tables: number[]
  soundOn: boolean
  stats: StatsMap
  /** Serial ask counter, increments once per completed round, across duels. */
  askCounter: number
  sparkleDust: number
  hintsSeen: number
  duelsCompleted: number
  /** CostumeItem ids owned (exam rewards or bought with dust). */
  unlockedItems: string[]
  /** Tables whose rival exam has been passed. */
  examsPassed: number[]
  /** Best map stars seen per table (keys are table numbers). Only goes up. */
  bestStars: Record<string, number>
  /** True once Pip has introduced the Hint Wand (first duel only). */
  wandIntroduced: boolean
}

const DEFAULTS: SpellDuelPersisted = {
  avatar: null,
  tables: [2, 5, 10],
  soundOn: true,
  stats: {},
  askCounter: 1,
  sparkleDust: 0,
  hintsSeen: 0,
  duelsCompleted: 0,
  unlockedItems: [],
  examsPassed: [],
  bestStars: {},
  wandIntroduced: false,
}

/**
 * v2 added unlockedItems/examsPassed/bestStars; v3 added wandIntroduced.
 * Every migration is additive, so spreading old data over DEFAULTS covers
 * all older versions. Shallow guard is the same trust boundary as the
 * storage envelope: we verify the wrapper shape, not every field.
 */
function isLegacyShape(data: unknown): data is Partial<SpellDuelPersisted> {
  return typeof data === 'object' && data !== null && 'stats' in data && 'tables' in data
}

const persisted = createStore<SpellDuelPersisted>({
  key: 'playground:spell-duel',
  version: 3,
  defaults: DEFAULTS,
  migrate: (fromVersion, data) =>
    fromVersion <= 2 && isLegacyShape(data) ? { ...DEFAULTS, ...data } : null,
})

interface SpellDuelStore extends SpellDuelPersisted {
  setAvatar: (avatar: AvatarConfig) => void
  toggleTable: (table: number) => void
  setTables: (tables: number[]) => void
  toggleSound: () => void
  /** Folds a finished duel back into persistent progress. */
  completeDuel: (duel: DuelState, examTable?: number) => void
  /** Spends sparkle dust on a locked costume piece. No-op if unaffordable. */
  buyItem: (item: CostumeItem) => void
  /** Deducts dust if affordable; returns whether it was spent. */
  spendDust: (amount: number) => boolean
  markWandIntroduced: () => void
  allowSubtraction: () => boolean
}

export const useSpellDuelStore = create<SpellDuelStore>((set, get) => ({
  ...persisted.load(),

  setAvatar: (avatar) => set({ avatar }),

  toggleTable: (table) =>
    set((state) => {
      const has = state.tables.includes(table)
      // Never allow zero tables selected.
      if (has && state.tables.length === 1) return state
      return {
        tables: has
          ? state.tables.filter((t) => t !== table)
          : [...state.tables, table].sort((x, y) => x - y),
      }
    }),

  setTables: (tables) => set({ tables }),

  toggleSound: () => set((state) => ({ soundOn: !state.soundOn })),

  completeDuel: (duel, examTable) =>
    set((state) => {
      const hintsThisDuel = duel.history.filter((r) => r.usedHint).length
      const brilliants = duel.history.filter((r) => r.quality === 'brilliant').length

      const bestStars = { ...state.bestStars }
      for (let table = 2; table <= 12; table++) {
        const stars = starsForTable(table, duel.stats)
        const key = String(table)
        if (stars > (bestStars[key] ?? 0)) bestStars[key] = stars
      }

      const isExam = examTable !== undefined
      const reward = isExam ? EXAM_REWARDS[examTable] : undefined
      const unlockedItems =
        reward !== undefined && !state.unlockedItems.includes(reward)
          ? [...state.unlockedItems, reward]
          : state.unlockedItems
      const examsPassed =
        isExam && !state.examsPassed.includes(examTable)
          ? [...state.examsPassed, examTable].sort((x, y) => x - y)
          : state.examsPassed

      return {
        stats: duel.stats,
        askCounter: state.askCounter + duel.history.length,
        sparkleDust:
          state.sparkleDust + duel.meterHalves + brilliants + (isExam ? EXAM_BONUS_DUST : 0),
        hintsSeen: state.hintsSeen + hintsThisDuel,
        duelsCompleted: state.duelsCompleted + 1,
        bestStars,
        unlockedItems,
        examsPassed,
      }
    }),

  buyItem: (item) =>
    set((state) => {
      if (state.unlockedItems.includes(item.id) || state.sparkleDust < item.price) return state
      return {
        sparkleDust: state.sparkleDust - item.price,
        unlockedItems: [...state.unlockedItems, item.id],
      }
    }),

  spendDust: (amount) => {
    if (get().sparkleDust < amount) return false
    set((state) => ({ sparkleDust: state.sparkleDust - amount }))
    return true
  },

  markWandIntroduced: () => set({ wandIntroduced: true }),

  allowSubtraction: () => get().hintsSeen >= ADDITIVE_SPLITS_BEFORE_SUBTRACTION,
}))

/** Persist every meaningful change (debounced inside the storage layer). */
useSpellDuelStore.subscribe((state) => {
  persisted.save({
    avatar: state.avatar,
    tables: state.tables,
    soundOn: state.soundOn,
    stats: state.stats,
    askCounter: state.askCounter,
    sparkleDust: state.sparkleDust,
    hintsSeen: state.hintsSeen,
    duelsCompleted: state.duelsCompleted,
    unlockedItems: state.unlockedItems,
    examsPassed: state.examsPassed,
    bestStars: state.bestStars,
    wandIntroduced: state.wandIntroduced,
  })
})
