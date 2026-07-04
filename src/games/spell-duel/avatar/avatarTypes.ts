/** Avatar configuration + option catalogues (PRODUCT.md §4.2). */

export interface AvatarConfig {
  skin: SkinId
  hairStyle: HairStyleId
  hairColour: HairColourId
  hat: HatId
  outfit: OutfitId
  outfitColour: OutfitColourId
  accessory: AccessoryId
  effect?: EffectId
}

export type SkinId =
  | 'porcelain'
  | 'peach'
  | 'honey'
  | 'tan'
  | 'brown'
  | 'deep'
  | 'emerald'

export type HairStyleId =
  | 'waves'
  | 'bun'
  | 'braids'
  | 'bob'
  | 'curls'
  | 'ponytail'
  | 'spacebuns'
  | 'crownbraid'
  | 'fringe'

export type HairColourId =
  | 'black'
  | 'brown'
  | 'chestnut'
  | 'blonde'
  | 'ginger'
  | 'pink'
  | 'lilac'
  | 'emerald'
  | 'emeraldgleam'
  | 'silver'
  | 'firecopper'
  | 'lavender'
  | 'rosegold'
  | 'midnightblue'

export type HatId =
  | 'none'
  | 'pointed'
  | 'widebrim'
  | 'tiara'
  | 'flowers'
  | 'beret'
  | 'crown'
  | 'moonhat'
  | 'tophat'
  | 'halo'
  | 'bowhat'

export type OutfitId =
  | 'academy'
  | 'starcape'
  | 'ruffles'
  | 'coat'
  | 'jumpsuit'
  | 'robe'
  | 'galaxy'
  | 'tutu'
  | 'regal'
  | 'storm'

export type OutfitColourId =
  | 'emerald'
  | 'pink'
  | 'gold'
  | 'lilac'
  | 'midnight'
  | 'teal'
  | 'sunGold'
  | 'silver'
  | 'rose'
  | 'seaTeal'
  | 'violet'
  | 'jetBlack'

export type AccessoryId =
  | 'wand'
  | 'broom'
  | 'cat'
  | 'owl'
  | 'spellbook'
  | 'pendant'
  | 'starwand'
  | 'moonwand'
  | 'heartwand'
  | 'bunny'
  | 'crystalball'

export type EffectId =
  | 'none'
  | 'sparkles'
  | 'fireflies'
  | 'butterflies'
  | 'notes'
  | 'snow'
  | 'stars'
  | 'bubbles'

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
  { id: 'emeraldgleam', base: '#1fdc9c', shade: '#0fae79' },
  { id: 'silver', base: '#d7dde6', shade: '#aab2bf' },
  { id: 'firecopper', base: '#d9612b', shade: '#b1481b' },
  { id: 'lavender', base: '#c9a8f5', shade: '#a97fe0' },
  { id: 'rosegold', base: '#e8a798', shade: '#cf8574' },
  { id: 'midnightblue', base: '#2c3468', shade: '#1c2148' },
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
  { id: 'sunGold', base: '#ffcf3f', dark: '#dba91f', light: '#ffe793' },
  { id: 'silver', base: '#c7ced9', dark: '#9aa4b3', light: '#eef1f6' },
  { id: 'rose', base: '#e8798f', dark: '#c4576d', light: '#f6b9c5' },
  { id: 'seaTeal', base: '#2fb8a3', dark: '#1c8f7d', light: '#8fe4d6' },
  { id: 'violet', base: '#7c4dd6', dark: '#5c34ad', light: '#b79cf0' },
  { id: 'jetBlack', base: '#2b2b33', dark: '#18181d', light: '#54545f' },
]

export const HAIR_STYLES: HairStyleId[] = [
  'waves',
  'bun',
  'braids',
  'bob',
  'curls',
  'ponytail',
  'spacebuns',
  'crownbraid',
  'fringe',
]
export const HATS: HatId[] = [
  'pointed',
  'widebrim',
  'tiara',
  'flowers',
  'beret',
  'crown',
  'moonhat',
  'tophat',
  'halo',
  'bowhat',
  'none',
]
export const OUTFITS: OutfitId[] = [
  'academy',
  'starcape',
  'ruffles',
  'coat',
  'jumpsuit',
  'robe',
  'galaxy',
  'tutu',
  'regal',
  'storm',
]
export const ACCESSORIES: AccessoryId[] = [
  'wand',
  'broom',
  'cat',
  'owl',
  'spellbook',
  'pendant',
  'starwand',
  'moonwand',
  'heartwand',
  'bunny',
  'crystalball',
]
export const EFFECTS: EffectId[] = [
  'none',
  'sparkles',
  'fireflies',
  'butterflies',
  'notes',
  'snow',
  'stars',
  'bubbles',
]

export const DEFAULT_AVATAR: AvatarConfig = {
  skin: 'peach',
  hairStyle: 'waves',
  hairColour: 'chestnut',
  hat: 'pointed',
  outfit: 'academy',
  outfitColour: 'emerald',
  accessory: 'wand',
  effect: 'none',
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
