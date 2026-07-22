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

  // "2026-07-09" -> "9 July 2026" — filed-date format for the crown's museum label.
  function fmtDate(iso) {
    var M = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var p = String(iso == null ? "" : iso).split("-");
    if (p.length !== 3) return iso || "";
    var m = +p[1], d = +p[2];
    if (!m || !d || m < 1 || m > 12) return iso;
    return d + " " + M[m - 1] + " " + (+p[0]);
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
    // Rings section is only the "read for someone" box now (no example rings).
    // The Vault is minted-card slots only — empty until minting is live (real vault not built).
    vault_slots: 4,
    // What the Showcase can feature: the seeker's OWN reading results, and minted cards.
    reading_results: [
      { kind: "Reading", name: "The Twice-Kindled Founder" },
      { kind: "Sun sign", name: "Aries" },
      { kind: "Year animal", name: "Snake" },
      { kind: "Life path", name: "Life Path 7" },
      { kind: "Tarot", name: "The Emperor" }
    ],
    minted_cards: [],   // none yet — the Vault is not open
    showcase: [
      { id: "s1", chosen: null },
      { id: "s2", chosen: null },
      { id: "s3", chosen: null }
    ],
    friends: [
      { name: "Ingrid", av: "I", crown: "The Deep-Tided Weaver", sees: "friends" },
      { name: "Mikkel", av: "M", crown: "no crown yet", sees: "everyone" }
    ]
  };

  /* ---- glyphs ---- */
  var VSEAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M12 2.5 L20 7 L20 17 L12 21.5 L4 17 L4 7 Z"/><circle cx="12" cy="11" r="2.1"/><path d="M12 13.1 L12 16.4"/></svg>';
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

  /* the identity name's treatment — WHITE letters with a black "oil / ink" edge that
     ripples and bounces ever so slightly around the glyphs. Animated turbulence displaces
     the RIM only (dilated-alpha minus alpha), so the letters themselves stay crisp/readable. */
  var OIL_DEFS = '<svg class="pf-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs>' +
    '<filter id="pfOil" x="-16%" y="-45%" width="132%" height="190%" color-interpolation-filters="sRGB">' +
      '<feTurbulence type="fractalNoise" baseFrequency="0.015 0.021" numOctaves="2" seed="8" result="noise">' +
        '<animate attributeName="baseFrequency" dur="7s" values="0.015 0.021;0.023 0.014;0.015 0.021" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1"/>' +
      '</feTurbulence>' +
      '<feMorphology in="SourceAlpha" operator="dilate" radius="1.5" result="fat"/>' +
      '<feComposite in="fat" in2="SourceAlpha" operator="out" result="rim"/>' +
      '<feDisplacementMap in="rim" in2="noise" scale="4.5" xChannelSelector="R" yChannelSelector="G" result="rimMoved"/>' +
      '<feFlood flood-color="#050507" result="ink"/>' +
      '<feComposite in="ink" in2="rimMoved" operator="in" result="oilEdge"/>' +
      '<feMerge><feMergeNode in="oilEdge"/><feMergeNode in="SourceGraphic"/></feMerge>' +
    '</filter></defs></svg>';

  /* ---------- masthead (§3.1) — room doors, above the surface box ---------- */
  function headerHTML() {
    // Room-nav is consolidated into the in-body "The Rooms" doors block below; the
    // masthead keeps only the wordmark — a quiet door back to the Main Menu.
    return '<header class="pf-top">' +
      '<a class="pf-wordmark" href="#" data-door="menu" aria-label="Main Menu" title="Main Menu"><span class="pf-wordmark__mark" aria-hidden="true">&#9670;</span> Blue&nbsp;Room</a>' +
      '</header>';
  }

  /* ---------- the hero — identity name + crown, LEFT-aligned, above the Rings ---------- */
  function surfaceHTML() {
    var c = SEEKER.crown_record, taken = c && c.result_count > 0;
    var points = 3 + (c ? c.inputs_provided.length : 0), gems = c ? c.result_count : 0;

    var id = '<div class="pf-id">' +
      '<span class="pf-id__av" aria-hidden="true">' + esc(SEEKER.avatar) + '</span>' +
      '<span class="pf-id__txt">' +
        '<span class="pf-id__bearer">' + esc(SEEKER.display_name) + '</span>' +
        '<span class="pf-id__handle">' + esc(SEEKER.handle) +
          (SEEKER.birth ? '<span class="pf-id__born"> · ' + esc(SEEKER.place) + ' · ' + esc(SEEKER.birth) + '</span>' : '') +
        '</span>' +
      '</span></div>';

    // the assembled name — the artifact, the largest type on the page (oil-edge treatment).
    // The spine (the systems that composed it) drops beneath as quiet mono provenance.
    var crownname = (taken && c.name)
      ? '<div class="pf-crownname">' +
          '<h1 class="pf-id__name">' + esc(c.name) + '</h1>' +
          (c.spine ? '<p class="pf-crownname__spine">' + esc(c.spine) + '</p>' : '') +
        '</div>'
      : '';

    // the Crown — the reading button; "Open this reading" IS the full arcana result page.
    // No profile-side redraw: to get a new reading, draw one from the Arcana Room.
    var crown;
    // the crown as a single-object museum display: its own centered band, lit,
    // enlarged, with the caption BELOW it and nothing crowding either side.
    if (taken) {
      crown = '<div class="pf-crownstage">' +
        '<button type="button" class="pf-crownbtn" data-open-reading="' + esc(c.reading_id) + '" aria-label="Open your Arcana reading">' +
          crownSVG(points, gems, { cls: "pf-crown-svg", aria: "Crown holding " + gems + " readings" }) +
        '</button>' +
        '<div class="pf-crownstage__cap">' +
          '<p class="pf-prov">' + gems + ' gems set — one for each reading it holds.</p>' +
          '<p class="pf-crownstage__filed">Filed ' + esc(fmtDate(c.created_at)) + ' &middot; ' + esc(c.reading_id) + '</p>' +
          '<a class="pf-openreading pf-openreading--lg" href="#" data-open-reading="' + esc(c.reading_id) + '">Open this reading &rarr;</a>' +
        '</div></div>';
    } else {
      crown = '<div class="pf-crownstage">' +
        '<button type="button" class="pf-crownbtn pf-crownbtn--empty pf-paid" data-draw="self" data-intent="new" aria-label="Draw your Arcana reading">' +
          '<span class="pf-crown-empty">No crown yet<br>draw a reading</span>' +
        '</button>' +
        '<div class="pf-crownstage__cap">' +
          '<p class="pf-prov">A crown is earned by taking a reading — it gains a gem for each reading it holds.</p>' +
          '<a class="pf-openreading pf-openreading--lg pf-paid" href="#" data-draw="self" data-intent="new">Draw your Arcana &middot; $4.99 &rarr;</a>' +
        '</div></div>';
    }

    return '<section class="pf-surface">' + id + crownname + crown + '</section>';
  }

  /* ---------- Rings — family + friend crowns (§3.4) ---------- */
  var RELATIONS = ["Mother", "Father", "Sister", "Brother", "Grandmother", "Grandfather", "Aunt", "Uncle", "Cousin", "Partner", "Child", "Friend"];

  function ringsHTML() {
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
      "A ring is earned by reading for someone close — none set yet.",
      '<div class="pf-family">' + add + '</div>');
  }

  function vaultHTML() {
    var cards = SEEKER.minted_cards.map(function (m) {
      return '<div class="pf-card"><span class="pf-card__art" aria-hidden="true">' + VSEAL + '</span>' +
        '<span class="pf-card__cap"><span class="pf-card__k">' + esc(m.kind) + '</span>' +
        '<span class="pf-card__n">' + esc(m.name) + '</span></span></div>';
    }).join("");
    // Empty state is one calm line (the lede) — no ghost slots. Cards appear when minting is live.
    var body = cards ? '<div class="pf-vault"><div class="pf-cards">' + cards + '</div></div>' : "";
    return section("The Vault", "not open yet",
      "Your minted cards are filed here — nothing has been minted yet. The Vault opens once minting begins.",
      body);
  }

  function pickOpt(id, o) {
    return '<button type="button" class="pf-pickopt" role="menuitem" data-show-choose="' + id + '" data-ck="' + esc(o.kind) + '" data-cn="' + esc(o.name) + '">' +
      '<span class="pf-pickopt__k">' + esc(o.kind) + '</span><span class="pf-pickopt__n">' + esc(o.name) + '</span></button>';
  }
  function pickMenu(id) {
    var readOpts = SEEKER.reading_results.map(function (o) { return pickOpt(id, o); }).join("");
    var mintOpts = SEEKER.minted_cards.length
      ? SEEKER.minted_cards.map(function (o) { return pickOpt(id, o); }).join("")
      : '<p class="pf-pickempty">No minted cards yet — the Vault is not open.</p>';
    return '<div class="pf-pickmenu" role="menu" aria-label="Choose what to feature" hidden>' +
      '<div class="pf-pickmenu__h">From your reading</div>' +
      '<div class="pf-pickmenu__grid">' + readOpts + '</div>' +
      '<div class="pf-pickmenu__h">Minted cards</div>' + mintOpts +
    '</div>';
  }
  function showcaseHTML() {
    // Show the filled picks, then ONE quiet invite slot — never a grid of cloned
    // empty boxes (the Vault's own subtraction discipline, applied here too).
    var out = SEEKER.showcase.filter(function (s) { return s.chosen; }).map(function (s) {
      return '<div class="pf-slotwrap" data-slot="' + s.id + '">' +
        '<button type="button" class="pf-slot pf-slot--filled" data-showpick="' + s.id + '" aria-haspopup="menu" aria-expanded="false">' +
          '<span class="pf-slot__kind">' + esc(s.chosen.kind) + '</span>' +
          '<span class="pf-slot__t">' + esc(s.chosen.name) + '</span>' +
          '<span class="pf-slot__change">change &rsaquo;</span></button>' +
        pickMenu(s.id) + '</div>';
    });
    var next = SEEKER.showcase.filter(function (s) { return !s.chosen; })[0];
    if (next) {
      out.push('<div class="pf-slotwrap" data-slot="' + next.id + '">' +
        '<button type="button" class="pf-slot pf-slot--empty" data-showpick="' + next.id + '" aria-haspopup="menu" aria-expanded="false">' +
          '<span class="pf-slot__plus" aria-hidden="true">+</span>' +
          '<span class="pf-slot__hint">Feature a result<br>or a minted card</span></button>' +
        pickMenu(next.id) + '</div>');
    }
    return section("Showcase", null,
      "Feature what you choose — a result from your reading, or a minted card. Choose a slot to fill it.",
      '<div class="pf-show">' + out.join("") + '</div>');
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

  // The Rooms — the hub's purpose: a labelled door to every room, each with a
  // deadpan one-line descriptor. (The Vault has its own section above, so it is
  // not repeated here.) Commerce is not shown on the hub — price lives in the room.
  function roomsHTML() {
    var rooms = [
      ["arcane", "The Arcana Room", "Where a new reading is drawn"],
      ["drawing-room", "The Drawing Room", "Where cards are cut and filed"],
      ["reading", "The Reading", "Your draw, laid out in full"],
      ["codex", "The Codex", "The archive of meanings"]
    ];
    var rows = rooms.map(function (r) {
      return '<a class="pf-roomdoor" href="#" data-door="' + r[0] + '">' +
        '<span class="pf-roomdoor__n">' + esc(r[1]) + '</span>' +
        '<span class="pf-roomdoor__d">' + esc(r[2]) + '</span>' +
        '<span class="pf-roomdoor__arr" aria-hidden="true">&rarr;</span></a>';
    }).join("");
    return section("The Rooms", null, "Every room in the archive — one door each.",
      '<div class="pf-rooms">' + rows + '</div>');
  }

  // referral is a single door, not a section
  function referralHTML() {
    return '<a class="pf-doorbar pf-doorbar--referral" href="#" data-action="referral">' +
      '<span class="pf-doorbar__seal">' + SHARE + '</span>' +
      '<span class="pf-doorbar__txt"><span class="pf-doorbar__t">Share Blue Room</span>' +
      '<span class="pf-doorbar__s">A quiet door to the referral programme — not open yet.</span></span>' +
      '<span class="pf-doorbar__arr" aria-hidden="true">&rarr;</span></a>';
  }

  function section(title, note, lede, body) {
    return '<section class="pf-sec">' +
      '<h2 class="pf-sec__h">' + esc(title) + (note ? '<span class="pf-sec__note">' + esc(note) + '</span>' : "") + '</h2>' +
      (lede ? '<p class="pf-lede">' + esc(lede) + '</p>' : "") + body + '</section>';
  }

  function render() {
    return '<div class="pf">' + CROWN_DEFS + OIL_DEFS +
      headerHTML() +
      '<div class="pf-wrap">' +
        surfaceHTML() +
        ringsHTML() +
        vaultHTML() +
        showcaseHTML() +
        friendsHTML() +
        roomsHTML() +
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
      root.querySelectorAll(".pf-pickmenu").forEach(function (m) {
        if (m === except) return;
        m.hidden = true;
        var t = m.parentNode.querySelector("[data-showpick]"); if (t) t.setAttribute("aria-expanded", "false");
      });
      root.querySelectorAll(".pf-relmenu").forEach(function (m) {
        if (m === except) return;
        m.hidden = true;
        var t = m.parentNode.querySelector("[data-relpick]"); if (t) t.setAttribute("aria-expanded", "false");
      });
    }

    root.addEventListener("click", function (ev) {
      var el = ev.target.closest("[data-door],[data-draw],[data-open-reading],[data-showpick],[data-show-choose],[data-action],[data-relpick],[data-rel-choice]");
      if (!el) { closeMenus(null); return; }

      if (el.hasAttribute("data-door")) {
        ev.preventDefault();
        var d = el.getAttribute("data-door");
        if (d === "menu") { if (inApp()) location.href = location.pathname; else note(root, "Returns to the main menu. (Inert in preview.)"); }
        else if (d === "codex") { if (inApp()) location.href = "codex.html"; else note(root, "Opens the Codex. (Inert in preview.)"); }
        else if (d === "arcane") toInput("", "Opens the Arcana Room. (Inert in preview.)");
        else if (d === "drawing-room") { if (inApp()) location.href = "?dev=drawing-room"; else note(root, "Opens the Drawing Room — the tarot room. (Inert in preview.)"); }
        else if (d === "ceremony") { if (inApp()) location.href = "?dev=ceremony"; else note(root, "Opens the Ceremony — the arcana forge. (Inert in preview.)"); }
        else if (d === "reading") { if (inApp()) location.href = "?dev=arcana-reading"; else note(root, "Opens your reading, laid out. (Inert in preview.)"); }
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

      // Showcase — open a slot's picker (your reading results + minted cards)
      if (el.hasAttribute("data-showpick")) {
        ev.preventDefault();
        var pm = el.parentNode.querySelector(".pf-pickmenu");
        var willOpen = pm.hidden;
        closeMenus(willOpen ? pm : null);
        pm.hidden = !willOpen;
        el.setAttribute("aria-expanded", String(willOpen));
        return;
      }
      // a result/card chosen → set it in that slot, re-render the Showcase section
      if (el.hasAttribute("data-show-choose")) {
        ev.preventDefault();
        var sid = el.getAttribute("data-show-choose");
        var slot = SEEKER.showcase.filter(function (x) { return x.id === sid; })[0];
        if (slot) slot.chosen = { kind: el.getAttribute("data-ck"), name: el.getAttribute("data-cn") };
        closeMenus(null);
        var sec = el.closest(".pf-sec");
        if (sec) { var tmp = document.createElement("div"); tmp.innerHTML = showcaseHTML(); sec.replaceWith(tmp.firstChild); }
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
