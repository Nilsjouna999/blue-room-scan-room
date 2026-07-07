/* =============================================================
   Scan Room — desktop three-column renderer.
   Left: source + frame analysis. Center: the card (trophy).
   Right: reading modules + paid unlock preview.
   One master card base; treatments restyle, never re-layout.
============================================================= */

/* =============================================================
   SECTION MAP — one file, no modules. Grep a function name to jump.
   Full grain + line refs: docs/map/04_CODE_MAP.md.

   CORE SEAM (audit v1): getScanResult() is the SINGLE read boundary.
   Renderers consume the legacy SOURCES shape with a v2 overlay
   (getScanResult(src)?.x || legacy src.x). The future uploaded-v1
   engine wires in HERE via one adapter (uploaded-v1 -> render-model)
   — do not scatter engine reads through the render functions.

   helpers       esc · pad2 · STAT_LABELS/statLabel · tierBand
   state+routing state{} · URL-param parse · DEVNAV gate
   scan access   getScanResult · getActiveScan · getTierOutput   (the seam)
   shared        moduleHead · imgOrPlaceholder
   left panel    renderLeftPanel · renderSourceTab · renderDiagramTab · renderMetricsTab · mountMetricsReel
   center card   renderCard
   right panel   lockedModule · renderReadingPanel
   dossier       dplate · renderDossier   (7 plates)
   menu          renderMenu · mountMenu
   devnav        renderDevnav
   draft/gate    renderDraft · renderGate · renderBlockedScan · loadDraftFile
   dev harness   mountDev · renderUploadedScanResultDev · renderFreePullMock · renderHaloGateMock
   master paint  render
   handlers      applyView · keydown · delegated [data-*] listeners
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
  visualImpact: "Visual Impact",
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

const state ={ source: 0, treatment: "free", tab: "diagram", view: "menu", draftGate: false, dev: null, labMaterial: null, diagramView: "annotated" };

/* Deep-link support: ?src=1|2&t=free|shiny|mint&tab=source|diagram|metrics
   (used by reviewers and the screenshot pipeline). Any of these params
   means the visitor is addressing a specific scan-room state, so skip the
   front-door menu and open the room directly — deep links never see it. */
{
  const q = new URLSearchParams(location.search);
  const s = parseInt(q.get("src"), 10);
  if (s >= 1 && s <= SOURCES.length) state.source = s - 1;
  if (["free", "shiny", "mint"].includes(q.get("t"))) state.treatment = q.get("t");
  /* Source is its own tab again (BR-S115): the original photo, viewable whole. */
  const tabParam = q.get("tab");
  if (["source", "diagram", "metrics"].includes(tabParam)) state.tab = tabParam;
  if (["clean", "annotated"].includes(q.get("dv"))) state.diagramView = q.get("dv");
  /* Lab material study (CARD_TECH_LAB §20) — reproducible-capture deep link.
     Applies ONLY in the Lab state (t=mint); ignored otherwise. Does not, on its
     own, open the room — only t/src/tab do that (below). */
  if (q.get("t") === "mint" && ["cold-foil", "black-star", "night-gloss"].includes(q.get("lab"))) state.labMaterial = q.get("lab");
  /* Dev-only harness route (NOT a product feature): ?dev=uploaded-result |
     uploaded-blocked renders a validated DEV fixture, never a user scan.
     free-scan-sim = Free Pull mock · halo-gate = sealed card-back mock. */
  const dev = q.get("dev");
  if (["uploaded-result", "uploaded-blocked", "free-scan-sim", "halo-gate", "before-after", "review-map", "proto-cards", "staged-reveal", "menu-reveal", "vault", "arcane"].includes(dev)) { state.view = "dev"; state.dev = dev; }
  else if (q.has("src") || q.has("t") || q.has("tab")) state.view = "room";
}

/* DEV NAV gate — the dev-only state-jumper rail (renderDevnav) is revealed ONLY
   when the URL carries ?devnav=1. Defense-in-depth: this flag also sets
   body[data-devnav="1"], and the CSS keeps .devnav display:none without it, so
   the rail can never paint for a real user. Pure dev tooling — no product effect. */
const DEVNAV = new URLSearchParams(location.search).has("devnav");

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

/* Diagram Notes: split a marking string into term + qualifier on the first
   separator, for the dotted-leader rows (term ···· QUALIFIER). */
function diagSplit(str) {
  for (const sep of [" — ", " · ", ": "]) {
    const i = str.indexOf(sep);
    if (i !== -1) return { term: str.slice(0, i), qual: str.slice(i + sep.length) };
  }
  return { term: str, qual: "" };
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
  const t2 = ["source", "diagram", "metrics"].includes(tab) ? tab : "diagram";
  const tabbar = `
    <div class="tabbar" role="tablist" aria-label="Analysis tabs">
      ${["source", "diagram", "metrics"]
        .map(
          (t) =>
            `<button type="button" class="tabbar__btn ${t === t2 ? "is-active" : ""}" data-tab="${t}">${
              t[0].toUpperCase() + t.slice(1)
            }</button>`
        )
        .join("")}
    </div>`;
  const body = t2 === "metrics" ? renderMetricsTab(src, treatment)
    : t2 === "source" ? renderSourceTab(src, treatment)
    : renderDiagramTab(src, treatment);
  /* pin the Diagram|Metrics nav, scroll only the evidence body (CSS scoped to
     .panel--source) so Diagram stays reachable on short viewports — BR-S071 */
  return `<div class="panel__nav">${tabbar}</div><div class="panel__scroll">${body}</div>`;
}

/* ---------- tab 1: diagram (visual scan sheet — Source merged in BR-S044:
   CLEAN = raw photo + numbered markers + legend; ANNOTATED = overlays) ---------- */

/* Lines/shapes live in a stretched SVG (viewBox 0..100 both axes,
   preserveAspectRatio none) with non-scaling strokes; labels are
   HTML spans positioned by % so text never distorts. */
function renderDiagramTab(src, treatment) {
  const full = treatment !== "free";
  const d = src.diagram;
  const focal = src.markers[0];
  const clean = false; // BR-S115: Diagram is always annotated; the clean/original view moved to the Source tab
  const markers = src.markers
    .map((m, i) => `<span class="marker" style="left:${m.x}%; top:${m.y}%;"><span class="marker__ring"></span><span class="marker__no">${i + 1}</span></span>`)
    .join("");
  const horizon = src.horizon == null ? "" : `<span class="horizonline" style="top:${src.horizon}%"></span>`;
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
      <div class="diagwrap ${clean ? "is-clean" : ""}">
        <div class="scanframe scanframe--diagram" data-imgwrap>
          ${imgOrPlaceholder(src.file, "scanframe__img")}
          <span class="scanframe__corners"></span>
          ${horizon}
          ${markers}
          <svg class="diagsvg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${svg}</svg>
          <span class="diaglabels">${labels}</span>
          <span class="scanframe__meta scanframe__meta--tl">${clean ? `BR-SRC ${pad2(src.no)}` : `SCAN SHEET ${pad2(src.no)}`}</span>
          <span class="scanframe__meta scanframe__meta--br">${esc(src.capture.code)}</span>
          <span class="scanframe__meta scanframe__meta--bl">${esc(src.capture.lens)} · ${esc(src.capture.light)}</span>
        </div>
        <ul class="markerlegend">
          ${src.markers.map((m, i) => `<li><span class="markerlegend__no">${i + 1}</span>${esc(m.label)}</li>`).join("")}
        </ul>
      </div>
      ${devnote}
    </div>

    <div class="module">
      ${moduleHead("Diagram Notes")}
      <div class="dnotes">
        <div class="dnotes__blk">
          <div class="dnotes__hd"><span class="dnotes__lab">Frame Read</span><span class="dnotes__ln"></span><span class="dnotes__tag">DERIVED</span></div>
          ${src.analysis.map((n, i) => { const p = diagSplit(n); return `<div class="dnotes__row"><span class="dnotes__idx">${String(i + 1).padStart(2, "0")}</span><span class="dnotes__term">${esc(p.term)}</span><span class="dnotes__lead"></span><span class="dnotes__qual">${esc(p.qual)}</span></div>`; }).join("")}
        </div>
        <div class="dnotes__blk dnotes__blk--mark">
          <div class="dnotes__hd"><span class="dnotes__lab">Overlay Markings</span><span class="dnotes__ln"></span><span class="dnotes__tag">ON SHEET</span></div>
          ${d.notes.map((n) => { const p = diagSplit(n); return `<div class="dnotes__row"><span class="dnotes__dia">◇</span><span class="dnotes__term">${esc(p.term)}</span><span class="dnotes__lead"></span><span class="dnotes__qual">${esc(p.qual)}</span></div>`; }).join("")}
        </div>
      </div>
    </div>`;
}

/* ---------- tab: source (the original photo, whole — clean, no overlays;
   click to open it full in a centred lightbox. BR-S115) ---------- */
function renderSourceTab(src) {
  return `
    <div class="module srcview">
      ${moduleHead(`${src.label} — Source`)}
      <button type="button" class="srcphoto" data-imgwrap data-lightbox-open data-lightbox-src="${esc(src.file)}" aria-label="View the original photo full size">
        ${imgOrPlaceholder(src.file, "srcphoto__img")}
        <span class="srcphoto__hint" aria-hidden="true">⤢ view full</span>
      </button>
    </div>`;
}

/* ---------- tab: metrics (4-plate diagnostic read — Frame Signature ·
   Signal Mix · Composition Field · Frame Event). Frame Signature is a
   silhouette-not-score; Signal Mix stays a proportion-of-a-whole; tier
   words are labels, never 0-100. All values hand-authored per card
   (src.frame + card.title/archetype/note + sceneRole + aura + signalMix). ---------- */
const MET_TIER_FILL = { Peak: 5, Charged: 4, Strong: 3, Clean: 2, Muted: 1 };
function metRgba(hex, a) {
  const h = hex.replace("#", "");
  return `rgba(${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)},${a})`;
}
function metMatText(mat) { return `color-mix(in srgb, ${mat} 72%, var(--silver))`; }
function metSmoothPath(radii, cx, cy, R) {
  const n = radii.length;
  const pts = radii.map((r, i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / n; return [cx + R * r * Math.cos(a), cy + R * r * Math.sin(a)]; });
  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)} `;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)} `;
  }
  return d + "Z";
}
function metTier(name, tier, mat) {
  const fill = MET_TIER_FILL[tier] || 3;
  const segs = Array.from({ length: 5 }, (_, i) => `<span class="met-tier__seg" style="${i < fill ? `background:${metRgba(mat, 0.85)};` : ""}"></span>`).join("");
  return `<div class="met-tier"><div class="met-tier__top"><span class="met-tier__n">${esc(name)}</span><span class="met-tier__v" style="color:${metMatText(mat)};">${esc(tier)}</span></div><div class="met-tier__meter">${segs}</div></div>`;
}
function metPlate(no, title, mat, body) {
  return `<section class="met-plate" style="border-left-color:${metRgba(mat, 0.3)};"><header class="met-plate__h"><span class="met-plate__no">${no}</span><h3 class="met-plate__t">${esc(title)}</h3></header>${body}</section>`;
}

function renderMetricsTab(src, treatment) {
  const fr = src.frame;
  const c = src.card;
  const mat = src.halo.a;
  const mt = metMatText(mat);
  /* Defensive: sources without an authored frame block (not yet live) get a notice
     rather than a crash. The two live sources (Driver · Ice Field) carry full data. */
  if (!fr) return `<p class="metriccap metriccap--head">Diagnostic read develops for this source.</p>`;

  /* 01 — Frame Signature (silhouette, not score) */
  const glyph = metSmoothPath(fr.signature.radii, 130, 120, 100);
  const rings = [20, 40, 60, 80, 100].map((r) => `<circle cx="130" cy="120" r="${r}" fill="none" stroke="rgba(233,229,220,${r === 100 ? 0.12 : r >= 60 ? 0.08 : 0.07})" stroke-width="1"/>`).join("");
  const sig = metPlate("01", "Frame Signature", mat, `
    <p class="met-lede">This photograph's signature shape — its gestalt, not five numbers. The silhouette is the read: where it reaches toward the outer ring the frame carries, where it pulls inward it withholds.</p>
    <div class="met-sig">
      <svg viewBox="0 0 260 240" class="met-sig__svg" aria-hidden="true">${rings}
        <text x="130" y="16" text-anchor="middle" class="met-svglab">PEAK</text>
        <text x="130" y="116" text-anchor="middle" class="met-svglab met-svglab--mid">MUTED</text>
        <g class="met-anim">
          <path d="${glyph}" fill="none" stroke="${metRgba(mat, 0.22)}" stroke-width="7" stroke-linejoin="round"/>
          <path d="${glyph}" fill="${metRgba(mat, 0.2)}" stroke="${mat}" stroke-width="2.1" stroke-linejoin="round"/>
          <circle cx="130" cy="120" r="1.6" fill="var(--t-ghost)"/>
        </g>
      </svg>
      <div class="met-sig__side">
        <div><div class="met-kicker">Signature class</div><div class="met-sig__class">${esc(fr.signature.class)}</div></div>
        <p class="met-sig__note">${esc(fr.signature.note)}</p>
        <div class="met-sig__reach"><span class="met-kicker">Reach</span><span class="met-sig__band" style="color:${mt};">${esc(fr.signature.band)}</span></div>
      </div>
    </div>`);

  /* 02 — Signal Mix (proportion of a whole — the one plate that keeps numbers) */
  const mixSorted = src.metrics.signalMix.slice().sort((a, b) => b.v - a.v);
  const mixRows = mixSorted.map((mr) => `
    <div class="met-mix__row">
      <span class="met-mix__nm">${esc(mr.k)}</span>
      <span class="met-mix__track"><span class="met-mix__lead" style="left:calc(${mr.v}% + 8px);"></span><span class="met-mix__fill" style="width:${mr.v}%; background:${metRgba(mat, 0.55)};"></span></span>
      <span class="met-mix__pct">${mr.v}%</span>
    </div>`).join("");
  const mixPlate = metPlate("02", "Signal Mix", mat, `
    <p class="met-lede">Where the frame's signal comes from, ranked by share — the one instrument that keeps its numbers, because a proportion of a whole describes how the image is built, not how it scores.</p>
    <div>${mixRows}</div>`);

  /* 03 — Composition Field (drift node + tier bands) */
  const FRR = 86, ccx = 130, ccy = 120;
  const nx = +(ccx + fr.field.node.x * FRR).toFixed(2), ny = +(ccy + fr.field.node.y * FRR).toFixed(2);
  const nodePts = `${nx},${(ny - 6).toFixed(2)} ${(nx + 6).toFixed(2)},${ny} ${nx},${(ny + 6).toFixed(2)} ${(nx - 6).toFixed(2)},${ny}`;
  const field = metPlate("03", "Composition Field", mat, `
    <p class="met-lede">How the frame pushes the eye. The diamond marks the centre of visual weight; the line is its drift from a balanced frame — direction and pull, never a verdict.</p>
    <div class="met-field">
      <svg viewBox="0 0 260 240" class="met-field__svg" aria-hidden="true">
        <rect x="44" y="34" width="172" height="172" fill="none" stroke="var(--line)" rx="3"/>
        <line x1="130" y1="34" x2="130" y2="206" stroke="rgba(233,229,220,0.06)" stroke-width="1"/>
        <line x1="44" y1="120" x2="216" y2="120" stroke="rgba(233,229,220,0.06)" stroke-width="1"/>
        <circle cx="130" cy="120" r="43" fill="none" stroke="rgba(233,229,220,0.06)" stroke-width="1"/>
        <circle cx="130" cy="120" r="86" fill="none" stroke="rgba(233,229,220,0.045)" stroke-width="1"/>
        <text x="130" y="27" text-anchor="middle" class="met-svglab">LENS</text>
        <text x="130" y="220" text-anchor="middle" class="met-svglab">GROUND</text>
        <g class="met-anim">
          <line x1="130" y1="120" x2="${nx}" y2="${ny}" stroke="${mat}" stroke-width="1.4"/>
          <circle cx="${nx}" cy="${ny}" r="17" fill="${metRgba(mat, 0.22)}"/>
          <circle cx="130" cy="120" r="2.4" fill="var(--t-ghost)"/>
          <polygon points="${nodePts}" fill="${mat}"/>
        </g>
      </svg>
      <div class="met-field__side">
        <div><div class="met-kicker">Centre of weight</div><div class="met-field__v">${esc(fr.field.weight)}</div></div>
        <div><div class="met-kicker">Balance</div><div class="met-field__v">${esc(fr.field.balance)}</div></div>
      </div>
    </div>
    <div class="met-bands">${metTier("Drift", fr.field.drift, mat)}${metTier("Clarity", fr.field.clarity, mat)}${metTier("Depth", fr.field.depth, mat)}</div>`);

  /* 04 — Frame Event (the act in the image — never a person read) */
  const event = metPlate("04", "Frame Event", mat, `
    <p class="met-lede">The single event the frame is built around — read as an act in the image, not a quality of the person. What happened inside the rectangle.</p>
    <div class="met-event">
      <div class="met-event__thumb">${imgOrPlaceholder(src.file, "met-event__img")}</div>
      <div class="met-event__main">
        <div class="met-event__lab"><span class="met-kicker">Event</span><span class="met-event__v" style="color:${mt};">${esc(fr.event.label)}</span></div>
        <p class="met-event__note">${esc(c.note)}</p>
      </div>
    </div>
    <p class="met-event__filed">Filed as <b>${esc(c.archetype)}</b> — ${esc(src.sceneRole)}</p>
    <div class="met-bands">${metTier("Legibility", fr.event.legibility, mat)}${metTier("Charge", fr.event.charge, mat)}${metTier("Containment", fr.event.containment, mat)}</div>`);

  /* Register reel: the header is a fixed mast; the rail below shows ONE plate at a
     time (scroll-snap), advanced by wheel/buttons/ticks; mountMetricsReel() wires it. */
  const ticks = [0, 1, 2, 3].map((i) => `<button type="button" class="met-reel__tick" data-reel="${i}" aria-label="Instrument ${i + 1}"></button>`).join("");
  return `
    <div class="met-reel" style="--mat:${esc(mat)};">
      <div class="met-reel__head">
        <header class="met-hd">
          <h1 class="met-hd__title">Diagnostic Receipts</h1>
          <div class="met-hd__id"><span class="met-chip" style="color:${mt};">${esc(c.archetype)}</span><span class="met-hd__ln"></span><span class="met-hd__read">Reading ${esc(c.title)}</span></div>
          <p class="met-hd__lede">Four interpretive instruments for <b>${esc(c.title)}</b> — the read of how the frame is built. Records of the photograph, never measurements of the person who stood in it.</p>
        </header>
        <div class="met-reel__ctrl">
          <button type="button" class="met-reel__arrow" data-reel="prev" aria-label="Previous instrument">&#9650;</button>
          <span class="met-reel__count">01 / 04</span>
          <div class="met-reel__ticks">${ticks}</div>
          <button type="button" class="met-reel__arrow" data-reel="next" aria-label="Next instrument">&#9660;</button>
        </div>
      </div>
      <div class="met-reel__window">
        <div class="met-plates">${sig}${mixPlate}${field}${event}</div>
      </div>
    </div>`;
}

/* ---------- Metrics register reel controller (BR-S115) ----------
   Native scroll-snap rail = one plate at a time; an IntersectionObserver is the
   single source of "centred" truth (drives ticks, counter, the landing glint);
   wheel (one gesture = one step) + arrows + ticks all reconcile through go().
   Compositor-only; reduced-motion = instant centred swap. Re-mounts each render. */
let _reel = null;
function mountMetricsReel() {
  if (_reel) { _reel.win.removeEventListener("wheel", _reel.onWheel); window.removeEventListener("resize", _reel.onResize); _reel = null; }
  const win = document.querySelector(".met-reel__window");
  if (!win) return;
  const track = win.querySelector(".met-plates");
  const plates = Array.prototype.slice.call(track.querySelectorAll(".met-plate"));
  if (!track || !plates.length) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let cur = 0, busy = false;
  const setActive = (i) => {
    cur = i;
    /* read the window height ONCE and use it for BOTH the slot height and the
       transform step, so plate-height and travel can never drift out of sync. */
    const h = win.clientHeight;
    track.style.setProperty("--slot-h", h + "px");
    track.style.transform = "translateY(" + (-i * h) + "px)";
    plates.forEach((p, j) => { p.classList.toggle("is-centred", j === i); if (j === i) p.scrollTop = 0; });
    const count = document.querySelector(".met-reel__count");
    if (count) count.textContent = pad2(i + 1) + " / " + pad2(plates.length);
    document.querySelectorAll(".met-reel__tick").forEach((t, j) => t.classList.toggle("is-on", j === i));
    document.querySelectorAll('[data-reel="prev"]').forEach((b) => (b.disabled = i === 0));
    document.querySelectorAll('[data-reel="next"]').forEach((b) => (b.disabled = i === plates.length - 1));
  };
  const go = (i) => {
    i = Math.max(0, Math.min(plates.length - 1, i));
    if (busy || i === cur) return;
    busy = true;
    setActive(i);
    window.clearTimeout(go._t);
    go._t = window.setTimeout(() => (busy = false), reduce ? 0 : 460);
  };
  /* wheel: scroll WITHIN a tall centred plate first, advance one step at its edge */
  const onWheel = (e) => {
    const dir = Math.sign(e.deltaY);
    if (!dir) return;
    const p = plates[cur];
    if (dir > 0 && p.scrollHeight - p.clientHeight - p.scrollTop > 2) return; // room below — let it scroll within
    if (dir < 0 && p.scrollTop > 2) return; // room above
    if ((dir < 0 && cur === 0) || (dir > 0 && cur === plates.length - 1)) return; // at an end — let the page have it
    e.preventDefault();
    go(cur + dir);
  };
  win.addEventListener("wheel", onWheel, { passive: false });
  /* Re-sync slot height + transform on real viewport resizes only — a window
     'resize' listener, NOT a ResizeObserver on the window (that loops here,
     re-running setActive and perpetually restarting the dim transition). */
  const onResize = () => setActive(cur);
  window.addEventListener("resize", onResize);
  _reel = { win, onWheel, onResize, prev: () => go(cur - 1), next: () => go(cur + 1), to: (i) => go(i) };
  setActive(0);
  /* re-sync once layout + fonts settle (the head height can shift the window) */
  if (window.requestAnimationFrame) requestAnimationFrame(() => setActive(cur));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (_reel) setActive(cur); });
}

/* ---------- center: the card (one master base) ---------- */

function renderCard(src, treatment) {
  const t = TREATMENTS[treatment];
  const c = src.card;
  const minted = treatment !== "free";
  /* Lab material overlay (CARD_TECH_LAB §20): a visual finish study, active
     ONLY in the internal Lab state ("mint"). Never on free/shiny — so the paid
     and free cards stay byte-identical. Drives a card-scoped data-lab-material
     skin + a one-slot finish label appended to the LAB STATE rarity line. */
  const labMat =
    treatment === "mint" && typeof LAB_MATERIALS !== "undefined" && state.labMaterial
      ? LAB_MATERIALS.find((m) => m.key === state.labMaterial)
      : null;

  return `
    <article class="card" data-treatment="${treatment}" data-material="${esc(src.halo.material)}"${labMat ? ` data-lab-material="${esc(labMat.key)}"` : ""}
      style="--halo-a:${esc(src.halo.a)}; --halo-b:${esc(src.halo.b)}; --halo-c:${esc(src.halo.c)};">
      <span class="card__halo" aria-hidden="true"></span>
      <div class="card__plate">
        <span class="corner corner--tl"></span><span class="corner corner--tr"></span>
        <span class="corner corner--bl"></span><span class="corner corner--br"></span>
        <span class="card__sparkles" aria-hidden="true"></span>
        <span class="cardfinish" aria-hidden="true"></span>

        <header class="card__head">
          <span class="card__house">◆ BLUE ROOM ARCHIVE</span>
          <span class="card__rarity">${esc(labMat ? `${t.rarity} · ${labMat.label}` : t.rarity)}</span>
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
          <p class="signature">${esc(c.signature)}</p>
        </div>

        <div class="framereading">
          <span class="framereading__key">Frame Reading</span>
          ${(() => {
            /* BR-S119: the developed "mint ledger" — name · 5 diamond pips · tier
               WORD. v2 freeVisible is the source of truth for the 4 public stats
               (SCAN_ENGINE_SPEC); legacy card.stats as fallback. Pips + band only,
               NEVER a 0-100, driven by the SAME tierBand() the Metrics tab uses so
               the card can't disagree with the reel. */
            const s = getScanResult(src)?.stats.freeVisible || c.stats;
            const LADDER = ["Muted", "Clean", "Strong", "Charged", "Peak"];
            return ["presence", "signal", "visualImpact", "charge"].map((k, rowIdx) => {
              const band = tierBand(s[k]);
              const idx = LADDER.indexOf(band);
              /* BR-S120/S121: pips coloured BY POSITION (the builder's mockup). Each lit
                 pip carries its position class p1..p5 — positions 1-3 climb a brass value
                 ramp (shiny), the 4th is purple, the 5th gold, each glowing. Halo/minted
                 only; the free gate flattens all of it to matte silver. The tier WORD
                 carries its band class so it can echo the same silver→brass→purple→gold
                 ramp (CSS); kept tier-driven (per row), independent of pip position. */
              const pips = [0, 1, 2, 3, 4].map((p) => {
                const on = p <= idx;
                return `<span class="fr__pip${on ? " is-on fr__pip--p" + (p + 1) : ""}" style="--r:${rowIdx};--c:${p}"></span>`;
              }).join("");
              return `<div class="fr__row"><span class="fr__name">${esc(statLabel(k))}</span><span class="fr__pips">${pips}</span><span class="fr__tier fr__tier--${band.toLowerCase()}">${esc(band)}</span></div>`;
            }).join("");
          })()}
        </div>

        <div class="mintstrip">
          <span class="mintstrip__state ${minted ? "" : "mintstrip__state--free"}">${esc(t.stamp)}</span>
          <span class="mintstrip__serial ${minted ? "" : "mintstrip__serial--ghost"}">${esc(c.serial)} · ${esc(t.strip)}</span>
          <span class="mintstrip__right">
            <button type="button" class="mintlink ${minted ? "" : "mintlink--ghost"}" data-mint-showcase aria-label="Show the Mint Record" tabindex="${minted ? "0" : "-1"}">Mint Record</button>
            <button type="button" class="barcode ${minted ? "" : "barcode--ghost"}" data-card-qr aria-label="Show card scan code" tabindex="${minted ? "0" : "-1"}"></button>
          </span>
        </div>

        <div class="cardqr" aria-hidden="true">
          <div class="cardqr__seat">
            <svg class="cardqr__code" viewBox="0 0 25 25" role="img" aria-label="Card scan code (placeholder)">
              <rect class="cardqr__quiet" x="0" y="0" width="25" height="25"></rect>
              <g class="cardqr__mods">
                <rect x="2" y="2" width="6" height="6"></rect><rect class="cardqr__hole" x="3.3" y="3.3" width="3.4" height="3.4"></rect><rect x="4.3" y="4.3" width="1.4" height="1.4"></rect>
                <rect x="17" y="2" width="6" height="6"></rect><rect class="cardqr__hole" x="18.3" y="3.3" width="3.4" height="3.4"></rect><rect x="19.3" y="4.3" width="1.4" height="1.4"></rect>
                <rect x="2" y="17" width="6" height="6"></rect><rect class="cardqr__hole" x="3.3" y="18.3" width="3.4" height="3.4"></rect><rect x="4.3" y="19.3" width="1.4" height="1.4"></rect>
                <rect x="10" y="2" width="1.5" height="1.5"></rect><rect x="13" y="3" width="1.5" height="1.5"></rect><rect x="10" y="5.5" width="1.5" height="1.5"></rect>
                <rect x="2" y="10" width="1.5" height="1.5"></rect><rect x="4.5" y="11.5" width="1.5" height="1.5"></rect><rect x="6" y="13.5" width="1.5" height="1.5"></rect>
                <rect x="10" y="10" width="1.5" height="1.5"></rect><rect x="12.5" y="11.5" width="1.5" height="1.5"></rect><rect x="15.5" y="10" width="1.5" height="1.5"></rect>
                <rect x="18" y="12" width="1.5" height="1.5"></rect><rect x="20.5" y="13.5" width="1.5" height="1.5"></rect><rect x="11.5" y="14" width="1.5" height="1.5"></rect>
                <rect x="14" y="16.5" width="1.5" height="1.5"></rect><rect x="16.5" y="18" width="1.5" height="1.5"></rect><rect x="19" y="16.5" width="1.5" height="1.5"></rect>
                <rect x="21" y="20" width="1.5" height="1.5"></rect><rect x="13" y="20.5" width="1.5" height="1.5"></rect><rect x="10.5" y="18.5" width="1.5" height="1.5"></rect>
              </g>
            </svg>
            <span class="cardqr__cap">Placeholder · scan link develops</span>
          </div>
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

  const stateBadge = free ? "Archive Edition" : treatment === "mint" ? "Lab · Signature Mint" : "Developed · Halo Mint";
  const header = `
    <div class="readhead">
      <h2 class="readhead__title">Scan Reading</h2>
      <div class="readhead__meta">
        <span class="readhead__chip">${esc(src.capture.code)}</span>
        <span class="readhead__badge readhead__badge--${treatment}">${esc(stateBadge)}</span>
      </div>
      ${free ? `<p class="readhead__line">${esc(TREATMENTS[treatment].tagline)}</p>` : ""}
    </div>`;

  const sec = (typeof S107_SECTIONS !== "undefined" && S107_SECTIONS[src.id]) || {};
  /* BR-S107: Stat Reading KILLED (it was geometry-as-prose). Its slot is now
     Light & Surface (lens C · front) — the palette at a glance + one cool line.
     Geometry lives only in Diagram/Metrics now. */
  /* BR-S108.1: Light & Surface -> COLOUR FIELD. The swatch becomes a MEASUREMENT —
     one stacked proportion bar (each surface's share of the frame) + a legend.
     Reads only pixels: a colour proportion, not a person-read and not a stat score. */
  const cf = (typeof S108_EXTRAS !== "undefined" && (S108_EXTRAS[src.id] || {}).colourField) || [];


  const sceneRole = `
    <div class="module">
      ${moduleHead("Scene Role")}
      <p class="module__line">${esc(sec.sceneRole || src.sceneRole)}</p>
    </div>`;

  /* BR-S088 subtraction (paid-only): the panel's analytical deep modules
     (Stance Read / Fit Coherence / Frame Impact / Lore Density / Mint Record)
     were verbatim re-renders of dossier Plate 05 (Fit + Aura Layer) and Plate 06
     (Mint Record) — cut from the PAID panel so it reads as a tight VOICE/SUMMARY
     column (Oracle → Stat Reading → Scene Role → Archetype → Receipts), not a
     second copy of the dossier. All of that content still lives in the dossier
     (its richer home). Free is untouched — free renders lockedDeep, not this.
     What remains in the panel from the old deep block: the Technical Receipts. */
  /* BR-S113 (1A): Source Record absorbed here — the provenance one-liner + the
     pre-mint serial lineage (Object/Scan/Card). Mint serial stays in the Mint plate. */
  const dRec = src.dossier;
  const scanRec = getScanResult(src);
  const provLine = (((typeof S108_EXTRAS !== "undefined" && S108_EXTRAS[src.id]) || {}).sourceTwoLine || {}).prov || dRec.record.provenance;
  const lineageReceipts = [
    { k: "Object", v: dRec.record.objectNo },
    ...(scanRec?.scanId ? [{ k: "Scan", v: scanRec.scanId }] : []),
    { k: "Card", v: c.serial },
  ];
  const panelReceipts = `
    <details class="receipts">
      <summary><span class="module__label">Technical Receipts</span><span class="receipts__caret">▸</span></summary>
      <p class="receipts__prov">${esc(provLine)}</p>
      <dl class="receipts__list">
        ${lineageReceipts.map((r) => `<div><dt>${esc(r.k)}</dt><dd>${esc(r.v)}</dd></div>`).join("")}
        ${src.receipts.map((r) => `<div><dt>${esc(r.k)}</dt><dd>${esc(r.v)}</dd></div>`).join("")}
      </dl>
      <div class="formulas">
        <div class="formulas__head">Interpretive Formula — scan recipe, not a measurement</div>
        ${FORMULAS.map(
          (f) =>
            `<div class="formulas__row"><span class="formulas__k">${esc(f.k)}</span><span class="formulas__v">read through: ${esc(f.v)}</span></div>`
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
      <p class="unlock__line">This card is complete as it is. Develop opens its sealed back — the same scan, a deeper record, when you want it.</p>
      <button type="button" class="unlock__btn unlock__btn--shiny" data-goto="shiny">
        <span class="unlock__name">Open the developed back</span>
        <span class="unlock__desc">the card finishes developing in place</span>
      </button>
      <p class="unlock__more">◆ &nbsp;The sealed back of this card develops with the mint — added depth, not a hidden result.</p>
      <p class="unlock__price">One-time develop · this scan only · dev mock — no real payment in this build</p>
    </div>
    ${lockedModule("Surface Record", "The full colour palette, each surface named and proofed.")}
    ${lockedModule("Composition & Fit", "The class designation and shelf-placement.")}
    ${lockedModule("Halo Material", "The finish, serial, and mint seal.")}`;

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

  /* Artifact Archetype — class + one-liner + discovery note (COPY_SYSTEM §4),
     developed states only. Copy-only ARCHETYPE_NOTES lookup by the v2 archetype
     CLASS; omitted when the v2 scan or class is absent (no instance-title
     fallback — the instance label already lives on the card). The class is
     scoped at the chip ("Artifact class · …") so it reads as a photo role, not
     a person typology. Fulfils the Halo half of the PROJECT_OS §10 promise. */
  /* BR-S107.1: dead archetypeModule (front Archetype section, dropped in Push #1) removed. */

  /* BR-S107.1 (loop D): the Oracle lands ONCE — in the back dossier Oracle seal.
     The paid panel-lead repeat (oracleFirst, BR-S086) is KILLED; the paid panel
     now opens on Light & Surface, not a duplicated verdict.
     BR-S107 Push #1: front Archetype module DROPPED (it duplicated the Card tag);
     front essence = the Card's archetype tag only. */
  /* BR-S108.2 (C): the developed rail must GAIN, not deflate. The free state's
     develop-teasers vanish on develop and leave a hole; the Finish plate fills it
     (the material stated with weight). The REST of this rail is RESERVED for the
     grade/charge visual (post readiness-gate) — do not fill it with throwaway. */
  /* The finish swatch must read as the MATERIAL it names, not the holo-rim accents
     (which are blue-ish for several sources — the re-audit caught "Field Green Glass"
     showing blue). A per-material base hex + a full-width glass-sheen bar = real weight,
     no dead gap, right colour. */
  const FINISH_HEX = { "Warm Glass Copper": "#b07a4a", "Cold Prism Frost": "#9ed3dd", "Cold Tide Steel": "#7d8b92", "Field Green Glass": "#6f8f5c", "Tank Glass Teal": "#2f9fa8" };
  /* BR-S115: Finish is its own standalone module (no longer echoing the dossier Aura,
     which is now an empty stub). A per-material character line gives it weight. */
  const FINISH_NOTE = {
    "Warm Glass Copper": "Cabin warmth held as a single static sheen — copper over grey glass.",
    "Cold Prism Frost": "Diffuse overcast caught in a pale icy plate — a cold prism, no specular spike.",
    "Cold Tide Steel": "A cool tide-steel plate — muted blue-grey, brushed flat.",
    "Field Green Glass": "A field-green glass — moss tone sealed under a matte sheen.",
    "Tank Glass Teal": "A tank-glass teal — fluorescent cyan held under glass.",
  };
  const fhex = FINISH_HEX[src.halo.material] || src.halo.a || "#888888";
  const fnote = FINISH_NOTE[src.halo.material] || "";
  /* BR-S117: Finish + Colour Field combined into ONE compact "Surface" module — the
     proportion bar is the hero, the material chip caps it, the material name + character
     note form a single foot line. Free = bar + teaser (no material); paid = chip + bar + foot. */
  const cfBar = cf.length
    ? `<div class="surface__bar">${cf.map((c) => `<span class="cfbar__seg" style="--sw:${esc(c.hex)}; --pct:${c.pct}%"></span>`).join("")}</div>`
    : "";
  const surfacePlate = `
    <div class="module module--surface">
      ${moduleHead("Surface")}
      <div class="surface__bar-row">
        ${free ? "" : `<span class="surface__chip" style="--fhex:${esc(fhex)}" aria-hidden="true"></span>`}
        ${cfBar}
      </div>
      ${free
        ? `<p class="surface__teaser">full palette develops below</p>`
        : `<p class="surface__foot"><span class="surface__matname">${esc(src.halo.material)}</span>${fnote ? `<span class="surface__note">${esc(fnote)}</span>` : ""}</p>`}
    </div>`;
  /* BR-S112 (3c): close the developed rail's reserved lower column with an end-mark
     so the empty space reads as a composed end, not an abandoned gap. */
  const developedEnd = free ? "" : `<div class="readend"><span class="readend__rule"></span><span class="readend__mark">◆ end of scan reading ◆</span></div>`;
  const forkContent = free ? lockedDeep : panelReceipts + shinyTease + shinyBadge + developedEnd;
  const panelLead = "";
  /* BR-S117: the combined Surface module tops the right panel (Finish + Colour Field fused). */
  const topRail = surfacePlate;
  return `${header}${panelLead}${topRail}${sceneRole}<div class="readseam" data-open="${free ? 0 : 1}">${forkContent}</div>`;
}

/* ---------- scroll dossier (below the hero) ----------
   Order: factual → interpretive → identity → collectible → playful.
   Free state reads as undeveloped archive material — never a paywall. */

function dplate(no, title, paid, body, extraClass = "") {
  /* paid retained in the signature (callers pass it); the per-plate develop/
     archive tag was CUT (BR-S048) — the single back-seam gate concentrates at
     Card Record, and per-plate copy carries free-vs-developed state. */
  return `
    <section class="dplate ${extraClass}">
      <span class="dplate__spine" aria-hidden="true">${no}</span>
      <div class="dplate__body">
        <header class="dplate__head">
          <h3 class="dplate__title">${esc(title)}</h3>
          <span class="dplate__rule"></span>
        </header>
        ${body}
      </div>
    </section>`;
}

/* ---------- Surface Record (BR-S117 · LOCKED BR-S118): the image's palette as live
   pigment suspended in developer fluid. Ported from SurfaceRecord.jsx to the vanilla
   stack + canvas. The "tray" (wide horizontal bath) form is the locked design — the
   column vessel was compared and retired, so every card reads the same instrument.
   The canvas animation runs in mountSurfaceRecords() after each dossier render;
   reduced-motion freezes it after one frame. ---------- */
function srHexA(hex, a) { const h = hex.replace("#", ""); return `rgba(${parseInt(h.slice(0,2),16)},${parseInt(h.slice(2,4),16)},${parseInt(h.slice(4,6),16)},${a})`; }
function srSat(hex) { const h = hex.replace("#", ""); const r = parseInt(h.slice(0,2),16), g = parseInt(h.slice(2,4),16), b = parseInt(h.slice(4,6),16); const mx = Math.max(r,g,b), mn = Math.min(r,g,b); return mx === 0 ? 0 : (mx - mn) / mx; }
function srMakeBlobs(pal, W, H) {
  const blobs = [];
  pal.forEach((p) => {
    const share = p.share != null ? p.share : 25;
    const n = Math.max(2, Math.round(share / 5));
    const alpha = 0.42 + srSat(p.hex) * 0.55;
    for (let k = 0; k < n; k++) {
      blobs.push({ x: Math.random()*W, y: Math.random()*H,
        r: 42 + share * 1.2 * (0.6 + Math.random()*0.7),
        col: p.hex, a: alpha, ph1: Math.random()*6.28, ph2: Math.random()*6.28, phP: Math.random()*6.28,
        sp1: 0.16 + Math.random()*0.26, sp2: 0.12 + Math.random()*0.22 });
    }
  });
  return blobs;
}
function surfaceSwatches(src) {
  const cf = (typeof S108_EXTRAS !== "undefined" && (S108_EXTRAS[src.id] || {}).colourField) || [];
  return cf.map((c) => ({ hex: c.hex, label: c.label, proof: c.proof, pct: c.pct + "%", share: c.pct }));
}
function renderSurfaceRecord(src) {
  /* BR-S118: form LOCKED to the horizontal "tray" bath (the column vessel form was
     retired after the two were compared). One ruled instrument per card. */
  const sw = surfaceSwatches(src);
  const mat = src.halo.a;
  const blobData = esc(JSON.stringify(sw.map((s) => ({ hex: s.hex, share: s.share }))));
  const bead = (hex) => `flex:none; width:14px; height:14px; border-radius:50%; background:${hex}; box-shadow:inset 0 1.5px 1.5px rgba(255,255,255,0.45), inset 0 -2px 3px rgba(0,0,0,0.35), 0 0 8px ${srHexA(hex, 0.5)};`;
  const row = (s) => `
    <div>
      <div style="display:flex; align-items:center; gap:10px;">
        <span style="${bead(s.hex)}"></span>
        <span style="font-size:12.5px; letter-spacing:0.01em; color:var(--t-body);">${esc(s.label)}</span>
        <span style="flex:1; border-bottom:1px dotted rgba(233,229,220,0.17); transform:translateY(-2px); min-width:8px;"></span>
        <span style="font-family:var(--font-display); font-weight:500; font-size:15px; letter-spacing:0.02em; color:var(--silver-bright); font-feature-settings:'tnum' 1;">${esc(s.pct)}</span>
      </div>
      <p style="margin:4px 0 0 24px; font-family:var(--font-display); font-style:italic; font-size:12.5px; line-height:1.4; color:var(--t-meta); text-wrap:pretty;">${esc(s.proof)}</p>
    </div>`;
  /* Intro carries the derived/sampled honesty ("sampled off the surface") that the
     removed footer used to hold, so the percentages are never read as a measurement. */
  const intro = "Still in the bath — the palette sampled off the surface, running as slow current, charged but not yet fixed.";
  const bath = `
      <div style="position:relative; height:176px; border:1px solid rgba(233,229,220,0.15); border-radius:4px; overflow:hidden; background:#08090b; box-shadow:inset 0 1px 0 rgba(233,229,220,0.08), inset 0 0 28px rgba(0,0,0,0.45);">
        <canvas data-surface-canvas data-material="${esc(mat)}" data-swatches="${blobData}" style="position:absolute; inset:0; width:100%; height:100%; display:block; filter:blur(5px) saturate(1.16) contrast(1.07);"></canvas>
        <div style="position:absolute; inset:0; pointer-events:none; background:linear-gradient(90deg, rgba(8,9,11,0.6) 0%, rgba(8,9,11,0) 12%, rgba(8,9,11,0) 88%, rgba(8,9,11,0.6) 100%);"></div>
        <div style="position:absolute; inset:0; pointer-events:none; background:linear-gradient(180deg, rgba(8,9,11,0.42) 0%, rgba(8,9,11,0) 22%, rgba(8,9,11,0) 80%, rgba(8,9,11,0.34) 100%);"></div>
        <div style="position:absolute; top:0; left:0; right:0; height:30px; pointer-events:none; background:linear-gradient(180deg, rgba(233,229,220,0.09), rgba(233,229,220,0) 100%);"></div>
        <span style="position:absolute; left:12px; bottom:9px; font-family:var(--font-mono); font-size:8px; letter-spacing:0.2em; text-transform:uppercase; color:var(--t-ghost);">In bath · unfixed</span>
      </div>`;
  return `<div style="font-family:var(--font-ui);">
    <p style="margin:0 0 18px; font-size:12.5px; line-height:1.58; color:var(--t-meta); font-style:italic; max-width:50ch;">${intro}</p>
    ${bath}
    <div style="margin-top:20px; display:grid; grid-template-columns:1fr 1fr; gap:15px 30px;">${sw.map(row).join("")}</div>
  </div>`;
}
let _surfaceRafs = [];
let _surfaceResizeBound = false;
function mountSurfaceRecords() {
  _surfaceRafs.forEach((id) => cancelAnimationFrame(id));
  _surfaceRafs = [];
  const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  document.querySelectorAll("[data-surface-canvas]").forEach((cv) => {
    let pal; try { pal = JSON.parse(cv.dataset.swatches || "[]"); } catch (e) { pal = []; }
    if (!pal.length) return;
    const SLOW = 0.55;
    let W = 0, H = 0, ctx = null, blobs = [], baseGrad = null, t = 0;
    const setup = () => {
      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
      W = cv.clientWidth || 520;
      H = cv.clientHeight || 176;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx = cv.getContext("2d"); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      blobs = srMakeBlobs(pal, W, H);
      const byShare = pal.slice().sort((a, c) => (c.share || 0) - (a.share || 0));
      const c0 = byShare[0] || { hex: cv.dataset.material }, c1 = byShare[1] || c0;
      baseGrad = ctx.createLinearGradient(0, 0, W, 0);
      baseGrad.addColorStop(0, srHexA(c1.hex, 0.22));
      baseGrad.addColorStop(1, srHexA(c0.hex, 0.22));
    };
    setup();
    const slot = _surfaceRafs.length; _surfaceRafs.push(0);
    const draw = () => {
      t += 0.007;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = baseGrad; ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "screen";
      for (const b of blobs) {
        b.x += (0.30 + Math.sin(t*b.sp2+b.ph2)*0.16) * SLOW; b.y += (Math.sin(t*b.sp1+b.ph1)*0.30) * SLOW;
        if (b.x < -b.r) b.x = W + b.r; if (b.x > W + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = H + b.r; if (b.y > H + b.r) b.y = -b.r;
        const ph = 0.5 + 0.5*Math.sin(t*1.7+b.phP);
        const a = b.a * (0.80 + 0.32*ph), r = b.r * (0.93 + 0.11*ph);
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, r);
        g.addColorStop(0, srHexA(b.col, a)); g.addColorStop(0.55, srHexA(b.col, a*0.34)); g.addColorStop(1, srHexA(b.col, 0));
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.x, b.y, r, 0, 6.2832); ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      if (!reduce) _surfaceRafs[slot] = requestAnimationFrame(draw);
    };
    draw();
  });
  if (!_surfaceResizeBound) {
    _surfaceResizeBound = true;
    let rt; window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(mountSurfaceRecords, 200); });
  }
}

/* ---- 03 · AURA — NAMED AIR (BR-S154: full re-found, replaces PHOSPHOR DECAY) ----
   Aura = the felt ENERGY/MOOD a photo radiates, read the instant you look — before
   analysis. It is words-led, theory-free, and structurally cannot be misread as a
   scribble because it renders NO abstract mark: three lines of plain English, in
   strict size order, on a single whisper of the source's own light.

     (A) THE NAME     — the two-word feeling, stacked (adjective / noun), hero scale.
     (B) THE HAIRLINE — a 24px tinted rule under the name: the one, only, and entire
                        piece of color in the panel (the source's --halo-a key).
     (C) THE READ     — one second-person sentence: what the photo does to YOU.
     (D) THE REGISTER — "COMES OFF THE PRINT · <TIER>", the existing hand-set
                        Muted..Peak ladder worded into a self-anchoring phrase.

   Backstage: auraField.nameWords holds the two-word NAME as an array (already
   stacked, no split-on-space guessing), auraField.readLine holds the second-person
   READ, auraField.leadIn the lowercase "feels like" lead, auraField.freeLine the
   pre-mint fragment, auraField.tier the hand-set Muted..Peak word, auraField.glowKey
   the light-behavior enum consumed by auraGlowStyle(). src.halo.a is the only color
   read. NO field.node, NO mode, NO mark geometry — none of it is consulted. */

/* Glow-position enum -> a CSS custom property the stylesheet turns into a single soft
   radial whisper behind THE NAME. Four behaviors, each an honest echo of the source's
   own light (never a new invented visual language): pool-low = warm light pooled low
   in frame (Driver's cabin), press-top = a hard light pressing straight down (Ice's
   low sun, Tank's fluorescent tube), even = flat/near-absent (Shore's overcast — the
   deliberately quietest plate), stream-in = light/motion arriving toward the viewer
   (Run). Unknown/missing key degrades to "even" (the safest, quietest default). */
const AURA_GLOW_POS = {
  "pool-low": "50% 82%",
  "press-top": "50% 6%",
  "even": "50% 50%",
  "stream-in": "50% 62%",
};
function auraGlowStyle(glowKey, tint) {
  const pos = AURA_GLOW_POS[glowKey] || AURA_GLOW_POS.even;
  const peak = glowKey === "even" ? 0.07 : 0.13;   // Shore's "even" plate stays the quietest on purpose
  return `--daura-tint:${esc(tint)};--daura-glow-pos:${pos};--daura-glow-peak:${peak};`;
}

function renderAuraBody(src, paid) {
  const a = src.auraField;
  const tint = (src.halo && src.halo.a) || "var(--violet)";
  if (!a) return `<p class="dstat__undeveloped">Aura read — reserved. Develops in a later pass.</p>`;

  /* FREE (pre-mint): the name is held back — only the honest felt-fragment is shown,
     whole and unteased, plus a dim hairline that hints the mint will carry color.
     No masked hero, no partial grade: what's shown is complete, just smaller than
     the developed read. */
  if (!paid) {
    return `<div class="daura daura--tease" style="${auraGlowStyle(a.glowKey, tint)}">`
      + `<span class="daura__hairline daura__hairline--free" aria-hidden="true"></span>`
      + `<p class="daura__free">${esc(a.freeLine)}</p>`
      + `<p class="dstat__undeveloped">The read develops with the mint.</p></div>`;
  }

  /* NULL (auraField present but incomplete — no name/read authored yet, or a future
     source ships before its Aura pass): no name, no glow, no color — the panel states
     its own absence inside the SAME three-line grammar, so silence still reads as a
     designed choice rather than a bug. Structural check (nameWords + readLine), not
     a stale backstage `kind` flag. */
  if (!Array.isArray(a.nameWords) || !a.nameWords.length || !a.readLine) {
    const tier = (a.tier || "Muted").toUpperCase();
    return `<div class="daura daura--null">`
      + `<p class="daura__lead" aria-hidden="true">feels like</p>`
      + `<p class="daura__read">This frame keeps its temperature to itself.</p>`
      + `<p class="daura__register">COMES OFF THE PRINT &middot; <span class="daura__tier">${esc(tier)}</span></p></div>`;
  }

  const [nameTop, nameBottom] = a.nameWords;
  const tier = (a.tier || "").toUpperCase();
  return `<div class="daura" style="${auraGlowStyle(a.glowKey, tint)}" role="group" aria-label="${esc(a.ariaSummary || `${a.nameWords.join(" ")}. ${a.readLine}`)}">`
    + `<p class="daura__lead" aria-hidden="true">${esc(a.leadIn || "feels like")}</p>`
    + `<p class="daura__name"><span class="daura__name-l">${esc(nameTop)}</span>${nameBottom ? `<span class="daura__name-l">${esc(nameBottom)}</span>` : ""}</p>`
    + `<span class="daura__hairline" aria-hidden="true"></span>`
    + `<p class="daura__read">${esc(a.readLine)}</p>`
    + `<p class="daura__register">COMES OFF THE PRINT &middot; <span class="daura__tier" style="color:${metMatText(tint)};">${esc(tier)}</span></p>`
    + `</div>`;
}

function renderDossier(src, treatment) {
  const paid = treatment !== "free";
  const d = src.dossier;
  const c = src.card;
  const scan = getScanResult(src);
  const freeVals = scan?.stats.freeVisible || c.stats;
  const haloX = scan?.stats.haloExtended;

  /* Unified archive identity header — a non-plate strip naming the artifact's
     record id + edition state, bound across both states (BR-S086). Serial masked
     '····' on free (latent→developed law). Edition label tracks the treatment's
     canonical name — ARCHIVE EDITION on free, never the developed state dangled in
     front of the free reader. <div>, NOT <section>, so the .dplate nth-of-type
     dossier rhythm is untouched. */
  const editionLabel = treatment === "free" ? "ARCHIVE EDITION" : treatment === "mint" ? "SIGNATURE MINT" : "HALO MINT";
  const sec = (typeof S107_SECTIONS !== "undefined" && S107_SECTIONS[src.id]) || {};
  const recordGate = `<div class="drecord-gate">◆ ARTIFACT RECORD · ${paid ? esc(c.serial) : "····"} · ${editionLabel}</div>`;

  /* BR-S113 (1A): Source Record plate KILLED — it did not earn its place (Mint +
     Technical Receipts carry the load). Its two useful bits (the provenance one-liner
     + the pre-mint serial lineage Object/Scan/Card) are absorbed into the developed
     Technical Receipts in renderReadingPanel; the dry filing-event ladder is dropped.
     The Mint serial stays in the Mint plate only (no duplicated code). */
  /* 02 — BR-S107: Evidence Board → Surface Record (refueled to lens C). Full
     swatch set, each chip annotated with the proof-noun that earned it. The old
     cue/effect/basis receipts (incl. the effect arrows) are retired with it. */
  /* BR-S108.1: Surface Record = the COLOUR FIELD at depth — per-surface rows
     (measured bar + share + the proof-noun that earned it). A different object
     from the front's single stacked bar. */
  const cf = (typeof S108_EXTRAS !== "undefined" && (S108_EXTRAS[src.id] || {}).colourField) || [];
  /* BR-S108.3 (#1): Surface Record DROPS the % — Colour Field owns the measurement,
     Surface Record owns the annotated palette (named surface + what it is). */
  const cfRow = (c, withProof) => `<div class="cfdeep__row"><span class="cfdeep__bar" style="--sw:${esc(c.hex)}"></span><div class="cfdeep__body"><div class="cfdeep__head"><span class="cfdeep__label">${esc(c.label)}</span>${withProof ? `<span class="cfdeep__pct">${c.pct}%</span>` : ""}</div>${withProof ? `<span class="cfdeep__proof">${esc(c.proof)}</span>` : ""}</div></div>`;
  const board = dplate("01", "Surface Record", paid, paid
    ? renderSurfaceRecord(src)
    : `<div class="cfdeep">${cf.slice(0, 3).map((c) => cfRow(c, false)).join("")}<p class="dstat__undeveloped">Surface proofs develop with the mint.</p></div>`);

  /* 03 — BR-S107: Stat Dossier KILLED (geometry-as-prose, a second time). Its
     numbers live only in Metrics now; nothing renders here. */
  const statDossier = "";

  /* 02 — Archetype (empty stub): a reserved placeholder plate for a future archetype
     read. The Card tag still carries the live archetype; this is scaffold only.
     Replaces the removed Hidden Stat plate. HELD draft. */
  const archetype = dplate("02", "Archetype", paid, `
    <p class="dstat__undeveloped">Archetype read — reserved. Develops in a later pass.</p>`);

  /* 03 — Aura, NAMED AIR (BR-S154): the felt energy/mood a photo radiates, read
     instantly — see renderAuraBody. Free shows the honest fragment; develop names
     the feeling, proves it against the viewer, and records its intensity. */
  const aura = dplate("03", "Aura", paid, renderAuraBody(src, paid), "dplate--aura");

  /* 06 — Mint Record */
  const mintBody = paid
    ? `
    <dl class="drecord drecord--mint">
      <div><dt>Developed From</dt><dd>SRC-${pad2(src.no)} · ${esc(src.capture.code)}</dd></div>
      <div><dt>Triggers</dt><dd>${esc((scan?.tierOutputs.halo.triggers || [d.mint.trigger1, d.mint.trigger2])[0])} · ${esc((scan?.tierOutputs.halo.triggers || [d.mint.trigger1, d.mint.trigger2])[1])}</dd></div>
      <div><dt>Material</dt><dd class="drecord__material">${esc(scan?.tierOutputs.halo.material || src.halo.material)}</dd></div>
      <div><dt>Mint Serial</dt><dd>${esc(scan?.tierOutputs.halo.mintSerial || d.mint.serial)}</dd></div>
    </dl>
    <p class="dmint__note">“${esc(d.mint.note)}”</p>
    <div class="dmint__seal"><span class="dmint__seal-mark">◆</span><span class="dmint__seal-txt">Filed &amp; sealed · Blue Room Archive</span><span class="dmint__seal-mark">◆</span></div>
    <div class="dmint__rest">
      <button type="button" class="dmint__return" data-goto="free">
        <span class="dmint__return-name">Step back</span>
        <span class="dmint__return-desc">Return to the Free card front</span>
      </button>
    </div>`
    : `
    <dl class="drecord drecord--mint">
      <div><dt>Archive Status</dt><dd>Archive pull · full artifact not minted</dd></div>
      <div><dt>Treatment Eligibility</dt><dd>${esc(d.record.eligibility)}</dd></div>
      <div><dt>Material (on development)</dt><dd class="drecord__material">${esc(src.halo.material)}</dd></div>
      <div><dt>Mint Serial</dt><dd>${esc(scan?.tierOutputs.free.serial || `Reserved · BR-SRC${pad2(src.no)}`)}<span class="dmint__reserve"> · develops</span></dd></div>
    </dl>
    <button type="button" class="unlock__btn unlock__btn--shiny dmint__cta" data-goto="shiny">
      <span class="unlock__name">Develop this scan</span>
      <span class="unlock__desc">the card finishes developing in place</span>
    </button>`;
  const mintRecord = dplate("04", "Mint Record", paid, mintBody, "dplate--mint");

  /* 07 — Oracle Read */
  /* 06 — Oracle Read (BR-S107: the ONLY verdict; sealed behind a FREE tap-to-
     develop reveal; centered/large/alone form). */
  const oracleText = paid ? (scan?.readings.oracle || d.oracle.full) : (scan?.tierOutputs.free.oracle || d.oracle.short);
  const oracle = dplate("05", "Oracle Read", paid, `
    <details class="seal seal--oracle" ${paid ? "open" : ""}>
      <summary class="seal__cue seal__cue--oracle"><span class="seal__dot">◆</span><span class="seal__name">The verdict</span><span class="seal__act">tap to develop</span></summary>
      <blockquote class="doracle doracle--centered">“${esc(oracleText)}”</blockquote>
      ${paid ? `<p class="doracle__timeline">${esc(d.oracle.timeline)}</p>` : ""}
    </details>`,
    "dplate--oracle");

  return `
    <div class="dossier__cue">CARD BACK — ARTIFACT RECORD</div>
    <div class="dossier__inner">
      ${recordGate}${board}${archetype}<div class="dossier__register">THE RECORD</div>${aura}${mintRecord}<div class="dossier__register">THE ORACLE</div>${oracle}
      <p class="dossier__end">◆ &nbsp;END OF RECORD · ${esc(src.label).toUpperCase()} · BLUE ROOM ARCHIVE</p>
    </div>`;
}

/* ---------- front-door menu (one sample: SRC-01, Free vs Halo) ----------
   One existing sample shown two ways: the same photo as a matte Free
   plate and a developed Halo artifact. Pulls title / archetype / material
   from SOURCES[0] + the tier stamps — no stats, no fabricated analysis,
   no new asset. */

/* Topbar zone label off state.view (UNIVERSE_ZONE_MAP zone-nav fork; BR-S064).
   The topbar only renders in the room view, so "ARCHIVE · SCAN ROOM" is what shows;
   the others are set for correctness if the topbar ever surfaces in another view. */
const ZONE_LABELS = { menu: "ARCHIVE · LOBBY", room: "ARCHIVE · SAMPLE CARD", draft: "ARCHIVE · LOCAL DRAFT", dev: "ARCHIVE · DEV" };
function applyView() {
  document.body.dataset.view = state.view;
  const zl = document.getElementById("zoneLabel");
  if (!zl) return;
  if (state.view === "room") {
    /* BR-S090 SAMPLE marker (derived per source). Every room today renders a SOURCES
       sample — there is no scan engine, so no real user card exists — and the topbar must
       say so, per-source, so a demo card is never mistaken for the user's own result.
       TRACKING (stopgap): this marks ALL rooms SAMPLE because all rooms are SOURCES samples
       now. When a real user-card render path ships (engine), it must set its own non-sample
       label here rather than reuse this branch. */
    const src = SOURCES[state.source];
    zl.textContent = `ARCHIVE · SAMPLE · SRC-${pad2(src.no)} · NOT YOUR PHOTO`;
  } else if (state.view === "draft" && draft && draft.scan_state === "unscanned") {
    /* BR-S092: a filed LOCAL FRONT CARD is the user's OWN photo, browser-only.
       Never the SAMPLE branch above (that is SOURCES demos) and never "SAMPLE". */
    zl.textContent = "ARCHIVE · YOUR PHOTO · LOCAL ONLY";
  } else {
    zl.textContent = ZONE_LABELS[state.view] || "ARCHIVE";
  }
}

/* BR-S152: the to-the-Vault forward affordance — the reveal's OWN purple hand-drawn arrow
   (identical glyph + neon to the "see deeper" arrows), fixed at the right edge and vertically
   centred. A wrapper carries the fixed position so the inner .rv-arrow keeps its own
   scale/breathe transforms. Shared by the live menu + the ?dev=menu-reveal twin. */
const MENUREV_FWD_ARROW =
  '<div class="menurev__fwd">'
  + '<button type="button" class="rv-arrow menurev__fwdbtn" data-variant="purple" aria-label="Open the example Vault">'
  + '<svg class="rv-arrow__svg" viewBox="15 6 106 106" aria-hidden="true">'
  + '<path class="rv-arrow__out" d="M20 54 C24 28 54 14 82 26 C99 33 106 47 106 62 L120 54 L98 104 L60 80 L77 73 C76 58 66 47 51 45 C39 43 29 49 26 60 Z"/>'
  + '<line class="rv-arrow__h" x1="28" y1="54" x2="37" y2="66"/><line class="rv-arrow__h" x1="36" y1="42" x2="47" y2="56"/>'
  + '<line class="rv-arrow__h" x1="46" y1="35" x2="57" y2="49"/><line class="rv-arrow__h" x1="57" y1="31" x2="69" y2="45"/>'
  + '<line class="rv-arrow__h" x1="69" y1="31" x2="81" y2="45"/><line class="rv-arrow__h" x1="81" y1="35" x2="93" y2="49"/>'
  + '<line class="rv-arrow__h" x1="92" y1="44" x2="102" y2="57"/><line class="rv-arrow__h" x1="100" y1="53" x2="108" y2="64"/>'
  + '<line class="rv-arrow__h" x1="72" y1="76" x2="83" y2="90"/><line class="rv-arrow__h" x1="80" y1="68" x2="91" y2="82"/>'
  + '<line class="rv-arrow__h" x1="66" y1="82" x2="75" y2="95"/>'
  + '</svg></button>'
  + '<span class="menurev__fwd-cap" aria-hidden="true">To the Vault</span>'
  + '</div>';

function renderMenu(reveal) {
  const s = SOURCES[0];
  return `
    <div class="menu__inner">
      <header class="menu__head">
        <h1 class="menu__brand"><span class="menu__mark">◆</span> BLUE ROOM</h1>
        <p class="menu__thesis">Every photo is already a card. The room develops it.</p>
        <p class="menu__trust">Image-as-artifact scan — it reads frame, gesture and signal, never the person.</p>
      </header>

      <section class="menu__stage${reveal ? " menu__stage--reveal" : ""}">
        <div class="msample__cap">
          <span class="msample__label">Sample Scan</span>
          <span class="msample__type">SRC-01 · Archive</span>
        </div>
        ${reveal ? `<p class="menurev__note">◆ Example · Showcase</p>` : ""}
        ${reveal ? '<div class="menurev__mount"></div>' : `<div class="msample__card">${renderCard(s, "free")}</div>`}
      </section>

      <div class="menu__controls">
        <span class="menu__rule" aria-hidden="true"></span>
        <p class="msample__seal">The front is complete. The same card has a sealed back.</p>

        <!-- BR-S090 door truth: exactly two honest doors. PRIMARY = Add Your Photo (the real
             beginning → local-draft intake; no card is promised, the engine is offline).
             SECONDARY = View Sample Card (the SRC-01 sample, explicitly not the user's photo).
             Develop is intentionally NOT a menu door — it is an in-card action that only exists
             after a real Free card, which needs the (unbuilt) scan engine. -->
        <div class="menu__doors">
          <button type="button" class="menu__door menu__door--add" data-draft-pick>
            <span class="menu__door-kicker">Your Photo</span>
            <span class="menu__door-name">${draft ? "Replace your photo" : "Add your photo"}</span>
            <span class="menu__door-desc">Stage your image as a local draft. The scan engine isn't connected yet — nothing reads it.</span>
          </button>
          <button type="button" class="menu__door menu__door--sample" data-view-to="room">
            <span class="menu__door-kicker">Sample</span>
            <span class="menu__door-name">View sample card</span>
            <span class="menu__door-desc">See a finished developed card — SRC-01. A sample, not your photo.</span>
          </button>
        </div>

        <div class="menu__actions">
          ${draft ? `<button type="button" class="menu__resume" data-view-to="draft">${draft.scan_state === "unscanned" ? "Resume local card →" : "Resume local draft →"}</button>` : ""}
          <p class="pickmsg" role="status" aria-live="polite"></p>
        </div>

        <a class="menu__codex" href="codex.html"><span class="menu__codex__mark" aria-hidden="true">◆</span> The Codex <span class="menu__codex__arr" aria-hidden="true">→</span></a>

        <p class="menu__foot">One sample · SRC-01 · Driver.</p>
      </div>
    </div>${reveal ? `
    <button type="button" class="menurev__back" aria-label="Return to the menu">← Back to the menu</button>
    ${MENUREV_FWD_ARROW}` : ""}`;
}

/* BR-S150: the LIVE entrance IS the develop reveal (promoted from ?dev=menu-reveal — this
   reverses the earlier "live menu untouched" stance, by builder direction). The sample card
   develops IN PLACE: arrow → scribble reading → "see deeper" → fullview takeover. #menuView
   itself carries the `menurev` class so the reveal's menustage + fullview CSS applies.
   ROBUST FALLBACK: if the reveal units (window.BRReveal / reveal/*.js) failed to load, render
   the plain static Archive Desk — the front door must never break. */
function mountMenu() {
  const host = document.getElementById("menuView");
  const canReveal = !!(window.BRReveal && typeof window.BRReveal.mount === "function");
  host.classList.toggle("menurev", canReveal);
  host.classList.remove("is-fullview");   // clean state on (re)mount
  host.innerHTML = renderMenu(canReveal);
  if (canReveal) wireMenuReveal(host);
}

function wireMenuReveal(host) {
  const mountEl = host.querySelector(".menurev__mount");
  if (!mountEl) return;
  function _escBack(e) {
    if (e.key === "Escape") { e.preventDefault(); document.removeEventListener("keydown", _escBack, true); if (rev && rev.toFree) rev.toFree(); }
  }
  const rev = window.BRReveal.mount(mountEl, {
    menustage: true,
    // BR-S156: enter fullview with the vault hand-off CLOSED; release it only once the
    // developed reading has fully drawn (onReadSettled), so the arrow never precedes the read.
    onFullview: function () { host.classList.add("is-fullview"); host.classList.remove("is-vaultready"); document.addEventListener("keydown", _escBack, true); },
    onReadSettled: function () { host.classList.add("is-vaultready"); },
    onBack: function () { host.classList.remove("is-fullview"); host.classList.remove("is-vaultready"); document.removeEventListener("keydown", _escBack, true); },
  });
  const back = host.querySelector(".menurev__back");
  if (back) back.addEventListener("click", function () { if (rev && rev.toFree) rev.toFree(); });
  /* BR-S151: the right-edge mirror of Back — hands off to the example Vault (its only route,
     a full reload; the vault's own back returns to a clean menu). */
  const fwd = host.querySelector(".menurev__fwdbtn");
  if (fwd) fwd.addEventListener("click", function () { location.href = "?dev=vault"; });
}

/* DEV NAV rail markup (dev-only; mounted only when DEVNAV). State navigation
   only — no product copy, no file picker, no draft. Buttons reuse the existing
   state setters via one delegated [data-devnav="kind:val"] handler below. */
function renderDevnav() {
  const b = (dn, label) => `<button type="button" class="devnav__btn" data-devnav="${dn}">${label}</button>`;
  const sep = `<span class="devnav__sep" aria-hidden="true">·</span>`;
  return [
    `<span class="devnav__tag">◆ DEV</span>`,
    b("view:menu", "Menu"), b("view:room", "Room"), sep,
    b("src:0", "SRC 01"), b("src:1", "SRC 02"), sep,
    b("treat:free", "Free"), b("treat:shiny", "Halo"), b("treat:mint", "Lab"), sep,
    b("tab:diagram", "Diagram"), b("tab:metrics", "Metrics"), sep,
    b("dev:free-scan-sim", "Free Sim"), b("dev:halo-gate", "Halo Gate"),
    b("dev:uploaded-result", "Uploaded"), b("dev:uploaded-blocked", "Blocked"),
  ].join("");
}

/* ---------- local draft + local front card (browser-only, no upload, no analysis) ----------
   The chosen image never leaves the browser and never receives a scan. `draft`
   is a plain object — NOT a ScanResult — and carries no stats, receipts, oracle,
   hidden stat, score, rarity or finish. It holds only SAFE container facts (file
   type/size + image dimensions/orientation/aspect, all derived from the file or
   the <img> element — never from pixel content) and, once filed, a LOCAL card id +
   staging timestamp. scan_state walks 'draft' (loaded, unfiled) → 'unscanned'
   (filed LOCAL FRONT CARD). renderDraft()/renderLocalCard() must never read sample
   scan data: if a stat, score or reading ever appears on the draft, that is a bug. */

let draft = null;
// { url, name, mime, typeLabel, sizeLabel, sizeBytes, warn,
//   width, height, orientation, aspectLabel,     // safe container geometry (async-decoded)
//   scan_state: 'draft' | 'unscanned',
//   card_id, staged_at, staged_at_ms }  |  null   // filing identity, minted at Build Local Card

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

/* Safe container geometry + local filing helpers (BR-S092). Everything here is
   derived from the file or the decoded <img> element — never from pixel content.
   These produce container facts and a local id/timestamp only; never a reading. */
function gcdInt(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { const t = b; b = a % b; a = t; } return a || 1; }
function orientationLabel(w, h) { if (!w || !h) return ""; if (w === h) return "Square"; return w > h ? "Landscape" : "Portrait"; }
function aspectLabel(w, h) {
  if (!w || !h) return "";
  const g = gcdInt(w, h), a = w / g, b = h / g;
  if (a <= 50 && b <= 50) return `${a}:${b}`;
  return w >= h ? `${(w / h).toFixed(2)}:1` : `1:${(h / w).toFixed(2)}`;
}
function rand4hex() { return Math.floor(Math.random() * 0x10000).toString(16).toUpperCase().padStart(4, "0"); }
function stagedStamp(dt) {
  const p = (n) => String(n).padStart(2, "0");
  return `${dt.getFullYear()}-${p(dt.getMonth() + 1)}-${p(dt.getDate())} ${p(dt.getHours())}:${p(dt.getMinutes())} local`;
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
    mime: file.type || "",
    typeLabel: fileTypeLabel(file.name),
    sizeLabel: humanSize(file.size || 0),
    sizeBytes: file.size || 0,
    warn: file.size > DRAFT_LARGE_FILE ? "Large file — the preview may take a moment to render in this browser." : "",
    width: null, height: null, orientation: "", aspectLabel: "", // safe geometry, filled by async decode
    scan_state: "draft", // 'draft' (loaded, unfiled) → 'unscanned' (filed local card)
    card_id: null, staged_at: "", staged_at_ms: null, // minted at Build Local Card
  };
  state.view = "draft";
  state.draftGate = false; // a fresh / replaced draft always starts at intake — never the gate or a filed card
  document.getElementById("draftView").innerHTML = renderDraft();
  mountMenu(); // the menu now offers "Resume local draft"
  applyView();
  window.scrollTo(0, 0);
  decodeDraftDimensions(draft); // safe container geometry only — browser-only, no pixel read
}

/* Decode the image's intrinsic pixel dimensions from the <img> element — a SAFE
   container fact (width/height/orientation/aspect), never a read of pixel content.
   Async + graceful: if decode fails, the fields stay empty and the card omits
   them. Guards against a stale decode landing on a newer / replaced draft. */
function decodeDraftDimensions(target) {
  const probe = new Image();
  probe.onload = () => {
    if (draft !== target) return; // a newer / replaced draft superseded this one
    const w = probe.naturalWidth || 0, h = probe.naturalHeight || 0;
    if (!w || !h) return;
    target.width = w; target.height = h;
    target.orientation = orientationLabel(w, h);
    target.aspectLabel = aspectLabel(w, h);
    /* Only the filed local card surfaces dimensions — re-render it if it is the
       screen currently shown (covers a fast Build click that beat the decode). */
    if (state.view === "draft" && target.scan_state === "unscanned") {
      document.getElementById("draftView").innerHTML = renderDraft();
    }
  };
  probe.onerror = () => {}; // graceful: leave geometry empty
  probe.src = target.url;
}

/* Build Local Card — the FILING event (beat two). Mints the local card identity
   ONCE: a browser-local card id + a staging timestamp, sealing the already-known
   safe facts into a filed LOCAL FRONT CARD. It runs NO scan and generates NO
   reading (no stats / receipts / oracle / hidden stat / score / rarity / finish);
   it only walks scan_state 'draft' → 'unscanned' and routes to renderLocalCard. */
function buildLocalCard() {
  if (!draft) return;
  if (draft.scan_state !== "unscanned") { // mint once; never regenerate per render
    draft.card_id = "BR-LOCAL-" + Date.now() + "-" + rand4hex();
    draft.staged_at_ms = Date.now();
    draft.staged_at = stagedStamp(new Date());
    draft.scan_state = "unscanned";
  }
  document.getElementById("draftView").innerHTML = renderDraft();
  mountMenu(); // the menu's resume label now reflects a filed local card
  applyView();
  window.scrollTo(0, 0);
}

/* Two local-draft states share one mount (#draftView): the intake preview
   and the sealed Scan Development Gate. Neither generates any analysis. */
function renderDraft() {
  if (!draft) return "";
  if (state.draftGate) return renderGate();              // dormant future-engine step (no product door now)
  if (draft.scan_state === "unscanned") return renderLocalCard(); // beat two: the filed LOCAL FRONT CARD
  return renderDraftIntake();                            // beat one: the loaded, unfiled LOCAL DRAFT
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
        <button type="button" class="menu__enter" data-build-card>Build Local Card</button>
        <p class="draft__developsub">Files your image as a local card — image facts only, no scan; the engine is not connected.</p>
      </div>

      <div class="draft__actions">
        <button type="button" class="draft__sample" data-draft-pick>Replace image</button>
        <button type="button" class="draft__sample" data-view-to="room">Enter sample scan room</button>
        <button type="button" class="draft__back" data-view-to="menu">Main menu</button>
      </div>

      <p class="pickmsg" role="status" aria-live="polite"></p>
    </div>`;
}

/* LOCAL FRONT CARD (BR-S092) — the filed local card (beat two). Reading-free:
   it NEVER routes through renderCard (which carries fixture reading content) and
   reads ONLY `draft`. It shows the staged image in the card shell plus the FILED
   identity (local card id + staging timestamp) and SAFE container facts only
   (dimensions, orientation, aspect, file type, file size, browser-only source).
   It generates NOTHING — no stats / receipts / oracle / hidden stat / score /
   rarity / finish / serial — and never touches SOURCES, SCAN_RESULTS_V2,
   getActiveScan() or getScanResult(). The card back stays closed because no scan
   exists: there is no reading and no Develop / Open-Card-Back action, only a
   static honesty line. */
function renderLocalCard() {
  const d = draft;
  const dims = (d.width && d.height) ? `${d.width} × ${d.height} px` : "Not available";
  const orient = d.orientation || "—";
  const aspect = d.aspectLabel || "—";
  const fact = (k, v) => `<div class="lcard__fact"><span class="lcard__factk">${esc(k)}</span><span class="lcard__factv">${esc(v)}</span></div>`;
  return `
    <div class="draft__inner">
      <div class="draft__cue">◆ &nbsp;BLUE ROOM · LOCAL FRONT CARD</div>

      <article class="draftcard draftcard--local" aria-label="Local front card">
        <div class="draftcard__plate">
          <header class="draftcard__head">
            <span class="draftcard__house">◆ BLUE ROOM ARCHIVE</span>
            <span class="draftcard__state">LOCAL CARD · FRONT</span>
          </header>

          <figure class="draftcard__photo">
            <img class="draftcard__img" src="${esc(d.url)}" alt="Local front card"
              onerror="this.closest('.draftcard__photo').classList.add('img-missing')" />
            <span class="draftcard__scrim"></span>
            <span class="draftcard__stamp">YOUR PHOTO · LOCAL CARD · FRONT ONLY · UNSCANNED</span>
          </figure>

          <div class="draftcard__body">
            <h2 class="draftcard__title">Local card</h2>
            <p class="lcard__id">${esc(d.card_id)}</p>
            <p class="lcard__filed">FILED LOCALLY · ${esc(d.staged_at)}</p>
            <p class="lcard__prov">LOCAL ONLY · THIS BROWSER · NOT UPLOADED</p>

            <div class="lcard__facts">
              ${fact("Dimensions", dims)}
              ${fact("Orientation", orient)}
              ${fact("Aspect", aspect)}
              ${fact("File type", d.typeLabel || fileTypeLabel(d.name))}
              ${fact("File size", d.sizeLabel)}
              ${fact("Source", "Browser-only")}
            </div>

            <div class="draftcard__archline">
              <span class="draftcard__archrule"></span>
              <span class="draftcard__arch">◆ &nbsp;UNSCANNED ARTIFACT &nbsp;◆</span>
              <span class="draftcard__archrule"></span>
            </div>
            <p class="draftcard__status">No scan has run — the engine is offline.</p>
            <p class="lcard__back">Card back remains closed until a scan exists.</p>
          </div>

          <div class="draftcard__strip">
            <span class="draftcard__stripstate">LOCAL CARD</span>
            <span class="draftcard__stripmeta">NOT MINTED · NO SERIAL</span>
          </div>
        </div>
      </article>

      <section class="draftinfo">
        <p class="draftinfo__line">Your image is filed as a local card.</p>
        <p class="draftinfo__sub">This card holds your image, a local card id and safe file facts — kept in this browser only. Nothing has been uploaded, scanned or read. The reading and the sealed back exist only once the scan engine is connected.</p>
        ${d.warn ? `<p class="draftinfo__warn">${esc(d.warn)}</p>` : ""}
      </section>

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

/* ---------- BR-S075: dev review map (?dev=review-map) ----------
   A DEV-ONLY, categorized index of the current desktop surfaces so they can be
   reviewed without guessing routes. Gated by ?dev (customers never reach it).
   Plain <a> links to the REAL existing routes — invents nothing. Not product UI. */
function renderReviewMap() {
  const BADGE = { real: "REAL", share: "SHARE", mock: "MOCK", harness: "HARNESS" };
  const card = (kind, href, route, name, desc) =>
    `<a class="rmap__card rmap__card--${kind}" href="${href}">
      <div class="rmap__cardtop"><span class="rmap__name">${esc(name)}</span><span class="rmap__badge rmap__badge--${kind}">${BADGE[kind]}</span></div>
      <p class="rmap__desc">${esc(desc)}</p>
      <div class="rmap__cardfoot"><code class="rmap__route">${esc(route)}</code><span class="rmap__open">Open →</span></div>
    </a>`;
  const group = (kind, cards) =>
    `<section class="rmap__group"><h2 class="rmap__kind">${esc(kind)}</h2><div class="rmap__cards">${cards.join("")}</div></section>`;
  return `
    <div class="rmap">
      <header class="rmap__head">
        <span class="rmap__devtag">DEV REVIEW · not a product surface</span>
        <h1 class="rmap__title">BLUE ROOM — desktop review map</h1>
        <p class="rmap__note">A local map for walking the current desktop spine. Dev-only (needs <b>?dev</b>) — customers never see it. Each card opens a real route.</p>
      </header>
      ${group("Real product surface", [
        card("real", "index.html", "/", "Menu — two-door fork", "the entrance · Free Pull + Develop doors"),
        card("real", "?src=1&t=free", "?src=1&t=free", "Free Pull · Driver (SRC-01)", "complete card front + reading + 7-plate dossier"),
        card("real", "?src=2&t=free", "?src=2&t=free", "Free Pull · Ice Field (SRC-02)", "complete card front · second source"),
        card("real", "?src=1&t=shiny", "?src=1&t=shiny", "Developed / Halo · Driver", "sealed back opened in-place · price only at develop-intent"),
        card("real", "?src=2&t=shiny", "?src=2&t=shiny", "Developed / Halo · Ice Field", "developed · second source"),
      ])}
      ${group("Share / capture view", [
        card("share", "?dev=before-after", "?dev=before-after", "Before / After · Driver", "the photograph → the same frame, filed as a card"),
        card("share", "?dev=before-after&src=2", "?dev=before-after&src=2", "Before / After · Ice Field", "second source"),
      ])}
      ${group("Archive surface", [
        card("share", "?dev=vault", "?dev=vault", "The Vault", "saved minted cards · revisit moments · reopen readings · QR access"),
      ])}
      ${group("Dev mock", [
        card("mock", "?dev=halo-gate", "?dev=halo-gate", "Halo Gate mock", "sealed card-back gate · not payment, not analysis"),
        card("mock", "?dev=free-scan-sim", "?dev=free-scan-sim", "Free scan sim", "Free Pull mock fixture"),
      ])}
      ${group("Validation harness", [
        card("harness", "?dev=uploaded-result", "?dev=uploaded-result", "Uploaded result · valid", "scan-contract valid fixture render"),
        card("harness", "?dev=uploaded-blocked", "?dev=uploaded-blocked", "Uploaded blocked · invalid", "scan-contract rejection / safe blocked state"),
      ])}
      <footer class="rmap__foot">Append <b>?devnav=1</b> to any route for the dev state-jumper rail. <b>?t=mint</b> is the internal Lab. · The card is the artifact — Blue Room reads the photograph, never the person.</footer>
    </div>`;
}

/* ---------- BR-S074: before/after share view (dev/capture surface) ----------
   A screenshot-clean composition — the source PHOTOGRAPH develops into the CARD,
   the transformation visible in one frame. Native DOM/CSS, no export library, no
   generated download, no new product zone: a capture surface reached via
   ?dev=before-after (sample sources only; ?src toggles). Artifact language only —
   no score / rank / value / public 0-100 / person reading. The card reuses the
   master renderCard (bands only). */
function renderBeforeAfter() {
  const src = SOURCES[state.source];
  const c = src.card;
  return `
    <div class="ba">
      <header class="ba__head">
        <span class="ba__mark">◆ BLUE ROOM</span>
        <p class="ba__thesis">Every photo is already a card. Blue Room develops it.</p>
        <p class="ba__line">The room reads the photograph — frame, light, gesture — never the person.</p>
      </header>
      <div class="ba__stage">
        <figure class="ba__before" data-imgwrap style="--pos:${esc(src.photoTuning.pos)};">
          ${imgOrPlaceholder(src.file, "ba__img")}
          <figcaption class="ba__tag">The photograph</figcaption>
        </figure>
        <div class="ba__seam" aria-hidden="true">
          <span class="ba__arrow">→</span>
          <span class="ba__verb">developed</span>
        </div>
        <div class="ba__after">
          ${renderCard(src, "shiny")}
          <span class="ba__tag ba__tag--after">The same frame, filed as a card</span>
        </div>
      </div>
      <footer class="ba__foot">
        <span class="ba__id">${esc(c.title)} &nbsp;·&nbsp; ${esc(c.archetype)}</span>
        <span class="ba__serial">${esc(c.serial)}</span>
        <span class="ba__honest">Capture surface · sample. The archetype is a photo role, not a person type. Tier bands read the photograph, not a person — never a ranking between cards.</span>
      </footer>
    </div>`;
}

/* ---------- DEV PROTOTYPE CARDS (?dev=proto-cards) — BR-S101 ----------
   Three LOCAL prototype cards from the builder's own photos (assets/source-03/04/05.jpg,
   gitignored — personal, never pushed). FRONT ONLY: each rendered through the master
   renderCard in Free + Halo so the card design + the restored halo can be judged across
   varied photos. NOT wired into the room/SOURCES (no dossier/diagram/metrics authored) —
   a contained prototype surface gated by ?dev (customers never reach it). The renderCard
   stat read falls back to card.stats (these sources aren't in SCAN_RESULTS_V2 → no crash).
   COPY IS ARTIFACT-ONLY (frame / composition / light / scene / held-object geometry),
   never the person — per the locked product law (faces are in-frame). */
const PROTO_CARDS = [
  { id: "proto-fish", no: 3, file: "assets/source-03.jpg",
    halo: { material: "Cold Tide Steel", a: "#6fb3e0", b: "#8b7bff", c: "#9fe0c8" },
    photoTuning: { pos: "50% 38%", zoom: 1, scrim: 0.12, base: { bright: 1, contrast: 1.03, sat: 1.02 } },
    capture: { code: "FIELD / FSH", rec: "2025.05.30" },
    card: { title: "Held Catch, Open Shore", archetype: "The Dispatch",
      note: "The held catch cuts a hard diagonal across a calm horizon band; overcast fjord light flattens the water to a single plane.",
      signature: "Field document · open shoreline", serial: "BR-003-FSH-0001",
      stats: { presence: 72, frame: 80, signal: 64, visualImpact: 70 } } },
  { id: "proto-run", no: 4, file: "assets/source-04.jpg",
    halo: { material: "Field Green Glass", a: "#7fc8a0", b: "#6fb3e0", c: "#cfe2ee" },
    photoTuning: { pos: "50% 45%", zoom: 1, scrim: 0.1, base: { bright: 1.02, contrast: 1.02, sat: 1.03 } },
    capture: { code: "FIELD / RUN", rec: "2025.08.24" },
    card: { title: "Loose Run, Low Angle", archetype: "The Encounter",
      note: "A low lens turns the path into a leading wedge; the foreground mass breaks frame mid-stride, blurring the plane it crosses.",
      signature: "Ground-level · motion frame", serial: "BR-004-RUN-0001",
      stats: { presence: 68, frame: 74, signal: 82, visualImpact: 86 } } },
  { id: "proto-tank", no: 5, file: "assets/source-05.jpg",
    halo: { material: "Tank Glass Teal", a: "#36b6c8", b: "#8b7bff", c: "#e0a060" },
    photoTuning: { pos: "45% 40%", zoom: 1, scrim: 0.12, base: { bright: 1, contrast: 1.04, sat: 1.05 } },
    capture: { code: "INT / TNK", rec: "2025.10.20" },
    card: { title: "Tank Pick, House Light", archetype: "The Encounter",
      note: "Hard ceiling tubes rake a held subject over a tank-blue band; the painted mural flattens the depth behind into a postcard plane.",
      signature: "Interior document · house light", serial: "BR-005-TNK-0001",
      stats: { presence: 76, frame: 70, signal: 78, visualImpact: 80 } } },
];

function renderProtoCards() {
  const row = (src) => `
    <section class="proto__row">
      <div class="proto__rowhead">
        <span class="proto__name">${esc(src.card.title)}</span>
        <span class="proto__file">SRC-${pad2(src.no)} · local · ${esc(src.capture.code)}</span>
      </div>
      <div class="proto__pair">
        <div class="proto__cell"><span class="proto__state">FREE PULL</span><div class="proto__card">${renderCard(src, "free")}</div></div>
        <div class="proto__cell"><span class="proto__state">HALO MINT · DEVELOPED</span><div class="proto__card">${renderCard(src, "shiny")}</div></div>
      </div>
    </section>`;
  return `
    <div class="proto">
      <header class="proto__head">
        <span class="proto__devtag">DEV · PROTOTYPE CARDS — not a product surface</span>
        <h1 class="proto__title">Prototype cards — local photos, front only</h1>
        <p class="proto__note">Three local photos rendered through the master card in Free + Halo, to judge the card design and the restored halo across varied images. Front only — no reading or dossier authored. Local-only (gitignored); reads the photograph as artifact, never the person.</p>
      </header>
      ${PROTO_CARDS.map(row).join("")}
      <footer class="proto__foot">
        <button type="button" class="draft__back" data-view-to="menu">Main menu</button>
        <button type="button" class="draft__sample" data-view-to="room">Sample scan room</button>
      </footer>
    </div>`;
}

/* ============================================================
   THE VAULT (?dev=vault) — BR-S144
   A private archive of SAVED MINTED cards: revisit favorite image moments,
   reopen a saved mint's Stats & Readings, and access each mint by QR code.
   It is NOT a gallery / marketplace / leaderboard / profile / human archive —
   it is a quiet RECORD SYSTEM. The selected mint reuses the master renderCard
   (the crown is the crown), sized down so the page composition carries weight.
   Local mock data (VAULT_MINTS) — trivially replaceable when a real save-store
   ships. Copy is artifact-bound (frame / light / scene / signal), never the
   person — per the locked product law. Scoped, additive: no existing route is
   touched, the back button reuses the menu nav (data-view-to="menu").
============================================================ */

const VAULT_MINTS = [
  { key: "drv", label: "Checkpoint Wave", id: "BR-001-DRV-0001", state: "HALO MINT · DEVELOPED",
    filed: "APR 26, 2025 · 14:22", sealLine: "Sealed · Recorded",
    src: SOURCES[0], thumb: SOURCES[0].file },
  { key: "lnd", label: "Road Morning", id: "BR-001-LND-0022", state: "HALO MINT · DEVELOPED",
    filed: "MAR 12, 2025 · 07:41", sealLine: "Sealed · Recorded",
    src: { no: 22, file: "assets/source-02.jpg",
      halo: { material: "Still-Water Pewter", a: "#6fb3e0", b: "#8b7bff", c: "#9fe0c8" },
      photoTuning: { pos: "50% 44%", zoom: 1, scrim: 0.12, base: { bright: 1.0, contrast: 1.02, sat: 0.97 } },
      capture: { code: "FIELD / LND", rec: "2025.03.12" },
      card: { title: "Road Morning", archetype: "Open-Horizon Frame",
        note: "Low mist holds the valley flat; the road's vanishing line draws the eye to one pale break in the ridge.",
        signature: "Landscape document · first light", serial: "BR-001-LND-0022",
        stats: { presence: 74, signal: 62, visualImpact: 80, charge: 70 } } },
    thumb: "assets/source-02.jpg" },
];

/* small hand-drawn marks reused across the Vault (scribble-archive language) */
const VAULT_WAVE = '<svg viewBox="0 0 170 8" width="170" height="8" preserveAspectRatio="none" aria-hidden="true"><path d="M2 5 Q 12 1 22 5 T 42 5 T 62 5 T 82 5 T 102 5 T 122 5 T 142 5 T 168 5" fill="none" stroke="currentColor" stroke-width="1"/></svg>';
const VAULT_WAVE_SM = '<svg viewBox="0 0 90 7" width="90" height="7" preserveAspectRatio="none" aria-hidden="true"><path d="M2 4 Q 9 1 16 4 T 30 4 T 44 4 T 58 4 T 72 4 T 88 4" fill="none" stroke="currentColor" stroke-width="1"/></svg>';
const VAULT_HEX = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M12 2.5 L20 7 L20 17 L12 21.5 L4 17 L4 7 Z"/><circle cx="12" cy="11" r="2.1"/><path d="M12 13.1 L12 16.4"/></svg>';
/* the sealed-registry marks (BR-S146): a wax-seal authentication emblem + a small
   lock glyph. Decorative — fixed Blue Room palette (var() doesn't resolve in SVG
   presentation attributes; the lock uses currentColor so CSS can tint it). */
const VAULT_SEAL = '<svg class="vseal" viewBox="0 0 120 120" width="74" height="74" aria-hidden="true">'
  + '<circle cx="60" cy="60" r="55" fill="none" stroke="#8a6f44" stroke-width="5" stroke-dasharray="1.5 6.2" opacity="0.8"/>'
  + '<circle cx="60" cy="60" r="45" fill="none" stroke="#b08a52" stroke-width="1"/>'
  + '<circle cx="60" cy="60" r="37" fill="none" stroke="#8a6f44" stroke-width="0.9" opacity="0.7"/>'
  + '<text x="60" y="43" text-anchor="middle" fill="#948f87" font-family="IBM Plex Mono, monospace" font-size="7" letter-spacing="2">ARCHIVE</text>'
  + '<path d="M60 51 L70 61 L60 71 L50 61 Z" fill="none" stroke="#8b7bff" stroke-width="1.4"/>'
  + '<text x="60" y="86" text-anchor="middle" fill="#b08a52" font-family="IBM Plex Mono, monospace" font-size="7" letter-spacing="2">SEALED</text>'
  + '</svg>';
const VAULT_LOCK = '<svg class="vlock" viewBox="0 0 14 14" width="9" height="11" fill="none" aria-hidden="true"><rect x="2" y="6" width="10" height="7" rx="1.3" stroke="currentColor" stroke-width="1.2"/><path d="M4 6 V4 a3 3 0 0 1 6 0 V6" stroke="currentColor" stroke-width="1.2"/></svg>';

/* a deterministic, believable QR placeholder generated from the mint id (3 finder
   patterns + timing rows + id-seeded data modules). Not a functional code — a
   crisp, distinct-per-mint visual that reads instantly as "access by QR". */
function vaultQR(seed) {
  const N = 21;
  const str = String(seed);
  let base = 5381;
  for (let i = 0; i < str.length; i++) base = ((base << 5) + base + str.charCodeAt(i)) >>> 0;
  const bit = (x, y) => {
    let h = (base ^ (x * 73856093) ^ (y * 19349663)) >>> 0;
    h = (h ^ (h >>> 13)) >>> 0; h = (h * 1274126177) >>> 0;
    return ((h >>> 17) & 1) === 1;
  };
  const inBox = (x, y, bx, by) => x >= bx && x < bx + 7 && y >= by && y < by + 7;
  const finder = (x, y) => {
    const f = (bx, by) => { const rx = x - bx, ry = y - by; return (rx === 0 || rx === 6 || ry === 0 || ry === 6) || (rx >= 2 && rx <= 4 && ry >= 2 && ry <= 4); };
    if (inBox(x, y, 0, 0)) return f(0, 0);
    if (inBox(x, y, N - 7, 0)) return f(N - 7, 0);
    if (inBox(x, y, 0, N - 7)) return f(0, N - 7);
    return null;
  };
  let cells = "";
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const fv = finder(x, y);
    let on;
    if (fv !== null) on = fv;
    else if ((x < 8 && y < 8) || (x > N - 9 && y < 8) || (x < 8 && y > N - 9)) on = false; // finder separators
    else if (x === 6 || y === 6) on = (x + y) % 2 === 0; // timing rows
    else on = bit(x, y);
    if (on) cells += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
  }
  return `<svg class="vqr__svg" viewBox="-1 -1 ${N + 2} ${N + 2}" role="img" aria-label="Mint access code (placeholder)"><g fill="currentColor">${cells}</g></svg>`;
}

function renderVault() {
  const m = VAULT_MINTS[0];
  const crop = '<span class="vcrop vcrop--tl"></span><span class="vcrop vcrop--tr"></span><span class="vcrop vcrop--bl"></span><span class="vcrop vcrop--br"></span>';

  const aboutRows = [
    ["Your archive, secured", "Every mint you save is filed, sealed, and recorded."],
    ["Reopen any reading", "Return to the full Stats &amp; Readings at any time."],
    ["QR access", "Scan to verify, share, or open the mint anywhere."],
    ["Favorite moments", "The images and instances that matter, always within reach."],
  ].map(([t, c]) =>
    `<div class="vrow"><span class="vrow__d" aria-hidden="true">◆</span><div class="vrow__txt"><span class="vrow__t">${t}</span><p class="vrow__c">${c}</p></div></div>`
  ).join('<span class="vrow__div" aria-hidden="true"></span>');

  /* the saved-mint COLLECTION — a quiet vertical list on the left (3 saved + 1
     placeholder). Example-light: a calm row each (thumb + title + id), not a
     strong tile grid; the selected row carries a soft violet edge. */
  const collection = VAULT_MINTS.map((mt, i) => {
    const inner =
      `<span class="vcard__thumb">${imgOrPlaceholder(mt.thumb, "vcard__img")}</span>` +
      `<span class="vcard__meta"><span class="vcard__title">${esc(mt.label)}</span><span class="vcard__id">${esc(mt.id)}</span></span>`;
    /* BR-S156: only the ONE real example (Checkpoint Wave) is a live control; the other saved
       moments are static filed-image CUES — present, but not selectable (no data-vault-select). */
    return i === 0
      ? `<button type="button" class="vcard is-selected" data-vault-select="0" aria-pressed="true">${inner}</button>`
      : `<div class="vcard vcard--cue">${inner}</div>`;
  }).join("") +
    `<div class="vcard vcard--empty" aria-hidden="true">
       <span class="vcard__thumb vcard__thumb--empty">+</span>
       <span class="vcard__meta"><span class="vcard__title">New mint</span><span class="vcard__id">appears here</span></span>
     </div>`;

  return `
    <div class="vault" data-vault>
      <header class="vault__top">
        <button type="button" class="vault__back" data-view-to="menu">← Back to the menu</button>
        <span class="vault__eyebrow">BLUE ROOM ARCHIVE&nbsp;&nbsp;·&nbsp;&nbsp;THE VAULT</span>
        <h1 class="vault__title">The Vault</h1>
        <span class="vault__wave" aria-hidden="true">${VAULT_WAVE}</span>
        <p class="vault__intro">Saved minted cards are filed here.<br>Revisit favorite moments or images, reopen their readings, or access each mint by QR code.</p>
        <span class="vault__example" aria-hidden="true">◆ Example · Showcase — not the final Vault</span>
      </header>

      <div class="vault__main">
        <aside class="vault__collection">
          <span class="vcoll__label">Favorite Moments</span>
          <span class="vcoll__wave" aria-hidden="true">${VAULT_WAVE_SM}</span>
          <div class="vcoll__list">${collection}</div>
        </aside>

        <div class="vault__center">
          <div class="vault__frame">
            ${crop}
            <span class="vguide vguide--l" aria-hidden="true"></span>
            <span class="vguide vguide--r" aria-hidden="true"></span>
            <div class="vault__cardwrap" data-vault-card>${renderCard(m.src, "shiny")}</div>
          </div>
          <div class="vault__cardfoot">
            <span class="vault__cardcap" data-vault-cardcap>${esc(m.state)}</span>
            <span class="vault__cardprov">${VAULT_LOCK}<span data-vault-provtext>Filed ${esc(m.filed.split(" · ")[0])} → Sealed → Recorded</span></span>
          </div>
        </div>

        <div class="vault__access">
          <div class="vqr">
            <span class="vqr__label">Access Mint</span>
            <div class="vqr__frame">
              ${crop}
              <div class="vqr__code" data-vault-qr>${vaultQR(m.id)}</div>
            </div>
            <span class="vqr__id" data-vault-qrid>${esc(m.id)}</span>
            <span class="vqr__cta">Scan to access</span>
          </div>
          <button type="button" class="vread" data-vault-openreading>
            <span class="vread__mark" aria-hidden="true">${VAULT_HEX}</span>
            <span class="vread__txt">
              <span class="vread__t">Open Reading</span>
              <span class="vread__d">Reopen this card’s Stats &amp; Readings</span>
            </span>
          </button>
        </div>

        <aside class="vault__about">
          <span class="vabout__head">What is the Vault?</span>
          <span class="vabout__wave" aria-hidden="true">${VAULT_WAVE_SM}</span>
          <div class="vabout__rows">${aboutRows}</div>
          <p class="vabout__note">Each mint is a record.<br>Each record is yours.<span class="vabout__seal" aria-hidden="true">◈</span></p>
        </aside>

        <div class="vault__credit" aria-hidden="true">
          <div class="vcredit__txt">
            <span class="vcredit__l1">Blue Room Archive</span>
            <span class="vcredit__l2">A private record system</span>
            <span class="vcredit__l3">Not for public release</span>
          </div>
          <span class="vcredit__seal">${VAULT_SEAL}</span>
        </div>
      </div>
    </div>`;
}

function wireVault() {
  const root = document.querySelector(".vault");
  if (!root) return;
  let sel = 0;
  const $ = (s) => root.querySelector(s);
  const cardSlot = $("[data-vault-card]"), qrSlot = $("[data-vault-qr]"), qrId = $("[data-vault-qrid]"),
    cardCap = $("[data-vault-cardcap]"), cardProv = $("[data-vault-provtext]");

  function selectMint(i) {
    if (i < 0 || i >= VAULT_MINTS.length || i === sel) return;
    sel = i;
    const m = VAULT_MINTS[i];
    if (cardSlot) cardSlot.innerHTML = renderCard(m.src, "shiny");
    if (cardCap) cardCap.textContent = m.state;
    if (cardProv) cardProv.textContent = `Filed ${m.filed.split(" · ")[0]} → Sealed → Recorded`;
    if (qrSlot) qrSlot.innerHTML = vaultQR(m.id);
    if (qrId) qrId.textContent = m.id;
    root.querySelectorAll("[data-vault-select]").forEach((b) => {
      const on = Number(b.dataset.vaultSelect) === i;
      b.classList.toggle("is-selected", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  root.addEventListener("click", (e) => {
    const tile = e.target.closest("[data-vault-select]");
    if (tile) { selectMint(Number(tile.dataset.vaultSelect)); return; }
    if (e.target.closest("[data-vault-openreading]")) {
      /* Reopen the selected mint's Stats & Readings. TODO: a per-mint reading
         store. For now route to the canonical developed reading reveal (the real
         Stats & Readings surface) — non-breaking, reuses an existing route. */
      location.href = "?dev=staged-reveal&rv=developed";
    }
  });
}

/* ============================================================
   THE ANTECHAMBER OF MARKS (?dev=arcane) — BR-S157
   The intake screen of the ARCANE (photo-less) reading: the seeker
   SETS THEIR MARKS before the reading is drawn. A thin central
   column of inscribed lines, open dark to either side; as each mark
   is set, one primitive red-ochre cave daub answers it in the
   margin, and a fine gold crown overhead wakes band-by-band. The
   reading RESULT is a LATER screen — the crown's solid weight is
   deliberately withheld here. Copy is archive-dry + in-world (no
   mechanism words). Scoped to .antechamber; isolated dev route.
   NOTE: the person-safety WALL for the omen verdict about a real
   named person is a prerequisite of the RESULT page, not this intake.
============================================================ */

/* five primitive red-ochre gestures — hand-rough, never geometric-clean;
   one daubs up in the margin as its mark is set (fill/stroke = currentColor). */
const ANTE_DAUBS = {
  1: '<svg viewBox="0 0 44 26" aria-hidden="true"><path d="M4 15 Q11 7 19 11 Q28 15 39 8 Q35 12 34 15 Q30 20 21 18 Q12 17 7 18 Q4 18 4 15 Z"/><path d="M14 19 Q22 22 31 19 Q24 24 16 22 Z"/></svg>',
  2: '<svg viewBox="0 0 26 36" aria-hidden="true"><path d="M8 3 Q5 17 9 33" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round"/><path d="M17 5 Q20 18 15 31" fill="none" stroke="currentColor" stroke-width="3.1" stroke-linecap="round"/></svg>',
  3: '<svg viewBox="0 0 32 30" aria-hidden="true"><path d="M7 8 Q11 6 11 10 Q10 13 7 12 Q5 10 7 8Z"/><path d="M18 5 Q21 4 21 7 Q20 9 18 8 Q16 6 18 5Z"/><path d="M23 17 Q27 16 26 20 Q23 23 20 21 Q19 18 23 17Z"/><path d="M11 20 Q14 19 14 22 Q12 24 10 22 Q9 20 11 20Z"/></svg>',
  4: '<svg viewBox="0 0 30 36" aria-hidden="true"><path d="M15 3 Q27 5 25 18 Q24 31 13 30 Q4 28 5 16 Q6 5 15 3 Z"/></svg>',
  5: '<svg viewBox="0 0 36 28" aria-hidden="true"><path d="M6 4 L8 23" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><path d="M13 3 L14 23" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><path d="M20 4 L21 22" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><path d="M3 12 Q17 7 31 14" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>',
};

/* a fine banded circlet, thin line only — four segments (one per core mark),
   each waking ghost→gold as its mark is set. Never fully resolves here. */
const ANTE_CROWN =
  '<svg class="ante__crown" viewBox="0 0 72 46" data-lit="0" aria-hidden="true">'
  + '<g class="ante__cseg" data-seg="1"><path d="M10 40 Q36 43 62 40 L60 31 Q36 34 12 31 Z"/></g>'
  + '<g class="ante__cseg" data-seg="2"><path d="M13 31 L21 13 L29 31"/><circle cx="21" cy="11" r="1.7"/></g>'
  + '<g class="ante__cseg" data-seg="3"><path d="M28 31 L36 6 L44 31"/><circle cx="36" cy="4" r="1.9"/></g>'
  + '<g class="ante__cseg" data-seg="4"><path d="M43 31 L51 13 L59 31"/><circle cx="51" cy="11" r="1.7"/></g>'
  + '</svg>';

/* the marks the reading is drawn from — only the in-world NAME renders; the
   plain descriptor lives in aria-label only, and optionality is spoken in the
   microcopy ("may be left dark"), never a rendered "(optional)". */
const ANTE_MARKS = [
  { i: 1, core: true,  name: "The Name Borne",           aria: "Given name",           ph: "the name you answer to" },
  { i: 2, core: true,  name: "The Day First Counted",    aria: "Date of birth",        ph: "the day, the month, the year" },
  { i: 3, core: true,  name: "The Hour First Struck",    aria: "Hour of birth",        ph: "the hour, if it is known" },
  { i: 4, core: true,  name: "The Ground First Stood On", aria: "Place of birth",      ph: "the town, and the land" },
  { i: 5, core: false, name: "What Is Brought",          aria: "The matter you bring", ph: "the matter you carry, in a line — or leave it unspoken" },
];

function renderArcane() {
  const daubs = [1, 2, 3, 4, 5].map((n) =>
    `<span class="ante__daub ante__daub--${n}${n === 5 ? " ante__daub--warm" : ""}" data-daub="${n}">${ANTE_DAUBS[n]}</span>`
  ).join("");
  const marks = ANTE_MARKS.map((m) =>
    `<label class="ante__mark" data-mark="${m.i}" data-core="${m.core ? 1 : 0}" data-set="0">
       <span class="ante__mark-name">${esc(m.name)}</span>
       <input class="ante__mark-in" type="text" autocomplete="off" spellcheck="false" aria-label="${esc(m.aria)}" placeholder="${esc(m.ph)}">
     </label>`
  ).join("");
  return `
    <div class="antechamber" data-antechamber>
      <button type="button" class="ante__back" data-view-to="menu">← Back to the menu</button>
      <div class="ante__margins" aria-hidden="true">${daubs}</div>
      <div class="ante__column">
        <div class="ante__crownwrap" aria-hidden="true">${ANTE_CROWN}</div>
        <h1 class="ante__title">The Setting of Marks</h1>
        <p class="ante__sub">Before the reading is drawn, lay down what it is drawn from.</p>
        <p class="ante__sub2">The crown overhead is not yet whole.</p>
        <div class="ante__marks">${marks}</div>
        <div class="ante__begin-wrap">
          <button type="button" class="ante__begin" data-begin disabled>draw the reading</button>
          <p class="ante__micro">Each mark, once set, is kept.</p>
        </div>
      </div>
      <div class="ante__drawn" data-ante-drawn><p>The marks are laid.<br>The reading waits beyond.</p></div>
    </div>`;
}

function wireArcane() {
  const root = document.querySelector(".antechamber");
  if (!root) return;
  const marks = [...root.querySelectorAll(".ante__mark")];
  const crown = root.querySelector(".ante__crown");
  const segs = [...root.querySelectorAll(".ante__cseg")];
  const begin = root.querySelector("[data-begin]");
  const drawn = root.querySelector("[data-ante-drawn]");
  const daubs = {};
  root.querySelectorAll("[data-daub]").forEach((d) => { daubs[d.dataset.daub] = d; });
  const flashTimers = {};

  function refresh() {
    let coreSet = 0, nameSet = false, daySet = false, matterSet = false;
    marks.forEach((m) => {
      const inp = m.querySelector(".ante__mark-in");
      const set = inp.value.trim() !== "";
      const idx = m.dataset.mark;
      m.dataset.set = set ? "1" : "0";
      if (daubs[idx]) daubs[idx].classList.toggle("is-shown", set);   // the cave answers in the margin
      if (m.dataset.core === "1") {
        if (set) coreSet++;
        if (idx === "1") nameSet = set;
        if (idx === "2") daySet = set;
        const seg = segs[Number(idx) - 1];                            // this mark wakes its own crown band
        if (seg) {
          const wasLit = seg.classList.contains("is-lit");
          seg.classList.toggle("is-lit", set);
          if (set && !wasLit) {                                       // a brief brighten that settles
            seg.classList.add("just-lit");
            clearTimeout(flashTimers[idx]);
            flashTimers[idx] = setTimeout(() => seg.classList.remove("just-lit"), 760);
          }
          if (!set) seg.classList.remove("just-lit");
        }
      } else if (set) {
        matterSet = true;                                            // the optional matter deepens the glow, lights no band
      }
    });
    crown.dataset.lit = String(coreSet);
    crown.classList.toggle("is-woken", coreSet >= 4);
    crown.classList.toggle("is-enriched", matterSet);
    const ready = nameSet && daySet;                                 // the name and the day suffice
    begin.classList.toggle("is-ready", ready);
    begin.disabled = !ready;
  }

  marks.forEach((m) => {
    const inp = m.querySelector(".ante__mark-in");
    inp.addEventListener("input", refresh);
    inp.addEventListener("blur", refresh);
  });
  begin.addEventListener("click", () => { if (!begin.disabled) root.classList.add("is-drawing"); });
  if (drawn) drawn.addEventListener("click", () => root.classList.remove("is-drawing"));   // the door lets you step back
  refresh();
}

function mountDev() {
  const C = window.BlueRoomScanContract;
  const F = (C && C.DEV_FIXTURES) || {};
  if (state.dev === "proto-cards") {
    document.getElementById("devView").innerHTML = renderProtoCards();
    return;
  }
  if (state.dev === "vault") {
    document.getElementById("devView").innerHTML = renderVault();
    wireVault();
    return;
  }
  if (state.dev === "arcane") {
    document.getElementById("devView").innerHTML = renderArcane();
    wireArcane();
    return;
  }
  if (state.dev === "staged-reveal") {
    // BR-S124 — isolated staged-reveal surface. Self-contained units in
    // /reveal (window.BRReveal); this branch only hands it the mount node.
    const host = document.getElementById("devView");
    if (window.BRReveal && typeof window.BRReveal.mount === "function") window.BRReveal.mount(host);
    else host.innerHTML = '<p style="padding:48px;color:#948f87;text-align:center;font-family:sans-serif">Staged reveal failed to load (reveal/*.js).</p>';
    return;
  }
  if (state.dev === "menu-reveal") {
    // PREVIEW: the REAL menu grid (the sacred .menu__inner — byte-identical start frame),
    // hosted on a non-view-gated .menurev wrapper (the .menu class is display:none in dev).
    // The sample card slot hosts the staged reveal (menustage): card develops in place,
    // the read slides in on the right, "see deeper" promotes to a fullview. Live menu UNTOUCHED.
    const host = document.getElementById("devView");
    host.innerHTML =
      '<div class="menurev">' +
        '<div class="menu__inner">' +
          '<header class="menu__head">' +
            '<h1 class="menu__brand"><span class="menu__mark">◆</span> BLUE ROOM</h1>' +
            '<p class="menu__thesis">Every photo is already a card. The room develops it.</p>' +
            '<p class="menu__trust">Image-as-artifact scan — it reads frame, gesture and signal, never the person.</p>' +
          '</header>' +
          '<section class="menu__stage menu__stage--reveal">' +
            '<div class="msample__cap"><span class="msample__label">Sample Scan</span><span class="msample__type">SRC-01 · Archive</span></div>' +
            '<p class="menurev__note">◆ Example · Showcase</p>' +
            '<div class="menurev__mount"></div>' +
          '</section>' +
          '<div class="menu__controls">' +
            '<span class="menu__rule" aria-hidden="true"></span>' +
            '<p class="msample__seal">The front is complete. The same card has a sealed back.</p>' +
            '<div class="menu__doors">' +
              '<button type="button" class="menu__door menu__door--add" data-draft-pick><span class="menu__door-kicker">Your Photo</span><span class="menu__door-name">Add your photo</span><span class="menu__door-desc">Stage your image as a local draft. The scan engine isn\'t connected yet — nothing reads it.</span></button>' +
              '<button type="button" class="menu__door menu__door--sample" data-view-to="room"><span class="menu__door-kicker">Sample</span><span class="menu__door-name">View sample card</span><span class="menu__door-desc">See a finished developed card — SRC-01. A sample, not your photo.</span></button>' +
            '</div>' +
            '<p class="menu__foot">One sample · SRC-01 · Driver.</p>' +
          '</div>' +
        '</div>' +
        '<button type="button" class="menurev__back" aria-label="Return to the menu">← Back to the menu</button>' +
        MENUREV_FWD_ARROW +
      '</div>';
    const mountEl = host.querySelector(".menurev__mount");
    if (mountEl && window.BRReveal && typeof window.BRReveal.mount === "function") {
      function _escBack(e) {   // BR-S134 M6: Esc returns from the fullview takeover
        if (e.key === "Escape") {
          e.preventDefault();
          document.removeEventListener("keydown", _escBack, true);
          if (rev && rev.toFree) rev.toFree();
        }
      }
      const rev = window.BRReveal.mount(mountEl, {
        menustage: true,
        onFullview: function () {
          const m = host.querySelector(".menurev");
          if (m) { m.classList.add("is-fullview"); m.classList.remove("is-vaultready"); }   // BR-S156: vault hand-off closed until the read settles
          document.addEventListener("keydown", _escBack, true);
        },
        onReadSettled: function () {
          const m = host.querySelector(".menurev");
          if (m) m.classList.add("is-vaultready");   // BR-S156: reading fully drawn → release the arrow
        },
        onBack: function () {
          const m = host.querySelector(".menurev");
          if (m) { m.classList.remove("is-fullview"); m.classList.remove("is-vaultready"); }
          document.removeEventListener("keydown", _escBack, true);
        },
      });
      const back = host.querySelector(".menurev__back");
      if (back) back.addEventListener("click", function () { if (rev && rev.toFree) rev.toFree(); });
      const fwd = host.querySelector(".menurev__fwdbtn");
      if (fwd) fwd.addEventListener("click", function () { location.href = "?dev=vault"; });
    }
    return;
  }
  if (state.dev === "review-map") {
    document.getElementById("devView").innerHTML = renderReviewMap();
    return;
  }
  if (state.dev === "before-after") {
    document.getElementById("devView").innerHTML = renderBeforeAfter();
    return;
  }
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
        <p class="fpcard__vreason">The dossier layer is archived — additional production notes held in conservation.</p>
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
  closeCardQR();                 // a rebuilt #stageZone drops any open QR; detach its listeners
  closeMintShowcase(false);       // the dossier rebuilds below; drop any showcased plate (no scroll)
  const src = SOURCES[state.source];
  document.body.dataset.treatment = state.treatment;
  applyView();

  document.getElementById("sourcePanel").innerHTML = renderLeftPanel(src, state.treatment, state.tab);
  mountMetricsReel();
  /* one quiet orientation line above the artifact — what the room does,
     stated once, plus a sample-scan cue so the demo photos read as
     fixtures, not someone's profile. */
  const stageIntro = `
    <div class="stageintro">
      <p class="stageintro__line">Every photo is already a card. The room develops it.</p>
      <span class="stageintro__cue">SAMPLE · SRC-${pad2(src.no)} · not your photo</span>
    </div>`;
  document.getElementById("stageZone").innerHTML =
    stageIntro +
    renderCard(src, state.treatment) +
    `<a class="stagecue" href="#dossierMount">▼ &nbsp;SCAN DOSSIER BELOW</a>`;
  document.getElementById("readingPanel").innerHTML = renderReadingPanel(src, state.treatment);
  document.getElementById("readingPanel").setAttribute("data-mode", state.treatment === "free" ? "archive" : "developed");
  document.getElementById("dossierMount").innerHTML = renderDossier(src, state.treatment);
  mountSurfaceRecords();

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

/* ---------- the Develop ceremony: in-place treatment flip ----------
   The develop click (and the reverse) re-skin the PERSISTENT card node —
   never re-mounting #stageZone — so the finish tweens, the card-in pop does
   not re-fire, and the dossier serial resolves '····'→address in place.
   render() stays the path for boot / source / view / devnav / deep-link init. */
const MOTION_OFF = window.matchMedia
  ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
  : false;

function patchCardFront(src, treatment) {
  const card = document.querySelector("#stageZone .card");
  if (!card) return;
  const c = src.card;
  const t = TREATMENTS[treatment];
  const minted = treatment !== "free";
  card.dataset.treatment = treatment;
  const rarity = card.querySelector(".card__rarity");
  if (rarity) rarity.textContent = t.rarity;
  const stamp = card.querySelector(".mintstrip__state");
  if (stamp) { stamp.textContent = t.stamp; stamp.classList.toggle("mintstrip__state--free", !minted); }
  const serial = card.querySelector(".mintstrip__serial");
  if (serial) { serial.textContent = `${c.serial} · ${t.strip}`; serial.classList.toggle("mintstrip__serial--ghost", !minted); }
  const bar = card.querySelector(".barcode");
  if (bar) { bar.classList.toggle("barcode--ghost", !minted); bar.tabIndex = minted ? 0 : -1; }
  const mintlink = card.querySelector(".mintlink");
  if (mintlink) { mintlink.classList.toggle("mintlink--ghost", !minted); mintlink.tabIndex = minted ? 0 : -1; }
}

function runDevelopChoreography() {
  if (MOTION_OFF) return; // static rules already show the final developed state
  const card = document.querySelector("#stageZone .card");
  const dossier = document.getElementById("dossierMount");
  if (!card) return;
  card.classList.remove("is-developing");
  if (dossier) dossier.classList.remove("is-developing-dossier");
  void card.offsetWidth; // one intentional reflow — restart-safe replay
  card.classList.add("is-developing");
  if (dossier) dossier.classList.add("is-developing-dossier");
  card.addEventListener("animationend", function done(ev) {
    if (ev.target !== card || ev.animationName !== "develop-run") return;
    card.classList.remove("is-developing");
    if (dossier) dossier.classList.remove("is-developing-dossier");
    card.removeEventListener("animationend", done);
  });
}

/* In-place re-skin: flip the treatment without rebuilding the card node. */
function applyTreatment(next) {
  closeCardQR();                 // QR must not survive a treatment re-skin (the node persists)
  closeMintShowcase(false);       // nor a showcased Mint plate (the dossier re-renders)
  state.treatment = next;
  if (next !== "mint") state.labMaterial = null;
  const src = SOURCES[state.source];

  document.body.dataset.treatment = next;

  /* page-level halo material accents (parity with render) */
  document.body.style.setProperty("--halo-a", src.halo.a);
  document.body.style.setProperty("--halo-b", src.halo.b);
  document.body.style.setProperty("--halo-c", src.halo.c);

  /* card front: flip the finish + patch the treatment-dependent text in place */
  patchCardFront(src, next);

  /* re-render the content panels (NEVER #stageZone — the card must persist) */
  document.getElementById("sourcePanel").innerHTML = renderLeftPanel(src, next, state.tab);
  mountMetricsReel();
  const reading = document.getElementById("readingPanel");
  reading.innerHTML = renderReadingPanel(src, next);
  reading.setAttribute("data-mode", next === "free" ? "archive" : "developed");
  document.getElementById("dossierMount").innerHTML = renderDossier(src, next);
  mountSurfaceRecords();

  document.querySelectorAll("#treatmentToggle button").forEach((b) =>
    b.classList.toggle("is-active", b.dataset.treatment === next));

  /* one-shot ceremony only when developing; the reverse is a quiet recede */
  if (next !== "free") runDevelopChoreography();
}

/* Delegated once — the develop CTA and the reverse both carry [data-goto]. */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-goto]");
  if (!btn) return;
  applyTreatment(btn.dataset.goto);
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

/* DEV NAV (dev-only, gated by ?devnav=1 + body[data-devnav]) — jumps between
   addressable states for inspection. Separate [data-devnav] namespace so it
   never collides with [data-goto]/[data-view-to]. State navigation only: no
   product side effect, no file picker. treat/src/tab also enter the room so
   the change is visible; dev fixtures reload (mountDev runs only at init). */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-devnav]");
  if (!btn) return;
  const [kind, val] = btn.dataset.devnav.split(":");
  if (kind === "view") { state.view = val; applyView(); window.scrollTo(0, 0); }
  else if (kind === "treat") { state.treatment = val; if (val !== "mint") state.labMaterial = null; state.view = "room"; render(); window.scrollTo(0, 0); }
  else if (kind === "src") { state.source = Number(val); state.view = "room"; render(); window.scrollTo(0, 0); }
  else if (kind === "tab") { state.tab = val; state.view = "room"; render(); window.scrollTo(0, 0); }
  else if (kind === "dev") { const u = new URL(location.href); u.searchParams.set("dev", val); u.searchParams.set("devnav", "1"); location.href = u.toString(); }
});

/* Local draft: pick / replace a browser-local photo (no upload, no store). */
document.addEventListener("click", (e) => {
  if (e.target.closest("[data-draft-pick]")) pickPhoto();
});
document.getElementById("draftFile").addEventListener("change", (e) => {
  loadDraftFile(e.target.files && e.target.files[0]);
});

/* Build Local Card (BR-S092): the filing event — mint the local card identity
   and route to the LOCAL FRONT CARD. Generates no scan and no reading. */
document.addEventListener("click", (e) => {
  if (!e.target.closest("[data-build-card]")) return;
  buildLocalCard();
});

/* Scan Development Gate: open / close. Toggles a render flag only — it never
   runs or generates a scan. NOTE: with BR-S092 no product surface emits
   data-gate="open" any more (the intake CTA now Builds the Local Card), so this
   path is dormant; renderGate is kept honest + intact for a future engine. */
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

/* Metrics register reel controls (BR-S115): prev/next arrows + index ticks. The
   wheel + IntersectionObserver are wired per-render in mountMetricsReel; these
   clicks delegate off the stable #sourcePanel so they survive re-renders. */
document.getElementById("sourcePanel").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-reel]");
  if (!btn || !_reel) return;
  const k = btn.dataset.reel;
  if (k === "prev") _reel.prev();
  else if (k === "next") _reel.next();
  else _reel.to(Number(k));
});

/* Source lightbox (BR-S115): open from the Source-tab photo; close on the X, the
   backdrop / around the photo, or Esc. The overlay lives at body level (index.html). */
document.addEventListener("click", (e) => {
  const open = e.target.closest("[data-lightbox-open]");
  if (open) {
    const lb = document.getElementById("lightbox"), img = document.getElementById("lightboxImg");
    if (lb && img) { img.src = open.dataset.lightboxSrc || ""; lb.classList.add("is-open"); lb.setAttribute("aria-hidden", "false"); }
    return;
  }
  if (e.target.closest("[data-lightbox-close]")) {
    const lb = document.getElementById("lightbox");
    if (lb) { lb.classList.remove("is-open"); lb.setAttribute("aria-hidden", "true"); }
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  const lb = document.getElementById("lightbox");
  if (lb && lb.classList.contains("is-open")) { lb.classList.remove("is-open"); lb.setAttribute("aria-hidden", "true"); }
});

/* QR pop-out (BR-S120): the placeholder scan code seats to the card centre while the
   card front blurs to its OWN base colour. Open is scoped to the LIVE room card
   (#stageZone) so the menu / proto / dev reuses of renderCard stay inert. Outside-click,
   Esc, or a second trigger tap close it; the document listeners attach only while open
   and tear down on close, so nothing leaks between opens. render()/applyTreatment also
   force-close (a rebuilt or re-skinned card must not keep a stale QR open). */
function closeCardQR() {
  document.removeEventListener("pointerdown", onQROutside, true);
  document.removeEventListener("keydown", onQREsc, true);
  const card = document.querySelector("#stageZone .card.is-qr-open");
  if (!card) return;
  card.classList.remove("is-qr-open");
  const layer = card.querySelector(".cardqr");
  if (layer) layer.setAttribute("aria-hidden", "true");
  if (MOTION_OFF) return;                                // CSS snaps it off, no exit tween
  /* BR-S123: a symmetric, precise exit — keep .cardqr mounted through a brief reverse
     fade/scale (.is-qr-closing) so the dismiss is satisfying, not a sudden display:none. */
  card.classList.add("is-qr-closing");
  window.clearTimeout(closeCardQR._t);
  closeCardQR._t = window.setTimeout(() => card.classList.remove("is-qr-closing"), 230);
}
function onQROutside(e) {
  /* the sharp QR seat keeps it open; the trigger toggles via its own handler;
     anything else (the blurred surround, or elsewhere on the page) closes it. */
  if (e.target.closest("#stageZone .card.is-qr-open .cardqr__seat")) return;
  if (e.target.closest("[data-card-qr]")) return;
  closeCardQR();
}
function onQREsc(e) { if (e.key === "Escape") { e.stopPropagation(); closeCardQR(); } }
document.addEventListener("click", (e) => {
  const trig = e.target.closest("[data-card-qr]");
  if (!trig) return;
  const card = trig.closest("#stageZone .card");
  if (!card) return;                                     // menu / proto / dev reuses: inert
  if (card.classList.contains("is-developing")) return;  // don't fight the develop ceremony
  e.preventDefault(); e.stopPropagation();
  closeMintShowcase(false);                              // QR + Mint showcase are exclusive
  const opening = !card.classList.contains("is-qr-open");
  closeCardQR();                                         // idempotent reset (runs the exit if open)
  if (!opening) return;                                  // second tap = toggle closed
  card.classList.remove("is-qr-closing");                // cancel any in-flight exit
  window.clearTimeout(closeCardQR._t);
  void card.offsetWidth;                                 // restart the enter cleanly
  card.classList.add("is-qr-open");
  const layer = card.querySelector(".cardqr");
  if (layer) layer.setAttribute("aria-hidden", "false");
  setTimeout(() => {                                     // defer so THIS click doesn't close it
    document.addEventListener("pointerdown", onQROutside, true);
    document.addEventListener("keydown", onQREsc, true);
  }, 0);
});

/* Mint Record showcase (BR-S123): the card's "Mint Record" link lifts the REAL dossier
   Mint Record plate (.dplate--mint) to mid-screen over a blurred page scrim; dismissing
   (outside-click / Esc) un-blurs and smooth-scrolls back to the TOP of the page. Open is
   scoped to the LIVE card (#stageZone) so ONLY the card triggers it — the real dossier
   plate is never a trigger. render()/applyTreatment() force-close (the dossier rebuilds). */
function closeMintShowcase(toTop) {
  document.removeEventListener("pointerdown", onMintOutside, true);
  document.removeEventListener("keydown", onMintEsc, true);
  if (!document.body.classList.contains("is-mint-showcase")) return;
  document.body.classList.remove("is-mint-showcase");
  const scrim = document.getElementById("mintScrim");
  if (scrim) scrim.setAttribute("aria-hidden", "true");
  if (toTop) window.scrollTo({ top: 0, behavior: MOTION_OFF ? "auto" : "smooth" });
}
function onMintOutside(e) {
  if (e.target.closest(".dplate--mint")) return;          // clicking the showcased plate keeps it
  if (e.target.closest("[data-mint-showcase]")) return;   // the trigger toggles via its own handler
  closeMintShowcase(true);
}
function onMintEsc(e) { if (e.key === "Escape") { e.stopPropagation(); closeMintShowcase(true); } }
document.addEventListener("click", (e) => {
  const trig = e.target.closest("[data-mint-showcase]");
  if (!trig) return;
  const card = trig.closest("#stageZone .card");
  if (!card) return;                                      // only the LIVE card triggers; dossier plate inert
  if (card.dataset.treatment === "free") return;          // minted-only: free has no real Mint Record
  if (card.classList.contains("is-developing")) return;
  e.preventDefault(); e.stopPropagation();
  closeCardQR();                                          // mutually exclusive with the QR pop-out
  const opening = !document.body.classList.contains("is-mint-showcase");
  if (!opening) { closeMintShowcase(true); return; }      // second tap = dismiss to top
  const plate = document.querySelector("#dossierMount .dplate--mint");
  if (!plate) return;
  plate.scrollTop = 0;
  document.body.classList.add("is-mint-showcase");
  const scrim = document.getElementById("mintScrim");
  if (scrim) scrim.setAttribute("aria-hidden", "false");
  setTimeout(() => {                                      // defer so THIS click doesn't close it
    document.addEventListener("pointerdown", onMintOutside, true);
    document.addEventListener("keydown", onMintEsc, true);
  }, 0);
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
  if (state.treatment !== "mint") state.labMaterial = null;
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
  if (/^[1-9]$/.test(e.key) && Number(e.key) <= SOURCES.length) state.source = Number(e.key) - 1;
  else if (e.key.toLowerCase() === "f") { state.treatment = "free"; state.labMaterial = null; }
  else if (e.key.toLowerCase() === "m") state.treatment = "mint";
  else if (e.key.toLowerCase() === "h" || e.key.toLowerCase() === "s") { state.treatment = "shiny"; state.labMaterial = null; }
  else if ((e.key === "[" || e.key === "]") && state.treatment === "mint") {
    /* Lab-only finish cycle (CARD_TECH_LAB §20 material study): signature(null)
       → cold-foil → black-star → night-gloss → signature. Lab state only. */
    const seq = [null, "cold-foil", "black-star", "night-gloss"];
    const i = seq.indexOf(state.labMaterial);
    state.labMaterial = seq[(i + (e.key === "]" ? 1 : -1) + seq.length) % seq.length];
  }
  else return;
  render();
});

/* Data-driven source toggle (BR-S103): build the SRC buttons from SOURCES so the
   rail auto-scales to N sources. Replaces the 2 hardcoded index.html buttons at
   init; the is-active sync (in render) + the [data-source] click handler are
   already generic. */
function renderSourceToggle() {
  const el = document.getElementById("sourceToggle");
  if (!el) return;
  el.innerHTML = SOURCES.map((s, i) =>
    `<button type="button" data-source="${i}" class="toggle__btn${i === state.source ? " is-active" : ""}">SRC ${pad2(s.no)} · ${esc(s.short || s.label)}</button>`
  ).join("");
}

mountMenu();
renderSourceToggle();
/* DEV NAV: fill + reveal the dev rail only behind ?devnav=1; sets the
   body attribute the CSS gates on. Inert (display:none) on any clean URL. */
if (DEVNAV) {
  document.body.dataset.devnav = "1";
  const devnavEl = document.getElementById("devnav");
  devnavEl.innerHTML = renderDevnav();
  devnavEl.removeAttribute("hidden");
}
if (state.view === "dev") mountDev();
render();
