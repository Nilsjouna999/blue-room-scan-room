# O3 — PERSON-SAFETY ADJUDICATOR: The Aura Safety Gate

**Role:** O3 in the 25-agent Aura fleet. **Job:** turn docs 03/05 research into an OPERATIONAL GATE subordinated to BR-S113 (LOCKED). **Status:** READ-ONLY synthesis; ships nothing.

**The one sentence everything is judged against:** Aura must read what the image does — charged, terse, verdict-shaped — WITHOUT diagnosing the person, and without becoming a second Diagram/Surface/Metrics/Oracle. This gate is the mechanism that keeps the "without diagnosing the person" half true while the rest of the fleet chases the "charged/terse/verdict" half.

**Image note:** `1783253951358_image.png` confirmed absent — not in repo root, not in `Downloads`, no filename match anywhere under the repo (checked). Proceeding without it; not a blocker for O3's deliverable, which is text-law, not visual.

---

## PART A — GROUND-TRUTH ANCHORS (verified against repo, cite file + grep anchor)

Every rule below traces to a live repo string, not to research. Where research and repo disagree, repo wins and I flag it in CONFLICTS.

1. **The LOCKED law, verbatim** — `docs/BR-AURA-RESEARCH.md`, grep anchor `RULE 0 (governing boundary, LOCKED — BR-S113)` (line 5): *"A card reads the ARTIFACT, never the PERSON. Every aura read names an IMAGE-PROPERTY or a PERFORMED GESTURE-INTENT (the event in the frame), never the person's worth, body, rank, identity, or private feeling. If a sentence's grammatical subject is the person, it has fallen off the cliff."*

2. **The five absolute no's** — `docs/HANDOFF.md` (grep anchor `five absolute no's`, lines 27–31): ① worth/character · ② health/body · ③ ranking vs others · ④ identity (job/class/status/relationships/story-as-fact) · ⑤ attributed private feeling/mood. **One allowance:** performed gesture-intent — *what the action publicly does in-frame* ("the palm stops the lens"). **The allowance's own test** (HANDOFF line 30): "the intent the gesture performs (allowed) vs a claim about hidden feeling (banned)."

3. **The kill-on-sight list** — `docs/BR-AURA-RESEARCH.md`, grep anchors `### A. Aura cliché` (line 84) and `### B. Rule-0 safety-drift phrases` (line 93). Bans, verbatim: free-floating mood-words (haunting/evocative/moody/atmospheric/ethereal); the pathetic fallacy; **the resolved-feeling clause** ("…which evokes/conveys/creates a sense of…" — "Point at the fact and STOP"); the stacked-adjective pile; the stock-frame ceiling; a computed emotion LABEL sold as truth; color-psychology as fact.

4. **The repo's own SAFE rewrites** (the model to imitate) — same doc, §B:
   - "she has a powerful aura/presence" → **"the frame keeps you at arm's length — near but walled off by the turned shoulder and the glass."**
   - "their eyes are intense/piercing" → **"a direct eye-line vector returns the viewer's look."**
   - "makes you feel small" → **"a tiny subject under a dominating field; the lone focal point draws the eye across it."**
   - "home of a lonely person" → **"patina, one lit threshold, an implied beyond."**
   These are the register. Note the one surviving second-person clause ("keeps **you** at arm's length") — this is the Reach precedent, and it is a spatial fact ("you stay at a distance"), never an emotion.

5. **The code floor is thin and does NOT scan aura** — `docs/governance/READING_DOCTRINE.md`, grep anchor `TIER A` (lines 51–61): `FORBIDDEN_TERMS` = 26 substring/whole-word terms (attractiveness, beauty, race, gender, age, health, diagnosis, disorder, personality, iq, class, alpha, beta, value, worth, rank, skull, jaw, canthal, dimorphism, biology, genetic, breed, …). `PERSON_TRUTH` = exactly 5 regexes (`/you are/`, `/you're/`, `/this proves/`, `/proves (that )?you/`, `/your (personality|character|soul|worth|value|iq|future)/`) over ONLY `artifact.title` + `readings.*`. **Line 59, verbatim: PERSON_TRUTH "does NOT scan `aura` / `evidence` / `discoveryNote`."** The doc calls the floor "trivially synonym-evadable" (line 44): "the stance reads as dominant," "high status signal," "the gaze reads predatory" all PASS.

   **Operational consequence — the load-bearing fact of this whole gate:** for the Aura field, there is effectively **no code backstop**. This gate is the ONLY wall. It is a human checklist run at authoring time; it cannot delegate to the validator, because the validator does not read the field. Treat every rule below as manually enforced or unenforced — never "the code will catch it."

---

## PART B — THE FOUR-ZONE FILTER, WIRED TO THE REPO (the operational spine)

Doc 05's Record/Read/Reach/Ban ladder is the gate's skeleton. Below it is mapped to Blue Room's shipped systems and the code floor, so a builder knows exactly which zone a candidate line lives in and where it must NOT go.

| Zone | Test | Blue Room home | Aura allowed here? | Repo example (from the 5 real sources) |
|---|---|---|---|---|
| **RECORD** | A police report / archivist could verify it. Pure witness. | Diagram · Surface · Metrics · `receipts[]` | **NO — duplication risk.** If an aura line is verifiable-as-fact, it belongs to Diagram/Surface. Aura reading it back = "decay-to-Frame-Event." | `"raised palm obscures the key"`, `"window band visible at right"`, `"hard specular band across the dorsal shell"` |
| **READ** | Argued FROM visible cues; interprets what the image DOES. | **AURA (the hinge sentence)** | **YES — this is Aura's primary zone.** | `"half stop-sign, half salute"`, `"the auger converts the frame's energy into a single downward vector"` |
| **REACH** | Reports a brief, immediate SPECTATOR effect. | **AURA — optional trailing clause ONLY**, never its own section | **CONTINGENT (see CONFLICT 1).** If permitted: short, late, cue-bound, bodily/perceptual — "you stop / you keep looking." NEVER an emotion or relationship. | `"the frame keeps you at arm's length"` (repo's own canonical Reach) |
| **BAN** | Asserts a stable trait / motive / morality / body / identity / private feeling. | **BR-S113 kill zone** | **NEVER.** Code floor is `PERSON_TRUTH` + `FORBIDDEN_TERMS` — but it does NOT scan aura, so this zone is human-enforced only. | `"he is calm but guarded"`, `"she trusts you"`, `"protective by nature"` |

**The one-line heuristic (doc 05, adopted):** *Verifiable → Record. Arguable from cues → Read. Immediate spectator effect → Reach. Private interior → Ban.* Aura occupies **Read** (always) + **Reach** (optional, contingent), and must never touch Record (redundancy) or Ban (safety).

---

## PART C — THE GATE AS A STEP-BY-STEP CHECKLIST

Run in order on **every** drafted Aura line. First failure = kill and rewrite; do not "fix in place" by hedging — hedging a banned payload is the exact failure mode BR-S113 was written to catch (S3 §2). Steps 1–4 are the safety wall; steps 5–6 are the non-duplication wall; step 7 is the register check.

**STEP 0 — Provenance check (precondition, not safety).** Does the line synthesize `src.stance` rather than invent a new claim? (Ground truth #3: provenance = stance.) If the line asserts something not backed by the stance/receipts, it is unanchored — reject before you even reach safety. *E.g. SRC-01 stance = "half stop-sign, half salute … neither departing nor stationary" — a Standoff/suspension read is anchored; a "warmth" read must trace to a receipt like the `Expression Band` cue, not free-associate.*

**STEP 1 — GRAMMATICAL-SUBJECT TEST (BR-S113's own test; the master gate).** Read the sentence's true grammatical subject. Is it the **image / frame / gesture / crop / light / edge / hold / vector / hand / palm / silhouette** — or the **person**? If the subject is the person (he/she/they/his/her, or a body part standing in for the person's will — "his jaw," "her chin knows"), **it has fallen off the cliff. KILL.** No amount of trailing hedge ("…reads as," "…feels like") rescues a person-subject sentence. Note: "subject" itself is a weak noun that drifts toward biography (doc 05) — prefer concrete image nouns.

**STEP 2 — SWAP TEST (re-authorability).** Would the sentence still work with a different sitter/animal/specimen in the same pose/crop/light? If it collapses without *this specific* person's presumed inner life or character, it is diagnosis, not image-read. **KILL.** (Run on the hinge AND any transfer clause.)

**STEP 3 — CONNOTATION-STRIP TEST.** Remove the photo-noun. Does a stable disposition remain? "The braced shoulders" → strip → "guarded person" remains → **KILL.** (This is Gate 3 in `READING_DOCTRINE.md` line 42 — "the only named separator for the moment/person boundary — and it does not run." So YOU run it.)

**STEP 4 — TWO-SECOND TEST (gates the Reach/transfer clause specifically).** Could a viewer plausibly feel the named effect within two seconds of looking, needing NO biography, trust, empathy, or moral judgment? "You stop" — yes. "You trust him" — no (trust needs biography). **If it needs any of the four, KILL the clause.**

**STEP 5 — KILL-LIST SWEEP.** Scan the payload word-by-word against `docs/BR-AURA-RESEARCH.md` §4. Any hit = **KILL**:
   - **(5a) Named-emotion payload** behind ANY bridge — "reads as loneliness," "the sting of contempt," "recoil of shame," "lands as menace." The bridge (reads/lands/plays/carries) is legal; the emotion-word AFTER it is the resolved-feeling clause, banned outright.
   - **(5b) Free-floating mood-word** — haunting/evocative/moody/atmospheric/ethereal.
   - **(5c) Pathetic fallacy** — "the sky mourns," "the lake holding its breath," "the lake grieves." **BANNED FLAT — no optical-property carve-out** (F1 ruling; the repo kill-list at `BR-AURA-RESEARCH.md` §4A bans the form by name). The safe pattern is a residue VERB naming the optical fact with no attributed interior: *"the ice keeps the rest."*
   - **(5d) Stacked-adjective pile** — "raw, powerful, unforgettable."
   - **(5e) Color-psychology-as-fact** — "warm = cozy," "red = passion." (Only saturation/brightness→arousal is shippable; hue→feeling is not.)
   - **(5f) Face-affect read** — "clenched jaw," "tightened mouth," "the smile that doesn't reach the eyes." H3 flags these as banned (Barrett 2019 + direct person-read). Use gaze-AXIS or head-turn instead ("eye contact redirects to the task" — SRC-02's own live copy).
   - **(5g) FORBIDDEN_TERMS collision** — never use the 26 code-floor words as prose even where they'd pass the human read (class/value/rank/worth/breed etc.). The floor whole-word-matches them in string values.

**STEP 6 — RECORD-DUPLICATION TEST (non-negotiable, from ground truth #3).** Does the line merely restate a `receipt`, a Diagram label, or a Surface coordinate? If a neutral archivist could have written it verbatim, it is Record, not Read — it belongs to Diagram/Surface/Metrics. **KILL** (rewrite as the RELATION between two co-present elements, not a single-element fact). This is the "second Diagram" guard.

**STEP 7 — REGISTER CHECK (voice, not safety, but ship-gating).** (a) Is the bridge over-used? "Reads as" ≤ ~60% of lines; hide the rest inside verbs (holds/keeps/lets/leaves/presses/cools). (b) Is it terse and verdict-shaped — one setup, one turn — not a paragraph? (c) Does it BUILD toward Oracle without pre-spending the verdict (ground truth #7: Aura = last FELT beat, Oracle = last SPOKEN beat)? If Aura already delivers the full viewer consequence, Oracle has nowhere to go — pull it back.

**PASS = all seven clear.** Only then may a human author the final line (ground truth #5: machine proposes anchor evidence, human writes; no templated generation).

---

## PART D — THE IS→READS-AS PIVOT (scope-limited)

The pivot **survives as a mechanic** (S3, S5) but is scope-locked:

- **USE it** to move a claim off the person and onto an image-fact: `is` → `reads as / plays as / lands as / carries / holds / keeps / lets / leaves`. Preferred landing register = the "premium" verb-hidden form (doc 05): the verb embeds the image as subject — *"The window keeps one edge cold."* This is the ceiling; explicit "reads as" is the reliable default.
- **NEVER** let the pivot land on a named emotion. The pivot's ONLY legal payload is an image-property, a frame-geometry noun (Standoff/Edge/Figure-Ground/Light-Fit/Vector-into-Void — ground truth #3), or a spatial/optical fact. "Reads as loneliness" is the killed pattern; "reads as a stop that doesn't fully reject" is the survivor.
- **The bridge-word does not launder the payload.** Moving the adjective one clause to the right (doc 03's move-the-adjective heuristic *as doc 03 practiced it*) is explicitly DEAD — see CONFLICT with doc 03 below.

---

## PART E — VIEWER-TRANSFER (REACH) CLAUSE RULES

Applies ONLY if CONFLICT 1 is resolved in Reach's favor by O6/F1. Until then, treat second-person as **frozen pending human call** and default to hinge-only lines.

If permitted, a Reach clause must be ALL of:
- **Short** — one clause, not a sentence.
- **Late** — after the image-read has done the work; never opens the line.
- **Cue-bound** — traces to a specific visible thing in THIS frame; passes the swap test.
- **Bodily / perceptual** — a viewing EVENT, not a feeling or a relationship. The viewer is NOT the photographed person.

| LEGAL Reach (image/perceptual event) | ILLEGAL Reach (invents a person / possessive-identity) |
|---|---|
| "you stop" | "you trust him" (relationship; fails two-second test) |
| "you keep looking" | "you feel his loneliness" (named emotion + interior claim) |
| "you get checked at the glass" | "you realize he is kind" (stable trait via "realize") |
| "you lean in" / "you flinch" | "you are drawn to her" (fails `PERSON_TRUTH /you are/`) |
| "the frame keeps you at arm's length" (repo canonical) | "arranged for you" / "performs for you" (RETIRED by repo — do NOT resurrect) |

**Hard grammatical floor regardless of Conflict 1:** any clause matching `PERSON_TRUTH` — `you are`, `you're`, `your (personality|character|soul|worth|value|iq|future)` — is dead on arrival even though the validator won't catch it in the aura field (line 59). Enforce it by hand.

---

## PART F — THE BANK: 24 BANNED / SAFE PAIRS, SPECIFIC TO BLUE ROOM'S 5 SOURCES

Cues drawn from the real `data.js` `stance` / `note` / `reads` / `receipts` of each source. Every SAFE line: grammatical subject = image (Step 1 ✓), swap-safe (Step 2 ✓), connotation-strips clean (Step 3 ✓), zero named-emotion / face-affect / mood-word / color-psych (Step 5 ✓), reads a RELATION not a single Record fact (Step 6 ✓). Reach clauses are listed separately and flagged contingent.

### SRC-01 — Driver / "Checkpoint Wave" (raised flat palm at lens; wheel held by other arm; fjord out the side glass; overcast rear-left; Volvo wheel)
| # | BANNED (person-subject / interior / trait) | SAFE (image-read; passes full gate) |
|---|---|---|
| 1 | He is calm but in control. | The two-arm split holds the frame in suspension — one arm keeps the wheel's territory, the other flattens to the lens. *(Standoff; anchored to stance verbatim)* |
| 2 | He's warning you off / being defensive. | The flat palm meets the lens first; the fjord out the side glass keeps the far third open. *(gesture-intent allowance: "the palm stops the lens" — what the action publicly does)* |
| 3 | He feels at home on the road, uneasy in formal rooms. | The cap brim and red layer hold a clean vertical against a cluttered cabin — order asserted, not found. |
| 4 | His gaze is direct and confident. | A direct eye-line vector and a five-finger spread land in one read; nothing in the gesture needs decoding. *(axis, not "confident")* |
| Reach (contingent) | — | "you get checked at the palm, then let through to the fjord behind it." *(spatial event; swap-safe)* |

### SRC-02 — Ice Field / "Two Feet of Quiet" (crouched full-commit at auger, both gloves stacked on brace; black silhouette on white; low hard sun, no shadow; hood/beanie/sunglasses; eye contact redirected to task; mouth turns up at brace)
| # | BANNED | SAFE |
|---|---|---|
| 5 | He is stoic and hardworking. | The crouched brace converts the frame's energy into a single downward vector; the auger is the only moving part. *(Vector; SRC-02 charge read verbatim)* |
| 6 | He's shut off / cold / unreadable. | Hood, beanie and sunglasses qualify the read — the face is present, but the eye-line redirects to the task. *(axis-not-affect; SRC-02 signal read)* |
| 7 | He's content out here — you can feel his quiet satisfaction. | A black silhouette on a white field: the snow does the staging and the frame accepts the terms. *(Figure-Ground; no attributed mood)* |
| 8 | He's smiling because he's happy at the brace. | (face-affect — KILL the whole approach; do NOT read the mouth.) → The weight sits exactly on the brace; nothing in the pose is offered to the lens. *(gesture-intent, not expression)* |
| Reach (contingent) | — | "you register the work before you register the figure." *(perceptual order; swap-safe — the labour is visible image content)* |

### SRC-03 — Shore / "Shore Dispatch" (salmon held flat, transverse across chest, face-up to sky; second catch in grass; driftwood parallel to catch axis; overcast diffuse full-front; fjord receding hard-left; snow ridgeline upper quarter)
| # | BANNED | SAFE |
|---|---|---|
| 9 | He's proud of the catch. | The transverse hold turns the catch tail-to-head across the frame's widest plane — presented, not celebrated. *(Light-Fit / document orientation; SRC-03 hidden read anchor)* |
| 10 | He's showing off for the camera. | The flat hold is the declaration; water, rock, ridge and sky behind it read as counter-signature. *(SRC-03 oracle-adjacent, relation of foreground-to-field)* |
| 11 | He's a seasoned, humble fisherman. | Flat diffuse overcast removes all specular rivalry and deposits the full luminance budget on the catch's mottled surface. *(Light-Fit; SRC-03 charge read; no character claim)* |
| 12 | The scene feels lonely / desolate out there. | Two parallel horizontals — catch and driftwood — bracket the lower register while the fjord recession opens the upper right. *(Figure-Ground; the space carries the read, not a mood-word)* |
| Reach (contingent) | — | "you read the catch as a filed document before you read it as a trophy." *(perceptual event; swap-safe)* |

### SRC-04 — Run / "Closing Distance" (dog mid-stride, all four limbs at peak extension, lens-direct, foreground plane-break; path wedge lower-left; grass-bank enclosure; power line overhead; overcast no-shadow; tricolor coat)
| # | BANNED | SAFE |
|---|---|---|
| 13 | The dog is aggressive / charging you. | The body axis presents perpendicular to the picture plane; the four-limb extension reads as direct approach. *(Vector-into-Void; SRC-04 signal read; "approach" is geometry, not intent)* |
| 14 | The dog looks joyful and free. | (attributed animal-mood — same ban applies) → Low-angle compression collapses the distance between foreground mass and mid-ground; the frame registers the encounter as seconds from contact. *(SRC-04 charge read)* |
| 15 | It's a menacing, tense moment. | The foreground mass takes the lower two-thirds and is not shared; competing elements are displaced into a shallow residual band. *(spatial dominance, not "menacing")* |
| 16 | Everything behind it feels like it doesn't matter to the dog. | The path wedge and grass-bank enclosure hold the action in a corridor — run-up in front, containment on both sides. *(relation of figure-to-channel; SRC-04 stance anchor)* |
| Reach (contingent) | — | "you flinch at the plane-break before the depth resolves." *(bodily event; swap-safe — any peak-stride foreground break triggers it)* |

### SRC-05 — Tank / "Spiny Encounter" (spiny lobster held vertical by two-hand cradle, face-out, antennae extended upper-left; fluorescent hard-top no-fill; cyan tank band lower third; tropical mural; specular band on dorsal shell)
| # | BANNED | SAFE |
|---|---|---|
| 17 | He's presenting his prize with pride. | The frame organizes around the held armature, lifted into a light it was never meant for. *(SRC-05 stance + oracle anchor; the RELATION = specimen × wrong illuminant)* |
| 18 | The lobster looks distressed / doomed. | (attributed-mood — KILL) → A hard specular band runs where the overhead tube meets the dorsal shell, isolating the specimen from both the warm mural and the saturated cyan. *(Light-Fit; SRC-05 signal read)* |
| 19 | The blue tank makes it feel cold and clinical. | (color-psychology-as-fact — KILL 5e) → The cyan tank band and the hard shell catch form a three-part graphic that reads before texture does. *(saturation/legibility fact, not hue→feeling)* |
| 20 | It has a wild, defiant presence. | The antenna lines extend past the held mass, inscribing a directional vector the composition otherwise suppresses. *(SRC-05 hidden read; residual-margin geometry, not "presence")* |
| 21 | The vivid mural adds a cheerful, tropical mood. | The painted mural supplies pictorial depth; the fluorescent grid maps recession behind the hold. *(compositional function, not "cheerful")* |

### Cross-source generic pairs (the drift patterns to watch on ANY future upload)
| # | BANNED | SAFE |
|---|---|---|
| 22 | She has a powerful aura / magnetic presence. | The frame keeps you at arm's length — near but walled off by the turned shoulder and the glass. *(repo's own canonical §B safe line)* |
| 23 | Their eyes are intense / piercing / staring you down. | A direct eye-line vector returns the viewer's look. *(repo §B safe line; axis, not affect)* |
| 24 | The photo feels holy / makes you feel small. | A tiny subject under a dominating field; the lone focal point draws the eye across it. *(repo §B safe line; scale-relation, not "small")* |

---

## PART G — QUICK-REFERENCE POCKET CARD (for the human author at draft time)

> **Subject = the image, never the person.** (Step 1 — master gate.)
> **Swap the sitter — does it survive?** If no, it's diagnosis. (Step 2.)
> **Strip the photo-noun — is a person-trait left?** If yes, kill. (Step 3.)
> **Point at the fact and STOP.** No "…which evokes X." (Step 5a.)
> **No faces for feelings.** Use gaze-axis / head-turn, never jaw/mouth/smile. (Step 5f.)
> **Read the RELATION between two things, not one Record fact.** (Step 6 — the anti-Diagram wall.)
> **"You stop" legal; "you trust him" banned.** Reach = a viewing event, not a feeling. (Step 4 — pending Conflict 1.)
> **The code won't save you — `aura` isn't scanned.** This checklist is the whole wall.

---

## CONFLICTS (for O6 / F1 — do not resolve alone)

**CONFLICT 1 — Second-person (Reach zone) vs. the repo's repeated retirement of "you."** *(Inherited from S5 CONFLICT 1; O3 confirms it independently and does NOT resolve it.)* Docs 03/05 make second-person a load-bearing bridge device. The repo has retired "you" from shipped copy at least four times, citing "second-person address" as the defect itself: `docs/COPY_SYSTEM.md:80` ("does not let you observe" retired), `:144` ("arranged for you"), `:230` ("performs for you"); `docs/audits/SAMPLE_ROOM_18_STATE_AUDIT_V1.md:68` ("performed for you"→"for the lens"); `docs/TASK_QUEUE.md:1713` (open item to de-second-person two more notes). **Against that:** `docs/BR-AURA-RESEARCH.md:94`'s own canonical SAFE line is second-person ("the frame keeps **you** at arm's length"), un-retired. And the code floor `PERSON_TRUTH` (READING_DOCTRINE `:54`, `:59`) only catches `you are` / `you're` / `your [closed-noun]` — it does NOT catch a bare "you stop." **The human call:** is the retirement (a) a blanket ban on any "you" — which would make BR-AURA-RESEARCH.md:94 itself a violation and kill the entire Reach zone for Aura — or (b) narrowly a ban on possessive-identity / for-you-flattery shapes, leaving "you stop / you flinch" (active, momentary, viewer-body verbs) legal? My Part E and every "Reach (contingent)" row above are written to be DROPPABLE if O6/F1 rule (a). **My recommendation, non-binding:** the retired lines are all passive-observer or possessive-flattery grammar, a different family from "you stop"; reading (b) is defensible AND keeps the repo's own §94 line self-consistent. But this must be an explicit human ratification, not a silent default — I have defaulted the gate to hinge-ONLY safe unless overturned.

**CONFLICT 2 — Doc 03's "Replacement law" vs. BR-S113.** *(Adjudicated in S3 per mission instruction — repo wins; logged here for the paper trail, not as open.)* Doc 03's loose and "house" laws both license naming the depicted person's charge and the viewer's felt emotion as the sentence payload. This directly contradicts BR-S113's grammatical-subject test and its kill-list resolved-feeling clause. **REJECTED as a replacement law.** What survives from doc 03 is mechanics only: the is→reads-as pivot (landing on image-facts, never emotion), evidence-anchoring, and the grammatical-subject QA test — all sourced to BR-S113's phrasing, not doc 03's. ALL 16 of doc 03's rewrite-table pairs fail the kill-list as written ("lands as loneliness," "recoil of shame," "sting of contempt") and are non-shippable; none appear in Part F.

**CONFLICT 3 — Terminology drift risk in doc 03's "conditionally safe" tier.** Doc 03's three-part boundary (safe-core / conditionally-safe / unsafe) is usable as an analytic lens, but its "conditionally safe" tier is exactly where doc 03 smuggles named emotion back in behind a hinge. Any downstream doc citing it must annotate: *"conditionally safe = image-property / geometry claims ONLY, never named emotion."* Otherwise a future agent re-imports the killed pattern under a friendly label. Flagging so the doc-03/05 merge doesn't re-open the door.

**CONFLICT 4 — Provenance gap in doc 05 (not doc-vs-doc).** Doc 05 supplies sentence-level grammar (hinge + transfer) but is silent on where the Aura line is SOURCED from. Ground truth #3 requires provenance = `src.stance` (live at `data.js:269,456,589,721,854`). No contradiction — a gap. Part F closes it by anchoring every SAFE line to the source's actual stance/reads/receipts. O6/F1: treat doc 05 as governing the prose register of the ONE verdict line under the band+kind-word, not as proposing a new field.

---

## RELEVANT FILE PATHS (all absolute)
- `C:\Users\nilsj\OneDrive\Documents\blue-room-scan-room\docs\BR-AURA-RESEARCH.md` — LOCKED law (anchor `RULE 0 (governing boundary, LOCKED — BR-S113)`) + kill-list (`### A. Aura cliché`, `### B. Rule-0 safety-drift`) + repo safe rewrites.
- `C:\Users\nilsj\OneDrive\Documents\blue-room-scan-room\docs\HANDOFF.md` — five absolute no's + gesture-intent allowance test (lines 27–31).
- `C:\Users\nilsj\OneDrive\Documents\blue-room-scan-room\docs\governance\READING_DOCTRINE.md` — code floor: `FORBIDDEN_TERMS` (26 terms) + `PERSON_TRUTH` (5 regexes); the fact `aura` is NOT scanned (lines 44, 51–61; the load-bearing line is 59).
- `C:\Users\nilsj\OneDrive\Documents\blue-room-scan-room\data.js` — the 5 sources' real cue vocabulary; `stance` provenance anchors at lines 269, 456, 589, 721, 854.
- `C:\Users\nilsj\OneDrive\Documents\blue-room-scan-room\docs\COPY_SYSTEM.md` / `docs\audits\SAMPLE_ROOM_18_STATE_AUDIT_V1.md` / `docs\TASK_QUEUE.md` — the second-person retirement trail feeding CONFLICT 1.
- `1783253951358_image.png` — CONFIRMED ABSENT (repo + Downloads searched); noted, not a blocker.