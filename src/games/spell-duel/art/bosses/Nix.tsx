import type { RivalMood } from '../RivalWitch'

/**
 * Nix — Head Prefect of Mischief, Library table 2.
 * Secretly a bookworm who hides comics inside her spellbooks.
 * Canvas 260×220, side-saddle on a broom. See RivalWitch.tsx for shared anchors.
 */
export function NixBoss({ mood = 'smug' }: { mood?: RivalMood }) {
  return (
    <svg viewBox="0 0 260 220" role="img" aria-label="Nix the rival witch">
      {/* Broom */}
      <line x1="30" y1="168" x2="196" y2="150" stroke="#7a4a26" strokeWidth="8" strokeLinecap="round" />
      <line x1="34" y1="169" x2="190" y2="152" stroke="#5d3719" strokeWidth="2.4" strokeLinecap="round" opacity="0.5" />
      <path d="M 196 142 L 244 132 L 248 154 L 200 160 Z" fill="#f0b429" />
      <path d="M 200 160 L 248 154 L 247 158 L 199 164 Z" fill="#c98f1a" />
      <g stroke="#ffe08a" strokeWidth="2">
        <line x1="206" y1="146" x2="240" y2="139" />
        <line x1="208" y1="152" x2="242" y2="148" />
        <line x1="210" y1="158" x2="244" y2="154" />
      </g>
      <path d="M 194 140 l 10 0 l 0 22 l -10 0 Z" fill="#5b3a1e" transform="rotate(-6 199 151)" />

      {/* Inkblot the cat — sitting on the bristles, ink-dipped tail curling round */}
      <g>
        <path d="M 233 152 C 244 146 250 136 246 128 C 250 134 250 142 244 148" fill="none" stroke="#241832" strokeWidth="4.4" strokeLinecap="round" />
        <circle cx="245" cy="127" r="3.2" fill="#1a1122" />
        <ellipse cx="222" cy="140" rx="13" ry="10.5" fill="#241832" />
        <circle cx="220" cy="126" r="8.4" fill="#241832" />
        <path d="M 213 120 l -2.4 -7 6 3.4 Z M 227 120 l 2.4 -7 -6 3.4 Z" fill="#241832" />
        <path d="M 214 121 l -1 -3.6 3 1.8 Z M 226 121 l 1 -3.6 -3 1.8 Z" fill="#4a3560" />
        <circle cx="217" cy="126.5" r="1.7" fill="var(--gold-400)" />
        <circle cx="223" cy="126.5" r="1.7" fill="var(--gold-400)" />
        <ellipse cx="220" cy="130" rx="1.1" ry="0.9" fill="#ff9dd4" />
        <path d="M 214 131 h -4 M 214 133 h -4.6 M 226 131 h 4 M 226 133 h 4.6" stroke="#4a3560" strokeWidth="0.8" />
        <path d="M 210 146 q 5 4 12 3 M 230 146 q -5 4 -12 3" fill="none" stroke="#1a1122" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Legs sitting side-saddle */}
      <path d="M 96 158 C 100 176 112 184 124 184" stroke="#552c93" strokeWidth="12" strokeLinecap="round" fill="none" />
      <ellipse cx="130" cy="186" rx="11" ry="8" fill="#2f2247" />
      <ellipse cx="132" cy="183" rx="6" ry="3.4" fill="#241832" transform="rotate(-12 132 183)" />

      {/* Dress with prefect sash */}
      <path d="M 84 96 C 66 104 58 130 62 158 Q 92 172 118 160 L 108 106 Z" fill="#6a3bb5" />
      <path d="M 62 158 Q 92 172 118 160 L 114 146 Q 90 156 66 146 Z" fill="#552c93" />
      {/* Prefect sash, gold diagonal */}
      <path d="M 76 100 L 108 156 L 100 160 L 70 106 Z" fill="var(--gold-500)" />
      <path d="M 76 100 L 82 97 L 112 152 L 104 158 Z" fill="var(--gold-400)" opacity="0.55" />
      <circle cx="94" cy="152" r="4.5" fill="var(--gold-600)" />
      <circle cx="94" cy="152" r="2" fill="#452a6d" />
      {/* ink-stain freckles dotted along the sash hem */}
      <circle cx="86" cy="132" r="1.4" fill="#241832" opacity="0.5" />
      <circle cx="90" cy="140" r="1" fill="#241832" opacity="0.4" />
      <circle cx="82" cy="122" r="1.2" fill="#241832" opacity="0.45" />

      {/* Arm pointing forward, ink-stained fingertips */}
      <path d="M 100 112 C 118 108 134 110 146 118" stroke="#6a3bb5" strokeWidth="11" strokeLinecap="round" fill="none" />
      <circle cx="150" cy="120" r="7.5" fill="#e8b88a" />
      <path d="M 146 116 q 2 3 1 6 M 151 115 q 2 3 1 6.4 M 155 118 q 2 2.6 0.6 5.6" stroke="#3b2a4f" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.75" />

      {/* Floating comic book beside her, soft glow, hidden inside a bigger spellbook */}
      <g transform="rotate(-8 176 108)">
        <ellipse cx="176" cy="110" rx="24" ry="17" fill="var(--pink-glow)" opacity="0.35" />
        <circle cx="160" cy="94" r="1.6" fill="var(--gold-400)" opacity="0.8" />
        <circle cx="198" cy="126" r="1.3" fill="var(--gold-400)" opacity="0.7" />
        <circle cx="200" cy="98" r="1" fill="#fff8f0" opacity="0.7" />
        <path d="M 156 100 L 196 96 L 198 122 L 158 126 Z" fill="#452a6d" />
        <path d="M 156 100 L 196 96 L 197 102 L 157 106 Z" fill="#38205c" />
        <path d="M 160 104 L 194 100.5 L 195.5 120 L 161.5 123.5 Z" fill="#fff8f0" />
        <line x1="177.5" y1="101" x2="179" y2="122" stroke="#c9a1e8" strokeWidth="1.2" />
        {/* peeking comic underneath */}
        <path d="M 163 108 L 175 106.6 L 176 118 L 164 119.4 Z" fill="var(--pink-600)" />
        <circle cx="169.5" cy="112.6" r="3.4" fill="#ffe08a" />
        <path d="M 166.5 116 q 3 -1.6 6 0" stroke="#452a6d" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M 183 109 L 191.5 108 L 192 113 L 183.5 114 Z" fill="#c9a1e8" opacity="0.7" />
        <path d="M 183 116 L 191.5 115 L 192 118 L 183.5 119 Z" fill="#c9a1e8" opacity="0.5" />
        {/* tiny "POW"-style burst peeking from the comic corner */}
        <path d="M 165 109 l 1.6 -2.4 0.8 2.8 2 -1.6 -0.6 2.6 2.4 0.2 -2 1.4 1.6 2 -2.6 -0.8 -0.4 2.6 -1.4 -2.2 -2 1.4 0.8 -2.6 Z" fill="#ffe08a" opacity="0.9" />
      </g>

      {/* Head */}
      <circle cx="88" cy="72" r="34" fill="#e8b88a" />
      {/* Hair — hot-pink asymmetric swoop, longer on one side */}
      <path
        d="M 52 64 C 50 36 72 26 94 28 C 116 30 126 46 124 66
           C 114 52 104 48 96 48 Q 101 57 96 64 C 87 53 74 51 64 58 Q 57 60 52 64 Z"
        fill="#e14fa0"
      />
      <path d="M 52 64 C 46 90 50 110 62 122 C 68 106 65 86 62 70 Z" fill="#e14fa0" />
      <path d="M 62 70 C 64 86 67 104 62 118 C 58 108 56 92 56 76 Z" fill="#c93d8c" opacity="0.6" />
      <path d="M 124 66 C 122 54 116 46 108 42 Q 116 50 116 62 Z" fill="#c93d8c" opacity="0.5" />

      {/* White quill tucked behind ear */}
      <g transform="rotate(38 118 62)">
        <path d="M 118 40 C 124 46 124 60 118 70 C 114 60 114 48 118 40 Z" fill="#fff8f0" />
        <line x1="118" y1="42" x2="118" y2="69" stroke="#d8cfe6" strokeWidth="1" />
        <path d="M 118 69 l -1.6 8 3.2 0 Z" fill="#e8c69d" />
      </g>

      {/* Hat askew */}
      <g transform="rotate(-10 88 40)">
        <ellipse cx="88" cy="42" rx="40" ry="9" fill="#38205c" />
        <path d="M 62 40 C 70 20 80 6 100 -2 C 112 -6 122 -2 118 6 C 108 4 104 10 108 16 C 112 24 116 32 118 40 Q 88 50 62 40 Z" fill="#452a6d" />
        <path d="M 64 39 Q 88 49 116 39 L 112 30 Q 88 38 68 30 Z" fill="#ff7ac3" />
        {/* book emblem on hat band */}
        <g transform="translate(-14 2)">
          <rect x="115" y="27" width="14" height="11" rx="2" fill="#c9a1e8" />
          <line x1="118.5" y1="27" x2="118.5" y2="38" stroke="#8f63c9" strokeWidth="2" />
          <line x1="121.5" y1="29.5" x2="126.5" y2="29.5" stroke="#8f63c9" strokeWidth="0.8" />
          <line x1="121.5" y1="32" x2="126.5" y2="32" stroke="#8f63c9" strokeWidth="0.8" />
        </g>
      </g>

      {/* Face */}
      {mood === 'smug' ? (
        <g>
          <path d="M 70 65 q 7 -6 14 -1.6" stroke="#3b2a4f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 94 63 q 7 -5 13 0.4" stroke="#3b2a4f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
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
