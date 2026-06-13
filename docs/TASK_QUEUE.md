# BLUE ROOM — Task Queue

Ranked work queue, not a dream backlog. One Active item at a time.
Out-of-scope findings from any session get logged here, not patched.
Last updated: 2026-06-13.

## Active

- **Sample Room 18-State Audit v1** (2026-06-13 / BR-S033, audit + 4 copy fixes):
  audited the full sample-room matrix (2 sources × free/halo/lab × source/diagram/
  metrics = 18 states) after Artifact Language Stabilization Pack v1. **Verdict
  PASS WITH FIXES** — live route-walk (DOM sweep + diamond bbox + screenshot) + an
  independent five-gate sub-agent. **Migration confirmed correct everywhere:**
  tier-band labels (Frame Presence/Frame/Signal/Scene Charge · Muted…Peak), no
  standalone Presence/Charge/Visual Impact/Gesture Authority/Dominant, no public
  0–100 stat score, no ±N delta, no diamond overflow/clipped labels; the card
  still reads as a premium artifact, not a dashboard. Kept-numeric Metrics
  diagnostics + the `?dev=uploaded-result` harness are the documented exceptions.
  All routes regression-clean (menu + 4 dev routes + Local Draft → Develop Scan
  sealed/offline; console clean). **4 pre-existing person-pronoun copy fixes in
  data.js** (SRC-02 "he"×2 + "for you"; SRC-01 latent "at you"). New audit doc
  `docs/audits/SAMPLE_ROOM_18_STATE_AUDIT_V1.md`. **Completed.** Implements Ready
  #0; **next up:** data.js copy audit against COPY_SYSTEM (Ready #0).

- **Halo Gate Ethics Audit v1** (2026-06-13 / BR-S032, audit + 1 copy fix):
  audited `?dev=halo-gate` + the migrated `?dev=free-scan-sim` sealed-back copy
  against `docs/halo/HALO_GATE_BOUNDARY_V1.md` (ethics / boundary / manipulation /
  artifact-safety). **Verdict PASS** — live DOM sweep + screenshot of the
  rendered pages + an independent adversarial five-gate review (PASS). New audit
  doc `docs/audits/HALO_GATE_ETHICS_AUDIT_V1.md`. Confirmed no exact pre-unlock
  counts, Free reads complete, Halo ≠ hidden score, dev-mock/not-payment/not-real-
  analysis, no manipulation, no person-truth; regression clean (other `?dev` +
  menu unchanged, Local Draft → Develop Scan still sealed/offline, console clean).
  **One low copy fix:** Free Pull halo-edge note "Open the back later" → "The
  front is already complete". **Completed.** Implements Ready #0; **next up:**
  18-state audit (Ready #0).

- **Halo Gate Dev Mock v1** (2026-06-13 / BR-S031, app.js + styles.css): added a
  dev-only **sealed card-back / dossier chamber** mock at **`?dev=halo-gate`**,
  bound by `docs/halo/HALO_GATE_BOUNDARY_V1.md` — left sealed back-plate (BACK
  FACE · ARCHIVED + conservation seal) + right dossier gate panel ("THE BACK OF
  THIS CARD IS SEALED" / "The Free Pull is yours. The back is still closed." /
  three qualitative seal rows / Free-complete line / **disabled** "Open Halo
  Dossier · dev mock — no payment" + "Keep Free Pull" / scope line), DEV MOCK ·
  NOT PAYMENT · NOT REAL ANALYSIS rail+foot. **No exact counts, no numbers, no
  module inventory, no urgency/chance/person-truth** — not payment / not unlock /
  not AI/backend/analysis / not a real result. Also **migrated the Free Pull mock
  vault** (`renderFreePullMock`) from the old "Map exists — 2 image levers · 2
  target variants · setup card sealed" to qualitative sealed-back copy (boundary
  §G gap closed). **Completed & verified live** — `?dev=halo-gate` renders clean
  (no counts, disabled CTA); `?dev=free-scan-sim` no longer shows counts and stays
  polished; uploaded-result/blocked + bare menu unchanged; Local Draft → Develop
  Scan still sealed/offline; console clean. Implements Ready #0; **next up:** Halo
  Gate Ethics Audit (Ready #0).

- **Halo Gate Boundary Lock v1** (2026-06-13 / BR-S030, docs only): new ACTIVE
  spec `docs/halo/HALO_GATE_BOUNDARY_V1.md` locking the honest Free/Halo
  boundary before any Halo UI. **Free Pull = complete card front; Halo = sealed
  card back / dossier layer** of the same card (additive depth, never a hidden
  "real score"/re-roll/rarity chase). **Locked exact-count decision:** the Free
  Pull front and the pre-unlock Halo Gate must **NOT** show exact locked counts
  ("2 image levers · 2 target variants · 6 receipts found") — they read as a
  withheld inventory; use **qualitative sealed-back language** ("Sealed back ·
  archived", "Back face held in conservation"). Exact counts only post-unlock.
  Halo desirable via artifact depth, never urgency/chance/loot-box/subscription-
  trap/person-truth. Defines product frame, Free/Halo/Dossier boundaries, a copy
  bank, anti-patterns, and the implementation consequence for the next mock.
  **Supersedes** the pre-unlock count guidance in `HALO_GATE_UPGRADE_LAYUP_V1`
  §4/§5/§7/§11 + `FREE_PULL_SCREENSHOT_LAYOUT_V1` §8 (rest stands); DECISION_LOG
  + FILE_MAP record it. **Completed** — docs only, runtime untouched (the current
  `?dev=free-scan-sim` count line is a known gap, fixed in the next coding task).
  **Next up:** Halo Gate Dev Mock v1 (Ready #0), now bound by this lock.

- **Artifact Language Stabilization Pack v1 / Sample Room Tier Migration v1**
  (2026-06-13 / BR-S029, runtime + Core Change docs): migrated the **sample
  room's** visible stat language — display labels Presence→**Frame Presence**,
  Charge→**Scene Charge** (Frame/Signal kept; internal keys unchanged), public
  0–100 scores → **tier bands** (Muted/Clean/Strong/Charged/Peak via `tierBand()`)
  across card/diamond/Stat Reading/Stat Dossier/Frame Impact/Lore/Hidden/Fit+Aura;
  evidence deltas `+N`→`↑/↓`; Gesture Authority→**Gesture Geometry**; Visual
  Impact module→**Frame Impact**; banned-language sweep (confidence/Affect Trace/
  aura/standards/scene-ownership); dev-sim `FP_TIER_LADDER` + scan-contract
  `publicStats` → new ladder; dev-fixture reframeMap residue cleaned coherently.
  **Core Change Review done** — DECISION_LOG (2026-06-13) supersedes keep-names +
  numbers and **ratifies one ladder** (Muted/Clean/Strong/Charged/Peak),
  reconciled into `CARD_LOGIC_V1` §2 (+§6 mapping note); PROJECT_OS §7/§9/§10,
  SCAN_ENGINE_SPEC, COPY_SYSTEM §6, README updated. **Carve-outs (documented):**
  the dev `?dev=uploaded-result`/`uploaded-blocked` harness keeps legacy labels +
  0–100 (strictly dev, NOT USER SCAN); Metrics-tab interpretive diagnostics keep
  numeric weights. **Completed & verified live** — sample SRC-01/02 × free/halo ×
  3 tabs, dev free-scan-sim (still Checkpoint Wave), uploaded-result/blocked
  preserved, menu + Develop-gate intact, console clean; 3-agent adversarial review
  (regression/safety/scope) findings applied. No new features / no AI/backend/
  payment/Halo/upload analysis / no redesign. Completes Ready #1 (and the
  language/banned-sweep + dev-fixture cleanup). **Next up:** Halo Gate Dev Mock v1.

- **Distilled research checkpoint** (2026-06-13 / BR-S028, docs only): saved
  the distilled BLUE ROOM research into `docs/research/` — new
  `docs/research/README.md` + the pack **`RESEARCH_COMPRESSION_V1.md` (the
  compact research source for future coding/spec prompts)**,
  `HUMAN_IN_FRAME_READING_RULES_V1.md`, `RARE_ARTIFACT_TRIGGER_SYSTEM_V1.md`,
  `REFRAME_MAP_VALUE_SYSTEM_V1.md`, `LANGUAGE_SYSTEM_V1.md`. RESEARCH authority
  (informs, never implements — GOVERNANCE_OS §3); ACTIVE specs still win and
  the proposed stat-name / tier-ladder directions stay deferred to *Sample Room
  Tier Migration v1*. **Completed** — docs only, runtime untouched (no AI/
  backend/payment/Halo/upload analysis); GPT_REVIEW_GUIDE + CHANGE_MAP +
  SESSION_BRIEF note the folder. Roadmap unchanged. **Next up:** Free Pull Mock
  Polish v1 (Ready #0).

- **Free Pull Screenshot Audit** (2026-06-13 / BR-S027, audit only): audited
  the Free Pull mock (`?dev=free-scan-sim`) against
  `docs/FREE_PULL_SCREENSHOT_LAYOUT_V1.md` §11/§13 at 1600×900 + 1920×1080.
  **Verdict: PASS WITH SMALL FIXES** — reads as one landscape graded-slab
  artifact, image-dominant, safety airtight (all five gates pass, lexicon sweep
  clean), sealed vault shape-only, Halo edge calm, all `?dev` routes + menu
  preserved, console clean. Findings → *Free Pull Mock Polish v1* (Ready #0):
  receipt chips too long (~110–116 chars, wrap 2–3 lines); title "DEV FREE SCAN
  FIXTURE" un-collectible; image↔archetype mismatch (daylight Driver vs "Low-
  Light Operator / Night Print"); ~12% side margin at 1920 (1500px cap) vs the
  5–7% target. **Completed** — no code changed (audit only).

- **Free Pull Layout Mock v1** (2026-06-13 / BR-S027, app.js + styles.css):
  the dev route `?dev=free-scan-sim` now renders the **Free Pull front** as ONE
  landscape **graded-slab artifact** (image slab window ~52% + certification /
  stat-board label ~48%) per `docs/FREE_PULL_SCREENSHOT_LAYOUT_V1.md` — slim
  persistent dev rail (DEV SIMULATION · NOT REAL ANALYSIS · NOT USER SCAN),
  4 public **tier-notch** stats (no 0–100; local display ladder Quiet/Present/
  Strong/Sharp/Dominant), 2 grounded receipt chips (cue → effect), a
  **shape-only sealed vault** (sealed stat name+reason no tier · Reframe Map
  counts only — fixes the old sim leaking full Reframe contents), quiet scope
  line, calm Halo seal edge. New `renderFreePullMock()`; `renderUploadedScanResultDev`
  branches to it only in sim mode (after validation), so `?dev=uploaded-result`
  / `?dev=uploaded-blocked` are unchanged. Slab image is `SOURCES[0]` as a
  clearly-labelled dev stand-in (fixture has no photo). **Completed & verified
  live** — landscape at 1600×900 + 1920×1080, image dominates, no public 0–100,
  vault shape-only (no Reframe leak), forbidden-lexicon sweep clean, console
  clean; both other `?dev` routes + bare-URL menu unchanged; normal Local Draft
  → Develop Scan still opens the sealed engine-offline gate (zero edits to
  draft/gate code); no AI/backend/payment/Halo unlock. Implements Ready #0.
  **Next up:** Free Pull Screenshot Audit (new Ready #0).

- **Free Pull Screenshot Layout Spec v1** (2026-06-13 / BR-S026, docs only):
  new ACTIVE spec `docs/FREE_PULL_SCREENSHOT_LAYOUT_V1.md` — defines the
  **front** of the Free Pull card as a **Split Artifact / Stat Board** (one
  landscape PC-first card: image ~48% near-fullbleed + title + print/serial/
  Free Pull badge; right ~52% = archetype teaser, 4 public **tier-band** stats
  Presence/Frame/Signal/Visual Impact (no 0–100), 2 grounded receipt chips,
  sealed vault [01 Sealed Stat name+reason · 02 Reframe Map shape only], quiet
  scope line, calm Halo seal edge). Adds screenshot rules, content budget,
  receipt + tier-band + sealed-vault grammar, anti-goals, and mock acceptance
  criteria. **Roadmap corrected**: the front is specified before the Halo
  *back* is mocked. §7 recommends bands Quiet/Set/Strong/Sharp/Dominant but
  **flags the divergence from `CARD_LOGIC_V1` §2** (does not override it) —
  reconcile in Sample Room Tier Migration v1. **Completed** — docs only,
  runtime unchanged (no AI/backend/upload/payment/Halo unlock/mock); FILE_MAP
  registers it. **Next up:** Free Pull Layout Mock v1 (Ready #0).

- **Halo Gate / Upgrade Layup v1** (2026-06-13 / BR-S025, docs only): new
  ACTIVE spec `docs/HALO_GATE_UPGRADE_LAYUP_V1.md` — the Halo upgrade as a
  sealed-dossier ritual (Free complete, Halo opens the back of the same
  card; no reroll/gamble/rarity-chase), with gate timing/layout, Free
  preview vs Halo content, sealed-stat + Reframe-Map envelopes, per-scan
  price *framing* (no payment), ethical decline, post-unlock rhythm, a hard
  dark-pattern ban list, and a copy library. **Completed** — docs only,
  runtime unchanged, no payment; FILE_MAP registers it.
  **Next up:** Halo Gate Dev Mock v1 (Ready #0).

- **Card System Fixture Upgrade v1** (2026-06-13 / BR-S024): dev-only Free
  Scan Simulation (`?dev=free-scan-sim`) upgraded to CARD_SYSTEM_V1 +
  CARD_LOGIC_V1 — public tier bands (no printed 0–100), grounded receipts
  (cue → effect), scope line, sealed-stat reason, rarity reason, Reframe Map
  preview. **Completed & verified live** — fixture still passes the
  (unchanged) validator; renderer gates new surfaces on field presence so
  uploaded-result/blocked routes, normal menu/draft/Develop-gate, sample
  room, and deep links are unchanged; review 3 low findings all fixed;
  console clean. Implements the *Card System Fixture Upgrade v1* Ready item.

- **Executable Card Logic v1** (2026-06-13 / BR-S023, docs only): new ACTIVE
  spec `docs/CARD_LOGIC_V1.md` — public tier bands (no fake numbers),
  two-layer receipt grounding, 24 archetype triggers, sealed-stat / rarity /
  Reframe Map logic, low-info ladder, voice registers, Artifact-Test line
  check, validator targets. **Completed** — docs only, runtime unchanged;
  FILE_MAP registers it; review clean. **Next up:** Card System Fixture
  Upgrade v1 (Ready #0).

- **Card System Spec v1** (2026-06-13 / BR-S022, docs only): new ACTIVE spec
  `docs/CARD_SYSTEM_V1.md` — Artifact Test, final v1 stats (4 Free / 6 Halo,
  Gesture Geometry rename), 10 lenses, 24 safe archetypes, receipt rules +
  20 examples, Free/Halo output, BLUE ROOM tone, forbidden language.
  **Completed** — docs only, runtime unchanged; refines SCAN_ENGINE_SPEC
  stat taxonomy; FILE_MAP registers it.
  **Next up:** Card System Fixture Upgrade v1 (Ready #0 below).

- **Free Scan Simulation v1 — Dev Only** (2026-06-13 / BR-S021): a dev-only
  `?dev=free-scan-sim` route showing a static 3-step staged flow (Intake →
  Development → validated Free preview) from `DEV_FIXTURES.validFreeSimulationResult`
  via `renderUploadedScanResultDev(result,{mode:'free-scan-sim'})` —
  validator-gated, labelled DEV SIMULATION / NOT REAL ANALYSIS / NOT USER
  SCAN, 4 visible stats + sealed Halo. **Completed & verified live** — no
  AI, no user-photo analysis; normal menu/draft/Develop-gate, both existing
  `?dev` routes, sample room, and deep links unchanged; review 0 findings;
  console clean. Not headlessly capturable (no screenshot).

- **Uploaded Scan Result Renderer v1 — Dev Harness** (2026-06-13 / BR-S020):
  a dev-only 4th view (`?dev=uploaded-result` | `?dev=uploaded-blocked`)
  that previews a *validated* future uploaded-result via
  `renderUploadedScanResultDev` — validator-gated (invalid → blocked
  state), labelled DEV HARNESS / NOT USER SCAN, plus a new
  `DEV_FIXTURES.validDevRendererResult`. **Completed & verified live** — no
  AI, no user-photo analysis, no menu link; normal menu/draft/Develop-gate,
  sample room, and both deep links unchanged; console clean. Dev harness
  not headlessly capturable (no screenshot).

- **Scan Engine Foundation v1** (2026-06-13 / BR-S019): pure non-AI
  `scan-contract.js` (`window.BlueRoomScanContract`) —
  `validateUploadedScanResult` (uploaded-v1 shape + safety flags + evidence
  + forbidden-lexicon + sample-mixing blocks), `createBlockedScanState`,
  and `DEV_FIXTURES`; plus `renderBlockedScan` (calm safe-failure plate,
  foundation only, not wired). **Completed & verified live** — validator
  passes the valid fixture and rejects the four invalid ones; Develop Scan
  still opens the sealed offline gate; local draft still produces nothing;
  sample room + both deep links unchanged; console clean. This **completes
  the "Scan Contract Validator Stub v1"** Ready item (superseded). Spec
  field-name reconcile in SCAN_ENGINE_CONTRACT; FILE_MAP registers the
  script.

- **Scan Engine Contract v1** (2026-06-13 / BR-S018): new ACTIVE spec
  `docs/SCAN_ENGINE_CONTRACT.md` defining the future uploaded-photo result
  shape (`ScanResultUploaded v1`), allowed/forbidden lenses, lifecycle
  states, receipt rules, the Free/Halo reveal model, and engine-connection
  safety gates. **Completed** — docs only, runtime intentionally unchanged;
  uploaded results kept separate from sample ScanResult v2; `FILE_MAP`
  registers the new spec. Pushed at 2ad2fb3.

- **Local Draft Polish v1** (2026-06-13 / BR-S017): presentation-only
  polish of the intake + sealed gate — cleaner filename label (title now
  "Local image" + compact "PNG · size · short…name", real name kept
  internally), tighter card hierarchy (prominent "No scan has run yet.",
  next-step "Ready for scan development."), CTA subcopy "Stage artifact for
  future scan engine.", gate offline dot + clearer "Development pending".
  **Completed** (app.js + styles.css + SESSION_BRIEF); no engine/analysis,
  reads only `draft`; sample room + both deep links verified live; console
  clean.
  *(Previous active — Scan Development Gate v1 — pushed at e19e183.)*

- **Scan Development Gate v1** (2026-06-13 / BR-S016): Local Draft intake
  gains a "Develop scan" CTA → sealed **Scan Development Gate**
  (`state.draftGate`, `renderGate()`) saying the engine is not connected;
  disabled run button; generates NOTHING (no stats/receipts/oracle/hidden/
  mint/Halo), never calls getActiveScan/getScanResult or touches
  SOURCES/SCAN_RESULTS_V2. **Completed** (app.js + styles.css +
  SESSION_BRIEF); return/replace/sample-room/menu paths + both deep links
  verified live; gate not headlessly capturable (no screenshot); pushed at
  e19e183.
  *(Previous actives — Local Draft intake v1, Main Menu v1, conversion
  spine pass, product clarity pass, v2 rendering wiring, v2 data shape,
  SPINE promotion, governance OS, doc spine cleanup — completed
  2026-06-12/13.)*

## Ready (supported by current docs, clear definition of done)

   *(Scan Contract Validator Stub v1 — completed by BR-S019 Scan Engine
   Foundation v1; see Active.)*
   *(Card System Fixture Upgrade v1 — completed by BR-S024 for the
   `validFreeSimulationResult` sim fixture (tier bands, grounded receipts,
   scope/sealed/rarity/Reframe Map). `validDevRendererResult` (the raw
   uploaded-result harness) was intentionally left on its prior shape; a
   future pass can align it too if wanted.)*
   *(Free Pull Layout Mock v1 — completed by BR-S027; the `?dev=free-scan-sim`
   route renders the landscape split-artifact Free Pull front. See Active.)*
   *(Free Pull Screenshot Audit — completed by BR-S027 (audit only). Verdict:
   PASS WITH SMALL FIXES; findings fed Free Pull Mock Polish v1.)*
   *(Free Pull Mock Polish v1 — completed at commit 700d8f8: chips shortened,
   title→Checkpoint Wave, archetype→The Signal Bearer / Day Print, max-width
   evaluated + reverted. Not separately queue-logged at the time.)*
   *(Sample Room Tier Migration v1 — completed by BR-S029 (Artifact Language
   Stabilization Pack v1; see Active). One ladder ratified — Muted/Clean/Strong/
   Charged/Peak; sample room shows tier bands, no public 0–100; CARD_LOGIC_V1
   §2 + FREE_PULL §7 reconciled.)*
   *(Halo Gate Dev Mock v1 — completed by BR-S031; `?dev=halo-gate` renders the
   sealed card-back chamber and the Free-scan-sim vault migrated to qualitative
   copy. See Active.)*
   *(Halo Gate Ethics Audit v1 — completed by BR-S032. Verdict PASS; one low
   copy fix applied (Free Pull halo note). Audit doc
   `docs/audits/HALO_GATE_ETHICS_AUDIT_V1.md`. See Active.)*
   *(18-state audit — completed by BR-S033 (Sample Room 18-State Audit v1).
   Verdict PASS WITH FIXES; migration correct across all 18 states, 4 person-
   pronoun copy fixes. Audit doc `docs/audits/SAMPLE_ROOM_18_STATE_AUDIT_V1.md`.
   See Active.)*
0. **data.js copy audit against COPY_SYSTEM** (NEXT) — the grammar postdates most
   shipped copy.
   *Done when:* every string in data.js passes the banned-word list, the
   tone test (§1) and the every-outcome-is-a-win rules (§5); fixes
   committed; no meaning drift.
1. **Render archetype discovery note in Halo** — PROJECT_OS visibility
   table promises "full archetype explanation + discovery note" in Halo;
   no data field or render exists yet. Pull discovery notes from
   COPY_SYSTEM §4 (Encounter / Dispatch).
   *Done when:* Halo shows the archetype class + discovery note (right
   panel or dossier §4/§5 — not on the card); Free shows label only.
2. **Three shiny material prototypes** — CARD_TECH_LAB §20: Cold Foil /
   Black Star / Night Gloss as data-only `halo` presets behind the Lab
   key, no layout changes.
   *Done when:* three presets switchable in Lab, screenshots captured and
   compared side-by-side, comparison filed in CARD_TECH_LAB.
3. **Dossier plate material polish** — taste debt from the 2026-06-12
   review: plates read flat next to the card; let the material accent
   bleed in (Mint Record plate already does).
   *Done when:* Halo dossier plates carry a restrained material accent;
   free stays matte; screenshots regenerated.
4. **Route label in Source Record** — the last remnant of v2 surfacing:
   one row in the dossier Source Record showing `scan.route` +
   `scanStatus` (e.g. "HUMAN_SOLO · accepted"), legacy-safe when v2
   absent. Tiny app.js change.
   *Done when:* the row renders in both states; copy passes COPY_SYSTEM.

## Backlog / needs decision

- **Final Halo material decision** — after Ready #2 (Three shiny material
  prototypes); log winner in DECISION_LOG, promote rules to PROJECT_OS
  (CARD_TECH_LAB §18/§20).
- **Develop/mint transformation moment** — CARD_TECH_LAB §15; needs scope
  decision (animation budget, where it triggers).
- **Rare-variant ladder** (Black Star etc. as tiers above Halo Mint) —
  needs the material decision first.
- **Local upload preview** (roadmap Phase 2) — only after the visual
  direction passes the "I want my own card" test.
- **Deterministic ScanResult engine** (Phase 3), **AI-assisted reading**
  (Phase 4), **$7 mint flow** (Phase 5), **Vault** (Phase 6).
- **Profile layers** (MBTI/zodiac/etc.) — user-provided only, never
  inferred; needs activation decision.
- **Mobile pass** — currently basic fallback by decision; needs a "now
  it matters" call.

## Retired / won't do

- Free Pull / Signature Mint / Halo Foil three-tier structure (retired
  2026-06-12; DECISION_LOG).
- Signature Mint as a customer-facing tier (survives only as internal
  Lab state + signature/mint language).
- "Develop into Halo Mint" as primary CTA (replaced by "Develop this
  scan").
- Face-rating, attractiveness scoring, social comparison, public
  rankings, friend comparisons — REJECTED permanently.
- Blur-veil paywall styling for free content (replaced by undeveloped
  archive plates).
- 10-fixture prototype and pre-isolation scan-room copy (archived to
  `_OLD_ARCHIVE_DO_NOT_USE`).
