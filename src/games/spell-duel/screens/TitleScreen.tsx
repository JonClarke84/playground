import { HomeButton } from '../../../shell/HomeButton'
import { StarField } from '../../../shell/StarField'
import { sfx } from '../../../lib/audio'
import { useSpellDuelStore } from '../state/store'
import { WitchAvatar } from '../avatar/WitchAvatar'
import { DEFAULT_AVATAR } from '../avatar/avatarTypes'
import './menus.css'

const ALL_TABLES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

interface TitleScreenProps {
  onExit: () => void
  onPlay: () => void
  onDressingRoom: () => void
  onMap: () => void
  onSpellbook: () => void
  onCharacters: () => void
}

export function TitleScreen({
  onExit,
  onPlay,
  onDressingRoom,
  onMap,
  onSpellbook,
  onCharacters,
}: TitleScreenProps) {
  const avatar = useSpellDuelStore((s) => s.avatar) ?? DEFAULT_AVATAR
  const tables = useSpellDuelStore((s) => s.tables)
  const toggleTable = useSpellDuelStore((s) => s.toggleTable)
  const sparkleDust = useSpellDuelStore((s) => s.sparkleDust)

  return (
    <div className="sd-title">
      <StarField seed={23} />
      <HomeButton onExit={onExit} />


      <div className="sd-title-layout">
        <div className="sd-title-left">
          <button
            className="sd-title-avatar sd-title-avatar-float"
            onClick={onDressingRoom}
            aria-label="Open the dressing room"
          >
            <WitchAvatar config={avatar} />
            <span className="sd-title-avatar-edit">Dressing room ✨</span>
          </button>
          <span className="sd-title-avatar-ground" aria-hidden="true" />
          {sparkleDust > 0 && (
            <span className="sd-title-dust">✦ {sparkleDust} sparkle dust</span>
          )}
        </div>

        <div className="sd-title-right">
          <span className="sd-title-heading-wrap">
            <h2 className="sd-title-heading">Spell Duel</h2>
            <span className="sd-title-sparkle sd-title-sparkle--1" aria-hidden="true" />
            <span className="sd-title-sparkle sd-title-sparkle--2" aria-hidden="true" />
            <span className="sd-title-sparkle sd-title-sparkle--3" aria-hidden="true" />
          </span>
          <p className="sd-title-sub">Which spells shall we practise?</p>

          <div className="table-chips">
            {ALL_TABLES.map((t) => {
              const active = tables.includes(t)
              return (
                <button
                  key={t}
                  className={`table-chip${active ? ' table-chip--on' : ''}`}
                  onClick={() => {
                    toggleTable(t)
                    sfx.tap()
                  }}
                  aria-pressed={active}
                >
                  {t}s
                </button>
              )
            })}
          </div>

          <button className="button-primary sd-title-play" onClick={onPlay}>
            Duel!
          </button>

          <div className="sd-title-links">
            <button className="button-secondary" onClick={onMap}>
              🗺️ Academy map
            </button>
            <button className="button-secondary" onClick={onSpellbook}>
              📖 Spellbook
            </button>
            <button className="button-secondary" onClick={onCharacters}>
              📜 Who's Who
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
