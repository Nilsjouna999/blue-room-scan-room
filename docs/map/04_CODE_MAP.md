# 04 — CODE MAP

Structural grain of the BLUE ROOM build. This maps the **actual code shape** —
data objects, function inventory, the scan-contract surface, CSS systems — for a
builder who needs to know *where a thing lives*. It complements, and does not
restate:

- `docs/FILE_MAP.md` — one line per file (the router)
- `docs/UNIVERSE_ZONE_MAP_V1.md` — concept zones (the territory)
- `docs/map/01..03` — page skeleton / view + state / render flow

No build, no node, no backend. Three scripts load in order at the end of
`index.html`: `data.js` → `scan-contract.js` → `app.js`. Each declares plain
top-level `const`s in global scope (no modules); `app.js` reads `data.js`'s
globals directly and reaches `scan-contract.js` only through
`window.BlueRoomScanContract`.

---

## 1. `data.js` — the fixture corpus (534 lines)

Two hardcoded scans built from the two provided photos. No generation, no
analysis: fixture text only. Top-level `const`s, in file order:

| Export | Shape | Role |
| --- | --- | --- |
| `FORMULAS` | array of `{ k, v }` (6) | House scan recipe — interpretive formula strings shown in Technical Receipts. Method, not measurement. |
| `TREATMENTS` | object keyed `free` / `mint` / `shiny` | Per-treatment chrome: `{ label, rarity, stamp, strip, tagline }`. Internal keys stay stable; only labels are customer-facing (Free Pull / Halo Mint; `mint` is the internal Lab). |
| `ARCHETYPE_NOTES` | object keyed by archetype **class** | `{ line, discovery }` — Halo/Lab-only class copy. Keyed by `"The Encounter"` / `"The Dispatch"` (matches `V2_EXTRAS.archetypeClass`). Copy-only lookup; no score/field. |
| `LAB_MATERIALS` | array of `{ key, label, note }` (3) | Lab finish studies: `cold-foil`, `black-star`, `night-gloss`. Default (null) = Signature Mint silver. Cycle order. |
| `SOURCES` | array of 2 legacy source objects | The master fixtures (see field list below). |
| `V2_EXTRAS` | object keyed by source `id` | v2-only fields, keyed `"driver-salute"` / `"ice-auger"`: `{ route, scanStatus, confidence:{overall,band}, archetypeClass, warnings, receipts:[{cue,effect,basis,confidence}] }`. |
| `toScanResultV2(src)` | builder fn | Maps a legacy `SOURCES` entry + its `V2_EXTRAS` into the v2 shape. Append-only — existing fields are mapped, never duplicated. |
| `SCAN_RESULTS_V2` | `SOURCES.map(toScanResultV2)` | The derived v2 array the live app reads via `getScanResult()`. |

`STAT_LABELS` is **not** here — it lives in `app.js` (display layer). The task
brief listed it under data.js; in the built artifact it is a render constant.

### 1a. Each `SOURCES[i]` (the legacy master object)

Identity / framing: `id`, `no`, `label`, `file` (`assets/source-0{1,2}.jpg`),
`orient`, `horizon`.

- `photoTuning` — `{ pos, zoom, scrim, base:{ bright, contrast, sat } }`. Card-photo
  focal point + per-source exposure; treatments multiply on top of `base`.
- `capture` — `{ code, lens, light, locale, rec }`. Filing metadata (`code` feeds the
  dossier filing-event row).
- `markers` — array of `{ x, y, label }` (% of frame) — diagram dots.
- `analysis` — array of uppercase strings (frame-analysis lines).
- `diagram` — visual scan-sheet geometry (% coords): `aspect`, `massBox`, `gesture`,
  `axis`, `arrow`, `light`, `pressure[]`, `notes[]`.
- `metrics` — `{ signalMix:[{k,v}], pressure:{balance,centerPull,noise,clarity}, fitMatrix:[{k,state,v}] }`.
- `halo` — `{ material, a, b, c }` — Halo Mint accent colours (drive `--halo-a/b/c`).
- `dossier` — the 7-plate source data (see 1b).
- `card` — `{ title, archetype, note, signature, stats:{presence,frame,signal,charge}, serial, batch, edition, minted }`.
- `reads` — `{ presence, frame, signal, charge }` long-form stat reads.
- `aura[]`, `sceneRole`, `stance`, `fit`, `impact:{value,label}`, `lore:{value,label}`,
  `oracle`, `receipts:[{k,v}]`.

### 1b. `dossier` sub-shape (consumed plate-by-plate)

`record` (`{ objectNo, captureType, gesture, container, primarySignal,
backgroundRole, eligibility, provenance, markings }`) · `evidence[]`
(`{ k, read, free }` — `free` gates Plate 02 rows) · `statNotes`
(`{ presence, frame, signal, charge }`, each `{ evidence, note? }`) · `hidden`
(`{ name, value, read, tease }`) · `mint`
(`{ trigger1, trigger2, family, note, serial }`) · `oracle`
(`{ full, short, timeline }`).

### 1c. v2 shape produced by `toScanResultV2` (data.js:458)

`{ scanId, sourceId ("SRC-01"/"SRC-02"), route, scanStatus, confidence,
stats:{ freeVisible (4 keys), haloExtended:{ loreDensity, fitCoherence,
gestureAuthority, visualImpact } }, receipts, archetype:{title,class,routeLogic},
readings:{freeLine,haloRead,oracle}, treatment:{free,halo},
tierOutputs:{ free, halo }, conditionalStats[], warnings }`. `gestureAuthority`
is conditional — present only when `hidden.name === "Gesture Geometry"`
(SRC-01 yes, SRC-02 resolves to Field Silence). `tierOutputs.free.serial` is a
masked reserved string (`Reserved · BR-SRC0N-HM-····`) matched exactly to the
legacy rendered text.

---

## 2. `app.js` — the renderer (1794 lines)

Plain top-level functions, no classes/modules. State is one literal object at
`app.js:44`:

```
const state = { source: 0, treatment: "free", tab: "diagram",
                view: "menu", draftGate: false, dev: null,
                labMaterial: null, diagramView: "annotated" };
```

A bare URL-param block (`app.js:50-69`) hydrates `state` from
`?src ?t ?tab ?dv ?lab ?dev`; `DEVNAV` (`app.js:75`) is a separate `?devnav=1`
gate. Init tail (`app.js:1784-1794`): `mountMenu()` → optional devnav fill →
optional `mountDev()` → `render()`.

### Constants + helpers (top of file)
- `esc()` (8) — HTML escape, used on every interpolated value.
- `pad2()` (16) · `STAT_LABELS` (23) + `statLabel()` (29) — public artifact stat names
  (`presence→Frame Presence`, `charge→Scene Charge`).
- `tierBand(v)` (34) — internal 0-100 → Muted/Clean/Strong/Charged/Peak (public ladder).

### Routing / view
- `applyView()` (898) — writes `state.view` to `body[data-view]` (CSS does the show/hide).
- `getScanResult(src)` (82) · `getActiveScan()` (87) · `getTierOutput(scan, treatment)` (93)
  — v2 lookups with legacy fallback; `free` → preview tier, else developed.
- `render()` (1630) — the master paint: mounts left panel, stage (intro + card + cue),
  reading panel, dossier; sets `--halo-*`; syncs toggle active states.

### Shared bits
- `moduleHead(label)` (100) · `miniStat(name, value)` (104) · `imgOrPlaceholder()` (114)
  — missing image → labelled placeholder, never a fake.

### Left panel (Diagram | Metrics tabs)
- `renderLeftPanel(src, treatment, tab)` (126) — tab shell + CLEAN|ANNOTATED toggle.
- `renderDiagramTab(src, treatment)` (149) — SVG scan-sheet; inner `dot`/`zone`/`head`
  builders draw markers, mass box, gesture/axis lines.
- `statDiamond(stats, treatment)` (299) + `mixRow(k,v)` (328) — metrics primitives.
- `renderMetricsTab(src, treatment)` (337) — signal mix / pressure / fit matrix.

### Card (center stage)
- `renderCard(src, treatment)` (399) — one master base; treatment restyles, never re-lays-out
  (matches the comment law at the file head).

### Right panel (reading modules)
- `lockedModule(label, line)` (478) — sealed-module chrome for Free.
- `renderReadingPanel(src, treatment)` (486) — stat reads, receipts, archetype module
  (the IIFE `archetypeModule` at 631 pulls `ARCHETYPE_NOTES`).

### Dossier (7 plates, capped)
- `dplate(no, title, paid, body, extraClass)` (653) — single plate shell.
- `renderDossier(src, treatment)` (666) — builds plates **01–07** exactly:
  `01 Source Record` (701, with filing-event row + Object→Scan→Card→Mint serial-lineage
  spine, BR-S038) · `02 Evidence Board` (777) · `03 Stat Dossier` (799) ·
  `04 Hidden Stat` (805) · `05 Fit + Aura Layer` (822) · `06 Mint Record` (874) ·
  `07 Oracle Read` (877). Card/Mint serials mask to `····` on Free.

### Menu (front door)
- `renderMenu()` (902) — one sample (SRC-01 Free), thesis/trust copy, Enter / Add-photo
  / Resume actions. Inner `shot()` builds the card tile.
- `mountMenu()` (944) — writes into `#menuView`.

### Devnav (dev-only rail)
- `renderDevnav()` (951) — `data-devnav="kind:val"` buttons (view/src/treat/tab/dev).
  Painted only behind `?devnav=1`.

### Draft / gate (local browser image)
- `draft` (971) — plain object `{ url, name, sizeLabel, warn }`, **not** a ScanResult.
- `humanSize()` (973) · `fileTypeLabel()` (981) · `cleanFileLabel()` (985) ·
  `DRAFT_LARGE_FILE` (993) · `pickPhoto()` (995) · `setPickError()` (1001) ·
  `loadDraftFile(file)` (1007).
- `renderDraft()` (1030) — switches intake vs gate on `state.draftGate`.
- `renderDraftIntake()` (1038) · `renderGate()` (1104) · `renderBlockedScan(b, actionsHtml)`
  (1155, uses `createBlockedScanState` shape).

### Dev harness (`?dev=…`)
- `mountDev()` (1192) — reads `window.BlueRoomScanContract.DEV_FIXTURES`.
- `renderUploadedScanResultDev(result, opts)` (1210) — **validates** via the contract,
  renders fixture or blocked state. Inner `stat`/`ext`/`tierRow` builders.
- `FP_TIER_LADDER` (1427) + `fpTierLabel(stat)` (1428) · `renderFreePullMock(result)` (1433,
  `?dev=free-scan-sim`) · `renderHaloGateMock()` (1562, `?dev=halo-gate`).

### Keyboard + delegated handlers (1665–1794)
All `document.addEventListener`, bound **once**, surviving re-renders, each in its
own attribute namespace so they never collide: `[data-goto]` treatment (1666) ·
`[data-view-to]` view switch (1676) · `[data-devnav]` (1696) · `[data-draft-pick]`
+ `#draftFile change` (1708) · `[data-gate]` (1717) · `#sourcePanel [data-tab]`
(1725) · `#sourcePanel [data-diagview]` CLEAN|ANNOTATED (1734) · `#sourceToggle`
(1741) · `#treatmentToggle` (1748) · global `keydown` (1756): `1`/`2` source,
`F`/`H`(or `S`)/`M` treatment, `[`/`]` Lab finish cycle (mint only), `Enter` opens
room from menu, `Escape` steps back in the draft.

---

## 3. `scan-contract.js` — the safety valve (453 lines)

A self-invoking IIFE that publishes one surface on the window. It is a
**SAFETY VALVE, not an engine** (file head): no DOM, no AI/API, no file/upload,
no mutation of `SOURCES`/`SCAN_RESULTS_V2`. Pure — same input → same output.

`window.BlueRoomScanContract = api` (scan-contract.js:442-451), also exported via
`module.exports` for node-style tests. Public members:

- `validateUploadedScanResult(result)` (129) → `{ ok, errors[], warnings[] }`. Checks
  `kind === "uploaded_scan_result"`, `schemaVersion "uploaded-v1"`, render status,
  `source.mode` in `["local_browser_draft"]`, no `SRC` sample-id mixing, all four
  `safetyFlags` present and `false`, `evidenceBoard[]` field/confidence shape, forbidden
  terms in keys/values (`scanForbidden`, 93), and person-truth claims in narrative.
- `createBlockedScanState(reason, errors)` (224) → pure `{ kind:"blocked_scan_state",
  status:"scan_failed_future", title, message, reason, errors[] }`.
- `DEV_FIXTURES` (238) — seven named fixtures for console/test: `validMinimalFutureResult`,
  `invalidAttractivenessResult`, `invalidSensitiveInferenceResult`,
  `invalidSampleMixResult`, `invalidMissingSafetyFlagsResult`, `validDevRendererResult`,
  `validFreeSimulationResult`. Never rendered as user analysis.
- Also exposes `SCHEMA_VERSION`, `RENDERABLE_STATUS`, `FORBIDDEN_TERMS` (copy).

**Loaded but not wired into the live product.** The only `app.js` references are
inside the dev harness (`mountDev`/`renderUploadedScanResultDev`,
`app.js:1193/1213/1223/1405`) reached only via `?dev=…`. Internal building blocks
(not exported): `SCHEMA_KEYS`, `FORBIDDEN_TERMS`, `PERSON_TRUTH`, `REQUIRED_SAFETY_FALSE`,
`scanForbidden`, `wordHit`, `isUnderStats`, `isPlainObject`.

---

## 4. `styles.css` — the visual systems (2524 lines)

One stylesheet, banner-delimited sections (the `/* ===… */` headers are the map).
Desktop-first; a narrow-screen fallback sits near the end. Major systems in file
order (line = banner):

| Line | Section | Holds |
| --- | --- | --- |
| 1 | **Tokens / `:root`** | Colour, type, spacing custom properties; base reset. |
| 77 | **Top bar** | `.topbar`, `.brand`, `.toggle` / `.toggle--treatment`. |
| 138 | **Room grid** | `.room` three-column layout (`panel--source` · `stagezone` · `panel--reading`). |
| 230 | **Shared module system** | `.module*` chrome shared by left + right panels. |
| 295 | **LEFT — scan frame with markers** | Marker dots / overlay scaffolding. |
| 432 | **CENTER — the card** | One master base + the three treatment skins (chamfered edge at 473; per-source tuning vars consumed at 521; Free-borrows-silver at 793; Lab finishes Cold Foil/Black Star/Night Gloss at 855/890/926). |
| 1059 | **RIGHT — reading modules** | Reading-panel chrome; Develop CTA conversion plate (1242). |
| 1307 | **LEFT — analysis tabs** | Tab chrome — the banner + `.tabbar` grid (`repeat(3,1fr)`, 1313) are **legacy 3-tab** ("Source / Diagram / Metrics"); only Diagram\|Metrics render post BR-S044. Diagram overlay (1339), CLEAN\|ANNOTATED rules (1343), metrics tab (1412), formula receipts (1503). |
| 1533 | **SCROLL DOSSIER** | The 7-plate archive below the hero; tier-band display at 1840. |
| 1917 | **Main Menu (front door)** | One-sample menu; shared `shot()` markup at 1998. |
| 2041 | **Local Draft intake** | Front-door view #3; Develop CTA (2106), Scan Development Gate (2110), safe blocked state (2155). |
| 2170 | **DEV HARNESS** | `?dev=` uploaded-result renderer; card-logic v1 sim surfaces (2222), Free Scan Simulation (2250). |
| 2264 | **Free Pull Layout Mock v1** | `?dev=free-scan-sim` (image slab 2300, cert label 2332). |
| 2374 | **Halo Gate Dev Mock v1** | `?dev=halo-gate` (sealed back 2396, dossier gate panel 2424). |
| 2453 | **Narrow-screen fallback** | Desktop is the priority; graceful degrade. |
| 2484 | **DEV NAV** | `.devnav*`, gated by `?devnav=1` (CSS keeps `display:none` without `body[data-devnav]`). |

---

## Cross-checks honored

- **BR-S044** — Source tab merged into Diagram. `state.tab` accepts only
  `diagram`/`metrics`; `?tab=source` re-points to `diagram` (`app.js:57`).
  CLEAN|ANNOTATED is `state.diagramView` / `?dv=` (`app.js:58`, handler 1734).
  No Capture Record module remains in `renderDossier`.
- **BR-S038** — filing-event row + Object→Scan→Card→Mint serial-lineage spine on
  dossier Plate 01 (`renderDossier`, `app.js:686-694`).
- **Dossier capped at 7 plates** — `dplate("01"…"07")`, no `08`.
