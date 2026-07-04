import type { ReactElement } from 'react'
import type { SceneTheme, SceneVariant } from '../progression'
import { DEFAULT_THEME } from '../progression'
import { sceneImageUrl } from '../../../lib/art'

/**
 * Themed full-bleed duel scenes — one per academy location (PRODUCT.md §4.6),
 * built from a shared stage scaffold plus per-location signature props.
 * Dark palettes so particle glow lands (§8.1); structured so any scene can be
 * swapped for a raster image later (§8.2.3).
 */

/** Arched window with mullions, glass tinted by the theme. */
function ArchWindow({ x, glass }: { x: number; glass: string }) {
  return (
    <g>
      <path d={`M ${x} 360 v -160 a 80 80 0 0 1 160 0 v 160 Z`} fill={glass} />
      <path d={`M ${x + 12} 360 v -148 a 68 68 0 0 1 136 0 v 148 Z`} fill="#00000055" />
      <line x1={x + 80} y1={132} x2={x + 80} y2={360} stroke={glass} strokeWidth="7" />
      <line x1={x + 12} y1={260} x2={x + 148} y2={260} stroke={glass} strokeWidth="7" />
      <circle cx={x + 46} cy={210} r="2.4" fill="#fff" opacity="0.7" />
      <circle cx={x + 112} cy={172} r="1.8" fill="#ffd166" opacity="0.8" />
    </g>
  )
}

function FloatingCandles({ xs }: { xs: number[] }) {
  return (
    <g>
      {xs.map((x, i) => (
        <g key={x} className="hall-candle" style={{ animationDelay: `${i * 0.7}s` }}>
          <rect x={x - 5} y={90} width={10} height={26} rx={3} fill="#efe6d0" />
          <ellipse cx={x} cy={85} rx={4} ry={6.5} fill="var(--gold-400)" />
          <ellipse cx={x} cy={86} rx={2} ry={3.5} fill="#fff8f0" />
        </g>
      ))}
    </g>
  )
}

function Bookshelf({ x }: { x: number }) {
  return (
    <g fill="#120a2c">
      <rect x={x} y={210} width={156} height={150} rx={6} />
      {[228, 262, 296, 330].map((y) => (
        <rect key={y} x={x + 10} y={y} width={136} height={5} fill="#ffffff14" />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={x + 14 + i * 27} y={234} width={16} height={26} rx={2} fill={['#552c93', '#8a3d5e', '#2c5c8a', '#8a6b2c', '#3d7a55'][i]} opacity="0.75" />
      ))}
    </g>
  )
}

function Moon({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#ffe9b3" opacity="0.9" />
      <circle cx={x - r * 0.3} cy={y - r * 0.25} r={r * 0.88} fill="#0b0f1e" opacity="0.16" />
    </g>
  )
}

function Sparkles({ seedOffset = 0, colour = '#fff' }: { seedOffset?: number; colour?: string }) {
  const points = [
    [120, 120], [340, 80], [620, 140], [900, 90], [1150, 130], [480, 60], [1040, 60], [220, 180],
  ]
  return (
    <g>
      {points.map(([x, y], i) => (
        <circle key={i} cx={(x + seedOffset * 37) % 1280} cy={y} r={i % 3 === 0 ? 2.4 : 1.6} fill={colour} opacity={0.4 + (i % 4) * 0.14} />
      ))}
    </g>
  )
}

/* ---------- per-location signature layers ---------- */

function LibraryProps({ glass }: { glass: string }) {
  return (
    <g>
      <ArchWindow x={140} glass={glass} />
      <ArchWindow x={560} glass={glass} />
      <ArchWindow x={980} glass={glass} />
      <Moon x={672} y={196} r={34} />
      <Bookshelf x={352} />
      <Bookshelf x={772} />
      <FloatingCandles xs={[230, 640, 1060]} />
      {/* A pile of grimoires on the floor */}
      <g>
        <rect x="470" y="596" width="120" height="20" rx="6" fill="#552c93" />
        <rect x="486" y="578" width="96" height="18" rx="6" fill="#8a3d5e" />
        <rect x="502" y="562" width="72" height="16" rx="5" fill="#2c5c8a" />
      </g>
    </g>
  )
}

function GardenProps({ glass }: { glass: string }) {
  return (
    <g>
      <Moon x={1050} y={140} r={44} />
      <Sparkles colour="#a3e26a" />
      {/* Hedge rows */}
      <path d="M 0 560 q 90 -70 180 0 q 90 -66 180 0 q 90 -70 180 0 l 0 80 l -540 0 Z" fill="#0d2415" />
      <path d="M 740 560 q 90 -70 180 0 q 90 -66 180 0 q 90 -70 180 0 l 0 80 l -540 0 Z" fill="#0d2415" />
      {/* Giant glowing toadstools */}
      {[[210, 590, 46], [1080, 600, 56], [950, 580, 30]].map(([x, y, r], i) => (
        <g key={i}>
          <rect x={x - r * 0.18} y={y - r * 0.1} width={r * 0.36} height={r * 0.8} rx={r * 0.14} fill="#e8d9c0" />
          <path d={`M ${x - r} ${y} a ${r} ${r * 0.72} 0 0 1 ${r * 2} 0 Z`} fill="#c9455e" />
          <circle cx={x - r * 0.4} cy={y - r * 0.3} r={r * 0.13} fill="#fff8f0" />
          <circle cx={x + r * 0.3} cy={y - r * 0.42} r={r * 0.1} fill="#fff8f0" />
        </g>
      ))}
      {/* Fireflies */}
      {[[320, 470], [420, 520], [880, 490], [760, 540], [1180, 470]].map(([x, y], i) => (
        <circle key={i} className="hall-candle" style={{ animationDelay: `${i * 0.9}s` }} cx={x} cy={y} r="3" fill={glass} opacity="0.9" />
      ))}
    </g>
  )
}

function OwleryProps({ glass }: { glass: string }) {
  const owl = (x: number, y: number, s: number) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="0" rx="16" ry="20" fill="#5a3b2a" />
      <ellipse cx="0" cy="6" rx="10" ry="11" fill="#8a6448" />
      <path d="M -11 -16 l -3 -9 9 5 Z M 11 -16 l 3 -9 -9 5 Z" fill="#5a3b2a" />
      <circle cx="-5.5" cy="-6" r="5" fill="#efe6d0" />
      <circle cx="5.5" cy="-6" r="5" fill="#efe6d0" />
      <circle cx="-5" cy="-5.6" r="2.2" fill="#241832" />
      <circle cx="5" cy="-5.6" r="2.2" fill="#241832" />
      <path d="M 0 -2 l -3.4 4.8 h 6.8 Z" fill="var(--gold-600)" />
    </g>
  )
  return (
    <g>
      {/* Big round moonlit window */}
      <circle cx={640} cy={220} r={120} fill={glass} />
      <circle cx={640} cy={220} r={104} fill="#00000055" />
      <line x1={640} y1={116} x2={640} y2={324} stroke={glass} strokeWidth="8" />
      <line x1={536} y1={220} x2={744} y2={220} stroke={glass} strokeWidth="8" />
      <Moon x={610} y={195} r={26} />
      {/* Perch poles with owls */}
      <rect x={150} y={230} width={12} height={340} rx={6} fill="#3a2417" />
      <rect x={90} y={300} width={220} height={10} rx={5} fill="#3a2417" />
      <rect x={1120} y={260} width={12} height={310} rx={6} fill="#3a2417" />
      <rect x={1050} y={330} width={200} height={10} rx={5} fill="#3a2417" />
      {owl(140, 278, 1)}
      {owl(250, 280, 0.7)}
      {owl(1160, 308, 0.85)}
      {/* Drifting feathers */}
      {[[420, 480], [860, 440], [980, 520]].map(([x, y], i) => (
        <ellipse key={i} className="hall-candle" style={{ animationDelay: `${i * 1.1}s` }} cx={x} cy={y} rx="9" ry="3.4" fill="#e8c69d" opacity="0.6" transform={`rotate(${20 + i * 30} ${x} ${y})`} />
      ))}
    </g>
  )
}

function PotionsProps({ glass }: { glass: string }) {
  const bottle = (x: number, y: number, w: number, h: number, colour: string) => (
    <g>
      <rect x={x} y={y - h} width={w} height={h} rx={w * 0.3} fill={colour} opacity="0.85" />
      <rect x={x + w * 0.3} y={y - h - 7} width={w * 0.4} height={8} rx={2} fill="#9fb6c9" />
    </g>
  )
  return (
    <g>
      {/* Shelves of glowing bottles */}
      {[
        { y: 250, xs: [180, 260, 330, 410] },
        { y: 360, xs: [150, 240, 320, 400, 460] },
      ].map((shelf, s) => (
        <g key={s}>
          <rect x={120} y={shelf.y} width={400} height={10} rx={5} fill="#0a1a10" />
          {shelf.xs.map((x, i) =>
            bottle(x, shelf.y, 24 + (i % 3) * 8, 40 + ((i + s) % 3) * 16, ['#2fd48a', '#b78bff', '#ffd166', '#ff7ac3', '#5fc4d4'][(i + s) % 5]),
          )}
        </g>
      ))}
      {[
        { y: 250, xs: [860, 940, 1020, 1100] },
        { y: 360, xs: [880, 970, 1050, 1130] },
      ].map((shelf, s) => (
        <g key={s}>
          <rect x={800} y={shelf.y} width={380} height={10} rx={5} fill="#0a1a10" />
          {shelf.xs.map((x, i) =>
            bottle(x, shelf.y, 22 + ((i + 1) % 3) * 9, 46 + ((i + s) % 4) * 12, ['#ff7ac3', '#2fd48a', '#5fc4d4', '#ffd166'][(i + s) % 4]),
          )}
        </g>
      ))}
      {/* Bubbling cauldron */}
      <ellipse cx={640} cy={604} rx={95} ry={26} fill="#08130c" />
      <path d="M 555 560 a 85 60 0 0 0 170 0 q -10 -12 -85 -12 q -75 0 -85 12 Z" fill="#122018" />
      <ellipse cx={640} cy={556} rx={80} ry={16} fill={glass} />
      {[[610, 520, 9], [655, 505, 7], [635, 480, 5]].map(([x, y, r], i) => (
        <circle key={i} className="hall-candle" style={{ animationDelay: `${i * 0.8}s` }} cx={x} cy={y} r={r} fill={glass} opacity="0.7" />
      ))}
    </g>
  )
}

function StarsProps({ glass }: { glass: string }) {
  return (
    <g>
      {/* Grand dome window full of stars */}
      <path d="M 340 420 a 300 300 0 0 1 600 0 Z" fill={glass} opacity="0.35" />
      <path d="M 360 420 a 280 280 0 0 1 560 0 Z" fill="#060d26" />
      {[[480, 300], [560, 220], [660, 180], [780, 230], [850, 320], [640, 300], [720, 350], [560, 350]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 3 : 1.8} fill="#fff" opacity={0.5 + (i % 3) * 0.2} />
      ))}
      <Moon x={700} y={250} r={30} />
      {[420, 520, 640, 760, 860].map((x) => (
        <line key={x} x1={640} y1={420} x2={x} y2={140} stroke={glass} strokeWidth="3" opacity="0.25" />
      ))}
      {/* Brass telescope */}
      <g transform="rotate(-24 320 520)">
        <rect x={250} y={505} width={190} height={26} rx={13} fill="var(--gold-600)" />
        <rect x={420} y={500} width={40} height={36} rx={10} fill="var(--gold-500)" />
      </g>
      <path d="M 305 620 l 40 -85 l 40 85 Z" fill="#1c2a5e" />
      {/* Orrery in the corner */}
      <circle cx={1080} cy={420} r={54} fill="none" stroke="var(--gold-600)" strokeWidth="3" opacity="0.8" />
      <circle cx={1080} cy={420} r={30} fill="none" stroke="var(--gold-600)" strokeWidth="2.4" opacity="0.7" />
      <circle cx={1080} cy={420} r={9} fill="var(--gold-400)" />
      <circle cx={1134} cy={420} r={6} fill="#8fb4ff" />
      <circle cx={1080} cy={390} r={4.5} fill="#ff7ac3" />
      <rect x={1072} y={470} width={16} height={120} rx={7} fill="#1c2a5e" />
    </g>
  )
}

function HallProps({ glass }: { glass: string }) {
  return (
    <g>
      <ArchWindow x={140} glass={glass} />
      <ArchWindow x={560} glass={glass} />
      <ArchWindow x={980} glass={glass} />
      <Moon x={672} y={196} r={34} />
      <Bookshelf x={352} />
      <Bookshelf x={772} />
      <FloatingCandles xs={[230, 420, 850, 1060, 640]} />
    </g>
  )
}

function BroomsProps({ glass }: { glass: string }) {
  const broom = (x: number, lean: number) => (
    <g transform={`rotate(${lean} ${x} 600)`}>
      <line x1={x} y1={370} x2={x} y2={580} stroke="#5d3719" strokeWidth="9" strokeLinecap="round" />
      <path d={`M ${x - 16} 575 h 32 l 8 60 h -48 Z`} fill="var(--gold-600)" />
    </g>
  )
  return (
    <g>
      {/* Sunset horizon + flying silhouettes */}
      <circle cx={340} cy={210} r={58} fill={glass} opacity="0.9" />
      <Sparkles colour="#f0a35e" />
      {[[700, 150], [820, 110], [920, 170]].map(([x, y], i) => (
        <path key={i} className="hall-candle" style={{ animationDelay: `${i}s` }} d={`M ${x} ${y} q 10 -8 20 0 q 8 -3 12 2 l -16 4 Z`} fill="#1c0f1e" opacity="0.85" />
      ))}
      {/* Fence */}
      {[80, 200, 320, 440, 1020, 1140].map((x) => (
        <rect key={x} x={x} y={520} width={14} height={110} rx={6} fill="#2a1420" />
      ))}
      <rect x={60} y={545} width={410} height={10} rx={5} fill="#2a1420" />
      <rect x={1000} y={545} width={180} height={10} rx={5} fill="#2a1420" />
      {/* Brooms leaning on the rack */}
      {broom(130, -8)}
      {broom(250, 6)}
      {broom(380, -4)}
      {broom(1080, 7)}
      {/* Broom shed */}
      <path d="M 880 630 v -150 l 110 -70 l 110 70 v 150 Z" fill="#22101c" />
      <rect x={955} y={540} width={70} height={90} rx={6} fill="#0f0810" />
      <circle cx={1012} cy={585} r={5} fill="var(--gold-500)" />
    </g>
  )
}

function ClockProps({ glass }: { glass: string }) {
  const gear = (x: number, y: number, r: number, teeth: number, colour: string) => (
    <g className="clock-gear" style={{ transformOrigin: `${x}px ${y}px` }}>
      {Array.from({ length: teeth }, (_, i) => (
        <rect key={i} x={x - r * 0.09} y={y - r - r * 0.16} width={r * 0.18} height={r * 0.34} rx={r * 0.05} transform={`rotate(${(360 / teeth) * i} ${x} ${y})`} fill={colour} />
      ))}
      <circle cx={x} cy={y} r={r} fill={colour} />
      <circle cx={x} cy={y} r={r * 0.42} fill="#0e1a24" />
    </g>
  )
  return (
    <g>
      {/* Giant backlit clock face */}
      <circle cx={640} cy={260} r={150} fill={glass} opacity="0.55" />
      <circle cx={640} cy={260} r={132} fill="#ffe9b3" opacity="0.14" />
      <circle cx={640} cy={260} r={132} fill="none" stroke={glass} strokeWidth="10" />
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180
        return (
          <rect
            key={i}
            x={640 + Math.sin(angle) * 112 - 4}
            y={260 - Math.cos(angle) * 112 - 10}
            width={8}
            height={20}
            rx={3}
            fill="#ffe9b3"
            opacity="0.8"
            transform={`rotate(${i * 30} ${640 + Math.sin(angle) * 112} ${260 - Math.cos(angle) * 112})`}
          />
        )
      })}
      <line x1={640} y1={260} x2={640} y2={172} stroke="#ffe9b3" strokeWidth="9" strokeLinecap="round" />
      <line x1={640} y1={260} x2={702} y2={296} stroke="#ffe9b3" strokeWidth="9" strokeLinecap="round" />
      <circle cx={640} cy={260} r={12} fill="#ffe9b3" />
      {/* Gears */}
      {gear(180, 420, 58, 8, '#2f5468')}
      {gear(280, 500, 38, 7, '#24435a')}
      {gear(1100, 400, 66, 9, '#2f5468')}
      {gear(1000, 500, 40, 7, '#24435a')}
      {/* Pendulum */}
      <g className="clock-pendulum" style={{ transformOrigin: '640px 410px' }}>
        <line x1={640} y1={410} x2={640} y2={580} stroke="var(--gold-600)" strokeWidth="6" />
        <circle cx={640} cy={596} r={26} fill="var(--gold-500)" />
      </g>
    </g>
  )
}

function TreasuryProps({ glass }: { glass: string }) {
  const coinPile = (x: number, y: number, w: number) => (
    <g>
      <ellipse cx={x} cy={y} rx={w} ry={w * 0.3} fill="var(--gold-600)" />
      <ellipse cx={x - w * 0.25} cy={y - w * 0.22} rx={w * 0.6} ry={w * 0.2} fill="var(--gold-500)" />
      <ellipse cx={x + w * 0.2} cy={y - w * 0.4} rx={w * 0.36} ry={w * 0.13} fill="var(--gold-400)" />
    </g>
  )
  return (
    <g>
      <ArchWindow x={560} glass={glass} />
      <Moon x={672} y={196} r={30} />
      <Sparkles colour="#ffd166" />
      {/* Vault door */}
      <circle cx={200} cy={330} r={110} fill="#1e1304" />
      <circle cx={200} cy={330} r={92} fill="none" stroke="var(--gold-600)" strokeWidth="8" />
      <circle cx={200} cy={330} r={30} fill="none" stroke="var(--gold-600)" strokeWidth="7" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <line key={deg} x1={200} y1={330} x2={200 + Math.cos((deg * Math.PI) / 180) * 88} y2={330 + Math.sin((deg * Math.PI) / 180) * 88} stroke="var(--gold-600)" strokeWidth="6" transform="" />
      ))}
      {/* Treasure chest */}
      <g>
        <rect x={960} y={520} width={200} height={100} rx={12} fill="#5d3719" />
        <path d="M 950 530 a 110 60 0 0 1 220 0 Z" fill="#7a4a26" />
        <rect x={950} y={520} width={220} height={16} rx={8} fill="var(--gold-600)" />
        <rect x={1046} y={508} width={28} height={40} rx={6} fill="var(--gold-500)" />
        {coinPile(1060, 520, 70)}
      </g>
      {coinPile(420, 600, 90)}
      {coinPile(560, 620, 60)}
      {coinPile(880, 615, 55)}
    </g>
  )
}

function MusicProps({ glass }: { glass: string }) {
  const note = (x: number, y: number, s: number, i: number) => (
    <g className="hall-candle" style={{ animationDelay: `${i * 0.6}s` }} transform={`translate(${x} ${y}) scale(${s})`} fill={glass}>
      <ellipse cx="0" cy="14" rx="7" ry="5.4" transform="rotate(-20)" />
      <rect x="5" y="-14" width="3.4" height="28" rx="1.6" />
      <path d="M 5 -14 q 12 2 12 12 q -4 -6 -12 -6 Z" />
    </g>
  )
  return (
    <g>
      <ArchWindow x={980} glass="#6b3a70" />
      <Moon x={1060} y={196} r={26} />
      {/* Grand harp */}
      <g transform="translate(180 260)">
        <path d="M 0 320 q -40 -180 60 -290 q 90 -60 120 10 q -70 -10 -100 60 q -30 70 -10 220 Z" fill="var(--gold-600)" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <line key={i} x1={26 + i * 16} y1={40 + i * 6} x2={40 + i * 12} y2={310} stroke="#ffe9b3" strokeWidth="2.4" opacity="0.85" />
        ))}
        <ellipse cx={40} cy={324} rx={70} ry={14} fill="#200d26" />
      </g>
      {/* Self-playing piano silhouette */}
      <g transform="translate(880 420)">
        <rect x={0} y={0} width={300} height={150} rx={14} fill="#200d26" />
        <rect x={16} y={44} width={268} height={34} rx={6} fill="#efe6d0" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <rect key={i} x={30 + i * 28} y={44} width={12} height={20} rx={2} fill="#200d26" />
        ))}
        <rect x={20} y={150} width={18} height={40} rx={6} fill="#200d26" />
        <rect x={262} y={150} width={18} height={40} rx={6} fill="#200d26" />
      </g>
      {/* Floating notes */}
      {note(560, 300, 1.2, 0)}
      {note(660, 240, 0.9, 1)}
      {note(760, 320, 1.05, 2)}
      {note(480, 200, 0.8, 3)}
    </g>
  )
}

function RooftopsProps({ glass }: { glass: string }) {
  return (
    <g>
      <Moon x={980} y={150} r={64} />
      <Sparkles colour="#8fb4ff" />
      {/* Distant spires */}
      <path d="M 60 640 v -220 l 50 -80 l 50 80 v 220 Z" fill="#0b101c" />
      <path d="M 1120 640 v -190 l 45 -70 l 45 70 v 190 Z" fill="#0b101c" />
      <rect x={92} y={430} width={14} height={20} rx={3} fill="#ffe9b3" opacity="0.75" />
      <rect x={1148} y={470} width={14} height={20} rx={3} fill="#ffe9b3" opacity="0.75" />
      {/* Rooftop ridge she stands on */}
      <path d="M 0 660 l 200 -60 l 220 40 l 220 -50 l 240 44 l 200 -38 l 200 40 v 180 h -1280 Z" fill="#10141d" />
      {/* Chimneys with drifting smoke */}
      {[[290, 590], [700, 585], [1010, 596]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y - 70} width={44} height={80} rx={6} fill="#171d28" />
          <rect x={x - 6} y={y - 78} width={56} height={14} rx={5} fill="#1f2733" />
          <circle className="hall-candle" style={{ animationDelay: `${i * 1.2}s` }} cx={x + 22} cy={y - 100} r={11} fill={glass} opacity="0.25" />
          <circle className="hall-candle" style={{ animationDelay: `${i * 1.2 + 0.6}s` }} cx={x + 30} cy={y - 128} r={8} fill={glass} opacity="0.18" />
        </g>
      ))}
      {/* Lit attic window in the roof ridge */}
      <g>
        <path d="M 520 640 v -60 l 40 -34 l 40 34 v 60 Z" fill="#171d28" />
        <circle cx={560} cy={592} r={16} fill="#ffe9b3" opacity="0.85" />
        <line x1={560} y1={576} x2={560} y2={608} stroke="#171d28" strokeWidth="4" />
        <line x1={544} y1={592} x2={576} y2={592} stroke="#171d28" strokeWidth="4" />
      </g>
    </g>
  )
}

const PROPS: Record<SceneVariant, (glass: string) => ReactElement> = {
  library: (g) => <LibraryProps glass={g} />,
  garden: (g) => <GardenProps glass={g} />,
  owlery: (g) => <OwleryProps glass={g} />,
  potions: (g) => <PotionsProps glass={g} />,
  stars: (g) => <StarsProps glass={g} />,
  hall: (g) => <HallProps glass={g} />,
  brooms: (g) => <BroomsProps glass={g} />,
  clock: (g) => <ClockProps glass={g} />,
  treasury: (g) => <TreasuryProps glass={g} />,
  music: (g) => <MusicProps glass={g} />,
  rooftops: (g) => <RooftopsProps glass={g} />,
}

export function DuelBackdrop({ theme = DEFAULT_THEME }: { theme?: SceneTheme }) {
  // Painted backdrop wins when one has been dropped in (see ART_PROMPTS.md);
  // the animated ambient layers still render above it.
  const raster = sceneImageUrl(theme.variant)
  if (raster !== null) {
    return <img className="duel-backdrop duel-backdrop--raster" src={raster} alt="" draggable={false} />
  }
  const skyId = `sky-${theme.variant}`
  const floorId = `floor-${theme.variant}`
  return (
    <svg
      className="duel-backdrop"
      viewBox="0 0 1280 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={theme.sky[0]} />
          <stop offset="0.7" stopColor={theme.sky[1]} />
          <stop offset="1" stopColor={theme.sky[2]} />
        </linearGradient>
        <linearGradient id={floorId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={theme.floor[0]} />
          <stop offset="1" stopColor={theme.floor[1]} />
        </linearGradient>
      </defs>

      <rect width="1280" height="800" fill={`url(#${skyId})`} />
      {theme.outdoor && (
        <g>
          {[[90, 90], [240, 40], [420, 130], [700, 60], [890, 120], [1120, 50], [1240, 160], [560, 30]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.2 : 1.4} fill="#fff" opacity={0.35 + (i % 3) * 0.2} />
          ))}
        </g>
      )}

      {PROPS[theme.variant](theme.glass)}

      <rect x="0" y="620" width="1280" height="180" fill={`url(#${floorId})`} />
      <ellipse cx="640" cy="624" rx="620" ry="26" fill="#ffffff08" />
    </svg>
  )
}
