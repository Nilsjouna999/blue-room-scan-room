/* =============================================================
   THE CEREMONY — the arcana forge ceremony (BR-S166 "living ritual plate")
   Direction change: the approved art is a STILL illustration; forcing full-body
   character animation out of it read as a paper-cutout / puppet. So the plate now
   just WAKES UP. The crow is the ONE traveling element; everything else moves
   little but glows, reveals, pulses, and jolts. The smith is STATIC at the approved
   pose (un-split 07_smith.png) — the forge is sold by impact light, not by limbs.
   The five strikes are TIERED: three quiet taps that build the crown, and two
   decisive marks (STRIKE #3, SEAL #5) that carry the full impact stack.
   Time-driven: one render(t) off a single clock, DURATION 12–14s; freeze-safe
   (jumpToEnd = render(DURATION)). Grafted into the mount CONTRACT:
     window.BRCeremony.mount(host, opts) -> { destroy, seek }
     opts.onExit — Back to readings   |   opts.onDone — Enter the reading
   Router (?dev=ceremony) calls mount(host) with NO opts; the intake supplies both.
============================================================= */
(function () {
  "use strict";
  var A = "assets/arcana/ceremony/";
  var DURATION = 14.0;

  function sceneHTML() {
    return "" +
    '<div class="ceremony" data-ceremony>' +
      '<div class="cer-stage" aria-label="Arcana ceremony — sky, cup, forge">' +
        '<img id="bg" class="layer" src="' + A + '00_background_base.png" alt="A shaman, a crow, an anvil, a smith and a forge, in gold line on black." />' +
        '<button type="button" class="cer-nav cer-nav--back" data-view-to="menu" data-cer-back aria-label="Back to readings">&larr;&nbsp;Back to readings</button>' +
        '<button type="button" class="cer-nav cer-nav--skip" data-cer-skip aria-label="Skip the ceremony">Skip the ceremony&nbsp;&rarr;</button>' +

        '<div id="skyBloom"></div>' +
        '<img id="sigil" class="layer" src="' + A + '01_sigil_nocrown.png" alt="" />' +
        '<img id="sigilCrown" class="layer" src="' + A + 'sigil_crown_glyph.png" alt="" />' +
        '<div id="skyStars"></div>' +
        '<div id="gazeBeam"><svg viewBox="0 0 440 345"><line x1="46" y1="332" x2="415" y2="30"/></svg></div>' +

        '<img id="trail" class="layer" src="' + A + '03_dotted_trail.png" alt="" />' +
        '<img id="ground" class="layer" src="' + A + '10_ground_strip.png" alt="" />' +
        '<img id="forge" class="layer" src="' + A + '08_forge_body.png" alt="" />' +
        '<img id="forgeGlow" class="layer" src="' + A + '09_forge_fire_glow.png" alt="" />' +
        '<img id="flame" class="layer" src="' + A + '09a_forge_flame_only.png" alt="" />' +
        '<img id="bucket" class="layer" src="' + A + '05_bucket.png" alt="" />' +
        '<img id="stump" class="layer" src="' + A + '06b_stump_only.png" alt="" />' +
        '<img id="anvil" class="layer" src="' + A + '06a_anvil_only.png" alt="" />' +
        '<img id="smith" class="layer" src="' + A + '07_smith.png" alt="" />' +

        '<img id="shaman" class="layer" src="' + A + '02_shaman.png" alt="" />' +
        '<div class="cup" id="cup" aria-hidden="true">' +
          '<svg viewBox="0 0 86 80">' +
            '<ellipse cx="40" cy="26" rx="26" ry="7"/>' +
            '<path d="M15 26 v14 a25 22 0 0 0 50 0 v-14"/>' +
            '<path d="M65 30 h9 a11 11 0 0 1 0 22 h-6"/>' +
            '<circle class="omen" cx="40" cy="33" r="4.6"/>' +
            '<path class="steam s1" d="M31 16 c-5 -7 6 -8 1 -16"/>' +
            '<path class="steam s2" d="M46 15 c-4 -8 6 -8 2 -17"/>' +
          '</svg>' +
        '</div>' +

        '<div id="crownHalo"></div>' +

        '<div class="sealTok" id="sealTok" aria-hidden="true">' +
          '<svg viewBox="0 0 34 34">' +
            '<circle class="fillw" cx="17" cy="17" r="12.5"/>' +
            '<circle cx="17" cy="17" r="12.5"/>' +
            '<circle cx="17" cy="17" r="8.5"/>' +
            '<path d="M11.5 20.5 L11.5 13.5 L14.5 16.5 L17 11.5 L19.5 16.5 L22.5 13.5 L22.5 20.5 Z"/>' +
          '</svg>' +
        '</div>' +

        '<div class="crownForge" id="crownForge" aria-hidden="true">' +
          '<svg viewBox="0 0 140 85">' +
            '<g class="crownStage" data-stage="0"><path class="hot" d="M33 62 Q70 70 107 62"/><line class="hot" x1="36" y1="62" x2="104" y2="62"/></g>' +
            '<g class="crownStage" data-stage="1"><path class="hot" d="M31 62 L45 40 L58 58 L70 33 L82 58 L95 40 L109 62"/><line class="hot" x1="34" y1="64" x2="106" y2="64"/></g>' +
            '<g class="crownStage" data-stage="2"><path class="hot" d="M31 61 L45 37 L58 57 L70 28 L82 57 L95 37 L109 61"/><path class="hot" d="M45 37 Q58 45 70 28 Q82 45 95 37"/><line class="hot" x1="34" y1="65" x2="106" y2="65"/></g>' +
            '<g class="crownStage" data-stage="3"><path class="hot" d="M31 61 L45 36 L58 56 L70 27 L82 56 L95 36 L109 61"/><path class="hot" d="M45 36 Q58 43 70 27 Q82 43 95 36"/><path class="hot" d="M33 66 Q70 72 107 66"/><line class="hot" x1="36" y1="72" x2="104" y2="72"/><circle cx="45" cy="36" r="2.6"/><circle cx="70" cy="27" r="2.6"/><circle cx="95" cy="36" r="2.6"/></g>' +
            '<g class="crownStage" data-stage="4"><path d="M31 61 L45 36 L58 56 L70 27 L82 56 L95 36 L109 61"/><path d="M45 36 Q58 43 70 27 Q82 43 95 36"/><path d="M33 66 Q70 72 107 66"/><line x1="36" y1="72" x2="104" y2="72"/><circle cx="45" cy="36" r="3"/><circle cx="70" cy="27" r="3"/><circle cx="95" cy="36" r="3"/><circle cx="52" cy="67" r="2"/><circle cx="88" cy="67" r="2"/><circle class="seal" cx="70" cy="68" r="5.4"/></g>' +
          '</svg>' +
        '</div>' +

        '<img id="crowCombined" class="layer" src="' + A + '04_crow_and_envelope.png" alt="" />' +
        '<img id="crow" class="layer" src="' + A + '04a_crow_only.png" alt="" />' +
        '<img id="envelopeDrop" class="layer" src="' + A + '04b_envelope_only.png" alt="" />' +

        '<div class="impactFlash" id="impactFlash"></div>' +
        '<div id="sparkHost"></div><div id="steamHost"></div><div id="smokeHost"></div>' +

        '<div class="vignette"></div>' +
        '<div class="orn"></div>' +
        '<div class="caption" aria-live="polite" aria-atomic="true">' +
          '<div class="title" id="capTitle">THE SKY IS READ</div>' +
          '<div class="sub" id="capSub">the reader questions the heavens.</div>' +
          '<div class="cer-end" data-cer-end hidden><div class="cer-endbtns">' +
            '<button type="button" class="cer-ebtn" data-cer-again>Strike it again</button>' +
            '<button type="button" class="cer-ebtn cer-ebtn--go" data-cer-go>Enter the reading&nbsp;&rarr;</button>' +
          '</div></div>' +
        '</div>' +
        '<div class="bottomRule"></div>' +
      '</div>' +
    '</div>';
  }

  function mount(host, opts) {
    opts = opts || {};
    host.innerHTML = sceneHTML();
    var root = host.querySelector(".ceremony");
    var stage = root.querySelector(".cer-stage");
    var q = function (sel) { return root.querySelector(sel); };
    var $ = function (id) { return root.querySelector("#" + id); };

    var els = {
      sigil: $("sigil"), sigilCrown: $("sigilCrown"), skyBloom: $("skyBloom"), gazeBeam: $("gazeBeam"),
      shaman: $("shaman"), cup: $("cup"), trail: $("trail"), crow: $("crow"), crowC: $("crowCombined"),
      seal: $("sealTok"), smith: $("smith"), anvil: $("anvil"), forge: $("forge"),
      forgeGlow: $("forgeGlow"), flame: $("flame"), halo: $("crownHalo"), crown: $("crownForge"),
      envelope: $("envelopeDrop"), flash: $("impactFlash"),
      capTitle: $("capTitle"), capSub: $("capSub")
    };

    // ---- timeline (12–14s "living ritual plate") ----
    var T = {
      skyA: 0.2, skyB: 1.8,                          // 1. the sky is read (sigil wakes, stars ignite)
      cupIn: 2.0, cupRead: 3.0, cupHold: 3.4, cupOut: 3.5, omenEnd: 4.0,  // 2. the cup is read (rise, held omen, lower)
      crowStart: 3.7, crowHover: 5.8, release: 5.9, crowExit: 6.4,        // 3. the commission is carried (the one traveler)
      landSeal: 6.15, nod1: 6.45, nod2: 6.8, acceptEnd: 7.0,              // 4. accepted — seal rests + double-glows
      quench: 11.0, coolEnd: 12.4, lift: 12.5                             // 6/7. cooled, then drawn
    };
    var hits = [7.4, 8.1, 8.9, 9.9, 10.6];             // 5. struck: tap, tap, STRIKE(#3), pause, tap, SEAL(#5)
    var isAccent = function (k) { return k === 2 || k === 4; };  // the two decisive marks
    var ANVIL_FACE = { x: 968, y: 655 };
    var firstHit = hits[0];

    // ---- helpers ----
    var clamp = function (v, a, b) { a = (a === undefined ? 0 : a); b = (b === undefined ? 1 : b); return Math.max(a, Math.min(b, v)); };
    var ease = function (x) { x = clamp(x); return x * x * (3 - 2 * x); };
    var out = function (x) { x = clamp(x); return 1 - Math.pow(1 - x, 3); };
    var inQuad = function (x) { x = clamp(x); return x * x; };
    var softOut = function (x) { x = clamp(x); return 1 - Math.pow(1 - x, 1.6); };
    var lerp = function (a, b, t) { return a + (b - a) * t; };
    var beat = function (t, a, b) { return clamp((t - a) / (b - a)); };
    var nearPulse = function (t, c, r) { var d = Math.abs(t - c); return d > r ? 0 : 1 - d / r; };
    var setT = function (el, x, y, rot, sc) { el.style.transform = "translate3d(" + (x || 0) + "px," + (y || 0) + "px,0) rotate(" + (rot || 0) + "deg) scale(" + (sc === undefined ? 1 : sc) + ")"; };
    var setO = function (el, v) { el.style.opacity = clamp(v); };
    var caption = function (title, sub) { if (els.capTitle.textContent !== title) els.capTitle.textContent = title; if (els.capSub.textContent !== sub) els.capSub.textContent = sub; };
    var jolt = function (t, c, d) { return (t >= c && t < c + d) ? (1 - (t - c) / d) : 0; };

    // ---- sky stars (ignite one-by-one INSIDE the 1.6s sky beat) ----
    var skyStars = [], starPos = [[610, 150], [790, 150], [600, 300], [800, 300], [697, 110]];
    var sh = $("skyStars"), i;
    starPos.forEach(function (p) { var d = document.createElement("div"); d.className = "skyStar"; d.style.left = p[0] + "px"; d.style.top = p[1] + "px"; sh.appendChild(d); skyStars.push(d); });

    // ---- particles: thinner sparks (ritual embers, not an arcade fountain) ----
    var sparkHost = $("sparkHost"), sparks = [];
    for (i = 0; i < 8; i++) {
      var sEl = document.createElement("div"); sEl.className = "spark"; sparkHost.appendChild(sEl);
      sparks.push({ el: sEl, ang: (-150 + (i / 7) * 120 + (i % 3) * 4) * Math.PI / 180, dist: 16 + ((i * 29) % 32), delay: ((i * 11) % 7) / 100, life: 0.34 + ((i * 7) % 18) / 100, size: 1.5 + ((i * 11) % 14) / 10 });
    }
    var steamHost = $("steamHost"), steam = [];
    for (i = 0; i < 11; i++) {
      var stEl = document.createElement("div"); stEl.className = "steam"; steamHost.appendChild(stEl);
      steam.push({ el: stEl, off: i * 0.045, drift: ((i % 2) ? 1 : -1) * (14 + (i * 9) % 44), lift: 44 + ((i * 17) % 62) });
    }
    var smokeHost = $("smokeHost"), pipeSmoke = [];
    for (i = 0; i < 8; i++) {
      var pEl = document.createElement("div"); pEl.className = "pipeSmoke"; smokeHost.appendChild(pEl);
      pipeSmoke.push({ el: pEl, off: i * 0.12, drift: ((i % 2) ? 1 : -1) * (8 + (i * 7) % 20), lift: 30 + (i * 13) % 42, scale: 0.5 + (i % 4) * 0.22 });
    }

    // sparks fly ONLY on the two accented marks (#3 STRIKE, #5 SEAL)
    function updateSparks(t) {
      var idx = 0; hits.forEach(function (h, k) { if (Math.abs(t - h) < Math.abs(t - hits[idx])) idx = k; });
      if (!isAccent(idx)) { sparks.forEach(function (s) { s.el.style.opacity = 0; }); return; }
      var c = hits[idx], local = t - c, big = (idx === 4);
      sparks.forEach(function (s) {
        var tt = (local - s.delay) / s.life;
        if (tt < 0 || tt > 1) { s.el.style.opacity = 0; return; }
        var e = out(tt), g = 40 * tt * tt;
        var x = ANVIL_FACE.x + Math.cos(s.ang) * s.dist * e * (big ? 1.1 : 0.9);
        var y = ANVIL_FACE.y + Math.sin(s.ang) * s.dist * e * (big ? 1.1 : 0.9) + g;
        s.el.style.left = x + "px"; s.el.style.top = y + "px"; s.el.style.width = s.el.style.height = s.size + "px";
        s.el.style.opacity = String((1 - tt) * (big ? 0.6 : 0.5)); s.el.style.transform = "scale(" + (1 + tt * 0.5) + ")";
      });
    }
    function updateSteam(t) {
      var s0 = T.quench + 0.05;
      steam.forEach(function (s) {
        var local = t - s0 - s.off;
        if (local < 0 || local > 1.6) { s.el.style.opacity = 0; return; }
        var e = out(local / 1.6);
        s.el.style.left = (ANVIL_FACE.x - 8 + s.drift * e) + "px";
        s.el.style.top = (ANVIL_FACE.y - 2 - s.lift * e) + "px";
        s.el.style.transform = "scale(" + (0.4 + e * 2.0) + ")";
        var hiss = local < 0.2 ? 1 : (1 - e);
        s.el.style.opacity = String(0.42 * hiss * (1 - e * 0.4));
      });
    }
    function updatePipeSmoke(t) {
      var bursts = [1.8, 8.6, 12.6];           // slow ambient drift on quiet beats, all inside 0–14s
      pipeSmoke.forEach(function (s) {
        var best = -99; bursts.forEach(function (b) { var local = t - b - s.off; if (local >= 0 && local < 1.8) best = local; });
        if (best < 0) { s.el.style.opacity = 0; return; }
        var e = out(best / 1.8);
        s.el.style.left = (1260 + s.drift * e) + "px";
        s.el.style.top = (492 - s.lift * e) + "px";
        s.el.style.transform = "scale(" + (s.scale + e * 1.25) + ")";
        s.el.style.opacity = String(0.24 * (1 - e));
      });
    }
    function updateCrown(stageNum, hotPulse, coolT) {
      els.crown.querySelectorAll(".crownStage").forEach(function (g) { g.style.opacity = Number(g.dataset.stage) === stageNum ? 1 : 0; });
      var glow = (1 - coolT) * (0.10 + hotPulse * 0.5) + coolT * 0.06;
      els.crown.style.filter = "drop-shadow(0 0 " + (8 + hotPulse * 12) + "px rgba(255,151,47," + glow + "))";
    }

    function render(rawT) {
      var t = Math.min(rawT, DURATION);
      // per-frame ephemerals off
      setO(els.flash, 0); setO(els.envelope, 0);
      els.cup.querySelectorAll(".steam").forEach(function (p) { p.style.opacity = 0; });
      els.cup.querySelector(".omen").style.opacity = 0;

      // ===== the five marks, TIERED — compute once, drives smith + forge + flash + crown =====
      var smithDip = 0, anvilDip = 0, tapImpact = 0, accentImpact = 0, forgePulse = 0;
      hits.forEach(function (h, k) {
        var j = jolt(t, h, 0.16), near = nearPulse(t, h, 0.12), acc = isAccent(k);
        smithDip += j * (acc ? 2.4 : 1.4);
        anvilDip += j * (acc ? 2.2 : 1.3);
        tapImpact = Math.max(tapImpact, near);
        if (acc) { accentImpact = Math.max(accentImpact, near); forgePulse = Math.max(forgePulse, nearPulse(t, h, 0.16)); }
      });

      // ===== FORGE fire: living flame + glow; pulses only on the two accented marks =====
      var flick = 1 + 0.035 * Math.sin(t * 11.3) + 0.02 * Math.sin(t * 7.1 + 1.7) + 0.012 * Math.sin(t * 17.7);
      var quenchDim = 1 - 0.35 * ease(beat(t, T.quench, T.quench + 0.8)) * (1 - ease(beat(t, T.lift, T.lift + 0.8)));
      els.flame.style.transform = "translate3d(0,0,0) scaleY(" + (flick + forgePulse * 0.06) + ") scaleX(" + (1 - (flick - 1) * 0.6) + ")";
      els.flame.style.opacity = String((0.86 + 0.08 * Math.sin(t * 0.7)) * quenchDim);
      els.forgeGlow.style.opacity = String((0.5 + 0.12 * Math.sin(t * 0.9) + forgePulse * 0.25) * quenchDim);
      els.forge.style.filter = "drop-shadow(0 0 " + (9 + Math.sin(t * 4) * 2 + forgePulse * 10) + "px rgba(220,130,42," + ((0.13 + forgePulse * 0.22) * quenchDim) + "))";
      updatePipeSmoke(t);

      // ===== 1. THE SKY IS READ — sigil wakes/draws in, stars ignite, gaze up =====
      var skyRead = ease(beat(t, T.skyA, T.skyB));
      var sigBrite = lerp(0.28, 0.96, skyRead);
      var forgeFocus = ease(beat(t, T.acceptEnd - 0.5, T.acceptEnd + 0.6));   // sky sigil recedes as the forge takes over
      var sigilCoolIn = ease(beat(t, T.quench + 0.4, T.lift + 0.6));
      els.sigil.style.opacity = String(sigBrite * (1 - 0.62 * forgeFocus));
      els.sigil.style.transform = "translate3d(0," + (Math.sin(t * 1.05) * 1.2) + "px,0) scale(" + lerp(0.965, 1, skyRead) + ")";  // gentle draw-in
      els.skyBloom.style.opacity = String((0.2 + 0.8 * skyRead) * (1 - ease(beat(t, T.cupRead, T.omenEnd))) * (1 - 0.7 * forgeFocus));
      // stars ignite one-by-one, all lit inside the sky beat, then fade as the cup takes over
      skyStars.forEach(function (d, k) { var a = beat(t, T.skyA + 0.15 + k * 0.22, T.skyA + 0.6 + k * 0.22); var fade = 1 - ease(beat(t, T.cupRead, T.omenEnd));
        d.style.opacity = String(ease(a) * fade * (0.7 + 0.3 * Math.sin(t * 4 + k))); });
      var gaze = ease(beat(t, T.skyA + 0.5, T.skyA + 1.4)) * (1 - ease(beat(t, T.cupIn - 0.2, T.cupIn + 0.3)));
      els.gazeBeam.style.opacity = String(gaze * 0.55);
      els.sigilCrown.style.opacity = String(clamp((sigBrite * (1 - 0.62 * forgeFocus)) * 0.95 + sigilCoolIn * 0.32));

      // ===== SHAMAN — near-still; micro-tilts capped, forge-watch is GLOW not tilt =====
      var lookUp = ease(beat(t, T.skyA, T.skyB - 0.3)) * (1 - ease(beat(t, T.cupIn - 0.2, T.cupIn + 0.4)));
      var lookDown = ease(beat(t, T.cupIn, T.cupRead)) * (1 - ease(beat(t, T.cupOut, T.omenEnd)));
      var shRot = lerp(0, -2.0, lookUp) + lerp(0, 1.5, lookDown);        // capped micro-lean; NO forge-watch rotation
      setT(els.shaman, Math.sin(t * 1.8) * 0.3, 0, shRot, 1);
      var skyGlow = lookUp * (1 - ease(beat(t, T.cupIn - 0.1, T.cupRead)));
      var watchGlow = ease(beat(t, T.acceptEnd, T.acceptEnd + 0.8)) * (1 - ease(beat(t, T.lift + 0.4, T.lift + 1.2)));
      els.shaman.style.filter = "drop-shadow(0 0 " + (4 + accentImpact * 6 * watchGlow + skyGlow * 9) + "px rgba(230,182,104," + (0.05 + accentImpact * 0.14 * watchGlow + skyGlow * 0.20) + "))";

      // ===== 2. THE CUP IS READ — small lift, held omen ripple, then lower (glow-led) =====
      var cupUp = ease(beat(t, T.cupIn, T.cupRead));
      var cupGone = ease(beat(t, T.cupOut, T.omenEnd));
      var cupOp = cupUp * (1 - cupGone);
      setO(els.cup, cupOp);
      setT(els.cup, lerp(-2, 2, cupUp), lerp(14, 4, cupUp), lerp(4, -6, cupUp), lerp(0.94, 1.03, cupUp));  // ~10px lift, small tip
      if (cupOp > 0.2) {
        var omenGlow = ease(beat(t, T.cupRead, T.cupHold)) * (1 - cupGone);   // blooms 3.0→3.4, HELD to 3.5, then lowers
        els.cup.querySelectorAll(".steam").forEach(function (p, k) { p.style.opacity = String((0.2 + 0.16 * Math.sin(t * 5 + k)) * cupUp * (1 - cupGone)); });
        els.cup.querySelector(".omen").style.opacity = String(omenGlow * (0.75 + 0.25 * Math.sin(t * 3)));
      }

      // ===== 3. THE COMMISSION IS CARRIED — the crow (the one traveling element) =====
      var cIn = softOut(beat(t, T.crowStart, T.crowHover));
      var flyX = lerp(-640, 0, cIn);
      var flyY = lerp(-108, 0, ease(beat(cIn, 0.42, 1.0)));
      var bob = 5 * Math.sin(t * 7.0) * (1 - cIn) * (t < T.release ? 1 : 0.3);   // a touch more wingbeat at the faster pace
      var pitchDesc = lerp(0, 5, ease(beat(t, T.crowHover - 0.5, T.release)));
      var ex = ease(beat(t, T.release, T.crowExit));
      var cx = flyX + lerp(0, 210, ex);
      var cy = flyY + bob + lerp(0, -140, ex);
      var cr = -pitchDesc + lerp(0, 12, ex);
      var cs = lerp(0.66, 1, cIn) * lerp(1, 0.7, ex);
      var crowVisible = ease(beat(t, T.crowStart + 0.3, T.crowStart + 0.9));
      setO(els.crowC, crowVisible * (1 - ease(beat(t, T.release - 0.05, T.release + 0.2))));
      setT(els.crowC, cx, cy, cr, cs);
      setO(els.crow, ease(beat(t, T.release - 0.05, T.release + 0.2)) * (1 - ease(beat(t, T.release + 0.05, T.crowExit - 0.05))));
      setT(els.crow, cx, cy, cr, cs);
      setO(els.trail, ease(beat(t, T.crowStart + 0.6, T.crowStart + 1.4)) * (1 - ease(beat(t, T.crowHover - 0.4, T.release))) * 0.85);

      // ===== 4. THE COMMISSION IS ACCEPTED — envelope distills, seal GLOWS IN on the anvil (no slide) =====
      // envelope: a short vertical drop by the crow, then it distills (fades + shrinks) into the seal
      if (t >= T.release && t < T.release + 0.55) {
        var ea = beat(t, T.release, T.release + 0.5);
        setO(els.envelope, ease(beat(t, T.release, T.release + 0.12)) * (1 - ease(beat(t, T.release + 0.3, T.release + 0.5))));
        setT(els.envelope, 0, lerp(0, 26, out(ea)), lerp(0, -6, ea), lerp(1, 0.7, ea));
      }
      // seal: materializes at rest ON the anvil (element centre already = 968,649), double-glows on the nods, consumed at hit1
      var sOp = 0, sGlow = 0, sScaleY = 1, sPop = 1;
      if (t >= T.release + 0.2 && t < firstHit) {
        sOp = ease(beat(t, T.release + 0.2, T.release + 0.5));
        sPop = 1 + 0.12 * (1 - ease(beat(t, T.release + 0.2, T.release + 0.55)));    // small materialize pop
        sGlow = 0.25 + 0.42 * (nearPulse(t, T.nod1, 0.25) + nearPulse(t, T.nod2, 0.22));  // "reads it twice"
      } else if (t >= firstHit && t < firstHit + 0.16) {
        var cf = beat(t, firstHit, firstHit + 0.14);
        sOp = 1 - cf; sScaleY = lerp(1, 0.14, cf); sGlow = 1;
      }
      if (sOp > 0) {
        setO(els.seal, sOp);
        els.seal.style.transform = "translate3d(0,0,0) scale(" + sPop + ") scaleY(" + sScaleY + ")";
        els.seal.style.filter = "drop-shadow(0 0 " + (6 + sGlow * 16) + "px rgba(255,172,74," + (0.3 + sGlow * 0.6) + "))";
      } else setO(els.seal, 0);

      // ===== SMITH — STATIC pose; only a small vertical jolt on marks + a 1.5px bow on the accept-nods =====
      var nodDip = nearPulse(t, T.nod1, 0.22) * 1.5 + nearPulse(t, T.nod2, 0.20) * 1.3;
      setT(els.smith, 0, smithDip + nodDip, 0, 1);          // NO rotation — the plate stays locked
      setT(els.anvil, 0, anvilDip, 0, anvilDip > 0 ? 0.99 : 1);

      // ===== 5. impact flash — soft & only on the accented marks =====
      setO(els.flash, accentImpact * 0.8);
      els.flash.style.transform = "scale(" + (0.4 + accentImpact * 1.7) + ")";
      updateSparks(t);

      // ===== CROWN — one readable stage per mark; settles & the HALO carries the ascent =====
      var stageNum = -1; hits.forEach(function (h, k) { if (t >= h) stageNum = k; });
      var cool = ease(beat(t, T.quench, T.coolEnd));
      if (stageNum >= 0) {
        var crownLift = ease(beat(t, T.lift, DURATION - 0.3));
        els.crown.style.opacity = String(lerp(1, 0.95, cool));
        var grow = 1 + crownLift * 0.2;                                // forms UP from its seat (pivot 50% 84%)
        setT(els.crown, 0, -crownLift * 20, 0, lerp(1, 0.98, cool) * grow);   // a settle, not a launch
        updateCrown(stageNum, tapImpact * 0.4 + accentImpact * 0.6, cool);
        var haloOn = ease(beat(t, hits[1], hits[4])) * (1 - 0.3 * cool) + crownLift * 0.7;
        els.halo.style.opacity = String(clamp(haloOn * 0.9));
        els.halo.style.transform = "translate3d(0," + (-crownLift * 20 - crownLift * 14) + "px,0) scale(" + lerp(1, 1.32, crownLift) + ")";  // light rises freely
      } else { els.crown.style.opacity = "0"; els.halo.style.opacity = "0"; }

      // ===== 6. THE METAL IS COOLED — glow cools + steam + forge dim (no literal water pour) =====
      updateSteam(t);

      // ===== captions (synced to the beats) =====
      if (t < T.cupIn) caption("THE SKY IS READ", "the reader questions the heavens.");
      else if (t < T.omenEnd) caption("THE CUP IS READ", "then the grounds give their answer.");
      else if (t < T.crowExit - 0.4) caption("THE COMMISSION IS CARRIED", "by crow, sealed and witnessed.");
      else if (t < firstHit) caption("THE COMMISSION IS ACCEPTED", "the smith reads it twice. it is a crown.");
      else if (t < T.quench) caption("THE CROWN IS STRUCK", "five marks, one shape.");
      else if (t < T.lift) caption("THE METAL IS COOLED", "the answer settles into pale gold.");
      else caption("THE READING IS DRAWN", "filed, sealed, and cooling.");
    }

    // ---- clock + controls (the mount contract) ----
    var raf = null, destroyed = false, done = false, startClock = 0;
    var endEl = q("[data-cer-end]"), skipEl = q("[data-cer-skip]"), backEl = q("[data-cer-back]"),
        againEl = q("[data-cer-again]"), goEl = q("[data-cer-go]");

    function fit() { var s = Math.min(window.innerWidth / 1448, window.innerHeight / 1086); stage.style.transform = "scale(" + s + ")"; }
    function setDone(v) { done = v; if (endEl) endEl.hidden = !v; if (skipEl) skipEl.hidden = v; }
    function frame(now) {
      if (destroyed) return;
      var t = (now - startClock) / 1000;
      if (t >= DURATION) { render(DURATION); finish(); return; }
      render(t);
      raf = requestAnimationFrame(frame);
    }
    function start() {
      if (raf) cancelAnimationFrame(raf);
      setDone(false);
      startClock = performance.now();
      render(0);
      raf = requestAnimationFrame(frame);
    }
    function finish() { if (raf) { cancelAnimationFrame(raf); raf = null; } setDone(true); }
    function jumpToEnd() { if (raf) { cancelAnimationFrame(raf); raf = null; } render(DURATION); setDone(true); }
    function proceed() { if (opts.onDone) opts.onDone(); else location.href = "?dev=arcana-result"; }
    function onKey(e) { if (e.key === "Escape") { if (done) proceed(); else jumpToEnd(); } }

    if (skipEl) skipEl.addEventListener("click", jumpToEnd);
    if (againEl) againEl.addEventListener("click", start);
    if (goEl) goEl.addEventListener("click", proceed);
    // Back: the intake supplies onExit (return to the marks); on the dev route the
    // button keeps data-view-to="menu" for the app's delegated nav. Never both.
    if (backEl && opts.onExit) { backEl.removeAttribute("data-view-to"); backEl.addEventListener("click", function () { opts.onExit(); }); }

    window.addEventListener("resize", fit); fit();
    window.addEventListener("keydown", onKey);

    var rm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm) { render(DURATION); setDone(true); } else start();

    return {
      destroy: function () {
        destroyed = true;
        if (raf) { cancelAnimationFrame(raf); raf = null; }
        window.removeEventListener("resize", fit);
        window.removeEventListener("keydown", onKey);
      },
      // QA scrubbing only (router/intake ignore it): cancel the loop, paint one frame.
      seek: function (tt) { if (destroyed) return; if (raf) { cancelAnimationFrame(raf); raf = null; } render(Math.max(0, Math.min(tt, DURATION))); }
    };
  }

  window.BRCeremony = { mount: mount };
})();
