<!-- ═══════════════════════════════════════════════════════════════════════════════
     U1 SHOWCASE — the stabilised sheet.  `docs/U1_SHOWCASE_V1.md`

     THIS REPLACES `docs/U1_CONCEPT_V1.md`, which is superseded and carries a banner
     saying so. Read `docs/U1_AUDIT_V1.md` for why.

     The short version: the previous sheet invented a new object language — a machined
     plate, cut slots, a paper sheet, a wet meniscus, detached tiles, a fold, a wax seal —
     instead of refining the container that was already agreed. The audit named that as
     the reason the surface kept starting over, and locked the direction: a RECESSED
     SHOWCASE added around the REAL Blue Room card, main menu untouched.

     Produced by a deliberately SMALL fleet — 3 readers, 2 drafts, 1 kill gate, 1 synth —
     because the audit's own finding was that fourteen agents produced argumentative
     density rather than quality, and a design carrying defensive machinery against every
     past criticism is a reactive design. Fewer surviving intentions, not more defeated
     alternatives.

     ★ THE TITLE IS THE AUDIT'S INSTRUCTION AND IT IS LOAD-BEARING. This is a CANDIDATE
     awaiting a still-frame test, not a settlement. The last sheet called itself settled
     while admitting nothing in it had been seen, and that is how a visual hypothesis gets
     mistaken for a decision. Nothing here has been seen either.
     ═══════════════════════════════════════════════════════════════════════════════ -->

# U1 SHOWCASE — candidate physical model for the still-frame test

*This settles when one actual-size still frame — the Blue Room surface, flush glass, the genuine card at depth, one mark resolved, one compact derivation visible — is judged beside the Codex and the card, and passes.*

## 1. JOB

A visitor should understand, without being told, that they are looking into a recess in the Blue Room surface where a real card is being derived from what they supplied — and that the card they are watching is the card they will get.

## 2. LOCKED CONTEXT

The main menu is unchanged. Nothing moves, nothing is restyled, nothing is replaced. The showcase is added beneath it and inherits its surface.

The card is the existing card — `renderCard()`'s article, its halo vars, its plate and corner marks, its photo overlays, its titleblock, its four stat rows with their pips and tier words, its mintstrip. Its controls and effects stay live. No substitute, no simplified stand-in, no second render path.

The container is the Accord's three-plane recess already built in `_m2-accord.js` / `_m2-accord.css`: an aspect-locked box with one clipping boundary and one stacking context; a wall made by value falloff toward the edges rather than by any drawn frame; a single implied light pooling low; and a pane that is nothing but faint overlays sitting flush with the surrounding surface. U1 reuses that shell and swaps the object in the slot. It does not build a new system.

Three states are locked: **at depth**, **deriving**, **available**.

## 3. HERO

The card. One object carries the entire experience. Everything else in the recess exists to light it, hold it, and record what has resolved on it.

## 4. PHYSICAL LAW

There is one law, and it is a place rather than an event.

**The Blue Room surface has a recess in it. The card sits at the back of that recess. Glass is set flush into the surface across the opening. A fixed light sits in the chamber and does not move. A reading plane travels through the chamber, from the back toward the glass.**

That is all. The recess is made from the inside — the chamber falls away toward its edges, so the corners sit further back, and no border is ever drawn. The glass is proven only by the way the surface's own reflection continues across the opening without a lid, a bevel, or a thickness. The card is behind it, smaller than life, further away than the menu.

Everything the showcase needs to say is said by that one moving plane. It is the shared clock. When it passes a mark's position on the card, that mark resolves. When it reaches the lip of the recess, it crosses the seam into the surface margin and the interpretation settles there. The plane is light in a chamber — something the card and the margin around it can both plausibly receive. It is never a substance, never applied to the card, never wet, never absorbed.

The rest follows from that. Depth is legible because the light is fixed and the plane moves through it. Progress is legible because you can see where the plane is. Reversal is legible because a plane that has passed a position can pass back over it.

## 5. THREE STATES

**AT DEPTH.** The card is at the back of the chamber, quiet and small. The name and the date are legible on it. The six mark positions are present and empty — the frames exist, the values do not, so the card is unmistakably *this* card awaiting content rather than a blank. The room stays dominant; the recess is a detail in the surface, not a stage. Nothing loops. Nothing breathes. *What it proves: the object is already there, and it is already this person's.*

**DERIVING.** The reading plane travels forward through the chamber. Marks resolve one at a time, in the order the plane meets them — a mark and, at the same height in the margin, the compact line saying what it came from. The card accumulates them; there is no second object and nothing leaves the card. Each mark holds a readable rest before the plane moves on. When the plane reaches the lip, it crosses the seam, and only then does the interpretation settle in the margin — the sentence follows the derivation because it follows *from* it. Then both come to rest. *What it proves: this reading was derived, in this order, from those inputs.*

**AVAILABLE.** The card advances toward the glass and the light on it changes as it comes forward. Its own controls activate — the mintstrip, the buttons, the existing `CardFrame` modes. The showcased object becomes the usable object; nothing transforms into anything else. *What it proves: the thing you watched being made is the thing you can now have.*

The existing `BRReveal` stage controller and `CardFrame`'s mode crossfade already implement a develop-and-settle beat of this shape. Reuse that beat as the reading plane's arrival rather than authoring a second one.

## 6. TRUTH CONTRACT

Every value shown on U1 comes out of the reading engine, at build time or run time, with its verification attached. Not one typed digit. This is the first thing built, before any container work — `_u1-rack.js:178-186` currently holds a hardcoded literal array for a fixed sample person and has already drifted from the engine once.

Where a fictional person is used to demonstrate the surface, that person is identified as a sample on the surface itself, plainly, in the same register as everything else.

One position on where the values come from, held in every sentence: **nothing here was chosen.** Everything follows from the details supplied. Some values are computed or looked up from the date — the sun sign, the year animal, the life path. Others are drawn deterministically from the seed the name and date form together — the rune, the trigram, the hexagram. Both kinds are fixed the moment the details are given, and the line beside each mark says which it is in the mark's own words. Neither kind is described as checkable, unarguable, or more true than the other.

## 7. INTERACTION CONTRACT

Any position can be reached from either direction and looks the same on arrival. Motion is bound to position, not to elapsed time: the reading plane's position in the chamber is a function of scroll offset. There is no autoplay, no ambient loop, no typing effect.

Because it is position-based, it is fully reversible: scrolling back moves the plane back, and marks return to unresolved in reverse order. The interpretation retracts across the seam before the marks do, because it depended on them.

Rest is created, not assumed. Around each resolved mark the plane's mapping flattens into a plateau, so ordinary scrolling naturally comes to a readable stop there instead of requiring restraint. The plateaus are soft — they slow the plane, they never capture the page or fight the input.

- **Flick:** the plane runs through the plateaus without stopping and settles at the nearest one when input ends.
- **Pause mid-transition:** the plane holds exactly where it is, completely still. A half-resolved mark is a legitimate frame and must be legible as such.
- **Reverse across a boundary:** symmetric with forward. The same crossing, the same order, backwards, with no re-entry animation.
- **Keyboard:** up and down step between plateaus, matching the existing checkpoint behaviour — one press seats one mark.
- **Touch:** identical mapping; the plateaus do the work, and the recess never captures the page scroll.
- **Resize:** the plane's position is expressed as a fraction of the chamber, so the state survives a resize unchanged. The recess reflows with the surface; the card's fractional geometry is unaffected.
- **Reduced motion:** the same three states, the same marks, the same derivations, in the same order, stepped. Each state appears fully formed on advance, with no travel between them. It is never simply disabled — the sequence is the content.

## 8. HANDOFF

When the plane has crossed the seam and both sides are at rest, the card advances toward the glass. That advance is the handoff, and it is the only thing that happens: the card's own controls come live in place — the mintstrip stamp, the serial, the record button, the scan-code control — using the same controls, the same handlers, and the same treatment gating as everywhere else in the product. Nothing is copied, re-rendered, or promoted into a new record. The recess does not open, the glass does not lift, the card does not exit the chamber. It comes forward to the near side and stays there, actionable.

## 9. KILL CRITERIA

Reject this direction if any of these is true of the first still frame, judged at actual size beneath the real menu and beside the Codex and the card:

- **It weakens the main menu.** If the eye goes to the recess before the menu, or the menu reads as decoration above a feature, the showcase is too loud and the direction is wrong.
- **It disguises the card.** If the card reads as an illustration, a mockup, or a different object than the one the product sells, the hero has been lost.
- **It needs explaining.** If a viewer has to be told which surface is in front, what is glass and what is card, or why the card is small, the one law has not landed and no amount of motion will rescue it.
