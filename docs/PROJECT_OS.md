# BLUE ROOM — Project OS

Last updated: 2026-06-12
Status labels used throughout:

- **LOCKED** — core rule; avoid changing unless there is a clearly stronger reason
- **CURRENT** — active direction; can be improved
- **TESTING** — prototype assumption being evaluated
- **BACKLOG** — future idea, not now
- **REJECTED** — avoid for V1

Documentation files:

- `docs/PROJECT_OS.md` — this file; the full project logic
- `docs/CHANGE_MAP.md` — practical "where do I change this?" guide
- `docs/DECISION_LOG.md` — dated decisions with revisit conditions
- `docs/CARD_TECH_LAB.md` — experimental lab for card treatments, tiers,
  effects, and future card families (TESTING/BACKLOG only — nothing there
  is final)

---

## 1. Product Thesis

**LOCKED**

> Every uploaded photo is already a card. The system develops it.

Blue Room is:

- a **photo-to-card scan room** — the user brings a photo; the system reads it
- a **collectible card artifact** — the output is a premium card, not a report
- a **premium scan result page** — the site around the card is the full reading

Blue Room is **not**:

- a face-rating app — REJECTED
- attractiveness scoring — REJECTED
- social comparison / public ranking — REJECTED

Every stat, diagram, and line of copy reads the *photo* (composition, gesture,
light, setting, styling), never the person's looks.

## 2. Current Product Shape

**CURRENT**

- **Site = scan room.** The full interface is the product experience.
- **Card = trophy / artifact.** Compressed, iconic, screenshot-worthy.
- **Left panel** = source / diagram / metrics (tabbed analysis of the photo).
- **Center** = the card artifact on a stage.
- **Right panel** = the deeper reading + paid modules.

The card never carries the whole reading. The site does the deep work; the
card stays compressed.

## 3. Current Build Scope

**Exists now (CURRENT):**

- 2 real sources (SRC 01 / Driver, SRC 02 / Ice Field) from real photos
- Left panel tabs: Source / Diagram / Metrics
- One master card shell
- Two customer-facing tiers: Free Pull / Halo Mint (+ internal Lab state)
- Stat readings, aura profile, scene role, stance read, fit coherence,
  visual impact, lore density, oracle read, technical receipts (with
  interpretive formulas)
- Treatment-gated content (free veils deep modules; paid develops them)
- Per-source photo tuning (crop, zoom, scrim, exposure)
- Data-driven diagram overlays + metrics receipts

**Not built yet (BACKLOG — intentionally):**

- upload, backend, login, checkout, database
- MediaPipe / real AI scan
- profile layers (MBTI/zodiac/etc.)
- vault
- scroll-down dossier

## 4. Core Laws

| Law | Status |
| --- | --- |
| One master card base | **LOCKED** |
| Few treatment states (treatments restyle, never re-layout) | **LOCKED** |
| Card stays compressed; never the full report | **LOCKED** |
| Site carries the depth | **LOCKED** |
| Do not drift into face-rating / attractiveness / social comparison | **LOCKED** |
| Free Pull = archive preview (useful, screenshot-worthy, incomplete) | **CURRENT** |
| Halo Mint = the main paid tier: a visibly transformed developed card | **CURRENT** |
| Current Halo *visuals* are prototype-only (final material undecided — see CARD_TECH_LAB) | **TESTING** |
| Signature Mint = internal Lab state, not a customer-facing tier | **CURRENT** |
| Paid must feel like "the card developed," never "more text unlocked" | **LOCKED** |

## 5. Layout System

**CURRENT** — PC-browser-first; desktop is the priority.

| Region | Responsibility |
| --- | --- |
| Top bar — brand | Identity ("BLUE ROOM · SCAN ROOM") |
| Top bar — source selector | Switch SRC 01 / SRC 02 |
| Top bar — treatment selector | Switch Free Pull / Halo Mint (Lab mint via `M` key) |
| Left panel tabs | Inspect the source: Source / Diagram / Metrics |
| Center card stage | Display the trophy; faint vignette; treatment halo |
| Right reading panel | The scan reading: meaning, modules, paid value |

Grid: `clamp`-based columns fill 1600×900 and 1920×1080 cleanly; the card
grows to 550px on big monitors. **Mobile is a basic stacked fallback only —
not a priority yet (CURRENT).** Keyboard: `1`/`2` source, `F`/`M`/`H`
treatment.

## 6. Left Panel System

**CURRENT**

**Source tab** — "What photo is being read?"
Original image (raw, untouched by treatments), scan markers + legend,
capture record, frame-analysis notes.

**Diagram tab** — visual scan sheet over the photo:
rule-of-thirds grid, focal lock ring, subject mass box, gesture/posture
line, horizon/frame axis, signal direction arrow, crop pressure zones,
light direction glyph, diagram notes. Free shows a limited sheet (grid +
focal + mass); the full sheet develops with Mint.

**Metrics tab** — why the stats happened:
stat diamond, signal mix bars, composition pressure graph, fit coherence
matrix, interpretation captions ("weighted read · interpretive formula,
not a measurement"). Pressure + fit matrix veiled in Free.

**Belongs here:** anything that inspects or explains the *photo itself*.
**Does not belong here:** the meaning/narrative of the scan (right panel),
the card's own content, upload UI, anything biometric-flavored.

## 7. Center Card System

**LOCKED** (content list) — the card only shows:

- photo (treated per tier)
- title
- archetype
- Presence / Frame / Signal / Charge
- short signal note
- signature line
- treatment / rarity / serial / barcode / mint stamp

**Never on the card (REJECTED):**

- large graphs or diagrams
- long readings or prose modules
- formulas
- profile layer explanations
- technical receipts

If a new element wants onto the card, the default answer is no — it goes in
the scan room instead.

## 8. Right Panel System

**CURRENT** — module order:

1. Scan Reading (header: source chip + state badge)
2. Stat Reading (per-stat explanation)
3. Aura Profile
4. Scene Role
5. Stance Read *(veiled in Free)*
6. Fit Coherence *(veiled in Free)*
7. Visual Impact *(paid)*
8. Lore Density *(paid)*
9. Oracle Read *(veiled in Free)*
10. Mint Record *(paid)*
11. Technical Receipts *(paid; collapsed; holds the interpretive formulas)*

Division of labor:

> **The Metrics tab explains *why* the stats happened.
> The right panel explains *what the scan means*.**

Free mode replaces the deep modules with blurred/veiled teasers plus the
"Develop This Scan" card (buttons switch treatment — no checkout in V1).

## 9. Stat System

**CURRENT** — names audited 2026-06-12 and kept. Decision: keep these names.

| Stat | Meaning | Inputs ("derived from") |
| --- | --- | --- |
| **Presence** | Subject holds the frame | focal clarity + posture stability + scene ownership |
| **Frame** | Composition / crop / background control | composition balance + crop pressure + background control |
| **Signal** | Readability of gesture, intent, style cue | gesture readability + eye-line clarity + styling distinctness |
| **Charge** | Energy / emotional temperature / motion potential | motion potential + contrast + emotional temperature |

Paid / secondary modules (right panel depth set — CURRENT):

- **Visual Impact** — how hard the photo lands (value + label)
- **Fit Coherence** — styling + setting + posture + gesture alignment
- **Lore Density** — how much story the photo creates
- **Stance Read** — prose read of posture/commitment
- **Aura Profile** — three label chips

All inputs are interpretive reads of the photo — receipts, not measurements.

## 10. Treatment System

**Treatments restyle the same master card. They never create new card
layouts. (LOCKED)**

Customer-facing hierarchy (CURRENT, decided 2026-06-12):

> **Free Pull = useful scan preview. Halo Mint = full developed artifact.**

**Free Pull (CURRENT)**
Archive preview. Graphite / charcoal / muted grey / moss accent, with a
touch of the old Signature-Mint silver quality folded in so free never
feels dead. Toned, scrimmed photo. Dashed UNMINTED stamp, ghost serial.
Screenshot-worthy but incomplete and less alive; deeper modules veiled.

**Halo Mint (CURRENT tier · TESTING visuals)**
The main paid transformation. Unlocks everything: full right-panel
reading, full Diagram, full Metrics, formula receipts, mint record, visual
impact, lore density, oracle read, real serial — plus the dramatic card
treatment. The *slot* is decided; the *visuals* are not: current
holo-edge/halo/particles are a prototype effect bucket. Final material
candidates (Black Star, Cold Foil, Night Gloss, Signal Halo, Archive Foil)
live in CARD_TECH_LAB. Paid must read as "the card developed," not as a
cosmetic toggle.

**Signature Mint (internal Lab state — not customer-facing)**
Reached via keyboard `M` only. Kept because its silver material is the
best-developed treatment work so far: it feeds Free Pull polish and is a
candidate base for the final Halo Mint material. "Mint" otherwise survives
as the verb: *Mint this scan.*

**Future variants (BACKLOG)** — rarer materials/families above or beside
Halo Mint: Black Star, Cold Foil, Night Gloss, Archive Foil, Static Mint,
Mythic Prism. Not built; see CARD_TECH_LAB §5/§7.

## 11. Data / Schema Map

| File | Holds | Changing it affects |
| --- | --- | --- |
| `data.js` | ScanResult content: titles, archetypes, stats, notes, reads, aura, stance, fit, impact, lore, oracle, mint record, receipts; source metadata (capture, markers, analysis); `photoTuning` (crop/zoom/scrim/exposure); `diagram` (overlay geometry + notes); `metrics` (signal mix, pressure, fit matrix); `FORMULAS`; `TREATMENTS` labels | Everything content-side: card text, both side panels, diagrams, metrics. Safest file to edit. |
| `app.js` | State (source/treatment/tab), all rendering (card, left tabs, right panel), SVG builders (diagram, stat diamond), toggle/keyboard wiring, free/paid gating | Structure and behavior. Edits here can change *which* modules exist and *where*. |
| `styles.css` | Design tokens, layout grid, card shell, treatment skins (free/mint/shiny), diagram/metrics styling, typography, effects, responsive fallback | The entire visual system. Treatment feel lives here. |
| `assets/` | `source-01.jpg`, `source-02.jpg` — the real photos | Left panel image + card photo (both use the same file per source). |
| `README.md` | Usage notes, stats-audit summary, run instructions | Documentation only. |
| `docs/` | Project operating documents (this system) | Nothing at runtime. |

## 12. Change Impact Map

| Change | Edit file | Affects | Risk |
| --- | --- | --- | --- |
| Stat name | `data.js` + `app.js` (render labels) + maybe `FORMULAS` | card + metrics + right panel | **high** |
| Stat value | `data.js` | card + stat diamond + right panel | low |
| Card layout | `app.js` (renderCard) + `styles.css` | the main trophy | **high** |
| Treatment colors/effects | `styles.css` | Free/Mint/Halo feel | medium |
| Source image path | `data.js` (`file`) / `assets/` | left panel + card photo | low |
| Photo crop/zoom/exposure | `data.js` (`photoTuning`) | card photo only | low |
| Diagram marker/line | `data.js` (`diagram`) | Diagram tab | low |
| Metrics values | `data.js` (`metrics`) | Metrics tab | low |
| Formula text | `data.js` (`FORMULAS`) | Technical Receipts | low |
| Right panel copy | `data.js` | paid value / readability | medium |
| Tab structure | `app.js` + `styles.css` | left panel UX | medium/high |
| Free/paid gating | `app.js` (renderReadingPanel, renderDiagramTab, renderMetricsTab) | upgrade clarity | medium |

See `docs/CHANGE_MAP.md` for the step-by-step version.

## 13. Current Sources

**SRC 01 / Driver** (`assets/source-01.jpg`, landscape)
Readable cues: raised palm, direct eye line, red jacket, cabin frame,
driver seat, steering wheel, road/window/fjord context, travel/pause/
northbound feeling.
**What it proves:** a casual real photo with one strong gesture generates a
card that feels *about that moment* — gesture-heavy signal mix, cabin crop
pressure, color anchor. This is the "I want my own card" test case.

**SRC 02 / Ice Field** (`assets/source-02.jpg`, portrait)
Readable cues: white snow field, black silhouette, hood/sunglasses,
auger/tool, crouched stance, treeline horizon, cold patience / work /
quiet-proof feeling.
**What it proves:** the same master system produces a completely different
personality (setting/light-heavy mix, horizon lock, field pressure) without
any layout change — and the tuning system can rescue a difficult exposure
(blown snow, small subject).

Together they prove: one master base, two genuinely personal cards.

## 14. Copy Voice

**CURRENT**

The voice is: strange but readable · premium scan archive · poetic but
grounded in the actual photo · sharp but never cruel · no face-rating ·
no fake scientific certainty.

**Use:** focal lock, crop pressure, signal path, scene role, visual receipt,
weighted read, scan recipe, interpretive formula, derived from, develops.

**Avoid (REJECTED):** attractiveness score, face/body rating, diagnosis,
biometric certainty, cringe fantasy overload, social ranking.

Test for any new line: does it read like a casting note found in a strange
archive? Good. Does it read like an app judging a face? Delete it.

## 15. Future Ideas / Backlog

All **BACKLOG** — not current build:

- scroll-down deep scan dossier
- optional **Profile Layers** — *"The photo creates the card. The profile
  adds the lore."* User-provided, never inferred:
  - Type Echo / MBTI layer
  - Zodiac layer
  - Numerology layer
  - Chinese zodiac layer
- vault (paid cards, 12-slot grid, active card)
- paid mint flow ($7 single Signature Mint, no subscriptions V1)
- export/share card
- local upload preview (manual/fake ScanResult drives the card)
- AI-assisted reading (AI fills slots inside the ScanResult schema; AI never
  invents the product)
- card treatment ladder / card families — see `docs/CARD_TECH_LAB.md`

## 16. Current Open Questions

**TESTING**

1. Is Free Pull strong enough to make users want Signature Mint?
2. Is Halo Foil premium or too flashy? (See CARD_TECH_LAB — current Halo is
   prototype-only.)
3. Are the diagrams helpful or too technical?
4. Does the right panel feel like paid value?
5. Does the Driver card make people want to upload their own photo?
   (This is the main product test.)
6. Should the scroll-down dossier be next, or should the top hero be
   polished first?

## 17. Next Build Priorities

1. Audit all 18 states (2 sources × 3 treatments × 3 tabs)
2. Improve top hero clarity
3. Improve free-to-paid CTA
4. Improve right panel hierarchy
5. Polish Diagram/Metrics readability
6. Only then consider the scroll-down dossier
7. Only later add upload / AI / checkout
