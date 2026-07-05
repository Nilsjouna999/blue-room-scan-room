\# S5 — Normalize Doc 05 (the "reads-as / you" bridge)

Source: `05_reads_as_you_bridge.md` (aura-gpt research). Cross-checked against repo: `docs/BR-AURA-RESEARCH.md`, `docs/DECISION_LOG.md` (BR-S113), `docs/COPY_SYSTEM.md`, `docs/TASK_QUEUE.md`, `docs/governance/READING_DOCTRINE.md`, `data.js`.

---

\## 1. The two-part bridge system

Doc 05's core claim: the highest-yield move is not one phrase but a **two-part system**, run in strict order:

1. **Interpretive hinge** — assigns charge to the IMAGE/gesture/frame. Grammatical subject = the artifact, never the person.
2. **Viewer-transfer clause (optional)** — assigns a felt *consequence* to the viewer, in second person, naming a perceptual event, not a relationship or a verdict on the sitter.

Formula: **cue → charge → transfer**. Hinge is mandatory-ish (default sentence shape); transfer clause is an occasional intensifier, not every card.

This maps cleanly onto repo Rule 0 / BR-S113: the hinge is what keeps the grammatical subject on the artifact (BR-S113's core test — "if a sentence's grammatical subject is the person, it has fallen off the cliff," `docs/BR-AURA-RESEARCH.md:5`). The transfer clause is the ONE place doc 05 wants second-person address to live in Aura, cordoned to a "brief, cue-bound, late" clause.

\## 2. Ranked bridge table (doc 05 verbatim ranking, condensed)

| Rank | Bridge | Use | Risk |
|---|---|---|---|
| 1 | **reads as** | default Aura sentence | formulaic if repeated every card |
| 2 | **you …** | final clause, second sentence | fake if overfamiliar/overlong/prescriptive |
| 3 | **plays as** | performance/pose/withholding/bravado | mannered if overused |
| 4 | **lands as** | verdict sentence after evidence is established | weak if used before cues are shown |
| 5 | **carries** | sustained tonal description | soft/generic without a concrete cue |
| 6 | **holds/keeps/lets/leaves** | premium — hides the hinge inside the verb | needs stronger sentence craft |
| 7 | **feels like** | occasional loose line | cliché-prone, "vibes"-adjacent |

Doc 05's style point: "reads as" should be the backbone, not the whole style — premium criticism hides the bridge inside verbs (holds/keeps/lets/leaves) rather than announcing "reads as" every time.

\## 3. Second-person rules (the load-bearing part of this doc)

- **Short.** One clause, not a sentence-and-a-half.
- **Late.** Placed after the image-read has already done the work — never opens the line.
- **Cue-bound.** Must trace to a specific visible thing in THIS frame — passes the **swap test** (would it still work with a different sitter in the same pose/crop/light? if yes, it's about the image).
- **Two-second test.** The viewer could plausibly feel the named effect within two seconds of looking, with no biography, trust, empathy, or moral judgment required. If it needs any of those, it's over the line.
- Good: `you stop`, `you flinch`, `you keep looking`, `you get checked at the glass`, `you lean in`.
- Bad (identical grammatical slot, fails immediately): `you realize he is kind`, `you trust him`, `you know she is lonely` — these invent a person instead of reporting a viewing event.

\## 4. The three-way rewrite table (doc 05, full)

| Visible observation | BANNED person-diagnosis | SAFE image-read (hinge) | SAFE viewer-transfer |
|---|---|---|---|
| Raised palm near lens; warm cabin; cold window edge | He is calm but guarded. | The gesture reads as a warm refusal: the hand stops first contact, but the cabin keeps the frame hospitable. | You get checked at the glass, then allowed to stay in the warmth behind it. |
| Sidelong gaze; answer kept offscreen | She seems anxious and distracted. | The glance plays as interrupted attention; the frame withholds the reason. | You follow her eyes out of the frame and feel the scene refuse to resolve. |
| Bent posture over a tool in an open ice field | He is stoic and hardworking. | The body lands as pure function: bent into the task, not offered for identification. | You feel the labor before you feel the person. |
| Tight crop and partial shadow across the face | He is secretive. | The crop carries concealment; the shadow does the withholding. | You lean in for access and the image denies full entry. |
| Open smile in a harsh/utilitarian setting | She is resilient and optimistic. | The smile reads as a bright note against a hard setting — less innocence than counterpressure. | You register the softness because the surroundings refuse it. |
| Direct stare, little room to retreat | He is intense and confrontational. | The stare plays as direct address; the frame gives almost no exit route. | You feel seen before you get time to judge. |

Pivot is grammatical, not tonal: banned = person is subject of a hidden-state claim; safe image-read = the gesture/crop/light is subject; safe viewer-transfer = the viewer's perceptual event is subject. Doc 05 flags "subject" itself as a weak noun (still pulls toward biography) — prefer **gesture, look, hand, crop, frame, edge, pose, light, cabin, window, silhouette**.

\## 5. The four-zone filter, mapped onto the repo's real systems

Doc 05's Record/Read/Reach/Ban ladder maps directly and cleanly onto Blue Room's shipped section split:

| Zone | Doc 05 test | Repo system it maps to | Repo examples |
|---|---|---|---|
| **Record** | Neutral witness/archivist/police report could verify it | **Diagram / Surface / Metrics** (evidence, coordinates, stat receipts) | `raised palm obscures the key`, `window band visible at right`, `red jacket against grey interior`, `gaze directed off-frame` |
| **Read** | Interprets what the image DOES, anchored to visible evidence | **Aura** (the section this doc feeds) | `reads as a stop that doesn't fully reject`, `plays as interrupted attention`, `carries a cold edge` |
| **Reach** | Names a brief, plausible viewer consequence | **Aura**, as an optional trailing clause only — never its own section | `you stop`, `you lean in`, `you keep looking`, `you feel the labour first` |
| **Ban** | Asserts a stable trait/motive/morality/trauma/private feeling of the sitter | **BR-S113 kill zone** — code-adjacent floor is `PERSON_TRUTH` regex + `FORBIDDEN_TERMS` in `scan-contract.js` (per `docs/governance/READING_DOCTRINE.md:52-54`) | `he is lonely`, `she is confident but fragile`, `he wants control`, `she trusts you`, `he is protective by nature` |

This gives Aura its operational shape: Aura is allowed to occupy BOTH Read and Reach (hinge sentence + optional trailing viewer clause); it must never slide into Ban; and it must not duplicate Record (that's Diagram/Surface/Metrics' job — a redundancy risk already flagged in the mission brief as "decay-to-Frame-Event" / Comp-Field overlap).

Doc 05's summary heuristic: *"If it can be verified, it is Record. If it can be argued from visible cues, it is Read. If it reports an immediate spectator effect, it is Reach. If it claims a private interior, ban it."*

\## 6. The two stress tests (both survive as operational gates)

- **Swap test:** sentence must still plausibly work with a different sitter, same pose/crop/light. If it collapses without THIS person's presumed inner life, it's diagnosis, not image-read. Use on every hinge AND transfer clause.
- **Two-second test:** the viewer could plausibly feel the named effect within two seconds of looking, no biography/trust/empathy/moral read required. Use specifically to gate transfer clauses.

Both tests are cheap, human-runnable (not code-enforced) checks — they belong in an authored-copy checklist, not a validator, consistent with ground truth #5 (authored-first, no templated generation).

\## 7. Hide-the-bridge-in-verbs guidance

Doc 05's Pattern B is the "premium" register: skip the explicit hinge word entirely and let a verb carry the charge — `[image noun] + holds/keeps/lets/leaves + [charge]`. Example given: *"The window keeps one edge cold."* This reads as MORE expensive than repeating "reads as" every card, and is the doc's own antidote to its risk #1 (hinge-word formula fatigue). Recommend this as the ceiling register for Aura, with explicit "reads as" as the reliable default when a card needs unambiguous critical framing.

Contradiction-pair structure (doc 05's "most useful emotional structure"): refusal/welcome, menace/hush, distance/invitation, hold/leak, warmth/frost, dare/calm. This is the same shape as the Subtraction Gate's relation-kind spine (ground truth #3) — a two-term tension, not a single adjective — and reinforces that Aura's job is relational, not descriptive.

---

\## CONFLICTS (for O6/F1 — not resolved here)

\### CONFLICT 1 — Doc 05's headline recommendation (second-person as a load-bearing bridge device) sits against a REPEATED, RATIFIED repo pattern of removing second-person address from shipped copy.

Evidence the repo has actively retired "you" language, multiple times, citing "second-person address" as the defect itself (not as a craft-quality issue):
- `docs/COPY_SYSTEM.md:80-81` — "The image does not **wait to be** observed. It answers." explicitly retires "the old 'does not let **you** observe' read... second-person address" (Render Archetype Discovery Note v1, 2026-06-14).
- `docs/COPY_SYSTEM.md:230-231` — Field Silence hidden stat: "…Nothing here was performed **for the lens**" retires "the old 'performs for **you**' read... second-person address" (data.js Copy System Audit v1, 2026-06-13).
- `docs/audits/DATA_COPY_SYSTEM_AUDIT_V1.md:10` — verdict states flatly: "**no second-person person-address**... survives in any visible reading string" as a PASS criterion.
- `docs/audits/DATA_COPY_SYSTEM_AUDIT_V1.md:35` — a fix was applied specifically because a doc's own canon benchmark ("performs for you") still had second-person in it, citing "§2 (second-person address)."
- `docs/audits/SAMPLE_ROOM_18_STATE_AUDIT_V1.md:68` — fixed "…performed **for you**" → "…performed for the lens" citing "second-person viewer address."
- `docs/TASK_QUEUE.md:1711-1716` — an OPEN backlog item to de-second-person two more archetype notes ("your attention," "arranged for you") "before either class is ever surfaced" — i.e., second-person removal is a standing rule applied prospectively, not a one-off cleanup.
- `docs/governance/READING_DOCTRINE.md:47` — Layer 3 (FACING) states as a contract: "No second-person identity claim... only partially backstopped."

Against this: `docs/BR-AURA-RESEARCH.md:94` — the repo's OWN safe-rewrite example for the exact "aura/presence/magnetism" cliché is itself second-person: *"the frame keeps you at arm's length — near but walled off by the turned shoulder and the glass."* This line is presented as the canonical SAFE pattern in the doc that governs Aura directly, and it has not been flagged or retired the way the other "you" lines were.

**What needs a human call:** is the repo's second-person retirement rule (a) a blanket ban on any "you" in shipped copy anywhere, which would mean BR-AURA-RESEARCH.md:94's own example is already in violation and doc 05's Reach zone is DEAD on arrival for Aura; or (b) a narrower rule specifically about "identity-claim" or "for-you" flattery/address patterns (consistent with `PERSON_TRUTH`'s actual regex scope — `you are`, `you're`, `your (personality|character|soul|worth|value|iq|future)` — which bans "you ARE X" / possessive-identity "your X" but does NOT syntactically catch a bare perceptual clause like "you stop" or "you keep looking"). The retired examples ("does not let you observe," "performs for you," "arranged for you," "including your attention") are all either passive-observer address or possessive-flattery shapes — arguably a different grammatical family from doc 05's proposed "you stop / you flinch / you get checked at the glass" (active, momentary, viewer-body verbs). If O6/F1 read it as (b), doc 05's Reach zone can survive narrowly-scoped; if (a), Reach is dead for Aura and the "arm's length" line in BR-AURA-RESEARCH.md itself needs a retroactive fix. **Do not let this synthesis silently pick.**

\### CONFLICT 2 — Provenance/section-boundary risk (not a doc-vs-doc conflict, a doc-05-vs-mission-brief note)

Doc 05 never anchors its Read-zone examples to `src.stance` or discusses provenance at all — it's silent on where the Aura hinge sentence should be SOURCED from. The mission brief's ground truth #3 requires Aura's provenance to point at `src.stance` (already-shipped prose field, confirmed live at `data.js:269,456,589,721,854` and rendered as `haloRead`/`reading` at `data.js:996,1017`). This is not a contradiction, just a gap: doc 05 supplies the SENTENCE-LEVEL grammar (hinge + transfer), but the mission's Subtraction Gate spine supplies the FIELD-LEVEL anchor (one ordinal band + one kind-word + provenance = stance). O6/F1 should treat doc 05 as governing the prose register of the one verdict LINE that sits under/beside the band+kind-word, not as proposing a new field.

---

\## Zone-3 (Reach) survival check — which named-emotion / viewer examples live vs. die under the LOCKED law

**Pass the locked law (image-anchored, momentary, no interior claim, no possessive-identity grammar):**
- `you stop`
- `you flinch`
- `you keep looking`
- `you get checked at the glass`
- `you lean in`
- `you feel the labour first` (borderline-pass: "labour" is observable image content — the body doing visible work — not an attributed feeling; passes swap test)
- `you feel seen before you get time to judge` (borderline-pass: names a perceptual/optical event — direct eye-line returning the look — not a claim about the sitter's intent; still worth a second look under Conflict 1's stricter reading)

**Die immediately (named-emotion payload, private-interior claim, or possessive-identity grammar banned outright regardless of which side of Conflict 1 wins):**
- `you realize he is kind` — attributes a stable trait via the viewer's "realization"; fails swap test (collapses without this specific sitter's presumed character).
- `you trust him` — invents a relationship; fails two-second test (trust cannot form in 2 seconds without biography).
- `you know she is lonely` — direct named-emotion label on the sitter; double-banned (BR-S113 no. 5 + kill-list "resolved-feeling clause").
- `he is calm but guarded` / `she seems anxious and distracted` / `he is stoic and hardworking` / `he is secretive` / `she is resilient and optimistic` / `he is intense and confrontational` — all six banned-column entries from the doc's own rewrite table; every one makes the person the grammatical subject of a hidden-state claim, the exact BR-S113 cliff test.
- Any construction matching `PERSON_TRUTH`'s literal regex family (`you are…`, `you're…`, `your (personality|character|soul|worth|value|iq|future)`) — code-adjacent banned regardless of doc 05's framing.
- The already-retired repo lines `"does not let you observe"`, `"performs for you"`, `"arranged for you"`, `"including your attention"` — these read as possessive/address flattery rather than a momentary perceptual event, and should NOT be resurrected under doc 05's Reach banner without O6/F1 explicitly overturning their retirement (see Conflict 1).

**Verdict for synthesis purposes:** doc 05's mechanics (two-part bridge, ranked hinge table, swap test, two-second test, four-zone filter, cue→charge→transfer pattern, verb-hidden bridges) are clean, repo-compatible, and should be normalized into the Aura spec as the SENTENCE-CRAFT layer sitting on top of the Subtraction Gate's field-level spine. The Reach zone (second-person transfer clause) is the one piece that is NOT safe to normalize as-is — it must be flagged to O6/F1 as contingent on resolving Conflict 1, because the repo's own audit trail has treated "second-person address" as a defect-in-itself at least four separate times, independent of whether the specific clause was diagnosing the person or not.
