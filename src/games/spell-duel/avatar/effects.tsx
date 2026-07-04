import type { ComponentType } from 'react'
import type { EffectId } from './avatarTypes'
import './effects.css'

/**
 * Sparkle-effect art (PRODUCT.md §4.7) — the aura layer surrounding the
 * witch, the most desirable unlocks in the shop. Every effect is a small
 * flock of bold, flat-vector shapes animated in effects.css, rendered as a
 * `<g>` layer on top of the whole figure (x 20–220, y 10–300 of the 240×320
 * canvas). Kept chunky and saturated so they still read at a 104px
 * thumbnail — no hairline strokes or single wispy particles.
 */

/** 4-point sparkle/diamond spark, the classic twinkle shape. */
function SparkSpark({ x, y, r, delay, fill }: { x: number; y: number; r: number; delay: number; fill: string }) {
  return (
    <path
      className="fx-sparkle"
      style={{ animationDelay: `${delay}s` }}
      d={`M ${x} ${y - r} L ${x + r * 0.32} ${y - r * 0.32} L ${x + r} ${y} L ${x + r * 0.32} ${y + r * 0.32} L ${x} ${y + r} L ${x - r * 0.32} ${y + r * 0.32} L ${x - r} ${y} L ${x - r * 0.32} ${y - r * 0.32} Z`}
      fill={fill}
    />
  )
}

export function Sparkles() {
  const sparks: Array<[number, number, number, number]> = [
    [40, 70, 9, 0],
    [200, 60, 8, 0.3],
    [30, 160, 7, 0.6],
    [210, 170, 9, 0.9],
    [60, 250, 8, 1.2],
    [180, 260, 7, 0.2],
    [120, 30, 8, 0.5],
    [150, 120, 6.5, 1.0],
  ]
  return (
    <g className="avatar-effect-layer">
      {sparks.map(([x, y, r, delay], i) => (
        <SparkSpark key={i} x={x} y={y} r={r} delay={delay} fill="var(--gold-400)" />
      ))}
    </g>
  )
}

export function Fireflies() {
  const flies: Array<[number, number, number]> = [
    [35, 100, 0],
    [205, 90, 0.5],
    [45, 220, 1.0],
    [195, 230, 1.5],
    [30, 40, 0.8],
    [210, 280, 0.3],
  ]
  return (
    <g className="avatar-effect-layer">
      {flies.map(([x, y, delay], i) => (
        <g key={i} className="fx-firefly" style={{ animationDelay: `${delay}s` }}>
          <circle className="fx-firefly-glow" style={{ animationDelay: `${delay}s` }} cx={x} cy={y} r="9" fill="var(--gold-glow)" />
          <circle cx={x} cy={y} r="4" fill="var(--gold-400)" />
        </g>
      ))}
    </g>
  )
}

function ButterflyWings({ colour }: { colour: string }) {
  return (
    <>
      <path
        className="fx-butterfly-wing fx-butterfly-wing-left"
        d="M 0 0 C -12 -12 -16 -2 -10 6 C -14 12 -10 20 0 16 Z"
        fill={colour}
      />
      <path
        className="fx-butterfly-wing fx-butterfly-wing-right"
        d="M 0 0 C 12 -12 16 -2 10 6 C 14 12 10 20 0 16 Z"
        fill={colour}
      />
    </>
  )
}

export function Butterflies() {
  const flock: Array<[number, number, number, string]> = [
    [45, 90, 0, 'var(--pink-400)'],
    [195, 130, 1.3, '#c9a8f5'],
    [55, 230, 2.4, 'var(--pink-500)'],
  ]
  return (
    <g className="avatar-effect-layer">
      {flock.map(([x, y, delay, colour], i) => (
        <g key={i} className="fx-butterfly" style={{ animationDelay: `${delay}s` }} transform={`translate(${x} ${y})`}>
          <ButterflyWings colour={colour} />
          <ellipse cx="0" cy="8" rx="1.6" ry="7" fill="#3b2a4f" />
        </g>
      ))}
    </g>
  )
}

function MusicNote({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <g className="fx-note" style={{ animationDelay: `${delay}s` }} transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="14" rx="5.5" ry="4" fill="var(--pink-500)" transform="rotate(-14 0 14)" />
      <rect x="4.4" y="-14" width="2.6" height="28" rx="1.3" fill="var(--pink-500)" />
      <path d="M 4.4 -14 C 12 -12 13 -4 6.4 -1 Z" fill="var(--pink-500)" />
    </g>
  )
}

export function Notes() {
  const notes: Array<[number, number, number]> = [
    [40, 220, 0],
    [200, 200, 0.7],
    [55, 100, 1.4],
    [190, 90, 2.1],
    [120, 260, 0.4],
  ]
  return (
    <g className="avatar-effect-layer">
      {notes.map(([x, y, delay], i) => (
        <MusicNote key={i} x={x} y={y} delay={delay} />
      ))}
    </g>
  )
}

export function Snow() {
  const flakes: Array<[number, number, number, number]> = [
    [40, 4.5, 0, 5.2],
    [70, 3.5, 0.5, 4.6],
    [100, 5, 1.0, 5.8],
    [130, 3.8, 1.5, 4.9],
    [160, 4.6, 0.2, 5.4],
    [190, 3.6, 0.8, 4.7],
    [55, 4, 1.3, 5.1],
    [85, 3.4, 1.8, 4.4],
    [145, 4.8, 0.6, 5.6],
    [205, 3.8, 1.1, 5.0],
  ]
  return (
    <g className="avatar-effect-layer">
      {flakes.map(([x, r, delay, duration], i) => (
        <circle
          key={i}
          className="fx-snow"
          style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
          cx={x}
          cy="0"
          r={r}
          fill="#fff8f0"
          opacity="0.9"
        />
      ))}
    </g>
  )
}

function FivePointStar({ x, y, r, delay, orbit }: { x: number; y: number; r: number; delay: number; orbit?: boolean }) {
  const points = [0, 1, 2, 3, 4].flatMap((i) => {
    const outerAngle = -Math.PI / 2 + (i * 2 * Math.PI) / 5
    const innerAngle = outerAngle + Math.PI / 5
    return [
      [x + Math.cos(outerAngle) * r, y + Math.sin(outerAngle) * r],
      [x + Math.cos(innerAngle) * r * 0.42, y + Math.sin(innerAngle) * r * 0.42],
    ]
  })
  const d = `M ${points.map(([px, py]) => `${px} ${py}`).join(' L ')} Z`
  const star = (
    <path className="fx-star" style={{ animationDelay: `${delay}s` }} d={d} fill="var(--gold-500)" />
  )
  if (!orbit) return star
  return (
    <g className="fx-star-orbit" style={{ animationDelay: `${delay}s`, transformOrigin: `${x}px ${y}px` }}>
      {star}
    </g>
  )
}

export function Stars() {
  return (
    <g className="avatar-effect-layer">
      <FivePointStar x={35} y={80} r={10} delay={0} orbit />
      <FivePointStar x={205} y={70} r={9} delay={0.5} orbit />
      <FivePointStar x={30} y={210} r={8.5} delay={1.0} />
      <FivePointStar x={210} y={220} r={10} delay={1.5} />
      <FivePointStar x={120} y={22} r={9} delay={0.8} />
    </g>
  )
}

export function Bubbles() {
  const bubbles: Array<[number, number, number, number]> = [
    [40, 260, 8, 0],
    [200, 250, 7, 0.6],
    [55, 180, 6, 1.2],
    [190, 170, 8.5, 1.8],
    [30, 290, 6.5, 0.3],
    [210, 100, 7.5, 2.2],
    [120, 280, 6, 0.9],
  ]
  return (
    <g className="avatar-effect-layer">
      {bubbles.map(([x, y, r, delay], i) => (
        <g key={i} className="fx-bubble" style={{ animationDelay: `${delay}s` }}>
          <circle cx={x} cy={y} r={r} fill="var(--emerald-glow)" stroke="#fff8f0" strokeWidth="1.5" opacity="0.7" />
          <circle cx={x - r * 0.32} cy={y - r * 0.32} r={r * 0.28} fill="#fff8f0" opacity="0.8" />
        </g>
      ))}
    </g>
  )
}

/** Registry the avatar composer renders from. `none` renders nothing. */
export const EFFECT_REGISTRY: Record<EffectId, ComponentType | null> = {
  none: null,
  sparkles: Sparkles,
  fireflies: Fireflies,
  butterflies: Butterflies,
  notes: Notes,
  snow: Snow,
  stars: Stars,
  bubbles: Bubbles,
}
