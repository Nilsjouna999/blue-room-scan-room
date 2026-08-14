# THE SURFACE BRIEF — every place, what it is, and why it exists

**Draft v1, 2026-08-14.** Written because a door fleet was fired without it and would have
invented the house around the door. Stopped before it built anything.

This is the document any layout or navigation fleet reads FIRST. `ATLAS_GENERATED.md` says
what exists; `POSITION_MAP_V1.md` says what the three KINDS of surface are for; this says
what each individual place is and why.

> **NEEDS YOU** marks a line I could not establish from the code and should not invent.
> **ASSUMED** marks my reading — plausible, and the first thing to correct.

---

## ★★★ PART 0 — THE HOUSE REGISTER, and it governs every surface

**Builder, 2026-08-14, on the offer box — then immediately: "the whole page and blueroom
universe should tend to that liner."**

> **It should feel like it is holding your excitement, in knowing reassurance that it will
> deliver.**

★ **READ IT AS A MATERIAL LAW FIRST, NOT A COPY LAW.** It was said immediately after
"that burrowed design was wack" — it is describing how the thing should FEEL AND LOOK, and
the words are downstream of that. I filed it as a tone note on first pass and that was the
wrong half. What must hold your excitement is the OBJECT: its weight, its stability, the
way it sits and the way it moves.

**WHAT IT MEANS IN MATERIAL TERMS**

| It must feel | It must never feel |
|---|---|
| **Solid** — enough mass that it looks like it could take the weight of what it promises | Thin, glassy, fragile, provisional |
| **Steady** — settled where it is, in no danger of moving | Hovering, drifting, precarious, about to be dismissed |
| **Unhurried** — generous spacing, nothing crowded against the act | Tight, packed, efficient, transactional |
| **Warm at the point of commitment** — the gold act is the held excitement | Cold, clinical, grey, or shouting |
| **Motion that settles** — anything that moves comes to rest and stays | Anything that pulses, bounces, jitters, or repeats |

★ **Why the burrowed version failed even though it was aiming at exactly this.** Sinking
the object into the page was an attempt at solidity and reassurance, and the shading was
correct — but reassurance is not the same as *disappearing into the background*. A thing
that has sunk in is no longer being handed to you; it has become part of the wall. Holding
requires the object to still be PRESENT and OFFERED. Weight, not burial.

**And then, downstream of the material, the words follow the same rule.** It rules out
*both* of the registers a page normally reaches for.

**NOT URGENCY.** No scarcity, no countdown, no "only today", no nudge. A visitor who is
already leaning in does not need pushing, and pushing them says the house is worried they
will leave. Excitement is theirs; the house's job is to *hold* it, not to manufacture more.

**NOT DEFENSIVENESS EITHER, and this is the subtler failure.** The first version of the
offer box read *"no account, no photo, nothing owed"* — every line answering *what could go
wrong*. But a visitor who is excited is not asking that question yet, and answering it puts
the doubt in their head. Reassurance-by-denial is anxiety wearing a helpful face.

**WHAT IT IS INSTEAD: state the delivery as a thing already settled.** What arrives, how
soon, and that it stays — said plainly, in the present tense, with no hedge and no
flourish. *"Read the moment you give the date. Yours from then on."* Certainty is the
reassurance. Calm is the proof.

★ **The test for any sentence on any surface:** does it steady the reader, or does it work
on them? Working on them includes exciting them further. A house that is sure of what it
delivers does not raise its voice, and does not apologise in advance.

**Where this shows up in what already exists**, so it is not an abstraction:
- the door's claim — *"Two hundred and twenty-two marks are kept here. Six of them are
  already yours."* Two facts, no adjectives, and the reader supplies the excitement.
- *"Nothing is drawn here — each mark is looked up, and read as it stands."*
- *"Drawn once. Not reissued."*
- *"if it is over your means even slightly, I don't want it."*
- ★ and the strongest one, which is a mechanism rather than a sentence: showing the real
  engine output instead of describing it. Certainty demonstrated beats certainty claimed.

★ **The failure mode to watch for** is that calm becomes cold. Holding excitement is not
the same as damping it — the gold act, the one lit object, the specimen in full are all
warmth. The register is *steady and warm*, not *quiet and distant*.

---

## PART 1 — THE NAVIGATION AND SPACE SYSTEM

This is the part that does not exist anywhere today, and its absence is why every previous
fleet invented its own. **Direction means something. Write it down once and every future
surface knows where it goes.**

### The track as built

```
              U1  — beneath M1, #about
               ^
               |
   L1  <—  ·  M1  ·  —>  M2
 the desk    HOME      the Profile
 (sealed)   the door    face
```

- **Horizontal is SIBLINGS.** Panels at the same rank. Arrow keys move between them, and
  the movement is reversible and cheap. `MENU_PANELS` in `app.js`.
- **Vertical is DEPTH.** Down from M1 is *more about this place*. The first downward notch
  becomes a 934px glide (`app.js:4749`), so down is a discrete move, not a scroll.
- **M1 is HOME.** `MENU_HOME` is 1, not 0. A refresh returns here. L1's hash is `null` —
  it has no address, deliberately, so it cannot be linked or landed on.
- **Rooms are ADDRESSES, not panels.** `/tarot/`, `/reading/`, `/profile/`, `codex.html`.
  You LEAVE the track to enter a room, and the back button returns you.

### ★ THE PLACEMENT RULE — proposed, needs your ruling

The Atlas's own supreme test is *things be where you think they be*. That requires a rule
for where a NEW thing goes, and there isn't one. Proposed:

| If it is… | It goes… | Because |
|---|---|---|
| a thing you DO (a product, a reading) | a room, at a real address | it has a beginning and an end, and you come back out |
| a thing you HAVE | the Profile | ownership has one home |
| a thing that EXPLAINS this place | down from M1 (U1) | depth, not sideways |
| a thing that LISTS what exists | the hub — **undecided**, see §2.9 | |
| a thing you ADJUST | Settings, reached from anywhere | it is not a destination, it is a drawer |
| a thing not built yet | the Roadmap, by horizon | naming it is not promising it |

★ **NEEDS YOU:** is this the rule? It is the single highest-leverage sentence in this
document — every future surface's position falls out of it, and without it every fleet
re-argues placement from scratch.

### The space rules that already hold

- **M1 is one screen.** Nothing below its fold is reachable in either direction.
- **The bottom ~80px is chrome** — the exits rail — plus two fixed orbs at the right.
- **1199px collapses to one column.** Phones may have their own design (see the split
  clause in `LAYOUT_LENSES_V1.md`), but the collapse seam is here.
- **Nothing on a panel may consume the arrow keys or the wheel.**

---

## PART 2 — EVERY SURFACE

### 2.1 M1 — THE MAIN MENU / THE FRONT DOOR
**State:** open · **Address:** site root · **Kind:** door

What it is: the first thing anyone sees. What it is FOR: say what this place is, recommend
the Birth Reading, offer the free Sitting as a taste, and give one way to the house.
**Success test:** a stranger can say what this place is after five seconds and knows what
to do next. **Failure mode, observed:** becoming a product page — it currently sells two
readings, which is a different surface's job.

### 2.2 THE BIRTH READING — the main product
**State:** open · **Address:** `?dev=arcane`, `/reading/` · **Paid**

Six marks you were *given* rather than chose — sun sign, year animal, life path, rune,
trigram, hexagram — read together into one crowned name. Nothing is drawn; each mark is
looked up. **Its claim, and the reason it is the main product:** the same name returns
tonight and in ten years. Tarot structurally cannot say that. **The builder's ruling
2026-08-14:** this is the main product and the recommended step.

### 2.3 TAROT — the free way in
**State:** open · **Address:** `?dev=drawing-room`, `/tarot/` · **Free first**

A Sitting: three cards to one question, the first free. Or the Deep Read: five. What it is
FOR: the only thing on the site a stranger can complete at no cost — the entry, not the
destination. **ASSUMED:** its job is to make someone a reader so the Birth Reading has
someone to recommend itself to.

### 2.4 THE CODEX
**State:** open · **Address:** `codex.html` · **Free** · Generated by `build_codex.py`

222 marks across nine systems, every entry a real place with an id. What it is FOR, on
three levels: the reference (what does this mark mean), the proof of scale (this is how
big the archive is, shown rather than claimed), and the credibility (a stranger who opens
it stops wondering whether this was made carefully). **It is also the best-made surface in
the build** — when a layout question is contested, the Codex's grammar is the house answer.
**Drawn, not built:** *The Codex, opened by your reading* — buying a reading unlocks your
entries. One bank shared between reading and reference; the strongest retention idea in the
registry.

### 2.5 YOUR PROFILE — and 2.6 THE SHELF
**State:** open · **Address:** `?dev=profile`, `/profile/`, and M2 by slide · **Free**

★ In the registry these are ONE thing: the room key is `shelf` and its name is "Your
Profile". **NEEDS YOU: are they one surface or two?** Two readings are possible and they
lead to different designs:
- **One surface.** The Profile *is* your shelf — what you own, plus who you are.
- **Two.** The Profile is identity and settings-adjacent; the Shelf is the objects. A
  separate drawn room, *"Your shelf, on any screen"*, exists for cross-device persistence,
  which suggests the shelf is at least a distinct concept.

What it is FOR either way: a members' page. Everyone on it has already arrived, so **it
never has to sell.** Its hardest state is having nothing yet — see `docs/EMPTY_FRAME_V1.md`.

### 2.7 THE FORGE — the card mint
**State:** drawn (designed, room does not exist) · `?view=room` · **ASSUMED free to enter**

Where a reading becomes an object you hold. Renamed from "the Card Mint" at BR-S406 because
*mint* is the industry's word, not a person's. **NEEDS YOU:** is the Forge a room you visit,
or a moment inside a reading? That decides whether it is a destination or a ceremony, and
the two are designed completely differently.

### 2.8 SETTINGS
**State:** open · **Address:** `?dev=settings` · **Free**

★ **The one surface in this list with no stated purpose anywhere in the repo.** It has a
palette of its own (`--st-danger`), which means it holds destructive actions.
**NEEDS YOU:** what is a person doing here? Candidates: clearing what is kept · reduced
motion and display · what the site remembers · deleting a reading. Under the placement rule
above it is a drawer rather than a destination — reachable from anywhere, never somewhere
you go.

### 2.9 THE ROOMS / THE HUB
**State:** ★ **does not exist as a destination.** `ROOMS` is a nine-entry array in
`app.js:1453` read by `u1Public()` and by the Roadmap.

What it would be FOR: show the shape of the house. **Failure mode, learned expensively:**
becoming a vacancy notice — depicting rooms that do not exist reads as a building site, and
the line between *reserved* and *abandoned* is COUNT. **DELIBERATELY OPEN** (builder,
2026-08-14): the room structure is not set, so whether the hub is its own surface or stays
U1's job cannot be decided yet. Consequence: **the door must not depend on the answer** —
its exit to the house is one re-pointable link.

### 2.10 U1 — beneath M1
**State:** open · **Address:** `#about`

Reads the same `ROOMS` registry by horizon — open · being made · drawn up · named only.
The builder rates this content. What it is FOR today: explain the place and show what is
coming. ★ It is currently doing part of the door's job and part of the hub's job, one
movement below the door where only someone who tries down will find it.

### 2.11 ABOUT BLUE ROOM & FEEDBACK
**State:** open, cut from the public builds · `?dev=vision` · plus `/about/`

A draft VISION text, an idea/change/bug form, and a donation block carrying the line *"if
it is over your means even slightly, I don't want it."* Both the form and the donation
currently land nowhere — `POST_TARGET` is `null` (`app.js:1728`) and submission is blocked
deliberately. **NEEDS YOU:** is this one surface or two? *About* is something a stranger
reads; *feedback* is something a user does. They have different audiences and only share a
page today.

### 2.12 L1 — THE DESK
**State:** open, sealed · left of M1, no address

The photo card, behind a coming-soon preview since BR-S400. Parked on purpose: the front
door stopped selling a card nothing can mint. **Do not design for it** until the Forge and
the card are back on the table.

---

## PART 3 — FUTURE POSSIBILITIES

**Why this is in the brief and not in a wishlist.** A design that fits today and breaks at
the third product is a design that has to be thrown away, and no lens can catch that
without knowing what is coming. The GROWTH lens tests against THIS list. Nothing here is a
promise; status says how real each one is.

| Possibility | Status | What it would be | What it strains |
|---|---|---|---|
| **The Codex, opened by your reading** | drawn | Buying a reading unlocks your entries in the Codex — one bank shared between reading and reference | the Codex's shape: it becomes personal as well as canonical |
| **Your shelf, on any screen** | drawn | Holdings that survive a device change | ★ backs *"everything read here is yours to keep"* — the founding promise, currently unbacked |
| **The Forge** | drawn | A reading becomes an object you hold | whether the Forge is a room or a moment (§2.7) |
| **The photo card** | parked at L1 | The original product, sealed behind a preview | returns only when the Forge and minting exist |
| **Love & relationship readings** | vision | A cluster of pages *and* products, not one room | the two-product hierarchy — a third product breaks the recommend-one door |
| **The tools page** | vision | Where the wheels live — the compass, the spin wheel, the instruments | a room that is neither a product nor a reference. The placement rule has no slot for it yet |
| **Social games** | vision | Drinking / bottle / question games where **the unit is a GROUP, not a reader** | everything: the whole build assumes one person at one screen |
| **Rarity / multi-form** | vision, research deferred | Objects that differ in kind, not just content | the Profile, the Forge, and what "yours" means |
| **Growth by gift** | vision | Object-keyed sharing; the encounter is the unit | the share-safe record page — a primitive that does not exist |
| **The many doors** | vision | Many entry points into the universe, not one front door | ★ directly contradicts a single main menu. Worth resolving before the door is built twice |
| **The Roadmap as its own destination** | decided, unbuilt | Found from the hub, because discovery is the hype | the hub question (§2.9) |
| **The three-tier build** | law, unimplemented | dev = everything · preview = coherent · live = masterclass only | which surfaces exist at all in the public build |

★ **The two that most constrain a main-menu design:**
1. **A third product.** The door currently recommends one of two. Love readings, or any
   third product, turns a recommendation into a ranking. A door that can only hold two is
   a door with a hidden cap — the GROWTH lens should ask every candidate what happens at
   three, and at six.
2. **The many doors.** ★ **RULED, builder 2026-08-14: "at early gates it's only entrance."**
   The many-doors idea is a later universe's problem. Today M1 is the sole way in, and the
   consequence runs the other way from what I assumed — being the only entrance does not
   narrow the door's job, it *widens* it. **Nothing else introduces this place to a
   stranger.** If M1 does not say what Blue Room is, no other surface will, because there
   is no other surface a stranger arrives at. The door carries the whole introduction.
   Design it that way, and do not design *around* a many-doors future that has no date.

---

### ★★ THE ONE STRUCTURAL ADVANTAGE OVER EVERYWHERE ELSE — "OURS KEEPS"

**Builder, 2026-08-14:** *"one of our products or leverage to other places — ours keeps in
the shelf, each reading accessible and more info about them, and the panels too in future."*

Everywhere else a reading is a thing that happens to you once and is gone the moment you
close the page. Here it is **filed**, and three things follow that no competitor can copy
without building an archive first:

1. **It stays.** The reading sits on the shelf, whole, and opens again in a year to the
   same six marks and the same name.
2. **It is reachable, not just stored.** Each reading is a place you can return to, which
   is what makes the Profile a members' page rather than a receipt drawer.
3. ★ **It gets DEEPER rather than staler.** The marks in a reading are real Codex entries,
   so as the archive is written further, the thing already bought opens further with it —
   more on each mark, and in time the panels that read them together.

**Why this is the leverage and not a feature.** Every other reading service sells a moment.
This sells an object that appreciates. It is the commercial argument for the Codex, the
reason the shelf must survive a device change, and the answer to "why buy here."

★ **It must not be a subordinate clause.** On the first build of the reading page it
appeared as *"and the record kept on your shelf"* inside a facts table — which is where a
detail goes, not where the reason to choose this goes. It now has its own section, stated
before any price. Any surface that mentions buying should carry it at the same weight.

Depends on: *Your shelf, on any screen* (drawn) and *The Codex, opened by your reading*
(drawn) — see PART 3. **Until those two ship, this advantage is claimed and not delivered.**

---

## PART 4 — THE AUDIT TABLE — what every lens needs, per surface

**This is the clarity that lets a fleet audit across many lenses without re-deriving the
house each time.** Every lens reads this table for the surface it is judging.

| Surface | Kind | Audience | Money | State | Must be true | Must never happen |
|---|---|---|---|---|---|---|
| **M1** | door | stranger | none | open | a stranger can say what this place is in 5s | becomes a shop or a catalogue |
| **Birth Reading** | product | reader deciding | paid | open | the same six marks return in ten years | reads as drawn rather than given |
| **Tarot** | product | curious stranger | free first | open | the first Sitting is genuinely free and complete | the free thing feels like a demo |
| **Codex** | reference | anyone, any depth | free | open | every mark is a real place with an id | becomes a marketing surface |
| **Profile / Shelf** | members | someone who has arrived | free | open | what is yours is visible and yours | it sells anything |
| **The Forge** | ? | a buyer, mid-flow | ? | drawn | a reading becomes a held object | industry language returns |
| **Settings** | drawer | someone adjusting | free | open | destructive actions are unmistakable | it becomes a destination |
| **Hub / Rooms** | hub | anyone orienting | free | none | shows scale honestly | depicts rooms that do not exist |
| **U1** | depth | a curious stranger | free | open | explains the place, one move from the door | duplicates the door's job invisibly |
| **About / Feedback** | ? | stranger / user | donation | open, cut | says what this is for, honestly | asks before it has given |
| **L1** | parked | — | — | sealed | stays sealed | is designed for now |

★ A lens that cannot find what it needs in this table should say so rather than invent it.
**A missing row is a finding.**

---

## PART 5 — WHAT A FLEET MUST BE TOLD, EVERY TIME

Any layout or navigation fleet gets, without exception:

1. **This file**, so it does not invent the house.
2. **The one surface it is designing**, and its success test from Part 2.
3. **The placement rule** from Part 1, so it puts new things where they belong.
4. **What is deliberately open** — the hub, the shelf question, the Forge's nature — with
   the instruction that a design depending on an open question is a design that will be
   rebuilt.
5. **The palette is closed**, the track is fixed, M1 is one screen, nothing eats the arrow
   keys.

---

## PART 6 — THE REST OF THE BUILD, so nothing is a surprise later

Not surfaces a visitor stands in, but real things that constrain any design and were not
named in the walk-through above. A fleet that meets these for the first time mid-run
guesses.

| Thing | What it is | Why a layout fleet needs to know |
|---|---|---|
| **The Roadmap** | `/roadmap/` — renders the same `ROOMS` registry by horizon | the only place a visitor can currently see the nine rooms. Any hub design overlaps it |
| **The three-tier build** | `dev` = everything · `preview` = coherent · `live` = masterclass only. Written in `build_public.py`, unimplemented | a surface may exist in one tier and not another. Designing for "the site" is ambiguous |
| **The public gate** | a deny-list that fails both outputs, 101 hits — dev nav, dev-route links, tuning params | the true launch blocker. Nothing ships past it |
| **The reveal** | `reveal/` — the develop ritual, and the only true blues in the system | its palette is deliberately separate; do not unify it |
| **The wheels** | the compass wheel, the spin wheel — built, homeless | they want the tools page (§3). Until it exists they have nowhere to be |
| **The arcane reading** | `?dev=arcane` intake → `?dev=arcana-reading` result, generated by `arcana-build/` | ★ `arcana-reading.js/.css` are GENERATED — never hand-edit them |
| **The Concord** | the decided commerce/ownership doctrine, and a room | what "owning" a reading means legally and emotionally |
| **The copy** | the live words are placeholder-grade by the builder's own call | do not treat shipped strings as authored. A door may write its own |
| **The membrane** | the codex's one named constraint — a living line at 0.955H | the only hard geometric contract in the build |
| **Paused work** | Archetype (mockups only), Aura (shipped as named air) | do not revive the old residue-mark theory for Aura |

★ **If a fleet needs something that is not in this document, that is a finding to report,
not a gap to fill with an assumption.** Every invented fact in this build has cost a
session.

---

## THE OPEN QUESTIONS, gathered

| # | Question | Blocks |
|---|---|---|
| 1 | Is the placement rule in Part 1 correct? | every future surface's position |
| 2 | Profile and Shelf — one surface or two? | the members' page design |
| 3 | Settings — what is a person doing there? | whether it is a drawer or a room |
| 4 | The Forge — a room, or a moment inside a reading? | destination vs ceremony |
| 5 | About and Feedback — one page or two? | who each is written for |
| 6 | The hub — its own surface, or U1's job? | *deliberately open, do not force* |
