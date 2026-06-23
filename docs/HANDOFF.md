# BLUE ROOM — Session Handoff

For a fresh Claude Code session to resume with zero context loss. **You are the BUILDER** (you hold the repo and
make the changes). The user pastes specs/designs from a separate planning chat. Grounded in the repo — **re-grep
line numbers, they drift** (this session shifted them a lot). Last written: **2026-06-23**, code at HEAD
`55e42dc` (BR-S117), **pushed + live**.

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
**HEAD = origin/main = `55e42dc` (BR-S117) · pushed, in sync.** **LIVE** at
**https://nilsjouna999.github.io/blue-room-scan-room/** (GitHub Pages, `main`/root — **push = deploy**, ~50–80s;
the 5 photos are PUBLIC by owner consent — don't re-gitignore). Plain HTML/CSS/JS, no build, **node NOT installed**.

**Commit arc since the last handoff (oldest→newest):**
- `cf43266` BR-S114 — Metrics 4-plate read + Diagram-notes design folded into the REAL tabs (from the user's two
  "dc" mockup files); dossier restructure (Hidden Stat removed, Fit+Aura→Aura, Archetype stub).
- `23ba04d` BR-S115 — Metrics "register reel" + **Source** tab + photo lightbox + ◆ BLUE ROOM→menu + Finish standalone.
- `28b0267` BR-S116 — reel polish (breathing room + soft LED) + brand-hitbox fix + Finish-top reposition +
  authored Metrics for the other 3 cards + safe cleanup (dead JS/CSS + junk temp files). *(15-agent workflow.)*
- `55e42dc` BR-S117 — **fluid Surface Record** (2 forms to compare) + **combined "Surface"** module. *(4-agent panel.)*

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

**Dossier (card back, 5 plates) — `renderDossier`:** recordGate · **01 Surface Record** (BR-S117: the **fluid
pigment vessel** — the palette as live pigment suspended in developer fluid; `renderSurfaceRecord` + canvas, run by
`mountSurfaceRecords()`; **column** form on Driver/Shore/Tank, **tray** form on Ice Field/Run via `src.surfaceVariant`;
paid only — free keeps the `.cfdeep` teaser) · **02 Archetype** (empty stub) · `THE RECORD` · **03 Aura** (empty
stub) · **04 Mint Record** (struck `.dplate--mint`) · `THE ORACLE` · **05 Oracle Read**.

**Brand:** only `◆ BLUE ROOM` (wrapped in `.brand__hit` with `data-view-to="menu"`) jumps to the menu — the zone
sub-label is inert.

---

## 3 · Open decisions / follow-ups (priority order)
1. **Surface Record FORM — builder to pick: column vs tray.** Both are live (column on Driver/Shore/Tank, tray on
   Ice Field/Run). Compare on the developed dossier; once chosen, set every card's `src.surfaceVariant` to the winner.
2. **Aura plate (dossier 03) content** — currently an empty reserved stub. Design from `docs/BR-AURA-RESEARCH.md`
   (research DONE). The right-panel "Surface" module now carries the material/finish; Aura is parked.
3. **Ice Field Metrics copy** (BR-S116, MY draft — "Plateau" signature etc.) — builder review vs their own words.
   Driver/Shore/Run/Tank metrics: Driver from the user's mockup, the rest authored + opus-safety-passed.
4. **"Surface" label on FREE** — the combined module reads "Surface" in both states now (was "Colour Field" on
   free). Judge said one stable name is better; confirm or branch the moduleHead arg.
5. **Dead-CSS sweep (conservative, deferred):** now-orphaned `.module--finish`/`.finish*`/`.module--cfield`/`.cfbar`
   (container)/`.cfcaption` (BR-S117) + `.diamond`/`.dia-*`/`.impact*` (orphaned when statDiamond/mixRow were
   removed BR-S116) + `.metriccap--foot` (pending a `docs/map/03_SURFACES.md` check). `.cfbar__seg` + `.cfdeep` are
   STILL used — keep.
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
  card{title,archetype,note,...} · markers · diagram · analysis · metrics.signalMix · **`frame`{signature,field,
  event}** [BR-S116/117] · halo{material,a,b,c} · **`surfaceVariant`** "column"|"tray" [BR-S117] · aura · sceneRole
  · dossier{...}) · `S107_SECTIONS` · `S108_EXTRAS` (`colourField` {label,hex,pct,proof} — the Surface palette) ·
  `toScanResultV2`.
- **`app.js`** (re-grep, lines drift): `renderLeftPanel` (Source/Diagram/Metrics switch) · `renderSourceTab` ·
  `renderDiagramTab`+`diagSplit` · `renderMetricsTab`+`metPlate`/`metTier`/`metSmoothPath` · `mountMetricsReel`
  (the reel controller) · `renderReadingPanel` (combined `surfacePlate`) · `renderSurfaceRecord`/`srMakeBlobs`/
  `mountSurfaceRecords` (the fluid Surface Record) · `renderDossier` (5 plates) · `dplate` · event delegation +
  `mountMetricsReel()`/`mountSurfaceRecords()` after each panel/dossier render.
- **`index.html`** — topbar (`.brand__hit`→menu, source toggle, treatment toggle) · room (3 panels) · `#dossierMount`
  · body-level `#lightbox`.
- **`styles.css`** — `:root` warm-sand tokens · `.met-reel*`/`.met-plate*` (reel) · `.dnotes*` (diagram notes) ·
  `.met-*` (metrics plates) · `.module--surface`/`.surface__*` (combined) · `.lightbox*` · `.srcphoto*` · `.dplate*`
  /`.dfaplate`/`.dplate--mint` (dossier) · `.cfdeep`/`.cfbar__seg` (kept). The fluid Surface Record is INLINE-styled
  (no classes — ported from the JSX).
- **Docs:** `TASK_QUEUE.md` (shipped log) · `DECISION_LOG.md` (ratifications) · `BR-AURA-RESEARCH.md` (aura ground)
  · `FILE_MAP.md` (router). The user's source design for BR-S117 was `C:\Users\nilsj\Downloads\SurfaceRecord.jsx`.
