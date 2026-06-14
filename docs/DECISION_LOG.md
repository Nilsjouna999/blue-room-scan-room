# BLUE ROOM — Decision Log

Format: **Date / Decision / Status / Why / Revisit condition**
Newest entries at the bottom. Log a new entry *before* making a change that
contradicts an existing one.

---

**2026-06-12 / One master card base / LOCKED**
Why: the product is a consistent collectible system; per-photo layouts would
destroy the "same system, personal result" magic and multiply maintenance.
Revisit: only if a future card-family system (CARD_TECH_LAB §17) proves it
can keep master geometry while skinning families — and even then, geometry
stays singular.

**2026-06-12 / PC-browser-first / CURRENT**
Why: the desktop scan room (left/center/right) is the experience being
validated; mobile-first would force compromises before the direction is
proven. Mobile remains a basic stacked fallback.
Revisit: after the desktop experience passes the "I want my own card" test.

**2026-06-12 / Two-source prototype only / CURRENT**
Why: two real photos (Driver, Ice Field) are enough to prove the master
system produces personally different cards; more sources add content work,
not learning.
Revisit: when a new photo type would test something the current two cannot
(e.g. studio fashion, night/party).

**2026-06-12 / No upload, backend, login, checkout, database yet / LOCKED (for V1 phase 1)**
Why: the test is visual/emotional ("does the card have aura?"), not
technical; backend before that answer is overbuilding.
Revisit: phase 2 (local upload preview) only after the visual direction
works — see PROJECT_OS §15 roadmap.

**2026-06-12 / Keep Presence / Frame / Signal / Charge / CURRENT**
Why: audited 2026-06-12 — each reads a photo quality, none carries
face-rating energy, all four are screenshot-friendly, values hold for both
sources. Formulas explain them without renames.
Revisit: if real users consistently misread a name (especially "Charge" or
"Signal").

**2026-06-12 / Left tabs = Source / Diagram / Metrics / CURRENT**
Why: separates "what photo is read" / "how it was read" / "why the stats
happened" without cluttering one view; tabs keep the panel calm.
Revisit: if testing shows users never open Diagram or Metrics.

**2026-06-12 / Card stays compressed / LOCKED**
Why: the card is the trophy; diagrams, graphs, formulas, and long prose on
the card would turn it into a report and kill the screenshot.
Revisit: effectively never — additions go to the scan room instead.

**2026-06-12 / Site carries the depth / LOCKED**
Why: the scan-room-around-the-artifact structure is the product thesis; it
is what separates Blue Room from a card-generator widget.
Revisit: effectively never.

**2026-06-12 / Free / Signature / Halo treatment split / CURRENT**
Why: three tiers prove the upgrade ladder: archive scan → developed
artifact → rare pop. Free deliberately un-magical so paid feels obvious.
Revisit: when the treatment ladder is redesigned (see CARD_TECH_LAB §5) —
tier names and count may change; the restyle-not-relayout law does not.

**2026-06-12 / No face-rating, ever / LOCKED**
Why: the product reads photos, not faces; attractiveness scoring is a
different (worse) product and a reputational trap.
Revisit: never.

**2026-06-12 / Profile layers are future, user-provided, not inferred / CURRENT (BACKLOG feature)**
Why: "the photo creates the card; the profile adds the lore" — inferring
MBTI/zodiac/etc. from a photo would be fake certainty and creepy; declared
layers are lore, not claims.
Revisit: when profile layers move out of backlog.

**2026-06-12 / Signature Mint is no longer the main paid visual tier / CURRENT**
Why: as the visible paid upgrade it was too subtle — a middle skin, not an
obvious transformation. The main paid direction is now a dramatic
transformed card state ("Halo Mint"), currently represented by the Halo
prototype visuals, but the final Halo design is not locked. Signature Mint
becomes an internal Lab state (keyboard `M`): its silver material survives
as a source for Free Pull polish and the final paid material.
Revisit: if testing shows users want a quieter paid default beneath the
transformed tier.

**2026-06-12 / Customer-facing hierarchy is two-tier: Free Pull / Halo Mint / CURRENT**
Why: preview vs. developed is the clearest purchase story; "mint" doubles
as the verb ("Mint this scan"). Future variants (Black Star, Cold Foil,
Night Gloss, Archive Foil, Static Mint, Mythic Prism) sit above/beside Halo
Mint later — BACKLOG.
Revisit: when the first rare variant ships.

**2026-06-12 / Scroll dossier added below the hero / CURRENT**
Why: the hero proves the card; the dossier deepens it. Seven plates max
(Source Record, Evidence Board, Stat Dossier, Hidden Stat, Fit + Aura,
Mint Record, Oracle Read), ordered factual → playful. Free reads as
undeveloped archive material ("archive pull", "development pending") —
paywall language (locked/upgrade/premium) is banned.
Revisit: if the dossier bloats past 7 sections, cut, don't grow.

**2026-06-12 / Halo Mint material is per-source / CURRENT**
Why: one generic glow for every photo contradicts "earned by the image."
Materials derive from the photo: SRC 01 = Warm Glass Copper (red jacket,
cabin warmth), SRC 02 = Cold Prism Frost (snow, hard sun). Implemented as
accent variables on the same effect system — no new layouts.
Revisit: when the final Halo material is chosen (CARD_TECH_LAB §20), the
per-source principle stays even if the palette changes.

**2026-06-12 / Old three-tier structure formally retired / CURRENT**
Why: "Free Pull / Signature Mint / Halo Foil" is retired as a visible
structure (see the two hierarchy entries above). "Signature" survives only
as internal mint/signature language — signature line, signature mark,
archive signature, mint record. Halo Mint is the developed
treatment/result, not just a skin.
Revisit: with the rare-variant ladder (CARD_TECH_LAB §5).

**2026-06-12 / Primary CTA committed: "Develop this scan" / CURRENT**
Why: fits the darkroom metaphor — the photo already contains the card;
develop is the action, Halo Mint is the result. Subline: "Into Halo Mint ·
full dossier · mint record." Banned as primary: "Develop into Halo Mint",
"Upgrade", "Unlock", "Premium", "Reveal premium".
Revisit: only with real conversion data.

**2026-06-12 / Copy System adopted as product grammar / CURRENT**
Why: UI copy was drifting. docs/COPY_SYSTEM.md now governs tone (archival
deadpan), humor, banned words, the 12-archetype library, and the
every-outcome-is-a-win rules. SRC-01 = The Encounter; SRC-02 = The
Dispatch.
Revisit: the library grows when new sources need a class that doesn't fit.

**2026-06-12 / Compact Governance OS + research hierarchy adopted / CURRENT**
Why: docs and research were starting to outrun the product. Four authority
layers (CORE LAW / ACTIVE SPECS / RESEARCH / ARCHIVE), four statuses
(LOCKED / ACTIVE / DRAFT / RETIRED). `docs/research/SPINE.md` is the
top-of-research layer; raw research cannot directly cause code/product
changes — it flows raw → SPINE → active spec → implementation. Confirmed
product split: Free Pull = cheap/low-cost preview; Halo Mint = deeper
AI-developed pass; paid may differ from free but must not contradict
visible facts established by Free.
Revisit: if the funnel adds more friction than it removes for a solo builder.

**2026-06-12 / Stat visibility resolved: 4 free / deeper Halo / CURRENT**
Why: SPINE proposed 6 main stats; PROJECT_OS holds 4. Resolution (in
SCAN_ENGINE_SPEC): Free Pull shows exactly Presence/Frame/Signal/Charge —
cheap, stable, screenshot-simple. Halo/dossier reveals Lore Density, Fit
Coherence, Gesture Authority (conditional on visible gesture evidence)
and Visual Impact (derived, never independently scored). Rarity is a
lens, never attractiveness. First SPINE promotion completed same day
(5 specs).
Revisit: if real users consistently ask what a deeper stat means in Free.

**2026-06-12 / Current Halo Foil is prototype-only, not final shiny design / TESTING**
Why: it proves a paid treatment can pop in-browser (holo edge, halo,
particles, shimmer) but it is an effect bucket, not a card material — it
lacks a distinct material identity and a "why this card became Halo" logic.
Final shiny direction is being explored in `docs/CARD_TECH_LAB.md`
(candidates: Cold Foil, Black Star, Night Gloss, Signal Halo, …).
Revisit: after the three alternative shiny treatments are prototyped and
compared (CARD_TECH_LAB §20).

**2026-06-13 / Artifact Language Stabilization v1: public stats are artifact-safe LABELS shown as TIER BANDS, not 0–100 / CURRENT (Core Change)**
Why: research (`docs/research/RESEARCH_COMPRESSION_V1.md`, `LANGUAGE_SYSTEM_V1`)
and the artifact-language sweep flagged "Presence" and "Charge" as
person/status-adjacent and bare public 0–100 numbers as score-framing that
reads like rating a person. The sample room now **displays** the four public
stats as **Frame Presence / Frame / Signal / Scene Charge** and as **tier
bands** (Muted → Clean → Strong → Charged → Peak), never as 0–100. Internal
data **keys** (`presence/frame/signal/charge`) are unchanged for stability;
this is a display/label change only (app.js `STAT_LABELS` + `tierBand()`).
Also: Gesture Authority → **Gesture Geometry**; "Visual Impact" module →
"Frame Impact"; evidence-board deltas `+N`→`↑/↓`; fitMatrix "Person"→"Subject";
banned-language sweep (confidence/Affect Trace/Unhurried/Methodical/"route has
standards"/"scene ownership"). **Supersedes** the 2026-06-12 "Keep Presence /
Frame / Signal / Charge" decision and the "show as numbers" convention.
**Ratifies one authoritative public tier ladder — Muted/Clean/Strong/Charged/
Peak** — superseding `CARD_LOGIC_V1` §2 (QUIET/PRESENT/STRONG/DOMINANT/TOTAL)
and the `FREE_PULL_SCREENSHOT_LAYOUT_V1` §7 recommendation; both specs updated
to match. **Carve-out:** the dev-only `?dev=uploaded-result` / `uploaded-blocked`
renderer harness intentionally keeps the legacy labels + 0-100 + `+N` deltas to
exercise the legacy render path (strictly dev, "NOT USER SCAN"); and the
Metrics-tab interpretive diagnostics (signal-mix recipe, composition pressure,
fit-coherence matrix, "subject lock") keep their numbers — they are captioned
"interpretive formula, not a measurement", not the four public stat scores.
PROJECT_OS §7/§9/§10 updated in the same commit (Core Change Review).
Revisit: if users misread a band, or when a deterministic engine assigns
calibrated band cut points (current cuts are provisional).

**2026-06-13 / Halo Gate Boundary Lock v1 / LOCKED**
Why: lock the honest Free/Halo boundary before Halo UI. Free Pull = complete
card front; Halo = sealed card back/dossier of the *same* card — added depth,
not a hidden real score / re-roll / rarity chase. The Free front + pre-unlock
gate must **NOT** show exact locked counts (a withheld-inventory read); use
qualitative sealed-back language — exact counts only post-unlock. Halo earns its
price by artifact depth, never urgency / chance / loot-box / person-truth. Full
rules, copy bank, and the supersession of earlier pre-unlock count guidance:
`docs/halo/HALO_GATE_BOUNDARY_V1.md` (§H). Docs only — no runtime change.
Revisit: if the qualitative hint reads as empty, add a non-enumerated proof
line — never an exact count.

**2026-06-14 / Base-Hex + Warm-Ramp Lock v1: base hex locked to `#0a0b0d`; `--t-*` is the one warm "Sand" ramp; cool `--vault-*` killed / ACTIVE (Spec Change)**
Why: the foundation lock `RESEARCH_SYNTHESIS_V1` (build-now list) gates all
contrast/type work on — "font-roles + tabular numbers + one-focal-point *after*
locking one base hex + one warm ramp". Canon (synthesis "Base background
mismatch") locks **one base hex `#0a0b0d`**, resolving a three-way mismatch:
Vault ratios were computed on `#0c0d10`, the depth model ships `#0a0b0d`, and
`styles.css` shipped `--ink-950: #0a0907`. **Resolution: lock `#0a0b0d`** as the
base floor (`--ink-950`) — it is both the canon value and the explicit task value.
**Noted tension (logged, not hidden):** `#0a0b0d` is faintly cool (B `0d` > R `0a`)
while the synthesis "warm vs cool surfaces" resolution mandates warm-neutral for all
non-frost surfaces. Accepted ONLY as the deepest room-shadow FLOOR (luminance < 1%,
visually neutral; the warm `#161411`→`--ink-900` body field and the warm Sand text
ramp keep the room warm); warm-neutral still governs every lighter surface and all
text. The single canonical warm text ramp is **`--t-display/primary/body/meta/ghost`**
(`#e9e5dc → #6e6b63`), affirmed UNCHANGED as the "Sand" ramp. The cool **`--vault-*`**
alternative (`docs/research/TEXT_EYE_TRAVEL.md`) is **killed** — it was never
implemented (defined nowhere in styles.css/app.js/data.js) and is overruled by the
warm-neutral resolution; TEXT_EYE_TRAVEL annotated SUPERSEDED. `DESIGN_TOKENS.md`
backfilled with the locked base hex + the warm Sand ramp in the same commit.
**Scope (narrowed from the "Token Foundation Lock v1" prompt by the mandatory pre-edit
critique, NARROW_SCOPE):** only `--ink-950` changed (`#0a0907`→`#0a0b0d`); no other
token value, no layout/copy/route change. **DEFERRED to TASK_QUEUE, gated behind this
lock:** (1) *Tier-ratio re-derivation v1* — re-derive the upper `--ink-*` stops + the
public tier-band ratios against `#0a0b0d`; **must preserve the LOCKED Muted/Clean/
Strong/Charged/Peak ladder** (2026-06-13). (2) *Plate-bg consolidation v1* — unify only
the base/default `.card__plate` gradient; **must preserve the LOCKED per-source Copper/
Frost material plates** (2026-06-12) + the frost cool carve-out; the engraved
text-shadow re-tune is its last step (the shadow tunes to the locked plate). No CSS
shadow PAIR exists today and none was invented.
Revisit: if the deferred tier-ratio re-derivation shows the cool floor reads cold under
the warm mids, warm `#0a0b0d` to a warm-neutral near-black at the same luminance and
re-log.

**2026-06-14 / Human-Read Line v1 — image-act vs permanent (3-gate) / ACTIVE (revisable)**
Why: the literal "reads the photo, never the person" would ban the posture/gesture/role reads
that are the product's soul (builder correction — "we should not become only a camera lens").
Refined: read the IMAGE-ACT (what the human performed in THIS frame — re-authorable by reshooting:
posture, gesture, gaze, styling, the role), never the PERMANENT (fixed worth/identity/biology). A
read is allowed only if it clears 3 gates — (1) re-authorable CUE (not body/face/build), (2) the
grammatical SUBJECT is the photo, (3) CONNOTATION-STRIP (predicate isn't a stable disposition) —
and the wall holds at the AGGREGATE layer too (many pulls of one person must not reconstruct a
trait). Full spec + ruby-tier readings + raw→user-facing transformation: `docs/HUMAN_READ_LINE_V1.md`.
Supersedes the too-absolute reading of "never the person". NOTE: this is the RULE; it is currently
ASSERTED, not enforced — validator/copy/aggregate gaps logged in TASK_QUEUE (safety-critical).
Surfaced + adversary-tested via the `/gods-finger` pass.
Revisit: when the uploaded-photo engine is built (the aggregate guard ships with it).

**2026-06-14 / Universe/Zone Map v1 committed + aggregate-refusal wall recorded / ACTIVE (revisable; §7 LOCKED-grade by safety inheritance)**
Why: promotes the universe-scope research (`research/UNIVERSE_MAP_V1`, `FREE_PAID_MODEL_V1`)
into a working ACTIVE spec — the Archive frame, the five-zone map (Lobby/Scan Room/Card
Record/Vault/Codex), the fork decisions, and the LIVE/PARTIAL/ASPIRATIONAL split (§6
premature-ship guard) — and records the load-bearing §7 aggregate-refusal wall: no scan
output joined by an uploader/person key; archetype, hidden stat, and aura re-derived fresh
per scan; no streaks, no counts, no history across a person's pulls; the serial is an OBJECT
address (Object → Scan → Card → Mint), never a person address. Single-read is enforced today
(no upload/backend/person key exists); the aggregate layer is the UNBUILT wall — it ships
WITH the uploaded-photo engine or the engine does not ship. A safety floor, asserted-not-
enforced; it gates the future "weight on the internet" reach, not a moat. Aspirational
Vault/Codex stay BACKLOG (PROJECT_OS §15; not promoted by this doc — GOVERNANCE_OS §3 funnel
respected). Docs only — runtime untouched. Two internal section-ref errors in the spec fixed
in the same commit (§6→§7 for the wall; PROJECT_OS §3→§15 for the Vault/Codex backlog).
Revisit: when the uploaded-photo engine is built — the aggregate guard ships in the same
change, or the engine does not ship.

**2026-06-14 / Live-artifact skeleton map adopted (`docs/map/`) / ACTIVE (maintained reference)**
Why: the built artifact needed a granular "you are here" structural map — the DOM shell, the runtime state
machine, the rendered surfaces, and the code structure — so any session knows where a thing lives and renders.
Five docs (`00_INDEX` + `01_PAGE_SKELETON` / `02_VIEWS_AND_STATE` / `03_SURFACES` / `04_CODE_MAP`), grounded in
real code (cited identifiers + file:line). Distinct from `UNIVERSE_ZONE_MAP_V1` (concept zones) and `FILE_MAP`
(file router) — this maps what the code DOES. Built via a 6-agent grounded workflow (4 layer-mappers + accuracy
verifier); the verifier's 3 corrections were applied and spot-checked against real code. Docs only; runtime untouched.
Revisit: keep current — re-verify the affected doc on any structural change (DOM/state/surface/code), per
`docs/map/00_INDEX.md` "Keep in sync".

**2026-06-14 / Security review playbook staged (`docs/security/`), pass deferred until greenlit / ACTIVE (run on greenlight)**
Why: ready an ordered, gate-by-gate security go-through so a future security pass is pre-defined, not invented
under deadline — and flag the live + future things-to-check now. `docs/security/SECURITY_REVIEW_PLAYBOOK.md`
records the honest posture (static prototype: no backend/upload/secrets/payment today; the real attack surface is
FUTURE), a 7-step ordered sequence with pass/fail gates, an append-only findings register (10 seeded rows, most
N/A-today), and re-run triggers. The §2.5–§2.6 red lines (validator wiring, the §7 aggregate wall, server-side
trust boundary, no client secrets, CSP) are NOT relaxable by this doc — they inherit from `UNIVERSE_ZONE_MAP_V1`
§7, `HUMAN_READ_LINE_V1`, and `halo/HALO_GATE_BOUNDARY_V1`. A clean run records "the gates were walked," never
"the code is secure." Docs only; no scan run, no runtime change.
Revisit: run the playbook (and re-trigger per its §4) before wiring the uploaded-photo engine / any backend /
payment / first public deploy, or on any new param/external script/`innerHTML`/`esc()`/contract change.
