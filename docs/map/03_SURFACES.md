# BLUE ROOM — Surfaces Map (03)

Layer: MAP · "you are here" reference for the ACTUAL BUILT artifact · 2026-06-14

This maps the real DOM/views/state/panels/plates/code of the scan room as it is built
right now — every claim cites a render function, CSS class, data key, or URL param. It
complements, never duplicates: `docs/UNIVERSE_ZONE_MAP_V1.md` (concept zones) and
`docs/FILE_MAP.md` (file router). Ground truth: `app.js`, `data.js`, `index.html`,
`styles.css`. Recent truth honored: **BR-S044** merged the old Source tab INTO Diagram (left
panel = 2 tabs, with a CLEAN | ANNOTATED toggle) and deleted the Capture Record module;
**BR-S038** added the Plate 01 filing-event row + serial-lineage spine.

---

## 0. The room shell (where the surfaces mount)

`render()` (`app.js`) fills three mounts inside `<main class="room">` (`index.html`):

| Mount id | CSS class | Filled by | This doc |
| --- | --- | --- | --- |
| `#sourcePanel` | `.panel.panel--source` | `renderLeftPanel(src, treatment, tab)` | §1 LEFT |
| `#stageZone` | `.stagezone` | `stageIntro` + `renderCard()` + `.stagecue` link | §2 CENTER |
| `#readingPanel` | `.panel.panel--reading` | `renderReadingPanel(src, treatment)` | §3 RIGHT |
| `#dossierMount` | `.dossier` | `renderDossier(src, treatment)` | §4 DOSSIER |

`render()` also sets `document.body.dataset.treatment` and the page-level `--halo-a/b/c`
custom properties off `src.halo` (used by body-scoped shiny rules). `src` is
`SOURCES[state.source]`. The two toggles in `<header class="topbar">` (`#sourceToggle`,
`#treatmentToggle`) flip `state.source` / `state.treatment` and re-`render()`.

---

## 1. LEFT panel — Diagram | Metrics (`renderLeftPanel`)

Post BR-S044 the left panel is a **2-tab** bar (`.tabbar`), not 3. `renderLeftPanel`
builds the bar by mapping over the literal array `["diagram", "metrics"]` only — there is
no Source button. A defensive shim `t2 = tab === "source" ? "diagram" : tab` re-points any
stale `source` tab to Diagram (mirrors the `?tab=source → diagram` redirect at parse time,
`app.js`). Active button gets `.is-active`. Body = `renderMetricsTab` or `renderDiagramTab`.

### 1a. Tab 1 — Diagram (`renderDiagramTab`) · the merged visual scan sheet

The old standalone "Source" image tab is gone; its raw-photo role folded in here as the
**CLEAN** view. The tab renders two `.module` blocks:

**Module A — `{src.label} — Diagram`** (`moduleHead`), containing:

- A **CLEAN | ANNOTATED toggle** — a `.diagtoggle` group of two `.tabbar__btn` buttons
  carrying `data-diagview="annotated"` / `data-diagview="clean"`. Backed by
  `state.diagramView` (default `"annotated"`, `app.js` line 44) and deep-linkable via
  **`?dv=clean|annotated`**. A delegated `#sourcePanel` click handler (`app.js`) sets
  `state.diagramView` and re-renders.
- The view state is carried as a **CSS class on `.diagwrap`**: `clean` →
  `<div class="diagwrap is-clean">`, otherwise plain `.diagwrap`. The styles.css rules that
  define what each view shows:
  - `.diagwrap.is-clean .scanframe--diagram .scanframe__img { filter: none; }` — CLEAN
    shows the raw photo (ANNOTATED desaturates/darkens it via the base
    `.scanframe--diagram .scanframe__img` filter).
  - `.diagwrap.is-clean .diagsvg, .diagwrap.is-clean .diaglabels { display: none; }` —
    CLEAN **hides** the overlay SVG geometry + its HTML labels.
  - `.diagwrap:not(.is-clean) .marker` and `… .markerlegend { display: none; }` —
    ANNOTATED **hides** the numbered markers + the legend list.
  - Net: **CLEAN = raw photo + numbered `.marker` pins (1..n) + the `.markerlegend` list.
    ANNOTATED = desaturated photo + the overlay diagram (SVG geometry + `.dg-label`s),
    no number pins/legend.**
- The framed image `.scanframe.scanframe--diagram[data-imgwrap]` holds: the photo
  (`imgOrPlaceholder(src.file, "scanframe__img")`), `.scanframe__corners`, the optional
  `.horizonline` (only if `src.horizon != null` — SRC-02 has `horizon: 29`, SRC-01 is
  `null`), the numbered `.marker` pins, the stretched `<svg class="diagsvg" viewBox="0 0 100
  100" preserveAspectRatio="none">`, and the `.diaglabels` span.
- Three **`.scanframe__meta`** corner stamps:
  - top-left (`--tl`): **`SCAN SHEET NN`** in ANNOTATED, **`BR-SRC NN`** in CLEAN
    (`clean ? … : …`).
  - bottom-right (`--br`): `src.capture.code` (e.g. `CANDID / DRV`, `FIELD / ICE`).
  - bottom-left (`--bl`): the **Lens·Light meta line** — `` `${src.capture.lens} · ${src.capture.light}` `` (e.g. `ACTION-WIDE · 16MM EQ · OVERCAST · REAR-LEFT FILL`).

**The overlay geometry (ANNOTATED, free vs developed).** `const full = treatment !== "free"`
gates the deeper overlays. Always drawn: rule-of-thirds grid (`.dg--grid`), subject mass box
(`.dg--mass`, label `d.massBox.label`), focal lock (`.dg--focal`, reuses `src.markers[0]`,
label `FOCAL LOCK`). Only when `full` (Halo/Lab): crop **pressure** zones (`.dg--pressure`,
from `d.pressure`), **gesture/posture** line (`.dg--gesture`, `d.gesture`), **horizon/frame
axis** (`.dg--axis`, `d.axis`), **signal direction arrow** (`.dg--arrow`, `d.arrow`), and the
**light direction** ray-fan glyph (`.dg--light`, `d.light`). Geometry is drawn as ellipses
(y-radius ÷ `d.aspect`) and visual-space angles to survive the stretched viewBox.

A free-only **`.devnote`** appears under the frame: *"Preview diagram — gesture line, axes,
light read and pressure zones develop with Halo Mint."* (omitted when `full`).

**Module B — `Diagram Notes`** (the **Frame Read** notes). Sub-label `<p class="notes__sub">Frame Read</p>`, then two `<ul class="notes">`: the first from
`src.analysis` (5 ALL-CAPS frame-read lines, e.g. `WIDE-ANGLE FIELD · BARREL DISTORTION
+12%`), the second `.notes--diagram` from `src.diagram.notes` (5 lines, e.g. `FOCAL LOCK —
FACE, LEFT THIRD`). Both show in every state (not `full`-gated).

> Gone post BR-S044: the standalone **Source** tab and the **Capture Record** module. Do not
> re-add a third tab button. `src.capture.locale`/`.rec` still exist in `data.js` but are no
> longer surfaced on the left panel (rec date still prints on the card photo as `REC …`).

### 1b. Tab 2 — Metrics (`renderMetricsTab`) · stylish receipts, not science

`const free = treatment === "free"`, `const m = src.metrics`. Four modules:

1. **Stat Diamond** — `statDiamond(src.card.stats, treatment)`: a radar `<svg class="diamond">`
   with axes **FRAME PRESENCE (top) · FRAME (right) · SIGNAL (bottom) · SCENE CHARGE (left)**
   (artifact-safe labels; internal keys `presence/frame/signal/charge`). Always shown.
2. **Signal Mix** — `m.signalMix` mapped through `mixRow(k, v)` (`.impact` rows with a 0-100
   `--v`). Always shown.
3. **Composition Pressure** — `free ? lockedModule(…) : …`. Free shows a `lockedModule`
   ("Pressure graph recorded, undeveloped…"); developed shows the L↔R `.balance` bar
   (`m.pressure.balance`) + three `mixRow`s (Center pull / Background noise / Focal clarity).
4. **Fit Coherence Matrix** — same free/developed split; developed shows `.fitgrid` of
   `m.fitMatrix` cells (`f.k`/`f.state`/`f.v`).

Foot caption `.metriccap--foot`: *"◆ weighted read · interpretive formula, not a measurement."*
(TODO in code: `signalMix`/`pressure`/`fitMatrix` are still legacy `src.metrics`, not yet in
ScanResult v2.)

---

## 2. CENTER — the card on its stage (`renderCard`)

`#stageZone` = a `.stageintro` line ("Every photo is already a card. The room develops it." +
`Sample scan · NN / 02` cue) + the card `<article class="card">` + a `.stagecue` anchor
("▼ SCAN DOSSIER BELOW" → `#dossierMount`).

**One master base, treatment re-skins only.** `renderCard` builds a single `<article
class="card" data-treatment="{treatment}" data-material="{src.halo.material}">` with inline
`--halo-a/b/c` from `src.halo`. The plate (`.card__plate`) holds, top to bottom:
`.card__head` (house `◆ BLUE ROOM ARCHIVE` + `.card__rarity`), the `.photo` figure
(`imgOrPlaceholder` + scrim/tone/grain/foil/shimmer/hairline spans + `BR-SCN NN · 4:5`,
`REC {src.capture.rec}`, and `.photo__tag` = `src.capture.code`), `.titleblock`
(`c.title` / `c.archetype` / `Signal Note` = `c.note`), `.statzone` (the 4 mini stats),
`.signature` (`c.signature`), and `.mintstrip` (stamp/serial/barcode).

### 2a. Treatment skins (via `data-treatment` + `--halo-*`)

`const minted = treatment !== "free"`. The skin is pure CSS keyed on `.card[data-treatment="…"]`
(`styles.css` ~795–1000), driven by the `TREATMENTS[treatment]` labels (`data.js`):

| `treatment` | `TREATMENTS` label | `.card__rarity` (t.rarity) | `.mintstrip` stamp | Notes |
| --- | --- | --- | --- | --- |
| `free` | Free Pull | `ARCHIVE PREVIEW` | `FREE PULL` | matte; serial ghosted (`mintstrip__serial--ghost`, shows only `t.strip`), `barcode--ghost`. |
| `shiny` (= Halo Mint) | Halo Mint | `HALO MINT · DEVELOPED` | `HALO MINT` | developed/foil skin; full serial `c.serial · t.strip`. The customer-facing developed state. |
| `mint` (= Lab) | Lab · Signature Mint | `LAB STATE` | `LAB MINT` | internal silver material study (keyboard **M**), `--silver` accents. Not a customer tier. |

`minted` (true for shiny+mint) controls whether the serial line shows `c.serial` and drops
the `--ghost`/`--free` modifiers. So free vs developed differ **on the card** by the rarity
text, mintstrip stamp, serial visibility, barcode, and the CSS foil/tone — never a re-layout.

### 2b. Lab materials overlay (`data-lab-material`)

Active **only** in the Lab state. `renderCard` computes `labMat` only when `treatment ===
"mint" && state.labMaterial` and looks it up in `LAB_MATERIALS` (`data.js`). When present it
adds `data-lab-material="{key}"` to the `.card` and appends the finish label to the rarity
line (`` `${t.rarity} · ${labMat.label}` ``, e.g. `LAB STATE · Cold Foil`). The 3 finishes:

| `key` | `label` | CSS selector |
| --- | --- | --- |
| `cold-foil` | Cold Foil | `.card[data-treatment="mint"][data-lab-material="cold-foil"]` (styles.css ~856) |
| `black-star` | Black Star | `…[data-lab-material="black-star"]` (~894) |
| `night-gloss` | Night Gloss | `…[data-lab-material="night-gloss"]` (~929) |

Reached via the Lab-only **`[` / `]`** keys (cycle `null → cold-foil → black-star →
night-gloss → null`, `app.js` keydown) or the deep link **`?t=mint&lab=<key>`** (parsed only
when `t=mint`). Every non-mint treatment switch clears `state.labMaterial` (so free/shiny
cards stay byte-identical). It is a card-surface finish study, never a customer tier.

---

## 3. RIGHT panel — Scan Reading (`renderReadingPanel`)

`const free = treatment === "free"`. Header `.readhead`: title "Scan Reading", chip
(`src.capture.code`), a state badge `.readhead__badge--{treatment}` whose text is
`free ? "Archive Preview" : treatment === "mint" ? "Lab · Signature Mint" : "Developed ·
Halo Mint"`, and the tagline `TREATMENTS[treatment].tagline`.

**Always shown (free + developed):**
- **Stat Reading** — per visible stat (`scan?.tierOutputs.free.statsShown` or the 4
  defaults): name + tier band (`tierBand(val)`) + prose from `src.reads[k]`.
- **Aura Profile** — `.aura__chip`s from `src.aura` (e.g. Idle-Engine / Open-Palm /
  Northbound).
- **Scene Role** — `src.sceneRole`.

**Then the panel forks:** `free ? lockedDeep : archetypeModule + deep + shinyTease + shinyBadge`.

**Free (`lockedDeep`):** a **Develop This Scan** CTA module (`.unlock--spine`, a
`data-goto="shiny"` button that switches treatment with no checkout) + three `lockedModule`
archive teasers (Stance Read / Fit Coherence / Oracle Read). Intentional archive copy, never
a blurred paywall.

**Developed (shiny/mint) — `archetypeModule` + `deep`:**
- **Artifact Archetype** (`archetypeModule`) — **developed-only**, and only when the v2 scan
  carries an `archetype.class` present in `ARCHETYPE_NOTES` (`data.js`: `The Encounter`,
  `The Dispatch`). Renders a `Artifact class · {cls}` chip + `note.line` + `note.discovery`
  + the caption "artifact archetype · a photo role, not a person". Omitted otherwise (no
  instance-title fallback).
- **`deep`** modules: **Stance Read** (`src.stance`), **Fit Coherence** (`src.fit`), **Frame
  Impact** (`src.impact`, tier band), **Lore Density** (`src.lore`, dashed fill), **Oracle
  Read** (`src.oracle`), **Mint Record** (`.kv` of serial/edition/batch/minted), and a
  collapsible **Technical Receipts** `<details>` (`src.receipts` + the `FORMULAS` interpretive
  recipe).
- **`shinyTease`** appears only in **mint** (Lab) — a "Lab State" note + a `data-goto="shiny"`
  button to switch to Halo Mint. **`shinyBadge`** appears only in **shiny** — the `◆ HALO MINT
  · FULLY DEVELOPED ◆` maxbadge.

So **Free-gated → develops with Halo**: the Artifact Archetype module, Stance/Fit/Impact/Lore
prose, Oracle, Mint Record, Technical Receipts + formulas, the full diagram overlays (§1a),
and the Composition Pressure / Fit Matrix metrics (§1b).

---

## 4. DOSSIER — 7 plates (`renderDossier`)

Below the hero. `const paid = treatment !== "free"`. Each plate is `dplate(no, title, paid,
body, extraClass)` → `<section class="dplate">` with a header tag that reads **`DEVELOPED`**
(paid, `.dplate__tag--dev`) or **`ARCHIVE PULL`** (free). Order is fixed and **capped at 7**:

| # | Title | Holds | Free / Halo gating |
| --- | --- | --- | --- |
| 01 | **Source Record** | `.drecord` grid (Source ID, Capture Type, Lead Gesture, Container, Primary/Background signal, Eligibility, Provenance, Markings) from `d.record`; then the BR-S038 **`.dfile`** block: a **Filing event** chain (`.dfiling__chain` of `fileSteps`: capture → route → scan status → **filed as** `{archetype.class}`, a descending caption) + the **Serial lineage** spine `.dlineage` (**Object → Scan → Card → Mint**). | Full grid both states. **Card + Mint rows masked `····`** (`.dlineage__v--ghost`) on Free; assigned on Develop. `objectNo` is the spine head (Object). Scan row only if `scan.scanId`. |
| 02 | **Evidence Board** | `.dboard` of receipts. Prefers v2 `scan.receipts` (cue/effect/basis/confidence as `.receipt`); legacy fallback = `d.evidence` items. | Free shows `tierOutputs.free.receiptsShown` (first 3) or `d.evidence.filter(e => e.free)`, plus a `.receipt--undeveloped` "N receipts undeveloped" stub. Paid shows all. |
| 03 | **Stat Dossier** | `.dstats` — per stat: name, fill bar (`freeVals[k]`), tier band, `src.reads[k]`. | Both states show the bar+band+why. **Evidence + note layer** (`d.statNotes[k].evidence/.note`) is **paid-only**; free shows "— evidence layer develops with the mint." |
| 04 | **Hidden Stat** | The sealed second reading — v2 `scan.conditionalStats[0]` or `d.hidden` (SRC-01 *Gesture Geometry* 88, SRC-02 *Field Silence* 91). | **Paid:** tier band + name + read. **Free:** `.dhidden--tease` — value `··`, `Sealed · development pending`, `d.hidden.tease`. |
| 05 | **Fit + Aura Layer** | Aura chips + Scene Role + Stance, plus Halo deeper stats (Frame Impact from `haloExtended.visualImpact`, Lore from `haloExtended.loreDensity`). | **Paid:** full two-column read. **Free:** `.dfitaura--tease` — aura chips only + "Full aura interpretation develops with Halo Mint." |
| 06 | **Mint Record** (`.dplate--mint`) | Developed: `.drecord--mint` (Developed From, Treatment, Primary/Secondary trigger, Material, Treatment Family, Archive Status, Mint Serial) + `d.mint.note`. | **Paid:** full mint record. **Free:** "Archive pull · not minted" + Material-on-development + reserved serial (`BR-SRC{NN}-HM-····`) + a `data-goto="shiny"` **Develop this scan** CTA. |
| 07 | **Oracle Read** (`.dplate--oracle`) | `.doracle` blockquote + `.doracle__timeline`. | **Paid:** full oracle (`readings.oracle`/`d.oracle.full`) + timeline. **Free:** short line (`tierOutputs.free.oracle`/`d.oracle.short`) + ghost "full read develops with the mint." |

Wrapped by `.dossier__cue` ("SCAN DOSSIER — FULL RECORD") above and `.dossier__end`
("END OF RECORD · {LABEL} · BLUE ROOM ARCHIVE") below.

---

## 5. SURFACE / STATE MATRIX — the "where are we" coordinate system

State lives in `app.js`: `state = { source, treatment, tab, view, draftGate, dev,
labMaterial, diagramView }`. The addressable sample-room space:

**2 sources × 3 treatments × 2 left-tabs (Diagram has 2 sub-views):**

| Axis | Values | Driver | Deep link |
| --- | --- | --- | --- |
| **source** | `0` = SRC-01 Driver · `1` = SRC-02 Ice Field | `#sourceToggle`, keys **1/2** | `?src=1\|2` |
| **treatment** | `free` · `shiny` (Halo Mint) · `mint` (Lab) | `#treatmentToggle` (free/shiny only), keys **F / H(or S) / M** | `?t=free\|shiny\|mint` |
| **tab** (left) | `diagram` · `metrics` | `.tabbar` buttons, devnav | `?tab=diagram\|metrics` (`tab=source` → diagram) |
| **diagramView** | `annotated` (default) · `clean` | `.diagtoggle` buttons | `?dv=annotated\|clean` |
| **labMaterial** | `null` · `cold-foil` · `black-star` · `night-gloss` | Lab keys **`[` / `]`** | `?t=mint&lab=<key>` (mint only) |

That is **2 × 3 × 2 = 12** core room coordinates (×2 again for the Diagram clean/annotated
sub-view; ×4 for the Lab finishes within the mint column). Any of `src`/`t`/`tab` in the URL
opens the room directly and **bypasses the menu** (`app.js` deep-link block).

**Non-room views (`state.view`, `applyView()` → `body[data-view]`):**

| `view` | Surface | Render fn | Reached by |
| --- | --- | --- | --- |
| `menu` | Front door / Lobby (one SRC-01 sample) | `renderMenu` → `#menuView` | default; `↑ Menu`; `[data-view-to="menu"]` |
| `room` | The 3-panel scan bench (§1–§4) | `render()` | Enter Scan Room; any `?src/t/tab` |
| `draft` | Local image intake **or** the Scan Development Gate | `renderDraft` → `renderDraftIntake` / `renderGate` (toggled by `state.draftGate`) | pick a photo; "Develop scan" opens the gate. Never via URL. |
| `dev` | Dev harness fixture | `mountDev` → `#devView` | `?dev=…` only |

**The 4 dev routes (`?dev=…`, `state.view="dev"`, `state.dev`):**

| `?dev=` | Renders | Fn |
| --- | --- | --- |
| `uploaded-result` | Validated fixture as the debug stat-stack (legacy 0-100 labels, intentionally) | `renderUploadedScanResultDev(result)` |
| `uploaded-blocked` | Invalid fixture → safe blocked state (no card/stats/oracle) | `renderUploadedScanResultDev` → `renderBlockedScan` |
| `free-scan-sim` | Free Pull Layout Mock — one landscape collectible slab | `renderFreePullMock(result)` |
| `halo-gate` | Sealed card-back / Halo dossier gate mock (CTA permanently disabled) | `renderHaloGateMock()` |

All dev routes validate against `window.BlueRoomScanContract` first and are labelled DEV
HARNESS / NOT USER SCAN; they render no real or AI output. A separate **`?devnav=1`** flag
reveals the `.devnav` state-jumper rail (`renderDevnav`) — dev tooling only, never a product
control; CSS keeps it `display:none` without `body[data-devnav="1"]`.

---

## 6. Pointers (do not duplicate here)

- **Concept zones** (Lobby → Scan Room → Card Record → Vault → Codex, what is LIVE vs
  aspirational): `docs/UNIVERSE_ZONE_MAP_V1.md`.
- **Which file to edit** for any surface: `docs/FILE_MAP.md` (`index.html` shell · `styles.css`
  looks · `app.js` structure/state · `data.js` content).
- **Why** a surface is shaped this way / revisit conditions: `docs/DECISION_LOG.md`,
  `docs/PROJECT_OS.md`.
