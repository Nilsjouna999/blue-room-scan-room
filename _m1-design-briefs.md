# M1 DESIGN BRIEFS — fleet 2 output, 2026-08-13

INSPIRATION ONLY. Not a spec, not a guide to follow literally. A team may ignore all
five.

★ **THE BUILDER'S CORRECTION ON THIS DOCUMENT, and it governs every fleet after it:**
these five did not vary enough. They read as the same page with things resized and
moved — a region renamed, a column reweighted, a type scale adjusted. That is not the
brief. **The design space is far more open than this document represents.**

Explicitly on the table, and none of it needs permission:
- the page need not be a panel with regions in it at all
- the card may be absent, or the entire screen, or something you assemble, or something
  that arrives
- the arrangement need not be rectangular, gridded, or aligned to a page
- motion, reveal and sequence may BE the structure rather than decorate it
- the first thing seen need not be the thing on offer
- type may be the largest object on the page, or nearly absent
- the two readings need not be presented as two of the same kind of thing

★ **THE GATE.** Describe your design without using the words *column*, *left*, *right*,
*centre*, *panel*, *card* or *sidebar*. If you cannot, you have retuned the current page
rather than designed one, and your own team critic must kill it before submission.
Sizing, spacing, weight and colour changes are not designs — the palette question is
already closed and retuning is already covered by work that has shipped.

---

## ★ COMPETITION RULES — fleet 3, four teams

**THE MUTUAL-CUT RULE, set by the builder.** If any two teams submit designs that are
too similar to each other, **both are cut from the competition.** Not the later one, not
the weaker one — both. Neither can win, and the master-design pass is forbidden to draw
from either.

The teams work in parallel and cannot see each other, so this is enforced two ways:

1. **Distinct territory, assigned up front.** Each team is given a starting position no
   other team has. Collision by accident should be nearly impossible; collision by
   convergence — four teams independently drifting back toward the shipped layout — is
   the real risk, and it is exactly what the rule exists to punish.
2. **A similarity adjudicator after submission**, which compares all four against each
   other and applies the rule for real. Its test is the gate above: if two designs can be
   described by the same sentence without either description becoming false, they are the
   same design and both are cut.

**Cut means cut from the COMPETITION, not from the gallery.** A cut prototype is still
built and still shown, because seeing why it collided is worth something. It simply
cannot be the winner and cannot be quarried for the master design.

The consequence a team should feel: playing it safe is not a low-scoring move, it is a
disqualifying one, and it takes another team down with you.

---

## THE FIVE

Read the screenshot; verified the four constraints in source before writing. Two corrections to the material I was handed, because they change what is buildable:

**The ↑/↓ checkpoints are not M1's.** `_navStops()` (app.js:4505–4516) builds its stop list from `#about` only; M1 contributes exactly one stop, `y = 0`. M1 has no vertical mechanic of its own to borrow — the refuter was right that M1 is one screen, and the cull was wrong that there are "eight checkpoints on the draw panel."

**There is no inner-scroll exemption, but there is a one-line place to add one.** `_u1CanGlide()` (app.js:4727) rejects only `state.view`, `_cxOpen`, `_navBlocked(target)`, fullview, and non-HOME index. A scroll box on M1 does *not* escape the glide today; it escapes the moment `_u1CanGlide` consults `target.closest('[data-scrolls]')` plus that box's own edge state. That is a ~6-line change, not "nobody budgeted for it." Note the corollary the Listening Room critique missed: an `INPUT`/`TEXTAREA` on M1 is *already* wheel-exempt via `_navBlocked` — the text field breaks ← → and ↓, but never the wheel.

---

# CONSTRAINTS EVERY BRIEF BELOW IS BUILT AGAINST

1. **M1 is one screen.** `app.js:4749` — the first downward notch from `y ≤ 8` becomes a 934px glide. Anything below the fold is unreachable in both directions. No design here grows downward.
2. **← → belong to the track; ↑ ↓ belong to the U1 descent.** Nothing on M1 may consume either. Radiogroups are already carved out (`_navBlocked`, BR-S338) and any new one inherits that carve-out for free.
3. **~40 strings, two card faces, a 78-card engine, and a fixed 152px reading block** (`--m2read-size:19px × 1.6 × 5 lines`, styles.css:3277/3332) that rewrites per pull. Every design must name where those 152px live. Deleting them is the pool's most common silent failure.
4. **The bottom ~80px and the right edge are furniture** — the THE DESK / Codex / YOUR PROFILE / ROOMS chrome rail and the two orbs. Full-bleed means "full-bleed above the rail."
5. **1199px collapses to one 520px column.** Any arrangement that cannot stack in source order is dead on arrival.
6. **The cream card is the page's only warm mass and effectively its light source.** Look at the screenshot: remove it or crop it to a sliver and you are left with gold hairlines on black and no anchor. Two of the five below do exactly that on purpose, and they own the cost.

---

# 1. THE READOUT
### *the defence of three columns, argued on merit*

**THESIS.** The page is a workbench where an object, its provenance, and its report are present at once — three columns because a reading answers three questions simultaneously, not because a menu needed a rail.

**THE ARRANGEMENT.** Keep `grid-template-areas: "ctrl stage ." / "ctrl stage head" / "ctrl stage ."`. Change what the columns *mean* and the order in which they speak.

- **CENTRE (`stage`) — first.** The card, unchanged in size, but reframed as a readout rather than a floating monument: a drawn recess with a 1px inner bezel and a faint glass sheen at the top-left, so the page reads as *showing* you the card, not *selling* it. Directly beneath the card, hinged to its bottom edge on the same drawn surface, sits the 152px reading block — **moved out of `head` and glued to the card**. The card and its meaning become one object with a fold in it. `head` no longer carries prose.
- **LEFT (`ctrl`) — second.** Masthead, then the two doors, **reordered: Tarot first**, with live free/spent status set in the same weight as the name, then Birth. Each door's spine (`The Ground · The Crossing · …`, `Sun Sign · Year Animal · …`) becomes **eleven individual links to their own Codex entries**. Then the rail — Profile, What's Coming, Settings — at the same type weight as today. Foot line unchanged.
- **RIGHT (`head`) — third, and now genuinely quiet.** Prose is gone from it. It carries only the drifting questions, at their current scale, plus the single Codex link. It becomes the page's margin, which is what it always physically was.

Eye order becomes: warm mass → what it is → what's on offer → the questions in the air.

**THE CHOICE.** Two doors on the left, as today. The Birth/Tarot radiogroup **stays**, but is relabelled from a chooser to a viewer: it sits under the card as `SHOWING: BIRTH / TAROT`. This is the honest description of what it already does — it never chose anything, it previewed. Naming it correctly removes the page's one genuine ambiguity (two doors *and* a switch appearing to do the same job).

**THE CARD.** Same size, same flip, same 480ms. Gains the bezel and the hinged read-plate. Loses nothing.

**ON THE TRACK.** Zero risk. No new key, no scroll, no new region. The radiogroup's arrow keys are already carved out.

**AT SCALE.** The left column is a fixed-height list, so it cannot absorb ten rooms — and it shouldn't. Rooms three through twelve live behind ROOMS in the bottom rail, which already exists. M1 stays the two-reading front door permanently. This is a claim, not a dodge: **the front door of a large house names two rooms and points at the corridor.**

**WHAT IT FIXES.** (a) The card↔read-column sync problem, structurally — they are one element now, so they cannot disagree. (b) Free-leads, by reordering. (c) The Codex, reachable at eleven points instead of one footer line. (d) The two-controls-one-job ambiguity. (e) The right column's current status as a paragraph nobody's eye reaches third.

**WHAT IT COSTS.** It is not an argument about what the page is for; it is the argument that the current one was already right and under-executed. If the builder's dissatisfaction is with the *idea* of the page rather than its finish, this brief will not touch it. It also permanently caps M1's ambition at two products.

**GRAFTED FROM.** Card-as-readout framing ← THE SWITCHBOARD (its only surviving idea; the dials, levers and VU meter are refused). Card glued to its own description ← THE LEDGER (book). Per-mark Codex links ← THE CATALOGUE SPREAD. Free-leads reorder ← the pool's collective failure, flagged by the cull.

**FIRST PROTOTYPE.** No new file. In `renderWall()`, move the `.m2read` block from `head` into `stage` directly under `.m2hero`, add the bezel, reorder the two doors, relabel the toggle. One session. If the page does not immediately read better than the screenshot above, the whole "the current structure is fine" position is dead and you have lost a day, not a fleet.

---

# 2. THE TWO STACKS
### *structurally radical — the stage is deleted*

**THESIS.** There is no stage: the two readings are two physical stacks lying on the desk, and picking one opens it **where it lies**, not in a reserved centre region.

**THE ARRANGEMENT.** `grid-template-columns: 1fr 1fr` with a third full-width row beneath. No `ctrl`, no `stage`, no `head`.

- **Top strip, full width, small:** `◆ BLUE ROOM · The Reading Rooms` and the thesis line, set as one line, left-anchored. That is the entire masthead. The seal line moves to the foot.
- **Row 1, two cells.** **Left cell: the Tarot stack** — a squared stack of card backs, top card visible, tilted −3°, and **drawn larger and nearer than its neighbour**, because it is the free one. Beneath it: name, one-line description with live free/spent, the five-station spine as five Codex links. **Right cell: the Birth stack** — a closed stack with a crown engraved on its top edge, tilted 4°, smaller. Beneath it: name, description, the six-mark spine as six Codex links.
- **Row 2, full width, fixed height:** one shared 152px read pane, plus the rail (Profile · Codex · What's Coming · Settings) set as small plaques along its foot.

Eye order: the near, large, warm tarot stack → the smaller birth stack beside it → the words under whichever you touched.

**THE CHOICE.** No switch, anywhere. Hovering or focusing a stack lifts its top-left corner and casts a shadow; the shared read pane below writes that stack's meaning. **Clicking the stack turns its top card face-up in place, inside its own cell** — it grows maybe 15% and stays where it lay. A second click on the now-open card navigates (`?dev=drawing-room` / `?dev=arcane`). Two-step, reversible, and the reversal is moving your hand away.

**THE CARD.** Fragmented and demoted, honestly: two half-size stacks instead of one monument. Each opens in its own cell. **Only one may be face-up at a time** — opening the second closes the first, which is what keeps one `m2WriteRead()` driving one read pane. This is the single repair that makes the Blotter buildable.

**ON THE TRACK.** Clean. No scroll, no arrow keys, no pan. Growth explicitly does not use the horizontal axis (see below), which is what killed the original.

**AT SCALE.** The row goes from two cells to three or four, then stops. Room five onward is the ROOMS door in the bottom rail. **The stacks never pan and never scroll** — the growth model is "the desk holds what a desk holds; the corridor holds the rest." At 1199px the two cells stack vertically in source order (tarot first, which is also the correct order), and the read pane follows. It collapses without thought, which the authored-absolutes version could never do.

**WHAT IT FIXES.** (a) Deletes the reserved-stage idea entirely — the result appears where you touched, which no other design here does. (b) Enacts free-leads spatially, not just by word order: the free thing is nearer and bigger. (c) Kills the switch. (d) Makes the two products visibly a *pair* rather than one product with a second face.

**WHAT IT COSTS.** Two half-size cards carry less ceremony than one large one; the page trades gravity for parity, and if the typography and shadow craft aren't there it will read as a demotion. The flip-in-place must be built new (the existing 480ms `rotateY` assumes a centred stage). And it gives up the single most striking thing in the screenshot: one big warm card on black.

**GRAFTED FROM.** Result-appears-where-the-trigger-was, and the free deck drawn larger and nearer ← THE BLOTTER (repaired: grid not absolutes, one open at a time, no pan). Per-mark Codex links ← THE CATALOGUE SPREAD. Shared single read pane ← the refuter's condition (c) on the Listening Room, which applies here identically.

**FIRST PROTOTYPE.** Standalone `_m1-stacks.html` with the real palette: two stacks, real hover-lift, real click-to-open-in-place, one shared read pane, no navigation wired. The question it answers in ten seconds of looking: **does a card opening in a corner feel like a discovery, or does it feel like nothing happened?** That is the whole design, and it is unanswerable by argument.

---

# 3. THE LISTENING ROOM, OPEN
### *structurally radical — the page asks before it offers*

**THESIS.** The page's first act is a question addressed to the visitor, and the two readings are shown as answers to it rather than as goods on a shelf.

Carries all four of the refuter's conditions. They are not caveats; they are the design.

**THE ARRANGEMENT.** Two stacked bands inside one viewport. No columns.

- **Band A, top, ~40% height.** The seven existing drifting questions, promoted from a 14px sidebar ghost to full-scale serif, one at a time, dead centre, using the flick/hold/dwell envelopes already built (`styles.css:3398–3418`, `app.js:2406–2415`). Small above them: `◆ BLUE ROOM · The Reading Rooms`. Hover already pauses them; keep it.
- **Band B, bottom, ~60% height, open on first paint.** Two doors side by side — Tarot left with live free/spent, Birth right — each with a small card-object inline, name, description, and its spine as Codex links. Between and beneath them, one shared 152px read pane.
- **Foot, full width, always present in every state:** Profile · Codex · What's Coming · Settings.

Eye order: a question in the dark → two doors already there → the reading.

**THE CHOICE.** Clicking a door. Clicking a *question* does something else and smaller: it pins that question above the doors as a standing italic caption and rewrites the shared read pane to answer "what would this reading say to that." The question is a lens, not a gate.

**THE CARD.** Two small inline card-objects, one per door, both visible from first paint. No monument, no flip toggle.

**ON THE TRACK.** Clean — **provided condition (b) holds: no text input on M1.** `_navBlocked` (app.js:4413) returns true for `INPUT`, so a permanent field in the hero band silently disables ← → and ↓ whenever it holds focus. The typed question belongs in the Drawing Room, where it already has a home. Band transitions animate `transform` only, never `height`.

**AT SCALE.** Band B widens to three or four doors, then wraps once, then defers to ROOMS. Band A never changes shape no matter how large the house gets — the asking mechanism is fully decoupled from the inventory. That is the best growth property in the pool.

**WHAT IT FIXES.** (a) The one element on the page that is actually alive is currently the smallest thing on it; this makes it load-bearing. (b) Both products visible together with free/spent legible at the moment of choice. (c) The card demoted without being hidden. (d) Cheapest build of the five — the motion engine exists.

**WHAT IT COSTS.** First paint is words in the dark above the fold's midline; the warm card mass arrives second and smaller. Screen readers currently skip the questions (`aria-hidden`); promoting them means the front door announces itself as seven poetic fragments unless the masthead line is given real semantic weight — build the `<h1>` properly or this fails an unsighted visitor outright.

**GRAFTED FROM.** THE LISTENING ROOM, with the gate from THE THRESHOLD explicitly refused (a gate that hides the Profile and the Codex fails the front door's job). Per-mark Codex links ← CATALOGUE SPREAD. One shared read pane, transform-only, no input ← the refuter's conditions, adopted verbatim.

**FIRST PROTOTYPE.** Repoint the existing `.m2asks` CSS at a full-scale centred band and stack today's two doors beneath it — no new engine, no new art. Half a day. It either has presence or it is a poster.

---

# 4. THE ATLAS OF LIT DOORS
### *the map is the subject — with the filler problem actually solved*

**THESIS.** The front door shows you the shape of the house before it shows you a product: a row of doorways, most of the house beyond them, and only two of them lit today.

The original died on "no filler rooms" — eight to twelve dark rectangles are a vacancy notice. **The repair is not fewer dark frames; it is making the dark one real.** There are exactly three doorways, and the third is a genuine destination.

**THE ARRANGEMENT.** Full-width single row above the chrome rail.

- **Top strip:** masthead and thesis line, full-width, small, left-anchored.
- **The row, three doorway frames, equal height, ~55% viewport:**
  - **Door 1 — A TAROT READING (lit).** Warm gold-edged frame; through the threshold, a *crop of the actual cream card* — a corner, an edge, the top third — never the whole thing. Name and free/spent on a plaque below the frame.
  - **Door 2 — THE BIRTH READING (lit).** Same, cropped to the crowned name.
  - **Door 3 — THE ROOMS (unlit, and a real link).** A dim frame, no card behind it, one line: `the rest of the house — not yet lit`. It goes to the Rooms hub, which exists. This depicts the unbuilt universe **without inventing a single fake room name**, and it is not filler because it is a destination.
- **Beneath the row, full width, fixed:** one shared 152px read pane, which writes for whichever door is hovered or focused, and defaults to the tarot text. Then the rail.

Eye order: three thresholds and a glimpse of warmth → the lit one on the left → what it says.

**THE CHOICE.** Hovering or focusing a lit door grows its card-crop toward full size *inside the frame* (it never leaves the threshold) and writes the read pane. Clicking navigates. No switch.

**THE CARD.** Never a free-standing object. Only ever a fragment behind a doorway, growing and retreating. This is the hardest reading of *crown, not kingdom* that still keeps the card on screen.

**ON THE TRACK.** Clean, on one condition, deleted from the original brief and not negotiable: **no horizontal scroll and no wrapping past one row.** Three frames, forever. At 1199px they stack in source order.

**AT SCALE.** Doors 1 and 2 become 1 through 4 as readings ship; door 3 (ROOMS) always sits last and always absorbs the remainder. The number of frames on the front door is capped by design, and the growth pressure is deliberately routed into a hub that already exists rather than into M1's geometry.

**WHAT IT FIXES.** (a) The current page has no visual room for the universe it claims to be the door of. (b) It states, in the first glance and without copy, that this is a house with a corridor. (c) It gives ROOMS — currently a small word in the bottom chrome — the weight of a destination.

**WHAT IT COSTS.** Real new art: two lit frames, one unlit, and the crop-and-grow behaviour. And it deliberately dims the page's only light source — a cropped card is a smaller warm mass than a whole one, and the black field has to be held together by three frames instead of one object. If that reads cold in the prototype, kill it immediately; that failure is visible in one screenshot.

**GRAFTED FROM.** THE ATLAS (repaired: three frames not twelve, one row, no horizontal scroll, the dark door made a real destination — which retires the "no filler" objection rather than arguing with it). Shared read pane ← the refuter. Free-leads position ← the pool's collective failure.

**FIRST PROTOTYPE.** Static HTML, real palette, three frames, one hover-grow on door 1 only, no navigation. The one question: **is a cropped card still an object, or is it a texture?**

---

# 5. THE SEAM
### *no card on the front door at all*

**THESIS.** The front door is not a display, it is a decision between two rooms — and everything that is *not* a room lives on the line between them.

Two Doors was ruled dead on three counts. Each has a specific repair, and the repairs are cheap.

**THE ARRANGEMENT.** The viewport above the chrome rail splits into two full-height grounds with a lit vertical seam between them.

- **Left ground — BY THE DRAW.** Ink-dark with a faint starfield. Centred: the card-back mark, `A Tarot Reading`, the five-station spine, and — **permanently printed, not revealed** — `A Sitting: three cards, your first free. The Deep Read: five.` with live free/spent.
- **Right ground — BY BIRTH.** Ink-dark, flat. Centred: the crown mark, `The Birth Reading`, the six-mark spine, `Six marks. One name.`
- **The seam — a 2px gold rule, permanently lit, running the full height.** At its top: `◆ BLUE ROOM · The Reading Rooms`. At its middle: the seal line, small. At its lower third: a permanently visible vertical column of four marks — Profile, Codex, What's Coming, Settings. **The seam is the page's law: a ground is a destination, the seam is meta.** That grammar repeats in every room built afterward.
- The 152px read pane does not exist on M1. Its content is the ground's own centred copy, one paragraph per side, static.

Eye order: two grounds and a lit line → whichever ground your cursor is nearer → the seam's marks, last and deliberately.

**THE CHOICE.** Hovering a ground brightens it and dims the other; the unchosen door stays peripherally visible always. Clicking commits. **The opening motion is depth, not slide** — the chosen ground scales up and forward with a short blur on the other, then navigates. This is the repair for the fatal ambiguity: the panel track moves things sideways, so nothing on M1 may move sideways. A ground that comes toward you cannot be mistaken for a slide to the Profile.

**THE CARD.** **Absent.** It exists behind a door, revealed only inside the reading. The most literal possible reading of *found object, not product shot*, and the most dangerous decision in these five briefs.

**ON THE TRACK.** Clean once the swing becomes a depth-open. No scroll, no arrow keys, no pointer-only elements — the seam marks are permanently lit and tab-reachable, which is the second repair. At 1199px the two grounds become two stacked half-height grounds and the seam becomes a horizontal rule carrying the same four marks; the grammar survives rotation.

**AT SCALE.** Two grounds become three, then four — the seam becomes a cross or a corridor of seams. Because the rule is *grounds are destinations, seams are meta*, adding a room never requires inventing UI: it requires drawing one more line. This is the pool's best contribution to the spatial law.

**WHAT IT FIXES.** (a) The current page lets you look at everything and choose nothing; this makes the first screen a decision. (b) It permanently answers *where does meta live* — a question the current design answers three different ways (left rail, bottom chrome, floating orbs). (c) It makes the card impossible to mistake for the product, by not showing it.

**WHAT IT COSTS.** Everything the screenshot's warmth is doing. This page is black, gold and typography, with no cream mass anywhere — a genuine bet that restraint reads as authority rather than as an unfinished page. It also gives up preview entirely: a visitor cannot see what a card looks like before committing, which is a real conversion risk that only a live test can price. Two full-bleed grounds are also the largest new-art bill of the five.

**GRAFTED FROM.** THE TWO DOORS (repaired: depth-open instead of horizontal swing; seam marks permanently lit and tab-reachable; free/spent printed on the door face, which was the refuter's kill shot). The seam law itself ← THE TWO DOORS, kept whole; it is the best single idea in the pool. Growth-by-corridor ← THE ATLAS.

**FIRST PROTOTYPE.** Static two-ground split with a lit seam and real hover dim/brighten — no depth-open, no navigation. Show it to someone cold and ask them what this site sells. If they can answer without clicking, it lives.

---

# WHAT WAS REJECTED AND WHY — do not re-propose

- **THE SWITCHBOARD** — the current three columns with screws drawn on: control bank left, card centre, indicators right, and its own text concedes "only the control's skin is rebuilt." Its card-as-readout framing is grafted into #1; the dials, levers, jewel lamps and VU meter violate restraint and convert the house's poetry into a gauge.
- **THE CATALOGUE SPREAD** — 300/1fr/330 with a hairline down the middle; nothing changes state on choice, and its own text admits flipping the card "chooses nothing." Its per-mark Codex links are grafted into #1, #2 and #4.
- **THE MANIFEST / THE LEDGER (list)** — six rows of inherited door anatomy do not close inside 830px, and the moment they overflow the wheel handler eats them. Also deletes the 152px read block by implication and puts Birth at 01, which is the opposite of free-leads. Its specimen-stamp idea is charming and load-bearing for nothing.
- **THE LEDGER (book spread)** — cannot collapse at 1199px, because the tipped-in card *is* the gutter, and a card under photo-corners can never be handled. Its one real idea — the card glued to its own description — is grafted into #1 and is the best single fix in this document.
- **THE PLINTH and THE APPROACH** — identical at rest. Both are pure hover/dwell, so both are dead on touch; both delete the masthead, thesis, and seal, so the front door answers "what is this place" with nothing; and the Plinth's own thesis ("the whole page reads as lit by the card") is the definition of kingdom.
- **THE THRESHOLD FIELD** — consumes ← → and the scroll axis, concedes it in its own cost field, and declares the card the origin of the coordinate system for every room ever built. Dead four times over.
- **THE APERTURE** — names its own arrow-key theft, hides the meta rail behind the U1 scroll, and answers a two-item choice with an infinitely recursive dial.
- **THE THRESHOLD (question gate)** — in its default state the front door contains no route to the Profile, no route to the Codex, and no statement of what Blue Room is. Not repairable; the repair is #3.
- **THE BLOTTER** as written — authored absolute positions have nothing to collapse into at 1199px, and its only growth model is a horizontal pan on the panel the track already owns. Its argument survives as #2; its implementation does not.

---

**BUILD FIRST: #1, THE READOUT.** Not because it is the best of the five — because it is the only one that costs a session instead of a fleet, and because it is the control. It moves the read block onto the card, reorders the doors so the free thing leads, and turns eleven marks into Codex doors: three fixes that every other brief here also needs, and which the other four would each have to re-implement from scratch. If the page still feels wrong after it, the dissatisfaction is structural and #2 and #5 are the two honest opposites to test next — one keeps the card and deletes the stage, the other keeps the stage-less logic and deletes the card. Run those two against each other and the answer to "what is this page for" falls out of the comparison rather than out of another argument.

---

## THE REFUTATION

## THE REFUTATION

Three facts verified in source first, because they kill more designs than taste does.

**FACT 1 — M1 is a one-screen page, enforced by a wheel handler.** `app.js:4740-4747`:

```js
if (e.deltaY > 0) {
  if (y > 8) return;                    // DOWN: only from the desk at rest
  if (_u1GlideTo(seat)) e.preventDefault();
}
```

The *first* downward notch anywhere on M1, from scrollY 0, is swallowed and converted into a 934px glide to the U1 seat. `.menu__panel` is `min-height:100vh`, so M1 *can* grow — but anything below the fold is **unreachable by wheel in both directions** (scrolling back up from the seat glides to y=0, skipping it again). Growth-by-scroll isn't "contested" on this panel. It is a hole.

**FACT 2 — the content inventory is ~40 discrete strings, two full card faces, and a 78-card dynamic engine.** Including a *fixed* 152px reading block (`.m2read { --m2read-size:19px; --m2read-lh:1.6; --m2read-lines:5 }`, styles.css:3277/3332) that rewrites per pulled card. Every "one line of copy beneath the card" claim in this pool is roughly 35 strings short.

**FACT 3 — nobody looked at the screenshot's edges.** The live page carries a bottom chrome rail (THE DESK · Codex link · YOUR PROFILE · ROOMS) and **two fixed orbs at bottom-right** (codex ball + mini). Not one of the fourteen designs mentions them. Every full-bleed proposal collides with furniture it doesn't know exists.

---

**THE BLOTTER** — *Fails:* the returning member. *Breaks on:* 1199px, where a design with authored absolute positions has nothing to collapse into; and the horizontal pan is the track's own gesture on the track's own panel. *Cannot hold:* two readings open simultaneously means two live 152px reading blocks driven by one `m2WriteRead()`. *Makes harder:* everything — its only growth model is the one gesture it may not have. **DEAD.**

**THE MANIFEST** — the cull calls this "repairable: cap at one viewport." Do the arithmetic. Six rows, each inheriting the door anatomy verbatim (kicker / name / description / spine) = four lines per row, at index-page baseline, plus masthead, plus footer rule, inside ~830px of usable height. It does not close at 900px — and the moment it overflows, FACT 1 eats it. *Fails:* the visitor on a laptop. *Cannot hold:* the reading paragraph at all; a wax-seal specimen in the masthead corner cannot carry 152px of prose, so the design silently deletes the single richest content object on the page. *Makes harder:* free-leads, by construction — sequence is its only hierarchy and Birth is 01. **DEAD.** (Steal the specimen stamp. Bury the design.)

**THE ATLAS** — *Fails:* the first-time visitor, who is shown eight to twelve dark rectangles and told most of the site does not exist yet. That is not "scale perceived before product"; it is a vacancy notice on the front door, and the law says *no filler rooms* — rendering the filler wordlessly does not make it not filler. *Breaks on:* mobile, where 10–12 frames collapse into a 520px column and become a scrolling list — FACT 1. *Cannot hold:* the reading paragraph (its own cost field admits this) and the questions. *Makes harder:* the one thing the screenshot proves is working — look at it: **the cream card is the only warm mass and effectively the page's light source.** Atlas crops it to a sliver behind a doorframe, leaving a black field of gold hairlines with no anchor. **SURVIVES IF** the unlit doorways are cut to at most two, the field is capped at one row, and the reading block finds a permanent home — at which point it is a two-tile layout, i.e. today.

**THE PLINTH** — *Fails:* every touch visitor (the entire design is dwell/hover), and every cold arrival from a shared link, who is shown a card and a wordmark and no answer to "what is this place." *Breaks on:* the card's own left and right edges, which it wants as the choice control on a panel where ← and → already mean *leave this panel*. *Cannot hold:* the masthead, thesis, seal, both spines, the reading block — it deletes them and calls the deletion a design. *Makes harder:* the front door's actual job. Its thesis — the whole page reads as lit by the card — is the definition of kingdom. **DEAD on doctrine and on touch.**

**THE THRESHOLD FIELD** — takes both axes, concedes it in its own cost field, and declares the card the origin of the coordinate system for every room ever added. *Fails:* keyboard, screen reader, touch, reduced-motion — four populations, not one. **DEAD.**

**THE TWO DOORS** — the cull calls this "strained, repairable." It is not. *Fails:* the visitor who came for the free Sitting — free/spent status is the one fact that must be legible *before* commitment, and this design's whole thesis is that nothing is legible before commitment. *Breaks on:* the panel track. A door that swings horizontally to fill the viewport is the same motion, on the same axis, in the same vocabulary as `is-wall → is-reliquary`; a visitor cannot tell whether they opened a room or slid to the Profile. That is the Catalogue Spread's disqualifying ambiguity wearing better clothes. *Cannot hold:* the reading paragraph, the six marks, the card. *Makes harder:* leaving — no neutral region means no resting state, and the "seam" it puts Profile/Codex/Settings on is a 1px line that at 1199px does not exist. **DEAD.**

**THE LEDGER (book spread)** — *Fails:* the mobile visitor, absolutely and without a fallback: two facing pages cannot collapse, and the tipped-in card *is* the gutter. *Breaks on:* its inner-scroll register, which fights a non-passive `preventDefault` handler nobody has budgeted to teach yield. *Cannot hold:* found-object-ness — a card under photo-corners can never be handled, which cuts against the house's single strongest asset. *Makes harder:* the vocabulary problem — bound pages and a gutter appear nowhere else in Blue Room, so this is a one-off room in a universe whose supreme law is *things be where you think they be*. **DEAD**, minus one stolen idea: gluing the card and its description onto the same surface. Take that. It is real.

**THE APERTURE** — names its own theft ("or arrow keys to click one detent"), hides its meta rail behind scroll, and answers a bounded two-item choice with an infinitely recursive dial. **DEAD.**

---

**THE LISTENING ROOM** — the cull's clean winner. Four attacks, three of them structural.

1. *Fails:* the returning member who wants the Deep Read and has no question. They must click a poem they did not write to reach a product they already chose. The cull dissolved the gate into a "policy toggle" — but the drawer is still shut on first paint, so the toll is reduced, not removed.
2. *Breaks on:* **the keyboard.** Its always-visible text field is `INPUT`, which `_navBlocked()` (app.js:4413) returns `true` for — correctly, and fatally: while that field holds focus, ← → no longer move panels and ↓ no longer descends to U1. The design puts a permanent navigation-disabling element in the hero band of the site's only keyboard-navigable panel.
3. *Cannot hold:* the measurement. Two doors side by side, each with its own card *plus* face meta *plus* a 152px reading block, inside a band that starts at 55% of an 830px column. It does not close. So either the reading block is deleted (the pool's most-deleted content, again) or the drawer overflows into FACT 1.
4. *Makes harder:* first paint. It opens on drifting words in the dark — no masthead, no product name, no card. The seven questions are `aria-hidden` decoration today; promoting them to the primary control makes them buttons, and a screen reader then announces the front door of a commerce site as seven poetic fragments with no statement of what is sold here.

**SURVIVES IF** — and only if — (a) the drawer is **open by default**, with the questions as an ambient band above already-visible doors, so nothing is gated and first paint carries both products; (b) the text field is removed from M1 entirely and lives inside the Drawing Room where a question belongs; (c) the two doors keep one shared reading block rather than two; (d) the band transition animates `transform`, never `height`, or it repaints the layer BR-S269 exists to promote.

Note what those four conditions leave: a top band of live questions, two doors below, one reading block, a permanent bottom rail. That is a **two-row rearrangement of today's three columns** — a good one, cheap, and honest. It is not an argument about what the page is for.

---

**VERDICT**

| Design | Ruling |
|---|---|
| The Blotter | DEAD |
| The Manifest | DEAD |
| The Atlas | SURVIVES IF (≤2 unlit frames, one row, reading block re-homed) |
| The Plinth | DEAD |
| The Threshold Field | DEAD |
| The Two Doors | DEAD |
| The Ledger (book) | DEAD |
| The Aperture | DEAD |
| The Listening Room | SURVIVES IF (drawer open by default, input removed, one shared read, transform-only) |

**What actually survived is not a design.** It is three portable mechanisms — the Switchboard's *card-as-readout* framing (demotes without hiding), the Catalogue's *per-mark Codex links* (eleven doors to the Codex instead of one), and the Ledger's *card-glued-to-its-own-description* (kills the sync problem the cull correctly identified) — plus one hard constraint the pool never priced: **M1 is one screen, forever, because the wheel handler says so.** Eleven of fourteen designs grew downward into a hole. Any fleet that builds from this pool should be handed the constraint before the concepts.