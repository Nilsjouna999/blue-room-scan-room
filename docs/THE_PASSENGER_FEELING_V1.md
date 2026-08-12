# THE PASSENGER — the feeling the profile is after

**Status:** written 2026-08-12, from the builder's sketch over the live profile.
This document lays out the FEELING and its laws. It builds nothing. It exists so
a fleet can attempt the space in several styles and be judged against something
other than taste.

---

## 1. THE ONE SENTENCE

> **You are a passenger.** The page is a lit seat with a world going past it, and
> because the world is moving you do not feel bad for sitting still.

The builder's own words: *"like sitting in a car — you don't feel bad doing
nothing, because you are moving, still going somewhere."*

That is the whole brief. Everything below is a consequence of it.

---

## 2. WHY THIS IS THE ANSWER TO THE REAL PROBLEM

The profile's central fault is that it is **empty and desolate rather than empty
and calm** (`PROFILE_REDESIGN_BRIEF_V1` §9c). Every fix proposed so far attacks
that from the content side: seed the shelf, replace absences with silhouettes,
hide unshipped sections.

The passenger idea attacks it from the other side, and it is the stronger side:

**If the world is moving, emptiness stops being a report on what you own and
becomes space you are travelling through.** A near-empty carriage is not sad. A
near-empty room is.

This also fixes the thing the research named and nothing has yet solved: the page
must be designed *for the tenth visit*. A page with weather is different every
time you open it without anyone having to earn anything, buy anything, or come
back on a streak.

---

## 3. THE SKETCH, READ BACK

From the builder's drawing over the live page:

| Mark | What it says |
|---|---|
| **Red box** hard around the centre column | The content stays solid and framed. It is a window, and this is its edge. |
| **Green jagged horizon** crossing the whole width, left and right | The world continues *behind* the column. Both margins are the same world. |
| **Purple line** under the horizon | A second, further plane. There is depth, not one flat backdrop. |
| **Blue fish**, right side, several, at different depths | Living things pass. They are not reacting to you. |
| **Blue drops**, left side | Water. Gravity. Time falling. |
| **Green bridge on brown posts**, lower left | Built structure in the world — this is a *place*, not an effect. |
| **Orange ring** around "MAIN MENU" | The exit stays legible on top of all of it. |

Read together: **a framed, lit cabin, with a continuous world at two or more
depths behind it, containing weather, creatures and architecture.**

---

## 4. THE LAWS

These are what separate this from "a nice background." A proposal that breaks one
of them has missed the feeling, however pretty it is.

### L1 — PASSENGER MOTION, NEVER DRIVER MOTION
The world does **not** respond to the cursor. No parallax on mouse, no hover
physics, no thing that swims toward the pointer. The moment it reacts, it becomes
a toy and asks for attention — and the whole point is that it asks for nothing.
The car does not care that you are in it.

### L2 — WEATHER, NOT EVENTS
A fish passing is weather. A fish that does a trick is an event. Weather can be
ignored indefinitely; events demand a look and then a next one. Nothing out there
should ever be *interesting enough to interrupt reading*.

### L3 — IT IS BEHIND, NOT ON
Depth is the difference between a world and a decoration. Far things are slower,
smaller, dimmer, softer-edged. If it reads as ornament laid over the page, it has
failed. The red box is a window frame; everything outside it is further away than
everything inside it.

### L4 — NO PERCEPTIBLE LOOP
The instant you can see the seam, the world stops being a world. Either the cycle
is long enough never to be caught in a sitting, or the motion is generative drift
with no repeat to find.

### L5 — THE CONTENT ALWAYS WINS
Contrast, focus and stillness belong to the column. If a single line of the shelf
is harder to read because of the world, the world is wrong. This is not
negotiable and it is where most attempts will die.

### L6 — IT COSTS ALMOST NOTHING
It runs for as long as the page is open, on a phone, in a background tab. Compositor-
only (transform/opacity), no per-frame layout, no large bitmaps, throttled or
paused when hidden. A world that heats the device is a world nobody sits in.

### L7 — IT HONOURS REDUCED MOTION
`prefers-reduced-motion` gets a still frame of the same world — the horizon, the
depth, the architecture, without travel. It must still look like a place.

### L8 — INDIFFERENT, NOT LONELY
The world is not empty either. Something has passed recently and something will
pass soon. The distinction between calm and desolate applies out there too.

---

## 5. WHAT IT MUST NOT BECOME

- **A screensaver.** Beautiful, ignorable, and disconnected from what the page is.
- **An aquarium.** Cute fights archival gravity. This is a near-black room in an
  archive, not a waiting-room tank.
- **A game.** Nothing to click, catch, collect or feed out there. The collectibles
  are on the shelf, inside the frame, where they were already.
- **A theme.** Not "the ocean skin". One world, and it is Blue Room's.
- **Busy.** Several simultaneous motions read as noise. One slow system, maybe two
  at different depths.

---

## 6. THE THREE PITCHES ON THE TABLE, assessed

**A. The glass globe.** The page as the inside of a sphere; the world curves away
at the edges.
*Strength:* gives enclosure and world in one move — refuge and prospect together,
which is exactly the pairing the dwelling research says is missing.
*Risk:* a globe is a thing you look **at**. It can turn the reader into an observer
of a specimen rather than a passenger inside something. Works better if the glass
is the **window you are behind**, not a bauble you are holding.

**B. Water, dripping / running.**
*Strength:* the deepest continuity in the building. Blue Room's whole vocabulary is
already darkroom — the develop bath, the meniscus, the wet leading edge, the print
rising. Water is not a new metaphor here, it is the existing one made ambient. It
also carries time better than anything else: a drop falls, so time passed.
*Risk:* vertical motion beside vertically-scrolling content can fight it.

**C. Fish, up and down.**
*Strength:* the truest "car window" of the three — a living thing with its own
business, indifferent to you. L1 and L8 come free.
*Risk:* the hardest to keep from turning cute, and the easiest to make an event
rather than weather.

**Not yet on the table, and worth putting there:**
- **The deep / a lit bell.** The column is a submersible's lit cabin; the dark is
  water at pressure; drops, particulates and slow shapes pass. Absorbs all three
  pitches into one world.
- **Sediment in a shaft.** Motes drifting through the one light. The most
  restrained possible version, and the safest against L5.
- **A tide line.** The builder's drawn horizon, rising and falling over real hours
  — the page is different at 3pm and 3am with no clock shown.
- **The turning sky.** Constellations drifting, on the real date. On-brand for an
  archive that reads birth charts, and the slowest motion available.
- **Rain on the far side of the glass.** The drops in the sketch, but *on the
  window* rather than in the world — the strongest possible statement of "you are
  inside and dry."


---

## 9. THE KINGDOM ABOVE THE LINE — the sharpened form

The builder's second pass turns the ambient world into **structure**, and it is
much stronger than a background:

```
   ABOVE THE LINE      the KINGDOM — a small living world.
                       village, castles, animals. bitty. slowly turning.
   ─── THE LINE ───    the threshold. ground level.
   BELOW THE LINE      UNDERGROUND — the shelf, the vault, what you hold.
                       archival. still. solid.
   THE SIDES           blurred, and a little alive.
```

### ★ THIS IS ALREADY IN THE SOURCE. It was declared and never drawn.

`arcana-profile.js:5-7`, the file's own header, written long before this
conversation:

> "ABOVE GROUND — a self-contained *surface world* box: the crown-monument, its
> bearer, and a gold **Kingdom-Threshold** horizon sealing its base.
> UNDERGROUND — the content sections…"

And `arcana-profile.css:6`:

> "…rising out of the floor, sealed at its base by a gold **Kingdom-Threshold**
> horizon."

The page has described itself as a kingdom above ground and an archive below it
**from the beginning**. What shipped was the vocabulary without the world: a
horizon rule, and nothing on the other side of it. The line added in BR-S372 —
labelled YOUR SHELF — *is* that threshold, built again by hand without either of
us noticing the name was already there.

So this is not a new direction. It is the page's own latent design, finally drawn.

### WHY A KINGDOM, AND NOT JUST A WORLD

**A crown with no kingdom is a hat.** The profile's hero is a forged crown whose
points are the inputs you gave and whose gems are the readings it holds — and it
rules nothing. Give it territory and three things resolve at once:

1. **The crown earns its size.** It stops being an ornament above a list and
   becomes the seat of something.
2. **Accumulation becomes visible without a number.** "Never start at 0-of-N"
   (`PROFILE_REDESIGN_BRIEF_V1` §9c) becomes literal and kind: a new visitor has a
   *small settlement*, not a set of empty slots. It grows. Nobody is told it is
   1-of-12.
3. **The tenth visit differs from the first** by itself — the thing the dwelling
   research says nothing else on the page achieves.

### ★ THE REFERENCE THAT RESOLVES THE CUTE PROBLEM: MARGINALIA

The obvious risk is that a tiny village with animals reads as a game and fights
the archival gravity of everything below the line. There is a precedent that
dissolves it completely.

**Medieval illuminated manuscripts put tiny living scenes in the margins of the
most solemn text there was.** Drolleries: rabbits, knights, snails, villages,
whole small dramas, drawn at the edges of a page whose body was scripture. The
form is not decoration bolted onto seriousness — it is a thousand-year-old
convention for exactly this: *a grave record with a living margin.*

That is the register. Not a game world. Not an aquarium. **A margin, illuminated.**
Bitty is correct. The smaller and finer the figures, the more it reads as an
illuminated archive and the less as a toy — and "bitty" is the builder's own word.

Adjacent forms worth pointing the fleet at: a **map cartouche** (the little scenes
map-makers drew in the corners), a **diorama under glass**, an **orrery**, a
**reliquary's carved base**, and the **predella** — the strip of small narrative
panels beneath an altarpiece, which is *literally* a living band below a solemn
image.

### HOW THE EIGHT LAWS APPLY, and which two get strained

- **L1 passenger, not driver** — holds, and matters more here. The kingdom must not
  react to the cursor. No hovering a cottage to learn what it is.
- **L2 weather, not events** — strained. A village is more eventful than drifting
  motes. Nothing may *finish* in view: no arrivals, no completions, no creature
  that reaches a destination while you watch. Things cross and continue.
- **L3 behind, not on** — becomes the sides. Blurred, slower, dimmer: the kingdom
  continues past the frame and out of focus. This is the sketch's green horizon
  crossing the full width.
- **L4 no perceptible loop** — hardest law here. A rotating world returns. Either
  it turns slowly enough that a session never sees a full revolution, or what
  populates it drifts so the same face is never quite the same.
- **L5 the content always wins** — the kingdom sits ABOVE the reading, which is
  the safest possible place for it. Nothing crosses the threshold downward.
- **L6 costs nothing · L7 reduced motion · L8 indifferent** — unchanged. The still
  frame of a kingdom is a map, and a map is still a place.

### ★ THE ONE DECISION THIS FORCES

**Does the kingdom REPRESENT your holdings, or is it weather?**

- *Weather:* the same world for everyone, atmosphere only. Cheap, safe, and it
  throws away the best thing about the idea.
- *Representation:* one building per reading, a figure per ring, a beast per
  mark. Magnificent — and it becomes a dashboard with a legend to decode, which
  is the opposite of a margin.

**My reading: it should GROW with your holdings but never MAP to them.** More
readings means a larger settlement — a roof appears, a road extends, another
light comes on at dusk — with no legend, no labels, no tooltip, and no way to
count. The plain semantics stay on the shelf below the line, where they already
are and where they belong. The kingdom is the *felt* version of the same fact.

That keeps the collectible payoff (the tenth visit is visibly bigger) without
turning the hero into an infographic, and it obeys the house rule the roadmap
research already set: metaphor in the chrome, plain language in the semantics.

### WHAT THE FLEET SHOULD ATTEMPT NOW

Not "several ambient backgrounds". Several **kingdoms**, differing on purpose:

1. **The illuminated margin** — drolleries at the frame's edge, gold-leaf register.
2. **The turning model** — a slow orrery/globe: the settlement rotates past.
3. **The far shore** — a fixed horizon, the sketch's line, with weather and
   distant traffic crossing it.
4. **The predella** — a narrow lit band directly above the threshold, all of it
   small, the rest dark.
5. **The submerged kingdom** — the builder's water and fish, with the village
   *below* the surface and the threshold as the waterline.
6. **The lantern's throw** — almost nothing visible except what one light reaches;
   the kingdom implied rather than shown.

Each delivers a standalone page with the real profile content in the frame, the
kingdom above the line, blurred living sides, a reduced-motion still, and one
line on which law it found hardest to hold.

---

## 7. HOW A PROPOSAL WILL BE JUDGED

Any attempt gets these six questions, in this order:

1. **The car test.** Sit with it for sixty seconds doing nothing. Does the stillness
   feel like rest or like waiting?
2. **The reading test.** Read the shelf with it running. Did you lose a line?
3. **The tenth-visit test.** Would it be different tomorrow without anyone earning
   anything?
4. **The mute test.** Freeze it (reduced motion). Is it still a place?
5. **The phone test.** Does the device get warm? Does it hold 60fps at 375px?
6. **The dignity test.** Does it still read as an archive at three in the morning,
   or does it read as a lava lamp?

---

## 8. WHAT THE FLEET IS FOR

Not to pick a style. To produce **several genuinely different worlds** at enough
fidelity to sit in, so the builder can judge the *feeling* rather than the
description — the way the roadmap and the mark palettes were settled today.

Each attempt must deliver: a standalone page, the real profile content inside the
frame, one world behind it, the reduced-motion still, and one line on which law it
found hardest.

**The judgement is the builder's eye. This document exists so the attempts are
different from each other on purpose, and so "it feels wrong" can be traced to a
law rather than to a mood.**
