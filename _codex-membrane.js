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

  /* THE BAND. The canvas is only as tall as the line needs: the crest, the glow and
     the RISE distance. A full-viewport overlay (what U1 used, because it drew two
     lines a screen apart) would put a compositing layer over the whole codex for a
     26px effect. */
  var BAND = 96, RISE = 26;

  function ensure() {
    if (canvas) return;
    canvas = doc.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText = "position:fixed;left:0;top:0;z-index:9991;pointer-events:none;";
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
    if (!target) return false;
    var r = target.getBoundingClientRect();
    if (r.width < 8 || r.height < 8) return false;
    DPR = Math.min(2, root.devicePixelRatio || 1);
    var w = Math.round(r.width), h = BAND;
    if (w !== W || h !== H) {
      W = w; H = h;
      canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      lattice();
    }
    canvas.style.transform = "translate(" + Math.round(r.left) + "px,"
      + Math.round(r.bottom - BAND * 0.5) + "px)";
    return true;
  }

  function lattice() {
    var N = Math.ceil(W / DX) + 1, xs = new Float32Array(N), i;
    for (i = 0; i < N; i++) xs[i] = i * DX;
    xs[N - 1] = W;
    L = { N: N, xs: xs, y: new Float32Array(N), v: new Float32Array(N),
          tgt: new Float32Array(N), baseY: BAND * 0.5 };
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
  function draw() {
    var N = L.N, xs = L.xs, y = L.y, v = L.v, base = L.baseY, i, th, c;
    var off = (1 - env) * RISE;
    ctx.clearRect(0, 0, W, H);
    if (env <= 0.002) return;

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
    if (!place()) { raf = root.requestAnimationFrame(frame); return; }

    accT += dt;
    while (accT >= STEP) {
      t += STEP;
      for (var i = 0; i < L.N; i++) L.tgt[i] = flow(L.xs[i], t);
      integrate();
      accT -= STEP;
    }
    draw();
    raf = root.requestAnimationFrame(frame);
  }
  function kick() { if (!raf) raf = root.requestAnimationFrame(frame); }

  function open(on) {
    wantEnv = on ? 1 : 0;
    if (on) { ensure(); if (!L) { place(); } }
    kick();
  }

  root.CodexMembrane = {
    install: function (d, sel) {
      doc = d;
      target = d.querySelector(sel || "#codexBloom");
      if (!target) return false;
      ensure(); place();
      /* ★ WATCH #menuView, NOT THE BLOOM. `is-codex-open` on the menu host is what
         drives the iris (styles.css:4748) and is set for the whole open state; the
         bloom's own aria-hidden is set once and is a weaker signal. */
      var host = d.getElementById("menuView") || d.body;
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
      if (raf) { root.cancelAnimationFrame(raf); raf = 0; }
      if (canvas) { canvas.remove(); canvas = null; ctx = null; L = null; W = 0; }
    }
  };
})(window);
