# BR-S093 — Front Pull vs Full Develop: Value Ladder + Evidence Contract

> **DESIGN SPEC (no-code, RATIFIED 2026-06-21).** One coherent no-code lane. Consumes
> `docs/BLUE_ROOM_MASTER_SPINE.md` as the source of truth — it does **not** re-derive locked laws; it
> produces the **open deltas** within them. No runtime, no scan engine, no payment, no finish/anomaly,
> no Vault, no salvage. Opening checkpoint: `2c91a32` (master spine pushed).
>
> Purpose: lock *what Free is* vs *what Paid adds*, and the evidence contract both must satisfy, so the
> future engine has a buildable, law-safe split instead of an improvised one.

---

## Result Map (broad lane)

- **Intention** — Lock, in no-code, the value ladder between the Free Front Pull and the Paid Full
  Develop, plus the evidence contract both must satisfy, so the engine build has a buildable, law-safe
  contract, not an improvised split.
- **Strongest honest result** — A reader sees a Free Front Pull and feels a COMPLETE artifact card
  (front + reading); separately understands Paid develops the SAME card's *production record* (deeper
  dossier). Delta = depth/kind, never a better card / score / hidden worth. The evidence contract
  guarantees every line is anchored to a locatable visible cue with a validated reason.
- **Tensions / tradeoffs** — Free complete (locked) vs Paid worth-paying-for → delta is DEPTH not
  COMPLETION; Dependency (Paid ∌ Free) vs the locked same-card sealed-back model → need a flow that
  still reads as "this card's back"; specificity vs cost → the bench finds the cheap-extract floor;
  depth vs safety → deeper Paid = more surface to drift into person-reading, so contract/framing bind harder.
- **Law gate (re-derives NONE)** — Free COMPLETE; Paid = developed deeper (kind/depth, never grade/
  score/worth); photograph→artifact never person→verdict; no paywall language; no exact pre-unlock
  counts; no public 0–100 (bands only); immutable snapshots, no re-roll/re-call on re-view; one scan =
  one Develop, one-time per-card transparent price, no credits/packs/membership.
- **Requirements vs bets** — *Requirements:* Free complete; depth-not-grade delta; specificity_anchor on
  every line; reason-field validation; immutable snapshots; no banned copy / no person-reading; bands not
  numbers. *Bets:* exact module split; the in-room switch model; anomaly scope; price/margin number;
  specificity floor threshold (empirical); cheap_extract tier viability.
- **Failure even if code works** — Engine renders perfectly but (a) Free reads as a crippled teaser
  (paywall feel → magnetism dies); (b) Paid reads as "more text"/a better score (boundary breach); or
  (c) readings are generic, fitting any photo (the "every photo is already a card" promise collapses).
  (c) — the specificity floor — is the #1 non-code risk.
- **Minimal honest system** — Free Front Pull = card front + complete front reading from a CHEAP pass
  that clears the floor; Paid Full Develop = the SAME card's production record (deeper dossier) from a
  DEEP pass; both bound by ONE evidence contract; one price, once.
- **One test** — The specificity bench: ~20 varied photos through the cheap Free pass; a blind matcher
  must match each reading→photo above chance, and every line must carry a locatable cue. If cheap
  extraction can't clear that floor → raise Free's tier (cost↑) or shrink Free scope. Pivotal for economics.

---

## 1. Current surface inventory (SAMPLE model — sample data, NO engine)

The live room is SAMPLE-driven; Free/Paid is simulated by the `paid`/treatment flag, not a real purchase.

- **Menu** — 2 doors (Add Your Photo → local intake; View Sample Card → SRC-01 room).
- **Local Front Card** (BR-S092) — browser-only filed card, safe facts only, **no reading**. The
  buildable-now state; not a Free Card.
- **Card front** (`renderCard`) — title · archetype · photo · 4 public tier-band stats (Frame Presence /
  Frame / Signal / Scene Charge) · serial (`····`/assigned) · edition stamp.
- **Reading panel** (`renderReadingPanel`) — Scan Reading header + tagline → [developed: Oracle Read
  lead] → Stat Reading (4 bands) → [free: Aura Profile] → Scene Role → readseam fork:
  - Free = "Develop This Scan" (complete-as-is line + CTA + price line + sealed-back note)
  - Paid = Artifact Archetype + Technical Receipts + shiny tease/badge
- **Dossier (7 plates)** — 01 Source Record (filing event + Object→Scan→Card→Mint lineage, `····` free) ·
  02 Evidence Board (receipts; free 3 / paid all) · 03 Stat Dossier · 04 Hidden Stat (free sealed) ·
  05 Fit + Aura Layer · 06 Mint Record · 07 Oracle Read.

## 2. Target Free Front Pull surface (engine)

The card front + a COMPLETE front reading: 4 tier-band stats + stat reading + scene role + aura + short
oracle; receipts present but limited/qualitative; serial masked (`····`) = identity-not-value; sealed
back referenced qualitatively (NO counts). "Complete" applies HERE (never on the Local Front Card).
Produced by a **cheap extraction pass** that clears the specificity floor.

## 3. Target Paid Full Develop surface (engine)

The SAME card's **production record**: Hidden Stat revealed · full Evidence Board receipts · Fit + Aura
layer · Mint Record assigned · full Oracle · Artifact Archetype discovery note; Card + Mint serials
assigned (latent→developed). The `HALO_DOSSIER_SCHEMA_V1` 7 modules are the production-note backbone.
Depth/kind delta, never a better card/score; in-place "card developed" ceremony; persisted immutably;
from a **deeper pass** (higher `model_tier` / more tokens).

## 4. Exact Free/Paid delta (the value ladder)

| Layer | Free Front Pull | Paid Full Develop (adds) |
| --- | --- | --- |
| Stats | 4 public tier bands | + Hidden Stat revealed |
| Voice | stat reading + scene role + aura + short oracle | + full Oracle + Artifact Archetype discovery note |
| Receipts | limited / qualitative | full Evidence Board (all cue/effect/basis/confidence) |
| Fit / Aura | aura summary | Fit + Aura Layer (deep) |
| Provenance | serial masked `····` | Card + Mint serial assigned + Mint Record |
| Frame | "complete front" | "production record / sealed back developed" |

**Delta = depth of the production record, NOT completion of the verdict.**
Hero: *"Free gives you the card. Paid develops its production record."*

## 5. Same-card Paid vs fresh-paid flow — RATIFIED (in-room switch)

**Builder ruling (2026-06-21):** the Free↔Paid choice is a **user-controlled switch in the room**, not a
forced funnel. After Add Photo → Local Front Card → enter the (future engine) Card Room, the room offers
an explicit **"choose / switch what you want" control between Free Front Pull and Full Develop.**

- **Default on entry:** the **Free Front Pull** (complete + free + the magnetic hero — Free-as-hero), with
  the **Full Develop** switch visible. *(Applied default; revisable.)*
- **Free Front Pull** — free, complete, selectable anytime.
- **Full Develop (pre-purchase)** — selecting it shows the develop-**intent** gate (qualitative
  sealed-back + transparent price), NOT the paid content. Free stays complete; no pay-to-reveal pressure.
  Confirming purchase = the one-time per-card buy → the deep pass runs → developed view.
- **Post-purchase** — the card holds BOTH states; the user switches freely between the front view and the
  developed view (honest reverse — the existing "Step back" round-trip). No re-charge to switch back
  (idempotent; immutable snapshot per `card_record`).
- **"No back without a front"** — Full Develop always includes the complete front; the card always has a front.
- **Law-fit:** Dependency ✓ (can switch straight to Full Develop without doing Free first) · Continuity ✓
  (if Free was seeded, Develop deepens the same `card_record`, `parent_card_id` linked) · Consistency ✓
  (switching deepens, never contradicts) · price-at-develop-intent + complete-front/sealed-back ✓ ·
  one scan = one Develop ✓.
- **Note:** this generalizes the room's existing treatment-toggle + develop-ceremony + "Step back" reverse
  into one explicit Front Pull / Full Develop view selector over ONE card object; §4 defines what each
  view shows; the purchase gates first entry to the developed view only.

## 6. Anomaly attach-scope — OPEN (parked)

Locked: deterministic finishes · 1% anomaly · `stat_effect: none` · roll once · NEVER on a Local Front
Card. **Open Q:** anomaly on a plain/Standard engine card, or only a finish-earned card? **Lean (parked,
decide in the finish/anomaly lane):** roll once at the FIRST engine card mint (the Free Front Pull) into
`finish_result`, `stat_effect: none` — anomaly as a card-object property, independent of Paid. NOT
implemented this lane.

## 7. Price / margin anchor — EXPLICIT OPEN DELTA

Locked: one-time, per-card, transparent ~$7 provisional, no credits/packs/membership/recurring; figure
validated against real cost. Cannot responsibly set a number without per-develop cost data. **Cost model
to use:** `price = f(deep-pass cost)`, where cost = `model_tier × tokens × caching/batch levers`. The
bench (§11) yields per-develop cost → price follows with margin. ~$7 stays the provisional anchor; confirm
against bench cost. Never toward credits/packs/membership/recurring.

## 8. Specificity floor threshold / test definition

A reading **clears the floor** iff: (a) every stat/line carries a locatable visible cue
(`specificity_anchor` present + falsifiable); AND (b) a blind matcher (human or judge model) matches
reading→source photo **above chance** across the bench; AND (c) **zero generic-line violations**. The
exact target (e.g. ≥ N/20 matches + 0 generic) is set BY the bench (§11), not guessed. Pivotal gate for
cheap_extract viability.

## 9. Blocked / uncertain path

- **Blocked (needs engine, NOT this lane):** real extraction, model calls, persistence backend, payment.
- **Uncertain (empirical):** can cheap_extract clear the floor? (bench answers) → drives Free's model tier
  + cost → drives price.
- **Uncertain (builder, remaining):** anomaly scope (§6) · exact price (§7). *(The §5 flow is now resolved.)*

## 10. Evidence contract implications

Both tiers are **contracts the model fills**, not free prose. Per-line schema:
`{ lens/dimension, observation, visibleCue (= specificity_anchor), effect, confidence, reason }`. The
`reason` field is validated (not trusted). **Free = the contract at shallow depth** (fewer modules, cheap
tier); **Paid = the contract at full depth** (all dossier modules, deep tier). SAME schema, different fill
depth → guarantees Consistency (Paid deepens the same anchored cues, never contradicts Free). A line
lacking a valid anchor is **dropped (fail-closed)**, never shipped generic. `scan-contract.js` (present,
unwired) is the enforcement seam — this spec defines the schema it must check; wiring is engine-lane work.

## 11. First test-bench plan (cheap_extract specificity floor) — design now, build later

- **Inputs:** ~20 varied photos (portraits / scenes / objects / landscapes / low-info / high-info).
- **Process:** each through the cheap Free pass → produce the Free contract (stats + anchored lines).
- **Measures:** (a) anchor coverage per line (pass/fail); (b) blind match-rate reading→photo (above
  chance); (c) generic-line violations (count); (d) cost per extract (tokens × tier).
- **Verdict:** cheap tier clears the floor at acceptable cost → cheap_extract viable for Free; else raise
  tier (cost↑, recheck price) or shrink Free scope.
- **Output:** the floor threshold number + the Free model-tier decision + a per-develop cost input to
  pricing. **NOT started now** — the next lane after this spec.

---

## Open deltas carried (resolve in/after the bench lane, not now)

- **Anomaly attach-scope** (§6) — plain card vs finish-earned card.
- **Price / margin anchor** (§7) — exact figure from bench cost; provisional ~$7.
- **Specificity floor threshold** (§8/§11) — empirical, set by the bench.

## Status & next

- **RATIFIED** as the BR-S093 no-code spec (2026-06-21); consumes `BLUE_ROOM_MASTER_SPINE.md`; re-derives
  no locked law.
- **NEXT lane:** the cheap_extract specificity test bench (§11) — design→build a later lane, on explicit
  ask. **Then** the Scan Engine Spine (built against this evidence contract + the master spine). Scan
  engine / payment / finish-anomaly / Vault / salvage remain PARKED.
