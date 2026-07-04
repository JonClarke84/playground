/**
 * Raster art slots (PRODUCT.md §8.2.3). Drop generated images into
 * src/assets/art/bosses/<name>.{webp,png} or src/assets/art/scenes/<variant>.{webp,png}
 * and the matching slot upgrades from SVG automatically (Vite picks them up
 * at build/dev time — no code changes). See ART_PROMPTS.md for the pack.
 */

const bossFiles = import.meta.glob<string>('../assets/art/bosses/*.{webp,png}', {
  eager: true,
  import: 'default',
})

const sceneFiles = import.meta.glob<string>('../assets/art/scenes/*.{webp,png}', {
  eager: true,
  import: 'default',
})

function lookup(files: Record<string, string>, stem: string): string | null {
  for (const [path, url] of Object.entries(files)) {
    const base = path.split('/').pop() ?? ''
    if (base === `${stem}.webp` || base === `${stem}.png`) return url
  }
  return null
}

/** Painted portrait for a boss (lowercase name), or null to use the SVG. */
export function bossImageUrl(name: string): string | null {
  return lookup(bossFiles, name.toLowerCase())
}

/** Painted backdrop for a scene variant, or null to use the SVG. */
export function sceneImageUrl(variant: string): string | null {
  return lookup(sceneFiles, variant)
}
