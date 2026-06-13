# BLUE ROOM — Session Brief

Reusable per-session scope file. Fill the template at the start of every
coding session; the assistant must respect it. Files not listed under
**Edit** are read-only or off-limits (FILE_MAP scope rule).

---

**Staleness rule:** if this brief is stale, missing date/session ID, or
does not match the user's current task — **stop and ask** before doing
anything. (GOVERNANCE_OS anti-drift.)

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
