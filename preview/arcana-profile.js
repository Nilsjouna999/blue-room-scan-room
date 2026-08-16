/* =============================================================
   THE PROFILE / HUB (?dev=profile) — window.BRArcanaProfile

   The hub of the whole product. Two zones:
     ABOVE GROUND — a self-contained "surface world" box: the crown-monument,
       its bearer, and a gold Kingdom-Threshold horizon sealing its base.
     UNDERGROUND — the content sections, each an open L-bracket ledger panel
       (spine + gold top-rule + folder-tab heading), clearly contained.

   Static design surface — mock data, no backend, no payment.

   BR-S384 — THE COLOUR LAW, AS IT ACTUALLY IS. These lines used to say "No hub-side
   price, modal, or violet remains" and "violet reserved for commerce, absent by
   design". Both were false and had been for some time: the empty crown shipped
   "$4.99", `vaultHTML()` emits `pf-paid` on every single visit, and the token is
   consumed at four places in the stylesheet. The four-register law is AUDITED BY
   READING THESE COMMENTS, so a false one does not merely mislead — it stops the next
   reviewer looking, or invites them to strip a register the CSS calls intentional.

   The rule, stated once and true:
     · NO PRICE ON THE HUB. Figures live in the room that charges them. The empty
       crown is now a plain door; the $4.99 it used to quote is in the Birth Reading.
     · VIOLET MARKS A DOOR THAT LEADS SOMEWHERE PAID. It is a warning, not a sale —
       the two controls wearing it (the empty crown's door, "Read for someone") both
       open onto a purchase, and saying so quietly is the opposite of a dark pattern.
   Canon otherwise: near-black archive, Cormorant + IBM Plex Mono, gold for the one
   gold object. Exposes window.BRArcanaProfile.
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

  /* ---- MOCK seeker ----
     BR-S347: this was the builder's real name, real birth date and real town,
     served on a public page as the sample profile. A mock is exactly the place a
     real identity should never be, because it is the one surface that renders
     without anyone asking it to. Neutral placeholder; the shape is unchanged. */
  var SEEKER = {
    display_name: "The Seeker",
    handle: "@seeker",
    avatar: "S",
    birth: "1 January 2000",
    place: "—",
    /* BR-S387 — READINGS ARE A LIST, and `crown_record` is a POINTER INTO IT.
       It used to be one bare object with one reading_id, an `is_current: true` that
       nothing read and nothing could be current AGAINST, and a count that implied
       siblings the page had no way to hold. Several readings is the ordinary state of
       a returning customer, so that shape scheduled a restructure of hero + Vault +
       Showcase rather than an append — and left the next backend engineer to either
       honour a flag nothing consumes or delete a field they cannot tell is
       load-bearing.
       Now: `readings` is the collection, `current_reading` names which one the crown
       and the hero speak for, and crownRecord() resolves the pointer. A second
       reading is one push. Nothing on the page changes today, which is the point —
       the shape is correct BEFORE there is data to break. */
    readings: [{
      reading_id: "BR-3F9A2C",
      name: "The Twice-Kindled Giver",
      /* ★★ BR-S498 — THE SAMPLE CONTRADICTED THE ENGINE THAT WOULD HAVE PRODUCED IT.
         The stated birth is 1 January 2000, and the shipped derivation for that date
         returns something else on all three marks. Hand-run against arcana-reading.js:
           · sunSign(1,1)      — 1 Jan is inside the Capricorn band, not Aries
           · chineseAnimal(2000) — 2000 is the Dragon; the Snake is 2001
           · lifePathNum(2000,1,1) — 2+0+0+0+0+1+0+1 = 4, which does not reduce further
         And "birth~The Seeker~2000~1~1" is the DEFAULT seed when no ?seed= is present,
         so a visitor who opened the default Birth Reading and then this sample profile
         saw two different spines for one stated identity.
         The builder's standing law for showcase data, 2026-08-16: "mathematically
         accurate not reality, its tutorial showcase". A sample may be invented; its
         arithmetic may not be wrong. */
      spine: "Capricorn · Dragon · Life Path 4",
      inputs_provided: ["name", "birth date", "birthplace"],
      /* BR-S382: was 3, which matched nothing. The Birth Reading draws SIX marks
         (astrology, the Chinese year, numerology, runes, the I Ching, and the
         hexagram) — the number the ROOMS registry and the room itself both say. A
         crown's gems are its reading's DEPTH, not a tally of readings: canon is
         "ornamentation scales with depth of the reading"
         (BR-ARCANA-HANDOFF-PROFILE-HUB-AND-DIAGRAMS.md:73). The old caption read
         "3 gems set — one for each reading it holds" beside a Vault printing one
         crown, so the largest object on the page contradicted the row below it. */
      result_count: 6, created_at: "2026-07-09"
    }],
    current_reading: "BR-3F9A2C",   // which of `readings` the crown and the hero speak for
    /* BR-S382: these two comments were both false. The Vault holds crowns AND rings,
       and `rings` below is the real field the row reads — the sentence used to be
       hardcoded. `vault_slots` is the minted register's reserve, and the Shelf is the
       whole page, not the minted section (BR-S353). */
    rings: [],          // earned by reading for someone close; none set on the mock
    vault_slots: 4,
    // What the Showcase can feature: the seeker's OWN reading results, and minted cards.
    reading_results: [
      { kind: "Reading", name: "The Twice-Kindled Giver" },
      /* BR-S498: corrected with the spine above — same three marks, same reason. */
      { kind: "Sun sign", name: "Capricorn" },
      { kind: "Year animal", name: "Dragon" },
      { kind: "Life path", name: "Life Path 4" },
      { kind: "Rune", name: "Gebo" }
    ],
    minted_cards: [],   // none yet — minting is not open
    showcase: [
      { id: "s1", chosen: null },
      { id: "s2", chosen: null },
      { id: "s3", chosen: null }
    ],
    /* BR-S347: these were real people's first names in the builder's own life,
       shown on a public page as their "friends" with a reading attached. Mock data
       is not a private notebook — every name in it is published. Placeholders. */
    friends: [
      { name: "A friend", av: "A", crown: "The Deep-Tided Weaver", sees: "friends" },
      { name: "Another",  av: "B", crown: "no crown yet", sees: "everyone" }
    ]
  };

  /* ---- WHAT THIS VISITOR ACTUALLY HOLDS ----
     BR-S375: the switch already existed and this page never read it. `br_holdings`
     is written by the M3 preview toggle and by `?holdings=1|0` (app.js:3338, 5772),
     and `SEEKER.crown_record` was served unconditionally — so the page always drew
     the OWNER's view, and the empty branch, which carries the only price on the
     page and is what every non-paying visitor sees, had never once rendered.
     Default is EMPTY, because that is what a stranger holds. */
  /* ★ BR-S522 — and the same switch still missed the one event that matters. `br_holdings`
     is builder-side only: the M3 toggle, the devnav rail, `?holdings=`. Completing a Birth
     Reading writes `br_has_reading` (arcane.js:1205) and nothing read it, so a customer who
     had just paid was shown the stranger's branch — "NO CROWN YET · DRAW A READING" — with
     the price on it. Kept in step with hasHoldings() in app.js; the two must never diverge
     again, which is why both now test the same pair. */
  function held() {
    try {
      return localStorage.getItem("br_holdings") === "1" ||
             localStorage.getItem("br_has_reading") === "1";
    } catch (e) { return false; }
  }
  /* The one accessor every branch reads — null when nothing is held. BR-S387: it now
     RESOLVES THE POINTER rather than returning a lone object. `current_reading` names
     one of `readings`; falling back to the first keeps the page honest if the pointer
     is ever stale, because a hero with no record is a blank page and a hero with the
     wrong record is a lie. */
  function crownRecord() {
    if (!held()) return null;
    var list = SEEKER.readings || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].reading_id === SEEKER.current_reading) return list[i];
    }
    return list[0] || null;
  }
  // How many readings this seeker holds — the question the old shape could not answer.
  function readingCount() { return held() ? (SEEKER.readings || []).length : 0; }

  /* The Codex door, taken from app.js's room registry rather than restated here.
     window.BR_ROOMS is published by app.js (BR-S366); the literal below is only for
     the standalone preview, where app.js never loads. See the door handler. */
  function codexHref() {
    var rooms = (typeof window !== "undefined" && window.BR_ROOMS) || [];
    for (var i = 0; i < rooms.length; i++) {
      if (rooms[i] && rooms[i].key === "codex" && rooms[i].href) return rooms[i].href;
    }
    return "codex.html";
  }

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

  /* the identity name's treatment — WHITE letters with a black "oil / ink" edge around the
     glyphs. Static turbulence displaces the RIM only (dilated-alpha minus alpha), so the
     letters stay crisp/readable. BR-S234: the ripple <animate> was dropped — a fixed
     baseFrequency keeps the ink-edge distortion at zero continuous re-raster cost. */
  var OIL_DEFS = '<svg class="pf-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs>' +
    '<filter id="pfOil" x="-16%" y="-45%" width="132%" height="190%" color-interpolation-filters="sRGB">' +
      '<feTurbulence type="fractalNoise" baseFrequency="0.019 0.018" numOctaves="2" seed="8" result="noise"/>' +
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
    // BR-S307: the wordmark alone was the ONLY exit, and a wordmark does not read as
    // a back — a first-time reader saw no way out at all (every other link here is
    // href="#"). The labelled control says so out loud. Same door, same data-door
    // handler, so there is one exit with two faces rather than two exits.
    return '<header class="pf-top">' +
      '<a class="pf-wordmark" href="#" data-door="menu" aria-label="Main Menu" title="Main Menu"><span class="pf-wordmark__mark" aria-hidden="true">&#9670;</span> Blue&nbsp;Room</a>' +
      '<a class="pf-back pf-back--top" href="#" data-door="menu">&larr; Main Menu</a>' +
      '</header>';
  }

  /* ---------- the hero — identity name + crown, LEFT-aligned, above the Rings ---------- */
  function surfaceHTML() {
    var c = crownRecord(), taken = c && c.result_count > 0;
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
    /* BR-S396 — THE ONE SENTENCE SAYING WHAT A READING CONTAINS. §10 Q9 of the brief,
       and both critiques arrived at it independently: the page has never had it. A
       visitor could read the crowned name, the spine and the gem count without ever
       being told, in one plain line, what they are looking at.
       It appears in BOTH states on purpose. Held, it names what the crown holds;
       unheld, it is the only description of the thing on offer — and since BR-S384
       took the price off this page, it is the only reason given to want one. */
    var whatItIs = '<p class="pf-what">Six marks, read from a name and a birth date ' +
      '&mdash; a sun sign, a year animal, a life path, a rune, a hexagram and a ' +
      'trigram, each with a record of its own.</p>';

    var crownname = (taken && c.name)
      ? '<div class="pf-crownname">' +
          '<h1 class="pf-id__name">' + esc(c.name) + '</h1>' +
          (c.spine ? '<p class="pf-crownname__spine">' + esc(c.spine) + '</p>' : '') +
          whatItIs +
        '</div>'
      : '<div class="pf-crownname pf-crownname--empty">' + whatItIs + '</div>';

    // the Crown — the reading button; "Open this reading" IS the full arcana result page.
    // No profile-side redraw: to get a new reading, draw one from the Birth Reading.
    var crown;
    // the crown as a single-object museum display: its own centered band, lit,
    // enlarged, with the caption BELOW it and nothing crowding either side.
    if (taken) {
      crown = '<div class="pf-crownstage">' +
        '<button type="button" class="pf-crownbtn" data-open-reading="' + esc(c.reading_id) + '" aria-label="Open your Birth Reading">' +
          /* BR-S382: "readings", here and in the caption below, was the page's own
             largest object contradicting the Vault row beneath it — one crown, one
             reading, and a count of three. Gems are the reading's MARKS. */
          crownSVG(points, gems, { cls: "pf-crown-svg", aria: "Crown holding " + gems + " marks" }) +
        '</button>' +
        '<div class="pf-crownstage__cap">' +
          '<p class="pf-prov">' + gems + ' gems set — one for each mark this reading drew.</p>' +
          '<p class="pf-crownstage__filed">Filed ' + esc(fmtDate(c.created_at)) + ' &middot; ' + esc(c.reading_id) + '</p>' +
          '<a class="pf-openreading pf-openreading--lg" href="#" data-open-reading="' + esc(c.reading_id) + '">Open this reading &rarr;</a>' +
        '</div></div>';
    } else {
      crown = '<div class="pf-crownstage">' +
        '<button type="button" class="pf-crownbtn pf-crownbtn--empty pf-paid" data-draw="self" data-intent="new" aria-label="Draw your Birth Reading">' +
          '<span class="pf-crown-empty">No crown yet<br>draw a reading</span>' +
        '</button>' +
        '<div class="pf-crownstage__cap">' +
          '<p class="pf-prov">A crown is earned by taking a reading — a gem set for every mark it draws.</p>' +
          /* BR-S384: the figure is gone. This was the one visitor who has bought
             nothing being shown a price tag on their own profile — and the room it
             opens states the same price on arrival, so nothing is hidden by dropping
             it. The violet stays: it marks a door onto a purchase. */
          '<a class="pf-openreading pf-openreading--lg pf-paid" href="#" data-draw="self" data-intent="new">Draw your Birth Reading &rarr;</a>' +
        '</div></div>';
    }

    return '<section class="pf-surface">' + id + crownname + crown + '</section>';
  }

  /* ---------- The Vault — crowns, rings, and the door to read for someone ----------
     BR-S382: this heading said "Rings — family + friend crowns (§3.4)" over a function
     that returns section("The Vault", …). The section carried two competing names in
     source and a third on screen, and §3.4 points at a spec paragraph that no longer
     describes what renders here. One name, no spec number. */
  var RELATIONS = ["Mother", "Father", "Sister", "Brother", "Grandmother", "Grandfather", "Aunt", "Uncle", "Cousin", "Partner", "Child", "Friend"];

  function vaultHTML() {
    var relOpts = RELATIONS.map(function (r) {
      return '<button type="button" class="pf-relopt" data-rel-choice="' + esc(r) + '">' + esc(r) + '</button>';
    }).join("");
    var add = '<div class="pf-mini--add-wrap">' +
      '<button type="button" class="pf-mini pf-mini--add pf-paid" data-relpick aria-haspopup="true" aria-expanded="false">' +
        '<span class="pf-mini__plus" aria-hidden="true">+</span>' +
        '<div class="pf-mini__label">Read for<br>someone</div>' +
        '<div class="pf-mini__n">choose who &rarr;</div>' +
      '</button>' +
      '<div class="pf-relmenu" aria-label="Who is this reading for" hidden>' +
        '<div class="pf-relmenu__h">Who is this reading for?</div>' +
        '<div class="pf-relmenu__grid">' + relOpts + '</div>' +
      '</div></div>';
    /* BR-S372 — THE VAULT. The builder's structure, said plainly: your profile is
       the page, everything below the line is your Shelf, and the Vault is the
       section of it that holds the crowns and the rings. Rings had a section of
       their own and crowns had none — the crown sat in the header as a button and
       was nowhere on the shelf as a THING YOU HOLD, which is what it is.
       The name is deliberately not marketed anywhere: no door leads here, nothing
       announces it, and the word appears exactly once, as the name of the drawer
       it is. A place you find by having something in it. */
    var c = crownRecord(), worn = c && c.result_count > 0;
    /* BR-S387: the Crowns row is the first place the readings LIST becomes visible.
       With one it reads as it always did; the second reading appends rather than
       rewriting anything, which is the whole reason the pointer exists. */
    var n = readingCount();
    var crownsV = esc(c && c.name ? c.name : "one, unnamed")
      + (n > 1 ? ' <span class="pf-vaultrow__and">and ' + (n - 1) +
                 (n === 2 ? ' other' : ' others') + '</span>' : '');
    var crowns = worn
      ? '<div class="pf-vaultrow"><span class="pf-vaultrow__k">Crowns</span>' +
          '<span class="pf-vaultrow__v">' + crownsV + '</span></div>'
      : '<div class="pf-vaultrow pf-vaultrow--empty"><span class="pf-vaultrow__k">Crowns</span>' +
          '<span class="pf-vaultrow__v">None borne yet.</span></div>';
    /* BR-S382: this row was one hardcoded sentence that declared itself empty without
       the class that STYLES empty — so in the same box the Crowns empty state rendered
       dim italic and the Rings empty state rendered full-weight roman: the emptier row
       was the louder one. It now branches off a real array exactly the way Crowns
       branches off the crown record, which also means the first ring that is ever set
       will not leave the row still insisting none are. */
    var rings = (held() && SEEKER.rings) ? SEEKER.rings : [];
    var ringrow = rings.length
      ? '<div class="pf-vaultrow"><span class="pf-vaultrow__k">Rings</span>' +
          '<span class="pf-vaultrow__v">' + esc(rings.map(function (r) { return r.name; }).join(", ")) + '</span></div>'
      : '<div class="pf-vaultrow pf-vaultrow--empty"><span class="pf-vaultrow__k">Rings</span>' +
          '<span class="pf-vaultrow__v">None set yet &mdash; a ring is earned by reading for someone close.</span></div>';
    return section("The Vault", null, null,
      '<div class="pf-vaultbox">' + crowns + ringrow +
        '<div class="pf-family">' + add + '</div></div>');
  }

  function mintedHTML() {
    /* BR-S386: this was a <div> in a full button costume — cursor:pointer, a gold
       :hover border, :active { translateY(1px) } — with no data hook, no tabindex and
       no role, while the delegated handler matches eight data-* attributes and none of
       them was here. `.pf-card:focus-visible` was permanently dead CSS. It is
       invisible today only because minted_cards is empty, which means the failure was
       scheduled to arrive on the exact day the section fills: the first minted card a
       visitor ever sees presses down and does nothing. Every sibling control on this
       page (pf-slot, pf-mini--add) is a real <button> with a hook, so the next editor
       would reasonably assume this one was too. */
    var cards = SEEKER.minted_cards.map(function (m) {
      return '<button type="button" class="pf-card" data-action="view-card" data-name="' + esc(m.name) + '">' +
        '<span class="pf-card__art" aria-hidden="true">' + VSEAL + '</span>' +
        '<span class="pf-card__cap"><span class="pf-card__k">' + esc(m.kind) + '</span>' +
        '<span class="pf-card__n">' + esc(m.name) + '</span></span></button>';
    }).join("");
    // Empty state is one calm line (the lede) — no ghost slots. Cards appear when minting is live.
    // BR-S382: .pf-vault renamed .pf-minted — it was never the Vault's, only this
    // section's, and it shadowed the real Vault's namespace 500 lines away.
    var body = cards ? '<div class="pf-minted"><div class="pf-cards">' + cards + '</div></div>' : "";
    /* BR-S353: this section was called "The Shelf" while settings.js names the WHOLE
       page The Shelf and reports it Open — so following "The Shelf →" landed on a
       section of that name saying it was not open. The page keeps the name; the
       section says what it actually holds. The lede stated the same fact three
       times over; once is enough. */
    return section("Minted cards", "not open yet",
      "Minted cards are filed here. None yet.",
      body);
  }

  function pickOpt(id, o) {
    return '<button type="button" class="pf-pickopt" data-show-choose="' + id + '" data-ck="' + esc(o.kind) + '" data-cn="' + esc(o.name) + '">' +
      '<span class="pf-pickopt__k">' + esc(o.kind) + '</span><span class="pf-pickopt__n">' + esc(o.name) + '</span></button>';
  }
  function pickMenu(id, filled) {
    /* BR-S375: you cannot feature a result you do not hold. Unheld, this listed
       the mock's five marks to a visitor who owns none — and picking one filled
       a Showcase slot with someone else's reading. Mirrors the minted empty line. */
    var readOpts = held()
      ? SEEKER.reading_results.map(function (o) { return pickOpt(id, o); }).join("")
      : '<p class="pf-pickempty">No results yet — draw a reading first.</p>';
    /* BR-S387: the minted options were emitted BARE while the reading options sit in
       `.pf-pickmenu__grid`, which is the only source of the 5px gap between rows — and
       the sibling rule `.pf-pickmenu__grid + .pf-pickmenu__h` keys off that wrapper
       too. Latent today, because mintOpts is a styled <p>; the day minting ships, the
       second half of every picker loses its gap and two lists in one menu stop looking
       like one list. The empty <p> stays OUTSIDE the grid — it is a sentence, not a row. */
    var mintOpts = SEEKER.minted_cards.length
      ? '<div class="pf-pickmenu__grid">' +
          SEEKER.minted_cards.map(function (o) { return pickOpt(id, o); }).join("") +
        '</div>'
      : '<p class="pf-pickempty">No minted cards yet — minting is not open.</p>';
    /* BR-S386: a slot could be CHANGED but never emptied. `chosen` had exactly one
       writer and nothing ever restored null, and showcaseHTML renders only the FIRST
       unfilled slot — so filling three made the invite vanish for good and the calm
       empty state this whole section is built around became unreachable in three
       clicks. The only escape was a reload, which wipes everything: undiscoverable
       now, an outright trap the day state persists. Offered only on a filled slot,
       because there is nothing to take back out of an empty one. */
    var clear = filled
      ? '<button type="button" class="pf-pickclear" data-show-clear="' + id + '">' +
          'Leave this slot empty' +
        '</button>'
      : "";
    return '<div class="pf-pickmenu" aria-label="Choose what to feature" hidden>' +
      '<div class="pf-pickmenu__h">From your reading</div>' +
      '<div class="pf-pickmenu__grid">' + readOpts + '</div>' +
      '<div class="pf-pickmenu__h">Minted cards</div>' + mintOpts + clear +
    '</div>';
  }
  function showcaseHTML() {
    // Show the filled picks, then ONE quiet invite slot — never a grid of cloned
    // empty boxes (the Vault's own subtraction discipline, applied here too).
    var out = SEEKER.showcase.filter(function (s) { return s.chosen; }).map(function (s) {
      return '<div class="pf-slotwrap" data-slot="' + s.id + '">' +
        '<button type="button" class="pf-slot pf-slot--filled" data-showpick="' + s.id + '" aria-haspopup="true" aria-expanded="false">' +
          '<span class="pf-slot__kind">' + esc(s.chosen.kind) + '</span>' +
          '<span class="pf-slot__t">' + esc(s.chosen.name) + '</span>' +
          '<span class="pf-slot__change">change &rsaquo;</span></button>' +
        pickMenu(s.id, true) + '</div>';
    });
    var next = SEEKER.showcase.filter(function (s) { return !s.chosen; })[0];
    if (next) {
      out.push('<div class="pf-slotwrap" data-slot="' + next.id + '">' +
        '<button type="button" class="pf-slot pf-slot--empty" data-showpick="' + next.id + '" aria-haspopup="true" aria-expanded="false">' +
          '<span class="pf-slot__plus" aria-hidden="true">+</span>' +
          '<span class="pf-slot__hint">Feature a result<br>or a minted card</span></button>' +
        pickMenu(next.id, false) + '</div>');
    }
    return section("Showcase", null,
      "Feature what you choose — a result from your reading, or a minted card. Choose a slot to fill it.",
      '<div class="pf-show">' + out.join("") + '</div>');
  }

  /* BR-S386 — re-render the Showcase and KEEP THE KEYBOARD IN PLACE. The section is
     replaced wholesale, so the button that was focused no longer exists; without this
     the browser falls back to <body>. Preference order: the slot just acted on, then
     the invite slot (where a filling visitor is going next), then the section itself.
     `preventScroll` because the eye is already here — moving the page as well as the
     focus is the jolt this is meant to remove. */
  function redrawShowcase(fromEl, sid) {
    var sec = fromEl.closest(".pf-sec");
    if (!sec) return;
    var tmp = document.createElement("div");
    tmp.innerHTML = showcaseHTML();
    var fresh = tmp.firstChild;
    sec.replaceWith(fresh);
    var back = fresh.querySelector('[data-showpick="' + sid + '"]')
            || fresh.querySelector(".pf-slot--empty")
            || fresh.querySelector("[data-showpick]");
    if (back) { try { back.focus({ preventScroll: true }); } catch (e) { back.focus(); } }
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
  // deadpan one-line descriptor. (The Shelf has its own section above, so it is
  // not repeated here.) Commerce is not shown on the hub — price lives in the room.
  function roomsHTML() {
    var rooms = [
      ["arcane", "The Birth Reading", "Where a new reading is drawn"],
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
        /* BR-S372 — THE LINE. Above it is who you are; below it is your Shelf. One
           rule and one quiet word, because the division is the whole idea and does
           not need a heading to carry it.

           BR-S387 — AND THE SHELF NOW ENDS SOMEWHERE. The line opened a claim that
           nothing ever closed: vault, minted, showcase, friends, the exit doors AND
           the referral programme all fell under it, and roomsHTML()'s own comment
           assumed the opposite. It carried role="separator" aria-label="Your Shelf",
           so the boundary announced to assistive tech was wrong by four sections —
           and for a new visitor the doors and the referral are the ONLY populated
           things beneath the label, which makes it read as false at exactly the
           moment the page is emptiest.
           The Shelf is what you KEEP: the Vault, the minted register, the Showcase.
           Friends is a register of people, the doors are the way out, and the
           referral is a programme — none of them is something you hold, so they sit
           after it. A real <section> closes the claim; the line is now that
           section's own decoration rather than a separator floating in the page. */
        '<section class="pf-shelf" aria-label="Your Shelf">' +
          '<div class="pf-shelfline" aria-hidden="true">' +
            '<span class="pf-shelfline__rule"></span>' +
            '<span class="pf-shelfline__lab">Your Shelf</span>' +
            '<span class="pf-shelfline__rule"></span>' +
          '</div>' +
          vaultHTML() +
          mintedHTML() +
          showcaseHTML() +
        '</section>' +
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
      /* BR-S386: `[data-show-clear]` is in this list, and leaving it out is how a
         control ends up in a button costume with no handler — the very defect #21
         describes, which I reproduced here and caught only by pressing the thing.
         ANY new data-* hook must be added here or it silently falls through to the
         close-all branch below and looks like a dead button. */
      var el = ev.target.closest("[data-door],[data-draw],[data-open-reading],[data-showpick],[data-show-choose],[data-show-clear],[data-action],[data-relpick],[data-rel-choice]");
      if (!el) { closeMenus(null); return; }

      if (el.hasAttribute("data-door")) {
        ev.preventDefault();
        var d = el.getAttribute("data-door");
        if (d === "menu") { if (inApp()) location.href = location.pathname; else note(root, "Returns to the main menu. (Inert in preview.)"); }
        /* BR-S384: this read "codex.html?v=237" while every other caller in app.js was
           126 versions ahead, so a visitor entering the Codex FROM THEIR OWN HUB could
           be served a cached build older than the one any other door opens. It now
           takes the href off the room registry app.js already publishes, which is the
           only fix that cannot go stale again — one bump updates every caller at once.
           The literal stays as a fallback for the standalone preview, where app.js is
           not loaded and window.BR_ROOMS does not exist. */
        else if (d === "codex") { if (inApp()) location.href = codexHref(); else note(root, "Opens the Codex. (Inert in preview.)"); }
        else if (d === "arcane") toInput("", "Opens the Birth Reading. (Inert in preview.)");
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

      // every draw/redraw routes to the Birth Reading, carrying intent; commerce lives there
      if (el.hasAttribute("data-draw")) {
        ev.preventDefault();
        var who = el.getAttribute("data-draw"), intent = el.getAttribute("data-intent"), rel = el.getAttribute("data-rel");
        var params = "for=" + (who === "other" ? "other" : "self") + (intent ? "&intent=" + intent : "") + (rel ? "&subject=" + encodeURIComponent(rel) : "");
        var msg = intent === "redraw"
          ? "This would open the Birth Reading to add a richer reading — the redraw confirm and price live there. (Inert in preview.)"
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
      /* BR-S386 — a result/card chosen, or the slot cleared. Both re-render the
         Showcase, and both used to destroy the button the visitor had just pressed
         and leave focus on <body>: a keyboard visitor tabbed several controls deep,
         picked, and restarted from the top of the document — three times over to fill
         the showcase. redrawShowcase() puts focus back where the eye already is.
         The old code also re-rendered unconditionally, even when `slot` was undefined. */
      if (el.hasAttribute("data-show-choose") || el.hasAttribute("data-show-clear")) {
        ev.preventDefault();
        var clearing = el.hasAttribute("data-show-clear");
        var sid = el.getAttribute(clearing ? "data-show-clear" : "data-show-choose");
        var slot = SEEKER.showcase.filter(function (x) { return x.id === sid; })[0];
        if (!slot) { closeMenus(null); return; }
        slot.chosen = clearing
          ? null
          : { kind: el.getAttribute("data-ck"), name: el.getAttribute("data-cn") };
        closeMenus(null);
        redrawShowcase(el, sid);
        return;
      }

      if (el.hasAttribute("data-action")) {
        ev.preventDefault();
        var a = el.getAttribute("data-action");
        var m = {
          "add-friend": "Add a friend by handle. (Mocked in this prototype.)",
          "view-friend": "Opening " + (el.getAttribute("data-name") || "a friend") + "'s profile — you would see only what their showcase permits. (Mocked.)",
          // BR-S386: the minted card is a real control now, so it needs a real answer.
          "view-card": "Opening " + (el.getAttribute("data-name") || "this card") + " — the minted card's own page. (Minting is not open yet.)",
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
