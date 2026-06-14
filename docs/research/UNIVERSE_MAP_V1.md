# BLUE ROOM — Universe Map v1 (scope research)

Layer: RESEARCH (informs, never implements — GOVERNANCE_OS §3). Date: 2026-06-14.
Source: a White Death pass — Phase A AUDIT of the "BLUE ROOM universe" vision against
the existing product/laws, then Phase B SCOUT (6 cheap scouts + Opus bar-holder) for
fast/no-slob inspiration on the survivors. **Maps the bigger potential scope; approves
nothing.** Each piece graduates via the normal pre-edit critique, one commit behind
`baseline-v1`.

**Headline:** the win is **not** a literal 3D / above-below / flipped *world* (that was
the heavy/slob trap that got killed). It is **one "Archive" universe → a few flat zones
on a coherent map → the latent↔developed flip as its physics** — sophisticated, but a
fast site that reduces to ~5 zones + one card component + one axis.

---

## Phase A — AUDIT (the vision, judged against ground truth)

**The bar.** Governing facts: BLUE ROOM is a fast, no-build, plain HTML/CSS/JS premium
**archive instrument** (photo → developed card → scan room); the card is the hero; it
reads the photo, not the person. The user wants a *sophisticated universe* but **not
slob, still fast, ultimately optimized & simplified** — so "universe" = structure +
metaphor + flat technique, never a heavy 3D game world.

**Kill-gates (any fail = KILL):** G1 buildable fast / no mandatory WebGL-3D-engine ·
G2 compatible with LOCKED laws (one master card, restyle-not-relayout, only-the-card-
has-depth, engineered-archive not soft-SaaS / not a videogame) · G3 serves a real
existing/roadmap funnel (not vanity) · G4 reduces to a simplified navigable structure
(anti-sprawl).

| Candidate | Maps to | Verdict | Conf | Why |
|---|---|---|---|---|
| **"The Archive" universe frame** (darkroom cosmology) | the unifying metaphor over everything | KEEP | High | The spine that makes a universe cohere with no new tech; framing + copy + nav. |
| **Funnel-as-zones** (Intake → Develop → Card → Dossier → Vault, as locations) | the current flow, reframed as a map | KEEP | High | Highest leverage / lowest cost; organizes what exists and *reduces* sprawl. |
| **Front door / lobby** (main menu) | entry to the archive | KEEP | High | Exists; becomes the threshold. |
| **The Scan Room** (per-card develop bench) | the workroom; one room per scan | KEEP | High | Exists; the repeatable unit. |
| **Vault** (collection of minted cards) | roadmap backlog; second major world | DILUTE | High | Real place to build — lean flat grid + card states, not a 3D hall. |
| **Card-as-record = its own world** (enter a card → dossier + sealed Halo back) | existing dossier + Halo back | DILUTE | High | "Card universe" already exists as depth into the record; build that, not a 3D card-world. |
| **Profile = user-declared Codex/lore** (never inferred) | roadmap profile layer | DILUTE | Med | Real scope, only as user-provided lore (law); optional, lean. |
| **Flip axis as universe "physics"** (latent↔developed = Free↔Halo; front↔sealed back) | already powers Free/Halo + Halo gate | IDEA-ONLY | Med | Beautiful organizing concept ("flipped universe") — already the develop axis; keep as cosmology, don't build a literal mirror world. |
| **Archive-by-class browsing** (archetype/class as shelves) | future discovery once vault populated | IDEA-ONLY | Med | Good later; sprawl risk now. |

`KILLED: 5` — literal 3D/WebGL universe (heavy dep) · literal world-above/below
navigation (vanity sprawl) · per-stat "stat worlds" (sprawl + personality-realm risk) ·
literal multi-world nav (resolved below) · fantasy/game tone (breaks archive + reads-
photo-not-person).

**"Tabs vs worlds" — resolved:** **flat, fast tabbed/zoned navigation carrying spatial
*language* and a coherent map — not literal traversable worlds.** The universe is *felt*
through metaphor + structure + the "ruled instrument sheet" design language, and stays
optimized/simplified.

---

## Phase B — SCOUT (fast/no-slob inspiration for the survivors)

17 survivors / 1 kill, grouped by the concept each serves. Verdict · how it builds.

### ① The Archive (frame / cosmology)
- **Museum Department** (museumdepartment.com) — frame the whole thing as *"an indexed
  archive,"* flat nav of named exhibition rooms, per-zone counts, institutional tone.
  KEEP · flat CSS; closest structural twin to the laws.
- **Acne Paper** (acnepaper.com) — name each zone/card-class cosmologically (chapters,
  not DB rows). DILUTE · the naming convention only.

### ② Zones (flat navigable map)
- **Pentiment manuscript map** (gamedeveloper.com deep-dive) — an **SVG zone-graph**
  (named nodes + path connectors) read as a turned page, not a rotated camera. KEEP ·
  SVG + CSS.
- **CSS view-timeline zone gates** (smashingmagazine.com scroll-driven intro) — a
  zero-JS **persistent zone-map / HUD breadcrumb** driven by scroll position
  (progress-as-place). KEEP · pure CSS, progressive-enhancement.
- *Refinements (DILUTE):* tympanus sticky sections (cosmology naming) · scroll-snap
  parallax zones · Scrollama sticky-card-anchor.

### ③ The Vault (collection — flat & fast)
- **Obra Dinn logbook** ⭐ (pop-archives.com) — a **manifest roster** of sealed cards
  that each open to a full record. KEEP · the single strongest lift: serves Vault +
  Card-Record + Flip at once, and it *is* the Free-front / Halo-sealed-back logic.
- **Cooper Hewitt** (collection.cooperhewitt.org) — proven **grid-browse + object-page
  dossier** two-template system (200k objects). KEEP · flat HTML/CSS.
- **Louvre typology** (collections.louvre.fr) — browse-the-vault **by class** via URL
  params, no JS. KEEP.
- **Wellcome classification stamp** (wellcomecollection.org) — a provenance chip:
  type → ref-code → title. KEEP · one CSS chip.

### ④ Card-as-record (entering a card = its dossier)
- **Cross-document View Transitions** (css-tricks.com part 2) — a thumbnail→dossier
  **zoom morph**; one wildcard rule scales to unlimited vault cards (anti-sprawl).
  KEEP · CSS opt-in, graceful fallback. (Plus Obra Dinn + Cooper Hewitt above.)

### ⑤ The flip axis (latent ↔ developed — the universe's physics)
- **clip-path develop wipe** ⭐ (emilkowal.ski/ui/the-magic-of-clip-path) — a negative
  layer wipes to reveal the developed print beneath; metaphor = mechanic, matches the
  locked darkroom thesis. KEEP · clip-path + 1 CSS var.
- **Pure-CSS card flip** (dev.to/auroratide) — lift + rotateY, depth confined to the
  card (honors only-the-card-has-depth). KEEP · <50 lines CSS.
- **invert/grayscale filter toggle** (css-tricks almanac/invert) — cheapest two-state
  latent/developed. KEEP · <20 lines.

`KILLED: 1` (soft-SaaS pixel-dissolve, no inspectable dual-state). *IDEA-ONLY held:
infinite draggable grid (sprawl/videogame risk) · Disco Elysium card grid (reads-the-
person frame — technique liftable, metaphor stripped).*

---

## Synthesized scope (the precise picture)

> **BLUE ROOM is one Archive.** Enter a **Lobby** → move along a **flat zone-map**
> (Scan Room · Card Record · Vault · Codex) → each card is a **sealed manifest entry
> that opens into its record** → the whole thing runs on one **physics: latent ↔
> developed** (Free↔Halo, front↔sealed-back). Everything is CSS/SVG/light-JS, no WebGL,
> no slob — and it reduces to ~5 zones + one card component + one axis.

The literal 3D/flipped/above-below *worlds* were the right instinct at the wrong
implementation: the **map + manifest + flip-physics** deliver the same "universe"
feeling without the heavy machinery.

## How to pull
Each survivor is an independent, fast, law-compatible building block. Pull one when a
surface needs it → normal pre-edit critique → one commit behind `baseline-v1`. Open
follow-on question (its own research): **how the Free/Paid lines cut across this
universe (design / data / visual / funnel / zone)** — see the free/paid model research.
