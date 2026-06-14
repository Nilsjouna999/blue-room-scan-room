# BLUE ROOM — Layup / Around-the-Card Redesign Research v1

Layer: RESEARCH (informs, never implements — GOVERNANCE_OS §3). Date: 2026-06-14.
Source: a 9-agent layup-research workflow (6 surface audits + non-obvious pattern
scout + Opus tension-reconcile + Opus ranked plan) run against the user's verbatim
design feedback. **Nothing here is approved for build.** Each task graduates to
implementation only via the normal pre-edit critique + one-task-one-commit flow,
behind `baseline-v1` (see `docs/REVERT_PLAYBOOK.md`).

**Why this exists:** the user's read — *card and diagram are the best parts; Source
feels redundant; Metrics is too dull; everything around the card (left/right/below)
is dull and boring; wants non-obvious moves and a real nav/button frame; wants the
most technical lines de-emphasized.* This is the prioritized response, to pull from
when we want to do more of the redesign.

---

## 1. Governing principle

> **The room is a ruled instrument sheet; the card is the only object mounted on it.**

Make the surroundings engaging by raising their **information density and
structure**, never their **physical presence**. The card alone holds depth (shadow,
halo, material edge, raised geometry). Everything around it stays pressed flat and
earns interest the way a precision instrument faceplate or an engraved certificate
does — coordinate systems, ruled edges, numbered sequences, typographic tiering,
loud/quiet rhythm, and line-weight contrast.

**Operational test for any surround change:** *"Does this add a reason to read, or a
thing to look at?"* Structure / type / rhythm / numbering / edge-and-line add reasons
to read (flat — they pull the eye through information). Depth / glow / gradient fill /
drop shadow / blur / material sheen add a thing to look **at** — which competes with
the card for object-primacy and tips the room into soft-SaaS. The surround may get
louder only along axes with no z-depth: *a 2px line where a 2px shadow is forbidden;
a 22px ghost numeral where a glowing chip is forbidden; a ruled gutter where a raised
plate is forbidden.*

### Three flatness budgets
- **Depth budget** — the card holds the entire depth budget; room and plates spend
  zero. A surround element that wants shadow/glow/material must express that intent
  as a line, a numeral, or whitespace instead.
- **Accent budget** — accent is currency, not paint. Surround interest is built from
  the warm-grey line tokens (`--line-faint/--line/--line-strong`) and the text tiers,
  not from `--halo/--moss/violet/cyan` washes. The **one** sanctioned surround accent
  is the Halo-state Oracle plate's left **edge** (2px line, ≤30% mix) — never a fill
  or glow.
- **Motion budget** — surround motion is `transform/opacity/clip-path`/one custom
  prop only, reduced-motion safe, and must read as an instrument *resolving*
  (line-draw, top-edge shutter), never decoration. No animated blur, no faked
  depth-on-scroll.

## 2. Do / Don't

**Do**
- Add interest with flat **line-weight**: promote a rule `--line-faint → --line →
  --line-strong`, or add a 2px left-edge ledger mark, to make a section louder with
  no depth.
- Promote latent **numbering** into structure: pull dossier `01–07` and right-panel
  `R.01–R.12` marks out of minimum-contrast ghost text into a deliberate counting
  spine (a gutter column) so the eye reads a paginated archive.
- Tier the **type**: reserve large display scale + brighter rule for climax sections
  (LOUD dossier plates 04/07, Oracle); keep administrative sections smaller/tighter.
  Hierarchy from type scale + gap rhythm, never a box or fill.
- Convert SaaS chrome into **engineered chrome** with line+type only: segmented pill
  control → flat-bottom channel selector with underline active state; progress bars →
  calibration rulers with fixed ticks; pill/badge clouds → bottom-rule ledger
  entries; bordered cards → top+bottom-rule datasheet tables (no side borders/fills).
- Densify **edges** like an instrument chassis: static coordinate ticks (4px,
  regular, `--line-faint`) on column dividers and stat fields.
- Use **rhythm/whitespace**: vary inter-module gap by register (compact record tail /
  open interpretive middle).

**Don't**
- No drop shadow, inner glow, halo, sheen, or raised/floating look on any plate,
  panel, module, or the room — depth is the card's exclusive budget.
- No gradient fills, accent washes, or mush; replace gradient progress fills with a
  flat single-color line.
- No animated blur, depth-on-scroll, parallax, zoom, WebGL; nothing animated outside
  `transform/opacity/clip-path`/one custom prop; never ship motion without a
  reduced-motion fallback.
- No soft-SaaS chrome: no rounded segmented pills, badge clouds, 4px pill slider
  tracks, rounded tooltip chips (square corners to 0–1px), bordered "card" data grids.
- Don't brighten a section by enlarging/boxing it past its register — a louder
  section is a heavier **line** and a bigger **number/type**, not a bordered container
  that reads as a second card edge.
- Don't delete information to dim it — dimming lowers the **tier** of a readout, never
  the receipt; trust depends on the instrumentation staying present and legible.
- Don't spend accent as paint (only the Oracle-edge moment); don't invent a new visual
  language per view — route every button through one grammar.

## 3. Keepers (protected — do not weaken)
- **Card** geometry LOCKED; holds all depth; untouched (corner-shape edge already added).
- **Diagram** tab — the only form-first surface; **keep & extend** (line-draw reveal,
  notes-as-legend, squared callout chips); never weaken the load-bearing photo
  desaturation (`saturate .65 / brightness .78`) — it is what makes the strokes read.
- The reduced-motion block gates all new motion.
- The only sanctioned surround accent is the Halo Oracle-plate left edge (≤30% mix).

## 4. Ranked program (pull in this order; one task = one commit behind `baseline-v1`)

| # | Task | Surface | Leverage | Risk | Effort | Done when |
|---|---|---|---|---|---|---|
| 1 | **Dim technical lines** | chrome + readouts | High | Low | M | Loud readouts/chrome recede a tier, card gains prominence, zero info lost. |
| 2 | **Unify buttons + top-bar rail** | buttons, top bar, tabs | High | Low | M | One button grammar; a visible MENU/back in the rail; tab bar pins; footer retired after hints relocate. |
| 3 | **Right panel + dossier de-dull** | reading panel + dossier | High | Med | L | Tiered arc + numbered archive via line+number alone; no depth; top-edge shutter reveal with full-show fallback. |
| 4 | **Source merge** | Source → Diagram | Med | Med | L | 2 tabs; Capture Record gone (Lens+Light kept); 5 frame-read lines relocated; `?tab=source` re-pointed (no 404). |
| 5 | **Metrics redesign** | Metrics tab | Med | Med | L | Filed instrumentation; no gradient fills / bordered cells; `signalMix` data not mutated. |

**Non-obvious moves per task:** #1 *dim = step DOWN an existing tier*; #2 *the top bar
is already a command rail, dashed = "not committed" grammar*; #3 *equal visual gravity
is the dullness — the numbers are the underused asset; shutter from the TOP = a
negative lifting from a developing tray*; #4 *full-saturation vs .65 desaturation =
raw-vs-read, via a CSS class toggle not JS state*; #5 *the diamond and signal-mix are
two layers in identical wrappers — make the difference structural; sort copy-first so
`data.js` isn't mutated*.

## 5. Per-surface application (condensed)

- **Top bar / nav frame:** reframe as a flat command rail (the `border-bottom`
  already frames it). Add a pressable mono MENU/back label (9px, `--t-ghost`, wide
  track) flush-left before the brand, behind a 1px rule — a label, not a weighted
  button. Surface keyboard hints as a trailing ghost telemetry cluster; then retire
  the 26px footer (relocate first). Optional mission-control register: a mono clock +
  static `UNDEVELOPED/DEVELOPED` descriptor (text only, no animation). Unify all
  buttons into `btn--primary/secondary/ghost`; drop pill rounding on toggles toward a
  flat channel feel. No new height, depth, or accent fill.
- **Left / Source:** MERGE + ELIMINATE. Collapse Source into Diagram as a
  `CLEAN | ANNOTATED` in-frame toggle (CLEAN = full-saturation raw photo + numbered
  markers; ANNOTATED = desaturated + overlays). Tabs `repeat(3,1fr) → repeat(2,1fr)`
  (DIAGRAM / METRICS). Delete the Capture Record module (its fields already live on
  the card face, the readhead chip, and dossier plate 01) — migrate only Lens+Light
  as hairline metadata if kept. Relocate the 5 `src.analysis` ALL-CAPS lines under a
  `FRAME READ` sub-label in the diagram notes, restyled as blueprint annotations
  (numbered circle in a gutter + dashed leader). Re-point `?tab=source → diagram`.
- **Left / Diagram:** REFINE only. CSS-only line-draw reveal (`stroke-dashoffset`,
  `--dash:9999→0`, `@supports` + reduced-motion gated) in stroke-priority order;
  notes become a legend (each note a 2px left tick matching its overlay layer); square
  the callout chips (radius 3px → 0–1px); flat active-tab edge indicator (not a fill).
- **Right reading panel:** add an 18–20px right-edge index gutter with mono
  `R.01–R.12` marks at `--t-ghost` (use padding, not negative offsets; guard behind
  min-width). Group with hairline rule breaks + ghost section labels (OBSERVATION /
  INTERPRETATION / ARTIFACT READ / RECORD) instead of per-module borders. 3-tier
  weight via **line only** (Oracle `border-top --line-strong`; Stat Reading / Mint
  Record a 2px left ledger rule; rest `--line-faint`). Tighten the readhead (24px
  display title is the sole display element; tagline → mono 9.5px `--t-ghost`).
  Aura chips → bottom-rule ledger entries (scoped to `.panel--reading` so the
  archetype chip is unaffected). Vary gap by register.
- **Dossier (below):** pull `.dplate__no` into a pinned left gutter (grid `48px 1fr`,
  wrap each plate in a row so `nth-of-type` rhythm still fires) as a continuous
  counting spine (22px mono `--t-ghost`, scaling to 28px/`--t-meta` on LOUD plates
  04/07; optional rotated margin numeral). Mark the room→archive threshold with a 2px
  `--line-strong` top rule + a centered flanked label. LOUD plates get a 2px
  `--line-strong` left ledger edge; in Halo the Oracle plate's left edge is the one
  accent moment. Add the queued top-edge shutter reveal (`clip-path inset` from top +
  opacity, `animation-timeline:view()`, `@supports` gated, reduced-motion fully
  shown). De-chrome `dplate__tag` to plain ghost mono.
- **Metrics:** redesign into filed instrumentation. Self-annotating diamond (label
  the rings, print each axis tier at its endpoint; pair with stacked tier readouts).
  Balance dot-on-pill → flat calibration ruler (ticks at −50/−25/0/+25/+50 + a 1px
  indicator). Fit matrix → single-column datasheet table (KEY | STATE | 2px score line
  | VALUE; top+bottom rule only). Signal Mix sorted descending, flat single-color
  fills (drop gradient), 50% tick kept. Disclaimer → flush-left filed header.

## 6. Dim-technical-lines treatment (the user's explicit request)

Lower the **tier** of hyper-technical readout text; never delete it (trust depends on
the instrumentation staying legible). Move along **two existing token ladders** — the
5-tier text ladder (`--t-display > --t-primary > --t-body > --t-meta > --t-ghost`) and
the 3-tier line ladder (`--line-strong > --line > --line-faint`). Dimming = stepping a
line down one or two tiers.

- **Technical readout text:** drop loud ALL-CAPS analysis/diagram/devnote lines from
  `--silver/--silver-dim` to `--t-meta`; demote secondary captions (readhead tagline,
  footer disclaimers, scan-sheet meta) to mono 9–9.5px `--t-ghost`. ALL-CAPS register
  stays; it just recedes a tier.
- **Chrome lines:** tab-bar border + active state `--line / 0.06 → --line-faint /
  0.04`; merely-dividing separators stay `--line-faint`. Reserve `--line/--line-strong`
  for the few lines doing real hierarchy work.
- **Chrome chips:** strip borders off status pills (`dplate__tag`, aura chips) → plain
  ghost mono or a single bottom rule.

**Floors (dim without hurting trust):** module **labels** that name a section stay at
`--t-meta` (the readable floor) — never drop a functional label to `--t-ghost`;
`--t-ghost` is reserved for decorative-structural elements (coordinate gutter,
numbering spine, telemetry); any number / tier band / receipt that is the actual
reading keeps its legible tier. You dim the **packaging** (the shout, the border, the
badge), not the **datum**.

## 7. Non-obvious pattern bank (scout result — pull for specific surfaces)

| Pattern | Reference | Serves |
|---|---|---|
| Column separators with inset coordinate ticks (graticule cadence) | Oscilloscope faceplates (Tektronix 465) | column dividers, stat fields |
| Numbered leader-line → margin note | Engineering blueprint annotation | frame notes, diagram |
| Micro-rule register lines behind a value | Banknote / certificate engraving (~3–4px pitch) | stat value fields |
| Tight datum stack with a hairline left edge | Museum object labels (V&A / MoMA / specimen tags) | record / metadata blocks |
| Full-width rule + flush-left `§ 04` mono code | Component datasheets (TI / Analog Devices) | right-panel + dossier section breaks |
| Header with mono clock + static channel-ID/state | Broadcast / mission-control headers | top bar |
| Faint orthogonal grid base layer (~40–60px pitch) | Technical drawing paper / scope screens | room background texture |
| Rotated running section numeral on the outer margin | Archive filing / ledgers / brutalist editorial | dossier plates |
| Dual-sided diverging-from-center bar | Audio spectrum analyzer / VU center-null | Metrics signal mix / balance |

## 8. Source verdict (decision input — not yet decided)

**MERGE + ELIMINATE.** Of the Source tab, only the 5 `src.analysis` lines are unique;
the scanframe duplicates the Diagram photo (same image, same focal marker, less
instrumentation) and the Capture Record duplicates the card face + readhead chip +
dossier plate 01. Recommendation: merge the photo into Diagram as `CLEAN | ANNOTATED`,
cut Capture Record (keep Lens+Light), relocate the 5 lines under `FRAME READ`, drop
3 tabs → 2, and re-point `?tab=source` to `?tab=diagram` (update `app.js` + the
screenshot pipeline in the same commit). Confirm with the user before cutting.

## 9. How to pull
Each task is independent and self-contained. Pull one → run it through the normal
pre-edit critique → implement as a single commit behind `baseline-v1` → screenshot-
verify at 1600×900 → update CHANGE_MAP/TASK_QUEUE/SESSION_BRIEF. Recommended order is
§4's ranking (low-risk first; #1 also satisfies the dim-technical request). Caveats to
carry: the Source merge must re-point the deep link + screenshot pipeline together;
notes-as-legend needs a small per-note layer key added to `data.js` (its own commit);
the card LOCK and keep-and-extend-diagram are invariants.
