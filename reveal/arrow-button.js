/* =====================================================================
   BLUE ROOM — Staged Card Reveal · UNIT 1/4 ArrowButton (BR-S124)
   props in : { variant:'grey'|'purple', disabled:bool, label, onClick }
   events   : onClick
   owns     : bent-right shape, hover (darken + present), purple pulse/glow
   A child component. It NEVER knows the global stage — the parent decides
   what a click means and toggles variant/disabled.
   ===================================================================== */
(function () {
  window.BRReveal = window.BRReveal || {};

  window.BRReveal.ArrowButton = function (opts) {
    opts = opts || {};
    var onClick = opts.onClick;

    var el = document.createElement("button");
    el.type = "button";
    el.className = "rv-arrow";
    el.dataset.variant = opts.variant || "grey";
    el.setAttribute("aria-label", opts.label || "Continue");
    el.innerHTML =
      '<svg class="rv-arrow__svg" viewBox="0 0 28 28" aria-hidden="true">' +
      '<path d="M5.5 14 H20.5 M14 8 L20.5 14 L14 20" />' +
      "</svg>";
    if (opts.disabled) el.setAttribute("aria-disabled", "true");

    el.addEventListener("click", function (e) {
      if (el.getAttribute("aria-disabled") === "true") {
        e.preventDefault();
        return;
      }
      if (onClick) onClick(e);
    });

    function update(next) {
      next = next || {};
      if (next.variant) el.dataset.variant = next.variant;
      if (typeof next.disabled === "boolean") {
        if (next.disabled) el.setAttribute("aria-disabled", "true");
        else {
          el.removeAttribute("aria-disabled");
          el.classList.remove("is-gone");
        }
      }
      if (next.label) el.setAttribute("aria-label", next.label);
    }

    return { el: el, update: update, destroy: function () { el.remove(); } };
  };
})();
