# BLUE ROOM — File Map (session router)

Permanent router for future Fable / Claude / GPT coding sessions.
Read this before opening anything else. Last verified: 2026-06-12.

## Scope rules (non-negotiable)

- **One job per session.** If a file is not listed under "Edit" in the
  current `docs/SESSION_BRIEF.md`, do not touch it.
- **Out-of-scope findings go to `docs/TASK_QUEUE.md`** (Ready or Backlog).
  Do not patch them in this session. One job per session is not a
  limitation — it is version control.
- **Visual judgment rule: screenshots beat imagined CSS.** Judge
  look-and-feel from `docs/SCREENS.md` captures, never from reading
  styles.css and imagining the result.
- Forbidden directory: `C:\Users\nilsj\OneDrive\Documents\blue-room`
  (old archived projects — never read or write there).

## Source-of-truth docs, priority order

1. `docs/SESSION_BRIEF.md` — today's scope (wins for "what to do now")
2. `docs/FILE_MAP.md` — this file (wins for "where things live")
3. `docs/GOVERNANCE_OS.md` — authority layers, statuses, change reviews,
   research promotion funnel
4. `docs/PROJECT_OS.md` — product laws, layout, stats, treatments
5. `docs/DECISION_LOG.md` — why + revisit conditions; check before
   contradicting anything
6. `docs/COPY_SYSTEM.md` — all copy/tone/naming rules
7. `docs/CHANGE_MAP.md` — how to make a given change safely
8. `docs/CARD_TECH_LAB.md` — explorations only; nothing there is final
9. `docs/research/SPINE.md` — top-of-research filtered spine (RESEARCH
   authority — informs, never implements directly)
10. `docs/SCREENS.md` + `docs/GPT_REVIEW_GUIDE.md` — visual review channel

**Research rule:** daily coding sessions do not open `docs/research/*`
unless SESSION_BRIEF lists it under Read. Raw research cannot directly
change product or code — it flows raw → SPINE.md → active spec →
implementation (GOVERNANCE_OS funnel).

## File map

| File | What it does | Touch when | Do NOT touch when |
| --- | --- | --- | --- |
| `index.html` | Page shell: top bar, source/treatment toggles, three panel mounts, dossier mount | Adding a toggle button or mount point (rare) | Any content/copy/style task — content lives in data.js, looks in styles.css |
| `styles.css` | Entire visual system: tokens, layout grid (hero capped at 1060px), card shell, treatment skins (free/mint-lab/shiny via `--halo-a/b/c`), tabs, dossier plates | Visual changes within existing structure | Copy changes; adding layouts (one master card base is LOCKED) |
| `app.js` | State (`source/treatment/tab` + URL params `?src&t&tab`), all rendering (left tabs, card, right panel, dossier), delegated `[data-goto]` click handler, keyboard (1/2, F/H, M=lab) | Structure/gating/wiring changes | Copy tweaks (data.js) and pure styling (styles.css) |
| `data.js` | ALL content: 2 ScanResults (card text, stats, reads, aura…), `photoTuning`, `diagram`, `metrics`, `dossier` (record/evidence/statNotes/hidden/mint/oracle), `halo` materials, `FORMULAS`, `TREATMENTS` labels | Any copy/values/content change — the safest file | Renaming the four stats without a DECISION_LOG entry |
| `scan-contract.js` | Pure non-AI **safety valve** (`window.BlueRoomScanContract`): `validateUploadedScanResult` + `createBlockedScanState` + `DEV_FIXTURES`, per `docs/SCAN_ENGINE_CONTRACT.md`. Loaded before app.js; NOT wired to normal flow | Validating a future uploaded-photo result; tightening the contract guard | Generating analysis; making the local draft produce stats; calling AI |
| `assets/source-01.jpg` | SRC-01 Driver photo (landscape) | Never edited; replaced only by user decision | — |
| `assets/source-02.jpg` | SRC-02 Ice Field photo (portrait, EXIF-rotated — browsers show upright) | Same | — |
| `docs/GPT_REVIEW_GUIDE.md` | Onboarding for external AI reviewers | Review workflow changes | — |
| `docs/PROJECT_OS.md` | Product laws + systems | A decision changes the product | Casually — laws are load-bearing |
| `docs/DECISION_LOG.md` | Dated decisions, append-only at bottom | Logging a new decision | Rewriting history |
| `docs/CHANGE_MAP.md` | Step-by-step "where do I change X" | A new change-type becomes common | — |
| `docs/COPY_SYSTEM.md` | Tone, humor, banned words, 12 archetypes, win rules | Grammar itself evolves (log decision first) | To excuse a one-off copy violation |
| `docs/CARD_TECH_LAB.md` | Treatment/tier/effects explorations (TESTING/BACKLOG) | Brainstorming visuals before building | Treating its contents as decided |
| `docs/SCREENS.md` | Index of current UI screenshots with raw URLs | After regenerating screens | — |
| `capture-screens.ps1` | Headless-Edge screenshot pipeline → `docs/screens/*.png` (needs server on :8743) | Adding/removing capture states | — |
| `docs/TASK_QUEUE.md` | Ranked work queue | Logging out-of-scope findings; picking next work | — |
| `docs/SESSION_BRIEF.md` | Per-session scope template + example | Start of every session | — |
| `docs/GOVERNANCE_OS.md` | Authority layers, statuses, change reviews, promotion funnel, anti-drift/clutter rules | A change touches LOCKED/ACTIVE authority; resolving conflicts | To excuse skipping the funnel |
| `docs/SCAN_ROUTING_SPEC.md` | ACTIVE spec: intake gate, routes, reject/limited copy, Free/Halo routing split | Building intake/routing; writing route copy | — |
| `docs/SCAN_ENGINE_SPEC.md` | ACTIVE spec: lens engine, stat visibility (4 free / deeper Halo), confidence shrinkage, receipts | Building scoring/receipts; any stat-visibility question | — |
| `docs/SCAN_ENGINE_CONTRACT.md` | ACTIVE spec: future **uploaded-photo** result shape + safety boundaries (red lines, lifecycle, Free/Halo reveal, engine-connection gates) | Designing/validating the uploaded-photo engine; before connecting any analysis | — |
| `docs/CARD_SYSTEM_V1.md` | ACTIVE spec: the card creative system — Artifact Test, v1 stats (4 Free / 6 Halo), 10 lenses, 24 archetypes, receipt rules, Free/Halo output, BLUE ROOM tone, forbidden language. Refines SCAN_ENGINE_SPEC stat taxonomy | Writing stats/archetypes/receipts/copy; upgrading fixtures or future prompts | Relaxing any §1/§5/§6 safety rule |
| `docs/CARD_LOGIC_V1.md` | ACTIVE spec: executable card ruleset — public tier bands (no fake numbers), two-layer receipt grounding, cue categories, Artifact-Test line check, 24 archetype triggers, sealed-stat / rarity / Reframe Map logic, low-info ladder, voice registers, validator targets | Building fixtures/validators/prompts/mocks from CARD_SYSTEM_V1 | Relaxing §5/§9/§10/§12 safety logic |
| `docs/HALO_GATE_UPGRADE_LAYUP_V1.md` | ACTIVE spec: the Halo upgrade moment as a sealed-dossier ritual — gate timing/layout, Free preview vs Halo content, sealed-stat + Reframe-Map envelopes, per-scan price *framing* (no payment), ethical decline, post-unlock rhythm, dark-pattern ban list, copy library | Building the Halo Gate mock/runtime or any upgrade copy | Implementing payment here; relaxing §2/§8/§9/§12 |
| `docs/FREE_PULL_SCREENSHOT_LAYOUT_V1.md` | ACTIVE spec: the **front** of the Free Pull card — Split Artifact / Stat Board layout (image ~48% / stat board ~52%), 4 public tier-band stats (Presence/Frame/Signal/Visual Impact, no 0–100), 2 grounded receipt chips, sealed vault (sealed stat + Reframe-Map shape only), quiet scope line, Halo seal edge; screenshot rules, content budget, anti-goals, mock acceptance criteria. Front specified before the Halo back is mocked | Building *Free Pull Layout Mock v1*; any Free-front layout/copy question | Relaxing §2/§5/§6/§8/§9/§12 safety; treating §7 bands as overriding CARD_LOGIC_V1 §2 before the reconcile |
| `docs/halo/HALO_GATE_BOUNDARY_V1.md` | ACTIVE spec: the locked Free/Halo boundary — Free Pull = complete card front, Halo = sealed card back/dossier; **exact locked counts banned on the Free front + pre-unlock gate** (qualitative sealed-back language only; counts/contents post-unlock); Halo anti-manipulation rules; copy bank + anti-patterns; consequence for the next mock. **Supersedes** the pre-unlock count guidance in HALO_GATE_UPGRADE_LAYUP_V1 §4/§5/§7/§11 + FREE_PULL_SCREENSHOT_LAYOUT_V1 §8 | Building/auditing the Halo Gate or any sealed-back / Free-back copy | Relaxing §B/§C/§D/§G; showing exact pre-unlock counts; implementing payment/AI/real analysis |
| `docs/ARCHETYPE_LIBRARY.md` | ACTIVE spec: archetype selection + naming formulas, banned wording (classes live in COPY_SYSTEM §4) | Naming/selecting archetypes | — |
| `docs/PERFORMANCE_BUDGET.md` | ACTIVE spec: cost law (Free cheap), effects law, testing checklist | Adding any effect or runtime cost | — |
| `docs/DESIGN_TOKENS.md` | ACTIVE spec: Room/Plate/Artifact grammar, color/type/depth laws, dossier rhythm | Visual changes — read before styles.css | — |
| `docs/research/SPINE.md` | Top-of-research filtered spine — high-signal product principles awaiting promotion | Distilling raw research; planning a promotion into a spec | During daily coding unless SESSION_BRIEF says so |
| `docs/research/*.md` (others) | Raw reference research (RESEARCH authority, unfiltered) | Mining for SPINE distillation only | Building from directly — never |

## LOCKED rules (copied from PROJECT_OS / DECISION_LOG — current)

- One master card base; treatments restyle, never re-layout.
- Card stays compressed — no graphs/diagrams/formulas/long prose on it.
- Site carries the depth. The darkroom metaphor: the scan develops what
  the photo already contained.
- No face-rating / attractiveness / social comparison, ever.
- Paid must feel like "the card developed," never "more text unlocked."
- No paywall language in UI copy (locked/premium/upgrade/unlock/paywall).
- No backend/upload/login/checkout/database/AI/MediaPipe in this phase.
- Customer hierarchy: Free Pull → Halo Mint. Signature Mint = internal
  Lab state (keyboard `M`) only. Primary CTA: "Develop this scan".

## Known active bugs

**None currently verified** (checked app.js + data.js 2026-06-12: CTA
text, `src.capture.code` usage, serials BR-001-DRV-0001 /
BR-002-ICE-0001, delegated `[data-goto]`, URL params — all correct).
Older audit notes claiming `undefined` labels, "Develop into Halo Mint"
CTA, BR-002-DRV serial, or "withheld face" copy are **stale — already
fixed**. Verify against current code before re-reporting.
