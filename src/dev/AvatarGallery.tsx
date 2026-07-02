import { WitchAvatar } from '../games/spell-duel/avatar/WitchAvatar'
import type { AvatarConfig } from '../games/spell-duel/avatar/avatarTypes'
import {
  ACCESSORIES,
  DEFAULT_AVATAR,
  HAIR_COLOURS,
  HAIR_STYLES,
  HATS,
  OUTFITS,
  OUTFIT_COLOURS,
  SKIN_TONES,
} from '../games/spell-duel/avatar/avatarTypes'

/**
 * Dev-only page (open /?dev=avatar) for visually iterating on avatar art.
 * One row per option category, varying that option on the default base.
 * Never linked from the child-facing UI.
 */

function Row({ title, configs }: { title: string; configs: Array<{ label: string; config: AvatarConfig }> }) {
  return (
    <section>
      <h3 style={{ color: 'var(--text-bright)', font: '600 16px var(--font-display)', margin: '18px 0 8px' }}>
        {title}
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {configs.map((c) => (
          <figure key={c.label} style={{ margin: 0, textAlign: 'center' }}>
            <div style={{ width: 150, background: 'var(--midnight-600)', borderRadius: 14 }}>
              <WitchAvatar config={c.config} />
            </div>
            <figcaption style={{ color: 'var(--text-dim)', fontSize: 12, paddingTop: 4 }}>{c.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export function AvatarGallery() {
  const base = DEFAULT_AVATAR
  return (
    <div style={{ padding: 24, background: 'var(--midnight-700)', height: '100%', overflow: 'auto' }}>
      <Row
        title="Hair styles (hat off)"
        configs={HAIR_STYLES.map((id) => ({
          label: id,
          config: { ...base, hairStyle: id, hat: 'none' },
        }))}
      />
      <Row
        title="Hats"
        configs={HATS.map((id) => ({ label: id, config: { ...base, hat: id } }))}
      />
      <Row
        title="Outfits"
        configs={OUTFITS.map((id) => ({ label: id, config: { ...base, outfit: id } }))}
      />
      <Row
        title="Accessories"
        configs={ACCESSORIES.map((id) => ({ label: id, config: { ...base, accessory: id, hat: 'none' } }))}
      />
      <Row
        title="Skin tones"
        configs={SKIN_TONES.map((t) => ({ label: t.id, config: { ...base, skin: t.id, hat: 'none' } }))}
      />
      <Row
        title="Hair colours"
        configs={HAIR_COLOURS.map((c) => ({ label: c.id, config: { ...base, hairColour: c.id, hat: 'none' } }))}
      />
      <Row
        title="Outfit colours"
        configs={OUTFIT_COLOURS.map((c) => ({ label: c.id, config: { ...base, outfitColour: c.id } }))}
      />
    </div>
  )
}
