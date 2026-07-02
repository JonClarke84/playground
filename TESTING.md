# On-tablet smoke test

Run this checklist on the actual Samsung tablet before handing the game over.
Desktop Chrome is verified continuously; this list covers what only a real
device can prove.

## Getting it on the tablet

Until it's deployed somewhere, run the dev server LAN-exposed and open it in
Chrome on the tablet:

```sh
npm run dev -- --port 5175 --strictPort --host
# then on the tablet: http://<laptop-LAN-IP>:5175
```

(`ipconfig getifaddr en0` prints the laptop's LAN IP. Both devices must be on
the same Wi-Fi. For the PWA install test you need the production build —
`npm run build && npx vite preview --host` — because the service worker is
not registered by the dev server.)

## Checklist

### Install & offline
- [ ] Chrome shows "Add to home screen"; installed app launches full-screen
      (no browser chrome), landscape, with the crystal icon
- [ ] With Wi-Fi off, the installed app still loads and plays

### Touch & feel
- [ ] All targets comfortably tappable with a child's fingers (answer
      bubbles, table chips, dressing-room options, map nodes)
- [ ] No accidental double-fires on quick taps; no 300ms tap delay
- [ ] Long-press on the home-screen star (3s) opens the parents' corner;
      a child idly poking it does not
- [ ] Text selection/magnifier does not trigger when dragging a finger

### Audio
- [ ] First tap unlocks sound (Android requires a user gesture — SFX fire
      inside tap handlers, so the first cast should already chime)
- [ ] Mute toggle on the title screen silences everything and persists

### Performance
- [ ] Cast sequence (beam → explosion → shake) holds ~60fps
- [ ] Finale fireworks don't stutter; device doesn't heat up over a
      10-minute session
- [ ] Battery drain over 20 minutes is unremarkable

### Orientations
- [ ] Landscape: designed-for layout, everything visible
- [ ] Portrait: playable and un-broken (spec requires usable, not perfect)

### Persistence
- [ ] Play a duel, force-close the app, relaunch: dust/stars/costumes intact
- [ ] Restart the tablet, relaunch: still intact
- [ ] Parents' corner → Export copies a backup blob to the clipboard

### The child test
- [ ] She finds the Hint Wand without being told (Pip introduces it on the
      first duel; a nudge appears after two misses on one question)
- [ ] She can get from home screen → duel unaided
- [ ] The 4-year-old can't wander into the parents' corner
