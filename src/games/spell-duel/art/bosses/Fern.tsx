import type { RivalMood } from '../RivalWitch'

/**
 * Fern — raised by talking brambles, Herb Garden table 3.
 * Speaks fluent Plant. Canvas 260×220, side-saddle on a broom.
 * See RivalWitch.tsx for shared anchors.
 */
export function FernBoss({ mood = 'smug' }: { mood?: RivalMood }) {
  return (
    <svg viewBox="0 0 260 220" role="img" aria-label="Fern the rival witch">
      {/* Broom */}
      <line x1="30" y1="168" x2="196" y2="150" stroke="#7a4a26" strokeWidth="8" strokeLinecap="round" />
      <path d="M 196 142 L 244 132 L 248 154 L 200 160 Z" fill="#274a1a" />
      <path d="M 200 160 L 248 154 L 247 158 L 199 164 Z" fill="#1d3a12" />
      <g stroke="#a3e26a" strokeWidth="2">
        <line x1="206" y1="146" x2="240" y2="139" />
        <line x1="208" y1="152" x2="242" y2="148" />
        <line x1="210" y1="158" x2="244" y2="154" />
      </g>
      <path d="M 194 140 l 10 0 l 0 22 l -10 0 Z" fill="#5b3a1e" transform="rotate(-6 199 151)" />

      {/* Vines spiralling round the broomstick, 2-3 leaves */}
      <path
        d="M 60 166 C 74 158 86 172 100 163 C 114 154 126 168 140 159 C 154 150 166 163 180 154"
        fill="none"
        stroke="#4a7c22"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <ellipse cx="86" cy="167" rx="7" ry="4.6" fill="#a3e26a" transform="rotate(-24 86 167)" />
      <ellipse cx="122" cy="163" rx="6.4" ry="4.2" fill="#5fd068" transform="rotate(18 122 163)" />
      <ellipse cx="156" cy="157" rx="6.8" ry="4.4" fill="#a3e26a" transform="rotate(-16 156 157)" />
      <ellipse cx="70" cy="163" rx="4.6" ry="3" fill="#5fd068" transform="rotate(-10 70 163)" />
      <ellipse cx="102" cy="167" rx="4.2" ry="2.8" fill="#a3e26a" transform="rotate(30 102 167)" />
      <circle cx="94" cy="164" r="1.4" fill="#ffb8e0" />
      <circle cx="140" cy="160" r="1.4" fill="#fff8f0" />

      {/* Ladybird on the bristles */}
      <g transform="translate(232 138)">
        <ellipse cx="0" cy="0" rx="5.2" ry="4.4" fill="#e14f4f" />
        <line x1="0" y1="-4" x2="0" y2="4" stroke="#241832" strokeWidth="0.9" />
        <circle cx="-2.2" cy="-1.4" r="0.9" fill="#241832" />
        <circle cx="2.2" cy="-1.4" r="0.9" fill="#241832" />
        <circle cx="-1.6" cy="1.8" r="0.9" fill="#241832" />
        <circle cx="1.8" cy="1.8" r="0.9" fill="#241832" />
        <circle cx="0" cy="-4.6" r="2" fill="#241832" />
      </g>

      {/* Legs sitting side-saddle, bare feet */}
      <path d="M 96 158 C 100 176 112 184 124 184" stroke="#2e5220" strokeWidth="12" strokeLinecap="round" fill="none" />
      <ellipse cx="128" cy="185" rx="9.5" ry="6" fill="#e8b88a" />
      <path d="M 122 186 h 12 M 124 189 h 10" stroke="#c9976e" strokeWidth="1" strokeLinecap="round" />

      {/* Dress — moss-green patched, seed-pouch belt */}
      <path d="M 84 96 C 66 104 58 130 62 158 Q 92 172 118 160 L 108 106 Z" fill="#3e6b2a" />
      <path d="M 62 158 Q 92 172 118 160 L 114 146 Q 90 156 66 146 Z" fill="#2e5220" />
      {/* patches */}
      <rect x="72" y="118" width="12" height="10" rx="2" fill="#5fd068" opacity="0.6" transform="rotate(-8 78 123)" />
      <rect x="92" y="138" width="14" height="11" rx="2" fill="#274a1a" opacity="0.7" transform="rotate(6 99 143)" />
      <path d="M 68 128 l 12 -3 l 3 9 l -12 3 Z" fill="none" stroke="#274a1a" strokeWidth="1" opacity="0.6" />
      <path d="M 66 135 l 3 1 M 70 133 l 3 1 M 74 131 l 3 1" stroke="#a3e26a" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <circle cx="100" cy="128" r="1.6" fill="#a3e26a" opacity="0.8" />
      <circle cx="106" cy="132" r="1.2" fill="#ffb8e0" opacity="0.8" />
      {/* seed-pouch belt */}
      <path d="M 66 140 Q 92 150 114 142" stroke="#5d3719" strokeWidth="6" fill="none" strokeLinecap="round" />
      <ellipse cx="90" cy="146" rx="8" ry="7" fill="#7a4a26" />
      <circle cx="87" cy="144" r="1.6" fill="#e8c69d" />
      <circle cx="92" cy="147" r="1.6" fill="#e8c69d" />
      <circle cx="89" cy="149" r="1.6" fill="#e8c69d" />

      {/* Arm pointing forward */}
      <path d="M 100 112 C 118 108 134 110 146 118" stroke="#3e6b2a" strokeWidth="11" strokeLinecap="round" fill="none" />
      <circle cx="150" cy="120" r="7.5" fill="#e8b88a" />

      {/* Ladybird on her hand */}
      <g transform="translate(150 113)">
        <ellipse cx="0" cy="0" rx="4.2" ry="3.6" fill="#e14f4f" />
        <line x1="0" y1="-3.2" x2="0" y2="3.2" stroke="#241832" strokeWidth="0.8" />
        <circle cx="-1.8" cy="-1" r="0.7" fill="#241832" />
        <circle cx="1.8" cy="-1" r="0.7" fill="#241832" />
        <circle cx="-1.4" cy="1.4" r="0.7" fill="#241832" />
        <circle cx="0" cy="-3.7" r="1.6" fill="#241832" />
      </g>

      {/* Head */}
      <circle cx="88" cy="72" r="34" fill="#e8b88a" />
      {/* Hair — leaf-green, woven with tiny flowers and leaves poking out */}
      <path
        d="M 54 66 C 54 40 74 30 92 32 C 112 34 122 48 122 66
           C 112 54 104 50 96 50 Q 100 58 96 64 C 88 54 76 52 66 58 Q 60 60 54 66 Z"
        fill="#5fd068"
      />
      <path d="M 54 66 C 50 88 54 104 64 114 C 68 100 66 84 64 70 Z" fill="#5fd068" />
      <path d="M 64 70 C 66 86 68 100 64 112 C 60 102 58 88 58 74 Z" fill="#3e9a46" opacity="0.55" />
      {/* leaves poking out of hair */}
      <ellipse cx="60" cy="38" rx="5.5" ry="9" fill="#a3e26a" transform="rotate(-30 60 38)" />
      <ellipse cx="112" cy="36" rx="5" ry="8" fill="#a3e26a" transform="rotate(24 112 36)" />
      <ellipse cx="96" cy="30" rx="4.6" ry="7.4" fill="#a3e26a" transform="rotate(4 96 30)" />
      {/* tiny flowers woven in */}
      <g transform="translate(70 44)">
        {[0, 72, 144, 216, 288].map((deg) => (
          <circle key={deg} cx={Math.cos((deg * Math.PI) / 180) * 3.6} cy={Math.sin((deg * Math.PI) / 180) * 3.6} r="2.4" fill="#ffb8e0" />
        ))}
        <circle cx="0" cy="0" r="2" fill="var(--gold-400)" />
      </g>
      <g transform="translate(104 52)">
        {[0, 72, 144, 216, 288].map((deg) => (
          <circle key={deg} cx={Math.cos((deg * Math.PI) / 180) * 3} cy={Math.sin((deg * Math.PI) / 180) * 3} r="2" fill="#fff8f0" />
        ))}
        <circle cx="0" cy="0" r="1.6" fill="var(--gold-400)" />
      </g>

      {/* Hat askew, twiggy vine wound round it instead of ribbon */}
      <g transform="rotate(-10 88 40)">
        <ellipse cx="88" cy="42" rx="40" ry="9" fill="#1d3a12" />
        <path d="M 62 40 C 70 20 80 6 100 -2 C 112 -6 122 -2 118 6 C 108 4 104 10 108 16 C 112 24 116 32 118 40 Q 88 50 62 40 Z" fill="#274a1a" />
        <path d="M 64 39 Q 88 49 116 39 L 112 30 Q 88 38 68 30 Z" fill="#a3e26a" />
        {/* leaf emblem on hat band */}
        <g transform="translate(-14 2) rotate(-28 122 33)">
          <ellipse cx="122" cy="33" rx="4.6" ry="8.5" fill="#a3e26a" />
          <line x1="122" y1="25" x2="122" y2="41" stroke="#4a7c22" strokeWidth="1.4" />
        </g>
        {/* vine wrap on hat point */}
        <path d="M 80 8 C 90 4 100 8 96 16 C 92 22 100 26 106 22" fill="none" stroke="#4a7c22" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="97" cy="14" rx="3" ry="2" fill="#5fd068" transform="rotate(20 97 14)" />
      </g>

      {/* Face */}
      {mood === 'smug' ? (
        <g>
          <path d="M 70 65 q 7 -6 14 -1.6" stroke="#2e5220" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 94 63 q 7 -5 13 0.4" stroke="#2e5220" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <ellipse cx="78" cy="74" rx="4.5" ry="6" fill="#2e5220" />
          <ellipse cx="100" cy="73" rx="4.5" ry="6" fill="#2e5220" />
          <path d="M 78 90 Q 88 96 98 88" stroke="#8a4a5e" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      ) : (
        <g>
          <circle cx="78" cy="72" r="6" fill="#2e5220" />
          <circle cx="100" cy="71" r="6" fill="#2e5220" />
          <ellipse cx="89" cy="90" rx="6" ry="8" fill="#5b2e46" />
        </g>
      )}
      <ellipse cx="66" cy="84" rx="6" ry="4" fill="#f0919e" opacity="0.5" />
      <ellipse cx="108" cy="83" rx="6" ry="4" fill="#f0919e" opacity="0.5" />
    </svg>
  )
}
