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
      ["free", "halo", "photo"].forEach(function (n) {
        byName[n].classList.toggle("is-shown", n === next);
      });
      // the re-develop scan sweep runs only free -> halo
      if (prev === "free" && next === "halo") {
        el.classList.remove("is-scanning");
        void el.offsetWidth; // force reflow so the sweep restarts
        el.classList.add("is-scanning");
      }
      if (timer) clearTimeout(timer);
      var dur = motionOff() ? 0 : 820;
      timer = setTimeout(function () {
        el.classList.remove("is-scanning");
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
