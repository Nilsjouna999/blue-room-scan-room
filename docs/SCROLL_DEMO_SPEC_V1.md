# THE SCROLL DEMO — the fleet verdict and the buildable spec

> Produced by a 22-agent run (5 haiku measuring, 10 sonnet designing, 7 opus
> diverging / breaking / deciding). 126 findings, 2.0M tokens, judged against
> docs/SCROLL_DEMO_V1.md — read that first, it is the brief this answers.
>
> Reproduced VERBATIM. Nothing here has been re-summarised by me; where I
> disagree it is noted in the session report, not edited into the text.

---

# PART ONE — THE VERDICT

# VERDICT — **THE WET EDGE**. Build it. The other two are unbuildable on the shipped card.

## The tiebreaker nobody stated

The fixture will not stay a stranger's. `arcana-reading.js:105-121` (`birthReading` → `readingForSeed`) derives all six marks **client-side from local JSON**, and `arcane.js:1206` already routes a typed name+date to a real reading with no network. `POST_TARGET` (app.js:1728) gates *payment*, not derivation. So the demo's single highest-value upgrade — the visitor's own name in the letter — is available today, and the correct question for Act 3 is not "which movement is prettiest" but **which mechanism survives a fixture it did not know at build time.**

- **RESTRIKE** dies instantly: its donor deal (which glyph travels to which slot, convergence groups, travelled-vs-struck ratio) is generated per fixture. A visitor-typed name re-computes the entire animation.
- **SPINE** dies instantly: six lines of prose typeset to 0.5px against a fixed measure, per fixture.
- **WET EDGE** is indifferent. `front_y(p)` crosses a fixed-px box; rows rise where the front is. Swap Elias Crane for the visitor and nothing in the motion needs regenerating — only the letter's six lines and the six mark strings.

That alone decides it. The geometry then confirms it.

## Why the losers are dead, verified

**SPINE — the premise does not exist on this card.** `styles.css:3514`: `height: clamp(400px, 56vh, 620px); aspect-ratio: 120/190; width: auto` → card 253–392px wide, minus `.m2bface { padding: 14px 12px }` (styles.css:3689-3693) → a text measure of **229px to 368px, fluid with viewport height**. SPINE needs six serif sentences each containing a mono mark word, each exactly one line box. `16 · ENTHUSIASM` at 10px/.15em is ~112px — half the floor measure. It wraps, and there is no width at which it doesn't, because the width is continuous. Its 0.5px centre-axis tolerance is also below the card's own documented tracking error (BR-S362 notes 0.75px on the marks). And it spends the payoff at p=.20: all six answers are legible plain text before Act 3 starts, so Act 3 removes rather than delivers — mistake #7, literally.

**RESTRIKE — its one teaching beat is false, in exactly the CLAIM_AUDIT way.** `arcana-reading.js:114`: `lifePathNum` builds `""+y+MM+DD` — **`"19790730"`, eight digits, year first** — sums to 36, and `reduceNum` (:113) **loops**: 36 → 9. RESTRIKE animates one reduction over seven date-first digits. It also fails to generalise: `reduceNum` preserves 11/22/33, so "converge to one glyph" is structurally wrong for many dates. Its "survival ratio = derivation directness" law is a string-length coincidence (`hash`/`pick` at :43-44 have no length relationship). And 21 travelling glyphs on a **229px** measure — reached on any laptop under ~715px tall, not just phones — is soup. Its marquee poster is composed at the ceiling only.

## What THE WET EDGE gets right

Zero text-node mutation inside the turn (letter fully written by p=.38), zero layout reads in the scroll loop, ~37 transform/opacity writes/frame on existing elements. Its geometry is **vertical only, in a fixed-px 132px box** — immune to the fluid width that kills the other two. Its three posters fall out of one monotone `front_y(p)` with no special-casing. Its honesty guard is explicit and correct: all six come from one seed (`arcana-reading.js:119-120`), so it never claims which fact made which mark. And it refuses the crown — correct, since `crownOf` (`arcana-reading.js:100`) reads only sun/chinese/rune/trigram.

## Grafts

**From SPINE — replace the rate story.** Kill the L\* pigment-density derivation: the two decks invert (dark `--mk-path:#78838f` vs parchment `#313d4c`, styles.css:3793-3795 / 3805-3807), so it would develop in a different order on `?m2=dark`, and an 18% spread is imperceptible anyway. Replace with SPINE's honest, deck-independent source: **dwell ∝ the ink weight of the prose line the front is crossing** — more silver to wash out takes longer to clear. Widen the spread to something visible, keep the front strictly monotone top-to-bottom. Author the Nauthiz line as the heaviest so the **cost row is the last thing to clear** (leverage #4, inside the turn).

**From SPINE — the empty name ledge at p=.50.** Both designs arrived here independently; take it as settled. `docs/EMPTY_FRAME_V1.md`, one frame, a promise.

**From RESTRIKE — two things only.** (1) The easing law, stated best there: *positional easing symmetric, opacity easing may not be.* `cubic-bezier(.42,0,.58,1)` (styles.css:3665) for `front_y`; `--ease-settle` (styles.css:3642) never on position. (2) Its "real tax" — Act 2 must type by per-span opacity over pre-rendered spans, **not** `text.slice()`. WET EDGE needs 18 prose segments anyway, and slicing reflows a text box every rAF tick, against the perf contract at styles.css:5058.

**Leave behind:** the entire donor deal, the life-path digit collapse, the survival-ratio law, SPINE's typesetting test, SPINE's pre-visible marks.

## Four fixes before a line is written

1. **`.m2hero::before` carries `transition: opacity 260ms var(--ease-settle)` (styles.css:3653) and is gated by `.m2hero.is-tilting` (:3658).** Both must go for the demo — every per-frame write becomes a new 260ms target, so the light trails scroll by a quarter second and on a flick never lands. A class gate is also stored state (mistake #1). Same trap on `.m2hero`'s own `transition: transform 420ms` (:3641) — never write a p-driven transform to the card element, only to its children.
2. **Measure the row pitch, don't assume 22px.** `.m2bface__marks` is `grid; gap:12px; font-size:10px` (styles.css:3781-3785) with no declared line-height — the inherited line box is ~12px, so pitch is ~24px and BOX_H ~132px is right but the prose leading spec is 2px/row wrong. Measure once at load and on resize; never in the loop.
3. **The letter must be six explicit block elements.** At a 229–368px fluid measure, flowed text re-wraps and two lines merge at the ceiling.
4. **Accept that the held beat is a distance, not a duration.** A flick crosses .38–.50 in one to two frames. WET EDGE is the only one of the three whose hold frame survives that — its held beat is *a complete legible letter*, a poster at any velocity, where RESTRIKE's ledger beat (labels fading before ink moves) simply never happens.

## Build order

**p=.44 first, at the 400px floor card, before anything else.** The half-developed seam — three rows up, three lines of letter untouched, the 2.5° band across the middle — is the whole design. If it reads as a smear at 229px, the mechanism is wrong and no copy fixes it. Second check on the slider: whether three segments per prose line read as one lean or three steps (fix with 4 segments or a shallower θ). Third: profile the `mix-blend-mode: soft-light` lobes — BR-S276 (app.js:4181-4197) already found this is the one real per-frame paint cost, and the shipped mitigation (flatten during travel) is unavailable here because the lobes *are* the effect. The card is ~100k px vs the Desk's 1.76M, so it should hold; it is still the first thing to cut on a weak device, and `styles.css:3660` already `display:none`s it under reduced motion.

## One thing outside the turn that outranks it

Sentence 2 of the tutorial — *"the same every time"* — cannot be proved by one fixture rendered once, and none of the three assigned it evidence. The page has exactly one repetition available: **the reverse scroll.** All three spent it on aesthetics. Give it to determinism instead: run back, run forward, the identical six return. WET EDGE is the only one that can carry this, because its reverse is content-identical by construction and it asserts no fact→mark mapping that a second pass could contradict. That reframing costs nothing architecturally and is the only way the demo passes its own tutorial test.

---

# PART TWO — THE BUILDABLE SPEC

# BUILDABLE SPEC — THE SCROLL DEMO, ACT 3 IS **THE WET EDGE**

## 0 · The turn, and why this one

Act 3 is a **developer front**: one soft horizontal band travels down through the single box that holds both the written letter and the six marks. Where it has passed, the letter's ink has washed out of the stock and the six marks have risen up to the paper plane. Nothing else on the card moves.

Three mechanisms were specified in full. Two are unbuildable on the shipped card, and the reasons are geometric, not aesthetic:

- **The card is fluid.** `styles.css:3514` — `height: clamp(400px, 56vh, 620px); aspect-ratio: 120/190; width: auto` → the card is **253–392px wide**, and `.m2bface { padding: 14px 12px }` (`styles.css:3688-3693`) leaves a text measure of **229px at the floor, 368px at the ceiling**, varying continuously with viewport height. The floor is reached on any laptop under ~715px tall, not on phones.
- **THE SPINE** needs six serif sentences each containing a mono mark word, each exactly one line box, each centred to 0.5px. `16 · ENTHUSIASM` alone is ~110px at 10px/.15em — half the floor measure. It wraps, and there is no width at which it doesn't. Its 0.5px tolerance is also below the card's own documented tracking error (`styles.css:3714+`, BR-S362 §1: 0.75px on the marks). And it makes all six answers legible plain text at p≈.20, so Act 3 removes instead of delivers.
- **THE RESTRIKE**'s one teaching beat is false in the CLAIM_AUDIT way. `arcana-reading.js:114` — `lifePathNum` builds `""+y+MM+DD` = **`"19790730"`, eight digits, year first**, sums to 36, and `reduceNum` (`:113`) **loops**: 36 → 9. RESTRIKE animates one reduction over seven date-first digits, and `reduceNum` preserves 11/22/33 so "converge to one glyph" is structurally wrong for many dates. Its survival-ratio "law" is a string-length coincidence — `hash`/`pick` (`:43-44`) have no length relationship. And 21 travelling glyphs on a 229px measure is soup.

**THE WET EDGE is the only one whose geometry is vertical-only inside a fixed-px box**, so it is immune to the fluid width. It mutates zero text nodes during the turn, reads zero layout in the scroll loop, and its three posters fall out of one monotone `front_y(p)` with no special-casing.

**The tiebreaker nobody stated.** The fixture will not stay a stranger's. `arcana-reading.js:105-121` derives all six marks **client-side from local JSON**; `arcane.js:1206` already routes a typed name+date to a real reading with no network. `POST_TARGET` (`app.js:1728`) gates *payment*, not derivation. So the demo's highest-value future upgrade — the visitor's own name in the letter — is available today, and the right question for Act 3 is *which mechanism survives a fixture it did not know at build time*. RESTRIKE's donor deal and SPINE's typesetting both regenerate per fixture. **WET EDGE is indifferent**: swap the person and only the letter's six lines and the six mark strings change. Nothing in the motion is touched. Build for that.

---

## 1 · THE FIXTURE — derived, not written

**Elias Crane, 30 July 1979.** Seed: `birth~Elias Crane~1979~7~30`.

Re-derived against the real engine (`hash` FNV-1a with `Math.imul`, `arcana-reading.js:43`; `pick` `:44`; `sunSign` `:111`; `chineseAnimal` `:112`; `lifePathNum` `:114`; `birthReading` `:116-121`) reading the shipped `codex-data.json` banks:

| slot | value | source | keywords (real) |
|---|---|---|---|
| Sun sign | **Leo** | date, direct | confident, generous, dramatic, **proud**, creative |
| Year animal | **Goat** | year, direct | gentle, creative, compassionate, **indecisive**, **anxious** |
| Life path | **9** | digit sum 1+9+7+9+0+7+3+0=36 → 9 | compassion, humanitarianism, completion, letting go |
| Rune | **Nauthiz** | `pick(by.rune, seed+"f")` | **need, constraint, hardship**, resilience, necessity |
| Trigram | **☲ Lí · Fire** | `pick(by.trigram, seed+"g")` | fire, light, clarity, clinging |
| Hexagram | **16 · Enthusiasm (Yù)** | `pick(by.hexagram, seed+"h")` | inspiration, harmony, preparation, momentum |

Crown (`crownOf`, `arcana-reading.js:100-101`, tables at `:89/:91/:92`): sun element `fire` + animal element `earth` → `EP["fire|earth"]` = **Ember-Banked**; Nauthiz → `RO.nauthiz` = **Endurer**. → **"The Ember-Banked Endurer"**, bound `in clinging light` (`BIND.li`).

Three cost traits land without cherry-picking: Leo's *proud*, Goat's *indecisive/anxious*, and Nauthiz which is *need / constraint / hardship* outright. §4 and §9.4 clear.

**Display rules.** The shipped `.m2bface__marks` renders slot *labels* (`app.js:2617-2619`). The demo renders **values**. Uppercase comes from CSS (`styles.css:3784`), so the six strings are `LEO · GOAT · 9 · NAUTHIZ · ☲ LÍ · FIRE · 16 · ENTHUSIASM`. The hexagram's romanisation `(Yù)` is trimmed on the card and carried in full in the Act 4 panel. The labels are not lost — Act 4 restores them.

**The test that ships with it.** One assertion file: call `birthReading("Elias Crane", 1979, 7, 30, "birth~Elias Crane~1979~7~30")` and assert `d.sun.name`, `d.chinese.name`, `d.life.name`, `d.rune.name`, `d.trigram.name`, `d.hex.name` and `person.born === "30 July 1979"` all equal the baked object. If it fails, the demo does not ship. Same discipline as `tools/build_atlas.py`.

**The letter is the engine's own field.** The date line uses `person.born` verbatim (`arcana-reading.js:121`) — the card's copy is a field of the reading, not prose written about it.

---

## 2 · THE P-MAP — five acts, one number

`p = clamp01((scrollTop − sectionTop) / (sectionHeight − viewportHeight))`. `sectionTop` and `sectionHeight` are measured **once at load and on resize**, never in the handler. Ship at **480vh** (medium); the section height is one constant, so 320vh and 680vh are one-line tests.

| act | p | vh @480 | what happens |
|---|---|---|---|
| 1 EMPTY PAIR | .000–.060 | 28.8 | blank intake, blank card, one rule drawing |
| 2 THE FACTS | .060–.380 | 153.6 | name types → card receives → date types → card receives → **held letter .360–.380** |
| 3 **THE TURN** | .380–.500 | 57.6 | plate lowered .380–.400 · sweep .400–.478 · drain .478–.494 · rest .494–.500 |
| 4 THE SIX | .500–.880 | 182.4 | six panels, ~30vh each, non-overlapping windows |
| 5 THE CLOSE | .880–1.000 | 57.6 | six settle · crown · the way in · the reversal instruction |

Act 3 keeps the brief's `.38/.50` anchors so the front formula below is untouched by any re-proportioning. Act 4 is trimmed from `.90` to `.88` and the freed room goes to the close — Act 4 delivers the least load-bearing of the three tutorial sentences, and its content is one click away in the Codex.

---

## 3 · ACT 3 — THE WET EDGE, in numbers

### 3.1 Geometry

The letter is **not beside** the marks — it is **on** them. `.turn__prose` is `position:absolute` over the exact box `.m2bface__marks` occupies. One patch of card stock, two latent images.

`.m2bface__marks` is `display:grid; gap:12px; font-size:10px` (`styles.css:3780-3785`) with no declared line-height, so it inherits **1.4** (`styles.css:228`) → **line box 14px, pitch 26px, BOX_H = 6×14 + 5×12 = 144px**. Row *i* top `y_i = i·26` → `0, 26, 52, 78, 104, 130`.

> **Measure these at load; do not hardcode them.** One `getBoundingClientRect` sweep at first layout and on resize, cached. A single rect read inside the p loop turns this into layout thrash on every scroll frame and is the one way this act can fall off the 8.3ms/120Hz budget.

The prose is set in `--font-display` at 15px with **line-height forced to 26px** so six letter lines sit exactly on six mark rows. Six **explicit block elements** — at a 229–368px fluid measure, flowed text re-wraps and two lines merge at the ceiling.

### 3.2 The front

One element `.turn__front`, `BAND = 28px`, drawn once as a static soft band (bright leading lip over a darker trailing wash — the same two-lobe grammar as `.m2hero::before`, `styles.css:3650-3657`). Never repainted. Only `translateY`.

```
u_raw = (p − .400) / .078                    // 0 → 1 across the sweep
front_y = −BAND + E(clamp01(u_raw)) · (BOX_H + 2·BAND)     // −28px → 172px
E = cubic-bezier(.42, 0, .58, 1), closed-form
```

`E` is lifted from `@keyframes m2-flip` (`styles.css:3665`) **for its symmetry about the midpoint** — negated time is a true mirror. `--ease-settle` (`styles.css:4632`) is an ease-out; negated it reads as a snap-release. **Positional easing symmetric; opacity easing may not be.** `front_y` must be **strictly monotone** — an overshoot would make a row resolve, un-resolve and re-resolve inside one continuous downward scroll.

### 3.3 The edge is tilted

Every element reads the front at its own x:

```
θ = 2.5°
u(e) = clamp01( (front_y − (y_e + tanθ·(x_e − x_c))) / BAND )
```

Across the 144px mark column that is ±2.4px; across the 229px prose measure ±5px — a hair off horizontal, which is the difference between a mask and a liquid. θ is fixed geometry, not time, so every p stays deterministic.

Each prose line is split into **3 word-boundary segments** (18 elements total) so the tilt reads as a lean and not a step. If three segments read as three steps on the slider, go to four or shallow θ — that is the second thing to check, after p=.44.

### 3.4 The rows rise at six different rates — and the source is ink, not pigment

> **The pigment-density story is dead.** The two decks invert (`styles.css:3793-3795` dark `--mk-path:#78838f` vs `styles.css:3805-3807` parchment `#313d4c`), so an L\*-derived ordering would develop rows in a *different order* on `?m2=dark`. An 18% spread is imperceptible anyway.

Replace with the deck-independent source grafted from SPINE: **dwell ∝ the ink weight of the prose line the front is crossing.** More silver to wash out takes longer to clear.

`W_i` = normalised character count of letter line *i*. `w_i = .55 + .45·W_i`.

| row | mark | letter line | chars | W | w |
|---|---|---|---|---|---|
| 0 | LEO | `For Elias Crane,` | 16 | .00 | **.550** |
| 1 | GOAT | `born 30 July 1979.` | 18 | .17 | **.625** |
| 2 | 9 | `Nothing else was asked.` | 23 | .58 | **.811** |
| 3 | NAUTHIZ | `And that is the whole of it.` | 28 | 1.00 | **1.000** |
| 4 | ☲ LÍ · FIRE | `Given, not chosen.` | 18 | .17 | **.625** |
| 5 | 16 · ENTHUSIASM | `The same, every time.` | 21 | .42 | **.739** |

Then per row:

```
v_i    = clamp01( u_i / w_i )
opacity   = v_i
translateY = (1 − v_i) · 2px            // comes UP to the paper plane
scale      = .988 + .012·v_i
swell      = on v ∈ [.80, 1.00], scale runs 1.000 → 1.012 → 1.000   (closed-form pass on v, not a spring)
prose segment opacity = 1 − u(seg)      // no transform — unexposed silver washes out, it does not move
```

**Why this is the right graft.** The band is 28px and the pitch is 26px, so ~2 rows are inside the band at once — enough that weight **reorders adjacent rows** and the sweep can never read as a wipe. It is a local reordering, not a global one, and the spec says so rather than overclaiming.

`w_3 = 1.000` is deliberate: **NAUTHIZ, the cost, is the slowest thing on the card** — it lingers half-formed longer than any gift. Leverage #4, inside the turn, not deferred to Act 4.

`Given, not chosen.` is the shipped corrected phrasing (`app.js:2471-2480`). The brief's own §1B line *"looked up, not invented"* is **false for three of the six** (`arcana-reading.js:109` comment; `:120` `pick(by.rune, seed+"f")`) and must never appear on this card or in the tutorial copy.

`The same, every time.` is tutorial sentence 2, and §5 makes it provable — see 6.2.

### 3.5 The card's light rides the front

`--ly` on `.m2hero::before` = `front_y` as a % of card height. `--lx` pinned 50%. The pseudo-element already places its dark lobe **3% below** its bright lobe (`styles.css:3650-3657`) — unmodified, that is a leading lip with a shadow under it. Leverage #8, one property write, and the art the wet edge needs already ships.

### 3.6 The four beats

- **.380–.400 PLATE LOWERED.** Absolute stillness. Letter complete and legible, front parked at `front_y = −28` (invisible), all six marks at opacity 0. Not one property changes. The `.m2hero::before` opacity ramp 0→1 is spent in Act 2's tail (.340–.360) so this hold has nothing in it.
- **.400–.478 THE SWEEP.** As above.
- **.478–.494 DRAINING OFF.** The front has cleared the bottom edge; its opacity runs 1→0 as it slides past the card boundary. The two slowest rows finish their swell inside this window.
- **.494–.500 REST.** Dead still, so the turn never runs into Act 4's motion.

### 3.7 What Act 3 must not touch

The masthead, `.m2bface__headrule` (`app.js:2615`), the bottom wall and *"By birth alone"* (`app.js:2621-2624`) hold absolutely fixed — they are the frame, not the image.

**`.m2bface__name` stays EMPTY through the entire turn.** It is not fed by the six: `crownOf` (`arcana-reading.js:100`) reads only sun, chinese, rune and trigram — life path and hexagram contribute nothing. Any six-into-one convergence here would be a false claim made by motion, which no copy review catches. An empty name ledge above six risen marks is the correct p=.50 frame, and it is `docs/EMPTY_FRAME_V1.md` used properly: one frame, a promise, never a grid.

---

## 4 · TEN NAMED VALUES OF p

| p | on screen |
|---|---|
| **.000** | Intake blank, card blank but not inert: masthead `THE BIRTH READING` and the diamond glyph drawn (`app.js:2599-2600`), `.m2bface__headrule` at `scaleX(0)`, a hairline caret at 0 opacity. `.m2hero::before` at rest. |
| **.015** | **The first pixel answered.** `t = p/.020`: the headrule has drawn ~75% of its width from a fixed left origin (`scaleX`, not a wipe-mask), and the caret has faded in at the name's start point. Two things, both `transform`/`opacity`, both erased in reverse by arithmetic. Nothing else. |
| **.130** | Intake's name field mid-type. Card unchanged and conspicuously blank — no placeholder dash, no box, or it reads as a form. |
| **.250** | Name has landed on the card as one settled write (never re-typed there). Intake's date field mid-type. Date line on the card does not exist yet. Only one thing moving anywhere. |
| **.370** | **The held letter.** Six lines of display serif, complete: *For Elias Crane, / born 30 July 1979. / Nothing else was asked. / And that is the whole of it. / Given, not chosen. / The same, every time.* Six mark rows at zero beneath them. Total stillness. This frame is a poster at any scroll velocity — which is why it survives a flick, where RESTRIKE's ledger beat would not. |
| **.400** | **Plate lowered.** Identical to .370 except the room has reached its Act-3 dim and `.m2hero::before` is lit and parked. Front invisible above the top edge. |
| **.440** | ★ **THE HALF-DEVELOPED SEAM — BUILD THIS FIRST.** `front_y ≈ 75px`, dead centre of the 144px box. Above: LEO and GOAT fully up and coloured; `9` at v≈.72, rising, at 99.5% scale. Across the band, tilted 2.5°, the `Nothing else was asked.` line is dissolving right-to-left across its three segments. Below: three lines of the letter fully legible and untouched. NAUTHIZ, LÍ and the hexagram are three empty rows — not a hole in the composition, but what keeps three rows active at once. The card's light sits exactly on the seam. |
| **.490** | **Lifted clear.** All six up. NAUTHIZ and the hexagram still finishing their 1.012 swell. Not one word of the letter left. The front's last 6px draining off the bottom edge at 30% opacity. The name ledge above the six deliberately empty. Six materials on spent paper. |
| **.690** | Act 4, panel 4 of 6 (Rune). NAUTHIZ's panel is open with the real Codex text — *need / constraint / hardship / resilience* — and real `kwcolor.json` perk hues. Panels 1–3 sit settled and dimmed above; 5–6 compact below. **Only panel 4 is in motion.** Its label `Rune` is restored here. |
| **1.000** | Six settled back to the compact list. `.m2bface__name` fills for the first time: **The Ember-Banked Endurer**. Room at its darkest, flat since p≈.95; `--lx/--ly` eased to a fixed rest by the same mark. Below the card, in `.m2face-orient`'s mono register: the way in, the price named honestly, and one line — *Scroll back. It reads the same.* |

**The test the brief sets:** open twenty random p in .38–.50 and every one lands as plate, seam, or drained — never as a tween. And because everything is arithmetic on `front_y` which is arithmetic on `p`, `?p=0.437` cold-loaded is byte-identical to scrolling there.

---

## 5 · EXISTING CODE — reuse, and four traps

### Reuse

| what | where |
|---|---|
| the whole destination card | `app.js:2598-2626` — `.m2bface`, masthead, `.m2bface__headrule`, `.m2bface__name`, six-item `.m2bface__marks`, bottom wall |
| the marks box (grid, gap 12, 10px mono, .15em, uppercase) | `styles.css:3780-3785` |
| the six pigments, both decks, unchanged | `styles.css:3793-3795` (dark) / `3805-3807` (parchment) |
| optical-centring corrections already applied | `styles.css:3714+` (BR-S362) — `text-indent: .075em` on `li` |
| the two soft-light lobes, `--lx/--ly` | `styles.css:3650-3657` |
| the symmetric curve `cubic-bezier(.42,0,.58,1)` | `styles.css:3665` — **the curve only** |
| the prose register (`--font-display`, 15px) | `styles.css:282` `.module__line` |
| the meta register for Act 5's offer | `app.js:2623` `.m2face-orient`; `styles.css:3283` `.m2read__label` |
| independent transform properties | `el.style.translate` / `.opacity`, one coalesced write per node per frame (`rooms-field-physics.md:60`; `app.js:3581-3587` on why custom properties lose a frame) |
| the perf contract this obeys literally | `styles.css:5058-5062` |
| reduced-motion hook | `window.BRMotion.prefersReduced()` (`data.js:19`), used at `app.js:500, 928, 2917, 3304, 4676` |

### Traps — fix before a line is written

1. **`.m2hero::before` carries `transition: opacity 260ms var(--ease-settle)` (`styles.css:3653`) and is gated by `.m2hero.is-tilting` (`styles.css:3658`).** Both must go for the demo. Every per-frame write becomes a new 260ms target, so the light trails scroll by a quarter second and on a flick never lands. A class gate is also stored state — mistake #1.
2. **`.m2hero` itself carries `transition: transform 420ms` (`styles.css:3641-3643`).** Never write a p-driven transform to the card element; only to its children.
3. **Do not use `.m2hero.is-turning` / `@keyframes m2-flip` (`styles.css:3663-3668`).** A `rotateY(90deg)` frame is a blank edge-on card and fails the poster rule outright. Steal the curve, nothing else.
4. **Do not reuse `wireM2Turn` / `.m2hero--turn` (`app.js:2966-2994`).** It has been dead since parchment became default (`html.m2-parch` sets `display:none` on the elements it animates); it is a one-shot module flag with chained `setTimeout`s — the exact events-not-position pattern the architecture forbids. Its class name suggests a rotation precedent that does not exist.

### The one change to a decided item

**Act 2 must type by per-span opacity over pre-rendered spans, not `text.slice()`.** Slicing a text node reflows its box on every rAF tick — the one place the design's own mechanism fights `styles.css:5058`. WET EDGE needs 18 prose segments anyway. The uneven hand rhythm (leverage #5) survives unchanged, but reveal thresholds must be **deterministic arithmetic on index** — e.g. base 30ms/char, +55ms after a space, +90ms after a comma or period, ±6ms from `(i*2654435761)%7`. **Never `Math.random()`**, or `?p=0.42` stops being one image.

---

## 6 · WHAT THE OTHER FOUR ACTS OWE

### 6.1 Acts 1, 2, 4

- **Act 1 stays ~29vh at every total length.** Its only job is to answer the first pixel; more room buys nothing and is mistake #4 in slow motion.
- **Act 2's handoff is sequential.** Intake field types → stillness → card receives the *already-complete* line as one settle. If the card also typed, it would read as labouring over the fact, contradicting *"nothing is rolled here."*
- **Act 4's six windows must be strictly increasing and non-overlapping.** Overlap for a smoother forward cascade makes retraction order ambiguous — the one thing this page cannot have.

### 6.2 Act 5 — and the thing that outranks the turn

Tutorial sentence 2 — *"the same every time"* — **cannot be proved by one fixture rendered once**, and none of the three proposed turns assigned it evidence; all three spent the reverse on aesthetics. The page has exactly one repetition available: **the reverse scroll.** Give it to determinism.

At p=1, under the settled record and beside the way in, one line in the meta register: **"Scroll back. It reads the same."** It is true by construction, it converts the reversal into the proof, it costs nothing architecturally, and WET EDGE is the only one of the three that can carry it — its reverse is content-identical and it asserts no fact→mark mapping a second pass could contradict.

**The reverse is worth watching on its own terms.** The print goes back into the bath: rows re-submerge as the front retreats, the letter re-condenses out of the fibre behind the edge, right-to-left within each line because the tilt is still the tilt. A meniscus is direction-agnostic — nothing in the frame announces that it is running backwards. And the direction reveals what the forward pass hides: going down you watch the marks arrive; going up you watch **which one refuses to leave** — NAUTHIZ, the cost, at `w = 1.000`.

**Two constraints keep this free:** `front_y`'s ease monotone and symmetric (3.2), and **no direction flag anywhere**. Instantaneous `sign(dp)` is legal state; a stored last-direction is mistake #1 wearing a coat.

**The room re-lightening on the way up is correct** — it is the lights coming up as the visitor leaves, not an achievement being taken back. **Do not clamp the dim monotonic**; a `max()` over past p is a hidden history variable and would make `?p=0.42` render two ways depending on how you arrived.

### 6.3 Three honesty rules for Act 5's copy

- **No persistence claim.** There is no reading store — `br_holdings` is a mock boolean (`app.js:4074`), `POST_TARGET` is null and guarded twice (`app.js:1728, 2012`). *"The record is whole"* sits one word from *"and it's yours to keep."* Do not write that word.
- **Name the price.** The demo teaches *"cheap, no photo, no account, nothing to lose"* and the shipped door prices at **$4.99 · $7.99 for two** (`app.js:1476`). Violet is reserved for price precisely so price is never a surprise; a 520vh performance that withholds it is the largest surprise-price surface on the site. The honest structure is available and true: **the derivation is free** (it runs in the browser), the **holding** is what costs.
- **p=0 is the share URL.** `?p=` is a review and headless-screenshot parameter, non-canonical, stripped from any share affordance. A cold `?p=1` hands a stranger a beautifully composed, plausible personal record for a named individual with no tutorial attached — the inverse of what the page exists to do.

### 6.4 Fallbacks

`prefers-reduced-motion` and no-JS render **the same five acts as a plain, scrollable, fully-written page, from the same baked fixture object** — never a second hand-authored copy, or it drifts exactly the way the door copy drifted before CLAIM_AUDIT caught it. The `p` computation is skipped entirely, not clamped to 1. Note `.m2hero::before` is already `display:none` under reduced motion (`styles.css:3660`), so the reduced path must not depend on the light for legibility. All six acts' text must exist in HTML for the no-JS path.

---

## 7 · BUILD ORDER

1. **The harness.** A slider bound to the same `p` the scroll handler will use, plus `?p=` addressability. Nothing else. Motion feel cannot be judged in Claude's preview pane (rAF frozen) — this must be a real browser from the first step.
2. **p = .44, at the 400px floor card.** The half-developed seam is the whole design. If it reads as a smear at a 229px measure, the mechanism is wrong and no copy fixes it. Do not build anything else until this frame is defensible.
3. **The front's art** — glow width, edge softness, the leading-lip/trailing-wash balance. Then the segment count: 3 per line or 4, and whether θ=2.5° reads as one lean.
4. **The rest of Act 3** — the four beats, the six `w_i`, the swell, `--ly` riding `front_y`.
5. **Reverse.** Sweep the slider both ways through .38–.50 and confirm the mirror. Then twenty random p, half of them reached upward.
6. **Act 2's per-span typing**, then Acts 1, 4, 5.
7. **Reduced-motion and no-JS static paths**, from the same fixture object.
8. **The re-derivation test**, wired to the build.

---

## 8 · MEASUREMENT PLAN

Because every state is addressable, the plan is cheap — and `?p=` sidesteps this repo's known blind spot (feel cannot be judged in the pane).

1. **p-sweep profile.** Step `p` from 0→1 in .01 increments through the same code path the scroll handler uses, recording in the DevTools Performance panel. Bypassing real scroll removes input-jank noise and isolates rAF-handler cost.
2. **Assert zero Layout entries between p=.38 and p=.50.** Any `Layout` or non-trivial `Recalculate Style` in that range is a bug — Act 3 mutates no text nodes and reads no rects.
3. **Count composited layers at p=.44** (Rendering → Layer borders). Budget is ~26 small promoted layers during the sweep. `will-change` is armed and cleared **by p arithmetic**, outside `.37–.51` — never by an `animationend` handler, which is how BR-S326 leaked two hints for a whole session on an animation that never ran (`app.js:2975-2991`).
4. **Profile the `mix-blend-mode: soft-light` lobes specifically.** BR-S276 (`app.js:4181-4197`) already measured this as a real per-frame paint cost, and the shipped mitigation — flatten during travel — is **unavailable here because the lobes are the effect**. The card is ~100k px against the Desk's ~1.76M, so it should hold. It is still the first thing to cut on a weak device.
5. **Throttle CPU 4×–6× and re-run the sweep.** The budget above assumes unthrottled desktop; this page is shown to strangers on unknown hardware.
6. **Run every visual check at the 400px floor first, the 620px ceiling second.** The floor is the constraint and it is where the other two mechanisms died.
7. **Write budget sanity:** 1 front `translateY` + 1 `--ly` + 18 prose opacities + 6 rows × (opacity, translate, scale) ≈ **38 writes per frame**, all transform/opacity, all on elements that already exist, zero layout reads. Expect well under 4ms; if it is not, item 2 or item 4 is the cause.

## 9 · ACCEPTED LIMITS

- **The held beat is a distance, not a duration.** A trackpad flick delivers `dp ≈ .05–.08` in one frame, so a flicker crosses .38–.50 in one to two frames and the inhale never happens for them. This is unfixable without writing scroll (mistake #5). WET EDGE is chosen partly because its hold frame is *a complete legible letter* — a poster at any velocity — rather than a state that only exists mid-motion.
- **You never see a specific character travel to a specific mark.** That is the trade, and it is the right one: that journey is a claim the engine does not make. All six derive from one seed (`arcana-reading.js:119-120`); the honest claim is whole-box — the writing exposed the set.
- **Mobile is undesigned and must be built to be judged.** A 480vh scroll story on a 390px phone is a different design, not a narrower one. WET EDGE degrades better than the alternatives (its geometry is vertical and fixed-px), but that is a reason to expect it to port, not a design.
