import { sfx } from '../../../lib/audio'
import { useSpellDuelStore } from '../state/store'

/** Global mute — rendered by the layout so it's reachable on every screen. */
export function SoundToggle() {
  const soundOn = useSpellDuelStore((s) => s.soundOn)
  const toggleSound = useSpellDuelStore((s) => s.toggleSound)
  return (
    <button
      className="sound-toggle"
      onClick={() => {
        toggleSound()
        sfx.tap()
      }}
      aria-label={soundOn ? 'Turn sound off' : 'Turn sound on'}
    >
      {soundOn ? '🔊' : '🔇'}
    </button>
  )
}
