/* =============================================================
   ARCANA READING — THE COMPOSER

   Turns 12 drawn symbols into ONE reading. This is the layer whose
   absence made the page a glossary: before it, every row printed a codex
   `meaning` field — a definition OF THE SYMBOL, in the third person, with
   nothing connecting it to any other row.

   Rules it enforces (from the locked composition spec):
   - Codex text is SOURCE, never OUTPUT. No row prints a `meaning`.
   - Third-person-of-the-record, present indicative. No future tense,
     no hedges, no advice, no verdict on the person.
   - WEAVE, don't list: rows fuse two systems into one clause.
   - The internal resonance fields (`pair`, `note`) are debug data and
     must never reach the page.

   Exposes window.BRArcanaCompose.compose(readings, assembled) -> {rows, resonance, seal}
============================================================= */
(function () {
  "use strict";

  var AXIS_ACT = { initiate: "opening", join: "joining", express: "speech", build: "building",
    change: "turning", tend: "keeping", seek: "search", command: "command",
    release: "letting go", illuminate: "lighting", construct: "construction", serve: "service" };
  var FAMILY_NOUN = { outward: "the outward turn", relational: "the turn toward others",
    structural: "the turn toward structure", inward: "the inward turn" };

  function cap(s) { s = String(s || ""); return s.charAt(0).toUpperCase() + s.slice(1); }
  function stripThe(s) { return String(s || "").replace(/^the\s+/i, ""); }

  function compose(r, a) {
    var C = window.BRArcanaCopy, N = window.BRArcanaName, I = N._internals;
    var g = function (slot, key) { return C.get(slot, key) || { e: "", p: "", c: "" }; };

    var sun = g("sun", r.sun.name), ani = g("chinese", r.chinese.name),
        pth = g("lifePath", r.lifePath.name), maj = g("tarot", r.tarotMajor.name),
        cns = g("tarot", r.tarotCounsel.name), run = g("rune", r.rune.name),
        tri = g("trigram", r.trigram.name);

    var lex = C.lexiconFrom(r.rune, r.trigram);
    var tShort = C.trigramShort(r.trigram.name);
    var pathWord = C.PATH_WORD[String(r.lifePath.name).trim()] || ("a " + r.lifePath.name);
    var animal = stripThe(r.chinese.name);

    /* ---- the eleven rows. Each says one thing only it can say. ---- */
    var rows = [
      { label: "Origin", value: "The Ground First Stood On",
        line: tShort + " sets the ground first stood on: " + tri.c + ", with " + lex +
              " already in the ground before the first mark." },
      /* Each weave keeps its OWN symbol as the head noun and demotes the other
         to a modifier — otherwise the row labelled "Sun sign · Leo" ends up
         describing the Monkey. */
      { label: "Sun sign", value: r.sun.name,
        line: "A " + ani.e + " " + r.sun.name + ", " + sun.c + "." },
      { label: "Year animal", value: r.chinese.name,
        line: "The " + animal + ", " + pathWord + ", " + ani.c + "." },
      { label: "Life path", value: r.lifePath.name, line: pth.p },
      /* the Tarot/Life-Path fusion is already carried by resonance line B;
         forcing it here too produced "lands on ... landing on" collisions */
      { label: "Tarot", value: r.tarotMajor.name, line: maj.p },
      /* the counsel is read AGAINST the major, using the major's short clause
         so its full pivot is not printed twice on one page */
      { label: "Counsel", value: r.tarotCounsel.name,
        line: cns.p + " Set against " + maj.c + ". Both are on file, and neither is corrected." },
      { label: "Rune", value: r.rune.name, line: run.p },
      /* the trigram's PIVOT, not its clause — Origin already spends the clause */
      { label: "Trigram", value: r.trigram.name, line: tri.p },
      { label: "Path forward", value: "The Path Forward",
        line: r.rune.name + " states the standing condition: " + run.c +
              ", and no claim entered on the arrival." },
      { label: "Belt seal", value: "The Setting of Marks",
        line: "The marks are set in the order drawn — twelve systems, one " + lex +
              ", nothing re-rolled on re-view." },
      { label: "Archive lexicon", value: cap(lex),
        line: cap(lex) + ". Third entry and last — ground, seal, word. The file keeps the term." }
    ];

    /* ---- the three resonance lines. HOLD names the tension flatly and
       leaves it open; it is never softened into harmony. ---- */
    var sunEl = I.westernElement(r.sun.tag), chiEl = I.chineseElement(r.chinese.tag);
    var a5 = I.toFivePhase(sunEl);
    var res = [];

    var v0 = a.resonance[0].verdict;
    if (v0 === "CONFIRM" && a5 === chiEl) {
      res.push({ verdict: v0, line: r.sun.name + " and the " + animal + " draw the same " + a5 +
        ". One temperature, reported twice, and the file does not average them." });
    } else if (v0 === "CONFIRM") {
      var feedsFwd = I.GENERATES[a5] === chiEl;
      res.push({ verdict: v0, line: feedsFwd
        ? (r.sun.name + "'s " + a5 + " feeds the " + animal + "'s " + chiEl + " — " + sun.c + ", and the supply is not asked where it came from.")
        : ("The " + animal + "'s " + chiEl + " feeds " + r.sun.name + "'s " + a5 + " — " + ani.c + ", and the supply is not asked where it came from.") });
    } else if (v0 === "HOLD") {
      var checksFwd = I.CONTROLS[a5] === chiEl;
      res.push({ verdict: v0, line: checksFwd
        ? (r.sun.name + "'s " + a5 + " checks the " + animal + "'s " + chiEl + ". The " + animal + " does not yield the ground. The record keeps both marks and reconciles neither.")
        : ("The " + animal + "'s " + chiEl + " checks " + r.sun.name + "'s " + a5 + ". " + r.sun.name + " does not yield the ground. The record keeps both marks and reconciles neither.") });
    } else {
      res.push({ verdict: v0, line: r.sun.name + " and the " + animal +
        " report no shared temperature. The file notes the silence and does not fill it." });
    }

    var pAx = I.PATH_AXIS[String(r.lifePath.name).trim()], tAx = I.TAROT_AXIS[I.norm(r.tarotMajor.name)];
    var v1 = a.resonance[1].verdict;
    if (v1 === "CONFIRM" && pAx === tAx) {
      res.push({ verdict: v1, line: r.tarotMajor.name + " and " + pathWord + " both come down to " +
        (AXIS_ACT[pAx] || pAx) + "; the draw repeats itself, and the repetition is the finding." });
    } else if (v1 === "CONFIRM") {
      res.push({ verdict: v1, line: r.tarotMajor.name + "'s " + (AXIS_ACT[tAx] || tAx) + " and " +
        pathWord + "'s " + (AXIS_ACT[pAx] || pAx) + " face the same way — " +
        (FAMILY_NOUN[I.AXIS_FAMILY[pAx]] || "one turn") + ", taken twice without consultation." });
    } else if (v1 === "HOLD") {
      res.push({ verdict: v1, line: r.tarotMajor.name + "'s " + (AXIS_ACT[tAx] || tAx) +
        " pulls against " + pathWord + "'s " + (AXIS_ACT[pAx] || pAx) +
        ". Neither gives way, and the record does not choose between them." });
    } else {
      res.push({ verdict: v1, line: r.tarotMajor.name + " and " + pathWord +
        " share the file and share no verb — the record notes the distance and keeps both." });
    }

    var v2 = a.resonance[2].verdict;
    if (v2 === "CONFIRM") {
      res.push({ verdict: v2, line: r.rune.name + " and " + tShort + " press one direction — " +
        run.c + ", " + tri.c + ", and no brake between them in the file." });
    } else if (v2 === "HOLD") {
      res.push({ verdict: v2, line: r.rune.name + " pulls one way; " + tShort +
        " holds the other. Both are on file and neither is corrected." });
    } else {
      res.push({ verdict: v2, line: r.rune.name + " takes no side. " + tShort +
        " moves unopposed, and an unopposed direction is the whole of this line." });
    }

    /* ---- the finale: the name assembled from parts already met ---- */
    var derivation = (sunEl && chiEl)
      ? (r.sun.name + "'s " + sunEl + " through the " + animal + "'s " + chiEl + " gives " + a.epithet +
         ". " + r.tarotMajor.name + " gives " + a.role + ". " + a.name + ", filed " + a.binding + ".")
      : ("The elements did not read. " + a.epithet + " is taken from the gap. " + r.tarotMajor.name +
         " still gives " + a.role + ". " + a.name + ", filed " + a.binding + ".");

    var seal = "Twelve systems consulted. One name, " + lex + " three times, no appeal. BR-" +
      a.seed.toString(16).toUpperCase().slice(0, 6) + ".";

    return { rows: rows, resonance: res, derivation: derivation, seal: seal, lexicon: lex };
  }

  window.BRArcanaCompose = { compose: compose };
})();
