# O1 — REPO AUDITOR (deep pass): Aura ground-truth map

Every claim below cites **file + a grep-able anchor** (line numbers drift; grep the quoted string). Verified by reading, not memory.

---

## (a) The CURRENT dossier plate stack — exactly as `renderDossier()` builds it

**Source of truth:** `app.js`, `function renderDossier(src, treatment)` (grep `function renderDossier`), return block grep `dossier__inner`.

The live dossier is **FIVE `.dplate` sections** (numbered spines "01"–"05"), in this exact DOM order, with two non-plate register separators interleaved:

| Spine | Plate title | var | Built by | Notes |
|---|---|---|---|---|
| 01 | **Surface Record** | `board` | `dplate("01","Surface Record",...)` → `renderSurfaceRecord(src)` (paid) / colour-field rows (free) | grep `dplate("01", "Surface Record"` |
| 02 | **Archetype** | `archetype` | `dplate("02","Archetype",...)` | **empty stub** — `"Archetype read — reserved. Develops in a later pass."` grep `Archetype read — reserved` |
| — | `THE RECORD` | — | `<div class="dossier__register">` | non-plate divider |
| 03 | **Aura** | `aura` | `dplate("03","Aura",...)` | **empty stub** (see (b)) |
| 04 | **Mint Record** | `mintRecord` | `dplate("04","Mint Record",...,"dplate--mint")` | grep `dplate("04", "Mint Record"` |
| — | `THE ORACLE` | — | `<div class="dossier__register">` | non-plate divider |
| 05 | **Oracle Read** | `oracle` | `dplate("05","Oracle Read",...,"dplate--oracle")` | sealed `<details>` reveal on free |

Return string (grep `${recordGate}${board}${archetype}`):
`${recordGate}${board}${archetype}<div class="dossier__register">THE RECORD</div>${aura}${mintRecord}<div class="dossier__register">THE ORACLE</div>${oracle}`

A sixth would-be plate, `statDossier`, is **an empty string** (`const statDossier = ""` — grep `const statDossier`) and is never inserted.

**doc 04's "five-plate" claim is CONFIRMED for the live stack** (Surface Record · Archetype · Aura · Mint Record · Oracle). **The README "seven plates" is LEGACY DRIFT** — see CONFLICTS. The 7-plate legend (Source Record → Evidence Board → Stat Dossier → Hidden Stat → Fit + Aura → Mint Record → Oracle Read) is the *original* 2026-06-12 design (`docs/DECISION_LOG.md` grep `Seven plates max`), progressively cut: Source Record killed (BR-S113 1A, grep `Source Record plate KILLED`); Evidence Board → Surface Record (BR-S107); Stat Dossier killed (BR-S107, grep `Stat Dossier KILLED`); Hidden Stat plate removed + Archetype stub added (BR-S114); Fit + Aura → Aura, then emptied to a stub (BR-S114/BR-S115).

---

## (b) What Aura currently IS — the stub, quoted

**Live dossier Aura (app.js), grep `03 — Aura (BR-S115`:**
```js
const aura = dplate("03", "Aura", paid, `
    <p class="dstat__undeveloped">Aura read — reserved. Develops in a later pass.</p>`);
```
It renders one line — "Aura read — reserved. Develops in a later pass." — in both free and paid. **There is no Aura content, no per-source aura authoring wired into the live dossier.** The code comment states the rationale: *"BR-S115: emptied to a reserved stub — the standalone right-panel 'Finish' module now carries the material/finish read; Aura is parked for a later pass. Mirrors the Archetype stub."*

**Confirmed by decision log** (`docs/DECISION_LOG.md`, grep `BR-S115 — Source is its own tab`): *"the dossier Aura is parked as an empty stub … Aura content is a later pass."* And `docs/HANDOFF.md` (grep `Aura plate (dossier 03)`): *"Aura plate (dossier 03) content — empty reserved stub. Design from docs/BR-AURA-RESEARCH.md (research DONE)."*

### ⚠ A SECOND, LIVE-ADJACENT "AURA" SURFACE exists — flag before any build

`reveal/reading-panel.js` (BR-S126 staged reveal) ships a **hardcoded AURA module** (grep `mod("4", "AURA"`):
```js
h += mod("4", "AURA", artcap("aura", cap(["warm glass copper", "held steady"])));
```
and `reveal/readings.data.js` (grep `Warm-glass copper, held steady`): `aura: "Warm-glass copper, held steady; a cool prism cuts the warmth at the rim."`

**This is DEV-ONLY, not shipped.** `index.html` line comment (grep `Staged Card Reveal (BR-S124)`): the whole `reveal/*.js` stack is *"an ISOLATED dev surface on ?dev=staged-reveal … Self-contained — touches nothing live."* `docs/FILE_MAP.md` confirms `readings.data.js` is **PLACEHOLDER copy**. **Consequence for the fleet:** if Aura is designed, this dev module is a pre-existing "material-finish aura" draft that (i) collides conceptually with the right-panel **Finish** module and (ii) is exactly the *decay-to-material-restatement* failure mode. It reads a single element (the finish/material), not the RELATION — it is NOT the Subtraction-Gate aura. It must be reconciled or explicitly ignored, never copied as the pattern.

---

## (c) Every module already KILLED, and why (the graveyard — enforce, don't relitigate)

All from `docs/DECISION_LOG.md` / `docs/BR-S107_SECTION_ARCHITECTURE_SPEC.md` / in-code kill comments:

1. **Stat Dossier plate — KILLED TWICE as geometry-as-prose.** BR-S107 (`docs/BR-S107_SECTION_ARCHITECTURE_SPEC.md` grep `Stat Dossier (back) — KILLED`): *"Geometry-prose a second time; the numbers live in [Metrics]."* In-code: `const statDossier = ""` with comment *"Stat Dossier KILLED (geometry-as-prose, a second time). Its numbers live only in Metrics now."* **Law (grep `geometry as prose lives in exactly two places`): geometry-as-prose lives in exactly two places — Diagram (visual) + Metrics (numeric) — nowhere else.** Aura must not become a third.

2. **Stat Reading (right-panel) — KILLED, was geometry-as-prose** (app.js grep `Stat Reading KILLED`). Slot became Colour Field.

3. **Source Record plate — KILLED** (BR-S113 1A, app.js grep `Source Record plate KILLED`): *"it did not earn its place."* Its two useful bits (provenance one-liner + serial lineage) absorbed into developed Technical Receipts.

4. **Hidden Stat plate — REMOVED** (BR-S114, TASK_QUEUE grep `Hidden Stat plate removed`). Replaced by the empty Archetype stub. (The `dossier.hidden` data with `Gesture Geometry`/`Field Silence` still exists in `data.js` but no longer renders a plate.)

5. **Right-panel deep modules — CUT (BR-S088 subtraction).** `app.js` grep `BR-S088 subtraction`: Stance Read / Fit Coherence / Frame Impact / Lore Density / Mint Record / **paid Aura Profile** were verbatim re-renders of dossier plates → cut from the PAID panel. **BUILDER RULING (DECISION_LOG grep `do NOT restore Stance to the panel`): the panel stays tight, the dossier owns the depth.** → Aura cannot resurrect a right-panel deep module.

6. **Finish / Aura SPLIT (BR-S115).** The right-panel **Finish** module was made standalone (per-material character line), *and the dossier Aura was emptied precisely so the two don't echo* (app.js grep `Finish is its own standalone module`). Later fused into a "Surface" module (BR-S117, grep `Finish + Colour Field combined`). **Finish now owns material/finish prose** (`FINISH_NOTE`, grep `FINISH_NOTE = {`, e.g. *"Cabin warmth held as a single static sheen — copper over grey glass."*). **→ Aura must NOT re-narrate material/finish** — that lane is taken. This is the exact hazard the dev `reveal` AURA module ("warm glass copper, held steady") falls into.

7. **Fit + Aura "code/tag-row" form — KILLED (BR-S109).** DECISION_LOG grep `Fit + Aura is ONE struck CLASS designation`: the 4-tag badge row (Class badge + 3 aura chips + placement line) was killed for reading as *a second Source Record (filing)*. **General law (grep `a CODE reads as FILING`): no section may render a code/call-number/serial-like address — filing already owns codes.** → Aura chips rendered verbatim as a tag row = the killed form AND doc 04's `aura[]`-verbatim decay risk. Ground-truth #3 already flags this ("decay-to-Frame-Event if aura[] chips render verbatim").

8. **The `aura[]` character-chip leak — already cleaned once.** TASK_QUEUE grep `character aura chips`: chips like "Slow-Burn"/"Load-Bearing" were rewritten to cue-named ("Auger-Braced") because they read as person-traits. The Human-Read Line doc (grep `character aura chips`) still lists this as a known leak.

---

## (d) The exact copy law (deadpan archival · lexicon · "aura" as careful-use)

**Source: `docs/COPY_SYSTEM.md`.**

- **Tone (§1):** *"Blue Room treats the photo with excessive archival seriousness until the description becomes quietly absurd."* Voice = *"a field analyst who takes the image slightly too seriously."* The comedy is never announced.
- **Calibration test (§1):** read flat, no smile — still works as archive text? Keep. Needs a wink/emoji? Delete. About the *photo* (frame, gesture, light, scene)? Keep. About the *person's worth or looks*? Delete, always.
- **Humor (§2):** deadpan (delivered as fact) · precise (funny part is specificity, not exaggeration) · archival · *slightly* absurd (one degree past plausible). **Density: at most one quietly-absurd line per section; the rest holds the deadpan.** → an Aura verdict line gets **one** dry line, not a plate of jokes.
- **"aura" is a CAREFUL-USE word (§3):** listed alongside `vibe · score · potential` — *"allowed, sparingly, **never as a headline**."* (Note the tension: the section title IS "Aura." Its *copy body* must not lean on the word "aura"; reach for the preferred lexicon.)
- **Banned lexicon (§3):** beauty-app words (stunning, gorgeous, attractive, hot, pretty, handsome, facial, body, glow-up, beauty, genetics, any masc/fem rating) — *never, anywhere*. SaaS/paywall words (locked, premium, upgrade, paywall, unlock) — never in rendered copy.
- **Preferred lexicon (§3, reach first):** `signal · artifact · frame · record · scene · gesture · charge · archive · source · evidence · field note · mint · developed · undeveloped · provenance · markings · trigger · container · extraction · pull`.
- **Free-state language (§3):** good = *partial record · undeveloped layer · archive pull · development pending*; bad = *locked / upgrade to unlock / paywall*.
- **Every Outcome Is a Win (§5):** a low read = *a different kind of artifact, not a bad photo*. Enforcement: *"every stat read in data.js must survive this test — if a user with that score would feel rated as a person, rewrite it as a read of the photograph."*
- **Tone benchmark (§6):** the four canon lines (SRC-01 Gesture Geometry + Oracle; SRC-02 Field Silence + Oracle) are the calibration — new Aura copy must sit comfortably next to them.

---

## (e) The exact safety law AS SHIPPED (BR-S113 + Human-Read Line)

**Two-layer law. BR-S113 is the LOCKED wall; the Human-Read Line refines *which* human reads are allowed.**

**BR-S113 (LOCKED) — `docs/BR-AURA-RESEARCH.md` RULE 0 (grep `RULE 0`):** *"A card reads the ARTIFACT, never the PERSON. Every aura read names an IMAGE-PROPERTY or a PERFORMED GESTURE-INTENT (the event in the frame), never the person's worth, body, rank, identity, or private feeling."* Aura is *"structurally safe by construction: in the scholarship it is a relation the FRAME stages, not a charge a person emits."* → The five absolute no's = worth/character · health/body · ranking-vs-others · identity · **attributed private feeling/mood**; the one allowance = **performed gesture-intent** ("the palm stops the lens").

**Human-Read Line v1 — `docs/HUMAN_READ_LINE_V1.md` (ACTIVE, revisable, NOT locked).** Reframes the dial from *artifact-vs-person* to **IMAGE-ACT** (what the human *performed*, re-authorable by reshooting → read freely) vs **PERMANENT** (fixed worth/identity/biology → never touch). A read passes only if it clears **all three gates** (grep `clears ALL THREE gates`):
1. **Re-authorable cue** — keys on a performed cue (gesture, gaze, crop, light, styling, pose), not body/face/build.
2. **Grammatical subject** — the sentence is about the *photograph*, not the person as an object to be evaluated.
3. **Connotation-strip** — remove the photo-noun; if the remaining predicate describes a person's *stable disposition*, it fails.

**Forbidden harms (grep `Forbidden (the precise harms)`):** rating/ranking face/body/worth · inferring fixed identity (age/ethnicity/gender-essence/orientation/health/hardwired personality) · insult-via-framing · **aggregation** (many pulls reconstructing a stable trait — the cross-pull wall, `UNIVERSE_ZONE_MAP_V1` §7: no output joined by person key; aura re-derived fresh per scan).

**Ruby-tier readings to FEATURE (grep `Ruby-tier`):** Stance Read · gesture/posture line + signal-direction arrow · gaze/eye-line as vector · gesture-as-force · the archetype/role · the intent-match. **These are exactly the relation-adjacent reads Aura should synthesize from.**

**⚠ Enforcement gap (shipped reality, grep `Enforcement gap`):** *"the line is asserted, not enforced."* Gates 2/3 are not validator-encoded; `PERSON_TRUTH` doesn't scan aura/evidence; `safetyFlags` are self-attested; no aggregate guard exists; and the doc **explicitly names still-present leaks** in `data.js`: *"the cap and beard do structural work", "nobody crouches by accident", character aura chips.* → Any Aura authoring is currently gated only by author discipline + review, not code.

---

## (f) Where content vs render vs style live (the file map for an Aura build)

From `docs/FILE_MAP.md` + verified against code:

- **CONTENT (the safest file):** `data.js` — *"ALL content: 2 ScanResults (card text, stats, reads, aura…), photoTuning, diagram, metrics, dossier (record/evidence/statNotes/hidden/mint/oracle), halo materials"* (FILE_MAP grep `ALL content`). The per-source `aura[]`, `sceneRole`, `stance`, `sceneCharge` all live here (see (g)). An Aura schema field would be authored here.
- **RENDER:** `app.js` — `renderDossier()` (grep `function renderDossier`) builds the dossier; `dplate(no,title,paid,body,extraClass)` (grep `function dplate`) is the plate helper. The Aura stub is one `dplate("03","Aura",...)` call. Right panel = `renderReadingPanel()`; live paint = `render()`; mount points `#dossierMount` / `#readingPanel` (index.html:61,64).
- **STYLE:** `styles.css` — dossier plates under `.dplate` / `.dplate__*` (grep `.dplate {` at ~2308). **There is NO `.dplate--aura` and NO `.daura__*` class today** — the Aura stub reuses generic `.dplate`. The mint/oracle plates *do* get modifier classes (`.dplate--mint`, `.dplate--oracle`). → The mission's `.dplate--aura` / `.daura__*` convention (ground-truth #6) is a *proposed target*, consistent with the existing `--mint`/`--oracle` pattern, but does not yet exist.
- **DEV-ONLY (do not build here):** `reveal/*` — isolated `?dev=staged-reveal` surface; `renderCard` is reused READ-ONLY (FILE_MAP grep `reveal/*`).

---

## (g) Aura-adjacent authored data per source — real examples (SRC-01, SRC-02)

All from `data.js`. This is the raw ore an Aura synthesis-capstone would read. **The Subtraction-Gate spine's `metTier` ladder is live as `tierBand()`** (app.js:58-68, grep `Public tier ladder`): `<25 Muted · 25-47 Clean · 48-65 Strong · 66-82 Charged · 83+ Peak`, no public 0-100. And **`frame.event`/`frame.field` already emit these exact words as authored labels** — load-bearing for an ordinal Aura band.

| Field | SRC-01 (Driver / "Checkpoint Wave" / Open-Window Operator) | SRC-02 (Ice Field / "Two Feet of Quiet" / Frost Surveyor) |
|---|---|---|
| `aura[]` (3 chips) | `["Idle-Engine", "Open-Palm", "Northbound"]` | `["Auger-Braced", "Sun-Struck", "Low-Horizon"]` |
| `sceneRole` | `"The pause the trip gets measured by."` | `"Proof the lake was work, not wallpaper."` |
| `stance` (THE relation-in-prose — grep `stance:`) | *"One arm holding the wheel's territory, the other raised flat to the lens — half stop-sign, half salute. The two-arm split holds the frame in suspension: **neither departing nor stationary.**"* | *"Crouched at full commitment, both gloves stacked on the brace, weight exactly where it should be. **Nothing performed** — the auger doesn't care, and the frame doesn't pretend otherwise."* |
| `sceneCharge.label` (grep `sceneCharge:`) | `"Idling"` | `"Contained"` (SRC-03 `"Filed"`, SRC-04 `"Closing"`, SRC-05 `"Selecting"`) |
| `frame.event` (metrics v2) | `label:"Raised palm"`, `legibility:"Peak", charge:"Charged", containment:"Strong"` | `label:"Crouched brace"`, `legibility:"Peak", charge:"Clean", containment:"Peak"` |
| `frame.field` | `weight:"Upper right — toward the raised palm", balance:"Lean right", drift/clarity/depth: Charged/Charged/Clean` | `weight:"Lower centre — down into the crouch and the ice", balance:"Centred", drift/clarity/depth: Clean/Peak/Strong` |
| `frame.signature` | `class:"Comet — a single spike"`, `band:"Charged"` | `class:"Plateau — broad and low"`, `band:"Strong"` |
| `markers[]` (source overlay) | Focal lock (raised palm) / etc. | Focal lock — hooded face · Tool axis — auger brace · Horizon — birch treeline |
| `analysis[]` (Frame Read, DERIVED) | (SRC-01 array) | `"SUBJECT CROUCHED · MASS CENTERED LOW"`, `"EXPRESSION QUALIFIED: HOOD / BEANIE / GLASS · GAZE ON TASK"` |
| `diagram.gesture.label` | brace/gesture line | `"BRACE LINE — GLOVES STACKED"`; `diagram.arrow.label:"WORK VECTOR → ICE"` |
| `reads.charge` (the felt line) | *"Idle-engine energy. Warm, contained, ready to pull back onto the road…"* | *"The auger is the only moving part… The crouched brace converts all of the image's energy into a single downward vector."* |
| `card.note` (front hero line) | *"A flat palm, five fingers, raised straight at the lens. Out the side glass, the fjord."* | *"Crouched on the ice, both gloves stacked on the auger. Low hard sun — the snow keeps no shadow."* |
| `dossier.hidden` (authored, no longer rendered) | `Gesture Geometry`, read: *"The raised palm turns the image from selfie into encounter — the frame addresses the lens directly, not the other way around."* | `Field Silence`, read: *"…crouched brace, task-directed gaze, no gesture aimed at the lens. The image organizes around the work, not the recording."* |

**Load-bearing observation for the Subtraction Gate (ground-truth #3):** `stance` already *narrates the relation in prose* — SRC-01's "neither departing nor stationary" is a two-term Standoff/suspension; SRC-02's "Nothing performed … the frame doesn't pretend otherwise" is a Figure-Ground/Record relation. The Aura capstone's job is to distill that buried sentence into **one ordinal band (on the `tierBand` ladder) + one schema-constrained frame-geometry kind-word**, with provenance pointing at `src.stance` — **not a new invented field.** *(Note: ground-truth #3 correctly warns SRC-01's "neither departing nor stationary" phrasing itself is subject-intention-flavored and must NOT be the kind-label — the kind-word is a frame-geometry noun like Standoff; the stance prose is the provenance, not the chip.)*

---

## CONFLICTS (for O6/F1 — do NOT resolve alone; repo wins on product law but flag all)

1. **Plate count: README "7 plates" vs live 5.** `README.md` (grep `7 archive plates`): *"scan dossier (7 archive plates: Source Record → Evidence Board → Stat Dossier → Hidden Stat → Fit + Aura → Mint Record → Oracle Read)."* **REPO CODE WINS: live stack is 5** (Surface Record · Archetype · Aura · Mint Record · Oracle). README is stale legacy. doc 04's "five-plate" claim matches the code. → README is documentation drift, not a design question.

2. **`PROJECT_OS.md` §65 still lists the legacy 7-plate order** (grep `03 Stat Dossier · 04 Hidden Stat · 05 Fit + Aura Layer`), and §193/§232 still describe "Aura Profile — three label chips." **Stale** — these were killed (BR-S107/S109/S114). Flag for doc reconciliation; do not treat "three label chips" as the aura spec (that form was explicitly KILLED in BR-S109).

3. **In-code drift: `app.js` map comment says "dossier … (7 plates)"** (app.js:25, grep `dossier       dplate`). Actual `renderDossier` builds 5. Cosmetic comment drift.

4. **Positional CSS vs the semantic mandate (ground-truth #6 conflict, and internally broken).** `styles.css` dossier rhythm (grep `dossier rhythm (DESIGN_TOKENS)`) uses **`.dplate:nth-of-type(1/4/6/7)`** — comment still says *"quiet → medium → medium → LOUD … LOUD finale"* and *"Hidden Stat 04, Oracle 07."* **This references plates 6 and 7 that no longer exist** (the stack is 5), so those rules are dead/misapplied, and the LOUD styling now lands on whatever plate happens to sit at nth-of-type(4) = **Mint Record**, not the intended payoff. The render code deliberately made the register dividers `<div>` "invisible to `.dplate:nth-of-type()` rhythm selectors" (styles.css grep `invisible to .dplate:nth-of-type`), confirming the whole positional system is brittle. → **This is direct evidence FOR ground-truth #6 (semantic `.dplate--aura`, never nth-of-type).** An Aura build should introduce `.dplate--aura` and the positional rhythm should be migrated to semantic modifiers. Flag as a repo bug + a design-law confirmation, not a repo-vs-research conflict.

5. **Two "Aura" surfaces (live stub vs dev module).** Live dossier Aura = empty stub (parked). Dev `reveal/reading-panel.js` Aura = hardcoded *"warm glass copper, held steady."* The dev version is a **material/finish restatement** — precisely the lane BR-S115 gave to **Finish** and precisely the single-element (not-relation) decay the Subtraction Gate bans. **REPO LAW WINS:** Finish owns material; Aura owns the RELATION. The dev module is a placeholder, not a precedent — do not carry it forward.

6. **"aura" careful-use word vs the section being titled "Aura."** COPY_SYSTEM §3 bans "aura" as a *headline* word, yet the plate title is "Aura." Not a blocker (the title is a fixed section name, like a museum case label), but the **body copy must not lean on "aura"** — reach for the preferred lexicon (charge, frame, relation-nouns). Flag so the copy pass respects it.

7. **Research doc 03's "narrow rule" (name depicted person + viewer response) is a RELAXATION of BR-S113 — already REJECTED by ground-truth #2.** No repo support for it; recording here for completeness that the repo law (five absolute no's incl. attributed private feeling) is stricter and wins. What survives from 03/05 (the is→reads-as pivot, swap/two-second tests, four-zone filter, SHORT cue-bound viewer-transfer clauses) is consistent with the repo's own safe examples (e.g. the shipped `HUMAN_READ_LINE` transforms + BR-AURA-RESEARCH §B "the frame keeps you at arm's length").

---

## Ground-truth confirmations for downstream agents (things the fleet can now rely on)

- **`metTier` ladder is real and named exactly right:** `tierBand()` app.js:58-68 → `Muted/Clean/Strong/Charged/Peak`, no public 0-100. The Aura band rides this existing ladder.
- **`frame.event`/`frame.field`/`frame.signature.band` already emit these tier words as authored per-source labels** — an ordinal Aura band is a *synthesis* of existing authored words, not a new number.
- **`src.stance` already narrates the two-term relation in prose per source** — the correct provenance target for Aura (ground-truth #3 condition (a): provenance = stance, not a redundant invented field). ✔ verified present for SRC-01…SRC-05.
- **No null-relation sample is currently authored** (all five stances assert a live relation). Ground-truth #3 condition (b) — "at least one authored null-relation sample so the band can legitimately read null" — is **NOT yet met in `data.js`**; whoever builds must author one.
- **Person-safety is asserted, not enforced in code** — Aura authoring is protected only by author discipline + review; the `data.js` leak lines named in HUMAN_READ_LINE are still present.
- **The dossier owns depth; the right panel stays tight (BUILDER RULING)** — Aura belongs in the dossier plate, not as a resurrected right-panel module.
- **The dossier screenshot `1783253951358_image.png` is ABSENT** (checked repo + Downloads per mission). Noted as absent, not a blocker.