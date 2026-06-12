# Visual Review Screens

Current UI screenshots, regenerated with `capture-screens.ps1` (headless
Edge against localhost:8743) and committed so reviewers — including
ChatGPT — can *see* the rendered product, not just the code.
**Judge visuals from these images, never from imagined CSS.**

Raw base: `https://raw.githubusercontent.com/Nilsjouna999/blue-room-scan-room/main/`

| Source | Treatment | Tab | Crop | Direct raw URL |
| --- | --- | --- | --- | --- |
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
`&tab=source|diagram|metrics` — e.g. `/?src=2&t=shiny&tab=metrics`.

**Workflow:** after any visual change → run `capture-screens.ps1` →
commit + push. Stale screens are worse than no screens.
Motion (holo edge rotation, shimmer, halo breathing) is not captured —
judging animation requires a screen recording or a manual note.
