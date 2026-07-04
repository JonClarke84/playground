import { useRef, useState } from 'react'
import type { GameDefinition } from './types'
import { StarField } from './StarField'
import { ParentCorner } from './ParentCorner'

interface HomeScreenProps {
  games: GameDefinition[]
  onLaunch: (gameId: string) => void
}

const PARENT_HOLD_MS = 3000

export function HomeScreen({ games, onLaunch }: HomeScreenProps) {
  const [parentOpen, setParentOpen] = useState(false)
  const holdTimer = useRef<number | null>(null)

  // Deliberately child-unfriendly: hold for three full seconds (PRODUCT.md §3.3).
  const startHold = () => {
    holdTimer.current = window.setTimeout(() => setParentOpen(true), PARENT_HOLD_MS)
  }
  const cancelHold = () => {
    if (holdTimer.current !== null) {
      window.clearTimeout(holdTimer.current)
      holdTimer.current = null
    }
  }

  return (
    <div className="home">
      <StarField />
      <header className="home-header">
        <h1 className="home-title">Playground</h1>
      </header>
      <div className="home-cards">
        {games.map((game, i) => (
          <button
            key={game.id}
            className={`game-card${game.comingSoon ? ' game-card--locked' : ''}`}
            style={{ animationDelay: `${i * 0.08}s` }}
            onClick={game.comingSoon ? undefined : () => onLaunch(game.id)}
            disabled={game.comingSoon}
            aria-label={game.comingSoon ? `${game.title} — coming soon` : `Play ${game.title}`}
          >
            <div className="game-card-scene">
              <game.CardArt />
            </div>
            {game.comingSoon && <span className="game-card-ribbon">Coming soon</span>}
            <div className="game-card-label">
              <span className="game-card-title">{game.title}</span>
              <span className="game-card-tagline">{game.tagline}</span>
            </div>
          </button>
        ))}
      </div>

      <button
        className="parent-corner-entry"
        aria-label="Parents' corner (press and hold)"
        onPointerDown={startHold}
        onPointerUp={cancelHold}
        onPointerLeave={cancelHold}
        onContextMenu={(e) => e.preventDefault()}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            d="M12 2 8 9H3.5a.9.9 0 0 0-.6 1.6l3.7 3-1.4 5.6a.9.9 0 0 0 1.4 1L12 17l5.4 3.2a.9.9 0 0 0 1.4-1L17.4 13.6l3.7-3A.9.9 0 0 0 20.5 9H16Z"
            fill="currentColor"
            opacity="0.55"
          />
        </svg>
      </button>

      {parentOpen && <ParentCorner onClose={() => setParentOpen(false)} />}
    </div>
  )
}
