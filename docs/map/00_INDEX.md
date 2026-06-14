# 00 · MAP INDEX — the live-artifact skeleton

> **What this folder is.** `docs/map/` is the granular "you are here" map of the **actual built
> artifact** — the real DOM shell, views, runtime state machine, rendered surfaces, and code
> structure of BLUE ROOM as it ships today. It maps *what the code does*, citing real
> identifiers (function names, CSS classes, data keys, URL params) and file:line where it
> matters. Ground truth is the five root files (`index.html`, `styles.css`, `app.js`,
> `data.js`, `scan-contract.js`) + `assets/source-0{1,2}.jpg`. No build, no node, no backend.

This folder is **one of three complementary maps** — keep them distinct, never duplicate:

| Map | Question it answers | Lives in |
| --- | --- | --- |
| **`docs/map/` (this folder)** | *Where is this in the built artifact?* — real DOM / views / state / panels / plates / code | here |
| `docs/UNIVERSE_ZONE_MAP_V1.md` | *What is the concept territory?* — the five concept zones (Lobby / Scan Room / Card Record / Vault / Codex), LIVE vs aspirational, the §7 aggregate-refusal wall | `docs/` |
| `docs/FILE_MAP.md` | *Which file do I edit?* — one-line-per-file router + scope rules | `docs/` |

If a question is "where does X render / what state drives X / what's the visibility rule," it is
answered **here**. If it's "is this zone built yet" → zone map. If it's "which file holds X" →
file map.

---

## The four maps + the security lane

| # | Doc | One-line pointer |
| --- | --- | --- |
| 01 | [`01_PAGE_SKELETON.md`](01_PAGE_SKELETON.md) | The built DOM shell of `index.html` — top-level `#id` containers in source order, the topbar, the room grid, hidden/dev containers, script load order, and the `body[data-view]` CSS visibility gate (which container paints in which view). |
| 02 | [`02_VIEWS_AND_STATE.md`](02_VIEWS_AND_STATE.md) | The runtime state machine — the `state` object (`app.js:44`), URL params that seed it, the four views + routing, the `render()` pipeline, keyboard controls, the delegated `data-*` click handlers, and the dev routes. |
| 03 | [`03_SURFACES.md`](03_SURFACES.md) | The three room panels + the 7-plate dossier — what each surface renders, the free vs developed forks, the Diagram CLEAN\|ANNOTATED view, the card skins, and the full source × treatment × tab/view coordinate matrix. |
| 04 | [`04_CODE_MAP.md`](04_CODE_MAP.md) | The code grain — `data.js` fixture corpus + v2 shape, the `app.js` function inventory, the `scan-contract.js` safety-valve surface, and the `styles.css` banner-section systems. *Where a thing lives.* |
| — | [`SECURITY_REVIEW_PLAYBOOK.md`](../security/SECURITY_REVIEW_PLAYBOOK.md) | Lives in `docs/security/`. The security lane of the map — an ordered, gate-by-gate go-through to run **when a security pass is greenlit** (not a standing claim), plus an append-only register of things to check. Front-loaded on the few live concerns (DOM/XSS via `esc()`, URL-param allowlists, fonts-without-SRI) and weighted toward the FUTURE red lines (engine validator wiring, aggregate wall, CSP) that must clear before upload/backend/payment/deploy. |

---

## The "you are here" coordinate convention

Any addressable point in the sample room is a tuple — the room is a small, finite state space:

```
(source, treatment, tab[, diagramView][, labMaterial])   within   view = room
```

- **source** ∈ `{0 SRC-01 Driver, 1 SRC-02 Ice Field}` — keys `1`/`2`, `#sourceToggle`, `?src=1|2`
- **treatment** ∈ `{free, shiny=Halo Mint, mint=Lab}` — keys `F`/`H`(or `S`)/`M`, `#treatmentToggle` (free/shiny only), `?t=`
- **tab** ∈ `{diagram, metrics}` — `.tabbar` buttons, `?tab=` (legacy `source`→`diagram`)
- **diagramView** ∈ `{annotated, clean}` — `.diagtoggle`, `?dv=` (sub-toggle inside Diagram)
- **labMaterial** ∈ `{null, cold-foil, black-star, night-gloss}` — Lab `[`/`]` keys, `?t=mint&lab=` (mint only)

The top-level screen is **`view`** ∈ `{menu, room, draft, dev}` (`body[data-view]`). Any of
`?src`/`?t`/`?tab` in the URL opens `room` directly and **bypasses the menu**. The `draft` and
`dev` views are out of the sample-room tuple (local intake / dev harness); `?devnav=1` is a
separate defense-in-depth gate for the dev rail.

---

## Keep in sync when X changes

This map is only worth as much as its accuracy. Re-verify the named doc when:

- **A top-level container or the view gate changes** (`index.html` sections, `styles.css`
  `body[data-view]` block at ~1925) → **01**.
- **The `state` shape, a URL param, a keyboard/click handler, or `render()` wiring changes** →
  **02** (and the coordinate convention above).
- **A panel/card/dossier render fn, the free↔developed gating, a plate, or the CLEAN\|ANNOTATED
  behavior changes** → **03** (the dossier is capped at **7 plates** — update the cap note if that moves).
- **A `data.js` key, the v2 shape, an `app.js` function, the contract surface, or a `styles.css`
  banner section moves** → **04** (line numbers are approximate — trust the identifier, re-grep the line).
- **Any new `?param`, `<script src>`/external `<link>`, `innerHTML`/`style=`/`onerror=`
  interpolation, or a change to `esc()` / `scan-contract.js`; or before wiring the engine /
  backend / payment / first public deploy** → **SECURITY_REVIEW_PLAYBOOK** (see its §4 trigger list).

Rule of thumb: cite identifiers first, line numbers second. When in doubt, read the file — a
wrong reference map is worse than none.
