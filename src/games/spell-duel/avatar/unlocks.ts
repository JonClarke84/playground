/**
 * Costume unlocking (PRODUCT.md §4.7). A subset of avatar options starts
 * locked; rival exams award their signature piece free, and any locked piece
 * can be unlocked with sparkle dust. Nothing is ever hard-gated.
 */

export type ItemKind = 'hairStyle' | 'hat' | 'outfit' | 'accessory' | 'hairColour' | 'outfitColour' | 'effect'

export interface CostumeItem {
  id: string
  kind: ItemKind
  option: string
  label: string
  price: number
}

export const LOCKED_ITEMS: CostumeItem[] = [
  { id: 'hair:bob', kind: 'hairStyle', option: 'bob', label: 'Sleek bob', price: 25 },
  { id: 'hair:curls', kind: 'hairStyle', option: 'curls', label: 'Cloud curls', price: 40 },
  { id: 'hair:ponytail', kind: 'hairStyle', option: 'ponytail', label: 'High ponytail', price: 25 },
  { id: 'hat:tiara', kind: 'hat', option: 'tiara', label: 'Royal tiara', price: 40 },
  { id: 'hat:widebrim', kind: 'hat', option: 'widebrim', label: 'Glamour hat', price: 40 },
  { id: 'hat:flowers', kind: 'hat', option: 'flowers', label: 'Flower crown', price: 40 },
  { id: 'hat:beret', kind: 'hat', option: 'beret', label: 'Artist beret', price: 30 },
  { id: 'outfit:ruffles', kind: 'outfit', option: 'ruffles', label: 'Ruffle party dress', price: 35 },
  { id: 'outfit:coat', kind: 'outfit', option: 'coat', label: 'Royal tailored coat', price: 40 },
  { id: 'outfit:jumpsuit', kind: 'outfit', option: 'jumpsuit', label: 'Pop-star jumpsuit', price: 40 },
  { id: 'outfit:robe', kind: 'outfit', option: 'robe', label: 'Moonlit robe', price: 40 },
  { id: 'acc:broom', kind: 'accessory', option: 'broom', label: 'Racing broom', price: 40 },
  { id: 'acc:owl', kind: 'accessory', option: 'owl', label: 'Owl friend', price: 40 },
  { id: 'acc:spellbook', kind: 'accessory', option: 'spellbook', label: 'Emerald spellbook', price: 30 },
  { id: 'acc:pendant', kind: 'accessory', option: 'pendant', label: 'Star pendant', price: 30 },

  // New hats
  { id: 'hat:crown', kind: 'hat', option: 'crown', label: 'Golden crown', price: 55 },
  { id: 'hat:moonhat', kind: 'hat', option: 'moonhat', label: 'Crescent moon hat', price: 45 },
  { id: 'hat:tophat', kind: 'hat', option: 'tophat', label: 'Magician top hat', price: 40 },
  { id: 'hat:halo', kind: 'hat', option: 'halo', label: 'Glowing halo', price: 50 },
  { id: 'hat:bowhat', kind: 'hat', option: 'bowhat', label: 'Big bow hat', price: 35 },

  // New hair styles
  { id: 'hair:spacebuns', kind: 'hairStyle', option: 'spacebuns', label: 'Space buns', price: 30 },
  { id: 'hair:crownbraid', kind: 'hairStyle', option: 'crownbraid', label: 'Crown braid', price: 35 },
  { id: 'hair:fringe', kind: 'hairStyle', option: 'fringe', label: 'Sweet fringe', price: 25 },

  // New outfits
  { id: 'outfit:galaxy', kind: 'outfit', option: 'galaxy', label: 'Galaxy gown', price: 55 },
  { id: 'outfit:tutu', kind: 'outfit', option: 'tutu', label: 'Sparkle tutu', price: 40 },
  { id: 'outfit:regal', kind: 'outfit', option: 'regal', label: 'Regal gown', price: 60 },
  { id: 'outfit:storm', kind: 'outfit', option: 'storm', label: 'Storm cloak', price: 50 },

  // New accessories
  { id: 'acc:starwand', kind: 'accessory', option: 'starwand', label: 'Star wand', price: 35 },
  { id: 'acc:moonwand', kind: 'accessory', option: 'moonwand', label: 'Moon wand', price: 35 },
  { id: 'acc:heartwand', kind: 'accessory', option: 'heartwand', label: 'Heart wand', price: 30 },
  { id: 'acc:bunny', kind: 'accessory', option: 'bunny', label: 'Bunny friend', price: 45 },
  { id: 'acc:crystalball', kind: 'accessory', option: 'crystalball', label: 'Crystal ball', price: 40 },

  // New hair colours
  { id: 'haircolour:emeraldgleam', kind: 'hairColour', option: 'emeraldgleam', label: 'Emerald gleam', price: 20 },
  { id: 'haircolour:silver', kind: 'hairColour', option: 'silver', label: 'Silver shine', price: 25 },
  { id: 'haircolour:firecopper', kind: 'hairColour', option: 'firecopper', label: 'Fire copper', price: 25 },
  { id: 'haircolour:lavender', kind: 'hairColour', option: 'lavender', label: 'Lavender dream', price: 20 },
  { id: 'haircolour:rosegold', kind: 'hairColour', option: 'rosegold', label: 'Rose gold', price: 25 },
  { id: 'haircolour:midnightblue', kind: 'hairColour', option: 'midnightblue', label: 'Midnight blue', price: 20 },

  // New outfit colours
  { id: 'outfitcolour:sunGold', kind: 'outfitColour', option: 'sunGold', label: 'Sun gold', price: 20 },
  { id: 'outfitcolour:silver', kind: 'outfitColour', option: 'silver', label: 'Moonlit silver', price: 25 },
  { id: 'outfitcolour:rose', kind: 'outfitColour', option: 'rose', label: 'Rose blush', price: 20 },
  { id: 'outfitcolour:seaTeal', kind: 'outfitColour', option: 'seaTeal', label: 'Sea teal', price: 25 },
  { id: 'outfitcolour:violet', kind: 'outfitColour', option: 'violet', label: 'Violet dusk', price: 20 },
  { id: 'outfitcolour:jetBlack', kind: 'outfitColour', option: 'jetBlack', label: 'Jet black', price: 25 },

  // Sparkle effects — aspirational prizes; 'none' stays free/unlocked
  { id: 'effect:sparkles', kind: 'effect', option: 'sparkles', label: 'Sparkle trail', price: 50 },
  { id: 'effect:fireflies', kind: 'effect', option: 'fireflies', label: 'Fireflies', price: 60 },
  { id: 'effect:butterflies', kind: 'effect', option: 'butterflies', label: 'Butterflies', price: 60 },
  { id: 'effect:notes', kind: 'effect', option: 'notes', label: 'Musical notes', price: 55 },
  { id: 'effect:snow', kind: 'effect', option: 'snow', label: 'Snow swirl', price: 70 },
  { id: 'effect:stars', kind: 'effect', option: 'stars', label: 'Shooting stars', price: 80 },
  { id: 'effect:bubbles', kind: 'effect', option: 'bubbles', label: 'Floating bubbles', price: 90 },
]

/** Signature piece awarded free for passing each table's rival exam. */
export const EXAM_REWARDS: Record<number, string> = {
  2: 'acc:pendant',
  3: 'hat:beret',
  4: 'acc:owl',
  5: 'hat:tiara',
  6: 'hair:curls',
  7: 'hat:widebrim',
  8: 'acc:broom',
  9: 'outfit:robe',
  10: 'outfit:coat',
  11: 'outfit:jumpsuit',
  12: 'hat:flowers',
}

export function itemById(id: string): CostumeItem | undefined {
  return LOCKED_ITEMS.find((item) => item.id === id)
}

export function lockedItemFor(kind: ItemKind, option: string): CostumeItem | undefined {
  return LOCKED_ITEMS.find((item) => item.kind === kind && item.option === option)
}

/** True when the option is free-by-default or has been unlocked. */
export function isOptionUnlocked(unlocked: string[], kind: ItemKind, option: string): boolean {
  const item = lockedItemFor(kind, option)
  return item === undefined || unlocked.includes(item.id)
}
