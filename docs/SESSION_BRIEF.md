# BLUE ROOM — Session Brief

Reusable per-session scope file. Fill the template at the start of every
coding session; the assistant must respect it. Files not listed under
**Edit** are read-only or off-limits (FILE_MAP scope rule).

---

**Staleness rule:** if this brief is stale, missing date/session ID, or
does not match the user's current task — **stop and ask** before doing
anything. (GOVERNANCE_OS anti-drift.)

## Active session — BR-S024

**Date / Session ID:** 2026-06-13 / BR-S024

**Today's task:** Card System Fixture Upgrade v1 (dev harness + fixture)

**Why:** Upgrade dev-only scan fixtures/rendering to the official card logic
without connecting AI or analyzing uploaded photos.

**Read:** docs/FILE_MAP.md · docs/PROJECT_OS.md · docs/SCAN_ENGINE_CONTRACT.md ·
docs/CARD_SYSTEM_V1.md · docs/CARD_LOGIC_V1.md · docs/SCREENS.md ·
scan-contract.js · app.js · index.html · styles.css · data.js

**Edit:** docs/SESSION_BRIEF.md · scan-contract.js · app.js · styles.css ·
docs/CHANGE_MAP.md · docs/TASK_QUEUE.md · docs/SCREENS.md

**Do not open:** C:\Users\nilsj\OneDrive\Documents\blue-room

**Authority affected:** runtime dev harness + ACTIVE SPECS implementation alignment

**Core/spec change required?** No.

**Locked constraints:** no backend · no upload · no AI · no payment · no
real analysis · no fake analysis in normal user flow · uploaded local draft
stays separate from sample ScanResult v2 · dev simulation unmistakably
labelled · preserve sample scan room · preserve all deep links

**Known current state:** Card System Spec v1 (d4874b7) · Executable Card
Logic v1 (95396d6) · dev routes free-scan-sim / uploaded-result /
uploaded-blocked exist · normal Local Draft → Develop Scan opens the sealed
offline gate

**Definition of done:** dev Free Scan Simulation shows public stat tiers
(no user-facing 0–100) · grounded receipts (observed cue → artifact effect)
· scope line · sealed-stat reason · rarity reason · Reframe Map preview ·
validator still gates before render · invalid fixture still blocks · normal
Add Photo → Local Draft → Develop Scan stays offline/sealed · uploaded
photos still produce no stats · all three ?dev routes + both deep links +
sample SRC 01/02 work · docs updated · commit + push completed

**Verification:** `python -m http.server 8743`; validated live — fixture
passes validateUploadedScanResult; ?dev=free-scan-sim shows tiers/grounded
receipts/scope/sealed/rarity/Reframe Map with DEV labels and no printed
numbers; ?dev=uploaded-result + ?dev=uploaded-blocked unchanged; Develop
Scan → sealed offline gate; both deep links + sample room work; console clean.

**Final response format:** commit hash · files changed · what changed ·
verification result · review findings · rollback command

## Active session — BR-S023

**Date / Session ID:** 2026-06-13 / BR-S023

**Today's task:** Executable Card Logic v1 (docs only)

**Why:** Define the hidden ruleset behind stats, receipts, archetypes,
rarity, sealed stats, Reframe Map, and low-information cases before
upgrading fixtures or connecting any engine.

**Read:** docs/FILE_MAP.md · docs/PROJECT_OS.md · docs/SCAN_ENGINE_CONTRACT.md ·
docs/CARD_SYSTEM_V1.md · docs/SCREENS.md · scan-contract.js · app.js

**Edit:** docs/SESSION_BRIEF.md · docs/CARD_LOGIC_V1.md (new) ·
docs/FILE_MAP.md · docs/CHANGE_MAP.md · docs/TASK_QUEUE.md

**Do not open:** C:\Users\nilsj\OneDrive\Documents\blue-room

**Authority affected:** ACTIVE SPECS

**Core/spec change required?** Yes — docs-only logic spec (Spec Change
Review: derives executable rules from CARD_SYSTEM_V1; no LOCKED safety law
relaxed). No runtime changes.

**Locked constraints:** image-as-artifact only · no face-rating · no
attractiveness/beauty scoring · no biology scoring · no race/gender/age/
health guessing · no fake psychology · no personality diagnosis · no
human-worth ranking · no alpha/beta hierarchy · no body/face feature
scoring · no runtime changes

**Known current state:** Card System Spec v1 pushed at d4874b7 · Free Scan
Simulation v1 pushed at 547bc29 · dev renderer + validator exist · runtime
still has no AI, no real scan engine, no uploaded-photo analysis

**Definition of done:** docs/CARD_LOGIC_V1.md exists as an ACTIVE spec
defining public stat tiers (no fake precision), receipt grounding, archetype
trigger rules, sealed-stat logic, rarity logic, Reframe Map logic, low-info
/ degenerate-input handling, voice-register rotation, and the Artifact Test
as an executable line check · FILE_MAP registers it · CHANGE_MAP + TASK_QUEUE
updated · no runtime behavior changes · commit + push completed

**Verification:** `git status` + `git diff --stat` show docs-only changes;
no app.js/index.html/styles.css/data.js/scan-contract.js edits; CARD_LOGIC_V1
registered in FILE_MAP; tree clean after push.

**Final response format:** commit hash · files changed · what changed ·
verification result · review findings · rollback command

## Active session — BR-S022

**Date / Session ID:** 2026-06-13 / BR-S022

**Today's task:** Card System Spec v1 (docs only)

**Why:** Lock the creative card/stat/lens/archetype system before upgrading
dev fixtures or connecting any future scan engine.

**Read:** docs/FILE_MAP.md · docs/PROJECT_OS.md · docs/SCAN_ENGINE_CONTRACT.md ·
docs/SCREENS.md · docs/research/SPINE.md · scan-contract.js · app.js

**Edit:** docs/SESSION_BRIEF.md · docs/CARD_SYSTEM_V1.md (new) ·
docs/CHANGE_MAP.md · docs/TASK_QUEUE.md · docs/FILE_MAP.md

**Do not open:** C:\Users\nilsj\OneDrive\Documents\blue-room

**Authority affected:** ACTIVE SPECS

**Core/spec change required?** Yes — but docs-only (Spec Change Review:
v1 stat taxonomy refines SCAN_ENGINE_SPEC; rationale logged in CHANGE_MAP +
the new spec's authority note). No LOCKED safety law relaxed.

**Locked constraints:** image-as-artifact only · no face-rating · no
attractiveness/beauty scoring · no biology scoring · no race/gender/age/
health guessing · no fake psychology · no personality diagnosis · no
human-worth ranking · no alpha/beta hierarchy · no body/face feature
scoring · no runtime changes

**Known current state:** … · Free Scan Simulation v1 pushed at 547bc29 ·
validator at window.BlueRoomScanContract · dev routes uploaded-result /
uploaded-blocked / free-scan-sim exist · normal Develop Scan still opens the
sealed offline gate

**Definition of done:** docs/CARD_SYSTEM_V1.md exists as an ACTIVE spec
defining the Artifact Test, final v1 stats, v1 lenses, a safe v1 archetype
set, receipt rules, Free vs Halo output shape, BLUE ROOM tone, and forbidden
language · FILE_MAP registers it · CHANGE_MAP + TASK_QUEUE updated · no
runtime behavior changes · commit + push completed

**Verification:** `git status` + `git diff --stat` show docs-only changes;
no app.js/index.html/styles.css/data.js/scan-contract.js edits; CARD_SYSTEM_V1
registered in FILE_MAP; tree clean after push.

**Final response format:** commit hash · files changed · what changed ·
verification result · rollback command

## Active session — BR-S021

**Date / Session ID:** 2026-06-13 / BR-S021

**Today's task:** Free Scan Simulation v1 — Dev Only / Not Real Analysis

**Why:** Preview the future Free Scan rhythm using a validated dev fixture,
without AI or real uploaded-photo analysis.

**Read:** docs/FILE_MAP.md · docs/PROJECT_OS.md · docs/SCAN_ENGINE_CONTRACT.md ·
docs/SCREENS.md · scan-contract.js · app.js · data.js · index.html · styles.css

**Edit:** docs/SESSION_BRIEF.md · app.js · scan-contract.js (new fixture) ·
styles.css · docs/CHANGE_MAP.md · docs/TASK_QUEUE.md · docs/SCREENS.md

**Do not open:** C:\Users\nilsj\OneDrive\Documents\blue-room

**Authority affected:** ACTIVE SPECS + runtime simulation guardrails

**Core/spec change required?** No — dev-only harness only.

**Locked constraints:** no backend · no upload · no AI · no payment · no
real analysis · no fake analysis in normal user flow · uploaded local draft
stays separate from sample ScanResult v2 · dev simulation unmistakably
labelled · preserve sample scan room · preserve all deep links

**Known current state:** … · Scan Engine Foundation v1 (7e0709d) ·
Uploaded Scan Result Renderer v1 (6e1703a) · validator at
window.BlueRoomScanContract · dev routes `?dev=uploaded-result` /
`?dev=uploaded-blocked` exist · normal Local Draft → Develop Scan still
opens the sealed offline gate

**Definition of done:** a dev-only `?dev=free-scan-sim` route showing a
staged flow (Intake → Development → Validated Free Result Preview) using a
dev fixture only · simulated result passes `validateUploadedScanResult`
before rendering · UI labelled DEV SIMULATION / NOT REAL ANALYSIS / NOT
USER SCAN · normal Add Photo → Local Draft → Develop Scan stays
offline/sealed · uploaded photos still produce no real stats · existing
`?dev=uploaded-result` / `?dev=uploaded-blocked` still work · sample room +
deep links work · docs updated · commit + push completed

**Verification:** `python -m http.server 8743`; bare URL → menu; Develop
Scan → sealed offline gate; `?dev=free-scan-sim` → 3-step simulation +
validated Free preview (4 stats, sealed Halo); invalid fixture → blocked;
both existing `?dev` routes + both deep links + sample SRC 01/02 work;
console clean.

**Final response format:** commit hash · files changed · what changed ·
verification result · review/agent findings · rollback command

## Active session — BR-S020

**Date / Session ID:** 2026-06-13 / BR-S020

**Today's task:** Uploaded Scan Result Renderer v1 — Dev Harness Only

**Why:** Create a validated renderer path for future uploaded-photo scan
results without connecting AI or generating any real uploaded-photo
analysis.

**Read:** docs/FILE_MAP.md · docs/PROJECT_OS.md · docs/SCAN_ENGINE_CONTRACT.md ·
docs/SCREENS.md · scan-contract.js · app.js · data.js · index.html · styles.css

**Edit:** docs/SESSION_BRIEF.md · app.js · styles.css · scan-contract.js
(new dev fixture) · index.html (#devView mount) · docs/CHANGE_MAP.md ·
docs/TASK_QUEUE.md · docs/SCREENS.md

**Do not open:** C:\Users\nilsj\OneDrive\Documents\blue-room

**Authority affected:** ACTIVE SPECS + runtime renderer foundation

**Core/spec change required?** No — contract support only.

**Locked constraints:** no backend · no upload · no AI · no payment · no
fake stats/receipts/oracle/Halo for user uploaded photos · uploaded local
draft stays separate from sample ScanResult v2 · dev fixture clearly
labelled DEV HARNESS / NOT USER SCAN · preserve sample scan room · preserve
all deep links

**Known current state:** Main Menu v1 (def0dfe) · Upload/Intake Shell v1
(d590e55) · Scan Development Gate v1 (e19e183) · Local Draft Polish v1
(c7d2cd8) · Scan Engine Contract v1 (2ad2fb3) · Scan Engine Foundation v1
(7e0709d) · validator at window.BlueRoomScanContract · blocked-state
renderer foundation-only

**Definition of done:** a renderer for validated uploaded_scan_result
objects · refuses to render unless `validateUploadedScanResult(result).ok`
· invalid dev fixture → blocked state · valid dev fixture → preview clearly
labelled DEV HARNESS / NOT USER SCAN · reachable only by `?dev=uploaded-result`
/ `?dev=uploaded-blocked` · normal menu / local draft / Develop Scan
unchanged · Develop Scan still opens the sealed engine-offline gate ·
uploaded local photos still produce no stats · sample scan room + deep
links work · docs updated · commit + push completed

**Verification:** `python -m http.server 8743`; bare URL → menu; Add Your
Photo → Local Draft; Develop Scan → sealed offline gate (no result);
`?dev=uploaded-result` → valid DEV HARNESS preview; `?dev=uploaded-blocked`
→ blocked state; invalid fixture cannot render as valid; both deep links +
sample SRC 01/02 work; console clean.

**Final response format:** commit hash · files changed · what changed ·
verification result · review/agent findings · rollback command

## Active session — BR-S019

**Date / Session ID:** 2026-06-13 / BR-S019

**Today's task:** Scan Engine Foundation v1

**Why:** Add a non-AI validation and safe-failure foundation before any
uploaded-photo scan result can ever render.

**Read:** docs/FILE_MAP.md · docs/PROJECT_OS.md · docs/SCAN_ENGINE_CONTRACT.md ·
docs/SCREENS.md · app.js · data.js · index.html · styles.css

**Edit:** docs/SESSION_BRIEF.md · scan-contract.js (new pure validator) ·
app.js (blocked-state renderer, foundation only) · index.html (load script) ·
styles.css · docs/CHANGE_MAP.md · docs/TASK_QUEUE.md · docs/FILE_MAP.md ·
docs/SCREENS.md · docs/SCAN_ENGINE_CONTRACT.md (field-name reconcile)

**Do not open:** C:\Users\nilsj\OneDrive\Documents\blue-room

**Authority affected:** ACTIVE SPECS + runtime guardrails

**Core/spec change required?** No — contract support only (Spec Change
Review for the evidence field-name reconcile; no LOCKED law changed).

**Locked constraints:** no backend · no upload · no AI · no payment · no
fake stats · no fake receipts · no fake oracle · no fake Halo result ·
uploaded local draft stays separate from sample ScanResult v2 · preserve
sample scan room · preserve all deep links

**Known current state:** Main Menu v1 (def0dfe) · Upload/Intake Shell v1
(d590e55) · Scan Development Gate v1 (e19e183) · Local Draft Polish v1
(c7d2cd8) · Scan Engine Contract v1 (2ad2fb3) · Local Draft works ·
Develop Scan opens the sealed engine-offline gate

**Definition of done:** a pure `validateUploadedScanResult` exists ·
accepts a safe minimal future object · rejects forbidden/sensitive/
fake-human-rating fields · rejects missing safety flags · rejects objects
that try to mix with sample ScanResult v2 · a safe blocked/failure UI state
exists but is not triggered by normal flow · Develop Scan gate remains
offline/sealed · Local Draft still produces no stats · sample scan room
works · deep links work · docs updated · commit + push completed

**Verification:** `python -m http.server 8743`; menu → Add Your Photo →
Local Draft → Develop Scan still opens the sealed offline gate (no result);
sample SRC 01/02 + both deep links work; in dev console the validator
accepts `validMinimalFutureResult` and rejects the four invalid fixtures;
blocked state renders safely only when dev-injected.

**Final response format:** commit hash · files changed · what changed ·
verification result · review/agent findings · rollback command

## Active session — BR-S018

**Date / Session ID:** 2026-06-13 / BR-S018

**Today's task:** Scan Engine Contract v1

**Why:** Define the future uploaded-photo scan result contract and safety
boundaries before connecting any AI or analysis engine.

**Read:** docs/FILE_MAP.md · docs/PROJECT_OS.md · docs/SCREENS.md ·
docs/research/SPINE.md · app.js · data.js

**Edit:** docs/SESSION_BRIEF.md · docs/CHANGE_MAP.md · docs/TASK_QUEUE.md ·
docs/SCAN_ENGINE_CONTRACT.md (new) · docs/FILE_MAP.md (register the new spec)

**Do not open:** C:\Users\nilsj\OneDrive\Documents\blue-room · docs/research/* (beyond SPINE, which this brief lists under Read)

**Authority affected:** ACTIVE SPECS

**Core/spec change required?** Yes — adds a new ACTIVE spec
(SCAN_ENGINE_CONTRACT) as a documented contract; no LOCKED law changes, so
Spec Change Review only (rationale logged in CHANGE_MAP + this brief).

**Locked constraints:** no backend · no upload · no AI · no payment · no
fake stats · no fake receipts · no fake oracle · no fake Halo result ·
uploaded local draft stays separate from sample ScanResult v2 · preserve
sample scan room · preserve all deep links

**Known current state:** Main Menu v1 pushed at def0dfe · Upload/Intake
Shell v1 pushed at d590e55 · Scan Development Gate v1 pushed at e19e183 ·
Local Draft Polish v1 pushed at c7d2cd8 · Local Draft works · Develop Scan
opens the sealed engine-offline gate

**Definition of done:** a clear Scan Engine Contract v1 exists in docs ·
defines the future uploaded-photo ScanResult shape · allowed + forbidden
lenses · result states / lifecycle · evidence/receipt requirements · red
lines against face/attractiveness/biology/age/health/race/gender guessing,
human-worth scoring, fake psychology · what Free and Halo may later reveal
· how a local draft becomes eligible for a future scan without pretending a
scan has run now · runtime behavior unchanged · sample scan room still
works · deep links still work · commit and push completed

**Verification:** docs-only — `git status` + `git diff --stat` show only
docs changes, no runtime files; no unintended files; (no smoke test
needed since app.js/data.js/styles.css untouched)

**Final response format:** Files changed · What changed · Verification
result · Git commands · Rollback command

## Active session — BR-S017

**Date / Session ID:** 2026-06-13 / BR-S017

**Today's task:** Local Draft Polish v1

**Why:** Clean up the browser-local intake and sealed gate presentation
before any scan engine work.

**Read:** docs/FILE_MAP.md · docs/SCREENS.md · app.js · styles.css

**Edit:** docs/SESSION_BRIEF.md · app.js · styles.css · docs/CHANGE_MAP.md ·
docs/TASK_QUEUE.md · docs/SCREENS.md (if needed)

**Do not open:** C:\Users\nilsj\OneDrive\Documents\blue-room · docs/research/*

**Authority affected:** ACTIVE SPECS

**Core/spec change required?** no

**Locked constraints:** no backend · no upload · no AI · no payment · no
fake stats · no fake receipts · no fake oracle · no fake Halo result ·
local draft stays separate from sample ScanResult v2 · preserve sample
scan room · preserve all deep links

**Known current state:** Main Menu v1 pushed at def0dfe · Upload/Intake
Shell v1 pushed at d590e55 · Scan Development Gate v1 pushed at e19e183 ·
Local Draft works · Develop Scan opens the sealed gate

**Definition of done:** ugly long filenames display cleaner · Local Draft
image/card spacing feels better · Develop Scan CTA feels slightly more
intentional without implying a scan ran · sealed gate still says engine
offline / no analysis / no stats / no receipts / no oracle / no Halo
result · no fake output appears · sample scan room still works · deep links
still work · commit and push completed

**Verification:** open http://localhost:8743/ · Add Your Photo works ·
Local Draft shows a cleaned filename / compact file label · Develop Scan
opens the sealed gate · no generated result appears · SRC 01 / SRC 02 still
work · ?src=1&t=free&tab=source bypasses the menu · ?src=2&t=shiny&tab=metrics
bypasses the menu

**Final response format:** Files changed · What changed · Verification
result · Git commands · Rollback command

## Active session — BR-S016

**Date / Session ID:** 2026-06-13 / BR-S016

**Today's task:** Scan Development Gate v1

**Why:** Give the staged local draft a clear next-step gate without
pretending scan analysis exists yet.

**Read:** docs/FILE_MAP.md · docs/SCREENS.md · app.js · styles.css

**Edit:** docs/SESSION_BRIEF.md · app.js · styles.css · docs/CHANGE_MAP.md ·
docs/TASK_QUEUE.md · docs/SCREENS.md (if needed)

**Do not open:** C:\Users\nilsj\OneDrive\Documents\blue-room · docs/research/*

**Authority affected:** ACTIVE SPECS

**Core/spec change required?** no

**Locked constraints:** no backend · no upload · no AI · no payment · no
fake stats · no fake receipts · no fake oracle · no fake Halo result ·
local draft stays separate from sample ScanResult v2 · preserve sample
scan room · preserve all deep links

**Known current state:** Main Menu v1 pushed at def0dfe · Upload/Intake
Shell v1 pushed at d590e55 · Add Your Photo opens local file picker ·
selected image appears as LOCAL DRAFT · Local Draft correctly says no scan
has run yet

**Definition of done:** Local Draft has a clear Develop Scan button/state ·
clicking Develop Scan opens a sealed gate panel/state · gate copy clearly
says the scan engine is not connected yet · no generated result appears ·
no sample ScanResult data reused for the local draft · no fake stats,
readings, receipts, oracle, mint record, or Halo output · user can return
to Local Draft, replace image, enter the sample room, or main menu

**Verification:** open http://localhost:8743/ · Add Your Photo works ·
Local Draft appears · Develop Scan opens the sealed gate · the gate
generates no result · SRC 01 / SRC 02 still work ·
?src=1&t=free&tab=source bypasses the menu · ?src=2&t=shiny&tab=metrics
bypasses the menu

**Final response format:** Files changed · What changed · What was
intentionally not changed · Verification result · Risks · Git commands

## Template (copy, fill, run)

**Date / Session ID:**

**Today's task:**

**Why:**

**Read:**

**Edit:**

**Do not open:**

**Authority affected:** (CORE LAW / ACTIVE SPECS / RESEARCH / ARCHIVE)

**Core/spec change required?** yes/no — if yes, name the review
(Core Change Review or Spec Change Review, see GOVERNANCE_OS)

**Locked constraints:**

**Known current state:**

**Definition of done:**

**Verification:**

**Final response format:**
Files created · Files changed · What changed · What was intentionally not changed · Stale claims skipped · Verification result · Git commands

---

## Example session: visual review URL cleanup

**Date / Session ID:** 2026-06-12 / BR-S014

**Today's task:** Fix the raw screenshot URLs in the visual-review docs so
external reviewers can open them directly.

**Authority affected:** ACTIVE SPECS (SCREENS, GPT_REVIEW_GUIDE)

**Core/spec change required?** no — content correction within existing specs

**Why:** Reviewers reported the raw URL pattern was a placeholder; visual
review depends on working image links.

**Read:** docs/FILE_MAP.md · docs/SCREENS.md · docs/GPT_REVIEW_GUIDE.md

**Edit:** docs/SCREENS.md · docs/GPT_REVIEW_GUIDE.md

**Do not open:** index.html, styles.css, app.js, data.js — unless verifying
a link target requires it (read-only if so).

**Locked constraints:** No product/UI changes; no new sections; raw base is
`https://raw.githubusercontent.com/Nilsjouna999/blue-room-scan-room/main/`.

**Known current state:** 10 PNGs exist in docs/screens/ (verify with
`dir docs/screens/` before writing any filename).

**Definition of done:** Every screenshot entry in SCREENS.md carries a full
direct raw URL using a real filename; GPT_REVIEW_GUIDE points reviewers at
SCREENS.md and the correct base; `git diff --stat` shows only docs/ changes.

**Verification:** `git status` + `git diff --stat`; fetch one raw URL and
confirm HTTP 200 image/png.

**Final response format:**
Files created · Files changed · What changed · What was intentionally not changed · Stale claims skipped · Verification result · Git commands
