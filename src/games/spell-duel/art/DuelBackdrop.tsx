/**
 * The academy great hall at night — full-bleed duel scene backdrop.
 * Dark so particle glow lands (PRODUCT.md §8.1). Structured so a raster
 * image can replace it later (§8.2.3).
 */
export function DuelBackdrop() {
  return (
    <svg
      className="duel-backdrop"
      viewBox="0 0 1280 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hall-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#160c30" />
          <stop offset="0.7" stopColor="#221345" />
          <stop offset="1" stopColor="#2c1a52" />
        </linearGradient>
        <linearGradient id="hall-window" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4b3a86" />
          <stop offset="1" stopColor="#33255f" />
        </linearGradient>
        <linearGradient id="hall-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a1a52" />
          <stop offset="1" stopColor="#1a0f38" />
        </linearGradient>
      </defs>

      <rect width="1280" height="800" fill="url(#hall-wall)" />

      {/* Arched windows with moonlight */}
      {[140, 560, 980].map((x) => (
        <g key={x}>
          <path
            d={`M ${x} 360 v -160 a 80 80 0 0 1 160 0 v 160 Z`}
            fill="url(#hall-window)"
          />
          <path
            d={`M ${x + 12} 360 v -148 a 68 68 0 0 1 136 0 v 148 Z`}
            fill="#1d1140"
          />
          {/* Mullions */}
          <line x1={x + 80} y1={132} x2={x + 80} y2={360} stroke="#4b3a86" strokeWidth="7" />
          <line x1={x + 12} y1={260} x2={x + 148} y2={260} stroke="#4b3a86" strokeWidth="7" />
          {/* Stars through the glass */}
          <circle cx={x + 46} cy={210} r="2.4" fill="#fff" opacity="0.7" />
          <circle cx={x + 112} cy={172} r="1.8" fill="#ffd166" opacity="0.8" />
          <circle cx={x + 96} cy={310} r="1.6" fill="#fff" opacity="0.5" />
        </g>
      ))}

      {/* Moon through the middle window */}
      <circle cx="672" cy="196" r="34" fill="#ffe9b3" opacity="0.9" />
      <circle cx="662" cy="188" r="30" fill="#1d1140" opacity="0.18" />

      {/* Bookshelf silhouettes between windows */}
      {[352, 772].map((x) => (
        <g key={x} fill="#120a2c">
          <rect x={x} y={210} width={156} height={150} rx={6} />
          {[228, 262, 296, 330].map((y) => (
            <rect key={y} x={x + 10} y={y} width={136} height={5} fill="#241448" />
          ))}
        </g>
      ))}

      {/* Floating candles */}
      {[
        [230, 120], [420, 84], [850, 96], [1060, 130], [640, 60],
      ].map(([x, y], i) => (
        <g key={i} className="hall-candle" style={{ animationDelay: `${i * 0.7}s` }}>
          <rect x={x - 5} y={y} width={10} height={26} rx={3} fill="#efe6d0" />
          <ellipse cx={x} cy={y - 5} rx={4} ry={6.5} fill="var(--gold-400)" />
          <ellipse cx={x} cy={y - 4} rx={2} ry={3.5} fill="#fff8f0" />
        </g>
      ))}

      {/* Floor */}
      <rect x="0" y="620" width="1280" height="180" fill="url(#hall-floor)" />
      <ellipse cx="640" cy="624" rx="620" ry="26" fill="#38246522" />
    </svg>
  )
}
