interface AnswerBubblesProps {
  options: number[]
  popped: number[]
  /** Locks input during cast animations. */
  disabled: boolean
  onAnswer: (value: number) => void
}

/** Four big floating answer bubbles (PRODUCT.md §4.3). Popped ones burst out but keep their slot. */
export function AnswerBubbles({ options, popped, disabled, onAnswer }: AnswerBubblesProps) {
  return (
    <div className="answer-bubbles">
      {options.map((value, i) => {
        const isPopped = popped.includes(value)
        return (
          <button
            key={`${value}-${i}`}
            className={`answer-bubble${isPopped ? ' answer-bubble--popped' : ''}`}
            style={{ animationDelay: `${i * 90}ms` }}
            disabled={disabled || isPopped}
            onClick={() => onAnswer(value)}
          >
            <span className="answer-bubble-value">{value}</span>
          </button>
        )
      })}
    </div>
  )
}
