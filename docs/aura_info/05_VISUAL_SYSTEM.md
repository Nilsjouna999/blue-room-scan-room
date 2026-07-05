# O5 — VISUAL DIRECTION LEAD

**Scope:** the residue-visual layer for Aura — the three residue directions + type-burn reserve, the selection rule, the tension-line-as-default ruling, tint discipline, red-line anti-patterns, the type↔graphic handoff, the metTier-band coexistence rule, and per-source visual assignments SRC-01..05 with build notes. Read-only; no files touched. The dossier screenshot `1783253951358_image.png` was **not present** (checked repo + Downloads) — proceeded without it; noted as absent, not a blocker.

**Repo facts are anchored to file + grep-able string** (line numbers drift). Everything is judged against the one sentence: *Aura reads what the image does — charged, terse, verdict-shaped — without diagnosing the person and without becoming a second Diagram / Surface / Metrics / Oracle.*

---

## 0. THE CONVERGENCE RULING (the load-bearing O5 decision)

The mission asked me to rule on whether the **off-center tension line becomes the DEFAULT**, with seam and smear as per-source alternates, given the deep convergence: the tension line IS the natural visual of the Subtraction Gate's two-term relation (two poles + a biased resolution).

**RULING: YES — the off-center tension line is the DEFAULT residue mark for Aura. Seam and smear are per-source alternates, selected only when the source's relation-kind is specifically a threshold (seam) or a retained passing gesture (smear). Type-burn is held in reserve and does not ship in the initial pass.**

Rationale, in one line each:

1. **The spine already committed to a two-term relation.** Aura's irreducible job (ground truth #3) is *the relation the frame stages between two co-present elements* — two poles and a biased resolution between them. The off-center tension line is that exact shape rendered: two silent anchors, one filament, the resolution biased to one side (S2 §2). Every other mark renders a *narrower* case of the same idea. Making the general case the default and the narrow cases the exceptions is the correct nesting.

2. **The default already has its bias data authored in the repo.** Each live source carries `field.node {x, y}` + `field.balance` + `field.weight` in `data.js` (grep `field:` and `node:` — e.g. SRC-01 `node:{x:0.42,y:-0.34}, balance:"Lean right"`; SRC-02 `node:{x:0.04,y:0.30}, balance:"Centred"`; SRC-03 `node:{x:0.04,y:0.12}`; SRC-04 `node:{x:0.04,y:-0.12}`; SRC-05 `node:{x:-0.08,y:0.14}`). The tension line's off-center bias is not invented per-card — it reads the *existing* `field.node` offset as the bias vector. The default is the direction with the least new authoring and the most repo grounding.

3. **The default resists decay to a second Diagram better than seam/smear can.** A single biased filament between two implied poles carries almost no "mechanics" surface for a builder to accidentally turn into axes, arrows, or a gauge. Seam and smear are also safe, but the tension line is the one whose *only* content is the relation — which is precisely Aura's only job. It is the most self-limiting mark.

4. **Seam and smear stay in the kit because two relation-kinds genuinely need them.** A pure threshold/cut/window (SRC-02's drilled seam; SRC-05's stressed containment seam) reads more truthfully as **one-seam burn** than as a two-pole line — there is one frontier, not two poles. A retained passing gesture (SRC-01's palm-warmth drag; SRC-04's exertion drag) reads more truthfully as **ghost smear** — the residue is a *lingering trace of motion*, not a *biased balance*. Forcing these into a tension line would be the tension line pretending, which S2 §2's own caveat forbids ("don't draw a bipolar line unless the source truly contains two felt poles and a real bias").

**The selection rule, restated as a decision tree (default-first):**

```
Does the source's relation reduce to a biased balance between two co-present poles?
  → YES (default)         → OFF-CENTER TENSION LINE   (bias vector = field.node offset)
  → NO, it's a threshold  → ONE-SEAM BURN             (cut / window / puncture / containment edge)
  → NO, it's retained motion → GHOST SMEAR            (a gesture that stayed in vision)
Does the card own one unforgettable phrase that any graphic would merely decorate?
  → almost never — TYPE-BURN held in reserve, does NOT ship pass 1 (steals Oracle's thunder)
```

This inverts S2 §3's presentation order (which lists seam first) **without contradicting its logic** — S2 §3's rules are unchanged; I am only naming which one is the fallback default when a source is ambiguous. Flagged for O6/F1: this is a *default-selection* ruling layered on top of S2's selection rule, not a rewrite of it.

**On the four-directions ↔ five-kind-words mapping (S2 CONFLICT #2, open):** I resolve it as a **render layer, not a lookup**. The residue direction is chosen by the *shape of the relation* (biased-balance / threshold / retained-motion), which is a coarser axis than the five schema kind-words. The kind-word (Standoff/Edge/Figure-Ground/Light-Fit/Vector-into-Void) names the relation for *the band's text*; the residue direction renders it for *the eye*. They are two projections of the same relation, not a fixed 1:1 table. Concretely: **Standoff → tension line** (two poles held apart); **Edge / Light-Fit → seam** (a frontier where two conditions meet); **Vector-into-Void → smear** (motion trailing into black); **Figure-Ground → tension line** (figure-vs-ground IS a two-pole balance). This is a *default* mapping, overridable per-source; it is not a hard schema constraint. Routing the final call to O6/F1 — I am proposing, not locking.

---

## 1. THE THREE RESIDUE DIRECTIONS + TYPE-BURN RESERVE (locked look-specs)

Carried verbatim-in-substance from S2 §2, with O5 build discipline attached. All render against **near-total black** (`--bg` / `#0b0b0c`-register field, S2 §4: black as the field of disappearance).

**Off-center tension line — DEFAULT.** Two silent anchors (implied or ≤3px dots); one filament spanning them; thickness/brightness/curvature biased off-center per the source's `field.node` offset. No ticks, no arrows, no legend, no numbers. The bias *is* the content — an evenly-centered line is a failure state (reads as equilibrium, which is never Aura's verdict).

**One-seam burn — alternate (threshold).** Almost total black; one luminous seam or cut; slight warm bleed on one side; one cold/purple edge on the other; no nested rings, no secondary marks unless near-invisible. The most premium reading of "afterimage" (S2 §2) — reserved for genuine thresholds so it stays premium.

**Ghost smear — alternate (retained motion).** One warm translucent drag derived from the source's dominant gesture; soft decay into black; a narrow cool/purple exit rim; maybe one exposure band. Risk (S2 §2): too much blur/opacity layering slips it from *residue* to *effect* — cap it at one drag + one rim.

**Type-burn — RESERVE, ships nowhere in pass 1.** One oversized phrase, pressure-distressed, warmth fading to black. S2 §2 self-flags it as "the most dangerous direction" for this product position; ground truth #7 makes Oracle the only verdict. **O5 position: type-burn is a documented option, not a shipped one.** It is the one direction that inverts the 80/20 handoff (below) and reads as the verbal climax. Keep it in the kit as a named reserve so the taxonomy is complete, gate it behind "the card owns one unforgettable phrase AND Oracle has been checked to still have somewhere richer to go," and do not assign it to any of SRC-01..05.

---

## 2. THE 80/20 TYPE↔GRAPHIC HANDOFF ("seen first, then named")

**Locked as a system rule (S2 §6, ground truth #7 reinforcement):**

> **"Aura should be seen first, then named; Oracle should be read first, then felt again."**

Recommend this sentence be preserved verbatim if a synthesis doc is drafted (S2 flagged it; I second it).

**Build consequence — 80% mark, 20% language.** The residue mark carries the verdict in the body *before* the sentence finishes it. The authored line is a **subordinate witness**, not a caption and not a headline. In DOM/paint order and in visual weight, the mark leads; the metTier band and the one authored line trail. This is the concrete reason type-burn is benched: type-burn is 80% language, which is the exact inversion of the position Aura occupies.

**Handoff sequence (motion-off default; see §5 reduced-motion):** mark resolves → band settles → line reads. With motion on, this can be a ≤600ms settle; with motion off, all three are present at first paint in final state. Neither ordering lets the line arrive before the mark.

---

## 3. TINT DISCIPLINE (one tint, warm-silver archive field, no rainbow)

**One tint per card, derived from `src.halo.a` via `color-mix`.** The repo already injects `--halo-a` as a custom property on the render root (`app.js` grep `--halo-a:${esc(src.halo.a)}` at the dossier/card style attr, and `document.body.style.setProperty("--halo-a", src.halo.a)`). Aura reuses that exact channel — no new color plumbing.

Per-source `halo.a` (from `data.js` grep `halo:`), which becomes each card's single Aura tint:

| Source | `halo.material` | `halo.a` (the tint) | Register |
|---|---|---|---|
| SRC-01 Driver | Warm Glass Copper | `#c98a5e` | warm copper |
| SRC-02 Ice Field | Cold Prism Frost | `#5fd4e0` | cold cyan |
| SRC-03 Shore | Cold Tide Steel | `#6fb3e0` | cold steel-blue |
| SRC-04 Run | Field Green Glass | `#7fc8a0` | cool green |
| SRC-05 Tank | Tank Glass Teal | `#36b6c8` | saturated teal |

**Discipline rules (S2 §4 + doc 04 §6 retained constraints, both surviving):**

- **One active tint** per card: `--daura-tint: color-mix(in srgb, var(--halo-a) 55%, var(--silver));` (doc 04's exact recipe: 55% halo into `--silver` = `#c8c4bb`, `styles.css` grep `--silver:`). This warms/cools the mark toward the source without letting a saturated hue dominate a black field.
- **Base strokes** = `var(--line-strong)` (`styles.css` grep `--line-strong: rgba(233,229,220,0.2)`), the repo's established faint architectural line. The tint is the *one* accent; the structure is house line.
- **Residue fill** at **8–12% opacity** (doc 04 §6) — the warm bleed / smear body / seam glow lives here, never above 12% or it stops reading as afterimage and starts reading as a lit shape.
- **Black is the field of disappearance**, not a background swatch (S2 §4). The mark emerges from black; black is not painted behind it.
- **Warm→black with one cold edge** is the natural afterimage physics (S2 §4: many warm inducers collapse into a narrow purple zone, not a full spectrum). The cold exit edge may lean toward `--halo-b` where the source's `halo.b` is a cool violet (`#8b7bff` on SRC-01/03/05) — but as a *thin edge only*, never a second fill.
- **No rainbow, no multi-hue gradient, no heatmap scale** — banned outright (S2 §4/§5, doc 04 §6, ground truth #6). This is also an accessibility rule: rainbow scales distort perceived difference and fail contrast reasoning (two justifications, one rule — S2 flagged the convergence).
- **Warm-silver archive palette** is the neutral home when a source's tint would be too loud; the tint modulates *within* that palette, never replaces it.

---

## 4. THE metTier BAND × RESIDUE MARK COEXISTENCE RULE (house grammar, not a gauge cluster)

The mission's sharpest risk: the ordinal band + the residue mark together start reading as an *instrument panel*. Ruling:

**The band is house grammar; the mark is the verdict. They occupy different registers and must never be co-weighted as two readouts.**

Repo mechanism (this is real, cite it): `metTier(name, tier, mat)` in `app.js` renders a label + a **5-segment meter** (`met-tier__seg` × 5), filled up to `MET_TIER_FILL[tier]` segments, each filled segment painted `metRgba(mat, 0.85)` — i.e. **the same `halo.a` material tint**. The public ladder is `["Muted","Clean","Strong","Charged","Peak"]` (`app.js` grep `LADDER` and `FP_TIER_LADDER`; the private 0-100 cutoffs live in the `styles.css` comment grep `<25 Muted` but **never render publicly** — ground truth: never a 0-100).

**Coexistence rules:**

1. **ONE band on the Aura plate, not three.** Metrics already renders *three* metTier bands per plate (`met-bands` wrapping Drift/Clarity/Depth and Legibility/Charge/Containment — `app.js` grep `met-bands`). Aura must render **exactly one** band (the single ordinal rank of the relation's charge). Three bands = a gauge cluster = a second Metrics. One band = a house-grammar tick that says "how charged" and stops.

2. **The band derives from existing data, not a new score.** Use the source's authored charge tier — `event.charge` (`data.js`: SRC-01 `"Charged"`, SRC-02 `"Clean"`, SRC-03 `"Strong"`, SRC-04 `"Peak"`, SRC-05 `"Charged"`) or `signature.band`. No new number, no `aura`-specific 0-100. This satisfies ground truth #3's "ordinal band on the existing metTier ladder."

3. **The band is visually subordinate to the mark.** The residue mark is the 80% (§2). The band is a thin single row — same `met-tier` treatment the rest of the house uses, so it reads as *the house's tick mark*, not as *Aura's instrument*. If the band ever grows a second row, a percentage, an axis, or a companion gauge, it has crossed into instrument-panel territory and must be pulled back.

4. **The band reuses `--halo-a`, so it belongs to the same tint family as the mark** — one material, expressed once as a mark and once as a tick. This is what makes them read as *one card* rather than *two instruments*: a single color story, not a dashboard of independently-colored gauges.

5. **A legitimate null read must be possible.** Ground truth #3 condition (b): at least one authored null-relation sample so the band can read null (Muted / empty segments). The band's null state = 0–1 filled segments + a null kind-word; the mark's null state = a nearly-flat, nearly-centered line (the failure-looking centered line is *correct* when the relation genuinely has no bias). Null must be a designed state, not an accident.

---

## 5. RED-LINE ANTI-PATTERNS (hard no's — S2 §5 + doc 04 §6, both surviving)

Any of these means the visual has become a Diagram/instrument and has failed, *even if elegant*:

- **Contour rings, topographic fills, labeled elevation** — reads as field explanation (Diagram's job). *(This is the killed doc-04 Field Map; ground truth #4.)*
- **Directional vectors, streamlines, particle flow, arrow grids** — reads as causal mechanics ("how force moved"), not residue.
- **Heatmaps + rainbow gradients** — imply repeated measurement; distort perception; fail accessibility. Banned, not discouraged.
- **Chakra glows, sparkles, mystical halos, "energy-scanner" UI** — gadget theater; credibility killer. (Note MEMORY: the repo already killed sparkles/twinkle/rainbow-palette; do not reintroduce them here.)
- **Thermal/infrared instrument cues** — borrow the *logic* of invisible residue only, never the instrument (no readouts, scanner frames, crosshairs).
- **A second, third, or companion band; any 0-100; any tick beyond the one ordinal band** — that is a gauge cluster (§4).
- **`nth-of-type()` / positional selectors** — semantic classes only, `.dplate--aura` / `.daura__*` (ground truth #6, doc 04 §6). The residue SVG must be addressable by class, not position.
- **Type-as-hero (type-burn) in pass 1** — steals Oracle's verdict (§1, §2, ground truth #7).
- **Re-narrating a single-element read** — if the mark or line restates palette %, finish notes (Surface), a metrics score, or `field.weight` verbatim, it is a single-element reader, not a relation. Aura renders the *conjunction*, never one pole alone (critical for SRC-04/05, see below).

---

## 6. PER-SOURCE VISUAL ASSIGNMENTS (SRC-01..05)

Each assignment states: the relation the frame stages (from `src.stance` + `field`, the provenance per ground truth #3 condition a), the relation-KIND (proposed frame-geometry noun, routed to O6/F1), the residue DIRECTION, the tension bias / seam / smear geometry pulled from repo `field.node`, the ordinal BAND (from `event.charge`), the single TINT (`halo.a`), and BUILD NOTES (SVG/CSS + reduced-motion + contrast). BR-S113 person-safety is enforced on every authored line: no worth/body/rank/identity, no attributed private feeling, no pathetic fallacy, no resolved-feeling clause, no named-emotion payload.

---

### SRC-01 · Driver — Warm Glass Copper

- **Relation (provenance = `src.stance`):** *"One arm holding the wheel's territory, the other raised flat to the lens — half stop-sign, half salute… neither departing nor stationary."* Two co-present cues in tension: the raised palm that stops the lens vs. the cabin warmth that keeps the frame human. Aura chips: `["Idle-Engine","Open-Palm","Northbound"]`.
- **Relation-KIND (proposed):** **Standoff** — a held-apart two-pole balance (the palm holds you off; the interior holds you in). *(Retire doc 04's "Warm Refusal" verbatim label per ground truth #3 vocab-constraint; keep its two-term content.)*
- **DIRECTION:** **Ghost smear** (alternate — retained passing gesture). The residue here is the palm-and-warmth *drag* that stays in vision after the hand leaves; that is retained motion, not a static frontier.
  - *Note the tension between S2's worked read (smear) and my §0 default:* SRC-01 could also read as Standoff → tension line. **I hold smear here** because the authored truth is the warmth *dragging then cooling* (S2 SRC-01 read; `field.balance:"Lean right"` toward the palm), which is a retained gesture. The Standoff *names* it (band text); the smear *renders* it (eye). This is exactly the render-layer-not-lookup ruling from §0.
- **BIAS geometry (from `field.node {x:0.42, y:-0.34}`, `balance:"Lean right"`, `weight:"Upper right — toward the raised palm"`):** the warm smear biases up-and-right toward the palm; the cool exit rim sits vertical at the window/glass side (left-of-center).
- **BAND:** `event.charge = "Charged"` → 4/5 segments.
- **TINT:** `--halo-a: #c98a5e` (copper) → `color-mix(... 55%, --silver)`; cold exit edge may lean toward `halo.b #8b7bff` as a thin rim only.
- **Authored-line register (human writes final; this is a safe *shape*):** *"The hand leaves first; the warmth drags after it, then cools at the glass."* — subject is hand/warmth/edge (image-properties + allowed gesture-intent), no named emotion. **BR-S113 PASS.**
- **BUILD:** `<svg class="daura__mark" role="img" aria-labelledby="daura-01-sum">` (accessible name = left-column summary, doc 04 §10). One `<path>` warm drag, `fill:var(--daura-tint); opacity:.10`, blurred via `stdDeviation` on a single `<feGaussianBlur>` (one drag only — cap the layering). One thin `<line>`/`<rect>` cool rim at ~40% width. Reduced-motion: **no smear-in animation**; render the drag in final state at first paint (`@media (prefers-reduced-motion: reduce)` freezes it). Contrast: mark is decorative-residue but its *edge* stroke must clear **3:1** against black; the authored line and band label clear **4.5:1** (use `--silver-bright` for text, already AA per `styles.css` comment).

---

### SRC-02 · Ice Field — Cold Prism Frost

- **Relation (provenance = `src.stance`):** *"Crouched at full commitment, both gloves stacked on the brace… Nothing performed — the auger doesn't care, and the frame doesn't pretend otherwise."* The relation is the drilled opening vs. the stillness that closes around it — a **threshold**, one frontier, not two poles. Aura chips: `["Auger-Braced","Sun-Struck","Low-Horizon"]`.
- **Relation-KIND (proposed):** **Edge** — a single frontier where a cut meets the field that holds around it. *(Not "Low Horizon" as a mood; the geometry noun is the cut/edge.)*
- **DIRECTION:** **One-seam burn** (alternate — genuine threshold). One drilled seam/puncture line; warm residue nearly absent (cold source); cold edge crisp and narrow. This is the premium reading and SRC-02 earns it (a real puncture in a flat field).
- **SEAM geometry (from `field.node {x:0.04, y:0.30}`, `balance:"Centred"`, `weight:"Lower centre — down into the crouch and the ice"`):** the seam sits low-center and runs vertical (down into the ice); minimal warm bleed; one pale cold edge.
- **BAND:** `event.charge = "Clean"` → 2/5 segments. *(Note: this is the quietest band of the five — correct. SRC-02's charge is Clean, not Charged; the band must reflect that and not be inflated to match a "dramatic seam." The seam is visually strong; the charge is honestly low. This mismatch is the system working, not failing.)*
- **TINT:** `--halo-a: #5fd4e0` (cyan) → `color-mix(... 55%, --silver)`. Cold source ⇒ the "warm bleed" is near-absent by design; the seam is essentially a cold pale line on black.
- **Authored-line register — FIX REQUIRED:** S2 SRC-02's worked read *"the lake holding its breath"* is a **BR-S113 FAIL** (pathetic fallacy, on the kill-list, flagged in the mission brief itself). Safe rewrite shape: *"The cut is over. What stays is one dark seam, one pale edge, the field gone still."* — subject is cut/seam/edge/field-as-geometry; "gone still" describes the image, not an attributed interior. **The isolated four-word clause dies; the seam build and the rest of the line survive.**
- **BUILD:** One near-vertical `<line>` or thin `<path>` low-center, `stroke:var(--daura-tint)`, ~2px, with a 1px cold `stroke` sibling offset to one side for the pale edge. Warm-bleed `<rect>` at `opacity:.06` (near-absent). Reduced-motion: no draw-on; seam present at first paint. Contrast: seam stroke ≥ **3:1** on black (cyan on black clears this comfortably); text **4.5:1**.

---

### SRC-03 · Shore — Cold Tide Steel

- **Relation (provenance = `src.stance`):** *"Transverse hold, catch presented perpendicular to the camera axis. The frame stays a field document — the shore does the staging, the catch states the terms."* Two poles: the land that holds vs. the open water that pulls — a biased balance leaning toward release. Aura chips: `["Lateral","Dispatched","Shore-Filed"]`.
- **Relation-KIND (proposed):** **Standoff** (or **Figure-Ground** — catch-as-figure against shore/fjord-as-ground). Two poles, real bias. *(Retire any "biased surrender" phrasing — that verges on the subject's interior; keep the geometry.)*
- **DIRECTION:** **Off-center tension line — DEFAULT.** This is the archetypal default case: two genuine poles (shore/hold vs. water/pull) and a real bias. S2 SRC-03 assigns tension line and it is exactly right; SRC-03 is the reference implementation of the default.
- **BIAS geometry (from `field.node {x:0.04, y:0.12}`, `balance:"Centred"`, and `field.weight:"Centre — the catch holds both lateral edges"`):** the two anchors sit lateral (left = land, right = open water, matching the `"Lateral"` chip and transverse hold); the filament resolves slightly toward the water/release side. *Caution:* `field.balance` is authored `"Centred"` here — so the bias is **subtle**, not dramatic. Render a *slight* off-center resolution, not a hard lean. A near-centered-but-not-quite line is the honest read; do not exaggerate it into a strong lean.
- **BAND:** `event.charge = "Strong"` → 3/5 segments.
- **TINT:** `--halo-a: #6fb3e0` (steel-blue) → `color-mix(... 55%, --silver)`.
- **Authored-line register (safe shape):** *"Land on one side, open water on the other; the mark settles closer to the water."* — pure geometry (hold/give, settle-toward), no interior claim, no named emotion. **BR-S113 PASS.** *(Tighten S2's "the shore does not decide cleanly" — "decide" mildly personifies; the geometry verb "holds/settles" is cleaner. S2 already flagged this as the closest-to-the-line of its five reads.)*
- **BUILD:** Two ≤3px anchor dots (`fill:var(--line-strong)`) at left and right of center; one `<path>` filament between them, curvature/brightness biased slightly toward the right anchor; `stroke:var(--daura-tint)`. **No ticks, no arrows, no legend** (S2 §2). Reduced-motion: filament present at first paint; if motion on, a ≤400ms settle from centered to biased is permissible but never a looping oscillation. Contrast: filament ≥ **3:1**; anchors are decorative (`aria-hidden`), the accessible name carries the read; text **4.5:1**.

---

### SRC-04 · Run — Field Green Glass

- **Relation (provenance = `src.stance`):** *"Mid-stride foreground break, lens-direct approach, four limbs extended at peak. The path wedge and grass-bank enclosure hold the action in a corridor."* The relation is the forward vector (the approaching body) vs. the corridor/void it moves into — motion trailing into space. Aura chips: `["Approach","Channel","Diffuse"]`.
- **Relation-KIND (proposed):** **Vector-into-Void** — a directed motion trailing into the depth-channel. *(This is the schema kind-word doing exactly its job; it maps cleanly.)*
- **DIRECTION:** **Ghost smear** (alternate — retained motion, the Vector-into-Void render). One forward-leaning warm drag fading hard into black; cool clearing edge at the **front** (the direction of approach), not behind.
  - **CRITICAL — Comp-Field overlap warning (ground truth #3 known risk):** SRC-04's `field` block is loud (`node:{x:0.04,y:-0.12}`, `weight:"Upper centre — foreground mass arriving into the lens"`, `depth:"Peak"`, `signature.class:"Channel — deep and front-loaded"`). Aura must render the **conjunction** (the body-vector *meeting* the void it enters), **NOT re-narrate `field.weight`**. If the smear just restates "foreground mass arriving," it has become a second Metrics/Comp-Field reader. The smear's content is the *residue of the vector after the body exits frame* — what's left, not what's arriving. Keep the drag reading as *afterimage of motion*, never as a live composition arrow.
- **SMEAR geometry (from `field.node {x:0.04, y:-0.12}`, forward/approach vector):** the warm drag leans forward toward the lens/front; the cool exit rim is at the leading edge (front), matching S2 SRC-04 ("cool clearing edge at the front, not behind").
- **BAND:** `event.charge = "Peak"` → 5/5 segments (the most charged of the five — correct; SRC-04 is the peak-charge source).
- **TINT:** `--halo-a: #7fc8a0` (cool green) → `color-mix(... 55%, --silver)`.
- **Authored-line register (safe shape):** *"The body is gone from frame before the effort is; the heat keeps its shape a moment, then thins into a cold clear ahead."* — "the body" = frame-element that exits (not an identity/health claim); "heat keeps its shape" = image-property. **BR-S113 PASS** (S2 confirmed this read clean).
- **BUILD:** One forward-leaning `<path>` drag, `fill:var(--daura-tint); opacity:.10`, single `<feGaussianBlur>`, decaying hard into black; one thin cool `<rect>`/`<line>` rim at the leading edge. **One drag, one rim — do not stack exposure bands** (S2 §2 risk cap). Reduced-motion: **no motion-blur animation and no drift** — the drag is a static afterimage at first paint (a moving smear would read as a live vector, re-triggering the Comp-Field overlap). Contrast: rim edge ≥ **3:1**; text **4.5:1**.

---

### SRC-05 · Tank — Tank Glass Teal

- **Relation (provenance = `src.stance`):** *"Vertical cradle, specimen face-forward, antennae extended upper-left. The frame organizes around the held armature, lifted into house light."* + `signature.note:"the carapace locks the axial centre and holds it; the antennae release upward-left as the one asymmetric extension."* The relation is a dense held center vs. the one seam/point where it *almost gives* (the asymmetric antenna release, the containment edge). Aura chips: `["Carapace","Fluorescent","Cyan-Tank"]`.
- **Relation-KIND (proposed):** **Edge** — the containment frontier of a held mass; or **Light-Fit** (fluorescent house light meeting the shell/tank surface). Two candidate kind-words; **route the choice to O6/F1.** *(Comp-Field overlap risk here specifically: read the illuminant-×-surface *conjunction* per ground truth #3, never re-narrate `field.weight:"Near centre — pulled slightly down by the tank-blue band"`.)*
- **DIRECTION:** **One-seam burn** (alternate — threshold/containment). S2 SRC-05 offers type-burn OR one-seam burn; **O5 selects one-seam burn and benches type-burn** per §1/§2/ground truth #7 (SRC-05's "HELD PRESSURE" is exactly the kind of unforgettable phrase that would steal Oracle's climax — that is precisely why it must NOT be type-burnt here). Render: a dense dark mass with one stressed seam where it almost gives.
- **SEAM geometry (from `field.node {x:-0.08, y:0.14}`, `signature`: antennae release upper-left, tank band grounds the base):** the containment seam sits off-center — the stressed frontier reads upper-left (following the one asymmetric extension), while the mass holds center; slight downward pull from the tank band.
- **BAND:** `event.charge = "Charged"` → 4/5 segments.
- **TINT:** `--halo-a: #36b6c8` (saturated teal — the most saturated of the five). **Discipline note:** at 55% into `--silver` this stays controlled; do NOT let the saturated teal tempt a full-bleed teal fill — the seam is one accent line, the field stays black (§3).
- **Authored-line register (safe shape):** *"Not impact — containment. A dense held center, and one seam where it almost gives."* — no human subject in the line at all (safest of the five by construction, S2 confirmed). **BR-S113 PASS.**
- **BUILD:** A dark `<path>` mass (fill near-black, `opacity` low), with one bright stressed `<path>` seam upper-left, `stroke:var(--daura-tint)`; slight warm/cool bleed ≤ **12%** on one side of the seam. **No type-burn, no "HELD PRESSURE" as hero type.** Reduced-motion: seam static at first paint. Contrast: seam stroke ≥ **3:1** (teal on black clears easily); text **4.5:1**.

---

### Per-source summary table

| Src | Relation (2 poles) | Kind-word (proposed→O6/F1) | Direction | Bias/geometry source | Band (`event.charge`) | Tint (`halo.a`) |
|---|---|---|---|---|---|---|
| 01 Driver | palm-stop × cabin-warmth | Standoff | Ghost smear | `node{0.42,-0.34}` up-right, cool rim left | Charged (4/5) | `#c98a5e` |
| 02 Ice Field | cut × field-stillness | Edge | One-seam burn | `node{0.04,0.30}` low-center vertical | Clean (2/5) | `#5fd4e0` |
| 03 Shore | land-hold × water-pull | Standoff / Figure-Ground | **Tension line (default)** | `node{0.04,0.12}` lateral, slight right bias | Strong (3/5) | `#6fb3e0` |
| 04 Run | body-vector × corridor-void | Vector-into-Void | Ghost smear | `node{0.04,-0.12}` forward, rim front | Peak (5/5) | `#7fc8a0` |
| 05 Tank | held-mass × containment-seam | Edge / Light-Fit | One-seam burn | `node{-0.08,0.14}` seam upper-left | Charged (4/5) | `#36b6c8` |

*(One default tension line, two smears, two seams — a deliberate spread that proves the residue system reads differently per source. If any two could swap without feeling wrong, the system is too generic — doc 04 §11 source-fidelity / swap-test. This spread passes: SRC-03's biased-balance, SRC-04's forward-void, and SRC-02's cold puncture are visually and semantically distinct.)*

---

## 7. SHARED BUILD SCAFFOLD (semantic, accessible, motion-safe)

- **Classes (ground truth #6, doc 04 §6):** `.dplate--aura` on the plate; `.daura__mark` (SVG), `.daura__band` (the one metTier row), `.daura__line` (authored witness text), `.daura__kind` (kind-word). **Never `nth-of-type()`.**
- **Tint plumbing:** reuse the existing `--halo-a` custom property already injected by the renderer (`app.js` grep `--halo-a:${esc(src.halo.a)}`); derive `--daura-tint: color-mix(in srgb, var(--halo-a) 55%, var(--silver))`. No new color pipeline.
- **SVG:** inline (doc 04 §6 — crisp scaling, text-addressable, single export path). `role="img"` + `aria-labelledby` pointing at the left-column authored summary (doc 04 §10). Decorative sub-parts (anchor dots, bleed rects) `aria-hidden="true"`.
- **Contrast (ground truth #6, doc 04 §10):** graphical strokes/edges ≥ **3:1** on black; text ≥ **4.5:1** (`--silver-bright` for the line, already AA per `styles.css` grep `chip text… all three chips clear AA`). **Tint is never the only channel** — the mark's shape carries the read even in grayscale.
- **Reduced motion (ground truth #6, doc 04 §10):** `@media (prefers-reduced-motion: reduce)` freezes the final state at first paint. No looping, no oscillating tension line, no animated smear drift (the SRC-04 case: motion would re-trigger Comp-Field overlap). Any motion-on settle is ≤600ms, one-shot, mark→band→line ordering (§2), never reversing the handoff.
- **The 80/20 in DOM/visual weight:** mark is the dominant element; band is a single thin row; the authored line is a subordinate witness beneath. Type never leads.

---

## CONFLICTS (for O6/F1 — flagged, not resolved)

1. **Four-directions ↔ five-kind-words is an open mapping (S2 CONFLICT #2, unresolved upstream).** I propose it as a **render-layer, not a fixed lookup** (§0): direction chosen by relation-*shape* (biased-balance→tension / threshold→seam / retained-motion→smear); kind-word names the relation for the band text. My default mapping (Standoff→line, Edge/Light-Fit→seam, Vector-into-Void→smear, Figure-Ground→line) is a **proposal**, overridable per-source. O6/F1 owns the final lock. This is the one genuinely open axis in my scope.

2. **Kind-word vocabulary re-casting (S4 CONFLICT #3).** doc 04's labels (Warm Refusal, Quiet Labour, Cold Exit, Held Field) are relation-shaped but NOT frame-geometry nouns. My per-source proposals recast them (Warm Refusal→Standoff, Quiet Labour→Edge, etc.) into the ground-truth #3 geometry set. Whether the geometry set is a fixed enum or a category header with doc 04's labels as sub-instances is O6/F1's call.

3. **Type-burn: benched vs. banned.** S2 §2 and S4 §8 keep type-burn in the taxonomy; I **bench it for pass 1** (do not ship, do not assign to any source) rather than delete it, to keep the direction-set complete while honoring ground truth #7. If a later pass wants type-burn, it must first prove Oracle still has somewhere richer to go. Flagging so no one reads "benched" as "deleted."

4. **Plate-size (S4 CONFLICT #1) is upstream of me but constrains my visual.** My builds assume the **thin capstone**, not doc 04's 320px two-column plate with a 16/10 photo-aspect visual frame. If O6/F1 rules the plate stays medium-density, the residue mark scales up but the *discipline* (one mark, one band, one line, one tint, black field) holds unchanged. My visual direction is size-agnostic in principle; the specific "subordinate witness, 80/20" weighting assumes capstone scale.

5. **SRC-02 authored-line defect carries into any illustrative quoting (S2 CONFLICT #3).** *"the lake holding its breath"* is a BR-S113 FAIL. If any synthesis doc quotes the SRC-02 worked read, it must quote the corrected line (§6 SRC-02), never the original as a clean model. The seam *build* is clean; only the authored clause dies.

6. **No new repo-vs-research conflict introduced by O5.** Doc 02's residue directions, the anti-patterns, and the "seen first, then named" handoff all reinforce ground truths #4/#6/#7 (S2 CONFLICT #1 confirmed this clean alignment). O5 adds a *default ruling* on top of that clean base; it does not disturb it.

---

## KEY REPO ANCHORS (re-grep; line numbers drift)

- `data.js` — grep `aura:` (5 chip arrays SRC-01..05); grep `halo:` (per-source `a/b/c` tints + `material`); grep `field:` / `node:` (`field.node {x,y}`, `balance`, `weight` — the tension-bias evidence); grep `event:` (`charge` tier per source); grep `signature:` (`band`, `class`, `note`); grep `stance:` (relation provenance per ground truth #3).
- `app.js` — grep `function metTier` (5-segment ordinal band, `MET_TIER_FILL`, `metRgba(mat,...)`); grep `LADDER` / `FP_TIER_LADDER` (`["Muted","Clean","Strong","Charged","Peak"]`); grep `met-bands` (Metrics renders 3 bands — Aura must render 1); grep `--halo-a:` and `setProperty("--halo-a"` (existing tint injection to reuse); grep `BR-S115` (current Aura reserved-stub decision); grep `dplate("03", "Aura"` (stub body).
- `styles.css` — grep `--halo-a`, `--line-strong` (`rgba(233,229,220,0.2)`), `--silver` (`#c8c4bb`), `color-mix` (existing usage pattern); grep `<25 Muted` (private 0-100 cutoffs, never rendered publicly); grep `chips clear AA` (established text-contrast note).
- `reveal/reading-panel.js` — grep `warm glass copper` (current decorative Aura placeholder capsule — lower priority per doc 04 file-change table).
- **Absent:** `1783253951358_image.png` (dossier screenshot) not found in repo or Downloads — noted, not a blocker.