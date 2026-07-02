import { useCallback, useEffect, useRef } from 'react'

/**
 * Lightweight canvas particle layer for spell effects (PRODUCT.md §8.2).
 * Renders above the scene, ignores pointer events.
 */

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  colour: string
  gravity: number
  twinkle: boolean
}

export interface BurstOptions {
  count?: number
  colours?: string[]
  speed?: number
  gravity?: number
  size?: number
  twinkle?: boolean
}

export interface ParticleHandle {
  /** Emit a burst at (x, y) in element-relative pixel coordinates. */
  burst: (x: number, y: number, opts?: BurstOptions) => void
}

const DEFAULT_COLOURS = ['#2fd48a', '#7dedbb', '#ffd166', '#fff8f0']

export function useParticleCanvas(): {
  canvasRef: (el: HTMLCanvasElement | null) => void
  handle: ParticleHandle
} {
  const canvasEl = useRef<HTMLCanvasElement | null>(null)
  const particles = useRef<Particle[]>([])
  const rafId = useRef<number>(0)
  const running = useRef(false)
  const reducedMotion = useRef(
    typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const tick = useCallback(() => {
    const canvas = canvasEl.current
    if (!canvas) {
      running.current = false
      return
    }
    const context = canvas.getContext('2d')
    if (!context) {
      running.current = false
      return
    }

    context.clearRect(0, 0, canvas.width, canvas.height)
    const alive: Particle[] = []
    for (const p of particles.current) {
      p.life += 1
      if (p.life < p.maxLife) {
        p.x += p.vx
        p.y += p.vy
        p.vy += p.gravity
        p.vx *= 0.985
        p.vy *= 0.985
        const fade = 1 - p.life / p.maxLife
        const flicker = p.twinkle ? 0.7 + 0.3 * Math.sin(p.life * 0.8) : 1
        context.globalAlpha = fade * flicker
        context.fillStyle = p.colour
        context.beginPath()
        context.arc(p.x, p.y, p.size * (0.5 + fade * 0.5), 0, Math.PI * 2)
        context.fill()
        alive.push(p)
      }
    }
    context.globalAlpha = 1
    particles.current = alive

    if (alive.length > 0) {
      rafId.current = requestAnimationFrame(tick)
    } else {
      running.current = false
    }
  }, [])

  const burst = useCallback(
    (x: number, y: number, opts: BurstOptions = {}) => {
      const canvas = canvasEl.current
      if (!canvas) return
      const count = reducedMotion.current ? Math.min(6, opts.count ?? 24) : (opts.count ?? 24)
      const colours = opts.colours ?? DEFAULT_COLOURS
      const speed = opts.speed ?? 5
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const velocity = speed * (0.35 + Math.random() * 0.65)
        particles.current.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          life: 0,
          maxLife: 40 + Math.random() * 30,
          size: (opts.size ?? 4) * (0.6 + Math.random() * 0.8),
          colour: colours[Math.floor(Math.random() * colours.length)],
          gravity: opts.gravity ?? 0.06,
          twinkle: opts.twinkle ?? true,
        })
      }
      if (!running.current) {
        running.current = true
        rafId.current = requestAnimationFrame(tick)
      }
    },
    [tick],
  )

  const canvasRef = useCallback((el: HTMLCanvasElement | null) => {
    canvasEl.current = el
    if (el) {
      const parent = el.parentElement
      if (parent) {
        el.width = parent.clientWidth
        el.height = parent.clientHeight
      }
    }
  }, [])

  useEffect(() => {
    const onResize = () => {
      const el = canvasEl.current
      const parent = el?.parentElement
      if (el && parent) {
        el.width = parent.clientWidth
        el.height = parent.clientHeight
      }
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return { canvasRef, handle: { burst } }
}
