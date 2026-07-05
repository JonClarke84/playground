import { beforeEach, describe, expect, it } from 'vitest'
import {
  clearGeminiKey,
  clearPortrait,
  describeAvatar,
  generatePortrait,
  getGeminiKey,
  loadPortrait,
  savePortrait,
  setGeminiKey,
} from './portrait'
import { DEFAULT_AVATAR } from '../games/spell-duel/avatar/avatarTypes'
import type { AvatarConfig } from '../games/spell-duel/avatar/avatarTypes'

beforeEach(() => {
  localStorage.clear()
})

describe('describeAvatar', () => {
  it('produces a non-empty prose fragment for the default avatar', () => {
    const description = describeAvatar(DEFAULT_AVATAR)
    expect(typeof description).toBe('string')
    expect(description.length).toBeGreaterThan(0)
  })

  it('describes the emerald ("Elphaba") skin tone clearly as green', () => {
    const config: AvatarConfig = { ...DEFAULT_AVATAR, skin: 'emerald' }
    const description = describeAvatar(config)
    expect(description.toLowerCase()).toMatch(/green|emerald/)
  })

  it('combines hair style and hair colour into one phrase', () => {
    const config: AvatarConfig = {
      ...DEFAULT_AVATAR,
      hairStyle: 'spacebuns',
      hairColour: 'firecopper',
    }
    const description = describeAvatar(config)
    expect(description.toLowerCase()).toContain('space buns')
    expect(description.toLowerCase()).toMatch(/copper/)
  })

  it('describes no headwear when hat is none', () => {
    const config: AvatarConfig = { ...DEFAULT_AVATAR, hat: 'none' }
    const description = describeAvatar(config)
    expect(description.toLowerCase()).not.toContain('undefined')
  })

  it('omits any sparkle-effect clause when effect is none', () => {
    const withNone = describeAvatar({ ...DEFAULT_AVATAR, effect: 'none' })
    const withoutEffect = describeAvatar({ ...DEFAULT_AVATAR, effect: undefined })
    expect(withNone.toLowerCase()).not.toMatch(/sparkle|firefl|butterfl|snow|stars|bubbles|notes/)
    expect(withoutEffect.toLowerCase()).not.toMatch(/sparkle|firefl|butterfl|snow|stars|bubbles|notes/)
  })

  it('includes a sparkle-effect clause when an effect is set', () => {
    const description = describeAvatar({ ...DEFAULT_AVATAR, effect: 'butterflies' })
    expect(description.toLowerCase()).toContain('butterfl')
  })

  it('mentions the outfit and accessory', () => {
    const config: AvatarConfig = {
      ...DEFAULT_AVATAR,
      outfit: 'galaxy',
      outfitColour: 'midnight',
      accessory: 'crystalball',
    }
    const description = describeAvatar(config)
    expect(description.toLowerCase()).toMatch(/galaxy/)
    expect(description.toLowerCase()).toMatch(/crystal ball/)
  })

  it('returns comma-separated clauses, not a bullet list', () => {
    const description = describeAvatar(DEFAULT_AVATAR)
    expect(description).not.toMatch(/^[-*]/)
    expect(description).toContain(',')
  })
})

describe('getGeminiKey / setGeminiKey / clearGeminiKey', () => {
  it('round-trips a key via localStorage under the exact key "playground-gemini-key"', () => {
    expect(getGeminiKey()).toBeNull()
    setGeminiKey('abc123')
    expect(getGeminiKey()).toBe('abc123')
    expect(localStorage.getItem('playground-gemini-key')).toBe('abc123')
  })

  it('clearGeminiKey removes the stored key', () => {
    setGeminiKey('abc123')
    clearGeminiKey()
    expect(getGeminiKey()).toBeNull()
    expect(localStorage.getItem('playground-gemini-key')).toBeNull()
  })

  it('the gemini key storage key does not start with the playground: prefix', () => {
    setGeminiKey('abc123')
    let found = false
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key !== null && key.startsWith('playground:')) found = true
    }
    expect(found).toBe(false)
  })
})

describe('loadPortrait / savePortrait / clearPortrait', () => {
  const DATA_URL = 'data:image/png;base64,abc123=='

  it('loadPortrait returns null when nothing is stored', () => {
    expect(loadPortrait()).toBeNull()
  })

  it('round-trips a data URL under the exact key "playground-portrait"', () => {
    const ok = savePortrait(DATA_URL)
    expect(ok).toBe(true)
    expect(loadPortrait()).toBe(DATA_URL)
    expect(localStorage.getItem('playground-portrait')).toBe(DATA_URL)
  })

  it('clearPortrait removes the stored portrait', () => {
    savePortrait(DATA_URL)
    clearPortrait()
    expect(loadPortrait()).toBeNull()
  })

  it('savePortrait returns false on storage failure without throwing', () => {
    const realLocalStorage = window.localStorage
    const throwingStorage: Storage = {
      length: 0,
      clear: () => {},
      getItem: () => null,
      key: () => null,
      removeItem: () => {},
      setItem: () => {
        throw new Error('QuotaExceededError')
      },
    }
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: throwingStorage,
    })
    try {
      expect(savePortrait(DATA_URL)).toBe(false)
    } finally {
      Object.defineProperty(window, 'localStorage', {
        configurable: true,
        value: realLocalStorage,
      })
    }
  })

  it('the portrait storage key does not start with the playground: prefix', () => {
    savePortrait(DATA_URL)
    let found = false
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key !== null && key.startsWith('playground:')) found = true
    }
    expect(found).toBe(false)
  })
})

describe('generatePortrait', () => {
  it('is exported as a function', () => {
    expect(typeof generatePortrait).toBe('function')
  })

  it('throws a clear error when no API key is configured', async () => {
    await expect(generatePortrait(DEFAULT_AVATAR)).rejects.toThrow(/key/i)
  })
})
