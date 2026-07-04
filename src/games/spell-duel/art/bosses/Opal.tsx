import type { RivalMood } from '../RivalWitch'

const PALETTE = {
  hair: '#f0eef7',
  hairShade: '#c9b8e0',
  dress: '#7a3f8f',
  dressDark: '#5f2e70',
  hat: '#4a2258',
  hatDark: '#381a44',
  band: '#e3b8f0',
}

/**
 * Opal — Great Hall head girl, glamorous trophy collector never seen
 * without her mirror. Glossy silver-white hair, royal-purple gown with a
 * medal sash, an iridescent opal brooch, a gold hand-mirror, and a fluffy
 * cat with a purple bow riding the bristles.
 */
export function OpalBoss({ mood = 'smug' }: { mood?: RivalMood }) {
  return (
    <svg viewBox="0 0 260 220" role="img" aria-label="Opal the head-girl rival">
      {/* Broom */}
      <line x1="30" y1="168" x2="196" y2="150" stroke="#7a4a26" strokeWidth="8" strokeLinecap="round" />
      <path d="M 196 142 L 244 132 L 248 154 L 200 160 Z" fill="var(--gold-600)" />
      <g stroke="var(--gold-400)" strokeWidth="2">
        <line x1="206" y1="146" x2="240" y2="139" />
        <line x1="208" y1="152" x2="242" y2="148" />
      </g>
      <path d="M 194 140 l 10 0 l 0 22 l -10 0 Z" fill="#5b3a1e" transform="rotate(-6 199 151)" />

      {/* Fluffy white cat with purple bow, perched on the bristles */}
      <g>
        <ellipse cx="216" cy="128" rx="12" ry="10" fill="#fff8f0" />
        <circle cx="216" cy="115" r="8" fill="#fff8f0" />
        <path d="M 210 109 l -2 -6 5.5 3 Z M 222 109 l 2 -6 -5.5 3 Z" fill="#fff8f0" />
        <path d="M 210 109 l -1 -3.4 3 1.8 Z M 222 109 l 1 -3.4 -3 1.8 Z" fill="#f0d0e0" />
        <path d="M 226 130 c 9 -1 11 -8 7 -12" stroke="#fff8f0" strokeWidth="5" strokeLinecap="round" fill="none" />
        <ellipse cx="206" cy="130" rx="3.5" ry="2.4" fill="#fff8f0" />
        <circle cx="213" cy="114" r="1.6" fill="#3b2a4f" />
        <circle cx="219" cy="114" r="1.6" fill="#3b2a4f" />
        <path d="M 214.5 118 q 1.5 1.4 3 0" stroke="#3b2a4f" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M 209 117 l -5 -1 M 209 119 l -5 1 M 223 117 l 5 -1 M 223 119 l 5 1" stroke="#d9c9d0" strokeWidth="0.8" />
        {/* Purple bow */}
        <path d="M 216 122 l -5 -3.4 1 4.4 Z M 216 122 l 5 -3.4 -1 4.4 Z" fill={PALETTE.band} />
        <circle cx="216" cy="122" r="1.8" fill={PALETTE.dress} />
      </g>

      {/* Legs sitting side-saddle */}
      <path d="M 96 158 C 100 176 112 184 124 184" stroke={PALETTE.dressDark} strokeWidth="12" strokeLinecap="round" fill="none" />
      <ellipse cx="130" cy="186" rx="11" ry="8" fill="#2f2247" />

      {/* Gown */}
      <path d="M 84 96 C 66 104 58 130 62 158 Q 92 172 118 160 L 108 106 Z" fill={PALETTE.dress} />
      <path d="M 62 158 Q 92 172 118 160 L 114 146 Q 90 156 66 146 Z" fill={PALETTE.dressDark} />
      {/* Gown shading under bodice */}
      <path d="M 78 104 Q 92 112 104 108 L 100 118 Q 88 122 80 116 Z" fill={PALETTE.dressDark} opacity="0.7" />

      {/* Medal sash with 3 tiny gold medals, worn diagonally over the gown */}
      <path d="M 72 98 L 108 158" stroke="#fff8f0" strokeWidth="9" strokeLinecap="round" />
      <path d="M 72 98 L 108 158" stroke={PALETTE.band} strokeWidth="9" strokeLinecap="round" opacity="0.25" />
      <g>
        <circle cx="83" cy="120" r="5" fill="var(--gold-500)" />
        <circle cx="83" cy="120" r="2.6" fill="var(--gold-400)" />
        <circle cx="91" cy="134" r="5" fill="var(--gold-500)" />
        <circle cx="91" cy="134" r="2.6" fill="var(--gold-400)" />
        <circle cx="99" cy="148" r="5" fill="var(--gold-500)" />
        <circle cx="99" cy="148" r="2.6" fill="var(--gold-400)" />
      </g>

      {/* Opal brooch at the collar — iridescent pink/blue/green circle */}
      <circle cx="86" cy="100" r="6.5" fill="#e8e6f0" />
      <path d="M 86 93.5 A 6.5 6.5 0 0 1 92 100 Z" fill="#ffb8e0" opacity="0.8" />
      <path d="M 92 100 A 6.5 6.5 0 0 1 86 106.5 Z" fill="#8fb4ff" opacity="0.75" />
      <path d="M 86 106.5 A 6.5 6.5 0 0 1 80 100 Z" fill="#2fd48a" opacity="0.7" />
      <circle cx="86" cy="100" r="6.5" fill="none" stroke="var(--gold-500)" strokeWidth="1.4" />

      {/* Arm holding a small gold hand-mirror */}
      <path d="M 100 112 C 118 108 134 110 146 118" stroke={PALETTE.dress} strokeWidth="11" strokeLinecap="round" fill="none" />
      <circle cx="150" cy="120" r="7.5" fill="#e8c9a0" />
      <g transform="translate(160 104) rotate(24)">
        <rect x="-2" y="0" width="4" height="16" rx="2" fill="var(--gold-500)" />
        <ellipse cx="0" cy="-10" rx="11" ry="13" fill="var(--gold-500)" />
        <ellipse cx="0" cy="-10" rx="8" ry="10" fill="#dff0ea" opacity="0.85" />
        <ellipse cx="-2.4" cy="-13" rx="2.4" ry="3.4" fill="#fff" opacity="0.6" />
      </g>

      {/* Head */}
      <circle cx="88" cy="72" r="34" fill="#e8c9a0" />

      {/* Hair — glossy long silver-white wave with lilac shading */}
      <path
        d="M 54 66 C 54 40 74 30 92 32 C 112 34 122 48 122 66
           C 112 54 104 50 96 50 Q 100 58 96 64 C 88 54 76 52 66 58 Q 60 60 54 66 Z"
        fill={PALETTE.hair}
      />
      <path d="M 54 66 C 48 92 52 114 62 128 C 68 130 74 128 76 122 C 68 110 66 90 66 70 Z" fill={PALETTE.hair} />
      <path d="M 122 66 C 126 90 122 110 112 122 C 106 124 100 122 98 116 C 106 104 110 86 110 68 Z" fill={PALETTE.hair} />
      {/* Lilac shading along the wave */}
      <path d="M 60 74 C 56 92 58 108 66 120 C 64 106 62 90 64 76 Z" fill={PALETTE.hairShade} opacity="0.6" />
      <path d="M 114 74 C 118 90 116 106 108 118 C 112 104 112 88 110 76 Z" fill={PALETTE.hairShade} opacity="0.55" />
      {/* Sparkle stars around the hair */}
      <g fill="#fff8f0">
        <path d="M 48 90 l 1 2.6 2.6 .3 -2 1.8 .6 2.6 -2.2 -1.4 -2.2 1.4 .6 -2.6 -2 -1.8 2.6 -.3 Z" />
        <circle cx="130" cy="82" r="1.6" />
        <circle cx="46" cy="60" r="1.3" />
      </g>

      {/* Hat askew */}
      <g transform="rotate(-10 88 40)">
        <ellipse cx="88" cy="42" rx="40" ry="9" fill={PALETTE.hatDark} />
        <path d="M 62 40 C 70 20 80 6 100 -2 C 112 -6 122 -2 118 6 C 108 4 104 10 108 16 C 112 24 116 32 118 40 Q 88 50 62 40 Z" fill={PALETTE.hat} />
        <path d="M 64 39 Q 88 49 116 39 L 112 30 Q 88 38 68 30 Z" fill={PALETTE.band} />
        <g fill="var(--gold-400)">
          <path d="M 104 12 l 1 2.6 2.6 .3 -2 1.8 .6 2.6 -2.2 -1.4 -2.2 1.4 .6 -2.6 -2 -1.8 2.6 -.3 Z" />
        </g>
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
