/**
 * The academy-year map (PRODUCT.md §4.6): one location per table, each with
 * its own scene, named boss and exam. Suggested order only — nothing locked.
 */

export interface RivalPalette {
  hair: string
  dress: string
  dressDark: string
  hat: string
  hatDark: string
  band: string
}

/** Small charm drawn on the boss's hat band — quick visual signature. */
export type BossEmblem =
  | 'star'
  | 'crescent'
  | 'flower'
  | 'feather'
  | 'potion'
  | 'gear'
  | 'coin'
  | 'note'
  | 'bolt'
  | 'book'
  | 'leaf'

export type BossCompanion = 'cat' | 'owl' | 'bat' | null

export interface Boss {
  name: string
  palette: RivalPalette
  emblem: BossEmblem
  companion: BossCompanion
}

export type SceneVariant =
  | 'library'
  | 'garden'
  | 'owlery'
  | 'potions'
  | 'stars'
  | 'hall'
  | 'brooms'
  | 'clock'
  | 'treasury'
  | 'music'
  | 'rooftops'

export interface SceneTheme {
  variant: SceneVariant
  outdoor: boolean
  /** Sky/wall gradient, top → bottom. */
  sky: [string, string, string]
  /** Floor/ground gradient, top → bottom. */
  floor: [string, string]
  /** Window glass or horizon glow. */
  glass: string
  /** Signature colour — also tints the map node. */
  accent: string
}

export const NIX_PALETTE: RivalPalette = {
  hair: '#e14fa0',
  dress: '#6a3bb5',
  dressDark: '#552c93',
  hat: '#452a6d',
  hatDark: '#38205c',
  band: '#ff7ac3',
}

const palette = (hair: string, dress: string, dressDark: string, hat: string, hatDark: string, band: string): RivalPalette =>
  ({ hair, dress, dressDark, hat, hatDark, band })

export interface MapLocation {
  table: number
  name: string
  boss: Boss
  theme: SceneTheme
  /** The boss's silly enchantments, shown in her speech bubble each round. */
  blurbs: string[]
}

/** Free-play pool (and the Great Hall's own mischief). */
export const DEFAULT_BLURBS = [
  'Frogs are raining from the ceiling!',
  'The teacher is floating away!',
  'All the shoes are dancing!',
  'The paintings are giggling!',
  'Every quill is writing nonsense!',
  'The staircase is going backwards!',
  'The chandeliers are doing spins!',
]

const theme = (
  variant: SceneVariant,
  outdoor: boolean,
  sky: [string, string, string],
  floor: [string, string],
  glass: string,
  accent: string,
): SceneTheme => ({ variant, outdoor, sky, floor, glass, accent })

/** The Great Hall — also the default scene for free-play duels. */
export const DEFAULT_THEME: SceneTheme = theme(
  'hall',
  false,
  ['#160c30', '#221345', '#2c1a52'],
  ['#2a1a52', '#1a0f38'],
  '#4b3a86',
  '#b78bff',
)

export const MAP_LOCATIONS: MapLocation[] = [
  {
    table: 2,
    name: 'The Library',
    boss: { name: 'Nix', palette: NIX_PALETTE, emblem: 'book', companion: 'cat' },
    theme: theme('library', false, ['#1a0e36', '#241549', '#2e1c58'], ['#2a1a52', '#190e36'], '#4b3a86', '#c9a1e8'),
    blurbs: [
      'The books are flying south for winter!',
      'Every story now ends with "…and then a frog"!',
      'The dictionaries are arguing about spelling!',
      'Someone shuffled every single bookmark!',
      'The library ladder is playing hide-and-seek!',
      'All the maps now lead to the biscuit tin!',
    ],
  },
  {
    table: 5,
    name: 'Potions Lab',
    boss: {
      name: 'Juniper',
      palette: palette('#17b273', '#2c4a9e', '#1f3778', '#1d3358', '#152743', '#2fd48a'),
      emblem: 'potion',
      companion: null,
    },
    theme: theme('potions', false, ['#0c2418', '#12331f', '#173d26'], ['#143122', '#0a1d13'], '#2f6b4a', '#2fd48a'),
    blurbs: [
      'The potions are swapping their labels!',
      'The cauldron is blowing raspberry bubbles!',
      'Someone turned the soup to slime!',
      'The jars are juggling their own corks!',
      'That purple potion just learned to hiccup!',
      'The recipe book keeps adding "extra newts"!',
    ],
  },
  {
    table: 10,
    name: 'The Treasury',
    boss: {
      name: 'Marigold',
      palette: palette('#f0b429', '#1fb6c9', '#128a99', '#0f6d7a', '#0a525c', '#ffd166'),
      emblem: 'coin',
      companion: null,
    },
    theme: theme('treasury', false, ['#241503', '#332008', '#40290e'], ['#33230a', '#1e1304'], '#6b5220', '#ffd166'),
    blurbs: [
      'The coins are rolling away on holiday!',
      'The vault door is telling knock-knock jokes!',
      'Someone taught the treasure chest to burp!',
      'The gold is stacking itself into wobbly towers!',
      'The money bags are having a pillow fight!',
      'Every coin now has a frog’s face on it!',
    ],
  },
  {
    table: 3,
    name: 'Herb Garden',
    boss: {
      name: 'Fern',
      palette: palette('#5fd068', '#3e6b2a', '#2e5220', '#274a1a', '#1d3a12', '#a3e26a'),
      emblem: 'leaf',
      companion: null,
    },
    theme: theme('garden', true, ['#0b1f33', '#12324a', '#173b52'], ['#14331f', '#0a1f12'], '#7dd4a0', '#a3e26a'),
    blurbs: [
      'The toadstools are doing star jumps!',
      'The roses have started snoring!',
      'Someone taught the weeds to tap dance!',
      'The pumpkins are juggling themselves!',
      'The fireflies keep spelling "TEEHEE"!',
      'The hedge just ate the gardener’s hat!',
    ],
  },
  {
    table: 4,
    name: 'The Owlery',
    boss: {
      name: 'Willow',
      palette: palette('#b57b3f', '#7a4a26', '#5d3719', '#4a2b12', '#38200c', '#e8c69d'),
      emblem: 'feather',
      companion: 'owl',
    },
    theme: theme('owlery', false, ['#211224', '#301b31', '#3c243c'], ['#301b31', '#1c0f1e'], '#5a3b58', '#e8c69d'),
    blurbs: [
      'The owls are hooting the wrong o’clock!',
      'Someone swapped all the owls’ letters!',
      'The feathers are tickling everyone!',
      'The owls think THEY are the students now!',
      'Every owl is wearing a tiny bow tie!',
      'The post owls are delivering odd socks!',
    ],
  },
  {
    table: 6,
    name: 'Star Tower',
    boss: {
      name: 'Luna',
      palette: palette('#cdd7f0', '#2c3f8f', '#1f2f70', '#182452', '#111a3d', '#8fb4ff'),
      emblem: 'crescent',
      companion: null,
    },
    theme: theme('stars', false, ['#060d26', '#0b1638', '#101d47'], ['#101d47', '#080f28'], '#27407c', '#8fb4ff'),
    blurbs: [
      'The telescope is looking at its own feet!',
      'Someone tied the stars together with string!',
      'The moon is wearing sunglasses!',
      'The planets are playing musical chairs!',
      'The star charts are all doodles now!',
      'A comet keeps ringing the doorbell!',
    ],
  },
  {
    table: 7,
    name: 'Great Hall',
    boss: {
      name: 'Opal',
      palette: palette('#f0eef7', '#7a3f8f', '#5f2e70', '#4a2258', '#381a44', '#e3b8f0'),
      emblem: 'star',
      companion: 'cat',
    },
    theme: DEFAULT_THEME,
    blurbs: DEFAULT_BLURBS,
  },
  {
    table: 8,
    name: 'Broom Yard',
    boss: {
      name: 'Bramble',
      palette: palette('#d96c2f', '#6b3b1c', '#523013', '#40230d', '#301a09', '#f0a35e'),
      emblem: 'star',
      companion: 'bat',
    },
    theme: theme('brooms', true, ['#2b1230', '#47204a', '#5f2f4a'], ['#3a2030', '#22101c'], '#f0a35e', '#f0a35e'),
    blurbs: [
      'The brooms are sweeping the sky!',
      'Someone tied all the brooms in a bow!',
      'The bristles have turned to spaghetti!',
      'The brooms are racing without riders!',
      'The fence is doing the limbo!',
      'The shed keeps wandering off!',
    ],
  },
  {
    table: 9,
    name: 'Clock Tower',
    boss: {
      name: 'Tilda',
      palette: palette('#e14f4f', '#333a4a', '#252b3a', '#1c2130', '#141824', '#f0b429'),
      emblem: 'gear',
      companion: null,
    },
    theme: theme('clock', false, ['#0e1a24', '#152736', '#1c3244'], ['#152736', '#0b1620'], '#2f5468', '#5fc4d4'),
    blurbs: [
      'The clock is striking thirteen!',
      'The gears are running backwards!',
      'The pendulum wants to be a swing!',
      'Tick and tock have swapped places!',
      'The cuckoo bird is on strike!',
      'Someone set every alarm for RIGHT NOW!',
    ],
  },
  {
    table: 11,
    name: 'Music Room',
    boss: {
      name: 'Aria',
      palette: palette('#ff8fd0', '#8f2c6b', '#701f52', '#521740', '#3d1130', '#ffb8e0'),
      emblem: 'note',
      companion: 'cat',
    },
    theme: theme('music', false, ['#26102e', '#38173f', '#471e4c'], ['#38173f', '#200d26'], '#6b3a70', '#ff8fd0'),
    blurbs: [
      'The piano is playing itself — badly!',
      'The harp will only play wobbly songs!',
      'The trumpets have got the hiccups!',
      'Every note is coming out as a quack!',
      'The metronome is breakdancing!',
      'The teapots won’t stop humming!',
    ],
  },
  {
    table: 12,
    name: 'The Rooftops',
    boss: {
      name: 'Storm',
      palette: palette('#9fb6c9', '#2d3347', '#1f2733', '#171d28', '#10141d', '#5fc4d4'),
      emblem: 'bolt',
      companion: 'bat',
    },
    theme: theme('rooftops', true, ['#0a0f1e', '#111a30', '#1a2540'], ['#141b2c', '#0b101c'], '#8fb4ff', '#5fc4d4'),
    blurbs: [
      'The chimneys are blowing smoke rings!',
      'Someone is turning off the stars one by one!',
      'The gargoyles are having a staring contest!',
      'The moon keeps photobombing!',
      'Lightning is practising its zigzags!',
      'The weathervanes all point to "mischief"!',
    ],
  },
]

export function locationForTable(table: number): MapLocation {
  return MAP_LOCATIONS.find((loc) => loc.table === table) ?? MAP_LOCATIONS[0]
}

export const EXAM_ROUNDS = 14
