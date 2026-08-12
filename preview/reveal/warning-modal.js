/* =====================================================================
   BLUE ROOM — Staged Card Reveal · UNIT 5 WarningModal (BR-S124)
   props in : { copy:{kicker,body,confirm,dismiss}, onConfirm, onDismiss }
   methods  : open(), close()
   events   : onConfirm ("No — let me see" -> deeper room),
              onDismiss ("Alright" -> stay; the easy default)
   owns     : backdrop blur, Esc + outside-click, focus trap.
   Mounts body-level (escapes the surface overflow), like the live
   lightbox/mintscrim. NO real payment — this is the later paywall hook.
   ===================================================================== */
(function () {
  window.BRReveal = window.BRReveal || {};

  window.BRReveal.WarningModal = function (opts) {
    opts = opts || {};
    var copy = opts.copy || {};
    var onConfirm = opts.onConfirm;
    var onDismiss = opts.onDismiss;

    var el = document.createElement("div");
    el.className = "rv-modal";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-hidden", "true");
    el.setAttribute("aria-labelledby", "rvModalKicker rvModalBody");   // M6: label = kicker then body
    el.innerHTML =
      '<div class="rv-modal__backdrop" data-rv-dismiss></div>' +
      '<div class="rv-modal__panel" role="document">' +
      '<p class="rv-modal__kicker" id="rvModalKicker">' + escAttr(copy.kicker) + "</p>" +
      '<p class="rv-modal__body" id="rvModalBody">' + escAttr(copy.body) + "</p>" +
      '<div class="rv-modal__row">' +
      '<button type="button" class="rv-btn rv-btn--quiet" data-rv-confirm>' + escAttr(copy.confirm) + "</button>" +
      '<button type="button" class="rv-btn rv-btn--default" data-rv-dismiss-btn>' + escAttr(copy.dismiss) + "</button>" +
      "</div></div>";
    document.body.appendChild(el);

    var lastFocus = null;

    function open() {
      if (el.classList.contains("is-open")) return; // ignore repeat opens (no listener pile-up)
      lastFocus = document.activeElement;
      el.classList.add("is-open");
      el.setAttribute("aria-hidden", "false");
      document.addEventListener("keydown", onKey, true);
      requestAnimationFrame(function () {
        var d = el.querySelector("[data-rv-dismiss-btn]");
        if (d) d.focus();
      });
    }
    function close() {
      el.classList.remove("is-open");
      el.setAttribute("aria-hidden", "true");
      document.removeEventListener("keydown", onKey, true);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function onKey(e) {
      if (!el.isConnected) { document.removeEventListener("keydown", onKey, true); return; } // self-heal an orphaned listener after a re-mount
      if (!el.classList.contains("is-open")) return;
      if (e.key === "Escape") { e.preventDefault(); dismiss(); }
      else if (e.key === "Tab") { trap(e); }
    }
    function trap(e) {
      var f = el.querySelectorAll("button");
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    function confirm() { close(); if (onConfirm) onConfirm(); }
    function dismiss() { close(); if (onDismiss) onDismiss(); }

    el.addEventListener("click", function (e) {
      if (e.target.closest("[data-rv-confirm]")) confirm();
      else if (e.target.closest("[data-rv-dismiss-btn]") || e.target.closest("[data-rv-dismiss]")) dismiss();
    });

    return {
      el: el,
      open: open,
      close: close,
      destroy: function () { document.removeEventListener("keydown", onKey, true); el.remove(); },
    };
  };

  function escAttr(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
})();
