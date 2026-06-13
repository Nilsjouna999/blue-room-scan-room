# BLUE ROOM — Free Pull Screenshot Layout Spec v1

Layer: ACTIVE SPECS · Status: ACTIVE · Session BR-S026 (2026-06-13)

Defines the **front of the Free Pull card** — the screenshot-worthy artifact
plate — before any Halo Gate runtime is mocked. Builds on `CARD_SYSTEM_V1`
§2/§6 (4 Free-front stats, Free output), `CARD_LOGIC_V1` §2/§3/§7/§9 (tier
bands, receipt grounding, sealed stat, Reframe Map), and
`HALO_GATE_UPGRADE_LAYUP_V1` §2 (Free is complete; Halo is the sealed back).
Safety law inherits from `PROJECT_OS` §1/§4 and `CARD_LOGIC_V1` §1/§5;
nothing here relaxes it.

> **Docs only — no runtime change.** No AI · no backend · no upload analysis
> · no payment/checkout · no Halo unlock · no runtime mock · no fake stats
> for real uploaded user photos. The mock it specifies is the *next* task
> (*Free Pull Layout Mock v1*), not this one.

**Core law:** BLUE ROOM reads the photo, not the person.
**Artifact Test:** if a *different photo of the same person* could change a
score, it is an artifact signal (keep). If the score sticks to the person
regardless of the photo, it is banned.

## 1. Purpose

This document defines the **front of the Free Pull card** so it reads as a
complete, collectible, screenshot-worthy artifact — not a report page and
not a teaser. It is the spec a coding agent renders in *Free Pull Layout
Mock v1*. A mock must never be built before the spec it renders; a back
(Halo Gate) must never be mocked before the front exists. **This front is
specified first, on purpose.**

## 2. Product role

- **Free Pull is the card front.** Not a teaser-only result — the user
  already holds a complete artifact.
- **Halo opens the sealed back / dossier** of that *same* card
  (`HALO_GATE_UPGRADE_LAYUP_V1` §2). Halo is not a better score, not a
  reroll, not a gamble, not "unlocking your true self."
- The Free Pull front must feel finished on its own. The sealed back is
  *more depth on the same card*, never the part that makes Free worth having.

## 3. Layout anatomy — Split Artifact / Stat Board

**One landscape card object, PC-first.** Left ~48% is the artifact plate
(the image is the card); right ~52% is the stat board. The image dominates.

```
┌──────────────────────────────┬──────────────────────────────────┐
│ LEFT ~48%  ARTIFACT PLATE     │ RIGHT ~52%  STAT BOARD            │
│                               │                                  │
│  ┌────────────────────────┐   │  Archetype teaser  (one line)    │
│  │                        │   │  ──────────────────────────────  │
│  │  uploaded image        │   │  Presence       ▰▰▰▱▱  STRONG     │
│  │  near-fullbleed        │   │  Frame          ▰▰▰▰▱  SHARP      │
│  │                        │   │  Signal         ▰▰▱▱▱  SET        │
│  └────────────────────────┘   │  Visual Impact  ▰▰▰▰▰  DOMINANT   │
│  ARTIFACT TITLE               │                                  │
│  ▫ print badge · serial ·     │  [cue → effect]  [cue → effect]  │
│    FREE PULL                  │                                  │
│                               │  ┌─ SEALED ───────────────────┐  │
│                               │  │ 01 Sealed Stat  ◌ name+why │  │
│                               │  │ 02 Reframe Map  ◌ shape    │  │
│                               │  └────────────────────────────┘  │
│                               │  scope line (quiet)              │
│                               │  ── Halo seal edge ──            │
└──────────────────────────────┴──────────────────────────────────┘
```

**Left side (~48%) — artifact plate**
- uploaded image / artifact, near-fullbleed (the image *is* the card).
- artifact **title**, over the image or directly under it.
- tiny **print badge / serial / Free Pull mark** (small, archival, quiet).

**Right side (~52%) — stat board**
- **archetype teaser** — one short line (a *photo role*, never a person claim).
- **4 public stats as tier bars** (no numbers): **Presence · Frame · Signal
  · Visual Impact**, each a short label + a tier band + a small segmented bar.
- **2 grounded receipt chips** (an optional 3rd only if very short): each is
  `observed cue → artifact effect`.
- **sealed vault** (one zone): `01 Sealed Stat` · `02 Reframe Map`.
- **quiet scope line** (present, not loud).
- **calm Halo seal / tease line** — part of the artifact edge, not a button stack.

## 4. Screenshot rules

One screenshot of the Free Pull must show **all of**: the image · the
archetype teaser · the 4 tier-band stats · 2 grounded receipt chips · the
sealed-vault shape · the quiet scope line · the Halo seal edge. If any of
these is missing, the front is incomplete. Nothing on the front requires a
scroll, a hover, or a second screen.

## 5. Content budget (hard limits)

- **No paragraphs on the front.** No explanatory essay on the card.
- **Receipt chips: max 2, optional 3rd only if very short.**
- **Stat labels: short** (one or two words).
- **Vault rows: short** (a label + a one-line reason/shape — no contents).
- **CTA / support line: short** (one calm line, not a SaaS stack).
- The card front is a *plate*, not a document. When in doubt, cut.

## 6. Receipt chip grammar

Format: **`observed cue → artifact effect`** (two layers, `CARD_LOGIC_V1`
§3: no Tier-2 effect without a Tier-1 visible cue). Each chip points at one
locatable cue.

**Good:**
- Low horizon → subject mass feels heavier
- Cold palette → cleaner archive read
- Off-center crop → stronger motion pull
- Background clutter → frame pressure rises
- Hard side light → sharper edge read
- Empty upper frame → more quiet tension

**Banned** (fails the Artifact Test / `CARD_LOGIC_V1` §1):
- you look confident · attractive · masculine / feminine · high value ·
  alpha · personality diagnosis · body/face claims · age/race/gender/health
  guesses.

## 7. Tier-band grammar

Public stats display as **tier bands**, never raw 0–100 numbers
(`CARD_LOGIC_V1` §2). This spec recommends a **screenshot-facing** five-band
ladder, low → high:

> **Quiet · Set · Strong · Sharp · Dominant**

**Why this set:** the words are visual / artifact-based (a frame is *set*,
an edge is *sharp*, an element is *dominant in the composition*) — not
school grades (A/B/C), not human-worth ranks. Each band describes the
**image element**, never the human. "Dominant" = the element commands the
*frame*; it never implies social/physical dominance, alpha, or a person's
rank (guard carried from `CARD_LOGIC_V1` §2). **No raw 0–100 public
numbers** on the front, ever.

> **⚠ Reconciliation required — do not silently contradict.**
> `CARD_LOGIC_V1` §2 currently defines the public bands as
> **QUIET / PRESENT / STRONG / DOMINANT / TOTAL** (with DOMINANT 4th of 5,
> TOTAL highest). This spec's screenshot-facing set differs (PRESENT→Set,
> TOTAL→Sharp, and Dominant promoted to top). **This spec does not
> unilaterally override §2.** The two band vocabularies MUST be reconciled,
> and the single authoritative public ladder ratified, in
> *Sample Room Tier Migration v1* (or a dedicated tier-band reconcile)
> before any runtime renders bands. Until then, treat this set as the
> *recommended* front vocabulary pending that reconcile.

## 8. Sealed vault grammar

One sealed zone holds two rows (shape only, no contents):

- **01 Sealed Stat** — the hidden Free stat shown as **name + a structural
  reason**, with **no tier and no value** (`CARD_LOGIC_V1` §7,
  `HALO_GATE_UPGRADE_LAYUP_V1` §6). Reason is structural, e.g. *"reads the
  other stats against each other"* — never "see your real score."
- **02 Reframe Map** — **shape / count only** (e.g. "image levers · target
  variants · setup card sealed"). The Reframe Map **never expands on Free**.

The vault must **not** reveal: the sealed-stat tier · the Reframe levers ·
the target variants · the setup-card contents · any "how to improve
yourself" language. It proves the back has *shape* (honest counts), never
its contents (`HALO_GATE_UPGRADE_LAYUP_V1` §5/§7).

## 9. Halo edge / seal line

The Halo tease is part of the **artifact edge** — a calm seal mark on the
card, not a SaaS paywall / button stack. It says the card has a sealed back;
it does not sell a better card.

**Acceptable:** "This card has a sealed back." · "Halo dossier sealed." ·
"The map exists; contents sealed." · "Open the back later." · "Dossier back
sealed."
**Avoid:** "upgrade now" · "unlock your potential" · "get your real score" ·
"premium insights" · "limited time" · "almost rare" · "try again."
(Full dark-pattern ban: `HALO_GATE_UPGRADE_LAYUP_V1` §12.)

## 10. Scope line

Quiet but always present:

> "This reads the image artifact — frame, light, styling, setting, gesture —
> not the person."

## 11. Visual feel

**Should feel:** a collectible card · screenshot-worthy · an artifact /
front plate · premium but readable · a *complete* Free Pull · with a sealed
edge mystery · less document-like.

**Should not feel:** a dashboard · a report page · a SaaS pricing block · a
personality quiz · a face-rating app · a gambling card pack · a
self-improvement score sheet.

(Honors `DESIGN_TOKENS`: the card is the artifact with object-depth; the
stat board reads as a quiet plate, accent spent only where it earns.)

## 12. Anti-goals (reject)

face-rating · beauty / person score · body/face feature scoring · fake
psychology · status / person ranking · a giant report panel · 0–100 public
numbers · loot / packs / chance language · "unlock your true self" · "real
score" · "almost rare" · "improve yourself" · "better version of you."

## 13. Future runtime acceptance criteria — *Free Pull Layout Mock v1*

The future mock must pass:

- At **1600×900 and 1920×1080**, the card reads as **one landscape artifact**.
- The user can **screenshot the Free Pull and it feels complete**.
- The **image dominates the left side**.
- The **stat board is readable without becoming a report**.
- The **sealed vault is visible but not dominant**.
- The **Reframe Map has visible shape but no contents**.
- The **Halo edge feels like a sealed artifact back, not a SaaS upsell**.
- **No fake stats** appear in the normal uploaded-photo flow.
- Dev simulation stays clearly marked **DEV / NOT REAL ANALYSIS / NOT USER
  SCAN**.
- Normal **Local Draft → Develop Scan** still shows the sealed
  engine-offline gate (no analysis generated).

## 14. Downstream tasks & corrected roadmap

**Roadmap correction (do this in TASK_QUEUE):** the Halo Gate is the *sealed
back*; the Free Pull *front* must be specified, then mocked, before the back
is mocked. Corrected order:

1. **Free Pull Screenshot Layout Spec v1** — this doc.
2. **Free Pull Layout Mock v1** — render this front (dev-only, no payment).
3. **Sample Room Tier Migration v1** — reconcile the legacy sample-room
   numeric display (`PROJECT_OS` §7/§9 still shows **Presence/Frame/Signal/
   Charge** as 0–100 numbers) into the public tier-band system, and reconcile
   the §7 band-name divergence above into one authoritative ladder. This spec
   prefers **Visual Impact** as the screenshot-facing fourth stat
   (`CARD_SYSTEM_V1` §2 moves Charge to Halo-depth) — the migration owns that
   swap.
4. **Halo Gate Dev Mock v1** — only after the front exists and migrates.

---

**Authority note:** §2 (product role), §5 (content budget), §6 (receipt
grammar), §8 (sealed vault grammar), §9/§12 (Halo edge / anti-goals) inherit
LOCKED-grade safety from `PROJECT_OS` §1/§4 and `CARD_LOGIC_V1` §1/§5 and may
not be relaxed downstream. The §7 tier-band set is a *recommendation* pending
the reconcile named in §14.3 — it does not override `CARD_LOGIC_V1` §2 until
that task ratifies one ladder.
