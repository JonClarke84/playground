import { Sparkle } from './Sparkle'

/** Card scene: castle under a big crescent moon — the future history game. */
export function CastleCardArt() {
  return (
    <svg className="card-art" viewBox="0 0 320 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="cb-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c0f3e" />
          <stop offset="1" stopColor="#3c1a5e" />
        </linearGradient>
        <radialGradient id="cb-moonglow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffd166" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffd166" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="320" height="400" fill="url(#cb-sky)" />
      {[
        [40, 60], [90, 34], [150, 78], [284, 48], [302, 150], [26, 170], [60, 240],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 2 === 0 ? 1.6 : 1} fill="#fff" opacity={0.55} />
      ))}

      {/* Moon */}
      <circle cx="228" cy="104" r="86" fill="url(#cb-moonglow)" />
      <path
        d="M 228 44 a 60 60 0 1 0 42 102 a 48 48 0 1 1 -42 -102 Z"
        fill="var(--gold-400)"
      />

      <Sparkle x={70} y={110} size={9} twinkleDelay={0.8} />
      <Sparkle x={140} y={150} size={6} fill="#fff" twinkleDelay={2.2} />
      <Sparkle x={288} y={210} size={8} twinkleDelay={3.4} />

      {/* Hill */}
      <path d="M0 400 V330 Q 160 282 320 330 V400 Z" fill="#241245" />

      {/* Castle silhouette */}
      <g fill="#160b30">
        {/* Keep */}
        <rect x="118" y="212" width="84" height="118" />
        <path d="M118 212 h12 v-12 h12 v12 h12 v-12 h12 v12 h12 v-12 h12 v12 h12 v-14 h-84 Z" />
        {/* Left tower */}
        <rect x="84" y="192" width="36" height="140" />
        <polygon points="82,192 122,192 102,152" />
        {/* Right tower */}
        <rect x="200" y="192" width="36" height="140" />
        <polygon points="198,192 238,192 218,152" />
        {/* Gate */}
        <path d="M146 330 v-40 a14 14 0 0 1 28 0 v40 Z" />
      </g>
      {/* Flags */}
      <g>
        <line x1="102" y1="152" x2="102" y2="132" stroke="#160b30" strokeWidth="3" />
        <path d="M102 132 l22 6 -22 8 Z" fill="var(--pink-500)" />
        <line x1="218" y1="152" x2="218" y2="132" stroke="#160b30" strokeWidth="3" />
        <path d="M218 132 l22 6 -22 8 Z" fill="var(--emerald-500)" />
      </g>
      {/* Lit windows */}
      <g fill="var(--gold-500)" opacity="0.9">
        <path d="M98 220 a4 5 0 0 1 8 0 v10 h-8 Z" />
        <path d="M214 220 a4 5 0 0 1 8 0 v10 h-8 Z" />
        <path d="M156 240 a4 5 0 0 1 8 0 v10 h-8 Z" />
      </g>
    </svg>
  )
}
