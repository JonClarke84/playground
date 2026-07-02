/**
 * The Hint Wand's decomposition chooser (PRODUCT.md §4.4).
 *
 * Splits the harder factor of a×b into anchor facts a child already knows
 * (5s, doubles, near-10s), so a hard multiplication becomes two easy ones.
 */
import type { Fact, Rng, Split, SplitOptions } from './types'

/** add: left+right products; sub: left−right; double: half product × 2. */
export function splitTotal(split: Split): number {
  if (split.kind === 'add') return split.left.a * split.left.b + split.right.a * split.right.b
  if (split.kind === 'sub') return split.left.a * split.left.b - split.right.a * split.right.b
  return split.half.a * split.half.b * 2
}

/** Builds a Fact with `value` in the same slot the harder factor occupied. */
function inSlot(hardFactorWasA: boolean, value: number, other: number): Fact {
  return hardFactorWasA ? { a: value, b: other } : { a: other, b: value }
}

export function chooseSplit(a: number, b: number, opts: SplitOptions = {}): Split {
  const hardFactorWasA = a >= b
  const f = Math.max(a, b)
  const o = Math.min(a, b)

  if (f === 9 && opts.allowSubtraction) {
    return {
      kind: 'sub',
      left: inSlot(hardFactorWasA, 10, o),
      right: inSlot(hardFactorWasA, 1, o),
    }
  }

  if (f > 5) {
    const wantsDoubleRoll = f % 2 === 0 && opts.rng !== undefined && rollDouble(opts.rng)
    if (wantsDoubleRoll) {
      return { kind: 'double', half: inSlot(hardFactorWasA, f / 2, o) }
    }
    return {
      kind: 'add',
      left: inSlot(hardFactorWasA, 5, o),
      right: inSlot(hardFactorWasA, f - 5, o),
    }
  }

  if (f % 2 === 0) {
    return { kind: 'double', half: inSlot(hardFactorWasA, f / 2, o) }
  }

  return {
    kind: 'add',
    left: inSlot(hardFactorWasA, 2, o),
    right: inSlot(hardFactorWasA, f - 2, o),
  }
}

/** 50/50 coin flip via the injected rng. */
function rollDouble(rng: Rng): boolean {
  return rng() < 0.5
}
