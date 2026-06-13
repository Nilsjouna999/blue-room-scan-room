# BLUE ROOM — Filtered Research Spine

Layer: RESEARCH (top of the research stack) · Status: DRAFT
Purpose: keep only the useful research. Remove rambling, academic filler, overbuilt feature ideas, and anything that would make Fable over-engineer.
Rule: nothing here is buildable until promoted into an ACTIVE spec
(see docs/GOVERNANCE_OS.md — research promotion funnel).
Promoted 2026-06-12: §2–4 → SCAN_ROUTING_SPEC · §5,15 → PERFORMANCE_BUDGET
· §7–10 → SCAN_ENGINE_SPEC · §11–13 → ARCHETYPE_LIBRARY · §14 →
DESIGN_TOKENS. The specs win where wording differs.

---

## 0. Core Thesis

Blue Room is a PC-browser-first photo-to-card scan room.

Every uploaded image is treated as an artifact that can be developed into a card/report.

Blue Room does **not** rate beauty, attractiveness, biology, race, gender, age, health, intelligence, worth, or morality.

It reads visible artifact evidence:

- composition
- crop
- subject placement
- gesture geometry
- posture
- styling
- props
- environment
- color palette
- contrast
- scene specificity
- visual impact
- lore density

The system should feel like a scan room, not a generic AI vibe generator.

---

## 1. Free vs Paid: Correct Product Split

The Free version should **not** be AI-heavy or expensive.

Free Pull exists to:
- give instant value
- prove the product idea
- create shareable curiosity
- route the image
- show a light card preview
- tease the deeper print

Halo Mint exists to:
- run the deeper AI interpretation
- produce richer readings
- generate receipts
- create stronger archetype/title/oracle
- reveal hidden/conditional stats
- output a more developed card/report

Free and Paid do **not** need identical readings.

Important distinction:

- Free should use cheap deterministic logic, static templates, precomputed examples, or minimal model usage.
- Paid should be the properly developed AI pass.

The rule is not “Free and Paid must say the exact same thing.”  
The rule is: **Paid should not contradict the visible facts established in Free.**

Good model:

```text
Free Pull = first scan / archive preview / low-cost print
Halo Mint = developed scan / AI interpretation / minted report
```

Free can say:
> “The frame routes toward a cold-field presence read.”

Paid can later say:
> “The Halo pass resolves that into The Ice Witness: high Frame, low noise, strong distance control, and a quiet charge carried by the snow field.”

That is not a contradiction. That is development.

---

## 2. The Three-Layer Scan Architecture

Blue Room should have three internal levels.

### Level 1 — Intake Gate

Question:
> Can this image enter the room?

Output:
- accepted
- limited
- rejected

### Level 2 — Route Assignment

Question:
> What kind of scan is this?

Routes:
- HUMAN_SOLO
- HUMAN_GROUP
- HUMAN_ANIMAL_BOND
- ANIMAL_COMPANION
- LANDSCAPE_SCENE
- OBJECT_ARTIFACT
- SYNTHETIC_AI_PRINT
- SCREENSHOT_MEME_LIMITED
- MIXED_UNKNOWN

### Level 3 — Scan Development

Question:
> What does this image become?

Outputs:
- card title
- archetype/class
- stats
- hidden/conditional stat
- receipts
- rarity/material/treatment
- oracle line
- dossier sections

---

## 3. Intake Gate

### Hard Reject

Reject immediately:

- explicit sexual imagery / porn
- sexualized minors / CSAM
- non-consensual intimate imagery
- severe gore / graphic violence
- hate symbols or extremist propaganda
- private documents, IDs, bank cards, passports
- corrupted file
- blank image / pure black image / no recoverable visual signal

User-facing tone:
- factual
- non-moralizing
- short
- no jokes

Examples:

```text
This image cannot be scanned.
Blue Room does not process explicit or sexual imagery.
```

```text
The room could not find enough visible signal in this image.
Try a brighter image with a readable subject, object, or scene.
```

### Limited Scan

Allow but mark limited:

- very blurry
- very dark but not blank
- low resolution
- heavy filters
- screenshots
- memes
- collages
- uncertain AI/synthetic image
- mixed/unknown subject

Limited copy:

```text
Limited signal detected.
The room can read broad frame, mood, and structure, but deeper gesture evidence is weak.
```

```text
Routing as LIMITED ARTIFACT.
This scan will read layout and signal, not full presence or gesture.
```

---

## 4. Scan Routes

Routes prevent the system from forcing every image into a human portrait model.

### HUMAN_SOLO

Use when:
- one person is the clear subject

Reads:
- frame
- gesture
- styling
- posture
- environment
- signal
- charge
- lore

Primary stats:
- Presence
- Frame
- Signal
- Charge
- Lore Density
- Fit Coherence

Conditional:
- Gesture Authority, only if body/gesture evidence is visible

### HUMAN_GROUP

Use when:
- multiple humans are central

Reads:
- group composition
- spacing
- formation
- dominant figure
- social geometry
- visual tension

Avoid:
- ranking people
- judging group attractiveness
- assigning personality to individuals

### HUMAN_ANIMAL_BOND

Use when:
- human and animal are both meaningful

Reads:
- shared frame
- proximity
- handler/companion dynamic
- contrast or harmony
- creature signal

### ANIMAL_COMPANION

Use when:
- animal is the main subject

Reads:
- posture
- silhouette
- calm/chaos
- environment
- creature presence

Stats can adapt:
- Creature Presence
- Frame
- Charge
- Lore Density
- Companion Signal

### LANDSCAPE_SCENE

Use when:
- place, environment, weather, or scene dominates

Reads:
- atmosphere
- scale
- color field
- silence
- weather/terrain cues
- composition

Do not force human stats.

### OBJECT_ARTIFACT

Use when:
- object, product, vehicle, room, outfit, or tool is the central subject

Reads:
- material
- condition
- shape
- context
- symbolic charge
- display logic

### SYNTHETIC_AI_PRINT

Use when:
- image is declared or detected as AI-generated

Allowed, but marked.

Reads:
- composition
- style coherence
- worldbuilding
- prompt-density feel
- artifact noise
- surrealness

Copy:
```text
Synthetic image detected or declared.
Routing as SYNTHETIC PRINT. The scan reads composition, style, and worldbuilding.
```

### SCREENSHOT_MEME_LIMITED

Use when:
- screenshot, meme, UI, chat, or text-heavy digital artifact

Default:
- limited route only

Reads:
- layout
- text density
- visual joke/signal
- internet artifact structure

### MIXED_UNKNOWN

Use when:
- no stable route wins

Reads:
- frame
- mood
- chaos
- signal fragments

---

## 5. Free Pull System

Free must be cheap.

Free should not run expensive image analysis every time.

Free can use:
- file validation
- simple quality checks
- user-declared route
- lightweight browser-side image checks if useful
- deterministic templates
- static sample data for prototype
- tiny/cheap API call only if absolutely needed later

Free output:

- route label
- card preview
- 4 visible stats
- short title/class
- 1–3 short receipts
- one-line reading
- clear CTA to develop into Halo

Free should feel useful, not complete.

Free should not expose:
- full evidence board
- long AI interpretation
- hidden stat
- deep oracle
- full mint record
- route confidence details
- long comparative archive logic

Free should be framed as:
```text
first pull
surface scan
archive preview
```

---

## 6. Halo Mint System

Halo is the paid/deeper AI pass.

Halo can use:
- AI vision model
- structured prompt
- route-specific lens analysis
- richer language generation
- receipt generation
- confidence-aware stat refinement
- archetype/title refinement
- oracle generation
- dossier output

Halo output:

- developed card
- deeper stats
- hidden/conditional stat
- receipts/evidence board
- route explanation
- richer archetype
- stronger title
- oracle read
- mint record
- material/treatment variation
- optional downloadable/shareable result

Halo should feel like:
```text
the card finished developing
```

Not:
```text
the same free scan with more paragraphs
```

---

## 7. Lens Engine

Use lenses as the product brain.

Core lenses:

### Frame Lens
Reads composition:
- crop
- subject placement
- camera distance
- negative space
- horizon/tilt
- spatial control

### Gesture Lens
Reads visible geometry:
- posture
- hand position
- body orientation
- stance
- head direction if visible
- motion/stillness

No emotional diagnosis.

### Signal Lens
Reads presentation:
- clothing/styling
- props
- objects
- color palette
- environment
- visible intention

### Charge Lens
Reads visual force:
- contrast
- intensity
- tension
- memorability
- silhouette
- oddness
- immediate impact

### Lore Lens
Reads story evidence:
- background specificity
- setting
- tools
- weather
- terrain
- objects
- signs or symbols

### Coherence Lens
Reads whether parts lock together:
- styling vs setting
- color vs mood
- subject vs frame
- gesture vs scene

### Rarity Lens
Reads uncommon combinations:
- unusual scene + subject combo
- contradiction
- strong title-token potential
- low archive density later

Rarity does **not** mean attractiveness.

---

## 8. Stats

Keep public stats stable.

Recommended main stats:

- Presence
- Frame
- Signal
- Charge
- Lore Density
- Fit Coherence

Conditional / derived:

- Gesture Authority: only when gesture/body evidence is visible
- Visual Impact: derived from Charge + Presence + Frame + Rarity, not independently scored

Do not create endless public stat types.  
Route-specific stats can exist in Halo/dossier, but the core product should stay readable.

---

## 9. Confidence + Missing Evidence

Missing evidence should reduce confidence, not punish the photo.

Example:
- no visible hands → do not show Gesture Authority
- dark background → lower Lore confidence
- blurry subject → shrink bold claims
- landscape route → do not score human posture

Confidence rule:

```text
uncertain scans move toward neutral
```

Practical formula:

```text
displayed_score = 50 + confidence * (raw_score - 50)
```

This prevents fake extreme scores.

---

## 10. Receipts

Every important point movement should have evidence.

Receipt format:

```json
{
  "cue": "subject centered against wide snow field",
  "effect": "Frame +8",
  "basis": "composition / negative space",
  "confidence": "high"
}
```

Good receipt language:

- registered
- detected
- reads as
- evidence suggests
- routes toward
- adds pressure to
- reduces clarity in

Bad receipt language:

- proves you are
- your personality is
- biology says
- dominance ratio
- attraction signal
- alpha energy
- masculine/feminine score

---

## 11. Archetype System

Archetypes are photo roles, not personality claims.

Good:
```text
This frame routes toward The Threshold.
The image carries courier logic.
The styling reads as controlled disruption.
```

Bad:
```text
You are a rebel.
You are seductive.
You are an alpha.
You are dangerous.
```

Archetype selection should come from:

```text
route + dominant stat pair + strongest receipt + contradiction code
```

Examples:

- The Encounter
- The Dispatch
- The Threshold
- The Horizon
- The Archive
- The Apparition
- The Civilian
- The Ground
- The Field Warden
- The Static Saint
- The Signal Baron
- The Soft Menace
- The Ice Witness
- The Late Courier
- The Doorline Oracle

Use mythology as flavor, not as a giant god list.

Avoid direct religious/cultural appropriation unless intentionally curated.  
Prefer Blue Room-native titles over literal “Zeus/Thor/Hades” labels.

---

## 12. Naming Formula

Use controlled formulas:

```text
The [Modifier] [Role]
The [Scene Token] [Role]
[Material] [Role]
[Trait] Witness
[Place/Scene] Courier
Saint of [Artifact Trait]
Keeper of [Visible Signal]
```

Examples:

- The Ice Witness
- The Late Courier
- The Static Saint
- The Field Warden
- The Soft Menace
- The Copper Witness
- Keeper of the Doorline
- Saint of Low Light

Do not let AI invent random RPG titles without evidence.

---

## 13. Language Tone

Blue Room voice:

- archival
- dry
- stylish
- restrained
- slightly funny
- never motivational
- never clinical
- never horny
- never moralizing

Good:
```text
The room found a quiet frame with unusually high distance control.
```

Good:
```text
The jacket does most of the speaking. The background agrees.
```

Good:
```text
A low-noise image with one strong signal and no need to explain itself.
```

Bad:
```text
You are a born leader with intense seductive energy.
```

Bad:
```text
Your facial symmetry creates a high-value aura.
```

Bad:
```text
This proves deep trauma and hidden intelligence.
```

---

## 14. Visual System

Use previous design research as the visual law.

Core grammar:

```text
Room = dark stage
Plate = flat archive document
Artifact = raised card object
```

Rules:
- the card is the only true artifact
- panels are plates, not floating cards
- accent is currency, not paint
- one palette speaks at a time
- Halo looks more developed through depth, light, material, and restraint
- paid does not mean more clutter

Text:
- 5-tier Vault text scale
- no pure white
- warm archive greys
- Cormorant for display/oracle/card title
- Inter for UI/body
- IBM Plex Mono for metadata, serials, stat numbers

Dossier rhythm:
```text
quiet → medium → medium → LOUD → medium → quiet → LOUD finale
```

Card remains compressed.  
Dossier carries the depth.

---

## 15. Performance Rules

Performance law:

```text
Premium means fewer effects placed better.
```

Free must be very cheap to run.

Heavy effects are allowed only if:
- they serve the central card
- they do not affect plates
- they are tested
- they respect reduced motion

Safe:
- opacity
- transform
- static shadows
- static radial glow
- pseudo-element shimmer moved with transform

Danger:
- animated box-shadow
- repeated large blur
- backdrop-filter
- full-screen mix-blend-mode
- SVG turbulence loops
- too many animated layers
- big uncompressed video
- heavy AI call for every free scan

Effect priority:
1. static hierarchy
2. static card glow
3. simple shimmer
4. optional card-local pulse
5. optional light-stream only if tested
6. WebGL/video only later and only if worth it

---

## 16. What to Build First

Do not build everything.

Recommended order:

### Phase 1 — Docs + Static Product Brain
- DESIGN_TOKENS.md
- PERFORMANCE_BUDGET.md
- SCAN_ROUTING_SPEC.md
- SCAN_ENGINE_SPEC.md
- ARCHETYPE_LIBRARY.md

### Phase 2 — Data Shape
Create a stable `ScanResult` object for current fixed sample photos.

It should include:
- route
- allowed/limited/rejected
- stats
- confidence
- receipts
- archetype
- title
- free reading
- halo reading
- treatment
- warnings

### Phase 3 — Free/Halo Split
Make Free and Halo visibly different in output depth.

Free:
- cheap
- short
- deterministic
- preview

Halo:
- deeper
- AI-ready
- evidence-rich
- minted

### Phase 4 — Visual Upgrade
Apply:
- Vault text scale
- Room/Plate/Artifact
- accent economy
- minted numbers
- dossier rhythm

### Phase 5 — Mock Routing States
Add demo states:
- accepted
- limited signal
- rejected NSFW placeholder
- synthetic print
- landscape scene
- animal companion

No real upload needed yet.

### Phase 6 — Real Upload Later
Only after product grammar is stable:
- upload
- moderation
- CV/AI analysis
- paid AI generation

---

## 17. Banned Build Directions

Do not build:

- face beauty score
- attractiveness score
- gender/masculinity/femininity rating
- race/ethnicity inference
- age score
- body quality score
- health/fitness/biology inference
- hotness/sexual desirability language
- personality diagnosis
- morality/trustworthiness judgment
- “alpha/beta” scoring
- fake scientific aura frequency
- AI-heavy free scan
- full upload engine before static ScanResult works
- motion-heavy UI before screenshots look good static
- giant mythology dump in card text

---

## 18. The Final Product Law

```text
Gate the image.
Route the scan.
Score visible evidence.
Shrink uncertainty.
Keep Free cheap.
Let Halo develop.
Name with restraint.
Render as artifact.
Keep it fast.
Never judge the human.
```
