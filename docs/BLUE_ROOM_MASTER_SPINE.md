# BLUE ROOM — Master Spine (sharpened, post BR-S092)

> **STRATEGIC SOURCE-OF-TRUTH (RATIFIED 2026-06-21).** Saved from chat after BR-S092 so the
> sharpened spine is durable in GitHub, not only living in conversation. It **supersedes the prior
> master extract** (a chat-only artifact — no prior master document existed in the repo).
>
> **Authority note:** this master *consolidates* the locked/active laws; it does **not** silently
> override them. Where it touches a previously LOCKED relationship — see §2 (the Dependency law
> refines the older "Develop = the sealed back of the *same* card the user already holds" / Free-first
> assumption in `COMMERCIAL_SPEC_V1` §2/§5 + `halo/HALO_GATE_BOUNDARY_V1` §A) — that refinement is
> recorded in `docs/DECISION_LOG.md` (2026-06-21). The anti-paywall laws are UNCHANGED: Paid is the
> card *developed deeper*, never a better card / higher score / pay-to-reveal hidden worth (§2(c) +
> §3 enforce this). The exact lawful **Paid-only entry flow** is an OPEN delta for BR-S093, not
> re-derived here.
>
> **Read me before** BR-S093 (no-code), the cheap_extract test bench, or any scan-engine work.

---

## Source of truth (verify before any work)

- **Repo:** `C:\Users\nilsj\OneDrive\Documents\blue-room-scan-room`
- **GitHub:** `https://github.com/Nilsjouna999/blue-room-scan-room`
- **Branch:** `main`
- **Latest pushed HEAD:** `60a5c75 — Docs: record BR-S092 local front card lane`
- **Runtime commit underneath:** `b11ccd0 — BR-S092: draft to local front card`
- No scan engine, no backend, no payment exist. Plain HTML/CSS/JS, no build step. `node` is not installed.

> Header correction (vs the chat draft): the chat draft named `b11ccd0` as latest pushed; the actual
> latest pushed HEAD is the docs commit `60a5c75`, with `b11ccd0` as the runtime commit underneath.

---

## 1. Three card states

The product spine is three **card states**. (The pre-card **Local Draft** intake — the loaded-but-unfiled
preview from BR-S092 beat one — is the staging step *before* the first card, not a card state.)

1. **Local Front Card** — *built now (BR-S092).* The user's own photo, filed in the card shell in the
   browser only. Explicitly **UNSCANNED / FRONT-ONLY**. Carries provenance + safe file/geometry facts
   only; **no reading**. It is **NOT a Free Card** — the words "Free Card" and "complete" never appear
   on it. The card back stays closed ("Card back remains closed until a scan exists.").
2. **Free Front Pull** — *engine-gated (not built).* The complete card front + reading produced by the
   real scan engine. This is the true "Free Card" — the only state where "complete" applies.
3. **Paid Full Develop** — *engine-gated (not built).* The deeper **production record** of the card
   (the developed back / dossier layer). Depth, never a better card.

---

## 2. Free / Paid relationship — three laws

1. **Dependency** — Paid does **not** require Free.
2. **Continuity** — if a prior card record exists, same-card Paid **may seed from it**.
3. **Consistency** — Paid must **not contradict** any card state already shown to the user; it may
   **deepen, complicate, or recontextualize**.

> Governance: law (1) refines the older locked assumption that Develop only ever opens the sealed back
> of a Free card the user already holds. Laws (2)+(3) preserve that case and keep the anti-paywall
> boundary intact. The concrete Paid-only entry flow (a first scan that goes straight to develop, with
> no Free surfaced) is an OPEN delta for BR-S093 — it must be designed within, not around, the
> sealed-back / "developed not better" model. See `DECISION_LOG.md` 2026-06-21.

---

## 3. Hero sentence

> **Free gives you the card. Paid develops its production record.**

---

## 4. Canonical `card_record`

The single source for future saved-card / version provenance. **Saved cards are immutable snapshots**
(no re-call, no re-roll, no re-derivation on re-view — a viewed record returns the stored snapshot).

| Field | Role |
| --- | --- |
| `card_id` | unique id for this card object (e.g. the BR-S092 `BR-LOCAL-<ts>-<rand4hex>` form) |
| `parent_card_id` | the card this one descends from (e.g. a Paid develop pointing at its Free pull) |
| `source_type` | origin of the image (e.g. `local_browser`, future uploaded source) |
| `mode` | which state produced it (local-front / free-front-pull / paid-full-develop) |
| `created_at` | creation/staging timestamp |
| `scan_id` | id of the scan that produced the front read (engine) |
| `develop_id` | id of the develop pass that produced the back/production record (engine) |
| `room_build` | the room/layout build this card was rendered under |
| `product_stage` | product-lifecycle stage of this record |
| `card_template_version` | version of the card template/shell |
| `reading_schema_version` | version of the reading/evidence schema |
| `scan_engine_version` | version of the scan engine that produced the read |
| `develop_engine_version` | version of the develop engine that produced the record |
| `model_tier` | abstract model tier used (vendor-agnostic — see §6) |
| `result_snapshot` | the immutable stored result payload |
| `finish_result` | the rolled finish/anomaly outcome (see §7; never on a Local Front Card) |
| `status` | record status |

---

## 5. Evidence contract

- **Strict schema** — the model returns structured evidence, validated against a fixed shape.
- **Structured `specificity_anchor`** — each read is anchored to a concrete, locatable visible cue
  (the specificity anchor law), not a generic statement.
- **Reason-field validation** — reason/justification fields are validated, not trusted blind.
- **No free-form "write a report" model behavior** — the engine fills a contract; it does not emit
  open prose.

---

## 6. Economics & persistence

- **No hardcoded vendor pricing** — never bake a specific vendor's API price into the product.
- **Model-tier abstractions** — reference an abstract `model_tier`, not a named vendor model.
- **Cost levers:** prompt caching, batch, and compact JSON are the cost-control mechanisms.
- **Persisted results** — results are stored.
- **No re-call or re-roll on re-view** — re-viewing a card returns the stored snapshot; it never
  re-calls the engine or re-rolls any outcome.

---

## 7. Finish / anomaly — PARKED

Parked (design-first, not implemented). When it lands:

- **Deterministic finishes** (threshold-driven, reproducible).
- **1% anomaly** rate.
- **`stat_effect: none`** — finish/anomaly never changes a stat or score.
- **Rolled once** — and never re-rolled (Develop never re-rolls; consistent with §6 immutability).
- **Never on a Local Front Card** — `finish_result` attaches only to an engine-produced card, never
  to the browser-only local front card.
- **Open question:** does an anomaly attach to a plain/Standard card, or only to a finish-earned card?

---

## 8. Salvage / recycle — PARKED

Parked **concept only**. No fuel math, no credit-loop implementation. Not a system yet.

---

## 9. Next roadmap

1. **BR-S093 (no-code)** consumes this master — *Front Pull vs Full Develop: Value Ladder + Evidence
   Contract.* It must produce only **open deltas**, not re-derive locked laws.
2. **Test bench** for the `cheap_extract` **specificity floor** on ~20 photos (find the threshold at
   which cheap extraction still clears the specificity anchor bar).
3. **Scan Engine Spine** — the real upload→card path, built against the evidence contract + this spine.

---

## Open questions (carried)

- **Anomaly attach scope** — anomaly on a plain/Standard card, or only on a finish-earned card (§7).
- **Price / margin anchor** — the exact figure + margin model (validated against a real scan; §6).
- **Specificity floor threshold** — the `cheap_extract` floor, set by the §9 test bench.
- **Paid-only entry flow** — the lawful first-scan-straight-to-Develop path implied by §2(1)
  (designed in BR-S093, within the sealed-back / "developed not better" model).

---

## Status & authority

- **RATIFIED** as the post-BR-S092 strategic spine (2026-06-21). Consolidation, not a new authority
  layer above `PROJECT_OS` / `GOVERNANCE_OS` / `DECISION_LOG` — it consumes those laws.
- Supersedes the prior (chat-only) master extract.
- BR-S093 must **consume** this master and produce only **open deltas**, never re-derive locked laws.
- Registered in `docs/FILE_MAP.md`; recorded in `docs/TASK_QUEUE.md` (Completed) and ratified in
  `docs/DECISION_LOG.md` (2026-06-21).
