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
    l.id = "m2acc-css"; l.rel = "stylesheet"; l.href = "_m2-accord.css?v=516";
    (doc.head || doc.documentElement).appendChild(l);
  }

  /* ═══ BR-S513 — THE SILHOUETTE IS ONE SHAPE, NOT A STACK OF BOXES ═══════════════
     What the first build got wrong, and it was the whole thing: the bottle was
     assembled from absolutely-positioned rectangles — a body box, a liquid box, a
     thickness box, a shoulder wedge — each with its own border-radius. A stack of
     rectangles cannot produce a flask. There is no arrangement of boxes where the
     shoulder curves out of the neck, so the object never read as a bottle; it read as
     a label floating on a dark green panel, which is exactly what the ten candidates
     also produced and what the reference does not look like.

     So the vessel is now ONE outline, declared once, and every glass layer is clipped
     to it. Change the path and the whole bottle changes shape together — glass,
     transmission, thickness, facets and edge highlights included, because they are all
     inside the same clip.

     ★ WHY objectBoundingBox AND NOT path() OR polygon(). The socket renders at ~145px
     in the menu and at 462px in the lab, and it must be the same object at both. In
     objectBoundingBox units every coordinate is a FRACTION of the element's own box, so
     one declaration serves every size with no media queries and no recomputation. A
     path() in user units would need re-authoring per size, which is how a silhouette
     drifts between the bench and the shipping surface.

     ★ THE CAP IS DELIBERATELY OUTSIDE THIS PATH. The outline covers neck, shoulder and
     body only. The overcap has to move independently — 2-3px on hover, ~7px on
     activation, per V2 §6 — and a moving part cannot live inside the clip that defines
     the part it lifts away from. The path ends at the neck's top edge for that reason.

     Coordinates read top-down: neck sides, the shoulder's outward curve, the straight
     body walls, and a heel with a small radius. The shoulder is a cubic on both sides
     because that curve is the single feature separating a flask from a jar. */
  /* ★ THESE NUMBERS ARE MEASURED OFF THE REFERENCE, NOT INVENTED — and measured at
     MATCHED SIZE on the craft bench, which is the only reading that can be trusted. An
     earlier pass took them off a scaled screenshot and was wrong on two of three.
     Down the bottle: cap 0→.108, brass collar .108→.146, a VISIBLE dark neck to .197,
     the shoulder curve .197→.274, body to the heel at .998. Across: the neck is .168 of
     the body's width and the walls sit at .034/.966.
     (The closure fractions live in _m2-accord.css as --acc-cap-h / --acc-collar-*; this
     path only has to agree with where the neck STARTS, at .133.)

     The first pass guessed and got two things wrong that together read as "not the same
     object": the neck was .23 wide with no straight section, so the cap appeared to sit
     directly on the shoulders, and the shoulder curve was too short, which made it a
     jar's rolled edge rather than a flask's slope. */
  var SIL_ID = "m2accSil";
  var SIL_PATH =
    "M .416 .133 L .584 .133 L .584 .197 " +  /* neck: a real straight run, then the slope */
    /* ★ THE SHOULDER IS A LONG SLOPE, NOT A CORNER. The first curve put its control
       points far out (x .70 and .898 while y had barely moved), so the bottle reached
       nearly full width in the first third of the shoulder's vertical run and read as a
       rounded rectangle with a spout. Holding the curve close to the neck at the start
       and letting it sweep out late is what makes the reference a flask. */
    "C .626 .205 .878 .232 .966 .274 " +      /* right shoulder, curving out to the wall */
    "L .966 .970 " +                          /* right wall */
    "C .966 .989 .951 .998 .930 .998 " +      /* heel, right */
    "L .070 .998 " +
    "C .049 .998 .034 .989 .034 .970 " +      /* heel, left */
    "L .034 .274 " +                          /* left wall */
    "C .122 .232 .374 .205 .416 .197 Z";      /* left shoulder, back up to the neck */

  /* One <defs> per document. The SVG carries no size and no paint — it exists only to
     own the clipPath, so it is pulled out of layout entirely rather than hidden with
     display:none, which in some engines drops the clip along with the box. */
  function silhouette() {
    if (doc.getElementById(SIL_ID)) return;
    var NS = "http://www.w3.org/2000/svg";
    var svg = doc.createElementNS(NS, "svg");
    svg.setAttribute("width", "0"); svg.setAttribute("height", "0");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    svg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
    var defs = doc.createElementNS(NS, "defs");
    var cp = doc.createElementNS(NS, "clipPath");
    cp.setAttribute("id", SIL_ID);
    cp.setAttribute("clipPathUnits", "objectBoundingBox");
    var p = doc.createElementNS(NS, "path");
    p.setAttribute("d", SIL_PATH);
    cp.appendChild(p); defs.appendChild(cp); svg.appendChild(defs);
    (doc.body || doc.documentElement).appendChild(svg);
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

    /* ★★ THE VESSEL. Everything that is made of glass goes in here, and the wrapper
       carries the one clip-path, so the layers cannot disagree about the outline. The
       old build painted each layer its own rectangle and hoped they lined up; they
       could not, because the shape it needed does not exist in rectangles. */
    var v = el("div", "m2acc__vessel");

    /* ★★ THE RIM, AND WHY THERE ARE TWO NESTED CLIPS.
       The first pass drew the bottle's edge highlights as gradients pinned to the left
       and right of the bottle's BOX. That works down the straight walls and fails
       everywhere the silhouette is narrower than its box — which is the entire neck and
       shoulder. The clip simply cut them away up there, so the neck went unlit, and an
       unlit neck reads as a gap: the cap and collar appeared to float above a bottle
       they were not attached to. That single defect was most of what still looked wrong.

       The fix is structural. `__vessel` carries the outline and paints ONE thing — the
       rim colour. `__inner` carries the SAME outline inset by a couple of pixels and
       holds every material layer. What is left showing between them is a hairline that
       traces the real silhouette all the way round: up the walls, across the shoulder
       curve, and up both sides of the neck, which is the part that was missing.

       It also replaces the two hand-placed edge highlights with one mechanism. The
       asymmetry the reference depends on — bright and continuous left, soft and short
       right — is now a property of the rim's own gradient rather than two separate
       elements that had to be kept in agreement with a shape they could not see. */
    var inner = el("div", "m2acc__inner");
    inner.appendChild(el("span", "m2acc__glass"));
    /* ★★ V2 §4 — the green is TRANSMISSION, not a fill. Three layers now, because two
       could not carry it: __liquid is the body of colour, __core is the light coming
       THROUGH the centre where the glass is thinnest, and __thick is the density at the
       edges and heel where you look through more of it. A uniformly green bottle looks
       painted; a bright outlined one looks like a wireframe. */
    inner.appendChild(el("span", "m2acc__liquid"));
    inner.appendChild(el("span", "m2acc__core"));
    inner.appendChild(el("span", "m2acc__thick"));
    /* ★★ V2 §3 — THE SIX ARE PHYSICAL. Two shoulder, two side, two heel, cut into the
       glass and NOT drawn as six bright lines or a hexagon. At rest they are nearly
       invisible; they become sequentially perceptible as the pointer moves, so the
       metaphor is discovered rather than announced. The index drives that stagger.
       Inside the vessel, so a facet can never overhang the silhouette it is cut into. */
    ["sh", "sh", "sd", "sd", "hl", "hl"].forEach(function (kind, i) {
      var f = el("span", "m2acc__facet m2acc__facet--" + kind + " m2acc__facet--" + (i % 2 ? "b" : "a"));
      f.style.setProperty("--i", String(i));
      inner.appendChild(f);
    });
    /* the wet inner line where the fill stops — the one cue that says "liquid in a
       container" rather than "green object", and the reference has it plainly */
    inner.appendChild(el("span", "m2acc__fillline"));
    /* the stem and dip tube sit INSIDE the glass, so they are clipped with it */
    inner.appendChild(el("span", "m2acc__stem"));

    v.appendChild(inner);
    b.appendChild(v);

    /* the label sits ON the glass, not in it — a separate plane stuck to the front.
       Clipping it to the vessel would let the shoulder curve shave its top corners. */
    b.appendChild(label());
    /* ★★ V2 §1 — THE CLOSURE CONTROLS THE CATEGORY, and it is the only thing that
       separates this from a spirits or apothecary bottle. The overcap is a separate
       node from the pump collar because they must move independently — the cap
       separates 2-3px on hover and lifts ~7px on activation while the collar stays put.
       All of it sits OUTSIDE the vessel clip: these are metal, not glass, and the cap
       has to be able to rise clear of the silhouette. */
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

  function apply() { style(); silhouette(); return build(); }

  function boot() {
    apply();
    var host = doc.getElementById("menuView");
    /* the stage is rebuilt wholesale on every remount, which takes the recess with it
       and un-hides a fresh hero — so re-apply on the host's children, and on the two
       attribute signals that change visibility without touching children at all. The
       rack paid for this list — see _u1-rack.js, which is where it was learned. */
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
