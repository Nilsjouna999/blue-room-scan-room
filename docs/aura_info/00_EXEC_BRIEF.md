# 00_EXEC_BRIEF — Aura: the decision

**Date:** 2026-07-05 · **Author:** F1 (Chief Synthesizer, final authority) · **Basis:** O1–O6, S7–S10, GPT research docs 01–05, live-repo spot-checks this session. Dossier screenshot `1783253951358_image.png` absent (repo + Downloads) — noted, not a blocker.

## THE DECISION: GO — conditional.

Aura is buildable now, as a **thin synthesis-capstone** inside the existing dossier plate 03 stub (`app.js` grep `dplate("03", "Aura"`). It ships exactly four things per source, nothing more:

> **One residue mark** (tension-line default / seam / smear, on black, one tint from `halo.a`) → **one class line** (authored 2-word contradiction pair, the ONLY rendered designation) → **one ordinal band** (one `metTier("Aura", tier, halo.a)` row on the shared Muted→Peak ladder, hand-authored, never a number) → **one verdict line** (2 beats, 6–14 words, image-subject, hardest word last). Backstage: a schema-locked KIND enum (Standoff/Edge/Figure-Ground/Light-Fit/Vector-into-Void/null) + provenance pointing at `src.stance`. Free state = one authored parts-line (the two co-present terms, unresolved) + a develop-pending line. Null relation = a designed state (no mark, Muted band, absence-shaped verdict).

**What Aura is:** the only instrument that reads the RELATION the frame stages between two co-present elements — every shipped instrument reads a single element; `src.stance` already narrates the relation in prose (unrendered, verified); Aura turns that buried sentence into a scannable band. It is the last FELT beat before Mint; Oracle stays the only SPOKEN verdict.

## The two blockers — resolved

- **C-02 (size/schema):** THIN CAPSTONE WINS. Doc 04 is demoted from target to donor (architecture, pipeline, accessibility, copy-structure survive; its 320px two-column plate, 4-anchor grid, x/y coords, chips[] die). H5's PART III is formally set aside as spec source.
- **C-12 (second-person "you"):** RULED **(b) — narrow ban**. Every retired line in the repo's audit trail is possessive/flattery/passive-observer grammar; the code floor's own `PERSON_TRUTH` regexes encode exactly that boundary; the governing Aura doc's canonical SAFE line is itself second-person and un-retired (`BR-AURA-RESEARCH.md:94`); mission ground truth #2 already lists short cue-bound viewer-transfer clauses as surviving mechanics. Momentary viewer-body clauses ("you stop", "holds you at the glass") are LEGAL — sparingly, one clause, late, cue-bound, bodily/perceptual only. `you are / you're / your <identity-noun>` shapes stay dead on sight. **Human ratifies at first review**; the no-you fallback for SRC-01 is pre-authored.

## GO conditions (all five, no exceptions)

1. **Build to the thin-capstone budgets** (spec §9: verdict ≤16 words, classLine 2–3 words, developed body shorter than Mint Record's). Any growth past budget = stop and re-review, don't absorb.
2. **Human ratifies the C-12 second-person ruling** at first review; if overturned, strike the one "you" clause (SRC-01 fallback provided) — nothing else changes.
3. **Null state implemented and visually verified** (via the data.js fixture) before any real source wires in — falsifiability is a precondition, not a nice-to-have.
4. **S10 QA sheet run and committed per source.** There is NO code backstop — `PERSON_TRUTH` does not scan aura fields (`READING_DOCTRINE.md:59`); the filled sheet is the entire enforcement record.
5. **SRC-03/04/05 final lines are human-authored** (authored-first, ground truth #5). The candidates in this spec are proposals; the two vetoed lines (SRC-04 "…a beat before contact", SRC-05 "…never its own") must not be resurrected — both pre-spend their source's Oracle verbatim (verified `data.js:699/725` and `:832/858`).

## Top risks

1. **Enforcement gap** — safety and boundary law are review-only; a rushed author can ship a violation nothing will catch. Mitigation: condition 4.
2. **Oracle collision is a live failure mode, not theoretical** — the fleet's own best copywriters produced two colliding lines that survived their self-checks; F1 caught them only by re-reading the shipped oracles. Mitigation: QA row 2.5 now requires reading the source's `dossier.oracle.full`/`.short` side-by-side with the drafted line.
3. **Decay pressure** — toward chip-row (BR-S109 killed form), second Metrics (band inflation), second Diagram (mark→map). Mitigations are structural: zero visible chips, one band row max, three-mode-only SVG template with no map primitives.
4. **Thin provenance ore on SRC-03/04/05** (single-sentence stances) — authoring needs more lift; enriching `stance` first is legal, inventing unanchored aura claims is not.
5. **Pre-existing repo bug (decoupled):** the `nth-of-type` dossier rhythm is broken — LOUD styling lands on Mint Record, not Oracle (`styles.css:2355-2371`). The Aura build does NOT shift plate positions (the stub already occupies slot 3), so this is a separate fix; flagged, recommended as its own session.

## Build order (one task per session, per cadence)

**A.** `data.js`: add `auraField` (SRC-01/02 fully populated, 03/04/05 stubs with candidates, null fixture, `freeLine` × 5). **B.** `app.js` + `styles.css`: `renderAuraBody()`, replace the stub with `dplate("03","Aura",paid,body,"dplate--aura")`, `.daura__*` CSS, reduced-motion append; verify free/develop/null at 1600×900 via headless Chrome. **C.** Human authoring pass for SRC-03/04/05 + committed S10 sign-offs. **Follow-ups (separate tasks, non-blocking):** README/PROJECT_OS 7-plate drift, nth-of-type→semantic rhythm migration, dead `.dfitaura` CSS cleanup, dev-reveal AURA placeholder reconcile.

**A builder can start from this brief + 14_AURA_SPEC alone.**