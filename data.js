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
  { k: "Presence", v: "focal clarity + posture stability + scene ownership" },
  { k: "Frame", v: "composition balance + crop pressure + background control" },
  { k: "Signal", v: "gesture readability + eye-line clarity + styling distinctness" },
  { k: "Charge", v: "motion potential + contrast + emotional temperature" },
  { k: "Lore Density", v: "setting specificity + unresolved story + object cues" },
  { k: "Fit Coherence", v: "styling + setting + posture + gesture alignment" },
];

/* Customer-facing hierarchy (2026-06-12): Free Pull / Halo Mint.
   `mint` is an internal Lab state (keyboard M) — its silver material
   feeds Free Pull polish and the future final Halo material.
   Internal keys (free/mint/shiny) stay stable; only labels changed. */
const TREATMENTS = {
  free: { label: "Free Pull", rarity: "ARCHIVE PREVIEW", stamp: "FREE PULL", strip: "UNMINTED · ARCHIVE PREVIEW" },
  mint: { label: "Lab · Signature Mint", rarity: "LAB STATE", stamp: "LAB MINT", strip: "INTERNAL · NOT A TIER" },
  shiny: { label: "Halo Mint", rarity: "HALO MINT · DEVELOPED", stamp: "HALO MINT", strip: "FIRST PRINT · DEVELOPED" },
};

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
      "SUBJECT OFFSET LEFT · CABIN FRAME DOMINANT",
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
        { k: "Person", state: "Locked", v: 84 },
        { k: "Setting", state: "Aligned", v: 76 },
        { k: "Styling", state: "Anchored", v: 81 },
        { k: "Gesture", state: "Loud", v: 92 },
      ],
    },
    card: {
      title: "Checkpoint Wave",
      archetype: "Open-Window Operator",
      note: "The hand says stop, the face says welcome. The card never resolves it — and doesn't need to.",
      signature: "Filed from the driver's seat, engine off.",
      stats: { presence: 67, frame: 52, signal: 84, charge: 70 },
      serial: "BR-002-DRV-0001",
      batch: "Field Batch 01",
      edition: "First Print",
      minted: "2026.06.12",
    },
    reads: {
      presence:
        "Holds the frame from the driver's seat without leaning on it. The cap and the beard do quiet structural work.",
      frame:
        "Action-lens barrel and cabin clutter tax the composition. The fjord out the window rescues the right third.",
      signal:
        "Direct eye line plus a five-finger palm — the most legible gesture in the archive. Nothing here needs decoding.",
      charge:
        "Idle-engine energy. Warm, contained, ready to pull back onto the road the moment the shutter closes.",
    },
    aura: ["Unhurried", "Open-Palm", "Northbound"],
    sceneRole: "The pause the trip gets measured by.",
    stance:
      "One arm holding the wheel's territory, the other raised flat to the lens — half stop-sign, half salute. The posture of someone who decides when the journey resumes.",
    fit: "If the setting is formal, this card stays in the glovebox. On the road, it's the membership card.",
    impact: { value: 64, label: "Disarming" },
    lore: { value: 72, label: "Dense" },
    oracle: "You stop at the good views. That habit is worth more than the schedule it breaks.",
    receipts: [
      { k: "Lens profile", v: "Action-wide, corrected −40%" },
      { k: "Key light", v: "Overcast, rear-left" },
      { k: "Gesture", v: "Palm, 5-finger spread" },
      { k: "Subject lock", v: "0.83" },
      { k: "Cabin clutter index", v: "Moderate" },
      { k: "Horizon", v: "Occluded (interior)" },
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
      "THREE FACE LAYERS WITHHELD: HOOD / BEANIE / GLASS",
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
        { k: "Person", state: "Locked", v: 78 },
        { k: "Setting", state: "Locked", v: 91 },
        { k: "Styling", state: "Muted", v: 64 },
        { k: "Gesture", state: "Working", v: 73 },
      ],
    },
    card: {
      title: "Two Feet of Quiet",
      archetype: "Frost Surveyor",
      note: "Crouched over a hole that isn't there yet. The confidence is in the kneel, not the catch.",
      signature: "Signed in snow, countersigned by the sun.",
      stats: { presence: 71, frame: 83, signal: 56, charge: 62 },
      serial: "BR-002-ICE-0002",
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
        "Hood, beanie, sunglasses: three layers of withheld face. The task speaks where the expression won't.",
      charge:
        "Slow-burn output. The energy is in the rotation of the auger, not in anything performed for the lens.",
    },
    aura: ["Methodical", "Sun-Struck", "Load-Bearing"],
    sceneRole: "Proof the lake was work, not wallpaper.",
    stance:
      "Crouched at full commitment, both gloves stacked on the brace, weight exactly where it should be. Nothing performed — the auger doesn't care, and neither does he.",
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
    ],
  },
];
