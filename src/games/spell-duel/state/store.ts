import { create } from 'zustand'
import { createStore } from '../../../lib/storage'
import type { StatsMap, DuelState } from '../logic/types'
import type { AvatarConfig } from '../avatar/avatarTypes'

/**
 * Persisted Spell Duel state (PRODUCT.md §7.4).
 * Subtraction splits unlock once she has seen enough additive splits (§4.4).
 */
const ADDITIVE_SPLITS_BEFORE_SUBTRACTION = 6

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
}

const persisted = createStore<SpellDuelPersisted>({
  key: 'playground:spell-duel',
  version: 1,
  defaults: {
    avatar: null,
    tables: [2, 5, 10],
    soundOn: true,
    stats: {},
    askCounter: 1,
    sparkleDust: 0,
    hintsSeen: 0,
    duelsCompleted: 0,
  },
})

interface SpellDuelStore extends SpellDuelPersisted {
  setAvatar: (avatar: AvatarConfig) => void
  toggleTable: (table: number) => void
  setTables: (tables: number[]) => void
  toggleSound: () => void
  /** Folds a finished duel back into persistent progress. */
  completeDuel: (duel: DuelState) => void
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

  completeDuel: (duel) =>
    set((state) => {
      const hintsThisDuel = duel.history.filter((r) => r.usedHint).length
      const brilliants = duel.history.filter((r) => r.quality === 'brilliant').length
      return {
        stats: duel.stats,
        askCounter: state.askCounter + duel.history.length,
        sparkleDust: state.sparkleDust + duel.meterHalves + brilliants,
        hintsSeen: state.hintsSeen + hintsThisDuel,
        duelsCompleted: state.duelsCompleted + 1,
      }
    }),

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
  })
})
