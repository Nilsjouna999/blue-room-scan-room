# THE BLOOM GRAMMAR — what makes the Codex aperture satisfying

**The builder, 2026-08-15:** *"id say bloom effect we have on codex opening is pretty satisfying"*

So it becomes the reference. This document extracts WHY it works, in numbers, so the
grammar can be grafted onto other surfaces instead of guessed at. Everything below is
read out of `styles.css:4749-4955` — the shipped aperture, not a description of it.

> The immediate consumer is the specimen-panel bloom on THE SIX, LIVE (`_six-live.js`),
> where the current effect (BR-S453/455) has **none** of the first three properties.

---

## The five properties, ranked by how much they carry

### 1. ★★ THE EASING IS ASYMMETRIC — a leap, then a crawl

```
--ease-edge: cubic-bezier(0.22, 0.50, 0.16, 1.0)    /* 680ms */
```

The stylesheet's own comment names it: *"a real leap, then a slow-burn crawl to the land"*.
The control points put most of the distance in the first third and then spend the
remaining ~450ms arriving. This is the single biggest contributor and it is the one
thing a default ease-out does not give you.

Compare the house's other curves and note they are for different jobs:

| token | curve | job |
|---|---|---|
| `--ease-bloom` | `cubic-bezier(.16,.84,.30,1)` | the seal's own turn; fast, confident, settles |
| `--ease-edge` | `cubic-bezier(.22,.50,.16,1)` | **the aperture edge**; leap then crawl |
| `--ease-collapse` | `cubic-bezier(.4,0,.7,.4)` | the close; slow to leave, then gone |

**A symmetric ease is why a change reads as a state swap.** Asymmetry is why it reads as
an event.

### 2. ★★ THE EDGE IS ITS OWN OBJECT, AND IT LEAVES WHEN IT ARRIVES

`inkOpen` is not the aperture — it is a ring drawn *at the boundary* of the aperture:

```
@keyframes inkOpen {
  0%   { transform: scale(0); opacity: 0; }
  6%   { opacity: 1; }        /* on almost instantly */
  90%  { opacity: 1; }        /* rides the whole travel at full */
  100% { transform: scale(1); opacity: 0; }   /* and is gone exactly as it lands */
}
```

The boundary is brighter than the thing it reveals, travels with it, and **vanishes at the
moment of arrival** — so there is nothing left over to explain. A reveal with no edge is a
crossfade; a reveal with a lingering edge is a border.

### 3. ★★ THE FLICKER IS IRREGULAR — that is what makes it combustion

`emberBurn`, 380ms, and the opacity track is deliberately not a ramp:

```
0%  0      40%  .80     57%  .90     65%  .42
73% .68    81%  .28     89%  .46     95%  .14
```

Eight keyframes, non-monotonic, riding a sub-1% scale wobble (`.981 → 1.0006 → .9995 →
1.0004`). **A metronome is the one rhythm a nervous system never produces** — the same
principle `BR-S341` applied to the M2 question schedule. Smooth reads as mechanical;
irregular reads as alive.

The scale wobble is under one percent. It is felt, never seen.

### 4. ★ THE LAYERS ARE STAGGERED WITH REAL GAPS

Nothing starts with anything else:

| layer | delay | duration | ends |
|---|---|---|---|
| clip-path (the aperture) | 90ms | 680ms | 770ms |
| `bloom__ink` (the edge) | 90ms | 680ms | 770ms |
| `bloom__ember` (the burn) | 560ms | 380ms | 940ms |
| `bloom__sheen` (the sweep) | 800ms | 680ms | 1480ms |
| `seedToClose` (the control) | 0ms | 660ms | 660ms |

Each layer starts **after the previous has largely settled**. The whole gesture is ~1.5s of
arrivals, and it never feels slow, because at no moment are two things competing for the eye.

### 5. ★ THE CONTROL ACKNOWLEDGES THE ACT

`seedToClose` runs on the seal itself for 660ms, and the ✕ arrives by **rotating into true**
(`rotate(-65deg) → 0`, 340ms) rather than fading up — the stylesheet calls it *"a mark being
struck"*. The thing you pressed changes because you pressed it. Nothing in the aperture
explains itself; the control does.

---

## What this means for the specimen-panel bloom

The current effect (BR-S453, polished BR-S455) is:

```
--grade-a/--grade-b lift 140ms, fall 220ms         symmetric, smooth
m2read-arrive: opacity .22->1, translateY 4px->0   ease-settle, 260/300ms
meta leads mean by 60ms                            one stagger, no gap
```

Measured against the grammar above it has **property 4 only, and weakly**. It has no
travelling edge, no asymmetry, no irregularity. That is precisely why it reads as *"the
text got brighter"* rather than as an event.

**The graft, in order of leverage:**

1. Swap the arrival easing to `--ease-edge`. One token. Leap, then crawl.
2. Give the change an **edge that leaves** — one element, one transform, opacity to 0 at
   the instant it lands. This is the missing idea, not a garnish.
3. Put a small irregularity in the settle. Not a ramp.
4. Widen the stagger into real gaps, and let the **mark you touched** acknowledge the act
   (property 5 — currently nothing on the control moves).

## The one caveat the aperture does not have to answer

The aperture fires **once**, on a deliberate press. The specimen bloom fires **six times in
two seconds** when a reader sweeps the marks. A 1.5s staggered gesture cannot be copied at
that rate — it must be compressed to roughly a third, and the sweep case may need a
shortened variant that keeps the *shape* (leap, edge, irregular settle) at a quarter of the
duration. Getting that ratio right is the real work, and it can only be judged by hand on a
real trackpad.
