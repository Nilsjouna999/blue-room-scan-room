# BR-S087 — Paid Reading Value / Visual-Reward Spec

**Status:** DESIGN SPEC — diagnosis + direction RATIFIED, **NOT IMPLEMENTED** · **Date:** 2026-06-21
**Scope:** the DEVELOPED / PAID ("shiny" Halo) reading — the right reading **panel** (renderReadingPanel,
`app.js:520-692`) + the 7-plate **dossier** (renderDossier, `app.js:715-956`). Analysis only; no runtime change.
**Grounding:** source read + self-captured paid reading (1600px, working tree == HEAD `a191769`). 13-role
read-only pipeline; suspects withheld from the cold diagnostician (anti-bias).

> **Next code lane is NOT the full implementation.** The only approved-as-next build is the **smallest
> validation prototype**: restyle `.dstat__evidence` so the evidence sentence reads as a written verdict, not a
> spreadsheet caption (§13). It must not start until the builder explicitly approves. The full design (§12/§14)
> is deferred and must not auto-become the next lane.

> **Builder-agreed key finding (preserve this):** the paid-reading problem is **not primarily colour or
> reveal**. It is **register flattening + duplication** — the prose/content is already STRONGER than expected,
> but it is rendered too much like admin/document text, and the paid panel repeats too much of what the dossier
> already says. Colour (Option D) and reveal are **secondary** — they only land after the register-lift +
> duplicate-cut.

---

## 1. Diagnosis (re-ranked; styling may not outrank content — and here content is proven strong)
- **PRIMARY (both passes) · No intra-section typographic hierarchy.** Card-keyed interpretive prose (stance
  "half stop-sign, half salute"; statNotes.evidence; hid.read; sceneRole) renders at the same ~13-14px grey as
  the mechanical field rows around it — craft writing dragged to admin texture. The Oracle is the one alive
  block ONLY because it has a distinct register (serif/italic, quotes, spacing, the lone `--halo-a` accent).
  Content is strong (data.js prose is vivid + image-specific; every paid slot is populated) → this
  presentational cause may rank first. `app.js:548,571,575,851-852,868`; `styles.css ~275/282/1290/2027` (flat)
  vs `1350/1402` (oracle).
- **PRIMARY (both) · Paid-state structural duplication.** The panel re-renders, verbatim and earlier, what
  dossier Plate 05/06 render richer: stance (571 vs 887), fit (575 vs 890), impact (581 vs 897), lore (589 vs
  898), aura (559 vs 885), sceneRole (565 vs 886), + a bare Mint Record dl (596-601) that mislabels card serial
  as "Serial". One oracle peak then 6-7 flat duplicate modules = the long peakless decay. Cutting them is
  depth-by-subtraction, Free-safe.
- **SECONDARY (both) · K3 uniform plate costume + back-loaded peaks.** 7 plates from one `dplate()` template;
  LOUD/quiet rhythm exists (`styles.css 1844-1867`) but too quiet to register; filler Plate 01 reads as loud as
  payoff Plate 07; first LOUD plate withheld to 04.
- **SECONDARY (cold-only) · Chroma at near-zero; the two sanctioned `--halo-a` accents are under perceptual
  threshold** (D4 value resolves near-grey on SRC-02 frost; D7 edge at 30%). Contingent on the structural fix.
- **TERTIARY (cold-only) · Panel→dossier seam unmarked** — no register change crossing into the "sealed back";
  markers (12px cue, 9.5px stamps) invisible at size. Highest-leverage felt shift.
- **TERTIARY (both) · K4 admin-grid texture fronting the read** — Source Record 01 + Mint Record 06 are
  key/value grids; 01 sits FIRST so the read opens on its driest surface. Placement, not the grid.
- **TERTIARY (both) · K2 repetition** confirmed but DOWNGRADED (prose differs each time = justified
  near-dup). **K1 IOU content REJECTED for paid** (placeholder "develops with the mint" strings are free-only).
- **Blandest region:** Dossier Plate 01 Source Record (`app.js:761-782`) — driest AND worst-placed (first).
- **What works + shared property:** card, Evidence Board (02), Oracle (07) read alive because each has a
  DISTINCT REGISTER the dull sections lack.

## 2. Section audit (tier · functional · verdict; cite)  [a = post-purchase justify · b = forward pull]
**Panel**
- Header readhead (`525-533`) · SUPPORT · SYSTEM — (a) minimal; (b) fails (tagline is a TOC) → rewrite as image-specific provocation.
- Oracle panelLead (`684-690`) · **HERO** · ORACLE-VOICE — passes both; the one alive block. Lock HERO weight.
- Stat Reading (`535-554`) · SUPPORT · EVIDENCE — (a) weak; (b) fails (identical free/paid) → add 1 cross-stat synthesis line.
- Aura Profile (`556-560`) · **CUT/MERGE** · SYSTEM — chips, no prose, dup of card → merge to Plate 05 / cut from panel.
- Scene Role (`562-566`) · PAYOFF · ORACLE-VOICE — (a) passes; (b) too small → elevate to a verdict line.
- Artifact Archetype (`662-675`) · PAYOFF · EVIDENCE — passes (a); (b) weak (conditional on ARCHETYPE_NOTES) → ensure coverage.
- Stance Read (`568-572`) · **HERO** · ORACLE-VOICE — passes both (deepest prose) → needs register separation.
- Fit Coherence (`573-576`) · PAYOFF · ORACLE-VOICE — (a) passes; (b) not distinguishable in grey → coda-verdict treatment.
- Frame Impact (`577-584`) · SUPPORT · EVIDENCE — meter, no sentence → add 1 interpretive clause to the label.
- Lore Density (`585-592`) · **CUT/MERGE** · EVIDENCE — thinnest (bar+adjective, no referent) → merge with Frame Impact.
- Mint Record panel (`593-601`) · **CUT/MERGE** · SYSTEM — receipt not a reading; dup of Plate 06 → cut from panel.
- Technical Receipts (`602-613`) · SUPPORT · EVIDENCE — keep collapsed; rewrite formulas head as a reader-facing craft note.
- Halo Badge (`648-654`) · SUPPORT · SYSTEM — fine as terminal stamp; don't expand/animate; move to panel end.

**Dossier**
- cue (`951`) · SUPPORT · SYSTEM — threshold ok; needs top-margin/rule to open as a distinct space.
- drecord-gate (`730`) · SUPPORT · SYSTEM — real serial good; 11px too small → 12px + more paid contrast.
- 01 Source Record (`761-782`) · SUPPORT · EVIDENCE — provenance anchor; indistinguishable weight → track rule on filing chain; demote plate hardest.
- 02 Evidence Board (`784-837`) · PAYOFF · EVIDENCE — passes both (paid unlock of all receipts = clearest earned depth) → border/tint so it reads as a board.
- 03 Stat Dossier (`839-860`) · SUPPORT · EVIDENCE — evidence prose strong; 4 identical rows → foreground evidence sentence, demote chip/bar.
- DEVELOPED RECORD strip (`953`) · SUPPORT · SYSTEM — invisible at 9.5px → 11px + 2px top-border.
- 04 Hidden Stat (`862-878`) · **HERO** · FUTURE-ROOM-VARIABLE — passes both; dossier climax + strongest forward-pull.
- 05 Fit + Aura (`880-906`) · PAYOFF · EVIDENCE — richest plate; stance dups the panel verbatim → extend with a synthesis sentence (make it sole home).
- 06 Mint Record (`908-940`) · PAYOFF · SYSTEM — correct collectible close; Material name invisible → foreground it; keep dmint__note.
- ARTIFACT PROVENANCE strip (`953`) · SUPPORT · SYSTEM — same fix as the other strip (one CSS rule).
- 07 Oracle (`942-948`) · **HERO** · ORACLE-VOICE — passes both; best closing sequence; timeline = best forward-pull copy.
- end mark (`954`) · SUPPORT · SYSTEM — raise contrast + top hairline → a deliberate terminus.

## 3. Hero / Payoff / Support / Cut
- **HERO (4):** panel Oracle · panel Stance · dossier 04 Hidden Stat · dossier 07 Oracle.
- **PAYOFF (6):** Scene Role · Archetype · Fit Coherence · Evidence Board 02 · Fit+Aura 05 · Mint Record 06.
- **SUPPORT (quiet):** Header · Stat Reading · Frame Impact · Technical Receipts · Halo Badge · Source Record 01 · Stat Dossier 03 · both register strips · cue · gate · end.
- **CUT/MERGE (3):** panel Aura · panel Lore Density · panel Mint Record (duplicate/thin; dossier keeps them).

## 4. Colour — recommend **D** (evidence-vs-Oracle contrast), intensify the EXISTING grammar, don't invent
A per-section palette = dashboard chrome unrelated to the photo (reject). B cold/blue Mint mood breaks the
warm-sand lock + promotes a quiet plate above the Oracle finale (reject/KILL). C is a motion question
mislabeled as colour. E ("no change") understates that the two existing accents are real but underweight.
**D completes what's there:** panel-oracle top-border tint via `color-mix` (technique at `styles.css 1428-1429`);
D4 Hidden Stat value (`2055`) confirmed to clear threshold; D7 edge 30%→~40-42% (below the 55% card-face
ceiling, `1068`); all PROOF bars stay silver/sand, no hue. **Contingent: do the cuts/re-tier FIRST.**

## 5. Reveal — scored; **resolved pick = A** (hierarchy/colour only, no motion)
desire · paywall · safety · elegance · gimmick · cost (decisive = desire/paywall/safety):
- A no reveal, hierarchy only — 4·1·5·4·1·1 — correct fallback; existing per-plate shutter suffices.
- B one Hidden-Stat micro-settle — 5·1·5·5·1·1 — reveal pass's pick (opacity-only, reduced-motion handled).
- C two reveals — 4·1·4·3·3·2 — finale feels laboured.
- D reveal Technical Receipts — 2·1·5·2·1·1 — animates the lowest tier; inverts hierarchy.
- E section-group scroll reveals — 3·3·2·2·4·4 — content-drip to a paid reader. **HARD BLOCK (§11).**
- F "Open Card Back" ceremony — 3·5·2·2·3·4 — structurally a second paywall. **HARD BLOCK (§11).**

The reveal pass scored B highest, but the anti-gimmick critic's forced-MODIFY + the reconciler **overrode to A**:
do NOT stack size + colour + motion on Hidden Stat — let content + scale + the (now-intensified) accent carry
the climax. B remains available as additive-only if A under-delivers.

## 6. Hidden Stat — exact treatment
KEEP Plate 04 as the dossier HERO climax, position unchanged. Differentiation = the existing 64px tier
scale-jump (`867`; word-tier shrinks to 26px, `styles.css 2077`) + the existing `--halo-a` accent, intensified
ONLY enough to clear perceptual threshold on low-chroma sources. Promote `.dhidden__read` (`868`) into the
serif/display lead register so the one-sentence reframe lands as the payoff. **Drop** the motion micro-settle
(Reveal A over B) — no third decorative layer. **Law-safe (binding):** the hidden/sealed stat stays an
ARTIFACT-reading variable (frame/scene/composition/gesture-geometry via conditionalStats — e.g. "Gesture
Geometry", "Field Silence") — NEVER a hidden person-score, "your real value", attractiveness, worth, or a
withheld better verdict about the person. Forward-pull comes from the conditional name being unpredictable from
Free = depth, not scarcity.

## 7. Oracle — exact treatment
KEEP BOTH locations — a teaser + the full track, not a duplicate: panel uses `src.oracle` (SHORT first-contact,
`687`) as the panel HERO; Plate 07 uses `d.oracle.full` + adjacency timeline (`944-947`) as the dossier finale
HERO. **MANDATORY: relabel** the Plate 07 heading "Oracle Read" → "Full Oracle" / "Oracle Record" (`943`) so the
duplicate ORACLE-READ heading (most echo-prone label) doesn't read as a repeat. Preserve the serif/italic/quote
register; nudge the D7 left-edge tint 30%→~40-42% (`1865-1866`, below the 55% ceiling) and add a matching
`--halo-a` top-border tint to the PANEL oracle module (color-mix, `1428-1429`). Keep the timeline verbatim — it
names adjacent CARD TYPES by visual kinship, never a person (law-safe), and is the strongest forward-pull copy.

## 8. Mint identity (what is uniquely Blue Room Mint here)
- **Visual:** the per-source `--halo-a/b/c` triad derived from the photo's palette ("Warm Glass Copper",
  "Cold Prism Frost"), propagating into the card face (55-78%), shiny badge gradient, D4 value, D7 edge,
  `.drecord__material` name, develop-door tints; the named material string is the only field naming what the
  card IS as a material object; the LOUD `nth-of-type(4)/(7)` cadence + ghost-mono spine gutter + register
  stamps = archival texture absent in Free.
- **Voice:** lapidary, artifact-directed — about the photo as a filed/developed/provenanced thing, never the
  person. Three instruments: (1) Oracle = verdict-from-a-distance (enacts, not captions); (2) `dmint__note` =
  "minted from [the exact moment]" — the only origin-event line; (3) Hidden read = analytical voice promoted to
  display register. Everything else (stats/evidence/receipts) is the PROOF apparatus that earns those moments.

## 9. Future-room continuity (universal vs per-room-variable)
- **Universal (every room shares):** the 7-plate order + `dplate()` anatomy + LOUD/quiet rhythm; the panel voice
  arc + readseam/panelLead split; the drecord-gate serial lineage (Object→Scan→Card→Mint) + edition label; the
  dossier cue/register/end archival marks; the Evidence Board cue→effect→basis→confidence method; Technical
  Receipts + FORMULAS; the ARCHETYPE_NOTES class→note lookup; the warm-sand token base + silver ramp + font
  stack; the `--halo-a/b/c` three-slot alias mechanism; the sceneRole/stance/fit/aura data types + register
  assignments; the oracle short/full/timeline three-part shape.
- **Per-room-variable:** the resolved `--halo` triad + material NAME; mint triggers; mint family/class suffix;
  the `dmint__note` origin line; the hidden stat NAME/value/read (conditional on dominant evidence type); the
  oracle adjacency neighbors; the 9 record field VALUES; aura chips; archetype instance title + class; the
  reads[] + statNotes prose; filing-chain length; receipt count + free/halo selection; photoTuning defaults.

## 10. Stress-test of the six instincts (forced kill/modify done)
1. Oracle = big voice moment — **KEEP** (relabel Plate 07 is MANDATORY — two hero quote-blocks collide without it).
2. Hidden Stat = special opening plate — **KEEP** position, **MODIFY** the differentiation budget (drop the motion; don't stack size+colour+motion).
3. Technical Receipts = collapsible — **KEEP** (genuine reference, not payment-gated); rewrite summary as a reader-facing craft note.
4. Colour reserved for special states — **MODIFY** — principle holds, DOSAGE wrong: intensify the two sanctioned accents (don't add a palette).
5. Mint = cold/silver/blue language — **KILL** ◄ forced kill. A cool palette is flashy-but-shallow: clashes with the warm-sand lock (cool `vault-*` was explicitly killed, `styles.css 9-16`) + promotes a quiet plate above the Oracle finale. Collectible warmth = content (foreground Material name + keep italic `dmint__note`), not chrome.
6. Reading = 2-3 moments not 20 boxes — **KEEP** — the binding principle; achieve it by SUBTRACTION (cut panel duplicates), never by manufacturing peaks with decoration.

## 11. Safety calibration table
**POSITIVE:** 4-tier re-tier (depth-forward; cuts only remove duplication) · rewrite header tagline as image-specific provocation · mark the panel→dossier seam as a real threshold · cut panel Stance/Fit/Frame-Impact/Lore (verbatim re-renders) · peak-every-~1.5-screens cadence.
**SAFE:** keep Oracle hoisted · Stat Reading as proof · Scene Role as verdict line · Receipts collapsed (reader-facing summary) · Halo Badge as terminal stamp · demote Source Record 01 · Evidence Board as first-half peak · foreground Stat Dossier evidence · Plate 05 sole home of aura/scene/stance/fit · foreground Mint Material + keep dmint__note · relabel Plate 07 "Full Oracle" · cut panel Aura + panel Mint Record · Colour Option E.
**SOFT RISK (ship only with the rule):**
- Move Archetype up → keep "Artifact class · …" chip + "a photo role, not a person" caveat verbatim.
- Hidden Stat as climax → must stay an artifact-reading variable, never a hidden person-score/worth.
- Colour A (per-tier palette) → rejected; if any tier-cue at all, restrict to `--halo-a` on HERO only.
- Colour B (cold Mint mood) → do NOT introduce a cold palette; keep Plate 06 on the warm `--halo-a`/silver ramp.
- Colour D (intensify `--halo-a`) → keep accent photo-sourced (never a fixed brand hue); D7 below the 55% ceiling; execute cuts/re-tier FIRST.
- Reveal B (Hidden-Stat settle) → opacity-only, reduced-motion forces opacity:1, no layout shift, no JS; a flourish on an artifact stat, NEVER a withhold/scarcity beat.
- Reveal C / D → avoid (cap climax reveals at one; never motion-reveal the lowest filing tier).
**HARD BLOCK (must not ship):** Reveal E (section-group scroll reveals = content-drip to a paid reader) · Reveal F ("Open Card Back" click ceremony = structurally a second paywall).

## 12. Strongest next design direction
Treat the developed reading as a **VOICE DOCUMENT**, not an archive table: fix is **register + subtraction +
cadence** — never new content, never withholding. (1) Grant every genuinely card-keyed sentence (stance, fit,
stat evidence, scene role, hidden read) the same typographic privilege the Oracle already earns — serif/lead
body, room to breathe, one restrained warm accent. (2) **CUT** the panel's verbatim duplicates of the dossier
(stance/fit/impact/lore/aura/scene-role/mint-record) so the panel becomes a tight voice column (Oracle → Stat
Reading → Archetype/Scene-Role verdict → quiet system close) instead of one peak + six echoes. (3) Re-tier the
dossier so payoff out-weighs filing (demote Source Record; let Evidence Board / Hidden Stat / Oracle carry a
peak in each scroll-half), mark the panel→dossier seam as a real threshold, and intensify the two
already-sanctioned `--halo-a` accents to clear threshold — completing the existing colour grammar, not inventing
one. Every kept beat exists in Free too → depth-forward, zero Free degradation. KILL: no per-section colour
taxonomy, no cold/blue Mint mood, no size+colour+motion stack on Hidden Stat.

## 13. Smallest next prototype (the ONLY approved-as-next build — gated on explicit approval)
Re-style ONE selector pair to test the core hypothesis (**register contrast = aliveness**) on the single
worst-located dry section, zero content/structure change: take dossier Stat Dossier evidence prose —
`.dstat__evidence` (`app.js:852`, `styles.css ~2027`) — and give it the Oracle's register: ~12.5px
`var(--muted)` → ~15px serif/display at `var(--text)`, add line-height + top-margin so the sentence breathes,
demote the tier-chip/bar to a quiet caption above it. Isolates the primary cause on strong real content
(statNotes.evidence), costs one CSS rule, reduced-motion-irrelevant, zero layout-shift, identical in Free + paid
(cannot make Free feel incomplete). If that block reads as a written verdict rather than a caption, the
direction is validated → roll the register lift to stance/fit/scene-role/hidden-read, THEN cuts, THEN colour.

## 14. Implementation spec (deferred — for a future BUILD session; spec, not code)
1. **Register lift** — `styles.css` body-prose selectors `.module__line`/`.module__prose` (~275/282),
   `.reads__item p` (~1290), `.dstat__evidence` (~2027), `.dhidden__read` (2064): promote toward the oracle's
   serif/lead register (exemplars `.module--oracle`/`.oracle` 1350/1402). Leave grids (`.drecord`/`.kv`/
   `.receipts__list`) on the flat ramp.
2. **Duplication cuts** — `app.js` renderReadingPanel PAID fork: remove panel Aura (556-560), Stance (568-572),
   Fit (573-576), Frame Impact (577-584), Lore (585-592), Mint Record (593-601); rebuild forkContent (689) so
   paid panel = archetype + sceneRole-as-verdict + receipts + badge. Plate 05 (880-906) becomes sole home of
   aura/scene/stance/fit/impact/lore + one synthesis sentence. **Free fork (lockedDeep 620-633) UNTOUCHED.**
3. **Re-tier + seam** — `dplate()` rhythm (`styles.css 1844-1867`): widen LOUD/quiet delta, demote Plate 01
   hardest; true break before `.dossier__cue` (951) — top margin + hairline; bump `.dossier__register` 9.5→~11px
   + 2px top-border (1733-1800).
4. **Colour** — intensify `--halo-a` only at `.dhidden__val` (2055) + `.dplate--oracle` edge (1865-1866,
   30→~40%); add panel `.module--oracle` top-border tint via color-mix (1428-1429). PROOF bars (1343/2021) stay
   silver/sand.
5. **Relabel** Plate 07 head (943) → "Full Oracle".
   - **data.js needs NO changes** — the prose is already strong.
   - **Sequence:** register lift + cuts FIRST, colour intensification AFTER (the accent must land on
     already-spaced sections).
   - Cross-refs to honor: `HALO_GATE_BOUNDARY_V1` (Free complete / no exact locked counts), `MAGNETISM_MODEL_V1`
     (no scarcity/streak/"unlock your score"), `DESIGN_TOKENS` (warm-sand lock, dossier rhythm), `COPY_SYSTEM`
     (artifact-not-person voice), `PERFORMANCE_BUDGET` (CSS-only, reduced-motion-safe).
