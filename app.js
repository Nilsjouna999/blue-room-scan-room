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

/* ---------- artifact stat language (Artifact Language Stabilization v1) ----------
   The 4 public sample stats keep their internal data KEYS (presence/frame/
   signal/charge) but display under artifact-safe LABELS. "Presence" is kept
   only in its artifact-bound form "Frame Presence" (per the language rules);
   "Charge" -> "Scene Charge". Internal keys stay for data stability. */
const STAT_LABELS = {
  presence: "Frame Presence",
  frame: "Frame",
  signal: "Signal",
  charge: "Scene Charge",
};
const statLabel = (key) => STAT_LABELS[key] || key;

/* Public tier ladder — Muted/Clean/Strong/Charged/Peak (no public 0-100).
   Provisional internal->band cuts (calibrate later with real distribution):
   <25 Muted · 25-47 Clean · 48-65 Strong · 66-82 Charged · 83+ Peak. */
function tierBand(v) {
  const n = Number(v);
  if (!isFinite(n)) return "—";
  if (n >= 83) return "Peak";
  if (n >= 66) return "Charged";
  if (n >= 48) return "Strong";
  if (n >= 25) return "Clean";
  return "Muted";
}

const state = { source: 0, treatment: "free", tab: "source", view: "menu", draftGate: false, dev: null };

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
  /* Dev-only harness route (NOT a product feature): ?dev=uploaded-result |
     uploaded-blocked renders a validated DEV fixture, never a user scan.
     free-scan-sim = Free Pull mock · halo-gate = sealed card-back mock. */
  const dev = q.get("dev");
  if (["uploaded-result", "uploaded-blocked", "free-scan-sim", "halo-gate"].includes(dev)) { state.view = "dev"; state.dev = dev; }
  else if (q.has("src") || q.has("t") || q.has("tab")) state.view = "room";
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
  /* public stat: artifact-safe tier band (no 0-100), bar still shows magnitude */
  return `
    <div class="ministat">
      <span class="ministat__name">${esc(name)}</span>
      <span class="ministat__val ministat__val--tier">${esc(tierBand(value))}</span>
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
    ["Frame Presence", stats.presence],
    ["Frame", stats.frame],
    ["Signal", stats.signal],
    ["Scene Charge", stats.charge],
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
  /* axis labels: artifact-safe stat names only (no public 0-100); the radar
     shape carries magnitude and the tier band shows on card/panel/dossier */
  const labels = `
    <text x="50" y="6.5" text-anchor="middle">FRAME PRESENCE</text>
    <text x="94" y="51.5" text-anchor="start">FRAME</text>
    <text x="50" y="97" text-anchor="middle">SIGNAL</text>
    <text x="6" y="51.5" text-anchor="end">SCENE CHARGE</text>`;
  return `<svg class="diamond" viewBox="-42 0 184 100">${grid}${axes}<polygon class="dia-fill" points="${poly}"/>${order
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
            return ["presence", "frame", "signal", "charge"]
              .map((k) => miniStat(statLabel(k), s[k]))
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
            <div class="reads__top"><span class="reads__name">${esc(statLabel(k))}</span><span class="reads__val reads__val--tier">${esc(tierBand(vals[k]))}</span></div>
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
      ${moduleHead("Frame Impact")}
      <div class="impact">
        <span class="impact__label">${esc(src.impact.label)}</span>
        <span class="impact__track"><span class="impact__fill" style="--v:${src.impact.value}%"></span></span>
        <span class="impact__val impact__val--tier">${esc(tierBand(src.impact.value))}</span>
      </div>
    </div>
    <div class="module">
      ${moduleHead("Lore Density")}
      <div class="impact">
        <span class="impact__label">${esc(src.lore.label)}</span>
        <span class="impact__track"><span class="impact__fill impact__fill--dash" style="--v:${src.lore.value}%"></span></span>
        <span class="impact__val impact__val--tier">${esc(tierBand(src.lore.value))}</span>
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
          <span class="dstat__name">${esc(statLabel(k))}</span>
          <span class="dstat__track"><span class="dstat__fill" style="--v:${freeVals[k]}%"></span></span>
          <span class="dstat__val dstat__val--tier">${esc(tierBand(freeVals[k]))}</span>
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
      <div class="dhidden__score"><span class="dhidden__val dhidden__val--tier">${esc(tierBand(hid.value))}</span><span class="dhidden__name">${esc(hid.name)}</span></div>
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
        <div class="impact"><span class="impact__label">Frame Impact · ${esc(vi.label)}</span><span class="impact__track"><span class="impact__fill" style="--v:${vi.value}%"></span></span><span class="impact__val impact__val--tier">${esc(tierBand(vi.value))}</span></div>
        <div class="impact"><span class="impact__label">Lore · ${esc(lo.label)}</span><span class="impact__track"><span class="impact__fill impact__fill--dash" style="--v:${lo.value}%"></span></span><span class="impact__val impact__val--tier">${esc(tierBand(lo.value))}</span></div>`;
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

/* Display-only label helpers — the real file.name stays on `draft`; these
   only format a cleaner, shorter on-screen label. No scan, no analysis. */
function fileTypeLabel(name) {
  const m = String(name || "").match(/\.([a-z0-9]+)$/i);
  return m ? m[1].toUpperCase() : "IMG";
}
function cleanFileLabel(name) {
  const safe = String(name || "image");
  const dot = safe.lastIndexOf(".");
  const ext = dot > 0 ? safe.slice(dot) : "";
  const base = dot > 0 ? safe.slice(0, dot) : safe;
  return base.length <= 16 ? safe : base.slice(0, 8) + "…" + base.slice(-3) + ext;
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
            <h2 class="draftcard__title">Local image</h2>
            <p class="draftcard__file">${esc(fileTypeLabel(d.name))} · ${esc(d.sizeLabel)} · ${esc(cleanFileLabel(d.name))}</p>
            <div class="draftcard__archline">
              <span class="draftcard__archrule"></span>
              <span class="draftcard__arch">◆ &nbsp;UNSCANNED ARTIFACT &nbsp;◆</span>
              <span class="draftcard__archrule"></span>
            </div>
            <p class="draftcard__status">No scan has run yet.</p>
            <p class="draftcard__sub">Image loaded in this browser only.</p>
          </div>

          <div class="draftcard__strip">
            <span class="draftcard__stripstate">LOCAL DRAFT</span>
            <span class="draftcard__stripmeta">NOT MINTED · NO SERIAL</span>
          </div>
        </div>
      </article>

      <section class="draftinfo">
        <p class="draftinfo__line">Ready for scan development.</p>
        <p class="draftinfo__sub">The room previews the artifact before the scan engine is connected. No analysis has run — no stats, no receipts, no oracle; nothing here reads the image or the person in it.</p>
        ${d.warn ? `<p class="draftinfo__warn">${esc(d.warn)}</p>` : ""}
      </section>

      <div class="draft__develop">
        <button type="button" class="menu__enter" data-gate="open">Develop scan</button>
        <p class="draft__developsub">Stage artifact for future scan engine.</p>
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
          <span class="gatepanel__tag"><span class="gatepanel__dot" aria-hidden="true"></span>Engine offline</span>
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

/* Safe blocked / failure state — FOUNDATION ONLY (Scan Engine Foundation
   v1). Renders a `blocked_scan_state` (from
   window.BlueRoomScanContract.createBlockedScanState) as a sealed plate
   listing the contract violations — NO card, NO stats, NO oracle, NO
   receipts beyond the validator errors. It is NOT wired into the normal
   user flow (Develop scan still only opens the offline gate); a future
   engine — or a dev/test trigger — supplies the state. */
function renderBlockedScan(b, actionsHtml) {
  const errs = (b && Array.isArray(b.errors) && b.errors.length ? b.errors : [b && b.reason ? b.reason : "contract violation"]);
  return `
    <div class="gate">
      <div class="draft__cue">◆ &nbsp;BLUE ROOM · SCAN BLOCKED</div>

      <section class="gatepanel gatepanel--blocked">
        <header class="gatepanel__head">
          <span class="gatepanel__title">${esc((b && b.title) || "Scan blocked")}</span>
          <span class="gatepanel__tag"><span class="gatepanel__dot gatepanel__dot--block" aria-hidden="true"></span>Blocked</span>
        </header>

        <p class="gatepanel__lead">${esc((b && b.message) || "This result did not pass the BLUE ROOM scan contract.")}</p>

        <ul class="gateblock__errs">
          ${errs.map((e) => `<li>${esc(String(e))}</li>`).join("")}
        </ul>

        <p class="gatepanel__ready">No card, no stats, no oracle, no receipts were produced.</p>
      </section>

      ${actionsHtml || `<div class="gateactions">
        <button type="button" class="menu__enter" data-view-to="draft">Return to local draft</button>
        <button type="button" class="draft__sample" data-draft-pick>Replace image</button>
        <button type="button" class="draft__sample" data-view-to="room">Enter sample scan room</button>
        <button type="button" class="draft__back" data-view-to="menu">Main menu</button>
      </div>`}
    </div>`;
}

/* ---------- DEV HARNESS: uploaded-scan-result renderer (dev route only) ----------
   Reachable ONLY via ?dev=uploaded-result | ?dev=uploaded-blocked. Renders a
   VALIDATED dev fixture — never a real user scan, never the local draft, never
   any AI output. It ALWAYS runs the contract validator first: an invalid
   fixture renders the safe blocked state, so an invalid result can never
   display as a valid card. Every surface is labelled DEV HARNESS / NOT USER SCAN. */

function mountDev() {
  const C = window.BlueRoomScanContract;
  const F = (C && C.DEV_FIXTURES) || {};
  if (state.dev === "halo-gate") {
    document.getElementById("devView").innerHTML = renderHaloGateMock();
    return;
  }
  if (state.dev === "free-scan-sim") {
    const simFixture = F.validFreeSimulationResult || F.validDevRendererResult;
    document.getElementById("devView").innerHTML = renderUploadedScanResultDev(simFixture, { mode: "free-scan-sim" });
    return;
  }
  const result = state.dev === "uploaded-blocked"
    ? F.invalidAttractivenessResult
    : (F.validDevRendererResult || F.validMinimalFutureResult);
  document.getElementById("devView").innerHTML = renderUploadedScanResultDev(result);
}

function renderUploadedScanResultDev(result, opts) {
  opts = opts || {};
  const sim = opts.mode === "free-scan-sim"; // Free Scan Simulation route
  const C = window.BlueRoomScanContract;
  if (!C || typeof C.validateUploadedScanResult !== "function") {
    return `<div class="dev"><p class="uploadeddev__tag">◆ DEV HARNESS — scan-contract.js not loaded</p></div>`;
  }
  const v = C.validateUploadedScanResult(result);

  /* invalid fixture → the safe blocked state (no card / stats / oracle).
     The dev route has no local draft, so it supplies harness-scoped return
     actions (room / menu) instead of the draft-oriented defaults. */
  if (!v.ok) {
    const blocked = C.createBlockedScanState("dev harness · fixture failed validation", v.errors);
    const devActions = `
        <div class="gateactions">
          <button type="button" class="draft__sample" data-view-to="room">Enter sample scan room</button>
          <button type="button" class="draft__back" data-view-to="menu">Main menu</button>
        </div>`;
    return `
      <div class="dev">
        <p class="uploadeddev__tag uploadeddev__tag--block">◆ ${sim ? "DEV SIMULATION · NOT REAL ANALYSIS · BLOCKED FIXTURE" : "DEV HARNESS · NOT USER SCAN · BLOCKED FIXTURE"}</p>
        ${renderBlockedScan(blocked, devActions)}
      </div>`;
  }

  /* Free Pull Layout Mock v1 — the ?dev=free-scan-sim route renders the
     validated fixture as ONE landscape collectible artifact (split slab),
     not the debug stack. The uploaded-result / uploaded-blocked routes keep
     the original layout below, untouched. */
  if (sim) return renderFreePullMock(result);

  const r = result;
  const a = r.artifact || {};
  const src = r.source || {};
  const fv = (r.stats && r.stats.freeVisible) || {};
  const hx = (r.stats && r.stats.haloExtended) || {};
  const rd = r.readings || {};
  const sf = r.safetyFlags || {};
  const gate = r.gate || {};

  /* INTENTIONAL (dev harness only): the ?dev=uploaded-result renderer keeps the
     legacy Presence/Frame/Signal/Charge + Visual Impact labels and 0-100 numbers
     to exercise the legacy render path. Artifact Language Stabilization v1 does
     NOT migrate this strictly-dev, "NOT USER SCAN" route (see DECISION_LOG
     2026-06-13). The sample room and ?dev=free-scan-sim use artifact-safe tier
     bands instead. */
  const stat = (name, val) =>
    `<div class="uploadeddev__stat"><span class="uploadeddev__statname">${esc(name)}</span><span class="uploadeddev__statval">${val == null ? "—" : esc(String(val))}</span></div>`;
  const ext = (label, o) =>
    o && typeof o === "object"
      ? `<div class="uploadeddev__stat"><span class="uploadeddev__statname">${esc(label)}</span><span class="uploadeddev__statval">${esc(String(o.value))}${o.label ? " · " + esc(o.label) : ""}</span></div>`
      : "";

  /* tier row — public tier band + a 5-segment bar; NO exact 0–100 number. */
  const tierRow = (s) => {
    const bars = Math.max(0, Math.min(5, Number(s.bars) || 0));
    const meter = `<span class="uploadeddev__tbon">${"▰".repeat(bars)}</span><span class="uploadeddev__tboff">${"▱".repeat(5 - bars)}</span>`;
    return `<div class="uploadeddev__tier"><span class="uploadeddev__tname">${esc(s.label)}</span><span class="uploadeddev__tband">${esc(s.tier)}</span><span class="uploadeddev__tbar" aria-hidden="true">${meter}</span></div>`;
  };
  const statsBlock = Array.isArray(r.publicStats) && r.publicStats.length
    ? `<div class="uploadeddev__plate">
         <div class="uploadeddev__head">Public stats · tier bands</div>
         <div class="uploadeddev__tiers">${r.publicStats.map(tierRow).join("")}</div>
         ${sim ? `<p class="uploadeddev__sealed">Halo Mint develops the deeper read — sealed in this Free preview (dev).</p>` : ""}
         <p class="uploadeddev__cap">tier bands of the image artifact — not exact scores, not the person</p>
       </div>`
    : `<div class="uploadeddev__plate">
         <div class="uploadeddev__head">Visible stats</div>
         <div class="uploadeddev__stats">${stat("Presence", fv.presence)}${stat("Frame", fv.frame)}${stat("Signal", fv.signal)}${stat("Charge", fv.charge)}</div>
         ${sim
           ? `<p class="uploadeddev__sealed">Halo Mint develops the deeper read — sealed in this Free preview (dev).</p>`
           : (hx.loreDensity || hx.fitCoherence || hx.stanceRead || hx.visualImpact
             ? `<div class="uploadeddev__head uploadeddev__head--sub">Extended stats</div>
                <div class="uploadeddev__stats">${ext("Lore Density", hx.loreDensity)}${ext("Fit Coherence", hx.fitCoherence)}${ext("Stance Read", hx.stanceRead)}${ext("Visual Impact", hx.visualImpact)}</div>`
             : "")}
         <p class="uploadeddev__cap">presentation scores of the image artifact — not the person</p>
       </div>`;

  const readingsBlock = rd.freeSummary || rd.haloDossier || rd.oracle
    ? `<div class="uploadeddev__plate">
         <div class="uploadeddev__head">Readings</div>
         ${rd.freeSummary ? `<p class="uploadeddev__read"><b>Free</b> — ${esc(rd.freeSummary)}</p>` : ""}
         ${rd.haloDossier ? `<p class="uploadeddev__read"><b>Halo</b> — ${esc(rd.haloDossier)}</p>` : ""}
         ${rd.oracle ? `<p class="uploadeddev__read uploadeddev__read--oracle">“${esc(rd.oracle)}”</p>` : ""}
       </div>`
    : "";

  const eb = Array.isArray(r.evidenceBoard) ? r.evidenceBoard : [];
  const grounded = eb.some((e) => e.observedCue || e.artifactEffect);
  const receiptsBlock = eb.length
    ? `<div class="uploadeddev__plate">
         <div class="uploadeddev__head">${grounded ? "Grounded receipts" : "Evidence board"}</div>
         ${eb
           .map((e) =>
             e.observedCue || e.artifactEffect
               ? `<div class="uploadeddev__receipt">
           <div class="uploadeddev__rectop"><span class="uploadeddev__lens">${esc(e.lens)} Lens</span><span class="uploadeddev__conf">${esc(e.confidence)}</span></div>
           <p class="uploadeddev__ground">${esc(e.observedCue || e.observation)} <span class="uploadeddev__arrow">→</span> ${esc(e.artifactEffect || e.effect)}</p>
         </div>`
               : `<div class="uploadeddev__receipt">
           <div class="uploadeddev__rectop"><span class="uploadeddev__lens">${esc(e.lens)}</span><span class="uploadeddev__effect">${esc(e.effect)}</span><span class="uploadeddev__conf">${esc(e.confidence)}</span></div>
           <p class="uploadeddev__obs">${esc(e.observation)}</p>
           <span class="uploadeddev__rcue">cue · ${esc(e.visibleCue)}</span>
         </div>`)
           .join("")}
       </div>`
    : "";

  const flagsBlock = `
    <div class="uploadeddev__plate">
      <div class="uploadeddev__head">Safety flags &amp; schema</div>
      <div class="uploadeddev__flags">${Object.keys(sf)
        .map((k) => `<span class="uploadeddev__flag">${esc(k)}: ${sf[k] === false ? "false ✓" : esc(String(sf[k]))}</span>`)
        .join("")}</div>
      <dl class="uploadeddev__meta">
        <div><dt>kind</dt><dd>${esc(r.kind)}</dd></div>
        <div><dt>schemaVersion</dt><dd>${esc(r.schemaVersion)}</dd></div>
        <div><dt>status</dt><dd>${esc(r.status)}</dd></div>
        <div><dt>route</dt><dd>${esc(gate.route || "—")} · ${esc(gate.scanStatus || "—")}</dd></div>
        ${r.confidence ? `<div><dt>confidence</dt><dd>${esc(String(r.confidence.overall))} · ${esc(r.confidence.band || "")}</dd></div>` : ""}
      </dl>
    </div>`;

  /* CARD_LOGIC_V1 surfaces (rendered only when the fixture carries them, so
     the uploaded-result harness is unaffected). Image-only; no numbers. */
  const scopeBlock = r.scopeLine ? `<p class="uploadeddev__scope">◆ &nbsp;${esc(r.scopeLine)}</p>` : "";

  const sealedBlock = r.sealedStat
    ? `<div class="uploadeddev__plate">
         <div class="uploadeddev__head">Sealed stat</div>
         <p class="uploadeddev__seallabel">${esc(r.sealedStat.label || "—")}<span class="uploadeddev__sealreason">${esc(r.sealedStat.reasonType || "")}</span><span class="uploadeddev__seallock">SEALED</span></p>
         ${r.sealedStat.teaser ? `<p class="uploadeddev__read">${esc(r.sealedStat.teaser)}</p>` : ""}
       </div>`
    : "";

  const rarityBlock = r.rarity
    ? `<div class="uploadeddev__plate">
         <div class="uploadeddev__head">Rarity</div>
         <p class="uploadeddev__rarity"><span class="uploadeddev__rband">${esc(r.rarity.band || "—")}</span>${r.rarity.print ? `<span class="uploadeddev__rprint">${esc(r.rarity.print)}</span>` : ""}</p>
         ${r.rarity.reason ? `<p class="uploadeddev__read">${esc(r.rarity.reason)}</p>` : ""}
         ${r.rarity.qualityNeutral ? `<p class="uploadeddev__cap">${esc(r.rarity.qualityNeutral)}</p>` : ""}
       </div>`
    : "";

  const rm = r.reframeMap;
  const reframeBlock = rm
    ? `<div class="uploadeddev__plate">
         <div class="uploadeddev__head">Reframe Map · image changes only</div>
         ${rm.current ? `<p class="uploadeddev__read"><b>Now</b> — ${esc(rm.current)}</p>` : ""}
         ${Array.isArray(rm.whyThisCard) && rm.whyThisCard.length ? `<ul class="uploadeddev__why">${rm.whyThisCard.map((w) => `<li>${esc(w)}</li>`).join("")}</ul>` : ""}
         ${Array.isArray(rm.levers) ? rm.levers.map((l) => `
         <div class="uploadeddev__lever"><span class="uploadeddev__levlabel">${esc(l.label || "")}</span><p class="uploadeddev__levchange">${esc(l.change || "")}</p><span class="uploadeddev__leveffect">${esc(l.effect || "")}</span></div>`).join("") : ""}
         ${Array.isArray(rm.setupCard) && rm.setupCard.length ? `<div class="uploadeddev__setup"><span class="uploadeddev__head uploadeddev__head--sub">Setup card · re-shoot, re-scan</span><ol>${rm.setupCard.map((s) => `<li>${esc(s)}</li>`).join("")}</ol></div>` : ""}
       </div>`
    : "";

  /* Free Scan Simulation chrome: a triple-labelled banner + a STATIC
     stepper (no progress bar implying real processing). Each step also
     carries one of the DEV SIMULATION / NOT REAL ANALYSIS / NOT USER SCAN
     labels. The preview below is a VALIDATED fixture, never a user scan. */
  const simHead = sim
    ? `
      <p class="uploadeddev__tag uploadeddev__tag--sim">◆ DEV SIMULATION · NOT REAL ANALYSIS · NOT USER SCAN</p>
      <p class="freesim__heading">FREE SCAN SIMULATION · DEV ONLY · NOT REAL ANALYSIS</p>
      <ol class="freesim__steps">
        <li class="freesim__step"><span class="freesim__num">1</span><div class="freesim__body"><b>Local draft staged</b><span>No real image analysis. <em>DEV SIMULATION</em></span></div></li>
        <li class="freesim__step"><span class="freesim__num">2</span><div class="freesim__body"><b>Scan development simulated</b><span>Contract validator runs against the fixture only. <em>NOT REAL ANALYSIS</em></span></div></li>
        <li class="freesim__step freesim__step--now"><span class="freesim__num">3</span><div class="freesim__body"><b>Free result preview</b><span>Validated fixture render below. <em>NOT USER SCAN</em></span></div></li>
      </ol>`
    : "";

  return `
    <div class="dev uploadeddev">
      ${sim ? simHead : `<p class="uploadeddev__tag">◆ DEV HARNESS · NOT USER SCAN · VALIDATED FIXTURE</p>`}

      <article class="uploadeddev__card">
        <header class="uploadeddev__cardhead">
          <span class="uploadeddev__house">◆ ${sim ? "BLUE ROOM · FREE SCAN (DEV SIM)" : "BLUE ROOM ARCHIVE · UPLOADED (DEV)"}</span>
          <span class="uploadeddev__state">${sim ? "DEV SIM" : "DEV HARNESS"}</span>
        </header>
        <h2 class="uploadeddev__title">${esc(a.title || "—")}</h2>
        <p class="uploadeddev__arch">◆ &nbsp;${esc(a.archetypeClass || "—")} &nbsp;· ${esc(a.rarity || "—")} · ${esc(a.editionLabel || "—")}</p>
        <p class="uploadeddev__file">${esc(src.fileType || "IMG")} · ${esc(src.fileSize || "—")} · ${esc(src.fileLabel || "—")}</p>
      </article>

      ${scopeBlock}${statsBlock}${readingsBlock}${receiptsBlock}${sealedBlock}${rarityBlock}${reframeBlock}${flagsBlock}

      <div class="gateactions">
        <button type="button" class="draft__sample" data-view-to="room">Enter sample scan room</button>
        <button type="button" class="draft__back" data-view-to="menu">Main menu</button>
      </div>

      <p class="uploadeddev__foot">${sim
        ? "DEV SIMULATION · NOT REAL ANALYSIS · NOT USER SCAN · no AI · no user photo analyzed"
        : "DEV HARNESS · generated from BlueRoomScanContract.DEV_FIXTURES · not a real scan · no AI · no user photo analyzed"}</p>
    </div>`;
}

/* ---------- Free Pull Layout Mock v1 (dev sim route only) ----------
   Renders the ?dev=free-scan-sim fixture as ONE landscape collectible
   artifact per docs/FREE_PULL_SCREENSHOT_LAYOUT_V1.md: a graded image slab
   window (left, ~52%) + a certification / stat-board label (right, ~48%),
   with segmented tier notches (no 0–100 numbers), grounded receipt chips,
   a SHAPE-ONLY sealed vault (the Reframe Map never expands on Free — only
   counts), a quiet scope line, and a calm Halo seal edge (not a SaaS button
   stack). A small persistent dev rail keeps DEV SIMULATION / NOT REAL
   ANALYSIS / NOT USER SCAN visible without a giant warning block.

   The slab image is a SAMPLE asset (SOURCES[0]) used only as a clearly
   labelled dev stand-in — never a real uploaded or analyzed user photo.
   No payment, no Halo unlock, no AI. The fixture is already validated by
   the caller before this runs. */

/* Public tier ladder — Muted/Clean/Strong/Charged/Peak (Artifact Language
   Stabilization v1; matches the sample-room tierBand() ladder). Derived from
   the public bar count so no internal 0–100 number can leak. */
const FP_TIER_LADDER = ["Muted", "Clean", "Strong", "Charged", "Peak"];
function fpTierLabel(stat) {
  const b = Math.max(0, Math.min(5, Number(stat && stat.bars) || 0));
  return FP_TIER_LADDER[Math.max(0, b - 1)] || "Muted";
}

function renderFreePullMock(result) {
  const r = result || {};
  const a = r.artifact || {};
  const ps = Array.isArray(r.publicStats) ? r.publicStats : [];
  const eb = Array.isArray(r.evidenceBoard) ? r.evidenceBoard : [];

  /* sample stand-in image + its tuning/material (dev stand-in only) */
  const s0 = (typeof SOURCES !== "undefined" && SOURCES[0]) ? SOURCES[0] : null;
  const pt = (s0 && s0.photoTuning) || { pos: "50% 45%", zoom: 1, scrim: 0.12, base: { bright: 1, contrast: 1, sat: 1 } };
  const imgFile = s0 ? s0.file : "";
  const halo = (s0 && s0.halo) || { a: "#c98a5e", b: "#8b7bff", c: "#e8b27d", material: "Warm Glass Copper" };

  /* 4 public tier rows — segmented notches, never a 0–100 number */
  const tierRows = ps
    .map((st) => {
      const bars = Math.max(0, Math.min(5, Number(st.bars) || 0));
      const notches = Array.from({ length: 5 }, (_, i) => `<span class="fpcard__notch ${i < bars ? "is-on" : ""}"></span>`).join("");
      return `
      <div class="fpcard__tier">
        <span class="fpcard__tname">${esc(st.label)}</span>
        <span class="fpcard__tband">${esc(fpTierLabel(st))}</span>
        <span class="fpcard__notches" aria-hidden="true">${notches}</span>
      </div>`;
    })
    .join("");

  /* Max 2 grounded receipt chips (cue → effect), contact-sheet annotations.
     Prefer the short chipCue/chipEffect headline when present, else fall back
     to the longer observedCue/artifactEffect. Keeps chips one-line. */
  const chips = eb
    .filter((e) => e.observedCue && e.artifactEffect)
    .slice(0, 2)
    .map((e) => {
      const cue = e.chipCue || e.observedCue;
      const eff = e.chipEffect || e.artifactEffect;
      return `
      <div class="fpcard__chip">
        <span class="fpcard__chipcue">${esc(cue)}</span>
        <span class="fpcard__chiparrow" aria-hidden="true">→</span>
        <span class="fpcard__chipeff">${esc(eff)}</span>
      </div>`;
    })
    .join("");

  /* sealed-back hint — QUALITATIVE only (Halo Gate Boundary Lock v1 §B): the
     Free front states that a sealed back exists, never an exact locked count
     or an enumerated module inventory. Real contents open only post-unlock. */
  const vault = `
      <div class="fpcard__vault">
        <div class="fpcard__vaulthead">
          <span class="fpcard__vaultmark" aria-hidden="true">◇</span>Sealed back
          <span class="fpcard__vaulttag">in conservation</span>
        </div>
        <p class="fpcard__vreason">This card has a sealed back. The dossier layer is archived — additional production notes held in conservation.</p>
        <span class="fpcard__vsealed">Back face sealed · opens with Halo</span>
      </div>`;

  const scope = `<p class="fpcard__scope">◆ &nbsp;${esc(
    r.scopeLine || "This reads the image artifact — frame, light, styling, setting, gesture — not the person."
  )}</p>`;

  /* calm Halo seal edge — part of the artifact edge, never a button stack */
  const haloEdge = `
      <div class="fpcard__halo">
        <span class="fpcard__haloweld" aria-hidden="true"></span>
        <span class="fpcard__halotext">This card has a sealed back · Halo dossier sealed</span>
        <span class="fpcard__halonote">The front is already complete</span>
      </div>`;

  return `
    <div class="dev fpwrap">
      <div class="fprail">
        <span class="fprail__dot" aria-hidden="true"></span>
        <span class="fprail__txt">DEV SIMULATION · NOT REAL ANALYSIS · NOT USER SCAN</span>
        <span class="fprail__id">FREE PULL MOCK · DEV</span>
      </div>

      <article class="fpcard" data-material="${esc(halo.material)}"
        style="--halo-a:${esc(halo.a)}; --halo-b:${esc(halo.b)}; --halo-c:${esc(halo.c)};">
        <span class="fpcard__weld" aria-hidden="true"></span>
        <div class="fpcard__grid">

          <figure class="fpcard__window" data-imgwrap
            style="--pos:${esc(pt.pos)}; --zoom:${pt.zoom}; --scrim:${pt.scrim}; --b:${pt.base.bright}; --c:${pt.base.contrast}; --s:${pt.base.sat};">
            ${imgOrPlaceholder(imgFile, "fpcard__img")}
            <span class="fpcard__scrim"></span>
            <span class="fpcard__shimmer" aria-hidden="true"></span>
            <span class="fpcard__hairline" aria-hidden="true"></span>
            <span class="fpcard__edition">◆ FREE PULL · DEV SIM</span>
            <figcaption class="fpcard__caption">
              <h2 class="fpcard__title">${esc(a.title || "—")}</h2>
              <span class="fpcard__certid">ARTIFACT ID · BR-FP-DEV-0001 · ${esc(a.rarity || "free")}</span>
            </figcaption>
          </figure>

          <div class="fpcard__label">
            <header class="fpcard__labelhead">
              <span class="fpcard__house">◆ BLUE ROOM · ARTIFACT CERTIFICATION</span>
              <span class="fpcard__arch">${esc(a.archetypeClass || "—")}</span>
              <span class="fpcard__archsub">artifact archetype · a photo role, not a person</span>
            </header>

            <div class="fpcard__tiers">${tierRows}</div>
            <div class="fpcard__chips">${chips}</div>
            ${vault}
            ${scope}
            ${haloEdge}
          </div>
        </div>
      </article>

      <div class="gateactions">
        <button type="button" class="draft__sample" data-view-to="room">Enter sample scan room</button>
        <button type="button" class="draft__back" data-view-to="menu">Main menu</button>
      </div>

      <p class="fpwrap__foot">DEV SIMULATION · NOT REAL ANALYSIS · NOT USER SCAN · sample image used as a dev stand-in · no AI · no user photo analyzed</p>
    </div>`;
}

/* ---------- Halo Gate Dev Mock v1 (dev route only) ----------
   A dev-only MOCK of the sealed card-back / dossier chamber, bound by
   docs/halo/HALO_GATE_BOUNDARY_V1.md. It is NOT payment, NOT unlock logic,
   NOT AI/backend/upload analysis, NOT a real user result. It shows ZERO
   analysis data — only the sealed-back metaphor and qualitative depth hints
   (no exact locked counts, no module inventory). Free Pull stays the complete
   card front; Halo is the sealed back, not a hidden score. Left = sealed
   card-back slab; right = dossier gate panel. The "Open Halo Dossier" CTA is
   permanently disabled (no payment / no unlock exists). */
function renderHaloGateMock() {
  /* material identity reused from the sample (a dev stand-in), so the sealed
     back carries the same restrained material weld/shimmer as the Free front. */
  const s0 = (typeof SOURCES !== "undefined" && SOURCES[0]) ? SOURCES[0] : null;
  const halo = (s0 && s0.halo) || { a: "#c98a5e", b: "#8b7bff", c: "#e8b27d", material: "Warm Glass Copper" };

  /* qualitative sealed-back rows — categories, never counts or named modules
     (Halo Gate Boundary Lock v1 §C allowed list). */
  const sealRows = ["Production notes sealed", "Variant routes sealed", "Back face archived · conservation seal intact"]
    .map((t) => `<div class="halogate__sealrow"><span class="halogate__sealmark" aria-hidden="true">◇</span>${esc(t)}</div>`)
    .join("");

  return `
    <div class="dev halogate">
      <div class="fprail halogate__rail">
        <span class="fprail__dot" aria-hidden="true"></span>
        <span class="fprail__txt">DEV MOCK · NOT PAYMENT · NOT REAL ANALYSIS</span>
        <span class="fprail__id">HALO GATE · DEV</span>
      </div>

      <article class="halogate__card" data-material="${esc(halo.material)}"
        style="--halo-a:${esc(halo.a)}; --halo-b:${esc(halo.b)}; --halo-c:${esc(halo.c)};">
        <span class="halogate__weld" aria-hidden="true"></span>
        <div class="halogate__grid">

          <figure class="halogate__back" aria-label="Sealed card back">
            <span class="halogate__backgrain" aria-hidden="true"></span>
            <span class="halogate__shimmer" aria-hidden="true"></span>
            <span class="halogate__backhouse">◆ BLUE ROOM ARCHIVE</span>
            <span class="halogate__seal" aria-hidden="true">◈<span class="halogate__sealring"></span></span>
            <figcaption class="halogate__backcap">
              <span class="halogate__backtitle">BACK FACE · ARCHIVED</span>
              <span class="halogate__backid">DOSSIER LAYER · HELD IN CONSERVATION</span>
            </figcaption>
          </figure>

          <div class="halogate__panel">
            <header class="halogate__head">
              <span class="halogate__kicker">◆ HALO DOSSIER</span>
              <h2 class="halogate__title">THE BACK OF THIS CARD IS SEALED</h2>
              <p class="halogate__sub">The Free Pull is yours. The back is still closed.</p>
            </header>

            <div class="halogate__seals">${sealRows}</div>

            <p class="halogate__complete">The Free Pull card front is complete. Halo opens the sealed back of the same card — added depth, not a hidden result.</p>

            <div class="halogate__cta">
              <button type="button" class="halogate__open" disabled aria-disabled="true">Open Halo Dossier · dev mock — no payment</button>
              <button type="button" class="halogate__keep" data-view-to="room">Keep Free Pull</button>
            </div>

            <p class="halogate__scope">◆ &nbsp;This reads the image artifact — frame, light, styling, setting, gesture — not the person.</p>
          </div>
        </div>
      </article>

      <div class="gateactions">
        <button type="button" class="draft__sample" data-view-to="room">Enter sample scan room</button>
        <button type="button" class="draft__back" data-view-to="menu">Main menu</button>
      </div>

      <p class="halogate__foot">DEV MOCK · NOT PAYMENT · NOT REAL ANALYSIS · no AI · no user photo analyzed · Free Pull stays complete; Halo is the sealed back, not a hidden score.</p>
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
if (state.view === "dev") mountDev();
render();
