/* =============================================================
   SETTINGS (?dev=settings) — window.BRSettings

   A self-contained module mounted into #devView by app.js's mountDev(),
   cloned from the arcana-profile.js pattern: it reuses the profile's
   .pf-* document surface wholesale and adds only a small .st-* addendum
   (settings.css) for the genuinely new UI — the tab strip, the segmented
   Motion control, the setting rows, and the boring-page document + jump-rail.

   TWO top-level tabs, client-side toggled, no reload, no URL param:
     · "Settings"      — the REAL controls only (nothing fake):
         Motion (Match device / Reduced / Full, via window.BRMotion),
         a locked-honest Appearance row, Restore the free Sitting,
         Reset the Shelf (inline confirm), and a read-only local ledger
         of the four real marks on file.
     · "About & Legal" — the mandated boring page as ONE scrolling
         document with a sticky six-section jump-rail.

   Grounded in verified repo reality — exactly four real localStorage
   records (br_holdings, br_has_reading, br_dr_sitting_used, br_concord~*),
   an in-memory-only staged draft, and the only two real external calls the
   app makes (Google Fonts + the Codex's dictionary lookup), disclosed
   truthfully. Every read/write is fail-open (try/caught). Owns its own
   delegated click/keydown listeners; never touches app.js routing or state.

   BR-S352: the draft hooks this header used to advertise were never wired by
   app.js, so the control they fed could only ever say "nothing staged" — including
   to a reader who had just staged something. Both the hooks and the control are
   gone; the row states the truth instead (page memory, cleared by a reload).
============================================================= */
(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function plural(n, one, many) { return n + " " + (n === 1 ? one : many); }

  /* ---- localStorage helpers (all fail-open, per storage-blocked resilience) ---- */
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsRemove(k) { try { localStorage.removeItem(k); } catch (e) {} }
  function concordKeys() {
    var out = [];
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf("br_concord~") === 0) out.push(k);
      }
    } catch (e) {}
    return out;
  }

  /* ---- Motion bridge — window.BRMotion is assumed global; guarded so the
         control degrades to a disabled, honest state if it is absent. ---- */
  function motionAvailable() {
    return !!(window.BRMotion && typeof window.BRMotion.get === "function" && typeof window.BRMotion.set === "function");
  }
  function motionGet() {
    try { if (motionAvailable()) return window.BRMotion.get() || "system"; } catch (e) {}
    return "system";
  }
  function motionSet(v) { try { if (motionAvailable()) window.BRMotion.set(v); } catch (e) {} }
  function prefersReduced() {
    try { if (window.BRMotion && typeof window.BRMotion.prefersReduced === "function") return window.BRMotion.prefersReduced(); } catch (e) {}
    try { return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch (e) {}
    return false;
  }


  /* =========================================================
     HEADER — cloned .pf-top: wordmark (→ Main Menu) + a quiet
     right link (→ Your Profile). Both carry data-door.

     BR-S310: the wordmark was the ONLY way back, and the one other link in this
     header goes FORWARD — so a reader who arrived here from the orbit or the pill
     saw a page with no exit on it. Same defect the Profile had and the same fix:
     a labelled control on the same data-door, grouped left with the wordmark so
     the forward link keeps the right edge to itself.
  ========================================================= */
  function headerHTML() {
    return '<header class="pf-top">' +
      '<span class="st-topleft">' +
        '<a class="pf-wordmark" href="#" data-door="menu" aria-label="Main Menu" title="Main Menu">' +
          '<span class="pf-wordmark__mark" aria-hidden="true">&#9670;</span> Blue&nbsp;Room</a>' +
        '<a class="pf-back pf-back--top" href="#" data-door="menu">&larr; Main Menu</a>' +
      '</span>' +
      '<a class="st-toplink" href="?dev=profile" data-door="profile">Your Profile <span aria-hidden="true">&rarr;</span></a>' +
    '</header>';
  }

  /* =========================================================
     TAB 1 — "Settings": the real controls only.
  ========================================================= */

  /* Motion — a 3-way segmented control with radiogroup semantics. */
  function motionSegHTML() {
    var cur = motionGet(), avail = motionAvailable();
    var opts = [["system", "Match device"], ["reduced", "Reduced"], ["full", "Full"]];
    var body = opts.map(function (o) {
      var on = cur === o[0];
      return '<button type="button" class="st-seg__opt' + (on ? " is-on" : "") + '" role="radio" ' +
        'aria-checked="' + (on ? "true" : "false") + '" tabindex="' + (on ? "0" : "-1") + '" ' +
        'data-motion-val="' + o[0] + '"' + (avail ? "" : " disabled") + '>' + esc(o[1]) + '</button>';
    }).join("");
    return '<div class="st-seg" role="radiogroup" aria-label="Motion">' + body + '</div>';
  }

  /* ── BR-S337 — THREE NAMED ZONES. ────────────────────────────────────────────
     The Settings tab was a flat run of three sections with nothing saying what kind
     of thing each one was, so "Motion" (how the room behaves), "Reset the Shelf"
     (what this browser is holding) and the free Sitting (what the archive gives away)
     all sat at the same weight, in the same voice, one after another. They are three
     different KINDS of setting and the page never said so.
     Named: The Room · On This Device · The Free Half. The zone carries the h2 and the
     old section headings step down to h3, so the outline finally matches the page. */
  function zone(id, mark, name, lede, body) {
    return '<section class="st-zone" id="' + id + '" aria-labelledby="' + id + '-h">' +
      '<header class="st-zone__head">' +
        '<span class="st-zone__mark" aria-hidden="true">' + mark + '</span>' +
        '<h2 class="st-zone__h" id="' + id + '-h">' + esc(name) + '</h2>' +
        '<p class="st-zone__lede">' + lede + '</p>' +
      '</header>' +
      '<div class="st-zone__body">' + body + '</div>' +
    '</section>';
  }

  function motionSecHTML() {
    var note = motionAvailable()
      ? "Match device follows your system's reduced-motion setting. Reduced dims the archive's animated reveals — cards turning, the crown's slow glow, sections lighting as you scroll; Full keeps them. Stored on this device only — clearing your browser data returns this to Match device."
      : "Motion cannot be adjusted in this build — the archive is following your system's reduced-motion setting.";
    return '<section class="pf-sec st-sec">' +
      '<h3 class="pf-sec__h">Motion</h3>' +
      '<p class="pf-lede">Blue Room’s animations can be dimmed here, or left full — whichever reads easier.</p>' +
      motionSegHTML() +
      '<p class="st-note">' + esc(note) + '</p>' +
    '</section>';
  }

  /* Appearance — an honest, locked single option. The heading and the
     explanation stay in the accessible tree; only the inert segment is
     marked aria-disabled (nothing meaningful is aria-hidden). */
  function appearanceSecHTML() {
    return '<section class="pf-sec st-sec">' +
      '<h3 class="pf-sec__h">Appearance</h3>' +
      '<p class="pf-lede">The archive is built for one register — dark ground, warm ink. A light register has not been built.</p>' +
      '<div class="st-seg st-seg--locked" role="radiogroup" aria-label="Appearance" aria-disabled="true">' +
        '<span class="st-seg__opt st-seg__opt--locked is-on" role="radio" aria-checked="true" aria-disabled="true" tabindex="-1">Dark &middot; Archive</span>' +
      '</div>' +
      '<p class="st-note">A working light-and-dark switch would be theatre — there is no second palette behind it — so it is shown honestly locked rather than faked.</p>' +
    '</section>';
  }

  /* Your Profile — the three real actions + the read-only ledger.
     Re-rendered in place after Restore / Clear so the ledger stays true;
     opts carries a one-shot confirmation line after an action. */
  function ledgerRow(label, value, set) {
    return '<div class="st-ledger__row">' +
      '<span class="st-ledger__k">' + esc(label) + '</span>' +
      '<span class="st-ledger__v' + (set ? " is-set" : "") + '">' + esc(value) + '</span>' +
    '</div>';
  }

  function ctrlRow(title, desc, btnHTML, danger) {
    return '<div class="st-ctrl' + (danger ? " st-ctrl--danger" : "") + '">' +
      '<div class="st-ctrl__txt">' +
        '<p class="st-ctrl__t">' + esc(title) + '</p>' +
        '<p class="st-ctrl__d">' + esc(desc) + '</p>' +
      '</div>' +
      '<div class="st-ctrl__act">' + btnHTML + '</div>' +
    '</div>';
  }

  /* ── BR-S337 — THE FREE HALF IS ITS OWN ZONE. ────────────────────────────────
     "Restore the free Sitting" was filed under the device's storage controls, next
     to Reset, because restoring it happens to be a localStorage delete. That is an
     implementation detail standing in for a meaning: what the reader is doing there
     is taking back something the archive gives away, not managing storage.
     Half of Blue Room costs nothing and always will. That is a promise the settings
     page is a good place to make plainly — and it is the honest place to put the
     donation, because it is asked for beside what is given, not beside a price. */
  function freeHalfInner(opts) {
    opts = opts || {};
    var sittingUsed = lsGet("br_dr_sitting_used") === "1";
    var restoreBtn, restoreDesc;
    if (opts.restored) {
      restoreBtn = '<button type="button" class="st-btn" disabled>Restored</button>';
      restoreDesc = "Restored — your next Sitting is free again.";
    } else if (sittingUsed) {
      restoreBtn = '<button type="button" class="st-btn" data-act="restore-sitting">Restore</button>';
      restoreDesc = "You’ve used your one free Sitting; restoring makes the next one free again.";
    } else {
      restoreBtn = '<button type="button" class="st-btn" disabled>Nothing to restore</button>';
      restoreDesc = "Your free Sitting is still waiting — nothing to restore.";
    }
    return '<h3 class="pf-sec__h">Always open, always free</h3>' +
      '<p class="pf-lede">These are not a trial and they do not expire.</p>' +
      '<ul class="st-free">' +
        '<li><b>The Codex</b> — every card, sign, number, rune, trigram and hexagram the archive knows.</li>' +
        '<li><b>The Pull</b> — one card, cut to a question, as often as you like.</li>' +
        '<li><b>A Sitting</b> — three cards to one question, once.</li>' +
        '<li><b>The Free Pull card</b> — a complete card front from your photograph, sealed at the back.</li>' +
      '</ul>' +
      ctrlRow("Restore the free Sitting", restoreDesc, restoreBtn, false) +
      donationHTML();
  }

  /* THE PASSAGE. Honest by construction: DONATE_URL is empty in this build, so the
     block renders an inert, stated "no way to give is connected" rather than a button
     that goes nowhere — the same precedent as the honestly-locked Appearance row. Set
     the constant to a real address and the block becomes a live door with no other
     change. A donate button that silently does nothing would be exactly the theatre
     this page spends six sections promising it does not do. */
  var DONATE_URL = "";
  function donationHTML() {
    var act = DONATE_URL
      ? '<a class="st-btn st-btn--give" href="' + esc(DONATE_URL) + '" target="_blank" rel="noopener noreferrer">Keep the candle lit</a>'
      : '<span class="st-give__inert">No way to give is connected in this build.</span>';
    return '<div class="st-give">' +
      '<p class="st-give__passage">Blue Room is one person’s archive, kept in the open. The candle stays lit ' +
        'whether or not anyone pays for it — the Codex does not close, and the free half stays free. ' +
        'If it has been worth something to you, that is already the whole of it.</p>' +
      '<div class="st-give__act">' + act + '</div>' +
    '</div>';
  }

  function deviceInner(opts) {
    opts = opts || {};
    var shelf = lsGet("br_holdings") === "1";
    var keyed = lsGet("br_has_reading") === "1";
    var sittingUsed = lsGet("br_dr_sitting_used") === "1";
    var concords = concordKeys().length;

    /* ── BR-S352 — A CONTROL THAT COULD ONLY EVER SAY ONE THING. ──────────────
       This row asked `window.BRSettings._hasDraft`, and app.js NEVER ASSIGNS IT —
       the staged photo lives in a module-scope `let draft = null` that nothing
       outside that closure can see. So `hasDraft()` returned false always: the
       button was permanently dead, and a reader who had just staged a photo was
       told, in writing, that none was staged. A false statement produced by a
       hook that was specified and then never wired.
       Rather than reach into app.js for a state this page does not need, the row
       becomes the true sentence: the draft is page memory, and reloading clears
       it. Nothing to press, nothing to lie about. "Session" goes with it — the
       reader's word for that is "reloading the page". */
    var draftDesc = "A photo you stage lives in this page's memory only. It never leaves the device, and reloading the page clears it.";

    /* Reset the Shelf (destructive, inline confirm)
       BR-S352: with an empty ledger this offered a live destructive control whose
       confirm then read "This clears 0 marks and 0 sealed Concords. This can't be
       undone." — a warning about destroying nothing, which teaches a reader to
       disbelieve the next one. Its two neighbours already render a disabled honest
       state when there is nothing to act on; this now does the same. */
    var nothingOnFile = !shelf && !keyed && !sittingUsed && !concords;
    var resetBtn = nothingOnFile
      ? '<button type="button" class="st-btn" disabled>Nothing on file</button>'
      : '<button type="button" class="st-btn st-btn--danger" data-act="reset-open" aria-expanded="false" aria-controls="st-confirm">Reset&hellip;</button>';
    var confirm = '<div class="st-confirm" id="st-confirm" role="alertdialog" aria-label="Confirm reset" aria-describedby="st-confirm-text" hidden>' +
      '<p class="st-confirm__t" id="st-confirm-text">This clears the marks on this browser. This can’t be undone.</p>' +
      '<div class="st-confirm__row">' +
        '<button type="button" class="st-btn" data-act="reset-cancel">Cancel</button>' +
        '<button type="button" class="st-btn st-btn--danger" data-act="reset-confirm">Reset the Shelf</button>' +
      '</div>' +
    '</div>';

    var ledger = '<div class="st-ledger" aria-label="On file in this browser">' +
      '<p class="st-ledger__h">On file, right now</p>' +
      ledgerRow("Your Profile", shelf ? "Open" : "Closed", shelf) +   /* BR-S387: the link goes to the PAGE; the Shelf is the region inside it */
      ledgerRow("First-reading key", keyed ? "Turned" : "Not yet turned", keyed) +
      ledgerRow("Free Sitting", sittingUsed ? "Used" : "Available", sittingUsed) +
      ledgerRow("Sealed Concords", concords ? concords + " on file" : "None on file", concords > 0) +
    '</div>';

    /* The zone header above this now says "everything Blue Room is holding in this
       browser, and the controls to clear it" — this section's old lede said the same
       sentence again, four lines down. One of them had to go and it is the lower one. */
    return '<h3 class="pf-sec__h">On file, and how to clear it</h3>' +
      ctrlRow("The staged photo", draftDesc, "", false) +
      ctrlRow("Reset the Shelf",
        nothingOnFile
          ? "Nothing is on file in this browser — nothing to reset."
          : "Returns the archive to its first day — the open shelf, the first-reading key, the free Sitting, and every sealed Concord. Nothing is stored anywhere else, so there is nothing else to reset.",
        resetBtn, !nothingOnFile) +
      confirm +
      ledger;
  }

  function controlsPanelHTML() {
    return '<div class="st-panel" role="tabpanel" id="st-panel-controls" data-tab="controls" aria-labelledby="st-tab-controls" tabindex="0">' +
      zone("st-zone-room", "&#9670;", "The Room",
        "How the archive behaves while you are in it. Kept on this device.",
        motionSecHTML() + appearanceSecHTML()) +
      zone("st-zone-device", "&#9671;", "On This Device",
        "Everything Blue Room is holding in this browser, and the controls to clear it. Nothing here reaches beyond it.",
        '<section class="pf-sec st-sec" id="st-reliquary">' + deviceInner({}) + "</section>") +
      zone("st-zone-free", "&#10022;", "The Free Half",
        "What the archive gives away, and what it asks — which is nothing.",
        '<section class="pf-sec st-sec" id="st-freehalf">' + freeHalfInner({}) + "</section>") +
    '</div>';
  }

  /* =========================================================
     TAB 2 — "About & Legal": the boring page, ONE document,
     six sections, sticky jump-rail. All copy final.
  ========================================================= */

  /* small copy helpers */
  function p(text) { return '<p class="st-p">' + text + '</p>'; }
  function lead(head, text) { return '<p class="st-p"><b class="st-lead">' + head + '</b> ' + text + '</p>'; }
  function list(items) { return '<ul class="st-list">' + items.map(function (i) { return '<li>' + i + '</li>'; }).join("") + '</ul>'; }
  function romanList(items) { return '<ul class="st-romanlist">' + items.map(function (i) { return '<li>' + i + '</li>'; }).join("") + '</ul>'; }
  function romanItem(mark, text) { return '<b class="st-roman">' + mark + '</b> — ' + text; }

  /* ── BR-S337 — THE LEGAL PAGE GETS AN ADDRESS (ATLAS #12). ───────────────────
     About & Legal was a client-side tab: it could not be linked to, and a refresh
     threw the reader back to the controls. For a privacy and legal surface that is a
     defect, not a style choice — you cannot point anyone at terms you cannot link.
     Two addresses now, both real and both survive a reload:
       ?dev=settings&p=legal            the document, from the top
       ?dev=settings&p=legal#st-doc-privacy   a named section of it
     The section ids are PREFIXED. `about` was already spoken for — it is U1's hash on
     the menu (`/#about`, app.js U1_HASH) — and two different pages answering to the
     same fragment is how a boot-seat starts seating the wrong room. */
  function docId(key) { return "st-doc-" + key; }
  function docSec(id, tab, title, lede, body) {
    return '<section class="pf-sec st-doc__sec" data-key="' + id + '" id="' + docId(id) + '">' +
      '<span class="pf-sec__h" aria-hidden="true">' + tab + '</span>' +
      '<h2 class="st-doc__title" tabindex="-1">' + title + '</h2>' +
      '<p class="pf-lede st-doc__lede">' + lede + '</p>' +
      '<div class="st-doc__body">' + body + '</div>' +
    '</section>';
  }

  function secAbout() {
    var body =
      /* BR-S484: this promised a shelf that holds readings. Nothing in the tree
         writes reading content — the corrected accounting already sat 27 lines
         below in "What is filed", and this paragraph contradicted it on the
         page a visitor reads first. The link IS the record; say that instead. */
      p("Blue Room draws the readings and develops the cards. Each record lives at its own link — keep the link and it reopens exactly as it fell. Come down slowly; the light stays on while you read your way into what you did not know was here.") +
      p("This archive holds five rooms.") +
      romanList([
        romanItem("I &middot; The Codex", "the whole archive of meanings, free and always open: seventy-eight tarot cards, plus seven further systems — the Western zodiac, the Chinese zodiac, numerology, runes, trigrams, I-Ching hexagrams, and the Blue Room lexicon of its own instruments."),
        romanItem("II &middot; Tarot Divination", "cut the full deck to a question: the Pull (one card), a Sitting (three cards), or the Deep Read (five cards). What falls is read and filed. Drawn once. Not reissued."),
        romanItem("III &middot; The Birth Reading", "a person, read by birth through six systems into a crowned name: the sun sign, the year animal, the life path, the rune, the trigram, and the hexagram. The marks are given, not chosen — three are read from the date itself, three from the name and date together, and each is then read out of the Codex. By birth alone, or as a Concord of two."),
        romanItem("IV &middot; Card Mint", "bring a photo; it is already a card, and the room only develops it. The Free Pull shows the complete card front. If you choose to develop it further, the sealed back opens to a deeper record of the same card — not a different or better one."),
        romanItem("V &middot; The Unlit Room", "something is taking shape here, still too dim to name. The candle has not reached it yet.")
      ]) +
      p("One archive. Every door kept.") +
      lead("What Blue Room is not:", "not a professional divination service, not a data collector, not a business. It is a document — a prototype archive, built by hand, that runs quietly in your browser and asks nothing of you but a photo, a name, or a question. What it gives back is for reflection, not instruction. This page holds the rest: how the rooms work, what they read and do not read, what stays on this device, and what to expect if you share a reading.");
    return docSec("about", "About", "About Blue Room", "We hold the candle.", body);
  }

  function secHow() {
    var body =
      p("Blue Room runs entirely in the browser you are reading it in. There is no account, no login, and — as of this build — no live server behind any room. Here is exactly what happens, and where.") +
      lead("The photo.", "When you stage a photo in Card Mint, it is held in your browser’s own memory for that session only — never uploaded, never sent anywhere. The scan engine that would read it is not connected yet, so nothing analyzes it either. Close the tab or reload the page and it is gone; nothing about it is saved.") +
      /* BR-S484: this asserted determinism over a tarot draw, which is seeded
         from the clock and a salt at the moment of the cut — two cuts of the
         same question return different cards BY DESIGN, and the drawing room's
         own note calls a repeated seed the worst possible collision. The claim
         is true of the Free Pull and the Birth Reading, so name those two and
         tell the truth about the deck. */
      lead("The reading.", "A reading — the Free Pull or the Birth Reading — is produced by a fixed engine built into the page itself: the same inputs always return the same result, no chance, no re-roll. A tarot draw is different: cutting the deck is chance, by design — but once cut, its own link always reopens to the exact same cards. Nothing is generated by an outside model, and no reading is looked up from anywhere but the Codex’s own tables.") +
      lead("The Codex.", "Its entries — every card, sign, number, rune, trigram, and hexagram — are a static reference shipped with the page. They do not change between visits and are not fetched from anywhere, with one exception: if you use the Codex’s word-lookup, the word you type is sent to a free public dictionary service to fetch its definition. That happens only when you deliberately search a word — nothing else, anywhere in Blue Room, makes that kind of request.") +
      /* BR-S351: this said tarot draws are kept. They are not — drawing-room.js
         writes exactly one thing, the flag that the free Sitting is spent. A draw
         lives at its own link and nowhere else. Saying otherwise on the page that
         explains what is kept is the same defect as the Concord claim below, and
         it is the reason the Drawing Room could get away with promising a Shelf
         that has nothing on it. Also drops "local storage", which is a mechanism
         name a reader has no use for. */
      lead("What is filed.", "Whether the Shelf is open, whether your one free Sitting is spent, and each sealed Concord are kept in this browser’s own store — the same place the Motion setting on this page is kept. They persist across visits to this device but go nowhere else: no server, no sync, no second device. A tarot reading itself is not kept: it lives at its own link, and nowhere else.") +
      lead("The develop step.", "Where a card’s sealed back opens, or a deeper reading unlocks, no real money changes hands in this build. Every “develop,” “mint,” or “buy” prompt is a working preview of a paid step that is not connected to a payment processor. Nothing is charged.") +
      lead("What Blue Room is not yet:", "there is no scan engine reading real photographs, no account system, no cloud storage, and no live commerce. All of the above is true of this build as it stands. If any of it changes, this page will say so plainly, before it happens.");
    return docSec("how-it-works", "How It Works", "How Blue Room Works", "A document, not a service.", body);
  }

  function secRules() {
    var body =
      p("Blue Room reads the photograph, not the person. This governs every reading the archive produces.") +
      lead("What a reading reads:", "the frame and composition, the gesture and posture, the light and setting, the styling choices visible in the shot, and what kind of moment the photograph seems to be. That is the entire scope.") +
      lead("What a reading never reads:", "your personality or inner state, your age, race, gender, health, or class, your attractiveness or any rating of your appearance, or your worth, potential, or destiny. If a line ever reads that way, it is a mistake, not a feature — tell us and it gets fixed.") +
      lead("The test we hold every reading to:", "a different photograph would produce a different reading. If a line would stay true no matter which photo it described, it is not a reading — it is a guess about you, and it does not belong here.") +
      lead("Drawn once, not reissued.", "A tarot draw, once cut, is filed as it fell. It is not reshuffled to get a different answer, and it is not a forecast — the tarot does not predict the future. A card offers a reflection on the situation you laid down, and is kept. If a pull does not sit right, that discomfort is worth sitting with too; it is not a misfire to redraw away.") +
      lead("Every outcome is a record, not a grade.", "A quiet reading is not a worse one. The archive files what it finds; it does not rank what it finds.") +
      lead("Reading for someone else.", "A reading about another person — a Concord, or a birth record drawn from someone’s details — is a conversation waiting to happen, not a report to relay. Get their say-so before you draw it, and before you pass it on.") +
      lead("Age and use.", "Blue Room is built with an adult reader in mind; a younger reader working through it alongside a parent or guardian is welcome too. The themes the systems carry — endings, conflict, loss, change — are kept plain, the way an archive keeps its records. If something lands harder than expected, close the record and come back another time, or not at all. Nothing here needs finishing in one sitting.");
    return docSec("rules", "The Rules", "The Rules", "A reading is a mirror, not a verdict.", body);
  }

  function secPrivacy() {
    var body =
      p("The short version: nothing you do in Blue Room is collected, tracked, or sent to a server we control. Below is the complete, specific picture — the two things that do leave this device, and everything that does not.") +
      lead("What actually leaves your device:", "two things, both named here in full.") +
      list([
        "<b>Fonts.</b> Cormorant Garamond, Inter, and IBM Plex Mono load from Google Fonts, the way most sites load type. That request carries your browser’s IP address to Google, under Google’s own terms, and happens on every page load.",
        "<b>Dictionary lookups.</b> If you search a word in the Codex, that word is sent to a free public dictionary service to fetch its definition. This is the only thing in Blue Room that sends anything you have typed anywhere."
      ]) +
      lead("What never leaves your device, under any circumstance in this build:", "everything else.") +
      list([
        "Any photo you stage in Card Mint — held in page memory only, never uploaded, gone on reload.",
        "Any name, birth date, or birthplace you enter for a reading.",
        "Every tarot draw, Birth Reading, Concord bond, and the Shelf’s state.",
        "Every setting on this page."
      ]) +
      /* ── BR-S351 — THIS PAGE WAS TELLING A LIE ABOUT ITSELF. ─────────────
         It said "Not one of them is a name or a photo". A sealed Concord is keyed
         on BOTH people's names and BOTH birth dates — arcana-reading.js#pairKey
         builds "br_concord~<name>~y~m~d|<name>~y~m~d" — and the value it stores is
         the link, which carries the two full seeds again. So the one page in the
         building whose entire job is being true about what is kept was making a
         false claim about the most personal thing it keeps.
         Corrected rather than softened: it now says exactly what the Concord holds
         and why, because the reason is good — a bond has to reopen the same record
         instead of drawing a new one — and a reader who is told the truth about it
         can decide for themselves. */
      lead("The whole local ledger.", "Blue Room keeps four kinds of archive record in this browser — plus any preference you set on the Settings page, which right now means only your Motion choice. None of them is a photo. One of them does carry names: a sealed Concord is stored under the two names and two birth dates it was drawn from, because that is what lets a bond reopen the same record instead of drawing again. It stays on this device, and Reset the Shelf removes it.") +
      list([
        "whether the Shelf has been opened,",
        "whether a first reading has been completed,",
        "whether the one free Sitting has been drawn,",
        "one entry per sealed Concord, so a bond reopens the same record instead of drawing again."
      ]) +
      p("Those four are the archive’s whole ledger. You can see their current state, and clear them, from the Settings tab.") +
      lead("No accounts, no tracking.", "There is no sign-up, no email, no password, no cookies beyond what a browser sets for itself, no analytics, and nothing that recognizes you between visits beyond what is sitting in this browser’s local storage.") +
      lead("What “local storage” means in practice.", "It is a small store your browser keeps for this site, like a bookmark. It survives closing the tab and restarting your browser. It does not survive clearing your browser’s site data, switching browsers, or switching devices — there is no copy anywhere else to fall back on.") +
      p("If real accounts or payment ever ship, this section will be rewritten before that happens, in plain language, saying exactly what is collected and why — not folded quietly into a build that already claims none of it exists.");
    return docSec("privacy", "Data & Privacy", "Data &amp; Privacy", "What stays, and where it stays.", body);
  }

  function secLegal() {
    var body =
      lead("This is a prototype, not a service.", "Blue Room is a personal, actively-developed project — not a company, not a commercial product, not a regulated offering of any kind. Features change, break, or disappear as it is built. It comes with no warranty, express or implied.") +
      lead("Readings are for reflection, not instruction.", "Tarot, numerology, astrology, and every other system in the Codex are offered here for personal reflection and contemplation. None of it is professional advice — medical, legal, financial, or psychological — and none of it predicts anything that will actually happen. For a decision that carries real consequences, bring it to someone licensed and accountable for the answer: a doctor, a lawyer, a financial advisor, a therapist. A reading can sit beside a hard decision; it should never make one for you.") +
      lead("If you are struggling.", "If you are in crisis, or thinking of harming yourself, close this and reach a person instead — a local crisis line, a doctor, someone you trust. Nothing in this archive is built or qualified to help with that, and it will not pretend otherwise.") +
      lead("A reading is not a verdict about you.", "As set out in The Rules, every reading describes a photograph, a birth date, or a drawn card — never your worth, character, or future. Do not treat one as a judgment.") +
      lead("Nothing is charged.", "Anywhere a price or a “develop” button appears, this build does not process real payment. If that changes, it will be unmistakable before you are ever asked to pay.") +
      lead("Use of the archive.", "You are welcome to read, draw, and keep records here for your own reflection. Not granted: reselling readings or cards, presenting Blue Room as a professional or licensed divination service, scraping or automating the Codex or the reading engines, or reproducing its design and copy as your own commercial product. The systems themselves — tarot, astrology, numerology, runic lore, the I Ching — are centuries old and belong to no one; Blue Room’s particular wording, arrangement, and engines are its builder’s own work.") +
      lead("Use at your own risk, no liability.", "Blue Room is provided as-is. To the extent the law allows, its builder is not liable for any outcome, decision, or damage arising from your use of it or your inability to use it.") +
      lead("Age.", "Blue Room is built with an adult audience in mind. If you are a minor, use it with a parent or guardian’s awareness.") +
      lead("Accessibility.", "This page aims to meet recognised accessibility guidelines — readable contrast, keyboard navigation, screen-reader labels. It will not always get there perfectly; if something does not work for you, that is worth knowing and worth fixing.") +
      lead("Changes to these terms.", "These terms may change as Blue Room changes. There is no mailing list to notify — the terms on this page are always the current ones.");
    return docSec("legal", "Disclaimers & Legal", "Disclaimers &amp; Legal", "The plain terms.", body);
  }

  function secCredits() {
    var body =
      /* BR-S347: the byline was the builder's full legal name. An author credit is
         a normal thing to want, but it is also the string that ties every other
         detail on this site to a findable person — and the builder's call is that
         their personal details do not belong on a public page. The claim the
         paragraph exists to make is about HOW it was built, and that survives
         without a name on it. */
      /* BR-S484: same defect as "The reading." above, second surface — this is
         the propagation pattern inside one file. The deck is not a fixed
         lookup; it is chance at the cut, then frozen. */
      p("Built by one person, working alone. The reading engines — the birth readings, the Codex tables — are hand-built lookups and formulas, not generative models, and output the same result every time; a tarot draw is deliberately left to chance when it is cut, and is never regenerated afterward. Nothing here is produced by a language model at runtime. The design and words are the builder’s own, assembled by hand.") +
      p("Built with plain HTML, CSS, and JavaScript — no framework and no bundler; the browser runs the source files directly. No external code libraries beyond the web fonts (and the optional dictionary lookup described above). One stylesheet, one app file, a handful of room modules, kept deliberately small.") +
      lead("Typefaces.", "Cormorant Garamond for display and reading text; IBM Plex Mono (weights 400 and 500 only) for labels and data; Inter for interface text. All three are open-source, served via Google Fonts.") +
      p("The systems in the Codex draw on public and widely-published traditions: the Western tropical zodiac, the Chinese zodiac and five elements, Pythagorean numerology, the Major Arcana in the Rider-Waite lineage, the Elder Futhark runes, and the eight trigrams and sixty-four hexagrams of the I Ching — synthesized and written in Blue Room’s own voice. The Codex is a first bank: a considered starting reference, not an exhaustive or final one. For serious study, read past it, to the sources.") +
      p("Dictionary definitions in the Codex’s word-lookup come from a free public dictionary service — see Data &amp; Privacy above for what that sends, and when.") +
      /* ── BR-S347 — WHAT A PUBLIC PAGE MAY NOT CARRY. ──────────────────────
         Two things came out of this section. The SOURCE LINK, because publishing
         the address of the repository is an invitation to redeploy the whole
         thing, and the sentence asking people not to was doing no work at all.
         And the BUILDER'S PERSONAL EMAIL, which was printed in full on a page
         reachable by anyone — a permanent, scrapeable address attached to a real
         person, for a project that has no support desk to justify it.
         The commitment to fix mistakes stays, because The Rules makes it and a
         promise with no way to reach anyone is worse than no promise. A route
         back will be a project address, not a person's inbox. */
      lead("Contact.", "Blue Room is a personal study kept in the open, not a company with a support desk. There is no contact route in this build; when there is one it will be a project address, and it will be printed here.");
    return docSec("credits", "Credits & Information", "Credits &amp; Information", "Who built this, and with what.", body);
  }

  var JUMP = [
    ["about", "About"],
    ["how-it-works", "How It Works"],
    ["rules", "The Rules"],
    ["privacy", "Data &amp; Privacy"],
    ["legal", "Disclaimers &amp; Legal"],
    ["credits", "Credits"]
  ];

  function recordPanelHTML() {
    var rail = JUMP.map(function (j, i) {
      return '<a class="st-jump__link' + (i === 0 ? " is-current" : "") + '" href="#' + docId(j[0]) + '" data-target="' + j[0] + '"' +
        (i === 0 ? ' aria-current="true"' : "") + '>' + j[1] + '</a>';
    }).join("");
    var doc = secAbout() + secHow() + secRules() + secPrivacy() + secLegal() + secCredits();
    return '<div class="st-panel" role="tabpanel" id="st-panel-record" data-tab="record" aria-labelledby="st-tab-record" tabindex="0" hidden>' +
      '<div class="st-record">' +
        '<nav class="st-jump" aria-label="Sections">' + rail + '</nav>' +
        '<div class="st-doc">' + doc + '</div>' +
      '</div>' +
    '</div>';
  }

  /* =========================================================
     PAGE SHELL
  ========================================================= */
  function tabsHTML() {
    return '<div class="st-tabs" role="tablist" aria-label="Settings sections">' +
      '<button type="button" class="st-tab is-on" role="tab" id="st-tab-controls" data-tab="controls" aria-selected="true" aria-controls="st-panel-controls" tabindex="0">Settings</button>' +
      '<button type="button" class="st-tab" role="tab" id="st-tab-record" data-tab="record" aria-selected="false" aria-controls="st-panel-record" tabindex="-1">About &amp; Legal</button>' +
    '</div>';
  }

  /* ── BR-S337 — A FOOTER OF STANDING LINKS. ───────────────────────────────────
     The page ended on two lines of disclaimer and nothing else, so Settings was the
     one room in the building with no way onward — you either used the header's two
     doors or you went back. These are the addresses that hold still: the ones that
     will still mean the same thing in a year. Every one is verified to exist —
     codex.html, /about/ (U1), ?dev=profile (Your Profile), the public repo, the contact
     address printed in Credits. Nothing aspirational is listed. */
  var STANDING = [
    ["What Blue Room is", "about/", false],
    ["The Codex", "codex.html", false],
    ["Your Profile", "?dev=profile", false],
    ["About &amp; Legal", "?dev=settings&p=legal", false],
    /* BR-S347: the Source link and the mailto are gone from here for the reasons
       set out in Credits — a repository address is an invitation to redeploy, and
       a personal inbox is not a standing link. */
    ["What's coming", "roadmap/", false]
  ];
  function footerHTML() {
    var links = STANDING.map(function (l) {
      return '<a class="st-foot__link" href="' + l[1] + '"' +
        (l[2] ? ' target="_blank" rel="noopener noreferrer"' : "") + ">" + l[0] + "</a>";
    }).join('<span class="st-foot__dot" aria-hidden="true">&middot;</span>');
    return '<footer class="pf-foot st-foot">' +
      '<nav class="st-foot__links" aria-label="Standing links">' + links + "</nav>" +
      '<p class="st-foot__note">A record kept for the archive itself, not for you.<br>' +
        'Nothing on this page is medical, legal, or financial counsel.</p>' +
    "</footer>";
  }

  function render() {
    return '<div class="pf st-page">' +
      headerHTML() +
      '<div class="pf-wrap">' +
        '<header class="st-head">' +
          '<h1 class="st-title">Settings</h1>' +
          '<p class="st-sub">The controls this build actually has, and the record of what it keeps.</p>' +
        '</header>' +
        tabsHTML() +
        controlsPanelHTML() +
        recordPanelHTML() +
        footerHTML() +
      '</div>' +
    '</div>';
  }

  /* =========================================================
     INTERACTIONS
  ========================================================= */
  var resetTrigger = null;   // the Reset button, for focus return after confirm

  function selectTab(root, name, focusTab) {
    root.querySelectorAll(".st-tab").forEach(function (t) {
      var on = t.getAttribute("data-tab") === name;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.setAttribute("tabindex", on ? "0" : "-1");
      t.classList.toggle("is-on", on);
      if (on && focusTab) t.focus();
    });
    root.querySelectorAll(".st-panel").forEach(function (pnl) {
      pnl.hidden = pnl.getAttribute("data-tab") !== name;
    });
    writeURL(name, "");
  }

  function selectMotion(root, val, focusOpt) {
    motionSet(val);
    root.querySelectorAll(".st-seg__opt[data-motion-val]").forEach(function (o) {
      var on = o.getAttribute("data-motion-val") === val;
      o.setAttribute("aria-checked", on ? "true" : "false");
      o.setAttribute("tabindex", on ? "0" : "-1");
      o.classList.toggle("is-on", on);
      if (on && focusOpt) o.focus();
    });
  }

  function setCurrent(root, id) {
    root.querySelectorAll(".st-jump__link").forEach(function (l) {
      var on = l.getAttribute("data-target") === id;
      l.classList.toggle("is-current", on);
      if (on) l.setAttribute("aria-current", "true"); else l.removeAttribute("aria-current");
    });
  }

  function gotoSection(root, id, quiet) {
    var el = root.querySelector("#" + docId(id));
    if (!el) return;
    el.scrollIntoView({ behavior: (quiet || prefersReduced()) ? "auto" : "smooth", block: "start" });
    setCurrent(root, id);
    /* "record" is the PANEL's name; "legal" is what it is called in the URL. Passing the
       URL word here silently failed the `tab === "record"` test and deleted p=legal from
       the address on every jump — the exact defect this change exists to fix, reintroduced
       one function further down. */
    writeURL("record", id);
    var h = el.querySelector(".st-doc__title");
    if (h) { try { h.focus({ preventScroll: true }); } catch (e) { h.focus(); } }
  }

  /* ── THE URL IS THE BOOT TRUTH. ───────────────────────────────────────────────
     A view switch that does not rewrite the URL leaves the address describing a page
     the reader is no longer on — so a refresh silently teleports them. replaceState,
     not pushState: moving between two tabs of one settings page is not six entries
     of back-button history, but it IS a different address, and a reload must land
     where the reader actually is. */
  function writeURL(tab, sectionKey) {
    try {
      var p = new URLSearchParams(location.search);
      p.set("dev", "settings");
      if (tab === "record") p.set("p", "legal"); else p.delete("p");
      var hash = (tab === "record" && sectionKey) ? "#" + docId(sectionKey) : "";
      history.replaceState(null, "", location.pathname + "?" + p.toString() + hash);
    } catch (e) {}
  }
  /* Read the address back: which panel, and which section of it. */
  function readURL() {
    var out = { tab: "controls", section: "" };
    try {
      var p = new URLSearchParams(location.search);
      var want = (p.get("p") || "").toLowerCase();
      if (want === "legal" || want === "about") out.tab = "record";
      var h = (location.hash || "").replace(/^#/, "");
      if (h.indexOf("st-doc-") === 0) {
        var key = h.slice(7);
        for (var i = 0; i < JUMP.length; i++) if (JUMP[i][0] === key) { out.section = key; out.tab = "record"; break; }
      }
    } catch (e) {}
    return out;
  }

  /* BR-S337: the two live sections are in two zones now, and restoring the Sitting
     changes BOTH (the control in The Free Half, the ledger row in On This Device).
     Re-render both every time or the ledger tells a stale truth about the thing the
     reader just changed — which on a page whose whole claim is honesty is the one
     bug that costs the most. */
  function refreshReliquary(root, opts) {
    opts = opts || {};
    var dev = root.querySelector("#st-reliquary");
    if (dev) dev.innerHTML = deviceInner(opts);
    var free = root.querySelector("#st-freehalf");
    if (free) free.innerHTML = freeHalfInner(opts);
  }

  function openConfirm(root, trigger) {
    resetTrigger = trigger;
    var flags = 0;
    if (lsGet("br_holdings") === "1") flags++;
    if (lsGet("br_has_reading") === "1") flags++;
    if (lsGet("br_dr_sitting_used") === "1") flags++;
    var concords = concordKeys().length;
    var txt = root.querySelector("#st-confirm-text");
    if (txt) txt.textContent = "This clears " + plural(flags, "mark", "marks") + " and " +
      plural(concords, "sealed Concord", "sealed Concords") + " on this browser. This can’t be undone. Confirm?";
    var strip = root.querySelector("#st-confirm");
    if (strip) strip.hidden = false;
    if (trigger) trigger.setAttribute("aria-expanded", "true");
    var go = root.querySelector('[data-act="reset-confirm"]');
    if (go) go.focus();
  }

  function closeConfirm(root) {
    var strip = root.querySelector("#st-confirm");
    if (strip) strip.hidden = true;
    if (resetTrigger) { resetTrigger.setAttribute("aria-expanded", "false"); try { resetTrigger.focus(); } catch (e) {} }
    resetTrigger = null;
  }

  function doReset() {
    lsRemove("br_holdings");
    lsRemove("br_has_reading");
    lsRemove("br_dr_sitting_used");
    concordKeys().forEach(lsRemove);
    try { location.reload(); } catch (e) {}
  }

  function handleAct(root, el) {
    var a = el.getAttribute("data-act");
    if (a === "restore-sitting") { lsRemove("br_dr_sitting_used"); refreshReliquary(root, { restored: true }); return; }
    if (a === "reset-open") { openConfirm(root, el); return; }
    if (a === "reset-cancel") { closeConfirm(root); return; }
    if (a === "reset-confirm") { doReset(); return; }
  }

  function moveWithinGroup(items, current, dir) {
    var n = items.length, idx = items.indexOf(current);
    if (idx < 0) idx = 0;
    return items[(idx + dir + n) % n];
  }

  function wire(root) {
    /* delegated clicks */
    root.addEventListener("click", function (ev) {
      var doorEl = ev.target.closest("[data-door]");
      if (doorEl) {
        ev.preventDefault();
        var d = doorEl.getAttribute("data-door");
        if (d === "menu") location.href = location.pathname;
        else if (d === "profile") location.href = "?dev=profile";
        return;
      }
      var tabEl = ev.target.closest(".st-tab");
      if (tabEl) { selectTab(root, tabEl.getAttribute("data-tab"), false); return; }
      var optEl = ev.target.closest(".st-seg__opt[data-motion-val]");
      if (optEl) { if (optEl.disabled) return; selectMotion(root, optEl.getAttribute("data-motion-val"), false); return; }
      var jumpEl = ev.target.closest(".st-jump__link");
      if (jumpEl) { ev.preventDefault(); gotoSection(root, jumpEl.getAttribute("data-target")); return; }
      var actEl = ev.target.closest("[data-act]");
      if (actEl) { ev.preventDefault(); handleAct(root, actEl); return; }
    });

    /* delegated keyboard: tablist + radiogroup roving, Escape cancels confirm */
    root.addEventListener("keydown", function (ev) {
      var t = ev.target;

      if (t.classList && t.classList.contains("st-tab")) {
        var tabs = Array.prototype.slice.call(root.querySelectorAll(".st-tab"));
        var next = null;
        if (ev.key === "ArrowRight" || ev.key === "ArrowDown") next = moveWithinGroup(tabs, t, 1);
        else if (ev.key === "ArrowLeft" || ev.key === "ArrowUp") next = moveWithinGroup(tabs, t, -1);
        else if (ev.key === "Home") next = tabs[0];
        else if (ev.key === "End") next = tabs[tabs.length - 1];
        if (next) { ev.preventDefault(); selectTab(root, next.getAttribute("data-tab"), true); }
      } else if (t.getAttribute && t.getAttribute("role") === "radio" && t.hasAttribute("data-motion-val")) {
        if (t.disabled) return;
        var opts = Array.prototype.slice.call(root.querySelectorAll(".st-seg__opt[data-motion-val]"));
        var to = null;
        if (ev.key === "ArrowRight" || ev.key === "ArrowDown") to = moveWithinGroup(opts, t, 1);
        else if (ev.key === "ArrowLeft" || ev.key === "ArrowUp") to = moveWithinGroup(opts, t, -1);
        else if (ev.key === "Home") to = opts[0];
        else if (ev.key === "End") to = opts[opts.length - 1];
        if (to) { ev.preventDefault(); selectMotion(root, to.getAttribute("data-motion-val"), true); }
      }

      if (ev.key === "Escape") {
        var strip = root.querySelector("#st-confirm");
        if (strip && !strip.hidden) { ev.preventDefault(); closeConfirm(root); }
      }
    });

    /* scroll-spy for the jump rail (IntersectionObserver rooted on the .pf scroller) */
    setupSpy(root);
  }

  function setupSpy(root) {
    if (!("IntersectionObserver" in window)) return;
    var secs = Array.prototype.slice.call(root.querySelectorAll(".st-doc__sec[id]"));
    if (!secs.length) return;
    /* BR-S337: keyed by data-key, not by id — the ids carry the st-doc- prefix now and
       the rail's data-target does not. Reading the DOM id here would silently
       highlight nothing, which is the quietest possible way for a nav to break. */
    var order = secs.map(function (s) { return s.getAttribute("data-key"); });
    var visible = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var k = e.target.getAttribute("data-key");
        if (e.isIntersecting) visible[k] = true; else delete visible[k];
      });
      for (var i = 0; i < order.length; i++) {
        if (visible[order[i]]) { setCurrent(root, order[i]); return; }
      }
    }, { root: root, rootMargin: "-16% 0px -74% 0px", threshold: 0 });
    secs.forEach(function (s) { io.observe(s); });
  }

  /* preserve any hooks the app assigned before this file ran */
  window.BRSettings = window.BRSettings || {};
  window.BRSettings.mount = function (host) {
    if (!host) return;
    host.innerHTML = render();
    var root = host.firstElementChild;   // the .pf scroller + delegation root
    if (!root) return;
    wire(root);
    /* BR-S337 — SEAT FROM THE ADDRESS. A load carrying ?p=legal opens the document,
       and a load carrying a section hash lands on that section. `quiet` because an
       arrival is not a journey: a link should paint where it points, not animate
       there from the top of a page the reader never saw. */
    var seat = readURL();
    if (seat.tab === "record") {
      selectTab(root, "record", false);
      if (seat.section) {
        /* TWO frames, not zero: the panel is unhidden in this same tick, so at the moment
           selectTab returns the document has no layout yet and scrollIntoView measures a
           zero-height box and does nothing. Measured — the seat silently no-opped until
           this was deferred. */
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { gotoSection(root, seat.section, true); });
        });
      } else writeURL("record", "");
    }
  };
})();
