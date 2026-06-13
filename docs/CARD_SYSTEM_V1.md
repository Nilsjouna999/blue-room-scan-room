# BLUE ROOM — Card System Spec v1

Layer: ACTIVE SPECS · Status: ACTIVE · Session BR-S022 (2026-06-13)

The official creative system for BLUE ROOM cards: stats, lenses,
archetypes, receipts, Free/Halo output, and writing tone. Future
fixture / prompt / validator work builds from THIS doc.

> **Docs only.** Defining this changes no runtime behavior. It refines the
> stat taxonomy of `SCAN_ENGINE_SPEC` (Charge moves to Halo-depth; Visual
> Impact joins the Free front; `Stance Read` / `Gesture Authority` →
> **Gesture Geometry**; adds Setting Gravity + Artifact Coherence). The
> shipped fixtures still use the prior set and migrate in the next task
> (*Card System Fixture Upgrade v1*). Safety law inherits from
> `PROJECT_OS` §1/§4, `COPY_SYSTEM` §3, and the `scan-contract.js`
> forbidden lexicon — this doc never relaxes it.

## 0. Core principle & the Artifact Test

**The card reads the image's behavior, not the person.**

**Artifact Test** — for any score or claim:
- If a *different photo of the same person* could change it → it is an
  artifact signal. **Keep.**
- If it *sticks to the person regardless of the photo* → it is identity
  scoring. **Banned.**

Run every stat, receipt, and archetype phrase through this test. If it
fails, rewrite it as a read of the photograph.

## 1. Forbidden language (global, non-negotiable)

Never score, claim, or imply: attractiveness · beauty · hotness · sexual
desirability · race / ethnicity · gender · age · health / fitness / body ·
biology / genetics · masculinity / femininity · personality / character ·
mental state / diagnosis · IQ / intelligence · wealth / class / status /
rank · human worth or value · alpha/beta or any social hierarchy ·
confidence / insecurity · life story as fact. Face/body feature scoring is
banned. (Enforced by `scan-contract.js`; full lexicon in `COPY_SYSTEM` §3.)

## 2. Stats (final v1 — 4 Free-front, 6 Halo-depth)

Format: name · tier — meaning / ↑ raises / ↓ lowers / receipt · avoid / phrases.

**Presence** · Free — visual command of the frame; how much the subject
reads as the dominant mass.
↑ centred or large mass, clean silhouette, focal lock, isolation · ↓
tiny-in-frame, swallowed by clutter, no anchor.
Receipt: "subject mass holds the centre third; nothing competes." · Avoid:
dominance, charisma, confidence, status.
Phrases: "owns the frame without moving" · "a mass the wide lens can't dilute".

**Frame** · Free — composition quality: crop, balance, placement, control.
↑ rule-of-thirds lock, deliberate crop, horizon control, clean edges · ↓
tilt with no intent, dead-centre by accident, cramped or cluttered edges.
Receipt: "horizon pinned to the upper third; entry line leads the eye in." ·
Avoid: "good/bad photographer", taste judgements of the person.
Phrases: "near-editorial discipline for a working photo" · "the crop is doing the talking".

**Signal** · Free — styling, props, colour and visible intention as design
language (what the image is *presenting*).
↑ legible gesture/prop, distinct palette, coherent styling cue · ↓ no
readable styling, muddy palette, no intent.
Receipt: "one strong colour layer over a muted ground reads as deliberate." ·
Avoid: wealth/class, taste, gender-coding of clothes.
Phrases: "the jacket does most of the speaking" · "a single clean signal, broadcast once".

**Visual Impact** · Free (derived feel) — immediate screenshot force;
first-glance memorability of the frame.
↑ strong contrast, odd or arresting composition, instant readability · ↓
flat, forgettable, nothing to hold the eye.
Receipt: "black silhouette on white field — the highest contrast the frame offers." ·
Avoid: "striking person", "stunning" — impact is of the *image*.
Phrases: "lands in one glance" · "a frame that survives the scroll".

**Charge** · Halo — tension, energy, contrast and oddness held in the image.
↑ unresolved tension, motion potential, contradiction, edge · ↓ inert,
fully resolved, low-stakes calm.
Receipt: "the raised palm and forward lean hold an unspent motion." · Avoid:
aggression, threat, emotional diagnosis.
Phrases: "ten seconds from motion" · "a quiet charge carried by the field".

**Lore Density** · Halo — amount of visible story, world and context.
↑ specific setting, tools, weather, signs, props, terrain · ↓ blank ground,
no scene cues, context-free.
Receipt: "auger, tracks and treeline place this in a working cold scene." ·
Avoid: inventing biography or backstory as fact.
Phrases: "the background is doing world-building" · "the scene refuses mythology on purpose".

**Fit Coherence** · Halo — how well styling ↔ setting ↔ gesture ↔ frame lock
together.
↑ parts agree, palette↔mood match, subject↔scene fit · ↓ mismatch,
contradiction, parts pulling apart.
Receipt: "styling, setting and stance all point the same direction." · Avoid:
"belongs / doesn't belong" about the person.
Phrases: "everything in the frame agrees" · "the mismatch becomes the record".

**Gesture Geometry** · Halo — visible pose and shape as **geometry** (lines,
angles, stance, hand position). Never body-language psychology.
↑ clear directional line, strong stance shape, readable hand geometry · ↓
ambiguous shape, occluded limbs, no geometric anchor.
Receipt: "arm raised flat to the lens makes a hard horizontal axis." · Avoid:
confidence, dominance, intent, "what the pose says about them".
Phrases: "the stance draws one clean diagonal" · "five-finger spread, no hesitation in the line".

**Setting Gravity** · Halo — how much the environment pulls the read; scene
dominance over subject.
↑ environment owns most of the frame, place-as-subject, scale · ↓ setting is
incidental, subject swallows the scene.
Receipt: "the snow plane owns three quarters of the frame and donates it to the silhouette." ·
Avoid: location-as-class/status.
Phrases: "the world took most of the frame, and that became the point" · "the room is louder than the figure".

**Artifact Coherence** · Halo — how much the image reads as a deliberate
record / artifact versus a random snapshot.
↑ record-like composition, self-aware framing, deliberate stillness · ↓
accidental, throwaway, no compositional intent.
Receipt: "the image already composes itself like a filed record." · Avoid:
"effort = worth", judging intent of the person.
Phrases: "filed without resistance" · "arrives pre-catalogued".

## 3. Lenses (10) — what each observes, ignores, and feeds

| Lens | Observes | Ignores | Feeds |
| --- | --- | --- | --- |
| Composition | crop, balance, thirds, subject placement | who the subject is | Frame, Presence, Visual Impact |
| Gesture | pose/hand/stance as line & angle (geometry) | emotion, intent, "body language" | Gesture Geometry, Signal |
| Styling | clothing/props/colour as visual design | wealth, class, gender-coding | Signal, Fit Coherence |
| Setting | environment, terrain, weather, place | location-as-status | Setting Gravity, Lore Density |
| Tension | contrast, contradiction, unresolved motion | threat, aggression | Charge, Visual Impact |
| Signal | the one thing the image broadcasts | the person's "message"/personality | Signal, Presence |
| Lore | story cues, tools, signs, world detail | invented biography | Lore Density, Setting Gravity |
| Artifact | record-like deliberateness, stillness | effort-as-worth | Artifact Coherence, Frame |
| Negative Space | emptiness, isolation, breathing room | "loneliness"/mood diagnosis | Frame, Presence, Setting Gravity |
| Screenshot | meme/UI/text-layout legibility (limited route) | the people inside a screenshot | Visual Impact, Signal |

Every lens reads **visible evidence only** and must pass the Artifact Test.

## 4. Archetypes (v1 — 24 safe, in 5 families)

An archetype is a **photo role, not a personality claim** ("this frame
routes toward X", never "you are X"). Each is defensible from receipts.
Per-family trap notes carry the safety rule; phrases stay image-only.

Format: **Name** — meaning · *produced by* · Free / Halo.

### Family A — Frame & Composition
*Trap to avoid: never grade the person's "look"; grade the geometry.*
- **The Frame Breaker** — composition fights its own edges · Frame + Charge · Free: "the crop can't hold it." / Halo: "every edge is under pressure and the frame knows it."
- **The Diagonal** — one dominant diagonal organises the image · Composition + Gesture Geometry · Free: "one line runs the whole frame." / Halo: "a single diagonal does all the structural work."
- **The Vertical** — verticality dominates the read · Composition · Free: "built to stand up." / Halo: "the vertical axis refuses to sit down."
- **The Open Field** — small subject, wide world · Setting Gravity + Negative Space · Free: "the world took most of the frame." / Halo: "the subject lent the frame to the landscape and the landscape paid it back."
- **The Minimal Verdict** — almost nothing, decisively placed · Negative Space + Frame · Free: "says it once and stops." / Halo: "a low-noise image with one signal and no need to explain itself."
- **The Hard Edge** — contrast and silhouette do the work · Tension + Visual Impact · Free: "all edge, no blur." / Halo: "the silhouette is the whole argument."

### Family B — Room & Setting
*Trap to avoid: location is scene, never class/status.*
- **The Room Anchor** — the space holds the subject in place · Setting Gravity + Presence · Free: "the room is doing the holding." / Halo: "the figure is anchored by a room that won't let go."
- **The Locked Room Figure** — enclosed, no exit in frame · Negative Space + Setting Gravity · Free: "no distance to offer." / Halo: "the frame is exactly one subject wide."
- **The Room With History** — the setting carries visible age/use · Lore Density + Setting Gravity · Free: "the room has a past." / Halo: "the walls are doing the world-building."
- **The Map Fragment** — the scene reads like a piece of a larger place · Lore Density · Free: "part of a bigger map." / Halo: "a fragment that implies the rest of the terrain."
- **The Sealed Artifact** — the image reads closed, complete, archived · Artifact Coherence · Free: "arrives already filed." / Halo: "sealed, catalogued, and not asking for input."

### Family C — Light & Palette
*Trap to avoid: light/colour are visual facts, never mood diagnosis.*
- **The Low-Light Operator** — works the dark deliberately · Tension + Signal · Free: "the dark is a choice." / Halo: "low light handled like a tool, not an accident."
- **The Neon Witness** — artificial colour rules the frame · Styling + Visual Impact · Free: "lit by signage." / Halo: "the palette is borrowed from the street and it suits the room."
- **The Palette Cult** — a single colour scheme governs everything · Styling + Fit Coherence · Free: "one palette, fully committed." / Halo: "the colour scheme has rules and the image obeys them."
- **The Glass Myth** — reflection/glass layers the image · Composition + Lore Density · Free: "seen through glass." / Halo: "a reflection turns one frame into two readings."
- **The Diffused Ghost** — soft light dissolves the edges · Negative Space + Charge · Free: "edges gone soft." / Halo: "the subject is half-given to the light."

### Family D — Signal & Gesture
*Trap to avoid: gesture is geometry; never read intent or character.*
- **The Signal Bearer** — the image is about the thing being shown · Signal + Gesture Geometry · Free: "one clear broadcast." / Halo: "the message left the frame before the shutter closed."
- **The Static Saint** — stillness elevated to composition · Gesture Geometry + Artifact Coherence · Free: "perfectly still on purpose." / Halo: "stillness staged like a relic."
- **The Quiet Catalyst** — a small gesture organises the whole frame · Gesture Geometry + Charge · Free: "one move runs it all." / Halo: "a minor gesture the rest of the image answers to."
- **The Overloaded Channel** — too many signals at once, by design · Signal + Tension · Free: "everything talking at once." / Halo: "a channel pushed past capacity and holding."

### Family E — Record & Time
*Trap to avoid: candor/age of the image, never of the person.*
- **The Archive Ghost** — reads like found footage / old record · Artifact Coherence + Lore Density · Free: "looks recovered, not taken." / Halo: "filed as evidence from a time the frame won't name."
- **The Untouched Witness** — candid, unstaged, unguarded composition · Artifact Coherence · Free: "caught, not performed." / Halo: "no staging detected — rarer than staging."
- **The Last Frame** — reads like the end of a sequence · Charge + Tension · Free: "feels like the last one." / Halo: "the final frame of a roll nobody else shot."
- **The Striking Contradiction** — two visual ideas refuse to resolve *(renamed from "The Beautiful Contradiction"; "beautiful" is banned beauty-app language — this names a compositional contradiction, never the person)* · Tension + Fit Coherence · Free: "two ideas, no winner." / Halo: "a contradiction the frame keeps unresolved on purpose."

### Hold for later (needs stricter copy before use)
- **The Soft Threat** · **The Centered Threat** · **The Folded Shape** —
  excluded from v1: "threat" risks reading menace onto the person; "folded
  shape" risks body-reading. Re-introduce only with strict image-only copy.

## 5. Receipts — locatable visible-cue evidence

A receipt must be **locatable · visual · mechanism-linked · falsifiable**
(you could point at the pixels and disagree). Shape:
`{ lens, observation, visibleCue, effect, confidence }`.

**May point to:** subject placement · camera angle · frame/crop · negative
space · lighting/colour/contrast · gesture/pose as geometry · styling as
visual design · environment/background · visual tension · narrative ambiguity.

**Must not claim:** real personality · confidence/insecurity · wealth/
class/status · attractiveness · masculinity/femininity · race/gender/age/
health · mental state · life story · human worth.

**20 safe receipt examples:**
1. subject mass holds the centre third; nothing competes for the eye.
2. horizon pinned to the upper quarter in one clean band.
3. entry tracks lead the eye in from the lower-left.
4. wide negative space on the right balances a left-weighted subject.
5. black silhouette on a white field — maximum available contrast.
6. low hard side-light erases shadow detail and flattens the plane.
7. one warm colour layer over a muted ground reads as deliberate.
8. raised palm makes a hard horizontal axis across the frame.
9. crouched stance draws a low, stable triangle.
10. dashboard and roofline crop the frame from three sides.
11. a single diagonal runs corner to corner and organises the rest.
12. reflection in glass splits the frame into two readings.
13. the subject occupies under a tenth of the frame; the setting dominates.
14. repeated verticals (poles, trees) rule the background rhythm.
15. blown highlights on snow lift the exposure floor.
16. tool and work-surface place the scene in an active setting.
17. centred subject with symmetrical margins reads as a deliberate record.
18. motion blur at the edges holds an unspent movement.
19. tight crop removes all surrounding context by choice.
20. an unresolved gap between gesture and setting holds the tension.

## 6. Free vs Halo output

**Free Pull shows:** artifact title · archetype name/teaser · the 4 visible
stats (Presence / Frame / Signal / Visual Impact) · a 2–3 sentence summary ·
2–3 receipts · 1 *sealed* hidden stat · a clear upgrade teaser (never
implying any unsafe judgment is waiting).

**Halo Mint unlocks:** all 10 stats · extended evidence board · dossier
rhythm · archetype explanation · a **"What this card is NOT saying"** trust
block (states the bans plainly) · oracle-style fictional artifact text ·
mint record · variant language.

**Halo must NOT unlock:** attractiveness score · biology rating · identity
inference · fake psychology · human-worth ranking. Halo *develops* the Free
read with more depth; it never *contradicts* a visible fact Free established.

## 7. Writing tone

**BLUE ROOM voice:** sharp · cinematic · slightly mythic · collectible-card
language · forensic-art-critic energy. Not therapy, not astrology, not
cruel, not saccharine. Lightly funny/roasty **only toward the image or
artifact**, never the person. Deadpan: stated as fact, never flagged as a joke.

**20 approved sentence patterns**
1. The [element] does most of the speaking.
2. The frame routes toward [archetype].
3. The composition reads as [visual trait].
4. The [setting] took most of the frame, and that became the point.
5. Filed from [place], [state].
6. The crop is doing the talking.
7. A low-noise image with one strong signal.
8. Nothing here competes for the eye.
9. The [cue] makes a hard [axis] across the frame.
10. The mismatch becomes the record.
11. The background is doing the world-building.
12. Stated once, then stopped.
13. The image already composes itself like a record.
14. Two ideas, and the frame keeps them unresolved.
15. The [light] is handled like a tool, not an accident.
16. The edge is the whole argument.
17. The room is louder than the figure.
18. Caught, not performed.
19. Arrives pre-catalogued.
20. A frame that survives the scroll.

**20 banned sentence patterns**
1. You are [trait].  2. This proves [psychology].  3. [Person] looks
[attractive/hot/etc].  4. High/low value individual.  5. Alpha/beta energy.
6. Your personality is [X].  7. This shows confidence/insecurity.  8. They
seem [age].  9. Reads as [gender] energy.  10. [Race/ethnicity] features.
11. Healthy/unhealthy / fit / body [X].  12. Facial symmetry / jaw / skull.
13. This person is wealthy/poor/upper-class.  14. Born leader / natural [X].
15. Dominant / submissive.  16. Masculine / feminine score.  17. Intelligent
/ low-IQ.  18. Hidden trauma / deep [diagnosis].  19. Soulmate / destiny /
zodiac read of the person.  20. This is what kind of person you are.

**20 Free Pull example lines**
1. The palm says stop; the card kept going.  2. Filed from the driver's
seat, engine off.  3. A quiet frame with unusually high distance control.
4. The jacket does most of the speaking.  5. Black on white, one clean edge.
6. The crop is doing the talking.  7. Says it once and stops.  8. The world
took most of the frame.  9. Caught, not performed.  10. The room is doing
the holding.  11. Lit by signage, committed to it.  12. One line runs the
whole frame.  13. Seen through glass, twice.  14. The dark is a choice here.
15. Near-editorial discipline for a working photo.  16. Nothing competes for
the eye.  17. Arrives already filed.  18. All edge, no blur.  19. A signal
broadcast once.  20. Lands in one glance.

**20 Halo Dossier example lines**
1. The treeline rules the upper quarter in one clean band; nothing argues
with it.  2. Mass sits left of centre, balanced by the window — a two-weight
frame that holds.  3. The snow plane owns three quarters of the frame and
donates all of it to the silhouette.  4. Eye-line and gesture fire on the
same axis, straight out of the frame.  5. A reflection turns one frame into
two readings and lets both stand.  6. The palette has rules and the image
obeys them.  7. Low side-light erases every shadow excuse.  8. Stillness
staged like a relic, not a pause.  9. The crop removes all context by choice
and dares you to miss it.  10. A single diagonal does the structural work the
subject won't.  11. The setting carries more history than the figure does.
12. One minor gesture the rest of the image answers to.  13. Filed as
evidence from a time the frame won't name.  14. The contradiction stays
unresolved on purpose; that is the artifact.  15. Negative space is the
loudest element in the composition.  16. Repeated verticals set a rhythm the
subject steps into.  17. The image composes itself like a record before you
ask it to.  18. Maximum contrast, minimum noise, one decision.  19. The
edge does the whole argument; the centre just confirms it.  20. A channel
pushed past capacity and somehow holding the frame.

**10 Oracle lines** *(fictional / artifact voice — clearly flagged as
mythic flavour, never a claim about the person)*
1. This card belongs to the rare class of images that arrive already filed.
2. The snow kept the minutes; the card signed them.
3. Logged mid-route; neither the palm nor the fjord blinked.
4. The frame caught a doorway being used as a doorway.
5. Some artifacts arrive pre-catalogued, asking nothing.
6. The room measured itself and found it exactly one subject wide.
7. The background withdrew, and the archive noted its cooperation.
8. This card does not explain itself; it lets the field do the talking.
9. The last frame of a roll nobody else shot.
10. Filed without resistance, under a name the scene chose itself.

---

**Authority note:** v1 stat taxonomy here supersedes `SCAN_ENGINE_SPEC`
for the card-facing system; reconcile that spec and migrate fixtures in
*Card System Fixture Upgrade v1*. Safety rules in §1/§5/§6 are LOCKED-grade
and may not be relaxed by any downstream task.
