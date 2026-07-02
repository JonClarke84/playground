/**
 * Costume unlocking (PRODUCT.md §4.7). A subset of avatar options starts
 * locked; rival exams award their signature piece free, and any locked piece
 * can be unlocked with sparkle dust. Nothing is ever hard-gated.
 */

export type ItemKind = 'hairStyle' | 'hat' | 'outfit' | 'accessory'

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
