/* =============================================================
   THE CEREMONY — the arcana forge ceremony (BR-S167 "living ritual plate", 20s)
   The approved art is a STILL illustration that WAKES UP — not a puppet short.
   The crow is the ONE traveling element; the smith is static at its approved pose
   (07_smith.png) and the forge is sold by impact LIGHT, not limbs. 20s ritual arc:
     0.0–3.0  opening dark / forge breath / the sky sigil wakes (burst → settle twinkle)
     3.0–6.0  the shaman reads the coffee mug (raised to her face, tipped, held omen)
     6.0–9.0  the crow carries the sealed commission (clean entrance + clean exit)
     9.0–10.8 hero hold — the commission is accepted (seal glows in, double-glow)
     10.8–16.8 five forging marks, musically spaced (3 taps + STRIKE #3 + SEAL #5)
     16.8–18.4 quench — glow-cool + steam + forge dim (no literal pour)
     18.4–20.0 the crown levitates, a sacred halo + rays bloom — a legendary artifact
   Time-driven: one render(t) off a single clock; freeze-safe (jumpToEnd = render(DURATION)).
   Mount CONTRACT (additive seek for QA/export):
     window.BRCeremony.mount(host, opts) -> { destroy, seek }
     opts.onExit — Back to readings   |   opts.onDone — Enter the reading
============================================================= */
(function () {
  "use strict";
  var A = "assets/arcana/ceremony/";
  var DURATION = 20.0;

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
        '<div id="skySpark"></div>' +
        '<div id="gazeBeam"><svg viewBox="0 0 440 345"><line x1="46" y1="332" x2="415" y2="30"/></svg></div>' +

        '<img id="trail" class="layer" src="' + A + '03_dotted_trail.png" alt="" />' +
        '<img id="ground" class="layer" src="' + A + '10_ground_strip.png" alt="" />' +
        '<img id="forge" class="layer" src="' + A + '08_forge_body.png" alt="" />' +
        '<img id="forgeGlow" class="layer" src="' + A + '09_forge_fire_glow.png" alt="" />' +
        '<span id="forgeCore"></span>' +
        '<img id="flame" class="layer" src="' + A + '09a_forge_flame_only.png" alt="" />' +
        '<img id="bucket" class="layer" src="' + A + '05_bucket.png" alt="" />' +
        '<img id="stump" class="layer" src="' + A + '06b_stump_only.png" alt="" />' +
        '<img id="anvil" class="layer" src="' + A + '06a_anvil_only.png" alt="" />' +
        '<img id="smith" class="layer" src="' + A + '07_smith.png" alt="" />' +

        '<img id="shaman" class="layer" src="' + A + '02_shaman.png" alt="" />' +
        '<div class="cup" id="cup" aria-hidden="true">' +
          '<svg viewBox="0 0 92 84">' +
            '<path class="handle" d="M70 34 h9 a12 12 0 0 1 0 24 h-7"/>' +
            '<ellipse class="rim" cx="42" cy="24" rx="29" ry="8"/>' +
            '<path class="bowl" d="M13 24 v16 a29 24 0 0 0 58 0 v-16"/>' +
            '<ellipse class="grounds" cx="42" cy="25" rx="22" ry="5.4"/>' +
            '<circle class="omen" cx="42" cy="26" r="5.2"/>' +
            '<path class="steam s1" d="M33 13 c-6 -8 7 -9 1 -18"/>' +
            '<path class="steam s2" d="M50 12 c-5 -9 7 -9 2 -19"/>' +
          '</svg>' +
        '</div>' +

        '<div id="crownHalo"></div>' +
        '<svg id="haloRays" viewBox="0 0 400 400" aria-hidden="true"><g data-rays></g></svg>' +

        '<div class="sealTok" id="sealTok" aria-hidden="true">' +
          '<svg viewBox="0 0 34 34">' +
            '<circle class="fillw" cx="17" cy="17" r="12.5"/>' +
            '<circle cx="17" cy="17" r="12.5"/>' +
            '<circle cx="17" cy="17" r="8.5"/>' +
            '<path d="M11.5 20.5 L11.5 13.5 L14.5 16.5 L17 11.5 L19.5 16.5 L22.5 13.5 L22.5 20.5 Z"/>' +
          '</svg>' +
        '</div>' +

        '<div class="crownForge" id="crownForge" aria-hidden="true">' +
          '<svg viewBox="0 0 150 96">' +
            // stage 0: a struck blank / base bar
            '<g class="crownStage" data-stage="0"><path class="hot" d="M34 70 Q75 78 116 70"/><line class="hot" x1="37" y1="70" x2="113" y2="70"/></g>' +
            // stage 1: the band + first arc
            '<g class="crownStage" data-stage="1"><path class="hot" d="M32 70 L48 46 L62 66 L75 38 L88 66 L102 46 L118 70"/><path class="hot" d="M34 72 Q75 79 116 72"/><line class="hot" x1="37" y1="74" x2="113" y2="74"/></g>' +
            // stage 2: peaks sharpen + inner drape
            '<g class="crownStage" data-stage="2"><path class="hot" d="M32 69 L48 43 L62 65 L75 33 L88 65 L102 43 L118 69"/><path class="hot" d="M48 43 Q62 53 75 33 Q88 53 102 43"/><path class="hot" d="M34 73 Q75 80 116 73"/><line class="hot" x1="37" y1="75" x2="113" y2="75"/></g>' +
            // stage 3: finials + rim jewels light
            '<g class="crownStage" data-stage="3"><path class="hot" d="M32 68 L48 42 L62 64 L75 31 L88 64 L102 42 L118 68"/><path class="hot" d="M48 42 Q62 52 75 31 Q88 52 102 42"/><path class="hot" d="M34 74 Q75 82 116 74"/><line class="hot" x1="37" y1="80" x2="113" y2="80"/><circle cx="48" cy="42" r="2.8"/><circle cx="75" cy="31" r="3.2"/><circle cx="102" cy="42" r="2.8"/></g>' +
            // stage 4: the finished hero crown — band, jewels, cross finial, base pearls
            '<g class="crownStage" data-stage="4">' +
              '<path d="M32 68 L48 42 L62 64 L75 31 L88 64 L102 42 L118 68"/>' +
              '<path d="M48 42 Q62 52 75 31 Q88 52 102 42"/>' +
              '<path d="M34 74 Q75 82 116 74"/>' +
              '<line x1="37" y1="80" x2="113" y2="80"/>' +
              '<path class="finial" d="M75 31 L75 22 M71 26 L79 26"/>' +
              '<circle class="jewel" cx="48" cy="42" r="3.2"/><circle class="jewel" cx="75" cy="31" r="3.6"/><circle class="jewel" cx="102" cy="42" r="3.2"/>' +
              '<circle class="jewel" cx="62" cy="63" r="2.2"/><circle class="jewel" cx="88" cy="63" r="2.2"/>' +
              '<circle class="pearl" cx="44" cy="77" r="1.7"/><circle class="pearl" cx="58" cy="77" r="1.7"/><circle class="pearl" cx="75" cy="77" r="1.9"/><circle class="pearl" cx="92" cy="77" r="1.7"/><circle class="pearl" cx="106" cy="77" r="1.7"/>' +
            '</g>' +
          '</svg>' +
        '</div>' +

        '<img id="crowCombined" class="layer" src="' + A + '04_crow_and_envelope.png" alt="" />' +
        '<img id="crow" class="layer" src="' + A + '04a_crow_only.png" alt="" />' +
        '<img id="envelopeDrop" class="layer" src="' + A + '04b_envelope_only.png" alt="" />' +

        '<div class="impactFlash" id="impactFlash"></div>' +
        '<div id="sparkHost"></div><div id="steamHost"></div><div id="smokeHost"></div><div id="glintHost"></div>' +

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
      forgeGlow: $("forgeGlow"), forgeCore: $("forgeCore"), flame: $("flame"),
      halo: $("crownHalo"), rays: q("#haloRays [data-rays]"), raysSvg: $("haloRays"),
      crown: $("crownForge"), envelope: $("envelopeDrop"), flash: $("impactFlash"),
      capTitle: $("capTitle"), capSub: $("capSub")
    };

    // ---- timeline (20s) ----
    var T = {
      skyA: 0.4, skyB: 2.6,                                   // 1. the sky wakes
      cupIn: 3.1, cupRead: 4.3, cupHold: 5.1, cupOut: 5.55, omenEnd: 6.0,   // 2. the cup is read (held)
      crowStart: 6.0, crowHover: 8.3, release: 8.5, crowExit: 9.3,          // 3. the crow carries
      nod1: 9.7, nod2: 10.3, acceptEnd: 10.8,                               // 4. accepted (seal double-glow)
      quench: 16.8, coolEnd: 18.2, lift: 18.4                               // 6/7. cooled, then levitates
    };
    var hits = [11.3, 12.3, 13.5, 15.0, 16.2];             // 5. tap, tap, STRIKE(#3), pause, tap, SEAL(#5)
    var isAccent = function (k) { return k === 2 || k === 4; };
    var ANVIL_FACE = { x: 966, y: 638 };                    // struck on the anvil's top working face
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
    var i;

    // ---- sky sparkles: a bright BURST around the sigil, settling to a soft ongoing twinkle ----
    var skySpark = [], sparkHostSky = $("skySpark");
    var scx = 700, scy = 210;                              // the upper sigil spot
    for (i = 0; i < 16; i++) {
      var d = document.createElement("div"); d.className = "skySpark";
      var ang = (i * 137.5) * Math.PI / 180, rad = 26 + ((i * 53) % 120);
      var px = scx + Math.cos(ang) * rad * (0.7 + (i % 3) * 0.2);
      var py = scy + Math.sin(ang) * rad * 0.72;
      d.style.left = px + "px"; d.style.top = py + "px";
      sparkHostSky.appendChild(d);
      skySpark.push({ el: d, burst: T.skyA + 0.1 + (i % 8) * 0.16, tw: 2.4 + (i % 5) * 0.7, ph: i * 1.1, base: 0.10 + (i % 4) * 0.05 });
    }

    // ---- particles ----
    var sparkHost = $("sparkHost"), sparks = [];
    for (i = 0; i < 10; i++) {
      var sEl = document.createElement("div"); sEl.className = "spark"; sparkHost.appendChild(sEl);
      sparks.push({ el: sEl, ang: (-150 + (i / 9) * 120 + (i % 3) * 4) * Math.PI / 180, dist: 16 + ((i * 29) % 34), delay: ((i * 11) % 7) / 100, life: 0.34 + ((i * 7) % 18) / 100, size: 1.5 + ((i * 11) % 14) / 10 });
    }
    var steamHost = $("steamHost"), steam = [];
    for (i = 0; i < 12; i++) {
      var stEl = document.createElement("div"); stEl.className = "steam"; steamHost.appendChild(stEl);
      steam.push({ el: stEl, off: i * 0.06, drift: ((i % 2) ? 1 : -1) * (12 + (i * 9) % 40), lift: 46 + ((i * 17) % 66) });
    }
    var smokeHost = $("smokeHost"), pipeSmoke = [];
    for (i = 0; i < 8; i++) {
      var pEl = document.createElement("div"); pEl.className = "pipeSmoke"; smokeHost.appendChild(pEl);
      pipeSmoke.push({ el: pEl, off: i * 0.12, drift: ((i % 2) ? 1 : -1) * (8 + (i * 7) % 20), lift: 30 + (i * 13) % 42, scale: 0.5 + (i % 4) * 0.22 });
    }
    // crown jewel-glints during the levitation hold
    var glintHost = $("glintHost"), glints = [];
    var glintPos = [[966, 596], [944, 610], [988, 610], [958, 618], [974, 618]];
    glintPos.forEach(function (p, k) { var g = document.createElement("div"); g.className = "glint"; g.style.left = p[0] + "px"; g.style.top = p[1] + "px"; glintHost.appendChild(g); glints.push({ el: g, by: p[1], ph: k * 1.3 }); });

    // build the halo rays once (12 spokes)
    var rayMk = "";
    for (i = 0; i < 12; i++) { var a = i * 30, lng = (i % 2 === 0) ? 190 : 150; rayMk += '<line x1="200" y1="200" x2="200" y2="' + (200 - lng) + '" transform="rotate(' + a + ' 200 200)" />'; }
    els.rays.innerHTML = rayMk;

    function updateSparks(t) {
      var idx = 0; hits.forEach(function (h, k) { if (Math.abs(t - h) < Math.abs(t - hits[idx])) idx = k; });
      if (!isAccent(idx)) { sparks.forEach(function (s) { s.el.style.opacity = 0; }); return; }
      var c = hits[idx], local = t - c, big = (idx === 4);
      sparks.forEach(function (s) {
        var tt = (local - s.delay) / s.life;
        if (tt < 0 || tt > 1) { s.el.style.opacity = 0; return; }
        var e = out(tt), g = 40 * tt * tt;
        var x = ANVIL_FACE.x + Math.cos(s.ang) * s.dist * e * (big ? 1.15 : 0.92);
        var y = ANVIL_FACE.y + Math.sin(s.ang) * s.dist * e * (big ? 1.15 : 0.92) + g;
        s.el.style.left = x + "px"; s.el.style.top = y + "px"; s.el.style.width = s.el.style.height = s.size + "px";
        s.el.style.opacity = String((1 - tt) * (big ? 0.65 : 0.52)); s.el.style.transform = "scale(" + (1 + tt * 0.5) + ")";
      });
    }
    function updateSteam(t) {
      var s0 = T.quench + 0.05;
      steam.forEach(function (s) {
        var local = t - s0 - s.off;
        if (local < 0 || local > 1.7) { s.el.style.opacity = 0; return; }
        var e = out(local / 1.7);
        s.el.style.left = (ANVIL_FACE.x - 8 + s.drift * e) + "px";
        s.el.style.top = (ANVIL_FACE.y - 4 - s.lift * e) + "px";
        s.el.style.transform = "scale(" + (0.4 + e * 2.1) + ")";
        var hiss = local < 0.2 ? 1 : (1 - e);
        s.el.style.opacity = String(0.44 * hiss * (1 - e * 0.4));
      });
    }
    function updatePipeSmoke(t) {
      var bursts = [2.4, 12.4, 18.2];
      pipeSmoke.forEach(function (s) {
        var best = -99; bursts.forEach(function (b) { var local = t - b - s.off; if (local >= 0 && local < 1.9) best = local; });
        if (best < 0) { s.el.style.opacity = 0; return; }
        var e = out(best / 1.9);
        s.el.style.left = (1260 + s.drift * e) + "px";
        s.el.style.top = (492 - s.lift * e) + "px";
        s.el.style.transform = "scale(" + (s.scale + e * 1.25) + ")";
        s.el.style.opacity = String(0.24 * (1 - e));
      });
    }
    function updateCrown(stageNum, hotPulse, coolT) {
      els.crown.querySelectorAll(".crownStage").forEach(function (g) { g.style.opacity = Number(g.dataset.stage) === stageNum ? 1 : 0; });
      var glow = (1 - coolT) * (0.12 + hotPulse * 0.55) + coolT * 0.05;
      els.crown.style.filter = "drop-shadow(0 0 " + (8 + hotPulse * 14) + "px rgba(255,151,47," + glow + "))";
    }

    function render(rawT) {
      var t = Math.min(rawT, DURATION);
      setO(els.flash, 0); setO(els.envelope, 0);
      els.cup.querySelectorAll(".steam").forEach(function (p) { p.style.opacity = 0; });
      els.cup.querySelector(".omen").style.opacity = 0;
      els.cup.querySelector(".grounds").style.opacity = 0;

      // ===== the five marks, TIERED =====
      var smithDip = 0, anvilDip = 0, tapImpact = 0, accentImpact = 0, forgePulse = 0;
      hits.forEach(function (h, k) {
        var j = jolt(t, h, 0.16), near = nearPulse(t, h, 0.12), acc = isAccent(k);
        smithDip += j * (acc ? 2.6 : 1.4);
        anvilDip += j * (acc ? 2.4 : 1.3);
        tapImpact = Math.max(tapImpact, near);
        if (acc) { accentImpact = Math.max(accentImpact, near); forgePulse = Math.max(forgePulse, nearPulse(t, h, 0.16)); }
      });
      var forging = ease(beat(t, T.acceptEnd, T.acceptEnd + 0.6)) * (1 - ease(beat(t, T.quench, T.quench + 0.5)));  // forge runs hot during the strikes

      // ===== 9. FORGE fire — faster, hotter, alive; roars during forging; pulses on accents =====
      var fast = Math.sin(t * 19.0) * 0.05 + Math.sin(t * 27.0 + 1.3) * 0.03 + Math.sin(t * 41.0) * 0.02;
      var flick = 1 + fast + 0.02 * Math.sin(t * 7.1 + 1.7);
      var heat = 1 + forging * 0.5 + forgePulse * 0.5;                      // steel-melting during the strikes
      var quenchDim = 1 - 0.4 * ease(beat(t, T.quench, T.quench + 0.9)) * (1 - ease(beat(t, T.lift, T.lift + 0.9)));
      els.flame.style.transform = "translate3d(0,0,0) scaleY(" + (flick * (1 + forging * 0.18) + forgePulse * 0.08) + ") scaleX(" + (1 - (flick - 1) * 0.6) + ")";
      els.flame.style.opacity = String((0.84 + 0.1 * Math.sin(t * 0.7)) * quenchDim);
      els.forgeGlow.style.opacity = String((0.5 + 0.14 * Math.sin(t * 0.9) + forging * 0.28 + forgePulse * 0.25) * quenchDim);
      els.forgeCore.style.opacity = String((0.4 + 0.28 * (0.5 + 0.5 * Math.sin(t * 16.0)) + forging * 0.4) * quenchDim);
      els.forgeCore.style.transform = "scale(" + (0.9 + 0.14 * Math.sin(t * 13.0) + heat * 0.06) + ")";
      els.forge.style.filter = "drop-shadow(0 0 " + (9 + Math.sin(t * 6) * 2 + (forging + forgePulse) * 12) + "px rgba(226,120,36," + ((0.14 + forging * 0.16 + forgePulse * 0.2) * quenchDim) + "))";
      updatePipeSmoke(t);

      // ===== 3. THE SKY IS READ — sigil wakes/draws in, sparkles burst then settle to a soft twinkle =====
      var skyRead = ease(beat(t, T.skyA, T.skyB));
      var sigBrite = lerp(0.28, 0.96, skyRead);
      var forgeFocus = ease(beat(t, T.acceptEnd - 0.5, T.acceptEnd + 0.6));
      var sigilCoolIn = ease(beat(t, T.quench + 0.4, T.lift + 0.6));
      els.sigil.style.opacity = String(sigBrite * (1 - 0.5 * forgeFocus));
      els.sigil.style.transform = "translate3d(0," + (Math.sin(t * 1.05) * 1.2) + "px,0) scale(" + lerp(0.965, 1, skyRead) + ")";
      els.skyBloom.style.opacity = String((0.18 + 0.7 * skyRead) * (1 - 0.5 * ease(beat(t, T.cupRead, T.omenEnd))) * (1 - 0.55 * forgeFocus));
      // sparkles: a bright burst (0.4–2.2), then a soft persistent twinkle for the rest of the ritual
      skySpark.forEach(function (s) {
        var b = nearPulse(t, s.burst, 0.7) * ease(beat(t, s.burst - 0.4, s.burst));   // bright flash on ignition
        var tw = s.base * (0.5 + 0.5 * Math.sin(t * (6.28 / s.tw) + s.ph)) * (0.35 + 0.65 * skyRead);  // ongoing twinkle
        s.el.style.opacity = String(clamp(Math.max(b, tw) * (1 - 0.35 * forgeFocus)));
      });
      var gaze = ease(beat(t, T.skyA + 0.6, T.skyA + 1.6)) * (1 - ease(beat(t, T.cupIn - 0.2, T.cupIn + 0.3)));
      els.gazeBeam.style.opacity = String(gaze * 0.55);
      els.sigilCrown.style.opacity = String(clamp((sigBrite * (1 - 0.5 * forgeFocus)) * 0.95 + sigilCoolIn * 0.34));

      // ===== SHAMAN — near-still; reads sky, then bows to the cup (glow-led) =====
      var lookUp = ease(beat(t, T.skyA, T.skyB - 0.3)) * (1 - ease(beat(t, T.cupIn - 0.2, T.cupIn + 0.4)));
      var lookDown = ease(beat(t, T.cupIn, T.cupRead)) * (1 - ease(beat(t, T.cupOut, T.omenEnd)));
      var shRot = lerp(0, -2.0, lookUp) + lerp(0, 2.6, lookDown);          // small lean up, a clearer bow into the cup
      setT(els.shaman, Math.sin(t * 1.8) * 0.3, lerp(0, 2, lookDown), shRot, 1);
      var skyGlow = lookUp * (1 - ease(beat(t, T.cupIn - 0.1, T.cupRead)));
      var watchGlow = ease(beat(t, T.acceptEnd, T.acceptEnd + 0.8)) * (1 - ease(beat(t, T.lift + 0.4, T.lift + 1.2)));
      els.shaman.style.filter = "drop-shadow(0 0 " + (4 + accentImpact * 6 * watchGlow + skyGlow * 9 + lookDown * 5) + "px rgba(230,182,104," + (0.05 + accentImpact * 0.14 * watchGlow + skyGlow * 0.20 + lookDown * 0.12) + "))";

      // ===== 1/2. THE CUP IS READ — raised to her face, tipped toward her, held omen ripple =====
      var cupUp = ease(beat(t, T.cupIn, T.cupRead));
      var cupGone = ease(beat(t, T.cupOut, T.omenEnd));
      var cupOp = cupUp * (1 - cupGone);
      setO(els.cup, cupOp);
      // rise up toward her face and tip the rim toward her so she reads the grounds
      setT(els.cup, lerp(6, -6, cupUp), lerp(30, -6, cupUp), lerp(2, -20, cupUp), lerp(0.9, 1.06, cupUp));
      if (cupOp > 0.15) {
        var omenGlow = ease(beat(t, T.cupRead, T.cupHold)) * (1 - cupGone);
        els.cup.querySelector(".grounds").style.opacity = String(0.5 * cupUp * (1 - cupGone));
        els.cup.querySelectorAll(".steam").forEach(function (p, k) { p.style.opacity = String((0.22 + 0.16 * Math.sin(t * 5 + k)) * cupUp * (1 - cupGone)); });
        els.cup.querySelector(".omen").style.opacity = String(omenGlow * (0.78 + 0.22 * Math.sin(t * 3)));
      }

      // ===== 3. THE COMMISSION IS CARRIED — the crow (the one traveler), clean entrance + exit =====
      var cIn = softOut(beat(t, T.crowStart, T.crowHover));
      var flyX = lerp(-660, 0, cIn);
      var flyY = lerp(-112, 0, ease(beat(cIn, 0.42, 1.0)));
      var bob = 5 * Math.sin(t * 6.6) * (1 - cIn) * (t < T.release ? 1 : 0.3);
      var pitchDesc = lerp(0, 5, ease(beat(t, T.crowHover - 0.5, T.release)));
      var ex = ease(beat(t, T.release, T.crowExit));                        // smooth exit ramp, fully gone by crowExit
      var cx = flyX + lerp(0, 250, ex);
      var cy = flyY + bob + lerp(0, -170, ex);
      var cr = -pitchDesc + lerp(0, 14, ex);
      var cs = lerp(0.66, 1, cIn) * lerp(1, 0.62, ex);
      var crowVisible = ease(beat(t, T.crowStart + 0.3, T.crowStart + 0.9));
      setO(els.crowC, crowVisible * (1 - ease(beat(t, T.release - 0.05, T.release + 0.2))));
      setT(els.crowC, cx, cy, cr, cs);
      // the crow-only sprite handles the exit; force it fully transparent after crowExit so it can never linger
      var crowSolo = ease(beat(t, T.release - 0.05, T.release + 0.2)) * (1 - ease(beat(t, T.crowExit - 0.25, T.crowExit)));
      setO(els.crow, crowSolo);
      setT(els.crow, cx, cy, cr, cs);
      setO(els.trail, ease(beat(t, T.crowStart + 0.6, T.crowStart + 1.4)) * (1 - ease(beat(t, T.crowHover - 0.4, T.release))) * 0.85);

      // ===== 4. THE COMMISSION IS ACCEPTED — envelope distills, seal glows in on the anvil =====
      if (t >= T.release && t < T.release + 0.6) {
        var ea = beat(t, T.release, T.release + 0.55);
        setO(els.envelope, ease(beat(t, T.release, T.release + 0.12)) * (1 - ease(beat(t, T.release + 0.32, T.release + 0.55))));
        setT(els.envelope, 0, lerp(0, 28, out(ea)), lerp(0, -6, ea), lerp(1, 0.7, ea));
      }
      var sOp = 0, sGlow = 0, sScaleY = 1, sPop = 1;
      if (t >= T.release + 0.22 && t < firstHit) {
        sOp = ease(beat(t, T.release + 0.22, T.release + 0.55));
        sPop = 1 + 0.12 * (1 - ease(beat(t, T.release + 0.22, T.release + 0.6)));
        sGlow = 0.25 + 0.42 * (nearPulse(t, T.nod1, 0.25) + nearPulse(t, T.nod2, 0.22));
      } else if (t >= firstHit && t < firstHit + 0.16) {
        var cf = beat(t, firstHit, firstHit + 0.14);
        sOp = 1 - cf; sScaleY = lerp(1, 0.14, cf); sGlow = 1;
      }
      if (sOp > 0) {
        setO(els.seal, sOp);
        els.seal.style.transform = "translate3d(0,0,0) scale(" + sPop + ") scaleY(" + sScaleY + ")";
        els.seal.style.filter = "drop-shadow(0 0 " + (6 + sGlow * 16) + "px rgba(255,172,74," + (0.3 + sGlow * 0.6) + "))";
      } else setO(els.seal, 0);

      // ===== SMITH — static pose; a small vertical jolt on marks + a 1.5px bow on the accept-nods =====
      var nodDip = nearPulse(t, T.nod1, 0.22) * 1.5 + nearPulse(t, T.nod2, 0.20) * 1.3;
      setT(els.smith, 0, smithDip + nodDip, 0, 1);
      setT(els.anvil, 0, anvilDip, 0, anvilDip > 0 ? 0.99 : 1);

      // ===== 5. impact flash — soft, only on the accented marks (on the anvil face) =====
      setO(els.flash, accentImpact * 0.82);
      els.flash.style.transform = "scale(" + (0.4 + accentImpact * 1.8) + ")";
      updateSparks(t);

      // ===== 7/8. CROWN — builds in 5 stages, then LEVITATES with a sacred halo + rays =====
      var stageNum = -1; hits.forEach(function (h, k) { if (t >= h) stageNum = k; });
      var cool = ease(beat(t, T.quench, T.coolEnd));
      var crownLift = ease(beat(t, T.lift, DURATION - 0.5));
      var floatY = -crownLift * 66 + (crownLift > 0 ? Math.sin(t * 1.6) * 3 * crownLift : 0);  // levitation + slow bob
      if (stageNum >= 0) {
        els.crown.style.opacity = String(lerp(1, 0.98, cool));
        var grow = 1 + crownLift * 0.34;                                  // grows into the hero object
        setT(els.crown, 0, floatY, 0, lerp(1, 0.99, cool) * grow);
        updateCrown(stageNum, tapImpact * 0.4 + accentImpact * 0.6 + crownLift * 0.25, cool * (1 - crownLift));
        // halo behind the crown; rays bloom on the levitation
        var haloOn = ease(beat(t, hits[1], hits[4])) * (1 - 0.3 * cool) + crownLift * 0.9;
        setO(els.halo, clamp(haloOn * 0.95));
        els.halo.style.transform = "translate3d(0," + (floatY - crownLift * 16) + "px,0) scale(" + lerp(1, 1.55, crownLift) + ")";
        setO(els.raysSvg, crownLift * 0.8);
        els.raysSvg.style.transform = "translate3d(0," + (floatY - crownLift * 12) + "px,0) rotate(" + (t * 10) + "deg) scale(" + lerp(0.6, 1.05, crownLift) + ")";
      } else { els.crown.style.opacity = "0"; setO(els.halo, 0); setO(els.raysSvg, 0); }
      // jewel glints twinkle on the finished, levitating crown (they rise with it)
      glints.forEach(function (g) { g.el.style.top = (g.by + floatY) + "px"; g.el.style.opacity = String(crownLift * (0.3 + 0.7 * Math.max(0, Math.sin(t * 4 + g.ph))) * 0.9); });

      // ===== 6. THE METAL IS COOLED — steam + glow-cool (no literal water pour) =====
      updateSteam(t);

      // ===== captions =====
      if (t < T.cupIn) caption("THE SKY IS READ", "the reader questions the heavens.");
      else if (t < T.omenEnd) caption("THE CUP IS READ", "she looks into the grounds for her answer.");
      else if (t < T.crowExit - 0.4) caption("THE COMMISSION IS CARRIED", "by crow, sealed and witnessed.");
      else if (t < firstHit) caption("THE COMMISSION IS ACCEPTED", "the smith reads it twice. it is a crown.");
      else if (t < T.quench) caption("THE CROWN IS STRUCK", "five marks, one shape.");
      else if (t < T.lift) caption("THE METAL IS COOLED", "the answer settles into pale gold.");
      else caption("THE READING IS DRAWN", "risen, haloed — filed and sealed.");
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
      seek: function (tt) { if (destroyed) return; if (raf) { cancelAnimationFrame(raf); raf = null; } render(Math.max(0, Math.min(tt, DURATION))); }
    };
  }

  window.BRCeremony = { mount: mount };
})();
