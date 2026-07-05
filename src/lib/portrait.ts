import type { AvatarConfig } from '../games/spell-duel/avatar/avatarTypes'
import anchorUrl from '../assets/art/anchor.jpg'

/**
 * "Finalise portrait": a Gemini-painted picture of the player's exact avatar,
 * generated client-side against the bundled style anchor and chroma-keyed to
 * a transparent cutout in-browser.
 *
 * Storage here deliberately uses plain localStorage under 'playground-...'
 * keys (a hyphen, not the 'playground:' colon-namespace from lib/storage.ts).
 * The backup-rotation logic in storage.ts only rotates/backs-up keys that
 * start with 'playground:' — keeping the API key and the portrait (which can
 * be a large data URL) out of that system on purpose, so a ~300KB portrait
 * doesn't get copied into three rotating backup slots every 20 hours.
 */

const KEY_STORAGE = 'playground-gemini-key'
const PORTRAIT_STORAGE = 'playground-portrait'

export function getGeminiKey(): string | null {
  return localStorage.getItem(KEY_STORAGE)
}

export function setGeminiKey(key: string): void {
  localStorage.setItem(KEY_STORAGE, key)
}

export function clearGeminiKey(): void {
  localStorage.removeItem(KEY_STORAGE)
}

export function loadPortrait(): string | null {
  return localStorage.getItem(PORTRAIT_STORAGE)
}

export function savePortrait(dataUrl: string): boolean {
  try {
    localStorage.setItem(PORTRAIT_STORAGE, dataUrl)
    return true
  } catch {
    return false
  }
}

export function clearPortrait(): void {
  localStorage.removeItem(PORTRAIT_STORAGE)
}

/** Humanise an option id: 'crownbraid' stays readable, 'roseGold' → 'rose gold'. */
function humanise(id: string): string {
  return id.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[-_]/g, ' ').toLowerCase()
}

const SKIN_WORDS: Record<string, string> = {
  porcelain: 'fair porcelain skin',
  peach: 'peachy skin',
  honey: 'warm honey-tan skin',
  tan: 'sun-warmed tan skin',
  brown: 'rich brown skin',
  deep: 'deep brown skin',
  // 'emerald' is the green "Elphaba-style" skin tone — the in-game nickname for it.
  emerald: 'striking emerald-green, Elphaba-style skin',
}

const HAIR_STYLE_WORDS: Record<string, string> = {
  waves: 'long wavy hair',
  bun: 'hair in a high round bun',
  braids: 'two long braids',
  bob: 'a sleek chin-length bob',
  curls: 'a big cloud of bouncy curls',
  ponytail: 'a high swishy ponytail',
  spacebuns: 'hair in two round space buns',
  crownbraid: 'a braid wrapped across her crown',
  fringe: 'long straight hair with a blunt fringe',
}

const HAIR_COLOUR_WORDS: Record<string, string> = {
  black: 'jet black',
  brown: 'chestnut brown',
  chestnut: 'rich chestnut',
  blonde: 'sunny blonde',
  ginger: 'warm ginger',
  pink: 'bubblegum pink',
  lilac: 'soft lilac',
  emerald: 'emerald green',
  emeraldgleam: 'gleaming emerald',
  silver: 'shining silver',
  firecopper: 'fiery copper',
  lavender: 'gentle lavender',
  rosegold: 'rose gold',
  midnightblue: 'deep midnight blue',
}

const HAT_WORDS: Record<string, string> = {
  none: '',
  pointed: 'a classic pointed witch hat with a buckled band',
  widebrim: 'a glamorous wide-brimmed witch hat with a pink ribbon',
  tiara: 'a sparkling gold tiara',
  flowers: 'a flower crown',
  beret: 'a lilac artist beret',
  crown: 'a golden royal crown with jewels',
  moonhat: 'a midnight-blue pointed hat with a gold crescent moon',
  tophat: 'a smart dark top hat',
  halo: 'a floating golden halo',
  bowhat: 'a headband with a big pink bow',
}

const OUTFIT_WORDS: Record<string, string> = {
  academy: 'academy dress with gold buttons',
  starcape: 'dress with a starry cape',
  ruffles: 'ruffled party dress with a waist bow',
  coat: 'smart tailored double-breasted coat',
  jumpsuit: 'pop-star jumpsuit with a gold belt',
  robe: 'flowing apprentice robe with a crescent moon emblem',
  galaxy: 'midnight galaxy dress scattered with tiny stars',
  tutu: 'ballet dress with a layered tutu skirt',
  regal: 'floor-length royal gown with a gold sash',
  storm: 'asymmetric storm coat with lightning-bolt gold trim',
}

const OUTFIT_COLOUR_WORDS: Record<string, string> = {
  emerald: 'emerald green',
  pink: 'bubblegum pink',
  gold: 'radiant gold',
  lilac: 'soft lilac',
  midnight: 'deep midnight',
  teal: 'bright teal',
  sunGold: 'sun gold',
  silver: 'moonlit silver',
  rose: 'rose blush',
  seaTeal: 'sea teal',
  violet: 'violet dusk',
  jetBlack: 'jet black',
}

const ACCESSORY_WORDS: Record<string, string> = {
  wand: 'holding a golden star wand',
  broom: 'holding a broomstick',
  cat: 'with a black cat beside her',
  owl: 'with a little owl friend on her shoulder',
  spellbook: 'holding an emerald spellbook with a gold star',
  pendant: 'wearing a gold star pendant',
  starwand: 'holding a glowing star wand',
  moonwand: 'holding a crescent-moon wand',
  heartwand: 'holding a pink heart wand',
  bunny: 'with a white bunny beside her',
  crystalball: 'with a glowing crystal ball floating by her hand',
}

const EFFECT_WORDS: Record<string, string> = {
  none: '',
  sparkles: 'surrounded by twinkling gold sparkles',
  fireflies: 'surrounded by drifting fireflies',
  butterflies: 'surrounded by pink and lilac butterflies',
  notes: 'surrounded by floating music notes',
  snow: 'surrounded by gently falling snowflakes',
  stars: 'surrounded by orbiting little stars',
  bubbles: 'surrounded by floating bubbles',
}

/**
 * Human-readable outfit description built from the avatar's id fields,
 * returned as one flowing, comma-separated descriptive sentence fragment
 * (not a bullet list) suitable for concatenating into a prose prompt.
 */
export function describeAvatar(config: AvatarConfig): string {
  const parts: string[] = []

  parts.push(SKIN_WORDS[config.skin] ?? `${humanise(config.skin)} skin`)

  const hairStyle = HAIR_STYLE_WORDS[config.hairStyle] ?? `${humanise(config.hairStyle)} hair`
  const hairColour = HAIR_COLOUR_WORDS[config.hairColour] ?? humanise(config.hairColour)
  parts.push(`${hairStyle}, dyed a ${hairColour} colour`)

  const hat = HAT_WORDS[config.hat] ?? `a ${humanise(config.hat)} hat`
  parts.push(hat === '' ? 'no headwear' : `wearing ${hat}`)

  const outfit = OUTFIT_WORDS[config.outfit] ?? `${humanise(config.outfit)} outfit`
  const outfitColour = OUTFIT_COLOUR_WORDS[config.outfitColour] ?? humanise(config.outfitColour)
  parts.push(`dressed in a ${outfitColour} ${outfit}`)

  parts.push(ACCESSORY_WORDS[config.accessory] ?? `with a ${humanise(config.accessory)}`)

  const effect = EFFECT_WORDS[config.effect ?? 'none'] ?? ''
  if (effect !== '') parts.push(effect)

  return parts.join(', ')
}

async function blobToBase64(blob: Blob): Promise<string> {
  const buffer = await blob.arrayBuffer()
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

async function anchorBase64(): Promise<string> {
  const response = await fetch(anchorUrl)
  const blob = await response.blob()
  return blobToBase64(blob)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Deep-scans the interactions response for a base64 image payload, mirroring
 * ~/.claude/skills/gemini-image/generate.mjs's parser: try the primary
 * output_image.data shape first, then a stack-based DFS for any string
 * longer than 5000 chars living under a key literally named 'data', 'image'
 * or 'b64_json', skipping 'signature'/'thought_signature' keys. Schema
 * variance across Gemini interactions responses means this must not be
 * simplified away.
 */
function findImageData(json: unknown): string | null {
  if (isRecord(json)) {
    const outputImage = json.output_image
    if (isRecord(outputImage) && typeof outputImage.data === 'string') {
      return outputImage.data
    }
  }

  const stack: unknown[] = [json]
  while (stack.length > 0) {
    const node = stack.pop()
    if (Array.isArray(node)) {
      stack.push(...node)
      continue
    }
    if (isRecord(node)) {
      for (const [key, value] of Object.entries(node)) {
        if (key === 'signature' || key === 'thought_signature') continue
        if (
          typeof value === 'string' &&
          value.length > 5000 &&
          (key === 'data' || key === 'image' || key === 'b64_json')
        ) {
          return value
        }
        stack.push(value)
      }
    }
  }
  return null
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('portrait: failed to decode generated image'))
    img.src = src
  })
}

const MAX_PORTRAIT_SIDE = 640
const CHROMA_KEY_DISTANCE = 60

/**
 * Downscales the generated JPEG (longer side capped at MAX_PORTRAIT_SIDE,
 * aspect ratio preserved) and chroma-keys the flat background out to
 * transparency, sampling the background colour from pixel (5,5) of the
 * canvas itself (robust to slight variance from the prompted colour, rather
 * than hardcoding magenta).
 */
async function keyAndShrink(jpegBase64: string): Promise<string> {
  const img = await loadImage(`data:image/jpeg;base64,${jpegBase64}`)

  const longSide = Math.max(img.width, img.height)
  const scale = longSide > MAX_PORTRAIT_SIDE ? MAX_PORTRAIT_SIDE / longSide : 1
  const width = Math.round(img.width * scale)
  const height = Math.round(img.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (context === null) {
    throw new Error('portrait: could not create a 2D canvas context')
  }
  context.drawImage(img, 0, 0, width, height)

  const imageData = context.getImageData(0, 0, width, height)
  const pixels = imageData.data

  const sampleIndex = 4 * (5 * width + 5)
  const bgR = pixels[sampleIndex]
  const bgG = pixels[sampleIndex + 1]
  const bgB = pixels[sampleIndex + 2]

  for (let i = 0; i < pixels.length; i += 4) {
    const dr = pixels[i] - bgR
    const dg = pixels[i + 1] - bgG
    const db = pixels[i + 2] - bgB
    const distance = Math.sqrt(dr * dr + dg * dg + db * db)
    if (distance < CHROMA_KEY_DISTANCE) {
      pixels[i + 3] = 0
    }
  }

  context.putImageData(imageData, 0, 0)
  return canvas.toDataURL('image/png')
}

/**
 * Generates a Gemini portrait for the given avatar config, chroma-keys the
 * background to transparency, and returns a PNG data URL. Throws a clear
 * Error on any failure (missing key, network/HTTP failure, unparseable
 * response, or canvas failure) — callers should catch and show a friendly
 * message rather than letting this reject silently.
 */
export async function generatePortrait(config: AvatarConfig): Promise<string> {
  const key = getGeminiKey()
  if (key === null) {
    throw new Error('portrait: no Gemini API key configured')
  }

  const prompt =
    'Same illustration style, proportions and lighting as the reference image. ' +
    `A young witch student heroine: ${describeAvatar(config)}, standing proudly, full body, ` +
    'single character, on a plain solid magenta #FF00FF background, no shadows outside the ' +
    "character, premium children's game character art, no text."

  const anchorData = await anchorBase64()

  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/interactions', {
    method: 'POST',
    headers: {
      'x-goog-api-key': key,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gemini-3.1-flash-image',
      input: [
        { type: 'text', text: prompt },
        { type: 'image', mime_type: 'image/jpeg', data: anchorData },
      ],
      response_format: {
        type: 'image',
        mime_type: 'image/jpeg',
        aspect_ratio: '1:1',
        image_size: '1K',
      },
    }),
  })

  if (!response.ok) {
    throw new Error(`portrait: Gemini request failed with status ${response.status}`)
  }

  const json: unknown = await response.json()
  const jpegBase64 = findImageData(json)
  if (jpegBase64 === null) {
    throw new Error('portrait: no image data found in Gemini response')
  }

  return keyAndShrink(jpegBase64)
}
