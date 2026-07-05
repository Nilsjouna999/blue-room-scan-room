# Aura Research Docs Inventory (H1 — Manifest)

## Document Summary

| Filename | Purpose | Key Sections | 3 Most Load-Bearing Claims | Repo Laws Touched |
|----------|---------|--------------|---------------------------|-------------------|
| **01_terse_verdict_writing.md** | Writing craft for Aura cards: compressing big ideas into charged, two-beat epigrams via SCP reports, Magic flavor text, and fragrance classification. | • The two-beat setup→reversal charge architecture<br>• Class-name line construction (modifier + noun, avoid energy/vibe)<br>• House formula (2-word class, 2-beat verdict, 6–14 words) | 1. **Compressed classification plus late turn** — the foundational charge mechanism across all source traditions (SCP, Magic, epigram); setup lands first, beat two corrects/contaminates (lines 3–10)<br>2. **Waste nothing** — every word earns its slot; SCP warns against exposition, flowery diction, unnamed detail; flavor text is dropped entirely when box runs out (lines 6–7)<br>3. **Label first, prose second** — fragrance family names (Fresh, Warm & Spicy) come before body copy; class-name should sound taxonomic before the body line exists (lines 9–10, 46–61) | • Repo voice (deadpan archival, quietly absurd at most once) — doc reinforces underwrite over overclaim<br>• Charged-but-safe writing — the two-beat structure lets coldness win without melodrama<br>• Non-duplication — class label as a separate tier from prose prevents redundant double-naming |
| **02_aura_visual_grammar_residue.md** | Visual language for Aura: afterimage, residue, and trace instead of charts/maps; ranked visual directions with worked examples per source. | • Core law: Aura is retinal/residual/verdict-like, NOT a field diagram (lines 3–8)<br>• Four visual directions ranked: one-seam burn (premium), ghost smear, off-center tension line, type-burn (lines 27–66)<br>• Red-line anti-patterns: contour rings, vector fields, heatmaps, sparkles all banned (lines 67–77)<br>• Direct-use grammar with worked reads for SRC-01–05 (lines 87–150) | 1. **What remains after contact, not mechanics of contact** — afterimage is retinal not object-on-wall; long-exposure residue is ghostlike because motion becomes translucent (lines 3–5); if Aura reads as chart/map/measurement it duplicates Diagram (line 7)<br>2. **One trace, one tension, one remainder** — Richard Long's line-made-by-walking as model: a record of journey, not a system diagram; the premium version holds vanishing and emerging at once (lines 9–16)<br>3. **Graphic-as-hero by default (eighty percent mark, twenty percent language)** — type-as-hero risks stealing Oracle's thunder; Aura should be seen first then named; Oracle should be read first then felt again (lines 79–86) | • SUBTRACTION GATE VERDICT (repo's own deep research) — Aura = single-element relation (tension/edge/mismatch/fit), NOT redundant to src.stance narration<br>• VISUAL = RESIDUE NOT MAP — overrides the literal Field Map proposed in doc 04; keep schema/file-placement/copy-structure, discard map SVG<br>• ORACLE STAYS ONLY VERDICT — Aura builds toward Oracle, never competes (line 86) |
| **03_person_safety_line.md** | Drawing the boundary between image-tethered description and off-limits person-diagnosis; permission to write depicted person (pose/gaze/styling/effect) while banning character/motive/interior claims. | • The narrow rule: describe person-as-depicted, never assert person's hidden soul (lines 3–8)<br>• Critical distinction: description vs. interpretation; safe core vs. conditionally safe vs. unsafe zone (lines 9–20)<br>• Reference rewrites table (lines 47–74): banned interior claim → safe charged rewrite (e.g., "She is lonely" → "The empty space and half-turned chair make the image land as loneliness") | 1. **Portrait and street-photo writing analyze how the portrait constructs the sitter**, not what the sitter secretly is; Museum pedagogy teaches gaze, pose, styling, relation but stresses photographs are representations shaped by choices (lines 21–25)<br>2. **Safe core = observable image-tethered description; unsafe = claims about hidden interior, stable character, diagnosis, motive, criminality** (lines 14–20); legal defamation doctrine confirms: facts must be provable; opinions need factual basis; simple "I think X" can still read as factual accusation (lines 11–14)<br>3. **Replacement law (house law tighter): Write person only as image gives them — visible action, pose, styling, context, effect; never write their soul as fact** (lines 39–45); keeps electricity by relocating it from person's interior to image's staging and viewer's encounter | • BR-S113 LOCKED (repo's non-negotiable person-safety law) — the doc's "narrow rule" is a RELAXATION that the mission brief REJECTS as replacement law (mission says research doc 03's "narrow rule" is REJECTED)<br>• WHAT SURVIVES from doc 03 = operational mechanics (is→reads-as pivot, swap test, two-second test, four-zone filter)<br>• WHAT DIES = named-emotion payloads even behind hinges ("lands as loneliness") and any claim on subject's interior<br>• The five absolute no's locked in repo law: never state/imply person's worth/character · health/body · ranking · identity · attributed private feeling/mood |
| **04_aura_field_map_implementation.md** | Schema, mapping method, plate layout, implementation plan for Aura as a dossier plate; defines internal derivation lexicon and editorial output lexicon; architectural guidance on where Aura sits in the renderer. | • Executive summary: Aura cannot be second Diagram or second Surface (lines 3–6)<br>• Repository findings: renderDossier() builds five-plate stack (Surface Record, Archetype, Aura, Mint Record, Oracle Read); Aura = authored first, derived second (lines 13–26)<br>• Aura definition & vocabulary: two-layer lexicon (internal: projector/container/rim/residue; visible: class labels like Warm Refusal, Quiet Labour) (lines 27–55)<br>• Schema with AuraAnchor type, mapping method (mechanical→editorial→safety→visual pass), plate layout grid, testing checklist (lines 56–184) | 1. **Blue Room's real line is "read the re-authorable image-act, never the permanent person"** — the active rule permits reads keyed to gesture, gaze, pose, styling, crop, light, setting (lines 4–7); this is repo law restatement, not new research<br>2. **Implement Aura semantically not positionally** — use .dplate--aura and .daura__* classes, not brittle nth-of-type(); treat as self-contained module whose visual export is same SVG for display (line 11)<br>3. **The right visual language rejects the literal Field Map (contour rings + vector + band)** — preserve schema/layout/accessibility/file-placement; DISCARD map-like SVG; replace with residue directions from doc 02 (lines 8–9, 96–103) | • REPO WINS on product law & what's been killed — doc 04's proposed literal Field Map is SUPERSEDED; visual must use doc 02 residue directions<br>• FILE STRUCTURE: content in data.js, dossier rendering in app.js, derivatives in reveal/reading-panel.js, styles in styles.css<br>• ORACLE SEPARATION — Aura is not final mic-drop; Oracle remains only verdict<br>• NO-MAGNETISM — free is complete; develop is a mode not a grade |
| **05_reads_as_you_bridge.md** | Grammar for moving charge off the person and onto image, gesture, frame effect, and viewer; ranked bridge phrases (reads as, you …, plays as, lands as); four-zone filter (Record/Read/Reach/Ban) for vetting sentences. | • The two-part system: interpretive hinge (reads as, plays as, lands as, carries) + optional viewer-transfer (you …) (lines 1–10)<br>• Ranked bridge phrases by Blue Room fit: reads as (default) > you … (fast transfer) > plays as > lands as > carries > holds/keeps/lets > feels like (lines 16–29)<br>• Four-zone filter: Record (verifiable), Read (anchored to visible cue), Reach (brief viewer consequence), Ban (stable trait/motive/interior) (lines 56–77)<br>• Two stress tests: swap test (would work with another sitter in same pose?), two-second test (does viewer plausibly experience effect in 2s?) (lines 72–76) | 1. **The highest-yield bridge is "reads as" for default Aura sentences** — keeps charge on image/gesture/crop/frame instead of sitter's soul; sounds like criticism not diagnosis; safe because the image noun is grammatical subject, not the person (lines 16–29)<br>2. **Second-person works when it names an effect plausibly experienced in real time from visible evidence** — "you flinch," "you hesitate," "you keep looking" are stronger than "you realize he is kind" or "you trust him"; the first reports viewing event, second invents a person (lines 31–37)<br>3. **The four-zone filter operationalizes the ban**: Record = police-report-verifiable (Diagram/Surface/Metrics); Read = argument from visible cue (Aura); Reach = brief viewer consequence (Aura); Ban = stable trait/motive/interior (never ship) (lines 56–77) | • PERSON-SAFETY: grammar pivots is→reads-as; rules out named-emotion labels; enforces visible-cue basis<br>• THE SUBTRACTION GATE VERDICT — the is→reads-as move is the "RELATION the frame stages between two co-present elements"; Aura is the ONE ordinal rank + relation-KIND label that turns buried sentence into scannable band<br>• ORACLE STAYS ONLY VERDICT — Aura's prose is the last felt beat; Oracle is last spoken beat<br>• NO-REDUNDANCY — Reach clause ("you …") must not simulate intimacy or over-instruct; must feel like image forced response, not writer grabbed reader |

---

## Conflicts Log

### CONFLICT 1: Doc 03 Proposes a Safety-Law Relaxation That the Mission Rejects
**Source:** Doc 03, lines 39–45 (the "narrow rule" replacement law) vs. Mission Brief, Ground Truth #2

**The conflict:**
- Doc 03 proposes: **"Name the depicted person + viewer response in fully charged language"** as a lawful relaxation of the blanket ban.
- Doc 03 tests this against portrait criticism, museum pedagogy, and documentary-photo guidance to show it's a real tradition.
- **Mission brief rejects this as a replacement law.** The actual locked law (BR-S113) stands. What the mission says survives from doc 03: the **operational mechanics** (is→reads-as pivot, swap test, four-zone filter) — NOT the relaxed permission to name the depicted person.

**Repo authority:** BR-AURA-RESEARCH.md, lines 1–5, explicitly locks RULE 0 under BR-S113: "A card reads the ARTIFACT, never the PERSON." This is immovable.

**Resolution:** Use doc 03's four-zone filter and grammatical mechanics as a vetting tool; reject the proposed replacement law. The mission's ground truth #2 is the final authority.

---

### CONFLICT 2: Doc 04's Literal Field Map Visual Is Superseded by Doc 02's Residue Directions
**Source:** Doc 04, lines 96–103 (visual grammar section) vs. Mission Brief, Ground Truth #4; also vs. Doc 02 (visual directions), lines 27–150

**The conflict:**
- Doc 04 proposes a literal **Field Map: contour rings + vector + container band + rim line** as the canonical Aura visual.
- Mission brief explicitly states: **"VISUAL = RESIDUE, NOT MAP. Doc 04's literal Field Map (contour rings + vectors + bands) is SUPERSEDED by doc 02's residue directions."**
- Doc 04 itself contains a note at line 9: "NOTE FOR THE BUILDER: The originating research proposed a literal 'Field Map'… The *visual-grammar* research (doc 02) and the user's own direction REJECT that as a second diagram."

**Repo authority:** The mission's explicit statement of Ground Truth #4 supersedes doc 04's map visual. Doc 02 is the canonical visual grammar.

**Resolution:** Keep doc 04's **schema, layout, copy-structure, accessibility, file-placement**. Discard the map-like SVG. Substitute one of doc 02's four visual directions: one-seam burn, ghost smear, off-center tension line, or type-burn.

---

### CONFLICT 3: Doc 03's "Reads As You" Move vs. Mission Brief's Ban on Named-Emotion Payloads
**Source:** Doc 03, lines 50–76 (reference rewrites table: safe rewrites contain "lands as loneliness," "recoil of shame," etc.) vs. Mission Brief, Ground Truth #2

**The conflict:**
- Doc 03's reference rewrites include examples like:
  - "She is lonely" → "**The empty space and half-turned chair make the image land as loneliness**"
  - "He is ashamed" → "**His lowered eyes give the portrait the hush and recoil of shame**"
- These contain **named-emotion payloads** ("loneliness," "shame") behind a hinge phrase ("land as," "recoil of").
- **Mission brief explicitly bans this:** "the resolved-feeling clause ('…which evokes/lands as/creates a sense of <emotion>') = kill-on-sight list… even behind a hinge ('lands as loneliness', 'recoil of shame' = kill-list)."

**Repo authority:** BR-AURA-RESEARCH.md, line 87, places "The resolved-feeling clause — the smuggling bridge: '…which evokes / conveys / creates a sense of …'" on the KILL-ON-SIGHT list explicitly because it smuggles person-emotion via grammar. This overrides doc 03's rewrites.

**Resolution:** Use doc 03's **operational mechanics** (the is→reads-as grammatical pivot, the swap test, the two-second test, the four-zone filter) but reject the emotion-payload rewrites. Where doc 03 offers "lands as loneliness," instead write about the **image-act** ("the frame keeps distance") or the **viewer's perceptual response** ("you stay at arm's length") — without naming the emotion.

---

### CONFLICT 4: Doc 05's Second-Person Clause Risks Synthetic Personalization If Not Policed Tightly
**Source:** Doc 05, lines 31–37 (where second-person goes gimmicky) vs. Mission Brief's NO-REDUNDANCY rule

**The conflict:**
- Doc 05 correctly warns: **"second-person works when it performs a small, credible transfer from image to viewer"**; "you flinch," "you hesitate" are stronger than "you realize he is kind."
- But doc 05 treats this as a **risk to manage**, not a structural veto.
- Mission brief (Ground Truth #8, NO-MAGNETISM) adds: aura = the **last FELT beat** before Mint; it must not feel like faux intimacy or over-instruction. A "you …" clause that simulates intimacy violates the restraint-over-density rule.

**Repo authority:** PROJECT_OS.md assigns the left panel to inspection, the right/dossier to **meaning**; Oracle is the single verdict. Aura must not compete with Oracle's owned territory. A "you …" clause that mimics Oracle's intimacy steals vertical space.

**Resolution:** Doc 05's framework (swap test, two-second test, four-zone filter) is sound; use it as the vetting gate. But apply it **strictly**: the "you …" clause must report a **perceptual event** ("you stop," "you keep looking"), never simulate **relationship** ("you trust," "you know"). Keep the second-person minimal and late in the sentence so it reads as an aftershock, not the writer leaning out.

---

### CONFLICT 5: Doc 04 Calls for "Authored-First" But the Render Pipeline Expects Computable Derivation
**Source:** Doc 04, lines 57–94 (schema, mapping method: "Aura should remain authored first, derived second") vs. the live repo state

**The conflict:**
- Doc 04 correctly asserts: "Aura follows the same pattern: structured derivation rules generate sensible defaults, but require editorial approval on wording, class selection, and final visual placement." Machine proposes, human writes final line.
- But the live `data.js` shows `aura[]` chips are already authored and shipped; the dossier plate does not yet exist in the renderer; `reveal/reading-panel.js` carries a placeholder.
- **No conflict with mission — this is a build-order note:** Doc 04 is correctly describing the intended flow. The implementation will work this way. But doc 04 was written as a **spec**, not against the live rendered state.

**Repo authority:** The mission brief reinforces Ground Truth #5: AUTHORED-FIRST. No override needed; doc 04 is correct.

**Resolution:** This is not a veto, but a **sequencing note for the fleet**: the dossier Aura plate (which you, H1, are not shipping) will need to route through the authored-first flow. Data already exists in structured form; the plate renderer will use it.

---

## Cross-Repo Verification Notes

### Files checked for repo-law conflicts:
- **app.js**: `renderDossier()` confirmed to produce five-plate stack (Surface Record, Archetype, Aura, Mint Record, Oracle Read). Aura is a reserved stub. ✓
- **BR-AURA-RESEARCH.md**: BR-S113 confirmed locked; kill-on-sight list confirmed (lines 82–107). ✓
- **COPY_SYSTEM.md**: Confirmed deadpan archival tone, ban on "beauty-app language," aura as careful-use word. ✓
- **HUMAN_READ_LINE_V1.md**: Confirmed image-act rule re-opens performed gesture-intent as valid material. ✓
- **README.md**: Stale seven-plate reference exists (outdated against live five-plate render). Doc 04 noted this; no action needed for research manifest. ✓

---

## Repo Laws Each Doc Touches (Summary)

| Doc | Touches BR-S113 | Touches Voice | Touches Subtraction Gate | Touches Oracle Separation | Touches Visual Residue | Touches No-Redundancy | Touches File Structure |
|-----|-----------------|---------------|------------------------|--------------------------|-----------------------|---------------------|-----------------------|
| 01 | ✓ (indirectly via tone) | ✓ (setup→reversal charge as deadpan) | ✗ | ✗ | ✗ | ✓ (class line separate from prose) | ✗ |
| 02 | ✓ (afterimage as non-person) | ✗ | ✓ (explicit: residue not mechanics) | ✓ (aura seen, oracle read) | ✓ (core law of section) | ✓ (80/20 mark/language split) | ✗ |
| 03 | ✓ (ATTEMPTS relaxation; rejected) | ✗ | ✓ (four-zone filter operationalizes it) | ✗ | ✗ | ✗ | ✗ |
| 04 | ✓ (defines how image-act rule works) | ✓ (archive tone in copy) | ✓ (mentions explicitly at line 8–9) | ✓ (oracle separation check in testing) | ✓ (overrides doc 04's map visual with doc 02) | ✓ (testing checklist forbids duplication) | ✓ (data.js, app.js, reveal, styles.css) |
| 05 | ✓ (four-zone filter vets person-safety) | ✓ (grammar as voice infrastructure) | ✓ (reads-as as the core hinge) | ✗ | ✗ | ✓ (warns against synthetic personalization) | ✗ |

---

## Key Dependencies for Downstream Agents

1. **Visual builders (docs 04 + 02 synthesis):** Doc 04's schema + doc 02's four visual directions. Do NOT use doc 04's literal Field Map SVG.
2. **Copy writers (docs 01 + 05 synthesis):** Doc 01's two-beat structure + doc 05's is→reads-as pivot + doc 03's four-zone filter (mechanics only, reject the relaxed law).
3. **Safety auditors:** Use doc 03's swap test and two-second test; also BR-AURA-RESEARCH.md kill-on-sight list (lines 82–107) as the true vetting gate.
4. **Reveal module builders (future pass):** Doc 04, lines 23–24 shows the placeholder copy in reading-panel.js; doc 02 can inform a reduced visual derivative once dossier is stable.
