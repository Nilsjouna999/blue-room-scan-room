# Arcana Ceremony — the full forge-sequence plan (BR-S163 workshop)

Authored by a 20-agent workflow (1 Fable plan · 5 Opus + 8 Sonnet authors · 5 Haiku checks · 1 Opus audit; verdict GO_WITH_CHANGES). This is the plan for the FULL 5-hit forge SEQUENCE, to be layered as matching gold-line overlays ON TOP of the pixel-perfect reference scene (assets/arcana/ceremony/ceremony-scene.png) shipped in BR-S163. 20.0s / 160 ticks @ 125ms, render-from-frame (deriveState is the sole clock; each module a pure (S,ctx)->void writer of one part; jumpToEnd=renderFrame(160) freeze-safe by construction).

## Beats
```json
[
 {
  "name": "B0 · The Skies Are Consulted",
  "startMs": 0,
  "endMs": 2500,
  "caption": "THE SKIES ARE CONSULTED",
  "sub": "a crown, already overhead.",
  "actions": "t0 scene at rest, forge flame idle alternation begins, ambient glow-breath class on. t2–t14 stars wake staggered (every ~3 ticks). t8–t16 omen strokes INK_STEP awake, omenpulse breathes once to 0.3. t4–t15 shaman head rotates up toward the omen in RITUAL_STEP holds. t12 pipe smoke release #1 (class toggle). t16–t19 the mug micro-aside: head tips down, mug arm lifts one step, single steam curl for 3 ticks — no caption change. Smith at rest, occasional blink."
 },
 {
  "name": "B1 · The Answer Is Sent",
  "startMs": 2500,
  "endMs": 5750,
  "caption": "THE ANSWER IS SENT",
  "sub": "by wing, the old way.",
  "actions": "t20–t23 shaman send-gesture: mug arm sweeps out toward the sky-arc (2-tick cels), head follows. t22 trail dots begin lighting left→right, each dot 0.5→0.25 opacity 3 ticks after lighting (decay behind the crow). t22 crow enters off-left at x40 y340 carrying the card in its beak; stepped flight cadence flap(up/down 2-tick cels), hold, glide, flap, drift along crowPathAt(t) — a shallow arc peaking mid-screen; t34 the crow crosses the reference-frame position x560 y330 (wings spread, card visible — the poster moment). t40–t46 descent toward the smith; smith swaps to 'receive' pose (arm extended) at t42; shaman head tracks the crow in 3-tick steps."
 },
 {
  "name": "B2 · The Commission Is Accepted",
  "startMs": 5750,
  "endMs": 7750,
  "caption": "THE COMMISSION IS ACCEPTED",
  "sub": "the smith reads it twice. it is a crown.",
  "actions": "t46 crow at the smith's hand; t47 card releases (applyCard stops following crowPathAt). t48–t54 crow hops up and perches on the forge dome (3 stepped positions), one wing-settle cel. t48–t56 smith read: head tilts down, two RITUAL_STEP nods (t51, t55 — reads it twice). t56–t60 card glides in 2-tick steps to its blueprint hover above/behind the anvil; cardhalo fades to 0.12. t58–t61 CROWN STAGE 0 inks onto the anvil face (the glowing blank), crownheat to 0.9, forge glow lifts. t61 smith pose rest→up: the hammer is taken. Trail fully decayed by t50."
 },
 {
  "name": "B3 · The Crown Is Struck",
  "startMs": 7750,
  "endMs": 15625,
  "caption": "THE CROWN IS STRUCK",
  "sub": "five strikes, nothing extra.",
  "actions": "FIVE contacts on the grid: Hit1 t66 (8250ms), Hit2 t77 (9625), Hit3 t90 (11250), Hit4 t109 (13625), Hit5 t120 (15000) — gaps 1.375s/1.625s/2.375s(with inspection)/1.375s. Each hit: LIFT 2t → APEX_HOLD_S 1t → CONTACT 1t (flash + sparks rotate(strikeNo*47) + crownheat surge +0.15 + forgeglow surge + world shake 3px + the next crown stage INK_STEPs in over the following 2–3t) → DECAY 2t (sparks 0.45→0, embers age arcs) → RECOVER to 'up'. data-count: 'STRIKE 01 · CLEAN' … 'STRIKE 04 · CLEAN'. Hit3 = STRONGEST SPARK: flash r=12 op=0.8, sparks op 0.6, ember spread 1.3. INSPECTION t94–t104 (11750–13000): pose rest, smith head leans -9° over the crown in 3-tick steps, dust-blow puffs t98–t101 drifting right, count 'INSPECTION · PASSES'; shaman takes one mug sip (the shipped %14 sip pattern allowed only outside strike windows). Hit5 = THE LOCK: lift t114, APEX_HOLD_L t116–t119 (held breath), contact t120 with flash r=15 op=0.9 + sparks scale(1.6) + world shake 5px + shaman hop 4px + crown rotate snaps -2°→0°, count 'THE FIFTH STRIKE · THE LOCK'; settle t123–t125."
 },
 {
  "name": "B4 · The Crown Is Quenched",
  "startMs": 15625,
  "endMs": 17625,
  "caption": "THE CROWN IS QUENCHED",
  "sub": "from fire, to pale gold.",
  "actions": "t125–t127 hammer lowers (up→shoulder→rest in 2-tick cels), count clears. t128–t130 smith swaps to 'pour' pose, ladle appears, dips toward the bucket then tilts over the crown in 2-tick steps. t131–t134 waterline: two stepped dash segments from ladle lip to crown. t132–t138 quenchsteam curls rise in 2-tick steps and fade. t131–t139 COOL_STEPS: crownheat 1.0→0.75→0.45→0.2→0 — the crown crossfades from hot amber to the ivory line-work beneath. Forge glow calms to base breathing; embers off. Elegant, no splash — 4 strokes total tell the whole quench."
 },
 {
  "name": "B5 · The Crown Is Drawn",
  "startMs": 17625,
  "endMs": 20000,
  "caption": "THE CROWN IS DRAWN",
  "sub": "commissioned above, forged below.",
  "actions": "t141–t150 crown lifts ~10px in 3 steps, crownhalo steps 0→0.16 in material color; the commission card remains framed above/behind it. t146–t152 the MIRROR: sky omen brightens one step and omenpulse breathes once — the forged crown and the sky crown answer each other. t148 pipe smoke release #2 (the final one). t148 crow one wing-settle on the forge dome. t150 smith to 'shoulder' pose, small head bow; shaman head level, calm. t152 caption block brightens (CAP_FADE). t160 tick loop ends → setDone(true): end buttons reveal ('Return to the marks' / 'Strike it again'), Skip hides. Freeze here IS the finished painting: lit omen, perched crow, commission card, haloed ivory crown, resting smith."
 }
]```

## Element map
```json
[
 {
  "id": "world",
  "role": "root scene group — impact module writes its translate for the 1-tick shakes",
  "notes": "contains everything except captions/buttons; only applyImpact writes it"
 },
 {
  "id": "stars",
  "role": "faint sky dots (children tagged data-star)",
  "notes": "staggered wake in B0, gentle 3-tick shimmer after; all on at end state"
 },
 {
  "id": "omen",
  "role": "the top-centre sky sigil: crown in circle in upward triangle + plumb cross + vertex/orbit dots (strokes tagged data-omen-ink)",
  "notes": "~x600 y110 in the 1200x630 viewBox; faint at rest (op 0.25), ink-wakes in B0, sympathy-brighten pulse in B5; lit at end state"
 },
 {
  "id": "omenpulse",
  "role": "soft halo circle behind the omen",
  "notes": "opacity only; 0 at rest, breathes once in B0 wake and once in B5 mirror"
 },
 {
  "id": "ground",
  "role": "static ground line ~y535 + grass tufts + stones",
  "notes": "never animated; drawn once"
 },
 {
  "id": "shaman",
  "role": "shaman root group ~translate(265,535)",
  "notes": "clean tall pointed hat, round head, dot eyes, smile, conical cloak, chest dots + square patch; RITUAL_SWAY jitter; +hop 4px for 1 tick at Hit5 contact"
 },
 {
  "id": "sh-head",
  "role": "shaman head rotation group",
  "notes": "rotate up in B0 sky-look, down for the mug micro-aside, settles level"
 },
 {
  "id": "sh-eyes / sh-eyesc",
  "role": "open/closed eye cel pair",
  "notes": "blink via the shipped f%23 pattern"
 },
 {
  "id": "sh-mugarm",
  "role": "mug arm rotation group + mug",
  "notes": "one glance-lift in B0 (micro-aside), the send-gesture sweep at B1 start, then rests"
 },
 {
  "id": "sh-steam",
  "role": "single mug steam curl",
  "notes": "visible ~4 ticks in B0 only"
 },
 {
  "id": "trail",
  "role": "dotted gold guidance arc, ~14 children tagged data-trail-dot, from shaman toward the crow path",
  "notes": "dots light left→right during B1 as the crow passes, decay behind it; OFF at end state"
 },
 {
  "id": "crow",
  "role": "crow root translate group",
  "notes": "position from crowPathAt(t); enters off-left x~40 y~340, reference-frame pose at x~560 y~330 mid-B1, arrives at smith's hand x~800, then perches on the forge dome x~1005 y~395; wing cels inside"
 },
 {
  "id": "crow-w (data-crowpose up|mid|down|glide)",
  "role": "wing cel groups, one visible",
  "notes": "RITUAL_STEP flap cadence: up,down,up,down,glide-hold — flap, hold, glide, flap, drift"
 },
 {
  "id": "card",
  "role": "the sealed crown-card: thin border, inner frame, CROWN symbol, small diamond seal (strokes tagged data-card-ink)",
  "notes": "follows the crow transform while carried (applyCard reads crowPathAt), releases at B2, glides to blueprint hover x~745 y~360 over the anvil; stays as the commission frame at end state"
 },
 {
  "id": "cardhalo",
  "role": "faint amber glow disc behind the card",
  "notes": "fill = material color; opacity 0→0.12 at blueprint hover"
 },
 {
  "id": "anvil",
  "role": "anvil on stump ~x745 y535, small diamond mark",
  "notes": "static except world shake; crown sits on its face"
 },
 {
  "id": "bucket",
  "role": "quench bucket ~x660 y535",
  "notes": "static; ladle is separate"
 },
 {
  "id": "ladle",
  "role": "small ladle",
  "notes": "hidden until B4; appears in the smith's pour pose, tilts in 2-tick steps"
 },
 {
  "id": "waterline",
  "role": "thin poured-water stroke from ladle lip to crown",
  "notes": "2 stepped dash segments, visible ~4 ticks in B4"
 },
 {
  "id": "quenchsteam",
  "role": "two steam curl strokes above the crown",
  "notes": "stepped rise + fade across ~6 ticks in B4; OFF at end"
 },
 {
  "id": "crown",
  "role": "the forged crown root on the anvil face ~translate(745,478) rotate(-2)",
  "notes": "contains 6 stage groups data-crown-stage=0..5 (0/1 exclusive, 2–5 additive) each with data-crown-ink strokes for INK_STEP reveal; rotate snaps -2→0 at Hit5 contact; lifts ~10px + gains halo in B5"
 },
 {
  "id": "crownheat",
  "role": "amber duplicate overlay of the current crown strokes",
  "notes": "opacity = S.heat: 0.9 while forging with +surge at contacts, COOL_STEPS to 0 during quench; ivory crown beneath is the end state"
 },
 {
  "id": "crownhalo",
  "role": "soft halo behind the finished crown",
  "notes": "fill = material color; 0 until B5, steps to 0.16 (matches the shipped cardhalo end value)"
 },
 {
  "id": "smith",
  "role": "smith root ~translate(880,535)",
  "notes": "topknot bun + headband, apron, calm; RITUAL_SWAY jitter + poseLean rotate exactly as shipped"
 },
 {
  "id": "sm-head",
  "role": "smith head rotation group",
  "notes": "read-tilt in B2, strike nods, inspection lean, final bow"
 },
 {
  "id": "sm-eyes / sm-eyesc",
  "role": "open/closed eye cel pair",
  "notes": "blink f%19 pattern, offset from shaman"
 },
 {
  "id": "data-pose rest|receive|up|over|strike|shoulder|pour",
  "role": "smith arm/hammer cel groups, one visible (extends the shipped 5-pose set with receive + pour)",
  "notes": "setPose swaps display; 'receive' = arm extended toward the crow, 'pour' = ladle arm over the crown"
 },
 {
  "id": "flash",
  "role": "contact flash circle at the crown ~x745 y470",
  "notes": "1-tick life; r 9/12/15 per normal/strongest-spark/big"
 },
 {
  "id": "sparks",
  "role": "spark burst group at contact point",
  "notes": "rotate (strikeNo*47)%360 per shipped pattern; scale 1.6 on Hit5; 2-tick decay"
 },
 {
  "id": "embers",
  "role": "3 drifting ember dots (data-ember)",
  "notes": "the shipped setEmbers age arcs, seeded by strikeNo"
 },
 {
  "id": "forge",
  "role": "domed furnace + chimney pipe ~x1010 y535, arched mouth with M-flame",
  "notes": "mouth glow dots static-faint"
 },
 {
  "id": "flame1 / flame2",
  "role": "alternating M-flame cels in the forge mouth",
  "notes": "2-tick alternation as shipped; stroke = material color"
 },
 {
  "id": "forgeglow",
  "role": "warm glow disc spilling from the mouth",
  "notes": "fill = material color; base opacity via AMBIENT_SMOOTH CSS breathing; tick adds +surge at contacts"
 },
 {
  "id": "smoke",
  "role": "pipe smoke curls above the chimney",
  "notes": "class-toggled CSS drift, fired exactly twice (t12, t148)"
 },
 {
  "id": "data-cap / data-sub / data-count",
  "role": "caption kicker, italic sub-line, strike counter",
  "notes": "unchanged from shipped; count used only during B3"
 }
]```

## Crown-formation stages (refined SVG, 6 stages tied to the 5 hits)
```html
<![CDATA[<!-- crown-local frame: x centred on 0, y=0 seated on the anvil face, peaks rise into -y.
     Ivory line-work (end state). data-crown-stage 0/1 exclusive, 2-5 additive; each stroke
     data-crown-ink for INK_STEP dash reveal. Refinement vs draft: stage-1 rim lowered so the
     stage-3 peaks spring cleanly from the circlet instead of crossing it. Matches sky-omen crown. -->

<!-- 0 THE BLANK: one bowed glowing bar, squared ends -->
<g data-crown-stage="0">
  <path data-crown-ink d="M-32,-7 Q0,-11 32,-7" fill="none" stroke="#d7d3ca" stroke-width="2" stroke-linecap="round"/>
</g>

<!-- 1 SHALLOW ARC (circlet rim): low arch, ends flaring out, top ~y-13 so peaks clear it -->
<g data-crown-stage="1">
  <path data-crown-ink d="M-34,-5 Q-31,-12 -24,-13 Q0,-15 24,-13 Q31,-12 34,-5" fill="none" stroke="#d7d3ca" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>

<!-- 2 BASE BAND: clean double-rule + side caps + 3 rivets -->
<g data-crown-stage="2">
  <line data-crown-ink x1="-33" y1="-9" x2="33" y2="-9" stroke="#b1ada4" stroke-width="1.8" stroke-linecap="round"/>
  <line data-crown-ink x1="-33" y1="-3" x2="33" y2="-3" stroke="#b1ada4" stroke-width="1.8" stroke-linecap="round"/>
  <line data-crown-ink x1="-33" y1="-9" x2="-33" y2="-3" stroke="#b1ada4" stroke-width="1.8"/>
  <line data-crown-ink x1="33" y1="-9" x2="33" y2="-3" stroke="#b1ada4" stroke-width="1.8"/>
  <circle data-crown-ink cx="-16" cy="-6" r="1.4" fill="none" stroke="#6e6b63" stroke-width="1.1"/>
  <circle data-crown-ink cx="0" cy="-6" r="1.4" fill="none" stroke="#6e6b63" stroke-width="1.1"/>
  <circle data-crown-ink cx="16" cy="-6" r="1.4" fill="none" stroke="#6e6b63" stroke-width="1.1"/>
</g>

<!-- 3 MAIN PEAKS: three slender near-isoceles peaks, centre tallest (STRONGEST SPARK), sprung from the rim -->
<g data-crown-stage="3">
  <path data-crown-ink d="M-29,-12 L-22,-34 L-15,-12" fill="none" stroke="#d7d3ca" stroke-width="2" stroke-linejoin="round"/>
  <path data-crown-ink d="M-8,-12 L0,-45 L8,-12"     fill="none" stroke="#d7d3ca" stroke-width="2" stroke-linejoin="round"/>
  <path data-crown-ink d="M15,-12 L22,-34 L29,-12"    fill="none" stroke="#d7d3ca" stroke-width="2" stroke-linejoin="round"/>
</g>

<!-- 4 DRAPED LINES + JEWEL RHYTHM: two catenary swags between peak roots + 3 diamonds (data-crown-jewel) -->
<g data-crown-stage="4">
  <path data-crown-ink d="M-22,-14 Q-11,-6 0,-14" fill="none" stroke="#948f87" stroke-width="1.2"/>
  <path data-crown-ink d="M0,-14 Q11,-6 22,-14"   fill="none" stroke="#948f87" stroke-width="1.2"/>
  <path data-crown-ink data-crown-jewel d="M-22,-37 L-19,-34 L-22,-31 L-25,-34 Z" fill="none" stroke="#d7d3ca" stroke-width="1.5"/>
  <path data-crown-ink data-crown-jewel d="M22,-37 L25,-34 L22,-31 L19,-34 Z"     fill="none" stroke="#d7d3ca" stroke-width="1.5"/>
  <path data-crown-ink data-crown-jewel d="M0,-11 L4,-7 L0,-3 L-4,-7 Z"            fill="none" stroke="#d7d3ca" stroke-width="1.5"/>
</g>

<!-- 5 FINIALS + SYMMETRY LOCK: outer circle finials, centre point-diamond, refined 2nd forged rule (tilt snaps 0deg) -->
<g data-crown-stage="5">
  <circle data-crown-ink cx="-22" cy="-36" r="2.3" fill="none" stroke="#d7d3ca" stroke-width="1.6"/>
  <circle data-crown-ink cx="22" cy="-36" r="2.3" fill="none" stroke="#d7d3ca" stroke-width="1.6"/>
  <path data-crown-ink d="M0,-51 L3,-48 L0,-45 L-3,-48 Z" fill="none" stroke="#d7d3ca" stroke-width="1.6"/>
  <line data-crown-ink x1="-30" y1="0" x2="30" y2="0" stroke="#b1ada4" stroke-width="1.4" stroke-linecap="round"/>
</g>]]>```

## Merged controller (deriveState + ForgeCeremony) — adapt to drive sprite/overlay
```js
/* ===== ONE CEREMONY: the merged controller the orchestrator adapts into arcane.js =====
   Single clock reader = deriveState. Every module pure (S,ctx)->void, one writer per data-part.
   Freeze/reduced-motion safe by construction: jumpToEnd()=renderFrame(160), resetScene()=renderFrame(0). */

var TICK_MS = 125, TOTAL = 160;
var CLAMP = function(v,a,b){ return v<a?a:v>b?b:v; };

var TIMELINE = {
  TICK_MS: TICK_MS, TOTAL: TOTAL,
  beats: [ // [start,end) captionIdx===beat
    {start:0,end:20},{start:20,end:46},{start:46,end:62},
    {start:62,end:125},{start:125,end:141},{start:141,end:161}
  ],
  hits: [ // contacts on-grid; apexLen 4 + big on Hit5 (the LOCK held breath t116-119)
    {no:1,contact:66,apexLen:1,end:69,big:false,strongest:false},
    {no:2,contact:77,apexLen:1,end:81,big:false,strongest:false},
    {no:3,contact:90,apexLen:1,end:93,big:false,strongest:true },
    {no:4,contact:109,apexLen:1,end:112,big:false,strongest:false},
    {no:5,contact:120,apexLen:4,end:124,big:true, strongest:false}
  ],
  inspect:{start:94,end:104}, smokeTicks:[12,148]
};

/* THE SINGLE SOURCE OF TRUTH — pure fn of the frame counter. No other module reads the clock. */
function deriveState(f){
  var B=TIMELINE.beats, H=TIMELINE.hits, i, beat=5;
  for(i=0;i<B.length;i++){ if(f>=B[i].start && f<B[i].end){ beat=i; break; } }
  var tIn=f-B[beat].start;

  // active hit + phase (windows disjoint by construction)
  var hit=null;
  for(i=0;i<H.length;i++){ var h=H[i];
    var apexStart=h.contact-h.apexLen, liftStart=apexStart-2;
    if(f<liftStart||f>h.end) continue;
    var phase = f<apexStart?"lift": f<h.contact?"apex": f===h.contact?"contact": f<=h.contact+2?"decay":"recover";
    hit={no:h.no,phase:phase,big:h.big,strongest:h.strongest,sinceContact:f-h.contact}; break;
  }
  var inspect = f>=TIMELINE.inspect.start && f<=TIMELINE.inspect.end;

  // crown stage: -1 none -> 0 blank@t58 -> 1..5 stamped once per contact
  var crownStage=-1; if(f>=58) crownStage=0;
  for(i=0;i<H.length;i++){ if(f>=H[i].contact) crownStage=H[i].no; }

  // heat: forging 0.9 (+contact surge to 1.0) then ONE monotonic COOL ladder (single source)
  var heat=0;
  if(f>=58 && f<=130) heat=0.9;
  if(hit && (hit.phase==="contact"||hit.phase==="decay")) heat=1.0;
  if(f>=131){ heat = f<=132?0.75 : f<=134?0.45 : f<=136?0.2 : f<=138?0.1 : 0; }

  var quenchT = (beat===4)? CLAMP((f-125)/15,0,1) : null;   // B4 t125-140
  var finaleT = (beat===5)? CLAMP((f-141)/19,0,1) : null;   // /19 -> f160 = 1.0

  // one-tick impact scalars (glowSurge on the 0.16-cap ambient scale)
  var shake=0, hop=false, glowSurge=0;
  if(hit){
    if(hit.phase==="contact"){ shake=hit.big?5:3; hop=hit.big;
      glowSurge = hit.big?1 : (hit.strongest?0.85:0.6); }
    else if(hit.phase==="decay"){ glowSurge = hit.big?0.4:0.25; }
  }
  var smokeOn = (f===12||f===148);

  // strike counter (B3 only; holds across gaps; inspection overrides)
  var countText="";
  if(beat===3){ var landed=0; for(i=0;i<H.length;i++){ if(f>=H[i].contact) landed++; }
    if(inspect) countText="INSPECTION · PASSES";
    else if(hit) countText = hit.big?"THE FIFTH STRIKE · THE LOCK":("STRIKE 0"+hit.no+" · CLEAN");
    else if(landed>=5) countText="THE FIFTH STRIKE · THE LOCK";
    else if(landed>=1) countText="STRIKE 0"+landed+" · CLEAN";
  }

  return { f:f, ms:f*TICK_MS, beat:beat, tIn:tIn, hit:hit, inspect:inspect,
    crownStage:crownStage, heat:heat, quenchT:quenchT, finaleT:finaleT,
    shake:shake, hop:hop, glowSurge:glowSurge, smokeOn:smokeOn,
    captionIdx:beat, countText:countText, done:f>=TOTAL };
}

/* THE INTEGRATOR — owns scene markup, collectParts, the 125ms loop, control surface. */
function ForgeCeremony(host, nameMark, material, onExit){
  host.innerHTML = ceremonySceneHTML(nameMark);      // re-authored to the elementMap + a11y attrs
  var root = host.querySelector(".ac-forge");
  injectStyleOnce(root, MOTION.CSS);                  // amb-glow breathe / smoke / cap-fade / reduced-motion kill
  var ctx = collectParts(root, material||MATERIAL);   // ctx.P, ctx.stars/trailDots/omenInks/cardInks/embers,
                                                      // ctx.cap/sub/count, ctx.pose/crowPose/ink/blinkAt,
                                                      // ctx.crowPathAt + ctx.BEAK_DX/BEAK_DY (from applyCrow)

  // ONE writer per data-part. opening-beat folded into applyShaman; smith-receive folded into applySmith;
  // card+cardhalo owned ONLY by applyCard (reads ctx.crowPathAt + ctx.BEAK_DX/DY).
  var MODULES = [applyCaptions, applySky, applyShaman, applyTrail, applyCrow,
                 applyCard, applySmith, applyImpact, applyCrown, applyQuench, applyForge];

  var iv=null, f=0, done=false;
  var skipEl=root.querySelector("[data-ac-skip]"), endEl=root.querySelector("[data-end]"),
      retEl=root.querySelector("[data-ac-return]"), repEl=root.querySelector("[data-ac-replay]");

  function renderFrame(fr){ var S=deriveState(fr); for(var i=0;i<MODULES.length;i++) MODULES[i](S,ctx); }
  function setDone(v){ done=v; if(endEl) endEl.hidden=!v; if(skipEl) skipEl.hidden=v; }
  function stop(){ if(iv){ clearInterval(iv); iv=null; } }
  function start(){ stop(); setDone(false); f=0; renderFrame(0);
    iv=setInterval(function(){ f++; renderFrame(f); if(f>=TOTAL){ stop(); setDone(true); } }, TICK_MS); }
  function jumpToEnd(){ stop(); renderFrame(TOTAL); setDone(true); }   // finished painting = pure render(160)
  function resetScene(){ stop(); renderFrame(0); setDone(false); }
  function onKey(e){ if(e.key==="Escape"){ done ? (onExit&&onExit()) : jumpToEnd(); } }

  if(skipEl) skipEl.addEventListener("click", jumpToEnd);
  if(retEl)  retEl.addEventListener("click", function(){ onExit&&onExit(); });
  if(repEl)  repEl.addEventListener("click", function(){ resetScene(); start(); });
  window.addEventListener("keydown", onKey);

  var rm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(rm) jumpToEnd(); else start();

  return { destroy:function(){ stop(); window.removeEventListener("keydown", onKey); } };
}
/* NOTE: applyShaman/applySmith/applyTrail are authored by the integrator (see integrationNotes #5);
   applySmith drives strike poses via HammerHits.poseForHit(S.hit); applyForge writes ONLY forgeglow
   transform:scale (never opacity — CSS amb-glow owns opacity). */```

## Module interfaces
```json
[
 {
  "name": "timeline",
  "signature": "var TIMELINE = { TICK_MS:125, TOTAL:160, beats:[{name,start,end,captionIdx}], hits:[{no,contact,big,lift,apexLen}] }; function deriveState(f) -> S",
  "purpose": "The single source of truth. Pure function of the frame counter producing the shared state object S = { f, ms, beat:0-5, tIn, hit:null|{no:1-5, phase:'lift'|'apex'|'contact'|'decay'|'recover', big, sinceContact}, inspect:bool, crownStage:0-5, heat:0-1, quenchT:null|0-1, finaleT:null|0-1, shake:0|3|5, hop:bool, glowSurge:0-1, smokeOn:bool, captionIdx, countText, done }. Every other module renders exclusively from S. No module may compute its own beat math."
 },
 {
  "name": "collectParts",
  "signature": "function collectParts(root, material) -> ctx { P:{...data-part map}, stars[], trailDots[], omenInks[], cardInks[], crownStages[6], crownInks[][], poses{}, crowPoses{}, embers[], cap, sub, count, material, ink(list,n), pose(name), crowPose(name), blinkAt(f,mod,off) }",
  "purpose": "One-time DOM harvest + shared micro-helpers (dash-length priming exactly as the shipped cinks loop, pose display-swapping, ink(list,n) stepped reveal). The only module that touches querySelector; everything downstream uses ctx handles."
 },
 {
  "name": "applyCaptions",
  "signature": "function applyCaptions(S, ctx)",
  "purpose": "Writes data-cap / data-sub from the 6-entry caption ladder via S.captionIdx (guard: skip if unchanged, as shipped), writes S.countText to data-count, applies CAP_FADE brighten when S.finaleT >= 0.45. Owns: cap, sub, count."
 },
 {
  "name": "applySky",
  "signature": "function applySky(S, ctx)",
  "purpose": "Stars staggered wake in B0 + RITUAL_SWAY shimmer after; omen INK_STEP wake in B0; omenpulse breath in B0 and the sympathy-brighten mirror during S.finaleT 0.2–0.6. Owns: stars, omen, omenpulse."
 },
 {
  "name": "applyShaman",
  "signature": "function applyShaman(S, ctx)",
  "purpose": "Root jitter (the shipped ((f*37)%3)-1 pattern), head rotations per beat (sky-look, mug micro-aside, crow-tracking, calm), mug arm incl. the B1 send-gesture sweep, steam curl window, blink, sip pattern during B3 non-strike windows, +4px hop when S.hop. Owns: shaman, sh-head, sh-mugarm, sh-steam, sh-eyes/sh-eyesc."
 },
 {
  "name": "applyTrail",
  "signature": "function applyTrail(S, ctx)",
  "purpose": "Lights the dotted gold guidance dots left→right during B1 keyed to crowPathAt progress, decays each dot 3 ticks after lighting, all off from t50 onward (and at any f>=50, so end-state is clean by construction). Owns: trail dots."
 },
 {
  "name": "applyCrow",
  "signature": "function applyCrow(S, ctx); crowPathAt(t) -> {x,y,phase} (exported on the module for applyCard)",
  "purpose": "Flight position from the pure path function (off-left arc through the reference pose x560 y330 at t34, descent to the smith by t46), stepped flap cels (flap-hold-glide cadence via crowPose), the B2 hop-to-perch on the forge dome, the B5 wing-settle. Owns: crow, crow wing cels."
 },
 {
  "name": "applyCard",
  "signature": "function applyCard(S, ctx)",
  "purpose": "Card transform = crowPathAt(S) + beak offset while S.beat<=1 or pre-release ticks of B2; stepped glide to the blueprint hover after t56; data-card-ink INK_STEP reveal (border→frame→crown symbol→seal, finishing during B2); cardhalo opacity. Owns: card, cardhalo."
 },
 {
  "name": "applySmith",
  "signature": "function applySmith(S, ctx)",
  "purpose": "Root jitter + poseLean rotate (shipped pattern), pose selection from S (rest/receive/up/over/strike/shoulder/pour) driven by S.hit.phase, S.inspect, S.quenchT, S.finaleT; head tilts (read nods t51/t55, strike nods, inspection lean, final bow); blink; sweat optional during Hit5 apex only. Owns: smith, sm-head, poses, sm-eyes/sm-eyesc, sweat."
 },
 {
  "name": "applyImpact",
  "signature": "function applyImpact(S, ctx)",
  "purpose": "Flash (1-tick life, r per S.hit normal/strongest/big), sparks rotate((no*47)%360) + scale + 2-tick decay ladder, embers via the shipped age-arc math seeded by strike no, world translate from S.shake. Owns: flash, sparks, embers, world."
 },
 {
  "name": "applyCrown",
  "signature": "function applyCrown(S, ctx)",
  "purpose": "Stage visibility (0/1 exclusive, 2-5 additive) + per-stage data-crown-ink INK_STEP reveals in the 2-3 ticks after each contact, crownheat opacity = S.heat (+contact surge), rotate -2°→0° snap when S.crownStage>=5, B5 lift steps + crownhalo + jewel fills (material, 0.35). Owns: crown, crown stage groups, crownheat, crownhalo."
 },
 {
  "name": "applyQuench",
  "signature": "function applyQuench(S, ctx)",
  "purpose": "Ladle appearance + stepped tilt, waterline 2-segment stepped dash reveal, quenchsteam stepped rise/fade — all windows derived from S.quenchT; everything off when quenchT is null (so end-state and pre-state are clean by construction). Owns: ladle, waterline, quenchsteam. (The smith's pour POSE belongs to applySmith; this module owns only the water props.)"
 },
 {
  "name": "applyForge",
  "signature": "function applyForge(S, ctx)",
  "purpose": "Flame cel alternation (2-tick, shipped pattern), forgeglow tick-side surges layered on the CSS ambient breathing (S.glowSurge), the dust-blow puffs during inspection, pipe smoke class toggles exactly at the two scheduled ticks via S.smokeOn. Owns: flame1/flame2, forgeglow, smoke, dust."
 },
 {
  "name": "ForgeCeremony (integrator)",
  "signature": "function ForgeCeremony(host, nameMark, material, onExit) -> { destroy() } — internals: renderFrame(f){ var S=deriveState(f); MODULES.forEach(m=>m(S,ctx)); }, start(), jumpToEnd()=renderFrame(TIMELINE.TOTAL)+setDone(true), resetScene()=renderFrame(0)",
  "purpose": "Owns the SVG scene markup (drawn to the elementMap), the 125ms setInterval loop, MODULES = [applyCaptions, applySky, applyShaman, applyTrail, applyCrow, applyCard, applySmith, applyImpact, applyCrown, applyQuench, applyForge] (order fixed: state-independent since all are pure, but impact writes world last-ish for clarity), Skip/Esc/Return/Replay wiring identical to shipped, prefers-reduced-motion → jumpToEnd(), destroy() clears the interval + keydown listener. THE CONTRACT: every author's module is a pure function (S, ctx) -> void writing only its declared data-parts, deriving every window from S — never from module-local state. That single rule is what makes 13 hands compose into one tick, makes any frame directly renderable, and makes freeze-safety automatic."
 }
]```

## Integration notes + audit fixes
```
This is a ground-up re-author of the ceremony scene + controller (the plan already scopes it that way: 'Evolve ForgeCeremony from imperative beat-branches to DETERMINISTIC RENDER-FROM-FRAME'). The INTEGRATION check's 'CRITICAL' blockers are mostly restating that planned rewrite — the shipped code already harvests by data-part (q('shead') etc.), so this is a rename+re-author, not an impossibility. Integration order for the orchestrator adapting into arcane.js:

1) SCENE MARKUP (ceremonySceneHTML rewrite): draw to the elementMap in the 1200x630 viewBox with the PLAN coords. Emit these data-parts fresh: world(+aria-hidden=true), stars(data-star), omen(+data-omen-ink), omenpulse, ground, shaman/sh-head/sh-mugarm/sh-steam/sh-eyes/sh-eyesc, trail(data-trail-dot x~14), crow(+data-crowpose up|mid|down|glide) via buildCrowSVG(), card/cardhalo/cardseal(+data-card-ink) via CROWN_CARD_MARKUP, anvil, bucket, ladle, waterline1, waterline2, qsteam1, qsteam2, crown/crownheat/crownhalo (CrownFormation.markup) with the REFINED stages, smith/sm-head/sm-eyes/sm-eyesc/data-pose(rest|receive|up|over|strike|shoulder|pour)/sweat, flash(cx745 cy470)/sparks(translate 745,470)/embers(3x data-ember), forge/flame1/flame2/forgeglow(class=amb-glow, style transform-box:fill-box)/smoke/dust. Splice CROWN_CARD_MARKUP as a child of world AFTER the crow group (independent transform, inherits world-shake). Splice CrownFormation.markup at the crown location behind the smith.

2) collectParts(root, material) rewrite: harvest the above into ctx.P (flat data-part->el map) plus ctx.stars[], ctx.trailDots[], ctx.omenInks[], ctx.cardInks[] (DOM order border,frame,crown), ctx.embers[], ctx.cap/sub/count, ctx.material; wire helpers ctx.pose(name), ctx.crowPose(name), ctx.ink(list,n) (stepped dash reveal, transition:none), ctx.blinkAt(f,mod,off), and ctx.crowPathAt = applyCrow.crowPathAt with ctx.BEAK_DX/BEAK_DY = applyCrow.BEAK_DX/BEAK_DY. Prime every data-*-ink dash length once (the shipped cinks loop). Inject MOTION.CSS into a one-time <style> and add class amb-glow to forgeglow.

3) SINGLE STATE SOURCE: use timeline-controller.deriveState as the ONLY clock reader. Do NOT also run HammerHits.deriveHit or quenchRevealState — they are redundant. Fold their two good ideas as edits INTO deriveState if wanted (nothing else).

4) OWNERSHIP FIXES before wiring MODULES (each data-part exactly one writer): card+cardhalo+cardseal -> applyCard ONLY (delete card/cardhalo/ink writes from applySmithReceive; keep only its sm-head + pose logic, and fold that into applySmith's B2 branch). applyCard must read ctx.crowPathAt and ctx.BEAK_DX/DY instead of its private beakOffset. forgeglow opacity -> CSS amb-glow ONLY (applyForge writes only transform scale from S.glowSurge; delete the GLOW_BASE inline-opacity line). Pick applyImpact: use the standalone particles module (hardcoded 745,470, reads S.shake/S.hit) and drop HammerHits.applyImpact; base 'strongest' on hit.strongest not hit.no===3.

5) AUTHOR THE THREE MISSING MODULES: applyShaman (owns sh-head/sh-mugarm/sh-steam/sh-eyes/sh-eyesc for B1-B5 + root jitter via MOTION.ritualSway; B0 delegated to opening-beat or fold opening-beat in), applySmith (owns sm-head/poses/sm-eyes/sweat; drive strike poses from HammerHits.poseForHit(S.hit), inspection lean during S.inspect, pour pose while S.quenchT!=null, bow in S.finaleT, plus smith-receive's B2 head/pose folded here), applyTrail (owns trail dots; light left->right keyed to crowPathAt progress during B1, all off at f>=50). Their B0/B2 co-owners (opening-beat, smith-receive) should be FOLDED into applyShaman/applySmith rather than shipped as extra array entries, to keep one writer per part.

6) Standardize finaleT divisor to /19 so f=160 -> 1.0. Standardize the quench heat ladder to one table (recommend the monotonic deriveState version; if the water-meets-metal flare is wanted, add exactly one flare tick and document it). MOTION.CSS smoke replay: since it uses `forwards`, re-adding amb-smoke-fire at t148 won't restart it — but applyForge already self-derives the smoke curl shape from f (t12/t148) and doesn't depend on the class, so the curl is safe; the class is cosmetic only.

7) A11Y: add aria-live=polite aria-atomic=true to the caption container, role=presentation to the svg, aria-hidden=true to world, and ensure the host/svg has no tabindex so focus isn't stolen; Skip(data-ac-skip)/Esc/Return(data-ac-return)/Replay(data-ac-replay) wiring stays identical to shipped.

MODULES final order (all pure (S,ctx)->void): [applyCaptions, applySky, applyShaman, applyTrail, applyCrow, applyCard, applySmith, applyImpact, applyCrown, applyQuench, applyForge]. Order is correctness-independent (pure, one-writer-per-part) but keep applyImpact after applySmith so world-shake is the last word on the root.```
