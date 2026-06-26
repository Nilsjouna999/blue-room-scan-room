# BLUE ROOM — Session Handoff

For a fresh Claude Code session to resume with zero context loss. **You are the BUILDER** (you hold the repo and
make the changes). The user pastes specs/designs from a separate planning chat. Grounded in the repo — **re-grep
line numbers, they drift** (every session shifts them a lot). Last written: **2026-06-26**, code at HEAD
`BR-S132` (TIER 4 develop-craft + the arrow nit — **local, NOT pushed**); `e72aa24` (BR-S131 + this handoff) is
the **pushed/live** tip. **The current work is the develop/reveal ADD-ON — see the ★ ACTIVE LANE section below
FIRST.** (The §2 card-front detail underneath it is prior-run context, still accurate.)

---

## 1 · What Blue Room is (the spine — do not violate)
A PC photo→card "scan room". **Core law:** *"Every uploaded photo is already a card; Blue Room develops it."*
The card reads the photo **AS ARTIFACT** (frame / composition / gesture / scene / light / provenance / role).

- **Reads the artifact, never the person.** **Read-boundary (BR-S113, LOCKED):** five absolute no's — never state
  or imply a person's ① worth/character · ② health/body · ③ ranking vs others · ④ identity (job/class/status/
  relationships/story-as-fact) · ⑤ **attributed private feeling/mood**. **One allowance:** *performed gesture-intent*
  — what the action publicly does in-frame ("the palm stops the lens"). Test: the intent the gesture performs
  (allowed) vs a claim about hidden feeling (banned). Governs ALL card copy + metrics + aura. [DECISION_LOG]
- **Free is COMPLETE; Develop/Halo opens the sealed back of the SAME card** — added depth, a mode not a grade.
- **No-magnetism:** no scarcity / streak / countdown / loot-box. Pull is by giving, not pressure. No cheese/"yippi".
- **No engine** (no backend / upload / AI / payment). A user's own photo → LOCAL FRONT CARD only.
- **Diagram is a SILVER instrument; the card alone carries the material** (styles.css law comment). Metrics may use
  the material accent (it's the interpretive read).
- **Hard lines (NEVER override):** child-safety · the person-reading bans · engine-token-leak bans.

Authority: `docs/PROJECT_OS.md` (laws) · `docs/GOVERNANCE_OS.md` · `docs/DECISION_LOG.md` (append-only — check
before contradicting) · `docs/TASK_QUEUE.md` (newest-first shipped log + Ready head) · `docs/FILE_MAP.md` (router).

---

## 2 · Where the build is NOW
**HEAD = origin/main = `816973b` (BR-S131) · pushed, in sync.** **LIVE** at
**https://nilsjouna999.github.io/blue-room-scan-room/** (GitHub Pages, `main`/root — **push = deploy**, ~30–80s;
the 5 photos are PUBLIC by owner consent — don't re-gitignore). Plain HTML/CSS/JS, no build, **node NOT installed**.
**Deploy can HANG occasionally** (once stuck ~10min, no incident) — watch `gh run list`; the fix is an empty
re-trigger commit (`git commit --allow-empty` + push), which supersedes the hung run.

---

## ★ ACTIVE LANE — the develop/reveal ADD-ON (BR-S124 → BR-S131) — **RESUME HERE**

A staged "develop" reveal was added to the project, built as isolated vanilla units in **`/reveal/`** (namespace
`window.BRReveal`), hosted on **dev routes** — the **LIVE menu + room are UNTOUCHED**:
- **`?dev=staged-reveal`** — the standalone full experience (photo→free→read→see-deeper→halo→read).
- **`?dev=menu-reveal`** — the INTEGRATED menu: the **real `.menu__inner` grid** hosts the reveal in the sample-card slot.

**UNITS (`reveal/*.js`, all on `window.BRReveal`):** `stage-controller.js` (the state machine + `mount(root, opts)`;
opts: `embedded` [narrow vertical stack], `menustage` [hosted in the menu grid cell], `bare` [skip the reveal's own
header], `onFullview`/`onBack` [the menu fullview promote/return], `onReading`; **returns `{el, toFree}`**) ·
`card-frame.js` (card layers free/halo/photo + `setMode` + the develop **WIPE** = `.is-developing` clip-path inset
top→bottom + `.rv-scanline` developer bar) · `reading-panel.js` (the scribble read — hand-drawn SVG **SKETCHES**,
stroke-dashoffset draw-on; 4 free / 8 halo modules incl the **comet** [the Frame-Signature metric] + the **source
photo**; `play()`/`clear()`) · `arrow-button.js` (the hand-drawn scribble arrow, silver→purple) · `warning-modal.js`
(the "see deeper" consent gate) · `readings.data.js` (**PLACEHOLDER copy**). `reveal/reveal.css` = ALL reveal styling.
The 6 reveal scripts load in index.html **BEFORE app.js** (so `window.BRReveal` exists at boot).

**DONE (BR-S124 → S131, all pushed + live):** S124 staged reveal (7 units) · S125 hand-drawn "sketchbook" read · S126
polish (arrow dim/hover, read clears on halo, slower pacing, +comet & source modules, bug/a11y fixes) · S127 free→paid
as a slow **develop WIPE** (matte→minted clip-path wipe + developer bar) · S128/S130 menu integration v1/v2
(superseded) · S129 the cinematic **card-slide-LEFT + read-scribbles-RIGHT** · **S131 the menu add-on REBUILT on the
real menu grid** (Tiers 1–3 of the 23-agent audit plan): start frame == the original **by construction**, ONE base,
doors structurally immovable; free read fits **RIGHT** (doors stay); "see deeper" → **fullview** takeover (chrome steps
aside) + **← Back to the menu** · **S132 (LOCAL — NOT pushed) = TIER 4 develop-craft** (photo→free 3-beat develop ·
card→halo tonal-rise + fix-bloom + wet-meniscus · `--rv-ease-soft` · robustness clip fix) **+ the arrow → right-of-card,
caption dropped** (the builder's pick; in a read-side lane so it never overlaps a module).

**THE BUILD SPEC for the remaining work** (a 23-agent `menu-addon-polish-audit` Workflow result) is at the task output
`…\tasks\wsc60yo20.output` — **read it first**. Tiers 1–4 DONE (S131 = 1–3, **S132 = TIER 4**); **Tiers 5–7 REMAIN:**
- **TIER 4 — craft — ✅ DONE (BR-S132):** photo→free is now a 3-beat "Print Rising from the Bath" develop (clip
  bloom + exposure fix + sinking bath; standalone route only); card→halo got a tonal-rise filter + a halo-fix bloom
  (::after) + a wet-meniscus scanline (NOT a layer mask — the critic killed that: it froze blank + killed the glow
  clip). New `--rv-ease-soft` token. Robustness wipe-clip `→ inset(-60px -60px calc(100% + 60px) -60px)` applied.
- **TIER 5 — scribble MINIMAL polish** (builder LIKES it — minimal only): draw easing → `cubic-bezier(.25,.46,.45,.94)`;
  count-scaled stagger (460ms free / 360ms halo via a `--rv-stagger` token keyed off `.rv-read[data-engine="halo"]`);
  a 3px `rv-settle` for pips/peak; let the flourish draw; `.rv-cap__em` 18→17px.
- **TIER 6 — ROBUSTNESS (the image AND stats MAY CHANGE):** thread `src` into the panel —
  `panel = R.ReadingPanel({ reading, src })` (it currently never gets `src` → hardcoded to SRC-01). Replace every
  SRC-01 literal with `src.*`: photo `src.file`, pips `Math.round(src.card.stats[k]/20)`, serial `src.card.serial`,
  oracle `src.dossier.oracle.short`, **comet polygon GENERATED from `src.frame.signature.radii`** (9 radii @ 40°),
  thumbnail `aspect-ratio: var(--photo-ratio)`.
- **TIER 7 — a11y + edge cases:** aria-live on `.rv-readslot`; focus through develop/fullview/back; **Esc** on the back
  button; reduced-motion paths for the new steps; (`haloTimer` rapid-tap guard already done).
- Apply the spec's **MOTION-LANGUAGE** table (two easings: `--rv-ease` + a NEW `--rv-ease-soft` for the wipe/scanline)
  + the **ROBUSTNESS rules** (every magic number → a function of content) consistently.

**✅ ARROW NOTE — RESOLVED (BR-S132).** The builder chose **"right of the card, points into the read"** (caption
dropped). On the menu the arrow now rides `.rv-stagemain` at `left:100%; top:50%` (card's right edge, vertically
centred), `.rv-arrow__cap` is `display:none` in menustage, and `.reveal-stage--menustage.is-reading .rv-read` has
`padding-left:52px` so the arrow nestles in a left lane instead of landing on a read module. *(Standalone
`?dev=staged-reveal` keeps its base arrow placement — right of card, `translateY(78px)`, caption shown; left as-is
since the pain point was the menu. Mirror it onto standalone if wanted — a one-liner.)*

**HOW TO RUN THE REMAINING WORK (builder's explicit ask):** use a **~20-agent + 3-haiku** read-only audit/design
**Workflow per tier** (the `menu-addon-polish-audit` pattern) throughout — agents AUDIT + author proposals, the
orchestrator implements + verifies + commits in the **main loop** (the read-only-agent law; never let an agent commit).
Verify each step by **headless Chrome → Read the PNG** @1600×900 (`preview_screenshot` is BROKEN). The `?rv=` deep-link
auto-drives, but **menustage starts at FREE**, so `?rv=free` = the in-menu free read · `?rv=developed` = the fullview
halo; use a **~13–26k `--virtual-time-budget`** (NOT huge — over-long budgets stall the auto-drive).

**KEY GOTCHAS (menu host):** the `.menu` class is `display:none` in dev view (`styles.css:2737`) → the menu-reveal
route hosts the real `.menu__inner` grid on a **NON-gated `.menurev` wrapper** (which replicates `.menu`). The reveal
paints **NO background** in menustage (the body gradient is the ONE base — fixes the old 2-base-colour bug). The card
is `430px × zoom 0.92` (== the original `.msample__card`). The slide distance is `translateX(calc((--rv-read-w +
--rv-slide-gap)/2))` at rest → `0` on `.is-reading` (NOT a magic px). Two `.menu__head`/`.menu__doors` exist in the DOM
(the hidden `#menuView` + the `.menurev` one) — scope DOM measurements to `.menurev`.

**PRIOR-RUN commit arc (the CARD-FRONT overhaul + polish — context, NOT the active lane; the active lane is the
reveal add-on above):**
- `d7e3f6a` BR-S118 — Surface Record LOCKED to the horizontal **tray** form (every card; column retired) + Metrics
  reel clipping fix (inherited `gap:16px` desynced the translate) + sleeker "Diagnostic Receipts" head + left type tune.
- `72495f4` BR-S119 — **NEW CARD FRONT ported** from the builder's `ScanCardFront.jsx`: the **"Frame Reading"
  pip-ledger** replaces the old stat bars + a sealed caramel finish; ORIGINAL halo kept; held to the existing
  ~777px footprint (photo `--photo-ratio` 4/3.5→**4/3** to fit the taller ledger). *(3-lens read-only panel.)*
- `7632296` BR-S120 — mockup pips (position-based: 4th purple / 5th gold + glow) + a clickable **QR pop-out seat**.
- `71dd668` BR-S121 — Frame Reading AUDIT refine: 3-step brass value-ramp + **faceted-gem pips** + tier-word ramp +
  re-CENTRED ledger (`116px 72px 1fr` in a `max-width:300px` band — killed the right-clustering). *(3-lens audit.)*
- `db08313` BR-S122 — de-bulk tier words (**IBM Plex Mono only loads 400/500** — 600/700 were faux-bolded) +
  barcode-IS-the-QR-trigger + brighter Signal Note (--muted→--silver).
- `55e73cb` BR-S123 — **Mint Record showcase** from the card (link → real `.dplate--mint` fixed mid-screen over a
  blurred page scrim; dismiss→top; minted-only; QR↔Mint exclusive) + QR dismiss exit anim + barcode hover glow +
  Surface % → elegant Cormorant + Signal-Note box dropped + signature moved under the note. *(3-lens panel.)*

**Left panel = THREE tabs now: Source · Diagram · Metrics** (data-tab; the tabbar pins, the body scrolls):
- **Source** — the original photo, whole + clean (no overlays). Click → a centred **lightbox** (X / backdrop /
  Esc closes; body-level `#lightbox` in index.html). `renderSourceTab`.
- **Diagram** — the **silver-instrument** figure that was always there (overlays: grid/mass/focal/gesture/axis/
  arrow/light + labels + SCAN SHEET corner + capture strip). **Always annotated** (the Clean toggle was removed;
  the clean view is now the Source tab). Below: the **Diagram Notes** two-block design — **Frame Read** (`analysis`,
  DERIVED, dotted leaders) + **Overlay Markings** (`diagram.notes`, ◇ ON SHEET). `renderDiagramTab` + `diagSplit`.
- **Metrics** — a **REGISTER REEL**: a fixed "Diagnostic Receipts" mast + a window that CLIPS while a transform
  track translateY's **ONE plate at a time** (Frame Signature silhouette-not-score · Signal Mix proportion-of-a-
  whole · Composition Field drift node + tier bands · Frame Event act + tier bands). Advance by wheel (one gesture
  = one step; scrolls within a tall plate first) / ◤◢ arrows / 4 ticks / `NN / 04` counter. Off-centre dim; a
  source-coloured landing glint; hover-deepen; reduced-motion = instant swap. **All 5 cards have a hand-authored
  `frame` block** in data.js (signature radii/class/note/band, field node/weight/balance, tier words, event).
  `renderMetricsTab` + `metPlate`/`metTier`/`metSmoothPath` + `mountMetricsReel`.

**Right reading panel (`renderReadingPanel`):** header · **combined "Surface" module** (BR-S117: Finish + Colour
Field fused — the colour-field proportion bar is the hero, the material chip caps its left, name + character note
on one foot line; free = bar + teaser, no material; paid = chip + bar + foot) · Scene Role · seam(Technical
Receipts). `.module--surface` / `.surface__*`.

**THE CARD FRONT (`renderCard`, the crown — fully rebuilt BR-S119–S123 from the builder's `ScanCardFront.jsx`):**
head (◆ BLUE ROOM ARCHIVE / rarity) · `.photo` (4/3) · `.titleblock` (title · ◆-flanked archetype · **`.verdict`
Signal Note** = the card's VOICE, bright-silver italic, NO box · **`.signature`** stacked directly under it — the
two italic-serif lines are one stanza) · **`.framereading`** the developed mint LEDGER (`.fr__row` = NAME · 5
rotate-45 diamond **pips** · tier WORD; centred `116px 72px 1fr` in a `max-width:300px` band; driven by the SAME
`tierBand()` as Metrics — never 0-100). **Pips (shiny):** positions 1-3 climb a brass value-ramp `--fr-1/2/3`
(`.fr__pip--p1/2/3`, off the material so teal can't dull it), 4th purple `.fr__pip--p4` + 5th gold `.fr__pip--p5`,
all **faceted** (135° gradient) with a glow hierarchy; tier WORD echoes the ramp via `--fr-tier` (`.fr__tier--<band>`,
all 5 emitted). **FREE flattens everything to matte silver** (the free gate). · `.mintstrip` (state · serial ·
`.mintstrip__right` = **"Mint Record" link `.mintlink`** + **barcode `<button>`**). **Two card pop-outs**
(mirrors the lightbox pattern; scoped to `#stageZone .card`; minted-only; mutually exclusive; force-closed in
`render()`/`applyTreatment()`; reduced-motion-safe): (1) **QR seat `.cardqr`** — the barcode pops a placeholder
QR centred, the card front blurs to its own base colour; `.is-qr-open`/`.is-qr-closing` (exit anim). (2) **Mint
showcase** — the `.mintlink` lifts the REAL dossier `.dplate--mint` to `position:fixed` mid-screen over the
body-level **`.mintscrim` (`#mintScrim`, backdrop blur)**; dismiss→smooth-scroll to top; `body.is-mint-showcase`.

**Dossier (card back, 5 plates) — `renderDossier`:** recordGate · **01 Surface Record** (BR-S117, **LOCKED to the
horizontal `tray` bath** BR-S118 — the palette as live pigment in developer fluid; `renderSurfaceRecord` + canvas,
run by `mountSurfaceRecords()`; paid only — free keeps the `.cfdeep` teaser; per-swatch **% is now Cormorant 15px**)
· **02 Archetype** (empty stub) · `THE RECORD` · **03 Aura** (empty stub) · **04 Mint Record** (`.dplate--mint` —
also the target of the card's Mint showcase) · `THE ORACLE` · **05 Oracle Read**.

**Brand:** only `◆ BLUE ROOM` (wrapped in `.brand__hit` with `data-view-to="menu"`) jumps to the menu — the zone
sub-label is inert.

---

## 3 · Open decisions / follow-ups (priority order)
1. **Card-front micro-options the builder flagged as easy one-liners (NOT done):** the QR pop-out + Mint showcase
   are minted-only (ghosted on free — could enable on free); the shiny pip base carries a faint material breath
   (could go flat brass). Optional Signal-Note copy nudge: the note's 1st sentence re-states the archetype's
   subject; the 2nd clause is the real voice — a future copy pass could trim the literal opener (data.js note fields).
2. **Aura plate (dossier 03) content** — empty reserved stub. Design from `docs/BR-AURA-RESEARCH.md` (research DONE).
3. **Ice Field Metrics copy** (BR-S116, MY draft — "Plateau" signature etc.) — builder review vs their own words.
4. **Dead-CSS sweep (a spawned-task CHIP exists for this):** confirmed-dead reading-panel orphans `.cfkey`/
   `.cfcaption`/`.module--cfield`(+`.cfbar` container)/`.module--finish`+`.finish*`/`.dsource2*` — grep-confirmed,
   the styles.css ~1426 comment flags them "follow-up sweep". KEEP `.cfbar__seg` (shared by `.surface__bar`),
   `.cfdeep*`, `.surface__*`, `.metriccap`. (BR-S118 already removed `.met-foot`; BR-S119 removed `.ministat*`.)
6. **Image optimization** — `source-02..05.jpg` are ~11 MB 4000px JPEGs shown ≤1472px; re-save ~2000px@90% on
   COPIES (irreversible lossy) with the originals safe in git. Flagged, not done — needs the builder's go.
7. **Older standing threads:** readiness gate (feed strong+flat photos, confirm the stats grade both ways) → grade
   visual (into the reserved developed-rail zone) → Set Wall → mobile fallback.

---

## 4 · How this project works (operating rules)
- **Execute → report → HOLD by default**, BUT this user often says **"push it, i want live"** — then commit to
  `main` + push (= deploy) in the same turn. One coherent task per session; **mandatory pre-edit critique** (push
  back when the premise is off). End multi-step work with a session-end report: commit hash · changed files ·
  verification · flags · rollback (`git revert <hash>`).
- **Reporting style = "Build Narrator"** output style: one status-marker headline (`●`/`✓`/`■`) · one aside · one
  compact table · the dense full report kept COLLAPSED + copy-ready (a fenced block in `<details>`), never inlined.
  Translate (what the code is FOR), don't transcribe.
- **Agents:** the user asks for them explicitly and sometimes by exact count ("8 haiku, 5 sonnet, 2 opus"). Use a
  **Workflow** (scout → build/author → opus-verify). **Panels MUST be READ-ONLY** — agents return findings/authored
  data/CSS; YOU apply + verify + commit in the main loop (a past agent committed mid-run — never again). Wire the
  safety floor + a conservative opus gate into any authoring.
- **Decisions:** surface the ONE key decision per turn with a recommendation; fold the rest. Use AskUserQuestion
  only for genuine forks. The user dislikes back-and-forth — investigate first, then ask sharply.

---

## 5 · Build gotchas (learned this session — load-bearing)
- **getComputedStyle LIES about composited transitions here** — it returns the START value of a running opacity/
  transform transition (read 0.35 / 0 while the screen showed 1). HUGE time-sink. **Verify renders by SCREENSHOT +
  `document.elementFromPoint` hit-testing**, not getComputedStyle of opacity/transform. (To test a static rule,
  set `transition:none` first.)
- **Preview viewport is often DEGENERATE** (`window.innerHeight` reported as **13px**) → vh layout + flex heights
  go wild. **`preview_resize` to 1600×900 BEFORE judging any layout.**
- **Headless Chrome localhost access is INTERMITTENT** (sometimes a DNS/connection error page). Retry; `curl`
  always works for content checks. Use **Chrome** (`C:\Program Files\Google\Chrome\Application\chrome.exe`), old
  `--headless`, isolated `--user-data-dir`, output to `$env:TEMP` (per the `verify-blue-room-in-browser` memory).
- **The Metrics reel = TRANSFORM TRACK, not native scroll.** A nested-flex `overflow-y:auto` **will not paginate**
  here (it grew to content / wouldn't scroll). The window clips (`overflow:hidden`); `.met-plates` is the track
  (`translateY(-i*slotH)`); slot height read ONCE in `setActive` (plate-height + transform use the same value);
  re-sync on **`window.resize` + `document.fonts.ready`**, **NOT a ResizeObserver on the window** (it loops →
  perpetual transition restart). `.is-centred` opacity:1 is real (the 0.35 reads were the quirk above).
- **PowerShell `>` is REDIRECTION, not comparison** — `$x.Count>0` writes a file named `0`. Use `-gt`/`-eq`. (A
  stray `0` file got created + deleted this way.) Also `2>&1` on native exe wraps stderr as errors — don't.
- **Canvas (`mountSurfaceRecords`)**: rAF per `[data-surface-canvas]`, swatches passed via `esc(JSON.stringify(...))`
  data-attr, re-mounted after each dossier render (rafs cancelled on re-mount), reduced-motion = one frame then stop.
- **IBM Plex Mono only LOADS 400 + 500** (index.html) — `font-weight:600/700` on a mono span gets FAUX-BOLDED
  (thick/ugly; this was the "bulky CHARGED"). Cormorant loads 500/600/700 ital. Use real loaded weights; carry
  emphasis with colour/size, not an unloaded weight.
- **The preview tab's animation TIMELINE pauses** (driven headless) — a CSS `@keyframes` reads `playState:"running"`
  but `currentTime` stuck at 0 (frozen at the `from` frame). So an entrance keyframe that starts `opacity:0` leaves
  the element INVISIBLE in that state. Fix pattern: **don't gate visibility on the entrance animation** — keep the
  element opaque and animate SCALE only (the Mint showcase + a scrim fade do this). Real (visible) tabs run it fine;
  the freeze is a test artifact, but the scale-only form is the robust ship. Verify open-states by a **temp
  auto-open hook + headless capture** (`--virtual-time-budget` DOES advance animations), then REVERT the hook.
- **Card pop-out pattern (QR seat + Mint showcase)** — both mirror the lightbox: a delegated `document` click on
  `[data-*]` scoped to `#stageZone .card` (so menu/proto/dev reuses stay inert), outside-click + Esc close with
  listeners attached on `setTimeout(0)` (so the opening click can't self-close) and torn down on close, force-closed
  in `render()`/`applyTreatment()` (those rebuild #stageZone/#dossierMount). Keep them **mutually exclusive** (each
  open closes the other). The Mint showcase lifts the REAL `.dplate--mint` via `position:fixed` (z 901) over a
  body-level `.mintscrim` (z 900, `backdrop-filter:blur`) — NO clone. `position:fixed` centres in the visible
  viewport (minus the page scrollbar, ~8px), so a tiny X offset is expected, not a bug.
- **Preview server DROPS** between turns — just `preview_start "scanroom"` again. Bust cache:
  `await Promise.all(['app.js','styles.css','data.js','index.html'].map(f=>fetch(f,{cache:'reload'})))` THEN navigate.
- **Commits:** Bash heredoc `git commit -F -` (PowerShell here-strings break on `->`/quotes). End with the
  `Co-Authored-By: Claude Opus 4.8` trailer. LF→CRLF warnings are benign. Stage ONLY intended files (leave the
  untracked `.claude/`, `dev-live.html`, the two untracked `docs/*.md`).
- **Deep links:** `?src=1..5&t=free|shiny|mint&tab=source|diagram|metrics` (src 1-indexed: 1 Driver · 2 Ice Field ·
  3 Shore · 4 Run · 5 Tank). `?mode=` is gone (Diagram has no Clean toggle).
- **Deploy poll:** after push, `curl` the live `app.js` for a new marker until it appears (~50–80s), or
  `gh api repos/Nilsjouna999/blue-room-scan-room/commits/main`.

---

## 6 · Key files
- **`data.js`** — `SOURCES[0..4]` (ids: driver-salute · ice-auger · shore-catch · loose-run · tank-pick; each:
  card{title,archetype,note,signature,serial,stats,...} · markers · diagram · analysis · metrics.signalMix ·
  **`frame`{signature,field,event}** [BR-S116/117] · halo{material,a,b,c} · aura · sceneRole · dossier{...})
  *(`surfaceVariant` REMOVED BR-S118 — Surface Record is locked tray)* · `S107_SECTIONS` · `S108_EXTRAS`
  (`colourField` {label,hex,pct,proof} — the Surface palette) · `toScanResultV2`. Public stats render as tier
  WORDS only via `tierBand()` (`BAND_PCT`/`bandPct`/`miniStat` were removed BR-S119 — no 0-100 ever).
- **`app.js`** (re-grep, lines drift): **`renderCard`** (the crown — head/photo/titleblock+verdict+signature/
  `.framereading` pip-ledger/mintstrip + the `.cardqr` + Mint-link markup) · `patchCardFront` (in-place treatment
  re-skin; syncs barcode + mintlink ghost) · `applyTreatment`/`render` (both force-close the pop-outs) ·
  `closeCardQR`/`onQROutside`/`onQREsc` + the `[data-card-qr]` open handler · **`closeMintShowcase`/`onMintOutside`/
  `onMintEsc` + the `[data-mint-showcase]` open handler** · `renderLeftPanel` (Source/Diagram/Metrics) ·
  `renderMetricsTab`+`mountMetricsReel` (reel) · `renderReadingPanel` · `renderSurfaceRecord`/`srMakeBlobs`/
  `mountSurfaceRecords` (fluid Surface Record, tray-only) · `renderDossier`/`dplate`.
- **`index.html`** — topbar · room (3 panels) · `#dossierMount` · body-level **`#mintScrim`** (Mint showcase blur) ·
  body-level `#lightbox`.
- **`styles.css`** — `:root` warm-sand tokens · **`.framereading`/`.fr__row`/`.fr__pip`(`--p1..p5`)/`.fr__tier`
  (`--<band>`)** (the pip-ledger) · **`.verdict`** (Signal Note, boxless) · `.signature` · **`.cardqr*`**
  (`.is-qr-open`/`.is-qr-closing`) + **`.mintscrim`/`body.is-mint-showcase .dplate--mint`** (Mint showcase) ·
  `.mintstrip__right`/`.mintlink`/`.barcode` (the two triggers) · `.met-reel*`/`.met-plate*` (reel) · `.dnotes*` ·
  `.module--surface`/`.surface__*` · `.lightbox*` · `.dplate*`/`.dplate--mint` · `.cfdeep`/`.cfbar__seg` (kept).
  The fluid Surface Record (`renderSurfaceRecord`) is INLINE-styled (ported from the JSX).
- **Docs:** `TASK_QUEUE.md` (shipped log) · `DECISION_LOG.md` (ratifications) · `BR-AURA-RESEARCH.md` (aura ground)
  · `FILE_MAP.md` (router). Builder source designs (React, pasted from the planning chat): the card front =
  `C:\Users\nilsj\Downloads\ScanCardFront.jsx` (BR-S119); the Surface Record = `…\Downloads\SurfaceRecord.jsx` (BR-S117).
