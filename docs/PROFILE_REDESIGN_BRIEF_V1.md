# THE PROFILE — REDESIGN BRIEF v1

**Status:** written 2026-08-12, at BR-S372. This is a *data sheet*, not a design.
It exists so another assistant — GPT, a fresh Claude chat, a human designer — can
be handed one file and have everything needed to propose a superior final design
without reading 1,200 lines of source or guessing at house rules.

**Read this first, then `arcana-profile.js` (520 lines) and `arcana-profile.css`
(683 lines).** Nothing in this document is a decision. §9 is the issue list; §10
is the set of questions the redesign has to answer.

---

## 1. WHAT A PROFILE *IS* IN BLUE ROOM

Blue Room is an archive that draws readings and files each one on a page of its
own. It is not a social network and not a dashboard. So the profile is **not a
settings screen and not a feed** — it is the page that answers *"what do I hold
here?"*

Three facts constrain everything:

1. **There are no accounts.** Nothing is signed up for. Everything "kept" lives in
   one browser's `localStorage` and cannot travel to another screen. Accounts are
   planned ("Your shelf, on any screen", state `drawn`), not built.
2. **Nothing is charged yet.** There is no payment path anywhere in the build. The
   profile shows prices only by linking to rooms that name them.
3. **The page is almost entirely empty for a real visitor.** No minted cards, no
   rings, no chosen showcase slots. One crown, if they took a reading. §9 treats
   this as the central design problem, not an edge case.

### The structure the builder has settled (BR-S372)

```
YOUR PROFILE                    <- the page. the whole thing.
  who you are                   <- above the line
  ─── YOUR SHELF ───            <- one rule, one word, no heading
  everything below              <- what you hold
      The Vault                 <- crowns + rings. named once, linked from nowhere.
      Minted cards
      Showcase
      Friends
      The Rooms
      Share Blue Room
```

**The Shelf is inside the Profile, not beside it.** This was wrong until BR-S371:
"The Shelf" was the name of the whole third menu panel, its door, its ribbon and
its registry entry. The profile is the place; the shelf is the half of it below
the line; the Vault is one drawer on that shelf.

**The Vault is deliberately unmarketed.** No door leads to it, nothing announces
it, and the word appears exactly once — as the name of the drawer. A place you
find by having something in it.

---

## 2. WHERE THE PAGE SITS

| | |
|---|---|
| Route | `?dev=profile` — no real address yet (`/tarot/`, `/reading/`, `/about/`, `/roadmap/` have one) |
| Reached from | M2's rail pill "Your Profile — kept" · the M3 panel door · U1's door **I** · the ROOMS orbit |
| Renders into | `#devView` via `app.js` `mountDev()` → `window.BRArcanaProfile.mount(host)` |
| Ships publicly | Yes — `profile` is in `PUBLIC_ROOMS` in `build_public.py` and `gate_public.py` |
| Files | `arcana-profile.js` (all markup + wiring) · `arcana-profile.css` |
| Data | One `SEEKER` mock object at the top of the JS. No fetch, no storage, no backend. |

---

## 3. THE PAGE AS IT STANDS — every section, and why it exists

Order is the render order in `render()` (`arcana-profile.js:359`).

### 3.1 `headerHTML()` — the masthead
Wordmark `◆ Blue Room` + `← Main Menu`. **Both are the same door** (`data-door="menu"`).
*Why two:* BR-S307 — the wordmark alone was the only exit and a wordmark does not
read as a back, so a first-time reader saw no way out at all. One exit, two faces.

### 3.2 `surfaceHTML()` — "above ground"
The identity line (avatar · display name · handle · birthplace · birth date), then
the **crowned name** as the largest type on the page, then its **spine** (the six
systems that composed it) in quiet mono, then the **crown**.

The crown is the one object on the page with real object-depth: a forged heraldic
SVG whose **points** = inputs provided and whose **gems set in the band** = readings
held. It is *also the button into your reading*. Below it: a provenance line, a
filed date + reading id, and "Open this reading →".

*Empty variant:* "No crown yet / draw a reading" + "Draw your Birth Reading · $4.99 →".

### 3.3 The shelf line
`YOUR SHELF` between two gold rules. Carries the page's only structural division.

### 3.4 `vaultHTML()` — **The Vault**
Two ruled rows — **Crowns** (the crowned name, or "None borne yet") and **Rings**
("A ring is earned by reading for someone close — none set yet") — plus the
**"Read for someone / choose who →"** control, which opens a menu of 12 relations
(Mother, Father, Sister, Brother, Grandmother, Grandfather, Aunt, Uncle, Cousin,
Partner, Child, Friend).

### 3.5 `mintedHTML()` — **Minted cards**, noted "not open yet"
Renders minted cards; there are none and minting is not built, so the body is a
single line: "Minted cards are filed here. None yet."

### 3.6 `showcaseHTML()` — **Showcase**
Three slots you fill from a menu of your own reading results (Reading, Sun sign,
Year animal, Life path, Rune) or your minted cards. All three are empty by default.

### 3.7 `friendsHTML()` — **Friends**
"A quiet register of people — not a feed." Two mock rows, each with an avatar, a
name, a crown (or "no crown yet") and a visibility setting (`friends` / `everyone`).

### 3.8 `roomsHTML()` — **The Rooms**
Four doors: The Birth Reading · The Drawing Room · The Reading · The Codex.

### 3.9 `referralHTML()` — **Share Blue Room**
A single door bar, not a section: "A quiet door to the referral programme — not
open yet."

### 3.10 Footer
"A reflective record, for insight, not instruction. Nothing here is medical,
legal, or financial counsel. You decide what to do with it."

---

## 4. COMPLETE CONTROL INVENTORY

Everything a visitor can click. **Every one of these is `href="#"` plus a
`data-` attribute** handled by one delegated listener in `wire()` — there are no
real hrefs on this page except none at all.

| # | Control | Element | Hook | Does |
|---|---|---|---|---|
| 1 | `◆ Blue Room` wordmark | `<a>` | `data-door="menu"` | back to Main Menu |
| 2 | `← Main Menu` | `<a>` | `data-door="menu"` | same door as #1 |
| 3 | The crown | `<button>` | `data-open-reading` | opens your reading |
| 4 | `Open this reading →` | `<a>` | `data-open-reading` | same as #3 |
| 5 | *(empty)* crown | `<button>` | `data-draw="self"` | to the intake |
| 6 | *(empty)* `Draw your Birth Reading · $4.99 →` | `<a>` | `data-draw="self"` | same as #5 |
| 7 | `+ Read for someone / choose who →` | `<button>` | `data-relpick` | opens the relations menu |
| 8 | 12 × relation | `<button>` | `data-rel-choice` | to the intake, for that person |
| 9 | 3 × showcase slot | `<button>` | `data-showpick` | opens the "choose what to feature" menu |
| 10 | n × feature option | `<button>` | `data-show-choose` | fills that slot |
| 11 | 2 × friend row | `<a>` | — | *(see §9 — check whether these are live)* |
| 12 | 4 × room door | `<a>` | `data-door` | to that room |
| 13 | `Share Blue Room` | `<a>` | `data-action="referral"` | inert — "not open yet" |

**Pairs that do the same thing:** #1/#2, #3/#4, #5/#6. Each pair is deliberate and
documented; whether three such pairs on one page is still deliberate is a design
question, not a bug.

---

## 5. WHAT IS ON THIS PAGE THAT IS A PRODUCT

| Thing | State in the build | On this page as |
|---|---|---|
| The Birth Reading | **live**, $4.99 / $7.99 for two | the crown, the crowned name, "Open this reading", a room door |
| Reading for someone else | **live** (the Concord) | the "Read for someone" control + 12 relations |
| The Drawing Room (tarot) | **live**, first sitting free | a room door |
| The Codex | **live**, free | a room door |
| The Card Mint | **not built** — nothing reads a photograph | the "Minted cards — not open yet" section |
| Rings | **not built** | a Vault row saying none are set |
| Showcase | **built**, but only fillable from a reading you already have | three empty slots |
| Friends | **mock only** — no accounts, no way to add anyone | two placeholder rows |
| Referral | **not built** | a door bar saying not open yet |

**Four of nine things on this page are announcements that something is not open.**
See §9.

---

## 6. WHAT IS COMING THAT LANDS HERE

From the single room registry (`ROOMS` in `app.js`, the source of truth for U1 and
the roadmap). Each of these changes this page:

| Coming | State | What it adds to the profile |
|---|---|---|
| **The Card Mint** | `drawn` | fills Minted cards; makes the Showcase's card option real |
| **The Codex, opened by your reading** | `drawn` | a reason to return; possibly a section of unlocked marks |
| **Your shelf, on any screen** (accounts) | `drawn` | identity stops being a mock; Friends becomes possible; everything above becomes portable |
| **A reading you can show someone** | `drawn` | a share surface — likely a *view* of this page, or a page derived from it |
| **The Workshop** (the wheels) | `drawn` | possibly a room door; possibly things you keep |
| **Games for a table** | `named` | the unit is a GROUP, not a reader — may not belong on a personal profile at all |
| **Everything about two people** | `named` | rings and the Concord get a wing; the Vault's Rings row may move |
| **Payment** | internal, at launch | prices become real; "not open yet" notes disappear |

**The structural question this raises:** the profile currently has 6 sections for
1 real product. When the Mint, the unlock, accounts and sharing land, it needs to
hold roughly double — with no new organising principle. See §10.

---

## 7. THE CONSTRAINTS — house canon, not preferences

Anything proposed must satisfy these. They are decided.

1. **The four-register colour law.** Gold + warm grey belong here. Violet is
   reserved for commerce and is *supposed* to be absent from this page — commerce
   lives in the room, not the hub.
   ★ **THE CODE DOES NOT HONOUR THIS, and I asserted it here before checking.**
   The audit (§9 #3, #4) found `--pf-violet` consumed at `arcana-profile.css:91,
   94, 149`, `pf-paid` emitted unconditionally by `vaultHTML()`, and the empty
   crown carrying a literal `$4.99`. Four comments in two files claim the
   opposite. So the law is the intent; the page is in violation; and the first
   thing a redesign must decide is whether the hub legitimately carries a paid
   control at all.
2. **Type:** Cormorant Garamond for voice and display; IBM Plex Mono for meta,
   labels and provenance. Mono is loaded at **400/500 only** — 600+ is faux-bolded
   and looks wrong.
3. **Ground:** near-black `#0a0b0d`. Not pure black.
4. **Small text owes 4.5:1**, UI and large text 3:1. This repo has shipped
   contrast failures repeatedly; compute, do not eyeball.
5. **No dates on anything forward-looking.** Not a stylistic choice — the builder's
   rule.
6. **The voice is deliberate and literary.** Do not propose flattening it. Do
   propose cutting anything that describes an absence instead of a thing.
7. **Front-facing copy says what a visitor GETS**, never how it is built.
8. **The crown is the one object with real depth.** Everything else is flat,
   ruled, archival. Do not add a second hero object.
9. **One registry.** If a fact about a room appears on this page, it should come
   from `ROOMS` in `app.js`, not a second copy.
10. **Reduced motion must be honoured**, and the page must work at 375px.

### The palette actually in use

```
--pf-gold         #a2864a    muted antique gold (dimmed from #c9a35c as too bright)
--pf-gold-lit     #c0a05d
--pf-cream        #e9e5dc    <-- see §9: the house display ink moved to #dcd7cb
--pf-cream-display #dcd6c9
--pf-crown        #e0dacd
--pf-room         #0a0b0d
--pf-tab-bg       #0c0d11
--pf-line         rgba(201,163,92,.13)
--pf-line-soft    rgba(201,163,92,.07)
--pf-line-cut     rgba(201,163,92,.22)
--pf-body         #b1ada4
--pf-meta         #9c9790
--pf-ghost        #96918a
--pf-violet       #8a6fb0    defined, unused, on purpose
```

---

## 8. THE BIGGEST I§UES, stated plainly

These are the ones a redesign must solve. The full ranked list is §9.

**A. The page is mostly a list of things you do not have.** Minted cards: none.
Rings: none. Showcase: three empty slots. Friends: two placeholders you cannot
add to. Referral: not open. For a visitor who has taken one reading, roughly two
thirds of the page is an apology. The roadmap next door had exactly this fault
and it was the whole reason it read as internal.

**B. Six sections for one real product.** The architecture was built for a fuller
product than exists, so it renders as scaffolding.

**C. Every link is `href="#"`.** The page has no real addresses in it, and no
address of its own — every other product room has one (`/tarot/`, `/reading/`).

**D. Three pairs of controls that do the same thing**, on a page with few controls.

**E. It has its own copy of the house palette.** `--pf-cream: #e9e5dc` is the
value the rest of the building moved *away* from in BR-S371. Two owners of one
truth — the exact pattern this repo keeps being bitten by.

**F. The default state of the page cannot be rendered.** `SEEKER.crown_record.
result_count` is a literal `3` that nothing mutates, so `taken` is constant-true and
the empty branch — which holds the page's only price, its only violet, its dimmest
text and every "none yet" line — has never been looked at. `br_holdings` already
exists as the switch and is written by the M3 toggle, but this page never reads it.
This is the audit's root cause #2 and it explains most of §9.

**G. Nothing here comes from the room registry.** "The Rooms" hardcodes four rooms
and their descriptions; the registry already holds that data with states and
copy. They will drift.

---

## 9. THE RANKED I§UE LIST

> ## ★ STATUS — CLOSED, BR-S374 → BR-S388 (2026-08-12)
>
> **All 27 are accounted for: 26 fixed, 1 withdrawn as a false finding.**
> Verified by re-reading the source for each entry's own signature, not by trusting
> the commit log — an intermediate tally in that run said "4 remaining" and was wrong
> in the safe direction, which is exactly why the audit was re-run against the files.
>
> | Fixed in | Entries |
> |---|---|
> | BR-S374 | 10, 17, 19 |
> | BR-S375 | 2, 27 |
> | BR-S382 | 5, 11, 23, 24, 25 |
> | BR-S384 | 3, 4, 7, 16, 18 |
> | BR-S386 | 9, 13, 14, 15, 21 |
> | BR-S387 | 1, 6, 8, 12, 22 |
> | BR-S388 | 20 |
> | **withdrawn** | **26 — false; `.dr-tier--paid` is live in `drawing-room.js`** |
>
> **Two divergences from the prescribed fixes, both deliberate and both reversible:**
> - **#3** kept the violet and removed only the price. Stripping the violet as well
>   makes the law inconsistent three sections down, because "Read for someone" is also
>   a paid door and wears the same mark — the hub would then have one paid control
>   announced and one disguised. Violet marks a door onto a purchase; the PRICE was
>   what did the selling.
> - **#20** moved only the 30 `.pf-*` rules. The 16 `.dr-*` rules in the same
>   stylesheet belong to the Drawing Room, which is the very confusion that made #26
>   false.
>
> **What the fixing found that the audit did not:** #26 was wrong (a stylesheet is not
> owned by the script sharing its name); the four false colour-law comments in #4 were
> compounding, because that law is audited by READING them; and a new control added
> while fixing #9 shipped with no handler — defect #21 verbatim, reintroduced three
> fixes later and caught only by pressing it in a browser.
>
> §10 (the questions the redesign must answer) is untouched by any of this. This list
> was the page's defects, not its design.



*(filled from a 9-lens read-only audit, each finding adversarially verified
against the source before it was allowed to count — see the section below.)*

**How this list was made.** Nine read-only lenses over `arcana-profile.js`, `arcana-profile.css` and their neighbours — structure, naming, spacing, typography, colour, continuity, copy, interaction, accessibility, the empty state, and what breaks as the page fills. 91 findings were filed; each was then handed to a separate agent told to REFUTE it and to default to false unless it could reproduce the reasoning from the source. 32 survived; merging duplicates across lenses left **27**. Every entry below carries a file and a line and was verified twice.

# PROFILE / HUB — RANKED REDESIGN BRIEF

32 findings in, **27 out**: five clusters were duplicates across lenses and were merged (the violet/price comment lies ×4, the "Shelf names N things" ×3, the crown-gem miscount ×2, the showcase write-once ×2, the `.pf-vault` / "Rings" stale-naming pair). Nothing was cut for space — 27 is what survived merging. Ranked by damage to a real visitor first, then to the next editor.

---

**1. "The Shelf" names three different things at two different URLs** [naming · high]
`settings.js` links "The Shelf →" at `?dev=profile`; `arcana-profile.js:369` narrows the name to that page's lower half (`<span class="pf-shelfline__lab">Your Shelf</span>`); and a wholly separate page at `?dev=vault` is titled `<h1 class="pf-vaulttitle">The Shelf</h1>` (`app.js:4691`). Worse, "vault" is crossed: the URL slugged `vault` holds minted cards, while `section("The Vault", …)` (`arcana-profile.js:249`) holds crowns and rings — and both surfaces share the `pf-vault*` class prefix. · `settings.js:89`, `app.js:4691`, `arcana-profile.js:249,369` · A visitor cannot form a stable map; the two surfaces even state the same sentence about opposite content ("Saved minted cards are filed here" vs "Minted cards are filed here. None yet."). BR-S353 fixed the section-vs-page half and left this. · **Fix:** one referent for Shelf, one for Vault, across three files. Cut the `?dev=vault`-titled-"The Shelf" knot first — it is a single-mint display, not a shelf.

**2. The empty state is a code branch nobody can look at** [empty-state · high]
`var c = SEEKER.crown_record, taken = c && c.result_count > 0;` (`:166`) is constant-true because `result_count: 3` is a literal nothing mutates, and the file reads no localStorage or query flag. · `arcana-profile.js:54,166` · The state almost every first visitor meets — no crown, nothing on the shelf — is the one state the builder cannot see, so it is being designed blind. Findings 3, 4, 10 and 11 all live in that unseen branch. · **Fix:** `?dev=profile&empty=1` or a second SEEKER fixture, reviewed at the same cadence as the filled page.

**3. The new visitor's hero carries a price and the commerce violet** [colour · high]
The no-crown branch renders `>Draw your Birth Reading &middot; $4.99 &rarr;</a>` with `class="pf-crownbtn pf-crownbtn--empty pf-paid"`, and `.pf-crown-empty` is painted `border: 1px dashed var(--pf-violet-line)`. · `arcana-profile.js:204,209`; `arcana-profile.css:83,92` · The one visitor who has bought nothing is the only one shown a price tag on their own profile, and the reserved fourth register appears exactly where the page swears it is absent. Directly contradicts `arcana-profile.js:326`, "Commerce is not shown on the hub — price lives in the room." M2 already removed price lines from doors on that principle. · **Fix:** make the empty crown a plain warm-grey door into the Birth Reading; let the figure live in the room behind it.

**4. Four comments in two files deny the violet and the price that ship** [colour · high]
`arcana-profile.js:12-16` ("No hub-side price, modal, or violet remains" / "violet reserved for commerce, absent by design") and `arcana-profile.css:30` (`--pf-violet: #8a6fb0; /* commerce register — defined, unused here */`) are false: the token is consumed at css:91, 94, 149, and `vaultHTML()` **unconditionally** emits `class="pf-mini pf-mini--add pf-paid"` (`js:224`) on every visit. `css:13` and `css:89` state the opposite of `css:30`, so the two files disagree about the page's most load-bearing colour rule. · `arcana-profile.js:12`; `arcana-profile.css:30` · The four-register law is audited by reading these comments; the next reviewer stops looking, or strips a register the C§ header calls intentional. · **Fix:** decide whether the hub legitimately carries a paid control, then make exactly one comment authoritative and delete the other three.

**5. The crown says it holds three readings; there is one** [copy · high]
`'<p class="pf-prov">' + gems + ' gems set — one for each reading it holds.</p>'` where `gems = c.result_count` — a field *inside* one reading record (one `reading_id`, one `created_at`). Repeated in the aria-label `"Crown holding " + gems + " readings"` (`:195`) and in the empty-state promise (`:208`). · `arcana-profile.js:195,198,208` · The largest object on the page announces three readings while the Vault below prints one crown and the Showcase says "your reading", singular. The count will not move when the visitor takes their second reading — the mechanic reads as broken. Canon (`docs/BR-ARCANA-HANDOFF-PROFILE-HUB-AND-DIAGRAMS.md:73`) specifies "this crown holds N results". · **Fix:** say one per *mark drawn*, and make caption, aria-label and empty-state promise agree.

**6. The Shelf rule annexes the exit doors and the referral programme** [structure · high]
`/* BR-S372 — THE LINE. Above it is who you are; everything below it is your` — but `render()` emits vault, minted, showcase, friends, **rooms** and **referral** after it, and `roomsHTML()`'s own comment assumes the opposite ("The Shelf has its own section above, so it is not repeated here"). · `arcana-profile.js:359-380` · The separator carries `role="separator" aria-label="Your Shelf"`, so the announced boundary is wrong for AT users — and for a new visitor the doors and referral are the *only* populated content under the label, making it read as false precisely when the page is emptiest. · **Fix:** close the Shelf after Vault/Minted/Showcase; rooms, referral and footer sit outside it.

**7. The Shelf label is the brightest gold on a page whose law names one gold object** [colour · medium]
`color: var(--pf-gold-lit, #c9a35c);` on `.pf-shelfline__lab` — the only statically gold text left after the gold-law block (css:222-228) demoted nine classes to `--pf-meta`. `--pf-gold-lit` is brighter than `--pf-gold`, and is otherwise the **focus-ring** colour (css:43), so a static element permanently wears focus. The `#c9a35c` fallback resurrects the value css:17 explicitly rejected as "too bright". · `arcana-profile.css:673` · Both css:665 and js:365 call it "one quiet word" while the paint makes it the loudest word on the page, sitting directly under the crown the header calls "the ONE gold object". · **Fix:** `--pf-meta`, like every other section label; let the rule carry the division. Drop the fallback.

**8. The referral door outranks every working door and, when empty, the visitor's name** [typography · high]
`.pf-doorbar__t { … font-weight: 600; font-size: 21px; … }` vs room doors at 18px/400 (css:307) and the identity chip at 19px/600 (css:216). · `arcana-profile.css:108` · The loudest door label on the page belongs to the one door that goes nowhere — `referralHTML()` says "not open yet" and its handler returns "(Mocked.)" (`js:349,488`). In the empty state the crowned name is gated off (`js:180`), leaving "Share Blue Room" as the biggest door label a new visitor sees. Bonus editor-trap: css:97 calls `.pf-doorbar` a "shared in-body door bar — every door speaks one language", but all 7 occurrences are inside `referralHTML()`. · **Fix:** one door level, one size, one weight; reserve the step above for identity.

**9. A showcase slot can be changed but never emptied** [interaction · medium]
`slot.chosen = {…}` (`:475`) is the only writer; nothing restores null, and the picker offers no remove. `showcaseHTML()` renders only the *first* unfilled slot (`:298`), so the Showcase is monotonic. · `arcana-profile.js:295,298,475` · Fill three and the invite vanishes for good; the calm empty state this design is built around becomes unreachable after three clicks. The only escape is a reload, which wipes everything — undiscoverable now, an outright trap once state persists. · **Fix:** a clear entry at the foot of `pickMenu` that sets `chosen = null` and re-renders.

**10. The empty state's only sentence is the page's only sub-AA text** [colour · medium]
`.pf-vaultrow--empty .pf-vaultrow__v { color: #7c766c; font-style: italic; }` at inherited 17px (normal text; large starts 18.66px) → 4.37:1 bare, 4.26:1 over the section wash, ~4.15:1 under the lamp. All fail 4.5:1. · `arcana-profile.css:683` · Every other tier passes comfortably (`--pf-body` 8.8:1, `--pf-meta` 6.79:1, `--pf-ghost` 6.29:1). This one hardcoded literal sits 30% below the page's own dimmest token — and it renders "None borne yet.", the first thing a real new visitor reads in the Vault. Two prior passes explicitly lifted small text *into* the ghost tier. · **Fix:** `var(--pf-ghost)`. Nothing on this page goes below it.

**11. The Rings row is a hardcoded sentence that styles its empty state louder than the real one** [future-fit · high]
`var ringrow = '<div class="pf-vaultrow"><span class="pf-vaultrow__k">Rings</span>' + '<span class="pf-vaultrow__v">A ring is earned by reading for someone close &mdash; none set yet.</span></div>';` — no `pf-vaultrow--empty` class despite declaring itself empty. · `arcana-profile.js:247` · In the same box, the Crowns empty state is dim italic `#7c766c` while the Rings empty state renders full-weight roman `#c8c4bb`: the emptier row is the louder one. Forward: the paid "Read for someone" control sits directly beneath, and the first time it works the row above still asserts "none set yet". `vault_slots: 4` (`:58`) is the only ring-shaped field and nothing reads it. · **Fix:** a real rings array in SEEKER; branch the row the way Crowns already does.

**12. `crown_record` models a collection the page can only answer in the singular** [future-fit · high]
`result_count: 3, created_at: "2026-07-09", is_current: true` — one object, one `reading_id`, no readings list anywhere; `is_current` has no reader and no sibling. · `arcana-profile.js:54` · The page counts three and lets you open one (`data-open-reading="' + esc(c.reading_id) + '"`, `:200`). Several readings is the ordinary state of a returning customer, and ordering/pinning/history is answered nowhere — so it becomes a restructure of hero + Vault + Showcase, not an added section. The next backend engineer will either honour a flag nothing consumes or delete a field they cannot tell is load-bearing. · **Fix:** make `crown_record` a pointer into a readings array now, so the second reading is an append.

**13. Friend rows are links with nothing to say they open** [interaction · medium]
`.pf-friend { display: flex; … text-decoration: none; color: inherit; }` — no `:hover`, no transition, rendered as `<a … data-action="view-friend">`. · `arcana-profile.css:193`; `arcana-profile.js:313` · The page's only inert clickable rows. `.pf-roomdoor` lifts a background, nudges its arrow and lifts its name; the lede promises "Open a friend to see their profile" and the row gives no sign it can be. Focus IS already handled page-wide (css:43) — **do not** copy the neighbours' `outline: none`. · **Fix:** hover only, matched to `.pf-roomdoor`.

**14. Filling a showcase slot throws keyboard focus to `<body>`** [a11y · medium]
`if (sec) { var tmp = document.createElement("div"); tmp.innerHTML = showcaseHTML(); sec.replaceWith(tmp.firstChild); }` destroys the `role="menuitem"` button the user just activated — unconditionally, even when `slot` is undefined (`:474`). · `arcana-profile.js:478` · A keyboard visitor tabs several controls deep, picks, and restarts from the top of the document — three times over to fill the showcase. Same on the relation choice. Cost grows with every minted card added to `pickMenu`. · **Fix:** after re-render, move focus to the filled slot's button or the next empty slot.

**15. `role="menu"` is declared; none of its keyboard contract exists** [a11y · medium]
`'<div class="pf-relmenu" role="menu" aria-label="Who is this reading for" hidden>'` — plus `role="menuitem"` on twelve buttons — while `wire()`'s only keydown is `if (ev.key === "Escape") closeMenus(null)` (`:495`), bound to the profile root, not the document. No `.focus()` call anywhere, no arrow/Home/End, no focus return. Both containers also hold non-menuitem children (`.pf-relmenu__h`, `.pf-pickmenu__h`). · `arcana-profile.js:229,281` · The role promises a composite widget the code does not honour — worse than no role at all. · **Fix (narrow):** drop `role="menu"`/`"menuitem"`, keep `aria-expanded`; the items are native `<button>`s already in the tab order.

**16. The Codex door is 126 cache-bust versions behind every other caller** [system · high]
`location.href = "codex.html?v=237"` while all thirteen callers in `app.js` carry `?v=363`. The trailing comment asserts an invariant that is now false twice — this caller is stale, and `settings.js:506` carries no version token at all. · `arcana-profile.js:416` · A visitor entering the Codex *from their own hub* can be served a cached build older than the one every other door opens. · **Fix:** point the door at the registry href, so one bump updates every caller.

**17. The Vault's "Read for someone" box lands flush on the Rings hairline** [spacing · high]
`.pf-family { display: flex; flex-wrap: wrap; gap: 14px; }` — an inter-item gap does nothing to its own outer edge; `.pf-vaultbox` is a plain block with no gap; the preceding `.pf-vaultrow` ends in `border-bottom: 1px solid rgba(233,229,220,.07)`. · `arcana-profile.css:131,678` · A dashed 128px box stacks its top border on a hairline rule — the one place on the page where two drawn edges meet with no air, while every other row on the page separates with 12-13px padding. It gets worse when real rings sit beside the add-box. · **Fix:** top margin on `.pf-family` inside the box, on the vault rows' own 12px unit.

**18. The Minted section closes 20px lower than every other section** [spacing · medium]
`var body = cards ? '…' : "";` — the only section that renders a lede with no body, and `.pf-lede`'s `margin: 2px 0 20px` has no `:last-child` reset while `.pf-sec`'s left padding blocks collapse. · `arcana-profile.js:261` · A single-section break in the page's vertical rhythm; the emptiest section looks like the one with content clipped out of it. (The "44px" in the original filing overstates: 24px is the standard section padding.) · **Fix:** `.pf-lede:last-child { margin-bottom: 0 }`, which also covers every future conditionally-empty section.

**19. The Shelf line's own margins are inert in every viewport** [spacing · high]
`.pf-shelfline { … margin: 40px 0 30px; }` — both sides collapse against larger clamped neighbours: `.pf-crownstage`'s `margin-bottom: clamp(44px, 9vh, 96px)` collapses through the padding-less `.pf-surface` above, and `.pf-sec`'s `clamp(32px, 5.5vh, 52px)` wins below. · `arcana-profile.css:668` · Real air is 44-96px above and 32-52px below — the *reverse* of the declared asymmetry, so the words YOUR SHELF sit nearer the identity they are not labelling. An editor tuning the page's most important division will change these two numbers and see nothing happen. · **Fix:** put the line on the same clamp family as its neighbours, or make the containers non-collapsing so the declared asymmetry renders.

**20. The mono register is eight sizes and twelve trackings, not a scale** [typography · high]
8 / 8.5 / 9 / 9.5 / 10 / 10.5 / 11px plus a stray 15px, across .04–.28em. The concrete failure: `.pf-friend__crown` (9px/.12em) and `.pf-friend__vis` (10px/.08em) are adjacent siblings in the same `<a>` — identical family, case and colour, differing by 1px and .04em — and BR-S180's `.pf-friend__n { flex: 0 1 auto; }` removed the gap that used to hide it. · `arcana-profile.css:197` · Differences this small carry no rank, so it is pure noise; every new element added as the page fills invents a ninth value because there is no ladder to snap to. · **Fix:** three named steps (label / meta / micro), one tracking each, as tokens beside `--pf-mono`.

**21. The minted card is a `<div>` in a full button costume with no handler** [interaction · high]
`return '<div class="pf-card">…'` — no `data-*`, no `tabindex`, no `role` — while css:154-156 give it `cursor: pointer`, a gold `:hover` border and `:active { transform: translateY(1px) }`. The delegated handler matches eight `data-*` hooks, none of them present. · `arcana-profile.js:256` · Invisible today (`minted_cards: []`), which means the failure arrives on the exact day the section fills: the first minted card presses down and does nothing, and is keyboard-inaccessible. `.pf-card:focus-visible` is permanently dead C§. Every sibling control (`pf-slot`, `pf-mini--add`) is a real `<button>` with a hook, so an editor will assume this one is too. · **Fix:** a real `<button>`/`<a>` with an action and an accessible name, or strip the costume.

**22. Minted options escape the pick menu's only spacing rule** [structure · high]
`'<div class="pf-pickmenu__h">Minted cards</div>' + mintOpts +` — emitted bare, while the reading options are wrapped in `.pf-pickmenu__grid`, the sole source of the 5px column gap. · `arcana-profile.js:284` · Latent: today `mintOpts` is a styled `<p>`. The day minting ships, the second half of every picker loses its gap and the two lists in one menu stop looking like one list. The sibling rule `.pf-pickmenu__grid + .pf-pickmenu__h { margin-top: 14px }` keys off the wrapper too. · **Fix:** wrap `mintOpts` in the same grid; keep the empty `<p>` outside.

**23. `.pf-vault` does not belong to The Vault** [naming · medium]
`/* the vault */` heads `.pf-vault`/`.pf-cards`/`.pf-card*` (css:151-163) — consumed only by `mintedHTML()`. The real Vault uses `.pf-vaultbox`/`.pf-vaultrow` (css:677-683). · `arcana-profile.css:151` · An editor told to "style the Vault" greps `vault`, hits this comment first, and edits the *adjacent* Minted section — a mistake that will look plausible on screen. It also collides with the real Vault's namespace and breaks the file's own stated rule that "Vault" appears exactly once (js:239-240). · **Fix:** rename to the minted register; reserve `pf-vault*` for the Vault.

**24. The Vault section and its C§ are still labelled "Rings", against a dead spec section** [naming · medium]
`/* ---------- Rings — family + friend crowns (§3.4) ---------- */` heads `vaultHTML()`, which returns `section("The Vault", …)` with two rows and a paid picker; `arcana-profile.css:130` repeats it. Also stale in the same cluster: js:56-57, "Rings section is only the 'read for someone' box now (no example rings)" and "The Shelf is minted-card slots only … (real vault not built)" — both now false. · `arcana-profile.js:216` · The section carries two competing names in source and a third on screen, and `§3.4` points at a spec that no longer describes what renders. · **Fix:** retitle both comments; drop or re-point the spec numbers.

**25. The newest block invents five colours outside the token set** [system · medium]
`… text-transform: uppercase; color: #8c867b; }` plus `#c8c4bb`, `#7c766c` and two raw border rgba()s. Its structural peer `.pf-card__k` uses `var(--pf-ghost)` at the same .18em, and css:344 later retunes that whole class *through the token*. · `arcana-profile.css:677-683` · The palette exists so a colour can be retuned in one place — three passes have done exactly that. These five values are invisible to that mechanism, which is how the sub-AA grey in #10 got in. Measured, they extend the ramp: `#8c867b` L*56.1 and `#7c766c` L*49.9 sit below `--pf-ghost` L*60.4, and `#c8c4bb` L*79.2 is a fourth cream. The same lines also reach for `var(--font-mono, …)` instead of `--pf-mono` — they resolve, but confirm the block was written against a different vocabulary than the file it lives in. · **Fix:** map all five onto tokens; if a tier is genuinely missing, add it at the top, not as a literal 660 lines down.

**26. ~~The removed modal left its violet stylesheet behind~~ — FALSE FINDING (BR-S382)** [system · low]

> **This one is wrong and must not be acted on.** `.dr-tier--paid` and `.dr-cut--paid`
> are LIVE: `drawing-room.js` emits both — see `tierDoor()`, which writes
> `class="dr-tier dr-tier--paid"` on a paid door, and the matching cut markup beside
> it. The original check grepped only `arcana-profile.js`, concluded "no `dr-` string
> exists anywhere", and read a stylesheet's scope as its owner's. Deleting these 18
> lines would strip the Drawing Room's paid tier of its violet.
> **The lesson generalises:** a stylesheet is not owned by the script that shares its
> name. Search every emitter before calling C§ dead. Original text follows.

**26. The removed modal left its violet stylesheet behind** [system · low]
`.dr-tier--paid` / `.dr-cut--paid` and the comment "PAID cut — the mock settle (BR-S190): violet price on the button (pf-paid register)" match no markup — no `dr-` string exists anywhere in `arcana-profile.js`. · `arcana-profile.css:520-537` · 18 lines of dead violet C§ that make the violet audit harder and imply a component that no longer exists. · **Fix:** delete.

**27. `br_holdings` is written by the M3 toggle and read by nobody** [system · medium]
`try { st === "profile" ? localStorage.setItem("br_holdings", "1") : localStorage.removeItem("br_holdings"); } catch (_) {}` (`app.js:2367`), and `ledgerRow("The Shelf", shelf ? "Open" : "Closed", shelf)` (`settings.js:268`) — but `arcana-profile.js` never reads the key and renders every section unconditionally. · `app.js:2367`; `settings.js:268`; `arcana-profile.js:359-380` · "Preview as: No account" can never show the no-account profile — the builder has a control that *implies* the fix for finding #2 and it does nothing. Settings can report the Shelf "Closed" about a shelf the visitor is currently reading. · **Fix:** make the profile read `br_holdings` — it is the empty-state switch, already half-built.

---

## THE THREE ROOT CAUSES

**1. Comments are being used as the specification, and they are not enforced by anything.** Eleven of these twenty-seven are a source comment asserting something the code beside it contradicts — no violet, no price, one gold object, one use of "Vault", "every door speaks one language", "the ONE un-busted codex link". Each was true when written and rotted at the next commit. *Principle: any invariant worth stating in a comment must be enforced by a token, a shared class, or a single source of truth — otherwise state nothing.*

**2. The default state of the page is unrunnable, so it is unreviewed.** `SEEKER` is a filled literal nothing can vary; the empty branch — which holds the page's only price, its only hero violet, its dimmest text and its only "None borne yet" — cannot be looked at. Everything drifting in this list drifts *there*. *Principle: every state the product ships must be renderable on demand; a branch you cannot open is a branch you are not designing.*

**3. Each section was built in its own vocabulary instead of the page's.** New blocks invent greys outside the palette, sizes outside the mono ladder, class prefixes that collide with existing sections, markup that skips the wrapper its siblings use, and mock fields (`result_count`, `is_current`, `vault_slots`) that describe collections the render can only answer in the singular. The page has a grammar — tokens, a door level, `--empty` modifiers, `data-*`-hooked buttons, a section spacing unit — and additions are not snapping to it. *Principle: a new section must be assembled only from named rungs — a colour token, a type step, a door level, a row idiom, a data shape — and any literal it needs becomes a rung first.*


---

## 9b. AN OUTSIDE CRITIQUE, AND WHAT MEASUREMENT SAYS ABOUT IT

A second opinion was taken from GPT, **judging from a screenshot only** - it could
not reach the repository, so it never saw the code, the empty branch, or the
reasons behind anything. That limit matters twice below, once in its favour.

It is sharper than §9 on exactly the axes §9 missed, because §9 was run as a
defect hunt - every finding needed a verbatim quote and a line number, and design
judgements do not have line numbers. **Read §9 as the cleanup list and §9b as
the design critique.** Where the two agree independently, confidence is high.

### Its scores

| Area | Score |
|---|---|
| Brand and atmosphere | 9/10 |
| Visual composition | 7/10 |
| Readability / accessibility | 4/10 |
| Interaction clarity | 4/10 |
| Perceived completeness | 5/10 |

> "Beautiful foundation, but clarity and legibility need to catch up with the art
> direction." - "reads more like a beautiful prototype than a confident, usable
> product page."

### What it praised

Restrained black / ivory / gold reads archival and mystical - "The Twice-Kindled
Giver" is a memorable focal point - typography, fine borders and ceremonial labels
form a cohesive system - the narrow central column feels like opening a private
record rather than browsing a dashboard - Shelf / Showcase / Friends / Rooms imply
a larger world worth having.

### Its eight problems, each checked against the source

**1. Readability is too low.** - **Right, but the diagnosis needs correcting.**
It blames contrast. Measured, contrast mostly passes: `--pf-body` **8.80:1**,
`--pf-meta` **6.79:1**, `--pf-ghost` **6.29:1**, `--pf-gold` **5.67:1**,
`--pf-gold-lit` **7.90:1**. Exactly one literal fails - `#7c766c` at **4.37:1**
(§9 #10). The real cause is **size and tracking, not ratio**: the mono register
runs **8 / 8.5 / 9 / 9.5 / 10 / 10.5 / 11px at .04-.28em** (§9 #20). Uppercase
mono at 9px with .2em tracking is hard to read at any contrast.
- Raising contrast alone would not fix this, and would cost the page its restraint.

**2. The primary action is buried.** - **Confirmed, and starker than stated.**
`.pf-openreading--lg` is **10.5px** mono. The crowned name above it is
`clamp(30px, 4.6vw, 46px)`. The crown is `clamp(160px, 24vw, 210px)`.
**The page's primary call to action is its smallest type.** §4 also notes the
crown performs the same act, so there are two controls for one thing and the
larger one is undeclared.

**3. Too much empty vertical space in the hero; cut 30-40%.** - **Confirmed.**
`.pf-crownstage` carries `margin-bottom: clamp(44px, 9vh, 96px)` beneath a 210px
crown, so the shelf line starts far down the first viewport.

**4. The terminology needs plain-language glosses.** - **Right, and it collides
with a house rule already on the books.** Blue Room's own law is that
front-facing copy says what a visitor GETS. The roadmap research the builder
commissioned says the same: keep the metaphor in the chrome, keep the semantics
plain, and pair the mystical name with a plain gloss the first time. Its
suggestions are usable as written:
"Crown - your profile title" - "Ring - a reading made for someone close" -
"Minted card - a saved card from a completed reading".

**5. Too many unfinished states at once.** - **Confirmed, and UNDERSTATED**, for a
reason GPT could not know: it judged the FILLED state. The empty branch, which is
what a real first visitor gets, cannot be rendered at all (§9 #2), and it is
worse - no crown, no crowned name, and the page's only price. Its fix (hide
unavailable modules, or gather them into one deliberate "Coming later" area) is
the single most useful proposal in this document.

**6. Some content looks like test data.** - **True, deliberate, and still a
problem.** "A friend", "Another" and "1 January 2000" are BR-S347 privacy
placeholders: those fields held real people's names and birth dates on a public
page. The tension is real - neutral samples read as unfinished.
- The answer is NOT plausible fake people. It is that a designed empty state
  beats any placeholder record, which is GPT's own point 5.

**7. Desktop underuses the screen; widen to 640-720px.** - **Right, and it found a
bug.** `.pf-wrap` is declared **twice**: `min(760px, 92vw)` at
`arcana-profile.css:59` and `min(620px, 92vw)` at `:247`. The later wins, so the
live column is **620px** - narrower than either author intended. Two owners of one
truth, again.

**8. Clickable vs disabled is ambiguous.** - **Confirmed twice over.** "Share Blue
Room" says "not open yet" and its handler returns "(Mocked.)" - and §9 #8
measured it as the **loudest door label on the page** (21px/600 against room doors
at 18px/400). The page's biggest door goes nowhere.

### The hierarchy it proposes

1. Identity - seeker, title, one-sentence description
2. Primary action - "Open the reading"
3. Shelf - saved readings and relationships
4. Showcase - **only after something is featured**
5. Friends
6. Explore the Rooms
7. Share, and footer

Close to the current order, with two real changes: **a one-sentence description of
what a reading contains**, which this page has never had, and **conditional
sections** - nothing renders until it holds something. Both follow from §9's
second root cause.

### What GPT could not see, and therefore missed

- the empty branch (§9 #2) - its problem 5 is worse than it knew
- eleven source comments that contradict the code beside them (§9 root cause 1)
- the violet and the $4.99 shipping in the empty hero, against the page's own
  stated law (§9 #3, #4)
- that a Showcase slot can be filled but never emptied (§9 #9)
- that the minted card is a `div` in a button costume with no handler (§9 #21)

**Neither read is sufficient alone.** §9 knows what is broken; §9b knows what is
wrong. A redesign needs both.


---

## 9c. THE DWELLING RESEARCH - what it unlocks, and where it collides with Blue Room

A second, much larger outside document (GPT, commissioned by the builder) on making
the profile **magnetic, cosy and dwellable**. It is the strongest of the three
reads and the only one that supplies a *vocabulary* rather than a defect list.
It was written without repository access, so the four collisions below are things
it could not have known.

### What it contributes that nothing else had

- **Empty-and-calm vs empty-and-desolate.** The distinction the whole page turns
  on. Emptiness reads as calm when it is *enclosed, warm and intentional*; as
  desolate when *exposed, cold and accidental*. Blue Room's near-black is the raw
  material of refuge, but a hairline column stranded in a dark field delivers
  exposure, not refuge (Appleton's prospect-refuge; Alexander's Pattern 159/179).
- **Silhouettes, not sentences.** An unfilled slot creates *desire* when it reads
  as an earnable, already-underway set and *despair* when it reads as vaporware.
  Same pixels, opposite effect. This is the single most actionable idea in any of
  the three critiques.
- **Never start at 0-of-N.** Seed the account. The coffee-card field experiment
  (Kivetz, Urminsky & Zheng 2006) is the citation; the practice is Basecamp's
  sample project, Dropbox's starter PDF, Evernote's first note.
- **The IKEA effect, with its own kill-switch.** Labour raises valuation *only when
  it completes*; abandoned or half-finished work destroys the effect. A second,
  independent argument against a page of empty slots.
- **Design the page for the tenth visit, not the first.** A profile becomes a
  place through repeated low-pressure return.
- **The ethical line, drawn precisely.** Memory, ritual, craft and meaning are
  legitimate return mechanics; streaks, FOMO, variable-ratio loops and
  social-comparison are not - and would contradict this page's own footer.

### THE FINDING IT UNLOCKS BUT DOES NOT STATE

Its first and highest-priority recommendation is *"seed every new account: one
real reading filed and auto-featured on day one; the shelf opens at 1-of-N,
never 0-of-N."*

**That is impossible as written, and the reason is the most important structural
fact about this page.**

A Birth Reading costs **$4.99** (`arcane.js:439`). It also requires the visitor's
own name and birth date, so it cannot be pre-filled by anyone. Therefore:

> **The populated profile is behind a paywall.** Every non-paying visitor's
> profile is permanently the empty state - the branch that cannot be rendered
> (§9 #2), that carries the page's only price and its only violet (§9 #3), and
> that reads as five simultaneous absences. It is not an onboarding gap. It is the
> product's front door for everyone who has not bought.

**But the seed exists, in another room.** The Drawing Room's **Pull is free and
unlimited** and its first **Sitting is free** (`drawing-room.js:5,7,224`). So the
mechanism has to change, not the principle:

- day one is seeded by a **free tarot draw**, not a paid birth reading
- the crown is then the *second* thing you earn, not the first
- which means the hero of this page - the crown, the crowned name, and the whole
  "above ground" surface - **is currently built around the one object a new
  visitor cannot have**

That reframes the redesign. It is not "fix the empty state". It is *what is this
page's hero for someone who has drawn one free card?*

### FOUR COLLISIONS WITH DECIDED CANON

The brief must not adopt these silently. Each is a real conflict with something
the builder settled, in some cases hours before this research arrived.

**1. Tabs vs the line.** It calls a horizontal rule labelled "YOUR SHELF" *"a
smell that two pages are hiding inside one"* and proposes header + tabs
(Shelf / Readings / Friends / Rooms). The builder **decided the line** in BR-S372,
deliberately, as the page's only structural division. Both positions are coherent:
tabs scale and end the doom-scroll; the line is one page that never asks you to
choose. This is a genuine fork and it is the builder's call, not the research's.

**2. A daily draw vs "drawn once, not reissued."** It recommends a daily card as
the return ritual. The Drawing Room's stated law is that a deck is cut once and
what falls is filed where it fell - the panel's own line is *"Drawn once. Not
reissued."* A daily card is a different product with a different promise. The
compatible version is a daily *reading of what you already hold* (an "on this
day", a mark re-read) rather than a new draw.

**3. Guestbook, visiting, seeded presence - all need a backend.** There are no
accounts, no server, no storage beyond one browser's localStorage. Every social
primitive it proposes is correctly identified as "later", but the brief should be
explicit: these are downstream of accounts, which is state `drawn` in the room
registry.

**4. Decorating vs restraint.** "Decorating drives dwelling" is well-evidenced and
it argues for constrained customisation (a curated palette of inks and frames).
Blue Room's design doctrine is *restraint over density* and its front door was
deliberately stripped of a tier ladder. Constrained customisation is compatible;
"a room you decorate" may not be. Worth deciding before it is designed.

### TWO THINGS IT GOT WRONG, both from judging a screenshot

- **"The repeating ROOMS pill (x3, sticky)"** - `app.js` builds the orbit button
  **once**. Three appearances in one tall capture are the sticky element caught
  three times by the screenshot, not three pills. Its §11 recommendation to
  "cut the repetition" is aimed at a bug that does not exist.
- **"Pure black causes halation; switch to a warm near-black around #121212"** -
  Blue Room's ground is already `#0a0b0d`, deliberately not `#000`. The advice is
  already taken.

Its contrast warning is likewise already measured: see §9b problem 1 - the
tokens mostly pass, and the real fault is size and tracking.

### THIRD INDEPENDENT HIT ON "MINT"

*"In 2026, 'mint' reads as crypto/NFT to a large share of users... either rename
the mechanic or make the copy explicitly about personal craft."*

This is now the **third** independent source to flag it - the roadmap research,
the screenshot critique's implication, and this. Blue Room says Mint on the front
door, on the card, on the serial, and in a section title. It is a product
vocabulary decision, and three-for-three is as clear a signal as this brief will
produce.

### THE FIVE PRINCIPLES it proposes, worth adopting as arbiters

> Quiet but never dead · Every absence is an invitation · Reward return, never
> punish absence · Decorate within the system · The page is a hub, not a display case

The second is the one that would change the most code today.

### THE ORDER I would actually take it in

1. **Answer the paywall question first.** Everything else is downstream of what a
   non-paying visitor's profile is *for*.
2. **Make the empty branch renderable** (§9 #2). It cannot be designed while it
   cannot be seen, and `br_holdings` is already the switch (§9 #27).
3. **Silhouettes and invitations** in place of every "none yet" - the cheapest
   change with the largest effect, and it needs no backend.
4. **Hide the unshipped sections** rather than rendering them as dead states.
5. **Enclose the column** - a frame, and a measure closer to 700px than the 620px
   two conflicting declarations currently produce (§9b problem 7).
6. Living element and ritual, in the compatible form (memory, not a new draw).
7. Tabs and social only after 1-6, and only if the builder overrides the line.

---

## 10. THE QUESTIONS THE REDESIGN MUST ANSWER

1. **What does a person with nothing see?** This is the real first screen. Design
   it first and let the full state follow, not the other way round.
2. **What is the page's single job?** Candidates: *hold what you have* · *get you
   back into your reading* · *show you what else there is*. It currently attempts
   all three with equal weight.
3. **Does Friends belong on a profile with no accounts?** And when accounts land,
   is Blue Room a place where you see other people at all?
4. **Is the Showcase for you or for a visitor?** It is the only feature that
   implies an audience, on a product with no sharing built.
5. **Where does the profile's own address live?** Every other product room has a
   real one.
6. **What organises the shelf when it is full?** Time, kind, or rarity? Nothing in
   the current design answers this, and the Mint plus the Codex unlock roughly
   double the contents.
7. **Does the Vault stay unmarketed as it fills?** It is a lovely rule while it
   holds one crown. With six rings and a shelf of cards, an unlinked drawer may
   be a page nobody finds.
8. **Should "Games for a table" and the Workshop appear here at all?** Their unit
   is a group and a tool, not a person's holdings.
9. **What is the one sentence that says what a reading contains?** The page has
   never had it, and both critiques arrive at it independently (§9b hierarchy 1).
10. **Does a section render before it holds anything?** If the answer is no, most
    of §8A dissolves - and the "Coming later" gathering in §9b problem 5 becomes
    the only place an unbuilt thing is named.
11. **How is the mono register made readable without losing restraint?** It is a
    size-and-tracking problem, not a contrast one - see §9b problem 1.
12. **What is this page for someone who has not paid?** The crown, the crowned
    name and the whole hero require a $4.99 reading. See §9c.
13. **The line or tabs?** §9c argues the line is a smell; BR-S372 decided it
    deliberately. A real fork, and the builder's call.
14. **Is Blue Room a room you decorate?** Constrained customisation is
    well-evidenced and may still be the wrong product.

---

## 11. HOW TO USE THIS DOCUMENT

- Propose **structure before surface**. §8A and §10.1 are the design problem;
  spacing and colour are downstream of them.
- Anything proposed must pass §7. If a proposal needs a constraint relaxed, say
  which one and why — several were decided after measurement, not taste.
- Ground every claim in a file and a line. This repo's recurring failure mode is
  **two owners of one truth**, and a proposal that adds a third is worse than the
  problem it solves.
- The builder decides. This document is evidence, not a verdict.
