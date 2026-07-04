import { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import { Navigate, Outlet, Route, useLocation, useNavigate, useParams } from 'react-router'
import { setSoundEnabled } from '../../lib/audio'
import { CALM_TRACK, startMusic, stopMusic } from '../../lib/music'
import { useSpellDuelStore } from './state/store'
import { TitleScreen } from './screens/TitleScreen'
import { AvatarCreator } from './screens/AvatarCreator'
import { DuelScreen } from './screens/DuelScreen'
import { MapScreen } from './screens/MapScreen'
import { SpellbookScreen } from './screens/SpellbookScreen'
import { CharactersScreen } from './screens/CharactersScreen'
import './spellDuel.css'

/**
 * Spell Duel's route subtree. Browser back walks naturally back through
 * duel → map/title → home; the HomeButton remains the visible way up.
 */
export function spellDuelRoutes(): ReactElement {
  return (
    <Route path="/spell-duel" element={<SpellDuelLayout />}>
      <Route index element={<TitleRoute />} />
      <Route path="dressing-room" element={<CreatorRoute />} />
      <Route path="map" element={<MapRoute />} />
      <Route path="spellbook" element={<SpellbookRoute />} />
      <Route path="characters" element={<CharactersRoute />} />
      <Route path="duel" element={<DuelRoute exam={false} />} />
      <Route path="duel/:table" element={<DuelRoute exam={false} />} />
      <Route path="duel/:table/exam" element={<DuelRoute exam />} />
    </Route>
  )
}

function SpellDuelLayout() {
  const hasAvatar = useSpellDuelStore((s) => s.avatar !== null)
  const soundOn = useSpellDuelStore((s) => s.soundOn)
  const { pathname } = useLocation()
  const inDuel = pathname.includes('/duel')
  const inCreator = pathname.endsWith('/dressing-room')

  useEffect(() => {
    setSoundEnabled(soundOn)
    if (!soundOn) {
      stopMusic()
    } else if (!inDuel) {
      // The duel screen picks its own per-location theme.
      void startMusic(CALM_TRACK)
    }
  }, [soundOn, inDuel])

  // Leaving the game entirely goes quiet.
  useEffect(() => () => stopMusic(), [])

  // First run: she makes her witch before anything else.
  if (!hasAvatar && !inCreator) {
    return <Navigate to="/spell-duel/dressing-room" replace />
  }

  return <Outlet />
}

function TitleRoute() {
  const navigate = useNavigate()
  return (
    <TitleScreen
      onExit={() => navigate('/')}
      onPlay={() => navigate('duel')}
      onDressingRoom={() => navigate('dressing-room')}
      onMap={() => navigate('map')}
      onSpellbook={() => navigate('spellbook')}
      onCharacters={() => navigate('characters')}
    />
  )
}

function CreatorRoute() {
  const navigate = useNavigate()
  // Captured once so the welcome copy doesn't flip mid-edit on first run.
  const [firstRun] = useState(() => useSpellDuelStore.getState().avatar === null)
  return <AvatarCreator firstRun={firstRun} onDone={() => navigate('/spell-duel', { replace: firstRun })} />
}

function MapRoute() {
  const navigate = useNavigate()
  return (
    <MapScreen
      onExit={() => navigate('/spell-duel')}
      onPlay={(table, exam) =>
        navigate(exam ? `/spell-duel/duel/${table}/exam` : `/spell-duel/duel/${table}`)
      }
    />
  )
}

function SpellbookRoute() {
  const navigate = useNavigate()
  return <SpellbookScreen onExit={() => navigate('/spell-duel')} />
}

function CharactersRoute() {
  const navigate = useNavigate()
  return <CharactersScreen onExit={() => navigate('/spell-duel')} />
}

function DuelRoute({ exam }: { exam: boolean }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { table } = useParams()
  const tableNumber = table === undefined ? null : Number(table)
  const focus =
    tableNumber !== null && Number.isInteger(tableNumber) && tableNumber >= 2 && tableNumber <= 12
      ? { table: tableNumber, exam }
      : undefined
  return (
    <DuelScreen
      // location.key changes on every navigation, so "Duel again!" remounts.
      key={location.key}
      focus={focus}
      onExit={() => navigate('/spell-duel')}
      onDone={() => navigate(-1)}
      onPlayAgain={() => navigate(location.pathname, { replace: true })}
    />
  )
}
