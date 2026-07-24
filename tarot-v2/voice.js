/* voice.js — self-contained Blue Room tarot VOICE slice.
   The 22 Major-Arcana entries copied verbatim from the live arcana-reading-copy.js
   (window.BRArcanaCopy BANK.tarot). Keeps tarot_v2 with zero path dependency on the
   live repo. Optional at runtime — the engine fails open to codex text if this is absent.
   `p` = the pivot sentence (UPRIGHT only; there is no reversed variant). */
(function (w) {
  "use strict";
  function norm(s) { return String(s == null ? "" : s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(); }

  var BANK = {
    tarot: {
      "The Fool":          { e: "cliff-bound",       p: "The Fool steps toward the cliff's edge without pausing to check the drop first.",                    c: "stepping toward the edge, the drop unchecked" },
      "The Magician":      { e: "table-quick",       p: "The Magician lays four tools on the table and closes his hand around one.",                          c: "closing one hand around the only tool taken" },
      "The High Priestess":{ e: "veil-kept",         p: "The High Priestess guards the second pillar's secret and translates none of it.",                    c: "guarding a pillar's secret without translation" },
      "The Empress":       { e: "garden-thick",      p: "The Empress lets the garden outgrow the throne, and the vines keep climbing.",                       c: "with vines climbing past the throne, unpruned" },
      "The Emperor":       { e: "stone-seated",      p: "The Emperor draws the boundary in stone and does not redraw it for weather.",                        c: "drawing the boundary again in stone" },
      "The Hierophant":    { e: "rite-bound",        p: "The Hierophant repeats the rite exactly as handed down — no line improvised.",                       c: "repeating the rite with no line improvised" },
      "The Lovers":        { e: "angel-witnessed",   p: "The Lovers stand under the angel; the choice stays unmade between them.",                            c: "standing under the angel, the choice unmade" },
      "The Chariot":       { e: "sphinx-yoked",      p: "The Chariot drives two opposed beasts forward without asking either one to agree.",                  c: "yoking two opposed beasts toward one point" },
      "Strength":          { e: "lion-gentling",     p: "Strength opens the lion's jaw with a bare hand and closes it just as gently.",                       c: "closing the lion's jaw with an open hand" },
      "The Hermit":        { e: "lamp-alone",        p: "The Hermit climbs past the last house and lights the lamp — for no one else.",                       c: "lighting the lamp past the last house" },
      "Wheel of Fortune":  { e: "spoke-turning",     p: "The Wheel turns past its highest spoke and does not pause to explain the drop.",                     c: "turning past the highest spoke, unexplained" },
      "Justice":           { e: "scale-set",         p: "Justice sets the sword down only once the scale has settled flat.",                                  c: "setting the sword down once the scale settles" },
      "The Hanged Man":    { e: "foot-hung",         p: "The Hanged Man hangs by one foot and reads the room from upside down.",                              c: "hanging by one foot, the room inverted" },
      "Death":             { e: "chapter-closing",   p: "Death closes the chapter without turning ahead to read the next one.",                               c: "closing the chapter with the next page unread" },
      "Temperance":        { e: "cup-pouring",       p: "Temperance pours steadily between two cups at once and spills from neither.",                        c: "pouring between two cups without spilling either" },
      "The Devil":         { e: "loose-chained",     p: "The Devil leaves the chain loose enough to lift; no one lifts it.",                                  c: "leaving the chain loose enough to lift off" },
      "The Tower":         { e: "foundation-struck", p: "The Tower drops the roof before the walls and files the wreckage as evidence.",                      c: "landing on what was already built" },
      "The Star":          { e: "storm-after",       p: "The Star pours water under a dark sky it did not clear itself.",                                     c: "pouring water under a sky it did not clear" },
      "The Moon":          { e: "wolf-lit",          p: "The Moon lights the path between two towers and clarifies nothing about the wolf beside it.",        c: "lighting a path between two towers, wolf-guarded" },
      "The Sun":           { e: "shadowless",        p: "The Sun rides bareback past the wall, casting no shadow the whole way.",                             c: "riding bareback past the wall, shadowless" },
      "Judgement":         { e: "grave-risen",       p: "Judgement sounds the trumpet once and leaves the grave to answer for itself.",                       c: "sounding the trumpet once, the grave left standing" },
      "The World":         { e: "circle-closed",     p: "The World closes the circle exactly where the count began — no lap added.",                          c: "closing the circle where the count began" }
    }
  };

  w.BRArcanaVoice = {
    BANK: BANK,
    // exact-match first, then a normalized fallback (case/punctuation-insensitive).
    get: function (slot, key) {
      var bank = BANK[slot];
      if (!bank) return null;
      if (bank[key]) return bank[key];
      var nk = norm(key);
      for (var k in bank) { if (bank.hasOwnProperty(k) && norm(k) === nk) return bank[k]; }
      return null;
    }
  };
})(window);
