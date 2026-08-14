/* ═══════════════════════════════════════════════════════════════════════════
   ROOMS, REBUILT OUT OF U1 — the doors you already designed, behind a blur.

   The builder: "lets make u1 room setup and copy it to rooms tab. that way its
   more consistend, have blurring effect though."

   ★ IT DOES NOT COPY THE DESIGN. IT CLONES THE NODES.
   U1's open-doors list is already rendered in the menu DOM (`#about .u1doors`,
   app.js renderAbout). So this lifts the REAL cards rather than re-implementing
   u1Door() — which means the two can never drift, no markup is duplicated, and
   a change to a door on U1 is the same change here for free. Same discipline as
   the card (BR-S289) and the perk colours: the thing already exists.

   ★★ AND IT FIXES THE DEFECT `docs/HOUSE_SHAPE_V1.md` PART 1B MEASURED.
   The Orbit's own rooms() (app.js:6851) derives its plates from MENU_PANELS —
   the three horizontal PANELS — and never reads the ROOMS registry. So today
   Tarot and the Birth Reading, the two products, hide behind one plate called
   "The Reading Rooms", and U1 appears twice ("About Blue Room" + "What's
   coming") because BR-S369 merged those pages and the map still shows two.
   U1's list is built from `u1Open()` — the registry itself — so cloning it
   makes the map show ROOMS instead of panels, which is what a map is for.

   NOTHING TRACKED IS TOUCHED. Overlay only; remove the script and the Orbit is
   byte-identical to what ships.
   ═══════════════════════════════════════════════════════════════════════════ */
(function (root) {
  "use strict";

  var CSS = ""
    /* ── THE BLUR. The orbit already lays a scrim over the page; this gives it a
       depth-of-field instead of only a darkening. backdrop-filter is composited,
       so it costs nothing per frame once rastered — but it MUST NOT be animated
       (the house perf contract: transform and opacity only). It fades in via
       opacity on a parent that already carries the transition. */
    + ".orbit__scrim{backdrop-filter:blur(14px) saturate(.9);"
    +   "-webkit-backdrop-filter:blur(14px) saturate(.9);"
    +   "background:rgba(8,9,11,.62)!important}"
    /* the field stops being a constellation and becomes a sheet of doors */
    + ".orbit.is-u1 .orbit__field{display:flex;align-items:center;justify-content:center;"
    +   "padding:clamp(20px,4vh,54px) clamp(16px,4vw,60px)}"
    /* ★ BUG 1 — THE PLATES FLASHED. This was scoped to `.orbit.is-u1`, which is only
       set AFTER the sheet exists and has been converted. So the constellation began
       its 26ms-staggered entrance, then vanished mid-flight when the class landed —
       which is exactly the "bit buggy" the builder saw. Hiding them unconditionally
       while the module is armed means they never start. The rule is scoped to the
       injected stylesheet, so removing it restores them in one delete. */
    + ".orbit__plate{display:none!important}"
    + ".u1rooms{width:100%;max-width:1180px;margin:0 auto}"
    + ".u1rooms__head{display:flex;align-items:baseline;gap:12px;margin:0 0 clamp(12px,2vh,22px)}"
    + ".u1rooms__t{font-family:var(--font-mono);font-size:10px;letter-spacing:.2em;"
    +   "text-transform:uppercase;color:#6e6b63;margin:0}"
    + ".u1rooms__n{font-family:var(--font-mono);font-size:10px;letter-spacing:.14em;color:#4f4c46}"
    /* the cloned list keeps U1's own .u1doors grid; only the column count is
       re-fitted, because this sheet is wider than U1's column */
    + ".u1rooms .u1doors{display:grid;gap:clamp(10px,1.4vw,18px);"
    +   "grid-template-columns:repeat(auto-fit,minmax(230px,1fr))}"
    /* the cards ARRIVE, the same stagger the plates used (26ms), so the gesture
       is unchanged even though what arrives is different */
    + ".orbit.is-u1 .u1door{opacity:0;translate:0 10px;"
    +   "transition:opacity 320ms cubic-bezier(.2,.7,.3,1),translate 320ms cubic-bezier(.2,.7,.3,1);"
    +   "transition-delay:var(--od,0ms)}"
    + ".orbit.is-u1.is-in .u1door{opacity:1;translate:0 0}"
    + "@media (prefers-reduced-motion:reduce){.orbit.is-u1 .u1door{transition:none;opacity:1;translate:0 0}}";

  var docRef = null;

  function style(d) {
    if (d.getElementById("__roomsu1")) return;
    var s = d.createElement("style"); s.id = "__roomsu1"; s.textContent = CSS;
    d.head.appendChild(s);
  }

  /* The orbit sheet is BUILT FRESH on every open (app.js build()), so this cannot
     install once — it converts whatever sheet is currently in the document, and
     the caller polls. Idempotent by the is-u1 flag. */
  function convert(d) {
    var sheet = d.querySelector(".orbit");
    if (!sheet || sheet.classList.contains("is-u1")) return false;

    var src = d.querySelector("#about .u1doors");
    if (!src) return false;                       /* U1 not mounted — leave the orbit alone */

    var field = sheet.querySelector(".orbit__field");
    if (!field) return false;

    var wrap = d.createElement("div");
    wrap.className = "u1rooms";
    var n = src.children.length;
    wrap.innerHTML = '<div class="u1rooms__head">'
      + '<p class="u1rooms__t">&#9670; The rooms</p>'
      + '<span class="u1rooms__n">' + n + ' open</span></div>';

    /* deep clone, then re-stagger. The clone carries U1's exact markup, classes,
       emblems, chips, prices and hrefs — nothing is re-authored here. */
    var list = src.cloneNode(true);
    Array.prototype.forEach.call(list.children, function (li, i) {
      li.style.setProperty("--od", (i * 26) + "ms");
    });
    /* ★ BUG 2 — CLICKING A DOOR CLOSED THE SHEET INSTEAD OF OPENING THE ROOM.
       `.orbit__field` carries `data-orbit-close` (app.js:6914), so any click inside it
       dismisses the map. The plates escaped that because they are buttons the orbit
       binds itself; these are cloned <a>s the orbit has never heard of, so their click
       bubbled straight into the close handler. Stop it at the card. */
    list.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest(".u1door__go")) e.stopPropagation();
    }, true);

    wrap.appendChild(list);
    field.appendChild(wrap);

    sheet.classList.add("is-u1");
    /* one frame later so the entrance transition has a from-state to run from */
    root.requestAnimationFrame(function () {
      root.requestAnimationFrame(function () { sheet.classList.add("is-in"); });
    });
    return true;
  }

  function revert(d) {
    var sheet = d.querySelector(".orbit");
    if (sheet) { sheet.classList.remove("is-u1", "is-in"); var w = sheet.querySelector(".u1rooms"); if (w) w.remove(); }
    var s = d.getElementById("__roomsu1"); if (s) s.remove();
  }

  /* ★ BUG 3 — A 250ms POLL IS TOO SLOW FOR A SHEET THAT IS BUILT ON OPEN.
     The orbit creates its sheet the instant you press ROOMS, so a quarter-second
     tick meant up to 15 frames of un-converted sheet before the doors appeared.
     An observer on body catches the insertion on the frame it happens. The tick
     stays as a backstop, not as the mechanism. */
  var mo = null;
  function watch(d) {
    if (mo || !root.MutationObserver) return;
    mo = new root.MutationObserver(function () { if (docRef) convert(docRef); });
    mo.observe(d.body, { childList: true });
  }

  root.RoomsU1 = {
    install: function (d) { docRef = d; style(d); watch(d); return convert(d); },
    tick: function (d) { if (!d) return; docRef = d; style(d); watch(d); convert(d); },
    uninstall: function () {
      if (mo) { mo.disconnect(); mo = null; }
      if (docRef) revert(docRef);
      docRef = null;
    }
  };
})(window);
