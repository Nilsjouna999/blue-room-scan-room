# BLUE ROOM — Card Tech Lab

Last updated: 2026-06-12

## 1. Purpose of This File

This is an **experimental design lab** for card visual systems, treatment
technology, rarity tiers, transformation moments, stat-reactive effects, and
future card families.

**Status of everything in this file: TESTING / BACKLOG** unless explicitly
moved into `PROJECT_OS.md` or logged in `DECISION_LOG.md`.

**Rule: nothing here is final just because it is written here.** This file
exists so ideas can be explored without contaminating the project's actual
laws.

## 2. Current Card Truth

What exists right now (see PROJECT_OS for the authoritative version):

- One master card base
- Customer-facing hierarchy (since 2026-06-12): **Free Pull / Halo Mint**
- Signature Mint = internal Lab state (keyboard `M`), no longer the main
  paid tier — its silver material survives as raw material for Free Pull
  polish and the final paid material
- Center card is the trophy; the site carries deeper scan detail
- **The Halo *slot* is the main paid direction; the Halo *visuals* remain
  a prototype effect bucket, not the final shiny design**

What current Halo Foil is *actually* proving (and nothing more):

- a paid treatment can pop
- a visual upgrade ladder is possible
- shimmer / halo / holo can work in plain browser CSS at acceptable cost

Do not design the future shiny by extending current Halo. Design the
material first, then implement.

## 3. Card Base Philosophy

Four layers, deliberately separated:

**A. Master geometry** — the stable card structure. Ratio, photo slot,
title position, stat area, serial/mint area, barcode/stamp zone, border
logic, typography system. *This is the part that makes every card feel like
the same collectible system.*

**B. Treatment skin** — the visual layer on top. Matte, gloss, foil,
chrome, holo, particles, shimmer, glow, color accent. *Skins restyle; they
never move geometry.*

**C. Content identity** — the data that changes per card. Title, archetype,
stats, signal note, signature line, rarity, source metadata. *This is what
makes the card personal.*

**D. Future card family** — a broader style collection that may come later:
Archive, Field, Studio, Night, Signal, Mythic, Glitch, Royal, Street,
Oracle. *A family would be a coordinated set of skins + content
conventions — not a new geometry.*

**The core question:** can we keep one master geometry while letting future
families feel meaningfully different?

**Working answer (TESTING):** yes, if families are expressed only through
layers B and C — palette, texture, stamp style, label vocabulary, photo
treatment — and geometry (A) stays untouched. The current Free/Mint/Shiny
system already proves three very different feelings on identical geometry.
A family is "a treatment dialect plus a copy dialect," nothing more.

## 4. Current Treatment Tiers

**Free Pull** — mellow archive. Muted, matte, graphite/moss/grey,
desaturated + toned photo, dashed unminted stamp. Useful but incomplete.
*Directionally good.*

**Signature Mint** — developed artifact. Cleaner, sharper, silver, slow
sheen, real serial, full reading. Premium but controlled. *Strong, possibly
the actual hero of the product.*

**Halo Foil** — rare shiny pop. Holo edge, halo glow, particles, shimmer.
*Currently too broad and not final — an effects demo, not a material.
Needs deeper design exploration (below).*

## 5. Possible Future Treatment Ladder

**BACKLOG / EXPLORATION** — possible final tier names and purposes:

| # | Tier | Purpose | Visual |
| --- | --- | --- | --- |
| 1 | **Free Pull** | first scan, archive proof, screenshot tease | matte, restrained, dark, muted |
| 2 | **Signature Mint** | paid developed result | silver, premium, sharper, official |
| 3 | **Night Gloss** | dark luxury upgrade | black glass, wet gloss, low reflections, minimal glow |
| 4 | **Cold Foil** | elegant rare treatment | silver/blue foil, subtle shimmer, icy edge, premium restraint |
| 5 | **Halo Foil** | expressive shiny treatment | glow, particles, aura ring, color edge, more alive |
| 6 | **Static Foil** | glitch/signal treatment | scanline distortion, static shimmer, broken-signal edge |
| 7 | **Archive Edition** | collectible final form | museum-grade, serial-heavy, stamped, black/silver, restrained rare |
| 8 | **Prism / Mythic** | ultra-shiny, later | controlled holo, never cheap rainbow |

The ladder doesn't have to ship whole. **Updated framing (2026-06-12):**
the shipping ladder is **Free Pull → Halo Mint**, and the names above are
candidates for (a) the final Halo Mint *material* and (b) rare variants
that sit above/beside Halo Mint later. Signature Mint's silver is donor
material, not a tier.

## 6. Why Current Halo Feels Weak

Honest analysis of the prototype:

- It is mostly **border glow + particles**, not a complete card material.
- It reads as an **effect placed on top**, not a minted object — the plate,
  photo, and typography barely change; only the edges party.
- Holo risks looking **cheap the moment it becomes rainbow noise** — the
  current conic edge flirts with this.
- It has **no distinct material identity**: you can't answer "what is this
  card made of?" (Mint answers: silver-leafed archive plate. Halo answers:
  …CSS?)
- There is **no "why" logic** — nothing about the scan explains why this
  card became Halo. Rarity without cause reads as a paywall skin.
- It is **generic**: SRC 01 and SRC 02 get identical shine, while everything
  else in the product is earned by the photo.

**Goal definition:** Halo (or its successor) should feel like *the card
developed into a rare artifact* — a material state it reached — not like an
effect was switched on.

## 7. Better Shiny Directions to Explore

**Partially applied 2026-06-12:** Halo Mint accents are now per-source
materials (SRC 01 "Warm Glass Copper", SRC 02 "Cold Prism Frost") via
`halo` accent variables — the first real step toward "earned by the scan"
shine. The material *names* below remain candidates for the final system.

All **EXPLORATION**:

**A. Black Star Foil** — black chrome base, tiny star dust, deep-space
shine, subtle constellation specks. Rare but elegant. *Fits the archive
mood best of the flashy options.*

**B. Cold Prism** — silver/blue holo edge, icy refraction, minimal
particles. Very premium. *Natural fit for quiet/cold cards like SRC 02.*

**C. Signal Halo** — soft aura ring, thin scan glow, **color reacts to the
strongest stat**. Less glitter, more aura. *Strongest "earned by the scan"
story.*

**D. Night Gloss** — black glass card, wet reflections, low glow.
Luxury/fashion feel. *Could be the default paid look above Mint.*

**E. Static Mint** — broken scanline shimmer, data distortion, subtle
glitch edge. *Good for high-Signal or chaotic photos; dangerous as default.*

**F. Archive Foil** — stamped silver, serial-heavy, old-document luxury,
no neon. *The most premium and restrained; the "museum rare."*

**G. Mythic Prism** — full shiny, controlled rainbow edge only. Rarest.
*High reward, high cringe-risk; gate hard.*

## 8. Stat-Reactive Card Effects

**EXPLORATION** — how the four stats (and paid modules) could tune visuals
without new layouts:

- **Presence** → stronger subject glow, heavier card shadow, more centered
  halo, calmer motion. (High presence = the card sits *still* and heavy.)
- **Frame** → sharper borders, cleaner crop lines, stronger grid/geometry,
  more precise corner ticks.
- **Signal** → brighter accent lines, gesture-path glow, scanline pulse,
  signal arrows / pulse marks.
- **Charge** → more motion shimmer, warmer/cooler energy field, faster
  particle drift, stronger contrast pulse.
- **Lore Density** → more stamps, deeper texture, extra serial marks,
  hidden microtext.
- **Fit Coherence** → smoother color harmony, unified border accents,
  cleaner image treatment.
- **Visual Impact** → stronger card entry animation, more glow/pop, bigger
  share/export moment.

Principle: stats map to *intensity dials on existing layers*, never to new
structures. This is also the cleanest "why this card became rare" logic:
the photo's strongest stat chooses the shine's character (see Signal Halo).

## 9. Archetype-Linked Visuals

**EXPLORATION** — archetype tunes accents and overlays, never layout:

- **Curator** archetypes → archive stamps, soft silver, restrained
- **Operator** archetypes → clean frame, sharp edges, signal lines
- **Surveyor** archetypes → field labels, horizon lines, cold tone
- **Performer** archetypes → stronger glow, warmer contrast, bigger title
  presence
- **Ghost / withheld** archetypes → lower light, shadow gradients, hidden
  text
- **Royal / high-status** archetypes → gold/silver trim, heavier stamp,
  clean negative space
- **Chaotic** archetypes → static foil, offset marks, broken rhythm

**Rule:** archetype = accent dialect. It must never create a new card
layout in V1.

## 10. Outfit / Fit Check Tech

**BACKLOG** — future module: **Fit Check / Fit Coherence (expanded)**

Reads (photo/styling only — never body judgment):

- color anchor · silhouette · styling distinctness · setting match ·
  texture contrast · accessory signal · outfit-role alignment

Output:

- Fit Coherence score · style role label · color anchor · strongest fit
  cue · what weakens the fit · one line of style read

**Hard rule:** this reads the *styling in the photo*, not the body. The
moment it drifts toward attractiveness, it's cut.

Placement: right panel (exists in small form today) → scroll dossier later
→ at most a tiny card stamp if paid.

## 11. Impact / Aura Tech

Current module placement thinking (TESTING):

| Module | Free? | Affects card visually? | Lives |
| --- | --- | --- | --- |
| Stat Reading | yes | no (numbers already on card) | right panel |
| Aura Profile | yes | future: accent tint candidate | right panel |
| Scene Role | yes | no | right panel |
| Stance Read | paid | no | right panel |
| Fit Coherence | paid | future: harmony dial (§8) | right panel + metrics |
| Visual Impact | paid | future: entry animation dial | right panel |
| Lore Density | paid | future: stamp/texture dial (§8) | right panel + receipts |
| Oracle Read | paid | no — stays text-only, that's its power | right panel |

Working principle: free modules hook interest; paid modules deepen meaning;
only *dials* (not modules) ever touch the card's visuals.

## 12. Web Effects

**EXPLORATION** — browser effect menu:

hover tilt · mouse-follow foil (sheen tracks cursor) · shimmer sweep ·
border glow · particle field · serial stamp flash · card lift on hover ·
click-to-flip · click-to-develop · scanline pass · mint seal pulse ·
rarity reveal · treatment-based glow · ambient background reacting to card

**Performance rule (CURRENT):** CSS/SVG first. Canvas/WebGL only later if
genuinely needed. Do not make the page heavy before V1. The current stack
(conic gradients, blend modes, tiny SVGs) is the ceiling for now.

## 13. Phone Effects

**BACKLOG** — mobile-specific ideas:

device-orientation tilt · swipe between Source/Card/Reading · tap card to
shimmer · long-press to reveal serial · haptic-like visual pulse ·
share/export animation · card expands full-screen · foil follows finger
drag

**Performance rule:** mobile must stay smooth — no heavy particles, no
large-area blur filters. Mobile gets the toned-down dialect of every
effect.

## 14. Click / Tap Interactions

**EXPLORATION — do not implement yet unless requested:**

- click card → small lift + foil catch
- click rarity stamp → serial/mint detail
- click a stat → reveal that stat's explanation
- click photo → show source/crop overlay
- click develop → animated mint transformation (see §15)
- click Halo → shiny reveal burst
- click technical receipts → open formula panel

## 15. Transformation Moments

**EXPLORATION** — the "developing" ritual. Paid mint should feel like an
event, not a toggle:

1. Free Pull sits as the matte archive card
2. a scanline passes over the photo
3. the title locks in
4. stats count upward to their values
5. the seal stamps the bottom strip
6. the border sharpens into silver
7. **Signature Mint reveals**
8. (if rare) Halo/Cold/Star adds its edge, halo, particles last

This sequence is the single highest-leverage future moment in the product:
it is the purchase, the reveal, and the share-clip in one.

## 16. Optimization Rules

**CURRENT** — performance principles (already mostly followed):

- Keep one card DOM structure
- Treatments use CSS variables/classes only
- Never duplicate card components per treatment
- Lightweight SVG for overlays
- CSS gradients before images/videos
- Avoid heavy blur over large areas
- Particles limited and optional
- Respect `prefers-reduced-motion` (already wired)
- Mobile gets toned-down effects
- Every effect must degrade gracefully (no effect = still a good card)

## 17. Future Card Families

**BACKLOG** — possible collections (per §3, families = skin + copy dialect
on the same geometry):

1. **Archive Room** — current default; graphite/silver; evidence/archive
2. **Field Record** — outdoor/work/travel photos; field notes, horizon
   lines, location cues
3. **Studio Proof** — clean fashion/editorial; sharper typography, cleaner
   crop, style tags
4. **Night Signal** — low light, flash, party; static foil, light leaks,
   high charge
5. **Oracle Cut** — mystical/lore-heavy; subtle symbols, prophecy read
6. **Chrome Mint** — high-impact paid/shiny; black chrome, prism edge,
   rare stamp

**Important:** these are future families, not V1. V1 uses one main Archive
base unless a clearly stronger direction appears.

## 18. What Might Actually Become Final

Honest current evaluation (TESTING):

- **Is Free Pull basically correct?** Yes — mellow archive scan with veiled
  depth is doing its job. Keep.
- **Is Signature Mint strong enough?** Close. It is arguably the real
  product. It may deserve *more* ceremony (transformation moment, §15)
  rather than more decoration.
- **Is "Halo Foil" the wrong name?** Possibly — "Halo" promises an aura
  story the current effect doesn't deliver. Signal Halo (stat-reactive
  aura) would earn the name; the current rainbow edge doesn't.
- **Should final shiny be Cold Foil, Black Star, Night Gloss, or Halo?**
  Leading candidates: **Black Star Foil** (best mood fit) and **Night
  Gloss** (best luxury fit). Cold Prism strong for cold cards. Decide by
  prototype comparison, not in prose (§20).
- **Should "Halo Foil" become a rare effect, not the main paid design?**
  Likely yes: Signature Mint = the default paid artifact; shiny = rare
  tier above it.
- **Should Signature Mint be the default paid design and shiny be
  optional/ranked?** ~~Earlier working hypothesis.~~ **Resolved 2026-06-12
  the other way:** Signature Mint was too subtle to carry the purchase —
  the paid tier must be the visibly transformed card (Halo Mint). Logged
  in DECISION_LOG. Signature Mint's silver lives on as Lab material.

## 19. Open Questions

- What should the final shiny card *feel* like — minted object, aura event,
  or museum piece?
- How much magic is too much? (Where does premium become toy?)
- Should rare treatments be random (pull luck), paid-selected, or
  stat-derived?
- Does every paid card get shiny, or only some?
- Should treatment be chosen by archetype, stats, user choice, or purchase
  tier?
- What is the difference between Signature Mint and Halo Foil
  *emotionally* — develop vs. ascend?
- What is the final "wow" moment — the reveal animation, the material, or
  the rarity?
- Which effects are worth their performance cost on mid-range phones?

## 20. Next Research / Prototype Tasks

1. Screenshot current Free / Signature / Halo (all = baseline record)
2. Compare against the desired material directions (§7)
3. Design **3 alternative shiny treatments** without changing card layout:
   - Cold Foil
   - Black Star
   - Night Gloss
4. Test them as additional `data-treatment` skins (CHANGE_MAP: "add a new
   treatment") behind a dev toggle
5. Pick **one** as the serious paid direction
6. Keep the others as backlog rarity variants
7. Log the outcome in DECISION_LOG.md and promote the winner's rules into
   PROJECT_OS.md
