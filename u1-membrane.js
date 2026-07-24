/* =====================================================================
   BLUE ROOM — U1 MEMBRANE LINES · judge overlay  (BR, 2026-07-24)
   ---------------------------------------------------------------------
   Runs the U1 "membrane" effect (twin white liquid threshold lines +
   reverse-magnet box deflection + born/dies-at-the-line decimation) on
   the REAL live U1 surface (#about / .about__plate), so it can be judged
   in the actual app flow before any permanent port into renderAbout().

   SELF-CONTAINED + REVERSIBLE + FLAG-GATED:
     · loads app-wide via one <script> in index.html but NO-OPS unless the
       flag is set, so normal users never see it.
     · turn ON  : open the app with ?u1lines   (or in console:
                  localStorage.setItem('u1lines','1'); location.reload())
       turn OFF : localStorage.removeItem('u1lines'); location.reload()
     · finds .about__plate DYNAMICALLY each frame (the menu is mounted at
       runtime + re-rendered), and only draws while U1 is actually visible.
     · when U1 is off-screen / flag off, it CLEARS every inline style it set,
       so it never leaves the real plates dimmed or transformed.

   Technique = the design-panel winner (canvas "Liquid Field") with the
   judges' fixes: recoil PEAKS at contact (held-sign), dt fixed-timestep,
   edge-feathered lines, unlit base-opacity, NO feTurbulence.
   This overlay measures the single .about__plate directly (no inner tile);
   the tiny life-driven transform feedback is bounded + only during dissolve.
   ===================================================================== */
(function(){
  "use strict";

  // ---- flag gate -------------------------------------------------------
  try {
    if(/[?&]u1lines\b/i.test(location.search)) localStorage.setItem('u1lines','1');
    if(/[?&]u1lines=0\b/i.test(location.search)) localStorage.removeItem('u1lines');
  } catch(e){}
  var ON = false; try { ON = localStorage.getItem('u1lines') === '1'; } catch(e){}
  if(!ON) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- tunables (identical to the prototype) --------------------------
  // BR PULSE-1: lines pushed toward the edges (was 0.20/0.80) to open the
  // living band from 0.60H to 0.72H so each plate is the single lit box longer.
  var DX=6, UPPER_FRAC=0.08, LOWER_FRAC=0.92, TFADE=92;   // BR PULSE-3: lines pushed to the edges (was 0.14/0.86) — "not so in the middle"
  var PUSH=32, REPEL_RANGE=150, FEATHER=14, DEAD=16;
  var STEP=1/60, FOLLOW=0.14, TENSION=0.10, DAMP=0.24, VMAX=40, EDGE_FEATHER=90;

  // BR PULSE-2 [taste, sole owner of the draw constants]: quiet the resting
  // membrane from a "HUD underline" toward a "quiet membrane" — every value here
  // is still multiplied by env at its call site, so the materialize/release
  // BREATHING is unchanged; only the resting ceiling + drift symmetry move.
  var STROKE_A=0.78, GLOW_A=0.40, GLOW_BLUR=3, MAX_BLUR=5.5;

  // BR PULSE-2 [upper, latch/hold windows]: expressed as fractions of the LIVING
  // BAND (LOWER_Y-UPPER_Y) so a later UPPER_FRAC/LOWER_FRAC retune auto-rescales
  // them — never a bare pixel count. Floor + ceiling clamps keep the ease graceful
  // on a very short section and from ballooning back into a slow fade on a tall one.
  var U_ESTAB=0.26, U_ESTAB_MIN=90, U_ESTAB_MAX=260;   // establish ramp length (+px floor/ceiling)
  var U_LEAD=0.13;   // BR PULSE-3 [timing, upper]: finish establish a beat earlier so the upper line reads SOLID across the whole intro-reading window (measured upper at section-top=237: 0.69->0.96) — the user's "ensure the top line is clearly present at About-top." Still genuinely 0 through the whole M1->U1 descent (establish begins only at section-top~=377), so the killed descent-ghost stays killed.
  var U_REL=0.22,   U_REL_MIN=90,   U_REL_MAX=260;      // release ramp length (+px floor/ceiling)
  // BR PULSE-2 [lower, content-anchored exit]: release window for the lower line,
  // as a fraction of the band, once the last plate's bottom clears the upper perch.
  var LOWER_REL=0.42;
  // BR PULSE-3 [timing, lower, content-anchored ENTRANCE]: rise window for the lower line
  // as the FIRST plate's CENTRE climbs to the lower perch from below — the mirror of the
  // exit above, and keyed to the SAME cy-vs-perch event that lights the plate in
  // gatherBoxes, so the line reaches full presence exactly as the first card begins to
  // light. = LOWER_REL for a symmetric enter/leave; larger => begins sooner (card still
  // deeper below the band), smaller => later / closer to the perch.
  var LOWER_ENT=0.42;

  var canvas, ctx;
  var W=0, H=0, DPR=1, UPPER_Y=0, LOWER_Y=0, MID_Y=0;
  var lines=[], particles=[], PMAX=260, last=0, accT=0;
  var upperEnv=0, lowerEnv=0;     // BR PULSE-2: split per-line presence — upper=quintic latch/hold, lower=content-anchored fade. Written each frame by aboutEnvelope(); zero per-frame alloc.
  var touched = [];               // plates we've written inline styles onto
  var wasVisible = false;
  var aboutEl = null;             // last-found #about (set by aboutEnvelope)
  var styleInjected = false;      // flag-scoped layout <style> mounted once

  function smoothstep(a,b,x){ if(a===b) return x<a?0:1; var t=(x-a)/(b-a); if(t<0)t=0; else if(t>1)t=1; return t*t*(3-2*t); }
  function clampNum(x,lo,hi){ return x<lo?lo:(x>hi?hi:x); }
  // Quintic ease (zero 1st AND 2nd derivative at both ends) — a softer arrival than
  // smoothstep's cubic. Used only for the upper line's latch/hold so it eases into
  // presence like the liquid material itself, not a mechanical snap.
  function smootherstep(a,b,x){ if(a===b) return x<a?0:1; var t=(x-a)/(b-a); if(t<0)t=0; else if(t>1)t=1; return t*t*t*(t*(t*6-15)+10); }
  function flow(x,t){ return 3.0*Math.sin(x*0.013-t*1.6)+1.7*Math.sin(x*0.030+t*1.05+1.3)+1.0*Math.sin(x*0.061-t*2.2+2.1); }
  function thick(x,v,t){ return 0.9+0.6*(0.5+0.5*Math.sin(x*0.02-t*1.9))+0.05*Math.min(6,Math.abs(v)); }

  function ensureCanvas(){
    if(canvas) return;
    canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden','true');
    canvas.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;z-index:9990;pointer-events:none;';
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
  }

  function rebuildLattice(){
    var N = Math.ceil(W/DX)+1;
    function mk(frac){
      var L={ baseY:H*frac, N:N, xs:new Float32Array(N), y:new Float32Array(N), v:new Float32Array(N), tgt:new Float32Array(N), side:new Int8Array(24) };
      for(var i=0;i<N;i++) L.xs[i]=i*DX; return L;
    }
    lines=[mk(UPPER_FRAC), mk(LOWER_FRAC)];
    refreshBaselines();
  }
  function refreshBaselines(){ if(lines.length===2){ lines[0].baseY=H*UPPER_FRAC; lines[1].baseY=H*LOWER_FRAC; } UPPER_Y=H*UPPER_FRAC; LOWER_Y=H*LOWER_FRAC; MID_Y=(UPPER_Y+LOWER_Y)/2; }
  function resize(){
    DPR=Math.min(2, window.devicePixelRatio||1);
    var nW=window.innerWidth, nH=window.innerHeight, widthChanged=(nW!==W)||lines.length!==2;
    W=nW; H=nH;
    if(!canvas) return;
    canvas.width=Math.round(W*DPR); canvas.height=Math.round(H*DPR);
    canvas.style.width=W+'px'; canvas.style.height=H+'px';
    ctx.setTransform(DPR,0,0,DPR,0,0);
    if(widthChanged) rebuildLattice(); else refreshBaselines();
  }

  // Continuous scroll-driven presence, split per line into module-scope scalars
  // (written every call — no per-frame allocation). Returns max(upperEnv,lowerEnv)
  // as the single visibility GATE, so the overlay stays alive while EITHER line
  // still has presence (never one line alone — that would clear+restore the plates
  // while the other line is still lit).
  //
  //   lowerEnv — fades IN as the section TOP climbs to the band (unchanged), and
  //     fades OUT anchored to the LAST .about__plate's bottom edge crossing the
  //     upper perch — NOT the section rect. The section box trails ~0.45H below the
  //     last plate (rail->close gap + footer/seal + bottom padding); keying the exit
  //     to r.bottom dimmed the membrane while the last nugget was still lit dead-
  //     centre. Now full presence HOLDS while any part of the last plate is in-or-
  //     below the band, releasing only as that edge finally clears the top.
  //
  //   upperEnv — a latch/hold curve decoupled from the section-top fade so the fixed
  //     upper line reads "always there" at its perch through the whole section:
  //     "establish" eases up on a QUINTIC over a band-relative, clamped window as the
  //     section top nears the FIXED upper perch (kills the old full-descent ghost —
  //     it is genuinely ~0 over the entire M1->U1 descent), then "hold" keeps it
  //     solid for the ENTIRE section, releasing only as the section BOTTOM (the seal,
  //     after the trailing spacer) rises back up to the perch — i.e. at the very end,
  //     when nothing of About remains below the top line. Keyed to the section rect
  //     (not the last plate) on purpose, so the seal stays framed until it clears.
  //
  // Sets module-scope aboutEl for the layout injector; both envs zero when U1 isn't mounted.
  function aboutEnvelope(){
    var a = document.querySelector('#about, .about');
    aboutEl = (a && a.offsetParent !== null) ? a : null;
    if(!aboutEl){ upperEnv=0; lowerEnv=0; return 0; }
    var r = aboutEl.getBoundingClientRect();
    if(r.height < 4){ upperEnv=0; lowerEnv=0; return 0; }

    var band = LOWER_Y - UPPER_Y;              // tracks any later frac/viewport change automatically

    // LOWER — content-anchored on BOTH ends. ENTRANCE (BR PULSE-3) rises as the FIRST
    // plate's centre climbs to the lower perch from below (replaces the old section-top
    // fade); EXIT (BR PULSE-2, unchanged) releases as the LAST plate's bottom clears the
    // upper perch. So through the "We hold the candle." intro the bottom line is genuinely
    // ABSENT — the top line frames it alone — and it only materialises to frame each card
    // as that card descends into the band.
    // (footer.about__close / the seal is a SIBLING of .about__rail, never a plate, so
    //  plates[0] / plates[len-1] are always the first / last nugget — guard if that changes.)
    var plates = document.querySelectorAll('.about__plate');
    var firstCy, lastBottom;
    if(plates.length){
      var fr     = plates[0].getBoundingClientRect();
      firstCy    = (fr.top + fr.bottom) / 2;                       // first nugget centre
      lastBottom = plates[plates.length - 1].getBoundingClientRect().bottom;
    } else {
      firstCy = lastBottom = r.bottom;                             // pre-mount fallback: holds both terms off the intro
    }
    // ENTRANCE: 0 while the first plate's centre is still below the living band, easing to
    // 1 as that centre reaches the lower perch — the SAME instant the plate begins to light
    // in gatherBoxes' cy-keyed life. Keyed to the PLATE, never the section top, so at
    // About-top only the upper line reads.
    var entrance = LOWER_ENT * band;           // ~0.30H at the current fracs
    var fadeIn   = smoothstep(LOWER_Y + entrance, LOWER_Y, firstCy);
    // EXIT (unchanged): full while any of the last plate is in/below the band, releasing
    // only as its bottom edge finally clears the upper perch.
    var release  = LOWER_REL * band;           // ~0.30H at the current fracs
    var fadeOut  = smoothstep(UPPER_Y - release, UPPER_Y, lastBottom);
    lowerEnv = Math.min(fadeIn, fadeOut);

    // UPPER — latch SOLID on a graceful quintic ease, HOLD through the whole section,
    // release late (keyed to the section BOTTOM so the seal + trailing spacer stay
    // framed until the very end).
    var estabSpan = clampNum(band*U_ESTAB, U_ESTAB_MIN, U_ESTAB_MAX);
    var lead      = band*U_LEAD;
    var establish = smootherstep(UPPER_Y + lead + estabSpan, UPPER_Y + lead, r.top);
    var relSpan   = clampNum(band*U_REL, U_REL_MIN, U_REL_MAX);
    var hold      = smootherstep(UPPER_Y, UPPER_Y + relSpan, r.bottom);
    upperEnv = establish * hold;

    return Math.max(upperEnv, lowerEnv);
  }

  // Flag-scoped ONLY: loosen the nugget rhythm so plates breathe one-at-a-time in
  // the band. Never touches shipped styles.css — a #about.u1lines class (id + 2
  // classes) out-specifies every shipped .about__rail rule, and the whole overlay
  // is ?u1lines-gated, so this is doubly session-scoped and fully reversible.
  function ensureAboutLayout(el){
    if(!el) return;
    if(el.classList && !el.classList.contains('u1lines')) el.classList.add('u1lines');
    if(styleInjected || document.getElementById('u1-membrane-style')){ styleInjected=true; return; }
    // BR PULSE-2 [tail]: the shipped tail is top-heavy — .about__close carries only
    // a 13vh margin + the section a fixed 22vh bottom padding, no equivalent to the
    // injected intro guard, so the last-nugget -> seal beat was the TIGHTEST break on
    // the surface. Open the close-margin to meet/exceed the 26vh intro guard, and add
    // a trailing runway so the final nugget reaches solo-lit before the seal enters
    // the band. Both are DERIVED from the band geometry (LOWER_FRAC-UPPER_FRAC) so a
    // later frac retune tracks instead of desyncing. Rail row-gap + intro margin are
    // left VERBATIM (their pulse-1 owners' tuned numbers — not this lane's to touch).
    var bandPct = (LOWER_FRAC - UPPER_FRAC) * 100;   // 72 today
    var closeVh = Math.round(bandPct * 0.40);        // ~29vh : last-plate -> seal beat (>= the 26vh intro guard)
    var tailVh  = Math.round(bandPct * 0.42);        // ~30vh : trailing runway so the seal exits inside calm lines
    var s = document.createElement('style');
    s.id = 'u1-membrane-style';
    s.textContent =
      '#about.u1lines .about__rail{row-gap:clamp(150px,34vh,340px);}' +
      '#about.u1lines .about__intro{margin-bottom:clamp(96px,26vh,220px);}' +
      '#about.u1lines .about__close{margin-top:clamp(120px,' + closeVh + 'vh,300px);}' +
      '#about.u1lines{padding-bottom:max(22vh,clamp(200px,' + tailVh + 'vh,380px));}';
    (document.head || document.documentElement).appendChild(s);
    styleInjected = true;
  }

  function clearTouched(){
    for(var i=0;i<touched.length;i++){ var el=touched[i]; el.style.opacity=''; el.style.filter=''; el.style.transform=''; el.style.pointerEvents=''; }
    touched.length=0;
  }

  function gatherBoxes(env){
    var els = document.querySelectorAll('.about__plate');
    var out=[]; touched.length=0;
    for(var i=0;i<els.length;i++){
      var el=els[i], r=el.getBoundingClientRect(), cy=(r.top+r.bottom)/2;
      var life = smoothstep(UPPER_Y-TFADE, UPPER_Y+TFADE, cy) * (1 - smoothstep(LOWER_Y-TFADE, LOWER_Y+TFADE, cy));
      // Blend the position-based dimming toward "fully lit" by env so the plate
      // reaction breathes in/out with the lines: env=0 -> effLife=1 (untouched),
      // env=1 -> the full position-based effect. Kills any dim-on-appear pop.
      var effLife = 1 - env*(1 - life);
      var blur=(1-effLife)*MAX_BLUR, sc=0.955+0.045*effLife, dir=cy<MID_Y?-1:1, dy=(1-effLife)*dir*7;
      el.style.opacity=effLife.toFixed(3);
      el.style.filter=effLife>0.995?'':'blur('+blur.toFixed(2)+'px)';
      el.style.transform='translateY('+dy.toFixed(2)+'px) scale('+sc.toFixed(3)+')';
      el.style.pointerEvents=effLife<0.4?'none':'';
      touched.push(el);
      // box carries raw position-based life: the line deflection is geometric and
      // particle shed keys off the true line crossing; env scales their visible alpha.
      out.push({ l:r.left, r:r.right, cx:(r.left+r.right)/2, cy:cy, hh:r.height/2, life:life, idx:i });
    }
    return out;
  }

  function computeTarget(L, boxes, t){
    var N=L.N, xs=L.xs, tgt=L.tgt, baseY=L.baseY, i;
    for(i=0;i<N;i++) tgt[i]=flow(xs[i],t);
    for(var b=0;b<boxes.length;b++){
      var box=boxes[b], gap=Math.abs(baseY-box.cy), effGap=gap-box.hh; if(effGap<0)effGap=0;
      // BR PULSE-3 [direction]: LATCH the incoming-travel side ONCE, the first frame this
      // box enters the line's range while armed (side===0), then HOLD it for the WHOLE
      // crossing — the recoil no longer flips mid-crossing (the old per-frame sign(d)
      // recompute IS what flipped, exactly at the crossing). RE-ARM only on range-exit
      // (prox<=0): REPEL_RANGE overshoots the perch, so on the inner LOWER<->UPPER transit
      // that reset lands with the box already fully inside the band ("reset only after
      // inside both lines"), and it is satisfied over a WIDE contiguous span (never a
      // skippable window), at any viewport height. Magnitude curve below is unchanged.
      var si = box.idx<L.side.length ? box.idx : 0;
      var prox = 1 - effGap/REPEL_RANGE; if(prox<=0){ L.side[si]=0; continue; }
      prox = prox*prox*(3-2*prox);
      var side = L.side[si];
      if(side===0){ var d = baseY - box.cy; side = (d>=0) ? 1 : -1; L.side[si] = side; }
      var wob=1+0.14*Math.sin(t*2.3+box.cx*0.01), amp=PUSH*prox*side*wob, f=FEATHER;
      var i0=Math.floor((box.l-f)/DX); if(i0<0)i0=0; var i1=Math.ceil((box.r+f)/DX); if(i1>N-1)i1=N-1;
      for(i=i0;i<=i1;i++){ var x=xs[i]; var win=smoothstep(box.l-f,box.l+f,x)-smoothstep(box.r-f,box.r+f,x); if(win>0.0001)tgt[i]+=amp*win; }
    }
  }
  function integrate(L){
    var N=L.N, y=L.y, v=L.v, tgt=L.tgt, i;
    for(i=1;i<N-1;i++){ var lap=y[i-1]+y[i+1]-2*y[i]; var acc=FOLLOW*(tgt[i]-y[i])+TENSION*lap-DAMP*v[i]; var nv=v[i]+acc; if(nv>VMAX)nv=VMAX; else if(nv<-VMAX)nv=-VMAX; v[i]=nv; }
    for(i=1;i<N-1;i++) y[i]+=v[i]; y[0]=0; y[N-1]=0;
  }
  function edgeGrad(alpha){
    var g=ctx.createLinearGradient(0,0,W,0), e=Math.min(0.18, EDGE_FEATHER/Math.max(1,W));
    g.addColorStop(0,'rgba(255,255,255,0)'); g.addColorStop(e,'rgba(255,255,255,'+alpha+')');
    g.addColorStop(1-e,'rgba(255,255,255,'+alpha+')'); g.addColorStop(1,'rgba(255,255,255,0)'); return g;
  }
  function drawLine(L,t,env){
    var N=L.N, xs=L.xs, y=L.y, v=L.v, baseY=L.baseY, i, th;
    ctx.beginPath();
    for(i=0;i<N;i++){ th=thick(xs[i],v[i],t); ctx.lineTo(xs[i], baseY+y[i]-th); }
    for(i=N-1;i>=0;i--){ th=thick(xs[i],v[i],t); ctx.lineTo(xs[i], baseY+y[i]+th); }
    ctx.closePath(); ctx.fillStyle=edgeGrad(0.10*env); ctx.fill();
    ctx.beginPath(); ctx.moveTo(xs[0], baseY+y[0]);
    for(i=1;i<N;i++){ var xm=(xs[i-1]+xs[i])/2, ym=(baseY+y[i-1]+baseY+y[i])/2; ctx.quadraticCurveTo(xs[i-1], baseY+y[i-1], xm, ym); }
    ctx.lineTo(xs[N-1], baseY+y[N-1]);
    ctx.strokeStyle=edgeGrad(STROKE_A*env); ctx.lineWidth=1.1; ctx.lineJoin='round';
    ctx.shadowColor='rgba(255,255,255,'+(GLOW_A*env).toFixed(3)+')'; ctx.shadowBlur=GLOW_BLUR; ctx.stroke(); ctx.shadowBlur=0;
  }
  function emitParticles(boxes){
    for(var b=0;b<boxes.length;b++){ var box=boxes[b]; if(box.life<0.06||box.life>0.62)continue;
      var nLine=Math.abs(UPPER_Y-box.cy)<Math.abs(LOWER_Y-box.cy)?UPPER_Y:LOWER_Y, rate=(0.62-box.life)*6;
      var n=Math.floor(rate)+(Math.random()<(rate%1)?1:0), up=(nLine===UPPER_Y);
      for(var k=0;k<n&&particles.length<PMAX;k++) particles.push({ x:box.l+Math.random()*(box.r-box.l), y:nLine+(Math.random()*2-1)*3, vx:(0.6+Math.random()*0.9)*(Math.random()<0.5?1:-1), vy:(Math.random()*2-1)*0.3, a:0.5, s:0.6+Math.random()*0.9, up:up });
    }
  }
  function stepParticles(){ for(var i=particles.length-1;i>=0;i--){ var p=particles[i]; p.x+=p.vx; p.y+=p.vy; p.vx*=0.99; p.a-=0.012; if(p.a<=0)particles.splice(i,1); } }
  function drawParticles(){ ctx.fillStyle='#fff'; for(var i=0;i<particles.length;i++){ var p=particles[i], e=p.up?upperEnv:lowerEnv; ctx.globalAlpha=(p.a<0?0:p.a)*0.7*e; ctx.beginPath(); ctx.arc(p.x,p.y,p.s,0,6.28318); ctx.fill(); } ctx.globalAlpha=1; }

  function frame(now){
    if(!canvas){ requestAnimationFrame(frame); return; }
    if(window.innerWidth!==W || window.innerHeight!==H) resize();

    var vis = aboutEnvelope();                // sets upperEnv/lowerEnv; returns their max as the visibility gate
    ensureAboutLayout(aboutEl);               // flag-scoped row/intro/close breathing, as soon as U1 mounts
    var l;

    if(vis<=0.001){                           // neither line has presence — go dark, restore plates
      if(wasVisible){ ctx.clearRect(0,0,W,H); clearTouched(); particles.length=0; wasVisible=false; }
      requestAnimationFrame(frame); return;
    }
    if(!wasVisible){                          // 0->1 re-entry: settle from a flat, calm line (no stale wobble/velocity/latch)
      for(l=0;l<lines.length;l++){ lines[l].y.fill(0); lines[l].v.fill(0); lines[l].side.fill(0); }  // + BR PULSE-3: clear latched sides so a box mid-band on wake never inherits a stale direction
      last=now; accT=0; wasVisible=true;
    }

    var t=now/1000, dt=(now-last)/1000; if(dt<0||dt>0.05)dt=STEP; last=now;
    var envPlate=Math.max(upperEnv, lowerEnv);   // plate dimming keys off whichever line still has presence
    var boxes=gatherBoxes(envPlate);

    if(reduce){                               // static: flat lines, each independently env-faded, plates fully lit
      ctx.clearRect(0,0,W,H); ctx.lineWidth=1;
      ctx.strokeStyle='rgba(255,255,255,'+(STROKE_A*upperEnv).toFixed(3)+')';
      ctx.beginPath(); ctx.moveTo(0,UPPER_Y); ctx.lineTo(W,UPPER_Y); ctx.stroke();
      ctx.strokeStyle='rgba(255,255,255,'+(STROKE_A*lowerEnv).toFixed(3)+')';
      ctx.beginPath(); ctx.moveTo(0,LOWER_Y); ctx.lineTo(W,LOWER_Y); ctx.stroke();
      clearTouched();
      requestAnimationFrame(frame); return;
    }

    for(l=0;l<lines.length;l++) computeTarget(lines[l], boxes, t);
    accT+=dt; var steps=0; while(accT>=STEP && steps<3){ for(l=0;l<lines.length;l++) integrate(lines[l]); accT-=STEP; steps++; }
    ctx.clearRect(0,0,W,H);
    drawLine(lines[0], t, upperEnv);          // upper (UPPER_FRAC): quintic latch/hold, releases at the very end
    drawLine(lines[1], t, lowerEnv);          // lower (LOWER_FRAC): content-anchored fade (last-plate exit)
    emitParticles(boxes); stepParticles(); drawParticles();
    requestAnimationFrame(frame);
  }

  function boot(){
    ensureCanvas(); resize();
    var rt; window.addEventListener('resize', function(){ if(rt)return; rt=requestAnimationFrame(function(){ rt=0; resize(); }); }, {passive:true});
    document.addEventListener('visibilitychange', function(){ if(!document.hidden){ last=0; accT=0; resize(); } });
    requestAnimationFrame(function(n){ last=n; requestAnimationFrame(frame); });
    try { console.info('[u1-membrane] overlay ACTIVE — open the menu and scroll to “About Blue Room”. Turn off: localStorage.removeItem("u1lines")'); } catch(e){}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
