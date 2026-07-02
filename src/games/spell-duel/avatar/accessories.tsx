import type { ComponentType } from 'react'
import type { AccessoryId } from './avatarTypes'

/**
 * Accessories. Front layer renders last (over everything).
 * Right hand rests at (173, 234).
 */

export function Wand() {
  return (
    <g>
      <line
        x1="172"
        y1="238"
        x2="204"
        y2="172"
        stroke="#8b5a2b"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <circle cx="207" cy="166" r="16" fill="var(--gold-glow)" opacity="0.5" />
      <path
        d="M 207 152 L 211 162 L 221 166 L 211 170 L 207 180 L 203 170 L 193 166 L 203 162 Z"
        fill="var(--gold-400)"
      />
    </g>
  )
}

export function CatFamiliar() {
  return (
    <g>
      {/* Sitting cat at her feet, right side */}
      <ellipse cx="204" cy="290" rx="17" ry="14" fill="#241d31" />
      <circle cx="204" cy="266" r="12" fill="#241d31" />
      <path d="M 195 258 L 193 246 L 202 252 Z" fill="#241d31" />
      <path d="M 213 258 L 215 246 L 206 252 Z" fill="#241d31" />
      <path
        d="M 219 292 C 230 292 232 280 226 276"
        stroke="#241d31"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Eyes */}
      <circle cx="199.5" cy="265" r="2" fill="var(--emerald-500)" />
      <circle cx="208.5" cy="265" r="2" fill="var(--emerald-500)" />
    </g>
  )
}

export function Broom() {
  return (
    <g>
      {/* Stick passes through the resting hand at (173, 234) */}
      <line
        x1="186"
        y1="128"
        x2="163"
        y2="288"
        stroke="#8b5a2b"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Straw bundle */}
      <path
        d="M 156 284 L 172 284 C 178 296 182 308 184 316 L 146 316 C 148 306 152 294 156 284 Z"
        fill="var(--gold-600)"
      />
      <path d="M 154 288 L 174 288 L 172 282 L 156 282 Z" fill="#8b5a2b" />
      <g stroke="var(--gold-400)" strokeWidth="2" strokeLinecap="round">
        <line x1="156" y1="294" x2="152" y2="312" />
        <line x1="164" y1="294" x2="164" y2="314" />
        <line x1="172" y1="294" x2="177" y2="312" />
      </g>
    </g>
  )
}

export function Owl() {
  return (
    <g>
      {/* Perched by her left shoulder */}
      <ellipse cx="62" cy="192" rx="16" ry="18" fill="#a8793f" />
      <ellipse cx="62" cy="198" rx="10" ry="11" fill="#d9b380" />
      {/* Wings */}
      <path d="M 47 186 C 42 194 43 204 49 208 C 52 200 52 192 51 186 Z" fill="#8a6132" />
      <path d="M 77 186 C 82 194 81 204 75 208 C 72 200 72 192 73 186 Z" fill="#8a6132" />
      {/* Ear tufts */}
      <path d="M 51 178 L 48 168 L 57 174 Z" fill="#a8793f" />
      <path d="M 73 178 L 76 168 L 67 174 Z" fill="#a8793f" />
      {/* Face */}
      <circle cx="55.5" cy="184" r="5.2" fill="#fff8f0" />
      <circle cx="68.5" cy="184" r="5.2" fill="#fff8f0" />
      <circle cx="56" cy="184.5" r="2.4" fill="#2f2247" />
      <circle cx="68" cy="184.5" r="2.4" fill="#2f2247" />
      <path d="M 62 188 L 58.5 193 L 65.5 193 Z" fill="var(--gold-600)" />
      {/* Feet */}
      <path d="M 56 208 l -2 5 M 62 209 l 0 5 M 68 208 l 2 5" stroke="var(--gold-600)" strokeWidth="2.4" strokeLinecap="round" />
    </g>
  )
}

export function Spellbook() {
  return (
    <g transform="rotate(-12 62 228)">
      {/* Page edge peeking out */}
      <rect x="48" y="208" width="34" height="44" rx="5" fill="#fff8f0" />
      {/* Emerald cover */}
      <rect x="44" y="206" width="34" height="44" rx="5" fill="var(--emerald-700)" />
      <rect x="44" y="206" width="7" height="44" rx="3.5" fill="#0a6b45" />
      {/* Gold star on the cover */}
      <path
        d="M 63 219 L 65.2 225 L 71.5 225.4 L 66.7 229.4 L 68.2 235.5 L 63 232.2 L 57.8 235.5 L 59.3 229.4 L 54.5 225.4 L 60.8 225 Z"
        fill="var(--gold-500)"
      />
      {/* Clasp */}
      <rect x="72" y="224" width="8" height="9" rx="2" fill="var(--gold-600)" />
    </g>
  )
}

export function Pendant() {
  return (
    <g>
      {/* Chain */}
      <path d="M 102 168 Q 120 188 138 168" stroke="var(--gold-500)" strokeWidth="2" fill="none" />
      {/* Star pendant */}
      <path
        d="M 120 182 L 122.6 189 L 130 189.6 L 124.4 194.3 L 126.1 201.5 L 120 197.6 L 113.9 201.5 L 115.6 194.3 L 110 189.6 L 117.4 189 Z"
        fill="var(--gold-400)"
      />
      <circle cx="117" cy="188" r="1.6" fill="#fff8f0" />
    </g>
  )
}

/** Registry the avatar composer renders from. Add new accessories here. */
export const ACCESSORY_REGISTRY: Record<AccessoryId, ComponentType | null> = {
  wand: Wand,
  cat: CatFamiliar,
  broom: Broom,
  owl: Owl,
  spellbook: Spellbook,
  pendant: Pendant,
}
