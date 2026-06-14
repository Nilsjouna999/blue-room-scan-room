/* =============================================================
   Scan Room data — 2 hardcoded ScanResults built from the two
   provided photos. No generation, no analysis: fixture text only.

   Images are loaded from the `file` path on each source:
     assets/source-01.jpg   (car selfie, waving — landscape)
     assets/source-02.jpg   (ice auger on frozen lake — portrait)
   Any extension works (.jpg / .jpeg / .png) — `file` is just a
   path. A missing file shows a clear warning, never a fake
   placeholder.
============================================================= */

/* House scan recipe — interpretive formulas shown in Technical
   Receipts (paid). Same for every card: it's the method, not a
   measurement. Keep the language soft ("derived from"), never
   fake-scientific. */
const FORMULAS = [
  { k: "Frame Presence", v: "focal clarity + posture stability + scene anchoring" },
  { k: "Frame", v: "composition balance + crop pressure + background control" },
  { k: "Signal", v: "gesture readability + eye-line clarity + styling distinctness" },
  { k: "Scene Charge", v: "motion potential + contrast + scene temperature" },
  { k: "Lore Density", v: "setting specificity + unresolved story + object cues" },
  { k: "Fit Coherence", v: "styling + setting + posture + gesture alignment" },
];

/* Customer-facing hierarchy (2026-06-12): Free Pull / Halo Mint.
   `mint` is an internal Lab state (keyboard M) — its silver material
   feeds Free Pull polish and the future final Halo material.
   Internal keys (free/mint/shiny) stay stable; only labels changed. */
const TREATMENTS = {
  free: {
    label: "Free Pull",
    rarity: "ARCHIVE PREVIEW",
    stamp: "FREE PULL",
    strip: "UNMINTED · ARCHIVE PREVIEW",
    tagline: "First pull — the surface scan. The card already exists; it has not been developed.",
  },
  mint: {
    label: "Lab · Signature Mint",
    rarity: "LAB STATE",
    stamp: "LAB MINT",
    strip: "INTERNAL · NOT A TIER",
    tagline: "Internal material study. Not a customer state.",
  },
  shiny: {
    label: "Halo Mint",
    rarity: "HALO MINT · DEVELOPED",
    stamp: "HALO MINT",
    strip: "FIRST PRINT · DEVELOPED",
    tagline: "Fully developed — structured evidence, hidden stat, mint record, oracle.",
  },
};

/* Archetype discovery notes — class-level copy from COPY_SYSTEM §4 (the
   12-archetype library). Keyed by archetype CLASS (not the per-source
   instance title), matching V2_EXTRAS.archetypeClass. Surfaced ONLY in the
   developed (Halo / Lab) reading panel as an artifact note — never in Free,
   never on the card. Copy-only lookup table: no score, no stat, no
   derivation, no schema field. Fulfils the Halo half of the PROJECT_OS §10
   visibility table ("full archetype explanation + discovery note"); Free
   already carries the instance archetype label on the card.
   `discovery` for The Encounter is the de-second-personed form of the §4
   note (the canonical "does not let you observe" was retired here — second
   person; COPY_SYSTEM §4 updated to match). */
const ARCHETYPE_NOTES = {
  "The Encounter": {
    line: "The photo becomes an interaction, not just a picture.",
    discovery: "The image does not wait to be observed. It answers.",
  },
  "The Dispatch": {
    line: "The image reads like a report from somewhere active, cold, remote, or operational.",
    discovery: "This was not taken. It was filed.",
  },
};

/* Lab material prototypes (CARD_TECH_LAB §20) — controlled card-FINISH studies
   shown ONLY as a visual overlay inside the internal Lab state (treatment
   "mint"); they are NOT a customer tier, NOT a new treatment, NOT a reading.
   Each finish describes the card SURFACE, never the person. Default (no entry /
   null) = the existing Signature Mint silver. Order is the cycle order
   (signature → cold-foil → black-star → night-gloss). Reached via the Lab
   `[` / `]` keys or `?t=mint&lab=<key>` for reproducible side-by-side capture.
   This is a prototype/compare artifact only — no winner is promoted here. */
const LAB_MATERIALS = [
  { key: "cold-foil", label: "Cold Foil", note: "Pale icy metallic foil pass — cool silver-blue plate, one restrained static sheen." },
  { key: "black-star", label: "Black Star", note: "Black-chrome plate with a faint constellation grain baked into the surface." },
  { key: "night-gloss", label: "Night Gloss", note: "Near-black glass surface with a single static specular highlight." },
];

const SOURCES = [
  // ---- SCAN SOURCE 01 — car selfie, open palm, fjord out the window
  {
    id: "driver-salute",
    no: 1,
    label: "Scan Source 01",
    file: "assets/source-01.jpg",
    orient: "landscape",
    /* Card-photo tuning: focal point, zoom, darkening scrim,
       and per-source exposure correction. Treatments multiply
       on top of `base` — they never replace it. */
    photoTuning: {
      pos: "32% 40%",
      zoom: 1,
      scrim: 0.1,
      base: { bright: 1, contrast: 1.02, sat: 1 },
    },
    capture: {
      code: "CANDID / DRV",
      lens: "ACTION-WIDE · 16MM EQ",
      light: "OVERCAST · REAR-LEFT FILL",
      locale: "FJORD ROAD PULLOUT",
      rec: "2026.06.12",
    },
    markers: [
      { x: 33, y: 46, label: "Focal lock — face" },
      { x: 51, y: 40, label: "Gesture block — open palm" },
      { x: 72, y: 50, label: "Depth band — fjord window" },
    ],
    horizon: null,
    analysis: [
      "WIDE-ANGLE FIELD · BARREL DISTORTION +12%",
      "SUBJECT OFFSET LEFT · CABIN OWNS THE FRAME",
      "OPEN PALM PARTIALLY OCCLUDES KEY · DELIBERATE",
      "WINDOW BAND PRESERVES DEPTH CUE · RIGHT THIRD",
      "COLOR ANCHOR: RED LAYER VS GREY CABIN",
    ],
    /* Diagram tab — visual scan sheet, coordinates in % of frame */
    diagram: {
      aspect: 0.63, // displayed height/width — corrects SVG shape distortion
      massBox: { x: 16, y: 28, w: 50, h: 68, label: "SUBJECT MASS" },
      gesture: { points: [[37, 68], [45, 53], [51, 40]], label: "GESTURE LINE — RAISED PALM", labelAt: [34, 72] },
      axis: { points: [[60, 6], [90, 44]], label: "CABIN AXIS" },
      arrow: { from: [51, 40], to: [57, 56], label: "SIGNAL → LENS" },
      light: { x: 88, y: 28, label: "KEY · WINDOW R" },
      pressure: [
        { side: "top", depth: 14, label: "CABIN PRESSURE" },
        { side: "left", depth: 11, label: "SEAT PRESSURE" },
      ],
      notes: [
        "FOCAL LOCK — FACE, LEFT THIRD",
        "GESTURE SIGNAL — RAISED PALM, FIVE-SPREAD",
        "FRAME PRESSURE — CABIN / WINDSHIELD / WHEEL",
        "DEPTH CUE — FJORD WINDOW, RIGHT BAND",
        "COLOR ANCHOR — RED JACKET VS GREY CABIN",
      ],
    },
    /* Metrics tab — stylish receipts, not measurements */
    metrics: {
      signalMix: [
        { k: "Gesture", v: 34 },
        { k: "Setting", v: 22 },
        { k: "Styling", v: 18 },
        { k: "Composition", v: 14 },
        { k: "Light", v: 12 },
      ],
      pressure: { balance: -12, centerPull: 58, noise: 47, clarity: 82 },
      fitMatrix: [
        { k: "Subject", state: "Locked", v: 84 },
        { k: "Setting", state: "Aligned", v: 76 },
        { k: "Styling", state: "Anchored", v: 81 },
        { k: "Gesture", state: "Loud", v: 92 },
      ],
    },
    /* Halo Mint material identity — accents derived from the photo
       (red jacket, cabin warmth, window light). */
    halo: { material: "Warm Glass Copper", a: "#c98a5e", b: "#8b7bff", c: "#e8b27d" },
    /* Scroll dossier — factual → interpretive → identity → collectible → playful */
    dossier: {
      record: {
        objectNo: "BR-OBJ-001",
        captureType: "Cabin self-document · action-wide",
        gesture: "Raised palm, five-spread",
        container: "Driver's seat, parked",
        primarySignal: "Stop-or-welcome · dual read",
        backgroundRole: "Fjord band through glass — depth donor",
        eligibility: "Halo Mint · gesture-triggered",
        provenance: "Roadside pullout, northbound route",
        markings: "Red layer vs grey cabin · wheel at right edge · cap insignia: partial read, upper-center",
      },
      evidence: [
        { k: "Gesture Lock", read: "The palm faces the lens dead-on — five fingers, no hesitation. The whole image organizes around it.", free: true },
        { k: "Crop Pressure", read: "Cabin roof and seat press from above and left; the subject reads contained, never cramped.", free: true },
        { k: "Subject Mass", read: "Mass sits left-of-center, balanced by the fjord window — a two-weight frame that holds.", free: true },
        { k: "Light Direction", read: "Overcast key through the right glass; rear-left fill keeps the face open under the cap.", free: false },
        { k: "Signal Vector", read: "Eye line and palm fire on the same axis: straight out of the windshield, straight at the lens.", free: false },
        { k: "Focal Lock", read: "Face locks the left third with the palm as second anchor — the lens never wanders.", free: false },
      ],
      statNotes: {
        presence: { evidence: "Cap brim and red layer stack a vertical block the wide lens can't dilute.", note: "First read survives the cabin clutter." },
        frame: { evidence: "Wide-angle barrel and dashboard intrusion tax the composition; the window band claws back the right third." },
        signal: { evidence: "A raised palm is the most legible gesture in the archive — this one is textbook.", note: "Sits near the top of the archive band for cabin shots." },
        charge: { evidence: "Engine-off energy: warm, contained, ten seconds from motion." },
      },
      hidden: {
        name: "Gesture Geometry",
        value: 88,
        read: "The raised palm turns the image from selfie into encounter — the frame addresses the lens directly, not the other way around.",
        tease: "A second reading was detected in the gesture layer. It develops with the mint.",
      },
      mint: {
        trigger1: "Raised palm",
        trigger2: "Cabin frame",
        family: "Halo Mint · Gesture Class",
        note: "Minted from the exact moment between farewell and blessing.",
        serial: "BR-SRC01-HM-0007",
      },
      oracle: {
        full: "This card belongs to the rare class of images where the subject appears to be both leaving the group chat and blessing the vehicle.",
        short: "The palm says stop. The card kept going.",
        timeline: "In another timeline: noir still · winter field report · dashboard prophet",
      },
    },
    card: {
      title: "Checkpoint Wave",
      archetype: "Open-Window Operator",
      note: "The hand says stop, the face says welcome. The card never resolves it — and doesn't need to.",
      signature: "Filed from the driver's seat, engine off.",
      stats: { presence: 67, frame: 52, signal: 84, charge: 70 },
      /* archive/card serial — the dossier mint serial (BR-SRC01-HM-…) is
         the separate Halo Mint development serial */
      serial: "BR-001-DRV-0001",
      batch: "Field Batch 01",
      edition: "First Print",
      minted: "2026.06.12",
    },
    reads: {
      presence:
        "Holds the frame from the driver's seat without leaning on it. The cap brim and red layer keep a clean vertical edge in a cluttered cabin.",
      frame:
        "Action-lens barrel and cabin clutter tax the composition. The fjord out the window rescues the right third.",
      signal:
        "Direct eye line plus a five-finger palm — the most legible gesture in the archive. Nothing here needs decoding.",
      charge:
        "Idle-engine energy. Warm, contained, ready to pull back onto the road the moment the shutter closes.",
    },
    aura: ["Idle-Engine", "Open-Palm", "Northbound"],
    sceneRole: "The pause the trip gets measured by.",
    stance:
      "One arm holding the wheel's territory, the other raised flat to the lens — half stop-sign, half salute. The two-arm split holds the frame in suspension: neither departing nor stationary.",
    fit: "If the setting is formal, this card stays in the glovebox. On the road, it's the membership card.",
    impact: { value: 64, label: "Disarming" },
    lore: { value: 72, label: "Dense" },
    oracle: "Logged mid-route. The palm held the shutter open; the fjord held the rest of the frame. Neither blinked.",
    receipts: [
      { k: "Lens profile", v: "Action-wide, corrected −40%" },
      { k: "Key light", v: "Overcast, rear-left" },
      { k: "Gesture", v: "Palm, 5-finger spread" },
      { k: "Subject lock", v: "0.83" },
      { k: "Cabin clutter index", v: "Moderate" },
      { k: "Horizon", v: "Occluded (interior)" },
      { k: "Brand Trace", v: "Volvo wheel confirmed — a clean brand cue in the cabin frame" },
    ],
  },

  // ---- SCAN SOURCE 02 — crouched at the auger, frozen lake, hard sun
  {
    id: "ice-auger",
    no: 2,
    label: "Scan Source 02",
    file: "assets/source-02.jpg",
    orient: "portrait",
    /* Blown snow + small subject: zoom in on the figure, pull
       brightness down, lift contrast, add a stronger scrim so
       the white field doesn't flatten the card. */
    photoTuning: {
      pos: "50% 46%",
      zoom: 1.3,
      scrim: 0.3,
      base: { bright: 0.92, contrast: 1.14, sat: 1.05 },
    },
    capture: {
      code: "FIELD / ICE",
      lens: "STANDARD · HANDHELD",
      light: "HARD SUN · LOW ELEVATION",
      locale: "FROZEN LAKE · OPEN PLATEAU",
      rec: "2026.06.12",
    },
    markers: [
      { x: 44, y: 44, label: "Focal lock — hooded face" },
      { x: 58, y: 60, label: "Tool axis — auger brace" },
      { x: 50, y: 29, label: "Horizon — birch treeline" },
    ],
    horizon: 29,
    analysis: [
      "SNOW ALBEDO LIFTS FLOOR · HIGHLIGHTS HELD",
      "TREELINE RULES UPPER QUARTER · CLEAN BAND",
      "SUBJECT CROUCHED · MASS CENTERED LOW",
      "TRACKS LEAD EYE INTO FRAME · LEFT ENTRY",
      "EXPRESSION QUALIFIED: HOOD / BEANIE / GLASS · GAZE ON TASK",
    ],
    diagram: {
      aspect: 2.22,
      massBox: { x: 29, y: 35, w: 38, h: 32, label: "STANCE MASS" },
      gesture: { points: [[39, 44], [49, 47], [54, 50]], label: "BRACE LINE — GLOVES STACKED", labelAt: [16, 53] },
      axis: { points: [[0, 29], [100, 29]], label: "HORIZON — TREELINE" },
      arrow: { from: [54, 50], to: [57, 65], label: "WORK VECTOR → ICE" },
      light: { x: 10, y: 12, label: "KEY · LOW SUN L" },
      pressure: [
        { side: "bottom", depth: 28, label: "FIELD PRESSURE — SNOW PLANE" },
        { side: "top", depth: 10, label: "SKY BAND" },
      ],
      notes: [
        "FOCAL LOCK — HOODED FACE / SUNGLASSES",
        "TOOL AXIS — AUGER, PRE-CUT",
        "HORIZON LOCK — TREELINE, UPPER QUARTER",
        "STANCE MASS — CROUCHED BLACK SILHOUETTE",
        "FIELD PRESSURE — WHITE SNOW PLANE",
      ],
    },
    metrics: {
      signalMix: [
        { k: "Setting", v: 34 },
        { k: "Light", v: 22 },
        { k: "Gesture", v: 18 },
        { k: "Composition", v: 14 },
        { k: "Styling", v: 12 },
      ],
      pressure: { balance: 4, centerPull: 71, noise: 12, clarity: 74 },
      fitMatrix: [
        { k: "Subject", state: "Locked", v: 78 },
        { k: "Setting", state: "Locked", v: 91 },
        { k: "Styling", state: "Muted", v: 64 },
        { k: "Gesture", state: "Working", v: 73 },
      ],
    },
    /* Halo Mint material identity — accents derived from the photo
       (snow field, hard sun, cold sky). */
    halo: { material: "Cold Prism Frost", a: "#5fd4e0", b: "#cfe2ee", c: "#8b9bff" },
    dossier: {
      record: {
        objectNo: "BR-OBJ-002",
        captureType: "Field document · handheld, hard sun",
        gesture: "Crouched brace, gloves stacked",
        container: "Frozen lake, open plateau",
        primarySignal: "Work in progress · no audience",
        backgroundRole: "Treeline horizon — the only witness",
        eligibility: "Halo Mint · field-triggered",
        provenance: "Ice plateau, late March · −12° inferred",
        markings: "Black silhouette on white field · auger at right hand",
      },
      evidence: [
        { k: "Field Pressure", read: "The snow plane owns three quarters of the frame and donates all of it to the silhouette.", free: true },
        { k: "Subject Mass", read: "Crouched mass centered low — the stance locks weight into the frame's lower half, closing off any read of departure.", free: true },
        { k: "Horizon Lock", read: "The birch treeline rules the upper quarter in one clean band. Nothing argues with it.", free: true },
        { k: "Tool Axis", read: "The auger runs a hard diagonal into the ice — the only straight line the subject brought along.", free: false },
        { k: "Light Direction", read: "Low hard sun from the left; the snow throws it back up and erases every shadow excuse.", free: false },
        { k: "Signal Vector", read: "Eye contact redirected to the ice. The work itself is the message, and it points straight down.", free: false },
      ],
      statNotes: {
        presence: { evidence: "A black silhouette on a white field is the strongest contrast the archive can record.", note: "The snow does the staging; the silhouette accepts the terms." },
        frame: { evidence: "Treeline band, entry tracks, centered mass — near-editorial discipline for a working photo." },
        signal: { evidence: "Hood, beanie and sunglasses qualify the expression; the auger receives the eye contact instead." },
        charge: { evidence: "The auger grip and crouched brace contain the motion — rotation is the only active vector in the frame." },
      },
      hidden: {
        name: "Field Silence",
        value: 91,
        read: "The frame reads like field evidence: crouched brace, task-directed gaze, no gesture aimed at the lens. The image organizes around the work, not the recording.",
        tease: "A silence reading was detected in the field layer. It develops with the mint.",
      },
      mint: {
        trigger1: "Auger silhouette",
        trigger2: "Treeline horizon",
        family: "Halo Mint · Field Class",
        note: "Minted from two feet of ice and the patience to get through it.",
        serial: "BR-SRC02-HM-0008",
      },
      oracle: {
        full: "This card does not explain itself. It arrives as field evidence and lets the snow do most of the talking.",
        short: "The snow kept the minutes. The card signed them.",
        timeline: "In another timeline: cold expedition card · winter field report · quiet operator still",
      },
    },
    card: {
      title: "Two Feet of Quiet",
      archetype: "Frost Surveyor",
      note: "Crouched over a hole that isn't there yet. The commitment is in the kneel, not the catch.",
      signature: "Signed in snow, countersigned by the sun.",
      stats: { presence: 71, frame: 83, signal: 56, charge: 62 },
      /* archive/card serial — distinct from the Halo Mint development
         serial in dossier.mint */
      serial: "BR-002-ICE-0001",
      batch: "Ice Batch 01",
      edition: "First Print",
      minted: "2026.06.12",
    },
    reads: {
      presence:
        "A black silhouette on a white field — the snow does the staging and the subject accepts the terms.",
      frame:
        "Treeline holds the upper quarter, tracks lead the eye in. Near-editorial discipline for a working photo.",
      signal:
        "Hood, beanie and sunglasses qualify the expression — the face is present, but eye contact redirects to the task.",
      charge:
        "The auger is the only moving part in the frame. The crouched brace converts all of the image's energy into a single downward vector.",
    },
    aura: ["Auger-Braced", "Sun-Struck", "Low-Horizon"],
    sceneRole: "Proof the lake was work, not wallpaper.",
    stance:
      "Crouched at full commitment, both gloves stacked on the brace, weight exactly where it should be. Nothing performed — the auger doesn't care, and the frame doesn't pretend otherwise.",
    fit: "Anywhere patience is currency, this card appreciates. In rooms that demand noise, it simply waits.",
    impact: { value: 58, label: "Grounding" },
    lore: { value: 77, label: "Dense" },
    oracle: "The fish were optional. The silence was the catch.",
    receipts: [
      { k: "Sun elevation", v: "Low, hard, unfiltered" },
      { k: "Snow albedo", v: "+1.2 EV floor lift" },
      { k: "Tool state", v: "Hand auger, pre-cut" },
      { k: "Subject lock", v: "0.88" },
      { k: "Horizon placement", v: "Upper quarter, honest" },
      { k: "Wind", v: "Calm, inferred" },
      { k: "Expression Band", v: "Mouth turns up at the brace — a small warm cue in a cold frame" },
    ],
  },
];

/* =============================================================
   ScanResult v2 — stable data shape per SCAN_ROUTING_SPEC +
   SCAN_ENGINE_SPEC (2026-06-12). Append-only: existing SOURCES
   fields are MAPPED, not duplicated. Read by app.js via
   getScanResult() for v2 Free/Halo rendering, kept alongside
   legacy data for full compatibility.
============================================================= */

/* v2-only fixture data, keyed by source id */
const V2_EXTRAS = {
  "driver-salute": {
    route: "HUMAN_SOLO",
    scanStatus: "accepted",
    confidence: { overall: 0.83, band: "high" }, // matches "Subject lock 0.83" receipt
    archetypeClass: "The Encounter",
    warnings: ["Wide-angle distortion noted — corrected in read"],
    receipts: [
      { cue: "raised palm, five-spread, facing lens", effect: "Signal ↑", basis: "gesture readability", confidence: "high" },
      { cue: "face locks left third, palm as second anchor", effect: "Frame Presence ↑", basis: "focal clarity", confidence: "high" },
      { cue: "wide-angle barrel + dashboard intrusion", effect: "Frame ↓", basis: "crop pressure", confidence: "high" },
      { cue: "fjord band through right window glass", effect: "Lore ↑", basis: "setting specificity", confidence: "medium" },
      { cue: "red layer against grey cabin", effect: "Scene Charge ↑", basis: "contrast anchor", confidence: "high" },
    ],
  },
  "ice-auger": {
    route: "HUMAN_SOLO",
    scanStatus: "accepted",
    confidence: { overall: 0.88, band: "high" }, // matches "Subject lock 0.88" receipt
    archetypeClass: "The Dispatch",
    warnings: ["Blown highlights on snow plane — exposure-corrected in card tuning"],
    receipts: [
      { cue: "black silhouette on white field", effect: "Frame Presence ↑", basis: "contrast / isolation", confidence: "high" },
      { cue: "treeline holds the upper quarter in one band", effect: "Frame ↑", basis: "composition / horizon control", confidence: "high" },
      { cue: "hood, beanie and sunglasses qualify the expression", effect: "Signal ↓", basis: "eye-line redirected to task", confidence: "medium" },
      { cue: "auger diagonal into the ice", effect: "Lore ↑", basis: "tool / work evidence", confidence: "high" },
      { cue: "crouched brace, gloves stacked", effect: "Scene Charge ↑", basis: "contained motion potential", confidence: "medium" },
    ],
  },
};

/* Builder: maps legacy source fields into the v2 shape. */
function toScanResultV2(src) {
  const x = V2_EXTRAS[src.id];
  const srcId = `SRC-${String(src.no).padStart(2, "0")}`;
  const fitAvg = Math.round(
    src.metrics.fitMatrix.reduce((s, f) => s + f.v, 0) / src.metrics.fitMatrix.length
  );
  /* Gesture Geometry is conditional (SCAN_ENGINE_SPEC): present only
     when gesture evidence is the visible read. SRC-01's hidden stat IS
     Gesture Geometry; SRC-02's conditional stat is Field Silence. */
  const gestureAuthority =
    src.dossier.hidden.name === "Gesture Geometry"
      ? { present: true, conditional: true, value: src.dossier.hidden.value, read: src.dossier.hidden.read }
      : { present: false, conditional: true, reason: "gesture evidence partial — brace only; conditional stat resolved as " + src.dossier.hidden.name };

  return {
    scanId: `BR-SCAN-${src.dossier.record.objectNo.slice(-3)}`,
    sourceId: srcId,
    route: x.route,
    scanStatus: x.scanStatus, // accepted | limited | rejected
    confidence: x.confidence, // { overall: 0..1, band: high|medium|low }
    stats: {
      freeVisible: { ...src.card.stats }, // Presence / Frame / Signal / Charge — exactly 4
      haloExtended: {
        loreDensity: { value: src.lore.value, label: src.lore.label },
        fitCoherence: { value: fitAvg, label: fitAvg >= 80 ? "Locked" : "Aligned" },
        gestureAuthority,
        visualImpact: {
          value: src.impact.value,
          label: src.impact.label,
          derived: true,
          derivedFrom: ["charge", "presence", "frame", "rarity"], // never independently scored
        },
      },
    },
    receipts: x.receipts, // { cue, effect, basis, confidence }
    archetype: {
      title: src.card.archetype, // instance title (photo role, not personality)
      class: x.archetypeClass, // COPY_SYSTEM §4 class
      routeLogic: `${x.route} + strongest stat pair + strongest receipt`,
    },
    readings: {
      freeLine: src.card.note, // short, preview-sized
      haloRead: src.stance, // deeper; develops, never contradicts freeLine
      oracle: src.dossier.oracle.full,
    },
    treatment: {
      free: { key: "free", label: "Free Pull" },
      halo: { key: "shiny", label: "Halo Mint", material: src.halo.material },
    },
    tierOutputs: {
      free: {
        statsShown: ["presence", "frame", "signal", "charge"],
        receiptsShown: x.receipts.slice(0, 3),
        reading: src.card.note,
        oracle: src.dossier.oracle.short,
        /* must match the legacy rendered string exactly (BR-SRC01, no dash) */
        serial: `Reserved · BR-SRC${String(src.no).padStart(2, "0")}-HM-····`,
      },
      halo: {
        statsShown: ["presence", "frame", "signal", "charge", "loreDensity", "fitCoherence", "visualImpact"],
        receiptsShown: x.receipts,
        reading: src.stance,
        oracle: src.dossier.oracle.full,
        mintSerial: src.dossier.mint.serial,
        material: src.halo.material,
        triggers: [src.dossier.mint.trigger1, src.dossier.mint.trigger2],
      },
    },
    conditionalStats: [
      { name: src.dossier.hidden.name, value: src.dossier.hidden.value, read: src.dossier.hidden.read, tier: "halo" },
    ],
    warnings: x.warnings,
  };
}

const SCAN_RESULTS_V2 = SOURCES.map(toScanResultV2);
