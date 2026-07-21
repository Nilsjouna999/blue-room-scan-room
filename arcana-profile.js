/* =============================================================
   THE PROFILE / HUB (?dev=profile) — window.BRArcanaProfile

   The hub of the whole product. Two zones:
     ABOVE GROUND — a self-contained "surface world" box: the crown-monument,
       its bearer, and a gold Kingdom-Threshold horizon sealing its base.
     UNDERGROUND — the content sections, each an open L-bracket ledger panel
       (spine + gold top-rule + folder-tab heading), clearly contained.

   Static design surface — mock data, no backend, no payment. Commerce lives in
   the Arcana Room, not here: the hub is DOORS to every room (Main Menu, Arcana
   Room, Codex, Vault) + free "Open this reading" portals. No hub-side price,
   modal, or violet remains.

   Canon: near-black archive, Cormorant + IBM Plex Mono, four-register colour law
   (gold + warm-grey here; violet reserved for commerce, absent by design). The
   ONE exception: a red/purple liquid-flame HALO around the identity — a cosmetic
   avatar-frame flair layer (like a Steam frame), deliberately outside the content
   law. Exposes window.BRArcanaProfile.
============================================================= */
(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ---- MOCK seeker ---- */
  var SEEKER = {
    display_name: "Antton Aikio",
    handle: "@antton",
    avatar: "A",
    birth: "9 April 2001",
    place: "Inari, Finland",
    crown_record: {
      reading_id: "BR-3F9A2C",
      name: "The Twice-Kindled Founder",
      spine: "Aries · Snake · Life Path 7",
      inputs_provided: ["name", "birth date", "birthplace"],
      result_count: 3, created_at: "2026-07-09", is_current: true
    },
    ring_crowns: [
      { relation: "mother", reading_id: "BR-77B1", result_count: 5, label: "The Deep-Rooted Keeper" },
      { relation: "brother", reading_id: "BR-22E0", result_count: 2, label: "The Quick-Kindled Scout" }
    ],
    vault_mints: [
      { kind: "card", name: "Aries · the Ram", reading_id: "BR-3F9A2C" },
      { kind: "card", name: "Snake · Fire", reading_id: "BR-3F9A2C" },
      { kind: "card", name: "The Ram · plate", reading_id: "BR-3F9A2C" }
    ],
    showcase: [
      { id: "crown", kind: "The Crown", title: "The Twice-Kindled Founder", desc: "The current reading, held at the head of the profile.", vis: "everyone" },
      { id: "ppcard", kind: "Profile card", title: "Aries · the Ram", desc: "A minted card set as the profile face.", vis: "friends" },
      { id: "card2", kind: "Vault card", title: "Snake · Fire", desc: "A favourite mint from the Vault.", vis: "none" }
    ],
    friends: [
      { name: "Ingrid", av: "I", crown: "The Deep-Tided Weaver", sees: "friends" },
      { name: "Mikkel", av: "M", crown: "no crown yet", sees: "everyone" }
    ]
  };

  var VISLABEL = { everyone: "Everyone", friends: "Friends", none: "No one" };
  var VIS = ["everyone", "friends", "none"];

  /* ---- glyphs ---- */
  var VSEAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M12 2.5 L20 7 L20 17 L12 21.5 L4 17 L4 7 Z"/><circle cx="12" cy="11" r="2.1"/><path d="M12 13.1 L12 16.4"/></svg>';
  // Kingdom-Threshold crown-gate sigil (the hub's ground-gate + the reading portal seal)
  var GATE = '<svg viewBox="0 0 30 16" aria-hidden="true"><path d="M8 8 L8 4.6 L11 6.3 L15 3 L19 6.3 L22 4.6 L22 8" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/><path d="M4 11.6 Q15 8.8 26 11.6" fill="none" stroke="currentColor" stroke-width="1"/></svg>';
  var SHARE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><circle cx="6" cy="12" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="18" cy="18" r="2.4"/><path d="M8.2 10.9 L15.8 7.1 M8.2 13.1 L15.8 16.9"/></svg>';
  /* ---- forged heraldic crown — the ONE object with object-depth (DESIGN_TOKENS /
     GOLDEN_NUGGETS #10). A solid gold body (gradient = struck metal), finial balls,
     and GEMS set in the band = readings held. Gradients defined once in CROWN_DEFS. ---- */
  function crownSVG(points, gems, opts) {
    opts = opts || {};
    var W = 200, H = 150, left = 26, right = 174, span = right - left;
    var bandTop = 96, bandBot = 122;                 // struck band, 26 tall
    var n = Math.max(3, points), mid = (n - 1) / 2, i, s = "", tips = [];
    // outer silhouette (band + points) as one filled body
    var d = "M" + left + " " + bandBot + " L" + left + " " + bandTop;
    for (i = 0; i < n; i++) {
      var xt = left + span * ((i + 0.5) / n), xn = left + span * ((i + 1) / n);
      var dist = mid ? Math.abs(i - mid) / mid : 0, tipY = bandTop - (56 - dist * 22);
      d += " L" + xt.toFixed(1) + " " + tipY.toFixed(1) + " L" + xn.toFixed(1) + " " + bandTop;
      tips.push([xt, tipY]);
    }
    d += " L" + right + " " + bandBot + " Z";
    s += '<path d="' + d + '" fill="url(#pfCrownFill)" stroke="#5f481f" stroke-width="1.1" stroke-linejoin="round"/>';
    // engraved band separator + lit lower rail + upper sheen
    s += '<path d="M' + left + ' ' + bandTop + ' L' + right + ' ' + bandTop + '" stroke="#6e5426" stroke-width="1" opacity=".7"/>';
    s += '<path d="M' + (left + 2) + ' ' + (bandBot - 2.5) + ' L' + (right - 2) + ' ' + (bandBot - 2.5) + '" stroke="url(#pfCrownEdge)" stroke-width="1.4" opacity=".85"/>';
    s += '<path d="M' + (left + 3) + ' ' + (bandTop + 3) + ' L' + (right - 3) + ' ' + (bandTop + 3) + '" stroke="#f3dca0" stroke-width="1" opacity=".26"/>';
    // finial balls at every point
    for (i = 0; i < n; i++) {
      var bx = tips[i][0], by = tips[i][1];
      s += '<circle cx="' + bx.toFixed(1) + '" cy="' + (by - 3).toFixed(1) + '" r="3.1" fill="url(#pfCrownBall)" stroke="#5f481f" stroke-width=".5"/>';
      s += '<circle cx="' + (bx - 0.9).toFixed(1) + '" cy="' + (by - 4).toFixed(1) + '" r=".8" fill="#fff2cf" opacity=".85"/>';
    }
    // gems set in the band centre — one per reading held
    var G = Math.max(0, gems), cy = (bandTop + bandBot) / 2 + 1;
    for (i = 0; i < G; i++) {
      var gx = left + span * ((i + 0.5) / Math.max(G, 1));
      s += '<path d="M' + gx.toFixed(1) + ' ' + (cy - 3.7) + ' L' + (gx + 3.1).toFixed(1) + ' ' + cy + ' L' + gx.toFixed(1) + ' ' + (cy + 3.7) + ' L' + (gx - 3.1).toFixed(1) + ' ' + cy + ' Z" fill="url(#pfGem)" stroke="#5c3a12" stroke-width=".6"/>';
      s += '<circle cx="' + (gx - 0.8).toFixed(1) + '" cy="' + (cy - 1).toFixed(1) + '" r=".8" fill="#fff2cf" opacity=".9"/>';
    }
    return '<svg' + (opts.cls ? ' class="' + opts.cls + '"' : "") + ' viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(opts.aria || "Crown holding " + G + " readings") + '">' + s + '</svg>';
  }

  /* gradients for the forged crown — struck-metal body, ball highlight, gem, lit rail */
  var CROWN_DEFS = '<svg class="pf-defs" width="0" height="0" aria-hidden="true" focusable="false">' +
    '<linearGradient id="pfCrownFill" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#c8ad70"/><stop offset=".52" stop-color="#a2864a"/><stop offset="1" stop-color="#5f471f"/></linearGradient>' +
    '<linearGradient id="pfCrownBall" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#d3ba80"/><stop offset="1" stop-color="#8b6f31"/></linearGradient>' +
    '<linearGradient id="pfCrownEdge" x1="0" y1="0" x2="1" y2="0">' +
      '<stop offset="0" stop-color="#5f471f"/><stop offset=".5" stop-color="#bb9d5d"/><stop offset="1" stop-color="#5f471f"/></linearGradient>' +
    '<radialGradient id="pfGem" cx=".4" cy=".34" r=".85">' +
      '<stop offset="0" stop-color="#dcc38b"/><stop offset=".45" stop-color="#ab8646"/><stop offset="1" stop-color="#563914"/></radialGradient>' +
    '</svg>';

  /* the arcana name's living treatment — warm off-white letters with slow black
     "nitrogen currents" whipping inside, clipped to the glyphs. Ported from the
     client's "White letters, black nitrogen" artifact; flood warmed to the canon. */
  var NITRO_DEFS = '<svg class="pf-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs>' +
    '<filter id="pfNitro" x="-6%" y="-90%" width="112%" height="280%" color-interpolation-filters="sRGB">' +
      '<feFlood flood-color="#ece7db" result="whiteBase"/>' +
      '<feTurbulence type="fractalNoise" baseFrequency="0.012 0.09" numOctaves="2" seed="11" stitchTiles="stitch" x="0" y="0" width="900" height="180" result="noise1"/>' +
      '<feColorMatrix in="noise1" type="luminanceToAlpha" result="lum1"/>' +
      '<feComponentTransfer in="lum1" result="mask1"><feFuncA type="linear" slope="3.6" intercept="-1.85"/></feComponentTransfer>' +
      '<feOffset in="mask1" dx="0" dy="0" result="cur1"><animate attributeName="dx" values="0;900;0" dur="8s" repeatCount="indefinite" calcMode="linear"/></feOffset>' +
      '<feTurbulence type="fractalNoise" baseFrequency="0.01 0.07" numOctaves="2" seed="17" stitchTiles="stitch" x="0" y="0" width="900" height="180" result="noise2"/>' +
      '<feColorMatrix in="noise2" type="luminanceToAlpha" result="lum2"/>' +
      '<feComponentTransfer in="lum2" result="mask2"><feFuncA type="linear" slope="3.6" intercept="-1.9"/></feComponentTransfer>' +
      '<feOffset in="mask2" dx="0" dy="0" result="cur2"><animate attributeName="dx" values="0;-900;0" dur="11s" repeatCount="indefinite" calcMode="linear"/></feOffset>' +
      '<feTurbulence type="fractalNoise" baseFrequency="0.006 0.05" numOctaves="2" seed="23" stitchTiles="stitch" x="0" y="0" width="900" height="180" result="noise3"/>' +
      '<feColorMatrix in="noise3" type="luminanceToAlpha" result="lum3"/>' +
      '<feComponentTransfer in="lum3" result="mask3pre"><feFuncA type="linear" slope="3.2" intercept="-1.65"/></feComponentTransfer>' +
      '<feComponentTransfer in="mask3pre" result="mask3"><feFuncA type="linear" slope="0.6" intercept="0"/></feComponentTransfer>' +
      '<feOffset in="mask3" dx="0" dy="0" result="cur3base"><animate attributeName="dy" values="0;180;0" dur="14s" repeatCount="indefinite" calcMode="linear"/></feOffset>' +
      '<feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="1" seed="5" result="curl"/>' +
      '<feMerge result="currentsMerged"><feMergeNode in="cur3base"/><feMergeNode in="cur2"/><feMergeNode in="cur1"/></feMerge>' +
      '<feDisplacementMap in="currentsMerged" in2="curl" scale="9" xChannelSelector="R" yChannelSelector="G" result="currentsCurled"/>' +
      '<feTurbulence type="turbulence" baseFrequency="0.003 0.12" numOctaves="1" seed="29" stitchTiles="stitch" x="0" y="0" width="900" height="180" result="whipNoise"/>' +
      '<feColorMatrix in="whipNoise" type="luminanceToAlpha" result="whipLum"/>' +
      '<feComponentTransfer in="whipLum" result="whipShaped"><feFuncA type="linear" slope="0.05" intercept="-0.03">' +
        '<animate attributeName="slope" values="0.05;0.05;5.9;0.05;0.05" keyTimes="0;0.80;0.86;0.92;1" dur="7s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0.2 0 0 1;0.3 0 0.6 1;0.4 0 0.2 1"/>' +
        '<animate attributeName="intercept" values="-0.03;-0.03;-2.24;-0.03;-0.03" keyTimes="0;0.80;0.86;0.92;1" dur="7s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0.2 0 0 1;0.3 0 0.6 1;0.4 0 0.2 1"/>' +
      '</feFuncA></feComponentTransfer>' +
      '<feOffset in="whipShaped" dx="-300" result="whipMoved"><animate attributeName="dx" values="-300;-300;500;500" keyTimes="0;0.80;0.92;1" dur="7s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0.16 1 0.3 1;0.4 0 0.2 1"/></feOffset>' +
      '<feMorphology in="whipMoved" operator="dilate" radius="0" result="whipFat"><animate attributeName="radius" values="0;0;0.8;0;0" keyTimes="0;0.80;0.86;0.92;1" dur="7s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0.2 0 0 1;0.3 0 0.6 1;0.4 0 0.2 1"/></feMorphology>' +
      '<feMerge result="blackEffect"><feMergeNode in="currentsCurled"/><feMergeNode in="whipFat"/></feMerge>' +
      '<feComposite in="blackEffect" in2="whiteBase" operator="over" result="paintedRect"/>' +
      '<feComposite in="paintedRect" in2="SourceAlpha" operator="in"/>' +
    '</filter></defs></svg>';

  /* ---- a ring (not a crown) for each person in the Rings section; gems set in the band = readings ---- */
  function ringSVG(readings, opts) {
    opts = opts || {};
    var cx = 50, cy = 52, r = 27, sw = 6.5, i, s = "";
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="url(#pfCrownEdge)" stroke-width="' + sw + '"/>';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r + sw / 2 - 0.5) + '" fill="none" stroke="#5f471f" stroke-width=".6" opacity=".55"/>';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r - sw / 2 + 0.5) + '" fill="none" stroke="#5f471f" stroke-width=".6" opacity=".55"/>';
    var G = Math.max(0, readings), spread = Math.min(G, 7), arc = Math.PI * 0.92;
    for (i = 0; i < spread; i++) {
      var t = spread > 1 ? i / (spread - 1) : 0.5;
      var ang = -Math.PI / 2 - arc / 2 + arc * t;
      var gx = cx + r * Math.cos(ang), gy = cy + r * Math.sin(ang);
      s += '<path d="M' + gx.toFixed(1) + ' ' + (gy - 2.8).toFixed(1) + ' L' + (gx + 2.3).toFixed(1) + ' ' + gy.toFixed(1) + ' L' + gx.toFixed(1) + ' ' + (gy + 2.8).toFixed(1) + ' L' + (gx - 2.3).toFixed(1) + ' ' + gy.toFixed(1) + ' Z" fill="url(#pfGem)" stroke="#4a300f" stroke-width=".5"/>';
    }
    return '<svg' + (opts.cls ? ' class="' + opts.cls + '"' : "") + ' viewBox="0 0 100 104" role="img" aria-label="' + esc(opts.aria || "Ring holding " + G + " readings") + '">' + s + '</svg>';
  }

  /* ---------- masthead (§3.1) — room doors, above the surface box ---------- */
  function headerHTML() {
    var doors = [["arcane", "The Arcana Room"], ["codex", "The Codex"], ["vault", "The Vault"]];
    return '<header class="pf-top">' +
      '<a class="pf-wordmark" href="#" data-door="menu" aria-label="Main Menu" title="Main Menu"><span class="pf-wordmark__mark" aria-hidden="true">&#9670;</span> Blue&nbsp;Room</a>' +
      '<nav class="pf-doors" aria-label="Wayfinding">' +
        doors.map(function (d) { return '<a class="pf-door" href="#" data-door="' + d[0] + '">' + esc(d[1]) + '</a>'; }).join("") +
      '</nav></header>';
  }

  /* ---------- ABOVE GROUND — the surface-world box ---------- */
  function horizonHTML() {
    return '<div class="pf-horizon" aria-hidden="true">' +
      '<span class="pf-horizon__line pf-horizon__line--l"></span>' +
      '<span class="pf-horizon__gate">' + GATE + '</span>' +
      '<span class="pf-horizon__line pf-horizon__line--r"></span></div>';
  }
  function surfaceHTML() {
    var c = SEEKER.crown_record, taken = c && c.result_count > 0;
    var points = 3 + (c ? c.inputs_provided.length : 0), gems = c ? c.result_count : 0;

    // identity — a quiet LEFT header, aligned to the section column edge
    var idBlock = '<div class="pf-id">' +
      '<span class="pf-id__av" aria-hidden="true">' + esc(SEEKER.avatar) + '</span>' +
      '<span class="pf-id__txt">' +
        '<span class="pf-id__name">' + esc(SEEKER.display_name) + '</span>' +
        '<span class="pf-id__handle">' + esc(SEEKER.handle) +
          (SEEKER.birth ? '<span class="pf-id__born"> · ' + esc(SEEKER.place) + ' · ' + esc(SEEKER.birth) + '</span>' : '') +
        '</span>' +
      '</span></div>';

    // the Crown = the reading button (placeholder art; final crown comes later, wraps this same button)
    var cluster;
    if (taken) {
      cluster = '<div class="pf-crownwrap">' +
        '<button type="button" class="pf-crownbtn" data-open-reading="' + esc(c.reading_id) + '" aria-label="Open your Arcana reading">' +
          crownSVG(points, gems, { cls: "pf-crown-svg", aria: "Crown holding " + gems + " readings" }) +
          '<span class="pf-crown-name pf-nitro">' + esc(c.name) + '</span>' +
        '</button>' +
        (c.spine ? '<p class="pf-spine">' + esc(c.spine) + '</p>' : '') +
        '<p class="pf-prov">' + gems + ' rubies set — one for each reading it holds.</p>' +
        '<div class="pf-crownacts">' +
          '<a class="pf-openreading pf-openreading--lg" href="#" data-open-reading="' + esc(c.reading_id) + '">Open this reading &rarr;</a>' +
          '<a class="pf-redraw pf-paid" href="#" data-draw="self" data-intent="redraw" data-crown="' + esc(c.name) + '">&#8635; Redraw with more marks &middot; $4.99</a>' +
        '</div></div>';
    } else {
      // no crown → the button leads to the input room, which is paid → violet
      cluster = '<div class="pf-crownwrap">' +
        '<button type="button" class="pf-crownbtn pf-crownbtn--empty pf-paid" data-draw="self" data-intent="new" aria-label="Draw your Arcana reading">' +
          '<span class="pf-crown-empty">No crown yet<br>draw a reading</span>' +
        '</button>' +
        '<p class="pf-prov">A crown is earned by taking a reading — it gains a ruby for each reading it holds.</p>' +
        '<div class="pf-crownacts"><a class="pf-openreading pf-openreading--lg pf-paid" href="#" data-draw="self" data-intent="new">Draw your Arcana &middot; $4.99 &rarr;</a></div>' +
      '</div>';
    }

    return '<section class="pf-surface">' + idBlock + cluster + horizonHTML() + '</section>';
  }

  /* ---------- Rings — family + friend crowns (§3.4) ---------- */
  var RELATIONS = ["Mother", "Father", "Sister", "Brother", "Grandmother", "Grandfather", "Aunt", "Uncle", "Cousin", "Partner", "Child", "Friend"];

  function ringsHTML() {
    var minis = SEEKER.ring_crowns.map(function (f) {
      return '<div class="pf-mini">' + ringSVG(f.result_count, { cls: "pf-mini__ring", aria: f.label }) +
        '<div class="pf-mini__rel">' + esc(f.relation) + '</div>' +
        '<div class="pf-mini__label">' + esc(f.label) + '</div>' +
        '<div class="pf-mini__n">' + f.result_count + ' rubies</div>' +
        '<div class="pf-mini__acts">' +
          '<a class="pf-openreading pf-openreading--sm" href="#" data-open-reading="' + esc(f.reading_id) + '">Open reading</a>' +
        '</div></div>';
    }).join("");
    var relOpts = RELATIONS.map(function (r) {
      return '<button type="button" class="pf-relopt" role="menuitem" data-rel-choice="' + esc(r) + '">' + esc(r) + '</button>';
    }).join("");
    var add = '<div class="pf-mini--add-wrap">' +
      '<button type="button" class="pf-mini pf-mini--add pf-paid" data-relpick aria-haspopup="menu" aria-expanded="false">' +
        '<span class="pf-mini__plus" aria-hidden="true">+</span>' +
        '<div class="pf-mini__label">Read for<br>someone</div>' +
        '<div class="pf-mini__n">choose who &rarr;</div>' +
      '</button>' +
      '<div class="pf-relmenu" role="menu" aria-label="Who is this reading for" hidden>' +
        '<div class="pf-relmenu__h">Who is this reading for?</div>' +
        '<div class="pf-relmenu__grid">' + relOpts + '</div>' +
      '</div></div>';
    return section("Rings", null,
      "The people around you — each a ring, earned by a reading done for someone close.",
      '<div class="pf-family">' + minis + add + '</div>');
  }

  function vaultHTML() {
    var cards = SEEKER.vault_mints.map(function (m) {
      return '<button type="button" class="pf-card" data-door="vault">' +
        '<span class="pf-card__art" aria-hidden="true">' + VSEAL + '</span>' +
        '<span class="pf-card__cap">' +
          '<span class="pf-card__k">' + esc(m.kind) + '</span>' +
          '<span class="pf-card__n">' + esc(m.name) + '</span>' +
        '</span></button>';
    }).join("");
    var door = '<a class="pf-doorbar" href="#" data-door="vault">' +
      '<span class="pf-doorbar__seal">' + VSEAL + '</span>' +
      '<span class="pf-doorbar__txt"><span class="pf-doorbar__t">The Vault</span>' +
      '<span class="pf-doorbar__s">Minted cards &amp; image mints · QR access</span></span>' +
      '<span class="pf-doorbar__arr" aria-hidden="true">&rarr;</span></a>';
    return section("The Vault", null, "Your minted cards and image mints, filed and addressable.",
      '<div class="pf-vault">' + door + '<div class="pf-cards">' + cards + '</div></div>');
  }

  function showcaseHTML() {
    var items = SEEKER.showcase.map(function (it) {
      var opts = VIS.map(function (v) {
        var on = it.vis === v;
        return '<button type="button" role="option" aria-selected="' + on + '" data-vis="' + it.id + '" data-visval="' + v + '">' + esc(VISLABEL[v]) + (on ? ' <span class="pf-vis__tick" aria-hidden="true">&#10003;</span>' : "") + '</button>';
      }).join("");
      return '<div class="pf-showitem">' +
        '<div class="pf-showitem__top"><span class="pf-showitem__kind">' + esc(it.kind) + '</span></div>' +
        '<div class="pf-showitem__t">' + esc(it.title) + '</div>' +
        '<div class="pf-showitem__d">' + esc(it.desc) + '</div>' +
        '<div class="pf-vis" data-visgroup="' + it.id + '">' +
          '<button type="button" class="pf-vis__toggle" data-vistoggle="' + it.id + '" aria-expanded="false" aria-haspopup="listbox">' +
            '<span class="pf-vis__eye" aria-hidden="true">&#9673;</span> Visible to <b data-vislabel="' + it.id + '">' + esc(VISLABEL[it.vis]) + '</b>' +
            '<span class="pf-vis__caret" aria-hidden="true">&#9662;</span></button>' +
          '<div class="pf-vis__menu" role="listbox" aria-label="Who can see this" hidden>' + opts + '</div>' +
        '</div></div>';
    }).join("");
    return section("Showcase", null, "Feature a card, a profile card, or your Crown. Each carries its own visibility — nothing is public beyond what you choose.",
      '<div class="pf-show">' + items + '</div>' +
      '<p class="pf-showhint">Privacy is per item, not one switch — open each to set Everyone, Friends, or No one.</p>');
  }

  function friendsHTML() {
    var rows = SEEKER.friends.map(function (f) {
      return '<a class="pf-friend" href="#" data-action="view-friend" data-name="' + esc(f.name) + '">' +
        '<span class="pf-friend__av">' + esc(f.av) + '</span>' +
        '<span class="pf-friend__n">' + esc(f.name) + '</span>' +
        '<span class="pf-friend__crown">' + esc(f.crown) + '</span>' +
        '<span class="pf-friend__vis">shows you: ' + esc(f.sees) + '</span></a>';
    }).join("");
    return section("Friends", null, "A quiet register of people — not a feed. Open a friend to see their profile and whatever their showcase permits.",
      '<div class="pf-friends">' + rows + '</div>' +
      '<button type="button" class="pf-addfriend" data-action="add-friend">+ Add a friend</button>');
  }

  // referral is a single door, not a section
  function referralHTML() {
    return '<a class="pf-doorbar pf-doorbar--referral" href="#" data-action="referral">' +
      '<span class="pf-doorbar__seal">' + SHARE + '</span>' +
      '<span class="pf-doorbar__txt"><span class="pf-doorbar__t">Share Blue Room</span>' +
      '<span class="pf-doorbar__s">A quiet door to the referral programme — its own surface, later.</span></span>' +
      '<span class="pf-doorbar__arr" aria-hidden="true">&rarr;</span></a>';
  }

  function section(title, note, lede, body) {
    return '<section class="pf-sec">' +
      '<h2 class="pf-sec__h">' + esc(title) + (note ? '<span class="pf-sec__note">' + esc(note) + '</span>' : "") + '</h2>' +
      (lede ? '<p class="pf-lede">' + esc(lede) + '</p>' : "") + body + '</section>';
  }

  function render() {
    return '<div class="pf">' + CROWN_DEFS + NITRO_DEFS +
      headerHTML() +
      '<div class="pf-wrap">' +
        surfaceHTML() +
        ringsHTML() +
        vaultHTML() +
        showcaseHTML() +
        friendsHTML() +
        referralHTML() +
        '<footer class="pf-foot">A reflective record, for insight, not instruction.<br>Nothing here is medical, legal, or financial counsel. You decide what to do with it.</footer>' +
      '</div>' +
    '</div>';
  }

  /* ---------- interactions ---------- */
  function inApp() { return /[?&]dev=/.test(location.search); }

  function wire(root) {
    function toInput(params, previewMsg) {
      if (inApp()) location.href = "?dev=arcane" + (params ? "&" + params : "");
      else note(root, previewMsg || "This would open the input room. (Inert in this standalone preview.)");
    }
    function openReading(id) {
      if (inApp()) location.href = "?dev=arcana-reading";
      else note(root, "Opens this reading (" + id + ") — free, no purchase. (Inert in this standalone preview.)");
    }
    function closeMenus(except) {
      root.querySelectorAll(".pf-vis__menu").forEach(function (m) {
        if (m === except) return;
        m.hidden = true;
        var t = m.parentNode.querySelector(".pf-vis__toggle"); if (t) t.setAttribute("aria-expanded", "false");
      });
      root.querySelectorAll(".pf-relmenu").forEach(function (m) {
        if (m === except) return;
        m.hidden = true;
        var t = m.parentNode.querySelector("[data-relpick]"); if (t) t.setAttribute("aria-expanded", "false");
      });
    }

    root.addEventListener("click", function (ev) {
      var el = ev.target.closest("[data-door],[data-draw],[data-open-reading],[data-vistoggle],[data-vis],[data-action],[data-relpick],[data-rel-choice]");
      if (!el) { closeMenus(null); return; }

      if (el.hasAttribute("data-door")) {
        ev.preventDefault();
        var d = el.getAttribute("data-door");
        if (d === "menu") { if (inApp()) location.href = location.pathname; else note(root, "Returns to the main menu. (Inert in preview.)"); }
        else if (d === "codex") { if (inApp()) location.href = "codex.html"; else note(root, "Opens the Codex. (Inert in preview.)"); }
        else if (d === "arcane") toInput("", "Opens the Arcana Room. (Inert in preview.)");
        else if (d === "vault") { if (inApp()) location.href = "?dev=vault"; else note(root, "Opens the Vault. (Inert in preview.)"); }
        return;
      }

      if (el.hasAttribute("data-open-reading")) { ev.preventDefault(); openReading(el.getAttribute("data-open-reading")); return; }

      // "Read for someone" → open the family-tree relation picker
      if (el.hasAttribute("data-relpick")) {
        ev.preventDefault();
        var relmenu = el.parentNode.querySelector(".pf-relmenu");
        var relOpen = relmenu.hidden;
        closeMenus(relOpen ? relmenu : null);
        relmenu.hidden = !relOpen;
        el.setAttribute("aria-expanded", String(relOpen));
        return;
      }
      // a relation chosen → to the input room to read for that person (paid)
      if (el.hasAttribute("data-rel-choice")) {
        ev.preventDefault();
        var rel = el.getAttribute("data-rel-choice");
        closeMenus(null);
        toInput("for=other&subject=" + encodeURIComponent(rel.toLowerCase()),
          "This would open the input room to read for your " + rel.toLowerCase() + ". (Inert in this standalone preview.)");
        return;
      }

      // every draw/redraw routes to the Arcana Room, carrying intent; commerce lives there
      if (el.hasAttribute("data-draw")) {
        ev.preventDefault();
        var who = el.getAttribute("data-draw"), intent = el.getAttribute("data-intent"), rel = el.getAttribute("data-rel");
        var params = "for=" + (who === "other" ? "other" : "self") + (intent ? "&intent=" + intent : "") + (rel ? "&subject=" + encodeURIComponent(rel) : "");
        var msg = intent === "redraw"
          ? "This would open the Arcana Room to add a richer reading — the redraw confirm and price live there. (Inert in preview.)"
          : (who === "other" ? "This would open the input room to read for someone. (Inert in preview.)"
                             : "This would open the input room to draw a new reading. (Inert in preview.)");
        toInput(params, msg);
        return;
      }

      if (el.hasAttribute("data-vistoggle")) {
        ev.preventDefault();
        var menu = el.parentNode.querySelector(".pf-vis__menu");
        var willOpen = menu.hidden;
        closeMenus(willOpen ? menu : null);
        menu.hidden = !willOpen;
        el.setAttribute("aria-expanded", String(willOpen));
        return;
      }
      if (el.hasAttribute("data-vis")) {
        ev.preventDefault();
        var id = el.getAttribute("data-vis"), val = el.getAttribute("data-visval");
        var item = SEEKER.showcase.filter(function (x) { return x.id === id; })[0];
        if (item) item.vis = val;
        var group = root.querySelector('[data-visgroup="' + id + '"]');
        group.querySelector('[data-vislabel="' + id + '"]').textContent = VISLABEL[val];
        group.querySelectorAll("[data-vis]").forEach(function (b) {
          var on = b === el;
          b.setAttribute("aria-selected", String(on));
          var tick = b.querySelector(".pf-vis__tick");
          if (on && !tick) b.insertAdjacentHTML("beforeend", ' <span class="pf-vis__tick" aria-hidden="true">✓</span>');
          if (!on && tick) tick.remove();
        });
        group.querySelector(".pf-vis__menu").hidden = true;
        group.querySelector(".pf-vis__toggle").setAttribute("aria-expanded", "false");
        return;
      }

      if (el.hasAttribute("data-action")) {
        ev.preventDefault();
        var a = el.getAttribute("data-action");
        var m = {
          "add-friend": "Add a friend by handle. (Mocked in this prototype.)",
          "view-friend": "Opening " + (el.getAttribute("data-name") || "a friend") + "'s profile — you would see only what their showcase permits. (Mocked.)",
          "referral": "The referral programme lives on its own surface, reserved here as a door. (Mocked.)"
        }[a];
        if (m) note(root, m);
        return;
      }
    });

    root.addEventListener("keydown", function (ev) { if (ev.key === "Escape") closeMenus(null); });
  }

  function note(root, text) {
    var n = root.querySelector("[data-note]");
    if (!n) {
      n = document.createElement("div");
      n.setAttribute("data-note", "");
      n.style.cssText = "position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:60;max-width:min(520px,90vw);" +
        "font-family:'IBM Plex Mono',monospace;font-size:11px;line-height:1.6;letter-spacing:.02em;color:#ece7dc;" +
        "background:rgba(14,13,11,.96);border:1px solid rgba(201,163,92,.28);border-radius:6px;padding:12px 16px;box-shadow:0 10px 30px rgba(0,0,0,.5)";
      root.appendChild(n);
    }
    n.textContent = text; n.style.opacity = "1";
    clearTimeout(note._t);
    note._t = setTimeout(function () { n.style.transition = "opacity .5s"; n.style.opacity = "0"; }, 4200);
  }

  window.BRArcanaProfile = {
    mount: function (host) {
      if (!host) return;
      host.innerHTML = render();
      wire(host);
    }
  };
})();
