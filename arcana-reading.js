/* =============================================================
   THE ARCANA READING (?dev=arcana-reading) — the page the seeker reads.

   Twelve draws, each revealed with its REAL codex entry: name, the
   metadata line (dates / element / modality / ruler), keywords, and the
   full meaning — plus the reversed read where the entry carries one.
   The codex is the content; this file's job is to order and present it.

   Chapters follow the codex's own systems so the seeker always knows
   which tradition is speaking:
     I  · THE NAMED     — sun sign, year animal, life path
     II · THE COUNSEL   — tarot draw, counsel card, rune, trigram
     III· THE STANDING  — hexagram (if drawn), the marks, the lexicon

   ?seed= redraws the fixture set. Exposes window.BRArcanaReading.
============================================================= */
(function () {
  "use strict";

  var CODEX_URL = "codex-data.json";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  /* codex meanings are long; break them into paragraphs so the read breathes */
  function paras(text) {
    var t = String(text || "").trim();
    if (!t) return "";
    var sentences = t.split(/(?<=\.)\s+/);
    var out = [], buf = [];
    sentences.forEach(function (s, i) {
      buf.push(s);
      if (buf.join(" ").length > 260 || i === sentences.length - 1) { out.push(buf.join(" ")); buf = []; }
    });
    return out.map(function (p) { return '<p class="arc-read__body">' + esc(p) + "</p>"; }).join("");
  }

  var CROWN_SVG =
    '<svg viewBox="0 0 24 18" aria-hidden="true">' +
    '<path d="M2 16 L2.6 5 L8 9.5 L12 2 L16 9.5 L21.4 5 L22 16 Z" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linejoin="round"/>' +
    '<path d="M3.2 16 L20.8 16" stroke="currentColor" stroke-width="1.05"/></svg>';

  /* ---------- the draw ---------- */
  function draw(by, seed) {
    var P = window.BRArcanaName.pick;
    return [
      { chapter: "I · The Named",    slot: "Sun sign",     entry: P(by.sun, seed + "-sun") },
      { chapter: "I · The Named",    slot: "Year animal",  entry: P(by.chinese, seed + "-chi") },
      { chapter: "I · The Named",    slot: "Life path",    entry: P(by.lifePath, seed + "-lp") },
      { chapter: "II · The Counsel", slot: "The draw",     entry: P(by.tarotMajor, seed + "-tm") },
      { chapter: "II · The Counsel", slot: "Counsel card", entry: P(by.tarotMajor, seed + "-tc") },
      { chapter: "II · The Counsel", slot: "Rune",         entry: P(by.rune, seed + "-rn") },
      { chapter: "II · The Counsel", slot: "Trigram",      entry: P(by.trigram, seed + "-tg") },
      { chapter: "III · The Standing", slot: "Hexagram",   entry: P(by.hexagram, seed + "-hx") }
    ].filter(function (d) { return !!d.entry; });
  }

  function readHTML(d) {
    var e = d.entry;
    var keys = (e.keywords || []).map(esc).join('<span>·</span>');
    return '' +
      '<article class="arc-read" data-read>' +
        '<div class="arc-read__slot">' + esc(d.slot) + "</div>" +
        '<h2 class="arc-read__name">' + esc(e.name) + "</h2>" +
        (e.tag ? '<div class="arc-read__tag">' + esc(e.tag) + "</div>" : "") +
        (keys ? '<div class="arc-read__keys">' + keys + "</div>" : "") +
        paras(e.meaning) +
        (e.reversed ? '<div class="arc-read__rev"><b>Reversed</b>' + esc(e.reversed) + "</div>" : "") +
      "</article>";
  }

  function render(draws, crown) {
    var html = "", lastChapter = null;
    draws.forEach(function (d) {
      if (d.chapter !== lastChapter) {
        if (lastChapter !== null) html += "</section>";
        html += '<section class="arc-chapter"><div class="arc-chapter__head">' + esc(d.chapter) + "</div>";
        lastChapter = d.chapter;
      }
      html += readHTML(d);
    });
    if (lastChapter !== null) html += "</section>";

    return '' +
      '<div class="arc" data-arc>' +
        '<header class="arc-top">' +
          '<button type="button" data-view-to="menu">&larr; Archive</button>' +
          '<span class="arc-progress"><i data-progress></i></span>' +
          '<span>' + esc(draws.length) + ' readings</span>' +
        "</header>" +

        '<div class="arc-crown-head">' + CROWN_SVG +
          '<div class="arc-kicker">The name borne</div>' +
          '<h1 class="arc-name">' + esc(crown.name) + "</h1>" +
          '<p class="arc-sub">Twelve systems consulted. The record follows.</p>' +
        "</div>" +

        '<div class="arc-col">' + html +
          '<div class="arc-seal">' +
            "The marks are set in the order drawn<br>" +
            "Nothing is re-rolled on re-view<br>BR-" + crown.seed.toString(16).toUpperCase().slice(0, 6) +
          "</div>" +
        "</div>" +
      "</div>";
  }

  function wire(host) {
    var root = host.querySelector("[data-arc]");
    if (!root) return;
    var reads = [].slice.call(root.querySelectorAll("[data-read]"));
    var bar = root.querySelector("[data-progress]");

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
      reads.forEach(function (el) { io.observe(el); });
    } else {
      reads.forEach(function (el) { el.classList.add("is-in"); });
    }

    root.addEventListener("scroll", function () {
      if (!bar) return;
      var max = root.scrollHeight - root.clientHeight;
      bar.style.width = (max > 0 ? (root.scrollTop / max) * 100 : 0) + "%";
    }, { passive: true });
  }

  function mount(host) {
    if (!window.BRArcanaName) {
      host.innerHTML = '<p style="padding:48px;color:#948f87;text-align:center">Name engine missing.</p>';
      return;
    }
    fetch(CODEX_URL).then(function (res) { return res.json(); }).then(function (codex) {
      var by = window.BRArcanaName.indexCodex(codex);
      var seed = new URLSearchParams(location.search).get("seed") || "br-01";
      var draws = draw(by, seed);
      var P = window.BRArcanaName.pick;
      var crown = window.BRArcanaName.assemble({
        sun: P(by.sun, seed + "-sun"), chinese: P(by.chinese, seed + "-chi"),
        lifePath: P(by.lifePath, seed + "-lp"), tarotMajor: P(by.tarotMajor, seed + "-tm"),
        tarotCounsel: P(by.tarotMajor, seed + "-tc"), rune: P(by.rune, seed + "-rn"),
        trigram: P(by.trigram, seed + "-tg")
      });
      host.innerHTML = render(draws, crown);
      wire(host);
    }).catch(function (e) {
      host.innerHTML = '<p style="padding:48px;color:#948f87;text-align:center">The reading failed to load (' + esc(e) + ').</p>';
    });
  }

  window.BRArcanaReading = { mount: mount };
})();
