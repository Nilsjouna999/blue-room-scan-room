# THE ACCORD — reference measurements for the cologne exhibit

**The target is a reference IMAGE the builder supplied. The fleet cannot see it.** This
document is that image, measured and written down, and it is the only description of the
target that exists. Build to these numbers.

Scope, in the builder's words: **"the hole and the bottle area"** — the recess and what
stands in it. The left column, the right reading panel, the BIRTH/TAROT toggle, the
headings above and the footer below are OUT OF SCOPE and must not be touched.

---

## 1. THE FRAME OF REFERENCE

Reference render is approximately 1672 × 941. All measurements below are given twice:
once in reference pixels, once as a **ratio**, because the ratio is the thing that has to
survive being rebuilt at the app's real size.

**Everything is expressed relative to the recess.** Get the recess right and everything
else is a fraction of it.

---

## 2. THE RECESS — "the hole"

| | reference px | ratio |
|---|---|---|
| left edge | 604 | — |
| right edge | 1066 | — |
| top edge | 170 | — |
| bottom edge | 742 | — |
| **width** | **462** | 1.000 (the unit) |
| **height** | **572** | **1.238 × width** |

- **Aspect ratio 0.808 (w/h).** Slightly taller than square. NOT a tall portrait slot.
- **Corners are square** — no visible radius, or under 4px.
- **There is no hard border.** The recess is defined by VALUE, not by a line. Its interior
  is very slightly lighter than the page at the top and falls away to darker than the page
  at the bottom corners.
- **Interior values:** roughly `#141210` at the top face, settling to `#0d0c0b` low and
  `#080807` in the bottom corners. The page around it sits near `#0a0908`. The whole
  range is inside 20 levels — this is a near-black object and every step in it is small.
- **A glass pane covers the opening.** Its only strong tell is ONE broad diagonal gleam in
  the **upper-left**, brightest at the very top-left corner and fading down and right,
  gone by roughly 45% across. Estimated peak alpha 0.06–0.09 white. There is no second
  highlight, no bottom-right counter-gleam, and no visible frame around the pane.
- **A soft warm pool sits under the bottle's base**, on the recess floor — wider than the
  bottle, low contrast, warm rather than white.

---

## 3. THE BOTTLE

A flat rectangular flask — apothecary/decanter, not a rounded perfume bulb.

| | reference px | ratio to recess | ratio to bottle |
|---|---|---|---|
| body width | 285 | 0.617 of recess width | 1.000 |
| total height (cap top → base) | 490 | 0.857 of recess height | 1.719 |
| **body w/h** | — | — | **0.582** |
| cap width | 75 | — | 0.263 |
| cap height | 55 | — | 0.112 |
| label width | 190 | — | 0.667 |
| label height | 280 | — | 0.571 |

**Vertical stack, top to bottom, as fractions of total bottle height:**

1. **Cap** — 0.112. A dark cylinder, near-black `#141414`, flat top, very slightly
   tapered. A **brass band at its base**, roughly `#8a6a3a`, thin — one or two px at
   reference scale.
2. **Neck** — about 0.045. Narrow, with a **gold collar** where it meets the shoulder,
   brighter than the cap band, roughly `#9a7a45`.
3. **Shoulder** — about 0.075. A fairly steep slope from the neck out to full body width.
   Not a gentle curve; it reads as a decanter shoulder.
4. **Body** — about 0.72. Straight-sided, corners softly rounded (small radius, maybe
   0.03 of body width). This is where the label sits.
5. **Base** — about 0.05. Slightly darker, with the glass thickening; it catches the warm
   floor pool.

**The liquid.** Olive-gold, NOT emerald and NOT yellow. It is darkest at the very bottom
and lightest through the upper-middle of the body. Approximate stops top to bottom:
`#6b6535` → `#5a5a30` → `#3f3d20` → `#2e2c18`. The whole fill is desaturated; the green
is a warm olive that reads as aged liquid, not as a colour.

**The glass.** Two edge highlights, and they are not symmetrical:
- **Left edge**: a bright, narrow, near-continuous vertical highlight running most of the
  body's height. The brightest thing on the bottle after the label.
- **Right edge**: softer, dimmer, shorter — present but clearly the secondary side.
- The shoulders catch a small amount of the same light.

---

## 4. THE LABEL

An opaque, matte, warm-cream rectangle, centred horizontally on the body and sitting in
its lower-middle — its centre is **below** the body's centre.

- **Position:** its top edge is roughly 0.41 of the way down the total bottle height; its
  bottom edge roughly 0.98. It clears the base but only just.
- **Stock colour:** warm aged cream, roughly `#d8cdb4` at its lightest falling to
  `#c9bda0` toward the bottom. It is NOT white and NOT bright.
- **Ink:** dark brown-black, roughly `#2a2118`.
- **Corners:** square or nearly so.
- **No drop shadow.** It reads as stuck flat to the glass. There may be the faintest
  darkening right at its perimeter.

**Its contents, top to bottom, exactly as they appear:**

```
BLUE ROOM ACCORDS  ·  FORMULA 01     ← small mono, wide tracking, split to the two edges
─────────────────────────────────    ← thin rule, full label width
THE BIRTH READING                    ← mono, small caps, letterspaced, the product name
A PERSONAL ACCORD IN SIX NOTES       ← smaller mono, quieter
              ◆                      ← a small diamond, centred
The Crowned Name                     ← DISPLAY SERIF, the largest thing on the label
SUN SIGN                             ← the six, mono, centred, generously line-spaced
YEAR ANIMAL
LIFE PATH
RUNE
TRIGRAM
HEXAGRAM
─────────────────────────────────    ← thin rule
BY BIRTH ALONE                       ← mono
SIX MARKS  ·  ONE ACCORD             ← smallest mono, split to the two edges
```

**Type hierarchy, largest to smallest:** "The Crowned Name" in the display serif is the
clear primary and roughly twice the size of anything else. Then the six marks. Then "THE
BIRTH READING". Everything else is small mono metadata.

---

## 5. WHAT MAKES OR BREAKS THE REPLICA

Ranked. If a build gets the top three right it will read correctly even if the rest drifts.

1. **The bottle's proportion — 0.582 w/h — and the recess's 0.808.** These two numbers
   carry the whole silhouette. A bottle even 10% narrower stops reading as a flask.
2. **The value range is TINY.** Recess, page and bottle all live inside about 25 levels of
   near-black. Every temptation to add contrast makes it look like a product shot on a
   website instead of an object in a dark room.
3. **The label is the only bright plane, and it is CREAM, not white.** It is what the eye
   lands on. If it goes white, or gets a shadow, or gains a border, the illusion goes.
4. **The left-edge glass highlight is asymmetrical and it matters.** One bright left edge,
   one soft right. Symmetry reads as a CSS gradient; asymmetry reads as glass.
5. **One gleam on the pane, upper-left, and nothing else.** A second highlight turns glass
   into a gradient.
6. **The liquid is olive and desaturated.** Any move toward emerald or toward yellow reads
   as a novelty bottle.

---

## 6. HOW A BUILD IS SCORED

The fleet cannot see the reference. So a build is scored on what CAN be checked from its
own source, by computing:

- **Geometry** — every ratio in §2, §3 and §4, computed from the CSS's own declarations,
  compared to the stated targets. This is objective and it is most of the score.
- **Colour** — every declared value compared to the stated ranges, and the total value
  range checked against the "inside 25 levels" constraint.
- **Structure** — that each named element exists, in the layer order the description
  implies (recess floor and walls → bottle glass → liquid → label → glass highlights →
  cap and collar → pane gleam).
- **Type** — that the label's eleven lines are present, in order, with the stated
  hierarchy.

**Nothing here can be scored by eye inside the fleet.** The visual comparison against the
builder's reference is closed OUTSIDE the fleet, by the main loop, which can see the image
and can render the result. That is the loop's real exit condition.

---

## 7. HARD CONSTRAINTS

- Vanilla CSS. No canvas, no WebGL, no external images, no SVG bitmap.
- Namespaced. Nothing may leak onto any other surface.
- The exhibit occupies the centre stage's existing box. The columns either side of it do
  not move — this repo has measured that failure four times now.
- No animated filter or blur; no idle animation.
- Reduced motion leaves it complete.
- The label's ink must clear 4.5:1 on the label's own cream. Compute it; this project has
  been decided by that number repeatedly.
