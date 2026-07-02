/**
 * Tiny synthesized SFX via Web Audio (PRODUCT.md §4.8) — no asset files,
 * fully offline, and the game is completely playable muted.
 */

let ctx: AudioContext | null = null
let soundOn = true

export function setSoundEnabled(on: boolean): void {
  soundOn = on
}

function ensureContext(): AudioContext | null {
  if (!soundOn) return null
  if (ctx === null) {
    ctx = new AudioContext()
  }
  if (ctx.state === 'suspended') {
    void ctx.resume()
  }
  return ctx
}

interface NoteOptions {
  freq: number
  at: number
  duration: number
  type?: OscillatorType
  gain?: number
  glideTo?: number
}

function note(audio: AudioContext, opts: NoteOptions): void {
  const osc = audio.createOscillator()
  const amp = audio.createGain()
  const start = audio.currentTime + opts.at
  const end = start + opts.duration

  osc.type = opts.type ?? 'triangle'
  osc.frequency.setValueAtTime(opts.freq, start)
  if (opts.glideTo !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(opts.glideTo, end)
  }

  const peak = opts.gain ?? 0.12
  amp.gain.setValueAtTime(0, start)
  amp.gain.linearRampToValueAtTime(peak, start + 0.015)
  amp.gain.exponentialRampToValueAtTime(0.0004, end)

  osc.connect(amp).connect(audio.destination)
  osc.start(start)
  osc.stop(end + 0.05)
}

/** Bright rising arpeggio — a successful cast. */
function cast(): void {
  const audio = ensureContext()
  if (!audio) return
  note(audio, { freq: 659, at: 0, duration: 0.18 })
  note(audio, { freq: 784, at: 0.07, duration: 0.18 })
  note(audio, { freq: 988, at: 0.14, duration: 0.28 })
  note(audio, { freq: 1319, at: 0.21, duration: 0.4, gain: 0.09 })
}

/** Comic droop — a fizzled spell. Soft, never harsh. */
function fizzle(): void {
  const audio = ensureContext()
  if (!audio) return
  note(audio, { freq: 320, at: 0, duration: 0.5, type: 'sawtooth', gain: 0.05, glideTo: 110 })
  note(audio, { freq: 240, at: 0.05, duration: 0.4, type: 'triangle', gain: 0.06, glideTo: 90 })
}

/** Quick pop for a bursting bubble. */
function pop(): void {
  const audio = ensureContext()
  if (!audio) return
  note(audio, { freq: 520, at: 0, duration: 0.09, type: 'square', gain: 0.07, glideTo: 260 })
}

/** Sparkly chime — the Hint Wand. */
function hint(): void {
  const audio = ensureContext()
  if (!audio) return
  note(audio, { freq: 1175, at: 0, duration: 0.14, type: 'sine', gain: 0.09 })
  note(audio, { freq: 1568, at: 0.09, duration: 0.22, type: 'sine', gain: 0.08 })
}

/** Gentle tap feedback for menus. */
function tap(): void {
  const audio = ensureContext()
  if (!audio) return
  note(audio, { freq: 740, at: 0, duration: 0.08, type: 'sine', gain: 0.06 })
}

/** Finale fanfare, scaled by tier (0 good, 1 great, 2 grand). */
function finale(tier: number): void {
  const audio = ensureContext()
  if (!audio) return
  const roots = [523, 659, 784]
  for (let i = 0; i <= tier; i++) {
    note(audio, { freq: roots[i % roots.length] * (1 + i * 0.5), at: i * 0.16, duration: 0.5, gain: 0.1 })
    note(audio, { freq: roots[(i + 1) % roots.length], at: i * 0.16 + 0.05, duration: 0.5, gain: 0.07 })
  }
  note(audio, { freq: 1047, at: 0.5 + tier * 0.1, duration: 0.9, gain: 0.11 })
}

export const sfx = { cast, fizzle, pop, hint, tap, finale }
