/* =============================================================
   THE DRAWING ROOM (?dev=drawing-room) — window.BRDrawingRoom

   The tarot room. A question-led draw where the SAVE is the product:
   a card is drawn, CUT, and filed to the Reliquary. STEP 1 = the free
   single-card "taste" — Majors-only, upright — built on the museum .pf-*
   language and the deterministic FNV-1a engine. NO AI. Reproducible on
   reopen via the sealed token in the URL. The 22 Majors are read from
   codex-data.json (the Codex's own voice — no duplication).

   Canon: DESCRIBE, never predict; "the cut does not choose the cards, it
   closes the question"; colour law "crown + hairline ink"; reduced-motion
   safe; a11y (aria-live for draw + filing, keyboard reveal). Exposes
   window.BRDrawingRoom. Step 2 = write the 56 Minors (+ Codex); Step 3 =
   the paid 10-card full-deck flagship + real Vault filing.
============================================================= */
(function () {
  "use strict";

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* FNV-1a — the same deterministic hash the reading uses. No randomness. */
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = (h * 16777619) >>> 0; } return h >>> 0; }
  function pick(list, seed) { return list && list.length ? list[hash(seed) % list.length] : null; }
  function norm(s) { return String(s == null ? "" : s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); }
  function inApp() { return /[?&]dev=/.test(location.search); }

  /* sealed token = the minute the cut is made, base36. Stored in the URL so a
     reopen reproduces the identical draw. The cut CLOSES the question. */
  function sealNow() { return Math.floor(Date.now() / 60000).toString(36); }
  function seedOf(q, t) { return "draw~" + norm(q) + "~" + t; }
  function brCode(seed) { return "BR-" + ("00000" + (hash(seed) % 0xFFFFF).toString(16).toUpperCase()).slice(-5); }

  function param(k) { var m = new RegExp("[?&]" + k + "=([^&]*)").exec(location.search); return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : ""; }

  var MAJORS = [];   // the Tarot system's entries, loaded from codex-data.json
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  function numeralOf(m) { return String((m && m.tag) || "").trim().split(/\s+/)[0] || ""; }
  function firstKw(m) { return (m && m.keywords && m.keywords[0]) || ""; }
  function filedDate() { var d = new Date(); return d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear(); }

  /* ---- gradient defs: reuse the crown gold + a warm-grey ink ---- */
  var DEFS = '<svg class="pf-defs" width="0" height="0" aria-hidden="true"><defs>' +
    '<linearGradient id="drGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8ad70"/><stop offset=".55" stop-color="#a2864a"/><stop offset="1" stop-color="#5f471f"/></linearGradient>' +
    '<linearGradient id="drInk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9c9790"/><stop offset="1" stop-color="#6f6b64"/></linearGradient>' +
    '</defs></svg>';

  /* the card BACK — purely geometric, symmetric; never hints orientation */
  function backSVG() {
    return '<svg class="dr-plate" viewBox="0 0 120 190" aria-hidden="true">' +
      '<rect x="7" y="7" width="106" height="176" rx="7" fill="none" stroke="url(#drInk)" stroke-width="1"/>' +
      '<rect x="13" y="13" width="94" height="164" rx="5" fill="none" stroke="url(#drInk)" stroke-width=".5" opacity=".6"/>' +
      '<g stroke="url(#drInk)" stroke-width=".6" fill="none" opacity=".7">' +
      '<path d="M60 42 L86 95 L60 148 L34 95 Z"/><path d="M60 64 L74 95 L60 126 L46 95 Z"/><circle cx="60" cy="95" r="4.5"/>' +
      '</g></svg>';
  }
  /* the card FACE — an engraved Card of Record (per-card art drops in later) */
  function faceSVG(m) {
    return '<svg class="dr-plate" viewBox="0 0 120 190" aria-hidden="true">' +
      '<rect x="6" y="6" width="108" height="178" rx="7" fill="none" stroke="url(#drGold)" stroke-width="1.1"/>' +
      '<rect x="11" y="11" width="98" height="168" rx="5" fill="none" stroke="url(#drInk)" stroke-width=".5" opacity=".7"/>' +
      '<text x="60" y="30" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="9" letter-spacing="2.5" fill="url(#drGold)">' + esc(numeralOf(m)) + '</text>' +
      '<g stroke="url(#drGold)" fill="none">' +
      '<circle cx="60" cy="98" r="31" stroke-width=".8" opacity=".5"/><circle cx="60" cy="98" r="23" stroke-width=".6" opacity=".35"/>' +
      '<path d="M60 71 L75 98 L60 125 L45 98 Z" stroke-width=".9" opacity=".7"/>' +
      '<circle cx="60" cy="98" r="3.2" fill="url(#drGold)" stroke="none"/>' +
      '</g></svg>';
  }

  /* ---------- render pieces ---------- */
  function shellOpen() {
    return '<div class="pf pf--drawing" data-drawing>' + DEFS +
      '<div class="pf-wrap">' +
      '<a class="pf-back" href="#" data-door="menu">&larr; Back to the menu</a>' +
      '<div class="pf-vaulthead">' +
      '<span class="pf-vaulteyebrow">Blue Room Archive&nbsp;&nbsp;·&nbsp;&nbsp;The Drawing Room</span>' +
      '<h1 class="pf-vaulttitle">The Drawing Room</h1>' +
      '<p class="pf-vaultintro">One card, drawn to a question and filed to your record.</p>' +
      '<p class="dr-fineprint">The tarot does not predict the future. A card is drawn once, offers a reflection on your situation, and is kept.</p>' +
      '</div>' +
      '<div class="dr-stage" data-dr-stage>';
  }
  function shellClose() { return '</div></div></div>'; }

  function intakeHTML() {
    return '<div class="dr-intake">' +
      '<label class="dr-field">' +
      '<span class="dr-field__label">Lay a matter on the table <span class="dr-field__opt">— optional</span></span>' +
      '<input type="text" class="dr-field__in" data-dr-question maxlength="120" autocomplete="off" ' +
      'aria-label="A question or situation you are consulting about. Optional. It is kept with your reading, and it does not choose the cards." placeholder="a question, in your own words" />' +
      '</label>' +
      '<button type="button" class="dr-cut" data-dr-cut>Cut the deck</button>' +
      '<p class="dr-cut__note">The cut does not choose the cards. It closes the question.</p>' +
      '</div>';
  }

  /* the single card — face-down (a button to reveal) or revealed + read + filed */
  function drawHTML(card, seed, revealed) {
    var back = '<div class="dr-cardface dr-cardface--back" aria-hidden="true">' + backSVG() + '</div>';
    var face = '<div class="dr-cardface dr-cardface--front" aria-hidden="true">' + faceSVG(card) +
      '<span class="dr-cardface__name">' + esc(card.name) + '</span></div>';
    var flip = '<div class="dr-card' + (revealed ? ' is-revealed' : '') + '">' + back + face + '</div>';

    if (!revealed) {
      return '<div class="dr-draw">' +
        '<button type="button" class="dr-cardbtn" data-dr-reveal aria-label="A card, face down. Press to turn it.">' + flip + '</button>' +
        '<p class="dr-draw__cue">Turn the card.</p>' +
        '<div class="dr-live" role="status" aria-live="polite" data-dr-live></div>' +
        '</div>';
    }
    return '<div class="dr-draw dr-draw--read">' +
      '<div class="dr-cardbtn dr-cardbtn--still">' + flip + '</div>' +
      '<div class="dr-read">' +
      '<p class="dr-read__num">' + esc(numeralOf(card)) + (firstKw(card) ? ' &middot; ' + esc(firstKw(card)) : '') + '</p>' +
      '<h2 class="dr-read__name">' + esc(card.name) + '</h2>' +
      '<p class="dr-read__meaning">' + esc(card.meaning || "") + '</p>' +
      '<p class="dr-read__frame">Drawn to the matter you laid down — a reflection to sit with, not a forecast.</p>' +
      '</div>' +
      '<div class="dr-filed" data-dr-filed>' +
      '<span class="dr-filed__mark" aria-hidden="true">&#9670;</span>' +
      '<p class="dr-filed__line">Filed to your Reliquary &middot; ' + esc(brCode(seed)) + ' &middot; ' + esc(filedDate()) + '</p>' +
      '<a class="pf-openreading pf-openreading--lg" href="#" data-door="profile">Open your Reliquary &rarr;</a>' +
      '</div>' +
      '<div class="dr-live" role="status" aria-live="assertive" data-dr-live></div>' +
      '</div>';
  }

  /* ---------- flow ---------- */
  var STAGE = null;

  function stageEl() { return STAGE || (STAGE = HOST.querySelector("[data-dr-stage]")); }
  var HOST = null;

  function showIntake() { stageEl().innerHTML = intakeHTML(); var f = HOST.querySelector("[data-dr-question]"); if (f) f.focus(); }

  function showDraw(card, seed, revealed) {
    stageEl().innerHTML = drawHTML(card, seed, revealed);
    if (revealed) announce("Card drawn: " + card.name + ". " + firstSentence(card.meaning) + " Filed to your Reliquary, " + brCode(seed) + ".");
  }

  function announce(msg) { var l = HOST.querySelector("[data-dr-live]"); if (l) l.textContent = msg; }
  function firstSentence(s) { var m = String(s || "").match(/^[^.]+\./); return m ? m[0] : String(s || ""); }

  function drawForSeed(seed) { return pick(MAJORS, seed + "1"); }

  function cut() {
    var q = (HOST.querySelector("[data-dr-question]") || {}).value || "";
    var t = sealNow();
    var seed = seedOf(q, t);
    // persist the sealed moment + question in the URL so a reopen reproduces
    if (inApp() && window.history && window.history.replaceState) {
      window.history.replaceState(null, "", "?dev=drawing-room&t=" + encodeURIComponent(t) + (q ? "&q=" + encodeURIComponent(q) : ""));
    }
    showDraw(drawForSeed(seed), seed, false);
  }

  function reveal() {
    var t = param("t"), q = param("q");
    if (!t) { t = sealNow(); }
    var seed = seedOf(q, t);
    showDraw(drawForSeed(seed), seed, true);
  }

  function wire(root) {
    root.addEventListener("click", function (ev) {
      var door = ev.target.closest("[data-door]");
      if (door) {
        ev.preventDefault();
        var d = door.getAttribute("data-door");
        if (d === "menu") { if (inApp()) location.href = location.pathname; }
        else if (d === "profile") { if (inApp()) location.href = "?dev=profile"; }
        return;
      }
      if (ev.target.closest("[data-dr-cut]")) { ev.preventDefault(); cut(); return; }
      if (ev.target.closest("[data-dr-reveal]")) { ev.preventDefault(); reveal(); return; }
    });
    root.addEventListener("keydown", function (ev) {
      if ((ev.key === "Enter" || ev.key === " ") && ev.target.closest("[data-dr-reveal]")) { ev.preventDefault(); reveal(); }
    });
  }

  function boot(root) {
    HOST = root; STAGE = null;
    var t = param("t");
    if (t) {
      // reopen a filed reading — reproduce it exactly (revealed + filed)
      var seed = seedOf(param("q"), t);
      showDraw(drawForSeed(seed), seed, true);
    } else {
      showIntake();
    }
  }

  window.BRDrawingRoom = {
    mount: function (host) {
      if (!host) return;
      host.innerHTML = shellOpen() + '<p class="dr-loading">Opening the room…</p>' + shellClose();
      wire(host);
      fetch("codex-data.json").then(function (r) { return r.text(); }).then(function (txt) {
        var codex = JSON.parse(txt);
        var sys = codex.filter(function (s) { return /tarot/i.test(String(s.system || "")); })[0];
        MAJORS = (sys && sys.entries) ? sys.entries : [];
        boot(host);
      }).catch(function () {
        var st = host.querySelector("[data-dr-stage]");
        if (st) st.innerHTML = '<p class="dr-loading">The deck could not be reached. (This is a standalone preview.)</p>';
      });
    }
  };
})();
