# BR-S094 — cheap_extract bench (PILOT harness)

Non-runtime, throwaway harness for the BR-S094 bench. **Not** wired to the app
(`index.html` never references `bench/`). Spec: `docs/BR-S094_CHEAP_EXTRACT_BENCH_SPEC.md`.
(The spec said results to `docs/bench/`; realized here as `bench/results/` so the
throwaway harness + its outputs sit together, out of `docs/`.)

## Privacy (read first)
Input photos are PERSONAL and **LOCAL-ONLY** — `bench/inputs/` images are gitignored
and must never be committed/pushed (the GitHub repo is public). Only the text results
(artifact anchors + scores) are publishable; they read the photograph-as-artifact,
never the person.

## To run the pilot
1. Drop the 5 photos into `bench/inputs/` named **`p01.jpg` … `p05.jpg`**, matching the
   scene each slot describes in [`manifest.md`](manifest.md) (so the ground-truth metadata
   lines up). Any image extension is fine; keep the `pNN` stem.
2. Tell me **"run the bench"**. I then fire the workflow (your 6 Haiku / 6 Sonnet / 4 Opus):
   - **6 Haiku** = the `cheap_extract` pass itself (Haiku IS a cheap tier — the thing under
     test): each photo → exactly ONE artifact anchor as strict JSON (BR-S093 §10 schema:
     `lens · observation · visible_cue · effect · confidence · reason · scope=artifact`).
   - **6 Sonnet** = the scoring lenses (specificity 0/1/2 · reason-safety · generic swap-test
     · curiosity 0/2).
   - **4 Opus** = the safety gate (zero-tolerance person-inference), the **blind-match**
     adjudication (anchor + shuffled set → pick the photo), and the synthesis/verdict.
3. Results (text only) → `bench/results/` + a rollup table (per-metric + per-category).

## Pilot caveat
5 photos is a **pilot**, not the full bench — BR-S094 wants ~20 for a trustworthy
blind-match-rate (chance at N=5 is 20%, so a 5-photo match number is only indicative).
The pilot validates the schema, the rubric, the safety gate, and gives an early signal;
the full ~20-photo run sets the real specificity-floor threshold + per-extract cost.

## Verdict (after run)
- **PASS** (specificity high · `unsafe_person` = 0 · match strongly above chance · cost ≤
  Free ceiling) → cheap_extract is viable for the Free tier; feed cost into pricing.
- **KILL** (match near chance · any un-fixable unsafe inference · over-cost) → escalate the
  Free `model_tier` (cost↑, recheck price) or shrink the Free reading scope, then re-run.
