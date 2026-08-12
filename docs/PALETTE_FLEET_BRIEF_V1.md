# THE PALETTE — FLEET BRIEF v1

**Status:** written 2026-08-13 at BR-S408, as the FIRST task of the next session.
Nothing here is a decision. This is the question set, the target, and the fleet shape.

**The builder's instruction, verbatim:**
> "next should start with a fleet to solve out problem with palette, first questions,
> the neccessery aspects and result we are after, aka easy to read, grounding, what
> else? and fleet brainstorm best ideas and concepts, and creates multiple protoypes.
> but thats after question and planning were answered, not only neccessary, but then
> moved to accessory, or bonus, or just visually nice small touches, color grading,
> and every paletter we have. and possible combinations and how"

★ **ORDER IS THE INSTRUCTION.** Questions and planning are answered FIRST. Only then
does the fleet brainstorm, and only then does it build prototypes. A fleet that starts
by generating palettes will produce twenty and settle nothing — the same failure the
78-agent Profile audit had, where scoping by what was verifiable produced 27 line
numbers and almost nothing about what the page was FOR.

---

## 1. WHAT WE ALREADY KNOW — do not re-derive this

Learned the hard way across BR-S400 → BR-S407, and paid for over about a dozen passes:

- ★ **COOL DARKS RECEDE. WARM DARKS ADVANCE.** This is the mechanism behind the
  builder's own words — "the stronger blue made reading and focusing easier and less
  stressful, less things screaming at you". A blue-black ground falls away from the
  eye so only what should be looked at comes forward. A warm ground ADVANCES, which
  puts the floor in the foreground beside the text, and everything competing for the
  front IS the screaming. **The current live design has this fault.**
- **The repo already locked the right structure and nobody was using it.**
  `--ink-950 #0a0b0d` is COOL (B > R) and the source itself calls it "the deepest
  shadow FLOOR only"; every lighter tier is warm. Cool floor, earthy raised surfaces.
- **"Grounding" is a horizon, not a tint.** Earth gathered at the BOTTOM and gone
  before the reading band works. Earth spread evenly does not.
- **Damping is not dimming.** The card is near-white paper on black: its own luminance
  is already the loudest value on screen, so raising it only adds glare. Damp the
  surface (brightness .90) and give the radiance back as a halo in the air around it.
- **BODY paints the page ground.** `.menu` and `#menuView` compute to
  `background: none`. Any agent proposing a ground change must target the element that
  actually paints, and must verify by reading `cssRules.length`, not by looking.

---

## 2. THE QUESTIONS, TO BE ANSWERED BEFORE ANY PALETTE IS DRAWN

### A. The target — what is a good result?
1. What does "easy to read" mean here, **measurably**? Contrast ratio is necessary and
   NOT sufficient — the live page passes AA nearly everywhere and still reads as
   stressful. What is the second axis? (candidates: luminance range compression, hue
   count, how many things sit in the foreground plane at once)
2. What does "grounding" mean operationally — a vertical gradient, a warm base, a
   texture, a weight distribution, or a hue relationship?
3. ★ **What else, beyond read + ground?** The builder asked this explicitly and it is
   the most important open question in this document. Candidates to TEST, not assume:
   calm · depth · warmth without advance · a sense of a place rather than a page ·
   surviving a long session · looking right at 3am and at noon.
4. What must NEVER happen? (the one the current design fails: everything asking for
   attention at once)
5. How is a result judged — by measurement, by the builder's eye, or by a task
   (read a paragraph, find a door, sit for two minutes)?

### B. The system
6. How many hues may the archive contain, in total?
7. What is each hue FOR? Gold, violet, moss, cyan, halo-green and three fr-tier
   colours all exist today (§3). Which are load-bearing and which are leftovers?
8. ★ Do rooms share one palette, or does each room get a REGISTER inside one system?
9. What is the relationship between the FLOOR, the RAISED SURFACE and the OBJECT?
   The cool/warm finding says these are three different jobs.
10. Where does the paper-white card sit — is it IN the palette, or is it the one thing
    the palette is built AROUND?

### C. Boundaries
11. Is the violet commerce register kept? (BR-S384 defined it as "a door that leads
    somewhere paid — a warning, not a sale".)
12. Does gold stay the one gold object, and does the Shelf label stay off it?
13. What is untouchable? (the card's own face, the Codex, the reveal's blues)

---

## 3. EVERY PALETTE WE HAVE — the real inventory

Counted from source at BR-S408. **60 colour tokens in `styles.css` alone**, plus
per-surface sets that do not know about each other.

### styles.css — the main system
```
TEXT    --t-display #dcd7cb · --t-primary #d7d3ca · --t-body #b1ada4
        --t-meta #948f87 · --t-ghost #6e6b63        (warm sand ramp, no pure white)
GROUND  --ink-950 #0a0b0d  COOL FLOOR
        --ink-900 #100f0c · --ink-850 #11100d · --ink-800 #151310 · --ink-700 #1c1915
                                                   (every tier above the floor is WARM)
LINE    --line-faint / --line / --line-strong · --hair-1 / -2 / -3
                                                   (all rgba(233,229,220, x))
ACCENT  --silver #c8c4bb · --moss #5e6f60 · --moss-bright #7e937f
        --free-silver #b8b3a8 · --violet #8b7bff · --cyan #5fd4e0
        --halo-green #6fe09f · --fr-tier ×3 (#82807a, #c2a274, #b6a6e0)
```

### arcana-profile.css — a SECOND, parallel system (16 tokens)
```
--pf-gold #a2864a · --pf-gold-lit #c0a05d
--pf-cream #e9e5dc · --pf-cream-display #dcd6c9 · --pf-crown #e0dacd
--pf-room #0a0b0d · --pf-tab-bg #0c0d11
--pf-line / -soft / -cut   rgba(201,163,92, x)   ← GOLD-tinted hairlines, not cream
--pf-body #b1ada4 · --pf-meta #9c9790 · --pf-ghost #96918a
--pf-violet #8a6fb0 · --pf-violet-lit #a487c8 · --pf-violet-line rgba(138,111,176,.4)
--pf-mono-micro / -label / -meta (+ -trk)         the type ladder, BR-S388
```

### reveal/reveal.css
`--fin-core rgba(190,220,255,.70)` · `--fin-bloom rgba(90,145,255,.32)` ·
`--fin-after rgba(90,145,255,.08)`
★ **The only true blues in the system, and they belong to the develop ritual.**

### settings.css
`--st-danger #c98a6f` · `--st-danger-lit #dba38a` · `--st-danger-line rgba(201,138,111,.30)`

★ **A STRUCTURAL FINDING, FREE:** the Profile carries a complete parallel palette whose
greys nearly-but-not-exactly match the main one — `--t-meta #948f87` vs `--pf-meta
#9c9790`, while `--t-body` and `--pf-body` are byte-identical — and whose hairlines are
GOLD where the main system's are cream. Whether that is a deliberate REGISTER or
accumulated DRIFT is question 8, and it is the highest-leverage question here.

---

## 4. THE FLEET — 30 agents, composition set by the builder

**10 Haiku · 12 Sonnet · 6 Opus on the highest-leverage roles · +2 Opus critics ·
up to 5 more agents only if a phase proves they are worth it.**

The tier rule that governs every assignment below (`fleet-model-mix`): *if the answer
has a line number, it is not an Opus task.* Haiku extracts and counts. Sonnet reads,
measures and builds. Opus is spent only where the answer needs judgement, synthesis,
or an unstated connection — and where being wrong is expensive.

### OPUS ×6 — the highest-leverage roles
| # | Role | Why it must be Opus |
|---|---|---|
| O1 | **Question lead** — owns §2, and does not release the fleet until §2A.3 *"what else?"* has an answer the builder has seen | The whole brief is downstream of this. A wrong target makes 29 agents productive in the wrong direction |
| O2 | **Register-or-drift adjudicator** — settles §2B.8 on the Profile's parallel palette (§3) | Highest-leverage single question in the inventory. "Nearly the same grey" is either a deliberate register or years of drift, and only reading intent across both files can tell |
| O3 | **Concept architect A** | A concept is a thesis about what recedes and what advances — an argument, not a swatch set |
| O4 | **Concept architect B** — briefed to differ from A on the axis, not the hues | Two genuinely different arguments beat six variations of one |
| O5 | **Synthesiser** — merges the surviving concepts into the shortlist the builder sees | Must hold every finding at once and graft the best of the losers onto the winner |
| O6 | **Prototype director** — turns the shortlist into buildable overrides and specifies the A/B harness | Owns the three traps in §5; a prototype that lies about which version is showing is worse than none |

### OPUS ×2 — the critics, adversarial by construction
| # | Role | Brief |
|---|---|---|
| C1 | **Refuter** — tries to KILL each concept | Default to rejection. Name the reader for whom the concept fails and the surface where it breaks. A concept that survives C1 has earned its prototype |
| C2 | **Completeness critic** — "what is missing?" | Which axis was never tested, which surface never opened, which claim never verified. What C2 finds becomes the case for the 5 optional agents |

### SONNET ×12 — the competent middle, where most of the work lives
- **S1–S5 — surface readers** (one each: `styles.css` · `arcana-profile.css` ·
  `reveal/` · `settings.css` + `arcane.css` · `codex` + `drawing-room`). Not just
  tokens: what actually RENDERS, on which element, and which element paints the ground.
- **S6–S8 — prototype builders**, one per surviving concept, working to O6's spec.
- **S9–S10 — measurement.** Contrast matrices, luminance ranges, APCA lightness
  values, hue counts per surface. Numbers, not adjectives.
- **S11 — trap-check.** Runs every prototype against §5's three traps and reports
  `cssRules.length` for each. A prototype that does not parse does not count.
- **S12 — law-check.** Does each proposal break a decided rule — the one gold object,
  violet as the paid-door mark (BR-S384), the card's face, the mono ladder (BR-S388)?

### HAIKU ×10 — bounded, mechanical, verifiable
- **H1–H6 — extraction.** Every colour literal and token in one assigned file, with
  line numbers and the selector it lands on. No interpretation.
- **H7 — duplicates.** Tokens with identical values under different names.
- **H8 — near-misses.** Pairs within ΔE of each other but not equal (this is how
  `--t-meta` vs `--pf-meta` was found).
- **H9 — dead tokens.** Declared and never consumed.
- **H10 — arithmetic.** Contrast ratios for every text/ground pair the readers report.

### THE 5 OPTIONAL AGENTS
Spend only on a case made by C2, and log what they were spent on. Likely candidates:
a third concept if C1 kills two; a dedicated card-and-halo agent if the paper-white
turns out to be the real constraint (§2B.10); an agent for the reveal's blues if §3
shows them to be the system's only true blue and therefore load-bearing.

### PHASES — the order is the instruction
1. **ANSWER** (O1, O2, +C2 listening). Output is a decision sheet. No palettes exist yet.
2. **INVENTORY** (H1–H10, S1–S5). Output is one table. Fully parallel.
3. **CONCEPTS** (O3, O4 — then C1 tries to kill both).
4. **PROTOTYPES** (O6 directs, S6–S8 build, S11 verifies they parse).
5. **SYNTHESIS** (O5), then the builder looks.
6. **ONLY THEN the accessory pass** — bonus, nice touches, colour grading,
   combinations and how. Never mixed into the necessary.

## 5. THE PROTOTYPE HARNESS THAT ALREADY EXISTS

`_m1m2-dark.html` (untracked scratch). The real site in an iframe plus an injected
override, live A/B, `D` toggles, `1` / `2` / `3` jump to L1 / M1 / M2. It carries the
current dense candidate: cool blue crown, earth rising to 46%, warm tiles, card damped
to .90 with a halo.

★ **THREE TRAPS IT COST A SESSION TO LEARN. Every prototype agent must be told:**
1. **No backticks inside the template literal.** A backtick in a comment ends the
   string. This broke the file three times in one session.
2. **No CSS comments inside the literal either.** One malformed comment invalidates the
   ENTIRE sheet, silently. Reasoning goes in a JS block above it.
3. **Verify with `el.sheet.cssRules.length`, never by eye.** The sheet parsed to ZERO
   rules through several passes while differences were being confidently reported.
