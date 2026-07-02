import { useState } from 'react'
import { HomeScreen } from './shell/HomeScreen'
import { games } from './shell/registry'
import { AvatarGallery } from './dev/AvatarGallery'
import { SceneGallery } from './dev/SceneGallery'
import './shell/shell.css'

export function App() {
  const [activeGameId, setActiveGameId] = useState<string | null>(null)

  const dev = new URLSearchParams(window.location.search).get('dev')
  if (dev === 'avatar') {
    return <AvatarGallery />
  }
  if (dev === 'scenes') {
    return <SceneGallery />
  }

  const active = games.find((game) => game.id === activeGameId && !game.comingSoon)
  if (active) {
    return <active.Component onExit={() => setActiveGameId(null)} />
  }

  return <HomeScreen games={games} onLaunch={setActiveGameId} />
}
