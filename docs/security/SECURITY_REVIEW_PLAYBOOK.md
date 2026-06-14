# BLUE ROOM — Security Review Playbook

Layer: PLAYBOOK · Status: REFERENCE (run on greenlight, not standing) · 2026-06-14
Location: `docs/security/SECURITY_REVIEW_PLAYBOOK.md`

> This is an **ordered go-through**, not a scan. It is the sequence to run **WHEN the builder
> greenlights a security pass** ("security control"). It does **NOT** assert the code is
> secure — it tells a reviewer where to look, in what order, with pass/fail gates, and it
> carries an append-only register of things to check. A clean run of this playbook means
> "the listed gates were walked," never "BLUE ROOM is secure."

Companion maps — do **not** duplicate them here:
- `docs/UNIVERSE_ZONE_MAP_V1.md` — concept zones + the §7 aggregate-refusal wall (the safety law this playbook enforces at the engine red-line).
- `docs/FILE_MAP.md` — file router (what each file does, when to touch it).
- `docs/map/` — the "you are here" skeleton of the **built artifact**. This playbook lives in `docs/security/` and is the security lane of that map.

Authority inheritance: the red lines in §2.5–§2.6 are **not negotiable by this doc** — they
inherit from `UNIVERSE_ZONE_MAP_V1` §7 (LOCKED-grade), `HUMAN_READ_LINE_V1`, and
`halo/HALO_GATE_BOUNDARY_V1`. This playbook routes a reviewer to them; it cannot relax them.

---

## 1. Scope + current posture (one honest paragraph)

BLUE ROOM is a **static HTML/CSS/JS prototype** — no build step, no Node, no backend, no
database, no login, no payment, no upload, no AI, no secrets. Five files at the repo root
(`index.html`, `styles.css`, `app.js`, `data.js`, `scan-contract.js`) plus two local image
assets, served as flat files. **Today the attack surface is small and mostly client-side:**
all rendering is template-literal `innerHTML` assembled in `app.js` and funnelled through one
escaper, `esc()` (`app.js:8-14`); all content is hardcoded fixture data in `data.js`; the only
user-controlled inputs are (a) URL params, each validated against a fixed allowlist
(`app.js:50-69`), and (b) a **browser-local** image draft via `#draftFile` that is **never
uploaded, stored, or analyzed** (`loadDraftFile`, `app.js:1007-1026`). The one external
dependency is Google Fonts CSS loaded from `fonts.googleapis.com` (`index.html:7-12`), with no
Subresource Integrity. **The real attack surface is FUTURE, not present** — it arrives the day
any of these is wired: the uploaded-photo scan engine, a backend/API, payment, login, or a
public host. `scan-contract.js` exists as the pre-built **safety valve** for that future engine
(it validates a future uploaded result and blocks forbidden/human-rating fields) but is **not
wired into the live flow** today. So this playbook is front-loaded on the few live concerns and
heavily weighted toward the future red lines that must be cleared **before** those capabilities
ship. Running it does not certify security; it certifies the gates were walked.

---

## 2. The ordered review sequence (walk top to bottom; each step has a gate)

Run the steps **in order**. A step's gate is **PASS / FAIL / N/A-TODAY**. A FAIL at a gate
stops promotion of whatever change requested the pass until the finding is logged in §3 and
either fixed or explicitly accepted. `N/A-TODAY` means the surface does not exist yet — record
it so the re-run triggers (§4) know to revisit.

### 2.0 — Step 0: Static-review intake (orient before judging)
- Confirm the build is still the static prototype: no new `fetch`/network call, no new
  `<script src>` in `index.html`, no new storage API, no backend file. Quick grounding greps:
  `fetch(` · `XMLHttpRequest` · `localStorage` · `sessionStorage` · `eval(` · `new Function` ·
  `<script`. (Today: the only `fetch` lives in `dev-live.html`, a dev-only live-reload helper,
  not shipped in `index.html`.)
- Note any new file under the repo root or a new `?param` read in `app.js`.
- **Gate:** the surface is still "static prototype, no backend." If that is no longer true,
  this playbook is under-scoped — escalate to a full review and re-trigger (§4) before continuing.

### 2.1 — Step 1: DOM / XSS (the live concern)
Every visible surface is built by string-concatenated `innerHTML` (`app.js` has ~14
`innerHTML` sinks — menu, draft, dev, the three room panels, dossier, devnav). The single
defense is `esc()`. Walk these:

1. **The escaper itself (`esc`, `app.js:8-14`).** It escapes `&` `<` `>` `"` — **it does NOT
   escape the single quote `'`.** Today every interpolated value lands in **double-quoted**
   attributes or text, so this is safe; but the gap means any new code that puts a
   user/draft-derived value inside a **single-quoted** HTML attribute is an injection.
   **Gate:** no interpolation sits inside a single-quoted attribute. PASS today.
2. **The draft filename (`d.name`).** Reaches the DOM only via `esc(fileTypeLabel(d.name))` and
   `esc(cleanFileLabel(d.name))` (`app.js:1060`), both inside double-quoted/text context. The
   raw `file.name` is kept on `draft` but the on-screen label is escaped. The error path uses
   `.textContent` (`setPickError`, `app.js:1004`) — inherently safe. **Gate:** filename never
   reaches `innerHTML` unescaped. PASS today; re-check on any draft-render edit.
3. **The draft object URL (`d.url`).** A same-origin `blob:` URL from
   `URL.createObjectURL(file)` (`app.js:1015`), interpolated as `src="${esc(d.url)}"`
   (`app.js:1052`, `1117`). Escaped and same-origin. **Gate:** `d.url` stays a `blob:`/object
   URL (never a user-typed string) and stays escaped.
4. **Inline `onerror` handlers.** `imgOrPlaceholder` (`app.js:114-122`) and the draft/gate
   images emit literal `onerror="…"` strings; the only interpolation inside them is `esc(src)`
   for fixture/asset paths — no user data. **Gate:** no user/draft string is ever concatenated
   into an inline event-handler attribute.
5. **`style="…"` interpolation.** Halo colors and photo-tuning numbers are interpolated into
   inline `style` (`renderCard` `app.js:413-414,427`; menu/dossier). All come from `data.js`
   fixtures (CSS hex + numbers), passed through `esc()`. **Gate:** no user-derived value feeds
   an inline `style` (CSS-context injection is not stopped by HTML escaping).
6. **The dev-harness renderers** (`renderUploadedScanResultDev`, `renderFreePullMock`,
   `renderHaloGateMock`, `renderBlockedScan`, `app.js:1210-1626`). These render a **validated
   dev fixture** today, but they are the **renderer the future engine will reuse**, and they
   `esc()` every field. **Gate:** every field from a (future) untrusted result is escaped at the
   sink; flag any un-`esc()`'d interpolation here as a future-XSS finding.

> **N/A-TODAY note:** the moment a scan result comes from a server/engine instead of a
> hardcoded fixture, every sink above moves from "escapes trusted fixture text" to "escapes
> attacker-influenceable text" — same code, higher stakes. The validator (`scan-contract.js`)
> does **not** HTML-escape; escaping still lives only in `app.js`. Re-walk this whole step at
> engine-wiring time.

### 2.2 — Step 2: URL-param trust
All params are parsed once at boot (`app.js:50-69`) and again for `?devnav` (`app.js:75`).
Each is **allowlist-validated** before it touches state:
- `?src` → only `1|2` (mapped to `state.source` 0/1).
- `?t` → only `free|shiny|mint`.
- `?tab` → only `source|diagram|metrics`, with legacy `source`→`diagram` redirect (BR-S044).
- `?dv` → only `clean|annotated`.
- `?lab` → only `cold-foil|black-star|night-gloss`, **and** only when `t=mint`.
- `?dev` → only the 4 harness fixtures (`uploaded-result|uploaded-blocked|free-scan-sim|halo-gate`).
- `?devnav` → boolean presence; also gated by `body[data-devnav]` + a CSS `display:none` default
  so the dev rail cannot paint for a real user (defense-in-depth, `app.js:71-75`, `1787-1792`).

No raw param value is ever concatenated into `innerHTML` or used as a redirect target except
the dev-nav rebuild (`app.js:1704`), which sets `?dev`/`?devnav` to **its own** allowlisted
constants on `location.href` — no user string flows in.
- **Gate:** every param is allowlist-checked before use; no param value reaches a DOM sink or a
  navigation target unvalidated. PASS today. Re-check whenever a new `?param` is added.

### 2.3 — Step 3: Third-party / dependency surface
- **Google Fonts** (`index.html:7-12`): `preconnect` to `fonts.googleapis.com` /
  `fonts.gstatic.com`, plus one stylesheet `<link>`. **No `integrity` (SRI) attribute** on the
  font CSS; only `fonts.gstatic.com` carries `crossorigin`. A compromised/MITM'd font CSS could
  inject CSS (exfil via background-image requests, UI redress). Low risk for a prototype; rises
  on public deploy. **Gate:** decide consciously — accept (logged) or self-host fonts + add SRI.
- **No other third-party** is loaded today (no analytics, no CDN JS, no map/widget). Confirm no
  new `<script src>` / `<link>` to an external origin was added.
- **Gate:** the external-origin inventory is exactly "Google Fonts CSS" and that choice is
  recorded. Any added dependency triggers a re-run (§4) and an SRI/CSP decision.

### 2.4 — Step 4: Client-side secrets + data exposure
- Grep for keys/tokens/endpoints: there are **none** today (no API base, no key, no env). The
  app ships only fixture prose and CSS.
- **Gate:** no secret, API key, private endpoint, or PII is present in any client file. PASS
  today — and a **red line** for every future step: nothing secret may live in client JS, ever.

### 2.5 — Step 5: FUTURE-engine red lines (the load-bearing gates — mostly N/A-TODAY)
These do not apply to the static prototype but **must all PASS before the uploaded-photo engine,
any backend, or payment is wired.** They are listed here so the pass is pre-defined, not invented
under deadline.

1. **Upload validation goes through `scan-contract.js`.** Any uploaded/engine-produced result
   must pass `validateUploadedScanResult` (`scan-contract.js:129`) **before render**, and an
   invalid result must render `createBlockedScanState` (the sealed blocked plate), never a card.
   The dev harness already models this (`app.js:1217-1234`); the real flow must do the same.
   **Gate:** no engine output reaches a renderer without first clearing the validator.
2. **No person-key / no aggregate** (`UNIVERSE_ZONE_MAP_V1` §7 + `HUMAN_READ_LINE_V1`
   Forbidden·aggregation). No scan output may be joined by an uploader/person key; archetype,
   hidden stat, aura must be **re-derived fresh per scan** — no streaks, counts, or history; the
   serial is an **object** address (Object→Scan→Card→Mint), never a person address. The
   aggregate guard ships **with** the engine or the engine does not ship. **Gate:** the data
   model is structurally incapable of reconstructing a stable trait across reads of one person.
3. **Forbidden human-rating fields stay blocked.** The validator's `FORBIDDEN_TERMS` +
   `PERSON_TRUTH` + `REQUIRED_SAFETY_FALSE` (`scan-contract.js:22-66`) must remain the gate; do
   not loosen them. **Gate:** no attractiveness/biology/identity field can render. (Honest note:
   `safetyFlags` are self-attested and gates 2/3 of `HUMAN_READ_LINE_V1` are not yet
   validator-encoded — see that doc's Enforcement gap; treat as open at engine time.)
4. **No secrets in client; server-side validation.** Any analysis/payment logic and any secret
   live server-side. Client-side validation (incl. `scan-contract.js`) is a UX guard, **never**
   the trust boundary — re-validate on the server. **Gate:** the server independently validates
   every result and holds every secret.
5. **CSP + security headers on host.** Before public deploy add a Content-Security-Policy
   (lock script/style/img/font origins; the font `<link>` and inline `style=`/`onerror=` usage
   means a strict CSP needs `style-src`/`script-src` planning), plus `X-Content-Type-Options`,
   `Referrer-Policy`, `X-Frame-Options`/`frame-ancestors`, HSTS. **Gate:** headers defined and
   verified on the host.
- **Gate (whole step):** every sub-gate PASS, or the engine/payment/deploy does not proceed.

### 2.6 — Step 6: Privacy / safety invariants
- **Local-draft invariant.** The chosen photo never leaves the browser, is never stored, and
  receives **no analysis** — `draft` is a plain object with **no** stats/receipts/oracle/hidden
  stat (`app.js:965-971`). If any number ever appears on the draft surface, that is a bug.
  **Gate:** draft render reads only `draft`, never sample scan data; no upload/store/analysis.
- **Human-read line.** Visible reads must clear the three gates of `HUMAN_READ_LINE_V1`
  (re-authorable cue · grammatical subject = the photo · connotation-strip). **Gate:** no
  rating/ranking of face/body/worth, no fixed-identity inference, in any rendered copy.
- **Halo-gate boundary.** Free = complete front; Halo = sealed back. No exact pre-unlock counts /
  module inventory on the Free front or gate (`halo/HALO_GATE_BOUNDARY_V1`). **Gate:** sealed-back
  language stays qualitative; no payment/AI implied where none exists.

### 2.7 — Step 7: Deploy / hosting hardening (when a host exists)
- HTTPS only; security headers per §2.5.5; serve images with correct `Content-Type`; restrict
  the host's directory listing.
- Ensure dev-only surfaces are inert in production: `?devnav` rail, the `?dev=…` harness routes,
  and `dev-live.html` (a dev live-reload helper that **does** `fetch`) must not be reachable or
  must be harmless on the public host.
- **Gate:** prod build excludes/inerts dev tooling; headers verified; TLS enforced. `N/A-TODAY`
  (no host).

---

## 3. MAJOR ISSUES / THINGS TO CHECK — register (append-only)

Severity: `info` · `low` · `medium` · `high` · `critical`. Status: `open` · `checked` ·
`accepted`. **Append-only** — never delete a row; move it to `checked` or `accepted` with a
date + note. Seeded from this playbook's first walk; most are **future-conditional** (the harm
is latent until a capability is wired).

| # | Severity (if real) | Area | Where in code | Concern | Status |
|---|---|---|---|---|---|
| 1 | low | DOM/XSS — escaper | `app.js:8-14` (`esc`) | `esc()` does not escape `'`; safe only while every sink uses double-quoted attrs. A future single-quoted-attr interpolation = injection. | open (monitor) |
| 2 | info | DOM/XSS — draft filename | `app.js:1060`, `1004` | `d.name` rendered only via `esc(...)`; error path uses `.textContent`. No leak today; re-check on any draft-render edit. | checked (2026-06-14) |
| 3 | low | Dependency — fonts | `index.html:7-12` | Google Fonts CSS has no SRI; rises to medium on public deploy. Decide: accept or self-host + SRI. | open |
| 4 | info | URL-param trust | `app.js:50-69`, `1704` | All params allowlist-validated; dev-nav rebuild uses only its own constants. Re-check on any new `?param`. | checked (2026-06-14) |
| 5 | high | FUTURE engine — validator wiring | `scan-contract.js:129`; `app.js:1217` | When the engine is wired, every result must clear `validateUploadedScanResult` before render; invalid → blocked state, never a card. Latent until engine exists. | open (N/A today) |
| 6 | critical | FUTURE engine — aggregate wall | `UNIVERSE_ZONE_MAP_V1` §7; data model | No person-key join; re-derive fresh per scan; serial = object address. Aggregate guard ships WITH the engine or not at all. | open (N/A today) |
| 7 | medium | FUTURE engine — self-attested safety | `scan-contract.js:22-66`; `HUMAN_READ_LINE_V1` Enforcement gap | `safetyFlags` are self-attested; gates 2/3 + aura/evidence scanning are not validator-encoded. Tighten before trusting engine output. | open (N/A today) |
| 8 | high | FUTURE — trust boundary | (no server yet) | Client-side validation (incl. `scan-contract.js`) is a UX guard, not the trust boundary. Server must re-validate and hold all secrets. | open (N/A today) |
| 9 | medium | FUTURE — host headers/CSP | `index.html`; host config | No CSP/security headers; inline `style=`/`onerror=` and the font `<link>` need CSP planning before public deploy. | open (N/A today) |
| 10 | low | Deploy — dev surfaces | `app.js` (`?devnav`,`?dev`), `dev-live.html` | Ensure dev rail, `?dev=` harness, and the `fetch`-using `dev-live.html` are inert/absent in prod. | open (N/A today) |
| 11 | medium | FUTURE engine — person-truth gate scope | `scan-contract.js:203-217` (PERSON_TRUTH) vs `:182-193` (evidenceBoard) | `PERSON_TRUTH` runs only over `artifact.title` + `readings.*` (the `narrative` array, 204-212); the user-facing `evidenceBoard` text fields (observation/visibleCue/effect; fixture observedCue/artifactEffect/chipCue/chipEffect) are never added to it. A person-claim that dodges `FORBIDDEN_TERMS` (e.g. "you are clearly high-status" — "status"/"high-status" not listed) clears `validateUploadedScanResult` and reaches the renderer. Add evidenceBoard text to the person-truth pass before trusting engine output. (Sharpens row 7.) | open (N/A today) |
| 12 | low | FUTURE engine — CSS-value sinks not coercion-guarded | `app.js` numeric `style=` (110/332/362/427/547/555/787/838-839/1516) + halo color `:414` and **`setProperty :1652-1654`** | Only `--pos` is `esc()`-wrapped; all numeric stat values + the 3 halo hex colors are interpolated/assigned raw (no `esc()`/`Number()`/color guard), and the `body.style.setProperty('--halo-*')` path bypasses `esc()` entirely via CSSOM. Safe today (data.js feeds only hardcoded literals); when the engine supplies these, re-type to number/hex at the sink — the code-level companion to row 5. (Distinct from row 1: these are unescaped entirely, not a quote-style gap.) | open (N/A today) |

> *Rows 11–12 added 2026-06-15 from a read-only 8-agent scan (5 Sonnet + 2 Haiku → Opus adversarial verify;
> 46 raw findings → 2 verified-new, 10 dismissed as already-covered or refuted). Both are future-conditional —
> they bite at engine-wiring time, not on today's static prototype. Optimization + correctness notes from the
> same scan are logged in `TASK_QUEUE.md` (Backlog), not here (this register is security-only).*

---

## 4. When to re-run this playbook (trigger list)

Re-run the **whole** ordered sequence (not just the changed step) when any of these is true —
these are the moments the "mostly future" attack surface becomes present:

- **Before wiring the uploaded-photo / scan engine** — the single biggest surface change.
  Re-walk §2.1, §2.5, §2.6 in full; the validator-wiring (#5) and aggregate-wall (#6) gates
  must PASS or the engine does not ship.
- **Before adding any backend / API / network call** (the first real `fetch` to a server,
  login, or database) — §2.0, §2.4, §2.5.4 become live.
- **Before payment** — even payment *framing* near the gate; confirm no real checkout/secret
  lands client-side and the Halo boundary (§2.6) holds.
- **Before the first public deploy / hosting** — §2.3 (SRI), §2.5.5 (CSP/headers), §2.7
  (dev-surface inerting, TLS) move from N/A to required.
- **On any new `?param`, new `<script src>`/`<link>` to an external origin, or new
  `innerHTML`/`style=`/`onerror=` interpolation of a non-fixture value** — re-walk the matching
  step (§2.1/§2.2/§2.3) and add a register row.
- **On any change to `esc()` or `scan-contract.js`** — these are the two defenses; touching
  either re-opens §2.1 and §2.5.
- **On a new dependency of any kind** — re-walk §2.3 and decide SRI/CSP.

Closing reminder: a completed run records **"the gates were walked,"** never **"the code is
secure."** Log every FAIL and every `accepted` risk in §3; the register is the memory between runs.
