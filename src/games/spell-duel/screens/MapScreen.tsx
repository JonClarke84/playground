import { useEffect, useState } from 'react'
import { HomeButton } from '../../../shell/HomeButton'
import { StarField } from '../../../shell/StarField'
import { sfx } from '../../../lib/audio'
import { useSpellDuelStore } from '../state/store'
import { BOSS_BIOS, MAP_LOCATIONS, type MapLocation } from '../progression'
import { EXAM_REWARDS, itemById } from '../avatar/unlocks'
import { BossPortrait } from '../art/bosses'
import { uiImageUrl } from '../../../lib/art'
import './menus.css'

/**
 * The academy-year map (PRODUCT.md §4.6): a winding path of locations, one
 * per table. Suggests an order; locks nothing.
 */

// Serpentine node positions (percentages of the map area), 4-4-3.
// Used when no painted map exists.
const NODE_POSITIONS: Array<{ x: number; y: number }> = [
  { x: 10, y: 78 }, { x: 33, y: 84 }, { x: 56, y: 78 }, { x: 79, y: 84 },
  { x: 90, y: 56 }, { x: 67, y: 48 }, { x: 44, y: 54 }, { x: 21, y: 48 },
  { x: 14, y: 20 }, { x: 42, y: 14 }, { x: 70, y: 20 },
]

// Plaque positions for the PORTRAIT painting (ui/map-portrait.webp),
// matched by eye. Order = MAP_LOCATIONS order.
const PORTRAIT_POSITIONS: Array<{ x: number; y: number }> = [
  { x: 16, y: 82 },  // 2  library
  { x: 49, y: 81 },  // 5  potions lab
  { x: 83, y: 86 },  // 10 treasury
  { x: 82, y: 62 },  // 3  herb garden
  { x: 84, y: 44 },  // 4  owlery
  { x: 16, y: 36 },  // 6  star tower
  { x: 50, y: 48 },  // 7  grand hall
  { x: 14, y: 60 },  // 8  broom yard
  { x: 21, y: 17 },  // 9  clock tower
  { x: 52, y: 29 },  // 11 music room
  { x: 79, y: 12 },  // 12 rooftops
]

function useIsPortrait(): boolean {
  const [portrait, setPortrait] = useState(
    () => typeof matchMedia !== 'undefined' && matchMedia('(orientation: portrait)').matches,
  )
  useEffect(() => {
    const query = matchMedia('(orientation: portrait)')
    const onChange = (e: MediaQueryListEvent) => setPortrait(e.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])
  return portrait
}

// Plaque positions matched by eye to the buildings in the PAINTED map
// (src/assets/art/ui/map.webp) — the stage is aspect-locked to the image,
// so these stay aligned at every viewport. Order = MAP_LOCATIONS order:
// tables 2, 5, 10, 3, 4, 6, 7, 8, 9, 11, 12.
const PAINTED_POSITIONS: Array<{ x: number; y: number }> = [
  { x: 15, y: 88 },  // 2  library (bottom-left book house)
  { x: 44, y: 90 },  // 5  potions lab (green-glow house)
  { x: 67, y: 88 },  // 10 treasury (gold chest)
  { x: 91, y: 78 },  // 3  herb garden (toadstool wall)
  { x: 76, y: 60 },  // 4  owlery (owl tower)
  { x: 62, y: 52 },  // 6  star tower (observatory)
  { x: 45, y: 58 },  // 7  great hall (centre)
  { x: 25, y: 62 },  // 8  broom yard (fence of brooms)
  { x: 14, y: 40 },  // 9  clock tower
  { x: 31, y: 30 },  // 11 music room (harp house)
  { x: 84, y: 26 },  // 12 rooftops (moonlit roofs)
]

function Stars({ count }: { count: number }) {
  return (
    <span className="map-stars" aria-label={`${count} of 3 stars`}>
      {[0, 1, 2].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className={`map-star${i < count ? ' map-star--lit' : ''}`}>
          <path d="M12 2 14.9 8.2 21.5 9 16.6 13.5 18 20.2 12 16.8 6 20.2 7.4 13.5 2.5 9 9.1 8.2 Z" fill="currentColor" />
        </svg>
      ))}
    </span>
  )
}

interface MapScreenProps {
  onExit: () => void
  onPlay: (table: number, exam: boolean) => void
}

export function MapScreen({ onExit, onPlay }: MapScreenProps) {
  const bestStars = useSpellDuelStore((s) => s.bestStars)
  const examsPassed = useSpellDuelStore((s) => s.examsPassed)
  const [selected, setSelected] = useState<MapLocation | null>(null)

  const isPortrait = useIsPortrait()
  const portraitMap = uiImageUrl('map-portrait')
  const useTall = isPortrait && portraitMap !== null
  const painted = useTall ? portraitMap : uiImageUrl('map')
  const positions = useTall
    ? PORTRAIT_POSITIONS
    : painted !== null
      ? PAINTED_POSITIONS
      : NODE_POSITIONS

  return (
    <div className="map">
      {painted === null && (
        <>
          <StarField seed={31} count={50} />
          <span className="map-mist map-mist--1" aria-hidden="true" />
          <span className="map-mist map-mist--2" aria-hidden="true" />
        </>
      )}
      <HomeButton onExit={onExit} />
      <h2 className="map-title">The Academy Year</h2>

      <div className="map-scroll">
      <div
        className={`map-stage${painted !== null ? (useTall ? ' map-stage--tall' : ' map-stage--painted') : ''}`}
      >
        {painted !== null && (
          <img className="map-raster" src={painted} alt="" draggable={false} />
        )}

        {painted === null && (
          <svg className="map-path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <polyline
              points={NODE_POSITIONS.map((p) => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke="rgba(255, 209, 102, 0.4)"
              strokeWidth="0.5"
              strokeDasharray="1.6 1.4"
              strokeLinecap="round"
            />
          </svg>
        )}

        {MAP_LOCATIONS.map((loc, i) => {
          const pos = positions[i]
          const stars = bestStars[String(loc.table)] ?? 0
          const passed = examsPassed.includes(loc.table)
          return (
            <button
              key={loc.table}
              className={`map-node${passed ? ' map-node--passed' : ''}${painted !== null ? ' map-node--plaque' : ''}`}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                animationDelay: `${i * 0.15}s`,
                ...(painted !== null ? { rotate: `${i % 2 === 0 ? -1.5 : 1.5}deg` } : {}),
                ...(passed ? {} : { borderColor: `${loc.theme.accent}66` }),
              }}
              onClick={() => {
                setSelected(loc)
                sfx.tap()
              }}
            >
              <span className="map-node-table">{loc.table}s</span>
              <span className="map-node-name">{loc.name}</span>
              <Stars count={stars} />
              {painted !== null && <span className="map-node-cta">tap to duel!</span>}
              {passed && <span className="map-node-badge">🏆</span>}
            </button>
          )
        })}
      </div>
      </div>

      {selected && (
        <div className="map-sheet" onClick={() => setSelected(null)}>
          <div className="map-sheet-panel" onClick={(e) => e.stopPropagation()}>
            <div className="map-sheet-boss">
              <BossPortrait table={selected.table} />
            </div>
            <h3>{selected.name}</h3>
            <p className="map-sheet-sub">
              The {selected.table}s · Examiner: <strong>{selected.boss.name}</strong>
              {(() => {
                const reward = itemById(EXAM_REWARDS[selected.table] ?? '')
                return reward && !examsPassed.includes(selected.table)
                  ? ` · Exam prize: ${reward.label}`
                  : ''
              })()}
            </p>
            {BOSS_BIOS[selected.table] && (
              <p className="map-sheet-bio">“{BOSS_BIOS[selected.table]}”</p>
            )}
            <Stars count={bestStars[String(selected.table)] ?? 0} />
            <div className="map-sheet-actions">
              <button className="button-secondary" onClick={() => onPlay(selected.table, false)}>
                Practise
              </button>
              <button className="button-primary" onClick={() => onPlay(selected.table, true)}>
                {examsPassed.includes(selected.table) ? 'Exam again!' : `Duel ${selected.boss.name}!`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
