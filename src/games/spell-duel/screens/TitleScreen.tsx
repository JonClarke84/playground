import { HomeButton } from '../../../shell/HomeButton'
import { StarField } from '../../../shell/StarField'
import { sfx } from '../../../lib/audio'
import { useSpellDuelStore } from '../state/store'
import { WitchAvatar } from '../avatar/WitchAvatar'
import { DEFAULT_AVATAR } from '../avatar/avatarTypes'
import { loadPortrait } from '../../../lib/portrait'
import { uiImageUrl } from '../../../lib/art'
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
      {uiImageUrl('title') !== null ? (
        <>
          <img className="sd-title-backdrop" src={uiImageUrl('title') ?? ''} alt="" draggable={false} />
          <div className="sd-title-backdrop-scrim" />
        </>
      ) : (
        <StarField seed={23} />
      )}
      <HomeButton onExit={onExit} />


      <div className="sd-title-layout">
        <div className="sd-title-left">
          <button
            className="sd-title-avatar sd-title-avatar-float"
            onClick={onDressingRoom}
            aria-label="Open the dressing room"
          >
            {loadPortrait() !== null ? (
              <img className="sd-title-portrait" src={loadPortrait() ?? ''} alt="Your witch" draggable={false} />
            ) : (
              <WitchAvatar config={avatar} />
            )}
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

          <button className="sd-title-hero" onClick={onMap}>
            <svg
              className="sd-title-hero-art"
              viewBox="0 0 400 220"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polyline
                className="sd-title-hero-path"
                points="24,190 90,160 130,190 190,140 220,175 280,110 310,140 372,60"
                fill="none"
              />
              <circle className="sd-title-hero-node" cx="24" cy="190" r="7" />
              <circle className="sd-title-hero-node" cx="130" cy="190" r="7" />
              <circle className="sd-title-hero-node" cx="220" cy="175" r="7" />
              <circle className="sd-title-hero-node" cx="310" cy="140" r="7" />
              <g className="sd-title-hero-trophy" transform="translate(372, 60)">
                <path d="M-16,-4 h32 v10 a16,16 0 0 1 -32,0 Z" />
                <rect x="-4" y="6" width="8" height="10" />
                <rect x="-14" y="16" width="28" height="6" rx="3" />
                <path d="M-16,-2 c-10,0 -10,16 -2,18" fill="none" />
                <path d="M16,-2 c10,0 10,16 2,18" fill="none" />
              </g>
              <g className="sd-title-hero-star sd-title-hero-star--1" transform="translate(70, 50)">
                <path d="M0,-10 2.6,-3 10,-2 4,3 5.8,10 0,6 -5.8,10 -4,3 -10,-2 -2.6,-3 Z" />
              </g>
              <g className="sd-title-hero-star sd-title-hero-star--2" transform="translate(250, 40)">
                <path d="M0,-8 2,-2.4 8,-1.6 3.2,2.4 4.6,8 0,4.8 -4.6,8 -3.2,2.4 -8,-1.6 -2,-2.4 Z" />
              </g>
              <g className="sd-title-hero-star sd-title-hero-star--3" transform="translate(340, 165)">
                <path d="M0,-9 2.3,-2.7 9,-1.8 3.6,2.7 5.2,9 0,5.4 -5.2,9 -3.6,2.7 -9,-1.8 -2.3,-2.7 Z" />
              </g>
            </svg>
            <span className="sd-title-hero-copy">
              <span className="sd-title-hero-name">The Academy Year</span>
              <span className="sd-title-hero-tagline">
                Duel your way through 11 rooms and their bosses
              </span>
              <span className="sd-title-hero-cta">Enter the Academy</span>
            </span>
          </button>

          <div className="sd-title-practise">
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
          </div>

          <div className="sd-title-links">
            <button className="button-secondary sd-title-link" onClick={onSpellbook}>
              📖 Spellbook
            </button>
            <button className="button-secondary sd-title-link" onClick={onCharacters}>
              📜 Who's Who
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
