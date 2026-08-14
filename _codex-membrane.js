/* ═══════════════════════════════════════════════════════════════════════════
   THE MEMBRANE, ON THE OPENED CODEX — the white moving line, from below.

   The builder: "the white moving line like u1 had before but we removed it but
   i want it on opened codex from below."

   REVIVED, NOT REINVENTED. Every constant, the flow current, the spring, the
   edge feather, the stroke and the glow are lifted verbatim from
   parked/u1-membrane.js (BR-S228..S235) — the same discipline as the card:
   the effect already existed and was tuned over five passes, so this copies it
   rather than approximating it from memory.

   WHAT IS DELIBERATELY LEFT BEHIND. U1's version carried a whole apparatus this
   surface has no use for: two lines forming a slit, the opaque occluding bands,
   the scroll envelope keyed to plate positions, the box-repulsion bulge (already
   off by default — BR-S234, the builder found the deflection distracting), and
   the per-plate dissolve. What is kept is the ONE line and its ambient current.

   THE ENTRANCE IS THE ASK. "From below": at rest the line sits below the codex's
   bottom edge and is not drawn. As the aperture opens it RISES to the edge and
   inks in — so the line arrives with the codex rather than being revealed by it.
   ═══════════════════════════════════════════════════════════════════════════ */
(function (root) {
  "use strict";

  /* ── verbatim from parked/u1-membrane.js ─────────────────────────────────── */
  var STEP = 1 / 60, FOLLOW = 0.12, TENSION = 0.13, DAMP = 0.36, VMAX = 52;
  var EDGE_FEATHER = 90, STROKE_A = 0.78, GLOW_A = 0.40, GLOW_BLUR = 3;
  var FLOW_MARGIN = 6, FRAME_MARGIN = 10, DX = 12;

  function flow(x, t) {
    var breath = 0.88 + 0.12 * Math.sin(t * 0.11);
    return breath * (2.5 * Math.sin(x * 0.013 - t * 1.15)
                   + 1.35 * Math.sin(x * 0.030 + t * 0.76 + 1.3)
                   + 0.6 * Math.sin(x * 0.061 - t * 1.58 + 2.1));
  }
  function thick(x, v, t) {
    return 0.9 + 0.5 * (0.5 + 0.5 * Math.sin(x * 0.02 - t * 1.4)) + 0.05 * Math.min(6, Math.abs(v));
  }

  /* ── state ───────────────────────────────────────────────────────────────── */
  var doc = null, target = null, canvas = null, ctx = null;
  var W = 0, H = 0, DPR = 1, L = null, raf = 0, last = 0, accT = 0, t = 0;
  var env = 0, wantEnv = 0;

  /* ★★★ THE POSITION WAS WRONG, AND THE RIGHT ONE IS ALREADY WRITTEN DOWN.
     The builder: "the design is badly positioned on codex." Correct — I put the line
     on the BOTTOM EDGE of the viewport. This feature SHIPPED ONCE, as BR-S237/S238
     "THE CODEX READING FRAME", and its contract is exact:

       · ONE living white line with its baseline at  y = H * 0.955  (NOT the edge)
       · everything BELOW filled opaque #161411 -> #100f0c -> #0a0b0d — "the blue under"
       · drawn by the PARENT over the iframe, position:fixed, z-index 9990
       · the TOP line was deliberately removed by the builder at BR-S238 so the codex
         header stays visible. Do not offer it back.
       · nothing load-bearing in the bottom ~4.5vh — it is permanently masked
       · the codex answers with its own `.tide` in the same colours, so the two
         documents meet at ONE colour and the only thing on that row is the line.
         Measured seam delta: 0.000px at 900 and 1080 tall.

     Fourth time today the thing already existed. LOOK FOR THE EXISTING SYSTEM FIRST. */
  var LINE_FRAC = 0.955, RISE = 26;

  /* the occluding dark, and the gradient it is filled with. maskGrad is rebuilt on
     resize because it is authored in canvas space and must match the ground BELOW the
     line — the Codex's own bottom, not the room's. `?cmband=0` turns the band off and
     leaves the bare line, so the two can be judged against each other. */
  var BAND_ON = !/[?&]cmband=0/.test(String(root.location.search || ""));
  var maskGrad = null;

  /* ★★ THE LOOP RUNS ON THE FRAME'S CLOCK, NOT THE PARENT'S. Third time today this
     exact bug has appeared (see _rooms-u1.js and _whats-coming.js): a module installed
     FROM the parent INTO the frame must animate on the frame's own requestAnimationFrame.
     The canvas lives in the frame; the parent may be throttled, backgrounded, or a pane
     that has stopped compositing — a documented trap here — and then the loop never
     ticks. Measured: canvas sized 1265x96, positioned correctly, env forced to 1, and
     ZERO lit pixels, because frame() was never called.
     RAF() resolves the frame's window every call rather than caching it, because the
     document is replaced on navigation and a cached window would go stale. */
  function RAF(fn){ return ((doc && doc.defaultView) || root).requestAnimationFrame(fn); }
  function CAF(id){ return ((doc && doc.defaultView) || root).cancelAnimationFrame(id); }

  function ensure() {
    if (canvas) return;
    canvas = doc.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText = "position:fixed;inset:0;z-index:9990;pointer-events:none;";
    doc.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
  }

  /* ★ CORRECTED AFTER READING THE BLOOM'S CSS (styles.css:4721). My first version
     measured #codexBloom's bounding box every frame, on the assumption the aperture
     animates its box open. It does not: the bloom is `position:fixed; inset:0` and
     opens by growing a CLIP-PATH CIRCLE. So its rect is the whole viewport from the
     first frame to the last, and "the bottom edge of the opened codex" is simply the
     bottom of the screen — there is no moving box to ride.
     That also means the open signal is not the bloom's own aria-hidden but
     `#menuView.is-codex-open` (styles.css:4748), which is what drives the iris. */
  function place() {
    var vw = (doc.defaultView.innerWidth || 0), vh = (doc.defaultView.innerHeight || 0);
    if (vw < 8 || vh < 8) return false;
    DPR = Math.min(2, root.devicePixelRatio || 1);
    if (vw !== W || vh !== H) {
      W = vw; H = vh;
      canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      lattice();
      /* ★★ THE UNDER MATCHES THE MAIN MENU, FLAT. The builder: "on below codexes white
         line should be same backround color than main menu too."
         The shipped BR-S237 band ran #161411 -> #100f0c -> #0a0b0d across its 4.5vh, and
         that is why it read as a different colour: those are the MENU'S OWN three stops,
         and #161411 is the warm key light that belongs at the TOP of the screen. The
         menu's ground is
             radial-gradient(110% 80% at 50% -10%, #161411, var(--ink-900) 55%, var(--ink-950))
         with background-attachment: fixed (styles.css:77-82) — a key light hung above and
         behind the viewer. By y = 0.955H that radial has fallen all the way off, so what
         the menu actually shows at the height of this line is --ink-950, flat.
         Painting the top-of-screen warmth at the bottom of the page was the mismatch.
         Reading the live value rather than hardcoding it, so a palette change carries. */
      var ink = "#0a0b0d";
      try {
        var v = doc.defaultView.getComputedStyle(doc.documentElement).getPropertyValue("--ink-950").trim();
        if (v) ink = v;
      } catch (e) {}
      var g = ctx.createLinearGradient(0, H * LINE_FRAC, 0, H);
      g.addColorStop(0, ink); g.addColorStop(1, ink);
      maskGrad = g;
    }
    canvas.style.transform = "translate(0px,0px)";
    return true;
  }

  function lattice() {
    var N = Math.ceil(W / DX) + 1, xs = new Float32Array(N), i;
    for (i = 0; i < N; i++) xs[i] = i * DX;
    xs[N - 1] = W;
    L = { N: N, xs: xs, y: new Float32Array(N), v: new Float32Array(N),
          tgt: new Float32Array(N), baseY: H * LINE_FRAC };
  }

  /* integrate() — the U1 spring, with the LOWER line's clamp (outward = +y, down),
     because this line sits at a bottom edge exactly as that one did. */
  function integrate() {
    var N = L.N, y = L.y, v = L.v, tgt = L.tgt, i;
    for (i = 1; i < N - 1; i++) {
      var lap = y[i - 1] + y[i + 1] - 2 * y[i];
      var acc = FOLLOW * (tgt[i] - y[i]) + TENSION * lap - DAMP * v[i];
      var nv = v[i] + acc;
      if (nv > VMAX) nv = VMAX; else if (nv < -VMAX) nv = -VMAX;
      v[i] = nv;
    }
    var hi = (H - FRAME_MARGIN) - L.baseY;
    for (i = 1; i < N - 1; i++) {
      var yl = y[i] + v[i];
      if (yl < -FLOW_MARGIN) { yl = -FLOW_MARGIN; if (v[i] < 0) v[i] = 0; }
      else if (yl > hi) { yl = hi; if (v[i] > 0) v[i] = 0; }
      y[i] = yl;
    }
    y[0] = 0; y[N - 1] = 0;
  }

  function edgeGrad(alpha) {
    var g = ctx.createLinearGradient(0, 0, W, 0), e = Math.min(0.18, EDGE_FEATHER / Math.max(1, W));
    g.addColorStop(0, "rgba(255,255,255,0)");
    g.addColorStop(e, "rgba(255,255,255," + alpha + ")");
    g.addColorStop(1 - e, "rgba(255,255,255," + alpha + ")");
    g.addColorStop(1, "rgba(255,255,255,0)");
    return g;
  }

  /* drawLine — the same two passes as the original: a feathered fill at .10 that
     gives the line a body, then the quadratic-midpoint stroke at 1.1px with the
     glow. `off` is the rise: at env 0 the whole contour sits RISE px lower. */
  /* ★★ THE OCCLUDING BAND — the half that makes it a MEMBRANE and not a white line.
     The builder, confirming which effect this is: "one of the older u1 design where
     there was 2 white lines top and bottom that was moving on that design".
     That is parked/u1-membrane.js exactly: `lines=[mk(UPPER_FRAC), mk(LOWER_FRAC)]` at
     0.04H and 0.96H (BR-S229 pushed them near the frame), and — the part that matters —
     drawBand() fills from each line's own contour OUT to the frame edge with a
     background-matched gradient. Its note: "two OPAQUE occluding bands that turn the
     living band between the lines into a SLIT you look through. Everything BEYOND each
     line goes to the page's own dark, so a relic surfaces up out of the dark into the
     opening and sinks back as it passes a line."
     Without this the line decorates an edge. With it the line IS the edge, and the
     Codex's own entries sink as they cross it. Same quadratic-midpoint contour as the
     stroke, so the dark and the lit lip are the same curve and can never separate. */
  function band() {
    var N = L.N, xs = L.xs, y = L.y, base = L.baseY, i, c, pc, xm, ym;
    var off = (1 - env) * RISE;
    ctx.globalAlpha = 1; ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.moveTo(xs[0], base + y[0] + off);
    for (i = 1; i < N; i++) {
      pc = base + y[i - 1] + off; c = base + y[i] + off;
      xm = (xs[i - 1] + xs[i]) / 2; ym = (pc + c) / 2;
      ctx.quadraticCurveTo(xs[i - 1], pc, xm, ym);
    }
    ctx.lineTo(xs[N - 1], base + y[N - 1] + off);
    ctx.lineTo(W, H); ctx.lineTo(0, H);        /* out to the bottom edge — this is a LOWER line */
    ctx.closePath();
    ctx.fillStyle = maskGrad || "#0a0b0d";
    ctx.fill();
  }

  function draw() {
    var N = L.N, xs = L.xs, y = L.y, v = L.v, base = L.baseY, i, th, c;
    var off = (1 - env) * RISE;
    ctx.clearRect(0, 0, W, H);
    if (env <= 0.002) return;
    if (BAND_ON) band();                        /* the dark first, then the lit lip on top */

    ctx.beginPath();
    for (i = 0; i < N; i++) { c = base + y[i] + off; th = thick(xs[i], v[i], t); ctx.lineTo(xs[i], c - th); }
    for (i = N - 1; i >= 0; i--) { c = base + y[i] + off; th = thick(xs[i], v[i], t); ctx.lineTo(xs[i], c + th); }
    ctx.closePath(); ctx.fillStyle = edgeGrad(0.10 * env); ctx.fill();

    ctx.beginPath();
    ctx.moveTo(xs[0], base + y[0] + off);
    for (i = 1; i < N; i++) {
      var pcy = base + y[i - 1] + off, ccy = base + y[i] + off;
      ctx.quadraticCurveTo(xs[i - 1], pcy, (xs[i - 1] + xs[i]) / 2, (pcy + ccy) / 2);
    }
    ctx.lineTo(xs[N - 1], base + y[N - 1] + off);
    ctx.strokeStyle = edgeGrad(STROKE_A * env);
    ctx.lineWidth = 1.1; ctx.lineJoin = "round";
    ctx.shadowColor = "rgba(255,255,255," + (GLOW_A * env).toFixed(3) + ")";
    ctx.shadowBlur = GLOW_BLUR;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  /* FIXED TIMESTEP. Variable dt is what makes a spring explode on a slow frame —
     the same rule the ROOMS field is built on. And the loop PARKS: when the codex
     is closed and the line has faded out there is nothing to integrate. */
  function frame(now) {
    raf = 0;
    if (!last) last = now;
    var dt = Math.min(0.05, (now - last) / 1000); last = now;
    env += (wantEnv - env) * Math.min(1, dt * 5.5);

    if (env <= 0.002 && wantEnv === 0) { if (ctx) ctx.clearRect(0, 0, W, H); last = 0; return; }
    if (!place()) { raf = RAF(frame); return; }

    accT += dt;
    while (accT >= STEP) {
      t += STEP;
      for (var i = 0; i < L.N; i++) L.tgt[i] = flow(L.xs[i], t);
      integrate();
      accT -= STEP;
    }
    draw();
    raf = RAF(frame);
  }
  function kick() { if (!raf) raf = RAF(frame); }

  /* ★★ PAINT ONE FRAME SYNCHRONOUSLY, THEN ANIMATE. Diagnosed by driving it: the canvas
     is created, sized 1898x144 and positioned correctly, the 2D context is live (a
     control fillRect lit 1800 px) — and the line never appeared, because the FRAME'S
     requestAnimationFrame ticked ZERO times in 600ms. The pane had stopped compositing
     the iframe, which is this project's oldest documented trap: "the preview pane cannot
     screenshot — it stops compositing when not displayed", and the wheel notes say the
     same about judging motion.
     So the loop was never the problem and neither was the drawing. But a design that is
     INVISIBLE whenever rAF is throttled is fragile beyond the lab — so open() now sets
     the envelope and paints a frame immediately. Worst case the line is present and
     still; best case the loop takes over and it flows. It also removes the fade-up from
     nothing if the first frame is late. */
  function open(on) {
    wantEnv = on ? 1 : 0;
    if (on) {
      ensure();
      place();
      env = Math.max(env, 0.001);
      if (L) { for (var i = 0; i < L.N; i++) L.tgt[i] = flow(L.xs[i], t); integrate(); }
      env = 1; draw(); env = 0.001;      /* one honest frame at full presence, then let the ramp own it */
    }
    kick();
  }

  root.CodexMembrane = {
    install: function (d, sel) {
      doc = d;
      target = d.querySelector(sel || "#codexBloom") || d.documentElement;
      if (!target) return false;
      ensure(); place();
      /* ★ WATCH #menuView, NOT THE BLOOM. `is-codex-open` on the menu host is what
         drives the iris (styles.css:4748) and is set for the whole open state; the
         bloom's own aria-hidden is set once and is a weaker signal. */
      var host = d.getElementById("menuView");
      if (!host) return true;      /* standalone codex — no aperture to watch, open() is called directly */
      function isOpen() {
        return host.classList.contains("is-codex-open")
          && !host.classList.contains("is-codex-closing");
      }
      new root.MutationObserver(function () { open(isOpen()); })
        .observe(host, { attributes: true, attributeFilter: ["class"] });
      open(isOpen());
      d.defaultView.addEventListener("resize", function () { W = 0; place(); });
      return true;
    },
    open: open,
    uninstall: function () {
      wantEnv = 0;
      if (raf) { CAF(raf); raf = 0; }
      if (canvas) { canvas.remove(); canvas = null; ctx = null; L = null; W = 0; }
    }
  };

  /* ★ SELF-INSTALL IN THE APP. The builder: "i expect atleast dev host to get
     implemented when i ask you to do something, not some random host." Correct, and
     the fix is this block: loaded from index.html the module installs ITSELF against
     its own document, so the effect is simply THERE on the dev site. The lab keeps
     working because CodexMembrane.install() is still exported and idempotent — the
     lab hands it the frame's document instead. One module, two hosts, no fork.
     ?cm=0 turns it off. */
  if (root.document && !root.frameElement) {
    var boot = function () {
      if (/[?&]cm=0/.test(String(root.location.search || ""))) return true;
      var d = root.document;
      /* ★ TWO HOSTS, AND THE SECOND ONE IS WHY THE BUILDER STILL SAW NOTHING.
         index.html has the APERTURE — a #codexBloom that irises open over the menu.
         But every other way into the Codex is a plain <a href="codex.html"> (the two
         orbs at app.js:1179/1181, the registry CTA at :1466, the placard at :2693),
         which NAVIGATES. On that page there is no bloom, no menu, and no parent — so
         a module that waits for #codexBloom installs nowhere, which is exactly what
         happened. codex.html already carries its own `.tide` (the codex's half of the
         BR-S237 contract); what it never had was the line above it, because the line
         was always the parent's job and the parent is gone.
         Standalone: install and open immediately — the page IS the opened codex. */
      if (d.getElementById("codexBloom")) { root.CodexMembrane.install(d); return true; }
      if (d.querySelector(".tide") || /codex/i.test(d.title || "")) {
        root.CodexMembrane.install(d, ":root");
        root.CodexMembrane.open(true);
        return true;
      }
      return false;
    };
    if (!boot()) {
      /* the aperture is appended by app.js at mount, so it may not exist yet */
      var tries = 0, iv = root.setInterval(function () {
        if (boot() || ++tries > 40) root.clearInterval(iv);
      }, 150);
    }
  }
})(window);
