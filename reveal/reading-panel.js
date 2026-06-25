/* =====================================================================
   BLUE ROOM — Staged Card Reveal · UNIT 3/7 ReadingPanel (BR-S124)
   props in : { reading, onWriteInComplete }
   methods  : setReading(reading), play(cb)
   events   : onWriteInComplete (via play's cb)
   owns     : the write-in ripple timeline; renders ON the room surface
              (no card/border of its own).
   ONE component, TWO datasets: fed freeReading, then haloReading. The
   reserved (scribbled) vs developed (ink) dossier render from the same
   markup, driven by reading.dossierState.
   ===================================================================== */
(function () {
  window.BRReveal = window.BRReveal || {};
  function motionOff() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function pips(level) {
    var out = "";
    for (var i = 0; i < 5; i++) out += '<span class="rv-pip' + (i < level ? " is-on" : "") + '"></span>';
    return out;
  }
  function meterRow(m) {
    return (
      '<div class="rv-meter" data-writein>' +
      '<span class="rv-meter__glyph" aria-hidden="true">◆</span>' +
      '<span class="rv-meter__name">' + esc(m.name) + "</span>" +
      '<span class="rv-meter__right">' +
      '<span class="rv-meter__pips" aria-hidden="true">' + pips(m.level) + "</span>" +
      '<span class="rv-meter__tag">' + esc(m.tag) + "</span>" +
      "</span>" +
      "</div>"
    );
  }

  function html(r) {
    var developed = r.dossierState === "developed";
    var h = "";
    h += '<h2 class="rv-read__headline">' + esc(r.headline) + "</h2>";
    h += '<div class="rv-read__engine"><span class="rv-dot"></span>' +
      esc(r.engine === "halo" ? "Halo engine · developed" : "Free engine · complete") + "</div>";

    // left instrument
    var li = r.leftInstrument || {};
    h += '<div class="rv-row" data-writein>' +
      '<div class="rv-row__head"><span class="rv-row__label">' + esc(li.label) + "</span>" +
      '<span class="rv-row__label">' + esc(li.reach || "") + "</span></div>" +
      '<div class="rv-row__val">' + esc(li.body) + "</div></div>";

    // the four ◆ core meters
    h += '<div class="rv-meters">';
    (r.coreMeters || []).forEach(function (m) { h += meterRow(m); });
    h += "</div>";

    // signal note (italic voice)
    var sn = r.signalNote || {};
    h += '<div class="rv-row" data-writein>' +
      '<div class="rv-row__val rv-row__val--note">' + esc(sn.line) + "</div>" +
      '<div class="rv-row__label" style="margin-top:6px">' + esc(sn.filed) + "</div></div>";

    // right-panel rows
    ((r.rightPanel && r.rightPanel.rows) || []).forEach(function (row) {
      h += '<div class="rv-row" data-writein>' +
        '<div class="rv-row__head"><span class="rv-row__label">' + esc(row.label) + "</span></div>" +
        '<div class="rv-row__val">' + esc(row.val) + "</div></div>";
    });

    // below-card dossier — reserved (scribbled) | developed (ink)
    h += '<div class="rv-dossier">';
    h += '<div class="rv-dossier__seam">' + (developed ? "The developed record" : "Sealed back · reserved") + "</div>";
    if (!developed) {
      h += '<div class="rv-slot__taprow"><span class="rv-slot__tap">▸ Tap to develop</span></div>';
    }
    (r.dossierSlots || []).forEach(function (s) {
      if (developed) {
        h += '<div class="rv-slot rv-slot--developed" data-writein>' +
          '<div class="rv-slot__name">' + esc(s.name) + "</div>" +
          '<div class="rv-slot__body">' + esc(s.body) +
          (s.metric ? ' <span class="rv-slot__metric">' + esc(s.metric) + "</span>" : "") +
          "</div></div>";
      } else {
        h += '<div class="rv-slot rv-slot--reserved" data-writein>' +
          '<div class="rv-slot__name">' + esc(s.name) + "</div>" +
          '<div class="rv-slot__body">' + esc(s.body) + "</div>" +
          '<svg class="rv-scribble" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">' +
          '<path style="--len:212" d="M2 7 q40 -5 80 -2 q50 3 116 -1" /></svg>' +
          "</div>";
      }
    });
    h += "</div>";

    // closing beat
    h += '<div class="rv-read__close" data-writein>' + esc(r.closingBeat) + "</div>";
    return h;
  }

  window.BRReveal.ReadingPanel = function (opts) {
    opts = opts || {};
    var el = document.createElement("div");
    el.className = "rv-read";

    var fbTimer = null; // the write-in completion fallback; cleared on re-play/re-read so a stale cb can't fire

    function setReading(r) {
      if (fbTimer) { clearTimeout(fbTimer); fbTimer = null; }
      el.dataset.engine = r.engine;
      el.innerHTML = html(r);
    }

    function play(cb) {
      if (fbTimer) { clearTimeout(fbTimer); fbTimer = null; }
      var items = Array.prototype.slice.call(el.querySelectorAll("[data-writein]"));
      items.forEach(function (n, i) { n.style.setProperty("--i", i); });

      if (motionOff() || !items.length) {
        items.forEach(function (n) { n.classList.add("is-writing"); });
        if (cb) cb();
        return;
      }
      // Commit the base (opacity:0) styles, then start the keyframes
      // synchronously. NOT via requestAnimationFrame — rAF is throttled in
      // background tabs and paused in some preview/headless contexts, which
      // would strand the rows invisible. A forced reflow gives a clean start.
      void el.offsetWidth;
      items.forEach(function (n) { n.classList.add("is-writing"); });

      var fired = false;
      function fire() { if (fired) return; fired = true; if (fbTimer) { clearTimeout(fbTimer); fbTimer = null; } if (cb) cb(); }
      var last = items[items.length - 1];
      last.addEventListener("animationend", fire, { once: true });
      // belt-and-suspenders fallback if animationend is missed (kept on fbTimer so a re-read cancels it)
      fbTimer = setTimeout(fire, items.length * 70 + 560 + 280);
    }

    if (opts.reading) setReading(opts.reading);
    return { el: el, setReading: setReading, play: play, destroy: function () { el.remove(); } };
  };
})();
