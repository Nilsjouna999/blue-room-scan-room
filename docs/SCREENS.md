# Visual Review Screens

Current UI screenshots, regenerated with `capture-screens.ps1` (headless
Edge against localhost:8743) and committed so reviewers — including
ChatGPT — can *see* the rendered product, not just the code.

Raw URL pattern (open these to view):
`https://raw.githubusercontent.com/Nilsjouna999/blue-room-scan-room/main/docs/screens/<name>.png`

| Screen | What it shows |
| --- | --- |
| [src1-free-hero](screens/src1-free-hero.png) | SRC-01 Driver · Free Pull · three-column hero |
| [src1-halo-hero](screens/src1-halo-hero.png) | SRC-01 · Halo Mint (Warm Glass Copper) · hero |
| [src2-free-hero](screens/src2-free-hero.png) | SRC-02 Ice Field · Free Pull · hero |
| [src2-halo-hero](screens/src2-halo-hero.png) | SRC-02 · Halo Mint (Cold Prism Frost) · hero |
| [src1-halo-diagram](screens/src1-halo-diagram.png) | SRC-01 · Diagram tab (scan sheet) |
| [src2-halo-diagram](screens/src2-halo-diagram.png) | SRC-02 · Diagram tab |
| [src1-halo-metrics](screens/src1-halo-metrics.png) | SRC-01 · Metrics tab (stat diamond etc.) |
| [src1-free-fullpage](screens/src1-free-fullpage.png) | SRC-01 · Free · hero + dossier (tall) |
| [src1-halo-fullpage](screens/src1-halo-fullpage.png) | SRC-01 · Halo · hero + dossier (tall) |
| [src2-halo-fullpage](screens/src2-halo-fullpage.png) | SRC-02 · Halo · hero + dossier (tall) |

Deep links (live site / localhost): `?src=1|2` · `&t=free|shiny` ·
`&tab=source|diagram|metrics` — e.g. `/?src=2&t=shiny&tab=metrics`.

**Workflow:** after any visual change → run the script → commit + push.
Stale screens are worse than no screens.
