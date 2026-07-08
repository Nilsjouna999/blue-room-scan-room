/* =============================================================
   THE CEREMONY — the arcana forge ceremony (BR-S165 sprite-rig rebuild)
   Replaces the flat single-frame + procedural-hammer build with the finished
   SEPARATED-LAYER build: the smith's OWN arm+hammer (rightarm.png, cut from the
   source art) actually swings and strikes the anvil. Sky-read → cup-read → the
   crow carries the sealed commission → the smith accepts and strikes the crown
   over 5 marks → quench → the reading is drawn. Time-driven: one render(t) off a
   single clock, DURATION 20.8s; freeze-safe (jumpToEnd = render(DURATION)).
   The finished build's engine is grafted into the ceremony's mount CONTRACT:
   window.BRCeremony.mount(host, opts) -> { destroy }.
     opts.onExit — Back to readings (the intake returns to the marks)
     opts.onDone — Enter the reading (-> the result room)
   Router (?dev=ceremony) calls mount(host) with NO opts; the intake supplies both.
============================================================= */
(function () {
  "use strict";
  var A = "assets/arcana/ceremony/";
  var DURATION = 20.8;

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
        '<img id="smith" class="layer" src="' + A + '07_smith_norightarm.png" alt="" />' +
        '<img id="rightArm" class="layer" src="' + A + 'rightarm.png" alt="" />' +

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
        '<div class="waterPour" id="waterPour" aria-hidden="true"><svg viewBox="0 0 150 120">' +
          '<path class="stream" d="M22 60 C48 40, 84 44, 110 62"/>' +
          '<circle class="drop" cx="107" cy="68" r="2.3"/><circle class="drop" cx="114" cy="76" r="1.7"/><circle class="drop" cx="101" cy="77" r="2"/>' +
        '</svg></div>' +
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
      seal: $("sealTok"), smith: $("smith"), anvil: $("anvil"), bucket: $("bucket"), forge: $("forge"),
      forgeGlow: $("forgeGlow"), flame: $("flame"), halo: $("crownHalo"), crown: $("crownForge"),
      rightArm: $("rightArm"), envelope: $("envelopeDrop"), flash: $("impactFlash"), water: $("waterPour"),
      capTitle: $("capTitle"), capSub: $("capSub")
    };

    // ---- timeline ----
    var T = {
      skyA: 0.3, skyB: 3.6,                     // read the sky
      cupIn: 3.7, cupRead: 4.9, cupOut: 7.1,    // read the cup
      omenEnd: 7.5,
      crowStart: 7.7, crowHover: 10.7, release: 11.0, crowExit: 12.0,
      nod1: 12.3, nod2: 12.75, acceptEnd: 13.35,
      hammerIn: 12.9,
      quench: 17.9, coolEnd: 19.35,
      lift: 19.45
    };
    var hits = [13.35, 14.35, 15.28, 16.12, 16.90];   // steady -> accelerating
    var ANVIL_FACE = { x: 968, y: 655 };

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

    // ---- sky stars ----
    var skyStars = [], starPos = [[610, 150], [790, 150], [600, 300], [800, 300], [697, 110]];
    var sh = $("skyStars");
    starPos.forEach(function (p) { var d = document.createElement("div"); d.className = "skyStar"; d.style.left = p[0] + "px"; d.style.top = p[1] + "px"; sh.appendChild(d); skyStars.push(d); });

    // ---- particles ----
    var sparkHost = $("sparkHost"), sparks = [], i;
    for (i = 0; i < 14; i++) {
      var sEl = document.createElement("div"); sEl.className = "spark"; sparkHost.appendChild(sEl);
      sparks.push({ el: sEl, ang: (-158 + (i / 13) * 116 + (i % 3) * 3) * Math.PI / 180, dist: 22 + ((i * 37) % 60), delay: ((i * 11) % 8) / 100 - 0.025, life: 0.40 + ((i * 7) % 26) / 100, size: 1.8 + ((i * 11) % 24) / 10 });
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

    function updateSparks(t) {
      var idx = 0; hits.forEach(function (h, k) { if (Math.abs(t - h) < Math.abs(t - hits[idx])) idx = k; });
      var c = hits[idx], local = t - c, strong = (idx === 2 || idx === 4);
      sparks.forEach(function (s) {
        var tt = (local - s.delay) / s.life;
        if (tt < 0 || tt > 1) { s.el.style.opacity = 0; return; }
        var e = out(tt), g = 46 * tt * tt;
        var x = ANVIL_FACE.x + Math.cos(s.ang) * s.dist * e * (strong ? 1.15 : 0.85);
        var y = ANVIL_FACE.y + Math.sin(s.ang) * s.dist * e * (strong ? 1.15 : 0.85) + g;
        s.el.style.left = x + "px"; s.el.style.top = y + "px"; s.el.style.width = s.el.style.height = s.size + "px";
        s.el.style.opacity = String((1 - tt) * (strong ? 0.95 : 0.7)); s.el.style.transform = "scale(" + (1 + tt * 0.6) + ")";
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
      var bursts = [2.25, 10.25, 18.85];
      pipeSmoke.forEach(function (s) {
        var best = -99; bursts.forEach(function (b) { var local = t - b - s.off; if (local >= 0 && local < 1.8) best = local; });
        if (best < 0) { s.el.style.opacity = 0; return; }
        var e = out(best / 1.8);
        s.el.style.left = (1260 + s.drift * e) + "px";
        s.el.style.top = (492 - s.lift * e) + "px";
        s.el.style.transform = "scale(" + (s.scale + e * 1.25) + ")";
        s.el.style.opacity = String(0.26 * (1 - e));
      });
    }
    function updateCrown(stageNum, hotPulse, coolT) {
      els.crown.querySelectorAll(".crownStage").forEach(function (g) { g.style.opacity = Number(g.dataset.stage) === stageNum ? 1 : 0; });
      var glow = (1 - coolT) * (0.10 + hotPulse * 0.5) + coolT * 0.08;
      els.crown.style.filter = "drop-shadow(0 0 " + (8 + hotPulse * 12) + "px rgba(255,151,47," + glow + "))";
    }

    function render(rawT) {
      var t = Math.min(rawT, DURATION);
      // per-frame ephemerals off
      setO(els.trail, 0); setO(els.flash, 0); setO(els.water, 0); setO(els.envelope, 0);
      els.cup.querySelectorAll(".steam").forEach(function (p) { p.style.opacity = 0; });
      els.cup.querySelector(".omen").style.opacity = 0;

      // ===== FORGE fire: living flame + glow, one warm hero =====
      var flick = 1 + 0.035 * Math.sin(t * 11.3) + 0.02 * Math.sin(t * 7.1 + 1.7) + 0.012 * Math.sin(t * 17.7);
      var strikeFlare = 0; hits.forEach(function (h) { strikeFlare = Math.max(strikeFlare, nearPulse(t, h, 0.16)); });
      var quenchDim = 1 - 0.35 * ease(beat(t, T.quench, T.quench + 0.8)) * (1 - ease(beat(t, T.lift, T.lift + 0.8)));
      els.flame.style.transform = "translate3d(0,0,0) scaleY(" + (flick + strikeFlare * 0.06) + ") scaleX(" + (1 - (flick - 1) * 0.6) + ")";
      els.flame.style.opacity = String((0.86 + 0.08 * Math.sin(t * 0.7)) * quenchDim);
      els.forgeGlow.style.opacity = String((0.5 + 0.12 * Math.sin(t * 0.9) + strikeFlare * 0.25) * quenchDim);
      els.forge.style.filter = "drop-shadow(0 0 " + (9 + Math.sin(t * 4) * 2 + strikeFlare * 10) + "px rgba(220,130,42," + ((0.13 + strikeFlare * 0.22) * quenchDim) + "))";
      updatePipeSmoke(t);

      // ===== OMEN part 1 — READ THE SKY =====
      var skyRead = ease(beat(t, T.skyA, T.skyB));
      var sigBrite = lerp(0.28, 0.96, skyRead);
      var forgeFocus = ease(beat(t, T.hammerIn - 0.3, T.hammerIn + 1.0));
      var sigilCoolIn = ease(beat(t, T.quench + 0.4, T.lift + 0.6));
      els.sigil.style.opacity = String(sigBrite * (1 - 0.62 * forgeFocus));
      els.sigil.style.transform = "translate3d(0," + (Math.sin(t * 1.05) * 1.2) + "px,0)";
      els.skyBloom.style.opacity = String((0.2 + 0.8 * skyRead) * (1 - ease(beat(t, T.cupRead, T.omenEnd))) * (1 - 0.7 * forgeFocus));
      skyStars.forEach(function (d, k) { var a = beat(t, T.skyA + 0.3 + k * 0.42, T.skyA + 0.9 + k * 0.42); var fade = 1 - ease(beat(t, T.cupRead, T.omenEnd));
        d.style.opacity = String(ease(a) * fade * (0.7 + 0.3 * Math.sin(t * 4 + k))); });
      var gaze = ease(beat(t, T.skyA + 0.5, T.skyA + 1.7)) * (1 - ease(beat(t, T.cupIn - 0.2, T.cupIn + 0.4)));
      els.gazeBeam.style.opacity = String(gaze * 0.6);
      els.sigilCrown.style.opacity = String(clamp((sigBrite * (1 - 0.62 * forgeFocus)) * 0.95 + sigilCoolIn * 0.28));

      // shaman: look UP for the sky, DOWN into the cup
      var lookUp = ease(beat(t, T.skyA, T.skyB - 0.4)) * (1 - ease(beat(t, T.cupIn - 0.2, T.cupIn + 0.5)));
      var lookDown = ease(beat(t, T.cupIn, T.cupRead)) * (1 - ease(beat(t, T.cupOut, T.omenEnd)));
      var shRot = lerp(0, -6.0, lookUp) + lerp(0, 2.4, lookDown);
      var strikeReact = 0; hits.forEach(function (h) { strikeReact = Math.max(strikeReact, nearPulse(t, h, 0.18)); });
      var watchForge = ease(beat(t, T.acceptEnd, T.acceptEnd + 0.8)) * (1 - ease(beat(t, T.lift + 0.6, T.lift + 1.4)));
      shRot += watchForge * 2.4;
      setT(els.shaman, Math.sin(t * 1.8) * 0.3, 0, shRot, 1);
      var skyGlow = lookUp * (1 - ease(beat(t, T.cupIn - 0.1, T.cupRead)));
      els.shaman.style.filter = "drop-shadow(0 0 " + (4 + strikeReact * 6 * watchForge + skyGlow * 9) + "px rgba(230,182,104," + (0.05 + strikeReact * 0.14 * watchForge + skyGlow * 0.20) + "))";

      // cup: rises in front, tilts to read, omen glint, then lowers
      var cupUp = ease(beat(t, T.cupIn, T.cupRead));
      var cupGone = ease(beat(t, T.cupOut, T.omenEnd));
      var cupOp = cupUp * (1 - cupGone);
      setO(els.cup, cupOp);
      var cupTilt = lerp(6, -14, cupUp);
      setT(els.cup, lerp(-4, 4, cupUp), lerp(30, 4, cupUp), cupTilt, lerp(0.9, 1.05, cupUp));
      if (cupOp > 0.2) {
        els.cup.querySelectorAll(".steam").forEach(function (p, k) { p.style.opacity = String((0.2 + 0.16 * Math.sin(t * 5 + k)) * cupUp * (1 - cupGone)); });
        els.cup.querySelector(".omen").style.opacity = String(ease(beat(t, T.cupRead, T.cupRead + 0.8)) * (1 - cupGone) * (0.7 + 0.3 * Math.sin(t * 3)));
      }

      // ===== CARRIED — crow enters from the LEFT EDGE, delivers over the anvil =====
      var cIn = softOut(beat(t, T.crowStart, T.crowHover));
      var flyX = lerp(-640, 0, cIn);
      var flyY = lerp(-108, 0, ease(beat(cIn, 0.42, 1.0)));
      var bob = 4 * Math.sin(t * 6.2) * (1 - cIn) * (t < T.release ? 1 : 0.3);
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

      // dropped commission: real envelope art first, then distilled into the seal token
      var firstHit = hits[0];
      var envHome = { x: 761 + 55, y: 475 + 44 };
      var envRest = { x: ANVIL_FACE.x, y: 640 };
      if (t >= T.release && t < firstHit - 0.08) {
        var ea = beat(t, T.release, T.release + 1.08);
        var ee = out(ea);
        var evx = lerp(envHome.x, envRest.x, ee) - envHome.x;
        var evy = lerp(envHome.y, envRest.y, inQuad(ea)) + Math.sin(Math.PI * ea) * -18 - envHome.y;
        setO(els.envelope, ease(beat(t, T.release, T.release + 0.10)) * (1 - ease(beat(t, firstHit - 0.28, firstHit - 0.08))));
        setT(els.envelope, evx, evy, lerp(0, -10, ee), lerp(1, 0.62, ee));
      }

      // ===== SEAL — released at the beak, falls to the anvil, rests, struck =====
      var beakX = ANVIL_FACE.x, beakY = 640;
      var sOp = 0, sx = 0, sy = 0, sScaleY = 1, sGlow = 0;
      var restCx = ANVIL_FACE.x, restCy = 642;
      var homeCx = 951 + 17, homeCy = 632 + 17;
      if (t >= T.release && t < T.nod1) {
        var sa = beat(t, T.release + 0.85, T.release + 1.25);
        sOp = ease(beat(t, T.release + 0.82, T.release + 0.98));
        var fx = lerp(beakX, restCx, out(sa));
        var fy = lerp(beakY, restCy, inQuad(sa)) + (sa > 0.9 ? -Math.sin((sa - 0.9) / 0.1 * Math.PI) * 6 : 0);
        sx = fx - homeCx; sy = fy - homeCy;
        sScaleY = sa > 0.9 ? lerp(1, 0.9, Math.sin((sa - 0.9) / 0.1 * Math.PI)) : 1;
        sGlow = 0.2;
      } else if (t >= T.nod1 && t < firstHit) {
        sOp = 1; sx = restCx - homeCx; sy = restCy - homeCy;
        sGlow = 0.2 + 0.32 * (nearPulse(t, T.nod1, 0.3) + nearPulse(t, T.nod2, 0.28));
      } else if (t >= firstHit && t < firstHit + 0.16) {
        var cf = beat(t, firstHit, firstHit + 0.14);
        sOp = 1 - cf; sx = restCx - homeCx; sy = restCy - homeCy; sScaleY = lerp(1, 0.14, cf); sGlow = 1;
      }
      if (sOp > 0) {
        setO(els.seal, sOp);
        els.seal.style.transform = "translate3d(" + sx + "px," + sy + "px,0) scaleY(" + sScaleY + ")";
        els.seal.style.filter = "drop-shadow(0 0 " + (5 + sGlow * 16) + "px rgba(255,172,74," + (0.25 + sGlow * 0.6) + "))";
      } else setO(els.seal, 0);

      // ===== SMITH jolt on contact; anvil squashes =====
      var smithDip = 0, anvilDip = 0, impact = 0;
      hits.forEach(function (h) { var j = jolt(t, h, 0.16); impact = Math.max(impact, nearPulse(t, h, 0.12)); smithDip += j * 2.0; anvilDip += j * 2.0; });
      var nod = nearPulse(t, T.nod1, 0.3) * 1.2 + nearPulse(t, T.nod2, 0.28) * 1.0;
      setT(els.smith, 0, smithDip, nod * 1.2 + watchForge * 0.6, 1);
      setT(els.anvil, 0, anvilDip, 0, anvilDip > 0 ? 0.985 : 1);

      // ===== SMITH RIGHT ARM (real source art, arm+hammer) — raises and strikes =====
      var A_READY = 78, A_WIND = 98, A_CONTACT = 67;    // positive = swing the mallet LEFT onto the anvil
      var armAngle = 0;                                  // 0 = hanging at the side (matches the source)
      var raise = ease(beat(t, T.hammerIn, T.hammerIn + 0.45)) * (1 - ease(beat(t, hits[4] + 0.35, hits[4] + 0.85)));
      if (raise > 0.005) {
        var a = A_READY;
        var nearest = hits[0]; hits.forEach(function (h) { if (Math.abs(t - h) < Math.abs(t - nearest)) nearest = h; });
        var local = t - nearest;
        if (local < -0.28) a = A_READY;
        else if (local < -0.05) a = lerp(A_WIND, A_READY, 1 - out(beat(t, nearest - 0.28, nearest - 0.05)));
        else if (local < 0.0) a = lerp(A_WIND, A_CONTACT, inQuad(beat(t, nearest - 0.05, nearest)));
        else if (local < 0.2) { var r = beat(t, nearest, nearest + 0.2); a = A_CONTACT + (A_READY - A_CONTACT) * r - Math.sin(r * Math.PI) * 8 * (1 - r); }
        else a = A_READY;
        armAngle = a * raise;
      }
      els.rightArm.style.transform = "rotate(" + armAngle + "deg)";
      setO(els.flash, impact * 0.85);
      els.flash.style.transform = "scale(" + (0.4 + impact * 1.8) + ")";
      updateSparks(t);

      // ===== CROWN — one increment per mark, halo, grows & rises on DRAWN =====
      var stageNum = -1; hits.forEach(function (h, k) { if (t >= h) stageNum = k; });
      var cool = ease(beat(t, T.quench, T.coolEnd));
      if (stageNum >= 0) {
        var crownLift = ease(beat(t, T.lift, DURATION - 0.4));
        els.crown.style.opacity = String(lerp(1, 0.94, cool));
        var grow = 1 + crownLift * 0.5;
        setT(els.crown, -crownLift * 54, -crownLift * 90, 0, lerp(1, 0.97, cool) * grow);
        updateCrown(stageNum, impact + (t > hits[0] && t < hits[4] + 0.4 ? 0.3 : 0), cool);
        var haloOn = ease(beat(t, hits[1], hits[4])) * (1 - 0.3 * cool) + crownLift * 0.6;
        els.halo.style.opacity = String(clamp(haloOn * 0.9));
        els.halo.style.transform = "translate3d(" + (-crownLift * 54) + "px," + (-crownLift * 90) + "px,0) scale(" + lerp(1, 1.7, crownLift) + ")";
      } else { els.crown.style.opacity = "0"; els.halo.style.opacity = "0"; }

      // ===== COOLED — quench poured from the bucket =====
      setT(els.bucket, 0, 0, 0, 1);
      var qq = ease(beat(t, T.quench + 0.1, T.quench + 0.5)) * (1 - ease(beat(t, T.quench + 1.0, T.quench + 1.5)));
      setO(els.water, qq * 0.9); els.water.style.transform = "translateY(" + ((1 - qq) * 4) + "px)";
      updateSteam(t);

      // ===== captions (synced to actions) =====
      if (t < T.cupIn) caption("THE SKY IS READ", "the reader questions the heavens.");
      else if (t < T.omenEnd) caption("THE CUP IS READ", "then the grounds give their answer.");
      else if (t < T.crowExit - 0.4) caption("THE COMMISSION IS CARRIED", "by crow, sealed and witnessed.");
      else if (t < firstHit) caption("THE COMMISSION IS ACCEPTED", "the smith reads it twice. it is a crown.");
      else if (t < T.quench) caption("THE CROWN IS STRUCK", "five marks, one shape.");
      else if (t < T.lift) caption("THE METAL IS COOLED", "water makes the answer hold.");
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
      }
    };
  }

  window.BRCeremony = { mount: mount };
})();
