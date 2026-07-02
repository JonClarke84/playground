import { useState } from 'react'
import { HomeScreen } from './shell/HomeScreen'
import { games } from './shell/registry'
import { AvatarGallery } from './dev/AvatarGallery'
import './shell/shell.css'

export function App() {
  const [activeGameId, setActiveGameId] = useState<string | null>(null)

  if (new URLSearchParams(window.location.search).get('dev') === 'avatar') {
    return <AvatarGallery />
  }

  const active = games.find((game) => game.id === activeGameId && !game.comingSoon)
  if (active) {
    return <active.Component onExit={() => setActiveGameId(null)} />
  }

  return <HomeScreen games={games} onLaunch={setActiveGameId} />
}
