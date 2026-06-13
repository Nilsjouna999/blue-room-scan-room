/* =============================================================
   Scan Room — desktop three-column renderer.
   Left: source + frame analysis. Center: the card (trophy).
   Right: reading modules + paid unlock preview.
   One master card base; treatments restyle, never re-layout.
============================================================= */

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const pad2 = (n) => String(n).padStart(2, "0");

const state = { source: 0, treatment: "free", tab: "source", view: "menu", draftGate: false };

/* Deep-link support: ?src=1|2&t=free|shiny|mint&tab=source|diagram|metrics
   (used by reviewers and the screenshot pipeline). Any of these params
   means the visitor is addressing a specific scan-room state, so skip the
   front-door menu and open the room directly — deep links never see it. */
{
  const q = new URLSearchParams(location.search);
  const s = parseInt(q.get("src"), 10);
  if (s === 1 || s === 2) state.source = s - 1;
  if (["free", "shiny", "mint"].includes(q.get("t"))) state.treatment = q.get("t");
  if (["source", "diagram", "metrics"].includes(q.get("tab"))) state.tab = q.get("tab");
  if (q.has("src") || q.has("t") || q.has("tab")) state.view = "room";
}

/* ---------- ScanResult v2 access (SCAN_ENGINE_SPEC) ----------
   v2 is the preferred source of truth where it cleanly applies;
   every read falls back to legacy source fields so the app keeps
   working even if v2 is absent. */

function getScanResult(src) {
  if (typeof SCAN_RESULTS_V2 === "undefined" || !src) return null;
  return SCAN_RESULTS_V2.find((r) => r.sourceId === `SRC-${pad2(src.no)}`) || null;
}

function getActiveScan() {
  return getScanResult(SOURCES[state.source]);
}

/* Free gets the preview tier; Halo Mint and the internal Lab state
   both get the developed tier (matches current gating: paid = !free). */
function getTierOutput(scan, treatment) {
  if (!scan) return null;
  return treatment === "free" ? scan.tierOutputs.free : scan.tierOutputs.halo;
}

/* ---------- shared bits ---------- */

function moduleHead(label) {
  return `<div class="module__head"><span class="module__label">${esc(label)}</span><span class="module__rule"></span></div>`;
}

function miniStat(name, value) {
  return `
    <div class="ministat">
      <span class="ministat__name">${esc(name)}</span>
      <span class="ministat__val">${value}</span>
      <span class="ministat__track"><span class="ministat__fill" style="--v:${value}%"></span></span>
    </div>`;
}

function imgOrPlaceholder(src, cls, extra = "") {
  return `
    <img class="${cls}" src="${esc(src)}" alt="" ${extra}
      onerror="this.classList.add('is-missing'); this.closest('[data-imgwrap]').classList.add('img-missing')" />
    <div class="imgdrop">
      <span class="imgdrop__mark">◆</span>
      <span>Missing image file: <b>${esc(src)}</b></span>
    </div>`;
}

/* ---------- left panel: tabbed analysis (Source / Diagram / Metrics) ---------- */

function renderLeftPanel(src, treatment, tab) {
  const tabbar = `
    <div class="tabbar" role="tablist" aria-label="Analysis tabs">
      ${["source", "diagram", "metrics"]
        .map(
          (t) =>
            `<button type="button" class="tabbar__btn ${t === tab ? "is-active" : ""}" data-tab="${t}">${
              t[0].toUpperCase() + t.slice(1)
            }</button>`
        )
        .join("")}
    </div>`;
  const body =
    tab === "diagram"
      ? renderDiagramTab(src, treatment)
      : tab === "metrics"
      ? renderMetricsTab(src, treatment)
      : renderSourceTab(src);
  return tabbar + body;
}

/* ---------- tab 1: source ---------- */

function renderSourceTab(src) {
  const markers = src.markers
    .map(
      (m, i) => `
      <span class="marker" style="left:${m.x}%; top:${m.y}%;">
        <span class="marker__ring"></span><span class="marker__no">${i + 1}</span>
      </span>`
    )
    .join("");
  const horizon = src.horizon == null ? "" : `<span class="horizonline" style="top:${src.horizon}%"></span>`;

  return `
    <div class="module">
      ${moduleHead(src.label)}
      <div class="scanframe" data-imgwrap>
        ${imgOrPlaceholder(src.file, "scanframe__img")}
        <span class="scanframe__corners"></span>
        ${horizon}
        ${markers}
        <span class="scanframe__meta scanframe__meta--tl">BR-SRC ${pad2(src.no)}</span>
        <span class="scanframe__meta scanframe__meta--br">${esc(src.capture.code)}</span>
      </div>
      <ul class="markerlegend">
        ${src.markers.map((m, i) => `<li><span class="markerlegend__no">${i + 1}</span>${esc(m.label)}</li>`).join("")}
      </ul>
    </div>

    <div class="module">
      ${moduleHead("Capture Record")}
      <dl class="kv">
        <div><dt>Source</dt><dd>${esc(src.capture.code)}</dd></div>
        <div><dt>Lens</dt><dd>${esc(src.capture.lens)}</dd></div>
        <div><dt>Light</dt><dd>${esc(src.capture.light)}</dd></div>
        <div><dt>Locale</dt><dd>${esc(src.capture.locale)}</dd></div>
        <div><dt>Recorded</dt><dd>REC ${esc(src.capture.rec)}</dd></div>
      </dl>
    </div>

    <div class="module">
      ${moduleHead("Frame Analysis")}
      <ul class="notes">
        ${src.analysis.map((n) => `<li>${esc(n)}</li>`).join("")}
      </ul>
    </div>`;
}

/* ---------- tab 2: diagram (visual scan sheet) ---------- */

/* Lines/shapes live in a stretched SVG (viewBox 0..100 both axes,
   preserveAspectRatio none) with non-scaling strokes; labels are
   HTML spans positioned by % so text never distorts. */
function renderDiagramTab(src, treatment) {
  const full = treatment !== "free";
  const d = src.diagram;
  const focal = src.markers[0];
  /* The overlay SVG is stretched to the image (preserveAspectRatio
     none), so circular shapes must be drawn as ellipses with the
     y-radius divided by the displayed aspect, and angles computed
     in visual space. */
  const A = d.aspect || 1;
  const dot = (x, y, r, cls = "") =>
    `<ellipse ${cls ? `class="${cls}"` : ""} cx="${x}" cy="${y}" rx="${r}" ry="${(r / A).toFixed(2)}"/>`;

  let svg = "";
  let labels = "";

  /* rule-of-thirds grid */
  svg += `<g class="dg dg--grid">${[33.33, 66.66]
    .map(
      (p) =>
        `<line x1="${p}" y1="0" x2="${p}" y2="100"/><line x1="0" y1="${p}" x2="100" y2="${p}"/>`
    )
    .join("")}</g>`;

  /* subject mass box */
  svg += `<g class="dg dg--mass"><rect x="${d.massBox.x}" y="${d.massBox.y}" width="${d.massBox.w}" height="${d.massBox.h}"/></g>`;
  labels += `<span class="dg-label" style="left:${d.massBox.x + 1.5}%; top:${d.massBox.y + 1.5}%">${esc(d.massBox.label)}</span>`;

  /* focal lock (reuses marker 1 position) */
  const fr = 5.5;
  const fry = fr / A;
  svg += `<g class="dg dg--focal">
    <ellipse cx="${focal.x}" cy="${focal.y}" rx="${fr}" ry="${fry.toFixed(2)}"/>
    <line x1="${focal.x - fr - 3.5}" y1="${focal.y}" x2="${focal.x - fr - 1}" y2="${focal.y}"/>
    <line x1="${focal.x + fr + 1}" y1="${focal.y}" x2="${focal.x + fr + 3.5}" y2="${focal.y}"/>
    <line x1="${focal.x}" y1="${(focal.y - fry - 3.5 / A).toFixed(2)}" x2="${focal.x}" y2="${(focal.y - fry - 1 / A).toFixed(2)}"/>
    <line x1="${focal.x}" y1="${(focal.y + fry + 1 / A).toFixed(2)}" x2="${focal.x}" y2="${(focal.y + fry + 3.5 / A).toFixed(2)}"/>
  </g>`;
  labels += `<span class="dg-label dg-label--focal" style="left:${focal.x + fr + 2}%; top:${(focal.y - fry - 5 / A).toFixed(1)}%">FOCAL LOCK</span>`;

  if (full) {
    /* crop pressure zones (under everything else visually) */
    const zone = (p) => {
      const m = {
        top: { x: 0, y: 0, w: 100, h: p.depth },
        bottom: { x: 0, y: 100 - p.depth, w: 100, h: p.depth },
        left: { x: 0, y: 0, w: p.depth, h: 100 },
        right: { x: 100 - p.depth, y: 0, w: p.depth, h: 100 },
      }[p.side];
      return `<rect class="dg-zone" x="${m.x}" y="${m.y}" width="${m.w}" height="${m.h}"/>`;
    };
    svg = `<g class="dg dg--pressure">${d.pressure.map(zone).join("")}</g>` + svg;
    d.pressure.forEach((p) => {
      const pos =
        p.side === "top"
          ? `left:36%; top:2%`
          : p.side === "bottom"
          ? `left:30%; top:${100 - p.depth + 2.5}%`
          : p.side === "left"
          ? `left:2%; top:46%`
          : `right:2%; top:46%`;
      labels += `<span class="dg-label dg-label--zone" style="${pos}">${esc(p.label)}</span>`;
    });

    /* gesture / posture line */
    svg += `<g class="dg dg--gesture"><polyline points="${d.gesture.points
      .map((p) => p.join(","))
      .join(" ")}"/>${d.gesture.points.map((p) => dot(p[0], p[1], 1.1)).join("")}</g>`;
    const gl = d.gesture.labelAt || d.gesture.points[0];
    labels += `<span class="dg-label" style="left:${gl[0]}%; top:${gl[1]}%">${esc(d.gesture.label)}</span>`;

    /* horizon / frame axis */
    svg += `<g class="dg dg--axis"><line x1="${d.axis.points[0][0]}" y1="${d.axis.points[0][1]}" x2="${d.axis.points[1][0]}" y2="${d.axis.points[1][1]}"/></g>`;
    labels += `<span class="dg-label" style="left:${Math.min(d.axis.points[0][0], d.axis.points[1][0]) + 2}%; top:${
      (d.axis.points[0][1] + d.axis.points[1][1]) / 2 - 4.5
    }%">${esc(d.axis.label)}</span>`;

    /* signal direction arrow — head computed in visual space so it
       isn't sheared by the stretched viewBox */
    const [fx, fy] = d.arrow.from;
    const [tx, ty] = d.arrow.to;
    const ang = Math.atan2((ty - fy) * A, tx - fx);
    const ah = 2.2;
    const head = (off) => {
      const vx = tx - ah * Math.cos(ang + off);
      const vy = ty * A - ah * Math.sin(ang + off);
      return `${vx.toFixed(2)},${(vy / A).toFixed(2)}`;
    };
    svg += `<g class="dg dg--arrow"><line x1="${fx}" y1="${fy}" x2="${tx}" y2="${ty}"/><polygon points="${tx},${ty} ${head(-0.45)} ${head(0.45)}"/></g>`;
    labels += `<span class="dg-label dg-label--arrow" style="left:${tx + 1.5}%; top:${ty + 1}%">${esc(d.arrow.label)}</span>`;

    /* light direction glyph (ray fan, visual-space angles) */
    svg += `<g class="dg dg--light">${[-0.5, 0, 0.5]
      .map((o) => {
        const lx = d.light.x + 4.2 * Math.cos(Math.PI / 4 + o);
        const ly = d.light.y + (4.2 * Math.sin(Math.PI / 4 + o)) / A;
        return `<line x1="${d.light.x}" y1="${d.light.y}" x2="${lx.toFixed(2)}" y2="${ly.toFixed(2)}"/>`;
      })
      .join("")}${dot(d.light.x, d.light.y, 1.4)}</g>`;
    labels += `<span class="dg-label" style="left:${Math.min(d.light.x + 2, 78)}%; top:${d.light.y + 6}%">${esc(d.light.label)}</span>`;
  }

  const devnote = full
    ? ""
    : `<p class="devnote">◆ &nbsp;Preview diagram — gesture line, axes, light read and pressure zones develop with Halo Mint.</p>`;

  return `
    <div class="module">
      ${moduleHead(`${src.label} — Diagram`)}
      <div class="scanframe scanframe--diagram" data-imgwrap>
        ${imgOrPlaceholder(src.file, "scanframe__img")}
        <svg class="diagsvg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${svg}</svg>
        <span class="diaglabels">${labels}</span>
        <span class="scanframe__meta scanframe__meta--tl">SCAN SHEET ${pad2(src.no)}</span>
      </div>
      ${devnote}
    </div>

    <div class="module">
      ${moduleHead("Diagram Notes")}
      <ul class="notes">
        ${d.notes.map((n) => `<li>${esc(n)}</li>`).join("")}
      </ul>
    </div>`;
}

/* ---------- tab 3: metrics (stylish receipts, not science) ---------- */

function statDiamond(stats, treatment) {
  const order = [
    ["Presence", stats.presence],
    ["Frame", stats.frame],
    ["Signal", stats.signal],
    ["Charge", stats.charge],
  ];
  /* P top, F right, S bottom, C left — radius 40 at value 100 */
  const pt = (i, v) => {
    const r = (v / 100) * 40;
    return [[50, 50 - r], [50 + r, 50], [50, 50 + r], [50 - r, 50]][i];
  };
  const poly = order.map(([, v], i) => pt(i, v).join(",")).join(" ");
  const grid = [100, 66, 33]
    .map((g) => `<polygon class="dia-grid" points="${order.map((_, i) => pt(i, g).join(",")).join(" ")}"/>`)
    .join("");
  const axes = `<line class="dia-axis" x1="50" y1="10" x2="50" y2="90"/><line class="dia-axis" x1="10" y1="50" x2="90" y2="50"/>`;
  const labels = `
    <text x="50" y="6.5" text-anchor="middle">PRESENCE ${stats.presence}</text>
    <text x="94" y="51.5" text-anchor="start">FRAME ${stats.frame}</text>
    <text x="50" y="97" text-anchor="middle">SIGNAL ${stats.signal}</text>
    <text x="6" y="51.5" text-anchor="end">CHARGE ${stats.charge}</text>`;
  return `<svg class="diamond" viewBox="-24 0 148 100">${grid}${axes}<polygon class="dia-fill" points="${poly}"/>${order
    .map(([, v], i) => `<circle class="dia-dot" cx="${pt(i, v)[0]}" cy="${pt(i, v)[1]}" r="1.6"/>`)
    .join("")}${labels}</svg>`;
}

function mixRow(k, v) {
  return `
    <div class="impact">
      <span class="impact__label">${esc(k)}</span>
      <span class="impact__track"><span class="impact__fill" style="--v:${v}%"></span></span>
      <span class="impact__val">${v}</span>
    </div>`;
}

function renderMetricsTab(src, treatment) {
  /* TODO(v2-render): signalMix / pressure / fitMatrix are not part of
     ScanResult v2 yet — this tab stays on legacy src.metrics. */
  const free = treatment === "free";
  const m = src.metrics;

  const diamond = `
    <div class="module">
      ${moduleHead("Stat Diamond")}
      ${statDiamond(src.card.stats, treatment)}
    </div>`;

  const mix = `
    <div class="module">
      ${moduleHead("Signal Mix")}
      <p class="metriccap">scan recipe — how the read was weighted</p>
      <div class="mixrows">${m.signalMix.map((r) => mixRow(r.k, r.v)).join("")}</div>
    </div>`;

  const balancePos = 50 + m.pressure.balance; // -50..50 → 0..100
  const pressureBody = `
    <div class="balance">
      <span class="balance__cap">L</span>
      <span class="balance__track">
        <span class="balance__center"></span>
        <span class="balance__dot" style="left:${balancePos}%"></span>
      </span>
      <span class="balance__cap">R</span>
    </div>
    <p class="metriccap">frame weight sits ${m.pressure.balance === 0 ? "dead center" : Math.abs(m.pressure.balance) + "% " + (m.pressure.balance < 0 ? "left" : "right") + " of center"}</p>
    <div class="mixrows">
      ${mixRow("Center pull", m.pressure.centerPull)}
      ${mixRow("Background noise", m.pressure.noise)}
      ${mixRow("Focal clarity", m.pressure.clarity)}
    </div>`;
  const pressure = free
    ? lockedModule("Composition Pressure", "Pressure graph recorded, undeveloped. Develops with Halo Mint.")
    : `<div class="module">${moduleHead("Composition Pressure")}${pressureBody}</div>`;

  const fitBody = `
    <div class="fitgrid">
      ${m.fitMatrix
        .map(
          (f) => `
        <div class="fitcell">
          <span class="fitcell__k">${esc(f.k)}</span>
          <span class="fitcell__state">${esc(f.state)}</span>
          <span class="fitcell__v">${f.v}</span>
        </div>`
        )
        .join("")}
    </div>`;
  const fit = free
    ? lockedModule("Fit Coherence Matrix", "Matrix extracted, development pending. Develops with Halo Mint.")
    : `<div class="module">${moduleHead("Fit Coherence Matrix")}${fitBody}</div>`;

  return `${diamond}${mix}${pressure}${fit}
    <p class="metriccap metriccap--foot">◆ weighted read · interpretive formula, not a measurement</p>`;
}

/* ---------- center: the card (one master base) ---------- */

function renderCard(src, treatment) {
  const t = TREATMENTS[treatment];
  const c = src.card;
  const minted = treatment !== "free";

  return `
    <article class="card" data-treatment="${treatment}" data-material="${esc(src.halo.material)}"
      style="--halo-a:${esc(src.halo.a)}; --halo-b:${esc(src.halo.b)}; --halo-c:${esc(src.halo.c)};">
      <span class="card__halo" aria-hidden="true"></span>
      <div class="card__plate">
        <span class="corner corner--tl"></span><span class="corner corner--tr"></span>
        <span class="corner corner--bl"></span><span class="corner corner--br"></span>
        <span class="card__sparkles" aria-hidden="true"></span>

        <header class="card__head">
          <span class="card__house">◆ BLUE ROOM ARCHIVE</span>
          <span class="card__rarity">${esc(t.rarity)}</span>
        </header>

        <figure class="photo" data-imgwrap
          style="--pos:${esc(src.photoTuning.pos)}; --zoom:${src.photoTuning.zoom}; --scrim:${src.photoTuning.scrim}; --b:${src.photoTuning.base.bright}; --c:${src.photoTuning.base.contrast}; --s:${src.photoTuning.base.sat};">
          ${imgOrPlaceholder(src.file, "photo__img")}
          <span class="photo__scrim"></span>
          <span class="photo__tone"></span>
          <span class="photo__grain"></span>
          <span class="photo__foil"></span>
          <span class="photo__shimmer"></span>
          <span class="photo__hairline"></span>
          <span class="photo__meta photo__meta--tr">BR-SCN ${pad2(src.no)} · 4:5</span>
          <span class="photo__meta photo__meta--br">REC ${esc(src.capture.rec)}</span>
          <figcaption class="photo__tag">${esc(src.capture.code)}</figcaption>
        </figure>

        <div class="titleblock">
          <h2 class="titleblock__title">${esc(c.title)}</h2>
          <div class="titleblock__archline">
            <span class="archline__rule"></span><span class="archline__diamond">◆</span>
            <span class="titleblock__archetype">${esc(c.archetype)}</span>
            <span class="archline__diamond">◆</span><span class="archline__rule"></span>
          </div>
          <p class="verdict"><span class="verdict__key">Signal Note</span>${esc(c.note)}</p>
        </div>

        <div class="statzone">
          ${(() => {
            /* v2 freeVisible is the source of truth for the 4 public
               stats (SCAN_ENGINE_SPEC); legacy card.stats as fallback */
            const s = getScanResult(src)?.stats.freeVisible || c.stats;
            return ["Presence", "Frame", "Signal", "Charge"]
              .map((n) => miniStat(n, s[n.toLowerCase()]))
              .join("");
          })()}
        </div>

        <p class="signature">${esc(c.signature)}</p>

        <div class="mintstrip">
          <span class="mintstrip__state ${minted ? "" : "mintstrip__state--free"}">${esc(t.stamp)}</span>
          <span class="mintstrip__serial ${minted ? "" : "mintstrip__serial--ghost"}">${
            minted ? `${esc(c.serial)} · ${esc(t.strip)}` : esc(t.strip)
          }</span>
          <span class="barcode ${minted ? "" : "barcode--ghost"}" aria-hidden="true"></span>
        </div>
      </div>
    </article>`;
}

/* ---------- right panel: reading modules ---------- */

/* Undeveloped module — free state. Intentional archive copy, never a
   blurred paywall (COPY_SYSTEM.md §3). */
function lockedModule(label, line) {
  return `
    <div class="module module--locked">
      ${moduleHead(label)}
      <p class="undeveloped__line">◆ &nbsp;${esc(line)}</p>
    </div>`;
}

function renderReadingPanel(src, treatment) {
  const free = treatment === "free";
  const c = src.card;

  const stateBadge = free ? "Archive Preview" : treatment === "mint" ? "Lab · Signature Mint" : "Developed · Halo Mint";
  const header = `
    <div class="readhead">
      <h2 class="readhead__title">Scan Reading</h2>
      <div class="readhead__meta">
        <span class="readhead__chip">${esc(src.capture.code)}</span>
        <span class="readhead__badge readhead__badge--${treatment}">${esc(stateBadge)}</span>
      </div>
      <p class="readhead__line">${esc(TREATMENTS[treatment].tagline)}</p>
    </div>`;

  const statReads = `
    <div class="module">
      ${moduleHead("Stat Reading")}
      <div class="reads">
        ${(() => {
          const scan = getScanResult(src);
          const shown = scan?.tierOutputs.free.statsShown || ["presence", "frame", "signal", "charge"];
          const vals = scan?.stats.freeVisible || c.stats;
          return shown
            .map(
              (k) => `
          <div class="reads__item">
            <div class="reads__top"><span class="reads__name">${k}</span><span class="reads__val">${vals[k]}</span></div>
            <p>${esc(src.reads[k])}</p>
          </div>`
            )
            .join("");
        })()}
      </div>
    </div>`;

  const aura = `
    <div class="module">
      ${moduleHead("Aura Profile")}
      <div class="aura">${src.aura.map((a) => `<span class="aura__chip">${esc(a)}</span>`).join("")}</div>
    </div>`;

  const sceneRole = `
    <div class="module">
      ${moduleHead("Scene Role")}
      <p class="module__line">${esc(src.sceneRole)}</p>
    </div>`;

  const deep = `
    <div class="module">
      ${moduleHead("Stance Read")}
      <p class="module__prose module__prose--serif">${esc(src.stance)}</p>
    </div>
    <div class="module">
      ${moduleHead("Fit Coherence")}
      <p class="module__line module__line--fit">${esc(src.fit)}</p>
    </div>
    <div class="module">
      ${moduleHead("Visual Impact")}
      <div class="impact">
        <span class="impact__label">${esc(src.impact.label)}</span>
        <span class="impact__track"><span class="impact__fill" style="--v:${src.impact.value}%"></span></span>
        <span class="impact__val">${src.impact.value}</span>
      </div>
    </div>
    <div class="module">
      ${moduleHead("Lore Density")}
      <div class="impact">
        <span class="impact__label">${esc(src.lore.label)}</span>
        <span class="impact__track"><span class="impact__fill impact__fill--dash" style="--v:${src.lore.value}%"></span></span>
        <span class="impact__val">${src.lore.value}</span>
      </div>
    </div>
    <div class="module module--oracle">
      ${moduleHead("Oracle Read")}
      <p class="oracle">“${esc(src.oracle)}”</p>
    </div>
    <div class="module">
      ${moduleHead("Mint Record")}
      <dl class="kv">
        <div><dt>Serial</dt><dd>${esc(c.serial)}</dd></div>
        <div><dt>Edition</dt><dd>${esc(c.edition)}</dd></div>
        <div><dt>Batch</dt><dd>${esc(c.batch)}</dd></div>
        <div><dt>Minted</dt><dd>${esc(c.minted)}</dd></div>
      </dl>
    </div>
    <details class="receipts">
      <summary><span class="module__label">Technical Receipts</span><span class="receipts__caret">▸</span></summary>
      <dl class="receipts__list">
        ${src.receipts.map((r) => `<div><dt>${esc(r.k)}</dt><dd>${esc(r.v)}</dd></div>`).join("")}
      </dl>
      <div class="formulas">
        <div class="formulas__head">Interpretive Formula — scan recipe, not a measurement</div>
        ${FORMULAS.map(
          (f) =>
            `<div class="formulas__row"><span class="formulas__k">${esc(f.k)}</span><span class="formulas__v">derived from: ${esc(f.v)}</span></div>`
        ).join("")}
      </div>
    </details>`;

  /* In Free Pull the deep reading is present but veiled, plus an
     unlock preview that actually switches treatment (no checkout). */
  /* CTA first (visible near the fold), undeveloped teasers after it as
     supporting evidence. */
  const lockedDeep = `
    <div class="module unlock unlock--spine">
      ${moduleHead("Develop This Scan")}
      <p class="unlock__line">The full reading is already written into this image. Minting develops it.</p>
      <button type="button" class="unlock__btn unlock__btn--shiny" data-goto="shiny">
        <span class="unlock__name">Develop this scan</span>
        <span class="unlock__desc">Into Halo Mint · the card finishes developing</span>
      </button>
      <p class="unlock__more">◆ &nbsp;Develops: the hidden stat · structured evidence · full diagram &amp; metrics · mint record · the full oracle</p>
    </div>
    ${lockedModule("Stance Read", "Evidence layer pending — develops with Halo Mint.")}
    ${lockedModule("Fit Coherence", "Coherence read recorded, undeveloped. Full record develops with mint.")}
    ${lockedModule("Oracle Read", "The full read develops with Halo Mint. One line survives the preview — see the dossier below.")}`;

  const shinyTease =
    treatment === "mint"
      ? `
    <div class="module unlock">
      ${moduleHead("Lab State")}
      <p class="unlock__line">Signature Mint is an internal material study, not a customer tier. Its silver feeds Free Pull polish and the final Halo material.</p>
      <button type="button" class="unlock__btn unlock__btn--shiny" data-goto="shiny">
        <span class="unlock__name">Switch to Halo Mint</span>
        <span class="unlock__desc">The customer-facing developed state</span>
      </button>
    </div>`
      : "";

  const shinyBadge =
    treatment === "shiny"
      ? `
    <div class="module">
      <div class="maxbadge">◆ HALO MINT · FULLY DEVELOPED ◆</div>
    </div>`
      : "";

  return `${header}${statReads}${aura}${sceneRole}${free ? lockedDeep : deep + shinyTease + shinyBadge}`;
}

/* ---------- scroll dossier (below the hero) ----------
   Order: factual → interpretive → identity → collectible → playful.
   Free state reads as undeveloped archive material — never a paywall. */

function dplate(no, title, paid, body, extraClass = "") {
  return `
    <section class="dplate ${extraClass}">
      <header class="dplate__head">
        <span class="dplate__no">${no}</span>
        <h3 class="dplate__title">${esc(title)}</h3>
        <span class="dplate__rule"></span>
        <span class="dplate__tag ${paid ? "dplate__tag--dev" : ""}">${paid ? "DEVELOPED" : "ARCHIVE PULL"}</span>
      </header>
      ${body}
    </section>`;
}

function renderDossier(src, treatment) {
  const paid = treatment !== "free";
  const d = src.dossier;
  const c = src.card;
  const scan = getScanResult(src);
  const tierOut = getTierOutput(scan, treatment);
  const freeVals = scan?.stats.freeVisible || c.stats;
  const haloX = scan?.stats.haloExtended;

  /* 01 — Source Record (full in both states: the factual hook) */
  const record = dplate("01", "Source Record", paid, `
    <dl class="drecord">
      <div><dt>Source ID</dt><dd>${esc(src.capture.code)} · SRC-${pad2(src.no)}</dd></div>
      <div><dt>Object Number</dt><dd>${esc(d.record.objectNo)}</dd></div>
      <div><dt>Capture Type</dt><dd>${esc(d.record.captureType)}</dd></div>
      <div><dt>Lead Gesture</dt><dd>${esc(d.record.gesture)}</dd></div>
      <div><dt>Scene Container</dt><dd>${esc(d.record.container)}</dd></div>
      <div><dt>Primary Signal</dt><dd>${esc(d.record.primarySignal)}</dd></div>
      <div><dt>Background Role</dt><dd>${esc(d.record.backgroundRole)}</dd></div>
      <div><dt>Treatment Eligibility</dt><dd>${esc(d.record.eligibility)}</dd></div>
      <div><dt>Provenance</dt><dd>${esc(d.record.provenance)}</dd></div>
      <div><dt>Markings</dt><dd>${esc(d.record.markings)}</dd></div>
    </dl>`);

  /* 02 — Evidence Board — v2 structured receipts (cue/effect/basis/
     confidence) preferred; legacy prose receipts as fallback. Effects
     render as quiet mono marks, never a dashboard. */
  let boardBody;
  if (scan?.receipts?.length) {
    const all = scan.receipts;
    const shownR = paid ? all : scan.tierOutputs.free.receiptsShown || all.slice(0, 3);
    const hiddenN = all.length - shownR.length;
    boardBody = `
    <div class="dboard">
      ${shownR
        .map(
          (r) => `
        <div class="receipt">
          <div class="receipt__top"><span class="receipt__effect">${esc(r.effect)}</span><span class="receipt__conf">${esc(r.confidence)}</span></div>
          <p class="receipt__read">${esc(r.cue)}</p>
          <span class="receipt__basis">${esc(r.basis)}</span>
        </div>`
        )
        .join("")}
      ${
        paid || hiddenN <= 0
          ? ""
          : `<div class="receipt receipt--undeveloped">
              <span class="receipt__k">· · ·</span>
              <p class="receipt__read">${hiddenN} receipts undeveloped — archive pull. Development pending.</p>
            </div>`
      }
    </div>`;
  } else {
    const shown = paid ? d.evidence : d.evidence.filter((e) => e.free);
    const hiddenCount = d.evidence.length - shown.length;
    boardBody = `
    <div class="dboard">
      ${shown
        .map(
          (e) => `
        <div class="receipt">
          <span class="receipt__k">◆ ${esc(e.k)}</span>
          <p class="receipt__read">${esc(e.read)}</p>
        </div>`
        )
        .join("")}
      ${
        paid
          ? ""
          : `<div class="receipt receipt--undeveloped">
              <span class="receipt__k">· · ·</span>
              <p class="receipt__read">${hiddenCount} receipts undeveloped — archive pull. Development pending.</p>
            </div>`
      }
    </div>`;
  }
  const board = dplate("02", "Evidence Board", paid, boardBody);

  /* 03 — Stat Dossier (values + visibility from v2 when present) */
  const statRows = (scan?.tierOutputs.free.statsShown || ["presence", "frame", "signal", "charge"])
    .map((k) => {
      const n = d.statNotes[k];
      return `
      <div class="dstat">
        <div class="dstat__head">
          <span class="dstat__name">${k}</span>
          <span class="dstat__track"><span class="dstat__fill" style="--v:${freeVals[k]}%"></span></span>
          <span class="dstat__val">${freeVals[k]}</span>
        </div>
        <p class="dstat__why">${esc(src.reads[k])}</p>
        ${
          paid
            ? `<p class="dstat__evidence">${esc(n.evidence)}</p>${n.note ? `<p class="dstat__note">${esc(n.note)}</p>` : ""}`
            : `<p class="dstat__undeveloped">— evidence layer develops with the mint.</p>`
        }
      </div>`;
    })
    .join("");
  const statDossier = dplate("03", "Stat Dossier", paid, `
    <div class="dstats">${statRows}</div>
    <p class="dossier__cap">weighted reads against the scan-room prototype benchmark — interpretive, not measured</p>`);

  /* 04 — Hidden Stat (v2 conditionalStats preferred; tease stays legacy) */
  const hid = scan?.conditionalStats?.[0] || d.hidden;
  const hidden = dplate("04", "Hidden Stat", paid, paid
    ? `
    <div class="dhidden">
      <div class="dhidden__score"><span class="dhidden__val">${hid.value}</span><span class="dhidden__name">${esc(hid.name)}</span></div>
      <p class="dhidden__read">${esc(hid.read)}</p>
    </div>`
    : `
    <div class="dhidden dhidden--tease">
      <div class="dhidden__score">
        <span class="dhidden__val">··</span>
        <span class="dhidden__name">${esc(d.hidden.name)}</span>
        <span class="dhidden__seal">Sealed · development pending</span>
      </div>
      <p class="dhidden__read">${esc(d.hidden.tease)}</p>
    </div>`);

  /* 05 — Fit + Aura Layer */
  const fitAura = dplate("05", "Fit + Aura Layer", paid, paid
    ? `
    <div class="dfitaura">
      <div class="dfitaura__col">
        <div class="aura">${src.aura.map((a) => `<span class="aura__chip">${esc(a)}</span>`).join("")}</div>
        <p class="module__line"><b>Scene Role</b> — ${esc(src.sceneRole)}</p>
        <p class="module__prose--serif dfitaura__stance">${esc(src.stance)}</p>
      </div>
      <div class="dfitaura__col">
        <p class="module__line--fit dfitaura__fit">${esc(src.fit)}</p>
        ${(() => {
          /* Halo deeper stats from v2 haloExtended (Visual Impact is
             derived, Lore Density carried) — legacy fallback */
          const vi = haloX?.visualImpact || src.impact;
          const lo = haloX?.loreDensity || src.lore;
          return `
        <div class="impact"><span class="impact__label">Impact · ${esc(vi.label)}</span><span class="impact__track"><span class="impact__fill" style="--v:${vi.value}%"></span></span><span class="impact__val">${vi.value}</span></div>
        <div class="impact"><span class="impact__label">Lore · ${esc(lo.label)}</span><span class="impact__track"><span class="impact__fill impact__fill--dash" style="--v:${lo.value}%"></span></span><span class="impact__val">${lo.value}</span></div>`;
        })()}
      </div>
    </div>`
    : `
    <div class="dfitaura dfitaura--tease">
      <div class="aura">${src.aura.map((a) => `<span class="aura__chip">${esc(a)}</span>`).join("")}</div>
      <p class="dstat__undeveloped">Aura markers visible. Full aura interpretation develops with Halo Mint.</p>
    </div>`);

  /* 06 — Mint Record */
  const mintBody = paid
    ? `
    <dl class="drecord drecord--mint">
      <div><dt>Developed From</dt><dd>SRC-${pad2(src.no)} · ${esc(src.capture.code)}</dd></div>
      <div><dt>Treatment</dt><dd>Halo Mint</dd></div>
      <div><dt>Primary Artifact Trigger</dt><dd>${esc((scan?.tierOutputs.halo.triggers || [d.mint.trigger1, d.mint.trigger2])[0])}</dd></div>
      <div><dt>Secondary Trigger</dt><dd>${esc((scan?.tierOutputs.halo.triggers || [d.mint.trigger1, d.mint.trigger2])[1])}</dd></div>
      <div><dt>Material</dt><dd class="drecord__material">${esc(scan?.tierOutputs.halo.material || src.halo.material)}</dd></div>
      <div><dt>Treatment Family</dt><dd>${esc(d.mint.family)}</dd></div>
      <div><dt>Archive Status</dt><dd>Developed</dd></div>
      <div><dt>Mint Serial</dt><dd>${esc(scan?.tierOutputs.halo.mintSerial || d.mint.serial)}</dd></div>
    </dl>
    <p class="dmint__note">“${esc(d.mint.note)}”</p>`
    : `
    <dl class="drecord drecord--mint">
      <div><dt>Archive Status</dt><dd>Archive pull · full artifact not minted</dd></div>
      <div><dt>Treatment Eligibility</dt><dd>${esc(d.record.eligibility)}</dd></div>
      <div><dt>Material (on development)</dt><dd class="drecord__material">${esc(src.halo.material)}</dd></div>
      <div><dt>Mint Serial</dt><dd>${esc(scan?.tierOutputs.free.serial || `Reserved · BR-SRC${pad2(src.no)}-HM-····`)}</dd></div>
    </dl>
    <button type="button" class="unlock__btn unlock__btn--shiny dmint__cta" data-goto="shiny">
      <span class="unlock__name">Develop this scan</span>
      <span class="unlock__desc">The card finishes developing · ${esc(src.halo.material).toLowerCase()} · first print</span>
    </button>`;
  const mintRecord = dplate("06", "Mint Record", paid, mintBody, "dplate--mint");

  /* 07 — Oracle Read */
  const oracle = dplate("07", "Oracle Read", paid, `
    <blockquote class="doracle">“${esc(
      paid ? scan?.readings.oracle || d.oracle.full : scan?.tierOutputs.free.oracle || d.oracle.short
    )}”</blockquote>
    ${paid ? `<p class="doracle__timeline">${esc(d.oracle.timeline)}</p>` : `<p class="doracle__timeline doracle__timeline--ghost">full read develops with the mint</p>`}`,
    "dplate--oracle");

  return `
    <div class="dossier__cue">SCAN DOSSIER — FULL RECORD</div>
    <div class="dossier__inner">
      ${record}${board}${statDossier}${hidden}${fitAura}${mintRecord}${oracle}
      <p class="dossier__end">◆ &nbsp;END OF RECORD · ${esc(src.label).toUpperCase()} · BLUE ROOM ARCHIVE</p>
    </div>`;
}

/* ---------- front-door menu (one sample: SRC-01, Free vs Halo) ----------
   One existing sample shown two ways: the same photo as a matte Free
   plate and a developed Halo artifact. Pulls title / archetype / material
   from SOURCES[0] + the tier stamps — no stats, no fabricated analysis,
   no new asset. */

function applyView() {
  document.body.dataset.view = state.view;
}

function renderMenu() {
  const s = SOURCES[0];
  const c = s.card;
  const shot = (stamp, stampCls) => `
    <div class="mtile__shot" data-imgwrap style="--pos:${esc(s.photoTuning.pos)};">
      ${imgOrPlaceholder(s.file, "mtile__img")}
      <span class="mtile__scrim"></span>
      <span class="mtile__stamp ${stampCls}">${esc(stamp)}</span>
    </div>`;
  return `
    <div class="menu__inner">
      <header class="menu__head">
        <h1 class="menu__brand"><span class="menu__mark">◆</span> BLUE ROOM</h1>
        <p class="menu__thesis">Every photo is already a card. The room develops it.</p>
        <p class="menu__trust">Image-as-artifact scan — it reads frame, gesture and signal, never the person.</p>
      </header>

      <section class="msample" style="--halo-a:${esc(s.halo.a)}; --halo-b:${esc(s.halo.b)}; --halo-c:${esc(s.halo.c)};">
        <div class="msample__cap">
          <span class="msample__label">Sample Scan</span>
          <span class="msample__type">Human Sample · Archive</span>
        </div>
        <h2 class="msample__title">${esc(c.title)}</h2>
        <p class="msample__arch">◆ &nbsp;${esc(c.archetype)}</p>

        <div class="msample__compare">
          <figure class="mtile mtile--free">
            ${shot(TREATMENTS.free.stamp, "")}
            <figcaption class="mtile__cap">
              <span class="mtile__tier">Free Pull</span>
              <span class="mtile__chips">first pull · surface scan · card exists</span>
            </figcaption>
          </figure>

          <span class="msample__arrow" aria-hidden="true">→<span>develops</span></span>

          <figure class="mtile mtile--halo">
            ${shot(TREATMENTS.shiny.stamp, "mtile__stamp--halo")}
            <figcaption class="mtile__cap">
              <span class="mtile__tier mtile__tier--halo">Halo Mint</span>
              <span class="mtile__chips">developed print · hidden stat · structured evidence · oracle</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <div class="menu__actions">
        <button type="button" class="menu__enter" data-view-to="room">Enter Scan Room</button>
        <button type="button" class="menu__add" data-draft-pick>${draft ? "Replace your photo" : "Add your photo"}<span class="menu__add-tag"> · local draft</span></button>
        ${draft ? `<button type="button" class="menu__resume" data-view-to="draft">Resume local draft →</button>` : ""}
        <p class="pickmsg" role="status" aria-live="polite"></p>
      </div>

      <p class="menu__foot">One sample · SRC-01 · the same photo, developed two ways.</p>
    </div>`;
}

function mountMenu() {
  document.getElementById("menuView").innerHTML = renderMenu();
}

/* ---------- local draft intake (browser-only, no upload, no analysis) ----------
   The chosen image never leaves the browser and never receives a scan.
   `draft` is a plain object — NOT a ScanResult — and carries no stats,
   receipts, oracle, or hidden stat. renderDraft() must never read sample
   scan data: if a number ever appears on the draft, that is a bug. */

let draft = null; // { url, name, sizeLabel, warn } | null

function humanSize(bytes) {
  if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  if (bytes >= 1024) return Math.round(bytes / 1024) + " KB";
  return (bytes || 0) + " B";
}

const DRAFT_LARGE_FILE = 25 * 1024 * 1024; // gentle-warning threshold; still previews

function pickPhoto() {
  const input = document.getElementById("draftFile");
  input.value = ""; // reset so re-picking the same filename still fires `change`
  input.click();
}

function setPickError(msg) {
  const host = state.view === "draft" ? document.getElementById("draftView") : document.getElementById("menuView");
  const el = host && host.querySelector(".pickmsg");
  if (el) el.textContent = msg;
}

function loadDraftFile(file) {
  if (!file) return; // dialog cancelled
  if (!file.type || !file.type.startsWith("image/")) {
    setPickError("That file is not an image. Blue Room takes one photo — JPG, PNG, WEBP or similar.");
    return;
  }
  if (draft && draft.url) URL.revokeObjectURL(draft.url); // release the previous object URL
  draft = {
    url: URL.createObjectURL(file),
    name: file.name || "untitled image",
    sizeLabel: humanSize(file.size || 0),
    warn: file.size > DRAFT_LARGE_FILE ? "Large file — the preview may take a moment to render in this browser." : "",
  };
  state.view = "draft";
  state.draftGate = false; // a fresh / replaced draft always starts at intake, not the gate
  document.getElementById("draftView").innerHTML = renderDraft();
  mountMenu(); // the menu now offers "Resume local draft"
  applyView();
  window.scrollTo(0, 0);
}

/* Two local-draft states share one mount (#draftView): the intake preview
   and the sealed Scan Development Gate. Neither generates any analysis. */
function renderDraft() {
  if (!draft) return "";
  return state.draftGate ? renderGate() : renderDraftIntake();
}

/* The draft card reuses the Room/Plate/Artifact grammar but shows ZERO
   analysis — no stats, no receipts, no oracle, no hidden stat, no serial.
   It says only what is true: a local, unscanned image. */
function renderDraftIntake() {
  const d = draft;
  return `
    <div class="draft__inner">
      <div class="draft__cue">◆ &nbsp;BLUE ROOM · LOCAL DRAFT INTAKE</div>

      <article class="draftcard" aria-label="Local draft preview">
        <div class="draftcard__plate">
          <header class="draftcard__head">
            <span class="draftcard__house">◆ BLUE ROOM ARCHIVE</span>
            <span class="draftcard__state">LOCAL DRAFT</span>
          </header>

          <figure class="draftcard__photo">
            <img class="draftcard__img" src="${esc(d.url)}" alt="Local draft preview"
              onerror="this.closest('.draftcard__photo').classList.add('img-missing')" />
            <span class="draftcard__scrim"></span>
            <span class="draftcard__stamp">LOCAL DRAFT · UNSCANNED</span>
          </figure>

          <div class="draftcard__body">
            <h2 class="draftcard__title">${esc(d.name)}</h2>
            <div class="draftcard__archline">
              <span class="draftcard__archrule"></span>
              <span class="draftcard__arch">◆ &nbsp;UNSCANNED ARTIFACT &nbsp;◆</span>
              <span class="draftcard__archrule"></span>
            </div>
            <p class="draftcard__note">Image loaded in this browser only. No scan has run yet.</p>
          </div>

          <div class="draftcard__strip">
            <span class="draftcard__stripstate">LOCAL DRAFT</span>
            <span class="draftcard__stripmeta">NOT MINTED · NO SERIAL</span>
          </div>
        </div>
      </article>

      <section class="draftinfo">
        <p class="draftinfo__line">Ready for scan development. The room can preview the artifact before the scan engine is connected.</p>
        <p class="draftinfo__sub">No analysis has run — no stats, no receipts, no oracle. Nothing here reads the image or the person in it.</p>
        <p class="draftinfo__meta">${esc(d.name)} · ${esc(d.sizeLabel)}${d.warn ? ` · <span class="draftinfo__warn">${esc(d.warn)}</span>` : ""}</p>
      </section>

      <div class="draft__develop">
        <button type="button" class="menu__enter" data-gate="open">Develop scan</button>
        <p class="draft__developsub">Scan engine not connected yet.</p>
      </div>

      <div class="draft__actions">
        <button type="button" class="draft__sample" data-draft-pick>Replace image</button>
        <button type="button" class="draft__sample" data-view-to="room">Enter sample scan room</button>
        <button type="button" class="draft__back" data-view-to="menu">Main menu</button>
      </div>

      <p class="pickmsg" role="status" aria-live="polite"></p>
    </div>`;
}

/* Scan Development Gate — a sealed next step for a staged local draft.
   The scan engine is NOT connected: this renders a locked development
   chamber with a static "nothing has run" ledger and a DISABLED run
   button. It generates NOTHING (no stats / receipts / oracle / hidden
   stat / mint / Halo) and never touches SOURCES, SCAN_RESULTS_V2,
   getActiveScan() or getScanResult(). It reads only `draft`. */
function renderGate() {
  const d = draft;
  return `
    <div class="gate">
      <div class="draft__cue">◆ &nbsp;BLUE ROOM · SCAN DEVELOPMENT GATE</div>

      <section class="gatepanel">
        <header class="gatepanel__head">
          <span class="gatepanel__title">Scan Development Gate</span>
          <span class="gatepanel__tag">Engine offline</span>
        </header>

        <figure class="gatepanel__staged">
          <img class="gatepanel__img" src="${esc(d.url)}" alt="Staged artifact"
            onerror="this.closest('.gatepanel__staged').classList.add('img-missing')" />
          <span class="gatepanel__sealed">Artifact staged · sealed</span>
        </figure>

        <p class="gatepanel__lead">The artifact is staged. The scan engine is not connected yet.</p>

        <ul class="gatecheck">
          <li>No analysis has run.</li>
          <li>No stats have been generated.</li>
          <li>No receipts exist.</li>
          <li>No oracle exists.</li>
          <li>No Halo result exists.</li>
        </ul>

        <div class="gatepanel__foot">
          <span class="gatepanel__pending">Development pending</span>
          <button type="button" class="gatepanel__run" disabled aria-disabled="true">Run engine · offline</button>
        </div>
        <p class="gatepanel__ready">Ready for future scan engine.</p>
      </section>

      <div class="gateactions">
        <button type="button" class="menu__enter" data-gate="close">Return to local draft</button>
        <button type="button" class="draft__sample" data-draft-pick>Replace image</button>
        <button type="button" class="draft__sample" data-view-to="room">Enter sample scan room</button>
        <button type="button" class="draft__back" data-view-to="menu">Main menu</button>
      </div>
    </div>`;
}

/* ---------- render + wiring ---------- */

function render() {
  const src = SOURCES[state.source];
  document.body.dataset.treatment = state.treatment;
  applyView();

  document.getElementById("sourcePanel").innerHTML = renderLeftPanel(src, state.treatment, state.tab);
  /* one quiet orientation line above the artifact — what the room does,
     stated once, plus a sample-scan cue so the demo photos read as
     fixtures, not someone's profile. */
  const stageIntro = `
    <div class="stageintro">
      <p class="stageintro__line">Every photo is already a card. The room develops it.</p>
      <span class="stageintro__cue">Sample scan · ${pad2(src.no)} / ${pad2(SOURCES.length)}</span>
    </div>`;
  document.getElementById("stageZone").innerHTML =
    stageIntro +
    renderCard(src, state.treatment) +
    `<a class="stagecue" href="#dossierMount">▼ &nbsp;SCAN DOSSIER BELOW</a>`;
  document.getElementById("readingPanel").innerHTML = renderReadingPanel(src, state.treatment);
  document.getElementById("dossierMount").innerHTML = renderDossier(src, state.treatment);

  /* page-level halo material accents (used by body-scoped shiny rules) */
  document.body.style.setProperty("--halo-a", src.halo.a);
  document.body.style.setProperty("--halo-b", src.halo.b);
  document.body.style.setProperty("--halo-c", src.halo.c);

  document.querySelectorAll("#sourceToggle button").forEach((b) => {
    b.classList.toggle("is-active", Number(b.dataset.source) === state.source);
  });
  document.querySelectorAll("#treatmentToggle button").forEach((b) => {
    b.classList.toggle("is-active", b.dataset.treatment === state.treatment);
  });

}

/* Delegated once — survives re-renders, no per-render binding. */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-goto]");
  if (!btn) return;
  state.treatment = btn.dataset.goto;
  render();
});

/* View switch: front-door menu ⇄ scan room. Separate attribute from
   [data-goto] (treatment) so the two delegated handlers never collide. */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-view-to]");
  if (!btn) return;
  const to = btn.dataset.viewTo;
  if (to === "draft" && !draft) return; // nothing to resume
  if (to === "draft") {
    /* Resume always lands on the intake, not the gate */
    state.draftGate = false;
    document.getElementById("draftView").innerHTML = renderDraft();
  }
  state.view = to;
  applyView();
  window.scrollTo(0, 0);
});

/* Local draft: pick / replace a browser-local photo (no upload, no store). */
document.addEventListener("click", (e) => {
  if (e.target.closest("[data-draft-pick]")) pickPhoto();
});
document.getElementById("draftFile").addEventListener("change", (e) => {
  loadDraftFile(e.target.files && e.target.files[0]);
});

/* Scan Development Gate: open ("Develop scan") / close ("Return to local
   draft"). Toggles a render flag only — it never runs or generates a scan. */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-gate]");
  if (!btn) return;
  state.draftGate = btn.dataset.gate === "open";
  document.getElementById("draftView").innerHTML = renderDraft();
  window.scrollTo(0, 0);
});

document.getElementById("sourcePanel").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-tab]");
  if (!btn) return;
  state.tab = btn.dataset.tab;
  render();
});

document.getElementById("sourceToggle").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-source]");
  if (!btn) return;
  state.source = Number(btn.dataset.source);
  render();
});

document.getElementById("treatmentToggle").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-treatment]");
  if (!btn) return;
  state.treatment = btn.dataset.treatment;
  render();
});

document.addEventListener("keydown", (e) => {
  /* room shortcuts (1/2/F/H/M) only fire inside the room. On the front
     door Enter opens the room; on a draft Escape returns to the menu. */
  if (state.view !== "room") {
    if (state.view === "menu" && e.key === "Enter") { state.view = "room"; applyView(); window.scrollTo(0, 0); }
    else if (state.view === "draft" && e.key === "Escape") {
      /* Escape steps back one level: gate → intake, intake → menu */
      if (state.draftGate) { state.draftGate = false; document.getElementById("draftView").innerHTML = renderDraft(); }
      else { state.view = "menu"; applyView(); }
    }
    return;
  }
  if (e.key === "1") state.source = 0;
  else if (e.key === "2") state.source = 1;
  else if (e.key.toLowerCase() === "f") state.treatment = "free";
  else if (e.key.toLowerCase() === "m") state.treatment = "mint";
  else if (e.key.toLowerCase() === "h" || e.key.toLowerCase() === "s") state.treatment = "shiny";
  else return;
  render();
});

mountMenu();
render();
