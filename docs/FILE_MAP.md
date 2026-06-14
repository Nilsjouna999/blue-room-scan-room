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
| `docs/REVERT_PLAYBOOK.md` | How to undo changes + identify the target: baseline tags (`baseline-v1` = pre shiny-technique experiments), per-task commits indexed by CHANGE_MAP/TASK_QUEUE, symptom→command table, safe `git revert`/`checkout` vs destructive reset, pre-big-change tag/branch ritual | The user says "revert / roll back / undo / go back to before X"; before a huge new idea (tag a baseline first) | Keeping literal backup copies of files (use git tags/commits instead) |
| `docs/SCAN_ROUTING_SPEC.md` | ACTIVE spec: intake gate, routes, reject/limited copy, Free/Halo routing split | Building intake/routing; writing route copy | — |
| `docs/SCAN_ENGINE_SPEC.md` | ACTIVE spec: lens engine, stat visibility (4 free / deeper Halo), confidence shrinkage, receipts | Building scoring/receipts; any stat-visibility question | — |
| `docs/SCAN_ENGINE_CONTRACT.md` | ACTIVE spec: future **uploaded-photo** result shape + safety boundaries (red lines, lifecycle, Free/Halo reveal, engine-connection gates) | Designing/validating the uploaded-photo engine; before connecting any analysis | — |
| `docs/CARD_SYSTEM_V1.md` | ACTIVE spec: the card creative system — Artifact Test, v1 stats (4 Free / 6 Halo), 10 lenses, 24 archetypes, receipt rules, Free/Halo output, BLUE ROOM tone, forbidden language. Refines SCAN_ENGINE_SPEC stat taxonomy | Writing stats/archetypes/receipts/copy; upgrading fixtures or future prompts | Relaxing any §1/§5/§6 safety rule |
| `docs/CARD_LOGIC_V1.md` | ACTIVE spec: executable card ruleset — public tier bands (no fake numbers), two-layer receipt grounding, cue categories, Artifact-Test line check, 24 archetype triggers, sealed-stat / rarity / Reframe Map logic, low-info ladder, voice registers, validator targets | Building fixtures/validators/prompts/mocks from CARD_SYSTEM_V1 | Relaxing §5/§9/§10/§12 safety logic |
| `docs/HALO_GATE_UPGRADE_LAYUP_V1.md` | ACTIVE spec: the Halo upgrade moment as a sealed-dossier ritual — gate timing/layout, Free preview vs Halo content, sealed-stat + Reframe-Map envelopes, per-scan price *framing* (no payment), ethical decline, post-unlock rhythm, dark-pattern ban list, copy library | Building the Halo Gate mock/runtime or any upgrade copy | Implementing payment here; relaxing §2/§8/§9/§12 |
| `docs/FREE_PULL_SCREENSHOT_LAYOUT_V1.md` | ACTIVE spec: the **front** of the Free Pull card — Split Artifact / Stat Board layout (image ~48% / stat board ~52%), 4 public tier-band stats (Presence/Frame/Signal/Visual Impact, no 0–100), 2 grounded receipt chips, sealed vault (sealed stat + Reframe-Map shape only), quiet scope line, Halo seal edge; screenshot rules, content budget, anti-goals, mock acceptance criteria. Front specified before the Halo back is mocked | Building *Free Pull Layout Mock v1*; any Free-front layout/copy question | Relaxing §2/§5/§6/§8/§9/§12 safety; treating §7 bands as overriding CARD_LOGIC_V1 §2 before the reconcile |
| `docs/halo/HALO_GATE_BOUNDARY_V1.md` | ACTIVE spec: the locked Free/Halo boundary — Free Pull = complete card front, Halo = sealed card back/dossier; **exact locked counts banned on the Free front + pre-unlock gate** (qualitative sealed-back language only; counts/contents post-unlock); Halo anti-manipulation rules; copy bank + anti-patterns; consequence for the next mock. **Supersedes** the pre-unlock count guidance in HALO_GATE_UPGRADE_LAYUP_V1 §4/§5/§7/§11 + FREE_PULL_SCREENSHOT_LAYOUT_V1 §8 | Building/auditing the Halo Gate or any sealed-back / Free-back copy | Relaxing §B/§C/§D/§G; showing exact pre-unlock counts; implementing payment/AI/real analysis |
| `docs/audits/HALO_GATE_ETHICS_AUDIT_V1.md` | AUDIT record: ethics/boundary/manipulation/artifact-safety audit of the `?dev=halo-gate` mock + migrated Free-Pull sealed-back copy against `docs/halo/HALO_GATE_BOUNDARY_V1.md`. Verdict PASS (one low copy fix). Confirms no pre-unlock counts, Free reads complete, Halo ≠ hidden score, dev-mock/not-payment | Re-auditing the Halo Gate; before changing sealed-back copy | — |
| `docs/audits/SAMPLE_ROOM_18_STATE_AUDIT_V1.md` | AUDIT record: 18-state sample-room audit (2 sources × free/halo/lab × source/diagram/metrics) post Artifact Language Stabilization. Verdict PASS WITH FIXES — migration correct (no old-stat/0–100/±N leaks, no diamond overflow); fixed 4 pre-existing person-pronoun prose lines in data.js (SRC-02 "he"/"for you", SRC-01 latent "at you") | Re-auditing the sample-room stat/tier/copy surfaces | — |
| `docs/audits/DATA_COPY_SYSTEM_AUDIT_V1.md` | AUDIT record: full data.js copy audit against COPY_SYSTEM (banned-lexicon, five-gate, tone, every-outcome-is-a-win). Verdict PASS WITH FIXES — no you/your, no he/she, no banned status/beauty/SaaS in visible copy; fixed "tax the score"→"composition", routeLogic "dominant"→"strongest", + COPY_SYSTEM §6 canon "for you" coherence | Before adding/auditing any data.js sample copy | — |
| `docs/ARCHETYPE_LIBRARY.md` | ACTIVE spec: archetype selection + naming formulas, banned wording (classes live in COPY_SYSTEM §4) | Naming/selecting archetypes | — |
| `docs/PERFORMANCE_BUDGET.md` | ACTIVE spec: cost law (Free cheap), effects law, testing checklist | Adding any effect or runtime cost | — |
| `docs/DESIGN_TOKENS.md` | ACTIVE spec: Room/Plate/Artifact grammar, color/type/depth laws, dossier rhythm | Visual changes — read before styles.css | — |
| `docs/research/SPINE.md` | Top-of-research filtered spine — high-signal product principles awaiting promotion | Distilling raw research; planning a promotion into a spec | During daily coding unless SESSION_BRIEF says so |
| `docs/research/DEPTH_MODEL_V1.md` | RESEARCH: depth + interconnection (8-agent White Death, ECHO bar). The shared spine (serial = join key; archetype class = content axis), the link grammar incl. the TWO-TRACK ATTACHMENT LAW (photo→card READ vs declared-lore→serial FILE, forbidden cross — how zodiac/numerology attach without inference), the gloss system (two-tier hover, Artifact-Test destination, Oracle stays mysterious), and 7 KEEP/High depth layers (serial spine, two-track law, class→family axis, field-token through-thread, filing-event chain, sealed-stat payoff, gloss) | Designing any future surface (codex/journal/blog/oracle/zodiac/numerology/reading); how surfaces interconnect; adding glosses; instilling grounded depth | Inferring profile lore from the photo; glossing the Oracle; building backlog zones |
| `docs/research/LAYERING_MODEL_V1.md` | RESEARCH: BLUE ROOM layering / coherence (15-agent White Death, FIT-bar). The 4 priority seams (P1 archetype bridge · P2 provenance lineage · P3 evidence→stat→display loop · P4 single back-seam gate), 8 ranked survivor layers (serial lineage, class→family map, route+status rows, stat-receipt closure, subject-lock=confidence), the person-drift / detector / backlog guardrails, and a 30-seam latent-link index — all connective-only, no new schema | Adding depth/links/coherence; pulling a layer; planning how surfaces connect | Building a detector/engine; touching ungoverned copy (aura) as person-truth; building backlog zones |
| `docs/research/FREE_PAID_MODEL_V1.md` | RESEARCH: the free/paid model (White Death audit + scout). Boundary is sound (complete front / sealed back); the defect is tier-ladder FRAMING on 3 surfaces. Holds the sharpened question, 5 decision-axes (design/data/visual/timing/per-zone), model verdicts (KEEP front/back; DILUTE raw→structured; kills), the concrete MENU FIX, and native analogies (contact-sheet vs print, TCG base+holo) | Designing/auditing any free vs paid surface (menu, card, reading panel, dossier, gate); the "menu is wack" fix | Treating it as approved; adding payment; making free read crippled |
| `docs/research/UNIVERSE_MAP_V1.md` | RESEARCH: BLUE ROOM "universe" scope map (White Death audit + scout) — the Archive cosmology, flat zone-map (Lobby/Scan Room/Card Record/Vault/Codex), card-as-record, latent↔developed flip physics; fast/no-slob inspiration per concept (Obra Dinn manifest, Cooper Hewitt/Louvre/Wellcome vault, Pentiment SVG zone-graph, clip-path develop wipe, CSS flip/view-transitions). Killed: literal 3D/flipped worlds, per-stat realms | Planning the bigger scope; pulling a universe building-block for a surface | Building a literal 3D/WebGL world; treating it as approved |
| `docs/research/LAYUP_RESEARCH_V1.md` | RESEARCH: around-the-card redesign plan (left/right/below + nav/button frame) — governing principle ("the room is a ruled instrument sheet; the card is the only object"), flatness budgets, do/don't, 5 ranked tasks (Dim technical lines · Buttons+rail · Right+dossier de-dull · Source merge · Metrics redesign), per-surface specs, dim-technical-lines treatment, non-obvious pattern bank. Keepers: card (locked) + diagram | Pulling a redesign task to implement (one at a time, behind `baseline-v1`); planning the around-the-card work | Building from it directly without the pre-edit critique; touching the card's locked geometry |
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
