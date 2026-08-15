/* ═══════════════════════════════════════════════════════════════════════════
   THE SIX, LIVE — the hover-specimen system installed on the REAL M1 card.

   `_six-hover.html` proved the idea on a copy of the card. This runs it on the
   actual one: the six marks inside .m2bface become the control, and .m2read —
   the column that already sits opposite them — becomes the specimen panel.

   INSTALLED FROM THE PARENT, INTO THE IFRAME. _palette-lab.html already owns
   this pattern (it injects a <style> into the frame every 250ms and never stops
   asserting). Same discipline here: install() is idempotent and re-runs, because
   the app rebuilds .m2read on every menu mount and would otherwise wipe us.

   NOTHING TRACKED IS TOUCHED. This is an overlay; remove the script and the
   page is byte-identical to what ships.
   ═══════════════════════════════════════════════════════════════════════════ */
(function (root) {
  "use strict";

  /* r = [name, tag, perks] lines to RESERVE for this mark — its own measured worst case,
     not the panel's. See the note on .sx__name in CSS for why per-mark beats global. */
  var SIX = [
    { key: "Sun sign",    from: "from the date",          sys: 0, n: 12, g: "tagfirst",  c: "sun",     r: [1, 2, 2] },
    { key: "Year animal", from: "from the year",          sys: 1, n: 12, g: "cjk",       c: "animal",  r: [1, 2, 2] },
    { key: "Life path",   from: "the digits, reduced",    sys: 2, n: 12, g: "name",      c: "path",    r: [1, 1, 2] },
    { key: "Rune",        from: "from the name and date", sys: 6, n: 24, g: "rune",      c: "rune",    r: [1, 1, 2] },
    { key: "Trigram",     from: "from the name and date", sys: 7, n: 8,  g: "namefirst", c: "trigram", r: [1, 2, 2] },
    /* BR-S462: its own glyph branch — it is not a trigram and it never was. See glyphFor. */
    { key: "Hexagram",    from: "from the name and date", sys: 8, n: 64, g: "hexagram",  c: "hex",     r: [3, 1, 3] }
  ];
  var CJK  = ["鼠","牛","虎","兔","龍","蛇","馬","羊","猴","雞","狗","猪"];
  var RUNE = "ᚠᚢᚦᚨᚱᚲᚷᚻᛁᛇᛉᛋᛏᛒᛖᛚᛞᛟᛣᛠᛦᚩᛃᛝ".split("");

  /* ★★ THE PERK COLOURS ARE NOT MINE, AND NEVER SHOULD HAVE BEEN.
     arcana-build/kwcolor.json — 625 authored keyword->colour entries across 20 muted
     families, built by build_kwcolor.py, and ALREADY LOADED BY THE REAL READING
     (arcana-reading.js:623). Its own header: "~14 muted semantic families (dusty jewel
     tones that read on near-black and cohere as one considered palette, NOT a rainbow)
     ... Each perk gets a fitting colour via its family."
     That is the brief I was handed, answered before I started. I invented an element
     scale and then a five-family scale over the top of it. Second time in one session
     (see the card, BR-S289) — LOOK FOR THE EXISTING SYSTEM FIRST.

     COVERAGE, measured: 625 of the archive's 785 distinct keywords are in the bank
     (80%). But #9c9790 — the DEFAULT neutral — accounts for 275 of them, so only
     ~350 words (45%) actually land in a family. The rest are grey by fallback, not
     by decision. That gap is the real work, not a new palette. */
  var KWC = null, KWDEF = "#9c9790";

  /* ★ THE GIFT/COST SPLIT IS CUT FROM THE RENDER. It was a good idea and it is not
     DATA: kwcolor colours by family, and family is not valence — "proud" is power,
     "restless" is change, neither is marked a cost anywhere. Shipping a roman/italic
     distinction off a 22-word list I typed is exactly the invented claim BR-S410 was
     committed to stop. It comes back when codex-data.json carries the field. */

  var DATA = null, bags = {}, current = -1;

  /* The six mark colours, DARK stock — styles.css:3793. Copied rather than read out
     of the frame, because html.m2-parch overwrites them with the parchment forms and
     the panel sits on the dark ground, not on the card. */
  var CSS = ""
    + ".sx{--sx-sun:#c6a466;--sx-animal:#ad7962;--sx-path:#78838f;"
    +      "--sx-rune:#8a9184;--sx-trigram:#6e918d;--sx-hex:#9c968c;}"
    /* the marks become a control without changing how they look at rest */
    + ".m2bface__marks li{cursor:pointer;transition:opacity 90ms ease}"
    + ".m2bface__marks.sx-on li{opacity:.42}"
    + ".m2bface__marks.sx-on li[aria-current='true']{opacity:1}"
    + ".m2bface__marks li:focus-visible{outline:1px solid rgba(28,21,13,.5);outline-offset:3px}"
    /* the panel, inserted into .m2read. The app's own children are hidden, not
       removed — it rewrites them on every mount and would throw if they vanished. */
    /* ★★ BR-S461 — visibility, NOT display. `display:none` REMOVED the app's own three
       children from layout, so .m2read collapsed from its natural ~193px to whatever the
       panel reserved — and .menu__draw's grid centres the head against the card with
       `1fr auto 1fr`, so the head's top edge lifted by up to ~127px the instant a pointer
       crossed the card, then dropped back on leave. The file's own 14-line law directly
       below says the top edge must not move; the rule written to defend it targets
       .m2read's flex alignment, which was never what moved it.
       With visibility the app's text keeps its exact box whether the panel is up or not,
       the `auto` grid row never changes height, and the head cannot re-centre. */
    + ".sx-hide{visibility:hidden!important}"
    /* ★ THE TOP EDGE DOES NOT MOVE. Every specimen is a different height — the name is
       one or two lines, the perks wrap or do not, the paragraph runs three to eight
       lines. If the block is centred (or the column is), that variation is shared out
       ABOVE the text as well as below, so the rule and the first line slide up and down
       on every hover. That is what reads as unsleek: the thing you are not changing
       appears to move. Anchor the column to its top and the whole variance falls to the
       bottom, where nothing is looking. */
    /* ★★ BR-S470 — align-content, AND IT IS THE ONE THAT WAS ACTUALLY MISSING.
       The builder, on the tarot face: "this spacing and layout is odd."
       .m2read is a GRID (styles.css:3298). `justify-content` on the line above governs
       the INLINE axis and does nothing to row distribution; the block axis is
       `align-content`, which defaults to stretch. So the moment BR-S465 gave this block a
       518px reserve for the specimen panel, the tarot face — which has no panel, the
       overlay stands down there — distributed its two remaining rows across all 518px
       and opened a ~250px hole between the meta line and the meaning.
       The reserve was right and the distribution was never specified. `start` stacks the
       rows at the top and drops the whole surplus to the bottom, which is the same law
       the panel itself follows two rules down: the variance goes where nothing is
       looking. It applies on both faces because both want it. */
    + ".m2read{justify-content:flex-start!important;align-items:stretch!important;"
    +   "align-content:start!important;position:relative}"
    /* ★★ BR-S461 — THE PANEL IS TAKEN OUT OF FLOW, AND min-height:430px IS DELETED.
       That reservation was the second half of the same defect: it forced .m2read to a
       height the app's own text never has, so the head jumped even before a specimen
       varied. Absolutely positioned over the (now visibility-hidden, still full-size)
       text, the panel occupies exactly the app's own box; every specimen's own variance
       falls DOWNWARD into the column's air below, which is what the law two rules up
       actually asks for — "where nothing is looking".
       ★ AND NOTHING UNHIDES AN UNWRITTEN PANEL. render() sets .is-ready at its end, so
       even a future path that reveals early shows the app's text rather than a void —
       the belt behind BR-S459's fix. */
    /* ★★ BR-S465 — THE RESERVE COMES BACK, BUT UNCONDITIONALLY. BR-S461 deleted
       `min-height:430px` because it was the thing forcing the head to move — and that
       was half right. The head moved because the reserve applied ONLY while the panel
       was up: 173px at rest, 430px on hover, and .menu__draw's grid re-centres the head
       on any change. The defect was never the reserve, it was that it CHANGED.

       Deleting it fixed the jump and created a worse bug the builder caught immediately:
       with .sx absolutely positioned inside a 173px box, a 445px specimen hung 271px
       BELOW the whole column. The fleet's synthesis said the variance would "fall into
       the column's own air below .m2read" — there is no air. The header ends where
       .m2read ends.

       A CONSTANT reserve satisfies both at once. The height never changes, so the head
       cannot re-centre; and it is tall enough that no specimen escapes it. The cost is
       real and worth naming: the read column now reserves this height even at rest and
       on the tarot face, where the overlay stands down. That is air under the text
       rather than a control jumping under the reader's eye, and against a card that is
       400-620px tall it reads as the column matching the card rather than as a gap. */
    /* 452 was measured off one specimen and the tallest of the six came in at 466 —
       14px still escaped. Set past the real worst case, not at it: the panel's own
       per-mark line reserves (the `r:` column in SIX) already stop it varying BETWEEN
       marks, so this only has to clear the tallest one that exists. */
    + ".m2read{min-height:548px}"


    + ".sx{transition:opacity 110ms ease;position:absolute;top:0;left:0;right:0}"
    + ".sx:not(.is-ready){display:none}"
    + ".sx.is-out{opacity:0}"
    /* ★ THE PANEL IS A CONSEQUENCE OF THE GESTURE, NOT A FIXTURE. Leave the card and it
       goes — and because the app's own children were HIDDEN rather than removed, they
       come back rather than leaving a hole. The column returns to the page as designed
       instead of emptying. `display:none` and not just opacity, or the 430px reserve
       would hold a gap open under nothing. */
    + ".sx.is-away{display:none}"
    /* ★ BR-S462 — visibility, to match .sx-hide. BR-S461 changed the hide from `display`
       to `visibility` (so the column stops changing height and the head stops jumping)
       and this line was left reverting `display` — which un-hides nothing when the
       element was never display:none. Net effect: the app's own three children became
       permanently invisible, so the read column was blank at rest. Caught by measuring
       `visibility` at rest rather than by looking at the page, where "blank" and
       "correct" are the same screenshot until you hover. */
    + ".sx-hide.is-back{visibility:visible!important;animation:sxfade 180ms ease both}"
    + "@keyframes sxfade{from{opacity:0}to{opacity:1}}"

    /* ══ BR-S464 — THE PRINT. The specimen is laid, it does not switch on. ═════════
       Two sources, and the graft is deliberate:
         · the fifteen-agent pass chose THE PRINT — ink laid top-to-bottom in groups,
           left-edge registration, no vertical travel, and a rate clamp so the gesture
           gets SHORTER under speed instead of stacking.
         · the builder named the Codex aperture as the reference that satisfies, and
           docs/BLOOM_GRAMMAR_V1.md pulls it apart: asymmetric easing (a leap, then a
           crawl), an EDGE drawn as its own object that hits opacity 0 exactly as it
           lands, an irregular non-monotonic settle, and staggered layers.
       The bloom shipped at BR-S453/455 had none of the first three, which is why it
       read as "the text got brighter" rather than as something happening.

       ★ THE EDGE IS THE MISSING IDEA, AND IT IS A PSEUDO-ELEMENT ON PURPOSE. render()
       rewrites the panel's contents, so a real <div> edge would be destroyed on every
       specimen. ::after survives, costs no node, and cannot be caught mid-write. It
       travels the panel and is GONE at the instant it lands — a reveal with a lingering
       edge is a border; one with no edge at all is a crossfade.

       ★ TWO KEYFRAME NAMES, ALTERNATED. This is the restart, and it is the one thing
       the agents' first draft got wrong: toggling a class that only carries COLOUR does
       not restart an animation. The class must carry the animation itself, and there
       must be two, or a re-fire on the same mark does nothing at all — which does not
       look broken, it looks like nothing happened.

       ★ ORIGIN IS THE LEFT EDGE (0 60%), NEVER CENTRED. A centred origin drifts each
       line's left edge by a subpixel in opposite directions and the column reads as
       shivering. The registration mark of a printed sheet is its left edge. */
    + "@property --sx-ink{syntax:'<color>';inherits:false;initial-value:#dcd7cb}"
    + "@keyframes sx-print-a{0%{opacity:var(--sx-o,.30);transform:scale(var(--sx-amp,1))}"
    +   "34%{opacity:1}62%{opacity:.94}100%{opacity:1;transform:none}}"
    + "@keyframes sx-print-b{0%{opacity:var(--sx-o,.30);transform:scale(var(--sx-amp,1))}"
    +   "34%{opacity:1}62%{opacity:.94}100%{opacity:1;transform:none}}"
    /* the 62% dip is the irregularity — one beat where the ink is not yet settled.
       Monotonic reads as a machine; this reads as something drying. */
    /* ★★ BR-S466 — THE WHOLE BOX BLOOMS, NOT A LINE FRONT. The builder drew it: a box,
       the text inside it, and diagonal strokes across the ENTIRE panel — "i was more
       thinking whole chat box blooms like codex's ending".
       That is the aperture's SHEEN (styles.css:4968), not its ink frontier: a 135°
       band travelling corner to corner over the whole surface, screen-blended, which is
       the last thing the Codex does when it opens. BR-S464 built the horizontal edge —
       the right grammar, the wrong axis and the wrong scale. The panel is a sheet being
       turned to the light, not a line being drawn down it. */
    /* ★ BR-S468 — THE PLATEAU NARROWS, 18/78 -> 24/70. The band was sitting at full
       brightness for 60% of its travel, which on a sheet this size reads as a WASH
       moving across rather than a light crossing it. 46% is a pass. */
    /* ★★★ BR-S477 — THE BAND WAS A STROBE, NOT A WASH, AND THAT IS WHY EVERY RETUNING
       FAILED. Found by a twelve-agent pass and then re-derived here against the real
       boxes rather than taken on trust:

           panel                520 x 401
           ::after box          1144 x 883   (inset:-60%)
           135deg gradient span 1433px
           the band itself      172px  (stops 44%..56%)
           travel at +/-70%     2007px = 11.67 BAND-WIDTHS
           fraction of that travel spent OVER the panel:  0.41

       So 59% of the animation happened off-screen, and during the fast phase of
       cubic-bezier(.4,.1,.2,1) the band advanced more than its own width per frame —
       successive frames did not overlap. The reader was not seeing a light cross a
       sheet; they were seeing a few disjoint diagonal bars flashed at the full .9
       plateau. Halving the alpha only ever halved a flicker, and a dim flicker still
       recruits attention. Which is exactly the "it announces itself" complaint.

       ★ +/-45% AND LINEAR FIX BOTH AT ONCE, and the arithmetic is checkable:
           travel  2007 -> 1290px = 7.5 band-widths
           step    0.65 band-widths/frame, UNIFORM — 58% overlap frame to frame
           on-panel fraction  0.41 -> 0.64
       Linear is not a reversal of BR-S468. That correction said a thing PASSING THROUGH
       must not use the ARRIVAL curve, and nothing that passes through accelerates.
       Linear is the only easing whose rate is the same on every frame rather than on
       average, which is what continuity actually requires.

       ★ AND THE OPACITY RAMP FINALLY HAPPENS ON THE SHEET. At +/-70% both the fade-in
       and the fade-out occurred beyond the panel's edges, so BLOOM_GRAMMAR's second
       property — an edge that hits opacity 0 exactly as it lands — was never once
       visible. Now it is on-panel where it can be seen. */
    + "@keyframes sx-edge-a{0%{opacity:0;transform:translate3d(-45%,-45%,0)}"
    +   "22%{opacity:.62}72%{opacity:.62}100%{opacity:0;transform:translate3d(45%,45%,0)}}"
    + "@keyframes sx-edge-b{0%{opacity:0;transform:translate3d(-45%,-45%,0)}"
    +   "22%{opacity:.62}72%{opacity:.62}100%{opacity:0;transform:translate3d(45%,45%,0)}}"
    + ".sx{--sx-ease:cubic-bezier(.22,.50,.16,1)}"          /* the aperture's own leap-then-crawl */
    + ".sx>*{transform-origin:0 60%;--sx-amp:1}"
    + ".sx__glyph,.sx__name{--sx-amp:var(--sx-scale,1)}"    /* only the two large marks take the spread */
    /* four groups, one pass of the nib. Eight staggered elements outrun any readable
       window; four is a stroke. */
    + ".sx__src,.sx__glyph,.sx__label{--g:0}"
    + ".sx__name,.sx__attrs{--g:1}"
    + ".sx__perks{--g:2}"
    + ".sx__say,.sx__close{--g:3}"
    /* ★★ BR-S477 — THE CHILDREN ARE NAMED, NOT STARRED. docs memory records the measured
       cost of this exact shape on this exact page: `#menuView.is-sliding .menu__panel *`
       cost 8.1-9.9ms of style recalc against 0.2ms for the identical rule with the
       elements listed, because Blink cannot build a class invalidation set for `*` and
       marks the whole subtree instead. This subtree is ~18 nodes rather than 427, so the
       cost here is small — but it is 100% avoidable at zero cost, and the note in that
       file is flat: never scope a state class with `*` on this page. */
    + ".sx.is-print-a>.sx__src,.sx.is-print-a>.sx__glyph,.sx.is-print-a>.sx__label,"
    +   ".sx.is-print-a>.sx__name,.sx.is-print-a>.sx__attrs,.sx.is-print-a>.sx__perks,"
    +   ".sx.is-print-a>.sx__say,.sx.is-print-a>.sx__close"
    +   "{animation:sx-print-a var(--sx-dur,230ms) var(--sx-ease)"
    +   " calc(var(--g,0) * var(--sx-step,26ms)) both}"
    + ".sx.is-print-b>.sx__src,.sx.is-print-b>.sx__glyph,.sx.is-print-b>.sx__label,"
    +   ".sx.is-print-b>.sx__name,.sx.is-print-b>.sx__attrs,.sx.is-print-b>.sx__perks,"
    +   ".sx.is-print-b>.sx__say,.sx.is-print-b>.sx__close"
    +   "{animation:sx-print-b var(--sx-dur,230ms) var(--sx-ease)"
    +   " calc(var(--g,0) * var(--sx-step,26ms)) both}"
    /* ★★ THE SHEEN, LIFTED FROM THE APERTURE VERBATIM — "same concepts that we built on
       codex". Same 135° band, same four stops, same screen blend, same corner-to-corner
       travel. Not "like" it: the identical grammar, applied to a smaller sheet, so the
       two surfaces are the same gesture at two scales rather than two effects that
       resemble each other.
       ★ inset:-60% is what lets the band cross the corners rather than start inside the
       box, which is why .sx must clip — without overflow:hidden the sheen paints 60% of
       the panel's size out into the room on every mark. */
    + ".sx{position:absolute;overflow:hidden}"
    + ".sx::after{content:'';position:absolute;inset:-60%;"
    +   "pointer-events:none;opacity:0;mix-blend-mode:screen;"
    +   "transform:translate3d(-70%,-70%,0);"
    +   "background:linear-gradient(135deg,transparent 0 44%,rgba(255,246,228,.05) 47.5%,"
    +   "rgba(255,249,235,.16) 50%,rgba(255,246,228,.05) 52.5%,transparent 56% 100%)}"
    /* ★★ BR-S468 — TWO CORRECTIONS TO THE SHEEN, both of them errors rather than taste.
       1. ITS OWN CURVE. It was running on --sx-ease, the EDGE curve — a leap then a long
          crawl, which is right for a thing ARRIVING and wrong for a thing PASSING
          THROUGH. A glint that lingers stops being a glint. The aperture uses a
          different curve for its sheen than for its ink frontier (styles.css:4982,
          cubic-bezier(.4,.1,.2,1)) and that distinction is the reason it works.
       2. IT COMES AFTER THE TEXT, NOT WITH IT. In the Codex the sheen fires at 800ms —
          LAST, once the ink and the ember have settled. Here both started on the same
          frame, so the light and the words competed for one instant. 70ms is small in
          absolute terms and it is the whole difference between "a specimen appeared and
          was then lit" and "two things happened at once". */
    /* BR-S477: linear. See the keyframes above — a rate that is uniform per FRAME, not
       merely per average, is the whole continuity requirement. */
    + ".sx{--sx-sheen-ease:linear}"
    + ".sx.is-print-a::after{animation:sx-edge-a var(--sx-edge,300ms) var(--sx-sheen-ease) 70ms both}"
    + ".sx.is-print-b::after{animation:sx-edge-b var(--sx-edge,300ms) var(--sx-sheen-ease) 70ms both}"
    /* ★ THE MARK YOU TOUCHED ACKNOWLEDGES IT — the aperture's fifth property. Nothing
       on the control moved before, so the panel appeared to change on its own. */
    + ".m2bface__marks li[aria-current='true']{transition:color 160ms var(--sx-ease,ease)}"
    + "@media (prefers-reduced-motion:reduce){"
    /* BR-S477: named here too. It is inside a media query and only ever matches under
       reduced motion — but the rule in this repo is flat rather than conditional, and a
       `*` left in one place is the one a later pass copies. */
    +   ".sx.is-print-a>.sx__src,.sx.is-print-a>.sx__glyph,.sx.is-print-a>.sx__label,"
    +   ".sx.is-print-a>.sx__name,.sx.is-print-a>.sx__attrs,.sx.is-print-a>.sx__perks,"
    +   ".sx.is-print-a>.sx__say,.sx.is-print-a>.sx__close,"
    +   ".sx.is-print-b>.sx__src,.sx.is-print-b>.sx__glyph,.sx.is-print-b>.sx__label,"
    +   ".sx.is-print-b>.sx__name,.sx.is-print-b>.sx__attrs,.sx.is-print-b>.sx__perks,"
    +   ".sx.is-print-b>.sx__say,.sx.is-print-b>.sx__close{animation:none}"
    +   ".sx.is-print-a::after,.sx.is-print-b::after{animation:none;opacity:0}}"


    + ".sx__src{font-family:var(--font-mono);font-size:9px;letter-spacing:.2em;"
    +   "text-transform:uppercase;color:#6e6b63;margin:0 0 16px;display:flex;gap:7px}"
    + ".sx__src b{color:#948f87;font-weight:400}"
    + ".sx__glyph{font-size:34px;line-height:1;margin-bottom:13px;color:var(--sxc);"
    +   "font-family:'Segoe UI Symbol','Cambria Math',var(--font-display),serif;font-variant-emoji:text}"
    + ".sx__label{font-family:var(--font-mono);font-size:9.5px;letter-spacing:.2em;"
    +   "text-transform:uppercase;color:#6e6b63;margin:0 0 8px}"
    /* ★ RESERVE PER MARK, NOT PER PANEL. Measured from codex-data.json:
         name  3-11 chars (sun) ... 15-58 chars (hexagram)
         tag   7-97 chars       perks 38-99 chars      meaning 260-515 chars
       Reserving the GLOBAL worst case would leave ~4 empty lines under a Leo, which
       costs more than the movement it removes. But you only ever compare specimens
       WITHIN one mark — re-hovering Sun sign deals twelve names of 3-11 characters,
       all one line. The big variance is BETWEEN marks, where the colour, glyph and
       label all change too, and movement is not noise: something different arrived.
       So each mark reserves its own worst case (--rn / --rt / --rp line counts) and
       browsing one mark is perfectly still. */
    + ".sx__name{font-family:var(--font-display);font-size:29px;font-weight:600;"
    +   "color:#dcd7cb;margin:0 0 10px;line-height:1.1;min-height:calc(var(--rn,1) * 1.1em)}"
    + ".sx__attrs{font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;"
    +   "color:#605d55;line-height:1.75;margin:0 0 13px;font-variant-emoji:text;"
    +   "min-height:calc(var(--rt,1) * 1.75em)}"
    /* THE PERKS — Cormorant italic, the card's own face. Easy on the eye at 17px,
       and it has a voice; 10px tracked mono was a spec sheet. A COST is set ROMAN,
       so the gift/cost split survives with colour switched off (house rule: status
       is never colour alone) and needs no dot, badge or orb to carry it. */
    + ".sx__perks{display:flex;flex-wrap:wrap;gap:4px 16px;align-items:baseline;margin:0 0 17px;"
    +   "align-content:flex-start;min-height:calc(var(--rp,2) * 1.4em)}"
    + ".sx__pk{font-family:var(--font-display);font-style:italic;font-weight:500;"
    +   "font-size:17px;letter-spacing:.012em;line-height:1.4;color:var(--pk)}"
    + ".sx__pk--cost{font-style:normal;font-weight:400;color:#8b837e;opacity:.8}"
    + ".sx__say{font-size:13px;line-height:1.62;color:#948f87;margin:0}"
    + ".sx__close{margin-top:15px;padding-top:12px;border-top:1px solid rgba(233,229,220,.09);"
    +   "display:flex;align-items:baseline;gap:9px}"
    + ".sx__close i{color:var(--sxc);font-size:9px;font-style:normal;line-height:1.7}"
    + ".sx__close span{font-family:var(--font-display);font-style:italic;font-size:13px;color:#a8a294}"

    /* ══ BR-S467 — THE MARK'S NAME IS THE THING, AND IT WAS RANKING THIRD ══════════
       The builder: "the name of the mark could be more visible or brighter and not
       hidden of there."

       MEASURED, THE PANEL'S OWN ORDER OF LOUDNESS PUT IT THIRD. The name was #dcd7cb at
       29px; the glyph directly above it was 34px AND carried the mark's own colour, and
       colour outranks size for the eye. So the loudest thing on the panel was a symbol,
       the second was a coloured field, and the ANSWER — the word the whole gesture
       exists to deliver — sat between two small grey lines looking like a middle row.
       It was not dim in the absolute; it was dim RELATIVE to everything around it, which
       is why it reads as hidden rather than as faint.

       Three changes, all to rank rather than to volume:
         · #f4eee1 — now the brightest text on the panel, above the meaning paragraph
           and above the glyph. It also matches the "Question" label across the column,
           so the two hero words in this whole region share one register.
         · 33px, so it beats the glyph on size as well as on brightness.
         · the glyph steps back to 30px and .82 opacity. It is the mark's SIGN, not its
           name — it should be recognised, not read first. Nothing is taken away; the
           order is simply corrected.
       The label above stays 6px away (BR-S466's tightest gap), so it still reads as
       belonging to the name rather than floating between two blocks. */
    + ".sx__name{font-size:33px;color:#f4eee1}"
    + ".sx__glyph{font-size:30px;opacity:.82}"

    /* ★★ BR-S468 — WHICH OF THE SIX YOU ARE LOOKING AT, MADE READABLE.
       "Year animal" was set at the same 9.5px / #6e6b63 as the provenance clause beside
       it and the eyebrow above it — three different jobs at one luminance (0.044), so
       the only line that answers "which mark is this" was indistinguishable from
       furniture. It is now the second-brightest thing on the panel, well under the
       specimen's name so BR-S467's order survives, and clearly over everything else.
       ★ THE PROVENANCE STAYS QUIET ON PURPOSE. "· from the year" is a qualifier, not a
       heading, and it is the honest half — it says the mark came from the date rather
       than from a hash. Making it loud would put a footnote in the same rank as a title;
       leaving it dim keeps it findable without competing. Available, not announced. */
    /* ★★ BR-S471 — BACK TO THE ORIGINAL SHAPE, ONE STOP BRIGHTER. The builder, after
       BR-S468 rebuilt this line as a bold 11px label: "the brighter name of marks is
       stealing the focus… i want the one that was originally but just slightly more
       readable."

       WHAT I GOT WRONG WAS THE SIZE OF THE FIX, NOT THE DIAGNOSIS. The line WAS too dim
       to find. But I answered that by re-ranking it — 11px, weight 600, near-white — and
       small bold letterforms at wide tracking punch far above their point size, so an
       11px label was pulling the eye BEFORE the 33px specimen name under it. That is
       BR-S467's ranking error again with the roles swapped, and two commits after
       committing the lesson.

       The original was right in FORM and one stop too dark in VALUE. So the form comes
       back exactly — 9.5px mono, weight 400, .2em, the slot and its provenance reading
       as one line again — and only the value moves, #6e6b63 -> #8a8479. Readable, still
       furniture, and nothing on the panel changes rank.

       The two spans stay in the markup and style identically. They cost nothing, and a
       later pass that does want to separate the slot from its provenance has the hooks
       without another render change. */
    + ".sx__slot,.sx__from{font-weight:400;font-size:inherit;letter-spacing:inherit;color:inherit}"
    /* ★ AND IT STAYS IN THE GREY FAMILY — "but still fits in with grey thing nearby".
       #8a8479 was a +28 step per channel off the eyebrow beside it, far enough to read
       as a different colour rather than as the same one turned up. #7c766c is +14: a
       clear lift against #6e6b63, and still unmistakably the same grey as .sx__src above
       it and .sx__attrs below. One stop, not two. */
    + ".sx__label{color:#7c766c}"

    /* ══ BR-S472 — THE MEANING JOINS THE PANEL'S OWN FAMILY, WITHOUT GOING AIRY ══════
       The builder: the explanation "is weakest visually of what we have around" —
       "although it should stay stabilising and solidish".

       ★ THE MEASUREMENT THAT EXPLAINS THE FEELING. This panel takes over a column that
       was holding the app's own read: Cormorant, 19px, rgb(177,173,164). What replaced
       it in the same slot, doing the same job, was Inter at 13px in rgb(148,143,135) —
       smaller, dimmer, and in a THIRD typeface that nothing else here uses for reading.
       The panel's name is Cormorant, its labels are Plex Mono, and the longest text on
       it belonged to neither. Not a colour problem: a family problem.

       ★ AND THE SANS WAS DOING A REAL JOB, WHICH IS WHY THIS IS NOT JUST A SWAP. Inter
       sets an even, low-contrast grey mass — it was the solid base the composition
       stood on, and a display serif at the app's own 19px/1.6 would trade that for
       something sparse and elegant, which is the opposite of what this block is for.
       So the family moves and the DENSITY is defended: 16px rather than 19, and 1.5
       leading rather than 1.6. Same block, same weight on the page, one voice fewer.

       Value goes to #aaa69d — the app's own read value, which it can now afford: at
       13px sans it had to stay dim to avoid noise; as the panel's body text it should
       be the second-brightest thing here, under the name and over everything else. */
    /* ★★ BR-S473 — "i like the font but something about reading it still feels off".
       Two causes, and the first one is a straight defect.

       1. THE WEIGHT WAS NOT LOADED. index.html requests Cormorant Garamond at
          wght@0,500;0,600;0,700 — 400 IS NOT AMONG THEM — and this rule inherited 400.
          So every line of the explanation was a browser-SYNTHESISED weight: the 500 cut
          algorithmically thinned, which is precisely the mush that reads as "off"
          without looking obviously wrong. Asking for 500 asks for a real file.

       2. CORMORANT IS A DISPLAY CUT AND 16px WAS UNDER ITS FLOOR. Measured, "xxxxx" at
          16px Cormorant occupies 35.1px — the same width as 13px Inter at 35.5px. Its
          x-height runs ~19% short, so nominal 16px was reading at about 13px, with
          thinner strokes, on a dark ground where thin serifs thin further still. That
          is why the app's own read sets this same kind of prose at 19px and not at 16.
          18px puts the letterforms back over the floor and still measures 59 characters
          a line, inside the comfortable 60-70 band.

       ★ AND IT STAYS SOLID, which was the builder's constraint. Leading goes to 1.52 —
       up two points to carry the taller ascenders, not up to the app's 1.6, because
       that is the setting that turns a block into a poem. */
    + ".sx__say{font-family:var(--font-display);font-size:18px;font-weight:500;"
    +   "line-height:1.52;color:#aaa69d}"

    /* ══ BR-S474 — THE PERKS AND THE MEANING BECOME ONE BLOCK ══════════════════════
       The builder: "the perk and text should be somehow more connected, or at least
       placed and positioned in a way that show undercurrent of connectedness or link…
       one is the extension of another." And explicitly NOT a complaint about the perks
       themselves — "i like perks designs and color and all, its not about that."

       ★ THE SPACING WAS SAYING THE OPPOSITE. BR-S474's own scale put perks -> meaning at
       20px, the LARGEST gap on the panel, the same one used for meaning -> closing line.
       So the two things that are the same thought — the keywords, and those keywords in
       prose — were separated by the panel's strongest "different section" signal. They
       were not merely un-linked; they were actively parted.

       ★ SO THE LINK IS LITERAL: ONE UNBROKEN RULE DOWN THEIR LEFT EDGE. Proximity alone
       would only have made them near each other. A single hairline running from the
       first keyword to the last line of the meaning says they are one column of thought
       — the "undercurrent" made into an actual line. It is continuous because the gap
       between them is closed to ZERO and the space is moved INSIDE as padding: two
       elements, one uninterrupted stroke.

       ★ AND IT INDENTS ONLY THIS PAIR. Everything else on the panel keeps the flush left
       edge, so the indent itself is the second signal — this pair is set in from the
       column, the way a quoted passage is. 10px is small enough to read as a tie rather
       than as a nested list.

       ★ THE RULE IS DIM ON PURPOSE (.of the mark's own colour at low alpha). It should
       be felt when you look for it and invisible when you are reading — an undercurrent,
       which is the builder's word and the right one. It borrows --sxc, so it carries the
       mark's colour without adding a new one to the palette. */
    + ".sx__perks{margin:0;padding:0 0 12px 10px;border-left:1px solid color-mix(in srgb,var(--sxc,#8a8479) 34%,transparent)}"
    + ".sx__say{margin:0;padding:0 0 0 10px;border-left:1px solid color-mix(in srgb,var(--sxc,#8a8479) 34%,transparent)}"
    /* the gap the pair used to hold now sits under the pair, restoring the 20px break
       before the closing line so the BLOCK still reads as separate from what follows */
    + ".sx__close{margin:20px 0 0}"

    /* ★★ AND THE PROSE GETS ITS WEIGHT — "the text should somehow feel heavier or more
       solid". 500 -> 600, and 600 is a loaded cut (wght@0,500;0,600;0,700), so this is a
       real file rather than the synthesis BR-S473 just removed. Weight is the honest
       lever here: size is already at 18px and larger would start to compete with the
       name, and a brighter value would lift it above the name's rank. A heavier stroke
       makes the same block denser on the page without making it bigger or louder. */
    + ".sx__say{font-weight:600}"

    /* ══ BR-S466 — THE VERTICAL RHYTHM. Measured down the panel, the gaps between
       consecutive blocks ran 16, 13, 8, 10, 13, 17, 15 — SEVEN values, no two the same
       for a reason, and close enough together that they read as accidental rather than
       as a scale. Nothing was broken; it simply had no rhythm, which is what "spacing
       issues" feels like before you can name it.

       ★ THE SCALE IS 6 / 8 / 12 / 16 / 20 and every gap is one of them. But the numbers
       are not the point — the GROUPING is. Spacing is the only thing on this panel that
       says what belongs to what:

           sx__src        the eyebrow — its own thing            20 below
           sx__glyph      the mark                               12
           sx__label       ┐ a label belongs to the name          6   <- tightest gap
           sx__name        │ under it, so it is bound to it       8       on the panel
           sx__attrs       ┘ and the attributes describe it      16
           sx__perks      the keywords                           20
           sx__say        the meaning                            20
           sx__close      the closing line

       The 6px between label and name is the smallest gap here on purpose: it is the one
       pair where the top item is meaningless without the bottom one. Before, that pair
       (8) was barely tighter than the perks-to-meaning break (17) — so the eye had no
       way to tell a caption from a section.

       ★ COST CHECKED, NOT ASSUMED: +10px on the tallest specimen, 466 -> ~476, against a
       486 reserve. It still clears, with 10px to spare. */
    + ".sx__src{margin:0 0 20px}"
    + ".sx__glyph{margin:0 0 12px}"
    + ".sx__label{margin:0 0 6px}"
    + ".sx__name{margin:0 0 8px}"
    + ".sx__attrs{margin:0 0 16px}"
    /* BR-S474: perks -> meaning is now ZERO. The 20px that used to sit here was the
       panel's strongest "different section" signal, applied to the two things that are
       the same thought. The space it held moves INSIDE the pair as padding, so the left
       rule that ties them can run unbroken. The break before the closing line keeps its
       20px, so the bound pair still reads as separate from what follows. */
    + ".sx__perks{margin:0}"
    + ".sx__say{margin:0}"
    + ".sx__close{margin:20px 0 0}";

  function esc(s){ return String(s).replace(/[&<>]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;"}[c];}); }

  /* shuffled bag, not random() — plain random deals the same animal twice running and
     the whole point (there are twelve of these) fails to land */
  function deal(i){
    var n = SIX[i].n;
    if(!bags[i] || !bags[i].length){
      var a=[]; for(var k=0;k<n;k++) a.push(k);
      for(var j=a.length-1;j>0;j--){var r=Math.floor(Math.random()*(j+1)),t=a[j];a[j]=a[r];a[r]=t;}
      bags[i]=a;
    }
    return bags[i].pop();
  }

  function glyphFor(sp,e,idx){
    if(sp.g==="tagfirst")  return String(e.tag||"").trim().charAt(0);
    if(sp.g==="cjk")       return CJK[idx]||"";
    if(sp.g==="rune")      return RUNE[idx]||"";
    if(sp.g==="name")      return String(e.name);
    /* ★★ BR-S462 — THE HEXAGRAM HAD BEEN SHOWING ☰ FOR ALL SIXTY-FOUR, AND IT IS FALSE
       FOR SIXTY-THREE OF THEM. The hexagram ran through this trigram branch, which looks
       for a ☰-☷ character at the head of the name — and every hexagram in codex-data.json
       is King Wen order named "1 · The Creative (Qián)" … "64 · Before Completion", i.e.
       every one begins with a DIGIT. So the test failed 64 times out of 64 and the
       hardcoded fallback fired every time: a specific mark asserting a specific and wrong
       thing, in the deepest system in the archive. Verified on the live page — the panel
       showed ☰ beside "35 · Progress (Jìn)".
       U+4DC0-4DFF IS the King Wen block, in order, and `idx` is the entries index, so the
       two align exactly with no table. ★ The fallback is the hexagram NUMBER, which is
       true of the specimen — never a fixed trigram, which is how this got here. */
    if(sp.g==="hexagram"){
      var h=String.fromCodePoint(0x4DC0+idx);
      return h || String(idx+1);
    }
    if(sp.g==="namefirst"){var c=String(e.name).trim().charAt(0);return /[☰-☷]/.test(c)?c:"☰";}
    return "";
  }

  function render(d, i){
    if(!DATA) return;
    var sp=SIX[i], idx=deal(i), e=DATA[sp.sys].entries[idx];
    var box=d.querySelector(".sx"); if(!box) return;
    /* ★★ BR-S437 — THE LATENCY WAS MINE, AND IT WAS 280ms PER MARK.
       "scrolling throught these options still read bit slow latency or not feeling
       smooth enough or satisfying." Correct, and it is not performance: this faded the
       panel OUT over 150ms, waited 130ms, then wrote the new specimen and faded it back.
       Walking the six meant a quarter-second of blank panel at every step — and if you
       move faster than that you are only ever looking at the fade.
       A cross-fade is right when a thing is REPLACED and wrong when it is BROWSED. These
       are index cards, not slides: the swap is now synchronous, and the fade survives
       only for the panel's first arrival, where there is genuinely something to reveal.
       Nothing is lost — the specimen still changes, it just changes at the speed of the
       hand that asked for it. */
    (function(){
      box.style.setProperty("--sxc","var(--sx-"+sp.c+")");
      box.style.setProperty("--rn",sp.r[0]);          /* this mark's reserved lines — so */
      box.style.setProperty("--rt",sp.r[1]);          /* every specimen WITHIN a mark    */
      box.style.setProperty("--rp",sp.r[2]);          /* lands at identical heights      */
      box.querySelector(".sx__src").innerHTML='<span>&#9670;</span><span>From the archive &middot; <b>one of '+sp.n+'</b></span>';
      var g=glyphFor(sp,e,idx);
      box.querySelector(".sx__glyph").textContent = g&&g.length===1 ? g+"︎" : g;
      /* ★★ BR-S468 — THE SLOT NAME AND ITS PROVENANCE STOP SHARING ONE WEIGHT.
         The builder: 'name of the mark ... aka "the animal" "the sun sign" its hard to
         spot currently since that too is dim.'
         This line was one text node — "Year animal · from the year" — set entirely at
         9.5px in #6e6b63, which measured a relative luminance of 0.044, the same as the
         eyebrow above it. So the thing that says WHICH OF THE SIX you are looking at was
         rendered at footnote weight, indistinguishable from an actual footnote.
         They are two different jobs and they now look like it: the slot NAMES the mark
         and is read; the provenance QUALIFIES it and is available. Two spans, one node,
         no layout change. */
      box.querySelector(".sx__label").innerHTML =
        '<b class="sx__slot"></b><span class="sx__from"></span>';
      box.querySelector(".sx__slot").textContent = sp.key;
      box.querySelector(".sx__from").textContent = " · "+sp.from;
      box.querySelector(".sx__name").textContent  = e.name;
      box.querySelector(".sx__attrs").innerHTML   = e.tag ? esc(e.tag) : "";
      var pk=box.querySelector(".sx__perks"); pk.innerHTML="";
      (e.keywords||[]).slice(0,5).forEach(function(k){
        var s=d.createElement("span");
        /* the authored bank, matched case-insensitively; anything outside it takes the
           bank's OWN default rather than a colour I would have to invent for it */
        var c = KWC ? (KWC[k] || KWC[String(k).toLowerCase()] || KWDEF) : KWDEF;
        s.className="sx__pk"; s.style.setProperty("--pk",c);
        s.textContent=k; pk.appendChild(s);
      });
      box.querySelector(".sx__say").textContent = String(e.meaning||"");
      box.classList.remove("is-out");
    })();

    var ul=d.querySelector(".m2bface__marks");
    if(ul){
      ul.classList.add("sx-on");
      Array.prototype.forEach.call(ul.children,function(li,k){
        li.setAttribute("aria-current", k===i?"true":"false");
      });
    }
    current=i;
    /* BR-S461 — the panel is only allowed to exist once it has been written. Paired with
       `.sx:not(.is-ready){display:none}`, this makes BR-S459's fix structural rather than
       conditional: no path, present or future, can reveal an unwritten specimen. */
    if(box) box.classList.add("is-ready");

    /* ══ BR-S464 — FIRE THE PRINT, AT A RATE SET BY THE HAND ══════════════════════
       ★ THE CLAMP IS THE ANSWER TO SIX-IN-TWO-SECONDS. A gesture that is lovely once
       is nauseating six times, and the fix is not to suppress it but to SHORTEN it:
       k runs 1 at rest down to .34 on a fast sweep, and every duration, the stagger,
       the spread and the opacity floor ride it. At sweep speed the stagger is under a
       frame — the nib has no visible front — and the floor is .80, so every frame of
       the sweep is readable text rather than a flash. Continuous, so it cannot land on
       a threshold edge the way a two-bucket step can.
       ★ AND THE LIT STATE BECOMES A CONDITION, NOT AN EVENT. The class is stripped by
       a timer that a sweep clears and re-arms before it ever fires — so six marks do
       not produce six flashes, they produce one continuous lit panel that decays only
       when the hand stops. */
    if(box){
      var now = (root.performance && root.performance.now) ? root.performance.now() : +new Date();
      var dt  = now - (LAST_PRINT || 0); LAST_PRINT = now;
      var k   = Math.max(0.34, Math.min(1, dt / 260));
      /* ★★ BR-S468 — THE SHEEN FLOORS HIGHER THAN THE TEXT, and they should never have
         shared a floor. The text is per-line ink and genuinely SHOULD compress under
         speed — that is the whole point of the clamp. The sheen is ONE OBJECT crossing a
         box, and below roughly 120ms a moving light stops reading as movement at all and
         becomes a flicker. At k=.34 it was 102ms: the effect evaporated exactly when the
         reader was moving fast enough to need it most. Floored at .55 it never drops
         under 165ms and stays a gesture. */
      var kS = Math.max(0.55, Math.min(1, dt / 260));
      box.style.setProperty("--sx-dur",  Math.round(230 * k) + "ms");
      box.style.setProperty("--sx-edge", Math.round(300 * kS) + "ms");
      box.style.setProperty("--sx-step", Math.round(26  * k) + "ms");
      box.style.setProperty("--sx-scale", (1 + 0.012 * k).toFixed(4));
      /* ★★ BR-S477 — THE FLOOR WAS INVERTED, AND IT WAS THE LOUDEST THING IN THE EFFECT.
         `0.30 + 0.50*(1-k)` means at REST (k=1) the text started at .30 — a 70% opacity
         swing on the slow, deliberate hover — and under speed it rose to .80, a 20%
         swing. So the biggest animation was handed to the reader who was moving slowest
         and looking hardest, and the smallest to the sweep it was designed for. Exactly
         backwards.
         `0.56 + 0.24*(1-k)` gives a 44% swing at rest falling to 20% at speed: still
         visibly an arrival, roughly a third quieter, and it now RECEDES as the hand
         moves faster rather than growing. */
      box.style.setProperty("--sx-o", (0.56 + 0.24 * (1 - k)).toFixed(2));
      /* alternate the NAME, which is the only restart that costs no reflow */
      var a = box.classList.contains("is-print-a");
      box.classList.remove(a ? "is-print-a" : "is-print-b");
      box.classList.add(a ? "is-print-b" : "is-print-a");
      if(PRINT_T) root.clearTimeout(PRINT_T);
      PRINT_T = root.setTimeout(function(){
        box.classList.remove("is-print-a","is-print-b");
      }, Math.round(230 * k) + 3 * Math.round(26 * k) + 40);
    }
  }
  var LAST_PRINT = 0, PRINT_T = null;

  function install(d){
    if(!d || !d.querySelector(".m2bface__marks") || !d.querySelector(".m2read")) return false;

    if(!d.getElementById("__sixlive")){
      var st=d.createElement("style"); st.id="__sixlive"; st.textContent=CSS;
      d.head.appendChild(st);
    }

    /* the panel — inserted beside the app's own children, which are hidden rather
       than removed because the app rewrites them on every menu mount */
    var read=d.querySelector(".m2read");
    if(!read.querySelector(".sx")){
      Array.prototype.forEach.call(read.children,function(c){ c.classList.add("sx-hide"); });
      var box=d.createElement("div"); box.className="sx";
      box.innerHTML='<p class="sx__src"></p><div class="sx__glyph"></div>'
        +'<p class="sx__label"></p><h2 class="sx__name"></h2><p class="sx__attrs"></p>'
        +'<div class="sx__perks"></div><p class="sx__say"></p>'
        +'<div class="sx__close"><i>&#9670;</i><span>Yours is this one read against your other five.</span></div>';
      read.appendChild(box);
    }

    var ul=d.querySelector(".m2bface__marks");
    if(!ul.dataset.sx){
      ul.dataset.sx="1";
      /* .m2bface is pointer-events:none with `> *` set back to auto (styles.css:3680),
         so the <li>s do not take the pointer by default — grant it explicitly. */
      ul.style.pointerEvents="auto";

      /* ★★ BR-S462 (M4) — THE PANEL OPENS ON A MARK, NOT ON THE CARD. The builder:
         "remove hovering card shows last example and have it vanilla."
         hold() used to be bound to .m2hero — a 324x513 card whose six marks occupy a
         narrow band across its middle, so you entered through empty stock and the
         takeover fired before you had touched anything. The sentence it deleted is the
         only one on this surface that says what a birth reading IS, and it went
         mid-clause, by a control the reader never knowingly used. Crossing the card is
         now inert: the page stays exactly as it was until a mark is touched.
         ask() is the single funnel — it also OPENS the panel, so one gesture on one mark
         both fills the column and takes it, in that order and never the reverse. */
      function ask(i, force){
        if(i===current && !force) { hold(); return; }
        render(d,i);
        hold();
      }

      Array.prototype.forEach.call(ul.children,function(li,i){
        li.style.pointerEvents="auto";
        li.setAttribute("tabindex","0");
        li.setAttribute("role","button");
        /* ★★ BR-S462 (M6) — ONE GESTURE WAS RENDERING UP TO THREE TIMES, AND EACH
           RENDER BURNS A DRAW. tabindex="0" is set two lines up, so a single click on a
           mark fires pointerenter, then focus, then click — three calls to render(), and
           render() pops a card off that mark's shuffled bag. On Trigram (8 entries) two
           clicks used to exhaust and reshuffle the bag, which defeats the entire point of
           the without-replacement dealer.
           One funnel. Hover and focus ASK for a mark and no-op if it is already showing;
           click FORCES, which turns the click into "deal me another" — the affordance the
           six were missing anyway, and the one thing that keeps touch working, since a
           tap has no hover to arrive through. */
        li.addEventListener("pointerenter",function(){ ask(i,false); });
        li.addEventListener("focus",function(){ ask(i,false); });
        li.addEventListener("click",function(){ ask(i,true); });
      });
      /* ★★ BR-S461 — THIS WAS BOUND ON `document`, AND IT STACKED. Three faults in six
         lines, all from the same choice of host:

         1. IT HIJACKED THE DESCENT. app.js:4783 owns ArrowDown/ArrowUp for the M1->U1
            glide and guards them on `state.view`, the panel index and `_navBlocked`.
            This had none of those and preventDefault'd every arrow press anywhere in the
            document — so one press both glided the page toward U1 AND focused a mark,
            which fired render+hold and popped the panel open over a column the reader
            was scrolling away from. Neither handler stops propagation, so both ran.
         2. IT FIRED ON L1 AND M2, where the marks are in the DOM but off-stage.
         3. IT STACKED. The listener lives inside the one-shot `!ul.dataset.sx` block but
            uninstall() never removed it, so every menu remount added another copy.

         Bound on `ul` instead, all three go at once: keydown BUBBLES from the focused
         li, so the six still arrow-navigate; the handler cannot fire unless focus is
         already inside the six, which is the only state it was ever for; and it dies
         with the node instead of outliving it.

         ★ The index comes from the DOM, not from the module's `current`. `current` is the
         RENDERED specimen, which pointer hover also moves — so arrowing after a hover
         used to jump from wherever the mouse had last been rather than from the focused
         mark. ★ And focus() takes preventScroll: without it the browser issues its own
         scroll write in the same frame as the glide, which is two things moving the page
         at once. ★ role="button" at :228 promises activation; Enter and Space now
         actually do it. */
      ul.addEventListener("keydown",function(e){
        var ls=ul.children, n=ls.length; if(!n) return;
        var at=Array.prototype.indexOf.call(ls, d.activeElement);
        if(e.key==="Enter"||e.key===" "||e.key==="Spacebar"){
          if(at<0) return;
          render(d,at); e.preventDefault(); return;
        }
        if(e.key!=="ArrowDown"&&e.key!=="ArrowUp") return;
        if(at<0) return;                       /* focus is not on a mark — the page keys stay the page's */
        ls[(at+(e.key==="ArrowDown"?1:n-1))%n].focus({preventScroll:true});
        e.preventDefault();
      });

      /* ── PRESENT ONLY WHILE THE CARD IS BEING READ ────────────────────────────
         Active = the pointer is on the card OR on the panel. The panel is included
         deliberately: it holds a paragraph, and a reader who moves toward it to look
         closer must not have it vanish as they arrive.
         The 140ms grace is what stops the flicker between marks — leaving mark 3 and
         entering mark 4 fires leave-then-enter, and without the delay the column would
         blink out and back on every step down the six. */
      var awayT = null;
      function away(on){
        var box=d.querySelector(".sx"), read=d.querySelector(".m2read");
        if(!box||!read) return;
        box.classList.toggle("is-away",on);
        Array.prototype.forEach.call(read.children,function(c){
          if(c!==box) c.classList.toggle("is-back",on);
        });
        var ul=d.querySelector(".m2bface__marks");
        if(ul&&on){ ul.classList.remove("sx-on");
          Array.prototype.forEach.call(ul.children,function(li){ li.setAttribute("aria-current","false"); }); }
        if(ul&&!on) ul.classList.add("sx-on");
      }
      /* ★ THE TAROT FACE IS NOT OURS. The card flips birth <-> tarot, and
         `.m2hero[data-face="tarot"] .m2bface{display:none}` (styles.css:3676) takes the
         six marks with it. Without this guard the panel kept a stale birth specimen up
         while the tarot face was showing, AND the app's own tarot text stayed hidden
         behind it — so flipping the card broke the column. On any face but birth we
         stand down completely and the page gets its own text back. */
      var hero = d.querySelector(".m2hero");
      function onBirth(){ return !hero || hero.getAttribute("data-face") === "birth"; }
      if (hero && root.MutationObserver) {
        new root.MutationObserver(function(){ if(!onBirth()) { if(awayT) root.clearTimeout(awayT); away(true); } })
          .observe(hero, { attributes: true, attributeFilter: ["data-face"] });
      }

      /* ★ AND IT MAY NOT TAKE THE COLUMN UNTIL IT CAN FILL IT. Even with the fetch
         above, there is a window between mount and the archive arriving. Hiding the
         app's own text during it is the same blank column in miniature — so the panel
         simply does not come forward until DATA exists. Nothing is lost: the page
         shows what it always showed until the moment the specimen is ready. */
      /* ★★ BR-S459 — AND IT MAY NOT TAKE THE COLUMN EMPTY EITHER. The guard above
         covers the window BEFORE the archive lands. It does not cover the one after it
         lands with nothing rendered behind it, and on a first visit that is the window
         a visitor is actually in.

         THE TRACE. index.html loads this file, install() runs at once, reaches
         `if (DATA) render(d,0)` at the foot of the one-shot block — and DATA is still
         null, because the fetch two hundred lines below is a network round trip. But
         `ul.dataset.sx` is now "1", so the 700ms re-assert can never re-enter that block
         to try again, and mountMenu() only re-fires on a draft save or the holdings flip,
         neither of which a first-time visitor triggers. So `current` stays -1 for the
         whole session. Then the pointer crosses the card edge, THIS function passes its
         !DATA guard because by now the fetch has landed, away(false) hides the app's own
         three children — and the column holds a 430px void with one line floating in it,
         while the only sentence on the page saying what a birth reading IS sits deleted
         behind it. Worse than not installing the module at all.

         One condition. If nothing has been rendered, render before revealing — the panel
         is never allowed to be the thing on screen until it has something to be. */
      function hold(){
        if(!onBirth() || !DATA) return;
        if(current < 0) render(d, 0);
        if(awayT){ root.clearTimeout(awayT); awayT=null; } away(false);
      }
      /* ★★ BR-S462 (M5) — ON TOUCH THE SPECIMEN USED TO ERASE ITSELF 140ms LATER.
         A touch pointer is DESTROYED at finger-lift, so pointerleave fires as part of
         the tap itself and this put the panel straight back. M1 is the front door; on a
         phone the whole thing read as the page blinking.
         A latch, not pointer-type sniffing — sniffing would need `pointerType!=="mouse"`
         in the enter path, and combined with the click funnel that leaves touch with no
         route to render() at all. The latch asks the only question that matters: does
         this device have a real hover? If not, a tap HOLDS the panel until the reader
         puts it away by touching somewhere else, which is also the way back. */
      var LATCH=false;
      function hoverless(){ return !(root.matchMedia && root.matchMedia("(hover:hover)").matches); }
      function release(){
        if(LATCH) return;
        if(awayT) root.clearTimeout(awayT);
        awayT=root.setTimeout(function(){ away(true); },140);
      }
      ul.addEventListener("click",function(){ if(hoverless()) LATCH=true; });
      d.addEventListener("pointerdown",function(e){
        if(!LATCH) return;
        if(e.target.closest && (e.target.closest(".m2hero") || e.target.closest(".sx"))) return;
        LATCH=false; away(true);
      }, true);

      var card=d.querySelector(".m2hero"), box=d.querySelector(".sx");
      /* the CARD keeps pointerLEAVE only — the 140ms grace between marks is unchanged,
         and leaving the card still puts the panel away. It no longer opens anything. */
      if(card) card.addEventListener("pointerleave",release);
      [box].forEach(function(el){
        if(!el) return;
        el.addEventListener("pointerenter",hold);
        el.addEventListener("pointerleave",release);
      });
      /* keyboard is its own kind of active: focus holds it, leaving the six lets it go */
      Array.prototype.forEach.call(ul.children,function(li){
        li.addEventListener("focus",hold);
        li.addEventListener("blur",release);
      });

      if (DATA) render(d,0);   /* built, then put away — the page opens as it always did */
      away(true);
    }
    return true;
  }

  function uninstall(d){
    if(!d) return;
    var st=d.getElementById("__sixlive"); if(st) st.remove();
    var box=d.querySelector(".sx"); if(box) box.remove();
    var read=d.querySelector(".m2read");
    if(read) Array.prototype.forEach.call(read.children,function(c){ c.classList.remove("sx-hide"); });
    var ul=d.querySelector(".m2bface__marks");
    if(ul){ ul.classList.remove("sx-on"); delete ul.dataset.sx; }
  }

  root.SixLive = {
    data: function (d) { DATA = d; },
    kwcolor: function (m) { KWC = m; },
    install: install,
    uninstall: uninstall,
    ready: function () { return !!DATA; }
  };

  /* ★ SELF-INSTALL IN THE APP — the same promotion the membrane got at BR-S427.
     The builder has now reported this "not working" three times, and every time the
     answer was that it lives in the lab behind ?sx=1 while being discussed as shipped.
     That is not a communication problem to solve with a better sentence; it is a thing
     that should be ON THE SITE. Loaded from index.html the module installs itself
     against its own document; the lab keeps working because install() is exported and
     idempotent and the lab hands it the FRAME'S document instead. One module, two hosts.

     It waits for .m2bface__marks, which app.js writes at menu mount, and re-asserts on
     a slow tick because the app rebuilds .m2read on every mount and would otherwise
     drop the panel. ?sx=0 turns it off. */
  if (root.document && !root.frameElement) {
    /* ★★ THE BUG THE BUILDER SAW: THE PANEL OPENED EMPTY AND ATE THE COLUMN.
       install() only wires the DOM. The archive and the perk palette were fetched by
       the LAB (_palette-lab.html did SixLive.data() / .kwcolor()), and when the module
       was promoted to the app at BR-S430 nothing took that job over. So DATA stayed
       null, render() returned at its first line — but away(false) had already run, so
       the app's own three children were hidden behind a box with nothing in it.
       A blank column, which is worse than no feature, because the feature REMOVED
       something to show nothing. The module now loads its own data. */
    var base = "";
    try {
      var sc = root.document.currentScript
        || root.document.querySelector('script[src*="_six-live"]');
      if (sc) base = String(sc.getAttribute("src") || "").replace(/_six-live\.js.*$/, "");
    } catch (e) {}
    root.fetch(base + "codex-data.json").then(function (r) { return r.json(); })
      .then(function (d) { DATA = d; })
      .catch(function () {});
    root.fetch(base + "arcana-build/kwcolor.json").then(function (r) { return r.json(); })
      .then(function (m) { KWC = m; })
      .catch(function () {});

    var boot = function () {
      if (/[?&]sx=0/.test(String(root.location.search || ""))) return true;
      return install(root.document);
    };
    if (!boot()) {
      var n = 0, iv = root.setInterval(function () {
        if (boot() || ++n > 60) root.clearInterval(iv);
      }, 150);
    }
    /* the app rebuilds the menu on view changes; re-assert rather than trust one call */
    root.setInterval(function () {
      if (!/[?&]sx=0/.test(String(root.location.search || ""))) install(root.document);
    }, 700);
  }
})(window);
