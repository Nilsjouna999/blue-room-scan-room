# BLUE ROOM — Halo Gate / Upgrade Layup v1

Layer: ACTIVE SPECS · Status: ACTIVE · Session BR-S025 (2026-06-13)

Defines the **upgrade moment** — not payment. Builds on `CARD_SYSTEM_V1`
§7 (Free vs Halo reveal) and `CARD_LOGIC_V1` §7–9 (sealed stat / rarity /
Reframe Map). Safety law inherits from `PROJECT_OS` §1/§4 and
`CARD_LOGIC_V1` §1; nothing here relaxes it.

## 1. Purpose

This document designs the Halo Gate as a **sealed-dossier ritual**, not a
SaaS paywall. It fixes *when* the upgrade appears, *how* it is presented,
*what* Free previews vs Halo opens, the *price framing* (no price, no
checkout), the *decline* behavior, the *post-unlock rhythm*, and a hard
**dark-pattern ban list**. **Docs only — no payment, no checkout, no
runtime change.**

## 2. Product Law

- **Free Pull is complete.** The user already owns the Free card.
- **Halo opens the back of the same card** — it does not generate a new or
  better card. Same scan, sealed half.
- **Free shows the door exists. Halo opens what is behind it.**
- The user pays to **open the dossier of a card they already hold**, never
  to gamble on an unseen result, reroll, or chase rarity. The contents are
  already written and fixed before the seal is ever offered.
- Halo is a *different kind of depth* (the sealed back), not a higher
  outcome. Declining never downgrades the Free card.

## 3. Upgrade Timing

The Halo Gate appears **only after the Free Pull has fully landed** — after
the public stat tiers, grounded receipts, and scope line are shown, and the
sealed-stat label and Reframe-Map envelope are visible. **Never before the
user has received the Free Pull.**

It must **NOT** appear: before upload/intake · during Local Draft · during
the sealed engine-offline gate · as a modal that interrupts before the Free
result · as a pop-up that covers the card before the user owns the Free
Pull · repeatedly after a decline.

The gate is a section **below / behind the Free card**, reached by intent —
never an interrupt.

## 4. Halo Gate Layout

A **chamber / card-back / sealed plate**, not a modal.

```
Header:   HALO DOSSIER SEALED
Subhead:  This card has a sealed back.

Sealed objects (envelope rows, each shows SHAPE not contents):
  · Sealed stat envelope      — name + structural reason, no tier
  · Reframe Map envelope      — "3 image levers · 2 target variants · setup card sealed"
  · Evidence board preview    — "6 receipts found"
  · Oracle record preview     — sealed label
  · Mint record preview       — sealed label

CTA:      Open Halo Dossier
Support:  One scan. One dossier. No subscription. No packs.
Decline:  Keep Free Pull
```

**Must feel like:** opening a sealed artifact · flipping the card over ·
entering a deeper room · developing the full print.
**Must not feel like:** a premium pop-up · a casino chest / loot box · an
urgency timer · a SaaS upgrade modal · "pay to see your real score."

## 5. Free Preview vs Halo Content

| Free previews (shape only) | Halo opens (contents) |
| --- | --- |
| sealed-stat **name** + structural reason teaser (no tier) | sealed-stat tier + full reason |
| Reframe Map **shape**: "3 image levers detected · 2 target variants mapped · setup card sealed" | Reframe Map contents (why-this-card, levers, variants, setup card) |
| evidence board **count**: "6 receipts found" | the full evidence board |
| dossier sections as **sealed labels** | archetype file · rarity/variant reason · oracle record · mint record |

Free preview must **prove Halo has shape** (real counts — never inflated)
and must **not reveal the actual contents**. The counts are the true
numbers in the sealed dossier; honesty is the whole point.

**Count sources** (the mock reads the true number from the result, never a
made-up one) — sealed-stat row ← `sealedStat.label`/`reasonType`; Reframe
levers ← `reframeMap.levers.length`; target variants ← distinct lever
targets (or a future explicit field); evidence ← `evidenceBoard.length`;
oracle/mint rows ← presence flags. The current dev fixture carries levers +
setup card + receipts (those counts are live), but **not yet** oracle/mint
records or an explicit variant count — those fields are added in *Halo Gate
Dev Mock v1*. The counts in §4 are **illustrative format**, not a specific
fixture's numbers (the live fixture currently has 4 receipts and 2 levers).

## 6. Sealed Stat Presentation

- Show the stat **name** and a **structural reason teaser**; do **not**
  reveal the tier or the internal number on Free.
- The seal reason must be **structural** (the stat is back-of-card by
  design), never "because premium" or "to see your real score."
- Good: *"Artifact Coherence is sealed because it reads the other stats
  against each other."* Bad: *"Unlock to see your real score."*
- Allowed labels: Sealed stat · Locked axis · Back-of-card stat ·
  Dossier-only stat. Avoid: secret truth · real score · hidden judgment ·
  personality reveal.

## 7. Reframe Map Envelope

Free preview: *"Reframe Map found · 3 image levers detected · 2 target
variants mapped · Setup card sealed."* Halo opens: Why this card · Image
levers · Target variants · Setup card.

The Reframe Map is **image-only** (light, crop, distance, palette, setting)
and points at the **frame**, never the person (`CARD_LOGIC_V1` §9).

The boundary is strict: **Free preview names neither the target variant nor
the lever** — only shape/counts (*"A reframe path is on the map; the target
print and the lever open in Halo."* · *"Map contents sealed inside Halo."*).
**Naming the variant and the lever is Halo-side (post-unlock) content**
(*"Night Print path found: change the light source."* · *"This frame can
shift toward Clean Print by changing one image lever."*).

**No near-miss / chase language**, ever: no "almost rare," "one away from
mythic," "you're close to rare," "last chance," "don't miss your rare pull."

## 8. Price Framing (no price, no payment)

Define **framing only** — do not pick a figure (a single, low, one-time
per-scan unlock; exact number is a separate later decision):

- **per-scan unlock** · transparent, **one-time**, this dossier only.
- **No** subscription · **no** packs · **no** credits · **no** blind /
  randomized purchase · **no** recurring billing.
- Price appears **under** the proof of contents (the sealed envelopes),
  never above it.

Support lines: *"One scan. One key. The dossier opens for this card only."*
· *"This unlock belongs to this scan."* · *"No subscription. No packs. No
blind pull."*

**Never** imply the user is paying for a better card, a reroll, or a chance
at rarity. They open the dossier of a card they already hold.

## 9. Decline Behavior

Decline is respectful and one-tap: *"Keep Free Pull" · "Return to Free
card" · "Not now" · "Leave dossier sealed."*

- **No confirmshaming** — never *"No thanks, I don't want the full truth," "I don't care about my scan,"* or any guilt phrasing.
- **No repeated nags · no dark-pattern second prompt.**
- The Free card **stays complete**; declining never downgrades the result.
- The user may return to open the dossier later if the product supports it.

## 10. Post-Unlock Reveal Rhythm

After a successful future payment, reveal in this order: **1.** seal breaks
→ **2.** the hidden stat flips face-up → **3.** the evidence board expands
→ **4.** the Reframe Map unfolds → **5.** the dossier text opens → **6.**
the oracle record appears last → **7.** the mint record stamps the print.

Animation is **calm · archival · artifact-like** (card-back flip /
seal-open / dossier unfold), fast enough not to waste time, GPU-safe when
built. **No** fake loading · **no** slot-machine reels · **no** randomized
chest · **no** gambling-style confetti · **no** "rare reveal" suspense.

## 11. Copy System

Tone: sharp, collectible, cinematic, calm, artifact-like. Not desperate,
not SaaS, not gambling-adjacent. Banned anywhere in copy: *almost · rare
chase · true self · real score · secret beauty · hidden status · last
chance · limited time* (and the full `CARD_LOGIC_V1` §1 lexicon).

**20 heading · subhead options**
1. HALO DOSSIER SEALED · This card has a sealed back.
2. THE BACK OF THIS CARD IS SEALED · The Free Pull is yours; the back is still closed.
3. SEALED DOSSIER · Written for this scan, closed until you open it.
4. DEVELOP THE FULL PRINT · The Free Pull surfaced; the full print is sealed.
5. ARTIFACT BACK · SEALED · Everything behind the card stays sealed for now.
6. THE DOSSIER IS WRITTEN · The seal on this card is intact.
7. ONE CARD, ONE SEALED DOSSIER · The record for this exact scan.
8. BREAK THE SEAL ON THIS SCAN · The contents are set; the seal is not.
9. THE HALO RECORD IS CLOSED · Same card, sealed back.
10. THE REST OF THIS CARD IS SEALED · You hold the front; the back is folded shut.
11. CLOSED ENVELOPE · This artifact's deeper record is sealed.
12. THE FULL PRINT IS SEALED · The Free Pull is the surface; the print goes deeper.
13. THIS SCAN HAS A DEEPER RECORD · Sealed inside the Halo dossier.
14. THE BACK PLATE IS CLOSED · Flip the card to develop it.
15. SEAL INTACT · DOSSIER READY · The contents are written and waiting.
16. THE DOSSIER WAITS BEHIND THE CARD · Nothing added — only opened.
17. HALO BACK · CLOSED RECORD · The sealed half of this exact card.
18. THE SEALED HALO ENVELOPE · One scan, one closed dossier.
19. CARD FRONT IS YOURS · The sealed back develops the rest.
20. SEALED · READY TO DEVELOP · The print already exists in full.

**20 CTA · support pairs**
1. Open Halo Dossier · One scan. One dossier. No subscription. No packs.
2. Develop the full print · This unlock belongs to this scan only.
3. Open the sealed back · One card, one key. No blind pull.
4. Break the seal · The dossier opens for this card only.
5. Open this card's dossier · No subscription. No packs. No blind pull.
6. Develop this scan · The contents are already written; the seal opens.
7. Open the Halo record · One-time, this scan. Not a reroll.
8. Flip the card · You open the back you already pulled.
9. Open the dossier · A single key for a single card.
10. Develop the back plate · Nothing random — only what's sealed inside.
11. Open Halo · One scan, one dossier, no recurring billing.
12. Open the sealed envelope · This key fits this card and no other.
13. Develop the full record · Same card, opened all the way.
14. Open the back of the card · No packs, no credits, no chance draw.
15. Break the seal on this print · You already hold the front.
16. Open the dossier for this scan · One time. This card. That's all.
17. Develop the sealed half · The result doesn't change — it opens.
18. Open the Halo back · No subscription, no loot, no gamble.
19. Open what's behind the card · The print was always whole.
20. Develop the dossier · One scan in, one dossier out.

**20 decline options**
1. Keep Free Pull · 2. Return to the Free card · 3. Not now · 4. Leave the
dossier sealed · 5. Keep the seal closed · 6. Stay on the Free Pull ·
7. Maybe later · 8. Leave it sealed for now · 9. Keep the front of the card
· 10. Back to the Free card · 11. Not this time · 12. Leave the back closed
· 13. Hold the Free Pull · 14. Keep this card as-is · 15. Close the gate ·
16. Done for now · 17. Leave the print as Free · 18. Keep the surface read
· 19. Step back · 20. The seal stays closed.

**20 Reframe Map lines** — the Free envelope shows **shape / counts only**;
lines marked *(Halo)* are post-unlock contents and must **not** appear in
the Free preview.
1. Reframe Map found. · 2. 3 image levers detected. · 3. 2 target variants
mapped. · 4. Setup card sealed. · 5. Map contents sealed inside Halo. ·
6. *(Halo)* Night Print path found: change the light source. · 7. *(Halo)*
This frame can shift toward Clean Print by changing one image lever. ·
8. *(Halo)* A path toward The Neon Witness is on the map. · 9. Two target
prints are reachable from this frame. · 10. *(Halo)* The levers are
image-only: light, crop, distance, palette. · 11. Map drawn — contents open
in the dossier. · 12. *(Halo)* One change of light moves this card on the
map. · 13. The setup card is written and sealed. · 14. Reframe paths
detected; the steps are sealed. · 15. This card sits one image change from a
different print. · 16. The map shows where the frame can go, not where you
should. · 17. Levers detected; their settings stay in Halo. · 18. Variant
targets mapped from the visible frame only. · 19. The Reframe Map has shape;
the contents are folded shut. · 20. Three levers, two targets — the routes
open with the dossier.

**20 sealed-stat teaser lines**
1. Artifact Coherence is sealed because it reads the other stats against
each other. · 2. A back-of-card axis the front can't show. · 3. One stat
lives on the back of the card by design. · 4. This axis only resolves once
the other stats are open. · 5. The sealed stat measures the frame against
itself. · 6. A dossier-only stat — it needs the full board to mean
anything. · 7. The locked axis weighs the whole frame at once. ·
8. Sealed: this stat depends on every other reading. · 9. The back-of-card
stat reads the receipts as a set. · 10. One axis is structural — computed
from the rest. · 11. The frame's read of its own coherence. · 12. The
contradiction check; it opens with the board. · 13. A folded axis — visible
only with the full dossier. · 14. It holds the card's internal agreement. ·
15. Locked because it summarizes, not because it's withheld. · 16. The
deciding axis sits behind the card. · 17. The seam between the other four. ·
18. It reads cross-stat, not single-cue. · 19. The back stat checks the
frame for internal tension. · 20. The dossier's spine; it opens with it.

**10 post-unlock reveal lines**
1. Seal broken — the back of the card opens. · 2. The sealed stat flips
face-up. · 3. The evidence board expands to the full set. · 4. The Reframe
Map unfolds its levers. · 5. The dossier text develops, line by line. ·
6. The oracle record surfaces last. · 7. The mint record stamps this print.
· 8. The full print is developed. · 9. The dossier is open; the card is
whole. · 10. Record complete — same card, fully read.

## 12. Dark-Pattern Ban List (hard)

Never: fake urgency · countdowns · streak pressure · loot-box / chest
language · "almost rare" · pay-to-reroll · credit packs (v1) · subscription
(v1) · confirmshaming · hidden / recurring billing · shame language ·
"unlock your true self" · "discover what this says about you" · "see your
real score" · "boost your result" · "try again for better" · "one away from
mythic." Any of these is a release blocker.

## 13. Halo Gate Visual Direction (future runtime)

A card-back / sealed plate / dossier chamber: dark archival panel · thin
border · small seal marks · envelope rows · one calm action button. **No
giant price-first layout** — the price sits **under** the proof of
contents, not above it. Keep the Free card visible nearby or behind the gate where
possible. Metaphor: the user is not buying premium — they are **breaking
the seal on an artifact they already pulled.**

## 14. Current Implementation Status

- **Docs only** — no payment, no checkout, no runtime change.
- The current dev simulation (`?dev=free-scan-sim`) only **previews** the
  Reframe Map; the Halo Gate itself is not built.
- Normal Local Draft still generates nothing; Develop Scan still opens the
  sealed engine-offline gate. No AI · no backend / upload / payment.
- The future **Halo Gate Dev Mock v1** builds a dev-only mock of this
  layout (no payment) before any real unlock flow.

---

**Authority note:** §2 (product law), §8 (no-gamble price framing), §9
(no confirmshaming), and §12 (dark-pattern ban) are LOCKED-grade and may
not be relaxed by any downstream upgrade/payment work.
