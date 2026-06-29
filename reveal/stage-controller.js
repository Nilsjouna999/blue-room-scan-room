/* =====================================================================
   BLUE ROOM — Staged Card Reveal · StageController (BR-S124)
   The PARENT. Owns the whole state machine + layout slots. Children stay
   dumb — they get props + emit events; they never read the global stage.

   stage:       PHOTO | FREE | FREE_READING | HALO | HALO_READING
   modalOpen:   overlays FREE_READING (card behind does NOT change)
   purpleReady: true only after the FREE write-in settles -> the quiet offer

   Entry: window.BRReveal.mount(rootEl). Idempotent (full rebuild).
   ===================================================================== */
(function () {
  window.BRReveal = window.BRReveal || {};
  var R = window.BRReveal;

  R.mount = function (root, opts) {
    if (!root) return;
    opts = opts || {};
    var embedded = !!opts.embedded;   // narrow slot — vertical stack, readings below
    var menustage = !!opts.menustage; // hosted in the real menu grid's stage cell (card-right, slide-in read, one base)
    var bare = embedded || menustage || !!opts.bare; // skip the reveal's own header (a host menu provides the brand)

    // idempotent: tear down any prior instance (body-level modal included)
    Array.prototype.slice.call(document.querySelectorAll(".rv-modal")).forEach(function (m) { m.remove(); });
    root.innerHTML = "";

    // SOURCES is a top-level `const` in data.js (a global LEXICAL binding,
    // not a window property) — reach it by the bare name, typeof-guarded.
    var allSrc = (typeof SOURCES !== "undefined" && SOURCES) || window.SOURCES || [];
    var src = allSrc[0];
    if (!src) {
      root.innerHTML = '<p style="color:#948f87;font-family:sans-serif;padding:48px;text-align:center">SOURCES not loaded — open this page through the normal app.</p>';
      return;
    }

    var stage = document.createElement("div");
    stage.className = "reveal-stage"
      + (embedded ? " reveal-stage--embedded" : "")
      + (menustage ? " reveal-stage--menustage" : "");
    stage.innerHTML =
      (bare ? "" :   // a host menu provides the brand/header
        '<div class="reveal-stage__head">' +
        '<span class="reveal-stage__devtag">DEV · STAGED REVEAL — not a product surface yet</span>' +
        '<h1 class="reveal-stage__brand">◆ BLUE ROOM</h1>' +
        '<p class="reveal-stage__thesis">Every photo is already a card. Watch the room develop it.</p>' +
        "</div>") +
      '<div class="reveal-stage__body">' +
      '<div class="rv-stagemain" tabindex="-1">' +   // card + arrow — slides LEFT when the read appears
      '<div class="rv-cardslot"></div>' +
      '<div class="rv-arrowslot"></div>' +
      "</div>" +
      '<div class="rv-readslot" aria-live="polite" aria-atomic="false"></div>' +
      "</div>";
    root.appendChild(stage);

    // ---- state (lives ONLY here) -------------------------------------
    var stageName = "PHOTO";
    var purpleReady = false;

    // ---- units -------------------------------------------------------
    var card = R.CardFrame({ src: src, onMorphDone: onMorph });
    stage.querySelector(".rv-cardslot").appendChild(card.el);

    var readslot = stage.querySelector(".rv-readslot");
    var stagemain = stage.querySelector(".rv-stagemain");   // M6: programmatic focus target during develop
    var panel = null;
    var haloTimer = null;   // guards the develop beat across rapid taps

    var arrow = R.ArrowButton({ variant: "grey", label: "Develop the card", onClick: onArrow });
    var cap = document.createElement("span");
    cap.className = "rv-arrow__cap";
    cap.setAttribute("aria-live", "polite");   // M6: announce caption state (visible on standalone)
    cap.setAttribute("aria-atomic", "true");
    cap.textContent = "Develop";
    var arrowSlot = stage.querySelector(".rv-arrowslot");
    arrowSlot.appendChild(arrow.el);
    arrowSlot.appendChild(cap);

    var modal = R.WarningModal({
      copy: R.modalCopy,
      onConfirm: function () { enterHalo(); },     // "No — let me see" -> deeper room
      onDismiss: function () { /* stay on FREE_READING; arrow stays purple */ },
    });

    // ---- init --------------------------------------------------------
    if (menustage) {
      // the menu sample IS the developed free card (matches the original menu exactly);
      // pressing reveals its reading, then "see deeper" mints + deepens in the fullview.
      stageName = "FREE";
      card.setMode("free");
      setArrow({ variant: "grey", disabled: false }, "Read");
    } else {
      stageName = "PHOTO";
      card.setMode("photo");
      setArrow({ variant: "grey", disabled: false }, "Develop");
    }

    // ---- helpers -----------------------------------------------------
    function setArrow(opts, caption) {
      arrow.update(opts);
      if (typeof caption === "string") cap.textContent = caption;
    }

    function mountPanel(reading, onComplete) {
      if (!panel) {
        panel = R.ReadingPanel({ reading: reading, src: src });   // M5: thread src (kills SRC-01 hardcodes)
        readslot.appendChild(panel.el);
      } else {
        panel.setReading(reading);
      }
      panel.play(function () {
        // M6: move focus to the read headline once the write-in settles so
        // keyboard users are oriented (the headline carries tabindex=-1).
        var hl = panel.el.querySelector(".rv-read__headline");
        if (hl) hl.focus();
        if (onComplete) onComplete();
      });
    }

    // ---- stage entries ----------------------------------------------
    function enterFree() {
      stageName = "FREE";
      setArrow({ variant: "grey", disabled: true }, "Developing…");
      card.setMode("free"); // onMorph('free') re-enables the arrow
      if (stagemain && stage.contains(document.activeElement)) stagemain.focus();   // M6: only if the user is already in the reveal (never steal focus on page-load)
    }
    function enterFreeReading() {
      stageName = "FREE_READING";
      purpleReady = false;
      stage.classList.add("is-reading");   // the card glides LEFT; the read scribbles in on the right
      if (opts.onReading) opts.onReading();
      setArrow({ variant: "grey", disabled: true }, "Reading…");
      mountPanel(R.readings.freeReading, function () {
        // grey -> purple ONLY now: the front is settled and complete
        purpleReady = true;
        setArrow({ variant: "purple", disabled: false, label: "See the deeper room" }, "See deeper");
      });
    }
    function enterHalo() {
      if (haloTimer) { clearTimeout(haloTimer); haloTimer = null; }
      stageName = "HALO";
      if (opts.onFullview) opts.onFullview();   // promote to the fullview: the menu chrome steps aside
      stage.classList.remove("is-reading");      // card returns to centre for the develop
      if (panel) panel.clear();                  // the free Stats & Readings fades to empty first
      setArrow({ variant: "grey", disabled: true }, "Developing…");
      if (stagemain && stage.contains(document.activeElement)) stagemain.focus();   // M6: only if focus is already in the reveal
      // then, a beat later, the card itself develops (the wipe) — sequenced, not all at once
      haloTimer = setTimeout(function () {
        haloTimer = null;
        if (stageName === "HALO") card.setMode("halo"); // wipe-develop; onMorph('halo') re-enables
      }, 320);
    }
    function enterHaloReading() {
      if (card && card.finalizeCleanup) card.finalizeCleanup();   // BR-S136: snap any in-flight finalization ritual to settled before the slide
      stageName = "HALO_READING";
      stage.classList.add("is-reading");         // slide left again for the halo read
      setArrow({ variant: "grey", disabled: true }, "Reading…");
      mountPanel(R.readings.haloReading, function () {
        // journey over — fade the arrow out
        arrow.el.classList.add("is-gone");
        cap.style.opacity = "0";
      });
    }

    function onMorph(mode) {
      if (mode === "free" && stageName === "FREE") {
        setArrow({ variant: "grey", disabled: false, label: "Read the free card" }, "Read");
        if (arrow && arrow.el && stage.contains(document.activeElement)) arrow.el.focus();   // M6: hand off — never steal focus on the menustage page-load morph
      } else if (mode === "halo" && stageName === "HALO") {
        setArrow({ variant: "grey", disabled: false, label: "Read the developed record" }, "Read");
        if (arrow && arrow.el && stage.contains(document.activeElement)) arrow.el.focus();
      }
    }

    // ---- arrow dispatch (the §3 table) -------------------------------
    function onArrow() {
      switch (stageName) {
        case "PHOTO": enterFree(); break;
        case "FREE": enterFreeReading(); break;
        case "FREE_READING": if (purpleReady) modal.open(); break; // else no-op
        case "HALO": enterHaloReading(); break;
        case "HALO_READING": break; // no-op; arrow already faded
      }
    }

    // ---- dev-only stage deep-link (?rv=free|reading|halo|developed) ---
    // Auto-drives the real flow to a target stage so a static capture (or a
    // reviewer) can land on it. Dev route only; not a product control.
    var auto = new URLSearchParams(location.search).get("rv");
    if (auto && auto !== "photo") autoAdvance(auto);

    function autoAdvance(target) {
      var steps = { free: 1, reading: 2, halo: 3, developed: 4 };
      var goal = steps[target] || 0;
      var done = 0, ticks = 0;
      function tick() {
        if (done >= goal || ticks++ > 250) return; // hard escape: never poll forever
        if (arrow.el.getAttribute("aria-disabled") === "true") { setTimeout(tick, 60); return; }
        done++;
        if (stageName === "FREE_READING") {
          modal.open();
          setTimeout(function () {
            var b = modal.el.querySelector("[data-rv-confirm]");
            if (b) b.click();
            tick();
          }, 90);
          return;
        }
        onArrow();
        setTimeout(tick, 120);
      }
      setTimeout(tick, 150);
    }

    // ---- BACK from the fullview to the in-menu free read ----------------
    function toFree() {
      if (haloTimer) { clearTimeout(haloTimer); haloTimer = null; }
      if (opts.onBack) opts.onBack();          // un-fullview: the menu chrome fades back in
      stageName = "FREE_READING"; purpleReady = true;
      if (panel) panel.clear();
      card.setMode("free");                    // back to the matte free card
      stage.classList.add("is-reading");       // the free read returns where they left it
      mountPanel(R.readings.freeReading, function () {
        setArrow({ variant: "purple", disabled: false, label: "See the deeper room" }, "See deeper");
      });
    }

    return { el: stage, toFree: toFree };
  };
})();
