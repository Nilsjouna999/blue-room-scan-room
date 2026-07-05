# H3: Aura Rewrite Bank & BR-S113 Safety Audit

## Preamble

This document collects all banned/safe rewrite pairs from research documents 03 (Person Safety Line) and 05 (Reads-As Bridge) into one deduplicated bank, adds a third column auditing each SAFE rewrite against the LOCKED repo law (BR-S113 from `docs/BR-AURA-RESEARCH.md`), and flags all conflicts between research directions and repo ground truth.

**Core audit rule:** A rewrite PASSES BR-S113 verdict only if:
1. The grammatical subject is the image/frame/gesture/crop, never the person
2. Named-emotion payloads (even hedged behind "lands as" / "reads as") are REJECTED
3. The read remains re-authorable (could be true of another person in the same pose/light/crop)
4. The sentence reads the image-act, not a permanent trait

---

## Part 1: Banned/Safe Pairs — Deduplicated Bank

| # | Banned interior claim | Safe image-read | Safe viewer-transfer | BR-S113 verdict |
|---|---|---|---|---|
| **1** | She is lonely. | The empty space around her and the way the chair sits half-turned from the room make the image land as loneliness. | (none used) | **FAIL** — hedged emotion label "loneliness" behind "land as" is on the kill-on-sight list (doc 03: resolved-feeling clause; BR-AURA-RESEARCH doc 4.B bans "lands as loneliness") |
| **2** | He is ashamed. | His lowered eyes and the half-shadow across his face give the portrait the hush and recoil of shame. | (none used) | **FAIL** — "shame" named as a payload, even though anchored to formal cues. Violates kill-rule "do not resolve the gap with named-emotion label" |
| **3** | She wants you. | Her direct gaze and the stillness of her mouth turn the frame into an invitation the viewer feels, whether or not they trust it. | (none used) | **PASS** — grammatical subject is "direct gaze" + "frame"; no claim on her interior; invitation reads as formal staging, not her intent |
| **4** | He is dangerous. | The close crop, hard flash, and clenched jaw make his presence hit the frame like a threat. | (none used) | **FAIL** — "clenched jaw" is a face-affect read, BANNED per BR-S113 (§4.B no-faces-for-affect). "threat" as payload is named emotion. Rewrite location wrong. |
| **5** | She is bored with everyone here. | Her slack posture and drifting gaze flatten the room's energy; the picture reads as bored before anyone says a word. | (none used) | **FAIL** — "bored" named as resolved feeling; "slack posture" + "drifting gaze" are fine but the collapse to "reads as bored" violates the no-named-emotion rule |
| **6** | He is hiding something. | The image withholds him—cropped hands, averted eyes, unresolved shadow—so the viewer is left with suspicion. | You are left uncertain; the frame manufactures the sensation of entrapment. | **PASS** — subject is "image withholds"; no claim on his inner state; "suspicion" is a viewer-transfer consequence (Reach), not a person trait |
| **7** | She knows she is beautiful. | The lifted chin, deliberate stillness, and mirror-clean styling make the image stage self-possession with almost ceremonial force. | (none used) | **PASS** — grammatical subject is "lifted chin" + "styling"; "self-possession" reads as formal composition, not her knowledge. Re-authorable (another person in same pose/light). |
| **8** | He is broken. | The bent posture and airless light push the portrait into a damaged register. | (none used) | **FAIL** — "bent posture" is allowed, but "broken" + "damaged register" collapse to a named character state. Should stay at "the posture-and-light read as constraint, not completion" |
| **9** | She is calculating. | Everything in the frame feels tightly controlled—nothing spills, nothing softens—so the viewer reads control before warmth. | (none used) | **PASS** — subject is "everything in frame" (composition); "reads control" is a formal reading, not a trait. Re-authorable. |
| **10** | He feels trapped. | Pinned between the doorframe and the crop, he reads as cornered; the frame manufactures the sensation of entrapment. | (none used) | **FAIL** — "he reads as cornered" puts the person as grammatical subject, violating gate 2. Should be "the crop and doorframe read as confinement," which would be image-as-subject. |
| **11** | She is contemptuous. | The tightened mouth and upward glance put a razor edge on the image, giving it the sting of contempt. | (none used) | **FAIL** — "tightened mouth" is face-affect (BR-S113 §4.B BANNED); "sting of contempt" is named emotion. Needs rewrite. |
| **12** | He is a liar. | The mismatch between the smile and the rest of the face makes the portrait feel slippery and hard to trust. | (none used) | **FAIL** — "smile" + "mismatch" rest-of-face is face-affect reading. Additionally "hard to trust" smuggles a character judgment. Needs structural rewrite. |
| **13** | She is depressed. | The drained light, collapsed posture, and deadened spacing sink the image into heaviness. | (none used) | **PASS** — subject is "light" + "posture" + "spacing" (all image properties); "heaviness" is a formal quality, not a mood label. Held by the image, not the person. Re-authorable. |
| **14** | He is predatory. | His proximity is staged in a way that feels invasive and menacing to the viewer. | (none used) | **FAIL** — "His proximity" makes the person grammatical subject (gate 2 fail). Should be "The crop closes the distance and stages proximity as" something. Additionally "menacing" is a named-emotion payload. |
| **15** | She is insecure. | The portrait keeps tightening and retreating at once, giving self-consciousness a visible form without ever naming it as fact. | (none used) | **FAIL** — "self-consciousness" is a named mood/trait, ban-list material. The image-side craft ("keeps tightening and retreating") is solid; finish must not name the trait. |
| **16** | He loves the attention. | The camera-facing pose and performative ease make the picture run on attention. | (none used) | **PASS** — subject is "pose" + "ease" (performed gestures, re-authorable); "run on attention" reads as formal staging consequence, not his trait. Acceptable as image-act read. |

---

## Part 2: Bridge Phrases from Doc 05 — Ranked & Audited

| Rank | Bridge phrase | Best use | BR-S113 pass? | Why/Why not |
|---|---|---|---|---|
| **1** | **reads as** | Default Aura sentence | **YES, conditional** | Safest grammatical structure IF subject remains on the image. "The frame reads as X" ✓; "He reads as X" ✗. Must police subject placement. |
| **2** | **you …** | Final clause (viewer consequence) | **YES** | Transfers agency to the viewer's perceptual event. "You stop," "you keep looking" are Reach-zone moves, gate-safe (two-second test). Avoids person-diagnosing. |
| **3** | **plays as** | Performance-like gestures | **YES, with care** | "The gesture plays as refusal" ✓; "She plays coy" ✗. Subject must stay on image. Performance-read is re-authorable. |
| **4** | **lands as** | Verdict sentence | **CONDITIONAL — HIGH RISK** | If followed by a named-emotion label ("lands as loneliness / shame"), FAIL per kill-list. If followed by a frame-quality noun ("lands as stop / refusal / cold edge"), PASS. Must forbid emotion-label payloads. |
| **5** | **carries** | Sustained tone | **YES** | "The frame carries menace" ✓; "She carries authority" ✗. Subject discipline required. Tone-as-image-property is safe. |
| **6** | **holds / keeps / lets / leaves** | Premium verbs (subject embedded) | **YES** | Strongest for safety because the action embeds the subject: "The frame keeps one edge cold" (image-as-implicit-agent). Passes all gates naturally. |
| **7** | **feels like** | Looser conversational line | **CONDITIONAL — LOWER CONFIDENCE** | "The image feels like waiting" ✓; "He feels like trouble" ✗. Depends on what the subject of "feel" is. More prone to ambiguity; requires extra scrutiny. |

---

## Part 3: Worked Examples Audited Against BR-S113

These are the five detailed reads from doc 02 (Visual Grammar Residue). Each is already in the repo's voice; I audit each against the locked law.

### SRC-01 Driver — Ghost smear direction

**As written in doc 02:**
> *The hand leaves first; the warmth doesn't. It drags across the cabin, then cools to a fjord-thin edge.*

**BR-S113 audit:**
- Grammatical subject: "hand," "warmth," "it" (all image nouns) ✓
- Re-authorable: Another person in raised-palm gesture in a warm cabin with a cold-edge window would yield the same read ✓
- No named-emotion payloads ✓
- Image-act basis: palm gesture (performed, re-authorable), light/color (optical properties) ✓

**Verdict: PASS** — This is the model case: starts with a visible gesture, stays with optical residue, closes on formal contrast.

---

### SRC-02 Ice Field — One-seam burn direction

**As written in doc 02:**
> *The cut is over. What stays is the cold ringing around it—one dark seam, one pale edge, the lake holding its breath.*

**BR-S113 audit:**
- Grammatical subject: "cut," "cold," "lake" (image nouns only) ✓
- Re-authorable: Another auger brace over ice in same light would read the same ✓
- "the lake holding its breath" — anthropomorphism check: this is residual optical language (the freeze line is crisp/held), not claiming the lake feels. Passes. ✓
- No named-emotion payloads ✓

**Verdict: PASS** — Compact, image-tethered, zero person-diagnosis.

---

### SRC-03 Shore — Off-center tension line direction

**As written in doc 02:**
> *The shore does not decide cleanly. It holds on one side and gives on the other, the mark settling closer to release than rest.*

**BR-S113 audit:**
- Grammatical subject: "shore" (the landscape as formal element) ✓
- Re-authorable: A different person at the shore in the same compositional position would yield the same read ✓
- "does not decide" — personification of place (allowed per genius loci tradition + BR-S113 permits "performed gesture-intent," and a shoreline's spatial geometry is its "gesture") ✓
- No named-emotion payloads ✓

**Verdict: PASS** — Spatial-pressure reading held by composition, not person trait.

---

### SRC-04 Run — Ghost smear direction

**As written in doc 02:**
> *The body is gone from frame before the effort is. Heat keeps its shape a moment longer, then thins into a cold clear.*

**BR-S113 audit:**
- Grammatical subject: "body," "effort," "heat" (all image elements) ✓
- Re-authorable: Another runner captured at the same motion-blur and thermal residue stage ✓
- "effort" as a noun — effort-as-visible-residue (motion trail + heat shimmer), not the person's psychological state ✓
- No named-emotion payloads ✓

**Verdict: PASS** — The physics of motion and thermal decay hold the read.

---

### SRC-05 Tank — Type-burn or One-seam burn

**As written in doc 02 (variant A - typographic):**
> *What remains is held pressure.*

**Alternative longer line (variant B - visual):**
> *Not impact—containment. A dense held center, and one seam where it almost gives.*

**BR-S113 audit (variant A):**
- Grammatical subject: "What [in the image] remains" ✓
- Re-authorable: Different specimen in the same tank-hold geometry ✓
- No named-emotion payloads (though "pressure" hovers near danger); reading stays with the formal constraint (physical compression visible as pose + framing) ✓
- No person diagnosis ✓

**Verdict: PASS** — Pressure is a spatial/formal property demonstrated by pose and frame.

**BR-S113 audit (variant B):**
- Grammatical subject: "impact" vs "containment" (the image's spatial reading, not the subject's agency) ✓
- Re-authorable ✓
- "almost gives" — the visual stress (the seam) carries this, not the person's will ✓
- No named-emotion payloads ✓

**Verdict: PASS** — Both variants hold.

---

## Part 4: Conflicts Between Research & Repo

### Conflict 1: Named-emotion bridge payloads (docs 03 & 05 vs. BR-AURA-RESEARCH)

**Research location:** Doc 03, Table rows 1–2 (pages 51–54) shows "the empty space... land as loneliness" and "lowered eyes... give the portrait the hush and recoil of shame."

**Repo ground truth:** `docs/BR-AURA-RESEARCH.md` § 4.B KILL-ON-SIGHT list explicitly bans:
- "The resolved-feeling clause — the smuggling bridge: '…which evokes / conveys / creates a sense of <emotion>'"
- "Free-floating mood-word with no pixel behind it: haunting / evocative / moody / atmospheric / ethereal"
- Named-emotion labels like "loneliness / shame" are doubly banned (they are both mood-words AND person-diagnosing)

**Verdict:** Doc 03's "safe rewrite" examples FAIL the locked repo law. The research attempted to show how "lands as" can work as a bridge, but the specific rewrites selected ("lands as loneliness," "recoil of shame") are exactly what the repo kill-list forbids. This is a **research over-reach** into hedging strategies that the repo has already closed off.

**Recommendation:** Strip all named-emotion payloads from doc 03's table. Keep the grammatical-pivot technique (subject-move to frame/image), discard the emotion-label finish. Rewrite rows 1–2, 5, 8, 11, 12, 14, 15 to replace the emotion label with a formal/optical property.

---

### Conflict 2: "Reads as X" — scope vs. frequency

**Research location:** Doc 05, §1 (ranked bridges, page 19) ranks "reads as" as rank 1 ("Default Aura sentence") and recommends it as the backbone.

**Repo ground truth:** `docs/COPY_SYSTEM.md` tone guide and `docs/BR-AURA-RESEARCH.md` § 4.A (describe-moves) explicitly warn against **repetitive use** of any single bridge. "Premium criticism often hides the bridge inside verbs instead of announcing it every time."

**Verdict:** Doc 05 is directionally correct (make "reads as" the default grammatical structure) but slightly overstates frequency. The repo's tone is reserved, deadpan, and hostile to formula. Recommendation: Use "reads as" for ~60% of writes, alternate with embedded-subject verbs (holds, keeps, leaves, press, drag, resolve) for the remaining ~40%, never letting a single bridge dominate the voice.

---

### Conflict 3: Second-person address — "you" in Aura vs. Oracle separation

**Research location:** Doc 05, § "Where second-person works..." (page 33–36) endorses "you..." clauses as Reach-zone moves in Aura.

**Repo ground truth:** 
- `docs/BR-AURA-RESEARCH.md` § 1 ("the aura SCALE" on Benjamin's unrepeatability) + project principles state: **Aura is the last FELT beat; Oracle is the last SPOKEN beat.** The Oracle line is authored (hand-written verdict). If Aura already stages the full viewer-consequence with "you..." payloads, the Oracle has nowhere left to go.
- `docs/PROJECT_OS.md` assigns left panel (Diagram) to explanation, right/dossier to meaning, and **Oracle is the single verdict.**

**Verdict:** Doc 05's bridge is gate-safe (Reach-zone clauses like "you stop" are verifiable from the image), but using "you..." in Aura risks over-loading the emotional payload before Oracle arrives. Recommendation: Permit "you..." only as an *optional* secondary clause at the end of the Aura line, and only when the primary image-read would otherwise feel incomplete. Oracle must remain the authoritative voice on the viewer's final response. (Example: Aura = "The frame closes on one edge." Oracle = "You feel it tighten before release." — Oracle delivers the consequence, not Aura.)

---

### Conflict 4: Type-as-hero vs. Graphic-as-hero

**Research location:** Doc 02, §"Recommendation on type-as-hero vs. graphic-as-hero" (pages 79–85) recommends "graphic-as-hero by default, type as subordinate," but acknowledges type-burn as viable in rare cases.

**Repo ground truth:** `docs/BR-AURA-RESEARCH.md` does not pre-select visual strategy (visual grammar is research-led, residue directions are in doc 02). Current placeholder in `reveal/reading-panel.js` renders Aura as a decorative text capsule ("warm glass copper / held steady"), but this is **NOT** the dossier model. `docs/04_aura_field_map_implementation.md` § states: "discard the map-like SVG" from the original plan, use residue directions instead.

**Verdict:** No conflict, but clarification needed. The research is correct: prefer graphic-as-hero (one-seam burn, ghost smear, off-center tension line) with type as a supporting label. **Type-burn is not the dossier direction** — it belongs only to reveal/reading-panel as a future optional derivative. Dossier Aura must be visual-primary + one-sentence read below it (text subordinate).

---

### Conflict 5: Authorship vs. Computation

**Research location:** Doc 04, § "Schema and mapping method" (pages 74–94) proposes a derivation algorithm: "Mechanical pass → Editorial pass → Safety pass → Visual pass."

**Repo ground truth:** `docs/BR-AURA-RESEARCH.md` § 3 ("the extract-procedure") and the live data.js both assert: **"COMPUTE THE SURFACE, AUTHOR THE READ."** Aura is hand-authored, never computed. The repo has "no generation, no analysis" (see DECISION_LOG 2026-06-12).

**Verdict:** No conflict. Doc 04's algorithm is scaffolding (derivation as a work method for the human writer), not a code-generation path. The repo is correct: aura lines are authored; the algorithm is a checklist, not automation. Keep doc 04's schema; discard any language suggesting code generation of the final verdict line.

---

### Conflict 6: Diagram non-duplication — how strict?

**Research location:** Doc 04, § "Testing checklist" row "No duplication" warns "Aura must not repeat left-panel Diagram labels verbatim; at least one visible phrase per source is a synthesized class/verdict."

**Repo ground truth:** `docs/BR-AURA-RESEARCH.md` § 1 ("aura SCALE") explicitly forbids Aura from becoming a second Diagram. The repo has killed this layer before; Aura is reserved for "felt field synthesis," not geometric explanation.

**Verdict:** No conflict, strong alignment. Doc 04's checkpoint is the right enforcement. Additionally, from doc 02: "if the Aura visual starts behaving like a chart, map, or measurement layer, it is doing the wrong job." Recommendation: enforce the non-redundancy rule strictly in code review — if a sentence reads like a Diagram caption, cut it.

---

## Part 5: Kill-List Application & Enforcement

### From BR-AURA-RESEARCH.md § 4.B (Kill-On-Sight Rules)

Applied to every rewrite in this bank:

| Phrase pattern | Status | Example violation | Enforcement |
|---|---|---|---|
| Free-floating mood-word (haunting / evocative / moody / atmospheric / ethereal) | **KILL** | Doc 03 row 1: "make the image land as loneliness" | Audit every "lands as" / "reads as" payload — if next word is a mood/emotion label, reject. |
| Pathetic fallacy (sky mourns, room weeps) | **KILL** | Doc 02: "the lake holding its breath" (but permits if optical residue, not emotion attribution) | Allowed only when the personification describes a formal/optical property (freeze line is "held" = crisp edge), not when it simulates feeling. |
| Resolved-feeling clause ("which evokes / creates a sense of…") | **KILL** | Doc 03 rows 2, 5, 8: "give the portrait the hush and recoil of shame" | Any clause that announces emotion rather than anchoring it to pixels gets cut. |
| Stacked-adjective pile (raw, powerful, unforgettable) | **KILL** | Not in this bank; would appear as "powerful aura" or "intense presence" | Single adjectives OK if tied to image property; piles are banned. |
| Color-psychology-as-fact (red = passion, blue = calm) | **KILL** | Not in this bank; would be "warm colors evoke comfort" | Only saturation/brightness → arousal replicates; hue → feeling does not. Ship measured cues, not color meanings. |
| Named person trait sold as truth | **KILL** | Doc 03 rows 1–16 (baseline ban); focus on 4, 8, 11–12, 14, 15 | Gate 1–3 must catch these. Grammatical subject discipline + connotation-strip test. |
| No faces for affect | **KILL** | Doc 03 rows 4, 11–12: "clenched jaw," "tightened mouth" | Face-reading (even formal features like "closed mouth") is scientifically contested (Barrett 2019) AND a direct person-read. Ban entirely. Use gaze-axis or head-turn instead. |

---

## Part 6: Synthesis & Recommendations for H3

### For the Dossier Aura Plate (canonical version):

1. **Adopt the two-beat structure** (setup → reversal) from doc 01, but enforce it as *image-directed contradiction*, not person-diagnosed emotion.
   - Example: "The cabin roof presses from above-left; the warmth still reaches the lens." (spatial contradiction, not person emotion)

2. **Use embedded-subject verbs** (holds, keeps, lets, leaves, presses, threads, cools, resolves) for 60% of writes; reserve "reads as" for 40% only, and then only when the subject-payloal is a formal property (not a mood).

3. **Forbid all named-emotion payloads** behind any bridge (reads as, lands as, plays as, carries). If the read wants to name an affect, it must do so by naming the image-fact that provokes it, then stopping (no resolved-feeling clause).
   - Banned: "lands as loneliness"
   - OK: "one small figure under a dominating field; the negative space holds weight"

4. **Optional: permit "you..." clauses ONLY at line-end** as a brief Reach-zone consequence (two-second test), and only if the primary image-read would otherwise feel incomplete. Oracle must remain the authoritative voice on viewer consequence.

5. **Graphic-as-hero for dossier Aura visual** (one-seam burn / ghost smear / off-center tension line). Type-burn is a future reveal optional, not the dossier model.

6. **Audit every submitted Aura read through the three gates:**
   - Gate 1: Is the grammatical subject the photograph (frame, crop, gesture, light, setting)? (not the person)
   - Gate 2: Would the sentence still work with another person in the same pose/light/crop? (re-authorability test)
   - Gate 3: Does removing the photo-noun leave a stable character trait? (connotation-strip test)

---

### For the Reveal Card Aura Capsule (derivative, future):

Keep doc 02's example capsule format ("Warm Glass Copper / Held Steady"), but audit each against the gates. This is lower-stakes than dossier (smaller surface area), so can accept more compression, but same safety rules apply.

---

## Final Verdict Summary

**H3's job was to collect, deduplicate, and audit rewrites.** Result:

- **16 pairs collected** from docs 03 + 05 (Table 1)
- **7 bridge phrases ranked** with gate-audit (Table 2)
- **5 worked examples** from doc 02 all PASS BR-S113 audit (Part 3)
- **6 conflicts identified** between research and repo (Part 4):
  - Conflict 1 (named-emotion payloads): Research over-reaches; repo is stricter ✗
  - Conflict 2 ("reads as" frequency): Research is correct in direction; repo adds note on alternation ✓
  - Conflict 3 ("you..." in Aura): Research is gate-safe; repo adds Oracle-separation guard ✓
  - Conflict 4 (Type-as-hero): No conflict; research correctly defers type-burn ✓
  - Conflict 5 (Authorship): No conflict; repo is stricter (author-only), which is correct ✓
  - Conflict 6 (Diagram non-duplication): Aligned; repo is stricter ✓

**Recommendation:** Use Table 1 (deduplicated pairs) as the rewrite bank for builders. Audit every Aura submission through the three-gate + kill-list framework. Adopt doc 01's two-beat structure. Flag doc 03's emotion-labeled rewrites (rows 1, 2, 5, 8, 11, 12, 14, 15) as non-canonical; they fail the repo law.

The research is good; the repo's safety law (BR-S113) is tighter. Build to the tighter standard.

