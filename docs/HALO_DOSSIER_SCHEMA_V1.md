# BLUE ROOM — Halo Dossier Schema v1

Layer: ACTIVE SPECS · Status: ACTIVE · Session BR-S050 (2026-06-15)

Defines the **data shape** for the opened (post-unlock) Halo dossier — the
sealed card back — in terms of fields, safety rules, and the Free / Halo
reveal model. **Docs only.** No runtime build, no payment, no AI / backend /
upload analysis. This schema is the target the future dossier renderer and
any fixture upgrade must satisfy; it does not change today's runtime.

Builds on and must be read alongside:
- `docs/halo/HALO_GATE_BOUNDARY_V1.md` (§D framing law, §B/§C boundary
  rules) — **inherits all LOCKED-grade constraints without relaxation**
- `docs/SCAN_ENGINE_CONTRACT.md` (result-shape precedent, safety flags,
  Free/Halo reveal table §7)
- `docs/CARD_SYSTEM_V1.md` (v1 stat taxonomy — 4 Free / 6 Halo depth, the
  Artifact Test, lenses, receipt rules, tone)
- `docs/CARD_LOGIC_V1.md` (executable ruleset: tier bands, receipt grounding,
  archetype triggers, sealed-stat logic)
- `data.js` SOURCES shape (`dossier.*` fields in the current sample fixtures)
  — this schema extends and formalises that precedent

Safety law inherits from `PROJECT_OS` §1/§4, `COPY_SYSTEM` §3, and
`HUMAN_READ_LINE_V1` (image-act vs permanent). Nothing here relaxes it.

---

## 0. Core law (from HALO_GATE_BOUNDARY_V1 §D — LOCKED)

> Every module reads the **image / frame / artifact**.
> None may read the person — no self-improvement, no diagnosis, no
> attractiveness, personality, status, confidence, or social value.
> "Change the photo, not yourself." A variant is *another card*, never a
> fixed / better you.
>
> Exact counts and full contents are **allowed inside the opened dossier**
> (post-unlock, by intent) — they are forbidden only on the pre-unlock
> Free front and gate.

**Artifact Test** (from `CARD_SYSTEM_V1` §0): for every field value, ask —
*if a different photo of the same person were used, would this change?*
If yes → artifact signal, keep. If it sticks to the person regardless → banned.

---

## 1. Module registry (the 7 candidate modules)

These are the **production notes** that form the card back. Each is named,
framed, and bounded here. Runtime rendering is a separate task.

| # | Module key | Display name | Framing | Halo-only or shared |
|---|---|---|---|---|
| 01 | `theRead` | The Read | What the frame is doing — the artifact's principal read | Halo-only |
| 02 | `strongestLever` | Strongest Lever | The single image choice carrying the card | Halo-only |
| 03 | `activeLevers` | Three Active Levers | The image levers in play (light · crop · distance · gesture · setting…) | Halo-only |
| 04 | `keepThis` | Keep This | What already works in the frame — what to preserve | Halo-only |
| 05 | `variantRoutes` | Two Variant Routes | What a *different photo* would become — another card, not a better one | Halo-only |
| 06 | `oneReduce` | One Reduce | One element the frame could drop | Halo-only |
| 07 | `nextPullSetup` | Next Pull Setup | Camera direction for the next shot | Halo-only |

A sealed-back hint that a dossier layer *exists* appears on the Free front
(qualitative only — `HALO_GATE_BOUNDARY_V1` §B). Module fields, values,
and counts live exclusively in the opened dossier.

---

## 2. Full schema (documentation only)

This object extends the existing `data.js` `dossier.*` fixture shape.
Future fixture upgrades and any renderer must conform to this target.

```jsonc
{
  /* ── Dossier-level identity ───────────────────────────────── */
  "kind": "halo_dossier",               // distinct object kind; never merged with Free data
  "schemaVersion": "halo-dossier-v1",
  "sourceId": "string",                 // matches SOURCES[n].id
  "cardSerial": "string",               // the card serial (SOURCES[n].card.serial)

  /* ── Record (factual archive header) ─────────────────────── */
  "record": {
    "objectNo": "BR-OBJ-NNN",           // archive object number
    "captureType": "string",            // e.g. "Cabin self-document · action-wide"
    "gesture": "string | null",         // visible pose/hand geometry only; null if absent
    "container": "string",              // setting/location as scene; never as status
    "primarySignal": "string",          // what the image broadcasts
    "backgroundRole": "string",         // what the environment contributes to the frame
    "eligibility": "string",            // e.g. "Halo Mint · gesture-triggered"
    "provenance": "string",             // where / when the image was made
    "markings": "string | null"         // visible objects, colours, props; never face features
  },

  /* ── Evidence board (all receipts, free + halo tier) ─────── */
  "evidence": [
    {
      "k": "string",                    // receipt label (e.g. "Gesture Lock")
      "read": "string",                 // artifact-only; passes Artifact Test + HUMAN_READ_LINE
      "free": true                      // true = visible on Free front; false = Halo-only
    }
    /* ...up to ~6 receipts per scan; no fixed ceiling, but signal > volume */
  ],

  /* ── Stat notes (supporting rationale per visible stat) ───── */
  "statNotes": {
    /* One entry per stat rendered in Free or Halo tier.
       Only image-evidence claims; no person reads. */
    "presence":      { "evidence": "string", "note": "string | undefined" },
    "frame":         { "evidence": "string", "note": "string | undefined" },
    "signal":        { "evidence": "string", "note": "string | undefined" },
    "visualImpact":  { "evidence": "string", "note": "string | undefined" },
    /* Halo-depth stats — only present when the scan warrants them: */
    "charge":        { "evidence": "string", "note": "string | undefined" },
    "loreDensity":   { "evidence": "string", "note": "string | undefined" },
    "fitCoherence":  { "evidence": "string", "note": "string | undefined" },
    "gestureGeometry":{ "evidence": "string","note": "string | undefined" },
    "settingGravity":{ "evidence": "string", "note": "string | undefined" },
    "artifactCoherence": { "evidence": "string", "note": "string | undefined" }
  },

  /* ── Hidden / conditional stat (sealed on Free; opened by Halo) ── */
  "hidden": {
    "name": "string",                   // stat name; drawn from CARD_SYSTEM_V1 §2 Halo list
    "value": 0,                         // 0–100 integer; confidence-shrunk per SCAN_ENGINE_SPEC
    "read": "string",                   // artifact-only read of why this stat activates here
    "tease": "string"                   // qualitative sealed-back hint shown on Free (no value, no count)
  },

  /* ── Mint record (artifact production record — not a payment object) ── */
  "mint": {
    "trigger1": "string",               // visible image cue that triggered the Halo read
    "trigger2": "string",               // second trigger (required; artifact-only)
    "family": "string",                 // e.g. "Halo Mint · Gesture Class"
    "note": "string",                   // dry-cinematic one-liner about the minting moment
    "serial": "string"                  // mint serial, e.g. "BR-SRC01-HM-0007"
  },

  /* ── Oracle (fictional artifact language — clearly flagged mythic flavour) ── */
  "oracle": {
    "full": "string",                   // full oracle line; fictional / archival voice only;
                                        // NEVER a claim about the person
    "short": "string",                  // one-liner teaser; used on the Free card edge (atmosphere)
    "timeline": "string"                // variant futures as other *cards*, never better selves
  },

  /* ── The 7 production-note modules (HALO_GATE_BOUNDARY_V1 §D) ─── */
  "modules": {

    /* 01 — The Read */
    "theRead": {
      "body": "string"
      /* What the frame is doing. Principal artifact read: composition,
         gesture geometry, light, setting contribution. One to three sentences.
         Must pass the Artifact Test. Deadpan-archival voice (CARD_SYSTEM_V1 §7).
         BANNED: self-improvement / confidence / attractiveness / person-truth reads. */
    },

    /* 02 — Strongest Lever */
    "strongestLever": {
      "lever": "string",                // name of the lever (e.g. "Raised palm")
      "why": "string"                   // why this one choice carries the card; image-only
    },

    /* 03 — Three Active Levers */
    "activeLevers": [
      {
        "lever": "string",              // e.g. "Light", "Crop", "Distance", "Gesture", "Setting"
        "read": "string"                // what this lever is doing in the frame
      }
      /* Nominal 3 entries — fewer allowed if evidence is thin; never inflate
         to fill the count (the §4.6 inflate-never rule is authoritative). */
    ],

    /* 04 — Keep This */
    "keepThis": {
      "element": "string",              // the frame element to preserve
      "why": "string"                   // image-artifact reason; never "it makes you look good"
    },

    /* 05 — Two Variant Routes */
    "variantRoutes": [
      {
        "label": "string",              // e.g. "Route A — The Open Field"
        "setup": "string",              // camera / framing / lighting setup for this variant
        "becomes": "string"             // what *card* this would become — another card, not better you
      }
      /* Exactly 2 entries. Language law: variants are "another card", never
         "a better version of you" / "a fixed you" / "what you could be."
         (HALO_GATE_BOUNDARY_V1 §D framing law.) */
    ],

    /* 06 — One Reduce */
    "oneReduce": {
      "element": "string",              // the frame element the scan identifies as droppable
      "effect": "string"                // what the frame would gain; image-artifact framing only
    },

    /* 07 — Next Pull Setup */
    "nextPullSetup": {
      "direction": "string",            // camera direction (angle, distance, light, setting cues)
      "intent": "string"                // what the next scan would develop differently
      /* This reads camera choices, not the person's presence.
         Banned: "you should look more X", "improve your posture/confidence." */
    }
  },

  /* ── Safety flags (ALL must be false to display) ─────────── */
  "safetyFlags": {
    "containsSensitiveInference": false,
    "containsHumanWorthScoring": false,
    "containsAttractivenessScoring": false,
    "containsBiologyRating": false,
    "containsPersonTruthClaim": false   // "you are…" / "this proves…" / identity claim
  }
}
```

---

## 3. Free / Halo reveal model (what lives where)

This table extends `SCAN_ENGINE_CONTRACT.md` §7 with the dossier module layer.

| Surface | May show | May NOT show |
|---|---|---|
| **Free front** | 4 visible stats (Presence / Frame / Signal / Visual Impact) with tier bands · 2–3 receipts · artifact title · archetype teaser · short oracle (`oracle.short`) · sealed-back hint (qualitative; no counts, no module names) | Hidden stat value · any module body · evidence board (Halo tier) · mint record · oracle full · variant routes |
| **Halo Gate (pre-unlock)** | Qualitative sealed-back language (`HALO_GATE_BOUNDARY_V1` §C/§E) · "a dossier is written for this scan" atmosphere | Exact module count · preview of any module body · hidden stat name or value · the word "locked" as pressure · any manipulation pattern (§C forbidden list) |
| **Halo Dossier (post-unlock)** | All 7 modules · full evidence board · all 10 stats · hidden stat (name + value + read) · mint record · oracle full · variant routes (framed as other cards) | Person-truth claims · attractiveness / biology / identity inference · "better you" / "fixed you" framing · exact counts as pre-unlock pressure (irrelevant here — post-unlock is permitted) |

---

## 4. Safety rules (LOCKED-grade; may not be relaxed)

These inherit from `HALO_GATE_BOUNDARY_V1` §D, `CARD_SYSTEM_V1` §1, and
`HUMAN_READ_LINE_V1`. A renderer, validator, or prompt building from this
schema must enforce every rule without exception.

**4.1 Framing law (LOCKED)**
Every module reads the **image / frame / artifact**. The grammatical subject
is always the photo, the frame, the composition, the gesture geometry, the
light — never the person. Run the Artifact Test on every sentence.

**4.2 Variant language law (LOCKED)**
A variant route is always "another card" or "a different scan." It is never
"a better you," "a corrected version," or "what you would look like if…"
The word "better" applied to the person is banned in all module text.

**4.3 Next Pull law (LOCKED)**
`nextPullSetup` reads camera choices only. Banned directions: any instruction
that reads the person rather than the frame ("stand differently," "look more
relaxed," "project more confidence," "fix your posture").

**4.4 Exact-count pre-unlock ban (LOCKED — inherited from §B)**
Module counts, lever counts, and receipt counts may appear freely **inside**
the opened dossier. They are banned on the Free front and the Halo Gate
(pre-unlock) per `HALO_GATE_BOUNDARY_V1` §B/§C. This schema governs the
post-unlock shape; the pre-unlock ban is not this schema's job to enforce,
but renderers must not leak module counts to the pre-unlock surface.

**4.5 Oracle safety (LOCKED)**
`oracle.full` and `oracle.short` are fictional / archival artifact language.
They are clearly mythic flavour — never a claim about the person. Banned:
personality reads, destiny claims, "this says something about who you are,"
any identity or psychological inference dressed as poetic language.

**4.6 Inflate-never rule**
If fewer than 3 levers are confidently evidenced, `activeLevers` contains
fewer than 3. If fewer than 2 variant routes are supported by image evidence,
`variantRoutes` contains fewer than 2. Never inflate to fill the schema
count. Receipts follow the same rule (SCAN_ENGINE_CONTRACT §6).

**4.7 safetyFlags gate**
All five `safetyFlags` values must be `false` to render the dossier.
A future validator (`scan-contract.js` extension) must block any dossier
object where a flag is `true`. A blocked dossier shows a safe failure state
(factual, short, non-moralising) — never partial or fake module content.

---

## 5. Tone + voice (from CARD_SYSTEM_V1 §7)

Sharp · cinematic · slightly mythic · collectible-card language ·
forensic-art-critic energy. Not therapy, not astrology, not cruel, not
saccharine. Deadpan: stated as fact, never flagged as a joke. Lightly
roasty only toward the **image or artifact**, never the person.

Key patterns for module copy:

- "The [element] does most of the speaking."
- "The [light / crop / setting] is handled like a tool, not an accident."
- "The frame routes toward [archetype note]."
- "The mismatch becomes the record."
- "Filed [context note]."
- "The [element] is the whole argument."

Banned patterns (from CARD_SYSTEM_V1 §7 banned list): "You are [trait]" ·
"This proves [psychology]" · "This shows confidence" · "A born [X]" ·
any second-person identity claim in any module.

---

## 6. Relationship to current data.js fixtures

The sample `SOURCES[n].dossier` shape in `data.js` is the **predecessor**
to this schema. It already satisfies most of the structure above (record ·
evidence · statNotes · hidden · mint · oracle). The 7 production-note
modules (`modules.*`) are **new** — they do not yet exist in the fixtures.

Migration plan (out of scope for this schema task; logged in TASK_QUEUE):
- Add the 7 `modules.*` fields to both sample-fixture dossier objects
  (`data.js`).
- Extend `scan-contract.js` `validateUploadedScanResult` to cover the
  `halo_dossier` kind (or a new `validateHaloDossier` export).
- Build the dossier renderer against this schema (separate coding task).

The current runtime is **unchanged** by this spec. `data.js`, `app.js`,
and `styles.css` are untouched.

---

## 7. Connections to other active specs

| Spec | How this schema connects |
|---|---|
| `HALO_GATE_BOUNDARY_V1` | Inherits framing law (§D) and all boundary rules (§B/§C) without relaxation |
| `SCAN_ENGINE_CONTRACT.md` | Extends `ScanResultUploaded v1` — `haloDossier` reading lives in `readings.haloDossier`; this schema defines the full opened dossier object |
| `CARD_SYSTEM_V1.md` | Stat names, the Artifact Test, receipt rules, tone, and forbidden language all govern module copy |
| `CARD_LOGIC_V1.md` | Tier bands (no public 0–100), sealed-stat logic, archetype triggers — apply to any stat shown in the dossier |
| `HUMAN_READ_LINE_V1.md` | 3-gate check (re-authorable cue · grammatical subject is the photo · connotation-strip) applies to every module sentence |
| `COPY_SYSTEM.md` | Full banned-lexicon applies to all module text; voice register is archival / deadpan |
| `data.js` SOURCES | Extends the existing `dossier.*` shape; migration of the 7 new `modules.*` fields is a separate task |

---

**Authority note:** §4 safety rules (4.1 through 4.7) are LOCKED-grade and
may not be relaxed by any downstream Halo build or fixture task. The exact
wording of module copy may evolve; the *image-only / Artifact-Test / no-
person-truth / inflate-never* rules may not.
