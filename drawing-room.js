/* =============================================================
   THE DRAWING ROOM (?dev=drawing-room) — window.BRDrawingRoom

   The tarot room. Three tiers, all DETERMINISTIC (no AI):
     • THE PULL (first page, free, unlimited) — draw a single card to meet
       the deck. A showcase; not filed.
     • A SITTING (first is free — a repeat is $1.99) — a 3-card reading,
       FILED to the Shelf. Positions: The Ground / The Crossing / The Turn.
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
  /* ── BR-S314 — THE DECK WAS DEALING 10% REVERSED. ────────────────────────────
     This is FNV-1a, and the multiply has to be a 32-bit one. `h * 16777619` is a
     FLOAT multiply: for h near 2^32 the product reaches ~2^56, past the 2^53 where
     doubles still hold every integer, so the low bits are ROUNDED AWAY before the
     `>>> 0` ever sees them. Reversal is read off the lowest bit — `hash(seed+"o"+k)
     & 1` — which is precisely the bit that gets destroyed.
     MEASURED on the live formula, 600,000 draws: 10.18% Reversed against a canon
     50/50 (SPEC §3.3), and the damage is visible bit by bit — bit0 is set 13.0% of
     the time, bit1 17.9%, bit2 44.3%, and only from bit3 does it reach 50.1%. So
     nine cards in ten came up Upright, and every Reversed meaning written for this
     deck was very nearly unreachable. `Math.imul` is the 32-bit multiply this was
     always meant to be: same run, 50.26%.
     THIS CHANGES EVERY EXISTING SEED, and it has to. A `?read=` receipt made before
     today will replay a DIFFERENT reading after it — unavoidable, because the old
     seeds were computed with the broken multiply. Commerce here is mock and nothing
     is filed to a server, so the cost is a handful of dev links against a deck that
     otherwise stays 90% upright forever. It also makes tarot-v2's receipts and this
     room's agree for the first time; they were computing different numbers from the
     same seed (read~sitting~x~abc → 2082513329 here vs 3772232759 there). */
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h >>> 0; }
  function pick(list, seed) { return list && list.length ? list[hash(seed) % list.length] : null; }
  function norm(s) { return String(s == null ? "" : s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); }
  function inApp() { return /[?&]dev=/.test(location.search); }
  /* BR-S314 — TWO CUTS IN THE SAME MINUTE WERE THE SAME READING. The seal was
     minute-granular, and the seed is "read~<spread>~<normalised question>~<seal>" —
     so asking the same question twice inside one minute produced an identical seed,
     identical cards, and an identical BR accession code. For a room whose credo is
     "Drawn once. Not reissued." that is the worst possible collision: it reissues.
     A random suffix cannot collide. The seed STRING is unchanged in shape, so the
     receipt path, reopen(), and brCode() all keep working exactly as they were —
     only the recipe for `t` differs. Matches tarot-v2, which got this right. */
  function sealNow() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
  function brCode(seed) { return "BR-" + ("00000" + (hash(seed + "br") % 0xFFFFF).toString(16).toUpperCase()).slice(-5); }
  function param(k) { var m = new RegExp("[?&]" + k + "=([^&]*)").exec(location.search); return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : ""; }
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  function filedDate() { var d = new Date(); return d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear(); }
  function numeralOf(c) { return String((c && c.tag) || "").trim().split(/\s+/)[0] || ""; }
  function firstKw(c) { return (c && c.keywords && c.keywords[0]) || (c ? c.name : ""); }

  var DECK = [];            // full 78-card deck (Majors + Minors), from codex-data.json
  var HOST = null, SESSION = "s";

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
  /* ── BR-S316 — THE CARD YOU ARE DEALT IS THE CARD YOU WERE SHOWN. ────────────
     BR-S306 made the storefront and this room agree on COLOUR and stopped there.
     M1/M2's sample card had already been given the real face in BR-S289 — a
     TYPOGRAPHIC one, reproduced from tarot-v2 band for band — while the card this
     room actually deals stayed an engraved SVG plate wearing parchment paint. So
     the shelf and the counter still disagreed, one layer down: you were shown a
     card with a name and a rank, and dealt a card with a compass rose on it.
     This is the same face, third instance, from the same source of truth
     (tarot-v2/app.js#faceHTML → styles.css .m2face — head / name / rule / orient /
     two corner ticks). It is deliberately built BEFORE the ceremony: a ceremony is
     3.5 seconds of attention paid to a card, and it is not worth choreographing
     around a face we already know is wrong.
     THE HEADER DERIVES FROM `tag`, so no data changes and no new fields. Every one
     of the 78 entries is exactly regular — verified against codex-data.json:
       Majors  "XXI · Major Arcana"        → ARCANA · XXI
       Minors  "Ace · Wands · Fire"        → WANDS · FIRE
     Reversal is spoken by the orientation line, not by rotating the art — v2's
     faceHTML is the authority here and it does not spin the glyph. The ◆ is on
     EVERY card, per its own comment: it is the original card art. */
  /* The element rides its OWN span so CSS can drop it on a narrow card without a
     second render path. Measured: at 375px the spread deals 96px cards, leaving the
     meta ~62px, and "PENTACLES · EARTH" at 8.5px mono needs ~87px — it did not
     overflow, it WRAPPED, which a bounding-box check happily passes and a reader
     immediately sees as a broken two-line header. Suit alone fits; the element is
     the part a small card can afford to lose. */
  function faceHead(c) {
    var p = String((c && c.tag) || "").split("·");
    for (var i = 0; i < p.length; i++) p[i] = p[i].trim();
    if (p.length >= 3) {                                            // Minor: WANDS · FIRE
      return esc(p[1].toUpperCase()) + '<span class="dr-face__el"> &middot; ' + esc(p[2].toUpperCase()) + '</span>';
    }
    return "ARCANA &middot; " + esc(p[0] || "");                    // Major: ARCANA · XXI
  }
  function faceSVG(c, reversed) {
    var name = String((c && c.name) || "");
    return '<div class="dr-face">' +
      '<div class="dr-face__head">' +
        '<span class="dr-face__meta">' + faceHead(c) + '</span>' +   /* faceHead escapes its own parts — it returns markup */
        '<span class="dr-face__glyph" aria-hidden="true">&#9670;</span>' +
      '</div>' +
      '<div class="dr-face__name' + (name.length >= 13 ? " is-long" : "") + '">' + esc(name) + '</div>' +
      '<div class="dr-face__div" aria-hidden="true"></div>' +
      '<div class="dr-face__orient">' +
        (reversed ? 'Reversed<span class="dr-face__gloss">inward, not yet</span>' : 'Upright') +
      '</div>' +
      '<span class="dr-tick dr-tick--tl" aria-hidden="true"></span>' +
      '<span class="dr-tick dr-tick--br" aria-hidden="true"></span>' +
      '</div>';
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

  /* ── BR-S320 — THE FREE PULL TAKES THE STOREFRONT'S SHAPE. ───────────────────
     Builder's direction: give it M2's example-card arrangement — the card in the hero
     spot, the words beside it, and the control that changes the card directly under
     the card it changes.
     MIRRORED, DELIBERATELY. M2 runs text-left / card-right; this runs card-left /
     text-right. M2 is the shelf, where the words come first and the object is the
     proof; this is the counter, where the object IS the event and the words are what
     it turned out to mean. Same grammar, read in the direction each room actually
     works in.
     THE SPOT IS NEVER EMPTY. Before the first pull the card sits there face down
     rather than the whole hero being replaced by a line of invitation — so the button
     changes a card in front of you instead of conjuring a layout that was not there,
     and nothing jumps when you press it.
     The button belongs UNDER THE CARD because that is the thing it acts on. Beside the
     text it would read as a way to continue; beneath the card it reads as a way to
     change that card, which is exactly what it does. */
  /* BR-S321 — THE FREE PULL MOVED TO THE STOREFRONT, so this room stops offering it.
     M2's hero is a real card you pull now, which means a visitor meets the deck before
     they ever open this door — and keeping a second pull here would be the same feature
     in two places, drifting apart, which is precisely what the tarot-v2 graft exists to
     undo. So the Drawing Room becomes what its name always said: the room you enter to
     draw a READING. The landing is the two tiers and nothing else.
     The BR-S320 two-column pull layout is not lost — it is what M2's hero now is. */
  function landingHTML() {
    return '<div class="dr-landing">' +
      '<div class="dr-live" role="status" aria-live="polite" data-dr-live></div>' +
      '<section class="dr-tiers">' +
      '<p class="dr-tiers__label">Draw a reading — it is cut, and kept on your Shelf.</p>' +
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

  /* ── BR-S318 — THE DECK. ──────────────────────────────────────────────────────
     Seven layers, each nudged down-right and alternately tilted, each a shade darker
     than the one above, with a printed back on top and a soft pool of light beneath.
     Values are tarot-v2's renderDeck() verbatim — offset k*1.3 / k*1.7, the two hsl
     ramps, the alternating ±rotation — because the pile's whole job is to look like a
     stack of objects rather than a drop shadow, and that is a set of numbers somebody
     already tuned.
     BUILT AS A COMPONENT ON PURPOSE. It renders into the ceremony subtree, not into
     the intake, so the riffle, the cut and the deal all have the same deck to act on
     and none of them has to rebuild it. It is aria-hidden: a pile of card backs is
     scenery, and the controls beside it already say everything a screen reader needs. */
  function deckHTML() {
    var out = '<div class="dr-deck__glow" aria-hidden="true"></div><div class="dr-deck__body">';
    for (var k = 0; k < 7; k++) {
      out += '<div class="dr-deck__layer" style="transform:translate(' + (k * 1.3).toFixed(1) + 'px,' + (k * 1.7).toFixed(1) + 'px) rotate(' + (k % 2 ? 0.5 : -0.4) + 'deg);' +
        'background:linear-gradient(158deg,hsl(34 22% ' + (13 - k) + '%),hsl(32 20% ' + (8 - Math.min(k, 6)) + '%));"></div>';
    }
    return out + '</div><div class="dr-deck__top">' + backSVG() + '</div>';
  }

  /* ── BR-S319 — ONE CONTROL, AND ITS LABEL FOLLOWS THE PHASE. ─────────────────
     Question → SHUFFLE → CUT is now a real two-step, and it is one button, not two.
     tarot-v2's model, and the right one: a second button appearing beside the first
     asks the reader to choose between two things when the ceremony only ever offers
     one next move.
     The order is the decided spine — shuffle is preparatory, reversible and playful,
     so it is free and carries no price; the money rides the CUT, which is the moment
     of commitment. Which is why the price only appears on the button once the deck has
     been mixed: quoting it before there is anything to commit to would be asking for
     payment ahead of the decision it belongs to.
     It renders into its OWN region so a phase change can swap the control without
     re-rendering the intake around it — re-rendering the intake would take the typed
     question with it, which is the kind of thing that happens once and is never
     forgiven. */
  function controlHTML(sp, phase) {
    var paid = isPaidNow(sp.key);
    if (phase === "ready" || phase === "shuffling") {
      return '<button type="button" class="dr-cut" data-dr-shuffle' + (phase === "shuffling" ? " disabled" : "") + '>' +
        (phase === "shuffling" ? "Mixing&hellip;" : "Shuffle") + '</button>';
    }
    return '<button type="button" class="dr-cut' + (paid ? ' dr-cut--paid' : '') + '" data-dr-cut>Cut the deck' + (paid ? ' &middot; ' + sp.price : '') + '</button>';
  }

  /* ---------- a reading: intake -> shuffle -> cut -> spread reveal -> binding + filed ---------- */
  function intakeHTML(sp) {
    var paid = isPaidNow(sp.key);   // paid: the price rides the cut button; free: byte-identical to before
    return '<p class="dr-intake__which">' + esc(sp.title) + ' &middot; ' + sp.n + ' cards</p>' +
      '<label class="dr-field"><span class="dr-field__label">Lay a matter on the table <span class="dr-field__opt">— optional</span></span>' +
      '<input type="text" class="dr-field__in" data-dr-question maxlength="120" autocomplete="off" placeholder="a question, in your own words" ' +
      'aria-label="A question or situation. Optional. It is kept with your reading, and it does not choose the cards."></label>' +
      '<div class="dr-control" data-dr-control>' + controlHTML(sp, "ready") + '</div>' +
      '<p class="dr-cut__note">The cut does not choose the cards. It closes the question.</p>' +
      (paid ? '<p class="dr-mocknote">Dev mock &mdash; no real payment in this build.</p>' : '') +
      '<a class="dr-intake__back" href="#" data-dr-home>&larr; the deck</a>';   /* BR-S318: the .dr-intake wrapper is now the persistent [data-dr-intake] region in the flow shell — this returns its CONTENTS, so the cut can empty it without removing it */
  }

  /* ══ BR-S317 — THE CEREMONY SUBTREE. ══════════════════════════════════════════
     THE DEFECT, exactly. `turn()` used to add `.is-revealed` to a card and then, 720ms
     later, run `stage().innerHTML = readingHTML(STATE)` — rebuilding the ENTIRE reading,
     every card node included, on every single turn. Nothing here could ever be
     choreographed: a deal is a chain of transitions over nodes that must still exist
     when the next beat fires, and these nodes were being replaced mid-flight. That is
     why the ceremony was never portable from tarot-v2, and why copying its keyframes
     would have produced nothing but a flicker.

     THE FIX IS A BOUNDARY, NOT A REWRITE. The product-level machine is untouched —
     `landing → intake → reading` still lives in STATE.view and still renders by
     replacing markup, because none of it animates. Only ONE region becomes persistent:
     `.dr-spread`, the cards. It is built once (BR-S318 moved that build out to
     mountFlow(), at the intake) and from then on is MUTATED, never re-rendered. Everything outside it — the reads, the filed block, the
     matter line — keeps the old cheap discipline, which is correct for prose that has
     no motion to protect.

     Deliberately NOT tarot-v2's model. v2 converts the whole room to a `phase` machine;
     doing that here would put the entire product on the regression surface to buy
     something only the cards need. The subtree carries its own local phase instead, on
     `data-dr-phase`, so CSS and later steps have one place to hang:
       ready → shuffling → shuffled → committed → cutting → dealing → dealt → revealing
       → complete
     Only `dealt / revealing / complete` are reachable today. The deck, the riffle, the
     cut and the deal (INTEGRATION §3 steps 4-8) plug into the earlier ones without
     touching this boundary again — which is the whole point of drawing it now.

     ONE MARKUP CONSEQUENCE, and it is an improvement. A turned card used to have its
     <button> REMOVED and the plain card put back in its place — a node swap, i.e. the
     same defect in miniature. The button now stays for the life of the reading and is
     marked aria-disabled instead, so DOM identity holds, keyboard order does not
     reshuffle under someone mid-reading, and focus survives a turn. */
  var CEREMONY = { el: null, spread: null, phase: "" };
  function ceremonyPhase(p) {
    CEREMONY.phase = p;
    if (CEREMONY.el) CEREMONY.el.setAttribute("data-dr-phase", p);
  }
  function faceDownLabel(sp, i) {
    return esc(sp.positions[i]) + ", card " + (i + 1) + " of " + sp.n + ", face down. Press to turn it.";
  }
  function faceUpLabel(sp, st, i) {
    var d = st.drawn[i];
    return esc(sp.positions[i]) + ", " + esc(d.card.name) + ", " + (d.reversed ? "reversed" : "upright") + ". Turned.";
  }
  function cardHTML(d) {
    return '<div class="dr-card">' +
      '<div class="dr-cardface dr-cardface--back">' + backSVG() + '</div>' +
      '<div class="dr-cardface dr-cardface--front">' + faceSVG(d.card, d.reversed) + '</div></div>';
  }
  /* built ONCE per reading; after this the nodes are only ever mutated */
  function spreadHTML(st) {
    var sp = SPREADS[st.spread], out = "", i;
    for (i = 0; i < sp.n; i++) {
      out += '<div class="dr-slot" data-dr-slot="' + i + '">' +
        '<span class="dr-slot__pos">' + esc(sp.positions[i]) + '</span>' +
        '<button type="button" class="dr-cardbtn" data-dr-turn="' + i + '" aria-label="' + faceDownLabel(sp, i) + '">' +
        cardHTML(st.drawn[i]) + '</button></div>';
    }
    return out;
  }
  /* the ONE place a card is turned face up — used by a live turn and by a reopened
     receipt alike, so the two can never drift into different DOM */
  function applyShown(st, i) {
    if (!CEREMONY.spread) return;
    var sp = SPREADS[st.spread];
    var slot = CEREMONY.spread.querySelector('[data-dr-slot="' + i + '"]');
    if (!slot) return;
    slot.classList.add("is-shown");
    var card = slot.querySelector(".dr-card");
    if (card) card.classList.add("is-revealed");
    var btn = slot.querySelector("[data-dr-turn]");
    if (btn) { btn.setAttribute("aria-disabled", "true"); btn.setAttribute("aria-label", faceUpLabel(sp, st, i)); }
  }

  function readsHTML(st) {
    var sp = SPREADS[st.spread], out = "", i;
    for (i = 0; i < sp.n; i++) {
      if (!st.drawn[i].shown) continue;
      var c = st.drawn[i].card, rev = st.drawn[i].reversed;
      out += '<div class="dr-read"><p class="dr-read__pos">' + esc(sp.positions[i]) + ' <span class="dr-read__posn">— ' + esc(sp.notes[i]) + '</span></p>' +
        '<h3 class="dr-read__name">' + esc(c.name) + '<span class="dr-read__orient">' + (rev ? "Reversed" : "Upright") + '</span></h3>' +
        '<p class="dr-read__mean">' + esc((rev && c.reversed) ? c.reversed : c.meaning) + '</p></div>';
    }
    return out;
  }
  function tailHTML(st) {
    var sp = SPREADS[st.spread];
    if (st.revealed < sp.n) return '<p class="dr-draw__cue">Turn each card.</p><a class="dr-intake__back" href="#" data-dr-home>&larr; the deck</a>';
    return '<div class="dr-filed" data-dr-filed>' +
      '<p class="dr-binding">' + esc(bindingLine(sp, st.drawn)) + '</p>' +
      '<p class="dr-read__frame">Drawn to the matter you laid down — a reflection to sit with, not a forecast.</p>' +
      '<div class="dr-stamp">' + hallmarkSVG(st.seed) +
      '<p class="dr-filed__line">Filed to your Shelf &middot; ' + esc(brCode(st.seed)) + ' &middot; ' + esc(filedDate()) + '</p></div>' +
      '<p class="dr-credo">Drawn once. Not reissued.</p>' +
      '<a class="pf-openreading pf-openreading--lg" href="#" data-door="profile">Open your Shelf &rarr;</a>' +
      '<a class="dr-intake__back" href="#" data-dr-home>&larr; the deck</a></div>';
  }
  /* ── BR-S318 — THE SUBTREE NOW SPANS THE WHOLE FLOW, intake included. ─────────
     BR-S317 made the CARDS persistent and stopped there, because that was all the
     turn needed. Putting a deck on the intake exposed the next seam immediately: the
     intake was still a view that gets torn down at the cut, so a deck rendered there
     would be destroyed at exactly the moment the deal needs to travel OUT of it. The
     cards would have had somewhere to land and nothing to leave from.
     So the boundary moves out one ring. ONE shell — `.dr-flow` — is rendered when a
     reading is chosen, and it holds the ceremony (deck + spread) plus four regions
     that may be refilled freely: the matter line, the intake prose, the reads, and
     the tail. The cut no longer replaces anything; it empties the intake region and
     fills the spread. The ceremony subtree is created once, at `startReading`, and
     the same nodes are still there when the last card is turned.
     This is the same lesson as S317 taken one step earlier, and it is cheaper to take
     now than to discover again at the deal. */
  function flowShellHTML(st) {
    var sp = SPREADS[st.spread];
    return '<div class="dr-flow">' +
      '<p class="dr-reading__matter" data-dr-matter hidden></p>' +
      '<div class="dr-ceremony" data-dr-ceremony data-dr-phase="">' +
        '<div class="dr-deck" data-dr-deck aria-hidden="true">' + deckHTML() + '</div>' +
        '<div class="dr-spread dr-spread--' + sp.n + '" data-dr-spread></div>' +
      '</div>' +
      '<div class="dr-intake" data-dr-intake></div>' +
      '<div class="dr-reads" data-dr-reads></div>' +
      '<div class="dr-tail" data-dr-tail></div>' +
      '<div class="dr-live" role="status" aria-live="assertive" data-dr-live></div></div>';
  }
  function setMatter(st) {
    var m = stage().querySelector("[data-dr-matter]");
    if (!m) return;
    if (st.question) { m.textContent = "Drawn to: “" + st.question + "”"; m.hidden = false; }
    else { m.textContent = ""; m.hidden = true; }
  }
  function refreshReads(st) {
    var r = stage().querySelector("[data-dr-reads]"), t = stage().querySelector("[data-dr-tail]");
    if (r) r.innerHTML = readsHTML(st);
    if (t) t.innerHTML = tailHTML(st);
  }
  /* built ONCE, when a reading is chosen. The deck is on the table from here on and
     the same nodes carry through the cut, the deal and the last turn. */
  function mountFlow(st) {
    stage().innerHTML = flowShellHTML(st);
    CEREMONY.el = stage().querySelector("[data-dr-ceremony]");
    CEREMONY.spread = stage().querySelector("[data-dr-spread]");
    ceremonyPhase("ready");
  }
  /* the cards come onto the table — a fresh cut and a reopened receipt share this, so
     there is exactly one way a spread appears */
  function laySpread(st) {
    var sp = SPREADS[st.spread], i;
    if (!CEREMONY.spread) return;
    CEREMONY.spread.innerHTML = spreadHTML(st);
    for (i = 0; i < sp.n; i++) if (st.drawn[i].shown) applyShown(st, i);
    ceremonyPhase(st.revealed >= sp.n ? "complete" : "dealt");
  }
  function closeIntake() {
    var el = stage().querySelector("[data-dr-intake]");
    if (el) el.innerHTML = "";       // emptied, never removed — the region outlives the prose in it
  }

  /* ---------- flow ---------- */
  var STATE = { view: "landing", spread: null, question: "", seed: "", drawn: [], revealed: 0 };
  function stage() { return HOST.querySelector("[data-dr-stage]"); }
  function announce(m) { var l = HOST.querySelector("[data-dr-live]"); if (l) l.textContent = m; }
  function firstSentence(s) { var m = String(s || "").match(/^[^.]+\./); return m ? m[0] : String(s || ""); }

  function showLanding() { STATE.view = "landing"; stage().innerHTML = landingHTML(); if (inApp() && history.replaceState) history.replaceState(null, "", "?dev=drawing-room"); }
  function startReading(key) {
    STATE.view = "intake"; STATE.spread = key;
    STATE.drawn = []; STATE.revealed = 0; STATE.question = ""; STATE.seed = "";
    mountFlow(STATE);                                   // BR-S318: the deck arrives HERE and stays
    stage().querySelector("[data-dr-intake]").innerHTML = intakeHTML(SPREADS[key]);
    var f = HOST.querySelector("[data-dr-question]"); if (f) f.focus();
  }
  function doCut() {
    var sp = SPREADS[STATE.spread];
    STATE.question = (((HOST.querySelector("[data-dr-question]") || {}).value) || "").trim();   // whitespace-only must not render `Drawn to: "   "` or pollute the reopen URL (norm() already trims the seed)
    var t = sealNow();
    STATE.seed = "read~" + sp.key + "~" + norm(STATE.question) + "~" + t;
    if (sp.key === "sitting") { try { localStorage.setItem("br_dr_sitting_used", "1"); } catch (e) {} }   // the cut consumes the free sitting — the cut closes the question
    STATE.drawn = drawSpread(STATE.seed, sp.n).map(function (d) { d.shown = false; return d; });
    STATE.revealed = 0; STATE.view = "reading";
    if (inApp() && history.replaceState) history.replaceState(null, "", "?dev=drawing-room&read=" + sp.key + "&t=" + encodeURIComponent(t) + (STATE.question ? "&q=" + encodeURIComponent(STATE.question) : ""));
    /* BR-S318: nothing is replaced here any more. The intake prose is emptied out of a
       region that stays, the cards are laid into the spread that was always there, and
       the deck the reader has been looking at is the deck they just cut. */
    setMatter(STATE);
    closeIntake();
    laySpread(STATE);
    refreshReads(STATE);
  }
  function setControl() {
    var el = stage().querySelector("[data-dr-control]");
    if (el) el.innerHTML = controlHTML(SPREADS[STATE.spread], CEREMONY.phase);
  }
  /* ── BR-S319 — THE RIFFLE. ───────────────────────────────────────────────────
     The deck is mixed: the stack jitters and squashes through six stops while the top
     card flicks harder and further over the same 820ms, so the pile reads as many
     things moving against each other rather than one block wobbling. Keyframes and
     timing are tarot-v2's verbatim — this is a feel that was tuned once, and re-tuning
     it by eye through a preview pane that cannot even run it would be vandalism.
     NOTHING IS DRAWN HERE. Shuffling touches no seed, mints no token and consumes no
     free sitting; it is the one step of the ceremony you may take and walk away from,
     which is exactly why the price is not on it. The deck may be mixed again — it costs
     nothing and changes nothing — but not while it is already mixing.
     The back link stays VISIBLE and stops being operable for the 820ms, per v2: an
     escape that vanishes mid-ceremony is worse than one that waits. */
  var SHUFFLING = false;
  function shuffle() {
    if (SHUFFLING || STATE.view !== "intake") return;
    SHUFFLING = true;
    ceremonyPhase("shuffling");
    setControl();
    announce("Mixing.");
    var reduce = window.matchMedia && (window.BRMotion ? window.BRMotion.prefersReduced() : window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    var deck = stage().querySelector("[data-dr-deck]");
    if (deck && !reduce) deck.classList.add("is-riffling");
    setTimeout(function () {
      if (deck) deck.classList.remove("is-riffling");
      SHUFFLING = false;
      if (STATE.view !== "intake") return;      // walked away mid-shuffle — leave the flow alone
      ceremonyPhase("shuffled");
      setControl();
      announce("Mixed. Cut when you are ready.");
    }, reduce ? 150 : 820);                     // v2's own pair: the full riffle, or a beat that only marks the step
  }

  function cut() {
    var sp = SPREADS[STATE.spread];
    if (SHUFFLING) return;                      // the deck is still moving; the cut is not offered yet
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
    STATE.drawn[i].shown = true; STATE.revealed++;
    var sp = SPREADS[STATE.spread], c = STATE.drawn[i].card, rev = STATE.drawn[i].reversed;
    var msg = sp.positions[i] + ": " + c.name + ", " + (rev ? "reversed" : "upright") + ". " + firstSentence((rev && c.reversed) ? c.reversed : c.meaning);
    if (STATE.revealed >= sp.n) msg += " Filed to your Shelf, " + brCode(STATE.seed) + ".";
    /* BR-S317: the flip happens on the node that is already there and STAYS there. The
       spread is never re-rendered — only the prose below it is, and only after the flip
       has had its 720ms. Previously this line was followed by a full teardown of every
       card on the table, which is the reason no ceremony could live here. */
    applyShown(STATE, i);
    ceremonyPhase(STATE.revealed >= sp.n ? "complete" : "revealing");
    var reduce = window.matchMedia && (window.BRMotion ? window.BRMotion.prefersReduced() : window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    var done = function () { refreshReads(STATE); announce(msg); };
    if (reduce) done(); else setTimeout(done, 720);
  }
  function reopen() {
    // a filed reading is already drawn and settled — its URL is the receipt; never gate here.
    var key = param("read"), t = param("t"); if (!SPREADS[key] || !t) return false;
    var sp = SPREADS[key];
    STATE.spread = key; STATE.question = param("q"); STATE.seed = "read~" + key + "~" + norm(STATE.question) + "~" + t;
    STATE.drawn = drawSpread(STATE.seed, sp.n).map(function (d) { d.shown = true; return d; });
    STATE.revealed = sp.n; STATE.view = "reading";
    mountFlow(STATE); setMatter(STATE); closeIntake(); laySpread(STATE); refreshReads(STATE);   // a receipt arrives already cut: same path, no intake
    return true;
  }

  function wire(root) {
    root.addEventListener("click", function (ev) {
      var el = ev.target.closest("[data-door],[data-dr-read],[data-dr-shuffle],[data-dr-cut],[data-dr-turn],[data-dr-home]");
      if (!el) return;
      ev.preventDefault();
      if (SHUFFLING && el.hasAttribute("data-dr-home")) return;   // BR-S319: the escape stays visible but waits out the 820ms
      if (el.hasAttribute("data-door")) { var d = el.getAttribute("data-door"); if (inApp()) location.href = d === "profile" ? "?dev=profile" : location.pathname; return; }
      if (el.hasAttribute("data-dr-read")) return startReading(el.getAttribute("data-dr-read"));
      if (el.hasAttribute("data-dr-shuffle")) return shuffle();
      if (el.hasAttribute("data-dr-cut")) return cut();
      if (el.hasAttribute("data-dr-turn")) return turn(+el.getAttribute("data-dr-turn"));
      if (el.hasAttribute("data-dr-home")) return showLanding();
    });
    root.addEventListener("keydown", function (ev) { if ((ev.key === "Enter" || ev.key === " ") && ev.target.closest("[data-dr-turn]")) { ev.preventDefault(); turn(+ev.target.closest("[data-dr-turn]").getAttribute("data-dr-turn")); } });
  }

  window.BRDrawingRoom = {
    mount: function (host) {
      if (!host) return;
      HOST = host; SESSION = sealNow();
      host.innerHTML = shellOpen() + '<p class="dr-loading">Opening the room…</p>' + shellClose();
      wire(host);
      fetch("codex-data.json?v=208").then(function (r) { return r.text(); }).then(function (txt) {
        var codex = JSON.parse(txt);
        DECK = codex.filter(function (s) { return /tarot|minor arcana/i.test(String(s.system || "")); }).reduce(function (a, s) { return a.concat(s.entries || []); }, []);
        if (!reopen()) showLanding();   // BR-S321: &pull=1 retired with the M2 door that sent it — the storefront pulls its own card now
      }).catch(function () { var st = host.querySelector("[data-dr-stage]"); if (st) st.innerHTML = '<p class="dr-loading">The deck could not be reached. (Standalone preview.)</p>'; });
    }
  };
})();
