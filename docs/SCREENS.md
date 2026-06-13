# Visual Review Screens

Current UI screenshots, regenerated with `capture-screens.ps1` (headless
Edge against localhost:8743) and committed so reviewers — including
ChatGPT — can *see* the rendered product, not just the code.
**Judge visuals from these images, never from imagined CSS.**

Raw base: `https://raw.githubusercontent.com/Nilsjouna999/blue-room-scan-room/main/`

| Source | Treatment | Tab | Crop | Direct raw URL |
| --- | --- | --- | --- | --- |
| (front door) | Free → Halo sample | Main Menu | hero | https://raw.githubusercontent.com/Nilsjouna999/blue-room-scan-room/main/docs/screens/menu-front.png |
| SRC-01 Driver | Free Pull | Source | hero | https://raw.githubusercontent.com/Nilsjouna999/blue-room-scan-room/main/docs/screens/src1-free-hero.png |
| SRC-01 Driver | Halo Mint | Source | hero | https://raw.githubusercontent.com/Nilsjouna999/blue-room-scan-room/main/docs/screens/src1-halo-hero.png |
| SRC-02 Ice Field | Free Pull | Source | hero | https://raw.githubusercontent.com/Nilsjouna999/blue-room-scan-room/main/docs/screens/src2-free-hero.png |
| SRC-02 Ice Field | Halo Mint | Source | hero | https://raw.githubusercontent.com/Nilsjouna999/blue-room-scan-room/main/docs/screens/src2-halo-hero.png |
| SRC-01 Driver | Halo Mint | Diagram | hero | https://raw.githubusercontent.com/Nilsjouna999/blue-room-scan-room/main/docs/screens/src1-halo-diagram.png |
| SRC-02 Ice Field | Halo Mint | Diagram | hero | https://raw.githubusercontent.com/Nilsjouna999/blue-room-scan-room/main/docs/screens/src2-halo-diagram.png |
| SRC-01 Driver | Halo Mint | Metrics | hero | https://raw.githubusercontent.com/Nilsjouna999/blue-room-scan-room/main/docs/screens/src1-halo-metrics.png |
| SRC-01 Driver | Free Pull | Source | full-page (hero + dossier) | https://raw.githubusercontent.com/Nilsjouna999/blue-room-scan-room/main/docs/screens/src1-free-fullpage.png |
| SRC-01 Driver | Halo Mint | Source | full-page (hero + dossier) | https://raw.githubusercontent.com/Nilsjouna999/blue-room-scan-room/main/docs/screens/src1-halo-fullpage.png |
| SRC-02 Ice Field | Halo Mint | Source | full-page (hero + dossier) | https://raw.githubusercontent.com/Nilsjouna999/blue-room-scan-room/main/docs/screens/src2-halo-fullpage.png |

Deep links (live site / localhost): `?src=1|2` · `&t=free|shiny` ·
`&tab=source|diagram|metrics` — e.g. `/?src=2&t=shiny&tab=metrics`. A bare
URL (no params) shows the front-door **Main Menu**; any of those params
opens the scan room directly and bypasses the menu.

The **Local Draft** intake view and its **Scan Development Gate** (menu →
*Add your photo* → *Develop scan*) require a user-selected local file, so
they cannot be reproduced by the headless capture pipeline and are
intentionally not committed as screenshots — they are verified live
in-browser during development. The **safe blocked/failure state**
(`renderBlockedScan`, BR-S019) is foundation only — not reachable in normal
flow (a future engine / dev test supplies it) — so it is likewise not
captured.

**Workflow:** after any visual change → run `capture-screens.ps1` →
commit + push. Stale screens are worse than no screens.
Motion (holo edge rotation, shimmer, halo breathing) is not captured —
judging animation requires a screen recording or a manual note.
