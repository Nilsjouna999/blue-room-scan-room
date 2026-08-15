/* ═══════════════════════════════════════════════════════════════════════════════
   U1 — THE RACK, GRAFTED IN.  `_u1-rack.js`

   The design is `_u1-rack-lab.html` (BR-S479), which the builder chose. This is that
   lab moved into the page it was designed for, and nothing else: the mechanism, the
   constants, the six seats and the write memo are carried across unchanged, because
   the lab was already the argued-over version and re-deriving it here would only
   re-open decisions that were made once.

   BR-S484 — the builder: "transfer the u1 to its place although not finished product."
   Taken literally. This ships the rack into U1's empty middle without pretending the
   copy, the fixture, or the fit are finished.

   ★ WHAT HAD TO CHANGE, AND WHY — the four things a lab may do that a page may not.

   1. NO getElementById. The lab owned its whole document, so it addressed its parts by
      id. In the app those ids sit in a page that already has a `#crown`, a `#stack`
      and a `#bench` of other people's, and the first collision would not throw — it
      would silently drive the wrong node, which is the worst failure available. Every
      lookup here is scoped to the mounted root.
   2. NO :root CUSTOM PROPERTIES. The lab's palette was declared on :root and would have
      redefined the site's own tokens from a module the site does not know it loaded.
      Scoped to `.u1rack`.
   3. THE BENCH IS GONE. It is an instrument for reading the mechanism while building
      it, not part of the thing. Its `innerHTML` write also ran every single frame —
      the one uncomposited write in an otherwise transform-only engine.
   4. IT MOUNTS AGAINST A HOST THAT IS REBUILT UNDER IT. U1 is re-rendered on menu
      remounts, which takes the rack's whole subtree with it. So this ticks like
      `_rooms-u1.js` rather than installing once, and re-mounts when its node is gone.
      One scroll listener is bound for the life of the page and no-ops when unmounted,
      rather than being added and removed with each mount — that pairing is where
      listener leaks come from.

   ★ THE FIXTURE IS SHOWCASE DATA AND IS LABELLED AS SUCH IN THE MARKUP, NOT ONLY HERE.
   The six marks are a worked example, not the reader's own reading. The two claims the
   rack makes about provenance ("three read from the date · three drawn from the name
   and date", and that four marks make the name) are the CORRECTED ones — they match
   what BR-S484 shipped into the About copy, and they are true of the engine. Do not
   "tidy" either line into something rounder; both were wrong once and cost an audit.

   ?rk=0 turns it off.
   ═══════════════════════════════════════════════════════════════════════════════ */
(function (root) {
  "use strict";

  var CSS = ''
    /* Everything is scoped to .u1rack. The palette is the lab's, which is BR-S448's
       corrected blue under a warm plate — the same two grounds U1's header already
       sits on, so the graft does not introduce a third register. */
    + '.u1rack{--rk-paper:#12100d;--rk-blue:#0e1622;--rk-blue2:#070a10;--rk-ink:#d6cec1;'
    + '--rk-mk:#b9c3cf;--rk-rule:#2b3038;--rk-gold:#d8cfa8;--rk-dim:#8f877a;'
    + 'position:relative;height:420vh;height:420svh;color:var(--rk-ink)}'
    /* svh FIRST is not a fallback ordering nicety: mobile URL bars resize vh mid-scroll,
       which would re-derive the scroll fraction under the reader's own thumb. */
    + '.u1rack__vp{position:sticky;top:0;height:100vh;height:100svh;overflow:hidden}'

    /* THE GROUND — warm plate above the line, blue under below. The stop is HARD at
       62%: this is a threshold, not a blend. */
    + '.u1rack__ground{position:absolute;inset:0;background:linear-gradient(180deg,'
    + '#14110e 0%,#100d0b 61.999%,var(--rk-blue) 62%,var(--rk-blue2) 100%)}'

    /* Each ruled field lives in a static overflow:hidden clip and translates INSIDE it.
       The clips are compositor-side and are never written to. */
    + '.u1rack__clip{position:absolute;left:0;right:0;overflow:hidden}'
    + '.u1rack__clip--paper{top:0;height:62%}'
    + '.u1rack__clip--deep{top:62%;bottom:0}'
    + '.u1rack__field{position:absolute;left:0;right:0;top:-120px;height:calc(100% + 260px)}'
    /* PAPER — its period IS the shelf, so a plate lands exactly one ruling apart. */
    + '.u1rack__paper{background:repeating-linear-gradient(180deg,rgba(43,48,56,.30) 0 1px,transparent 1px var(--rk-Pp))}'
    /* DEEP A — full bleed, cooler and brighter: the water reads as the faster gear. */
    + '.u1rack__deepA{background:repeating-linear-gradient(180deg,rgba(150,175,205,.30) 0 1px,transparent 1px var(--rk-Pa))}'
    /* DEEP B — MARGIN TICKS ONLY. A second full-bleed field at a near period would moire
       against deep-A; confining it to the margins gives a second rate with nothing to
       beat against. The two periods are non-harmonic by construction. */
    + '.u1rack__deepB{background:repeating-linear-gradient(180deg,rgba(150,175,205,.20) 0 1px,transparent 1px var(--rk-Pb));'
    + '-webkit-mask-image:linear-gradient(90deg,#000 0 6%,transparent 6% 94%,#000 94% 100%);'
    + 'mask-image:linear-gradient(90deg,#000 0 6%,transparent 6% 94%,#000 94% 100%)}'

    /* THE THRESHOLD — the one white line. Everything is measured against it. */
    + '.u1rack__thresh{position:absolute;left:0;right:0;top:62%;height:1px;background:rgba(226,232,240,.92);opacity:.42}'
    /* THE OCCLUDER — opaque blue below the line, so a plate waiting under the water is
       genuinely not there. Static: zero writes. */
    + '.u1rack__under{position:absolute;left:0;right:0;top:calc(62% + 1px);bottom:0;'
    + 'background:linear-gradient(180deg,var(--rk-blue),var(--rk-blue2));z-index:6}'

    /* THE PINION — one long tooth per mark past a STATIONARY gold pointer. The pointer
       is a SIBLING, not a child, so the count is read against a fixed reference rather
       than against a rotating one. R is derived from H in measure(), never hardcoded:
       fixed at 612px it drew a dome across a short viewport instead of a gear below
       the waterline. */
    + '.u1rack__pinion{position:absolute;left:50%;top:102%;width:var(--rk-R2,612px);height:var(--rk-R2,612px);'
    + 'margin:calc(var(--rk-R2,612px) / -2) 0 0 calc(var(--rk-R2,612px) / -2);z-index:7}'
    + '.u1rack__pinion svg{width:100%;height:100%}'
    + '.u1rack__pinion circle{fill:none;stroke:rgba(150,175,205,.16)}'
    + '.u1rack__pinion line{stroke:rgba(150,175,205,.26)}'
    + '.u1rack__pointer{position:absolute;left:50%;width:2px;height:22px;margin-left:-1px;background:var(--rk-gold);z-index:8;opacity:.85}'

    /* THE BOW — the surface straining as a plate breaks the line. One pre-drawn path,
       origin at its bottom, one scaleY write. */
    + '.u1rack__bow{position:absolute;left:0;right:0;top:calc(62% - 26px);height:26px;z-index:5;transform-origin:50% 100%}'
    + '.u1rack__bow svg{width:100%;height:100%;display:block}'

    /* THE INTAKE leaves BY GEAR, not by fade — it rides the same shelf rate as the
       plates, so its last pixel exits exactly as the sixth mark seats. The question is
       pushed out by the answers. Zero opacity writes. */
    + '.u1rack__intake{position:absolute;left:0;right:0;top:0;height:55.8%;display:flex;flex-direction:column;'
    + 'align-items:center;justify-content:flex-end;padding-bottom:6.2%;text-align:center;z-index:3}'
    + '.u1rack__lbl{font:9px/1 var(--mono,ui-monospace,Menlo,Consolas,monospace);letter-spacing:.34em;color:var(--rk-dim);text-transform:uppercase}'
    + '.u1rack__val{font-size:clamp(30px,6vw,58px);margin:14px 0 0;color:var(--rk-ink)}'
    + '.u1rack__date{font-size:clamp(14px,2.2vw,20px);color:#a89f90;margin-top:14px;letter-spacing:.04em}'
    + '.u1rack__caret{display:inline-block;width:1px;height:.8em;background:var(--rk-gold);vertical-align:-.05em;margin-left:3px}'

    /* THE STACK — six plates. NO BORDER, NO RADIUS, NO SHADOW: a plate is a patch of the
       page with a ruled top edge, not an object lying on it. It is opaque because it
       must occlude its predecessor's second row during the close — covered, not faded,
       so the close needs zero opacity writes. */
    + '.u1rack__stack{position:absolute;inset:0;z-index:4}'
    + '.u1rack__bx{position:absolute;left:50%;width:min(52vw,520px);margin-left:min(-26vw,-260px);top:0;height:11.5%;'
    + 'background:var(--rk-paper);border-top:1px solid rgba(43,48,56,.9);transform-origin:50% 0;padding:8px 0 0}'
    + '.u1rack__strip{display:flex;align-items:baseline;gap:12px}'
    /* The type is DERIVED from H in measure(), not declared: set in fixed px against a
       plate measured as a fraction of H, the closed pitch sliced all six mark names
       through the middle on a short viewport. The CSS carries only the fallback. */
    + '.u1rack__slot{font:var(--rk-label,10px)/1 var(--mono,ui-monospace,Menlo,Consolas,monospace);letter-spacing:.22em;text-transform:uppercase;color:var(--rk-dim)}'
    + '.u1rack__name{font-size:var(--rk-nameSize,22px);color:var(--rk-mk);flex:1 1 auto}'
    /* The provenance tag is legible, and that is the point — rendered at 2.21:1 in an
       earlier lab, which means the honesty disclosure was not actually on the page. */
    + '.u1rack__from{font:var(--rk-label,10px)/1 var(--mono,ui-monospace,Menlo,Consolas,monospace);letter-spacing:.12em;color:#8a8275;text-transform:uppercase}'
    + '.u1rack__brule{height:1px;background:rgba(43,48,56,.9);margin:12px 0 8px;transform-origin:left}'
    + '.u1rack__kw{font:var(--rk-label,11px)/1.5 var(--mono,ui-monospace,Menlo,Consolas,monospace);letter-spacing:.1em;color:#8b93a0}'

    /* THE CROWN — revealed by a STATIC clip whose bottom edge is the closed stack's top
       edge, so it emerges top-of-letters first out of an edge made of the six. The
       translate is a percentage of the crown's OWN height, never a fraction of H: an
       H-derived offset is a fixed pixel count, and on a short viewport the crown block
       is taller than that, which left gold text sitting behind the plates for the whole
       rack. translateY(100%) is self-relative by definition. */
    + '.u1rack__crownwrap{position:absolute;left:0;right:0;top:14.1%;height:20%;overflow:hidden;z-index:3;'
    + 'display:flex;align-items:flex-end;justify-content:center}'
    + '.u1rack__crown{text-align:center;padding-bottom:10px}'
    + '.u1rack__k{font:9px/1 var(--mono,ui-monospace,Menlo,Consolas,monospace);letter-spacing:.34em;color:var(--rk-dim);text-transform:uppercase}'
    + '.u1rack__n{font-size:clamp(26px,5vw,50px);color:var(--rk-gold);margin:14px 0 0}'
    + '.u1rack__b{font-size:clamp(13px,1.8vw,17px);color:#9d9484;margin-top:10px;font-style:italic}'

    /* The one permanent line in the empty blue — stated once, never animated, present in
       every screenshot of the payoff. */
    + '.u1rack__prov{position:absolute;left:0;right:0;top:70%;text-align:center;'
    + 'font:11px/1 var(--mono,ui-monospace,Menlo,Consolas,monospace);letter-spacing:.18em;color:#5d6b7e;z-index:7}'
    /* The example marker. The rack shows a worked example, and a page that shows one
       person's marks at this size without saying so is showing the reader a reading. */
    + '.u1rack__ex{position:absolute;left:0;right:0;top:4%;text-align:center;'
    + 'font:9px/1 var(--mono,ui-monospace,Menlo,Consolas,monospace);letter-spacing:.28em;'
    + 'text-transform:uppercase;color:#6d6559;z-index:7}';

  /* ── THE FIXTURE. Derived against the shipped engine. The card renders VALUES, not
       slot labels, and provenance is stated per mark: sun from the date, animal from the
       year, life path from the digit sum; rune, trigram and hexagram are a hash of name
       and date. "Looked up, not invented" is FALSE for three of six and must never
       appear here — that exact sentence is what docs/CLAIM_AUDIT_V1.md exists for. ── */
  var SIX = [
    { slot: "Sun sign",    name: "Leo",          from: "from the date",       kw: "confident · generous · dramatic · proud · creative" },
    { slot: "Year animal", name: "Snake",        from: "from the year",       kw: "wise · intuitive · private · watchful · restraint" },
    { slot: "Life path",   name: "9",            from: "from the digits",     kw: "compassion · completion · idealism · letting go" },
    { slot: "Rune",        name: "Raidho",       from: "drawn · name + date", kw: "journey · movement · rhythm · right action" },
    { slot: "Trigram",     name: "☱ Duì · Lake", from: "drawn · name + date", kw: "joy · openness · exchange · youngest daughter" },
    { slot: "Hexagram",    name: "7 · The Army", from: "drawn · name + date", kw: "discipline · organisation · the led and the leading" }
  ];
  var NAME = "John Bon", BORN = "born 26 July 1965";

  /* ── CONSTANTS, as fractions of the LOCKED viewport height. Captured once in
       measure(); never read in the handler. ─────────────────────────────────────── */
  var F = {
    THRESH: 0.620,   // the white line
    SHELF:  0.093,   // open pitch — one notch above the line, == the paper period
    CLOSE:  0.0465,  // closed pitch = SHELF/2, so the closed stack stays in register
    DEEP:   0.300,   // one notch below the line
    ZFAR:   0.550,   // depth at which a plate waits under the water
    PERSP:  1.278,   // -> projected scale 0.699 at ZFAR
    Pp:     0.093,   // paper period  (== SHELF)
    Pa:     0.104,   // deep-A period
    Pb:     0.067,   // deep-B period — non-harmonic against Pa by construction
    RATE_A: 0.300,   // deep-A travel per mark  -> 0.74x scroll
    RATE_B: 0.132    // deep-B travel per mark
  };
  var EMERGE = 1.237;   // = plate height / SHELF — notches from the line to fully clear

  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function win(p, a, b) { return clamp01((p - a) / (b - a)); }
  function eo(t) { return 1 - Math.pow(1 - t, 3); }
  /* a repeating gradient is identical under translation by whole periods, so the
     translate is taken modulo its own period: the numbers stay under 100px instead of
     running to -1900, and the clip needs no headroom. Visually exact. */
  function wrap(v, p) { return ((v % p) + p) % p; }

  function MARKUP() {
    var teeth = "", i, a, x1, y1, x2, y2, r2;
    for (i = 0; i < 24; i++) {          // 24 teeth = 15deg pitch; 60deg = one long tooth per mark
      a = (i / 24) * Math.PI * 2 - Math.PI / 2;
      r2 = (i % 4 === 0) ? 272 : 284;
      x1 = (306 + Math.cos(a) * 300).toFixed(1); y1 = (306 + Math.sin(a) * 300).toFixed(1);
      x2 = (306 + Math.cos(a) * r2).toFixed(1);  y2 = (306 + Math.sin(a) * r2).toFixed(1);
      teeth += '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"></line>';
    }
    var bx = SIX.map(function (m) {
      return '<div class="u1rack__bx">'
        + '<div class="u1rack__strip"><span class="u1rack__slot">' + m.slot + '</span>'
        + '<span class="u1rack__name">' + m.name + '</span>'
        + '<span class="u1rack__from">' + m.from + '</span></div>'
        + '<div class="u1rack__brule"></div><div class="u1rack__kw">' + m.kw + '</div></div>';
    }).join("");

    return '<div class="u1rack" data-u1rack aria-label="How a birth reading is assembled">'
      + '<div class="u1rack__vp" data-vp>'
      +   '<div class="u1rack__ground"></div>'
      +   '<div class="u1rack__clip u1rack__clip--paper"><div class="u1rack__field u1rack__paper" data-paper></div></div>'
      +   '<div class="u1rack__clip u1rack__clip--deep"><div class="u1rack__field u1rack__deepA" data-deepa></div></div>'
      +   '<div class="u1rack__clip u1rack__clip--deep"><div class="u1rack__field u1rack__deepB" data-deepb></div></div>'
      +   '<div class="u1rack__bow" data-bow><svg viewBox="0 0 1000 26" preserveAspectRatio="none" aria-hidden="true">'
      +     '<path d="M0 26 Q 500 0 1000 26" fill="none" stroke="rgba(226,232,240,.30)" stroke-width="1"/></svg></div>'
      +   '<div class="u1rack__thresh" data-thresh></div>'
      +   '<p class="u1rack__ex">A worked example</p>'
      +   '<div class="u1rack__intake" data-intake>'
      +     '<div class="u1rack__lbl">The reading is taken from</div>'
      +     '<p class="u1rack__val"><span data-nm></span><span class="u1rack__caret" data-caret></span></p>'
      +     '<p class="u1rack__date" data-dt></p>'
      +   '</div>'
      +   '<div class="u1rack__crownwrap"><div class="u1rack__crown" data-crown>'
      /* This read "And the name it makes", standing over a stack of SIX and asserting
         the six make the crown. The engine reads four. Naming the four is not a
         defence, it is the fact. */
      +     '<div class="u1rack__k">Sun · animal · rune · trigram make the name</div>'
      +     '<p class="u1rack__n">The Twice-Kindled Wayfarer</p>'
      +     '<p class="u1rack__b">bound in open water</p>'
      +   '</div></div>'
      +   '<div class="u1rack__stack" data-stack>' + bx + '</div>'
      +   '<div class="u1rack__under"></div>'
      +   '<p class="u1rack__prov">three read from the date · three drawn from the name and date</p>'
      +   '<div class="u1rack__pinion" data-pinion><svg viewBox="0 0 612 612" aria-hidden="true">'
      +     '<circle cx="306" cy="306" r="300"></circle><circle cx="306" cy="306" r="286"></circle>'
      +     '<g>' + teeth + '</g></svg></div>'
      +   '<div class="u1rack__pointer" data-pointer></div>'
      + '</div></div>';
  }

  /* ── THE WRITE MEMO. Every write compares against its cached last value. This does NOT
       break determinism: the memo decides WHETHER a write is issued, never WHAT value is
       computed, and it initialises empty — so a cold load at any scroll position renders
       the identical frame. Said plainly, because a later pass will otherwise delete it
       on principle. ───────────────────────────────────────────────────────────────── */
  var memo = (typeof WeakMap === "function") ? new WeakMap() : null;
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
  function px(v) { return ((v * DPR) | 0) / DPR; }          // integer device pixels
  function ty(v) { return "translate3d(0," + px(v) + "px,0)"; }

  /* will-change is ARMED AND CLEARED BY ARITHMETIC, never by an animationend handler —
     that is the exact leak the house law names, a hint left set for a whole session on
     an animation that never ran. Each flips only on its edge. */
  var armed = { ground: null, stack: null, crown: null };
  function arm(key, want, nodes, hint) {
    if (armed[key] === want) return;
    armed[key] = want;
    for (var i = 0; i < nodes.length; i++) nodes[i].style.willChange = want ? hint : "";
  }

  var el = null, plates = null, M = { H: 900, top: 0, span: 1 }, C = {}, curP = 0;
  var dirty = false;
  var REDUCED = root.matchMedia && root.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* the scroll fraction, derived fresh. Every caller reads THIS rather than the cached
     curP — see the note in measure() about what happens when a resize repaints at a
     fraction computed under the previous viewport. */
  function scrollP() {
    return clamp01(((root.scrollY || root.pageYOffset || 0) - M.top) / M.span);
  }

  function measure() {
    if (!el) return;
    /* ★★ BR-S488 — NEVER MEASURE A RACK THAT IS NOT LAID OUT. This is the defect an
       audit found and it was the worst thing in the module: U1 is inside `.menu`, and
       the menu is display:none in room and dev views, and `#about` itself is hidden
       while the reliquary panel is open. Any of those boots the module against a node
       whose offsetHeight is 0 — so span collapsed to Math.max(1, -H) = 1, and p became
       1 for any scroll past a single pixel. The rack then stood permanently at its
       final payoff frame: every plate seated, the crown up, the whole scroll spent
       before the reader arrived. And because mount() returns early once the box is
       standing, nothing ever measured it again — only a real window resize recovered
       it, for the rest of the session.
       Measuring is now refused rather than fudged, and the refusal is remembered so
       the reveal path can re-enter. */
    if (!el.rack.offsetHeight) { dirty = true; return; }
    dirty = false;
    var r = el.rack.getBoundingClientRect();
    M.top  = r.top + (root.scrollY || root.pageYOffset || 0);
    M.H    = el.vp.clientHeight || root.innerHeight;
    M.span = Math.max(1, el.rack.offsetHeight - M.H);
    for (var k in F) C[k] = F[k] * M.H;
    /* the ruled periods are written as custom properties ONCE, here — the fields are
       static paint after this and only ever receive a transform. */
    el.paper.style.setProperty("--rk-Pp", C.Pp + "px");
    el.deepA.style.setProperty("--rk-Pa", C.Pa + "px");
    el.deepB.style.setProperty("--rk-Pb", C.Pb + "px");
    el.pinion.style.setProperty("--rk-R2", (2 * 0.340 * M.H) + "px");
    el.pointer.style.top = (1.02 * M.H - 0.340 * M.H) + "px";
    /* BR-S488: floors. Every other size in this file is a clamp(); these two were bare
       fractions of H, so a 700px viewport put the slot label at 7.8px and a 400px one
       at 4.4px — a legend nobody can read, on the row that carries the provenance. */
    el.stack.style.setProperty("--rk-nameSize", Math.max(13, 0.0244 * M.H).toFixed(2) + "px");
    el.stack.style.setProperty("--rk-label",    Math.max(9,  0.0111 * M.H).toFixed(2) + "px");
    DPR = root.devicePixelRatio || 1;
    if (typeof WeakMap === "function") memo = new WeakMap();   // geometry changed: every cached write is stale
    lastP = -1;                                                // and so is the loop's cached fraction
    /* BR-S488: repaint at the fraction the reader is ACTUALLY at, not the cached one.
       curP is only ever written inside draw(), so measuring after a resize used to
       repaint the frame computed under the OLD viewport and hold it until the next
       real scroll event. */
    draw(scrollP());
  }

  function draw(p) {
    if (!el) return;
    curP = p;

    /* THE TWO SCALARS. A is the tooth count, monotone 0 -> 7; the seventh tooth is the
       crown, which is why THE PINION NEVER STOPS — freezing the gear train during the
       payoff is what made an earlier build read as a video that had ended. */
    var Arack = win(p, 0.100, 0.860) * 6;
    var A     = Arack + win(p, 0.860, 0.985);
    var AG    = win(p, 0.000, 0.100) * 0.6 + A;      // the water moves from p=0

    /* THE GROUND. Three planes, three rates, one scalar. Above the line 0.23x scroll,
       below it 0.74x — the same 1px hairline at two visibly different speeds either side
       of one visible edge, comparable in a single frame. That is the whole thesis, and
       it is four transform writes.
       Under REDUCED the ground is rigid AS A WHOLE. Freezing only the two deep fields
       inverted the thesis: the water went slower than the paper, and the readers least
       tolerant of drift got the one guaranteed moving plane with nothing faster in frame
       to explain it. */
    var rate = REDUCED ? 0 : 1;
    setT(el.paper, ty(-wrap(Arack * C.Pp * rate, C.Pp)));
    setT(el.deepA, ty(-wrap(AG * C.RATE_A * rate, C.Pa)));
    setT(el.deepB, ty(-wrap(AG * C.RATE_B * rate, C.Pb)));
    setT(el.pinion, REDUCED ? "rotate(0deg)" : "rotate(" + (A * 60).toFixed(2) + "deg)");

    /* THE BOW peaks on the fractional part of the tooth, so it is a consequence of the
       gear rather than a second timeline. A hairline bending a few px — the surface
       taking weight, not an arch drawn across the room. */
    var frac = A - Math.floor(A);
    var bow  = (A > 0 && A < 6.02 && !REDUCED) ? Math.sin(frac * Math.PI) : 0;
    setT(el.bow, "scaleY(" + (0.12 + bow * 0.28).toFixed(3) + ")");

    /* THE INTAKE leaves BY GEAR: the same shelf rate as the plates, so its last pixel
       exits exactly as the sixth mark seats. Clearance to plate 0 is constant at every
       A, so they can never collide. Zero opacity writes on the block itself. */
    var tn = win(p, 0.000, 0.058), td = win(p, 0.058, 0.100);
    var n1 = NAME.slice(0, Math.round(tn * NAME.length));
    var n2 = BORN.slice(0, Math.round(td * BORN.length));
    if (el.nm.textContent !== n1) el.nm.textContent = n1;      // char-guarded
    if (el.dt.textContent !== n2) el.dt.textContent = n2;
    setO(el.caret, (p > 0.004 && p < 0.104) ? "0.9" : "0");
    setT(el.intake, ty(-Arack * C.SHELF));

    /* THE PLATES. PITCH is the only thing the close changes: the six gather from one
       notch to a half notch, still in register with the ruling, and the paper field
       LOCKS while the water runs on. The ratio goes 3.23:1 to infinity, and that is the
       readable event — the reading is fixed, the source keeps moving. */
    var PITCH = C.SHELF - (C.SHELF - C.CLOSE) * eo(win(p, 0.860, 0.960));
    for (var i = 0; i < 6; i++) {
      var v    = Arack - i;
      var yTop = C.THRESH - (v <= 0 ? v * C.DEEP : v * PITCH);
      /* DEPTH: a plate arrives 0.699x wide at the line and WIDENS to full as it rises.
         A thing that gets bigger as it emerges came from behind; a thing that keeps its
         width slid up a slot. transform-origin is the plate's TOP EDGE, so the edge
         lands exactly on its ruling at every scale with no pre-compensation. */
      var zt = REDUCED ? 1 : eo(clamp01(v / EMERGE));
      var s  = C.PERSP / (C.PERSP + C.ZFAR * (1 - zt));
      setT(plates[i].el, ty(yTop) + " scale(" + s.toFixed(4) + ")");
      /* the inner rule draws on the same beat the plate rises — one gear, two hands.
         All three branches are written every frame: with no case for the low range the
         rule kept whatever was last written, so scrolling back up left it stranded
         mid-draw while a cold load at the same position showed it fully drawn. Three
         renderings of one scroll position, in an engine that claims determinism. */
      if (v > 0.2 && v < 1.1) setT(plates[i].rule, "scaleX(" + eo(win(v, 0.35, 0.90)).toFixed(3) + ")");
      else if (v >= 1.1)      setT(plates[i].rule, "scaleX(1)");
      else                    setT(plates[i].rule, "scaleX(0)");
    }

    /* THE CROWN climbs out of the stack's own top edge through a static clip. */
    var c = eo(win(p, 0.940, 0.985));
    setT(el.crown, "translate3d(0," + ((1 - c) * 100).toFixed(2) + "%,0)");
    setO(el.thresh, (0.42 + 0.43 * c).toFixed(3));

    arm("ground", p > 0.001 && p < 0.995, [el.paper, el.deepA, el.deepB, el.pinion], "transform");
    arm("stack",  p > 0.080 && p < 0.995, plates.map(function (q) { return q.el; }).concat([el.intake]), "transform");
    arm("crown",  p > 0.920, [el.crown], "transform");
  }

  /* ── MOUNT. U1 is re-rendered on menu remounts, which takes this whole subtree with
       it, so mounting is a tick rather than a one-shot install. The rack goes between
       U1's header and its footer — the empty middle it was designed for. ─────────── */
  function mount(d) {
    var about = d && d.getElementById("about");
    if (!about) { el = null; plates = null; return false; }
    if (about.querySelector("[data-u1rack]")) return true;      // already standing

    var foot = about.querySelector(".u1foot");
    var host = d.createElement("div");
    host.innerHTML = MARKUP();
    var node = host.firstChild;
    if (foot) about.insertBefore(node, foot); else about.appendChild(node);

    var q = function (sel) { return node.querySelector(sel); };
    el = {
      rack: node, vp: q("[data-vp]"),
      paper: q("[data-paper]"), deepA: q("[data-deepa]"), deepB: q("[data-deepb]"),
      bow: q("[data-bow]"), thresh: q("[data-thresh]"), pinion: q("[data-pinion]"),
      pointer: q("[data-pointer]"), intake: q("[data-intake]"), stack: q("[data-stack]"),
      crown: q("[data-crown]"), nm: q("[data-nm]"), dt: q("[data-dt]"), caret: q("[data-caret]")
    };
    plates = [].map.call(node.querySelectorAll(".u1rack__bx"), function (b) {
      return { el: b, rule: b.querySelector(".u1rack__brule") };
    });
    armed = { ground: null, stack: null, crown: null };
    if (typeof WeakMap === "function") memo = new WeakMap();
    measure();
    /* the visibility watch is re-pointed per mount, because a remount hands us a new
       rack node and an observer still watching the old one watches nothing */
    watchVisibility();
    return true;
  }

  function style(d) {
    if (d.getElementById("u1rack-css")) return;
    var s = d.createElement("style");
    s.id = "u1rack-css";
    s.textContent = CSS;
    (d.head || d.documentElement).appendChild(s);
  }

  /* ONE scroll listener for the life of the page, no-opping when unmounted. Binding and
     unbinding it alongside each mount is where listener leaks come from, and this host
     remounts often. scrollY is read at FRAME TIME inside the rAF, never at event time,
     so a coalesced burst still paints the position the reader is actually at. */
  var ticking = false;
  function onScroll() {
    if (ticking || !el) return;
    ticking = true;
    root.requestAnimationFrame(function () {
      ticking = false;
      if (!el) return;
      draw(scrollP());
    });
  }

  /* ── THE DRIVE. ───────────────────────────────────────────────────────────────────
     BR-S488. The module was driven purely by scroll EVENTS, and a measured check found
     a fresh window-scroll listener receiving zero of them while the scroll offset was
     plainly changing — so the rack stood at one frame no matter where the reader was.
     Binding the document in capture did not recover it either.

     Rather than keep guessing which node dispatches, the drive no longer depends on an
     event at all: while the rack is ON SCREEN a rAF loop reads the scroll offset each
     frame, and while it is off screen there is no loop. An IntersectionObserver decides
     which. That is the standard shape for a scroll-linked effect that has to be right,
     and it costs nothing when the rack is not being looked at — which is the whole
     budget this module was written to respect.

     The events stay bound as well. They are not the drive any more, but when they DO
     fire they update the frame a few milliseconds sooner, and draw() writes only what
     changed, so the pair collapses to one write per frame. */
  /* ★ onScreen STARTS TRUE, and the observer's job is to turn it OFF.
     Written the other way round — false until an observer says otherwise — a silent
     IntersectionObserver leaves the loop permanently unstarted and the rack frozen at
     one frame, which is the exact failure this whole block exists to remove. Starting
     true costs an idle rAF on a page where the observer never reports; starting false
     costs the feature. Fail toward working. */
  var io = null, rafId = 0, onScreen = true, lastP = -1;

  function frame() {
    rafId = 0;
    if (!el || !onScreen) return;
    var p = scrollP();
    if (p !== lastP) { lastP = p; draw(p); }
    rafId = root.requestAnimationFrame(frame);
  }
  function startLoop() { if (!rafId && onScreen && el) rafId = root.requestAnimationFrame(frame); }
  function stopLoop() { if (rafId) { root.cancelAnimationFrame(rafId); rafId = 0; } }

  function watchVisibility() {
    onScreen = true;
    startLoop();                                  // run first, refine second
    if (!el || !root.IntersectionObserver) return;
    if (io) io.disconnect();
    io = new root.IntersectionObserver(function (entries) {
      onScreen = entries[entries.length - 1].isIntersecting;
      if (onScreen) { measureIfDirty(); startLoop(); } else stopLoop();
    }, { rootMargin: "120px 0px" });
    io.observe(el.rack);
  }
  function measureIfDirty() { if (dirty) measure(); }

  var wired = false;
  function wire() {
    if (wired) return;
    wired = true;
    /* ★★ BR-S488 — BIND ON THE DOCUMENT, IN CAPTURE, NOT JUST ON THE WINDOW.
       `window` only receives scroll from the VIEWPORT scroller. This app gives <body>
       its own `overflow-y: auto`, so depending on how the browser resolves that, the
       scroll event can target the element and never reach the window at all — and a
       measured check here found a fresh window-scroll listener receiving exactly zero
       events while the scroll offset was plainly changing.
       Scroll does not bubble, but it DOES capture, so a capture listener on the
       document sees it wherever it fires. Both are bound: the window for the ordinary
       case, the document for the element-scroller case, and onScroll's own rAF gate
       collapses the pair to one draw per frame when both deliver.
       ★ AND THIS IS WHY BR-S485's VERIFICATION PASSED WHILE THE FEATURE DID NOT WORK.
       That pass proved the engine computes the right frame when it is CALLED — it
       dispatched events and called tick() by hand. It never established that real
       scrolling calls it. Proving the arithmetic is not proving the wiring. */
    root.addEventListener("scroll", onScroll, { passive: true });
    if (root.document) root.document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    var rz = false;
    root.addEventListener("resize", function () {
      if (rz || !el) return;
      rz = true;
      root.requestAnimationFrame(function () { rz = false; measure(); });
    });
    /* ★ BR-S488 — THE INVALIDATION SET WAS INCOMPLETE, AND app.js ALREADY KNEW.
       The identical cached-geometry pattern elsewhere in this repo invalidates on
       resize, LOAD and a menu remount, and says so in its own comment; this module
       reproduced the pattern and kept only the first. Load matters here specifically:
       the page loads its display serif with `display=swap`, so the webfont lands
       AFTER the first measure and reflows the very column being measured. */
    root.addEventListener("load", measure);
    var d = root.document;
    if (d && d.fonts && d.fonts.ready && d.fonts.ready.then) d.fonts.ready.then(function () { measure(); });
    if (root.matchMedia) {
      var mq = root.matchMedia("(prefers-reduced-motion: reduce)");
      var onMQ = function (e) {
        REDUCED = e.matches;
        if (typeof WeakMap === "function") memo = new WeakMap();
        draw(curP);
      };
      if (mq.addEventListener) mq.addEventListener("change", onMQ); else if (mq.addListener) mq.addListener(onMQ);
    }
  }

  /* ?rkp=0.62 jumps to a scroll fraction. The lab had this and it is the only way to
     look at one frame of a 3000px scroll — including in a headless capture, which
     cannot scroll. It runs ONCE, on the tick that first stands the rack up, so it
     cannot fight the reader for the scrollbar afterwards. */
  var jumped = false;
  function jump() {
    if (jumped || !el) return;
    jumped = true;
    var m = /[?&]rkp=([0-9.]+)/.exec(String(root.location.search || ""));
    if (m) root.scrollTo(0, M.top + clamp01(parseFloat(m[1])) * M.span);
  }

  root.U1Rack = {
    tick: function (d) {
      if (!d) return false;
      style(d);
      var ok = mount(d);
      /* BR-S488: a rack that refused to measure because it was hidden must be re-entered
         when it is revealed. mount() returns early once the box is standing, so without
         this the refusal was permanent. */
      if (ok && dirty) measure();
      if (ok) { wire(); jump(); onScroll(); }
      return ok;
    }
  };

  /* ── SELF-INSTALL. ────────────────────────────────────────────────────────────────
     BR-S488: this was a 400ms interval with no clearInterval, running for the life of
     every page — including `?dev=` routes where U1 never exists at all. It is now three
     narrower signals, each matched to the thing it is actually waiting for:
       · a SHORT poll, only until the menu first exists (boot timing), then cancelled
       · a childList observer on the menu host, because a remount replaces the whole
         subtree and takes the rack with it
       · an attribute observer on the menu itself, because the panel that hides `#about`
         does it with a class — which no childList change would ever report, and which
         is precisely the path that used to leave the rack measured at zero forever */
  if (root.document && !root.frameElement) {
    var off = function () { return /[?&]rk=0/.test(String(root.location.search || "")); };
    var host = root.document.getElementById("menuView");
    var poll = root.setInterval(function () {
      if (off()) return;
      /* mounted is not enough — a rack that mounted while hidden has not been MEASURED,
         and stopping here would retire the poll in exactly the state it exists to escape */
      if (root.U1Rack.tick(root.document) && !dirty) { root.clearInterval(poll); poll = null; }
    }, 400);
    /* a page with no menu at all should not poll forever waiting for one */
    root.setTimeout(function () { if (poll) { root.clearInterval(poll); poll = null; } }, 8000);
    if (root.MutationObserver) {
      var re = function () { if (!off()) root.U1Rack.tick(root.document); };
      /* the host's children are replaced wholesale on a remount, which takes the rack
         with it and needs a fresh mount */
      if (host) new root.MutationObserver(re).observe(host, { childList: true });
      /* ★ AND THE VIEW ATTRIBUTE, which is the signal that was missing and cost a round.
         Leaving the room for the menu does NOT remount anything and does NOT touch the
         menu's class — it flips one attribute on <body>, and the CSS visibility matrix
         does the rest. So a rack that correctly refused to measure while hidden had no
         way to learn it had been revealed, and stayed blank until something else
         happened to tick it. Watch the attribute that actually changes. */
      new root.MutationObserver(re).observe(root.document.documentElement, {
        attributes: true, attributeFilter: ["data-view"], subtree: true
      });
      var menu = root.document.querySelector(".menu");
      if (menu) new root.MutationObserver(re).observe(menu, { attributes: true, attributeFilter: ["class"] });
    }
  }
})(window);
