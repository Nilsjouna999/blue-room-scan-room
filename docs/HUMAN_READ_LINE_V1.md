# BLUE ROOM — Human-Read Line v1 (the image-act / permanent line)

Layer: ACTIVE SPEC · Status: ACTIVE (revisable, not LOCKED) · 2026-06-14

Refines the safety law. Supersedes the too-absolute reading of "reads the photo, never
the person" — which, taken literally, would ban the posture / gesture / role reads that
are the product's soul (and which the builder explicitly values).

## The reframe
The dial is NOT artifact-vs-person. It is:
- **IMAGE-ACT** — what the human *performed* in this frame (posture, gesture, gaze, styling,
  the role), re-authorable by reshooting → **read it freely; it's the soul.**
- **PERMANENT** — fixed worth, identity, biology a reshoot can't change → **never touch it.**

The wall moved from "around the human" to "around the permanent."

## The line — a read is allowed only if it clears ALL THREE gates
1. **Re-authorable cue** — the cue the read keys on is in the performed set (gesture, gaze,
   crop, light, styling, pose), NOT body/face/build the subject can't reshoot away. (Bars
   beard/silhouette laundered as "compositional mass.")
2. **Grammatical subject** — the sentence is about the photograph (frame/crop/gesture/light/
   setting), not the person as an object to be evaluated. (Bars face-rating in disguise.)
3. **Connotation-strip** — remove the photo-noun; if the remaining predicate describes a
   person's *stable disposition*, it fails. ("the posture of someone who decides" → "this
   person is decisive" = fail.)

## Forbidden (the precise harms)
- Rating/ranking the person's face/body/worth (attractiveness, any human-as-evaluable score).
- Inferring fixed identity (age / ethnicity / gender-as-essence / orientation / health /
  hardwired personality).
- Insult via framing — a low read phrased as a failure of the person (co-enforce
  "every outcome is a win").
- **Aggregation** — many pulls of one person reconstructing a stable trait. THE single read
  can be safe while the accumulation is the harm. This layer is currently UNENFORCED in code.

## Ruby-tier readings (feature these)
Stance Read · the diagram gesture/posture line + signal-direction arrow · gaze/eye-line as
vector · gesture-as-force · the archetype/role (a photo role, not a person) · the intent-match
(did the frame land what you were going for). These reward uploading with intent.

## When human-reading is necessary, and for what
- When a pure-composition read would be sterile.
- When the user uploaded WITH intent and expects the stance acknowledged.
- The archetype split (performed *for the lens* vs *toward the task*) — needs gaze + gesture.
- A contradiction between visible signals (styling controlled, posture braced) — the intent-match.

## The transformation (raw human-read → user-facing stat/layer)
RULE: (1) name the observable cue, (2) frame it as what the cue *does to the photo*, (3) keep it
re-authorable, (4) never rank or assign fixed worth. Then route to tier-band / archetype / diagram / oracle.

| raw (forbidden) | transformed (allowed) | layer |
|---|---|---|
| "she looks confident" | "direct eye-line → high gesture legibility in-frame" | tier band + arrow |
| "humble / tired (crouched)" | "crouched brace, gloves stacked → contained motion potential" | archetype + brace polyline |
| "cold / unavailable" | "eye-line to task; hood qualifies the expression → Signal eases" | oracle / receipt (Halo-buried) |
| numeric posture 88/100 | "Gesture Geometry — raised palm → frame reads as encounter" | tier band (no number, Halo only) |

## Enforcement gap (honest — this is the RULE, not yet the reality)
Blue Room does not yet fully enforce this. Open in code (TASK_QUEUE, safety-critical): gates 2/3
aren't validator-encoded; `PERSON_TRUTH` doesn't scan aura/evidence/discoveryNote; `safetyFlags`
are self-attested; no aggregate/cross-pull guard exists; some sample copy in `data.js` leaks
("the cap and beard do structural work", "nobody crouches by accident", character aura chips).
Until built, the line is **asserted, not enforced.**

Revisit: when the uploaded-photo engine is built — the aggregate guard must ship with it.
