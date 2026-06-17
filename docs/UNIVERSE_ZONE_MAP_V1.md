# BLUE ROOM — Universe / Zone Map v1

Layer: ACTIVE SPEC · Status: ACTIVE (revisable, not LOCKED) · 2026-06-14

Promotes the scope research (`docs/research/UNIVERSE_MAP_V1.md` · `FREE_PAID_MODEL_V1.md`)
into a working spec: the Archive frame, the five-zone map, the fork decisions, and a hard
line between **what is live** and **what is aspirational** — so no one ships the full
five-zone map prematurely. Implements nothing by existing; each NOW item still graduates
through the normal pre-edit critique, one commit behind `baseline-v1`.

Safety inherits unchanged from `PROJECT_OS` §1/§4, `HUMAN_READ_LINE_V1`, and
`halo/HALO_GATE_BOUNDARY_V1`. The aggregate-refusal wall in §7 is the load-bearing one;
it is folded into the safety canon (`HUMAN_READ_LINE_V1` Forbidden · aggregation).

---

## 1. The frame

> **BLUE ROOM is one Archive.** Not a world, not a game, not a 3D hall — one indexed
> institution with a few flat rooms on a coherent map. You enter through a **Lobby**, work
> a scan at the **Scan Room** bench, and each scan files into a **Card Record**. Later, a
> **Vault** holds the roster of records and a **Codex** holds the class taxonomy and the
> declared lore. The whole instrument runs on one physics — **latent ↔ developed** (Free
> front ↔ sealed Halo back; the photo already held the card; the scan develops it).

**The page is the main dish. The card is the crown + the link.** The room does the deep
work; the card stays compressed (PROJECT_OS §7, LOCKED) and acts as a sealed crest that
**links** — by serial — to the Card Record where all the richness lives. The card never
re-lays-out to hold more; if something wants onto the card, the answer is the record.

**Felt, not traversed.** The universe is carried by *metaphor + structure + the ruled-
instrument design language* (`DESIGN_TOKENS`: Room / Plate / Artifact), never by literal
camera movement. Flat, fast, no WebGL. The whole thing reduces to **~5 zones + one card
component + one axis** — that reduction is the anti-sprawl law, not a nice-to-have.

**Killed at the frame (do not resurrect):** literal 3D / WebGL world · world-above /
below navigation · per-stat "stat realms" · fantasy / game tone · any reading that rates
or ranks the person. (`research/UNIVERSE_MAP_V1` Phase A.)

---

## 2. The five-zone map

The map is a sequence, not a sprawl: **Lobby → Scan Room → Card Record → Vault → Codex.**
For each zone: what it is · what it is for · what exists today · the card's role in it.

### Lobby — `state.view = "menu"` · BUILT
- **What it is.** The front door / threshold into the Archive. The Archive thesis is
  stated here; one complete Free card is shown as the artifact.
- **For.** Entering with intent. It sells **the artifact** (one complete card), never a
  Free-vs-paid compare and never gating.
- **Today.** Built — one complete Free card front + the Archive thesis + trust lines.
  (Menu Re-frame v1 / BR-S041 retired the compare ladder; see `FREE_PAID_MODEL_V1`.)
- **Card's role.** **Lure.** The complete front is the bait; the sealed-back caption is
  atmosphere only ("The front is complete. The same card has a sealed back.") — no counts.

### Scan Room — `state.view = "room"` · BUILT
- **What it is.** The per-scan develop bench: the 3-panel work surface (left = source /
  diagram / metrics · center = the card on its stage · right = the reading).
- **For.** Reading one photo into one card — the repeatable unit of the Archive.
- **Today.** Built — the full 3-panel bench + the 7-plate dossier below the hero
  (PROJECT_OS §2/§5–§10).
- **Card's role.** **Crown forming.** The card develops here on its stage; this is where
  latent → developed happens visibly.

### Card Record — the dossier-below today · PARTIAL
- **What it is.** The dossier *of one card* — its full record, sealed back, provenance
  lineage. Today it lives **below the hero in the Scan Room** (the 7 plates). It is
  *conceptually* the destination the card links to.
- **For.** Holding all the richness the card cannot. This is the **only** Free/paid gate
  (the sealed-back seam) — the gate is concentrated here, never smeared across zones.
- **Today.** Partial — exists as the dossier-below. It does **not** yet have its own
  `/record/{serial}` route or page; that is LATER (§5).
- **Card's role.** **Crowns it, links here.** The card is the crest at the top of its own
  record; the link from any card surface resolves *by serial* to this record.

### Vault — LATER
- **What it is.** The manifest roster of filed cards — a flat logbook (Obra Dinn / Cooper
  Hewitt / Louvre model), each row opening to its Card Record.
- **For.** Browsing the collection once more than a sample exists; the second major zone.
- **Today.** Not built (PROJECT_OS §15 BACKLOG). Aspirational.
- **Card's role.** **Sealed row.** In the Vault a card is a manifest entry — a sealed line
  that opens to the full record, never a re-laid-out mini-card.

### Codex — LATER
- **What it is.** The class taxonomy (archetype classes → families) + the **declared**
  Track-B lore layer (zodiac / numerology / MBTI as *user-declared*, never inferred).
- **For.** Discovery-by-class and the optional lore layer — the two-track attachment law
  (canon: `GOLDEN_NUGGETS` #9; mechanism: Profile Layers, `TASK_QUEUE` Backlog).
- **Today.** Not built. Aspirational.
- **Card's role.** **Class citizen.** A card belongs to a class in the Codex; the class
  **label** may recur as the join, but lore attaches to the *serial* by declaration —
  never read off the photo (the two-track attachment law, `DEPTH_MODEL_V1`).

**Reserved placeholders (X) — present in the structure, fill TBD (builder, 2026-06-17).** Marked only so
sketches/plans include them as existing spots without designing them yet (no code stubs — the §6
premature-ship guard still holds):
- **Codex · blog / journal / notes** — a reading/writing facet within (or beside) the Codex. Reserved-X.
- **Special Readings** — zodiac / Chinese zodiac / numerology, as **its own task/space** (X). Canon-bound: a
  read *fuelled by* a user-DECLARED sign (you give the sign → you receive the read), never inferred off the
  photo (the Codex declared-lore law + `GOLDEN_NUGGETS` #9); object-keyed, the §7 aggregate wall holds.

---

## 3. The fork decisions

Each fork = the chosen branch + its build window. NOW = buildable inside current laws;
LATER = held until its zone or capability exists.

| Fork | Decision | When |
| --- | --- | --- |
| **zone-nav** | A live topbar **zone label** driven off `state.view` ("ARCHIVE · SCAN ROOM" / "ARCHIVE · LOBBY"). NOT a zone-graph, NOT traversable nodes — one label that names where you are. | **NOW** |
| **room-as-place** | **One static floor tone** per inhabited zone — a faint wash (Card Record ≤ 0.35α, no hard edge), so a zone reads as a place without a new layout. Never an accent wash (color is currency). | **NOW** |
| **provenance-arc** | **One class-verb** threaded across Plate 01 close → stat receipts → oracle close; **serial lineage = the address** (Object → Scan → Card → Mint). The colophon capture date on Plate 06 is the later beat. | **NOW** (verb thread) / **LATER** (colophon date) |
| **free/paid** | **One back-seam at Card Record** — the single gate. Cut the blanket `ARCHIVE PULL` plate tag (the smeared gate). | **NOW** |
| **develop-flip** | The develop transition = a **clip-path develop-wipe**, a CSS enhancement layered *over* `render()`, reduced-motion-gated, `@supports`-fenced, additive. | **LATER** |
| **card-as-link** | The card **never re-lays-out**; it links **via serial** to the Card Record page where all richness lives. The card is a crest + a link, not a container. | LOCKED principle — applies NOW; the *route* it links to is LATER |

---

## 4. Card-as-link (the principle that holds the map together)

The card is the recurring object across every zone — Lobby lure, Scan Room crown, Vault
row, Codex class citizen. It stays the **same compressed component** in all of them. It
carries this load by being a **link**, not a container:

- **Identity = serial.** Every card resolves to its record by serial (`Object → Scan →
  Card → Mint` lineage; `DEPTH_MODEL_V1` / `LAYERING_MODEL_V1` serial spine). The serial
  is the address.
- **No re-layout, ever.** Adding richness means adding it to the **record**, not the card
  (PROJECT_OS §7, LOCKED). The Vault row, the Codex entry, the Lobby sample are all the
  one master card — re-skinned per zone state, never re-shaped.
- **One axis.** The card's two faces (complete front / sealed back) *are* the Free/Halo
  physics. The link to the record is the act of turning it over — reached by intent,
  downstream, after free value lands (`HALO_GATE_BOUNDARY_V1`).

This is why the five-zone map does not sprawl: every zone reuses one component + one axis,
and depth always lives at the **end of a link** (the record), not on the object.

---

## 5. Build now vs later

**NOW** (buildable inside current laws; each via pre-edit critique, one commit behind
`baseline-v1`):

1. **Topbar zone label** — off `state.view` (zone-nav fork).
2. **Room → record threshold rule + counting spine** — fold into the Dossier de-dull;
   make the dossier read as *the record of this card*, not loose plates below the hero.
3. **"Archive" cosmology copy** — the frame stated in Lobby + room chrome.
4. **Cut the blanket `ARCHIVE PULL` plate tag** — un-smear the gate (free/paid fork).
5. **Provenance verb thread** — one class-verb across Plate 01 close → receipts → oracle.
6. **Floor washes** — one static tone per inhabited zone (room-as-place fork).

**LATER** (held until the zone / capability exists — do **not** fold in early):

- **Colophon capture date** on Plate 06 (provenance-arc tail).
- **Clip-path develop-wipe** (develop-flip fork).
- **Card Record route** — the own `/record/{serial}` page (today: dossier-below only).
- **Vault** — manifest roster zone.
- **Codex** — class taxonomy + declared-lore zone.
- **Zone-graph nav** — any traversable multi-node map (the topbar label is the only
  navigation the frame sanctions now).

---

## 6. What is live vs aspirational (read this before building)

**The map is a map, not a ship-list.** Three zones are not built. Do not build the
five-zone universe as a unit — build the NOW items into the two zones that exist.

| Zone | Status | The honest line |
| --- | --- | --- |
| Lobby | **LIVE** | Built; receives the zone label + cosmology copy. |
| Scan Room | **LIVE** | Built; receives the floor wash + verb thread + de-dull. |
| Card Record | **PARTIAL** | Lives as the dossier-below today. The `/record/{serial}` route is **aspirational** — do not stub or imply it. |
| Vault | **ASPIRATIONAL** | Backlog. No manifest, no roster, no row-state. |
| Codex | **ASPIRATIONAL** | Backlog. No taxonomy page, no lore layer. |

**Premature-ship guard.** A surface may name the Archive cosmology and the zone it is in;
it may **not** render navigation to, links into, or stubs of Vault, Codex, or a standalone
Card Record route until those zones are actually built. The map informs direction; only
the LIVE/PARTIAL zones may be touched in code. (GOVERNANCE_OS §3 promotion funnel: this
spec is the promotion of the universe research — the *aspirational* zones remain BACKLOG
in PROJECT_OS §15 and are not promoted by this doc.)

---

## 7. The aggregate-refusal wall (load-bearing — folded into the safety canon)

The universe map ends at one hard wall. The five-zone Archive is a structure for filing
**single reads of single photos**. The moment scan outputs can be joined by a person, the
Archive becomes a dossier *about a human* — which is the harm. This wall is what makes the
"weight on the internet" gate honest, and it is the architectural law that bounds the
whole map:

> **No scan output may be joined by an uploader / person key.** Archetype, hidden stat,
> and aura are re-derived **fresh per scan** — never carried forward, never accumulated.
> There are **no streaks, no counts, no history** across a person's pulls. The cross-pull
> surface (Vault, Codex, any future roster) must be **structurally incapable** of
> reconstructing a stable trait from many reads of one person. Single-read safety can be
> true while the *accumulation* is the harm; the wall is around the aggregate, not the
> read.

**Status of the wall.** Single-read is enforced today (no upload, no backend, no person
key exists). The **aggregate layer is the unbuilt wall** — it must ship *with* the
uploaded-photo engine, never after. Vault and Codex (§2, LATER) are exactly the surfaces
where a person key would be tempting; they may not be built with any uploader join. The
serial is an **object** address (Object → Scan → Card → Mint), never a person address.

See the §7 blockquote above for the canon-ready rule text (originated as `aggregateRule`,
this session's structured output) to fold into `HUMAN_READ_LINE_V1` Forbidden · aggregation,
where it is currently named as the unenforced harm. Revisit condition: when the uploaded-photo engine is built — the
aggregate guard ships in the same change, or the engine does not ship.

---

**Authority note.** This is an ACTIVE, revisable spec. The frame (§1), the LIVE/PARTIAL/
ASPIRATIONAL split (§6), and the aggregate-refusal wall (§7) are the load-bearing parts —
§7 is LOCKED-grade by inheritance from the safety canon and may not be relaxed by any
downstream universe / Vault / Codex task. Zone naming, copy, and fork tuning are
revisable; the no-aggregate / no-premature-ship / no-person-key rules are not.
