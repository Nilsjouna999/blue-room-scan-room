# BLUE ROOM — Reading Zone Inventory & Page Hierarchy Proposal

**Layer:** PLANNING · **Status:** PROPOSAL · **Session:** BR-S0?? (2026-06-21)

---

## Executive Summary

The developed reading (right-panel modules + 7-plate dossier) currently spreads **14 distinct information types** across two containers with no clear spatial organization. This inventory names every artifact type, proposes coherent **zones** (thematic groups), and recommends a **natural reading order** that flows factual → interpretive → identity → collectible → playful.

**Why this matters:** The diagnosis (BR-S085) identified rhythm/copy/hierarchy as the primary problem; layout is secondary. However, layout *expresses* hierarchy. This proposal treats layout as the **container** for the rhythm/copy fixes — zone clarity enables tighter copy, smarter pacing, and obvious entry points.

---

## Part A: Complete Information Type Inventory

### Right-Panel Modules (renderReadingPanel)

| # | Type | Current Name | Data Source | Free | Halo | Function |
|---|---|---|---|---|---|---|
| 1 | **Oracle-First Doorway** | (missing) | `src.oracle` | short-tease | full | Entry narrative; frames the entire reading |
| 2 | **Stat Receipts (cue→effect)** | Stat Reading | `src.reads[k]` + `scan.stats` | 4 visible | 4–6 visible | Artifact signals behind each stat |
| 3 | **Aura Identity** | Aura Profile | `src.aura` | visible | visible | Scene/mood tags; collectible vibe |
| 4 | **Scene Grounding** | Scene Role | `src.sceneRole` | visible | visible | What the setting/environment contributes |
| 5 | **Subject Geometry** | Stance Read | `src.stance` | locked teaser | full prose | Pose/hand geometry as visible lines |
| 6 | **Coherence Read** | Fit Coherence | `src.fit` | locked teaser | full line | How styling ↔ setting ↔ pose lock |
| 7 | **Motion/Tension Stat** | Frame Impact | `src.impact` | locked teaser | bar + tier | The frame's energetic charge (Halo-depth) |
| 8 | **Context Density Stat** | Lore Density | `src.lore` | locked teaser | bar + tier | Visible story / world specificity (Halo-depth) |
| 9 | **Mythic Narrative** | Oracle Read | `src.oracle` | sealed hint | full quote | Fictional/archival language; "other cards" as variants |
| 10 | **Archetype Discovery** | Artifact Archetype | `scan.archetype` + `ARCHETYPE_NOTES` | hidden | visible | Photo role (not person type); discovery phrasing |
| 11 | **Production Record** | Mint Record | `src.card.*` + `scan.tierOutputs` | masked serial | full record | Serial · Edition · Batch · Minted (early card stamp) |
| 12 | **Technical Grounding** | Technical Receipts | `src.receipts` + `FORMULAS` | expandable | expandable | Scan methodology; hidden-by-default |

### Dossier Plates (renderDossier) — 7 sections

| # | Type | Plate | Current Name | Free State | Halo State | Function |
|---|---|---|---|---|---|
| 13 | **Factual Archive Header** | 01 | Source Record | Grid + filing chain | Grid + filing chain | Capture metadata; filing provenance; serial lineage |
| 14 | **Evidence Receipts** | 02 | Evidence Board | 2–3 receipts | All receipts | Cue→Effect signal grounding; basis for stats |

**Note on duplication (BR-S085 §4):** `src.reads[k]` is rendered twice:
- **Stat Reading** (right panel, line 548): Full receipt prose under each stat
- **Stat Dossier** (dplate 03, line 832): Same prose under "Why" re-stated verbatim

---

## Part B: Zone Organization Proposal

### The Five Natural Zones (reading order: factual → interpretive → identity → collectible → playful)

#### **ZONE 1: ORACLE & ENTRY (Doorway)**
**Location:** Right-panel top (pre-seam; moves oracle from buried position 9/11 to visual entry)
**Belongs here:** Oracle short-form (Free) / Oracle full (Halo) + Archetype discovery note

**Why:** The oracle is the card's *voice*. Every developed reading should begin with "what is this thing saying?" — not stats, not forensics. This is the mythic-entry layer; it primes the rest.

**Items:**
- Oracle narrative (cue→effect, tier chip format proposed below)
- Archetype class label + discovery line (Halo-only; visible in both Halo + Lab)

**Current state:** Oracle is module 9/11 (late). Archetype is late too. Oracle short survives dossier plate 07 but is disconnected from entry.

**Rhythm problem:** Reader lands on stats first → the artifact voice is buried → later discovery feels like a surprise, not a frame.

---

#### **ZONE 2: ARTIFACT SIGNALS (Evidence Layer)**
**Location:** Right panel, post-oracle, pre-seam (Free & Halo; same zone, different depths)
**Belongs here:** All stat receipts + scene grounding

**Why:** The 4 Free stats are the card's *visible signals*. This zone answers "what does the photo actually *do*?" with receipt-level granularity.

**Items:**
- Stat Reading (4–6 stats as cue→effect receipts with tier bands)
- Scene Role (where/how the setting contributes)
- Aura Profile (mood/vibe tags)

**Current state:**
- Stat Reading (modules 2; good position)
- Aura (modules 3; good position)  
- Scene Role (module 4; good position)
- Fit Coherence (module 6; interpretive, not signal)

**Rhythm problem:** All four are at the same visual weight; no hierarchy between "what the stat is" and "why it matters."

**Proposed revision:** Keep position; change copy/format to emphasize cue→effect causality.

---

#### **ZONE 3: FRAME INTERPRETATION (Halo-Depth Reads)**
**Location:** Right panel, post-seam (Halo only; locked/teased in Free)
**Belongs here:** All Halo-specific interpretive modules

**Why:** Once the artifact signals are grounded, the developed reading goes deeper — *how* the signals cohere, *why* tension/context matter, *what* the geometry reveals.

**Items:**
- Stance Read (visible pose as geometry, not psychology)
- Fit Coherence (styling ↔ setting ↔ gesture lock)
- Frame Impact (motion potential; Halo stat)
- Lore Density (world building; Halo stat)

**Current state:**
- Modules 5–8 in right panel; locked/teased in Free.
- **Visually isolated** — no shared frame or header.

**Rhythm problem:** These four modules feel like four orphan columns; no sense that they *belong together* as a coherent depth layer.

**Proposed revision:** Keep in right panel; add a **zone header** ("Halo Depth Reads" or "Frame Interpretation — Developed") to bind them; tighten copy to cross-reference.

---

#### **ZONE 4: PRODUCTION & ARCHIVE (Collectible Record)**
**Location:** Right panel + dplate 06 (Mint Record is split across both)
**Belongs here:** All production metadata, serial lineage, mint triggers

**Why:** This zone marks *when* the card became a thing — its collectible identity, provenance chain, and mint ceremony. It's the artifact's *birth certificate*.

**Items:**
- Card Record Header (proposed in BR-S085: ◆ ARTIFACT RECORD · serial · HALO MINT as a non-dplate first child of .dossier__inner)
- Mint Record (early stamp in right panel, full record in dplate 06)
- Source Record (dplate 01: capture metadata + filing chain + serial lineage)

**Current state:**
- Mint Record (module 11, right panel; early, small)
- Mint Record (dplate 06; full, late)
- Source Record (dplate 01; at the *bottom* of the dossier, reads as archive history not introduction)

**Rhythm problem:**
1. The card's *production identity* is split between right panel (early, incomplete) and dossier (late, full).
2. Source Record is at dplate 01 but reads as "filing metadata" not "collectible birth."
3. No visual signal that "this thing was minted; here is its serial chain."

**Proposed revision:** Consolidate mint/archive record as a coherent collectible identity zone; consider moving Source Record *down* in dossier order (it's historical, not interpretive).

---

#### **ZONE 5: EVIDENCE & METHODS (Technical Depth)**
**Location:** Dossier plates 02–05 (Evidence Board, Stat Dossier, Hidden Stat, Fit + Aura Layer)
**Belongs here:** All receipt-grounding, stat justification, hidden stat reveal, technical formulas

**Why:** This is the *methodology* layer — how the scan arrived at each signal, what evidence supports each stat, what hidden depths exist. It's the "show your work" zone.

**Items:**
- Evidence Board (dplate 02; cue→effect receipts)
- Stat Dossier (dplate 03; why each stat is what it is)
- Hidden Stat (dplate 04; the conditional reveal)
- Fit + Aura Layer (dplate 05; scene coherence + mood depth)
- Technical Receipts (collapsible; scan methodology + interpretive formulas)

**Current state:**
- Spread across dplates 02–05 + right panel (Technical Receipts, module 12).
- Receipts are rendered twice: dplate 02 (structured) and dplate 03 (legacy prose under each stat).

**Rhythm problem:**
1. Evidence grounding is scattered: right-panel stats have no visible evidence explanation; dplate 03 re-states the prose from the right panel.
2. Hidden stat (dplate 04) appears after evidence — should either precede as a teaser or follow as a "sealed depth" climax.
3. Technical Receipts are hidden by default (good), but formulas are never visible in Free state.

**Proposed revision:**
- De-dupe dplate 03: remove "why" prose that mirrors right-panel reads; instead, cross-reference and add *evidence-grounding* (cue line from dplate 02).
- Keep Fit + Aura as the coherence climax before mint identity.
- Consider: does Hidden Stat belong in "evidence/methods" or should it be its own mini-zone (the Conditional Reveal)?

---

### Reading Order: Factual → Interpretive → Identity → Collectible → Playful

**Recommended Page Flow (Right Panel + Dossier):**

```
RIGHT PANEL
═══════════════════════════════════════════════════════════════

[HEADER: Scan Reading · SRC-0N · Archive Edition / Halo Mint / Lab Mint]

── ZONE 1: ORACLE & ENTRY ──
  Oracle narrative (short/full)
  Archetype discovery note

── ZONE 2: ARTIFACT SIGNALS ──
  Stat Reading (cue→effect receipts w/ tier)
  Aura Profile
  Scene Role

[readseam: Free=locked teasers / Halo=deep reads]

── ZONE 3: FRAME INTERPRETATION (Halo-only) ──
  Stance Read (geometry)
  Fit Coherence
  Frame Impact
  Lore Density

── ZONE 4: PRODUCTION IDENTITY (Early card stamp) ──
  Mint Record (preview)

[Lab State note if treatment=mint]
[Halo Mint badge if treatment=shiny]

  
DOSSIER
═════════════════════════════════════════════════════════════

[HEADER: SCAN DOSSIER — FULL RECORD]

── ZONE 4: PRODUCTION & ARCHIVE (Full Record) ──
  ◆ ARTIFACT RECORD · serial · HALO MINT [proposed header, non-dplate first child]
  
  dplate 01: Source Record (capture metadata + filing chain + serial lineage)

── ZONE 5: EVIDENCE & METHODS ──
  dplate 02: Evidence Board (structured receipts)
  dplate 03: Stat Dossier (stat bars + grounding evidence, no duplicate prose)
  dplate 04: Hidden Stat (sealed/revealed)
  dplate 05: Fit + Aura Layer (coherence climax)

── ZONE 4: PRODUCTION COMPLETE ──
  dplate 06: Mint Record (full production record)

── ZONE 5/PLAYFUL: MYTHIC CLOSURE ──
  dplate 07: Oracle Read (full narrative + timeline/variants)

[END OF RECORD]
```

---

## Part C: Information Type Details & Zone Assignments

### Type-by-Type Breakdown

#### 1. **Oracle Narrative** (ZONE 1: Entry)
- **Current location:** Right panel module 9 / Dplate 07
- **Data:** `src.oracle` (short in Free; full in Halo) + `d.oracle.timeline` (variants as "other cards")
- **Function:** Mythic frame; fictional/archival voice; "this is a card about…"
- **Free state:** Short form; "one line survives the preview"
- **Halo state:** Full oracle + timeline (variants framed as other cards, never "better you")
- **Rhythm fix:** Move to top of right panel; pair with archetype discovery for immediate entry
- **Safety:** Forbidden lexicon enforced; no person-truth claims; clearly flagged as mythic flavour

---

#### 2. **Stat Receipts (cue→effect)** (ZONE 2: Signals)
- **Current location:** Right panel module 2 + Dplate 03 (duplicate)
- **Data:** `src.reads[k]` (legacy) / `scan.receipts[].cue` (v2 preferred)
- **Function:** What artifact signal backs each stat?
- **Free state:** 4 visible stats (Presence / Frame / Signal / Visual Impact) with prose reads
- **Halo state:** 4–6 stats with prose + evidence grounding
- **Format proposal:** Cue line (desaturated mono) + Effect (full-weight prose) + Tier band
- **Rhythm fix:** One receipt per stat; remove duplication in dplate 03
- **Safety:** Image-only; passes Artifact Test; no person psychology

---

#### 3. **Aura Profile** (ZONE 2: Signals)
- **Current location:** Right panel module 3
- **Data:** `src.aura[]` (mood/vibe tags)
- **Function:** Collective identity/feel of the card
- **Free state:** Visible chips
- **Halo state:** Visible chips (same in both)
- **Rhythm:** Good position; small and snappy
- **Safety:** Scene-based tags, never person traits

---

#### 4. **Scene Role** (ZONE 2: Signals)
- **Current location:** Right panel module 4
- **Data:** `src.sceneRole`
- **Function:** What does the setting/environment contribute?
- **Free state:** Visible one-liner
- **Halo state:** Visible one-liner (unchanged)
- **Rhythm:** Good position; grounding line
- **Safety:** Image setting, never person's social role

---

#### 5. **Stance Read (Geometry)** (ZONE 3: Interpretation)
- **Current location:** Right panel module 5 (locked in Free)
- **Data:** `src.stance`
- **Function:** Visible pose/hand geometry as lines and angles
- **Free state:** "Evidence layer pending — develops with Halo Mint"
- **Halo state:** Full serif prose; geometry as visual argument
- **Rhythm fix:** Group with Fit / Impact / Lore as "Halo Depth Reads" zone
- **Safety:** Geometry ≠ psychology; banned: body-language reading, confidence inference

---

#### 6. **Fit Coherence** (ZONE 3: Interpretation)
- **Current location:** Right panel module 6 (locked in Free)
- **Data:** `src.fit`
- **Function:** How styling ↔ setting ↔ gesture ↔ frame lock
- **Free state:** "Coherence read recorded, undeveloped. Full record develops with mint."
- **Halo state:** Full line ("everything in the frame agrees")
- **Rhythm fix:** Group with Impact / Lore as "Halo Depth Reads" zone
- **Safety:** Image coherence, never "person belongs/doesn't belong"

---

#### 7. **Frame Impact (Motion/Tension Stat)** (ZONE 3: Interpretation)
- **Current location:** Right panel module 7 (locked in Free)
- **Data:** `src.impact` (legacy) / `scan.stats.haloExtended.visualImpact` (v2)
- **Function:** Motion potential; unresolved tension; charge in the frame
- **Free state:** Locked teaser
- **Halo state:** Bar + tier band ("Charged", "Peak", etc.)
- **Rhythm fix:** Group with Stance / Fit / Lore as Halo Depth reads
- **Safety:** Frame tension, never emotional diagnosis

---

#### 8. **Lore Density (Context/Story Stat)** (ZONE 3: Interpretation)
- **Current location:** Right panel module 8 (locked in Free)
- **Data:** `src.lore` (legacy) / `scan.stats.haloExtended.loreDensity` (v2)
- **Function:** Visible story; world specificity; setting details
- **Free state:** Locked teaser
- **Halo state:** Bar + tier band + dashed fill style (visual distinction)
- **Rhythm fix:** Group with Stance / Fit / Impact as Halo Depth reads
- **Safety:** Scene details and props, never biography/backstory as fact

---

#### 9. **Artifact Archetype** (ZONE 1: Entry or ZONE 3, depending on interpretation)
- **Current location:** Right panel module 10 (Halo-only, mid-panel)
- **Data:** `scan.archetype.class` + `ARCHETYPE_NOTES[class]`
- **Function:** Photo role; discovery phrasing ("The Encounter", "The Dispatch")
- **Free state:** Hidden
- **Halo state:** Class label + one-liner + discovery note (e.g., "The image does not wait to be observed. It answers.")
- **Rhythm proposal:** Move to ZONE 1 alongside Oracle (they are the mythic entry frame)
- **Safety:** Photo role, never person typology; chip-scoped ("Artifact class · …")

---

#### 10. **Mint Record (Early Card Stamp)** (ZONE 4: Production)
- **Current location:** Right panel module 11 (preview; small dl)
- **Data:** `src.card` fields (Serial / Edition / Batch / Minted)
- **Function:** Card identity marker; announces "this is a minted thing"
- **Free state:** Visible but minimal
- **Halo state:** Visible but minimal (same in both)
- **Rhythm fix:** Reposition as transition to dossier / collectible zone
- **Safety:** Archive metadata only

---

#### 11. **Technical Receipts** (ZONE 5: Methods)
- **Current location:** Right panel module 12 (collapsible details element)
- **Data:** `src.receipts[]` (k-v pairs) + `FORMULAS[]` (scan lenses)
- **Function:** Scan methodology; hidden by default; "show your work"
- **Free state:** Visible but collapsible
- **Halo state:** Visible but collapsible (same in both)
- **Rhythm:** Good position (end of right panel before dossier)
- **Safety:** Methodology and formulas, never measurements of the person

---

#### 12. **Source Record** (ZONE 4: Archive)
- **Current location:** Dplate 01
- **Data:** `d.record.*` (9 factual fields: objectNo, captureType, gesture, container, primarySignal, backgroundRole, eligibility, provenance, markings) + filing chain + serial lineage
- **Function:** Factual archive header; capture provenance; serial spine
- **Free state:** Full grid (same as Halo)
- **Halo state:** Full grid (same as Halo)
- **Rhythm proposal:** Keep at dplate 01 but consider moving the *filing chain* + *serial lineage* to a dedicated "Production Identity" zone header; source grid becomes factual archive reference
- **Safety:** Metadata and objects (props, markings), never body/face description

---

#### 13. **Evidence Board** (ZONE 5: Methods)
- **Current location:** Dplate 02
- **Data:** `scan.receipts[]` (v2: cue / effect / basis / confidence) OR `d.evidence[]` (legacy: k / read / free flag)
- **Function:** Grounding why stats exist; artifact signals with confidence
- **Free state:** 2–3 receipts (subset)
- **Halo state:** All receipts
- **Format:** V2 preferred (pixel-fact CUE line + full-weight EFFECT clause + confidence chip)
- **Rhythm fix:** This is the *first* detailed evidence layer; position it immediately after oracle/archetype
- **Safety:** Image evidence only; cue/basis grounded in visible photo features

---

#### 14. **Stat Dossier** (ZONE 5: Methods)
- **Current location:** Dplate 03
- **Data:** Each stat (presence, frame, signal, visualImpact, + Halo depth stats) with bars + evidence grounding
- **Function:** Stat justification; "why this stat is what it is"
- **Free state:** 4 stats + "undeveloped" marker
- **Halo state:** 4–6 stats + full evidence explanation + optional note
- **Duplication issue:** `src.reads[k]` is stated twice: right panel (Stat Reading) + dplate 03 (as "why" prose)
- **Rhythm fix:** Remove duplicate; keep dplate 03 as evidence grounding layer (cue + basis + note), cross-reference right panel
- **Safety:** Image evidence and reasoning, never person psychology

---

#### 15. **Hidden Stat** (ZONE 5: Methods — or a separate "Conditional Reveal" zone?)
- **Current location:** Dplate 04
- **Data:** `scan.conditionalStats[]` (name / value / read) OR `d.hidden` (name / value / read / tease)
- **Function:** Sealed depth; opens with Halo
- **Free state:** Tease only ("Sealed reading · development pending") + qualitative hint, no value/name/count
- **Halo state:** Full reveal (name + tier band + read)
- **Rhythm proposal:** Two options:
  1. Keep in current position (post-evidence as climax reveal)
  2. Move earlier, post-Evidence Board (pre-Stat Dossier) as a "this stat exists but is conditional" marker
- **Safety:** Image evidence; forbidden: person psychology, secret/withheld framing

---

#### 16. **Fit + Aura Layer** (ZONE 5: Methods — Coherence Climax)
- **Current location:** Dplate 05
- **Data:** `src.aura` + `src.sceneRole` + `src.stance` + `src.fit` + Frame Impact + Lore Density bars
- **Function:** Coherence synthesis; how all elements agree
- **Free state:** Aura chips only + "Full aura interpretation develops with Halo Mint"
- **Halo state:** Full synthesis: aura + scene role + stance prose + fit line + both Halo stats
- **Rhythm:** Good position as evidence climax before mint identity
- **Safety:** Image coherence and scene, never person coherence/compatibility

---

#### 17. **Mint Record (Full Production Record)** (ZONE 4: Production Complete)
- **Current location:** Dplate 06
- **Data:** `scan.tierOutputs.halo` fields + `d.mint.*` (trigger1 / trigger2 / family / note / serial)
- **Function:** Full collectible birth certificate; triggers, material, family, minting narrative
- **Free state:** Reduced fields; serial reserved
- **Halo state:** Full record; mint serial assigned
- **Rhythm:** Good position as production identity climax before Oracle closure
- **Safety:** Artifact production metadata; triggers are visible image cues

---

#### 18. **Oracle Read (Full)** (ZONE 5/PLAYFUL: Mythic Closure)
- **Current location:** Dplate 07
- **Data:** `d.oracle.full` (Halo) / `d.oracle.short` (Free) + `d.oracle.timeline` (variant cards as futures)
- **Function:** Mythic closure; "other cards as other worlds, not better selves"
- **Free state:** Short teaser + "full read develops with the mint"
- **Halo state:** Full oracle + timeline (framed as variant card routes)
- **Rhythm:** Perfect position as final node; playful/mythic after all factual/interpretive work
- **Safety:** Fictional/archival voice clearly flagged; no person-truth claims; variants are "other cards", never "better versions"

---

## Part D: De-Duplication Audit

### Identified Duplications

#### 1. **Stat Reads (Dual Location)**
- **Right panel, Stat Reading (module 2, line 548):** `src.reads[k]` as receipt prose
- **Dplate 03, Stat Dossier (line 832):** `src.reads[k]` again, labeled as "why"

**Recommendation:** Keep the right-panel version as the *primary* signal. In dplate 03, replace the duplicate prose with:
- **Evidence grounding line** (short cue/basis from dplate 02 structure)
- **Optional note** (deeper reasoning if warranted)
- **Cross-reference** to right panel ("see Stat Reading above")

This allows dplate 03 to be the *evidence justification* layer without repeating content.

---

#### 2. **Oracle (Dual State, Not True Duplication)**
- **Right panel, module 9:** `src.oracle` (short form in Free; full in Halo)
- **Dplate 07:** `d.oracle.short` (Free) / `d.oracle.full` (Halo) + timeline

This is *intentional* — the short form survives the Free card to avoid complete darkness. However, **rhythm is broken** because:
- Oracle appears *late* in right panel (position 9/11)
- Dplate 07 (final) repeats it

**Recommendation:** Move oracle to ZONE 1 (right panel entry) in both Free and Halo. Dplate 07 becomes the *mythic closure* with full oracle + timeline. The short form in right-panel entry primes the reading; the full form + variants in dplate 07 pay it off.

---

#### 3. **Archetype (Single Data, Two Contexts)**
- **Right panel, module 10:** `scan.archetype.class` + one-liner + discovery note (Halo-only)
- **Dplate 01 filing chain:** `scan.archetype.class` (filed as: The Encounter, etc.)

This is *useful redundancy* (the filing chain names the class; the module explains it). **No change needed.**

---

#### 4. **Aura (Dual Location, Same Content)**
- **Right panel, module 3:** `src.aura` chips
- **Dplate 05, Fit + Aura Layer:** `src.aura` chips (identical)

**Recommendation:** Remove from dplate 05 as a standalone element. Instead, integrate aura tags as a visual layer *within* the Fit + Aura module (e.g., as chip badges on the prose sections). The right panel holds the quick-scan version; dplate 05 holds it in context with coherence reasoning.

---

#### 5. **Scene Role (Dual Location)**
- **Right panel, module 4:** `src.sceneRole` (one-liner)
- **Dplate 05, Fit + Aura Layer:** Same scene role text, prefixed "Scene Role — "

**Recommendation:** Remove from dplate 05 as stated. Instead, *integrate* scene role as a supporting element within the Fit prose (e.g., "Styling and setting [cite Scene Role] align through…"). Or keep dplate 05 as a *synthesis* zone that brings right-panel elements together (aura + scene + stance + fit) without full duplication — use short cross-references.

---

#### 6. **Stance Read (Dual Location)**
- **Right panel, module 5:** `src.stance` (locked in Free; full prose in Halo)
- **Dplate 05, Fit + Aura Layer:** `src.stance` (dfitaura__stance class; same prose)

**Recommendation:** Same as Scene Role — integrate into Fit + Aura as a *synthesis* zone. Dplate 05 should *reference and contextualize* the right-panel reads, not duplicate them.

---

### Summary: De-Duplication Strategy

| Content | Current Locations | Fix | Outcome |
|---|---|---|---|
| Stat reads (`src.reads[k]`) | Right panel + dplate 03 | Keep primary in right panel; dplate 03 → evidence grounding only | Clear evidence layer; no repeat prose |
| Oracle | Right panel + dplate 07 | Move entry oracle to right-panel top (ZONE 1); dplate 07 stays as mythic closure | Clear entry framing + payoff |
| Aura | Right panel + dplate 05 | Keep in right panel; dplate 05 integrates as visual layer | One source of truth |
| Scene Role | Right panel + dplate 05 | Keep in right panel; dplate 05 contextualizes in prose | Synthesis, not duplication |
| Stance Read | Right panel + dplate 05 | Keep in right panel; dplate 05 contextualizes in prose | Synthesis, not duplication |

**Net effect:** Dplate 05 becomes a *coherence synthesis* zone (integrating right-panel elements via prose, not repeating them) instead of a storage locker.

---

## Part E: Proposed Right-Panel Module Reordering

### Current Order (renderReadingPanel, line 682)
```
[header]
[statReads] (module 2)
[aura] (module 3)
[sceneRole] (module 4)
[readseam — Free: lockedDeep OR Halo: archetypeModule + deep + shinyTease + shinyBadge]
  [deep] (modules 5–8 + 11 + 12)
```

### Proposed Order (ZONE-based)

```
[HEADER: Scan Reading · SRC-0N · Archive Edition / Halo Mint / Lab Mint]

── ZONE 1: ORACLE & ENTRY ──
  [oracle + archetype discovery] ← MOVE to top

── ZONE 2: ARTIFACT SIGNALS ──
  [statReads] ← Keep position, improve format (cue→effect)
  [aura] ← Keep
  [sceneRole] ← Keep

[readseam boundary — Free: "Develop" CTA + locked teasers OR Halo: Halo Depth Reads + badges]

── ZONE 3: FRAME INTERPRETATION (Halo-only) ──
  [stance] ← Reorder (was 5; improve with zone binding)
  [fit] ← Reorder (was 6; improve with zone binding)
  [impact] ← Reorder (was 7; improve with zone binding)
  [lore] ← Reorder (was 8; improve with zone binding)

── ZONE 4: PRODUCTION IDENTITY (Early card stamp) ──
  [mintRecordPreview] ← Reorder (was 11; moved to pre-dossier)

[shinyTease/Badge] ← Keep late (Lab/Halo meta-messages)

── (end right panel; dossier begins below) ──
```

---

## Part F: Proposed Dossier Plate Reordering

### Current Order (renderDossier)
```
01: Source Record
02: Evidence Board
03: Stat Dossier
04: Hidden Stat
05: Fit + Aura Layer
06: Mint Record
07: Oracle Read
```

### Proposed Order (ZONE-based, conservative)

**Option 1: Minimal Move (de-dupe only, keep most order)**
```
[HEADER: SCAN DOSSIER — FULL RECORD]

┌─ ZONE 4: PRODUCTION & ARCHIVE ─┐
│ ◆ ARTIFACT RECORD · serial · HALO MINT [new header]
│ 01: Source Record (factual archive + filing + serial lineage)
└────────────────────────────────┘

┌─ ZONE 5: EVIDENCE & METHODS ────┐
│ 02: Evidence Board (structured receipts)
│ 03: Stat Dossier (bars + evidence grounding, NO duplicate prose)
│ 04: Hidden Stat (sealed/revealed depth)
│ 05: Fit + Aura Layer (coherence synthesis, integrated not duplicated)
└────────────────────────────────┘

┌─ ZONE 4: PRODUCTION COMPLETE ──┐
│ 06: Mint Record (full production record + minting narrative)
└────────────────────────────────┘

┌─ ZONE 5/PLAYFUL: MYTHIC ────────┐
│ 07: Oracle Read (full + timeline as variant cards)
└────────────────────────────────┘

[END OF RECORD]
```

**Why this order?**
- Source Record establishes *what* was captured (factual, filed).
- Evidence Board + Stat Dossier + Hidden Stat + Fit + Aura explain *how* the read works (methodological, interpretive).
- Mint Record announces *when* it became a collectible (production identity).
- Oracle Read provides mythic closure ("what other cards could this become?").

---

## Part G: Proposed Format/Rhythm Improvements (Copy+Hierarchy)

### Right Panel — ZONE 2: Stat Receipts (cue→effect format)

**Current format (module 2, line 546–549):**
```html
<div class="reads__item">
  <div class="reads__top"><span class="reads__name">Frame</span><span class="reads__val">Strong</span></div>
  <p>The crop is deliberate; the horizon pins to the upper third.</p>
</div>
```

**Proposed format (with cue→effect receipt structure):**
```html
<div class="reads__item">
  <div class="reads__top"><span class="reads__name">Frame</span><span class="reads__val">Strong</span></div>
  <div class="reads__evidence">
    <span class="reads__cue">horizon pinned to upper third</span>
  </div>
  <p class="reads__effect">The crop is deliberate; editorial discipline for a working photo.</p>
</div>
```

**Why:**
- Separates *visible cue* (pixel-fact) from *interpretation* (artifact reasoning).
- Cue is quiet (desaturated, small); effect is full-weight (readable prose).
- Makes Artifact Test clearer: cue line is always image-only.

---

### Dplate 03: Stat Dossier (de-duplicated format)

**Current format (line 826–838):**
```html
<div class="dstat">
  <div class="dstat__head">
    <span class="dstat__name">Frame</span>
    <span class="dstat__track">...</span>
    <span class="dstat__val">Strong</span>
  </div>
  <p class="dstat__why">The crop is deliberate; the horizon pins to the upper third.</p>
  <p class="dstat__evidence">Horizon line at 33%, clean edges visible.</p>
  <p class="dstat__note">Precision common in editorial work.</p>
</div>
```

**Proposed format (no duplicate prose):**
```html
<div class="dstat">
  <div class="dstat__head">
    <span class="dstat__name">Frame</span>
    <span class="dstat__track">...</span>
    <span class="dstat__val">Strong</span>
  </div>
  <p class="dstat__ref">Stat basis: <a href="#" class="dstat__link">See Stat Reading</a></p>
  <p class="dstat__evidence">Cue: Horizon pinned to upper third. Basis: composition rule-of-thirds.</p>
  <p class="dstat__note">Optional deeper reasoning or exception note.</p>
</div>
```

**Why:**
- Removes the prose duplication (dstat__why was repeating src.reads[k]).
- Keeps evidence grounding as the *unique* value of dplate 03.
- Cross-link respects "read at your own pace" (full right-panel prose or brief dplate summary).

---

### Right Panel — ZONE 3: Halo Depth Reads (zone binding)

**Current format (modules 5–8 as isolated .module divs):**
```html
<div class="module module--lead" data-lead="1">
  <div class="module__head"><span>Stance Read</span>...</div>
  <p class="module__prose module__prose--serif">...</p>
</div>
<div class="module">
  <div class="module__head"><span>Fit Coherence</span>...</div>
  <p class="module__line">...</p>
</div>
... [isolated, no visual grouping]
```

**Proposed format (zone-bound container):**
```html
<div class="readzone readzone--depth" data-zone="halo-depth">
  <div class="readzone__head">
    <h3 class="readzone__title">Frame Interpretation — Developed</h3>
    <span class="readzone__rule"></span>
  </div>
  
  <div class="module module--lead" data-lead="1">
    <h4 class="module__head">Stance Read</h4>
    <p class="module__prose">...</p>
  </div>
  
  <div class="module">
    <h4 class="module__head">Fit Coherence</h4>
    <p class="module__line">...</p>
  </div>
  
  <div class="module">
    <h4 class="module__head">Frame Impact</h4>
    ... [bar + stat]
  </div>
  
  <div class="module">
    <h4 class="module__head">Lore Density</h4>
    ... [bar + stat]
  </div>
</div>
```

**Why:**
- **Visual binding:** Zone header signals "these four belong together as a coherence layer."
- **Rhythm:** Clear entry/exit; the zone is one unit, not four orphan siblings.
- **Copy support:** The zone header names the layer ("Frame Interpretation — Developed") so each module copy can be tighter (no need to re-explain context).

---

## Part H: Safety & Constraint Satisfaction

### Constraints (Inherited from HALO_GATE_BOUNDARY_V1, CARD_SYSTEM_V1, COPY_SYSTEM)

1. **Image-only / Artifact Test:** Every stat, receipt, oracle phrase reads the *photo*, never the person.
2. **No person-truth claims:** Banned: attractiveness, personality, psychology, destiny, "what this says about you."
3. **Variants are "other cards":** Never "better you," "corrected version," or improvement on the person.
4. **No exact pre-unlock counts:** Free front and Halo Gate may not show module counts, receipt counts, or hidden stat value.
5. **Free is complete:** Not withheld; reads as "undeveloped" or "archive pull," never "locked" or "blocked."
6. **Deadpan archival voice:** Funny because absurd (applying museum language to a car selfie), never winking or warm.

### Mapping Constraints to Zones

| Zone | Constraint | Enforcement |
|---|---|---|
| ZONE 1: Oracle & Entry | No person-truth; clearly mythic flavour | Copy review; oracle.full must pass Artifact Test |
| ZONE 2: Signals | Artifact Test; image-only cues; no person psychology | Cue lines are pixel-facts; effect lines cite image evidence |
| ZONE 3: Interpretation | Frame-only; no body-language psychology; geometry not psychology | "Stance Read" uses angle/line language, not "confident" or "relaxed" |
| ZONE 4: Production | Metadata only; no person identity | Serial, edition, batch, triggers are all image-based |
| ZONE 5: Methods | Evidence grounding; no inference beyond visible cues | Receipts cite visible features; no "probably" or speculation |

---

## Part I: Recommendation Summary

### The Smallest Prototype to Prove the Idea

**Phase 1: Entry & De-Duplication (MVP — 3–4 weeks)**

1. **Move Oracle to ZONE 1 entry** (right panel top)
   - Pair with Archetype discovery note
   - Reorder modules 1–4 in renderReadingPanel
   - **Outcome:** Clear mythic frame before stats

2. **De-dupe Stat Reads**
   - Remove duplicate prose from dplate 03
   - Replace with evidence-grounding layer (cue + basis)
   - Add cross-reference to right panel
   - **Outcome:** Dplate 03 becomes "why stats are what they are" (methodology), not storage

3. **Add Zone Headers** (right panel + dossier)
   - ZONE 1: "Oracle & Entry" (right panel)
   - ZONE 2: "Artifact Signals" (right panel)
   - ZONE 3: "Frame Interpretation — Developed" (right panel, Halo-only, container binding)
   - ZONE 4: "Production & Archive" (dossier, header + plates 01/06)
   - ZONE 5: "Evidence & Methods" (dossier, plates 02–05)
   - **Outcome:** Visual clarity; reader knows *what* each zone does

4. **Implement Stat Receipt Cue→Effect Format** (right panel)
   - Split cue (pixel-fact) from effect (artifact reasoning)
   - Cue desaturated; effect full-weight
   - **Outcome:** Clearer Artifact Test; stronger signal hierarchy

**Success metric:** Reader lands on oracle first → understands the card's voice → then scans stats as evidence → then explores depth. No stumbling; no "where should I start?"

---

### Follow-Up (Phase 2: Future)

- **Dplate 05 integration:** Bring Fit + Aura elements together as synthesis prose (avoid duplication of right-panel reads).
- **Dplate 01 reframing:** Consider whether Source Record filing chain should move up as a collectible-identity header (alongside Mint Record dplate 06).
- **Hidden Stat repositioning:** Test whether Hidden Stat (dplate 04) should move pre-Evidence (as "a conditional depth exists") or stay post-Evidence as climax reveal.
- **Formulas visibility:** Consider whether FORMULAS should surface earlier (e.g., dplate 02 header) or stay hidden-by-default in right panel.
- **Card Record header (BR-S085 §4 proposal):** Implement `◆ ARTIFACT RECORD · serial · HALO MINT` as a non-dplate first child of .dossier__inner for unified archive identity.

---

## Part J: Files & Code Touchpoints

### renderReadingPanel (app.js, line 520–683)
- Move oracle to top (reorder modules 1–9)
- Add ZONE 1 header + archetype discovery pairing
- Wrap ZONE 3 modules in .readzone container
- Implement cue→effect format for stat receipts

### renderDossier (app.js, line 706–939)
- Keep plate order (conservative approach)
- Add zone headers between plates
- De-dupe dplate 03 (remove src.reads[k] duplication)
- Add evidence-grounding line to each dstat
- Consider dplate 05 integration (phase 2)

### styles.css
- Add .readzone class for zone binding (right panel)
- Add .dzone class for zone binding (dossier)
- Update .reads__item for cue→effect layout
- Adjust dstat layout for cross-reference + evidence grounding

### data.js (no changes; all logic in rendering)
- Existing src/dossier shapes work as-is
- v2 scan.receipts preferred (already present in fixtures)

---

## Conclusion

The developed reading spreads **14 information types** across 12 right-panel modules and 7 dossier plates. By grouping these into **5 coherent zones** (Oracle & Entry → Signals → Interpretation → Production → Methods) and reordering modules to match this natural reading flow, we create **rhythm clarity without heavy copy rewrites**.

The smallest change (moving oracle to entry + zone headers + stat deduplication) **proves** that layout clarity supports the copy/rhythm fixes identified in BR-S085. The result: reader lands on voice first, then evidence, then depth — not confused by scattered content.

**Status:** Ready for Phase 1 prototype implementation.

---

**Authority:** This inventory is a planning document. Implementation follows the decision-log and GOVERNANCE_OS processes. Zone reordering is safe (no new data); copy improvements require secondary safety review before shipping.
