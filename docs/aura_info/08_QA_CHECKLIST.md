SPEAKER: S10 — REVIEWER QA SHEET
STATUS: read-only synthesis. No files edited, no commands mutated repo state.
SOURCES CONSUMED: S4 (normalized doc 04), O3 (person-safety gate), O2 (duplication/boundary judge), plus direct re-grep of `data.js`/`app.js`/`styles.css` this session for anchor freshness.

---

# S10 — AURA REVIEWER QA SHEET

**Purpose.** The literal form a human reviewer runs, line-by-line, against a drafted Aura element (band + kind-word + verdict line + residue mark) for a given source before it ships. Six sections, in enforcement order — a failure in an earlier section means later sections are moot for that line (kill and rewrite, don't patch downstream). Checkboxes are per-source; NULL = the one authored null-relation sample required by ground truth condition (b) (Subtraction Gate).

**How to read a row.** Each row is a single yes/no check. "PASS" = literal checkbox in the sheet. Where a row needs a worked example to be usable at all, one is inlined from the real five sources (verified live in `data.js` this session) — reviewers should replace with the actual drafted line under test, not reuse the example as a rubber stamp.

**Anchors used to build this form (re-grepped live, this session):**
- `data.js` — `stance:` (lines 269, 456, 589, 721, 854 — all 5 present, verified), `aura:` (lines 267, 454, 587, 719, 852 — all 5 present, verified), `sceneCharge: { label:` (lines 1080, 1110, 1141, 1170, 1200 — verified present, verified NOT rendered in `app.js`), `field:` (Composition Field weight/balance, all 5 sources).
- `app.js` — `function tierBand(v)` (line 61) and `function metTier(name, tier, mat)` (line 363) — the shared ladder infrastructure the Aura band MUST reuse, never fork.
- `styles.css` — `@media (prefers-reduced-motion: reduce)` precedent exists at 4 sites already (2042, 2102, 2139, 3580) — Aura's residue mark must add a 5th, not invent a new pattern.

---

## SECTION 1 — COPY SAFETY (per sentence; run FIRST, kill-on-fail, do not proceed to later sections for that sentence)

Run this on **every** candidate sentence in the drafted line (hinge clause, and Reach clause if present). Source: O3 Parts B–F, Steps 0–7.

| # | Check (per O3's ordered gate) | SRC-01 | SRC-02 | SRC-03 | SRC-04 | SRC-05 | NULL |
|---|---|---|---|---|---|---|---|
| 1.0 | **Provenance check** — line synthesizes `src.stance`, not an invented claim (does not free-associate past the stance/receipts) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 1.1 | **Zone tag assigned** — mark the sentence RECORD / READ / REACH / BAN (O3 Part B). Aura sentences must land READ (required) or READ+REACH (optional trailing clause only) | ☐ R | ☐ R | ☐ R | ☐ R | ☐ R | ☐ R |
| 1.2 | **Grammatical-subject test** — true subject is image/frame/gesture/crop/light/edge/hold/vector/hand/palm/silhouette, NEVER the person (he/she/they/his/her, or a body-part-as-will proxy: "his jaw," "her chin knows") | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 1.3 | **Swap test** — sentence still works with a different sitter/animal/specimen in the same pose/crop/light; does not collapse without THIS person's presumed inner life | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 1.4 | **Connotation-strip test** — remove the photo-noun; no stable person-trait remains ("the braced shoulders" → strip → "guarded person" = FAIL) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 1.5 | **Two-second test** (Reach clause only, N/A if no Reach clause present) — viewer could plausibly feel the named effect within 2 seconds, no biography/trust/empathy/moral judgment required | ☐ / N/A | ☐ / N/A | ☐ / N/A | ☐ / N/A | ☐ / N/A | ☐ / N/A |
| 1.6a | Kill-list: no named-emotion payload behind a bridge ("reads as loneliness," "lands as menace," "recoil of shame") | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 1.6b | Kill-list: no free-floating mood-word (haunting/evocative/moody/atmospheric/ethereal) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 1.6c | Kill-list: no pathetic fallacy — **banned flat, no optical-property carve-out** (F1 ruling; "the lake holding its breath" FAILS; safe pattern = residue verb on the optical fact: "the ice keeps the rest") | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 1.6d | Kill-list: no stacked-adjective pile ("raw, powerful, unforgettable") | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 1.6e | Kill-list: no color-psychology-as-fact (hue→feeling; saturation/brightness→arousal is the only shippable form) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 1.6f | Kill-list: no face-affect read (clenched jaw / tightened mouth / smile that doesn't reach the eyes) — use gaze-axis or head-turn instead | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 1.6g | Kill-list: no FORBIDDEN_TERMS collision — none of the 26 code-floor words used as prose (class/value/rank/worth/breed/beauty/race/gender/age/health/diagnosis/disorder/personality/iq/alpha/beta/skull/jaw/canthal/dimorphism/biology/genetic/attractiveness, etc.) even where a human read would pass | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 1.7 | **Hard grammatical floor** — no clause matches `PERSON_TRUTH` regex family even loosely: `you are`, `you're`, `your (personality|character|soul|worth|value|iq|future)` — this is DOA regardless of Conflict-1 resolution | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 1.8 | **Reach-clause legality** (if present) — short (one clause), late (after the hinge, never opens the line), cue-bound (traces to a specific visible thing in THIS frame), bodily/perceptual (a viewing event, not a feeling/relationship); viewer ≠ photographed person | ☐ / N/A | ☐ / N/A | ☐ / N/A | ☐ / N/A | ☐ / N/A | ☐ / N/A |
| 1.9 | **CONFLICT 1 flag check** — if a Reach clause is present at all, confirm it is marked CONTINGENT-PENDING-RATIFICATION (O6/F1 has not yet ruled on second-person); reviewer defaults to hinge-only if unratified | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

**Section 1 gate:** ANY unchecked box in rows 1.2–1.7 or 1.9 = **KILL the sentence, rewrite, restart at 1.0.** Do not hedge a failing payload with a softer bridge word — hedging a banned payload is itself the failure mode BR-S113 targets.

---

## SECTION 2 — BOUNDARY / NON-DUPLICATION (per O2's boundary table; run on the whole drafted element, not per-sentence)

| # | Check | SRC-01 | SRC-02 | SRC-03 | SRC-04 | SRC-05 | NULL |
|---|---|---|---|---|---|---|---|
| 2.1 | **Not-Diagram** — no annotated-overlay geometry restated (rule-of-thirds/mass-box/focal-lock/gesture-polyline/frame-axis/signal-arrow/light-ray-fan); no Frame Read pip or Overlay Marking duplicated | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 2.2 | **Not-Metrics** — does not re-tier a single geometric property already banded (Drift/Clarity/Depth in Composition Field; Legibility/Charge/Containment in Frame Event; Reach in Signature); does not restate `signature.class`/`event.label` | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 2.3 | **Not-Surface/Finish** — no palette %, finish notes, or material claims (kills the dev `reveal/reading-panel.js` "warm glass copper" pattern as prior art) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 2.4 | **Not-Archetype/Card-tag** — kind-word is a frame-geometry noun, not a photo-role/archetype word; does not drift toward `titleblock__archetype` territory | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 2.5 | **Not-Oracle** — the verdict line is relation-descriptive (what the frame stages BETWEEN two terms), not a closing punchline/judgment; if it could stand in for Oracle, it's wrong. Aura is the last FELT beat, Oracle the last SPOKEN beat | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 2.6 | **No chip-row / no second Source Record** — `aura[]` array (`Idle-Engine`/`Open-Palm`/`Northbound` etc.) is NOT rendered verbatim as a 3-tag row; used as input-only raw material, never displayed as a row (BR-S109 killed-form check) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 2.7 | **classLabel/kind-word collapse** — exactly ONE struck relation-kind word ships, not a separate classLabel field PLUS a separate kind-word PLUS chips (O2 ruling c: they are one thing) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 2.8 | **`sceneCharge.label` not surfaced** — the one-word charge (Idling/Contained/Filed/Closing/Selecting) may inform authoring but is not shipped as its own labeled Aura chip (it is unrendered input ore, verified zero matches in `app.js`) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 2.9 | **SRC-04/SRC-05 conjunction-not-vector check** (N/A for SRC-01/02/03/NULL unless the null sample is modeled on one of these) — line reads the CONJUNCTION (vector×plate for SRC-04; illuminant×surface for SRC-05), never re-narrates `field.weight`/`field.balance` verbatim. Clean test: does the line survive if Composition Field's plate is deleted? If it only works as a caption to the drift diagram, FAIL. | N/A | N/A | N/A | ☐ | ☐ | ☐ / N/A |
| 2.10 | **Right-panel exclusion** — no Aura content proposed for the compact/reveal right-panel (BR-S088 killed Aura Profile there); dossier plate (03) only | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 2.11 | **Provenance = stance, not a redundant field** — the element's authored line traces to `src.stance` (verified live at lines 269/456/589/721/854), not to a newly invented parallel relation-prose field | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

**Section 2 gate:** ANY unchecked box = **KILL and reroute to O2's ruling for the specific element** (chip row → input-only; classLabel duplication → collapse to one word; SRC-04/05 → rewrite to the conjunction).

---

## SECTION 3 — FORM (structural shape of the shipped copy)

| # | Check | SRC-01 | SRC-02 | SRC-03 | SRC-04 | SRC-05 | NULL |
|---|---|---|---|---|---|---|---|
| 3.1 | **Kind-word length** — the relation-kind word/class is 1–3 words (e.g. "Standoff," "Vector-into-Void"), not a phrase or clause | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 3.2 | **Kind-word is a frame-geometry noun** — drawn from (or schema-consistent with) the constrained set: Standoff / Edge / Figure-Ground / Light-Fit / Vector-into-Void — not a taxonomy phrase (BR-S109's "Gesture-Class Hold, Northbound Variant" genus-species form is explicitly retired) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 3.3 | **Kind-word bans subject-intention phrasing** — no phrasing like "neither arriving nor leaving" (that register belongs to `stance` prose, never the chip/word itself) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 3.4 | **Verdict-line length** — 6–14 words | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 3.5 | **Verdict-line beat count** — exactly two beats (one setup, one turn) — not a paragraph, not a single flat clause | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 3.6 | **Hardest word lands last** — the line's charged/heaviest word is the final word, not front-loaded | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 3.7 | **Bridge-word budget** — "reads as" (or equivalent explicit hinge) used in ≤ ~60% of lines across the set under review; remainder hide the pivot inside a verb (holds/keeps/lets/leaves/presses/cools) | ☐ (set-level, not per-source) | | | | | |
| 3.8 | **Register check vs. mockup ceiling** — line is terser than S4's 3-line SRC-01/02 voice mockups (those are upper-bound register reference, not literal target length) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

---

## SECTION 4 — DATA (schema-level checks on the authored object)

| # | Check | SRC-01 | SRC-02 | SRC-03 | SRC-04 | SRC-05 | NULL |
|---|---|---|---|---|---|---|---|
| 4.1 | **Kind-word in enum** — value is drawn from (or extends via a reviewed PR to) the schema-constrained kind vocabulary, not a free string | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 4.2 | **Tier is on the shared ladder** — band value reuses `tierBand()`/`metTier()` (verified live at `app.js:61` and `:363`); NEVER a raw 0–100 number; NEVER a forked parallel ladder | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 4.3 | **Provenance field = `src.stance`** — the schema's provenance pointer targets the existing `stance` string, not `sourceRefs`/`safety.imageActBasis`-style cue lists (those are doc 04 leftovers that don't satisfy ground-truth condition a) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 4.4 | **Null-relation renders correctly** — the NULL column's authored sample legitimately renders as "no relation" (band shows Muted or an explicit null state) without breaking layout or falling back to a placeholder that looks like an error | N/A×5 | N/A×5 | N/A×5 | N/A×5 | N/A×5 | ☐ |
| 4.5 | **No orphaned doc-04 schema fields** — `anchors[]` (4-record projector/container/rim/residue), `chips[]`, x/y coords are either (a) demoted to internal-derivation-only scratch never serialized, or (b) explicitly absent from the shipped object | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 4.6 | **`safety.noStableTraitClaim` boolean present and true** (if the schema retains doc 04's internal QA flags) | ☐ / N/A | ☐ / N/A | ☐ / N/A | ☐ / N/A | ☐ / N/A | ☐ / N/A |
| 4.7 | **No `fitAura` naming collision** — new field name (`auraField` or successor) is visually/textually distinct from the existing unrelated `fitAura` key in `data.js`; reviewer grepped both names side-by-side before sign-off | ☐ (one-time repo check, not per-source) | | | | | |

---

## SECTION 5 — VISUAL (residue mark, mode selection, accessibility)

| # | Check | SRC-01 | SRC-02 | SRC-03 | SRC-04 | SRC-05 | NULL |
|---|---|---|---|---|---|---|---|
| 5.1 | **Mode matches selection rule** — rendered visual is one of doc 02's residue directions (one-seam burn / ghost smear / off-center tension line), selected per the source's relation-kind, not defaulted arbitrarily | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 5.2 | **One tint only** — a single restrained tint derived from `src.halo.a` (or warm-silver archive default if absent); not a gradient, not rainbow, not multi-hue | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 5.3 | **No map / no meter anti-pattern** — NOT contour rings, NOT a vector arrow, NOT a container band, NOT a rim line (doc 04's original Field Map, superseded); NOT a re-drawing of Composition Field's drift-node diagram, especially on SRC-04/05 | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 5.4 | **General anti-pattern sweep** — no neon glow/bloom halo, no chakra ring/person-outline aura, no rainbow gradient, no heatmap, no sparkles/stars/particles, no 6+ labels on the visual | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 5.5 | **Semantic CSS only** — styled via `.dplate--aura` / `.daura__*`; zero `nth-of-type()` selectors | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 5.6 | **`prefers-reduced-motion` honored** — motion (if any) freezes to final state instantly under the media query; reviewer confirms this is the 5th such site in `styles.css` (precedent at lines 2042/2102/2139/3580), not a divergent new pattern | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 5.7 | **Contrast: graphics ≥ 3:1** — non-text graphical objects (strokes, residue fill edges) meet 3:1 against background | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 5.8 | **Contrast: text ≥ 4.5:1** — kind-word and verdict-line text meet 4.5:1 | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 5.9 | **Tint is never the only channel** — the residue mark is legible (shape/position conveys the read) even if color is removed/desaturated | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 5.10 | **Accessible name present** — SVG (or equivalent) wrapped with `role="img"` + `aria-label`/`aria-labelledby` pointing at the left-column / adjacent text summary | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

---

## SECTION 6 — SYSTEM (whole-product coherence checks)

| # | Check | SRC-01 | SRC-02 | SRC-03 | SRC-04 | SRC-05 | NULL |
|---|---|---|---|---|---|---|---|
| 6.1 | **Free-complete** — the free (non-develop) view of the card is not degraded or teased-incomplete by Aura's presence; develop remains a MODE (names the relation) not a GRADE; free still shows the parts | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 6.2 | **No magnetism/scarcity/pressure** — Aura copy does not imply rarity, urgency, or FOMO around the relation-read itself | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 6.3 | **Oracle untouched** — Oracle's copy, layout, and reveal mechanic are unmodified by Aura's addition; Oracle still reads as the sole verdict, unpre-empted | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 6.4 | **One-screen restraint** — the Aura capstone (band + kind-word + line + residue) does not force the dossier plate stack to scroll further than it already does; thin-capstone sizing, not doc 04's 320px-min-height two-column plate | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 6.5 | **Authored-first** — final line is confirmed human-written, not template-generated from a fill-in-the-blank pattern; machine only proposed anchor evidence | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 6.6 | **Swap-test at the whole-element level** — reviewer confirms SRC-01 could not be silently relabeled SRC-02's kind-word/verdict without reading wrong (repo's own fidelity check, S4 §11); if any two sources are interchangeable, the system is too generic | ☐ (cross-source, mark once the full 5-set is drafted) | | | | | |

---

## SIGN-OFF BLOCK (bottom of form, per source)

```
Source: __________        Reviewer: __________        Date: __________

Section 1 (Copy Safety):     PASS ☐   FAIL ☐  (if FAIL, cite failing row #)
Section 2 (Boundary):        PASS ☐   FAIL ☐
Section 3 (Form):            PASS ☐   FAIL ☐
Section 4 (Data):            PASS ☐   FAIL ☐
Section 5 (Visual):          PASS ☐   FAIL ☐
Section 6 (System):          PASS ☐   FAIL ☐

OVERALL:  SHIP ☐        REWRITE ☐        ESCALATE TO O6/F1 ☐ (conflict-blocked)
```

**Escalate, don't decide, if:**
- Section 1.9 flags a live Reach clause and Conflict 1 (second-person) is still unratified.
- Section 2.9's SRC-04/05 conjunction test is ambiguous (line partially restates `field.weight`).
- Section 3.2's kind-word doesn't cleanly fit the five-noun set and a sixth noun seems needed.
- Section 4.4's null-relation sample doesn't exist yet (block the whole sheet on authoring it first — condition (b) is a precondition, not optional).

---

## CONFLICTS (carried forward, not resolved by S10 — for O6/F1)

1. **Inherited from O3 CONFLICT 1 (second-person/Reach legality).** Section 1.8/1.9 and Section 1.5 are written CONTINGENT — they apply only if Reach clauses are permitted at all. Until O6/F1 rules, this QA sheet defaults every source to hinge-only (Reach rows scored N/A unless a Reach clause is actually present in the draft, in which case 1.5/1.8/1.9 must all pass).
2. **Inherited from O2/S4 (thin-capstone vs. medium-plate sizing).** Section 6.4's "one-screen restraint" check has no numeric threshold yet — S10 cannot QA against a pixel budget that hasn't been set. Flag for O6/F1 to supply a min/max height or word-count ceiling so 6.4 becomes a literal measurable check rather than a judgment call.
3. **Inherited from S4/O2 (schema field survival).** Section 4.5's "orphaned doc-04 fields" check assumes O6/F1 has ruled which of `anchors[]`/`chips[]`/x-y-coords survive as internal-only vs. are deleted outright. Until that ruling lands, 4.5 should be scored as an open item, not a pass/fail.
4. **New for S10 — enforcement-gap acknowledgment.** Per O2 and O3, none of Sections 1–2's checks are code-enforced (`PERSON_TRUTH` does not scan `aura`; there is no lint for chip-row rendering or `field.weight` restatement). This QA sheet IS the enforcement mechanism — it is not a supplement to an automated gate. Reviewers should treat a checked box as the only record that the check happened; recommend the sign-off block be retained as a durable artifact (e.g., committed alongside the authored line) rather than a disposable scratch checklist, so there's an audit trail given the total absence of a validator. (Recommendation only — S10 does not mandate a storage mechanism; that's an implementation decision for whoever builds the authoring workflow.)

## RELEVANT FILE PATHS (all absolute, re-grepped live this session)
- `C:\Users\nilsj\OneDrive\Documents\blue-room-scan-room\data.js` — `aura:` (lines 267, 454, 587, 719, 852), `stance:` (269, 456, 589, 721, 854), `sceneCharge: { label:` (1080, 1110, 1141, 1170, 1200), `field:` blocks (Composition Field weight/balance per source).
- `C:\Users\nilsj\OneDrive\Documents\blue-room-scan-room\app.js` — `function tierBand(v)` (line 61), `function metTier(name, tier, mat)` (line 363) — shared ladder infra Section 4.2 requires reuse of.
- `C:\Users\nilsj\OneDrive\Documents\blue-room-scan-room\styles.css` — `@media (prefers-reduced-motion: reduce)` precedent sites (lines 2042, 2102, 2139, 3580) — Section 5.6's reference pattern.
- `docs/BR-AURA-RESEARCH.md`, `docs/HANDOFF.md`, `docs/governance/READING_DOCTRINE.md` — underlying law for all of Section 1 (per O3, not re-verified independently by S10 this session; inherited).
