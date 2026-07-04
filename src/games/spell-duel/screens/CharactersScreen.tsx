import { HomeButton } from '../../../shell/HomeButton'
import { StarField } from '../../../shell/StarField'
import { useSpellDuelStore } from '../state/store'
import { BOSS_STORIES, MAP_LOCATIONS } from '../progression'
import { BossPortrait } from '../art/bosses'
import './menus.css'

/**
 * Who's Who (PRODUCT.md §4.6): a storybook roll-call of every academy rival,
 * in the same order they appear on the map. Read-only — no play actions here,
 * just the cast of characters and a nod to who's already been beaten.
 */
export function CharactersScreen({ onExit }: { onExit: () => void }) {
  const examsPassed = useSpellDuelStore((s) => s.examsPassed)

  return (
    <div className="characters">
      <StarField seed={47} count={40} />
      <HomeButton onExit={onExit} />
      <h2 className="characters-title">Who's Who at the Academy</h2>

      <div className="characters-list">
        {MAP_LOCATIONS.map((loc, i) => {
          const passed = examsPassed.includes(loc.table)
          const side = i % 2 === 0 ? 'left' : 'right'
          return (
            <article
              key={loc.table}
              className={`character-card character-card--${side}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="character-card-portrait">
                <BossPortrait table={loc.table} />
              </div>
              <div className="character-card-body">
                <div className="character-card-heading">
                  <h3 className="character-card-name">{loc.boss.name}</h3>
                  {passed && (
                    <span className="character-card-defeated">🏆 Defeated!</span>
                  )}
                </div>
                <p className="character-card-meta">
                  {loc.name} <span className="character-card-chip">the {loc.table}s</span>
                </p>
                <p className="character-card-story">{BOSS_STORIES[loc.table]}</p>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
