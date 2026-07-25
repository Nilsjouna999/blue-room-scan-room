/* ============================================================================
   Blue Room Tarot v2 — app.js  ·  "THE LOW LAMP"
   The engine + choreography wiring. Everything below the cut is a pure function
   of the sealed seed; all animation is decoupled theater over an already-decided
   outcome. The cut is the sole decision point (draw + seal + gate + receipt).

   PRESERVED VERBATIM (canon, D2): hash/pick/norm/makeSeed/makeToken/drawSpread/
   accession/bindRead; SPREADS/TIER_STYLE; the cut→seed→draw seal; ?read= receipt +
   cold-open reopen; localStorage fail-open gate; deal choreography constants;
   the 3D flip timing; two live regions; window.__BRTarot.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------------------------------------------------------------- helpers */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }

  var motionOK = !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  /* ---------------------------------------------------------------- engine (PRESERVED)
     Pure, deterministic. FNV-1a 32-bit — structurally the live engine, with the
     one canon correction below (the multiply). pick/norm/drawSpread are verbatim. */
  function hash(s) {
    // FNV-1a 32-bit. Math.imul keeps the multiply in true 32-bit space — the live
    // `h*16777619` (float) reaches ~2^56 for h·16777619, past 2^53, so the low 3
    // bits round away and (&1) collapses reversal to ~5% instead of 50/50. §3.3
    // requires exactly 50/50, so the multiply is corrected here.
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
    return h >>> 0;
  }
  function pick(list, seed) { return list && list.length ? list[hash(seed) % list.length] : null; }
  function norm(s) { return String(s == null ? "" : s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); }
  function makeSeed(key, q, token) { return "read~" + key + "~" + norm(q) + "~" + token; }
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
  function extPivot(card, rev) {                          // authored pivot for the rest of the deck
    try { var vx = window.BRArcanaVoiceExt; if (vx) { var p = vx.pivot(card.name, rev); if (p) return p; } }
    catch (e) { /* fail open to codex prose */ }
    return null;
  }
  function bindRead(card, rev) {                          // the spoken LEAD (also the ARIA announce)
    if (rev) {
      return extPivot(card, true) || card.reversed;      // authored reversed pivot, else codex reversed prose
    }
    if (card.group === "major") {
      try { var v = window.BRArcanaVoice && window.BRArcanaVoice.get("tarot", card.name); if (v && v.p) return v.p; }
      catch (e) { /* fail open */ }
      return card.meaning;
    }
    return extPivot(card, false) || card.meaning;        // authored minor-upright pivot, else codex upright prose
  }

  /* PRESENTATION split (data.js/voice.js stay locked): a taut LEAD (the room's voice) plus
     the fuller CITED record. Major+upright leads on its authored pivot and files the whole
     codex meaning as the record; every other state leads on the codex prose's own first
     sentence and files the remainder. The lead is kept short (italic-worthy); the record is
     long-form roman. This is why the reading no longer reads like a textbook in the room's
     own voice — the encyclopedic register is quoted, not spoken. */
  function splitFirstSentence(text) {
    var t = String(text == null ? "" : text).trim();
    var m = t.match(/^([\s\S]*?[.!?])\s+([\s\S]+)$/);
    if (m && m[2].trim().length > 24) return { lead: m[1].trim(), rest: m[2].trim() };
    return { lead: t, rest: "" };
  }
  function computeRead(card, rev) {
    // Major + upright leads on its locked voice.js pivot, files the whole codex meaning as the record.
    if (!rev && card.group === "major") {
      try {
        var v = window.BRArcanaVoice && window.BRArcanaVoice.get("tarot", card.name);
        if (v && v.p) return { lead: v.p, voiced: true, rest: String(card.meaning || "").trim() };
      } catch (e) { /* fail open to ext / codex split below */ }
    }
    // Every other state (all Minors upright, all 78 reversed) leads on its authored pivot from
    // voice-ext.js and files the FULL codex prose as the cited record — the codex is now pure citation.
    var xp = extPivot(card, rev);
    if (xp) return { lead: xp, voiced: true, rest: String((rev ? card.reversed : card.meaning) || "").trim() };
    // Fail open: no authored pivot present — split the codex prose's own first sentence as the lead.
    var s = splitFirstSentence(rev ? card.reversed : card.meaning);
    return { lead: s.lead, voiced: false, rest: s.rest };
  }

  /* ---------------------------------------------------------------- tiers (PRESERVED) */
  var SPREADS = {
    pull:    { key: "pull",    title: "A Glance",     n: 1, paid: false, price: null,    filed: false,
               positions: [null], notes: [null] },
    sitting: { key: "sitting", title: "A Sitting",    n: 3, paid: false, price: "$1.99", filed: true,
               positions: ["The Ground", "The Crossing", "The Turn"],
               notes: ["what the matter rests on", "what stands against it", "where it tends, left as it stands"],
               explain: [
                 "The base it already stands on — what’s settled or given, under the question itself. Its counterweight is the Crossing.",
                 "What stands against it — the friction or opposition the Ground has to bear. Its counterweight is the Ground.",
                 "Where it tends, left exactly as it stands — the close of the arc, not a verdict."
               ] },
    deep:    { key: "deep",    title: "The Deep Read", n: 5, paid: true,  price: "$2.99", filed: true,
               positions: ["The Ground", "The Crossing", "The Root", "The Crown", "The Turn"],
               notes: ["what it rests on", "what stands against it", "what it grew from", "what it reaches for", "where it tends"],
               explain: [
                 "The base it already stands on — what’s settled or given, under the question itself. Its counterweight is the Crossing.",
                 "What stands against it — the friction or opposition the Ground has to bear. Its counterweight is the Ground.",
                 "What it grew from — the origin underneath both, older than either. Its counterweight is the Crown.",
                 "What it reaches for — the aim pulling from above, the shape it’s growing toward. Its counterweight is the Root.",
                 "Where it tends, left exactly as it stands — the close of the arc, not a verdict."
               ] }
  };

  // R7/COPY §10 — the on-page teaching block (reading-head disclosure). One paragraph per
  // filed tier: reads the spread as a single movement (polarity pairs → close), names the angle
  // to watch (agreement vs disagreement), and states plainly what a reversed card means.
  var HOWTO = {
    sitting: "Read the three in the order they fell — Ground, then Crossing, then Turn — as one line, " +
      "not three separate answers. Ground and Crossing are a pair: what the matter already stands on, weighed " +
      "against what opposes it. Neither wins — the tension between them is the real subject. The Turn is " +
      "where that tension is heading if nothing moves: a likely drift, not a sentence. Reversed doesn’t mean " +
      "opposite — it’s the same meaning turned inward: blocked, delayed, or not yet outward.",
    deep: "Read the five in the order they fell, as one movement in two pairs and a close. Ground and Crossing " +
      "are the first pair — what the matter already stands on, weighed against what opposes it. Root and " +
      "Crown are the second — what it grew from, reaching toward what it’s aiming at. The Turn closes " +
      "the arc: where all four are tending, left exactly as they stand. Notice where the cards agree and where " +
      "they pull apart — agreement confirms, disagreement marks the real work. Reversed doesn’t mean " +
      "opposite — it’s the same meaning turned inward: blocked, delayed, or not yet outward."
  };
  var ORIENT_GLOSS = { rev: "inward, not yet" };

  // The tier-specific arc line — on the reading head (rh-sub): the bare movement, in fall order.
  // The seats' MEANINGS + polarity live in the Spread Key (with its ↔ axes) above; the head just
  // names the sequence to walk, so the triad gloss isn't restated a fourth time. Pull has no head.
  var ARC = {
    sitting: "Read in the order it fell — ground, crossing, turn.",
    deep: "Read in the order it fell — ground, crossing, root, crown, turn."
  };

  // THE SPREAD KEY — the one always-visible frame at the table (revealed once the cards land
  // face-down, before any turn): names the whole arc, and couples each polarity pair with a
  // copper ↔ so the boundary between the seats is literal, not only prose. Turn is the sum of
  // the pairs, not a pair itself — it carries no axis row.
  var SK_LEGEND = {
    sitting: "Three seats, one arc — what it rests on, what stands against it, and where it tends.",
    deep: "Five seats, one arc — what it rests on and what stands against it, what it grew from " +
      "and what it reaches for, and where it all tends."
  };
  var SK_AXES = {
    sitting: [["Ground", "Crossing", "support · resistance"]],
    deep: [["Ground", "Crossing", "support · resistance"], ["Root", "Crown", "origin · reach"]]
  };
  function renderSpreadKey(sp) {
    if (!D.spreadKey) return;
    if (!sp || sp.key === "pull") { D.spreadKey.hidden = true; D.spreadKey.innerHTML = ""; return; }
    var axes = SK_AXES[sp.key] || [];
    D.spreadKey.innerHTML =
      '<p class="sk-eyebrow">THE SHAPE OF IT</p>' +
      '<p class="sk-legend">' + esc(SK_LEGEND[sp.key] || "") + '</p>' +
      '<div class="sk-axes">' +
        axes.map(function (a) {
          return '<span class="sk-axis">' +
                   '<span class="sk-pair">' + esc(a[0]) + '<span class="x">&#8596;</span>' + esc(a[1]) + '</span>' +
                   '<span class="sk-meta">' + esc(a[2]) + '</span>' +
                 '</span>';
        }).join("") +
      '</div>';
  }
  var TIER_STYLE = {
    pull:    { w: "clamp(184px,42vw,216px)", ar: "150 / 238" },
    sitting: { w: "clamp(120px,26vw,150px)", ar: "150 / 238" },
    deep:    { w: "clamp(92px,18vw,138px)",  ar: "150 / 238" }
  };

  /* ---------------------------------------------------------------- copy: matter station */
  // R4 example pool (COPY §3) — declaratives, tap-to-fill, never auto-submit, never a timer.
  var POOL = [
    "what I keep circling back to",
    "where this is actually heading",
    "what I already know but haven't said aloud",
    "what I'm not seeing here",
    "what this season is asking of me",
    "what I'd ask if I weren't bracing for the answer",
    "what holds this together",
    "whether it's time",
    "what I owe myself"
  ];
  var DEFAULT_PLACEHOLDER = "a question, in your own words";
  var SILENT_PLACEHOLDER = "Laid in silence.";
  var chipOffset = 0; // rotation is deterministic per tier-entry, never a timer

  // R3/COPY §9 connective bridges — position-structural, keyed by position name.
  var BRIDGES = {
    "The Crossing": "Set against the ground just laid —",
    "The Root":     "Underneath both of those —",
    "The Crown":    "Reaching up out of that —",
    "The Turn":     "Which leaves it here —"
  };
  var ROMAN = ["", "I", "II", "III", "IV", "V"];
  function roman(n) { return ROMAN[n] || String(n); }

  function ariaFor(key) { return key === "pull" ? "Tarot glance" : key === "deep" ? "Tarot deep read" : "Tarot sitting"; }

  /* ---------------------------------------------------------------- gate (PRESERVED) */
  function sittingUsed() { try { return localStorage.getItem("br_dr_sitting_used") === "1"; } catch (e) { return false; } }
  function isPaidNow(key) { var sp = SPREADS[key]; return !!(sp && (sp.paid || (key === "sitting" && sittingUsed()))); }

  var SESSION = makeToken();
  var pullN = 0;

  /* ---------------------------------------------------------------- state */
  var STATE = { phase: "tier", tierKey: null, question: "", token: null, seed: null,
                drawn: [], revealed: 0, replay: false, paidRun: false, done: false };

  var readIO = null;

  /* ---------------------------------------------------------------- DOM refs */
  var D = {};
  function grab() {
    D.room = $("#room");
    D.tiers = $('[data-view="tier"]');
    D.ceremony = $('[data-view="ceremony"]');
    D.reopen = $("[data-reopen]");
    D.intake = $("[data-intake]");
    D.input = $("#question");
    D.chips = $("[data-intake-chips]");
    D.refresh = $("[data-intake-refresh]");
    D.silence = $("[data-intake-silence]");
    D.intakeLocked = $("[data-intake-locked]");
    D.pullNote = $("[data-pullnote]");
    D.cutnote = $("[data-cutnote]");
    D.mocknote = $("[data-mocknote]");
    D.subline = $("[data-subline]");
    D.stage = $("[data-stage]");
    D.spreadKey = $("[data-spread-key]");
    D.glow = $("[data-glow]");
    D.deck = $("[data-deck]");
    D.spread = $("[data-spread]");
    D.say = $("[data-say]");
    D.controls = $("[data-controls]");
    D.cut = $("[data-cut]");
    D.status = $("[data-status]");
    D.again = $("[data-again]");
    D.pretierNav = $("[data-pretier-nav]");
    D.backTier = $("[data-back-tier]");
    D.hint = $("[data-hint]");
    D.descend = $("[data-descend]");
    D.descendBtn = $("[data-descend-btn]");
    D.reading = $("[data-reading]");
    D.closingBlock = $("[data-closing-block]");
    D.closing = $("[data-closing]");
    D.closenote = $("[data-closenote]");
    D.confidential = $("[data-confidential]");
    D.accession = $("[data-accession]");
    D.closeActions = $("[data-close-actions]");
    D.againBottom = $("[data-again-bottom]");
    D.backRoom = $("[data-back-room]");
    D.polite = $("[data-live-polite]");
    D.assertive = $("[data-live-assertive]");
  }

  /* ---------------------------------------------------------------- mood */
  function setMood(name) { document.body.setAttribute("data-mood", name); }

  /* ---------------------------------------------------------------- aria (two regions, PRESERVED) */
  function announce(msg, mode) {
    var region = mode === "assertive" ? D.assertive : D.polite;
    if (!region) return;
    var n = el("span");
    n.textContent = msg + " ";
    region.appendChild(n);
    while (region.childNodes.length > 12) region.removeChild(region.firstChild);
  }

  /* ---------------------------------------------------------------- date */
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"];
  function fmtDate(d) { return d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear(); }
  function dateFromToken(token) {
    try {
      var ms = parseInt(String(token).slice(0, -6), 36);
      if (ms && isFinite(ms)) return new Date(ms);
    } catch (e) {}
    return new Date();
  }

  /* ---------------------------------------------------------------- accent register (PRESERVED) */
  function setAccent(mode) {
    var r = D.room.style;
    if (mode === "gold") { r.setProperty("--accent", "#a2864a"); r.setProperty("--accent-lit", "#c0a05d"); }
    else if (mode === "violet") { r.setProperty("--accent", "#8a6fb0"); r.setProperty("--accent-lit", "#a487c8"); }
    else { r.setProperty("--accent", "#8f8266"); r.setProperty("--accent-lit", "#b6a179"); } // neutral
  }

  /* ---------------------------------------------------------------- card backs (R1)
     No args → generic deck-pile back. (pos,sub) → prints the withheld question band. */
  function backHTML(pos, sub) {
    var has = !!pos;
    var prompt = has
      ? '<div class="back-prompt" aria-hidden="true"><span class="bp-pos">' + esc(pos) + '</span>' +
        '<span class="bp-sub">' + esc(sub) + '</span></div>'
      : '';
    return '' +
      '<div class="back' + (has ? ' has-prompt' : '') + '">' +
        '<div class="back-frame"></div>' +
        '<div class="back-ring"></div>' +
        '<div class="back-diamond">&#9670;</div>' +
        '<div class="back-mono top">ARCANA</div>' +
        prompt +
        '<div class="back-mono bot">BLUE ROOM</div>' +
        '<span class="tick tl"></span><span class="tick tr"></span>' +
        '<span class="tick bl"></span><span class="tick br"></span>' +
      '</div>';
  }

  /* face content for a drawn card (LOCKED — reused verbatim for the reading echo card) */
  function faceHTML(card, rev) {
    var headLeft, glyph;
    if (card.group === "major") { headLeft = "ARCANA · " + card.rank; }
    else { headLeft = String(card.suit).toUpperCase() + " · " + String(card.element).toUpperCase(); }
    glyph = "&#9670;"; // the diamond — the original card art, on EVERY card
    var longName = card.name.length >= 13 ? " is-long" : "";
    return '' +
      '<div class="face-head">' +
        '<span class="face-meta">' + headLeft + '</span>' +
        '<span class="face-glyph">' + glyph + '</span>' +
      '</div>' +
      '<div class="face-name' + longName + '">' + esc(card.name) + '</div>' +
      '<div class="face-div"></div>' +
      '<div class="face-orient">' +
        (rev ? 'Reversed<span class="fo-gloss">inward, not yet</span>' : "Upright") +
      '</div>' +
      '<span class="tick tl"></span><span class="tick br"></span>';
  }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  /* ---------------------------------------------------------------- deck render (PRESERVED) */
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
    html += '<div class="deck-top">' + backHTML() + '</div>'; // generic pile back
    D.deck.innerHTML = html;
  }

  /* ---------------------------------------------------------------- matter station (R4) */
  function renderChips(off) {
    if (!D.chips) return;
    D.chips.innerHTML = "";
    for (var k = 0; k < 3; k++) {
      var text = POOL[(off + k) % POOL.length];
      var b = document.createElement("button");
      b.type = "button"; b.className = "intake-chip";
      b.setAttribute("data-chip-text", text);
      b.textContent = text;
      (function (t) { b.addEventListener("click", function () { fillFromChip(t); }); })(text);
      D.chips.appendChild(b);
    }
  }
  function fillFromChip(text) {
    // route through the exact input path (seed integrity) — never auto-submit, never re-seed
    setSilent(false);
    D.input.value = text;
    STATE.question = text;
    D.input.focus();
    try { var l = D.input.value.length; D.input.setSelectionRange(l, l); } catch (e) {}
  }
  function setSilent(on) {
    if (!D.input) return;
    if (on) {
      D.input.value = ""; STATE.question = "";
      D.input.classList.add("is-silent");
      D.input.placeholder = SILENT_PLACEHOLDER;
      if (D.silence) D.silence.setAttribute("aria-pressed", "true");
    } else {
      D.input.classList.remove("is-silent");
      D.input.placeholder = DEFAULT_PLACEHOLDER;
      if (D.silence) D.silence.setAttribute("aria-pressed", "false");
    }
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
              drawn: [], revealed: 0, replay: false, paidRun: false, done: false };
    var sp = SPREADS[key], st = TIER_STYLE[key], isPull = (key === "pull");

    D.tiers.setAttribute("hidden", "");
    D.ceremony.removeAttribute("hidden");
    D.ceremony.setAttribute("aria-label", ariaFor(key));

    D.stage.style.setProperty("--card-w", st.w);
    D.stage.style.setProperty("--ar", st.ar);
    D.stage.classList.toggle("is-pull", isPull);
    D.stage.classList.toggle("is-deep", key === "deep");

    // matter station reset
    D.input.value = "";
    D.input.readOnly = false;
    D.input.classList.remove("is-locked", "is-silent");
    D.input.removeAttribute("aria-readonly");
    D.input.placeholder = DEFAULT_PLACEHOLDER;
    D.intake.classList.remove("is-locked");
    if (D.intakeLocked) D.intakeLocked.hidden = true;
    if (D.silence) D.silence.setAttribute("aria-pressed", "false");

    D.intake.hidden = isPull;
    D.pullNote.hidden = !isPull;
    if (!isPull) { chipOffset = (chipOffset + 3) % POOL.length; renderChips(chipOffset); }

    D.cutnote.hidden = isPull;                 // A Glance shows no cut-note
    var paid = isPaidNow(key);
    if (paid) {
      D.mocknote.hidden = false;
      D.mocknote.textContent = "No payment in this build. The settle stages a charge of " + sp.price + ", and nothing more.";
    } else {
      D.mocknote.hidden = true;
    }

    setMood("tier");
    setAccent("neutral");
    renderDeck();
    renderSkeleton(sp);
    renderReadingSkeleton(sp, false);
    renderSpreadKey(sp);                       // built now, revealed only once the cards land
    if (D.spreadKey) D.spreadKey.hidden = true;

    D.reopen.hidden = true;
    D.closingBlock.hidden = true;
    D.closingBlock.classList.remove("is-sealing");
    D.accession.hidden = true;                 // clear any prior stamp before a fresh ceremony
    D.descend.hidden = true;
    D.again.hidden = true;
    D.status.hidden = true;
    D.hint.hidden = true;
    D.subline.hidden = false;
    clearSay();

    D.cut.hidden = false;
    D.cut.disabled = false;
    D.cut.classList.toggle("is-paid", paid);
    D.cut.classList.remove("is-settling");
    D.cut.textContent = "Shuffle";

    D.pretierNav.hidden = false;
    D.backTier.disabled = false;

    STATE.phase = "ready";
    positionDeck();
    if (isPull) D.cut.focus(); else D.input.focus();
  }

  /* R1 — empty label ships textless; the position lives on the BACK until the turn */
  function renderSkeleton(sp) {
    D.spread.innerHTML = "";
    for (var i = 0; i < sp.n; i++) {
      var slot = el("div", "slot");
      var label = el("div", "slot-label");
      if (sp.positions[i]) {
        label.innerHTML = '<span class="label-wait" aria-hidden="true"></span>' +
                          '<span class="pos"></span><span class="sub"></span>';
      }
      slot.appendChild(label);
      var box = el("div", "card-slot");
      slot.appendChild(box);
      D.spread.appendChild(slot);
    }
  }

  /* R2/R3 — the descent skeleton: epigraph, head, per-card items (+ bridges), synthesis */
  function renderReadingSkeleton(sp, coldOpen) {
    D.reading.className = "reading" + (sp.key === "pull" ? " is-pull" : "");
    D.reading.innerHTML = "";
    var isPull = sp.key === "pull";

    if (!isPull) {
      var matter = el("div", "reading-matter");
      matter.setAttribute("data-matter", "");
      D.reading.appendChild(matter);

      var head = el("div", "reading-head");
      var howto = HOWTO[sp.key];
      // The process lesson is open on a live reading (the sitter explicitly wants to learn how
      // to read it) and collapsed on a reopened receipt (coldOpen), where the calm recap is the
      // point. The foot of it carries the one quiet path to the Codex's full guide.
      head.innerHTML = '<h2 class="rh-eyebrow">THE READING</h2><p class="rh-sub">' +
        esc(ARC[sp.key] || "Read in the order it fell.") + '</p>' +
        (howto ? '<details class="how-to-read"' + (coldOpen ? '' : ' open') + '>' +
          '<summary>How to read this</summary><p>' + esc(howto) + '</p>' +
          '<p class="how-to-more"><a href="../codex.html#tarot-guide">The full guide lives in the Codex &rarr;</a></p>' +
        '</details>' : '');
      D.reading.appendChild(head);
    }

    for (var i = 0; i < sp.n; i++) {
      if (!isPull && i > 0) {
        var bridgeText = BRIDGES[sp.positions[i]];
        if (bridgeText) {
          var br = el("p", "ri-bridge");
          br.textContent = bridgeText;
          D.reading.appendChild(br);
        }
      }
      var item = document.createElement("article");
      item.className = "read-item" + (isPull ? " is-pull" : "");
      item.setAttribute("data-read-item", "");
      item.setAttribute("aria-labelledby", (isPull ? "rn-" : "rh-") + i);

      var card = el("div", "ri-card");
      card.setAttribute("aria-hidden", "true");
      card.innerHTML = '<div class="ri-silhouette"></div>';
      item.appendChild(card);

      var body = el("div", "ri-body");
      var html = "";
      if (!isPull) {
        // numeral only — marks the order it fell; the position NAME follows in the copper eyebrow
        // on the very next line, so we don't print it twice in a row.
        html += '<p class="ri-index">' + roman(i + 1) + '</p>';
        html += '<p class="ri-eyebrow" id="rh-' + i + '"><span class="pos">' + esc(sp.positions[i]) + '</span>' +
                ' &middot; <span class="sub">' + esc(sp.notes[i]) + '</span></p>';
        if (sp.explain && sp.explain[i]) html += '<p class="ri-role">' + esc(sp.explain[i]) + '</p>';
      }
      html += '<h3 class="ri-name" id="rn-' + i + '"><span class="nm">&mdash;</span></h3>';
      html += '<div class="ri-read-wrap" data-read-wrap><p class="ri-lead ri-ghost">Awaiting the turn.</p></div>';
      body.innerHTML = html;
      item.appendChild(body);

      D.reading.appendChild(item);
      if (!coldOpen) observeItem(item);
    }

    if (!isPull) {
      var syn = el("p", "reading-synthesis");
      syn.setAttribute("data-synthesis", "");
      syn.hidden = true;
      D.reading.appendChild(syn);
    }
  }

  /* ---------------------------------------------------------------- reveal engine (R2) */
  function initReadIO() {
    if (!("IntersectionObserver" in window) || !motionOK) return;
    document.documentElement.classList.add("js-io");
    readIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); readIO.unobserve(e.target); }
      });
    }, { threshold: 0.28, rootMargin: "0px 0px -18% 0px" });
  }
  function observeItem(it) { if (readIO && it) readIO.observe(it); }

  /* ---------------------------------------------------------------- deck placement (PRESERVED) */
  function positionDeck() {
    var box = $(".card-slot", D.spread);
    if (!box) return;
    var sr = D.stage.getBoundingClientRect(), br = box.getBoundingClientRect();
    D.stage.style.setProperty("--deck-top", (br.top - sr.top) + "px");
  }

  /* ---------------------------------------------------------------- shuffle (PRESERVED timings) */
  function onCutButton() {
    if (STATE.phase === "ready") { runShuffle(); return; }
    if (STATE.phase === "shuffled") { cut(); return; }
  }

  function runShuffle() {
    STATE.phase = "shuffling";
    D.cut.disabled = true;
    D.cut.hidden = true;
    D.backTier.disabled = true;          // escape stays visible, non-operable mid-shuffle
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
      D.backTier.disabled = false;
      D.cut.textContent = cutLabel();
    }, wait);
  }

  function cutLabel() {
    var key = STATE.tierKey;
    if (key === "pull") return "Cut the deck";
    if (!isPaidNow(key)) return "Cut the deck";
    return "Cut the deck · " + SPREADS[key].price;
  }

  /* ---------------------------------------------------------------- the cut = the seal (PRESERVED) */
  function cut() {
    var key = STATE.tierKey;
    var paid = isPaidNow(key);                 // snapshot BEFORE the gate bit is written
    STATE.paidRun = paid;
    // the escape hatch closes the instant the cut fires — synchronously, before the
    // paid settle's own delay, so "back to tier" can never race a pending doCut() and
    // fire resetToTiers() into a STATE the settle callback is about to write into.
    D.pretierNav.hidden = true;
    D.backTier.disabled = true;
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

    // the escape hatch closes the instant the cut fires — synchronously, before any draw
    D.pretierNav.hidden = true;
    D.backTier.disabled = true;
    setMood("cut");

    // controls row shows exactly one control at a time
    D.cut.hidden = true;
    D.cut.disabled = true;

    if (key === "pull") {
      var pseed = "pull~" + SESSION + "~" + (pullN++);
      STATE.token = null; STATE.seed = pseed;
      STATE.drawn = drawSpread(pseed, sp.n).map(function (d) { d.shown = false; return d; });
      announce("The deck is cut.", "polite");
    } else {
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
    // native readonly + aria-readonly: the filed value stays focusable and reviewable
    D.input.readOnly = true;
    D.input.setAttribute("aria-readonly", "true");
    D.input.classList.add("is-locked");
    D.intake.classList.add("is-locked");                 // R4 echo: collapse the station
    if (D.intakeLocked) D.intakeLocked.hidden = false;   // "Asked. The record won't revise it."
  }

  /* ---------------------------------------------------------------- receipt (PRESERVED) */
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
      revealed: sp.n, replay: true, paidRun: false, done: true
    };
    renderColdOpen(sp);
    return true;
  }

  /* cold open — no deck, no ceremony, cards already face-up, IO bypassed */
  function renderColdOpen(sp) {
    D.tiers.setAttribute("hidden", "");
    D.ceremony.removeAttribute("hidden");
    D.ceremony.setAttribute("aria-label", ariaFor(sp.key));
    var st = TIER_STYLE[sp.key];
    D.stage.style.setProperty("--card-w", st.w);
    D.stage.style.setProperty("--ar", st.ar);
    D.stage.classList.toggle("is-pull", sp.key === "pull");
    D.stage.classList.toggle("is-deep", sp.key === "deep");

    D.intake.hidden = true;
    D.pullNote.hidden = true;
    D.cutnote.hidden = true;
    D.mocknote.hidden = true;
    D.pretierNav.hidden = true;

    // A reopened receipt still needs a way out — a forward control + the bottom cluster.
    D.controls.hidden = false;
    D.cut.hidden = true;
    D.again.hidden = false;
    D.again.textContent = againLabel(sp);      // was hardcoded "Begin a new sitting" for every tier
    D.status.hidden = true;
    D.hint.hidden = true;
    D.glow.style.display = "none";
    D.deck.style.display = "none";
    D.subline.hidden = true;
    setMood("reading");
    setAccent(sp.paid || sp.key === "sitting" ? "gold" : "neutral");

    var d = dateFromToken(STATE.token);
    D.reopen.hidden = false;
    D.reopen.textContent = "Reopened from your record. Filed " + fmtDate(d) + ".";

    renderSkeleton(sp);
    renderReadingSkeleton(sp, true);   // coldOpen: never observe (no scroll dependence)
    renderSpreadKey(sp);               // a reopened receipt shows the same frame
    if (D.spreadKey) D.spreadKey.hidden = (sp.key === "pull");

    var slots = D.spread.querySelectorAll(".slot");
    for (var i = 0; i < sp.n; i++) {
      var dd = STATE.drawn[i];
      var flip = mountCard(slots[i], i, sp, dd);
      flip.style.transition = "none";
      flip.classList.add("is-turned");
      flip.setAttribute("aria-disabled", "true");
      flip.disabled = true;
      // deliver the label STATICALLY (R1 §5.6)
      var label = $(".slot-label", slots[i]);
      if (label && sp.positions[i]) {
        var pe = $(".pos", label), se = $(".sub", label);
        if (pe) pe.textContent = sp.positions[i];
        if (se) se.textContent = sp.notes[i];
        if (sp.explain && sp.explain[i]) label.title = sp.explain[i];
        label.classList.add("is-answered", "no-anim");
      }
      $(".card-travel", slots[i]).classList.add("is-mounted");
      slots[i].classList.add("is-dealt");
      fillReadCol(i, sp, dd);
    }

    // reopen bypasses IO: force every reading item + head visible
    var items = D.reading.querySelectorAll("[data-read-item]");
    for (var j = 0; j < items.length; j++) items[j].classList.add("in");
    var rh = $(".reading-head", D.reading);
    if (rh) rh.classList.add("is-shown");

    fillEpigraph(sp);
    if (sp.key !== "pull") fillSynthesis(sp);
    D.descend.hidden = false;                  // signpost shown for every reopened tier
    showClose(sp);
    if (sp.filed) stampAccession(accession(STATE.seed), d); else D.accession.hidden = true;
    D.againBottom.textContent = againLabel(sp);   // was hardcoded "Begin a new sitting"
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
    back.innerHTML = backHTML(sp.positions[i], sp.notes[i]);   // filed → carries its question
    if (sp.positions[i]) slot.classList.add("has-prompt");     // hold the flip a beat (CSS)
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
    return sp2.positions[i] + ", card " + (i + 1) + " of " + sp2.n + ", face down. Turn it to hear what it holds.";
  }
  function faceUpLabel(i, sp, dd) {
    var orient = dd.reversed ? "Reversed" : "Upright";
    if (sp.key === "pull") return dd.card.name + ", " + orient + ".";
    return sp.positions[i] + ": " + dd.card.name + ", " + orient + ".";
  }

  /* ---------------------------------------------------------------- cutlift (PRESERVED) */
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

  /* ---------------------------------------------------------------- deal (PRESERVED choreography) */
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

    var deckRect = D.deck.getBoundingClientRect();
    for (var k = 0; k < n; k++) {
      var tr = travels[k], r = tr.getBoundingClientRect();
      var dx = deckRect.left - r.left, dy = deckRect.top - r.top, srr = deckRect.width / r.width;
      tr.style.transition = "none";
      tr.style.transform = "translate(" + dx + "px," + dy + "px) scale(" + srr + ")";
      tr.classList.add("is-mounted");
    }

    setTimeout(function () {
      void D.spread.offsetWidth;                  // commit the on-deck transforms
      D.stage.classList.add("is-launched");
      for (var m = 0; m < n; m++) {
        (function (idx) {
          var tr = travels[idx], land = lands[idx];
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
      // trailing post-deal hush extended to +560 (§8): "the filing is done" separates
      // from "now turn one" (reduced-motion path uses the short fixed wait above).
      setTimeout(enterDealt, (n - 1) * stag * 1000 + 540 + 560);
    }, 520);
  }

  function enterDealt() {
    STATE.phase = "dealt";
    D.status.hidden = true;
    D.cutnote.hidden = true;                   // the cut-note is a PRE-cut instruction — stale now the deal has landed
    // the spread's intent, present the whole time the sitter turns cards (the "immediately
    // see what it's directed at" beat); pull has no seats, so no key.
    if (STATE.tierKey !== "pull" && D.spreadKey) D.spreadKey.hidden = false;
    announce("Awaiting the turn.", "polite");
    if (STATE.tierKey !== "pull") { D.hint.hidden = false; D.hint.textContent = turnHint(); }
    var first = $(".flip", D.spread);
    if (first) first.focus();
  }

  /* ---------------------------------------------------------------- turn hints (PRESERVED copy) */
  function turnHint() {
    var n = SPREADS[STATE.tierKey].n, r = STATE.revealed, left = n - r;
    if (r === 0) return "Turn the first.";
    if (left === 1) return "One left. Turn the last.";
    if (n === 3) return "One turned, two to go.";
    if (r === 1) return "One turned, four to go.";
    if (r === 2) return "Two turned, three to go.";
    if (r === 3) return "Two left.";
    return "";
  }

  /* ---------------------------------------------------------------- turn a card (R1 + deferred read) */
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

    // R1 — hand the question UP into the label, lift the printed prompt off the back;
    // the flip itself is held back .18s in CSS so the ask departs before the answer turns.
    var label = $(".slot-label", slot);
    if (label && sp.positions[i]) {
      var posEl = $(".pos", label), subEl = $(".sub", label);
      if (posEl) posEl.textContent = sp.positions[i];
      if (subEl) subEl.textContent = sp.notes[i];
      if (sp.explain && sp.explain[i]) label.title = sp.explain[i];
      label.classList.add("is-answered");
    }
    var bp = $(".back-prompt", slot);
    if (bp) bp.classList.add("is-lifting");

    flip.classList.add("is-turned");
    flip.setAttribute("aria-label", faceUpLabel(i, sp, dd));

    // assertive announce fires NOW — a screen reader never waits on visuals
    var read = bindRead(dd.card, dd.reversed);
    var pre = sp.key === "pull" ? "" : sp.positions[i] + ": ";
    announce(pre + dd.card.name + ", " + (dd.reversed ? "Reversed" : "Upright") + ". " + read, "assertive");

    // the VISIBLE read arrives at/after the face — deferred, STATE-guarded (§6.4).
    // R1/R6: the same beat surfaces the card's line at the TABLE (a sliver of the answer),
    // then fills its full record below. The turn now speaks where the eye already is.
    var idx = i, delay = motionOK ? 930 : 150;
    setTimeout(function () {
      if (STATE.phase !== "revealing" && STATE.phase !== "complete") return; // reset aborted the beat
      if (STATE.drawn[idx] !== dd) return;                                    // spread rebuilt
      sayAtStage(dd);
      fillReadCol(idx, sp, dd);
      if (STATE.revealed >= sp.n && !STATE.done) { STATE.done = true; complete(sp); }
    }, delay);

    // turn-hint lags the read reveal so two content changes never share a frame (§8/§13-25)
    if (STATE.revealed < sp.n && sp.key !== "pull") {
      setTimeout(function () {
        if (STATE.phase === "revealing" || STATE.phase === "dealt") D.hint.textContent = turnHint();
      }, delay + 200);
    }
  }

  /* R1/R6 — the card's line, spoken at the table on turn (the sliver of the answer) */
  function sayAtStage(dd) {
    if (!D.say) return;
    var rr = computeRead(dd.card, dd.reversed);
    D.say.textContent = rr.lead;
    D.say.classList.remove("is-said");
    void D.say.offsetWidth;                    // restart the fade for each successive turn
    D.say.classList.add("is-said");
  }
  function clearSay() {
    if (!D.say) return;
    D.say.textContent = "";
    D.say.classList.remove("is-said");
  }

  function fillReadCol(i, sp, dd) {
    setMood("reading");                       // first item mounts → deepest register
    var items = D.reading.querySelectorAll("[data-read-item]");
    var item = items[i];
    if (!item) return;

    var faceWrap = $(".ri-card", item);
    if (faceWrap) {
      var face = document.createElement("div");
      face.className = "ri-face" + (dd.reversed ? " card-rev" : "");
      face.innerHTML = faceHTML(dd.card, dd.reversed);
      faceWrap.appendChild(face);            // layered over the silhouette
    }

    var nameEl = $(".ri-name", item);
    if (nameEl) {
      var orient = dd.reversed ? "Reversed" : "Upright";
      var gloss = dd.reversed ? '<span class="ri-orient-gloss">' + ORIENT_GLOSS.rev + '</span>' : '';
      nameEl.innerHTML = '<span class="nm">' + esc(dd.card.name) + '</span>' +
                         '<span class="ri-orient' + (dd.reversed ? " is-rev" : "") + '">' + orient + '</span>' + gloss;
    }

    var wrap = $("[data-read-wrap]", item);
    if (wrap) {
      var rr = computeRead(dd.card, dd.reversed);
      var h = '<p class="ri-lead' + (rr.voiced ? " is-voiced" : "") + '">' + esc(rr.lead) + '</p>';
      if (rr.rest) {
        h += '<div class="ri-record">' +
               '<p class="ri-record-label">From the codex</p>' +
               '<p class="ri-record-body">' + esc(rr.rest) + '</p>' +
             '</div>';
      }
      wrap.innerHTML = h;
    }

    item.classList.add("is-revealed");
    var head = $(".reading-head", D.reading);
    if (head) head.classList.add("is-shown");
  }

  /* ---------------------------------------------------------------- epigraph + synthesis */
  function fillEpigraph(sp) {
    if (sp.key === "pull") return;
    var m = $("[data-matter]", D.reading);
    if (!m) return;
    var q = (STATE.question || "").trim();
    if (q) {
      m.innerHTML = '<p class="rm-eyebrow">THE MATTER</p><p class="rm-quote">&ldquo;' + esc(q) + '&rdquo;</p>';
    } else {
      m.innerHTML = '<p class="rm-none">No question was put. The sitting stands on its own, position by position.</p>';
    }
    m.classList.add("is-shown");
  }
  function fillSynthesis(sp) {
    var s = $("[data-synthesis]", D.reading);
    if (!s) return;
    var hasQ = !!(STATE.question || "").trim(), base, ret;
    if (sp.key === "sitting") {
      base = "Ground, crossing, turn — what it rests on, what stands against it, where it leans if nothing changes.";
      ret = "That is what the sitting returns to it.";
    } else {
      base = "Ground against crossing, root against crown — what holds it, what opposes it, what it grew from, what it reaches for — and the turn, where it leans if nothing changes.";
      ret = "That is what the read returns to it.";
    }
    s.innerHTML = esc(base) + (hasQ ? '<br><span class="syn-return">' + esc(ret) + '</span>' : "");
    s.hidden = false;
  }

  /* ---------------------------------------------------------------- complete + close */
  function complete(sp) {
    STATE.phase = "complete";
    STATE.done = true;
    D.hint.hidden = true;
    D.cutnote.hidden = true;                  // the cut-note is spent — clear it from the reading view

    fillEpigraph(sp);
    if (sp.key !== "pull") fillSynthesis(sp);

    // Pull has no descent, but its single read still needs to be present and reachable:
    // surface it in place so the glance is self-contained.
    if (sp.key === "pull") {
      var firstItem = $("[data-read-item]", D.reading);
      if (firstItem) firstItem.classList.add("in");
    }
    D.descend.hidden = false;                  // the ONE signpost down — now shown for every tier

    showClose(sp);
    if (sp.filed) {
      var d = dateFromToken(STATE.token || makeToken());
      stampAccession(accession(STATE.seed), d);
    } else {
      D.accession.hidden = true;               // a Glance is not filed — never carry a stale stamp in
    }
    announce(closingLine(sp), "assertive");

    // The climax points DOWN into the record, never at a reset. The stage-level "again" is
    // retired here — restart lives only at the true end, in the close block — and focus lands
    // on "Read it down", so a reflexive keyboard Enter descends into the reading instead of
    // destroying the just-drawn record.
    D.cut.hidden = true;
    D.status.hidden = true;
    D.again.hidden = true;
    D.againBottom.textContent = againLabel(sp);
    if (D.descendBtn) D.descendBtn.focus();
  }

  function closingLine(sp) {
    if (sp.key === "pull") return "A glance, not kept.";
    if (sp.key === "sitting") return "The sitting is filed.";
    return "The read is filed, in full.";
  }
  // The close is the reading's quietest, most personal beat — a bare filing fact, no arc-recap.
  // The synthesis already restated the arc at the foot of the reading; the close leaves the
  // "filed / kept for you" lines room to land un-narrated, instead of printing the triad twice.
  function closeNote(sp) {
    if (sp.key === "pull") return "No question was set down, so nothing here repeats.";
    if (sp.key === "sitting") return "Three cards, kept in the order they fell.";
    return "Five cards, kept in full.";
  }
  function againLabel(sp) {
    if (sp.key === "pull") return "Another glance";
    if (sp.key === "sitting") return "New sitting";
    return "New reading";
  }

  function showClose(sp) {
    D.closingBlock.hidden = false;
    D.closing.textContent = closingLine(sp);
    D.closenote.textContent = closeNote(sp);
    if (sp.key !== "pull") {
      D.confidential.hidden = false;
      D.confidential.textContent = "Kept for you, and no one else.";
    } else {
      D.confidential.hidden = true;
    }
    // one-shot seal gesture — never re-fires on re-scroll
    if (!D.closingBlock.classList.contains("is-sealing")) {
      void D.closingBlock.offsetWidth;
      D.closingBlock.classList.add("is-sealing");
    }
  }
  function stampAccession(code, d) {
    D.accession.hidden = false;
    D.accession.innerHTML = '<span class="cap">Accession</span>' +
                            '<span class="code">' + esc(code) + '</span>' +
                            '<span class="filed">filed ' + esc(fmtDate(d)) + '</span>';
  }

  /* ---------------------------------------------------------------- new sitting / back */
  function resetToTiers() {
    if (history.replaceState) history.replaceState(null, "", location.pathname);
    STATE = { phase: "tier", tierKey: null, question: "", token: null, seed: null,
              drawn: [], revealed: 0, replay: false, paidRun: false, done: false };
    D.ceremony.setAttribute("hidden", "");
    D.tiers.removeAttribute("hidden");
    D.spread.innerHTML = "";
    D.reading.innerHTML = "";
    D.reading.className = "reading";
    D.stage.classList.remove("is-launched", "is-pull", "is-deep");
    D.glow.style.display = "";
    D.deck.style.display = "";

    D.intake.hidden = false;
    D.intake.classList.remove("is-locked");
    if (D.intakeLocked) D.intakeLocked.hidden = true;
    D.input.readOnly = false;
    D.input.removeAttribute("aria-readonly");
    D.input.classList.remove("is-locked", "is-silent");
    D.input.value = "";
    D.input.placeholder = DEFAULT_PLACEHOLDER;
    if (D.silence) D.silence.setAttribute("aria-pressed", "false");
    D.pullNote.hidden = true;

    D.controls.hidden = false;
    D.subline.hidden = false;
    D.reopen.hidden = true;
    D.pretierNav.hidden = true;
    D.descend.hidden = true;
    D.closingBlock.hidden = true;
    D.closingBlock.classList.remove("is-sealing");
    D.accession.hidden = true;                 // clear any prior stamp on the way back to the doors
    D.again.hidden = true;
    D.status.hidden = true;
    D.hint.hidden = true;
    if (D.spreadKey) D.spreadKey.hidden = true;
    clearSay();

    setMood("tier");
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
    D.again.addEventListener("click", resetToTiers);           // stage/reopen restart → the chooser
    // Close-block controls now lead to DIFFERENT places (no twin buttons to the same screen):
    // "New sitting/reading" re-enters the same tier fresh; "Back to the room" returns to the doors.
    D.againBottom.addEventListener("click", function () {
      var k = STATE.tierKey;
      if (k && SPREADS[k]) chooseTier(k); else resetToTiers();
    });
    D.backRoom.addEventListener("click", resetToTiers);
    D.backTier.addEventListener("click", resetToTiers);

    D.descendBtn.addEventListener("click", function () {
      // begin the descent at the head of the record — the question echo, then "THE READING" —
      // not mid-record at card one (falls through gracefully for the head-less pull tier)
      var target = $("[data-matter]", D.reading) || $(".reading-head", D.reading) || $("[data-read-item]", D.reading);
      if (target) target.scrollIntoView({ behavior: motionOK ? "smooth" : "auto", block: "start" });
    });

    D.input.addEventListener("input", function () {
      if (D.input.classList.contains("is-silent")) setSilent(false);
      STATE.question = D.input.value;
    });
    D.input.addEventListener("focus", function () {
      if (!D.input.readOnly && D.input.classList.contains("is-silent")) setSilent(false);
    });
    if (D.silence) D.silence.addEventListener("click", function () {
      setSilent(!D.input.classList.contains("is-silent"));
    });
    if (D.refresh) D.refresh.addEventListener("click", function () {
      chipOffset = (chipOffset + 3) % POOL.length;
      renderChips(chipOffset);
    });

    var t;
    window.addEventListener("resize", function () {
      clearTimeout(t);
      t = setTimeout(function () {
        if (STATE.phase === "ready" || STATE.phase === "shuffling" || STATE.phase === "shuffled") positionDeck();
      }, 120);
    });
  }

  /* ---------------------------------------------------------------- boot */
  function boot() {
    grab();
    if (motionOK) document.documentElement.classList.add("js-anim");  // gate arrival entrance
    initReadIO();
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
