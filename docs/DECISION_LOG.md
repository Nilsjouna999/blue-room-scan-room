# BLUE ROOM — Decision Log

Format: **Date / Decision / Status / Why / Revisit condition**
Newest entries at the bottom. Log a new entry *before* making a change that
contradicts an existing one.

---

**2026-06-12 / One master card base / LOCKED**
Why: the product is a consistent collectible system; per-photo layouts would
destroy the "same system, personal result" magic and multiply maintenance.
Revisit: only if a future card-family system (CARD_TECH_LAB §17) proves it
can keep master geometry while skinning families — and even then, geometry
stays singular.

**2026-06-12 / PC-browser-first / CURRENT**
Why: the desktop scan room (left/center/right) is the experience being
validated; mobile-first would force compromises before the direction is
proven. Mobile remains a basic stacked fallback.
Revisit: after the desktop experience passes the "I want my own card" test.

**2026-06-12 / Two-source prototype only / CURRENT**
Why: two real photos (Driver, Ice Field) are enough to prove the master
system produces personally different cards; more sources add content work,
not learning.
Revisit: when a new photo type would test something the current two cannot
(e.g. studio fashion, night/party).

**2026-06-12 / No upload, backend, login, checkout, database yet / LOCKED (for V1 phase 1)**
Why: the test is visual/emotional ("does the card have aura?"), not
technical; backend before that answer is overbuilding.
Revisit: phase 2 (local upload preview) only after the visual direction
works — see PROJECT_OS §15 roadmap.

**2026-06-12 / Keep Presence / Frame / Signal / Charge / CURRENT**
Why: audited 2026-06-12 — each reads a photo quality, none carries
face-rating energy, all four are screenshot-friendly, values hold for both
sources. Formulas explain them without renames.
Revisit: if real users consistently misread a name (especially "Charge" or
"Signal").

**2026-06-12 / Left tabs = Source / Diagram / Metrics / CURRENT**
Why: separates "what photo is read" / "how it was read" / "why the stats
happened" without cluttering one view; tabs keep the panel calm.
Revisit: if testing shows users never open Diagram or Metrics.

**2026-06-12 / Card stays compressed / LOCKED**
Why: the card is the trophy; diagrams, graphs, formulas, and long prose on
the card would turn it into a report and kill the screenshot.
Revisit: effectively never — additions go to the scan room instead.

**2026-06-12 / Site carries the depth / LOCKED**
Why: the scan-room-around-the-artifact structure is the product thesis; it
is what separates Blue Room from a card-generator widget.
Revisit: effectively never.

**2026-06-12 / Free / Signature / Halo treatment split / CURRENT**
Why: three tiers prove the upgrade ladder: archive scan → developed
artifact → rare pop. Free deliberately un-magical so paid feels obvious.
Revisit: when the treatment ladder is redesigned (see CARD_TECH_LAB §5) —
tier names and count may change; the restyle-not-relayout law does not.

**2026-06-12 / No face-rating, ever / LOCKED**
Why: the product reads photos, not faces; attractiveness scoring is a
different (worse) product and a reputational trap.
Revisit: never.

**2026-06-12 / Profile layers are future, user-provided, not inferred / CURRENT (BACKLOG feature)**
Why: "the photo creates the card; the profile adds the lore" — inferring
MBTI/zodiac/etc. from a photo would be fake certainty and creepy; declared
layers are lore, not claims.
Revisit: when profile layers move out of backlog.

**2026-06-12 / Signature Mint is no longer the main paid visual tier / CURRENT**
Why: as the visible paid upgrade it was too subtle — a middle skin, not an
obvious transformation. The main paid direction is now a dramatic
transformed card state ("Halo Mint"), currently represented by the Halo
prototype visuals, but the final Halo design is not locked. Signature Mint
becomes an internal Lab state (keyboard `M`): its silver material survives
as a source for Free Pull polish and the final paid material.
Revisit: if testing shows users want a quieter paid default beneath the
transformed tier.

**2026-06-12 / Customer-facing hierarchy is two-tier: Free Pull / Halo Mint / CURRENT**
Why: preview vs. developed is the clearest purchase story; "mint" doubles
as the verb ("Mint this scan"). Future variants (Black Star, Cold Foil,
Night Gloss, Archive Foil, Static Mint, Mythic Prism) sit above/beside Halo
Mint later — BACKLOG.
Revisit: when the first rare variant ships.

**2026-06-12 / Current Halo Foil is prototype-only, not final shiny design / TESTING**
Why: it proves a paid treatment can pop in-browser (holo edge, halo,
particles, shimmer) but it is an effect bucket, not a card material — it
lacks a distinct material identity and a "why this card became Halo" logic.
Final shiny direction is being explored in `docs/CARD_TECH_LAB.md`
(candidates: Cold Foil, Black Star, Night Gloss, Signal Halo, …).
Revisit: after the three alternative shiny treatments are prototyped and
compared (CARD_TECH_LAB §20).
