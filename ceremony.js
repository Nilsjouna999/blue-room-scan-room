/* =============================================================
   THE CEREMONY — the arcana forge ceremony (BR-S163)
   Renders the builder's EXACT reference art (pixel-perfect, screen-blended) and
   layers ambient life over it (forge breath, smoke, sky-omen shimmer, embers,
   stars) — none of which alter the art. Exposes window.BRCeremony; mounted by
   app.js mountDev() on ?dev=ceremony. The reference's baked caption + corner
   labels stay pixel-perfect; invisible buttons over the corners keep them live.
============================================================= */
(function () {
  "use strict";

  function smokeSVG() {
    return '<svg viewBox="0 0 20 60" aria-hidden="true"><path d="M10 58 q-6 -9 0 -19 q6 -10 0 -20 q-5 -8 0 -16"/></svg>';
  }

  function mount(host, opts) {
    opts = opts || {};
    var embers = "";
    for (var i = 0; i < 8; i++) {
      var l = 77 + ((i * 3.3) % 14), t = 66 + ((i * 5) % 9), ex = ((i % 3) - 1) * 11, d = (i * 0.42).toFixed(2);
      embers += '<span style="left:' + l + "%;top:" + t + "%;--ex:" + ex + "px;animation-delay:" + d + 's"></span>';
    }
    var starPos = [[16, 30], [30, 17], [45, 11], [62, 19], [74, 13], [24, 57], [8, 42], [88, 25], [39, 40]];
    var stars = starPos.map(function (p, k) {
      return '<span style="left:' + p[0] + "%;top:" + p[1] + "%;animation-delay:" + (k * 0.5) + 's"></span>';
    }).join("");

    host.innerHTML =
      '<div class="ceremony" data-ceremony>' +
        '<div class="cer-stage">' +
          '<img class="cer-scene" src="assets/arcana/ceremony/ceremony-scene.png" alt="The commission is accepted — the smith reads it twice; it is a crown." />' +
          '<span class="cer-fx cer-forgeglow"></span>' +
          '<span class="cer-fx cer-omenglow"></span>' +
          '<span class="cer-fx cer-cardglow"></span>' +
          '<span class="cer-fx cer-smoke">' + smokeSVG() + smokeSVG() + "</span>" +
          '<span class="cer-fx cer-embers">' + embers + "</span>" +
          '<span class="cer-fx cer-stars">' + stars + "</span>" +
          '<button type="button" class="cer-btn cer-btn--back" data-view-to="menu" aria-label="Back to readings"></button>' +
          '<button type="button" class="cer-btn cer-btn--skip" data-cer-skip aria-label="Skip the ceremony"></button>' +
        "</div>" +
      "</div>";

    var root = host.querySelector(".ceremony");
    var skip = root.querySelector("[data-cer-skip]");
    // "Skip the ceremony" / done → on into the reading (the result room). data-view-to
    // on the back button is handled by the app's delegated nav.
    if (skip) skip.addEventListener("click", function () {
      if (opts.onDone) opts.onDone();
      else location.href = "?dev=arcana-result";
    });
    return { destroy: function () {} };
  }

  window.BRCeremony = { mount: mount };
})();
