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

  /* THE BOARD. Ordered by ship-order, left to right. Each item is a title and one
     line saying what it actually is — never what it will feel like. */
  var BOARD = [
    {
      key: "bench",
      mark: "&#9670;",
      name: "On the bench",
      lede: "Being made now. These are the last things between here and a first day open.",
      items: [
        ["Buying a reading",
         "Every price here is a preview. Nothing is charged yet, and the paid readings open without asking you for anything."],
        ["A reading you can come back to",
         "Today a reading lasts as long as the page stays open. Next it becomes something you close, and find again where you left it."],
        ["The whole dealing",
         "The deck shuffles and cuts. Watching the cards actually come down onto the table is the part still being made."]
      ]
    },
    {
      key: "drawn",
      mark: "&#9671;",
      name: "Drawn up",
      lede: "Designed and waiting. These exist on paper — the room they belong to does not.",
      items: [
        ["Your photograph, as a card",
         "The card itself is finished — you can see one on the desk. What is missing is the part that looks at your picture, so nothing reads a photograph yet."],
        ["The Codex, opened by your reading",
         "Buy a reading and every mark in it opens further: the same six marks read again for love, for friendship, for the hard years, for the small particulars."],
        ["A name that follows you",
         "There is no sign-up here. Until there is, everything you keep lives in this one browser and cannot travel with you."],
        ["A reading you can show someone",
         "One page you can hand to one person, without handing them everything else you have kept."]
      ]
    },
    {
      key: "named",
      mark: "&#10022;",
      name: "Named only",
      lede: "An intention, written down so it is not lost. No design, no date, and no promise.",
      items: [
        ["Readings for a table",
         "Something to put in the middle of a room with people around it, where the reading belongs to everyone sitting there rather than to one of them."],
        ["Everything about two people",
         "Love, and the readings that only mean anything between two — gathered into one wing instead of scattered through the building."],
        ["The Unlit Room",
         "Something is taking shape here, still too dim to name. The candle has not reached it yet."]
      ]
    }
  ];

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
        '<div class="rm-board">' + BOARD.map(columnHTML).join("") + "</div>" +
        '<footer class="rm-foot">' +
          '<p class="rm-foot__line">What is finished is already open, and free where it says it is free.</p>' +
          '<nav class="rm-foot__links" aria-label="Where to go instead">' +
            '<a class="st-foot__link" href="./#rooms">The Reading Rooms</a>' +
            '<span class="st-foot__dot" aria-hidden="true">&middot;</span>' +
            '<a class="st-foot__link" href="codex.html?v=237">The Codex</a>' +
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
