import { useMemo } from 'react'
import { mulberry32 } from '../lib/rng'

interface StarFieldProps {
  /** Stable seed so the sky doesn't reshuffle between renders. */
  seed?: number
  count?: number
}

interface Star {
  x: number
  y: number
  r: number
  delay: number
  duration: number
  gold: boolean
}

/** Gently twinkling night sky, rendered once and animated in CSS. */
export function StarField({ seed = 11, count = 70 }: StarFieldProps) {
  const stars = useMemo<Star[]>(() => {
    const rng = mulberry32(seed)
    return Array.from({ length: count }, () => ({
      x: rng() * 100,
      y: rng() * 100,
      r: 0.1 + rng() * 0.25,
      delay: rng() * 6,
      duration: 2.5 + rng() * 4,
      gold: rng() < 0.18,
    }))
  }, [seed, count])

  return (
    <svg
      className="starfield"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {stars.map((star, i) => (
        <circle
          key={i}
          className="starfield-star"
          cx={star.x}
          cy={star.y}
          r={star.r}
          fill={star.gold ? 'var(--gold-400)' : '#ffffff'}
          style={{
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </svg>
  )
}
