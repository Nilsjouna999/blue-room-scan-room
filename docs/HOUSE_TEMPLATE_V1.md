# THE HOUSE TEMPLATE — the frame every page wears, what goes in each, and what we already have

**Builder, 2026-08-14:** *"figure out house template then figure out what we want on each
page… and things we already have and how convert or starting to synth."*

> Companion to `docs/HOUSE_SHAPE_V1.md`, which settled the SHAPE (Blue Room is the main
> menu; the products hub is one level in; Love and Social are unmade wings). This file
> settles the FRAME, the CONTENTS, and the CONVERSION.

---

## PART 1 — THE FINDING: THE TEMPLATE ALREADY EXISTS, IN FRAGMENTS

Four things belong on every page in this house. **All four are built. Not one is on every
page.** Each was added the day a specific room was found to be missing it, and the house
rule was never written down — so every new room re-discovers the same four needs and solves
them locally.

| the part | built as | where it actually appears |
|---|---|---|
| **the mark + where you are** | `.brand` — ◆ BLUE ROOM + `.brand__sub` zone label | **the room view only.** `ZONE_LABELS` (`app.js:1163`) defines four zone names and the topbar renders in one of them |
| **the map** | THE ORBIT (`app.js:6802`) | mounted against `#menuView` — **the front door.** Inside a room there is no map |
| **the reference** | `#brCodexDock`, the orb | **6 rooms**, by an explicit `MISSING` list (`app.js:1171`) — a room is given codex access only once someone notices it lacks it |
| **the foot** | `u1foot` — *"One archive. Every door kept."* + ◆ | **U1 only** |

★★ **So the template is not a design job. It is a DECLARATION job.** Nothing new has to be
invented; four existing parts have to become universal, and the `MISSING`-list pattern — an
allow-list of rooms that get a thing — has to invert into a default that a room may opt out
of. An allow-list of rooms that get navigation is a guarantee that the next room will not
have any.

★ **The sharpest symptom:** from inside the Drawing Room or the Birth Reading, **there is no
map and no way to another room** — only a bespoke back link that was added per-room
(BR-S307 for the Profile, BR-S310 for Settings). The house is only navigable from its own
front door.

---

## PART 2 — THE TEMPLATE

Four fixed positions, one body contract. Same on every page in the house.

```
┌──────────────────────────────────────────────────────────────┐
│  ◆ BLUE ROOM · <where you are>                    <back/up>  │   the frame — identical everywhere
│                                                              │
│                        THE BODY                              │   the only part that differs
│              eyebrow · title · lede · the page's own thing   │
│                                                              │
│  ◆ <the house line>                                          │   the foot
│  ⬤ map                                          ⬤ codex     │   the two orbs, opposite corners
└──────────────────────────────────────────────────────────────┘
```

### The four fixed parts

1. **TOP-LEFT — the mark, and where you are.** ◆ BLUE ROOM is always the way home, and the
   sub-label always names the current place. ★ This is the part that makes Blue Room the
   thing people remember: **the brand is the one element present on every surface**, and it
   is currently on one.
2. **TOP-RIGHT — the way back.** One control, always the same shape, always meaning *up one
   level*. Replaces three bespoke back links.
3. **BOTTOM-LEFT — the map.** The Orbit, from anywhere. It is the house's only surface that
   shows more than one destination, and it is currently reachable from one page.
4. **BOTTOM-RIGHT — the Codex orb.** The reference, from anywhere. One orb, position is the
   mode — see `docs/CODEX_ORB_V2.md`.

★ **Left is where you can go; right is what you can look up.** The two orbs already sit in
opposite corners (`styles.css:6079` notes both bottom corners are taken). That accident is
the rule worth keeping.

### The body contract

**eyebrow → title → lede → the page's own thing.** Every built surface already does this —
U1 (`u1head__eyebrow` / `__title` / `__ident`), the Profile, Settings. Writing it down stops
the fifth surface inventing a fourth arrangement.

### ★★ THE COLOUR LAW — PURPLE IS RESERVED

**Builder, 2026-08-14:** *"color purple is reserved for meaning paid or costs or price
related."*

Purple (`--violet #8b7bff`) may only appear where money is involved. Nowhere else, ever.

★ **The law is already half-kept, which is the good news** — it was being followed by
instinct in every place that actually handles money, and broken only where the colour
drifted:

| conforms | |
|---|---|
| `.about__nugget.is-paid` (`styles.css:3088-3096`) | the paid nugget, its emblem, its door |
| `.menu__reliq-door--enter` (`:3947`) | commented *"the paid/kept register — the only violet here"* |
| the Halo gradient (`--halo-a: var(--violet)`, `:380`) | the paid Halo Mint treatment |
| `.unlock__btn--shiny` (`:1568`) | the paid unlock |

| breaks the law | |
|---|---|
| ★ `#menuView.is-m1a .menu__codex__mark` (`:2710`) | the diamond on **every** pill — including *What's coming* and *Settings*, which are free. The site's price colour is sitting on its two cheapest links |

★ **And someone already caught the drift locally without naming the rule.**
`styles.css:3890` reads `.menu__draw-rail .menu__codex__mark { color: var(--silver-dim); }`
with the comment *"kill the app-wide violet mark drift"* — a local patch for a global law
that had not been written. Writing the law turns that patch into the default.

**THE ONE OPEN QUESTION: does "Kept" count?** `.menu__draw-kept` (`:3887`) colours the word
*kept* violet, and `:3947` bundles "paid/kept" as one register. But *kept* means ownership,
not price. Two readings, and it decides several places at once:

- **strict** — purple is money only. *Kept* goes neutral or gold, and purple appears only on
  a price, a paid door, or a paid treatment.
- **broad** — purple is the paid register, including what paying got you. *Kept* stays.

★ Also note: the paid tier's price is currently `$1.99–$7.99` in mono text with no colour at
all. If purple means price, **the prices themselves are the first thing that should wear
it** — the law is presently applied to everything around the number except the number.

### What the template deliberately does NOT fix

Colour, layout, density, and the shape of the body. The palette is closed
(`palette-fleet-next`); the ORIGINAL stays. This is a frame, not a redesign — and a frame
that also dictated the body would have re-run the M1 competition by other means.

---

## PART 3 — WHAT GOES ON EACH PAGE

Six kinds of page. The kind determines the body; the frame never changes.

| kind | its ONE job | body | fails when |
|---|---|---|---|
| **THE MENU** — Blue Room | say what this place is, and be remembered | the claim · the recommendation · one way in · one way to the map | it sells. Then it is a storefront wearing the house's name |
| **A HUB** — the products hub | show the shape of what is here | every product, ranked, each one line | it lists rooms that do not exist |
| **A PRODUCT PAGE** | say what one thing is, what it says, what it costs | ★ *persistent* commit column left · the depth right · verbatim engine output | the price is the first thing read |
| **A ROOM** | do the thing | the ceremony, and nothing else | it explains. Explaining was the product page's job |
| **A RECORD** | be the thing you kept | one reading printed at length | it argues for itself instead of being itself |
| **YOURS / THE REFERENCE** | hold what is yours · define every mark | the Shelf · the 222 | they try to sell. Neither ever has to |

★ **The one rule that spans all six** (from `POSITION_MAP` §1 and the 273-run finding):
**a page must be one kind.** Every failure in this repo's history is a page doing two jobs —
a product page at the front door, a hub in a door competition, U1 carrying identity *and*
the ledger.

---

## PART 4 — WHAT WE ALREADY HAVE, AND WHAT IT CONVERTS INTO

**Nothing built has to be thrown away.** Almost every surface from the M1 chain was made
well and filed at the wrong address; the shape now gives each one an address.

| the page | what becomes it | state of that source |
|---|---|---|
| **BLUE ROOM — the menu** | `_door1.html` **THE CLAIM**, tuned toward the house per `POSITION_MAP` §9's cheap lever, **plus U1's identity header** (*"Everything read here is yours to keep"* + the archive line), which is the house's best sentence and is currently one scroll below the door | door chosen; header shipped and in the wrong place |
| **the products hub** | ★ `_m1-team4.html` / `_m1-team5.html` — **the field designs**. `POSITION_MAP` §1: *"hubs that kept losing a door competition they were never suited for."* They were always hubs. This is the address | built, unplaced |
| **The Birth Reading — product page** | `_m1-final.html` — the six marks, the verbatim specimens, the tiers, the closing block. §9 already names this destination | built, excellent, unplaced |
| **Tarot — product page** | the Drawing Room's own landing (`drawing-room.js` `landingHTML`) — already tiers + prices | shipped, needs lifting out of the room |
| **The Card Mint — product page** | ★ **nothing exists.** L1's sealed desk is a placeholder for it | the gap |
| **the room** (each product) | `?dev=drawing-room` · `?dev=arcane` · the ceremony | shipped |
| **a record** | `_reading-page.html` v2 — one real record printed at length | rebuilt, **unsettled** |
| **the reference** | `codex.html` — THE CHAMBER | shipped |
| **yours** | `/profile/` | shipped |
| **★ U1** | **sheds identity, keeps the ledger.** Once the menu carries what Blue Room is, U1's remaining job is exactly what `/roadmap/` already resolves to: what is open and what is coming. **The U1-vs-hub question dissolves** — U1 is the roadmap, the hub is the products hub, and they were only competing because U1 was doing three jobs | shipped, over-loaded |

★★ **The synthesis, in one line:** *the door becomes the house, the field designs become the
hub, the final becomes the product page, and U1 gives up the identity it was holding for a
door that had not been built yet.* Four surfaces already exist; the work is re-addressing
them, not making them.

---

## PART 5 — WHERE TO START

The frame first, because it is the only thing that touches every page, and because it is
declaration rather than design.

| # | step | why here |
|---|---|---|
| 1 | **Declare the four parts and put them on every page.** Invert the `MISSING` allow-list into a default | Every page built after this inherits the house instead of re-solving it |
| 2 | Lift U1's identity header into the menu; tune THE CLAIM toward the house | Blue Room becomes the remembered thing — the ruling that started this |
| 3 | Re-address `_m1-team4/5` as the products hub and `_m1-final` as the Birth Reading page | Two finished surfaces stop being prototypes |
| 4 | The name strings — "The Forge" → "The Card Mint" (`HOUSE_SHAPE_V1` PART 4) | Cheap, and the split is live today |
| 5 | Then the Card Mint product page — the one real gap | It is a third of the product line with no page |

★ Steps 1–4 place or repair things that exist. **Only step 5 is new work**, and it is the
only place in the house where something is genuinely missing rather than mis-filed.

Relates to `docs/HOUSE_SHAPE_V1.md`, `docs/POSITION_MAP_V1.md`, `docs/CODEX_ORB_V2.md`,
`docs/SURFACE_BRIEF_V1.md`.
