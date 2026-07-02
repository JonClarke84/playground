import type { ComponentType, ReactElement } from 'react'

/** Contract every playground game implements (PRODUCT.md §7.2). */
export interface GameDefinition {
  id: string
  title: string
  tagline: string
  /** Full-bleed card artwork component (SVG scene). */
  CardArt: ComponentType
  /** Root route of the game, e.g. '/spell-duel'. Absent for coming-soon cards. */
  path?: string
  /**
   * The game's <Route> subtree, mounted directly inside the app <Routes>.
   * Screens use the router (browser back works); every screen still renders
   * a HomeButton as the visible way up.
   */
  routes?: () => ReactElement
  comingSoon?: boolean
}
