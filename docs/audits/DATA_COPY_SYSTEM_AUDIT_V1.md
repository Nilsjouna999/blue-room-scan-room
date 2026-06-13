# BLUE ROOM — data.js Copy System Audit v1

Layer: AUDIT · Session BR-S034 (2026-06-13) · Audits commit `3e735f0`
against `docs/COPY_SYSTEM.md` + the research human-in-frame / language rules.

## Verdict: **PASS WITH FIXES**

All sample-card copy in `data.js` is in strong shape against the BLUE ROOM copy
system. After the prior 18-State Audit's four human-in-frame fixes (all verified
present), **no gendered pronoun, no second-person person-address, and no banned
beauty / status / attractiveness / SaaS word survives in any visible reading
string.** The findings were a small cluster of low-severity tone/lexicon items;
**3 small fixes applied** (2 copy in data.js + 1 doc-coherence in COPY_SYSTEM).
Not a redesign, no logic change.

Method: full read of COPY_SYSTEM + the research rules + the prior audit, then an
independent line-by-line sweep — two token-greps over data.js (second-person /
gendered / banned-status / beauty / SaaS / every-outcome-failure tokens) plus an
adversarial sub-agent over all string fields. Both passes converged.

## Files audited

- `data.js` (primary) — every string field: card.title/archetype/note/signature,
  reads, aura, sceneRole, stance, fit, impact/lore labels, oracle, dossier
  (record/evidence/statNotes/hidden/mint/oracle), receipts, capture, analysis,
  diagram labels/notes, FORMULAS, TREATMENTS, V2_EXTRAS receipts/routeLogic.
- `docs/COPY_SYSTEM.md` §6 (the canon tone-benchmark — a coherence bug found here).

## Risky copy found + fixes applied

| # | Where | Was | Rule | Fix |
| --- | --- | --- | --- | --- |
| 1 | `data.js` SRC-01 `statNotes.frame.evidence` (Stat Dossier §03, Halo) | "…dashboard intrusion tax the **score**; the window band claws back…" | §5 (every-outcome / score-as-grade tone) — the one place prose treated a stat as a *grade* rather than an artifact read | **FIXED** → "…tax the **composition**; the window band claws back…" |
| 2 | `data.js` `toScanResultV2` `archetype.routeLogic` (internal, **not rendered**) | "…+ **dominant stat pair** + strongest receipt" | §4 (status word "dominant"); flagged as a field a future Halo/Reframe surface could leak | **FIXED** (defense-in-depth) → "…+ **strongest stat pair** + strongest receipt" |
| 3 | `docs/COPY_SYSTEM.md` §6 canon (Field Silence benchmark) | "…Nothing here performs **for you**." | §2 (second-person address) — the governing tone-benchmark still enshrined the exact "for you" the prior audit retired from shipped data.js | **FIXED** → "…was performed for **the lens**." (now matches data.js:322) |

## Lines intentionally left (borderline-keep) and why

- **`impact.label` "Disarming" / "Grounding"** — describe the frame's *effect on
  the read* (the gesture disarms; the stance grounds the frame), not a person's
  charm. They sit inside the approved **Frame Impact** system. Closest-to-the-line
  labels in the file, but five-gate-clean. Keep.
- **FORMULAS "motion potential" / "scene temperature"** — "potential" is a
  careful-use word, but "motion potential" is a physics/composition property of
  the frame, not human potential. Keep (interpretive-formula instrument).
- **`fitMatrix` state "Locked"** (e.g. "Subject — Locked") — composition-lock
  state, *not* SaaS "locked"; an interpretive diagnostic, not paywall copy. Keep.
- **`stance` SRC-01 "The posture of someone who decides when the journey
  resumes."** — grammatical subject is "the posture"; "someone" is generic (no
  gender/person claim). Prior audit kept it; concur. Keep.
- **`statNotes.presence.evidence` SRC-01 "Cap brim, beard and red layer build a
  stable mass…"** — "beard" is a visible styling/texture cue building
  compositional mass (allowed by the reading rules), not a body/identity claim.
  Keep.
- **`confidence` band ("0.83 · high")** — the intentionally-kept Metrics
  interpretive diagnostic ("Subject lock" sibling), a *measurement* instrument
  label, not "you look confident." Keep.
- **Oracle "…leaving the group chat and blessing the vehicle."** — the canonical
  benchmark humor; lands on the image's dual read (scene mechanics), subject is
  "the subject." Keep — it IS the tone target.

## Confirmations

- **Human-in-frame safety.** Regex sweeps over data.js: `\byou(r|'re|rs)?\b` →
  **0** matches; gendered pronouns (he/she/him/her/man/woman/guy/girl/masculine/
  feminine) → **0**; live page sweep of all representative states → "score" 0,
  "you/your" 0, "he/she" 0.
- **No banned status / personality / attractiveness language** in any visible
  reading. The only hits were: "confidence" = the numeric Metrics band
  (cleared exception); "dominant" = the dev-only routeLogic (now fixed);
  "personality" = a code comment. No beauty-app words (stunning/gorgeous/
  attractive/handsome/beautiful/facial/body/glow-up/genetics) anywhere.
- **No SaaS/paywall language** in rendered copy. Free-state uses the approved
  bank ("ARCHIVE PREVIEW", "UNMINTED · ARCHIVE PREVIEW", "archive pull",
  "development pending", "full artifact not minted") — no "locked/unlock to/
  premium/upgrade" framing. ("Locked" survives only as a fitMatrix composition
  state.)
- **Every-outcome-is-a-win holds.** Lower stats are framed as a *different kind
  of artifact*, never a fault — SRC-02's lower Signal reads as a redirected/
  quieter signal; SRC-01's frame penalty is "tax the composition … the fjord
  rescues the right third" (a trade with a rescue, not a loss); quiet energy
  reads as "a temperature, not an absence". The one word that threatened §5
  ("score", finding #1) is now removed.

## Verification

`python -m http.server 8743`, 1600×900: data.js parses; the four representative
states (`?src=1&t=free&tab=source`, `?src=1&t=shiny&tab=metrics`,
`?src=2&t=free&tab=source`, `?src=2&t=shiny&tab=metrics`) render with tier bands
intact; fix #1 renders ("tax the composition"); `?dev=free-scan-sim` (Checkpoint
Wave, no counts), `?dev=halo-gate` (disabled CTA), `?dev=uploaded-result`
(8-stat harness), `?dev=uploaded-blocked` (blocked) all unchanged; bare URL →
menu; `renderGate`/`renderDraft` intact (Local Draft → Develop Scan still
sealed/offline); console clean.

## Next recommended task

**Render archetype discovery note in Halo** (TASK_QUEUE Ready #1) — PROJECT_OS's
visibility table promises an archetype discovery note in Halo that has no data
field/render yet; pull the discovery notes from COPY_SYSTEM §4 (Encounter /
Dispatch). (A copy-surfacing task that now has a fully copy-audited dataset
behind it.)
