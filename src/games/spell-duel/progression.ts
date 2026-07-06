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
  /** One-line backstory, shown on the map sheet before the duel. */
  bio?: string
}

/** Backstories — each boss's bespoke portrait leans into these. */
export const BOSS_BIOS: Record<number, string> = {
  2: 'Head Prefect of Mischief — hides comics inside her spellbooks.',
  3: 'Raised by talking brambles. Speaks fluent Plant.',
  4: 'Delivers the night post til dawn — hasn’t slept since Tuesday.',
  5: 'Potion prodigy. Her fringe is permanently singed.',
  6: 'Sleeps all day, names constellations all night.',
  7: 'Head girl. Collects trophies and never loses her mirror.',
  8: 'Three-time Midnight Cup champion. Crashes spectacularly.',
  9: 'Winds every academy clock at dawn. Never once late.',
  10: 'Keeps the dragon-hoard ledgers. Counts coins in her sleep.',
  11: 'Enchanted her hairbrush into a microphone. Practises encores at midnight.',
  12: 'Head of the secret Midnight Racing Club. Bottles lightning for fun.',
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
  /**
   * JRPG battle staging (optional pilot, PRODUCT-style §8 pseudo-3D):
   * grounded character spots as viewport percentages. Scenes without
   * staging keep the classic corner layout.
   */
  staging?: {
    hero: { left: number; bottom: number; width: number }
    boss: { left: number; bottom: number; width: number }
    /** Ground shadows: ellipse centres. */
    heroShadow: { left: number; bottom: number; width: number }
    bossShadow: { left: number; bottom: number; width: number }
  }
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
    theme: {
      ...theme('library', false, ['#1a0e36', '#241549', '#2e1c58'], ['#2a1a52', '#190e36'], '#4b3a86', '#c9a1e8'),
      staging: {
        hero: { left: 12, bottom: 10, width: 22 },
        boss: { left: 66, bottom: 34, width: 20 },
        heroShadow: { left: 15.5, bottom: 8.5, width: 15 },
        bossShadow: { left: 70, bottom: 26, width: 13 },
      },
    },
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
    theme: {
      ...theme('potions', false, ['#0c2418', '#12331f', '#173d26'], ['#143122', '#0a1d13'], '#2f6b4a', '#2fd48a'),
      staging: {
        hero: { left: 12, bottom: 10, width: 22 },
        boss: { left: 66, bottom: 34, width: 20 },
        heroShadow: { left: 15.5, bottom: 8.5, width: 15 },
        bossShadow: { left: 70, bottom: 26, width: 13 },
      },
    },
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
    theme: {
      ...theme('treasury', false, ['#241503', '#332008', '#40290e'], ['#33230a', '#1e1304'], '#6b5220', '#ffd166'),
      staging: {
        hero: { left: 12, bottom: 10, width: 22 },
        boss: { left: 66, bottom: 34, width: 20 },
        heroShadow: { left: 15.5, bottom: 8.5, width: 15 },
        bossShadow: { left: 70, bottom: 26, width: 13 },
      },
    },
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
    theme: {
      ...theme('garden', true, ['#0b1f33', '#12324a', '#173b52'], ['#14331f', '#0a1f12'], '#7dd4a0', '#a3e26a'),
      staging: {
        hero: { left: 12, bottom: 10, width: 22 },
        boss: { left: 66, bottom: 34, width: 20 },
        heroShadow: { left: 15.5, bottom: 8.5, width: 15 },
        bossShadow: { left: 70, bottom: 26, width: 13 },
      },
    },
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
    theme: {
      ...theme('owlery', false, ['#211224', '#301b31', '#3c243c'], ['#301b31', '#1c0f1e'], '#5a3b58', '#e8c69d'),
      staging: {
        hero: { left: 12, bottom: 10, width: 22 },
        boss: { left: 66, bottom: 34, width: 20 },
        heroShadow: { left: 15.5, bottom: 8.5, width: 15 },
        bossShadow: { left: 70, bottom: 26, width: 13 },
      },
    },
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
    theme: {
      ...theme('stars', false, ['#060d26', '#0b1638', '#101d47'], ['#101d47', '#080f28'], '#27407c', '#8fb4ff'),
      staging: {
        hero: { left: 12, bottom: 10, width: 22 },
        boss: { left: 66, bottom: 34, width: 20 },
        heroShadow: { left: 15.5, bottom: 8.5, width: 15 },
        bossShadow: { left: 70, bottom: 26, width: 13 },
      },
    },
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
    theme: {
      ...DEFAULT_THEME,
      staging: {
        hero: { left: 12, bottom: 10, width: 22 },
        boss: { left: 66, bottom: 34, width: 20 },
        heroShadow: { left: 15.5, bottom: 8.5, width: 15 },
        bossShadow: { left: 70, bottom: 26, width: 13 },
      },
    },
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
    theme: {
      ...theme('brooms', true, ['#2b1230', '#47204a', '#5f2f4a'], ['#3a2030', '#22101c'], '#f0a35e', '#f0a35e'),
      staging: {
        hero: { left: 12, bottom: 10, width: 22 },
        boss: { left: 66, bottom: 34, width: 20 },
        heroShadow: { left: 15.5, bottom: 8.5, width: 15 },
        bossShadow: { left: 70, bottom: 26, width: 13 },
      },
    },
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
    theme: {
      ...theme('clock', false, ['#0e1a24', '#152736', '#1c3244'], ['#152736', '#0b1620'], '#2f5468', '#5fc4d4'),
      staging: {
        hero: { left: 12, bottom: 10, width: 22 },
        boss: { left: 66, bottom: 34, width: 20 },
        heroShadow: { left: 15.5, bottom: 8.5, width: 15 },
        bossShadow: { left: 70, bottom: 26, width: 13 },
      },
    },
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
    theme: {
      ...theme('music', false, ['#26102e', '#38173f', '#471e4c'], ['#38173f', '#200d26'], '#6b3a70', '#ff8fd0'),
      staging: {
        hero: { left: 12, bottom: 10, width: 22 },
        boss: { left: 66, bottom: 34, width: 20 },
        heroShadow: { left: 15.5, bottom: 8.5, width: 15 },
        bossShadow: { left: 70, bottom: 26, width: 13 },
      },
    },
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
    theme: {
      ...theme('rooftops', true, ['#0a0f1e', '#111a30', '#1a2540'], ['#141b2c', '#0b101c'], '#8fb4ff', '#5fc4d4'),
      staging: {
        hero: { left: 12, bottom: 10, width: 22 },
        boss: { left: 66, bottom: 34, width: 20 },
        heroShadow: { left: 15.5, bottom: 8.5, width: 15 },
        bossShadow: { left: 70, bottom: 26, width: 13 },
      },
    },
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

/**
 * Expanded backstories for the Who's Who screen (PRODUCT.md §4.6): 2-3
 * kid-friendly sentences per boss, building on the one-line BOSS_BIOS above
 * and the character notes in ART_PROMPTS.md. Reading age ~8, no first person.
 */
export const BOSS_STORIES: Record<number, string> = {
  2: 'Nix is Head Prefect of Mischief, which mostly means confiscating dungbombs — and then keeping every single one for herself. She hides comics inside a hollowed-out copy of “Advanced Hexes” and never gets caught reading them. Her cat Inkblot once walked straight through a wet inkwell and across a whole term of homework, and Nix framed the pawprints instead of cleaning them off.',
  3: 'Fern was raised out in the herb garden by a patch of talking brambles, so she speaks fluent Plant long before she ever learned fluent People. She can tell a toadstool’s mood from ten paces and grows her own snacks straight out of her sleeves. A ladybird named Dot rides everywhere on her shoulder and votes on all her important decisions.',
  4: 'Willow delivers the night post and hasn’t slept properly since last Tuesday, though she’d never admit it slows her down. She can nap standing up, mid-sentence, with her eyes half open, and somehow still sorts every letter correctly. Her owl Hoots does most of the actual flying while Willow dozes on the broom behind him.',
  5: 'Juniper is a potion prodigy whose fringe has been singed clean off more times than the academy can count. She keeps three bottled potions on a bandolier at all times, just in case of emergency snacks or emergency explosions. Nobody has ever seen her lab tidy, and nobody has ever seen one of her potions fail twice.',
  6: 'Luna sleeps through breakfast, lunch and most of dinner, saving all her energy for naming constellations after midnight. She keeps a rolled-up star chart tucked under one arm at all times, even in the bath. Two tiny moons orbit her hat for reasons the academy has stopped trying to explain.',
  7: 'Opal is Head Girl, three medals deep, and has never once lost her gold hand-mirror — not even the time the staircases rearranged themselves overnight. She keeps her trophies polished and her opinions sharper still. Her fluffy cat Marmalade wears a tiny purple bow and judges everyone’s homework from the windowsill.',
  8: 'Bramble has won the Midnight Cup three years running and crashed spectacularly every single time, landing in the hedge with a grin instead of a wince. She wears a plaster on one knee as a badge of honour, not an injury. Her bat Turbo grips the broom tail through every loop-the-loop and screeches with delight the whole way down.',
  9: 'Tilda winds every clock in the academy at dawn, and has never once been late in her life — not even by a second. She carries a spare gear in her pocket at all times, just in case one of the tower clocks gets any ideas. A tiny mechanical mouse named Cog rides on her hat, ticking along in perfect time with her.',
  10: 'Marigold keeps the dragon-hoard ledgers and can count coins in her sleep, which is useful, because she often does exactly that. She pays for everything in exact change and has never once been short a knut. Three gold coins follow her everywhere, glowing softly, like they simply refuse to leave her side.',
  11: 'Aria enchanted her old hairbrush into a microphone and now practises encores well past midnight, whether anyone is listening or not. She dreams in three-part harmony and hums the academy anthem as a warm-up before breakfast. Her cat Tempo wears a tiny bow and provides backing vocals, whether he means to or not.',
  12: 'Storm runs the secret Midnight Racing Club and bottles actual lightning for fun, storing the bolts in corked jars along her belt. One streak of her hair turned electric-blue after a race gone wonderfully wrong, and she has worn it proudly ever since. Her bat Zigzag flies beside her trailing sparks, tracing the same jagged path lightning takes across the sky.',
}

export function locationForTable(table: number): MapLocation {
  return MAP_LOCATIONS.find((loc) => loc.table === table) ?? MAP_LOCATIONS[0]
}

export const EXAM_ROUNDS = 14
