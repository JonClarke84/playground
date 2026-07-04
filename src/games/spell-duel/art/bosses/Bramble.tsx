import type { RivalMood } from '../RivalWitch'

/**
 * Bramble — Broom Yard, table 8. Three-time Midnight Cup broom-racing
 * champion, crashed more times than anyone (and wears it proudly).
 * Shares the RivalWitch rig anchors: broom (30,168)-(196,150), bristles
 * x196-248 y132-160, seated legs ~(96-130, 158-186), torso x58-120 y96-172,
 * head circle (88,72) r34, hat zone above y50. Canvas 260×220.
 */
export function BrambleBoss({ mood = 'smug' }: { mood?: RivalMood }) {
  return (
    <svg viewBox="0 0 260 220" role="img" aria-label="Bramble the broom-racing champion">
      {/* Wind streak lines behind everything, selling the speed */}
      <g stroke="#f0a35e" strokeWidth="2" strokeLinecap="round" opacity="0.35">
        <path d="M 4 118 C 30 116 46 114 64 112" fill="none" />
        <path d="M 0 138 C 26 137 44 136 60 135" fill="none" />
        <path d="M 6 158 C 30 158 44 159 58 160" fill="none" />
        <path d="M 14 98 C 34 97 46 96 58 95" fill="none" />
        <path d="M 10 178 C 30 179 42 181 52 184" fill="none" />
      </g>

      {/* Broom stick with gold racing stripes */}
      <line x1="30" y1="168" x2="196" y2="150" stroke="#7a4a26" strokeWidth="8" strokeLinecap="round" />
      <g stroke="var(--gold-400)" strokeWidth="2.4" strokeLinecap="round">
        <line x1="46" y1="166.2" x2="54" y2="165.2" />
        <line x1="80" y1="162" x2="88" y2="161" />
        <line x1="114" y1="157.8" x2="122" y2="156.8" />
        <line x1="148" y1="153.6" x2="156" y2="152.6" />
      </g>

      {/* Bristle bundle */}
      <path d="M 196 142 L 244 132 L 248 154 L 200 160 Z" fill="var(--gold-600)" />
      <g stroke="#c98a1f" strokeWidth="2">
        <line x1="206" y1="146" x2="240" y2="139" />
        <line x1="208" y1="152" x2="242" y2="148" />
        <line x1="210" y1="158" x2="238" y2="153.5" />
      </g>
      <path d="M 194 140 l 10 0 l 0 22 l -10 0 Z" fill="#5b3a1e" transform="rotate(-6 199 151)" />

      {/* Turbo the tiny bat, gripping the broom tail */}
      <g transform="translate(214 130)">
        <path
          d="M 0 4 c -9 -7 -18 -5 -21 1 c 5 -1 8 1 9 4 c 2.6 -2.6 5.4 -2.6 7.8 -0.6 c 2.4 -2 5.2 -2 7.8 0.6 c 1 -3 4 -5 9 -4 c -3 -6 -12 -8 -21 -1 Z"
          fill="#2a1832"
          transform="translate(4 -2) scale(0.85)"
        />
        <ellipse cx="4" cy="8" rx="5.2" ry="6.6" fill="#2a1832" />
        <path d="M 0.5 2 l -2 -4.5 3.6 2.2 Z M 7.5 2 l 2 -4.5 -3.6 2.2 Z" fill="#2a1832" />
        <circle cx="2.2" cy="7" r="1" fill="var(--gold-400)" />
        <circle cx="5.8" cy="7" r="1" fill="var(--gold-400)" />
        {/* Turbo gripping the tail with tiny feet */}
        <path d="M 4 14 q -2 3 -4 3 M 4 14 q 2 3 4 3" stroke="#2a1832" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      </g>

      {/* Legs sitting side-saddle, one knee with a small plaster */}
      <path d="M 96 158 C 100 176 112 184 124 184" stroke="#523013" strokeWidth="12" strokeLinecap="round" fill="none" />
      <ellipse cx="130" cy="186" rx="11" ry="8" fill="#301a09" />
      {/* Knee plaster */}
      <g transform="rotate(18 104 168)">
        <rect x="98" y="163" width="12" height="7" rx="2.4" fill="#f6d9b0" />
        <circle cx="101.6" cy="166.4" r="0.8" fill="#c9a877" />
        <circle cx="106" cy="167.4" r="0.8" fill="#c9a877" />
        <line x1="99" y1="166.4" x2="109" y2="166.4" stroke="#c9a877" strokeWidth="0.6" />
      </g>
      {/* Racing boot buckle on the seated leg */}
      <rect x="120" y="180" width="9" height="4.4" rx="1.2" fill="var(--gold-500)" transform="rotate(6 124 182)" />

      {/* Dress / flight jacket base */}
      <path d="M 84 96 C 66 104 58 130 62 158 Q 92 172 118 160 L 108 106 Z" fill="#6b3b1c" />
      <path d="M 62 158 Q 92 172 118 160 L 114 146 Q 90 156 66 146 Z" fill="#523013" />
      {/* Jacket collar + zip stitching */}
      <path d="M 78 100 Q 88 108 100 102" stroke="#40230d" strokeWidth="3" strokeLinecap="round" fill="none" />
      <line x1="90" y1="106" x2="96" y2="156" stroke="#40230d" strokeWidth="1.6" strokeDasharray="2 3" />
      <circle cx="91" cy="118" r="1.6" fill="var(--gold-500)" />
      <circle cx="92.6" cy="132" r="1.6" fill="var(--gold-500)" />

      {/* Racing number '8' patch on the jacket */}
      <circle cx="86" cy="132" r="12" fill="#f0a35e" opacity="0.9" />
      <circle cx="86" cy="132" r="12" fill="none" stroke="var(--gold-400)" strokeWidth="1.6" />
      <text x="86" y="137" fontSize="14" fontWeight="700" textAnchor="middle" fill="#3a1f0d" fontFamily="var(--font-display, sans-serif)">
        8
      </text>

      {/* Three tiny Midnight Cup medals pinned above the number patch */}
      <g transform="translate(70 108)">
        <line x1="0" y1="-4" x2="-2" y2="4" stroke="#17b273" strokeWidth="2" />
        <circle cx="-2" cy="6" r="3.2" fill="var(--gold-500)" stroke="#a8741a" strokeWidth="0.8" />
      </g>
      <g transform="translate(78 104)">
        <line x1="0" y1="-4" x2="0" y2="4" stroke="#e14fa0" strokeWidth="2" />
        <circle cx="0" cy="6" r="3.2" fill="var(--gold-500)" stroke="#a8741a" strokeWidth="0.8" />
      </g>
      <g transform="translate(86 108)">
        <line x1="0" y1="-4" x2="2" y2="4" stroke="#5fc4d4" strokeWidth="2" />
        <circle cx="2" cy="6" r="3.2" fill="var(--gold-500)" stroke="#a8741a" strokeWidth="0.8" />
      </g>

      {/* Emerald scarf streaming out behind her in the wind */}
      <path
        d="M 78 100 C 46 96 18 88 -4 96 C 20 100 30 106 38 116 C 12 116 -8 124 -20 138 C 8 132 26 130 42 134 C 22 142 6 152 0 166 C 22 156 38 150 52 150 C 60 150 66 146 68 138 Z"
        fill="#17b273"
      />
      <path
        d="M 78 100 C 46 96 18 88 -4 96 C 20 100 30 106 38 116 C 30 114 20 114 10 116"
        fill="none"
        stroke="#0f9d63"
        strokeWidth="2"
        opacity="0.6"
      />

      {/* Arm pointing forward (mid-mischief, gripping the stick) */}
      <path d="M 100 112 C 118 108 134 110 146 118" stroke="#6b3b1c" strokeWidth="11" strokeLinecap="round" fill="none" />
      <circle cx="150" cy="120" r="7.5" fill="#e8b88a" />

      {/* Head */}
      <circle cx="88" cy="72" r="34" fill="#e8b88a" />

      {/* Windswept russet-orange hair streaming backwards */}
      <path
        d="M 54 66 C 54 40 74 30 92 32 C 112 34 122 48 122 66
           C 112 54 104 50 96 50 Q 100 58 96 64 C 88 54 76 52 66 58 Q 60 60 54 66 Z"
        fill="#d96c2f"
      />
      <path
        d="M 50 62 C 20 56 -6 60 -24 74 C 2 68 20 70 34 78 C 8 80 -14 90 -26 106 C 2 96 20 92 36 94 C 16 104 0 116 -6 130 C 16 116 32 110 44 110 C 50 96 50 78 50 62 Z"
        fill="#d96c2f"
      />
      <path d="M 50 62 C 30 60 12 64 -2 74 C 16 70 30 72 40 80 Z" fill="#c65a20" opacity="0.7" />
      <path d="M 54 66 C 50 88 54 104 64 114 C 68 100 66 84 64 70 Z" fill="#d96c2f" />

      {/* Brown leather flying cap with goggles pushed up */}
      <path d="M 56 52 C 56 30 70 18 88 18 C 106 18 120 30 120 52 C 120 58 118 64 114 68 C 116 54 110 40 88 40 C 66 40 62 54 62 68 C 58 64 56 58 56 52 Z" fill="#5d3719" />
      <path d="M 60 66 Q 88 78 116 66 L 112 56 Q 88 66 64 56 Z" fill="#4a2b12" />
      {/* Ear flaps with a chin-strap buckle */}
      <ellipse cx="58" cy="70" rx="6" ry="9" fill="#5d3719" />
      <ellipse cx="118" cy="70" rx="6" ry="9" fill="#5d3719" />
      <path d="M 60 78 Q 88 96 116 78" stroke="#3a2410" strokeWidth="2.4" fill="none" />
      <rect x="85" y="90" width="6" height="5" rx="1" fill="var(--gold-500)" />
      {/* Goggles pushed up on the cap */}
      <g transform="translate(0 -2)">
        <circle cx="76" cy="42" r="9" fill="#3a2410" stroke="var(--gold-400)" strokeWidth="2" />
        <circle cx="100" cy="42" r="9" fill="#3a2410" stroke="var(--gold-400)" strokeWidth="2" />
        <path d="M 84 42 Q 88 38 92 42" stroke="var(--gold-400)" strokeWidth="2" fill="none" />
        <line x1="67" y1="40" x2="56" y2="36" stroke="#3a2410" strokeWidth="3" strokeLinecap="round" />
        <line x1="109" y1="40" x2="120" y2="36" stroke="#3a2410" strokeWidth="3" strokeLinecap="round" />
        <circle cx="76" cy="42" r="5.5" fill="#8fc9d4" opacity="0.55" />
        <circle cx="100" cy="42" r="5.5" fill="#8fc9d4" opacity="0.55" />
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
