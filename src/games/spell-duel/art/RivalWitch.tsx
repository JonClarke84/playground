import type { BossCompanion, BossEmblem, RivalPalette } from '../progression'
import { NIX_PALETTE } from '../progression'

export type RivalMood = 'smug' | 'shocked'

interface RivalWitchProps {
  mood?: RivalMood
  /** Recolour for the different bosses; defaults to Nix. */
  palette?: RivalPalette
  /** Charm on the hat band — each boss's signature. */
  emblem?: BossEmblem
  /** Little friend riding along on the broom. */
  companion?: BossCompanion
}

/** Hat-band charm, drawn inside the rotated hat group at ~(122, 34). */
function Emblem({ kind }: { kind: BossEmblem }) {
  switch (kind) {
    case 'star':
      return <path d="M 122 26 l 2.6 6 6 .6 -4.6 4 1.4 6 -5.4 -3.2 -5.4 3.2 1.4 -6 -4.6 -4 6 -.6 Z" fill="var(--gold-400)" />
    case 'crescent':
      return <path d="M 122 26 a 8 8 0 1 0 6 14 a 6.2 6.2 0 1 1 -6 -14 Z" fill="#cdd7f0" />
    case 'flower':
      return (
        <g>
          {[0, 90, 180, 270].map((deg) => (
            <circle key={deg} cx={122 + Math.cos((deg * Math.PI) / 180) * 5} cy={33 + Math.sin((deg * Math.PI) / 180) * 5} r="4" fill="#ffb8e0" />
          ))}
          <circle cx="122" cy="33" r="3.4" fill="var(--gold-400)" />
        </g>
      )
    case 'feather':
      return (
        <g transform="rotate(24 122 33)">
          <ellipse cx="122" cy="33" rx="4.5" ry="9" fill="#e8c69d" />
          <line x1="122" y1="24" x2="122" y2="42" stroke="#b57b3f" strokeWidth="1.6" />
        </g>
      )
    case 'potion':
      return (
        <g>
          <rect x="119" y="24" width="6" height="5" rx="1" fill="#9fb6c9" />
          <path d="M 118 28 h 8 l 2 8 a 6 6 0 0 1 -12 0 Z" fill="#2fd48a" />
        </g>
      )
    case 'gear':
      return (
        <g fill="var(--gold-500)">
          {[0, 45, 90, 135].map((deg) => (
            <rect key={deg} x="119.5" y="24" width="5" height="18" rx="2" transform={`rotate(${deg} 122 33)`} />
          ))}
          <circle cx="122" cy="33" r="5.5" fill="var(--gold-500)" />
          <circle cx="122" cy="33" r="2.4" fill="#152743" />
        </g>
      )
    case 'coin':
      return (
        <g>
          <circle cx="122" cy="33" r="7.5" fill="var(--gold-500)" />
          <circle cx="122" cy="33" r="4.6" fill="none" stroke="#a8741a" strokeWidth="1.6" />
        </g>
      )
    case 'note':
      return (
        <g fill="#fff8f0">
          <ellipse cx="119" cy="38" rx="3.6" ry="2.8" transform="rotate(-20 119 38)" />
          <rect x="121.4" y="24" width="2.2" height="14" rx="1" />
          <path d="M 121.4 24 q 6 1 6 6 q -2 -3 -6 -3 Z" />
        </g>
      )
    case 'bolt':
      return <path d="M 124 23 l -8 12 h 5.5 l -3.5 10 9 -13 h -5.5 Z" fill="var(--gold-400)" />
    case 'book':
      return (
        <g>
          <rect x="115" y="27" width="14" height="11" rx="2" fill="#c9a1e8" />
          <line x1="118.5" y1="27" x2="118.5" y2="38" stroke="#8f63c9" strokeWidth="2" />
        </g>
      )
    case 'leaf':
      return (
        <g transform="rotate(-28 122 33)">
          <ellipse cx="122" cy="33" rx="4.6" ry="8.5" fill="#a3e26a" />
          <line x1="122" y1="25" x2="122" y2="41" stroke="#4a7c22" strokeWidth="1.4" />
        </g>
      )
  }
}

/** Small friend perched near the broom's bristles. */
function Companion({ kind }: { kind: Exclude<BossCompanion, null> }) {
  if (kind === 'cat') {
    return (
      <g>
        <ellipse cx="216" cy="128" rx="11" ry="9" fill="#241832" />
        <circle cx="216" cy="116" r="7.5" fill="#241832" />
        <path d="M 211 111 l -2 -6 5 3 Z M 221 111 l 2 -6 -5 3 Z" fill="#241832" />
        <path d="M 226 130 c 8 -1 10 -7 7 -11" stroke="#241832" strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="213.5" cy="115" r="1.5" fill="var(--gold-400)" />
        <circle cx="218.5" cy="115" r="1.5" fill="var(--gold-400)" />
      </g>
    )
  }
  if (kind === 'owl') {
    return (
      <g>
        <ellipse cx="216" cy="124" rx="10" ry="12" fill="#a8793f" />
        <ellipse cx="216" cy="128" rx="6.5" ry="7" fill="#d9b380" />
        <path d="M 209 114 l -2 -6 6 3 Z M 223 114 l 2 -6 -6 3 Z" fill="#a8793f" />
        <circle cx="212.5" cy="118" r="3.4" fill="#fff8f0" />
        <circle cx="219.5" cy="118" r="3.4" fill="#fff8f0" />
        <circle cx="213" cy="118.4" r="1.6" fill="#2f2247" />
        <circle cx="219" cy="118.4" r="1.6" fill="#2f2247" />
        <path d="M 216 121 l -2.4 3.4 h 4.8 Z" fill="var(--gold-600)" />
      </g>
    )
  }
  return (
    <g fill="#241832">
      <path d="M 216 106 c -10 -8 -20 -6 -24 0 c 6 -1 9 1 10 5 c 3 -3 6 -3 9 -1 c 3 -2 6 -2 9 1 c 1 -4 4 -6 10 -5 c -4 -6 -14 -8 -24 0 Z" transform="translate(0 8)" />
      <ellipse cx="216" cy="120" rx="5" ry="7" />
      <path d="M 213 114 l -1.6 -4 3.2 2 Z M 219 114 l 1.6 -4 -3.2 2 Z" />
      <circle cx="214.2" cy="118" r="1.2" fill="var(--gold-400)" />
      <circle cx="217.8" cy="118" r="1.2" fill="var(--gold-400)" />
    </g>
  )
}

/**
 * A rival student boss, hovering on her broom.
 * Never scary: a smirking classmate, not a villain. Canvas 260×220.
 */
export function RivalWitch({ mood = 'smug', palette = NIX_PALETTE, emblem, companion }: RivalWitchProps) {
  return (
    <svg viewBox="0 0 260 220" role="img" aria-label="Nix the rival witch">
      {/* Broom */}
      <line x1="30" y1="168" x2="196" y2="150" stroke="#7a4a26" strokeWidth="8" strokeLinecap="round" />
      <path d="M 196 142 L 244 132 L 248 154 L 200 160 Z" fill="var(--gold-600)" />
      <g stroke="var(--gold-400)" strokeWidth="2">
        <line x1="206" y1="146" x2="240" y2="139" />
        <line x1="208" y1="152" x2="242" y2="148" />
      </g>
      <path d="M 194 140 l 10 0 l 0 22 l -10 0 Z" fill="#5b3a1e" transform="rotate(-6 199 151)" />

      {/* Legs sitting side-saddle */}
      <path d="M 96 158 C 100 176 112 184 124 184" stroke={palette.dressDark} strokeWidth="12" strokeLinecap="round" fill="none" />
      <ellipse cx="130" cy="186" rx="11" ry="8" fill="#2f2247" />

      {/* Dress */}
      <path d="M 84 96 C 66 104 58 130 62 158 Q 92 172 118 160 L 108 106 Z" fill={palette.dress} />
      <path d="M 62 158 Q 92 172 118 160 L 114 146 Q 90 156 66 146 Z" fill={palette.dressDark} />

      {/* Arm pointing forward (mid-mischief) */}
      <path d="M 100 112 C 118 108 134 110 146 118" stroke={palette.dress} strokeWidth="11" strokeLinecap="round" fill="none" />
      <circle cx="150" cy="120" r="7.5" fill="#e8b88a" />

      {/* Head */}
      <circle cx="88" cy="72" r="34" fill="#e8b88a" />
      {/* Hair — sharp pink swoop */}
      <path
        d="M 54 66 C 54 40 74 30 92 32 C 112 34 122 48 122 66
           C 112 54 104 50 96 50 Q 100 58 96 64 C 88 54 76 52 66 58 Q 60 60 54 66 Z"
        fill={palette.hair}
      />
      <path d="M 54 66 C 50 88 54 104 64 114 C 68 100 66 84 64 70 Z" fill={palette.hair} />
      {/* Hat askew */}
      <g transform="rotate(-10 88 40)">
        <ellipse cx="88" cy="42" rx="40" ry="9" fill={palette.hatDark} />
        <path d="M 62 40 C 70 20 80 6 100 -2 C 112 -6 122 -2 118 6 C 108 4 104 10 108 16 C 112 24 116 32 118 40 Q 88 50 62 40 Z" fill={palette.hat} />
        <path d="M 64 39 Q 88 49 116 39 L 112 30 Q 88 38 68 30 Z" fill={palette.band} />
        {emblem && (
          <g transform="translate(-14 2)">
            <Emblem kind={emblem} />
          </g>
        )}
      </g>
      {/* Face */}
      {mood === 'smug' ? (
        <g>
          <path d="M 70 66 q 7 -5 14 -1" stroke="#3b2a4f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 94 64 q 7 -4 13 0" stroke="#3b2a4f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <ellipse cx="78" cy="74" rx="4.5" ry="6" fill="#3b2a4f" />
          <ellipse cx="100" cy="73" rx="4.5" ry="6" fill="#3b2a4f" />
          <path d="M 78 90 Q 88 96 98 88" stroke="#8a4a5e" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      ) : (
        <g>
          <circle cx="78" cy="72" r="6" fill="#3b2a4f" />
          <circle cx="100" cy="71" r="6" fill="#3b2a4f" />
          <ellipse cx="89" cy="90" rx="6" ry="8" fill="#5b2e46" />
        </g>
      )}
      <ellipse cx="66" cy="84" rx="6" ry="4" fill="#f0919e" opacity="0.5" />
      <ellipse cx="108" cy="83" rx="6" ry="4" fill="#f0919e" opacity="0.5" />
      {companion && <Companion kind={companion} />}
    </svg>
  )
}
