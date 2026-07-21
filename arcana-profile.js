/* =============================================================
   THE PROFILE / HUB (?dev=profile) — window.BRArcanaProfile

   The hub of the whole product. Two zones:
     ABOVE GROUND — a self-contained "surface world" box: the crown-monument,
       its bearer, and a gold Kingdom-Threshold horizon sealing its base.
     UNDERGROUND — the content sections, each an open L-bracket ledger panel
       (spine + gold top-rule + folder-tab heading), clearly contained.

   Static design surface — mock data, no backend, no payment. Commerce lives in
   the Arcana Room, not here: the hub is DOORS to every room (Main Menu, Arcana
   Room, Codex, Vault) + free "Open this reading" portals. No hub-side price,
   modal, or violet remains.

   Canon: near-black archive, Cormorant + IBM Plex Mono, four-register colour law
   (gold + warm-grey here; violet reserved for commerce, absent by design). The
   ONE exception: a red/purple liquid-flame HALO around the identity — a cosmetic
   avatar-frame flair layer (like a Steam frame), deliberately outside the content
   law. Exposes window.BRArcanaProfile.
============================================================= */
(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ---- MOCK seeker ---- */
  var SEEKER = {
    display_name: "Antton Aikio",
    handle: "@antton",
    avatar: "A",
    crown_record: {
      reading_id: "BR-3F9A2C",
      name: "The Twice-Kindled Founder",
      inputs_provided: ["name", "birth date", "birthplace"],
      result_count: 3, created_at: "2026-07-09", is_current: true
    },
    ring_crowns: [
      { relation: "mother", reading_id: "BR-77B1", result_count: 5, label: "The Deep-Rooted Keeper" },
      { relation: "brother", reading_id: "BR-22E0", result_count: 2, label: "The Quick-Kindled Scout" }
    ],
    vault_mints: [
      { kind: "reading", name: "The Twice-Kindled Founder", reading_id: "BR-3F9A2C" },
      { kind: "card", name: "Aries · the Ram", reading_id: "BR-3F9A2C" },
      { kind: "card", name: "Snake · Fire", reading_id: "BR-3F9A2C" }
    ],
    showcase: [
      { id: "crown", kind: "The Crown", title: "The Twice-Kindled Founder", desc: "The current reading, held at the head of the profile.", vis: "everyone" },
      { id: "ppcard", kind: "Profile card", title: "Aries · the Ram", desc: "A minted card set as the profile face.", vis: "friends" },
      { id: "card2", kind: "Vault card", title: "Snake · Fire", desc: "A favourite mint from the Vault.", vis: "none" }
    ],
    friends: [
      { name: "Ingrid", av: "I", crown: "The Deep-Tided Weaver", sees: "friends" },
      { name: "Mikkel", av: "M", crown: "no crown yet", sees: "everyone" }
    ]
  };

  var VISLABEL = { everyone: "Everyone", friends: "Friends", none: "No one" };
  var VIS = ["everyone", "friends", "none"];

  /* ---- glyphs ---- */
  var VSEAL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M12 2.5 L20 7 L20 17 L12 21.5 L4 17 L4 7 Z"/><circle cx="12" cy="11" r="2.1"/><path d="M12 13.1 L12 16.4"/></svg>';
  // Kingdom-Threshold crown-gate sigil (the hub's ground-gate + the reading portal seal)
  var GATE = '<svg viewBox="0 0 30 16" aria-hidden="true"><path d="M8 8 L8 4.6 L11 6.3 L15 3 L19 6.3 L22 4.6 L22 8" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/><path d="M4 11.6 Q15 8.8 26 11.6" fill="none" stroke="currentColor" stroke-width="1"/></svg>';
  var SHARE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><circle cx="6" cy="12" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="18" cy="18" r="2.4"/><path d="M8.2 10.9 L15.8 7.1 M8.2 13.1 L15.8 16.9"/></svg>';
  // hidden SVG filter — slowly churning turbulence: the liquid-nitrogen wisp on the burning frame line
  var HALO_DEFS = '<svg class="pf-defs" width="0" height="0" aria-hidden="true" focusable="false">' +
    '<filter id="pfLiquid" x="-60%" y="-60%" width="220%" height="220%">' +
    '<feTurbulence type="fractalNoise" baseFrequency="0.02 0.032" numOctaves="2" seed="7" result="n">' +
    '<animate attributeName="baseFrequency" dur="9s" values="0.02 0.032;0.032 0.046;0.02 0.032" repeatCount="indefinite"/></feTurbulence>' +
    '<feDisplacementMap in="SourceGraphic" in2="n" scale="11" xChannelSelector="R" yChannelSelector="G"/></filter></svg>';

  /* ---- parametric heraldic crown (PLACEHOLDER art); RUBIES = readings held ---- */
  function crownSVG(points, rubies, opts) {
    opts = opts || {};
    var W = 200, left = 22, right = 178, bandTop = 84, bandBot = 108, span = right - left;
    var n = Math.max(3, points), s = "", i;
    s += '<path d="M' + left + ' ' + bandBot + ' L' + right + ' ' + bandBot + '" stroke="currentColor" stroke-width="2.4" fill="none"/>';
    s += '<path d="M' + left + ' ' + bandTop + ' L' + right + ' ' + bandTop + '" stroke="currentColor" stroke-width="1" opacity=".5"/>';
    s += '<path d="M' + left + ' ' + bandTop + ' L' + left + ' ' + bandBot + ' M' + right + ' ' + bandTop + ' L' + right + ' ' + bandBot + '" stroke="currentColor" stroke-width="1.4"/>';
    var mid = (n - 1) / 2, path = "M" + left + " " + bandTop;
    for (i = 0; i < n; i++) {
      var xt = left + span * ((i + 0.5) / n), x1 = left + span * ((i + 1) / n);
      var dist = mid ? Math.abs(i - mid) / mid : 0, tipY = bandTop - (34 - dist * 11);
      path += " L" + xt.toFixed(1) + " " + tipY.toFixed(1) + " L" + x1.toFixed(1) + " " + bandTop;
    }
    s += '<path d="' + path + '" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>';
    for (i = 0; i < n; i++) {
      var xt2 = left + span * ((i + 0.5) / n), d2 = mid ? Math.abs(i - mid) / mid : 0, ty = bandTop - (34 - d2 * 11);
      s += '<circle cx="' + xt2.toFixed(1) + '" cy="' + (ty - 3).toFixed(1) + '" r="2.6" fill="currentColor"/>';
    }
    var R = Math.max(0, rubies), cy = ((bandTop + bandBot) / 2).toFixed(1);
    for (i = 0; i < R; i++) {
      var jx = left + span * ((i + 0.5) / Math.max(R, 1));
      s += '<circle cx="' + jx.toFixed(1) + '" cy="' + cy + '" r="3.4" fill="currentColor"/>';
    }
    return '<svg' + (opts.cls ? ' class="' + opts.cls + '"' : "") + ' viewBox="0 0 ' + W + ' 128" role="img" aria-label="' + esc(opts.aria || "Crown of " + rubies + " rubies") + '">' + s + '</svg>';
  }

  /* ---------- masthead (§3.1) — room doors, above the surface box ---------- */
  function headerHTML() {
    var doors = [["arcane", "The Arcana Room"], ["codex", "The Codex"], ["vault", "The Vault"]];
    return '<header class="pf-top">' +
      '<a class="pf-wordmark" href="#" data-door="menu" aria-label="Main Menu" title="Main Menu"><span class="pf-wordmark__mark" aria-hidden="true">&#9670;</span> Blue&nbsp;Room</a>' +
      '<nav class="pf-doors" aria-label="Wayfinding">' +
        doors.map(function (d) { return '<a class="pf-door" href="#" data-door="' + d[0] + '">' + esc(d[1]) + '</a>'; }).join("") +
      '</nav></header>';
  }

  /* ---------- ABOVE GROUND — the surface-world box ---------- */
  function horizonHTML() {
    return '<div class="pf-horizon" aria-hidden="true">' +
      '<span class="pf-horizon__line pf-horizon__line--l"></span>' +
      '<span class="pf-horizon__gate">' + GATE + '</span>' +
      '<span class="pf-horizon__line pf-horizon__line--r"></span></div>';
  }
  function surfaceHTML() {
    var c = SEEKER.crown_record, taken = c && c.result_count > 0;
    var points = 3 + (c ? c.inputs_provided.length : 0), rubies = c ? c.result_count : 0;
    var slot = taken
      ? '<div class="pf-crown-slot">' + crownSVG(points, rubies, { cls: "pf-crown-svg", aria: "Crown of " + rubies + " rubies" }) + '<div class="pf-crown-name">' + esc(c.name) + '</div></div>'
      : '<div class="pf-crown-slot"><div class="pf-crown-empty">No crown yet<br>a reading sets it</div></div>';
    var provbar = ""; if (taken) for (var i = 0; i < rubies; i++) provbar += '<i></i>';
    var prov = taken
      ? '<div class="pf-provbar" aria-hidden="true">' + provbar + '</div><p class="pf-prov">' + rubies + ' rubies — one conjured by each reading it holds.</p>'
      : '<p class="pf-prov">A crown is earned by taking a reading — it gains a ruby for each reading it holds.</p>';
    return '<section class="pf-surface">' +
      slot + prov +
      '<div class="pf-eyebrow">' + (taken ? "Crown borne by" : "No reading yet") + '</div>' +
      '<div class="pf-identity">' +
        '<span class="pf-halo" aria-hidden="true"></span>' +
        '<span class="pf-avatar" aria-hidden="true">' + esc(SEEKER.avatar) + '</span>' +
        '<span class="pf-identity__txt"><h1 class="pf-cname">' + esc(SEEKER.display_name) + '</h1>' +
        '<span class="pf-handle">' + esc(SEEKER.handle) + '</span></span>' +
      '</div>' +
      horizonHTML() +
      '</section>';
  }

  /* ---------- the reading portal (first thing underground) ---------- */
  function portalHTML() {
    var c = SEEKER.crown_record;
    if (!(c && c.result_count > 0)) return "";
    return '<div class="pf-portal">' +
      '<a class="pf-doorbar pf-doorbar--portal" href="#" data-open-reading="' + esc(c.reading_id) + '">' +
        '<span class="pf-doorbar__seal">' + GATE + '</span>' +
        '<span class="pf-doorbar__txt"><span class="pf-doorbar__t">Open this reading</span>' +
        '<span class="pf-doorbar__s">The current crown\'s reading — free, no purchase.</span></span>' +
        '<span class="pf-doorbar__arr" aria-hidden="true">&rarr;</span></a>' +
      '<a class="pf-redraw" href="#" data-draw="self" data-intent="redraw" data-crown="' + esc(c.name) + '">&#8635; Redraw with more marks</a>' +
    '</div>';
  }

  /* ---------- Rings — family + friend crowns (§3.4) ---------- */
  function ringsHTML() {
    var minis = SEEKER.ring_crowns.map(function (f) {
      return '<div class="pf-mini">' + crownSVG(4, f.result_count, { aria: f.label }) +
        '<div class="pf-mini__rel">' + esc(f.relation) + '</div>' +
        '<div class="pf-mini__label">' + esc(f.label) + '</div>' +
        '<div class="pf-mini__n">' + f.result_count + ' rubies</div>' +
        '<div class="pf-mini__acts">' +
          '<a class="pf-openreading pf-openreading--sm" href="#" data-open-reading="' + esc(f.reading_id) + '">Open reading</a>' +
          '<a class="pf-redraw pf-redraw--sm" href="#" data-draw="other" data-intent="redraw" data-crown="' + esc(f.label) + '" data-rel="' + esc(f.relation) + '">&#8635; Redraw</a>' +
        '</div></div>';
    }).join("");
    var add = '<button type="button" class="pf-mini pf-mini--add" data-draw="other"><span class="pf-mini__plus" aria-hidden="true">+</span><div class="pf-mini__label">Read for<br>someone</div><div class="pf-mini__n">to the input room &rarr;</div></button>';
    return section("Rings", null,
      "The circles of people around you — each a lesser crown, earned by a reading done for a family member or friend.",
      '<div class="pf-family">' + minis + add + '</div>');
  }

  function vaultHTML() {
    var cards = SEEKER.vault_mints.map(function (m) {
      return '<button type="button" class="pf-card" data-open-reading="' + esc(m.reading_id) + '">' +
        '<span class="pf-card__k">' + esc(m.kind) + '</span>' +
        '<span class="pf-card__n">' + esc(m.name) + '</span>' +
        '<span class="pf-card__seal">' + VSEAL + '</span></button>';
    }).join("");
    var door = '<a class="pf-doorbar" href="#" data-door="vault">' +
      '<span class="pf-doorbar__seal">' + VSEAL + '</span>' +
      '<span class="pf-doorbar__txt"><span class="pf-doorbar__t">The Vault</span>' +
      '<span class="pf-doorbar__s">Minted cards &amp; image mints · reopen their readings · QR access</span></span>' +
      '<span class="pf-doorbar__arr" aria-hidden="true">&rarr;</span></a>';
    return section("The Vault", null, "Your minted cards and image mints are filed here. Open one to revisit its reading, or open the Vault itself.",
      '<div class="pf-vault">' + door + '<div class="pf-cards">' + cards + '</div></div>');
  }

  function showcaseHTML() {
    var items = SEEKER.showcase.map(function (it) {
      var opts = VIS.map(function (v) {
        var on = it.vis === v;
        return '<button type="button" role="option" aria-selected="' + on + '" data-vis="' + it.id + '" data-visval="' + v + '">' + esc(VISLABEL[v]) + (on ? ' <span class="pf-vis__tick" aria-hidden="true">&#10003;</span>' : "") + '</button>';
      }).join("");
      return '<div class="pf-showitem">' +
        '<div class="pf-showitem__top"><span class="pf-showitem__kind">' + esc(it.kind) + '</span></div>' +
        '<div class="pf-showitem__t">' + esc(it.title) + '</div>' +
        '<div class="pf-showitem__d">' + esc(it.desc) + '</div>' +
        '<div class="pf-vis" data-visgroup="' + it.id + '">' +
          '<button type="button" class="pf-vis__toggle" data-vistoggle="' + it.id + '" aria-expanded="false" aria-haspopup="listbox">' +
            '<span class="pf-vis__eye" aria-hidden="true">&#9673;</span> Visible to <b data-vislabel="' + it.id + '">' + esc(VISLABEL[it.vis]) + '</b>' +
            '<span class="pf-vis__caret" aria-hidden="true">&#9662;</span></button>' +
          '<div class="pf-vis__menu" role="listbox" aria-label="Who can see this" hidden>' + opts + '</div>' +
        '</div></div>';
    }).join("");
    return section("Showcase", null, "Feature a card, a profile card, or your Crown. Each carries its own visibility — nothing is public beyond what you choose.",
      '<div class="pf-show">' + items + '</div>' +
      '<p class="pf-showhint">Privacy is per item, not one switch — open each to set Everyone, Friends, or No one.</p>');
  }

  function friendsHTML() {
    var rows = SEEKER.friends.map(function (f) {
      return '<a class="pf-friend" href="#" data-action="view-friend" data-name="' + esc(f.name) + '">' +
        '<span class="pf-friend__av">' + esc(f.av) + '</span>' +
        '<span class="pf-friend__n">' + esc(f.name) + '</span>' +
        '<span class="pf-friend__crown">' + esc(f.crown) + '</span>' +
        '<span class="pf-friend__vis">shows you: ' + esc(f.sees) + '</span></a>';
    }).join("");
    return section("Friends", null, "A quiet register of people — not a feed. Open a friend to see their profile and whatever their showcase permits.",
      '<div class="pf-friends">' + rows + '</div>' +
      '<button type="button" class="pf-addfriend" data-action="add-friend">+ Add a friend</button>');
  }

  // referral is a single door, not a section
  function referralHTML() {
    return '<a class="pf-doorbar pf-doorbar--referral" href="#" data-action="referral">' +
      '<span class="pf-doorbar__seal">' + SHARE + '</span>' +
      '<span class="pf-doorbar__txt"><span class="pf-doorbar__t">Share Blue Room</span>' +
      '<span class="pf-doorbar__s">A quiet door to the referral programme — its own surface, later.</span></span>' +
      '<span class="pf-doorbar__arr" aria-hidden="true">&rarr;</span></a>';
  }

  function section(title, note, lede, body) {
    return '<section class="pf-sec">' +
      '<h2 class="pf-sec__h">' + esc(title) + (note ? '<span class="pf-sec__note">' + esc(note) + '</span>' : "") + '</h2>' +
      (lede ? '<p class="pf-lede">' + esc(lede) + '</p>' : "") + body + '</section>';
  }

  function render() {
    return '<div class="pf">' + HALO_DEFS +
      headerHTML() +
      '<div class="pf-wrap">' +
        surfaceHTML() +
        portalHTML() +
        ringsHTML() +
        vaultHTML() +
        showcaseHTML() +
        friendsHTML() +
        referralHTML() +
        '<footer class="pf-foot">A reflective record, for insight, not instruction.<br>Nothing here is medical, legal, or financial counsel. You decide what to do with it.</footer>' +
      '</div>' +
    '</div>';
  }

  /* ---------- interactions ---------- */
  function inApp() { return /[?&]dev=/.test(location.search); }

  function wire(root) {
    function toInput(params, previewMsg) {
      if (inApp()) location.href = "?dev=arcane" + (params ? "&" + params : "");
      else note(root, previewMsg || "This would open the input room. (Inert in this standalone preview.)");
    }
    function openReading(id) {
      if (inApp()) location.href = "?dev=arcana-reading";
      else note(root, "Opens this reading (" + id + ") — free, no purchase. (Inert in this standalone preview.)");
    }
    function closeMenus(except) {
      root.querySelectorAll(".pf-vis__menu").forEach(function (m) {
        if (m === except) return;
        m.hidden = true;
        var t = m.parentNode.querySelector(".pf-vis__toggle"); if (t) t.setAttribute("aria-expanded", "false");
      });
    }

    root.addEventListener("click", function (ev) {
      var el = ev.target.closest("[data-door],[data-draw],[data-open-reading],[data-vistoggle],[data-vis],[data-action]");
      if (!el) { closeMenus(null); return; }

      if (el.hasAttribute("data-door")) {
        ev.preventDefault();
        var d = el.getAttribute("data-door");
        if (d === "menu") { if (inApp()) location.href = location.pathname; else note(root, "Returns to the main menu. (Inert in preview.)"); }
        else if (d === "codex") { if (inApp()) location.href = "codex.html"; else note(root, "Opens the Codex. (Inert in preview.)"); }
        else if (d === "arcane") toInput("", "Opens the Arcana Room. (Inert in preview.)");
        else if (d === "vault") { if (inApp()) location.href = "?dev=vault"; else note(root, "Opens the Vault. (Inert in preview.)"); }
        return;
      }

      if (el.hasAttribute("data-open-reading")) { ev.preventDefault(); openReading(el.getAttribute("data-open-reading")); return; }

      // every draw/redraw routes to the Arcana Room, carrying intent; commerce lives there
      if (el.hasAttribute("data-draw")) {
        ev.preventDefault();
        var who = el.getAttribute("data-draw"), intent = el.getAttribute("data-intent"), rel = el.getAttribute("data-rel");
        var params = "for=" + (who === "other" ? "other" : "self") + (intent ? "&intent=" + intent : "") + (rel ? "&subject=" + encodeURIComponent(rel) : "");
        var msg = intent === "redraw"
          ? "This would open the Arcana Room to add a richer reading — the redraw confirm and price live there. (Inert in preview.)"
          : (who === "other" ? "This would open the input room to read for someone. (Inert in preview.)"
                             : "This would open the input room to draw a new reading. (Inert in preview.)");
        toInput(params, msg);
        return;
      }

      if (el.hasAttribute("data-vistoggle")) {
        ev.preventDefault();
        var menu = el.parentNode.querySelector(".pf-vis__menu");
        var willOpen = menu.hidden;
        closeMenus(willOpen ? menu : null);
        menu.hidden = !willOpen;
        el.setAttribute("aria-expanded", String(willOpen));
        return;
      }
      if (el.hasAttribute("data-vis")) {
        ev.preventDefault();
        var id = el.getAttribute("data-vis"), val = el.getAttribute("data-visval");
        var item = SEEKER.showcase.filter(function (x) { return x.id === id; })[0];
        if (item) item.vis = val;
        var group = root.querySelector('[data-visgroup="' + id + '"]');
        group.querySelector('[data-vislabel="' + id + '"]').textContent = VISLABEL[val];
        group.querySelectorAll("[data-vis]").forEach(function (b) {
          var on = b === el;
          b.setAttribute("aria-selected", String(on));
          var tick = b.querySelector(".pf-vis__tick");
          if (on && !tick) b.insertAdjacentHTML("beforeend", ' <span class="pf-vis__tick" aria-hidden="true">✓</span>');
          if (!on && tick) tick.remove();
        });
        group.querySelector(".pf-vis__menu").hidden = true;
        group.querySelector(".pf-vis__toggle").setAttribute("aria-expanded", "false");
        return;
      }

      if (el.hasAttribute("data-action")) {
        ev.preventDefault();
        var a = el.getAttribute("data-action");
        var m = {
          "add-friend": "Add a friend by handle. (Mocked in this prototype.)",
          "view-friend": "Opening " + (el.getAttribute("data-name") || "a friend") + "'s profile — you would see only what their showcase permits. (Mocked.)",
          "referral": "The referral programme lives on its own surface, reserved here as a door. (Mocked.)"
        }[a];
        if (m) note(root, m);
        return;
      }
    });

    root.addEventListener("keydown", function (ev) { if (ev.key === "Escape") closeMenus(null); });
  }

  function note(root, text) {
    var n = root.querySelector("[data-note]");
    if (!n) {
      n = document.createElement("div");
      n.setAttribute("data-note", "");
      n.style.cssText = "position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:60;max-width:min(520px,90vw);" +
        "font-family:'IBM Plex Mono',monospace;font-size:11px;line-height:1.6;letter-spacing:.02em;color:#ece7dc;" +
        "background:rgba(14,13,11,.96);border:1px solid rgba(201,163,92,.28);border-radius:6px;padding:12px 16px;box-shadow:0 10px 30px rgba(0,0,0,.5)";
      root.appendChild(n);
    }
    n.textContent = text; n.style.opacity = "1";
    clearTimeout(note._t);
    note._t = setTimeout(function () { n.style.transition = "opacity .5s"; n.style.opacity = "0"; }, 4200);
  }

  window.BRArcanaProfile = {
    mount: function (host) {
      if (!host) return;
      host.innerHTML = render();
      wire(host);
    }
  };
})();
