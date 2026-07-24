/* =============================================================
   THE DRAWING ROOM (?dev=drawing-room) — window.BRDrawingRoom

   The tarot room. Three tiers, all DETERMINISTIC (no AI):
     • THE PULL (first page, free, unlimited) — draw a single card to meet
       the deck. A showcase; not filed.
     • A SITTING (first is free — a repeat is $1.99) — a 3-card reading,
       FILED to the Reliquary. Positions: The Ground / The Crossing / The Turn.
     • THE DEEP READ ($2.99, violet) — a 5-card reading, filed. The flagship.

   COMMERCE IS MOCK (BR-S190): the price rides the door's specimen label
   and the cut button (violet, house pf-paid register); pressing a paid
   cut "settles" (violet resolves to gold, ~620ms) and the reading runs —
   no real payment in this build. The first-sitting bit is a try/catch
   localStorage flag ("br_dr_sitting_used") set AT THE CUT (the cut
   closes the question — an abandoned reveal still consumed it), failing
   OPEN (storage blocked → free). A crafted ?read= URL skips the gate:
   accepted for a mock — reopen is the receipt path and must never gate.

   A reading carries what the Codex cannot: WHERE each card fell (its
   position) and WHICH WAY (upright/reversed), a filing stamp (date + BR
   accession), a deterministic BINDING line woven from the drawn cards'
   own keywords, a seeded HALLMARK, and the credo "Drawn once. Not
   reissued." Cards + meanings come live from codex-data.json (Majors +
   Minors = the full 78-card DECK). Reproducible on reopen via the sealed
   token in the URL. Canon: DESCRIBE, never predict; "the cut closes the
   question, it does not choose the cards"; colour law; reduced-motion safe.
============================================================= */
(function () {
  "use strict";

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = (h * 16777619) >>> 0; } return h >>> 0; }
  function pick(list, seed) { return list && list.length ? list[hash(seed) % list.length] : null; }
  function norm(s) { return String(s == null ? "" : s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); }
  function inApp() { return /[?&]dev=/.test(location.search); }
  function sealNow() { return Math.floor(Date.now() / 60000).toString(36); }
  function brCode(seed) { return "BR-" + ("00000" + (hash(seed + "br") % 0xFFFFF).toString(16).toUpperCase()).slice(-5); }
  function param(k) { var m = new RegExp("[?&]" + k + "=([^&]*)").exec(location.search); return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : ""; }
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  function filedDate() { var d = new Date(); return d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear(); }
  function numeralOf(c) { return String((c && c.tag) || "").trim().split(/\s+/)[0] || ""; }
  function firstKw(c) { return (c && c.keywords && c.keywords[0]) || (c ? c.name : ""); }

  var DECK = [];            // full 78-card deck (Majors + Minors), from codex-data.json
  var HOST = null, SESSION = "s", pullN = 0;

  var SPREADS = {
    sitting: { key: "sitting", title: "A Sitting", n: 3, paid: false, price: "$1.99",
      positions: ["The Ground", "The Crossing", "The Turn"],
      notes: ["what the matter rests on", "what stands against it", "where it tends, left as it stands"] },
    deep: { key: "deep", title: "The Deep Read", n: 5, paid: true, price: "$2.99",
      positions: ["The Ground", "The Crossing", "The Root", "The Crown", "The Turn"],
      notes: ["what it rests on", "what stands against it", "what it grew from", "what it reaches for", "where it tends"] }
  };

  /* mock commerce state — one bit, house try/catch pattern (see arcane.js), FAIL-OPEN */
  function sittingUsed() { try { return localStorage.getItem("br_dr_sitting_used") === "1"; } catch (e) { return false; } }
  function isPaidNow(key) { var sp = SPREADS[key]; return !!(sp && (sp.paid || (key === "sitting" && sittingUsed()))); }

  /* draw N DISTINCT cards + orientations, deterministically from the seed */
  function drawSpread(seed, n) {
    var out = [], used = {}, i = 0, cap = (DECK.length || 78) * 4;
    while (out.length < n && i < cap) {
      var c = pick(DECK, seed + "~" + i); i++;
      if (!c || used[c.name]) continue;
      used[c.name] = 1;
      out.push({ card: c, reversed: (hash(seed + "o" + out.length) & 1) === 1 });
    }
    return out;
  }

  /* the BINDING line — the light synthesis, woven from the drawn cards' OWN
     first keywords + the positions. Fully deterministic; no AI. */
  function bindingLine(sp, drawn) {
    function kw(i) { return firstKw(drawn[i] && drawn[i].card); }
    if (sp.n === 3) return "Read as one — the matter rests on " + kw(0) + ", is crossed by " + kw(1) + ", and tends toward " + kw(2) + ".";
    return "Read as one — it rests on " + kw(0) + ", is crossed by " + kw(1) + ", grew from " + kw(2) + ", reaches for " + kw(3) + ", and tends toward " + kw(4) + ".";
  }

  /* a seeded assay HALLMARK — a small mark that varies per reading (bury-the-treasure) */
  function hallmarkSVG(seed) {
    var n = 9 + (hash(seed + "hm") % 5), t = "", i, a;
    for (i = 0; i < n; i++) { a = (i / n) * Math.PI * 2; t += '<line x1="' + (12 + Math.cos(a) * 6.6).toFixed(1) + '" y1="' + (12 + Math.sin(a) * 6.6).toFixed(1) + '" x2="' + (12 + Math.cos(a) * 9).toFixed(1) + '" y2="' + (12 + Math.sin(a) * 9).toFixed(1) + '"/>'; }
    return '<svg viewBox="0 0 24 24" class="dr-hallmark" role="img" aria-label="assay hallmark"><g stroke="url(#drInk)" stroke-width=".7" fill="none"><circle cx="12" cy="12" r="5.2"/><circle cx="12" cy="12" r="1.4"/>' + t + '</g></svg>';
  }

  var DEFS = '<svg class="pf-defs" width="0" height="0" aria-hidden="true"><defs>' +
    '<linearGradient id="drGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8ad70"/><stop offset=".55" stop-color="#a2864a"/><stop offset="1" stop-color="#5f471f"/></linearGradient>' +
    '<linearGradient id="drInk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9c9790"/><stop offset="1" stop-color="#6f6b64"/></linearGradient>' +
    '</defs></svg>';

  function backSVG() {
    return '<svg class="dr-plate" viewBox="0 0 120 190" aria-hidden="true">' +
      '<rect x="7" y="7" width="106" height="176" rx="7" fill="none" stroke="url(#drInk)" stroke-width="1"/>' +
      '<rect x="13" y="13" width="94" height="164" rx="5" fill="none" stroke="url(#drInk)" stroke-width=".5" opacity=".6"/>' +
      '<g stroke="url(#drInk)" stroke-width=".6" fill="none" opacity=".7"><path d="M60 42 L86 95 L60 148 L34 95 Z"/><path d="M60 64 L74 95 L60 126 L46 95 Z"/><circle cx="60" cy="95" r="4.5"/></g></svg>';
  }
  /* the engraved plate; the emblem inverts for a reversed card (per-card art drops in later) */
  function faceSVG(c, reversed) {
    return '<svg class="dr-plate' + (reversed ? ' dr-plate--rev' : '') + '" viewBox="0 0 120 190" aria-hidden="true">' +
      '<rect x="6" y="6" width="108" height="178" rx="7" fill="none" stroke="url(#drGold)" stroke-width="1.1"/>' +
      '<rect x="11" y="11" width="98" height="168" rx="5" fill="none" stroke="url(#drInk)" stroke-width=".5" opacity=".7"/>' +
      '<g class="dr-plate__mark">' +
      '<text x="60" y="30" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="9" letter-spacing="2.5" fill="url(#drGold)">' + esc(numeralOf(c)) + '</text>' +
      '<g stroke="url(#drGold)" fill="none"><circle cx="60" cy="98" r="31" stroke-width=".8" opacity=".5"/><circle cx="60" cy="98" r="23" stroke-width=".6" opacity=".35"/>' +
      '<path d="M60 71 L75 98 L60 125 L45 98 Z" stroke-width=".9" opacity=".7"/><circle cx="60" cy="98" r="3.2" fill="url(#drGold)" stroke="none"/></g></g></svg>';
  }

  /* ---------- shell ---------- */
  function shellOpen() {
    return '<div class="pf pf--drawing" data-drawing>' + DEFS + '<div class="pf-wrap">' +
      '<a class="pf-back" href="#" data-door="menu">&larr; Back to the menu</a>' +
      '<div class="pf-vaulthead">' +
      '<span class="pf-vaulteyebrow">Blue Room Archive&nbsp;&nbsp;·&nbsp;&nbsp;The Drawing Room</span>' +
      '<h1 class="pf-vaulttitle">The Drawing Room</h1>' +
      '<p class="dr-fineprint">The tarot does not predict the future. A card is drawn once, offers a reflection on your situation, and is kept.</p>' +
      '</div><div class="dr-stage" data-dr-stage>';
  }
  function shellClose() { return '</div></div></div>'; }

  /* ---------- the landing: the free single-card pull + the two reading doors ---------- */
  function landingHTML(pulled) {
    var card = "";
    if (pulled) {
      card = '<div class="dr-pull__card"><div class="dr-card is-revealed"><div class="dr-cardface dr-cardface--back">' + backSVG() + '</div>' +
        '<div class="dr-cardface dr-cardface--front">' + faceSVG(pulled.card, pulled.reversed) + '<span class="dr-cardface__name">' + esc(pulled.card.name) + '</span></div></div></div>' +
        '<p class="dr-pull__num">' + esc(numeralOf(pulled.card)) + (pulled.reversed ? ' &middot; reversed' : '') + (firstKw(pulled.card) ? ' &middot; ' + esc(firstKw(pulled.card)) : '') + '</p>' +
        '<h2 class="dr-pull__name">' + esc(pulled.card.name) + '</h2>' +
        '<p class="dr-pull__mean">' + esc((pulled.reversed && pulled.card.reversed) ? pulled.card.reversed : pulled.card.meaning) + '</p>';
    } else {
      card = '<p class="dr-pull__invite">Pull a card to meet the deck — for looking, not keeping.</p>';
    }
    return '<div class="dr-landing">' +
      '<section class="dr-pull">' + card +
      '<button type="button" class="dr-cut dr-pull__btn" data-dr-pull>' + (pulled ? "Pull another" : "Pull a card") + '</button>' +
      '<div class="dr-live" role="status" aria-live="polite" data-dr-live></div>' +
      '</section>' +
      '<section class="dr-tiers">' +
      '<p class="dr-tiers__label">Draw a reading — it is cut, and kept in your Reliquary.</p>' +
      tierDoor(SPREADS.sitting, sittingUsed()
        ? "Three cards to one question — your first is filed."
        : "Three cards to one question — your first is free.") +
      tierDoor(SPREADS.deep, "Five cards, a deeper read.") +
      '</section></div>';
  }
  /* a paid door carries its price in the specimen label; the free-first sitting stays untouched */
  function tierDoor(sp, sub) {
    var paidNow = isPaidNow(sp.key);
    return '<a class="dr-tier' + (paidNow ? " dr-tier--paid" : "") + '" href="#" data-dr-read="' + sp.key + '">' +
      '<span class="dr-tier__n">' + esc(sp.title) + '</span>' +
      '<span class="dr-tier__cards">' + sp.n + ' cards' + (paidNow ? ' &middot; ' + sp.price : '') + '</span>' +
      '<span class="dr-tier__sub">' + esc(sub) + '</span>' +
      '<span class="dr-tier__arr" aria-hidden="true">&rarr;</span></a>';
  }

  /* ---------- a reading: intake -> cut -> spread reveal -> binding + filed ---------- */
  function intakeHTML(sp) {
    var paid = isPaidNow(sp.key);   // paid: the price rides the cut button; free: byte-identical to before
    return '<div class="dr-intake">' +
      '<p class="dr-intake__which">' + esc(sp.title) + ' &middot; ' + sp.n + ' cards</p>' +
      '<label class="dr-field"><span class="dr-field__label">Lay a matter on the table <span class="dr-field__opt">— optional</span></span>' +
      '<input type="text" class="dr-field__in" data-dr-question maxlength="120" autocomplete="off" placeholder="a question, in your own words" ' +
      'aria-label="A question or situation. Optional. It is kept with your reading, and it does not choose the cards."></label>' +
      '<button type="button" class="dr-cut' + (paid ? ' dr-cut--paid' : '') + '" data-dr-cut>Cut the deck' + (paid ? ' &middot; ' + sp.price : '') + '</button>' +
      '<p class="dr-cut__note">The cut does not choose the cards. It closes the question.</p>' +
      (paid ? '<p class="dr-mocknote">Dev mock &mdash; no real payment in this build.</p>' : '') +
      '<a class="dr-intake__back" href="#" data-dr-home>&larr; the deck</a></div>';
  }

  function readingHTML(st) {
    var sp = SPREADS[st.spread], drawn = st.drawn, done = st.revealed >= sp.n, i;
    var cards = "";
    for (i = 0; i < sp.n; i++) {
      var d = drawn[i], shown = d.shown;
      var flip = '<div class="dr-card' + (shown ? " is-revealed" : "") + '">' +
        '<div class="dr-cardface dr-cardface--back">' + backSVG() + '</div>' +
        '<div class="dr-cardface dr-cardface--front">' + faceSVG(d.card, d.reversed) +
        '<span class="dr-cardface__name">' + esc(d.card.name) + '</span></div></div>';
      cards += '<div class="dr-slot' + (shown ? " is-shown" : "") + '">' +
        '<span class="dr-slot__pos">' + esc(sp.positions[i]) + '</span>' +
        (shown ? flip : '<button type="button" class="dr-cardbtn" data-dr-turn="' + i + '" aria-label="' + esc(sp.positions[i]) + ', card ' + (i + 1) + ' of ' + sp.n + ', face down. Press to turn it.">' + flip + '</button>') +
        '</div>';
    }
    var readings = "";
    for (i = 0; i < sp.n; i++) {
      if (!drawn[i].shown) continue;
      var c = drawn[i].card, rev = drawn[i].reversed;
      readings += '<div class="dr-read"><p class="dr-read__pos">' + esc(sp.positions[i]) + ' <span class="dr-read__posn">— ' + esc(sp.notes[i]) + '</span></p>' +
        '<h3 class="dr-read__name">' + esc(c.name) + '<span class="dr-read__orient">' + (rev ? "Reversed" : "Upright") + '</span></h3>' +
        '<p class="dr-read__mean">' + esc((rev && c.reversed) ? c.reversed : c.meaning) + '</p></div>';
    }
    var tail = "";
    if (done) {
      tail = '<div class="dr-filed" data-dr-filed>' +
        '<p class="dr-binding">' + esc(bindingLine(sp, drawn)) + '</p>' +
        '<p class="dr-read__frame">Drawn to the matter you laid down — a reflection to sit with, not a forecast.</p>' +
        '<div class="dr-stamp">' + hallmarkSVG(st.seed) +
        '<p class="dr-filed__line">Filed to your Reliquary &middot; ' + esc(brCode(st.seed)) + ' &middot; ' + esc(filedDate()) + '</p></div>' +
        '<p class="dr-credo">Drawn once. Not reissued.</p>' +
        '<a class="pf-openreading pf-openreading--lg" href="#" data-door="profile">Open your Reliquary &rarr;</a>' +
        '<a class="dr-intake__back" href="#" data-dr-home>&larr; the deck</a></div>';
    } else {
      tail = '<p class="dr-draw__cue">Turn each card.</p><a class="dr-intake__back" href="#" data-dr-home>&larr; the deck</a>';
    }
    return '<div class="dr-reading">' + (st.question ? '<p class="dr-reading__matter">Drawn to: “' + esc(st.question) + '”</p>' : '') +
      '<div class="dr-spread dr-spread--' + sp.n + '">' + cards + '</div>' +
      '<div class="dr-reads">' + readings + '</div>' + tail +
      '<div class="dr-live" role="status" aria-live="assertive" data-dr-live></div></div>';
  }

  /* ---------- flow ---------- */
  var STATE = { view: "landing", pulled: null, spread: null, question: "", seed: "", drawn: [], revealed: 0 };
  function stage() { return HOST.querySelector("[data-dr-stage]"); }
  function announce(m) { var l = HOST.querySelector("[data-dr-live]"); if (l) l.textContent = m; }
  function firstSentence(s) { var m = String(s || "").match(/^[^.]+\./); return m ? m[0] : String(s || ""); }

  function showLanding() { STATE.view = "landing"; stage().innerHTML = landingHTML(STATE.pulled); if (inApp() && history.replaceState) history.replaceState(null, "", "?dev=drawing-room"); }
  function pull() {
    STATE.pulled = drawSpread("pull~" + SESSION + "~" + (pullN++), 1)[0];
    stage().innerHTML = landingHTML(STATE.pulled);
    if (STATE.pulled) announce("Pulled: " + STATE.pulled.card.name + (STATE.pulled.reversed ? ", reversed" : "") + ".");
  }
  function startReading(key) { STATE.view = "intake"; STATE.spread = key; stage().innerHTML = intakeHTML(SPREADS[key]); var f = HOST.querySelector("[data-dr-question]"); if (f) f.focus(); }
  function doCut() {
    var sp = SPREADS[STATE.spread];
    STATE.question = (HOST.querySelector("[data-dr-question]") || {}).value || "";
    var t = sealNow();
    STATE.seed = "read~" + sp.key + "~" + norm(STATE.question) + "~" + t;
    if (sp.key === "sitting") { try { localStorage.setItem("br_dr_sitting_used", "1"); } catch (e) {} }   // the cut consumes the free sitting — the cut closes the question
    STATE.drawn = drawSpread(STATE.seed, sp.n).map(function (d) { d.shown = false; return d; });
    STATE.revealed = 0; STATE.view = "reading";
    if (inApp() && history.replaceState) history.replaceState(null, "", "?dev=drawing-room&read=" + sp.key + "&t=" + encodeURIComponent(t) + (STATE.question ? "&q=" + encodeURIComponent(STATE.question) : ""));
    stage().innerHTML = readingHTML(STATE);
  }
  function cut() {
    var sp = SPREADS[STATE.spread];
    if (!isPaidNow(sp.key)) return doCut();
    /* the mock settle — on a paid cut the violet button resolves to gold ("Settled"),
       then the cut runs. No sheet, no charge; the beat IS the whole transaction. */
    var btn = HOST.querySelector("[data-dr-cut]");
    var reduce = window.matchMedia && (window.BRMotion ? window.BRMotion.prefersReduced() : window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    var settle = function () { if (STATE.view !== "intake") return; doCut(); announce("Settled. The deck is cut."); };
    if (!btn || reduce) return settle();
    btn.disabled = true; btn.classList.add("is-settled"); btn.textContent = "Settled";
    setTimeout(settle, 620);
  }
  function turn(i) {
    if (!STATE.drawn[i] || STATE.drawn[i].shown) return;
    var el = HOST.querySelector('[data-dr-turn="' + i + '"] .dr-card');
    STATE.drawn[i].shown = true; STATE.revealed++;
    var sp = SPREADS[STATE.spread], c = STATE.drawn[i].card, rev = STATE.drawn[i].reversed;
    var msg = sp.positions[i] + ": " + c.name + ", " + (rev ? "reversed" : "upright") + ". " + firstSentence((rev && c.reversed) ? c.reversed : c.meaning);
    if (STATE.revealed >= sp.n) msg += " Filed to your Reliquary, " + brCode(STATE.seed) + ".";
    var reduce = window.matchMedia && (window.BRMotion ? window.BRMotion.prefersReduced() : window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    var done = function () { stage().innerHTML = readingHTML(STATE); announce(msg); };
    if (el && !reduce) { el.classList.add("is-revealed"); setTimeout(done, 720); } else done();  // flip, then reveal the read
  }
  function reopen() {
    // a filed reading is already drawn and settled — its URL is the receipt; never gate here.
    var key = param("read"), t = param("t"); if (!SPREADS[key] || !t) return false;
    var sp = SPREADS[key];
    STATE.spread = key; STATE.question = param("q"); STATE.seed = "read~" + key + "~" + norm(STATE.question) + "~" + t;
    STATE.drawn = drawSpread(STATE.seed, sp.n).map(function (d) { d.shown = true; return d; });
    STATE.revealed = sp.n; STATE.view = "reading"; stage().innerHTML = readingHTML(STATE); return true;
  }

  function wire(root) {
    root.addEventListener("click", function (ev) {
      var el = ev.target.closest("[data-door],[data-dr-pull],[data-dr-read],[data-dr-cut],[data-dr-turn],[data-dr-home]");
      if (!el) return;
      ev.preventDefault();
      if (el.hasAttribute("data-door")) { var d = el.getAttribute("data-door"); if (inApp()) location.href = d === "profile" ? "?dev=profile" : location.pathname; return; }
      if (el.hasAttribute("data-dr-pull")) return pull();
      if (el.hasAttribute("data-dr-read")) return startReading(el.getAttribute("data-dr-read"));
      if (el.hasAttribute("data-dr-cut")) return cut();
      if (el.hasAttribute("data-dr-turn")) return turn(+el.getAttribute("data-dr-turn"));
      if (el.hasAttribute("data-dr-home")) return showLanding();
    });
    root.addEventListener("keydown", function (ev) { if ((ev.key === "Enter" || ev.key === " ") && ev.target.closest("[data-dr-turn]")) { ev.preventDefault(); turn(+ev.target.closest("[data-dr-turn]").getAttribute("data-dr-turn")); } });
  }

  window.BRDrawingRoom = {
    mount: function (host) {
      if (!host) return;
      HOST = host; SESSION = sealNow(); pullN = 0;
      host.innerHTML = shellOpen() + '<p class="dr-loading">Opening the room…</p>' + shellClose();
      wire(host);
      fetch("codex-data.json").then(function (r) { return r.text(); }).then(function (txt) {
        var codex = JSON.parse(txt);
        DECK = codex.filter(function (s) { return /tarot|minor arcana/i.test(String(s.system || "")); }).reduce(function (a, s) { return a.concat(s.entries || []); }, []);
        if (!reopen()) showLanding();
      }).catch(function () { var st = host.querySelector("[data-dr-stage]"); if (st) st.innerHTML = '<p class="dr-loading">The deck could not be reached. (Standalone preview.)</p>'; });
    }
  };
})();
