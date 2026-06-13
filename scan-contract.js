/* =============================================================
   BLUE ROOM — Scan Contract (pure, non-AI foundation)
   Implements docs/SCAN_ENGINE_CONTRACT.md.

   This is a SAFETY VALVE, not an engine. It:
     - validates a *future* uploaded-photo scan-result object against the
       uploaded-v1 contract,
     - blocks forbidden / sensitive / human-rating fields,
     - produces a safe "blocked" state shape on failure.

   It does NOT: touch the DOM · call any AI/API · read files · upload ·
   generate stats / receipts / readings / Halo output · mutate SOURCES or
   SCAN_RESULTS_V2. It is pure: same input → same output, no side effects.
============================================================= */
(function () {
  "use strict";

  var SCHEMA_VERSION = "uploaded-v1";
  var RENDERABLE_STATUS = "scan_complete_future";
  var SAFE_SOURCE_MODES = ["local_browser_draft"]; // future-safe modes may extend this

  var REQUIRED_SAFETY_FALSE = [
    "containsSensitiveInference",
    "containsHumanWorthScoring",
    "containsAttractivenessScoring",
    "containsBiologyRating",
  ];

  /* Terms that must never appear in a key (a key carrying one of these is
     a human-rating field). Checked only against keys NOT in the contract
     schema, so legitimate keys like value/label/archetypeClass and the
     safetyFlags themselves never false-trigger. */
  var FORBIDDEN_TERMS = [
    "attractiveness", "beauty", "hotness", "sexy", "race", "ethnicity",
    "gender", "age", "health", "diagnosis", "disorder", "personality",
    "iq", "class", "alpha", "beta", "value", "worth", "rank", "skull",
    "jaw", "canthal", "dimorphism", "biology", "genetic", "breed",
  ];

  /* Every legitimate key in the uploaded-v1 shape (lowercased). Any key
     OUTSIDE this set is treated as untrusted and scanned for forbidden
     terms — that is how a sneaked-in "attractivenessScore" / "ageGuess" /
     "humanWorth" gets caught while the real schema passes clean. */
  var SCHEMA_KEYS = new Set([
    "kind", "schemaversion", "source", "mode", "filelabel", "filetype",
    "filesize", "gate", "scanstatus", "route", "limitedreason", "status",
    "confidence", "overall", "band", "artifact", "title", "archetypeclass",
    "rarity", "editionlabel", "generatedat", "stats", "freevisible",
    "presence", "frame", "signal", "charge", "haloextended", "loredensity",
    "fitcoherence", "stanceread", "visualimpact", "derived", "derivedfrom",
    "gestureauthority", "present", "conditional", "value", "label",
    "evidenceboard", "lens", "observation", "visiblecue", "effect",
    "readings", "freesummary", "halodossier", "oracle", "mintrecord",
    "mintserial", "material", "treatmentfamily", "safetyflags",
    "containssensitiveinference", "containshumanworthscoring",
    "containsattractivenessscoring", "containsbiologyrating", "warnings",
  ]);

  /* Reading text that asserts truth about the *person* (vs. the image). */
  var PERSON_TRUTH = [
    /\byou are\b/i,
    /\byou're\b/i,
    /\bthis proves\b/i,
    /\bproves (that )?you\b/i,
    /\byour (personality|character|soul|worth|value|iq|future)\b/i,
  ];

  function isPlainObject(v) {
    return v && typeof v === "object" && !Array.isArray(v);
  }

  /* whole-word match — avoids "image" matching "age", "page" etc. */
  function wordHit(textLower, term) {
    return new RegExp("\\b" + term + "\\b").test(textLower);
  }

  function isUnderStats(path) {
    return path.indexOf("stats.") !== -1 || /(^|\.)stats($|\.|\[)/.test(path);
  }

  /* One walk over the whole object. Flags:
       - keyHits:   forbidden term in a key NOT in the schema (a sneaked-in
                    rating field, e.g. "attractivenessScore", "ageGuess").
       - valueHits: forbidden term (whole word) in ANY string value — this
                    covers every user-facing text field (labels,
                    archetypeClass, material, treatmentFamily, fileLabel,
                    title, readings, evidence …) so a weaponized value
                    can't slip past via an allowlisted key.
       - valueMisuse: a key literally named "value" that is not a numeric
                    stat under stats.* — "value" is the one term that is
                    both forbidden (human worth/value) and a legit schema
                    key, so it is enforced positionally instead. */
  function scanForbidden(root) {
    var keyHits = [], valueHits = [], valueMisuse = [];
    var seen = new Set();
    function add(arr, sig, payload) { if (!seen.has(sig)) { seen.add(sig); arr.push(payload); } }
    function walk(node, path) {
      if (Array.isArray(node)) {
        for (var i = 0; i < node.length; i++) walk(node[i], path + "[" + i + "]");
        return;
      }
      if (typeof node === "string") {
        var lower = node.toLowerCase();
        FORBIDDEN_TERMS.forEach(function (term) {
          if (wordHit(lower, term)) add(valueHits, "V:" + term + "@" + path, { term: term, path: path });
        });
        return;
      }
      if (!isPlainObject(node)) return;
      Object.keys(node).forEach(function (key) {
        var childPath = path ? path + "." + key : key;
        var keyLower = key.toLowerCase();
        if (!SCHEMA_KEYS.has(keyLower)) {
          FORBIDDEN_TERMS.forEach(function (term) {
            if (keyLower.indexOf(term) !== -1) add(keyHits, "K:" + term + "@" + childPath, { term: term, path: childPath });
          });
        } else if (keyLower === "value" && !(isUnderStats(childPath) && typeof node[key] === "number")) {
          add(valueMisuse, "M@" + childPath, childPath);
        }
        walk(node[key], childPath);
      });
    }
    walk(root, "");
    return { keyHits: keyHits, valueHits: valueHits, valueMisuse: valueMisuse };
  }

  /* ---------- the validator ---------- */

  function validateUploadedScanResult(result) {
    var errors = [];
    var warnings = [];

    if (!isPlainObject(result)) {
      return { ok: false, errors: ["result must be a plain object"], warnings: warnings };
    }

    // identity / schema
    if (result.kind === "sample_scan_result") {
      errors.push("kind is sample_scan_result — sample scans may never render as uploaded results");
    } else if (result.kind !== "uploaded_scan_result") {
      errors.push('kind must be "uploaded_scan_result" (got ' + JSON.stringify(result.kind) + ")");
    }
    if (result.schemaVersion !== SCHEMA_VERSION) {
      errors.push('schemaVersion must be "' + SCHEMA_VERSION + '" (got ' + JSON.stringify(result.schemaVersion) + ")");
    }

    // render eligibility
    if (result.status !== RENDERABLE_STATUS) {
      errors.push('status must be "' + RENDERABLE_STATUS + '" to be render-eligible (got ' + JSON.stringify(result.status) + ")");
    }

    // source mode + no sample mixing
    if (!isPlainObject(result.source)) {
      errors.push("source object is missing");
    } else {
      if (SAFE_SOURCE_MODES.indexOf(result.source.mode) === -1) {
        errors.push("source.mode must be one of [" + SAFE_SOURCE_MODES.join(", ") + "] (got " + JSON.stringify(result.source.mode) + ")");
      }
      var innerId = result.source.sourceId || result.source.id;
      if (innerId && /^SRC/i.test(String(innerId))) {
        errors.push("source must not reference a sample SOURCES id (got " + JSON.stringify(innerId) + ")");
      }
    }
    if (result.sourceId && /^SRC/i.test(String(result.sourceId))) {
      errors.push("uploaded result must not carry a sample sourceId — no mixing with SCAN_RESULTS_V2");
    }

    // safety flags — required and all false
    if (!isPlainObject(result.safetyFlags)) {
      errors.push("safetyFlags object is required");
    } else {
      REQUIRED_SAFETY_FALSE.forEach(function (k) {
        if (!(k in result.safetyFlags)) errors.push("safetyFlags." + k + " is required");
        else if (result.safetyFlags[k] !== false) errors.push("safetyFlags." + k + " must be false");
      });
    }

    // evidence board
    if (!Array.isArray(result.evidenceBoard)) {
      errors.push("evidenceBoard must be an array");
    } else {
      result.evidenceBoard.forEach(function (item, i) {
        if (!isPlainObject(item)) { errors.push("evidenceBoard[" + i + "] must be an object"); return; }
        ["lens", "observation", "visibleCue", "effect"].forEach(function (f) {
          if (typeof item[f] !== "string" || !item[f].trim()) {
            errors.push("evidenceBoard[" + i + "]." + f + " must be a non-empty string");
          }
        });
        if (["low", "medium", "high"].indexOf(item.confidence) === -1) {
          errors.push("evidenceBoard[" + i + "].confidence must be low|medium|high");
        }
      });
    }

    // forbidden terms anywhere — sneaked-in rating keys AND any string value
    var scan = scanForbidden(result);
    scan.keyHits.forEach(function (h) { errors.push('forbidden term "' + h.term + '" in key path: ' + h.path); });
    scan.valueHits.forEach(function (h) { errors.push('forbidden term "' + h.term + '" in text at ' + h.path); });
    scan.valueMisuse.forEach(function (p) {
      errors.push("human-worth 'value' key at " + p + " — 'value' is allowed only as a numeric stat under stats.*");
    });

    // person-truth claims in user-facing narrative (artifact.title + readings.*)
    var narrative = [];
    if (isPlainObject(result.artifact) && typeof result.artifact.title === "string") {
      narrative.push(["artifact.title", result.artifact.title]);
    }
    if (isPlainObject(result.readings)) {
      Object.keys(result.readings).forEach(function (k) {
        if (typeof result.readings[k] === "string") narrative.push(["readings." + k, result.readings[k]]);
      });
    }
    narrative.forEach(function (pair) {
      PERSON_TRUTH.forEach(function (pat) {
        if (pat.test(pair[1])) errors.push(pair[0] + " claims truth about the person — must read the image artifact");
      });
    });

    return { ok: errors.length === 0, errors: errors, warnings: warnings };
  }

  /* ---------- safe blocked / failure state (pure shape) ---------- */

  function createBlockedScanState(reason, errors) {
    var list = Array.isArray(errors) ? errors.slice() : (errors == null ? [] : [String(errors)]);
    return {
      kind: "blocked_scan_state",
      status: "scan_failed_future",
      title: "Scan blocked",
      message: "This result did not pass the BLUE ROOM scan contract.",
      reason: String(reason == null ? "contract_violation" : reason),
      errors: list,
    };
  }

  /* ---------- dev-only fixtures (never rendered as user analysis) ----------
     For console/test verification of the validator only. */
  var DEV_FIXTURES = {
    validMinimalFutureResult: {
      kind: "uploaded_scan_result",
      schemaVersion: "uploaded-v1",
      status: "scan_complete_future",
      source: { mode: "local_browser_draft", fileLabel: "Local image", fileType: "PNG", fileSize: "1.0 MB" },
      evidenceBoard: [
        { lens: "Frame", observation: "subject sits left of center against open space", visibleCue: "wide negative space on the right third", effect: "Frame +8", confidence: "high" },
      ],
      safetyFlags: {
        containsSensitiveInference: false,
        containsHumanWorthScoring: false,
        containsAttractivenessScoring: false,
        containsBiologyRating: false,
      },
      warnings: [],
    },

    invalidAttractivenessResult: {
      kind: "uploaded_scan_result",
      schemaVersion: "uploaded-v1",
      status: "scan_complete_future",
      source: { mode: "local_browser_draft" },
      beautyScore: 88, // forbidden key
      evidenceBoard: [
        { lens: "Face", observation: "facial symmetry reads high", visibleCue: "even thirds", effect: "Beauty +20", confidence: "high" },
      ],
      safetyFlags: {
        containsSensitiveInference: false,
        containsHumanWorthScoring: false,
        containsAttractivenessScoring: true, // must be false
        containsBiologyRating: false,
      },
      warnings: [],
    },

    invalidSensitiveInferenceResult: {
      kind: "uploaded_scan_result",
      schemaVersion: "uploaded-v1",
      status: "scan_complete_future",
      source: { mode: "local_browser_draft" },
      ageGuess: 34, // forbidden key
      evidenceBoard: [
        { lens: "Signal", observation: "casual jacket", visibleCue: "red layer", effect: "Signal +5", confidence: "medium" },
      ],
      readings: { freeSummary: "You are clearly an anxious introvert.", haloDossier: "", oracle: null }, // person-truth + personality
      safetyFlags: {
        containsSensitiveInference: true, // must be false
        containsHumanWorthScoring: false,
        containsAttractivenessScoring: false,
        containsBiologyRating: false,
      },
      warnings: [],
    },

    invalidSampleMixResult: {
      kind: "sample_scan_result", // sample kind
      schemaVersion: "v2", // sample schema misused
      status: "scan_complete_future",
      source: { mode: "local_browser_draft", sourceId: "SRC-01" }, // points into SOURCES
      sourceId: "SRC-01",
      evidenceBoard: [],
      safetyFlags: {
        containsSensitiveInference: false,
        containsHumanWorthScoring: false,
        containsAttractivenessScoring: false,
        containsBiologyRating: false,
      },
      warnings: [],
    },

    invalidMissingSafetyFlagsResult: {
      kind: "uploaded_scan_result",
      schemaVersion: "uploaded-v1",
      status: "scan_complete_future",
      source: { mode: "local_browser_draft" },
      evidenceBoard: [
        { lens: "Frame", observation: "centered subject", visibleCue: "tight crop", effect: "Frame +1", confidence: "low" },
      ],
      // safetyFlags intentionally omitted
      warnings: [],
    },

    /* Richer VALID fixture — exercises the dev renderer (stats, extended
       stats, readings, multiple receipts, mint record). Obviously a dev
       fixture; never used for a real user image. Passes the validator. */
    validDevRendererResult: {
      kind: "uploaded_scan_result",
      schemaVersion: "uploaded-v1",
      status: "scan_complete_future",
      source: { mode: "local_browser_draft", fileLabel: "dev-fixture.png", fileType: "PNG", fileSize: "0.8 MB" },
      gate: { scanStatus: "accepted", route: "HUMAN_SOLO", limitedReason: null },
      confidence: { overall: 0.7, band: "high" },
      artifact: { title: "DEV FIXTURE ARTIFACT", archetypeClass: "The Threshold", rarity: "free", editionLabel: "Dev Print", generatedAt: "2026-06-13T00:00:00Z" },
      stats: {
        freeVisible: { presence: 61, frame: 70, signal: 55, charge: 48 },
        haloExtended: {
          loreDensity: { value: 64, label: "Dense" },
          fitCoherence: { value: 72, label: "Aligned" },
          stanceRead: { value: 58, label: "Braced" },
          visualImpact: { value: 60, label: "Steady", derived: true, derivedFrom: ["charge", "presence", "frame", "rarity"] },
        },
      },
      evidenceBoard: [
        { lens: "Frame", observation: "subject sits left of center against open space", visibleCue: "wide negative space on the right third", effect: "Frame +8", confidence: "high" },
        { lens: "Signal", observation: "one strong colour layer over a muted setting", visibleCue: "red jacket against grey interior", effect: "Signal +5", confidence: "medium" },
        { lens: "Charge", observation: "contained, engine-off stillness", visibleCue: "relaxed posture, one hand raised flat", effect: "Charge +3", confidence: "medium" },
      ],
      readings: {
        freeSummary: "Development fixture — not a real scan. A quiet frame with strong distance control, used only to test the renderer.",
        haloDossier: "Development fixture dossier. The room reads composition, framing and signal; it does not read the subject.",
        oracle: "Development fixture oracle line — artifact language only, no real reading.",
      },
      mintRecord: { mintSerial: "BR-UP-DEV-0001", material: "Warm Glass Copper", treatmentFamily: "Halo Mint Dev" },
      safetyFlags: {
        containsSensitiveInference: false,
        containsHumanWorthScoring: false,
        containsAttractivenessScoring: false,
        containsBiologyRating: false,
      },
      warnings: [],
    },
  };

  var api = {
    validateUploadedScanResult: validateUploadedScanResult,
    createBlockedScanState: createBlockedScanState,
    SCHEMA_VERSION: SCHEMA_VERSION,
    RENDERABLE_STATUS: RENDERABLE_STATUS,
    FORBIDDEN_TERMS: FORBIDDEN_TERMS.slice(),
    DEV_FIXTURES: DEV_FIXTURES,
  };

  if (typeof window !== "undefined") window.BlueRoomScanContract = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})();
