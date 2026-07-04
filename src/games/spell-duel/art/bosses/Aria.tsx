import type { RivalMood } from '../RivalWitch'

/**
 * ARIA — Music Room, table 11. The academy's pop star in training: she
 * enchanted her hairbrush into a microphone and practises encores at
 * midnight. Same broom rig as RivalWitch (canvas 260×220) with her own
 * silhouette: bubblegum ponytail, sparkly stage dress, headphones worn
 * around her neck, a glowing mic-wand, floating music notes and her cat
 * Tempo perched on the bristles.
 */
export function AriaBoss({ mood = 'smug' }: { mood?: RivalMood }) {
  return (
    <svg viewBox="0 0 260 220" role="img" aria-label="Aria the rival witch">
      {/* Broom */}
      <line x1="30" y1="168" x2="196" y2="150" stroke="#7a4a26" strokeWidth="8" strokeLinecap="round" />
      <path d="M 196 142 L 244 132 L 248 154 L 200 160 Z" fill="#8f2c6b" />
      <g stroke="#ffb8e0" strokeWidth="2">
        <line x1="206" y1="146" x2="240" y2="139" />
        <line x1="208" y1="152" x2="242" y2="148" />
      </g>
      <path d="M 194 140 l 10 0 l 0 22 l -10 0 Z" fill="#521740" transform="rotate(-6 199 151)" />

      {/* Tempo the cat, perched on the bristles, tiny bow on her back */}
      <g>
        <ellipse cx="220" cy="130" rx="11" ry="9" fill="#2f2038" />
        <circle cx="220" cy="118" r="7.5" fill="#2f2038" />
        <path d="M 215 113 l -2 -6 5 3 Z M 225 113 l 2 -6 -5 3 Z" fill="#2f2038" />
        <path d="M 230 132 c 8 -1 10 -7 7 -11" stroke="#2f2038" strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="217.5" cy="117" r="1.5" fill="#ff8fd0" />
        <circle cx="222.5" cy="117" r="1.5" fill="#ff8fd0" />
        {/* tiny bow between the ears */}
        <path d="M 216 108 l -4.5 -3 1 4 -1 4 4.5 -3 Z M 216 108 l 4.5 -3 -1 4 1 4 -4.5 -3 Z" fill="#ff8fd0" />
        <circle cx="216" cy="108" r="1.4" fill="#ffe08a" />
      </g>

      {/* Floating music notes with glow */}
      <g fill="#ffe08a">
        <circle cx="182" cy="52" r="7" fill="#ff8fd0" opacity="0.25" />
        <ellipse cx="182" cy="56" rx="3.6" ry="2.8" transform="rotate(-16 182 56)" />
        <rect x="184.6" y="30" width="2.1" height="26" rx="1" />
        <path d="M 184.6 30 q 6 1 6 6 q -2 -3 -6 -3 Z" />
      </g>
      <g fill="#ffb8e0">
        <circle cx="200" cy="86" r="5.5" fill="#ff8fd0" opacity="0.25" />
        <ellipse cx="200" cy="89" rx="2.8" ry="2.2" transform="rotate(-16 200 89)" />
        <rect x="202" y="70" width="1.7" height="19" rx="0.8" />
        <path d="M 202 70 q 5 1 5 5 q -1.6 -2.4 -5 -2.4 Z" />
      </g>
      <g fill="#fff2fa">
        <circle cx="150" cy="30" r="5" fill="#ff8fd0" opacity="0.22" />
        <ellipse cx="150" cy="32.6" rx="2.6" ry="2" transform="rotate(-16 150 32.6)" />
        <rect x="151.8" y="16" width="1.6" height="17" rx="0.8" />
      </g>

      {/* Legs sitting side-saddle */}
      <path d="M 96 158 C 100 176 112 184 124 184" stroke="#701f52" strokeWidth="12" strokeLinecap="round" fill="none" />
      <ellipse cx="130" cy="186" rx="11" ry="8" fill="#2f2038" />

      {/* Stage dress — sparkly magenta with star on chest */}
      <path d="M 84 96 C 66 104 58 130 62 158 Q 92 172 118 160 L 108 106 Z" fill="#8f2c6b" />
      <path d="M 62 158 Q 92 172 118 160 L 114 146 Q 90 156 66 146 Z" fill="#701f52" />
      {/* sparkle flecks on the dress */}
      <g fill="#ffe08a" opacity="0.85">
        <path d="M 74 130 l 1.4 3.4 3.4 1.4 -3.4 1.4 -1.4 3.4 -1.4 -3.4 -3.4 -1.4 3.4 -1.4 Z" />
        <path d="M 96 146 l 1 2.4 2.4 1 -2.4 1 -1 2.4 -1 -2.4 -2.4 -1 2.4 -1 Z" />
        <path d="M 70 150 l 0.8 2 2 0.8 -2 0.8 -0.8 2 -0.8 -2 -2 -0.8 2 -0.8 Z" />
      </g>
      {/* star on chest */}
      <path d="M 90 116 l 2.2 5 5.2 0.5 -3.9 3.4 1.2 5.1 -4.7 -2.8 -4.7 2.8 1.2 -5.1 -3.9 -3.4 5.2 -0.5 Z" fill="#ffe08a" />

      {/* Arm holding the microphone-wand up, hairbrush handle visible */}
      <path d="M 100 112 C 116 100 126 88 130 74" stroke="#8f2c6b" strokeWidth="11" strokeLinecap="round" fill="none" />
      <circle cx="132" cy="70" r="7.5" fill="#e8b88a" />
      {/* hairbrush handle */}
      <rect x="128" y="46" width="7" height="26" rx="3" fill="#c98fd6" transform="rotate(8 131.5 59)" />
      <rect x="129" y="48" width="5" height="6" rx="2" fill="#8f63c9" transform="rotate(8 131.5 51)" />
      {/* enchanted mic head with glow */}
      <circle cx="133" cy="40" r="13" fill="#ffe08a" opacity="0.3" />
      <ellipse cx="133" cy="38" rx="9" ry="10" fill="#e8e8f0" />
      <g stroke="#c7c7d6" strokeWidth="1.2">
        <line x1="127" y1="34" x2="139" y2="34" />
        <line x1="126" y1="38" x2="140" y2="38" />
        <line x1="127" y1="42" x2="139" y2="42" />
      </g>

      {/* Head */}
      <circle cx="88" cy="72" r="34" fill="#e8b88a" />

      {/* Chunky gold headphones worn around the neck */}
      <path d="M 62 100 C 62 84 74 76 88 76 C 102 76 114 84 114 100" stroke="#f0b429" strokeWidth="6" fill="none" strokeLinecap="round" />
      <rect x="55" y="96" width="12" height="18" rx="5" fill="#ffd166" />
      <rect x="109" y="96" width="12" height="18" rx="5" fill="#ffd166" />
      <rect x="57" y="99" width="8" height="12" rx="3" fill="#f0b429" />
      <rect x="111" y="99" width="8" height="12" rx="3" fill="#f0b429" />

      {/* Bubblegum-pink hair, high ponytail */}
      <path
        d="M 54 68 C 52 42 70 28 90 28 C 110 28 124 44 122 66
           C 114 52 104 48 96 50 Q 100 58 96 64 C 88 54 76 52 66 58 Q 58 62 54 68 Z"
        fill="#ff8fd0"
      />
      <path d="M 54 68 C 50 78 52 86 58 92 C 62 82 60 74 58 68 Z" fill="#ff8fd0" />
      {/* high ponytail sweeping up and back */}
      <path
        d="M 96 40 C 108 26 128 20 138 30 C 146 38 142 52 130 58
           C 136 46 130 36 120 34 C 126 40 126 48 120 52
           C 118 42 110 36 100 38 Z"
        fill="#ff8fd0"
      />
      <path d="M 130 58 C 138 64 142 74 138 84 C 132 76 128 68 126 60 Z" fill="#e070b8" />
      {/* hair tie */}
      <ellipse cx="97" cy="39" rx="6" ry="5" fill="#ffe08a" transform="rotate(-30 97 39)" />

      {/* music-note hairclip */}
      <g fill="#ffe08a" transform="translate(-2 0)">
        <circle cx="66" cy="52" r="3.6" />
        <rect x="68.6" y="38" width="1.8" height="15" rx="0.9" />
        <path d="M 68.6 38 q 5.4 1 5.4 5.4 q -1.8 -2.6 -5.4 -2.6 Z" />
      </g>

      {/* Face */}
      {mood === 'smug' ? (
        <g>
          {/* blissful closed-eyes singing face */}
          <path d="M 70 72 q 7 4 14 0" stroke="#3b2a4f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 92 72 q 7 4 14 0" stroke="#3b2a4f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 70 62 q 7 -5 14 -1" stroke="#3b2a4f" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
          <path d="M 94 60 q 7 -4 13 0" stroke="#3b2a4f" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
          <ellipse cx="88" cy="92" rx="7" ry="8" fill="#5b2e46" />
          <ellipse cx="88" cy="96" rx="4" ry="3" fill="#8a4a5e" />
        </g>
      ) : (
        <g>
          {/* mid-note startled */}
          <circle cx="78" cy="72" r="6.5" fill="#3b2a4f" />
          <circle cx="100" cy="71" r="6.5" fill="#3b2a4f" />
          <circle cx="78" cy="70" r="1.8" fill="#fff8f0" />
          <circle cx="100" cy="69" r="1.8" fill="#fff8f0" />
          <ellipse cx="89" cy="92" rx="6" ry="8" fill="#5b2e46" />
        </g>
      )}
      <ellipse cx="66" cy="84" rx="6" ry="4" fill="#f0919e" opacity="0.5" />
      <ellipse cx="108" cy="83" rx="6" ry="4" fill="#f0919e" opacity="0.5" />
    </svg>
  )
}
