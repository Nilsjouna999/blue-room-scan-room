# BLUE ROOM — Rule × Layer Map v1

> STATUS: **DRAFT** — descriptive reconciliation, not ratified law. It **changes no
> rule's scope** by existing. Honest-status doc, sibling to
> `docs/governance/READING_DOCTRINE.md` (which it extends). Authority: a MAP / index —
> **pointers + status only; canon stays at each rule's source** (GOVERNANCE_OS
> one-canonical-statement rule). Read the **enforcement** column before the binding column.

*Provenance: forged from a 10-agent workflow (5 source-readers → 4 adversarial lenses incl.
an over-restriction lens, a laundering-trap lens, and a kill-advocate → 1 synthesizer);
86 raw rules across 6 docs + `scan-contract.js`, deduped to 29 rows. Line/section
citations spot-verified against the cited files. BR-S066, 2026-06-18.*

---

## The problem this fixes (blurred lines)

The Reading Doctrine already commits to **two walls** — never-COMPUTE / never-CONSTITUTE
(Wall 1) and never-SURFACE (Wall 2). But across GOLDEN_NUGGETS, HUMAN_READ_LINE_V1,
UNIVERSE_ZONE_MAP §7, READING_DOCTRINE, PROJECT_OS, HALO_GATE_BOUNDARY and
`scan-contract.js`, the **same words** ("worth", "rate the person", "no streaks",
"re-authorable cue") are stated at **different layers in different docs**. So rules get
conflated **two ways**:

- **Over-restriction** — an OUTPUT rule ("never *show* a worth rating") is dragged onto the
  engine and used to **ban legitimate deep computation** (the builder's flagship complaint).
- **Laundering (H1)** — a DEEP rule ("never *compute* worth", "no person-key join") is
  softened to a display rule ("we compute it, we just don't show it" — the profiler's alibi).

The fix is to force every rule to declare **which layer its harm actually lives at**, and
**whether the harm survives "we computed it but never showed it."** Same principle, one home.

---

## The four layers

| Code | Layer | What binds here |
|---|---|---|
| **BE** | **Back-End** — engine / scan compute | what is DERIVED or inferred (the cue a read keys on; quantities constituted in an embedding). Harm exists the instant the value is computed, even privately, even if discarded. *Empty today (State A); a real engine is State B, where most deep claims become promises a post-inference validator can't verify.* |
| **BL** | **Baseline** — the ScanResult / record shape | what is CONSTITUTED / keyed / retained (the canonical fields, the join key, persistence). The **one layer where a future guarantee can be structural** (schema-enforceable), not merely promised. |
| **FF** | **Front-Facing** — what is surfaced | which claims, modules, scores, nav, structure are DELIVERED. The same underlying compute is permitted regardless. |
| **PP** | **Painting / Phrasing** — copy + presentation | wording, grammatical subject, tone, framing connotation, palette, layout. Harm is curable by **rewording**, touching no compute or data. |

---

## The binding test (apply to every rule)

1. Construct the case: *"the engine COMPUTED the forbidden thing, but it never appears in any
   record or on any surface."*
2. **Harm remains?** → **BINDS-DEEP**. Locus = BE (the derivation) and/or BL (the
   keying/retention). *e.g. inferring age/biology, keying a join on a person, retaining a
   cross-pull count, constituting an `attractivenessScore` field.*
3. **No harm, because harm only exists once something is delivered?** → **OUTPUT-ONLY**.
   Locus = FF and/or PP. *e.g. no public 0–100 (raw numbers may exist internally), no paywall
   wording, deadpan voice, card-stays-compressed.*
4. **Both halves?** → **MIXED** — keep the halves **separately labelled**, each with its own
   enforcement. **Never collapse a MIXED rule to one BINDS-DEEP cell** (for the worst
   offenders the enforced half and the deep half are *disjoint*; fusing them hides the gap).

> **Anti-laundering caveat (the whole reason this axis exists), bidirectional:**
> OUTPUT-ONLY must **never** be read as "compute anything, just don't show it." **And** its
> inverse is equally forbidden: a post-inference output filter (a key-walk, a string-walk, a
> self-attested boolean) must **never** be labelled BINDS-DEEP / BE — proving a word is absent
> from the *delivered* object proves **nothing** about what was *derived* upstream. That is the
> alibi in reverse.

> **Enforcement is a CO-EQUAL column, never subordinate to binding.** *Binding* says where the
> harm lives; *enforcement* says whether anything actually stops it. A rule is routinely
> **BINDS-DEEP and ASSERTED_NOT_ENFORCED / POLICY_PROMISED** — that is the honest norm for the
> deepest walls. A BINDS-DEEP label is **not coverage**.

Enforcement vocabulary (honest-status, from the Reading Doctrine): `CODE_ENFORCED` ·
`SHIP_GATED` (ships with the engine or the engine doesn't ship) · `POLICY_PROMISED`
(validator can't verify) · `ASSERTED_NOT_ENFORCED` (contract, no code) · `ENFORCED_BY_ABSENCE`
(true only because nothing computes yet) · `ASSERTED_BY_CONSTRUCTION` (a static property of how
a file is written) · `LOCKED_CANON` / `ACTIVE_SPEC` (governance grade).

---

## ⚑ The flagship split (do not collapse)

The word **"worth"** lives at two layers and is **two rules**, deliberately kept apart:

| | Rule | Binding |
|---|---|---|
| **Output** | Never RATE/RANK the person in what is **surfaced** | **OUTPUT-ONLY** — the scan reading deeply is *not* the violation; the test is the delivered claim |
| **Deep** | Never COMPUTE a worth / attractiveness / biology rating (Tier B) | **BINDS-DEEP** — violated by the derivation itself, surfaced or not |

This split **is the artifact's reason to exist.** Collapsing it either over-restricts the
engine or under-protects the deep harm.

---

## The map — BINDS-DEEP (harm lives in the compute/keying/retention)

| Rule | Layer | Binding | Enforcement (honest) | Source |
|---|---|---|---|---|
| **Two walls, stated honestly** — commit to never-COMPUTE AND never-SURFACE; always say which is real when; surfacing-discipline is never the whole ethic. *The governor of the whole map.* | BE·BL·FF·PP | DEEP | POLICY_PROMISED (State A = ENFORCED_BY_ABSENCE) | READING_DOCTRINE §one-line claim, §two states, §H1 |
| **Aggregate-refusal wall** — no person-key join; archetype/stat/aura re-derived fresh per scan; no streaks/counts/history; cross-pull surfaces structurally unable to rebuild a stable trait. | BL·BE (+FF) | DEEP | SHIP_GATED · today ENFORCED_BY_ABSENCE · the one legit *structural* future guarantee | UNIVERSE_ZONE_MAP §7; HUMAN_READ_LINE Forbidden·4; READING_DOCTRINE Tier B·3 |
| **Serial = OBJECT address**, never a person address — Object→Scan→Card→Mint; serial-as-join-key is safe *only* because it's an object key. | BL (+BE) | DEEP | SHIP_GATED · today by absence | UNIVERSE_ZONE_MAP §7/§4; GOLDEN_NUGGETS #8 |
| **Tier B permanent set** — never COMPUTE age/ethnicity/gender-as-essence/orientation/health/hardwired-personality or any worth/attractiveness/biology rating, even privately. | BE (+BL) | DEEP | POLICY_PROMISED in State B (a standard encoder entangles these; needs an orthogonalized encoder that doesn't exist) | READING_DOCTRINE Tier B·1–2; HUMAN_READ_LINE Forbidden·2 |
| **Image-act vs permanent split** — read the re-authorable image-act (posture/gesture/gaze/crop/light/styling/role) **freely and deeply on a single photo**; never key on the permanent. *Licenses deep reading; only the permanent half binds.* | BE (+FF·PP for the permanent half) | DEEP | ASSERTED_NOT_ENFORCED · image-act half is an affirmative LICENSE | HUMAN_READ_LINE §reframe; READING_DOCTRINE Layer 1; GOLDEN_NUGGETS #1 |
| **Gate 1 — re-authorable cue (concept)** — a read may key only on the performed set, not body/face/build. *(The cue it KEYS ON — distinct from the output lexicon backstop below.)* | BE | DEEP | ASSERTED_NOT_ENFORCED | HUMAN_READ_LINE §line·gate 1 |
| **Gate 3 — connotation-strip** — strip the photo-noun; if a stable disposition remains, the read has in substance computed a PERMANENT. Rewording does not cure it. *The deepest unguarded seam.* | BE (+FF·PP: the test runs on the surfaced predicate) | DEEP | ASSERTED_NOT_ENFORCED · **Gate 3 does not run in code at all** | HUMAN_READ_LINE §line·gate 3; READING_DOCTRINE Gate 3 + §S6 |
| **Mints the artifact / never inferred** — develop only what the photo ALREADY held; the photo makes the card, declared lore attaches to the serial — never derived by the engine. | BE·BL | DEEP | ASSERTED_NOT_ENFORCED (no engine today) | GOLDEN_NUGGETS #2 + #9 |
| **Single-record retention (H5)** — retain a per-scan record only if object-keyed + no cross-join AND knowing one deep read of an identifiable self-portrait is itself a risk; minimize + time-bound. | BL·BE | DEEP | POLICY_PROMISED · no code minimizes/time-bounds retention | READING_DOCTRINE §H5 |
| **One master card base** — one base layout; treatments restyle, never re-lay-out (a new layout violates it before any user sees it). | BL (+FF) | DEEP | LOCKED_CANON · not checked in code | PROJECT_OS §4/§10 |

## The map — MIXED (keep the halves separate)

| Rule | Layer | Binding | Enforcement (honest) | Source |
|---|---|---|---|---|
| **Raw→facing transform** — steps 1–2 (name cue / frame as effect-on-frame) route output; steps 3–4 (re-authorable / never-fixed-worth) ARE the deep constraints. A forbidden raw read laundered into pretty photo-grammar still carries deep harm. | BE (3–4) + FF·PP (1–2) | MIXED | ASSERTED_NOT_ENFORCED · no transform function exists; deep half must be co-cited with Tier B, never stand alone as the worth wall | HUMAN_READ_LINE §transformation; READING_DOCTRINE Layer 2 |
| **No machinery** — magnetism is already built; **never BUILD** engagement machinery (deep, the constructive twin of no-streaks); **surface live state** (output). | BE (+FF) | MIXED | ASSERTED_NOT_ENFORCED · corollary of the aggregate wall | GOLDEN_NUGGETS #11 (+ #7) |
| **Never claim person-detection** — never assert detected interiority/essence (deep commitment); the viewer completes the meaning (framing copy). | BE (+PP) | MIXED | POLICY_PROMISED · a stance, not a mechanism | READING_DOCTRINE §what-attacks-could-not-take |
| **Archetype is a photo role** — never derive a fixed personality under the role name, even privately (deep); surface a re-authorable, win-neutral role (output). *Archetype SELECTION is itself judgment — audit it against gates 1/3.* | BE + FF·PP | MIXED | ASSERTED_NOT_ENFORCED · no verifier for re-authorable/win-neutral | GOLDEN_NUGGETS #15; READING_DOCTRINE §S6 |
| **Premature-ship guard** — may not constitute a stub/route for Vault/Codex/Card-Record (deep, BL) nor render nav/links to them (output, FF) until built; the sanctioned topbar zone label is fine. | BL + FF | MIXED | ACTIVE_SPEC · build discipline, review-enforced | UNIVERSE_ZONE_MAP §6 |
| **No backend/AI/upload this phase** — don't BUILD upload/backend/login/checkout/db/real-AI (deep, BL·BE); dev mocks must be honestly labelled (output). *Bounded-phase, not a permanent wall (AI allowed LATER, bounded).* | BE·BL (+FF) | MIXED | LOCKED_CANON (this phase) · mirrored by `scan-contract.js` purity | PROJECT_OS §3/§15; HALO_GATE_BOUNDARY §G |
| **Fail-closed contract mechanics** — kind/schema/status/source-mode provenance + no sample-mixing + evidence shape (deep, BL) → safe blocked state, never a rendered analysis (output, FF); the valve is pure (BE). | BL + FF + BE | MIXED | CODE_ENFORCED for the checks · valve purity = ASSERTED_BY_CONSTRUCTION | `scan-contract.js` L138–193, L224–234 |

## The map — OUTPUT-ONLY (harm exists only once delivered)

| Rule | Layer | Binding | Enforcement (honest) | Source |
|---|---|---|---|---|
| **Never RATE/RANK the person in output** — no public worth/attractiveness/face score, no human-as-evaluable verdict in delivered stats/copy. Reading deeply is NOT the violation. *Subsumes gate-2, no-face-rating, "killed at the frame".* **The flagship — hold split from the never-COMPUTE-worth twin.** | FF·PP | OUTPUT | LOCKED_CANON · partially CODE_ENFORCED via the forbidden-terms / person-truth scans **as proxies**, not compute proof | HUMAN_READ_LINE Forbidden·1 + gate 2; UNIVERSE_ZONE_MAP §1; PROJECT_OS §1/§4; GOLDEN_NUGGETS #12 |
| **Insult-via-framing ban / every outcome a win** — a low read surfaces as a *different kind* of artifact, never a worse person. Engine may compute a low band; the duty is reframe-as-win. | FF·PP | OUTPUT | ASSERTED_NOT_ENFORCED | HUMAN_READ_LINE Forbidden·3; GOLDEN_NUGGETS #12 |
| **Recognition vs judgment boundary** — judgment only about the photograph-as-made (re-authorable, win-neutral, receipt-defensible), never the person-as-fixed. *Its only separator is Gate 3 (deep, does not run) — inherits that deep dependency.* | FF·PP | OUTPUT | ASSERTED_NOT_ENFORCED · governed by contract, not mechanism | READING_DOCTRINE §S6 |
| **Reframe is camera direction** — phrased as direction to the SHOOT (camera/crop/light), never advice to improve the person. | FF·PP | OUTPUT | ASSERTED_NOT_ENFORCED | GOLDEN_NUGGETS #14 |
| **Kind not amount / paid = developed deeper** — Free is the COMPLETE front (never a crippled teaser); paid is the same scan developed deeper, a MODE not a grade. **Affirmatively LICENSES deeper paid compute** — BE deliberately omitted. | FF·PP | OUTPUT | LOCKED_CANON (asserted) | GOLDEN_NUGGETS #5; HALO_GATE_BOUNDARY core/§A; PROJECT_OS §10 |
| **Latent→developed / no paywall language** — sealed reads "not yet developed", never "withheld"; CTA "Develop this scan", never Upgrade/Unlock/Premium/Reveal. Tiered compute untouched; only the framing binds. | PP·FF | OUTPUT | LOCKED_CANON (review-enforced) | GOLDEN_NUGGETS #6; PROJECT_OS §4/§10; HALO_GATE_BOUNDARY §C |
| **No exact pre-unlock counts** — Free front + pre-unlock gate use qualitative sealed-back language, no enumerated locked inventory. Counts exist and ARE shown post-unlock ("drop quantification, not truthfulness"). | FF·PP | OUTPUT | LOCKED_CANON (review-enforced) | HALO_GATE_BOUNDARY §B |
| **No public 0–100 / bands only** — public stats are tier bands (Muted/Clean/Strong/Charged/Peak); internal keys stay numeric. The engine may HOLD raw numbers. **The reference OUTPUT-ONLY case — resist every pull toward DEEP.** | FF·PP | OUTPUT | LOCKED_CANON · ASSERTED_NOT_ENFORCED in code (no band check; dev fixtures legitimately store `presence:78`) | PROJECT_OS §7/§9/§10 |
| **Card stays compressed / site carries depth / card-as-link** — the room/record does the deep work and may surface deeply; only the CARD COMPONENT stays a compressed crest + serial link. | FF·PP | OUTPUT | LOCKED_CANON · ASSERTED_NOT_ENFORCED in code | GOLDEN_NUGGETS #3/#4/#10; UNIVERSE_ZONE_MAP §1/§3/§4 |
| **Deadpan archival voice + felt-not-traversed** — analyst serious / situation absurd; floor wash one static neutral tone (color is currency); nav = one zone label off `state.view`, not a zone-graph. | PP (+FF for nav) | OUTPUT | ACTIVE_SPEC (revisable forks) | GOLDEN_NUGGETS #13/#10; UNIVERSE_ZONE_MAP §3 |
| **Forbidden-terms walk + safetyFlags + value-misuse** (`scan-contract.js`) — rejects forbidden terms in non-schema keys / string values, a non-numeric `value` key, and requires the 4 safetyFlags false. **An output floor over the already-formed object — proves nothing about upstream compute; synonym-/nesting-evadable; flags are self-attested.** | FF·PP·BL (field-shape only) | OUTPUT | CODE_ENFORCED · but a path-limited, evadable output floor / self-attestation, **not** a derivation proof. The deep wall it gestures at is Tier B (separate row). Enforced set is exactly 4 flags (`containsPersonTruthClaim` is docs-only). | `scan-contract.js` L33–125, L169–201; READING_DOCTRINE Tier A |
| **Person-truth narrative scan** (`scan-contract.js`) — 5 literal regexes over `artifact.title` + `readings.*` only. **An output-surface check by construction; trivially evadable ("you carry yourself with quiet authority" passes). Must not be cited as DEEP.** | FF·PP | OUTPUT | CODE_ENFORCED (2 paths, 5 strings; narrow by design) | `scan-contract.js` L60–66, L204–217; READING_DOCTRINE Tier A |

---

## Scope-conflicts found (graded)

The map **changes no LOCKED rule's scope** — every split below is a *reconciliation*, not a
relaxation, so **no Core Change Review is triggered**. Grades: `CLARIFICATION_ONLY` (the map
just names the layer) · `WARRANT_DEBT` (a duplicate-id / collapse needs reconciling at the
source docs → TASK_QUEUE, rides the holding clock) · `CORE_CHANGE` (would change a LOCKED
rule's scope → **none**).

- **`scan-contract.js` floor: DEEP vs OUTPUT** — one code mechanism was tagged both ways
  across docs. Resolved **OUTPUT-ONLY** (it runs over the already-formed object). Never
  co-cite `CODE_ENFORCED` with a DEEP/BE claim for it. *(CLARIFICATION_ONLY)*
- **Gate 1 duplicate id** — `hrl-gate1` (deep, the cue keyed on) vs `rd-gate1` (the
  FORBIDDEN_TERMS output lexicon backstop) collide under one id. Split: gate1-CONCEPT (DEEP)
  vs gate1-CODEFLOOR (folded into the output-floor row). *(WARRANT_DEBT)*
- **Gate 3 duplicate id** — `hrl-gate3` (DEEP) vs `rd-gate3` (OUTPUT) merged; DEEP wins
  (harm survives non-display). The merge masked that this is the deepest *un-running* seam.
  *(WARRANT_DEBT)*
- **MIXED-collapse anti-pattern** — the instinct "MIXED → take strictest set → relabel DEEP"
  was actively re-creating H1 in reverse (for #1/#7 the enforced half and the deep half are
  disjoint). The binding test now **mandates keeping halves separate**. *(WARRANT_DEBT)*
- **Aggregate wall fragmentation** — one wall, 8+ restatements, 3 status labels. Collapsed to
  one canonical row with a compound honest status; never relax a single instance alone.
  *(CLARIFICATION_ONLY)*
- **`n5` BE-in-layers / `n4` vs `n10` / no-0–100-drift / worth-blur / premature-ship
  prose-vs-cells / 5th-safetyFlag / State-A-as-CODE_ENFORCED / valve-as-SHIP_GATED / bare
  doctrine path** — all corrected in the rows above. *(CLARIFICATION_ONLY)*
- **Stale "live offender"** — the prior draft cited `renderFreePullMock` printing "Map exists
  — 2 image levers…" as a live boundary breach. **Verified remediated**: that string no longer
  exists; `renderFreePullMock` (app.js ~L1469) uses qualitative "sealed back · in
  conservation" copy. The doc spec (HALO_GATE_BOUNDARY §G) still calls it a gap → update §G in
  a hygiene pass so the doc stops generating stale citations. *(CLARIFICATION_ONLY)*

---

## How to use this map

- **Deciding where a rule binds** → run the binding test. If a proposed feature is blocked by
  an OUTPUT-ONLY rule applied to the engine, the rule is being over-restricted — the back-end
  may compute more; bind the OUTPUT instead.
- **Reading any deep wall** → read its **enforcement** in the same row; a DEEP label is never
  coverage. Most deep walls are promises today.
- **Citing a rule** → cite its **source**, not this map (place-once). This map is the index.

> **Honest caveat (the kill-advocate's, adopted as law):** this map is safe **only while
> `enforcement` is read before `binding`.** If a future reader ever sorts or filters by
> `binding` and treats DEEP as "handled", the map manufactures false confidence and should
> **fold back into `READING_DOCTRINE.md`.** Its unique value over the doctrine is the
> cross-doc dedup + the duplicate-id resolution, not the binding taxonomy itself.
