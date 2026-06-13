# BLUE ROOM — Task Queue

Ranked work queue, not a dream backlog. One Active item at a time.
Out-of-scope findings from any session get logged here, not patched.
Last updated: 2026-06-12.

## Active

- **Wire SCAN_RESULTS_V2 into rendering** (this session): helpers added;
  stats/hidden/mint/oracle read v2 with legacy fallback; Evidence Board +
  Metrics tab left legacy with TODO(v2-render) markers. **Completed** —
  visual output unchanged by design (the receipt-plate redesign is a
  separate, queued decision).
  *(Previous actives — v2 data shape, SPINE promotion, governance OS, doc
  spine cleanup — completed 2026-06-12.)*

## Ready (supported by current docs, clear definition of done)

1. **18-state audit** — PROJECT_OS §17.1. Walk 2 sources × 3 treatments
   (incl. Lab) × 3 tabs at 1600×900.
   *Done when:* every state screenshotted or DOM-verified; issues logged
   here, not fixed inline.
2. **data.js copy audit against COPY_SYSTEM** — the grammar postdates most
   shipped copy.
   *Done when:* every string in data.js passes the banned-word list, the
   tone test (§1) and the every-outcome-is-a-win rules (§5); fixes
   committed; no meaning drift.
3. **Render archetype discovery note in Halo** — PROJECT_OS visibility
   table promises "full archetype explanation + discovery note" in Halo;
   no data field or render exists yet. Pull discovery notes from
   COPY_SYSTEM §4 (Encounter / Dispatch).
   *Done when:* Halo shows the archetype class + discovery note (right
   panel or dossier §4/§5 — not on the card); Free shows label only.
4. **Three shiny material prototypes** — CARD_TECH_LAB §20: Cold Foil /
   Black Star / Night Gloss as data-only `halo` presets behind the Lab
   key, no layout changes.
   *Done when:* three presets switchable in Lab, screenshots captured and
   compared side-by-side, comparison filed in CARD_TECH_LAB.
5. **Dossier plate material polish** — taste debt from the 2026-06-12
   review: plates read flat next to the card; let the material accent
   bleed in (Mint Record plate already does).
   *Done when:* Halo dossier plates carry a restrained material accent;
   free stays matte; screenshots regenerated.
6. **Render v2 receipts + route label in the UI** — the deferred half of
   the v2 wiring: Evidence Board shows structured receipts (cue/effect/
   basis/confidence) and Source Record shows the route label. Needs one
   small presentation decision first: how effect values ("Frame +8")
   appear without turning plates into a dashboard (DESIGN_TOKENS accent
   rules apply).
   *Done when:* Evidence Board renders scan.receipts (free 3 / halo all),
   route label in Source Record, TODO(v2-render) markers removed,
   screenshots regenerated.

## Backlog / needs decision

- **Final Halo material decision** — after Ready #4; log winner in
  DECISION_LOG, promote rules to PROJECT_OS (CARD_TECH_LAB §18/§20).
- **Develop/mint transformation moment** — CARD_TECH_LAB §15; needs scope
  decision (animation budget, where it triggers).
- **Rare-variant ladder** (Black Star etc. as tiers above Halo Mint) —
  needs the material decision first.
- **Local upload preview** (roadmap Phase 2) — only after the visual
  direction passes the "I want my own card" test.
- **Deterministic ScanResult engine** (Phase 3), **AI-assisted reading**
  (Phase 4), **$7 mint flow** (Phase 5), **Vault** (Phase 6).
- **Profile layers** (MBTI/zodiac/etc.) — user-provided only, never
  inferred; needs activation decision.
- **Mobile pass** — currently basic fallback by decision; needs a "now
  it matters" call.

## Retired / won't do

- Free Pull / Signature Mint / Halo Foil three-tier structure (retired
  2026-06-12; DECISION_LOG).
- Signature Mint as a customer-facing tier (survives only as internal
  Lab state + signature/mint language).
- "Develop into Halo Mint" as primary CTA (replaced by "Develop this
  scan").
- Face-rating, attractiveness scoring, social comparison, public
  rankings, friend comparisons — REJECTED permanently.
- Blur-veil paywall styling for free content (replaced by undeveloped
  archive plates).
- 10-fixture prototype and pre-isolation scan-room copy (archived to
  `_OLD_ARCHIVE_DO_NOT_USE`).
