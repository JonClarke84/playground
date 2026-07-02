import type { Fact, HintStage, Question, Split } from '../logic/types'

/**
 * The spell crystal: shows the multiplication, and — when the Hint Wand is
 * used — cracks into two smaller crystals she can reveal one at a time
 * (PRODUCT.md §4.4).
 */

interface SpellCrystalProps {
  question: Question
  hintStage: HintStage
  split: Split | null
  /** Which split parts have been tapped open. */
  revealed: { left: boolean; right: boolean }
  onRevealPart: (part: 'left' | 'right') => void
}

function CrystalShape({ w, h }: { w: number; h: number }) {
  const cx = w / 2
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="crystal-shape" aria-hidden="true">
      <defs>
        <linearGradient id={`cg-${w}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0f9d63" />
          <stop offset="0.5" stopColor="#17b273" />
          <stop offset="1" stopColor="#2fd48a" />
        </linearGradient>
      </defs>
      <polygon
        points={`${cx},${h * 0.03} ${w * 0.94},${h * 0.28} ${w * 0.86},${h * 0.82} ${cx},${h * 0.97} ${w * 0.14},${h * 0.82} ${w * 0.06},${h * 0.28}`}
        fill={`url(#cg-${w})`}
      />
      <polygon
        points={`${cx},${h * 0.03} ${w * 0.94},${h * 0.28} ${cx},${h * 0.34}`}
        fill="#7dedbb"
        opacity="0.85"
      />
      <polygon
        points={`${cx},${h * 0.03} ${w * 0.06},${h * 0.28} ${cx},${h * 0.34}`}
        fill="#26c580"
        opacity="0.9"
      />
      <polygon
        points={`${w * 0.14},${h * 0.82} ${w * 0.06},${h * 0.28} ${w * 0.2},${h * 0.4}`}
        fill="#0f9d63"
        opacity="0.8"
      />
      <line x1={cx} y1={h * 0.05} x2={cx} y2={h * 0.95} stroke="#bdf7dc" strokeOpacity="0.4" strokeWidth="2" />
    </svg>
  )
}

/** A rows × b columns of glowing dots — the array model made visible. */
export function ArrayDots({ fact, highlight }: { fact: Fact; highlight?: number }) {
  const rows = Math.min(fact.a, 12)
  const cols = Math.min(fact.b, 12)
  const gap = 18
  const pad = 10
  const w = cols * gap + pad * 2
  const h = rows * gap + pad * 2
  const dots = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push(
        <circle
          key={`${r}-${c}`}
          cx={pad + c * gap + gap / 2}
          cy={pad + r * gap + gap / 2}
          r={5.5}
          fill={highlight !== undefined && r < highlight ? 'var(--gold-400)' : 'var(--emerald-500)'}
          className="array-dot"
          style={{ animationDelay: `${(r * cols + c) * 12}ms` }}
        />,
      )
    }
  }
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: w, height: h }} aria-hidden="true">
      {dots}
    </svg>
  )
}

function factLabel(f: Fact): string {
  return `${f.a} × ${f.b}`
}

export function SpellCrystal({ question, hintStage, split, revealed, onRevealPart }: SpellCrystalProps) {
  if (hintStage === 0 || split === null) {
    return (
      <div className="crystal crystal--whole">
        <CrystalShape w={280} h={230} />
        <span className="crystal-text">{question.a} × {question.b}</span>
      </div>
    )
  }

  if (split.kind === 'double') {
    const halfValue = split.half.a * split.half.b
    return (
      <div className="crystal-split">
        <button
          className={`crystal crystal--part${revealed.left ? ' crystal--revealed' : ''}`}
          onClick={() => onRevealPart('left')}
        >
          <CrystalShape w={190} h={160} />
          <span className="crystal-text crystal-text--small">{factLabel(split.half)}</span>
          {revealed.left && <span className="crystal-reveal">{halfValue}</span>}
        </button>
        <span className="crystal-op">× 2</span>
        <span className="crystal-doubled-hint">doubled!</span>
        {hintStage === 2 && (
          <div className="crystal-array">
            <ArrayDots fact={{ a: question.a, b: question.b }} />
          </div>
        )}
      </div>
    )
  }

  const leftValue = split.left.a * split.left.b
  const rightValue = split.right.a * split.right.b
  return (
    <div className="crystal-split">
      <button
        className={`crystal crystal--part${revealed.left ? ' crystal--revealed' : ''}`}
        onClick={() => onRevealPart('left')}
      >
        <CrystalShape w={190} h={160} />
        <span className="crystal-text crystal-text--small">{factLabel(split.left)}</span>
        {revealed.left && <span className="crystal-reveal">{leftValue}</span>}
      </button>
      <span className="crystal-op">{split.kind === 'add' ? '+' : '−'}</span>
      <button
        className={`crystal crystal--part${revealed.right ? ' crystal--revealed' : ''}`}
        onClick={() => onRevealPart('right')}
      >
        <CrystalShape w={190} h={160} />
        <span className="crystal-text crystal-text--small">{factLabel(split.right)}</span>
        {revealed.right && <span className="crystal-reveal">{rightValue}</span>}
      </button>
      {hintStage === 2 && (
        <div className="crystal-array">
          <ArrayDots fact={{ a: question.a, b: question.b }} />
        </div>
      )}
    </div>
  )
}
