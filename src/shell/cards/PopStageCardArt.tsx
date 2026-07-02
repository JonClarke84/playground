import { Sparkle } from './Sparkle'

/** Card scene: empty stage, spotlights warming up — the future pop game. */
export function PopStageCardArt() {
  return (
    <svg className="card-art" viewBox="0 0 320 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="ct-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#170b33" />
          <stop offset="1" stopColor="#31114d" />
        </linearGradient>
        <linearGradient id="ct-beam-pink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff7ac3" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ff7ac3" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="ct-beam-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd166" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffd166" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="ct-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a2472" />
          <stop offset="1" stopColor="#2a1052" />
        </linearGradient>
      </defs>

      <rect width="320" height="400" fill="url(#ct-sky)" />

      {/* Spot rigs */}
      <rect x="0" y="26" width="320" height="8" rx="4" fill="#120a2c" />
      <g>
        <circle cx="84" cy="44" r="13" fill="#120a2c" />
        <circle cx="84" cy="47" r="7" fill="var(--pink-400)" />
        <circle cx="236" cy="44" r="13" fill="#120a2c" />
        <circle cx="236" cy="47" r="7" fill="var(--gold-400)" />
      </g>

      {/* Beams */}
      <polygon points="84,52 24,330 196,330" fill="url(#ct-beam-pink)" />
      <polygon points="236,52 124,330 308,330" fill="url(#ct-beam-gold)" />

      {/* Music notes */}
      <g fill="#fff" opacity="0.92">
        <g transform="translate(120 150) rotate(-12)">
          <ellipse cx="0" cy="26" rx="11" ry="8" />
          <rect x="8" y="-26" width="4.5" height="52" rx="2" />
          <path d="M8 -26 q 26 2 26 20 q -8 -10 -26 -8 Z" />
        </g>
        <g transform="translate(196 120) rotate(10)" opacity="0.8">
          <ellipse cx="0" cy="20" rx="8.5" ry="6.5" />
          <rect x="6" y="-20" width="3.6" height="40" rx="2" />
          <path d="M6 -20 q 20 2 20 16 q -6 -8 -20 -6 Z" />
        </g>
      </g>

      <Sparkle x={60} y={196} size={8} fill="var(--pink-400)" twinkleDelay={0.6} />
      <Sparkle x={262} y={176} size={10} twinkleDelay={1.8} />
      <Sparkle x={160} y={70} size={7} fill="#fff" twinkleDelay={2.9} />

      {/* Stage floor */}
      <rect x="0" y="322" width="320" height="78" fill="url(#ct-floor)" />
      <ellipse cx="110" cy="330" rx="86" ry="12" fill="var(--pink-400)" opacity="0.28" />
      <ellipse cx="216" cy="330" rx="92" ry="12" fill="var(--gold-400)" opacity="0.25" />
    </svg>
  )
}
