export type RivalMood = 'smug' | 'shocked'

/**
 * Nix — the mischievous rival student, hovering on her broom.
 * Never scary: a smirking classmate, not a villain. Canvas 260×220.
 */
export function RivalWitch({ mood = 'smug' }: { mood?: RivalMood }) {
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
      <path d="M 96 158 C 100 176 112 184 124 184" stroke="#4b2a6e" strokeWidth="12" strokeLinecap="round" fill="none" />
      <ellipse cx="130" cy="186" rx="11" ry="8" fill="#2f2247" />

      {/* Dress */}
      <path d="M 84 96 C 66 104 58 130 62 158 Q 92 172 118 160 L 108 106 Z" fill="#6a3bb5" />
      <path d="M 62 158 Q 92 172 118 160 L 114 146 Q 90 156 66 146 Z" fill="#552c93" />

      {/* Arm pointing forward (mid-mischief) */}
      <path d="M 100 112 C 118 108 134 110 146 118" stroke="#6a3bb5" strokeWidth="11" strokeLinecap="round" fill="none" />
      <circle cx="150" cy="120" r="7.5" fill="#e8b88a" />

      {/* Head */}
      <circle cx="88" cy="72" r="34" fill="#e8b88a" />
      {/* Hair — sharp pink swoop */}
      <path
        d="M 54 66 C 54 40 74 30 92 32 C 112 34 122 48 122 66
           C 112 54 104 50 96 50 Q 100 58 96 64 C 88 54 76 52 66 58 Q 60 60 54 66 Z"
        fill="var(--pink-600)"
      />
      <path d="M 54 66 C 50 88 54 104 64 114 C 68 100 66 84 64 70 Z" fill="var(--pink-600)" />
      {/* Hat askew */}
      <g transform="rotate(-10 88 40)">
        <ellipse cx="88" cy="42" rx="40" ry="9" fill="#38205c" />
        <path d="M 62 40 C 70 20 80 6 100 -2 C 112 -6 122 -2 118 6 C 108 4 104 10 108 16 C 112 24 116 32 118 40 Q 88 50 62 40 Z" fill="#452a6d" />
        <path d="M 64 39 Q 88 49 116 39 L 112 30 Q 88 38 68 30 Z" fill="var(--pink-500)" />
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
    </svg>
  )
}
