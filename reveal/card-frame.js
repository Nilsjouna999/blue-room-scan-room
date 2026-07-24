/* =====================================================================
   BLUE ROOM — Staged Card Reveal · UNIT 2/6 CardFrame (BR-S124)
   props in : { src, onMorphDone }
   methods  : setMode('photo'|'free'|'halo'), getMode()
   events   : onMorphDone(mode)
   owns     : fixed-aspect box, inner-layer crossfade, free->halo scan sweep
   Reuses the REAL renderCard() so the crown card is the card. The three
   layers stack in one grid cell -> identical dimensions in every state;
   only opacity/transform animate (zero layout shift).
   ===================================================================== */
(function () {
  window.BRReveal = window.BRReveal || {};
  function motionOff() {
    return !!(window.matchMedia && (window.BRMotion ? window.BRMotion.prefersReduced() : window.matchMedia("(prefers-reduced-motion: reduce)").matches));
  }

  window.BRReveal.CardFrame = function (opts) {
    opts = opts || {};
    var src = opts.src;
    var onMorphDone = opts.onMorphDone;

    var el = document.createElement("div");
    el.className = "rv-cardframe";

    function layer(name, inner) {
      var d = document.createElement("div");
      d.className = "rv-layer rv-layer--" + name;
      d.innerHTML = inner;
      return d;
    }

    var hasCard = typeof renderCard === "function";
    var free = layer("free", hasCard ? renderCard(src, "free") : "");
    var halo = layer("halo", hasCard ? renderCard(src, "shiny") : "");
    var photoUrl = (src && src.file) ? src.file : "";
    var photo = layer("photo", '<div class="rv-photoplate"><img src="' + photoUrl + '" alt="" /></div>');
    var scan = document.createElement("div");
    scan.className = "rv-scanline";

    // free is appended first so the grid track sizes to the real card height;
    // photo + halo overlay the same cell.
    el.appendChild(free);
    el.appendChild(halo);
    el.appendChild(photo);
    el.appendChild(scan);

    var byName = { free: free, halo: halo, photo: photo };
    var mode = null;
    var timer = null;
    var finTimers = [];          // BR-S136 ritual setTimeout handles (cleared on interrupt)
    var seenDevelop = false;     // BR-S136 repeat-variant flag (resets on new CardFrame instance)

    function clearFinTimers() {
      for (var i = 0; i < finTimers.length; i++) clearTimeout(finTimers[i]);
      finTimers = [];
    }
    // BR-S136 — build the ONE moving overlay inside the HALO card's .card__plate,
    // parked invisible. Injected => absent from a plain renderCard() => live room
    // untouched. Returns the node.
    function rvSealCreate() {
      var plate = halo.querySelector(".card__plate");
      if (!plate) return null;
      var seal = plate.querySelector(":scope > .rv-seal");
      if (!seal) {
        seal = document.createElement("div");
        seal.className = "rv-seal";
        plate.appendChild(seal);
      }
      seal.style.willChange = "transform, opacity";   // promote ONLY during the ritual
      return seal;
    }
    // BR-S141 — will-change lifecycle for the finalization catch set (replaces the 40+
    // persistent CSS will-change hints removed in reveal.css). Promote at finalize-start,
    // DROP at cleanup, so backing stores live only during the ~1.3s window. Mirrors the
    // seal's add-then-clear discipline.
    function rvCatchPromote(on) {
      var sels = [".corner", ".titleblock__title", ".titleblock__archetype",
                  ".photo", ".barcode", ".mintstrip__state",
                  ".fr__pip.is-on", ".card__plate", ".card__house"];
      for (var i = 0; i < sels.length; i++) {
        var nodes = halo.querySelectorAll(sels[i]);
        for (var j = 0; j < nodes.length; j++) nodes[j].style.willChange = on ? "filter, transform" : "";
      }
    }
    // BR-S136 — INTERRUPT / SKIP / END cleanup. Idempotent: cancels timers, removes
    // the overlay + every ritual class + the final-pip tag, drops will-change, and
    // always snaps to the settled minted card (never mid-sweep / half-glow).
    function finalizeCleanup() {
      clearFinTimers();
      el.classList.remove("is-finalizing", "is-fin-repeat");
      var fp = halo.querySelector(".fr__pip.is-final-pip");
      if (fp) fp.classList.remove("is-final-pip");
      var seal = halo.querySelector(".card__plate > .rv-seal");
      if (seal) { seal.style.willChange = ""; seal.remove(); }
      rvCatchPromote(false);                    // BR-S141 — release the catch backing stores
      halo.classList.add("rv-halo-settled");   // settled tone persists (freeze-safe)
    }

    function setMode(next) {
      if (next === mode) return;
      var prev = mode;
      mode = next;
      if (timer) clearTimeout(timer);
      // BR-S136 — a mode change mid-ritual must snap to settled before the new mode
      if (el.classList.contains("is-finalizing") || el.classList.contains("is-fin-repeat")) {
        finalizeCleanup();
      }

      // FREE -> HALO is the "develop": the minted card WIPES IN top->bottom over
      // the free card beneath, a developer bar riding the reveal edge — like a
      // print coming up in the tray. Same card geometry in both layers, so only
      // the treatment (matte -> minted + glow) develops. Savor it (~1.5s + settle).
      if (prev === "free" && next === "halo") {
        finalizeCleanup();                 // clear any prior ritual before restarting
        free.classList.add("is-shown");   // free stays beneath during the wipe
        halo.classList.add("is-shown");   // minted card on top, clip-revealed
        photo.classList.remove("is-shown");
        halo.classList.remove("rv-halo-settled");  // intentional: finalizeCleanup() above snaps settled; strip it to re-arm the ritual
        el.classList.remove("is-developing", "is-finalizing", "is-fin-repeat");
        void el.offsetWidth;              // restart the wipe + the developer bar
        el.classList.add("is-developing");
        var off = motionOff();
        var ddur  = off ? 0 : 3550;       // BR-S135 gate UNCHANGED — wipe/tonal/bloom/pip-ignite intact
        var pipT0 = off ? 0 : 3486;       // final pip (c4,r3) lands == ritual t=0
        var ritualDur = off ? 0 : (seenDevelop ? 420 : 1360);   // BR-S141: 900 -> 1360 (cleanup fires ~160ms AFTER the edition catch at FIN+1200 = a real held settle, freeze-safe); repeat 360 -> 420

        // gate-off at 3550 (drop the free layer) + onMorphDone — UNCHANGED schedule
        timer = setTimeout(function () {
          el.classList.remove("is-developing");
          free.classList.remove("is-shown"); // free now fully covered — drop it
          if (onMorphDone) onMorphDone(next);
        }, ddur);

        if (off) {
          // RM: no ritual travel; just settle (the CSS RM block does the visuals).
          // both this and the gate timer (ddur=0) queue at t=0; this push is ordered
          // after, so .is-developing removes first, then .is-finalizing adds.
          finTimers.push(setTimeout(function () {
            el.classList.add("is-finalizing");           // lets the RM label tint fire
            halo.classList.add("rv-halo-settled");
            finTimers.push(setTimeout(function () { el.classList.remove("is-finalizing"); }, 320));
          }, 0));
        } else {
          // t=0 — tag the LAST lit pip (c4,r3 via CSS-var match; DOM-order last as
          // fallback when c4,r3 is unlit), start the ritual, schedule the sub-beats.
          finTimers.push(setTimeout(function () {
            var last = halo.querySelector('.fr__pip.is-on[style*="--r:3"][style*="--c:4"]');
            if (!last) {
              var pips = halo.querySelectorAll(".fr__pip.is-on");
              last = pips.length ? pips[pips.length - 1] : null;
            }
            if (last) last.classList.add("is-final-pip");
            el.classList.add("is-finalizing");
            if (seenDevelop) el.classList.add("is-fin-repeat");
            if (!el.classList.contains("is-fin-repeat")) rvCatchPromote(true);   // BR-S141 — promote only when the catch cascade actually runs
            seenDevelop = true;

            var seal = rvSealCreate();
            if (seal && !el.classList.contains("is-fin-repeat")) {
              // BR-S141: seal opens AFTER the stamp completes (stamp = FIN+210..445).
              // nucleus releases (420ms), seal sweep (460ms) — was 300/340 (overlapped the stamp tail).
              finTimers.push(setTimeout(function () { seal.classList.add("is-releasing"); }, 420));
              finTimers.push(setTimeout(function () { seal.classList.add("is-sealing"); }, 460));
            } else if (seal) {
              // repeat: skip the nucleus, short micro-sheen only (UNCHANGED)
              finTimers.push(setTimeout(function () { seal.classList.add("is-sealing"); }, 120));
            }
            // settle + clean up at the end of the ritual window. BR-S141: route through
            // finalizeCleanup() (idempotent) so the catch will-change + seal are ALWAYS
            // released on the happy path too — not just on interrupt. Fires at the longer
            // ritualDur=1360 (~160ms after the edition catch at FIN+1200) = a rested,
            // freeze-safe settle with no class-removal mid-animation.
            finTimers.push(setTimeout(function () { finalizeCleanup(); }, ritualDur));
          }, pipT0));
        }
        return;
      }

      // PHOTO -> FREE is the standalone OPENING develop: the print rises out of the
      // developer bath (bottom-anchored clip bloom) while the exposure/contrast fixes
      // in, and the bath behind it dims/desaturates/softens/drains. Plays ONLY on
      // ?dev=staged-reveal — the menu starts already on FREE, so it never fires there.
      if (prev === "photo" && next === "free") {
        free.classList.add("is-shown");      // the print — rises sharp, fixes in
        halo.classList.remove("is-shown");
        photo.classList.add("is-shown");     // the bath — stays beneath, then sinks
        el.classList.remove("is-developing-photo");
        void el.offsetWidth;                 // restart the develop
        el.classList.add("is-developing-photo");
        var pdur = motionOff() ? 0 : 1180;
        timer = setTimeout(function () {     // reuses the module-scoped timer — no race
          el.classList.remove("is-developing-photo");
          photo.classList.remove("is-shown"); // print fully up — drop the bath
          if (onMorphDone) onMorphDone(next);
        }, pdur);
        return;
      }

      // default crossfade (photo <-> free, or a direct set)
      ["free", "halo", "photo"].forEach(function (n) {
        byName[n].classList.toggle("is-shown", n === next);
      });
      var dur = motionOff() ? 0 : 820;
      timer = setTimeout(function () {
        if (onMorphDone) onMorphDone(next);
      }, dur);
    }

    return {
      el: el,
      setMode: setMode,
      getMode: function () { return mode; },
      finalizeCleanup: finalizeCleanup,   // BR-S136 — let the HALO->HALO_READING arrow snap the ritual
      destroy: function () { if (timer) clearTimeout(timer); finalizeCleanup(); el.remove(); },
    };
  };
})();
