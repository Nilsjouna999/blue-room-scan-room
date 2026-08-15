/* ═══════════════════════════════════════════════════════════════════════════════
   M2 · THE WALL UNDER GLASS — the prototype.  `_m2-box.js`

   The builder handed over a design for putting the M2 standing card inside a glass
   display case. This mounts it on the REAL main menu, behind `?case=1`, so it can be
   judged in place instead of in a screenshot. Without the parameter this file does
   nothing at all: no CSS is fetched, no node is touched, no observer is bound.

   ★ WHY THE REAL MENU AND NOT A LAB PAGE. A standalone copy of the menu would be a
   copy — it would drift the moment renderWall() changed, and the one question worth
   asking here ("does the card still carry this panel from inside a box") cannot be
   answered next to a stand-in of the panel. Same discipline as the ROOMS sheet,
   which clones the real doors rather than re-implementing them.

   ★ WHY NO renderWall() EDIT. The review deleted the design's two lit layers, and
   that had a structural payoff: with no new children the markup change is a PURE
   WRAPPER, and a wrapper can be applied from outside. So the shipped render function
   is untouched and removing this file removes the prototype completely.

   ★ THE WRAP IS RE-APPLIED PER MOUNT, NOT ONCE. mountMenu() sets host.innerHTML and
   its own comment calls that "clean state on (re)mount" — which takes the wrapper
   with it every time. An observer re-applies it; the work is one querySelector and
   an early return once the box is standing.

   ★ THE LAMP SWITCH IS THE POINT OF THE BENCH. The review removed the design's
   central idea — a multiply layer meant to LIGHT the card — because multiply can
   only darken and the card's weakest ink is already at its contrast floor. Every
   figure behind that was COMPUTED from declared hex, never sampled from a paint.
   It is the builder's own idea and the arithmetic is not the same thing as looking,
   so the lamp ships here as a switch that is off by default. Turn it on, look at
   the card, and decide.

   ?case=1        the case, as reviewed
   ?case=lamp     the case with the original lamp already on
   (no param)     the menu exactly as it ships
   ═══════════════════════════════════════════════════════════════════════════════ */
(function (root) {
  "use strict";

  var q = String(root.location.search || "");
  var m = /[?&]case=([a-z0-9]+)/i.exec(q);
  if (!m) return;                                   // absent = this file is inert
  var MODE = m[1].toLowerCase();
  if (MODE === "0" || MODE === "off") return;

  var doc = root.document;
  var wantLamp = (MODE === "lamp");
  var wantCase = true;

  /* the stylesheet is fetched only once we know we are wanted — a prototype should
     not cost a request on a page that is not running it. */
  function style() {
    if (doc.getElementById("m2box-css")) return;
    var l = doc.createElement("link");
    l.id = "m2box-css";
    l.rel = "stylesheet";
    l.href = "_m2-box.css?v=487";
    (doc.head || doc.documentElement).appendChild(l);
  }

  function hero() { return doc.querySelector(".menu__draw-stage [data-m2-hero]"); }

  function wrap() {
    var h = hero();
    if (!h || h.closest(".m2box")) return false;
    var box = doc.createElement("div");
    box.className = "m2box";
    var cav = doc.createElement("div");
    cav.className = "m2box__cavity";
    /* insertBefore at the hero's own position, NOT appendChild to the stage: the
       hero has siblings before it (the cap, the herosub) and after it (the flip),
       and the delegated menu handlers read that order. Moving it to the end would
       leave every one of them pointing at the wrong thing. */
    h.parentNode.insertBefore(box, h);
    box.appendChild(cav);
    cav.appendChild(h);
    return true;
  }

  function unwrap() {
    var box = doc.querySelector(".m2box");
    if (!box) return;
    var h = box.querySelector("[data-m2-hero]");
    if (h) box.parentNode.insertBefore(h, box);     // back to its own place among the siblings
    box.remove();
  }

  /* the lamp's two spans exist ONLY while it is on. Leaving them in the DOM with
     their rules switched off would still hand the compositor two full-size layers
     to consider on a card that is already the most expensive thing on the page. */
  function lamp(on) {
    var box = doc.querySelector(".m2box");
    var h = hero();
    if (!box || !h) return;
    box.classList.toggle("is-lamp", !!on);
    var fib = h.querySelector(".m2box__fibre");
    var lmp = h.querySelector(".m2box__lamp");
    if (on) {
      if (!fib) { fib = doc.createElement("span"); fib.className = "m2box__fibre"; fib.setAttribute("aria-hidden", "true"); h.appendChild(fib); }
      if (!lmp) { lmp = doc.createElement("span"); lmp.className = "m2box__lamp";  lmp.setAttribute("aria-hidden", "true"); h.appendChild(lmp); }
    } else {
      if (fib) fib.remove();
      if (lmp) lmp.remove();
    }
  }

  function apply() {
    if (wantCase) { wrap(); lamp(wantLamp); }
    else unwrap();
  }

  /* ── THE BENCH. Prototype furniture: it says what it is, and it is the only way to
       A/B the thing without editing a URL and losing your scroll position. */
  function bench() {
    if (doc.getElementById("m2boxBench")) return;
    var b = doc.createElement("div");
    b.id = "m2boxBench";
    b.className = "m2box-bench";
    b.innerHTML =
      '<b>The case &middot; prototype</b>'
      + '<label><input type="checkbox" data-mb="case" checked> in the case</label>'
      + '<label><input type="checkbox" data-mb="lamp"' + (wantLamp ? " checked" : "") + '> the lamp</label>'
      + '<label><input type="checkbox" data-mb="lap"> frame laps the card</label>'
      + '<i>The lamp is the original idea. Review removed it: multiply only darkens, '
      + 'and the card&rsquo;s faintest line is already at its floor. Judge it yourself.</i>';
    doc.body.appendChild(b);
    b.addEventListener("change", function (e) {
      var k = e.target.getAttribute && e.target.getAttribute("data-mb");
      if (!k) return;
      if (k === "case") wantCase = e.target.checked;
      if (k === "lamp") wantLamp = e.target.checked;
      /* the lap is a pure class — no nodes to build, so it does not go through apply() */
      if (k === "lap") { var bx = doc.querySelector(".m2box"); if (bx) bx.classList.toggle("is-lap", e.target.checked); }
      apply();
    });
  }

  function boot() {
    style();
    bench();
    apply();
    var host = doc.getElementById("menuView");
    if (host && root.MutationObserver) {
      new root.MutationObserver(function () { apply(); }).observe(host, { childList: true });
    }
  }

  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", boot);
  else boot();
})(window);
