# THE ROOMS MENU — REDESIGN BRIEF v1

**Status:** the builder's direction, recorded BR-S402. Not started.
The control itself moved to the bottom-right corner beneath the Codex orbs in
BR-S401/402; this document is about what it OPENS.

---

## What the builder asked for

> "I want new rooms button pop up redesign. I'm thinking darker like blue room
> blurry, with correct and actual room layout setup plus addition like settings and
> what not. And when clicked it's like lizard's eye that blinks and the room is
> yours."

Three separate asks, and they are independent enough to build in order:

### 1. Darker, blurrier — Blue Room's own material
The current sheet is a light paper overlay. It should read as the archive's own
dark air: near-black, blurred behind, the room still faintly present through it.
The material already exists on this site — `#brBuildFlip` and the L1 seal both use
a near-opaque floor plus a backdrop blur, and the Codex aperture (BR-S205) is the
closest existing precedent for a dark surface opening in place.

### 2. The ACTUAL room layout, not a list
The menu should be a MAP of the building as it really is, not a flat list of
links. As of BR-S400 the true layout is:

```
        L1 ....... M1 ....... M2
     (sealed)    THE DRAW    PROFILE
     Card Mint    (home)      (Shelf inside)
                    |
                    U1  — what is open, what is being made
```

Plus the rooms that are not on the horizontal track: The Codex, The Drawing Room,
The Birth Reading, Settings, and the Vision page. **The registry already knows all
of this** — `ROOMS` in `app.js` carries every room, its state (`open` / `drawn` /
`named`), whether it is free, and its door. A map drawn from `ROOMS` cannot drift
from the building the way a hand-drawn one would. That is the whole reason the
registry exists (BR-S366), and it is the single most important constraint here.

Additions the builder named: **Settings**, "and what not" — i.e. the surfaces that
are real but are not rooms. Candidates, all of which exist: Settings, the Vision
page, and the Codex.

### 3. The lizard's eye
> "When clicked it's like a lizard's eye that blinks and the room is yours."

A horizontal-lid blink, not a fade: the chosen room's tile takes over and the lids
close and open once as it becomes the page. Read it as a nictitating membrane —
fast, sideways, unsentimental — rather than a curtain or a dissolve.

Constraints that already apply on this site:
- Transform and opacity only. No `box-shadow` transitions (BR-S141).
- Honour `prefers-reduced-motion`: the blink becomes an instant cut, not a slow fade.
- The eye is a TRANSITION, so it must never be the only way the room opens — a
  keyboard activation must land in the room whether or not the animation runs.

---

## What must not break

- **The registry is the source of truth.** Draw the map from `ROOMS`; never restate
  the building in the menu's own markup.
- **L1 has no address** (BR-S400). If the map shows it, it shows it as sealed and it
  must not become a link — a link would give it the URL the whole design denies it.
- **`syncCodexBall` hides the orb dock on the menu.** The ROOMS control now sits
  beneath that dock, so any change to one has to be looked at with the other.
- The control is `.orbitbtn` and the sheet is its existing open/close machinery —
  this is a re-dress plus a new transition, not a new control.

---

## Open questions for the builder

1. Does the map show L1 at all? Showing it teaches the building; hiding it keeps
   the stumble a stumble.
2. Does the blink play on every open, or only on the first of a session? Beautiful
   once can be tiresome on the fortieth.
3. Is Settings a room on the map, or a smaller mark set apart from the rooms?
