# Blue Room — Scan Room (Prototype 002, desktop-first)

Three-column PC scan-room experience. No backend, no build step.
This folder (`blue-room-scan-room/`) is the only active workspace —
the old Godot prototype and scan-archive stay untouched elsewhere.

**Run it:** open `index.html` in a browser, or serve the folder
(`python -m http.server 8743`).

**Images** (already in place):

```
assets/source-01.jpg   ← car selfie (landscape)
assets/source-02.jpg   ← ice auger on frozen lake (portrait)
```

Paths are configured per source via `file` in `data.js` — any of
`.jpg` / `.jpeg` / `.png` works. If a file is missing the slot shows
"Missing image file: assets/source-0X.jpg" instead of a fake placeholder.

**Controls:** SRC 01 / SRC 02 toggle · Free Pull / Halo Mint toggle ·
keys `1` `2` for source, `F` free, `H` Halo Mint, `M` internal Lab state.

## Layout

The page scrolls: the three-column hero fills the first viewport, and a
**scan dossier** (7 archive plates: Source Record → Evidence Board → Stat
Dossier → Hidden Stat → Fit + Aura → Mint Record → Oracle Read) continues
below. Free Pull shows the dossier as undeveloped archive material with a
develop CTA; Halo Mint shows the full record. Halo Mint accents are
per-source materials (Warm Glass Copper / Cold Prism Frost).

- **Left** — tabbed analysis panel:
  - **Source** — the raw photo with focal markers, capture record,
    frame-analysis notes. Answers "what photo is being read?"
  - **Diagram** — visual scan sheet over the photo: rule-of-thirds grid,
    focal lock, subject mass box, gesture line, horizon/frame axis, signal
    arrow, light direction, crop pressure zones. Free shows a limited
    diagram (grid + focal + mass); the full sheet develops with Mint.
  - **Metrics** — four compact receipt modules: Stat Diamond, Signal Mix
    (free), Composition Pressure, Fit Coherence Matrix (veiled in free).
    Styled as interpretive receipts, never as measurements.
- **Center** — the card. One master base; treatments restyle it, never
  re-layout it.
- **Right** — stat readings, aura, scene role, then the deep modules
  (stance, fit, impact, lore, oracle, mint record, receipts). In Free Pull
  the deep modules are blurred/locked with a develop preview; the unlock
  buttons just switch treatment (no checkout).

## Treatments

| State | Role | Feel |
| --- | --- | --- |
| Free Pull | archive preview (customer tier) | matte archive with a silver touch — muted image, moss bars, dashed unminted stamp |
| Halo Mint | full developed artifact (customer paid tier) | transformed card: black chrome, holo edge, halo glow, star specks, shimmer — current visuals are prototype-only |
| Lab · Signature Mint | internal material study (keyboard `M`, no button) | silver-leaf frame, foil sheen — donor material for Free polish + final Halo material |

Free is a good preview, deliberately less alive — the paid transformation
("the card developed") is supposed to be obvious. Hierarchy decided
2026-06-12; see docs/DECISION_LOG.md.

Per-source photo tuning (focal point `pos`, `zoom`, darkening `scrim`,
exposure `base`) lives in `photoTuning` in `data.js`. Treatments multiply
their look on top of that base — the left scan frame always shows the raw
source untouched.

## Stats audit (2026-06-12)

Presence / Frame / Signal / Charge were audited and **kept unchanged**:
each reads a photo quality (subject dominance / compositional craft /
legibility of intent / energy), none implies attractiveness, all four are
one-word screenshot-friendly, and the current values hold for both sources
(SRC 01's low Frame = wide-angle cabin clutter; SRC 02's low Signal =
three layers of withheld face). The paid depth set stays Visual Impact +
Fit Coherence + Lore Density + Stance in the right panel. The interpretive
formulas (`FORMULAS` in data.js) explain each stat's recipe inside
Technical Receipts — "derived from" language only, no science claims.

## Files

| File | Role |
| --- | --- |
| `data.js` | 2 hardcoded ScanResults written from the provided photos |
| `app.js` | Three-panel renderer + toggles |
| `styles.css` | Tokens + master card + treatment systems |
