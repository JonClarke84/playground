import { describe, expect, it } from 'vitest'
import { mulberry32 } from '../../../lib/rng'
import { chooseSplit, splitTotal } from './hintSplits'
import type { Split } from './types'

/** Searches seeds for one where chooseSplit(a, b, { rng }) rolls a double. */
function findRngThatDoubles(a: number, b: number) {
  for (let seed = 0; seed < 500; seed++) {
    const rng = mulberry32(seed)
    if (chooseSplit(a, b, { rng }).kind === 'double') {
      return mulberry32(seed)
    }
  }
  throw new Error(`no seed under 500 produced a double split for ${a}x${b}`)
}

/**
 * chooseSplit rules (splitting the harder factor f = max(a, b), o = the other):
 * 1. f === 9 && allowSubtraction        -> sub:    10×o - 1×o
 * 2. else f > 5                         -> add:    5×o + (f-5)×o
 *      (except: f even && rng given -> 50/50 with double half=f/2)
 * 3. else f even (2 or 4)               -> double: half = f/2
 * 4. else (f is 3 or 5)                 -> add:    2×o + (f-2)×o
 */

describe('splitTotal', () => {
  it('sums an add split', () => {
    const split: Split = { kind: 'add', left: { a: 5, b: 6 }, right: { a: 2, b: 6 } }
    expect(splitTotal(split)).toBe(42)
  })

  it('subtracts a sub split', () => {
    const split: Split = { kind: 'sub', left: { a: 10, b: 6 }, right: { a: 1, b: 6 } }
    expect(splitTotal(split)).toBe(54)
  })

  it('doubles a double split', () => {
    const split: Split = { kind: 'double', half: { a: 4, b: 3 } }
    expect(splitTotal(split)).toBe(24)
  })
})

describe('chooseSplit — spec examples', () => {
  it('7×6 -> 5×6 + 2×6 (add, harder factor is 7 in the a-slot)', () => {
    const split = chooseSplit(7, 6)
    expect(split).toEqual({
      kind: 'add',
      left: { a: 5, b: 6 },
      right: { a: 2, b: 6 },
    })
    expect(splitTotal(split)).toBe(42)
  })

  it('9×6 without subtraction allowed -> 5×6 + 4×6 (add)', () => {
    const split = chooseSplit(9, 6, { allowSubtraction: false })
    expect(split).toEqual({
      kind: 'add',
      left: { a: 5, b: 6 },
      right: { a: 4, b: 6 },
    })
    expect(splitTotal(split)).toBe(54)
  })

  it('9×6 with subtraction allowed -> 10×6 - 1×6 (sub)', () => {
    const split = chooseSplit(9, 6, { allowSubtraction: true })
    expect(split).toEqual({
      kind: 'sub',
      left: { a: 10, b: 6 },
      right: { a: 1, b: 6 },
    })
    expect(splitTotal(split)).toBe(54)
  })

  // Note: the task brief's example list states "4×7 -> 2×7 doubled", but that
  // output is structurally impossible under f = max(a, b): a double requires
  // f in {2, 4} and o <= f, so o could never be 7. Given the algorithm is
  // specified precisely by formula (f = max(a, b), rule precedence, and the
  // rng exception), this test instead exercises rule 3 (double, f even <= 4)
  // and rule 4 (add, f in {3, 5}) with pairs where the max-rule can actually
  // produce them, plus the literal 4×7 / 3×6 pairs computed per the stated
  // formula.

  it('4×3 -> double, half 2×3 (f=4 is the harder/max factor, rule 3)', () => {
    const split = chooseSplit(4, 3)
    expect(split).toEqual({ kind: 'double', half: { a: 2, b: 3 } })
    expect(splitTotal(split)).toBe(12)
  })

  it('5×4 -> 2×4 + 3×4 (f=5 is the harder/max factor, rule 4)', () => {
    const split = chooseSplit(5, 4)
    expect(split).toEqual({
      kind: 'add',
      left: { a: 2, b: 4 },
      right: { a: 3, b: 4 },
    })
    expect(splitTotal(split)).toBe(20)
  })

  it('4×7 per the stated formula: f=max=7 (>5, odd) -> add 5×4 + 2×4, harder factor 7 keeps its b-slot', () => {
    const split = chooseSplit(4, 7)
    expect(split).toEqual({
      kind: 'add',
      left: { a: 4, b: 5 },
      right: { a: 4, b: 2 },
    })
    expect(splitTotal(split)).toBe(28)
  })

  it('3×6 per the stated formula: f=max=6 (>5, even, no rng) -> defaults to add 5-split 3×5 + 3×1', () => {
    const split = chooseSplit(3, 6)
    expect(split).toEqual({
      kind: 'add',
      left: { a: 3, b: 5 },
      right: { a: 3, b: 1 },
    })
    expect(splitTotal(split)).toBe(18)
  })
})

describe('chooseSplit — position preservation', () => {
  it('7×6 puts the split parts in the a-slot (7 was a)', () => {
    const split = chooseSplit(7, 6)
    expect(split).toEqual({
      kind: 'add',
      left: { a: 5, b: 6 },
      right: { a: 2, b: 6 },
    })
  })

  it('6×7 puts the split parts in the b-slot (7 was b)', () => {
    const split = chooseSplit(6, 7)
    expect(split).toEqual({
      kind: 'add',
      left: { a: 6, b: 5 },
      right: { a: 6, b: 2 },
    })
  })

  it('9×6 with sub keeps 6 (o) in the b-slot, 9 split in the a-slot', () => {
    const split = chooseSplit(9, 6, { allowSubtraction: true })
    expect(split).toEqual({
      kind: 'sub',
      left: { a: 10, b: 6 },
      right: { a: 1, b: 6 },
    })
  })

  it('6×9 with sub keeps 6 (o) in the a-slot, 9 split in the b-slot', () => {
    const split = chooseSplit(6, 9, { allowSubtraction: true })
    expect(split).toEqual({
      kind: 'sub',
      left: { a: 6, b: 10 },
      right: { a: 6, b: 1 },
    })
  })

  // Note: f=8 is > 5, so per rule 2 a bare chooseSplit(8, 3) with no rng
  // deterministically returns the add 5-split (see the "rng-driven variety"
  // suite below) — double only happens for f=8 when rng rolls it. These two
  // cases instead use f=4 (rule 3: f even <= 5 -> always double) to pin down
  // position preservation for 'double' deterministically, and separately
  // confirm the *shape* of an rng-forced double at f=8 in both orientations.

  it('4×3 double keeps the half in the a-slot (4 was a)', () => {
    const split = chooseSplit(4, 3)
    expect(split).toEqual({ kind: 'double', half: { a: 2, b: 3 } })
  })

  it('3×4 double keeps the half in the b-slot (4 was b)', () => {
    const split = chooseSplit(3, 4)
    expect(split).toEqual({ kind: 'double', half: { a: 3, b: 2 } })
  })

  it('rng-forced double at f=8 keeps the half in the a-slot (8 was a)', () => {
    const rng = findRngThatDoubles(8, 3)
    const split = chooseSplit(8, 3, { rng })
    expect(split).toEqual({ kind: 'double', half: { a: 4, b: 3 } })
  })

  it('rng-forced double at f=8 keeps the half in the b-slot (8 was b)', () => {
    const rng = findRngThatDoubles(3, 8)
    const split = chooseSplit(3, 8, { rng })
    expect(split).toEqual({ kind: 'double', half: { a: 3, b: 4 } })
  })
})

describe('chooseSplit — equal factors', () => {
  it('splits a on a===b (e.g. 6×6)', () => {
    // a === b: split a. f = 6, o = 6, f>5 even, no rng -> add 5-split.
    const split = chooseSplit(6, 6)
    expect(split).toEqual({
      kind: 'add',
      left: { a: 5, b: 6 },
      right: { a: 1, b: 6 },
    })
    expect(splitTotal(split)).toBe(36)
  })
})

describe('chooseSplit — subtraction gating', () => {
  it('never returns a sub split when allowSubtraction is falsy, even for 9s', () => {
    expect(chooseSplit(9, 4).kind).not.toBe('sub')
    expect(chooseSplit(4, 9).kind).not.toBe('sub')
    expect(chooseSplit(9, 4, {}).kind).not.toBe('sub')
    expect(chooseSplit(9, 4, { allowSubtraction: false }).kind).not.toBe('sub')
  })

  it('only 9-as-harder-factor triggers sub, never other values', () => {
    for (let o = 2; o <= 12; o++) {
      if (o === 9) continue
      const split = chooseSplit(9, o, { allowSubtraction: true })
      // 9 is only "harder" (== max) when o <= 9; when o > 9, o becomes f instead.
      if (o <= 9) {
        expect(split.kind).toBe('sub')
      } else {
        expect(split.kind).not.toBe('sub')
      }
    }
  })
})

describe('chooseSplit — rng-driven variety for even f > 5', () => {
  const evenHardFactors = [6, 8, 10, 12]

  it('without rng, always returns the 5-split (add), never double, for every seed-independent call', () => {
    for (const f of evenHardFactors) {
      const split = chooseSplit(f, 4)
      expect(split.kind).toBe('add')
    }
  })

  it('with rng, both the 5-split and the double are reachable across seeds, for each even hard factor', () => {
    for (const f of evenHardFactors) {
      const kinds = new Set<string>()
      for (let seed = 0; seed < 200; seed++) {
        const split = chooseSplit(f, 4, { rng: mulberry32(seed) })
        kinds.add(split.kind)
      }
      expect(kinds.has('add')).toBe(true)
      expect(kinds.has('double')).toBe(true)
      expect(kinds.size).toBe(2)
    }
  })

  it('rng-selected double for even f has half = f/2 and preserves total', () => {
    for (const f of evenHardFactors) {
      for (let seed = 0; seed < 50; seed++) {
        const split = chooseSplit(f, 5, { rng: mulberry32(seed) })
        if (split.kind === 'double') {
          expect(split.half.a * split.half.b * 2).toBe(f * 5)
        }
        expect(splitTotal(split)).toBe(f * 5)
      }
    }
  })

  it('rng does not affect odd hard factors (7, 9 without sub, 11) — always add', () => {
    for (const f of [7, 11]) {
      for (let seed = 0; seed < 20; seed++) {
        expect(chooseSplit(f, 4, { rng: mulberry32(seed) }).kind).toBe('add')
      }
    }
    for (let seed = 0; seed < 20; seed++) {
      expect(chooseSplit(9, 4, { rng: mulberry32(seed) }).kind).toBe('add')
    }
  })

  it('rng does not affect small even hard factors (2, 4) — always double', () => {
    for (const f of [2, 4]) {
      for (let seed = 0; seed < 20; seed++) {
        expect(chooseSplit(f, 1, { rng: mulberry32(seed) }).kind).toBe('double')
      }
    }
  })
})

describe('chooseSplit — exhaustive sweep', () => {
  const seeds = [1, 2, 3]

  function allOptions(): Array<{ allowSubtraction: boolean; rng: (() => number) | undefined }> {
    const options: Array<{ allowSubtraction: boolean; rng: (() => number) | undefined }> = []
    for (const allowSubtraction of [false, true]) {
      options.push({ allowSubtraction, rng: undefined })
      for (const seed of seeds) {
        options.push({ allowSubtraction, rng: mulberry32(seed) })
      }
    }
    return options
  }

  function isIntegerInRange(n: number): boolean {
    return Number.isInteger(n) && n >= 1 && n <= 12
  }

  function partsOf(split: Split): Array<{ a: number; b: number }> {
    if (split.kind === 'double') return [split.half]
    return [split.left, split.right]
  }

  it('every a,b in 2..12, both orders, every option combo: total matches, parts are valid integers, sub only when allowed', () => {
    for (let a = 2; a <= 12; a++) {
      for (let b = 2; b <= 12; b++) {
        for (const { allowSubtraction, rng } of allOptions()) {
          const opts = rng === undefined ? { allowSubtraction } : { allowSubtraction, rng }
          const split = chooseSplit(a, b, opts)

          expect(splitTotal(split)).toBe(a * b)

          if (!allowSubtraction) {
            expect(split.kind).not.toBe('sub')
          }

          for (const part of partsOf(split)) {
            expect(isIntegerInRange(part.a)).toBe(true)
            expect(isIntegerInRange(part.b)).toBe(true)
          }
        }
      }
    }
  })
})
