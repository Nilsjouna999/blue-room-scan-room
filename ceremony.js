/* =============================================================
   THE CEREMONY — the arcana forge ceremony (BR-S163 → S164 full sequence)
   The builder's EXACT reference scene stays pixel-perfect (crushed to
   gold-on-black + mix-blend-mode:screen). The CROW is its own layer (crow.png)
   so it can fly in; the FORGE SEQUENCE the single frame can't contain (the crown
   forming on the anvil over 5 hits, sparks, quench) is added as matching
   gold-line SVG overlays on the anvil. Driven by the 20-agent workshop's
   RENDER-FROM-FRAME controller: deriveState(f) is the sole clock; freeze-safe by
   construction (jumpToEnd = renderFrame(160)). 20.0s / 160 ticks @ 125ms.
   Exposes window.BRCeremony; mountDev on ?dev=ceremony. Plan: docs/ARCANA_CEREMONY_PLAN.md
============================================================= */
(function () {
  "use strict";
  var TICK_MS = 125, TOTAL = 160;
  var CLAMP = function (v, a, b) { return v < a ? a : v > b ? b : v; };

  var TIMELINE = {
    beats: [{ start: 0, end: 20 }, { start: 20, end: 46 }, { start: 46, end: 62 },
            { start: 62, end: 125 }, { start: 125, end: 141 }, { start: 141, end: 161 }],
    hits: [{ no: 1, contact: 66, apexLen: 1, end: 69, big: false, strongest: false },
           { no: 2, contact: 77, apexLen: 1, end: 81, big: false, strongest: false },
           { no: 3, contact: 90, apexLen: 1, end: 93, big: false, strongest: true },
           { no: 4, contact: 109, apexLen: 1, end: 112, big: false, strongest: false },
           { no: 5, contact: 120, apexLen: 4, end: 124, big: true, strongest: false }],
    inspect: { start: 94, end: 104 },
  };
  var CAPS = [
    ["THE SKIES ARE CONSULTED", "a crown, already overhead."],
    ["THE ANSWER IS SENT", "by wing, the old way."],
    ["THE COMMISSION IS ACCEPTED", "the smith reads it twice. it is a crown."],
    ["THE CROWN IS STRUCK", "five strikes, nothing extra."],
    ["THE CROWN IS QUENCHED", "from fire, to pale gold."],
    ["THE CROWN IS DRAWN", "commissioned above, forged below."],
  ];

  /* THE SINGLE SOURCE OF TRUTH — pure fn of the frame (verbatim from the plan). */
  function deriveState(f) {
    var B = TIMELINE.beats, H = TIMELINE.hits, i, beat = 5;
    for (i = 0; i < B.length; i++) { if (f >= B[i].start && f < B[i].end) { beat = i; break; } }
    var hit = null;
    for (i = 0; i < H.length; i++) {
      var h = H[i], apexStart = h.contact - h.apexLen, liftStart = apexStart - 2;
      if (f < liftStart || f > h.end) continue;
      var phase = f < apexStart ? "lift" : f < h.contact ? "apex" : f === h.contact ? "contact" : f <= h.contact + 2 ? "decay" : "recover";
      hit = { no: h.no, phase: phase, big: h.big, strongest: h.strongest, sinceContact: f - h.contact }; break;
    }
    var inspect = f >= TIMELINE.inspect.start && f <= TIMELINE.inspect.end;
    var crownStage = -1; if (f >= 58) crownStage = 0;
    for (i = 0; i < H.length; i++) { if (f >= H[i].contact) crownStage = H[i].no; }
    var heat = 0;
    if (f >= 58 && f <= 130) heat = 0.85;
    if (hit && (hit.phase === "contact" || hit.phase === "decay")) heat = 1.0;
    if (f >= 131) heat = f <= 132 ? 0.7 : f <= 134 ? 0.45 : f <= 136 ? 0.22 : f <= 138 ? 0.1 : 0;
    var quenchT = (beat === 4) ? CLAMP((f - 125) / 15, 0, 1) : null;
    var finaleT = (beat === 5) ? CLAMP((f - 141) / 19, 0, 1) : null;
    var shake = 0, hop = false, glowSurge = 0;
    if (hit) {
      if (hit.phase === "contact") { shake = hit.big ? 5 : 3; hop = hit.big; glowSurge = hit.big ? 1 : (hit.strongest ? 0.85 : 0.6); }
      else if (hit.phase === "decay") { glowSurge = hit.big ? 0.4 : 0.25; }
    }
    var countText = "";
    if (beat === 3) {
      var landed = 0; for (i = 0; i < H.length; i++) { if (f >= H[i].contact) landed++; }
      if (inspect) countText = "INSPECTION · PASSES";
      else if (hit) countText = hit.big ? "THE FIFTH STRIKE · THE LOCK" : ("STRIKE 0" + hit.no + " · CLEAN");
      else if (landed >= 5) countText = "THE FIFTH STRIKE · THE LOCK";
      else if (landed >= 1) countText = "STRIKE 0" + landed + " · CLEAN";
    }
    return { f: f, beat: beat, hit: hit, inspect: inspect, crownStage: crownStage, heat: heat,
      quenchT: quenchT, finaleT: finaleT, shake: shake, hop: hop, glowSurge: glowSurge, countText: countText };
  }

  /* the refined 6-stage crown (workshop audit), crown-local frame seated at y=0 */
  var CROWN_STAGES =
    '<g data-cstage="0"><path data-cink d="M-32,-7 Q0,-11 32,-7" fill="none" stroke="#d7d3ca" stroke-width="2" stroke-linecap="round"/></g>' +
    '<g data-cstage="1"><path data-cink d="M-34,-5 Q-31,-12 -24,-13 Q0,-15 24,-13 Q31,-12 34,-5" fill="none" stroke="#d7d3ca" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>' +
    '<g data-cstage="2"><line data-cink x1="-33" y1="-9" x2="33" y2="-9" stroke="#c9a35c" stroke-width="1.8" stroke-linecap="round"/><line data-cink x1="-33" y1="-3" x2="33" y2="-3" stroke="#c9a35c" stroke-width="1.8" stroke-linecap="round"/><line data-cink x1="-33" y1="-9" x2="-33" y2="-3" stroke="#c9a35c" stroke-width="1.8"/><line data-cink x1="33" y1="-9" x2="33" y2="-3" stroke="#c9a35c" stroke-width="1.8"/><circle data-cink cx="-16" cy="-6" r="1.4" fill="none" stroke="#8a6f44" stroke-width="1.1"/><circle data-cink cx="0" cy="-6" r="1.4" fill="none" stroke="#8a6f44" stroke-width="1.1"/><circle data-cink cx="16" cy="-6" r="1.4" fill="none" stroke="#8a6f44" stroke-width="1.1"/></g>' +
    '<g data-cstage="3"><path data-cink d="M-29,-12 L-22,-34 L-15,-12" fill="none" stroke="#d7d3ca" stroke-width="2" stroke-linejoin="round"/><path data-cink d="M-8,-12 L0,-45 L8,-12" fill="none" stroke="#d7d3ca" stroke-width="2" stroke-linejoin="round"/><path data-cink d="M15,-12 L22,-34 L29,-12" fill="none" stroke="#d7d3ca" stroke-width="2" stroke-linejoin="round"/></g>' +
    '<g data-cstage="4"><path data-cink d="M-22,-14 Q-11,-6 0,-14" fill="none" stroke="#948f87" stroke-width="1.2"/><path data-cink d="M0,-14 Q11,-6 22,-14" fill="none" stroke="#948f87" stroke-width="1.2"/><path data-cink d="M-22,-37 L-19,-34 L-22,-31 L-25,-34 Z" fill="none" stroke="#d7d3ca" stroke-width="1.5"/><path data-cink d="M22,-37 L25,-34 L22,-31 L19,-34 Z" fill="none" stroke="#d7d3ca" stroke-width="1.5"/><path data-cink d="M0,-11 L4,-7 L0,-3 L-4,-7 Z" fill="none" stroke="#d7d3ca" stroke-width="1.5"/></g>' +
    '<g data-cstage="5"><circle data-cink cx="-22" cy="-36" r="2.3" fill="none" stroke="#d7d3ca" stroke-width="1.6"/><circle data-cink cx="22" cy="-36" r="2.3" fill="none" stroke="#d7d3ca" stroke-width="1.6"/><path data-cink d="M0,-51 L3,-48 L0,-45 L-3,-48 Z" fill="none" stroke="#d7d3ca" stroke-width="1.6"/><line data-cink x1="-30" y1="0" x2="30" y2="0" stroke="#c9a35c" stroke-width="1.4" stroke-linecap="round"/></g>';

  // anvil-top crown seat, in the base's 1448x1086 pixel coords
  var AX = 912, AY = 648;
  function sparksMarkup() {
    var s = ""; for (var i = 0; i < 8; i++) { var a = i * 45 * Math.PI / 180, r1 = 6, r2 = 17; s += '<line x1="' + (r1 * Math.cos(a)).toFixed(1) + '" y1="' + (r1 * Math.sin(a)).toFixed(1) + '" x2="' + (r2 * Math.cos(a)).toFixed(1) + '" y2="' + (r2 * Math.sin(a)).toFixed(1) + '" stroke="#e8b27d" stroke-width="1.8" stroke-linecap="round"/>'; } return s;
  }

  function sceneHTML() {
    var embers = "", i;
    for (i = 0; i < 8; i++) { embers += '<span style="left:' + (77 + (i * 3.3) % 14) + "%;top:" + (66 + (i * 5) % 9) + "%;--ex:" + (((i % 3) - 1) * 11) + "px;animation-delay:" + (i * 0.42).toFixed(2) + 's"></span>'; }
    var starPos = [[16, 30], [30, 17], [45, 11], [62, 19], [74, 13], [24, 57], [8, 42], [88, 25], [39, 40]], stars = "";
    for (i = 0; i < starPos.length; i++) { stars += '<span style="left:' + starPos[i][0] + "%;top:" + starPos[i][1] + "%;animation-delay:" + (i * 0.5) + 's"></span>'; }
    return '' +
      '<div class="ceremony" data-ceremony>' +
        '<div class="cer-stage">' +
          '<img class="cer-scene" src="assets/arcana/ceremony/ceremony-scene-base.png" alt="A shaman, a crow, an anvil, a smith and a forge, in gold line on black." />' +
          '<img class="cer-crow" data-part="crow" src="assets/arcana/ceremony/crow.png" alt="" />' +
          '<span class="cer-fx cer-forgeglow"></span><span class="cer-fx cer-omenglow"></span>' +
          '<span class="cer-fx cer-smoke"><svg viewBox="0 0 20 60" aria-hidden="true"><path d="M10 58 q-6 -9 0 -19 q6 -10 0 -20 q-5 -8 0 -16"/></svg><svg viewBox="0 0 20 60" aria-hidden="true"><path d="M10 58 q-6 -9 0 -19 q6 -10 0 -20 q-5 -8 0 -16"/></svg></span>' +
          '<span class="cer-fx cer-embers">' + embers + "</span><span class=\"cer-fx cer-stars\">" + stars + "</span>" +
          '<svg class="cer-overlay" viewBox="0 0 1448 1086" preserveAspectRatio="xMidYMid meet" role="presentation" aria-hidden="true">' +
            '<g data-part="world">' +
              '<circle data-part="crownhalo" cx="' + AX + '" cy="' + (AY - 30) + '" r="66" fill="#e8a24d" opacity="0" style="filter:blur(10px)"/>' +
              '<circle data-part="crownglow" cx="' + AX + '" cy="' + (AY - 20) + '" r="46" fill="#e8a24d" opacity="0" style="filter:blur(7px)"/>' +
              '<g data-part="crown" transform="translate(' + AX + ',' + AY + ') scale(1.4)">' + CROWN_STAGES + "</g>" +
              '<g data-part="hammer" transform="translate(966,600) rotate(-18)" opacity="0"><line x1="0" y1="0" x2="0" y2="-52" stroke="#d7d3ca" stroke-width="3" stroke-linecap="round"/><rect x="-15" y="-64" width="30" height="17" rx="2" fill="none" stroke="#d7d3ca" stroke-width="2.4"/></g>' +
              '<circle data-part="flash" cx="' + AX + '" cy="' + (AY - 14) + '" r="9" fill="#f0d9a8" opacity="0"/>' +
              '<g data-part="sparks" transform="translate(' + AX + ',' + (AY - 14) + ')" opacity="0">' + sparksMarkup() + "</g>" +
              '<g data-part="quench" opacity="0"><line data-part="water" x1="' + AX + '" y1="560" x2="' + AX + '" y2="' + (AY - 34) + '" stroke="#cfe2ee" stroke-width="2" stroke-dasharray="4 4" stroke-linecap="round"/><path data-part="qsteam" d="M' + (AX - 10) + ' ' + (AY - 40) + ' q-6 -12 0 -22 q6 -10 0 -20 M' + (AX + 12) + ' ' + (AY - 42) + ' q6 -12 0 -22" fill="none" stroke="#b8cdd6" stroke-width="1.6" stroke-linecap="round"/></g>' +
            "</g>" +
          "</svg>" +
          '<div class="cer-caption" aria-live="polite" aria-atomic="true">' +
            '<div class="cer-cap" data-cap></div><div class="cer-sub" data-sub></div><div class="cer-count" data-count></div>' +
            '<div class="cer-end" data-end hidden><div class="cer-endbtns"><button type="button" class="cer-ebtn" data-cer-again>Strike it again</button><button type="button" class="cer-ebtn cer-ebtn--go" data-cer-go>Enter the reading &rarr;</button></div></div>' +
          "</div>" +
          '<button type="button" class="cer-btn cer-btn--back" data-view-to="menu" aria-label="Back to readings"></button>' +
          '<button type="button" class="cer-btn cer-btn--skip" data-cer-skip aria-label="Skip the ceremony"></button>' +
        "</div>" +
      "</div>";
  }

  function mount(host, opts) {
    opts = opts || {};
    host.innerHTML = sceneHTML();
    var root = host.querySelector(".ceremony");
    var q = function (s) { return root.querySelector(s); };
    var P = {
      crow: q('[data-part="crow"]'), world: q('[data-part="world"]'), crown: q('[data-part="crown"]'),
      crownglow: q('[data-part="crownglow"]'), crownhalo: q('[data-part="crownhalo"]'),
      hammer: q('[data-part="hammer"]'), flash: q('[data-part="flash"]'), sparks: q('[data-part="sparks"]'),
      quench: q('[data-part="quench"]'), water: q('[data-part="water"]'), qsteam: q('[data-part="qsteam"]'),
    };
    var cstages = [], k;
    for (k = 0; k <= 5; k++) cstages[k] = q('[data-cstage="' + k + '"]');
    // prime crown-ink dash reveal
    var cinks = Array.prototype.slice.call(root.querySelectorAll("[data-cink]"));
    cinks.forEach(function (n) { var L = 60; try { L = n.getTotalLength(); } catch (e) {} n._len = L; n.style.strokeDasharray = L + " " + L; n.style.strokeDashoffset = L; n.style.transition = "none"; });
    var cap = q("[data-cap]"), sub = q("[data-sub]"), count = q("[data-count]"), endEl = q("[data-end]"), skipEl = q("[data-cer-skip]"), capBlock = q(".cer-caption");
    var lastBeat = -1;

    function crowPath(f) { // {tx,ty} in % of the crow element (flap = stepped bob)
      if (f < 20) return { tx: -330, ty: 0 };
      if (f < 46) { var u = (f - 20) / 26, e = Math.round(u * 8) / 8, bob = ((f >> 1) % 2) ? -6 : 6; return { tx: Math.round(-330 * (1 - e)), ty: Math.round(-42 * Math.sin(Math.PI * u)) + bob }; }
      if (f < 56) return { tx: 0, ty: ((f >> 1) % 2) ? -2 : 2 };                                   // delivered, at centre
      if (f < 70) { var w = (f - 56) / 14, e2 = Math.round(w * 6) / 6; return { tx: Math.round(150 * e2), ty: Math.round(-86 * e2) }; }  // perch up toward the forge
      return { tx: 150, ty: -86 + (((f >> 1) % 2) ? -1 : 1) };                                     // perched, tiny settle
    }
    function revealStage(g, on) { // stepped ink; on=true reveal, false hide
      if (!g) return;
      var inks = g.querySelectorAll("[data-cink]");
      for (var j = 0; j < inks.length; j++) inks[j].style.strokeDashoffset = on ? "0" : String(inks[j]._len);
    }

    function renderFrame(f) {
      var S = deriveState(f);
      // crow
      var cp = crowPath(f);
      P.crow.style.transform = "translate(" + cp.tx + "%," + cp.ty + "%)";
      P.crow.style.opacity = f < 20 ? "0" : "1";
      // crown stages: 0/1 exclusive, 2-5 additive; reveal per stage
      var cs = S.crownStage;
      cstages[0].style.display = (cs === 0) ? "" : "none";
      cstages[1].style.display = (cs >= 1) ? "" : "none";
      revealStage(cstages[0], cs === 0);
      for (k = 1; k <= 5; k++) { var shown = cs >= k; cstages[k].style.display = (k === 1 ? (cs >= 1) : shown) ? "" : "none"; revealStage(cstages[k], shown); }
      P.crown.style.opacity = cs >= 0 ? "1" : "0";
      P.crown.setAttribute("transform", "translate(" + AX + "," + AY + ") scale(1.4) rotate(" + (cs >= 5 ? 0 : -2) + ")");
      // heat glow (amber under crown) + halo in finale
      P.crownglow.style.opacity = String(S.heat * 0.6 + (S.glowSurge * 0.3));
      P.crownhalo.style.opacity = S.finaleT != null ? String(Math.min(0.28, S.finaleT * 0.3)) : "0";
      // hammer (only during forging B3; swings per hit)
      var hm = "translate(966,600) rotate(-18)", hop = 0;
      if (S.hit && S.beat === 3) {
        var ph = S.hit.phase;
        var rot = ph === "lift" ? -34 : ph === "apex" ? -42 : ph === "contact" ? 118 : ph === "decay" ? 92 : -18;
        hm = "translate(966,600) rotate(" + rot + ")";
        P.hammer.style.opacity = "1";
      } else if (S.beat === 3 && !S.inspect) { P.hammer.style.opacity = "0.9"; }
      else { P.hammer.style.opacity = "0"; }
      P.hammer.setAttribute("transform", hm);
      // impact flash + sparks
      var contact = S.hit && S.hit.phase === "contact";
      P.flash.setAttribute("r", contact ? (S.hit.big ? "16" : S.hit.strongest ? "13" : "9") : "9");
      P.flash.style.opacity = contact ? (S.hit.big ? "0.95" : S.hit.strongest ? "0.85" : "0.7") : "0";
      var sparkOn = S.hit && (S.hit.phase === "contact" || S.hit.phase === "decay");
      P.sparks.style.opacity = sparkOn ? (S.hit.phase === "contact" ? "1" : "0.4") : "0";
      P.sparks.setAttribute("transform", "translate(" + AX + "," + (AY - 14) + ") rotate(" + ((S.hit ? S.hit.no : 0) * 47 % 360) + ")" + (S.hit && S.hit.big ? " scale(1.5)" : S.hit && S.hit.strongest ? " scale(1.2)" : ""));
      // quench
      if (S.quenchT != null) { P.quench.style.opacity = "1"; var qw = S.quenchT; P.water.style.opacity = (qw > 0.15 && qw < 0.7) ? "0.9" : "0"; P.qsteam.style.opacity = (qw > 0.35) ? String(Math.max(0, 0.8 - (qw - 0.35))) : "0"; }
      else { P.quench.style.opacity = "0"; }
      // world shake
      P.world.setAttribute("transform", "translate(0," + S.shake + ")");
      // captions
      if (S.beat !== lastBeat) { lastBeat = S.beat; cap.textContent = CAPS[S.beat][0]; sub.textContent = CAPS[S.beat][1]; }
      count.textContent = S.countText;
      if (S.finaleT != null && S.finaleT >= 0.4) capBlock.classList.add("is-bright"); else capBlock.classList.remove("is-bright");
    }

    var iv = null, done = false;
    function setDone(v) { done = v; if (endEl) endEl.hidden = !v; if (skipEl) skipEl.hidden = v; }
    function stop() { if (iv) { clearInterval(iv); iv = null; } }
    function start() { stop(); setDone(false); var f = 0; renderFrame(0); iv = setInterval(function () { f++; renderFrame(f); if (f >= TOTAL) { stop(); setDone(true); } }, TICK_MS); }
    function jumpToEnd() { stop(); renderFrame(TOTAL); setDone(true); }
    // BR-S201: Escape on the finished forge returns to the marks (matching the visible Back button),
    // not forward into the reading; only the "Enter the reading" button goes forward.
    function onKey(e) { if (e.key === "Escape") { if (done) { if (opts.onExit) opts.onExit(); else proceed(); } else jumpToEnd(); } }
    function proceed() { if (opts.onDone) opts.onDone(); else location.href = "?dev=arcana-reading"; }

    if (skipEl) skipEl.addEventListener("click", jumpToEnd);
    var againEl = q("[data-cer-again]"), goEl = q("[data-cer-go]"), backEl = q(".cer-btn--back");
    if (againEl) againEl.addEventListener("click", function () { start(); });
    if (goEl) goEl.addEventListener("click", proceed);
    // when hosted by the intake, "back" returns to the marks (opts.onExit); on the
    // dev route it falls through to the app's delegated data-view-to nav.
    if (backEl && opts.onExit) { backEl.removeAttribute("data-view-to"); backEl.addEventListener("click", function () { opts.onExit(); }); }
    window.addEventListener("keydown", onKey);

    var rm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm) jumpToEnd(); else start();

    return { destroy: function () { stop(); window.removeEventListener("keydown", onKey); } };
  }

  window.BRCeremony = { mount: mount };
})();
