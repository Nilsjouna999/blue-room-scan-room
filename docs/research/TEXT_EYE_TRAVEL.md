# Blue Room — Text Color Grading & Eye-Travel Architecture for a Dark "Archive Luxury" UI

## TL;DR
- **Your core problem is a flat tonal band, not a color problem.** Every premium dark system builds 4–6 *measurable* text tiers — Material Design uses 87%/60%/38% white opacity; Apple's dark labels run 100% / 60% / 30% / 18% white; Radix reserves step 12 for high-contrast text and step 11 for low-contrast text. Blue Room currently uses ~3 tones crammed into one luminance range; the fix is a named 5-tier scale spanning a much wider contrast spread (≈15:1 down to ≈2:1) plus deliberate font-role assignment.
- **Build one "focal map": exactly one loud moment and at most one accent gesture per viewport.** Eye-tracking (Nielsen Norman Group) shows users scan in F / Z / layer-cake / spotted patterns, and that on an average page they read *at most 28% of the words — 20% is more likely* (Nielsen, "How Little Do Users Read?", 2008). A strong layout converts the F-pattern (a failure state) into the efficient "layer-cake" by giving headings unmistakable weight. The Von Restorff (isolation) effect means a thing is noticed only when everything around it is quiet — so demote ~90% of the page and let the copper→violet gradient appear once per screen.
- **Warm-tint your greys and stage loudness across the 7 sections.** Pure neutral grey reads "dead" on near-black; tint toward your copper accent (a Radix Sand-style warm grey, hue ≈60°) for the dossier's archival warmth. Assign quiet tables (Source Record, Mint Record), medium texture (Evidence Board, Stat Dossier, Fit+Aura), and two loud breakouts (Hidden Stat big-number, Oracle Read finale).

## Key Findings

### 1. Every serious dark system ships measurable text tiers — yours doesn't span enough range
- **Material Design** dark theme, verbatim from Google's "Text legibility" spec / dark-theme codelab: *"High-emphasis text has an opacity of 87%... medium emphasis text is applied at 60%, and disabled text uses an opacity of 38%. High priority text isn't pure white because #FFFFFF... would visually 'vibrate' against our dark backgrounds."* High = #FFFFFF @ **87%**, medium = **60%**, disabled = **38%**.
- **Apple HIG dark mode** semantic labels (exact iOS values): `label` = #FFFFFF (rgba 255,255,255,1.0); `secondaryLabel` = #EBEBF5 @ **0.60** (#EBEBF599); `tertiaryLabel` = #EBEBF5 @ **0.30** (#EBEBF54C); `quaternaryLabel` = #EBEBF5 @ **0.18** (#EBEBF52D). Note Apple tints its dark labels slightly cool (#EBEBF5, not pure white) and pairs them with backgrounds #000000, #1C1C1E (secondary), #2C2C2E (tertiary).
- **Radix Colors** 12-step convention: steps **11–12 are text** (11 = low-contrast, 12 = high-contrast); **9–10 are solid accent fills** (9 = purest hue, highest chroma); 3–5 component backgrounds; 6–8 borders. Text steps are guaranteed to hit contrast targets against the matching background steps. Slate Dark (cool, hue ≈220°): step 12 = #EDEEF0, step 11 = #B0B4BA, backgrounds #111113/#18191B/#212225. Sand Dark (warm, hue ≈60°): step 12 = #EEEEEC, step 11 = #B5B3AD, backgrounds #111110/#191918/#222221.
- **Vercel Geist** ships a deliberately *pure* (untinted) gray and never uses pure #000 — its near-black for fills is #171717. Geist's restraint ("99% achromatic," one prismatic gradient per screen, always behind the triangle mark) is itself the premium signal. Blue Room should adopt that economy but, unlike Vercel, tint *warm* to match the archive-luxury mood.
- **WCAG mapping:** body text should clear **4.5:1**; large text (≥24px, or ≥18.66px bold) and UI components need **3:1**; **7:1** is the AAA target for highest-emphasis reading text. Map your top tiers to 7:1+ and your faint/label tiers to the 3:1 floor — never below.

### 2. Why pure white hurts, and what premium dark UIs actually ship
- Pure-white-on-pure-black causes **halation** — light text appears to "bleed"/glow against the dark field, a fuzzing effect especially severe for the large share of readers with astigmatism (research cited by Level Access notes >28% of children 5–17 have ≥1.0 D of astigmatism; roughly half the population has some degree). Off-white text and off-black backgrounds (not #000) reduce it.
- This is exactly why Material caps high-emphasis at 87% and Apple ships #EBEBF5 rather than #FFFFFF. Your background spec (#08090b–#14161b) is correctly off-black; your text just needs to (a) stop near ~#F2EFE9 rather than push toward #FFF for the loudest tier, and (b) spread the lower tiers far wider.

### 3. Warm vs cool grey tinting — go warm to match copper
- Pure neutral grey looks "dead" because it carries no hue to harmonize with accents. **Radix's tinted greys** each carry an explicit underlying hue: **Slate** = blue, **Sage** = green, **Olive** = lime, **Mauve** = purple, **Sand** = yellow/warm, plus pure **Gray**. Radix's own guidance: choose the grey "saturated with the hue closest to your accent hue" for a more colorful, harmonious feel.
- Blue Room's primary accent material is **warm copper (#c98a5e)** with violet secondary. A warm grey (Sand-style, hue ≈55–60°) tints the whole text/surface system toward the copper, reinforcing the aged-archive/patina mood. The cold frost-cyan and violet then read as deliberate cool counterpoints rather than fighting a cold-grey base. Avoid Slate (blue) grey — it would fight copper and read "tech/SaaS."
- Luxury/heritage precedent: **Rolex** sets its wordmark in a lightly modified **Garamond**; **Audemars Piguet** historically used an elongated Times Roman. Heritage watch houses lean on warm, classical serif lettering — your Cormorant Garamond display is directly in that lineage. For metallic text, the standard CSS technique is `linear-gradient` + `background-clip: text` + `-webkit-text-fill-color: transparent` (recipe below) — reserve it for ONE element (the trophy card title or the Oracle finale), never body text.

### 4. Type-role assignment: serif / sans / mono must occupy non-overlapping tiers
- The proven editorial move is **one expressive lead + neutral support.** Allan Haley (then Director of Words & Letters, Monotype) in "Mixing Typefaces" (Fonts.com): *"There is a typographic rule of thumb for combining fonts from unrelated families: The more dissimilar the type designs, the better the mix... one typeface should take the lead, and the other should be a supporting player."*
- Concrete tier mechanics that create unmistakable hierarchy:
  - **Mono labels:** uppercase, small (10–12px), wide-tracked (letter-spacing 0.08–0.14em; uppercase needs +tracking or it looks cramped). This is the museum-specimen "eyebrow/kicker" treatment — it signals "I'm metadata, not prose."
  - **Serif display:** large (28–64px), near-zero or slightly negative tracking, lighter weight (light text on dark looks bolder, so use lighter weights in dark mode per Material).
  - **Sans body/UI:** 16px, line-height ~1.6, neutral tracking.
  - Type-scale jumps should be **≥1.25×** between levels or users can't perceive the difference; cap at **~3–4 distinguishable levels** (more collapses into mush).
- Numbers: use **tabular lining figures** for any aligned/stat data (every digit same width; IBM Plex Mono qualifies). Avoid oldstyle figures in tables. This is the financial-terminal/Bloomberg credibility cue.

### 5. Eye-travel research — the named patterns and what triggers them
- **NN/g identifies four text-scan patterns:** **F-pattern** (dense text, no subheads, low motivation — a *failure state* of weak hierarchy); **layer-cake** (eyes hit headings/subheads, skip body — the *most efficient* pattern, triggered by clear, visually-distinct subheads); **spotted** (hunting for a specific datum — a number, name, price); **commitment** (a motivated reader reads thoroughly). The design goal is to *engineer the layer-cake* by making section headers unmistakable.
- **Z-pattern** governs minimal, image-led layouts (your three-column hero); **F-pattern** governs text-heavy ones (your dossier body). Design the hero for a Z sweep and the dossier sections for a layer-cake.
- **Visual weight factors:** size, value/contrast, color saturation, isolation/whitespace, faces, motion. Eyes jump in saccades (~200–300ms fixations); high-contrast, large, or isolated elements become "fixation magnets" via pre-attentive processing.
- **Von Restorff (isolation) effect** (identified by Hedwig von Restorff, 1933): the item that differs is the one remembered — but only if everything else is uniform. Since users read at most ~28% of words (20% more likely), the focal point decides *which* fraction gets seen.
- **One-focal-point-per-viewport** is explicitly articulated in practitioner guidance: "One focal point per screen section. That's it. Two maximum, and only if they're spatially separated enough to not compete." Enforce with the **squint/blur test** — if more than one thing stands out when you blur the screen, the hierarchy is broken.

### 6. Long-scroll pacing — alternate loud and quiet, stage a finale
- The **NYT "Snow Fall: The Avalanche at Tunnel Creek"** (by John Branch, published Dec 20, 2012; 2013 Pulitzer Prize for Feature Writing and a Peabody Award that called it "a spectacular example of the potential of digital-age storytelling"; built by a team of ~11 over roughly six months) established scroll pacing that "mirrors the rhythm of the story: calm to chaos." The consistent craft principle (echoed by Apple product pages, Spotify Wrapped's sequenced reveal, award sites): **alternate high-energy "wide shots" with quiet "close-ups,"** never run sections at equal volume, and reserve full-bleed breakout moments for peak beats.
- **Section spacing** should ride a scale — the **8-point grid** (8/16/24/32/48/64…) is the Apple/Google/Material standard. For premium editorial rhythm: ~24px within groups, **32–48px between sub-blocks, 64px+ (often 96–160px) between major sections**. Inter-section whitespace is itself a loudness signal — more air = more importance.
- **Loudness assignment for your 7 sections** (the heart of the fix — they currently have equal weight):
  - **01 Source Record (metadata table): QUIET.** Mono labels, tight rows, faint dividers. A "rest" section.
  - **02 Evidence Board (6 receipt cards): MEDIUM.** Texture via repetition; one card may carry a single accent tag — not all six.
  - **03 Stat Dossier (4 stat bars + prose): MEDIUM.** Bars use restrained accent fills; prose in body tier.
  - **04 Hidden Stat (big-number reveal, "88 Gesture Authority"): LOUD breakout.** Full-bleed, huge tabular figure, generous whitespace isolation, the single accent/gradient moment of the lower page.
  - **05 Fit + Aura Layer: MEDIUM.**
  - **06 Mint Record (serial/provenance table): QUIET.** Mono, archival, ledger-like. Second rest.
  - **07 Oracle Read (centered serif quote finale): LOUD finale.** Maximal whitespace, large Cormorant serif, centered, optional metallic-text treatment. The page's emotional crescendo.
- The rhythm becomes **quiet → medium → medium → LOUD → medium → quiet → LOUD-finale** — a paced narrative rather than a uniform stack.

### 7. Accent economy — the 60-30-10 rule, inverted for dark
- **60-30-10** (interior-design origin): 60% dominant, 30% secondary, 10% accent. For dark UIs the ratio flips to roughly **70–80% dark background, 10–20% mid-tones, ~10% bright accent.** Spotify is the canonical example — accent green **#1DB954** (current brand #1ED760) on near-black surfaces **#121212 / #212121**. The accent's power comes from *scarcity*: "When your blue only appears on primary buttons… users immediately recognize it as 'this is where I act.' When it appears everywhere, it stops signaling anything."
- Practical rules: **max one or two accent instances per viewport**; accent means "look here next," never decoration; **reserve the copper→violet gradient for the single most important element per screen.** Your current design "tints bars and badges equally" — precisely the failure mode that destroys directional meaning.
- Keep accents desaturated enough to avoid dark-mode vibration; if used on text/UI components they must still pass 3:1 against the near-black.

### 8. Numbers as typographic objects
- Financial terminals, sports graphics, and trading cards treat the key number as a hero object: **big, bold, tabular lining figures, often mono**, with a small muted label beneath — the "BAN" (Big Ass Number) dashboard pattern: bold big number + subtle gray metric name + one highlight color. Value-to-label size contrast is typically **3–5×**.
- For Blue Room: the Hidden Stat ("88") should be the largest single glyph cluster on the entire page, in IBM Plex Mono (tabular), with "GESTURE AUTHORITY" as a small wide-tracked mono label. The hero stat diamond/metrics in the left panel use the same value-vs-label contrast at smaller scale.

## Details — The Deliverables

> **SUPERSEDED (2026-06-14, Base-Hex + Warm-Ramp Lock v1 / DECISION_LOG).** The
> `--vault-*` cool ramp below (`#D8DAE0 / #9AA0AD / #6B7180 / #474C57` on a `#0c0d10`
> base) was **never implemented and is killed.** The canonical token foundation is:
> base hex **`#0a0b0d`** (`--ink-950`) + the **warm `--t-*` "Sand" ramp**
> (`#e9e5dc → #6e6b63`), per `RESEARCH_SYNTHESIS_V1` (warm-neutral wins for non-frost
> surfaces) and `DESIGN_TOKENS.md` (Locked token canon). NB: the hexes in (a) below are
> **cool/blue-leaning despite the "Sand-style" label** — that mislabel is the reason this
> note exists. Read the tier-gap *idea* (the ~15:1→~2:1 contrast spread) as still useful;
> ignore the cool *hexes* and the `--vault-*` token names. RESEARCH informs, never implements.

### (a) Recommended 5-tier text tone scale for a #0c0d10 background
Named the **"Vault" scale**, warm-tinted (Sand-style, hue ≈55–60°) to harmonize with copper. Values are warm off-whites/greys, never pure white, to avoid halation. Approximate contrast ratios against #0c0d10 in parentheses.

| Tier | Token | Hex / rgba | ~Contrast | Font + role | Type rules |
|---|---|---|---|---|---|
| 1 — Display/Hero | `--vault-100` | `#F2EFE9` (≈15:1) | AAA | **Cormorant Garamond** serif | Card name, section titles, Oracle quote. 28–64px, weight 400–500, letter-spacing −0.01em→0; metallic-gradient option here only. |
| 2 — Primary | `--vault-200` | `#D8DAE0` (≈11:1) | AAA | **Inter** sans | Section headers, lead body, key prose. 16–22px, weight 500–600, neutral tracking. |
| 3 — Secondary/body | `--vault-300` | `#9AA0AD` (≈5.3:1) | AA | **Inter** sans | Running body, descriptions. 15–16px, weight 400, line-height 1.6. (≈ your current #9aa0ad — keep it as the MIDDLE tier, not the floor.) |
| 4 — Tertiary/meta | `--vault-400` | `#6B7180` (≈3.2:1) | AA-large / UI | **IBM Plex Mono** | Uppercase labels, kickers, table headers, metadata. 10–12px, weight 500, letter-spacing 0.10–0.12em, uppercase. |
| 5 — Faint/disabled | `--vault-500` | `#474C57` (≈2:1) | Decorative only | Mono or sans | Dividers, ghosted serials, "01/07" section numerals, disabled. Never for reading text. |

Design intent: the *gap* between tiers is the point. Your current #dfe2ea / #9aa0ad / #6b707d sit in a narrow ~5:1–10:1 band; the Vault scale stretches from ~15:1 to ~2:1 so the eye can rank content instantly. Tier 1 vs Tier 3 alone is a ~3× contrast jump — visible at a glance.

### (b) Warm-tint recommendation
Adopt a **warm grey ramp (Sand-style, yellow undertone hue ≈55–60°)** for the entire neutral system, surfaces included. Backgrounds shift a hair warm (keep #0c0d10 as base; elevated surfaces near #14161b can warm slightly). This makes copper feel native and keeps frost-cyan/violet as intentional cool accents. Radix's own rule (match grey hue to accent hue) supports this directly.

**Metallic option for ONE element** (trophy card title or Oracle finale only) — a warm "antique brass/champagne" variant of the standard silver recipe, tuned to copper:
```css
.metal-title {
  background: linear-gradient(to bottom,
    #f5f0e6 0%, #d8cbb3 35%, #9c8f78 50%, #e6dcc8 65%, #b3a07f 100%);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #d8cbb3; /* fallback for non-clipping browsers */
}
```
(The canonical silver form is `background: linear-gradient(#eee,#333); -webkit-background-clip:text; -webkit-text-fill-color:transparent;` per CSS-Tricks "Gradient Text" and Mandy Michael's silver CodePen, whose exact stops are `#cccccc 22%, #474747 24%, #b8b8b8 26%, #b8b8b8 27%, #d9d9d9 40%, #3e3e3e 78%`.) Never apply to body text; always pair with the near-black background for contrast.

### (c) The Focal Map methodology
**Rule 1 — One loud moment per viewport.** As the user scrolls, at any screen height exactly one element should win the squint test. Map each viewport before building:
- Hero viewport → **the center trading card** is the trophy; left analysis panel and right reading panel demote to Tier 2–4. The stat diamond is medium, not loud.
- Each dossier section gets ONE designated focal element (its header for quiet sections; the big number for Hidden Stat; the quote for Oracle).

**Rule 2 — Max one accent gesture per viewport.** One copper *or* cyan *or* violet instance per screen. The copper→violet *gradient* appears at most **once on the entire lower page** (the Hidden Stat) and optionally once in the hero (the card). Everywhere else, accents become a thin rule, a single tag, or a single active state.

**Rule 3 — Demote everything else by tier + whitespace.** Anything that isn't the focal element drops to Tier 3–5 and/or loses its accent. Use isolation: more whitespace around the focal element = louder it reads (Von Restorff). Quiet sections get tight, ledger-like spacing; loud sections get 96–160px of surrounding air.

**Rule 4 — Engineer the layer-cake.** Give every section a Tier-4 mono kicker ("01 — SOURCE RECORD") + Tier-1/2 header so a scanning eye lands on a clean ladder of headings. This converts the dossier from an F-pattern (failure) into the efficient layer-cake.

**Loudness sequence:** Hero (LOUD card) → 01 quiet → 02 medium → 03 medium → 04 LOUD breakout → 05 medium → 06 quiet → 07 LOUD finale.

## Recommendations
1. **Replace the 3-tone band with the 5-tier Vault scale now.** Re-map: current #dfe2ea → Tier 2; current #9aa0ad → Tier 3; current #6b707d → Tier 4; ADD a brighter Tier 1 (#F2EFE9) and a fainter Tier 5 (#474C57). This single change creates the missing top-and-bottom contrast spread. *Benchmark to change:* if the squint test still shows a flat grey field, widen Tier 1↔Tier 5 further.
2. **Warm-tint the neutral ramp** toward hue ≈55–60° so copper reads native. *Threshold:* if cyan/violet start to look muddy, you've over-warmed — reduce the tint saturation.
3. **Assign font roles strictly:** Cormorant = Tier 1 display only; Inter = Tier 2–3 reading/UI; IBM Plex Mono = Tier 4 uppercase wide-tracked labels + all tabular numbers. Never let mono carry body or serif carry labels.
4. **Build the focal map per viewport** and enforce one-loud + one-accent. Demote the hero side panels; make the center card unambiguously the trophy.
5. **Re-pace the 7 sections** into quiet/medium/loud per the sequence above; make Source Record and Mint Record visibly quieter (tight mono ledgers) and Hidden Stat + Oracle visibly louder (full-bleed, huge type, max whitespace).
6. **Ration the gradient:** copper→violet appears once on the lower page (Hidden Stat) and at most once in the hero. Convert all other accent uses to thin rules / single tags / single active states.
7. **Make "88" the largest glyph on the page** — IBM Plex Mono tabular, with a small wide-tracked mono label, 3–5× value-to-label size ratio.

## Caveats
- Contrast ratios above are computed approximations against #0c0d10; verify each final hex with a WCAG contrast checker before shipping, especially Tier 4 (target ≥3:1), and never rely on Tier 5 for readable text.
- Radix Slate/Sand dark hexes reflect current Radix Colors v3; an older v1 set with different values still circulates online — use the v3 / github.com/radix-ui/colors source of truth. (Steps 11 were single-sourced in research; confirm against the official scale before locking tokens.)
- Halation severity varies by individual (astigmatism) and display; the off-white ceiling (#F2EFE9 rather than #FFF) is a hedge, not a cure — also give adequate font size and weight.
- Several pacing/visual-weight references are practitioner blogs synthesizing NN/g; the primary, reliable anchors are NN/g's eye-tracking findings (F / layer-cake / spotted / commitment patterns; "read at most 28%, 20% more likely") and the Von Restorff effect. Treat specific px spacing numbers as well-supported conventions, not laws — tune to your grid.
- `-webkit-text-fill-color: transparent` is non-standard; always set a solid fallback color and test on iOS Safari (it can render text invisible on some versions; the documented workaround is an `@supports (-webkit-overflow-scrolling: touch)` reset).