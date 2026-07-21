/* =============================================================
   ARCANA NAME ENGINE — "The Name Borne"

   Assembles the crown's name from the 12 readings, and returns the
   DERIVATION TRAIL that lets the finale show the reader *why this name*
   from parts they already met. Without that trail the crown's reveal is
   a dimmer switch, not an inference.

   Grounded in the real corpus: every element/polarity fact is parsed out
   of codex-data.json `tag` fields (Western "· Fire ·", Chinese "Fixed
   element: Water", trigram "· yang ·"), and the threaded lexicon word is
   a real codex keyword — never invented here. Only the *naming* fragment
   banks below are authored (roles, epithets, bindings), because generated
   name-words read as mad-libs and one stiff phrase collapses the voice.

   DETERMINISTIC + IMMUTABLE by canon: assemble() is a pure function of
   the reading set. Same readings in, same name out. No randomness, no
   re-roll on re-view.

   Exposes window.BRArcanaName.
============================================================= */
(function () {
  "use strict";

  /* ---------- authored fragment banks ---------- */

  /* ROLE ← Tarot Major. The strongest archetype in the set, so it names
     the actor. Keyed by the major's name minus a leading "The ". */
  var ROLE = {
    "fool": "Wanderer", "magician": "Maker", "high priestess": "Knower",
    "empress": "Cultivator", "emperor": "Founder", "hierophant": "Ordainer",
    "lovers": "Chooser", "chariot": "Driver", "strength": "Tamer",
    "hermit": "Lampbearer", "wheel of fortune": "Turner", "justice": "Weigher",
    "hanged man": "Reverser", "death": "Ender", "temperance": "Temperer",
    "devil": "Binder", "tower": "Breaker", "star": "Beacon",
    /* "sun" is deliberately NOT "Kindler": three epithets already end in
       -Kindled (fire|wood, fire|fire, air|fire), which would emit names like
       "The Kindling-Fed Kindler". */
    "moon": "Dreamer", "sun": "Daybringer", "judgement": "Summoner",
    "judgment": "Summoner", "world": "Completer"
  };

  /* EPITHET ← (Western element × Chinese fixed element). 4 × 5 = 20.
     Western Air is read onto the five-element frame as Wood (both are the
     expansive, moving phase) — a deliberate mapping, flagged in the
     derivation so it is never silently assumed. */
  var EPITHET = {
    "fire|wood": "Kindling-Fed", "fire|fire": "Twice-Kindled", "fire|earth": "Ember-Banked",
    "fire|metal": "Forge-Hot", "fire|water": "Steam-Tempered",
    "earth|wood": "Root-Bound", "earth|fire": "Slow-Burning", "earth|earth": "Unmoved",
    "earth|metal": "Ore-Veined", "earth|water": "Deep-Rooted",
    "air|wood": "Branch-Borne", "air|fire": "Quick-Kindled", "air|earth": "Ballasted",
    "air|metal": "Keen-Edged", "air|water": "Mist-Minded",
    "water|wood": "Sap-Risen", "water|fire": "Quenched", "water|earth": "Silt-Bearing",
    "water|metal": "Cold-Forged", "water|water": "Twice-Tided"
  };

  /* BINDING ← Trigram. The closing clause; where the name stands. */
  var BINDING = {
    "qian": "under an unresting sky", "kun": "on ground that receives",
    "zhen": "at the first shock", "xun": "by patient penetration",
    "kan": "through the defile", "li": "in clinging light",
    "gen": "at the stopping place", "dui": "in open water"
  };

  /* ARCHETYPE AXIS — the shared verb-space both numerology and tarot are
     read onto, so the archetypal resonance check compares like with like. */
  var PATH_AXIS = {
    "1": "initiate", "2": "join", "3": "express", "4": "build", "5": "change",
    "6": "tend", "7": "seek", "8": "command", "9": "release",
    "11": "illuminate", "22": "construct", "33": "serve"
  };
  var TAROT_AXIS = {
    "fool": "change", "magician": "initiate", "high priestess": "seek",
    "empress": "tend", "emperor": "command", "hierophant": "serve",
    "lovers": "join", "chariot": "command", "strength": "tend",
    "hermit": "seek", "wheel of fortune": "change", "justice": "build",
    "hanged man": "release", "death": "release", "temperance": "join",
    "devil": "build", "tower": "change", "star": "illuminate",
    "moon": "seek", "sun": "express", "judgement": "illuminate",
    "judgment": "illuminate", "world": "construct"
  };
  var AXIS_FAMILY = {
    initiate: "outward", express: "outward", change: "outward", illuminate: "outward",
    join: "relational", tend: "relational", serve: "relational", release: "relational",
    build: "structural", construct: "structural", command: "structural",
    seek: "inward"
  };

  /* RUNE POLARITY — authored; the Elder Futhark carries no polarity field
     in the corpus, so the directional resonance needs this one map. */
  var RUNE_POLARITY = {
    fehu: "yang", uruz: "yang", thurisaz: "yang", ansuz: "yang", raidho: "yang",
    kenaz: "yang", gebo: "neutral", wunjo: "yin", hagalaz: "yang", nauthiz: "yin",
    isa: "yin", jera: "neutral", eihwaz: "yin", perthro: "yin", algiz: "yang",
    sowilo: "yang", tiwaz: "yang", berkano: "yin", ehwaz: "neutral", mannaz: "neutral",
    laguz: "yin", ingwaz: "yin", dagaz: "yang", othala: "yin"
  };

  /* five-phase generative + controlling cycles, for the elemental check */
  var GENERATES = { wood: "fire", fire: "earth", earth: "metal", metal: "water", water: "wood" };
  var CONTROLS = { wood: "earth", earth: "water", water: "fire", fire: "metal", metal: "wood" };

  /* ---------- helpers ---------- */

  function norm(s) {
    return String(s == null ? "" : s).toLowerCase()
      .replace(/[̀-ͯ]/g, "")
      .replace(/^the\s+/, "")
      .replace(/[^a-z0-9 ]/g, "")
      .trim();
  }
  /* strip diacritics so "Qián" -> "qian", "Kūn" -> "kun" */
  function deaccent(s) {
    return String(s == null ? "" : s).normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  /* Western element out of a sun-sign tag: "♈ · Mar 21–Apr 19 · Fire · Cardinal · Mars" */
  function westernElement(tag) {
    var m = /\b(fire|earth|air|water)\b/i.exec(String(tag || ""));
    return m ? m[1].toLowerCase() : null;
  }
  /* Chinese fixed element: "... · Fixed element: Water" */
  function chineseElement(tag) {
    var m = /fixed element:\s*([a-z]+)/i.exec(String(tag || ""));
    if (m) return m[1].toLowerCase();
    var f = /\b(wood|fire|earth|metal|water)\b/i.exec(String(tag || ""));
    return f ? f[1].toLowerCase() : null;
  }
  /* Trigram polarity: "The Creative · yang · the father · attribute: strong" */
  function trigramPolarity(tag) {
    var m = /\b(yang|yin)\b/i.exec(String(tag || ""));
    return m ? m[1].toLowerCase() : null;
  }
  /* latin key out of "☰ Qián · Heaven" -> "qian" */
  function trigramKey(name) {
    var latin = deaccent(String(name || "")).replace(/[^A-Za-z ·]/g, " ");
    var m = /([A-Za-z]{2,})/.exec(latin);
    return m ? m[1].toLowerCase() : null;
  }
  /* Western element read onto the five-phase frame (Air -> Wood) */
  function toFivePhase(el) { return el === "air" ? "wood" : el; }

  /* deterministic 32-bit string hash — used ONLY for stable tie-breaks,
     never to vary output between views of the same reading */
  function hash(str) {
    var h = 2166136261, i;
    for (i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = (h * 16777619) >>> 0; }
    return h >>> 0;
  }

  /* ---------- resonance: three fixed pairs, CONFIRM / HOLD / QUIET ---------- */

  function elementalResonance(sunEl, chiEl) {
    if (!sunEl || !chiEl) return { verdict: "QUIET", note: "element not readable from source" };
    var a = toFivePhase(sunEl), b = chiEl;
    var mapped = sunEl === "air" ? " (Air read as Wood)" : "";
    if (a === b) return { verdict: "CONFIRM", note: "same phase — " + a + mapped };
    if (GENERATES[a] === b || GENERATES[b] === a) return { verdict: "CONFIRM", note: a + " and " + b + " feed one another" + mapped };
    if (CONTROLS[a] === b || CONTROLS[b] === a) return { verdict: "HOLD", note: a + " and " + b + " check one another" + mapped };
    return { verdict: "QUIET", note: "no strong elemental signal" };
  }

  function archetypalResonance(pathName, tarotName) {
    var pAxis = PATH_AXIS[String(pathName).trim()];
    var tAxis = TAROT_AXIS[norm(tarotName)];
    if (!pAxis || !tAxis) return { verdict: "QUIET", note: "archetype not mapped" };
    if (pAxis === tAxis) return { verdict: "CONFIRM", note: "both read as " + pAxis };
    var pf = AXIS_FAMILY[pAxis], tf = AXIS_FAMILY[tAxis];
    if (pf === tf) return { verdict: "CONFIRM", note: pAxis + " and " + tAxis + " share the " + pf + " turn" };
    var opposed = (pf === "outward" && tf === "relational") || (pf === "relational" && tf === "outward") ||
                  (pf === "structural" && tAxis === "release") || (tf === "structural" && pAxis === "release");
    if (opposed) return { verdict: "HOLD", note: pAxis + " pulls against " + tAxis };
    return { verdict: "QUIET", note: "no strong archetypal signal" };
  }

  function directionalResonance(runeName, trigramTag) {
    var rp = RUNE_POLARITY[norm(runeName)];
    var tp = trigramPolarity(trigramTag);
    if (!rp || !tp || rp === "neutral") return { verdict: "QUIET", note: "no strong directional signal" };
    if (rp === tp) return { verdict: "CONFIRM", note: "both " + rp };
    return { verdict: "HOLD", note: rp + " against " + tp };
  }

  /* ---------- assembly ---------- */

  /**
   * @param {Object} r  the drawn readings, each {name, tag, keywords, meaning}
   *   { sun, chinese, lifePath, tarotMajor, tarotCounsel, rune, trigram }
   * @returns {Object} { name, epithet, role, binding, subtitle, lexicon,
   *                     derivation:[{part, value, from:[{system,symbol}]}],
   *                     resonance:[{pair,verdict,note}], tension }
   */
  function assemble(r) {
    if (!r || !r.sun || !r.chinese || !r.lifePath || !r.tarotMajor || !r.rune || !r.trigram) {
      throw new Error("BRArcanaName.assemble: need sun, chinese, lifePath, tarotMajor, rune, trigram");
    }

    var sunEl = westernElement(r.sun.tag);
    var chiEl = chineseElement(r.chinese.tag);
    var tKey = trigramKey(r.trigram.name);

    /* the two name parts + the closing clause */
    var epithet = EPITHET[(sunEl || "earth") + "|" + (chiEl || "earth")] || "Twice-Marked";
    var role = ROLE[norm(r.tarotMajor.name)] || "Bearer";
    var binding = BINDING[tKey] || "in the open";

    var name = "The " + epithet + " " + role;

    /* the threaded lexicon word is a REAL codex keyword, not authored here */
    var lexicon = (r.rune.keywords && r.rune.keywords[0]) ||
                  (r.trigram.keywords && r.trigram.keywords[0]) || "return";
    lexicon = String(lexicon).toLowerCase().split(/[\s/]+/)[0];

    /* derivation trail — what the finale shows the reader */
    var derivation = [
      { part: "epithet", value: epithet, from: [
        { system: "Sun sign", symbol: r.sun.name, fact: sunEl ? sunEl + " element" : "element unread" },
        { system: "Year animal", symbol: r.chinese.name, fact: chiEl ? chiEl + " element" : "element unread" }
      ] },
      { part: "role", value: role, from: [
        { system: "Tarot", symbol: r.tarotMajor.name, fact: "major arcana archetype" }
      ] },
      { part: "binding", value: binding, from: [
        { system: "Trigram", symbol: r.trigram.name, fact: trigramPolarity(r.trigram.tag) || "trigram" }
      ] },
      { part: "lexicon", value: lexicon, from: [
        { system: "Rune", symbol: r.rune.name, fact: "first keyword" }
      ] }
    ];

    /* three fixed resonance pairs */
    var resonance = [
      Object.assign({ pair: "Sun element vs Year element" }, elementalResonance(sunEl, chiEl)),
      Object.assign({ pair: "Life Path vs Tarot archetype" }, archetypalResonance(r.lifePath.name, r.tarotMajor.name)),
      Object.assign({ pair: "Rune axis vs Trigram polarity" }, directionalResonance(r.rune.name, r.trigram.tag))
    ];

    /* the CONVERGE beat is OPTIONAL — it fires only on genuine tension and
       degrades to a quiet resonance beat otherwise. Never manufacture harmony. */
    var holds = resonance.filter(function (x) { return x.verdict === "HOLD"; });
    var confirms = resonance.filter(function (x) { return x.verdict === "CONFIRM"; });
    var tension = holds.length
      ? { present: true, line: holds[0].pair + " — " + holds[0].note, source: holds[0] }
      : { present: false, line: null, source: confirms[0] || resonance[0] };

    var subtitle = "Filed " + binding + ".";

    return {
      name: name, epithet: epithet, role: role, binding: binding,
      subtitle: subtitle, lexicon: lexicon,
      derivation: derivation, resonance: resonance, tension: tension,
      /* stable id for the immutable snapshot (never used to vary output) */
      seed: hash([r.sun.name, r.chinese.name, r.lifePath.name, r.tarotMajor.name, r.rune.name, r.trigram.name].join("|"))
    };
  }

  /* ---------- corpus helpers (browser) ---------- */

  function indexCodex(codex) {
    var by = {};
    (codex || []).forEach(function (sys) {
      var k = String(sys.system || "").toLowerCase();
      var slot = /western|sun sign/.test(k) ? "sun"
        : /chinese/.test(k) ? "chinese"
        : /numerolog/.test(k) ? "lifePath"
        : /tarot/.test(k) ? "tarotMajor"
        : /rune|futhark/.test(k) ? "rune"
        : /trigram/.test(k) ? "trigram"
        : /i ching/.test(k) ? "hexagram"
        : /lexicon/.test(k) ? "lexicon" : null;
      if (slot) by[slot] = sys.entries || [];
    });
    /* The Chinese system ships 12 animals PLUS 5 standalone element entries
       ("Wood", "Fire", …). Only the animals carry "Fixed element:" in their
       tag, and only the animals are drawable as a year sign — split them so
       an element entry can never be mistaken for one. */
    if (by.chinese) {
      var animals = by.chinese.filter(function (e) { return /fixed element:/i.test(String(e.tag || "")); });
      by.chineseElements = by.chinese.filter(function (e) { return !/fixed element:/i.test(String(e.tag || "")); });
      if (animals.length) by.chinese = animals;
    }
    return by;
  }

  /* deterministic pick — for fixtures/harness only, never for a real reading */
  function pick(list, seedStr) {
    if (!list || !list.length) return null;
    return list[hash(seedStr) % list.length];
  }

  window.BRArcanaName = {
    assemble: assemble,
    indexCodex: indexCodex,
    pick: pick,
    _internals: { westernElement: westernElement, chineseElement: chineseElement,
                  trigramPolarity: trigramPolarity, trigramKey: trigramKey, norm: norm, hash: hash,
                  PATH_AXIS: PATH_AXIS, TAROT_AXIS: TAROT_AXIS, AXIS_FAMILY: AXIS_FAMILY,
                  GENERATES: GENERATES, CONTROLS: CONTROLS, toFivePhase: toFivePhase,
                  RUNE_POLARITY: RUNE_POLARITY }
  };
})();
