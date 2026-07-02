import type { ComponentType } from 'react'

/** Contract every playground game implements (PRODUCT.md §7.2). */
export interface GameDefinition {
  id: string
  title: string
  tagline: string
  /** Full-bleed card artwork component (SVG scene). */
  CardArt: ComponentType
  /** The game itself, mounted full-screen. Must render a HomeButton wired to onExit. */
  Component: ComponentType<GameProps>
  comingSoon?: boolean
}

export interface GameProps {
  onExit: () => void
}
