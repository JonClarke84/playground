import type { ComponentType } from 'react'
import type { OutfitColour, OutfitId, SkinTone } from './avatarTypes'

/**
 * Outfits paint the whole body: dress, sleeves and hands (hands use skin).
 * Canvas: 240×320. Shoulders ≈ y 170, hem ≈ y 282, hands rest ≈ (66, 232) / (174, 232).
 */
export interface OutfitProps {
  colour: OutfitColour
  skin: SkinTone
}

function Sleeves({ colour, skin }: OutfitProps) {
  return (
    <g>
      <path
        d="M 92 178 C 76 186 66 204 61 226 Q 70 235 83 231 C 87 212 93 198 102 189 Z"
        fill={colour.dark}
      />
      <path
        d="M 148 178 C 164 186 174 204 179 226 Q 170 235 157 231 C 153 212 147 198 138 189 Z"
        fill={colour.dark}
      />
      <circle cx="67" cy="234" r="9.5" fill={skin.base} />
      <circle cx="173" cy="234" r="9.5" fill={skin.base} />
    </g>
  )
}

/** A-line academy dress with a white collar and gold buttons. */
export function AcademyOutfit({ colour, skin }: OutfitProps) {
  return (
    <g>
      <path
        d="M 120 164 C 98 164 86 176 82 194 L 62 266 Q 120 292 178 266 L 158 194
           C 154 176 142 164 120 164 Z"
        fill={colour.base}
      />
      {/* Hem band */}
      <path d="M 65 255 Q 120 280 175 255 L 178 266 Q 120 292 62 266 Z" fill={colour.dark} />
      <Sleeves colour={colour} skin={skin} />
      {/* Collar */}
      <path
        d="M 102 164 A 12 12 0 0 0 120 174 A 12 12 0 0 0 138 164 Q 120 158 102 164 Z"
        fill="#fff8f0"
      />
      {/* Buttons */}
      <circle cx="120" cy="192" r="3.4" fill="var(--gold-500)" />
      <circle cx="120" cy="210" r="3.4" fill="var(--gold-500)" />
      <circle cx="120" cy="228" r="3.4" fill="var(--gold-500)" />
    </g>
  )
}

/** Gown with a star-trimmed cape falling behind the shoulders. */
export function StarCapeOutfit({ colour, skin }: OutfitProps) {
  return (
    <g>
      {/* Cape (behind the dress) */}
      <path
        d="M 94 170 L 42 274 Q 120 292 198 274 L 146 170 Q 120 178 94 170 Z"
        fill={colour.light}
      />
      {[
        [56, 250], [184, 250], [70, 220], [170, 220],
      ].map(([x, y], i) => (
        <path
          key={i}
          d={`M ${x} ${y - 8} L ${x + 2.4} ${y - 2.4} L ${x + 8} ${y} L ${x + 2.4} ${y + 2.4}
             L ${x} ${y + 8} L ${x - 2.4} ${y + 2.4} L ${x - 8} ${y} L ${x - 2.4} ${y - 2.4} Z`}
          fill="var(--gold-500)"
        />
      ))}
      {/* Dress */}
      <path
        d="M 120 164 C 100 164 90 176 86 194 L 72 262 Q 120 284 168 262 L 154 194
           C 150 176 140 164 120 164 Z"
        fill={colour.base}
      />
      <path d="M 74 252 Q 120 272 166 252 L 168 262 Q 120 284 72 262 Z" fill={colour.dark} />
      <Sleeves colour={colour} skin={skin} />
      {/* Cape clasp */}
      <circle cx="120" cy="172" r="5" fill="var(--gold-500)" />
    </g>
  )
}

/** Party dress with three scalloped ruffle tiers and a waist bow. */
export function RufflesOutfit({ colour, skin }: OutfitProps) {
  const tier = (y: number, halfWidth: number, fill: string) => {
    const scallops = 5
    const left = 120 - halfWidth
    const step = (halfWidth * 2) / scallops
    let d = `M ${left} ${y}`
    for (let i = 0; i < scallops; i++) {
      d += ` a ${step / 2} ${step / 2.6} 0 0 0 ${step} 0`
    }
    d += ` L ${120 + halfWidth} ${y - 34} Q 120 ${y - 44} ${left} ${y - 34} Z`
    return <path d={d} fill={fill} />
  }
  return (
    <g>
      {tier(284, 58, colour.dark)}
      {tier(254, 46, colour.base)}
      {tier(226, 36, colour.light)}
      {/* Bodice */}
      <path
        d="M 120 164 C 102 164 92 176 90 192 L 88 198 Q 120 210 152 198 L 150 192
           C 148 176 138 164 120 164 Z"
        fill={colour.base}
      />
      <Sleeves colour={colour} skin={skin} />
      {/* Waist sash + bow */}
      <path d="M 88 198 Q 120 210 152 198 L 152 208 Q 120 220 88 208 Z" fill={colour.dark} />
      <g fill={colour.light}>
        <circle cx="120" cy="206" r="4.5" />
        <path d="M 120 206 L 106 198 L 108 212 Z" />
        <path d="M 120 206 L 134 198 L 132 212 Z" />
      </g>
    </g>
  )
}

/** Smart tailored double-breasted coat with gold buttons. */
export function CoatOutfit({ colour, skin }: OutfitProps) {
  return (
    <g>
      <path
        d="M 120 164 C 100 164 90 176 87 194 L 78 268 Q 120 282 162 268 L 153 194
           C 150 176 140 164 120 164 Z"
        fill={colour.base}
      />
      {/* Centre seam + hem band */}
      <line x1="120" y1="200" x2="120" y2="272" stroke={colour.dark} strokeWidth="2.5" />
      <path d="M 79 260 Q 120 274 161 260 L 162 268 Q 120 282 78 268 Z" fill={colour.dark} />
      {/* Notched lapels */}
      <path d="M 104 166 L 120 186 L 112 194 L 98 176 Z" fill={colour.dark} />
      <path d="M 136 166 L 120 186 L 128 194 L 142 176 Z" fill={colour.dark} />
      {/* Double-breasted buttons */}
      {[206, 226, 246].map((y) => (
        <g key={y} fill="var(--gold-500)">
          <circle cx="108" cy={y} r="3.6" />
          <circle cx="132" cy={y} r="3.6" />
        </g>
      ))}
      <Sleeves colour={colour} skin={skin} />
      {/* White cuffs */}
      <path d="M 60 222 Q 70 231 84 227 L 82 234 Q 70 239 59 230 Z" fill="#fff8f0" />
      <path d="M 180 222 Q 170 231 156 227 L 158 234 Q 170 239 181 230 Z" fill="#fff8f0" />
    </g>
  )
}

/** Pop-star jumpsuit: fitted top, gold belt, flared trousers. */
export function JumpsuitOutfit({ colour, skin }: OutfitProps) {
  return (
    <g>
      {/* Top */}
      <path
        d="M 120 164 C 102 164 94 176 92 192 L 90 214 Q 120 224 150 214 L 148 192
           C 146 176 138 164 120 164 Z"
        fill={colour.base}
      />
      {/* Flared legs */}
      <path d="M 96 218 L 118 218 L 118 286 L 78 286 Q 88 248 96 218 Z" fill={colour.base} />
      <path d="M 122 218 L 144 218 L 162 286 L 122 286 Z" fill={colour.base} />
      <path d="M 112 224 L 118 224 L 118 286 L 104 286 Z" fill={colour.dark} opacity="0.7" />
      <path d="M 122 224 L 128 224 L 136 286 L 122 286 Z" fill={colour.dark} opacity="0.7" />
      {/* Belt */}
      <path d="M 90 212 Q 120 222 150 212 L 150 224 Q 120 232 90 224 Z" fill="var(--gold-500)" />
      <rect x="113" y="214" width="14" height="12" rx="3" fill="var(--gold-600)" />
      {/* Sparkle on the chest */}
      <path
        d="M 120 182 L 122.4 188.6 L 129 191 L 122.4 193.4 L 120 200 L 117.6 193.4 L 111 191 L 117.6 188.6 Z"
        fill={colour.light}
      />
      <Sleeves colour={colour} skin={skin} />
    </g>
  )
}

/** Apprentice robe with bell sleeves, rope belt and a moon emblem. */
export function RobeOutfit({ colour, skin }: OutfitProps) {
  return (
    <g>
      <path
        d="M 120 164 C 98 164 88 178 84 196 L 66 272 Q 120 290 174 272 L 156 196
           C 152 178 142 164 120 164 Z"
        fill={colour.base}
      />
      <path d="M 68 262 Q 120 280 172 262 L 174 272 Q 120 290 66 272 Z" fill={colour.dark} />
      {/* Wide bell sleeves with hands emerging */}
      <path
        d="M 92 178 C 74 188 62 210 58 236 Q 72 246 88 240 C 90 220 96 200 104 190 Z"
        fill={colour.dark}
      />
      <path
        d="M 148 178 C 166 188 178 210 182 236 Q 168 246 152 240 C 150 220 144 200 136 190 Z"
        fill={colour.dark}
      />
      <circle cx="67" cy="234" r="9.5" fill={skin.base} />
      <circle cx="173" cy="234" r="9.5" fill={skin.base} />
      {/* Rope belt */}
      <path d="M 86 208 Q 120 220 154 208" stroke="#fff8f0" strokeWidth="3.5" fill="none" />
      <path d="M 86 213 Q 120 225 154 213" stroke="#fff8f0" strokeWidth="2" fill="none" opacity="0.7" />
      {/* Crescent moon emblem */}
      <path
        d="M 120 176 a 11 11 0 1 0 8 19 a 8.5 8.5 0 1 1 -8 -19 Z"
        fill="var(--gold-400)"
      />
    </g>
  )
}

/** Registry the avatar composer renders from. Add new outfits here. */
export const OUTFIT_REGISTRY: Record<OutfitId, ComponentType<OutfitProps>> = {
  academy: AcademyOutfit,
  starcape: StarCapeOutfit,
  ruffles: RufflesOutfit,
  coat: CoatOutfit,
  jumpsuit: JumpsuitOutfit,
  robe: RobeOutfit,
}
