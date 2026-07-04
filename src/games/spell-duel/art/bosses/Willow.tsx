import type { RivalMood } from '../RivalWitch'

/**
 * Willow — the night-post mistress, Owlery table 4.
 * Delivers enchanted letters til dawn, permanently sleepy.
 * Canvas 260×220, side-saddle on a broom. See RivalWitch.tsx for shared anchors.
 */
export function WillowBoss({ mood = 'smug' }: { mood?: RivalMood }) {
  return (
    <svg viewBox="0 0 260 220" role="img" aria-label="Willow the rival witch">
      {/* Broom */}
      <line x1="30" y1="168" x2="196" y2="150" stroke="#7a4a26" strokeWidth="8" strokeLinecap="round" />
      <path d="M 196 142 L 244 132 L 248 154 L 200 160 Z" fill="#4a2b12" />
      <path d="M 200 160 L 248 154 L 247 158 L 199 164 Z" fill="#38200c" />
      <g stroke="#e8c69d" strokeWidth="2">
        <line x1="206" y1="146" x2="240" y2="139" />
        <line x1="208" y1="152" x2="242" y2="148" />
        <line x1="210" y1="158" x2="244" y2="154" />
      </g>
      <path d="M 194 140 l 10 0 l 0 22 l -10 0 Z" fill="#5b3a1e" transform="rotate(-6 199 151)" />

      {/* Hoots the owl, asleep on the bristles */}
      <g>
        <ellipse cx="222" cy="140" rx="12" ry="13.5" fill="#a8793f" />
        <ellipse cx="222" cy="145" rx="7.5" ry="8" fill="#d9b380" />
        <path d="M 213 128 l -2.4 -7 6.4 3.6 Z M 231 128 l 2.4 -7 -6.4 3.6 Z" fill="#a8793f" />
        {/* closed sleepy eyes */}
        <path d="M 216.5 136 q 2.5 2 5 0" stroke="#5d3719" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M 224.5 136 q 2.5 2 5 0" stroke="#5d3719" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M 222 139 l -2.6 3.6 h 5.2 Z" fill="var(--gold-600)" />
        {/* wing tucked, tail */}
        <path d="M 212 140 Q 206 148 212 156 Q 216 148 216 140 Z" fill="#8a642f" />
        <path d="M 232 140 Q 238 148 232 156 Q 228 148 228 140 Z" fill="#8a642f" />
        <path d="M 222 152 l -3 10 h 6 Z" fill="#8a642f" />
        {/* little zzz above its head */}
        <g fill="#e8c69d" opacity="0.85" fontFamily="var(--font-display, sans-serif)">
          <text x="234" y="120" fontSize="9">z</text>
          <text x="240" y="112" fontSize="7">z</text>
        </g>
      </g>

      {/* Envelope mid-air behind her, tiny wings */}
      <g transform="translate(150 82) rotate(-10)">
        <ellipse cx="0" cy="0" rx="16" ry="12" fill="var(--gold-glow, rgba(255,209,102,0.4))" opacity="0.3" />
        <rect x="-14" y="-9" width="28" height="18" rx="2" fill="#fff8f0" />
        <path d="M -14 -9 L 0 3 L 14 -9" fill="none" stroke="#c9a1e8" strokeWidth="1.4" />
        <rect x="-14" y="-9" width="28" height="18" rx="2" fill="none" stroke="#e8c69d" strokeWidth="1" />
        {/* tiny wings on the envelope */}
        <path d="M -14 -2 C -22 -6 -24 2 -16 4 Z" fill="#e8c69d" opacity="0.9" />
        <path d="M 14 -2 C 22 -6 24 2 16 4 Z" fill="#e8c69d" opacity="0.9" />
      </g>

      {/* Legs sitting side-saddle */}
      <path d="M 96 158 C 100 176 112 184 124 184" stroke="#5d3719" strokeWidth="12" strokeLinecap="round" fill="none" />
      <ellipse cx="130" cy="186" rx="11" ry="8" fill="#38200c" />

      {/* Dress/cloak — brown, feather collar */}
      <path d="M 84 96 C 66 104 58 130 62 158 Q 92 172 118 160 L 108 106 Z" fill="#7a4a26" />
      <path d="M 62 158 Q 92 172 118 160 L 114 146 Q 90 156 66 146 Z" fill="#5d3719" />

      {/* Leather satchel, bulging with letters, slung across the front */}
      <path d="M 68 118 Q 90 128 106 122" stroke="#5d3719" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M 78 130 Q 96 142 112 134 L 108 156 Q 92 164 76 152 Z" fill="#8a5a2e" />
      <path d="M 78 130 Q 96 142 112 134 L 110 140 Q 94 148 80 138 Z" fill="#6b4620" />
      {/* letters poking out the top */}
      <rect x="86" y="122" width="10" height="13" rx="1" fill="#fff8f0" transform="rotate(-8 91 128)" />
      <rect x="96" y="120" width="9" height="12" rx="1" fill="#f0e4d0" transform="rotate(10 100 126)" />
      <circle cx="94" cy="145" r="4" fill="var(--gold-600)" />

      {/* Arm pointing forward */}
      <path d="M 100 112 C 118 108 134 110 146 118" stroke="#7a4a26" strokeWidth="11" strokeLinecap="round" fill="none" />
      <circle cx="150" cy="120" r="7.5" fill="#e8b88a" />

      {/* Feather collar around neck/shoulders */}
      <g fill="#e8c69d">
        <ellipse cx="64" cy="98" rx="7" ry="12" transform="rotate(-24 64 98)" />
        <ellipse cx="76" cy="92" rx="7" ry="13" transform="rotate(-8 76 92)" />
        <ellipse cx="90" cy="90" rx="7" ry="13" transform="rotate(4 90 90)" />
        <ellipse cx="104" cy="93" rx="7" ry="12" transform="rotate(16 104 93)" />
        <ellipse cx="114" cy="99" rx="6.5" ry="11" transform="rotate(28 114 99)" />
      </g>
      <g fill="#b57b3f" opacity="0.6">
        <line x1="64" y1="90" x2="64" y2="106" transform="rotate(-24 64 98)" strokeWidth="1" stroke="#b57b3f" />
        <line x1="90" y1="79" x2="90" y2="101" strokeWidth="1" stroke="#b57b3f" />
      </g>

      {/* Head */}
      <circle cx="88" cy="72" r="34" fill="#e8b88a" />
      {/* Hair — amber, loose messy bun, feather stuck in it */}
      <path
        d="M 54 66 C 54 40 74 30 92 32 C 112 34 122 48 122 66
           C 112 54 104 50 96 50 Q 100 58 96 64 C 88 54 76 52 66 58 Q 60 60 54 66 Z"
        fill="#b57b3f"
      />
      <path d="M 54 66 C 50 82 52 94 58 102 C 64 94 64 80 62 68 Z" fill="#b57b3f" />
      {/* messy bun at back */}
      <circle cx="52" cy="56" r="13" fill="#a06a34" />
      <circle cx="46" cy="50" r="6" fill="#a06a34" />
      <circle cx="58" cy="48" r="5.4" fill="#95602e" opacity="0.7" />
      <path d="M 42 60 q -4 4 -2 9 M 48 64 q -3 5 0 9" stroke="#8a5a2e" strokeWidth="1.6" strokeLinecap="round" fill="none" />

      {/* Feather stuck in the bun */}
      <g transform="rotate(-18 48 48)">
        <path d="M 48 22 C 54 30 54 48 48 58 C 42 48 42 30 48 22 Z" fill="#e8c69d" />
        <line x1="48" y1="25" x2="48" y2="56" stroke="#b57b3f" strokeWidth="1" />
        <path d="M 48 25 q 4 6 0 12 M 48 33 q 4 6 0 12 M 48 41 q 4 6 0 12" stroke="#c9976e" strokeWidth="0.8" fill="none" opacity="0.6" />
      </g>

      {/* Hat askew */}
      <g transform="rotate(-10 88 40)">
        <ellipse cx="88" cy="42" rx="40" ry="9" fill="#38200c" />
        <path d="M 62 40 C 70 20 80 6 100 -2 C 112 -6 122 -2 118 6 C 108 4 104 10 108 16 C 112 24 116 32 118 40 Q 88 50 62 40 Z" fill="#4a2b12" />
        <path d="M 64 39 Q 88 49 116 39 L 112 30 Q 88 38 68 30 Z" fill="#e8c69d" />
        {/* feather emblem on hat band */}
        <g transform="translate(-14 2) rotate(24 122 33)">
          <ellipse cx="122" cy="33" rx="4.5" ry="9" fill="#e8c69d" />
          <line x1="122" y1="24" x2="122" y2="42" stroke="#b57b3f" strokeWidth="1.6" />
        </g>
      </g>

      {/* Face — drowsy half-lidded eyes always; mood shifts mouth + brow */}
      {mood === 'smug' ? (
        <g>
          {/* sleepy contented smile */}
          <path d="M 71 68 q 6 3.4 13 1.4" stroke="#5d3719" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <path d="M 95 67 q 6 3 12 1.6" stroke="#5d3719" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <path d="M 72 75 q 6 -3.4 12 0" stroke="#3b2a4f" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 94 74 q 6 -3.2 11 0.2" stroke="#3b2a4f" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 78 90 Q 88 94 96 89" stroke="#8a4a5e" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      ) : (
        <g>
          {/* suddenly wide awake */}
          <path d="M 71 63 q 6 -4 13 -1" stroke="#5d3719" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <path d="M 95 61 q 6 -4 12 -0.4" stroke="#5d3719" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <circle cx="78" cy="73" r="7" fill="#fff8f0" />
          <circle cx="100" cy="72" r="7" fill="#fff8f0" />
          <circle cx="78" cy="73" r="4.4" fill="#3b2a4f" />
          <circle cx="100" cy="72" r="4.4" fill="#3b2a4f" />
          <ellipse cx="89" cy="90" rx="4" ry="5" fill="#5b2e46" />
        </g>
      )}
      <ellipse cx="66" cy="84" rx="6" ry="4" fill="#f0919e" opacity="0.5" />
      <ellipse cx="108" cy="83" rx="6" ry="4" fill="#f0919e" opacity="0.5" />
    </svg>
  )
}
