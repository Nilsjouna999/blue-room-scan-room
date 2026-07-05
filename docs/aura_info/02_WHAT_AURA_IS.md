# O2 — DUPLICATION & BOUNDARY JUDGE

Verdict scope: for every proposed Aura element I rule whether an already-shipped instrument OWNS it, then state the single thing Aura and ONLY Aura may do, consistent with the Subtraction Gate (the two-term relation rank). All repo claims re-verified by reading this session; anchors are grep-able strings, not line numbers.

---

## 0. The shipped instruments Aura must not duplicate — verified ownership (the field of claimants)

Re-read `app.js` this session. The live surfaces that could collide with Aura, and exactly what each one already OWNS:

| Instrument | Where it lives | Fuel / lens (per BR-S107 §2) | What it OWNS — verified | grep anchor |
|---|---|---|---|---|
| **Diagram** (`renderDiagramTab`) | tab | A · OPTICS & GEOMETRY (visual) | Geometry-as-image: rule-of-thirds, mass box, focal lock, gesture/posture polyline, frame axis, **signal-direction arrow**, light ray-fan. Plus **Frame Read** `analysis[]` pips (`DERIVED`) and **Overlay Markings** (`ON SHEET`). | `function renderDiagramTab`; `dnotes__lab">Frame Read`; `dg dg--arrow` |
| **Metrics** — 4 plates (`renderMetricsTab`) | tab | A · OPTICS & GEOMETRY (numeric) | (01) **Frame Signature** = the gestalt silhouette + `signature.class`/`band`; (02) **Signal Mix** = the one plate that keeps %; (03) **Composition Field** = drift node + `field.weight`/`balance` + Drift/Clarity/Depth tier bands; (04) **Frame Event** = `event.label` + Legibility/Charge/Containment tier bands + "Filed as {archetype} — {sceneRole}". | `function renderMetricsTab`; `"Composition Field"`; `"Frame Event"`; `met-event__filed` |
| **Surface Record** (dossier 01) | dossier plate | C · LIGHT/COLOR/SURFACE | Per-surface annotated palette (bead + label + share + proof-noun), the "in bath / unfixed" material read. | `dplate("01", "Surface Record"`; `renderSurfaceRecord` |
| **Archetype** (dossier 02) | dossier plate | E · ESSENCE (**empty stub**) | Nothing rendered — reserved stub. The **Card tag** carries the live archetype ("a photo role, not a person type"). | `Archetype read — reserved`; `titleblock__archetype` |
| **Mint Record** (dossier 04) | dossier plate | F · FINISH & MINT | The record of the card object: developed-from, triggers, material, mint serial, mint note, seal. | `dplate("04", "Mint Record"` |
| **Oracle Read** (dossier 05) | dossier plate | E · ESSENCE (**the verdict**) | The ONE spoken verdict, sealed behind a free tap-to-develop reveal; centered/large/alone. | `dplate("05", "Oracle Read"`; `dplate--oracle` |
| **stance-as-haloRead** | authored in `data.js`, surfaced as prose in reads | E · ESSENCE (relation-in-prose) | `src.stance` NARRATES the two-term relation per source — SRC-01 "neither departing nor stationary"; SRC-02 "Nothing performed… the frame doesn't pretend otherwise". **This is Aura's provenance, not a competitor.** | `stance:` (data.js, all 5 sources verified) |

**Two latent fields confirmed NOT rendered anywhere live** (grep in `app.js` returns *no matches*): `src.sceneCharge.label` ("Idling"/"Contained"/"Filed"/"Closing"/"Selecting") and `src.reads.charge`. This is load-bearing for the ruling below — **an Aura band does not compete with any rendered one-word charge label, because none ships.** `sceneCharge.label` is single-element charge ore, not a shipped instrument; it is a *candidate INPUT* to the band, not a claimant against it.

**BR-S107 §2 lens table settles the top-level boundary** (`docs/BR-S107_SECTION_ARCHITECTURE_SPEC.md`, grep `E · ESSENCE`): Lens E — *"the synthesis across A–D — the kind, the placement, the verdict, the wit"* — has exactly three prose homes: **Card tag (teaser) · Fit+Aura (placement) · Oracle (verdict)**. This is the repo's own prior statement of the Subtraction Gate: Aura's seat is the **placement/kind** slot of the synthesis lens — between the teaser (Card tag) and the verdict (Oracle). Every other lens (A geometry, C surface, F mint) is owned elsewhere and Aura may not re-read it.

---

## THE BOUNDARY TABLE — every proposed Aura element, ruled

Legend: **AURA-ONLY** (no shipped instrument owns it; Aura may ship it) · **OWNED** (a shipped instrument owns it; Aura may NOT) · **INPUT-ONLY** (existing data Aura reads *from* but must not re-render).

| # | Proposed Aura element | Ruling | Who owns it / why | Enforcement note |
|---|---|---|---|---|
| 1 | **Ordinal band on the metTier ladder** (Muted/Clean/Strong/Charged/Peak) | **AURA-ONLY** *(with one hard constraint)* | The ladder itself (`tierBand()`, grep `Public tier ladder`) is shared infrastructure — Metrics already renders **per-lens** tier bands (Drift/Clarity/Depth in Composition Field; Legibility/Charge/Containment in Frame Event; Reach in Signature). None of those rank the **relation between two co-present elements** — they rank single geometric properties. Aura's band ranks *the relation itself*. That ordinal-of-the-relation is unowned. | The band must be labeled as the **relation's** strength, never re-tier a property Metrics already banded. Reuse `metTier()`/`tierBand`; do NOT invent a parallel ladder. |
| 2 | **Relation-KIND word** — frame-geometry noun (Standoff / Edge / Figure-Ground / Light-Fit / Vector-into-Void) | **AURA-ONLY** | No instrument names the *kind of relation the frame stages*. `signature.class` (Comet/Plateau/Crossbar/Channel/Lantern) names the **silhouette shape of one image**, not the two-term relation; `event.label` (Raised palm/Crouched brace/Shell lifted) names **one act**; `card.archetype` names a **photo role**. The relation-kind is a fourth, distinct noun. | Must be schema-constrained to frame-geometry nouns. Ban subject-intention phrasing — including SRC-01's own stance clause "neither departing nor stationary" (that prose is *provenance*, never the chip). |
| 3 | **One short verdict line** (6–14 words, is→reads-as, hardest word last) | **AURA-ONLY** *(guard against Oracle)* | The Oracle is the SPOKEN verdict; Aura is the last FELT beat (ground-truth #7). Aura's line names the *relation*; Oracle delivers the *judgment/wit*. Distinct jobs, distinct registers — but this is the single highest collision risk in the whole build. | Line must be relation-descriptive (what the frame stages between the two terms), NOT a closing verdict/punchline. If it could stand in for the Oracle, it's wrong. AUTHORED-FIRST (ground-truth #5) — no template generation. |
| 4 | **`aura[]` chips rendered verbatim as a tag row** (e.g. "Idle-Engine · Open-Palm · Northbound") | **OWNED — KILLED. Do NOT ship.** | This is the **exact form killed in BR-S109** (grep `ONE struck CLASS designation`): the 4-tag badge row (Class badge + 3 aura chips + placement line) read as *a second Source Record (filing)*. The general law (grep `a CODE reads as FILING`): **no section may render a code/call-number/serial-like address — filing owns codes.** A 3-chip row is that killed form AND the Subtraction Gate's named decay-to-Frame-Event risk. The `aura[]` arrays also carry the character-chip leak already cleaned once ("Slow-Burn"→"Auger-Braced", grep `character aura chips`). | **INPUT-ONLY.** `aura[]` is candidate raw material for the authored line, never a rendered element. Ruling (c) below settles this. |
| 5 | **Residue visual** (one-seam burn / ghost smear / off-center tension line) | **AURA-ONLY** | No instrument renders a felt residue mark. Diagram = literal annotated overlay; Metrics = silhouette glyph + drift-node diagram + tier meters. All are *maps/measures*, none is residue. Doc 04's literal Field Map (contour rings + vectors) is SUPERSEDED (ground-truth #4) precisely because it would ape Metrics' Composition Field diagram. | Must be residue, not map. Semantic CSS (`.daura__*`), honor prefers-reduced-motion + WCAG 3:1/4.5:1 (ground-truth #6). Must not reproduce Composition Field's drift-node diagram (that IS a map, and it's owned). |
| 6 | **Provenance pointing at `src.stance`** | **AURA-ONLY** *(it's the correct wiring, not a new field)* | `src.stance` already narrates the relation-in-prose per source (verified all 5). Aura distills it; it does not restate it. No instrument surfaces `stance` as prose today, so there's no duplication — Aura is where that buried sentence becomes scannable. | Gate condition (a): provenance = stance, NOT a redundant invented field. Do not author a new relation-prose field parallel to stance. |
| 7 | **`sceneCharge.label` as a one-word Aura charge** (Idling/Contained/…) | **INPUT-ONLY** | Not rendered anywhere live (verified: no `sceneCharge` match in app.js). It's single-element charge ore. Reading it verbatim would (i) resurrect a decorative single-word charge and (ii) echo Frame Event's `event.charge` tier. | May inform the band; must not ship as its own labeled Aura chip. |
| 8 | **Material / finish restatement** ("warm glass copper, held steady" — the dev `reveal` AURA module) | **OWNED — do NOT ship.** | **Finish/Surface owns material** (BR-S115/S117, grep `Finish is its own standalone module`; `FINISH_NOTE = {`). Surface Record (dossier 01) owns the palette. The dev `reveal/reading-panel.js` AURA is a single-element material read — the exact decay the Gate bans — and is DEV-ONLY placeholder (grep `mod("4", "AURA"`), not prior art. | Reconcile-or-ignore; never copy the dev module as the pattern. It reads one element (finish), not the relation. |
| 9 | **A separate `classLabel` field distinct from the relation-kind word** (doc 04's schema) | **OWNED-adjacent — COLLAPSE to ONE.** | See ruling (c) below. A "class designation" as a distinct struck plate is the BR-S109 type-specimen form (genus-species + variant) — that was scoped for the *now-killed* Fit+Aura plate. Shipping BOTH a classLabel AND a kind-word re-creates a mini tag-row. | The classLabel and the relation-kind word are ONE thing (ruling c). |
| 10 | **SRC-04 / SRC-05 relation read** (the Composition-Field overlap) | **AURA-ONLY** *(narrow lane only)* | See ruling (b) below. Metrics Composition Field owns `field.weight`/`balance`/drift for these sources. Aura may read only the CONJUNCTION (vector-x-plate / illuminant-x-surface), never re-narrate `field.weight`. | Read the two-term conjunction; if the line restates weight/balance, it's OWNED and must be cut. |
| 11 | **Archetype / "the kind" as Aura content** | **OWNED (Card tag) — do NOT ship.** | The Card tag carries the archetype ("a photo role, not a person type", grep `titleblock__archetype`). The dossier Archetype plate (02) is a reserved stub for a *separate* future archetype pass. Aura reads the *relation-kind* (geometry noun), which is categorically different from the *photo-role archetype*. | Keep Aura's kind-word a frame-geometry noun; never let it drift into naming the photo role/archetype. |
| 12 | **Right-panel Aura module** | **OWNED (killed) — do NOT ship.** | BR-S088 cut paid Aura Profile from the panel; BUILDER RULING: panel stays tight, dossier owns depth (grep `do NOT restore Stance to the panel`). | Aura belongs in the dossier plate (03) only. |
| 13 | **Named-emotion payload behind a hinge** ("lands as loneliness") | **BANNED (person-safety), not a duplication issue** | BR-S113 LOCKED + kill-list. Out of O2's boundary scope but noted so no element smuggles it. | Handled by the safety agents; O2 flags only that no proposed element carries it. |

---

## THE THREE EXPLICIT RULINGS THE MISSION DEMANDS

### (a) Rendering `aura[]` chips verbatim — the decay-to-Frame-Event risk

**RULING: KILL as a rendered element. KEEP as INPUT-ONLY raw material.** (Table #4.)

This is not a close call — it is doubly foreclosed by the repo:
1. **BR-S109 already killed the 3-chip aura tag-row** as "a second Source Record (filing)," and elevated the kill-shot to law: *a CODE reads as FILING* (grep `a CODE reads as FILING`). A verbatim `["Idle-Engine","Open-Palm","Northbound"]` chip row is that exact killed form.
2. The Subtraction Gate independently names it (decay-to-Frame-Event).
3. The `aura[]` strings themselves still carry the person-trait leak the repo cleaned once (grep `character aura chips`) — re-rendering them re-exposes it.

So `aura[]` is **candidate input to the authored verdict line** (alongside `stance`, `sceneCharge.label`, `event`/`field` labels), never a displayed chip. Doc 04's "chip row: 3 chips max" layout row is superseded. If the build wants a chip at all, it is at most the ONE relation-kind word (ruling c), rendered as a struck single designation — never a row of three.

### (b) The SRC-04 / SRC-05 Composition-Field overlap

**RULING: AURA-ONLY, but confined to the CONJUNCTION vector — never re-narrate `field.weight`.** (Table #10.)

Verified the collision surface directly in `data.js`:
- **SRC-04** (Closing Distance): `field.weight` = *"Upper centre — foreground mass arriving into the lens"*; stance = *"Mid-stride foreground break, lens-direct approach… The path wedge and grass-bank enclosure hold the action in a corridor."* Metrics Composition Field already OWNS "foreground mass arriving into the lens" as the drift-node read. Aura may read only the **two-term conjunction**: the *vector* (stride into lens) **against** the *plate* (the corridor enclosure) — the Vector-into-a-container relation. It must NOT restate "upper centre / arriving into lens" (that's `field.weight`, owned by Metrics).
- **SRC-05** (Spiny Encounter): `field.weight` = *"Near centre — pulled slightly down by the tank-blue band"*; stance = *"Vertical cradle… The frame organizes around the held armature, lifted into house light."* Aura reads the **illuminant × surface** conjunction — the held specimen lifted into a light *not designed for it* (a Light-Fit / mismatch relation, cued by the Oracle's own "light that was not designed for it"). It must NOT restate "near centre / pulled down by the tank-blue band" (owned by Composition Field) nor re-narrate the material (owned by Finish/Surface).

The clean test: **does the Aura line survive if you delete the Composition Field plate?** If the line only works as a caption to the drift diagram, it's re-narrating `field.weight` and is OWNED — cut it. If it names the *relation between two named terms* the drift diagram never states, it's Aura-only.

### (c) Is the classLabel and the relation-kind word ONE thing or two?

**RULING: ONE thing.** The relation-KIND word IS the classLabel. Do not ship both.

Reasoning grounded in repo law:
- Doc 04's `classLabel` ("Warm Refusal", "Quiet Labour") and the Subtraction Gate's relation-kind word (Standoff/Edge/Figure-Ground/Light-Fit/Vector-into-Void) are, per ground-truth #3's own convergence note, **the same two-term relation idea** — a contradiction-pair naming the kind of relation. Carrying both is redundant by construction.
- BR-S109 is decisive on the FORM: the section's job is *"the card's CHARACTER (singular identity), not a second filing slip"* and the winning form was **ONE struck designation** — *"singular over plural."* A `classLabel` + a separate kind-word + chips = plural = the losing tag-row form. Collapsing to one struck kind-word is what BR-S109 requires.
- However — critical constraint the merge inherits — BR-S109's own class designations were **genus-species + variant** ("A Gesture-Class Hold, Northbound Variant"). The Subtraction Gate REJECTS that vocabulary and constrains the single word to **frame-geometry nouns** at the schema. So: keep BR-S109's *singularity* (one struck designation), replace its *taxonomy* (genus-species) with the Gate's *frame-geometry noun*. One word, geometry-constrained.

Net: the shipped Aura carries **one relation-kind word** (which is the classLabel, renamed and geometry-constrained) + **one ordinal band** + **one authored line**, provenance→`src.stance`. Doc 04's separate `classLabel` field and its `chips[]` field both collapse into this one word (or move to internal-derivation-only). Doc 04's `safety.*` boolean flags survive as internal QA fields; its x/y anchor coords die with the map.

---

## WHAT AURA — AND ONLY AURA — MAY DO

> **Aura ranks and names the RELATION the frame stages between its two co-present terms — the one ordinal band (on the shared Muted→Peak ladder) plus the one frame-geometry kind-word that turn `src.stance`'s buried relation-sentence into a scannable band, closed by one authored line and one residue mark. Every shipped instrument reads a single element; Aura is the only one that reads the tension BETWEEN two.**

This is the whole license, and it is bounded on all six sides by owned territory:
- **Not Diagram** — Diagram maps geometry as annotated overlay + the Frame Read/Overlay pips; Aura draws no map and renders no pip (residue ≠ overlay).
- **Not Metrics** — Metrics banes single properties per plate (Drift, Clarity, Depth, Legibility, Charge, Containment, Reach) and diagrams the drift node; Aura banes the *relation*, not a property, and reads the SRC-04/05 conjunction without re-narrating `field.weight`.
- **Not Surface/Finish** — those own material/palette; Aura never restates finish (kills the dev `reveal` module's lane).
- **Not Archetype/Card tag** — those own the photo-role; Aura's kind-word is a geometry noun, not a role.
- **Not a second Source Record** — no chip-row, no code, no filing address (BR-S109 law); at most ONE struck kind-word.
- **Not Oracle** — Oracle SPEAKS the verdict; Aura is the last FELT beat, naming the relation the Oracle then judges. Aura builds toward Oracle, never competes.

Position in the synthesis lens (BR-S107 §2, Lens E): Aura is the **placement/kind** seat — between Card tag (teaser) and Oracle (verdict) — exactly the slot the killed "Fit+Aura" occupied, now rebuilt as a THIN capstone instead of a struck genus-species plate.

---

## CONFLICTS (for O6/F1 — do NOT resolve alone)

1. **BR-S109's `classLabel` taxonomy (genus-species + variant) vs. the Subtraction Gate's frame-geometry-noun vocabulary.** My ruling (c) merges the two by keeping BR-S109's *singular struck form* but replacing its *taxonomy*. This is a reconciliation, not a clean repo win — flag that BR-S109's actual worked example ("A Gesture-Class Hold, Northbound Variant") is NOT the shippable vocabulary; the Gate's geometry nouns override the taxonomy while BR-S109's singularity/no-code law still binds. O6/F1 to confirm the merge rather than treat either as the sole authority.

2. **Doc 04's multi-field schema (classLabel + chips + anchors) vs. the ONE-word ruling (c).** Doc 04 predates both BR-S109's singularity law and the Gate. My ruling collapses classLabel + chips into one word; doc 04 ships them as separate rendered elements. Consistent with S6's conflict #4 and O1's read — flag doc 04 as architecture donor, not schema authority.

3. **Residue visual vs. Composition Field diagram (SRC-04/05).** The residue mark must not reproduce the drift-node diagram Metrics already renders for these sources. Doc 02's residue directions win for the mark; but on SRC-04/05 specifically the visual is one step from re-drawing the owned Composition Field. Flag: the residue for the two conjunction-sources needs an especially deliberate non-map form (off-center tension LINE between two poles, per doc 02 — not a node-in-a-box, which is Metrics').

4. **Enforcement gap (carried from O1, not resolvable by O2).** The "read the conjunction, never re-narrate `field.weight`" boundary and the "no verbatim `aura[]` chips" boundary are, like all the person-safety gates, *asserted not code-enforced* (grep `Enforcement gap`). O2 can rule the boundary; nothing in the repo will catch a violation at author time. Flag that the boundary table is a review instrument, not a validator.

## Repo facts downstream agents can now rely on (O2-verified this session)

- `src.sceneCharge.label` and `src.reads.charge` are authored in `data.js` but rendered by **nothing** in `app.js` (verified: zero matches). They are INPUT ore, not shipped surfaces — an Aura band does not compete with any live charge label.
- BR-S107 §2's lens table explicitly seats Aura in the ESSENCE/synthesis lens as the **placement/kind** home (between Card tag and Oracle) — the repo's own prior statement of the Subtraction Gate.
- Composition Field (Metrics 03) owns `field.weight`/`field.balance`/drift-node for ALL five sources incl. SRC-04/05 (verified `field:` blocks). Aura's SRC-04/05 lane is the conjunction only.
- BR-S109's kill (grep `ONE struck CLASS designation`) forecloses BOTH the verbatim `aura[]` chip-row AND any code/serial-like Aura address; the surviving allowed form is ONE struck singular designation.
- `src.stance` is present and narrates the two-term relation for all 5 sources — the correct provenance target; no parallel field should be invented.
