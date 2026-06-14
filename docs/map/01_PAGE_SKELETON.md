# 01 · PAGE SKELETON

> You-are-here map of the **built artifact** — the real DOM shell of `index.html`, the
> top-level `#id` containers, the topbar, the room grid, the hidden/dev containers, the
> script load order, and the show/hide logic that decides which container paints in which
> view. This maps the *actual code*, not the concept. For concept zones see
> `docs/UNIVERSE_ZONE_MAP_V1.md`; for the file router see `docs/FILE_MAP.md`.

Ground truth: `index.html` (72 lines, the whole shell) and `app.js`. No build, no node, no
backend — the browser parses `index.html`, runs three scripts, and `app.js` fills every
container with `innerHTML` strings. There is no framework and no router; "navigation" is a
single attribute on `<body>`.

---

## 0 · The one mechanism behind everything: `body[data-view]`

The whole page is one HTML document. Every top-level section is **always in the DOM** — they
are never created or destroyed. Visibility is a pure-CSS switch driven by a single attribute:

- `<body data-treatment="free" data-view="menu">` is the initial state (`index.html:15`).
- `applyView()` (`app.js:898-900`) is a one-liner: `document.body.dataset.view = state.view;`
- CSS at `styles.css:1925-1946` reads `body[data-view="…"]` and sets `display:none` on every
  section that does *not* belong to the current view. **Exactly one of menu / room / draft /
  dev is shown.** (Comment at `styles.css:1925`.)
- `state.view` ∈ `{ "menu", "room", "draft", "dev" }` (default `"menu"`, `app.js:44`).

So "showing a view" = set `state.view` → call `applyView()` (or `render()`, which calls it at
`app.js:1633`) → CSS reveals the matching containers and hides the rest. The content of each
container is (re)built separately by its mount/render function.

---

## 1 · The DOM shell, top to bottom

Order is the literal source order of `<body>` in `index.html`. "Visible in" is governed by the
CSS gate at `styles.css:1925-1946` (see §6 for the full table).

| # | Element | `#id` / class | What it is | Visible in view |
|---|---------|---------------|------------|-----------------|
| 1 | `<nav class="devnav">` | `#devnav` | Dev-only state jumper rail. Hidden by `hidden` attr + `display:none`; revealed **only** under `?devnav=1`. | all views, but **only if `?devnav=1`** (separate gate, see §4) |
| 2 | `<section class="menu">` | `#menuView` | Main menu / front door. One sample (SRC-01) as Free vs Halo. | `menu` only |
| 3 | `<section class="draft">` | `#draftView` | Local image draft intake (browser-local preview, no upload/analysis). | `draft` only |
| 4 | `<input type="file">` | `#draftFile` | Hidden file picker that backs "Add your photo". Never visible. | always `hidden` (off-flow input) |
| 5 | `<section class="dev">` | `#devView` | Dev harness — renders a validated dev fixture. Reached only via `?dev=…`. | `dev` only |
| 6 | `<header class="topbar">` | (class only) | Brand + source toggle + treatment toggle. | `room` only (hidden in menu/draft/dev) |
| 7 | `<main class="room">` | (class only) | The three-column hero grid (§3). Holds `#sourcePanel` / `#stageZone` / `#readingPanel`. | `room` only |
| 8 | `<section class="dossier">` | `#dossierMount` | The dossier below the hero (capped at 7 plates). | `room` only |
| 9 | `<footer class="hint">` | (class only) | Keyboard-hint footer + a `↑ Menu` back button (`[data-view-to="menu"]`). | `room` only |

Notes grounded in code:

- Containers 6–9 (`topbar`, `room`, `dossier`, `hint`) are the **scan-room cluster** — the CSS
  gate hides all four together in `menu`/`draft`/`dev`, so they read as one "room view" even
  though they are four sibling elements. The room itself is rebuilt by `render()`
  (`app.js:1630-1663`), which writes `#sourcePanel`, `#stageZone`, `#readingPanel`, and
  `#dossierMount`. The topbar and hint are static markup in `index.html` (only the toggles'
  `is-active` classes get updated, `app.js:1656-1661`).
- `#menuView`, `#draftView`, `#devView` start **empty** in `index.html`; `app.js` fills each
  via `innerHTML` from its render fn (`mountMenu` → `#menuView`, `app.js:944-946`;
  `renderDraft` → `#draftView`, e.g. `app.js:1022`; `mountDev` → `#devView`, `app.js:1192-1207`).

---

## 2 · The topbar (`<header class="topbar">`, room only)

`index.html:37-53`. Three children, left to right:

1. **`.brand`** (`index.html:38-42`) — three spans:
   `.brand__mark` (`◆`) · `.brand__name` (`BLUE ROOM`) · `.brand__sub` (`SCAN ROOM · PROTOTYPE 002`).
   Static text; no JS touches it.
2. **`.toggle#sourceToggle`** (`index.html:44-47`, `role="tablist"`) — two buttons:
   - `data-source="0"` → `SRC 01 · Driver` (starts `.is-active`)
   - `data-source="1"` → `SRC 02 · Ice Field`
   Click handler at `app.js:1741-1746` sets `state.source = Number(btn.dataset.source)` and
   re-renders. `render()` reconciles `.is-active` by matching `dataset.source` to `state.source`
   (`app.js:1656-1658`).
3. **`.toggle.toggle--treatment#treatmentToggle`** (`index.html:49-52`, `role="tablist"`) — two
   buttons:
   - `data-treatment="free"` → `Free Pull` (starts `.is-active`)
   - `data-treatment="shiny"` → `Halo Mint` (`.toggle__btn--shiny`)
   Click handler at `app.js:1748-1754` sets `state.treatment`; clearing `labMaterial` unless
   `mint`. Note the **third treatment, `mint` (Lab), has no topbar button** — it is reachable
   only by the `M` key (`app.js:1771`), `?t=mint`, or the dev nav. The treatment also lands on
   `body[data-treatment]` (`app.js:1632`), which CSS uses for halo/shiny styling.

---

## 3 · The room grid (`<main class="room">`, room only)

`index.html:55-59`. A 3-column CSS grid (`styles.css:142-149`):
`grid-template-columns: clamp(360px,25vw,500px) minmax(0,1fr) clamp(400px,27vw,540px)` — i.e.
**left panel · center stage · right panel**, height capped at `calc(100vh - topbar - 26px)` so
the dossier peeks up into the first viewport.

| Slot | Element | `#id` | Filled by | What it holds |
|------|---------|-------|-----------|----------------|
| LEFT | `<aside class="panel panel--source">` | `#sourcePanel` | `renderLeftPanel(src, treatment, tab)` (`app.js:1635`) | Tabbed analysis panel (see below) |
| CENTER | `<section class="stagezone">` | `#stageZone` | `app.js:1644-1647` | `stageIntro` line + `renderCard(...)` (the trophy) + a `.stagecue` anchor to `#dossierMount` |
| RIGHT | `<aside class="panel panel--reading">` | `#readingPanel` | `renderReadingPanel(src, treatment)` (`app.js:1648`) | Reading modules + paid-unlock preview |

**Left panel internals (post BR-S044).** `renderLeftPanel` (`app.js:126-141`) emits a
`.tabbar` with **two tabs only**: `["diagram", "metrics"]` → `Diagram | Metrics`. The old
**Source tab was merged into Diagram** — `renderLeftPanel` and `renderDiagramTab` both
remap `tab === "source"` → `"diagram"` (`app.js:127`, `app.js:57`), and `?tab=source`
redirects to diagram at parse time. State key: `state.tab` (default `"diagram"`, `app.js:44`);
tab clicks handled at `app.js:1725-1730` (`button[data-tab]`).

Inside the **Diagram** tab lives the **CLEAN | ANNOTATED toggle** (BR-S044): two buttons
`data-diagview="annotated"` / `data-diagview="clean"` (`app.js:263-264`), backed by
`state.diagramView` (default `"annotated"`, `app.js:44`; deep-linkable via `?dv=clean|annotated`,
`app.js:58`). Handler at `app.js:1734-1739`. CLEAN = raw photo + numbered markers + legend;
ANNOTATED = overlay read (comment `app.js:153`).

**Below the room:** `<section class="dossier" id="dossierMount">` (`index.html:61`) is filled by
`renderDossier(src, treatment)` (`app.js:1649`). It is a sibling of `.room`, not a child — but
shares the room view's visibility. The dossier is **capped at 7 plates** (with Plate 01 carrying
the filing-event row + Object→Scan→Card→Mint serial-lineage spine from BR-S038).

---

## 4 · Hidden / dev containers (never part of the real-user flow)

| Element | `#id` | How it is reached | Gate |
|---------|-------|-------------------|------|
| `<nav class="devnav">` | `#devnav` | `?devnav=1` in URL | **Separate gate from `data-view`.** Starts with `hidden` attr (`index.html:19`) and `.devnav { display:none }` (`styles.css:2490`). At boot, `DEVNAV` (`app.js:75`) is true only with `?devnav=1`; then `app.js:1787-1792` sets `body[data-devnav="1"]`, fills it via `renderDevnav()`, and removes `hidden`. CSS reveals it only under `body[data-devnav="1"]` (`styles.css:2491`). Defense-in-depth: both the attr removal *and* the body flag are required. |
| `<section class="dev">` | `#devView` | `?dev=uploaded-result\|uploaded-blocked\|free-scan-sim\|halo-gate` | At parse time (`app.js:66-67`) a recognized `?dev=` value sets `state.view="dev"` + `state.dev`. `mountDev()` fills it (`app.js:1192-1207`, called at `app.js:1793`). Shown only in `view="dev"`. Renders a **validated dev fixture**, never a user scan. |
| `<input type="file">` | `#draftFile` | `[data-draft-pick]` click → `pickPhoto()` | Permanently `hidden` (`index.html:30`). Its `change` event (`app.js:1711-1713`) calls `loadDraftFile(...)`. It is plumbing for `#draftView`, not a visible element. |
| `<section class="draft">` | `#draftView` | "Add your photo" / "Resume local draft" (`[data-view-to="draft"]`) | Not a dev container, but **never reachable by URL** — only by user action (`app.js:1676-1689`). Shown only in `view="draft"`. Local-only preview: no upload, no analysis, no stats. |

The dev nav rail (`renderDevnav`, `app.js:951-963`) is **state navigation only** — buttons carry
`data-devnav="kind:val"` and are dispatched at `app.js:1696-1705`. It never appears for a real
user and has no product effect.

---

## 5 · Script load order (and why it matters)

`index.html:65-70`, bottom of `<body>`, **synchronous, in order**:

```
<script src="data.js"></script>          <!-- 1 -->
<script src="scan-contract.js"></script> <!-- 2 -->
<script src="app.js"></script>           <!-- 3 -->
```

Why this order:

1. **`data.js` first** — defines the global data the renderer reads: `SOURCES`, `TREATMENTS`,
   `SCAN_RESULTS_V2`, etc. `app.js` references these at module top-level *during parse* (e.g.
   `getScanResult` reads `SCAN_RESULTS_V2`, `app.js:82-85`; `renderMenu` reads `SOURCES[0]`,
   `app.js:903`). They must exist before `app.js` runs its boot block.
2. **`scan-contract.js` second** — exposes `window.BlueRoomScanContract`, the pure (non-AI)
   validator + blocked-state shape for a *future* uploaded-photo engine (comment
   `index.html:66-68`). Loaded before `app.js` so the dev harness (`mountDev`) can call it, but
   it is **not run against the local draft** (no engine yet).
3. **`app.js` last** — the renderer. There is no `DOMContentLoaded` wrapper; `app.js` relies on
   being at the end of `<body>` so every `#id` it queries already exists. Its boot runs at the
   bottom of the file: `mountMenu()` (`app.js:1784`) → optional devnav reveal
   (`app.js:1787-1792`) → optional `mountDev()` if `state.view==="dev"` (`app.js:1793`) →
   `render()` (`app.js:1794`). Because deep-link params are parsed into `state` at `app.js:50-69`
   *before* boot, the final `render()` paints whatever view the URL addressed.

If `app.js` loaded before `data.js`, the top-level references to `SOURCES` / `SCAN_RESULTS_V2`
would throw. The order is load-bearing.

---

## 6 · Which container is visible in which view

Source of truth: the CSS rule block at `styles.css:1925-1946`. A cell is **shown** unless that
view's selector lists it with `display:none`. `state.view` is the only input; `#devnav` is
governed by the independent `?devnav=1` gate (last column).

| Container (`#id` / class) | `menu` | `room` | `draft` | `dev` |
|---|:---:|:---:|:---:|:---:|
| `.menu` `#menuView` | ✅ shown | hidden | hidden | hidden |
| `.draft` `#draftView` | hidden | hidden | ✅ shown | hidden |
| `.dev` `#devView` | hidden | hidden | hidden | ✅ shown |
| `.topbar` (header) | hidden | ✅ shown | hidden | hidden |
| `.room` `#stageZone`+panels | hidden | ✅ shown | hidden | hidden |
| `.dossier` `#dossierMount` | hidden | ✅ shown | hidden | hidden |
| `.hint` (footer) | hidden | ✅ shown | hidden | hidden |
| `.devnav` `#devnav` | only `?devnav=1` | only `?devnav=1` | only `?devnav=1` | only `?devnav=1` |
| `#draftFile` (input) | always `hidden` | always `hidden` | always `hidden` | always `hidden` |

Reading the CSS literally:
- `view="menu"` hides `topbar, room, dossier, hint, draft, dev` → leaves `.menu` visible.
- `view="draft"` hides `topbar, room, dossier, hint, menu, dev` → leaves `.draft` visible.
- `view="dev"` hides `topbar, room, dossier, hint, menu, draft` → leaves `.dev` visible.
- `view="room"` hides only `menu, draft, dev` → leaves the **whole scan-room cluster**
  (`topbar` + `room` + `dossier` + `hint`) visible. (`styles.css:1944-1946`.)

How a view changes at runtime: any `[data-view-to]` button (e.g. `↑ Menu`, `Enter Scan Room`)
sets `state.view` and calls `applyView()` (`app.js:1676-1689`); keyboard `Enter` opens the room
from the menu, `Escape` steps back out of the draft (`app.js:1756-1765`); deep links set
`state.view` at parse time (`app.js:66-69`).

---

## Quick reference — top-level `#id` → render fn

| `#id` | Render / mount fn | File:line |
|---|---|---|
| `#menuView` | `mountMenu` → `renderMenu` | `app.js:944`, `902` |
| `#draftView` | `renderDraft` (writes `innerHTML`) | `app.js:1022` etc. |
| `#devView` | `mountDev` → `renderUploadedScanResultDev` / `renderHaloGateMock` / `renderFreePullMock` | `app.js:1192` |
| `#devnav` | `renderDevnav` (only if `?devnav=1`) | `app.js:1790`, `951` |
| `#sourcePanel` | `renderLeftPanel` → `renderDiagramTab` / `renderMetricsTab` | `app.js:1635`, `126` |
| `#stageZone` | inline: `stageIntro` + `renderCard` + `.stagecue` | `app.js:1644` |
| `#readingPanel` | `renderReadingPanel` | `app.js:1648`, `486` |
| `#dossierMount` | `renderDossier` | `app.js:1649`, `666` |
