# Blue Room: A Pacing Spec & "Minted Number" Typography System for the Archive Dossier

> **⚠ SUPERSEDED (numeric register) — 2026-06-20 (BR-S074).** The "Minted Number" half of this doc —
> BAN / "Big-Ass Number" hero stats, 0/25/50/75/100 calibration-tick gauges, and big-value-over-tiny-label
> numeric stat readings (TL;DR bullets 2–3; findings #3, #6, #7, #10) — is **SUPERSEDED** by LOCKED canon:
> **no public 0–100; tier bands only** (PROJECT_OS §9 · HALO_GATE_BOUNDARY · reaffirmed by BR-S070's
> band-discrete bars and BR-S071's no-figure price). Do **not** build minted-number hero stats or 0–100
> gauges from this doc. STILL VALID (number-agnostic): the 8-pt rhythm + loud/quiet pacing, content-width
> measures, the narrative arc + climax placement, the colophon end-record, and serial typography
> (monospace · wide tracking · leading zeros). Use only those.

## TL;DR
- **Fix the rhythm by breaking uniformity in three dimensions at once: width (narrow prose ~62ch / medium tables ~820px / wide breakouts), vertical gap (a loud/quiet sequence built on multiples of 8 — 96px standard, up to 256px before climaxes), and loudness (treat the 7 plates as a narrative arc, not a list).** Put the Hidden Stat climax at ~75–80% of the scroll (plate 04 of 7 is correct) and let the Oracle be a short, isolated denouement.
- **Make numbers feel "minted," not typed, with three moves: (1) tabular lining figures via `font-variant-numeric: tabular-nums lining-nums`, (2) an engraved text-shadow recipe tuned for dark backgrounds (dark shadow above, faint light below), and (3) extreme value-vs-label contrast** — the value 4–8× the label size, bold, in a high-contrast warm-white; the label tiny, uppercase, letter-spaced, and muted. Inter and IBM Plex Mono both ship true tabular figures and slashed zeros; Cormorant Garamond's figures are oldstyle/proportional by default and should not be used for aligned data.
- **Render the four stats as instrument readings, not progress bars:** thin tracks with calibration tick marks (0/25/50/75/100), a precise value marker, and a segmented or capped fill — borrowing the visual grammar of VU meters and gauge clusters.

## Key Findings

**1. Loud moments in acclaimed long-reads are rare and deliberately set up by quiet stretches.** NYT "Snow Fall" (2012 Pulitzer/Peabody) was explicitly paced so that calm, slow sequences preceded data-driven action; the NYT graphics team noted, "The Cascades flyover, in the beginning was given a nice slow movement. Readers were just becoming familiar with the story at that point, and it allowed them to absorb the topography of the setting." The Pudding builds visual essays on a clear three-act arc with large section headings ("Making it big" / "How long it takes to make it" / "Everybody else"), and founder Russell Goldenberg describes the shape of his NYC-bands piece literally as a "symmetrical v-shape": 7,000 dots for bands at small venues narrowing until "only 11 bands end[ing] up playing large venue. This is the tip of the 'v' and the most narrow data point of the story." The lesson for Blue Room: loudness must be earned by preceding quiet.

**2. Premium editorial spacing is built on multiples of 8, and importance is signaled by giving a section more space before it.** The 8-point grid (Material, Apple, Atlassian, Intuit all use it) produces a spacing scale of 8/16/24/32/48/64/96/128/160/192/256. The "internal ≤ external" rule (external spacing ≥ internal padding) keeps groups cohesive. White space is the primary tool of emphasis: "an element surrounded by generous space commands more attention," and luxury brands lean on this deliberately. Climactic sections should get 1.5–3× the standard section gap.

**3. Content width should change with content type.** Robert Bringhurst's measure (*The Elements of Typographic Style*) is the canonical rule: "Anything from 45 to 75 characters is widely regarded as a satisfactory length of line for a single-column page set in a serifed text face... The 66-character line (counting both letters and spaces) is widely regarded as ideal. For multiple column work, a better average is 40 to 50 characters." On screen, ~66ch ≈ 580–720px at 16px. Tables and structured data tolerate wider measures; breakout moments go full-bleed. Apple's product pages are "a series of mini landing pages stacked vertically," alternating full-bleed hero moments with contained text, and the design principle is explicitly "alternate full-bleed impact with whitespace breathers."

**4. Narrative theory puts the climax at ~75–95% of the way through, with a short denouement after.** The three-act structure places Act III's climax early in the final quarter; MasterClass states the climax "typically occurs around 90% of the way through the narrative in order to have the greatest impact... If the climax happens too soon, the resolution will be too long, and readers will become disengaged." A long, meandering post-climax is "one of the most common pacing mistakes." This directly validates placing the Hidden Stat (the second-loudest, the climax) at plate 04–05 of 7 and keeping the Oracle (plate 07) a brief, resonant denouement.

**5. Colophons are the established "end of record" device.** Per Chicago Manual of Style usage, "The last page of a specially designed and produced book occasionally contains a colophon—an inscription including the facts of production" — the fonts, paper, and printing method, usually on the last page. Fine-press colophons also state the print run ("300 copies, of which this is number 47"), set small, centered, and set apart. The word derives from Greek *kolophōn*, "summit" or "finishing touch." It treats the book "as a made thing, not merely a vessel for content" — exactly the register Blue Room's Mint Record + end-mark should hit.

**6. Tabular lining figures are the typographic signal of authoritative numbers.** `font-variant-numeric: tabular-nums` makes every digit the same width so columns align; lining figures sit on the baseline at cap height. Fonts.com/Monotype: "Tabular lining figures are the preferred style for columns of numbers, such as tables, price lists, financial data." Microsoft's standard: tabular "aids in setting numerals for data in columns." Bloomberg commissioned Matthew Carter to draw both proportional and monospaced fonts for the Terminal, with finance-specific glyphs (fraction granularity to 1/64). Inter ships `tnum`, `zero` (slashed zero), and lining figures; IBM Plex Mono is monospaced by nature; Cormorant Garamond defaults to lining+proportional but its TeX package exposes oldstyle/tabular options — on the web its figures are proportional oldstyle, so it is wrong for aligned stat columns.

**7. The BAN ("Big Ass Number") pattern is the dashboard convention for hero stats.** The term is commonly attributed to Steve Wexler (*The Big Book of Dashboards*); his Data Revelations post "In Praise of BANs (Big-Ass Numbers)" (Feb 15, 2017) frames them as "large, occasionally overstuffed Key Performance Indicators (KPIs)" placed "right at the top." Jonathan Schwabish (PolicyViz) defines them as numbers that "help users quickly understand the main takeaway." The concrete formatting consensus: bold big number + muted gray label, with The Data School's Tableau example using a 28pt value over a 14pt label (a 2:1 ratio) with the label placed underneath ("With BANs, they almost can never be too big... make any text that is accompanying them quite small").

**8. Engraved/embossed effects come from paired text-shadows tuned to the background.** On a dark surface, an engraved (debossed) look uses a dark shadow offset up/left and a faint light shadow down/right — e.g., `text-shadow: 0 -1px 0 rgba(0,0,0,.6), 0 1px 0 rgba(255,255,255,.12)`. The effect only works when text color and shadow are tuned to the exact background — adjust all three together.

**9. Serial numbers read as authoritative through monospace, wide tracking, and leading zeros.** Banknote serials use OCR-B, are fixed-length (Euro: 12 characters, first a letter then 11 digits), printed by letterpress numbering machines, and may carry check digits. Collectors prize leading-zero "solids" like 00000007. The grammar to borrow: IBM Plex Mono, wide letter-spacing, slashed zero, leading zeros ("0007").

**10. Premium meters use calibration, not chunky fills.** Gauge UI grammar (MATLAB/FusionCharts) is built on major and minor tick marks, scale color limits, and a precise needle/value marker. VU meters are calibrated against a reference level with marked headroom. The takeaway: thin track + tick marks at 0/25/50/75/100 + a sharp value marker reads as an instrument; a thick rounded fill reads as a web progress bar.

## Details

### PART 1 — The Pacing Spec for the 7-Section Dossier

**The core diagnosis.** The dossier currently fails because all three pacing variables — width, vertical gap, and internal padding — are held constant. A paced document varies all three. The fix is to assign each plate a *width class*, a *gap-before multiplier*, and a *loudness role* in a deliberate quiet→loud→quiet→LOUD→quiet→quiet→resonant sequence that mirrors a narrative arc.

**Spacing scale (8pt grid).** Define tokens:
- `--space-quiet: 64px` (tight intra-section)
- `--space-standard: 96px` (default gap between plates)
- `--space-breath: 128px` (a beat of rest)
- `--space-loud: 192px` (setup before a loud moment)
- `--space-climax: 256px` (the big inhale before the climax / before the finale)

**Width classes:**
- `--measure-read: 62ch` (~600–680px) — reading prose, the Oracle quote
- `--measure-data: 820px` — metadata tables, mint record, stat rows
- `--measure-board: 1040px` — evidence grid
- `--measure-bleed: 100vw` — full-bleed breakout for the Hidden Stat

**Per-section assignment:**

| # | Plate | Width | Gap before | Loudness | Divider treatment |
|---|-------|-------|-----------|----------|-------------------|
| 01 | Source Record (metadata) | `--measure-data` 820px | — (follows hero) | Quiet — establishing | Numbered plate label "01 / SOURCE RECORD", thin rule below |
| 02 | Evidence Board (6 cards) | `--measure-board` 1040px | `--space-standard` 96px | Medium — widens, more visual energy | "02 /" plate number, grid breaks wider than prose |
| 03 | Stat Dossier (4 bars + prose) | `--measure-data` 820px | `--space-breath` 128px | Medium — the data warm-up | "03 /" plate number |
| 04 | Hidden Stat (big reveal) | `--measure-bleed` full-bleed | `--space-climax` 256px | **LOUDEST (climax)** | No plate chrome — let it breach the grid; full-bleed, near-silent surround |
| 05 | Fit + Aura (interpretive) | `--measure-read` 62ch | `--space-climax` 256px (recovery) | Quiet — falling action | Return to narrow measure; ornamental rule or asterism to reset |
| 06 | Mint Record (provenance) | `--measure-data` 820px | `--space-breath` 128px | Medium-quiet — the "ledger" | "06 /" plate number, table styling |
| 07 | Oracle Read (quote finale) | `--measure-read` 62ch, centered | `--space-loud` 192px | Loud-but-soft (denouement) | Centered serif, isolated; followed by colophon/end-mark |

**The narrative logic.** Plates 01–03 are *rising action*: they widen and gain visual energy (table → grid → data bars) while staying on the standard rhythm. Plate 04 is the *climax* at ~75–80% of scroll depth — exactly where narrative theory wants it. It earns its loudness through the largest gap (256px of near-empty dark space) immediately before it, and by breaking to full-bleed when every prior plate was contained. Plate 05 is *falling action* — the deliberate return to a narrow 62ch measure signals "we are descending," giving the reader recovery. Plate 06 (Mint Record) is the quiet ledger that grounds the collectible in provenance. Plate 07 (Oracle) is the *denouement*: short, centered, isolated, in the largest serif on the page — loud in type size but quiet in surrounding silence.

**Why the Hidden Stat must come before the Oracle.** The Hidden Stat is a quantitative climax (peak intensity); the Oracle is an emotional resolution. Putting the loudest *visual/numeric* moment at 04 and the loudest *emotional* moment at 07 gives the page two distinct peaks separated by a recovery valley — the "bumpy" multi-peak arc that keeps long scrolls engaging. If the Oracle tried to be visually loud too, it would compete; its power comes from contrast with the silence around it.

**Chapter-divider treatments.** Use numbered plate markers ("01 / SOURCE RECORD") in IBM Plex Mono, small and letter-spaced, as the consistent rhythm marker — the digital equivalent of numbered archive plates. Reserve an ornamental rule or asterism (✳ or ———) for the two *transitions that matter*: entering the climax (04) and entering the denouement (07). Do not put dividers everywhere; their scarcity is what makes them signal importance.

**How the page should END.** After the Oracle quote, drop into a colophon-styled "END OF RECORD" block: small, centered, IBM Plex Mono, muted warm-grey, set apart by `--space-breath` (128px) of space above. It should carry "facts of production" in the archive-luxury register — the mint serial (e.g., "BLUE ROOM · No. 0007 / 0500"), the source accent material, a timestamp, and a small seal/stamp glyph. This mirrors the fine-press colophon ("300 copies, of which this is number 47") and gives the document a definitive, collectible close rather than just stopping.

### PART 2 — The "Minted Number" CSS Recipe Set

**Foundational tokens.** Establish numeric figure handling globally for any element displaying stats:

```css
:root {
  --ink-hi:   #f2efe9;   /* warm near-white, value tier */
  --ink-mid:  #b7b2a8;   /* warm grey, secondary */
  --ink-low:  #6f6b63;   /* muted, labels */
  --bg-plate: #0e1014;   /* near-black plate */
}

/* Apply to every numeric display */
.tabular {
  font-variant-numeric: tabular-nums lining-nums slashed-zero;
  /* fallback for older engines */
  font-feature-settings: "tnum" 1, "lnum" 1, "zero" 1;
}
```

Inter for values/UI numbers, IBM Plex Mono for serials/technical labels. Do **not** set stat values in Cormorant Garamond — its web figures are proportional oldstyle and will not align in columns.

**(a) Hero stat treatment — the Hidden Stat "88 / GESTURE AUTHORITY".** This is the BAN. Make the number enormous relative to its label, engraved into the dark plate:

```css
.hero-stat {
  font-family: "Inter", sans-serif;
  font-weight: 800;
  font-size: clamp(120px, 22vw, 320px);
  line-height: 0.9;
  color: var(--ink-hi);
  font-variant-numeric: tabular-nums lining-nums slashed-zero;
  letter-spacing: -0.02em;        /* tighten large display digits */
  /* engraved on dark: dark shadow above, faint light below */
  text-shadow:
    0 -2px 1px rgba(0,0,0,0.65),
    0 2px 1px rgba(255,255,255,0.10),
    0 1px 30px rgba(0,0,0,0.55);  /* depth glow into the plate */
}
.hero-stat__label {
  font-family: "IBM Plex Mono", monospace;
  font-size: clamp(13px, 1.1vw, 18px);   /* ~6–8% of the value size */
  font-weight: 500;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--ink-low);
}
```

The value-to-label size ratio here is deliberately extreme (≈8–10:1) because this is the page's climax; the BAN literature notes the number "almost can never be too big," with the accompanying text "quite small." Pair the giant number with a faint copper/violet/frost accent rule or the value marker drawn from the source's accent material.

**(b) Card stat block — the four currency stats on the collectible card.** Here legibility at small size matters; use a tighter but still strong ratio:

```css
.card-stat { text-align: left; }
.card-stat__value {
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 44px;
  line-height: 1;
  color: var(--ink-hi);
  font-variant-numeric: tabular-nums lining-nums slashed-zero;
  text-shadow: 0 -1px 0 rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.08);
}
.card-stat__label {
  font-family: "IBM Plex Mono", monospace;
  font-size: 11px;            /* ~4:1 value:label */
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--ink-low);
}
```

A 3–4:1 value:label ratio is the workable range for compact stat blocks (broadcast/scoreboard and KPI tiles use bold-big value + muted-uppercase-small label); the Tableau BAN convention's 2:1 (28pt/14pt) is the conservative floor, suitable only when space is tight. The tabular figures guarantee that "88", "100", and "7" all occupy the same column width so the four stats align into a neat ledger regardless of value.

**(c) Serial / mint-record number treatment.** Borrow banknote grammar — monospace, wide tracking, leading zeros, slashed zero:

```css
.serial {
  font-family: "IBM Plex Mono", monospace;
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 0.18em;
  font-variant-numeric: tabular-nums lining-nums slashed-zero;
  color: var(--ink-mid);
}
```
Render values with fixed-width leading zeros ("No. 0007 / 0500"), echoing the fixed-length, OCR-B banknote serials (Euro notes: 12 characters, a letter followed by 11 digits). This makes the collectible read as a numbered, authenticated object.

**Value-vs-label ratios summary.**
- Hero/Hidden Stat (climax): **8–10:1**, value 800-weight near-white, label tiny mono muted.
- Card stat block: **3–4:1**, value 700-weight, label 11px mono uppercase muted.
- Inline table figures (Source/Mint): **~1:1** size, but distinguish by weight (value medium, label regular) and tone (value `--ink-hi`, label `--ink-low`).
- Universal: value high-contrast warm-white; label muted, uppercase, letter-spaced 0.18–0.28em. This bright-value / muted-label tone contrast is the same convention used by scoreboard graphics and KPI dashboards.

### PART 3 — Premium Stat Bars / Meters

Render each 0–100 stat as an instrument reading, not a progress bar. Specific dimensions:

- **Track:** thin — 3–4px tall, full `--ink-low` at ~18% opacity, square or 1px-radius ends (not pill-rounded). Width = the stat column (e.g., 280–360px).
- **Calibration ticks:** minor ticks every 10 units (1px wide, 6px tall, `--ink-low` ~30%), major ticks at 0/25/50/75/100 (1px wide, 10px tall, `--ink-mid`), with tiny mono numerals under the majors. This is the single move that converts "progress bar" into "gauge."
- **Fill:** either (a) a thin solid fill in the per-source accent (copper/violet/frost), or (b) a segmented fill — 20 discrete 4px segments with 2px gaps, lighting up to the value, echoing an LED VU meter. Segmented reads more "instrument."
- **Value marker:** a precise vertical hairline (2px, `--ink-hi`) at the value position, optionally with the numeral floating above it in the card-stat style. This is the needle/peak indicator.
- **End caps:** small 1px ticks at 0 and 100 to bound the scale, like a gauge's limit marks.
- **Headroom cue (optional):** tint the 88–100 zone of the track faintly warmer, echoing the VU meter's marked "headroom"/red zone — useful since the product's hidden stat ("88") sits in that elite band.

A meter built this way — thin track, calibrated ticks, sharp value hairline, optional segmentation — reads as a precision instrument and reinforces that the four stats are the product's measured "currency."

## Recommendations

**Stage 1 — Break uniformity (highest impact, do first).**
1. Implement the five spacing tokens and assign the per-section gaps from the table. The single biggest fix is the 256px inhale before the Hidden Stat and the full-bleed breakout there.
2. Assign the three width classes. Pull the Oracle and Fit/Aura plates in to 62ch; widen the Evidence Board to 1040px.
3. Add numbered plate markers ("01 /") in IBM Plex Mono as the consistent rhythm device.
*Benchmark to change course:* if scroll-depth analytics show drop-off before plate 04, the rising action is too long or too flat — compress 02/03 or add a smaller loud beat at 02.

**Stage 2 — Mint the numbers.**
4. Add the global `.tabular` figure handling and confirm Inter/IBM Plex Mono are loaded with the features active (test "0" renders slashed, "88"/"100" align).
5. Implement the hero-stat, card-stat, and serial recipes. Tune the engraved text-shadow against the *actual* plate background — the effect breaks if the shadow colors don't match the exact `--bg-plate`.
6. Render serials with leading zeros and the colophon end-mark.

**Stage 3 — Instrument the bars.**
7. Replace progress-bar fills with thin tracks + calibration ticks + value hairline. Prototype both solid and segmented fills and pick per the brand's level of "technical" feel.

**Stage 4 — Land the ending.**
8. Build the "END OF RECORD" colophon block with mint serial, source material, timestamp, and seal glyph, separated by 128px of space.

*Thresholds:* If the engraved shadow is invisible at the user's contrast/brightness, increase the light-below alpha toward 0.14 but never past where it muddies the glyph. If tabular alignment still looks off, verify the font actually carries `tnum` (use Wakamai Fondue to inspect).

## Caveats
- **The "value 3–5× label" rule is a practitioner heuristic, not a documented standard.** The strongest *sourced* ratio is The Data School's Tableau BAN example at 2:1 (28pt/14pt). My recommended 3–4:1 (cards) and 8–10:1 (hero) are design judgments calibrated to Blue Room's archive-luxury register, not citable rules — treat them as starting points to tune by eye.
- **Cormorant Garamond figure support is limited on the web.** The oldstyle/tabular options documented exist in its TeX package; in browser use you get proportional lining/oldstyle figures, which will not align in columns. Keep all aligned numbers in Inter or IBM Plex Mono.
- **Engraved text-shadow is background-dependent and can fail accessibility.** The effect relies on low-contrast shadows; ensure the *base* text color alone meets contrast against the plate, treating the shadow as decoration only.
- **Narrative-arc percentages are guidance, not law.** "Climax at 75–90%" comes from prose/screenwriting; applied to a 7-plate scroll it validates plate 04–05, but the exact felt position depends on plate heights — verify with a real scroll-depth profile.
- **Specific BAN-term attribution is contested.** Steve Wexler is commonly credited with coining "BAN," but at least one BI source notes the originator isn't definitively documented; present it as "commonly attributed."
- **One comparison is omitted rather than asserted.** I was unable to complete searches on annual-report key-figure spreads before the search budget closed; the BAN and dashboard figures above come from a focused follow-up and are sound, but no annual-report-specific datapoint is claimed here.