# THE TURNING WORLD — 75 QUESTIONS BEFORE ANYTHING IS BUILT

**Status:** written 2026-08-12. The builder asked for the questions to be laid out
first, then a fleet to brainstorm, synthesise and stress-test answers to them.
This is the question set. It contains no answers on purpose.

Reads on from `THE_PASSENGER_FEELING_V1.md` (the feeling and its eight laws),
`THE_TURNING_WORLD_V1.md` (the concept), and `PROFILE_REDESIGN_BRIEF_V1.md` (the
page as it stands, its 27 defects and two outside critiques).

### One new requirement, recorded here for the first time

**A profile spot, top right.** An avatar / profile picture in the top-right
corner. Clicking it opens a small set of choices — account, and the ordinary
things a person expects there. This is the first *conventional* affordance the
building has proposed, and it needs to survive contact with everything else in
this document (see C15, D9, B7).

---

## A. CONCEPT — 15 questions

**C1.** Is the turning world the profile's *hero*, or its *setting*? If the crown
was the hero and the world is now behind it, which of the two does a visitor
describe when they tell someone what the page is?

**C2.** A passenger is being taken somewhere. Where is this world going? Is there
a destination at all, or is "motion without arrival" the honest answer — and if
so, does that read as peace or as limbo?

**C3.** Whose world is it? Yours, because your marks built it — or the archive's,
which you have been given a window onto? These produce different pages.

**C4.** What is the world when it is empty — a visitor with one free tarot pull
and no reading? Is a sky with no land a beginning, or a void with weather?

**C5.** Does a kingdom imply rule? A crown and a territory carry a claim of
dominion that "a reflective record, for insight, not instruction" may not want to
make. Is there a framing — a homestead, a holding, a parish, a station — that
keeps the world and drops the sovereignty?

**C6.** Is "kingdom" the right word at all, given the building already says Room,
Archive, Shelf, Vault, Codex, Reliquary? Which of those is it a neighbour to?

**C7.** Rings put other people's marks in your world. What is the consent model —
does the person you read for know they are standing in your kingdom, and does it
matter that they cannot see it?

**C8.** If the world is made of your marks, is it a *portrait* of you? And if a
visitor dislikes their terrain — Earth is flat and empty, Mountain is grand — has
the product told someone their life is dull?

**C9.** Eight trigrams means eight terrains. Some are inherently more beautiful
(Mountain, Lake, Fire) than others (Earth, Wind). How is fairness across the
eight held without flattening them into sameness?

**C10.** Does the world ever *change* after it is set, or is it fixed at birth?
Birth marks do not change. Rings and mints accumulate. So is the land permanent
and only the population grows?

**C11.** What happens on the day a person takes a *second* birth reading — for
themselves, corrected, or with a fuller birth time? Does the land move?

**C12.** Is the turning world a feature of the profile only, or is it the archive's
one continuous world that every room looks out onto — the desk, the drawing room,
the codex?

**C13.** What is the smallest version of this that is still the idea? If only one
thing could ship, is it the curve, the rotation, or the terrain?

**C14.** Does this idea survive without the crown? If the Card Mint or tarot became
the main product, would the world still make sense?

**C15.** Where does an *account* live in a world like this? A profile picture in a
corner is the convention; a kingdom is not conventional. Do they coexist, or does
the account belong somewhere the world is not?

---

## B. DESIGN — 10 questions

**D1.** Where exactly is the threshold line relative to the horizon — are they the
same line, or is there sky between the world and the shelf?

**D2.** Does the crown stand *on* the horizon, float above it, or sit at the
threshold as a gate between the two halves?

**D3.** What does the frame do — a drawn border, a vignette, a change of ground,
or nothing at all? The sketch draws a hard box; the laws ask for a window.

**D4.** How does a visitor *know* the world is theirs and not decoration, with no
label permitted anywhere?

**D5.** Is the world visible from the first pixel, or revealed on scroll? A page
that opens on a world is a statement; a page that reveals one is a gift.

**D6.** What is above the world — nothing, sky, or the top of the frame? Where
does the page end upward?

**D7.** Does the world appear anywhere else on the page — a sliver at the foot, a
reprise below the shelf — or strictly once?

**D8.** What is the mobile form? At 375px the arc, the crown and the content
cannot all have room. Which one loses, and does the idea survive it?

**D9.** How does the top-right profile spot avoid reading as a foreign object —
the one piece of ordinary web UI in a hand-built world?

**D10.** What is the reduced-motion page? A still world is a map. Is that a
downgrade, an equal, or secretly the better page?

---

## C. VISUAL — 10 questions

**V1.** How shallow is the curve, in degrees across the frame? The number that
decides archive versus cartoon.

**V2.** How much of the sphere is visible — a sliver of arc, a third, half?

**V3.** Line or mass? Engraved outline like the crown and the seals, or filled
silhouettes? Line is the house hand; mass reads at small sizes.

**V4.** How does a Mountain differ from a Lake at 40px, in one colour, with no
label? Repeat for all eight, then for twelve creatures.

**V5.** How many colours may the world use? The page has gold, warm grey, cream,
and a reserved violet. Does the world get any of its own, or none?

**V6.** How is depth shown — scale, blur, opacity, line weight, or hatching
density? Blur is expensive and soft; the house hand is line.

**V7.** How dark is the dark side, and is night the same world unlit or a
different drawing?

**V8.** What lights the world? The crown's gold is the page's light source today.
Does the world have its own sun, and does it rise?

**V9.** How do the blurred sides work — a literal blur, a vignette, a fade, or a
loss of detail? Each says something different about why you cannot see clearly.

**V10.** What is the world's texture — clean vector, engraved hatching, paper
grain, or plate noise? The card and the codex already answer this for their own
surfaces; does the world match one of them or stand apart?

---

## D. SYSTEM — 10 questions

**S1.** Where does the world's state live? There are no accounts and no backend —
everything is one browser's localStorage.

**S2.** What is the data shape? `crown_record` currently models one reading in the
singular (`PROFILE_REDESIGN_BRIEF_V1` §9 #12). Rings and mints are collections.
What replaces it?

**S3.** Is the world computed from marks at render time, or is a world-state
stored and mutated? Computed cannot be arranged; stored can drift from the marks.

**S4.** How is arrangement persisted, and what happens when it is lost — a cleared
browser, a new device?

**S5.** How many rings before the sphere is full, and what happens at that number?

**S6.** What is the render budget — nodes, transforms, and bytes — given L6 says
this must be near-free on a phone in a background tab?

**S7.** Does the world need a seeded random source so it is stable across visits,
and if so, what is the seed — the reading id, the marks, or the person?

**S8.** How does a new product join the world later? The Workshop, Games for a
table, the Concord, the Codex unlock all land eventually. Is there a rule for
what earns a place in the world versus a row on the shelf?

**S9.** How is any of this testable? A world that only looks right at 3am on a
Tuesday cannot be reviewed. What is the harness?

**S10.** What does the public build ship? `build_public.py` copies an allow-list,
and a world made of many parts is many files or one big one.

---

## E. SPACING — 10 questions

**P1.** What is the column measure? Two conflicting declarations currently produce
620px where 760px was also written (`§9b` problem 7). What is the right number
with a world behind it?

**P2.** How much vertical space does the world get, as a share of the first
viewport? The hero is currently accused of taking too much (`§9b` problem 3).

**P3.** How much air sits between the world and the threshold line?

**P4.** Is the world's height fixed, fluid, or clamped, and against what — vh, the
column, or the crown?

**P5.** What is the vertical rhythm below the line? The shelf's sections currently
use six near-duplicate large-gap clamps and none of them is a token (`§9` #25).

**P6.** Does the world's presence change the shelf's spacing, or must the shelf be
unaffected?

**P7.** Where does the eye land first, and what spacing decision puts it there?

**P8.** How much room do the blurred sides get, and is it symmetrical? The sketch
is not symmetrical — a bridge on the left, fish on the right.

**P9.** What is the first-viewport budget — what must be visible before any scroll,
on desktop and at 375px?

**P10.** What is the spacing scale itself? The page has no named steps; every new
block invents its own. What are the rungs?

---

## F. PROCESS AND PROTOTYPES — 10 questions

**R1.** What is the smallest prototype that can actually be judged — one terrain,
one creature, one hour of the day?

**R2.** How is a 24-hour rotation judged in a sitting? A time-scrub is needed, and
it must never ship.

**R3.** How many attempts, and what must differ between them for the comparison to
mean anything?

**R4.** What fixture does everything render, so attempts compare like for like?
(Proposed: **Mountain · Snake · Aries · Life Path 7 · Gebo**, the sample profile's
own marks, plus one alternate.)

**R5.** What is judged first — the still frame, or the motion? A world that fails
as a still image will not be saved by turning.

**R6.** Who judges, and against what? The builder's eye, the eight laws, and the
six tests in `THE_PASSENGER_FEELING_V1` §7 — is that enough to settle an argument?

**R7.** What is the kill criterion? What result means "this idea does not work",
as opposed to "this attempt does not work"?

**R8.** Does the prototype use the real profile content, and does it have to be
wired to real data to be judged?

**R9.** What order do the pieces ship in, given the page is live and this is a
front door?

**R10.** What is the rollback? If the world ships and reads wrong at 3am, what
comes off and how fast?

---

## G. BLINDSPOTS — 10 things that go wrong if not checked early

**X1.** **It reads as a game.** Bitty animals on a curved world is one bad
silhouette away from a mobile-game world map. The check has to happen at the first
sketch, not the last polish.

**X2.** **The curve makes it a small planet.** Too much arc and it is a cartoon
globe forever; this is a number, and numbers get tuned late when they should be
decided first.

**X3.** **The content loses.** Any motion above the fold competes with the reading
below it. L5 says the content wins; the world will fight that on every attempt.

**X4.** **It is beautiful and empty.** A world with nothing in it for the visitor
who has not paid is the same desolation in a prettier coat. The free tarot sky has
to be tested with real emptiness, first.

**X5.** **The terrain insults someone.** Eight terrains are not equal, and one of
them is going to feel like a worse life than another. Nobody catches this until a
real person with Earth sees their page.

**X6.** **It cannot be drawn at scale.** 8 terrains × 12 creatures × 12 skies is a
system, not an illustration. If the first prototype is one lovely hand-drawn
scene, the whole thing is a dead end that looks like success.

**X7.** **The clock is wrong somewhere.** A 24-hour rotation on local time hits
timezones, DST, devices with wrong clocks, and the visitor who opens it at
midnight on the seam.

**X8.** **It is expensive on a phone.** Ambient motion is where battery goes. A
background tab that keeps turning is a bug, and it will not show up on a desktop
in a preview pane.

**X9.** **The account spot breaks the spell.** One conventional avatar-with-a-menu
in the corner of a hand-built world is exactly the kind of foreign object that
makes everything around it look like a theme.

**X10.** **It never ships.** This is the most ambitious idea in the building, and
the page it is for has 27 open defects and a paywalled empty state. The world
could absorb months while the actual page stays broken.


---

## H. HIGHEST LEVERAGE — 10 things where the answer changes everything downstream

The seventy-five above are flat. These are ranked. Each is either a question whose
answer *decides other questions*, or a piece of work whose value is out of all
proportion to its cost. If the fleet only produces ten good answers, produce these.

**H1. THE SILHOUETTE SET IS THE PRODUCT.** Eight terrains and twelve creatures,
legible at 40px, in one colour, with no label. Everything else in this concept is
arrangement of those parts. If the set works, six different worlds can be built
from it in an afternoon; if it does not, no curve, clock or craft rescues it.
*Cost: one designer, one page of drawings. Value: the entire idea.* Do this first,
before any page is laid out.

**H2. THE FREE SKY IS THE WHOLE FUNNEL.** A free tarot pull giving a visitor a sky
turns the Drawing Room from a product beside the Birth Reading into the doorway in
front of it, and turns the paywalled empty profile into dusk-before-anything. It
is the only idea on the table that fixes the business problem and the design
problem with one move.
*Check: does a sky with no land actually read as promise rather than void?*

**H3. THE CURVE, AS A NUMBER.** Decided in an hour, or lived with forever. Too much
arc and the page is a cartoon planet permanently; too little and there is no world,
only a line. Pin it before anything is drawn on it.

**H4. RINGS AS OTHER PEOPLE'S MARKS.** The single mechanic that turns a
self-portrait into a household, gives the emptiest row on the page an object, and
makes the one product that is about another person visible for the first time.
*It is also the strongest reason anyone would pay twice.*

**H5. THE 24-HOUR CLOCK.** One decision that dissolves the hardest law (no
perceptible loop), delivers time-of-day theming free, makes every visit different
with no streak, and needs no animation loop at all. Confirm it works across
timezones and a wrong device clock and it is the cheapest large win available.

**H6. WHAT EARNS A PLACE IN THE WORLD VS A ROW ON THE SHELF.** Answered once, it
governs every product that lands afterwards — the Workshop, Games for a table, the
Concord, the Codex unlock, the Card Mint. Unanswered, every new feature reopens the
whole design.

**H7. THE STILL FRAME.** If the world fails as a motionless image it will not be
saved by turning, and the reduced-motion page is the honest test of that. Judge the
still first. It may also be the better page, which would be worth knowing early.

**H8. THE EMPTY WORLD, TESTED FOR REAL.** Not imagined — rendered, with no reading,
no rings, no mints, and looked at cold. The page's central failure today is that
its empty branch cannot be rendered at all, and this idea could reproduce that
exact mistake in a prettier form.

**H9. THE SPACING SCALE, NAMED.** The page has no rungs, so every block invents its
own values and the newest block invented five colours and a ninth type size. A
named scale is a morning's work and it stops the drift permanently — and the world
is about to add a large new block to a page that cannot absorb one cleanly.

**H10. THE ORDER OF SHIPPING.** The page is live, it is a front door, and it has 27
open defects. The world is the most ambitious thing proposed for it. Deciding what
ships first — the silhouettes, the free sky, the still world, the fixes — is worth
more than any single design answer, because the failure mode here is not a bad
world. It is a beautiful world that never arrives while the page stays broken.

### The one sentence

> **Draw the eight terrains and twelve creatures at 40px, give a free tarot pull a
> sky, and pin the curve. Those three answers make every other question easy.**

---

## HOW THE FLEET IS TO USE THIS

Each question gets a real answer, not a discussion. Where an answer is a fork, the
fork is named and a recommendation is made with its reason. Where an answer needs
a number, a number is given.

Then every answer is attacked: what breaks if this is wrong, what does it cost,
what does it foreclose. An answer that survives the attack is marked settled; one
that does not is returned as an open decision for the builder.
