/* ═══════════════════════════════════════════════════════════════════════════════
   U1 — THE ROOM.  `_u1-room.js`   ·  prototype, behind `?u1=room`
   ASSEMBLED BUILD. Two builders wrote one plan in parallel; this is the reconciliation.
   Every seam where the halves disagreed is marked ★SEAM with the call taken.

   The four beats of docs/U1_MOTION_V1.md as ONE mechanism: the given, the fill and
   the letter written on the same scalar, the travel that stacks them into a record.
   `?u1=room` mounts it; without the parameter this file does nothing at all — no
   stylesheet is fetched, no node is touched, no listener bound. Exactly the shape of
   `_m2-box.js:35-39`, and for the same reason.

   ★ THE ONE STRUCTURAL MOVE. The complete document is emitted SYNCHRONOUSLY, in flow,
   before anything is measured, and it survives every path where the mechanism does not
   run. `.is-live` adds sticky + absolute + transforms and NOTHING ELSE; take the class
   off and what is left is a finished page with no residue. That is the state for
   reduced motion, < 860px, no JS, JS late, JS failed, the frozen preview pane, and the
   launch build. Six paths, one page.

   ★ AT PROTOTYPE STAGE THE EMITTER DOES NOT GO IN app.js. `renderAbout()` is untouched.
   ROOM_HTML() is a pure, zero-side-effect function returning a string, written with the
   exact shape it will have in app.js — graduation is a cut-and-paste of one function and
   a two-line diff. THE ONE PROPERTY THIS PROTOTYPE CANNOT DEMONSTRATE IS NO-JS
   COMPLETENESS. The graduation step is what buys it. Said out loud rather than claimed.

   ★ WHAT IS CARRIED FORWARD FROM `_u1-rack.js`, WHICH PAID FOR ALL OF IT (BR-S488):
     · refuse to measure a node with no height, and REMEMBER the refusal (`dirty`)
     · re-enter on <html>[data-view] and on .menu[class] — visibility changes that no
       childList observer ever reports, and the path that left the rack measured at
       zero for a whole session
     · do not trust scroll events: a rAF loop is the drive, events are accelerators,
       and `onScreen` STARTS TRUE so a silent IntersectionObserver cannot kill it
     · arm and clear will-change by ARITHMETIC, on the edge, never on an event
     · re-measure on `load` and on `document.fonts.ready` — the display serif is
       `display=swap` and lands after the first measure

   ★ THREE SHIPPED DEFECTS THIS DESIGN CLOSES, all in `_u1-rack.js` (and its byte-identical
   twin `preview/_u1-rack.js`, md5 ea678e4023d66cd25c267cb096311313):
     1. `:166` truncates the hexagram to "7 · The Army"; the codex holds "7 · The Army (Shī)".
     2. `:162,164,165,166` — four `kw` rows carry words the codex does not hold for that
        mark (`private`, `watchful`, `restraint`, `rhythm`, `exchange`, "the led and the
        leading"). CLAIM_GUARD's exact failure mode: invented words in a mark's own
        labelled slot. THE ROW IS DELETED, NOT CORRECTED — the receipt takes its height.
     3. `:366-370` — the descent lands on an empty label. Here NOTHING TYPES: beat 1 is
        composed at p=0 and rides out by gear. Zero textContent writes in the whole module.

   ★ THE PROHIBITION, ABSOLUTE. The rune, trigram and hexagram come off ONE FNV-1a state
   with only the final salt byte differing, and the rune DETERMINES the other two
   (re-verified independently at the gate: 0 violations in 60,000 seeds; 24 of 192
   (rune,trigram) pairs occur, 192 of 12,288 triples). This page must never print a
   combination count, an odds figure, a "1 in N", or anything that invites the reader to
   multiply 24 × 8 × 64.
   ═══════════════════════════════════════════════════════════════════════════════ */
(function (root) {
  "use strict";

  var doc = root.document;
  var Q = String(root.location.search || "");
  if (!/[?&]u1=room/.test(Q)) return;                 // absent = this file is inert

  /* ── THE RACK COLLISION, closed at module-eval time. ────────────────────────────
     `_u1-rack.js` self-installs on a poll and inserts before `.u1foot`; the room has
     no `.u1foot`, so it would appendChild into the room and two mechanisms would drive
     one section. Fixed here rather than in a handler because THE URL IS THE BOOT TRUTH:
     writing it into the URL means a refresh cannot resurrect the collision. This script
     tag goes immediately BEFORE `_u1-rack.js` in index.html (currently line 145), so the
     parameter is on the URL before the rack reads it. ────────────────────────────── */
  if (!/[?&]rk=/.test(Q) && root.history && root.history.replaceState) {
    try {
      var u = root.location;
      root.history.replaceState(null, "", u.pathname + u.search + "&rk=0" + u.hash);
      Q = String(root.location.search || "");
    } catch (e) { /* a file:// origin refuses replaceState; the rack guard covers it */ }
  }

  /* ═══ THE FIXTURE ══════════════════════════════════════════════════════════════
     RULED 2026-08-16: "mathematically accurate not reality, its tutorial showcase, and
     keep john". A worked example. Every string below was re-derived at the gate from
     `codex-data.json` through `arcana-reading.js`'s own routing (including the
     `fixed element:` filter that cuts the chinese list from 17 to 12) for the exact
     seed this object builds, and every one reproduced.
     ★ ONE OBJECT, ONE TEMPLATE. The record link's href is built from THIS — never
     hand-written — or a future fixture change silently links to a different person's
     reading. That is a whole class of drift removed for four lines. ─────────────── */
  var FIXTURE = { name: "John Bon", y: 1965, m: 7, d: 26, born: "born 26 July 1965",
                  acc: "BR-9772DB" };
  function seedOf(f) { return "birth~" + f.name + "~" + f.y + "~" + f.m + "~" + f.d; }
  /* `readingForSeed` splits on "~" and coerces with +, so month/day are UNPADDED
     (arcana-reading.js:122). encodeURIComponent leaves "~" alone and gives %20 for the
     space, which is exactly the form the resolver reads back. */
  function recordHref(f) { return "?dev=arcana-reading&seed=" + encodeURIComponent(seedOf(f)); }

  /* THE SIX. `rc` is the receipt and it ships verbatim — it is the row the invented
     keywords held, and it is what converts "given, not chosen" from a claim into
     something the reader can check with their own eyes.

     ★★ SEAM · RECEIPTS V AND VI — THE GATE OVERRULED BOTH HALVES.
     The plan and both builders shipped `same hash, next salt · mod 8 = 7` and
     `same hash, next salt · mod 64 = 6`. THOSE DO NOT CHECK OUT. The only hash number
     printed on the page is the rune's 365,940,676, and 365,940,676 mod 8 = 4, not 7;
     mod 64 = 4, not 6. A reader who does the arithmetic the receipt tells them to do
     gets a different answer from the one beside it — in a tutorial whose entire licence
     is that every sum genuinely checks out. The salts differ, so the hashed STRINGS
     differ, so the hash VALUES differ: 382,718,295 and 198,164,486, both re-derived at
     the gate. Printing them makes both receipts checkable and costs nothing.
     It also, incidentally, still discloses nothing about the coupling. */
  var SIX = [
    { slot: "Sun sign",    name: "Leo",                from: "from the date",
      rc: "26 July falls in Jul 23 – Aug 22" },
    { slot: "Year animal", name: "Snake",              from: "from the year",
      rc: "1965 − 4 = 1961 · 1961 mod 12 = 5 → 6th animal" },
    { slot: "Life path",   name: "9",                  from: "from the digits",
      rc: "1+9+6+5+0+7+2+6 = 36 → 3+6 = 9" },
    { slot: "Rune",        name: "Raidho",             from: "drawn · name + date",
      rc: "hash 365,940,676 · mod 24 = 4 → 5th of 24 staves" },
    { slot: "Trigram",     name: "☱ Duì · Lake",       from: "drawn · name + date",
      rc: "hash 382,718,295 · mod 8 = 7 → 8th of 8 gates" },
    /* NOT "→ 7 of 64": that restates the name and teaches nothing. Printing the modulo
       teaches the sum and dodges the collision. */
    { slot: "Hexagram",    name: "7 · The Army (Shī)", from: "drawn · name + date",
      rc: "hash 198,164,486 · mod 64 = 6 → hexagram 7" }
  ];

  /* THE LETTER. Six clauses, ≤125 characters each (measured: 111·115·118·124·116·123,
     spread 1.12:1 — the band IS the parallelism). The budget is DERIVED, not editorial:
     the clause box is 0.080H and the pitch is SHELF 0.093H, so two lines fit at every
     viewport height the mechanism runs at and three do not.
     ★ Its three movements are the record's own chapters, for free. `CH` at
     arcana-reading.js:103-105 is I · The Named (sun, animal, life path) / II · The
     Counsel (rune, trigram) / III · The Standing (hexagram). I–III / IV–V / VI break on
     exactly those seams. IV opens "Then the method changes"; VI stands alone. */
  var LETTER = [
    "The date answers first, and answers Leo. Fixed fire: warmth sustained rather than flared, and asking to be seen.",
    "The year answers second: Snake, whose fixed element is also fire. Perception that observes and plans before it acts.",
    "The whole date is added and reduced to 9 — the number of completion, which closes a cycle and asks what can be let go.",
    "Then the method changes: name and date, hashed. The first lands on Raidho — the wheel, and movement that is rightly directed.",
    "The second lands on Duì, the Lake: one yielding line resting on two firm ones. Open at the surface, solid underneath.",
    "The third lands on hexagram 7, The Army: earth over water. Strength counts for nothing until it is organised and answerable."
  ];
  /* ⚠ CLAIM_GUARD, `pin` RECORD WANTED. "nothing else is used" is TRUE today —
     birthReading(name,y,m,d,seed) takes no time and timeValue() never enters the seed —
     and it is the one sentence here a future build can falsify without touching it,
     because the intake already collects a birth time. */
  var OPENING = "Two things were given, and nothing else is used. What follows is what the archive makes of them.";
  /* The seventh box. TRUE and positive rather than defensive: crownOf() (:100-101)
     touches sun, chinese, rune and trigram only, and fragment() (:123-127) returns null
     for exactly Life path and Hexagram. */
  var CLOSING = [
    "Four of the six make the name. The two fires give Twice-Kindled; Raidho gives the Wayfarer; Duì files it in open water.",
    "The life path and the hexagram make no part of it. They stand at the end unaltered."
  ];

  var CROWN = {
    k: "Sun · animal · rune · trigram make the name",
    n: "The Twice-Kindled Wayfarer",
    b: "bound in open water",
    /* ★ SEAM · the two halves spelled the gaps differently. The stylesheet declares
       `.u1rm__gap { display:inline-block; width:1.6em }`; the JS half emitted
       `&nbsp;·&nbsp;`. Taken: the stylesheet's, because a 1.6em void is a measured gap
       at 11px mono and a nbsp-dot-nbsp is not. */
    /* ★ GATE FIX · AN EMPTY INLINE-BLOCK IS A VISUAL GAP AND NOT A TEXTUAL ONE. Measured
       in the static capture, `.u1rm__gap` as a void rendered the derivation as
       "…both fireWayfarer ← Raidhoin open water…" in innerText — which is what a screen
       reader announces and what a copy-paste yields. The spaces are restored around it;
       the 1.6em void still does the spacing. */
    deriv: "Twice-Kindled ← Leo · Snake, both fire <span class=\"u1rm__gap\"></span> "
         + "Wayfarer ← Raidho <span class=\"u1rm__gap\"></span> in open water ← ☱ Duì",
    /* ★ THE HINGE IS FREE. Word-for-word what the record's own seal already prints at
       arcana-reading.js:360-361. PRESENT TENSE on "return", deliberately not "always" —
       :28-42 records that the hash already changed once at BR-S373, and CLAIM_GUARD #10
       sanctions only this form.
       ★★ SEAM · IT IS `display:none` IN THE LIVE FRAME (stylesheet, `.is-live
       .u1rm__note`) AND PRESENT IN FULL IN THE STATIC PAGE. Builder 1 measured the crown
       block at 256px against a 217px clip, with `align-items:flex-end`, which sends the
       overflow out through the TOP and silently eats `.u1rm__k` — the four-of-six
       disclosure BR-S484 shipped to fix a false claim. A font swap must not be able to
       delete a claim correction. Taken: builder 1's, because the loss is a restatement
       of a link that stands ten lines below it in flow, and the gain is that a true
       disclosure cannot be eaten. Flagged to the builder in (c). */
    note: "The six in the order drawn, keyed to movement, filed as " + FIXTURE.acc
        + ". The same name and the same date return the same six."
  };
  var PROV = "three read from the date · three drawn from the name and date";

  /* ═══ THE SCORE. Fractions of the SPAN. Invariant under viewport and wheel notch. ══
     --u1-h: 300svh → span = offsetHeight − H = 2.00 H = 1800px at H=900 = 18.0 notches
     (Chrome/Windows, 100px/notch).
        beat 1 THE GIVEN     0     – 0.055   1.0 notch
        beats 2‖3 FILL‖LETTER 0.055 – 0.705  11.7 notches = 1.95 / mark
        the writing finishes 0.705 – 0.790   1.5 notches
        beat 4 THE TRAVEL    0.790 – 0.915   2.25 notches
        THE HOLD             0.915 – 1.000   1.5 notches, pinned, nothing moves
     ★ 1.95 notches/mark is THE open question. If wrong the fix is `--u1-h` alone:
     340svh → 2.4 notches/mark, 260svh → 1.6. Nothing else changes either way. */
  var S = {
    GIVEN_OUT: 0.055,
    MARK_A: 0.055, MARK_B: 0.705,
    CLOSE_A: 0.705, CLOSE_B: 0.790,
    TRAV_A: 0.790, TRAV_B: 0.915,
    CROWN_A: 0.884, CROWN_B: 0.915
  };

  /* ═══ THE GEOMETRY. Fractions of the LOCKED viewport height. Captured once in
       measure() into C; never read in the handler.
       ★ EVERY NUMBER HERE IS ALSO DECLARED IN `_u1-room.css` AS A CUSTOM PROPERTY, AND
       THE STYLESHEET IS THE OWNER. This module no longer writes --u1-thresh or the box
       heights back onto the node: two owners for one number is how a threshold moves in
       one file and not the other. What the module writes is only what CSS cannot
       compute — the measured periods, the measured type floors, and the measured
       rail top. ═══════════════════════════════════════════════════════════════════ */
  var F = {
    THRESH: 0.620,   // the white line          == css --u1-thresh: 62%
    SHELF:  0.093,   // open pitch — one notch above the line, == the paper period
    CLOSE:  0.0465,  // closed plate pitch      == css --u1-crown-top/h arithmetic
    DEEP:   0.300,   // one notch below the line
    ZFAR:   0.550,   // depth at which a plate waits under the water
    PERSP:  1.278,   // -> projected scale 0.699 at ZFAR
    Pp:     0.093,   // paper period  (== SHELF)
    Pa:     0.104,   // deep-A period   ⚠ see the sampling note in draw()
    Pb:     0.067,   // deep-B period — non-harmonic against Pa by construction
    RATE_A: 0.300,   // deep-A travel per mark
    RATE_B: 0.132,   // deep-B travel per mark
    AIR:    0.018    // the record's internal air
  };
  var GATE_W = 860;  // ★ a FIRST CUT: where the plate's three-part strip starts to wrap,
  var GATE_H = 620;  //   not where the letter stops being readable. Both want an eye.
  var PAD    = 12;   // the record's clearance from the frame's floor

  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function win(p, a, b) { return clamp01((p - a) / (b - a)); }
  function eo(t) { return 1 - Math.pow(1 - t, 3); }
  /* a repeating gradient is identical under translation by whole periods, so the
     translate is taken modulo its own period: the numbers stay under 100px instead of
     running to -1900, and the clip needs no headroom. Visually exact. */
  function wrap(v, p) { return ((v % p) + p) % p; }

  /* ═══════════════════════════════════════════════════════════════════════════════
     ROOM_HTML — PURE. No side effects, no reads of module state, one string out.
     Written with the exact shape it will have inside renderAbout(). Element order IS
     paint order; z-index is declared in the stylesheet and only for nodes that must
     jump it. Everything decorative carries aria-hidden.
     ═══════════════════════════════════════════════════════════════════════════════ */
  function ROOM_HTML() {
    var i, s = "";

    /* the pinion's 24 teeth, 15° pitch; every 4th is long, so 60° = one tooth per mark */
    var teeth = "", a, x1, y1, x2, y2, r2;
    for (i = 0; i < 24; i++) {
      a  = (i / 24) * Math.PI * 2 - Math.PI / 2;
      r2 = (i % 4 === 0) ? 272 : 284;
      x1 = (306 + Math.cos(a) * 300).toFixed(1); y1 = (306 + Math.sin(a) * 300).toFixed(1);
      x2 = (306 + Math.cos(a) * r2).toFixed(1);  y2 = (306 + Math.sin(a) * r2).toFixed(1);
      teeth += '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"></line>';
    }

    /* ── BEAT 2 · the left track. Plate = strip · static rule · RECEIPT.
         The rule is scaleX(1) and is NEVER written: only the letter is written, because
         a receipt is a fact, not a thing being written. That sharpens the argument and
         saves six writes a frame against the shipped rack. */
    var marks = "";
    for (i = 0; i < 6; i++) {
      marks += '<div class="u1rm__mk" data-i="' + i + '">'
        + '<div class="u1rm__strip">'
        +   '<span class="u1rm__slot">' + SIX[i].slot + '</span>'
        +   '<span class="u1rm__name">' + SIX[i].name + '</span>'
        +   '<span class="u1rm__from">' + SIX[i].from + '</span>'
        + '</div>'
        + '<div class="u1rm__mkrule" aria-hidden="true"></div>'
        + '<p class="u1rm__rc">' + SIX[i].rc + '</p>'
        + '</div>';
    }

    /* ── BEAT 3 · the right track. ONE subtree, not a passage inside each plate.
         A clause inside its plate would be a CAPTION, which U1_MOTION beat 3 forbids,
         and it would read as six fragments rather than one letter. Because this is one
         node with one measure and one ragged edge it is visibly one piece of writing,
         and the pairing is enforced by ARITHMETIC — same scalar, same tooth — not by
         containment. It also says something true: six things are given, one is written.
         ★ THE OPENING MUST BE CHILD 1 AND THE CLAUSES CHILDREN 2..8: the stylesheet
         places the static grid rows by `:nth-child`, so the DOM order IS the row datum
         that pairs clause i with mark i on the static page. */
    var lines = "";
    for (i = 0; i < 6; i++) {
      lines += '<div class="u1rm__ln" data-i="' + i + '">'
        + '<div class="u1rm__lnrule" aria-hidden="true"></div>'
        + '<p class="u1rm__lntext">' + LETTER[i] + '</p>'
        + '</div>';
    }
    lines += '<div class="u1rm__ln u1rm__ln--close" data-i="6">'
      + '<div class="u1rm__lnrule" aria-hidden="true"></div>'
      + '<div class="u1rm__lntext">'
      +   '<p>' + CLOSING[0] + '</p><p>' + CLOSING[1] + '</p>'
      + '</div></div>';

    /* ── the derived spec line. EXPRESSION UNCHANGED from app.js:2467-2471, so the
         paragraph and the numbers under it can never disagree about what exists. */
    var open = root.u1Open(), free = 0, coming = root.u1Public().length - open.length;
    for (i = 0; i < open.length; i++) if (open[i].free) free++;
    var spec = '<span>' + open.length + ' rooms open</span><span class="u1rm__d" aria-hidden="true">&middot;</span>'
             + '<span class="u1rm__free">' + free + ' free to enter</span><span class="u1rm__d" aria-hidden="true">&middot;</span>'
             + '<span class="u1rm__paid">' + (open.length - free) + ' paid</span><span class="u1rm__d" aria-hidden="true">&middot;</span>'
             + '<span>' + coming + ' still to come</span>';

    /* ── THE ONE DOOR. All four strings derived live from ROOMS[key==="codex"]
         (app.js:1550-1553), never transcribed.
         ★★ SEAM · `root.ROOMS` IS PERMANENTLY UNDEFINED AND THE JS HALF READ IT.
         app.js:1525 declares `const ROOMS = [...]` at classic-script top level. A `const`
         goes into the global DECLARATIVE record, not onto `window` — so `root.ROOMS` is
         `undefined`, `cx` is null, and the one door silently never renders while
         `hasDeps()` passes (it tests the bare identifier, which resolves correctly across
         classic scripts). That is the worst failure shape available: a guard that says
         yes and a page that comes out wrong. Read the bare identifier.
         ★ WHY THE CODEX AND NOT THE BIRTH READING. The reader's live question is "do it
         for me" and the honest door is ROOMS["arcana"] — but it is free:false,
         cost "$4.99 · $7.99 for two", and THERE IS NO PAYMENT PATH IN THIS BUILD.
         The Codex is also the object every receipt on this page quoted — all six marks
         are codex-data.json entries. Changing it is a COMMERCE decision, not a
         structural one, and it is one line. */
    var cx = null, R = (typeof ROOMS !== "undefined" && ROOMS) || [];
    for (i = 0; i < R.length; i++) if (R[i].key === "codex") cx = R[i];
    /* the first sentence of `now` — the door is a line, not a paragraph. Derived rather
       than transcribed so a registry edit reaches it. */
    var cxLine = cx ? String(cx.now).split(/\.\s/)[0] : "";

    s += '<div class="u1rm" data-u1room>';
    s +=   '<div class="u1rm__vp" data-vp>';

    /* ── the ground. Three planes, three rates, one scalar. Static paint, zero writes
         on the clips; only the fields inside them ever receive a transform. */
    s +=     '<div class="u1rm__ground" aria-hidden="true"></div>';
    s +=     '<div class="u1rm__clip u1rm__clip--air" aria-hidden="true"><div class="u1rm__field u1rm__paper" data-paper></div></div>';
    s +=     '<div class="u1rm__clip u1rm__clip--deep" aria-hidden="true"><div class="u1rm__field u1rm__deepA" data-deepa></div></div>';
    s +=     '<div class="u1rm__clip u1rm__clip--deep" aria-hidden="true"><div class="u1rm__field u1rm__deepB" data-deepb></div></div>';
    /* the bow — the surface straining as a plate breaks the line. One pre-drawn path,
       origin at its bottom, ONE scaleY write. */
    s +=     '<div class="u1rm__bow" data-bow aria-hidden="true"><svg viewBox="0 0 1000 26" preserveAspectRatio="none">'
      +        '<path d="M0 26 Q 500 0 1000 26" fill="none" stroke="rgba(226,232,240,.30)" stroke-width="1"/></svg></div>';
    s +=     '<div class="u1rm__ceil" aria-hidden="true"></div>';

    /* ═══ BEAT 1 · THE GIVEN. Composed at p=0. NOTHING TYPES. It leaves BY GEAR at the
         same shelf rate as the plates, so its last pixel exits exactly as mark 6 seats —
         the question is pushed out by the answers. 6 × 0.093 = 0.558 is the block's own
         height, so the exit needs no new constant. Zero opacity writes on the block. */
    s +=     '<header class="u1rm__given" data-given>';
    s +=       '<p class="u1rm__eyebrow"><span class="u1rm__mark" aria-hidden="true">&#9670;</span> BLUE ROOM &middot; ONE FLOOR DOWN</p>';
    /* ★ SEAM · TWO BLOCK SPANS, and they carry `.u1rm__tl` — the stylesheet declares
       `.u1rm__tl { display:block }` and the JS half emitted bare <span>s, which would
       have set the motto as one run-on line. Taken: the stylesheet's class.
       Never a <br>: a line break inside a heading is announced as nothing and a narrow
       viewport cannot re-wrap it. */
    s +=       '<h2 class="u1rm__title"><span class="u1rm__tl">Everything read here</span>'
      +          '<span class="u1rm__tl">is yours to keep.</span></h2>';
    s +=       '<p class="u1rm__ident">The archive draws tarot and birth readings, '
      +          'and&nbsp;files&nbsp;each one on a page of its own.</p>';
    s +=       '<p class="u1rm__spec">' + spec + '</p>';
    s +=       '<p class="u1rm__lead">A birth reading is six marks. Three are read from the date, '
      +          'three are drawn from the name and date &mdash; and each shows its working.</p>';
    /* ★ THE GIVEN ITSELF, and the node that RETURNS. It rides out with the block at beat
       1 and comes back at the travel as the record's head — same name, same date, now
       carrying a name it did not have. The page ends where it began with one thing
       added, for one transform on a node that already has one.
       The tail is the only opacity write on this track and it exists because the node's
       TEXT must be constant (nothing types): "filed" is not true at beat 1. */
    s +=       '<p class="u1rm__fix" data-fix>'
      +          '<span class="u1rm__fixn">' + FIXTURE.name + '</span>'
      +          '<span class="u1rm__fixsep" aria-hidden="true"> &middot; </span>'
      +          '<span class="u1rm__fixd">' + FIXTURE.born + '</span>'
      +          '<span class="u1rm__fixtail" data-fixtail> &middot; a worked example, filed</span>'
      +        '</p>';
    s +=     '</header>';

    /* required, not decoration: a page showing one person's marks at this size without
       saying so is showing the reader a reading. It never rides out. */
    s +=     '<h3 class="u1rm__exlabel">A worked example</h3>';

    /* ═══ BEATS 2 ‖ 3 — TWO TRACKS, ONE GRID, ONE STACKING CONTEXT. The wrapper is what
         lets ONE occluder cover BOTH tracks instead of two. */
    s +=     '<div class="u1rm__spread" data-spread>';
    s +=       '<div class="u1rm__marks" data-marks>' + marks + '</div>';
    s +=       '<div class="u1rm__letter" data-letter>'
      +          '<p class="u1rm__open">' + OPENING + '</p>' + lines
      +        '</div>';
    s +=     '</div>';

    /* THE OCCLUDER. Opaque and static except for ONE opacity write across the travel —
       see the stylesheet's note at `.is-live .u1rm__under`. */
    s +=     '<div class="u1rm__under" data-under aria-hidden="true"></div>';
    /* the white seam. ONE opacity write a frame, .42 → .85 across the travel. */
    s +=     '<div class="u1rm__floorline" data-floor aria-hidden="true"></div>';

    /* THE CROWN, through a STATIC clip whose bottom edge is the closed rail's top, so it
       emerges top-of-letters first out of an edge made of the six. The translate is a
       percentage of the crown's OWN height, never a fraction of H — an H-derived offset
       is a fixed pixel count, and on a short viewport the crown is taller than it, which
       once left gold text sitting behind the plates for a whole rack. */
    s +=     '<div class="u1rm__crownwrap">';
    s +=       '<div class="u1rm__crown" data-crown>';
    s +=         '<h3 class="u1rm__k">' + CROWN.k + '</h3>';
    s +=         '<p class="u1rm__n">' + CROWN.n + '</p>';
    s +=         '<p class="u1rm__b">' + CROWN.b + '</p>';
    s +=         '<p class="u1rm__deriv">' + CROWN.deriv + '</p>';
    s +=         '<p class="u1rm__note">' + CROWN.note + '</p>';
    s +=       '</div></div>';

    s +=     '<p class="u1rm__prov">' + PROV + '</p>';

    s +=     '<div class="u1rm__pinion" data-pinion aria-hidden="true"><svg viewBox="0 0 612 612">'
      +        '<circle cx="306" cy="306" r="300"></circle><circle cx="306" cy="306" r="286"></circle>'
      +        '<g>' + teeth + '</g></svg></div>';
    /* the pointer is a SIBLING of the pinion, never a child: the count is read against a
       fixed reference rather than against a rotating one. */
    s +=     '<div class="u1rm__pointer" aria-hidden="true"></div>';
    s +=   '</div>';                                   /* /vp */

    /* ═══ THE FLOOR — NORMAL DOCUMENT FLOW, BELOW THE STICKY VIEWPORT, IN BOTH MODES.
         Nothing here is ever absolutely positioned, transformed, or made inert by scroll
         position. Three focusables where the shipped section has ZERO — confirmed by
         reading renderAbout() end to end (app.js:2440-2505).
         ★ SEAM · `.u1rm__stairin` AND `.u1rm__foot` ARE THE STYLESHEET'S AND THE JS HALF
         OMITTED BOTH. Without the inner wrapper the floor's copy runs the full page width
         instead of the band; without `.u1rm__foot` the back-up button and the seal are
         not a row and the seal's `margin-left:auto` does nothing. Taken: the
         stylesheet's, because both are load-bearing and neither is in the JS's way. */
    s +=   '<footer class="u1rm__stair">';
    s +=     '<div class="u1rm__stairin">';
    s +=       '<h3 class="u1rm__lbl">Filed</h3>';
    s +=       '<p class="u1rm__filed">A reading becomes a record on a page of its own. '
      +          'This is the one that was just made.</p>';
    /* ★ BEAT 4'S PROOF, not a nav item — it is what makes BR-9772DB checkable. If this
       link is ever removed, STRIKE "filed as BR-9772DB" from the hinge and end the note
       on "keyed to movement". arcana-reading is in PUBLIC_ROOMS (build_public.py:66) and
       in the ?dev= resolver (app.js:104). */
    s +=       '<a class="u1rm__rec" href="' + recordHref(FIXTURE) + '">Open this reading&rsquo;s record &rarr;</a>';
    if (cx) {
      /* ★ SEAM · FOUR SPANS, NOT THREE. The stylesheet styles `.u1rm__doorcost` and
         `.u1rm__doorcta` separately (cost dim, cta silver); the JS half concatenated
         both into one `doorcost`, which would have set the call to action in the dim
         grey meant for the price. Taken: the stylesheet's four-span shape. */
      s +=     '<a class="u1rm__door" href="' + cx.href + '">'
        +        '<span class="u1rm__doorname">' + cx.name + '</span>'
        +        '<span class="u1rm__doorline">' + cxLine + '</span>'
        +        '<span class="u1rm__doorcost">' + cx.cost + '</span>'
        +        '<span class="u1rm__doorcta">' + cx.cta + '</span>'
        +      '</a>';
    }
    /* ★ RESTORED AGAINST PLANNER D, because docs/U1_INTENT_V1.md §3 is a WRITTEN,
       SETTLED RULING: "U1 keeps ONE link out to the roadmap. That link is its entire
       relationship to it." One quiet line, typographically subordinate to the door. */
    s +=       '<p class="u1rm__road">What is coming has its own page. <a href="roadmap/">roadmap/</a></p>';
    s +=       '<div class="u1rm__foot">';
    s +=         '<button type="button" class="u1rm__up" data-u1up>&uarr; Back up</button>';
    s +=         '<span class="u1rm__seal" aria-hidden="true">&#9670;</span>';
    s +=       '</div>';
    s +=     '</div>';
    s +=   '</footer>';
    s += '</div>';
    return s;
  }

  /* ═══ THE WRITE MEMO. Every write compares against its cached last value. This does
       NOT break determinism: it decides WHETHER a write is issued, never WHAT value is
       computed, and it initialises empty — so a cold load at any scroll position renders
       the identical frame. ★ DO NOT DELETE IT ON PRINCIPLE. ═══════════════════════ */
  var memo = (typeof WeakMap === "function") ? new WeakMap() : null;
  var written = [];                                    // every node this module inlines
  function note(n) { if (n && written.indexOf(n) < 0) written.push(n); return n; }
  function setT(node, v) {
    var m = memo && memo.get(node);
    if (m && m.t === v) return;
    node.style.transform = v;
    if (m) m.t = v; else if (memo) memo.set(node, { t: v, o: null });
  }
  function setO(node, v) {
    var m = memo && memo.get(node);
    if (m && m.o === v) return;
    node.style.opacity = v;
    if (m) m.o = v; else if (memo) memo.set(node, { t: null, o: v });
  }
  var DPR = root.devicePixelRatio || 1;
  function px(v) { return ((v * DPR) | 0) / DPR; }     // integer device pixels
  function ty(v) { return "translate3d(0," + px(v) + "px,0)"; }
  function txy(x, y) { return "translate3d(" + px(x) + "px," + px(y) + "px,0)"; }

  /* will-change is ARMED AND CLEARED BY ARITHMETIC, on the edge, never by an
     animationend handler — that is the exact leak the house law names. */
  var armed = { ground: null, stack: null, trav: null };
  function arm(key, want, nodes, hint) {
    if (armed[key] === want) return;
    armed[key] = want;
    for (var i = 0; i < nodes.length; i++) { note(nodes[i]).style.willChange = want ? hint : ""; }
  }

  /* ═══ STATE ═══ */
  var el = null, mk = null, ln = null;
  var M = { H: 900, top: 0, span: 1 }, C = {}, G = {}, curP = 0;
  var dirty = false, live = false, lastP = -1;
  var REDUCED = root.matchMedia && root.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* the scroll fraction, derived FRESH. Every caller reads this rather than the cached
     curP — a resize that repaints at a fraction computed under the previous viewport is
     the bug BR-S488 fixed in the rack. */
  /* ★★ SEAM/BUGFIX · `?u1p=` MUST PIN, NOT JUST SCROLL. The plan spotted that the
     rack's `?rkp=` never paints in the preview pane (it scrolls and then waits for a
     rAF the pane does not deliver) and prescribed "scrollTo, then draw synchronously".
     The gate measured that and it is STILL not enough: `styles.css:84` gives <body> its
     own `overflow-y:auto` under `html,body{height:100%}`, so `root.scrollTo` does not
     necessarily move the scroller this module reads — and even when the synchronous
     draw lands the right frame, the rAF loop overwrites it on the very next tick with
     the real scroll fraction. Measured headless: `?u1p=0.97` painted p=0.093.
     PIN makes the fraction itself the authority, so the frame holds however the host
     scrolls and whether or not rAF ever runs. It is set from the URL only. */
  var PIN = null;

  function scrollP() {
    if (!live) return 0;
    if (PIN !== null) return PIN;
    return clamp01(((root.scrollY || root.pageYOffset || 0) - M.top) / M.span);
  }

  /* ★ SEAM/BUGFIX · clearWrites() MUST ALSO DROP THE CUSTOM PROPERTIES. The JS half
     cleared transform, opacity and will-change only. Once the property names are
     corrected to the ones the stylesheet actually reads (--u1-nameSize,
     --u1-clauseSize), a live→static transition — a resize from 1200px to 700px — would
     otherwise leave the LIVE frame's px type sizes inlined on a STATIC page, which is
     exactly the residue `.is-live` is supposed to be the only carrier of. */
  var VARS = ["--u1-Pp", "--u1-Pa", "--u1-Pb", "--u1-R2",
              "--u1-nameSize", "--u1-label", "--u1-clauseSize", "--u1-railtop"];
  function clearWrites() {
    for (var i = 0; i < written.length; i++) {
      var n = written[i];
      n.style.transform = ""; n.style.opacity = ""; n.style.willChange = "";
    }
    written = [];
    if (el) {
      for (i = 0; i < VARS.length; i++) {
        el.room.style.removeProperty(VARS[i]);
        if (el.paper)   el.paper.style.removeProperty(VARS[i]);
        if (el.deepA)   el.deepA.style.removeProperty(VARS[i]);
        if (el.deepB)   el.deepB.style.removeProperty(VARS[i]);
        if (el.pinion)  el.pinion.style.removeProperty(VARS[i]);
      }
      if (el.pointer) el.pointer.style.top = "";
    }
    armed = { ground: null, stack: null, trav: null };
    if (typeof WeakMap === "function") memo = new WeakMap();
    lastP = -1;
  }

  function adopt(about) {
    var node = about.querySelector("[data-u1room]");
    var q = function (sel) { return node.querySelector(sel); };
    el = {
      room: node, vp: q("[data-vp]"),
      paper: q("[data-paper]"), deepA: q("[data-deepa]"), deepB: q("[data-deepb]"),
      bow: q("[data-bow]"), floor: q("[data-floor]"), under: q("[data-under]"),
      pinion: q("[data-pinion]"), pointer: q(".u1rm__pointer"),
      crownwrap: q(".u1rm__crownwrap"), crown: q("[data-crown]"),
      given: q("[data-given]"), fix: q("[data-fix]"), fixtail: q("[data-fixtail]"),
      spread: q("[data-spread]"), marks: q("[data-marks]"), letter: q("[data-letter]")
    };
    mk = [].map.call(node.querySelectorAll(".u1rm__mk"), function (b) { return { el: b }; });
    ln = [].map.call(node.querySelectorAll(".u1rm__ln"), function (b) {
      return { el: b, rule: b.querySelector(".u1rm__lnrule"), text: b.querySelector(".u1rm__lntext") };
    });
    var up = node.querySelector("[data-u1up]");
    if (up && !up._wired) {
      up._wired = true;
      /* reuses the shipped descent glide (app.js:5242) so the way back up is the same
         motion as the way down. Falls back to a hard scroll if it is not there. */
      up.addEventListener("click", function () {
        if (typeof root._u1GlideTo === "function" && root._u1GlideTo(0)) return;
        root.scrollTo(0, 0);
      });
    }
    clearWrites();
  }

  /* ═══ MEASURE. THE ORDER IS LOAD-BEARING, because `.is-live` sets a height on the very
       node being judged. ═══════════════════════════════════════════════════════════ */
  function measure() {
    if (!el) return;
    /* ★★ 1. REFUSE FIRST, AND REMEMBER THE REFUSAL. U1 is inside `.menu`, which is
       display:none in room and dev views, and `#about` itself is hidden while the
       reliquary panel is open. Any of those measures a node at offsetHeight 0 — span
       collapses to 1, p becomes 1 for any scroll past one pixel, and the room stands
       permanently at its final payoff frame for the rest of the session. */
    if (!el.room.offsetHeight) { dirty = true; return; }
    dirty = false;

    /* 2. THE GATE, re-checked here rather than at load, so the class can come OFF again
       with no residue. Under reduced motion the mechanism is not a frozen half-state —
       IT DOES NOT EXIST, and what the reader gets is the finished static page. */
    var narrow = root.innerWidth < GATE_W || root.innerHeight < GATE_H;
    if (REDUCED || !wantLive || narrow) {
      if (live) { el.room.classList.remove("is-live"); live = false; }
      clearWrites();
      benchRead();
      return;
    }
    /* 3. */
    if (!live) { el.room.classList.add("is-live"); live = true; }

    /* 4. EVERY RECT IS READ AFTER THE CLASS IS ON. */
    var r = el.room.getBoundingClientRect();
    M.top  = r.top + (root.scrollY || root.pageYOffset || 0);
    M.H    = el.vp.clientHeight || root.innerHeight;
    M.span = Math.max(1, el.room.offsetHeight - M.H);
    var k; for (k in F) C[k] = F[k] * M.H;

    /* the ruled periods are written ONCE; the fields are static paint after this and
       only ever receive a transform. */
    el.paper.style.setProperty("--u1-Pp", C.Pp.toFixed(3) + "px");
    el.deepA.style.setProperty("--u1-Pa", C.Pa.toFixed(3) + "px");
    el.deepB.style.setProperty("--u1-Pb", C.Pb.toFixed(3) + "px");
    el.pinion.style.setProperty("--u1-R2", (2 * 0.340 * M.H).toFixed(2) + "px");
    el.pointer.style.top = (1.02 * M.H - 0.340 * M.H).toFixed(2) + "px";

    /* ★★ SEAM · THE PROPERTY NAMES. The JS half wrote `--u1-name` and `--u1-lnsize`;
       the stylesheet reads `--u1-nameSize` and `--u1-clauseSize`. Every one of these
       measured floors would have fallen back to its declared default and the whole
       "floors, not bare fractions" fix from BR-S488 would have been inert. Taken: the
       stylesheet's names, because it is the file that consumes them.
       FLOORS, NOT BARE FRACTIONS. A 700px viewport put the rack's slot label at 7.8px
       and a 400px one at 4.4px — a legend nobody can read, on the row carrying the
       provenance. */
    el.room.style.setProperty("--u1-nameSize",   Math.max(13, 0.0244 * M.H).toFixed(2) + "px");
    el.room.style.setProperty("--u1-label",      Math.max(9,  0.0111 * M.H).toFixed(2) + "px");
    el.room.style.setProperty("--u1-clauseSize", Math.max(15, 0.0180 * M.H).toFixed(2) + "px");

    /* ★ LN_CLOSE IS NOT A CONSTANT — it is the text's own two-line box, read back after
       --u1-clauseSize is set. Six separated clauses closing to their own natural leading
       is one continuous passage forming; that is the transform being literal. */
    var lh = 0;
    try {
      var cs = root.getComputedStyle(ln[0].text);
      lh = parseFloat(cs.lineHeight);
      if (!(lh > 0)) lh = 1.45 * (parseFloat(cs.fontSize) || 16);   // computed "normal"
    } catch (e) { lh = 1.45 * Math.max(15, 0.0180 * M.H); }
    C.LN_CLOSE = 2 * lh;

    /* ★★ SEAM · `CLOSE` IS THE CONSTANT, NOT THE PLATE'S HEIGHT — the JS half's
       DEPARTURE 1 is REVERSED. It proposed `CLOSE = max(0.0465H, plate natural height)`
       and told the stylesheet to declare no plate height. The stylesheet declares
       `--u1-plate: 11.5%` (= EMERGE 1.237 × SHELF 0.093, the identity that makes EMERGE
       mean "notches from the line to fully clear"), so `mk.offsetHeight` is 103.5px at
       H=900 and the override would have set the closed pitch to 103.5 — a 621px rail,
       a rail top at −63px, and every measurement in `_u1-room.css` void.
       The two are genuinely incompatible and one had to go. Taken: the stylesheet's,
       because (a) 6 × 4.65% = 27.9%, and 62% − 27.9% = 34.1%, which is EXACTLY the
       crown clip the stylesheet independently derived, so the whole of PART 3 is already
       measured against it; and (b) the alternative moves nine measured numbers to
       recover one row of text.
       ★ WHAT IS LOST, STATED: at the hold the closed rail shows six NAME rows and each
       plate occludes its own receipt. The plan's beat-4 listing says "[the six-line rail,
       each with its receipt]" and THAT LINE IS NOT DELIVERED — the receipts are the
       teaching and they were taught on the way down; the record is the summary. Nothing
       on the page becomes false, and the static page keeps every receipt visible. */
    var pH = 0;
    for (k = 0; k < mk.length; k++) pH = Math.max(pH, mk[k].el.offsetHeight);
    G.PLATE  = pH || C.SHELF * 1.237;
    G.EMERGE = Math.max(0.5, G.PLATE / C.SHELF);       // notches from the line to clear

    /* ── THE TRAVEL'S TARGETS. Computed once here; draw() only interpolates.
       The two columns do not converge into each other — THEY STACK. Side by side reads
       as process (two things at once); stacked reads as document. offsetLeft/offsetWidth
       are LAYOUT values and are unaffected by any transform we write — that is why they
       are used here and rects are not. */
    var W = el.spread.clientWidth;
    G.dxMarks  = W / 2 - (el.marks.offsetLeft  + el.marks.offsetWidth  / 2);
    G.dxLetter = W / 2 - (el.letter.offsetLeft + el.letter.offsetWidth / 2);

    /* ★★ SEAM · THE LIFT. The JS half's DEPARTURE 2 raises the whole record when it
       would clip. It is KEPT — the gate measured the record at H=900 and it overflows —
       but it only works if the crown's clip moves with the rail, which the stylesheet's
       hardcoded `top:10%; height:24.1%` does not. `--u1-railtop` is published here and
       `_u1-room.css` consumes it (see the assembled `.is-live .u1rm__crownwrap`), so the
       clip's bottom edge stays welded to the rail's top edge at every lift.
       `.u1rm__vp` is 100svh/overflow:hidden, so a record taller than the frame is
       CLIPPED, permanently: a sticky element unpinning reveals LESS of itself, never
       more. When the record fits, lift is 0 and the plan's geometry is untouched. */
    var crownH   = el.crown.offsetHeight;
    var fixH     = el.fix.offsetHeight;
    var closeH   = ln[6] ? ln[6].el.offsetHeight : 2 * C.LN_CLOSE;
    var railTop  = C.THRESH - 6 * C.CLOSE;                       // == css 34.1% of H
    /* ★★ SEAM/DEFECT · THE CLOSED RAIL IS NOT 6 × CLOSE TALL AND BOTH HALVES SAID IT WAS.
       CLOSE is the PITCH; the plate is a 0.115H BOX. Plate i+1 covers plate i's tail
       (opaque, later in DOM — that is the designed occlusion), but the LAST plate has
       nothing after it, so its box hangs `PLATE − CLOSE` = 103.5 − 41.85 = 61.65px past
       the pitch. Measured at the hold before this fix: plate 6 ran 267→580 while clause I
       started at 534 — a 46px overlap, with the letter painting over an opaque paper
       patch. The rail's real closed height is 5 × CLOSE + PLATE = 312.75px at H=900,
       not the plan's 251px. */
    var railBot  = railTop + 5 * C.CLOSE + G.PLATE;
    /* ★★ SEAM · THE RETURN HAD TWO OWNERS AND THEY DISAGREED BY 24px. The stylesheet
       declares `--u1-fixtop: 4%` and names the formula the module owes it
       ("GIVEN_HOLD_PX = 0.04 × H − fix.offsetTop"); the JS half instead derived the
       landing from whatever was left above the crown, which put the fix line at y=12
       under a 21.6px OPAQUE CEILING. Captured at p=0.97: the record's head was half
       buried in the desk. Taken: the stylesheet's, because it is a declared design
       datum and the JS's was a residue. */
    G.fixTop     = 0.04 * M.H;
    var crownTop = railTop - C.AIR - crownH;                     // the crown's own head
    var headTop  = G.fixTop + fixH + C.AIR;                      // the floor under it
    var recBot   = railBot + C.AIR + 6 * C.LN_CLOSE + closeH;
    G.railBot = railBot; G.crownH = crownH; G.closeH = closeH;
    G.over   = Math.max(0, recBot - (M.H - PAD));
    /* the lift may not push the crown into the returned given */
    G.lift   = Math.min(G.over, Math.max(0, crownTop - headTop));
    /* ⚠ REPORTED, NOT SWALLOWED. When `clipped` is non-zero the record is taller than
       the frame and `overflow:hidden` on a sticky viewport removes the difference
       permanently. See the gate's report: at H=900 this is ~95px and it is a design
       call, not a bug to be tuned away. */
    G.clipped = Math.max(0, G.over - G.lift);                    // reported to the bench

    G.railTop   = railTop - G.lift;
    G.dyMarks   = -G.lift;
    /* clause 0 at c=1 sits at THRESH − 7·LN_CLOSE and must land one air below the rail's
       REAL foot. */
    G.dyLetter  = (railBot - G.lift + C.AIR) - (C.THRESH - 7 * C.LN_CLOSE);
    /* the given's own return, on a node the block has already moved by −6·SHELF */
    G.dyFix     = G.fixTop - (el.fix.offsetTop - 6 * C.SHELF);

    el.room.style.setProperty("--u1-railtop", G.railTop.toFixed(2) + "px");

    DPR = root.devicePixelRatio || 1;
    if (typeof WeakMap === "function") memo = new WeakMap();      // geometry moved: every cached write is stale
    lastP = -1;
    /* 5. repaint at the fraction the reader is ACTUALLY at, not the cached one. */
    draw(scrollP());
    benchRead();
  }

  /* ═══ DRAW. transform and opacity only. No filter, no blur, no layout property, no
       textContent. Zero layout reads. ═════════════════════════════════════════════ */
  function draw(p) {
    if (!el || !live) return;
    curP = p;

    /* THE SCALARS.
       Am — the marks' tooth count, monotone 0 → 6. BOTH TRACKS RIDE IT: plate i and
            clause i share the same v and the same yTop. One gear, two hands.
       AL — the letter's, +1 across the close window for its seventh box. (DEPARTURE 3.)
       A  — the pinion's, +1 across the travel: THE GEAR NEVER STOPS.
       AG — the water, which moves from p=0, before the first mark. */
    var Am = win(p, S.MARK_A, S.MARK_B) * 6;
    var AL = Am + win(p, S.CLOSE_A, S.CLOSE_B);
    var A  = Am + win(p, S.TRAV_A, S.TRAV_B);
    var AG = win(p, 0, S.GIVEN_OUT) * 0.6 + A;
    var c  = eo(win(p, S.TRAV_A, S.TRAV_B));

    /* THE GROUND. Above the line 0.23× scroll, below it 0.74× — the same 1px hairline at
       two visibly different speeds either side of one visible edge, comparable in a
       single frame. The paper LOCKS at the close (Am is already frozen) while the water
       runs on: the reading is fixed, the source keeps moving.
       ★ the JS half carried a dead `Am * C.RATE_A * 0 +` term here; struck.
       ⚠ SAMPLING. RATE_A = 0.300H = 270px per mark against Pa = 0.104H = 93.6px is 1.38
       periods per notch at 195px/mark (shipped was 0.79). Under Chrome's smoothed wheel
       (~7 rendered frames/notch) that is 0.20 periods/frame, safely under Nyquist — but
       WITH SMOOTH SCROLLING OFF, OR ON A DROPPED FRAME, the field advances more than a
       full period in one step and will read as flicker or as motion in the wrong
       direction. Cannot be measured in the pane. IF IT SHOWS, MOVE Pa 0.104 → 0.160
       (0.90 periods/notch) — NOT RATE_A: the two ground rates' ratio is 3.226:1, both
       scale with Am, so it is invariant under any span, and moving RATE_A would change
       the thesis to fix a sampling artefact. Paper is safe either way at 0.50. */
    setT(note(el.paper), ty(-wrap(Am * C.Pp, C.Pp)));
    setT(note(el.deepA), ty(-wrap(AG * C.RATE_A, C.Pa)));
    setT(note(el.deepB), ty(-wrap(AG * C.RATE_B, C.Pb)));
    setT(note(el.pinion), "rotate(" + (A * 60).toFixed(2) + "deg)");

    /* THE BOW peaks on the fractional part of the tooth, so it is a consequence of the
       gear rather than a second timeline. */
    var frac = A - Math.floor(A);
    var bow  = (A > 0 && A < 6.02) ? Math.sin(frac * Math.PI) : 0;
    setT(note(el.bow), "scaleY(" + (0.12 + bow * 0.28).toFixed(3) + ")");

    /* BEAT 1 leaves by gear; clearance to plate 0 is constant at every Am, so they can
       never collide. Then the fix RETURNS on c, on top of it.
       ★ the opening of the letter is the given's mirror and rides the identical
       transform — same band, same height, same padding in the stylesheet. It does NOT
       return: the record does not reprint the salutation. */
    setT(note(el.given), ty(-Am * C.SHELF));
    /* ★★ SEAM/DEFECT · THE SALUTATION WAS RETURNING, AND BOTH HALVES SAID IT DOES NOT.
       `.u1rm__open` is child 1 of `[data-letter]` — which is exactly the node the travel
       translates by `+dyLetter` (+367px at H=900). So the opening rode out with the given
       at beat 1 and was then dragged back into frame by the letter's own travel, landing
       on top of the closed rail. Captured at p=0.97: "Two things were given…" printed
       across SUN SIGN · Leo. It cannot simply move out of `[data-letter]` — the static
       grid places the rows by `:nth-child` and the opening must stay child 1 — so it
       carries a counter-translate for exactly the travel it is a passenger of. One extra
       term on a node that already had one write. */
    if (ln.length && el.letter) {
      var op = el.letter.querySelector(".u1rm__open");
      if (op) setT(note(op), ty(-Am * C.SHELF - c * G.dyLetter));
    }
    setT(note(el.fix), ty(c * G.dyFix));
    setO(note(el.fixtail), c.toFixed(3));

    /* THE TWO PITCHES, one easing. Plates gather from one notch to a half notch;
       clauses gather to their own two-line leading. */
    var PITCH   = C.SHELF - (C.SHELF - C.CLOSE)    * c;
    var PITCH_L = C.SHELF - (C.SHELF - C.LN_CLOSE) * c;

    /* ── LEFT TRACK. It RISES OUT OF THE WATER: 0.699× wide at the line, widening as it
       clears. transform-origin is the plate's TOP EDGE, so the edge lands exactly on its
       ruling at every scale with no pre-compensation. */
    var i, v, yTop, zt, sc;
    for (i = 0; i < 6; i++) {
      v    = Am - i;
      yTop = C.THRESH - (v <= 0 ? v * C.DEEP : v * PITCH);
      zt   = eo(clamp01(v / G.EMERGE));
      sc   = C.PERSP / (C.PERSP + C.ZFAR * (1 - zt));
      setT(note(mk[i].el), ty(yTop) + " scale(" + sc.toFixed(4) + ")");
    }
    setT(note(el.marks), txy(c * G.dxMarks, c * G.dyMarks));

    /* ── RIGHT TRACK. It is WRITTEN. No scale. The hairline is at the box's TOP edge and
       draws left-to-right as the words below it clear the line.
       ★ WHY NOT STROKE BY STROKE: a 125-character clause over its 195px is 0.64
       chars/px. At skim pace (~4 notches/sec) that is ~256 chars/sec — a blur. To read
       as writing at ~40 chars/sec the reader would have to hold exactly 0.6 notch/sec.
       It is also a textContent write per frame, the one uncomposited write the rack
       deliberately removed.
       ALL THREE BRANCHES ARE WRITTEN EVERY FRAME. With no case for the low range the
       rule keeps whatever was last written, so scrolling back up leaves it stranded
       mid-draw while a cold load at the same position shows it fully drawn. */
    for (i = 0; i < ln.length; i++) {
      v    = AL - i;
      yTop = C.THRESH - (v <= 0 ? v * C.DEEP : v * PITCH_L);
      setT(note(ln[i].el), ty(yTop));
      if (v <= 0)          setT(note(ln[i].rule), "scaleX(0)");
      else if (v >= 0.75)  setT(note(ln[i].rule), "scaleX(1)");
      else                 setT(note(ln[i].rule), "scaleX(" + eo(v / 0.75).toFixed(3) + ")");
    }
    setT(note(el.letter), txy(c * G.dxLetter, c * G.dyLetter));

    /* THE CROWN arrives LAST — the final quarter of the travel — climbing out of the
       rail's own top edge through the static clip. Self-relative percentage. */
    var cc = eo(win(p, S.CROWN_A, S.CROWN_B));
    setT(note(el.crown), "translate3d(0," + ((1 - cc) * 100).toFixed(2) + "%,0)");
    setO(note(el.floor), (0.42 + 0.43 * c).toFixed(3));
    /* ★ SEAM · THE OCCLUDER TAKES ONE OPACITY WRITE. Builder 1's deviation, kept: the
       closed letter lands below the white line, on the water, which is the payoff image;
       an opaque panel over that spot hides it. The occluder is only needed while
       something waits below, and after TRAV_A nothing does. Because it paints the
       identical ramp the ground already paints under it, fading it is a visual no-op on
       empty water. */
    if (el.under) setO(note(el.under), (1 - c).toFixed(3));

    arm("ground", p > 0.001 && p < 0.995, [el.paper, el.deepA, el.deepB, el.pinion], "transform");
    arm("stack",  p > 0.020 && p < 0.995,
        mk.map(function (b) { return b.el; })
          .concat(ln.map(function (b) { return b.el; }))
          .concat([el.given, el.letter]), "transform");
    arm("trav",   p > S.TRAV_A - 0.02, [el.crown, el.fix, el.marks], "transform");

    benchRead();
  }

  /* ═══ TAKE OVER — SWAP, NOT WRAP. `_m2-box.js` wraps because M2's hero is a component
       INSIDE a page; renderAbout()'s output IS the thing being replaced. ═══════════ */
  function hasDeps() {
    try {
      return typeof root.u1Open === "function" && typeof root.u1Public === "function"
          && typeof ROOMS !== "undefined";
    } catch (e) { return false; }                      // const ROOMS in its TDZ
  }
  function takeOver(d) {
    var about = d && d.getElementById("about");
    if (!about) { el = null; mk = null; ln = null; live = false; return false; }
    if (about.querySelector("[data-u1room]")) { if (!el) adopt(about); return true; }
    /* ★ FAIL TOWARD THE SHIPPED PAGE. The spec line is DERIVED; a room that renders it
       blank is worse than the page it replaced. */
    if (!hasDeps()) return false;
    /* ★ THE STASH LIVES ON THE NODE. mountMenu() sets host.innerHTML and discards this
       node — a module-level copy would outlive its node and restore stale markup. */
    about._u1Shipped = about.innerHTML;
    about._u1Label   = about.getAttribute("aria-label");
    about.innerHTML  = ROOM_HTML();
    about.classList.add("u1--room");
    /* the stale half goes: this page no longer contains what is coming, it links to it */
    about.setAttribute("aria-label", "What Blue Room is");
    adopt(about);
    measure();
    watchVisibility();
    return true;
  }
  /* restore() is TOTAL because of one rule this module never breaks: EVERY inline style
     it writes lands on a node inside [data-u1room]. Nothing is ever written to #about,
     #menuView, <body> or <html> — no scroll locks, no --vars on :root. Replacing the
     subtree removes 100% of the footprint; `.u1--room` is the only class outside it.
     NO display:none ANYWHERE — a hidden node is a node that can be measured at zero
     height, and this surface has paid for that once already. */
  function restore(d) {
    var about = d && d.getElementById("about");
    if (!about || typeof about._u1Shipped !== "string") return;
    if (io) { io.disconnect(); io = null; }
    stopLoop();
    about.innerHTML = about._u1Shipped;
    about.classList.remove("u1--room");
    if (about._u1Label != null) about.setAttribute("aria-label", about._u1Label);
    el = null; mk = null; ln = null; live = false; written = []; dirty = false;
    armed = { ground: null, stack: null, trav: null };
    if (typeof WeakMap === "function") memo = new WeakMap();
  }

  function style(d) {
    if (d.getElementById("u1room-css")) return;
    var l = d.createElement("link");
    l.id = "u1room-css"; l.rel = "stylesheet";
    /* ★ ITS OWN CACHE TOKEN. Tokens are PER-ASSET: bumping app.js?v= does not bump this,
       and four commits of correct CSS were once invisible in the browser for exactly
       that reason. Bump this number when _u1-room.css changes, and only then. */
    l.href = "_u1-room.css?v=500";
    (d.head || d.documentElement).appendChild(l);
  }

  /* ═══ THE DRIVE. A rAF loop while on screen, nothing while off. Scroll EVENTS are
       accelerators, not the drive: styles.css:84 gives body its own overflow-y:auto
       under html,body{height:100%}, and a measured check found a fresh window-scroll
       listener receiving ZERO events while the offset was plainly changing. Scroll does
       not bubble but it DOES capture, so both bindings stay.
       ★ onScreen STARTS TRUE and the observer's only job is to turn it OFF. ═════════ */
  var io = null, rafId = 0, onScreen = true, ticking = false;

  function frame() {
    rafId = 0;
    if (!el || !onScreen || !live) return;
    var p = scrollP();
    if (p !== lastP) { lastP = p; draw(p); }
    rafId = root.requestAnimationFrame(frame);
  }
  function startLoop() { if (!rafId && onScreen && el && live) rafId = root.requestAnimationFrame(frame); }
  function stopLoop() { if (rafId) { root.cancelAnimationFrame(rafId); rafId = 0; } }
  function onScroll() {
    if (ticking || !el || !live) return;
    ticking = true;
    root.requestAnimationFrame(function () { ticking = false; if (el && live) draw(scrollP()); });
  }
  function watchVisibility() {
    onScreen = true;
    startLoop();                                       // run first, refine second
    if (!el || !root.IntersectionObserver) return;
    if (io) io.disconnect();
    io = new root.IntersectionObserver(function (entries) {
      onScreen = entries[entries.length - 1].isIntersecting;
      if (onScreen) { if (dirty) measure(); startLoop(); } else stopLoop();
    }, { rootMargin: "120px 0px" });
    io.observe(el.room);
  }

  /* ?u1p=0.62 — one frame of a three-screen scroll, and the only way to capture this
     headless. ★ IT MUST scrollTo AND THEN draw() SYNCHRONOUSLY. The rack's ?rkp= does
     NOT work in the preview pane today and nobody noticed because a real browser fixes
     it in 16ms: the rack scrolls, then waits for a rAF that the pane never delivers. */
  var jumped = false;
  function jump() {
    if (jumped || !el || !live) return;
    jumped = true;
    var m = /[?&]u1p=([0-9.]+)/.exec(Q);
    if (!m) return;
    var f = clamp01(parseFloat(m[1]));
    PIN = f;                                   // the fraction is now the authority
    root.scrollTo(0, M.top + f * M.span);      // and the page still looks right
    lastP = f;
    draw(f);
  }

  /* ═══ THE BENCH. Same furniture as _m2-box.js:229-278. Every toggle sets a class or a
       data-attribute the CSS reads, so this module's arithmetic is IDENTICAL in every
       state — a bench that changes the engine measures the bench. ═════════════════ */
  var wantRoom = true, wantLive = true, wantLetter = true, wantRc = true;
  function benchRead() {
    var o = doc.getElementById("u1RoomP");
    if (!o) return;
    var t = live ? (curP.toFixed(3) + (G.clipped > 0.5 ? "  ⚠ record clipped " + Math.round(G.clipped) + "px" : ""))
                 : "static";
    if (o.textContent !== t) o.textContent = t;
  }
  function bench() {
    var b = doc.getElementById("u1RoomBench");
    /* ★★ SEAM · THE BENCH HAD TWO NAMES. `_u1-room.css:940-953` styles `.u1rm-bench`
       (fixed, bottom right, with an `<output>` for the fraction); the JS half created
       `.u1room-bench` with a `<span>`. Neither half saw the other, so the bench would
       have rendered UNSTYLED, in NORMAL FLOW, at the end of <body> — lengthening the very
       document the module derives `p` from, and putting the one A/B switch on this
       surface three screens below the fold. Taken: the stylesheet's name and its
       `<output>`, because it is the half that has the rules. */
    if (!b) { b = doc.createElement("div"); b.id = "u1RoomBench"; b.className = "u1rm-bench"; doc.body.appendChild(b); }
    b.innerHTML =
        '<b>U1 &middot; the room &middot; prototype</b>'
      + '<label><input type="checkbox" data-ur="room"'   + (wantRoom   ? " checked" : "") + '> the room (off = the shipped page)</label>'
      + '<label><input type="checkbox" data-ur="live"'   + (wantLive   ? " checked" : "") + '> live (off = the static document)</label>'
      + '<label><input type="checkbox" data-ur="letter"' + (wantLetter ? " checked" : "") + '> the letter</label>'
      + '<label><input type="checkbox" data-ur="rc"'     + (wantRc     ? " checked" : "") + '> the receipts</label>'
      + '<label>p <input type="range" data-ur="p" min="0" max="1" step="0.001" value="0"> </label><output id="u1RoomP">0.000</output>'
      + '<i>Build the A/B toggle before arguing for a redesign. The static state is what '
      + 'five of six delivery paths get. Whether the two tracks read as PARALLEL or as '
      + 'CLUTTER is the entire structural bet, and it is answerable only by looking.</i>';
    if (b._wired) return;
    b._wired = true;
    var onChange = function (e) {
      var k = e.target.getAttribute && e.target.getAttribute("data-ur");
      if (!k) return;
      if (k === "p") {
        if (!live) return;
        var f = clamp01(parseFloat(e.target.value));
        PIN = null;                            // the slider hands the page back to scroll
        root.scrollTo(0, M.top + f * M.span);
        lastP = f; draw(f);                            // synchronous — the pane has no rAF
        return;
      }
      if (k === "room")   { wantRoom   = e.target.checked; if (!wantRoom) restore(doc); else apply(); return; }
      if (k === "live")   { wantLive   = e.target.checked; }
      if (k === "letter") { wantLetter = e.target.checked; }
      if (k === "rc")     { wantRc     = e.target.checked; }
      applyFlags();
    };
    b.addEventListener("change", onChange);
    b.addEventListener("input", onChange);             // the slider, while dragging
  }
  /* ★ SEAM/BUGFIX · `wantLive` IS NOW READ INSIDE measure()'s GATE, not fought with
     outside it. The JS half's applyFlags() removed `.is-live` and then, on the next
     resize/font/observer tick, measure() silently put it straight back — so the single
     most important bench switch on this surface did not hold. One condition, one owner. */
  function applyFlags() {
    if (!el) return;
    el.room.classList.toggle("is-noletter", !wantLetter);
    el.room.classList.toggle("is-norc", !wantRc);
    measure();
    if (live) startLoop(); else stopLoop();
  }

  /* ═══ THE TICK. takeOver() returns early once the room is standing, so a refusal to
       measure must be re-entered from outside. ═══════════════════════════════════ */
  function apply() {
    if (!wantRoom) return false;
    style(doc);
    var ok = takeOver(doc);
    if (ok && dirty) measure();
    if (ok) { applyFlags(); wire(); jump(); onScroll(); }
    return ok;
  }

  var wired = false;
  function wire() {
    if (wired) return;
    wired = true;
    root.addEventListener("scroll", onScroll, { passive: true });
    if (doc) doc.addEventListener("scroll", onScroll, { passive: true, capture: true });
    var rz = false;
    root.addEventListener("resize", function () {
      if (rz || !el) return;
      rz = true;
      root.requestAnimationFrame(function () { rz = false; measure(); });
    });
    /* ★ THE INVALIDATION SET. `load` matters specifically because index.html:13-16 loads
       Cormorant Garamond with display=swap, so the webfont lands AFTER the first measure
       and reflows the very column being measured.
       ⚠ THE RISK THIS DESIGN INTRODUCES: the letter is PROSE in a display serif. A
       fallback that renders a clause at 3 lines where Cormorant renders 2 would overflow
       the record, and measure() cannot see it because it reads the ROOM's offsetHeight,
       not the clause's. THE MITIGATION IS STRUCTURAL AND LIVES IN THE STYLESHEET:
       .u1rm__ln is `height: var(--u1-clausebox); overflow:hidden`. A metric change can
       then clip a descender; it can never move the record. --u1-h is viewport-relative,
       so the swap cannot change M.span and p cannot jump under the reader's thumb. */
    root.addEventListener("load", measure);
    if (doc.fonts && doc.fonts.ready && doc.fonts.ready.then) doc.fonts.ready.then(function () { measure(); });
    if (root.matchMedia) {
      var mq = root.matchMedia("(prefers-reduced-motion: reduce)");
      var onMQ = function (e) { REDUCED = e.matches; measure(); };
      if (mq.addEventListener) mq.addEventListener("change", onMQ);
      else if (mq.addListener) mq.addListener(onMQ);
    }
  }

  function boot() {
    bench();
    apply();
    var host = doc.getElementById("menuView");
    if (root.MutationObserver) {
      var re = function () { apply(); };
      /* the host's children are replaced wholesale on a remount, which takes the room
         with it and needs a fresh takeOver */
      if (host) new root.MutationObserver(re).observe(host, { childList: true });
      /* ★ AND THE TWO VISIBILITY SIGNALS `_m2-box.js` DOES NOT HAVE, which cost the rack
         a round. Leaving the room for the menu remounts NOTHING and does not touch the
         menu's children — it flips one attribute, and the CSS visibility matrix does the
         rest. Watch the attributes that actually change. */
      new root.MutationObserver(re).observe(doc.documentElement, {
        attributes: true, attributeFilter: ["data-view"], subtree: true
      });
      var menu = doc.querySelector(".menu");
      if (menu) new root.MutationObserver(re).observe(menu, { attributes: true, attributeFilter: ["class"] });
    }
    /* a SHORT poll, only until the menu first exists (boot timing), then cancelled —
       and `dirty` is part of the exit test, because a room that mounted while hidden has
       not been MEASURED and stopping there retires the poll in the state it exists to
       escape. */
    var poll = root.setInterval(function () {
      if (apply() && !dirty) { root.clearInterval(poll); poll = null; }
    }, 400);
    root.setTimeout(function () { if (poll) { root.clearInterval(poll); poll = null; } }, 8000);
  }

  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", boot);
  else boot();

  /* the emitter is exposed for the graduation diff and for a headless probe. It is pure:
     calling it has no effect on anything. */
  root.U1Room = { html: ROOM_HTML, fixture: FIXTURE, seed: seedOf, href: recordHref,
                  geom: function () { return { M: M, C: C, G: G, live: live }; } };
})(window);
