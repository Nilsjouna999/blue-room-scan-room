# RESEARCH PROMPT — hand this to Claude (chat, with web search on)

**Why this exists:** the next Blue Room session opens with a fleet on the palette
(`docs/PALETTE_FLEET_BRIEF_V1.md`). That fleet answers questions before it draws
anything — and several of those questions have real published answers we should not
be guessing at. Run this in Claude chat with search enabled, then hand the output
back to Claude Code alongside the handoff.

**How to use it:** copy everything between the rules. Paste as one message. If it
comes back thin, reply "go deeper on §3 and §5, with citations" — those two sections
carry the most decision weight.

---

I am designing the colour system for a dark-themed, text-heavy web archive — a quiet,
near-black reading environment holding long serif passages, small monospace labels,
and one bright near-white "card" object that must feel radiant without glaring. It is
read for long stretches, often at night. I need research, not opinion.

Search the web and the literature. Prefer peer-reviewed work, standards bodies, and
primary vision-science sources over blog posts; where you use industry guidance, say
so and mark it as practice rather than evidence. **Cite everything with links.** Where
the evidence is contested or thin, say that plainly instead of resolving it for me.

Cover these, in this order:

**§1 — Contrast polarity and dark mode.** What does the evidence actually say about
light-on-dark versus dark-on-light for sustained reading? Legibility, reading speed,
comprehension, fatigue. Where does the classic "positive polarity is better" finding
come from, what were its conditions, and how well does it survive modern high-DPI,
high-contrast displays? What role do pupil size, accommodation and astigmatism play,
and how common is the population that genuinely reads better in dark mode?

**§2 — Halation and the pure-white problem.** Why does bright white text or a bright
white object on a near-black ground bloom, smear, or fatigue for many readers? Cover
optical scatter in the eye, display factors (OLED vs LCD, local dimming), and
astigmatism. What does the research suggest about the maximum sensible luminance for a
bright element on a dark ground, and about off-white versus pure white?

**§3 — Contrast metrics beyond WCAG.** ★ This one matters most. Our interface passes
WCAG AA almost everywhere and still reads as stressful and "shouty". Explain why WCAG
2.x contrast ratio is known to be a poor predictor of readability in dark themes, and
cover **APCA (Accessible Perceptual Contrast Algorithm)** and the WCAG 3 / Silver work
in detail: what it measures, how it differs, its lightness-contrast values, and its
current standing. Give me the practical rules it implies for dark UI. Include the
criticisms of APCA too.

**§4 — Warm and cool as depth.** Is there real evidence that cool/blue-shifted dark
surfaces recede and warm surfaces advance? Cover chromostereopsis, chromatic
aberration and the longitudinal focus difference between short and long wavelengths,
plus any colour-appearance-model or art-theory grounding. I want to know whether
"cool recedes, warm advances" is a measurable optical effect, a learned pictorial
convention, or both — and how strong the effect is at very low luminance, where
colour vision is weak.

**§5 — Visual stress and calm.** ★ Second most important. What is known about visual
stress / pattern glare / Meares-Irlen syndrome, and about coloured overlays and tints
for reading comfort? What makes an interface feel "loud" or like everything is
competing for attention — spatial frequency, luminance variance, number of
simultaneous foreground elements, hue count? Is there research connecting a limited
palette or a restricted luminance range to reduced cognitive load or eye strain?

**§6 — Night reading, blue light, circadian.** What does current evidence say about
short-wavelength light and alertness or sleep at typical screen luminances? Be
sceptical and specific — this field is full of overstatement. If the effect at
realistic brightness is small, say so. Does it argue for or against a blue-shifted
dark ground at night?

**§7 — Dark-theme elevation systems in practice.** How do Material Design, Apple HIG,
IBM Carbon and similar handle depth in dark themes — lightness-based elevation, surface
overlays, why they avoid shadows on dark. What do they say about desaturating and about
avoiding pure black? Extract the rules that are actually justified rather than merely
conventional.

**§8 — Dark gradients and banding.** Why do large, soft, low-alpha gradients band badly
on near-black grounds at 8-bit? Cover quantisation, dithering, `dither`/noise
techniques, and what colour depth or technique reliably avoids visible stepping —
including whether animating opacity on such a gradient makes it worse.

**§9 — Colour grading, borrowed from film.** What can a UI take from cinematography's
handling of low-key, near-monochrome imagery: lifted blacks, split toning (cool
shadows / warm highlights), the "teal and orange" convention and the actual perceptual
reason it works, and how colourists preserve a sense of depth and material in very dark
frames.

**Deliverable format.** Structure it as:
1. **Findings** — one section per §, each opening with a one-line answer, then the
   evidence, then the confidence level (strong / mixed / thin).
2. **The design rules that follow** — a numbered list of concrete, implementable rules,
   each traced to the finding that supports it. These will be handed to engineers, so
   make them specific (numbers, ratios, ranges) rather than adjectives.
3. **What the evidence does NOT settle** — the questions I will have to answer by taste
   or by testing, named explicitly so nobody mistakes them for solved.
4. **A reading list** — the ten sources most worth reading in full, with why.

Do not design a palette. I want the constraints and the evidence; the palette is
someone else's job and it will be better for having these first.
