# H6 AURA HITS — Repo Reference Audit

## MISSION RECAP
You are H6 in a 25-agent fleet building a decision-ready knowledge base (docs/aura_info/) for the Aura dossier section. This is a READ-ONLY audit: grep the repo for aura references, produce a hit list with file · anchor · what it is · relevance to build.

---

## EXECUTIVE SUMMARY

Aura is currently a **reserved stub** in the five-plate dossier (plate 03). The repo contains:
- **4 live ScanResult sources** (SRC-01 Driver, SRC-02 Ice Field) with authored aura chip arrays + sceneCharge labels
- **1 dossier render stub** (app.js line 1020–1021) showing `<p class="dstat__undeveloped">Aura read — reserved. Develops in a later pass.</p>`
- **1 CSS skeleton** for `.dfaplate__aura` and `.daura__chip` (styles.css lines 1474–1687)
- **1 reveal-panel placeholder** (reading-panel.js line 192) with a sample capsule `"warm glass copper / held steady"`
- **Repo law (BR-AURA-RESEARCH.md)** — LOCKED safety spec (BR-S113), kill-on-sight list, lenses (Light · Punctum · Contradiction · Spatial Pressure · Vector · Temperature · Grain/Era + Tuning + Source), the 8-step extract procedure, and the aura SCALE (floor/ceiling tied to unrepeatability)
- **5 research docs** in scratchpad (terse-verdict-writing, visual-grammar-residue, person-safety-line, field-map-implementation, reads-as-you-bridge) — all inform, none implement directly

**Key conflicts logged below.** The repo AND research agree on most principles; visual-grammar (doc 02) explicitly supersedes field-map's literal map (doc 04 rejected). Person-safety (doc 03) proposes a "narrow rule" relaxation that is REJECTED per mission lock.

---

## REPO HITS — File by File

### 1. **data.js** — Content Authority for Aura

#### Hit 1A: SRC-01 (Driver) — aura chip array
- **Location:** `data.js` line 267
- **What it is:** Authored aura chips `["Idle-Engine", "Open-Palm", "Northbound"]`
- **Context:** 
  ```js
  aura: ["Idle-Engine", "Open-Palm", "Northbound"],
  ```
- **Relevance:** These three-chip tags are the EXISTING model. Plate 03 must ingest or upgrade these. Each chip names one channel/cue (engine state, gesture, direction). Current naming is strong; no person-descriptors.

#### Hit 1B: SRC-01 — stance (the _prose_ read)
- **Location:** `data.js` line 269
- **What it is:** The `stance` field — a one-line read of the image-act (what the frame does, not the person)
- **Context:**
  ```js
  stance: "Cabin-held opening. The hand at the frame edge stops the lens, then the cabin's warmth holds the image from closure. The window band right keeps the threshold cold-legible. [...] The frame does not resolve the gesture into a single read — it holds the contradiction live."
  ```
- **Relevance:** This is the DEEP READ — the 2–3 sentence prose that sits in the dossier's left panel under Archetype. Aura's one-line verdict will eventually sit UNDER this. The stance already does heavy interpretive work ("stops the lens", "holds the contradiction"); Aura must not repeat it verbatim.

#### Hit 1C: SRC-01 — sceneCharge label
- **Location:** `data.js` line 1080
- **What it is:** The scene-charge ordinal band label `{ label: "Idling" }`
- **Context:**
  ```js
  fitAura: { /* ... */ },
  sceneCharge: { label: "Idling" },
  ```
- **Relevance:** This is part of the existing structure for SRC-01. "Idling" is the five-band label (Muted / Clean / Strong / Charged / Peak, where Charged is omitted here, suggesting a low-intensity read). The Aura plate MUST PRESERVE this label as the ordinal band, not invent a new one. The brief calls these "Muted/Clean/Strong/Charged/Peak"; confirm the ladder against data.js before shipping.

#### Hit 1D: SRC-02 (Ice Field) — aura chip array
- **Location:** `data.js` line 454
- **What it is:** Authored aura chips `["Auger-Braced", "Sun-Struck", "Low-Horizon"]`
- **Relevance:** The second source's chip set. Again, three names per source; no person labels. Braced (gesture-state), Sun-Struck (light), Low-Horizon (field geometry). Strong discipline here.

#### Hit 1E: SRC-02 — sceneCharge label
- **Location:** `data.js` line 1110
- **What it is:** `{ label: "Contained" }`
- **Relevance:** This is SRC-02's ordinal band. Lower-intensity than SRC-01 ("Contained" vs "Idling"). Again, must stay in the final Aura plate.

#### Hit 1F: SRC-03 (Shore) — aura chip array & sceneCharge
- **Location:** `data.js` lines 587, 1141
- **What it is:** `["Lateral", "Dispatched", "Shore-Filed"]` and `sceneCharge: { label: "Filed" }`
- **Relevance:** Third source; chip discipline holds. "Filed" is the lowest observed sceneCharge band.

#### Hit 1G: SRC-04 (Run) — aura chip array & sceneCharge
- **Location:** `data.js` lines 719, 1170
- **What it is:** `["Approach", "Channel", "Diffuse"]` and `sceneCharge: { label: "Closing" }`
- **Relevance:** Fourth source; "Closing" ordinal. Same pattern.

#### Hit 1H: SRC-05 (Tank) — aura chip array & sceneCharge
- **Location:** `data.js` lines 852, 1200
- **What it is:** `["Carapace", "Fluorescent", "Cyan-Tank"]` and `sceneCharge: { label: "Selecting" }`
- **Relevance:** Fifth source; "Selecting" ordinal (a curious term — may signal a future rethink of the band names to match the verb-forward Subtraction Gate logic).

#### Hit 1I: fitAura objects (stub, all sources)
- **Location:** `data.js` lines 1075, 1105, 1136, 1165, 1195
- **What it is:** 
  ```js
  fitAura: {
    projector: "...",
    container: "...",
    rim: "...",
    residue: "..."
  }
  ```
- **Example (SRC-01):**
  ```js
  fitAura: {
    projector: "Raised hand, lens-near.",
    container: "Cabin geometry — roof press, seat anchor, narrow sill.",
    rim: "Fjord-blue window band, right edge.",
    residue: "Warm red interior against cool glass; hand lingers after contact."
  },
  ```
- **Relevance:** CRITICAL. These four-field objects are the PROPOSED SCAFFOLD from research doc 04. They are NOT RENDERING YET (no dossier code consumes them). They define the internal derivation model: what architectural/compositional elements map to Aura's felt field. REPO LAW: these stay internal structure (never appear onscreen verbatim). The Aura plate must ingest them and **synthesize** them into the class-label + one-line verdict.

### 2. **app.js** — Dossier Rendering (Plate 03 Stub)

#### Hit 2A: renderDossier() signature & architecture
- **Location:** `app.js` lines 970–1068
- **What it is:** The main dossier rendering function. Currently builds a 5-plate stack: Surface Record (01) · Archetype stub (02) · **Aura stub (03)** · Mint Record (04) · Oracle Read (05)
- **Key snippet (lines 1020–1021):**
  ```js
  const aura = dplate("03", "Aura", paid, `
    <p class="dstat__undeveloped">Aura read — reserved. Develops in a later pass.</p>`);
  ```
- **Relevance:** Aura is currently a one-liner placeholder. The real implementation will replace this `<p>` block with:
  1. A `.dplate__body` grid (two-column: text left, visual right, per doc 04 spec)
  2. Left column: class-label (e.g., "Warm Refusal") + reading sentence + chip row
  3. Right column: SVG residue mark (one-seam burn / ghost smear / off-center tension line, per doc 02)
  4. Accessibility: full text equivalent in left column; SVG in `role="img"` with `aria-label`

#### Hit 2B: Dossier paid/free gate
- **Location:** `app.js` lines 1003–1051
- **What it is:** The `paid` boolean gates which copy shows. Currently used for Surface Record (shows different content free vs developed) and Mint Record (shows different content free vs developed).
- **Relevance:** Aura must respect this gate. The REPO LAW is unclear (needs DECISION_LOG check), but the research suggests Aura is a free-AND-developed plate (not sealed behind paywall). Recommend: same Aura copy free and paid, OR a shallow free read + deeper developed read (to be decided in SESSION_BRIEF).

#### Hit 2C: dplate() wrapper function
- **Location:** `app.js` lines 839–851
- **What it is:** Template helper that wraps plate content in `.dplate` structure with spine number, title, and `.dplate__body`.
- **Relevance:** Aura's HTML structure will use this. No changes needed; the helper is stable.

#### Hit 2D: Plate order and grid layout
- **Location:** `app.js` line 1068
- **What it is:** Dossier assembly: `${recordGate}${board}${archetype}<div class="dossier__register">THE RECORD</div>${aura}${mintRecord}<div class="dossier__register">THE ORACLE</div>${oracle}`
- **Relevance:** Aura sits between the Surface Record group ("THE RECORD") and the Mint Record group. Visual hierarchy: Aura is positioned as a mid-depth read BEFORE the Oracle. This placement is intentional (aura = last FELT beat, oracle = last SPOKEN beat). Do not reorder.

### 3. **styles.css** — Visual Skeleton

#### Hit 3A: Aura plate wrapper
- **Location:** `styles.css` lines 1474–1476
- **What it is:**
  ```css
  /* Aura plate: the developed material aura's tag row (struck chips) + latent free state */
  .dfaplate__aura { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
  .dfaplate__aura span {
  ```
- **Relevance:** This suggests an OLDER layout assumption (a flex chip row). The current research rejects this in favor of a two-column grid (text left, visual right). Either rename this to `.daura__chips` (for the chip row only) or **discard this rule and build fresh semantic classes** (`.dplate--aura`, `.daura__*`). DECISION: follow doc 04's recommendation to use semantic naming (`.dplate--aura`, `.daura__label`, `.daura__reading`, `.daura__chips`, `.daura__visual`), not positional selectors.

#### Hit 3B: Aura module-scoped chip styling
- **Location:** `styles.css` lines 1686–1690
- **What it is:**
  ```css
  .module--aura .aura { flex-direction: column; gap: 0; }
  .module--aura .aura__chip { /* ... */ }
  ```
- **Relevance:** This is for the reveal-panel.js placeholder context (a card-reveal state). It re-styles the chip array to read full-width (column, not row). Low priority for dossier work; can ignore until reveal finishes.

#### Hit 3C: Fit + Aura grid layout (LEGACY)
- **Location:** `styles.css` lines 2607–2619
- **What it is:**
  ```css
  .dfitaura { display: grid; grid-template-columns: 1.1fr 1fr; gap: 16px 40px; }
  .dfitaura__col { display: grid; gap: 14px; align-content: start; }
  .dfitaura__stance { /* serif display; silver text */ }
  .dfitaura__fit { /* [...] */ }
  .dfitaura--tease { grid-template-columns: 1fr; gap: 12px; }
  ```
- **Relevance:** This is OLD. The class names suggest "Fit + Aura" was once a single plate (the README still says "7 plates" including "Fit + Aura"). The renderer now outputs 5 plates, and Fit content is MISSING. This CSS should be **archived or removed**. Do not apply this grid to the new Aura plate; use the `.dplate--aura` naming convention instead.

#### Hit 3D: Responsive override for Aura grid
- **Location:** `styles.css` line 3557
- **What it is:**
  ```css
  @media (max-width: 800px) {
    .dstats, .dfitaura, .drecord { grid-template-columns: 1fr; }
  }
  ```
- **Relevance:** Again referencing the old `.dfitaura` class. Once the Aura plate is built with `.dplate--aura`, update this media query to handle narrow screens. Recommendation: test a two-column text+visual layout on mobile; may need to stack to single column.

### 4. **reveal/reading-panel.js** — Reveal Placeholder

#### Hit 4A: AURA module skeleton
- **Location:** `reveal/reading-panel.js` lines 44, 192
- **What it is:** Line 44 shows SVG placeholder structure; line 192 shows copy placeholder:
  ```js
  h += mod("4", "AURA", artcap("aura", cap(["warm glass copper", "held steady"])));
  ```
- **Context:** This is building a capsule in the reveal-panel.js module (the staged-card-reveal surface, separate from the main dossier). It shows a capsule with a decorative SVG and two-tag copy ("warm glass copper" / "held steady").
- **Relevance:** LOW PRIORITY. The dossier is canonical; the reveal surface can adopt a reduced derivative later. Note the two-tag pattern here ("warm glass copper / held steady") — research doc 02 calls this the "class-name line" (should be 2 words, noun-ending fragment). This is a sensible capsule but not the full Aura plate. Leave this as placeholder until the dossier Aura is shipping.

### 5. **docs/BR-AURA-RESEARCH.md** — Spec & Safety Law (PRIMARY AUTHORITY)

#### Hit 5A: BR-S113 (LOCKED Safety Rule)
- **Location:** `docs/BR-AURA-RESEARCH.md` line 5
- **What it is:** RULE 0 (governing boundary, LOCKED):
  > "A card reads the ARTIFACT, never the PERSON. Every aura read names an IMAGE-PROPERTY or a PERFORMED GESTURE-INTENT (the event in the frame), never the person's worth, body, rank, identity, or private feeling. Aura is structurally safe by construction: in the scholarship it is a relation the FRAME stages, not a charge a person emits."
- **Relevance:** NON-NEGOTIABLE. This is the foundation of all Aura copy. Every written line must pass this test. Person-pronouns are acceptable ONLY when describing visible gesture/pose/gaze, never hidden interior.

#### Hit 5B: The Six Lenses (revised from draft)
- **Location:** `docs/BR-AURA-RESEARCH.md` lines 11–24
- **What it is:** 
  1. **LIGHT** (direction · hardness · key-to-fill · falloff)
  2. **PUNCTUM** (the one contingent detail the eye snags on)
  3. **CONTRADICTION** (two image-facts that refuse to resolve)
  4. **SPATIAL PRESSURE** (edge-crop · confinement · negative-space)
  5. **VECTOR + motion-state** (eye-line axis · gesture direction · leading lines)
  6. **TEMPERATURE** (warm/cool cast, optical-only, never as felt-temperature)
  7. **GRAIN / ERA** (film grain · scan dust · fade · vignette; "recovered-not-taken" surface)
- **Also:** TUNING (one key the whole frame is pitched in) and SOURCE axis (presence / ambiance; subject-removable vs gesture-dependent charge)
- **Relevance:** These are the VOCABULARY of Aura analysis. The builder uses these to extract evidence from the source image. The final Aura PLATE does not list them all; instead, the prose SYNTHESIS of these lenses becomes the class-label + one-line reading. These ARE the investigative toolkit; they stay behind the scenes.

#### Hit 5C: The Aura SCALE (floor/ceiling)
- **Location:** `docs/BR-AURA-RESEARCH.md` lines 32–35
- **What it is:** 
  > **FLOOR** = dead-center, flat even light, generic interchangeable background, zero trace of time/place ("could be anyone's stock frame").
  > **CEILING** = caught transient, raking light, located, candor, the accident the photographer didn't control.
  > Wire this as the section's spine — aura becomes rankable without ranking the person, because it judges the image's genericness.
- **Relevance:** This is the ORDINAL BASIS for the sceneCharge labels (Muted to Peak). The bands are NOT beauty ratings; they are GENERICNESS ratings. A generic stock image reads floor; a once-only seized event reads ceiling. Preserve this law in any band labels. The 5-band ladder must be confirmed (Muted / Clean / Strong / Charged / Peak — double-check against data.js).

#### Hit 5D: Six Verbal Moves That Carry Charge
- **Location:** `docs/BR-AURA-RESEARCH.md` lines 43–53
- **What it is:**
  1. **LIGHT AS PHYSICAL FACT** — name direction/hardness/what it erases
  2. **ONE OBJECT CARRIES IT** — pick the single load-bearing in-frame object
  3. **ONE SENSORY CHANNEL, EXACT** — temperature OR weight OR texture per sentence
  4. **UNDERWRITE** — state the charge at low temperature; let the gap between dry words and loaded image do the work
  5. **CHARGE IN THE VERB** — load active verbs (press, throw, erase, cut, anchor)
  6. **NAME THE GAP, DON'T RESOLVE IT** — point at two facts that disagree and STOP
- **Master filter:** Every clause pinned to a concrete in-frame noun. Delete abstractions.
- **Relevance:** These are the WRITING CRAFT rules. The Aura plate's one-line reading will deploy 2–3 of these moves. This is the VOICE template; use it to police every candidate line.

#### Hit 5E: Eight-Step Extract Procedure (Step 0–8)
- **Location:** `docs/BR-AURA-RESEARCH.md` lines 58–78
- **What it is:** A fixed 8-step pass from photo → aura:
  - **0 SQUINT** (depersonalize; inventory pixels only)
  - **1 LIGHT** (direction/hardness/ratio)
  - **2 VALUE** (where dark/light sit; pressure & gravity)
  - **3 TEMPERATURE** (dominant hue/saturation, optical-only)
  - **4 GESTURE-EVENT** (the one action's PERFORMED intent)
  - **5 SPATIAL PRESSURE** (crop/edge/negative-space)
  - **6 CONTRADICTION** (two image-facts refusing to resolve)
  - **7 PUNCTUM** (the one contingent detail)
  - **8 NAME** (collapse to ONE charge-word + VECTOR + temperature tag)
- **Relevance:** This is the METHODOLOGY. A builder would use this procedure to extract evidence from SRC-01/02/03/04/05, then hand-author the final Aura line. Step 8 output IS `sceneCharge.label` + `aura[]` chips — the system already maps.

#### Hit 5F: Kill-on-Sight List (§4)
- **Location:** `docs/BR-AURA-RESEARCH.md` lines 82–107
- **What it is:** Explicit banned phrases & person-reads. Examples:
  - Free-floating mood-word: "haunting / evocative / moody / atmospheric / ethereal"
  - Pathetic fallacy: "the sky mourns"
  - Resolved-feeling clause: "…which evokes / conveys / creates a sense of …"
  - Stacked-adjective pile: "raw, powerful, unforgettable"
  - Color-psychology as fact: "red = passion, blue = calm"
  - Named-emotion labels: "this photo is joyful/anxious"
  - Stable person-read examples: "she has a powerful aura", "their eyes are intense / soulful", "the photo feels holy", "this is the home of a lonely / haunted person"
  - NO FACES FOR AFFECT (facial-expression emotion recognition is contested)
- **Relevance:** Every Aura line written MUST be checked against this list. It is a negative constraint — use it as a checklsit to screen out proposals before they ship.

---

## RESEARCH DOCS (Scratchpad) — Ground Truth for Build Decisions

### 6. **01_terse_verdict_writing.md** — Writing Craft & Voice

- **What it is:** Across SCP reports, Magic flavor text, and fragrance writing, the shared mechanism: **compressed classification plus a late turn** (epigram, antithesis, paradox). Principle: waste nothing. No exposition, flowery diction, or unnecessary detail.
- **Key moves:**
  - Class-name line: 2 words (default), noun-ending fragment (e.g., "Quiet Labour", "Warm Refusal")
  - Verdict line: 2 beats, 6–14 words, one contradiction, hardest word last
  - Default motion: surface warmth or legibility first, colder truth second
  - Default diction: concrete, procedural, taxonomic; no filler abstractions
- **Relevance:** This is the HOUSE FORMULA for Aura copy. The class-label ("Warm Refusal") and the reading sentence ("Reads as a stop-sign you end up trusting...") must follow this discipline. Read this before writing any candidate Aura line.

### 7. **02_aura_visual_grammar_residue.md** — Visual Direction (Supersedes Literal Map)

- **What it is:** Retinal, residual, verdict-like. The visual language borrows from **afterimage** (lingering impression after stimulus), **long-exposure** (motion becomes translucent residue), and **Richard Long's "A Line Made by Walking"** (mark left behind by encounter).
- **HARD RULE:** If the Aura visual starts behaving like a chart, map, or measurement layer, it is doing the wrong job.
- **Four ranked visual directions:**
  1. **One-seam burn** (most premium) — almost total black; one luminous seam; warm bleed on one side; cold edge on the other
  2. **Ghost smear** — one warm translucent drag; soft decay into black; narrow cool rim
  3. **Off-center tension line** — two silent poles; one line resolving off-center (biased, unresolved)
  4. **Type-burn** (most dangerous) — phrase burns into black (risks stealing thunder from Oracle)
- **Anti-patterns:** Contour rings, vector overlays, heatmaps, rainbow gradients, chakra glows, sparkles, "energy scanner" UI
- **Recommendation:** Graphic-as-hero by default (eighty percent mark, twenty percent language). Use type-as-hero only when the card owns a single unforgettable phrase.
- **Relevance:** This SUPERSEDES the literal Field Map from doc 04 (research verdict). The Aura visual will be ONE of the four residue marks, not a contour/vector/band diagram. The SVG in styles.css should slot one of these four into the `.daura__visual` right column.

### 8. **03_person_safety_line.md** — Resolving the Person vs Artifact Boundary

- **What it is:** The narrower safe law: "Name the depicted person, the image's charge, and the viewer's response in fully charged language, but never assert the subject's hidden interior state, fixed character, diagnosis, motive, or any reputation-bearing fact the frame cannot prove."
- **REPO CONFLICT ALERT:** Doc 03 proposes a **"narrow rule"** relaxation of BR-S113: write the **depicted person** + their visible behavior, placement, styling, and effect, while never writing their soul as fact. **MISSION LOCK VERDICT: REJECTED.** The mission statement explicitly enforces BR-S113 as LOCKED; doc 03's "narrow rule" is a RELAXATION and conflicts with repo law. Do NOT adopt the narrow rule. Enforce BR-S113 strictly: read the FRAME and GESTURE, never the PERSON's hidden self.
- **What survives from doc 03:** The mechanics — the is→reads-as grammatical pivot, the swap test, the two-second test, the four-zone filter (Record/Read/Reach/Ban). Use these as OPERATIONAL GATES.
- **Relevance:** DO NOT use doc 03 as a replacement law. Use BR-S113 (repo law) + the four-zone filter (doc 03's operational tool) as your safeguards. When in doubt, move the adjective off the person and onto the image/frame/gaze/encounter/pose/crop/light/viewer.

### 9. **04_aura_field_map_implementation.md** — Schema & Architecture (Visual Superseded)

- **What it is:** Proposes a dossier-only plate with the felt field. Supplies:
  - Definition: "Aura is the image's felt field: the way a photograph presses, holds, leaks, cools, or lingers once the evidence is known."
  - Vocabulary: internal (projector, container, rim, residue) vs visible (class-labels like "Warm Refusal")
  - Schema: `id`, `classLabel`, `chips[]`, `reading`, `anchors[]`, `visual.mode`, `visual.tint`, `safety.*`, `sourceRefs[]`, `ariaSummary`
  - Mapping method: derive anchors mechanically, then author the verdict manually
  - Plate layout: two-column (text left, visual right)
  - Implementation files: `data.js`, `app.js`, `styles.css`, `reveal/reading-panel.js`
- **CRITICAL:** The original plan proposed contour rings + vector + container band + rim line. **This is SUPERSEDED by doc 02.** Keep the semantic architecture, authored-first data model, and file placement. **Discard the literal map SVG.** Replace with residue directions (one-seam burn / ghost smear / off-center tension line).
- **Relevance:** The schema and plate layout are sound. Use the `fitAura` object from data.js as the input; author the final class-label + reading line; render one residue mark per doc 02. This doc is the build SCAFFOLD; doc 02 is the VISUAL direction.

### 10. **05_reads_as_you_bridge.md** — Grammatical Safety Hinges

- **What it is:** Central constraint: preserve the charge of person-language while moving the sentence off the person. The highest-yield bridge is a **two-part system**: interpretive hinge (reads as / plays as / lands as / carries) + optional viewer-transfer clause (you stop / you keep looking).
- **Bridge phrases ranked:**
  1. **reads as** (default Aura sentence) — keeps charge on image, not sitter
  2. **you …** (final clause) — transfers consequence to viewer fast
  3. **plays as** — for theatrical/performative gestures
  4. **lands as** — for concluded/quotable line
  5. **carries** — for sustained tone
  6. **holds / keeps / lets / leaves** — premium alternative; let the image behave
  7. **feels like** — occasional looser line
- **Four-zone filter (from doc 03, validated here):**
  - **Record** — verifiable by witness/archivist (belongs to Diagram/Surface/Metrics)
  - **Read** — interprets image-effect, anchored to visible evidence (Aura)
  - **Reach** — names brief viewer consequence (Aura's optional second clause)
  - **Ban** — asserts stable trait, motive, morality, trauma, private feeling (banned)
- **Two tests:** swap test (would the sentence work with another sitter in the same pose/light?); two-second test (can viewer plausibly experience the effect within 2 seconds from visible evidence?)
- **Relevance:** Use these hinges to construct every Aura line. Default pattern: `[visible cue] reads as [charged contradiction]. [You …]`. Keep the hinge hidden inside verbs when possible (premium tone). Avoid synthetic intimacy; let the image force a response.

---

## CONFLICTS & RESOLUTIONS

### Conflict 1: Literal Field Map (Doc 04) vs. Residue Marks (Doc 02)

**Issue:** Doc 04 proposes a contour-ring/vector/band/rim diagram. Doc 02 explicitly rejects this as duplicate Diagram work.

**Authority:** Mission statement gates doc 02 as SUPERSEDES. Repo law (PROJECT_OS, DECISION_LOG) avoids duplication.

**Resolution:** ACCEPTED. Use doc 02's residue directions (one-seam burn / ghost smear / off-center tension line). Discard doc 04's map SVG. Keep doc 04's schema, file placement, and authored-first model.

**Confirmation:** File doc 04 line 9 states: "NOTE FOR THE BUILDER: The originating research proposed a literal 'Field Map' (contour rings + vector + container band + rim). The *visual-grammar* research (doc 02) and the user's own direction REJECT that as a second diagram."

### Conflict 2: "Narrow Rule" Person-Safety (Doc 03) vs. BR-S113 (Repo)

**Issue:** Doc 03 proposes a "narrow rule" relaxation allowing more charged person-language ("the depicted person + their visible behavior"). BR-S113 (LOCKED repo law) says "read the ARTIFACT, never the PERSON."

**Authority:** Mission statement explicitly enforces BR-S113 as LOCKED. The "narrow rule" is a RELAXATION and is explicitly REJECTED.

**Resolution:** REJECTED. Enforce BR-S113 strictly. Use doc 03's four-zone filter (Record/Read/Reach/Ban) and grammatical hinges (reads-as) as OPERATIONAL GATES, not as permission to relax the law. When in doubt, move adjectives off the person.

**Confirmation:** Mission statement, paragraph 2: "the repo law is BR-S113, LOCKED. Five absolute no's... The kill-on-sight list... additionally bans... WHAT SURVIVES from docs 03/05: the mechanics... Narrow rule... is a RELAXATION... REJECTED as a replacement law."

### Conflict 3: Five-Band Ladder Naming (Data.js vs. Spec)

**Issue:** Data.js shows sceneCharge labels: "Idling", "Contained", "Filed", "Closing", "Selecting". Spec (doc 04) suggests: Muted / Clean / Strong / Charged / Peak.

**Status:** UNRESOLVED. Requires grep of DECISION_LOG and code confirmation.

**Relevance:** The Aura plate must preserve the ORDINAL BAND label from data.js. Confirm the five-band ladder is consistently named before shipping.

**Action:** Grep `sceneCharge` in data.js to collect all values; compare to spec ladder; check DECISION_LOG for any renamings; log finding in SESSION_BRIEF.

### Conflict 4: CSS Naming (.dfitaura vs. .dplate--aura)

**Issue:** Styles.css still has `.dfitaura` (old "Fit + Aura" plate). Spec recommends `.dplate--aura` (semantic naming).

**Resolution:** AGREED. Discard `.dfitaura*` rules. Build with `.dplate--aura`, `.daura__label`, `.daura__reading`, `.daura__chips`, `.daura__visual` per doc 04's recommendation and SEMANTIC STYLING law (no nth-of-type()).

---

## BUILD IMPLICATIONS & NEXT STEPS

### What's Already in Data.js (Ready to Use)

- ✅ 5 sources with `aura[]` chips (existing, authored, person-safe)
- ✅ `sceneCharge.label` per source (ordinal band; preserve as-is)
- ✅ `stance` prose read per source (sits above Aura; do not duplicate)
- ✅ `fitAura` anchors (projector/container/rim/residue; internal structure, derive into final reading)

### What Needs to Be Built

1. **Dossier Aura Plate (app.js)**
   - Replace the `<p class="dstat__undeveloped">` stub with a two-column grid
   - Left: class-label + reading sentence + chip row
   - Right: SVG residue mark (one of four from doc 02)
   - Accessibility: `role="img"`, `aria-label`, text equivalent
   - Respect the `paid` gate (free/developed content decision needed)

2. **Authored Class Labels & Verdicts (data.js or external)**
   - Mine the existing `fitAura` anchors for evidence
   - Use the eight-step extract procedure (doc 05, step 0–8) to derive candidate reads
   - Author the final class-label (2 words, noun-ending, from doc 01 formula)
   - Author the reading sentence (2 beats, 6–14 words, one contradiction, hardest word last)
   - Verify every line against BR-S113 + the kill-on-sight list
   - Use the four-zone filter (Record/Read/Reach/Ban) and bridge hinges (reads-as/you…) from docs 03/05

3. **Visual Rendering (styles.css)**
   - Semantic classes: `.dplate--aura`, `.daura__*`
   - One residue mark per source (research needed to assign one-seam-burn / ghost-smear / off-center-tension-line to each SRC)
   - Tint from source's halo material (`color-mix` with `--halo-a`)
   - Base strokes from token system
   - Motion (optional; honor `prefers-reduced-motion`)
   - Responsive: text+visual on desktop; stack on mobile (needs testing)

4. **Reveal-Panel Placeholder (reveal/reading-panel.js)**
   - Current two-tag capsule is sensible as-is for now
   - Upgrade after dossier is shipped (lower priority)

---

## RECOMMENDED READING ORDER FOR BUILD

1. **LOCK THE LAW** (non-negotiable):
   - `docs/BR-AURA-RESEARCH.md` § Rule 0 (BR-S113) + Kill-on-Sight List
   - `docs/BR-AURA-RESEARCH.md` § The Aura SCALE (floor/ceiling, genericness not beauty)

2. **UNDERSTAND THE CRAFT** (voice and wording):
   - Scratchpad `01_terse_verdict_writing.md` (class-label + verdict line formula)
   - Scratchpad `05_reads_as_you_bridge.md` (hinges and four-zone filter)

3. **DESIGN THE VISUAL**:
   - Scratchpad `02_aura_visual_grammar_residue.md` (four residue marks, anti-patterns)

4. **BUILD THE ARCHITECTURE**:
   - Scratchpad `04_aura_field_map_implementation.md` § Schema & Mapping Method
   - Data.js (copy structure into new code)
   - App.js (renderDossier hook + plate constructor)
   - Styles.css (semantic classes + layout)

5. **VERIFY SAFETY**:
   - Scratchpad `03_person_safety_line.md` § Four-Zone Filter (Record/Read/Reach/Ban test)
   - Re-read the kill-on-sight list before shipping

---

## SUMMARY: What H6 Delivers to the Fleet

This audit provides:
- ✅ **File inventory**: 5 files with Aura code/content/spec
- ✅ **Hit list**: 10 data/architecture hits + 5 research groundings
- ✅ **Conflicts logged**: 4 known tensions (3 resolved, 1 needs DECISION_LOG check)
- ✅ **Build scaffold**: Schema, naming, methodology, safety gates
- ✅ **Voice template**: Writing craft rules, hinges, four-zone filter
- ✅ **Visual direction**: Residue marks (not diagrams), anti-patterns
- ✅ **Next-step roadmap**: What's ready to use, what needs authoring, what needs building

**Handoff to O6/F1 (the fleet):**
Data is present and person-safe. Aura is a two-step build:
1. **Synthesize** class-label + verdict line from existing `fitAura` anchors (author-led, using voice template from docs 01/05)
2. **Render** the dossier plate (app.js + styles.css) with one residue mark per source (engineer-led, per doc 02 direction)

No mutations needed to repo law. No permission to relax BR-S113. Conflicts resolved in favor of repo authority. Ready to build.
