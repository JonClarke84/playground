import type { GameDefinition } from './types'
import { spellDuelRoutes } from '../games/spell-duel/routes'
import { SpellDuelCardArt } from './cards/SpellDuelCardArt'
import { CastleCardArt } from './cards/CastleCardArt'
import { PopStageCardArt } from './cards/PopStageCardArt'

export const games: GameDefinition[] = [
  {
    id: 'spell-duel',
    title: 'Spell Duel',
    tagline: 'Out-magic the rival witch',
    CardArt: SpellDuelCardArt,
    path: '/spell-duel',
    routes: spellDuelRoutes,
  },
  {
    id: 'castle-builder',
    title: 'Castle Builder',
    tagline: 'Raise the royal walls',
    CardArt: CastleCardArt,
    comingSoon: true,
  },
  {
    id: 'chart-toppers',
    title: 'Chart Toppers',
    tagline: 'Light up the big stage',
    CardArt: PopStageCardArt,
    comingSoon: true,
  },
]
