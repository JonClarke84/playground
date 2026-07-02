interface SparkleProps {
  x: number
  y: number
  size: number
  fill?: string
  opacity?: number
  rotate?: number
  /** Twinkle animation delay in seconds; omit for a static sparkle. */
  twinkleDelay?: number
}

/**
 * Four-point concave star — the house sparkle used across all scenes.
 * Path is a unit shape scaled via transform so callers think in pixels.
 */
export function Sparkle({
  x,
  y,
  size,
  fill = 'var(--gold-400)',
  opacity = 1,
  rotate = 0,
  twinkleDelay,
}: SparkleProps) {
  return (
    <path
      className={twinkleDelay === undefined ? undefined : 'sparkle-twinkle'}
      d="M0 -1 Q 0.12 -0.12 1 0 Q 0.12 0.12 0 1 Q -0.12 0.12 -1 0 Q -0.12 -0.12 0 -1 Z"
      fill={fill}
      opacity={opacity}
      transform={`translate(${x} ${y}) rotate(${rotate}) scale(${size})`}
      style={twinkleDelay === undefined ? undefined : { animationDelay: `${twinkleDelay}s` }}
    />
  )
}
