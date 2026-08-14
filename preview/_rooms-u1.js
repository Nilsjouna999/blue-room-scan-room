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

  /* ★★ BR-S442 — THE ROOM WAS STILL READABLE THROUGH THE SCRIM. The builder: "as this
       screen fires up you can see backround mainmenu and card lagging behid it."
       .62 alpha leaves 38 percent of the page showing, and the thing showing through is
       the CARD — by the palette paper's own measurement the loudest element on the site,
       and a 14px blur spreads a bright object rather than hiding it, so it becomes a pale
       glow drifting behind the doors. Blur softens; only alpha occludes.
       .62 -> .90 and 14px -> 20px: the room is still THERE (you can see it dim and go
       soft, which is the whole gesture) and nothing behind it competes for the eye. */
  var CSS = ""
    /* ── THE BLUR. The orbit already lays a scrim over the page; this gives it a
       depth-of-field instead of only a darkening. backdrop-filter is composited,
       so it costs nothing per frame once rastered — but it MUST NOT be animated
       (the house perf contract: transform and opacity only). It fades in via
       opacity on a parent that already carries the transition. */
    /* ★★★ BR-S447 — .90 WAS STILL 10 PERCENT OF THE BRIGHTEST THING ON THE SITE.
       "when opening rooms i still see main menu backround and white card through the
       room pop up." Correct, and my arithmetic at BR-S442 was wrong in the way that
       matters: the card peaks at 232 luminance, so 10 percent of it is 23 — against a
       ground of about 14. A patch 9 levels brighter than everything around it is not
       invisible, it is a soft shape, and 20px of blur SPREADS that shape rather than
       removing it. Blur redistributes luminance; only alpha destroys it.
       .90 -> .97. Three percent of 232 is 7, which lands UNDER the ground itself and is
       therefore genuinely unreadable. The blur stays, because at .97 it is still doing
       the thing it was asked for — the room is soft behind the doors rather than a flat
       wall — it simply no longer has enough light left to draw the card with. */
    /* ★★ BR-S446 — THE ROOM SHOWED THROUGH WHILE THE SHEET WAS ARRIVING. The builder:
       "room pop up mainmenu or backround visible buggily as it settles." The word that
       matters is SETTLES — it is not the resting state, it is the entrance.
       BR-S422 made the doors appear on the same tick (a forced reflow, no rAF), because
       a throttled parent was leaving them invisible. That fixed one race and started
       another: the cards now arrive at full opacity while the ORBIT'S OWN scrim is still
       fading up, so for those frames you are looking at finished doors over a half-
       transparent dim, with the menu and the card legible behind them.
       A scrim has no business easing. It is the frame the content arrives INTO, so it is
       there first and completely — the room dims at once, then the doors come. That also
       removes the only moment the page behind could ever be read. */
    + ".orbit.is-u1 .orbit__scrim{transition:none!important;opacity:1!important;animation:none!important}"
    + ".orbit__scrim{backdrop-filter:blur(20px) saturate(.85);"
    +   "-webkit-backdrop-filter:blur(20px) saturate(.85);"
    +   "background:rgba(14,12,10,.985)!important}"
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
    + ".u1rooms .u1door{cursor:pointer}"
    + ".u1rooms__head{display:flex;align-items:baseline;gap:12px;margin:0 0 clamp(12px,2vh,22px)}"
    + ".u1rooms__t{font-family:var(--font-mono);font-size:10px;letter-spacing:.2em;"
    +   "text-transform:uppercase;color:#6e6b63;margin:0}"
    + ".u1rooms__n{font-family:var(--font-mono);font-size:10px;letter-spacing:.14em;color:#4f4c46}"
    /* the cloned list keeps U1's own .u1doors grid; only the column count is
       re-fitted, because this sheet is wider than U1's column */
    + ".u1rooms .u1doors{display:grid;gap:clamp(10px,1.4vw,18px);"
    +   "grid-template-columns:repeat(auto-fit,minmax(230px,1fr))}"
    /* ★★★ BR-S446 — THE CARDS NO LONGER ANIMATE IN, AND THAT IS THE FIX.
       They started at opacity 0 and transitioned to 1. Driven three ways now — parent
       rAF, then a forced reflow, then this — and measured stuck at 0 for 400ms with
       `is-in` present and the winning rule saying 1, because a transition only advances
       while the browser is actually painting, and the one thing this project has proved
       repeatedly is that it sometimes is not (BR-S422, BR-S426, BR-S430).
       An entrance that CAN fail closed is worse than no entrance: the doors vanish and
       the page behind shows through the gap they leave. So they are simply there, with
       the scrim, at full opacity, from the first frame. The gesture that remains is the
       dim itself — which is the part the builder actually described.
       Three fixes for one 26ms stagger is where a nicety stops being worth its risk. */
    + ".orbit.is-u1 .u1door{opacity:1;translate:0 0}";

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
    /* ★★ BR-S440 — THE WHOLE CARD IS THE DOOR, AND A CARD IS NOT THE BACKGROUND.
       "backround close is buggy when rooms is opened." Probed it: `.orbit__field` carries
       data-orbit-close (app.js:6914) and it is `inset:0`, so EVERY point in the sheet
       resolves to a closer — including the cards. BR-S432 only shielded `.u1door__go`,
       the 9px link, so clicking a card anywhere else dismissed the map instead of opening
       the room. From the outside that reads as the background closing at random, because
       the thing you pressed and the thing that answered were different objects.
       Now: a click anywhere inside a card is the card's, and follows its own href. Only
       the ground between and around the cards closes — which is what a scrim is for. */
    list.addEventListener("click", function (e) {
      var door = e.target.closest && e.target.closest(".u1door");
      if (!door) return;                       /* the ground: let it reach the closer */
      e.stopPropagation();
      if (e.target.closest(".u1door__go")) return;   /* the real link handles itself */
      var go = door.querySelector(".u1door__go");
      if (go && go.getAttribute("href")) {
        e.preventDefault();
        d.defaultView.location.href = go.getAttribute("href");
      }
    }, true);

    wrap.appendChild(list);
    field.appendChild(wrap);

    sheet.classList.add("is-u1");
    /* ★ THE ENTRANCE RAN ON THE WRONG WINDOW, AND IT COST THE WHOLE SHEET.
       This used the PARENT's requestAnimationFrame to add `is-in`. The cards live in
       the frame and start at opacity 0, so if the parent is throttled — backgrounded
       tab, a pane that has stopped compositing, which is a documented trap in this
       project — the class never lands and you get a blurred sheet with the plates
       hidden and the doors invisible. Found by driving it: is-u1 true, 4 doors cloned,
       0 plates visible, `is-in` FALSE.
       Fixed by not depending on any rAF: force a style read so the from-state is
       committed, then set the class on the same tick. One reflow, no timing. */
    void sheet.offsetHeight;
    sheet.classList.add("is-in");
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

  /* ★ SELF-INSTALL IN THE APP (BR-S430). Loaded from index.html the module drives its
     OWN document; the lab keeps working because install()/tick() are exported and the
     lab hands them the frame's document instead. One module, two hosts, no fork.
     It ticks rather than installing once, because the orbit builds a FRESH sheet on
     every open — there is nothing to install against until the button is pressed.
     ?ru=0 turns it off. */
  if (root.document && !root.frameElement) {
    root.setInterval(function () {
      if (/[?&]ru=0/.test(String(root.location.search || ""))) return;
      root.RoomsU1.tick(root.document);
    }, 300);
  }
})(window);
