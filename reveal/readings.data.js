/* =====================================================================
   BLUE ROOM — Staged Card Reveal · reading datasets (BR-S124)
   TWO self-contained readings of the SAME photo (SRC-01, Driver). They
   are SWAPPED, not augmented: developing replaces the whole object.
   Continuity anchors (photo, title, the four core meters) live on the
   real card via renderCard — these objects own only the readings.

   ALL COPY HERE IS PLACEHOLDER — the builder writes the final words.
   Law: reads the artifact (frame / gesture-as-performed / provenance),
   never the person. No worth / health / rank / identity / private mood.
   ===================================================================== */
(function () {
  window.BRReveal = window.BRReveal || {};

  // grey in free; the same four names recolor purple + ◆-charge in halo.
  // level = lit pips out of 5; tag = tier word (no 0–100 ever surfaces).
  var FREE_METERS = [
    { name: "FRAME PRESENCE", level: 3, tag: "Clean" },
    { name: "SIGNAL",         level: 3, tag: "Clean" },
    { name: "VISUAL IMPACT",  level: 2, tag: "Muted" },
    { name: "SCENE CHARGE",   level: 3, tag: "Strong" },
  ];
  var HALO_METERS = [
    { name: "FRAME PRESENCE", level: 4, tag: "Strong" },
    { name: "SIGNAL",         level: 5, tag: "Peak" },
    { name: "VISUAL IMPACT",  level: 4, tag: "Charged" },
    { name: "SCENE CHARGE",   level: 4, tag: "Charged" },
  ];

  window.BRReveal.readings = {
    /* ---- FREE: a complete but skinnier read ------------------------- */
    freeReading: {
      engine: "free",
      headline: "Stats & Readings",          // PLACEHOLDER
      leftInstrument: {
        label: "Frame Signature",
        kicker: "DERIVED · FREE",
        body: "A held salute, centred mass, the lens met square-on.",
        signatureClass: "Direct Address",
        reach: "Clean",
      },
      coreMeters: FREE_METERS,
      signalNote: {
        line: "The frame holds its subject square and unbroken.",
        filed: "FILED · FREE PULL",
      },
      rightPanel: {
        rows: [
          { label: "Surface", val: "Warm glass copper — sampled off the frame." },
          { label: "Scene Role", val: "The Dispatch — a record made at the threshold." },
        ],
      },
      // below-card slots, all reserved on the free read
      dossierState: "reserved",
      dossierSlots: [
        { name: "Archetype", body: "Reserved. Develops in a later pass." },
        { name: "Aura",      body: "Reserved. Develops in a later pass." },
        { name: "Mint Record", body: "Reserved. Develops in a later pass." },
        { name: "Oracle Read", body: "Reserved. Develops in a later pass." },
      ],
      closingBeat: "The free read is complete. No more, no less.",
    },

    /* ---- HALO: a separate, deeper read (mock — no real payment) ------ */
    haloReading: {
      engine: "halo",
      headline: "The Developed Record",       // PLACEHOLDER
      leftInstrument: {
        label: "Signal Mix",
        kicker: "DEVELOPED · HALO",
        body: "Proportion resolved — the frame's weight read as a mix.",
        signatureClass: "Composed Encounter",
        reach: "Charged",
        mix: [
          { k: "Subject", v: 58 },
          { k: "Field",   v: 27 },
          { k: "Light",   v: 15 },
        ],
      },
      coreMeters: HALO_METERS,
      signalNote: {
        line: "Developed: the salute reads as a sealed dispatch, filed and serialised.",
        filed: "MINTED · HALO · BR-0001",
      },
      rightPanel: {
        rows: [
          { label: "Surface", val: "Warm glass copper · 58% subject, 27% field, 15% light." },
          { label: "Scene Role", val: "The Dispatch — record made at the threshold, now filed." },
          { label: "Reach", val: "Charged — the frame carries past its own edge." },
        ],
      },
      dossierState: "developed",
      dossier: {
        surfaceRecord: "Palette sampled off the surface — copper dominant, a cold periwinkle break, an amber edge.",
        archetype: "The Dispatch — an encounter recorded at the moment of address.",
        aura: "Warm-glass copper, held steady; a cool prism cuts the warmth at the rim.",
        mintRecord: "Object BR-0001 · Edition 1 of 1 · filed to the archive, serial sealed.",
        oracleRead: "The salute is the whole message — sent, received, and kept.",
      },
      dossierSlots: [
        { name: "Surface Record", body: "Palette sampled off the surface — copper dominant, a cold break, an amber edge.", metric: "58 · 27 · 15" },
        { name: "Archetype", body: "The Dispatch — an encounter recorded at the moment of address." },
        { name: "Aura", body: "Warm-glass copper, held steady; a cool prism cuts the warmth at the rim." },
        { name: "Mint Record", body: "Object BR-0001 · Edition 1 of 1 — filed, serial sealed.", metric: "BR-0001" },
        { name: "Oracle Read", body: "The salute is the whole message — sent, received, and kept." },
      ],
      closingBeat: "The deeper room is open. The card was already complete.",
    },
  };

  // copy for the warning modal (PLACEHOLDER — builder writes final words)
  window.BRReveal.modalCopy = {
    kicker: "Step into the deeper room",
    body: "You are about to step into the paid version of Blue Room. The Free Card is already complete. You do not need more unless you want to see the deeper room.",
    confirm: "No — let me see",   // the quieter, deliberate choice -> Halo
    dismiss: "Alright",            // the easy default -> stay on the free read
  };
})();
