/* =====================================================================
   BLUE ROOM — Staged Card Reveal · UNIT 3/7 ReadingPanel (BR-S126)
   The hand-drawn "archive sketchbook" readings. engine 'free' -> 4
   modules; engine 'halo' -> 8 modules (adds Frame Signature [the comet
   metric] + the Source photo). Swap, not augment. Every sketch + label
   DRAWS ITSELF IN when the arrow is pressed (stroke-dashoffset + fade),
   sequenced module-by-module — slow + deliberate (it has a mood).
   clear() empties the panel as the card morphs to halo.
   ===================================================================== */
(function () {
  window.BRReveal = window.BRReveal || {};
  function motionOff() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ---- the hand-drawn sketches (shared stroke styling lives in CSS) ---- */
  var SKETCHES = {
    surface: { vb: "0 0 130 64", m:
      '<circle class="d" pathLength="100" cx="22" cy="22" r="11.2"/><circle class="d" pathLength="100" cx="65" cy="22" r="11.4"/><circle class="d" pathLength="100" cx="108" cy="22" r="11.1"/>' +
      '<line class="d" pathLength="100" x1="16" y1="16" x2="20" y2="27"/><line class="d" pathLength="100" x1="21" y1="14" x2="25" y2="25"/><line class="d" pathLength="100" x1="26" y1="16" x2="29" y2="27"/>' +
      '<line class="d" pathLength="100" x1="59" y1="16" x2="63" y2="27"/><line class="d" pathLength="100" x1="64" y1="14" x2="68" y2="25"/><line class="d" pathLength="100" x1="69" y1="16" x2="72" y2="27"/>' +
      '<line class="d" pathLength="100" x1="102" y1="16" x2="106" y2="27"/><line class="d" pathLength="100" x1="107" y1="14" x2="111" y2="25"/><line class="d" pathLength="100" x1="112" y1="16" x2="115" y2="27"/>' +
      '<path class="d" pathLength="100" d="M10 50 C22 48, 30 53, 42 50 C54 47, 62 52, 75 50 C88 48, 96 53, 108 50 C114 48, 118 51, 120 50"/>' },
    surfacerec: { vb: "0 0 130 76", m:
      '<circle class="d" pathLength="100" cx="22" cy="26" r="12.2"/><circle class="d" pathLength="100" cx="65" cy="26" r="12.0"/><circle class="d" pathLength="100" cx="108" cy="26" r="12.3"/>' +
      '<line class="d" pathLength="100" x1="14" y1="19" x2="18" y2="32"/><line class="d" pathLength="100" x1="19" y1="16" x2="23" y2="29"/><line class="d" pathLength="100" x1="24" y1="18" x2="28" y2="31"/><line class="d" pathLength="100" x1="28" y1="20" x2="31" y2="33"/><line class="d" pathLength="100" x1="32" y1="19" x2="34" y2="32"/>' +
      '<line class="d" pathLength="100" x1="59" y1="18" x2="63" y2="31"/><line class="d" pathLength="100" x1="64" y1="16" x2="68" y2="29"/><line class="d" pathLength="100" x1="69" y1="17" x2="72" y2="30"/>' +
      '<line class="d" pathLength="100" x1="103" y1="20" x2="107" y2="33"/>' +
      '<path class="d" pathLength="100" d="M12 62 C24 59, 32 65, 46 61 C58 57, 68 64, 80 61 C90 59, 102 63, 114 61 C116 60, 118 62, 118 61"/>' },
    signalwave: { vb: "0 0 160 56", m:
      '<path class="d" pathLength="100" d="M10 30 L18 28 L24 32 L30 29 L36 31 L42 28 L48 32 L54 29 L58 31 L62 28 L66 32 L68 26 L70 8 L72 30 L76 33 L80 29 L86 32 L92 28 L98 32 L104 29 L110 31 L116 28 L120 31"/>' +
      '<path class="d a" pathLength="100" d="M138 16 C150 14, 158 20, 158 28 C158 36, 151 42, 139 43 C127 44, 119 38, 120 29 C121 20, 129 15, 137 16"/>' },
    archetype: { vb: "0 0 116 116", m:
      '<circle class="d" pathLength="100" cx="58" cy="58" r="4"/>' +
      '<line class="d" pathLength="100" x1="58" y1="50" x2="58" y2="24"/><line class="d" pathLength="100" x1="58" y1="66" x2="58" y2="90"/><line class="d" pathLength="100" x1="50" y1="58" x2="24" y2="58"/><line class="d" pathLength="100" x1="66" y1="58" x2="92" y2="58"/>' +
      '<line class="d" pathLength="100" x1="52" y1="52" x2="38" y2="38"/><line class="d" pathLength="100" x1="64" y1="64" x2="80" y2="80"/><line class="d" pathLength="100" x1="52" y1="64" x2="40" y2="76"/><line class="d" pathLength="100" x1="64" y1="52" x2="74" y2="42"/>' +
      '<path class="d a" pathLength="100" d="M61 55 C72 44 84 32 96 21"/><path class="d a" pathLength="100" d="M96 21 L89 24 L92 31 Z"/>' +
      '<path class="d" pathLength="100" d="M88 38 C95 47 96 60 90 71"/><path class="d" pathLength="100" d="M30 74 C24 64 24 51 31 41"/>' },
    aura: { vb: "0 0 116 116", m:
      '<path class="d a" pathLength="100" d="M58 46 C64 46 70 51 70 58 C70 64 65 70 58 70 C51 70 47 64 47 58 C47 51 52 46 58 46 Z"/>' +
      '<path class="d" pathLength="100" d="M58 36 C71 35 81 46 81 58 C81 71 70 81 58 80 C45 80 35 70 36 57 C36 45 46 36 58 36 Z"/>' +
      '<path class="d" pathLength="100" d="M58 25 C75 24 91 39 91 57 C92 76 75 92 57 91 C39 91 24 75 25 57 C25 39 40 25 58 25 Z"/>' +
      '<path class="d" pathLength="100" d="M58 13 C82 12 103 33 103 58 C104 83 81 104 57 103 C33 103 12 81 13 56 C13 33 34 13 58 13 Z"/>' +
      '<path class="d" pathLength="100" d="M58 3 C89 2 114 30 113 58 C113 89 87 114 57 113 C28 113 3 87 3 57 C3 29 29 3 58 3 Z"/>' +
      '<line class="d" pathLength="100" x1="58" y1="62" x2="58" y2="54"/><circle class="d" pathLength="100" cx="58" cy="50" r="1.4"/>' },
    mapquad: { vb: "0 0 120 120", m:
      '<path class="d" pathLength="100" d="M60 12 C59 40 61 80 60 108"/><path class="d" pathLength="100" d="M12 60 C40 61 80 59 108 60"/>' +
      '<line class="d" pathLength="100" x1="56" y1="30" x2="64" y2="30"/><line class="d" pathLength="100" x1="56" y1="90" x2="64" y2="90"/><line class="d" pathLength="100" x1="30" y1="56" x2="30" y2="64"/><line class="d" pathLength="100" x1="90" y1="56" x2="90" y2="64"/>' +
      '<path class="d" pathLength="100" d="M38 40 L38 30 M33 35 L43 35"/><path class="d" pathLength="100" d="M85 38 L77 30 M85 30 L77 38"/><path class="d a" pathLength="100" d="M44 84 L44 74 M39 79 L49 79"/><path class="d" pathLength="100" d="M84 88 L84 78 M79 83 L89 83"/>' },
    diagram: { vb: "0 0 150 120", m:
      '<path class="d" pathLength="100" d="M16 12 C13 12 12 13 12 16 L12 104 C12 107 13 108 16 108 L134 108 C137 108 138 107 138 104 L138 16 C138 13 137 12 134 12 Z"/>' +
      '<circle class="d" pathLength="100" cx="74" cy="40" r="10"/>' +
      '<path class="d" pathLength="100" d="M58 92 C59 76 64 64 74 62 C85 64 90 77 91 93"/>' +
      '<path class="d" pathLength="100" d="M67 66 C56 64 46 60 39 54"/>' +
      '<path class="d a" pathLength="100" d="M38 56 C32 53 28 50 27 44 C27 41 30 40 32 43 C31 47 33 51 38 54"/><path class="d a" pathLength="100" d="M30 43 C30 40 31 38 33 39"/><path class="d a" pathLength="100" d="M33 42 C33 39 35 37 37 39"/><path class="d a" pathLength="100" d="M36 42 C37 39 39 38 40 41"/>' +
      '<line class="d" pathLength="100" x1="86" y1="52" x2="148" y2="44"/><polyline class="d" pathLength="100" points="144,42 148,44 144,47"/>' +
      '<line class="d" pathLength="100" x1="88" y1="78" x2="148" y2="86"/><polyline class="d" pathLength="100" points="144,84 148,86 143,89"/>' },
    mintseal: { vb: "0 0 96 96", m:
      '<circle class="d" pathLength="100" cx="38" cy="42" r="22"/>' +
      '<path class="d" pathLength="100" d="M38 14 C42 18 47 17 50 16 C49 21 51 24 54 26 C50 28 49 33 49 36 C53 37 55 41 56 44 C52 45 50 49 50 53 C46 51 41 53 38 56 C35 53 30 51 26 53 C26 49 24 45 20 44 C21 41 23 37 27 36 C27 33 26 28 22 26 C25 24 27 21 26 16 C29 17 34 18 38 14 Z"/>' +
      '<path class="d a" pathLength="100" d="M38 32 L48 42 L38 53 L28 42 Z"/>' +
      '<path class="d" pathLength="100" d="M58 70 C56 66 60 62 64 64 C67 66 65 72 62 73 C59 74 58 70 61 67 C66 63 74 64 78 70 C80 73 78 78 82 76 C86 74 88 68 92 66"/>' +
      '<path class="d" pathLength="100" d="M60 80 C68 77 80 77 88 80"/>' },
    oraclespark: { vb: "0 0 130 64", m:
      '<path class="d" pathLength="100" d="M40 18 C41 26 42 30 44 32 C42 34 41 38 40 46 C39 38 38 34 36 32 C38 30 39 26 40 18 Z"/><path class="d" pathLength="100" d="M26 32 C34 33 38 34 40 36 C42 34 46 33 54 32 C46 31 42 30 40 28 C38 30 34 31 26 32 Z"/>' +
      '<path class="d a" pathLength="100" d="M92 13 C93 19 93 21 94 22 C93 23 93 25 92 31 C91 25 91 23 90 22 C91 21 91 19 92 13 Z"/><path class="d a" pathLength="100" d="M82 22 C88 23 90 23 92 24 C94 23 96 23 102 22 C96 21 94 21 92 20 C90 21 88 21 82 22 Z"/>' +
      '<path class="d" pathLength="100" d="M110 40 C110 44 111 45 111 46 C111 47 110 48 110 52 C109 48 109 47 109 46 C109 45 109 44 110 40 Z"/><path class="d" pathLength="100" d="M104 46 C108 46 109 46 110 47 C111 46 112 46 116 46 C112 45 111 45 110 45 C109 45 108 45 104 46 Z"/>' +
      '<path class="d" pathLength="100" d="M52 20 L55 17"/><path class="d" pathLength="100" d="M28 46 L25 49"/>' },
    /* the "Comet — a single spike" Frame-Signature silhouette, drawn from
       the real metric radii [0.90,0.52,0.41,0.45,0.60,0.97,0.70,0.49,0.66] */
    comet: { vb: "0 0 116 116", m:
      '<path class="d a" pathLength="100" d="M58 17 L73 40 L77 55 L76 68 L67 84 L43 100 L30 74 L36 54 L39 35 Z"/>' +
      '<line class="d" pathLength="100" x1="58" y1="58" x2="48" y2="88"/>' +
      '<circle class="d" pathLength="100" cx="58" cy="58" r="2.6"/>' },
  };

  function sketch(key) {
    var s = SKETCHES[key];
    if (!s) return "";
    return '<svg class="rv-sketch" viewBox="' + s.vb + '" aria-hidden="true">' + s.m + "</svg>";
  }
  function cap(lines) {
    return lines.map(function (l, i) {
      return '<span class="rv-cap__l' + (i > 0 ? " rv-cap__l--sub" : "") + '">' + esc(l) + "</span>";
    }).join("");
  }
  function pips(n) {
    var s = "";
    for (var i = 0; i < 5; i++) s += '<span class="rv-pip' + (i < n ? " on" : "") + '"></span>';
    return s;
  }
  function stats(rows) {
    return '<div class="rv-stats">' + rows.map(function (r) {
      return '<div class="rv-stat"><span class="rv-stat__k">' + esc(r[0]) + '</span><span class="rv-stat__p">' + pips(r[1]) + "</span></div>";
    }).join("") + "</div>";
  }
  // M5 (BR-S134) — Frame-Signature silhouette GENERATED from 9 radii (0..1 @ 40deg, north-up,
  // clockwise). Verified: cx=cy=58, R=45.6 reproduces the live SRC-01 path (vertex 0 = 58,17) so
  // SRC-01 is identical; SRC-02..05 get their own silhouette. Only the OUTER <path class="d a"> is
  // generated; the inner spike line + centre dot stay STATIC (decorative-glyph law). Class "d a" +
  // pathLength="100" preserved so rv-draw + the reduced-motion snap fire identically. radii guarded.
  function cometSVG(radii) {
    var R = (Array.isArray(radii) && radii.length === 9)
      ? radii
      : [0.90, 0.52, 0.41, 0.45, 0.60, 0.97, 0.70, 0.49, 0.66]; // SRC-01 fallback (freeze-safe)
    var cx = 58, cy = 58, MAX = 45.6, pts = [];
    for (var i = 0; i < 9; i++) {
      var t = (-90 + i * 40) * Math.PI / 180;
      var r = Math.max(0, Math.min(1, +R[i] || 0)) * MAX; // clamp 0..1 (guards >1 / NaN)
      var x = Math.round((cx + r * Math.cos(t)) * 10) / 10;
      var y = Math.round((cy + r * Math.sin(t)) * 10) / 10;
      pts.push(x + " " + y);
    }
    var d = "M" + pts[0] + " L" + pts.slice(1).join(" L") + " Z";
    return '<svg class="rv-sketch" viewBox="0 0 116 116" aria-hidden="true">' +
      '<path class="d a" pathLength="100" d="' + d + '"/>' +
      '<line class="d" pathLength="100" x1="58" y1="58" x2="48" y2="88"/>' +
      '<circle class="d" pathLength="100" cx="58" cy="58" r="2.6"/>' +
      '</svg>';
  }
  // 0..100 stat -> 0..5 pips, clamped. NEVER surface the raw integer (law: no public 0-100).
  function statPip(v) { return Math.max(0, Math.min(5, Math.round((+v || 0) / 20))); }
  function pad2(n) { n = String(n == null ? "" : n); return n.length < 2 ? "0" + n : n; }
  function mod(num, title, bodyHTML, cls) {
    return '<div class="rv-mod' + (cls ? " " + cls : "") + '" data-writein>' +
      '<div class="rv-mod__hd"><span class="rv-mod__num">' + num + "</span><span class=\"rv-mod__title\">" + title + "</span></div>" +
      '<div class="rv-mod__body">' + bodyHTML + "</div></div>";
  }
  function artcap(key, capHTML) {
    return '<div class="rv-mod__art">' + sketch(key) + "</div><div class=\"rv-mod__cap\">" + capHTML + "</div>";
  }
  function subhead(text, halo) {
    return '<div class="rv-subhead' + (halo ? " rv-subhead--halo" : "") + '" data-writein>' +
      '<span class="rv-subhead__t">' + (halo ? "&#9670; " : "") + esc(text) + "</span>" +
      '<svg class="rv-sketch rv-subline" viewBox="0 0 200 8" aria-hidden="true"><path class="d" pathLength="100" d="M2 5 C30 2 50 7 80 4 C110 1 140 7 170 4 C185 3 195 5 198 4"/></svg></div>';
  }

  function buildFree(src) {
    src = src || {};
    var st = (src.card && src.card.stats) || {};
    var h = subhead("Free Readings", false);
    h += '<div class="rv-grid rv-grid--free">';
    h += mod("1", "SURFACE", artcap("surface", cap(["warm copper", "balanced"])));
    h += mod("2", "DIAGRAM",
      '<div class="rv-mod__art rv-mod__art--frame">' + sketch("diagram") + "</div>" +
      '<div class="rv-mod__cap rv-mod__cap--leaders"><span class="rv-cap__l">hand to lens</span><span class="rv-cap__l rv-cap__l--sub">dominant plane</span><span class="rv-cap__l rv-cap__l--gap">open side</span><span class="rv-cap__l rv-cap__l--sub">vector</span></div>',
      "rv-mod--wide");
    h += mod("3", "STATS", stats([
      ["presence", statPip(st.presence)],
      ["frame",    statPip(st.frame)],
      ["signal",   statPip(st.signal)],
      ["impact",   statPip(st.visualImpact)]
    ]), "rv-mod--stats");
    h += mod("4", "SIGNAL NOTE",
      '<div class="rv-mod__art"><div class="rv-signal">' + sketch("signalwave") + '<span class="rv-peak">PEAK</span></div></div>' +
      '<div class="rv-mod__cap">' + cap(["clear intent", "direct contact"]) + "</div>");
    h += "</div>";
    return h;
  }

  function buildHalo(src) {
    src = src || {};
    var card = src.card || {};
    var sig  = (src.frame && src.frame.signature) || {};
    var oracle = ((src.dossier && src.dossier.oracle) || {}).short
      || "The salute is the whole message. Sent, received, and kept.";
    var file     = src.file || "assets/source-01.jpg";
    var sigClass = sig.class || "Comet — a single spike";
    var sigBand  = (sig.band || "Charged").toLowerCase();
    var serial   = card.serial || "BR-0001";
    var ratio    = src.orient === "portrait" ? "3 / 4" : "16 / 10";
    var no       = src.no != null ? pad2(src.no) : "01";
    var capWord  = (src.capture && src.capture.code)
      ? src.capture.code.split(/[\s/]+/)[0].toLowerCase()
      : "candid";

    var h = subhead("Halo Readings", true);
    h += '<div class="rv-grid rv-grid--halo">';
    h += mod("1", "SURFACE RECORD", artcap("surfacerec", cap(["Cu · Co · Am", "trace & balance map"])));
    h += mod("2", "FRAME SIGNATURE",
      '<div class="rv-mod__art">' + cometSVG(sig.radii) + "</div>" +
      '<div class="rv-mod__cap"><span class="rv-cap__l rv-cap__em">' + esc(sigClass) + '</span>' +
      '<span class="rv-cap__l rv-cap__l--sub">signal-led · frame-light</span>' +
      '<span class="rv-cap__l rv-cap__l--sub">' + esc(sigBand) + "</span></div>");
    h += mod("3", "ARCHETYPE", artcap("archetype",
      '<span class="rv-cap__l rv-cap__em">The Dispatcher</span><span class="rv-cap__l rv-cap__l--sub">threshold role</span><span class="rv-cap__l rv-cap__l--sub">controller · guide</span>'));
    h += mod("4", "AURA", artcap("aura", cap(["warm glass copper", "held steady"])));
    h += mod("5", "MINT RECORD",
      '<div class="rv-mod__art rv-mod__art--mint"><span class="rv-mintbox">' + esc(serial) + '</span>' + sketch("mintseal") + "</div>" +
      '<div class="rv-mod__cap">' + cap(["Edition 1 of 1", "Filed, sealed, recorded"]) + "</div>");
    h += mod("6", "MAP / POSITION", artcap("mapquad", cap(["presence · charge", "impact · clarity"])));
    h += mod("7", "ORACLE READ",
      '<div class="rv-mod__art rv-mod__art--oracle">' + sketch("oraclespark") + "</div>" +
      '<p class="rv-oracle">' + esc(oracle) + "</p>", "rv-mod--oracle");
    h += mod("8", "SOURCE",
      '<div class="rv-mod__art rv-mod__art--photo"><span class="rv-photoframe" style="--photo-ratio:' + ratio + '"><img src="' + esc(file) + '" alt="The original scanned frame" />' +
      '<svg class="rv-sketch rv-photoframe__marks" viewBox="0 0 100 70" preserveAspectRatio="none" aria-hidden="true"><path class="d" pathLength="100" d="M5 20 L5 5 L20 5"/><path class="d" pathLength="100" d="M95 20 L95 5 L80 5"/><path class="d" pathLength="100" d="M5 50 L5 65 L20 65"/><path class="d" pathLength="100" d="M95 50 L95 65 L80 65"/></svg></span></div>' +
      '<div class="rv-mod__cap">' + cap(["the original frame", "BR-SCN " + esc(no) + " · " + esc(capWord)]) + "</div>");
    h += "</div>";
    return h;
  }

  function html(r, src) {
    var halo = r.engine === "halo";
    return '<div class="rv-read__top" data-writein>' +
      '<h2 class="rv-read__headline" tabindex="-1">Stats &amp; Readings</h2>' +
      '<div class="rv-read__flourish" aria-hidden="true"><svg class="rv-sketch" viewBox="0 0 120 12"><path class="d" pathLength="100" d="M8 6 C30 3 44 9 60 6 C76 3 90 9 112 6"/><circle class="d" pathLength="100" cx="60" cy="6" r="2.4"/></svg></div>' +
      "</div>" +
      (halo ? buildHalo(src) : buildFree(src));
  }

  window.BRReveal.ReadingPanel = function (opts) {
    opts = opts || {};
    var src = opts.src || null; // M5 (BR-S134) — one source per panel instance, reached via closure
    var el = document.createElement("div");
    el.className = "rv-read";
    var fbTimer = null;
    var clearTimer = null;

    function setReading(r) {
      if (fbTimer) { clearTimeout(fbTimer); fbTimer = null; }
      if (clearTimer) { clearTimeout(clearTimer); clearTimer = null; } // a pending wipe must never clobber a fresh read
      el.style.opacity = ""; el.style.transition = "";
      el.dataset.engine = r.engine;
      el.innerHTML = html(r, src);
    }

    // empty the panel (the free Stats & Readings clears as the card -> halo)
    function clear() {
      if (fbTimer) { clearTimeout(fbTimer); fbTimer = null; }
      if (clearTimer) { clearTimeout(clearTimer); clearTimer = null; }
      if (motionOff() || !el.innerHTML) {
        el.innerHTML = ""; el.removeAttribute("data-engine");
        el.style.opacity = ""; el.style.transition = "";
        return;
      }
      el.style.transition = "opacity 280ms var(--rv-ease)";
      el.style.opacity = "0";
      clearTimer = setTimeout(function () {
        clearTimer = null;
        el.innerHTML = ""; el.removeAttribute("data-engine");
        el.style.opacity = ""; el.style.transition = "";
      }, 300);
    }

    function play(cb) {
      if (fbTimer) { clearTimeout(fbTimer); fbTimer = null; }
      if (clearTimer) { clearTimeout(clearTimer); clearTimer = null; }
      var items = Array.prototype.slice.call(el.querySelectorAll("[data-writein]"));
      items.forEach(function (n, i) {
        n.style.setProperty("--i", i);
        var paths = n.querySelectorAll(".rv-sketch .d");
        Array.prototype.forEach.call(paths, function (p, j) { p.style.setProperty("--di", j); });
      });

      if (motionOff() || !items.length) {
        items.forEach(function (n) { n.classList.add("is-writing"); });
        if (cb) cb();
        return;
      }
      void el.offsetWidth; // commit base state, then start the draw-on (no rAF — robust)
      items.forEach(function (n) { n.classList.add("is-writing"); });

      var fired = false;
      function fire() { if (fired) return; fired = true; if (fbTimer) { clearTimeout(fbTimer); fbTimer = null; } if (cb) cb(); }
      var stagger = el.dataset.engine === "halo" ? 360 : 460;  // mirrors the --rv-stagger token (FREE 460 / HALO 360)
      fbTimer = setTimeout(fire, items.length * stagger + 2400);  // fire after the last module settles
    }

    if (opts.reading) setReading(opts.reading);
    return { el: el, setReading: setReading, play: play, clear: clear, destroy: function () { el.remove(); } };
  };
})();
