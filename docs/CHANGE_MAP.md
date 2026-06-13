# BLUE ROOM — Change Map

Practical "where do I change this?" guide for `blue-room-scan-room/`.
Read the matching section *before* editing. Last updated: 2026-06-12.

General test loop for any change:
`python -m http.server 8743` in the project folder → open
http://localhost:8743 → walk 2 sources × 3 treatments × 3 tabs → check the
browser console is clean (F12).

---

## To change text (titles, verdicts, readings, copy)

- **Edit:** `data.js` only. Card text lives in each source's `card` object
  (`title`, `archetype`, `note`, `signature`); reading text in `reads`,
  `aura`, `sceneRole`, `stance`, `fit`, `oracle`; left-panel text in
  `capture`, `analysis`, `diagram.notes`.
- **Affects:** card + right panel + left panel, depending on field.
- **Can break:** nothing structural. Long titles can wrap the card title
  block; very long verdicts grow the card height.
- **Test:** check the card still fits the stage at 1600×900 (no scrollbar in
  the center column) and the voice rules in PROJECT_OS §14.

## To change stats (values)

- **Edit:** `data.js` → `card.stats` per source.
- **Affects:** card stat block, Metrics stat diamond, right-panel stat
  reading values.
- **Can break:** nothing; values are 0–100. Keep the *reading text* in
  `reads` consistent with the new number.
- **Test:** Metrics tab diamond shape updates; card numbers match.

## To change stats (names) — high risk

- **Edit:** `data.js` (`stats` keys, `FORMULAS`), `app.js` (`miniStat` calls
  in `renderCard`, the `["presence","frame","signal","charge"]` array in
  `renderReadingPanel`, `statDiamond` order array).
- **Affects:** everything — card, metrics, right panel, formulas.
- **Can break:** any missed reference renders `undefined`.
- **Test:** all three tabs + card + receipts; search the repo for the old
  name. Per PROJECT_OS §9 the current names are an audited decision — log a
  reason in DECISION_LOG.md first.

## To change source images

- **Edit:** drop the file in `assets/`, point `file` in `data.js` at it
  (any of .jpg/.jpeg/.png). Update `photoTuning` (`pos`, `zoom`, `scrim`,
  `base`) for the new image, and realistically `markers`, `diagram`,
  `analysis` — those coordinates are per-photo.
- **Affects:** left panel image + card photo (same file, raw on the left,
  tuned on the card).
- **Can break:** stale coordinates draw markers/diagrams in wrong places;
  missing file shows "Missing image file: …" warning (by design).
- **Test:** Source + Diagram tabs — markers sit on the right features; card
  crop keeps the subject readable in all three treatments.

## To change diagrams

- **Edit:** `data.js` → `diagram` per source: `massBox`, `gesture`
  (`points`, `label`, optional `labelAt`), `axis`, `arrow`, `light`,
  `pressure`, `notes`. Coordinates are % of the displayed frame
  (0–100 × 0–100). Portrait images need `aspect` set (SRC 02 = 2.22) so
  circles/arrowheads stay round.
- **Affects:** Diagram tab only.
- **Can break:** labels can collide with each other or the corner meta chip
  — eyeball it; wrong `aspect` makes dots/rings into stretched blobs.
- **Test:** Diagram tab in free (limited set: grid + focal + mass) and mint
  (full set), both sources.

## To change metrics

- **Edit:** `data.js` → `metrics` per source: `signalMix` (5 rows),
  `pressure` (`balance` −50..50, `centerPull`, `noise`, `clarity`),
  `fitMatrix` (4 cells: `k`, `state`, `v`).
- **Affects:** Metrics tab only (lore/impact come from the existing `lore` /
  `impact` fields and show in the right panel).
- **Can break:** nothing structural. Keep signalMix roughly summing to 100 —
  it's presented as a recipe.
- **Test:** Metrics tab free (diamond + mix visible, pressure + fit veiled)
  and mint (all visible).

## To change treatment colors / effects

- **Edit:** `styles.css` only. Tokens at the top (`--moss*`, `--silver*`,
  `--violet/--cyan/--halo-green`); treatment blocks:
  `.card[data-treatment="free"|"mint"|"shiny"]` for the card,
  `body[data-treatment=…]` for page-level accents (badges, diagram strokes,
  diamond fill). Photo look = `--tb/--tc/--ts` multipliers per treatment.
- **Affects:** the entire feel of Free/Mint/Halo.
- **Can break:** the "free must stay mellow / violet-cyan-green only in
  shiny" rules (PROJECT_OS §10, §4); photo readability under heavy overlays.
- **Test:** all three treatments on both sources; the photo must stay
  clearly visible in every state.

## To change card layout — high risk

- **Edit:** `app.js` → `renderCard()` (structure) + `styles.css` (card
  section).
- **Affects:** the main trophy in every state.
- **Can break:** the LOCKED content list (PROJECT_OS §7 — no graphs/
  diagrams/long prose on the card); height fit at 1600×900 (~786px card vs
  ~816px stage); the one-master-base law.
- **Test:** card fully visible without scrolling at 1600×900 in all three
  treatments; check 1920×1080 (card grows to 550px).

## To change right panel modules

- **Edit:** `app.js` → `renderReadingPanel()` (which modules, order,
  free/paid gating, locked set) + `styles.css` (`.panel--reading` chrome);
  content in `data.js`.
- **Affects:** paid value perception, free-to-paid clarity.
- **Can break:** the free teaser logic (locked = stance/fit/oracle; the
  unlock card lists the rest) — keep gating consistent with PROJECT_OS §8.
- **Test:** free vs mint vs shiny right panel; develop buttons still switch
  treatment.

## Product clarity pass (2026-06-12, data.js + app.js + tiny CSS)

State taglines added to `TREATMENTS` (free: "First pull — the surface
scan…"; halo: "Fully developed — structured evidence, hidden stat, mint
record, oracle."), rendered as one quiet line in the Scan Reading header.
Free CTA tightened: lead line "The full reading is already written into
this image. Minting develops it."; button subline "the card finishes
developing"; module laundry-list replaced with a prioritized hook line
(hidden stat first). Dossier CTA subline aligned. Field label "Dominant
Gesture" → "Lead Gesture"; one analysis note reworded — full
banned/hype-word sweep now clean across all states.

## Conversion spine pass (2026-06-13, app.js + styles.css)

Three additive fixes from the first-time product audit, no redesign:
(1) **Hero orientation line** — `render()` injects one serif line above the
card in `#stageZone` ("Every photo is already a card. The room develops
it.") + a mono `Sample scan · 0X / 02` cue (`pad2(src.no)/pad2(SOURCES.length)`)
so demo photos read as fixtures. `.stageintro*` in styles; `.stagezone`
top padding trimmed 16→9px to protect the 1600×900 card-fit (verified —
card + mint strip uncut). (2) **Develop CTA weight** — free Develop
module gets modifier `unlock--spine`: a material-edged plate (left border
+ faint top-bleed in the source's own `--halo-a`, like `.dplate--mint`),
lead line + label lifted one tier. No copy change, no animation; the
deliverables box already names hidden stat/evidence/dossier/mint/oracle.
(3) **Free Hidden Stat sealed** — free `dhidden--tease` score wrapped in a
dashed compartment + mono "SEALED · DEVELOPMENT PENDING" stamp (mirrors
Evidence Board "development pending"); value stays withheld `··`; Halo
reveal (bold `--halo-a` number) untouched. Selectors: `.stageintro*`,
`.unlock--spine`, `.dhidden--tease .dhidden__score`, `.dhidden__seal`.
NOTE: the dossier rhythm `:nth-of-type` selectors still depend on plate
order — unchanged here.

## Micro-legibility + card focus pocket (2026-06-12, styles.css only)

Half-step lifts: receipt cue `#bcb7ae` (between body/primary tiers),
basis 9.5px, kv labels ghost→meta + values →silver, fit-cell values
→silver, technical-receipt rows →meta/silver. Focus pocket: `.stagezone`
two-layer static radial (faint warm lift at the card, edge fall-off into
the room); shiny variant tints the lift with `--halo-a` at 5%. No
animation, no blur, no layout change. Five selector groups total.

## Evidence Board v2 + metrics readability (2026-06-12, app.js + styles.css)

Evidence Board now renders v2 structured receipts (effect mark +
confidence tag + cue + basis) — free shows tierOutputs.free.receiptsShown,
halo shows all; legacy prose receipts remain as fallback when v2 is
absent. Metrics instruments lifted one tier (impact labels/values,
diamond text 4.6px, caps/captions ghost→meta); track bgs warmed. Free
CTA: desc/more lines meta tier, material-tinted button border/bg
(static). TODO(v2-render) for receipts removed; route label in Source
Record still pending (TASK_QUEUE).

## DESIGN_TOKENS pass 2 (2026-06-12, styles.css only)

Readability: `--t-body/meta/ghost` lifted; hardcoded warm greys folded
into tiers; dossier/right-panel body text up ~0.5px; undeveloped lines
and end-marks moved ghost→meta. Dossier rhythm via `:nth-of-type` on the
fixed plate order: quiet (01, 06) tighter + smaller titles; LOUD (04, 07)
extra padding/margin + faint bg lift + brighter top edge. Hidden Stat
reveal: 64px number (44px tease), 20px read. Oracle finale: 27px serif.
CTA name 13px. No new effects/animation. NOTE: rhythm selectors depend on
plate order in renderDossier() — reorder plates ⇒ update these selectors.

## DESIGN_TOKENS pass 1 (2026-06-12, styles.css only)

Vault text scale: 5 named tiers (`--t-display/primary/body/meta/ghost`),
warm archive greys, no pure white — legacy color vars alias to the tiers
so every rule inherited the shift. Room warmed (ink + line tokens).
Plates flattened: `--r-plate: 4px`, flat backgrounds, top-edge light on
modules/dplates. Artifact raised: deeper static card shadow + inset top
light. Accent economy: removed shiny accent overrides from aura chips,
balance dot, diagram strokes/labels, dossier stat bars; developed-state
diamond is quiet silver — the card alone carries the material. No
animation/backdrop-filter/blend-mode added. Dossier rhythm and stat-meter
redesign deliberately NOT applied (later passes).

## ScanResult v2 rendering integration (2026-06-12, app.js)

`getScanResult(src)` / `getActiveScan()` / `getTierOutput(scan, treatment)`
helpers in app.js. v2 is now the preferred source (legacy fallback via
`||` everywhere) for: card + reading-panel + dossier stat values and
visibility (`tierOutputs.free.statsShown` / `stats.freeVisible`), hidden
stat (`conditionalStats`), Fit+Aura Impact/Lore (`haloExtended`), Mint
Record serial/material/triggers, and both oracles. Still legacy with
`// TODO(v2-render)` markers: Evidence Board prose receipts and the
Metrics tab (signalMix/pressure/fitMatrix aren't in v2). Visual output
unchanged by design.

## ScanResult v2 data shape (2026-06-12, data.js only)

Append-only block at the end of `data.js`: `V2_EXTRAS` (route, gate
status, confidence, structured receipts, warnings per source) +
`toScanResultV2()` (maps legacy fields — no duplication) +
`SCAN_RESULTS_V2`. **Not yet read by app.js** — it's the stable shape
for later Free/Halo rendering. To change v2 content: edit `V2_EXTRAS`
or the mapped legacy fields; never fork values that exist in legacy data.

## SPINE promotion (2026-06-12, docs only)

Five active specs promoted from docs/research/SPINE.md: SCAN_ROUTING_SPEC
(gate + routes), SCAN_ENGINE_SPEC (lenses, stats, confidence, receipts),
ARCHETYPE_LIBRARY (selection + naming), PERFORMANCE_BUDGET (cost +
effects law), DESIGN_TOKENS (Room/Plate/Artifact grammar). No code
touched. Build sessions read the relevant spec, not raw research.

## Governance / research organization (2026-06-12)

Governance and research docs were reorganized — no code touched.
Future sessions: read `docs/FILE_MAP.md` + `docs/SESSION_BRIEF.md` first;
authority/status/funnel rules live in `docs/GOVERNANCE_OS.md`; filtered
research lives in `docs/research/SPINE.md` (RESEARCH authority — promote
before building).

## To change the scroll dossier

- **Edit:** content in `data.js` → `dossier` per source (`record`,
  `evidence` ×6 with `free` flags, `statNotes`, `hidden`, `mint`,
  `oracle`); structure in `app.js` → `renderDossier()` + `dplate()`;
  styles in `styles.css` (`.dplate`, `.drecord`, `.receipt`, `.dstat`,
  `.dhidden`, `.dfitaura`, `.doracle`).
- **Affects:** the archive below the hero, free→paid persuasion.
- **Can break:** the 7-section cap (cut, don't grow); the no-paywall-
  language rule (never "locked/upgrade/premium" — use "undeveloped /
  archive pull / development pending").
- **Test:** both sources × free/halo; free shows 3 receipts + undeveloped
  plate, teased hidden stat, reserved serial + CTA; halo shows all 6
  receipts, full hidden stat, real serial + material.

## To change Halo Mint material per source

- **Edit:** `data.js` → `halo: { material, a, b, c }` per source. The
  three colors feed `--halo-a/b/c` on the card and body; the conic edge,
  glow, sparkle accents, stat bars and dossier accents all follow.
- **Test:** SRC 01 mints copper-warm, SRC 02 frost-cold; photo stays
  readable; no cheap rainbow.

## To add a new source

1. Add photo to `assets/`.
2. In `data.js`, copy an existing SOURCES entry and rewrite every field:
   card content, capture, markers, analysis, `photoTuning`, `diagram`
   (with `aspect` if portrait), `metrics`, receipts, mint record.
3. In `index.html`, add a button to `#sourceToggle` with the next
   `data-source` index; keyboard keys 1/2 are hardcoded in `app.js` — extend
   if needed.
- **Note:** V1 is deliberately capped at 2 sources (DECISION_LOG) — log a
  decision before adding a third.
- **Test:** every tab and treatment for the new source; image loads; no
  console errors.

## To change the treatment hierarchy / tier names

- **Current state (2026-06-12):** customer-facing toggle = Free Pull /
  Halo Mint (internal key `shiny`). Signature Mint (internal key `mint`)
  is a Lab state reachable via keyboard `M` only — no toggle button.
- **Edit:** `index.html` (#treatmentToggle buttons), `data.js`
  (`TREATMENTS` labels/stamps/strips), `app.js` (state badge ternary,
  unlock CTA copy, keyboard map).
- **Can break:** purchase-story clarity — paid must read "the card
  developed", never "locked content" / "premium option" / cosmetic toggle.
- **Test:** toggle shows two tiers; `M` still reaches Lab; CTA buttons
  switch to Halo Mint.

## To add a new treatment

1. `data.js` → add an entry to `TREATMENTS` (label, rarity, stamp, strip).
2. `index.html` → add a button to `#treatmentToggle`.
3. `styles.css` → new `.card[data-treatment="x"]` block (+ optional
   `body[data-treatment="x"]` accents). Reuse the existing layer system
   (foil/shimmer/halo/sparkles/scrim/tone) — do not add new card DOM.
4. `app.js` → update the state badge ternary in `renderReadingPanel`, the
   keyboard map, and gating if the new tier changes what's unlocked.
- **Can break:** the "few treatment states" law — design it in
  `docs/CARD_TECH_LAB.md` first, then log the decision.
- **Test:** all tabs/sources under the new treatment; photo readability.

## To add profile layers later (BACKLOG)

- **Principle:** *the photo creates the card; the profile adds the lore.*
  User-provided only, never inferred.
- **Where it would live:** new optional `profile` object per source in
  `data.js`; rendered as additional right-panel modules (and later dossier
  sections) — **not** on the card front beyond, at most, a tiny stamp.
- **Can break:** the no-face-rating law if a layer ever *infers* traits —
  layers must be declared by the user.
- **Test:** right panel with and without the profile object (must degrade
  gracefully when absent).
