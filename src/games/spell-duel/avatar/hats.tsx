import type { ComponentType } from 'react'
import type { HatId } from './avatarTypes'

/**
 * Hats sit over hair-front. Canvas: 240×320, crown of head ≈ y 64,
 * head spans x 67–173.
 */

export function PointedHat() {
  return (
    <g>
      {/* Brim first, cone seated on top, band + buckle over the join */}
      <ellipse cx="120" cy="62" rx="54" ry="13" fill="#2c1a4e" />
      <path
        d="M 84 58 C 92 32 104 12 124 2 C 142 -6 160 -2 162 8
           C 163 14 154 16 148 14 C 140 12 134 18 138 26
           C 146 36 154 48 159 60 C 134 72 102 70 84 58 Z"
        fill="#3b2467"
      />
      <path
        d="M 84 58 C 92 32 104 12 124 2 C 118 20 114 40 118 62 C 105 62 92 61 84 58 Z"
        fill="#4b2f80"
      />
      <path d="M 83 59 Q 120 73 160 58 L 155 46 Q 120 60 88 47 Z" fill="var(--emerald-600)" />
      <rect x="112" y="48" width="17" height="15" rx="3" fill="var(--gold-500)" />
      <rect x="116.5" y="52" width="8" height="7" rx="2" fill="#3b2467" />
    </g>
  )
}

export function Tiara() {
  return (
    <g>
      <path
        d="M 88 58 L 96 34 L 108 52 L 120 26 L 132 52 L 144 34 L 152 58
           Q 120 68 88 58 Z"
        fill="var(--gold-500)"
      />
      <circle cx="120" cy="38" r="5" fill="var(--pink-400)" />
      <circle cx="98" cy="46" r="3.4" fill="var(--emerald-500)" />
      <circle cx="142" cy="46" r="3.4" fill="var(--emerald-500)" />
    </g>
  )
}

export function WideBrimHat() {
  return (
    <g>
      {/* Big glamorous brim */}
      <ellipse cx="120" cy="62" rx="62" ry="15" fill="#4b2f80" />
      <path
        d="M 58 62 A 62 15 0 0 0 182 62 A 62 22 0 0 1 58 62 Z"
        fill="#3b2467"
      />
      {/* Tall rounded dome */}
      <path d="M 90 58 C 90 26 150 26 150 58 Q 120 68 90 58 Z" fill="#4b2f80" />
      <path d="M 90 58 C 90 34 108 27 120 27 C 108 33 102 44 102 60 Q 95 60 90 58 Z" fill="#5a3b96" />
      {/* Ribbon + bow */}
      <path d="M 89 56 Q 120 67 151 56 L 149 44 Q 120 54 92 44 Z" fill="var(--pink-500)" />
      <g fill="var(--pink-400)">
        <circle cx="150" cy="50" r="4.5" />
        <path d="M 150 50 L 163 41 L 161 52 Z" />
        <path d="M 150 50 L 163 59 L 159 46 Z" />
      </g>
    </g>
  )
}

export function FlowerCrown() {
  const flower = (x: number, y: number, petal: string, centre: string, r: number) => (
    <g>
      {[0, 72, 144, 216, 288].map((deg) => (
        <circle
          key={deg}
          cx={x + Math.cos((deg * Math.PI) / 180) * r}
          cy={y + Math.sin((deg * Math.PI) / 180) * r}
          r={r * 0.72}
          fill={petal}
        />
      ))}
      <circle cx={x} cy={y} r={r * 0.62} fill={centre} />
    </g>
  )
  return (
    <g>
      {/* Leaves tucked along the hairline */}
      <g fill="var(--emerald-600)">
        <ellipse cx="88" cy="66" rx="9" ry="4.5" transform="rotate(-24 88 66)" />
        <ellipse cx="120" cy="56" rx="9" ry="4.5" transform="rotate(8 120 56)" />
        <ellipse cx="152" cy="66" rx="9" ry="4.5" transform="rotate(24 152 66)" />
      </g>
      {flower(74, 78, 'var(--pink-400)', 'var(--gold-400)', 7)}
      {flower(97, 64, '#fff8f0', 'var(--pink-500)', 6)}
      {flower(120, 58, 'var(--gold-400)', '#fff8f0', 7.5)}
      {flower(143, 64, '#fff8f0', 'var(--pink-500)', 6)}
      {flower(166, 78, 'var(--pink-400)', 'var(--gold-400)', 7)}
    </g>
  )
}

export function Beret() {
  return (
    <g>
      {/* Slouched artist beret, tilted to her right */}
      <path
        d="M 74 64 C 66 44 84 26 118 24 C 152 22 172 38 168 56
           C 166 66 152 70 132 70 C 106 70 82 72 74 64 Z"
        fill="#b78bff"
      />
      <path
        d="M 74 64 C 80 70 100 70 126 69 C 152 68 164 64 168 56
           C 166 66 152 70 132 70 C 106 70 82 72 74 64 Z"
        fill="#9563e6"
      />
      {/* Stalk */}
      <path d="M 118 24 C 118 16 126 14 128 18" stroke="#9563e6" strokeWidth="5" strokeLinecap="round" fill="none" />
    </g>
  )
}

/** Registry the avatar composer renders from. Add new hats here. */
export const HAT_REGISTRY: Record<HatId, ComponentType | null> = {
  none: null,
  pointed: PointedHat,
  tiara: Tiara,
  widebrim: WideBrimHat,
  flowers: FlowerCrown,
  beret: Beret,
}
