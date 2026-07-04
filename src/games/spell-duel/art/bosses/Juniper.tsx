import type { RivalMood } from '../RivalWitch'

const PALETTE = {
  hair: '#17b273',
  hairDark: '#0f9d63',
  dress: '#2c4a9e',
  dressDark: '#1f3778',
  apron: '#1d3358',
  apronDark: '#152743',
  band: '#2fd48a',
}

/**
 * Juniper — Potions Lab prodigy with a taste for explosions.
 * Emerald hair with a singed zigzag fringe, brass goggles pushed up on her
 * hat, navy lab apron over her dress with a bandolier of mini potions, and
 * a bubbling test tube gripped in one gloved hand.
 */
export function JuniperBoss({ mood = 'smug' }: { mood?: RivalMood }) {
  return (
    <svg viewBox="0 0 260 220" role="img" aria-label="Juniper the potions rival">
      {/* Broom */}
      <line x1="30" y1="168" x2="196" y2="150" stroke="#7a4a26" strokeWidth="8" strokeLinecap="round" />
      <path d="M 196 142 L 244 132 L 248 154 L 200 160 Z" fill="var(--gold-600)" />
      <g stroke="var(--gold-400)" strokeWidth="2">
        <line x1="206" y1="146" x2="240" y2="139" />
        <line x1="208" y1="152" x2="242" y2="148" />
      </g>
      <path d="M 194 140 l 10 0 l 0 22 l -10 0 Z" fill="#5b3a1e" transform="rotate(-6 199 151)" />

      {/* Legs sitting side-saddle */}
      <path d="M 96 158 C 100 176 112 184 124 184" stroke={PALETTE.dressDark} strokeWidth="12" strokeLinecap="round" fill="none" />
      <ellipse cx="130" cy="186" rx="11" ry="8" fill="#2f2247" />

      {/* Dress (peeking under apron) */}
      <path d="M 84 96 C 66 104 58 130 62 158 Q 92 172 118 160 L 108 106 Z" fill={PALETTE.dress} />
      <path d="M 62 158 Q 92 172 118 160 L 114 146 Q 90 156 66 146 Z" fill={PALETTE.dressDark} />

      {/* Lab apron over the dress, with bib and stain */}
      <path d="M 78 100 C 64 108 58 132 62 156 Q 90 168 114 158 L 106 108 Q 92 100 78 100 Z" fill={PALETTE.apron} />
      <path d="M 62 156 Q 90 168 114 158 L 111 148 Q 88 158 66 148 Z" fill={PALETTE.apronDark} />
      <path d="M 82 100 L 78 92 Q 90 86 102 92 L 98 100 Q 90 96 82 100 Z" fill={PALETTE.apron} />
      {/* Faint green stain splash */}
      <ellipse cx="98" cy="140" rx="9" ry="6" fill={PALETTE.hair} opacity="0.28" transform="rotate(-18 98 140)" />
      <circle cx="90" cy="150" r="3" fill={PALETTE.hair} opacity="0.22" />

      {/* Bandolier strap with 3 mini potion bottles */}
      <path d="M 70 102 L 108 152" stroke="#8a5a2c" strokeWidth="6" strokeLinecap="round" />
      <g>
        <g transform="translate(78 116) rotate(-14)">
          <rect x="-4" y="-2" width="8" height="6" rx="1.5" fill="#c9a1e8" />
          <path d="M -5 4 h 10 l 1.5 7 a 6.5 6.5 0 0 1 -13 0 Z" fill="#ff9dd4" />
          <ellipse cx="0" cy="8" rx="4" ry="2.4" fill="#fff" opacity="0.35" />
        </g>
        <g transform="translate(88 128) rotate(-10)">
          <rect x="-4" y="-2" width="8" height="6" rx="1.5" fill="#c9a1e8" />
          <path d="M -5 4 h 10 l 1.5 7 a 6.5 6.5 0 0 1 -13 0 Z" fill="var(--gold-500)" />
          <ellipse cx="0" cy="8" rx="4" ry="2.4" fill="#fff" opacity="0.35" />
        </g>
        <g transform="translate(98 140) rotate(-6)">
          <rect x="-4" y="-2" width="8" height="6" rx="1.5" fill="#c9a1e8" />
          <path d="M -5 4 h 10 l 1.5 7 a 6.5 6.5 0 0 1 -13 0 Z" fill={PALETTE.hair} />
          <ellipse cx="0" cy="8" rx="4" ry="2.4" fill="#fff" opacity="0.35" />
        </g>
      </g>
      {/* Soft glow behind the bottles */}
      <circle cx="88" cy="128" r="16" fill={PALETTE.hair} opacity="0.12" />

      {/* Arm holding a bubbling test tube */}
      <path d="M 100 112 C 118 108 134 110 146 118" stroke={PALETTE.apron} strokeWidth="11" strokeLinecap="round" fill="none" />
      {/* Gloved hand */}
      <circle cx="150" cy="120" r="8" fill="#e0c9a0" />
      <path d="M 144 116 Q 150 108 158 112 Q 162 116 158 122 Q 152 128 144 124 Z" fill="#3f5a3f" />
      {/* Test tube */}
      <g transform="rotate(18 160 108)">
        <path d="M 156 84 L 156 108 Q 156 118 166 118 Q 176 118 176 108 L 176 84 Z" fill="#dff0ea" opacity="0.55" stroke="#9fb6c9" strokeWidth="1.4" />
        <path d="M 156 100 L 176 100 L 176 108 Q 176 118 166 118 Q 156 118 156 108 Z" fill={PALETTE.hair} opacity="0.85" />
        <rect x="154" y="80" width="24" height="6" rx="2" fill="#9fb6c9" />
        {/* Rising bubbles */}
        <circle cx="163" cy="96" r="2.6" fill="#eafff4" opacity="0.9" />
        <circle cx="170" cy="90" r="1.8" fill="#eafff4" opacity="0.8" />
      </g>

      {/* Head */}
      <circle cx="88" cy="72" r="34" fill="#e0c9a0" />
      {/* Hair — emerald, with singed zigzag fringe tip */}
      <path
        d="M 54 66 C 54 40 74 30 92 32 C 112 34 122 48 122 66
           C 112 54 104 50 96 50 Q 100 58 96 64 C 88 54 76 52 66 58 Q 60 60 54 66 Z"
        fill={PALETTE.hair}
      />
      <path d="M 54 66 C 50 88 54 104 64 114 C 68 100 66 84 64 70 Z" fill={PALETTE.hair} />
      {/* Singed zigzag fringe tip, darker char colour */}
      <path d="M 64 58 L 68 64 L 62 68 L 67 74 L 60 76 L 66 82 L 58 84" stroke="#2a1f1a" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.85" />
      <path d="M 60 60 Q 64 66 60 72 Q 66 76 61 82" stroke={PALETTE.hairDark} strokeWidth="1.6" fill="none" opacity="0.6" />

      {/* Hat askew, with brass goggles pushed up on the band */}
      <g transform="rotate(-10 88 40)">
        <ellipse cx="88" cy="42" rx="40" ry="9" fill={PALETTE.apronDark} />
        <path d="M 62 40 C 70 20 80 6 100 -2 C 112 -6 122 -2 118 6 C 108 4 104 10 108 16 C 112 24 116 32 118 40 Q 88 50 62 40 Z" fill={PALETTE.apron} />
        <path d="M 64 39 Q 88 49 116 39 L 112 30 Q 88 38 68 30 Z" fill={PALETTE.band} />
        {/* Brass safety goggles pushed up on hat band */}
        <g transform="translate(0 -3)">
          <path d="M 76 30 Q 88 26 100 30" stroke="#a8741a" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="78" cy="31" r="7" fill="#2a2a2a" stroke="var(--gold-500)" strokeWidth="2.5" />
          <circle cx="98" cy="31" r="7" fill="#2a2a2a" stroke="var(--gold-500)" strokeWidth="2.5" />
          <circle cx="76" cy="29" r="2" fill="#dff0ea" opacity="0.7" />
          <circle cx="96" cy="29" r="2" fill="#dff0ea" opacity="0.7" />
        </g>
      </g>

      {/* Face */}
      {mood === 'smug' ? (
        <g>
          <path d="M 70 66 q 7 -5 14 -1" stroke="#2a1f1a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 94 64 q 7 -4 13 0" stroke="#2a1f1a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <ellipse cx="78" cy="74" rx="4.5" ry="6" fill="#2a1f1a" />
          <ellipse cx="100" cy="73" rx="4.5" ry="6" fill="#2a1f1a" />
          <path d="M 78 90 Q 88 96 98 88" stroke="#8a4a3e" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      ) : (
        <g>
          <circle cx="78" cy="72" r="6" fill="#2a1f1a" />
          <circle cx="100" cy="71" r="6" fill="#2a1f1a" />
          <ellipse cx="89" cy="90" rx="6" ry="8" fill="#5b3a2e" />
        </g>
      )}
      <ellipse cx="66" cy="84" rx="6" ry="4" fill="#f0919e" opacity="0.5" />
      <ellipse cx="108" cy="83" rx="6" ry="4" fill="#f0919e" opacity="0.5" />
    </svg>
  )
}
