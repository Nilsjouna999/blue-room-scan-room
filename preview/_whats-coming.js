/* ═══════════════════════════════════════════════════════════════════════════
   WHAT'S COMING — the forward ledger, lifted out of U1 into its own popup.

   The builder: "and this transferred to whats coming pop up or seperate page.
   and new page as u1." Second half of emptying U1 — `_rooms-u1.js` took the
   open doors into ROOMS, this takes the board.

   ★ SAME TECHNIQUE, AND FOR THE SAME REASON: it CLONES `#about .u1board`
   rather than re-implementing u1Column(). The board is already rendered in the
   menu DOM, so the popup and U1 cannot drift, the three horizon columns keep
   their own chips and ledes, and the aside box comes along for free.

   ★ AND IT PROVES THE MOVE BEFORE ANYTHING IS DELETED. The builder's condition
   was "IF our new page works well, we might delete this from u1" — cloning
   means both exist at once while that is judged. Nothing leaves U1 until this
   has been lived with.

   NOTHING TRACKED IS TOUCHED. Overlay only.
   ═══════════════════════════════════════════════════════════════════════════ */
(function (root) {
  "use strict";

  var CSS = ""
    + ".wcpop{position:fixed;inset:0;z-index:210;display:flex;align-items:center;"
    +   "justify-content:center;opacity:0;pointer-events:none;transition:opacity 220ms ease}"
    + ".wcpop.is-in{opacity:1;pointer-events:auto}"
    /* the same depth-of-field the ROOMS sheet got — composited, never animated */
    + ".wcpop__scrim{position:absolute;inset:0;background:rgba(14,12,10,.90);"
    +   "backdrop-filter:blur(20px) saturate(.85);-webkit-backdrop-filter:blur(20px) saturate(.85)}"
    + ".wcpop__sheet{position:relative;width:min(1180px,92vw);max-height:86vh;overflow:auto;"
    +   "padding:clamp(18px,3vh,34px) clamp(16px,3vw,40px)}"
    + ".wcpop__head{display:flex;align-items:baseline;gap:12px;margin:0 0 clamp(10px,2vh,20px)}"
    + ".wcpop__t{font-family:var(--font-mono);font-size:10px;letter-spacing:.2em;"
    +   "text-transform:uppercase;color:#6e6b63;margin:0}"
    + ".wcpop__n{font-family:var(--font-mono);font-size:10px;letter-spacing:.14em;color:#4f4c46}"
    + ".wcpop__x{position:absolute;top:10px;right:14px;background:none;border:0;cursor:pointer;"
    +   "font-family:var(--font-mono);font-size:11px;letter-spacing:.16em;color:#6e6b63;padding:6px 8px}"
    + ".wcpop__x:hover{color:#dcd7cb}"
    /* the board arrives rather than appearing — same 26ms beat as the doors */
    + ".wcpop .u1col,.wcpop .u1aside{opacity:0;translate:0 10px;"
    +   "transition:opacity 320ms cubic-bezier(.2,.7,.3,1),translate 320ms cubic-bezier(.2,.7,.3,1);"
    +   "transition-delay:var(--od,0ms)}"
    + ".wcpop.is-in .u1col,.wcpop.is-in .u1aside{opacity:1;translate:0 0}"
    + "@media (prefers-reduced-motion:reduce){.wcpop,.wcpop .u1col,.wcpop .u1aside{transition:none}}";

  var docRef = null, pop = null;

  function style(d) {
    if (d.getElementById("__wcpop")) return;
    var s = d.createElement("style"); s.id = "__wcpop"; s.textContent = CSS;
    d.head.appendChild(s);
  }

  function close() {
    if (!pop) return;
    pop.classList.remove("is-in");
    var p = pop; pop = null;
    root.setTimeout(function () { if (p && p.parentNode) p.remove(); }, 240);
  }

  function open(d) {
    if (pop) return;
    var src = d.querySelector("#about .u1board");
    if (!src) return;                       /* U1 not mounted — let the link do its job */

    pop = d.createElement("div");
    pop.className = "wcpop";
    pop.setAttribute("role", "dialog");
    pop.setAttribute("aria-label", "What is still being made");

    var scrim = d.createElement("div"); scrim.className = "wcpop__scrim";
    var sheet = d.createElement("div"); sheet.className = "wcpop__sheet";
    var cols = src.querySelectorAll(".u1col").length;
    sheet.innerHTML = '<button type="button" class="wcpop__x">Close &times;</button>'
      + '<div class="wcpop__head"><p class="wcpop__t">&#9670; What is still being made</p>'
      + '<span class="wcpop__n">' + cols + ' horizons</span></div>';

    var board = src.cloneNode(true);
    Array.prototype.forEach.call(board.children, function (c, i) {
      c.style.setProperty("--od", (i * 26) + "ms");
    });
    sheet.appendChild(board);
    pop.appendChild(scrim); pop.appendChild(sheet);
    d.body.appendChild(pop);

    scrim.addEventListener("click", close);
    sheet.querySelector(".wcpop__x").addEventListener("click", close);
    /* same fix as _rooms-u1.js: never drive a frame's entrance from the PARENT's rAF —
       a throttled parent leaves the popup at opacity 0 and pointer-events none, i.e.
       invisible AND unclickable. Force the from-state, then set the class. */
    void pop.offsetHeight;
    pop.classList.add("is-in");
  }

  /* The rail link is an <a href="roadmap/"> (app.js:2492) and roadmap/ resolves to U1
     itself (build_routes.py:44). Intercepting it is not hiding a destination — it is
     showing the same content without a navigation. Ctrl/middle-click still opens the
     page, because a link that cannot be opened in a tab is a broken link. */
  function wire(d) {
    if (d.__wcWired) return;
    d.__wcWired = true;
    d.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href="roadmap/"], a[href="roadmap"]');
      if (!a) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault(); e.stopPropagation();
      open(d);
    }, true);
    d.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  root.WhatsComing = {
    install: function (d) { docRef = d; style(d); wire(d); return true; },
    tick: function (d) { if (d) { docRef = d; style(d); wire(d); } },
    open: function () { if (docRef) open(docRef); },
    uninstall: function () {
      close();
      if (docRef) { var s = docRef.getElementById("__wcpop"); if (s) s.remove(); docRef.__wcWired = false; }
      docRef = null;
    }
  };

  /* ★ SELF-INSTALL IN THE APP (BR-S430). Loaded from index.html the module drives its
     OWN document; the lab keeps working because install()/tick() are exported and the
     lab hands them the frame's document instead. One module, two hosts, no fork.
     It arms the interceptor on the rail's "What's coming" link, which navigates to
     roadmap/ — and roadmap/ RESOLVES TO U1 ITSELF (build_routes.py:44), so this shows
     the same content without the navigation. ?wc=0 turns it off. */
  if (root.document && !root.frameElement) {
    root.setInterval(function () {
      if (/[?&]wc=0/.test(String(root.location.search || ""))) return;
      root.WhatsComing.tick(root.document);
    }, 300);
  }
})(window);
