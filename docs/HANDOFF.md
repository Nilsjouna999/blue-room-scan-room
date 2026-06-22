# BLUE ROOM — Session Handoff

For a fresh Claude Code session to resume with zero context loss. **You are the BUILDER** (you hold the repo
and make changes). A separate planning-Claude (chat) writes specs/prompts the user pastes here. Grounded in
the repo — verify line numbers by re-grepping (they drift). Last written: 2026-06-22, at HEAD `ddf6c4d`.

---

## 1 · What Blue Room is (the spine — do not violate)
A PC photo→card "scan room". **Core law:** *"Every uploaded photo is already a card; Blue Room develops it."*
The card reads the photo **AS ARTIFACT** (frame / composition / gesture / scene / light / provenance / role).

- **Reads the artifact, never the person.** NEVER face / attractiveness / personality / worth / identity /
  body / gender / race / age. Read the **IMAGE-ACT** (the performed, re-authorable: posture / gesture / role),
  never the **PERMANENT** (worth / identity). [`docs/HUMAN_READ_LINE_V1.md`]
- **Free is COMPLETE; Develop/Halo opens the sealed back of the SAME card** — a deeper record, never a better
  score. (Dependency / Continuity / Consistency — `docs/BLUE_ROOM_MASTER_SPINE.md`.)
- **No-magnetism:** no scarcity / streak / countdown / loot-box / compulsion. Pull is by giving, not pressure.
- **No engine** exists (no backend / upload / AI / payment). A user's own photo → LOCAL FRONT CARD only.
- **Banned visible copy:** locked / unlock / premium / upgrade / paywall / pending / rarity-ladder / worth /
  rank / pre-unlock-counts; person-grammar ("you/your", "he/she" as the subject).
- **Hard line (NEVER override):** child-safety, person-reading bans, engine-token-leak bans. If a spec ever
  collides with these, it's a spec bug to fix, not a rule to override.

Authority order: `docs/PROJECT_OS.md` (laws) · `docs/GOVERNANCE_OS.md` · `docs/DECISION_LOG.md` (append-only
ratifications; check before contradicting) · `docs/FILE_MAP.md` (router — **read first**).

---

## 2 · Where the build is NOW
**HEAD = `ddf6c4d` · origin/main = `ddf6c4d` · PUSHED, 0 ahead / 0 behind.** Plain HTML/CSS/JS, no build,
node NOT installed. Untracked + ignored (leave): `.claude/`, `dev-live.html`, `docs/PHOTO_CUE_TAXONOMY.md`,
`docs/READING_ZONE_INVENTORY_V1.md`. Personal photos gitignored (`assets/source-0X.jpg`).

**Commit arc (origin/main, oldest→newest):**
- `2817df7` BR-S104 live-card audit (doc) · `d50ad3f` BR-RESEARCH-01 craft bank (doc) · `8c5c4e8` BR-S106
  prototype originals backup (doc) · `60e648e` BR-S106 front-notes(5) + P0 leak strip (runtime)
- `cbc4bc7` BR-S107 spec PROPOSED · `06b30b3` BR-S107 spec v2 approved · `0596462` BR-S107 architecture
  rebuild (runtime) · `3bb83c4` BR-S107.1 loop fixes (runtime)
- `2c1b75e` BR-S108 fleet audit menu (doc) · `45f9e21` BR-S108.1 Proportion Strip + Run cluster (runtime) ·
  `ac0a01a` BR-S108.2 Colour Field polish + finish + rules folded (runtime+docs) · `ddf6c4d` BR-S108.3 page
  tuning (runtime)

**Page architecture (the BR-S107 fuel-split — BUILT; spec `docs/BR-S107_SECTION_ARCHITECTURE_SPEC.md` v2):**
Five lenses — **A** optics/geometry · **B** gesture/subject · **C** light/colour/surface · **D**
scene/provenance · **E** essence. Each section: **one fuel · one job · one voice · one form.**
Geometry-as-prose lives ONLY in Diagram + Metrics; nowhere else.

**Sections in render order:**
- FRONT (the card + right "Scan Reading" rail): the **Card** (photo · title · archetype tag · **Signal
  Note**·B) · **4 face-stats** on the card (Frame Presence·A / Signal·B / Visual Impact·C / **Scene
  Charge**·D-E — tier bands + a bar, **never a 0-100 number**) · **Diagram + Metrics** (A, left toggle) ·
  **Colour Field** (C — a thin proportion BAR + a minimal key, owns the **measurement** %) · **Scene Role** (D).
- BACK dossier (after the BR-S108.3 re-order): **01 Surface Record** (C — the **annotated palette**: chip +
  named surface + what it is, **NO %**) · **02 Hidden Stat** (B — sealed, free tap-to-develop) · `— THE
  RECORD —` · **03 Source Record** (D — provenance 2-line + filing-event chain + serial lineage) · **04 Fit +
  Aura** (E — badges; **the weak section, redesign next**) · **05 Mint Record** (F — stamped certificate w/ a
  "◆ Filed & sealed · Blue Room Archive ◆" seal) · `— THE ORACLE —` · **06 Oracle** (E — the verdict, sealed,
  centred; the destination). Technical Receipts = a collapsed appendix.
- **State difference:** free shows develop-teasers (Develop CTA + locked previews) + the free-is-complete
  tagline; developed REPLACES them with a **Finish plate** (the material, e.g. "Field Green Glass", as a thin
  material-coloured chip + name) so develop **gains, not deflates**. The rest of the developed rail is
  **parity-not-surplus by design** — RESERVED in code for the grade visual (do NOT fill it with throwaway).
- Colour Field ↔ Surface Record are now **distinct**: one **measures** (the bar + %), one **describes** (the
  annotated palette). The duplicate was killed in BR-S108.3.

**Mintable status (red-team verdicts):** **Driver** ("Checkpoint Wave") and **Run** ("Closing Distance") both
cleared to **"mint: yes"** (BR-S108.1/.2 re-audits). **Ice Field / Shore / Tank** read well (they were the
"clears the bar" cards in the fleet) but have NOT been individually red-teamed to "yes" — bringing them up is
a deferred recipe pass (same moves as Driver/Run). The one section still underperforming on the mintable
cards is **Fit + Aura** (see §4).

---

## 3 · Locked rules / decisions (don't re-litigate or violate)
From `docs/DECISION_LOG.md` (newest entries) + `docs/PROJECT_OS.md`:
- **Honesty contract + grade spec (LOCKED in principle; DECISION_LOG 2026-06-22):** grade = the **CHARGE the
  photo offered**, read honestly — never worth / "good photo" / the person. Shared-responsibility contract
  (the user brings a moment; the room's duty is to never miss the ones that count; honesty both ways).
  **P1** grade = photo charge; read-completeness is the room's CONSTANT DUTY, never a grade input · **P2**
  charge ≠ quality ≠ worth · **P3** common is complete, rare has MORE · **P4** stated in the receipt, never
  chased · **P5** reads the frame, never the person/story. **Three orthogonal axes:** finish family · 1%
  anomaly · grade. **HELD OPEN until the readiness gate:** thresholds, tier count/names, visual tiers, the
  grade's free-vs-developed boundary.
- **Score-vs-measurement law (refined BR-S108.2; PROJECT_OS §7/§9 + DECISION_LOG):** the ban is on public
  **0-100 SCORES** (they RANK the photo/person — banned; stats show as tier bands only). **Measurement
  proportions** (pixel/colour composition, counts — e.g. the Colour Field "61%") **ARE permitted** as scan
  readings — they DESCRIBE the artifact, never rank it.
- **Front-note voice (BR-S106 + `docs/BR-CRAFT-INSIGHT-BANK.md`):** name the photo's real SUBJECT first · land
  ONE turn on a physical in-frame thing · POINT don't pronounce (withhold the verdict) · end on the object ·
  survive the **swap test** (kill any line true of a different photo). Per-surface register profile: Front
  note/Signal Note = greet/withhold · Oracle = land/pronounce · Surface Record/dossier = explain/concrete ·
  Hidden Stat = reveal.
- **Core-Change overrides already ratified:** the **7-plate dossier → 6** (Stat Dossier killed, Evidence Board
  → Surface Record); **`charge` promoted to a free front stat** ("Scene Charge", reversing the 2026-06-13
  Halo-only decision). Both logged in DECISION_LOG. "The Man Let It Go" (Run Hidden Stat) is a conscious keep
  (image-act read, law-compliant).

---

## 4 · Open threads (priority order)
**Page completion comes FIRST** (user's stated priority): the page must be complete and the user happy with it
**before** the grade visual, Set Wall, or any mint. "Complete" = design-done, distinct from "pushed".

1. **Fit + Aura — character redesign (THE next pass; real design, not tuning).** Diagnosis: the section's job
   is the card's **CHARACTER** (its archetype/identity), but badges + a placement line read as **FILING** (tags,
   a second Source Record). Constraint: it **can't be more prose** (steals the Oracle's verdict job) and
   **can't be flat tags** (that's filing). A crest is not a tag cloud. **Explore 2-3 genuinely different FORMS
   for "this card's identity, stamped"** — a crest, a classification seal, a stamped archetype mark, something
   with WEIGHT — and let the user **react by eye BEFORE building**. Present a small menu, not one edit. (Lens
   E as PLACEMENT — family / kind / aura — must NOT become a verdict.) Render: `app.js` renderDossier `fitAura`
   plate (~04); data: `data.js` `S107_SECTIONS[id].fitAura {family, chips, placement}`.
2. **The other 3 cards (Ice Field / Shore / Tank) to mintable** — same moves as Driver/Run (re-archetype off
   collisions, podium stats, a Hidden Stat that hides something, the Colour Field). Now a recipe.
3. **The readiness gate** — feed ~10 strong + ~10 flat photos and confirm the 4 stats grade both directions
   honestly (strong reads high-charge, flat reads low). Gates the grade calibration.
4. **The grade VISUAL** — builds into the RESERVED developed-rail zone, post-gate (calibrate thresholds/tiers
   then).
5. **The Set Wall** — a collection doorway (5 faces + a cross-card proportion read); its own pass.
6. **Polish:** the 2 minor prose/row rhymes (Source 2-line ≈ Hidden Stat prose; Mint rows ≈ Surface rows).

(Full ranked menu: `docs/BR-S108_FLEET_AUDIT.md` — its 7 fixes are DONE; ideas + the above are what's left.)

---

## 5 · How this project works (operating rules)
- **The user reviews and approves.** Build under **execute → report → HOLD**. **Nothing pushes** until the
  user literally directs it ("push it" / "push the stack"). Commit to `main`; one coherent task per session;
  mandatory pre-edit critique (push back when the premise is off). End multi-step work with the session-end
  report (critique verdict · commit hash · changed files · verification · next · rollback · push status).
- **Flag rule-conflicts, don't silently override.** When a spec collides with a standing rule: build the
  intent, then report the conflict (rule · our spec · what I did · my read), and HOLD. The hard line (§1) is
  never overridden — comply + flag as a spec bug.
- **Planner vs builder:** a separate planning-Claude (chat) authors specs/prompts; the user pastes them here;
  **you (this Claude Code) hold the repo and build.** This handoff's reader is the builder.
- **Build gotchas (learned, load-bearing):**
  - *Edit matcher:* the `·` (U+00B7 middle dot), en-dash `–`, and nbsp BREAK the Edit tool's exact match.
    Anchor `old_string` on ASCII substrings that AVOID them (new_string may contain any char).
  - *Commits:* PowerShell here-strings break on `->`/quotes — Write the message to a temp file + `git commit
    -F <file>`. LF→CRLF warnings are benign (OneDrive/Windows).
  - *Preview:* `preview_start` name `"scanroom"` (python http.server 8743). It CACHES data.js/app.js/styles.css
    — force fresh: `fetch('data.js',{cache:'reload'})` + app.js + styles.css then `location.reload()`.
    `preview_screenshot` is BROKEN → use headless Edge: `msedge.exe --headless=old --disable-gpu
    --hide-scrollbars --user-data-dir=<temp> --window-size=1500,2700 --virtual-time-budget=2500
    --screenshot=<out.png> <url>` → Read the PNG. Edge task_manager/USB ERROR lines are benign.
  - *"Two cards" selector artifact:* the page renders a Driver SAMPLE card first (in the DOM) + the room card;
    `querySelector('.card'/'.titleblock__title'/'.statzone')` grabs the SAMPLE. The dossier-level selectors
    (`.cfdeep`/`.dplate`/`.seal`/`.finish`/`.dossier__register`) hit the room card; for the card face read ALL
    matches.
  - *Workflows:* the `args` value arrives as a STRING — parse it
    (`const A=(typeof args==='string')?JSON.parse(args):(args||{})`). The 25-agent fleet pattern works
    (10 Haiku + 10 Sonnet → 4 Opus → 1 Opus synthesizer; pass a content-file path + screenshot paths via args;
    null-tolerant). Panels are read-only; the main loop edits + commits; build data.js literals YOURSELF from
    agent JSON (never paste agent-authored JS).

---

## 6 · Known watch-items / risks
- **The developed rail is parity-not-surplus BY DESIGN** — the empty-looking lower rail is RESERVED for the
  grade visual. Do NOT "fill" it with throwaway content; the gain lands when the grade visual ships post-gate.
- **Two minor rhymes** logged for future polish (not blockers): Source Record 2-line ≈ Hidden Stat prose (two
  prose blocks, different voice); Mint rows ≈ Surface Record rows (saved by content/colour). A future contrast
  pass may tighten them.
- **Render pipeline:** `app.js` carries dead-CSS-safe but live JS for the SAMPLE-card path and dev `?dev`
  routes — don't assume the room card is the only `.card`. The dossier render is data-driven over `SOURCES` +
  `S107_SECTIONS` + `S108_EXTRAS`; every source needs entries in all three or the data-driven render thins.
- **Key files:** `data.js` (SOURCES[0..4] · V2_EXTRAS · S107_SECTIONS lens content · S108_EXTRAS colourField +
  sourceTwoLine · toScanResultV2) · `app.js` (renderCard ~435 · renderReadingPanel ~520 · renderDossier ~690 ·
  miniStat ~138 · tierBand ~61 · FINISH_HEX map) · `styles.css` (BR-S108.x blocks near the end: cfbar/cfkey,
  cfdeep, finish__chip, dmint__seal, dsource2; `.dossier__register` = Zone-Silence margins) ·
  `docs/_backup/BR-PROTOTYPE-ORIGINALS/` (restorable original prototype reads).
