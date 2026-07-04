import type { ComponentType } from 'react'
import { RivalWitch, type RivalMood } from '../RivalWitch'
import { bossImageUrl } from '../../../../lib/art'
import { locationForTable } from '../../progression'
import { NixBoss } from './Nix'
import { FernBoss } from './Fern'
import { WillowBoss } from './Willow'
import { JuniperBoss } from './Juniper'
import { LunaBoss } from './Luna'
import { OpalBoss } from './Opal'
import { BrambleBoss } from './Bramble'
import { TildaBoss } from './Tilda'
import { MarigoldBoss } from './Marigold'
import { AriaBoss } from './Aria'
import { StormBoss } from './Storm'

export interface BossArtProps {
  mood?: RivalMood
}

/**
 * The boss portrait for a table: prefers a painted raster (dropped into
 * src/assets/art/bosses/ — see ART_PROMPTS.md), falls back to bespoke SVG.
 * Raster portraits express 'shocked' with a flinch animation instead of a
 * face swap.
 */
export function BossPortrait({ table, mood = 'smug' }: { table: number; mood?: RivalMood }) {
  const boss = locationForTable(table).boss
  const raster = bossImageUrl(boss.name)
  if (raster !== null) {
    return (
      <img
        className={`boss-raster${mood === 'shocked' ? ' boss-raster--shocked' : ''}`}
        src={raster}
        alt={boss.name}
        draggable={false}
      />
    )
  }
  const Svg = BOSS_ART[table]
  return Svg ? <Svg mood={mood} /> : <RivalWitch mood={mood} />
}

/** Bespoke portrait per academy table (PRODUCT.md §4.6). */
export const BOSS_ART: Record<number, ComponentType<BossArtProps>> = {
  2: NixBoss,
  3: FernBoss,
  4: WillowBoss,
  5: JuniperBoss,
  6: LunaBoss,
  7: OpalBoss,
  8: BrambleBoss,
  9: TildaBoss,
  10: MarigoldBoss,
  11: AriaBoss,
  12: StormBoss,
}
