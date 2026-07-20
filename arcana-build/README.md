# arcana-build — the Arcana reading generator (source of truth)

The live Arcana artifact is **built from these files**, not hand-edited. Edit the source here, rebuild, verify, republish. All content is authored data rendered directly — **no runtime AI**.

## Build
```
cd arcana-build
python gen_artifact3.py      # -> writes arcana-reading-artifact.html here (~1.28 MB, pure ASCII)
```
`gen_artifact3.py` assembles `gen_head.css` + `gen_body.js`, embeds the data banks + fonts, and forces the whole file to ASCII (so it renders without a `<meta charset>`, which the artifact host controls). It reads `codex-data.json` from the repo root one level up; everything else from this folder.

## Files
| File | Role |
|---|---|
| `gen_head.css` | `<title>` + all CSS. `__FONTS__` placeholder gets the embedded @font-face. Colour law, type, the four registers (gold / ember / perk-palette / purple-commerce). |
| `gen_body.js` | All render logic: reading page (birth-derived), record/accession pages, compatibility wheel, keyword-colour render, section order. `__CODEX__ / __KB__ / __PRACTICAL__ / __KWCOLOR__` placeholders get the data. |
| `gen_artifact3.py` | The assembler. Run this to build. |
| `practical.json` | Authored interpretive dimensions per identity result: strengths(s) shadow(d) whatMatters(m) growthEdge(g) inLove(l) essence(es) gifts(gi) hardships(ha) friendships(fr) variations(va). |
| `kwcolor.json` | keyword → hex (the perk-colour lexicon). Regenerate with `build_kwcolor.py`. |
| `kb_compact.json` | Compacted knowledge bank (origin/attributions/correspondences/symbolism/deeper-hooks/contested) for the record-page history sections. |
| `fonts.css` | base64 woff2 for Cormorant Garamond + IBM Plex Mono. Regenerate with `build_fonts.py` (needs network). |
| `arcana-reading-artifact.html` | Last built output (reference). |

`codex-data.json` and `arcana-knowledge.json` live in the repo root (the full bank; `kb_compact.json` is the trimmed embed).

## Regenerate data (only if changing it)
```
python build_kwcolor.py       # rebuilds kwcolor.json from codex-data.json (edit FAMILIES/EXTRA to retune perk colours)
python build_fonts.py         # refetches + inlines the fonts (network)
```

## Publish
Rebuild → copy `arcana-reading-artifact.html` to `../_artifact-preview.html` → serve the repo locally and verify → publish to the **same** artifact URL (`https://claude.ai/code/artifact/f6c3fa45-cb5d-436e-9b40-5a2a47703221`) by passing `url:` so the link is kept.

## Building the diagrams (Command 1 of the handoff)
Add the four inline-SVG diagrams (Soul-Signature Bloom first, then Wu Xing / Decan / Numerology geometry) **into `gen_body.js`** and their styles into `gen_head.css`, then rebuild. Spec: `../docs/BR-ARCANA-HANDOFF-PROFILE-HUB-AND-DIAGRAMS.md`. Hold the four-register colour law; gold only on the one highlighted node; ember never in a diagram.
