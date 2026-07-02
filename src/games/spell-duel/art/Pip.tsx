export type PipMood = 'idle' | 'cheer' | 'oops'

/**
 * Pip — the friendly winged-monkey sidekick (PRODUCT.md §4.1).
 * Round, plush, never negative. Canvas 200×200.
 */
export function Pip({ mood = 'idle' }: { mood?: PipMood }) {
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="Pip the flying monkey">
      {/* Tail */}
      <path
        d="M 132 152 C 162 150 172 128 160 116 C 152 108 140 112 142 122"
        stroke="#8b5e3c"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      {/* Wings */}
      <path d="M 62 108 C 38 96 32 74 44 62 C 46 78 54 86 66 92 Z" fill="#c9a1e8" />
      <path d="M 138 108 C 162 96 168 74 156 62 C 154 78 146 86 134 92 Z" fill="#c9a1e8" />
      {/* Body */}
      <circle cx="100" cy="126" r="36" fill="#8b5e3c" />
      <ellipse cx="100" cy="134" rx="22" ry="24" fill="#c99b6e" />
      {/* Arms */}
      {mood === 'cheer' ? (
        <g stroke="#8b5e3c" strokeWidth="10" strokeLinecap="round">
          <path d="M 72 116 C 58 104 52 92 54 80" fill="none" />
          <path d="M 128 116 C 142 104 148 92 146 80" fill="none" />
        </g>
      ) : mood === 'oops' ? (
        <g stroke="#8b5e3c" strokeWidth="10" strokeLinecap="round">
          <path d="M 74 122 C 68 100 78 84 88 78" fill="none" />
          <path d="M 126 122 C 132 100 122 84 112 78" fill="none" />
        </g>
      ) : (
        <g stroke="#8b5e3c" strokeWidth="10" strokeLinecap="round">
          <path d="M 70 124 C 60 132 56 142 58 150" fill="none" />
          <path d="M 130 124 C 140 132 144 142 142 150" fill="none" />
        </g>
      )}
      {/* Feet */}
      <ellipse cx="84" cy="162" rx="10" ry="7" fill="#6f4a2f" />
      <ellipse cx="116" cy="162" rx="10" ry="7" fill="#6f4a2f" />
      {/* Ears */}
      <circle cx="66" cy="66" r="13" fill="#8b5e3c" />
      <circle cx="134" cy="66" r="13" fill="#8b5e3c" />
      <circle cx="66" cy="66" r="6.5" fill="#c99b6e" />
      <circle cx="134" cy="66" r="6.5" fill="#c99b6e" />
      {/* Head */}
      <circle cx="100" cy="72" r="32" fill="#8b5e3c" />
      {/* Face patch */}
      <path
        d="M 78 66 C 78 48 122 48 122 66 C 122 84 114 92 100 92 C 86 92 78 84 78 66 Z"
        fill="#c99b6e"
      />
      {/* Eyes */}
      {mood === 'oops' ? (
        <g stroke="#3b2a1f" strokeWidth="3" strokeLinecap="round" fill="none">
          <path d="M 84 66 q 6 -6 12 0" />
          <path d="M 104 66 q 6 -6 12 0" />
        </g>
      ) : (
        <g>
          <circle cx="90" cy="66" r="5.5" fill="#3b2a1f" />
          <circle cx="110" cy="66" r="5.5" fill="#3b2a1f" />
          <circle cx="88.5" cy="64" r="1.8" fill="#fff" />
          <circle cx="108.5" cy="64" r="1.8" fill="#fff" />
        </g>
      )}
      {/* Muzzle */}
      <ellipse cx="100" cy="80" rx="10" ry="7" fill="#e8c69d" />
      {mood === 'cheer' ? (
        <path d="M 94 80 Q 100 88 106 80 Z" fill="#5b3a28" />
      ) : mood === 'oops' ? (
        <ellipse cx="100" cy="81" rx="3.4" ry="4.2" fill="#5b3a28" />
      ) : (
        <path d="M 95 80 Q 100 85 105 80" stroke="#5b3a28" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      )}
      {/* Gold collar */}
      <path d="M 78 106 Q 100 116 122 106 L 120 114 Q 100 122 80 114 Z" fill="var(--gold-500)" />
    </svg>
  )
}
