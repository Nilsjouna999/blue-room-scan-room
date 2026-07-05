# BLUE ROOM AURA DOSSIER — H5 Synthesis Report

**Status:** Agent synthesis (read-only, no code changes)  
**Date:** 2026-07-05  
**Scope:** Consolidate research docs 01-05 + repo ground truth; produce decision-ready spec for Aura dossier section with unified kill-list

---

## EXECUTIVE SUMMARY

**Aura is the image's felt field: what a photograph does to the viewer after the evidence is known.** It sits between Diagram/Surface (structural explanation) and Oracle (final verdict) as the *last felt beat before the spoken beat*. The dossier plate reads the image-act through four anchor cues (projector / container / rim / residue), presents a class label + charged one-sentence reading + three short chips, and renders one restrained visual mark (one-seam burn / ghost smear / off-center tension line) in archive black with warm/cold residue.

**Aura must:**
- Stay artifact-focused (never diagnose the person; read what the frame stages)
- Avoid duplication (Diagram owns structure, Surface owns material, Oracle owns the final line)
- Land as premium and charged (through terse contradiction + deadpan voice, never through adjective stacking or mystical effects)
- Preserve agency through the performative image-act (gesture, gaze, crop, light, pose — anything re-authorable by a reshoot)

**Core constraint:** BR-S113 (LOCKED) — five absolute no's (worth/body/rank/identity/attributed feeling) + one allowance (performed gesture-intent). The research docs show this is not about *erasing* the human; it's about moving the voltage off the sitter's hidden interior onto what the frame *does* and what the viewer *experiences*.

---

## PART I: CONFLICTS (Repo vs Research)

### Conflict 1: "Aura field map" visual (resolved against repo)
**Doc 04 proposes:** literal Field Map with contour rings + vectors + container band + rim-line SVG.  
**Doc 02 counter-proposal + User direction (from FILE_MAP.md line 9):** "Replace the contour/vector/band visual with the residue directions (one-seam burn / ghost smear / off-center tension line)."  
**Repo authority (DECISION_LOG, PROJECT_OS, FILE_MAP §4):** Explicit kill on geometry-as-prose and chart-like visuals in Aura.  
**Verdict:** REPO WINS. Keep doc 04's semantic architecture (anchors, class labels, structured data model), but use doc 02's visual grammar (residue marks, not maps). Call this out wherever doc 04 is referenced in implementation.

### Conflict 2: "Aura" as a visible word in copy
**Doc 04 guidance:** "avoid repeating the term 'aura' in body copy; use it for the plate title only."  
**Research docs 01, 02, 05:** No explicit counter-guidance; focus is on *how* to write, not whether the word appears.  
**COPY_SYSTEM.md §3:** "aura" is in the Careful-Use list (allowed sparingly, never as a headline).  
**Verdict:** REPO WINS. Title reads "Aura"; body copy should use doc 04's internal lexicon (projector, container, rim, residue, cold edge, warm hold) or final-draft class labels (Warm Refusal, Quiet Labour). This avoids self-reference and lets the visual do the work.

### Conflict 3: Person-safety rule scope
**Doc 03 (narrow rule proposal):** "Name the depicted person + viewer response" as an explicit relaxation from the blanket ban.  
**Repo ground truth (HUMAN_READ_LINE_V1.md, BR-S113):** Not a relaxation — a *reframe*. The rule is already about the *image-act* (gesture, gaze, pose, role), not the *permanent person*. Three gates govern what's allowed (re-authorable cue, grammatical subject on the artifact, connotation-strip test).  
**Verdict:** REPO WINS. Doc 03's mechanics (four-zone filter, swap test, two-second test) are KEPT as operational gates; doc 03's proposed "name the person + viewer response" *as a new law* is REJECTED because the repo already permits this under the three-gate rule. What doc 03 kills (named emotions even behind a hinge, the resolved-feeling clause) aligns with the repo's kill-on-sight list and is ENFORCED.

### Conflict 4: Visual "residue" direction — graphic vs. type
**Doc 02 ranked directions:** One-seam burn / Ghost smear / Off-center tension line ranked highest; Type-burn last (risk of stealing Oracle's thunder).  
**Doc 02 recommendation:** "Graphic-as-hero by default, type as subordinate witness. Eighty percent mark, twenty percent language."  
**Doc 04 (original map plan):** SVG-first, inline, accessible.  
**Verdict:** REPO + DOCS ALIGN. Use graphic-as-hero by default (one restrained mark per card). Type-as-hero only under one condition: the card owns a single phrase so exact that any added graphic would feel ornamental. Otherwise Oracle stands alone as the final verbal beat.

---

## PART II: CONSOLIDATED DO-NOT LIST (H5 deduped kill-list)

Organized by category, citing source. Every rule appears once; duplicates merged.

### VISUAL ANTI-PATTERNS (Ban from Aura visual entirely)

| Rule | Source | Why |
|---|---|---|
| **Contour rings, topographic fills, labeled elevation logic** | Doc 02 §red-line; Doc 04 §avoid entirely | Reads as second Diagram; loses the charge battle. Aura = residue, not map. |
| **Directional-vector overlays, streamlines, particle flow, arrow grids** | Doc 02 §red-line | Implies causal mechanics (how force moved where) rather than what remains. Creates "software layer" energy. |
| **Generic heatmaps and rainbow gradients** | Doc 02 §red-line; Doc 04 §avoid entirely | Implies repeated measurement. Rainbow distorts perception and creates accessibility problems. |
| **Chakra glows, sparkles, soft mystical halos, "energy scanner" UI** | Doc 02 §red-line | Credibility killers. Unnecessary visual elements distract. Gadget theater, not lived feeling. |
| **Neon glows, bloom halos** | Doc 04 §avoid entirely | Reads mystical/gamey, not archival. |
| **Pseudo-spiritual portraiture (chakra rings, person-outline aura)** | Doc 04 §avoid entirely | Violates artifact-focus; imports new-age language. |
| **Dense topographic maps, heatmaps competing with Diagram** | Doc 04 §avoid entirely | Duplicates left-panel analysis. Loses to Diagram on familiarity. |
| **Sparkles, stars, energy particles, prototype baggage** | Doc 04 §avoid entirely | Leftover from early treatment experiments; not dossier logic. |
| **Six-plus labels in the visual** | Doc 04 §avoid entirely | Becomes a legend, not a read. |
| **Cross-fading multiple marks (unless one is dominant)** | Doc 02 §construction | Multiple traces scatter focus. One mark holds charge. |
| **Anything that re-renders the Diagram's job** | Doc 02 §red-line | Fails by definition. Honor the source without mimicking it. |

### COPY ANTI-PATTERNS (Ban from Aura text / class labels)

| Rule | Source | Why |
|---|---|---|
| **Free-floating mood-word with no pixel behind it: "haunting / evocative / moody / atmospheric / ethereal"** | Repo BR-AURA-RESEARCH §4.A; Doc 01 §master-law | Charge must live in a NAMED IMAGE-FACT, not a feeling-word. |
| **Pathetic fallacy: "the sky mourns," "the room weeps," "nature's indifference"** | Repo BR-AURA-RESEARCH §4.A | Ascribes feeling to inanimate things; violates artifact-focus. |
| **Resolved-feeling clause: "…which evokes / conveys / creates a sense of …"** | Repo BR-AURA-RESEARCH §4.A; Doc 01 §two-beat-charge; Doc 05 §hard-line | Point at the fact and STOP. The bridge between evidence and feeling should not be stated explicitly. |
| **Stacked-adjective pile: "raw, powerful, unforgettable, breathtaking"** | Repo BR-AURA-RESEARCH §4.A; Doc 01 §two-beat-charge | Compression is authority. Two adjectives max; let the noun do work. |
| **Dead-center flat-lit generic frame sold as auratic** | Repo BR-AURA-RESEARCH §4.A | Slick repeatable stock frame = aura FLOOR. It deserves an honest read ("archive generic"), not false charge. |
| **Computed emotion label sold as truth: "this photo is joyful / anxious"** | Repo BR-AURA-RESEARCH §4.A | IER/emotion-recognition tops ~60%, disagrees with itself, carries person-read risk. Ship cues + confidence, never a label. |
| **Color-psychology-as-fact: "red = passion, blue = calm, warm = cozy"** | Repo BR-AURA-RESEARCH §4.A | Only saturation/brightness→arousal replicates; hue→feeling does not. Keep to optical fact (Kelvin / CIELAB). |
| **Energy, vibe, aura, mood, chaos, magic, soul, essence (as raw labels)** | Doc 01 §class-name-line; Doc 02 §construction | These are feel-words masquerading as nouns. OK only when attached to something concrete (not "Ethereal Energy" but "Quiet Labour"). |
| **Material-or-sensory nouns without a modifier: "Glass" or "Ash" alone** | Doc 01 §class-name-line | Needs a bend. "Warm Refusal" stronger than "Refusal." "Soft Tax" stronger than "Tax." |
| **Three-word class labels: "Quiet Sacred Labour" instead of "Quiet Labour"** | Doc 01 §class-name-line | Compression is authority. Three words only if the third *narrows* the class, not prettifies it. |
| **Type-as-hero when the phrase is generic or repeatable** | Doc 02 §recommendation | Only use full type-burn when the phrase is singular enough to justify the entire frame and Oracle can still own the final line. |

### PERSON-SAFETY ANTI-PATTERNS (Ban from Aura content — enforced by three gates)

| Rule | Source | Why | Gate(s) it violates |
|---|---|---|---|
| **Rating/ranking the person's face/body/worth** | Repo BR-S113, HUMAN_READ_LINE_V1; Doc 03 §boundary | Artifact-not-person principle. | Gate 2 (grammatical subject). |
| **Inferring fixed identity: age / ethnicity / gender-as-essence / orientation / health / hardwired personality** | Repo BR-S113, HUMAN_READ_LINE_V1 | Permanent traits cannot be re-authorized by a reshoot. | Gate 1 (re-authorable cue). |
| **Insult via framing: a low read phrased as a failure of the person** | Repo HUMAN_READ_LINE_V1 §forbidden | Violates "every outcome is a win." A Muted card is not a person-failure. | Gate 2 (grammatical subject). |
| **Attributed feeling: "he is lonely / ashamed / proud / confident"** | Repo BR-S113, HUMAN_READ_LINE_V1; Doc 03 §person-safety; Repo BR-AURA-RESEARCH §4.B | Direct interior-state claim. Subject's private feeling cannot be read from a photo. | Gate 3 (connotation-strip). |
| **Subject-as-stable-trait: "she has a powerful aura / presence / magnetism / charisma"** | Repo BR-AURA-RESEARCH §4.B | Implies an inherent property of the person, not the image. | Gate 3 (connotation-strip). |
| **Intense/soulful/piercing eyes as a person-property** | Repo BR-AURA-RESEARCH §4.B | Direct gaze ≠ intensity in the person. Read it as axis (VECTOR) or avoidance, not interiority. | Gates 1, 3 (re-authorable only as gaze-direction; connotation fails). |
| **Holy / spiritual / makes you feel small** | Repo BR-AURA-RESEARCH §4.B | Ascribes feeling to the subject or to the viewer's spiritual state, not the image's formal properties. | Gate 3 (connotation). |
| **"This is the home of a lonely / haunted / soulful person"** | Repo BR-AURA-RESEARCH §4.B | Confuses the setting's charge with the person's interior. Charge belongs to the *space*, not the sitter. | Gate 2 (grammatical subject). |
| **"An auratic luxury object proves refinement / wealth / taste"** | Repo BR-AURA-RESEARCH §4.B | Object composition is compositional; it never proves a trait. Read: "the frame refuses to demote the object" (agency in the frame). | Gate 2 (grammatical subject). |
| **"Genuine / real person"** | Repo BR-AURA-RESEARCH §4.B | Authenticates the *image-event*, not the person's realness. Use: "this configuration happened once, unstaged." | Gate 2 (grammatical subject). |
| **Body-language diagnosis: "slumped posture conveys defeat"** | Repo BR-AURA-RESEARCH §4.B; Doc 03 §boundary; HUMAN_READ_LINE_V1 | Posture is image-act (allowed as Stance Read in diagram); its *meaning* cannot be diagnosed as interior state. | Gate 3 (connotation). |
| **"You can feel the years of hardship in that face"** | Repo BR-AURA-RESEARCH §4.B; Doc 03 §boundary | Reads face as biography. Face-affect is not a reliable channel; biology cannot be inferred from pixels. | Gates 1, 2 (face is permanent; grammatical subject is the person). |
| **"You can feel the cold he's enduring"** | Repo BR-AURA-RESEARCH §4.B | Conflates the image-property (cold visible in the photo) with the person's sensation. Safe: "the cold is in the picture." | Gate 2 (grammatical subject shifted to person's feeling). |
| **"This light tells us who he is" / "Hard light for a hard man"** | Repo BR-AURA-RESEARCH §4.B; Doc 03 §safety pairs | Light characterizes the *frame*, never the person's essence. | Gate 2 (grammatical subject). |
| **"He gives off a creepy / confident vibe"** | Repo BR-AURA-RESEARCH §4.B; Doc 03 §reference rewrites | Vibe is "the frame's first-glance charge"; the person is never the grammatical source. | Gate 2 (grammatical subject). |
| **"This subject has the it-factor / star quality"** | Repo BR-AURA-RESEARCH §4.A | Unsourced charge. Allowed only if explained: "unsourced charge remains after the lenses fire" (confidence chip). | Gate 1, 3 (no visible cue; implies hidden quality). |
| **"Low-key so he's brooding / high-key so she's cheerful"** | Repo BR-AURA-RESEARCH §4.B | Conflates luminance ratio with mood. Low-key is a measurement (pixel histogram), full stop. | Gate 3 (connotation). |
| **Face-affect emotion recognition as truth** | Repo BR-AURA-RESEARCH §4.B; HUMAN_READ_LINE_V1 | Scientifically contested (Barrett 2019). Read head/gaze *geometry* only (axis, direction), never expression as emotion. | Gates 1, 2 (face is not re-authorable; direct person-read). |
| **Leaning, nodding, glancing as diagnostic of interior state** | Repo BR-AURA-RESEARCH step 4 / HUMAN_READ_LINE_V1 | The *gesture's performed intent* (what it does in the frame) is allowed; its *psychological meaning* is not. Allowed: "the palm stops the lens." Banned: "the palm shows submission." | Gate 3 (connotation-strip). |

### SYSTEM ANTI-PATTERNS (Structural failures for the Aura layer)

| Rule | Source | Why |
|---|---|---|
| **Aura as a second Oracle** | Repo PROJECT_OS §8; Doc 04 §job definition | Oracle is the only verdict. Aura is the last *felt* beat; Oracle is the last *spoken* beat. |
| **Aura as a second Diagram** | Repo PROJECT_OS §6; Doc 04 §job definition; Repo FILE_MAP §9 implicit | Diagram owns geometry/crop/pressure/focal/gesture-direction. Aura owns the *after-effect*, not the structural explanation. |
| **Aura duplicating Surface/Finish material language** | Repo PROJECT_OS §8; Doc 04 §job definition | Surface Record owns finish / halo / material claims. Aura owns the *felt field*, not the object treatment. |
| **Computed/generative Aura copy (templated sentence generation)** | Repo data.js §none generate, all hand-authored; Doc 04 §schema; Repo SCAN_ROUTING_SPEC | Machine proposes anchor evidence; human writes the final line. No templated aura output. |
| **Fractional / floating-point charge metrics (0.75 "charge")** | Repo CARD_LOGIC_V1 §public tier bands; Doc 04 §schema; HUMAN_READ_LINE_V1 | Aura outputs are: one class label (string) + one reading (string) + three chips (string[]) + one visual mode (string). Never a number, never a score, never a floating-point "strength." |
| **Positional CSS (nth-of-type) for Aura styling** | Repo FILE_MAP §6 semantic styling rule; Doc 04 §implementation | Use `.dplate--aura` + `.daura__*` semantic classes. Brittle positional selectors break the codebase contract. |
| **Aura rendered outside the dossier (main card or right panel)** | Repo PROJECT_OS §2, §8; Doc 04 §plate-layout; HANDOFF.md | Aura lives in the dossier only. Reveal-surface can carry a reduced derivative later; it is not canonical. |
| **Per-stat intensity on Aura visual** | Doc 02 §recommendation; Repo CARD_LOGIC_V1 | One restrained mark per card. Do not modulate the mark's intensity by Presence/Frame/Signal/Charge values. |
| **Magnetism language (scarcity, pressure, unlock, limited-run)** | Repo MAGNETISM_MODEL_V1; COPY_SYSTEM; HALO_GATE_BOUNDARY_V1 | Aura stays free-as-hero. No "unlock your aura", no countdown, no pressure. Aura is the complete reading at Free tier. |
| **Latent/developed state language on Aura copy** | Repo PROJECT_OS §2; HALO_GATE_BOUNDARY_V1 | Aura is fully developed at Free tier, visible in the dossier. Never show it as "sealed" or "undeveloped." (The seal lives on Mint Record only.) |

---

## PART III: AURA DOSSIER SPECIFICATION (Decision-Ready)

### Overview

**Aura is a dossier plate (part of the 5-plate scroll archive: Surface Record / Archetype / Aura / Mint Record / Oracle Read).** It reads the image's *felt field* — the way the photograph presses, holds, cools, or lingers once the evidence is known. It bridges Diagram/Surface (structural/material explanation) and Oracle (final verdict).

**Output:** One class label + one charged one-sentence reading + three short tag-chips + one restrained visual residue mark (one-seam burn, ghost smear, or off-center tension line).

**Derivation:** Author-first, mechanic-second. Existing source data provides anchors (gesture, container, rim, residue cues); the editor writes the final class label and reading sentence. No computation of the final copy.

### Data Schema

Store in `data.js` as an `auraField` object per source:

```ts
type AuraField = {
  id: string;                           // e.g., "aura-src-01"
  classLabel: string;                   // e.g., "Warm Refusal" (2-3 words, noun-ending)
  chips: string[];                      // Three short tags: ["front pressure", "warm hold", "cold exit"]
  reading: string;                      // One sentence, 6–14 words, two-beat structure
  
  anchors: AuraAnchor[];                // Four core cues (projector / container / rim / residue)
  
  visual: {
    mode: "seam" | "smear" | "tension" | "type";  // Residue direction from doc 02
    tint: string;                       // Color from src.halo.a, restrained opacity
  };
  
  safety: {
    imageActBasis: string[];            // Which re-authorable cues justify the read
    noStableTraitClaim: boolean;        // Must stay true; gates-test passed
  };
  
  sourceRefs: string[];                 // Human-readable list of repo cues used (markers, analysis notes, etc.)
  ariaSummary: string;                  // Text alternative for accessibility
};

type AuraAnchor = {
  key: "projector" | "container" | "rim" | "residue";
  label: string;                        // Visible label (may vary per source)
  cue: string;                          // Concrete image cue (e.g., "raised palm")
  effect: string;                       // What the cue does (e.g., "stops the viewer, holds light")
  x?: number;                           // 0-100 normalized position (optional, for visual layout)
  y?: number;
};
```

**Example (SRC-01 Driver):**
```ts
{
  id: "aura-src-01",
  classLabel: "Warm Refusal",
  chips: ["front pressure", "warm hold", "cold exit"],
  reading: "Reads as a stop-sign you end up trusting. The hand takes the first hit; the cabin keeps the image human; one cold strip at the glass keeps it open.",
  anchors: [
    { key: "projector", label: "front pressure", cue: "raised palm at lens", effect: "stops the viewer directly" },
    { key: "container", label: "warm hold", cue: "cabin interior, red jacket", effect: "keeps the frame hospitable" },
    { key: "rim", label: "cold exit", cue: "fjord window glass right edge", effect: "cools the warmth, opens the edge" },
    { key: "residue", label: "after-touch", cue: "warmth vs. cold contrast", effect: "lingers as a held tension" }
  ],
  visual: {
    mode: "smear",
    tint: "color-mix(in srgb, var(--halo-a) 55%, var(--silver))"
  },
  safety: {
    imageActBasis: ["gesture: raised palm", "setting: cabin interior", "light: directional from left", "crop: half-frame cutoff"],
    noStableTraitClaim: true
  },
  sourceRefs: ["markers: face/palm; analysis: raised palm occlusion; diagram.gesture: upward stop; card.note: idle-engine"],
  ariaSummary: "A warm interior gesture meets a cold glass threshold. The image is charged by the contradiction between refusal (the hand stops) and welcome (the cabin's warmth)."
}
```

### Visual Grammar

**Primary directions (ranked by premium feel + non-redundancy):**

1. **One-seam burn** — Almost total black; one luminous seam or cut; slight warm bleed on one side; one cold/purple edge on the other; no labels, nested rings, arrows, secondary marks.
   - When to use: Image's truth is a threshold, cut, window, break, horizon, or puncture.
   - Examples: SRC-02 Ice Field (auger brace as the seal point).

2. **Ghost smear** — One warm translucent drag from the dominant gesture against black; soft decay into black; narrow cool/purple exit rim; maybe one exposure band or fade break; otherwise empty.
   - When to use: Truth is proximity, passing motion, warmth, breath, or touch retained in vision.
   - Examples: SRC-01 Driver (palm warmth dragged across cabin, cooling at the window).

3. **Off-center tension line** — Two silent anchors (poles) implied or tiny; one line/filament spanning them; thickness, brightness, or curvature biased off-center; no ticks, arrows, legend, numbers.
   - When to use: Aura is about welcome/refuse, hold/release, shore/open water, shelter/exposure (biased poles).
   - Examples: SRC-03 Shore (land vs. pull, line resolving toward water).

4. **Type-burn** (rare) — One phrase only, oversized, pressure-distressed or lightly overprinted; warmth fading to black or black swallowing lower halves of letters; no iconography.
   - When to use: Only if the card already owns a single unforgettable phrase and any graphic would feel ornamental.
   - Use sparingly; Oracle stands alone as the final verbal beat.

**Technical constraints:**
- Inline SVG, crisp scaling, text-addressable labels, tint substitution via CSS custom properties.
- Base strokes: `var(--line-strong)`; active tint: `color-mix(in srgb, var(--halo-a) 55%, var(--silver))`.
- Residue fill at 8–12% opacity.
- Contrast: 3:1 for graphical objects, 4.5:1 for text; no color-alone encoding.
- Motion optional, minimal; honor `prefers-reduced-motion`; freeze the final state instantly.

### Copy Specification

**Class-name line:** 2 words, noun-ending fragment. One modifier + one noun. Power from contradiction, not ornament.
- **Strong:** Quiet Labour, Warm Refusal, Soft Tax, Public Mercy, Minor Severance, Clean Threat, Cold Exit, Held Field, Task Gravity, Low Horizon.
- **Weak:** Radiant Energy, Violent Aura, Sacred Labour, Ethereal Presence, Powerful Soul.

**Verdict line:** 1 sentence or fragment, 6–14 words, one contradiction, hardest word last.
- **Structure:** Setup → reversal (two beats, sometimes three).
- **Default motion:** Surface warmth/legibility first, colder truth second.
- **Example:** "Reads as a stop-sign you end up trusting. The hand takes the first hit; the cabin keeps the image human; one cold strip keeps it open."

**Chips:** Three short tags (mono, lowercase, wrapped inline-flex). Name the anchor's effect, not its position.
- **From SRC-01:** [front pressure] [warm hold] [cold exit]
- **From SRC-02:** [task gravity] [held field] [low horizon]

**Safety pass on every line:** Apply the three-gate test (HUMAN_READ_LINE_V1 §the-line).
1. **Re-authorable cue?** Does the cue live in the performed set (gesture, gaze, crop, light, styling, pose), not permanent biology?
2. **Grammatical subject on the artifact?** Is the sentence about the photograph (frame/crop/gesture/light/setting), not the person as evaluable?
3. **Connotation-strip test?** Remove the photo-noun; does the remaining predicate describe a stable person-trait? If yes, fail the gate.

**Safe hinge phrases (ranked by premium feel):**
- `reads as` — Default Aura sentence
- `you …` — Final clause or second sentence (bodily/perceptual only: you stop, you keep looking, you brace)
- `plays as` — Performance-like gestures/poses/contradictions
- `lands as` — Verdict sentence, after evidence
- `carries` — Sustained tonal description
- `holds / keeps / lets / leaves` — Premium alternative (hides the bridge inside verbs)

### Plate Layout

**Container:** Capped at `max-width: 1040px`; left spine gutter + body column.

**Body grid:** `grid-template-columns: minmax(0, 1.05fr) minmax(340px, 0.95fr)` (text left, visual right).

**Spacing:** 32px gap desktop, 20px narrower screens; `min-height: 320px` developed.

**Typography:**
- **Class line:** 14–16px serif or medium display
- **Reading line:** 15–17px display serif, 1.45–1.55 line-height; `34–42ch` line length
- **Chip row:** 3 chips max, mono, inline-flex wrap

**Left-copy structure:**
```
WARM REFUSAL

Reads as a stop-sign you end up trusting.
The hand takes the first hit; the cabin keeps the image human;
one cold strip at the glass keeps it open.

[front pressure] [warm hold] [cold exit]
```

**Right-visual frame:** 16:10 or 4:3 aspect ratio; SVG rendered inline with accessible alternative text via `aria-label` pointing to left-column summary.

### Implementation Guidance

| File | What to add | Guidance |
|---|---|---|
| `data.js` | `auraField` objects (SRC-01, SRC-02, etc.) | Keep content authored and source-specific. Do not generate. |
| `app.js` | `renderAuraPlate()` + insertion into dossier mount | Treat as a self-contained module; insert into the 5-plate stack. |
| `styles.css` | `.dplate--aura`, `.daura__*` semantic classes | Honor `prefers-reduced-motion`, WCAG contrast. No `nth-of-type()`. |
| `reveal/reading-panel.js` | Reduced Aura capsule (later, optional) | Optional derivative once dossier version is stable. |

**Priority:** Dossier first. Reveal-module follow-up is lower-priority.

---

## PART IV: CONVERGENCE WITH GPT DOC 04

**Doc 04 identifies two contradiction-pair class labels as proof-of-concept:** "Warm Refusal" and "Quiet Labour."

**These are the same two-term relation idea** that the Subtraction Gate verdict synthesizes: Aura's irreducible job is the RELATION the frame stages between two co-present elements (the tension/edge/mismatch/fit BETWEEN them), not a single-element reader. The repo's own `sceneCharge.label` (Idle-Engine, Contained, Filed, Closing, Selecting) reads this relation implicitly; Aura makes it explicit and visual.

**Convergence:** The GPT copy-structure (class label + reading + chips) + visual craft (residue marks, not maps) marries the two systems cleanly. Aura is the one ordinal RANK (via class label contradiction-pair) + relation-KIND label (via the reading sentence) + one short verdict line, turning that buried sentence in `sceneCharge` into a scannable band. It is a thin synthesis-capstone, not a big plate — exactly what the Subtraction Gate verdict requires.

---

## PART V: VERIFICATION CHECKLIST

Before shipping Aura dossier content or code:

| Check | Pass criterion | Owner |
|---|---|---|
| **Copy safety (gates test)** | Every Aura sentence passes all three gates (re-authorable cue, grammatical subject on image, connotation-strip). Zero person-trait residue. | Editor |
| **No duplication** | Aura must not repeat Diagram labels verbatim. At least one visible phrase per source is a synthesized class/verdict. | Editor |
| **Surface separation** | Aura does not repeat palette %, finish notes, or material claims owned by Surface Record. | Editor |
| **Oracle separation** | Aura is not the final mic-drop line. Oracle remains the only verdict. | Editor |
| **Semantic styling** | No `nth-of-type()` for Aura; use `.dplate--aura`. | Engineer |
| **Accessibility** | Left text explains the visual; strokes meet contrast; SVG has accessible name; tint is never the only channel. | Engineer + QA |
| **Reduced motion** | Aura fully understandable with animation removed. | QA |
| **Source fidelity** | SRC-01 reads warm/refusal/cold-edge; SRC-02 reads downward/held/low-horizon. If either could be swapped without feeling wrong, the system is too generic. | Editor |

---

## PART VI: KNOWN GAPS AND FUTURE WORK

1. **Three additional sources (SRC-03/04/05)** — Design direction exists (residue grammar from doc 02); requires authored class labels + reading per source.

2. **Reveal-module derivative** — `reveal/reading-panel.js` currently shows placeholder Aura copy. Reduced version (capsule format) can be designed after dossier is stable.

3. **Enforcement of the three-gate rule in code** — HUMAN_READ_LINE_V1 notes this is currently "asserted, not enforced." Safety validators need to scan Aura copy for banned terms. Deferred to a future safety-critical task.

4. **Aggregate guard (no person-key joins)** — UNIVERSE_ZONE_MAP_V1 §7 + HUMAN_READ_LINE_V1 note that the cross-pull harm (many scans of one person reconstructing a stable trait) is currently UNENFORCED in code. This ships with the uploaded-photo engine, never before.

---

## CITATIONS & AUTHORITIES

**Repo ground truth (primary):**
- `docs/BR-AURA-RESEARCH.md` — spec authoring; kill-on-sight list; step-by-step extraction procedure
- `docs/PROJECT_OS.md` — plate structure, left/right division of labor, Oracle as single verdict
- `docs/HUMAN_READ_LINE_V1.md` — the three-gate rule; re-authorable image-act vs. permanent person
- `docs/COPY_SYSTEM.md` — tone, banned words, archetype library
- `docs/FILE_MAP.md` — implementation file guidance; semantic styling rule
- `docs/DECISION_LOG.md` — BR-S113 (LOCKED read-boundary); ratified decisions
- `data.js` — existing aura chips, sceneCharge labels, markers, analysis notes

**Research docs (secondary, consulted for synthesis):**
- `01_terse_verdict_writing.md` — two-beat structure, class-name construction, SCP-like deadpan
- `02_aura_visual_grammar_residue.md` — residue directions (seam/smear/tension), visual anti-patterns
- `03_person_safety_line.md` — four-zone filter, swap test, two-second test, reference rewrites
- `04_aura_field_map_implementation.md` — semantic schema, plate layout, internal lexicon
- `05_reads_as_you_bridge.md` — bridge phrases ranked, hinge language, four-zone filter upstream

**Scholarship (background):**
- Walter Benjamin — *The Work of Art in the Age of Mechanical Reproduction* (aura as distance-in-closeness, gaze returned, unrepeatable moment)
- Gernot Böhme — Atmosphere essays (felt quality of a space)
- T. S. Eliot — Objective correlative (emotion via visible things, not declared feeling)
- Roland Barthes — *Camera Lucida* (punctum, viewer's felt response)
- John Szarkowski — *The Photographer's Eye* (frame as fundamental)

