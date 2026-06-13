# BLUE ROOM — Sample Room 18-State Audit v1

Layer: AUDIT · Session BR-S033 (2026-06-13) · Audits commit `08bd2de`
(post Artifact Language Stabilization Pack v1 / Sample Room Tier Migration v1).

## Verdict: **PASS WITH FIXES**

The sample-room stat/tier migration is **fully correct across all 18 states** —
no leftover old stat term, no public 0–100 stat score, no `±N` evidence delta,
and no diamond/label overflow anywhere. The only findings were a small cluster of
**pre-existing person-pronoun prose** in the Halo-tier copy (not introduced by
the migration); **all four were fixed** in this pass. No code/logic changes were
needed — fixes are copy-only in `data.js`.

Method: live route-walk at 1600×900 (DOM text-sweep per state: stat labels, tier
bands, leaked-term regex, 0–100-on-stat-surfaces, diamond label bbox vs viewBox,
clipped-band check, banned-language sweep, console) + a screenshot of the densest
state (SRC-01/Halo/Metrics) + an independent five-gate copy-safety sub-agent over
all sample-room strings (verdict PASS_WITH_FIXES, same findings).

## The 18 states audited

Matrix = 2 sources × 3 treatments × 3 tabs, via `?src=1|2 & t=free|shiny|mint &
tab=source|diagram|metrics`. Treatment map: **Free** = `t=free` (Free Pull),
**Deep/Halo** = `t=shiny` (Halo Mint), **alternate/variant** = `t=mint`
(internal Lab · Signature Mint).

| # | src | treatment | tab | result |
| --- | --- | --- | --- | --- |
| 1 | 1 | Free | Source | ✅ |
| 2 | 1 | Free | Diagram | ✅ |
| 3 | 1 | Free | Metrics | ✅ (deep-swept) |
| 4 | 1 | Halo | Source | ✅ |
| 5 | 1 | Halo | Diagram | ✅ |
| 6 | 1 | Halo | Metrics | ✅ (deep-swept) |
| 7 | 1 | Lab/Mint | Source | ✅ |
| 8 | 1 | Lab/Mint | Diagram | ✅ |
| 9 | 1 | Lab/Mint | Metrics | ✅ (deep-swept) |
| 10 | 2 | Free | Source | ✅ |
| 11 | 2 | Free | Diagram | ✅ |
| 12 | 2 | Free | Metrics | ✅ (deep-swept) |
| 13 | 2 | Halo | Source | ✅ |
| 14 | 2 | Halo | Diagram | ✅ |
| 15 | 2 | Halo | Metrics | ✅ (deep-swept, findings here) |
| 16 | 2 | Lab/Mint | Source | ✅ |
| 17 | 2 | Lab/Mint | Diagram | ✅ (deep-swept) |
| 18 | 2 | Lab/Mint | Metrics | ✅ |

(Card/right-panel/dossier are tab-invariant per source×treatment, so the 6
source×treatment combos were deep-swept; the diamond/left-panel was checked per
tab. SRC-02/Halo was re-verified after the fixes.)

## Screenshot note

SRC-01 / Halo / Metrics at 1600×900: the three-column room (left metrics ·
center card · right reading) fits cleanly. The **card reads as a premium
artifact trophy** (photo dominant, tier bands quiet below the title), not a
dashboard. Diamond axis labels (FRAME PRESENCE / FRAME / SIGNAL / SCENE CHARGE)
fit with no overflow; metrics instruments read as quiet supporting plates. No
clipping, collision, or scroll trap.

## Findings by severity

| Sev | Rule | Where | Finding | Status |
| --- | --- | --- | --- | --- |
| medium | human-in-frame | `data.js` SRC-02 `stance` (Stance Read + dossier §05, Halo) | "…the auger doesn't care, and neither does **he**." — gender pronoun + inner-state ("doesn't care") | **FIXED** → "…and the frame doesn't pretend otherwise." |
| medium | human-in-frame | `data.js` SRC-02 `statNotes.presence.note` (Stat Dossier §03, Halo) | "The snow does the staging; **he** accepts the terms." — person-as-subject + gender pronoun | **FIXED** → "…the silhouette accepts the terms." |
| low | human-in-frame | `data.js` SRC-02 `hidden.read` (Hidden Stat §04, Halo) | "…Nothing here was performed **for you**." — second-person viewer address | **FIXED** → "…performed for the lens." |
| nit | human-in-frame (latent) | `data.js` SRC-01 `evidence` Signal Vector | "…straight **at you**." — would fail gate 1, but the legacy `d.evidence` board is **unreachable** (the v2 `scan.receipts` path always renders). | **FIXED anyway** (defense-in-depth) → "…straight at the lens." |
| low | human-in-frame | `data.js` SRC-01 `stance` | "The posture of someone who decides when the journey resumes." | **Kept** (acceptable — grammatical subject is "the posture"; "someone" is generic, no gender/person claim). |
| nit | — | `data.js` SRC-01 `statNotes.presence.evidence` | "Cap brim, **beard** and red layer build a stable mass…" | **Kept** — "beard" is a visible styling/texture cue building compositional mass (allowed by the reading rules), not a body/identity claim. |

## Confirmations

- **Stat/tier migration correct.** Every public stat across all 18 states shows
  the artifact-safe labels **Frame Presence / Frame / Signal / Scene Charge** as
  **tier bands** (Muted/Clean/Strong/Charged/Peak). Hidden stat = **Gesture
  Geometry** (SRC-01) / Field Silence (SRC-02); deep module = **Frame Impact**
  (not "Visual Impact"); evidence effects = direction arrows (↑/↓), not `±N`.
  Leak regex across every state: standalone "Presence" 0 · standalone "Charge" 0
  · "Visual Impact" 0 · "Gesture Authority" 0 · "Dominant" 0. *(A `±N` regex hit
  on `-001`/`-0001` was a serial-number fragment, not a stat delta.)*
- **No public 0–100 stat-score leakage.** No 10–100 number on any stat surface
  (`.statzone`/`.reads`/`.dstats`) in any state. The Metrics-tab numbers
  (signal-mix recipe %, composition pressure, fit-matrix, "Subject lock 0.83")
  are the intentionally-kept interpretive diagnostics, captioned **"interpretive
  formula, not a measurement"** — an allowed exception, and their labels
  (Subject/Setting/Styling/Gesture · Gesture/Setting/Styling/Composition/Light)
  read as composition, not person.
- **Human-in-frame safety.** After the four fixes, the live sweep of SRC-02 Halo
  returns `he` 0 · `for you` 0 · `straight at you` absent; banned-language sweep
  (confidence/attractive/alpha/high value/masculine/feminine/personality/
  insecure) returns empty across all states.
- **Route regression — all pass.** bare URL → menu ✅ · `?dev=free-scan-sim` ✅
  (Checkpoint Wave, no counts, halo note "The front is already complete") ·
  `?dev=halo-gate` ✅ (disabled CTA, "not a hidden score", no counts) ·
  `?dev=uploaded-result` ✅ unchanged (8-stat DEV HARNESS exception) ·
  `?dev=uploaded-blocked` ✅ unchanged · normal Local Draft → Develop Scan still
  sealed/offline (`renderGate`/`renderDraft` intact) · **console clean** throughout.
- **Halo boundary carryover.** Neither the Free Pull front nor the Halo Gate
  shows exact locked counts; no hidden-score implication; no payment/unlock/
  AI/backend/upload-analysis added.

## Allowed exceptions (intentional, unchanged)

- `?dev=uploaded-result` / `uploaded-blocked` DEV HARNESS — keeps legacy
  Presence/Charge/Visual-Impact labels + 0–100, marked "NOT USER SCAN".
- Metrics-tab interpretive diagnostics keep numeric weights ("not a measurement").
- Historical docs / `docs/research/*` — not in scope.

## Next recommended task

**data.js copy audit against COPY_SYSTEM** (TASK_QUEUE Ready #1) — a full
banned-word / tone / every-outcome-is-a-win pass over all `data.js` strings
(this audit covered the migrated stat surfaces + human-in-frame safety; the
broader COPY_SYSTEM grammar pass is the natural follow-up).
