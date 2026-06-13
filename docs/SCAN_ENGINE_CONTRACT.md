# BLUE ROOM — Scan Engine Contract v1

Layer: ACTIVE SPECS · Status: ACTIVE · Session BR-S018 (2026-06-13)

Scope: the allowed **output shape and safety boundaries** for a future
engine that develops an **uploaded** photo into a card/report.

> **Documentation only.** No engine, AI, backend, upload, payment, or
> generated analysis exists or is added by this contract. The local draft
> still produces no stats; "Develop scan" still only opens the sealed,
> engine-offline gate. This file says what a future engine *would be
> allowed* to emit — and what it may never emit.

Builds on (these win where wording differs): `SCAN_ROUTING_SPEC` (gate +
routes), `SCAN_ENGINE_SPEC` (lenses, stats, confidence, receipts),
`ARCHETYPE_LIBRARY` (titles), `COPY_SYSTEM` (banned words, tone),
`DESIGN_TOKENS` / `PERFORMANCE_BUDGET` (render + cost). Core law:
`PROJECT_OS` §1/§4 — *no face-rating, ever.*

---

## 1. Purpose

Define what a future scan engine may produce from an **uploaded** photo,
so that the day an engine is connected it has a fixed target: a validated
result shape, a closed list of allowed lenses, and hard red lines. The
contract exists *before* the engine so the engine can never define its own
boundaries.

## 2. Non-negotiable boundaries (red lines)

The engine reads the photo **as an artifact**. It comments only on the
image. It must NEVER:

- rate the person, or score human **worth / value / rank**;
- score **beauty / attractiveness / hotness / desirability**;
- infer **race, ethnicity, gender, age, health, disability, body type,
  sexuality, religion, social class, criminality**, or **personality
  disorders**;
- claim **truth about the person** ("you are…", "this proves…");
- use **biology / genetics** scoring or **masculinity/femininity** scores;
- use **fake psychology** (diagnosis, trauma reads, IQ, "energy frequency");
- use **alpha/beta** or any social-hierarchy ranking.

It may ONLY comment on **visible image signals**: composition, framing,
crop, subject placement, posture/pose, gesture geometry, styling, props,
setting/environment, lighting/color/contrast, visual tension, **presence
as an image effect**, and **lore density as an image effect**. Expression
is read **only as visible expression**, never as psychological truth.

(Full banned lexicon: `COPY_SYSTEM` §3. Banned receipt verbs:
`SCAN_ENGINE_SPEC` "Receipts". Banned build directions: `research/SPINE`
§17 — RESEARCH, informational.)

## 3. Result lifecycle

```
local_draft ──Develop scan──▶ gate_offline ──(future engine)──▶ scan_pending_future
                                                                    │
                                                   ┌────────────────┴───────────────┐
                                          scan_complete_future            scan_failed_future
```

| State | Meaning | Status today |
| --- | --- | --- |
| `local_draft` | browser-local image staged, unscanned | **ACTIVE** — app: `view="draft"`, `draftGate=false` |
| `gate_offline` | sealed development gate, engine not connected | **ACTIVE** — app: `view="draft"`, `draftGate=true` |
| `scan_pending_future` | accepted artifact being developed | placeholder — **not implemented** |
| `scan_complete_future` | a validated `ScanResultUploaded` exists | placeholder — **not implemented** |
| `scan_failed_future` | gate-rejected / engine-failed / validator-blocked → **safe failure state, never fake output** | placeholder — **not implemented** |

Today the chain stops at `gate_offline`. The three `*_future` states are
documentation placeholders, not runtime behavior.

## 4. Future `ScanResultUploaded v1` shape (documentation only)

A **separate object kind** from the sample fixtures. It reuses ScanResult
v2 conventions (`data.js` → `toScanResultV2`) — same stat keys, same
receipt fields, same confidence model — but is never mixed with them
(see §10). Stats are 0–100 integers.

```jsonc
{
  "kind": "uploaded_scan_result",          // distinct from sample SCAN_RESULTS_V2
  "schemaVersion": "uploaded-v1",
  "source": {
    "mode": "local_browser_draft",         // only mode in v1
    "fileLabel": "Local image",            // display label, never the raw filename as a title
    "fileType": "PNG",
    "fileSize": "1.0 MB"
  },
  "gate": {                                 // SCAN_ROUTING_SPEC
    "scanStatus": "accepted",              // accepted | limited | rejected
    "route": "HUMAN_SOLO",                 // one of the 9 routes
    "limitedReason": null
  },
  "status": "scan_complete_future",         // §3 lifecycle
  "confidence": { "overall": 0.0, "band": "low" },   // 0..1 + low|medium|high
  "artifact": {
    "title": "string",                     // photo-role title, evidence-backed (ARCHETYPE_LIBRARY)
    "archetypeClass": "The …",             // COPY_SYSTEM §4 class
    "rarity": "free",                      // "free" | "halo"
    "editionLabel": "First Print",
    "generatedAt": "ISO-8601 string"
  },
  "stats": {
    "freeVisible": { "presence": 0, "frame": 0, "signal": 0, "charge": 0 },
    "haloExtended": {
      "loreDensity":  { "value": 0, "label": "string" },
      "fitCoherence": { "value": 0, "label": "string" },
      "stanceRead":   { "value": 0, "label": "string" },          // visible pose/gesture structure
      "visualImpact": { "value": 0, "label": "string",
                        "derived": true,
                        "derivedFrom": ["charge", "presence", "frame", "rarity"] },
      "gestureAuthority": { "present": false, "conditional": true } // only when gesture evidence is visible
    }
  },
  "evidenceBoard": [                         // v2 receipt shape + explicit lens
    { "lens": "Frame",
      "cue": "subject centered against wide field",
      "effect": "Frame +8",
      "basis": "composition / negative space",
      "confidence": "high" }
  ],
  "readings": {
    "freeSummary": "one line, preview-sized",
    "haloDossier": "developed read — develops Free, never contradicts it",
    "oracle": "string | null"              // Halo only; fictional artifact language
  },
  "mintRecord": {                            // Halo only; record of the generated card/report
    "mintSerial": "BR-UP-…",                // NOT a blockchain / payment object
    "material": "string",
    "treatmentFamily": "string"
  },
  "safetyFlags": {                           // ALL must be false to display (see §8)
    "containsSensitiveInference": false,
    "containsHumanWorthScoring": false,
    "containsAttractivenessScoring": false,
    "containsBiologyRating": false
  },
  "warnings": []
}
```

This object must **not** be added to `data.js`, `SOURCES`, or
`SCAN_RESULTS_V2` as a fixture. It is a shape, not sample content.

Confidence shrinkage (from `SCAN_ENGINE_SPEC`) still applies to every
score: `displayed = 50 + confidence * (raw − 50)` — uncertain scans move
toward neutral; missing evidence reduces confidence, it never punishes the
photo.

## 5. Allowed vs forbidden lenses & scoring language

Stats are **presentation scores of the image artifact, not the person.**

**Allowed lenses** (the 7-lens engine, `SCAN_ENGINE_SPEC`): Frame ·
Gesture (geometry only) · Signal · Charge · Lore · Coherence · Rarity
(*Rarity never means attractiveness*).

**Allowed stats / language:** Presence (screen presence / image impact) ·
Frame (composition/framing) · Signal (styling / visual coherence /
context signal) · Charge (tension/energy in the image) · Lore Density
(amount of visible story) · Visual Impact (immediate screenshot force,
derived) · Fit Coherence (styling↔setting alignment) · Stance Read
(visible pose/gesture structure).

**Forbidden, always:** attractiveness / facial-beauty score ·
masculinity/femininity score · race/ethnicity guess · age guess ·
health/fitness/body scoring · mental-health/personality diagnosis ·
social-class ranking · alpha/beta hierarchy · any "worth / value / rank"
of a human.

## 6. Evidence & receipts

Every score the engine displays must carry receipts, and every receipt
must point to a **visible image cue only**: composition · camera angle ·
subject placement · gesture/pose/posture · clothing/styling as visible
design · environment/background · lighting/color/contrast · expression
**as visible expression only**.

A receipt must never reference: identity inference · protected traits ·
real-personality claims · life-status claims · "you are this kind of
person." Allowed verbs: *registered · detected · reads as · evidence
suggests · routes toward · adds pressure to · reduces clarity in*. No
score without a receipt; no receipt without a visible cue.

## 7. Free vs Halo reveal model

| Free Pull may reveal | Halo Mint may additionally reveal |
| --- | --- |
| image preview | extended stats (lore/impact/fit/stance) |
| 4 visible stats (Presence/Frame/Signal/Charge) | deeper evidence board (full receipts) |
| short artifact summary | dossier rhythm (full record) |
| 1–3 limited receipts | oracle text — **fictional/artifact language only** |
| a **sealed** hidden stat (name only) | the hidden/conditional stat revealed |
| route label | mint record — **for the generated card/report only** |

Halo **develops** Free; it must never **contradict** a visible fact Free
established (`SCAN_ENGINE_SPEC`, `research/SPINE` §1). Halo must **not**
reveal: sensitive inference · attractiveness score · biology rating ·
human-worth ranking · fake diagnosis. (Aligns with `PROJECT_OS` §10
visibility table.)

## 8. Engine connection requirements (gate before connect)

Before any future engine may be wired in:

1. **This contract must exist** (it now does) and be ACTIVE.
2. Engine output must **validate against the `uploaded-v1` schema**; an
   off-schema field is a blocked result, not a displayed one.
3. **Unsafe fields are blocked**: if any `safetyFlags.*` is true, or any
   forbidden lens/word (§2/§5) appears, the result is rejected and a safe
   failure state is shown — never partial fake output.
4. A `local_draft` may be **promoted only** when `status ===
   "scan_complete_future"` and all `safetyFlags` are false.
5. A failed/blocked/rejected scan shows a **safe failure state**
   (factual, short, non-moralizing — `SCAN_ROUTING_SPEC` reject/limited
   copy), not a fabricated card.
6. **Sample ScanResult v2 stays separate** from uploaded results (§10).

The first step toward (2)/(3) is a **non-AI validator stub** — see
TASK_QUEUE "Scan Contract Validator Stub v1". It checks shape + safety
only; it generates nothing.

## 9. Current implementation status

The current app has exactly:

- a browser-local **Local Draft** (intake) and a sealed **Gate Offline**;
- **no** scan engine, **no** uploaded-photo `ScanResult`, **no** AI, **no**
  backend, **no** payment, **no** generated/fake results.

This contract changes **no runtime behavior**. It is the boundary the next
steps must satisfy.

## 10. Separation from the sample ScanResult v2 (explicit)

The two never mix:

- **Sample** scans (`SOURCES` + `SCAN_RESULTS_V2` in `data.js`) drive the
  demo scan room (SRC-01 / SRC-02, Free/Halo, dossier). Fixed fixtures.
- **Uploaded** scans (this contract, `kind: "uploaded_scan_result"`) are a
  future, separate object built from a user's local image.

An uploaded result is never inserted into `SOURCES`/`SCAN_RESULTS_V2`, and
the sample room never reads an uploaded result. `getActiveScan()` /
`getScanResult()` remain sample-only.
