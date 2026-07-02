/** Deterministic random source, returns values in [0, 1). Injected everywhere for testability. */
export type Rng = () => number

/** Small, fast seeded PRNG — good enough for game feel, deterministic for tests. */
export function mulberry32(seed: number): Rng {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Fisher–Yates shuffle returning a new array. */
export function shuffle<T>(items: readonly T[], rng: Rng): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/** Pick one item uniformly. Throws on empty input. */
export function pick<T>(items: readonly T[], rng: Rng): T {
  if (items.length === 0) throw new Error('pick: empty array')
  return items[Math.floor(rng() * items.length)]
}

/** Non-deterministic seed for real play (never used in tests). */
export function randomSeed(): number {
  return Math.floor(Math.random() * 2 ** 31)
}
