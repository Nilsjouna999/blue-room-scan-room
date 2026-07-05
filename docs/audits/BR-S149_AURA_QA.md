# BR-S149 — Aura render QA + safety sign-off (Session B)

The enforcement record for the 5 live `auraField` reads now rendering in dossier plate 03.
There is **no code backstop** for aura copy safety (`PERSON_TRUTH` does not scan aura fields) —
this sheet IS the record (per `docs/aura_info/14_AURA_SPEC` §5/§10). Method: read-only
**adversarial** audit (workflow `ws9a79a3y`) — 5 per-source safety+boundary sheets (Sonnet) +
1 adversary (Opus; re-read all 5 `dossier.oracle` blocks + `frame.field.weight`).

Gates run on both the classLine and verdictLine of every source: BR-S113 (five no's) · the
gesture-intent allowance · kill-list (named-emotion-behind-a-bridge / free-floating mood-word /
pathetic-fallacy **banned flat** / stacked adjectives / colour-psychology / face-affect /
FORBIDDEN_TERMS-as-prose) · grammatical-subject · swap · connotation-strip · two-second
(you-clause) · record-duplication · **oracle-collision** · comp-field conjunction (SRC-04/05).

| Source | class · verdict | Verdict |
|---|---|---|
| SRC-01 driver | Warm Refusal · *"The palm holds you at the glass; the cabin keeps the warmth behind it."* | **PASS** |
| SRC-02 ice | Quiet Labour · *"The body bends into the task, not toward the lens; the ice keeps the rest."* | **PASS** |
| SRC-03 shore | Plain Record · *"The catch states the terms; the shore does the staging."* | **PASS** (candidate) |
| SRC-04 run | Lens-Direct Break · *"The run breaks toward the lens; the corridor never lets it spread."* | **PASS** (candidate) |
| SRC-05 tank | Applied Glare · *"Under the house tube, the specular catch is the tube's, not the shell's."* | **PASS** (after fix ↓) |

## The one ship-blocker (found + fixed)

**SRC-05** — the §8 candidate (`Borrowed Light` / *"the shell wears a light it didn't bring"*) was a
**confirmed oracle-collision**: it rode the Oracle's foreign-light payload (`dossier.oracle.full`:
"lifted into light that was not designed for it"; `.short`: "Lifted into the wrong light, the shell
keeps everything") and personified the shell (wears / didn't bring). Even the §8 "safe replacement"
collided — the exact failure mode F1 flagged. Rewritten to the **specular-ownership facet** the
Oracle never touches: *"Under the house tube, the specular catch is the tube's, not the shell's."*
Verified live: **zero shared content words** with the Oracle; no personification; reads the
illuminant-vs-surface conjunction, not `field.weight`.

## Notes (not blockers)

- **SRC-01 "you" clause** — matches the safety gate's own legal exemplar ("holds you at the glass"),
  readable in <2s from the palm-at-window cue, no biography. Contingent on **C-12 — RATIFIED** by the
  builder; a no-"you" fallback is preserved in the `data.js` comment.
- **SRC-03 "does the staging"** — passes (assigns an activity, not an attributed feeling; the source's
  own `stance` uses the identical construction). Optional Session-C margin-widening if wanted:
  *"the shore holds the rest of the frame."*
- **SRC-03/04/05 wording is CANDIDATE** — the human author finalizes in Session C (authored-first),
  re-running this sheet per source and committing the sign-off.

**Adversary verdict:** 4 genuinely clean; SRC-05 the single blocker (now fixed). All 5 PASS.
