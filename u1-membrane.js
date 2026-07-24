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

  // ---- flag gate (BR-S228: LIVE by default; kill-switch preserved) -----
  // ?u1lines=0 persists an OFF preference; ?u1lines clears it back to default-on.
  try {
    if(/[?&]u1lines=0\b/i.test(location.search)) localStorage.setItem('u1lines','0');
    else if(/[?&]u1lines\b/i.test(location.search)) localStorage.removeItem('u1lines');
  } catch(e){}
  var ON = true; try { ON = localStorage.getItem('u1lines') !== '0'; } catch(e){}
  if(!ON) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- tunables (identical to the prototype) --------------------------
  // BR PULSE-1: lines pushed toward the edges to open the living band (now 0.92H at
  // 0.04/0.96) so each plate is the single lit box longer.
  var DX=6, UPPER_FRAC=0.04, LOWER_FRAC=0.96, TFADE=92;   // BR-S229: lines pushed a LOT closer to the edges (was 0.08/0.92) — builder wants them near the frame
  // BR-S231 [refine, off-frame bulge — MOTION+RHYTHM+TASTE consensus]: at the shipped near-edge
  // 0.04/0.96 lines the frame allows only ~0.04H (~26-36px) of outward room, so PUSH 52 (crest
  // ~59px) spent most of its reach OFF-screen / hard-clipped at the viewport edge. Trimmed
  // PUSH 52->40 (the excess was invisible), and the crest is now held on-frame by an explicit
  // FRAME_MARGIN clamp in integrate() (structural — independent of viewport height). REPEL_RANGE
  // (wider vertical engagement) is the visible, kept half of item 2; it is additionally
  // band-capped in computeTarget so two lines can't co-pulse on a short viewport.
  var PUSH=40, REPEL_RANGE=240, FEATHER=14;
  // BR-S231 [refine, outward-only INVARIANT — MOTION high]: FLOW_MARGIN = the resting flow()
  // current peak (~5.7px) — integrate() clamps any INWARD recoil to this margin so an
  // underdamped release overshoot can never dip the line back into the band (item-1 becomes a
  // hard per-frame guarantee, not an emergent target-sign property). FRAME_MARGIN = px the
  // outward crest is kept clear of the viewport edge (no hard clip on the near-edge lines).
  var FLOW_MARGIN=6, FRAME_MARGIN=10;
  // BR-S232 [aperture, sole plate dissolve]: center-weight is now the ONLY plate dissolve (the
  // opaque mask owns the line cut, and plate blur/scale are retired). Gentler (0.28, floor 0.72)
  // so lit neighbours stay readable — the dark bands already supply the separation — and a HIGH
  // floor so the relic still has body at the lip where the mask (not opacity) performs the final
  // cut. THE one on-device knob to eyeball (0.20-0.35): too low => wall-of-stone; too near 1 =>
  // dissolve finishes AWAY from the line. Its floor MUST stay well above 0.
  var CENTER_DIM=0.28;
  // BR-S231 [refine, calmer settle — MOTION]: DAMP 0.24->0.36 (zeta ~0.32->~0.48) cuts the
  // release overshoot the inward clamp would otherwise arrest, so the line reads as settling
  // into its edge rather than being pinned at a wall. FOLLOW still drives outward arrival, and
  // the sustained-peak-across-overlap means reach isn't time-critical. VMAX unchanged (it caps
  // velocity, not reach; inward velocity is zeroed at the clamp so it can't build a return dip).
  var STEP=1/60, FOLLOW=0.14, TENSION=0.10, DAMP=0.36, VMAX=52, EDGE_FEATHER=90;

  // BR PULSE-2 [taste, sole owner of the draw constants]: quiet the resting
  // membrane from a "HUD underline" toward a "quiet membrane" — every value here
  // is still multiplied by env at its call site, so the materialize/release
  // BREATHING is unchanged; only the resting ceiling + drift symmetry move.
  var STROKE_A=0.78, GLOW_A=0.40, GLOW_BLUR=3;

  // BR-S232 [aperture, mask lip-softener]: FEATHER_LIP is the width AND shadowBlur of the mask
  // inner-edge feather — the SOLE lip-softener now that plate blur is gone. A contour-FOLLOWING
  // shadow-blurred re-stroke of the band inner edge (NOT a fixed-y gradient, which misaligns at
  // the bulge crest — exactly where a relic presses). Widen this (never re-add plate blur) if the
  // lip ever reads as a hard guillotine.
  var FEATHER_LIP=3.5;

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
  var maskGrad=null;   // BR-S232 [aperture]: cached viewport-space vertical bg-match gradient for the occluding bands; rebuilt in resize() (keys off H)
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
      var L={ baseY:H*frac, N:N, xs:new Float32Array(N), y:new Float32Array(N), v:new Float32Array(N), tgt:new Float32Array(N) };   // BR-S231: dropped the dead L.side (never read after the fixed-sign switch — outward direction is derived per-line in computeTarget/integrate)
      for(var i=0;i<N;i++) L.xs[i]=i*DX; return L;
    }
    lines=[mk(UPPER_FRAC), mk(LOWER_FRAC)];
    refreshBaselines();
  }
  function refreshBaselines(){ if(lines.length===2){ lines[0].baseY=H*UPPER_FRAC; lines[1].baseY=H*LOWER_FRAC; } UPPER_Y=H*UPPER_FRAC; LOWER_Y=H*LOWER_FRAC; MID_Y=(UPPER_Y+LOWER_Y)/2; }
  // BR-S232 [aperture]: single viewport-space vertical gradient that matches the fixed body radial
  // (styles.css body: radial-gradient(110% 80% at 50% -10%, #161411, --ink-900 #100f0c 55%,
  // --ink-950 #0a0b0d 100%); background-attachment:fixed). The overlay canvas is position:fixed;
  // inset:0, so a vertical linear in canvas space is seamless with the page's vertical gradient
  // component at the ONLY strips the bands ever touch (top ~[0,0.04H] ~= #161411, bottom
  // ~[0.96H,H] ~= #0a0b0d) — the ellipse's horizontal variance is negligible there. Reused for
  // BOTH bands, uniform across x (NOT edgeGrad — its x-edge alpha fade would leak page content
  // into the corners). FALLBACK if it ever reads unseamless on-device: collapse to a flat
  // ctx.fillStyle='#0a0b0d' (one-line swap).
  function buildMaskGrad(){
    var g=ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0,'#161411');   // matches the body radial's 0% top colour
    g.addColorStop(0.5,'#100f0c'); // --ink-900
    g.addColorStop(1,'#0a0b0d');   // --ink-950 (LOCKED base)
    return g;
  }
  function resize(){
    DPR=Math.min(2, window.devicePixelRatio||1);
    var nW=window.innerWidth, nH=window.innerHeight, widthChanged=(nW!==W)||lines.length!==2;
    W=nW; H=nH;
    if(!canvas) return;
    canvas.width=Math.round(W*DPR); canvas.height=Math.round(H*DPR);
    canvas.style.width=W+'px'; canvas.style.height=H+'px';
    ctx.setTransform(DPR,0,0,DPR,0,0);
    maskGrad=buildMaskGrad();   // BR-S232: rebuild the bg-match gradient on every resize (keys off H)
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
    var entrance = LOWER_ENT * band;           // ~0.39H at the current 0.04/0.96 fracs
    var fadeIn   = smoothstep(LOWER_Y + entrance, LOWER_Y, firstCy);
    // EXIT (unchanged): full while any of the last plate is in/below the band, releasing
    // only as its bottom edge finally clears the upper perch.
    var release  = LOWER_REL * band;           // ~0.39H at the current 0.04/0.96 fracs
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
    var bandPct = (LOWER_FRAC - UPPER_FRAC) * 100;   // 92 today (0.04/0.96)
    var closeVh = Math.round(bandPct * 0.40);        // ~37vh : last-plate -> seal beat (>= the 26vh intro guard)
    var tailVh  = Math.round(bandPct * 0.42);        // ~39vh : trailing runway so the seal exits inside calm lines
    var s = document.createElement('style');
    s.id = 'u1-membrane-style';
    s.textContent =
      '#about.u1lines .about__rail{row-gap:clamp(210px,46vh,460px);}' +   /* BR-S229: more air between boxes (was 150/34vh/340) */
      '#about.u1lines .about__intro{margin-bottom:clamp(96px,26vh,220px);}' +
      '#about.u1lines .about__close{margin-top:clamp(120px,' + closeVh + 'vh,300px);}' +
      '#about.u1lines{padding-bottom:max(22vh,clamp(200px,' + tailVh + 'vh,380px));}' +
      '#about.u1lines .about__plate{transition:none!important;}' +   // the shipped 720ms .is-motion transition smears the 60fps inline opacity/filter/transform writes
      // BR-S230 [item 4, engraved-relic boxes]: the nuggets read like engraved gravestones /
      // relics dug from the ground. Stone body = layered gradients; carved bevel = INSET-only
      // box-shadow (respects the shipped no-outer-shadow doctrine + reads as buried-in-ground);
      // engraved text = light-below/dark-above text-shadow with the warm-ink fills kept for
      // legibility. Stone SURFACE scoped to :not(--unlit) so the unlit 'coming' veil survives;
      // text-carve rules are global + law-safe (text-shadow != color). Gold (#c69b63) touches
      // ONLY the decorative .about__rule divider, never any law-governed text. Fully reversible
      // (vanishes with the <style> node on flag-off); no opacity/transform/filter, so the
      // per-frame inline plate writes are untouched.
      '#about.u1lines .about__nugget:not(.about__nugget--unlit) .about__plate{' +
        'background:radial-gradient(130% 90% at 50% -12%, rgba(233,229,220,.05), transparent 55%),radial-gradient(100% 65% at 32% 118%, rgba(0,0,0,.5), transparent 62%),linear-gradient(180deg,#16140f 0%,#100e0b 100%);' +
        'border-color:rgba(233,229,220,.10);' +
        'box-shadow:inset 0 1px 0 rgba(233,229,220,.12),inset 0 2px 3px rgba(0,0,0,.42),inset 0 -1px 0 rgba(0,0,0,.55),inset 0 0 26px rgba(0,0,0,.34);' +   /* BR-S231: top catch-light .07->.12 so the relic reads as a solid unearthed stone (top lip) while the bottom keeps melting into the dark */
      '}' +
      '#about.u1lines .about__name{text-shadow:0 1px 0 rgba(233,229,220,.10),0 -1px 1px rgba(0,0,0,.55);}' +
      '#about.u1lines .about__line{text-shadow:0 1px 0 rgba(233,229,220,.05),0 -1px 1px rgba(0,0,0,.4);}' +
      '#about.u1lines .about__micro{text-shadow:0 1px 1px rgba(0,0,0,.5);}' +
      '#about.u1lines .about__rule{background:linear-gradient(90deg,transparent,rgba(198,155,99,.5) 30%,rgba(198,155,99,.5) 70%,transparent);}';
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
      // reaction breathes in/out with the lines: env=0 -> untouched, env=1 -> full
      // position-based effect. Kills any dim-on-appear pop.
      var effPos = 1 - env*(1 - life);      // TRUE line-proximity presence — now feeds the pointer gate + particle shed ONLY (the opaque mask owns the line dissolve)
      // BR-S231 [refine, one-at-a-time — RHYTHM high]: the 92% band lets two engraved plates
      // read at full presence at once (fully-lit zone ~= plate spacing) -> a wall of stone.
      // Center-weight the plate's *opacity* by its distance from mid-band so only the plate
      // nearest the centre holds full presence and neighbours recede. cy is transform-invariant,
      // so this is pure scroll-driven dimming, not a feedback hunt.
      var cw = 1 - CENTER_DIM * smoothstep(0, 0.5*(LOWER_Y-UPPER_Y), Math.abs(cy-MID_Y));
      // BR-S232 [aperture, resolved conflict A2]: the opaque mask now owns the LINE dissolve, so
      // fading opacity at the line too would be a fade-AND-sink double-up. effCW keeps ONLY the
      // orthogonal solo-cadence center-weight (no line-proximity term) — the relic stays high-
      // opacity right up to the lip so the MASK performs the cut on a VISIBLE relic (soft feathered
      // lip, unforgiving result). Both opacity-dim and the mask key off the same env => no
      // independent-failure path. Plate blur + scale are RETIRED (the mask feather is the sole
      // lip-softener; scale insetting from the contour would de-sync the bulge from the relic edge).
      var effCW = 1 - env*(1 - cw);         // center-weighted presence — drives OPACITY only
      el.style.opacity=effCW.toFixed(3);
      el.style.pointerEvents=(effPos<0.4)?'none':'';   // BR-S232: gate by TRUE line-proximity so a past-line relic the mask has covered can't be hovered/clicked while invisible (opacity ~effCW leaves it in the DOM)
      touched.push(el);
      // box carries raw position-based life: the line deflection is geometric and
      // particle shed keys off the true line crossing; env scales their visible alpha.
      out.push({ l:r.left, r:r.right, cx:(r.left+r.right)/2, cy:cy, hh:r.height/2, life:life, idx:i });
    }
    return out;
  }

  function computeTarget(L, boxes, t){
    var N=L.N, xs=L.xs, tgt=L.tgt, baseY=L.baseY, i;
    // BR-S230 [item 1, outward-only bulge]: derive the recoil direction ONCE per call from
    // the line's geometry, travel-independent. Upper line (baseY < MID_Y) => -1 (y negative =
    // up = outward toward the top edge); lower line => +1 (down = outward toward the bottom).
    // Sign proof: drawLine renders baseY+y[i], so +y=down / -y=up. Replaces the old per-box
    // travel-latched sign (L.side) — the bulge now never flips inward at the crossing.
    var fixedSide = (baseY < MID_Y) ? -1 : 1;
    // BR-S231 [refine, short-viewport two-line pulse — MOTION medium]: cap the engagement range
    // to <=30% of the band so a mid-band plate can never reach BOTH lines at once on a short
    // window (which read as an unintended global top+bottom "breath"). At a tall band this is a
    // no-op (0.30*band > REPEL_RANGE), keeping the deeper/longer feel where there is room.
    var range = Math.min(REPEL_RANGE, (LOWER_Y-UPPER_Y)*0.30);
    for(i=0;i<N;i++) tgt[i]=flow(xs[i],t);
    for(var b=0;b<boxes.length;b++){
      var box=boxes[b], gap=Math.abs(baseY-box.cy), effGap=gap-box.hh; if(effGap<0)effGap=0;
      // BR-S230 [item 1, outward-only bulge]: the recoil sign is now the fixed per-line
      // fixedSide (hoisted above), so the box's travel direction no longer matters and the
      // old travel-latch (box.idx/si + L.side read/write + d-based side) is gone. The LOWER
      // line, which previously recoiled INWARD when approached from below, now recoils
      // outward (down) for the whole crossing. Magnitude curve (prox smoothstep, wobble)
      // unchanged. BR-S231: the dead L.side field + its wake-reset are now fully REMOVED
      // (outward-only is enforced structurally by fixedSide here + the clamp in integrate).
      var prox = 1 - effGap/range; if(prox<=0) continue;
      prox = prox*prox*(3-2*prox);
      // BR-S231 [refine, deep-and-calm not deep-and-throbbing — TASTE]: wob 0.14->0.07 so the
      // deepened bulge ARRIVES and HOLDS at the contact point instead of throbbing ~7px while a
      // card rests at the line (the throb competed with the just-calmed plate for the eye).
      var wob=1+0.07*Math.sin(t*2.3+box.cx*0.01), amp=PUSH*prox*fixedSide*wob, f=FEATHER;
      var i0=Math.floor((box.l-f)/DX); if(i0<0)i0=0; var i1=Math.ceil((box.r+f)/DX); if(i1>N-1)i1=N-1;
      for(i=i0;i<=i1;i++){ var x=xs[i]; var win=smoothstep(box.l-f,box.l+f,x)-smoothstep(box.r-f,box.r+f,x); if(win>0.0001)tgt[i]+=amp*win; }
    }
  }
  function integrate(L){
    var N=L.N, y=L.y, v=L.v, tgt=L.tgt, i;
    for(i=1;i<N-1;i++){ var lap=y[i-1]+y[i+1]-2*y[i]; var acc=FOLLOW*(tgt[i]-y[i])+TENSION*lap-DAMP*v[i]; var nv=v[i]+acc; if(nv>VMAX)nv=VMAX; else if(nv<-VMAX)nv=-VMAX; v[i]=nv; }
    // BR-S231 [refine, outward-only INVARIANT + on-frame guard]: advance y and clamp per line so
    // (a) the line NEVER recoils inward past FLOW_MARGIN (the resting flow current is untouched,
    //     but a release-overshoot dip into the band is impossible — item-1 by construction), and
    // (b) the outward crest NEVER clips the viewport edge (held FRAME_MARGIN inside the frame).
    // Velocity is zeroed at whichever wall is hit, preventing stick-then-jump. One compare/point,
    // zero allocation. fixedSide == computeTarget's: upper(baseY<MID_Y) outward=-y, lower outward=+y.
    if(L.baseY < MID_Y){                         // upper line: outward = -y (toward the top edge)
      var lo = FRAME_MARGIN - L.baseY;           // outward floor: baseY+y >= FRAME_MARGIN
      for(i=1;i<N-1;i++){
        var yu = y[i]+v[i];
        if(yu > FLOW_MARGIN){ yu=FLOW_MARGIN; if(v[i]>0)v[i]=0; }        // no inward (downward) dip
        else if(yu < lo){ yu=lo; if(v[i]<0)v[i]=0; }                    // no off-frame crest
        y[i]=yu;
      }
    } else {                                     // lower line: outward = +y (toward the bottom edge)
      var hi = (H - FRAME_MARGIN) - L.baseY;     // outward ceiling: baseY+y <= H-FRAME_MARGIN
      for(i=1;i<N-1;i++){
        var yl = y[i]+v[i];
        if(yl < -FLOW_MARGIN){ yl=-FLOW_MARGIN; if(v[i]<0)v[i]=0; }     // no inward (upward) dip
        else if(yl > hi){ yl=hi; if(v[i]>0)v[i]=0; }                    // no off-frame crest
        y[i]=yl;
      }
    }
    y[0]=0; y[N-1]=0;
  }
  function edgeGrad(alpha){
    var g=ctx.createLinearGradient(0,0,W,0), e=Math.min(0.18, EDGE_FEATHER/Math.max(1,W));
    g.addColorStop(0,'rgba(255,255,255,0)'); g.addColorStop(e,'rgba(255,255,255,'+alpha+')');
    g.addColorStop(1-e,'rgba(255,255,255,'+alpha+')'); g.addColorStop(1,'rgba(255,255,255,0)'); return g;
  }
  // BR-S232 [refine, line/mask coverage-SYNC — MOTION risk-1 + RHYTHM establish-ramp transient]:
  // render the lit lip through the EXACT coverage-lerp the occluding band uses (drawBand's cy), so
  // during the env iris (entrance/exit) the white lip RIDES the mask inner edge instead of floating
  // at the fixed true contour ahead of the closing dark (which briefly showed a strip of beyond-the-
  // line page content between the darkening edge and the line — breaking "the line IS the edge"
  // exactly while the aperture is performed). top => cy=contour*env ; bottom => cy=H-(H-contour)*env,
  // bit-identical to drawBand. At env=1 cy==contour, so the HOLD state is byte-for-byte unchanged;
  // only the transient syncs. Thickness (th) is added in device px AFTER the lerp (never scaled).
  function drawLine(L,t,env){
    var N=L.N, xs=L.xs, y=L.y, v=L.v, baseY=L.baseY, i, th, c, cy, cp, cpy, cc, ccy;
    var top=(baseY<MID_Y);
    ctx.beginPath();
    for(i=0;i<N;i++){ c=baseY+y[i]; cy=top? c*env : H-(H-c)*env; th=thick(xs[i],v[i],t); ctx.lineTo(xs[i], cy-th); }
    for(i=N-1;i>=0;i--){ c=baseY+y[i]; cy=top? c*env : H-(H-c)*env; th=thick(xs[i],v[i],t); ctx.lineTo(xs[i], cy+th); }
    ctx.closePath(); ctx.fillStyle=edgeGrad(0.10*env); ctx.fill();
    ctx.beginPath(); c=baseY+y[0]; cy=top? c*env : H-(H-c)*env; ctx.moveTo(xs[0], cy);
    for(i=1;i<N;i++){ cp=baseY+y[i-1]; cpy=top? cp*env : H-(H-cp)*env; cc=baseY+y[i]; ccy=top? cc*env : H-(H-cc)*env; var xm=(xs[i-1]+xs[i])/2, ym=(cpy+ccy)/2; ctx.quadraticCurveTo(xs[i-1], cpy, xm, ym); }
    c=baseY+y[N-1]; cy=top? c*env : H-(H-c)*env; ctx.lineTo(xs[N-1], cy);
    ctx.strokeStyle=edgeGrad(STROKE_A*env); ctx.lineWidth=1.1; ctx.lineJoin='round';
    ctx.shadowColor='rgba(255,255,255,'+(GLOW_A*env).toFixed(3)+')'; ctx.shadowBlur=GLOW_BLUR; ctx.stroke(); ctx.shadowBlur=0;
  }
  // BR-S232 — THE APERTURE: two OPAQUE occluding bands that turn the living band between the
  // lines into a SLIT you look through. Everything BEYOND each line goes to the page's own dark
  // (bg-matched maskGrad), so a relic surfaces up out of the dark into the opening and sinks back
  // as it passes a line. The band's INNER EDGE reuses drawLine's EXACT per-column baseY+y[i]
  // quadratic-midpoint contour, so the outward bulge BOWS the slit edge where a relic presses.
  //
  // SAFETY (the #1 regression vector): the TOP band is scaled by upperEnv ONLY and the BOTTOM by
  // lowerEnv ONLY (NEVER vis=max) — during the "We hold the candle" intro lowerEnv=0 while
  // upperEnv>0, so a vis-driven bottom band would black out a strip while its line is absent.
  // Each band is COVERAGE-lerp'd (env scales the inner-edge y, i.e. band HEIGHT, not alpha) and
  // wrapped in if(env>0.001): at env=0 the inner edge collapses onto the frame edge => ZERO height
  // => paint-free even here, strictly after frame()'s vis<=0.001 early-return. Fills run at
  // globalAlpha=1, shadowBlur=0, source-over.
  function drawBands(){
    if(!maskGrad) return;
    if(upperEnv>0.001) drawBand(lines[0], upperEnv, true,  '#151310');   // top: local bg near 0.04H (~#161411/#151310)
    if(lowerEnv>0.001) drawBand(lines[1], lowerEnv, false, '#0a0b0d');   // bottom: local bg near 0.96H (~--ink-950)
  }
  // One occluding band. top=true => fills [0 .. inner-edge]; top=false => [inner-edge .. H].
  // Coverage-lerp: inner-edge y = top ? contour*env : H-(H-contour)*env  (env=0 => collapses onto
  // the frame edge => zero height). edgeCol = the mask base colour used for the contour-following
  // shadow-blurred feather (the SOLE lip-softener). Contour trace is IDENTICAL to drawLine's.
  function drawBand(L, env, top, edgeCol){
    var N=L.N, xs=L.xs, y=L.y, baseY=L.baseY, i, c, cy, pc, pcy, xm, ym;
    ctx.globalAlpha=1; ctx.shadowBlur=0;
    // --- opaque fill ---
    ctx.beginPath();
    c=baseY+y[0]; cy = top ? c*env : H-(H-c)*env;
    ctx.moveTo(xs[0], cy);
    for(i=1;i<N;i++){
      pc=baseY+y[i-1]; pcy = top ? pc*env : H-(H-pc)*env;
      c =baseY+y[i];   cy  = top ? c*env  : H-(H-c)*env;
      xm=(xs[i-1]+xs[i])/2; ym=(pcy+cy)/2;
      ctx.quadraticCurveTo(xs[i-1], pcy, xm, ym);
    }
    c=baseY+y[N-1]; cy = top ? c*env : H-(H-c)*env;
    ctx.lineTo(xs[N-1], cy);
    if(top){ ctx.lineTo(W,0); ctx.lineTo(0,0); } else { ctx.lineTo(W,H); ctx.lineTo(0,H); }
    ctx.closePath();
    ctx.fillStyle=maskGrad; ctx.fill();
    // --- feather (contour-FOLLOWING, so it tracks the bulge crest where a relic presses) ---
    ctx.beginPath();
    c=baseY+y[0]; cy = top ? c*env : H-(H-c)*env;
    ctx.moveTo(xs[0], cy);
    for(i=1;i<N;i++){
      pc=baseY+y[i-1]; pcy = top ? pc*env : H-(H-pc)*env;
      c =baseY+y[i];   cy  = top ? c*env  : H-(H-c)*env;
      xm=(xs[i-1]+xs[i])/2; ym=(pcy+cy)/2;
      ctx.quadraticCurveTo(xs[i-1], pcy, xm, ym);
    }
    c=baseY+y[N-1]; cy = top ? c*env : H-(H-c)*env;
    ctx.lineTo(xs[N-1], cy);
    ctx.strokeStyle=edgeCol; ctx.lineWidth=FEATHER_LIP; ctx.lineJoin='round';
    ctx.shadowColor=edgeCol; ctx.shadowBlur=FEATHER_LIP; ctx.stroke(); ctx.shadowBlur=0;
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
      for(l=0;l<lines.length;l++){ lines[l].y.fill(0); lines[l].v.fill(0); }  // BR-S231: side removed (fixed-sign recoil has no latch); still zero y/v so a mid-band box on wake settles from a flat, calm line
      last=now; accT=0; wasVisible=true;
    }

    var t=now/1000, dt=(now-last)/1000; if(dt<0||dt>0.05)dt=STEP; last=now;
    var envPlate=Math.max(upperEnv, lowerEnv);   // plate dimming keys off whichever line still has presence
    var boxes=gatherBoxes(envPlate);

    if(reduce){                               // static: flat lines, each independently env-faded, plates fully lit
      ctx.clearRect(0,0,W,H);
      drawBands();                            // BR-S232: static coverage-lerp'd bands (physics never runs => y stays 0 => flat contour), each still gated by its own env; the flat white strokes below sit on the lip
      // BR-S232 [refine, line/mask coverage-SYNC — reduced-motion parity]: draw each flat lip at the
      // SAME coverage-lerp'd y as its band edge (not the bare UPPER_Y/LOWER_Y), so the static lip
      // rides the band edge through the env iris here too. y stays 0 in this path, so contour==perch.
      var uy=UPPER_Y*upperEnv;                // top band edge = contour*env
      var ly=H-(H-LOWER_Y)*lowerEnv;          // bottom band edge = H-(H-contour)*env
      ctx.lineWidth=1;
      ctx.strokeStyle='rgba(255,255,255,'+(STROKE_A*upperEnv).toFixed(3)+')';
      ctx.beginPath(); ctx.moveTo(0,uy); ctx.lineTo(W,uy); ctx.stroke();
      ctx.strokeStyle='rgba(255,255,255,'+(STROKE_A*lowerEnv).toFixed(3)+')';
      ctx.beginPath(); ctx.moveTo(0,ly); ctx.lineTo(W,ly); ctx.stroke();
      clearTouched();
      requestAnimationFrame(frame); return;
    }

    for(l=0;l<lines.length;l++) computeTarget(lines[l], boxes, t);
    accT+=dt; var steps=0; while(accT>=STEP && steps<3){ for(l=0;l<lines.length;l++) integrate(lines[l]); accT-=STEP; steps++; }
    ctx.clearRect(0,0,W,H);
    drawBands();                              // BR-S232: opaque bg-matched occluding bands OWN the cut — drawn FIRST so the white line reads as the lit lip on top of the mask (strictly after the vis<=0.001 gate above, so a non-About view is never occluded)
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
