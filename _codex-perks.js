/* ═══════════════════════════════════════════════════════════════════════════
   THE CODEX'S KEYWORDS, WIRED TO THE AUTHORED COLOUR BANK.

   The builder: "codex perks should have proper color bank linked."

   They were not linked to anything. codex.html paints every keyword with one
   flat `color: var(--t-meta)` (`.vx-kw .kw`) — while `arcana-build/kwcolor.json`
   has held an authored colour for each of them the whole time, and the Birth
   Reading has been rendering them in those colours since BR-S412.

   ★ SO THE SAME WORD HAD TWO APPEARANCES IN ONE PRODUCT: coloured by family in
   the reading, flat grey in the reference the reading is drawn FROM. The Codex
   is where a visitor goes to look a mark up; it is the one surface where the
   code ought to be most legible, and it was the only one not speaking it.

   THE BANK IS THE SOURCE. Nothing here decides a colour — it looks each keyword
   up, case-insensitively, and leaves anything the bank has no entry for exactly
   as it was. A word the bank does not know keeps the Codex's own ink rather than
   being given one I invented (the same rule as _six-live.js).
   ═══════════════════════════════════════════════════════════════════════════ */
(function (root) {
  "use strict";
  if (/[?&]kw=0/.test(String(root.location.search || ""))) return;

  var DEFAULT = "#9c9790";   /* the bank's own neutral — see the note below */
  var doc = root.document;

  function base() {
    try {
      var sc = doc.currentScript || doc.querySelector('script[src*="_codex-perks"]');
      if (sc) return String(sc.getAttribute("src") || "").replace(/_codex-perks\.js.*$/, "");
    } catch (e) {}
    return "";
  }

  function paint(map) {
    var nodes = doc.querySelectorAll(".vx-kw .kw, .kw");
    var hit = 0, miss = 0;
    Array.prototype.forEach.call(nodes, function (n) {
      if (n.dataset.kwPainted) return;
      var k = (n.textContent || "").trim().replace(/[,;·]+$/, "");
      if (!k) return;
      var c = map[k] || map[k.toLowerCase()];
      /* ★ THE BANK'S DEFAULT IS BYTE-IDENTICAL TO --t-meta (#9c9790), which is what
         these already are. Painting it would be a no-op that also marks the node as
         handled and hides how much of the vocabulary is genuinely unfamilied. So an
         unmapped word — or one that resolves to the default — is LEFT ALONE. */
      if (!c || c.toLowerCase() === DEFAULT) { miss++; return; }
      n.style.color = c;
      n.dataset.kwPainted = "1";
      hit++;
    });
    return { hit: hit, miss: miss, total: nodes.length };
  }

  var MAP = null;
  root.fetch(base() + "arcana-build/kwcolor.json")
    .then(function (r) { return r.json(); })
    .then(function (m) {
      MAP = m;
      paint(m);
      /* the Codex builds walls as you travel; re-paint what arrives, and never
         re-touch what is already done (the data-kwPainted guard above). */
      if (root.MutationObserver) {
        new root.MutationObserver(function () { if (MAP) paint(MAP); })
          .observe(doc.body, { childList: true, subtree: true });
      }
      root.CodexPerks = { repaint: function () { return paint(MAP); }, map: function () { return MAP; } };
    })
    .catch(function () {});
})(window);
