import { useState } from 'react'
import { HomeButton } from '../../../shell/HomeButton'
import { StarField } from '../../../shell/StarField'
import { sfx } from '../../../lib/audio'
import { useSpellDuelStore } from '../state/store'
import { BOSS_BIOS, MAP_LOCATIONS, type MapLocation } from '../progression'
import { EXAM_REWARDS, itemById } from '../avatar/unlocks'
import { BossPortrait } from '../art/bosses'
import './menus.css'

/**
 * The academy-year map (PRODUCT.md §4.6): a winding path of locations, one
 * per table. Suggests an order; locks nothing.
 */

// Serpentine node positions (percentages of the map area), 4-4-3.
const NODE_POSITIONS: Array<{ x: number; y: number }> = [
  { x: 10, y: 78 }, { x: 33, y: 84 }, { x: 56, y: 78 }, { x: 79, y: 84 },
  { x: 90, y: 56 }, { x: 67, y: 48 }, { x: 44, y: 54 }, { x: 21, y: 48 },
  { x: 14, y: 20 }, { x: 42, y: 14 }, { x: 70, y: 20 },
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

  return (
    <div className="map">
      <StarField seed={31} count={50} />
      <span className="map-mist map-mist--1" aria-hidden="true" />
      <span className="map-mist map-mist--2" aria-hidden="true" />
      <HomeButton onExit={onExit} />
      <h2 className="map-title">The Academy Year</h2>

      {/* Path through the nodes */}
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

      {MAP_LOCATIONS.map((loc, i) => {
        const pos = NODE_POSITIONS[i]
        const stars = bestStars[String(loc.table)] ?? 0
        const passed = examsPassed.includes(loc.table)
        return (
          <button
            key={loc.table}
            className={`map-node${passed ? ' map-node--passed' : ''}`}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              animationDelay: `${i * 0.15}s`,
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
            {passed && <span className="map-node-badge">🏆</span>}
          </button>
        )
      })}

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
