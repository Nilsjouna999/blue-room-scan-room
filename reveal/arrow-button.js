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
      '<svg class="rv-arrow__svg" viewBox="15 6 106 106" aria-hidden="true">' +
      '<path class="rv-arrow__out" d="M20 54 C24 28 54 14 82 26 C99 33 106 47 106 62 L120 54 L98 104 L60 80 L77 73 C76 58 66 47 51 45 C39 43 29 49 26 60 Z"/>' +
      '<line class="rv-arrow__h" x1="28" y1="54" x2="37" y2="66"/>' +
      '<line class="rv-arrow__h" x1="36" y1="42" x2="47" y2="56"/>' +
      '<line class="rv-arrow__h" x1="46" y1="35" x2="57" y2="49"/>' +
      '<line class="rv-arrow__h" x1="57" y1="31" x2="69" y2="45"/>' +
      '<line class="rv-arrow__h" x1="69" y1="31" x2="81" y2="45"/>' +
      '<line class="rv-arrow__h" x1="81" y1="35" x2="93" y2="49"/>' +
      '<line class="rv-arrow__h" x1="92" y1="44" x2="102" y2="57"/>' +
      '<line class="rv-arrow__h" x1="100" y1="53" x2="108" y2="64"/>' +
      '<line class="rv-arrow__h" x1="72" y1="76" x2="83" y2="90"/>' +
      '<line class="rv-arrow__h" x1="80" y1="68" x2="91" y2="82"/>' +
      '<line class="rv-arrow__h" x1="66" y1="82" x2="75" y2="95"/>' +
      "</svg>";
    if (opts.disabled) { el.setAttribute("aria-disabled", "true"); el.setAttribute("tabindex", "-1"); }

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
        if (next.disabled) { el.setAttribute("aria-disabled", "true"); el.setAttribute("tabindex", "-1"); }
        else {
          el.removeAttribute("aria-disabled");
          el.removeAttribute("tabindex");
          el.classList.remove("is-gone");
        }
      }
      if (next.label) el.setAttribute("aria-label", next.label);
    }

    return { el: el, update: update, destroy: function () { el.remove(); } };
  };
})();
