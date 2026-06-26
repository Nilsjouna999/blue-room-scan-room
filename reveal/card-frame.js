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
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
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

    function setMode(next) {
      if (next === mode) return;
      var prev = mode;
      mode = next;
      if (timer) clearTimeout(timer);

      // FREE -> HALO is the "develop": the minted card WIPES IN top->bottom over
      // the free card beneath, a developer bar riding the reveal edge — like a
      // print coming up in the tray. Same card geometry in both layers, so only
      // the treatment (matte -> minted + glow) develops. Savor it (~1.5s + settle).
      if (prev === "free" && next === "halo") {
        free.classList.add("is-shown");   // free stays beneath during the wipe
        halo.classList.add("is-shown");   // minted card on top, clip-revealed
        photo.classList.remove("is-shown");
        el.classList.remove("is-developing");
        void el.offsetWidth;              // restart the wipe + the developer bar
        el.classList.add("is-developing");
        var ddur = motionOff() ? 0 : 3000;  // BR-S134 M1: savored develop (>= the 3000ms tonal/fix-bloom)
        timer = setTimeout(function () {
          el.classList.remove("is-developing");
          free.classList.remove("is-shown"); // free now fully covered — drop it
          if (onMorphDone) onMorphDone(next);
        }, ddur);
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
      destroy: function () { if (timer) clearTimeout(timer); el.remove(); },
    };
  };
})();
