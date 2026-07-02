interface MagicMeterProps {
  halves: number
  rounds: number
}

/** The duel's magic meter — fills with each cast, powers the finale (PRODUCT.md §4.3). */
export function MagicMeter({ halves, rounds }: MagicMeterProps) {
  const max = rounds * 2
  const fraction = Math.min(1, halves / max)
  return (
    <div className="magic-meter" role="img" aria-label={`Magic meter ${Math.round(fraction * 100)}% full`}>
      <svg viewBox="0 0 28 28" className="magic-meter-star" aria-hidden="true">
        <path
          d="M14 1 L17.4 9.6 L26.5 10.4 L19.6 16.4 L21.7 25.3 L14 20.5 L6.3 25.3 L8.4 16.4 L1.5 10.4 L10.6 9.6 Z"
          fill="var(--gold-500)"
        />
      </svg>
      <div className="magic-meter-track">
        <div className="magic-meter-fill" style={{ width: `${fraction * 100}%` }} />
        {Array.from({ length: rounds - 1 }, (_, i) => (
          <span
            key={i}
            className="magic-meter-notch"
            style={{ left: `${((i + 1) / rounds) * 100}%` }}
          />
        ))}
      </div>
    </div>
  )
}
