# BLUE ROOM — Task Queue

Ranked work queue, not a dream backlog. One Active item at a time.
Out-of-scope findings from any session get logged here, not patched.
Last updated: 2026-06-14.

## Active

- **Dev Nav Rail v1** (2026-06-14 / BR-S040, index.html + app.js + styles.css): a dev-only
  on-screen state-jumper revealed ONLY by `?devnav=1` — Menu/Room · SRC 01/02 · Free/Halo/Lab ·
  Source/Diagram/Metrics · the 4 dev fixtures (Free-Sim/Halo-Gate/Uploaded/Blocked) + a "◆ DEV"
  tag — so the builder can inspect every state without typing URLs. One `<nav id="devnav" hidden>`,
  `renderDevnav()`, one delegated `[data-devnav="kind:val"]` handler reusing the existing setters
  (`applyView`/`render`; `treat/src/tab` also enter the room), `DEVNAV` flag + mount after
  `mountMenu()`, `.devnav` CSS. **Triple-gated** (`body[data-devnav="1"]` + CSS `display:none` +
  `hidden` attr) so it can NEVER paint for a real user; dev-fixture buttons reload carrying
  `&devnav=1` (`mountDev` runs only at init). **Pre-edit 3-agent critique → GO_WITH_CHANGES** —
  cut the "pick"/draft button (product side-effect), added the body-attr+CSS gate + DEV tag, kept
  reload for fixtures. No DECISION_LOG (routine dev tooling). **Verified live**: `?devnav=1` rail +
  all 14 buttons land their state; Halo-Gate fixture reloads + rail persists; clean `?src=1&t=shiny`
  + bare menu show NO rail (unfilled, `display:none`, no `data-devnav`); console clean. Additive
  (revert = delete the block). **Completed.** First step of the builder's agreed sequence (dev-nav →
  menu re-frame → left redesign). **Next up:** Menu Re-frame v1 (the "layup" / FREE_PAID menu fix).

- **Base-Hex + Warm-Ramp Lock v1** (2026-06-14 / BR-S039, styles.css `:root` + governance docs):
  locked the token foundation `RESEARCH_SYNTHESIS_V1` gates all contrast/type work on ("…font-roles
  + tabular numbers + one-focal-point *after* locking one base hex + one warm ramp"). **Narrowed
  from the incoming "Token Foundation Lock v1" prompt by the mandatory 11-agent pre-edit critique →
  NARROW_SCOPE** — three sub-parts were impossible/illegal as written: `--vault-*` is defined
  **nowhere in code** (doc-only, in `RESEARCH_SYNTHESIS_V1` + `TEXT_EYE_TRAVEL`); "one plate-bg hex"
  collides with the LOCKED per-source Copper/Frost plates (2026-06-12); tier-ratio/engraved-shadow
  re-tune touches the LOCKED Muted/Clean/Strong/Charged/Peak ladder (2026-06-13) / a letterpress
  shadow PAIR that doesn't exist. **Shipped (one commit):** `--ink-950 #0a0907 → #0a0b0d` (the
  deepest room-shadow floor — the only token value changed) + `:root` comments naming the lock;
  `--t-*` warm Sand ramp affirmed UNCHANGED; DECISION_LOG entry (resolves canon `#0a0b0d` vs shipped
  `#0a0907`; logs the cool-floor/warm-text tension under the warm-neutral rule); DESIGN_TOKENS
  "Locked token canon" backfill; TEXT_EYE_TRAVEL cool `--vault-*` ramp annotated SUPERSEDED. Visual
  delta ≈ nil (floor shift < 1% luminance, never under text); `--ink-900/850/800/700` untouched
  (their re-derivation is the deferred tier-ratio task — and `--ink-900` doubles as dark-on-light
  chip text). **Verified** in-browser (`getComputedStyle`; screenshot tool times out): `--ink-950`
  resolves to `rgb(10, 11, 13)`, `--t-*` byte-unchanged, room/card/7-plate dossier render in
  free+shiny on both sources, 4 `?dev` routes + bare menu uncrashed, console clean. **Completed.**
  **Split out to Ready #6/#7 (gated behind this lock):** Tier-ratio re-derivation v1 + Plate-bg
  consolidation v1. **Next up:** Engineered Technique Pass #2 (scroll-driven dossier reveal) — unchanged.

- **Filing-Event Row + Serial Reveal on Plate 01** (2026-06-14 / BR-S038, app.js +
  styles.css): the research-canon "convergent first build" (`RESEARCH_SYNTHESIS_V1`
  closing line; endorsed by MAGNETISM filing-event row + DEPTH/LAYERING serial-spine).
  On dossier **Plate 01 (Source Record)**, below the record grid, two **flat** caption
  blocks (copy + CSS only; no data.js change — all fields already existed):
  **(A) Filing event** — descending caption `capture · {code} ↳ route · {route} ↳
  scan status · {status} ↳ filed as · {class}`, both states (Free watches the photo
  get classified); frozen-past, no numbers, **no discovery-note prose** (that stays
  Halo-only in the right-panel Artifact Archetype module — the class LABEL recurs as
  the DEPTH content-axis join, the prose does not). **(B) Serial lineage** — a flat
  left-rail spine `Object → Scan → Card → Mint`; **Card + Mint are developed
  identities → masked `····` on Free, assigned on Halo** (latent→developed law; serials
  pulled from `scan.tierOutputs`, not hand-rolled). `objectNo` moved out of `.drecord`
  to the spine head (single source, no duplication). **No 8th plate** (inside Plate 01's
  body → 7-plate `:nth-of-type` rhythm intact). Mandatory pre-edit **4-agent adversarial
  critique** (research-fidelity / drift+duplication / copy-safety / regression+data-shape)
  → all REQUIRED changes folded in (dropped the duplicate discovery note; masked the Card
  rung too once `card.serial` was confirmed latent in Free on the card; full optional-
  chaining guards; no `ARCHETYPE_NOTES` lookup → no crash vector). **Verified live**
  (1500×2600 headless-Edge screenshots + DOM): SRC-01/02 × free/halo all correct
  (The Encounter / The Dispatch; BR-OBJ→BR-SCAN→card→mint; `····` ghost on Free,
  assigned on Halo); no confidence/0–100 leak; no discovery-prose leak on Plate 01;
  `?dev=halo-gate` (renderDossier runs unconditionally) uncrashed; console clean; 7 plates.
  **Completed.** Clears Ready #6 "Route label in Source Record" (superset).
  **Next up:** Engineered Technique Pass #2 (scroll-driven dossier reveal) — resume the
  technique program, OR pull the next Around-the-Card / interconnection layer.

- **Engineered Technique Pass v1** (2026-06-14 / BR-S037, in progress — styles.css):
  ranked build program from the deep code-design scout (5 web-standard, zero-dep,
  reduced-motion-safe techniques, each mapped to an existing surface). **One
  technique = one commit** for granular revert against `baseline-v1`. **#1 SHIPPED:
  CSS `corner-shape` chamfered "machined-cut" card corners** (`@supports`-gated on
  `.card`/`.card__plate`; square-radius fallback; geometry unchanged; verified via
  headless-Edge screenshots + DOM; console clean). Ranked remainder: **#2 scroll-
  driven dossier reveal**, **#3 `@property` stat-band fill** (both high value-
  confidence), **#4 SVG line-draw (Diagram)** + **#5 pointer spotlight (Lab)** (held
  pending a visual/value check — gimmick/soft-SaaS risk on #5). Candidates +
  rationale: deep-scout research result; copy-safe/revert guidance in
  `docs/REVERT_PLAYBOOK.md`. **Next up:** technique #2 (scroll-driven dossier reveal).

- **Three Shiny Material Prototypes v1** (2026-06-14 / BR-S036, data.js + app.js +
  styles.css): built CARD_TECH_LAB §20's three card-finish studies — **Cold Foil ·
  Black Star · Night Gloss** — switchable in the **Lab state** for screenshot
  comparison. Implemented as a **`data-lab-material` overlay** on the existing
  `mint` (Lab) card, NOT a new `data-treatment` (which would crash the
  `TREATMENTS[treatment]`/`t.rarity` lookup and churn gating/stateBadge/toggle/
  keyboard/18-state — divergence from §20 #4 named in CARD_TECH_LAB §20). Copy-only
  `LAB_MATERIALS` (3 finish presets); `state.labMaterial`; guarded `?lab=` deep
  link (applies only at `t=mint`); Lab-only `[`/`]` cycle; one-slot
  "LAB STATE · <finish>" label. **100% static** skins (each neutralizes the
  inherited shimmer; distinct material base; `--halo-*` accent only; tight-shadow
  glow, no large-area blur; geometry locked). **Free + paid Halo (`shiny`) +
  Halo Gate + dev routes untouched.** No winner picked / no DECISION_LOG /
  PROJECT_OS promotion — deferred to the *Final Halo material decision* backlog
  item (provisional lean Black Star / Night Gloss filed in CARD_TECH_LAB §20).
  Pre-task 2-agent Opus critique → GO_WITH_CHANGES, all changes applied. **Verified
  live** (DOM + computed-style; headless screenshot tool times out on this project):
  3 finishes apply only at `t=mint` with distinct bases + label + static shimmer;
  `t=free`/`t=shiny` ignore `lab`; geometry locked (440×~721, no label wrap) across
  all finishes + free + shiny; `[`/`]` cycle/wrap + `f`-exit clears overlay; 4 dev
  routes + bare menu unchanged; Local Draft → Develop Scan still sealed/offline;
  console clean. **Completed.** Implements the former Ready #0 (Three shiny material
  prototypes); **next up:** Halo Dossier Schema v1 — schema first, not full route
  (newly the head of Ready below).

- **Render Archetype Discovery Note v1** (2026-06-14 / BR-S035, app.js + data.js +
  COPY_SYSTEM §4): rendered the Halo archetype discovery note promised by
  PROJECT_OS §10's visibility table ("full archetype explanation + discovery
  note") — it had no data field/render. Copy-only `ARCHETYPE_NOTES` (class-keyed,
  2 entries pulled verbatim from COPY_SYSTEM §4) + a new **"Artifact Archetype"**
  reading-panel module shown in **developed states only** (prepended to the `!free`
  deep block; one existing gate covers mint + shiny). **Free unchanged** — the
  card keeps the instance archetype label ("label only"); no teaser added. **Zero
  new CSS** (reuses module/aura/`.module__line--fit` pulled-quote/`.metriccap`);
  module **omits cleanly** when the v2 class is absent. Anti-drift: the chip
  "Artifact class · The Encounter/Dispatch" + the header bind the governing noun
  so it reads as a photo role, not a personality. Surgical COPY_SYSTEM §4 sub-fix:
  the Encounter note de-second-personed ("does not let **you** observe" → "does
  not **wait to be** observed", dated retirement note) so shipped copy = canon
  (BR-S034 precedent). Right-panel chosen deliberately — the Done-when "dossier
  §4/§5" path is the unbuilt Halo Dossier (HALO_GATE_BOUNDARY §D "define; do NOT
  build") and the dossier is 7-plate-capped. Pre-edit 5-agent adversarial critique
  (coherence/drift/copy-safety/UI-fit/data-shape) → **GO_WITH_CHANGES**, all
  changes applied. **Verified live** (1600×900): src1 (Encounter) / src2 (Dispatch)
  × shiny × source+metrics render the note; Free complete (no module); 4 dev routes
  + bare menu unchanged; Local Draft → Develop Scan still sealed/offline; no public
  0–100; console clean. **Completed.** Implements the former Ready #0 (Render
  archetype discovery note); **next up:** Three shiny material prototypes (now
  Ready #0).

- **data.js Copy System Audit v1** (2026-06-13 / BR-S034, audit + 3 small fixes):
  audited all sample-card copy in `data.js` against COPY_SYSTEM (banned-lexicon,
  five-gate, tone, every-outcome-is-a-win) — two token-greps + an independent
  adversarial sub-agent. **Verdict PASS WITH FIXES.** Confirmed 0 `you/your`, 0
  gendered pronouns, 0 banned status/beauty/SaaS in visible copy; every-outcome-
  is-a-win holds. **3 small fixes (no logic change):** "tax the score"→"tax the
  composition" (statNote); internal routeLogic "dominant"→"strongest stat pair"
  (non-rendered, defense-in-depth); + COPY_SYSTEM §6 canon "for you"→"for the
  lens" coherence. New audit doc `docs/audits/DATA_COPY_SYSTEM_AUDIT_V1.md`.
  Verified live (4 representative states + 4 dev routes + menu + sealed/offline
  flow unchanged; data.js parses; console clean). **Completed.** Implements
  Ready #0; **next up:** Render archetype discovery note in Halo (Ready #0).

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

> **Builder-set near-term sequence (2026-06-14, BR-S040):** dev-nav (DONE) →
> **Menu Re-frame v1** → **Left redesign (Source merge)** → Below redesign (Dossier
> de-dull) → Right polish. Grounded by the direction-synthesis workflow + research:
> - **Menu Re-frame v1 (NEXT)** — the "layup" fix. `FREE_PAID_MODEL_V1` verdict: the
>   complete-front/sealed-back model is LOCKED and right; the defect is tier-ladder
>   FRAMING on the menu (the `.msample__compare` Free-vs-Halo tiles + the "→ develops"
>   arrow + Halo inventory chips read as "pick the better grade"). Fix in `renderMenu`
>   only: render ONE complete Free card in its graphite/moss key, drop the compare-tiles
>   + arrow + chips, caption with completeness ("sealed back · held in conservation", no
>   counts) — realizes free-as-hero. Builder framing: the perfect landing page, "scan
>   your image → a pull", magnetic but no hype/overreach. Do NOT touch the LOCKED
>   sealed-back (`renderHaloGateMock`) or darkroom copy. *Done when:* menu reads as one
>   complete artifact (not a tier ladder); no Halo inventory list / "→develops" arrow;
>   boundary copy untouched; routes + console clean. (Deferred sibling: soften the same
>   ladder on the in-room "Develops:" CTA + the 7× ARCHIVE-PULL plate tags.)
> - **Left redesign — Source merge** = `LAYUP_RESEARCH_V1` Task #4 (collapse Source into
>   Diagram as CLEAN|ANNOTATED, delete the redundant Capture Record, re-point ?tab=source).
> - **Below redesign — Dossier de-dull** = LAYUP Task #3a (counting-spine gutter, room→archive
>   threshold rule, shutter reveal). **Right polish** = LAYUP Task #3b (later; "medium", not "lacking").
> - **Set aside (builder, BR-S040):** a full Halo card "example" — a populated stats-card
>   trips the magnetism kill-rule; revisit later (sealed-back only if shown). Deeper
>   "essence / marketing / value-stacking / existence-framing" = a FUTURE research pass, not now.
> - Held: "diagram of the card" (#5, new concept, after left/below) + a darkroom "how it works" surface.

> **Around-the-Card Redesign program (pull on demand)** — the prioritized redesign
> for everything around the card lives in **`docs/research/LAYUP_RESEARCH_V1.md`**
> (RESEARCH). 5 ranked tasks: **1 Dim technical lines · 2 Unify buttons + top-bar
> rail · 3 Right panel + dossier de-dull · 4 Source merge · 5 Metrics redesign**
> (keepers: card + diagram). Pull one when we want more — run it through the normal
> pre-edit critique, one commit behind `baseline-v1`. The loose "Engineered Technique
> Pass" items below (scroll-driven reveal, `@property` fill, line-draw, spotlight) are
> **folded into** that plan (reveal → task 3, line-draw → diagram refine, etc.) — track
> the redesign from the research doc, not as separate technique items.

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
   *(data.js copy audit against COPY_SYSTEM — completed by BR-S034 (data.js Copy
   System Audit v1). Verdict PASS WITH FIXES; 3 small fixes. Audit doc
   `docs/audits/DATA_COPY_SYSTEM_AUDIT_V1.md`. See Active.)*
   *(Render archetype discovery note in Halo — completed by BR-S035 (Render
   Archetype Discovery Note v1). The Halo/developed right panel now renders the
   **Artifact Archetype** module — class chip ("Artifact class · The Encounter/
   Dispatch") + the COPY_SYSTEM §4 one-liner + discovery note; Free shows the card
   instance label only. Right-panel, not dossier §4/§5 (= unbuilt Halo Dossier per
   HALO_GATE_BOUNDARY §D). See Active.)*
   *(Three shiny material prototypes — completed by BR-S036 (Three Shiny Material
   Prototypes v1). Cold Foil / Black Star / Night Gloss render as a
   `data-lab-material` overlay on the Lab (mint) state, switchable via
   `?t=mint&lab=<key>` or the `[` / `]` keys; recipes + provisional lean (Black
   Star / Night Gloss) filed in CARD_TECH_LAB §20. Built as an overlay, NOT §20
   #4's new `data-treatment` (avoids the `TREATMENTS`-lookup crash + gating churn).
   Formal winner pick deferred to "Final Halo material decision". See Active.)*
   *(Engineered Technique Pass #1 — Card corner-shape edge — SHIPPED BR-S037; see
   Active. The pass is now the active program ahead of Halo Dossier Schema, per the
   user's direction to pursue the scouted techniques.)*
0. **Engineered Technique Pass #2 — scroll-driven dossier reveal** (NEXT) — per-plate
   entrance via `animation-timeline: view()` + `clip-path: inset()` (mechanical
   shutter, not a soft fade) on the 7 dossier plates. Zero-JS, off-main-thread.
   *Done when:* each `.dplate` reveals on scroll, `@supports`-gated, `prefers-reduced-
   motion` → fully shown; dossier still renders in both states; geometry/console clean.
1. **Engineered Technique Pass #3 — `@property` stat-band fill** — register `--fill`
   as `<percentage>`, animate `0% → band` on the stat bars (smooth gauge interpolation).
   *Done when:* bars interpolate; NO 0–100 number ever surfaces (tierBand words only);
   reduced-motion neutralized; free/halo unaffected.
2. **Engineered Technique Pass #4 — SVG line-draw (Diagram)** *(held — visual/value
   check first)* — `stroke-dashoffset` draw on the Diagram-tab overlays on tab
   activation; RM → drawn. Watch existing dash hairlines (use `pathLength`/separate layer).
3. **Engineered Technique Pass #5 — pointer spotlight (Lab)** *(held — visual/value
   check first; gimmick/soft-SaaS risk)* — pointer-tracked radial-gradient (`--x/--y`)
   with `mix-blend-mode: soft-light` over the Lab card photo; rAF-throttled, re-centers
   on leave; the only one adding JS.
4. **Halo Dossier Schema v1** — schema FIRST, not the full route/build. Define the
   data shape for the sealed Halo dossier (the card back) per
   `docs/halo/HALO_GATE_BOUNDARY_V1.md` §D (7 candidate modules are "production notes
   — define, do NOT build"), reusing the audited artifact-safe language; no runtime
   build, no payment/AI/unlock/upload. *(Deferred behind the technique pass per user
   direction; still the right "schema-not-route" framing when it comes up.)*
   *Done when:* a Halo dossier schema spec exists (fields + safety rules + the
   Free/Halo reveal model), FILE_MAP registers it, runtime unchanged.
5. **Dossier plate material polish** — taste debt from the 2026-06-12
   review: plates read flat next to the card; let the material accent
   bleed in (Mint Record plate already does).
   *Done when:* Halo dossier plates carry a restrained material accent;
   free stays matte; screenshots regenerated.
6. **Tier-ratio re-derivation v1** *(gated behind Base-Hex + Warm-Ramp Lock v1, BR-S039)* —
   re-derive the upper `--ink-*` surface stops (900/850/800/700) and the public tier-band
   lightness ratios against the now-locked base `#0a0b0d`, so the warm dark ramp and the bands
   compute from canon rather than the legacy `#0a0907` floor (canon "re-derive the tier ratios
   against it"). *Done when:* the `--ink-*` stops + band ratios derive from `#0a0b0d` (ratios
   stated explicitly); the LOCKED **Muted/Clean/Strong/Charged/Peak** ladder (DECISION_LOG
   2026-06-13) is preserved — no collapse/reorder/rename; `--ink-900`'s dark-on-light chip uses
   (`.toggle__btn.is-active`, `.marker__no`, `.markerlegend__no`) keep AA in the OPPOSITE
   direction from the substrate; verified via `getComputedStyle` contrast deltas; console clean.
7. **Plate-bg consolidation v1** *(gated behind BR-S039; do AFTER #6)* — unify only the
   **base/default** `.card__plate` gradient against the locked base; **preserve the LOCKED
   per-source Copper/Frost material plates** (mint `#171a20`, cold-foil `#141a23`, night-gloss
   `#0c121b`, black-star, shiny — DECISION_LOG 2026-06-12) and the frost cool carve-out. Its
   **last step** is the engraved text-shadow re-tune — tune the 3 single dark shadows
   (`.scanframe__meta`, `.photo__meta`, `.fpcard__title`) TO the locked plate; do NOT add a
   letterpress PAIR unless explicitly decided. *Done when:* the default plate reads against
   `#0a0b0d`; the 5 material plates + frost are visibly unchanged; engraved captions stay crisp
   (not muddy on the slightly cooler floor); free stays matte; verified in-browser; console clean.
   *(Route label in Source Record — completed by BR-S038 (Filing-Event Row +
   Serial Reveal on Plate 01; see Active). The filing event surfaces route +
   scanStatus (+ capture code + filed-as class) on the dossier Source Record in
   both states, legacy-safe via optional-chaining guards. Superset of this item.)*

## Backlog / needs decision

- **Final Halo material decision** — after Three Shiny Material Prototypes v1
  (completed BR-S036; prototypes + provisional lean now exist in CARD_TECH_LAB
  §20); log winner in DECISION_LOG, promote rules to PROJECT_OS
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
- **COPY_SYSTEM §4 residual second-person** (logged BR-S035, not patched) —
  two library archetype notes still carry "you/your": **The Anchor**
  ("…including your attention.") and **The Civilian** ("…arranged for you.").
  Out of scope for BR-S035 (neither class is in `ARCHETYPE_NOTES` or rendered).
  De-second-person them (same shape as the BR-S035 Encounter / BR-S034 §6 fixes)
  **before** either class is ever added to `ARCHETYPE_NOTES` and surfaced.

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
