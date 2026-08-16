<!-- ═══════════════════════════════════════════════════════════════════════════════
     U1 — THE DEMONSTRATION.  `docs/U1_SHOWCASE_V1.md`  (v2, 2026-08-16)

     v1 of this file located the whole design on the wrong product and is replaced
     wholesale. Keep the lineage in mind when reading anything older:

       docs/U1_INTENT_V1.md    what U1 is FOR — the senior document, and the only one
                               with a DECIDED table. Nothing here may reopen that table.
       docs/U1_MOTION_V1.md    the builder's own sentence, the four beats, and the two
                               post-mortems added after the previous build was scrapped
       docs/U1_AUDIT_V1.md     the audit that killed the plate-and-paper concept
       docs/U1_LENS_PASS_V1.md five lenses over v1 — 5 blockers, 11 serious, 7 minor
       docs/U1_CONCEPT_V1.md   SUPERSEDED. Records a direction not taken.

     ★★ WHAT V1 GOT WRONG, because it is the thing most likely to recur. v1 said "the
     card" and pointed at `renderCard()` (app.js:550). That is the PHOTO card — photo
     overlays, foil and grain, `BR-SCN 01 · 4:5`, four stats about a photograph. It has
     no name, no date and no six marks, and app.js:3633 says its scan engine is not
     connected. v1 then asked that object to display the six marks, which belong to a
     different product entirely.

     The builder, asked plainly: "i want our birth reading product as a showcase in u1".
     So the subject is THE BIRTH READING, which ships, and whose six marks are the thing
     being demonstrated.

     ★ IT IS BOTH A DEMONSTRATION AND A SHOWCASE, and an earlier draft of this file got
     that wrong in the other direction. The builder: "its partly showcase too since we are
     showing reading panels, the colored perks of results. depth. detail."

     Correct, and `docs/READING_PANELS_V1.md:8-15` already rules it — ONE panel, two uses:

         the reading page   →  panel(the real reading)
         U1's tutorial      →  panel(the John Bon fixture)

     "The tutorial does not *depict* the product. It **is** the product, running on a
     fixture." So the panels on U1 — their colour, their depth, their detail — ARE the
     product on display, and showing them well is half the job.

     This does not collide with `docs/U1_INTENT_V1.md:105` ("The mechanism is the
     background, not an object" — "It's not a separate object"), and the distinction is
     worth stating because it is easy to lose. What is forbidden is a widget sitting ON a
     page, or merchandise on a pedestal. What happens here is that the page is MADE of the
     panels and they fill in place. The showcase and the demonstration are the same act:
     you are watching the real component fill with real values.

     `READING_PANELS_V1.md:68-69` — "the filling is a presentation of the panel, never a
     different panel."
     ═══════════════════════════════════════════════════════════════════════════════ -->

# U1 — THE DEMONSTRATION

*A candidate physical model, awaiting the still-frame test. It settles when one
actual-size frame — the field, one mark written, one derivation line, one passage — is
judged beside the Codex and the card and passes. Nothing in this document has been seen.*

---

## 1. JOB

**A stranger who has just arrived watches the archive take a name and a date and work out
six marks from them, and watches a reading form out of those marks — and understands,
without being told, what Blue Room does and what they would receive.**

One job. Not a map, not a roadmap, not a sales page, not a place to explain the joke.

---

## 2. LOCKED CONTEXT

**The product is the Birth Reading.** Six marks — Sun sign, Year animal, Life path, Rune,
Trigram, Hexagram — and the reading made from them. This ships. The photo card does not
yet (`app.js:3633`: the scan engine isn't connected), and U1 explains current products,
never coming ones (`docs/U1_INTENT_V1.md:98`).

**The main menu is unchanged.** Nothing above U1 moves, restyles or is replaced. U1 hangs
under M1 and you descend into it; that descent is the strongest fact about the surface.

**The mechanism is the ground, not an object.** This is a decided item and it governs
everything below. There is no hero standing on a pedestal. The page IS the mechanism,
from the two givens at the head to the record at the floor.

**The fixture is a worked example and is labelled as one.** John Bon, born 26 July 1965 —
already shipped and already labelled ("A worked example", `_u1-rack.js:239`). There is no
intake form, no engine call at page load, and no per-visitor state. This was ruled on
2026-08-16 (`docs/U1_MOTION_V1.md:54-64`) and is not reopened.

**ONE PANEL, TWO USES.** U1 renders the *same* reading-panel component the real reading
page renders — `docs/READING_PANELS_V1.md`. Not a copy, not a tutorial-shaped lookalike.
A tutorial built separately drifts the moment the reading changes, and drift in a tutorial
is a lie about what you are selling. This is the single most important structural
constraint on the build, and it is the reason U1 cannot be built before the panels are.

**What exists and what is new.** The six marks already have a face in the app —
`m2bface__marks`, `app.js:2996` — but it prints slot LABELS, not values. Rendering values
is new work. The reading engine is `arcana-reading.js`, which is **generated** by
`arcana-build/build_inapp.py` and must never be hand-edited; changes go through the
builder.

★ **THE TWO PRODUCT PAGES ARE NOT LOCKED.** The builder, 2026-08-16: *"tarot product page
and birth still need polishing, they are not completely lock in pages yet."* So U1 is being
designed against a moving target, and the order matters because of it: the panel is settled
on the reading page FIRST, and U1 adopts it. U1 must never fork the panel to get ahead, and
nothing here should be read as freezing either page's current state.

**Three states are locked:** at rest → deriving → arrived.

---

## 3. HERO

**The reading panels, filling.** One thing carries the surface, and it is both halves at
once: the *act* of derivation, and the *panels* it fills.

This is the architecture in `docs/READING_PANELS_V1.md`, and it is the whole idea:

```
    the reading page   →  panel(the real reading)
    U1's tutorial      →  panel(the John Bon fixture)
```

**The tutorial does not depict the product. It IS the product, on a fixture.** So the
panels here are not illustrations of panels — they are the same component a paying reader
receives, with the same colour, the same depth, the same detail. Showing them well is not
decoration on top of the demonstration; it is half of what U1 is for. A stranger has to
want the thing they are watching being made.

★ **And that is exactly why §6 has to hold.** A panel that looks authoritative makes a
stronger claim than a plain one. Polish is what let the false claims spread at BR-S500 —
they were believed because they appeared in shipped-looking strings. The better these
look, the harder the truth contract works.

★ **Object first, then fill it.** Not a container that receives content. That is the order
the Accord socket was built in and the order the scrapped U1 was not.

What is forbidden is a *separate* object: a widget sitting on a page, or merchandise on a
pedestal. The page is made of these panels and they fill in place — the mechanism stays
the ground, exactly as `docs/U1_INTENT_V1.md:105` decided.

---

## 4. PHYSICAL LAW

One law, and it is a place rather than an event.

**You are descending through the archive's own field. Behind everything stands the
corpus — every system Blue Room reads from, drawn at its true size. As you descend, marks
are struck out of that field and written into the record in front of you, and the systems
each mark came from light up behind it.**

That is all. Three consequences follow and nothing else is needed:

**THE FIELD IS THE GROUND.** Nine constellations, one per Codex system that holds
entries, at their real counts — 12 · 17 · 12 · 22 · 56 · 24 · 8 · 64 · 7 = **222 marks**.
Cluster size is the system's size. This is not decoration: the structure is the claim, and
it is the same mechanism `_m1-team4.html:108-182` already proves. **The field stands
still.** That file's own note explains why the drift was deleted — nine composited layers
for a ±26px translate over 46s that nobody can perceive, which also pushed clusters
outside their box. A standing corpus does not drift.

**THE FIELD ANSWERS WHAT YOU ARE READING.** While a mark is being derived, the systems it
actually draws from stand up out of the ambient dim, name themselves and take the mark's
own colour; the systems it does not draw from stay down. The Birth Reading lights six of
the nine bodies. That is the reading's composition, stated in the material, held for as
long as you look — and it is the answer to "which box am I reading, and what did it come
from", asked and answered without a caption.

**THE MARK TRAVELS.** When a mark resolves, it is struck out of its constellation and
lands in the record. The thing that arrives is visibly the thing that left.

Depth is legible because the field is behind and the record is in front. Progress is
legible because you can see how much of the field has been drawn from. Reversal is legible
because a mark that has been struck can go back.

---

## 5. THREE STATES

### AT REST

The field stands, dim and full. At its head, the two givens: **JOHN BON · 26 · 07 · 1965**,
with the worked-example label already beside them. Six mark positions wait, empty — framed
and named, so it is legible as *this* reading awaiting content rather than a blank.

Nothing loops. Nothing breathes. Nothing drifts.

*Proves: how little the archive is given, and how much stands behind it.*

### DERIVING

**Each mark writes itself out as you scroll.** This is the law that was missed last time
and it is the reason the previous build was scrapped — `docs/U1_MOTION_V1.md:210-214`:
*"The filling IS the demonstration… A box that arrives already full has shown them
nothing."* A mark that fades in complete has demonstrated nothing. The writing is the
thing the reader is watching.

For each of the six, in this order — Sun sign, Year animal, Life path, Rune, Trigram,
Hexagram (`_u1-rack.js:179-184`):

1. Its constellations rise in the field behind and name themselves.
2. The derivation line writes out — one line, compact, saying where the value came from.
3. The mark is struck from the field and lands in the record.
4. Its passage of the reading writes in beside it.
5. Everything rests, and stays rested until you move.

The rhythm is **causal, not simultaneous**. The derivation completes, then the mark lands,
then the passage follows — because it follows *from* it. The delays are small; they exist
so the eye reads *because* rather than *alongside*, and so the sequence makes sense
backwards.

*Proves: the marks were worked out, in this order, from those two givens — and the reading
is what the house made of them.*

### ARRIVED

The six marks stand written, the reading stands beside them, and the field behind shows
exactly which six of its nine bodies were drawn from. Nothing transforms into anything
else. One quiet way in — to the Birth Reading that actually ships — sits at the floor.

*Proves: this is a finished, kept thing, and you could have one.*

---

## 6. TRUTH CONTRACT

**Every value and every derivation line comes out of the reading engine, with its
verification attached. Not one typed digit.** This is the first thing built, before any
field, any motion, any styling.

`_u1-rack.js:178-185` currently holds the six as hardcoded string literals under a comment
claiming they are derived against the engine. They are not. That has already failed once:
at **BR-S500** four of the six rows were found inventing the **codex's** own keywords —
Snake printed "restraint", which is Hexagram 7's, two rows below on the same card
(`_u1-rack.js:160-177`). Hardcoding a keyword produced four wrong rows; hardcoding
*arithmetic* produces a tutorial that teaches a false derivation, which is the one failure
this design cannot absorb.

The engine is `arcana-reading.js`, **generated** by `arcana-build/build_inapp.py`. Do not
hand-edit the generated file.

**One position on provenance, held in every sentence: nothing here was chosen.** Everything
follows from the two details given. Some marks are computed or looked up from the date —
Sun sign, Year animal, Life path. Others are drawn deterministically from the seed the name
and date form together — Rune, Trigram, Hexagram. Both kinds are fixed the moment the
details are given. Neither is described as checkable, unarguable, or more true than the
other, and the line beside each mark says which kind it is in that mark's own words.

★ **Known defect, and it constrains what may be claimed.** `arcana-reading.js:35-38`
records that rune, trigram and hexagram come off the same hash and were skewed the same
way — the rune effectively determines the trigram. Until that is fixed, U1 must not present
those three as independent draws. Say "drawn from the same seed", which is true.

---

## 7. INTERACTION CONTRACT

**Scroll is the clock.** Every value is a pure function of scroll position — never a
time-keyed stagger, never a `setTimeout` anywhere in the writing's path. The reader drives
it, can stop, reverse and re-watch any beat.

★ **Do not reuse the develop beat as-is.** `reveal/card-frame.js:123-128` is a
`setTimeout` chain (`ddur=3550`, `pipT0=3486`) with no reverse. Its *visual* treatment can
be re-authored on the position scalar; its timing machinery cannot come along.

★ **Do not revive the page checkpoints.** They were deleted on instruction at BR-S457
(`app.js:5101`). Stepping here lives inside U1 and rides `_u1GlideTo()`; `_u1Seat()` is
untouched.

**Rest is created, not assumed.** Around each completed mark the scroll-to-progress mapping
flattens into a plateau, so ordinary scrolling comes to a readable stop there instead of
requiring restraint. Plateaus slow the descent; they never capture the page or fight the
input.

- **Flick** — runs through the plateaus and settles at the nearest when input ends.
- **Pause mid-write** — holds exactly where it is, still. A half-written mark is a
  legitimate frame and must be legible as one.
- **Reverse** — symmetric. Marks unwrite in reverse order and return to their
  constellations; a passage retracts before the mark it depended on.
- **Keyboard** — ↓/↑ step between plateaus, inside U1 only.
- **Touch** — identical mapping; the plateaus do the work.
- **Resize** — progress is a fraction, so state survives. Geometry is `svh`/`dvh`-first,
  because mobile URL-bar resize already forced that once (`_u1-rack.js:52-55`).
- **Reduced motion** — read `BRMotion.prefersReduced` (`data.js:16-21`), **not**
  `matchMedia` directly, so the Settings override is honoured. It quantises progress to the
  plateau index: same six marks, same derivations, same order, arriving complete and
  stepped. It is never simply disabled — the sequence is the content.

---

## 8. NARROW

The two-track relationship — derivation and passage in one frame — has no room below about
1200px, and v1 did not notice. Stated now:

**Wide:** the record runs in the centre, the passage in the margin beside it, the field
behind both.
**Narrow:** the passage moves **under** its mark rather than beside it. Same order, same
causality, same plateaus — the pair becomes vertical instead of horizontal. The field
thins to fewer, larger clusters rather than shrinking 222 marks into illegibility.

The field is never allowed to overlap reading text at any width.

---

## 9. HANDOFF

One way in, at the floor: to the Birth Reading that ships. It is a link, plainly worded,
in the house register.

★ **No promise the product cannot keep.** U1 must not offer a mint, a serial, a record
button or a scan-code control. Those handlers refuse outside the room (`app.js:7045`,
`:7088`), two of them are inert spans (`app.js:632-633`), and the photo product they belong
to is not connected. A door that does not open is worse than no door.

---

## 10. WHAT HAS TO BE BUILT, IN ORDER

0. **The reading panel itself, on the reading page** — `docs/READING_PANELS_V1.md`. U1
   renders that component; it cannot be built before the component exists, and the two
   product pages are still being polished. This is genuinely step zero, not a dependency
   to work around.
1. **The engine wiring.** Six real values and six real derivation lines out of the reading
   engine, replacing `_u1-rack.js:178-185`, with a test that fails if they drift.
2. **The still frame.** One actual-size frame: the field, one panel filled, its derivation
   line, at rest. Judged beside the Codex and the card before anything moves.
3. **The recess, PORTED — not reused.** `_m2-accord.js/.css` cannot be reused as they
   stand: flag-gated (`:44`), mounted to M2's slot only (`:134`), a singleton (`:175`),
   `aria-hidden` (`:178`), with **zero** scroll, pointer, touch or IntersectionObserver
   handlers — no motion driver at all. And `build_public.py:263` puts both on `DEV_ONLY`,
   with `:333-335` asserting them absent from preview *and* live. Take the depth treatment
   into a U1-owned file with its own mount, and add that file to `build_public.py`'s tier
   list and `PROBES` on the commit that mounts it. The geometry must also be re-sized for
   its occupant — the Accord's box is aspect-locked at 0.808 with `overflow:hidden` and
   would clip a record.
4. **The field**, from `_m1-team4.html:108-182`, standing still, at real counts.
5. **The writing**, scroll-driven, on one scalar.
6. **Narrow**, then reduced motion, then the door.

---

## 11. TERMS

Used precisely and always the same way.

- **The field** — the standing corpus behind everything. Nine constellations, 222 marks.
- **A constellation** — one Codex system, drawn at its true entry count.
- **A mark** — one of the six the Birth Reading produces.
- **The derivation line** — the one compact line saying where a mark came from.
- **The passage** — the piece of the reading that mark produces.
- **The record** — the six marks and their passages, standing complete at the floor.
- **Progress** — the single scalar, a pure function of scroll, that drives everything.

---

## 12. KILL CRITERIA

Reject this direction if any is true of the still frame, judged at actual size:

- **It weakens the front door.** If the eye goes to U1 before M1, it is too loud.
- **It reads as a sales page.** If the finished reading looks like merchandise on a
  pedestal rather than a demonstration that finished, the register is wrong.
- **It needs explaining.** If a viewer must be told what the field is, or why marks are
  moving, the one law has not landed and no amount of motion will rescue it.
- **A box arrives already full.** That is the failure that scrapped the last build. If the
  writing is not the thing being watched, it has failed regardless of what it measures.
- **It is the weakest thing on the shelf** beside the Codex chamber and the card.
