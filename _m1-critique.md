# M1 CRITIQUE — fleet 1 output, 2026-08-13

27 agents. 15 lenses, 91 raw findings, 5 judges, a teardown, a weight test.

## THE VERDICT AND SHORT LIST

## 1. VERDICT

M1 is a well-made version of a slightly different page, and it is broken on phones. The three-column composition is coherent, the copy is disciplined, and it has survived 21 adversarial palette registers — that is real evidence and it should not be thrown away. But the panel has three classes of defect that are all cheap to fix and none of which are about taste: **(a)** the narrow layout clips the offer off the screen, verified by eye — the front door does not work at 430px; **(b)** the two revenue-bearing controls are the least-engineered interactive objects on the panel — no focus ring, two different broken accessible names, while the display toggle beside them is a textbook radiogroup with a ring and arrow keys; **(c)** the grid gives its only flexible track to an object whose size the track does not control, so extra viewport width buys air, not doors. Everything else worth doing is a one-line or one-rule edit. Nothing here justifies a rebuild.

---

## 2. THE TEARDOWN, JUDGED

**Claims that survive contact with the source (I checked):**

- **The card's width is height-driven, not track-driven.** `styles.css:3514` — `height: clamp(400px,56vh,620px); aspect-ratio: 120/190; width: auto`. At 1440×900 the card is 318px in a 463.6px track. The arithmetic is correct. The `1fr` track is the only adaptive thing in the grid and it adapts by producing margin.
- **The right column is 330px fixed for one ~220px-tall paragraph, with two literal void cells** (`styles.css:3211-3212`), while the tarot door's description and spine both wrap in the 300px column beside it. Real allocation complaint.
- **The doors have no `:focus-visible` anywhere.** Grep-verified: the only focus rule touching a door is `.menu__door:focus-within .menu__draw-spine` (`styles.css:3881`). `.m2flip__opt` (`:3831`), `.menu__draw-pull` (`:3481`) and `.menu__codex` (`:2638`) all have one. This is the sharpest finding in the whole set.
- **The centre is architecturally binary** — six coupled touch points for a third product (`app.js:2616-2617, 2730, 2748-2751, 2563, 2580`, plus the `data-face` branch). True.
- **DOM order ctrl→head→stage vs visual ctrl→stage→head.** True.
- **Narrow clipping.** I looked at `CRIT_m1_narrow.png`: "…read here." cut, spine ends at "THE TU", the `WHAT'S COMING →` pill runs off the right edge. Confirmed.
- **No downward mark to U1.** Confirmed by both screenshots.

**Rhetoric, or true-but-inconsequential:**

- **"The grid's comment is false."** The comment's actual claim is *the side columns are fixed so they don't fight over width* — which is satisfied. The teardown attacks a stronger reading than the comment makes.
- **"One operating width."** A `max-width` on a text layout is normal practice, not a defect. The 1200–1283px flex band is small, but "it stops growing at 1180" is how every centred layout works.
- **"30% of the panel is void."** The arithmetic checks, but roughly half of it is the centring gutter any centred object has. The honest version is narrower: *the right column is overspecified and the doors are underspecified.*
- **"Putting an object in the centre forced a second copy of the decision."** The causal story is wrong, and your own refuter already settled it: the flip is an **in-place act**, not a navigation duplicate, and this file twice deleted the element that *navigated* (BR-S321, BR-S343). The real defect is not that the flip exists — it is that the flip got the engineering and the doors didn't. That is a CSS omission, not a structural consequence.
- **"Thirteen exits."** The count includes the dev-nav strip, which doesn't ship. The duplicate-destination point (three routes to the Codex, three to the Profile) stands on its own without the inflated number.

**The replacement structure moves problems rather than solving them.** Band C turns the card into a thumbnail, and the teardown concedes it cannot measure persuasion — in a category where the product *is* an object, that is the one thing you can't guess at. The `auto-fit` tile row recreates the pricing table `app.js:2453-2459` explicitly rejects. "The face follows whichever door is hovered or focused" is worse on touch (no hover) and hostile on keyboard (tabbing rewrites content). And its above-fold arithmetic (~730 of 800px) is admitted to be marginal.

**What the builder should actually take from it:** the narrower proposal the teardown itself lands on in its final paragraph — *make `ctrl` the flexible track and reclaim the right column's width* — minus the `.m2flip` deletion. That is one rule, not a rebuild.

---

## 3. THE SHORT LIST

| # | Finding | Evidence | Fix | Size |
|---|---|---|---|---|
| 1 | **The narrow layout clips the offer.** Front door unreadable on phones. | `CRIT_m1_narrow.png`: three strings cut at the right edge. `.menu { overflow-x: clip }` (`styles.css:2750`) is why it fails silently instead of showing a scrollbar. Candidate cause: the narrow rule uses `grid-template-columns: 1fr` (`styles.css:3916`) where desktop correctly uses `minmax(0,1fr)`, and `.menu__draw` is a flex item with `min-width:auto`. | Measure `.menu__draw` and its ancestors' `getBoundingClientRect()` at 430px, then fix the offending track/min-width. Do not guess — measure first. | one rule, after a measurement |
| 2 | **`mountMenu` rebuilds markup hardcoding Birth and never reconciles `M2_FACE`.** The toggle can become permanently dead-clickable. | `app.js:3259` `host.innerHTML = renderMenu(...)`; markup hardcodes `is-on` on Birth (`2616-2617`); `M2_FACE` (`2730`) is untouched; the guard at `2873` (`which === M2_FACE`) then swallows the recovery click. Reachable via `app.js:6283`. | Follow line 3259 with `m2SetFace(host, M2_FACE, {})`. Fixes the desync, the roving-tabindex reset, and the aria-checked drift in one statement. | one line |
| 3 | **First paint and every later write make different claims about the same reading.** | `app.js:2548` ships *"Nothing is **drawn** here — each mark is looked up, and read as it stands."*; `app.js:2737` (`M2_BIRTH_READ.mean`) says *"Nothing is **dealt** here — the same name and the same date return the same six, tonight and in ten years."* A process claim silently replaced by a permanence claim mid-session — undercutting the exact permanence being sold. | Render first paint through `M2_BIRTH_READ.mean`. | one line |
| 4 | **Neither product door defines a focus ring.** The two revenue controls are the only interactive objects on the panel falling back to the UA default. | Grep-verified: no `:focus-visible` on `.menu__door`, `.menu__door--birth/--tarot`, or `.menu__draw-hit`. Only `:focus-within` on the spine (`styles.css:3881`). | Add `.menu__door:focus-visible, .menu__draw-hit:focus-visible { outline: 1px solid var(--silver-dim); outline-offset: 3px; }` matching `.m2flip__opt`. | one rule |
| 5 | **The two "parallel" doors have two different, both-broken accessible names.** | Birth is a `div` with an empty overlay `<a aria-label="The Birth Reading">` (`app.js:2461`) → three words. Tarot *is* the anchor wrapping everything (`2477-2482`) → an unpunctuated run-on. The comment says "same door grammar for both." | Pick one pattern. Cheapest: give Birth `aria-labelledby` pointing at its kicker+name+desc spans. | one component |
| 6 | **The flip control announces nothing, and the SVG's label lies on the default face.** | Both faces are `aria-hidden` (`2563`, `2580`); the only live nodes are `.m2hero__name` and `aria-label="XVII — The Star"` (`2562`); `m2SetFace` (`2870-2907`) touches neither. On the boot face (birth) AT reads a tarot card name. | Update `data-m2-heroname` + the SVG label in `m2SetFace`, or add one polite live region. | one component |
| 7 | **The grid's only flexible track holds a fixed-size object; the doors are hard-capped.** | `styles.css:3210` `300px minmax(0,1fr) 330px`; card width is height-derived (`:3514`). At 1440×900 the centre track has 145px of slack the card cannot use, while the tarot door wraps in 300px. Every extra pixel of viewport buys air. | `grid-template-columns: minmax(300px, 1fr) auto 330px` — card into an `auto` track (its width is intrinsic anyway), residual width to `ctrl`. Requires raising `.menu__draw-doors { max-width }` from 360px (`:3857`) and one eyeball pass on the new measure. | one rule (+ eyeball) |
| 8 | **`--t-ghost` is one token, not four decisions.** | `styles.css:16` `#6e6b63`, aliased by `--faint` at `:45`. It colours the eyebrow, `.msample__label`, `.m2read__label`, and the flip's off-state — measured ≈3.7:1. Codex declares the same token as `#86827a`. | Lift `--t-ghost` toward the Codex value. This is the mechanism behind the accepted "small text is too quiet" — listed because it is one token, and because it silently repairs the flip's off-state. | one rule |
| 9 | **`var(--gold, #c9a35c)` always fires its fallback — `--gold` is never declared.** | No `--gold` in `styles.css`; the fallback fires at `:5665, 5679, 5695, 5744, 5852` while M1 hardcodes `#c8ad70` at `:3303, 3853, 3856, 3870, 3892` and `app.js:2420`. Profile declares `#a2864a` with a comment calling `#c9a35c` "too bright"; Codex declares `#c69b63`. Four hexes, one job. | Declare `--gold` at `:root`, point all literals at it. Bundle: pull gold off wayfinding (kicker `:3870`, placard mark `:3853`, `.m2read__num` `:3303`) per the Profile's own written law at `arcana-profile.css:10-13`. | one rule + 6 substitutions |
| 10 | **Mobile: the ROOMS pill prints on the card, and the only exit is the last element on a ~1750px page.** | `.orbitbtn` fixed bottom-right (`styles.css:5220-5226`) vs `.m2hero { width: min(72vw,300px) }` (`:3919`); `.menu__go { display:none }` at `:3962` leaves `.menu__wall-back` — DOM-first but with no `grid-area`, so it auto-places *after* all three areas. | In the ≤1199px query: reposition/offset the orb, and give `.menu__wall-back` a grid position at the top of the stack. | one rule |
| 11 | **Touch targets, and the rail's *second* family break.** | `.m2flip__opt` 34px with a 2px gap between two buttons (`:3823-3825`); `.menu__codex` has no `min-height` → the three rail links measure 37/31/31px. They disagree on height as well as on diamond colour — fixing the specificity bug alone will not make them a family. | `min-height: 44px` on both; widen `.m2flip` gap to 8px. | one rule |
| 12 | **Cheap copy truths.** | "Drawn once. Not reissued." (`app.js:2495`, 8.5px — the panel's smallest type) contradicts "Given, not drawn" two blocks above (`:2462`), and is the only binding commercial term on the surface · `"Or the Deep Read — five."` drops its unit exactly where a price would sit (`:2480`) · `"Your Profile — kept"` has no object (`:2487`) · the birth door's spine (`:2465`) reprints the card's own six marks verbatim 250px away — the same cut you already made at `:2733-2735`. | Four small string edits. | one line each |

---

## 4. THE STRUCTURAL QUESTION

**Do not rebuild. Make one rule change.** The three-column grid is not wrong about what it shows or where; it is wrong about *which track flexes*. Swap the flexible track from `stage` to `ctrl` (item 7) and the panel's single real allocation defect disappears without touching the composition, the card's size, the reading order, the flip, or anything the 21 palette registers were judged against. Everything else the teardown wants — N products, DOM/visual parity, one breakpoint instead of two — is either speculative (its own persuasion caveat is fatal and it knows it) or already reachable by cheaper means. The one structural item worth queuing *separately* is the growth question: four open rooms already occupy four different visual ranks with no stated rule, and the doors row cannot take a fifth. Write the rank rule down (what makes something a door vs a rail pill vs a placard) before the next room ships — that costs a paragraph now and a redesign later.

---

## 5. RULED OUT — do not re-open

- **Palette, grounds, hues, "make it blue."** Closed. 21 registers built and rejected.
- **Price on the door tiles.** `app.js:2453-2459` is an explicit, reasoned rejection. Six separate findings re-argued it without engaging the argument. (The *ordering* question — PII collected at `?dev=arcane` intake before any number appears at `arcana-reading.js:509` — is real but lives on the intake page, not M1.)
- **Deleting `.m2flip`.** It is an in-place act, not a nav duplicate; BR-S321 and BR-S343 both cut the *navigating* twin and kept the in-place one. It is also currently the only non-`aria-hidden` face label.
- **Rebuilding M1 as a four-band stack.** Recreates the rejected pricing table, thumbnails the object, marginal above-fold arithmetic, hover-driven state that dies on touch.
- **Persisting `M2_LAST` across sessions.** `app.js:2660` — the card is a sample; persisting it manufactures an identity for a draw that is explicitly not a reading.
- **"Six hues in the pattern-glare band"** (card marks list, `m2read__meta`). The screenshot shows the parchment marks as one near-uniform tone, and `m2read__meta` renders 2–3 segments in practice (`app.js:2733`, `2925`) — six is a count of CSS rules, not of rendered spans.
- **Stripping borders from the rail pills.** Would worsen the accepted "the three links don't read as a family."
- **"Door names compete with the title"** (30px serif vs 14.5px caps — the screenshot settles it), **"the first category noun is Sun Sign"** (false — "Readings" is in the H2), **`.m2face-orient` at 4.53:1** (wrong element; the birth face uses `--bf-meta`), **the two `.m2asks__q` findings** (mutually contradictory, and the block is aria-hidden atmosphere with a rationale at `app.js:2510`), **"differentiate 'THE BIRTH READING' from itself"** (BR-S338 built that correspondence on purpose).
- **A shared radius scale, hairline hue, Codex/M1 token divergence beyond `--gold`.** Codebase hygiene, not M1 defects. Defer to the next touch of those files.

---

## 6. THE ONE THING

**Reproduce and fix the narrow-viewport clipping.** Serve the repo, open M1 at 430px, and log `getBoundingClientRect()` for `.menu__panel--wall`, `.menu__draw`, `.menu__draw-ctrl` and `.menu__draw-doors`. One of them is wider than the viewport and `.menu { overflow-x: clip }` (`styles.css:2750`) is swallowing it, which is why this has survived this long. Everything else on the list is polish on a door that currently doesn't open for most of the people who walk up to it.

Files: `C:/Users/nilsj/OneDrive/Documents/blue-room-scan-room/app.js`, `C:/Users/nilsj/OneDrive/Documents/blue-room-scan-room/styles.css`.

---

## THE TEARDOWN

# TEARDOWN: THE THREE-COLUMN M1

**Verified against** `styles.css:3198-3234` (the grid), `styles.css:3514` (the card's sizing law), `styles.css:3911-3922` and `:3959-3967` (the collapse), `app.js:2426-2650` (render order and contents), and both screenshots.

---

## 1. The grid's stated reason for existing is false

The comment that authorises the three columns says it plainly (`styles.css:3208-3210`):

> *"The card column is the flexible one; the two side columns are fixed, so the card grows into whatever width is left rather than the columns fighting over it."*
> `grid-template-columns: 300px minmax(0, 1fr) 330px;`

The card does not grow into the width that is left. It cannot. `styles.css:3514`:

```
height: clamp(400px, 56vh, 620px); aspect-ratio: 120 / 190; width: auto;
```

`.m2hero`'s width is a function of **viewport height** and nothing else. At 1440×900 the height resolves to 504px and the width to 504 × 120/190 = **318px**. The `1fr` track it sits in measures 1180 − 300 − 330 − 2×43.2 = **463.6px**. 145px of the panel's only flexible track — 31% of it — is void by construction, and it is void at every viewport: even at the card's 620px ceiling (which needs a 1107px-tall window) the card is 391px wide and the track still has slack.

So the grid has one flexible track, and that track's flexibility is spent on centring margins around an object whose size the track does not control. The three-column arrangement is not distributing space between three claimants. It has two fixed claimants and one that ignores the allocation entirely.

## 2. The layout has exactly one operating width

`.menu__draw` is `width: min(1180px, 92vw)` (`styles.css:3200`). Above a 1283px viewport, `92vw` exceeds 1180 and the panel stops growing: every additional pixel of screen becomes page margin. Below 1200px the whole grid is discarded for a single column (`styles.css:3912-3916`).

The three-column composition therefore exists only in the band **1200px–1283px of real flex, then frozen**. It does not scale up — there is nothing to scale, since the fixed tracks are literal pixels and the flexible track is already oversized for its occupant. It does not scale down — below 1200 it is replaced. What is being defended as *the* layout is a fixed-size composition rendered inside a range where it is never asked to adapt, plus a second, separately-authored layout that handles every phone and most tablets.

And the second one is broken. In `CRIT_m1_narrow.png` at 430px: the Birth door's description is cut mid-line at *"read here."*, the tarot spine ends at *"THE TU"*, and the `WHAT'S COMING →` pill runs off the right edge. The single-column fallback is authored to `max-width: 520px` (`styles.css:3916`) — a measure no phone has. The structure that gets the design attention is the one a minority of visitors see; the one that carries the rest clips the offer off the screen.

## 3. Roughly 30% of the panel is space reserved and then not used

`grid-template-areas: "ctrl stage ." "ctrl stage head" "ctrl stage ."` with `grid-template-rows: 1fr auto 1fr` (`styles.css:3211-3212`). Two of the right column's three cells are literal voids.

Measured off `CRIT_m1.png`: the panel's content band runs y≈110–755 (≈645px). The right column's content — drifting question, rule, label, meta, five-line paragraph — occupies y≈360–580, about 220px of it. The remaining ≈425px × 330px is a declared void. Add the centre track's 145px × 645px of slack and the panel reserves ≈233,000 px² of its ≈761,000 px² — **about 30%** — as space that is allocated by the grid and structurally cannot be occupied.

This is not margin. Margin is a distance you choose between two things. This is a fixed 330px column charged at full width for one paragraph, on the site's arrival screen, while in the 300px column beside it the tarot door's description wraps to two lines and its spine wraps to two.

## 4. Putting an object in the centre forced a second copy of the page's only decision

The choice this page exists to extract is Birth or Tarot. It is on the panel twice.

- The doors: `app.js:2461` `href="?dev=arcane"`, `app.js:2477` `href="?dev=drawing-room"`. These commit. Neither defines a `:focus-visible` rule anywhere in `styles.css` — while `.menu__codex` (`:2638`), `.menu__draw-pull` (`:3481`) and `.m2flip__opt` (`:3831`) all do.
- The switch: `app.js:2615-2618`, a real `role="radiogroup"` with roving tabindex, arrow-key handling (`app.js:3059-3076`), an `.is-on` state, a focus ring, and a 480ms card turn (`styles.css:3663`).

That asymmetry is not an oversight, it is a consequence of the structure. Once the centre column holds a large object rather than a message, the object needs a control, and that control is a second expression of the same decision — better engineered, more responsive, and pointed at nothing. A visitor can flip faces, watch the turn, read the meaning update, and pull again: a complete session that never approaches a door. The layout's most finished interaction is the rehearsal of the choice, and the doors, in the fixed 300px track, are the two controls falling back to the browser's default outline.

## 5. What the arrangement makes expensive

**A third product.** The centre is architecturally binary: `M2_FACE = "birth"` with a `"birth"|"tarot"` domain (`app.js:2730`), two hardcoded flip buttons (`app.js:2616-2617`), two keys in `M2_STAGE_COPY` (`app.js:2748-2751`), two mutually exclusive face elements `.m2face`/`.m2bface` (`app.js:2563`, `2580`), and a `data-face` CSS branch. A two-option toggle is a switch; three is a list, and a list is a different control. The panel's largest and most flexible real estate cannot be extended to a third reading — it has to be redesigned.

**A fifth room anywhere.** Three columns supply three homes. `ROOMS` (`app.js:1453-1476`) already carries four open rooms and six written-down future ones. The overflow has already happened: Profile (an owned-state surface), the roadmap, and Settings are flattened into one pill row because the rail was the only remaining slot — the `BR-S339` comment says the roadmap "joins them" for lack of anywhere better. Counting from `CRIT_m1.png`: thirteen exits in five visual languages, eight of them leading to three destinations. The panel's own comments kill duplicate doors twice on the principle that *"two doors to one room… is how a building starts lying about its own shape"* (`app.js:2472-2474`, `2498-2499`), and then three routes to the Codex and three to the Profile survive, because the three-column grid has no slot to put them in and the chrome does.

**Reading order.** The DOM is ctrl → head → stage; the grid renders ctrl → stage → head (`styles.css:3211`). Linear and assistive readers meet the card's description before the card. That inversion exists only because there is a middle column that must be visually between two things it is not between in source.

**The vertical axis.** U1 is seated directly below M1 (`app.js:4434-4436`, `U1_HASH = "#about"`). In `CRIT_m1.png` there is nothing below the card but the switch, the Codex placard and the dev strip — no mark that down is a direction. A layout that spends its whole budget filling the width has nothing left to say about the height, and the site's second axis is invisible from the surface responsible for teaching the building's shape.

---

## WHAT I WOULD BUILD INSTEAD

One centred measure (`max-width: ~980px`), four stacked bands, same DOM order as visual order as priority order.

**A — Masthead.** Eyebrow, title, thesis, plus one clause naming the category and the free/paid shape. Full measure, ~120px.

**B — The offer, and it is the flexible track.** The doors in `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` over an array. Extra viewport width now buys door width. A third reading is one array entry and zero layout work. Each door keeps kicker / name / one-line description / spine, and gains a `:focus-visible` ring matching the one `.m2flip__opt` already has.

**C — The specimen, subordinate and derived.** Card at a fixed ~240–280px width beside its read, in a two-up row, captioned as an example. **The face is not an independent control**: it is whichever door is hovered, focused, or last touched, defaulting to the first. `M2_FACE` stops being a second source of truth; `.m2flip` is deleted; the roving-tabindex desync, the missing persistence, and the dead-click guard at `app.js:2873` all cease to exist rather than being fixed. One decision, one control, expressed once — and the specimen becomes evidence for the door under consideration instead of a device competing with it.

**D — Rail, foot, and a visible downward mark** at the same weight as the existing left/right edge arrows (`app.js:1340-1352`), which is the panel's established vocabulary for *there is more that way*.

Why this serves the job better, in structural terms and not taste: the flexible width goes to what is sold; the fixed size goes to what is shown. The reserved voids cannot exist because there is no fixed side track to reserve them. N products cost one array entry. DOM order equals visual order, so the a11y inversion is impossible rather than repaired. And a vertical stack at one measure means the phone layout *is* the desktop layout at a narrower width — the `≤1199px` grid rewrite and its clipping bug are deleted, not debugged. There is one structure to maintain instead of two, and the one that currently serves most visitors is the one that is currently broken.

---

## THE STRONGEST CASE AGAINST ME, AND WHAT IT COSTS

The card is not decoration. This is a category where the product *is* an object, and desire for the object precedes any argument about it. A front door that shows the object at 318×504 is doing the one thing a link list cannot. My band C converts a display into a thumbnail. Worse, the arithmetic is against me above the fold: masthead ~120 + doors ~200 + specimen ~380 + gaps ≈ 730px of an 800px usable band at 900px viewport height — feasible, but only barely, and any growth in band B pushes the demonstration below the fold at exactly the moment it is supposed to persuade. The current layout puts offer and evidence in one glance with no scroll. Mine does not guarantee that.

Second: a row of equal-width tiles in `auto-fit` is a pricing table, which is precisely what `app.js:2453-2459` rejects by name. My band B, at three or more products, recreates the thing the builder already reasoned his way out of.

Third, and I take this seriously as evidence rather than sentiment: 21 full colour and material registers were built over this layout and all were rejected, and the layout survived every one. That is a lot of adversarial contact for a structure to survive. My case is arithmetic — allocation, growth cost, reading order, breakpoint parity — and arithmetic does not measure whether the composition makes someone want the card.

Honest accounting: I am confident the three-column grid is wrong on **allocation** (the flexible track holds a fixed object), on **growth** (three slots, ten rooms), on **duplication** (the better control is on the rehearsal), and on **breakpoint parity** (two layouts, the majority one clipping copy). I am not confident it is wrong on **persuasion**, and persuasion is the job the page's own first sentence claims. If the large card is load-bearing for desire, my structure is worse at the only thing that converts, and the correct move is narrower than a teardown: keep the centre stage, make `ctrl` the flexible track, reclaim the two void cells, and delete `.m2flip` so the specimen answers the doors instead of competing with them.