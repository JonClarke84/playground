import type { ComponentType } from 'react'
import type { HairColour, HairStyleId } from './avatarTypes'

/**
 * Hair styles as back/front layer pairs. Back renders behind the body,
 * front (fringe) renders above the face, below the hat.
 * Canvas: 240×320, head centred at (120, 114), radius ≈ 53.
 */
export interface HairLayerProps {
  colour: HairColour
}

export function WavesBack({ colour }: HairLayerProps) {
  return (
    <g>
      <path
        d="M 120 54 C 68 54 50 100 54 148 C 57 186 48 214 40 226
           C 62 240 84 232 96 218 Q 120 208 144 218
           C 156 232 178 240 200 226 C 192 214 183 186 186 148
           C 190 100 172 54 120 54 Z"
        fill={colour.base}
      />
      {/* Wave shading */}
      <path
        d="M 54 148 C 57 186 48 214 40 226 C 52 233 64 233 74 229
           C 68 206 70 178 68 150 C 67 124 74 92 92 72 C 66 84 52 114 54 148 Z"
        fill={colour.shade}
        opacity="0.55"
      />
      <path
        d="M 186 148 C 183 186 192 214 200 226 C 188 233 176 233 166 229
           C 172 206 170 178 172 150 C 173 124 166 92 148 72 C 174 84 188 114 186 148 Z"
        fill={colour.shade}
        opacity="0.55"
      />
    </g>
  )
}

export function WavesFront({ colour }: HairLayerProps) {
  return (
    <path
      d="M 67 106 C 68 72 92 56 120 56 C 148 56 172 72 173 106
         C 162 90 152 84 140 82 Q 146 92 141 100
         C 131 88 120 84 108 86 Q 110 96 103 102
         C 95 94 80 98 67 106 Z"
      fill={colour.base}
    />
  )
}

export function BunBack({ colour }: HairLayerProps) {
  return (
    <g>
      {/* Nape fill so no background peeks between chin and shoulders */}
      <ellipse cx="120" cy="142" rx="46" ry="36" fill={colour.base} />
      {/* Side wisps by the ears */}
      <path d="M 66 112 C 62 132 66 150 76 160 C 82 148 80 128 78 112 Z" fill={colour.base} />
      <path d="M 174 112 C 178 132 174 150 164 160 C 158 148 160 128 162 112 Z" fill={colour.base} />
    </g>
  )
}

export function BunFront({ colour }: HairLayerProps) {
  return (
    <g>
      {/* The bun itself */}
      <circle cx="120" cy="46" r="24" fill={colour.base} />
      <path d="M 96 46 A 24 24 0 0 0 144 46 A 30 18 0 0 1 96 46 Z" fill={colour.shade} opacity="0.6" />
      {/* Neat swept fringe */}
      <path
        d="M 67 106 C 68 72 92 56 120 56 C 148 56 172 72 173 106
           C 164 86 146 76 120 76 C 94 76 76 86 67 106 Z"
        fill={colour.base}
      />
    </g>
  )
}

export function BraidsBack({ colour }: HairLayerProps) {
  const braid = (x: number, flip: number) => (
    <g>
      <ellipse cx={x} cy={158} rx={14} ry={16} fill={colour.base} />
      <ellipse cx={x - 2 * flip} cy={184} rx={12.5} ry={14.5} fill={colour.shade} />
      <ellipse cx={x - 4 * flip} cy={208} rx={11} ry={13} fill={colour.base} />
      <ellipse cx={x - 6 * flip} cy={229} rx={9} ry={11} fill={colour.shade} />
      <ellipse cx={x - 7 * flip} cy={246} rx={6} ry={8} fill={colour.base} />
      {/* Ribbon */}
      <path
        d={`M ${x - 7 * flip - 8} 238 l 8 -6 l 8 6 l -8 6 Z`}
        fill="var(--pink-500)"
      />
    </g>
  )
  return (
    <g>
      <ellipse cx="120" cy="92" rx="56" ry="44" fill={colour.base} />
      <rect x="80" y="90" width="80" height="100" fill={colour.base} />
      {braid(72, 1)}
      {braid(168, -1)}
    </g>
  )
}

export function BraidsFront({ colour }: HairLayerProps) {
  return (
    <path
      d="M 67 106 C 68 70 94 56 120 56 C 146 56 172 70 173 106
         C 164 82 148 72 137 72 Q 124 74 120 86 Q 116 74 103 72
         C 92 72 76 82 67 106 Z"
      fill={colour.base}
    />
  )
}

export function BobBack({ colour }: HairLayerProps) {
  return (
    <g>
      {/* Chin-length bob hugging the head, curling inward at the tips */}
      <path
        d="M 120 54 C 70 54 56 96 58 134 C 59 160 56 176 62 186
           C 74 196 88 192 92 182 Q 84 168 86 150 L 96 160 L 96 190 H 144 L 144 160 L 154 150
           Q 156 168 148 182 C 152 192 166 196 178 186 C 184 176 181 160 182 134
           C 184 96 170 54 120 54 Z"
        fill={colour.base}
      />
      <path
        d="M 58 134 C 59 160 56 176 62 186 C 68 191 75 192 81 190
           C 74 176 72 156 73 138 C 74 112 82 84 100 68 C 72 78 57 104 58 134 Z"
        fill={colour.shade}
        opacity="0.55"
      />
      <path
        d="M 182 134 C 181 160 184 176 178 186 C 172 191 165 192 159 190
           C 166 176 168 156 167 138 C 166 112 158 84 140 68 C 168 78 183 104 182 134 Z"
        fill={colour.shade}
        opacity="0.55"
      />
    </g>
  )
}

export function BobFront({ colour }: HairLayerProps) {
  return (
    <path
      d="M 67 106 C 68 70 92 56 120 56 C 148 56 172 70 173 106
         C 166 88 154 78 142 76 Q 148 88 142 98
         C 134 84 118 82 106 88 Q 106 98 99 104 C 92 96 78 96 67 106 Z"
      fill={colour.base}
    />
  )
}

export function CurlsBack({ colour }: HairLayerProps) {
  return (
    <g>
      {/* Nape fill so no background peeks through */}
      <ellipse cx="120" cy="140" rx="50" ry="40" fill={colour.base} />
      {/* Joyful cloud of curls framing the head */}
      <circle cx="64" cy="110" r="19" fill={colour.base} />
      <circle cx="58" cy="146" r="17" fill={colour.shade} />
      <circle cx="64" cy="180" r="15" fill={colour.base} />
      <circle cx="78" cy="200" r="13" fill={colour.shade} />
      <circle cx="176" cy="110" r="19" fill={colour.base} />
      <circle cx="182" cy="146" r="17" fill={colour.shade} />
      <circle cx="176" cy="180" r="15" fill={colour.base} />
      <circle cx="162" cy="200" r="13" fill={colour.shade} />
      <circle cx="82" cy="72" r="18" fill={colour.base} />
      <circle cx="158" cy="72" r="18" fill={colour.base} />
      <circle cx="120" cy="56" r="20" fill={colour.base} />
    </g>
  )
}

export function CurlsFront({ colour }: HairLayerProps) {
  return (
    <g>
      {/* Scalloped curly fringe */}
      <path
        d="M 67 106 C 68 74 92 56 120 56 C 148 56 172 74 173 106
           A 15 15 0 0 1 147 100 A 15 15 0 0 1 120 98 A 15 15 0 0 1 93 100
           A 15 15 0 0 1 67 106 Z"
        fill={colour.base}
      />
      <circle cx="80" cy="92" r="12" fill={colour.base} />
      <circle cx="107" cy="84" r="13" fill={colour.base} />
      <circle cx="134" cy="84" r="13" fill={colour.base} />
      <circle cx="160" cy="92" r="12" fill={colour.base} />
    </g>
  )
}

export function PonytailBack({ colour }: HairLayerProps) {
  return (
    <g>
      {/* Nape fill */}
      <ellipse cx="120" cy="136" rx="47" ry="36" fill={colour.base} />
      {/* High tail sweeping right, curling at the tip */}
      <path
        d="M 148 46 C 176 42 196 58 200 86 C 204 116 198 148 188 168
           C 184 178 172 178 170 168 C 168 160 176 156 178 146
           C 184 122 186 100 178 82 C 170 64 158 58 146 60 Z"
        fill={colour.base}
      />
      <path
        d="M 178 82 C 184 100 184 124 178 146 C 176 156 168 160 170 168
           C 158 164 158 152 162 142 C 168 122 170 100 164 84 Z"
        fill={colour.shade}
        opacity="0.6"
      />
      {/* Scrunchie */}
      <circle cx="150" cy="52" r="9" fill="var(--gold-500)" />
    </g>
  )
}

export function PonytailFront({ colour }: HairLayerProps) {
  return (
    <path
      d="M 67 106 C 68 70 92 54 120 54 C 148 54 172 70 173 106
         C 160 84 142 76 120 78 C 98 80 78 90 67 106 Z"
      fill={colour.base}
    />
  )
}

interface HairStyle {
  Back: ComponentType<HairLayerProps> | null
  Front: ComponentType<HairLayerProps> | null
}

/** Registry the avatar composer renders from. Add new styles here. */
export const HAIR_REGISTRY: Record<HairStyleId, HairStyle> = {
  waves: { Back: WavesBack, Front: WavesFront },
  bun: { Back: BunBack, Front: BunFront },
  braids: { Back: BraidsBack, Front: BraidsFront },
  bob: { Back: BobBack, Front: BobFront },
  curls: { Back: CurlsBack, Front: CurlsFront },
  ponytail: { Back: PonytailBack, Front: PonytailFront },
}
