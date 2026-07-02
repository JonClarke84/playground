/**
 * Background music via Strudel (PRODUCT.md §4.8) — fully synthesized
 * (oscillators + noise, no samples), so it works offline and adds nothing
 * to first paint: the engine is dynamically imported on first play.
 *
 * Strudel's initStrudel() registers `evaluate`/`hush` as globals; we declare
 * them rather than cast. evaluate() replaces the running pattern, so tracks
 * are keyed and switching is a single call.
 */

declare global {
  // eslint-disable-next-line no-var
  var evaluate: ((code: string) => Promise<unknown>) | undefined
  // eslint-disable-next-line no-var
  var hush: (() => void) | undefined
}

let engine: Promise<void> | null = null
let currentKey: string | null = null

function ensureEngine(): Promise<void> {
  if (engine === null) {
    engine = import('@strudel/web').then(({ initStrudel }) => {
      initStrudel()
    })
  }
  return engine
}

export interface MusicTrack {
  key: string
  code: string
}

/** Gentle sparkly loop for the title, map, spellbook and dressing room. */
export const CALM_TRACK: MusicTrack = {
  key: 'calm',
  code: `
setcps(0.38)
stack(
  n("0 2 4 7 9 7 4 2").scale("C5:major")
    .s("triangle").attack(0.02).decay(0.15).sustain(0.25).release(0.4)
    .room(0.6).gain(0.13),
  n("<7 9> ~ <4 5> ~").scale("C6:major")
    .s("sine").attack(0.04).decay(0.2).sustain(0).release(0.5)
    .room(0.8).gain(0.07),
  note("<c2 a1 f2 g2>").s("sine")
    .attack(0.1).decay(0.4).sustain(0.5).release(0.9).gain(0.22)
)`,
}

interface DuelTheme {
  cps: number
  body: string
}

/**
 * One battle theme per academy room (PRODUCT.md §4.6) — not key shifts,
 * distinct compositions matched to each scene's character.
 */
const DUEL_THEMES: Record<number, DuelTheme> = {
  // The Library — sneaky tiptoe study: plucked staccato, hushed brushes.
  2: {
    cps: 0.42,
    body: `stack(
  n("0 ~ 2 ~ 4 ~ [2 0] ~").scale("C4:major")
    .s("triangle").decay(0.09).sustain(0).room(0.4).gain(0.16),
  n("~ 7 ~ [9 7] ~ 4 ~ ~").scale("C5:major")
    .s("sine").decay(0.08).sustain(0).room(0.6).gain(0.09),
  note("c2 ~ g1 ~ a1 ~ g1 ~").s("sine")
    .attack(0.02).decay(0.25).sustain(0.2).release(0.2).gain(0.22),
  s("white*4").decay(0.012).sustain(0).gain(0.025)
)`,
  },
  // Herb Garden — pastoral lilt in D, swaying triplets.
  3: {
    cps: 0.36,
    body: `stack(
  n("[0 2 4] [7 4 2] [5 4 2] [4 2 0]").scale("D4:major")
    .s("sine").attack(0.03).decay(0.2).sustain(0.15).release(0.25)
    .room(0.6).gain(0.15),
  n("[~ ~ 9] [~ ~ 11] [~ ~ 9] [~ ~ 7]").scale("D5:major")
    .s("triangle").decay(0.1).sustain(0).room(0.7).gain(0.06),
  note("<d2 g1 a1 d2>").s("sine")
    .attack(0.08).decay(0.4).sustain(0.4).release(0.6).gain(0.22)
)`,
  },
  // The Owlery — moonlit waltz, soft hooting fifths.
  4: {
    cps: 0.34,
    body: `stack(
  note("[a1 e2 e2]").s("triangle")
    .attack(0.02).decay(0.2).sustain(0.2).release(0.2).gain(0.2),
  n("<0 ~ 2 ~> <4 5> <2 ~>").scale("A3:minor")
    .s("sine").attack(0.06).decay(0.3).sustain(0.2).release(0.4)
    .room(0.7).gain(0.14),
  note("<~ a4 ~ e4>").s("sine")
    .attack(0.12).decay(0.3).sustain(0).release(0.5).room(0.8).gain(0.06)
)`,
  },
  // Potions Lab — bubbly funk: rubbery square bass, blip lead.
  5: {
    cps: 0.5,
    body: `stack(
  n("[7 ~] [5 7] ~ [9 7] [5 ~] [4 5] ~ [7 9]").scale("C4:minor")
    .s("square").lpf(1300).decay(0.06).sustain(0).gain(0.1),
  note("c2 [~ c2] eb2 [g1 bb1] c2 [~ c2] f2 [eb2 g1]").s("square")
    .lpf(360).attack(0.01).decay(0.15).sustain(0.25).release(0.08).gain(0.16),
  n("~ ~ [14 16] ~ ~ [12 14] ~ ~").scale("C6:minor")
    .s("sine").decay(0.05).sustain(0).room(0.5).gain(0.05),
  note("c1*4").s("sine").decay(0.13).sustain(0).gain(0.28)
)`,
  },
  // Star Tower — slow dreaming arps drifting in echo.
  6: {
    cps: 0.3,
    body: `stack(
  n("0 4 7 11 14 11 7 4").scale("G4:major")
    .s("sine").attack(0.02).decay(0.2).sustain(0.2).release(0.5)
    .room(0.85).delay(0.4).gain(0.12),
  n("<21 18>").scale("G4:major")
    .s("triangle").attack(0.3).release(1).room(0.9).gain(0.05),
  note("<g1 e1 c2 d2>").s("sine")
    .attack(0.15).decay(0.5).sustain(0.5).release(1.2).gain(0.2)
)`,
  },
  // Great Hall — the classic duel loop: pop-adjacent C minor drive.
  7: {
    cps: 0.55,
    body: `stack(
  n("0 [2 4] <3 5> [7 4] 2 [4 0] <5 3> [~ 7]").scale("C4:minor")
    .s("sawtooth").lpf(950).attack(0.01).decay(0.12).sustain(0.18).release(0.12)
    .room(0.3).gain(0.11),
  note("c2 ~ c2 g1 ~ c2 eb2 g1").s("square")
    .lpf(330).attack(0.01).decay(0.18).sustain(0.3).release(0.1).gain(0.17),
  s("white*8").decay(0.03).sustain(0).gain("[0.05 0.02]*4"),
  note("c1*4").s("sine").decay(0.15).sustain(0).gain(0.3)
)`,
  },
  // Broom Yard — galloping race at full pelt.
  8: {
    cps: 0.62,
    body: `stack(
  note("e2 [e2 e2] b1 [e2 e2] g2 [e2 e2] a2 [b1 b1]").s("sawtooth")
    .lpf(420).attack(0.01).decay(0.12).sustain(0.2).release(0.05).gain(0.16),
  n("0 ~ [3 5] ~ 7 [5 3] 0 ~").scale("E4:minor")
    .s("square").lpf(1100).decay(0.07).sustain(0).gain(0.1),
  s("white*8").decay(0.025).sustain(0).gain("[0.06 0.02 0.04 0.02]*2"),
  note("e1*4").s("sine").decay(0.14).sustain(0).gain(0.3)
)`,
  },
  // Clock Tower — tick-tock machinery, panned escapement clicks.
  9: {
    cps: 0.46,
    body: `stack(
  s("white*4").decay(0.01).sustain(0).gain("[0.07 0.03]*2").pan("0.25 0.75 0.25 0.75"),
  n("0 0 7 0 3 0 7 5").scale("A3:minor")
    .s("triangle").decay(0.07).sustain(0).gain(0.14),
  n("~ ~ ~ ~ ~ ~ [12 14] ~").scale("A4:minor")
    .s("sine").decay(0.08).sustain(0).room(0.5).gain(0.06),
  note("a1 ~ ~ e1 ~ ~ a1 ~").s("sine")
    .attack(0.02).decay(0.3).sustain(0.3).release(0.3).gain(0.2)
)`,
  },
  // The Treasury — jaunty swing among the gold.
  10: {
    cps: 0.44,
    body: `stack(
  n("[0 ~ 2] [4 ~ 5] [7 ~ 9] [7 ~ 4]").scale("C4:major")
    .s("triangle").decay(0.1).sustain(0.1).release(0.1).gain(0.15),
  note("[c2 ~ ~] [e2 ~ ~] [g2 ~ ~] [a2 ~ g2]").s("sine")
    .attack(0.02).decay(0.2).sustain(0.3).release(0.15).gain(0.2),
  s("[white ~ white]*2").decay(0.02).sustain(0).gain(0.035),
  n("[~ ~ 14] ~ [~ ~ 16] ~").scale("C5:major")
    .s("sine").decay(0.06).sustain(0).room(0.6).gain(0.05)
)`,
  },
  // Music Room — an elegant self-playing waltz.
  11: {
    cps: 0.32,
    body: `stack(
  n("[0,2,4] ~ ~ [3,5,7] ~ ~").scale("F4:major")
    .s("triangle").attack(0.02).decay(0.3).sustain(0.15).release(0.3)
    .room(0.6).gain(0.11),
  n("[14 ~ 12] [~ 11 ~] [9 ~ 7] [~ 5 ~]").scale("F4:major")
    .s("sine").decay(0.15).sustain(0).room(0.7).gain(0.08),
  note("[f2 ~ ~] [c2 ~ ~] [g2 ~ ~] [c2 ~ ~]").s("sine")
    .attack(0.05).decay(0.35).sustain(0.3).release(0.4).gain(0.2)
)`,
  },
  // The Rooftops — the final showdown: dark, driving, big.
  12: {
    cps: 0.58,
    body: `stack(
  n("0 [0 3] 5 [3 7] 8 [7 5] 3 [~ 10]").scale("C4:minor")
    .s("sawtooth").lpf(1100).attack(0.01).decay(0.11).sustain(0.2).release(0.1)
    .room(0.4).gain(0.12),
  note("c2 c2 ab1 ab1 bb1 bb1 g1 [g1 bb1]").s("sawtooth")
    .lpf(300).attack(0.01).decay(0.16).sustain(0.35).release(0.08).gain(0.16),
  n("<12 ~ 15 ~>").scale("C5:minor")
    .s("sine").attack(0.05).decay(0.4).sustain(0).release(0.6).room(0.8).gain(0.05),
  s("white*8").decay(0.028).sustain(0).gain("[0.055 0.02]*4"),
  note("c1*4").s("sine").decay(0.16).sustain(0).gain(0.32)
)`,
  },
}

/** Free play (no location) gets the Great Hall classic. */
const FREE_PLAY_THEME = DUEL_THEMES[7]

/** Each room's own battle theme; exams run a touch faster. */
export function duelTrack(table: number | null, exam: boolean): MusicTrack {
  const theme = table !== null ? (DUEL_THEMES[table] ?? FREE_PLAY_THEME) : FREE_PLAY_THEME
  const cps = theme.cps * (exam ? 1.1 : 1)
  return {
    key: `duel:${table ?? 'free'}:${exam}`,
    code: `\nsetcps(${cps.toFixed(3)})\n${theme.body}`,
  }
}

/** Starts (or switches to) a track. Idempotent per track key. */
export async function startMusic(track: MusicTrack): Promise<void> {
  if (import.meta.env.DEV) console.debug('[music] start', track.key, 'from', currentKey)
  if (currentKey === track.key) return
  currentKey = track.key
  await ensureEngine()
  // A stop/switch may have happened while the engine loaded.
  if (currentKey !== track.key) return
  await globalThis.evaluate?.(track.code)
}

export function stopMusic(): void {
  if (import.meta.env.DEV) console.debug('[music] stop; hush is', typeof globalThis.hush)
  currentKey = null
  globalThis.hush?.()
}
