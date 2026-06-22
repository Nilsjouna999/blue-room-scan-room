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

/* House read method — the interpretive lenses shown in Technical
   Receipts (paid). Same for every card: it's the method, not a
   measurement. Phrase as what the read looks THROUGH (rendered as
   "read through: …"), never as a derivation or fake-scientific formula. */
const FORMULAS = [
  { k: "Frame Presence", v: "focal clarity · posture stability · scene anchoring" },
  { k: "Frame", v: "composition balance · crop pressure · background control" },
  { k: "Signal", v: "gesture readability · eye-line clarity · styling distinctness" },
  { k: "Scene Charge", v: "motion potential · contrast · scene temperature" },
  { k: "Lore Density", v: "setting specificity · unresolved story · object cues" },
  { k: "Fit Coherence", v: "styling · setting · posture · gesture alignment" },
];

/* Customer-facing hierarchy (2026-06-12): Free Pull / Halo Mint.
   `mint` is an internal Lab state (keyboard M) — its silver material
   feeds Free Pull polish and the future final Halo material.
   Internal keys (free/mint/shiny) stay stable; only labels changed. */
const TREATMENTS = {
  free: {
    label: "Free Pull",
    rarity: "ARCHIVE EDITION",
    stamp: "FREE PULL EDITION",
    strip: "FREE PULL EDITION",
    tagline: "The complete archive front, filed as scanned. Halo develops the same scan deeper.",
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
    short: "Driver",
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
        visualImpact: { evidence: "One bright gesture against a busy cabin — the eye resolves the image in a single read." },
      },
      hidden: {
        name: "Gesture Geometry",
        value: 88,
        read: "The raised palm turns the image from selfie into encounter — the frame addresses the lens directly, not the other way around.",
        tease: "A sealed reading is held on the back of this card. It develops with the mint.",
      },
      mint: {
        trigger1: "Raised palm",
        trigger2: "Cabin frame",
        family: "Halo Mint · Gesture Class",
        note: "Minted from the exact moment between farewell and blessing.",
        /* mint serial shares the card's OWN object family (BR-001-DRV-0001) so
           Card and Mint read as one object's lineage, not two unrelated serials */
        serial: "BR-001-DRV-0001-HM",
      },
      oracle: {
        full: "This card belongs to the rare class of images where the subject appears to be both leaving the group chat and blessing the vehicle.",
        short: "The palm says stop. The card kept going.",
        timeline: "Adjacent in the archive — noir still · winter field report · dashboard prophet",
      },
    },
    card: {
      title: "Checkpoint Wave",
      archetype: "Open-Window Operator",
      note: "A flat palm, five fingers, raised straight at the lens. Out the side glass, the fjord.",
      signature: "Filed from the driver's seat, engine off.",
      /* Free-front four = presence(Frame Presence)/frame/signal/visualImpact
         (CARD_SYSTEM_V1 §2). charge(Scene Charge) is Halo-depth now — kept here
         only as the source for the Metrics diagnostic tab, never a Free-front stat. */
      stats: { presence: 67, frame: 52, signal: 84, visualImpact: 64, charge: 70 },
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
      visualImpact:
        "Lands in one glance — the raised palm and the red layer carry the frame before the cabin clutter registers.",
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
    short: "Ice Field",
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
        visualImpact: { evidence: "Maximum contrast, minimal noise — the frame delivers its whole argument at a glance." },
      },
      hidden: {
        name: "Field Silence",
        value: 91,
        read: "The frame reads like field evidence: crouched brace, task-directed gaze, no gesture aimed at the lens. The image organizes around the work, not the recording.",
        tease: "A sealed reading is held on the back of this card. It develops with the mint.",
      },
      mint: {
        trigger1: "Auger silhouette",
        trigger2: "Treeline horizon",
        family: "Halo Mint · Field Class",
        note: "Minted from two feet of ice and the patience to get through it.",
        /* mint serial shares the card's OWN object family (BR-002-ICE-0001) */
        serial: "BR-002-ICE-0001-HM",
      },
      oracle: {
        full: "This card does not explain itself. It arrives as field evidence and lets the snow do most of the talking.",
        short: "The snow kept the minutes. The card signed them.",
        timeline: "Adjacent in the archive — cold expedition card · winter field report · quiet operator still",
      },
    },
    card: {
      title: "Two Feet of Quiet",
      archetype: "Frost Surveyor",
      note: "Crouched on the ice, both gloves stacked on the auger. Low hard sun — the snow keeps no shadow.",
      signature: "Signed in snow, countersigned by the sun.",
      /* Free-front four = presence/frame/signal/visualImpact (CARD_SYSTEM_V1 §2);
         charge(Scene Charge) is Halo-depth, kept only for the Metrics diagnostic tab. */
      stats: { presence: 71, frame: 83, signal: 56, visualImpact: 58, charge: 62 },
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
      visualImpact:
        "Reads instantly — a black silhouette on a white field needs no second look to land.",
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
      { k: "Horizon placement", v: "Upper quarter, honest" },
      { k: "Wind", v: "Calm, inferred" },
      { k: "Expression Band", v: "Mouth turns up at the brace — a small warm cue in a cold frame" },
    ],
  },

  // ---- SCAN SOURCE 03 — shoreline catch held transverse, fjord + ridge (BR-S103, agent-authored, safety-gated)
  {
    id: "shore-catch",
    no: 3,
    label: "Scan Source 03",
    short: "Shore",
    file: "assets/source-03.jpg",
    orient: "portrait",
    photoTuning: { pos: "50% 38%", zoom: 1, scrim: 0.1, base: { bright: 1.02, contrast: 1.03, sat: 0.97 } },
    capture: { code: "FIELD / HOLD", lens: "STANDARD-WIDE · 24MM EQ", light: "OVERCAST FLAT · DIFFUSE FULL-FRONT", locale: "FJORD GRAVEL SHORE", rec: "2026.06.22" },
    markers: [
      { x: 50, y: 55, label: "Focal lock — held catch" },
      { x: 50, y: 35, label: "Frame axis — torso vertical" },
      { x: 75, y: 25, label: "Depth band — fjord water + mountain" },
    ],
    horizon: 28,
    analysis: [
      "FLAT OVERCAST · ZERO SHADOW · CATCH DETAIL FULLY EXPOSED",
      "CATCH HELD TRANSVERSE — FRAME-WIDE HORIZONTAL INTERRUPT",
      "DRIFTWOOD LOG ANCHORS LEFT GROUND PLANE · LEADS EYE INWARD",
      "SNOW-STREAKED RIDGELINE SEALS THE UPPER REGISTER",
      "FOREGROUND STONE-GRASS BAND GROUNDS THE DISPATCH SCENE",
    ],
    diagram: {
      aspect: 2.14,
      massBox: { x: 30, y: 20, w: 40, h: 65, label: "FIGURE + CATCH MASS" },
      gesture: { points: [[28, 56], [50, 54], [72, 56]], label: "CATCH LINE — TRANSVERSE HOLD", labelAt: [28, 62] },
      axis: { points: [[50, 10], [50, 80]], label: "VERTICAL AXIS — TORSO" },
      arrow: { from: [50, 54], to: [50, 38], label: "SIGNAL → CATCH TO LENS" },
      light: { x: 50, y: 6, label: "KEY · DIFFUSE OVERCAST" },
      pressure: [
        { side: "top", depth: 20, label: "RIDGE PRESSURE" },
        { side: "bottom", depth: 12, label: "SHORE PRESSURE" },
      ],
      notes: [
        "CATCH HELD HORIZONTAL — STRONGEST LATERAL IN FRAME",
        "DRIFTWOOD LOG RHYMES WITH CATCH AXIS — DOUBLE HORIZONTAL",
        "OVERCAST KILLS ALL SPECULAR EXCEPT SCALE GLINT",
        "FJORD PLANE RECEDES HARD LEFT — DEPTH CONFIRMED",
        "GRAVEL SHORE TEXTURE READS AS FIELD-DOCUMENT GROUND",
      ],
    },
    metrics: {
      signalMix: [
        { k: "Held Object", v: 38 },
        { k: "Shore Scene", v: 24 },
        { k: "Mountain Depth", v: 18 },
        { k: "Driftwood", v: 12 },
        { k: "Light", v: 8 },
      ],
      pressure: { balance: 4, centerPull: 72, noise: 31, clarity: 84 },
      fitMatrix: [
        { k: "Subject", state: "Locked", v: 86 },
        { k: "Setting", state: "Aligned", v: 79 },
        { k: "Held Object", state: "Dominant", v: 91 },
        { k: "Light", state: "Flat", v: 74 },
      ],
    },
    halo: { material: "Cold Tide Steel", a: "#6fb3e0", b: "#8b7bff", c: "#9fe0c8" },
    dossier: {
      record: {
        objectNo: "BR-OBJ-003",
        captureType: "Field hold · catch presented transverse",
        gesture: "Two-handed lateral hold, object across the body plane",
        container: "Open fjord gravel shore, driftwood + grass margin, snow ridge backdrop",
        primarySignal: "Large catch held horizontal — full lateral span, scale legible",
        backgroundRole: "Fjord water + ridgeline — compressed depth stack behind the hold",
        eligibility: "Halo Mint · dispatch-triggered",
        provenance: "Shore-side field record, overcast session, fjord locale",
        markings: "Mottled dark dorsal, pale lateral band, tail fan intact · driftwood log parallels catch axis, lower left",
      },
      evidence: [
        { k: "Catch Axis", read: "The held object spans the full mid-frame width, its horizontal axis unbroken by any foreground element.", free: true },
        { k: "Scale Legibility", read: "Flat overcast eliminates hard shadow; the mottled dorsal pattern and pale lateral band resolve fully at capture distance.", free: true },
        { k: "Driftwood Echo", read: "A bleached driftwood log in the lower-left ground plane runs parallel to the catch axis, doubling the lateral register.", free: true },
        { k: "Shore Texture", read: "Coarse gravel and tufted grass at the frame base establish the field-document ground context for the dispatch read.", free: false },
        { k: "Mountain Seal", read: "The snow-streaked ridgeline occupies the upper quarter, compressing the depth stack and anchoring the scene as coastal-remote.", free: false },
        { k: "Fjord Recession", read: "The calm water surface recedes at hard left, providing measurable depth behind the catch plane.", free: false },
      ],
      statNotes: {
        presence: { evidence: "Hold and catch together fill the vertical axis top-to-bottom; the held object intercepts the center-mass zone.", note: "Presence is object-amplified — the catch doubles the lateral silhouette." },
        frame: { evidence: "Standard-wide lens at close distance produces mild barrel distortion; catch edges curve fractionally outward." },
        signal: { evidence: "The transverse hold is the sole directional interrupt in the frame; every other element is vertical or receding.", note: "Signal peaks at the catch mid-body where scale contrast is highest." },
        charge: { evidence: "Overcast flat light removes drama but maximises object-surface information; no blown highlight, no crushed shadow." },
        visualImpact: { evidence: "Two horizontals — catch and driftwood — bracket the lower half; the fjord recession opens the right; the compression reads dense." },
      },
      hidden: { name: "Catch Geometry", value: 91, read: "The transverse hold turns the catch tail-to-head across the frame's widest plane — a document-optimal orientation that exposes maximum lateral surface to the lens.", tease: "A sealed reading is held on the back of this card. It develops with the mint." },
      mint: { trigger1: "Transverse hold spanning the frame", trigger2: "Driftwood axis echoes the catch axis", family: "Halo Mint · Dispatch Class", note: "Minted the instant the catch turned its full length to the flat sky.", serial: "BR-003-FSH-0001-HM" },
      oracle: { full: "The catch arrives as its own document — held flat, surface turned to the sky, nothing obscured. The shore becomes the filing cabinet: gravel, driftwood, water, ridge. Each layer submits in order.", short: "Held flat, turned to the sky. The shore files its own report.", timeline: "Adjacent in the archive — the open hold · the parallel log · the receding fjord" },
    },
    card: {
      title: "Shore Dispatch",
      archetype: "The Dispatch",
      note: "The salmon is held flat across the chest, face-up to the sky. In the grass below, the second one.",
      signature: "Filed flat on the gravel, countersigned by the fjord.",
      stats: { presence: 81, frame: 74, signal: 88, visualImpact: 83, charge: 72 },
      serial: "BR-003-FSH-0001",
      batch: "Field Batch 03",
      edition: "First Print",
      minted: "2026.06.22",
    },
    reads: {
      presence: "The frame registers a two-handed lateral hold that spans the full width, expanding the silhouette mass into the horizontal.",
      frame: "Standard-wide optics at close quarters compress the shore stack — gravel, driftwood, water, ridge — into a legible depth sequence behind the hold.",
      signal: "The transverse catch axis is the sole horizontal interrupt in a scene organized by verticals and diagonals; it commands the read.",
      charge: "Flat diffuse overcast removes all specular rivalry and deposits the full luminance budget on the held object's mottled surface.",
      visualImpact: "Two parallel horizontals — catch and driftwood — bracket the lower register while the fjord recession opens the upper right: a bilaterally loaded frame with clean centripetal pull.",
    },
    aura: ["Lateral", "Dispatched", "Shore-Filed"],
    sceneRole: "Open shoreline dispatch — fjord and ridge as witness backdrop.",
    stance: "Transverse hold, catch presented perpendicular to the camera axis. The frame stays a field document — the shore does the staging, the catch states the terms.",
    fit: "The held object's scale and orientation align exactly with the Dispatch archetype; the scene container confirms remote field provenance.",
    impact: { value: 83, label: "Bilateral" },
    lore: { value: 71, label: "Dense" },
    oracle: "The held flat is the declaration. Everything behind it — water, rock, ridge, sky — is the counter-signature.",
    receipts: [
      { k: "Key light", v: "Overcast, diffuse full-front" },
      { k: "Catch orientation", v: "Transverse — full lateral span" },
      { k: "Lens estimate", v: "Standard-wide, ~24mm eq" },
      { k: "Shore surface", v: "Coarse gravel + tufted grass" },
      { k: "Driftwood", v: "Bleached log, parallel to catch axis" },
      { k: "Depth element", v: "Fjord water receding hard left" },
      { k: "Skyline seal", v: "Snow-streaked ridgeline, upper quarter" },
    ],
  },

  // ---- SCAN SOURCE 04 — low-angle path, canine mid-stride foreground break (BR-S103, agent-authored, safety-gated)
  {
    id: "loose-run",
    no: 4,
    label: "Scan Source 04",
    short: "Run",
    file: "assets/source-04.jpg",
    orient: "portrait",
    photoTuning: { pos: "50% 45%", zoom: 1, scrim: 0.12, base: { bright: 1.02, contrast: 1.03, sat: 1.05 } },
    capture: { code: "CANDID / RUN", lens: "ACTION-WIDE · 24MM EQ", light: "OVERCAST · DIFFUSE FULL", locale: "GRAVEL-GRASS PATH · OPEN SCRUBLAND", rec: "2026.06.22" },
    markers: [
      { x: 50, y: 38, label: "Focal anchor — foreground mass mid-stride" },
      { x: 50, y: 68, label: "Crouch form — secondary figure" },
      { x: 30, y: 15, label: "Leading wedge — path convergence" },
    ],
    horizon: 22,
    analysis: [
      "LOW-ANGLE FIELD · FOREGROUND MASS BREAKS PLANE",
      "PATH WEDGE DRIVES DEPTH LOWER-LEFT TO UPPER-CENTER",
      "POWER LINE BISECTS OVERCAST SKY · HORIZONTAL COUNTER-TENSION",
      "SECONDARY FORM CROUCHED · COMPRESSED INTO MID-GROUND BAND",
      "MOTION VECTOR — STRIDE AIMED DIRECTLY AT LENS",
    ],
    diagram: {
      aspect: 2.14,
      massBox: { x: 32, y: 30, w: 38, h: 40, label: "FOREGROUND MASS" },
      gesture: { points: [[50, 58], [50, 45], [50, 32]], label: "STRIDE VECTOR — LENS-DIRECT", labelAt: [53, 40] },
      axis: { points: [[20, 80], [55, 30]], label: "PATH WEDGE AXIS" },
      arrow: { from: [50, 38], to: [50, 20], label: "MOTION → LENS" },
      light: { x: 50, y: 8, label: "KEY · OVERCAST DIFFUSE" },
      pressure: [
        { side: "top", depth: 18, label: "SKY / LINE PRESSURE" },
        { side: "left", depth: 14, label: "PATH-EDGE PRESSURE" },
      ],
      notes: [
        "FOREGROUND MASS OWNS THE CENTRAL THIRD",
        "PATH CONVERGES TO A VANISHING POINT BEHIND THE CROUCH",
        "GRASS BANK RIGHT CREATES A CHANNEL ENCLOSURE",
        "OVERCAST PLATE ELIMINATES SHADOW ANCHOR — FLOATS MASS",
        "POWER LINE REGISTERS AS A GRAPHIC SLICE ACROSS THE SKY",
      ],
    },
    metrics: {
      signalMix: [
        { k: "Motion", v: 36 },
        { k: "Depth", v: 24 },
        { k: "Interaction", v: 18 },
        { k: "Landscape", v: 14 },
        { k: "Line", v: 8 },
      ],
      pressure: { balance: -8, centerPull: 64, noise: 42, clarity: 78 },
      fitMatrix: [
        { k: "Subject", state: "Locked", v: 88 },
        { k: "Setting", state: "Aligned", v: 71 },
        { k: "Motion", state: "Loud", v: 91 },
        { k: "Depth", state: "Anchored", v: 74 },
      ],
    },
    halo: { material: "Field Green Glass", a: "#7fc8a0", b: "#6fb3e0", c: "#cfe2ee" },
    dossier: {
      record: {
        objectNo: "BR-OBJ-004",
        captureType: "Candid outdoor action · low angle",
        gesture: "Foreground mass mid-stride, four limbs extended, body breaking toward the lens",
        container: "Gravel-grass path flanked by grass bank and open scrubland, overcast sky",
        primarySignal: "Foreground stride — direct lens approach",
        backgroundRole: "Crouched form anchors mid-ground; path wedge carries depth; power line graphic overhead",
        eligibility: "Halo Mint · motion-triggered",
        provenance: "Outdoor path locale, overcast natural light, handheld low-angle capture",
        markings: "Tricolor coat — black, white, tan — high contrast against pale gravel",
      },
      evidence: [
        { k: "Foreground Break", read: "The foreground mass crosses the lower two-thirds of the frame, displacing the background to a shallow band — the frame belongs to the stride.", free: true },
        { k: "Path Wedge", read: "The gravel path narrows from lower-left to upper-center, supplying the primary depth cue and directing the eye through the frame.", free: true },
        { k: "Lens-Approach Vector", read: "All four limbs are extended in mid-stride; the body axis is perpendicular to the picture plane — motion reads as direct approach, not cross-frame travel.", free: true },
        { k: "Overcast Diffusion", read: "The cloud plate reduces specular highlights to near zero; coat texture reads in full without blown edges.", free: false },
        { k: "Power-Line Register", read: "A single power line bisects the upper sky band as a horizontal graphic element — counter-tension to the path's diagonal.", free: false },
        { k: "Crouch Compression", read: "The secondary form is flattened by perspective into the mid-ground band, compressed beneath the foreground silhouette — spatial hierarchy set by the focal plane.", free: false },
      ],
      statNotes: {
        presence: { evidence: "The foreground mass is centered, stride extended, filling the central third at close focal distance.", note: "The near field is yielded entirely to the approaching form — nothing competes." },
        frame: { evidence: "Path wedge, grass-bank enclosure, and overhead line form a three-axis structural grid that channels the eye." },
        signal: { evidence: "Direct lens-approach stride with all limbs extended; motion frozen at peak extension.", note: "The action reads as arrival rather than passing — aimed at the camera, not across it." },
        charge: { evidence: "Low-angle perspective compresses the distance between foreground and mid-ground; the encounter reads as imminent." },
        visualImpact: { evidence: "Tricolor coat against pale gravel; overcast diffusion preserves full tonal range; the path diagonal carries the eye from corner to subject." },
      },
      hidden: { name: "Stride Geometry", value: 91, read: "Four-point extension captured at peak stride — leading foreleg, trailing hindleg, suspended mass — forms a precise diagonal that recurs rarely even in high-volume motion capture.", tease: "A sealed reading is held on the back of this card. It develops with the mint." },
      mint: { trigger1: "Motion-direct foreground break", trigger2: "Path-wedge depth axis confirmed", family: "Halo Mint · Encounter Class", note: "Minted from the single stride that aimed itself at the lens.", serial: "BR-004-RUN-0001-HM" },
      oracle: { full: "The frame builds its depth from the ground up — path first, then form, then sky. The foreground breaks the plane without warning; the path wedge had already prepared the eye for arrival. What the frame keeps is the instant before contact, held by overcast light that refuses to cast a shadow.", short: "The path set the condition; the stride executed it.", timeline: "Adjacent in the archive — path geometry · motion break · depth channel" },
    },
    card: {
      title: "Stride Break",
      archetype: "The Encounter",
      note: "The dog leaves the ground. Everything behind it — the path, the fence, the man — is just run-up.",
      signature: "Logged at ankle height, the instant before contact.",
      stats: { presence: 87, frame: 79, signal: 91, visualImpact: 84, charge: 88 },
      serial: "BR-004-RUN-0001",
      batch: "Field Batch 04",
      edition: "First Print",
      minted: "2026.06.22",
    },
    reads: {
      presence: "The foreground mass occupies the lower two-thirds at close focal distance, displacing competing elements into a shallow residual band — the foreground is not shared.",
      frame: "A path wedge from lower-left, a grass-bank enclosure on the right, and a power-line horizontal overhead form a three-axis grid that channels depth and contains the action.",
      signal: "All four limbs are extended at peak stride; the body axis presents perpendicular to the picture plane — the motion reads as direct approach.",
      charge: "Low-angle compression collapses the distance between foreground mass and mid-ground form; the frame registers the encounter as seconds from contact.",
      visualImpact: "Tricolor coat — black, white, tan — cuts cleanly against pale gravel under diffuse overcast; no specular blow-out, full tonal range preserved.",
    },
    aura: ["Approach", "Channel", "Diffuse"],
    sceneRole: "Gravel-grass path exterior — a depth channel with a foreground action break.",
    stance: "Mid-stride foreground break, lens-direct approach, four limbs extended at peak. The path wedge and grass-bank enclosure hold the action in a corridor.",
    fit: "The path wedge and bank enclosure contain the action within a structural corridor; the overcast plate holds light flat across the whole scene.",
    impact: { value: 88, label: "Kinetic" },
    lore: { value: 74, label: "Dense" },
    oracle: "The path wedge was the preparation; the stride was the event. The frame holds the moment before contact — diffuse light, no shadow, no clock.",
    receipts: [
      { k: "Key light", v: "Overcast, full diffuse, no shadow" },
      { k: "Focal plane", v: "Foreground mass, mid-ground compressed behind" },
      { k: "Depth cue", v: "Gravel-grass path wedge, lower-left to upper-center" },
      { k: "Counter-tension", v: "Power line across the upper sky band" },
      { k: "Motion register", v: "Four-limb extension at peak stride, lens-direct" },
      { k: "Coat signature", v: "Tricolor — black, white, tan — against pale gravel" },
      { k: "Enclosure", v: "Grass bank right, open scrubland left — channel geometry" },
    ],
  },

  // ---- SCAN SOURCE 05 — held specimen over tank, fluorescent interior, mural depth (BR-S103, agent-authored, safety-gated)
  {
    id: "tank-pick",
    no: 5,
    label: "Scan Source 05",
    short: "Tank",
    file: "assets/source-05.jpg",
    orient: "portrait",
    photoTuning: { pos: "50% 45%", zoom: 1.05, scrim: 0.12, base: { bright: 1.02, contrast: 1.04, sat: 1.05 } },
    capture: { code: "CANDID / INT", lens: "STANDARD · 28MM EQ", light: "FLUORESCENT OVERHEAD · HARD TOP", locale: "SEAFOOD TANK HALL · INTERIOR", rec: "2026.06.22" },
    markers: [
      { x: 50, y: 52, label: "Focal lock — held specimen" },
      { x: 50, y: 35, label: "Grip block — two-hand cradle" },
      { x: 62, y: 68, label: "Tank band — blue water plane" },
    ],
    horizon: null,
    analysis: [
      "HARD OVERHEAD FLUORESCENT · SPECULAR SHELL CATCH +18%",
      "HELD SPECIMEN CENTERED · TANK BLUE ANCHORS LOWER THIRD",
      "TROPICAL MURAL WALL · PICTORIAL DEPTH BEHIND TANK GLASS",
      "CARAPACE DIAGONAL BISECTS FRAME · ANTENNA LINE TO UPPER LEFT",
      "FLUORESCENT TUBE GRID MAPS CEILING RECESSION · LATTICE VISIBLE",
    ],
    diagram: {
      aspect: 2.14,
      massBox: { x: 30, y: 30, w: 40, h: 45, label: "FIGURE + SPECIMEN MASS" },
      gesture: { points: [[48, 28], [50, 40], [51, 58]], label: "HOLD LINE — VERTICAL CRADLE", labelAt: [34, 26] },
      axis: { points: [[30, 62], [72, 68]], label: "TANK BAND AXIS" },
      arrow: { from: [50, 52], to: [50, 66], label: "SIGNAL → TANK BLUE" },
      light: { x: 52, y: 8, label: "KEY · FLUORESCENT TOP" },
      pressure: [
        { side: "top", depth: 12, label: "CEILING-TUBE PRESSURE" },
        { side: "bottom", depth: 18, label: "TANK-BAND PRESSURE" },
      ],
      notes: [
        "SPECIMEN AXIS RUNS VERTICAL · SHELL DOMINATES MIDDLE ZONE",
        "TANK BLUE PROVIDES SATURATED COUNTER-WEIGHT TO WARM SHELL",
        "MURAL WALL BLEEDS TROPICAL COLOR INTO UPPER BACKGROUND",
        "FLUORESCENT GRID CASTS A HARD SHADOW PLANE ACROSS THE CONTAINER",
        "GRIP GEOMETRY LOCKS THE SPECIMEN FACE OUTWARD TOWARD LENS",
      ],
    },
    metrics: {
      signalMix: [
        { k: "Held Specimen", v: 38 },
        { k: "Tank Blue", v: 24 },
        { k: "Grip Gesture", v: 18 },
        { k: "Mural Wall", v: 12 },
        { k: "Ceiling Grid", v: 8 },
      ],
      pressure: { balance: 4, centerPull: 72, noise: 41, clarity: 78 },
      fitMatrix: [
        { k: "Specimen", state: "Locked", v: 88 },
        { k: "Container", state: "Aligned", v: 74 },
        { k: "Light", state: "Harsh", v: 66 },
        { k: "Gesture", state: "Loud", v: 90 },
      ],
    },
    halo: { material: "Tank Glass Teal", a: "#36b6c8", b: "#8b7bff", c: "#e0a060" },
    dossier: {
      record: {
        objectNo: "BR-OBJ-005",
        captureType: "Interior candid · held-specimen presentation",
        gesture: "Two-hand vertical cradle, specimen face-out toward the lens",
        container: "Seafood tank hall · glass tank foreground · painted mural rear wall",
        primarySignal: "Spiny carapace · specular shell surface under top fluorescent",
        backgroundRole: "Tropical mural + tank-blue band · pictorial depth plane",
        eligibility: "Halo Mint · gesture-triggered",
        provenance: "Seafood interior · tank-hall display · live-specimen showcase",
        markings: "Full spiny carapace · extended antennae · banded abdomen · mottled orange-brown shell",
      },
      evidence: [
        { k: "Specimen Lock", read: "The carapace occupies the axial center of the frame, its shell catching the ceiling fluorescent in a hard specular band that anchors the eye before any background registers.", free: true },
        { k: "Two-Hand Cradle", read: "Both grip points are visible — proximal hold behind the rostrum, distal hold at the abdomen — forming a vertical cradle that presents the specimen face-forward to the lens.", free: true },
        { k: "Tank-Blue Ground", read: "The glass tank in the lower third delivers a saturated cyan plane that counterweights the warm orange-brown of the shell, sharpening the primary signal boundary.", free: true },
        { k: "Fluorescent Grid", read: "Three ceiling tubes create a hard top-light with no fill, generating deep under-shadow on the tank edge and flattening mid-ground texture.", free: false },
        { k: "Mural Register", read: "The painted wall behind the tank introduces a secondary pictorial plane — palm motifs and painted water — that echoes the live-tank content into the background field.", free: false },
        { k: "Antenna Extension", read: "The extended antennae project beyond the held mass into the upper-left quadrant, an asymmetric graphic element that relieves the centered composition.", free: false },
      ],
      statNotes: {
        presence: { evidence: "The carapace fills the axial middle zone; the two-hand cradle keeps the specimen mass dominant in the vertical center without peripheral drift.", note: "Presence is specimen-driven — the tank and mural are supporting registers." },
        frame: { evidence: "The composition is tight around the hold gesture and tank band; the ceiling grid supplies recession without competing with the focal plane." },
        signal: { evidence: "The specular fluorescent catch on the shell is the primary signal generator; the cyan tank plane provides chromatic separation that sharpens the read.", note: "Signal depends on the top-light — any diffusion would collapse the shell read." },
        charge: { evidence: "The live-specimen context — tank water visible, mural aquatic — compounds the charge beyond the isolated object; the environment confirms selection-ready status." },
        visualImpact: { evidence: "Hard top fluorescent, saturated tank blue, complex carapace texture, and extended antenna lines combine into a high-contrast composition legible at thumbnail scale." },
      },
      hidden: { name: "Antenna Geometry", value: 84, read: "The antenna lines extend roughly 40% of the frame height beyond the held mass, inscribing a directional vector the composition otherwise suppresses — a residual wildness kept in the artifact's margin.", tease: "A sealed reading is held on the back of this card. It develops with the mint." },
      mint: { trigger1: "Tank blue visible with the held specimen", trigger2: "Full carapace with antennae intact", family: "Halo Mint · Encounter Class", note: "Minted the second the shell met a light it was never meant for.", serial: "BR-005-TNK-0001-HM" },
      oracle: { full: "The frame holds what the tank holds — a body organized by its own armature, lifted into light that was not designed for it. The fluorescent reads every surface without mercy. What the shell deflects, the water takes.", short: "Lifted into the wrong light, the shell keeps everything.", timeline: "Adjacent in the archive — tank glass · mural wall · ceiling grid" },
    },
    card: {
      title: "Spiny Encounter",
      archetype: "The Encounter",
      note: "The lobster is held up by the antennae, full carapace turned to the fluorescent light. Behind it, the tank is one short.",
      signature: "Filed under house light, over someone else's water.",
      stats: { presence: 82, frame: 74, signal: 86, visualImpact: 79, charge: 88 },
      serial: "BR-005-TNK-0001",
      batch: "Field Batch 05",
      edition: "First Print",
      minted: "2026.06.22",
    },
    reads: {
      presence: "The carapace mass sits at the vertical and horizontal center; the two-hand cradle holds the specimen face-outward with enough axial stability to resist competition from the mural and tank.",
      frame: "The container is a tank hall under a fluorescent ceiling grid — the glass tank anchors the lower third as a chromatic base, the painted wall supplies pictorial depth, the ceiling maps recession behind the hold.",
      signal: "A hard specular band runs across the dorsal shell where the overhead tube meets the surface, isolating the specimen from both the warm mural and the saturated cyan of the tank.",
      charge: "The live-water context — tank visible, mural echoing the aquatic register — charges the held object with a selection-ready status a studio prop cannot replicate.",
      visualImpact: "At reduced scale the antenna lines, the cyan tank stripe, and the hard shell catch form a three-part graphic that reads before texture does — high legibility from chromatic contrast and extended form.",
    },
    aura: ["Carapace", "Fluorescent", "Cyan-Tank"],
    sceneRole: "Held-specimen presentation over a live tank — interior showcase.",
    stance: "Vertical cradle, specimen face-forward, antennae extended upper-left. The frame organizes around the held armature, lifted into house light.",
    fit: "A live-tank seafood interior under fluorescent house light with a tropical mural surround — the container confirms the Encounter read.",
    impact: { value: 79, label: "Specular" },
    lore: { value: 84, label: "Dense" },
    oracle: "The frame holds what the tank holds — a body organized by its own armature, lifted into light that was not designed for it.",
    receipts: [
      { k: "Key light", v: "Fluorescent overhead · hard top · no fill" },
      { k: "Primary subject", v: "Spiny carapace · antennae intact" },
      { k: "Ground plane", v: "Glass tank · cyan water band · lower third" },
      { k: "Background", v: "Tropical painted mural · palm motifs" },
      { k: "Grip geometry", v: "Two-hand vertical cradle · face-out" },
      { k: "Shell surface", v: "Mottled orange-brown · banded · specular catch" },
      { k: "Ceiling", v: "Fluorescent tube grid · three tubes · recession" },
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
  "shore-catch": {
    route: "HUMAN_SOLO",
    scanStatus: "accepted",
    confidence: { overall: 0.87, band: "high" },
    archetypeClass: "The Dispatch",
    warnings: ["EXIF rotation present — diagram coordinates authored for the upright portrait view"],
    receipts: [
      { cue: "catch held transverse across the frame", effect: "Signal ↑", basis: "the only horizontal axis in the frame", confidence: "high" },
      { cue: "overcast flat light, no hard shadow", effect: "Scene Charge ↑", basis: "diffuse sky removes specular rivalry; scale pattern fully legible", confidence: "high" },
      { cue: "driftwood log parallel to the catch axis", effect: "Visual Impact ↑", basis: "rhyming horizontals reinforce the dispatch geometry", confidence: "high" },
      { cue: "snow-streaked ridgeline seals the upper register", effect: "Frame ↑", basis: "mountain band compresses the depth stack", confidence: "medium" },
      { cue: "gravel-grass shore texture at the frame base", effect: "Lore ↑", basis: "field-document grounding, not a constructed backdrop", confidence: "medium" },
    ],
  },
  "loose-run": {
    route: "ANIMAL_COMPANION",
    scanStatus: "accepted",
    confidence: { overall: 0.87, band: "high" },
    archetypeClass: "The Encounter",
    warnings: ["EXIF rotation present — coordinates authored for the upright portrait view", "Secondary figure compressed behind the foreground mass — mid-ground read is partial"],
    receipts: [
      { cue: "foreground mass breaks the plane at close focal distance", effect: "Signal ↑", basis: "mass owns the central third; background reduced to a band", confidence: "high" },
      { cue: "gravel path wedge from the lower-left corner", effect: "Frame ↑", basis: "path narrows to a vanishing point behind the crouch", confidence: "high" },
      { cue: "lens-direct stride axis, limbs at peak extension", effect: "Scene Charge ↑", basis: "body perpendicular to the picture plane — approach, not passing", confidence: "high" },
      { cue: "overcast plate, no directional shadow", effect: "Visual Impact ↑", basis: "coat texture in full tonal range without specular blow-out", confidence: "high" },
      { cue: "power line horizontal in the upper frame", effect: "Frame ↑", basis: "counter-tension to the path diagonal", confidence: "medium" },
    ],
  },
  "tank-pick": {
    route: "HUMAN_SOLO",
    scanStatus: "accepted",
    confidence: { overall: 0.87, band: "high" },
    archetypeClass: "The Encounter",
    warnings: ["EXIF rotation present — coordinates authored for the upright portrait view", "Hard top fluorescent compresses mid-ground shadow detail"],
    receipts: [
      { cue: "full carapace centered on the vertical axis", effect: "Signal ↑", basis: "specimen mass owns the axial center", confidence: "high" },
      { cue: "cyan tank band in the lower third", effect: "Visual Impact ↑", basis: "saturated cool plane sharpens the warm shell read", confidence: "high" },
      { cue: "hard fluorescent top, no fill", effect: "Frame ↑", basis: "specular catch on the shell, under-shadow on the tank edge", confidence: "high" },
      { cue: "extended antennae into the upper-left", effect: "Lore ↑", basis: "form extends beyond the held mass, relieving symmetry", confidence: "medium" },
      { cue: "tropical mural as the background field", effect: "Scene Charge ↑", basis: "painted aquatic motifs echo the live-tank content", confidence: "medium" },
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
      freeVisible: { ...src.card.stats }, // Free four = Frame Presence / Frame / Signal / Visual Impact (charge is Halo-depth)
      haloExtended: {
        loreDensity: { value: src.lore.value, label: src.lore.label },
        fitCoherence: { value: fitAvg, label: fitAvg >= 80 ? "Locked" : "Aligned" },
        gestureAuthority,
        visualImpact: {
          value: src.impact.value,
          label: src.impact.label,
          derived: true,
          derivedFrom: ["presence", "frame", "signal"], // composition/signal feel; never rarity, never independently scored
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
        statsShown: ["presence", "frame", "signal", "visualImpact"],
        receiptsShown: x.receipts.slice(0, 3),
        reading: src.card.note,
        oracle: src.dossier.oracle.short,
        /* honest tease: show the card's OWN object address (the same family the
           developed card front shows) with only the mint tail reserved — develop
           reveals the same string's mint suffix (…-HM), not an unrelated serial */
        serial: `Reserved · ${src.card.serial}-··`,
      },
      halo: {
        statsShown: ["presence", "frame", "signal", "visualImpact", "charge", "loreDensity", "fitCoherence"],
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
