/* ═══════════════════════════════════════════════════════════════════════════════
   M2 · THE CASES — the prototype bench.  `_m2-box.js`

   Two proposals for the same problem — put the M2 standing card in a case — mounted
   on the REAL main menu so they can be swapped in place and compared against each
   other and against the shipped menu. Behind `?case=`; without it this file does
   nothing at all: no stylesheet is fetched, no node is touched, no listener bound.

     ?case=1  /  ?case=box       THE CASE   — a frame, mat, copper aperture and pane
     ?case=vitrine               THE VITRINE — the GPT proposal: reveal wall, four
                                 trapezoid return walls, an overhead lamp, glass
     (no param)                  the menu exactly as it ships

   ★ WHY BOTH, WHEN ONE WAS ALREADY REVIEWED AND PREFERRED. The review's verdict on
   the vitrine was adopt-in-part, do-not-graft — and a verdict is not a thing anyone
   can look at. The two disagree about the single question neither could settle on
   paper (does the card LEAN inside the case, or sit SEATED behind glass), and about
   whether the box may light the card at all. Both questions are answered by looking,
   so both are switches on the bench.

   ★ WHY THE REAL MENU AND NOT A LAB PAGE. A standalone copy would drift the moment
   renderWall() changed, and "does the card still carry this panel from inside a box"
   cannot be answered next to a stand-in of the panel.

   ★ WHY NO renderWall() EDIT. Both cases are pure WRAPPERS plus decorative children
   that this module owns. The shipped render function is untouched, and deleting this
   file removes every prototype completely.

   ★ THE WRAP IS RE-APPLIED PER MOUNT. mountMenu() sets host.innerHTML — "clean state
   on (re)mount" by its own comment — which takes the wrapper with it every time.
   ═══════════════════════════════════════════════════════════════════════════════ */
(function (root) {
  "use strict";

  var q = String(root.location.search || "");
  var m = /[?&]case=([a-z0-9]+)/i.exec(q);
  if (!m) return;                                   // absent = this file is inert
  var arg = m[1].toLowerCase();
  if (arg === "0" || arg === "off") return;

  var doc = root.document;
  var MODE = (arg === "vitrine" || arg === "v") ? "vitrine" : "box";
  var wantCase = true;
  var wantLamp = (arg === "lamp");                  // box only — the removed lit layer
  var wantLap  = false;                             // box only — frame laps the card
  var wantGold = true;                              // vitrine only — as GPT authored it
  var wantSeat = true;                              // vitrine only — GPT says seated

  /* stylesheets are fetched only once a mode is actually wanted */
  function style(id, href) {
    if (doc.getElementById(id)) return;
    var l = doc.createElement("link");
    l.id = id; l.rel = "stylesheet"; l.href = href;
    (doc.head || doc.documentElement).appendChild(l);
  }
  function styles() {
    if (MODE === "box") style("m2box-css", "_m2-box.css?v=489");
    else style("m2vit-css", "_m2-vitrine.css?v=489");
  }

  function hero() { return doc.querySelector(".menu__draw-stage [data-m2-hero]"); }
  function shell() { return doc.querySelector(".m2box, .br-vitrine"); }

  function el(tag, cls) { var n = doc.createElement(tag); if (cls) n.className = cls; n.setAttribute("aria-hidden", "true"); return n; }

  function wrap() {
    var h = hero();
    if (!h || h.closest(".m2box, .br-vitrine")) return false;
    var box, inner;
    if (MODE === "box") {
      box = doc.createElement("div"); box.className = "m2box";
      inner = doc.createElement("div"); inner.className = "m2box__cavity";
    } else {
      box = doc.createElement("div"); box.className = "br-vitrine";
      inner = box;                                  // the vitrine is one grid cell
    }
    /* insertBefore at the hero's OWN position, never appendChild to the stage: the
       hero has siblings before it (the cap, the herosub) and after it (the flip), and
       the delegated menu handlers read that order. */
    h.parentNode.insertBefore(box, h);
    if (inner !== box) box.appendChild(inner);
    inner.appendChild(h);

    if (MODE === "vitrine") {
      /* the vitrine's own furniture. The lamp goes UNDER the card, the returns and the
         glass OVER it — z-index in the stylesheet, source order here only for clarity. */
      box.insertBefore(el("span", "br-vitrine__light"), h);
      ["top", "right", "bottom", "left"].forEach(function (side) {
        box.appendChild(el("span", "br-vitrine__return br-vitrine__return--" + side));
      });
      box.appendChild(el("span", "br-vitrine__glass"));
      wireGlass(box);
    }
    return true;
  }

  function unwrap() {
    var box = shell();
    if (!box) return;
    var h = box.querySelector("[data-m2-hero]");
    if (h) box.parentNode.insertBefore(h, box);     // back among its own siblings
    box.remove();
  }

  /* ── THE VITRINE'S GLASS FOLLOWS THE POINTER. ─────────────────────────────────
     The proposal's best novel idea. As authored it transitioned `background-position`
     on a ~495x601 layer and rewrote it on every pointermove — a main-thread paint
     property animated at pointer rate, with the transition restarted before it could
     ever reach its curve. Here it is two custom properties consumed by a transform,
     written at most once per frame, with no transition on the movement at all.
     Scoped to the prototype: the shipped tilt loop already computes smoothed values
     and could feed this for free, but that edits shipped code for an unadopted
     design, so the prototype carries its own listener and takes it away with it. */
  function wireGlass(box) {
    if (box._glassWired) return;
    box._glassWired = true;
    if (root.matchMedia && root.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var pending = false, px = 0, py = 0;
    box.addEventListener("pointermove", function (e) {
      var r = box.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width  - 0.5) * 2;
      py = ((e.clientY - r.top)  / r.height - 0.5) * 2;
      if (pending) return;
      pending = true;
      root.requestAnimationFrame(function () {
        pending = false;
        box.style.setProperty("--br-gx", px.toFixed(3));
        box.style.setProperty("--br-gy", py.toFixed(3));
      });
    }, { passive: true });
    box.addEventListener("pointerleave", function () {
      box.style.setProperty("--br-gx", "0");
      box.style.setProperty("--br-gy", "0");
    });
  }

  /* the box's lit layers exist ONLY while switched on — leaving them in the DOM with
     their rules off still hands the compositor two full-size layers to consider on the
     most expensive element on the page */
  function lamp(on) {
    var box = doc.querySelector(".m2box"), h = hero();
    if (!box || !h) return;
    box.classList.toggle("is-lamp", !!on);
    var fib = h.querySelector(".m2box__fibre"), lmp = h.querySelector(".m2box__lamp");
    if (on) {
      if (!fib) h.appendChild(el("span", "m2box__fibre"));
      if (!lmp) h.appendChild(el("span", "m2box__lamp"));
    } else {
      if (fib) fib.remove();
      if (lmp) lmp.remove();
    }
  }

  function apply() {
    if (!wantCase) { unwrap(); return; }
    wrap();
    var box = shell();
    if (!box) return;
    if (MODE === "box") { lamp(wantLamp); box.classList.toggle("is-lap", wantLap); }
    else { box.classList.toggle("is-gold", wantGold); box.classList.toggle("is-seated", wantSeat); }
  }

  /* ── THE BENCH. Prototype furniture: it says what it is, and it is the only way to
       A/B any of this without editing a URL and losing your scroll position. */
  function bench() {
    var b = doc.getElementById("m2boxBench");
    if (!b) { b = doc.createElement("div"); b.id = "m2boxBench"; b.className = "m2box-bench"; doc.body.appendChild(b); }
    var boxRows =
        '<label><input type="checkbox" data-mb="lamp"' + (wantLamp ? " checked" : "") + '> the lamp</label>'
      + '<label><input type="checkbox" data-mb="lap"' + (wantLap ? " checked" : "") + '> frame laps the card</label>'
      + '<i>The lamp is the original idea. Review removed it: multiply only darkens, '
      + 'and the card&rsquo;s faintest line is already at its floor.</i>';
    var vitRows =
        '<label><input type="checkbox" data-mb="gold"' + (wantGold ? " checked" : "") + '> gold stock</label>'
      + '<label><input type="checkbox" data-mb="seat"' + (wantSeat ? " checked" : "") + '> card seated (no lean)</label>'
      + '<i>Gold stock is as authored, and is why review would not ship it: the '
      + 'card&rsquo;s faintest line falls 4.41:1 &rarr; 2.82:1. Seated vs leaning is '
      + 'the one call only you can make.</i>';
    b.innerHTML =
        '<b>' + (MODE === "box" ? "The case" : "The vitrine") + ' &middot; prototype</b>'
      + '<label><input type="checkbox" data-mb="case"' + (wantCase ? " checked" : "") + '> in the case</label>'
      + '<label><input type="radio" name="mbmode" data-mb="mode" value="box"' + (MODE === "box" ? " checked" : "") + '> the case</label>'
      + '<label><input type="radio" name="mbmode" data-mb="mode" value="vitrine"' + (MODE === "vitrine" ? " checked" : "") + '> the vitrine</label>'
      + (MODE === "box" ? boxRows : vitRows);
    if (b._wired) return;
    b._wired = true;
    b.addEventListener("change", function (e) {
      var k = e.target.getAttribute && e.target.getAttribute("data-mb");
      if (!k) return;
      if (k === "mode") {
        if (e.target.value === MODE) return;
        unwrap();                       // take the old shell down before the new goes up
        MODE = e.target.value;
        styles(); bench(); apply();
        return;
      }
      if (k === "case") wantCase = e.target.checked;
      if (k === "lamp") wantLamp = e.target.checked;
      if (k === "lap")  wantLap  = e.target.checked;
      if (k === "gold") wantGold = e.target.checked;
      if (k === "seat") wantSeat = e.target.checked;
      apply();
    });
  }

  function boot() {
    styles(); bench(); apply();
    var host = doc.getElementById("menuView");
    if (host && root.MutationObserver) new root.MutationObserver(apply).observe(host, { childList: true });
  }

  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", boot);
  else boot();
})(window);
