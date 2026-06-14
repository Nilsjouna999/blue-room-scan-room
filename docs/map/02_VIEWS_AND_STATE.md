# BLUE ROOM — Views & State Model (map 02)

Granular "you are here" map of the **runtime state machine** of the built
artifact: the `state` object, the URL params that seed it, the four views and
how the app routes between them, the `render()` pipeline, keyboard controls,
delegated click handlers, and the dev routes. All claims are grounded in
`app.js` (single renderer, no build, no backend). Last verified against
`app.js` at HEAD (post BR-S044).

Companion maps: `docs/map/01_PAGE_SKELETON.md` (DOM mounts) is the static half
of this doc — every mount named below is filled by a function named here.
Concept zones live in `docs/UNIVERSE_ZONE_MAP_V1.md`; file routing in
`docs/FILE_MAP.md`. This doc does **not** re-describe those — it maps real
state/views/routing only.

---

## 1. The `state` object

One module-level literal, declared once at `app.js:44`:

```js
const state = { source: 0, treatment: "free", tab: "diagram", view: "menu",
  draftGate: false, dev: null, labMaterial: null, diagramView: "annotated" };
```

`state` is **mutated in place** (it is `const` but never reassigned); every
handler sets a field then calls `render()` or `applyView()`. There is no
framework, no store, no reactivity — re-render is always explicit.

| Field | Type / values | Meaning | Default | Where mutated |
| --- | --- | --- | --- | --- |
| `source` | `0` \| `1` (index into `SOURCES`) | Which sample scan is on the stage. `0` = SRC-01 Driver, `1` = SRC-02 Ice Field. | `0` | keys `1`/`2` (`app.js:1768-1769`), `#sourceToggle` (`:1741`), devnav `src:` (`:1702`), `?src` (`:53`) |
| `treatment` | `"free"` \| `"shiny"` \| `"mint"` | The card finish / gating tier. **Tri-state, not boolean** — see §1a. | `"free"` | `[data-goto]` (`:1669`), `#treatmentToggle` (`:1751`), keys F/H/S/M (`:1770-1772`), devnav `treat:` (`:1701`), `?t` (`:54`) |
| `tab` | `"diagram"` \| `"metrics"` (legacy `"source"` collapses to `"diagram"`) | Active tab in the LEFT panel (`#sourcePanel`). | `"diagram"` | `.tabbar__btn[data-tab]` (`:1728`), devnav `tab:` (`:1703`), `?tab` (`:57`) |
| `diagramView` | `"annotated"` \| `"clean"` | Sub-toggle **inside** the Diagram tab (BR-S044): `clean` = raw photo + numbered markers + legend; `annotated` = full overlay read. | `"annotated"` | `[data-diagview]` (`:1737`), `?dv` (`:58`) |
| `view` | `"menu"` \| `"room"` \| `"draft"` \| `"dev"` | The top-level screen. Written to `body[data-view]` by `applyView()`; CSS shows/hides on that attribute. | `"menu"` | init (`:67-68`), `[data-view-to]` (`:1686`), `loadDraftFile` (`:1020`), keys Enter/Escape (`:1760-1764`), devnav `view:` (`:1700`) |
| `draftGate` | `boolean` | Within the `draft` view, `false` = local-draft intake (`renderDraftIntake`), `true` = sealed Scan Development Gate (`renderGate`). | `false` | `[data-gate]` (`:1720`), reset on new/resumed draft (`:1021`, `:1683`), Escape steps gate→intake (`:1763`) |
| `dev` | `null` \| `"uploaded-result"` \| `"uploaded-blocked"` \| `"free-scan-sim"` \| `"halo-gate"` | Which dev-harness fixture `mountDev()` renders into `#devView`. Set ONLY at init from `?dev`. | `null` | init only (`:67`); devnav `dev:` reloads the page with the param (`:1704`) |
| `labMaterial` | `null` \| `"cold-foil"` \| `"black-star"` \| `"night-gloss"` | Lab-only card finish overlay (CARD_TECH_LAB §20). Applies **only** when `treatment === "mint"`; cleared whenever treatment leaves `mint`. | `null` | keys `[`/`]` (`:1773-1779`), `?lab` (`:62`), cleared on F/H/S + any non-mint treatment switch (`:1670`, `:1701`, `:1752`, `:1770`, `:1772`) |

### 1a. `treatment` is a **tri-state**, and the names are skewed

This is the single most error-prone fact in the app. There are **three**
treatments but the customer-facing developed one is keyed `"shiny"`, not
`"halo"`:

| `state.treatment` | UI name | Role | `TREATMENTS` key (`data.js:30`) |
| --- | --- | --- | --- |
| `"free"` | Free Pull | Preview / undeveloped archive state (default) | `free` |
| `"shiny"` | **Halo Mint** | The customer-facing **developed** state | `shiny` |
| `"mint"` | **Lab · Signature Mint** | Internal material study — *not a customer tier* | `mint` |

Consequences wired throughout the renderers:

- **"paid" = `treatment !== "free"`.** Both `shiny` and `mint` get the
  developed tier. See `renderCard` `minted` (`:402`), `renderDossier` `paid`
  (`:667`), `getTierOutput` (`:93-96`).
- The topbar **Halo Mint** button and every `[data-goto]` unlock CTA set
  `"shiny"` (`index.html:51`; `data-goto="shiny"` at `app.js:594`, `:610`,
  `:870`). There is no `data-goto="mint"`.
- `labMaterial` is honored **only** in `mint` (`renderCard` `:408`); on
  `free`/`shiny` the card stays byte-identical regardless of `labMaterial`,
  and every non-mint switch nulls it.

---

## 2. URL params (deep-link seeding)

All param reads live in one IIFE block at `app.js:50-69`, plus the standalone
`DEVNAV` read at `:75`. Params are read **once at load**; nothing writes the
URL back except the devnav `dev:` jump (`:1704`) which reloads the page.

| Param | Accepted values | Sets | Notes |
| --- | --- | --- | --- |
| `?src` | `1`, `2` | `state.source = src - 1` | 1-based in URL, 0-based in state (`:53`). |
| `?t` | `free`, `shiny`, `mint` | `state.treatment` | Direct, no remap (`:54`). |
| `?tab` | `source`, `diagram`, `metrics` | `state.tab` | **Legacy redirect (BR-S044):** `source` → `diagram` (`:57`). |
| `?dv` | `clean`, `annotated` | `state.diagramView` | The Diagram sub-toggle (`:58`). |
| `?lab` | `cold-foil`, `black-star`, `night-gloss` | `state.labMaterial` | **Only honored when `?t=mint`** (`:62`); ignored otherwise; does NOT on its own open the room. |
| `?dev` | `uploaded-result`, `uploaded-blocked`, `free-scan-sim`, `halo-gate` | `state.view="dev"` + `state.dev` | Routes straight to the dev harness (`:67`). |
| `?devnav` | presence only (`?devnav=1`) | `DEVNAV = true` → `body[data-devnav]` + reveal rail | Read separately (`:75`); CSS keeps `.devnav` `display:none` without it. |

### 2a. How deep links bypass the menu

After seeding, init decides `state.view` (`app.js:67-68`):

1. If `?dev` is a known fixture → `view = "dev"` (`:67`).
2. **Else if** `?src` OR `?t` OR `?tab` is present (`q.has(...)`) → `view = "room"` (`:68`).
3. Else → `view` stays `"menu"` (the literal default at `:44`).

So **any** of `src`/`t`/`tab` (mere presence, even an invalid value) skips the
front door and opens the room directly — used by reviewers and the screenshot
pipeline. `?dv`, `?lab`, `?devnav` do **not** open the room on their own (they
only refine a state that another param opened). The local **draft** and
**gate** views are *not* URL-addressable — they are reachable only through the
file picker and in-page buttons.

---

## 3. The four views & routing

`state.view` ∈ `{ menu, room, draft, dev }`. Routing is **CSS-driven**, not
DOM-swapping: `applyView()` (`app.js:898-900`) writes `document.body.dataset.view`
and the stylesheet shows the matching `<section>` / hides the rest. All four
mounts exist in the DOM at all times (`index.html:24-61`).

| `view` | Visible mount | Filled by | Reached from |
| --- | --- | --- | --- |
| `menu` | `#menuView` (`.menu`) | `renderMenu` → `mountMenu` (`:902`, `:944`) | default; `↑ Menu` / `data-view-to="menu"`; Escape from draft-intake |
| `room` | `.topbar` + `#sourcePanel`/`#stageZone`/`#readingPanel` + `#dossierMount` + `.hint` | `render()` (`:1630`) | `Enter Scan Room`; deep link; Enter key on menu |
| `draft` | `#draftView` (`.draft`) | `renderDraft` → intake **or** gate by `draftGate` (`:1030`) | picking a file (`loadDraftFile`); `Resume local draft` |
| `dev` | `#devView` (`.dev`) | `mountDev` (`:1192`) | `?dev=…` only (set once at init) |

Key subtleties:

- **`render()` runs unconditionally at startup** (`:1794`) and on every
  room-state change — it always paints the room mounts (`#sourcePanel`,
  `#stageZone`, `#readingPanel`, `#dossierMount`) **regardless of `state.view`**.
  The room markup is therefore always present in the DOM; CSS just hides it
  when `view !== "room"`. This is why entering the room from the menu needs no
  re-render — only `applyView()` (`:1687`).
- **`applyView()` is the cheap path** (menu⇄room, gate steps): it only flips
  `body[data-view]`, no innerHTML rebuild.
- **`draft` has two faces in one mount**: `renderDraft()` (`:1030`) branches on
  `state.draftGate` → `renderGate()` (`:1104`) vs `renderDraftIntake()`
  (`:1038`). Switching face re-writes `#draftView.innerHTML` directly (no
  `render()`), e.g. the `[data-gate]` handler (`:1721`).
- **`dev` is init-only**: `mountDev()` is called once at `:1793` if
  `view === "dev"`. The devnav `dev:` buttons reach other fixtures by
  reloading the page with a new `?dev` (`:1704`), not by re-rendering.

### 3a. Init sequence (bottom of `app.js`)

```
mountMenu();                      // :1784  always pre-fills #menuView
if (DEVNAV) { … renderDevnav() }  // :1787  reveal rail only behind ?devnav=1
if (state.view === "dev") mountDev(); // :1793
render();                          // :1794  paint the room mounts + apply view
```

`render()` calls `applyView()` internally (`:1633`), so the body's
`data-view` lands correctly for the deep-linked state.

---

## 4. The `render()` pipeline

`render()` (`app.js:1630-1663`) is the room renderer. It reads the current
`SOURCES[state.source]` and fills five surfaces, then syncs toggle button
state. Sub-renderers (pure string-builders; none touch the DOM):

```
render()                                   // :1630
├─ body.dataset.treatment = state.treatment // :1632
├─ applyView()                              // :1633  → body.dataset.view
├─ #sourcePanel  ← renderLeftPanel(src, treatment, tab)        // :1635
│                   ├─ renderDiagramTab(src, treatment)        // :149 (tab=diagram)
│                   │    └─ reads state.diagramView (clean/annotated) :153
│                   └─ renderMetricsTab(src, treatment)        // :337 (tab=metrics)
│                        ├─ statDiamond() :299  mixRow() :328  lockedModule() :478
├─ #stageZone    ← stageIntro + renderCard(src, treatment) + #dossier cue  // :1644
│                   └─ renderCard :399  (reads state.labMaterial when mint) :408
├─ #readingPanel ← renderReadingPanel(src, treatment)          // :1648
│                   ├─ free → lockedDeep / archetypeModule :631
│                   └─ moduleHead :100  lockedModule :478
├─ #dossierMount ← renderDossier(src, treatment)               // :1649
│                   └─ dplate :653  (7 plates 01–07, capped) :701-882
├─ body --halo-a/b/c custom props                              // :1652-1654
└─ sync #sourceToggle / #treatmentToggle .is-active            // :1656-1661
```

Views **outside** the room have their own mount-fillers, not `render()`:
`mountMenu`/`renderMenu` (`:944`/`:902`), `renderDraft` (`:1030`),
`mountDev`/`renderUploadedScanResultDev`/`renderFreePullMock`/`renderHaloGateMock`
(`:1192`/`:1210`/`:1433`/`:1562`), `renderDevnav` (`:951`).

Data-layer reads worth noting: the renderers prefer **ScanResult v2**
(`SCAN_RESULTS_V2` via `getScanResult`/`getActiveScan`, `:82-89`) and fall back
to legacy `src.*` fields, so the app keeps working if v2 is absent.

---

## 5. Keyboard controls & delegated click handlers

### 5a. Keyboard (`document` keydown, `app.js:1756-1782`)

Shortcuts are **view-gated**: the room shortcuts only fire when
`state.view === "room"` (early return at `:1759-1767`).

| Key | Active in | Effect |
| --- | --- | --- |
| `Enter` | `menu` | `view = "room"` (`:1760`) |
| `Escape` | `draft` | Steps back one level: gate→intake, intake→menu (`:1761-1764`) |
| `1` / `2` | room | `source = 0` / `1` (`:1768-1769`) |
| `F` | room | `treatment = "free"`, clears `labMaterial` (`:1770`) |
| `H` or `S` | room | `treatment = "shiny"` (Halo Mint), clears `labMaterial` (`:1772`) |
| `M` | room | `treatment = "mint"` (Lab state) (`:1771`) |
| `[` / `]` | room, **only if `treatment === "mint"`** | Cycle `labMaterial`: `null → cold-foil → black-star → night-gloss → null` (`]` forward, `[` back) (`:1773-1779`) |

Any room key that matches calls `render()` (`:1781`); unmatched keys
`return` early without rendering (`:1780`). Note the footer hint
(`index.html:63`) advertises `1/2 · F · H · M` but **not** the Lab `[`/`]`
cycle (intentionally — Lab is internal).

### 5b. Delegated click handlers (`data-*` attribute namespaces)

All click handlers are bound once on `document` (or a stable mount) and survive
re-renders via `e.target.closest(...)`. Each uses a **distinct attribute** so
the handlers never collide:

| Attribute | Handler @ | What it does |
| --- | --- | --- |
| `[data-goto]` | `:1666` | Set `treatment` (always `"shiny"` in practice); clears `labMaterial` if not mint; `render()`. |
| `[data-view-to]` | `:1676` | Set `view`. `draft` requires an existing `draft` (else no-op); resume forces `draftGate=false`. `applyView()` + scroll to top. |
| `[data-devnav]` (`kind:val`) | `:1696` | Dev rail jumps: `view:`/`treat:`/`src:`/`tab:` mutate state + render; `dev:` reloads page with `?dev`. |
| `[data-draft-pick]` | `:1708` | `pickPhoto()` → clicks the hidden `#draftFile` input. |
| `[data-gate]` (`open`/`close`) | `:1717` | `draftGate = (val === "open")`; re-renders `#draftView` only. |
| `button[data-tab]` (on `#sourcePanel`) | `:1725` | Set `tab`; `render()`. |
| `button[data-diagview]` (on `#sourcePanel`) | `:1734` | Set `diagramView` (clean/annotated); `render()`. |
| `button[data-source]` (on `#sourceToggle`) | `:1741` | Set `source`; `render()`. |
| `button[data-treatment]` (on `#treatmentToggle`) | `:1748` | Set `treatment`; clears `labMaterial` if not mint; `render()`. |

Plus a non-delegated `change` listener on `#draftFile` (`:1711`) →
`loadDraftFile`, which sets `draft`, flips `view = "draft"`, resets
`draftGate`, fills `#draftView`, and re-mounts the menu so it offers "Resume".

### 5c. `draft` is **not** part of `state`

The chosen local image lives in a separate module-level `let draft` (`:971`),
shaped `{ url, name, sizeLabel, warn } | null` — deliberately **not** a
ScanResult and never carrying stats/receipts/oracle (`renderDraft` reads only
`draft`, never `SOURCES`/`SCAN_RESULTS_V2`). `state.draftGate` (the boolean
on `state`) is the only draft-related flag that *is* on `state`.

---

## 6. Dev routes & the `?devnav` rail

### 6a. `?dev=…` harness (set once at init; `mountDev` `:1192`)

A dev-only renderer that ALWAYS runs the contract validator first
(`window.BlueRoomScanContract`); a failing fixture renders the safe blocked
state, never a valid-looking card. Every surface is labelled
"DEV HARNESS / NOT USER SCAN".

| `?dev=` value | `mountDev` branch | Renders |
| --- | --- | --- |
| `halo-gate` | `:1195` | `renderHaloGateMock()` (`:1562`) — sealed card-back mock; "Open Halo Dossier" CTA permanently `disabled`. |
| `free-scan-sim` | `:1199` | `renderUploadedScanResultDev(fixture, {mode:"free-scan-sim"})` → branches to `renderFreePullMock()` (`:1433`) — one landscape Free Pull artifact. |
| `uploaded-result` | `:1204` (else-valid) | `renderUploadedScanResultDev(validDevRendererResult)` — full debug stack; **intentionally keeps legacy 0–100 stats** (DECISION_LOG 2026-06-13). |
| `uploaded-blocked` | `:1204` | `renderUploadedScanResultDev(invalidAttractivenessResult)` → validator fails → `renderBlockedScan()` (`:1155`). |

Fixtures come from `BlueRoomScanContract.DEV_FIXTURES` (`scan-contract.js`);
none of these routes touch the local `draft` or `SOURCES` user-facing flow.

### 6b. The `?devnav=1` rail (`renderDevnav` `:951`)

A dev-only state-jumper `<nav class="devnav">` (`index.html:19`), **defense-in-
depth gated**: revealed only when `DEVNAV` (`:75`) sets `body[data-devnav="1"]`
and un-hides the element (`:1787-1792`); CSS keeps it `display:none` otherwise,
so it can never paint for a real user. Its buttons are `[data-devnav="kind:val"]`
and reuse the existing state setters via the delegated handler at `:1696` —
state navigation only, no product side effect, no file picker. It exposes:
`view:menu|room`, `src:0|1`, `treat:free|shiny|mint`, `tab:diagram|metrics`,
and the four `dev:` fixtures (`:954-962`).

---

## 7. Quick reference — state ↔ surface ↔ control

| Want to change… | Field | Keyboard | Click target |
| --- | --- | --- | --- |
| which sample | `source` | `1` / `2` | `#sourceToggle [data-source]`, devnav `src:` |
| free vs developed | `treatment` | `F` / `H`(`S`) / `M` | `#treatmentToggle`, `[data-goto="shiny"]`, devnav `treat:` |
| left-panel tab | `tab` | — | `.tabbar__btn[data-tab]`, devnav `tab:` |
| diagram overlay | `diagramView` | — | `[data-diagview]` |
| lab finish | `labMaterial` (mint only) | `[` / `]` | — (URL `?lab` only) |
| top-level screen | `view` | `Enter`/`Escape` | `[data-view-to]`, devnav `view:` |
| draft gate face | `draftGate` | `Escape` (gate→intake) | `[data-gate]` |
