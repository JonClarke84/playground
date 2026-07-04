import type { RivalMood } from '../RivalWitch'

/**
 * STORM — The Rooftops, table 12. THE FINAL BOSS. Head of the secret
 * Midnight Racing Club; rides above thunderclouds and bottles lightning
 * for fun. One notch more dramatic than every other boss — but still a
 * kid, never scary. Same broom rig (canvas 260×220): billowing storm
 * cloak, silver-grey hair with an electric-blue streak, crackling static
 * sparks, a corked lightning-bottle on her belt, fingerless gloves and
 * her bat Zigzag flying alongside.
 */
export function StormBoss({ mood = 'smug' }: { mood?: RivalMood }) {
  return (
    <svg viewBox="0 0 260 220" role="img" aria-label="Storm the rival witch">
      {/* Billowing storm-cloak trailing behind, cloud-shaped hem, drawn first so it sits behind the broom/body */}
      <path
        d="M 40 150 C 10 140 -6 118 6 96 C 2 108 16 116 26 110
           C 18 100 22 84 38 80 C 30 92 38 104 50 100
           C 44 88 52 76 68 76 C 96 76 110 100 104 128
           C 100 150 118 158 138 152
           C 118 170 88 176 68 168 C 50 176 24 168 40 150 Z"
        fill="#2d3347"
        opacity="0.95"
      />
      <path
        d="M 46 142 C 26 134 16 118 24 104 C 24 114 34 120 42 116
           C 36 108 40 98 52 96 C 46 104 52 112 60 110
           C 56 100 62 92 74 92 C 92 92 100 108 96 126
           C 94 140 104 146 116 142 C 100 154 78 156 64 148 C 52 154 34 150 46 142 Z"
        fill="#1f2733"
      />

      {/* Broom */}
      <line x1="30" y1="168" x2="196" y2="150" stroke="#5d4530" strokeWidth="8" strokeLinecap="round" />
      <path d="M 196 142 L 244 132 L 248 154 L 200 160 Z" fill="#2d3347" />
      <g stroke="#5fc4d4" strokeWidth="2">
        <line x1="206" y1="146" x2="240" y2="139" />
        <line x1="208" y1="152" x2="242" y2="148" />
      </g>
      <path d="M 194 140 l 10 0 l 0 22 l -10 0 Z" fill="#171d28" transform="rotate(-6 199 151)" />

      {/* Zigzag the bat, flying alongside with a lightning tail */}
      <g>
        <path d="M 224 108 c -10 -8 -20 -6 -24 0 c 6 -1 9 1 10 5 c 3 -3 6 -3 9 -1 c 3 -2 6 -2 9 1 c 1 -4 4 -6 10 -5 c -4 -6 -14 -8 -24 0 Z" fill="#252b3a" />
        <ellipse cx="224" cy="122" rx="5.5" ry="7.5" fill="#252b3a" />
        <path d="M 221 116 l -1.8 -4.4 3.6 2.2 Z M 227 116 l 1.8 -4.4 -3.6 2.2 Z" fill="#252b3a" />
        <circle cx="222" cy="120" r="1.3" fill="#5fc4d4" />
        <circle cx="226" cy="120" r="1.3" fill="#5fc4d4" />
        {/* zigzag lightning tail */}
        <path d="M 224 130 l -3 6 4 0 -3 7" stroke="#5fc4d4" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </g>

      {/* Crackling static sparks around her */}
      <g stroke="#5fc4d4" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.9">
        <path d="M 46 60 l 4 -7 3 3 4 -7" />
        <path d="M 150 34 l 3.5 -6 2.6 2.6 3.5 -6" />
        <path d="M 190 84 l -3 6 3.6 1.4 -3 6" />
        <path d="M 40 118 l 4.5 -6.5 3 2.8 4.5 -6.5" />
        <path d="M 168 66 l -3.4 5.6 3.2 1.6 -3.4 5.6" />
      </g>

      {/* Legs sitting side-saddle */}
      <path d="M 96 158 C 100 176 112 184 124 184" stroke="#1f2733" strokeWidth="12" strokeLinecap="round" fill="none" />
      <ellipse cx="130" cy="186" rx="11" ry="8" fill="#171d28" />

      {/* Dress under the cloak */}
      <path d="M 84 96 C 66 104 58 130 62 158 Q 92 172 118 160 L 108 106 Z" fill="#2d3347" />
      <path d="M 62 158 Q 92 172 118 160 L 114 146 Q 90 156 66 146 Z" fill="#1f2733" />

      {/* Belt with corked bottle, glowing lightning bolt inside */}
      <path d="M 64 148 Q 90 160 116 149" stroke="#10141d" strokeWidth="7" fill="none" />
      <g transform="translate(0 2)">
        <ellipse cx="90" cy="160" rx="8" ry="4" fill="#10141d" opacity="0.3" />
        <path d="M 84 146 h 10 v 4 h -10 Z" fill="#8a6a3f" />
        <path d="M 83 150 q -3 6 0 12 q 3 6 8 6 q 5 0 8 -6 q 3 -6 0 -12 Z" fill="#9fb6c9" opacity="0.5" />
        <path d="M 83 150 q -3 6 0 12 q 3 6 8 6 q 5 0 8 -6 q 3 -6 0 -12 Z" fill="none" stroke="#cdd7f0" strokeWidth="1.2" />
        <circle cx="91" cy="160" r="7" fill="#5fc4d4" opacity="0.35" />
        <path d="M 93 151 l -6 9 4.4 0 -2.6 7.4 7 -9.6 -4.4 0 Z" fill="#5fc4d4" />
      </g>

      {/* Arm pointing forward, fingerless glove */}
      <path d="M 100 112 C 118 108 134 110 146 118" stroke="#2d3347" strokeWidth="11" strokeLinecap="round" fill="none" />
      <path d="M 138 113 C 144 113 150 116 148 122 C 146 126 140 126 137 123 Z" fill="#171d28" />
      <circle cx="150" cy="120" r="7.5" fill="#e8b88a" />
      {/* fingerless glove fingers */}
      <g stroke="#e8b88a" strokeWidth="2.4" strokeLinecap="round">
        <line x1="153" y1="115" x2="155" y2="111" />
        <line x1="156" y1="118" x2="159" y2="115" />
        <line x1="156" y1="123" x2="160" y2="121" />
      </g>

      {/* Head */}
      <circle cx="88" cy="72" r="34" fill="#e8b88a" />

      {/* Silver-grey hair, streaming dramatically, with electric-blue streak */}
      <path
        d="M 52 66 C 50 36 72 24 92 26 C 116 28 128 46 124 70
           C 116 54 106 48 96 50 Q 100 58 96 64 C 88 54 76 52 66 58 Q 58 62 52 66 Z"
        fill="#9fb6c9"
      />
      {/* streaming trail behind, billowing like the cloak */}
      <path d="M 52 66 C 40 78 30 92 34 110 C 42 96 48 82 54 70 Z" fill="#9fb6c9" />
      <path d="M 124 70 C 134 60 146 56 156 62 C 146 60 138 64 132 72 Z" fill="#9fb6c9" />
      {/* darker shading under the hair */}
      <path d="M 52 66 C 48 76 46 86 50 96 C 54 84 56 74 58 68 Z" fill="#7d94a8" />
      {/* single electric-blue lightning streak */}
      <path d="M 78 30 C 70 40 66 52 70 64 C 76 78 84 88 82 100" stroke="#5fc4d4" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <path d="M 34 110 C 30 118 30 126 36 132" stroke="#5fc4d4" strokeWidth="2.6" strokeLinecap="round" fill="none" opacity="0.85" />

      {/* Face — storm-grey eyes, one notch more dramatic brows */}
      {mood === 'smug' ? (
        <g>
          <path d="M 68 64 q 7 -6 15 -2" stroke="#252b3a" strokeWidth="2.6" strokeLinecap="round" fill="none" />
          <path d="M 94 62 q 7 -5 14 0" stroke="#252b3a" strokeWidth="2.6" strokeLinecap="round" fill="none" />
          <ellipse cx="78" cy="75" rx="4.6" ry="6" fill="#3f5060" />
          <ellipse cx="100" cy="74" rx="4.6" ry="6" fill="#3f5060" />
          <circle cx="79.3" cy="72.5" r="1.4" fill="#cdeef5" />
          <circle cx="101.3" cy="71.5" r="1.4" fill="#cdeef5" />
          <path d="M 78 90 Q 88 95 99 87" stroke="#5b4a44" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      ) : (
        <g>
          <circle cx="78" cy="72" r="6.5" fill="#3f5060" />
          <circle cx="100" cy="71" r="6.5" fill="#3f5060" />
          <circle cx="79.3" cy="69.5" r="1.6" fill="#cdeef5" />
          <circle cx="101.3" cy="68.5" r="1.6" fill="#cdeef5" />
          <path d="M 66 60 q 6 -8 16 -4" stroke="#252b3a" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <path d="M 92 58 q 8 -6 16 -1" stroke="#252b3a" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <ellipse cx="89" cy="90" rx="6" ry="8" fill="#4a3a3a" />
        </g>
      )}
      <ellipse cx="66" cy="84" rx="6" ry="4" fill="#7ea0c2" opacity="0.35" />
      <ellipse cx="108" cy="83" rx="6" ry="4" fill="#7ea0c2" opacity="0.35" />
    </svg>
  )
}
