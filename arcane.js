/* =============================================================
   THE ARCANA INTAKE — "The Setting of Marks" (BR-S159)
   A faithful port of the builder's high-fidelity blueprint
   (design_handoff_arcana_intake) into the vanilla stack. Exposes
   window.BRArcane; mounted by app.js mountDev() on ?dev=arcane.
   Isolated dev surface — touches nothing live. The arcane reading
   carries NO photo-read safety walls (chosen divination; no photo).

   Two signature behaviours:
   1. CROWN BLUEPRINT — a draftsman + heraldic crown of ~78 strokes
      hovering above the form; every character typed inks more of it,
      deleting un-inks. At the character budget it "finishes" — jewels
      fill with accent + a soft halo blooms. The crown IS the indicator.
   2. FORGING CEREMONY — "Draw the reading" plays a stepped (~125ms
      tick) paper-cutout scene: a shaman consults a crown constellation
      and a mug, forwards a slip to a smith, who strikes the record into
      being over 8 strikes. Skippable; honours reduced motion.
============================================================= */
(function () {
  "use strict";

  var COMPLETION_CHARS = 64;      // crown budget (chars across the five marks)
  var ACCENT = "#7e937f";         // crown jewels (moss-bright)
  var MATERIAL = "#c98a5e";       // forge material (copper)

  var slice = function (nl) { return Array.prototype.slice.call(nl); };
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ---------------------------------------------------------------
     THE CROWN BLUEPRINT — geometry (draw order = reveal order)
  --------------------------------------------------------------- */
  var ROLE = {
    con:    { stroke: "#6e6b63", w: 1,   op: 0.42 },
    band:   { stroke: "#b1ada4", w: 1.6, op: 0.92 },
    orn:    { stroke: "#948f87", w: 1.3, op: 0.85 },
    jewel:  { stroke: "#d7d3ca", w: 1.5, op: 0.95 },
    finial: { stroke: "#e9e5dc", w: 1.9, op: 1 },
    seal:   { stroke: "#6e6b63", w: 1,   op: 0.55 },
  };

  function buildCrownInner() {
    var parts = [];
    function add(tag, geom, role, opts) {
      opts = opts || {};
      var r = ROLE[role];
      var a = 'data-ink data-op="' + r.op + '"';
      if (role === "jewel") a += " data-jewel";
      if (role === "seal") a += " data-final";
      if (opts.idle) a += " data-idle";
      var g = "";
      for (var k in geom) g += " " + k + '="' + geom[k] + '"';
      var style = 'style="fill:none;stroke:' + r.stroke + ";stroke-width:" + r.w + ";stroke-linecap:round;stroke-linejoin:round\"";
      parts.push("<" + tag + " " + a + g + " " + style + "></" + tag + ">");
    }
    function line(x1, y1, x2, y2, role, opts) { add("line", { x1: x1, y1: y1, x2: x2, y2: y2 }, role, opts); }
    function circle(cx, cy, r, role, opts) { add("circle", { cx: cx, cy: cy, r: r }, role, opts); }
    function path(d, role, opts) { add("path", { d: d }, role, opts); }

    var tips = [[120, 262], [175, 224], [230, 168], [285, 224], [340, 262]];
    var BX0 = 88, BX1 = 372, BYT = 352, BYB = 398;
    var v = [147.5, 202.5, 257.5, 312.5];

    // 1 — CONSTRUCTION (faint; the idle scaffold sits drawn at rest)
    line(230, 96, 230, 432, "con", { idle: true });
    line(60, 398, 400, 398, "con", { idle: true });
    line(70, 352, 390, 352, "con", { idle: true });
    circle(230, 262, 110, "con", { idle: true });
    tips.forEach(function (t) { circle(t[0], t[1], 13, "con"); });
    line(88, 352, 230, 168, "con"); line(372, 352, 230, 168, "con");
    line(120, 262, 230, 168, "con"); line(340, 262, 230, 168, "con");
    line(64, 168, 64, 398, "con"); line(58, 168, 70, 168, "con"); line(58, 398, 70, 398, "con");
    [-60, -30, 0, 30, 60].forEach(function (deg) {
      var th = deg * Math.PI / 180, oy = 150, r1 = 22, r2 = 29;
      line(+(230 + r1 * Math.sin(th)).toFixed(1), +(oy - r1 * Math.cos(th)).toFixed(1),
           +(230 + r2 * Math.sin(th)).toFixed(1), +(oy - r2 * Math.cos(th)).toFixed(1), "con");
    });

    // 2 — BAND
    line(BX0, BYT, BX1, BYT, "band"); line(BX0, BYB, BX1, BYB, "band");
    line(BX0, BYT, BX0, BYB, "band"); line(BX1, BYT, BX1, BYB, "band");
    line(BX0, 384, BX1, 384, "band");

    // 3 — BAND DIAMONDS (jewels)
    [147, 230, 313].forEach(function (dx) {
      path("M" + dx + ",365 L" + (dx + 9) + ",375 L" + dx + ",385 L" + (dx - 9) + ",375 Z", "jewel");
    });

    // 4 — BAND PEARL ROW
    for (var x = 104; x <= 356; x += 18) circle(x, 391, 2.4, "orn");

    // 5 — SPIKE OUTLINE
    line(BX0, BYT, 120, 262, "band"); line(120, 262, v[0], BYT, "band");
    line(v[0], BYT, 175, 224, "band"); line(175, 224, v[1], BYT, "band");
    line(v[1], BYT, 230, 168, "band"); line(230, 168, v[2], BYT, "band");
    line(v[2], BYT, 285, 224, "band"); line(285, 224, v[3], BYT, "band");
    line(v[3], BYT, 340, 262, "band"); line(340, 262, BX1, BYT, "band");

    // 6 — PEARLS at spike tips (jewels)
    tips.forEach(function (t) { circle(t[0], t[1], 8, "jewel"); });

    // 7 — HERALDIC FESTOONS
    path("M120,262 Q147.5,318 175,224", "orn");
    path("M175,224 Q202.5,300 230,168", "orn");
    path("M230,168 Q257.5,300 285,224", "orn");
    path("M285,224 Q312.5,318 340,262", "orn");

    // 8 — SIDE FILIGREE CURLS
    path("M88,398 C64,392 58,364 78,352 C62,360 66,382 90,386", "orn");
    path("M372,398 C396,392 402,364 382,352 C398,360 394,382 370,386", "orn");

    // 9 — PLINTH
    line(80, 410, 380, 410, "orn"); line(86, 416, 374, 416, "orn");

    // 10 — FINIAL (orb + cross) — the closing marks
    circle(230, 150, 13, "finial");
    line(230, 137, 230, 110, "finial");
    line(214, 123, 246, 123, "finial");

    // 11 — SEAL corner crop marks (drawn last)
    [[44, 92, 1, 1], [416, 92, -1, 1], [44, 484, 1, -1], [416, 484, -1, -1]].forEach(function (c) {
      var xx = c[0], yy = c[1], sx = c[2], sy = c[3];
      line(xx, yy, xx + 16 * sx, yy, "seal");
      line(xx, yy, xx, yy + 16 * sy, "seal");
    });

    return parts.join("");
  }

  function CrownBlueprint(host) {
    host.innerHTML =
      '<div class="ac-crown-glow" aria-hidden="true"></div>' +
      '<svg class="ac-crown-svg" viewBox="0 0 460 560" preserveAspectRatio="xMidYMid meet"><g>' + buildCrownInner() + "</g></svg>";
    var svg = host.querySelector(".ac-crown-svg");
    var glow = host.querySelector(".ac-crown-glow");
    var nodes = slice(svg.querySelectorAll("[data-ink]"));
    nodes.forEach(function (n) {
      var L = 100; try { L = n.getTotalLength(); } catch (e) {}
      if (!L || !isFinite(L)) L = 100;
      n._len = L;
      n.style.strokeDasharray = L + " " + L;
      n.style.strokeDashoffset = L;
      n.style.opacity = 0;
      n.style.transition = "stroke-dashoffset .55s cubic-bezier(.2,.7,.2,1), opacity .55s ease, fill .9s ease, stroke .9s ease";
    });
    glow.style.background = "radial-gradient(circle at 50% 46%, " + ACCENT + "4d 0%, transparent 62%)";

    function draw(p) {
      var N = nodes.length;
      p = Math.max(0, Math.min(1, p || 0));
      var scaled = p * N, complete = p >= 0.999;
      for (var i = 0; i < N; i++) {
        var n = nodes[i], len = n._len || 1;
        var lp = Math.max(0, Math.min(1, scaled - i));
        if (lp <= 0 && n.hasAttribute("data-idle")) {
          n.style.strokeDashoffset = "0"; n.style.opacity = "0.13";
        } else {
          n.style.strokeDashoffset = (len * (1 - lp)).toFixed(2);
          var baseOp = parseFloat(n.getAttribute("data-op") || "0.9");
          n.style.opacity = lp <= 0 ? "0" : (baseOp * (0.4 + 0.6 * lp)).toFixed(3);
        }
        if (n.hasAttribute("data-jewel")) {
          n.style.fill = complete ? ACCENT : "none";
          n.style.fillOpacity = complete ? "0.3" : "0";
        }
      }
      glow.style.opacity = complete ? "1" : "0";
    }
    draw(0);
    return { draw: draw };
  }

  /* ---------------------------------------------------------------
     THE INTAKE — "The Setting of Marks"
  --------------------------------------------------------------- */

  /* Parse the free-text "day" mark (birth date) → {y,m,d}. The prompt order is
     day-month-year, so ambiguous numeric dates read as D M Y. ISO (YYYY-MM-DD)
     and month names are handled. Returns null if a full date can't be read —
     the reading then degrades to a name-seeded draw rather than defaulting. */
  function parseBirth(txt) {
    txt = String(txt || "").trim();
    if (!txt) return null;
    var MO = { jan:1, feb:2, mar:3, apr:4, may:5, jun:6, jul:7, aug:8, sep:9, oct:10, nov:11, dec:12 };
    function ok(y, m, d) { return (y && m >= 1 && m <= 12 && d >= 1 && d <= 31) ? { y: y, m: m, d: d } : null; }
    var iso = txt.match(/\b(1[89]\d\d|20\d\d)[-\/.](\d{1,2})[-\/.](\d{1,2})\b/);
    if (iso) return ok(+iso[1], +iso[2], +iso[3]);
    var year = null, ym = txt.match(/\b(1[89]\d\d|20\d\d)\b/); if (ym) year = +ym[1];
    var month = null, mm = txt.toLowerCase().match(/(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/); if (mm) month = MO[mm[1]];
    var nums = (txt.match(/\d+/g) || []).map(Number).filter(function (n) { return n !== year; });
    var day = null;
    if (month) day = nums.filter(function (n) { return n >= 1 && n <= 31; })[0] || null;
    else if (nums.length >= 2) { day = nums[0]; month = nums[1]; }   // day-month order
    return ok(year, month, day);
  }

  var DEFS = [
    { key: "name",   label: "The name borne",            ph: "the name you answer to" },
    { key: "day",    label: "The day first counted",     ph: "the day, the month, the year" },
    { key: "hour",   label: "The hour first struck",     ph: "the hour, if it is known" },
    { key: "ground", label: "The ground first stood on", ph: "the town, and the land" },
    { key: "matter", label: "What is brought",           ph: "the matter you carry, in a line — or leave it unspoken" },
  ];

  // WHO the reading is drawn for. The FIRST reading on an account is for yourself;
  // Family and Friend unlock once a reading has been completed (or when arriving from
  // the profile's "read for someone"). Family opens a family-member picker.
  var WHOFOR = [
    { id: "self",   label: "Myself",   gated: false },
    { id: "family", label: "Family",   gated: true, pick: true },
    { id: "friend", label: "A friend", gated: true },
  ];
  var FAMILY_MEMBERS = ["Mother", "Father", "Sister", "Brother", "Grandmother", "Grandfather", "Aunt", "Uncle", "Cousin", "Partner", "Child"];
  function acctUnlocked() {
    var byRead = false; try { byRead = localStorage.getItem("br_has_reading") === "1"; } catch (e) {}
    var p = null; try { p = new URLSearchParams(location.search); } catch (e) {}
    var byProfile = p && (p.get("for") === "other" || !!p.get("subject"));
    return byRead || byProfile;
  }
  function forwhomHTML() {
    var unlocked = acctUnlocked();
    var chips = WHOFOR.map(function (w, i) {
      var locked = w.gated && !unlocked;
      var extra = (!locked && w.pick) ? '<span class="ac-forwhom__sub">choose who</span>' : "";
      return '<button type="button" class="ac-forwhom__chip' + (locked ? " is-locked" : "") + (w.pick ? " ac-forwhom__chip--fam" : "") + '"' +
        ' role="radio" aria-checked="' + (i === 0 ? "true" : "false") + '"' + (locked ? ' aria-disabled="true"' : "") +
        ' data-forwhom="' + w.id + '"' + (w.pick && !locked ? ' data-fampick aria-haspopup="menu" aria-expanded="false"' : "") + ">" +
        '<span class="ac-forwhom__who">' + esc(w.label) + "</span>" + extra + "</button>";
    }).join("");
    var famMenu = unlocked
      ? '<div class="ac-fammenu" role="menu" aria-label="Which family member?" hidden>' +
          FAMILY_MEMBERS.map(function (r) { return '<button type="button" class="ac-famopt" role="menuitem" data-fam-choice="' + esc(r) + '">' + esc(r) + "</button>"; }).join("") +
        "</div>"
      : "";
    return '<div class="ac-forwhom" data-ac-forwhom>' +
      '<span class="ac-forwhom__label">For whom is this drawn?</span>' +
      '<div class="ac-forwhom__opts" role="radiogroup" aria-label="For whom is this drawn?">' + chips + "</div>" +
      (unlocked ? "" : '<p class="ac-forwhom__note">Reading for family and friends unlocks after your first personal reading.</p>') +
      famMenu +
      "</div>";
  }

  // BR-S199: THE GIFT — a reading given FOR someone, kept on THEIR wall (THE WALLS §7-8).
  // The gift is an UN-DRAWN DEED: the giver sends a link; the recipient sits their own free
  // intake and keeps it. Mock — no real payment/accounts. The deed link carries only the
  // giver's name; the recipient draws their own marks.
  function giftFrom(params) { var f = (params && params.from) || ""; return f.replace(/[<>~]/g, "").trim(); }
  function giftBannerHTML(from) {
    var who = from ? "A gift from " + esc(from) : "A gift, from someone who thought of you";
    return '<div class="ac-giftbanner"><span class="ac-giftbanner__mark" aria-hidden="true">&#10022;</span> ' + who +
      ' — sit your reading below. It is drawn for you, and yours to keep.</div>';
  }
  function giftComposeHTML() {
    return '' +
      '<div class="arcane" data-arcane>' +
        '<button type="button" class="ac-back" data-view-to="menu">← Back to the menu</button>' +
        '<div class="ac-form ac-form--gift">' +
          '<div class="ac-head">' +
            '<h1 class="ac-title">Give a Reading</h1>' +
            '<p class="ac-sub">A gift is un-drawn — you send a deed; they sit their own reading, and keep it.</p>' +
          "</div>" +
          '<label class="ac-mark"><span class="ac-mark__label">Sign it — your name</span>' +
            '<input class="ac-mark__field" data-gift-from autocomplete="off" spellcheck="false" placeholder="so they know who it is from — or leave it open" aria-label="Your name, to sign the gift"></label>' +
          '<div class="ac-rule"></div>' +
          '<div class="ac-cta" data-gift-cta>' +
            '<button type="button" class="ac-draw ac-gift-send" data-gift-send><span>Send the Gift</span> <span class="ac-draw__price">$4.99</span></button>' +
            '<p class="ac-hope">Nothing is drawn now. They draw it, and it is theirs.</p>' +
            '<p class="ac-mocknote">Dev mock — no real payment in this build.</p>' +
          "</div>" +
        "</div>" +
      "</div>";
  }

  function intakeHTML(params) {
    var recipient = !!(params && params.gift === "1"), from = giftFrom(params);
    var fields = DEFS.map(function (d) {
      return '<label class="ac-mark">' +
        '<span class="ac-mark__label">' + esc(d.label) + "</span>" +
        '<input class="ac-mark__field" type="text" data-mark="' + d.key + '" autocomplete="off" spellcheck="false" placeholder="' + esc(d.ph) + '" aria-label="' + esc(d.label) + '">' +
        "</label>";
    }).join("");
    return '' +
      '<div class="arcane" data-arcane>' +
        '<button type="button" class="ac-back" data-view-to="menu">← Back to the menu</button>' +
        '<div class="ac-crown" data-ac-crown></div>' +
        '<div class="ac-form">' +
          '<div class="ac-head">' +
            '<h1 class="ac-title">' + (recipient ? "Your Reading" : "The Setting of Marks") + '</h1>' +
            '<p class="ac-sub">' + (recipient ? "The marks are yours to lay down. The gift covers the drawing." : "Before the reading is drawn, lay down what it is drawn from.") + '</p>' +
          "</div>" +
          (recipient ? giftBannerHTML(from) : forwhomHTML()) +
          '<div class="ac-redraw-banner" data-ac-redraw hidden></div>' +
          '<div class="ac-marks">' + fields + "</div>" +
          '<div class="ac-rule"></div>' +
          '<div class="ac-cta">' +
            '<button type="button" class="ac-draw" data-ac-draw>' +
              '<span data-ac-draw-label>Draw the reading</span>' + (recipient ? '' : ' <span class="ac-draw__price">$4.99</span>') +
            "</button>" +
            '<p class="ac-hope">' + (recipient ? "Each mark, once set, is hope." : "Each mark, once set, is hope.") + '</p>' +
            '<p class="ac-notice" data-ac-notice role="status" aria-live="polite" aria-atomic="true"></p>' +
            (recipient ? '' : '<a class="ac-giftlink" href="?dev=arcane&gift=compose">Giving this to someone? Send it as a gift &rarr;</a>') +
          "</div>" +
        "</div>" +
        '<div class="ac-ceremony" data-ac-ceremony hidden></div>' +
      "</div>";
  }

  /* ---------------------------------------------------------------
     THE FORGING CEREMONY — scene (line art) + stepped timeline
  --------------------------------------------------------------- */
  function ceremonySceneHTML(slipName) {
    return '' +
    '<div class="ac-forge" data-ac-forge>' +
    '<svg class="ac-forge__svg" viewBox="0 0 1200 640" preserveAspectRatio="xMidYMid meet">' +
    '<defs><filter id="fc-soft" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="20"></feGaussianBlur></filter></defs>' +
    '<g data-part="world">' +
    // ground, stones, tufts
    '<line x1="70" y1="520" x2="1130" y2="520" stroke="#6e6b63" stroke-width="1" opacity="0.5"></line>' +
    '<line x1="150" y1="520" x2="150" y2="527" stroke="#6e6b63" stroke-width="1" opacity="0.35"></line>' +
    '<line x1="400" y1="520" x2="400" y2="527" stroke="#6e6b63" stroke-width="1" opacity="0.35"></line>' +
    '<line x1="650" y1="520" x2="650" y2="527" stroke="#6e6b63" stroke-width="1" opacity="0.35"></line>' +
    '<line x1="900" y1="520" x2="900" y2="527" stroke="#6e6b63" stroke-width="1" opacity="0.35"></line>' +
    '<path d="M370,520 q8,-10 18,0" fill="none" stroke="#6e6b63" stroke-width="1.2" opacity="0.6"></path>' +
    '<path d="M545,520 q6,-7 13,0" fill="none" stroke="#6e6b63" stroke-width="1.2" opacity="0.6"></path>' +
    '<path d="M640,520 q7,-8 15,0" fill="none" stroke="#6e6b63" stroke-width="1.2" opacity="0.6"></path>' +
    '<path d="M320,520 l-3,-9 M323,520 l0,-10 M326,520 l3,-8" fill="none" stroke="#6e6b63" stroke-width="1.1" opacity="0.6"></path>' +
    '<path d="M592,520 l-3,-8 M595,520 l0,-9 M598,520 l3,-7" fill="none" stroke="#6e6b63" stroke-width="1.1" opacity="0.6"></path>' +
    '<path d="M752,520 l-3,-8 M755,520 l0,-9 M758,520 l3,-7" fill="none" stroke="#6e6b63" stroke-width="1.1" opacity="0.6"></path>' +
    // sky: the crown constellation
    '<g data-part="sky">' +
    '<g data-star opacity="0"><path d="M140,143 L145,150 L140,157 L135,150 Z" fill="none" stroke="#d7d3ca" stroke-width="1.2"></path></g>' +
    '<g data-star opacity="0"><path d="M190,98 L195,105 L190,112 L185,105 Z" fill="none" stroke="#d7d3ca" stroke-width="1.2"></path></g>' +
    '<g data-star opacity="0"><path d="M240,65 L245,72 L240,79 L235,72 Z" fill="none" stroke="#d7d3ca" stroke-width="1.2"></path></g>' +
    '<g data-star opacity="0"><path d="M290,98 L295,105 L290,112 L285,105 Z" fill="none" stroke="#d7d3ca" stroke-width="1.2"></path></g>' +
    '<g data-star opacity="0"><path d="M340,143 L345,150 L340,157 L335,150 Z" fill="none" stroke="#d7d3ca" stroke-width="1.2"></path></g>' +
    '<g data-star opacity="0"><path d="M120,178 L125,185 L120,192 L115,185 Z" fill="none" stroke="#d7d3ca" stroke-width="1.2"></path></g>' +
    '<g data-star opacity="0"><path d="M360,178 L365,185 L360,192 L355,185 Z" fill="none" stroke="#d7d3ca" stroke-width="1.2"></path></g>' +
    '<line data-cline x1="120" y1="185" x2="140" y2="150" stroke="#6e6b63" stroke-width="1" opacity="0"></line>' +
    '<line data-cline x1="140" y1="150" x2="190" y2="105" stroke="#6e6b63" stroke-width="1" opacity="0"></line>' +
    '<line data-cline x1="190" y1="105" x2="240" y2="72" stroke="#6e6b63" stroke-width="1" opacity="0"></line>' +
    '<line data-cline x1="240" y1="72" x2="290" y2="105" stroke="#6e6b63" stroke-width="1" opacity="0"></line>' +
    '<line data-cline x1="290" y1="105" x2="340" y2="150" stroke="#6e6b63" stroke-width="1" opacity="0"></line>' +
    '<line data-cline x1="340" y1="150" x2="360" y2="185" stroke="#6e6b63" stroke-width="1" opacity="0"></line>' +
    "</g>" +
    '<line data-part="beam" x1="255" y1="95" x2="790" y2="318" stroke="#6e6b63" stroke-width="1.2" stroke-dasharray="2 7" opacity="0"></line>' +
    // the shaman (left)
    '<g data-part="shaman" transform="translate(225,520)">' +
    '<path d="M-46,0 L-30,-92 Q0,-110 30,-92 L46,0 Z" fill="rgba(233,229,220,0.05)" stroke="#b1ada4" stroke-width="2" stroke-linejoin="round"></path>' +
    '<rect x="-28" y="-32" width="13" height="11" fill="none" stroke="#6e6b63" stroke-width="1" transform="rotate(-8 -21 -26)"></rect>' +
    '<circle cx="-8" cy="-84" r="2" fill="none" stroke="#948f87" stroke-width="1.2"></circle>' +
    '<circle cx="0" cy="-81" r="2" fill="none" stroke="#948f87" stroke-width="1.2"></circle>' +
    '<circle cx="8" cy="-84" r="2" fill="none" stroke="#948f87" stroke-width="1.2"></circle>' +
    '<path d="M-16,-80 Q-34,-66 -38,-48" fill="none" stroke="#b1ada4" stroke-width="2" stroke-linecap="round"></path>' +
    '<g data-part="mugarm" transform="rotate(0 16 -82)">' +
    '<path d="M16,-82 Q36,-84 48,-96" fill="none" stroke="#b1ada4" stroke-width="2" stroke-linecap="round"></path>' +
    '<rect x="36" y="-124" width="30" height="26" rx="3" fill="rgba(233,229,220,0.07)" stroke="#b1ada4" stroke-width="2"></rect>' +
    '<path d="M66,-116 Q78,-110 66,-102" fill="none" stroke="#b1ada4" stroke-width="2"></path>' +
    '<path data-part="steam1" d="M46,-130 q4,-8 0,-14 q-4,-6 2,-12" fill="none" stroke="#948f87" stroke-width="1.3" opacity="0"></path>' +
    '<path data-part="steam2" d="M58,-132 q4,-8 0,-13 q-3,-6 2,-11" fill="none" stroke="#948f87" stroke-width="1.3" opacity="0"></path>' +
    '<g data-part="tea" opacity="0">' +
    '<circle cx="44" cy="-131" r="1.6" fill="#948f87"></circle>' +
    '<circle cx="52" cy="-135" r="1.6" fill="#948f87"></circle>' +
    '<circle cx="59" cy="-130" r="1.6" fill="#948f87"></circle>' +
    "</g></g>" +
    '<g data-part="shead" transform="rotate(0 0 -105)">' +
    '<circle cx="0" cy="-136" r="29" fill="rgba(233,229,220,0.05)" stroke="#b1ada4" stroke-width="2"></circle>' +
    '<g data-part="sh-eyes"><circle cx="7" cy="-139" r="2.4" fill="#d7d3ca"></circle><circle cx="19" cy="-137" r="2.4" fill="#d7d3ca"></circle></g>' +
    '<g data-part="sh-eyesc" opacity="0"><path d="M4,-139 L10,-139 M16,-137 L22,-137" stroke="#d7d3ca" stroke-width="1.6" stroke-linecap="round"></path></g>' +
    '<path d="M9,-126 q5,3 9,1" fill="none" stroke="#b1ada4" stroke-width="1.6" stroke-linecap="round"></path>' +
    '<line x1="-40" y1="-158" x2="44" y2="-154" stroke="#b1ada4" stroke-width="2" stroke-linecap="round"></line>' +
    '<path d="M-22,-158 Q-4,-204 4,-212 Q16,-222 12,-206 Q8,-190 26,-156" fill="rgba(233,229,220,0.05)" stroke="#b1ada4" stroke-width="2" stroke-linejoin="round"></path>' +
    '<line x1="-16" y1="-166" x2="22" y2="-163" stroke="#948f87" stroke-width="1.4"></line>' +
    '<path d="M24,-164 Q32,-176 28,-187 Q23,-177 17,-170" fill="none" stroke="#948f87" stroke-width="1.3"></path>' +
    "</g>" +
    '<path data-part="answermark" d="M70,-198 L76,-190 L70,-182 L64,-190 Z" fill="#d7d3ca" opacity="0"></path>' +
    "</g>" +
    // the slip (carries the marks)
    '<g data-part="slip" transform="translate(300,398) rotate(0)" opacity="0">' +
    '<rect x="-19" y="-12" width="38" height="24" rx="2" fill="rgba(233,229,220,0.08)" stroke="#b1ada4" stroke-width="1.5"></rect>' +
    '<line x1="-12" y1="-5" x2="12" y2="-5" stroke="#948f87" stroke-width="1"></line>' +
    '<text x="0" y="7" text-anchor="middle" style="font-family:var(--font-display); font-style:italic; font-size:9px; fill:#b1ada4;">' + esc(slipName) + "</text>" +
    "</g>" +
    // the forge
    '<g data-part="forge" transform="translate(1075,520)">' +
    '<path d="M-75,0 L-75,-85 Q-75,-135 -25,-138 L25,-138 Q75,-135 75,-85 L75,0 Z" fill="rgba(233,229,220,0.03)" stroke="#b1ada4" stroke-width="2" stroke-linejoin="round"></path>' +
    '<line x1="-18" y1="-138" x2="-18" y2="-188" stroke="#b1ada4" stroke-width="2"></line>' +
    '<line x1="18" y1="-138" x2="18" y2="-188" stroke="#b1ada4" stroke-width="2"></line>' +
    '<line x1="-26" y1="-188" x2="26" y2="-188" stroke="#b1ada4" stroke-width="2" stroke-linecap="round"></line>' +
    '<path data-part="glow" d="M-40,0 L-40,-52 Q0,-84 40,-52 L40,0 Z" fill="#c98a5e" opacity="0.14"></path>' +
    '<path d="M-40,0 L-40,-52 Q0,-84 40,-52 L40,0 Z" fill="none" stroke="#b1ada4" stroke-width="2"></path>' +
    '<path data-part="flame1" d="M-22,-6 L-14,-32 L-6,-14 L2,-40 L10,-16 L18,-34 L24,-6" fill="none" stroke="#c98a5e" stroke-width="2" stroke-linejoin="round" opacity="0.8"></path>' +
    '<path data-part="flame2" d="M-24,-6 L-16,-20 L-8,-38 L0,-16 L8,-36 L16,-14 L24,-6" fill="none" stroke="#c98a5e" stroke-width="2" stroke-linejoin="round" opacity="0"></path>' +
    '<circle cx="-16" cy="-7" r="4" fill="none" stroke="#948f87" stroke-width="1.3"></circle>' +
    '<circle cx="0" cy="-9" r="4" fill="none" stroke="#948f87" stroke-width="1.3"></circle>' +
    '<circle cx="15" cy="-7" r="4" fill="none" stroke="#948f87" stroke-width="1.3"></circle>' +
    "</g>" +
    // quench barrel
    '<g transform="translate(700,520)">' +
    '<path d="M-22,0 L-24,-40 Q0,-46 24,-40 L22,0 Z" fill="rgba(233,229,220,0.03)" stroke="#948f87" stroke-width="1.8" stroke-linejoin="round"></path>' +
    '<line x1="-23" y1="-14" x2="23" y2="-14" stroke="#6e6b63" stroke-width="1.2"></line>' +
    '<line x1="-24" y1="-30" x2="24" y2="-30" stroke="#6e6b63" stroke-width="1.2"></line>' +
    '<ellipse cx="0" cy="-41" rx="21" ry="4" fill="none" stroke="#948f87" stroke-width="1.4"></ellipse>' +
    "</g>" +
    // anvil on strapped stump
    '<g data-part="anvilg" transform="translate(818,520)">' +
    '<path d="M-34,0 L-30,-54 L30,-54 L34,0 Z" fill="rgba(233,229,220,0.04)" stroke="#b1ada4" stroke-width="2" stroke-linejoin="round"></path>' +
    '<line x1="-31" y1="-46" x2="31" y2="-46" stroke="#948f87" stroke-width="1.2"></line>' +
    '<path d="M-22,-36 L-12,-36 M6,-20 L18,-20" stroke="#6e6b63" stroke-width="1.2"></path>' +
    '<path d="M40,-96 L-12,-96 Q-44,-95 -60,-86 Q-47,-76 -22,-80 L-14,-81 L-14,-72 L-8,-68 L-8,-62 Q-22,-58 -24,-54 L26,-54 Q24,-58 12,-62 L12,-68 L16,-72 L16,-81 L40,-84 Z" fill="rgba(233,229,220,0.05)" stroke="#b1ada4" stroke-width="2" stroke-linejoin="round"></path>' +
    '<line x1="-8" y1="-92" x2="36" y2="-92" stroke="#948f87" stroke-width="1.2"></line>' +
    '<circle cx="30" cy="-90" r="1.8" fill="#6e6b63"></circle>' +
    "</g>" +
    // halo behind the finished record
    '<circle data-part="cardhalo" cx="806" cy="334" r="85" fill="#c98a5e" opacity="0" filter="url(#fc-soft)"></circle>' +
    // the record being struck
    '<g data-part="cardg" transform="translate(806,372) rotate(-4)">' +
    '<rect data-cink x="-38" y="-52" width="76" height="104" rx="6" fill="none" stroke="#b1ada4" stroke-width="1.6"></rect>' +
    '<path data-cink d="M-38,-42 L-38,-52 L-28,-52 M28,-52 L38,-52 L38,-42 M38,42 L38,52 L28,52 M-28,52 L-38,52 L-38,42" fill="none" stroke="#948f87" stroke-width="1"></path>' +
    '<rect data-cink x="-30" y="-44" width="60" height="88" rx="4" fill="none" stroke="#6e6b63" stroke-width="1"></rect>' +
    '<path data-cink d="M-20,-6 L-13,-24 L-6,-9 L0,-30 L6,-9 L13,-24 L20,-6" fill="none" stroke="#d7d3ca" stroke-width="1.5" stroke-linejoin="round"></path>' +
    '<path data-cink d="M-20,-2 L20,-2" fill="none" stroke="#d7d3ca" stroke-width="1.5"></path>' +
    '<circle data-cink cx="-13" cy="-27" r="2" fill="none" stroke="#d7d3ca" stroke-width="1.2"></circle>' +
    '<circle data-cink cx="0" cy="-33" r="2" fill="none" stroke="#d7d3ca" stroke-width="1.2"></circle>' +
    '<circle data-cink cx="13" cy="-27" r="2" fill="none" stroke="#d7d3ca" stroke-width="1.2"></circle>' +
    '<path data-cink data-jewel d="M0,16 L7,25 L0,34 L-7,25 Z" fill="none" stroke="#d7d3ca" stroke-width="1.5"></path>' +
    '<path data-cink d="M-16,46 L16,46" fill="none" stroke="#6e6b63" stroke-width="1"></path>' +
    "</g>" +
    // cooling steam + dust puffs
    '<g data-part="cool" transform="translate(806,300)" opacity="0">' +
    '<path d="M-14,8 q4,-8 0,-14 q-4,-6 2,-12" fill="none" stroke="#948f87" stroke-width="1.4"></path>' +
    '<path d="M10,6 q4,-8 0,-13 q-3,-5 2,-10" fill="none" stroke="#948f87" stroke-width="1.4"></path>' +
    "</g>" +
    '<g data-part="dust" transform="translate(830,338)" opacity="0">' +
    '<path d="M6,0 q8,-3 12,-9" fill="none" stroke="#6e6b63" stroke-width="1.3"></path>' +
    '<path d="M4,8 q9,0 14,-4" fill="none" stroke="#6e6b63" stroke-width="1.3"></path>' +
    "</g>" +
    // the smith (right, facing the anvil)
    '<g data-part="smith" transform="translate(945,520)">' +
    '<path d="M-36,0 L-25,-82 Q0,-96 25,-82 L36,0 Z" fill="rgba(233,229,220,0.05)" stroke="#b1ada4" stroke-width="2" stroke-linejoin="round"></path>' +
    '<path d="M-18,-78 L-12,-8 M18,-80 L12,-8" fill="none" stroke="#948f87" stroke-width="1.3"></path>' +
    '<path d="M18,-52 q10,4 16,12 M18,-52 q13,0 19,6" fill="none" stroke="#948f87" stroke-width="1.3"></path>' +
    '<path d="M-12,-74 Q-64,-84 -106,-100" fill="none" stroke="#b1ada4" stroke-width="2" stroke-linecap="round"></path>' +
    '<path d="M-106,-100 L-118,-94 M-106,-100 L-116,-108" fill="none" stroke="#b1ada4" stroke-width="1.6" stroke-linecap="round"></path>' +
    '<g data-part="shd" transform="rotate(0 0 -98)">' +
    '<circle cx="0" cy="-126" r="27" fill="rgba(233,229,220,0.05)" stroke="#b1ada4" stroke-width="2"></circle>' +
    '<g data-part="sm-eyes"><circle cx="-16" cy="-129" r="2.4" fill="#d7d3ca"></circle><circle cx="-4" cy="-128" r="2.4" fill="#d7d3ca"></circle></g>' +
    '<g data-part="sm-eyesc" opacity="0"><path d="M-19,-129 L-13,-129 M-7,-128 L-1,-128" stroke="#d7d3ca" stroke-width="1.6" stroke-linecap="round"></path></g>' +
    '<path d="M-16,-114 q4,2 8,0" fill="none" stroke="#b1ada4" stroke-width="1.6" stroke-linecap="round"></path>' +
    '<path d="M-17,-108 Q-8,-100 3,-103" fill="none" stroke="#948f87" stroke-width="1.4"></path>' +
    '<line x1="-26" y1="-136" x2="26" y2="-133" stroke="#b1ada4" stroke-width="2"></line>' +
    '<path d="M26,-133 l11,-5 M26,-133 l10,3" fill="none" stroke="#948f87" stroke-width="1.4" stroke-linecap="round"></path>' +
    '<circle cx="2" cy="-158" r="6" fill="rgba(233,229,220,0.05)" stroke="#b1ada4" stroke-width="1.8"></circle>' +
    "</g>" +
    '<path data-part="sweat" d="M28,-148 q4,7 0,11 q-4,-4 0,-11" fill="none" stroke="#b1ada4" stroke-width="1.4" opacity="0"></path>' +
    '<circle cx="-14" cy="-78" r="3.5" fill="#b1ada4"></circle>' +
    '<g data-pose="rest">' +
    '<path d="M-14,-78 Q-32,-68 -38,-56" fill="none" stroke="#b1ada4" stroke-width="2" stroke-linecap="round"></path>' +
    '<circle cx="-38" cy="-56" r="3" fill="#b1ada4"></circle>' +
    '<line x1="-38" y1="-56" x2="-50" y2="-16" stroke="#b1ada4" stroke-width="3.5" stroke-linecap="round"></line>' +
    '<rect x="-64" y="-20" width="27" height="17" rx="2.5" fill="rgba(233,229,220,0.09)" stroke="#b1ada4" stroke-width="2" transform="rotate(-18 -50 -12)"></rect>' +
    "</g>" +
    '<g data-pose="up" style="display:none;">' +
    '<path d="M-14,-78 Q-26,-98 -18,-114" fill="none" stroke="#b1ada4" stroke-width="2" stroke-linecap="round"></path>' +
    '<circle cx="-18" cy="-114" r="3" fill="#b1ada4"></circle>' +
    '<line x1="-18" y1="-114" x2="32" y2="-158" stroke="#b1ada4" stroke-width="3.5" stroke-linecap="round"></line>' +
    '<rect x="22" y="-178" width="30" height="20" rx="3" fill="rgba(233,229,220,0.09)" stroke="#b1ada4" stroke-width="2" transform="rotate(-40 37 -168)"></rect>' +
    "</g>" +
    '<g data-pose="over" style="display:none;">' +
    '<path d="M-14,-78 Q-16,-102 -2,-114" fill="none" stroke="#b1ada4" stroke-width="2" stroke-linecap="round"></path>' +
    '<circle cx="-2" cy="-114" r="3" fill="#b1ada4"></circle>' +
    '<line x1="-2" y1="-114" x2="44" y2="-138" stroke="#b1ada4" stroke-width="3.5" stroke-linecap="round"></line>' +
    '<rect x="34" y="-156" width="30" height="20" rx="3" fill="rgba(233,229,220,0.09)" stroke="#b1ada4" stroke-width="2" transform="rotate(-28 49 -146)"></rect>' +
    "</g>" +
    '<g data-pose="strike" style="display:none;">' +
    '<path d="M-14,-78 Q-40,-96 -60,-104" fill="none" stroke="#b1ada4" stroke-width="2" stroke-linecap="round"></path>' +
    '<circle cx="-60" cy="-104" r="3" fill="#b1ada4"></circle>' +
    '<line x1="-60" y1="-104" x2="-98" y2="-128" stroke="#b1ada4" stroke-width="3.5" stroke-linecap="round"></line>' +
    '<rect x="-122" y="-146" width="30" height="20" rx="3" fill="rgba(233,229,220,0.09)" stroke="#b1ada4" stroke-width="2" transform="rotate(32 -107 -136)"></rect>' +
    '<path d="M-64,-140 Q-30,-158 4,-152" fill="none" stroke="#6e6b63" stroke-width="1.2" stroke-dasharray="3 5"></path>' +
    "</g>" +
    '<g data-pose="shoulder" style="display:none;">' +
    '<path d="M-14,-78 Q-28,-70 -34,-58" fill="none" stroke="#b1ada4" stroke-width="2" stroke-linecap="round"></path>' +
    '<circle cx="-34" cy="-58" r="3" fill="#b1ada4"></circle>' +
    '<line x1="-34" y1="-58" x2="40" y2="-130" stroke="#b1ada4" stroke-width="3.5" stroke-linecap="round"></line>' +
    '<rect x="30" y="-148" width="30" height="20" rx="3" fill="rgba(233,229,220,0.09)" stroke="#b1ada4" stroke-width="2" transform="rotate(-45 45 -138)"></rect>' +
    "</g>" +
    "</g>" +
    // impact: flash, sparks, embers
    '<circle data-part="flash" cx="836" cy="392" r="9" fill="#e9e5dc" opacity="0"></circle>' +
    '<g data-part="sparks" transform="translate(836,392) rotate(0)" opacity="0">' +
    '<line x1="8" y1="-6" x2="18" y2="-16" stroke="#e8b27d" stroke-width="2" stroke-linecap="round"></line>' +
    '<line x1="-6" y1="-10" x2="-14" y2="-22" stroke="#e8b27d" stroke-width="2" stroke-linecap="round"></line>' +
    '<line x1="12" y1="2" x2="24" y2="5" stroke="#e8b27d" stroke-width="2" stroke-linecap="round"></line>' +
    '<line x1="-11" y1="3" x2="-22" y2="8" stroke="#e8b27d" stroke-width="2" stroke-linecap="round"></line>' +
    '<line x1="2" y1="-12" x2="4" y2="-24" stroke="#e8b27d" stroke-width="2" stroke-linecap="round"></line>' +
    '<line x1="-2" y1="10" x2="-6" y2="20" stroke="#e8b27d" stroke-width="1.6" stroke-linecap="round"></line>' +
    '<path d="M-2,-28 L2,-23 L-2,-18 L-6,-23 Z" fill="#e8b27d"></path>' +
    '<path d="M20,-10 L23,-6 L20,-2 L17,-6 Z" fill="#e8b27d"></path>' +
    "</g>" +
    '<g data-part="embers">' +
    '<circle data-ember r="2" fill="#e8b27d" opacity="0"></circle>' +
    '<circle data-ember r="1.6" fill="#e8b27d" opacity="0"></circle>' +
    '<circle data-ember r="1.3" fill="#e8b27d" opacity="0"></circle>' +
    "</g>" +
    "</g>" +
    "</svg>" +
    '<div class="ac-forge__caps">' +
    '<div class="ac-forge__cap" data-cap>THE SKIES ARE CONSULTED</div>' +
    '<div class="ac-forge__sub" data-sub>a crown, already overhead.</div>' +
    '<div class="ac-forge__count" data-count></div>' +
    '<div class="ac-forge__end" data-end hidden>' +
    '<div class="ac-forge__endbtns">' +
    '<button type="button" class="ac-btn ac-btn--secondary" data-ac-return>Return to the marks</button>' +
    '<button type="button" class="ac-btn ac-btn--ghost" data-ac-replay>Strike it again</button>' +
    "</div>" +
    '<div class="ac-forge__endnote">The reading follows here, once its pages are bound.</div>' +
    "</div>" +
    "</div>" +
    '<button type="button" class="ac-forge__skip" data-ac-skip>Skip the ceremony →</button>' +
    "</div>";
  }

  function ForgeCeremony(host, nameMark, material, onExit) {
    var nm = (nameMark || "").trim();
    var slipName = nm ? nm.slice(0, 16) : "the marks";
    host.innerHTML = ceremonySceneHTML(slipName);
    var root = host.querySelector(".ac-forge");
    var m = material || MATERIAL;

    var q = function (s) { return root.querySelector('[data-part="' + s + '"]'); };
    var P = {
      world: q("world"), shaman: q("shaman"), shead: q("shead"), mugarm: q("mugarm"),
      steam1: q("steam1"), steam2: q("steam2"), tea: q("tea"), answermark: q("answermark"),
      slip: q("slip"), glow: q("glow"), flame1: q("flame1"), flame2: q("flame2"),
      smith: q("smith"), shd: q("shd"), sweat: q("sweat"),
      sparks: q("sparks"), flash: q("flash"), cardg: q("cardg"), cardhalo: q("cardhalo"),
      cool: q("cool"), dust: q("dust"), beam: q("beam"),
      shEyes: q("sh-eyes"), shEyesC: q("sh-eyesc"), smEyes: q("sm-eyes"), smEyesC: q("sm-eyesc"),
    };
    var cap = root.querySelector("[data-cap]"), sub = root.querySelector("[data-sub]"), count = root.querySelector("[data-count]");
    var stars = slice(root.querySelectorAll("[data-star]"));
    var clines = slice(root.querySelectorAll("[data-cline]"));
    var embers = slice(root.querySelectorAll("[data-ember]"));
    var poses = {};
    slice(root.querySelectorAll("[data-pose]")).forEach(function (g) { poses[g.getAttribute("data-pose")] = g; });
    var cinks = slice(root.querySelectorAll("[data-cink]"));
    cinks.forEach(function (n) {
      var L = 100; try { L = n.getTotalLength(); } catch (e) {}
      n._len = L; n.style.strokeDasharray = L + " " + L; n.style.strokeDashoffset = L; n.style.transition = "none";
    });
    if (P.cardhalo) P.cardhalo.style.fill = m;
    if (P.glow) P.glow.style.fill = m;
    if (P.flame1) P.flame1.style.stroke = m;
    if (P.flame2) P.flame2.style.stroke = m;

    // the forging schedule: 8 strikes with character beats between
    var sched = [];
    function pushSeg(type, len) { sched.push({ type: type, len: len }); }
    pushSeg("strike", 6); pushSeg("strike", 6); pushSeg("strike", 6);
    pushSeg("inspect", 5);
    pushSeg("strike", 6); pushSeg("strike", 6); pushSeg("strike", 6);
    pushSeg("blow", 5);
    pushSeg("strike", 6);
    pushSeg("big", 9);
    var schedLen = sched.reduce(function (a, s) { return a + s.len; }, 0); // 61
    var forgeStart = 82, finishStart = forgeStart + schedLen, endTick = finishStart + 16; // 143, 159

    var iv = null, f = 0, beat = -1, pose = null, done = false;
    var endEl = root.querySelector("[data-end]"), skipEl = root.querySelector("[data-ac-skip]");

    function setCaption(b) {
      if (b === beat) return;
      beat = b;
      var caps = [
        ["THE SKIES ARE CONSULTED", "a crown, already overhead."],
        ["THE MUG IS CONSULTED", "the mug agrees. the mug usually agrees."],
        ["THE MARKS ARE FORWARDED", "by air, the old way."],
        ["THE COMMISSION IS ACCEPTED", "the smith reads it twice. it is a crown."],
        ["THE RECORD IS STRUCK", "strike by strike, nothing extra."],
        ["THE READING IS DRAWN", "filed, sealed, and cooling."],
      ];
      if (cap) cap.textContent = caps[b][0];
      if (sub) sub.textContent = caps[b][1];
      if (count && b !== 4) count.textContent = "";
    }
    function setPose(name) {
      if (pose === name) return;
      pose = name;
      Object.keys(poses).forEach(function (k) { poses[k].style.display = k === name ? "" : "none"; });
    }
    function poseLean(name) { return { rest: 0, up: -3, over: -6, strike: 5, shoulder: -2 }[name] || 0; }
    function revealCard(n) { cinks.forEach(function (el, i) { el.style.strokeDashoffset = i < n ? "0" : String(el._len); }); }
    function setImpact(on, big, strikeNo) {
      P.flash.style.opacity = on ? (big ? "0.9" : "0.65") : "0";
      if (on) {
        P.flash.setAttribute("r", big ? "15" : "9");
        P.sparks.setAttribute("transform", "translate(836,392) rotate(" + ((strikeNo * 47) % 360) + ")" + (big ? " scale(1.6)" : ""));
      }
      P.sparks.style.opacity = on ? "1" : "0";
    }
    function setEmbers(age, strikeNo, big) {
      embers.forEach(function (e, i) {
        if (age < 0 || age > 2) { e.style.opacity = "0"; return; }
        var dir = ((strikeNo * 31 + i * 53) % 60) - 30;
        var spread = big ? 1.6 : 1;
        e.setAttribute("cx", String(836 + dir * spread * (age + 1) * 0.5));
        e.setAttribute("cy", String(392 - (14 + i * 6) * spread * (age + 1) * 0.45));
        e.style.opacity = String(0.9 - age * 0.35);
      });
    }
    function blink(fr) {
      var sh = fr % 23 === 0, sm = fr % 19 === 3;
      P.shEyes.style.opacity = sh ? "0" : "1";
      P.shEyesC.style.opacity = sh ? "1" : "0";
      P.smEyes.style.opacity = sm ? "0" : "1";
      P.smEyesC.style.opacity = sm ? "1" : "0";
    }

    function tick(fr) {
      if (!P || !P.shaman) return;
      var jx = ((fr * 37) % 3) - 1, jy = (fr * 17) % 2;
      var kx = ((fr * 53) % 3) - 1, ky = (fr * 23) % 2;
      var shamanHop = 0, worldShake = 0;
      blink(fr);
      var forging = fr >= forgeStart && fr < finishStart;
      var fl = (fr >> 1) % 2 === 0;
      P.flame1.style.opacity = fl ? "0.85" : "0";
      P.flame2.style.opacity = fl ? "0" : "0.85";
      var glow = (forging ? 0.2 : 0.1) + 0.07 * ((fr >> 1) % 3);

      if (fr < 28) {                                   // B1: the skies
        setCaption(0); setPose("rest");
        stars.forEach(function (s, i) {
          var on = fr >= 2 + i * 3;
          s.style.opacity = on ? String(0.55 + ((fr + i) % 3) * 0.2) : "0";
        });
        clines.forEach(function (c, i) { c.style.opacity = fr >= 21 + i ? "0.5" : "0"; });
        P.shead.setAttribute("transform", "rotate(" + ((fr % 6) < 3 ? -8 : -12) + " 0 -105)");
        P.mugarm.setAttribute("transform", "rotate(0 16 -82)");
      } else if (fr < 52) {                            // B2: the mug
        setCaption(1); setPose("rest");
        stars.forEach(function (s, i) { s.style.opacity = String(0.5 + ((fr + i) % 4) * 0.08); });
        var lift = Math.min(4, fr - 28);
        var armA = [0, -10, -18, -26, -28][lift] + (((fr % 6) < 3) ? 0 : 2);
        P.mugarm.setAttribute("transform", "rotate(" + armA + " 16 -82)");
        var headA = fr < 32 ? [-8, 0, 8, 16][fr - 28] : ((fr % 6) < 3 ? 16 : 19);
        P.shead.setAttribute("transform", "rotate(" + headA + " 0 -105)");
        var st = (fr >> 1) % 2 === 0;
        P.steam1.style.opacity = st ? "0.8" : "0";
        P.steam2.style.opacity = st ? "0" : "0.8";
        P.tea.style.opacity = "1";
        P.tea.setAttribute("transform", "rotate(" + ((fr * 36) % 360) + " 51 -126)");
        if (fr >= 46) {
          P.answermark.style.opacity = "1";
          P.answermark.setAttribute("transform", "translate(0," + (-(fr - 46) * 3) + ")");
        }
      } else if (fr < 70) {                            // B3: the slip flies
        setCaption(2); setPose("rest");
        P.steam1.style.opacity = "0"; P.steam2.style.opacity = "0";
        P.tea.style.opacity = "0";
        P.answermark.style.opacity = fr < 55 ? "0.5" : "0";
        var toss = (fr >= 56 && fr < 59) ? 16 : 0;
        P.mugarm.setAttribute("transform", "rotate(" + (Math.min(0, -28 + 8 * (fr - 52)) + toss) + " 16 -82)");
        P.shead.setAttribute("transform", "rotate(" + Math.max(0, 16 - 5 * (fr - 52)) + " 0 -105)");
        if (fr >= 54) {
          P.slip.style.opacity = "1";
          if (fr < 56) {
            P.slip.setAttribute("transform", "translate(300,398) rotate(-6)");
          } else if (fr <= 68) {
            var u = Math.min(1, (fr - 56) / 12);
            var x = Math.round(300 + u * 515);
            var y = Math.round(400 - 130 * Math.sin(Math.PI * u) + 30 * u);
            P.slip.setAttribute("transform", "translate(" + x + "," + y + ") rotate(" + (fr % 2 ? -14 : 12) + ")");
          }
        }
      } else if (fr < forgeStart) {                    // B4: the commission
        setCaption(3); setPose("rest");
        P.slip.setAttribute("transform", "translate(815,436) rotate(-4)");
        P.slip.style.opacity = fr < 74 ? "1" : "0";
        P.shd.setAttribute("transform", "rotate(" + (((fr - 70) % 6) < 3 ? 10 : 0) + " 0 -98)");
        if (fr >= 78) revealCard(1);
      } else if (fr < finishStart) {                   // B5: the forging schedule
        setCaption(4);
        var t = fr - forgeStart, seg = null, k = 0, strikeNo = 0, revealSteps = 0;
        for (var i = 0; i < sched.length; i++) {
          var s = sched[i];
          var isStrike = s.type === "strike" || s.type === "big";
          if (t < s.len) { seg = s; k = t; if (isStrike) strikeNo = revealSteps + 1; break; }
          t -= s.len;
          if (isStrike) revealSteps++;
        }
        var hitTick = seg.type === "big" ? 4 : 2;
        var landed = (seg.type === "strike" || seg.type === "big") && k >= hitTick ? 1 : 0;
        revealCard(1 + Math.round((revealSteps + landed) * 9 / 8));

        if (seg.type === "strike") {
          setPose(["up", "over", "strike", "strike", "up", "up"][k]);
          var hit = k === 2;
          setImpact(hit, false, strikeNo);
          if (k === 3) P.sparks.style.opacity = "0.45";
          setEmbers(hit ? 0 : (k === 3 ? 1 : (k === 4 ? 2 : -1)), strikeNo, false);
          if (hit) { worldShake = 3; glow = 0.42; }
          P.cardg.setAttribute("transform", "translate(" + (806 + (hit ? 3 : 0)) + ",372) rotate(-4)");
          if (count) count.textContent = "STRIKE 0" + strikeNo + " · CLEAN";
          P.shd.setAttribute("transform", "rotate(" + (hit ? 6 : 0) + " 0 -98)");
          P.shead.setAttribute("transform", "rotate(" + (hit ? -4 : 0) + " 0 -105)");
        } else if (seg.type === "big") {
          setPose(["up", "over", "over", "over", "strike", "strike", "strike", "up", "up"][k]);
          var hit2 = k === 4;
          setImpact(hit2, true, strikeNo);
          if (k === 5) P.sparks.style.opacity = "0.6";
          if (k === 6) P.sparks.style.opacity = "0.3";
          setEmbers(k >= 4 ? k - 4 : -1, strikeNo, true);
          if (hit2) { worldShake = 5; glow = 0.5; shamanHop = 4; }
          if (k >= 6) P.sweat.style.opacity = "0.9";
          P.cardg.setAttribute("transform", "translate(" + (806 + (hit2 ? 4 : 0)) + ",372) rotate(-4)");
          if (count) count.textContent = "THE LAST STRIKE";
        } else if (seg.type === "inspect") {
          setPose("rest");
          setImpact(false, false, 0); setEmbers(-1, 0, false);
          P.shd.setAttribute("transform", "rotate(" + (k < 3 ? -9 : (k === 4 ? 8 : 0)) + " 0 -98)");
          if (count) count.textContent = "INSPECTION · PASSES";
        } else if (seg.type === "blow") {
          setPose("rest");
          setImpact(false, false, 0); setEmbers(-1, 0, false);
          P.shd.setAttribute("transform", "rotate(-7 0 -98)");
          P.dust.style.opacity = (k >= 1 && k <= 3) ? String(0.9 - (k - 1) * 0.3) : "0";
          P.dust.setAttribute("transform", "translate(" + (830 + k * 5) + "," + (338 - k * 2) + ")");
          if (count) count.textContent = "DUST · REMOVED";
        }
        if (seg.type !== "blow") P.dust.style.opacity = "0";
        var sip = (fr - forgeStart) % 14;
        if (seg.type !== "strike" || k > 3) {
          P.mugarm.setAttribute("transform", "rotate(" + (sip < 3 ? -16 : 0) + " 16 -82)");
          if (sip < 3) P.shead.setAttribute("transform", "rotate(10 0 -105)");
        }
      } else {                                         // B6: the finish
        setCaption(5);
        if (count) count.textContent = "";
        var kf = fr - finishStart;
        setPose("shoulder");
        setImpact(false, false, 0); setEmbers(-1, 0, false);
        P.sweat.style.opacity = kf < 5 ? "0.9" : "0";
        var rise = Math.min(12, kf);
        P.cardg.setAttribute("transform", "translate(806," + (372 - rise * 3.2) + ") rotate(" + (-4 + rise / 3) + ")");
        revealCard(cinks.length);
        P.cool.style.opacity = kf < 8 ? String(0.8 - kf * 0.08) : "0";
        P.cool.setAttribute("transform", "translate(" + (806 + ((kf % 2) ? 3 : -3)) + "," + (300 - kf * 2) + ")");
        P.beam.style.opacity = (kf >= 3 && kf <= 10) ? ((kf % 2) ? "0.35" : "0.18") : "0";
        if (kf >= 5) {
          cinks.forEach(function (el) {
            if (el.hasAttribute("data-jewel")) { el.style.fill = m; el.style.fillOpacity = "0.35"; }
          });
          P.cardhalo.style.opacity = String(Math.min(0.16, (kf - 5) * 0.025));
        }
        P.shead.setAttribute("transform", "rotate(" + ((kf % 6) < 3 ? -4 : 0) + " 0 -105)");
        P.shd.setAttribute("transform", "rotate(0 0 -98)");
      }

      P.glow.style.opacity = String(glow);
      P.world.setAttribute("transform", "translate(0," + worldShake + ")");
      P.shaman.setAttribute("transform", "translate(" + (225 + jx) + "," + (520 + jy - shamanHop) + ")");
      P.smith.setAttribute("transform", "translate(" + (945 + kx) + "," + (520 + ky) + ") rotate(" + poseLean(pose) + ")");
    }

    function setDone(v) { done = v; if (endEl) endEl.hidden = !v; if (skipEl) skipEl.hidden = v; }

    function start() {
      if (iv) clearInterval(iv);
      f = 0; beat = -1;
      iv = setInterval(function () {
        tick(f); f++;
        if (f > endTick) { clearInterval(iv); iv = null; setDone(true); }
      }, 125);
    }

    function jumpToEnd() {
      if (iv) { clearInterval(iv); iv = null; }
      stars.forEach(function (s) { s.style.opacity = "0.6"; });
      clines.forEach(function (c) { c.style.opacity = "0.5"; });
      P.shead.setAttribute("transform", "rotate(0 0 -105)");
      P.mugarm.setAttribute("transform", "rotate(0 16 -82)");
      P.steam1.style.opacity = "0"; P.steam2.style.opacity = "0";
      P.tea.style.opacity = "0"; P.answermark.style.opacity = "0"; P.slip.style.opacity = "0";
      setImpact(false, false, 0); setEmbers(-1, 0, false);
      P.sweat.style.opacity = "0"; P.dust.style.opacity = "0"; P.cool.style.opacity = "0"; P.beam.style.opacity = "0";
      setPose("shoulder");
      P.shd.setAttribute("transform", "rotate(0 0 -98)");
      P.flame1.style.opacity = "0.85"; P.flame2.style.opacity = "0";
      P.glow.style.opacity = "0.2";
      P.world.setAttribute("transform", "translate(0,0)");
      P.smith.setAttribute("transform", "translate(945,520) rotate(-2)");
      P.shaman.setAttribute("transform", "translate(225,520)");
      P.cardg.setAttribute("transform", "translate(806,334) rotate(0)");
      revealCard(cinks.length);
      cinks.forEach(function (el) {
        if (el.hasAttribute("data-jewel")) { el.style.fill = m; el.style.fillOpacity = "0.35"; }
      });
      P.cardhalo.style.opacity = "0.16";
      setCaption(5);
      setDone(true);
    }

    function resetScene() {
      stars.forEach(function (s) { s.style.opacity = "0"; });
      clines.forEach(function (c) { c.style.opacity = "0"; });
      revealCard(0);
      cinks.forEach(function (el) {
        if (el.hasAttribute("data-jewel")) { el.style.fill = "none"; el.style.fillOpacity = "0"; }
      });
      P.cardhalo.style.opacity = "0";
      P.cardg.setAttribute("transform", "translate(806,372) rotate(-4)");
      P.slip.style.opacity = "0";
      P.answermark.style.opacity = "0"; P.answermark.setAttribute("transform", "translate(0,0)");
      P.sweat.style.opacity = "0"; P.dust.style.opacity = "0"; P.cool.style.opacity = "0"; P.beam.style.opacity = "0";
      setPose("rest"); beat = -1;
    }

    // controls
    if (skipEl) skipEl.addEventListener("click", jumpToEnd);
    var retEl = root.querySelector("[data-ac-return]"), repEl = root.querySelector("[data-ac-replay]");
    if (retEl) retEl.addEventListener("click", function () { if (onExit) onExit(); });
    if (repEl) repEl.addEventListener("click", function () { resetScene(); setDone(false); start(); });
    function onKey(e) { if (e.key === "Escape") { done ? (onExit && onExit()) : jumpToEnd(); } }
    window.addEventListener("keydown", onKey);

    var rm = window.matchMedia && (window.BRMotion ? window.BRMotion.prefersReduced() : window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    if (rm) jumpToEnd(); else start();

    return { destroy: function () { if (iv) clearInterval(iv); window.removeEventListener("keydown", onKey); } };
  }

  /* ---------------------------------------------------------------
     MOUNT — wire the intake, the crown, and the ceremony
  --------------------------------------------------------------- */
  function mount(host) {
    var params = {};
    try { new URLSearchParams(location.search).forEach(function (v, k) { params[k] = v; }); } catch (e) {}

    // BR-S199: the gift deed composer — a distinct small view (?dev=arcane&gift=compose)
    if (params.gift === "compose") return mountGiftCompose(host);

    host.innerHTML = intakeHTML(params);
    var root = host.querySelector(".arcane");
    var crown = CrownBlueprint(root.querySelector("[data-ac-crown]"));
    var inputs = slice(root.querySelectorAll(".ac-mark__field"));
    var notice = root.querySelector("[data-ac-notice]");
    var drawBtn = root.querySelector("[data-ac-draw]");
    var ceremonyHost = root.querySelector("[data-ac-ceremony]");
    var noticeT = null, ceremony = null;

    // ---- who is it for? (§ from the profile hand-off) — skipped in gift-recipient mode ----
    var chips = slice(root.querySelectorAll("[data-forwhom]"));
    var famMenu = root.querySelector(".ac-fammenu");
    var forWhom = "self", famSubject = "";
    function flashNotice(t) { notice.textContent = t; clearTimeout(noticeT); noticeT = setTimeout(function () { notice.textContent = ""; }, 3400); }
    function closeFam() { if (famMenu) famMenu.hidden = true; var f = root.querySelector("[data-fampick]"); if (f) f.setAttribute("aria-expanded", "false"); }
    function labelFamily(member) { var who = root.querySelector('[data-forwhom="family"] .ac-forwhom__who'); if (who) who.textContent = member ? "Family · " + member : "Family"; }
    function setForWhom(id) {
      forWhom = id;
      chips.forEach(function (c) {
        var on = c.getAttribute("data-forwhom") === id;
        c.setAttribute("aria-checked", String(on));
        c.setAttribute("tabindex", on ? "0" : "-1");   // BR-S201: roving tabindex (ARIA radio pattern)
      });
    }
    chips.forEach(function (c) {
      c.addEventListener("click", function () {
        if (c.classList.contains("is-locked")) { flashNotice("THIS UNLOCKS AFTER YOUR FIRST READING — THE FIRST IS FOR YOURSELF."); return; }
        setForWhom(c.getAttribute("data-forwhom"));
        if (c.hasAttribute("data-fampick") && famMenu) {
          var willOpen = famMenu.hidden; famMenu.hidden = !willOpen; c.setAttribute("aria-expanded", String(willOpen));
        } else closeFam();
      });
    });
    if (famMenu) slice(famMenu.querySelectorAll("[data-fam-choice]")).forEach(function (b) {
      b.addEventListener("click", function () {
        famSubject = b.getAttribute("data-fam-choice");
        setForWhom("family"); labelFamily(famSubject); closeFam();
      });
    });
    // BR-S201 a11y: arrow-key navigation across the forwhom radiogroup (roving tabindex set in setForWhom)
    var forwhomGrp = root.querySelector(".ac-forwhom__opts");
    if (forwhomGrp) forwhomGrp.addEventListener("keydown", function (ev) {
      var enabled = chips.filter(function (c) { return !c.classList.contains("is-locked"); });
      if (!enabled.length) return;
      var cur = enabled.indexOf(document.activeElement); if (cur < 0) cur = 0;
      var to = -1;
      if (ev.key === "ArrowRight" || ev.key === "ArrowDown") to = (cur + 1) % enabled.length;
      else if (ev.key === "ArrowLeft" || ev.key === "ArrowUp") to = (cur - 1 + enabled.length) % enabled.length;
      else if (ev.key === "Home") to = 0;
      else if (ev.key === "End") to = enabled.length - 1;
      if (to < 0) return;
      ev.preventDefault();
      var c = enabled[to];
      setForWhom(c.getAttribute("data-forwhom")); closeFam(); c.focus();
    });
    // BR-S201 a11y: close the family menu on Escape / outside-click (mirrors the profile)
    function famDocClose(ev) {
      if (!famMenu || famMenu.hidden) return;
      var t = root.querySelector("[data-fampick]");
      if (t && !t.contains(ev.target) && !famMenu.contains(ev.target)) closeFam();
    }
    root.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && famMenu && !famMenu.hidden) {
        ev.preventDefault(); closeFam();
        var t = root.querySelector("[data-fampick]"); if (t) t.focus();
      }
    });
    document.addEventListener("click", famDocClose);
    // pre-select from the profile's "read for someone" (?for=other&subject=…) → Family + member
    var wantId = "self";
    if (params["for"] === "other") {
      wantId = "family";
      if (params.subject) { famSubject = params.subject.charAt(0).toUpperCase() + params.subject.slice(1); labelFamily(famSubject); }
    }
    setForWhom(wantId);
    // redraw context — the original crown is RIPPED when this is drawn
    var redrawBanner = root.querySelector("[data-ac-redraw]");
    var drawLabel = root.querySelector("[data-ac-draw-label]");
    if (params.redraw === "1" || params.intent === "redraw") {
      var w = WHOFOR.filter(function (x) { return x.id === wantId; })[0];
      var subjName = (w && w.crown) ? w.crown : (wantId === "self" ? "your crown" : "this crown");
      redrawBanner.hidden = false;
      redrawBanner.innerHTML = '<span class="ac-redraw-banner__mark" aria-hidden="true">&#10022;</span> Enriching ' +
        esc(subjName) + " — a new reading is drawn and its rubies are added to the crown. The original is kept, never lost.";
      if (drawLabel) drawLabel.textContent = "Draw the richer reading";
    }

    function totalChars() { var c = 0; inputs.forEach(function (i) { c += (i.value || "").length; }); return c; }
    function progress() { return Math.min(1, totalChars() / Math.max(8, COMPLETION_CHARS)); }
    function refresh() { crown.draw(progress()); }

    function exitCeremony() {
      if (ceremony && ceremony.destroy) ceremony.destroy();
      ceremony = null;
      ceremonyHost.hidden = true;
      ceremonyHost.innerHTML = "";
    }
    function startCeremony() {
      if (totalChars() === 0) {
        notice.textContent = "NO MARKS ARE SET. THE FORGE HAS NOTHING TO STRIKE.";
        clearTimeout(noticeT);
        noticeT = setTimeout(function () { notice.textContent = ""; }, 3400);
        return;
      }
      notice.textContent = "";
      var nameVal = "", dayVal = "";
      inputs.forEach(function (i) {
        if (i.dataset.mark === "name") nameVal = i.value;
        if (i.dataset.mark === "day") dayVal = i.value;
      });
      // Build the reading's seed FROM THE MARKS: a real birth date derives the
      // reading (sun sign / year animal / life path); otherwise a name-seeded draw
      // so a reading still lands. The reading (arcana-reading.js) reads ?seed=.
      var nm = (nameVal || "Seeker").replace(/~/g, " ").trim() || "Seeker";
      var b = parseBirth(dayVal);
      var seed = b ? ("birth~" + nm + "~" + b.y + "~" + b.m + "~" + b.d) : ("draw~" + nm + "~" + totalChars());
      var enterReading = function () {
        try { localStorage.setItem("br_has_reading", "1"); } catch (e) {}   // unlocks Family/Friend next time
        location.href = "?dev=arcana-reading&seed=" + encodeURIComponent(seed);
      };
      if (ceremony && ceremony.destroy) ceremony.destroy();
      ceremonyHost.hidden = false;
      // BR-S164: "Draw the reading" now opens the redesigned ceremony (ceremony.js,
      // window.BRCeremony) — the builder's pixel-perfect forge scene, alive, with the
      // crown forged over 5 hits. Back → the marks; "Enter the reading" → the result.
      // Falls back to the original inline ForgeCeremony if ceremony.js didn't load.
      if (window.BRCeremony && typeof window.BRCeremony.mount === "function") {
        ceremony = window.BRCeremony.mount(ceremonyHost, { onExit: exitCeremony, onDone: enterReading });
      } else {
        ceremony = ForgeCeremony(ceremonyHost, nameVal, MATERIAL, exitCeremony);
      }
    }

    inputs.forEach(function (i) { i.addEventListener("input", refresh); });
    root.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && e.target && e.target.classList && e.target.classList.contains("ac-mark__field")) {
        e.preventDefault(); startCeremony();
      }
    });
    drawBtn.addEventListener("click", startCeremony);
    refresh();

    return { destroy: function () { clearTimeout(noticeT); document.removeEventListener("click", famDocClose); exitCeremony(); } };
  }

  // BR-S199: the gift deed composer — send a deed link; the recipient sits their own free reading.
  function mountGiftCompose(host) {
    host.innerHTML = giftComposeHTML();
    var root = host.querySelector(".arcane");
    var sendBtn = root.querySelector("[data-gift-send]");
    var cta = root.querySelector("[data-gift-cta]");
    var fromEl = root.querySelector("[data-gift-from]");
    function deedURL() {
      var from = (fromEl && fromEl.value || "").replace(/[<>~]/g, "").trim();
      var base = location.origin + location.pathname + "?dev=arcane&gift=1";
      return base + (from ? "&from=" + encodeURIComponent(from) : "");
    }
    function showDeed() {
      var url = deedURL();
      cta.innerHTML =
        '<div class="ac-deed">' +
          '<p class="ac-deed__title"><span aria-hidden="true">&#10022;</span> The deed is drawn.</p>' +
          '<p class="ac-deed__line">A Blue Room reading, un-drawn — for the bearer to sit and keep.</p>' +
          '<input class="ac-deed__link" data-deed-link readonly value="' + esc(url) + '" aria-label="The deed link">' +
          '<button type="button" class="ac-draw ac-deed__copy" data-gift-copy>Copy the deed link</button>' +
          '<p class="ac-deed__note" data-deed-note>Hand this to them. They sit the reading free, read it free, and keep it as a Gift of you.</p>' +
          '<p class="ac-mocknote">Dev mock — the link works; keeping it needs an account, later.</p>' +
        '</div>';
      var copyBtn = root.querySelector("[data-gift-copy]"), linkEl = root.querySelector("[data-deed-link]"), note = root.querySelector("[data-deed-note]");
      copyBtn.addEventListener("click", function () {
        function done() { note.textContent = "Deed link copied."; }
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(linkEl.value).then(done, function () { linkEl.select(); done(); });
          else { linkEl.select(); document.execCommand && document.execCommand("copy"); done(); }
        } catch (e) { linkEl.select(); }
      });
      linkEl.focus(); linkEl.select();
    }
    var reduce = window.matchMedia && (window.BRMotion ? window.BRMotion.prefersReduced() : window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    sendBtn.addEventListener("click", function () {
      if (reduce) return showDeed();
      sendBtn.disabled = true; sendBtn.classList.add("is-settled"); sendBtn.textContent = "Sent";
      setTimeout(showDeed, 620);
    });
    return { destroy: function () {} };
  }

  window.BRArcane = { mount: mount };
})();
