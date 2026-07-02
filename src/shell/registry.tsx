import type { GameDefinition } from './types'
import { SpellDuel } from '../games/spell-duel/SpellDuel'
import { SpellDuelCardArt } from './cards/SpellDuelCardArt'
import { CastleCardArt } from './cards/CastleCardArt'
import { PopStageCardArt } from './cards/PopStageCardArt'

function ComingSoon() {
  return null
}

export const games: GameDefinition[] = [
  {
    id: 'spell-duel',
    title: 'Spell Duel',
    tagline: 'Out-magic the rival witch',
    CardArt: SpellDuelCardArt,
    Component: SpellDuel,
  },
  {
    id: 'castle-builder',
    title: 'Castle Builder',
    tagline: 'Raise the royal walls',
    CardArt: CastleCardArt,
    Component: ComingSoon,
    comingSoon: true,
  },
  {
    id: 'chart-toppers',
    title: 'Chart Toppers',
    tagline: 'Light up the big stage',
    CardArt: PopStageCardArt,
    Component: ComingSoon,
    comingSoon: true,
  },
]
