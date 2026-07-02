import { useEffect, useState } from 'react'
import type { GameProps } from '../../shell/types'
import { setSoundEnabled } from '../../lib/audio'
import { useSpellDuelStore } from './state/store'
import { TitleScreen } from './screens/TitleScreen'
import { AvatarCreator } from './screens/AvatarCreator'
import { DuelScreen } from './screens/DuelScreen'
import { MapScreen } from './screens/MapScreen'
import { SpellbookScreen } from './screens/SpellbookScreen'
import './spellDuel.css'

type Screen = 'title' | 'creator' | 'duel' | 'map' | 'spellbook'

/** Spell Duel — screen flow: first run goes straight to the dressing room. */
export function SpellDuel({ onExit }: GameProps) {
  const hasAvatar = useSpellDuelStore((s) => s.avatar !== null)
  const soundOn = useSpellDuelStore((s) => s.soundOn)
  const [screen, setScreen] = useState<Screen>(hasAvatar ? 'title' : 'creator')
  // Captured once so the welcome copy doesn't flip mid-edit on first run.
  const [wasFirstRun] = useState(!hasAvatar)
  const [duelNumber, setDuelNumber] = useState(0)
  /** Set when a duel is launched from the map; cleared for free play. */
  const [focus, setFocus] = useState<{ table: number; exam: boolean } | undefined>(undefined)
  /** Where the current duel should return to when it ends. */
  const [duelOrigin, setDuelOrigin] = useState<Screen>('title')

  useEffect(() => {
    setSoundEnabled(soundOn)
  }, [soundOn])

  const startDuel = (from: Screen, duelFocus?: { table: number; exam: boolean }) => {
    setFocus(duelFocus)
    setDuelOrigin(from)
    setDuelNumber((n) => n + 1)
    setScreen('duel')
  }

  if (screen === 'creator') {
    return <AvatarCreator firstRun={wasFirstRun} onDone={() => setScreen('title')} />
  }

  if (screen === 'map') {
    return (
      <MapScreen
        onExit={() => setScreen('title')}
        onPlay={(table, exam) => startDuel('map', { table, exam })}
      />
    )
  }

  if (screen === 'spellbook') {
    return <SpellbookScreen onExit={() => setScreen('title')} />
  }

  if (screen === 'duel') {
    return (
      <DuelScreen
        key={duelNumber}
        focus={focus}
        onExit={onExit}
        onDone={() => setScreen(duelOrigin)}
        onPlayAgain={() => setDuelNumber((n) => n + 1)}
      />
    )
  }

  return (
    <TitleScreen
      onExit={onExit}
      onPlay={() => startDuel('title')}
      onDressingRoom={() => setScreen('creator')}
      onMap={() => setScreen('map')}
      onSpellbook={() => setScreen('spellbook')}
    />
  )
}
