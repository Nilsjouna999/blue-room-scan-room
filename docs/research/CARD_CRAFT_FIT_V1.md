# BLUE ROOM — Card Craft Fit (research understanding)

Layer: RESEARCH (informs, never locks) · understanding + a filter, NOT a design · 2026-06-17.
Built by an 18-agent fit-filtered forge (gather external card/material/free-paid craft → judge each
against the Blue Room machine → synthesize → stress-test). Source for the future card DESIGN mission.

## The one filter

Blue Room takes from card craft ONLY the levers that read as an **earned material state the object
reached** — made of something, **baked into the plate so peeling it off would destroy the card**,
traceable to a visible photo cue — and rejects every lever whose force comes from **scarcity, a
quality-ladder, or rating the person**. The test on any idea: does it make minting/scanning more
legible as **giving**, on one master geometry — or does it turn the card into a prize, a grade, or a
score?

## Free (understanding — redesignable, not locked)

Free's flaw is that it is the Halo card with the shine *removed* (three filter vars + a dashed
ghost-serial, `styles.css:799-800`) — subtracting reads as "something is missing." Fix: give Free its
**own** finish — a matte print in its own dark-archive palette (graphite/charcoal/moss), its own
struck "Free Pull Edition" stamp, its own real serial (the serial is an OBJECT address, not a
scarcity count). Complete on its own terms, a different *kind* than Halo, not a stripped Halo.

## Halo (the crown — one kill-gate)

The **inseparability test**: *can you peel the finish off and still have a card?* Yes → effects-on-top
→ flimsy → reject. No → a material state → solid → a crown. Current shiny FAILS (floated conic +
`holo-spin 7s infinite` over an unchanged plate, `styles.css:976-989`); Black Star PASSES (grain
baked into `.card__plate`, `styles.css:908-915`). The real flaw is **structural, not chromatic**:
SRC-01 / SRC-02 already differ in color (`data.js`) but ride an identical conic structure — per-source
identity needs the **structure replaced, not retinted**.

## Material (a system, four laws + one spine)

1. **Foil-stamp, not foil-flood** — specular in ONE zone (serial/stamp/edge); restraint IS the cost signal.
2. **Relief baked into the base layer** (Black Star proves it), never sprinkled on top.
3. **Dark surface + a hard-offset object shadow** (2–3px) → reads as a physical object.
4. **Gated microtext** — reward-for-inspection, gated to provenance/archival, NEVER a hidden score.
- Spine (LIVE): **per-SOURCE keyed finish** (`--halo-a/b/c`). Every accent must cite a scan cue or it
  is a paywall skin (cut).

## Connects to the machine
- **MINT** — the finish is the visible sign of latent→developed; the struck serial/stamp is the
  permanent provenance impression, never a re-roll or chance pull.
- **SCAN** — every accent cites a visible photo cue, or it is a paywall skin and is cut.
- **STATS** — finishes are intensity dials on existing layers tied to MUTED→PEAK bands — never a
  printed number, never a re-layout, never a "better human." Per-DOMINANT-STAT keying = research-later,
  NOT spine (it edges toward "higher = louder/better").

## Rejected (clash with the machine)
Print-run "/N", chance-rarity, PSA numeric grades, person-rating finishes (scarcity / person-rating
kills) · per-dominant-stat finish (score-meter drift) · spot-UV over a *person* anchor (SRC-01 raised
palm → HUMAN_READ_LINE gate 2; key to non-person cues only). The `renderFreePullMock` "boundary
offender" is STALE — already fixed (`app.js:1518`); do not re-fix.

## Open questions for the DESIGN mission
- **PRECONDITION / GATE:** reconcile `PROJECT_OS §66/§107/§299` ("Free = undeveloped / partial /
  incomplete | CURRENT") with the LOCKED `GOLDEN_NUGGETS #5` ("Free is the complete front") BEFORE
  building any Free craft — else every Free choice ships against a live, contradicting doc.
- Exact Free palette hexes + the "Free Pull Edition" stamp typography/strike.
- Black Star vs Night Gloss — a *taste call from real side-by-side* (`dev-live.html`), deferred.
- Replacing the Halo conic structure (not retinting) so per-source `--halo-a/b/c` accents read distinct.
- Subject-gloss safety: only non-person image-act cues (SRC-02 auger/treeline), never SRC-01's palm.
- The develop→Halo transformation moment (band-not-number, reduced-motion snap, retire holo-spin-infinite).
- Whether V1 ships any per-stat reactivity (currently research-later, not spine).
