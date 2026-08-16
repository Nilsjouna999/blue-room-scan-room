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

   ★★ AND AT BR-S524 THE OCCUPANT CHANGED. This file was written to host whichever of ten
   fleet-built CSS bottles won, which is why it once carried a documented skeleton, a
   stated layer order and two governing ratios (recess 0.808, body 0.582). None of that
   survives. The bottle ships as a rendered illustration — `assets/birth-accord/` — and
   the socket's job shrank to mounting one <img> and standing a live node in the card
   region the asset itself declares.

   The paragraphs above are kept because the mount/lifecycle reasoning they explain is
   unchanged; the paragraphs about the skeleton and the ratios are not, and are struck
   here rather than silently edited so the shape of the change stays legible.

   ★ THE GEOMETRY IS THE ASSET'S, NOT OURS. Canvas and card region are read out of
   `assets/birth-accord/asset.json`. Nothing about the bottle's proportions is decided in
   this repo any more, and the asset's README forbids stretching either axis
   independently — so there is no ratio left to tune, only one to honour.

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
    l.id = "m2acc-css"; l.rel = "stylesheet"; l.href = "_m2-accord.css?v=524b";
    (doc.head || doc.documentElement).appendChild(l);
  }

  /* BR-S524: the SIL_PATH clip-path and its <defs> injector lived here and are gone
     with the CSS bottle they shaped. Recover them from BR-S523 if the illustration route
     is ever reversed; nothing else referenced them.

     ★ hero() and el() live below rather than above only because the deletion that removed
     the silhouette took them with it — they sat between the clip-path block and the label
     builder, and a range delete does not know that. The mount failed with "hero is not
     defined" on the first load after, which is the cheapest possible way for that to
     surface and the reason the socket gets checked in the menu rather than assumed. */

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

  /* ═══ BR-S524 — THE BOTTLE IS AN ILLUSTRATION NOW ═══════════════════════════════
     Everything that used to stand here — the silhouette clip, the vessel and its inner
     twin, the transmission and thickness layers, the six facets, the rim, the closure,
     the recess walls and floor and pane — is gone, and the whole of it is replaced by one
     <img>. That is not a retreat. Two sessions of measuring gradients against a render
     never closed the gap, because the gap was raytraced glass, and CSS does not have any.
     The asset does.

     ★ AND THE RENDER CARRIES ITS OWN VITRINE. The frame, the inner shadow, the brass
     hairline and the single diagonal reflection are all in the image. Painting the CSS
     recess behind it would double every depth cue the render already resolved, and two
     sets of shadows disagreeing is worse than either alone. So the recess is not resized
     to fit the asset — it is retired for this surface, and `.m2acc` becomes a plain sized
     box holding the plate.

     ★ THE LABEL STAYS LIVE, and it is the only thing that does. It is the one surface
     making a claim about a person: it has to come out of the reading engine, survive the
     drift test, be selectable and scale with the type system. The `no-sticker` variant is
     clean continuous glass with nothing printed on it, so the live node is the only label
     in the frame — there is no baked text underneath to peek out from behind it.

     Geometry comes from `assets/birth-accord/asset.json`, never from a number typed here.
     Per that asset's README the region is meant to host the REAL card node, reparented
     and not cloned; the fixture label below is the placeholder until the reading panel
     exists (docs/READING_PANELS_V1.md). */
  var ASSET = "assets/birth-accord/birth-accord-showcase-no-sticker.webp";

  function build() {
    var h = hero();
    if (!h || doc.querySelector(".m2acc")) return false;

    var recess = el("div", "m2acc");
    recess.setAttribute("aria-hidden", "true");     /* decorative until the label is real */

    /* the plate is a passive stage — it takes no events, and the card above it takes all
       of them. The width/height attributes are the asset's true pixels so the box is
       reserved before the image decodes and nothing reflows under it. */
    var img = doc.createElement("img");
    img.className = "m2acc__plate";
    img.src = ASSET;
    img.width = 875; img.height = 1182;
    img.alt = ""; img.setAttribute("aria-hidden", "true");
    img.setAttribute("decoding", "async");
    recess.appendChild(img);

    /* the card region, straight out of asset.json's normalized block */
    var slot = el("div", "m2acc__slot");
    slot.appendChild(label());
    recess.appendChild(slot);

    h.parentNode.insertBefore(recess, h);
    h.classList.add("is-accord-hidden");             /* hidden, never removed */
    /* arm a frame late — see the .is-armed note in the stylesheet. Two frames, because
       the first only guarantees layout; the stylesheet may still be in flight. */
    var arm = function () { recess.classList.add("is-armed"); };
    root.requestAnimationFrame(function () { root.requestAnimationFrame(arm); });
    /* BACKSTOP, and it is not theoretical: rAF does not run in a tab that is not fronted,
       so on a background tab the arm never fired. Idempotent — a double call adds the
       class twice, which is once. */
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
