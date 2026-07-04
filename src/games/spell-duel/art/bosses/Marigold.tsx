import type { RivalMood } from '../RivalWitch'

/**
 * Marigold — Treasury, table 10. Keeper of the dragon-hoard ledgers; counts
 * coins in her sleep and pays for everything in exact change.
 * Shares the RivalWitch rig anchors: broom (30,168)-(196,150), bristles
 * x196-248 y132-160, seated legs ~(96-130, 158-186), torso x58-120 y96-172,
 * head circle (88,72) r34, hat zone above y50. Canvas 260×220.
 */
export function MarigoldBoss({ mood = 'smug' }: { mood?: RivalMood }) {
  return (
    <svg viewBox="0 0 260 220" role="img" aria-label="Marigold the treasury keeper">
      {/* Broom stick */}
      <line x1="30" y1="168" x2="196" y2="150" stroke="#7a4a26" strokeWidth="8" strokeLinecap="round" />
      <path d="M 196 142 L 244 132 L 248 154 L 200 160 Z" fill="var(--gold-600)" />
      <g stroke="var(--gold-400)" strokeWidth="2">
        <line x1="206" y1="146" x2="240" y2="139" />
        <line x1="208" y1="152" x2="242" y2="148" />
      </g>
      <path d="M 194 140 l 10 0 l 0 22 l -10 0 Z" fill="#5b3a1e" transform="rotate(-6 199 151)" />

      {/* 3 gold coins mid-air with soft glows, drifting near the bristles */}
      <g>
        <circle cx="222" cy="118" r="10" fill="var(--gold-glow)" />
        <circle cx="222" cy="118" r="6.4" fill="var(--gold-500)" stroke="#a8741a" strokeWidth="1.2" />
        <circle cx="222" cy="118" r="3.6" fill="none" stroke="#a8741a" strokeWidth="0.8" />

        <circle cx="238" cy="108" r="8.5" fill="var(--gold-glow)" />
        <circle cx="238" cy="108" r="5.2" fill="var(--gold-500)" stroke="#a8741a" strokeWidth="1" />
        <circle cx="238" cy="108" r="2.8" fill="none" stroke="#a8741a" strokeWidth="0.7" />

        <circle cx="212" cy="102" r="7" fill="var(--gold-glow)" />
        <circle cx="212" cy="102" r="4.2" fill="var(--gold-500)" stroke="#a8741a" strokeWidth="0.9" />
        <circle cx="212" cy="102" r="2.2" fill="none" stroke="#a8741a" strokeWidth="0.6" />
      </g>

      {/* Legs sitting side-saddle */}
      <path d="M 96 158 C 100 176 112 184 124 184" stroke="#128a99" strokeWidth="12" strokeLinecap="round" fill="none" />
      <ellipse cx="130" cy="186" rx="11" ry="8" fill="#0a525c" />

      {/* Teal banker's dress */}
      <path d="M 84 96 C 66 104 58 130 62 158 Q 92 172 118 160 L 108 106 Z" fill="#1fb6c9" />
      <path d="M 62 158 Q 92 172 118 160 L 114 146 Q 90 156 66 146 Z" fill="#128a99" />
      {/* Gold buttons down the front */}
      <g fill="var(--gold-500)">
        <circle cx="89" cy="114" r="2" />
        <circle cx="91" cy="128" r="2" />
        <circle cx="93" cy="142" r="2" />
        <circle cx="95" cy="155" r="2" />
      </g>

      {/* Tiny abacus hanging from her belt */}
      <g transform="translate(66 150)">
        <rect x="-9" y="0" width="18" height="12" rx="1.4" fill="#8a5a2c" />
        <line x1="-9" y1="3" x2="9" y2="3" stroke="#5d3719" strokeWidth="1" />
        <line x1="-9" y1="6" x2="9" y2="6" stroke="#5d3719" strokeWidth="1" />
        <line x1="-9" y1="9" x2="9" y2="9" stroke="#5d3719" strokeWidth="1" />
        <circle cx="-4" cy="3" r="1.4" fill="var(--gold-500)" />
        <circle cx="2" cy="3" r="1.4" fill="var(--emerald-500)" />
        <circle cx="-2" cy="6" r="1.4" fill="var(--pink-500)" />
        <circle cx="4" cy="6" r="1.4" fill="var(--gold-500)" />
        <circle cx="-5" cy="9" r="1.4" fill="var(--emerald-500)" />
        <circle cx="1" cy="9" r="1.4" fill="var(--pink-500)" />
        <line x1="0" y1="-4" x2="0" y2="0" stroke="#5d3719" strokeWidth="1.6" />
      </g>

      {/* Arm pointing forward */}
      <path d="M 100 112 C 118 108 134 110 146 118" stroke="#1fb6c9" strokeWidth="11" strokeLinecap="round" fill="none" />
      <circle cx="150" cy="120" r="7.5" fill="#e8b88a" />

      {/* Fat leather ledger book tucked under one arm, coins peeking from the pages */}
      <g transform="translate(96 118) rotate(-8)">
        <rect x="-16" y="-8" width="30" height="20" rx="2" fill="#7a4a26" />
        <rect x="-16" y="-8" width="30" height="20" rx="2" fill="none" stroke="#5b3a1e" strokeWidth="1.4" />
        <line x1="-16" y1="-3" x2="14" y2="-3" stroke="#5b3a1e" strokeWidth="1" />
        <line x1="-16" y1="1" x2="14" y2="1" stroke="#5b3a1e" strokeWidth="1" />
        <line x1="-16" y1="5" x2="14" y2="5" stroke="#5b3a1e" strokeWidth="1" />
        {/* coins peeking from the pages */}
        <circle cx="10" cy="-9" r="3.4" fill="var(--gold-500)" stroke="#a8741a" strokeWidth="0.8" />
        <circle cx="4" cy="-9.6" r="2.8" fill="var(--gold-400)" stroke="#a8741a" strokeWidth="0.7" />
      </g>

      {/* Head */}
      <circle cx="88" cy="72" r="34" fill="#e8b88a" />

      {/* Gold-dust freckles across her nose */}
      <g fill="#c9922c" opacity="0.65">
        <circle cx="80" cy="80" r="0.9" />
        <circle cx="84" cy="82" r="0.9" />
        <circle cx="88" cy="83" r="0.9" />
        <circle cx="92" cy="82" r="0.9" />
        <circle cx="96" cy="80" r="0.9" />
        <circle cx="82" cy="77" r="0.7" />
        <circle cx="94" cy="77" r="0.7" />
      </g>

      {/* Golden-blonde hair in two neat plaits */}
      <path
        d="M 54 66 C 54 40 74 30 92 32 C 112 34 122 48 122 66
           C 112 54 104 50 96 50 Q 100 58 96 64 C 88 54 76 52 66 58 Q 60 60 54 66 Z"
        fill="#f0b429"
      />
      {/* Left plait */}
      <g>
        <path d="M 56 64 C 50 72 52 80 46 86 C 54 84 58 78 58 70 Z" fill="#f0b429" />
        <path d="M 46 86 C 40 92 42 100 36 106 C 44 104 48 98 48 92 Z" fill="#f0b429" />
        <path d="M 36 106 C 30 112 32 120 28 124 C 34 122 38 118 38 112 Z" fill="#f0b429" />
        <g stroke="#c9922c" strokeWidth="1.2" opacity="0.7">
          <line x1="50" y1="72" x2="56" y2="74" />
          <line x1="42" y1="92" x2="48" y2="94" />
          <line x1="32" y1="112" x2="38" y2="114" />
        </g>
        <ellipse cx="30" cy="126" rx="3.6" ry="2.6" fill="#e8c69d" />
      </g>
      {/* Right plait */}
      <g>
        <path d="M 120 64 C 126 72 124 80 130 86 C 122 84 118 78 118 70 Z" fill="#f0b429" />
        <path d="M 130 86 C 136 92 134 100 140 106 C 132 104 128 98 128 92 Z" fill="#f0b429" />
        <path d="M 140 106 C 146 112 144 120 148 124 C 142 122 138 118 138 112 Z" fill="#f0b429" />
        <g stroke="#c9922c" strokeWidth="1.2" opacity="0.7">
          <line x1="126" y1="72" x2="120" y2="74" />
          <line x1="134" y1="92" x2="128" y2="94" />
          <line x1="144" y1="112" x2="138" y2="114" />
        </g>
        <ellipse cx="146" cy="126" rx="3.6" ry="2.6" fill="#e8c69d" />
      </g>

      {/* Hat askew */}
      <g transform="rotate(-10 88 40)">
        <ellipse cx="88" cy="42" rx="40" ry="9" fill="#0a525c" />
        <path d="M 62 40 C 70 20 80 6 100 -2 C 112 -6 122 -2 118 6 C 108 4 104 10 108 16 C 112 24 116 32 118 40 Q 88 50 62 40 Z" fill="#0f6d7a" />
        <path d="M 64 39 Q 88 49 116 39 L 112 30 Q 88 38 68 30 Z" fill="#ffd166" />
        {/* coin charm on the band */}
        <g transform="translate(108 34)">
          <circle r="7.5" fill="var(--gold-500)" />
          <circle r="4.6" fill="none" stroke="#a8741a" strokeWidth="1.6" />
        </g>
      </g>

      {/* Round spectacles + face */}
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
      {/* Round spectacles over both eyes */}
      <g fill="none" stroke="#3d2a12" strokeWidth="1.8">
        <circle cx="78" cy="73" r="9.5" />
        <circle cx="100" cy="72" r="9.5" />
        <line x1="87.5" y1="72" x2="90.5" y2="71.4" />
        <line x1="68.5" y1="74" x2="62" y2="70" />
        <line x1="109.5" y1="73" x2="116" y2="68" />
      </g>
      <ellipse cx="66" cy="84" rx="6" ry="4" fill="#f0919e" opacity="0.5" />
      <ellipse cx="108" cy="83" rx="6" ry="4" fill="#f0919e" opacity="0.5" />
    </svg>
  )
}
