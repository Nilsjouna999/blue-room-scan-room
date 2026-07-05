# 14_AURA_SPEC — implementation-ready (thin capstone, dossier plate 03)

**Status:** ratified by F1. Repo anchors are grep-able strings; line numbers drift. A builder needs only this file + 00_EXEC_BRIEF.

## §1 Definition (the license, one sentence)

> **Aura ranks and names the RELATION the frame stages between its two co-present elements — one residue mark, one authored class line, one ordinal band on the shared Muted→Peak ladder, one authored verdict line — distilling the relation-sentence already buried in `src.stance`. Every other instrument reads a single element; Aura is the only one that reads the tension BETWEEN two.**

Kill-test for every element: does it read what the image DOES — charged, terse, verdict-shaped — without diagnosing the person, and without becoming a second Diagram/Surface/Metrics/Oracle? Fail = cut.

## §2 Boundary (six walls + the conjunction rule)

- **Not Diagram:** no maps, overlays, pips, axes, arrows. The mark is residue, never annotation.
- **Not Metrics:** never re-tier a property Metrics bands (Drift/Clarity/Depth/Legibility/Charge/Containment/Reach); never restate `signature.class` or `event.label` as the payload; ONE band row, never in `.met-bands`.
- **Not Surface/Finish:** zero material/palette/finish prose (BR-S115 gave that lane to Finish; the dev `reveal` AURA "warm glass copper" is a placeholder, never a pattern).
- **Not Archetype/Card-tag:** the classLine never names the photo-role.
- **Not a second Source Record:** no chip-row, no code/call-number shape (BR-S109: "a CODE reads as FILING"). The existing `aura[]` arrays are INPUT ore only, never rendered.
- **Not Oracle:** Aura = last FELT beat; Oracle = only SPOKEN verdict. **Mandatory check: read `dossier.oracle.full` + `.short` beside every drafted line; shared payload words = rewrite** (two fleet candidates died on this — `data.js:699/725`, `:832/858`).
- **SRC-04/05 conjunction rule (O2 ruling b):** read the CONJUNCTION (stride-vector × corridor; illuminant × surface), never re-narrate `field.weight`. Deletion test: if the line only works as a caption to the Composition Field plate, it's owned — cut.

## §3 Data schema — `auraField` (in `data.js`, sibling of `frame`/`dossier`/`halo`)

Name is final: `auraField` (distinct from the existing `aura[]` chip array and the unrelated `fitAura` key — verified all three coexist grep-distinct).

```js
auraField: {
  kind: "Standoff"|"Edge"|"Figure-Ground"|"Light-Fit"|"Vector-into-Void"|null, // CLOSED enum. Backstage only: never renders as text. null = authored no-relation.
  classLine: string|null,   // THE one rendered designation. 2–3 words, warm-modifier + frame-noun. null iff kind null.
  tier: "Muted"|"Clean"|"Strong"|"Charged"|"Peak", // hand-authored rank of the RELATION's staged tension; may equal event.charge but never derived in code.
  verdictLine: string|null, // the one authored sentence. null only pre-authorship (stubs), never at ship.
  freeLine: string,         // the free-state parts line: names the two co-present terms, resolves nothing.
  visual: { mode: "tension"|"seam"|"smear"|null, tint: "var(--halo-a)" }, // null mode = no mark (null relation). NO "type"/"map" values.
  safety: { imageActBasis: string[], noStableTraitClaim: true }, // gesture-pins documented here (required if classLine uses a social noun).
  provenance: { stanceRef: true, sourceRefs: string[] }, // reference to src.stance, NEVER a copy; sourceRefs = audit trail, never rendered.
  ariaSummary: string,      // plain sentence; may name kind+tier+classLine (aria is not visual render).
}
```

**Dropped from all prior drafts:** `anchors[]` (not persisted — projector/container/rim/residue derivation lives in the authoring note/PR, not shipped content), `chips[]`, any `x`/`y` coordinate, any layout field. **Co-requirement rule (documented, unenforced — no validator exists):** kind/classLine/verdictLine land together or not at all; `tier` is always set (Muted for null).

**Null state (falsifiability, condition b):** ships as a clearly-marked non-rendered fixture in `data.js` (S7's, with `visual.mode: null` and no mark) until a real null source exists; the render path must handle it: no mark-wrap, no classLine, Muted band (1/5), verdict states absence — house pattern: *"Two elements, no edge between them; the frame files them side by side."*

## §4 Copy system

**classLine:** `[warm/legible modifier] + [cold frame-noun]`, 2 words default. Modifier bank: warm·open·quiet·lit·plain·steady·bright·flat·near·held·direct. Noun bank (frame/optics/procedure): stop·hold·edge·seam·exit·void·field·band·rim·brace·cut·reach·channel·cradle·surround·glare·glass·frost·burn·drag·trace·record. Social nouns (refusal/labour/witness…) ONLY gesture-pinned + documented in `safety.imageActBasis`. Terminal word never a feeling (recoil/shame/loneliness/longing/dread = dead). Must be a legal instance of its backstage KIND. Never reads as a code/filing address.

**verdictLine:** 2 beats (3 only as escalating hammer) · 6–14 words (15–16 only for reversal work) · one contradiction · warmth→cold · hardest word last = frame/procedure noun · hinge hidden in verbs where possible (holds/keeps/leaves/lets/cools/drags/cuts/thins); explicit "reads as" is the reliable default, ≤~60% of the set; "feels like" banned. Authoring question: *"What is this frame pretending to be, before it reveals what it actually is?"* One quietly-absurd line per section max (COPY_SYSTEM §2); body copy never leans on the word "aura" (careful-use, C-07); free-state words: partial record/undeveloped/develops — never locked/unlock/premium.

**Second-person (C-12, ruled b):** momentary viewer-body perceptual clauses legal — short, late, cue-bound, a viewing EVENT ("you stop", "holds you at the glass"), at most a minority of lines. Dead regardless: `you are/you're/your <identity-noun>`, "for you" flattery, passive-observer address. Human ratifies at first review; SRC-01 fallback pre-authored.

**freeLine:** names the two poles, inventory register, resolves nothing ("A raised palm and a fjord window, both in one cabin frame.").

## §5 Safety gate (the entire wall — no code backstop; `PERSON_TRUTH` does not scan aura fields)

Run O3's steps in order on every classLine + verdictLine; first failure = kill and rewrite, never hedge: **0** provenance (traces to stance/field/event) → **1** grammatical subject = image, never person/body-part-as-will → **2** swap test (different sitter, same geometry — survives?) → **3** connotation-strip (remove photo-noun; stable disposition left = kill) → **4** two-second test (any "you" clause) → **5** kill-list sweep: no named emotion behind any bridge; no mood-words; **pathetic fallacy banned flat — no "optical-property" carve-out** (F1 ruling; "the lake holding its breath" is dead); no adjective piles; no hue→feeling; no face-affect (use gaze-axis/head-turn); no FORBIDDEN_TERMS words as prose → **6** record-duplication (a neutral archivist could write it verbatim = it's Record, belongs to Diagram/Surface — rewrite as the relation) → **7** register (terse, one setup one turn; builds toward Oracle without spending it — **read the source's oracle side-by-side**).

## §6 Visual system

**Selection tree (O5, ratified):** biased balance between two poles → **off-center tension line (DEFAULT)** · genuine threshold → **one-seam burn** · retained motion → **ghost smear** · type-burn = benched, ships nowhere in pass 1. Default map from KIND: Standoff/Figure-Ground→tension, Edge/Light-Fit→seam, Vector-into-Void→smear; per-source override legal with a written reason. Bias geometry comes from `field.node{x,y}` + `balance` — never invented; "Centred" balance = subtle bias (and if a tension line would render as a false null, override to the source's true residue shape — the SRC-02 precedent).

**Look discipline:** field = `--ink-950` (#0a0b0d — the mission's `--bg` does not exist); base strokes `var(--line-strong)`; one tint per card `--daura-tint: color-mix(in srgb, var(--halo-a) 55%, var(--silver))` (halo.a per source: 01 #c98a5e · 02 #5fd4e0 · 03 #6fb3e0 · 04 #7fc8a0 · 05 #36b6c8); cold exit rim may lean `--halo-b` as a thin edge only; residue fill 8–12% opacity, one drag + one rim max, no stacking. **Red lines (auto-fail):** contour rings · vectors/arrows/streamlines · heatmaps/rainbow · chakra/sparkle/scanner UI · any second band, %, or 0-100 · `nth-of-type()` · type-as-hero · restating `field.weight`/palette/finish.

**Band coexistence:** exactly one `metTier("Aura", auraField.tier, src.halo.a)` row — verbatim reuse of `app.js:363`, never wrapped in `.met-bands`, never derived in code from `event.charge`. 80/20 handoff: the mark leads, band and line trail ("Aura should be seen first, then named; Oracle should be read first, then felt again" — preserve verbatim). Escape hatch: if the built plate reads as a gauge in visual QA, drop the segments, keep the tier word.

## §7 Free / develop split (develop = mode, not grade)

- **FREE:** `.daura--tease` = `freeLine` (the parts, unresolved) + `<p class="dstat__undeveloped">The read between them develops with the mint.</p>`. **No mark, no band, no classLine** — the mark IS the reveal; a dimmed version either leaks bias or fakes a null, and no-magnetism prefers the honest inventory (F1 ruling on S8's open item; the sealed-dim alternative is rejected).
- **DEVELOP:** mark → classLine → band → verdict, full.

## §8 Per-source assignments (final)

| Src | KIND | classLine | tier | mode + geometry (`field.node`) | tint |
|---|---|---|---|---|---|
| 01 | Standoff | Warm Refusal | Charged (4/5) | tension; bias up-right toward palm ({0.42,−0.34}, "Lean right") | #c98a5e |
| 02 | Figure-Ground | Quiet Labour | Clean (2/5) | seam (override, reason recorded); vertical, low-center ({0.04,0.30}) | #5fd4e0 |
| 03 | Standoff | Plain Record | Strong (3/5) | tension (default); lateral anchors, SUBTLE water-side bias ({0.04,0.12}, "Centred") | #6fb3e0 |
| 04 | Vector-into-Void | Lens-Direct Break | Peak (5/5) | smear; forward drag, cool rim at FRONT ({0.04,−0.12}); static afterimage, never a live vector | #7fc8a0 |
| 05 | Light-Fit | Borrowed Light | Charged (4/5) | seam; stressed frontier upper-left per antennae ({−0.08,0.14}) | #36b6c8 |
| null fixture | null | — | Muted (1/5) | none | — |

**SRC-01 (complete, gate-passed):** verdict = *"The palm holds you at the glass; the cabin keeps the warmth behind it."* (12w, verb-hidden, contingent "you"; fallback if C-12 overturned: *"The palm stops the lens; the cabin keeps its warmth behind it."*). freeLine = *"A raised palm and a fjord window, both in one cabin frame."* Gates: subject=palm/cabin/glass ✓ swap ✓ strip ✓ two-second ✓ kill-list ✓ relation-not-record ✓ oracle check ✓ (shares the palm anchor with the oracle but different payload — acceptable, noted). `imageActBasis: ["raised palm — performed gesture-intent, RULE 0 allowance", "window-band crop"]`.

**SRC-02 (complete, gate-passed):** verdict = *"The body bends into the task, not toward the lens; the ice keeps the rest."* (14w). freeLine = *"A crouched brace and a wide ice field, in one flat light."* Tier note (authoring justification, required): Clean = the relation is total but low-tension — quiet ≠ weak; the set's every-outcome-wins proof. Gates: all pass; "the ice keeps the rest" replaces the killed pathetic fallacy; oracle ("The fish were optional. The silence was the catch.") untouched.

**SRC-03/04/05 (candidates — human authors final, per GO condition 5):** 03: *"The catch states the terms; the shore does the staging."* (legal while `stance` is unrendered — it IS the distillation; re-check if a Source tab ever renders stance). 04: *"The run breaks toward the lens; the corridor never lets it spread."* (replaces the VETOED "…holds it a beat before contact" — oracle collision `data.js:699/725`; also never restate field.weight "foreground mass arriving into the lens"). 05: *"Held face-out under the house tube, the shell wears a light it didn't bring."* (replaces the VETOED "…never its own" — oracle collision `data.js:832/858`; never restate field.weight "pulled slightly down by the tank-blue band" or any material read).

## §9 Render / CSS (S8, as amended)

- `app.js`: `const aura = dplate("03", "Aura", paid, renderAuraBody(src, paid), "dplate--aura");` — same pattern as `dplate--mint`/`--oracle`; zero new plumbing. Developed DOM: `.daura` (single-column grid) → `.daura__mark-wrap` (bg `--ink-950`, border `--line-faint`, radius `--r-plate`) containing `<svg class="daura__mark daura__mark--{mode}" viewBox="0 0 240 100" role="img" aria-label="${esc(verdictLine)}">` (house convention — direct `aria-label`, not `aria-labelledby`; all sub-parts `aria-hidden="true"`) → `.daura__read`: `.daura__class` (classLine, small-caps kicker — **renders the classLine, never the enum word**) + `metTier("Aura", auraField.tier, src.halo.a)` + `.daura__line` (verdict, `--silver-bright`).
- One SVG template, three mode-scoped `<g>` groups (`.daura__g-tension/-seam/-smear`) toggled by modifier class — no type-burn group exists. Shared classes: `.daura__anchor` (fill `--line-strong`, ≤3px), `.daura__filament`/`.daura__seam-line` (stroke `--daura-tint`, 2px), `.daura__rim` (stroke `--daura-tint-cold: color-mix(in srgb, var(--halo-b, var(--violet)) 40%, var(--silver-dim))`, 1px), `.daura__bleed` (fill `--daura-tint`, opacity .1).
- **No `nth-of-type()` anywhere. Never touch `.dfitaura*`** (killed BR-S109 form; its dead CSS at `styles.css:2608` is a separate cleanup).
- Reduced motion: append `.daura__mark * { animation: none !important; transition: none !important; }` to the EXISTING consolidated block (`styles.css` grep `prefers-reduced-motion`, ~:3580); any motion-on settle is ≤600ms, one-shot, mark→band→line, final state correct without it.
- Contrast: strokes ≥3:1 on `--ink-950` (spot-check all five tints at build — the 55%-into-silver recipe should clear, verify don't assume); text ≥4.5:1 (`--silver-bright`); shape carries the read in grayscale — tint never the only channel.
- **Size budgets (answers S10's 6.4 gap — measurable):** classLine 2–3 words · verdict ≤16 words · freeLine ≤14 words · mark = wide thin strip (~240×100 viewBox, mark-wrap ≤ ~140px rendered) · developed `.daura` total ≤ ~260px at 1600×900 · the Aura plate body renders SHORTER than Mint Record's developed body. Over budget = stop and re-review.

## §10 QA hooks

S10's six-section sheet is MANDATORY per source, run in order, kill-on-fail, with these amendments: (i) row 1.6c corrected — pathetic fallacy banned flat, no carve-out; (ii) row 2.5 now requires side-by-side read of the source's `dossier.oracle.full`/`.short`; (iii) 6.4 uses §9's budgets; (iv) 4.5 = the fields are ABSENT from `data.js`, not internal; (v) Reach rows 1.5/1.8/1.9 active under ruling (b) pending the one-time human ratification. The filled sign-off block is COMMITTED (recommend `docs/audits/`) — it is the only enforcement record that exists. Escalate (never decide): a line partially restating `field.weight`; a kind that wants a sixth noun; any null-state ambiguity.

## §11 Build order

**Session A (data):** `auraField` × 5 + null fixture + freeLines into `data.js`. **Session B (render):** `renderAuraBody` + stub replacement + `.daura__*` CSS + reduced-motion append; verify free/develop/null states via headless Chrome at 1600×900 (Preview MCP screenshot is broken per memory). **Session C (authoring):** human finalizes SRC-03/04/05 via S9 playbook, S10 sheets committed. **Follow-ups (separate tasks):** nth-of-type rhythm migration to semantic modifiers; README/PROJECT_OS 7-plate drift; dead `.dfitaura` CSS; dev-reveal AURA reconcile.