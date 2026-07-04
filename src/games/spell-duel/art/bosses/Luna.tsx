import type { RivalMood } from '../RivalWitch'

const PALETTE = {
  hair: '#cdd7f0',
  hairDark: '#a8b8e0',
  dress: '#2c3f8f',
  dressDark: '#1f2f70',
  cloak: '#182452',
  cloakDark: '#111a3d',
  band: '#8fb4ff',
}

/**
 * Luna — Star Tower stargazer who sleeps all day and knows every
 * constellation's name. Silvery hair drifting upward, tiny constellation
 * freckles, a star-scattered cloak, half-moon spectacles, a rolled star
 * chart under her arm and a brass telescope strapped across her back.
 */
export function LunaBoss({ mood = 'smug' }: { mood?: RivalMood }) {
  return (
    <svg viewBox="0 0 260 220" role="img" aria-label="Luna the stargazer rival">
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

      {/* Dress */}
      <path d="M 84 96 C 66 104 58 130 62 158 Q 92 172 118 160 L 108 106 Z" fill={PALETTE.dress} />
      <path d="M 62 158 Q 92 172 118 160 L 114 146 Q 90 156 66 146 Z" fill={PALETTE.dressDark} />

      {/* Deep-blue cloak over shoulders, scattered with tiny stars */}
      <path d="M 60 90 C 48 108 44 138 52 160 Q 60 164 66 160 C 58 136 60 110 70 94 Z" fill={PALETTE.cloak} />
      <path d="M 52 160 Q 60 164 66 160 L 63 150 Q 58 154 55 150 Z" fill={PALETTE.cloakDark} />
      <g fill={PALETTE.band}>
        <path d="M 58 108 l 1.4 3.4 3.4 .4 -2.6 2.2 .8 3.4 -3 -1.8 -3 1.8 .8 -3.4 -2.6 -2.2 3.4 -.4 Z" />
        <circle cx="62" cy="130" r="1.6" />
        <circle cx="56" cy="142" r="1.2" />
        <path d="M 65 122 l 1 2.4 2.4 .3 -1.8 1.6 .6 2.4 -2.2 -1.3 -2.2 1.3 .6 -2.4 -1.8 -1.6 2.4 -.3 Z" />
        <circle cx="58" cy="152" r="1" />
      </g>

      {/* Telescope strapped across her back */}
      <line x1="62" y1="98" x2="76" y2="150" stroke="#8a5a2c" strokeWidth="4" strokeLinecap="round" />
      <g transform="translate(50 128) rotate(-24)">
        <rect x="0" y="0" width="34" height="9" rx="4" fill="#c9a15a" />
        <rect x="26" y="1.5" width="8" height="6" rx="2" fill="#a8741a" />
        <circle cx="34" cy="4.5" r="4.2" fill="#152743" />
        <rect x="0" y="1.5" width="6" height="6" rx="2" fill="var(--gold-500)" />
      </g>

      {/* Rolled star-chart scroll tucked under her arm */}
      <g transform="translate(96 138) rotate(8)">
        <rect x="0" y="0" width="28" height="9" rx="4.5" fill="#e8dcc0" />
        <rect x="0" y="0" width="6" height="9" rx="3" fill="#d9c9a0" />
        <rect x="22" y="0" width="6" height="9" rx="3" fill="#d9c9a0" />
        <g fill="#8a5a2c" opacity="0.7">
          <circle cx="11" cy="3.4" r="0.6" />
          <circle cx="15" cy="5.6" r="0.6" />
          <circle cx="18" cy="3" r="0.6" />
        </g>
      </g>

      {/* Arm holding the scroll in place */}
      <path d="M 100 112 C 112 116 122 124 128 136" stroke={PALETTE.dress} strokeWidth="11" strokeLinecap="round" fill="none" />
      <circle cx="130" cy="140" r="7.5" fill="#e8c9a0" />

      {/* Head */}
      <circle cx="88" cy="72" r="34" fill="#e8c9a0" />

      {/* Hair — long, silvery pale-blue, drifting upward as if in low gravity */}
      <path
        d="M 54 66 C 54 40 74 30 92 32 C 112 34 122 48 122 66
           C 112 54 104 50 96 50 Q 100 58 96 64 C 88 54 76 52 66 58 Q 60 60 54 66 Z"
        fill={PALETTE.hair}
      />
      {/* Drifting strands, curving upward past the head rather than falling */}
      <path d="M 56 62 C 46 50 36 44 24 44 C 34 40 48 42 58 52 Z" fill={PALETTE.hair} />
      <path d="M 120 60 C 132 46 146 40 158 42 C 148 36 132 38 118 50 Z" fill={PALETTE.hair} />
      <path d="M 62 100 C 46 100 34 94 28 84 C 34 96 48 104 62 106 Z" fill={PALETTE.hair} opacity="0.9" />
      <path d="M 110 102 C 126 104 140 100 148 90 C 140 100 126 108 110 108 Z" fill={PALETTE.hairDark} opacity="0.85" />

      {/* Tiny constellation freckles on cheek: 3-4 dots joined by hairline lines */}
      <g stroke="#8fa6d0" strokeWidth="0.6" opacity="0.8">
        <line x1="100" y1="82" x2="106" y2="86" />
        <line x1="106" y1="86" x2="105" y2="92" />
        <line x1="106" y1="86" x2="112" y2="88" />
      </g>
      <g fill="#fff8f0">
        <circle cx="100" cy="82" r="1.1" />
        <circle cx="106" cy="86" r="1.3" />
        <circle cx="105" cy="92" r="1" />
        <circle cx="112" cy="88" r="1" />
      </g>

      {/* Hat askew, scattered with stars */}
      <g transform="rotate(-10 88 40)">
        <ellipse cx="88" cy="42" rx="40" ry="9" fill={PALETTE.cloakDark} />
        <path d="M 62 40 C 70 20 80 6 100 -2 C 112 -6 122 -2 118 6 C 108 4 104 10 108 16 C 112 24 116 32 118 40 Q 88 50 62 40 Z" fill={PALETTE.cloak} />
        <path d="M 64 39 Q 88 49 116 39 L 112 30 Q 88 38 68 30 Z" fill={PALETTE.band} />
        <g fill="#fff8f0" opacity="0.9">
          <path d="M 78 20 l 1.2 3 3 .3 -2.2 2 .6 3 -2.6 -1.6 -2.6 1.6 .6 -3 -2.2 -2 3 -.3 Z" />
          <circle cx="98" cy="14" r="1.4" />
          <circle cx="108" cy="26" r="1" />
        </g>
        {/* Two tiny moon motes orbiting the hat */}
        <circle cx="60" cy="14" r="3.2" fill={PALETTE.band} opacity="0.85" />
        <path d="M 60 14 a 3.2 3.2 0 1 0 2.4 5.6 a 2.4 2.4 0 1 1 -2.4 -5.6 Z" fill={PALETTE.cloakDark} />
        <circle cx="126" cy="22" r="2.2" fill="#fff8f0" opacity="0.85" />
      </g>

      {/* Half-moon spectacles */}
      <path d="M 70 70 Q 78 66 86 70" stroke="#c9a15a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 90 68 Q 98 64 106 68" stroke="#c9a15a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 86 69 Q 88 71 90 69" stroke="#c9a15a" strokeWidth="1.6" fill="none" />

      {/* Face */}
      {mood === 'smug' ? (
        <g>
          <path d="M 70 66 q 7 -5 14 -1" stroke="#3b3a4f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 94 64 q 7 -4 13 0" stroke="#3b3a4f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <ellipse cx="78" cy="74" rx="4.5" ry="6" fill="#3b3a4f" />
          <ellipse cx="100" cy="73" rx="4.5" ry="6" fill="#3b3a4f" />
          <path d="M 78 90 Q 88 96 98 88" stroke="#8a5e6a" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      ) : (
        <g>
          <circle cx="78" cy="72" r="6" fill="#3b3a4f" />
          <circle cx="100" cy="71" r="6" fill="#3b3a4f" />
          <ellipse cx="89" cy="90" rx="6" ry="8" fill="#5b3e5e" />
        </g>
      )}
      <ellipse cx="66" cy="84" rx="6" ry="4" fill="#f0919e" opacity="0.4" />
      <ellipse cx="108" cy="83" rx="6" ry="4" fill="#f0919e" opacity="0.4" />
    </svg>
  )
}
