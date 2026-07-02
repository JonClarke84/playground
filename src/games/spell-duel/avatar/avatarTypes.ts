/** Avatar configuration + option catalogues (PRODUCT.md §4.2). */

export interface AvatarConfig {
  skin: SkinId
  hairStyle: HairStyleId
  hairColour: HairColourId
  hat: HatId
  outfit: OutfitId
  outfitColour: OutfitColourId
  accessory: AccessoryId
}

export type SkinId =
  | 'porcelain'
  | 'peach'
  | 'honey'
  | 'tan'
  | 'brown'
  | 'deep'
  | 'emerald'

export type HairStyleId = 'waves' | 'bun' | 'braids' | 'bob' | 'curls' | 'ponytail'

export type HairColourId =
  | 'black'
  | 'brown'
  | 'chestnut'
  | 'blonde'
  | 'ginger'
  | 'pink'
  | 'lilac'
  | 'emerald'

export type HatId = 'none' | 'pointed' | 'widebrim' | 'tiara' | 'flowers' | 'beret'

export type OutfitId = 'academy' | 'starcape' | 'ruffles' | 'coat' | 'jumpsuit' | 'robe'

export type OutfitColourId = 'emerald' | 'pink' | 'gold' | 'lilac' | 'midnight' | 'teal'

export type AccessoryId = 'wand' | 'broom' | 'cat' | 'owl' | 'spellbook' | 'pendant'

export interface SkinTone {
  id: SkinId
  base: string
  shade: string
  cheek: string
}

export const SKIN_TONES: SkinTone[] = [
  { id: 'porcelain', base: '#ffe3d2', shade: '#f3c4ac', cheek: '#ff9db4' },
  { id: 'peach', base: '#ffd0b0', shade: '#eeae88', cheek: '#f98da2' },
  { id: 'honey', base: '#eab184', shade: '#d59463', cheek: '#e97f96' },
  { id: 'tan', base: '#c98a5e', shade: '#b17048', cheek: '#d16f88' },
  { id: 'brown', base: '#9c6238', shade: '#844f2b', cheek: '#c05e78' },
  { id: 'deep', base: '#6f4327', shade: '#59341d', cheek: '#a94f66' },
  { id: 'emerald', base: '#8fd6a3', shade: '#6cbd85', cheek: '#f07ba0' },
]

export interface HairColour {
  id: HairColourId
  base: string
  shade: string
}

export const HAIR_COLOURS: HairColour[] = [
  { id: 'black', base: '#332a44', shade: '#241d31' },
  { id: 'brown', base: '#5d4037', shade: '#472f28' },
  { id: 'chestnut', base: '#8b5a2b', shade: '#6f4520' },
  { id: 'blonde', base: '#f4c95d', shade: '#d9a83e' },
  { id: 'ginger', base: '#e07b39', shade: '#bf5f24' },
  { id: 'pink', base: '#ff7ac3', shade: '#e14fa0' },
  { id: 'lilac', base: '#b78bff', shade: '#9563e6' },
  { id: 'emerald', base: '#2fd48a', shade: '#17b273' },
]

export interface OutfitColour {
  id: OutfitColourId
  base: string
  dark: string
  light: string
}

export const OUTFIT_COLOURS: OutfitColour[] = [
  { id: 'emerald', base: '#17b273', dark: '#0d8354', light: '#7dedbb' },
  { id: 'pink', base: '#f45fae', dark: '#c93a8a', light: '#ffa8d7' },
  { id: 'gold', base: '#f0b429', dark: '#c98f14', light: '#ffe08a' },
  { id: 'lilac', base: '#9d6bf2', dark: '#7a48cf', light: '#cdaeff' },
  { id: 'midnight', base: '#41307a', dark: '#2c1f56', light: '#7461b3' },
  { id: 'teal', base: '#1fb6c9', dark: '#128a99', light: '#7fe3ef' },
]

export const HAIR_STYLES: HairStyleId[] = ['waves', 'bun', 'braids', 'bob', 'curls', 'ponytail']
export const HATS: HatId[] = ['pointed', 'widebrim', 'tiara', 'flowers', 'beret', 'none']
export const OUTFITS: OutfitId[] = ['academy', 'starcape', 'ruffles', 'coat', 'jumpsuit', 'robe']
export const ACCESSORIES: AccessoryId[] = ['wand', 'broom', 'cat', 'owl', 'spellbook', 'pendant']

export const DEFAULT_AVATAR: AvatarConfig = {
  skin: 'peach',
  hairStyle: 'waves',
  hairColour: 'chestnut',
  hat: 'pointed',
  outfit: 'academy',
  outfitColour: 'emerald',
  accessory: 'wand',
}

/** Facial expression, driven by game state (idle, casting, celebrating…). */
export type Expression = 'smile' | 'grin' | 'wow' | 'thinking'

export function skinTone(id: SkinId): SkinTone {
  return SKIN_TONES.find((t) => t.id === id) ?? SKIN_TONES[1]
}

export function hairColour(id: HairColourId): HairColour {
  return HAIR_COLOURS.find((c) => c.id === id) ?? HAIR_COLOURS[2]
}

export function outfitColour(id: OutfitColourId): OutfitColour {
  return OUTFIT_COLOURS.find((c) => c.id === id) ?? OUTFIT_COLOURS[0]
}
