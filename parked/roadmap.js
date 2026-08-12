/* =============================================================
   THE ROADMAP (?dev=roadmap · /roadmap/) — window.BRRoadmap

   WHY THIS IS A ROOM AND NOT A LINE IN THE ABOUT PAGE. Discovery is the hype:
   this archive's best argument is that there is more of it coming, and that
   argument cannot be made by a building that only shows what is already
   finished. The Roadmap is where the shape of the whole thing is visible at
   once — reachable from the ROOMS hub and from M2, on its own address.

   THE HONESTY RULE, which governs every word below. Blue Room's About page
   spends six sections promising it does not overstate itself; a roadmap is the
   easiest place in a building to break that promise, because a plan costs
   nothing to write. So:
     - Three states, and the state is the ranking. Nothing carries a date,
       because no date here would be true.
     - Nothing is listed as coming if it already ships. Every item was checked
       against the build before it was written down.
     - "Named only" says out loud that it is an intention, not a commitment.
   The ink falls left to right: what is nearest is darkest, and the far column
   is faint on purpose. You can read the priority without reading the words.

   Mounted into #devView by app.js's mountDev(). Static document, no state, no
   storage, no fetch — it owns one delegated click for its two doors.
============================================================= */
(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* BR-S366 — THE BOARD IS NO LONGER WRITTEN HERE.

     It used to be a second copy of the same facts, and the copies drifted: this
     file said "nothing reads a photograph yet" while U1 gave The Card Mint a
     door and counted it among five open rooms. Two pages, two answers, one room.

     Now both read app.js's ROOMS registry. Moving a thing between states is one
     word there and both surfaces follow. If the registry is somehow missing, the
     page renders its columns empty rather than inventing a plan. */
  function board() {
    var rooms = window.BR_ROOMS || [];
    var hz = window.BR_HORIZONS || [];
    return hz.map(function (h) {
      return {
        key: h.state, mark: h.mark, name: h.name, lede: h.lede,
        items: rooms.filter(function (r) { return r.state === h.state; })
                    .map(function (r) { return [r.name, r.soon]; })
      };
    });
  }

  function columnHTML(col) {
    var items = col.items.map(function (it) {
      return '<li class="rm-item">' +
        '<p class="rm-item__t">' + esc(it[0]) + "</p>" +
        '<p class="rm-item__d">' + esc(it[1]) + "</p>" +
      "</li>";
    }).join("");
    return '<section class="rm-col rm-col--' + col.key + '" aria-labelledby="rm-h-' + col.key + '">' +
      '<header class="rm-col__head">' +
        '<span class="rm-col__mark" aria-hidden="true">' + col.mark + "</span>" +
        '<h2 class="rm-col__h" id="rm-h-' + col.key + '">' + esc(col.name) + "</h2>" +
        '<p class="rm-col__lede">' + esc(col.lede) + "</p>" +
      "</header>" +
      '<ol class="rm-col__list">' + items + "</ol>" +
    "</section>";
  }

  function render() {
    return '<div class="pf rm-page">' +
      /* ── THE DOORS ARE REAL hrefs, AND ON THIS PAGE THAT IS NOT A PREFERENCE. ──
         Settings' header — which this borrows — navigates with
         `location.href = location.pathname`, and that is correct for a page that only
         ever lives at the site root. This page ALSO lives at /roadmap/, where
         location.pathname is "/roadmap/" and every one of those doors would reload the
         roadmap instead of leaving it. "./" resolves against the stub's own
         <base href="../">, so one href is right at both addresses — and, as with the
         Codex seal, a real link means the way out survives a JS failure. */
      '<header class="pf-top">' +
        '<span class="st-topleft">' +
          '<a class="pf-wordmark" href="./" aria-label="Main Menu" title="Main Menu">' +
            '<span class="pf-wordmark__mark" aria-hidden="true">&#9670;</span> Blue&nbsp;Room</a>' +
          '<a class="pf-back pf-back--top" href="./">&larr; Main Menu</a>' +
        "</span>" +
        '<a class="st-toplink" href="./#rooms">The Reading Rooms <span aria-hidden="true">&rarr;</span></a>' +
      "</header>" +
      '<div class="pf-wrap rm-wrap">' +
        '<header class="rm-head">' +
          '<p class="rm-eyebrow">The Roadmap</p>' +
          '<h1 class="rm-title">What&rsquo;s coming</h1>' +
          /* The lede does the honesty work for the whole page, so it says the two
             things a roadmap usually hides: no dates, and some of this is only an
             intention. Said once, at the top, rather than hedged item by item. */
          '<p class="rm-sub">Blue Room is one person&rsquo;s archive, built in the open. This is what is actually ' +
            'being made, in the order it is being made — three states, nearest first. Nothing here carries a date, ' +
            'because no date here would be true.</p>' +
        "</header>" +
        '<div class="rm-board">' + board().map(columnHTML).join("") + "</div>" +
        '<footer class="rm-foot">' +
          '<p class="rm-foot__line">What is finished is already open, and free where it says it is free.</p>' +
          '<nav class="rm-foot__links" aria-label="Where to go instead">' +
            '<a class="st-foot__link" href="./#rooms">The Reading Rooms</a>' +
            '<span class="st-foot__dot" aria-hidden="true">&middot;</span>' +
            '<a class="st-foot__link" href="codex.html?v=363">The Codex</a>' +
            '<span class="st-foot__dot" aria-hidden="true">&middot;</span>' +
            '<a class="st-foot__link" href="about/">What Blue Room is</a>' +
            '<span class="st-foot__dot" aria-hidden="true">&middot;</span>' +
            '<a class="st-foot__link" href="?dev=settings&p=legal">About &amp; Legal</a>' +
          "</nav>" +
        "</footer>" +
      "</div>" +
    "</div>";
  }

  window.BRRoadmap = {
    mount: function (host) {
      if (!host) return;
      /* No click wiring at all: every door on this page is an <a href> that resolves
         correctly at both of its addresses. "#rooms" is a panel of the menu rather
         than a route of its own — the menu reads that hash on boot and seats itself
         there (MENU_PANELS) — so the link hands over the hash and the menu does the
         rest, with nothing here trying to drive another page's slider. */
      host.innerHTML = render();
    }
  };
})();
