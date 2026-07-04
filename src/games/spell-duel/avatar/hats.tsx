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

export function Crown() {
  return (
    <g>
      {/* Gold band */}
      <path d="M 84 68 L 88 52 L 156 52 L 160 68 Q 120 78 84 68 Z" fill="var(--gold-500)" />
      {/* Five points */}
      <path
        d="M 88 52 L 92 24 L 102 44 L 120 16 L 138 44 L 148 24 L 152 52 Z"
        fill="var(--gold-500)"
      />
      <path d="M 88 52 L 92 24 L 102 44 L 108 52 Z" fill="var(--gold-400)" />
      <path d="M 132 52 L 138 44 L 148 24 L 152 52 Z" fill="var(--gold-400)" />
      {/* Jewels */}
      <circle cx="120" cy="34" r="5" fill="var(--pink-400)" />
      <circle cx="98" cy="60" r="3.4" fill="var(--emerald-500)" />
      <circle cx="142" cy="60" r="3.4" fill="var(--emerald-500)" />
      <circle cx="120" cy="65" r="3" fill="var(--pink-500)" />
    </g>
  )
}

export function MoonHat() {
  return (
    <g>
      {/* Brim, cone seated on top — same construction as PointedHat, midnight colourway */}
      <ellipse cx="120" cy="62" rx="54" ry="13" fill="var(--midnight-800)" />
      <path
        d="M 84 58 C 92 32 104 12 124 2 C 142 -6 160 -2 162 8
           C 163 14 154 16 148 14 C 140 12 134 18 138 26
           C 146 36 154 48 159 60 C 134 72 102 70 84 58 Z"
        fill="var(--midnight-600)"
      />
      <path
        d="M 84 58 C 92 32 104 12 124 2 C 118 20 114 40 118 62 C 105 62 92 61 84 58 Z"
        fill="var(--midnight-500)"
      />
      <path d="M 83 59 Q 120 73 160 58 L 155 46 Q 120 60 88 47 Z" fill="var(--gold-500)" />
      {/* Gold crescent moon */}
      <path
        d="M 132 22 a 9 9 0 1 0 6 15.5 a 7 7 0 1 1 -6 -15.5 Z"
        fill="var(--gold-400)"
      />
      {/* Tiny stars scattered on the cone */}
      <path d="M 108 30 l 1.6 4 l 4 1.2 l -4 1.2 l -1.6 4 l -1.6 -4 l -4 -1.2 l 4 -1.2 Z" fill="var(--gold-400)" />
      <path d="M 118 12 l 1.2 3 l 3 1 l -3 1 l -1.2 3 l -1.2 -3 l -3 -1 l 3 -1 Z" fill="var(--gold-400)" />
      <path d="M 141 42 l 1.2 3 l 3 1 l -3 1 l -1.2 3 l -1.2 -3 l -3 -1 l 3 -1 Z" fill="#fff8f0" />
    </g>
  )
}

export function TopHat() {
  return (
    <g>
      {/* Brim */}
      <ellipse cx="120" cy="63" rx="50" ry="11" fill="#241d31" />
      {/* Tall cylindrical crown */}
      <path d="M 96 63 L 96 14 Q 120 6 144 14 L 144 63 Q 120 71 96 63 Z" fill="#2f2740" />
      <path d="M 96 63 L 96 14 Q 108 9 120 8 L 120 66 Q 108 66 96 63 Z" fill="#3a3050" />
      {/* Gold buckle band over the join */}
      <path d="M 96 52 Q 120 60 144 52 L 144 42 Q 120 50 96 42 Z" fill="var(--gold-500)" />
      <rect x="112" y="43" width="16" height="12" rx="2.5" fill="var(--gold-600)" />
      <rect x="116.5" y="46.5" width="7" height="5" rx="1.4" fill="#241d31" />
    </g>
  )
}

export function Halo() {
  return (
    <g>
      {/* Floating gold ring above the head */}
      <ellipse cx="120" cy="26" rx="30" ry="9" fill="none" stroke="var(--gold-400)" strokeWidth="5" />
      <ellipse cx="120" cy="26" rx="30" ry="9" fill="none" stroke="var(--gold-glow)" strokeWidth="10" opacity="0.5" />
      {/* Sparkles */}
      <path d="M 82 42 l 2 5 l 5 2 l -5 2 l -2 5 l -2 -5 l -5 -2 l 5 -2 Z" fill="var(--gold-400)" />
      <path d="M 160 44 l 1.6 4 l 4 1.6 l -4 1.6 l -1.6 4 l -1.6 -4 l -4 -1.6 l 4 -1.6 Z" fill="var(--gold-400)" />
      <path d="M 120 6 l 1.6 4 l 4 1.6 l -4 1.6 l -1.6 4 l -1.6 -4 l -4 -1.6 l 4 -1.6 Z" fill="#fff8f0" />
    </g>
  )
}

export function BowHat() {
  return (
    <g>
      {/* Headband hugging the hairline */}
      <path d="M 86 62 Q 120 74 154 62 L 150 50 Q 120 62 90 50 Z" fill="var(--pink-500)" />
      {/* Big bow */}
      <circle cx="120" cy="44" r="7" fill="var(--pink-600)" />
      <path d="M 120 44 L 96 26 C 88 22 82 30 88 38 C 94 46 110 46 120 44 Z" fill="var(--pink-400)" />
      <path d="M 120 44 L 144 26 C 152 22 158 30 152 38 C 146 46 130 46 120 44 Z" fill="var(--pink-400)" />
      <path d="M 120 44 L 100 30 C 96 28 94 32 98 37 C 103 42 113 44 120 44 Z" fill="var(--pink-500)" />
      <path d="M 120 44 L 140 30 C 144 28 146 32 142 37 C 137 42 127 44 120 44 Z" fill="var(--pink-500)" />
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
  crown: Crown,
  moonhat: MoonHat,
  tophat: TopHat,
  halo: Halo,
  bowhat: BowHat,
}
