import { useEffect, useRef, useState } from 'react'
import { HomeButton } from '../../../shell/HomeButton'
import { mulberry32, randomSeed } from '../../../lib/rng'
import { sfx } from '../../../lib/audio'
import { DEFAULT_ROUNDS, advance, answer, createDuel, useHint as applyHint } from '../logic/duel'
import type { DuelState, FinaleTier } from '../logic/types'
import { useSpellDuelStore } from '../state/store'
import { DuelBackdrop } from '../art/DuelBackdrop'
import { Pip, type PipMood } from '../art/Pip'
import { RivalWitch, type RivalMood } from '../art/RivalWitch'
import { WitchAvatar } from '../avatar/WitchAvatar'
import { DEFAULT_AVATAR } from '../avatar/avatarTypes'
import { SpellCrystal } from '../components/SpellCrystal'
import { AnswerBubbles } from '../components/AnswerBubbles'
import { MagicMeter } from '../components/MagicMeter'
import { useParticleCanvas } from '../components/ParticleCanvas'

interface DuelScreenProps {
  onExit: () => void
  onDone: () => void
  onPlayAgain: () => void
}

const ENCHANTMENTS = [
  'Frogs are raining in the library!',
  'The teacher is floating away!',
  'All the shoes are dancing!',
  'The books are flying south!',
  'Someone turned the soup to slime!',
  'The paintings are giggling!',
  'Every quill is writing nonsense!',
  'The staircase is going backwards!',
  'The pumpkins are juggling themselves!',
  'The chandeliers are doing spins!',
]

const PIP_HINT_LINES = [
  'Ooh, sneaky — two little spells beat one big one!',
  'Crack it into spells you know!',
  'Little spells first, then add them up!',
]

const FINALE_COPY: Record<FinaleTier, { title: string; line: string }> = {
  good: { title: 'Lovely casting!', line: 'The enchantments are undone!' },
  great: { title: 'Spelltacular!', line: 'Nix can’t believe her eyes!' },
  grand: { title: 'Grand Sorceress!', line: 'The whole academy is cheering!' },
}

export function DuelScreen({ onExit, onDone, onPlayAgain }: DuelScreenProps) {
  const avatar = useSpellDuelStore((s) => s.avatar) ?? DEFAULT_AVATAR
  const completeDuel = useSpellDuelStore((s) => s.completeDuel)

  const [duel, setDuel] = useState<DuelState>(() => {
    const store = useSpellDuelStore.getState()
    return createDuel(
      {
        tables: store.tables,
        rounds: DEFAULT_ROUNDS,
        allowSubtraction: store.allowSubtraction(),
        startAt: store.askCounter,
        rng: mulberry32(randomSeed()),
      },
      store.stats,
    )
  })
  const [phase, setPhase] = useState<'question' | 'casting' | 'finale'>('question')
  const [revealed, setRevealed] = useState({ left: false, right: false })
  const [pipMood, setPipMood] = useState<PipMood>('idle')
  const [pipLine, setPipLine] = useState<string | null>(null)
  const [rivalMood, setRivalMood] = useState<RivalMood>('smug')
  const { canvasRef, handle } = useParticleCanvas()
  const stageRef = useRef<HTMLDivElement | null>(null)
  const timers = useRef<number[]>([])

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach((t) => window.clearTimeout(t))
  }, [])

  const later = (ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms))
  }

  const burstAt = (fx: number, fy: number, opts?: Parameters<typeof handle.burst>[2]) => {
    const stage = stageRef.current
    if (!stage) return
    handle.burst(stage.clientWidth * fx, stage.clientHeight * fy, opts)
  }

  const roundNumber = Math.min(duel.history.length + 1, duel.config.rounds)
  const blurb = ENCHANTMENTS[(duel.config.startAt + duel.roundIndex) % ENCHANTMENTS.length]
  const lastRecord = duel.history[duel.history.length - 1]

  function handleAnswer(value: number) {
    if (phase !== 'question') return
    const next = answer(duel, value)
    if (next === duel) return
    setDuel(next)

    if (next.lastEvent?.type === 'cast') {
      sfx.cast()
      setRivalMood('shocked')
      setPipMood('cheer')
      setPipLine(null)
      setPhase('casting')
      burstAt(0.5, 0.4, { count: next.lastEvent.quality === 'brilliant' ? 46 : 26 })
      burstAt(0.78, 0.28, { count: 18, colours: ['#ff7ac3', '#ffd166', '#fff8f0'], speed: 4 })

      later(1500, () => {
        const settled = advance(next)
        setDuel(settled)
        setRevealed({ left: false, right: false })
        setRivalMood('smug')
        setPipMood('idle')
        if (settled.finished && settled.lastEvent?.type === 'finished') {
          completeDuel(settled)
          setPhase('finale')
          const tierIndex = settled.lastEvent.tier === 'grand' ? 2 : settled.lastEvent.tier === 'great' ? 1 : 0
          sfx.finale(tierIndex)
        } else {
          setPhase('question')
        }
      })
    } else if (next.lastEvent?.type === 'fizzle') {
      sfx.fizzle()
      setPipMood('oops')
      later(1100, () => setPipMood('idle'))
    }
  }

  function handleHint() {
    if (phase !== 'question' || duel.current === null) return
    const next = applyHint(duel)
    if (next === duel) return
    sfx.hint()
    setDuel(next)
    if (next.current?.hintStage === 1) {
      setPipLine(PIP_HINT_LINES[duel.roundIndex % PIP_HINT_LINES.length])
      later(3600, () => setPipLine(null))
    }
  }

  function handleReveal(part: 'left' | 'right') {
    sfx.tap()
    setRevealed((r) => ({ ...r, [part]: true }))
  }

  // Finale fireworks
  useEffect(() => {
    if (phase !== 'finale') return
    const interval = window.setInterval(() => {
      burstAt(0.15 + Math.random() * 0.7, 0.15 + Math.random() * 0.45, {
        count: 30,
        speed: 6,
        colours: ['#2fd48a', '#ff7ac3', '#ffd166', '#b78bff', '#fff8f0'],
      })
    }, 550)
    const stop = window.setTimeout(() => window.clearInterval(interval), 6500)
    return () => {
      window.clearInterval(interval)
      window.clearTimeout(stop)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  const finaleTierValue: FinaleTier =
    duel.lastEvent?.type === 'finished' ? duel.lastEvent.tier : 'good'
  const finale = FINALE_COPY[finaleTierValue]
  const dustEarned =
    duel.meterHalves + duel.history.filter((r) => r.quality === 'brilliant').length

  return (
    <div className="duel" ref={stageRef}>
      <DuelBackdrop />
      <HomeButton onExit={onExit} />

      <div className="duel-top">
        <MagicMeter halves={duel.meterHalves} rounds={duel.config.rounds} />
        <span className="duel-round-label">
          Round {roundNumber} of {duel.config.rounds}
        </span>
      </div>

      <div className="duel-rival">
        {phase === 'question' && <div className="speech speech--rival">{blurb}</div>}
        <div className={`duel-rival-art${rivalMood === 'shocked' ? ' duel-rival-art--hit' : ''}`}>
          <RivalWitch mood={rivalMood} />
        </div>
      </div>

      <div className="duel-centre">
        {phase === 'casting' && lastRecord ? (
          <div className="cast-flash">
            <span className="cast-flash-equation">
              {lastRecord.fact.a} × {lastRecord.fact.b} = {lastRecord.fact.a * lastRecord.fact.b}
            </span>
          </div>
        ) : phase !== 'finale' && duel.current ? (
          <SpellCrystal
            question={duel.current.question}
            hintStage={duel.current.hintStage}
            split={duel.current.split}
            revealed={revealed}
            onRevealPart={handleReveal}
          />
        ) : null}
      </div>

      {phase === 'question' && duel.current && duel.current.hintStage < 2 && (
        <button className="hint-wand" onClick={handleHint} aria-label="Use the Hint Wand">
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <line x1="12" y1="36" x2="30" y2="18" stroke="#8b5a2b" strokeWidth="5" strokeLinecap="round" />
            <path
              d="M 34 8 L 36.4 14.6 L 43 17 L 36.4 19.4 L 34 26 L 31.6 19.4 L 25 17 L 31.6 14.6 Z"
              fill="var(--gold-400)"
            />
          </svg>
          <span>Hint</span>
        </button>
      )}

      <div className="duel-pip">
        {pipLine && <div className="speech speech--pip">{pipLine}</div>}
        <div className="duel-pip-art">
          <Pip mood={pipMood} />
        </div>
      </div>

      {phase !== 'finale' && duel.current && (
        <AnswerBubbles
          options={duel.current.question.options}
          popped={duel.current.popped}
          disabled={phase !== 'question'}
          onAnswer={handleAnswer}
        />
      )}

      <canvas className="particle-canvas" ref={canvasRef} />

      {phase === 'finale' && (
        <div className="finale">
          <div className="finale-avatar">
            <WitchAvatar config={avatar} expression="grin" />
          </div>
          <h2 className="finale-title">{finale.title}</h2>
          <p className="finale-line">{finale.line}</p>
          <p className="finale-dust">
            <span className="finale-dust-icon">✦</span> +{dustEarned} sparkle dust
          </p>
          <div className="finale-actions">
            <button className="button-primary" onClick={onPlayAgain}>
              Duel again!
            </button>
            <button className="button-secondary" onClick={onDone}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
