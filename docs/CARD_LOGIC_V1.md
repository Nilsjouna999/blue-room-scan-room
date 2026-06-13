# BLUE ROOM — Executable Card Logic v1

Layer: ACTIVE SPECS · Status: ACTIVE · Session BR-S023 (2026-06-13)

Turns `CARD_SYSTEM_V1` into a hidden ruleset that future fixtures,
validators, prompts, and deterministic mocks must obey. Safety law inherits
from `PROJECT_OS` §1/§4, `CARD_SYSTEM_V1` §1/§5/§6, and the
`scan-contract.js` forbidden lexicon — nothing here relaxes it.

## 1. Purpose

**BLUE ROOM displays card logic, not fake precision.** Every user-facing
card must read as rule-driven, never as random poetry with invented
numbers. This doc is the rule layer between `CARD_SYSTEM_V1` (what the
stats/archetypes mean) and the future code (fixtures/validators/prompts).
**Docs only — no runtime behavior changes.**

## 2. Public Tier Bands

Public cards display **tiers / bars, never exact 0–100 numbers.** Internal
engines may sort on numbers; the user-facing card shows a tier.

| Tier | Meaning (of the image element) | Use when | Must NOT imply |
| --- | --- | --- | --- |
| QUIET | barely registers; present but low | the element is faint but real | "weak/bad" photo or person |
| PRESENT | clearly there, not leading | the element reads but doesn't dominate | "average" person |
| STRONG | a leading element of the frame | the element clearly shapes the read | skill/worth of the person |
| DOMINANT | commands the frame | the element controls the composition | social/physical **dominance** of a person; alpha |
| TOTAL | the frame is essentially this element | one element overwhelms all others | "perfect"; superiority of a person |

**Provisional internal → public mapping** (calibrate later with real
distribution data; not final): `0–19 QUIET · 20–44 PRESENT · 45–69 STRONG ·
70–89 DOMINANT · 90–100 TOTAL`. Example: internal Presence 82 → public
**DOMINANT**. Tiers describe the *image element*, never the human.

## 3. Receipt Grounding (two layers)

Every receipt has two layers, in order:
- **Tier 1 — Observed Cue:** a visible, locatable, falsifiable image cue.
- **Tier 2 — Artifact Interpretation:** what that cue does to the frame.

**Grammar:** `[observed cue] → [artifact effect]`. Examples:
- Subject anchor sits near the left third → open space pushes weight toward the anchor.
- A dark region occupies most of the frame → light becomes scarce and more forceful.
- High edge contrast around the subject → visual impact rises at thumbnail size.

**Rules (validator targets):** no Tier 2 without a Tier 1 · no invisible
assumptions · no personality / biography / identity claims · one receipt =
one locatable cue.

## 4. Detected Cue Categories (logic target, not implementation)

Future-detectable cue families a receipt may cite: subject/anchor position ·
bounding-box size & placement · negative-space ratio · contrast / edge
contrast · dominant palette · brightness / darkness distribution · line
direction (diagonals / verticals) · crop behavior · depth layers ·
environment density · text/screenshot/meme indicators · multi-subject count ·
blur / low-information flags. (No detector exists yet; this is the target
vocabulary cues must map to.)

## 5. Artifact Test as an Executable Line Check

A future check inspects the **grammatical subject** of each displayed line.

**PASS** if the subject is: the frame · the image · the crop · the light ·
the palette · the setting · the gesture-as-geometry · the composition · the
artifact · the visible cue.
**FAIL** if the subject is: you · the person · the face · the body · the
subject as a real human identity · inferred mood / personality / status /
health / beauty.

- Pass: "The crop compresses the frame." · "The shadow carries most of the visual weight."
- Fail: "You seem mysterious." · "You look confident." · "The person has strong presence."

(Rewrite a failing line so its subject is an image element — "the frame
holds a strong presence," not "the person has strong presence.")

## 6. Archetype Trigger Rules (24 v1)

Per archetype: **Primary** stat pattern · **Cue** required cue · **Lenses**
supporting · **Block** when not to use · **Tie** tie-break. An archetype
fires only with cue evidence (no cue → no archetype).
**Grammar:** Primary lists §2 **stats**, each with a tier floor (an
unqualified stat = ≥ PRESENT); Cue lists §4 **cue families**; Lenses are §3
**lens** names; Block/Tie are prose. Tiers are provisional (§2).

**A · Frame & Composition**
- **The Frame Breaker** — Primary: Frame STRONG+ + crop pressure · Cue: subject pressed to ≥2 edges, tight crop · Lenses: Composition, Tension · Block: comfortably-centred subject with margin · Tie: beats Hard Edge when *edges* (not contrast) carry the tension.
- **The Diagonal** — Primary: Frame + one dominant diagonal · Cue: single diagonal ≥ a frame-third · Lenses: Composition, Gesture · Block: mixed/competing lines · Tie: beats Vertical when the strongest line slants.
- **The Vertical** — Primary: Frame, verticality leads · Cue: dominant vertical(s) · Lenses: Composition · Block: horizontals/diagonals win · Tie: loses to Diagonal when a slant is stronger.
- **The Open Field** — Primary: Setting Gravity DOMINANT+ + small Presence · Cue: subject <~10% frame, high negative space · Lenses: Negative Space, Setting · Block: subject fills frame · Tie: beats Minimal Verdict when a *world* (not emptiness) dominates.
- **The Minimal Verdict** — Primary: Frame STRONG + low Lore Density · Cue: near-empty frame, one decisive element · Lenses: Negative Space, Composition · Block: busy scene · Tie: beats Open Field when *emptiness* is the point.
- **The Hard Edge** — Primary: Visual Impact DOMINANT+ + high edge contrast · Cue: strong silhouette / high local contrast · Lenses: Tension, Composition · Block: low/soft contrast · Tie: beats Frame Breaker when *contrast* drives impact.

**B · Room & Setting**
- **The Room Anchor** — Primary: Setting Gravity STRONG + Presence STRONG · Cue: interior frames & encloses subject · Lenses: Setting, Composition · Block: incidental setting · Tie: beats Locked Room Figure when the room *holds*, not *traps*.
- **The Locked Room Figure** — Primary: Setting Gravity STRONG + low negative space · Cue: enclosed, no visible exit · Lenses: Negative Space, Setting · Block: open space/exit visible · Tie: beats Room Anchor when there is no way out in frame.
- **The Room With History** — Primary: Lore Density DOMINANT+ from setting wear · Cue: visible age/use/marks in the environment · Lenses: Lore, Setting · Block: blank/new room · Tie: beats Map Fragment when the room itself carries the lore.
- **The Map Fragment** — Primary: Lore Density STRONG, scene implies more · Cue: partial scene, edges imply continuation · Lenses: Lore, Composition · Block: scene reads complete · Tie: loses to Room With History when the visible room dominates.
- **The Sealed Artifact** — Primary: Artifact Coherence DOMINANT+ · Cue: record-like, deliberate, closed composition · Lenses: Artifact, Composition · Block: casual/accidental frame · Tie: beats Untouched Witness when the image reads *composed*, not *candid*.

**C · Light & Palette**
- **The Low-Light Operator** — Primary: Visual Impact DOMINANT+ + dark-field · Cue: high darkness ratio + hard edge contrast or single source · Lenses: Tension, Composition, Negative Space · Block: merely underexposed, no anchor · Tie: beats Hard Edge when darkness ratio is the dominant feature.
- **The Neon Witness** — Primary: Signal / Visual Impact STRONG + artificial colour · Cue: saturated artificial light rules palette · Lenses: Styling, Tension · Block: natural/neutral light · Tie: beats Palette Cult when colour is *light-source*, not styling.
- **The Palette Cult** — Primary: Fit Coherence STRONG + single palette · Cue: one colour scheme governs the frame · Lenses: Styling, Composition · Block: mixed/incoherent palette · Tie: loses to Neon Witness when colour comes from light.
- **The Glass Myth** — Primary: Lore Density STRONG + reflection layer · Cue: glass/reflective surface layers the frame · Lenses: Composition, Lore · Block: no reflective layer · Tie: standalone; rarely competes.
- **The Diffused Ghost** — Primary: Charge STRONG + soft edges · Cue: soft light dissolving subject edges · Lenses: Negative Space, Tension · Block: crisp edges · Tie: loses to Low-Light Operator when darkness leads.

**D · Signal & Gesture**
- **The Signal Bearer** — Primary: Signal DOMINANT+ + Gesture Geometry · Cue: one clear directional broadcast gesture/prop · Lenses: Signal, Gesture · Block: no single readable signal · Tie: beats Quiet Catalyst when the signal *is* the subject.
- **The Static Saint** — Primary: Gesture Geometry STRONG + Artifact Coherence STRONG, low motion · Cue: deliberate stillness, centred/symmetrical · Lenses: Gesture, Artifact · Block: motion/asymmetry dominates · Tie: beats Sealed Artifact when a still *figure* is the relic.
- **The Quiet Catalyst** — Primary: Gesture Geometry STRONG + Charge · Cue: a minor gesture the composition answers to · Lenses: Gesture, Tension · Block: gesture is loud/central mass · Tie: loses to Signal Bearer when the signal is large/explicit.
- **The Overloaded Channel** — Primary: Signal STRONG + Charge · Cue: high environment density, competing signals · Lenses: Signal, Tension · Block: sparse frame · Tie: beats Map Fragment when density (not implication) is the read.

**E · Record & Time**
- **The Archive Ghost** — Primary: Artifact Coherence STRONG + Lore Density · Cue: degraded/old/found-footage quality · Lenses: Artifact, Lore · Block: crisp/contemporary · Tie: beats Untouched Witness when the image reads *recovered*.
- **The Untouched Witness** — Primary: Artifact Coherence STRONG, candid · Cue: unstaged, unguarded composition · Lenses: Artifact · Block: staging evident · Tie: loses to Sealed Artifact when composition reads deliberate.
- **The Last Frame** — Primary: Charge DOMINANT+ · Cue: unresolved motion, terminal-moment framing · Lenses: Tension · Block: neutral/static moment · Tie: beats Diffused Ghost when tension (not softness) leads.
- **The Striking Contradiction** — Primary: Charge STRONG + low Fit Coherence · Cue: two visual ideas that refuse to resolve · Lenses: Tension, Styling · Block: coherent/single-idea frame · Tie: beats Overloaded Channel when it is *two* ideas, not many.

**Held for later** — The Soft Threat · The Centered Threat · The Folded
Shape. Held because "threat" projects menace/intent onto the person (fails
§5) and "folded shape" risks body-reading; re-introduce only with strict
image-only triggers and copy.

## 7. Sealed Stat Logic

Sealed-stat **types** (the hidden Free stat): Highest hidden stat · Most
surprising stat · Archetype-deciding stat · Contradiction stat ·
Lowest-reading stat (the faintest *image* element — never a "weakness" of
the photographer or person; the seal still reads the frame).

**Rules:** do not always seal the highest — the seal must have a *reason*
(one of the types above) · Free shows a **teaser phrase**, never only a
lock · the reason is recorded so Halo can pay it off. Teaser examples:
"One stat decided this card." · "One stat disagrees with the rest of the
frame." · "The quietest stat is doing more work than it looks." · "The
strongest stat is behind the seal."

## 8. Rarity Logic

Rarity = **unusual artifact profile**, never a better human or a better
photo. Provisional factors: stat extremity · unusual stat combination ·
high Artifact Coherence with unusual cues · strong archetype clarity · rare
cue combinations · low-information special category.

**Rarity must never mean:** attractiveness · person value · status ·
"quality" alone.

**Bands:** COMMON PRINT · CLEAN PRINT · UNCOMMON PULL · RARE VARIANT ·
HALO-ODDITY · MYTHIC ARTIFACT. Final thresholds need real distribution data
later; until then rarity is provisional and must cite its factor.

## 9. Reframe Map Logic

Halo unlocks a **different kind of value**, not more text: what *image*
changes would likely shift the card toward another archetype. Stays
image/artifact-focused.

**Allowed changes:** lighting · crop · distance · negative space ·
background density · colour palette · camera angle · setting.
**Forbidden:** change face/body/personality/status/identity · "be more
confident" · "look better" · "dress better" as human judgment.

Example — Current: NIGHT PRINT / The Low-Light Operator.
- To pull CLEAN PRINT: use even daylight, reduce darkness ratio, widen negative space.
- To pull NEON WITNESS: introduce saturated artificial light and deeper background detail.

## 10. Low-Information / Degenerate-Input Ladder

Fail honestly, not dramatically. Many weak inputs still become safe (even
funny) collectible cards; only unsafe/unsupported cases hit the blocked
state (`SCAN_ROUTING_SPEC` reject).

| Input case | Response | Card type | Allowed language | Safe example |
| --- | --- | --- | --- | --- |
| blurry | limited card | UNRESOLVED FRAME | soft-field, refuses to resolve | "the frame won't resolve; read as soft-field." |
| blank wall / low density | special card | LOW ARTIFACT DENSITY / BLANK PRINT | emptiness, scarcity | "almost nothing here — and that is the record." |
| screenshot / meme / text | limited card | TEXT ARTIFACT | layout, text density, signal | "reads as layout and signal, not scene." |
| group photo | special card | MULTI-ANCHOR FIELD | shared weight, spacing (never rank people) | "several anchors; the frame shares its weight." |
| no clear subject | limited card | UNRESOLVED FRAME / NOISE FIELD | open frame, no anchor | "no single anchor wins; the frame stays open." |
| too dark | special card | STATIC CAPTURE / BLANK PRINT | scarcity of light | "light is scarce to the point of near-silence." |
| too cluttered | special card | NOISE FIELD | density, competing signals | "too many signals to resolve cleanly." |
| cropped / partial | special card | CROPPED SIGNAL | fragment, off-screen rest | "a fragment; the frame keeps the rest off-screen." |
| face-rating bait | **blocked** | — | refuse, factual | "Blue Room reads the image, not the person." |

Forbidden in every low-info case: quality/skill judgment of the photographer
or person · attractiveness · any §1 banned claim. Special card types:
LOW ARTIFACT DENSITY · BLANK PRINT · NOISE FIELD · TEXT ARTIFACT ·
UNRESOLVED FRAME · STATIC CAPTURE · CROPPED SIGNAL · MULTI-ANCHOR FIELD.

## 11. Voice Register Rotation

Four registers: **Forensic** (clinical cue-reading) · **Architectural**
(space/composition) · **Archive** (catalogued record) · **Oracle**
(fenced fiction). Rules: Free card uses **≥2** registers · Halo dossier
uses **≥3** · personification at most **once** per card outside Oracle ·
Oracle text must stay fenced as fiction · avoid house-phrase repetition.

**House-phrase watchlist (flag overuse):** "film that does not exist" ·
"doing security detail" · "the entire argument" · "no exits" · "signed the
same contract" · any phrase repeated across cards too often.

## 12. Validation Implications (future validator / prompt targets)

- Block public exact 0–100 numbers unless on a dev route.
- Require ≥1 grounded (Tier-1-backed) receipt per displayed stat.
- Require a scope/Artifact-Test pass (§5) on every line — subject must be an image element.
- Require no person-subject claims (extends `scan-contract.js`).
- Require archetype trigger evidence (a cited cue) before naming an archetype.
- Require a recorded sealed-stat reason (§7).
- Require a rarity reason / factor (§8).
- Require the Reframe Map to use image changes only (§9).

## 13. Current Implementation Status

- This is **docs only** — no runtime behavior changes.
- Runtime still uses dev fixtures; the validator (`scan-contract.js`) is unchanged.
- Local Draft still generates **no scan**; Develop Scan still opens the sealed engine-offline gate.
- No AI · no backend / upload / payment · **no user photo is analyzed.**

---

**Authority note:** this logic spec sits under `CARD_SYSTEM_V1` (which
defines the vocabulary) and feeds *Card System Fixture Upgrade v1* and any
future validator/prompt. The §1–§13 rules — especially §5, §9, §10, §12 —
are LOCKED-grade safety logic and may not be relaxed downstream.
