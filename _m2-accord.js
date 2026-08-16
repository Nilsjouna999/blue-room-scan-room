/* ═══════════════════════════════════════════════════════════════════════════════
   M2 · THE ACCORD — the socket.  `_m2-accord.js`

   The builder's reference puts a cologne bottle in a recess where M2's standing card
   is now, and asked for "most propable combinations of actions that lead to us getting
   that bottle and hole design as something we can use in our main menu". This is step
   two of that answer: the mount point, built while the fleet is still building the
   thing that goes in it, so the winner drops in instead of being ported.

   Behind `?m2=accord`; without it this file does nothing at all — no stylesheet is
   fetched, no node is touched, no listener bound. Same shape as `_m2-box.js:35-39`
   and for the same reason.

   ★ THIS ONE REPLACES, IT DOES NOT WRAP. The case, the vitrine and the pod are all
   containers built AROUND the standing card. The accord is a different object in the
   same slot: the card is not inside the bottle, the bottle is instead of the card. So
   the hero is hidden rather than wrapped, and it is HIDDEN rather than removed —
   mountMenu() rebuilds the stage from scratch on every remount, and a prototype that
   deletes shipped nodes is a prototype that can strand the real menu if it half-runs.

   ★ WHY A FIXED SKELETON AND NOT THE WINNER'S OWN MARKUP. Ten builders are writing ten
   standalone files with ten sets of class names. Whichever wins, its CSS has to meet
   the app somewhere, and a socket with documented names is a smaller adaptation than
   re-authoring the winner's HTML into the menu. The element ORDER below is the
   reference document's own stated layer order (its section 6) — recess floor and walls,
   bottle glass, liquid, label, glass highlights, cap and collar, pane gleam — because
   in a stack of translucent layers the order IS the design.

   ★ THE GEOMETRY IS CUSTOM PROPERTIES, NOT NUMBERS IN RULES. The two ratios that carry
   the whole silhouette (recess 0.808, bottle body 0.582) are declared once in the
   stylesheet and everything else is derived from them, so adopting a candidate's
   proportions is editing two values rather than hunting through selectors.

   ★★ THE LABEL IS A FIXTURE AND IT IS MARKED AS ONE. The six lines below are the
   SLOTS, not a person's marks. The moment they come from the real derivation this
   surface stops being decoration and starts making a claim about somebody, and it
   inherits the claim rules with it — nothing may appear on that label the engine does
   not actually derive. Step three of the plan, deliberately not taken here.
   ═══════════════════════════════════════════════════════════════════════════════ */
(function (root) {
  "use strict";

  var q = String(root.location.search || "");
  if (!/[?&]m2=accord/i.test(q)) return;            // absent = this file is inert

  var doc = root.document;

  function style() {
    if (doc.getElementById("m2acc-css")) return;
    var l = doc.createElement("link");
    l.id = "m2acc-css"; l.rel = "stylesheet"; l.href = "_m2-accord.css?v=510b";
    (doc.head || doc.documentElement).appendChild(l);
  }

  function hero() { return doc.querySelector(".menu__draw-stage [data-m2-hero]"); }

  function el(tag, cls, text) {
    var n = doc.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* The eleven label lines, in the reference's order. Split into the two-ended rows
     the reference draws (a left and a right at the same baseline) and the centred
     ones, because that split is what the type has to reproduce. */
  var MARKS = ["SUN SIGN", "YEAR ANIMAL", "LIFE PATH", "RUNE", "TRIGRAM", "HEXAGRAM"];

  function label() {
    var lab = el("div", "m2acc__label");
    var head = el("div", "m2acc__lrow m2acc__lrow--split");
    head.appendChild(el("span", null, "BLUE ROOM ACCORDS"));
    head.appendChild(el("span", null, "FORMULA 01"));
    lab.appendChild(head);
    lab.appendChild(el("div", "m2acc__lrule"));
    lab.appendChild(el("div", "m2acc__lname", "THE BIRTH READING"));
    lab.appendChild(el("div", "m2acc__lsub", "A PERSONAL ACCORD IN SIX NOTES"));
    lab.appendChild(el("div", "m2acc__ldiamond", "◆"));
    /* the display serif, and the largest thing on the label — the reference is explicit
       that it is roughly twice anything else */
    lab.appendChild(el("div", "m2acc__lcrown", "The Crowned Name"));
    var six = el("div", "m2acc__lsix");
    MARKS.forEach(function (m) { six.appendChild(el("div", "m2acc__lmark", m)); });
    lab.appendChild(six);
    lab.appendChild(el("div", "m2acc__lrule"));
    lab.appendChild(el("div", "m2acc__lfoot", "BY BIRTH ALONE"));
    var tail = el("div", "m2acc__lrow m2acc__lrow--split m2acc__lrow--fine");
    tail.appendChild(el("span", null, "SIX MARKS"));
    tail.appendChild(el("span", null, "ONE ACCORD"));
    lab.appendChild(tail);
    return lab;
  }

  function build() {
    var h = hero();
    if (!h || doc.querySelector(".m2acc")) return false;

    var recess = el("div", "m2acc");
    recess.setAttribute("aria-hidden", "true");     /* decorative until the label is real */

    /* ── the hole, back to front ─────────────────────────────────────────────── */
    recess.appendChild(el("span", "m2acc__wall"));
    recess.appendChild(el("span", "m2acc__floor"));   /* the warm pool under the base */

    /* ── the bottle ──────────────────────────────────────────────────────────── */
    var b = el("div", "m2acc__bottle");
    b.appendChild(el("span", "m2acc__glass"));
    /* ★★ V2 §4 — the green is TRANSMISSION, not a fill. Two layers: the body of
       colour, and a thickness layer that darkens where you look through more glass
       (edges and heel) and clears through the centre. A uniformly green bottle looks
       painted; a bright outlined one looks like a wireframe. */
    b.appendChild(el("span", "m2acc__liquid"));
    b.appendChild(el("span", "m2acc__thick"));
    /* ★★ V2 §3 — THE SIX ARE PHYSICAL. Two shoulder, two side, two heel, cut into the
       glass and NOT drawn as six bright lines or a hexagon. At rest they are nearly
       invisible; they become sequentially perceptible as the pointer moves, so the
       metaphor is discovered rather than announced. The index drives that stagger. */
    ["sh", "sh", "sd", "sd", "hl", "hl"].forEach(function (kind, i) {
      var f = el("span", "m2acc__facet m2acc__facet--" + kind + " m2acc__facet--" + (i % 2 ? "b" : "a"));
      f.style.setProperty("--i", String(i));
      b.appendChild(f);
    });
    b.appendChild(label());
    /* asymmetric on purpose: bright continuous left, soft short right. Symmetry reads
       as a gradient, asymmetry reads as glass — the reference's own ranking puts this
       fourth of six things that make or break it. */
    b.appendChild(el("span", "m2acc__edge m2acc__edge--l"));
    b.appendChild(el("span", "m2acc__edge m2acc__edge--r"));
    b.appendChild(el("span", "m2acc__shoulder"));
    /* ★★ V2 §1 — THE CLOSURE CONTROLS THE CATEGORY, and it is the only thing that
       separates this from a spirits or apothecary bottle. The stem and dip tube sit
       INSIDE the glass, so they go in before the neck; the overcap is a separate node
       from the pump collar because they must move independently — the cap separates
       2-3px on hover and lifts ~7px on activation while the collar stays put. */
    b.appendChild(el("span", "m2acc__stem"));
    b.appendChild(el("span", "m2acc__neck"));
    b.appendChild(el("span", "m2acc__pump"));       /* the narrow brass pump collar */
    b.appendChild(el("span", "m2acc__seam"));       /* the lift seam */
    b.appendChild(el("span", "m2acc__overcap"));    /* removable — the moving part */
    recess.appendChild(b);

    /* ── PLANE 3. V2 §5: the pane is FLUSH WITH THE MENU SURFACE, not a lid on the
       box — visible only as a partial reflection and a lower-edge trace. The recess
       occludes from the INSIDE (see __wall) rather than wearing a decorative frame,
       which is the whole difference between a framed product image and an object built
       into the interface. ── */
    recess.appendChild(el("span", "m2acc__pane"));
    recess.appendChild(el("span", "m2acc__gleam"));
    recess.appendChild(el("span", "m2acc__trace"));

    h.parentNode.insertBefore(recess, h);
    h.classList.add("is-accord-hidden");             /* hidden, never removed */
    /* arm the transitions a frame late — see the .is-armed note in the stylesheet. Two
       frames, because the first only guarantees the nodes are laid out; the stylesheet
       may still be in flight, and arming before it lands re-opens the very bug this
       closes. */
    var arm = function () { recess.classList.add("is-armed"); };
    root.requestAnimationFrame(function () { root.requestAnimationFrame(arm); });
    /* BACKSTOP, and it is not theoretical: rAF does not run in a tab that is not
       fronted, so on a background tab the arm never fired and the facets stayed
       permanently un-transitioned. Every rAF in this repo carries one of these for the
       same reason. Idempotent — a double call adds the class twice, which is once. */
    root.setTimeout(arm, 120);
    return true;
  }

  function apply() { style(); return build(); }

  function boot() {
    apply();
    var host = doc.getElementById("menuView");
    /* the stage is rebuilt wholesale on every remount, which takes the recess with it
       and un-hides a fresh hero — so re-apply on the host's children, and on the two
       attribute signals that change visibility without touching children at all. The
       rack paid for this list; see _u1-room.js's boot for the same three watchers. */
    if (root.MutationObserver && host) {
      var re = function () { apply(); };
      new root.MutationObserver(re).observe(host, { childList: true });
      new root.MutationObserver(re).observe(doc.documentElement, {
        attributes: true, attributeFilter: ["data-view"], subtree: true
      });
      var menu = doc.querySelector(".menu");
      if (menu) new root.MutationObserver(re).observe(menu, { attributes: true, attributeFilter: ["class"] });
    }
    var poll = root.setInterval(function () { if (apply()) { root.clearInterval(poll); poll = null; } }, 400);
    root.setTimeout(function () { if (poll) { root.clearInterval(poll); poll = null; } }, 8000);
  }

  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", boot);
  else boot();
})(window);
