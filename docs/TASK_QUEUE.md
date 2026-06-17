# BLUE ROOM — Task Queue

Ranked work queue, not a dream backlog. One Active item at a time.
Out-of-scope findings from any session get logged here, not patched.
Last updated: 2026-06-15.

## Completed (shipped tasks, newest first)

> This section is the COMPLETED-TASK LOG, not pending work. The current/next active item
> is the head of **Ready** (below) — one at a time (this file's intro rule). For the
> authoritative "what shipped" trail, cross-check `docs/DECISION_LOG.md` + `git log`.

- **Free finish LOCKED — Letterpress Archive Edition (Free's default)** (2026-06-17 / BR-S060, styles.css +
  app.js + data.js): the builder picked **Letterpress** over Sun Ledger (BR-S059 live fork) + asked for a touch
  more depth. Promoted from dev preview to Free's shipped default: warm-graphite uncoated EDITION BOARD —
  organic baked paper-fiber grain (SVG fractalNoise, soft-light) + lit surface depth (directional light + corner
  falloff + a recessed inner shadow), a struck solid-border "FREE PULL EDITION" deboss, and a REAL object serial
  on the Free front. **Retired** the stale "UNMINTED · ARCHIVE PREVIEW" / "FREE PULL" copy (contradicted
  GOLDEN_NUGGETS #5) → rarity "ARCHIVE EDITION", stamp/strip "FREE PULL EDITION", new tagline, right-panel badge
  border dashed→solid. **Dropped** the Sun Ledger preview + the whole dev-toggle scaffolding (`state.freeFinish`
  / `?free=` parse / `data-free-finish` attr / `FREE_FINISH_COPY`) — Letterpress is the unconditional
  `.card[data-treatment="free"]` look; no dead code. Restyle-only (5 LOCKED material plates + frost + geometry
  untouched); pure static CSS, reduced-motion-safe. **Verified live** (DOM/getComputedStyle): default Free =
  board + grain + depth + struck stamp + real serial + ARCHIVE EDITION + solid badge; no PREVIEW/UNMINTED
  strings; Halo/Lab plates + geometry intact; console clean; no orphan refs. DECISION_LOG entry added (Free
  stays redesignable). **Completed.** **Next up (builder re-scope 2026-06-17):** the live card work is settled —
  Halo crown stays as-is (builder approves the current dark/sleek shiny). Roadmap pivots to the SCAN-ROOM LAYOUT
  + the FREE/PAID FUNNEL redesign (see the Backlog roadmap).
- **Free finish dev previews v1 — Letterpress + Sun Ledger** (2026-06-17 / BR-S059, styles.css + app.js +
  dev-live.html): the CARD DESIGN MISSION's first build — Free Pull's OWN matte archive finish (a different
  KIND than Halo, NOT Halo-minus-shine), as TWO switchable dev-only directions for a live taste pick, mirroring
  the BR-S036 Lab-material pattern. **Letterpress Archive Edition** — warm-graphite uncoated board: paper tooth
  (4 radial flecks + repeating-linear weave) baked into `.card__plate`, hard `0 2px 0` object shadow, struck
  solid-border deboss "FREE PULL EDITION" stamp, moss frame/corners. **Sun Ledger / cyanotype** — cool iron-blue
  contact print: verbatim greyscale `.photo__grain` noise + cool cast + exposure ramp baked into the plate,
  pewter deckle. Both surface a REAL object serial (SRC-01 `BR-001-DRV-0001` / SRC-02 `BR-002-ICE-0001`; Sun
  Ledger adds a FIXED `EXP 01` address token, never a /N count) + per-finish copy (ARCHIVE EDITION / SUN LEDGER
  EDITION) via a gated `FREE_FINISH_COPY` map. **Switch:** `?free=letterpress|sun-ledger` (DEVNAV-gated) or the
  dev-live.html Free chips. **100% gated** — `state.freeFinish` only sets under `?devnav`, the attr only emits at
  `t=free`, and ALL copy/serial/badge changes are behind it, so the shipped default Free stays **byte-identical**
  (verified VM-0). Restyle-only (scoped `[data-free-finish]`; the 5 LOCKED material plates + frost + master
  geometry untouched); pure static CSS, reduced-motion-safe. Designed via an 11-agent fit-filtered workflow
  (ground → 4 directions → judge → 3 adversarial stress lenses → finalize; the stress pass caught + folded a
  shared-copy collision, a default-stability leak, and the SVG-noise "tint verbatim" contradiction). **Verified
  live** (DOM/getComputedStyle — screenshots unreliable at this DPR; temp index.html cache-bust used + reverted):
  both finishes render baked plates + struck stamps + real serials; DEVNAV gate holds (clean `?free` inert);
  shiny/mint locked plates + geometry intact; console clean. **No winner locked / no DECISION_LOG / no PROJECT_OS
  promotion** — deferred to the builder's live taste pick (BR-S036 precedent). **Completed.** **Next up:** builder
  picks Letterpress vs Sun Ledger (+ accent/serial-wording forks); a follow-up commit then locks the winner into
  Free's shipped default (promote the plate block + gated copy/serial/stamp into the bare
  `.card[data-treatment="free"]`, retiring "UNMINTED · ARCHIVE PREVIEW").
- **WARRANT PEN audit → warrant-audit rule adopted, full loop held** (2026-06-17 / BR-S058, docs only —
  GOVERNANCE_OS + DECISION_LOG + TASK_QUEUE): audited the builder's forged WARRANT PEN draft via a 14-agent
  workflow (2 ground → 6 adversarial lenses → synth → 4 stress incl. an independent kill-advocate → finalize).
  **Verdict DOWNSCOPE/FOLD:** the control-vs-warrant axis is genuine + uncovered (THE GATE catches contradiction,
  `-STATE-A/-B` enforcement; nothing asks whether a rule's breadth is earned), but the full capture→pool→metabolize
  loop delegates its clock (Signal Map), pile-judgment (`/white-death`) and routing (DECISION_LOG/Backlog) — after
  subtraction it rests on one insight + FREEZE on a single already-parked seed: by its own kill-gate, warrant-debt.
  **Shipped the warranted part only:** a ~6-line **warrant-audit pointer** in GOVERNANCE_OS (control vs warrant;
  capture-on-friction → `warrant-debt` Backlog; FREEZE as a corollary of build-from-ACTIVE-only). Logged **GN #11**
  as the first real capture (not the parked magnetism seed). Held the full loop as a redesigned DRAFT in `.claude/tmp`
  (untracked) on an **expiry clock** — auto-drops to the pointer if <3 non-seed captures by BR-S +8 (the hold can't
  rot into cruft). Fixed the draft's faults (magnetism→GN #7; real 4-BR-S clock not "~2"; closed Signal-Map columns
  respected; genus-among-species taxonomy collapsed; tripwire-not-sweeper named). No standalone doc (unearned); no
  runtime/code change. **Completed.** **Next up:** the CARD DESIGN MISSION (Free's matte finish + Halo crown), gate
  cleared by BR-S057.
- **Free-completeness spec reconcile — THE GATE** (2026-06-17 / BR-S057, docs only — PROJECT_OS +
  DECISION_LOG + TASK_QUEUE): the CARD DESIGN MISSION's mandated first move. Reconciled PROJECT_OS's stale
  CURRENT prose (§2, §4 line 107, §8, §10 banner/description/Free-Pull-rule, §16 Q1) — which framed Free as
  "incomplete / archive preview / should seduce / teaser" — to LOCKED canon `GOLDEN_NUGGETS` #5 ("Free is the
  complete front; paid is the same scan developed deeper, a mode not a grade") + the LOCKED Halo Gate Boundary
  Lock v1. Free now reads as the COMPLETE FRONT (whole at its scope); the dossier/back is the deeper latent
  layer Halo develops (added depth / a different kind of record — never withheld or paywalled). PROJECT_OS now
  CITES #5/#6 (place-once), drops the banned word "withheld" from the §10 table, corrects the stale §8 blur-veil
  line + §16 Q1's stale "Signature Mint" → "Halo Mint". **Slim Spec Change** — aligns CURRENT text to already-
  LOCKED canon, so no Core Change Review. **Mandatory pre-edit critique** = a 3-lens adversarial workflow
  (over-reach/process · completeness/drift · canon-fidelity) → all **GO_WITH_CHANGES**; folded in: the §16 Q1 +
  table "withheld" fixes, the "added depth / a different kind, not the same thing brighter" counterweight (so
  "complete" can't be misread as "same content dimmed" — the killed model), and stripping the non-canon term
  "read-scope" the handoff coined (canon's word is "mode" / "the read"). One critic mis-flagged "blur-veil
  retired" as unbacked — it is recorded at this file's Retired list; the shipped wording is true to both the
  code (dashed `.module--locked`, no blur) and that record. Scope: completeness framing ONLY — Free's muted
  palette / dashed UNMINTED stamp / ghost serial stand (the design task owns Free's finish). No runtime/code
  change; docs-only ⇒ no browser verify. **Completed.** **Next up:** design Free's own matte finish + the Halo
  crown structure (`research/CARD_CRAFT_FIT_V1.md`) — the rest of the CARD DESIGN MISSION.
- **Governance + Signal Map + card-craft research day** (2026-06-17, docs only — multi-agent
  workflows; ~12 commits local, unpushed): persisted the **Reading Doctrine** (DRAFT, `docs/governance/`);
  **FORMULAS** copy honesty fix (read-through, not derived-from); **place-once cleanup** (2 GOVERNANCE_OS
  rules — one-canonical-statement + decided⇒Backlog-not-Parked — plus magnetism/two-track restatements →
  citations, Profile Layers → Backlog); the **Signal Map** (3-gate forge → altitude-placement rule in
  GOVERNANCE_OS + seeded `docs/SIGNAL_MAP_TABLE.md`); the **card-craft fit research**
  (`research/CARD_CRAFT_FIT_V1.md`); and the `PARKED_IDEAS` universe ideas structured. No runtime change.
  **Completed.** **Next up:** the CARD DESIGN MISSION (Backlog) — gated on the PROJECT_OS Free-text reconcile.
- **Backlog batch v1 — 7 items via a 17-agent plan/de-risk workflow** (2026-06-15 / BR-S050…S056, app.js +
  styles.css + docs): planned + adversarially de-risked 8 queued items in parallel (8 planners [3 on haiku for
  speed] + 8 verifiers + 1 sequencer = 17 agents; all returned GO-now, none needing a decision), then shipped 7
  as focused, individually-verified commits (one job each, explicit staging):
  · **BR-S050 aura-ledger** — Aura Profile chips → flat full-width ledger rows (`.module--aura` + the missing
    `flex-direction:column` container fix a verifier caught); the archetype chip + dossier Plate 05 stay pills.
  · **BR-S051 Halo Dossier Schema v1** — committed `docs/HALO_DOSSIER_SCHEMA_V1.md` (data shape for the sealed
    card back: 7 §D modules, LOCKED §4 safety, Free/Halo reveal table) + FILE_MAP/DECISION_LOG; one JSONC
    "Exactly 3" contradiction reworded.
  · **BR-S052 right-panel 3-tier line weight** — Oracle 2px `--line-strong` top edge + Stat/Mint 2px `--line`
    left ledger (`.module--ledger`), border LONGHAND (no BR-S048 shorthand clobber; plate-light verified intact).
  · **BR-S053 menu hint** — a deadpan Archive-frame "what this is" line on the menu (draft second-person → 3rd).
  · **BR-S054 scroll-driven dossier reveal** (Technique Pass #2) — `animation-timeline:view()` top-edge shutter,
    `@supports`-gated + reduced-motion fully-shown (the missing override folded in).
  · **BR-S055 tier-ratio re-derivation** (gated token) — `--ink-900` `#0d0c0a→#100f0c`; monotonic warm ramp + AA
    re-verified (15.25/11.02/5.97:1); the LOCKED Muted/Clean/Strong/Charged/Peak ladder untouched.
  · **BR-S056 plate-bg consolidation** (gated token) — default `.card__plate` terminal stop → `--ink-950`; the 5
    material plates + frost unchanged (verified).
  Each verified live (1600×900 + narrow, DOM/getComputedStyle — screenshots time out); console clean; no data.js.
  **Completed.** **Still deferred (its own session):** right-panel **section-labels** (ghost OBSERVATION /
  INTERPRETATION / ARTIFACT READ / RECORD grouping) — a verifier found 5 structural edge cases (first-of-type vs
  the readhead, conditional archetype section, splitting Mint Record out of the `deep` template, the free CTA
  inside INTERPRETATION, shinyTease homing); a ready fix-plan exists, but it is high-churn markup surgery best
  done focused, NOT at the tail of a batch. Clears Ready #0 (scroll reveal), #4 (Halo schema), #6 (tier-ratio),
  #7 (plate-bg), and the Menu v2 hint. **Next up:** section-labels, OR Ready #1 (`@property` stat-band fill).

- **Right-panel polish v1 — R.NN index gutter + readhead tighten** (2026-06-15 / BR-S049, styles.css only):
  de-dulled the right reading panel (`LAYUP_RESEARCH_V1` Task #3b) with FLAT moves only. **(a)** a quiet
  right-edge **index gutter** — a CSS counter (`rmod`) numbers the reading-RECORD modules `R.01..R.NN` as 12px
  mono `--t-ghost` tabular-nums marks pinned in a carved 46px right lane (echoes the dossier counting-record
  system, BR-S048). `counter-increment` + `::before` share ONE selector
  `.panel--reading .module:not(.unlock):not(:has(.maxbadge))` — numbers Stat/Aura/Scene + the deep reads + the 3
  free archive teasers; EXCLUDES the Develop CTA + Lab tease (`.unlock`) and the empty Halo badge wrapper
  (`:has(.maxbadge)`); `details.receipts` is naturally skipped. **(b)** **readhead tagline** demoted 12px
  `--t-meta` → 9.5px mono `--t-ghost` telemetry (the 24px title stays the sole display element; the chip + module
  labels untouched). **NO markup change, no data.js** (pure CSS, `:has()` exclusion). **Built via a 12-agent
  workflow** (4 critique lenses → 3 plans → synth → 4 adversarial verifiers, NARROW_SCOPE); the verifiers caught
  and I fixed a real geometry overflow (a 22px mark would have spilled ~26px over the right-aligned values —
  dropped to 12px to fit the lane, also closer to LAYUP §5's subtle right-index intent). **Verified live**
  (1600×900 + narrow 900px, DOM/getComputedStyle — screenshots time out): free → R.01–R.06 (records + 3 locked
  teasers, CTA excluded); shiny/mint → R.01–R.10 (badge wrapper + Lab tease excluded); left panel un-numbered
  (counter isolated to `.panel--reading`); numeral clears the right-aligned values (~5px gap); tagline 9.5px mono
  ghost, chip/labels unchanged; `?dev=halo-gate` room hidden (no leak); narrow gutter collapses on the 1120px
  breakpoint; console clean. **Completed.** Closes the builder-set sequence (dev-nav → menu → cleanup → source
  merge → dossier de-dull → Right polish). *(Deferred to their own commits: right-panel 3-tier line weight
  [border LONGHAND only — avoid the BR-S048 cascade trap]; section-regrouping [ghost OBSERVATION/INTERPRETATION/
  ARTIFACT READ/RECORD labels]; aura-chips-as-ledger [scope via a `.module--aura` class so the archetype chip is
  untouched].)*

- **Dossier de-dull v1 (counting spine · threshold · ledger edges · cut tag)** (2026-06-14 / BR-S048, app.js +
  styles.css): made the 7-plate dossier read as THE RECORD OF THIS CARD via flat line+number+type only —
  `LAYUP_RESEARCH_V1` Task #3 (dossier half). **(a)** pulled the plate numeral into a pinned 44px LEFT counting
  spine (`.dplate__spine`, 22px mono `--t-ghost`, 28px/`--t-meta` on LOUD plates 04/07) by making `.dplate` itself
  a `44px 1fr` grid with a `.dplate__body` right column — `.dplate` STAYS the direct child of `.dossier__inner`
  so the `:nth-of-type(1/4/6/7)` rhythm is untouched (LAYUP §5's literal "wrap each plate in a row" would have
  BROKEN it). **(b)** room→archive threshold: `.dossier` top rule promoted 1px→**2px `--line-strong`** + the
  `.dossier__cue` restyled as a centered flanked label (`::before/::after` hairlines). **(c)** LOUD plates 04/07
  get a 2px `--line-strong` LEFT ledger edge; in **Halo only**, the Oracle (07) edge becomes the one sanctioned
  surround accent (per-source halo tint ≤30% mix) — accent selector specificity raised to (0,3,1) so it actually
  paints over the LOUD rule. **(d)** **CUT** the blanket per-plate `ARCHIVE PULL / DEVELOPED` tag (un-smears the
  single back-seam gate per `UNIVERSE_ZONE_MAP_V1` §3; supersedes LAYUP §5's "de-chrome" line) + flattened
  plate-06's mint gradient/shiny-tint so accent stays solely on the Oracle edge. State stays legible via existing
  per-plate copy. **Built via a 12-agent workflow** (4 critique lenses → 3 plans → synth → 4 adversarial
  verifiers); the verifiers caught + I fixed a real cascade bug (the accent would have LOST the cascade to the
  LOUD rule) and a desktop oracle-centering break. **No data.js change.** **Verified live** (1600×900 + narrow,
  DOM/getComputedStyle — screenshots time out): 7 spines 01–07; rhythm pad 1/6=20·26·22 + LOUD 4/7=38·36·40;
  threshold 2px line-strong; 0 legacy tag/numeral; Oracle accent paints per-source (copper SRC-01 / frost SRC-02)
  only in shiny, neutral in free/mint; plates 04+06 neutral; oracle centered Δ1px; narrow gutter collapses;
  free/shiny/mint × both sources + `?dev=halo-gate` (dossier built, correctly hidden) + bare menu all render;
  console clean. **Completed.** **Next up:** Right polish (LAYUP Task #3b). *(Deferred: top-edge shutter reveal =
  Engineered Technique Pass #2, its own commit.)*

- **Security review playbook v1 (`docs/security/`)** (2026-06-14 / BR-S047, docs only — new `docs/security/`
  folder + FILE_MAP + DECISION_LOG; shipped together with BR-S046 as one scaffolding commit): staged
  `docs/security/SECURITY_REVIEW_PLAYBOOK.md` — the ordered, gate-by-gate security go-through to run WHEN a
  security pass is greenlit (not a standing claim). Honest posture (static prototype: no backend/upload/secrets/
  payment today; the real attack surface is FUTURE), a 7-step sequence with pass/fail gates (DOM/XSS via `esc()`,
  URL-param allowlists, fonts-without-SRI → the FUTURE red lines: engine validator wiring, the §7 aggregate wall,
  server-side trust boundary, no client secrets, CSP/headers → privacy/safety invariants → deploy hardening), an
  append-only findings register (10 seeded rows, most N/A-today), and re-run triggers. The §2.5–§2.6 red lines
  inherit from `UNIVERSE_ZONE_MAP_V1` §7 / `HUMAN_READ_LINE_V1` / `halo/HALO_GATE_BOUNDARY_V1` — not relaxable
  here. Grounded by the same 6-agent workflow (security lane, real-code greps: `esc()` @ app.js:8-14 does not
  escape `'`; draft filename escaped; params allowlisted). **No scan run; runtime untouched.** **Completed.**
  **Next up:** Dossier de-dull (the build).

- **Live-artifact skeleton map v1 (`docs/map/`)** (2026-06-14 / BR-S046, docs only — new `docs/map/` folder +
  FILE_MAP + DECISION_LOG): built the granular "you are here" structural map of the BUILT app, grounded in real
  code (cited identifiers + file:line). Five docs: `00_INDEX` (what/why + the source×treatment×tab coordinate
  convention + keep-in-sync triggers) · `01_PAGE_SKELETON` (the `index.html` DOM shell + the `body[data-view]`
  CSS visibility gate) · `02_VIEWS_AND_STATE` (the `state` object @ app.js:44, URL params, the 4 views, the
  `render()` pipeline, keyboard + delegated handlers, dev routes) · `03_SURFACES` (left Diagram|Metrics +
  CLEAN|ANNOTATED, center card skins, right reading modules, the 7 dossier plates, the full state matrix) ·
  `04_CODE_MAP` (data.js corpus + v2 shape, app.js fn inventory, scan-contract.js valve, styles.css systems).
  **Built via a 6-agent grounded workflow** (4 layer-mappers → security lane → accuracy verifier =
  ACCURATE_WITH_FIXES); all 3 corrections applied + spot-verified against real code (`toScanResultV2` @ 458,
  7 DEV_FIXTURES, the legacy 3-col `.tabbar` grid). Complements UNIVERSE_ZONE_MAP (concept zones) + FILE_MAP
  (file router) — no duplication. **Runtime untouched.** **Completed.** **Next up:** Security review playbook
  (BR-S047), then Dossier de-dull.

- **Universe/Zone Map v1 committed + governance trail** (2026-06-14 / BR-S045, docs only —
  UNIVERSE_ZONE_MAP_V1 + FILE_MAP + DECISION_LOG + HUMAN_READ_LINE_V1 + TASK_QUEUE): committed the
  already-written, reviewed-good `docs/UNIVERSE_ZONE_MAP_V1.md` (was untracked) — the ACTIVE
  (revisable) universe/zone spec: Archive frame, five-zone map (Lobby/Scan Room/Card Record/Vault/
  Codex), NOW/LATER forks, the LIVE/PARTIAL/ASPIRATIONAL split (§6 premature-ship guard), and the §7
  aggregate-refusal wall. **Mandatory pre-edit critique** (4-lens workflow → GO_WITH_CHANGES) caught
  and **fixed two internal section-ref errors in the spec in the same commit** before adding it
  (§6→§7 for the wall on the intro line; PROJECT_OS §3→§15 for the Vault/Codex backlog). Registered
  the spec in FILE_MAP (new row + "Last verified" → 2026-06-14); logged the commit + the load-bearing
  §7 wall in DECISION_LOG (asserted-not-enforced; gates the future "weight on the internet" reach, not
  a moat); folded the §7 pointer into the HUMAN_READ_LINE_V1 Forbidden · Aggregation bullet (without
  altering the "currently UNENFORCED in code" clause). **Runtime untouched** — no AI/backend/upload/
  payment/route; aspirational Vault/Codex stay BACKLOG (PROJECT_OS §15), not promoted. **Completed.**
  **Next up:** Below redesign (Dossier de-dull).

- **Source→Diagram Merge v1 (Left redesign)** (2026-06-14 / BR-S044, app.js + styles.css):
  `LAYUP_RESEARCH_V1` Task #4 — collapsed the **Source tab into Diagram** (tabs 3→2). One `scanframe` now
  carries a flat **Annotated | Clean toggle** (`state.diagramView`, default `annotated`; `?dv=` deep link;
  applied as a CSS class on `.diagwrap`): CLEAN = the old Source frame (full-saturation raw photo + numbered
  markers + legend); ANNOTATED = desaturated photo + the SVG overlay read. **No data.js change**; free/halo
  overlay gating unchanged (orthogonal to clean/annotated). Deleted the redundant **Capture Record** module
  (the Source ID/code that duplicated the card + dossier Plate 01); **Lens + Light** kept as a hairline
  `scanframe` meta line. The 5 Frame Analysis lines moved under a **"Frame Read"** sub-label in Diagram Notes.
  Legacy **`?tab=source` → diagram** (no 404) and the dev-nav Source button dropped. **Critic-approved**
  (4-lens pre-edit, all GO_WITH_CHANGES). **Per commit, verified live**: 2 tabs; Annotated default (overlays
  shown, markers hidden, photo desaturated, Frame Read + Lens·Light meta); Clean (full saturation, markers +
  legend, overlays hidden, BR-SRC meta); `?tab=source` redirects; free overlays gated + devnote; src2 ok;
  Metrics + card + 7 plates intact; console clean (temp index.html cache-bust used + reverted). **Completed**
  — ships the **Left redesign (Source merge)**; clears LAYUP Task #4. **Next up:** Below redesign (Dossier
  de-dull) = LAYUP Task #3a.

- **Human-Read Line copy sweep v1** (2026-06-14 / BR-S043, data.js — 8 ins / 8 del): the **do-now safety
  fix** from the `/gods-finger` audit (Backlog item (a)) — **9 rewrites across 8 lines** (one line carried
  two) so visible sample copy reads the **re-authorable image-act, not the permanent person** (per
  `docs/HUMAN_READ_LINE_V1.md`). Removed anatomy-as-composition ("the cap and beard do quiet structural
  work", "beard … build a stable mass"), trait grammar ("the posture of someone who decides / plans to be
  here"), dispositional energy ("Slow-burn output"), authenticity-as-trait ("nothing performed for the lens",
  "less like a pose"), and the character aura chips ("Slow-Burn" / "Load-Bearing" → "Auger-Braced" /
  "Low-Horizon"; "Sun-Struck" kept). Each rewrite names a visible cue, makes the photo the grammatical
  subject, and clears the connotation-strip; caught one evidence clause the audit missed. No new fields; voice
  preserved. **Per commit, verified live**: room + 7 plates render, aura chips updated, no leak strings,
  console clean. **Completed** — sweeps the **live-copy half of Backlog item (a)** ("Leaking-copy sweep — DO
  NOW"): every leaking string that actually shipped in `data.js` is gone (the audit's "nobody crouches by
  accident" example was never live copy). Still open: the Backlog (a) bullet + the `HUMAN_READ_LINE_V1`
  §enforcement-gap leak example still quote the now-removed strings (stale-by-omission), and the validator/
  aggregate guards (b)/(c) stay engine-phase Backlog. **Next up:** Left redesign (Source merge).

- **Repo cleanup pass v1 (safe /cleanup)** (2026-06-14 / BR-S042, styles.css + app.js + data.js +
  docs): ran the saved `/cleanup` routine over all tracked source files — behavior-preserving, one
  category per commit, every deletion grep-confirmed zero-reference. **Removed (AUTO):** dead CSS — the
  orphaned compare-ladder (`.msample__compare`, `.mtile` base, `.mtile--free/--halo`,
  `.mtile__stamp--halo/__cap/__tier/__tier--halo/__chips`, `.msample__arrow` + its responsive override)
  plus pre-existing dead `.draftcard__note`/`.draftinfo__meta`/`.fpcard__vrow/__vno/__vbody/__vname`
  (`5f3a776`); the unused `tierOut` local in `renderDossier` (`adebc87`); comment/doc accuracy — data.js
  v2 header ("Not yet read by app.js" → it IS read) + corrected a mistaken `<\button>` typo claim in the
  BR-S041 docs (grep showed the resume branch is correctly `</button>` — no such typo). **KEPT** the live
  `.mtile__shot/__img/__scrim/__stamp` + `.fpcard__vault/__vaulthead/__vaultmark/__vaulttag/__vreason/
  __vsealed`, and the scan-contract DEV_FIXTURE intent comments (they explain *why* a fixture is invalid).
  **Verified live** after each category (menu card + free-scan-sim vault + 7-plate dossier render; console
  clean). **Proposed — not applied (user's call):** remove now-uncalled `getTierOutput`/`getActiveScan`
  (effectively-global helpers); drop dead `sim`-truthy branches in `renderUploadedScanResultDev`; drop
  the unread `gestureAuthority` field in `toScanResultV2`. **Completed.** **Next up:** Left redesign
  (Source merge).

- **Menu Re-frame v1 — Direction A "Sealed Pull"** (2026-06-14 / BR-S041, app.js renderMenu +
  styles.css): the "layup" fix — turned the landing page from a Free-vs-Halo tier ladder into ONE
  complete Free Pull card (free-as-hero). Removed `.msample__compare` (both tiles + the "→ develops"
  arrow + the Halo inventory chips) + the "developed two ways" footer; added a single full-saturation
  card via the existing `shot()` inside `.msample__solo` (no `.mtile--free` → no desaturation filter/
  scrim) + a `.msample__seal` caption "The front is complete. The same card has a sealed back."
  (structural fact, not "unlock"); footer → "One sample · SRC-01 · Driver."; `.menu__inner` 760→500.
  Thesis/trust verbatim; CTA stays "Enter Scan Room"; `renderHaloGateMock`/darkroom copy untouched.
  **Chosen via a 16-agent design pass** (5 Haiku / 8 Sonnet / 3 Opus → judge → synth → adversarial
  safety = SAFE, 0 fixes); builder picked A (inviting+balanced), keeping B's caption. No DECISION_LOG
  (ACTIVE impl of a researched fix). **Verified live**: bare URL → one full-saturation card (filter
  none, no scrim), FREE PULL stamp, sealed caption, no ladder; 360×270 card in a 500px column; deep
  links bypass to the room; `?devnav=1` rail + Enter/Add intact; console clean. **Completed.**
  **Next up:** Left redesign (Source merge). *(/cleanup ran — see BR-S042 — removing the now-dead
  `.mtile--free/--halo/__compare/__arrow/__chips` + draft/fpcard CSS; no markup typo existed, the
  resume branch is correctly `</button>`.)*

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

> **Builder-set near-term sequence (updated 2026-06-14, BR-S044):** dev-nav (DONE, BR-S040) →
> Menu Re-frame (DONE, BR-S041) → /cleanup whole-repo (DONE, BR-S042) → Left redesign (Source merge) (DONE, BR-S044)
> → Below redesign (Dossier de-dull) (DONE, BR-S048) → Right polish (DONE, BR-S049). **Builder-set sequence COMPLETE.** Grounded by the direction-synthesis workflow + research:
> - **Menu Re-frame v1 (DONE, BR-S041)** — built Direction A "Sealed Pull" (one complete card, ladder
>   killed, sealed caption). Originally specced: the "layup" fix. `FREE_PAID_MODEL_V1` verdict: the
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
> - **Left redesign — Source merge (DONE, BR-S044)** = `LAYUP_RESEARCH_V1` Task #4 (collapsed Source into
>   Diagram as CLEAN|ANNOTATED, deleted the redundant Capture Record, re-pointed ?tab=source → diagram).
> - **Below redesign — Dossier de-dull (DONE, BR-S048)** = LAYUP Task #3 dossier half (counting-spine gutter,
>   room→archive threshold, LOUD ledger edges, CUT the blanket plate tag). The shutter reveal was DEFERRED to
>   Engineered Technique Pass #2 (its own commit). **Right polish (DONE, BR-S049)** = LAYUP Task #3b — shipped the
>   right-panel R.NN index gutter + readhead tighten. DEFERRED to their own commits: 3-tier line weight (border
>   LONGHAND only — avoid the BR-S048 cascade trap), section-regrouping (ghost section labels), aura-chips-as-ledger
>   (scope via a `.module--aura` class so the archetype chip is untouched).
> - **Set aside (builder, BR-S040):** a full Halo card "example" — a populated stats-card
>   trips the magnetism kill-rule; revisit later (sealed-back only if shown). Deeper
>   "essence / marketing / value-stacking / existence-framing" = a FUTURE research pass, not now.
> - Held: "diagram of the card" (#5, new concept, after left/below) + a darkroom "how it works" surface.
> - **Menu v2 — explain/hint what Blue Room IS (noted BR-S042, FOR LATER):** the re-framed menu (BR-S041)
>   currently shows only the one raw photo/card — it does NOT yet show, explain, or HINT what Blue Room is
>   about. A later pass adds a brief "what this is" hint/explanation in the darkroom-thesis voice (no hype,
>   no overreach, no tier ladder). Deliberately deferred — not part of the current left/below work.
> - **Universe NOW items fold into the existing tracks (noted BR-S045):** the universe NOW items (topbar
>   zone label, floor wash, provenance verb thread, "Archive" cosmology copy) fold into the existing
>   Left-redesign / Dossier-de-dull work — NOT a separate universe track. Each still graduates through its
>   own pre-edit critique, one commit behind `baseline-v1` (`UNIVERSE_ZONE_MAP_V1` §5/§6).

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
0. **Engineered Technique Pass #2 — scroll-driven dossier reveal** ✓ DONE (BR-S054) — per-plate
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
4. **Halo Dossier Schema v1** ✓ DONE (BR-S051) — schema FIRST, not the full route/build. Define the
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
6. **Tier-ratio re-derivation v1** ✓ DONE (BR-S055) *(was gated behind Base-Hex + Warm-Ramp Lock v1, BR-S039)* —
   re-derive the upper `--ink-*` surface stops (900/850/800/700) and the public tier-band
   lightness ratios against the now-locked base `#0a0b0d`, so the warm dark ramp and the bands
   compute from canon rather than the legacy `#0a0907` floor (canon "re-derive the tier ratios
   against it"). *Done when:* the `--ink-*` stops + band ratios derive from `#0a0b0d` (ratios
   stated explicitly); the LOCKED **Muted/Clean/Strong/Charged/Peak** ladder (DECISION_LOG
   2026-06-13) is preserved — no collapse/reorder/rename; `--ink-900`'s dark-on-light chip uses
   (`.toggle__btn.is-active`, `.marker__no`, `.markerlegend__no`) keep AA in the OPPOSITE
   direction from the substrate; verified via `getComputedStyle` contrast deltas; console clean.
7. **Plate-bg consolidation v1** ✓ DONE (BR-S056) *(was gated behind BR-S039)* — unify only the
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

> **Builder roadmap (re-scoped 2026-06-17).** The live CARD work is settled: Free finish LOCKED (Letterpress,
> BR-S060) and the Halo crown is approved AS-IS (dark/sleek/minimal — no rework now). Next, as a PAIR: **(1) the
> Free/Paid funnel + mode-integration redesign** and **(2) the scan-room layout redesign** — a solid FINAL
> free/paid system + layout then sets the scope for **(3) the main-menu redesign** (Menu v3, gated below). Then
> **(4) Vault + Profile** (brainstorm, interlinked). The **deterministic engine** (Phase 3) stays the biggest,
> eventual build. Card material/texture research resumes only with a concrete NEW-card concept (undefined; waits).

- **CARD DESIGN arc — Free DONE; Halo crown PARKED** (from `research/CARD_CRAFT_FIT_V1.md`): the GATE (BR-S057)
  + Free's own finish (Letterpress Archive Edition, locked BR-S060) are DONE. **Halo crown: the builder likes the
  current dark/sleek/minimal shiny as-is — no issues; the CARD_CRAFT_FIT conic-replacement / inseparability rework
  is NOT pursued now.** Card material/texture research waits for a concrete NEW-card concept (undefined). Live card
  work settled. *(This effectively resolves the "Final Halo material decision" item toward keep-current.)*
- **Free/Paid funnel + mode-integration redesign** (builder, 2026-06-17 — TOP priority, pair with the layout):
  how Free → Halo (paid) is funneled is NOT final. The single "Develop this scan" CTA reads as "poor design,
  lacking imagination"; the sync/integration of the two modes is "wack and dull." Re-imagine the funnel, the
  develop moment, and how the two modes relate on the page. **Canon guardrails:** Free = complete front · Halo =
  the same scan developed deeper (a mode, not a grade, `GOLDEN_NUGGETS` #5) · magnetism = pull-by-giving (no
  scarcity/urgency, #7) · "Develop this scan" is a LOCKED CTA (`DECISION_LOG` 2026-06-12) — revisiting it is a
  Spec Change, log it · framing only (no payment/engine). Research base: `research/FREE_PAID_MODEL_V1.md`.
  *Done when:* a researched, stress-tested funnel direction wins; the develop CTA + mode-integration are
  redesigned; verified live; canon intact.
- **Scan-room layout redesign (around the card)** (builder, 2026-06-17 — pair with the funnel above): the scan
  page around the card — left (Diagram|Metrics) · center stage · right reading panel — "looks solid + decent but
  NOT final." Wants a real layout/design pass. Prior partial work: `research/LAYUP_RESEARCH_V1.md` (Metrics
  redesign still open). *Done when:* a researched layout direction wins + ships; the room reads final, not
  placeholder.
- **Place-once sweep — Free-Pull "preview/incomplete" siblings** (logged BR-S057, 2026-06-17): downstream
  mentions still frame Free as preview/incomplete and should CITE `GOLDEN_NUGGETS` #5 rather than restate —
  `GPT_REVIEW_GUIDE.md:38` ("archive preview"), `research/SPINE.md:74/391` ("archive preview / first scan"),
  `CARD_TECH_LAB.md:74` ("Useful but incomplete"). Low-grade (RESEARCH/reference/TESTING), not load-bearing;
  align in a hygiene pass. (`research/FREE_PAID_MODEL_V1.md` is already aligned — the canonical research source.)
- **`warrant-debt` capture #1 — GN #11 "never add machinery" has no operational edge** (BR-S058, 2026-06-17,
  warrant-audit rule): `[GOLDEN_NUGGETS #11 (machinery-vs-surfacing edge)]` — #11 ("the magnetism is already built —
  surface live state, never add machinery") is wielded to kill proposed mechanisms but draws no line between
  "machinery" and "surfacing legible state"; it could not decide whether the WARRANT PEN itself is banned machinery.
  Rides the 4-BR-S holding-age clock; resolve by SHARPEN (draw the edge → `GOLDEN_NUGGETS`) or DECIDE (→ DECISION_LOG).
  FREEZE: #11's bare edge can't be the SOLE veto of a proposed mechanism until drawn. First real capture under the
  GOVERNANCE_OS warrant-audit rule (held loop spec: `.claude/tmp/WARRANT_PEN_DRAFT_V1.md`, DRAFT/unratified).
- **Menu redesign v3** (builder, 2026-06-17): the main menu is not final — criticize it deeply +
  stress-test directions until one wins (BR-S041 reframed it once; this is a fresh deep pass).
  **Gated (builder, 2026-06-17):** do this AFTER the Free/Paid funnel + scan-room layout are solid — those set
  the menu's scope.
- **Universe ideas → surfaces the card flows into** (`PARKED_IDEAS.md`, structured 2026-06-17):
  **Profile + Vault** (the interconnection is the design object) · **Idle Room → Kingdom** (card placed →
  its stats drive an idle reactive place) · **Friends** · **Codex vs Blogs/Journals** · **Autobattler**
  (form open) · **Socials** (deferred-conditional — only if non-redundant). Guard: object-keyed, never
  person-keyed. **Builder (2026-06-17): Vault + Profile are the named next-after-menu brainstorm** — both
  undone + interlinked; settle what they CONTAIN, their PURPOSE, and the FEELING before building.
  **Idle Room→Kingdom CAUTION (builder, 2026-06-17):** must NOT take the spotlight or take over Blue Room; its
  videogame tone is a brand RISK — at most a careful, non-dominant cousin-concept, never a lead build.
  **Menu-fork idea (builder, 2026-06-17):** the main menu may fork into TWO doors — **Free Pull** (downloadable ·
  shareable · self-contained, conveys the concept, stays COMPLETE on its own) and the **Paid Universe** (a
  multiplicative, high-functioning space that MULTIPLIES the free artifact, never "finishes" it).
  **Reserved-X (builder, 2026-06-17):** Codex·blog/journal/notes + **Special Readings** (zodiac / chinese-zodiac
  / numerology — its OWN task/space) are marked PRESENT in the structure with fill TBD (`UNIVERSE_ZONE_MAP_V1`
  §2 Codex) — so sketches include them without designing them. Special Readings stays declared-input → received,
  never inferred (#9).
- **One paid reading** (decided paid spine — bounded: free → ONE paid card reading, not a tier) +
  **Referral → earns the paid reading** (builder idea; magnetism-by-giving, kept bounded — one clean
  referral → one reading, no streaks/leaderboards, object-keyed). Build-side when engine/payment is greenlit.
  **RE-OPENED + extended (builder, 2026-06-17):** the bounded-single-action spine is NO LONGER settled — paid
  could be a **subscription** (access model OPEN; access vs minting are two layers — access may recur, minting
  stays scarce). And scarcity is **not fully banned**: **scarcity-as-meaningful-play** is allowed — finite/
  precious minting so you genuinely CHOOSE "I want THIS card / THIS memory minted" (worth by intention), never
  dark-arts FOMO/urgency; middle/logical scarcity is fine. This deliberately re-examines the LOCKED magnetism
  (`GOLDEN_NUGGETS` #7) / Halo-Gate no-scarcity canon — draw the line in the deep research, do NOT change canon
  yet. **DEEP RESEARCH-LATER (builder-named):** *"the WORTH / value of the minted artifact"* — a deep
  sweep+synth on the scarcity-as-play economy of meaning + how the referral system helps + links to paid.
  Relates to the chance-rarity open decision + the warrant-debt #1 magnetism edge.
- **Branding / identity research doc** (builder-named, 2026-06-17 — later / when important): a research pass on
  how Blue Room wants to BRAND + portray itself (identity, positioning, voice). Pairs with the already-noted
  future "marketing / portrayal / value-stacking / existence-framing" research pass. Not now.
- **Scan-room-below (dossier) stress-test** + **universe navigation** (real movement between rooms,
  beyond the dev buttons) — both builder-named (2026-06-17), later.
- **Safety hardening — Human-Read Line enforcement** (from the `/gods-finger` audit, 2026-06-14,
  safety-critical): the safety line (`docs/HUMAN_READ_LINE_V1.md`) is asserted, not enforced. Three fixes:
  - **(a) Leaking-copy sweep — DO NOW (live on the page):** rewrite sample copy in `data.js` that reads the
    PERMANENT not the image-act — "the cap and beard do quiet structural work" (anatomy as composition),
    "nobody crouches by accident" (intent/character), "the posture of someone who decides" (trait grammar),
    and character aura chips ("Load-Bearing" / "Slow-Burn" → cue-named or cut).
  - **(b) Validator extension — engine phase:** run `PERSON_TRUTH` over evidenceBoard/discoveryNote/oracle/
    aura (not just title+readings); add the connotation gate (gate 3) + the re-authorable-cue gate (gate 1);
    stop trusting self-attested `safetyFlags` (require the independent scan to also pass).
  - **(c) Aggregate no-persistence guard — engine phase (highest leverage):** re-derive archetype/hidden-stat/
    aura FRESH per scan, no person-key joining pulls, no streaks/counts; the cross-pull layer must
    structurally refuse to reconstruct a stable trait. Gates the future "weight on the internet" ambition.
    The canonical rule + asserted-not-enforced status now live in `UNIVERSE_ZONE_MAP_V1` §7 (the
    load-bearing wall); this remains the engine-phase guard that actually builds it.


- **Code-scan findings — logged, not patched** (2026-06-15, read-only 8-agent scan: 5 Sonnet + 2 Haiku →
  Opus adversarial verify; **no code changed**). Whole-repo scan for security + optimization + correctness.
  The 2 verified **security** findings went to `docs/security/SECURITY_REVIEW_PLAYBOOK.md` §3 (rows 11–12,
  both N/A-today). Logged here for a future behavior-preserving pass (one category per commit, per `/cleanup`):
  - **Dead code (high confidence — re-confirms the BR-S042 proposed-but-unapplied list):** `getActiveScan`
    (app.js:87-89) + `getTierOutput` (app.js:93-96) have zero call sites; `gestureAuthority`
    (data.js:467-470,483) is computed every `SOURCES.map` but never read by app.js; the `sim ? …` ternaries
    after the `sim` early-return in `renderUploadedScanResultDev` (app.js:1240 vs 1274/1280-1285) are
    unreachable. Keep `gestureAuthority` only if reserving it for the future engine contract.
  - **CSS micro-cleanups (low confidence — not re-read in the verify pass; confirm before touching):** duplicate
    160×160 fractalNoise data-URIs `.photo__grain` (styles.css:575) vs `.halogate__backgrain` (:2404); `.photo`
    declared twice back-to-back (:513-519, :524-530); `.scanframe--diagram` filter applied unconditionally then
    reset to `none` in `is-clean` (:1341/:1347).
  - **Correctness / robustness:** fragile partial-result chains `scan?.tierOutputs.free.X` / `.halo.X`
    (app.js:730/780/855-857/860/868) stop the optional chain at `scan` — a truthy engine result lacking
    `tierOutputs` throws instead of falling back to `|| legacy`; deepen to `scan?.tierOutputs?.free?.X` before
    the engine is wired (safe today — `getScanResult` always returns the full shape). Stale comment:
    `scan-contract.js:40` says `SCHEMA_KEYS` lists "every legitimate key" but `validFreeSimulationResult`
    (:380-439) uses many keys absent from it (validator still correct — those names carry no forbidden term;
    refresh so a future rating-like key stays distinguishable). Minor: `isUnderStats` `indexOf('stats.')` is
    case-sensitive + over-broad (scan-contract.js:77-79; partially refuted — `SCHEMA_KEYS` independently
    catches it); `mountDev` passes an undefined fixture to the validator if both fixtures are absent
    (app.js:1200-1201; relies on validator null-tolerance, dev-surface only).
  - **NOT a bug — confirmed intentional:** `mixRow` showing raw 0–100 on the **Metrics tab** (app.js:333;
    signalMix :353, pressure :368-370) is the **documented** "interpretive diagnostics, not the 4 public
    scores" carve-out (DECISION_LOG / BR-S029, re-confirmed by the BR-S033 18-state audit) — not a 0–100 leak.
  - **Dismissed by the verifier** (already covered or refuted): `onerror=` / CSP / SRI / `dev-live.html`-in-prod
    (security register rows 3/9/10); the devnav `location.href` rebuild (refuted — `new URL()` +
    `searchParams.set` URL-encodes the value, so no scheme smuggling); README/`.ps1`/`.gitignore` dev-hygiene
    (below the noise bar on a static no-secrets prototype).

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
- **Profile layers** (MBTI/zodiac/etc.) — user-declared lore, never inferred
  (canon `GOLDEN_NUGGETS` #9); the Backlog *mechanism* the parked Codex vision would use; needs activation decision.
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
