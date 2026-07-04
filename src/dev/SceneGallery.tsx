import { MAP_LOCATIONS } from '../games/spell-duel/progression'
import { DuelBackdrop } from '../games/spell-duel/art/DuelBackdrop'
import { BossPortrait } from '../games/spell-duel/art/bosses'
import '../games/spell-duel/spellDuel.css'

/** Dev-only scene review at /?dev=scenes — every location with its boss. */
export function SceneGallery() {
  return (
    <div style={{ padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, overflowY: 'auto', height: '100%' }}>
      {MAP_LOCATIONS.map((loc) => (
        <figure key={loc.table} style={{ margin: 0 }}>
          <div style={{ position: 'relative', aspectRatio: '16 / 10', borderRadius: 12, overflow: 'hidden' }}>
            <DuelBackdrop theme={loc.theme} />
            <div style={{ position: 'absolute', top: '4%', right: '2%', width: '26%' }}>
              <BossPortrait table={loc.table} />
            </div>
          </div>
          <figcaption style={{ fontWeight: 800, fontSize: 14, padding: '6px 2px' }}>
            {loc.table}s — {loc.name} · {loc.boss.name} ({loc.boss.emblem}
            {loc.boss.companion ? `, ${loc.boss.companion}` : ''})
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
