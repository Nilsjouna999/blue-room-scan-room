# H4 Lexicon — Aura Synthesis | Final Deliverable

**Agent:** H4 — LEXICON  
**Status:** Complete, read-only research compilation  
**Built from:** 5 research docs (01_terse_verdict_writing.md through 05_reads_as_you_bridge.md) + 3 repo authoritative docs (BR-AURA-RESEARCH.md, COPY_SYSTEM.md, HUMAN_READ_LINE_V1.md)  
**Verified:** Ground truth hierarchy applied (repo wins where conflicts exist; all conflicts logged)  
**Date:** 2026-07-05

---

## Deliverable Location

Full lexicon compiled to:  
**`C:\Users\nilsj\AppData\Local\Temp\claude\C--Users-nilsj-OneDrive-Documents-blue-room-scan-room\77030846-b4d3-461e-a41a-c99d8c3b9c4f\scratchpad\H4_LEXICON_AURA.md`**

This is a **read-only knowledge base** for O6/F1 dossier-section build. It contains no generated copy, no templates, and no mutating recommendations — only vocabulary, safety gates, worked examples, and conflict markers.

---

## Lexicon Contents (12 Sections)

### I. Class-Line Nouns (Material / Institutional / Moral)
**35 candidate words**, force-ranked by repo-fit and charge. Format: word | source doc | use verdict | risk | example.

**Highest-confidence material nouns:** seam, burn, ash, frost, glass  
**Highest-confidence institutional nouns:** labour, refusal, custody, exit, field, hold, pressure  
**Highest-confidence moral nouns:** decorum, debt, witness, stance, distance

### II. Verbs of Residue
**20+ verbs**, ranked by Blue Room fit. These describe what *remains after* the image is first encountered.

**Tier 1 (default hinges):**
- reads as (doc 05, rank 1)
- plays as (performance-reads)
- lands as (verdict-final)
- carries (sustained tone)

**Tier 2 (retention/afterimage):**
- holds, keeps, leaves, lets, smear, drag, cling, cool, taper, fray, thread, press, release, clear, stain, resolve, recede

**Explicitly killed:** evoke, convey, "create a sense of", suggest, inspire, emanate

### III. Bridge Phrases (Full Sentences)
**Three sentence patterns** with worked examples:

**Pattern A:** `[visible cue] reads as [contradiction]. You [viewer response].`  
**Pattern B:** `[gesture/object] [holds/leaves/plays] [charge].`  
**Pattern C (SCP-inflected):** `[surface read]. [colder correction/residue].`

Plus **Tier 2 Viewer-Transfer Clauses** (safe patterns: "you stop", "you hesitate", "you keep looking"; banned: "you realize he is kind", "you trust him") and the **two-second test** for validating second-person use.

### IV. Contradiction Pairs (GPT-Grade Synthesis)
**Documented pairs** from repo sample data:
- Warm Refusal
- Quiet Labour
- Cold Exit

Plus derived pairs: comfort ↔ threat, devotion ↔ transaction, warmth ↔ damage, ritual ↔ machinery, care ↔ control.

These name the **tension** the frame stages, not adjective-stacking.

### V. Chip Candidates (Quick-ID Tags)
**Sourcing formula** from doc 04: Projector → Container → Rim → Residue, each mapped to concrete image cues (not moods).

**SRC-01 model:** `["Open-Palm", "Cabin-Frame", "Fjord-Glass"]`  
**SRC-02 model:** `["Auger-Braced", "Sun-Struck", "Low-Horizon"]`

Chip rules: hyphenated compound nouns, concrete + state/property, never mood-words or person-adjectives.

### VI. Banned Words (Kill-on-Sight List)
**Consolidated from all sources:**

**A. Mood / Energy / Essence (NEVER):**  
vibe, aura (overuse), mood, energy, presence, soul, essence, spirit, haunting, evocative, ethereal, atmospheric, magical, transcendent, je-ne-sais-quoi

**B. Resolved-Feeling Clause (NEVER):**  
"which evokes / conveys / creates a sense of"

**C. Beauty-App / Person-Rating (NEVER):**  
stunning, gorgeous, attractive, hot, pretty, handsome, facial, body, glow-up, beauty, genetics

**D. Pathetic Fallacy (NEVER):**  
"the sky mourns", "the room weeps", "nature's indifference"

**E. Person-Interior Claims (BANNED per HUMAN_READ_LINE_V1 / BR-S113):**  
hidden feeling, fixed character, diagnosis, motive/intention, moral judgment, worth/ranking, attributed body-read

**F. Stacked Adjectives (MAX 2, prefer 1):**  
No "raw, powerful, unforgettable, breathtaking" piles

### VII. Mapping: Lexicon → Subtraction-Gate Relation Vocabulary
**Mission requirement:** Five allowed **kind-words** (frame-geometry nouns naming the RELATION):

| Kind | Legal candidates | Notes |
|---|---|---|
| **Standoff** | hold, tension, balance, counter | Geometric opposition |
| **Edge** | edge, seam, cut, boundary, threshold, divide | Physical/optical boundary |
| **Figure-Ground** | field, surround, ratio, scale, dwarfing, overwhelming | Subject-to-container |
| **Light-Fit** | illuminant, shadow, pressure, hold, cast, separation | Light organizing space |
| **Vector-into-Void** | vector, arrow, path, reach, drag, thread, trajectory | Directed movement |

**Not legal kind-words:** refusal, labour, contradiction (these are class-LINE labels, not architectural relations).

### VIII. Verdict-Line Construction (Doc 01 + 05 Spec)
**Full spec + worked examples:**

1. Class line: 2 words, noun-ending fragment
2. Verdict line: 2 beats, 6–14 words, one contradiction, hardest word last
3. Default motion: warmth/legibility → colder truth
4. Diction: concrete, procedural, taxonomic; no abstractions

**SRC-01 example (TESTED COMPLIANT):**  
*"Reads as a stop-sign you end up trusting. The hand takes the first hit; the cabin keeps the image human; one cold strip at the glass keeps it open."*

### IX. Conflicts to Escalate (Repo vs. Research)
**Four material conflicts logged:**

1. **Doc 04 visual (Field Map) vs. Mission ground truth:** Repo wins. Use doc 02's residue directions (one-seam burn / ghost smear / off-center tension line); discard literal contour map.

2. **Doc 03 "narrow rule" relaxation vs. BR-S113 LOCKED:** Repo wins. Keep BR-S113 intact. Mechanics from doc 03 (reads-as hinge, swap test, two-second test, four-zone filter) survive as operational GATE. Named-emotion payloads die.

3. **Doc 05 "you …" as powerful/mixed vs. mission gatekeeping:** Repo wins. Use doc 05 rank 1 (reads as) + optional rank 2 (you) with strict two-second test on every instance.

4. **Repo "aura" (careful-use) vs. Doc 01 ban:** Repo wins. Use sparingly in internal labels; avoid in visible prose; prefer "charge", "field", "residue".

### X. Implementation Guidance (For O6/F1)
**For dossier Aura plate renderer:**

- **Data schema:** id, classLabel, chips[], reading, anchors[], visual.mode, visual.tint, safety.imageActBasis[], safety.noStableTraitClaim (always true), sourceRefs[], ariaSummary
- **Class-line selection:** contradiction-pair candidates, tested against banned-word and mood-word filters
- **Verdict-line construction:** doc 01 spec + bridge phrases + safety gate (re-authorable cue, image-act not person-trait, passes connotation-strip)
- **Chips sourcing:** anchor-formula (projector/container/rim/residue) mapped to concrete image cues
- **Visual mode:** doc 02 residue directions (reject doc 04 literal Field Map)
- **Accessibility:** left-column prose as text equivalent; SVG role="img" + aria-labelledby; 3:1 graphics / 4.5:1 text contrast; prefers-reduced-motion honored
- **Conflict resolution:** escalate any doc–repo tension to O6/F1; repo wins on product law, voice, file structure, and killed moves

### XI. Rapid Reference: Highest-Confidence Candidates
**For SRC-01 + SRC-02 pilot build:**

**Class labels (tested in repo):**
- SRC-01: Warm Refusal
- SRC-02: Quiet Labour

**Verdict-line hinges:**
- Primary: "reads as [charge]. You [viewer effect]."
- Secondary: "[gesture] [holds/leaves/plays] [residue]."
- Tertiary: "[legible claim]. [Colder correction]."

**Residue verbs (highest-confidence):**
- Warmth/interior: smear, drag, hold, keep, ring
- Coldness/edge: cool, cling, clear, taper, fray
- Motion: drag, thread, resolve, recede
- Containment: press, hold, gather, settle

**Kind-words (five legal architectures):**
- Standoff: tension, hold, balance
- Edge: edge, seam, cut, boundary
- Figure-Ground: field, surround, dwarfing
- Light-Fit: shadow, pressure, cast, separation
- Vector-into-Void: vector, drag, thread, reach

**Chips (3 max):**
- Format: "Open-Palm", "Cabin-Frame", "Fjord-Glass" (hyphenated, concrete + state)

### XII. Worked Full Example: SRC-01 / Driver (Complete Walkthrough)
**Class line:** Warm Refusal  
**Chips:** ["Open-Palm", "Cabin-Frame", "Fjord-Glass"]  
**Verdict line:** "Reads as a stop-sign you end up trusting. The hand takes the first hit; the cabin keeps the image human; one cold strip at the glass keeps it open."

**Safety gates (all PASS):**
- Re-authorable cue? ✓ (palm gesture, cabin interior, window crop)
- Grammatical subject? ✓ (hand, cabin, glass — image nouns)
- Connotation-strip? ✓ (no stable trait residue)

**Kind-word mapping:** Edge + Standoff  
**Visual mode:** Ghost smear or one-seam burn (warmth + cold rim)

---

## Key Findings Summary

1. **THE LEXICON IS A MENU, NOT A RULE SET.** It collects every word-bank, phrase structure, and safety gate from all five research docs + repo ground truth into one operational reference. O6/F1 still author the final Aura lines; this lexicon supplies the vocabulary and the gates.

2. **REPO WINS ON CONFLICTS.** Four material disagreements between research and product law are logged and escalated. The repo's BR-S113 (person-safety LOCKED), COPY_SYSTEM tone, and HUMAN_READ_LINE_V1 (image-act vs. permanent) are load-bearing and remain non-negotiable.

3. **AURA'S IRREDUCIBLE JOB IS NAMING THE RELATION.** Not the person's aura, not a second diagram, not a mood-board — the RELATION the frame stages (Standoff / Edge / Figure-Ground / Light-Fit / Vector-into-Void). The lexicon's five kind-words are the legal vocabulary for this.

4. **SAFETY IS STRUCTURAL, NOT A BOLT-ON.** The class-line nouns (contradiction pairs), verbs of residue, bridge phrases, and kind-words are all designed to make it *syntactically hard* to diagnose a person. The four-zone filter (Record / Read / Reach / Ban) and two-second test are the operational gates that catch slips.

5. **HIGHEST-CONFIDENCE CANDIDATES ARE ALREADY IN REPO SAMPLES.** SRC-01's "Warm Refusal" and SRC-02's "Quiet Labour" pass all gates and serve as reference implementations. Build from these for pilot; extend cautiously.

6. **NO GENERATED COPY.** This lexicon is input to hand-authored writing, not a templating engine. A human author writes the final Aura line; the machine proposes anchor evidence.

---

## For the Workflow

1. **O6** (user/Product) reviews this lexicon for vocab + tone fit; flags any category that doesn't match Blue Room voice
2. **F1** (builder) uses this as reference while implementing `renderAuraPlate()` in `app.js` + data schema in `data.js`
3. **Each Aura line** written by a human, tested against §VI (banned words), §VII (kind-word fit), and §IX (conflict escalation)
4. **All conflicts** logged in git commit messages; any repo-vs-research tension surfaced to user before ship

The lexicon is **read-only permanent reference**. Revisions go to a new LEXICON_V2 file, never overwriting this one.
