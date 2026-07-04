# Art generation pack

Generate images with any AI image tool (ChatGPT/gpt-image, Midjourney, etc.),
then drop them into the folders below. The game picks them up automatically
(dev server hot-reloads; production needs a rebuild). Delete a file to fall
back to the built-in SVG art. Nothing else to wire.

## File contract

| What | Folder | Name | Format | Size |
|---|---|---|---|---|
| Boss portraits | `src/assets/art/bosses/` | `nix.png`, `fern.png`, `willow.png`, `juniper.png`, `luna.png`, `opal.png`, `bramble.png`, `tilda.png`, `marigold.png`, `aria.png`, `storm.png` | PNG **with transparent background** (or WebP) | ~1024×1024, keep under ~300KB (WebP preferred) |
| Scene backdrops | `src/assets/art/scenes/` | `library.png`, `garden.png`, `owlery.png`, `potions.png`, `stars.png`, `hall.png`, `brooms.png`, `clock.png`, `treasury.png`, `music.png`, `rooftops.png` | PNG/WebP, opaque | ~1536×1024 landscape |

Boss framing: full body, witch on broom flying toward the LEFT of frame
(she duels from the right side of the screen), character fills ~80% of frame,
nothing cropped. Scenes: dark, room readable in the middle band; keep the
centre uncluttered (the spell crystal and UI sit there); floor in the bottom
quarter.

## Step 1 — style anchor (generate once, reuse as reference)

> Character concept art for a premium children's game, in the style of modern
> kids' app illustration (Toca Boca, DragonBox): flat vector-inspired painting
> with soft airbrushed shading, bold rounded silhouettes, big expressive eyes,
> chunky proportions (big head, small body), warm rim-light from the top-left,
> deep midnight-purple ambient palette with emerald and gold accents. A young
> witch student flying side-saddle on a broom, mischievous confident smile.
> Clean transparent background, single character, full body visible, soft
> ground glow beneath. No text, no watermark, kid-friendly, nothing scary.

Keep this image. Generate every boss **with it attached as a style/character
reference** and start each prompt with: *"Same illustration style, proportions
and lighting as the reference image."*

## Step 2 — the 11 bosses

Append to each: *"…flying side-saddle on a broom facing left, full body,
transparent background, premium children's game character art, no text."*

1. **nix** — Young witch, Head Prefect of Mischief: hot-pink asymmetric swoop hair, deep-purple prefect uniform dress with sash, white quill tucked behind ear, ink-stained fingertips, a small glowing comic book floating beside her, sly grin; black cat with an ink-dipped tail sitting on the broom bristles.
2. **fern** — Young witch raised by talking plants: leaf-green hair woven with tiny flowers, moss-green patched dress, seed-pouch belt, bare feet, vines with leaves spiralling around her broomstick, a ladybird on her outstretched hand, gentle wide smile.
3. **willow** — Sleepy night-post witch: amber hair in a loose messy bun with a feather stuck in it, half-lidded drowsy eyes and content smile, feather-collared brown cloak, leather satchel overflowing with letters, one envelope with tiny wings flying behind her, a small owl asleep on the broom bristles.
4. **juniper** — Potion prodigy witch: emerald-green hair with singed fringe tips, brass goggles pushed up on her head, navy lab apron with a bandolier of three tiny glowing potion bottles (pink, gold, green), holding a bubbling test tube, confident smirk, faint green potion stain on the apron.
5. **luna** — Dreamy stargazer witch: long silvery pale-blue hair drifting upward as if weightless, tiny star freckles on her cheeks, deep-blue cloak scattered with small stars, half-moon spectacles, rolled star-chart under one arm, small brass telescope strapped to her back, serene knowing smile, two tiny moons orbiting her hat.
6. **opal** — Glamorous head-girl witch: immaculate long white-silver wavy hair, royal-purple gown with a sash of three small gold medals, iridescent opal brooch at her collar, holding a small gold hand-mirror, proud confident smile, fluffy white cat with a purple bow on the broom bristles, subtle sparkles in her hair.
7. **bramble** — Broom-racing champion witch: russet-orange windswept hair streaming back, brown leather flying cap with goggles pushed up, long emerald scarf streaming dramatically behind, racing number 8 patch on her jacket, small plaster on one knee, gold racing stripes on the broomstick, thrilled grin, tiny bat gripping the broom tail.
8. **tilda** — Clockmaker's apprentice witch: neat crimson bob with two tiny brass gear hairpins, charcoal waistcoat with a gold pocket-watch chain, monocle over one eye, a large brass wind-up key sticking out of her hat, prim confident smile, a tiny mechanical mouse with a gear on its back riding the bristles.
9. **marigold** — Dragon-hoard accountant witch: golden-blonde hair in two neat plaits, round spectacles, gold-dust freckles across her nose, teal banker's dress with gold buttons, fat leather ledger under one arm with coins peeking out, tiny abacus hanging from her belt, three glowing gold coins floating around her, satisfied smile.
10. **aria** — Pop-star witch in training: bubblegum-pink high ponytail with a music-note hairclip, sparkly magenta stage dress with a gold star on the chest, chunky gold headphones around her neck, singing blissfully into a glowing microphone that is visibly an enchanted hairbrush, three glowing music notes floating around her, cat with a tiny bow on the bristles.
11. **storm** — The final boss (one notch more dramatic, still friendly): silver-grey hair with one electric-blue lightning streak, streaming in the wind, charcoal storm-cloak billowing with a cloud-shaped hem, tiny blue static sparks crackling around her, corked bottle on her belt with a glowing lightning bolt inside, fingerless gloves, confident storm-grey eyes and bold smile, small bat with a lightning-tipped tail flying alongside.

## Step 3 — the 11 scenes

Shared scaffold — start each with: *"Background environment art for a premium
children's game, same painted style and midnight palette as the reference,
dark and cosy, no characters, no text, landscape, uncluttered centre, floor
in the bottom quarter."*

1. **library** — Magical academy library at night: towering bookshelves, arched windows with moonlight, floating candles, a pile of grimoires on the floor, dust motes in moonbeams.
2. **garden** — Enchanted walled herb garden at night under a starry teal sky: glowing giant toadstools, hedges, fireflies, a big low moon.
3. **owlery** — Cosy stone owlery tower at night: a large round moonlit window, wooden perches with sleepy owls, drifting feathers, warm plum shadows.
4. **potions** — Green-lit potions classroom: shelves of glowing colourful bottles, a big bubbling cauldron with green steam, hanging herbs.
5. **stars** — Observatory dome open to a deep-navy star field: grand brass telescope, a glowing orrery, constellation charts.
6. **hall** — Grand academy great hall at night: arched windows, floating candles, moonlight, long shadows, bookshelf alcoves.
7. **brooms** — Broom yard at dusk (orange-purple sunset): wooden fence with racing brooms leaning on it, a little broom shed with a glowing doorway, bats in the distance.
8. **clock** — Inside a giant clock tower: huge backlit clock face, brass gears on the walls, a swinging pendulum, teal-and-gold machinery glow.
9. **treasury** — The academy treasury vault: a great round gold vault door, treasure chest, coin piles, warm gold light in brown shadows.
10. **music** — Enchanted music room: a golden harp playing itself, a grand piano, floating glowing music notes, plum-purple velvet drapes.
11. **rooftops** — Academy rooftops at midnight: chimneys with drifting smoke, distant spires with lit windows, a huge moon, deep blue night.

## Tips

- Generate 2–3 candidates per prompt and keep the best; consistency comes from
  always attaching the same anchor reference.
- If a boss drifts off-style, re-run with the anchor attached and add
  "match the reference style exactly".
- Convert to WebP if the PNGs are heavy (`cwebp -q 85 in.png -o out.webp`).
- The player's own avatar stays vector on purpose (it's recolourable
  paper-doll layers) — don't generate art for her.
