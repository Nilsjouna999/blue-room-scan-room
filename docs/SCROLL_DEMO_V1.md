# THE SCROLL DEMO — the reading performing itself

**The builder, 2026-08-14:** the intake fills itself as you scroll · the card is written like
a letter with the same facts · when the last fact lands the card TURNS into its results ·
the panels lay out one after another · one continuous segment, not infinite scroll, "a
well-timed experience… it shows how it works, what it brings, the taste of it."

> A concept, not a build. The point of writing it first is that one decision below
> (§2) determines whether this is easy or impossible, and it is the one that gets
> discovered too late.

---

## 0. ★★ WHAT TO MASTER FIRST — BUILD THE TURN, ON A SLIDER, BEFORE ANYTHING ELSE

**The builder asked what is most important to get down. It is not the scroll.**

Act 3 — the card turning from written facts into given marks — is the only second of this
page that has to be *great*. Everything else only has to be not-bad. It is the product's
entire claim compressed into one movement: **what you gave becomes what you were given.**

★ **So build it standalone, driven by a slider, with no scroll machinery at all.** A slider
is the same thing a scroll position is — one number, 0 to 1 — so nothing is thrown away when
it is wired up later. And it tests the only question that matters:

> With a slider you can drag back and forth for ten minutes, is the turn still good?

**If it is not good on a slider, no amount of scroll craft will rescue it** — pacing cannot
make a weak moment strong, it can only fail to ruin a strong one. And if it IS good, every
remaining problem is plumbing.

The failure this prevents is the ordinary one: build the intake, build the typing, build the
panels, spend all the care on the approach, and arrive at the payoff with nothing left.
The turn is the last thing you have energy for and the first thing anyone judges.

### The second thing, and it also can only be felt

**How much scroll each beat gets.** The mapping from distance to perceived time is what makes
a page like this read as expensive or as cheap, and it is not reasonable-about — the same
finding as the palette and the M1 desk: build it at three lengths and feel all three. Do this
AFTER the turn exists, because the right length of the approach depends on how big the payoff
turned out to be.

### ★ The craft point nobody plans for: only one thing may move

In act 2 a field types on the left AND the card receives on the right. If both animate on the
same frames, the eye is split at the exact moment the mechanism is supposed to become legible
— and the mechanism IS the message here. So the handoff must be **sequential**: the field
finishes, then the card takes it. A beat of stillness between them is not dead time, it is
what makes the causal link readable.

### What is NOT the hard part

The pure-function architecture in §2 is load-bearing, but it is a decision, not a skill —
you make it once, correctly, in an afternoon. Do not confuse "most important to get right"
with "hardest to master". The turn is both.

---

## 1. WHAT IT ACTUALLY IS

**The scrollbar is the transport, and the visitor is the projectionist.** They are not
filling a form and not watching a video — they are advancing a thing that is already made,
at their own speed, and they can run it backwards.

That is worth naming precisely because it settles the tone. The house register is *"holding
your excitement, in knowing reassurance it will deliver."* A demo that plays itself is
urgency; a demo the visitor advances by hand is reassurance. **Scroll-driven is the register,
not just the technique.**

★ **And it answers the question no page on the site has answered:** *what actually happens
when I give you a name and a date?* Today that is described in prose. Here it is performed,
with the real engine's real output, and prose becomes unnecessary.

---

## 1B. ★★ WHAT WE ARE AFTER — the four axes

Written before any fleet is fired, because a brief that omits this gets it invented twenty
different ways.

### VISUALLY — one object, seen for longer

**Not a sequence of screens. One object that changes.** Every scrollytelling page on the
internet is a series of slides; this one is a single card watched from blank to whole. The
intake is a margin note, the panels are the card's own contents unfolding — nothing that
appears is a NEW scene, everything is the same object at a later moment.

That is also what the house already is: a dark room with one lit thing in it. And the
palette paper's own rule applies — *cap the big light element, return the radiance as a
halo* — so as the card grows in importance the room should get **darker around it**, never
brighter. Importance is bought by removing competitors, not by adding light.

### EMOTIONALLY — recognition, not wonder

The house register is *"holding your excitement, in knowing reassurance it will deliver"*
([[house-register]]), which rules out spectacle as firmly as it rules out urgency.

So the feeling we are after is **not** *"wow, look what it made."* It is:

> *Oh — that was in there?*

The facts a visitor gives are the two most ordinary things about them, a name and a date.
What comes back is also theirs, and they did not know it was. **The emotion is being handed
something that was already yours** — which is precisely what *given, not chosen* means, felt
rather than claimed.

★ **And the one emotion to actively prevent: admiration for the software.** If a visitor
leaves impressed by the cleverness of the machine, the admiration is pointed at us instead
of at them, and the product is about them. No performance of computation, no cleverness on
display (§8.8).

### TUTORIALLY — two sentences, not a mechanism

After watching, a visitor must be able to say:

1. **"I give a name and a birth date."** — cheap, no photo, no account, nothing to lose.
2. **"Six marks come back, and they are looked up, not invented — the same every time."**
3. *(and then)* **"Each one opens into something worth reading."**

★ **What they must NOT learn is how the derivation works.** The mechanism is not the lesson;
if someone leaves understanding the algorithm, the page taught the wrong subject. The test
is blunt: can they state what they would type and what they would get, in two sentences? If
it takes more, it is over-taught — and over-teaching is how a demo becomes a manual.

### SMOOTHNESS — a floor, so that one moment can break it

Two different things wear this word.

- **Mechanical:** transform and opacity only, no layout, no shadow transitions, self-parking
  rAF. Table stakes, and the repo already has it in writing (`styles.css:5050`).
- **Perceptual:** the page is *always exactly where your hand is*. Nothing queued, nothing
  catching up, nothing snapping. §2's architecture is what buys this, and it cannot be
  retrofitted.

★ **But uniform smoothness is bland.** A page where everything glides equally has no
emphasis anywhere. Smoothness is the GROUND; the held beat before the turn (§9.2) is the
figure. We want it flawlessly even everywhere else precisely so that the one place time
thickens is unmistakable.

★★ **And the constraint that follows from all of it: every value of `p` is a poster.**
Because the visitor sets the speed, they can stop anywhere — including halfway through the
turn. So there is no such thing as an in-between frame. Every intermediate state must be a
composed, defensible image, not a tween caught mid-flight. This is a real design burden and
it is the single best test of whether the page is finished: open twenty random `p` values
(§9.10) and see whether all twenty look deliberate.

---

## 2. ★★ THE DECISION EVERYTHING ELSE DEPENDS ON: SCROLL IS A POSITION, NOT A SEQUENCE OF EVENTS

There are two ways to build this and only one of them works.

| | |
|---|---|
| **Events (wrong)** | "when the user passes 40%, type the name." Fires once. Scroll back up and the name stays. Flick a trackpad and three steps fire in one frame, or none do. Every scrollytelling page that feels broken is built this way. |
| **★ A pure function of position (right)** | `p` = how far through the segment you are, 0 → 1. EVERY visible thing is computed from `p` on the frame it is drawn. Nothing is remembered, nothing is queued, nothing "has happened". |

**What that buys, for free and with no extra code:**

- **Scrolling up un-plays it.** Perfectly, at any speed, from any point. The letter unwrites.
- **A fast flick lands correctly.** If `p` jumps 0.1 → 0.7 in one frame, the page draws the
  0.7 state. It does not have to catch up, because it was never behind.
- **Any point is addressable.** `?p=0.62` shows that exact moment — which is how it gets
  screenshotted, reviewed and demoed without scrolling.

Concretely: one tall section, a `position:sticky` stage inside it that never moves, and

```
p = clamp01((scrollTop - sectionTop) / (sectionHeight - viewportHeight))
```

Each act owns a window of `p` (say the name types between .08 and .16) and gets its own
local `t` inside it. Text reveal is `text.slice(0, Math.round(t * text.length))` — reversible
because it is arithmetic, not an animation.

---

## 3. THE FIVE ACTS

Roughly 520vh of scroll. Each act is a window of `p`; the numbers are a starting point.

| # | act | p | what happens |
|---|---|---|---|
| 1 | **THE EMPTY PAIR** | .00–.08 | The intake on the left, blank. The card on the right, blank. Nothing moves yet — the visitor sees the two things that are about to talk to each other. |
| 2 | **THE FACTS ARRIVE** | .08–.38 | Each field types itself: the name, then the date. As each one completes it is **written onto the card**, in the same words, like a letter being addressed. The card is receiving, not computing. |
| 3 | **★ THE TURN** | .38–.50 | The last fact lands and the card turns. The written facts become the six marks — *Snake · Sagittarius · Life path 7 · Fehu · Kūn · Hexagram 2*. This is the beat the whole page exists for, and it must be the only thing on screen when it happens. |
| 4 | **THE SIX, ONE BY ONE** | .50–.90 | The panels lay out in order, each one arriving as you reach it: what the mark is, what it says. Real Codex text, real perk colours. |
| 5 | **THE CLOSE** | .90–1.0 | The six become one crowned name. The record is whole. |

★ **Act 3 is the product.** Everything before it is setup and everything after is payoff. If
the turn is not the best-made second on the site, the page has failed regardless of how good
the rest is.

---

## 4. ★★ THE THING IT MUST NOT DO: FAKE THE READING

**John's reading has to be John's reading.** A demo that shows a plausible-looking result for
a name and date the engine would answer differently is the exact failure `docs/CLAIM_AUDIT_V1.md`
caught — something that reads as information and is not.

So the fixture is generated, never typed:

1. Pick the name and date **once** and write them down.
2. Run them through `arcana-reading.js`'s own derivation.
3. Bake the result into the demo as data.
4. ★ Add a test that re-derives and compares. The day the engine changes, the demo either
   updates or fails loudly — the same discipline `tools/build_atlas.py` exists for.

**Suggested fixture:** a name and a date that produce a *visually varied* six — different
elements, a short sun sign and a long hexagram name, at least one perk from the cost side.
The demo should show the system's range, not its easiest case. Pick the date to make that
true; it is a demo, choosing a good specimen is honest as long as the derivation is real.

---

## 5. ★ THE ENDING — WHERE THE PLAN NEEDS A CHANGE

**Builder:** *"after scrolling to the end it refreshes."*

A page that resets itself when you reach the bottom has a trap in it: you arrive at the end,
it resets, and now you are at the bottom of something that has un-happened. Scroll up to see
it again and you run it backwards. The visitor's most likely feeling at that moment is *did
I break it.*

**What the instinct is right about:** it should be re-watchable, and it should not dump you
into dead page. Three ways to keep that without the trap:

| | how | cost |
|---|---|---|
| **★ Settle, then offer** | At `p=1` the record is whole and stays whole. Below it: the real way in, and a quiet "run it again" that scrolls you back to the top. | nothing — and the end of the demo becomes the one place a visitor is most likely to act |
| Loop the segment | At `p=1` jump to `p=0`. | the jump is visible and reads as a glitch |
| Sticky replay | The stage stays pinned and replays under a static footer. | the visitor cannot leave it |

**Recommend the first.** The demo's job is a taste; the moment after a taste is when someone
decides. Ending on a reset spends that moment on a rewind.

---

## 6. WHAT MAKES IT FEEL RIGHT, AND WHAT MAKES IT FEEL CHEAP

| feels right | feels cheap |
|---|---|
| the visitor's speed is the pace | anything on a timer while they sit still |
| the card **receives** the facts — a letter being addressed | the card "calculating" — progress bars, spinners, fake work |
| one thing happening at a time | three things easing at once |
| real words from the archive | lorem, or invented traits |
| it un-plays on the way back | one-way animation |

★ **On the typing:** it should read as *written*, not as a terminal. No cursor block, no
per-character stagger you can count. The house has a display face — the letter should be in
it, and the fine hand should be legible first and pretty second. The builder's words: *"fine
understandable font."*

---

## 7. WHERE IT LIVES

Per `docs/HOUSE_TEMPLATE_V1.md`, this is the body of a **product page** — it says what one
reading is and what it gives. It is not a door: a stranger who has not been told what Blue
Room is will not scroll 500vh to find out.

So: **the Birth Reading's page opens with it**, and `_m1-final.html`'s content — the tiers,
the verbatim specimens, the closing block — sits underneath it as the part you read once the
demo has made you want to.

---

## 8. ★★ THE TEN MOST DAMAGING MISTAKES, RANKED BY DAMAGE

Ranked by what they COST, not by how likely they are. 1–3 are the ones that cannot be
patched later.

**1 · Building it as events instead of as a position.**
The only mistake here that requires starting over. Scroll up and the page stays played;
flick a trackpad and beats fire three-at-once or not at all. Every scroll page that feels
broken has this inside it. See §2 — it is a decision, not a difficulty.

**2 · Building the turn last.**
The payoff gets whatever care is left after the intake, the typing and the panels — which is
none. The one second that has to be great is the one built by an exhausted person on a
deadline. Build it first, on a slider (§0).

**3 · Faking the reading.**
Showing a six that the engine would not actually derive from that name and date. This repo
has already been burned by exactly this: *"given, not drawn"* shipped to the front door and
spread into a dozen prototypes because nobody audits a string that came from the codebase
(`docs/CLAIM_AUDIT_V1.md`). A faked demo is the same lie, animated, in the shop window.

**4 · Nothing happens in the first hundred pixels.**
The visitor has to LEARN, immediately and without being told, that they are driving. If the
first scroll produces no change they conclude it is a static page and leave — and everything
good is below. The first beat must answer the very first pixel.

**5 · Scroll-jacking.**
Smooth-scroll libraries, snap points, `preventDefault` on wheel, hijacked velocity. It takes
control away at the exact moment the design's whole argument is that the visitor is in
control — and it breaks trackpads, keyboards, screen readers and the browser's own find.
**Read the scroll position. Never write it.**

**6 · Two things moving at once.**
In act 2 the field types on the left and the card receives on the right. Animate both on the
same frames and the eye is split precisely when the mechanism should become legible — and
the mechanism is the message. Sequential, with a beat of stillness at the handoff.

**7 · Too much before the payoff.**
Every 100vh of approach is people who leave before act 3. A demo whose only great moment is
below the point most visitors reach has no great moment. Cut the setup to the shortest
version that still lands the turn.

**8 · The "calculating" metaphor.**
Spinners, progress bars, numbers whirring, anything that performs computation. It makes the
product read as software — and directly contradicts the copy that shipped one commit ago:
*nothing is rolled here.* The card RECEIVES; it does not compute.

**9 · Animating anything but transform and opacity.**
The repo already carries this contract in writing (`styles.css:5050` — every shadow and
gradient static, `box-shadow` never transitioned, "that was the old repaint-per-hover-frame
lag"). Break it and the jank lands during the exact second that has to feel expensive.

**10 · Ending on a reset.**
Covered in §5. It spends the one moment a visitor is most likely to act, on a rewind, and
the most probable feeling is *did I break it.*

★ **Just outside the ten, and still worth pre-empting:** no reduced-motion path (the
preference already exists in `data.js`, and the honest fallback is the same five acts as a
plain written page, never a still image); and treating mobile as a narrower desktop rather
than its own design — `docs/LAYOUT_LENSES_V1.md` already carries the SPLIT CLAUSE for it.

---

## 9. ★★ THE TEN HIGHEST-LEVERAGE THINGS — what makes it masterful rather than good

Ranked by effect per unit of effort. §8 is what stops it being bad; this is what makes it
memorable. They are mostly small.

**1 · The turn is ONE movement, not a transition.**
A card that cross-fades from written facts to six marks is a swap, and a swap is forgettable.
A card where *the same ink rearranges* — the letters of the date travelling into the place
where the life path lands — is a transformation, and people scroll back up to watch it again.
This single distinction is most of the difference between good and unforgettable, and it is a
choice made at the start, not a polish applied at the end.

**2 · A held beat of stillness immediately before the turn.**
Perhaps 0.02 of `p` where nothing moves at all. It costs nothing, it is two lines, and it is
the page inhaling. The repo already knows this: BR-S311 made the ROOMS click read by adding
an 80ms pause before the sequence — *"the same set of transitions with the ORDER written
down."* Same trick, bigger moment.

**3 · The parts of the card do not move together.**
Already measured in this codebase and directly reusable: the ROOMS field gives each layer its
own mass — icon gain 1.00, type 0.34, meaning 0.27, ornament 1.20 — and its note is exactly
the point: *"the parts do not move together — that is the whole effect."* A card whose rule,
type and ornament arrive at slightly different times reads as a physical object. One that
moves as a rectangle reads as a div.

**4 · Let a cost show in John's six.**
Pick the fixture so at least one perk is a shadow trait — *restless*, *escapist*, *proud*.
A demo that shows a downside is instantly more believable than one that shows only gifts, and
it costs nothing but the choice of date. It is also true to the product: the readings already
name both halves.

**5 · The typing rhythm is uneven.**
Constant per-character speed reads as a machine; that is the one thing this must not be
(§8.8). Vary it — a longer pause at a space, longer again after a comma, a hair of jitter
per character. About six lines of code, and it is the difference between *typed* and
*written*.

**6 · The very first pixel is answered.**
Not a beat — a breath. The paper settles, a rule draws a few millimetres, the cursor appears.
It teaches the entire interaction wordlessly, and it converts the visitor from reader to
operator before they have decided whether to stay.

**7 · Make the reversal pleasurable, not merely correct.**
§2 gives you reverse for free — masterful is when running it backwards is *worth doing*. The
letter unwriting, the marks resolving back into a date. Most scroll pages treat backwards as
a correctness problem; treating it as a second thing to watch doubles the page for no extra
content.

**8 · Drive the card's own light from `p`.**
`.m2hero::before` already exists: two soft-light lobes on `--lx/--ly`, deliberately damped to
half strength. Moving them slowly as the page advances makes the card sit in a lit room
rather than on a page. Shipped code, one line of wiring.

**9 · The last frame is a composition, not a stopping point.**
Whatever is on screen at `p=1` is what gets screenshotted, shared and remembered. Design that
single frame as deliberately as a card face: the finished record, the ask quiet beside it,
nothing else competing. Most scroll stories simply run out.

**10 · Make every moment addressable (`?p=0.62`).**
The meta one, and it raises the ceiling on all nine above. If any instant can be opened
directly, the turn can be reviewed frame by frame, screenshotted headless, compared before
and after a change, and judged by someone who is not currently dragging a scrollbar. Without
it, every judgement about this page is made from memory of a thing that already scrolled past.

---

## 10. THE OPEN QUESTIONS

1. **How long is too long?** 520vh is a guess. It wants building at three lengths and feeling
   all three — the same method that settled the palette.
2. **Does the visitor ever type?** A field that invites a real name after the demo is a
   powerful move and it is also the moment the site can no longer fulfil (`POST_TARGET` is
   `null`). Probably later.
3. **Mobile.** A 520vh scroll story on a phone is a different design, not a narrower one.
   `docs/LAYOUT_LENSES_V1.md` already carries the SPLIT CLAUSE for exactly this.
4. **Reduced motion.** `data.js` already holds the preference. The honest fallback is not a
   still image — it is the same five acts as a plain, scrollable, fully-written page.

Relates to `docs/HOUSE_TEMPLATE_V1.md`, `docs/POSITION_MAP_V1.md`, `docs/CLAIM_AUDIT_V1.md`,
`docs/LAYOUT_LENSES_V1.md`.
