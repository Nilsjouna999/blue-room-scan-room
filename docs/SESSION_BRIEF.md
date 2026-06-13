# BLUE ROOM — Session Brief

Reusable per-session scope file. Fill the template at the start of every
coding session; the assistant must respect it. Files not listed under
**Edit** are read-only or off-limits (FILE_MAP scope rule).

---

**Staleness rule:** if this brief is stale, missing date/session ID, or
does not match the user's current task — **stop and ask** before doing
anything. (GOVERNANCE_OS anti-drift.)

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
