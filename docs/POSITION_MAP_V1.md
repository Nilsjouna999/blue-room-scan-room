# THE POSITION MAP — what each surface is FOR

**Companion to `docs/ATLAS_GENERATED.md`.** The Atlas says what exists and where, and stays
true by itself because a script writes it. This file says what things are *for*, which is
not extractable, cannot be generated, and is therefore allowed to be opinionated and
expected to be argued with.

> **Draft v1, 2026-08-14.** Written from the code plus the session that produced
> `_m1-builder-signal.md`. Lines marked **ASSUMED** are my reading, not the builder's
> stated intent — those are the ones to correct first.

---

## 1. THE THREE KINDS OF SURFACE

The M1 work spent 273 agent-runs before this distinction existed, and produced seven
excellent surfaces of the wrong kind. It is the first thing any future brief must state.

| Kind | Its one job | Its failure mode | Success test |
|---|---|---|---|
| **A DOOR** | Say what this place is and let you in. | Starting in the detail. Becomes a catalogue. | A stranger can say what this place is after five seconds. |
| **A HUB** | Show the shape of the house. | Becoming a vacancy notice — depicting rooms that do not exist. | A visitor can say how big this is and what kind of thing is in it. |
| **A PRODUCT PAGE** | Say what one reading is, what it says, what it costs. | Selling before the visitor knows why they care. | A visitor can decide *which* reading, and what they get. |

★ **The finding this came from:** `_m1-final.html` is an excellent product page and a poor
door. `_m1-team4/5.html` are hubs that kept losing a door competition they were never
suited for. Neither was badly made. Both were at the wrong address.

---

## 2. THE ROOMS, and what each is for

Read from the `ROOMS` registry. The state vocabulary is the registry's own
(`app.js` U1_HORIZONS): **open** = shipped · **bench** = being made now (internal, never
shown) · **drawn** = designed and waiting; exists on paper, the room does not ·
**named** = an intention written down, no design and no promise.

### Open — reachable today

| Room | Address | Free | What it is for |
|---|---|---|---|
| **Tarot Divination** | `?dev=drawing-room`, `/tarot/` | yes | The way in. A Sitting is three cards to one question and the first is free — this is the only thing on the site a stranger can complete at no cost, which makes it the front of the funnel whether or not it is designed as one. |
| **The Birth Reading** | `?dev=arcane`, `/reading/` | **paid** | The deeper product. Six given marks read into one crowned name — the same tonight and in ten years, which is the claim tarot structurally cannot make. **ASSUMED:** this is the revenue centre and tarot is the door to it. |
| **The Codex** | `codex.html` | yes | The reference, and the proof of scale — 222 marks across nine systems. It is the only surface that shows how large this is without claiming anything. **ASSUMED:** its second job is credibility; a stranger who opens it stops wondering whether this was made carefully. |
| **Your Profile** | `?dev=profile`, `/profile/` | yes | Where what you own lives. A members' page: it never has to sell, because everyone on it has already arrived. Hardest state is having nothing yet — see `docs/EMPTY_FRAME_V1.md`. |

### Drawn — designed, not built

| Room | What it is for | Note |
|---|---|---|
| **The Forge** | Where a reading becomes an object you hold. | Was "the Card Mint"; renamed BR-S406 because mint is the industry's word, not a person's. |
| **The Codex, opened by your reading** | Buying a reading unlocks your entries in the Codex — one bank, shared between the reading and the reference. | The strongest retention idea in the registry. Turns a purchase into a permanent change to a room you already visit. |
| **Your shelf, on any screen** | Holdings that survive a device change. | ★ This is the room that backs *"everything read here is yours to keep."* Until it exists, that line is one browser's localStorage — the founding promise is written and unkept. |

### Bench — internal, never shown to a visitor

`Paying for a reading` · `A reading that waits for you` · `The whole dealing`. These are
the commerce spine. **They are the reason the site cannot take money yet**, and no amount
of front-door work changes that.

---

## 3. THE SURFACES THAT ARE NOT ROOMS

| Surface | Address | What it is for |
|---|---|---|
| **M1 — the front door** | site root, the wall panel | **Nothing has ever been briefed to build this.** Today it sells two readings, which is a product page's job. |
| **L1 — the desk** | left of M1, no address | The photo card, sealed behind a coming-soon preview since BR-S400. Parked deliberately. |
| **M2 — the Profile face** | `#reliquary`, right of M1 | The Profile reachable by slide as well as by button. The one duplicate route the builder has explicitly kept. |
| **U1 — below M1** | `#about` | What this place is, and the room list read from `ROOMS`. **ASSUMED:** this is doing half the door's job today, one scroll out of sight. |
| **The Roadmap** | `/roadmap/` | Renders the same registry by horizon. The honest answer to "what's coming" — and the only place the nine rooms are visible to a visitor. |

---

## 4. THE FLOW — how a person moves through this

**ASSUMED throughout.** This is the part most worth correcting, because every brief
downstream inherits it.

```
STRANGER          arrives at M1. Wants: what is this, and is it for me.
                  Should get: the answer, and the free thing, in one move.
   |
   v
READER            takes the free Sitting. Now has an object and a reason to return.
                  Should get: the reading, kept — and one honest reason there is more.
   |
   v
BUYER             pays for a Birth Reading or a Deep Read.
                  Should get: a permanent thing, and the Codex opening around it.
   |
   v
MEMBER            has holdings. The Profile becomes their home, not the door.
                  Should get: their things, on any screen. (Not yet possible.)
```

★ **The two breaks in this flow, both real today:**
1. **BUYER cannot happen.** The commerce spine is on the bench. Everything upstream of it
   is a demonstration.
2. **MEMBER cannot persist.** Holdings are per-browser. The promise is written on the
   vision page and unbacked.

Neither is a design problem, and neither is fixed by any front door.

---

## 5. WHAT THIS MAP SAYS ABOUT THE DOOR

The brief falls out of the table above rather than being invented:

- **M1's job is to answer "what is this place" and hand over the free thing.** Not to sell
  two readings — that is the product pages' job, and one of them is already built.
- **It is a small page.** What this is · the free way in · the way to the house.
- **Selling is demoted.** The door's success test is the five-second stranger question.
- **The hub is not the door.** The field designs go to ROOMS, which does not exist as a
  destination — `ROOMS` is data feeding U1's list and the Roadmap.
- **U1 already does part of this job**, one scroll below, where the wheel handler makes it
  reachable only as a glide. **ASSUMED:** some of what a door should say is already
  written down there and is simply in the wrong place.

---

## 6. ★★ DECIDED — THE BIRTH READING IS THE MAIN PRODUCT AND THE RECOMMENDED STEP

**The builder, 2026-08-14:** *"i think birth reading is main product and recommended step."*

This is no longer ASSUMED, and it settles more than it looks like it settles.

**What it makes the two products.** The Birth Reading is the destination. The free Sitting
is the taste — real, complete, and given away, but not the thing the house is for. That is
a hierarchy, not a pair, and it ends the "two doors, equal weight" arrangement every
design in the competition inherited without questioning.

**What it does to the door, and this is the good news.** A door presenting two peers has to
explain both and rank neither, which is why every candidate got dense. A door with a
recommendation is a much smaller page:

> what this place is · **the one to take** · a free taste if you want it first · the way in

One recommendation, one alternative, one way to the house. That is a door.

**It also resolves free-first without breaking it.** Free still leads as the ENTRY — the
Sitting is what a stranger can complete at no cost. Birth leads as the RECOMMENDATION.
Those are different jobs and only look contradictory if a page has to state them in the
same sentence.

★★ **AND IT MAKES THE COMMERCE SPINE THE BLOCKER FOR THE FRONT DOOR, not just for the
rooms.** `POST_TARGET` is `null` (`app.js:1728`) and nothing may be submitted while it is —
the code says so twice, deliberately. So the moment the door recommends the Birth Reading,
it is recommending something a visitor cannot complete. That is a different and worse
failure than a door that under-sells: it converts, and then it dead-ends.

Three ways out, in order of honesty:
1. **Build the spine first.** `pay` · `keep` · `deal` are already on the bench and are the
   real launch blocker. The door becomes correct the day they land.
2. **Recommend it and say what happens next honestly** — a waiting list, a "not open yet",
   a date. The recommendation is real; the fulfilment is named as coming.
3. **Recommend the Sitting until the spine exists**, and re-point the door on the day it
   does. Costs nothing now and requires a change later.

**Do not** recommend it silently and let the visitor find the wall. That is the one option
that spends the trust the whole build has been accumulating.

## 7. ★ U1 AND THE HUB — DELIBERATELY LEFT OPEN

**The builder, 2026-08-14:** *"currently our layout and room design is not set in stone so
u1 has bit of rooms, or hubs vibe, although i do think u1's incoming, and that other stuff
is good… until we have more solid view how our rooms are it's tough to say yet, or layout."*

This is the right call and it is recorded as a decision NOT to decide. U1 today carries
hub-shaped content — the registry by horizon, what is open and what is coming — and the
builder rates that content. Whether U1 *is* the hub, or whether a hub eventually takes that
job from it, cannot be answered before the room structure settles, and forcing it now would
be inventing an answer to make a brief easier.

★★ **THE CONSEQUENCE, AND IT IS THE USEFUL PART: THE DOOR MUST NOT DEPEND ON THE ANSWER.**

A door briefed as "and then it leads to the hub" is a door that has to be rebuilt when the
hub question resolves. So the door is briefed with **one exit to the house whose
destination is a single re-pointable link** — the door says *there is more here and this is
the way*, and what sits on the other side is a separate decision that can change without
the door changing.

That gives the door a stable brief today:

- what this place is
- **the Birth Reading, recommended**
- a free Sitting if you want a taste first
- one way to the house — destination TBD, deliberately

Everything in that list is decided. Nothing in it waits on the room structure. The door can
be designed, built and judged now, and the room question can take as long as it needs.

★ **The corollary for the room work:** it is not blocked either. It is a separate track,
and it wants the opposite of a fleet — it wants the registry, the Roadmap and U1 looked at
together by one person with the map in hand, until the shape is obvious. When it is, the
door's one exit gets re-pointed and nothing else moves.

## 8. THE COMMERCE QUESTION — CLOSED

**The builder, 2026-08-14:** *"obviously its going to work when we go live."*

Correct, and §6's three routes were over-thinking it. **The door is designed for the site
as it will be on the day it opens, not for the half-built state it is in this week.** It
recommends the Birth Reading and assumes a visitor can complete one. `POST_TARGET` being
`null` today is a build task on the bench, not a design constraint on the front door.

The only thing this leaves is a note for whoever ships: a door that recommends a purchase
must not go live before the spine does. That is a release-order fact, not a design one, and
it belongs in the launch checklist rather than in any brief.

## 9. ★★ THE DOOR IS CHOSEN — and the page behind it is now the problem

**Builder, 2026-08-14:** *"first was best design of the 5"* — `_door1.html`, **THE CLAIM**.

> *Two hundred and twenty-two marks are kept here. Six of them are already yours.*

No product name, no price, no welcome. The first line proves the archive is real and
countable; the second carries the recommendation. One contained object holds the six real
given-not-drawn marks and one withheld line — *"— your name, when the six are read —"*.

★ **AND THE MOMENT IT WAS CHOSEN IT MOVED THE PROBLEM ONE PAGE ALONG.** The builder,
immediately: *"if next page has buy read so soon its turn off… unless it manages to soften
blow and turn things around."*

That is exactly right, and it is a consequence of the door working. A door that creates
want and then hands the visitor straight to a checkout has spent the want rather than
earned it. **The door's job is now done well enough that the next surface is the weak link.**

### ★★ ITS EXPIRY, NAMED AT THE MOMENT IT WAS CHOSEN

**Builder, same breath:** *"this main menu version could only be viable as this product is
the main product or almost only product… it's a lot about the product actually and kinda
overshadowing blueroom itself, but could work briefly as it only first live with first
products."*

Correct, and this is the most valuable sentence about the door. **THE CLAIM is a LAUNCH
door, not a permanent one.** It buys conversion now by spending identity later: a stranger
leaves knowing what the Birth Reading is, and not necessarily knowing what Blue Room is.
With one product that is a good trade. With three it is a lie about the shape of the house.

★ **RECORD THE EXPIRY, because this is exactly how the current M1 became a shop** — a
reasonable temporary decision that nobody wrote an end date on. THE CLAIM is replaced when
EITHER of these becomes true:

1. **A third product ships.** The door recommends one of two today. A third turns a
   recommendation into a ranking, and a page built around one lit object cannot rank.
2. **Blue Room needs to be the thing people remember**, rather than the reading. The moment
   the brand has to carry more than the product — sharing, gifting, a second visit that is
   not about buying — the door has to introduce the house first.

**The cheap lever, if the balance needs shifting before then.** The structure does not have
to change. The first line — *"Two hundred and twenty-two marks are kept here"* — is already
the house; the second is the product. Giving the archive claim more weight and the product
less is a TUNING move inside the same design, not a redesign. Try that before replacing it.

### THE BIRTH READING PAGE — the brief that falls out

**The builder's proposed shape:** *"maybe button and price sleekly designed on the left, and
on the right a well made and designed in-depth info and about the reading that while looking
at it they actually want it anyway."*

That is the right structure, and one refinement is worth making before it is built:

★ **The ask must be PRESENT but never FIRST.** If the price sits at the top of the left
side it is the first thing read, and the page re-commits the door's mistake in a new
position. The fix is not to move it — it is to make the left side **persistent rather than
primary**: a compact, quiet commit column that stays with the visitor as the right side is
read, so the ask is always one glance away and never chasing them. The want is created on
the right; the left is simply always there when it lands.

**What the page must do, in order of who it is for:**
1. **Continue the door's sentence, not restart it.** The door said six marks are already
   yours. This page shows those six and what reading them together means. A page that
   re-introduces the product breaks the one thing the door bought.
2. **Earn the ask before making it.** The depth is the persuasion; the price is a fact
   stated calmly beside it, not an event.
3. **Say what the money buys, verbatim.** ★ The single strongest idea from 273 agent-runs:
   quote real engine output rather than describing it. A page that shows the actual words
   cannot oversell them, and a visitor who has read a real closing block does not need to
   be convinced by prose.
4. **Never hide anything behind the purchase.** The anti-paywall law: paid is the reading
   developed deeper, never a better reading or a hidden worth.

★ **THIS IS WHERE `_m1-final.html` GOES.** That file — the six marks, the verbatim
specimens, the tiers, the closing block — is an excellent product page that was built at
the front door by mistake. It is not wasted work; it is work at the wrong address, and this
is the address.

## 10. STILL TO CORRECT

1. Is the flow in §4 right — especially whether READER → BUYER is one step or two, now
   that Birth is the recommended step rather than the deeper one?

Relates to `docs/ATLAS_GENERATED.md`, `_m1-builder-signal.md`, `docs/EMPTY_FRAME_V1.md`,
`docs/LAYOUT_LENSES_V1.md`.
