import type { RivalMood } from '../RivalWitch'

/**
 * Tilda — Clock Tower, table 9. The clockmaker's apprentice who has never
 * once been late; winds every clock in the academy at dawn.
 * Shares the RivalWitch rig anchors: broom (30,168)-(196,150), bristles
 * x196-248 y132-160, seated legs ~(96-130, 158-186), torso x58-120 y96-172,
 * head circle (88,72) r34, hat zone above y50. Canvas 260×220.
 */
export function TildaBoss({ mood = 'smug' }: { mood?: RivalMood }) {
  return (
    <svg viewBox="0 0 260 220" role="img" aria-label="Tilda the clockmaker's apprentice">
      {/* Broom stick */}
      <line x1="30" y1="168" x2="196" y2="150" stroke="#7a4a26" strokeWidth="8" strokeLinecap="round" />
      <path d="M 196 142 L 244 132 L 248 154 L 200 160 Z" fill="var(--gold-600)" />
      <g stroke="var(--gold-400)" strokeWidth="2">
        <line x1="206" y1="146" x2="240" y2="139" />
        <line x1="208" y1="152" x2="242" y2="148" />
      </g>
      <path d="M 194 140 l 10 0 l 0 22 l -10 0 Z" fill="#5b3a1e" transform="rotate(-6 199 151)" />

      {/* Tiny mechanical mouse with a gear on its back, sitting on the bristles */}
      <g transform="translate(216 136)">
        <ellipse cx="0" cy="6" rx="9" ry="5.5" fill="#8a93a8" />
        <circle cx="7" cy="3" r="4.4" fill="#8a93a8" />
        <path d="M 4 -1 l -1.4 -4 3.4 2.4 Z M 9.6 -1 l 1.4 -4 -3.4 2.4 Z" fill="#8a93a8" />
        <circle cx="5.4" cy="2.4" r="0.9" fill="#f0b429" />
        <path d="M -9 5 C -14 3 -16 -1 -14 -4" stroke="#8a93a8" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        {/* gear on its back */}
        <g fill="#c9a1e8" transform="translate(-2 4)">
          {[0, 60, 120].map((deg) => (
            <rect key={deg} x="-1.4" y="-5" width="2.8" height="5.4" rx="1" transform={`rotate(${deg})`} />
          ))}
          <circle r="3" fill="#c9a1e8" />
          <circle r="1.2" fill="#2f2247" />
        </g>
        <circle cx="-6" cy="7.4" r="1.6" fill="#5a6178" />
        <circle cx="1" cy="8.6" r="1.6" fill="#5a6178" />
        <circle cx="7" cy="7.4" r="1.6" fill="#5a6178" />
      </g>

      {/* Legs sitting side-saddle */}
      <path d="M 96 158 C 100 176 112 184 124 184" stroke="#252b3a" strokeWidth="12" strokeLinecap="round" fill="none" />
      <ellipse cx="130" cy="186" rx="11" ry="8" fill="#141824" />

      {/* Charcoal waistcoat / dress */}
      <path d="M 84 96 C 66 104 58 130 62 158 Q 92 172 118 160 L 108 106 Z" fill="#333a4a" />
      <path d="M 62 158 Q 92 172 118 160 L 114 146 Q 90 156 66 146 Z" fill="#252b3a" />
      {/* Waistcoat buttons */}
      <g fill="var(--gold-500)">
        <circle cx="90" cy="118" r="1.8" />
        <circle cx="92" cy="130" r="1.8" />
        <circle cx="94" cy="142" r="1.8" />
      </g>

      {/* Gold pocket-watch chain looping to a small watch */}
      <path d="M 78 122 Q 92 138 106 124" stroke="var(--gold-500)" strokeWidth="2" fill="none" />
      <circle cx="106" cy="124" r="7" fill="var(--gold-500)" stroke="#a8741a" strokeWidth="1.4" />
      <circle cx="106" cy="124" r="3.6" fill="none" stroke="#a8741a" strokeWidth="1" />
      <line x1="106" y1="124" x2="106" y2="121.4" stroke="#a8741a" strokeWidth="0.9" />
      <line x1="106" y1="124" x2="108" y2="125.4" stroke="#a8741a" strokeWidth="0.9" />

      {/* Arm pointing forward */}
      <path d="M 100 112 C 118 108 134 110 146 118" stroke="#333a4a" strokeWidth="11" strokeLinecap="round" fill="none" />
      <circle cx="150" cy="120" r="7.5" fill="#e8b88a" />

      {/* Head */}
      <circle cx="88" cy="72" r="34" fill="#e8b88a" />

      {/* Neat crimson bob */}
      <path
        d="M 54 66 C 54 40 74 30 92 32 C 112 34 122 48 122 66
           C 112 54 104 50 96 50 Q 100 58 96 64 C 88 54 76 52 66 58 Q 60 60 54 66 Z"
        fill="#e14f4f"
      />
      <path d="M 54 66 C 51 78 52 88 56 96 C 60 88 60 78 60 70 Z" fill="#e14f4f" />
      <path d="M 122 66 C 125 78 124 88 120 96 C 116 88 116 78 116 70 Z" fill="#e14f4f" />
      <path d="M 56 60 C 60 56 66 54 72 54" stroke="#c73f3f" strokeWidth="1.6" fill="none" opacity="0.6" />

      {/* Two tiny brass-gear hairpins */}
      <g fill="var(--gold-600)">
        <g transform="translate(66 44)">
          {[0, 45, 90, 135].map((deg) => (
            <rect key={deg} x="-1.6" y="-4.4" width="3.2" height="8.8" rx="1" transform={`rotate(${deg})`} />
          ))}
          <circle r="3" fill="var(--gold-600)" />
          <circle r="1.2" fill="#152743" />
        </g>
        <g transform="translate(108 46)">
          {[0, 45, 90, 135].map((deg) => (
            <rect key={deg} x="-1.4" y="-3.8" width="2.8" height="7.6" rx="1" transform={`rotate(${deg})`} />
          ))}
          <circle r="2.6" fill="var(--gold-600)" />
          <circle r="1" fill="#152743" />
        </g>
      </g>

      {/* Hat askew, with a large brass wind-up key sticking out of the back */}
      <g transform="rotate(-10 88 40)">
        <ellipse cx="88" cy="42" rx="40" ry="9" fill="#141824" />
        <path d="M 62 40 C 70 20 80 6 100 -2 C 112 -6 122 -2 118 6 C 108 4 104 10 108 16 C 112 24 116 32 118 40 Q 88 50 62 40 Z" fill="#1c2130" />
        <path d="M 64 39 Q 88 49 116 39 L 112 30 Q 88 38 68 30 Z" fill="#f0b429" />
        {/* wind-up key out the back of the hat */}
        <g transform="translate(108 8) rotate(18)">
          <rect x="-2" y="0" width="4" height="16" rx="1.5" fill="#c9922c" />
          <rect x="-6" y="14" width="12" height="4" rx="1.2" fill="var(--gold-500)" />
          <rect x="-6" y="19" width="12" height="4" rx="1.2" fill="var(--gold-500)" />
          <circle cx="0" cy="0" r="3.4" fill="var(--gold-500)" stroke="#a8741a" strokeWidth="1" />
        </g>
      </g>

      {/* Face — monocle over one eye (smug) / popped off dangling (shocked) */}
      {mood === 'smug' ? (
        <g>
          <path d="M 70 66 q 7 -5 14 -1" stroke="#3b2a4f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 94 64 q 7 -4 13 0" stroke="#3b2a4f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <ellipse cx="78" cy="74" rx="4.5" ry="6" fill="#3b2a4f" />
          <ellipse cx="100" cy="73" rx="4.5" ry="6" fill="#3b2a4f" />
          <path d="M 78 90 Q 88 96 98 88" stroke="#8a4a5e" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* monocle over the right eye */}
          <circle cx="100" cy="73" r="9.5" fill="none" stroke="var(--gold-500)" strokeWidth="2" />
          <path d="M 108 80 Q 114 90 112 100" stroke="var(--gold-500)" strokeWidth="1.6" fill="none" />
        </g>
      ) : (
        <g>
          <circle cx="78" cy="72" r="6" fill="#3b2a4f" />
          <circle cx="100" cy="71" r="6" fill="#3b2a4f" />
          <ellipse cx="89" cy="90" rx="6" ry="8" fill="#5b2e46" />
          {/* monocle popped off, dangling on its cord */}
          <path d="M 108 78 Q 122 92 120 110" stroke="var(--gold-500)" strokeWidth="1.6" fill="none" />
          <circle cx="120" cy="114" r="8" fill="none" stroke="var(--gold-500)" strokeWidth="2" />
        </g>
      )}
      <ellipse cx="66" cy="84" rx="6" ry="4" fill="#f0919e" opacity="0.5" />
      <ellipse cx="108" cy="83" rx="6" ry="4" fill="#f0919e" opacity="0.5" />
    </svg>
  )
}
