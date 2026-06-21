# BLUE ROOM — Task Queue

Ranked work queue, not a dream backlog. One Active item at a time.
Out-of-scope findings from any session get logged here, not patched.
Last updated: 2026-06-21.

## Completed (shipped tasks, newest first)

> This section is the COMPLETED-TASK LOG, not pending work. The current/next active item
> is the head of **Ready** (below) — one at a time (this file's intro rule). For the
> authoritative "what shipped" trail, cross-check `docs/DECISION_LOG.md` + `git log`.

- **BR-S104 — live-card audit + improvement plan (analysis, no-code)** (2026-06-22, docs only): 9-agent
  read-only audit of all 5 live cards (free + developed) against the builder's bar — expectation-capture,
  interesting/precise/grounded/funny/addicting/correct/accurate/coherent, backend-leak hunt, boring-mitigation.
  Saved `docs/BR-S104_LIVE_CARD_AUDIT.md`. **Verdict ~6.5/10 of the dream:** artifact-not-person discipline holds
  flawlessly + the voice-first paid open is right, but the gap is "precision without the turn" (3 cards lead the
  free-front note with diagram geometry; the turn is paid-only), the back is read-once with no payoff, and raw
  engine tokens leak onto LIVE customer surfaces. **P0 leaks (ship today, law-adjacent):** dossier filing chain
  `route · HUMAN_SOLO/ANIMAL_COMPANION` + `scan status · accepted` + `filed as · class`, `Subject lock · 0.83/0.88`
  receipts, Evidence-Board `Signal ↑/Frame ↓` arrows + `high/medium` confidence chips — all with file:lines + fixes
  in the doc. Weakest axes = FUNNY (3–5) + ADDICTING (5–7). Plan: P0 leak fix → P1 rewrite the 3 failing front
  notes + one hero payoff line per card → P2 output variance (wire the already-computed routeLogic) + collection
  hook (timeline → sibling 3-up) → P3 de-dup the paid panel + accuracy/voice cleanups. Registered in FILE_MAP.
  Docs only — no runtime change. ONE commit "Docs: BR-S104 live-card audit + improvement plan"; not pushed without
  approval. **NEXT (on builder go):** BR-S105 P0 leak fix, then BR-S106 front-note + hero-line pass (the audit
  supplies the exact replacement lines).

- **BR-S103 — 3 photos promoted to FULL room sources (SRC-03/04/05)** (2026-06-22, data.js + app.js + docs):
  the builder wanted the 3 local photos in the live room "as the 2 original", to feel how varied images sit
  across the whole project. Authored via a 6-agent workflow (3 authors, one per photo reading its own image →
  full `SOURCES` object + `V2_EXTRAS`; 3 safety/schema gates). **Safety gate: ALL 3 SAFE, zero person-reading
  violations** (the "schemaGaps" it raised were a different future-dossier spec, N/A to the current shape). I
  assembled the data.js literals from the agents' JSON (so no agent syntax could break data.js) + cleaned voice
  (ALL-CAPS titles → "Shore Dispatch" / "Stride Break" / "Spiny Encounter"; serial strings that landed in
  signature/mint.note → real sentences) + supplied the identity fields the schema omitted (serial, objectNo,
  edition, minted, mint.serial, batch) + the gate's route fix (SRC-04 canine subject → `ANIMAL_COMPANION`).
  Wiring: data-driven source toggle (`renderSourceToggle` from SOURCES → auto 5 buttons), URL `?src=1..N`,
  keyboard `1..N`, `short` labels on all 5 (Driver/Ice Field/Shore/Run/Tank). **Verified live @1600×900**
  (headless, console clean): all 5 sources; each new card renders free + developed — card + photo (EXIF-upright)
  + halo + Diagram panel + Oracle/Stat reading + 7-plate dossier; `getScanResult` resolves SRC-03/04/05;
  `toScanResultV2` maps without crashing (V2_EXTRAS present). **Privacy:** the 3 images stay GITIGNORED
  (local-only, never pushed); data.js text is committable, so the room works on the builder's machine. Copy is
  artifact-only throughout. Runtime: data.js + app.js (index.html static toggle buttons left as a no-JS
  fallback, overwritten at init). ONE commit "BR-S103: 3 photos as full room sources (SRC-03/04/05)"; not
  pushed without approval. Diagram coords are best-effort (EXIF rotation) — tunable. The `?dev=proto-cards`
  route (BR-S101) is now superseded by the full-room sources (left in place, harmless).

- **BR-S101 — 3 prototype cards from local photos (?dev=proto-cards)** (2026-06-22, app.js + styles.css +
  .gitignore): the builder picked 3 of their own photos as "final prototypes" and gave the gallery paths; I
  copied them into `assets/source-03/04/05.jpg` (**gitignored** — personal faces, public repo, local-only) and
  built a contained DEV route `?dev=proto-cards` that renders each as a card in **Free + Halo** via the master
  `renderCard`. Three minimal SAFE source objects (`PROTO_CARDS` in app.js): file + halo{a/b/c} + photoTuning +
  capture + card{title,archetype,note,signature,serial,stats}; `renderCard`'s stat read falls back to
  `card.stats` (these aren't in SCAN_RESULTS_V2 → no crash). **Front-only** — NOT wired into the room/SOURCES,
  no dossier/diagram/metrics/reading authored (avoids 3 full production datasets + a 5-source toggle rewrite +
  crash risk). **Copy is artifact-only** (frame / composition / light / scene / held-object geometry — e.g.
  "Held Catch, Open Shore", "Loose Run, Low Angle", "Tank Pick, House Light"), never the person, per the locked
  law (faces in-frame). Photos are EXIF-rotated; browsers render them upright (natural 1868×4000 portrait).
  **Verified live** (headless @1600×2400): 6 cards (3×free/halo), all photos load upright, halo shows on the
  developed ones, no missing images, console clean. Runtime: app.js + styles.css (+ .gitignore); data.js +
  index.html untouched; the production SOURCES/room untouched. Tunable: crops (photoTuning), copy, stats, halo
  hues. ONE commit "BR-S101: prototype cards from local photos (dev route)"; not pushed without approval.
  **Bigger lane if wanted:** promoting any of these to a FULL room source (per-photo dossier/diagram/metrics +
  5-source toggle) is a separate production task — and, since faces would then be committed, a privacy decision.

- **BR-S099 — original developed-card halo RESTORED verbatim + bloom tightened (styles.css)** (2026-06-22,
  styles.css + docs): across BR-S095–S098 the halo was rebuilt from scratch (around-glow → smokey conic → LED
  edge → comet current) and the builder rejected each (not-the-original / fake-gold / smokey). They asked if I
  had the original; I recovered it from **git `1c6c328^`** (the commit before BR-S067 deleted it) and restored
  it **VERBATIM**: the rotating 3-hue conic edge (per-source `--halo-a/b/c` — for SRC-01 copper(a) broken up by
  periwinkle(b) + amber(c) = the "changing hues" feel), the wide colored bloom, the 5s breathe, and the drifting
  star-specks. Builder confirmed "yes this is the one." **BR-S100 (folded in):** tightened the one off-note — the
  wide 44/80px colored bloom ("cloud around the lining") → a tight 11/22px hug, keeping the rotating LINE the
  star; builder approved ("its good now this halo"). Kept holo-spin, dropped the original card-in (so the in-place
  develop still tweens); reduced-motion stills all of it. This is a **builder-directed reversal of the BR-S067
  spin/sparkle removal** — the magnetic-not-yippi concern is explicitly overridden for the developed card's
  signature look. **Verified live @1600×900** (headless, both sources). Runtime: styles.css only. ONE commit
  "BR-S099: restore + tighten original developed-card halo"; not pushed without approval. Builder noted "a bit
  editing after" — minor tweaks may follow.

- **BR-S097 — halo corrected to the LED EDGE line (styles.css)** (2026-06-21, styles.css + docs): BR-S096
  built the wrong mechanism — a soft blurred conic BEHIND the card ("smokey"), which the builder rejected. The
  effect they meant is the original "first halo": a crisp light tracing the card's EDGE like an LED line going
  around it. Mechanism (matches the pre-BR-S067 original): the card is a thin frame (`.card` padding) with the
  opaque `.card__plate` on top, so the card background shows ONLY as a line at the edge. **Fix:** set
  `.card[data-treatment="shiny"]` background to a conic-gradient with two bright per-source points + `holo-spin
  7s` and bump the frame to `padding:2px` → a light travels around the card's edge; a TIGHT colored box-shadow
  bloom (small radius, hugs the silhouette) gives "light," not a room-washing cloud. The behind-card `.card__halo`
  is dialed to a FAINT low-opacity ambient aura (0.3–0.46 gentle pulse, no spin, no conic) — the "softer ambient
  with low-opacity variation" the builder said would be okay. Per-source `--halo-a/b` only (no rainbow); sparkles
  / twinkle / shimmer stay OFF; floor/panel zero-halo holds; reduced-motion stills the spin (frozen tinted edge).
  **Verified live @1600×900** (headless capture + computed: card bg conic, padding 2px, animation holo-spin 7s,
  colored edge box-shadow; `.card__halo` opacity ~0.42 radial-only, halo-soft-breathe). Supersedes the BR-S096
  behind-card mechanism. Speed (7s) / point brightness / 2px line thickness / ambient opacity are eyeball-tunable.
  Runtime: styles.css only. ONE commit "BR-S097: halo as LED edge line"; not pushed without approval.

- **BR-S096 — rotating halo rim restored on the developed card, reconciled (styles.css)** (2026-06-21,
  styles.css + docs): the builder asked for the "pulsating semi-spinning LED-ish" rim back — the `holo-spin`
  (rotating conic-gradient light around the card edge) that BR-S067 killed as the lead "yippi offender."
  Recovered the original from git history (`1c6c328^`: a `@property --holo-angle` conic on the whole `.card`
  background + `holo-spin 7s` + violet/cyan/green rainbow + shimmer-sweep + twinkle sparkles). **Restored
  RECONCILED** (on the BR-S095 `.card__halo`, not the whole-card wash): (1) per-source `--halo-a/b` ONLY — never
  the violet/cyan/green rainbow; (2) ONE soft rotating rim behind the card (z-index:-1) over the BR-S095 base
  glow, NOT the card-background conic ("the card got brighter"); (3) runs ALONE — sparkles / twinkle /
  shimmer-sweep stay OFF (the genuinely busy offenders); (4) slow 8s spin + gentle breathe = pulsating-not-
  frantic; reduced-motion stills it (existing block). Floor/panel zero-halo + "no --halo escapes to room"
  box-shadow ring (BR-S067 subtractive crown) untouched. **Verified live @1600×900** (headless capture +
  computed): `animationName: halo-fadein, holo-spin, halo-breathe` (8s), conic + radial base present, blur 18,
  sparkles opacity 0; per-source rotating rim visibly sweeps the shiny SRC-01 card. Reverses the BR-S067
  spin-removal **by builder request** (logged in DECISION_LOG). Speed / intensity / palette are eyeball-tunable;
  literal rainbow + sparkles remain opt-in (advised against). Runtime: styles.css only. ONE commit "BR-S096:
  restore reconciled rotating halo rim"; not pushed without approval.

- **BR-S095 — halo glow around the developed card (styles.css)** (2026-06-21, styles.css + docs): the builder
  noticed the halo wasn't reading as a glow AROUND the developed card — confirmed real. The shiny `.card__halo`
  (builder-restored BR-S068, z-index:-1 behind the card) bloomed in the CENTRE and faded transparent (~70%)
  BEFORE the card silhouette, so the colour sat hidden behind the opaque card and the visible perimeter ring was
  empty. Fix (one rule, `.card[data-treatment="shiny"] .card__halo`): carry the per-source-tinted bloom out to
  ~100% of the +40px box + `blur(22px)` so a soft halo actually rings the card; fade-in peak 0.78→0.82. Still the
  CARD's own depth (z-index:-1, behind it) — **NOT** touched: the "no --halo escapes to the room" box-shadow ring
  (styles.css ~1052), the floor/panel zero-halo law, sparkles/rainbow/loops (stay OFF). Reduced-motion stills it
  (existing block). **Verified live @1600×900** (headless-Chrome capture, since MCP screenshot is broken):
  per-source halo now visibly rings the shiny SRC-01 card; computed `blur(22px)` + gradient + opacity ~1 + ~50px
  ring on all sides; free card unaffected (halo opacity 0). Intensity is eyeball-tunable. Runtime: styles.css
  only (app.js/data.js/index.html/scan-contract.js untouched). ONE commit "BR-S095: halo glow around developed
  card"; not pushed without approval.

- **BR-S094 — cheap_extract specificity test bench (DESIGN only)** (2026-06-21, docs only): designed the bench
  BR-S093 §11 queued and saved it as `docs/BR-S094_CHEAP_EXTRACT_BENCH_SPEC.md`. Purpose: test whether a CHEAP
  extraction pass can produce ONE safe, oddly-specific Blue Room artifact anchor on real photos — matchable back
  to its photo, never reading the person, at Free-tier cost — to de-risk the cheap-Free/deep-Paid economics and
  pin the specificity floor (BR-S093's #1 non-code risk) before any engine code. Spec carries: the 5-question
  frame, the ~20-photo input set (subject/info-density/quality + a ~5 safety-stress subset), the single-anchor
  strict-JSON schema (a BR-S093 contract line), scoring rubrics (valid JSON · specificity 0/1/2 · reason-safety ·
  generic swap-test · **UNSAFE-PERSON zero-tolerance** · **blind match-rate = the proof** · cost · curiosity),
  failure thresholds + KILL/PASS verdict logic, the blind-match leakage-control protocol, and the recording
  format. **This is bench DESIGN ONLY** — NO runtime, NO app integration, NO scan engine, NO API calls, NO model
  calls, NO payment / Paid Full Develop / finish-anomaly / Vault / salvage; no app.js/styles.css/scan-contract.js.
  **The actual bench RUN is BLOCKED** until the builder (a) supplies ~20 varied photos AND (b) explicitly
  approves running it — until both, paper design only, no execution, no cost. Registered in `FILE_MAP.md`,
  ratified in `DECISION_LOG.md`. **NEXT (gated):** on the photo set + approval → RUN the bench (results to
  `docs/bench/`) → read the verdict (PASS → lock Free tier + cost→price; KILL → escalate model tier / shrink Free
  scope). **Then** the Scan Engine Spine. ONE commit "Docs: add BR-S094 cheap_extract bench spec"; not pushed
  without approval.

- **BR-S093 — Front Pull vs Full Develop: Value Ladder + Evidence Contract (no-code spec)** (2026-06-21, docs
  only): the no-code planning lane that consumes `docs/BLUE_ROOM_MASTER_SPINE.md` and produces the open deltas
  (never re-deriving locked laws). Opened on the pushed checkpoint `2c91a32`. **Added
  `docs/BR-S093_VALUE_LADDER_SPEC.md`** — a Result Map (broad lane) + the spec: current surface inventory
  (SAMPLE model), target Free Front Pull + Paid Full Develop surfaces, the **exact Free/Paid delta = DEPTH not
  completion** ("Free gives you the card. Paid develops its production record."), the evidence-contract per-line
  schema (`{lens, observation, visibleCue=specificity_anchor, effect, confidence, reason}`, reason validated,
  fail-closed on missing anchor), and the cheap_extract test-bench plan. **§5 RATIFIED (builder):** the Free↔Paid
  choice is a **user-controlled in-room SWITCH** ("choose/switch what you want" between Free Front Pull and Full
  Develop) — not a forced funnel; default-on-entry = Free (Free-as-hero), Full Develop pre-purchase shows the
  intent gate (qualitative sealed-back + price, no paid content), post-purchase both views switch freely
  (idempotent, immutable snapshot). **OPEN deltas carried** (resolve in/after the bench, not now): anomaly
  attach-scope; price/margin anchor (provisional ~$7, = f(deep-pass cost)); specificity floor threshold
  (empirical). Registered in `FILE_MAP.md`, ratified in `DECISION_LOG.md`. Docs only — no runtime, no scan
  engine, no payment, no finish/anomaly, no Vault, no salvage. **NEXT lane:** the cheap_extract specificity
  **test bench** (§11) — ~20 photos, anchor-coverage + blind match-rate + cost; design→build on explicit ask.
  **Then** the Scan Engine Spine (built against this evidence contract). ONE commit "Docs: BR-S093 value-ladder
  + evidence-contract spec"; not pushed without approval.

- **Docs — Post-BR-S092 Master Spine saved** (2026-06-21, docs only): saved the sharpened strategic master
  to the repo so it is durable in GitHub, not only living in chat. **Added `docs/BLUE_ROOM_MASTER_SPINE.md`**
  ("BLUE ROOM — Master Spine (sharpened, post BR-S092)") — the current strategic source-of-truth: three card
  states (Local Front Card / Free Front Pull / Paid Full Develop), the Free/Paid relationship (Dependency ·
  Continuity · Consistency), the hero sentence ("Free gives you the card. Paid develops its production
  record."), the canonical `card_record`, the evidence-contract + specificity-anchor + reason-field laws,
  economics/persistence (vendor-agnostic model tiers, immutable snapshots, no re-call/re-roll), finish/anomaly
  + salvage PARKING, and the roadmap. **Corrected the chat draft's header**: latest pushed HEAD is the docs
  commit `60a5c75 — Docs: record BR-S092 local front card lane` (chat draft wrongly named `b11ccd0`); `b11ccd0`
  is the runtime commit underneath. **Confirms BR-S092 is the current pushed source.** Registered in
  `docs/FILE_MAP.md` (table row + strategic-spine pointer) and ratified in `docs/DECISION_LOG.md`. Governance
  note (read-only Opus critic, NO blockers): the master's Dependency law ("Paid does not require Free") refines
  the older locked "Develop = sealed back of the SAME card the user already holds / Free-first" framing —
  preserved verbatim, the refinement logged in DECISION_LOG, with the lawful **Paid-only entry flow** flagged as
  an OPEN delta for BR-S093 (the anti-paywall laws stay intact via Consistency + the hero sentence). **NEXT:**
  BR-S093 is **no-code** — *Front Pull vs Full Develop: Value Ladder + Evidence Contract* — and must consume
  this master, producing only open deltas (never re-deriving locked laws). **Scan engine + the cheap_extract
  test bench remain NOT started** (parked behind BR-S093). Docs only — no runtime change. ONE commit "Docs: add
  post-BR-S092 master spine"; not pushed without explicit approval.

- **Draft → Local Front Card (BR-S092)** (2026-06-21, app.js + styles.css; shipped LOCALLY as `b11ccd0`): the
  first truthful, buildable-now step where a user's OWN photo becomes a held card object — without faking a scan.
  **Two-beat decision (ratified A, from the BR-S091 honesty spine):** pick photo → **LOCAL DRAFT** (loaded, unfiled
  intake) → press **Build Local Card** → **LOCAL FRONT CARD**. Filing is the press, not the load: `buildLocalCard`
  mints a browser-local card id (`BR-LOCAL-<ts>-<rand4hex>`) + a staging timestamp ONCE (never regenerated per
  render) and walks `draft.scan_state` `'draft'`→`'unscanned'`; the router gained an `unscanned` branch →
  `renderLocalCard`. The **Local Front Card is explicitly UNSCANNED / FRONT-ONLY — it is NOT a Free Card** and the
  words "Free Card"/"complete" never appear on it. **Safe facts only = provenance / file / geometry:** dimensions /
  orientation / aspect / file type / file size / browser-only source, decoded async from the `<img>` element with a
  graceful fallback — **no pixel-content read, no EXIF** (no date/GPS/camera). **Generates NOTHING:** no reading, no
  stats, no oracle, no archetype, no finish/anomaly, no Develop/Halo, no serial, no "complete"; the card back stays
  closed ("Card back remains closed until a scan exists.", builder-set copy). **`renderCard` was NOT reused** (it
  carries fixture reading content) — `renderLocalCard` is a new reading-free sibling of the `.draftcard` shell.
  `applyView` labels a filed card "ARCHIVE · YOUR PHOTO · LOCAL ONLY" (never the SAMPLE branch). Folded honesty
  niceties: the intake CTA "Develop scan"→"Build Local Card"; the menu resume label →"Resume local card →" once
  filed. **No data.js / index.html / scan-contract.js change.** **Validation PASSED (live @1600×900, console clean
  throughout — MCP `preview_screenshot` broken per memory, verified via accessibility snapshot + DOM assertions):**
  two-beat state walk + zone labels correct; card id format ok + stable across re-render; geometry units correct
  (16:9 / 4:5 / 8:5 / odd→decimal); all honesty labels present; banned-copy sweep = 0 hits; **no Develop/Open-Card-
  Back button**; **two menu doors intact, per-source sample marker intact, 7 `section.dplate` intact**, intake CTA
  swapped cleanly. **Parked copy nit (NOT fixed this lane — track for a future copy-law cleanup):** the now-DORMANT
  `renderGate` still contains "Development pending" (banned word); BR-S092 removed the gate's only product door so
  it is no longer user-reachable, and `renderGate` is kept honest + intact for a future engine. **NEXT (parked, no
  code without explicit ask):** the SCAN ENGINE / real upload→card path remains the structural lane that turns the
  LOCAL FRONT CARD into the engine-gated true Free Card + Develop/Halo back + payment — build it against the BR-S091
  contract, never before. Card Finish / Surface Variant / Archive Anomaly stays a future no-code design (attaches
  ONLY to the engine's true Free Card front, never the local card).

- **Archive Desk Intake Flow + Door Truth (BR-S090)** (2026-06-21, app.js + styles.css + docs): made the
  entrance truthful (audited E-prime). The Archive Desk now has EXACTLY TWO doors: PRIMARY **Add Your Photo**
  (hero, `data-draft-pick` → local-draft intake — the real beginning; sub-line "the scan engine isn't
  connected yet — nothing reads it") and SECONDARY **View Sample Card** (dashed, `data-view-to="room"` →
  SRC-01, "A sample, not your photo"). **Removed** the Develop door ("Develop a scan") + the old "Enter Scan
  Room / Free Pull" door (both false — both routed to the sample; Develop was premature with no card and read
  pay-first) + the redundant small "Add your photo" link. **SAMPLE marker** now derived per-source — topbar
  zone label ("ARCHIVE · SAMPLE · SRC-0N · NOT YOUR PHOTO") + in-room `.stageintro__cue` ("SAMPLE · SRC-0N ·
  not your photo") — so a demo card can't be mistaken for the user's own (STOPGAP tracked in code: every room
  is a SOURCES sample today; a future real-card path must set its own non-sample label). CSS door modifiers
  renamed `--free`→`--add` / `--develop`→`--sample`; orphaned `.menu__add` / `.menu__door-note` rules removed.
  **Untouched:** `renderDraftIntake` / `renderGate` copy (honest no-engine core); data.js / index.html /
  scan-contract.js; the BR-S088/S089 reading arc. "Free Pull" remains only as the card edition stamp + the
  treatment toggle (card/room identity, not a door) — the Free-Pull→Free-Card rename is PARKED. **Verified
  live @1600×900** (DOM + headless): two doors only (no Develop); Add → intake; View Sample → SRC-01 with the
  per-source SAMPLE marker (SRC-01 + SRC-02); 7 `section.dplate` + developed reading unchanged; console clean;
  no false scan/card/keepable promise; no face/person/worth/rank/hidden-score/rarity/paywall language; no
  card-finish/anomaly/rarity/schema work. Draft-exists branch (door → "Replace your photo" + "Resume local
  draft →") code-verified (a file-pick can't be auto-triggered headless). **NEXT (parked, future no-code
  design):** the Card Finish / Surface Variant / Archive Anomaly brainstorm; the scan ENGINE / real
  upload→card path remains the eventual structural lane that unlocks a real Card Room + in-card Develop
  ("Open Card Back").

- **Dossier Plate-Tier + Neighborhood Legibility (BR-S089)** (2026-06-21, styles.css + docs): post-BR-S088 the
  dossier was the bottleneck (7 equal dark boxes). One styles.css-ONLY hierarchy pass (app.js untouched), 4
  checkpoints: (1) SEAM — `.dossier__cue` lifted 9px/--faint → 11px/--t-body + brighter hairlines so the
  room→card-back threshold is felt; (2) REGISTER STRIPS — `.dossier__register` 9.5→11px/--t-body so DEVELOPED
  RECORD / ARTIFACT PROVENANCE partition the stack (kept `<div>`); (3) DEMOTE SOURCE RECORD — `.drecord dd` +
  filing/lineage values → --t-body so Source Record (01) + Mint Record (06) read as quiet provenance (rows
  untouched, re-toned not deleted); (4) WIDEN DELTA — quiet titles 17px/--silver + spine 18px, LOUD titles
  24px, giving quiet-17 / medium-22 / LOUD-24 so Oracle reads terminal in both states. **Accent GATED OFF**
  (no --halo-a change, no colour/reveal/motion — hierarchy alone solved it). **Verified** @1600×900: 7 dplates;
  strips are `<div>`; seam felt; Source Record quieter than Evidence Board; Oracle terminal; Free complete +
  unchanged; console clean; no banned/0–100/rank/worth/person/locked-counts; reduced-motion safe. Runtime:
  styles.css only. No payment/backend/upload/email/share/mobile/profile. Closes the BR-S087 dossier lane.

- **Paid Reading Register + Subtraction Pass (BR-S088)** (2026-06-21, app.js + styles.css + docs): implements the
  BR-S087 diagnosis (paid reading dry from register flattening + duplication). **(1) Register lift (styles.css):**
  interpretive verdict prose now renders in the serif lead register — `.dstat__evidence` 12.5px/--muted/caption-indent
  → 15px `--font-display`/--text/breathing; `.module__line` 14px sans → 15px serif (scene role + archetype read).
  Admin/proof (key-value grids, mono receipts, serials, bars/tier chips) stays the quiet flat cue. **(2) Subtraction
  (app.js, PAID-ONLY):** cut the panel's analytical deep modules — Stance Read, Fit Coherence, Frame Impact, Lore
  Density, Mint Record, and paid Aura Profile — which were verbatim re-renders of dossier Plate 05/06. The PAID panel
  is now a tight VOICE/SUMMARY column (Oracle → Stat Reading → Scene Role → Artifact Archetype → Technical Receipts);
  the dossier is the sole home of the deeper Stance/Fit/Aura/Impact/Lore/Mint material. **Builder ruling: do NOT
  restore Stance — keep the panel tight, dossier owns the depth.** Step 1 (`.dstat__evidence`) was the validated
  checkpoint (evidence reads as a written verdict, not an admin caption). DEFERRED: dossier plate re-tier + register-
  strip legibility + `--halo-a` accent (→ BR-S089); no colour/motion/reveal added this pass. **Free UNTOUCHED** (free
  renders lockedDeep — Aura + Develop CTA + 3 teasers intact). **Verified live @desktop:** paid panel = the 5-beat
  column (DOM-confirmed); 7 `section.dplate` intact; Free complete; console clean; zero banned words; no 0–100 / rank /
  worth / person framing; layout stable; reduced-motion safe. Runtime: app.js + styles.css only. No payment / backend /
  upload / email / share / mobile / profile work. **NEXT:** BR-S089 — dossier plate-tier + neighborhood legibility
  (widen LOUD/quiet plate delta, demote Source Record, mark the panel→dossier seam, lift the 9.5px register strips to
  ~11px + a rule); then, only if still needed, restrained `--halo-a` accent on the two hero sections.

- **Paid Reading Value / Visual-Reward stress-test (BR-S087)** (2026-06-21, DOCS ONLY — new
  `docs/BR-S087_PAID_READING_SPEC.md` + FILE_MAP + DECISION_LOG + this queue): a 13-role read-only design
  pipeline (suspects withheld from a cold diagnostician to defeat confirmation bias) diagnosed why the
  developed/PAID reading reads dry. **Verdict (builder-agreed): NOT primarily colour or reveal — REGISTER
  FLATTENING + DUPLICATION.** The prose/content is already STRONGER than expected but rendered like admin/
  document text (vivid card-keyed sentences at the same ~13-14px grey as field rows — only the Oracle escapes
  via its distinct serif/quote register), AND the paid PANEL re-renders the dossier verbatim (stance/fit/impact/
  lore/aura/scene-role/mint-record) → one peak + 6-7 flat echoes. K1 "IOU content" REJECTED for paid (the
  "develops with the mint" placeholders are free-only). Direction = treat the reading as a VOICE DOCUMENT:
  register-lift the card-keyed sentences + CUT the panel duplicates + re-tier the dossier + mark the
  panel→dossier seam + COMPLETE (not invent) the existing `--halo-a` accent (colour Option D; reveal Option A /
  no new motion); forced-KILL the cold/silver/blue "Mint mood" instinct. Full section audit, Hidden Stat/Oracle
  treatments, Mint identity, six-instinct stress-test, safety table, and impl spec live in the doc. **No
  runtime, no app.js/styles.css, no prototype, no commit of code.** **NEXT (gated on explicit builder approval —
  do NOT auto-start):** the SMALLEST validation prototype ONLY — restyle `.dstat__evidence` (app.js:852 /
  styles.css ~2027) to read as a written verdict (≈15px serif/display at `var(--text)`, breathing, demote the
  tier-chip/bar) to test "register contrast = aliveness" on one section; CSS-only, Free-safe, zero layout-shift.
  The FULL implementation (panel-duplicate cuts + dossier re-tier + accent) is DEFERRED and must not become the
  next lane until the prototype validates.

- **Developed Reading Rhythm — oracle-first + cue→effect + archive header (BR-S086)** (2026-06-21, app.js +
  styles.css + this queue): Phase 1 of the developed-reading de-dull (BR-S085 diagnosis: boring = a CONTENT/RHYTHM
  problem, not layout). Four scoped changes, conservative-hybrid form, **zero new pacing machinery**: **(1) Oracle-first**
  — the `module--oracle` block is lifted out of `deep` into `oracleFirst`; the DEVELOPED right-panel fork now opens on
  the card's VOICE (oracle → archetype → analytical deep), not the stat ledger. Free untouched (renders `lockedDeep`;
  the short oracle still lives in dossier plate 07). The three free-fork teasers rewritten to artifact-subject grammar
  ("The stance layer is latent…", "The coherence read sits in the negative, undeveloped…", "The oracle's full read
  develops with the mint") and the reader-denied "One line survives the preview — see the dossier" clause deleted.
  **(2) Cue→effect weight-split** (CSS only) — `.reads__name` desaturated to `--t-meta`, `.reads__val--tier` to
  `--faint` (the CUE / measurement recedes); `.reads__item p` brightened to `--t-primary` weight 500 (the EFFECT /
  read leads). No new data, no authored cue. **(3) De-dupe plate 03** — deleted the `.dstat__why` line (`src.reads[k]`)
  duplicated verbatim from the right-panel Stat Reading; the read now lives once (panel), the dossier carries the
  evidence layer (paid) / develop-state line (free). **(4) Archive record header** — a non-`<section>` `.drecord-gate`
  strip (`◆ ARTIFACT RECORD · serial · EDITION`) as the first child of `.dossier__inner`, binding both states with one
  archive identity; serial masked `····` on free. **Copy-safety correction (the one deviation from the handoff
  literal):** the edition label is STATE-AWARE — free → `ARCHIVE EDITION`, shiny → `HALO MINT`, lab → `SIGNATURE MINT`
  — matching the existing `stateBadge` precedent. The handoff hard-coded `HALO MINT` on both states; on free that
  dangles the developed state's name in front of the free reader (tier-ladder framing the BANNED reveal-grammar +
  free-as-hero taste forbid), so the truthful per-state name ships instead. **No data.js / index.html /
  scan-contract.js change.** The `<div>` (not `<section>`) keeps the `.dplate:nth-of-type` dossier rhythm intact; no
  animation/motion code touched. **Verified live @1600×900** (DOM/getComputedStyle + headless-Chrome screenshots; MCP
  screenshot broken per memory): (a) `section.dplate` === 7; (b) plates 04/07 still LOUD (38px air + 2px ledger edge);
  (c) `.dplate--oracle` still halo-tinted under `data-treatment="shiny"`; (d) developed fork opens Oracle → Artifact
  Archetype → Stance; (e) free entry unchanged — record header `···· · ARCHIVE EDITION`, plate 03 still a 4-stat
  ledger (not thin), zero withholding copy in the changed areas; (f) reduced-motion structurally safe (no animation
  added; header is a non-`.dplate` static `<div>`). Console error-free. **Product-law: PASS** — Free stays COMPLETE
  (every stat tier + read + aura + scene role on first paint; short oracle in dossier); no person/status framing; no
  public 0–100; develop CTA + sealed-back grammar held; latent→developed physics preserved.
  **AMENDMENT (panel-driven, folded into the same local commit) — feel fix:** a 20-agent critique panel (18 lenses
  → Opus reconciler → Opus safety gate, strong consensus, all 7 changes gate-APPROVED) found the original
  "oracle-first" was false at the PANEL level — the readseam renders after statReads/aura/sceneRole, so the developed
  panel still OPENED on the stat table (oracle ~4th). Fix: **(B/hook)** hoist the oracle ABOVE the stat table as a
  `panelLead` (developed only; free `panelLead=""`), de-cage + scale it (18→22px, left-aligned, `--silver-bright`,
  border/bg removed) so the panel opens on the card's VOICE; a new shiny rule keeps the hoisted `> .module--oracle`
  lit (the recede rule at styles.css ~1126 dims direct-child modules to 0.74 — the seam-only re-light didn't cover it).
  **(A/copy)** removed every banned "Development pending" string in the live reading: the two Evidence-Board receipt
  tails + the Hidden-Stat seal ("…sit on the card's developed back" / "Sealed · on the card's developed back") AND the
  Metrics-tab Fit Matrix locked line. **(E/header)** lifted the `.drecord-gate` (10→11px; color `--t-meta`→`--t-body`
  — corrected from the panel's `--silver-dim`, which is a no-op ALIAS of `--t-meta`). DEFERRED by the panel (logged):
  C register labels + D dossier table-wall simplification (the dossier is still dense — the second-order drag); F
  reveal buttons + G card-left slab REJECTED. **Verified live @1600×900** (DOM + headless-Chrome shots, SRC-01/02 ·
  shiny/free · source+metrics tabs): developed panel now opens Scan Reading → **Oracle Read** → Stat Reading (both
  sources); free panel unchanged (no oracle lead); 7 dplates; LOUD 04/07 + shiny dossier oracle tint unchanged;
  record gate `#b1ada4` legible; **zero banned words** across free source+metrics+dossier; console clean;
  reduced-motion untouched. The Halo Gate dev-mock "Development pending" (app.js ~1209, `?dev=halo-gate`) is LEFT
  untouched — LOCKED surface + it denotes the offline scan ENGINE ("Ready for future scan engine"), not user paywall.
  **BR-S086C — dossier table-wall reduction (folded into THIS same single local commit per the builder's "amend
  BR-S086 only" instruction):** a 30-agent panel (9 Haiku speed + 17 deep + Opus reconcile/boundary/gate) targeted the
  lower 7-plate dossier. Shipped: `.dossier__inner` gap 26→48px (plate breathing); `.drecord` row padding 9→16px +
  `dt` color `--faint`→`--t-meta` (Source-Record breathing + label/value hierarchy); the section cue renamed
  `SCAN DOSSIER — FULL RECORD` → **`CARD BACK — ARTIFACT RECORD`** (reframe as card interior, state-agnostic so no
  develop-word leaks to free); TWO non-`<section>` register dividers that **introduce** their groups —
  **`DEVELOPED RECORD`** (before plate 04, fronts Hidden Stat / Fit+Aura / Mint) and **`ARTIFACT PROVENANCE`** (before
  plate 07, fronts the closing Oracle); the first zone (Source / Evidence / Stat) is opened by the cue + record-gate,
  no label. Four contrast-only legibility lifts off the sub-10px floor: `.dossier__register` 8.5→9.5px, `.dfile__kick`
  8.5→10px, `.dlineage__k` 9→10px, `.receipt__conf` 7.5→9px, all `--faint`/`--t-ghost`→`--t-meta`. Builder REJECTED the
  agent's original labels ("Scan Reading" dup'd the panel title; "Production Record" mislabeled the Oracle); used the
  2-label fallback (dropped a 3rd "SCAN EVIDENCE" — it stacked under the cue+gate, tripping the restraint rule).
  **Verified live @1600×900** (DOM + headless-Chrome dossier shots, shiny SRC-01/02 + free; a Screenshot-Judge agent):
  exactly 7 `section.dplate`; registers are `<div>` (nth-of-type rhythm intact); LOUD 04/07 + shiny `.dplate--oracle`
  tint unchanged; zero banned words in free; console clean; reduced-motion untouched. **Feel verdict:** the record now
  reads as separated neighborhoods with breathing + legible labels — materially less table-wall — though Source Record's
  intra-plate grid is the surviving dense object (deferred; the structural restructure was rejected this pass).
  **PROCESS NOTE:** a workflow subagent autonomously committed this work as a stray separate commit (`e52de16`) during
  a critique-only run; it was soft-reset and FOLDED into this single BR-S086 commit per the builder's instruction
  (one clean local reading-engagement commit). Never pushed.

- **Menu upgrade — real Free card → Archive Desk (BR-S079 / S081 / S083, one folded commit)** (2026-06-21, app.js +
  styles.css): the menu entrance, rebuilt across three folded passes (one unpushed commit). The hero shows the
  **actual reduced Free card**, not a flat photo tile, so the entrance makes
  "every photo is already a card" literally true on screen (the menu had been showing the *before*, the room the
  *after*). **Swapped** the `.msample__solo` photo tile (`shot()` / `.mtile`) for `renderCard(SOURCES[0], "free")`
  in a `.msample__card` wrapper, scaled to ~301px visual via **`zoom: 0.7` of a 430px-natural render** — a width-only
  squeeze distorted the card's fixed chrome (ratio 2.31 vs the room's 1.56); zoom preserves the room proportions and
  430 is the proven before/after width. Rendered **free only** (complete front: ARCHIVE EDITION, FREE PULL EDITION
  stamp, ghost serial `····`/`BR-001-DRV-0001`, tier bands) — never a developed/Halo grade; the seal line "The front
  is complete. The same card has a sealed back." bridges to the subordinate dashed Develop door (Free door stays the
  solid hero). **Removed** the redundant `.msample__title`/`.msample__arch` (now carried by the card) + the
  `.menu__hint` institution line (the card embodies it) to reclaim fold; let the card **float** (dropped the
  `.msample` box border/bg) so it reads as the object, not a box-in-a-box. **Deleted** the now-dead `shot()` helper +
  `.mtile__*` / `.msample__solo` / `__title` / `__arch` / `.menu__hint` CSS (menu-only, grep-confirmed). **No data.js
  / index.html / scan-contract.js change; `renderCard` untouched.** **Verified live @1600×900** (DOM/getComputedStyle;
  cache-bust via `fetch(cache:'reload')` then reload — NO file cache-bust to revert; screenshot tool times out on this
  DPR, per memory): menu card renders proportional (301×498, zoom 0.7) + legible (title 1 line · 4 stats 1 row ·
  mintstrip unclipped; the only "overflow" is the invisible opacity-0 halo/shimmer layers, same as the room card);
  Free door in-fold (primary), Develop door at the fold (subordinate); old tile/hint gone. Room card unaffected
  (493px, zoom 1 — the zoom is scoped to `.msample__card`); before/after card 430 + BR-S076 clarifier intact; Halo
  developed + badge + 7 plates; review-map 4 groups / 11 cards; Develop door enters the room (BR-S072 flow);
  scan-contract 3 valid / 4 invalid; no public 0-100; console error-free. **Product-law: PASS** — ONE free card only
  (no person-comparison; BR-S077 single-card-intense, no two-grades; the developed card is NOT shown on the menu);
  the free card is static (halo/sparkles opacity 0 — no animation/flash added); reduced-motion N/A (nothing animates).
  **Caveat:** `zoom` is the pragmatic box-collapsing scale (Chrome/Edge/Safari/FF126+ — desktop-first, fine for this
  prototype). **Then rebuilt as the ARCHIVE DESK (ex-BR-S081 fold-fix + ex-BR-S083 layout/clarity, all folded into this
  one unpushed commit).** A centered fold-compression + a dual-face depth-cue (`::before` back-panel) were tried and
  **REVERSED** — the cue read as an odd offset rectangle, not thickness (removed, per the documented fallback), and the
  centered stack hit a geometric ceiling: the ~498px card stacked ON TOP of the doors (~980px) can't fit a 900px
  viewport without shrinking the card, which the builder VETOED. BR-S080's 16-agent brainstorm + a BR-S082
  architect/funnel-adversary/judge pass concluded **card-RIGHT / ledger-LEFT**: side-by-side replaces the height SUM
  with the MAX, so the menu fits 1600×900 with **NO scroll** AND the card **GROWS** (zoom 0.7→0.92, 296×498 →
  **390×652**, +32%). `.menu__inner` is now a desk grid (`min(1180px,92vw)`, `360px 1fr`, gap 72px, 4-row areas that
  center the head+controls unit beside the card); `renderMenu` split into `.menu__head` + `.menu__stage` (cap + card) +
  `.menu__controls` (hairline rule, the seal line as the doors' preamble, Free+Develop doors, add-photo, footer). Card =
  the largest object (~60/40 mass), the eye lands on it first; the doors are quiet **shadowless ledger entries**, not
  CTAs; a `@media(max-width:1199px)` fallback restores the centered single-column stack (brand→card→doors, zoom 0.7).
  **Clarity polish:** brightened the dim ledger text (trust/seal/door-desc/note/kicker → `t-body`/`silver`, +1–1.5px)
  and made the door borders clearly visible (Free **1.5px solid `--silver-dim`**, Develop **dashed 0.34α**) — readable +
  spottable, Free-solid-hero > Develop-dashed-subordinate hierarchy intact. **No data.js / index.html / scan-contract.js
  change; `renderCard` untouched; NO annotation / telemetry / callout code — the card stays clean.** **Verified live
  @1600×900** (DOM + real **headless-Chrome screenshots** — the working capture side-channel, now that the MCP
  `preview_screenshot` is confirmed broken in this env): NO scroll (docHeight 900); card 390×652 (bigger than the
  centered 296×498); both doors in-fold; room card 493 unaffected; before/after 430 + BR-S076 clarifier; review-map
  4/11; Develop door enters the room; scan-contract 3 valid / 4 invalid; no public 0-100; console error-free; 1366×768
  overflows ~3px (negligible). **Product-law: PASS** — ONE complete Free card only (no second card / depth cue / source
  photo / person-comparison); Free primary, Develop subordinate (STACKED, not a side-by-side grade pair); no
  price/accent/glow on the doors; static, reduced-motion-safe. **One commit, local only — NOT pushed (builder approves
  the push).** **Completed.** **Next up (builder decision):** push this menu commit; then Dossier Reading Mode / sticky
  archive plate (the other BR-S078 build; GO-WITH-CARE — the `.dstream` selector-rewrite + the person-dossier-gestalt guard).
- **Share Canon Boundary Spec v1 (BR-S077)** (2026-06-20, docs only — new `docs/SHARE_CANON_BOUNDARY_V1.md` +
  FILE_MAP + DECISION_LOG): the dedicated share/canon pass BR-S076 recommended — locks the safety boundary for
  **shareable** cards BEFORE any customer share trigger / export / social / payment ships. **Docs-only** (no
  runtime / share / export / payment). **Forged via a 3-lens adversarial workflow** (side-by-side mechanics ·
  scarcity/rank labels · over-safety/strongest-safe-variant → reconcile; held BOTH guards — strong enough to stop
  person-ranking, not so broad it sands off Blue Room's charge). **Core ruling:** the share harm is EMERGENT +
  RELATIONAL — the display-time sibling of the `UNIVERSE_ZONE_MAP_V1` §7 aggregate wall (single-card bands are
  safe per GN#12; the JOIN of two person-anchored cards is the harm). The wall goes around the RELATION + the
  PERMANENT/VALUE, never around the single card's language. **LOCKED NOW:** share card reads photograph→artifact
  never person→verdict; no leaderboard / sort-by-tier / versus / person-comparison; bands are photo-state not
  achievement ("Peak" reframed, NOT removed); provenance/serial = identity not value (Edition couples to the
  develop-state, never an ordinal); paid never upgrades the person; self-framing + a PEAK-band pre-ship visual
  test; share/export is single-card. **Anti-bland law:** safety = move the grammatical subject to the photograph +
  ONE deadpan clarifier — the single card keeps PEAK, the full ladder, serial/First-Print provenance, the develop
  ceremony, and scene-force reads at full charge (a "Strongest safe variant" §H spells out the most exciting safe
  direction). **OPEN (owner decision, when the real surface exists):** whether literal "Peak" / "FIRST PRINT" print
  on a bare share card; whether bands are shown / hidden / clarified; whether multiple cards may share one frame.
  **Flagged constraint (code deferred):** the dormant `UNCOMMON PULL` fixture (scan-contract.js ~414) may never
  reach a share surface — rename-before-reuse + share-path lint is a future coding task. **Honesty:** the boundary
  is ASSERTED not ENFORCED — the aggregate guard ships WITH the uploaded-photo engine. Registered in FILE_MAP +
  DECISION_LOG (2026-06-20). **Docs only ⇒ no browser verify** (no runtime change). **One commit, local only
  (builder pushes).** **Completed.** **Next up (builder decision):** resolve the OPEN owner decisions when a real
  share/export surface is designed (run the PEAK-band pre-ship test), or proceed to the parked commercial-systems
  planning.
- **Desktop Flow / Copy / Safety Polish Audit (BR-S076)** (2026-06-20, app.js only): walked the visible desktop
  spine via `?dev=review-map` (Menu → Free Pull → Develop/Halo → Before/After → dev mocks/harness) and tightened
  seams before the commercial-systems phase — audit + small fixes only, no new systems. **Forged as a 6-agent audit
  workflow** (2 flow/copy finders + 2 adversarial safety critics [share-surface · band-ladder] + 1 dev-surface/route
  walker → adversarial synth that re-challenged every proposed fix): 28 raw findings → **3 confirmed small-safe
  fixes**, the rest flagged as LOCKED-canon or latent. **Shipped (3 copy edits, app.js only):** (1) entrance sample
  label **"Human Sample · Archive" → "Sample Photo · Archive"** (renderMenu ~979 — the one entrance string that
  framed a *person* as the sampled object, rubbing the adjacent "never the person" trust line); (2) **before/after
  share footer** now also disclaims the bands — appended "Tier bands read the photograph, not a person — never a
  ranking between cards." (renderBeforeAfter `.ba__honest` ~1340) — the explicit non-canon LOCAL mitigation for the
  BR-S074 share-comparison risk, scoped to one dev surface, does NOT touch the ladder/`tierBand`/"Peak"/card system;
  (3) **free-sim vault dedup** — dropped the redundant "This card has a sealed back." lead from the vreason
  (renderFreePullMock ~1647; the sealed-back idea is still carried by the vault head + halo edge). **No styles.css /
  data.js / index.html change.** **Verified live @1600×900** (DOM; cache-bust via `fetch(cache:'reload')` — NO file
  cache-bust to revert): full route list walked (menu · free · halo · before-after · review-map [3-col under fresh
  CSS] · halo-gate · free-scan-sim · uploaded-result · uploaded-blocked); all 3 edits render; "Human Sample" gone;
  band clarifier present + not clipped (8.5px); vreason de-duped; Free Pull intact (7 plates, complete CTA, price at
  develop-intent, tier bands, no public 0-100); console error-free. **Band-ladder verdict: FLAG-TO-CANON-OWNER**
  (concur) — not severe+local+non-canon (the Muted..Peak ordering is LOCKED [BR-S029] + feeds every card statzone;
  the person-comparison risk is EMERGENT but LATENT — no customer share trigger/export exists; the only juxtaposition
  surface is the gated dev route on sample sources). Shipped the local clarifier line instead of rewriting canon.
  **Flagged for the canon owner (logged here, NOT patched — locked/latent):** (a) the Peak/band-ladder comparison
  vector on juxtaposed share-cards; (b) the Develop-door landing on the Free front — **BY DESIGN per BR-S072** (both
  doors enter the room so develop happens in-place at the in-room CTA); only a copy-over-promise *taste* call remains;
  (c) "FIRST PRINT · DEVELOPED" strip + "Edition · First Print" + `…-0001` serials reading as an edition-ordinal
  (edition/serial canon); (d) the face→arrow→graded-card visual grammar (needs the share-trigger decision); (e) the
  dormant **"UNCOMMON PULL"** rarity band in the free-sim fixture (`scan-contract.js:414`, INERT — renderFreePullMock
  never reads it — a latent landmine for a future re-wire); (f) the documented Metrics-tab + `?dev=uploaded-result`
  raw-0-100 carve-outs (DECISION_LOG-locked, dev-only); (g) stale-cached `styles.css` on direct nav (report-only — a
  permanent `?v=` wants a build step; dev-live.html / hard-refresh already cover the reviewer path). **Missing screens
  (later — do NOT build now):** customer-facing share trigger/export · profile/record/vault · real upload+scan engine
  · develop-intent payment + onboarding. **One commit, local only (builder pushes).** **Completed.** **Next up
  (builder decision):** a dedicated share/canon pass to resolve the Peak/ladder + FIRST PRINT questions BEFORE any
  real share/export ships — or proceed to the parked commercial-systems planning.
- **Desktop review map UI polish (BR-S075b)** (2026-06-20, app.js + styles.css): BR-S075's `?dev=review-map` worked
  but rendered as an unstyled inline link list (partly the structure — no badges/route-strings/buttons — partly the
  recurring stale-cached styles.css on direct nav). Rebuilt as a proper DEV **dashboard**: header (title "BLUE ROOM —
  desktop review map" + a "DEV REVIEW · not a product surface" pill + the one-line explainer), four labeled group
  sections, and each route now a **card** in a responsive grid (`repeat(auto-fill, minmax(300px,1fr))` → 3-up at
  1600×900) with name + **type badge** (REAL/SHARE/MOCK/HARNESS) + description + a **visible route string** (`<code>`)
  + an "Open →" affordance + a quiet left-edge category accent. Same real routes (invents none); still `?dev`-gated
  (never customer UI); BLUE ROOM tokens (dark, quiet borders, no shimmer/rainbow/sparkle/glow). **Verified live
  @1600×900** (DOM): 4 groups / 11 cards, 3-col grid (no inline dump), all four badge kinds, route strings visible;
  clicking "Free Pull · Driver" lands on `?src=1&t=free` (room, Diagram nav intact); zero banned words in the map;
  scan-contract 3 valid/4 invalid; console clean. No real product routes/behavior touched. **Follow-up commit (d67c6ad
  already pushed — no history rewrite).** Note: direct nav may serve stale cached CSS — open via dev-live.html or
  hard-refresh to see it. **Completed.**
- **Desktop review map (BR-S075)** (2026-06-20, app.js + styles.css): a DEV-ONLY `?dev=review-map` — a categorized,
  clickable index of the current desktop spine so the surfaces are reviewable without guessing routes. Reuses the
  `?dev` pattern + mountDev (gated → customers never reach it; not product UI). Four labeled groups linking the REAL
  routes (invents nothing): **Real product surface** (Menu `index.html`, Free Pull `?src=1|2&t=free`, Developed/Halo
  `?src=1|2&t=shiny`), **Share/capture** (`?dev=before-after[&src=2]`), **Dev mock** (`?dev=halo-gate`,
  `?dev=free-scan-sim`), **Validation harness** (`?dev=uploaded-result`, `?dev=uploaded-blocked`); footer notes the
  `?devnav=1` state-jumper rail + the internal `?t=mint` Lab. **Verified live @1600×900** (DOM): map renders, 4 groups
  / 11 real links, zero banned words in the map text; halo-gate (pre-existing harness) still dispatches after the
  mountDev edits; Free room audit — Diagram nav pinned + tabs intact, price line Free-only/no-figure, hidden tease
  qualitative ("Sealed reading", no count), tier bands only (no public 0-100); scan-contract 3 valid/4 invalid;
  console clean. **Product-law audit (walking the spine): PASS** — no numeric score, no person-judgement, no
  paid-pressure (price only at develop-intent), no exact sealed-count; the before/after share surface was reframed +
  Opus-audited in BR-S074 and the map only links to it. **One commit, local only (Part 2 had no push instruction).**
  Out of scope held: payment/email/mobile/backend/export/social/Record/engine — none touched; no new product promise.
  **Completed.**
- **Before/After Share View MVP (BR-S074)** (2026-06-20, app.js + styles.css + docs/research/DOSSIER_PACING):
  the first growth-facing surface — a screenshot-clean **capture view** composing the source PHOTOGRAPH → the
  DEVELOPED CARD in one frame. Built as the smallest safe form: a **dev/capture route `?dev=before-after`** (reuses
  the existing `?dev` mock pattern + mountDev; NO new customer zone/route/view, no library, no backend, no generated
  download, no canvas). `renderBeforeAfter()` reuses the master `renderCard(src,"shiny")` (bands only, no 0-100) +
  the raw source photo; sample sources only (`?src` toggles). **Adversarial safety pass (Opus) caught a real
  visual-syntax risk:** every word was photo-honest but the raw face→arrow→graded-card layout read as person-scoring
  once a screenshot leaves the app. **Fixed at the framing level** so it reads as ONE photograph in two states
  (negative→print), not person→verdict: promoted "The room reads the photograph … never the person" into the
  header eye-path; seam verb "develops"→"developed"; after-tag "Developed card"→"The same frame, filed as a card";
  before-tag "The photograph"; footer names "the archetype is a photo role, not a person type." **Micro-sweep
  bundled:** marked `docs/research/DOSSIER_PACING_MINTED_NUMBERS.md` numeric register **SUPERSEDED** (its BAN /
  0-100-gauge "minted number" typography contradicts bands-only; the number-agnostic rhythm/colophon/serial
  guidance stays). **Verified live @1600×900** (DOM): photo + developed card both render, balanced (430/arrow/430);
  card stats are tier bands (Charged/Strong/Peak/Strong), **no public 0-100/score**; serial one-family
  BR-001-DRV-0001; menu (2 doors) + room + develop + Diagram|Metrics all intact; scan-contract 3 valid/4 invalid;
  console clean; halo CSS untouched; no sparkle/rainbow/shimmer. **One commit, NOT pushed (builder review).**
  **Out of scope (held):** image-export download (lib/backend), social/referral, Record page, payment, price figure,
  engine, customer-facing trigger into the view (trivial later add). **Flagged for the canon owner (not changed —
  locked):** the band word "Peak" + the 5-band ladder become a person-comparison vector the moment two share-cards
  meet (Opus #2/#4) — consider for a future share/canon pass. **Completed — awaiting builder review.**
- **Menu Redesign v3 + Two-Door Fork (BR-S072)** (2026-06-20, app.js + styles.css): evolved the one-door menu
  (BR-S041) into a two-door fork that matches the refined room — **Free-primary / Develop-subordinate**, NOT a compare
  ladder. Kept the hero sample card (proof), thesis/trust copy, "Add your photo" + resume + dev routes, and all of
  BR-S071 (scan room untouched). **Free Pull door** = solid primary ("Enter Scan Room · Scan a photo into a complete
  card — yours to keep and share"). **Develop door** = a subordinate DASHED companion ("Develop a scan · Open the
  sealed back of the same card — the same scan, read deeper" + the dev-mock note "one-time develop · this scan only ·
  dev mock, no payment", **no figure**). Stacked (not side-by-side) so it reads as primary-then-secondary, never two
  grades; the dashed border echoes the sealed/undeveloped motif so Develop reads as opening the sealed back, not buying
  a better card. Both doors `data-view-to="room"` (develop is a verb on a scan — it happens in-place in the room, where
  the develop CTA + the BR-S071 price line live). Replaced the old `.menu__enter` button in renderMenu (the class is
  KEPT — still used by renderHaloGateMock). New `.menu__doors`/`.menu__door*` CSS (static borders + the existing
  translateY hover; no new effect). **Verified live @1600×900** (DOM; cache-bust used + reverted): menu shows 2 doors,
  Free solid / Develop dashed, no price digit; both enter the room; Develop door → room → develop CTA → in-place
  develop still works (shiny, price gone); Diagram|Metrics nav pinned + tabs intact (BR-S071 held); scan-contract 3
  valid / 4 invalid; console clean; halo CSS untouched; no compare ladder; no sparkle/rainbow/shimmer. **One commit,
  NOT pushed (builder review).** **Out of scope (held):** real payment, price figure/model, backend/AI, referral,
  Record/Vault/Profile/social, rarity ladder, new effects, scan-room redesign. **Completed — awaiting builder review.**
- **Scan-room layout + Free/Paid funnel + price — bounded refine (BR-S071)** (2026-06-20, app.js + styles.css):
  the layout build, scoped as a REFINE of the existing 3-panel structure (it already ships), not a rebuild. Forged via
  a short critique/spec workflow (layout architect + material/reduced-motion scout → anti-yippi + scope/price critics
  → bounded spec; verdict: no serious conflict). **Shipped:** (1) **Pinned the Diagram|Metrics nav** — wrapped the
  left panel as `.panel__nav` (pinned) + `.panel__scroll` (the evidence body scrolls), scoped to `.panel--source`
  only (flex column; the shared `.panel` rule still governs the right panel), so Diagram stays reachable on short
  viewports. (2) **Free reads as a complete choice** — retuned the develop CTA line from "the full reading is already
  written… Minting develops it" (implied lack) to "This card is complete as it is. Develop opens its sealed back — the
  same scan, a deeper record, when you want it." (3) **Price at develop-intent** — added a quiet `.unlock__price`
  sub-line inside the Free `.unlock` CTA only ("One-time develop · this scan only · dev mock — no real payment in this
  build"), **no figure** (canon forbids a number now); gated solely by the existing `.readseam[data-open=0]`, so it is
  absent on the card front, the developed state, and any pre-intent gate. (4) **Metrics stays receipts, not a
  dashboard** — added one head caption "why the four stats landed — receipts, not a second score" (the numeric weights
  + "interpretive formula, not a measurement" carve-out already framed it). **Diagram permanent** (DECISION_LOG
  2026-06-20) honored; **halo CSS untouched**; subtractive crown holds; no new animated layer; no sparkle/rainbow/
  shimmer. **Verified live @1600×900** (DOM; cache-bust used + reverted): nav pinned + body scrollable; Diagram default;
  complete-choice copy; price line present Free / gone on develop / not on card front / no digit; Metrics caption +
  receipts intact; develop ceremony re-skins in place; scan-contract 3 valid / 4 invalid; console clean. **One
  commit.** **Deferred + flagged:** the per-source structural shadow (its own card-material micro-task — box-shadow
  fence/redeclare/tween risks make it bloat this layout task; both stress lenses said defer); the **price FIGURE +
  per-card-vs-subscription MODEL** stays an OPEN builder decision (drops into the `.unlock__price` slot trivially).
  **Completed.** **Next up (builder decision):** pick the price figure/model; then the per-source shadow prototype, or
  the menu redesign.
- **C-prep: make the Free surface honest — serial family + band-quantized bars + dev-fixture align** (2026-06-18 /
  BR-S070, data.js + app.js + scan-contract.js): the bounded pre-layout sweep from Scope Skeleton v3 (the slice of
  "B" that must precede the funnel build). **(1) Honest serial:** the dual-serial lie is fixed — the mint serial now
  shares the card's OWN object family (`BR-001-DRV-0001-HM` / `BR-002-ICE-0001-HM`, was the unrelated `BR-SRC01-HM-…`)
  and the Free reserved tease masks the card's own address (`Reserved · BR-001-DRV-0001-··`), so the Plate-01 lineage
  reads as ONE object (Object→Scan→Card `BR-001-DRV-0001`→Mint `…-HM`) and the develop reveal is the same string's
  mint tail. NOT a full serial collapse (Card/Mint stay distinct rungs — that mechanism is still OPEN). **(2)
  Band-quantized bars:** added `bandPct()` (5 discrete widths 14/36/56/76/96 keyed to tierBand) and applied it to all
  public stat bars (card ministat, Frame Impact, Lore, Stat Dossier, Halo Plate-05) so bar LENGTH carries only the
  band, never the raw 0-100; two values in one band render identical. The Metrics-tab `mixRow` numeric diagnostic
  (documented carve-out) is deliberately left raw. **(3) Dev-fixture align:** dropped the stale `rarity` from the
  legacy fixture's `visualImpact.derivedFrom`; LEFT its `freeVisible` on the old four (presence/frame/signal/charge)
  because the `?dev=uploaded-result` legacy renderer hardcodes those — `validFreeSimulationResult` already carries
  `visualImpact` and satisfies the migrated-taxonomy acceptance (verified live: migrating the legacy fixture broke its
  Charge slot, so reverted). **Verified live @1600×900** (DOM; cache-bust used + reverted): Free reserved serial +
  card front share the BR-001-DRV family; all bars ∈ {14/36/56/76/96}%, two Strong stats both 56%; scan-contract 3
  valid OK / 4 invalid rejected; `?dev=uploaded-result` renders Charge 48; console clean; no styles.css change (halo
  CSS untouched); no layout/payment/referral. **One commit.** **Not done (per scope):** full serial collapse;
  rarity→editionLabel key rename; rarity-band system; PERSON_TRUTH/Gate-3 backend; DOSSIER_PACING superseded mark;
  PHOTO_CUE_TAXONOMY.md left untracked (builder commits). **Completed.** **Next up:** the scan-room layout + Free/Paid
  funnel + price BUILD pair (Skeleton v3 piece C) — Diagram stays as the evidence layer (DECISION_LOG 2026-06-18).
- **Card System Fixture Upgrade v1 — migrate Free stats + safety copy** (2026-06-18 / BR-S069, data.js + app.js +
  scan-contract.js): executes the mint/stat mission's buildable chunk (reframed-piece A) — aligns the live fixtures to
  the LOCKED CARD_SYSTEM_V1 §2 taxonomy + folds a bounded safety micro-sweep. **Stat migration:** Free-front four are now
  **Frame Presence / Frame / Signal / Visual Impact** (added `visualImpact` to `card.stats` + a per-source read + statNote;
  free `statsShown` → visualImpact); **Charge → Halo-depth** (off the card front, the Stat Reading, and the Stat Dossier;
  kept in `card.stats` only as the source for the Metrics diagnostic tab — the documented BR-S029 numeric carve-out). Added
  `visualImpact: "Visual Impact"` to STAT_LABELS; dropped `rarity` from visualImpact's `derivedFrom` (the flagged
  rarity-feeds-stat bug). **Micro-sweep (safety copy):** softened the hidden-stat teaser to qualitative-existence only ("A
  sealed reading is held on the back…", no name/count/domain) + masked the free dossier Hidden-Stat **name** ("Gesture
  Geometry"/"Field Silence" → "Sealed reading"); rewrote the roads-not-taken **"In another timeline:"** oracle line →
  neutral class-sibling "Adjacent in the archive —" (both sources); renamed the unsafe dev-fixture stat label **"Braced" →
  "Low Triangle"** (geometry, not a body-tension disposition). **Verified live @1600×900** (DOM/getComputedStyle; cache-bust
  used + reverted): Free card + Stat Reading + Stat Dossier all show the 4 (no Scene Charge on front); Visual Impact
  resolves to a band; hidden name masked; timeline rewritten (paid); deep-link `?t=shiny` boots developed; halo breathing
  confirmed (clock-advanced opacity 0.99 — the auto-clock was preview-frozen); sparkles 0, no rainbow/shimmer; console
  clean; scan-contract validation passes (3 valid fixtures OK, 4 invalid correctly rejected). **Opus safety critic: CLEAN**
  (no person-reading / score / rarity leak; the migration moves toward safety on every changed string). **One commit.**
  **Intentionally NOT done (flagged):** kept the builder-locked **"ARCHIVE EDITION"** flat Free finish label (BR-S060 — a
  product decision, not an ordinal-rarity ladder; no COMMON→MYTHIC exists live to remove); **deferred** the continuous→
  discrete stat-bar fill (`--v:${value}%`) to the scan-room layout/render task (a render-mechanism change across ~6 sites,
  out of a fixture-migration's safe scope; no numbers are printed, so the no-public-0-100 law holds); left the aura chip
  "Auger-Braced" (a re-authorable image-act) + the dev-fixture's legacy `derivedFrom` metadata (the documented keep-legacy
  exception). A stray `docs/PHOTO_CUE_TAXONOMY.md` (a design-workflow side-effect) is left untracked. **Completed.**
  **Next up:** the scan-room layout + Free/Paid funnel + price BUILD pair (the mint mission's piece C) — now that the
  stat/data layer is clean and the paid value model is specced.
- **Halo finish refined — pulsating halo restored + color deepened** (2026-06-18 / BR-S068, styles.css + DECISION_LOG + TASK_QUEUE): builder feedback on BR-S067 — the research's point was "card STRONG WITHOUT the halo," not "remove it." Restored the `.card__halo` pulsating glow (fades in on develop, breathes 5.5s, opacity/transform only, reduced-motion-stilled) as the card's OWN richness (belongs to the card's depth budget; floor/panels still spend zero, FN3 intact). Deepened the developed base to a richer premium navy (more tonal depth). Still OFF: the rotating rainbow conic, sparkles/twinkle, shimmer-sweep (the real "yippi" offenders). **Verified live** (1600×900): halo 0 free → ~0.84 breathing developed (in-place + deep-link); sparkles 0; per-source tint; reduced-motion stills the pulse. **Completed.**
- **Develop Ceremony — develop = an in-place EVENT; subtractive crown; honest reverse; Halo finish → static Night Gloss** (2026-06-18 / BR-S067, app.js + styles.css + DECISION_LOG + TASK_QUEUE): build-first step 3 of the architecture (BR-S063), researched via a **4-workflow arc** (research-scope → Stream A spine rulings → Stream B build spec → finalist; ~40 agents across over-restriction / laundering-trap / kill-advocate / LAYUP-magnetism / code-feasibility lenses). **The develop click now re-skins the PERSISTENT card node in place** (`applyTreatment()`, NOT `render()`) — so the finish tweens and the dossier serial resolves `····→address` as the legible **climax**, instead of `render()` rebuilding the card (which made the finish "appear" = the banned "got brighter"). **Crown-by-subtraction** (builder pick): the card crowns because the room RECEDES (left panel scrim `rgba(4,3,2,0.22)` + deeper floor vignette `0.52→0.64`), never an additive light-pool (honors the LAYUP zero-surround-depth + color-is-currency laws); **deleted a live 5% `--halo` floor-accent leak**. **Honest reverse** — a quiet "Step back" at the Plate-06 back-seam (one door), byte-identical round-trip. **Halo finish re-skinned** — retired the 4 infinite shiny loops (holo-spin/shimmer-sweep/halo-breathe/twinkle) + rainbow rarity → **static Night Gloss wet-glass** (per-source, zero loops at rest); **supersedes the 2026-06-17 "Halo as-is" note** (the loops were the "got brighter" anti-pattern; Night Gloss fits "dark/sleek/minimal" better). **De-smear** — removed live grade-ladder copy ("Into Halo Mint", enumerated "Develops:" inventory, "first print", exact "${N} receipts" counts). OUTPUT-ONLY (no engine/payment/AI/new-state-field/route); one master card re-skinned; reduced-motion-safe (merged snap block); §7/magnetism/mode-not-grade intact. **Verified live** at 1600×900 (DOM/getComputedStyle; temp index.html cache-bust used + reverted): card node + photo img persist across develop; no loops, halo/sparkles opacity 0; dossier ····→assigned; left receded / right exempt; reverse round-trips clean; deep-link `?t=shiny` boots developed; console clean. **Completed.** **Next up:** step 4 — crown-by-demotion polish is folded in; remaining is the menu-fork / Menu v3 (gated) + the deferred paid-space economy research.
- **Rule × Layer Map v1 — un-blur which layer each rule binds** (2026-06-18 / BR-S066, docs only —
  new `docs/governance/RULE_LAYER_MAP_V1.md` + FILE_MAP + DECISION_LOG + TASK_QUEUE): the handoff's START-HERE
  task. Built the rule × layer map that extends the Reading Doctrine's two walls into ONE index: every safety/canon
  rule → the layer(s) it binds (BACK-END / BASELINE / FRONT-FACING / PAINTING-PHRASING) → **OUTPUT-ONLY vs
  BINDS-DEEP** → an honest **CO-EQUAL enforcement column** (a DEEP cell is NOT coverage). Fixes the BLURRED-LINE
  over-restriction (an OUTPUT rule dragged onto the engine to ban legit deep compute) AND the inverse laundering
  (a DEEP rule softened to display — H1). **Flagship resolved as a deliberate 2-row split:** never-RATE-in-output
  (OUTPUT-ONLY) vs Tier-B never-COMPUTE-worth (BINDS-DEEP). The `scan-contract.js` floor → OUTPUT-ONLY (a
  post-inference filter proves nothing about upstream compute); Gate 3 → BINDS-DEEP (harm survives non-display).
  **Forged via a 10-agent workflow** (5 source-readers → over-restriction / laundering-trap / honest-status /
  kill-advocate lenses → synth); 86 rules → 29 deduped rows; line/section citations spot-verified (incl. me reading
  `scan-contract.js` to vouch for the enforced floor: 26 FORBIDDEN_TERMS, 5 PERSON_TRUTH regexes over 2 paths, 4
  safetyFlags). **NO Core Change** — the map changes no LOCKED rule's scope (splits are reconciliations, not
  relaxations); persisted as honest-status **DRAFT** (sibling to READING_DOCTRINE). **Docs only; runtime
  untouched** ⇒ no browser verify. Two `warrant-debt` follow-ups logged (gate-1 / gate-3 duplicate-id reconciliation
  at the source docs). **Builder review folded in (same day):** attractiveness reclassified OUTPUT-ONLY (DECISION_LOG
  2026-06-18 — READING_DOCTRINE Tier B item 2 carved; the LOCKED never-rate-in-output rule unchanged); the Free/paid row
  precised ("genuinely more — deeper/stronger scan or variation", not "the same scan"); the H5 retention row plain-worded.
  **Completed.** **Next up (the key decision):** ratify DRAFT → adopted, or hold; then resume
  the BUILD sequence — step 3, the **Develop Ceremony** (the lane-transform / new-material-opens event).
- **Topbar zone label + treatment toggle retired from customer chrome** (2026-06-18 / BR-S064, index.html +
  styles.css + app.js): build-first steps 1–2 of the architecture (BR-S063). (1) Gated the **Free|Halo treatment
  toggle** (`#treatmentToggle`, the grade-ladder pill) behind `?devnav` via CSS (`.toggle--treatment` display:none;
  shown only under `body[data-devnav="1"]`) — element + its DIRECT click handler kept (removing the node would
  throw at app.js:1778), so devs still switch via the toggle + the `?devnav` rail + F/H/M keys. (2) Replaced the
  static "SCAN ROOM · PROTOTYPE 002" brand sub-label with a live **zone label** off `state.view` (`#zoneLabel`, set
  in `applyView`): "ARCHIVE · SCAN ROOM" (room) / "ARCHIVE · LOBBY" (menu) — realizes the `UNIVERSE_ZONE_MAP` §5
  zone-nav NOW fork + retires the PROTOTYPE label. Menu↔room back loop already existed (index.html:63), kept.
  Forward-develop path (the "Develop this scan" CTA) untouched. **Verified live** (DOM/getComputedStyle via
  dev-live): room shows "ARCHIVE · SCAN ROOM"; toggle display:none for customers, flips visible under `?devnav`;
  source toggle + develop CTA + back button intact; console clean. **Interim gap (intentional, flagged):** a
  developed customer has no VISIBLE reverse-to-front until the Develop Ceremony's "settle back to the front" lands
  (step 3) — reload/F-key reset meanwhile. **Completed.** **Next up:** step 3 — the **Develop Ceremony** (develop
  = an event where NEW MATERIAL opens, keep the LOCKED "Develop this scan" verb), then step 4 (crown-by-demotion
  + de-smear the dossier).
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

- **Developed-reading Phase 1.5 — zone-register LABELS (deferred from BR-S086, gated behind the BR-S086 verify
  checkpoint)** (2026-06-21): add non-`<section>` register labels naming the developed reading's zones (voice /
  evidence / identity / collectible) WITHOUT a 2-col reparent — adopted from the zones idea as register cues only,
  never a layout. Must stay `<div>`/label-level so the `.dplate:nth-of-type` rhythm is untouched. Do NOT add or move a
  `<section>`. Its own task + pre-edit critique.
- **Developed-reading Phase 2 texture (deferred from BR-S086)** (2026-06-21): (a) paid-only `<details>` accordion on
  dossier plate 03 (Stat Dossier) for the evidence/note layer; (b) full 2-col zone layout — needs a class-scoped
  selector rewrite REPLACING `.dplate:nth-of-type` in the SAME commit (nth-of-type counts by element TYPE, so a
  reparent silently breaks the LOUD/quiet rhythm); (c) card-left slab collectibility experiment (kill criterion).
  Each its own task + pre-edit critique.
- **"development pending" copy sweep — RESOLVED for the live reading (BR-S086 amend, 2026-06-21):** the two Evidence
  Board receipt tails + the Hidden Stat seal + the Metrics-tab Fit Matrix line were all rewritten to artifact-subject,
  "pending"-free grammar in the BR-S086 amendment. ONE instance remains, deliberately NOT touched: the Halo Gate
  dev-mock `.gatepanel__pending` "Development pending" (app.js ~1209, route `?dev=halo-gate`) — it sits in the LOCKED
  `renderHaloGateMock` surface and denotes the offline scan ENGINE ("Ready for future scan engine"), not user paywall
  pressure, so it is a different meaning and out of bounds. Revisit only if/when the Halo Gate mock is reworked.
- **Developed reading — Source Record intra-plate density (residue after BR-S086C)** (2026-06-21): BR-S086C broke the
  BETWEEN-plate table-wall (48px gaps + 2 register neighborhoods + cue rename + contrast lifts — candidate C + B-spacing
  DONE). The surviving dense object is WITHIN plate-01 Source Record — a wide multi-column `dl` of small key/value pairs
  that still reads as a spreadsheet (Screenshot-Judge + the panel agree). Candidate D's STRUCTURAL half (intra-plate
  grouping: fewer columns / a gutter splitting it into 2 sub-clusters / sub-headers) was REJECTED this pass (invents a
  visual dialect no other plate uses; ragged on a 1fr 1fr grid). Revisit as its own task IF the builder still feels
  plate-01 fatigue: try a calmer 2-cluster grouping WITHOUT border-dividers. Watch: `d.record.eligibility` reused at
  app.js ~929; keep 7 `section.dplate`; any new label stays `<div>`. Also minor: the `.dossier__register`
  `margin-bottom:-26px` hack depends on the 48px `.dossier__inner` gap (fragile if the gap changes); and the seam above
  the Oracle reads slightly emptier than other gaps — eyeball if touched again.
- **Per-source structural shadow (card-material micro-task, deferred from BR-S071)** (2026-06-20): a tiny STATIC,
  card-only, scan-cued shadow whose weight falls OPPOSITE the key light, derived from `data.js diagram.light.x`
  (SRC-01 x:88 → shadow LEFT · SRC-02 x:10 → shadow RIGHT) — the one real per-source MATERIAL-STRUCTURE gap from the
  technique sweep (SRC-01/02 currently share too much retinted gradient). Deferred because `box-shadow` paints OUTSIDE
  the border box (shares the shiny halo's inset:-40px zone → fence-breach risk on the key-opposite side), is REDECLARED
  per treatment (base/free/shiny styles.css:458/813/1031 → must be threaded into all three or it dies/tweens on
  develop), and `light.x` is a 0-100% frame coord needing a px scaling constant prototyped at 1600×900. Own micro-task:
  re-declare the directional offset inside the free AND shiny box-shadow chains, cap offset ≤3px soft spread, mandatory
  1600×900 check it doesn't fight the halo glow. Static only · no animation · reduced-motion-trivial · inseparability:
  must visibly differentiate the two sources without squinting. Do NOT bundle into a layout task.
- **Price figure + model (OPEN builder decision)** (2026-06-20): BR-S071 shipped the price MOMENT + framing at
  develop-intent with NO figure (canon forbids a number now; `$7` exists only as a backlog narrator note, never in
  DECISION_LOG). Decide the dev-mock FIGURE + the per-card-vs-subscription MODEL (access vs minting are two layers);
  it drops into the `.unlock__price` slot trivially. Relates to the worth-of-the-minted-artifact economy research.

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
- **Architecture / navigation — the coherent picture (BR-S063, 2026-06-18; docs-capture, no code):** the COMMON
  STRING that keeps all planning coherent — *one object, developed; the **serial is its address** (an OBJECT,
  never a person)*: latent→developed is the verb · serial is the address · the Archive is the world ·
  pull-by-giving is why you return. STRUCTURE = **one Archive, one spine, one gate**: Lobby → Scan Room → the
  **Develop Seam** (the SINGLE free/paid gate) → Card Record (by serial); Vault/Codex/Profile are later **views
  over the same card**, not new zones. NAV = flat, felt-not-traversed, anti-sprawl (~5 zones + 1 card + 1 axis);
  the menu↔room back loop ALREADY exists (`index.html:63`) — the real gap is a "you are here" NAME.
  **BUILD-FIRST (live, no engine/decision):** (1) remove the customer Free|Halo treatment toggle (the quality
  ladder; move behind `?devnav`) → (2) ship the `state.view` **zone label** + keep the back loop, paired with the
  floor-wash + provenance verb-thread → (3) **the Develop Ceremony** (replace the toggle-swap with a develop
  EVENT — payoff is NEW MATERIAL opening, not a brighter card; keep the LOCKED "Develop this scan" verb, change
  only what it DOES) → (4) crown-by-demotion (floor wash + radial light-pool — change the page's GRAVITY) +
  de-smear the dossier to ONE threshold. **DECIDE-FIRST (research, not buildable):** the paid access-vs-minting +
  scarcity-as-play line (the worth research; re-opens magnetism #7), and the artifact-centric social spec.
  Everything aspirational stays paper-only-until-built (only `data-view-to` + the `#dossierMount` anchor may exist
  in code today).
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
- **`warrant-debt` capture #2 — Gate-1 / Gate-3 duplicate ids bind at conflicting layers** (BR-S066, 2026-06-18,
  Rule × Layer Map): `[HUMAN_READ_LINE_V1 gate 1/3 vs READING_DOCTRINE gate 1/3]` — the same gate ids carry OPPOSITE
  layer bindings across the two docs. **Gate 1**: `hrl-gate1` = BINDS-DEEP (the cue a read KEYS ON, back-end) vs
  `rd-gate1` = OUTPUT-ONLY (the FORBIDDEN_TERMS lexicon delivery backstop) — split into gate1-CONCEPT vs
  gate1-CODEFLOOR so a consumer can't collapse the deep keying rule into an output word-check. **Gate 3**:
  `hrl-gate3` (DEEP) vs `rd-gate3` (OUTPUT) — merge to DEEP (the fixed-disposition inference survives non-display;
  it is the deepest UN-running seam). The Map already applies both fixes in its own rows; this debt is to reconcile
  the **source docs** (HUMAN_READ_LINE_V1 + READING_DOCTRINE) so the duplicate ids stop colliding. Rides the 4-BR-S
  holding clock; resolve by SHARPEN (edit both source docs) or DECIDE (→ DECISION_LOG). Pointer:
  `docs/governance/RULE_LAYER_MAP_V1.md` §scope-conflicts.
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
  **Architecture brainstorm — the social layer (BR-S063, 2026-06-18):** Profile / Friends / (maybe) Messaging +
  Music are RESERVED but **blocked** — design none into the funnel/nav now. Canon shape: **Profile** = a filtered
  PUBLIC sub-view of your Vault (rows you unseal; NO header-level owner-summary); **Friends** = ONE verb, *visit
  this published shelf* (read another's public cards by serial — never compare / leaderboard / who-has-rarer);
  **Messaging** = highest-risk, **wait / likely-cut** (free text re-imports comparison; if ever, artifact-notes by
  serial only). **BLOCKING — a dedicated artifact-centric SOCIAL SPEC must precede any social build** and answer
  the load-bearing UNKNOWN: serial-keying the *storage* does NOT solve §7's real harm = **viewer-side
  aggregation** ("these are X's pulls" is itself a reconstructable person-trait). Do NOT adopt a "serial-shelf"
  canon line until resolved. **Music:** silence = default; ever-present? = open question, atmosphere-not-feature,
  later (never a shareable/configurable object — that re-opens person-keying).
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
  **Framing RESOLVED (builder, 2026-06-18 — see DECISION_LOG):** Free = a complete light CHOICE (meme/share/try-it-out, the
  result of the free is what you wanted); Paid = earned premium because payment funds real depth (pull-by-value, not a dark
  pattern). Closes the re-opened mode-not-grade knot. The SPECIFIC paid differences ("paint/word it later") stay deferred.
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
