# SCAN ENGINE SPEC

Layer: ACTIVE SPECS · Status: ACTIVE · Promoted from research/SPINE.md
§7–10 on 2026-06-12. Governs how scans are scored and explained.

## Lens engine

Seven lenses read **visible artifact evidence only** — never the person's
worth, looks, biology, or psychology.

| Lens | Reads |
| --- | --- |
| Frame | crop, subject placement, camera distance, negative space, horizon/tilt, spatial control |
| Gesture | posture, hand position, body orientation, stance, head direction, motion/stillness — geometry only, no emotional diagnosis |
| Signal | clothing/styling, props, objects, color palette, environment, visible intention |
| Charge | contrast, intensity, tension, memorability, silhouette, oddness, immediate impact |
| Lore | background specificity, setting, tools, weather, terrain, objects, signs |
| Coherence | whether parts lock: styling↔setting, color↔mood, subject↔frame, gesture↔scene |
| Rarity | uncommon combinations, contradictions, title-token potential. **Rarity never means attractiveness.** |

## Stats (visibility resolved 2026-06-12)

- **Free Pull — exactly 4 visible public stats:** Frame Presence · Frame ·
  Signal · Scene Charge (display labels; internal keys `presence/frame/
  signal/charge`). Shown as **tier bands**, not 0–100 (Artifact Language
  Stabilization v1, 2026-06-13). Cheap, stable, visually simple. No new
  public stat types.
- **Halo Mint / dossier — deeper stats:** Lore Density · Fit Coherence ·
  Gesture Geometry · Frame Impact *(formerly Gesture Authority / Visual Impact)*.
  - **Gesture Geometry is conditional** — shown only when gesture/body
    evidence is visible.
  - **Frame Impact is derived** (from Scene Charge + Frame Presence + Frame +
    Rarity), never independently scored.
- Route-specific stats may exist inside Halo/dossier (e.g. Creature
  Presence on ANIMAL_COMPANION) but the core product stays readable.

## Confidence shrinkage

Missing evidence reduces confidence; it never punishes the photo.

```
displayed_score = 50 + confidence * (raw_score - 50)
```

Uncertain scans move toward neutral — no fake extreme scores.
Examples: no visible hands → no Gesture Geometry · dark background →
lower Lore confidence · blurry subject → shrink bold claims · landscape
route → never score human posture.

## Receipts

Every meaningful point movement carries evidence:

```json
{ "cue": "subject centered against wide snow field",
  "effect": "Frame +8",
  "basis": "composition / negative space",
  "confidence": "high" }
```

Allowed verbs: registered · detected · reads as · evidence suggests ·
routes toward · adds pressure to · reduces clarity in.
Banned: proves you are · your personality is · biology says · dominance
ratio · attraction signal · alpha energy · masculine/feminine score.

## Free vs Halo scoring split

- **Free:** deterministic/template scoring, 4 stats, 1–3 short receipts,
  one-line reading, route label. No hidden stat, no full evidence board,
  no confidence details. Cheap enough to run on every pull.
- **Halo:** AI vision pass with route-specific lenses, confidence-aware
  refinement, full receipts/evidence board, deeper stats, hidden/
  conditional stat, oracle, mint record.
- Halo may *develop* Free's read (different depth, richer language); it
  must not *contradict* visible facts Free established.
