/* =============================================================
   THE ARMOR RECEIVED — arcana reading RESULT room (BR-S160)
   Recreates the builder's mockup: each reading takes its place on a
   suit of armour. The armour FIGURE is the builder's exact art
   (assets/arcana/armor-figure.png) embedded as the hero; the header,
   twelve reading cards, connectors, ring, verdict button and footer
   are rebuilt in HTML/CSS. Exposes window.BRArcanaResult; mounted by
   app.js mountDev() on ?dev=arcana-result. Showcase data (matches the
   mockup) — computed from the intake marks later. No photo-read walls.
============================================================= */
(function () {
  "use strict";

  var slice = function (nl) { return Array.prototype.slice.call(nl); };
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  // ---- glyphs (22px, stroke = currentColor) ----
  var G = {
    crown: '<svg viewBox="0 0 24 24"><path d="M3 18 L3.5 8 L8.5 12 L12 5 L15.5 12 L20.5 8 L21 18 Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M4 18 L20 18" stroke="currentColor" stroke-width="1.3"/></svg>',
    sun: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.3"/><g stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><path d="M12 2.5 L12 5"/><path d="M12 19 L12 21.5"/><path d="M2.5 12 L5 12"/><path d="M19 12 L21.5 12"/><path d="M5.2 5.2 L7 7"/><path d="M17 17 L18.8 18.8"/><path d="M18.8 5.2 L17 7"/><path d="M7 17 L5.2 18.8"/></g></svg>',
    snake: '<svg viewBox="0 0 24 24"><path d="M17 6 C 17 3.5, 13 3.5, 12 6 C 11 8.5, 15 9.5, 14 12 C 13 14.5, 8 14, 8 16.5 C 8 19, 12 19.5, 13 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="17" cy="5.6" r="0.95" fill="currentColor"/><path d="M18 5.4 L19.6 4.6 M18 6 L19.6 6.4" stroke="currentColor" stroke-width="0.9" stroke-linecap="round"/></svg>',
    tower: '<svg viewBox="0 0 24 24"><path d="M8 21 L8 8 L6.5 8 L6.5 5 L9 5 L9 7 L11 7 L11 4 L13 4 L13 7 L15 7 L15 5 L17.5 5 L17.5 8 L16 8 L16 21 Z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M10.6 13 L13.4 13 L12 15.5 Z" fill="currentColor"/></svg>',
    seal: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.1"/><g stroke="currentColor" stroke-width="1" stroke-linecap="round"><path d="M12 5.5 L12 18.5"/><path d="M5.5 12 L18.5 12"/><path d="M7.4 7.4 L16.6 16.6"/><path d="M16.6 7.4 L7.4 16.6"/></g><path d="M12 9.4 L14.6 12 L12 14.6 L9.4 12 Z" fill="currentColor"/></svg>',
    mountains: '<svg viewBox="0 0 24 24"><path d="M2.5 19 L9 8 L13 14 L16 9 L21.5 19 Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>',
    chevrons: '<svg viewBox="0 0 24 24"><path d="M5 13 L12 7 L19 13 M5 19 L12 13 L19 19" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/></svg>',
    rune: '<svg viewBox="0 0 24 24"><path d="M6 4 L6 20 M18 4 L18 20 M6 6.5 L12 12 L18 6.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/></svg>',
    book: '<svg viewBox="0 0 24 24"><path d="M12 6.5 C 9.5 4.8, 5.5 4.8, 3.2 5.8 L3.2 18 C 5.5 17, 9.5 17, 12 18.8 C 14.5 17, 18.5 17, 20.8 18 L20.8 5.8 C 18.5 4.8, 14.5 4.8, 12 6.5 Z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M12 6.5 L12 18.8" stroke="currentColor" stroke-width="1.1"/></svg>',
    trigram: '<svg viewBox="0 0 24 24"><g stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4.5 8 L19.5 8"/><path d="M4.5 12 L19.5 12"/><path d="M4.5 16 L19.5 16"/></g></svg>',
    tarot: '<svg viewBox="0 0 24 24"><rect x="6" y="3" width="12" height="18" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M12 7.5 L15 12 L12 16.5 L9 12 Z" fill="none" stroke="currentColor" stroke-width="1.1"/></svg>',
  };

  // ---- readings (showcase; matches the mockup) ----
  var CARDS = [
    { id: "crown",       cx: 50, cy: 6,  kicker: "Crown",           name: "The Name Borne",          ico: "crown",     tone: "gold" },
    { id: "rshoulder",   cx: 28, cy: 25, kicker: "Right Shoulder",  name: "The Sun, held in its sign", ico: "sun",     tone: "gold", link: "Read verdict" },
    { id: "lshoulder",   cx: 72, cy: 25, kicker: "Left Shoulder",   name: "Year of the Snake",       ico: "snake",     tone: "red",  link: "Read verdict" },
    { id: "breastplate", cx: 28, cy: 45, kicker: "Breastplate",     name: "Life Path 3",             ico: "num3",      tone: "red",  link: "Read verdict" },
    { id: "gauntlets",   cx: 72, cy: 54, kicker: "Gauntlets",       name: "The Tower",               ico: "tower",     tone: "gold", link: "Read verdict" },
    { id: "belt",        cx: 50, cy: 63, kicker: "Belt Seal",       name: "The Setting of Marks",    ico: "seal",      tone: "gold", link: "Read verdict" },
    { id: "greaves",     cx: 28, cy: 78, kicker: "Greaves",         name: "The Ground First Stood On", ico: "mountains", tone: "red", link: "Read verdict" },
    { id: "boots",       cx: 72, cy: 78, kicker: "Boots",           name: "The Path Forward",        ico: "chevrons",  tone: "red",  link: "Read verdict" },
    { id: "rune",        cx: 11, cy: 48, kicker: "Rune Blessing",   name: "Ehwaz",                   ico: "rune",      tone: "gold", sub: "Movement.\nTrust the road.", link: "View blessing", corner: true },
    { id: "lexicon",     cx: 14, cy: 88, kicker: "Archive Lexicon", name: "The Record Keeps Returning", ico: "book",   tone: "gold", link: "View blessing", corner: true },
    { id: "trigram",     cx: 89, cy: 48, kicker: "Trigram Ward",    name: "Qian",                    ico: "trigram",   tone: "gold", sub: "Heaven.\nCreative strength.", link: "View blessing", corner: true },
    { id: "tarot",       cx: 86, cy: 88, kicker: "Tarot Counsel",   name: "One Card as Compass",     ico: "tarot",     tone: "gold", link: "View blessing", corner: true },
  ];

  // dotted connectors from armour cards to figure anchors (viewBox coords 0..1000 x 0..616)
  var CONN = [
    { f: [500, 62], t: [500, 96] },   // crown -> head
    { f: [392, 168], t: [456, 205] }, // right shoulder
    { f: [608, 168], t: [544, 205] }, // left shoulder
    { f: [396, 272], t: [470, 258] }, // breastplate -> chest
    { f: [604, 338], t: [548, 350] }, // gauntlets
    { f: [396, 478], t: [472, 470] }, // greaves -> knee
    { f: [604, 478], t: [524, 556] }, // boots -> foot
  ];

  function icoHTML(c) {
    var inner = c.ico === "num3" ? '<span class="ar-ico__num">3</span>' : (G[c.ico] || "");
    return '<span class="ar-ico ar-ico--' + (c.tone === "red" ? "red" : "gold") + '">' + inner + "</span>";
  }
  function cardHTML(c) {
    var sub = c.sub ? '<span class="ar-card__sub">' + esc(c.sub) + "</span>" : "";
    var link = c.link ? '<button type="button" class="ar-card__link">' + esc(c.link) + ' <span class="ar-arr" aria-hidden="true">&rarr;</span></button>' : "";
    return '<div class="ar-card ar-card--iconL" style="left:' + c.cx + "%;top:" + c.cy + '%">' +
      icoHTML(c) +
      '<span class="ar-card__kicker">' + esc(c.kicker) + "</span>" +
      '<span class="ar-card__name">' + esc(c.name) + "</span>" +
      sub + link +
      "</div>";
  }
  function compassHTML(cx, cy) {
    return '<svg class="ar-compass" style="left:' + cx + "%;top:" + cy + '%" viewBox="0 0 100 100" aria-hidden="true">' +
      '<circle cx="50" cy="50" r="30"/><circle cx="50" cy="50" r="14"/>' +
      '<path d="M50 6 L50 94 M6 50 L94 50"/>' +
      '<path d="M50 20 L62 50 L50 80 L38 50 Z"/>' +
      "</svg>";
  }

  function render() {
    var connLines = CONN.map(function (k) {
      return '<line x1="' + k.f[0] + '" y1="' + k.f[1] + '" x2="' + k.t[0] + '" y2="' + k.t[1] + '"/>' +
             '<circle cx="' + k.t[0] + '" cy="' + k.t[1] + '" r="2.4"/>';
    }).join("");
    var compasses = CARDS.filter(function (c) { return c.corner; }).map(function (c) { return compassHTML(c.cx, c.cy); }).join("");
    var cards = CARDS.map(cardHTML).join("");

    return '' +
      '<div class="arcana-result" data-arcana-result>' +
      '<header class="ar-top">' +
        '<button type="button" class="ar-back" data-view-to="menu">&larr; Back to archive</button>' +
        '<div class="ar-top__mid"><span class="ar-top__crown">' + G.crown + "</span><span>Arcana Readings</span></div>" +
        '<div class="ar-top__right"><button type="button">View record</button><span>&middot;</span><button type="button">Settings</button></div>' +
      "</header>" +
      '<div class="ar-head">' +
        '<h1 class="ar-title">The Armor Received</h1>' +
        '<p class="ar-sub">Each reading has taken its place.<br>The record is now worn.</p>' +
      "</div>" +
      // The Kingdom Threshold — a quiet mystical horizon between the world/kingdom
      // above and the equipped armour-record below. Reserved as a future gateway
      // to the seeker's kingdom/profile (the centre gate can become clickable).
      '<div class="ar-threshold">' +
        '<span class="ar-threshold__line ar-threshold__line--l"></span>' +
        '<button type="button" class="ar-threshold__gate" data-ar-kingdom aria-label="View kingdom">' +
          '<svg class="ar-threshold__sigil" viewBox="0 0 30 16" aria-hidden="true"><path d="M8 8 L8 4.6 L11 6.3 L15 3 L19 6.3 L22 4.6 L22 8" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/><path d="M4 11.6 Q15 8.8 26 11.6" fill="none" stroke="currentColor" stroke-width="1"/></svg>' +
          '<span class="ar-threshold__label">View kingdom</span>' +
        "</button>" +
        '<span class="ar-threshold__line ar-threshold__line--r"></span>' +
      "</div>" +
      '<div class="ar-canvas">' +
        '<svg class="ar-ring" viewBox="0 0 1000 616" preserveAspectRatio="none" aria-hidden="true">' +
          '<ellipse cx="500" cy="320" rx="410" ry="270"/>' +
          '<path d="M70 308 L84 320 L70 332 M916 308 L930 320 L916 332"/>' +
        "</svg>" +
        compasses +
        '<svg class="ar-conn" viewBox="0 0 1000 616" preserveAspectRatio="none" aria-hidden="true">' + connLines + "</svg>" +
        '<img class="ar-figure" src="assets/arcana/armor-figure.png" alt="The armour, each reading in its place" />' +
        cards +
        '<button type="button" class="ar-verdict" data-ar-verdict>View full verdict <span class="ar-arr" aria-hidden="true">&rarr;</span></button>' +
      "</div>" +
      '<p class="ar-foot">The armor holds. The journey begins.</p>' +
      "</div>";
  }

  function wire(host) {
    var root = host.querySelector(".arcana-result");
    if (!root) return;
    // Verdict pages aren't built yet — the links are inert placeholders for now.
    root.addEventListener("click", function (e) {
      var l = e.target.closest && e.target.closest(".ar-card__link, [data-ar-verdict]");
      if (l && !l.hasAttribute("data-view-to")) { /* reserved: open the per-reading verdict / full verdict */ }
    });
  }

  window.BRArcanaResult = { mount: function (host) { host.innerHTML = render(); wire(host); } };
})();
