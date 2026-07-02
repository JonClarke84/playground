import { Sparkle } from './Sparkle'

/**
 * Card scene: a glowing emerald spell crystal floating above the academy
 * skyline at night.
 */
export function SpellDuelCardArt() {
  return (
    <svg className="card-art" viewBox="0 0 320 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sd-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#221149" />
          <stop offset="0.55" stopColor="#180c38" />
          <stop offset="1" stopColor="#2a1052" />
        </linearGradient>
        <radialGradient id="sd-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#2fd48a" stopOpacity="0.5" />
          <stop offset="0.6" stopColor="#2fd48a" stopOpacity="0.16" />
          <stop offset="1" stopColor="#2fd48a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sd-facet-l" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0f9d63" />
          <stop offset="1" stopColor="#17b273" />
        </linearGradient>
        <linearGradient id="sd-facet-r" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2fd48a" />
          <stop offset="1" stopColor="#7dedbb" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="320" height="400" fill="url(#sd-sky)" />
      {[
        [30, 46], [68, 108], [22, 210], [289, 60], [262, 140], [300, 235],
        [50, 300], [281, 320], [130, 40], [206, 68],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.7 : 1.1} fill="#fff" opacity={0.5} />
      ))}

      {/* Crystal halo */}
      <circle cx="160" cy="190" r="130" fill="url(#sd-halo)" />

      {/* The spell crystal — elongated shard, mid-line facet split */}
      <g>
        <polygon points="160,85 115,160 135,265 160,305" fill="url(#sd-facet-l)" />
        <polygon points="160,85 205,160 185,265 160,305" fill="url(#sd-facet-r)" />
        {/* Top facets */}
        <polygon points="160,85 115,160 160,175" fill="#26c580" opacity="0.9" />
        <polygon points="160,85 205,160 160,175" fill="#9df5cc" opacity="0.85" />
        {/* Inner gleam */}
        <polygon points="160,110 143,162 160,152" fill="#eafff4" opacity="0.75" />
        <line x1="160" y1="85" x2="160" y2="305" stroke="#bdf7dc" strokeOpacity="0.5" strokeWidth="1.4" />
      </g>

      {/* Orbiting sparkles */}
      <Sparkle x={90} y={130} size={9} twinkleDelay={0.4} />
      <Sparkle x={238} y={110} size={13} fill="#fff" twinkleDelay={1.6} />
      <Sparkle x={244} y={252} size={8} twinkleDelay={2.3} />
      <Sparkle x={76} y={262} size={11} fill="var(--pink-400)" twinkleDelay={3.1} />
      <Sparkle x={186} y={62} size={7} fill="var(--gold-400)" twinkleDelay={0.9} />

      {/* Academy skyline */}
      <g fill="#120a2c">
        <path d="M0 400 V330 h18 l8 -26 8 26 h30 v-44 l14 -22 14 22 v44 h26 V318 h20 l10 -30 10 30 h20 v12 h30 v-52 l16 -24 16 24 v52 h24 l8 -20 8 20 H320 V400 Z" />
      </g>
      {/* Lit windows */}
      <g fill="var(--gold-500)" opacity="0.85">
        <rect x="48" y="308" width="6" height="9" rx="2" />
        <rect x="86" y="296" width="6" height="9" rx="2" />
        <rect x="150" y="322" width="6" height="9" rx="2" />
        <rect x="216" y="286" width="6" height="9" rx="2" />
        <rect x="262" y="330" width="6" height="9" rx="2" />
      </g>
    </svg>
  )
}
