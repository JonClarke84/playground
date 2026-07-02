import { useState } from 'react'
import { sfx } from '../../../lib/audio'
import { StarField } from '../../../shell/StarField'
import { useSpellDuelStore } from '../state/store'
import { WitchAvatar } from '../avatar/WitchAvatar'
import type { AvatarConfig } from '../avatar/avatarTypes'
import {
  ACCESSORIES,
  DEFAULT_AVATAR,
  HAIR_COLOURS,
  HAIR_STYLES,
  HATS,
  OUTFIT_COLOURS,
  OUTFITS,
  SKIN_TONES,
} from '../avatar/avatarTypes'

type CategoryId = 'skin' | 'hairStyle' | 'hairColour' | 'hat' | 'outfit' | 'outfitColour' | 'accessory'

const CATEGORIES: Array<{ id: CategoryId; label: string }> = [
  { id: 'skin', label: 'Skin' },
  { id: 'hairStyle', label: 'Hair' },
  { id: 'hairColour', label: 'Hair colour' },
  { id: 'hat', label: 'Hats' },
  { id: 'outfit', label: 'Outfits' },
  { id: 'outfitColour', label: 'Colours' },
  { id: 'accessory', label: 'Extras' },
]

function randomOf<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

interface AvatarCreatorProps {
  firstRun: boolean
  onDone: () => void
}

export function AvatarCreator({ firstRun, onDone }: AvatarCreatorProps) {
  const stored = useSpellDuelStore((s) => s.avatar)
  const setAvatar = useSpellDuelStore((s) => s.setAvatar)
  const avatar = stored ?? DEFAULT_AVATAR
  const [category, setCategory] = useState<CategoryId>('skin')

  const update = (patch: Partial<AvatarConfig>) => {
    sfx.tap()
    setAvatar({ ...avatar, ...patch })
  }

  const surprise = () => {
    sfx.hint()
    setAvatar({
      skin: randomOf(SKIN_TONES).id,
      hairStyle: randomOf(HAIR_STYLES),
      hairColour: randomOf(HAIR_COLOURS).id,
      hat: randomOf(HATS),
      outfit: randomOf(OUTFITS),
      outfitColour: randomOf(OUTFIT_COLOURS).id,
      accessory: randomOf(ACCESSORIES),
    })
  }

  const options = (() => {
    switch (category) {
      case 'skin':
        return SKIN_TONES.map((tone) => ({
          key: tone.id,
          active: avatar.skin === tone.id,
          onPick: () => update({ skin: tone.id }),
          swatch: tone.base,
        }))
      case 'hairColour':
        return HAIR_COLOURS.map((colour) => ({
          key: colour.id,
          active: avatar.hairColour === colour.id,
          onPick: () => update({ hairColour: colour.id }),
          swatch: colour.base,
        }))
      case 'outfitColour':
        return OUTFIT_COLOURS.map((colour) => ({
          key: colour.id,
          active: avatar.outfitColour === colour.id,
          onPick: () => update({ outfitColour: colour.id }),
          swatch: colour.base,
        }))
      case 'hairStyle':
        return HAIR_STYLES.map((id) => ({
          key: id,
          active: avatar.hairStyle === id,
          onPick: () => update({ hairStyle: id }),
          preview: { ...avatar, hairStyle: id, hat: 'none' as const },
        }))
      case 'hat':
        return HATS.map((id) => ({
          key: id,
          active: avatar.hat === id,
          onPick: () => update({ hat: id }),
          preview: { ...avatar, hat: id },
        }))
      case 'outfit':
        return OUTFITS.map((id) => ({
          key: id,
          active: avatar.outfit === id,
          onPick: () => update({ outfit: id }),
          preview: { ...avatar, outfit: id },
        }))
      case 'accessory':
        return ACCESSORIES.map((id) => ({
          key: id,
          active: avatar.accessory === id,
          onPick: () => update({ accessory: id }),
          preview: { ...avatar, accessory: id },
        }))
    }
  })()

  return (
    <div className="creator">
      <StarField seed={5} count={40} />

      <div className="creator-layout">
        <div className="creator-preview">
          {firstRun && <h2 className="creator-heading">Make your witch!</h2>}
          <div className="creator-avatar">
            <WitchAvatar config={avatar} expression="grin" />
          </div>
          <button className="button-secondary" onClick={surprise}>
            Surprise me! 🎲
          </button>
        </div>

        <div className="creator-panel">
          <div className="creator-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`creator-tab${category === cat.id ? ' creator-tab--on' : ''}`}
                onClick={() => {
                  setCategory(cat.id)
                  sfx.tap()
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="creator-options">
            {options.map((opt) => (
              <button
                key={opt.key}
                className={`creator-option${opt.active ? ' creator-option--on' : ''}`}
                onClick={opt.onPick}
                aria-pressed={opt.active}
                aria-label={opt.key}
              >
                {'swatch' in opt && opt.swatch !== undefined ? (
                  <span className="creator-swatch" style={{ background: opt.swatch }} />
                ) : 'preview' in opt && opt.preview !== undefined ? (
                  <span className="creator-mini">
                    <WitchAvatar config={opt.preview} />
                  </span>
                ) : null}
              </button>
            ))}
          </div>

          <button
            className="button-primary creator-done"
            onClick={() => {
              // Commit even if she kept every default — leaving the creator
              // must always produce a saved witch.
              setAvatar(avatar)
              onDone()
            }}
          >
            {firstRun ? 'She’s ready!' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  )
}
