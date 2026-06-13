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

## To change the local draft intake

- **Edit:** structure/content in `app.js` → `renderDraft()` + the
  `loadDraftFile()` / `pickPhoto()` / `humanSize()` helpers and the
  `draft` module var (a plain object — NOT a ScanResult). Styling in
  `styles.css` (`.draft*`, `.draftcard*`). The mount (`#draftView`) and
  the hidden `<input type="file" accept="image/*">` live in `index.html`.
- **View model:** `state.view` gains a third value `draft`; `applyView()`
  + the `body[data-view]` visibility matrix show exactly one of
  menu/room/draft. Reached only by a user file pick (`[data-draft-pick]`)
  — never via URL. `URL.createObjectURL` preview, revoked on replace.
- **Hard rule:** the draft shows NO analysis — no stats, receipts,
  oracle, hidden stat, score, or serial. If a number appears on the draft
  card it is a bug. No upload, no storage, no AI.
- **Develop Scan gate:** the intake's "Develop scan" CTA flips
  `state.draftGate` and re-renders `#draftView` via `renderGate()` — a
  sealed, generate-nothing chamber (`[data-gate="open|close"]`). Same hard
  rule: no analysis, no numbers, no sample-data calls.
- **Test:** Add your photo → Local Draft preview; non-image rejected;
  replace revokes the old object URL; Replace / Enter sample room / Main
  menu / Resume all work; deep links still bypass to the room.

## To change the front-door menu

- **Edit:** structure/content in `app.js` → `renderMenu()` (pulls
  title/archetype/material from `SOURCES[0]` + `TREATMENTS` stamps — no
  separate menu data, no fabricated stats); styling in `styles.css` (the
  "Main Menu" block: `.menu*`, `.msample*`, `.mtile*`); the mount +
  `data-view="menu"` default live in `index.html` (`#menuView`).
- **View model:** `state.view` is `"menu"` or `"room"`; `applyView()`
  writes `body[data-view]`. Any deep-link param (`src`/`t`/`tab`) forces
  `view="room"` at init so links bypass the menu. `[data-view-to]`
  buttons switch views ("Enter Scan Room" → room; footer "↑ Menu" →
  menu); Enter key on the menu also enters the room.
- **Can break:** the one-sample rule (do NOT add route cards or new
  assets); the no-face-rating law (the trust line and tiles read the
  image, never the person); the Room/Plate/Artifact law (Free tile flat
  plate, Halo tile = the only depth/material element).
- **Test:** bare URL shows the menu; the four deep links open the room
  directly; Enter Scan Room reveals the unchanged room.

## Distilled research checkpoint (2026-06-13 / BR-S028, docs only)

Saved the distilled BLUE ROOM research into `docs/research/` so future
GPT/Claude sessions keep the artifact-language, stat/tier, human-in-frame,
rare-trigger, Reframe Map, and voice rules. New files: `docs/research/README.md`
(folder guide + RESEARCH-authority + live-divergence notes) + the distilled
pack — **`RESEARCH_COMPRESSION_V1.md` (the compact source for future coding/spec
prompts)**, `HUMAN_IN_FRAME_READING_RULES_V1.md`, `RARE_ARTIFACT_TRIGGER_SYSTEM_V1.md`,
`REFRAME_MAP_VALUE_SYSTEM_V1.md`, `LANGUAGE_SYSTEM_V1.md`. These are
**RESEARCH (informs, never implements** — GOVERNANCE_OS §3); ACTIVE specs still
win, and the stat-name / tier-ladder divergences they propose stay deferred to
*Sample Room Tier Migration v1*. **Docs only — runtime unchanged** (no
app.js/styles.css/data.js/scan-contract.js/index.html edits; no AI/backend/
payment/Halo/upload analysis). GPT_REVIEW_GUIDE + TASK_QUEUE + SESSION_BRIEF
note the folder. Roadmap unchanged beyond this checkpoint — next product task
stays **Free Pull Mock Polish v1**.

## Halo Gate Dev Mock v1 (2026-06-13 / BR-S031, app.js + styles.css)

Added a dev-only **sealed card-back / dossier chamber** mock at **`?dev=halo-gate`**,
bound by `docs/halo/HALO_GATE_BOUNDARY_V1.md`. **Not payment · not unlock · not
AI/backend/upload analysis · not a real user result** — it shows ZERO analysis
data, only the sealed-back metaphor + qualitative depth hints. New
`renderHaloGateMock()` (mounted via `mountDev` when `state.dev === "halo-gate"`;
the dev allowlist now includes `halo-gate`). Layout: a landscape graded slab —
**left** = sealed dark back-plate (no photo; "BACK FACE · ARCHIVED · DOSSIER
LAYER · HELD IN CONSERVATION", a material conservation-seal mark + one restrained
shimmer/weld), **right** = dossier gate panel (kicker "◆ HALO DOSSIER", title
"THE BACK OF THIS CARD IS SEALED", subtitle "The Free Pull is yours. The back is
still closed.", three **qualitative** seal rows "Production notes sealed / Variant
routes sealed / Back face archived · conservation seal intact", a Free-complete
reassurance line, a **disabled** "Open Halo Dossier · dev mock — no payment" CTA +
a "Keep Free Pull" decline, and the artifact scope/safety line). A persistent rail
**"DEV MOCK · NOT PAYMENT · NOT REAL ANALYSIS"** + a foot reiterating Free stays
complete / Halo is the sealed back not a hidden score. **No exact locked counts,
no numbers, no module inventory, no urgency/chance/loot-box/person-truth.**
styles.css adds the `.halogate*` block (tokens only; one material shimmer +
sealed weld) + a narrow-screen stack rule.

Also **migrated the Free Pull mock's vault** (`renderFreePullMock`, the
boundary's §G known-gap): the old enumerated count line *"Map exists — 2 image
levers · 2 target variants · setup card sealed"* + the `01/02` named-module rows
are replaced by a single **qualitative** sealed-back block — "Sealed back · in
conservation · This card has a sealed back. The dossier layer is archived —
additional production notes held in conservation. · Back face sealed · opens with
Halo." (removed the now-unused lever/variant count computation). **Verified live**
(1600×900): `?dev=halo-gate` renders the sealed-back mock with all dev labels, no
counts/numbers, disabled CTA; `?dev=free-scan-sim` no longer shows exact counts
and stays polished (Checkpoint Wave, tier bands, chips intact); `?dev=uploaded-result`
/ `?dev=uploaded-blocked` unchanged; bare URL → menu; normal Local Draft → Develop
Scan sealed/offline (renderGate/renderDraft intact); console clean. No
AI/backend/payment/upload analysis; runtime change limited to dev/mock routes +
the one Free-front vault copy line.

## Halo Gate Boundary Lock v1 (2026-06-13 / BR-S030, docs only)

New ACTIVE spec `docs/halo/HALO_GATE_BOUNDARY_V1.md` (225 lines) — locks the
honest Free/Halo boundary before any Halo UI. **Free Pull = complete card
front; Halo = sealed card back / dossier layer** of the same card (additive
artifact depth, never a hidden "real score" / re-roll / rarity chase).
**Headline decision (LOCKED): the Free Pull front and the pre-unlock Halo Gate
must NOT show exact locked counts** ("2 image levers · 2 target variants · 6
receipts found") — they read as a *withheld inventory* and make the complete
card feel like a teaser. Use **qualitative sealed-back language** ("Sealed back ·
archived", "Back face held in conservation", "A dossier layer exists"); exact
counts/contents only **post-unlock**. Honesty preserved — the back genuinely
exists; we drop quantification, not truthfulness. Halo must be desirable via
artifact depth, never fake urgency / chance / loot-box / subscription-trap /
person-truth. The doc defines: product frame · Free Pull boundary (+ the
exact-count ban table) · Halo Gate boundary (forbidden list) · Halo Dossier
boundary (7 candidate modules as *production notes*, framing law — not built) ·
a copy bank (sealed-back hint / gate title+subtitle / disabled CTA / safety /
dev-route label) · anti-patterns (+ why) · implementation consequence for *Halo
Gate Dev Mock v1*. **Supersedes** the pre-unlock count guidance in
`HALO_GATE_UPGRADE_LAYUP_V1` §4/§5/§7/§11 and `FREE_PULL_SCREENSHOT_LAYOUT_V1`
§8 (rest of both specs stands; named, not silently contradicted).
**Docs only — runtime unchanged**: the current `?dev=free-scan-sim` mock still
renders the "2 image levers · 2 target variants" vault line; that is now a
**known boundary gap**, migrated to qualitative copy in *Halo Gate Dev Mock v1*
(not here). DECISION_LOG (2026-06-13) + FILE_MAP register it; TASK_QUEUE binds
the next mock task and adds a *Halo Gate Ethics Audit* after it. No
AI/backend/payment/upload-analysis; no fake user analysis.

## Artifact Language Stabilization Pack v1 (2026-06-13 / BR-S029, runtime + Core Change docs)

Migrated the **sample room's** visible artifact language (Sample Room Tier
Migration v1 + language/banned sweep). **Display-only** stat changes — internal
data keys (`presence/frame/signal/charge`) are unchanged; renamed at the render
layer via new app.js `STAT_LABELS` + `tierBand()`:
- **Stat labels:** Presence→**Frame Presence**, Charge→**Scene Charge** (Frame/
  Signal kept) across card miniStat, metrics diamond, Stat Reading, Stat
  Dossier, FORMULAS, Frame Impact/Lore modules. Hidden stat Gesture Authority→
  **Gesture Geometry**; "Visual Impact" module→**Frame Impact**.
- **No public 0–100:** the 4 public stat scores now show as **tier bands**
  (Muted/Clean/Strong/Charged/Peak) on card/Stat Reading/Stat Dossier/Frame
  Impact/Lore/Hidden/Fit+Aura; bars + diamond geometry kept (diamond axis labels
  are names only, viewBox widened to fit + font bumped — label-fit, not a
  redesign). Evidence-board receipt deltas `+N`/`-N`→`↑/↓`.
- **Tier ladder:** dev-sim `FP_TIER_LADDER` and scan-contract `publicStats`
  migrated to Muted/Clean/Strong/Charged/Peak (kills the rendered "Dominant").
- **Banned-language sweep** (data.js): "confidence in the kneel"→"commitment",
  Affect Trace/Smile→"Expression Band", aura Unhurried/Methodical→Idle-Engine/
  Slow-Burn, fitMatrix "Person"→"Subject", "route has standards"→softened,
  "scene ownership"→"scene anchoring", hidden read personification removed.
- **Dev fixture coherence:** `validFreeSimulationResult` reframeMap/freeSummary/
  receipt residue cleaned to the Checkpoint Wave / Signal Bearer / Day Print
  front (displayed lever/variant counts 2/2 preserved).

**Intentional carve-outs (documented in-code + DECISION_LOG):** the dev-only
`?dev=uploaded-result`/`uploaded-blocked` renderer harness keeps legacy labels +
0–100 + `+N` deltas (strictly dev, "NOT USER SCAN"); the Metrics-tab interpretive
diagnostics (signal mix, composition pressure, fit matrix, subject-lock) keep
numeric weights ("interpretive formula, not a measurement", not the 4 public
scores).

**Core Change Review (LOCKED §7/§9):** DECISION_LOG (2026-06-13) supersedes the
"keep Presence/Frame/Signal/Charge" + show-as-numbers decisions and **ratifies
one authoritative public tier ladder — Muted/Clean/Strong/Charged/Peak** —
reconciled into `CARD_LOGIC_V1` §2 (supersedes QUIET/PRESENT/STRONG/DOMINANT/
TOTAL and the FREE_PULL §7 recommendation; §6 trigger floors read by ordinal
mapping). PROJECT_OS §7/§9/§10, SCAN_ENGINE_SPEC, COPY_SYSTEM §6, and README
updated to match. **Verified live** (1600×900): sample SRC-01/02 × free/halo ×
all 3 tabs show tier bands + renamed labels, no public 0–100, diamond labels
fit, evidence arrows, Gesture Geometry; `?dev=free-scan-sim` migrated (Frame
Presence/Scene Charge + Muted…Peak) and still Checkpoint Wave; uploaded-result/
uploaded-blocked preserved; menu + Develop-gate intact; console clean.
Adversarial 3-agent review (regression/safety/scope): code PASS, govced docs
applied. **No new product features; no AI/backend/payment/Halo/upload analysis;
no layout/slab redesign.**

## Free Pull Layout Mock v1 (2026-06-13 / BR-S027, app.js + styles.css)

The dev-only Free Scan Simulation route (`?dev=free-scan-sim`) is now the first
screenshot-worthy **Free Pull front** per `docs/FREE_PULL_SCREENSHOT_LAYOUT_V1.md`
— a single **landscape graded-slab artifact**, not a report stack. **Dev sim
only · no AI · no user-photo analysis · no payment · no Halo unlock.**
`renderUploadedScanResultDev` gains one early branch — `if (sim) return
renderFreePullMock(result);` **after** the validator/blocked path — so an
invalid sim fixture still renders the safe blocked state, and the
`?dev=uploaded-result` / `?dev=uploaded-blocked` routes keep the **original
layout untouched** (verified: no `.fpcard`, original `.uploadeddev__card`, 8
stat rows + flags plate; blocked route still shows the blocked panel). New
`renderFreePullMock()` builds: a slim **persistent dev rail** (DEV SIMULATION ·
NOT REAL ANALYSIS · NOT USER SCAN — not a giant warning block); an **image slab
window** (~52%, left) using `SOURCES[0]` as a clearly-labelled **sample dev
stand-in** (the fixture carries no photo) with the existing photoTuning/material,
a tiny `FREE PULL · DEV SIM` edition stamp, artifact title + quiet **ARTIFACT
ID**; and a **certification label** (~48%, right) with the archetype teaser
("a photo role, not a person"), **4 public tier rows as segmented notches**
(Presence/Frame/Signal/Visual Impact — bands from a local display ladder
**Quiet/Present/Strong/Sharp/Dominant**, derived from the public bar count so
**no 0–100 number leaks**), **2 grounded receipt chips** (`observed cue →
artifact effect`, contact-sheet annotations), a **shape-only sealed vault**
("in conservation": 01 Sealed Stat name+structural reason **no tier**; 02
Reframe Map **counts only** — "2 image levers · 2 target variants · setup card
sealed", **no lever/variant/setup contents** — fixing the old sim, which leaked
the full Reframe Map on Free), a quiet **scope line**, and a calm **Halo seal
edge** ("This card has a sealed back · Halo dossier sealed" — not a button
stack). styles.css adds the `.fpwrap` / `.fprail` / `.fpcard*` block (tokens
only; one restrained material shimmer + a sealed-slab weld seam; the card is the
only object with depth per DESIGN_TOKENS) + a narrow-screen stack rule.

**Local tier-display ladder is dev-route-only** (Quiet/Present/Strong/Sharp/
Dominant) — it does NOT rewrite `CARD_LOGIC_V1` §2; *Sample Room Tier Migration
v1* still owns the authoritative public band reconcile. **Verified live**
(`?dev=free-scan-sim`): one landscape artifact at 1600×900 (1364×513, ~7% side
margin) and 1920×1080 (image dominates, 52/48 split, fits height); rail +
footer carry all three dev labels; tier bands Sharp/Strong/Present/Dominant; 2
cue→effect chips; vault shape-only (no Reframe contents leaked); scope + Halo
edge present; no public 0–100 numbers; forbidden-lexicon sweep clean; console
clean. `?dev=uploaded-result` + `?dev=uploaded-blocked` + bare-URL menu
unchanged. **Normal flow untouched** (zero edits to renderMenu/renderDraft/
renderGate/draft wiring): Local Draft → Develop Scan still opens the sealed
engine-offline gate; uploaded photos still produce no analysis. (Screenshot
pipeline unchanged — the dev route needs an explicit `?dev` query; verified via
DOM/geometry inspection as the preview screenshot tool was timing out.)

## Free Pull Screenshot Layout Spec v1 (2026-06-13 / BR-S026, docs only)

New ACTIVE spec `docs/FREE_PULL_SCREENSHOT_LAYOUT_V1.md` (244 lines) — defines
the **front of the Free Pull card** as a **Split Artifact / Stat Board**:
one landscape, PC-first card object, image ~48% near-fullbleed (the image *is*
the card) + artifact title + tiny print/serial/Free Pull badge on the left;
archetype teaser, **4 public tier-band stats** (Presence/Frame/Signal/**Visual
Impact**, bars not 0–100 numbers), **2 grounded receipt chips** (`observed cue
→ artifact effect`), a **sealed vault** (01 Sealed Stat name+structural reason
no tier · 02 Reframe Map *shape/count only* — never expands on Free), a quiet
**scope line**, and a calm **Halo seal edge** (artifact edge, not a SaaS button
stack) on the right. Adds screenshot rules (all of: image · archetype · 4
bands · 2 chips · vault shape · scope · Halo edge in one shot), a hard content
budget (no paragraphs / ≤2–3 chips / short labels), receipt grammar (good +
banned), sealed-vault grammar, anti-goals, and **mock acceptance criteria** for
the next task. **Roadmap correction recorded:** the front is specified *before*
the Halo back (the sealed back) is mocked — corrected order is Free Pull Layout
Mock v1 → Sample Room Tier Migration v1 → Halo Gate Dev Mock v1. **Spec Change
Review (slim):** §7 recommends a screenshot-facing band ladder **Quiet · Set ·
Strong · Sharp · Dominant** that **diverges from `CARD_LOGIC_V1` §2**
(QUIET/PRESENT/STRONG/DOMINANT/TOTAL); the conflict is **named, not picked
silently** — the spec explicitly does NOT override §2, and flags reconciliation
to *Sample Room Tier Migration v1* (which also migrates the legacy sample-room
Charge/0–100 display per `PROJECT_OS` §7/§9). **Docs only — runtime unchanged**
(no app.js/scan-contract.js/data.js/index.html/styles.css edits; no AI/backend/
upload analysis/payment/Halo unlock/runtime mock). FILE_MAP registers it. No
LOCKED safety rule relaxed.

## Halo Gate / Upgrade Layup v1 (2026-06-13 / BR-S025, docs only)

New ACTIVE spec `docs/HALO_GATE_UPGRADE_LAYUP_V1.md` (284 lines) — designs
the Halo upgrade as a **sealed-dossier ritual, not a SaaS paywall**, with
no payment implemented. Core law: Free Pull is complete; Halo opens the
**back of the same card** (the user opens a dossier on a card they already
hold — never a reroll, gamble, or rarity chase). Defines: upgrade **timing**
(gate appears only after the Free Pull fully lands; never an interrupt
before value); the **gate layout** (a card-back/sealed chamber with sealed
stat / Reframe-Map / evidence / oracle / mint envelopes showing *shape*, not
contents; CTA "Open Halo Dossier", decline "Keep Free Pull"); **Free preview
vs Halo content**; **sealed-stat** presentation (structural reason, no tier);
the **Reframe-Map envelope** ("3 image levers · 2 target variants · setup
card sealed" — no near-miss language); **per-scan price framing** (one-time,
this card only; no subscription/packs/credits/blind purchase — no price
picked, no checkout); **ethical decline** (no confirmshaming/nags);
**post-unlock reveal rhythm** (calm archival sequence, no slot-machine/
chest/confetti); a hard **dark-pattern ban list**; and a **copy library**
(20 headings, 20 CTA/support, 20 decline, 20 Reframe envelope, 20 sealed
teaser, 10 reveal). **Docs only — runtime unchanged** (no app.js/
scan-contract.js/data.js/index.html/styles.css edits; no payment/checkout).
FILE_MAP registers it. Feeds *Halo Gate Dev Mock v1*. No LOCKED safety rule
relaxed.

## Card System Fixture Upgrade v1 (2026-06-13 / BR-S024, scan-contract.js + app.js + styles.css)

The dev-only Free Scan Simulation (`?dev=free-scan-sim`) now reflects
CARD_SYSTEM_V1 + CARD_LOGIC_V1 — **dev fixture only, no AI, no user-photo
analysis**. `DEV_FIXTURES.validFreeSimulationResult` gained future-facing
fields (still passes the unchanged validator): **publicStats** (label/tier/
bars/receiptId — public TIER bands, the card shows tiers/bars, never exact
0–100; internal numbers kept for sorting but never printed), **grounded
receipts** (added `observedCue`/`artifactEffect` alongside the
validator-required lens/observation/visibleCue/effect/confidence), a
**scopeLine**, a **sealedStat** (label/teaser/reasonType — sealed, no value
shown), **rarity** (band/print/reason + a quality-neutral note that avoids
the forbidden lexicon), and a **reframeMap** (current / whyThisCard /
levers / setupCard — image-setup changes only, no near-miss or
self-improvement language). `renderUploadedScanResultDev` renders tier rows
(tonal 5-seg bar), grounded "cue → effect" receipts, and scope/sealed/
rarity/Reframe panels — all **gated on field presence**, so
`?dev=uploaded-result` is pixel-identical and `?dev=uploaded-blocked` still
blocks. The **validator was not weakened** (SCHEMA_KEYS / FORBIDDEN_TERMS /
scanForbidden unchanged; the upgraded fixture passes, invalid fixtures still
fail). styles.css adds `.uploadeddev__tier*` / `__scope` / `__ground` /
`__seal*` / `__rarity*` / `__lever`/`__setup` (tokens only). **Normal flow
untouched**: Develop Scan still opens the sealed engine-offline gate;
uploaded photos still produce nothing; sample room + deep links verified
unchanged; console clean. Adversarial review (safety / validator /
preservation / UX): 3 low findings, all fixed (plate-order restore for
uploaded-result, tonal tier bars, sealed-header wrap). Dev sim needs an
explicit query — not in the screenshot pipeline.

## Executable Card Logic v1 (2026-06-13 / BR-S023, docs only)

New ACTIVE spec `docs/CARD_LOGIC_V1.md` (223 lines) — turns CARD_SYSTEM_V1
into a hidden ruleset so cards read rule-driven, not "vibe text with fake
precision". Defines: **public tier bands** (QUIET/PRESENT/STRONG/DOMINANT/
TOTAL — cards show tiers/bars, never exact 0–100; DOMINANT explicitly
guarded against person/alpha dominance) with a *provisional* internal→public
mapping; **two-layer receipt grounding** (`[observed cue] → [artifact
effect]`, no Tier 2 without Tier 1); detected cue categories; the **Artifact
Test as an executable line check** (sentence subject must be an image
element, never the person); **trigger rules for all 24 archetypes** (Primary
/ Cue / Lenses / Block / Tie-break) + the 3 risky ones held; **sealed-stat
logic** (5 reason types, never always the highest); **rarity logic**
(unusual artifact profile, never better-human; 6 provisional bands);
**Reframe Map** (image changes only — never "look/dress/be better");
**low-information ladder** (8 safe special-card types + a blocked path for
face-rating bait); **voice-register rotation** + house-phrase watchlist; and
**validator targets**. **Docs only — runtime unchanged** (no
app.js/scan-contract.js/data.js/index.html/styles.css edits). FILE_MAP
registers it. Feeds *Card System Fixture Upgrade v1*. No LOCKED safety rule
relaxed.

## Card System Spec v1 (2026-06-13 / BR-S022, docs only)

New ACTIVE spec `docs/CARD_SYSTEM_V1.md` (333 lines) — the official card
creative system: the Artifact Test ("if a different photo of the same
person could change the score it is an artifact signal; if it sticks to the
person it is banned"), final v1 stats (Free-front: Presence/Frame/Signal/
Visual Impact · Halo-depth: Charge/Lore Density/Fit Coherence/**Gesture
Geometry**/Setting Gravity/Artifact Coherence — "Stance Read"/"Gesture
Authority" renamed to Gesture Geometry), 10 lenses, 24 safe archetypes in 5
families (3 risky ones held for later; "The Beautiful Contradiction"
renamed "The Striking Contradiction" — "beautiful" is banned beauty-app
language), receipt rules + 20 safe examples, Free vs Halo output shape, and
BLUE ROOM tone (20 approved + 20 banned patterns, 20 Free / 20 Halo / 10
oracle lines), plus the global forbidden-language list. **Docs only —
runtime unchanged** (no app.js/scan-contract.js/data.js/index.html/styles.css
edits). Spec Change Review: the v1 stat taxonomy refines `SCAN_ENGINE_SPEC`
(Charge → Halo, Visual Impact → Free front, +Setting Gravity/Artifact
Coherence); the shipped fixtures still use the prior set and migrate in the
next task. `FILE_MAP` registers the spec. No LOCKED safety rule relaxed.

## Free Scan Simulation v1 — Dev Only (2026-06-13 / BR-S021, app.js + scan-contract.js + styles.css)

A third dev-only route `?dev=free-scan-sim` (alongside `uploaded-result` /
`uploaded-blocked`) that previews the **future Free Scan rhythm** — dev
fixture only, **no AI, no user-photo analysis**. `mountDev()` loads the new
`DEV_FIXTURES.validFreeSimulationResult` (a FREE-tier result: 4 visible
stats, limited receipts, free summary, no Halo-only fields — passes the
validator) and calls `renderUploadedScanResultDev(result, { mode:
"free-scan-sim" })`. Sim mode adds a triple-labelled banner (DEV SIMULATION
· NOT REAL ANALYSIS · NOT USER SCAN), a "FREE SCAN SIMULATION · DEV ONLY"
heading, and a **static** 3-step stepper (Local draft staged → Scan
development simulated → Free result preview — no progress bar implying real
processing), each step carrying one of the three labels; the preview shows
only the 4 visible stats with a sealed-Halo note (not unlocked). The
renderer **always** validates first — an invalid fixture renders the safe
blocked state, so the sim can't bypass validation. styles.css adds
`.freesim*` / `.uploadeddev__tag--sim` (cyan accent, distinct from the moss
dev-harness) + `.uploadeddev__sealed`. `renderUploadedScanResultDev` gained
a backward-compatible `opts` param (existing callers unchanged). **Normal
flow untouched**: bare URL → menu; Develop Scan still opens the sealed
engine-offline gate; uploaded photos still produce nothing; both existing
`?dev` routes, the sample room, and all deep links verified unchanged;
console clean. Adversarial review (safety / validator / preservation / UX):
**0 findings**. Dev simulation needs an explicit query — not in the
screenshot pipeline.

## Uploaded Scan Result Renderer v1 — Dev Harness (2026-06-13 / BR-S020, app.js + scan-contract.js + index.html + styles.css)

A fourth **dev-only** view (`state.view==="dev"`) that previews what a
*future* uploaded-photo scan result would look like — **dev fixtures only,
no AI, no user-photo analysis**. Reachable ONLY via the URL query
`?dev=uploaded-result` or `?dev=uploaded-blocked` (no menu link, no product
CTA; the dev param gate takes precedence over the src/t/tab room gate).
`renderUploadedScanResultDev(result)` (app.js) **always** runs
`validateUploadedScanResult` first: `!ok` → the safe blocked state, `ok` →
a preview (artifact card, visible + extended stats, readings, evidence
board, safety-flags/schema), every surface labelled **DEV HARNESS / NOT
USER SCAN** with a "presentation scores of the image artifact — not the
person" caption. A new valid fixture `DEV_FIXTURES.validDevRendererResult`
(obviously a dev fixture, passes the validator) drives `?dev=uploaded-result`;
`?dev=uploaded-blocked` feeds an invalid fixture → blocked. index.html adds
`#devView`; styles.css adds `.dev` / `.uploadeddev*` and extends the
visibility matrix to four views. **Normal flow unchanged**: bare URL →
menu; Add Your Photo → Local Draft; Develop Scan still opens the sealed
engine-offline gate; uploaded photos still produce nothing; sample room +
deep links verified unchanged; console clean. The dev harness needs an
explicit query, so it is not in the headless screenshot pipeline.

## Scan Engine Foundation v1 (2026-06-13 / BR-S019, scan-contract.js + app.js + index.html + styles.css)

New pure non-AI **safety valve** `scan-contract.js` (IIFE →
`window.BlueRoomScanContract`). `validateUploadedScanResult(result) ->
{ok, errors[], warnings[]}` enforces the uploaded-v1 contract
(kind/schemaVersion/status/source.mode; all four `safetyFlags` present and
false; `evidenceBoard` items `{lens, observation, visibleCue, effect,
confidence}`), blocks sample mixing (sample kind / `SRC-*` ids / v2
schema), and scans the forbidden human-rating lexicon in keys
(allowlist-guarded so legit keys like `label`/`archetypeClass` and the
`contains*` flags never false-trigger) and in **every string value**
(whole-word), enforces a bare `value` key positionally (allowed only as a
numeric stat under `stats.*`), and flags person-truth claims in
`artifact.title` + `readings.*`. A 4-pass adversarial review workflow
(safety / preservation / UX / simplicity) surfaced **3 confirmed safety
gaps** — forbidden terms unscanned in label/archetypeClass/material/family/
fileLabel *values*, a `value`-key bypass, and unscanned title person-truth
— all fixed before commit (3 nitpicks rejected). `createBlockedScanState(reason,
errors)` is a pure failure-state shape. `DEV_FIXTURES` (validMinimal + 4
invalid) are console/test only — never rendered as analysis. The validator
is pure: no DOM/AI/API/IO, no input mutation. app.js gains
`renderBlockedScan(b)` — a calm, archival safe-failure plate (errors
ledger; "no card/stats/oracle/receipts"; four return paths) — **FOUNDATION
ONLY, not wired to normal flow**. index.html loads the script before
app.js; styles.css adds `.gatepanel--blocked` / `.gateblock__errs`.
**No engine, no AI, no fake output**: the local draft still produces
nothing and "Develop scan" still only opens the sealed offline gate.
Reconciled `SCAN_ENGINE_CONTRACT` §4/§6 evidence field names to
`{lens, observation, visibleCue, effect, confidence}` to match the
validator (Spec Change Review). `FILE_MAP` registers `scan-contract.js`.
Verified live: all 5 fixtures validate as expected; sample room + both
deep links unchanged; console clean.

## Scan Engine Contract v1 (2026-06-13 / BR-S018, docs only)

New ACTIVE spec `docs/SCAN_ENGINE_CONTRACT.md` — the allowed output shape
and safety boundaries for a *future* engine that develops an **uploaded**
photo. Documentation only: **runtime behavior intentionally unchanged**
(no app.js/data.js/styles.css edits) — the local draft still produces no
stats and "Develop scan" still only opens the engine-offline gate. The
contract defines: red lines (no person/beauty/biology/identity/worth/fake-
psychology), the `ScanResultUploaded v1` shape (a separate `kind`, reusing
ScanResult v2 stat/receipt/confidence conventions but never mixed with
`SOURCES`/`SCAN_RESULTS_V2`), the result lifecycle (`local_draft` /
`gate_offline` active; `scan_pending/complete/failed_future` placeholders),
allowed vs forbidden lenses, receipt rules, the Free-vs-Halo reveal model,
and engine-connection gates (schema-validate + block unsafe fields before
any engine is wired). `docs/FILE_MAP.md` registers the new spec (governance:
no new doc without a FILE_MAP entry). Spec Change Review only — no LOCKED
law changed. Next: a non-AI Scan Contract Validator Stub (TASK_QUEUE).

## Local Draft Polish v1 (2026-06-13 / BR-S017, app.js + styles.css)

Presentation-only polish of the browser-local intake + sealed gate — no
engine, no analysis. The real `file.name` still lives on `draft`; two
display helpers (`fileTypeLabel()`, `cleanFileLabel()`) format a clean
label so the card title is now **"Local image"** with a compact secondary
line "PNG · 1.0 MB · ac277f35…eb8.png" (long names shortened, extension
kept) — no more raw ugly filename as the title. Card hierarchy tightened:
prominent "No scan has run yet." status + quiet "Image loaded in this
browser only." sub; intake lead trimmed to a next-step "Ready for scan
development." Develop CTA subcopy → "Stage artifact for future scan
engine." (honest, no implication a scan ran). Gate clarity: an "engine
offline" status dot on the tag and a slightly stronger "Development
pending" — ledger, disabled Run-engine button, and all "nothing has run"
copy unchanged. Still reads only `draft`; never calls getActiveScan/
getScanResult or touches SOURCES/SCAN_RESULTS_V2; no numbers/stats on the
draft beyond honest file size. Sample room + deep links untouched; gate/
intake remain not headlessly capturable (no screenshots).

## Scan Development Gate v1 (2026-06-13 / BR-S016, app.js + styles.css)

The Local Draft intake now carries a quiet **"Develop scan"** CTA (subcopy
"Scan engine not connected yet."). Clicking it sets `state.draftGate = true`
and re-renders `#draftView` as a sealed **Scan Development Gate**
(`renderGate()`): an "Engine offline" tag, a dimmed sealed thumbnail of the
staged artifact, the fixed ledger (No analysis has run · No stats have been
generated · No receipts exist · No oracle exists · No Halo result exists),
a DISABLED "Run engine · offline" button, "Development pending" + "Ready for
future scan engine." It generates NOTHING and never calls
`getActiveScan()`/`getScanResult()` or touches `SOURCES`/`SCAN_RESULTS_V2`
— it reads only `draft`. Return paths: Return to local draft
(`data-gate="close"`) · Replace image · Enter sample scan room · Main menu;
Escape steps back (gate → intake → menu); a fresh/replaced draft and the
menu Resume both land on the intake. Like the intake, the gate needs a
user-picked file, so it is not headlessly capturable (not screenshotted).
Sample room, menu, and deep links are unchanged. Styles: `.gate`,
`.gatepanel*`, `.gatecheck`, `.gateactions`, `.draft__develop*` (existing
tokens; flat plate, no animation).

## Local Draft intake v1 (2026-06-13, index.html + app.js + styles.css)

"Add your photo" is now a real browser-local intake. A hidden image file
input feeds `loadDraftFile()`, which builds a `URL.createObjectURL`
preview and switches to a third view (`draft`) showing a LOCAL DRAFT
artifact card + honest copy (browser-local only / no scan has run / ready
for scan development / no analysis). No upload, no storage, no AI, and NO
fabricated stats/receipts/oracle/hidden/serial. Non-image files are
rejected with a short message; large files (>25 MB) warn but still
preview; object URLs are revoked on replace. Return paths: Replace image ·
Enter sample scan room · Main menu · Resume local draft (menu re-renders
to offer Resume). Deep links and the sample room are untouched. The draft
view needs a user-selected file, so it is NOT in the headless capture set
(verified live via the preview tools instead); only `menu-front`
refreshed (the Add button is now active, not "· later").

## Main Menu v1 (2026-06-13, index.html + app.js + styles.css + capture-screens.ps1)

Added a front-door **menu view** before the scan room, using the existing
SRC-01 sample only (no new asset). Shows the same photo two ways — a matte
**Free Pull** plate and a copper-edged **Halo Mint** artifact — with brand,
thesis, a compliant trust line ("…it reads frame, gesture and signal, never
the person"; the suggested "beauty/face" wording was dropped to honour
COPY_SYSTEM + the task's own no-beauty-language rule), the tier chips, an
"Enter Scan Room" CTA and a disabled "Add your photo · later" secondary.
Implemented as `state.view` + `body[data-view]` (`applyView()`); deep links
with any `src/t/tab` param bypass the menu (`view="room"` at init). Scan
room DOM/rendering/gating untouched. One new no-param screenshot state
(`menu-front`) added to the capture pipeline + SCREENS.md (all existing
param shots bypass the menu, so a bare-URL shot is the only way to review
it).

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
