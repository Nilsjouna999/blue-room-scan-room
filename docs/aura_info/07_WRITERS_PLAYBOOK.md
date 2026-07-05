# S9 — WRITER'S PLAYBOOK: Authoring One New Aura, Start to Finish

**Agent:** S9 — Writer's Playbook Architect
**Status:** Read-only synthesis. No repo files touched. Ships nothing; hands a procedure to a human author.
**Built from:** O4 (copy register: kind vocabulary, verdict-line spec, bridge hierarchy, free/develop split) · O3 (person-safety gate: four-zone filter, seven-step checklist, bank of 24) · O5 (visual direction: residue selection rule, tint discipline, band coexistence) · direct re-grep of `data.js`, `app.js`, `docs/BR-AURA-RESEARCH.md`.
**Screenshot `1783253951358_image.png`:** confirmed absent (checked by prior agents, re-confirmed here) — proceeded without it, not a blocker.

---

## 0. The one sentence this playbook serves

Aura must read what the image does — **charged, terse, verdict-shaped** — **without diagnosing the person**, and **without becoming a second Diagram, Surface, Metrics, or Oracle**. This playbook is the procedure a human runs, once, per source, in one sitting, to produce exactly that: one ordinal band + one relation-KIND + one authored verdict line + one residue mark — nothing more.

**What you are producing, in total, per source:**
1. A **KIND** (one of five schema-locked frame-geometry nouns).
2. A **class line** (an authored 2-word contradiction pair — the spoken register of the kind).
3. A **verdict line** (one authored sentence, 2 beats, 6–14 words).
4. A **band** (one ordinal tier, reused from existing data — no new score).
5. A **residue direction + geometry** (one of tension-line/seam/smear, bias pulled from `field.node`).
6. A **tint** (one color, `halo.a`, reused).

Five passes get you there. Run them in order. Do not skip the safety pass to save time — it is cheaper before the line ships than after.

---

## PASS 1 — MECHANICAL ANCHOR PASS

**Goal:** before writing a single word of copy, find the raw material. Aura authors nothing from imagination — it synthesizes what's already true in the source's data.

**Checklist:**

- [ ] **Read `src.stance` in full** (`data.js` grep `stance:`). This is the provenance field — ground truth #3 requires every Aura line trace back to it. Copy it out verbatim before paraphrasing anything.
- [ ] **Read `src.markers[]` / `src.analysis[]`** (`data.js` grep `markers:` / `analysis:`) for the concrete visible cues (crop, gesture, light, position) that back up the stance's claims. These are your falsifiability anchors — if a read can't point at a marker or analysis line, it's invented.
- [ ] **Read `src.frame.field`** (`data.js` grep `field:` inside the `frame:` block) — pull `node.x/y`, `weight`, `balance`. This is the bias-geometry evidence for the residue mark (Pass 5) and it also tells you whether the relation is a strong lean or a near-centered one. Do not invent a bias the data doesn't support.
- [ ] **Read `src.frame.event`** (`data.js` grep `event:` inside `frame:`) — pull `label`, `legibility`, `charge`, `containment`. `event.charge` is very likely your BAND (Pass 2) — a repo-authored ordinal tier already sitting on the live ladder `["Muted","Clean","Strong","Charged","Peak"]` (`app.js` grep `MET_TIER_FILL` / `LADDER`).
- [ ] **Read `src.frame.signature`** (`class`, `note`, `band`) — often the single richest sentence of prose describing the relation; frequently your best raw ore for the class line and verdict line.
- [ ] **Read `src.aura[]`** (`data.js` grep `aura:`) — the three existing chip-words. These are NOT the KIND and NOT the class line (they're a different, older layer) but they confirm the vocabulary register already established for this source — don't contradict them without reason.
- [ ] **Identify the projector / container / rim / residue** in plain terms: what is the light/energy source (projector), what holds the frame together (container), what marks the frame's outer edge (rim), and what's left after the moment passes (residue — this feeds Pass 5 directly).
- [ ] **Name the TWO relation terms.** Every Aura source stages a relation between exactly two co-present elements. Write them down as a plain pair before doing anything else — e.g. "raised palm / cabin warmth," "drilled cut / still field," "held catch / open water," "forward stride / empty corridor," "held mass / stressed seam." If you cannot name two terms, you don't yet understand the source's relation — reread `stance` and `field.weight` until you can.

**Output of Pass 1:** a short scratch note — stance quote, two relation terms, `field.node`/`balance` values, `event.charge` value, `signature.class`/`note` quote. Nothing authored yet.

---

## PASS 2 — RELATION PASS

**Goal:** classify the relation you just named. This pass is schema work, not prose work — you are picking from closed lists, not writing sentences.

**Checklist:**

- [ ] **Name the KIND from the schema enum — exactly one of five, no new words:**

| KIND | The relation it names | Frame-geometry test | Pairs with residue |
|---|---|---|---|
| **Standoff** | Two co-present masses hold, neither yielding | opposition/suspension between elements | tension line (default) |
| **Edge** | Warmth/interior meets a cold or sealed boundary | a seam/threshold/crop divides two zones | seam |
| **Figure-Ground** | Subject dissolves into / is dwarfed by its field | subject-to-container ratio | tension line |
| **Light-Fit** | An illuminant organizes a space not built for it | light source vs. surface mismatch | seam |
| **Vector-into-Void** | A directed motion fires past the frame edge | eye-line/gesture axis exits the frame | smear |

  If your two relation terms from Pass 1 don't cleanly fit one row, you likely mis-stated the terms in Pass 1 — go back before forcing a fit. **Never invent a sixth kind-word.** The enum is closed at the schema level (ground truth #3, condition c).

- [ ] **Set the tier (the BAND).** Default source: `event.charge` (already on the live ladder). Cross-check against `frame.signature.band` — they should usually agree; if they diverge, prefer `event.charge` (it's the more granular authored read) and note the divergence rather than silently picking. **Never compute a new 0-100 score.** The private numeric cutoffs exist only in a `styles.css` comment and never render publicly (`styles.css` grep `<25 Muted`) — Aura rides the same public ladder everyone else uses, nothing bespoke.

- [ ] **Run the falsifiability question:** *"Would a different photo of the same person, same pose/crop/light, move this?"* If the answer is no — if the relation-kind and band would hold with any sitter in this exact geometry — the read is anchored in the frame, which is correct. If the answer is yes — if the read only works because of who this specific person is or seems to be — you've drifted into diagnosis and need to re-derive the kind from `field`/`event` data alone, stripping out any assumption about the person.

  *Worked check:* SRC-02's crouched brace reads Figure-Ground/Edge regardless of who's crouching — the black-silhouette-on-white-field geometry is sitter-independent. That's a pass. A read like "he looks like he does this every winter" would fail instantly — it depends on invented biography, not frame geometry.

**Output of Pass 2:** one KIND word, one BAND tier, a written one-line justification of the falsifiability check (keep it — it's your defense if this line is ever challenged).

---

## PASS 3 — EDITORIAL PASS

**Goal:** write the class line and the verdict line. This is the only pass that produces prose, and it is authored by a human — never templated (ground truth #5).

### 3a. The class line (Tier-B contradiction pair)

- [ ] **Form:** `[warm/legible modifier] + [cold/frame noun]`. Two words. Noun-ending. Hardest word last.
- [ ] **Modifier bank (warm/legible):** warm · open · quiet · lit · plain · steady · bright · flat · near · held · direct.
- [ ] **Noun bank (frame/optics/procedure — NOT social-moral):** stop · hold · edge · seam · exit · void · field · band · rim · brace · cut · reach · channel · cradle · surround · glare · glass · frost · burn · drag · trace.
- [ ] **The noun-register lock:** do not reach for social/institutional nouns (`refusal, mercy, labour, custody, devotion, debt, pardon, witness, tax, severance`) unless the modifier pins the pair to a **performed gesture-event** — RULE 0's one allowance. Default to the frame-noun bank; only reach for a social noun if you can point at the specific gesture that earns it (e.g. "Warm Refusal" is legal only because a raised palm literally, physically halts the lens — a performed act, not a character read).
- [ ] **The emotion-terminal ban:** the closing word is never a named feeling. `recoil, shame, loneliness, longing, dread` are dead as terminal words, full stop — screen the closing word against this list before moving on.
- [ ] **Verify the class line is a legal instance of the KIND you set in Pass 2.** A class line that doesn't map back to its kind is decorative, not synthesized.

### 3b. The verdict line (the one authored sentence)

- [ ] **The authoring question — ask this before writing a single draft:** *"What is this frame pretending to be, before it reveals what it actually is?"* Beat one = the pretend (the legible surface). Beat two = the reveal (the colder frame-fact).
- [ ] **Hard spec:**
  - 2 beats (3 only if beat three is an escalating hammer-blow — never a fourth).
  - 6–14 words (15–16 ceiling only if the extra length does reversal work, not explanation).
  - One contradiction, not two stacked.
  - Warmth → cold: beat one is the socially legible surface, beat two the colder frame-fact.
  - Hardest word last, and that word is a frame/procedure noun, never a feeling.
  - Hinge hidden in a verb where possible (`holds / keeps / leaves / lets / cools / drags / cuts / thins`) — this is the ceiling register. Explicit "reads as" is the reliable default when you need unambiguous critical framing; don't overuse it (cap around 60% of lines across the whole set, per O3 Step 7a) — hide the rest inside verbs.
  - No named-emotion payload anywhere — not in beat one, not behind a hinge. Absolute, no exceptions.
- [ ] **The "pretending to be" question, applied concretely:** write down the pretend and the reveal as two fragments before joining them into a sentence. If you can't cleanly separate a pretend from a reveal, the source may not have a strong-enough contradiction yet — reread Pass 1's two relation terms.
- [ ] **Bridge-phrase hierarchy, in adopted rank order:**

| Rank | Bridge | Use |
|---|---|---|
| 1 | verb-hidden hinge (holds/keeps/leaves/cools/drags/cuts) | ceiling register, default to reach for |
| 2 | reads as | reliable default for explicit framing |
| 3 | plays as | performance/pose/withholding reads only |
| 4 | lands as | verdict-final beat, after cues are established |
| 5 | carries | sustained tonal beat, must pin to a concrete cue |
| avoid | feels like | vibes-adjacent, cliché-prone — do not use |

---

## PASS 4 — SAFETY PASS (O3's gate — run on every line, no exceptions)

**The load-bearing fact you must hold in your head while running this pass:** the code floor does NOT scan the aura field (`docs/governance/READING_DOCTRINE.md` grep `TIER A`, line 59 — `PERSON_TRUTH` covers only `artifact.title` + `readings.*`). **There is no machine backstop here. This checklist is the entire wall.** Run all seven steps, in order, on the verdict line AND the class line. First failure = kill and rewrite — do not hedge a banned payload into passing.

- [ ] **STEP 0 — Provenance check.** Does the line synthesize `src.stance`/`field`/`event` rather than invent a new claim? If it asserts something not traceable to Pass 1's anchors, reject before checking safety.
- [ ] **STEP 1 — Grammatical-subject test (the master gate).** What is the sentence's true grammatical subject? If it's the image/frame/gesture/crop/light/edge/hold/vector/hand/palm — pass. If it's the person (he/she/they/his/her, or a body part standing in for will — "his jaw," "her chin knows") — **it has fallen off the cliff. Kill.** No hedge rescues a person-subject sentence.
- [ ] **STEP 2 — Swap test.** Would the sentence still work with a different sitter/animal/specimen in the same pose/crop/light? If it collapses without this specific person's presumed inner life, it's diagnosis. Kill.
- [ ] **STEP 3 — Connotation-strip test.** Remove the photo-noun. Does a stable disposition remain? ("The braced shoulders" → strip → "guarded person" remains → kill.)
- [ ] **STEP 4 — Two-second test** (gates any trailing viewer-transfer clause specifically). Could a viewer plausibly register the named effect within two seconds, needing no biography, trust, empathy, or moral judgment? If it needs any of those four — kill the clause.
- [ ] **STEP 5 — Kill-list sweep.** Scan word-by-word against `docs/BR-AURA-RESEARCH.md` §A/§B. Any hit = kill:
  - (5a) named-emotion payload behind any bridge ("reads as loneliness," "recoil of shame")
  - (5b) free-floating mood-word (haunting/evocative/moody/atmospheric/ethereal)
  - (5c) pathetic fallacy — **banned flat, no optical-property carve-out** (F1 ruling; "the lake holding its breath" fails; safe pattern = a residue verb on the optical fact: "the ice keeps the rest")
  - (5d) stacked-adjective pile
  - (5e) color-psychology-as-fact (hue→feeling; saturation/brightness→arousal is the only shippable form)
  - (5f) face-affect read (clenched jaw, tightened mouth, smile not reaching the eyes) — use gaze-axis or head-turn instead
  - (5g) FORBIDDEN_TERMS collision — never use the 26 code-floor words as prose even where the human read would pass (`docs/governance/READING_DOCTRINE.md` `FORBIDDEN_TERMS`)
- [ ] **STEP 6 — Record-duplication test.** Does the line merely restate a receipt, Diagram label, or Surface coordinate? If a neutral archivist could have written it verbatim, it's Record, not Read — kill and rewrite as the RELATION between the two elements, not a single-element fact. (This is the anti-second-Diagram guard.)
- [ ] **STEP 7 — Register check.** Is the bridge over-used across your set (cap "reads as" near 60%)? Is the line terse and verdict-shaped, one setup one turn, not a paragraph? Does it build toward Oracle without pre-spending the verdict — if Aura already delivers the full viewer consequence, Oracle has nowhere left to go; pull it back.

**The viewer-transfer ("you…") clause — special handling.** This is CONFLICT 1 across O3/O4/S5, unresolved, routed to O6/F1. Default posture for this playbook: **hinge-only, no "you" clause**, unless you have explicit sign-off that the clause is permitted. If permitted, it must be short, late in the sentence, cue-bound (passes the swap test on its own), and a bodily/perceptual viewing-event only (`you stop`, `you keep looking`) — never possessive/identity/flattery (`you are…`, `your…`, `performs for you` — all dead). Hard floor regardless: anything matching `/you are/`, `/you're/`, `/your (personality|character|soul|worth|value|iq|future)/` is dead on arrival even though the validator won't catch it here.

**Pass 4 output:** a line that has cleared all seven steps, or a killed line sent back to Pass 3 for rewrite.

---

## PASS 5 — VISUAL PASS (O5's selection rule)

**Goal:** pick the residue direction, set its geometry from real data, assign the tint, and note the one mark. This is the last pass because the visual should render the *same* relation the copy just named — never a separate idea.

- [ ] **Run the selection rule (default-first):**

```
Does the relation reduce to a biased balance between two co-present poles?
  → YES (default)            → OFF-CENTER TENSION LINE
  → NO, it's a threshold      → ONE-SEAM BURN
  → NO, it's retained motion  → GHOST SMEAR
Does the card own one unforgettable phrase any graphic would merely decorate?
  → almost never — TYPE-BURN stays in reserve, does not ship
```

- [ ] **Default mapping from KIND → direction** (overridable per-source, not a hard lock): Standoff → tension line · Edge/Light-Fit → seam · Vector-into-Void → smear · Figure-Ground → tension line. If your source's real authored texture argues for the alternate (e.g. a Standoff that's actually a retained gesture, like SRC-01), follow the texture, not the default table — but write down why.
- [ ] **Pull the bias geometry from `field.node {x,y}` and `field.balance`** — do not invent a lean. If `balance` is authored `"Centred"`, render a subtle/near-centered bias, not a dramatic one; if `balance` says `"Lean right"`, bias visibly toward that side. Honest under-statement beats invented drama.
- [ ] **Assign the tint = `halo.a`**, `color-mix(in srgb, var(--halo-a) 55%, var(--silver))`. One tint, one card. Cold exit edges may lean toward `halo.b` as a thin rim only, never a second fill.
- [ ] **Cap discipline:** one mark, one rim, 8–12% residue-fill opacity, no stacking. Reduced-motion renders final state at first paint — no draw-on, no drift, no loop.
- [ ] **Run the anti-Diagram check on the visual too:** does the mark merely re-narrate `field.weight` or a Surface/Metrics fact verbatim? If yes, it's a single-element reader — redraw it as the conjunction of the two relation terms, not a restatement of one pole (this is the specific SRC-04/SRC-05 Comp-Field overlap risk O5 flagged).
- [ ] **Confirm the band renders as exactly one row**, reusing the same `halo.a` tint family as the mark — never a second/third band, never a percentage, never a new gauge.

**Pass 5 output:** direction (tension line / seam / smear), bias geometry description, tint hex, one-line confirmation the mark and copy render the same relation.

---

## WORKED DEMONSTRATION — SRC-01, full walk-through

### Pass 1 — Mechanical anchor

- `stance` (`data.js` line 269): *"One arm holding the wheel's territory, the other raised flat to the lens — half stop-sign, half salute. The two-arm split holds the frame in suspension: neither departing nor stationary."*
- `field` (`data.js` line 176-179): `node:{x:0.42,y:-0.34}`, `weight:"Upper right — toward the raised palm"`, `balance:"Lean right"`.
- `event` (`data.js` line ~184): `label:"Raised palm"` *(inferred from context)*, `legibility:"Peak"`, `charge:"Charged"`, `containment:"Strong"`.
- `signature.band` (`data.js` line 173): `"Charged"`.
- `aura[]` (line 267): `["Idle-Engine","Open-Palm","Northbound"]`.
- Projector = the raised palm meeting the lens. Container = the cabin. Rim = the window/glass edge. Residue = the warmth that lingers after the hand's gesture completes.
- **Two relation terms:** the palm that stops the lens / the cabin warmth that keeps the frame human.

### Pass 2 — Relation

- **KIND: Standoff** — two co-present masses (palm-stop, cabin-warmth) held in suspension, neither yielding. Matches the frame-geometry test (opposition/suspension between elements) and matches `stance`'s own words ("neither departing nor stationary").
- **BAND: Charged** (from `event.charge`, confirmed by `signature.band`) → 4/5 segments.
- **Falsifiability check:** would a different driver, same raised palm, same window crop, same overcast light, move this read? No — the Standoff reads from the geometry (two-arm split, gesture-vs-wheel) regardless of who's driving. Pass.

### Pass 3 — Editorial

- **3a — Class line: "Warm Refusal."** Modifier "warm" (legible/cabin) + noun "refusal" (social-register noun, only legal here because it's pinned to the performed gesture — the raised palm literally, physically halts the lens; RULE 0's one allowance). Passes the noun-register lock because the pin is explicit and traceable.
- **3b — Verdict line.** Pretend: the gesture looks like a greeting/salute (socially legible, warm). Reveal: it's actually a stop — the frame keeps its warmth on the far side of that stop.
  - Draft: *"The palm holds you at the glass; the cabin keeps the warmth behind it."*
  - Beats: 2. Words: 12. Contradiction: refuse ↔ welcome, one only. Hardest word last: "it" refers back to "the warmth behind" — terminal concept is the sealed interior, a frame-fact, not a feeling. Bridge: verb-hidden hinge ("holds," "keeps") — ceiling register.

### Pass 4 — Safety

- Step 0 (provenance): traces directly to `stance`'s "raised flat to the lens" and `field.weight`'s "toward the raised palm." Pass.
- Step 1 (grammatical subject): subject is "the palm" / "the cabin," not the driver. Pass.
- Step 2 (swap test): any driver, same gesture, same crop — line holds. Pass.
- Step 3 (connotation-strip): remove "palm"/"cabin" — no stable disposition claim remains (no "guarded," no "warm person"). Pass.
- Step 4 (two-second test, on the "you" clause): "holds you at the glass" is a viewer-body spatial event, registrable in under two seconds, no biography needed. **Flagged as CONTINGENT** — this is the one "you" clause in the demonstration set, kept deliberately so it's trivially strikeable if O6/F1 rules the retirement law is a blanket ban (see CONFLICTS below). If struck: rewrite as *"The palm stops the lens; the cabin keeps its warmth behind it."* (11 words, same beats, zero second-person.)
- Step 5 (kill-list sweep): no named emotion, no mood-word, no pathetic fallacy, no face-affect read, no color-psychology, no FORBIDDEN_TERMS collision. Pass.
- Step 6 (record-duplication): this is a relation (palm-vs-cabin), not a restated receipt like "Gesture: Palm, 5-finger spread." Pass.
- Step 7 (register): terse, one setup/one turn, builds toward but doesn't spend Oracle's line ("Logged mid-route. The palm held the shutter open; the fjord held the rest of the frame. Neither blinked.") — Aura's line is drier and shorter; Oracle still has somewhere to go. Pass.

### Pass 5 — Visual

- **Selection rule result:** relation is a two-pole balance → default **off-center tension line**. *(Note: O5's own worked read chose ghost smear for SRC-01, reasoning that the authored truth is a retained gesture — warmth dragging then cooling — rather than a static two-pole hold. Both are defensible; this demonstration shows the tension-line default explicitly to illustrate the base-case procedure. A human author should pick whichever direction the actual photo's texture argues for, and note the reasoning either way — this is exactly the kind of per-source judgment call Pass 5 exists to make explicit, not to auto-resolve.)*
- **Bias geometry:** `field.node{x:0.42,y:-0.34}`, `balance:"Lean right"` → anchors lateral, filament biased up-and-right toward the palm.
- **Tint:** `halo.a = "#c98a5e"` (warm copper) → `color-mix(in srgb, var(--halo-a) 55%, var(--silver))`. Cold exit edge may lean toward `halo.b = "#8b7bff"` as a thin rim only.
- **Anti-Diagram check:** the mark renders the palm/cabin conjunction, not a restatement of `field.weight`'s exact wording. Pass.
- **Band:** one row, Charged, 4/5 segments, same `halo.a` tint family as the mark.

**Final SRC-01 output (for illustration only — final authorship belongs to the human, not this playbook):**
> KIND: Standoff · Class line: Warm Refusal · Band: Charged (4/5) · Verdict: "The palm holds you at the glass; the cabin keeps the warmth behind it." · Direction: tension line (bias up-right per `field.node`) · Tint: `#c98a5e`

---

## FREE vs. DEVELOP — what changes, what doesn't

Per ground truth #8 (develop is a mode, not a grade — free is complete, not crippled):

- **FREE** shows the **parts/gestalt** only — name the two relation terms, unresolved. Example: *"A raised palm and a fjord window, both in one cabin frame."* Do not resolve which side wins.
- **DEVELOP** shows the **relation named and ranked** — the full capstone from Passes 2-5: band + KIND + verdict line.
- The free line must never pre-spoil the relation. If your free-state draft accidentally states which pole wins, push that resolution into develop and rewrite free as a flat two-noun inventory.

---

## FIVE-STEP QUICK-REFERENCE (pin this at the top of your draft doc)

1. **ANCHOR** — read `stance`/`field`/`event`/`signature`/`aura[]`; name the two relation terms.
2. **RELATE** — pick the KIND from the closed five-word enum; set the BAND from `event.charge`; run the falsifiability question.
3. **EDIT** — write the class line (warm-modifier + frame-noun, emotion-terminal banned) and the verdict line (2 beats, 6-14 words, one contradiction, hardest word last, verb-hidden hinge preferred); ask "what is this pretending to be, before it reveals what it is?"
4. **SAFEGUARD** — run all seven O3 steps in order on every line; first failure kills it; the code floor does not scan this field, so this checklist is the entire wall.
5. **RENDER** — run the selection rule (tension line default / seam for thresholds / smear for retained motion); pull bias from `field.node`; assign `halo.a` as the one tint; confirm the mark and the copy render the same relation, not two different ideas.

---

## CONFLICTS (inherited, not resolved by S9 — routed to O6/F1)

1. **The "you…" clause (CONFLICT 1 across S5/O3/O4).** The repo has retired second-person address from shipped copy multiple times (`docs/COPY_SYSTEM.md` grep "arranged for you" / "performs for you"), yet its own canonical safe example is second-person (`docs/BR-AURA-RESEARCH.md:94`, "the frame keeps you at arm's length"). This playbook defaults every author to **hinge-only** and flags the one demonstration "you" clause (SRC-01, Pass 4 Step 4) as strikeable pending a human ruling. Not resolved here.
2. **Tier-A/Tier-B social-noun allowance** (class lines like "Warm Refusal" using a social-register noun pinned to a gesture-event). This playbook follows O4's proposed split as a working default, but per O4 and O3 this is a **design proposal, not settled law** — if O6/F1 rules for zero social nouns even gesture-pinned, every class line using this allowance (including the SRC-01 demonstration) falls back to a pure frame-geometry pair ("Warm Cutoff" / "Small Field").
3. **Four-directions ↔ five-kind-words mapping** (O5 CONFLICT 1) is a proposed render-layer default, not a locked lookup table. This playbook's Pass 5 mapping table inherits that open status.
4. **No authored null-relation sample exists yet** (all five live sources assert a live relation). This playbook does not manufacture one — Pass 2's falsifiability question and Pass 5's selection rule both assume a live relation is present. Authoring a null-capable source/line remains an open task for whoever builds the sixth example.

## RELEVANT FILE PATHS (all absolute; re-grep, line numbers drift)

- `C:\Users\nilsj\OneDrive\Documents\blue-room-scan-room\data.js` — `stance:` (lines ~269, 456, 589, 721, 854), `field:`/`node:`/`balance:`/`weight:`, `event:`/`charge:`, `signature:`/`band:`, `aura:`, `halo:`.
- `C:\Users\nilsj\OneDrive\Documents\blue-room-scan-room\app.js` — `MET_TIER_FILL`/`LADDER`/`FP_TIER_LADDER` (the public band ladder), `function metTier`, `met-bands`, `--halo-a:${esc(src.halo.a)}` (tint injection to reuse), `BR-S115` (current Aura reserved-stub), `dplate("03", "Aura"`.
- `C:\Users\nilsj\OneDrive\Documents\blue-room-scan-room\docs\BR-AURA-RESEARCH.md` — RULE 0 (line 5, LOCKED), kill-list §A (line 84) / §B (line 93), the repo's own safe rewrites.
- `C:\Users\nilsj\OneDrive\Documents\blue-room-scan-room\docs\governance\READING_DOCTRINE.md` — `FORBIDDEN_TERMS`, `PERSON_TRUTH` (line ~59: does NOT scan `aura`).
- `C:\Users\nilsj\OneDrive\Documents\blue-room-scan-room\docs\COPY_SYSTEM.md` — second-person retirement trail, preferred lexicon.
- `1783253951358_image.png` — confirmed absent (repo + Downloads); noted, not a blocker.
