# THE HOUSE SHAPE — the room pass

**The pass §7 of `POSITION_MAP_V1.md` asked for:** the registry, the Roadmap and U1 read
side by side by one person until the shape is obvious. No fleet. Done 2026-08-14 against
`5f579a3`, reading `app.js:1453` (ROOMS), `app.js:2159-2284` (U1), `build_routes.py:25`.

> This file proposes a shape and is meant to be argued with. Everything in PART 1 is
> measured from the code and is not opinion.

---

## PART 1 — WHAT IS ACTUALLY THERE (measured)

### The registry is 15 entries, and the Atlas only knows about 9

`tools/build_atlas.py:77` reads `src[i:i + 6000]` from `const ROOMS = [`. The registry is
longer than 6000 characters, so the generated Atlas stops after `unlock` and silently
drops **`name` · `share` · `tools` · `table` · `two` · `unlit`** — the entire far half of
the forward view.

★ This is worse than a stale hand-written map, because the file's whole argument for
existing is that a script cannot forget. It forgot six rooms and said nothing. Fix is one
number, or better: read to the matching `];` instead of guessing a byte count.

### The visible arithmetic

| | count | which |
|---|---|---|
| entries in `ROOMS` | 15 | |
| `internal: true` — real work, never shown | 5 | `pay` `keep` `deal` `name` `share` |
| public (`u1Public()`) | 10 | |
| open | 4 | Profile · Codex · Tarot · Birth Reading |
| free to enter | 3 | |
| still to come, publicly | 6 | |

U1's header line is derived from these, so it currently reads:
**"4 rooms open · 3 free to enter · 1 paid · 6 still to come."**

### ★ THE BENCH COLUMN NEVER RENDERS

`u1Column()` filters through `u1Public()` first, and **all three `bench` entries are
`internal`**. So the column returns `""` and is dropped from the board.

The consequence is precise and worth stating plainly: U1 says *"In the order it is being
made, nearest first"* — and then shows **Drawn up** and **Named only**, skipping the
nearest horizon entirely. The three things actually being built right now are invisible,
so the forward view opens at the middle distance and reads as further off than it is.

This is not a bug in the filter. It is the registry saying two different things with one
flag: `internal` means both *"plumbing a visitor should not have to care about"* and
*"do not display"*, and for the bench those come apart.

### U1 is one page doing three jobs, and two of them were merged on purpose

| job | where it lives on U1 |
|---|---|
| **identity** — what this place is | `u1head`: *"Everything read here is yours to keep"* + the archive line |
| **the open doors** | `u1sect--open`: the four open rooms as doors |
| **the forward ledger** | `u1board`: the horizons + the vision aside |

`/roadmap/` and `/about/` are byte-identical stubs (`build_routes.py:38,44`), merged at
BR-S369 because the standalone room *"rendered the same two columns from the same registry
with a different title and no doors — one page wearing two names."* That merge was right.
The standalone page survives, unloaded, at `parked/roadmap.js`.

### ★ THE NAME: "THE FORGE" IS REVERTED TO "THE CARD MINT"

**Builder, 2026-08-14:** *"not the forge, rather card mint as name."* This reverses BR-S406,
and the reversal is cheap because **BR-S406 was never finished.** The rename touched two
strings and left three behind — the live site currently calls the same room by both names:

| says "The Forge" | says "Card Mint" |
|---|---|
| `app.js:1499` — the registry entry | `settings.js:342` — the value ladder, "IV · Card Mint" |
| `app.js:3220` — L1's seal heading | `settings.js:353` — the privacy page, "When you stage a photo in Card Mint" |
| | `settings.js:392` — the data table |

So this is not a rename in either direction; it is **ending a split that has been live**.
Reverting costs two strings and makes five agree. ★ The lesson worth keeping: a rename is
not a decision, it is a sweep — BR-S406's own note argued the case well and then changed
the two places the author happened to be looking at.

---

## PART 1B — THERE **IS** A HUB, AND IT DOES NOT KNOW ABOUT THE ROOMS

The Atlas's line *"there is no rooms hub page anywhere in this repo"* is true and
misleading. There is no hub **page** — but there is a hub **surface**: **THE ORBIT**
(`app.js:6802`, BR-S290), a button on M1 that opens the whole map at once as plates
scattered around a pale sheet. It has two-press inspection, a rank system where the
likeliest destination holds the centre, and a spring field on hover. It is built, it is
live, and it is good.

★ **But it maps the PANELS, not the rooms.** `rooms()` at `app.js:6851` derives its plates
from `MENU_PANELS` — the three horizontal panels — and then hardcodes four more. It never
reads the `ROOMS` registry.

| Orbit plate | what it actually is |
|---|---|
| The Reading Rooms *(centre, rank 0)* | the M1 panel — **two rooms behind one plate** |
| The Codex | a link |
| The Archive Desk | L1, the sealed photo panel |
| Your Profile | the M2 panel |
| About Blue Room | U1 |
| What's coming | U1 again, via `roadmap/` |
| Settings | a utility |

**So the house has two room lists that have never met.** `ROOMS` (15 entries) feeds U1 and
the Roadmap. The Orbit's `rooms()` (7 plates) feeds the map. Tarot and the Birth Reading —
the two products — do not appear on the map as themselves; they are folded into one plate
called "The Reading Rooms". The Card Mint, the Workshop and every forward room are absent.
Two of seven plates are the same destination.

★★ **AND THE ORBIT ALREADY HAS A `wing` FIELD.** `app.js:6876` and `:6880` assign every
plate a wing, there is a `?orbit=wings` layout mode (`app.js:4188`, `:6839`), and BR-S339's
note reasons in wings out loud: *"The Roadmap is in the HOUSE wing with About and Settings —
the building explaining itself."*

Its taxonomy is two values — **`work`** and **`house`** — and every panel is `work`:

```
work  : The Reading Rooms · The Archive Desk · Your Profile · The Codex
house : About Blue Room · What's coming · Settings
```

That split is real and correct as far as it goes: `house` is *the building talking about
itself*, `work` is *everything else*. But `work` is four sevenths of the map and holds the
products, the reference and your holdings in one undifferentiated bag — which is the same
failure as the registry's single axis, arrived at from the other end.

**The convergence is the finding of this pass.** The wing axis proposed in PART 3 was
derived from the registry with no knowledge of this code. The nav had already reached for
the same word. They disagree only on granularity: the Orbit needs `work` split into
**DRAW · KEEP · KNOW**, and it needs to read the registry instead of the panel track.

---

## PART 1C — HOW NAVIGATION ACTUALLY WORKS

Four systems, built at different times, none of them wrong on its own.

### 1. The track — one horizontal line, three panels

`MENU_PANELS` (`app.js:4049`). **← / →** step it; the slide is `640ms cubic-bezier(.22,.61,.25,1)`.

| # | panel | address | state |
|---|---|---|---|
| 0 | The Archive Desk (L1) | *none* | sealed behind a coming-soon since BR-S400 |
| 1 | The Reading Rooms (M1) | site root | the front door |
| 2 | Your Profile (M2) | `#reliquary` | |

★ The middle panel is the only one with a real address, and the left panel has none at all.

### 2. The descent — one vertical drop, below the home panel only

U1 hangs under M1 at `#about`. **↓ / ↑** move through 8 derived checkpoints; the glide is
built as the vertical twin of the horizontal slide (`app.js:4622`). Guarded to HOME only
(`app.js:4731`) — L1 and M2 have no depth.

So the whole spatial model is **one line and one drop**. Everything else is a link.

### 3. The Orbit — the map, opened from a button (PART 1B)

The only surface that shows more than one destination at once. Escape or the scrim closes
it; picking a plate closes before it travels. `?orbit=0` removes it entirely.

### 4. Addresses and routes — three kinds, and only one is typeable

| kind | examples | note |
|---|---|---|
| **real directories** | `/about/` `/roadmap/` `/profile/` `/reading/` `/tarot/` | generated by `build_routes.py`; work with no server |
| **a real file** | `codex.html` | |
| **`?dev=` routes** | 17 of them — `arcane` `drawing-room` `profile` `settings` `vision` … | ★ `index.html` returns 200 for **any** `?dev=` value; an unknown one falls silently to the Desk with the bad param still in the URL |

### ★ THE THREE NAVIGATION DEFECTS THIS PASS FOUND

1. **Two rooms share one plate.** Tarot and the Birth Reading — the two products, one free
   and one paid — are both behind "The Reading Rooms" on the map and both behind panel 1 on
   the track. The house's two sellable things are invisible to its own navigation.
2. **One destination has two plates.** "About Blue Room" and "What's coming" both open U1.
   BR-S369 merged the pages and the map still shows them as two places.
3. **The sealed room holds a third of the track.** L1 is one of three panels and one of
   seven plates, and it is a coming-soon. The nav gives its largest single share of
   attention to the one thing a visitor cannot use.

None of these is a rendering bug. All three are the same cause: **the nav describes the
surfaces we built, not the rooms we have.**

---

## PART 2 — WHY THE HOUSE HAS NO PERCEIVABLE SHAPE

**The registry has exactly one axis: build state.** `open` · `bench` · `drawn` · `named`.
That axis is *our* timeline. It answers "when", and it answers it well.

There is **no axis for what kind of thing a room is**, so nothing in the data says what
belongs near what. Every surface that renders the registry — U1, the parked Roadmap — is
therefore forced to group by *when we will build it*, which is the one grouping a visitor
has no use for. A stranger cannot see the shape of the house because the house has never
been described by shape, only by schedule.

★ **And the 15 are not one kind of thing.** Sorted by kind rather than by date, three of
them stop being rooms at all:

- **`unlock` — "The Codex, opened by your reading"** is not a room. It is *depth added to
  a room that already exists*, bought by a purchase. Filed as a peer of The Workshop, it
  reads as somewhere else to go.
- **`two` — "Love"** ★ **I called this a lens across the readings. The builder overruled it
  the same day:** *"love space is space and related products will be inside it."* It is a
  SPACE, and products live inside it. Corrected below — and the correction is worth more
  than the original claim, because it reveals a second axis this pass had missed.
- **`unlit` — "The Unlit Room"** is a placeholder for the list itself, not a destination.

---

## PART 3 — THE PROPOSED SHAPE

**Add a second axis — `wing` — and change nothing else.** The state axis stays exactly as
it is; it is correct and every forward surface depends on it. `wing` says what kind of
thing an entry is, and it is the axis a visitor navigates by.

### Three wings, one spine, and two things that are not rooms

| | | holds | its one sentence |
|---|---|---|---|
| **DRAW** | the wing that makes something | Tarot · The Birth Reading · The Card Mint | *You give something, and get a record back.* |
| **KEEP** | the wing that holds it | Your Profile / the Shelf · a reading you can show · your shelf on any screen | *What you drew is yours, and it stays.* |
| **KNOW** | the reference everything reads from | The Codex | *222 marks, and every room reads from them.* |
| **PLAY** | no reading in it at all | The Workshop · Social games | *Free with an account.* |
| *spine* | plumbing, never shown | pay · keep · deal | *(internal — the launch blocker)* |
| **LOVE** | a space, holding its own products | the Concord ($7.99) today · more to come | *Everything here is about two people.* |
| *not rooms* | | `unlock` → a **depth** on KNOW, sold by DRAW · `unlit` → a placeholder | |

### ★★ LOVE IS A SPACE — and it exposes the second axis

**Builder:** *"love space is space and related products will be inside it."* My "lens"
reading was wrong, and the way it was wrong is the useful part.

**DRAW · KEEP · KNOW are wings by ACT** — making a record, holding it, being what it was
drawn from. **LOVE is a wing by SUBJECT.** Both are legitimate ways to divide a house, and
a space that *contains products* is a peer of DRAW, not a view across it. The reason Love
felt unresolved for so long is that it was being tested against an axis it does not belong
to.

★★ **AND IT HOLDS NOTHING — I put a product in it and was overruled within the minute.**
**Builder:** *"love does not hold anything, its unmade wing."*

I had filed the Concord (*"two people, one reading · $7.99"*, `arcane.js:337`) into Love,
reasoning that the house's top-priced product had no room. That was wrong, and it is worth
recording exactly *how* wrong, because the registry had already written the warning down.

`two` is state **`named`** — and BR-S379's own note at `app.js:1563` says: *"a 'named only'
entry is an intention written down so it is not lost: the one job it has is to still be the
intention when it is read back. **Inventing a shape for it is the one way to fail at that.**"*

I read that comment during this pass, quoted the entry approvingly for admitting its shape
was unsettled — and then two sections later gave it a shape and a product. ★ **The pattern
is the finding: an empty space is the single most tempting thing in a registry to fill, and
the temptation is strongest right after you have built a framework that has a slot for it.**
A framework wants its cells populated. That is a property of frameworks, not of the house.

**The Concord stays where it is** — a Birth Reading variant. It is not homeless; it was only
homeless in a model that needed it to be.

★ **The rule this sets, and it needs stating before more spaces appear:** a product may sit
in a subject space *and* be made by an act. The Concord is drawn (DRAW) and it is about two
people (LOVE). So subject spaces are **not** a second copy of the product list — they are
where a product is *found*, while the act is what it *is*. Get that backwards and the house
grows two catalogues of the same things, which is the exact failure BR-S369 fixed when one
page was wearing two names.

### ★★ THE BUILDER'S TWO RULINGS, 2026-08-14 — both confirm and both change something

**1. *"card mint, tarot and birth are products."*** DRAW is confirmed exactly, and it is now
a closed set rather than my grouping. Three products, and the house sells nothing else.
★ It also settles the Card Mint's status: it is not a `drawn` curiosity in the forward list,
it is **one third of the product line**, sitting unbuilt.

**2. *"tools will be free, if you have an account."*** This is the one that changes the
shape, and it is the strongest idea in the pass — but it is not mine, so it gets stated
plainly rather than praised.

- **PLAY stops being a bench in the yard.** Free-with-an-account is not a lesser thing than
  a product; it is a different *kind* of thing — an acquisition surface. It is the only
  room in the house that can ask for a sign-up without asking for money.
- ★ **It gives the account a reason to exist that is not a purchase.** Today the only way to
  become someone the site knows is to buy. That makes the account a receipt. With the
  Workshop free behind it, the account becomes a **membership** — and the Profile, which
  `POSITION_MAP` already calls a members' page, finally has members who are not customers.
- ★★ **AND IT INTRODUCES A THIRD GATE.** The house has had exactly one threshold —
  *"looking is free, always; keeping is what opens a door"* (the M3 line, quoted at
  `app.js:2039`). There are now three:

  | gate | opens | costs |
  |---|---|---|
  | none | the Codex, the doors, one Sitting | — |
  | **an account** | The Workshop, Social games | a sign-up |
  | a purchase | the three products, and the Codex opened by your reading | money |

  That is a coherent ladder and it is better than the two-step it replaces. It must be
  written down, because the one-line version is quoted in the code as law.

★ **The dependency this creates, and it is real.** There is no account system. `br_holdings`
is a mock flag a developer flips (PART 5), and `POSITION_MAP` already notes the founding
promise *"everything read here is yours to keep"* is one browser's localStorage. Tools-free-
with-an-account means **accounts are now load-bearing for a wing that has nothing to sell** —
so they can no longer wait for the commerce spine. They move ahead of it, or beside it.

**Why PLAY still sits apart from the three wings.** Not because it is lesser — because it
holds no record. DRAW makes records, KEEP holds them, KNOW is what they are drawn from;
PLAY touches none of that. Filing it as a fourth peer is how a coherent archive turns into
a grab-bag. It is its own building, reached from the same yard.

### What this shape buys, concretely

1. **The house becomes sayable in one line.** *You draw something · it is kept · the Codex
   is what it was drawn from.* That is a shape a stranger can hold after five seconds,
   which is the door's own success test from `POSITION_MAP_V1.md §1`.
2. **The hub question answers itself.** §7 could not decide whether U1 *is* the hub because
   there was no shape for a hub to show. A hub shows **three wings and what is open in
   each**; U1's forward ledger is a different page's job. They stop competing the moment
   the shape exists.
3. **`unlock` and Love stop being vacancies.** Both currently sit in a forward list
   describing rooms that will never be built as rooms — the exact "vacancy notice" failure
   named in §1. As a depth and a lens they become real and buildable.
4. **The Card Mint lands somewhere.** Today it is a `drawn` orphan holding the whole
   photo-card product. In DRAW it is plainly the third thing that makes a record.
5. **The door's one exit gets a destination that survives.** §7 briefed the door with one
   re-pointable link precisely because this was unanswered. It now points at DRAW.

### The one thing to decide before any of this is built

**Is KEEP a wing, or is it just the Profile?** Three of its entries are the same fact
(your things, kept, anywhere, shareable) and two of them are `internal`. If it is one room
it belongs inside DRAW's afterward rather than beside it, and the house is *two* wings and
a reference. That is a smaller and possibly truer building, and it is the builder's call,
not mine.

---

## PART 3B — ★★ THE REVISION. TWICE IS A PATTERN, NOT A CORRECTION.

**Builder, minutes after the Love ruling:** *"maybe social, drinking, will have own space
too with its products."*

That is the same sentence twice — *a space, with its products inside* — about two unrelated
subjects. One is a correction. Two is the house telling me its organizing principle, and it
is **not the one proposed in PART 3.**

### What the two rulings actually say

DRAW · KEEP · KNOW divide the house by **act**. But the builder does not think in acts. Both
rulings put a **subject** first and hang products under it. And once that is taken seriously,
DRAW stops being a wing at all:

★ **DRAW is not a place. It is what every product space has in common.** Tarot, the Birth
Reading and the Card Mint all make a record — that is a *property* they share, not an
address they share. A wing built from a shared property is a category, and you cannot walk
into a category.

### The revised shape — spaces, and two things that are not spaces

| | holds | note |
|---|---|---|
| **The Reading Rooms** | Tarot · The Birth Reading · The Card Mint | the three products. ★ **This space already exists** — it is M1's panel name and the Orbit's centre plate |
| **Love** | ★ **nothing. An unmade wing.** | *Builder: "love does not hold anything, its unmade wing."* Declared, empty, no promise |
| **Social** | nothing yet — intended to hold its own products | ★ its unit is a **group**, not a reader |
| **The Workshop** | the wheels exist; the room does not | free with an account; makes no record |
| *not a space* | **The Codex** | the reference every space reads from. It holds no products; it is what products are made of |
| *not a space* | **Your Profile** | where what you own lives. Holds no products; it holds *yours* |
| *internal* | pay · keep | the spine |

**One sentence, and it is now sayable:** *Spaces hold the products. The Codex is what they
are all drawn from. The Profile is where yours end up.*

### ★★ AND THE HONEST VERSION OF THAT TABLE, TODAY

Strip out everything unmade and the house is smaller than any document in this repo implies:

| | |
|---|---|
| **made** | the products hub · **The Codex** · **Your Profile** — ★ and **BLUE ROOM itself, which has no surface of its own** (see below) |
| unmade wings | Love *(empty by ruling)* · Social *(intended)* · The Workshop *(wheels exist, room does not)* |

**One space and two singular rooms.** That is the whole built house. Everything else is a
wing without walls — which is not a criticism, it is the correct state for work that has not
started, and it is exactly what the `named` / `drawn` vocabulary was invented to say.

★ **The consequence for the hub.** A map of *this* has three destinations, and PART 1C's
defect — "two products behind one plate" — is the only thing standing between the Orbit and
being accurate today. The hub does not need the wings to exist. **It needs the shop to stop
hiding.**

### Why this is better than PART 3, stated against itself

- **It is walkable.** Every top-level item is somewhere a person can be. DRAW never was.
- **It is what the builder already built.** "The Reading Rooms" has been the panel name and
  the map's centre plate for months. PART 3 proposed inventing DRAW next to it.
- **It grows correctly.** A new subject is a new space; it does not have to be argued into
  an existing wing. Love and Social both arrived that way, unprompted, within an hour.
- **KEEP and KNOW resolve themselves.** They were never wings — they were the Profile and
  the Codex, each described as if it needed company. Neither does. ★ **This answers PART 3's
  one open question** ("is KEEP a wing or just the Profile?") without needing a ruling: it
  is just the Profile, and KNOW is just the Codex.

### ★ The one risk, named now while it is cheap

**Subject spaces must not become a second catalogue.** The Concord is a Birth Reading *and*
it belongs in Love. If Love lists it as a separate thing, the house has two names for one
product — the exact failure BR-S369 fixed when U1 and the Roadmap were one page wearing two
names. **A product has ONE home and may be FOUND from many places.** Decide each product's
home when it is filed, not when a space is built.

### ★★ SETTLED — BLUE ROOM IS THE MAIN MENU. THE PRODUCTS HUB IS ONE LEVEL IN.

**Builder:** *"blueroom should be main menu, and space people remember, we cant have reading
rooms as name, its different page or hub."*

This answers the question above and moves the whole model up a level. I had **The Reading
Rooms** at the top as the one made space. It is not the top — it is a **hub inside the
house**, and the top is the house itself.

```
BLUE ROOM                 the main menu · the front door · the space people remember
   ├── the products hub   Tarot · The Birth Reading · The Card Mint   ("The Reading Rooms" — a page, not the menu)
   ├── Love · Social · The Workshop        unmade wings
   ├── The Codex          what everything is drawn from
   └── Your Profile       where yours end up
```

★ **Why this is the correction the whole pass was circling.** M1 is the site root and the
front door, and the nav names that panel *"The Reading Rooms"* (`app.js:6864`). So **the
house's front door is currently named after its shop.** Every symptom in this document is
downstream of that one substitution: the map has no plate for Blue Room because Blue Room
has no surface of its own; the products hide behind one plate because that plate is standing
where the house should be; and U1 carries the identity — *"Everything read here is yours to
keep"* — one scroll below the door, because the door was busy selling.

### ★★ AND THIS FIRES THE DOOR'S RECORDED EXPIRY, BEFORE IT EVER SHIPPED

`POSITION_MAP_V1.md` §9 named two conditions that retire **THE CLAIM** (`_door1.html`,
chosen 2026-08-14). The second is, verbatim:

> **"Blue Room needs to be the thing people remember, rather than the reading."**

The builder has now said exactly that, in those words, one day later. ★ **The expiry was
written down precisely so this moment would be visible rather than silent — and it worked.**
That is the mechanism doing its job on its first real test, and it is the strongest argument
in this repo for writing an end date on every temporary decision.

**But §9 also pre-decided what to do about it, and it is not "replace the door":**

> *"The structure does not have to change. The first line — 'Two hundred and twenty-two marks
> are kept here' — is already the house; the second is the product. Giving the archive claim
> more weight and the product less is a TUNING move inside the same design, not a redesign.
> **Try that before replacing it.**"*

So the order is: **tune THE CLAIM toward the house first.** It was chosen on its merits one
day ago and the winning design is not the problem — its balance is. A redesign is what
happens if tuning fails, not instead of trying it.

### ★★ RESOLVED, 2026-08-14 — U1 IS EMPTIED, NOT RE-POINTED

**Builder, after seeing the doors cloned into the ROOMS popup:** *"if our new page works
well, we might delete this from u1"* · *"and this transferred to whats coming pop up or
seperate page. and new page as u1."*

U1 has been carrying three jobs (PART 1C): **identity**, **the open doors**, **the forward
ledger**. The move gives away both lists:

| what | goes to |
|---|---|
| the four open doors | **the ROOMS popup** — prototyped by cloning `#about .u1doors` |
| "what is still being made" | **a What's-coming popup, or its own page** |
| what is left | **U1 becomes a new page** |

★ **This is the opposite of what PART 4 proposed, and the builder's version is better.**
I had U1 shedding identity and keeping the ledger — which leaves a page defined by what it
lost. Emptying it of both lists frees the surface to be designed for one job, and it
dissolves the §7 hub question rather than answering it: **the hub is the ROOMS popup, the
roadmap is the What's-coming popup, and neither is a page competing with U1.**

★ **The condition is the right instinct:** *"IF our new page works well."* Nothing leaves
U1 until the replacement is proven. The doors are CLONED, not moved (`_rooms-u1.js`), so
both exist at once while that is judged.

### What still needs a decision

1. **Does the products hub keep the name "The Reading Rooms"?** The builder's line rules it
   out as the *menu's* name and calls it "a different page or hub" — which reads as the name
   surviving on the hub. Worth confirming, because the Card Mint is not a reading, and a hub
   holding all three products under that name mis-describes a third of the shop.
2. **What does BLUE ROOM as a menu actually show?** It is now the memorable surface, not a
   storefront — and the door brief in §5 of the position map was written for a door that
   sells. That brief needs re-reading against this.

---

## PART 4 — WHAT TO DO, IN ORDER

| # | Change | Cost | Why first |
|---|---|---|---|
| 1 | **"The Forge" → "The Card Mint"**, `app.js:1499` + `:3220` | two strings | Ends a name split that is live in five places today |
| 2 | Fix `build_atlas.py`'s 6000-byte window | one line | Every argument after this reads a map missing six rooms |
| 3 | Split `internal` into *plumbing* + *do-not-display*, so the **bench column renders** | small | The nearest horizon is invisible and the lede says otherwise |
| 4 | Add `wing:` to each `ROOMS` entry | data only, no render change | Nothing can be grouped by shape until the data carries shape |
| 5 | Re-file `unlock`, `two`, `unlit` as not-rooms | data | Stops the forward list advertising rooms that will not exist |
| 6 | Decide KEEP: wing or room | a sentence | Determines whether the house is three wings or two |
| 7 | **Point the Orbit at `ROOMS`** and widen its `work` wing into DRAW · KEEP · KNOW | a real change | The hub already exists — it is pointed at the wrong list |

★ Steps 1–6 are strings and data. They cost nothing visually, and the house shape becomes
**true in the registry** before a single pixel is designed — the opposite of how the M1
chain ran. Step 7 is the only design work, and it is a re-point rather than a new surface,
because **the hub was built at BR-S290 and nobody has fed it the house.**

---

## PART 5 — THE COMMERCE SPINE, MAPPED

The three `bench` entries are described everywhere as *the* launch blocker, always as one
thing. Read against the code they are **three unrelated systems at three different stages**,
and one of them is arguably already shipped.

| entry | what it actually needs to be | state in the code |
|---|---|---|
| **`pay`** — "Paying for a reading" | money in: a processor, a session, a receipt | **nothing exists.** `POST_TARGET = null` (`app.js:1728`), guarded twice — `disabled` on the control *and* a `preventDefault` on submit (`app.js:2012`). No processor is referenced anywhere in the repo |
| **`keep`** — "A reading that waits for you" | a record of what you bought, that survives | **four localStorage flags**, and none of them records a purchase (below) |
| **`deal`** — "The whole dealing" | the deck shuffles, cuts, and lands | **largely built.** The Drawing Room's riffle, shuffle step and dealt face shipped across BR-S316–320 |

★ **`deal` is a ceremony, not commerce.** It is on the bench beside two payment systems
because all three were unfinished at the same time, not because they belong together. Its
presence there inflates the blocker by a third and hides that the real gap is two items.

### What "kept" means today — the whole of it

| key | what it is | written by |
|---|---|---|
| `br_holdings` | ★ **a MOCK flag** — a dev toggle, not a purchase record (`app.js:1479` calls it mock; the dev nav flips it at `:4238`) | a developer |
| `br_has_reading` | you completed an intake — unlocks Family/Friend next time | `arcane.js:962` |
| `br_dr_sitting_used` | your free sitting is spent | `drawing-room.js:230` |
| `br_concord~*` | a saved pair reading | `arcana-reading.js:572` |

★★ **Nothing anywhere stores WHAT you bought.** Every flag is a boolean about state, not a
record of a thing. So `keep` is not "make the flags survive a device" — the artefact those
flags would point at **does not exist yet**. That is a bigger job than the bench entry's
sentence implies, and it is the one place the registry undersells its own work.

### THE PRICES — four exist, one product has none, and the code miscounts them

| price | what it buys | where it is stated |
|---|---|---|
| **free** | the first Sitting; the Codex; the Profile | |
| **$1.99** | a Sitting after the free one is spent | `drawing-room.js:82` — ★ never shown on any door |
| **$2.99** | The Deep Read, 5 cards | `drawing-room.js:85`, the registry door |
| **$4.99** | The Birth Reading — also the gift, same price | `arcane.js:378,439`, the registry door |
| **$7.99** | two people, one reading (the Concord) | `arcane.js:337`, the registry door |
| **—** | ★ **The Card Mint's paid tier has NO price.** The registry says *"Free · or the paid Halo Mint"* and no number for it exists anywhere in the repo | |

★ `app.js:1731` states *"The prices that DO exist on this site are $4.99 and $7.99"* and
uses that to anchor the tip ladder below them. It is **incomplete** — $1.99 and $2.99 exist
too, and $1.99 is the lowest real price on the site. Any ladder positioned to sit under
"the site's prices" was positioned against half the list.

### So: do we know what it will cost?

**For the two live products, yes** — four prices, stated on the doors, consistent between
the registry and the rooms. **For the Card Mint, no**, and it is the product furthest from
shipping anyway. **For the tip ladder, the anchor is wrong.**

What is *not* known is not the prices. It is that **nothing can be charged, and nothing
records a purchase** — and those are `pay` and the missing artefact behind `keep`, which is
two jobs, not three.

---

Relates to `docs/POSITION_MAP_V1.md` §7, `docs/ATLAS_GENERATED.md`,
`docs/SURFACE_BRIEF_V1.md`.
