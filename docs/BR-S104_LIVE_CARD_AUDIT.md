# BR-S104 — Live Card Audit + Improvement Plan (2026-06-22)

**ANALYSIS + PLAN (no runtime changes in this commit).** A read-only 9-agent audit of all 5 live cards
(SRC-01..05, free + developed): one auditor per card (each read the actual photo + the copy) + cross-cutting
lenses for the paid reading, backend/stat leakage, and voice/boring → Opus synthesis. This doc is the verdict +
the prioritized fix plan. Source: workflow `live-card-audit` (run wf_4bfedd15-b9e).

---

## Verdict — ~6.5 / 10 of the Blue Room dream

**Close on craft, short on pull.** The hardest constraint — read the photo as an artifact, never the person —
holds flawlessly across all 5 cards, and the best lines hit the exact magnetic, grounded-then-turn register we
want (SRC-01 oracle "both leaving the group chat and blessing the vehicle"; SRC-02 "The fish were optional. The
silence was the catch.").

**The gap is the same on the front and the back: precision without the turn.** Three of five cards lead their
free-front Signal Note with composition geometry instead of confirming the salient "yeah—that's the shot" thing
the owner expects noticed, and the non-obvious turn that would make them magnetic is buried in paid-only oracle
prose. The whole experience is also exhausted in one read — no climactic payoff, no collection hook, every back
structurally identical. And raw engine tokens are leaking onto live customer surfaces.

### Score snapshot (0–10)
| Card | int | prec | grnd | funny | addict | corr | acc | coh |
|---|---|---|---|---|---|---|---|---|
| SRC-01 Checkpoint Wave | 7 | 6 | 8 | 5 | 6 | 8 | 7 | 8 |
| SRC-02 Two Feet of Quiet | 7 | 6 | 7 | 5 | 6 | 8 | 7 | 8 |
| SRC-03 Shore Dispatch | 6 | 7 | 8 | 3 | 5 | 7 | 6 | 8 |
| SRC-04 Stride Break | 7 | 8 | 9 | 3 | 6 | 8 | 7 | 8 |
| SRC-05 Spiny Encounter | 6 | 7 | 8 | 3 | 7 | 7 | 7 | 8 |

**Weakest axes: FUNNY (3–5) and ADDICTING (5–7).** Grounded + coherent are strong (7–9, 8). The dispatch voice
rarely breaks into wit, and the back is read-once.

---

## P0 — Backend / stat leaks on LIVE customer surfaces (fix first)

These render via `render()` into the real dossier + reading panel — NOT the gated `?dev` harness or the
Metrics-tab carve-out. The documented carve-outs (Metrics raw 0–100, `?dev`, `?devnav`) are clean; the no-raw-
0-100 gate holds everywhere else. Leaks are concentrated in the dossier filing chain + Evidence Board.

| Sev | Leak (live text) | Where | Fix |
|---|---|---|---|
| HIGH | `route · HUMAN_SOLO` / `ANIMAL_COMPANION` | dossier filing chain, app.js ~722 (← `scan.route`, data.js V2_EXTRAS) | translate to in-world copy (`field capture · solo subject`) or remove. **HUMAN vs ANIMAL borders on classifying the subject — the core law forbids reading the person.** |
| HIGH | `scan status · accepted` | app.js ~723 (← `scanStatus`) | raw pipeline state; implies a gate that could reject a user's photo. → `scan complete`, or remove. |
| HIGH | `Subject lock · 0.83` / `0.88` | Technical Receipts panel, app.js ~576 (data.js:257 / :425) | a bare 0–1 model confidence + "Subject lock" edges toward reading the person. → qualitative label. **Ships today.** |
| MED | Evidence Board effect arrows `Signal ↑ / Frame ↓ / Lore ↑` | app.js ~775 (← `receipts[].effect`) | dev changelog notation; `Frame ↓` exposes a hidden numeric penalty behind the bands. → prose effect, or drop the arrow. |
| MED | Evidence Board confidence chips `high / medium` | app.js ~775 (← `receipts[].confidence`) | per-receipt ML band invites "why only medium on MY photo?" → fold into the basis phrasing. |
| MED | `filed as · The Encounter / The Dispatch` | app.js ~724 (← `archetype.class`) | rough dev-label; the same class shows cleanly at app.js ~645 with the "photo role, not a person" disclaimer — align to that or remove. |
| LOW | `CANDID / INT · SRC-05` capture code as Source ID | app.js ~740 | internal shorthand as a customer field; SRC-05 also mislabeled CANDID for a posed shot. → translate/audit capture codes. |

---

## The core gap — name the salient thing, then turn it

The dream card: **names what the owner would expect noticed (the "yeah—that's the shot" memory), then adds a
non-obvious turn.** Status per card:

- **SRC-01 / SRC-02:** name the expected thing AND attempt the turn — but the best turn is locked in the oracle
  while the front note explains the card's own strategy (SRC-01 "…and doesn't need to") or leads with the
  weaker line (SRC-02).
- **SRC-03 / SRC-04 / SRC-05:** **lead the free-front Signal Note with diagram geometry** ("a transverse catch
  across a compressed fjord depth stack" / "the path wedge supplies depth" / "a full carapace presented over a
  live tank…") and carry **no twist on the free face** — the turn is paid-only. SRC-03 outright fails to name
  what the fish IS; SRC-05 erases the human "I-picked-this-one" moment into a specimen study.

---

## Per-card brief (verdict + top fixes)

**SRC-01 Checkpoint Wave — strongest (7/10).** Names palm + cabin + fjord; the stop-vs-welcome duality is real.
- Front note → put the irony on the SCENE, not the card: *"The palm says stop. The fjord says otherwise."*
- Pull the Hidden-Stat insight (selfie-becomes-encounter) up to drive the note + archetype.
- Fix leaks: drop `Subject lock · 0.83`; soften "Volvo wheel confirmed" (badge too obscured); lift the
  presence/charge reads off generic road-trip copy onto the cap brim / red layer / the hand.

**SRC-02 Two Feet of Quiet — second (7/10).** Right understated register; "The fish were optional…" is top-3.
- Swap the oracle: promote *"The fish were optional. The silence was the catch."* over "The snow kept the minutes."
- Rewrite `reads.signal` to lead with the auger's downward force (not the hidden face); promote the Expression-
  Band warmth cue out of collapsed receipts into the free reads.
- Drop `Subject lock · 0.88`; translate the filing tokens; anchor `reads.visualImpact` to the hard low-sun shadow.

**SRC-03 Shore Dispatch — weakest front (6/10).** The one card that fails to name the expected thing first.
- Rewrite `card.note` to confirm the catch FIRST then deliver the driftwood turn: *"Held flat and face-up, as if
  offering the evidence rather than the fish. The driftwood below files a parallel report, unprompted."*
- Bring a version of the dossier oracle to the free face; gesture at the species (*"what looks like a large cod,
  turned broadside"*).
- Replace the weakest aura set (`Lateral / Dispatched / Shore-Filed`) with grounded cues; de-jargon
  `reads.charge`/`presence`/`fit` ("specular rivalry", "luminance budget", "confirms remote field provenance").

**SRC-04 Stride Break — grounded but cold (7/10).** Lands the shot; signature "Logged at ankle height, the
instant before contact" is a top line.
- Rewrite `card.note` to the signature's register: *"The path had somewhere to be. The dog had the same idea, faster."*
- Replace aura `Diffuse` (a lighting setting) with a felt word (`Closing`/`Contact`/`Committed`); rewrite
  `reads.signal`: *"The dog is not running past the frame — it is running at it. A different contract entirely."*
- Let one line acknowledge the mass is a dog mid-bound ("foreground mass" repeats ~7×); fix the `route ·
  ANIMAL_COMPANION` leak.

**SRC-05 Spiny Encounter — formalist miss on the human beat (6/10).** Clocks lobster/tank/fluorescent but treats
a grinning "I picked this one" trophy as a specimen study; the turn ("lifted into light it was not designed for")
is paid-only.
- Rewrite `card.note` to name the selection ceremony + the turn: *"Picked from the tank, held up for proof. The
  fluorescent has no mercy — every spine reads."*
- Sharpen the signature toward the ritual's humor (*"Selected. The tank doesn't know yet."*); rewrite
  `reads.charge` off "selection-ready status" (*"Held over its own water, it is a decision, not a prop."*).
- `capture.code` CANDID → POSED/PRESENTATION; "tropical mural" → "a painted aquatic wall"; fix HUMAN_SOLO /
  accepted leaks.

---

## Paid / developed verdict — ~70% to final, NOT yet addicting (closeToVision 6.5 / addicting 4.5)

**What's right (keep):** voice-first open (oracle hoisted above the stat ledger); the Evidence Board's
cue→effect→basis→confidence as genuine pull-by-giving (free sees 3, develop reveals 5 + the basis layer);
identical stat VALUES free↔paid so develop is a DEEPER record, never a better score; clean artifact-not-person
archetype scoping.

**The 5 strongest upgrades:**
1. **Forge ONE hero payoff line per card** — a single developed-back verdict sentence that exists only on the
   back, lands grounded-thing-then-turn, promoted to its own oversized plate, built to be screenshotted. The
   SRC-01 oracle is the bar; the other four must reach it.
2. **Give the deep dossier a TURN** — Stat Dossier notes, Evidence Board bases, Fit+Aura stance are flat
   documentary; each should name the expected cue AND add the non-obvious thing (esp. SRC-03/04/05).
3. **Make the back shape itself to the card** — `routeLogic` already computes the strongest stat pair + receipt
   (data.js ~932) and the renderer **ignores it**; wire it to reorder/emphasize modules so no two backs feel
   identical (motion card → Stride Geometry; lore card → provenance).
4. **Turn the timeline into a live collection hook** — the "Adjacent in the archive" line (app.js ~924) is the
   only universe gesture and renders as a dead ghost caption; make it a 3-up of sibling cards (the page/universe
   is the dish).
5. **Kill the duplicate/boilerplate** — the developed panel re-renders the SAME four free stats with the SAME
   bands + prose (app.js ~817 reuses `tierOutputs.free.statsShown` even when paid); surface the deeper Halo
   stats (Frame Impact, Lore, Fit Coherence) there instead; de-dupe Scene Role (panel + dossier) and the Mint
   Record triggers (echo of the Evidence Board).

---

## Prioritized plan

- **P0 — Fix the live leaks** (cheapest, highest damage/line, law-adjacent): translate/remove the filing-chain
  tokens (route / scan status / filed as), drop the `Subject lock · 0.NN` receipts, convert the Evidence Board
  effect arrows + confidence words to prose. *Runtime: app.js + data.js.*
- **P1 — Rewrite the 3 failing free-front notes** (SRC-03/04/05) to name the salient thing first + bring the
  turn to the free face; **forge one hero payoff line per card** on the back. *data.js (+ a small app.js plate
  for the hero line).*
- **P2 — Output variance + collection hook:** wire `routeLogic` into module order; make the timeline a live
  sibling 3-up. *app.js.*
- **P3 — De-dup the paid panel** (surface deeper Halo stats); accuracy/voice cleanups (capture codes, SRC-01
  overclaims, SRC-04 "mid-stride"/"foreground mass"×7, weak aura sets). *data.js + app.js.*

## What to ADD (currently missing)
- A hero payoff line per card (the back has no climax).
- A non-obvious turn in the deep dossier prose (precision is the floor; the turn is what gets paid for).
- Output variance (the computed strongest-stat reshaping each back).
- A collection / universe hook (timeline → sibling cards).
- A reason to come back (a progressive/second-visit reveal that deepens as the set grows).
- One register-break of wit per card on the free face (funny scores 3–5 on SRC-03/04/05).
- The deeper Halo stats surfaced in the paid panel.
- A species/subject gesture where the owner expects it (SRC-03 the fish; SRC-04 the dog mid-bound).

---

## Recommended next lanes
1. **BR-S105 — P0 leak fix** (small, urgent, law-adjacent; concrete fixes above).
2. **BR-S106 — Front-note + per-card hero-line pass** (P1; the audit supplies the exact replacement lines).
3. Then P2/P3 (output variance, collection hook, paid de-dup) as separate lanes.

All copy fixes stay artifact-only (the audit confirmed zero person-reading in the current cards; the rewrites
must hold that). No runtime changed in this analysis commit.
