import { useEffect, useMemo, useRef, useState } from 'react'
import { HomeButton } from '../../../shell/HomeButton'
import { mulberry32, randomSeed } from '../../../lib/rng'
import { sfx } from '../../../lib/audio'
import { duelTrack, startMusic, stopMusic } from '../../../lib/music'
import { DEFAULT_ROUNDS, advance, answer, createDuel, useHint as applyHint } from '../logic/duel'
import type { DuelState, FinaleTier } from '../logic/types'
import { useSpellDuelStore } from '../state/store'
import { DEFAULT_BLURBS, EXAM_ROUNDS, locationForTable } from '../progression'
import { EXAM_REWARDS, itemById } from '../avatar/unlocks'
import { DuelBackdrop } from '../art/DuelBackdrop'
import { Pip, type PipMood } from '../art/Pip'
import { RivalWitch, type RivalMood } from '../art/RivalWitch'
import { BossPortrait } from '../art/bosses'
import { loadPortrait } from '../../../lib/portrait'
import { fgImageUrl, sceneImageUrl } from '../../../lib/art'
import { WitchAvatar } from '../avatar/WitchAvatar'
import { DEFAULT_AVATAR, type Expression } from '../avatar/avatarTypes'
import { SpellCrystal } from '../components/SpellCrystal'
import { AnswerBubbles } from '../components/AnswerBubbles'
import { MagicMeter } from '../components/MagicMeter'
import { useParticleCanvas } from '../components/ParticleCanvas'

interface DuelScreenProps {
  onExit: () => void
  onDone: () => void
  onPlayAgain: () => void
  /** Set when launched from the academy map: single-table duel, optionally the rival exam. */
  focus?: { table: number; exam: boolean }
}

const PIP_HINT_LINES = [
  'Ooh, sneaky — two little spells beat one big one!',
  'Crack it into spells you know!',
  'Little spells first, then add them up!',
]

const PIP_WAND_INTRO = 'See that glowing wand? Tap it to crack a big spell into little ones — real witch maths!'
const PIP_WAND_NUDGE = 'Tricky one! Try the Hint Wand ✨'

/** Hype lines Pip shouts at brilliant-cast streak milestones. */
const PIP_STREAK_LINES: Record<number, string> = {
  3: 'On fire!',
  5: 'Unstoppable!',
  8: 'LEGENDARY!',
}

const FINALE_COPY: Record<FinaleTier, { title: string; line: string }> = {
  good: { title: 'Lovely casting!', line: 'The enchantments are undone!' },
  great: { title: 'Spelltacular!', line: 'Nix can’t believe her eyes!' },
  grand: { title: 'Grand Sorceress!', line: 'The whole academy is cheering!' },
}

interface BeamState {
  left: number
  top: number
  length: number
  angle: number
  thin: boolean
}

/** Ambient magic motes drifting up through the hall. */
function DuelMotes() {
  const motes = useMemo(() => {
    const rng = mulberry32(77)
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      left: 3 + rng() * 94,
      size: 3 + rng() * 5,
      duration: 9 + rng() * 14,
      delay: rng() * -20,
      gold: rng() < 0.35,
    }))
  }, [])
  return (
    <div className="duel-motes" aria-hidden="true">
      {motes.map((m) => (
        <span
          key={m.id}
          className="duel-mote"
          style={{
            left: `${m.left}%`,
            width: m.size,
            height: m.size,
            background: m.gold ? 'var(--gold-400)' : 'var(--emerald-500)',
            animationDuration: `${m.duration}s`,
            animationDelay: `${m.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export function DuelScreen({ onExit, onDone, onPlayAgain, focus }: DuelScreenProps) {
  const avatar = useSpellDuelStore((s) => s.avatar) ?? DEFAULT_AVATAR
  const soundOn = useSpellDuelStore((s) => s.soundOn)
  const completeDuel = useSpellDuelStore((s) => s.completeDuel)

  const isExam = focus?.exam === true
  const location = focus ? locationForTable(focus.table) : null
  // JRPG staging pilot: grounded spots + parallax layers, only when the
  // scene declares staging AND its painted backdrop exists.
  const staging = location?.theme.staging
  const staged = staging !== undefined && location !== null && sceneImageUrl(location.theme.variant) !== null
  const stagedFg = staged && location !== null ? fgImageUrl(location.theme.variant) : null
  const examReward = isExam && focus ? itemById(EXAM_REWARDS[focus.table] ?? '') : undefined
  // Captured at mount so the finale knows whether the reward is NEW.
  const [rewardIsNew] = useState(
    () => examReward !== undefined && !useSpellDuelStore.getState().unlockedItems.includes(examReward.id),
  )

  const [duel, setDuel] = useState<DuelState>(() => {
    const store = useSpellDuelStore.getState()
    return createDuel(
      {
        tables: focus ? [focus.table] : store.tables,
        rounds: isExam ? EXAM_ROUNDS : DEFAULT_ROUNDS,
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
  const [heroMood, setHeroMood] = useState<Expression>('smile')
  const [heroCasting, setHeroCasting] = useState(false)
  const [wandNudge, setWandNudge] = useState(false)
  const [beam, setBeam] = useState<BeamState | null>(null)
  const [impactKey, setImpactKey] = useState(0)
  const [streak, setStreak] = useState(0)
  const [heroPortrait] = useState<string | null>(() => loadPortrait())
  const [comboPulse, setComboPulse] = useState(0)
  const { canvasRef, handle } = useParticleCanvas()
  const stageRef = useRef<HTMLDivElement | null>(null)
  const heroRef = useRef<HTMLDivElement | null>(null)
  const rivalRef = useRef<HTMLDivElement | null>(null)
  const timers = useRef<number[]>([])

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach((t) => window.clearTimeout(t))
  }, [])

  // Each room has its own key; exams run a touch faster. The finale goes
  // quiet so the fanfare gets the moment to itself.
  useEffect(() => {
    if (!soundOn) return
    if (phase === 'finale') {
      stopMusic()
      return
    }
    void startMusic(duelTrack(focus?.table ?? null, isExam))
  }, [soundOn, phase, focus, isExam])

  // Pip introduces the Hint Wand once, at the start of her very first duel —
  // the wand is the whole pedagogical point, so it must not go undiscovered.
  useEffect(() => {
    if (useSpellDuelStore.getState().wandIntroduced) return
    const timer = window.setTimeout(() => {
      setPipLine(PIP_WAND_INTRO)
      setWandNudge(true)
      useSpellDuelStore.getState().markWandIntroduced()
      timers.current.push(
        window.setTimeout(() => {
          setPipLine(null)
          setWandNudge(false)
        }, 5200),
      )
    }, 1200)
    timers.current.push(timer)
  }, [])

  const later = (ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms))
  }

  const burstAt = (fx: number, fy: number, opts?: Parameters<typeof handle.burst>[2]) => {
    const stage = stageRef.current
    if (!stage) return
    handle.burst(stage.clientWidth * fx, stage.clientHeight * fy, opts)
  }

  const burstAtPx = (x: number, y: number, opts?: Parameters<typeof handle.burst>[2]) => {
    handle.burst(x, y, opts)
  }

  /** Fires the spell beam from her wand to Nix; returns the impact point. */
  const fireBeam = (thin: boolean): { x: number; y: number } | null => {
    const stage = stageRef.current
    const hero = heroRef.current
    const rival = rivalRef.current
    if (!stage || !hero || !rival) return null
    const stageBox = stage.getBoundingClientRect()
    const heroBox = hero.getBoundingClientRect()
    const rivalBox = rival.getBoundingClientRect()
    const start = {
      x: heroBox.left - stageBox.left + heroBox.width * 0.82,
      y: heroBox.top - stageBox.top + heroBox.height * 0.4,
    }
    const end = {
      x: rivalBox.left - stageBox.left + rivalBox.width * 0.35,
      y: rivalBox.top - stageBox.top + rivalBox.height * 0.6,
    }
    const dx = end.x - start.x
    const dy = end.y - start.y
    setBeam({
      left: start.x,
      top: start.y,
      length: Math.hypot(dx, dy),
      angle: (Math.atan2(dy, dx) * 180) / Math.PI,
      thin,
    })
    later(700, () => setBeam(null))
    burstAtPx(start.x, start.y, { count: thin ? 14 : 22, speed: 4 })
    return end
  }

  const roundNumber = Math.min(duel.history.length + 1, duel.config.rounds)
  const blurbPool = location?.blurbs ?? DEFAULT_BLURBS
  const blurb = blurbPool[(duel.config.startAt + duel.roundIndex) % blurbPool.length]
  const lastRecord = duel.history[duel.history.length - 1]

  function handleAnswer(value: number) {
    if (phase !== 'question') return
    const next = answer(duel, value)
    if (next === duel) return
    setDuel(next)

    if (next.lastEvent?.type === 'cast') {
      const brilliant = next.lastEvent.quality === 'brilliant'
      const nextStreak = brilliant ? streak + 1 : 0
      setStreak(nextStreak)
      const comboMultiplier = nextStreak >= 3 ? 1.5 : 1
      if (nextStreak >= 2) setComboPulse((k) => k + 1)
      const hype = PIP_STREAK_LINES[nextStreak]
      sfx.cast()
      setPipMood('cheer')
      setPipLine(hype ?? null)
      if (hype) later(2200, () => setPipLine(null))
      setPhase('casting')
      setHeroMood('grin')
      setHeroCasting(true)
      later(650, () => setHeroCasting(false))

      // 1. Crystal flares…
      burstAt(0.5, 0.4, { count: Math.round((brilliant ? 46 : 26) * comboMultiplier) })
      // 2. …the beam fires from her wand…
      const impact = fireBeam(!brilliant)
      // 3. …and lands on Nix: burst, shock, shake, flash.
      later(320, () => {
        setRivalMood('shocked')
        setImpactKey((k) => k + 1)
        if (impact) {
          burstAtPx(impact.x, impact.y, {
            count: Math.round((brilliant ? 56 : 32) * comboMultiplier),
            speed: 7,
            colours: ['#2fd48a', '#7dedbb', '#ffd166', '#ff7ac3', '#fff8f0'],
          })
          burstAtPx(impact.x, impact.y, { count: Math.round(16 * comboMultiplier), speed: 3, gravity: 0.12 })
        }
      })

      later(1700, () => {
        const settled = advance(next)
        setDuel(settled)
        setRevealed({ left: false, right: false })
        setRivalMood('smug')
        setPipMood('idle')
        setHeroMood('smile')
        if (settled.finished && settled.lastEvent?.type === 'finished') {
          completeDuel(settled, isExam && focus ? focus.table : undefined)
          setPhase('finale')
          const tierIndex = settled.lastEvent.tier === 'grand' ? 2 : settled.lastEvent.tier === 'great' ? 1 : 0
          sfx.finale(tierIndex)
        } else {
          setPhase('question')
        }
      })
    } else if (next.lastEvent?.type === 'fizzle') {
      sfx.fizzle()
      setStreak(0)
      setPipMood('oops')
      setHeroMood('wow')
      // Two misses on the same spell and the wand hasn't been tried: nudge.
      if (next.current !== null && next.current.popped.length >= 2 && next.current.hintStage === 0) {
        setPipLine(PIP_WAND_NUDGE)
        setWandNudge(true)
        later(4000, () => {
          setPipLine(null)
          setWandNudge(false)
        })
      }
      // Droopy comic sparks slumping off the crystal.
      burstAt(0.5, 0.42, {
        count: 20,
        speed: 2.2,
        gravity: 0.22,
        colours: ['#b78bff', '#8a7bc5', '#6f6390'],
        twinkle: false,
      })
      later(1100, () => {
        setPipMood('idle')
        setHeroMood('smile')
      })
    }
  }

  function handleHint() {
    if (phase !== 'question' || duel.current === null) return
    const next = applyHint(duel)
    if (next === duel) return
    sfx.hint()
    setDuel(next)
    setStreak(0)
    setHeroMood('thinking')
    setWandNudge(false)
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
  const practiseFacts = useMemo(
    () =>
      duel.history
        .filter((r) => r.usedHint || r.quality === 'scrappy')
        .slice(0, 3)
        .map((r) => `${r.fact.a}×${r.fact.b}`),
    [duel.history],
  )

  return (
    <div className={`duel${impactKey > 0 && phase === 'casting' ? ' duel--shake' : ''}${staged ? ' duel--staged' : ''}`} ref={stageRef}>
      <DuelBackdrop theme={location?.theme} />
      <DuelMotes />
      <HomeButton onExit={onExit} />

      <div className="duel-top">
        <div className="duel-top-meter-row">
          <MagicMeter halves={duel.meterHalves} rounds={duel.config.rounds} />
          {streak >= 2 && (
            <span key={comboPulse} className="combo-badge">
              ✨ x{streak}!
            </span>
          )}
        </div>
        <span className="duel-round-label">
          {isExam && location ? `${location.name} exam — ` : location ? `${location.name} — ` : ''}
          Round {roundNumber} of {duel.config.rounds}
        </span>
      </div>

      {staged && staging !== undefined && (
        <>
          <span
            className="duel-shadow"
            style={{
              left: `${staging.heroShadow.left}%`,
              bottom: `${staging.heroShadow.bottom}%`,
              width: `${staging.heroShadow.width}%`,
            }}
            aria-hidden="true"
          />
          <span
            className="duel-shadow duel-shadow--boss"
            style={{
              left: `${staging.bossShadow.left}%`,
              bottom: `${staging.bossShadow.bottom}%`,
              width: `${staging.bossShadow.width}%`,
            }}
            aria-hidden="true"
          />
        </>
      )}

      <div
        className="duel-rival"
        style={
          staged && staging !== undefined
            ? {
                top: 'auto',
                right: 'auto',
                left: `${staging.boss.left}%`,
                bottom: `${staging.boss.bottom}%`,
                width: `${staging.boss.width}%`,
              }
            : undefined
        }
      >
        {phase === 'question' && <div className="speech speech--rival">{blurb}</div>}
        <div
          ref={rivalRef}
          className={`duel-rival-art${rivalMood === 'shocked' ? ' duel-rival-art--hit' : ''}${
            phase === 'finale' ? ' duel-rival-art--defeated' : ''
          }`}
        >
          {location ? (
            <BossPortrait table={location.table} mood={rivalMood} />
          ) : (
            <RivalWitch mood={rivalMood} />
          )}
        </div>
        {location && <span className="duel-rival-name">{location.boss.name}</span>}
      </div>

      <div
        className={`duel-hero${heroCasting ? ' duel-hero--cast' : ''}`}
        ref={heroRef}
        style={
          staged && staging !== undefined
            ? {
                left: `${staging.hero.left}%`,
                bottom: `${staging.hero.bottom}%`,
                width: `${staging.hero.width}%`,
              }
            : undefined
        }
      >
        {heroPortrait !== null ? (
          <img className="duel-hero-raster" src={heroPortrait} alt="Your witch" draggable={false} />
        ) : (
          <WitchAvatar config={avatar} expression={heroMood} />
        )}
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
        <button
          className={`hint-wand${wandNudge ? ' hint-wand--nudge' : ''}`}
          onClick={handleHint}
          aria-label="Use the Hint Wand"
        >
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

      {beam && (
        <div
          className={`spell-beam${beam.thin ? ' spell-beam--thin' : ''}`}
          style={{
            left: beam.left,
            top: beam.top,
            width: beam.length,
            transform: `rotate(${beam.angle}deg)`,
          }}
        >
          <div className="spell-beam-core" />
        </div>
      )}
      {phase === 'casting' && impactKey > 0 && <div key={impactKey} className="duel-flash" />}

      {stagedFg !== null && <img className="duel-fg" src={stagedFg} alt="" draggable={false} />}

      <canvas className="particle-canvas" ref={canvasRef} />

      {phase === 'finale' && (
        <div className="finale">
          <div className="finale-rays" aria-hidden="true" />
          <div className="finale-avatar">
            <WitchAvatar config={avatar} expression="grin" />
          </div>
          <h2 className="finale-title">{finale.title}</h2>
          <p className="finale-line">{finale.line}</p>
          <p className="finale-dust">
            <span className="finale-dust-icon">✦</span> +{dustEarned + (isExam ? 10 : 0)} sparkle dust
          </p>
          {practiseFacts.length > 0 && (
            <p className="finale-practise">Spells to practise: {practiseFacts.join(' · ')}</p>
          )}
          {isExam && examReward && rewardIsNew && (
            <p className="finale-reward">
              🎁 New costume piece: <strong>{examReward.label}</strong>
            </p>
          )}
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
