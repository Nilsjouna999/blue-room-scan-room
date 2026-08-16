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
  var EDGE_FEATHER = 90, STROKE_A = 0.78, GLOW_A = 0.20, GLOW_BLUR = 2;
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
  /* BR-S507 — see the ramp in frame(). HOLD_MS and RATE_IN are the aperture's own
     `120ms delay, 340ms rise` restated as an envelope; RATE_OUT keeps the departure at
     the speed it has always had. */
  var hold = 0, HOLD_MS = 120, RATE_IN = 3.2, RATE_OUT = 5.5;

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

  /* ★ AND THE CODEX'S OWN STATIC BANDS ARE SWITCHED OFF WHERE THIS ONE RUNS. Two
     surfaces cannot own one edge — the CSS ones cannot follow a wave, so they go and
     the canvas keeps it. Injected rather than edited into codex.html so the effect and
     its suppression live in the same file and can be removed together. */
  /* ★★ BR-S502 — .shallows AND .floorlight WERE MISSING FROM THIS LIST, AND THEY ARE THE
     RESIDUE THE BUILDER KEEPS SEEING ABOVE THE LINE.
     The builder: "it still feels or seems like there is blue residue above white line...
     it does not read smooth and definate."

     The diagnosis was already written twenty lines below this one — "a straight edge and
     a curve can never agree, so wherever the wave sits away from 0.955H a strip of the
     static band is either exposed above the line or clipped below it... it was never a
     colour, it was a shape that does not move." That reasoning was right. The list built
     from it was incomplete: it named .tide and .shore, and the codex has FOUR bands at
     that edge, not two.

     Measured in the live document at H=900, line at y=860:
       .shallows    fixed, z 6, bottom:var(--tide) -> its bottom edge sits EXACTLY on 860,
                    an 81px gradient ending in a straight line the wave crosses all day.
       .floorlight  fixed, z 8, bottom:calc(var(--tide) - 4px) -> it deliberately STRADDLES
                    the line by 4px, and it is a pale radial (233,229,220) — so where the
                    wave dips below the baseline, a cool strip of it is left standing above
                    the white line against the dark band. On a near-black ground a faint
                    warm-white haze reads exactly as the blue-grey residue reported.

     Both suppressed on the same terms as the other two, and only while this canvas runs:
     one surface owns one edge. Removing the module removes the suppression with it. */
  function suppressStatic(d) {
    if (d.getElementById("__cmsuppress")) return;
    var st = d.createElement("style"); st.id = "__cmsuppress";
    st.textContent = ".tide{background:none!important}.tide::before{opacity:0!important}"
                   + ".shore{background:none!important}"
                   + ".shallows{background:none!important}"
                   + ".floorlight{opacity:0!important}";
    d.head.appendChild(st);
  }

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
      /* ★★★ MATCH THE PAGE IT IS ACTUALLY ON, NOT THE PAGE IT CAME FROM.
         BR-S433 pointed this at the MENU's --ink-950 (#0a0b0d = rgb 10,11,13). Measured
         on codex.html, that is the wrong ground and it is why the builder sees a blue
         cast: the Codex's own html background is rgb(16,14,12), a WARM dark, while
         --ink-950 is COOL (blue 13 > red 10). A cool band inside a warm page reads blue
         even though neither colour is blue on its own — it is the CONTRAST that has a
         hue, not the fill.
         So the ground is read off the document the canvas is drawing on. On the menu
         that resolves to the menu's base; on codex.html to the Codex's own. One rule,
         and it cannot drift when either palette changes. */
      /* ★★★ BR-S444 — I HAD THE DESIGN INVERTED, AND THAT IS WHY IT NEVER SETTLED.
         The builder: "the idea was the codex color and blue below follow the line
         movements accordingly and nothing is revealed according to white line movements."
             ABOVE the line : the Codex, untouched
             BELOW the line : the blue under — BR-S237's own phrase for it
             the boundary   : the wave itself, so nothing is revealed as it moves
         I read the blue as a defect and spent four commits warming it away, which
         deleted the half of the effect that was intended.
         AND THE RESIDUE HAS THE SAME ROOT. .tide and .shore are STATIC CSS bands at a
         fixed height; this line is a moving wave. A straight edge and a curve can never
         agree, so wherever the wave sits away from 0.955H a strip of the static band is
         either exposed above the line or clipped below it. That strip is the residue —
         it was never a colour, it was a shape that does not move.
         So the canvas takes the whole region: the codex's own bands are switched off
         (below) and everything under the line is painted here, following the contour. */
      var g = ctx.createLinearGradient(0, H * LINE_FRAC, 0, H);
      /* ★ BR-S448 — AND IT IS BLUE. BR-S237 called this "the blue under", but its three
         stops (#161411 / #100f0c / #0a0b0d) are warm-to-neutral — the name described an
         intent the colours never carried, which is why restoring them at BR-S444 read as
         "not blue anymore". These are actually blue, and dark enough to stay a threshold
         rather than a stripe: the water under the line the codex sits on. */
      g.addColorStop(0,   "#0e1622");   /* the shore, at the line */
      g.addColorStop(0.55,"#0a1019");
      g.addColorStop(1,   "#070a10");   /* the seafloor */
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

    /* ★★ BR-S442 — THE CLOUD ABOVE THE LINE WAS THE LINE'S OWN BODY, IN WHITE.
       "there still some clody blue above white line, above white line should purely be
       the brown codex look and colors."
       drawLine() painted TWO passes: a filled contour at 10% white — several px tall,
       because thick() varies with x and velocity — and then the stroke. On U1's cool
       ground that fill read as light. On the Codex's warm brown it reads as a cloud, and
       a cool one: white does not tint warm, it DESATURATES it, so a 10% white haze over
       #100e0c lands greyer and bluer than the page it sits on. Nothing was blue; the
       white was taking the brown out.
       The body fill is cut. What is left is the stroke, which is the line — and above it
       there is now nothing but the Codex. The glow is halved and warmed for the same
       reason: it spreads UPWARD across the content, so it must not grey it. */

    ctx.beginPath();
    ctx.moveTo(xs[0], base + y[0] + off);
    for (i = 1; i < N; i++) {
      var pcy = base + y[i - 1] + off, ccy = base + y[i] + off;
      ctx.quadraticCurveTo(xs[i - 1], pcy, (xs[i - 1] + xs[i]) / 2, (pcy + ccy) / 2);
    }
    ctx.lineTo(xs[N - 1], base + y[N - 1] + off);
    ctx.strokeStyle = edgeGrad(STROKE_A * env);
    ctx.lineWidth = 1.1; ctx.lineJoin = "round";
    ctx.shadowColor = "rgba(255,248,236," + (GLOW_A * env).toFixed(3) + ")";
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
    /* ★★ BR-S507 — THE LINE ARRIVES WITH THE HOLE, NOT AHEAD OF IT.
       The builder: "polishing on the logic and design where the white line works with
       the bloom of codex as it open so it looks smooth and part of design."
       The aperture is `clip-path 340ms var(--ease-collapse) 120ms`: for 120ms after the
       seal is pressed nothing has begun to open. `hold` gives the line those 120ms back,
       and RATE_IN (3.2/s, ~310ms to 0.95) replaces the old 5.5 so the rise takes the
       iris's 340ms rather than beating it there. Leaving is unchanged and stays quick —
       BR-S437 requires the line to ride the whole collapse and leave with the bloom. */
    if (hold > 0 && wantEnv === 1) hold = Math.max(0, hold - dt * 1000);
    else env += (wantEnv - env) * Math.min(1, dt * (wantEnv === 1 ? RATE_IN : RATE_OUT));

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
  /* ★★ BR-S507 — open() IS NOW IDEMPOTENT, AND IT IS THE "FIRES TWICE".
     The builder: "the white line on codex fires twice or something."

     MEASURED: one press of the seal produces FOUR calls to open(true) — three inside
     the same tick and a fourth at 1885ms. The observer that drives them watches `class`
     on #menuView, and that attribute changes for many reasons which have nothing to do
     with the codex (the panel-state classes, is-sliding, the A/B flag). Every one of
     those was a fresh full-strength repaint followed by a reset to 0.001, so the line
     flared and re-climbed four times per opening. The three at t=0 read as one hard
     flash; the one at 1885ms is a second flare almost two seconds after the bloom has
     finished, and that is the one the eye actually catches as "twice".

     Guarding on the state we already hold costs one comparison and makes the observer's
     chattiness free — which is the right place to fix it, because filtering the mutation
     list would mean re-deriving which classes matter every time one is added. Same
     lesson as the suppression lists: do not maintain a list of names when you can ask
     the state itself.

     ★ AND THE SYNCHRONOUS FRAME NO LONGER PAINTS AT FULL PRESENCE. That was the other
     half of the flash — `env = 1; draw(); env = 0.001` put a fully-lit edge on screen
     one frame after the press, while the iris had not yet begun to move. It still paints
     synchronously, because a line that is invisible whenever rAF is throttled is fragile
     beyond the lab and that reasoning stands; it just paints at the presence the moment
     actually has, and the 5.5/s ramp carries it up from there into the opening iris.

     ★★ AND A MEASUREMENT TRAP THAT COST AN HOUR, WRITTEN DOWN SO IT COSTS NOBODY ELSE
     ONE. Removing that full-strength paint appeared to BLANK THE LINE — zero lit pixels
     across the whole canvas, against a baseline that inks rows 0.960-0.996. It had not.
     The Browser pane freezes rAF in a tab that is not FRONTED, so the loop never ran,
     and the old `env = 1; draw()` was therefore the ONLY thing that had ever painted in
     that pane. Drawing honestly at 0.001 and waiting for a ramp that could not come
     looked exactly like a regression. Front the tab and the same build ramps
     0.002 -> 0.76 -> 0.99 -> 1 and inks the identical four rows.
     The lesson is the general one: a fallback that fires in your test environment and
     nowhere else will read as the feature working. Check what is actually driving the
     pixels before concluding either way. */
  function open(on) {
    var was = wantEnv;
    wantEnv = on ? 1 : 0;
    if (on) {
      if (was === 1) { kick(); return; }   // already open — the ramp owns it, do not re-slam
      ensure();
      place();
      hold = HOLD_MS;                      // sit still until the aperture starts to move
      env = Math.max(env, 0.001);
      if (L) { for (var i = 0; i < L.N; i++) L.tgt[i] = flow(L.xs[i], t); integrate(); }
      draw();                              /* at the presence this moment HAS — not at 1 */
    }
    kick();
  }

  root.CodexMembrane = {
    install: function (d, sel) {
      doc = d;
      target = d.querySelector(sel || "#codexBloom") || d.documentElement;
      if (!target) return false;
      ensure(); suppressStatic(d); place();
      /* ★ WATCH #menuView, NOT THE BLOOM. `is-codex-open` on the menu host is what
         drives the iris (styles.css:4748) and is set for the whole open state; the
         bloom's own aria-hidden is set once and is a weaker signal. */
      var host = d.getElementById("menuView");
      if (!host) return true;      /* standalone codex — no aperture to watch, open() is called directly */
      /* ★★ BR-S437 — THE ENDING WAS THE BUG. The builder: "bloom ending is buggy."
         This treated `is-codex-closing` as CLOSED, so the moment the seal was pressed the
         line and its band began fading over ~180ms. But the aperture's own collapse is
         `clip-path 340ms var(--ease-collapse) 120ms` (styles.css:4756) — it does not even
         START for 120ms and runs for 340 more. So the line vanished before the iris began
         to move, and the dark band under it went with it: for a quarter of a second you
         were looking at the codex through a closing hole with the bottom of the page
         suddenly bare. That is the flicker.
         Closing is not closed. The line stays up for the whole collapse and leaves when
         the bloom does — which is what "the line IS the edge" requires at both ends. */
      function isOpen() { return host.classList.contains("is-codex-open"); }
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
