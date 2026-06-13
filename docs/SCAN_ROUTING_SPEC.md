# SCAN ROUTING SPEC

Layer: ACTIVE SPECS · Status: ACTIVE · Promoted from research/SPINE.md
§2–4 on 2026-06-12. Governs how images enter the room and which scan
they receive. Not implemented in code yet — this is the buildable rule set.

## Intake gate

Every image gets exactly one gate result: **accepted / limited / rejected**.

**Hard reject (no scan):** explicit sexual imagery · sexualized minors /
CSAM · non-consensual intimate imagery · severe gore · hate symbols /
extremist propaganda · private documents (IDs, bank cards, passports) ·
corrupted file · blank/no recoverable visual signal.

**Limited scan (allowed, marked):** very blurry · very dark but not blank
· low resolution · heavy filters · screenshots · memes · collages ·
uncertain AI/synthetic · mixed/unknown subject.

**Reject/limited copy is factual, short, non-moralizing, no jokes:**

> This image cannot be scanned. Blue Room does not process explicit or
> sexual imagery.

> The room could not find enough visible signal in this image. Try a
> brighter image with a readable subject, object, or scene.

> Limited signal detected. The room can read broad frame, mood, and
> structure, but deeper gesture evidence is weak.

## Routes

One route per scan. Routes exist so nothing is forced into a human
portrait model.

| Route | Use when | Reads (allowed) |
| --- | --- | --- |
| HUMAN_SOLO | one person is the clear subject | frame, gesture, styling, posture, environment, signal, charge, lore |
| HUMAN_GROUP | multiple humans central | group composition, spacing, formation, dominant figure, social geometry. Never: ranking people, group attractiveness, per-person personality |
| HUMAN_ANIMAL_BOND | human + animal both meaningful | shared frame, proximity, handler/companion dynamic, contrast/harmony |
| ANIMAL_COMPANION | animal is the subject | posture, silhouette, calm/chaos, environment, creature presence |
| LANDSCAPE_SCENE | place/weather/scene dominates | atmosphere, scale, color field, silence, terrain, composition. No human stats |
| OBJECT_ARTIFACT | object/vehicle/room/outfit central | material, condition, shape, context, symbolic charge, display logic |
| SYNTHETIC_AI_PRINT | declared/detected AI image | composition, style coherence, worldbuilding, artifact noise. Allowed but marked: "Synthetic image detected or declared. Routing as SYNTHETIC PRINT." |
| SCREENSHOT_MEME_LIMITED | screenshot/meme/UI/text-heavy | layout, text density, visual joke/signal. Limited route only |
| MIXED_UNKNOWN | no stable route wins | frame, mood, chaos, signal fragments |

## Free Pull vs Halo Mint routing behavior

- **Free Pull** does the gate + route cheaply: file validation, simple
  quality checks, user-declared route, deterministic templates, static
  sample data in prototype. Free shows the route label and a preview —
  never route-confidence details.
- **Halo Mint** runs the route-specific lens analysis (SCAN_ENGINE_SPEC)
  and may refine the route with explanation. Halo may deepen the read;
  it must not contradict the visible facts Free established.
