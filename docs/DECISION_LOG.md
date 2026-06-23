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

**2026-06-14 / Dossier de-dull: counting spine + threshold + CUT the blanket plate tag / ACTIVE (impl of a researched fix)**
Why: the 7-plate dossier read as loose equal-gravity plates, not one record. Per `LAYUP_RESEARCH_V1` Task #3
(dossier half) it now reads as THE RECORD OF THIS CARD via flat line+number+type only — a pinned 44px left
counting spine (the numeral gutter), a 2px `--line-strong` room→archive threshold rule + a flanked `.dossier__cue`
label, and 2px `--line-strong` LEFT ledger edges on the LOUD plates 04/07. `.dplate` became a `44px 1fr` grid
(numeral → `.dplate__spine`, head+body → `.dplate__body`) while STAYING the direct child of `.dossier__inner`, so
the `:nth-of-type(1/4/6/7)` rhythm is preserved — LAYUP §5's literal "wrap each plate in a row" was deliberately
NOT followed (it would break the rhythm). **Tag decision:** the blanket per-plate `ARCHIVE PULL / DEVELOPED` tag
was **CUT** (not de-chromed) — it smeared the single back-seam gate that `UNIVERSE_ZONE_MAP_V1` §3 concentrates at
Card Record, and its shiny variant was a per-plate accent-budget violation. **This supersedes
`LAYUP_RESEARCH_V1` §5's "de-chrome dplate__tag to ghost mono" line**, per the ZONE_MAP §3 free/paid fork;
free-vs-developed state stays legible via existing per-plate copy. The Halo Oracle (07) left edge is now the one
sanctioned surround accent (per-source tint ≤30%); plate-06's mint gradient + shiny tint were flattened so accent
lives only there. Built + adversarially verified via a 12-agent workflow (the verifiers caught a real CSS cascade
bug — the accent would have lost specificity to the LOUD rule — and a desktop oracle-centering break, both fixed);
runtime-verified in-browser, no data.js change.
Revisit: with Right polish (LAYUP #3b) and the deferred top-edge shutter reveal (Engineered Technique Pass #2).

**2026-06-15 / Halo Dossier Schema v1 — data shape for the sealed card back / ACTIVE**
Why: `HALO_GATE_BOUNDARY_V1` §D listed the 7 production-note modules as "define; do NOT build."
This schema is that definition — the field-level contract the future dossier renderer, fixture
upgrade, and validator must satisfy, written before any runtime work so the schema, not the build,
draws the boundary. The 7 modules (The Read · Strongest Lever · Three Active Levers · Keep This ·
Two Variant Routes · One Reduce · Next Pull Setup) are each framed strictly as **artifact production
notes / image reads** — never person-truth, never self-improvement, never "better you." Extends the
existing `data.js` `dossier.*` predecessor shape (record · evidence · statNotes · hidden · mint ·
oracle) with the new `modules.*` object. LOCKED safety rules (§4.1–4.7 of the schema): framing law
(image-only / Artifact Test); variant language law (another card, never a better self); Next Pull law
(camera choices only; no "stand differently / look more confident"); inflate-never rule (count only
confidently evidenced levers / routes); oracle safety (mythic flavour, never an identity claim);
safetyFlags gate (all five must be false to render). Free/Halo reveal table (§3) governs what
lives where: module bodies, lever counts, and full evidence are post-unlock only; the Free front
and Halo Gate get qualitative sealed-back language per `HALO_GATE_BOUNDARY_V1` §B/§C.
Runtime unchanged — data.js, app.js, styles.css untouched.
Revisit: when the dossier renderer is built (separate task) — the `modules.*` field migration to
both sample fixtures is its prerequisite. Extend `scan-contract.js` with a `validateHaloDossier`
export at the same time.

**2026-06-15 / Tier-ratio re-derivation v1: `--ink-900` re-anchored to `#100f0c` vs the locked base / ACTIVE (gated follow-up to Base-Hex Lock v1)**
Why: the deferred tier-ratio task (gated behind BR-S039). Against the new HIGHER locked base `#0a0b0d`,
legacy `--ink-900` `#0d0c0a` was a near-invisible +0.00037-luminance step whose HSL-L equalled the base —
collapsing the floor→body separation, and it read faintly cool. Re-anchored `#0d0c0a → #100f0c`: re-warms
(R `10` > B `0c`, warm-neutral per the lock's own revisit clause) and restores a strictly monotonic warm
ramp (lum 950 0.00333 → 900 0.00478 → 850 0.00519 → 800 0.00663 → 700 0.00996, all ascending). **NARROW_SCOPE:**
only `--ink-900` changed; 850/800/700 are already warm-neutral above the floor with no AA-critical text, left
as-is. `--ink-900` doubles as dark-on-light chip text — re-verified AA in-browser: **15.25 / 11.02 / 5.97:1**
on `--silver-bright` / `--silver` / `--silver-dim` (all clear AA 4.5; the two brighter clear AAA). The LOCKED
**Muted/Clean/Strong/Charged/Peak** ladder is untouched — tier bands are WORDS via the `--t-*` ramp; no
`--ink-900` in any band rule. Built + adversarially verified (17-agent backlog workflow, opus planner + opus
skeptic reproduced the full color math). Pure CSS token + comment; no markup/data.js.
Revisit: with the sibling Plate-bg consolidation, and any future re-derivation of 850/800/700.

**2026-06-15 / Plate-bg consolidation v1: default `.card__plate` terminal stop → LOCKED base `#0a0b0d` / ACTIVE (gated follow-up to Base-Hex Lock v1)**
Why: the deferred Plate-bg consolidation (gated behind BR-S039). Unify ONLY the base/default `.card__plate`
gradient against the locked base. **NARROW_SCOPE:** the single warm bottom stop (`var(--ink-900)` at 100%) was
re-pointed to `var(--ink-950)` (`#0a0b0d`) so the default plate's deepest tone IS the locked room floor; the two
warm upper stops (`--ink-800` 0%, `--ink-850` 55%) were left untouched — re-deriving the warm ramp is the sibling
tier-ratio task. The 5 LOCKED per-source/material plates (mint/cold-foil/black-star/night-gloss/shiny) + the frost
carve-out each override `background` WHOLESALE at higher specificity — verified visually unchanged in-browser
(byte-identical computed backgrounds). Restyle-not-relayout: gradient angle / stop-positions / `::before` inset
frame unchanged; the shifted stop sits at the 100% terminal under the inset frame (sub-1% luminance shift, no text
on it). The engraved text-shadow re-tune was deliberately SKIPPED (the 3 shadows sit on photo/scrim surfaces, not
the plate) and NO letterpress pair was invented. Built + adversarially verified (opus planner + opus skeptic).
Pure CSS one-stop swap; no markup/data.js.
Revisit: when the warm upper-stop ramp (800/850) is re-derived, or a card-family system needs per-family floors.

**2026-06-17 / Free-completeness framing in PROJECT_OS reconciled to LOCKED canon / ACTIVE (Spec Change — no Core Review)**
Why: PROJECT_OS CURRENT prose (§2, §4 line 107, §8, §10 banner/description/Free-Pull-rule, §16 Q1) still framed
Free as "incomplete / archive preview / should seduce / teaser" — contradicting LOCKED canon `GOLDEN_NUGGETS` #5
("Free is the complete front; paid is the same scan developed deeper, a mode not a grade") + the LOCKED Halo Gate
Boundary Lock v1 (2026-06-13). Precedence (CANON/LOCKED > CURRENT) fixes the direction: Free = the complete front,
whole at its scope; the dossier/back is the deeper layer, latent ("not yet developed", #6), released by Halo as
added depth / a different kind of record — never withheld or paywalled. PROJECT_OS now CITES #5/#6 (place-once
rule), drops the banned word "withheld" from the §10 visibility table, corrects the stale §8 blur-veil line
("undeveloped archive plates", per TASK_QUEUE Retired) and §16 Q1's stale "Signature Mint" → "Halo Mint". The
non-canon term "read-scope" (coined in a session handoff) was deliberately NOT introduced — canon's word is
"mode" / "the read". **Scope: completeness framing ONLY** — does NOT change "Free deliberately un-magical"
(2026-06-12 treatment split); Free's muted palette / dashed UNMINTED stamp / ghost serial stand, and the CARD
DESIGN MISSION owns Free's own matte finish. Forged via a 3-lens pre-edit critique (over-reach/process ·
completeness/drift · canon-fidelity → all GO_WITH_CHANGES, fixes folded in). Docs only; no runtime change.
Unblocks the CARD DESIGN MISSION gate (TASK_QUEUE Backlog).
Revisit: when the card-design task changes Free's finish/stamp/serial — update §10's visual descriptors then.

**2026-06-17 / Warrant-audit rule adopted (control vs warrant); full WARRANT PEN loop held DRAFT on an expiry clock / ACTIVE (Spec Change — new governance rule, no Core Review)**
Why: nothing in the regime asks whether a rule's BREADTH is earned — THE GATE catches contradiction, `-STATE-A/-B` catches
enforcement; a broad/load-bearing rule resting on little, colliding with nothing, trips neither. Forged from the builder's
WARRANT PEN draft via a 14-agent audit (ground → 6 adversarial lenses → synth → stress incl. an independent kill-advocate →
finalize); verdict DOWNSCOPE/FOLD. Adopted ONLY the warranted artifact: a ~6-line **warrant-audit pointer** in GOVERNANCE_OS
(control vs warrant; capture-on-adjudication-friction → `TASK_QUEUE` Backlog as `warrant-debt`; rides the 4-BR-S holding-age
clock; resolves via DECISION_LOG/Backlog; FREEZE as a corollary of build-from-ACTIVE-only — a bare rule may not be the SOLE
deciding ground until drawn, tested by striking it from the `Why`). The full capture→pool→metabolize LOOP is held as a
redesigned DRAFT in `.claude/tmp/` (untracked, unratified): it delegates clock/pile-judgment(`/white-death`)/routing to
existing machinery, so after subtraction it rests on one insight + FREEZE — itself warrant-debt until captures recur. First
real capture logged: GN #11 ("never add machinery" has no machinery-vs-surfacing edge). No standalone doc (unearned), no
Signal Map column (closed set), no runtime change.
Revisit: ratify the full loop (write `docs/governance/WARRANT_PEN.md` + FILE_MAP row, mirroring READING_DOCTRINE) after ≥3
distinct non-seed `warrant-debt` captures survive one metabolize cycle; else it auto-drops to the GOVERNANCE_OS pointer alone
by BR-S +8.

**2026-06-17 / Free Pull finish locked: Letterpress Archive Edition (the Free default) / ACTIVE (Spec Change — Free stays redesignable)**
Why: the CARD DESIGN MISSION's Free build. After a 2-direction live fork (Letterpress vs Sun Ledger, BR-S059) the builder
chose **Letterpress** + a touch more depth. Promoted from dev preview to Free's shipped default: a warm-graphite uncoated
EDITION BOARD — organic baked paper-fiber grain (SVG fractalNoise, soft-light blend) + lit surface depth (directional light +
corner falloff + a recessed inner shadow), a struck solid-border "FREE PULL EDITION" deboss, and a REAL object serial
(`card.serial`, e.g. BR-001-DRV-0001) now surfaced on the Free front. Realizes CARD_CRAFT_FIT's Free prescription (Free's OWN
finish, a different KIND than Halo — NOT "Halo minus shine"). **Supersedes** the "Free borrows a touch of Lab-mint silver"
treatment + the stale "UNMINTED · ARCHIVE PREVIEW" copy (which contradicted GOLDEN_NUGGETS #5): rarity → "ARCHIVE EDITION",
stamp/strip → "FREE PULL EDITION", tagline → "The complete archive front, filed as scanned. Halo develops the same scan
deeper.", right-panel badge border dashed → solid. **Dropped** the Sun Ledger preview + the entire dev-toggle scaffolding
(`state.freeFinish` / `?free=` parse / `data-free-finish` attr / `FREE_FINISH_COPY`) — Letterpress is the unconditional
`.card[data-treatment="free"]` look now, no dead code. Restyle-only (the 5 LOCKED material plates + frost + master geometry
untouched); pure static CSS, reduced-motion-safe; per-source warmth rides the existing photo `--halo-a` (non-person cue); no
scarcity/grade/person-rating. Verified live (DOM/getComputedStyle): default Free = board + grain + depth + struck stamp + real
serial + ARCHIVE EDITION + solid badge; no "ARCHIVE PREVIEW"/"UNMINTED" anywhere; Halo/Lab plates + geometry intact; console
clean; no orphan refs.
Revisit: Free is REDESIGNABLE — grain/depth are tunable numbers; revisit with a card-family system or a real serial scheme.
NOTE (builder, 2026-06-17): the Halo crown is approved AS-IS (dark/sleek/minimal); the CARD_CRAFT_FIT conic-replacement is
NOT pursued now (revisit card material/texture only with a concrete new-card concept). Roadmap pivots to the scan-room
layout + the Free/Paid funnel redesign.

**2026-06-18 / Free/Paid framing resolved: Free = a complete light CHOICE; Paid = earned premium (payment funds real depth) / ACTIVE (refines GOLDEN_NUGGETS #5 — the re-opened mode-not-grade question, now drawn)**
Why: the builder closed the long-re-opened mode-not-grade tension pragmatically (and explicitly asked not to overthink it).
**Free is a complete, valid CHOICE, not a deficiency** — choosing Free = getting what you wanted for a LIGHT purpose (fish a
fun stat/headline out of your photo to meme friends, share it, or just try it); the result of the free IS what you wanted.
**Paid is premium and that is honest/earned**: you paid → that funds real resources → we genuinely do MORE (deeper engine /
richer reading / the bigger "real space"), not an artificial gate or a crippled free side. So neither "free is secretly the
same, dimmed" NOR "free is the broken cheap version" — Free is a complete light thing for a light job; Paid is a genuinely
deeper space the payment makes possible (pull-by-VALUE, not a dark pattern). This REFINES the strict #5 "a mode, not a grade"
reading (re-examination logged 2026-06-17): paid may read as genuinely more/premium because the money buys real additional
work. The "real mint" the builder referenced = this premium SPACE (the develop/paid lane), distinct from minting-as-scarcity-
play (separate; the worth research). The CARD stays one master base (LOCKED, never re-lays-out); the ROOM may be a separate
premium design.
Revisit: the SPECIFIC paid-layer differences (what it offers, mood/colors/layout, copy) are deferred — "paint/word it later"
via the paid-space brainstorm + the worth-of-the-minted-artifact research; canon copy (GOLDEN_NUGGETS #5, PROJECT_OS §10,
FREE_PAID_MODEL_V1) gets reconciled to this framing when that lands.

**2026-06-18 / Rule × Layer Map added as DRAFT — un-blurs which layer each rule binds / DRAFT (descriptive reconciliation — NO Core Change; changes no rule's scope)**
Why: rules were applied with BLURRED LINES — an OUTPUT rule ("never SHOW a worth rating") was dragged onto the engine to ban
legitimate deep computation (over-restriction), while DEEP rules ("never COMPUTE worth", "no person-key join") risked being
softened to display rules (the H1 profiler's alibi). New DRAFT `docs/governance/RULE_LAYER_MAP_V1.md` extends READING_DOCTRINE:
maps every safety/canon rule to the layer(s) it binds (BACK-END / BASELINE / FRONT-FACING / PAINTING-PHRASING), marks each
OUTPUT-ONLY vs BINDS-DEEP via a bidirectional binding test, and keeps enforcement a CO-EQUAL column (a DEEP cell is NOT
coverage). Flagship resolved as a DELIBERATE 2-row split: never-RATE-in-output (OUTPUT-ONLY) vs Tier-B never-COMPUTE-worth
(BINDS-DEEP). The `scan-contract.js` floor is OUTPUT-ONLY (a post-inference filter proves nothing about upstream compute);
Gate 3 is BINDS-DEEP (harm survives non-display). Forged via a 10-agent workflow (gather → over-restriction/laundering-trap/
honest-status/kill-advocate lenses → synth); 86 rules → 29 rows. No LOCKED rule's scope changes — splits are reconciliations,
not relaxations — so no Core Change Review. Two `warrant-debt` follow-ups (gate-1/gate-3 duplicate-id reconciliation at the
source docs) logged to TASK_QUEUE Backlog.
Revisit: ratify DRAFT → adopted once the binding test survives real use; if a reader ever sorts/filters by `binding` and treats
DEEP as "handled", FOLD this map back into READING_DOCTRINE (its unique value is the cross-doc dedup, not the taxonomy).

**2026-06-18 / Attractiveness reclassified OUTPUT-ONLY (never SHOW) — no longer never-COMPUTE / ACTIVE (DRAFT-doctrine reconcile; safety-adjacent, logged with Core-Change care)**
Why: surfaced by the Rule × Layer Map review (BR-S066). The source docs disagreed — HUMAN_READ_LINE frames attractiveness as
never-RATE (output), READING_DOCTRINE Tier B as never-COMPUTE (deep). Builder chose **output-only**: any standard vision encoder
entangles attractiveness in its embedding (the doctrine's own H3/S2 concession), so "never compute" was always an unenforceable
aspiration; the honest, enforceable wall is **never-SHOW**. Fits the builder's standing thesis (the scan may read all the way; the
test is the delivered output). The LOCKED rule "no face-rating / attractiveness / social comparison, ever" is OUTPUT-framed and
**UNCHANGED** — attractiveness is still never surfaced, code-backed (scan-contract.js FORBIDDEN_TERMS "attractiveness" +
`containsAttractivenessScoring` flag + the never-rate-in-output rule). What changed: the never-COMPUTE claim for attractiveness
(which lived ONLY in the DRAFT READING_DOCTRINE Tier B item 2) is dropped — so this is NOT a LOCKED relaxation, logged with
Core-Change care for safety-adjacency. SCOPE: attractiveness ONLY — worth, biology, age, ethnicity, gender, orientation, health,
hardwired-personality REMAIN never-compute (worth stays the flagship deep+output split). Reconciled same commit: READING_DOCTRINE
Tier B item 2 carved; RULE_LAYER_MAP_V1 row 4 + flagship note + scope-conflict updated.
Revisit: when a real engine ships, the never-SHOW wall is now the SOLE attractiveness wall — confirm its enforcement is actually
wired and cannot silently fail; if attractiveness compute ever feeds a person-key/aggregate, the §7 wall still BINDS-DEEP.

**2026-06-18 / Develop Ceremony shipped — develop = an in-place EVENT; Halo finish re-skinned shiny-loops → static Night Gloss / ACTIVE (Spec Change; promotes the develop-flip fork, supersedes the 2026-06-17 "Halo as-is" note)**
Why: the build-first step 3 (architecture brainstorm BR-S063). Researched via a 4-workflow arc (scope → spine rulings → build spec → finalist; ~40 agents incl. over-restriction / laundering-trap / kill-advocate / LAYUP-magnetism lenses). The develop click now calls a new `applyTreatment()` that re-skins the PERSISTENT card node in place (never re-renders #stageZone), so the finish TWEENS and the dossier serial resolves `····→address` as the legible CLIMAX — instead of `render()` destroying+rebuilding the card (which made the finish just "appear" = the banned "got brighter"). CROWN-BY-SUBTRACTION (builder pick this session): the card crowns because the room RECEDES (left panel scrim + deeper floor vignette), never an additive light-pool — honoring the LAYUP zero-surround-depth + color-is-currency laws; also DELETED a live 5% `--halo` floor-accent leak (a net tightening). HONEST REVERSE: a quiet "Step back" at the Plate-06 back-seam (one door at the gate), byte-identical round-trip (verified). **Halo finish change — supersedes the 2026-06-17 "Halo crown approved AS-IS" note:** the live shiny treatment was four infinite GPU loops (holo-spin/shimmer-sweep/halo-breathe/twinkle) + a rainbow `background-clip` rarity = literally "the card got brighter," the exact failure mode the builder's own ceremony brief bans. Replaced with a STATIC Night Gloss wet-glass plate (per-source via `--halo-a/b`), zero loops at rest (magnetic-not-yippi, battery-safe) — which fits "dark/sleek/minimal" BETTER than the rainbow loops did. De-smeared the live grade-ladder copy ("Into Halo Mint", the enumerated "Develops:" inventory, "first print", the exact "${N} receipts" counts). OUTPUT-ONLY (no engine/payment/AI/new-state-field/route); one master card re-skinned not re-laid-out; reduced-motion-safe (merged snap block); §7/magnetism/mode-not-grade intact. Verified live at 1600×900 (DOM/getComputedStyle): card node + photo img persist across develop; static finish, no loops, halo/sparkles opacity 0; dossier rows ····→assigned; left panel receded (rgba 4,3,2,0.22), right exempt; reverse round-trips clean; deep-link ?t=shiny boots developed; console clean.
Revisit: the Halo finish is REDESIGNABLE — if the builder prefers the old shiny look it can return, but NOT as idle loops/rainbow (those re-break the ceremony); the develop-flip fork is now promoted (was LATER in UNIVERSE_ZONE_MAP §3). Panel-scrim alpha (0.22) + specular (0.55) are eyeball-tunables.

**2026-06-18 / Halo finish refined — pulsating halo RESTORED + color deepened (builder) / ACTIVE (Spec Change, refines BR-S067)**
Why: builder feedback — the research's real point was "the card must be STRONG WITHOUT the halo," NOT "remove the halo"; BR-S067 over-applied it. The card base is now strong on its own (static deep finish), so the **pulsating halo returns as the card's own added richness** — restored `.card__halo` as one gentle blurred glow that fades in on develop then breathes (5.5s, opacity/transform only, compositor-cheap; reduced-motion stills it). It belongs to the CARD's depth budget, not the room — so FN3's "room/floor/panels spend zero" is intact (no --halo on floor/panels). Still OFF (the actual "yippi" offenders, not requested): the rotating rainbow conic background (replaced by the deeper navy base), the drifting sparkles/twinkle, the shimmer-sweep (one static specular kept). Card color **deepened** per builder — a richer premium navy with more tonal depth (lit blue top edge → near-black core, source-tinted corners). This partially reconciles toward the 2026-06-17 "Halo as-is" note (the glow is back) while keeping the dark premium base over the old rainbow. Verified live at 1600×900: halo 0 on free → fades to ~0.84 breathing on develop (in-place + deep-link paths); sparkles opacity 0; per-source tint (copper SRC-01 / frost SRC-02); deeper navy base; reduced-motion stills the pulse.
Revisit: halo intensity (color-mix 20%/14%, blur 7px, breathe range 0.78–1) + the navy depth are eyeball-tunables; if the builder wants the rotating border or sparkles too, that is a further opt-in (weigh against magnetic-not-yippi).

**2026-06-18 / Diagram is PERMANENT — the evidence-facing layer stays in the scan-room layout / ACTIVE (layout-direction decision, binds the upcoming layout build)**
Why: builder decision. Diagram is NOT a temporary/placeholder surface — it is the evidence-facing layer that shows WHAT Blue Room is reading in the image/frame/artifact, and it structurally protects the product from feeling like fake psychology or mystical person-scanning (it grounds every read in visible cues). The final scan-room layout must PRESERVE a clear Diagram surface — likely the left panel as **Diagram | Metrics**: Diagram visualizes the visible image evidence (crop/frame zones · cue receipts · active image regions · gesture/object/setting evidence where available · artifact-safe visual explanation); Metrics sits beside it as the band/stat diagnostic layer. Diagram must NOT become a face map / body analysis / personality map / attractiveness scanner / biometric panel / cluttered AI-detection dashboard / decorative fake science. If the layout needs simplification, simplify Diagram's CONTENTS, never its EXISTENCE.
Revisit: binds the layout + Free/Paid funnel BUILD pair (Scope Skeleton v3 piece C); do NOT remove or hide Diagram during that build. Reconcile with LAYUP_RESEARCH_V1 (the around-the-card layout) when C is scoped.

**2026-06-20 / Share Canon Boundary v1 — lock the share-card safety boundary before any share/export/payment ships / ACTIVE (new ACTIVE spec; docs-only; extends UNIVERSE_ZONE_MAP §7 + PROJECT_OS "social-comparison REJECTED" to the share surface; supersedes nothing)**
Why: the BR-S076 desktop audit found a latent risk — Peak / FIRST PRINT / Edition / serial / tier-bands are safe on a SINGLE card but can read as person-comparison / human-ranking / scarcity once two cards are juxtaposed or a card is cropped out of context. Forged via a 3-lens adversarial workflow (side-by-side mechanics · scarcity/rank labels · over-safety/strongest-safe-variant → reconcile), holding BOTH guards at once. **Core ruling:** the harm is EMERGENT and RELATIONAL — the display-time sibling of the `UNIVERSE_ZONE_MAP_V1` §7 aggregate wall (single-read safety can be true while the JOIN is the harm), so the wall goes around the RELATION (juxtaposition + person-anchor + ordering key) and around VALUE/the PERMANENT, NOT around the card's own language. **LOCKED NOW:** share card reads photograph→artifact never person→verdict; no person-comparison / leaderboard / sort-by-tier / versus; bands are photo-state not achievement ("Peak" reframed, not removed); provenance/serial = identity not value (Edition couples to the develop-state, never an ordinal); paid never upgrades the person; self-framing + a PEAK-band pre-ship visual test; share/export is single-card. **Anti-bland governing rule:** safety is bought by moving the grammatical subject to the photograph + ONE deadpan clarifier, NEVER by softening / hedging / per-label disclaimers / greying the bands — the single card keeps PEAK, the full Muted→Peak ladder, serial/First-Print provenance, the develop ceremony, and scene-force reads at full charge (a "Strongest safe variant" §H spells out the most exciting safe direction). **OPEN (owner decision, needs the real share surface):** whether literal "Peak"/"FIRST PRINT" print on a bare share card (constraint: a band must sit on a photo-stat noun + carry the photograph-not-person clarifier; Edition couples to the develop-state); whether bands are shown / hidden / clarified; whether multiple cards may ever share one frame. Docs-only — no runtime / share / export / payment. **Honesty:** the boundary is ASSERTED, not ENFORCED — gates 2/3 are not validator-encoded and no aggregate guard exists; the aggregate / cross-pull guard ships WITH the uploaded-photo engine, never after.
Revisit: when a real share trigger / export / multi-card surface is designed — resolve the OPEN owner decisions + run the PEAK-band pre-ship test on the COMPOSITED image; the dormant `UNCOMMON PULL` fixture (scan-contract.js ~414) must be renamed-before-share-reuse + share-path-linted as a future coding task (LOCK-NOW constraint, code edit deferred from this docs-only pass).

**2026-06-21 / Commercial model = ONE SCAN = ONE DEVELOP (one-time, per-card, transparent price) / RATIFIED — docs/spec only, payment implementation DEFERRED (ratifies HALO_GATE_UPGRADE_LAYUP_V1 §8; full spec: docs/COMMERCIAL_SPEC_V1.md)**
Why: Lane A commercial decision, pressure-tested by a 4-lens read-only panel (model scoring · predatory-design adversary · paid-language safety · sequencing). **Model A (one scan = one Develop) scored 20/20** and is the ONLY model consistent with locked spec (§8 "single, low, one-time per-scan unlock"; bans subscription/packs/credits/recurring) AND live copy (`app.js` ~629/~1005 "one-time develop · this scan only"). **Ratified:** one-time, per-card, **transparent dollar price** (~$7, exact figure validated post-upload) shown UNDER the proof of contents; each Develop is a discrete idempotent purchase of the sealed back of ONE card the user already holds. **No credits, no packs, no membership, no balance, no in-app currency, no streaks, no cadence, no buy-more pressure** (B/C import sunk-cost balance psychology; D recurring-charge anxiety = release blocker; E meters Free with daily streak — all rejected regardless of higher revenue). **Repeat purchase = the same flow on a DIFFERENT photo** (object-keyed; no running count/history/"develop another" upsell; one-offer rule). **Email = receipt only at launch** (opt-in save later, default OFF; NO abandoned-Develop / re-engagement / cadence email ever). **Saved card / one-click = deferred, opt-in only, and NEVER one-click-to-charge** — a per-purchase $-confirm must survive every buy. **Free veiled-module decision:** collapse the 3 named teasers (Stance/Fit/Oracle) → ONE qualitative sealed-back entry so Free reads unconditionally complete (avoids "exact locked counts"). **COPY CORRECTION (binding):** avoid "unlock" as user-facing language even neutrally — prefer "Develop this scan / Open the sealed back / Card Back / Developed Record / One-time develop · this scan only" (older docs saying "unlock" are superseded for user-facing copy; internal `.unlock__*` CSS class names are code, out of scope). **Builder fork (one-time vs ongoing) resolved toward one-time;** the "more potent space" paid seed = DEPTH the engine gives (the developed dossier), later possibly a separate standing room, NEVER a recurring charge. **Scope: docs/spec ONLY** — no runtime code changed, no payment/checkout/backend/email implementation, no upload flow. The commercial spec must NOT become the next code lane: the flagged next work is a separate creative/product stress-test on paid-reading VALUE (visual reward, colour, section identity, reveal moments, Hidden Stat/Oracle payoff, which sections are worth paying to read, Mint vs future rooms). Pre-implementation tasks + the "UNCOMMON PULL" dev-fixture removal are enumerated in COMMERCIAL_SPEC_V1 §14.
Revisit: when the scan ENGINE / upload flow is greenlit (payment implementation is gated on it) — validate the exact price figure against a REAL uploaded scan result, finalize the locked-module UX, and run the §14 pre-implementation list (door-wiring fix, rarity-fixture removal, paid-surface copy lint, security playbook) before any checkout code. Price model is REVISITABLE only away from predatory forms (never toward credits/packs/membership/recurring).

**2026-06-21 / Paid-reading dryness = REGISTER FLATTENING + DUPLICATION, not colour/reveal (BR-S087 diagnosis) / RATIFIED (builder-agreed) — docs/spec only, full implementation DEFERRED; next = smallest prototype ONLY, gated (full spec: docs/BR-S087_PAID_READING_SPEC.md)**
Why: 13-role read-only design pipeline (suspects withheld from a cold diagnostician to defeat confirmation bias) on the developed/PAID reading. Both passes converged: the content/prose is already STRONGER than expected and is populated in every paid slot — so the dryness is (1) NO intra-section typographic hierarchy (vivid card-keyed sentences — stance, statNotes.evidence, hidden read, sceneRole — rendered at the same ~13-14px grey as admin field rows; only the Oracle escapes, via its distinct serif/quote register), and (2) PAID-STATE DUPLICATION (the panel re-renders the dossier's stance/fit/impact/lore/aura/scene-role/mint-record verbatim → one peak then 6-7 flat echoes). K1 "IOU content" is REJECTED for the paid scope (the "develops with the mint" placeholders are free-only). The binding re-rank rule was honored: a styling cause may not outrank a content cause unless content is proven strong — it is, so the presentational register cause may rank first. **Direction RATIFIED:** treat the reading as a VOICE DOCUMENT — register-lift the card-keyed sentences toward the Oracle's serif/lead register + CUT the panel duplicates (depth-by-subtraction, Free-safe) + re-tier the dossier so payoff out-weighs filing + mark the panel→dossier seam as a real threshold + COMPLETE (not invent) the existing `--halo-a` accent (colour Option D; reveal Option A / no new motion). **Forced-KILL:** the cold/silver/blue "Mint mood" instinct (breaks the warm-sand lock — the cool `vault-*` register was already killed at styles.css:9-16 — and promotes a quiet plate above the Oracle finale). **Law-safe:** the Hidden Stat stays an artifact-reading variable (never a hidden person-score / "your real value" / worth); the Oracle timeline names adjacent CARD TYPES, never a person; no per-section colour taxonomy. **Scope: DOCS ONLY** — no runtime, no app.js/styles.css, no prototype, no code commit.
Revisit: the FULL implementation (register lift + panel-duplicate cuts + dossier re-tier + accent intensification, BR-S087 §14) is DEFERRED and must NOT become the next code lane. The ONLY approved-as-next build is the smallest validation prototype — restyle `.dstat__evidence` to read as a written verdict (BR-S087 §13) — and even that must not start until the builder explicitly approves. If the prototype invalidates "register contrast = aliveness," re-open the diagnosis before any rollout.

**2026-06-21 / BR-S088 — paid reading register + subtraction SHIPPED (runtime): PAID panel = voice/summary column, the dossier OWNS the deeper Stance/Fit/Aura material / ACTIVE (implements the BR-S087 diagnosis; supersedes nothing)**
Why: BR-S087 diagnosed the developed/paid reading as dry from REGISTER FLATTENING + DUPLICATION (not colour/reveal), builder-agreed; the `.dstat__evidence` checkpoint validated the register hypothesis ("register contrast = aliveness"). BR-S088 implements the register + subtraction half as one coherent runtime lane. **(1) REGISTER LIFT (styles.css):** interpretive verdict prose now renders in the serif lead register — `.dstat__evidence` 12.5px/`--muted`/caption-indent → 15px `--font-display`/`--text`/breathing; `.module__line` 14px sans → 15px serif (scene role, archetype read). Admin/proof (key-value grids, mono receipts, serials, stat bars/tier chips) stays the quiet flat cue — the contrast IS the hierarchy. **(2) SUBTRACTION (app.js, PAID-ONLY):** the panel's analytical deep modules — Stance Read, Fit Coherence, Frame Impact, Lore Density, Mint Record, and paid Aura Profile — were verbatim re-renders of dossier Plate 05 (Fit + Aura) / Plate 06 (Mint); cut from the PAID panel so it reads as a tight VOICE/SUMMARY column (Oracle → Stat Reading → Scene Role → Artifact Archetype → Technical Receipts). The dossier is now the SOLE home of the deeper Stance/Fit/Aura/Impact/Lore/Mint material. **BUILDER RULING (2026-06-21): do NOT restore Stance to the panel — the panel stays tight, the dossier owns the depth.** No colour, motion, or reveal added (deferred per the BR-S087 sequence: register + subtraction first). Free is UNTOUCHED — free renders `lockedDeep` (Aura + Develop CTA + 3 teasers all intact); the cuts are paid-branch only. Verified live @desktop: paid panel = the 5-beat column (DOM-confirmed, no stance/fit/impact/lore/mint/aura modules); 7 `section.dplate` intact; Free complete; console clean; zero banned words; no public 0–100 / rank / worth / person framing; layout stable; reduced-motion safe. Runtime files: app.js + styles.css ONLY. No payment / backend / upload / email / share / mobile / profile work.
Revisit: the DEFERRED half is **BR-S089** — dossier plate re-tier (widen the LOUD/quiet plate delta so payoff out-weighs filing, demote Source Record, mark the panel→dossier seam as a real threshold, lift the 9.5px register strips to ~11px + a rule) + the restrained `--halo-a` accent intensification on the two hero sections (Hidden Stat value, Oracle edge) — run only after this lands. Reversible safety valve: if the tighter panel ever reads as too thin in testing, restore ONE prose anchor (Stance) to the panel; the builder chose tight for now.

**2026-06-21 / BR-S089 — dossier plate-tier + neighborhood legibility SHIPPED (runtime, styles.css ONLY): the Card Back reads as a paced developed record / ACTIVE (implements the BR-S087 §14.3 deferred half; the accent half was NOT needed)**
Why: post-BR-S088 the bottleneck moved to the dossier (read as 7 equal dark boxes). One coherent hierarchy/legibility pass, styles.css ONLY (app.js untouched), 4 checkpoints: (1) SEAM — `.dossier__cue` "CARD BACK — ARTIFACT RECORD" lifted 9px/`--faint` → 11px/`--t-body` + brighter hairlines (`--line`) so the room→card-back threshold is felt; (2) REGISTER STRIPS — `.dossier__register` (DEVELOPED RECORD / ARTIFACT PROVENANCE) 9.5px/`--t-meta` → 11px/`--t-body` + `--line` border so the two neighborhoods partition the stack (kept `<div>`, nth-of-type rhythm intact); (3) DEMOTE SOURCE RECORD — `.drecord dd` `--text`→`--t-body` 13→12.5px + `.dfiling__chain b` / `.dlineage__v` → `--t-body`, so the Source Record (01) + Mint Record (06) filing grids read as quiet provenance, not the loud opening wall (rows/structure UNTOUCHED — re-toned, not deleted); (4) WIDEN LOUD/quiet DELTA (scale + contrast only) — quiet plates (nth 1/6) title 19→17px + `--silver` + spine 18px; LOUD plates (nth 4/7) title →24px (spine already 28) — so the rhythm reads quiet-17 / medium-22 / LOUD-24 and Oracle (07) reads terminal in BOTH free + halo (the LOUD ledger edge fires in both states; the halo tint is only its colour). ACCENT GATED OFF (checkpoint e NOT reached): no `--halo-a` change, no new colour, no reveal, no motion — hierarchy alone solved it; the two existing `--halo-a` sites remain the entire accent economy. Verified live @1600×900 (DOM + headless shots: shiny SRC-01/02, free SRC-01, normal-scroll seam, full dossier): 7 `section.dplate` intact; register strips remain `<div>`; seam reads as a felt gate; Source Record reads quieter than Evidence Board; Oracle terminal both states; Free complete + unchanged in content/logic/branch (shared dossier CSS only improves Free legibility, no paywall pressure — per builder clarification); console clean; zero banned words; no public 0–100 / rank / worth / person framing; no exact locked counts; reduced-motion safe; layout stable. Runtime: styles.css ONLY. No payment/backend/upload/email/share/mobile/profile.
Revisit: candidate (e) — the restrained `--halo-a` accent nudge on Hidden Stat value / Oracle edge — stays an OFF-by-default contingency; fire ONLY if the dossier hierarchy is ever judged still failing (it isn't). The dossier-hierarchy lane is complete; the next developed-reading move, if any, is a fresh judgment, not a queued tweak.

**2026-06-21 / BR-S090 — Archive Desk door truth: two honest doors (Add Your Photo / View Sample Card), Develop OFF the menu, sample marked per-source / ACTIVE (product-flow + naming + routing; supersedes the BR-S072 two-door fork)**
Why: the entrance lied — both menu doors ("Enter Scan Room / Free Pull" and "Develop a scan") fired data-view-to="room" → the SAMPLE SRC-01 result, while "Add your photo" (the real beginning) was a small link, and there is NO scan engine (a real upload dead-ends honestly at the offline gate). Audited via a 4-lens read-only panel → the E-prime direction. SHIPPED (app.js + styles.css): the Archive Desk now has EXACTLY TWO doors — PRIMARY "Add Your Photo" (hero, data-draft-pick → local-draft intake; honest sub-line "the scan engine isn't connected yet — nothing reads it") and SECONDARY "View Sample Card" (dashed subordinate, data-view-to="room" → SRC-01; "A sample, not your photo"). The Develop door is REMOVED from the menu — Develop is an in-card action that only exists after a real Free card (which needs the unbuilt engine); removing it kills the develop-before-card / pay-first paywall smell structurally. The room is marked SAMPLE per-source (topbar zone label "ARCHIVE · SAMPLE · SRC-0N · NOT YOUR PHOTO" + the in-room .stageintro__cue, both derived from SOURCES[state.source]) so a demo card can't be mistaken for the user's own result. Naming: "Scan Room" retired from the room zone label; reserve "Card Room" for the future real room; "Open Card Back" reserved as the future in-card paid verb (NOT added now). "Free Pull" kept OFF the doors (it remains only as the card edition stamp + the in-room treatment toggle = card/room identity; the Free-Pull→Free-Card rename is PARKED). renderDraftIntake / renderGate (the honest no-engine core) UNTOUCHED. CSS door modifiers renamed --free→--add / --develop→--sample; orphaned .menu__add / .menu__door-note removed. No payment/engine/backend/upload/email/share/mobile/profile; no data.js/index.html/scan-contract.js change; the BR-S088/S089 developed-reading arc unchanged. Verified live @1600×900 (DOM + headless): two doors only; per-source SAMPLE marker (SRC-01/02); 7 section.dplate; console clean; no false scan/card promise; no face/person/worth/rank/hidden-score/rarity/paywall language.
Revisit: when the scan ENGINE / real upload→card path ships — add the real Card Room (its own non-sample zone label, never "Scan Room"), surface Develop / "Open Card Back" as the in-card action on a completed Free card, and replace the per-source SAMPLE stopgap (which marks every SOURCES room today) with a real sample-vs-user-card flag. The Card Finish / Surface Variant / Archive Anomaly system stays a PARKED future no-code design lane (explicitly NOT part of BR-S090).

**2026-06-21 / BR-S092 — Draft → LOCAL FRONT CARD, two-beat filing (a user's own photo becomes a held card object, no scan) / ACTIVE (product-flow + runtime; shipped LOCALLY as `b11ccd0`; realizes the BR-S091 honesty spine; supersedes nothing)**
Why: the first truthful, buildable-now step where the user's OWN photo becomes a held card — without a scan engine and without faking a reading. The BR-S091 honesty spine (LOCAL DRAFT → LOCAL FRONT CARD → ⟦engine-gated⟧ FREE CARD → ⟦engine-gated⟧ OPEN CARD BACK) concluded the next code lane is the LOCAL FRONT CARD only; a pre-edit critique caught a self-conflict in the draft spec (minting the card id at file-load + a `scan_state:'unscanned'` router would skip the very intake the spec said to keep) and the builder RATIFIED resolution **A — TWO-BEAT:** pick photo → **LOCAL DRAFT** (`renderDraftIntake`, `scan_state:'draft'`) → press **Build Local Card** (`[data-build-card]` → `buildLocalCard`) → **LOCAL FRONT CARD** (`renderLocalCard`, `scan_state:'unscanned'`). Filing is the PRESS, not the load: `buildLocalCard` mints `card_id` (`BR-LOCAL-<ts>-<rand4hex>`) + a staging timestamp ONCE (idempotent; never regenerated per render). **The LOCAL FRONT CARD is explicitly UNSCANNED / FRONT-ONLY — it is NOT a Free Card; the words "Free Card" and "complete" never appear on it** (both reserved for the engine's true output). **Safe facts only = provenance / file / GEOMETRY** (dimensions / orientation / aspect / file type / size / browser-only source), decoded async from the `<img>` element with a graceful fallback — **no pixel-content read, no EXIF** (no date/GPS/camera). **Generates NOTHING:** no reading, no stats, no oracle, no archetype, no finish/anomaly, no Develop/Halo, no serial, no "complete"; the card back stays closed via a STATIC line ("Card back remains closed until a scan exists.") — no Develop / Open-Card-Back button. **`renderCard` was NOT reused** (it carries fixture reading content) — `renderLocalCard` is a new reading-free sibling of the `.draftcard` shell; `applyView` labels a filed card "ARCHIVE · YOUR PHOTO · LOCAL ONLY" (never the room SAMPLE branch). Scope: app.js + styles.css ONLY (no data.js / index.html / scan-contract.js). Verified live @1600×900 (console clean throughout; MCP `preview_screenshot` broken per memory → accessibility snapshot + DOM assertions): two-beat state walk + zone labels correct; card id format ok + STABLE across re-render; geometry units correct (16:9 / 4:5 / 8:5 / odd→decimal); all honesty labels present; banned-copy sweep = 0 hits; no Develop/Open-Card-Back button; **two menu doors intact, per-source sample marker intact, 7 `section.dplate` intact**, intake CTA swapped cleanly. PARKED copy nit (NOT fixed this lane): the now-DORMANT `renderGate` (it lost its only product door in BR-S092 → no longer user-reachable, kept honest + intact for a future engine) still contains "Development pending" (banned word) → tracked as a future copy-law cleanup.
Revisit: the SCAN ENGINE / real upload→card path is the structural lane that turns the LOCAL FRONT CARD into the engine-gated true Free Card + Develop/Halo back + payment — build it against the BR-S091 contract, NEVER before, and only on explicit ask. Card Finish / Surface Variant / Archive Anomaly stays a PARKED future no-code design (attaches ONLY to the engine's true Free Card front; `card_finish` NEVER on the local card). When the engine ships, retire the "not a Free Card / no reading" framing on this surface and fix the dormant-gate "Development pending" nit (or delete `renderGate` if superseded).

**2026-06-21 / Post-BR-S092 Master Spine ratified — strategic source-of-truth saved to `docs/BLUE_ROOM_MASTER_SPINE.md` / RATIFIED (docs-only; consolidation, not a new authority layer; supersedes the prior chat-only master extract; one refinement to a LOCKED relationship, logged below with Spec-Change care)**
Why: the sharpened strategic master was living only in chat; it is now saved to the repo as `docs/BLUE_ROOM_MASTER_SPINE.md` so it is durable before BR-S093 / the scan engine. A read-only governance critic confirmed **no prior master document existed** in the repo (only `docs/research/SPINE.md`, a research-layer doc), so "supersedes the prior master extract" is accurate, and found **NO blockers** across PROJECT_OS / GOVERNANCE_OS / DECISION_LOG / COMMERCIAL_SPEC_V1 / HALO_GATE_BOUNDARY_V1. **Ratified content:** (1) this master **supersedes the prior (chat-only) master extract**; it CONSOLIDATES the locked/active laws and does NOT sit above PROJECT_OS / GOVERNANCE_OS / DECISION_LOG. (2) The **Free/Paid relationship is now THREE LAWS — Dependency** (Paid does not require Free), **Continuity** (if a prior card record exists, same-card Paid may seed from it), **Consistency** (Paid must not contradict any card state already shown; it may deepen / complicate / recontextualize). (3) The **canonical `card_record`** (card_id · parent_card_id · source_type · mode · created_at · scan_id · develop_id · room_build · product_stage · card_template_version · reading_schema_version · scan_engine_version · develop_engine_version · model_tier · result_snapshot · finish_result · status) is the SINGLE source for future saved-card / version provenance. (4) **Saved cards are immutable snapshots** — no re-call, no re-roll, no re-derivation on re-view. (5) **BR-S093 must consume this master and produce only OPEN DELTAS, never re-derive locked laws.** **REFINEMENT TO A LOCKED RELATIONSHIP (logged with Spec-Change care, NOT a silent drift):** the Dependency law refines the older locked framing that Develop only ever "opens the sealed back of the SAME card the user already holds" (`COMMERCIAL_SPEC_V1` §2/§5 Free-first flow + `halo/HALO_GATE_BOUNDARY_V1` §A). This is a deliberate evolution, not a contradiction: Continuity preserves the same-card case and Consistency + the hero sentence ("Free gives you the card. Paid develops its production record.") keep the LOCKED anti-paywall law intact (Paid = the card developed deeper, NEVER a better card / higher score / pay-to-reveal hidden worth). The exact lawful **Paid-only entry flow** (a first scan that goes straight to Develop with no Free surfaced) is an OPEN delta for BR-S093 — to be designed WITHIN the sealed-back / developed-not-better model, never around it. **Scope: docs ONLY** — added `BLUE_ROOM_MASTER_SPINE.md`; registered in `FILE_MAP.md`; recorded in `TASK_QUEUE.md`. No runtime/app.js/styles.css/data.js/index.html/scan-contract.js change; no scan engine, no payment, no finish/anomaly implementation, no BR-S093 work.
Revisit: OPEN QUESTIONS carried (resolve in/after BR-S093, not now) — (a) **anomaly attach scope** (anomaly on a plain/Standard card vs only a finish-earned card); (b) **price / margin anchor** (exact figure + margin, validated against a real scan; never toward credits/packs/membership/recurring per the 2026-06-21 commercial ratification); (c) **specificity floor threshold** for `cheap_extract` (set by the ~20-photo test bench); (d) the **Paid-only entry flow** above. The card_record schema + the economics levers (vendor-agnostic model tiers, prompt caching / batch / compact JSON) are ASSERTED here as the canonical forward shape — they BIND when the engine is specced, and may be promoted into a dedicated ACTIVE spec at that point. If BR-S093 surfaces a real conflict with a locked law, re-open here before building.

**2026-06-21 / BR-S093 — Front Pull vs Full Develop: Value Ladder + Evidence Contract (no-code spec) ratified; Free↔Paid is a USER-CONTROLLED IN-ROOM SWITCH / ACTIVE (docs-only design spec; consumes BLUE_ROOM_MASTER_SPINE; resolves the master's open Paid-only-entry delta; supersedes nothing)**
Why: the no-code lane the master spine queued. Opened on pushed checkpoint `2c91a32`; produced `docs/BR-S093_VALUE_LADDER_SPEC.md` (Result Map + spec) consuming the master and producing only OPEN DELTAS within the locked laws (no re-derivation). **Core results:** (1) the **Free/Paid delta is DEPTH, not completion** — Free Front Pull is the complete card (front + reading from a CHEAP extraction pass); Paid Full Develop is the SAME card's deeper *production record* (Hidden Stat, full Evidence Board receipts, Fit+Aura, Mint Record + assigned serials, full Oracle, Artifact Archetype) from a DEEP pass. Hero: "Free gives you the card. Paid develops its production record." (2) **EVIDENCE CONTRACT:** both tiers are CONTRACTS the model fills (not free prose) — per-line `{lens, observation, visibleCue (=specificity_anchor), effect, confidence, reason}`, reason VALIDATED, a line lacking a valid anchor is DROPPED (fail-closed). Same schema, different fill depth → Consistency guaranteed (Paid deepens the same anchored cues, never contradicts Free). `scan-contract.js` (present, unwired) is the enforcement seam this spec defines the schema for. (3) **§5 FLOW RATIFIED (builder decision) — the Free↔Paid choice is a USER-CONTROLLED IN-ROOM SWITCH**, not a forced funnel: after Add Photo → Local Front Card → enter the (future engine) Card Room, the room offers an explicit "choose / switch what you want" control between Free Front Pull and Full Develop. Default-on-entry = Free Front Pull (Free-as-hero); Full Develop PRE-purchase shows the develop-INTENT gate (qualitative sealed-back + transparent price, NOT the paid content); confirming = the one-time per-card buy → deep pass → developed view; POST-purchase both views switch freely (idempotent, immutable snapshot, honest "Step back" reverse). "No back without a front" — Full Develop always includes the complete front. This **RESOLVES the master's open "Paid-only entry flow" delta** and is law-fit: Dependency ✓ (switch straight to Full Develop, no required prior Free step) · Continuity ✓ (Free seeds Paid via `parent_card_id`) · Consistency ✓ · price-at-develop-intent + complete-front/sealed-back ✓ · one scan = one Develop ✓. It generalizes the room's existing treatment-toggle + develop-ceremony + Step-back reverse into one explicit Front-Pull/Full-Develop view selector over ONE card object. (4) The **specificity floor** is the #1 non-code failure risk (generic readings that fit any photo) — defined as: every line carries a locatable cue + a blind matcher matches reading→photo above chance + zero generic-line violations; the threshold number is set EMPIRICALLY by the test bench. **Scope: docs ONLY** — added the spec; registered in `FILE_MAP.md`; recorded in `TASK_QUEUE.md`. No runtime, no scan engine, no payment, no finish/anomaly, no Vault, no salvage.
Revisit: OPEN deltas carried to the bench lane (NOT now) — anomaly attach-scope (plain vs finish-earned card; lean = roll once at first engine card mint, stat_effect:none); price/margin anchor (provisional ~$7 = f(deep-pass cost) where cost = model_tier × tokens × caching/batch); specificity floor threshold (empirical). NEXT lane = the cheap_extract specificity **test bench** (§11: ~20 varied photos → anchor coverage + blind match-rate + generic-violation count + per-extract cost → the Free model-tier decision + per-develop cost input to pricing) — design→build on explicit ask. THEN the Scan Engine Spine, built against this evidence contract. The §5 default-to-Free-on-entry is revisable; if the bench shows cheap_extract can't clear the floor, raise Free's model tier (cost↑, recheck price) or shrink Free scope before building.

**2026-06-21 / BR-S094 — cheap_extract specificity test bench DESIGNED (bench design only; run BLOCKED) / ACTIVE (docs-only design spec; consumes BR-S093 §8/§11 + master §9; supersedes nothing)**
Why: the lane BR-S093 §11 queued. Designed the bench and saved `docs/BR-S094_CHEAP_EXTRACT_BENCH_SPEC.md`. Hypothesis under test: a CHEAP extraction pass can mint ONE safe, oddly-specific Blue Room artifact anchor on a real photo — matchable back to its photo (specific), never reading the person (safe), at Free-tier cost (cheap) — which de-risks the cheap-Free/deep-Paid economics and pins the specificity floor (BR-S093's #1 non-code failure risk) BEFORE any engine code. **Design locked:** the 5-question frame; a ~20-photo input set spread across subject / info-density / quality with a ~5-photo SAFETY-STRESS subset (faces · attractiveness-bait · identity/age/gender-bait · crowd · text/screenshot) that actively baits person-inference; a single-anchor strict-JSON schema (a BR-S093 contract line: lens · observation · visible_cue=specificity_anchor · effect · confidence-band · reason · scope=artifact; visible_cue must not leak the photo_id); scoring rubrics (valid_json · specificity 0/1/2 · reason_safe · generic swap-test · **unsafe_person = the zero-tolerance dominant gate** · **blind match-rate = the proof metric** · cost · curiosity 0/2 where teaser/withholding scores 0); KILL/PASS thresholds (match strongly above chance, unsafe_person = 0, cost ≤ Free ceiling → PASS lock Free tier + feed cost→price; near-chance / un-fixable unsafe inference / over-cost → KILL escalate model_tier or shrink Free scope); the blind-match leakage-control protocol; the per-extract recording row + per-category rollups. **SCOPE — DESIGN ONLY:** NO runtime, NO app integration, NO scan engine, NO API calls, NO model calls, NO payment / Paid Full Develop / finish-anomaly / Vault / salvage; no app.js/styles.css/scan-contract.js. The bench harness is a standalone throwaway outside the app, never shipped. **RUN GATE — BLOCKED:** the actual bench run is blocked until the builder (a) supplies ~20 varied photos AND (b) explicitly approves running it; until both, paper design only — no execution, no API/model calls, no cost. Law-fit: photograph→artifact never person→verdict (the unsafe_person zero-tolerance axis enforces it), bands not 0–100, Free-complete + magnetism-not-withholding (curiosity scored 0 if it teases/withholds), the BR-S093 evidence contract (anchor + validated reason + fail-closed on generic), vendor-agnostic model_tier + cost levers. Registered in `FILE_MAP.md`; recorded in `TASK_QUEUE.md`. Docs only.
Revisit: on the ~20-photo set + explicit approval → RUN the bench (results to `docs/bench/`) → read the verdict: PASS locks cheap_extract as the Free tier and feeds per-extract cost into the price/margin anchor (BR-S093 §7); KILL escalates the Free model_tier (cost↑, recheck price) or shrinks the Free reading scope, then re-runs. THEN the Scan Engine Spine, built against the BR-S093 evidence contract. Scan engine / payment / Paid Full Develop / finish-anomaly / Vault / salvage remain PARKED.

**2026-06-21 / BR-S095 — halo glow now rings the developed card (styles.css) / ACTIVE (runtime CSS fix; refines the BR-S068 builder-restored halo; supersedes nothing)**
Why: the builder observed the halo wasn't visible AROUND the developed card — confirmed real. The shiny `.card__halo` (BR-S068, z-index:-1 behind the card) had centre-weighted radial gradients fading transparent at ~70% — i.e. BEFORE the card silhouette — so the colour bloomed behind the opaque card (occluded) and the visible perimeter ring (the +40px margin beyond the card edge) was empty → "no halo around the card." Fix (one rule): the per-source-tinted bloom now carries colour to ~100% of the box + `blur(22px)`, so a soft halo rings the developed card; fade-in peak 0.78→0.82. It stays the CARD's own depth (z-index:-1, behind it) — consistent with the BR-S068 "halo belongs to the card's depth budget, not the room" ruling. EXPLICITLY NOT touched: the "no --halo escapes to the room" neutral box-shadow ring (styles.css ~1052) and the floor/panel zero-halo law (BR-S067 subtractive crown) both stand; sparkles / rainbow / the retired loop-pile stay OFF (magnetic-not-yippi); reduced-motion stills the halo (existing block). Verified live @1600×900 via headless-Chrome capture (MCP screenshot broken per memory): the per-source halo visibly rings the shiny SRC-01 card; computed blur(22px) + gradient + opacity ~1 + ~50px ring; Free card unaffected (halo opacity 0). Runtime: styles.css ONLY.
Revisit: halo intensity (colour-mix 34%/22% bloom, blur 22px, fade-in 0.82, breathe 0.78↔1) is eyeball-tunable; if it ever reads as washing the room, pull the bloom % / blur down or the inset in. The colour-currency + subtractive-crown laws still bind — keep the halo on the CARD, never promote it to floor/panels.

**2026-06-21 / BR-S096 — rotating halo rim RESTORED on the developed card, reconciled / ACTIVE (runtime CSS; builder-directed PARTIAL REVERSAL of the BR-S067 holo-spin removal; refines BR-S095)**
Why: the builder asked for the "pulsating semi-spinning LED-ish" rim back — the `holo-spin` rotating edge light that BR-S067 (2026-06-18, commit 1c6c328) removed as the lead "yippi offender." This is a deliberate, builder-directed reversal of that one sub-decision, logged with care because BR-S067 is a LOCKED-grade taste ruling. **Honest framing (reconciles with the prior ruling rather than just undoing it):** BR-S067 killed a PILE — a whole-card conic background spinning the violet/cyan/green RAINBOW at 7s + shimmer-sweep + twinkle sparkles + halo-breathe, which together read as "the card got brighter" (the banned magnetic→yippi failure). The builder's own [[blue-room-strong-without-not-remove]] note already isolated the offenders as **the rainbow + the sparkle/twinkle + the stacked-loop pile**, NOT the rotating-rim motion itself. So BR-S096 brings back ONLY the motion the builder liked, stripped of the offenders: (1) per-source `--halo-a/b` ONLY (never the rainbow); (2) ONE soft rotating rim on the BR-S095 `.card__halo` behind the card (z-index:-1), NOT the whole-card conic wash; (3) it runs ALONE over the BR-S095 base glow — sparkles / twinkle / shimmer-sweep STAY OFF; (4) slow 8s spin + gentle 6s breathe = pulsating-not-frantic; reduced-motion stills it (existing `.card__halo { animation:none }`). The BR-S067 subtractive-crown core still HOLDS: no `--halo` on floor/panels, and the "no --halo escapes to the room" neutral box-shadow ring (styles.css ~1052) is untouched — the glow stays the CARD's own depth. Verified live @1600×900 (headless capture + computed `animationName: halo-fadein, holo-spin, halo-breathe`, conic+radial bg, blur 18, sparkles opacity 0): the per-source rotating rim sweeps the shiny SRC-01 card. Runtime: styles.css ONLY.
Revisit: spin speed (8s), rim intensity (44%/36% arcs), blur (18px), breathe (6s) are all eyeball-tunable. The literal violet/cyan/green RAINBOW and the twinkle SPARKLES remain OPT-IN only and are advised against (they were the actual magnetic→yippi offenders, not the rim motion); restoring either would re-open the BR-S067 concern and should be a fresh explicit builder call. Supersedes the BR-S067 "holo-spin stays OFF" sub-clause ONLY for the reconciled per-source rim; the rest of BR-S067 (sparkles/shimmer/rainbow off, subtractive crown) stands.

**2026-06-21 / BR-S097 — halo corrected to the LED EDGE line (the right mechanism) / ACTIVE (runtime CSS; supersedes the BR-S096 behind-card mechanism)**
Why: BR-S096 built the wrong thing — a soft blurred conic BEHIND the card (z-index:-1, blur 18) which read as "smokey." The builder rejected it and clarified the effect they meant: the ORIGINAL "first halo" was a crisp light tracing the card's EDGE — an LED line running around the border, not a behind-card glow. That original worked because the card is a thin frame (`.card` has `padding` + a gradient background) with the opaque `.card__plate` on top, so the card background is revealed ONLY as a line at the very edge; the pre-BR-S067 code put a spinning conic there. **BR-S097 restores that mechanism:** `.card[data-treatment="shiny"]` background = a conic-gradient with two bright per-source points + `holo-spin 7s`, frame bumped to `padding:2px` so the line reads → a light travels around the card's edge. A TIGHT colored box-shadow bloom (small radius, hugs the silhouette) gives the edge "light" without a room-washing cloud (honors the subtractive-crown intent — the bloom is on the CARD, tight, not a floor/panel accent). The behind-card `.card__halo` is reduced to a FAINT low-opacity ambient aura (opacity 0.3–0.46 gentle pulse, NO spin, NO conic) — the builder's "softer ambient version with low-opacity variation," which they said would be okay. Per-source `--halo-a/b` only (no rainbow); sparkles / twinkle / shimmer stay OFF; floor/panel zero-halo holds; reduced-motion stills the spin (frozen tinted edge) + the ambient. Verified live @1600×900 (headless capture + computed: card bg conic, padding 2px, holo-spin 7s, colored edge box-shadow; `.card__halo` opacity ~0.42 radial-only + halo-soft-breathe). SUPERSEDES the BR-S096 behind-card rotating glow; the BR-S096 DECISION still stands for its non-mechanism rulings (per-source not rainbow, sparkles off, builder wants the LED motion).
Revisit: tunables — spin speed (7s), the two point brightnesses (halo-a/b 92%/90% near-white), frame thickness (2px), edge-bloom radius (9px/16px tight), ambient opacity (0.3–0.46). If the 2px line reads too thin at the bevelled corners, widen padding or add a masked border ring. Rainbow + sparkles remain opt-in/advised-against (BR-S067 offenders).

**2026-06-22 / BR-S099 (+S100) — the ORIGINAL developed-card halo RESTORED verbatim + bloom tightened / ACTIVE (runtime CSS; supersedes the BR-S095..S098 reconstructions; builder-directed reversal of the BR-S067 spin/sparkle removal)**
Why: BR-S095→S098 rebuilt the halo from scratch four ways (around-glow / smokey conic / LED edge / comet current — the last synthesized by a 10-agent panel) and the builder rejected each as not-the-original / fake-gold / smokey. The builder asked (twice) whether the original code still existed; it did — recovered from git `1c6c328^` (the commit immediately before BR-S067 `1c6c328` deleted it). RESTORED VERBATIM: `.card[data-treatment="shiny"]` background = the rotating 3-hue conic edge `conic-gradient(from --holo-angle, #15161a / --halo-a 12% / --halo-b 40% / --halo-c 68% / --halo-a 94% ...)` + `holo-spin 7s`; the `.card__halo` two-radial behind-glow + `halo-breathe 5s`; and the 7 drifting `.card__sparkles` + `twinkle 2.8s`. Per-source hues from data.js (SRC-01 a copper #c98a5e · b periwinkle #8b7bff · c amber #e8b27d; SRC-02 a cyan #5fd4e0 · b ice #cfe2ee · c periwinkle #8b9bff) — the THIRD hue + the violet were what every reconstruction dropped, and their absence (plus flat per-source copper) was the "fake gold" the builder kept reacting to. Builder confirmed "yes this is the one." **BR-S100 (folded):** the only remaining off-note was the original WIDE colored bloom (box-shadow `0 0 44px --halo-a, 0 0 80px --halo-b`) reading as a "cloud around the lining" → tightened to a hug (`0 0 11px -2px --halo-a, 0 0 22px -11px --halo-b`) so the rotating LINE stays the star; builder approved ("its good now this halo"). Kept holo-spin, dropped the original `card-in` re-entrance so the in-place develop ceremony still tweens; reduced-motion stills spin + breathe + twinkle (existing block). **This explicitly REVERSES the BR-S067 ruling that killed holo-spin/sparkles/3-hue as "yippi"** — the builder has now, repeatedly and with the original in front of them, chosen this as the developed card's signature look. Verified live @1600×900 (headless, SRC-01 + SRC-02). Runtime: styles.css ONLY.
Revisit: supersedes the BR-S095/S096/S097/S098 halo decisions (those mechanisms are dead; this is the live one). Do NOT re-remove the spin / sparkles / 3-hue rotation citing BR-S067 — that removal is overridden here by direct builder choice. Builder flagged "a bit editing after" — minor tweaks (speed, bloom tightness, sparkle density) may follow. If SRC-01 ever reads too gold, the dial is the data.js token `src[0].halo.a` (#c98a5e copper), not the halo CSS. The wide-bloom→tight-hug means the glow no longer washes outward — consistent with the BR-S067 subtractive-crown intent even though the spin/sparkles return.

**2026-06-22 / BR-S101 — 3 prototype cards from the builder's own photos, as a contained dev route (?dev=proto-cards) / ACTIVE (runtime app.js+styles.css; prototype, not production)**
Why: the builder chose 3 of their own photos as "final prototypes" and supplied gallery paths. Built a CONTAINED dev surface rather than full room sources: `?dev=proto-cards` renders each photo as a card in Free + Halo via the master `renderCard`, from 3 minimal SAFE source objects (`PROTO_CARDS`, app.js). This keeps the prototype honest + non-crashing without authoring 3 full production datasets (dossier/diagram/metrics/reading) or rewriting the 2→5 source toggle. **Two standing decisions encoded:** (1) PRIVACY — the photos are personal faces and the GitHub repo is public, so `assets/source-03/04/05.jpg` are **gitignored** (local-only, never pushed); the prototype renders on the builder's machine. (2) SAFETY — the card copy is artifact-only (frame/composition/light/scene/held-object geometry), never the person, per the locked product law (faces are in-frame). Does NOT touch the spine (this is a demo/prototype surface, not the upload→card flow, which still correctly dead-ends at the Local Front Card / offline gate). Verified live (headless): 6 cards render, photos upright (EXIF), halo on the developed ones, console clean. Runtime: app.js + styles.css + .gitignore (data.js / index.html / the production SOURCES untouched).
Revisit: promoting any prototype to a FULL room source (per-photo dossier/diagram/metrics + 5-source toggle) is a separate PRODUCTION lane — and would mean committing faces to the public repo, so it needs an explicit privacy decision first. The prototype copy/crops/halo-hues are tunable. These are the builder's own photos used as design fixtures; if the showroom ever needs neutral/owned-stock samples instead, revisit then.

**2026-06-22 / BR-S103 — 3 photos promoted to FULL room sources (SRC-03/04/05); source set 2→5; toggle made data-driven / ACTIVE (runtime data.js+app.js; supersedes the BR-S101 dev-route prototype)**
Why: the builder asked for the 3 photos in the live room "as the 2 original" — to evaluate how varied images sit across the whole project (card + panels + dossier + halo), not a dev gallery. Authored via a 6-agent workflow (3 per-photo authors reading their own image → full SOURCES object + V2_EXTRAS, artifact-only; 3 safety/schema gates). **Safety: all 3 gated SAFE with ZERO person-reading violations** — every line takes the frame/scene/held-object as grammatical subject (the gate's "schemaGaps" referenced a different future HALO_DOSSIER schema, not the live data.js shape, and were N/A). Integration done in the main loop (not by agents): I built the data.js object literals + V2_EXTRAS from the agents' validated JSON (so no agent-authored syntax could break the module), cleaned voice to match SRC-01/02 (Title-Case card titles; sentence signatures + mint.notes; 1-word impact/lore labels; Title-Case aura), and SUPPLIED the identity fields the workflow schema deliberately omitted (card.serial/edition/minted/batch, dossier.record.objectNo, dossier.mint.serial). Applied the gate's one substantive fix: SRC-04's primary subject is the canine, so v2 route HUMAN_SOLO → ANIMAL_COMPANION. Wiring: `renderSourceToggle()` builds the SRC rail from SOURCES (auto-scales to N); URL `?src=1..N` + keyboard `1..N` generalized from the hardcoded 2; `short` labels added to all five. **PRIVACY (standing):** SRC-03/04/05 are the builder's own personal photos and the repo is public, so `assets/source-03/04/05.jpg` stay GITIGNORED (local-only, never pushed) — the data.js text is committed, so the cards render on the builder's machine but show image-less for a public clone (acceptable; these are local design fixtures). The SAMPLE zone label still marks every room "NOT YOUR PHOTO" (BR-S090 stopgap) — these are demo fixtures, not the user's scanned result, so the honesty spine (no engine = no reading on a real upload) is untouched. Verified live @1600×900 (headless, console clean): 5 sources; each new card renders free + developed (card + EXIF-upright photo + restored halo + Diagram + Oracle/Stat panel + 7-plate dossier); toScanResultV2 maps without crashing.
Revisit: diagram coords are best-effort (EXIF-rotated source files → authored for the upright view) — tunable per photo if the Diagram tab matters. The BR-S101 `?dev=proto-cards` route is superseded by these full sources (left in place, harmless; prune in a cleanup pass). If these are ever to ship publicly, the gitignored faces need an explicit decision (owned-stock vs personal). Copy/crops/stats are tunable; the builder may refine per card.

**2026-06-22 / BR-S108.2: measurement-vs-score carve-out · Colour Field % keep · Run Hidden-Stat keep · grade principles folded / ACTIVE (Core Change to the stat law; grade principles LOCKED, calibration HELD OPEN)**
Why: consolidate the held conflict-report decisions + fold the grade honesty-contract before it drifts.
**A2 — STAT LAW REFINED (supersedes "No public 0–100 (tier bands only)"):** **No public 0–100 SCORES** — a score
RANKS the photo/person, and stays banned. **Measurement proportions — pixel/colour composition, counts — ARE
permitted as scan readings**, because they DESCRIBE the artifact, never rank it. The bright line stays bright on
scores; the measurement carve-out is explicit so a future pass neither deletes a legitimate measurement nor
loosens the score ban sloppily. (PROJECT_OS §7/§9 stat-law text updated to match in the same commit.)
**A1 — Colour Field % KEPT** under A2: "61% overcast sky" etc. is a colour-composition measurement of the frame,
not a stat score.
**A3 — Run Hidden Stat "The Man Let It Go" — CONSCIOUS KEEP:** it reads the man's performed / re-authorable ACTION
(in release), an IMAGE-ACT read allowed by `HUMAN_READ_LINE_V1` (never worth / identity / body / character); both
audit agents confirmed it on the right side of the person-reading line. Deliberate, not an accident.
**D — GRADE PRINCIPLES folded as LOCKED** (thresholds / visual-tiers HELD OPEN until the readiness gate passes):
  · AXIS: a card's grade measures the CHARGE the photo offered, read honestly — never worth, never "good photo",
    never the person.
  · SHARED CONTRACT: the card is a collaboration; the user brings a photo with a moment, Blue Room's duty is to
    never miss the ones that count. Honesty both ways — never inflate the flat one, never flatten the brilliant one.
  · P1: grade = photo charge; read-completeness is the room's CONSTANT DUTY, never a grade input (a thin read of a
    rich photo is a bug, never a low grade).
  · P2: charge ≠ quality ≠ worth; common = honest, never lesser.
  · P3: common is COMPLETE; rare has MORE; common is never a degraded rare (obeys free-is-complete).
  · P4: stated in the receipt, never chased (no scarcity / streak / countdown — obeys no-magnetism).
  · P5: reads the frame, never the person, never the story.
  · THREE ORTHOGONAL AXES kept legible + non-overlapping: finish family (treatment) · 1% anomaly (stochastic) ·
    grade (charge tier).
  · HELD OPEN (do NOT lock): thresholds, tier count / names (archival not gamey), visual tiers, the grade's
    free-vs-developed boundary — calibrate ONLY after the readiness gate (strong photos reliably read high-charge,
    flat read low; same test as mint-readiness).
RUNTIME (B + C, same commit): Colour Field collapsed to ONE representation (thin 7px scan-readout bar + minimal
text key; duplicate legend dots cut); a Finish plate added to the DEVELOPED rail (material stated with weight,
e.g. Field Green Glass) so develop GAINS instead of deflating; the rest of that rail is RESERVED in code for the
grade visual (post readiness-gate), not filled with throwaway.
Revisit: the grade thresholds / visual-tiers + free-vs-developed grade boundary calibrate once the readiness gate
passes; the reserved developed-rail zone is where the grade visual lands. Deferred (logged): Set Wall · the two
minor prose/row rhymes · the other 3 cards to mintable · the grade VISUAL build.

**2026-06-22 / BR-S109 — Fit + Aura is ONE struck CLASS designation; codes belong ONLY to Source Record / CURRENT**
Decision: the back-dossier "Fit + Aura" (plate 04) is redesigned from a 4-tag badge row (Class badge + 3 aura
chips + a placement line — which read as FILING, i.e. a second Source Record) into ONE struck "type-specimen"
plate: a single CLASS designation (genus-species + variant, e.g. "A Gesture-Class Hold, Northbound Variant"),
a shelf-line that CLASSIFIES (where it files — never narrates the photo, that's the Oracle's), and a struck
home lockup. Real deboss/relief carries the "minted, not printed" weight (the one deliberately dimensional plate
in an otherwise-flat dossier). Chosen BY EYE from a 4-form menu (Seal / Crest / Plate / Spine) scored by an
adversarial 3-lens panel against three tests — singular over plural · stamped weight · classification not
verdict. Plate won (means 3.7 / 3.3 / 3.7, only form to score 5 on singular); Spine disqualified (its structural
call-number address relapses into filing).
GENERAL PRINCIPLE (the kill-shot, now a law): **in this dossier a CODE reads as FILING, because filing already
owns codes.** Source Record (plate 03) carries the filing-event chain + serial lineage (Object → Scan → Card →
Mint, e.g. BR-001-DRV-0001). Therefore NO other section may render a code / call-number / serial-like address;
doing so re-runs the "this is just another Source Record" failure the redesign exists to kill. Every code on the
menu's losing forms (Seal/Crest/Spine) failed this exact way. Fit + Aura asserts its archive HOME by struck seat
+ a DISTINCT lockup ("Shelf-placement · Blue Room Archive") — never a code, and never the Mint plate's exact
"Filed & sealed" lockup (kept distinct so adjacent plates 04/05 don't rhyme).
Why: the section's job is the card's CHARACTER (singular identity), not a second filing slip; both codes and
tag-rows collapse character into filing. A single struck designation is singular by construction and classifies
the object without stealing the Oracle's verdict.
Revisit: if a future section genuinely needs an identifier, it must look unmistakably UNLIKE a Source Record
serial (different grammar + placement) and earn a ratified exception here first.

**2026-06-23 / BR-S113 — Read-boundary (sharpened): five no's + one allowance / LOCKED**
A card reads the ARTIFACT, never the PERSON. This governs aura/atmosphere writing and ALL future card copy.
FIVE ABSOLUTE NO'S — never state or imply a person's:
  1. worth or character;
  2. health or body;
  3. ranking / score against others;
  4. identity (job, class, status, relationships, story-as-fact);
  5. attributed private feeling or mood ("he feels lonely / proud / anxious").
ONE EXPLICIT ALLOWANCE — PERFORMED GESTURE-INTENT: what the action publicly does in the frame ("the palm
stops the lens," "the catch is offered up to the camera," "the body is already turning away"). This reads the
gesture as an EVENT IN THE IMAGE, not the person's interior.
THE TEST: is this the intent the gesture performs, or a claim about hidden feeling? The first is allowed; the
second is banned.
Why: aura/atmosphere writing sits one step from reading the person — this draws the exact line so the read
stays on image-properties + performed intent. Supersedes nothing; it SHARPENS the existing artifact-not-person
law (HUMAN_READ_LINE_V1, PROJECT_OS §1). Governs docs/BR-AURA-RESEARCH.md and all card copy from here.
Revisit: LOCKED — sharpen only, never loosen, without explicit ratification.
