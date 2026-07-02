# Playground — Product Description

**Status:** Source of truth. All build decisions defer to this document. Changes to scope or behaviour should be reflected here first.

---

## 1. Vision

A games playground web app for two children (ages 4 and 8) to use on a Samsung tablet in Chrome. It presents a friendly list of games; tapping one loads it full-screen. Games are built for fun first — any learning is embedded in the mechanics, never presented as "maths practice".

The launch title is **Spell Duel**, a Wicked-inspired multiplication game for the 8-year-old. Its pedagogical goal: teach her to *work out* a multiplication by decomposing it into known facts (7×6 = 5×6 + 2×6), rather than relying on rote recall. Decomposition is framed as a magic power (the Hint Wand), not a maths method.

### Product principles
1. **Fun first, learning hidden.** No scores framed as test results, no "wrong answer" shaming, no timers that create anxiety by default.
2. **Touch-native.** Every interaction designed for fingers on a tablet — big targets, drag/tap, no hover states, no keyboard required.
3. **It must look GREAT.** Production-quality art direction (see §8). No placeholder-looking UI. If a screen looks unfinished, it isn't done.
4. **Failure is funny, never punishing.** Wrong answers fizzle comically and invite another try. Progress is only ever additive.
5. **Session-safe.** Everything persists locally. Closing the tab, restarting the tablet, or switching games never loses progress.

---

## 2. Audience & platform

| | |
|---|---|
| Primary user | Daughter, age 8, learning times tables (interests: Wicked, British history, fashion, dance, pop) |
| Secondary user | Son, age 4 (future games; the shell must not block him — large icons, no reading required to navigate) |
| Device | Samsung tablets (Android), landscape-primary, Chrome browser |
| Viewport targets | 1280×800 and 2560×1600 (typical Samsung Tab range); must remain usable 960px–2800px wide, landscape and portrait |
| Input | Touch only. Mouse works for development but is never required for any interaction |
| Network | Must work fully offline after first load (no server, no accounts, no external calls at runtime) |

---

## 3. The Playground shell

The app the children see first.

### 3.1 Home screen
- A grid of large, illustrated **game cards** (minimum tap target ~200×200px). Each card: game artwork, title, and — where relevant — the player's avatar/progress peeking through (e.g. Spell Duel card shows her witch avatar).
- Launch scope: one real game (Spell Duel) plus 2–3 "Coming soon" cards with fun locked artwork, so the screen reads as a *playground*, not a single-game app.
- No settings, menus, or text-heavy chrome on the home screen. A small, unobtrusive parent-corner entry (see §3.3).

### 3.2 Game loading
- Tapping a card plays a short transition (card zooms/portal opens) and mounts the game full-screen.
- Every game has a consistent, always-visible **Home button** (top-left, icon-only) to return to the shell. Returning home never loses in-game progress.

### 3.3 Parents' corner
- Reached via a deliberately child-unfriendly interaction (e.g. long-press 3 seconds on a small icon) — not hidden for security, just to avoid accidental taps.
- Contents: per-child progress summary (which tables attempted, hint usage trends — useful signal for what she's finding hard), reset options, and a data export/import (see §7.4).

---

## 4. Game 1: Spell Duel

### 4.1 Fantasy & framing
She is a witch-in-training at a magical academy (Wicked-adjacent: emerald greens, pinks, art-deco flourishes — legally distinct, no trademarked names/characters). A mischievous rival witch keeps casting silly enchantments — frogs raining in the library, the teacher floating out of a window, all the shoes in the academy dancing by themselves. She counters each enchantment by casting spells. **Casting a spell = answering a multiplication.**

A friendly flying-monkey-style sidekick (call him **Pip**) provides encouragement, hints, and comic reactions. Pip never says anything negative.

### 4.2 First run: avatar creation
Before her first duel she creates her witch:
- **Layered paper-doll system**: skin tone, face/expression, hair (style + colour), hat, outfit, accessory (wand/broom/familiar), colour palette.
- 5–8 options per layer at launch; more unlock through play (see §4.7).
- Big swipeable option rows, live full-size preview, randomise ("Surprise me!") button.
- The avatar appears everywhere: home-screen card, duel scenes, victory animations, progress map.
- Editable any time from the game's title screen ("Dressing room").

### 4.3 Core loop (one duel round)
1. Rival casts an enchantment — short, funny animation (2–3s, skippable by tapping).
2. A **spell crystal** appears showing the multiplication, e.g. **7 × 6**, rendered large and centred.
3. Four big **answer bubbles** float below (one correct, three distractors — see §4.5).
4. She taps an answer:
   - **Correct** → the crystal ignites, a spell blast counters the enchantment (frogs turn into bubbles, teacher floats gently down), Pip celebrates. Magic meter fills one notch.
   - **Wrong** → the spell **fizzles comically** (sparkles droop, a sad little *pfffft*, Pip pulls a face). The tapped bubble pops and disappears; she tries again with the remaining bubbles. No penalty beyond slightly less sparkle on the eventual cast.
5. After N rounds (default 10) the duel ends in a **showpiece finale**: the magic meter's accumulated charge powers one big spectacular spell, scaled to how full the meter is. Even a rough duel ends in *some* fireworks.

### 4.4 The Hint Wand (the pedagogical heart)
Always available beside the crystal — a glowing wand button, framed as a *power*, not help.

Tapping it **cracks the spell crystal into two smaller crystals** whose products sum to the target, choosing splits she's likely to know:

- Split priority for `a × b`: split the *harder* factor into anchor facts —
  1. `(5 + r) × b` when a > 5 (5s are anchors) — e.g. 7×6 → **5×6 + 2×6**
  2. `(10 − r) × b` when a is 9 — e.g. 9×6 → **10×6 − 1×6** (subtraction split, introduced only after she's seen additive splits)
  3. Doubling when a is even — e.g. 6×8 → **3×8 doubled**
- Each small crystal reveals its own product when tapped (with a quick array-dots flash — a 5×6 grid of sparks — so the *why* is visible, not just the number).
- She then combines them: the two revealed numbers appear with a `+` and she taps the correct total from the answer bubbles as normal.
- **Cost: nothing punitive.** A hinted cast is slightly less sparkly and fills the meter one half-notch instead of one. The strategy for hard spells *is* decomposition — that's the point.
- Pip occasionally narrates the move in kid language: *"Ooh, sneaky — two little spells beat one big one!"*

A second tap of the wand (rare, for genuinely stuck moments) lights up the array-dots view of the full multiplication for counting/skip-counting.

### 4.5 Question generation & difficulty
- **Table selection:** before a duel she picks which tables to practise from big toggle chips: **2–12**, multi-select, plus a "Mix" that weights toward her weaker facts (see below). Selection persists between sessions.
- **Fact tracking:** every fact (e.g. 7×6) tracks attempts, correct-first-try, and hint usage. A simple mastery score per fact drives:
  - **Adaptive mixing:** duels re-ask shaky facts sooner (spaced repetition-lite), sprinkle mastered facts as confidence wins.
  - Commutativity is respected: 6×7 and 7×6 update the same fact, but both orderings are shown over time.
- **Distractors** are pedagogically chosen, not random: off-by-one-table errors (7×6 → 36, 48), the addition trap (13), digit transposition, near-misses (41). Never absurd values — wrong answers should *feel* plausible so a correct answer means something.
- **No timer by default.** An optional "Lightning round" mode (parent corner toggle or unlocked later) adds gentle time pressure for facts already mastered — never for new material.

### 4.6 Duel structure & progression
- **Academy year map:** a progression map through the academy (library → potions lab → grand hall → rooftops…). Each location is a themed set of duels; each *table* has an associated location and ends in a **named rival duel** (the "exam"), a slightly longer duel with a celebratory cutscene on completion.
- Suggested order 2, 5, 10 → 3, 4 → 6, 7, 8, 9 → 11, 12, but **nothing is locked**: the map suggests, the table-picker always allows any of 2–12. (She's mid-journey on tables at school; the game must never gate the table she needs this week.)
- Stars per table (1–3) based on mastery coverage, shown on the map. Stars only ever go up.

### 4.7 Rewards
- **Costume pieces** for the avatar: each completed duel awards sparkle-dust; rival duels and mastery milestones award specific items (hats, capes, wand skins, familiars — the fashion interest is the reward loop).
- **Spellbook:** a collection screen where every mastered fact appears as an illustrated spell card, including the splits she's used (7×6 shows its 5×6+2×6 crack pattern). Collecting the book *is* seeing her own progress.
- No consumables, no currencies beyond sparkle-dust, no daily-streak mechanics. It's a game she visits, not a game that nags.

### 4.8 Sound
- Light, optional (mute toggle on title screen, persisted): sparkle/chime SFX for casts, a comic *fizzle* for misses, short celebratory stings. Pop-adjacent background loop in duels, volume low.
- All audio via the Web Audio API from small bundled files; nothing loads from the network. Game is fully playable muted.

---

## 5. Accessibility & touch standards

- Minimum tap target **64×64px**; primary game actions ≥ 96px.
- All interactions are single-tap or simple drag. No double-tap, no long-press in child-facing UI (long-press reserved for parent corner).
- Typography: large, rounded, highly legible display font for numbers (numerals are the content — they must be beautiful and unambiguous: 6/9, 1/7 clearly distinct).
- Colour is never the only signal (correct/incorrect also differ in motion, icon, sound).
- Respects `prefers-reduced-motion` (particle effects simplify; nothing strobes).
- Works in both orientations; landscape is the designed-for default.
- No text essential to play for pre-readers in the shell (icons + artwork carry navigation) — Spell Duel itself assumes the 8-year-old's reading level for flavour text, which is always skippable.

---

## 6. Out of scope (launch)

- Accounts, servers, sync between devices, multiplayer.
- Any other arithmetic (division, addition modes) — the engine shouldn't preclude them, but they are not built.
- The 4-year-old's game(s) — the shell supports them; card slots show "coming soon".
- Native app / Play Store packaging (PWA install to home screen is in scope, see §7.3).
- Analytics, telemetry, or any network calls.

---

## 7. Technical approach

### 7.1 Stack
- **Vite + React + TypeScript**, no backend. Static build deployable anywhere (or run locally).
- Animation: **CSS transforms/keyframes** for UI; **canvas-based particles** for spell effects (a small bespoke system, or a micro-library if warranted).
- State: React + a small persisted store (Zustand with `persist` middleware or hand-rolled equivalent — decided at build time, but the persistence contract in §7.4 is fixed).
- Testing: Vitest. **TDD for all game logic** — question generation, distractor generation, hint-split selection, mastery/adaptive model, persistence (schema versioning + migration). UI is verified in-browser at tablet viewports.

### 7.2 Architecture
- The shell defines a **Game interface** (metadata for the card + a mount/unmount contract + a namespaced persistence slice). Spell Duel is the first implementation; future games plug in without shell changes.
- Game logic is pure TypeScript modules, fully separated from React components — this is where the TDD lives.

### 7.3 Delivery
- PWA: manifest + service worker so it can be "installed" to the tablet home screen, launches full-screen (no browser chrome), and works offline.

### 7.4 Persistence
- **localStorage**, single namespaced key per domain: `playground:profile`, `playground:spell-duel`, etc.
- Every stored blob carries a **schema version**; the app migrates old versions forward on load and never crashes on unknown/corrupt data (falls back to defaults, preserves the corrupt blob under a `:backup` key rather than deleting).
- Writes are debounced and happen on every meaningful state change — there is no "save" concept visible to children.
- Parent corner offers **export/import** (a JSON blob via copy-paste or file download) as insurance against localStorage being cleared by the browser/OS.
- Stored: avatar configuration, unlocked items, sparkle-dust, per-fact mastery data, table selections, map/star progress, sound preference.

---

## 8. Art direction & asset plan

**The bar:** it must look like a real, published kids' game. No default-browser aesthetics, no bare CSS circles standing in for characters, no mismatched clip-art.

### 8.1 Art style
A single, consistent style across the whole app: **flat vector illustration with soft gradients and glow accents** — the contemporary kids' app look (think Toca Boca / DragonBox): bold silhouettes, thick rounded shapes, limited palette per scene, expressive faces. Palette anchored in Spell Duel's world: deep emerald, midnight purple, warm pink, gold sparkle accents on dark backgrounds (dark scenes make particle glow effects land).

### 8.2 How assets are produced
A three-layer pipeline, in order of preference:

1. **Hand-authored SVG (the backbone).** Characters, the avatar paper-doll layers, crystals, UI chrome, scene props are authored as layered SVG with a shared palette and stroke language. This is a deliberate choice, not a fallback: the avatar system *requires* composable vector layers (swap hair/hat/outfit independently, recolour via CSS variables), and SVG stays crisp at every tablet resolution. These are crafted as real illustrations — proper bezier work, considered silhouettes, consistent light direction — and reviewed against the bar above. Any SVG that reads as "programmer art" is rejected and redone.
2. **Canvas particle/glow effects.** Sparkle, spell blasts, magic-meter shimmer — done as a real-time particle layer, which reads as far more premium than static images for magic effects.
3. **AI-generated raster art for rich backgrounds (optional upgrade).** Full-bleed scene backgrounds (the library, the potions lab) are where hand-authored SVG is weakest. The build ships with strong SVG/gradient scene backgrounds, structured so each can be swapped for a raster image later. If we want that extra richness, I supply a prompt pack (consistent style, palette, composition per scene) for you to run through an image generator of your choice; generated images drop into `assets/scenes/` and are picked up automatically. No AI assets are required for launch quality.

### 8.3 Type & motion
- One display font for numbers/headings (rounded, chunky — e.g. a Google font in the Baloo/Fredoka family, self-hosted) + one clean text face. Locked at build start; used everywhere.
- Motion is part of the art: everything eases with personality (overshoot on pops, squash-and-stretch on the crystal crack), nothing snaps. A shared motion/duration scale keeps it coherent.

### 8.4 Quality gate
Every screen ships only after review on a real tablet-sized viewport (design check at 1280×800 and 2560×1600): screenshot, compare against the bar, iterate. §1 principle 3 is enforced per-screen, not per-release.

---

## 9. Success criteria

1. She asks to play it again without being prompted.
2. Observable shift from guessing to using the Hint Wand strategically on hard facts — and later, answering those facts without the wand.
3. The 4-year-old can open the app and (once his game exists) reach it unaided.
4. Zero lost progress across sessions/restarts over normal use.
5. A stranger seeing the tablet would assume the game was downloaded from an app store.
