# THE CODEX ORB — ONE BALL, AND POSITION IS THE MODE

**Builder, 2026-08-14:** *"codex orb design we made should stay, im thinking orange codex
away, and you can drag main codex, when its out of position it turns to mini codex, when in
place real one, and when empty place clicked mini returns to its spot."*

> Supersedes the two-orb plan (yellow = full codex, orange = mini in-room search, stacked).
> The **design** of the orb is kept exactly — "Deep Glass", `styles.css:5044`. What changes
> is that there is one of them.

---

## THE IDEA, AND WHY IT IS BETTER THAN TWO BALLS

Two stacked orbs asked the visitor to learn which was which, and answered it with a hover
label. **This makes position the mode**, and position is the one property of an object you
cannot fail to perceive:

| where it is | what it is | what pressing it does |
|---|---|---|
| **docked**, in its spot | the real Codex | opens the full archive |
| **anywhere else** | the mini codex | searches, in place, without leaving the room |

★ **The state is spatial, so it is always visible and never has to be remembered.** An orb
at rest is a **door**. An orb in your hand is a **tool**. That is one idea, and it explains
both behaviours without a single word of instruction — which is the house rule from
[[blue-room-design-taste]]: a mark that needs a theory to read is a failure.

It also removes an object without removing a capability, which is the rarer kind of
subtraction — [[blue-room-strong-without-not-remove]] warns against deleting things the
builder likes, and nothing here is deleted. The orange orb's *job* survives; its *body* is
absorbed into the white one.

---

## THE ONE THING THE MECHANIC NEEDS THAT THE DESCRIPTION DOES NOT STATE

**The empty spot must stay visible.** *"when empty place clicked mini returns to its spot"*
requires the spot to be findable after the orb has left it. If the dock renders nothing when
vacated, the return gesture is undiscoverable — the visitor is holding a tool with no way
back that they can see.

So the dock leaves a **berth**: a socket the exact size of the orb, drawn at rest weight —
a hairline ring, no fill, no glow. It reads as *something belongs here and is currently
out*, which is true, and it is the click target for the return.

★ This is not decoration. It is the half of the mechanic that makes the other half
reversible, and [[blue-room-spatial-law]]'s supreme test — *every path reversible* — is not
satisfied without it.

---

## WHAT EXISTS TODAY, MEASURED

| | |
|---|---|
| the dock | `#brCodexDock`, injected by `syncCodexBall()` at `app.js:1170` |
| what it contains | **two `<a href="codex.html">` elements** — `.br-ball--orange` then `.br-ball--yellow` |
| drag | **none. Nothing in the dock is draggable today.** |
| where it appears | only 6 rooms — `arcane` · `arcana-reading` · `drawing-room` · `ceremony` · `settings` · `vault` (the `MISSING` map, `app.js:1171`) |
| the design | `styles.css:5044` — "Deep Glass". Perf contract: **only transform and opacity ever animate**; every shadow and gradient is static; `box-shadow` is NEVER transitioned |

★ **SCOPE FACT: there are two implementations of this pair, not one.** The dock above, and
the menu's own — *"The menu keeps its Aperture seal + orange mini-codex"* (`app.js:1168`),
bound to `#codexSeed` / `#codexMiniBall`. **Removing the orange orb is two removals.** A
change that lands in one and not the other leaves the house showing both the old and new
model at once — exactly the split PART 1 of `HOUSE_SHAPE_V1.md` found with The Forge.

---

## THE THREE PROBLEMS TO SOLVE BEFORE BUILDING

### 1. A link cannot also be a drag handle, not without a threshold

Both orbs are `<a>`. A press that moves becomes a drag; a press that does not becomes a
navigation — so the click handler needs a movement threshold (~4px) and a time floor, or
every drag ends by opening the Codex. Standard, but it must be written before the physics,
because getting it wrong makes the feature feel broken rather than laggy.

★ And the drag must not be the **only** way to reach the mini mode. A pointer gesture is
unreachable by keyboard and invisible to a screen reader, and the orb currently carries a
real `aria-label` and link semantics. The mini mode needs a non-drag route — the honest one
is that the berth's control and the orb's own menu both exist, and drag is the *fast* path,
never the sole one.

### 2. The physics are already decided — do not re-derive them

[[codex-orb-drag-physics]] settled this after a "pingy + laggy" drop turned out to be **one
wrong bezier, not latency**:

- velocity-continuous **exponential decay** on release
- **cap by shrinking tau, NEVER by clamping amplitude**
- **sample the ORB, not the pointer**

And the perf contract above is non-negotiable: transform and opacity only. A drag that
animates anything else will repaint per frame and reproduce the exact lag that was fixed.

### 3. ★ Does the position survive leaving the room?

Not stated, and it is the one question that changes the build. The dock is body-level and
`syncCodexBall()` re-runs per view, so today it would reset on every navigation.

Two honest answers:

- **It resets.** The orb is a property of the room you are in. Simple, no storage, and the
  berth is always where you expect it on arrival.
- **It persists** (a stored offset). The orb is a property of *you* — you put it somewhere
  and it stays there, which is closer to how the house talks about keeping things.

**Recommendation: it resets, for now.** Persistence means a stored coordinate that can land
off-screen after a resize or a device change, and that is a real defect class in exchange
for a small pleasure. Ship the reset, and promote it to persistent only if the reset
actually annoys.

---

## THE ORDER OF WORK

| # | step | note |
|---|---|---|
| 1 | Draw the **berth** — the empty socket, hairline, no fill | the mechanic is not reversible without it |
| 2 | Remove `.br-ball--orange` from `#brCodexDock` **and** the menu's `#codexMiniBall` | ★ two places, one change |
| 3 | Click threshold on the remaining orb (move → drag, still → navigate) | before any physics |
| 4 | Drag + release, per [[codex-orb-drag-physics]] | transform/opacity only |
| 5 | Mode by position: docked → full Codex · undocked → mini search | the whole point |
| 6 | Berth click returns the orb to its spot | the reversal |

Relates to [[codex-ball-and-mini]], [[codex-orb-drag-physics]], [[codex-bloom-aperture]],
[[codex-the-chamber]], `docs/HOUSE_SHAPE_V1.md`.
