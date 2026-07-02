/**
 * The academy-year map (PRODUCT.md §4.6): one location per table, each with
 * a named rival examiner. Suggested order only — nothing is locked.
 */

export interface RivalPalette {
  hair: string
  dress: string
  dressDark: string
  hat: string
  hatDark: string
  band: string
}

export const NIX_PALETTE: RivalPalette = {
  hair: '#e14fa0',
  dress: '#6a3bb5',
  dressDark: '#552c93',
  hat: '#452a6d',
  hatDark: '#38205c',
  band: '#ff7ac3',
}

const JUNIPER: RivalPalette = {
  hair: '#17b273',
  dress: '#2c4a9e',
  dressDark: '#1f3778',
  hat: '#1d3358',
  hatDark: '#152743',
  band: '#2fd48a',
}

const MARIGOLD: RivalPalette = {
  hair: '#f0b429',
  dress: '#1fb6c9',
  dressDark: '#128a99',
  hat: '#0f6d7a',
  hatDark: '#0a525c',
  band: '#ffd166',
}

const BELLADONNA: RivalPalette = {
  hair: '#b78bff',
  dress: '#4a2472',
  dressDark: '#38195a',
  hat: '#2c1347',
  hatDark: '#200e35',
  band: '#cdaeff',
}

export interface MapLocation {
  table: number
  name: string
  rival: string
  palette: RivalPalette
}

export const MAP_LOCATIONS: MapLocation[] = [
  { table: 2, name: 'The Library', rival: 'Nix', palette: NIX_PALETTE },
  { table: 5, name: 'Potions Lab', rival: 'Juniper', palette: JUNIPER },
  { table: 10, name: 'The Treasury', rival: 'Marigold', palette: MARIGOLD },
  { table: 3, name: 'Herb Garden', rival: 'Belladonna', palette: BELLADONNA },
  { table: 4, name: 'The Owlery', rival: 'Nix', palette: NIX_PALETTE },
  { table: 6, name: 'Star Tower', rival: 'Juniper', palette: JUNIPER },
  { table: 7, name: 'Great Hall', rival: 'Marigold', palette: MARIGOLD },
  { table: 8, name: 'Broom Yard', rival: 'Belladonna', palette: BELLADONNA },
  { table: 9, name: 'Clock Tower', rival: 'Nix', palette: NIX_PALETTE },
  { table: 11, name: 'Music Room', rival: 'Juniper', palette: JUNIPER },
  { table: 12, name: 'The Rooftops', rival: 'Marigold', palette: MARIGOLD },
]

export function locationForTable(table: number): MapLocation {
  return MAP_LOCATIONS.find((loc) => loc.table === table) ?? MAP_LOCATIONS[0]
}

export const EXAM_ROUNDS = 14
