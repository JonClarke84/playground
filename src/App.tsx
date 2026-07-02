import { Fragment, useEffect } from 'react'
import { HashRouter, Navigate, Route, Routes, useNavigate } from 'react-router'
import { HomeScreen } from './shell/HomeScreen'
import { games } from './shell/registry'
import { stopMusic } from './lib/music'
import { AvatarGallery } from './dev/AvatarGallery'
import { SceneGallery } from './dev/SceneGallery'
import './shell/shell.css'

function ShellHome() {
  const navigate = useNavigate()

  // Whatever was playing, the main menu is quiet.
  useEffect(() => {
    stopMusic()
  }, [])

  return (
    <HomeScreen
      games={games}
      onLaunch={(gameId) => {
        const game = games.find((g) => g.id === gameId)
        if (game?.path !== undefined) navigate(game.path)
      }}
    />
  )
}

export function App() {
  const dev = new URLSearchParams(window.location.search).get('dev')
  if (dev === 'avatar') {
    return <AvatarGallery />
  }
  if (dev === 'scenes') {
    return <SceneGallery />
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<ShellHome />} />
        {games.map((game) =>
          game.routes ? <Fragment key={game.id}>{game.routes()}</Fragment> : null,
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
