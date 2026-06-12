# Reviewer Guide (for external AI reviewers)

You are looking at **Blue Room — Scan Room**, a PC-browser-first
photo-to-card scan product prototype. A photo becomes a premium collectible
card; the site around the card is the full "scan room" reading.

## Read in this order

1. `docs/PROJECT_OS.md` — the full project logic: thesis, laws, layout,
   stats, treatments, data map. **Respect anything marked LOCKED** when
   commenting — challenge it only with a clearly stronger reason.
2. `docs/DECISION_LOG.md` — why things are the way they are, with revisit
   conditions. Check here before suggesting something that was already
   decided against.
3. `docs/CARD_TECH_LAB.md` — open explorations (treatments, tiers,
   effects). Nothing in it is final; this is where new visual ideas belong.
4. `docs/CHANGE_MAP.md` — what edits touch what.

## The code (no build step — plain HTML/CSS/JS)

- `index.html` — shell: top bar, source + treatment toggles, three panels
- `data.js` — all content: 2 ScanResults, photo tuning, diagram + metrics
  data, formulas, treatment labels
- `app.js` — state + rendering: left tabs (Source/Diagram/Metrics), the
  master card, right reading panel, free/paid gating
- `styles.css` — design tokens, layout, card shell, treatment skins
- `assets/source-01.jpg`, `assets/source-02.jpg` — the two real source
  photos

## Current product state (2026-06-12)

- Customer tiers: **Free Pull** (archive preview) / **Halo Mint** (paid
  developed card). Signature Mint is an internal Lab state (keyboard `M`).
- Current Halo visuals are prototype-only; the final paid material is
  undecided (candidates in CARD_TECH_LAB §7).
- Hard rules: one master card geometry; treatments restyle, never
  re-layout; the card stays compressed (no graphs/diagrams/long prose on
  it); the product reads photos, never rates faces.

## What feedback is most useful

- Does Free Pull → Halo Mint read as "the card developed"?
- Is the right panel worth paying for?
- Are the Diagram/Metrics tabs interesting or too technical?
- Copy voice: premium scan archive, strange but readable, never cruel,
  never fake-scientific (see PROJECT_OS §14).

## Seeing the rendered product (visual review)

1. Read `docs/SCREENS.md` — it lists every current screenshot with a
   **full direct raw URL**. Open those URLs as images.
2. **Judge visuals from the screenshots, not from imagined CSS.** Reading
   styles.css and picturing the result is not visual review.
3. Use GitHub Pages only for live/deep-link/content checks:
   https://nilsjouna999.github.io/blue-room-scan-room/ with
   `?src=1|2&t=free|shiny&tab=source|diagram|metrics`. Text-based
   browsing does not convey look-and-feel.
4. Motion (holo edge rotation, shimmer sweep, halo breathing) is not in
   the screenshots — judging animation requires a screen recording or a
   manual note from the maintainer.

## Fetching files

Raw base (exact, no placeholders):
`https://raw.githubusercontent.com/Nilsjouna999/blue-room-scan-room/main/`
Append any repo path, e.g.
`https://raw.githubusercontent.com/Nilsjouna999/blue-room-scan-room/main/docs/PROJECT_OS.md`
or `…/main/app.js`.
