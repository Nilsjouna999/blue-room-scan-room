# U1 â€” THE MASTERCLASS VERSION

*Synthesis. Nothing was written to the repo.*

---

## (a) THE VERDICT

**DESIGN 3 â€” THE ROOM â€” wins, and it wins on one thing: it is the only one of the three whose spine is a *place* rather than a *format*.** D1's spine is rhetorical order and D2's is an instrument, and both are things you could put on any page in any house; "U1 is the storey under the desk, it has a ceiling and a floor, and everything in it enters through the floor and comes to rest" is a spine that could only be U1, which is exactly what the brief asked for after two of U1's three jobs were taken away. And it is the only premise that makes the builder's own rejection of `_u1-turn-lab.html` â€” *"it's not a separate object, is background that works like clockwork"* â€” into architecture instead of a note: the room **is** the background.

**What I took from the other two.** From D2, the single best idea in the whole fleet: **receipts** â€” each mark prints its own working (`26 July falls in Jul 23 â€“ Aug 22`; `1+9+6+5+0+7+2+6 = 36 â†’ 3+6 = 9`; `hash of the name and date â†’ 5 of 24`), which converts *"given, not chosen"* from a claim into a sum. I took it **without** D2's input field, so it costs no engine refactor and carries none of D2's own funnel/cannibalisation risk. From D1: the diagnosis that the page spends its length on the wrong 20%, the discipline that the reading column is one measure and one type step, the observation that a fixture person's name is currently the largest type on the page, and the citation-link-as-only-focusable-element fix (which I move to the stair, in flow, where it needs no inert toggling).

**What I cut from D3, and it is D3's own load-bearing new idea.** **The wall of 222 glyphs goes.** D3 named it as its own most-likely-wrong; I agree and I am ruling. Elder Futhark (U+16A0) and hexagram (U+4DC0) coverage is thin on mobile and a tofu box in *the archive's own wall* is a worse first frame than the empty label it replaced; 222 hairlines at 13px is as likely to read as texture as as marks; and it costs ten more writes per frame and the room's best real estate to restate a number that is already one sentence. The job the wall was doing â€” *show where the six came from* â€” is done better, smaller, and more checkably by the receipts. **The provenance goes on the plates, not on the wallpaper.**

### What the current page got wrong â€” concretely

1. **The largest type on the page belongs to a person who does not exist.** `.u1rack__val` sets "John Bon" at `clamp(30px,6vw,58px)` (`_u1-rack.js:109`); `.u1head__title` sets the house's own motto at `clamp(30px,3.4vw,46px)` (`styles.css`, `.u1head__title`). The surface that answers *what is Blue Room* has a fixture's name as its biggest object.
2. **The descent lands on a label with no value.** `n1 = NAME.slice(0, Math.round(tn*NAME.length))` with `tn = win(p,0,0.058)` (`_u1-rack.js:363-370`): at p=0 the intake renders `The reading is taken from` followed by nothing. That is the first thing below the fold, measured.
3. **The page spends ~96% of its length on one clause.** 931 characters of prose against 3780px of rack; six marks over `p 0.100â†’0.860` of a 2880px span = **365px of scroll per mark**, ~3.7 wheel notches each. That is the rack's own open question (BR-S452: *"whether 3.23:1 reads as GEARING or as the page failing to keep up"*) answered on the wrong side.
4. **It has no floor and no exit.** `#about` is the last child of `#menuView`; **0 focusable elements** inside it. The strongest moment in the house is followed by a 43px footer and a dead end.
5. **It does not exist on the launch build.** `_u1-rack.js` is `PREVIEW_ONLY` (`build_public.py:223`). Live U1 is a header, a footer, and a hole.
6. **Reduced motion is not a state.** `REDUCED` freezes ground, pinion, bow, depth (`_u1-rack.js:350,354,360,386`) but plates and crown still translate as pure functions of scroll (`:378-401`) â€” same 2880px, gears held still, and no scroll position at which everything is visible.
7. **The identity paragraph claims a room that does not exist.** `app.js:2441`: *"develops a card from a photograph."* The Forge is `state:"drawn"` and the registry says outright that nothing reads a photograph yet.
8. **714px inside a 1180px shell,** for the second time. `reveal/reveal.css:1274` `align-items:center` on `.menurev` makes `#about` fit-content in the cross axis, so `.u1{max-width:min(1180px,94vw)}` never binds and `.u1head__ident{max-width:34em}` at 21px sets the page width. BR-S271 (`a7786b5`) fixed this once; BR-S366 removed the fix with the markup.

**The one structural move that fixes 5, 6, and the no-JS case at once:** `renderAbout()` emits the **complete room, every word of it, in document flow**, and the module adds a class. Nothing is sticky, absolute or transformed until `.u1rm.is-live` exists. The mechanism is an enhancement layered over a finished document, not a document assembled by a mechanism.

---

## (b) THE PAGE

Four acts. Acts Iâ€“III live inside one sticky viewport; act IV is in normal flow below it.

```
â”€â”€ seat, scrollY 934 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   â•â•â•â•â•â•â•â•â•â•â• CEILING SEAM  --hair-1   (the desk's underside; never moves)

     warm plate, ruled at the shelf period

     â—† BLUE ROOM Â· ONE FLOOR DOWN
     Everything read here
     is yours to keep.
     Each reading is filed at a link of its own, and the link
     reopens it exactly as it fell.
     Blue Room reads people from small given things â€” a date, a
     name, a cut of the deck â€” and files every reading it makes
     on a page of its own.
     4 rooms open Â· 3 free to enter Â· 1 paid Â· 6 still to come
     â”€
     A birth reading is six marks. Three are read from the date
     itself, three are drawn from the name and date together â€”
     and each one shows its working.        â† rides out by gear

                    A WORKED EXAMPLE
     â”Œ Sun sign     Leo               from the date â”
     â”‚ 26 July falls in Jul 23 â€“ Aug 22             â”‚
     â”œ Year animal  Snake             from the year â”¤
     â”‚ 1965 Â· 1977 Â· 1989 Â· 2001 Â· 2013 Â· 2025      â”‚  six plates,
     â”œ Life path    9               from the digits â”¤  rising through
     â”‚ 1+9+6+5+0+7+2+6 = 36 â†’ 3+6 = 9               â”‚  the floor seam,
     â”œ Rune         Raidho        name + date, hash â”¤  one per gear
     â”‚ hash of the name and date â†’ 5 of 24          â”‚  tooth
     â”œ Trigram      â˜± DuÃ¬ Â· Lake  name + date, hash â”¤
     â”‚ hash of the name and date â†’ 8 of 8           â”‚
     â”œ Hexagram     7 Â· The Army  name + date, hash â”¤
     â”‚ hash of the name and date â†’ 7 of 64          â”‚
     â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
     three read from the date Â· three drawn from the name and date

   â•â•â•â•â•â•â•â•â•â•â• FLOOR SEAM  rgba(226,232,240,.92)  .42 â†’ .85
     blue under, ruled faster, opaque.  the pinion turns down here.
â”€â”€ sticky releases â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

   ACT IV Â· THE STAIR       (normal flow, real anchors, always tabbable)
     KEPT HERE
     Two hundred and twenty-two marks are kept here â€” every card,
     sign, rune and hexagram the rooms read from.
     [ The Codex Â· Free Â· no account Â· Open the Codex â†’ ]
     [ â†‘ Back up ]                    â—† Read as far in as you like.
```

The crown act happens inside the same frame: after the six close from a full notch to a half notch, the crowned name climbs out of the closed stack's own top edge through a static clip, and the floor seam brightens.

### The copy, in full, with what makes each line true

| String | Warrant |
|---|---|
| `â—† BLUE ROOM Â· ONE FLOOR DOWN` | no claim; names a direction |
| **Everything read here / is yours to keep.** | unchanged. BR-S484 ruled it the house motto and kept the display wording. Two block `<span>`s, not `<br>` â€” the `<br>` made `textContent` read *"here**is** yours"* |
| **Each reading is filed at a link of its own, and the link reopens it exactly as it fell.** | the audited qualifier. A reading is reproducible from its `?read=`/`?seed=` URL; the sentence promises the link and nothing else |
| **Blue Room reads people from small given things â€” a date, a name, a cut of the deck â€” and files every reading it makes on a page of its own.** | â˜… **replaces a live false claim.** `app.js:2441` says the archive *"develops a card from a photograph"*; The Forge is `state:"drawn"`. Tarot cut âœ”, name+date âœ”, record pages âœ” |
| `4 rooms open Â· 3 free to enter Â· 1 paid Â· 6 still to come` | unchanged **expression** â€” `u1Open()`, the stored `free` field, `u1Public().length - open.length` (`app.js:2429-2435`). â˜… I do **not** add "222 marks kept" to this line, as D3 did: a hardcoded constant inside a derived line is exactly the drift the derived line exists to prevent |
| **A birth reading is six marks. Three are read from the date itself, three are drawn from the name and date together â€” and each one shows its working.** | the sanctioned provenance phrasing, plus a promise the next act keeps |
| `A WORKED EXAMPLE` | `_u1-rack.js:221`, required. Six marks at this size with no marker is showing a stranger a reading |
| six slots / names / from-tags | `SIX`, `_u1-rack.js:160-167`, verbatim. Do not tidy |
| `26 July falls in Jul 23 â€“ Aug 22` | **verified**: Leo's own tag in `codex-data.json` is `â™Œ Â· Jul 23â€“Aug 22 Â· Fire Â· Fixed Â· Sun`. The archive quoting itself |
| `1965 Â· 1977 Â· 1989 Â· 2001 Â· 2013 Â· 2025` | **verified**: Snake's tag is `2025, 2013, 2001, 1989, 1977, 1965 Â· Fixed element: Fire`, re-ordered ascending |
| `1+9+6+5+0+7+2+6 = 36 â†’ 3+6 = 9` | **verified**: `lifePathNum("19650726")` â†’ 36 â†’ `reduceNum` â†’ 9, matching the fixture. Arithmetic a reader checks on their fingers |
| `hash of the name and date â†’ 5 of 24` Â· `â†’ 8 of 8` Â· `â†’ 7 of 64` | **verified by computation this session** against the real FNV-1a (`arcana-reading.js:43`, `Math.imul`) with seed `birth~John Bon~1965~7~26` + `f`/`g`/`h`: Raidho = index 5 of 24, â˜± DuÃ¬ = 8 of 8, 7 Â· The Army = 7 of 64 |
| `three read from the date Â· three drawn from the name and date` | `_u1-rack.js:237`, audited |
| `Sun Â· animal Â· rune Â· trigram make the name` | `_u1-rack.js:231`, audited. Four, not six |
| `The Twice-Kindled Wayfarer` / `bound in open water` | **verified**: `EP["fire|fire"]="Twice-Kindled"`, `RO["raidho"]="Wayfarer"`, `BIND[dui]` (`arcana-reading.js:89-101`) |
| `Twice-Kindled â† Leo Â· Snake (both fire)   Wayfarer â† Raidho   bound in open water â† â˜± DuÃ¬` | `crownOf()`'s own outputs, printed. Typographic arrows, not drawn threads â€” layout-independent, legible at 320px, correct in print |
| **Life path and hexagram make no part of the name. They are read on their own terms.** | **verified**: `fragment()` returns a string only for Sun sign, Year animal, Trigram and Rune, and `null` otherwise (`arcana-reading.js`, `fragment`). A positive statement about how the six are used, not a concession |
| **The same name and the same date return the same six, every time it is opened.** | sanctioned form. `hash()` is pure FNV-1a; no `Math.random`, no `Date.now` on this path |
| `KEPT HERE` | structural |
| **Two hundred and twenty-two marks are kept here â€” every card, sign, rune and hexagram the rooms read from.** | counted this session from `codex-data.json`: 12+17+12+0+22+56+24+8+64+7 = **222** across ten top-level systems. The clause is the registry's own audited string (`app.js:1539`) |
| The Codex door: name / `Free Â· no account` / `Open the Codex â†’` | read live from `ROOMS[key="codex"]` (`app.js:1538-1541`). One door, sourced, so it cannot become a list |
| `â†‘ Back up` | reuses `_u1GlideTo(0)` |
| **â—† Read as far in as you like.** | a statement about the house's behaviour, carrying no claim any engine must make true |

**Sentences I drafted and cut.**

- **"Six of them are already yours."** â€” PART 0 quotes this verbatim as the register working, and D3 put it on the wall plate. **It is false on U1.** On the reading's own door it is said to someone who has a reading; said to a stranger who has never given a date, it is not true. Cut.
- **"222 marks kept"** in the derived spec line â€” a typed constant inside the one line whose entire purpose is derivation. Cut. The 222 lives in the registry sentence on the stair.
- **"Nothing you type here leaves the page" / "No account, nothing to sign"** â€” reassurance-by-denial, the exact BR-S366 failure. Cut (and moot, since there is no field).
- Anything naming a price. âš ï¸ **Flagged, not fixed:** the derived line's `1 paid` describes an intended price with no gate â€” `drawing-room.js:17-19` says there is no real payment in this build and `pay` is `state:"bench", internal:true`. It under-claims rather than over-claims and it is derived, so I will not delete it. It should have a claim-guard record.
- **"One archive. Every door kept."** â€” retired. *Every door kept* is an assertion no reader can parse, and doors are not what is kept.

---

## (c) THE CODE

Three new files plus one emitter, all behind a URL switch. **Nothing replaces `renderAbout()`.**

**The switch.** House idiom is a regex on `location.search` (`_u1-rack.js:596`). In `renderMenu()`'s template, the one line that selects between them:

```js
+ (/[?&]u1=room/.test(String(location.search || "")) ? renderAboutRoom() : renderAbout())
```

Prototype URL: **`/?u1=room&rk=0`**. The `&rk=0` is what keeps `_u1-rack.js` from also mounting into `#about`, and it needs **no edit to the rack** â€” the rack already honours it. (If the switch is later made sticky, add one line to `_u1-rack.js:mount()`: `if (about.querySelector("[data-u1room]")) return true;`)

âš ï¸ `build_routes.py` must be re-run after any `index.html` change â€” five stubs are generated copies. âš ï¸ Cache tokens are **per-asset**: bumping `app.js?v=` does not bump `_u1-room.css?v=`.

### c.1 â€” `renderAboutRoom()` (goes beside `renderAbout()` in `app.js`)

```js
/* â•â•â• U1 Â· THE ROOM â€” one storey, drawn in section. â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   PROTOTYPE. Reached at ?u1=room&rk=0. renderAbout() is untouched.

   â˜…â˜… THIS FUNCTION EMITS THE ENTIRE ROOM, INCLUDING EVERY WORD OF IT, IN NORMAL
   DOCUMENT FLOW. `_u1-room.js` adds ONE class, `.is-live`, and only `.is-live`
   turns on the sticky viewport and the absolute positioning. That single inversion
   is the whole architectural difference from the rack, which injects its own markup
   (_u1-rack.js:419-421) and is PREVIEW_ONLY (build_public.py:223) â€” so today the
   LAUNCH build's U1 is a header, a footer and a hole. Here, five states collapse
   to one correct page: no JS, JS late, JS failed, reduced motion, and the launch
   build all render the same finished document, and desktop-with-motion gets the
   mechanism layered on top. Nothing is sticky until something proves it can drive.

   BR-S457 STANDS. No room list, no roadmap board. The one Codex door on the stair
   is the door into the object the whole page has been quoting, read out of the
   registry so it cannot drift and cannot become two.

   â˜… THE `id` AND THE `.u1foot` ANCHOR. `#about` keeps its id â€” the hash route, the
   display gate, _navStops(), _u1SyncHash(), the orbit plate and the rooms sheet all
   address it. The old `.u1foot` is replaced by the stair, which is why this
   prototype sets rk=0: the rack inserts before `.u1foot` and would otherwise land
   in the middle of the room. */
function renderAboutRoom() {
  var open   = u1Open();
  var free   = open.filter(function (r) { return r.free; }).length;
  var coming = u1Public().length - open.length;
  var codex  = ROOMS.filter(function (r) { return r.key === "codex"; })[0];

  /* â”€â”€ THE FIXTURE, WITH ITS WORKING. The six are `_u1-rack.js:160-167` unchanged.
       `rc` is new and it is the graft that matters: each mark prints how it was
       reached. The first three are the archive quoting itself or arithmetic the
       reader can check on their fingers; the last three say plainly that they are a
       hash and where in the list it landed.
       â˜… EVERY ONE VERIFIED AGAINST THE SHIPPED ENGINE, NOT ASSUMED:
         Leo's own tag in codex-data.json is "â™Œ Â· Jul 23â€“Aug 22 Â· Fire Â· Fixed Â· Sun".
         Snake's tag lists 2025â€¦1965 Â· Fixed element: Fire.
         lifePathNum("19650726") = 36 -> reduceNum -> 9.
         FNV-1a (arcana-reading.js:43, Math.imul) over seed+"f"/"g"/"h" with
         seed = "birth~John Bon~1965~7~26" gives 5/24, 8/8, 7/64.
       A WRONG RECEIPT IS THE ONE ERROR THIS SURFACE CANNOT MAKE. If the fixture or
       the engine changes, recompute these six strings â€” do not adjust them by eye.
       The KEYWORD line the rack carried is gone, and the receipt takes its row: the
       receipt is evidence and the keywords were texture, and the plate's height is
       a fraction of H that neither may change. */
  var SIX = [
    { slot:"Sun sign",    name:"Leo",           from:"from the date",
      rc:"26 July falls in Jul 23 &ndash; Aug 22" },
    { slot:"Year animal", name:"Snake",         from:"from the year",
      rc:"1965 &middot; 1977 &middot; 1989 &middot; 2001 &middot; 2013 &middot; 2025" },
    { slot:"Life path",   name:"9",             from:"from the digits",
      rc:"1+9+6+5+0+7+2+6 = 36 &rarr; 3+6 = 9" },
    { slot:"Rune",        name:"Raidho",        from:"name + date, hashed",
      rc:"hash of the name and date &rarr; 5 of 24" },
    { slot:"Trigram",     name:"\u2631 Du\u00ec &middot; Lake", from:"name + date, hashed",
      rc:"hash of the name and date &rarr; 8 of 8" },
    { slot:"Hexagram",    name:"7 &middot; The Army", from:"name + date, hashed",
      rc:"hash of the name and date &rarr; 7 of 64" }
  ];

  var plates = SIX.map(function (m) {
    return '<div class="u1rm__bx">'
      +      '<div class="u1rm__strip">'
      +        '<span class="u1rm__slot">' + m.slot + '</span>'
      +        '<span class="u1rm__name">' + m.name + '</span>'
      +        '<span class="u1rm__from">' + m.from + '</span>'
      +      '</div>'
      +      '<div class="u1rm__brule"></div>'
      +      '<p class="u1rm__rc">' + m.rc + '</p>'
      +    '</div>';
  }).join("");

  /* the pinion: 24 teeth, 15deg pitch, so 60deg is exactly one long tooth per mark.
     Geometry carried from _u1-rack.js MARKUP(); R is written in px by measure(),
     never hardcoded â€” fixed at 612px it drew a dome across a short viewport. */
  var teeth = "", i, a, r2;
  for (i = 0; i < 24; i++) {
    a  = (i / 24) * Math.PI * 2 - Math.PI / 2;
    r2 = (i % 4 === 0) ? 272 : 284;
    teeth += '<line x1="' + (306 + Math.cos(a) * 300).toFixed(1)
          +      '" y1="' + (306 + Math.sin(a) * 300).toFixed(1)
          +      '" x2="' + (306 + Math.cos(a) * r2).toFixed(1)
          +      '" y2="' + (306 + Math.sin(a) * r2).toFixed(1) + '"/>';
  }

  return '<section id="about" class="about u1 u1--room" aria-label="Blue Room \u2014 one floor down">'
  + '<div class="u1rm" data-u1room>'
  +   '<div class="u1rm__vp" data-vp>'

  /* the two grounds and the two rulings, carried from _u1-rack.js:59-77. Each ruled
     field lives in a static overflow:hidden clip and translates INSIDE it; the clips
     are compositor-side and are never written to. The rack's third field (deep-B,
     margin-masked) is CUT â€” it needed a mask to not moire against deep-A and at 6%
     margins it read as a rendering artefact rather than a third rate. The thesis is
     carried by the two rates either side of the line. One line restores it. */
  +     '<div class="u1rm__ground" aria-hidden="true"></div>'
  +     '<div class="u1rm__clip u1rm__clip--air" aria-hidden="true"><div class="u1rm__field u1rm__paper" data-paper></div></div>'
  +     '<div class="u1rm__clip u1rm__clip--deep" aria-hidden="true"><div class="u1rm__field u1rm__deep" data-deep></div></div>'

  /* â”€â”€ ACT I Â· THE PLAQUE. Composed at p=0 and finished before the reader arrives.
       The rack typed a fixture person's name into this band from empty, so the first
       frame below the fold was the label "The reading is taken from" standing over
       nothing (_u1-rack.js:366-370) â€” and the fixture's name at clamp(30px,6vw,58px)
       was the largest type on the surface, larger than the house's own motto.
       The plaque rides out on the SAME shelf rate as the plates, which is the
       intake's one genuinely good behaviour: the header is pushed out by the answers
       rather than faded. Zero opacity writes; one transform. */
  +     '<header class="u1rm__plaque" data-plaque>'
  +       '<p class="u1rm__eyebrow"><span class="u1rm__mark" aria-hidden="true">&#9670;</span> BLUE ROOM &middot; ONE FLOOR DOWN</p>'
  +       '<h2 class="u1rm__title"><span class="u1rm__ln">Everything read here</span>'
  +         '<span class="u1rm__ln">is yours to keep.</span></h2>'
  +       '<p class="u1rm__sub">Each reading is filed at a link of its own, and the link reopens it exactly as it fell.</p>'
  /* â˜… THE OLD IDENT CLAIMED A ROOM THAT DOES NOT EXIST. app.js:2441 says the archive
     "develops a card from a photograph"; The Forge is state:"drawn" and the registry
     says outright that nothing reads a photograph yet. This names only what runs. */
  +       '<p class="u1rm__ident">Blue Room reads people from small given things &mdash; a date, a name, '
  +         'a&nbsp;cut of the deck &mdash; and files every reading it makes on a page of its own.</p>'
  /* DERIVED, and the expression is untouched from renderAbout(). A number the page
     states is computed from the thing it describes, never typed. Deliberately NOT
     joined by a hardcoded "222 marks kept": one typed constant inside the one line
     whose whole job is derivation is precisely the drift it exists to prevent. */
  +       '<p class="u1rm__spec">'
  +         '<span>' + open.length + ' rooms open</span><span class="u1rm__d" aria-hidden="true">&middot;</span>'
  +         '<span class="u1rm__free">' + free + ' free to enter</span><span class="u1rm__d" aria-hidden="true">&middot;</span>'
  +         '<span class="u1rm__paid">' + (open.length - free) + ' paid</span><span class="u1rm__d" aria-hidden="true">&middot;</span>'
  +         '<span>' + coming + ' still to come</span></p>'
  +       '<p class="u1rm__lead">A birth reading is six marks. Three are read from the date itself, '
  +         'three are drawn from the name and date together &mdash; and each one shows its working.</p>'
  +     '</header>'

  /* â”€â”€ ACT II Â· THE TABLE. */
  +     '<h3 class="u1rm__ex">A worked example</h3>'
  +     '<div class="u1rm__stack" data-stack>' + plates + '</div>'
  +     '<p class="u1rm__prov">three read from the date &middot; three drawn from the name and date</p>'

  /* â”€â”€ ACT III Â· THE CROWN. In live mode the clip's bottom edge IS the closed
       stack's top edge, so the name emerges out of an edge made of the six
       (_u1-rack.js:132-137). In static mode the clip is just a block. */
  +     '<div class="u1rm__crownwrap"><div class="u1rm__crown" data-crown>'
  +       '<h3 class="u1rm__k">Sun &middot; animal &middot; rune &middot; trigram make the name</h3>'
  +       '<p class="u1rm__n">The Twice-Kindled Wayfarer</p>'
  +       '<p class="u1rm__b">bound in open water</p>'
  +       '<p class="u1rm__deriv">Twice-Kindled &larr; Leo &middot; Snake (both fire)'
  +         '<span class="u1rm__gap"> </span>Wayfarer &larr; Raidho'
  +         '<span class="u1rm__gap"> </span>bound in open water &larr; \u2631 Du\u00ec</p>'
  +       '<p class="u1rm__note">Life path and hexagram make no part of the name. They are read on their own terms.</p>'
  +       '<p class="u1rm__fix">The same name and the same date return the same six, every time it is opened.</p>'
  +     '</div></div>'

  /* the seams, the bow, the occluder, the pinion â€” carried from _u1-rack.js:80-96.
     The occluder is why a plate under the water is genuinely ABSENT rather than
     faded, which is what lets the whole rise cost zero opacity writes. */
  +     '<div class="u1rm__bow" data-bow aria-hidden="true"><svg viewBox="0 0 1000 26" preserveAspectRatio="none">'
  +       '<path d="M0 26 Q 500 0 1000 26" fill="none" stroke="rgba(226,232,240,.30)" stroke-width="1"/></svg></div>'
  +     '<div class="u1rm__ceil" aria-hidden="true"></div>'
  +     '<div class="u1rm__floor" data-floor aria-hidden="true"></div>'
  +     '<div class="u1rm__under" aria-hidden="true"></div>'
  +     '<div class="u1rm__pinion" data-pinion aria-hidden="true"><svg viewBox="0 0 612 612">'
  +       '<circle cx="306" cy="306" r="300"/>' + teeth + '</svg></div>'
  +     '<div class="u1rm__pointer" data-pointer aria-hidden="true"></div>'
  +   '</div>'

  /* â”€â”€ ACT IV Â· THE STAIR. IN NORMAL FLOW, and that is the point. #about currently
       has ZERO focusable elements â€” there is no way out of U1 from inside U1. Both
       controls here are always tabbable and always visible when focused, because
       they are below the sticky viewport rather than inside it. A control that is
       made inert by scroll position is a worse bug than the one it fixes. */
  +   '<footer class="u1rm__stair">'
  +     '<h3 class="u1rm__lbl">Kept here</h3>'
  +     '<p class="u1rm__plate">Two hundred and twenty-two marks are kept here &mdash; every card, sign, '
  +       'rune and hexagram the rooms read from.</p>'
  +     '<a class="u1rm__door" href="' + codex.href + '">'
  +       '<span class="u1rm__doorname">' + codex.name + '</span>'
  +       '<span class="u1rm__doorcost">' + codex.cost + '</span>'
  +       '<span class="u1rm__doorcta">' + codex.cta + ' &rarr;</span></a>'
  +     '<div class="u1rm__foot">'
  +       '<button type="button" class="u1rm__up" data-u1up>'
  +         '<span aria-hidden="true">&#8593;</span> Back up</button>'
  +       '<p class="u1rm__seal"><span aria-hidden="true">&#9670;</span> Read as far in as you like.</p>'
  +     '</div>'
  +   '</footer>'
  + '</div></section>';
}
```

### c.2 â€” `_u1-room.css`

```css
/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   U1 Â· THE ROOM.  Loaded after styles.css. Scoped to `.u1--room` throughout, so
   the shipped page is untouched while the two run side by side at ?u1=room.

   â˜…â˜… THE FILE IS WRITTEN STATIC-FIRST. Everything above the `.is-live` block lays
   the room out as an ordinary document: a warm section, a plaque, six ruled rows
   each with its working, a crown, a stair. NOTHING is sticky, absolute or
   transformed. `_u1-room.js` adds `.is-live` only after it has measured a laid-out
   node on a viewport it was designed for â€” so no-JS, JS-late, JS-failed, reduced
   motion, mobile and the launch build all get the same finished page, and the
   mechanism is an enhancement layered on top of it. Do not "simplify" by moving a
   position:absolute above the .is-live guard; that is the whole design.

   â˜…â˜… AND THE WIDTH BUG, WHICH IS A RE-FIX. `#about` is a column flex item under
   .menurev's align-items:center (reveal/reveal.css:1274, which loads after
   styles.css at index.html:19 and wins on source order). A column flex item at
   align-items:center is FIT-CONTENT in the cross axis, so `.u1{max-width:...}`
   (styles.css) never binds and the section takes the max-content width of its
   widest child â€” `.u1head__ident{max-width:34em}` at 21px = 714px inside a 1440px
   window. BR-S271 (a7786b5) found and fixed this once; the fix left with the
   .about__ markup at BR-S366. A room is full-bleed by nature, so align-self:stretch
   is the fix and the design in one declaration. Do not restore max-width here.
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.u1--room { align-self: stretch; width: 100%; max-width: none; margin: 0; padding: 0; }

.u1--room .u1rm {
  /* the palette is the rack's, which is BR-S448's corrected blue under a warm
     plate â€” the same two grounds U1's header already sat on. No new colour. */
  --rm-paper:#12100d; --rm-blue:#0e1622; --rm-blue2:#070a10;
  --rm-ink:#d6cec1;   --rm-mk:#b9c3cf;   --rm-rule:#2b3038;
  --rm-gold:#d8cfa8;  --rm-dim:#8f877a;

  /* â˜… THE TWO SEAMS. The ceiling is --hair-1 (styles.css :root): structure, at
     rest, never written to â€” it is the desk's underside and it does not move for
     the rest of the visit. The floor is the rack's own white threshold
     (_u1-rack.js:80) and it is the only line in the room that changes, brightening
     as the crown arrives, because by then you are standing on it. One line is
     architecture; one line is the machine. No other surface in the house has both. */
  --rm-ceil: 2.4%;     /* one plaque line-height below the frame top, so the seam
                          reads as a ceiling with air under it, not as the frame edge */
  --rm-floor: 62%;     /* == F.THRESH, UNCHANGED. Every other constant in the module
                          (SHELF, CLOSE, DEEP, ZFAR, PERSP, EMERGE) was tuned against
                          0.620. Moving the line silently retunes all six. */

  /* â˜… 280svh, AND THE NUMBER IS DERIVED. span = (2.80 - 1.00)H = 1.80H. The six
     marks occupy p 0.100->0.820 = 0.720 of span = 1.296H = 1166px at H=900, i.e.
     194px PER MARK â€” about two wheel notches (Windows default ~100px/notch).
     The shipped rack is 420svh: span 3.20H, marks over 0.760 = 2.432H = 2189px,
     365px per mark, ~3.7 notches each. That ratio is the rack's own open question
     (BR-S452: "whether 3.23:1 reads as GEARING or as the page failing to keep up")
     and 365px/mark is on the wrong side of it. No constant in F moves: the drive is
     p = (scrollY - top) / (offsetHeight - H), so shortening the element shortens the
     span and every frame re-derives identically over less scroll. */
  --rm-h: 280vh;

  position: relative; color: var(--rm-ink);
  background: linear-gradient(180deg, #14110e, #100d0b);
}
@supports (height: 100svh) { .u1--room .u1rm { --rm-h: 280svh; } }

/* â”€â”€ THE STATIC ROOM. This is the whole page when nothing is driving it. â”€â”€â”€â”€â”€â”€ */
.u1--room .u1rm__vp     { padding: 34px 0 40px; }
.u1--room .u1rm__ground,
.u1--room .u1rm__clip,
.u1--room .u1rm__under,
.u1--room .u1rm__bow,
.u1--room .u1rm__pinion,
.u1--room .u1rm__pointer { display: none; }
.u1--room .u1rm__ceil,
.u1--room .u1rm__floor  { height: 1px; margin: 30px 0; }
.u1--room .u1rm__ceil   { background: var(--hair-1, rgba(233,229,220,.14)); }
.u1--room .u1rm__floor  { background: rgba(226,232,240,.92); opacity: .42; }

/* THE READING COLUMN. One measure, and it is DECLARED rather than inherited from
   whichever child happens to be widest this month. 34em is the same measure that
   was setting the page's width by accident; chosen this time. */
.u1--room .u1rm__plaque,
.u1--room .u1rm__stack,
.u1--room .u1rm__crownwrap { width: min(34em, 88vw); margin: 0 auto; }

.u1--room .u1rm__eyebrow { font-family: var(--font-mono); font-size: 9.5px; font-weight: 500;
  letter-spacing: .26em; text-transform: uppercase; color: var(--rm-dim); margin: 0 0 14px; }
.u1--room .u1rm__mark    { color: var(--gold, #c9a35c); }
/* two block spans, never a <br>: the <br> made textContent read
   "Everything read hereis yours to keep." to anything that does not honour it. */
.u1--room .u1rm__ln      { display: block; }
.u1--room .u1rm__title   { font-family: var(--font-display); font-size: clamp(30px, 3.6vw, 48px);
  font-weight: 600; line-height: 1.05; letter-spacing: -.012em; color: var(--t-display); margin: 0; }
.u1--room .u1rm__sub     { font-family: var(--font-display); font-size: 19px; line-height: 1.5;
  color: var(--rm-dim); margin: 14px 0 0; }
.u1--room .u1rm__ident   { font-family: var(--font-display); font-size: 21px; line-height: 1.5;
  color: var(--t-body); margin: 18px 0 0; }
.u1--room .u1rm__spec    { font-family: var(--font-mono); font-size: 9.5px; letter-spacing: .16em;
  text-transform: uppercase; color: var(--rm-dim); margin: 20px 0 0; }
.u1--room .u1rm__d    { color: #4a463f; margin: 0 6px; }
.u1--room .u1rm__free { color: #7f9a86; }
.u1--room .u1rm__paid { color: #8a72c4; }
.u1--room .u1rm__lead { font-family: var(--font-display); font-size: 21px; line-height: 1.55;
  color: var(--t-body); margin: 26px 0 0; }

/* THE PLATES. A plate is a patch of the page with a ruled top edge, not an object
   lying on it: no border, no radius, no shadow (_u1-rack.js:113-116). It is opaque
   because in live mode it must occlude its predecessor's second row during the
   close â€” covered, not faded, so the close costs zero opacity writes. */
.u1--room .u1rm__ex   { font-family: var(--font-mono); font-size: 9px; font-weight: 500;
  letter-spacing: .28em; text-transform: uppercase; color: #6d6559; text-align: center;
  margin: 46px 0 18px; }
.u1--room .u1rm__bx   { background: var(--rm-paper); border-top: 1px solid rgba(43,48,56,.9);
  padding: 10px 0 12px; transform-origin: 50% 0; }
.u1--room .u1rm__strip{ display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; }
.u1--room .u1rm__slot { font-family: var(--font-mono); font-size: 10px; letter-spacing: .22em;
  text-transform: uppercase; color: var(--rm-dim); flex: 0 0 auto; }
.u1--room .u1rm__name { font-family: var(--font-display); font-size: 22px; line-height: 1.15;
  color: var(--rm-mk); flex: 1 1 auto; }
.u1--room .u1rm__from { font-family: var(--font-mono); font-size: 10px; letter-spacing: .12em;
  text-transform: uppercase; color: #8a8275; flex: 0 0 auto; }
.u1--room .u1rm__brule{ height: 1px; background: rgba(43,48,56,.9); margin: 11px 0 8px;
  transform-origin: left; }
/* â˜… THE RECEIPT. It takes the row the rack spent on keywords, so the plate's height
   â€” a fraction of H that the geometry depends on â€” does not change. The keywords
   were texture; this is evidence, and it is the difference between a page that says
   the marks are given and a page that shows the sum. #8f9aa8 on #12100d computes to
   about 6.1:1; an earlier lab rendered its honesty disclosure at 2.21:1, which means
   it was not on the page at all (_u1-rack.js:126-128). */
.u1--room .u1rm__rc   { font-family: var(--font-mono); font-size: 11px; line-height: 1.4;
  letter-spacing: .07em; color: #8f9aa8; margin: 0; }
.u1--room .u1rm__prov { font-family: var(--font-mono); font-size: 11px; letter-spacing: .18em;
  color: #5d6b7e; text-align: center; margin: 24px 0 0; }

.u1--room .u1rm__crown { text-align: center; }
.u1--room .u1rm__k     { font-family: var(--font-mono); font-size: 9px; font-weight: 500;
  letter-spacing: .34em; text-transform: uppercase; color: var(--rm-dim); margin: 46px 0 0; }
/* â˜… CAPPED AT 44px. In the shipped page the fixture's name is set at
   clamp(30px,6vw,58px) and the crown at clamp(26px,5vw,50px), both larger than the
   house's own motto â€” a worked example outranking the thing it is an example of.
   The crown is now subordinate to the document it sits in. */
.u1--room .u1rm__n     { font-family: var(--font-display); font-size: clamp(26px, 4.4vw, 44px);
  color: var(--rm-gold); margin: 16px 0 0; }
.u1--room .u1rm__b     { font-family: var(--font-display); font-size: clamp(13px, 1.8vw, 17px);
  font-style: italic; color: #9d9484; margin: 10px 0 0; }
/* typographic arrows, not drawn threads: a thread from each fragment back to its
   mark depends on layout, breaks at every width and vanishes in print. */
.u1--room .u1rm__deriv { font-family: var(--font-mono); font-size: 11px; line-height: 1.8;
  letter-spacing: .08em; color: #6d7b8e; margin: 18px 0 0; }
.u1--room .u1rm__gap   { display: inline-block; width: 1.6em; }
.u1--room .u1rm__note  { font-family: var(--font-display); font-size: 17px; line-height: 1.5;
  color: var(--rm-dim); margin: 16px auto 0; max-width: 30em; }
.u1--room .u1rm__fix   { font-family: var(--font-mono); font-size: 11px; line-height: 1.6;
  letter-spacing: .1em; color: #6d6559; margin: 14px 0 0; }

/* â”€â”€ ACT IV Â· THE STAIR. Always in flow, in both modes. */
.u1--room .u1rm__stair { background: #070a10; border-top: 1px solid rgba(226,232,240,.30);
  padding: 40px clamp(24px, 6vw, 90px) 48px; }
.u1--room .u1rm__lbl   { font-family: var(--font-mono); font-size: 9.5px; font-weight: 500;
  letter-spacing: .28em; text-transform: uppercase; color: var(--rm-dim); margin: 0 0 12px; }
.u1--room .u1rm__plate { font-family: var(--font-display); font-size: 19px; line-height: 1.5;
  color: var(--rm-ink); margin: 0; max-width: 34em; }
.u1--room .u1rm__door  { display: inline-flex; align-items: baseline; gap: 14px; flex-wrap: wrap;
  margin: 20px 0 0; padding: 10px 16px 9px; text-decoration: none;
  background: var(--rm-paper); border-top: 1px solid rgba(43,48,56,.9);
  transition: background 180ms ease; }
.u1--room .u1rm__door:hover, .u1--room .u1rm__door:focus-visible { background: #171410; }
.u1--room .u1rm__door:focus-visible,
.u1--room .u1rm__up:focus-visible { outline: 1px solid var(--rm-gold); outline-offset: 3px; }
.u1--room .u1rm__doorname { font-family: var(--font-display); font-size: 19px; color: var(--t-display); }
.u1--room .u1rm__doorcost, .u1--room .u1rm__doorcta {
  font-family: var(--font-mono); font-size: 9.5px; letter-spacing: .14em; text-transform: uppercase; }
.u1--room .u1rm__doorcost { color: #6f6a61; }
.u1--room .u1rm__doorcta  { color: var(--silver, #c8c4bb); }
.u1--room .u1rm__foot { display: flex; align-items: baseline; gap: 18px; flex-wrap: wrap;
  margin-top: 34px; padding-top: 22px; border-top: 1px solid rgba(233,229,220,.10); }
.u1--room .u1rm__up   { background: none; border: 0; border-bottom: 1px solid rgba(200,196,187,.3);
  font-family: var(--font-mono); font-size: 10px; letter-spacing: .16em; text-transform: uppercase;
  color: var(--silver, #c8c4bb); padding: 0 0 3px; cursor: pointer;
  transition: color 180ms ease, border-color 180ms ease; }
.u1--room .u1rm__up:hover, .u1--room .u1rm__up:focus-visible {
  color: var(--t-display); border-bottom-color: rgba(233,229,220,.7); }
.u1--room .u1rm__seal { margin-left: auto; font-family: var(--font-display); font-size: 17px; color: #7c766c; }
.u1--room .u1rm__seal span { color: var(--gold, #c9a35c); font-size: 11px; opacity: .8; margin-right: 8px; }

/* â•â•â• THE LIVE ROOM. Added by _u1-room.js, and ONLY after it has measured a
   laid-out node on a viewport â‰¥720px with motion allowed. Everything from here
   down is the mechanism; everything above it is the page. â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.u1--room .u1rm.is-live { height: var(--rm-h); padding: 0; background: none; }
/* svh FIRST is not an ordering nicety: mobile URL bars resize vh mid-scroll, which
   re-derives the scroll fraction under the reader's own thumb (_u1-rack.js:53-54). */
.u1--room .u1rm.is-live .u1rm__vp { position: sticky; top: 0; height: 100vh; height: 100svh;
  overflow: hidden; padding: 0; }

.u1--room .u1rm.is-live .u1rm__ground { display: block; position: absolute; inset: 0;
  background: linear-gradient(180deg,
    #0a0b0d 0%, #0a0b0d var(--rm-ceil),          /* the underside of the desk */
    #14110e var(--rm-ceil), #100d0b 61.999%,     /* the room's air */
    var(--rm-blue) var(--rm-floor), var(--rm-blue2) 100%); }  /* HARD stop: a threshold, not a blend */
.u1--room .u1rm.is-live .u1rm__clip { display: block; position: absolute; left: 0; right: 0; overflow: hidden; }
.u1--room .u1rm.is-live .u1rm__clip--air  { top: var(--rm-ceil); height: calc(var(--rm-floor) - var(--rm-ceil)); }
.u1--room .u1rm.is-live .u1rm__clip--deep { top: var(--rm-floor); bottom: 0; }
.u1--room .u1rm.is-live .u1rm__field { position: absolute; left: 0; right: 0; top: -120px; height: calc(100% + 260px); }
/* PAPER â€” its period IS the shelf, so a plate lands exactly one ruling apart. */
.u1--room .u1rm.is-live .u1rm__paper { background: repeating-linear-gradient(180deg,
  rgba(43,48,56,.30) 0 1px, transparent 1px var(--rm-Pp)); }
/* DEEP â€” cooler and brighter: the water reads as the faster gear. */
.u1--room .u1rm.is-live .u1rm__deep  { background: repeating-linear-gradient(180deg,
  rgba(150,175,205,.30) 0 1px, transparent 1px var(--rm-Pd)); }

.u1--room .u1rm.is-live .u1rm__ceil  { position: absolute; left: 0; right: 0; top: var(--rm-ceil);
  height: 1px; margin: 0; background: var(--hair-1, rgba(233,229,220,.14)); z-index: 9; }
.u1--room .u1rm.is-live .u1rm__floor { position: absolute; left: 0; right: 0; top: var(--rm-floor);
  height: 1px; margin: 0; background: rgba(226,232,240,.92); opacity: .42; z-index: 9; }
/* THE OCCLUDER â€” opaque, static, zero writes. A plate under this is genuinely not
   there: covered, not faded, which is why the whole rise needs no opacity writes. */
.u1--room .u1rm.is-live .u1rm__under { display: block; position: absolute; left: 0; right: 0;
  top: calc(var(--rm-floor) + 1px); bottom: 0; z-index: 6;
  background: linear-gradient(180deg, var(--rm-blue), var(--rm-blue2)); }
/* THE BOW â€” the surface straining as a plate breaks the line. One pre-drawn path,
   origin at its bottom, one scaleY write. */
.u1--room .u1rm.is-live .u1rm__bow { display: block; position: absolute; left: 0; right: 0;
  top: calc(var(--rm-floor) - 26px); height: 26px; z-index: 5; transform-origin: 50% 100%; }
.u1--room .u1rm.is-live .u1rm__bow svg { width: 100%; height: 100%; display: block; }
/* THE PINION â€” one long tooth per mark past a STATIONARY gold pointer. The pointer
   is a SIBLING, not a child, so the count is read against a fixed reference. R is
   derived from H in measure(), never hardcoded. */
.u1--room .u1rm.is-live .u1rm__pinion { display: block; position: absolute; left: 50%; top: 102%;
  width: var(--rm-R2, 612px); height: var(--rm-R2, 612px); z-index: 7;
  margin: calc(var(--rm-R2, 612px) / -2) 0 0 calc(var(--rm-R2, 612px) / -2); }
.u1--room .u1rm.is-live .u1rm__pinion svg    { width: 100%; height: 100%; }
.u1--room .u1rm.is-live .u1rm__pinion circle { fill: none; stroke: rgba(150,175,205,.16); }
.u1--room .u1rm.is-live .u1rm__pinion line   { stroke: rgba(150,175,205,.26); }
.u1--room .u1rm.is-live .u1rm__pointer { display: block; position: absolute; left: 50%;
  width: 2px; height: 22px; margin-left: -1px; background: var(--rm-gold); z-index: 8; opacity: .85; }

/* THE PLAQUE rides out on the shelf rate. Its band mirrors the rack's intake
   (top 0, height 55.8%) so its clearance to plate 0 is constant at every tooth and
   they can never collide; it is CENTRED rather than bottom-aligned because, unlike
   the intake, only its bottom edge is geometrically constrained, and centring puts
   the page's own title in the frame's optical centre instead of hard against the line. */
.u1--room .u1rm.is-live .u1rm__plaque { position: absolute; left: 50%; top: 0; height: 55.8%;
  width: min(34em, 88vw); margin: 0 0 0 min(-17em, -44vw); z-index: 3;
  display: flex; flex-direction: column; justify-content: center;
  padding: calc(var(--rm-ceil) + 18px) 0 6.2%; }
.u1--room .u1rm.is-live .u1rm__lead { margin-top: 22px; font-size: 19px; }

.u1--room .u1rm.is-live .u1rm__ex   { position: absolute; left: 0; right: 0; top: 4.6%;
  margin: 0; z-index: 9; }
.u1--room .u1rm.is-live .u1rm__prov { position: absolute; left: 0; right: 0; top: 86%;
  margin: 0; z-index: 9; }
.u1--room .u1rm.is-live .u1rm__stack{ position: absolute; inset: 0; width: auto; margin: 0; z-index: 4; }
.u1--room .u1rm.is-live .u1rm__bx   { position: absolute; left: 50%; top: 0;
  width: min(52vw, 520px); margin-left: min(-26vw, -260px); height: 11.5%; padding: 8px 0 0; }
.u1--room .u1rm.is-live .u1rm__crownwrap { position: absolute; left: 50%; top: 14.1%; height: 20%;
  width: min(34em, 88vw); margin: 0 0 0 min(-17em, -44vw); overflow: hidden; z-index: 3;
  display: flex; align-items: flex-end; justify-content: center; }
.u1--room .u1rm.is-live .u1rm__k     { margin-top: 0; }
.u1--room .u1rm.is-live .u1rm__crown { padding-bottom: 10px; }
/* in live mode the crown block must fit its clip; the two long prose lines are the
   static page's job and are carried by the same block at reduced size. */
.u1--room .u1rm.is-live .u1rm__note  { font-size: 15px; margin-top: 12px; }
.u1--room .u1rm.is-live .u1rm__deriv { margin-top: 14px; }

/* â˜… REDUCED MOTION NEEDS NO RULES HERE, AND THAT IS THE POINT. The module reads
   the media query and never adds `.is-live`, so the reader gets the static page
   above â€” complete, top to bottom, in one document. The rack's approach freezes
   the ground, the pinion and the depth but leaves plates and crown translating as
   pure functions of scroll (_u1-rack.js:279,350,386,378-401), so a reduced-motion
   reader still scrolls 2880px to read six lines and there is no scroll position at
   which everything is visible. A single belt-and-braces line, in case a future pass
   adds the class from somewhere else: */
@media (prefers-reduced-motion: reduce) {
  .u1--room .u1rm.is-live { height: auto; background: linear-gradient(180deg,#14110e,#100d0b); }
  .u1--room .u1rm.is-live .u1rm__vp { position: static; height: auto; overflow: visible; padding: 34px 0 40px; }
}

/* NARROW. The mechanism is undesigned for mobile and says so (BR-S452: "NOT DONE:
   mobile"), and its geometry is fractions of a 900px viewport height against a
   phone's ~650px. The module does not go live below 720px, so a phone gets the
   static room: the same words, the same six receipts, the same crown, no gears.
   The page does not get shorter on a phone; only the demonstration does. */
@media (max-width: 719px) {
  .u1--room .u1rm__plaque, .u1--room .u1rm__stack, .u1--room .u1rm__crownwrap { width: 88vw; }
  .u1--room .u1rm__title { font-size: clamp(26px, 8vw, 34px); }
  .u1--room .u1rm__ident, .u1--room .u1rm__lead { font-size: 19px; }
  .u1--room .u1rm__from  { flex-basis: 100%; }
  .u1--room .u1rm__gap   { display: block; height: 0; width: 0; }
  .u1--room .u1rm__seal  { margin-left: 0; flex-basis: 100%; }
}
```

### c.3 â€” `_u1-room.js`

```js
/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   U1 Â· THE ROOM â€” the drive.  `_u1-room.js`   PROTOTYPE, gated on ?u1=room.

   â˜…â˜… THIS MODULE CREATES NO MARKUP AND OWNS NO COPY. renderAboutRoom() emits the
   whole room; this adds one class and a stream of transforms. That inversion is the
   single reason the launch build, a phone, a reduced-motion reader, a failed script
   and the frozen preview pane all get a correct page: the page does not depend on
   this file existing.

   â˜… THE GO-LIVE GATE IS THE ONLY NEW POLICY IN THE FILE. Three conditions, all
   read before the first write:
     1. motion is allowed,
     2. the viewport is at least 720px wide (the mechanism is undesigned below that
        and its constants are fractions of a ~900px height),
     3. the node is actually laid out.
   Fail any one and the room stays a document. This is the opposite of the usual
   shape â€” normally the enhancement runs and a media query claws pieces back â€” and
   it is deliberate: a partial freeze is what leaves a reader scrolling 1620px
   through a page that will not finish.

   CARRIED VERBATIM FROM `_u1-rack.js`, cited rather than re-derived because each
   was argued once and re-deriving re-opens a settled decision:
     Â· the write memo and setT/setO           :244-262
     Â· device-pixel rounding, px()/ty()       :263-265
     Â· arm() â€” will-change by ARITHMETIC      :266-275
     Â· measure()'s refusal on a zero-height node and its remembered refusal, and
       the repaint at the fraction the reader is ACTUALLY at   :288-329
     Â· the rAF drive with onScreen STARTING TRUE, and the IntersectionObserver whose
       only job is to turn it off â€” fail toward working        :482-498
     Â· the dual window + document-capture scroll binding       :517-532
     Â· the mount tick, the bounded poll, and the MutationObservers on #menuView's
       childList, <html>[data-view] and .menu[class]           :595-623
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
(function (root) {
  "use strict";
  if (!/[?&]u1=room/.test(String(root.location.search || ""))) return;

  var mq = root.matchMedia;
  var REDUCED = mq && mq("(prefers-reduced-motion: reduce)").matches;
  var WIDE    = function () { return !mq || mq("(min-width: 720px)").matches; };

  /* â”€â”€ CONSTANTS, as fractions of the LOCKED viewport height. Captured once in
       measure(); never read in the handler. Carried from _u1-rack.js:172-186 with
       deep-B dropped and the p-map retimed for the shorter room. â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  var F = {
    THRESH: 0.620,   // the white line == --rm-floor
    SHELF:  0.093,   // open pitch â€” one notch above the line, == the paper period
    CLOSE:  0.0465,  // closed pitch = SHELF/2, so the closed stack stays in register
    DEEP:   0.300,   // one notch below the line
    ZFAR:   0.550,   // depth at which a plate waits under the water
    PERSP:  1.278,   // -> projected scale 0.699 at ZFAR
    Pp:     0.093,   // paper period (== SHELF)
    Pd:     0.104,   // deep period â€” non-harmonic against Pp by construction
    RATE_D: 0.300    // deep travel per mark -> 0.74x scroll against the paper's 0.23x
  };
  var EMERGE = 1.237;  // = plate height / SHELF â€” notches from the line to fully clear

  /* â˜… THE p-MAP, AND EVERY BOUND IS DERIVED FROM ONE DECISION: 194px of scroll per
     mark (~two wheel notches) at H=900 with span = 1.80H = 1620px.
       6 marks x 194px = 1166px = 0.720 of span  -> MARK_A .. MARK_B
       the close and the crown take one mark's worth each (0.080, 0.040 after the
       close has already gathered the stack), and
       HOLD 0.940 -> 1.000 = 0.060 of span = 97px = ONE wheel notch of finished,
       still-pinned frame before the sticky viewport releases and the stair rises. */
  var MARK_A = 0.100, MARK_B = 0.820,
      CLOSE_A = 0.820, CLOSE_B = 0.900,
      CROWN_A = 0.900, CROWN_B = 0.940;

  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function win(p, a, b) { return clamp01((p - a) / (b - a)); }
  function eo(t) { return 1 - Math.pow(1 - t, 3); }
  /* a repeating gradient is identical under translation by whole periods, so the
     translate is taken modulo its own period: the numbers stay under 100px instead
     of running to -1900, and the clip needs no headroom. Visually exact. */
  function wrap(v, p) { return ((v % p) + p) % p; }

  /* the write memo (_u1-rack.js:244-262). It decides WHETHER a write is issued,
     never WHAT value is computed, and it initialises empty â€” so a cold load at any
     scroll position renders the identical frame. Do not delete it on principle. */
  var memo = (typeof WeakMap === "function") ? new WeakMap() : null;
  function setT(n, v) { var m = memo && memo.get(n); if (m && m.t === v) return;
    n.style.transform = v; if (m) m.t = v; else if (memo) memo.set(n, { t: v, o: null }); }
  function setO(n, v) { var m = memo && memo.get(n); if (m && m.o === v) return;
    n.style.opacity = v;   if (m) m.o = v; else if (memo) memo.set(n, { t: null, o: v }); }
  var DPR = root.devicePixelRatio || 1;
  function px(v) { return ((v * DPR) | 0) / DPR; }
  function ty(v)  { return "translate3d(0," + px(v) + "px,0)"; }

  /* will-change armed and cleared BY ARITHMETIC, never by an animationend handler â€”
     that is the exact leak the house law names. Each flips only on its edge. */
  var armed = { ground: null, stack: null, crown: null };
  function arm(k, want, nodes, hint) {
    if (armed[k] === want) return; armed[k] = want;
    for (var i = 0; i < nodes.length; i++) nodes[i].style.willChange = want ? hint : "";
  }

  var el = null, plates = null, M = { H: 900, top: 0, span: 1 }, C = {}, dirty = false;

  function scrollP() {
    return clamp01(((root.scrollY || root.pageYOffset || 0) - M.top) / M.span);
  }

  function measure() {
    if (!el) return;
    /* â˜…â˜… NEVER MEASURE A ROOM THAT IS NOT LAID OUT (the BR-S488 defect, verbatim).
       U1 sits inside `.menu`, which is display:none in room and dev views, and
       `#about` itself is hidden while the reliquary panel is open. Measuring any of
       those gives offsetHeight 0, span collapses to 1, p becomes 1 for any scroll
       past a pixel, and the room stands permanently at its final frame for the rest
       of the session. Refuse rather than fudge, and REMEMBER the refusal so the
       reveal path can re-enter. */
    if (!el.room.offsetHeight) { dirty = true; return; }
    dirty = false;

    /* â˜… THE GO-LIVE GATE. Checked here, not at load, because the width can change
       and the class must be able to come back OFF. Removing it restores the static
       document exactly â€” no residue, because every live rule is behind `.is-live`
       and every transform we wrote lives on a node that goes back to static flow. */
    if (REDUCED || !WIDE()) {
      if (el.room.classList.contains("is-live")) {
        el.room.classList.remove("is-live");
        clearWrites();
      }
      return;
    }
    if (!el.room.classList.contains("is-live")) {
      el.room.classList.add("is-live");
      /* the class changes the layout, so everything below must be read after it */
    }

    var r = el.room.getBoundingClientRect();
    M.top  = r.top + (root.scrollY || root.pageYOffset || 0);
    M.H    = el.vp.clientHeight || root.innerHeight;
    M.span = Math.max(1, el.room.offsetHeight - M.H);
    for (var k in F) C[k] = F[k] * M.H;

    /* the ruled periods are written as custom properties ONCE, here â€” the fields are
       static paint after this and only ever receive a transform. */
    el.paper.style.setProperty("--rm-Pp", C.Pp + "px");
    el.deep .style.setProperty("--rm-Pd", C.Pd + "px");
    el.pinion.style.setProperty("--rm-R2", (2 * 0.340 * M.H) + "px");
    el.pointer.style.top = (1.02 * M.H - 0.340 * M.H) + "px";
    /* BR-S488 floors. Every other size in the sheet is a clamp(); these were bare
       fractions of H, so a 700px viewport put the slot label at 7.8px â€” a legend
       nobody can read, on the row that carries the provenance. */
    el.stack.style.setProperty("--rm-nameSize", Math.max(15, 0.0244 * M.H).toFixed(2) + "px");
    el.stack.style.setProperty("--rm-label",    Math.max(10, 0.0111 * M.H).toFixed(2) + "px");

    DPR = root.devicePixelRatio || 1;
    if (typeof WeakMap === "function") memo = new WeakMap();  // geometry changed: every cached write is stale
    lastP = -1;
    /* repaint at the fraction the reader is ACTUALLY at, not a cached one: measuring
       after a resize used to repaint the frame computed under the OLD viewport. */
    draw(scrollP());
  }

  /* leaving live mode must leave NOTHING behind â€” a stale transform on a node that
     is now in normal flow is a page with a hole in it. */
  function clearWrites() {
    var all = [el.paper, el.deep, el.pinion, el.bow, el.plaque, el.crown, el.floor]
      .concat(plates.map(function (q) { return q.el; }))
      .concat(plates.map(function (q) { return q.rule; }));
    for (var i = 0; i < all.length; i++) if (all[i]) {
      all[i].style.transform = ""; all[i].style.opacity = ""; all[i].style.willChange = "";
    }
    armed = { ground: null, stack: null, crown: null };
    if (typeof WeakMap === "function") memo = new WeakMap();
  }

  function draw(p) {
    if (!el || !el.room.classList.contains("is-live")) return;

    /* THE TWO SCALARS. A is the tooth count, monotone 0 -> 7; the seventh tooth is
       the crown, which is why THE PINION NEVER STOPS â€” freezing the gear train
       during the payoff is what made an earlier build read as a video that ended. */
    var Am = win(p, MARK_A, MARK_B) * 6;
    var A  = Am + win(p, CROWN_A, CROWN_B);
    var AG = win(p, 0.000, MARK_A) * 0.6 + A;   // the water moves from p = 0

    /* THE GROUND. Two planes, two rates, one scalar. Above the line 0.23x scroll,
       below it 0.74x â€” the same 1px hairline at two visibly different speeds either
       side of one visible edge, comparable in a single frame. That is the whole
       thesis, and it is three transform writes. */
    setT(el.paper,  ty(-wrap(Am * C.Pp, C.Pp)));
    setT(el.deep,   ty(-wrap(AG * C.RATE_D, C.Pd)));
    setT(el.pinion, "rotate(" + (A * 60).toFixed(2) + "deg)");

    /* THE BOW peaks on the fractional part of the tooth, so it is a consequence of
       the gear rather than a second timeline. A hairline bending a few px. */
    var frac = A - Math.floor(A);
    var bow  = (A > 0 && A < 6.02) ? Math.sin(frac * Math.PI) : 0;
    setT(el.bow, "scaleY(" + (0.12 + bow * 0.28).toFixed(3) + ")");

    /* THE PLAQUE leaves BY GEAR at the shelf rate, so its last pixel exits exactly
       as the sixth mark seats: the header is pushed out by the answers. Its
       clearance to plate 0 is constant at every A, so they can never collide.
       Zero opacity writes. Nothing types, so no label ever stands over a hole. */
    setT(el.plaque, ty(-Am * C.SHELF));

    /* THE PLATES. PITCH is the only thing the close changes: the six gather from one
       notch to a half notch, still in register with the ruling, while the paper
       field locks and the water runs on. The ratio goes 3.23:1 to infinity, and that
       is the readable event â€” the reading is fixed, the source keeps moving. */
    var PITCH = C.SHELF - (C.SHELF - C.CLOSE) * eo(win(p, CLOSE_A, CLOSE_B));
    for (var i = 0; i < 6; i++) {
      var v    = Am - i;
      var yTop = C.THRESH - (v <= 0 ? v * C.DEEP : v * PITCH);
      /* DEPTH: a plate arrives 0.699x wide at the line and WIDENS to full as it
         rises. A thing that gets bigger as it emerges came from behind; a thing that
         keeps its width slid up a slot. transform-origin is the plate's TOP EDGE, so
         the edge lands exactly on its ruling at every scale with no pre-compensation. */
      var zt = eo(clamp01(v / EMERGE));
      var s  = C.PERSP / (C.PERSP + C.ZFAR * (1 - zt));
      setT(plates[i].el, ty(yTop) + " scale(" + s.toFixed(4) + ")");
      /* the inner rule draws on the same beat the plate rises â€” one gear, two hands.
         ALL THREE BRANCHES ARE WRITTEN EVERY FRAME: with no case for the low range
         the rule kept whatever was last written, so scrolling back up left it
         stranded mid-draw while a cold load at the same position showed it fully
         drawn â€” three renderings of one scroll position, in an engine that claims
         determinism. */
      if (v > 0.2 && v < 1.1) setT(plates[i].rule, "scaleX(" + eo(win(v, 0.35, 0.90)).toFixed(3) + ")");
      else if (v >= 1.1)      setT(plates[i].rule, "scaleX(1)");
      else                    setT(plates[i].rule, "scaleX(0)");
    }

    /* THE CROWN climbs out of the closed stack's own top edge through a static clip.
       The translate is a percentage of the crown's OWN height, never a fraction of
       H â€” an H-derived offset leaves gold text behind the plates on short viewports. */
    var c = eo(win(p, CROWN_A, CROWN_B));
    setT(el.crown, "translate3d(0," + ((1 - c) * 100).toFixed(2) + "%,0)");
    /* the floor seam brightens as the crown arrives: by then you are standing on it. */
    setO(el.floor, (0.42 + 0.43 * c).toFixed(3));

    arm("ground", p > 0.001 && p < 0.995, [el.paper, el.deep, el.pinion], "transform");
    arm("stack",  p > 0.060 && p < 0.995,
        plates.map(function (q) { return q.el; }).concat([el.plaque]), "transform");
    arm("crown",  p > CROWN_A - 0.02, [el.crown], "transform");
  }

  /* â”€â”€ MOUNT. U1 is re-rendered on menu remounts, which takes this whole subtree
       with it, so mounting is a tick rather than a one-shot install. Unlike the
       rack, mount() ADOPTS markup that is already correct rather than injecting
       any â€” so a mount that never happens costs the reader nothing. â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
  function mount(d) {
    var about = d && d.getElementById("about");
    var node  = about && about.querySelector("[data-u1room]");
    if (!node) { el = null; plates = null; return false; }
    if (el && el.room === node && !dirty) return true;      // already adopted

    var q = function (s) { return node.querySelector(s); };
    el = { room: node, vp: q("[data-vp]"), paper: q("[data-paper]"), deep: q("[data-deep]"),
           bow: q("[data-bow]"), floor: q("[data-floor]"), pinion: q("[data-pinion]"),
           pointer: q("[data-pointer]"), plaque: q("[data-plaque]"),
           stack: q("[data-stack]"), crown: q("[data-crown]") };
    plates = [].map.call(node.querySelectorAll(".u1rm__bx"), function (b) {
      return { el: b, rule: b.querySelector(".u1rm__brule") };
    });
    armed = { ground: null, stack: null, crown: null };
    if (typeof WeakMap === "function") memo = new WeakMap();
    measure();
    watchVisibility();          // re-pointed per mount: a new node needs a new observer
    return true;
  }

  /* THE WAY OUT uses the SAME curve as the way in â€” _u1GlideTo is the descent's own
     function (app.js:5099-5100, 640ms cubic-bezier(.22,.61,.25,1), deliberately the
     panel slide's duration and curve), so up and down are one motion read twice.
     `behavior:"smooth"` was rejected there: its duration scales with distance and it
     finishes on a tail that reads as lag. Bound once, in capture, on the document. */
  root.document.addEventListener("click", function (e) {
    var b = e.target && e.target.closest && e.target.closest("[data-u1up]");
    if (!b) return;
    e.preventDefault();
    if (!(root._u1GlideTo && root._u1GlideTo(0))) root.scrollTo(0, 0);
  });

  /* â”€â”€ THE DRIVE, the visibility watch, the scroll bindings, the resize/load/
       fonts.ready invalidation set and the bootstrap poll are `_u1-rack.js`
       :482-498, :500-556 and :595-623 unchanged, with `U1Rack` renamed and the
       ?rk=0 test replaced by the ?u1=room gate at the top of this file. Notably
       kept unchanged: onScreen STARTS TRUE and the IntersectionObserver's only job
       is to turn it off, because a pane that never delivers IO must leave a working
       page â€” starting true costs an idle rAF, starting false costs the feature. â”€â”€ */
  var io = null, rafId = 0, onScreen = true, lastP = -1;
  function frame() {
    rafId = 0;
    if (!el || !onScreen) return;
    var p = scrollP();
    if (p !== lastP) { lastP = p; draw(p); }
    rafId = root.requestAnimationFrame(frame);
  }
  /* ... startLoop / stopLoop / watchVisibility / onScroll / tick / poll: verbatim ... */
})(window);
```

---

## (d) THE RACK'S FATE

**KEPT, and SITED. The mechanism survives essentially intact; what is thrown away is the idea that it is the page.**

**Why it is not cut.** It is the only thing anyone has built on this surface that satisfies BR-S422's decision and PART 0's strongest named example at the same time â€” *"showing the real engine output instead of describing it. Certainty demonstrated beats certainty claimed"* (`SURFACE_BRIEF_V1.md:72-73`). And the sentence it carries is the one sentence on the page that a better sentence cannot fix: *"three are read from the date, three from the name and date"* is true, inert, and reads as boilerplate, because provenance always does. Making the reader's own scroll perform the assembly turns an assertion into an experience of the mechanism. Its craft is also not in question â€” transform+opacity only, `will-change` armed and cleared by arithmetic (`:270-275`), gradient translates taken modulo their own period (`:193`), a write memo whose comment says plainly that it decides *whether* and never *what* (`:245-262`), a refusal to measure a zero-height node with the refusal remembered (`:302`), `onScreen` starting true so a silent observer leaves a working page (`:482-488`). Every one of those is a bug someone already paid for and I carry all of them.

**Why it cannot stay as it is.** It is 420svh of single-clause sentence with 931 characters of prose attached, no floor at the bottom, and a fixture person's name as the largest object on the surface. It is `PREVIEW_ONLY`, so the launch build's version of it is a hole. And its reduced-motion path freezes the gears while leaving the content still gated behind 2880px of scroll.

**The five changes, each with its reason.**

1. **It stops injecting markup.** `renderAboutRoom()` emits every element and every word; the module adds `.is-live` and transforms. This is the change that fixes the launch build, no-JS, JS-late, reduced motion and preview-pane verification in one move.
2. **420svh â†’ 280svh.** No constant in `F` moves and no fraction is retuned: the drive is `p = (scrollY âˆ’ top) / (offsetHeight âˆ’ H)`, so shortening the element shortens the span and every frame re-derives identically over less scroll. 365px per mark â†’ **194px per mark**, which is the rack's own open question answered.
3. **The intake typing is cut; the plaque takes its band and its behaviour.** The typing was ~10% of the whole scroll spent writing a fixture's name at 58px, and its `p=0` frame was a label over a hole. The plaque rides out on the same shelf rate â€” the intake's one genuinely good idea, now carrying the page's real content.
4. **Each plate gets a receipt, in the row the keywords used to hold.** The plate's height is a fraction of `H` that the geometry depends on, so this costs nothing. This is D2's idea, and it converts the page's central claim from an assertion into a sum.
5. **Deep-B is cut** â€” a second full-bleed rate that needed a 6%-margin mask to avoid moirÃ© against deep-A, and at 6% margins reads as a rendering artefact. One line restores it if the builder disagrees; this is the one change of the five that is taste, and I say so.

**And it gets a floor.** The stair, in normal flow, is what the mechanism has never had: something to land on that is not the bottom of the document.

---

## (e) WHAT THIS COSTS

**Frame cost (live mode only, desktop, motion allowed).**

| | |
|---|---|
| peak writes/frame | **19** â€” 3 ground (paper, deep, pinion) + 1 bow + 1 plaque + 6 plates + 6 rules + 1 crown + 1 floor opacity |
| shipped rack, same measure | ~18 transform/opacity + 2 `textContent` (the typed intake) |
| steady state | **0** â€” the write memo collapses an unchanged frame to nothing |
| animated properties | `transform`, `opacity`. No `filter`, no `blur`, no `color`, no layout property |
| layout reads per frame | **0** â€” every rect is read in `measure()` and never in `draw()` |
| off-screen | **0** â€” the rAF loop does not run; the IntersectionObserver's only job is to stop it, and `onScreen` starts true so a pane that never reports leaves a working page |
| new elements vs. the rack | âˆ’1 (deep-B) âˆ’3 (intake, its two typed spans, the caret) +6 (receipts, replacing keyword lines) |
| new network | **0** |

Nothing pulses, bounces, jitters or repeats. Everything that moves comes to rest and stays.

**Reduced motion.** The module reads the query and **never adds `.is-live`**. The reader gets the full static document: plaque with all five paragraphs, six ruled rows each with slot, name, provenance tag and its own working, the standing provenance caption, the crown with its derivation and both notes, and the stair with both controls. Nothing is hidden, nothing is gated behind scroll, and there is no partial-freeze state. There is exactly one CSS transition in the whole file (the Codex door's background) and one more on the back-up button; neither is on the critical path.

**No JS / JS failed / JS late / launch build.** Identical to the reduced-motion state, and for the same structural reason: sticky and absolute positioning live entirely behind `.is-live`. **The launch build ships the complete page** rather than a header and a footer â€” which is what `build_public.py:223`'s `PREVIEW_ONLY` currently guarantees it cannot. If the builder later wants the mechanism on the live build too, `_u1-room.js` can move off `PREVIEW_ONLY` without changing a word of the page.

**Mobile.** Below 720px the module does not go live, by the same gate. A phone gets the static room, with the narrow-media rules doing three things: the column goes to 88vw, the plate's provenance tag drops to its own line, and the derivation's three arrow-clauses break onto separate lines. The rack is undesigned for mobile by its own admission (BR-S452) and its constants are fractions of a ~900px viewport height; shipping it to a phone would be shipping something nobody has designed. **The page does not get shorter on a phone; only the demonstration does.**

**Accessibility.** Four headings where the shipped page has one (`h2` title, `h3` "A worked example", `h3` "Sun Â· animal Â· rune Â· trigram make the name", `h3` "Kept here"). **Two focusable elements where the shipped page has zero**, both in normal flow below the sticky viewport, both always tabbable, neither ever made inert by scroll position. `_navStops()` still returns `[0, seat]`; the seat is untouched; no checkpoints are added. The section's `aria-label` loses its stale *"and what is coming"* half.

**What is untouched:** `_navStops()[1]`, `_u1GlideTo`, `_u1BootSeat`, `_u1SyncHash`, `id="about"`, `#about`'s position as a sibling of `.menu__track`, the derived counts, `html.orbit-sealed`'s use of `visibility`, `MENU_PANELS`, and `renderAbout()` itself.

---

## (f) THE ONE QUESTION FOR THE BUILDER

**Open `/?u1=room&rk=0` and scroll once from the seat to the stair. At 194px per mark â€” about two wheel notches each â€” does the ground moving at two different rates either side of the white line read as GEARING, or as the page failing to keep up?**

It is answerable by looking, in one gesture, and nothing else in this design is blocked on anything else. The rack has carried that question unanswered since BR-S452 because it could never be looked at; the whole point of putting the mechanism behind a static page is that the page is now safe to publish while the answer is found. If it reads as gearing, `--rm-h` is finished. If it reads as lag, the fix is one number: **`--rm-h: 340svh`** gives 260px per mark and nothing else in either file changes.