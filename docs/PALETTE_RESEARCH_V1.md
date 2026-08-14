# COLOUR-SYSTEM CONSTRAINTS FOR A DARK, TEXT-HEAVY WEB ARCHIVE — THE EVIDENCE

**Status:** the research paper commissioned by `docs/PALETTE_RESEARCH_PROMPT_V1.md`,
delivered by the builder 2026-08-13. Current as of 12 August 2026.
**Read this before Phase 1 of `docs/PALETTE_FLEET_BRIEF_V1.md`.**

This is constraints and evidence, not a palette. Part 1 findings (one per §, each
opening with a one-line answer, then evidence, then a confidence rating); Part 2 the
design rules that follow; Part 3 what the evidence does not settle; Part 4 a reading
list. Industry guidance is marked *practice*.

---

## PART 1 — FINDINGS

### §1 — Contrast Polarity and Dark Mode

**One-line answer:** For sustained reading by normal-sighted people the evidence favours
light mode (positive polarity); dark mode's genuine beneficiaries are a minority
(cloudy-ocular-media conditions, some light sensitivity), so a dark reading environment
is a legitimate choice but swims slightly against the legibility current and must be
engineered to compensate.

The "positive polarity advantage" — dark text on light reads faster and more accurately
than light-on-dark — is well replicated. Piepenbrock, Mayr & Buchner (2013, *Ergonomics*;
2014, *Human Factors*) found positive polarity better on visual-acuity and proofreading
tasks for both younger (18–33) and older (60–85) adults, with effect sizes around
d≈0.68 (speed) and d≈0.77 (accuracy) in the 2014 study. Critically, the advantage
increased linearly as font size decreased — the smaller the text, the bigger the
light-mode win. The mechanism is luminance-driven: brighter positive-polarity displays
constrict the pupil, increasing depth of field and reducing the impact of optical
aberrations, producing a sharper retinal image. Buchner, Mayr & Brandt (2009) showed that
when display luminance is held constant across polarities the advantage largely
disappears — confirming it is a luminance/pupil effect, not polarity per se.

The classic origin: Bauer & Cavonius (1980) and Radl (1980) found positive-polarity
advantages on CRTs; 1980s null results also exist (Creed, Dennis & Newstead 1988; Gould
et al. 1987), and NN/g notes early studies suggested no difference for normal vision.
Better-powered LCD studies (Buchner & Baumgartner 2007; Piepenbrock 2013/2014; Dobres et
al. 2017) tipped the balance. Dobres, Chahine & Reimer (2017, *Applied Ergonomics*)
matters for a night reader: in a glance-reading lexical-decision task, polarity had no
significant effect in simulated daylight, but at night light mode was significantly
better and small dark-mode text was especially hard.

Pupil/accommodation/astigmatism: smaller pupils (positive polarity) give a "pinhole"
depth-of-field benefit and reduce spherical aberration. The accommodation literature
(López-Gil et al. 2013) notes dark-on-light reduces accommodative effort. Astigmatism
and other higher-order aberrations worsen as the pupil dilates, so dark mode (dilated
pupil) exposes them — the basis of halation (§2). How common is genuine dark-mode
benefit? Legge et al. (1985): of low-vision participants, only those with cloudy ocular
media (e.g. cataract) read faster in dark mode; those with central-field loss were
unaffected — but NN/g cautions this used CRTs. One intriguing long-term finding (Aleman,
Wang & Schaeffel 2018, *Scientific Reports*, n=7) is that light-mode reading thinned the
choroid (a myopia-associated change) while dark mode thickened it — hinting at a possible
long-term myopia cost to light mode, but the sample is tiny.

**Confidence:** STRONG that light mode is better for acute reading in normal vision;
MIXED on fatigue (Piepenbrock found no polarity difference in subjective fatigue) and
long-term effects (thin).

### §2 — Halation and the Pure-White Problem

**One-line answer:** Bright-white-on-near-black blooms because light scattered inside the
eye (and, secondarily, on the display) spreads across the dark surround where there is no
competing light to mask it; the effect is amplified by astigmatism and dilated pupils,
and the fix is to cap the bright element's luminance and use off-white rather than pure
`#FFFFFF`.

Optical scatter: the eye is not a perfect imaging system. Intraocular straylight (forward
scatter from cornea, lens, retina) spreads a veil of light around bright features; on a
dark ground the veil is visible because the surround is near-zero, whereas on a light
ground it is masked. With a dilated pupil (dark environment) more peripheral, aberrated
rays enter, worsening the point-spread. Astigmatism — irregular corneal/lens curvature —
smears a point of light into a directional streak, which readers describe as letters
"bleeding," "shimmering" or doubling. On prevalence, the best primary datapoint is
Kleinstein et al., "Refractive error and ethnicity in children," *Archives of
Ophthalmology* 2003;121(8):1141–1147 (the CLEERE Study): 28.4% of the 5–17-year-old US
study population had astigmatism ≥1.00 D. The widely repeated "50% of the population"
figure traces to an unreferenced Jason Harrison (UBC) post rather than a primary study —
treat it as folk-knowledge, not evidence.

Display factors: OLED can drive pixels to true black (0 cd/m²), maximising the contrast
step at glyph edges and thus the halation potential; it has near-instant pixel response
(less smear) but can show low-luminance PWM flicker. LCD cannot reach true black;
local-dimming/FALD LCDs show "blooming" (halos around bright objects) because a dimming
zone is larger than the bright feature. Both technologies produce edge bloom, by
different routes.

Standards / luminance ratios: ISO 9241-303 (2008/2011) Annex D addresses luminance
balance. It recommends the area-average luminance of task areas viewed in sequence be
between 0.1L and 10L, where L is the average screen luminance — keep surrounding surfaces
within a 1:10 band. For office positive-polarity work it cites display luminance of
100–150 cd/m², and explicitly warns that at night the display "should not be so high as
to annihilate dark adaptation of the user's eyes." There is no vision-science constant
for "maximum white on black," but the ISO 0.1L–10L balance rule and the dark-adaptation
warning together argue for keeping the bright card well below full display maximum and
off pure white.

**Confidence:** STRONG on the scatter/astigmatism mechanism and that off-white beats pure
white; MIXED/THIN on exact prevalence beyond the CLEERE figure and on any single "maximum
luminance" number (the ISO ratio is ergonomic guidance, not a readability threshold).

### §3 — Contrast Metrics Beyond WCAG ★

**One-line answer:** WCAG 2.x's contrast ratio is a polarity-blind, CRT-era luminance
ratio that provably overstates contrast for dark colours (by as much as 200–250% per its
critics), which is exactly why an AA-passing dark UI can still read as harsh or muddy;
APCA is a far better perceptual model for dark themes, but as of August 2026 it is not
normative — it was removed from the WCAG 3 draft in July 2023 and the WCAG 3 contrast
algorithm is officially "yet to be determined," so use APCA as a design tool, not a
compliance claim.

**Why WCAG 2.x fails.** The formula is (L1 + 0.05) / (L2 + 0.05), where L is sRGB
relative luminance = 0.2126·R + 0.7152·G + 0.0722·B on linearised channels. Specific
criticisms:

- **The 0.05 flare constant.** Per W3C's own Understanding SC 1.4.3, 0.05 models "Typical
  Viewing Flare" from the ANSI/HFS 100-1988 and IEC standards — ambient light reflecting
  off a CRT — and prevents division-by-zero against pure black. Somers (Myndex) argues
  this is a CRT-era value; LCD/OLED have much lower flare, so the constant most distorts
  the dark end, where it dominates both terms.
- **Symmetry / polarity blindness.** The ratio is symmetric — swapping foreground and
  background gives the identical number. As Eric Eggert puts it, "WCAG 2 treats front and
  background color the same, so inverting the color does not change the calculation. This
  is notably not how color perception works." Human contrast perception is not symmetric
  with polarity.
- **Dark-end overstatement.** Somers, in the CSS WG mailing list: in WCAG 2.x "as a color
  pair gets darker, the reported contrast becomes increasingly inaccurate." In interview
  with Colleen Gratzer ("How APCA Changes Accessible Contrast") he states: "it really
  grossly overcalculates or overestimates contrast for very dark colors as much as 200%
  to 250%. That means that it can't be used for dark mode." APCA docs add that "4.5:1 can
  be functionally unreadable when a color is near black."
- **sRGB / luminance assumptions.** A pure CIE-Y luminance ratio ignores spatial factors
  (font size/weight), surround, and that a self-illuminated display is perceived
  differently from reflective media.

**APCA.** Developed independently by Andrew Somers / Myndex Research as part of the
SAPC/SACAM colour-appearance model for self-illuminated displays. It outputs Lc (lightness
contrast), a signed value from ~0 to ±106; negative Lc denotes light-text-on-dark. It is
polarity-aware — it always subtracts text luminance from background luminance and uses
different exponents per polarity (normBG 0.56 / normTXT 0.57 for dark-on-light; revBG
0.65 / revTXT 0.62 for light-on-dark). For very dark colours it applies a "soft clamp":
(0.022 − Y)^1.414 + Y (blkThrs = 0.022, blkClmp = 1.414), to fix the near-black behaviour
WCAG mishandles. Grounding: Stevens' power law (lightness perception is a power curve,
not linear light), Bartleson–Breneman (perceived contrast depends on surround/ambient),
and contrast constancy — APCA claims perceptual uniformity, so that "regardless of how
light or dark the colors are, a contrast value of Lc 60 represents the same perceived
readability contrast."

**Practical Lc thresholds** (Bronze Simple Mode, reference font Helvetica): Lc 90 =
preferred for body text (font ≥14px/400, or 18px/300); Lc 75 = minimum for body text
(≥18px/400, 16px/500, 14px/700), and body text below Lc 75 must be boosted by ≥Lc 15;
Lc 60 = minimum for non-body content text you want read; Lc 45 = large/heavy headline
minimum; Lc 30 = absolute minimum "spot readable"; Lc 15 = point of invisibility for thin
lines. **Dark-UI specific:** APCA advises a *maximum* — keep very large/bold fonts and
large colour areas below ~Lc 90, because in dark mode extremely high contrast on large
light elements causes halation (§2). This is the concrete lever: the near-white card
should not be maxed against near-black.

**Criticisms of APCA (even-handed):**

- **Peer review.** APCA's underlying science is peer-reviewed, but its specific fitted
  constants/thresholds have not had traditional independent academic peer review. The W3C
  Contrast Subgroup itself said the algorithm "requires extensive peer review from other
  researchers in color contrast before adoption." An independent critic (xi,
  apca-introduction) states flatly: "A rigorous scientific evaluation is not yet
  available."
- **Standing.** Removed from the WCAG 3 draft in July 2023 as "exploratory content"
  lacking working-group consensus; W3C says APCA guidance may be reworked and added back,
  but the current draft states the contrast algorithm is "yet to be determined." WCAG 3 is
  not expected to be finalised until roughly 2030.
- **Legal risk.** Adrian Roselli and others warn that dropping WCAG 2 conformance for a
  draft algorithm creates legal exposure, since accessibility law references WCAG 2.x.
  Browser dev-tools ship APCA only behind experimental flags; Roselli filed a 2024
  Chromium issue objecting to it appearing official.
- **Licensing/patent.** APCA is "© Myndex, patent(s) pending," under a time-barred,
  revocable beta licence; the W3-scoped code is split into a separate `apca-w3` repo
  licensed only for WCAG web content; "APCA"/"SAPC" are trademarks usable only with
  correct, up-to-date implementations. W3C adoption would require formal licensing — a
  bureaucratic hurdle cited as contributing to removal.
- **Real-world limits.** In Myndex's own discussion thread, a user reported that
  dark-mode text passing APCA at Lc 90–98 still caused halation ("white flashes of text …
  I have to stop") — high APCA contrast does not guarantee comfort for light-on-dark.

**Confidence:** STRONG that WCAG 2.x is a poor readability predictor in dark themes and
that APCA models it better; STRONG on APCA's non-normative status; MIXED on whether
APCA's exact thresholds are the final word (limited independent validation).

### §4 — Warm and Cool as Depth

**One-line answer:** "Cool recedes, warm advances" is a real but small and
observer-variable optical effect (chromostereopsis, driven by chromatic aberration) plus
a learned pictorial convention (aerial perspective) — but at the near-black luminances of
this interface it is largely irrelevant, because colour vision itself collapses toward
monochrome as you go mesopic/scotopic.

The optical basis: longitudinal chromatic aberration (LCA) means the eye focuses short
wavelengths (blue) in front of long (red). LCA is ~2.0 D across 400–700 nm (Thibos et al.
1990); for display RGB primaries the red–blue dioptric interval is ~1.25–1.50 D. Combined
with the fovea being displaced from the optical axis and transverse chromatic aberration
(TCA), this produces chromostereopsis: typically red appears nearer than blue
("positive"). Magnitude is small — a fraction of a degree of disparity. Crucially it
reverses in a substantial minority of observers (negative chromostereopsis) and can be
nulled or flipped by pupil position, background colour, and the Stiles–Crawford effect
(Faubert 1994/1995; Thompson, May & Stone 1993). It is stronger on a black background
than white. So the effect exists and is measurable, but it is individual, sign-unstable,
and modest.

Colour-appearance grounding: the Helmholtz–Kohlrausch effect (saturated colours look
brighter than their luminance predicts) and CIECAM02/CIECAM16 model surround effects, but
none establishes a robust "warm advances" rule at threshold luminances. Aerial
perspective (distant objects appear desaturated, bluer, lower-contrast) is a genuine,
learned depth cue in art and real scenes — a pictorial convention, not an optical property
of the eye.

**The decisive point for a near-black UI:** as luminance falls into the mesopic and
scotopic range, rods dominate, chroma discrimination collapses, and the Purkinje shift
moves peak sensitivity toward blue while reds darken. Scotopic vision is functionally
colour-blind. Chroma keeps falling until roughly 0.1 lx (reds/yellows) or ~1 lx
(greens/blues), below which it is near-constant and minimal (colour-appearance studies,
*Optical Review* 2004). Photopic conditions require surface luminances above ~5 cd/m²;
below a few hundredths of a cd/m² you are scotopic. A dark surface tinted cool-vs-warm
will therefore carry very little perceptible chroma, and any chromostereoptic depth cue
will be weak precisely where the surfaces are darkest. Where the interface is bright —
the near-white card and the text — normal colour vision applies and subtle warm/cool
relationships will read.

**Confidence:** MIXED. The optical effect and its figures are STRONG; the "warm advances
/ cool recedes" rule as a reliable design lever is MIXED (small, variable, partly
learned); its near-uselessness at the darkest luminances is STRONG.

### §5 — Visual Stress and Calm ★

**One-line answer:** "Loud" interfaces have high contrast energy concentrated near the
~3 cycles/degree pattern-glare peak plus high feature-congestion (many competing hues,
edges and salient elements); reducing luminance variance, edge density, hue count and the
number of simultaneous foci demonstrably lowers search difficulty and self-reported
discomfort — but the specific clinical construct of Meares–Irlen syndrome and its
coloured-overlay "cure" is not well supported.

**Pattern glare / visual stress:** high-contrast repetitive stripes provoke visual
discomfort, illusions of colour/shape/motion, and headache in susceptible people,
maximally at a spatial frequency of ~3 cycles per degree with ~50% duty cycle and high
contrast (Wilkins & Nimmo-Smith 1984; Wilkins et al. 1984). The Pattern Glare Test (0.5,
3, 12 cpd gratings; norms in Evans & Stevenson 2008) quantifies it; migraineurs score
higher. The mechanism is believed to be cortical hyperexcitability. Text itself forms a
quasi-periodic striped pattern near this frequency, and so do repeating UI elements
(rules, dividers, dense lists, tight monospace) — so the peak is directly relevant.
Fourier/1/f work (Juricevic, Land, Wilkins & Webster 2010) shows images whose amplitude
spectra depart from natural 1/f statistics are rated uncomfortable regardless of content;
stripes depart radically from 1/f.

**The Meares–Irlen controversy:** multiple systematic reviews are sceptical. Ritchie,
Della Sala & McIntosh (*Pediatrics* 2011;128(4):e932–e938): of 61 schoolchildren aged
7–12, the Irlen diagnostician diagnosed Irlen syndrome in 77%, yet "We found no evidence
for any immediate benefit of Irlen colored overlays as measured by the reading-rate test
or the global reading measure." Griffiths et al. (2016) reviewed 51 items and found
effects small or placebo-equivalent, with low-bias studies giving least support. Miyasaka
et al. (2018/2019) found the evidence does not support Irlen syndrome as a distinct entity
or its treatment, and NHS commissioning bodies decline to routinely fund coloured filters.
So: visual stress / pattern glare as a phenomenon is real and measurable; "Irlen
syndrome" as a diagnosis and coloured overlays/lenses as a treatment are
contested-to-debunked. (The Irlen organisation's own site cites favourable figures; treat
as an interested party.)

**Clutter and load:** Rosenholtz, Li & Nakano (2007, *Journal of Vision*) operationalised
visual clutter with Feature Congestion (local variability in colour, orientation,
luminance) and Subband Entropy (wavelet-domain information); Edge Density (Mack & Oliva
2004) is a simpler proxy. All predict visual-search difficulty; a key experiment showed
colour variability specifically adds clutter, and Feature Congestion correlates with
subjective screen-clutter ratings. Saliency models (Itti–Koch 1998) show elements that
differ from their surround in colour, luminance or orientation grab attention
pre-attentively — so every added high-contrast hue is another competitor for the eye. The
implication: a restricted palette and a restricted luminance range reduce measured
clutter and search cost. This connects to computer-vision-syndrome / digital-eye-strain
risk factors (uncorrected refractive error, screen time, glare, small text), for which the
20-20-20 heuristic and adequate contrast are standard practice guidance.

**Confidence:** STRONG on the 3 cpd pattern-glare peak, on clutter metrics predicting
search cost, and on colour-count/edge-density as load drivers; STRONG (negative) that
Irlen overlays are poorly evidenced; MIXED on directly linking "limited palette → less eye
strain" (the clutter/search evidence is solid; the eye-strain link is inferential).

### §6 — Night Reading, Blue Light, Circadian

**One-line answer:** At realistic screen luminances the circadian/melatonin effect of a
screen's blue content is real but small, and filtering blue light (glasses or night-mode)
has little proven benefit for sleep — so a blue-shifted dark ground is not justified as a
"circadian-friendly" measure; if anything the evidence weakly cautions against extra
short-wavelength emphasis at night, but the dominant levers are total brightness, timing
and content, not hue.

Mechanism: intrinsically photosensitive retinal ganglion cells (ipRGCs) containing
melanopsin drive non-image-forming responses; melanopsin peaks ~480 nm. Melatonin
suppression is dose-dependent in melanopic terms. But thresholds matter. Phillips et al.
(2019, *PNAS*) found high inter-individual variability with a wide ED50 range and
significant suppression at moderate light. A modelling paper (Rea/Nagare et al.,
*Scientific Reports* 2020) put a practical threshold around CSt ≈ 0.10 and reported
measured device output at the eye: iPhone 5S ~51 lx (CS1.0 ≈ 0.12), eReaders ~32 lx
(CS1.0 ≈ 0.06), iPads ~70 lx (CS1.0 ≈ 0.13), and iPad Night-shift ≈ CS1.0 0.08 — i.e.
typical evening screen exposures sit near or below the threshold, and Night-shift only
nudges it. The landmark study — Chang, Aeschbach, Duffy & Czeisler, *PNAS*
2015;112:1232–1237 — used a demanding dose: 4 h/evening of light-emitting eBook reading
over 5 consecutive nights "suppressed evening levels of melatonin by 55.12 ± 20.12%,
whereas the print-book condition showed no suppression (−18.77 ± 39.57%)," and delayed
circadian phase. Metameric studies (*Nature Communications Biology* 2023, n=72) show
melanopic irradiance drives melatonin dose-dependently but effects on subjective
alertness are inconsistent; another (*Sleep* 2022) found ~14% melatonin suppression from
high-melanopic light did not translate into altered sleepiness, vigilance or sleep.

Interventions: the 2023 Cochrane review — Singh, Keller, Busija, McMillan, Makrai,
Lawrenson, Hull & Downie, *Cochrane Database Syst Rev* 2023 Aug 18;8:CD013244 (17 RCTs
from 6 countries, 619 participants, sample sizes 5–156) — concluded "blue light glasses
provide little to no benefit in terms of visual fatigue with computer use," found
inconsistent/unconvincing sleep effects, and could not determine effects on serum
melatonin. Night-mode software trials generally show small-to-null melatonin/sleep effects
at normal brightness. The popular "your phone's blue light is ruining your sleep"
narrative is overstated at real luminances.

**Does the evidence argue for or against a blue-shifted dark ground at night? Against,
weakly.** Because (a) blue-shifting increases melanopic content, the one dimension with
any circadian effect, and (b) the Purkinje shift (§4) means the dark-adapted eye is more
sensitive to blue at night, so a blue ground could feel relatively brighter/glarier than
its photopic luminance suggests. A warmer, lower-melanopic ground is the more defensible
night choice — but the effect size is small, and total luminance and use-timing matter far
more than hue.

**Confidence:** STRONG that filter interventions are weakly evidenced and that realistic
screen doses are modest; MIXED on the exact melanopic threshold; MIXED on the
warm-vs-cool-ground recommendation (defensible but small).

### §7 — Dark-Theme Elevation Systems in Practice

**One-line answer:** The major systems converge on lightness-based elevation (lighter =
higher), avoiding shadows on dark grounds, avoiding pure black, and desaturating colours —
but only some of this is evidence-backed (avoiding pure black to cut halation/eye-strain
and desaturating to avoid chromatic vibration have real grounding; the specific overlay
percentages and `#121212` itself are convention).

**Material Design 2/3 (Google) — *practice*:** base dark surface is `#121212`, not
`#000000`. Elevation is expressed by compositing a semi-transparent white overlay on the
surface — higher elevation = more opaque overlay (published ladder: 00dp 0%, 01dp 5%,
02dp 7%, 03dp 8%, 04dp 9%, 06dp 11%, 08dp 12%, 12dp 14%, 16dp 15%, 24dp 16%). Google's
stated rationale: shadows are hard to see on dark grounds, so lighten the surface instead;
pure black against bright imagery/animation "creates excessive contrast and leads to eye
strain," and it's easier to see depth on grey than black; `#000000` is reserved as an OLED
power-saving option for simple system surfaces. Material also says desaturate — "saturated
colors … can visually vibrate against dark surfaces" — and use lighter tonal values (the
200–50 range); it recommends white body text maintain ≥15.8:1 against the darkest surface.
Apple HIG differs: it embraces true black on OLED and provides "base" vs "elevated" system
background sets. IBM Carbon uses defined layered grey tokens rather than white overlays.
Adobe Spectrum, Atlassian and Fluent similarly use graduated dark greys and de-emphasise
shadows.

**Evidence vs convention:**

- **Avoid pure `#000000` for large reading surfaces** — *evidence-backed* (halation /
  contrast-energy / eye-strain, §2; ISO dark-adaptation caution).
- **Desaturate saturated hues on dark grounds** — *evidence-backed in spirit* (chromatic
  vibration/chromostereopsis at high chroma, colour-count clutter, §4/§5).
- **Lightness-based elevation instead of shadows** — *partly justified* (shadows genuinely
  are low-contrast on dark grounds) but the idea that lighter = nearer leans on the weak
  pictorial/optical depth cues of §4; a sensible convention more than a proven perceptual
  law.
- **The specific `#121212` value and the exact overlay-opacity ladder** — *convention* (a
  reasonable, widely-copied default, not a measured optimum).
- **Material's 15.8:1 white-on-surface figure** is a WCAG-2 ratio and inherits WCAG's
  dark-end inaccuracy (§3).

**Confidence:** STRONG on what the systems do; MIXED on the evidentiary status (separated
above).

### §8 — Dark Gradients and Banding

**One-line answer:** Dark gradients band worst because sRGB's gamma encoding allocates
very few code values to the darkest tones, so an 8-bit near-black ramp has only a handful
of distinct steps spread over many pixels — each step exceeds the eye's Weber contrast
threshold and shows as a stripe; the fixes are dithering (blue noise / ordered) and higher
bit depth, and yes, animating opacity generally makes it worse.

Quantisation and gamma: 8-bit gives 256 levels/channel. In the shadow region (roughly code
values 0–51, the darkest ~20%) a 6-bit panel has only ~12 usable steps; even true 8-bit
has few perceptually distinct dark steps because sRGB's non-linear (~gamma 2.2/2.4)
encoding compresses the dark end and human contrast sensitivity (Weber's law) is high in
relative terms near black. A 1920-px-wide ramp with 256 steps averages ~7.5 px per step —
visible banding — worst in dark, smooth, large gradients where the eye has room to see
each edge and few high frequencies to mask it (Mach-band enhancement adds perceived
edges). The Barten CSF/ramp analysis underlies HDR's PQ transfer function (SMPTE ST 2084),
designed so ~12 bits keeps quantisation below the Barten visibility threshold across the
range; expanding dynamic range at fixed bit depth makes banding worse.

Fixes: dithering adds sub-step noise to break the contour. Ordered/Bayer dithering is
cheap but patterned; blue-noise dithering (high-frequency, spectrally flat at low
frequencies) is far less perceptible and is the recommended technique (Bart Wronski's
dithering series; Playdead's *Inside* used blue-noise + temporal AA to eliminate banding).
Interleaved-gradient noise (Jimenez) is a cheap GPU alternative; film-grain overlays
achieve the same masking aesthetically. Implementation: CSS/SVG (`feTurbulence` noise
overlays), a WebGL/shader dither, or a pre-dithered PNG. Higher bit depth: a true 10-bit
path (1024 levels) with a 10-bit signal chain "virtually eliminates" perceptible banding
for standard content — but the whole pipeline (source, compositor, cable, panel) must be
≥10-bit; a 10-bit panel fed an 8-bit-quantised gradient still bands, and many "8-bit"
panels are really 6-bit+FRC.

**Animating opacity:** fading a low-alpha dark gradient in/out repeatedly re-quantises the
composited result each frame (source × alpha, rounded back to 8-bit), so bands can shift,
pop or crawl as alpha changes — a temporal artefact on top of the static banding.
Compositing order and repeated rounding compound it. Prefer animating a pre-dithered
layer, dithering after compositing, or working in higher precision.

**Confidence:** STRONG throughout (well-established signal-processing and vision facts);
the opacity-animation point is STRONG in principle (a corollary of repeated quantisation)
though less formally studied.

### §9 — Colour Grading, Borrowed from Film

**One-line answer:** Cinematography's low-key toolkit maps cleanly onto a dark UI: lift
the blacks slightly (never sit content on the clip point), tint shadows subtly cool and
highlights subtly warm (split-tone), keep the bright object off the highlight clip, and
use a gentle toe/shoulder so tones roll off instead of crushing — all of which preserve
separation, material and depth in near-dark frames.

**Lifted / "milked" blacks:** colourists rarely crush shadows to pure 0; they lift the
black point so shadow detail and a faint tint survive, reading as filmic depth rather than
a dead hole, and (per colourist practice) avoiding amplified noise and a harsh look. For
UI this argues for a lifted base (grey, like `#121212`, not `#000000`) and for keeping the
darkest meaningful content a step above true black.

**Split toning / teal-orange:** the "teal and orange" convention pushes shadows cool and
skin/highlights warm. The perceptual reason it works is complementary contrast on the
opponent-process colour axes — orange (long-wave / skin) against teal (its near-complement)
maximises colour separation, so warm subjects "pop" off cool grounds even without a
luminance difference. Skin tones are inherently warm, so cool shadows separate figure from
ground automatically. Colourists warn to keep it subtle and to keep the lowest shadows
fairly neutral (colour-cast blacks look washed out and amplify noise) — tint the toe
gently, not the floor.

**Log / toe-shoulder shaping:** film and log curves compress highlights (shoulder) and
lift/soften shadows (toe) rather than clipping, preserving gradation at both ends.
Practical UI translations: (1) lift the base off pure black; (2) put a subtle, low-chroma
cool tint in the shadows and a subtle warm tint in the highlights / near-white card for
separation and "material"; (3) keep the bright card below the clip point (off pure white,
§2/§3) so it glows rather than glares; (4) roll tones off gently across the small dark
range available; (5) keep the very darkest values near-neutral to avoid muddy, noisy
blacks.

**Confidence:** MIXED. The film techniques are well-established craft practice (not
vision-science experiments); the opponent-process explanation for complementary separation
is STRONG. Treat the specific translations as principled craft guidance, not empirical UI
findings.

---

## PART 2 — THE DESIGN RULES THAT FOLLOW

1. **Do not use pure black (`#000000`) as the reading ground.** Use a lifted near-black in
   the ~`#0E`–`#16` grey region (Material's `#121212` is a reasonable default). (§2, §7, §9.)
2. **Do not render the bright card or body text in pure white (`#FFFFFF`).** Use an
   off-white (very slightly warm or neutral-grey) and cap the card's luminance below
   display maximum — treat it as a highlight kept off the clip point. (§2, §3, §9.)
3. **Keep surfaces within roughly a 1:10 area-average luminance band** (ISO 9241-303:
   0.1L–10L), so nothing is more than ~10× the average — this stops the card and text
   becoming isolated glare sources. (§2.)
4. **Grade contrast with APCA (Lc), not WCAG 2.x, for the dark theme.** WCAG 2 overstates
   dark-colour contrast by up to ~200–250%. Target Lc 90 for serif body text (Lc 75 minimum
   if ≥18px/400), Lc 60+ for small monospace labels you want read (raise Lc as size drops /
   weight thins), Lc 45+ for large headings. Retain WCAG 2.x AA as the documented legal
   floor, since APCA is non-normative. (§3.)
5. **Enforce an APCA *maximum* on the biggest, lightest elements:** keep the near-white
   card and any large light fills at roughly Lc ≤ 90 against the ground, not the absolute
   maximum, to avoid halation. **This is the single most important lever for "radiant not
   glaring."** (§2, §3.)
6. **Prefer a warm or neutral (low-melanopic) dark ground over a blue-shifted one for a
   night reader,** and give users a brightness control; the circadian gain from
   blue-shifting is small and could increase perceived glare via the Purkinje shift. Do not
   market any hue choice as a sleep benefit. (§4, §6.)
7. **Do not rely on warm/cool as a primary depth cue.** At near-black luminances chroma is
   barely perceptible; use lightness steps for hierarchy, reserving subtle warm/cool
   split-toning for the brighter elements (card, text) where colour vision is active.
   (§4, §7, §9.)
8. **Use lightness-based elevation, not shadows.** Step surfaces up with a low-opacity
   light overlay (Material's ~5–16% ladder is a workable reference); shadows are
   near-invisible on dark grounds. Treat exact percentages as tunable convention. (§7.)
9. **Desaturate accent hues and minimise hue count.** Every added saturated hue increases
   feature-congestion / clutter and search cost, and saturated colours visually vibrate on
   dark grounds. Keep a restricted palette. (§5, §7.)
10. **Avoid high-contrast repeating patterns near ~3 cycles/degree.** Give long serif
    passages generous line spacing; avoid dense high-contrast rules/stripes/tight dividers;
    keep monospace label blocks from forming high-contrast gratings. (§5.)
11. **Limit simultaneously competing high-salience elements.** One bright card should be
    the focus; don't let multiple elements compete at the top of the luminance/chroma
    range. (§5.)
12. **Dither every large dark gradient.** Apply blue-noise (preferred) or ordered dithering
    / a subtle film-grain overlay; assume 8-bit and design for it. Consider a 10-bit
    end-to-end path only if the whole pipeline supports it. (§8.)
13. **Do not animate opacity on large dark gradients.** If a fade is required, animate a
    pre-dithered layer or dither after compositing, and/or work in higher precision, to
    avoid crawling temporal banding. (§8.)
14. **Split-tone gently:** subtle cool in the shadows, subtle warm in the highlights/card,
    near-neutral at the very darkest floor. This buys figure-ground separation and
    "material" without chroma noise. (§9.)
15. **Offer a light-mode / higher-contrast toggle and respect OS preferences.** Light mode
    is better for sustained reading for most normal-sighted users and for small text; a
    persistent user choice serves the astigmatic majority who suffer halation and the
    cataract/light-sensitive minority who prefer dark. (§1, §2.)
16. **Size body text generously; avoid very small serif/monospace.** The dark-mode
    disadvantage grows as font size shrinks and at night; larger type neutralises much of
    it. (§1.)

---

## PART 3 — WHAT THE EVIDENCE DOES NOT SETTLE

- **The exact off-white and its warmth.** Evidence says "not pure white, kept below max,
  maybe slightly warm," but the precise hex, luminance and colour temperature of the card
  are taste/testing questions.
- **The exact base-grey value.** `#121212` is convention; the optimal near-black for this
  content and audience is untested.
- **Whether a cool or warm dark ground is subjectively "calmer."** The circadian argument
  weakly favours warm; the aesthetic/"quiet" judgement is not settled by evidence.
- **APCA's exact thresholds as final truth.** APCA beats WCAG 2 for dark mode but lacks
  full independent peer review and is non-normative; the precise Lc targets may shift, and
  high-Lc light-on-dark can still cause halation for some users. Test with real readers.
- **How strong warm/cool depth is for your users.** Chromostereopsis reverses in a minority
  and is weak at low luminance; whether any observer perceives your intended depth is
  individual.
- **Prevalence of halation susceptibility in your audience.** Astigmatism ≥1.0 D is ~28% in
  the CLEERE child sample; adult and higher-severity figures vary, and the "half the
  population" claim is unsourced. The true fraction who suffer with your palette is unknown
  without testing.
- **The "limited palette → less eye strain" link.** Clutter/search-cost evidence is strong;
  the direct fatigue claim is inferential.
- **Long-term polarity effects (myopia).** The choroid-thinning finding is intriguing but
  n=7; not a basis for decisions.
- **Whether Meares–Irlen-type susceptibility benefits from any tint.** The construct and
  overlay treatment are contested; don't build features around them.

---

## PART 4 — A READING LIST (ten sources most worth reading in full)

1. Piepenbrock, Mayr & Buchner (2013), "Positive display polarity is advantageous for both
   younger and older adults," *Ergonomics* — the core empirical case for the
   positive-polarity advantage across ages; read for mechanism and effect sizes.
2. Budiu / Nielsen Norman Group (2020), "Dark Mode vs. Light Mode: Which Is Better?" — the
   best plain-language synthesis of the polarity literature, including the pupil mechanism,
   low-vision exceptions and the myopia caveat.
3. Dobres, Chahine & Reimer (2017), "Effects of ambient illumination, contrast polarity,
   and letter size on text legibility," *Applied Ergonomics* — directly relevant to night
   reading: the dark-mode penalty appears at night and for small text.
4. Somers / Myndex, "Why APCA as a New Contrast Method?" and "APCA in a Nutshell"
   (git.apcacontrast.com) — primary source for APCA's rationale, the WCAG-2 dark-end
   critique, Lc thresholds, and the dark-mode maximum.
5. Adrian Roselli, "WCAG3 Contrast as of April 2026" — the essential even-handed status
   check: APCA's July-2023 removal, non-normative standing, and legal-risk caveats.
6. Evans & Stevenson (2008), "The Pattern Glare Test: a review and determination of
   normative values," *Ophthalmic & Physiological Optics* — the definitive account of the
   ~3 cpd visual-stress peak and how it's measured.
7. Griffiths et al. (2016) and Miyasaka et al. (2019) systematic reviews on coloured
   overlays / Irlen syndrome — read together for the sceptical consensus on the overlay
   "cure" (alongside Ritchie, Della Sala & McIntosh 2011, *Pediatrics*).
8. Rosenholtz, Li & Nakano (2007), "Measuring visual clutter," *Journal of Vision* —
   Feature Congestion and Subband Entropy; the quantitative basis for "restrict the palette
   and the edges."
9. Singh et al. (2023) Cochrane review, "Blue-light filtering spectacle lenses…"
   (CD013244) plus Chang et al. (2015), *PNAS* eReader study — the pair that right-sizes
   the blue-light / circadian claims.
10. ISO 9241-303 (Requirements for electronic visual displays) and Material Design
    dark-theme guidance (elevation overlays, `#121212`) — read together as the ergonomic
    standard vs. the industry practice, and to see which rules are evidence and which are
    convention.

(Also worth having open: Bart Wronski's dithering series for §8; and the
chromostereopsis/LCA literature — Thibos et al. 1990; Faubert 1994 — for §4.)

---

## A NOTE ON SOURCING QUALITY AND CONTESTED GROUND

The strongest, best-evidenced claims here are: the positive-polarity/pupil mechanism (§1),
the intraocular-scatter basis of halation (§2), WCAG 2.x's dark-end inaccuracy and APCA's
non-normative status (§3), the ~3 cpd pattern-glare peak and clutter metrics (§5), the
weakness of blue-light interventions at real luminances (§6), and the signal-processing
facts of banding (§8). The genuinely contested or thin areas, not resolved: the
reality/strength of warm-cool depth at low luminance (§4, small and variable), the
Meares–Irlen construct and overlay treatment (§5, largely debunked), the size of any
night-time hue benefit (§6, small), the evidentiary status of elevation conventions (§7,
mostly convention), and the entire film-grading section (§9, craft practice rather than
experiment). Industry design-system guidance (Material, Apple, Carbon, Spectrum, Fluent)
is marked as *practice* throughout and should be treated as reasonable convention, not
evidence.
