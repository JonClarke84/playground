import { useEffect, useState } from 'react'
import type { GameProps } from '../../shell/types'
import { setSoundEnabled } from '../../lib/audio'
import { useSpellDuelStore } from './state/store'
import { TitleScreen } from './screens/TitleScreen'
import { AvatarCreator } from './screens/AvatarCreator'
import { DuelScreen } from './screens/DuelScreen'
import './spellDuel.css'

type Screen = 'title' | 'creator' | 'duel'

/** Spell Duel — screen flow: first run goes straight to the dressing room. */
export function SpellDuel({ onExit }: GameProps) {
  const hasAvatar = useSpellDuelStore((s) => s.avatar !== null)
  const soundOn = useSpellDuelStore((s) => s.soundOn)
  const [screen, setScreen] = useState<Screen>(hasAvatar ? 'title' : 'creator')
  // Captured once so the welcome copy doesn't flip mid-edit on first run.
  const [wasFirstRun] = useState(!hasAvatar)
  const [duelNumber, setDuelNumber] = useState(0)

  useEffect(() => {
    setSoundEnabled(soundOn)
  }, [soundOn])

  if (screen === 'creator') {
    return <AvatarCreator firstRun={wasFirstRun} onDone={() => setScreen('title')} />
  }

  if (screen === 'duel') {
    return (
      <DuelScreen
        key={duelNumber}
        onExit={onExit}
        onDone={() => setScreen('title')}
        onPlayAgain={() => setDuelNumber((n) => n + 1)}
      />
    )
  }

  return (
    <TitleScreen
      onExit={onExit}
      onPlay={() => {
        setDuelNumber((n) => n + 1)
        setScreen('duel')
      }}
      onDressingRoom={() => setScreen('creator')}
    />
  )
}
