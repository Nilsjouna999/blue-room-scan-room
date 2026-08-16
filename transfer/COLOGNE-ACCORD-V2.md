# THE PERSONAL ACCORD — V2, the converged design

Source: the builder's own GPT study, handed over 2026-08-16 with the note "the visual
exploration has now converged. Further image variations would mostly introduce noise.
The next meaningful refinement should happen in code."

**This supersedes `COLOGNE-REFERENCE.md` where the two disagree.** That document is a
measurement of one still image and its geometry still stands. This one says what the
object IS, which is the part the measurement could not carry.

> The correct object is not merely a cologne bottle. It is **The Personal Accord**: a
> botanical-green fragrance flask whose six hidden facets represent six inherited
> systems, whose formula label contains the reading, and whose entire object is recessed
> and sealed into the original Blue Room menu.

---

## 1. THE CLOSURE CONTROLS THE CATEGORY

A glass body alone always shares territory with spirits, bitters and apothecary jars.
What makes it unmistakably **fragrance** is the closure, and only the closure:

- removable overcap
- narrow **brass pump collar**
- a visible **lift seam**
- atomizer architecture
- visible internal **stem and dip tube**

**The cap is SMALLER and quieter than the V1 measurement.** It must not compete with the
reading or read as a broad crown. V1's `--acc-cap-h: 0.112` is now an upper bound, not a
target.

## 2. THE LABEL AND THE BOTTLE HAVE DIFFERENT JOBS

Do not let either do the other's work.

| the bottle says | the label says |
|---|---|
| personal essence | product identity |
| mixture | The Crowned Name |
| atmosphere | six systems |
| sillage | reading hierarchy |
| permanence | legibility |

**Label width 65–67% of the body — settled.** Narrower exposed more glass but weakened
the reading. Wider obscured the fragrance object and drifted toward beverage packaging.
(V1's 0.667 already agrees; it is now a decision rather than a measurement.)

## 3. THE SIX SYSTEMS ARE PHYSICAL, NOT DECORATIVE

The strongest idea in the study, and the one V1 has nothing about.

Six facets, cut into the glass: **two shoulder, two side, two heel.**

They must NOT appear as six bright lines or an obvious hexagon. They reveal themselves
only as the pointer changes the glass reflection. The metaphor is then discoverable
rather than announced:

> Six separate structures alter the light; together they define one vessel.

This is the correct way to carry "six marks" — subtler and more sophisticated than
adding six symbols.

## 4. GREEN MUST BEHAVE LIKE GLASS

Not a fill. **Transmission and refraction**, concentrated in thickness:

- darker at the **edges and heel** (where you look through more glass)
- clearer through the **centre**
- slightly **warmer near the base**
- **cooler** in isolated reflections

A uniformly green bottle looks painted or plastic. A bright outlined bottle looks like a
3D wireframe. **Botanical green** — V1's flat four-stop olive fill is the thing this
replaces.

## 5. "SEALED INTO THE MENU" NEEDS THREE DEPTH PLANES

1. the original menu surface
2. the bottle, **recessed behind** it
3. protective glass, **flush with the original surface**

The pane is visible only through a partial reflection and a lower-edge trace. The recess
uses **inner occlusion**, never a decorative external frame.

> This is the difference between a framed product image and an object physically built
> into the interface.

★ And it is why this belongs in the menu rather than beside it: **the original menu keeps
priority.** Preservation of the real main menu scored 9.8/10 in the study and is the
constraint most easily lost in implementation.

## 6. INTERACTION — the whole of it

**At rest.** Bottle recessed and still · six facets nearly invisible · cap closed · pane
reflection faint · the original menu retains priority.

**On hover or keyboard focus.**
- pane reflection moves a few pixels
- the six facets become **sequentially** perceptible
- green transmission increases slightly
- label contrast rises subtly
- cap separates **2–3px** from the brass collar

**On activation.**
- cap lifts **~7px**
- atomizer briefly exposed
- one restrained refracted trace passes behind the bottle
- the Birth Reading opens

**Explicitly not wanted:** idle bobbing, constant rotation, perfume cloud, decorative
particle field.

Note this satisfies the house motion law already on the books — nothing pulses, bounces,
jitters or repeats, and every listed move is transform/opacity.

## 7. THE STUDY'S OWN SCORECARD

| quality | score |
|---|---|
| core metaphor | 9.8 |
| original-menu preservation | 9.8 |
| gender neutrality | 9.7 |
| bottle silhouette | 9.5 |
| label authority | 9.5 |
| main-menu integration | 9.5 |
| fragrance recognition | 9.4 |
| glass/material character | 9.3 |

The object should read: welcoming without being soft or cosmetic · gender-neutral without
being anonymous · mysterious without occult cliché · luxurious without advertising ·
fragrance-related **without pretending the actual product is perfume** · valuable without
looking trapped or clinical.

---

## 8. WHAT THIS CHANGES FOR THE BUILD

| V1 said | V2 says |
|---|---|
| olive-gold fill, four vertical stops | botanical green by transmission, thickness-concentrated |
| cap 0.112 of bottle height | smaller and quieter; 0.112 is the ceiling |
| the six marks are label text | the six are also **facets in the glass** |
| a recess with a pane over it | **three planes**, pane flush with the menu surface |
| static exhibit | rest / hover / activation, with numbers |

Unchanged and still binding from V1: recess w/h **0.808**, body w/h **0.582**, the tiny
value range, the cream (not white) label, the asymmetric left/right edge highlights, ONE
upper-left gleam, and the label's eleven lines in their stated hierarchy.
