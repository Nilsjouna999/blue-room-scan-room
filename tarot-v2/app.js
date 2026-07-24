/* ============================================================================
   Blue Room Tarot v2 — app.js
   The engine + choreography wiring. Everything below the cut is a pure function
   of the sealed seed; all animation is decoupled theater over an already-decided
   outcome. The cut is the sole decision point (draw + seal + gate + receipt).
   ========================================================================== */
(function () {
  "use strict";

  /* ---------------------------------------------------------------- helpers */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  var motionOK = !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  /* ---------------------------------------------------------------- engine
     Pure, deterministic. FNV-1a 32-bit — structurally the live engine, with the
     one canon correction below (the multiply). pick/norm/drawSpread are verbatim. */
  function hash(s) {
    // FNV-1a 32-bit. Math.imul keeps the multiply in true 32-bit space — the live
    // `h*16777619` (float) reaches ~2^56 for h·16777619, past 2^53, so the low 3
    // bits round away and (&1) collapses reversal to ~5% instead of 50/50. §3.3
    // requires exactly 50/50, so the multiply is corrected here. This is the ONE
    // engine primitive that changed from live — logged in INTEGRATION.md §B as the
    // graft-back correction live drawing-room.js must adopt.
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
    return h >>> 0;
  }
  function pick(list, seed) { return list && list.length ? list[hash(seed) % list.length] : null; }
  function norm(s) { return String(s == null ? "" : s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); }
  function makeSeed(key, q, token) { return "read~" + key + "~" + norm(q) + "~" + token; }
  // Token = base36 timestamp + a GUARANTEED-6-char base36 random suffix. dateFromToken()
  // recovers the timestamp with slice(0,-6), so the suffix width is a hard contract:
  // pad+slice pins it to exactly 6 (a short random string, or Math.random()===0, would
  // otherwise under-run 6 and let slice(0,-6) eat into the timestamp).
  function makeToken() {
    var suffix = ("000000" + Math.floor(Math.random() * 2176782336).toString(36)).slice(-6); // 36^6
    return Date.now().toString(36) + suffix;
  }

  function drawSpread(seed, n) {
    var out = [], used = {}, i = 0, DECK = window.TAROT_DECK || [], cap = (DECK.length || 78) * 4;
    while (out.length < n && i < cap) {
      var c = pick(DECK, seed + "~" + i); i++;
      if (!c || used[c.name]) continue;                 // distinct BY NAME
      used[c.name] = 1;
      out.push({ card: c, reversed: (hash(seed + "o" + out.length) & 1) === 1 }); // 50/50 by FINAL slot idx
    }
    return out;
  }
  function accession(seed) {
    return "BR-" + ("00000" + (hash(seed + "br") % 0xFFFFF).toString(16).toUpperCase()).slice(-5);
  }
  function bindRead(card, rev) {
    if (rev) return card.reversed;                       // codex reversed prose (major OR minor)
    if (card.group === "major") {
      try { var v = window.BRArcanaVoice && window.BRArcanaVoice.get("tarot", card.name); if (v && v.p) return v.p; }
      catch (e) { /* fail open */ }
    }
    return card.meaning;                                 // codex upright prose
  }

  /* ---------------------------------------------------------------- tiers */
  var SPREADS = {
    pull:    { key: "pull",    title: "A Glance",     n: 1, paid: false, price: null,    filed: false,
               positions: [null], notes: [null] },
    sitting: { key: "sitting", title: "A Sitting",    n: 3, paid: false, price: "$1.99", filed: true,
               positions: ["The Ground", "The Crossing", "The Turn"],
               notes: ["what the matter rests on", "what stands against it", "where it tends, left as it stands"] },
    deep:    { key: "deep",    title: "The Deep Read", n: 5, paid: true,  price: "$2.99", filed: true,
               positions: ["The Ground", "The Crossing", "The Root", "The Crown", "The Turn"],
               notes: ["what it rests on", "what stands against it", "what it grew from", "what it reaches for", "where it tends"] }
  };
  var TIER_STYLE = {
    pull:    { w: "clamp(184px,42vw,216px)", ar: "150 / 238" },
    sitting: { w: "clamp(120px,26vw,150px)", ar: "150 / 238" },
    deep:    { w: "clamp(92px,18vw,138px)",  ar: "150 / 238" }
  };

  /* ---------------------------------------------------------------- gate */
  function sittingUsed() { try { return localStorage.getItem("br_dr_sitting_used") === "1"; } catch (e) { return false; } }
  function isPaidNow(key) { var sp = SPREADS[key]; return !!(sp && (sp.paid || (key === "sitting" && sittingUsed()))); }

  var SESSION = makeToken();
  var pullN = 0;

  /* ---------------------------------------------------------------- state */
  var STATE = { phase: "tier", tierKey: null, question: "", token: null, seed: null,
                drawn: [], revealed: 0, replay: false, paidRun: false };

  /* ---------------------------------------------------------------- DOM refs */
  var D = {};
  function grab() {
    D.room = $("#room");
    D.tiers = $('[data-view="tier"]');
    D.ceremony = $('[data-view="ceremony"]');
    D.reopen = $("[data-reopen]");
    D.intake = $("[data-intake]");
    D.input = $("#question");
    D.cutnote = $("[data-cutnote]");
    D.mocknote = $("[data-mocknote]");
    D.subline = $("[data-subline]");
    D.stage = $("[data-stage]");
    D.glow = $("[data-glow]");
    D.deck = $("[data-deck]");
    D.spread = $("[data-spread]");
    D.controls = $("[data-controls]");
    D.cut = $("[data-cut]");
    D.status = $("[data-status]");
    D.again = $("[data-again]");
    D.hint = $("[data-hint]");
    D.reading = $("[data-reading]");
    D.closing = $("[data-closing]");
    D.accession = $("[data-accession]");
    D.polite = $("[data-live-polite]");
    D.assertive = $("[data-live-assertive]");
  }

  /* ---------------------------------------------------------------- aria */
  function announce(msg, mode) {
    var region = mode === "assertive" ? D.assertive : D.polite;
    if (!region) return;
    var n = el("span");
    n.textContent = msg + " ";
    region.appendChild(n);
    // cap growth — a deep run appends 6 (5 turns + closing); repeated sittings would
    // otherwise accumulate forever. Keep the last 12 so one run is never trimmed.
    while (region.childNodes.length > 12) region.removeChild(region.firstChild);
  }

  /* ---------------------------------------------------------------- date */
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"];
  function fmtDate(d) { return d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear(); }
  function dateFromToken(token) {
    try {
      // relies on makeToken()'s fixed 6-char suffix contract; cosmetic ("Filed <date>")
      // only — the reading + ?read= round-trip use the full token string verbatim.
      var ms = parseInt(String(token).slice(0, -6), 36);
      if (ms && isFinite(ms)) return new Date(ms);
    } catch (e) {}
    return new Date();
  }

  /* ---------------------------------------------------------------- accent register */
  function setAccent(mode) {
    var r = D.room.style;
    if (mode === "gold") { r.setProperty("--accent", "#a2864a"); r.setProperty("--accent-lit", "#c0a05d"); }
    else if (mode === "violet") { r.setProperty("--accent", "#8a6fb0"); r.setProperty("--accent-lit", "#a487c8"); }
    else { r.setProperty("--accent", "#8f8266"); r.setProperty("--accent-lit", "#b6a179"); } // neutral
  }

  /* ---------------------------------------------------------------- card back markup (shared) */
  function backHTML() {
    return '' +
      '<div class="back">' +
        '<div class="back-frame"></div>' +
        '<div class="back-ring"></div>' +
        '<div class="back-diamond">&#9670;</div>' +
        '<div class="back-mono top">ARCANA</div>' +
        '<div class="back-mono bot">BLUE ROOM</div>' +
        '<span class="tick tl"></span><span class="tick tr"></span>' +
        '<span class="tick bl"></span><span class="tick br"></span>' +
      '</div>';
  }

  function suitGlyph(suit) {
    var g = {
      Wands:     '<line x1="7" y1="2" x2="7" y2="12"/><line x1="5" y1="2" x2="9" y2="2"/><line x1="5" y1="12" x2="9" y2="12"/>',
      Cups:      '<path d="M3 5 C3.4 10.2 10.6 10.2 11 5"/>',
      Swords:    '<line x1="7" y1="2" x2="7" y2="12"/><line x1="4" y1="5" x2="10" y2="5"/>',
      Pentacles: '<circle cx="7" cy="7" r="4.4"/>'
    }[suit] || '';
    return '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">' + g + '</svg>';
  }

  /* face content for a drawn card */
  function faceHTML(card, rev) {
    var headLeft, glyph;
    if (card.group === "major") {
      headLeft = "ARCANA · " + card.rank;
    } else {
      headLeft = String(card.suit).toUpperCase() + " · " + String(card.element).toUpperCase();
    }
    glyph = "&#9670;"; // the diamond — the original card art, on EVERY card (majors + minors)
    var longName = card.name.length >= 13 ? " is-long" : "";
    // Card face carries name + orientation only — no keyword line (kept clean; keywords/meaning
    // live in the reading panel below).
    return '' +
      '<div class="face-head">' +
        '<span class="face-meta">' + headLeft + '</span>' +
        '<span class="face-glyph">' + glyph + '</span>' +
      '</div>' +
      '<div class="face-name' + longName + '">' + esc(card.name) + '</div>' +
      '<div class="face-div"></div>' +
      '<div class="face-orient">' + (rev ? "Reversed" : "Upright") + '</div>' +
      '<span class="tick tl"></span><span class="tick br"></span>'; // the original 2-tick corners (tl + br)
  }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  /* ---------------------------------------------------------------- deck render */
  function renderDeck() {
    var html = '<div class="deck-back-body">';
    for (var k = 0; k < 7; k++) {
      var tx = (k * 1.3).toFixed(1), ty = (k * 1.7).toFixed(1);
      var rot = (k % 2 ? 0.5 : -0.4);
      var light = 13 - k, dark = 8 - Math.min(k, 6);
      html += '<div class="deck-layer" style="transform:translate(' + tx + 'px,' + ty + 'px) rotate(' + rot + 'deg);' +
              'background:linear-gradient(158deg,hsl(34 22% ' + light + '%),hsl(32 20% ' + dark + '%));"></div>';
    }
    html += '</div>';
    html += '<div class="deck-top">' + backHTML() + '</div>';
    D.deck.innerHTML = html;
  }

  /* ---------------------------------------------------------------- tier chooser */
  function refreshDoorCopy() {
    var sub = $('[data-door-sub="sitting"]');
    if (sub) {
      if (sittingUsed()) sub.innerHTML = 'Three cards to one question — your first is filed.<span class="door-price"> · $1.99</span>';
      else sub.textContent = "Three cards to one question — your first is free.";
    }
  }

  function chooseTier(key) {
    STATE = { phase: "intake", tierKey: key, question: "", token: null, seed: null,
              drawn: [], revealed: 0, replay: false, paidRun: false };
    var sp = SPREADS[key], st = TIER_STYLE[key];

    D.tiers.setAttribute("hidden", "");
    D.ceremony.removeAttribute("hidden");
    D.ceremony.setAttribute("aria-label", key === "pull" ? "Tarot glance" : key === "deep" ? "Tarot deep read" : "Tarot sitting");

    D.stage.style.setProperty("--card-w", st.w);
    D.stage.style.setProperty("--ar", st.ar);
    D.stage.classList.toggle("is-pull", key === "pull");
    D.stage.classList.toggle("is-deep", key === "deep");   // narrow-phone 3-over-2 wrap

    // intake + notes
    D.input.value = "";
    D.input.readOnly = false;
    D.input.classList.remove("is-locked");
    D.input.removeAttribute("aria-readonly");
    D.cutnote.hidden = (key === "pull");                 // A Glance shows no cut-note
    var paid = isPaidNow(key);
    D.mocknote.hidden = !paid;

    setAccent("neutral");
    renderDeck();
    renderSkeleton(sp);
    renderReadingSkeleton(sp);

    D.reopen.hidden = true;
    D.closing.hidden = true;
    D.accession.hidden = true;
    D.again.hidden = true;
    D.status.hidden = true;
    D.hint.hidden = true;

    D.cut.hidden = false;
    D.cut.disabled = false;
    D.cut.classList.toggle("is-paid", paid);
    D.cut.classList.remove("is-settling");
    D.cut.textContent = "Shuffle";
    STATE.phase = "ready";

    positionDeck();
    D.input.focus();
  }

  /* empty slots (labels + face-down placeholders reserve space; no jump on deal) */
  function renderSkeleton(sp) {
    D.spread.innerHTML = "";
    for (var i = 0; i < sp.n; i++) {
      var slot = el("div", "slot");
      var label = el("div", "slot-label");
      if (sp.positions[i]) {
        label.innerHTML = '<span class="pos">' + esc(sp.positions[i]) + '</span>' +
                          '<span class="sub">' + esc(sp.notes[i]) + '</span>';
      }
      slot.appendChild(label);
      var box = el("div", "card-slot");     // reserves the card footprint
      slot.appendChild(box);
      D.spread.appendChild(slot);
    }
  }

  function renderReadingSkeleton(sp) {
    D.reading.className = "reading" + (sp.key === "pull" ? " is-pull" : "");
    D.reading.innerHTML = "";
    for (var i = 0; i < sp.n; i++) {
      var col = el("div", "read-col");
      var ghost = el("p", "read-ghost");
      ghost.textContent = "Awaiting the turn";
      col.appendChild(ghost);
      D.reading.appendChild(col);
    }
  }

  /* ---------------------------------------------------------------- deck placement */
  function positionDeck() {
    var box = $(".card-slot", D.spread);
    if (!box) return;
    var sr = D.stage.getBoundingClientRect(), br = box.getBoundingClientRect();
    D.stage.style.setProperty("--deck-top", (br.top - sr.top) + "px");
  }

  /* ---------------------------------------------------------------- shuffle */
  function onCutButton() {
    if (STATE.phase === "ready") { runShuffle(); return; }
    if (STATE.phase === "shuffled") { cut(); return; }
  }

  function runShuffle() {
    STATE.phase = "shuffling";
    D.cut.disabled = true;
    D.cut.hidden = true;
    D.status.hidden = false;
    D.status.textContent = "Mixing.";
    announce("Mixing.", "polite");

    if (motionOK) D.deck.classList.add("is-riffling");
    var wait = motionOK ? 820 : 150;
    setTimeout(function () {
      D.deck.classList.remove("is-riffling");
      STATE.phase = "shuffled";
      D.status.hidden = true;
      D.cut.hidden = false;
      D.cut.disabled = false;
      D.cut.textContent = cutLabel();
    }, wait);
  }

  function cutLabel() {
    var key = STATE.tierKey;
    if (key === "pull") return "Cut the deck";
    if (!isPaidNow(key)) return "Cut the deck";
    return "Cut the deck · " + SPREADS[key].price;
  }

  /* ---------------------------------------------------------------- the cut = the seal */
  function cut() {
    var key = STATE.tierKey;
    var paid = isPaidNow(key);                 // snapshot BEFORE the gate bit is written
    STATE.paidRun = paid;
    if (paid) runSettle(function () { doCut(paid); });
    else doCut(paid);
  }

  function runSettle(cb) {
    D.cut.disabled = true;
    D.cut.classList.add("is-settling");
    D.cut.textContent = "Settled";
    setAccent("gold");
    setTimeout(cb, motionOK ? 620 : 150);
  }

  function doCut(paid) {
    var key = STATE.tierKey, sp = SPREADS[key];

    // controls row shows exactly one control at a time: the cut/settle button's job
    // ends here — hide it now so "Filing." (set by runCutlift, next) is the only
    // visible control, on both the free path (never disabled/hidden before this) and
    // the paid path (runSettle only disabled it, never hid it).
    D.cut.hidden = true;
    D.cut.disabled = true;

    if (key === "pull") {
      // A Glance: ephemeral. No token, no seal, no gate, no receipt.
      var pseed = "pull~" + SESSION + "~" + (pullN++);
      STATE.token = null; STATE.seed = pseed;
      STATE.drawn = drawSpread(pseed, sp.n).map(function (d) { d.shown = false; return d; });
      announce("The deck is cut.", "polite");
    } else {
      // filed tiers: freeze token → seed → DRAW (cards chosen HERE, nowhere else)
      var token = makeToken();
      var seed = makeSeed(key, STATE.question, token);
      STATE.token = token; STATE.seed = seed;
      STATE.drawn = drawSpread(seed, sp.n).map(function (d) { d.shown = false; return d; });
      if (key === "sitting") { try { localStorage.setItem("br_dr_sitting_used", "1"); } catch (e) {} }
      writeReceipt(key, STATE.question, token);
      lockInk();
      announce((paid ? "Settled. " : "") + "The deck is cut.", "polite");
    }

    D.status.hidden = true;
    D.hint.hidden = true;
    STATE.phase = "cut";
    runCutlift(runDeal);
  }

  function lockInk() {
    // native readonly + aria-readonly: the filed value stays focusable and reviewable.
    // (aria-disabled would signal a non-operable control and SRs may skip/dim it.)
    D.input.readOnly = true;
    D.input.setAttribute("aria-readonly", "true");
    D.input.classList.add("is-locked");
  }

  /* ---------------------------------------------------------------- receipt */
  function writeReceipt(key, q, token) {
    if (!history.replaceState) return;
    var payload;
    try { payload = btoa(unescape(encodeURIComponent(JSON.stringify({ k: key, q: q || "", t: token })))); }
    catch (e) { return; }
    history.replaceState(null, "", "?read=" + encodeURIComponent(payload));
  }

  function tryReopen() {
    var p = new URLSearchParams(location.search).get("read");
    if (!p) return false;
    var o;
    try { o = JSON.parse(decodeURIComponent(escape(atob(decodeURIComponent(p))))); }
    catch (e) { return false; }
    if (!o || !SPREADS[o.k]) return false;

    var sp = SPREADS[o.k], seed = makeSeed(o.k, o.q, o.t);
    STATE = {
      phase: "complete", tierKey: o.k, question: o.q || "", token: o.t, seed: seed,
      drawn: drawSpread(seed, sp.n).map(function (d) { d.shown = true; return d; }),
      revealed: sp.n, replay: true, paidRun: false
    };
    renderColdOpen(sp);
    return true;
  }

  /* cold open — no deck, no ceremony, cards already face-up */
  function renderColdOpen(sp) {
    D.tiers.setAttribute("hidden", "");
    D.ceremony.removeAttribute("hidden");
    D.ceremony.setAttribute("aria-label", sp.key === "pull" ? "Tarot glance" : sp.key === "deep" ? "Tarot deep read" : "Tarot sitting");
    var st = TIER_STYLE[sp.key];
    D.stage.style.setProperty("--card-w", st.w);
    D.stage.style.setProperty("--ar", st.ar);
    D.stage.classList.toggle("is-pull", sp.key === "pull");
    D.stage.classList.toggle("is-deep", sp.key === "deep");   // reopened deep read: same 3-over-2 on phones

    D.intake.hidden = true;
    D.cutnote.hidden = true;
    D.mocknote.hidden = true;
    // A reopened receipt still needs a way out — show ONLY the "New reading" button so the
    // ?read= URL is never a dead end. Clicking it runs resetToTiers(), which clears the token
    // from the URL, so a refresh no longer replays this old read.
    D.controls.hidden = false;
    D.cut.hidden = true;
    D.again.hidden = false;
    D.again.textContent = "New reading";
    D.status.hidden = true;
    D.hint.hidden = true;
    D.glow.style.display = "none";
    D.deck.style.display = "none";
    D.subline.hidden = true;
    setAccent(sp.paid || sp.key === "sitting" ? "gold" : "neutral");

    var d = dateFromToken(STATE.token);
    D.reopen.hidden = false;
    D.reopen.textContent = "Reopened from your record. Filed " + fmtDate(d) + ".";

    renderSkeleton(sp);
    renderReadingSkeleton(sp);
    // seat every card, face-up, no motion
    var slots = D.spread.querySelectorAll(".slot");
    for (var i = 0; i < sp.n; i++) {
      var dd = STATE.drawn[i];
      var flip = mountCard(slots[i], i, sp, dd);
      flip.style.transition = "none";              // cold open: no flip animation
      flip.classList.add("is-turned");
      flip.setAttribute("aria-disabled", "true");
      flip.disabled = true;
      $(".card-travel", slots[i]).classList.add("is-mounted");
      slots[i].classList.add("is-dealt");
      fillReadCol(i, sp, dd);
    }
    showClosing(sp);
    if (sp.filed) stampAccession(accession(STATE.seed), d);
    D.stage.classList.add("is-launched");
  }

  /* ---------------------------------------------------------------- card mount */
  function mountCard(slot, i, sp, dd) {
    var box = $(".card-slot", slot);
    box.innerHTML = "";
    var travel = el("div", "card-travel");
    var land = el("div", "card-land");
    var flip = document.createElement("button");
    flip.type = "button";
    flip.className = "flip" + (dd.reversed ? " card-rev" : "");
    flip.setAttribute("aria-label", faceDownLabel(i, sp));

    var back = el("div", "back-face");
    back.innerHTML = backHTML();
    var face = el("div", "face");
    face.innerHTML = faceHTML(dd.card, dd.reversed);

    flip.appendChild(back);
    flip.appendChild(face);
    land.appendChild(flip);
    travel.appendChild(land);
    box.appendChild(travel);

    flip.addEventListener("click", function () { turnCard(i); });
    return flip;
  }

  function faceDownLabel(i, sp) {
    var sp2 = SPREADS[STATE.tierKey] || sp;
    if (sp2.key === "pull") return "Card, face down. Press to turn it.";
    return sp2.positions[i] + ", card " + (i + 1) + " of " + sp2.n + ", face down. Press to turn it.";
  }
  function faceUpLabel(i, sp, dd) {
    var orient = dd.reversed ? "Reversed" : "Upright";
    if (sp.key === "pull") return dd.card.name + ", " + orient + ".";
    return sp.positions[i] + ": " + dd.card.name + ", " + orient + ".";
  }

  /* ---------------------------------------------------------------- cutlift */
  function runCutlift(next) {
    D.status.hidden = false;
    D.status.textContent = "Filing.";
    var top = $(".deck-top", D.deck);
    if (motionOK && top) {
      top.classList.add("is-cutting");
      setTimeout(next, 1020);
    } else {
      setTimeout(next, 60);
    }
  }

  /* ---------------------------------------------------------------- deal */
  function stagger(n) { return n === 5 ? 0.42 : 0.52; }

  function runDeal() {
    STATE.phase = "dealing";
    announce("Filing.", "polite");
    var sp = SPREADS[STATE.tierKey], n = sp.n, stag = stagger(n);
    var slots = D.spread.querySelectorAll(".slot");
    var flips = [], travels = [], lands = [];

    for (var i = 0; i < n; i++) {
      var flip = mountCard(slots[i], i, sp, STATE.drawn[i]);
      flips.push(flip);
      travels.push($(".card-travel", slots[i]));
      lands.push($(".card-land", slots[i]));
    }

    if (!motionOK) {
      // reduced motion: opacity-only fade in, short waits, no transform
      D.stage.classList.add("is-launched");
      for (var j = 0; j < n; j++) {
        (function (idx) {
          setTimeout(function () {
            travels[idx].classList.add("is-mounted");
            slots[idx].classList.add("is-dealt");
          }, 60 * idx);
        })(j);
      }
      setTimeout(enterDealt, 60 * n + 240);
      return;
    }

    // full motion — mount every card ON the deck first
    var deckRect = D.deck.getBoundingClientRect();
    for (var k = 0; k < n; k++) {
      var tr = travels[k], r = tr.getBoundingClientRect();
      var dx = deckRect.left - r.left, dy = deckRect.top - r.top, srr = deckRect.width / r.width;
      tr.style.transition = "none";
      tr.style.transform = "translate(" + dx + "px," + dy + "px) scale(" + srr + ")";
      tr.classList.add("is-mounted");
    }

    // hold ~520ms of anticipation, then launch all from one committed frame.
    // A forced reflow (not rAF) commits the on-deck transform so the travel animates —
    // rAF is paused in throttled/backgrounded tabs; setTimeout + reflow is robust.
    setTimeout(function () {
      void D.spread.offsetWidth;                  // commit the mounted (on-deck) transforms
      D.stage.classList.add("is-launched");       // deck + glow fade
      for (var m = 0; m < n; m++) {
        (function (idx) {
          var tr = travels[idx], land = lands[idx];
          // transient will-change: only resident for this card's active travel+land
          // window (~1.6s), then dropped — never left resident on an idle face-down card.
          tr.style.willChange = "transform";
          land.style.willChange = "transform";
          tr.addEventListener("transitionend", function () { tr.style.willChange = "auto"; }, { once: true });
          land.addEventListener("animationend", function () { land.style.willChange = "auto"; }, { once: true });
          tr.style.transition = "transform .54s cubic-bezier(.16,.86,.26,1)";
          tr.style.transitionDelay = (idx * stag) + "s";
          tr.style.transform = "translate(0,0) scale(1)";
          land.style.setProperty("--land-delay", (idx * stag + 0.54) + "s");
          land.classList.add("is-landing");
          setTimeout(function () { slots[idx].classList.add("is-dealt"); }, (idx * stag + 0.54) * 1000);
        })(m);
      }
      // last card's slam settles at (n-1)*stag+540+560ms; +320ms is the ritual's held
      // breath after the final landing before the turn hint appears — the beat that
      // separates "the filing is done" from "now turn one" so it doesn't feel rushed.
      setTimeout(enterDealt, (n - 1) * stag * 1000 + 540 + 560 + 320);
    }, 520);
  }

  function enterDealt() {
    STATE.phase = "dealt";
    D.status.hidden = true;
    announce("Awaiting the turn.", "polite");
    if (STATE.tierKey !== "pull") { D.hint.hidden = false; D.hint.textContent = turnHint(); }
    // focus the first card so keyboard users can turn immediately
    var first = $(".flip", D.spread);
    if (first) first.focus();
  }

  /* ---------------------------------------------------------------- turn hints */
  function turnHint() {
    var n = SPREADS[STATE.tierKey].n, r = STATE.revealed, left = n - r;
    if (r === 0) return "Turn the first.";
    if (left === 1) return "One left. Turn the last.";
    if (n === 3) return "One turned, two to go.";
    // n === 5
    if (r === 1) return "One turned, four to go.";
    if (r === 2) return "Two turned, three to go.";
    if (r === 3) return "Two left.";
    return "";
  }

  /* ---------------------------------------------------------------- turn a card */
  function turnCard(i) {
    if (STATE.phase !== "dealt" && STATE.phase !== "revealing") return;
    var sp = SPREADS[STATE.tierKey], dd = STATE.drawn[i];
    if (dd.shown) return;
    dd.shown = true;
    STATE.revealed++;
    STATE.phase = "revealing";

    var slot = D.spread.querySelectorAll(".slot")[i];
    var flip = $(".flip", slot);
    if (motionOK) {
      flip.style.willChange = "transform";
      flip.addEventListener("transitionend", function () { flip.style.willChange = "auto"; }, { once: true });
    }
    flip.classList.add("is-turned");
    flip.setAttribute("aria-label", faceUpLabel(i, sp, dd));

    fillReadCol(i, sp, dd);

    // assertive: one append per turn (never rewrite the region)
    var read = bindRead(dd.card, dd.reversed);
    var pre = sp.key === "pull" ? "" : sp.positions[i] + ": ";
    announce(pre + dd.card.name + ", " + (dd.reversed ? "Reversed" : "Upright") + ". " + read, "assertive");

    if (STATE.revealed >= sp.n) {
      complete(sp);
    } else if (sp.key !== "pull") {
      D.hint.textContent = turnHint();
    }
  }

  function fillReadCol(i, sp, dd) {
    var col = D.reading.children[i];
    col.innerHTML = "";
    var head = el("p", "read-head");
    var orient = dd.reversed ? "Reversed" : "Upright";
    head.textContent = sp.key === "pull"
      ? dd.card.name + ", " + orient
      : sp.positions[i] + " — " + dd.card.name + ", " + orient;
    var body = el("p", "read-body");
    body.textContent = bindRead(dd.card, dd.reversed);
    col.appendChild(head);
    col.appendChild(body);
    col.classList.add("is-revealed");
  }

  /* ---------------------------------------------------------------- complete */
  function complete(sp) {
    STATE.phase = "complete";
    D.hint.hidden = true;
    showClosing(sp);
    if (sp.filed) {
      var d = dateFromToken(STATE.token || makeToken());
      stampAccession(accession(STATE.seed), d);
    }
    announce(closingLine(sp), "assertive");

    D.cut.hidden = true;
    D.status.hidden = true;
    D.again.hidden = false;
    D.again.textContent = sp.key === "pull" ? "Another glance" : "New sitting";
    D.again.focus();
  }

  function closingLine(sp) {
    if (sp.key === "pull") return "A glance, not kept.";
    if (sp.key === "sitting") return "The sitting is filed.";
    return "The read is filed, in full.";
  }
  function showClosing(sp) {
    D.closing.hidden = false;
    D.closing.textContent = closingLine(sp);
  }
  function stampAccession(code, d) {
    D.accession.hidden = false;
    D.accession.innerHTML = '<span class="code">' + esc(code) + '</span>' +
                            '<span class="filed">filed ' + esc(fmtDate(d)) + '</span>';
  }

  /* ---------------------------------------------------------------- new sitting */
  function resetToTiers() {
    // clear the URL receipt so a fresh sitting isn't mistaken for a reopen
    if (history.replaceState) history.replaceState(null, "", location.pathname);
    STATE = { phase: "tier", tierKey: null, question: "", token: null, seed: null,
              drawn: [], revealed: 0, replay: false, paidRun: false };
    D.ceremony.setAttribute("hidden", "");
    D.tiers.removeAttribute("hidden");
    D.spread.innerHTML = "";
    D.reading.innerHTML = "";
    D.stage.classList.remove("is-launched", "is-pull", "is-deep");
    D.glow.style.display = "";
    D.deck.style.display = "";
    D.intake.hidden = false;
    D.controls.hidden = false;
    D.subline.hidden = false;
    D.reopen.hidden = true;
    setAccent("neutral");
    refreshDoorCopy();
    var firstDoor = $(".door", D.tiers);
    if (firstDoor) firstDoor.focus();
  }

  /* ---------------------------------------------------------------- wiring */
  function wire() {
    Array.prototype.forEach.call(document.querySelectorAll(".door"), function (door) {
      door.addEventListener("click", function () { chooseTier(door.getAttribute("data-tier")); });
    });
    D.cut.addEventListener("click", onCutButton);
    D.again.addEventListener("click", resetToTiers);
    D.input.addEventListener("input", function () { STATE.question = D.input.value; });

    var t;
    window.addEventListener("resize", function () {
      clearTimeout(t);
      t = setTimeout(function () {
        if (STATE.phase === "ready" || STATE.phase === "shuffling" || STATE.phase === "shuffled") positionDeck();
      }, 120);
    });
  }

  /* ------------------------------------------------------------- card finish */
  function setCardVariant(v) {
    document.documentElement.setAttribute("data-card", v);
    try { localStorage.setItem("br_card_variant", v); } catch (e) {}
    var btns = document.querySelectorAll("[data-cardvar]");
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle("is-active", btns[i].getAttribute("data-cardvar") === v);
    }
  }
  function initCardSwitch() {
    var saved = null;
    try { saved = localStorage.getItem("br_card_variant"); } catch (e) {}
    var urlv = new URLSearchParams(location.search).get("card");
    var v = (urlv === "copper" || urlv === "white") ? urlv : (saved === "copper" ? "copper" : "white");
    setCardVariant(v);
    var sw = document.querySelector("[data-cardswitch]");
    if (sw) sw.addEventListener("click", function (e) {
      var b = e.target && e.target.closest ? e.target.closest("[data-cardvar]") : null;
      if (b) setCardVariant(b.getAttribute("data-cardvar"));
    });
  }

  /* ---------------------------------------------------------------- boot */
  function boot() {
    grab();
    initCardSwitch();
    // dev reset for the sitting gate
    if (new URLSearchParams(location.search).get("resetgate") === "1") {
      try { localStorage.removeItem("br_dr_sitting_used"); } catch (e) {}
    }
    wire();
    refreshDoorCopy();
    tryReopen();   // ?read= replays cold, skips gate + ceremony
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  // expose for debugging / acceptance harness (read-only introspection)
  window.__BRTarot = { hash: hash, pick: pick, norm: norm, drawSpread: drawSpread,
                       accession: accession, bindRead: bindRead, SPREADS: SPREADS,
                       state: function () { return STATE; } };
})();
