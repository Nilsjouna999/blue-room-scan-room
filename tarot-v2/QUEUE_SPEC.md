# QUEUE_SPEC — MASTER SPEC (F1 / F2 / F3)

**Room:** the Blue Room tarot drawing room — `scratchpad/tarot_v2/`
(LIVE at `https://nilsjouna999.github.io/blue-room-scan-room/tarot-v2/`).

This is the authoritative synthesis of the design fleet's inputs, reconciled against and
matched to the **actually-shipped, runtime-verified** code. It is the single source of truth
for what F1/F2/F3 are, the exact DOM/CSS/JS that implements them, the copy, the acceptance
criteria, what stays canon, and the **reusable Codex-ball component contract** for later
placement across the live Blue Room rooms.

> **Attribute-naming note.** During the build this directory was edited by more than one queue
> agent, producing two competing attribute conventions (`data-leave-room`/`data-keep`/`br-ball`
> vs. `data-leave-close`/`btn-leave`/`orb`). **The convention below is the one wired into
> `app.js` and verified in the browser** — it wins. If you find `data-leave-close`, `btn-leave`,
> `.orb`, `cx-stack`, or `data-codex-orange` anywhere in this tree, they are orphaned draft
> markup from the parallel pass; delete on sight.

**Verification (this pass):** served over `python -m http.server`, driven end-to-end in a real
browser. **Zero console errors** on: initial load, a filed `?read=` cold-open, Keep → "Kept.",
copy-link unhide, `localStorage` write, drawer open with a rendered row, and the ball/leave
hrefs resolving. Round-trip confirmed: `Keep` writes `br_dr_archive`; the drawer lists it; the
row's `?read=` link reopens it byte-identically.

**Files touched:** `index.html`, `style.css`, `app.js` **only**. `data.js` / `voice.js` /
`voice-ext.js` **untouched**. No new external dependencies (same-origin Codex link;
clipboard has an `execCommand` fallback; archive is `localStorage`-only).

---

## WHAT STAYS CANON (preserved, do not regress)

Everything already in the room is untouched and must stay so. All F1/F2/F3 work is **additive
chrome** layered around it:

- **The deterministic sealed-seed engine** — `makeSeed(key,q,token)` → `drawSpread(seed,n)`;
  a reading is fully replayable from the triple `{k,q,t}`. `?read=` already encodes exactly
  this. F2 stores nothing more.
- **The ceremony** — shuffle / cut / deal / flip choreography, the card-back prompt that lifts
  to the label on turn, the stage-say, the descend chevron (the room's one ambient loop).
- **The per-card-follow reading**, the position clarity + polarity + "how to read this"
  expander, and the "the full guide lives in the Codex" link (`../codex.html#tarot-guide`).
- **The mood**, white cards, `color-scheme: dark`.
- **A11y baseline (single source of truth):** ONE `:focus-visible` token, ONE
  `@media (prefers-reduced-motion: reduce)` block, TWO live regions (`announce(msg, "polite"|
  "assertive")`). Every new control extends these — **no second reduced-motion block, no third
  live region** was added.
- **`sp.filed`** is the canon flag separating filed tiers (Sitting, Deep — get an accession
  stamp) from the ephemeral Glance (`pull`, `filed:false`, "not kept"). F2 reuses it verbatim;
  it does not string-match `"pull"`.

---

## F1 — NAVIGATION AUDIT + A REAL GO-BACK-WHEN-DONE

### State-by-state exit audit (no dead-ends)

| Phase | Controls present | Home exit? |
|---|---|---|
| `tier` (choose a reading) | 3 tier doors · leave-mark · archive-mark · ball | leave-mark ✓ |
| `ceremony` ready / shuffled (pre-cut) | Shuffle / Cut · `data-back-tier` "‹ Choose a different reading" · leave-mark | leave-mark ✓ |
| shuffling (transient) | controls hidden · leave-mark | leave-mark ✓ |
| cut / dealing / revealing | **leave-mark only, by design** — the cut is the commit; pre-tier back-out is deliberately closed | leave-mark ✓ |
| dealt (turning) | turn cards + hint · leave-mark | leave-mark ✓ |
| complete / cold-open (done) | close block (3 exits) · keep-row · leave-mark · archive-mark · ball | leave-mark ✓ **+ new first-class close exit** |

**Finding:** the `leave-mark` (`<a data-leave href="../index.html">`) is a direct child of
`<main class="room">` and is **never toggled hidden** in any `app.js` path — so a home exit
exists in 100% of states; no phase dead-ends. The one real gap was the **close block**: both its
exits stayed *inside* the tool (start again / back to tier-select). A reader who was done had no
first-class "leave" short of the easy-to-miss top-left mark. F1 seats that missing exit.

### The three legible exits (shipped DOM — `index.html`)

```html
<div class="close-actions" data-close-actions>
  <button type="button" class="btn btn-ghost" data-again-bottom></button>  <!-- START AGAIN, same tier -->
  <div class="close-exits">
    <button type="button" class="link-quiet" data-back-room>Choose a different reading</button>  <!-- CHOOSE ANOTHER -->
    <a class="link-quiet link-leave" data-leave-room href="../index.html">Leave to Blue Room</a>  <!-- LEAVE (new) -->
  </div>
</div>
```

Three destinations, expanding outward, most-likely-first: **start again → choose another →
leave.**

- **Start again** — `data-again-bottom`, existing `btn btn-ghost`, dynamic label via
  `againLabel(sp)`: Sitting → "New sitting", Deep → "New reading", Glance → "Another glance".
  Handler unchanged (`chooseTier(STATE.tierKey)`).
- **Choose another** — `data-back-room`, copy changed from "Back to the room" →
  **"Choose a different reading"** (mirrors the pre-cut `data-back-tier` wording exactly, so
  the identical action reads identically wherever it appears). Handler unchanged
  (`resetToTiers` → the doors).
- **Leave to Blue Room** — `data-leave-room`, **NEW**, a plain `<a href="../index.html">` with
  **zero JS** (keyboard-native, right-clickable, works with JS off; do **not** bind a handler
  to it or you'll intercept the anchor). Same front-door discipline and same literal
  `../index.html` as the persistent `data-leave` mark.

**Vocabulary law:** "the room" = this reading room's own tier-select screen; "Blue Room" = the
whole house, one level up. That split is what makes the three exits legible without a caption.

### CSS (`style.css`)

```css
.close-actions { margin: var(--sp-5) auto 0; display:flex; flex-direction:column; align-items:center; gap: var(--sp-3); }
.close-exits { display:flex; flex-wrap:wrap; justify-content:center; align-items:baseline; gap: var(--sp-2) var(--sp-3); }
.close-exits .link-leave {
  color: var(--t-meta); text-decoration:none;
  border-bottom: 1px solid rgba(201,138,94,.35); padding-bottom:1px;  /* copper hairline — NEVER gold */
}
.close-exits .link-leave:hover, .close-exits .link-leave:focus-visible {
  color: var(--accent-lit); border-bottom-color: var(--accent-lit);
}
```
`.link-leave` wears the same copper hairline underline as the existing how-to-more Codex link,
so the room's two "this click leaves the page" links read as one family. **Copper, never gold**
(gold is currency-only).

### Link resolution (verified)

Page lives at `/blue-room-scan-room/tarot-v2/`; the document directory ends `/tarot-v2/`, so
`../index.html` climbs one level to `/blue-room-scan-room/index.html` = the Blue Room root
(**not** the github.io apex). Holds on `/tarot-v2/`, `/tarot-v2/index.html`, and
`/tarot-v2/?read=…` (query strings don't affect relative resolution). Same `../` pattern the
`../codex.html#tarot-guide` link already rides in-repo.

### F1 acceptance criteria

- [x] Every phase has a working home exit (audit table above); nothing dead-ends.
- [x] The done state exposes three visually distinct, legibly-labelled exits: start again /
      choose another / leave to Blue Room.
- [x] "Leave to Blue Room" is a real anchor to `../index.html`, works with JS disabled, no
      handler intercepts it.
- [x] "Choose a different reading" wording matches the pre-cut back-out.
- [x] Present and correct in **both** `complete()` (fresh finish) and `renderColdOpen()`
      (`?read=` reopen).
- [x] **Cold-open exit parity (critic fix):** `renderColdOpen()` now hides the stage-level
      `data-again` control (`D.again.hidden = true`, mirroring `complete()`), so a reopened
      receipt ends on the SAME single three-exit close cluster as a fresh finish. Previously it
      re-showed the top control, producing two buttons labelled "New sitting" that went to
      *different* screens (top → tier chooser, bottom → fresh same-tier draw) while differently
      labelled buttons converged — the exact twin-button collision F1 exists to prevent, and only
      in the one state every shared/kept link lands on.
- [x] **Fresh-ceremony URL hygiene (critic fix):** `chooseTier()` now clears any stale `?read=`
      from the address bar (`history.replaceState(null,"",location.pathname)`, as `resetToTiers`
      already did), so "New sitting" from a reopened receipt can't leave the old payload in the
      bar until the next cut — a mid-ceremony reload would otherwise reopen the prior reading.
- [x] Post-completion focus unchanged (still lands on the descend control).

---

## F2 — SAVE / ARCHIVE THE READ (filed tiers only)

**Doctrine:** keeping is a *filing act, not a database*. The reading is deterministic and
already carries a portable identity — the `?read=` receipt. So "Keep this reading" does two
honest things: (a) shelves the minimal `{k,q,t}` triple in a local archive; (b) surfaces the
`?read=` link as the durable, storage-independent save. **The link is the load-bearing save;
`localStorage` is the convenience shelf.** The Glance is not filed → no Keep, by design.

### Storage model (`app.js`)

```js
var ARCHIVE_KEY = "br_dr_archive";   // localStorage; JSON array, newest-first
var ARCHIVE_MAX = 60;                // FIFO cap (each entry ~250B → ~15KB max, far under quota)
// entry: { k: tierKey, q: question, t: token, savedAt: ms }
```

- **`k`/`q`/`t` is the exact triple `?read=` encodes** — accession, filed date, and title are
  **re-derived on render** via the existing `makeSeed` / `accession` / `dateFromToken` /
  `fmtDate`. One source of truth; derived data is never duplicated, so it cannot drift if the
  engine's derivation ever changes. `q` (the typed question) is the only user-authored text
  stored — no name, email, or device info.
- **Fail-open everywhere.** `archiveRead()` → `try/catch`, returns `[]` on any failure (missing
  key / bad JSON / non-array — never partial-repairs a corrupt blob, starts clean).
  `archiveWrite()` → `try/catch`, returns `false` on quota/private-mode failure. Storage failure
  **never throws into the ceremony**.
- **Dedupe on `t`** (`archiveAdd` filters the token out then unshifts) — re-keeping a reopened
  reading bumps it to top instead of duplicating. Cap via `slice(0, 60)`, oldest evicted.
- **Shared encoder** — `receiptHref(k,q,t)` returns `"?read=" +
  encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify({k,q,t})))))`, the exact
  serialization `writeReceipt` produces, so an archived row rebuilds a **byte-identical** link
  (UTF-8-safe for non-latin questions). Never invent a second payload encoding.

### Keep row (shipped DOM — inside `.closing-block`, between the accession stamp and `.close-actions`)

```html
<div class="keep-row" data-keep-row hidden>
  <button type="button" class="btn-keep" data-keep>Keep this reading</button>
  <button type="button" class="link-quiet" data-copy-link hidden>Copy the record&rsquo;s link</button>
  <p class="keep-fallback" data-keep-fallback hidden>Not kept here — but the link below still opens it.</p>
</div>
```

Behaviour — `syncKeepUI()` (called from **both** `complete()` and `renderColdOpen()`):
- Hidden entirely unless `sp.filed && STATE.token` → **never renders for A Glance.**
- **Copy-link is shown on any filed close, independent of Keep-state.** The `?read=` link is a
  portable save in its own right (F2), so a sitter who wants only the shareable link — without
  committing to the local archive — has the affordance in-room, not just the raw URL in the
  address bar. (Earlier the copy-link was gated behind Keep; a critic pass found that left the
  portable save unreachable unless you first committed locally, so it was un-gated.) Keep /
  "Kept." remains the separate local-archive act sitting beside it.
- If the current reading is already archived (`archiveHas(STATE.token)`): button disabled,
  text **"Kept."**, class `is-kept`. So reopening an already-kept receipt shows "Kept." rather
  than re-offering.
- **Keep click** → `archiveAdd(...)` → `refreshArchiveCount()`. On success: `syncKeepUI()`
  swaps to "Kept.", `announce("Kept.", "polite")`. On storage failure:
  fallback line shows, copy-link surfaces anyway, `announce("Could not keep it here — the link
  still opens this reading.", "polite")` — the reading stays shareable even when it can't be
  shelved.
- **Copy-link click** → copies `location.origin + location.pathname + receiptHref(...)` via
  `navigator.clipboard` (with an offscreen-`<textarea>` + `execCommand("copy")` fallback);
  label flips to "Copied." for 1.8 s, `announce("Link copied.", "polite")`.

CSS: `.btn-keep` is a quiet copper-outlined pill (`--card-accent`, copper 0.35 border). The
`.is-kept` state — and **only** it — crosses into the accession's `--gold-lit` currency register
(a filed reading kept is a currency-grade mark). No other new element uses gold.

### "Your readings" drawer (shipped DOM — persistent top-right, leave-mark's counterpart)

```html
<button type="button" class="archive-mark" data-archive-open aria-haspopup="dialog" aria-controls="archive-panel">
  Your readings<span class="archive-count" data-archive-count hidden></span>
</button>
...
<div class="archive-drawer" data-archive-drawer hidden>
  <div class="archive-veil" data-archive-veil></div>
  <aside class="archive-panel" id="archive-panel" role="dialog" aria-modal="true"
         aria-labelledby="archive-title" data-archive-panel>
    <div class="archive-head">
      <h2 class="archive-title" id="archive-title">Your readings</h2>
      <button type="button" class="archive-close" data-archive-close aria-label="Close">✕</button>
    </div>
    <p class="archive-empty" data-archive-empty>Nothing kept yet. A Sitting or a Deep Read can be kept from its close.</p>
    <ul class="archive-list" data-archive-list></ul>
  </aside>
</div>
```

- Trigger mirrors `leave-mark`'s register (mono 10px uppercase ghost, top corner) — top-right
  to the leave-mark's top-left. Count badge ` (n)` appears only when `n > 0`. Always present so
  the feature is discoverable; empty-safe so there's nothing to hide when nothing is kept.
- Opens a **right-hand sheet, not a full modal** (`z-index:60`, above the 40-tier corner marks;
  dark parchment panel, never the cards' white — this is chrome, the reading stays the crown).
  Veil dims the room behind.
- Each row (`renderArchiveList()`): `sp.title` + question (`"…"`, or "No question was set
  down." when blank) + `BR-XXXXX · filed <date>`; the row **is** an `<a href="?read=…">`
  (keyboard/native, right-click-new-tab, cold-opens via `tryReopen`); plus a quiet `✕`
  `archive-remove` (aria-label "Remove this reading from Your readings") → `archiveRemove` +
  re-render + count refresh + `syncKeepUI()` if it was the current reading. Remove is
  single-click with no confirm modal (it destroys nothing real — the `?read=` link still
  reopens it; keep it quiet to avoid mis-taps).
- **A11y:** `role="dialog" aria-modal="true"`; Escape closes; veil-click closes; minimal
  Tab-cycle focus containment while open (`onArchiveKeydown`); focus returns to the opener on
  close. Reduced-motion: panel fades instead of sliding (in the existing RM block).

**This is explicitly the honest standalone version.** The eventual home is the Reliquary/Vault;
nothing here assumes or blocks that migration — the stored `{k,q,t}` triple is portable as-is.
Copy stays archival, never says "localStorage"/"cache"; on storage failure it degrades to "Not
kept here — but the link below still opens it" and leans on the copy-link as the real save.

### F2 acceptance criteria

- [x] Keep appears only on filed tiers (`sp.filed`); **never on A Glance**.
- [x] Keep writes `{k,q,t,savedAt}` to `localStorage["br_dr_archive"]`, deduped, capped 60,
      fail-open (never throws, never blocks the reading).
- [x] "Kept." confirmed state; already-kept readings show it on reopen; copy-link surfaces the
      `?read=` receipt with a "Copied." confirmation; both announce politely.
- [x] Storage failure still confirms shareability via the copy-link and a fallback line — no
      dead-end, no lie about persistence.
- [x] "Your readings" drawer lists kept readings newest-first; each row reopens its exact
      `?read=`; remove works; empty state shown; count badge live.
- [x] Drawer is a dialog: Escape/veil close, focus trap + return, reduced-motion-safe.
- [x] Round-trip verified live end-to-end with zero console errors.

---

## F3 — THE CODEX BALL (reusable component)

**Shipped: the yellow full-Codex ball.** A quiet, always-present resting mark bottom-right that
opens the Codex's tarot guide, so a reader can jump from their spread to how-to-read/meanings
without losing the reading.

### Shipped DOM (`index.html` — direct child of `<main class="room">`, sibling to the marks, OUTSIDE all `[data-view]` sections)

```html
<a class="br-ball br-ball--yellow" data-codex-ball href="../codex.html#tarot-guide"
   aria-label="Open the Codex — how to read the cards, and what each one means">
  <span class="br-ball-core" aria-hidden="true"></span>
  <span class="br-ball-tip" aria-hidden="true">The Codex</span>
</a>
```

- **Pure anchor, zero JS.** Works with JS off, native keyboard focus, no click interception.
  Must live outside every `[data-view]` so it is present identically in tier / ceremony /
  reopen / done — never enters the view-toggle logic.
- 42px disc, warm gold radial gradient + soft glow, `z-index:40` (same tier as the leave/archive
  marks). Hover/focus lifts 2px and reveals a small mono tooltip ("The Codex") to its left; uses
  the room's one shared `:focus-visible` token. Reduced-motion strips the lift (tooltip
  opacity-only). Mobile (≤620px): shrinks to 38px, drops the tooltip (no hover on touch — the
  `aria-label` still carries the meaning).

### CSS (`style.css`)

```css
.br-ball { position:fixed; right:18px; bottom:18px; z-index:40; width:42px; height:42px; border-radius:50%;
  display:flex; align-items:center; justify-content:center; text-decoration:none; cursor:pointer;
  transition: transform .22s cubic-bezier(.2,.8,.26,1), box-shadow .22s ease; }
.br-ball--yellow { background: radial-gradient(62% 62% at 34% 30%, #f6eccf, #d9c48d 56%, #a89058 100%);
  box-shadow: 0 2px 10px rgba(0,0,0,.4), 0 0 0 1px rgba(20,14,8,.35) inset, 0 0 16px rgba(226,208,150,.15); }
.br-ball-core { display:block; width:100%; height:100%; border-radius:50%; }
.br-ball:hover, .br-ball:focus-visible { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,.45), 0 0 0 1px rgba(20,14,8,.35) inset, 0 0 20px rgba(226,208,150,.26); }
.br-ball:focus-visible { outline:2px solid var(--focus); outline-offset:3px; }
.br-ball-tip { position:absolute; right:calc(100% + 12px); top:50%; transform:translateY(-50%) translateX(4px);
  white-space:nowrap; padding:5px 10px; border-radius:6px; background:#16130f; border:1px solid var(--line);
  color:var(--t-primary); font-family:var(--f-mono); font-size:10px; letter-spacing:.1em; text-transform:uppercase;
  opacity:0; pointer-events:none; transition:opacity .18s ease, transform .18s ease; }
.br-ball:hover .br-ball-tip, .br-ball:focus-visible .br-ball-tip { opacity:1; transform:translateY(-50%) translateX(0); }
```

> **Colour law — load-bearing taste correction.** Memory calls this the "YELLOW ball", but Blue
> Room reserves gold (`--gold`) for **currency only**. The ball is a pale **parchment/brass lamp**
> (its own `#f6eccf→#d9c48d→#a89058` gradient), NOT the currency `--gold` token — and pushed
> deliberately *lighter and cooler* than the price mark `--gold-lit #c0a05d`, so the eye reads it
> as "a reference lamp left on," never a paid/premium chip. (It was originally a hotter
> `#f4dfa0→#d9ab52→#93672a` amber; a critic pass found that mid-tone sat in the same family as
> the room's only currency marks — the door price, the "Kept." accession, the settle-gold — so it
> was cooled toward parchment. Keep it clearly off `--gold-lit`. Do not retint it to `--gold`.)

### REUSABLE COMPONENT CONTRACT — `.br-ball`

Drop-in for other Blue Room rooms, no per-room JS for the full ball:

- **Surface:** one `<a class="br-ball br-ball--yellow">` (or `<button>` if the target opens
  in-page instead of navigating), containing one `<span class="br-ball-core">` (painted face)
  and one optional `<span class="br-ball-tip">` (hover label). That's the whole component.
- **Placement:** `.br-ball` is `position:fixed` bottom-right by default. Position it per room by
  overriding `top`/`right`/`bottom`/`left` at the call site — it does **not** assume bottom-right
  is universal (that's just this room's free corner). Corner map in this room: leave-mark
  top-left · archive-mark top-right · codex ball bottom-right. Keep it off any primary CTA on
  narrow screens.
- **Href:** aim at the room's own guide — here `../codex.html#tarot-guide`; other rooms pass
  their own section anchor. Always a real `href` (front-door law: works with JS off), mirroring
  the live app's own Codex-seal fallback.
- **Theme:** skin via a `.br-ball--<skin>` modifier. Default skin is the parchment/brass lamp;
  **must never be the currency `--gold` token, and must stay visibly off `--gold-lit`.** A room
  may retint via its own modifier.
- **Two skins, two homes (resolves the "third metaphor" risk):**
  - `.br-ball--yellow` (parchment lamp, plain `<a href>`): the **standalone / router-less** skin,
    for pages like this one that sit outside the live app router and cannot reach the in-app
    bloom. This is the ONLY context where the ball is a parallel affordance.
  - `.br-ball--seal` (**the live default**): in the live Blue Room the ball is **not** a second
    codex metaphor — it is a *trigger for the existing Aperture* (BR-S205 wax-seal that irises
    `codex.html` open in-page via clip-path). Its resting mark should **rhyme with the existing
    wax-seal** (same wax/emboss language, ideally the same resting position) so the two read as
    one system, and its click wires into `wireMenuCodex()` / the iris — never a new clip-path.
    Do not drop the plain-anchor `--yellow` skin across live rooms; it is scoped to standalone.
- **A11y:** native focusable anchor; `aria-label` carries full intent; the core face is
  decorative (`aria-hidden`); reuses the shared `:focus-visible` ring; reduced-motion strips the
  lift (add to the single existing RM block, no new one). If the target opens in a new tab, the
  anchor must carry `rel="noopener"` and say "opens in a new tab" in the `aria-label`.
- **Crown-beat recede (this room, optional elsewhere):** the room dims the ball to `opacity:.38`
  while a card is actively turning (`.room.is-cardturn .br-ball`), restored on settle, so nothing
  warm competes with the flip. The class is added in JS **only when motion is allowed**, so
  reduced-motion sitters never see it; a hovered/focused ball overrides the dim. Purely cosmetic
  — it touches no draw state. Reusable rooms with a comparable "crown" moment can adopt the same
  class contract; rooms without one simply never add `is-cardturn`.

### Orange mini-Codex — DESIGNED, NOT BUILT (clean seam left)

Per the brief's own fallback ("build only if clean + self-contained; otherwise ship the yellow
ball and leave a clean seam"), the orange mini-search was **not built**. Reason (verified):
`codex.html` has section anchors (`#tarot-guide`, `#tarot-major`, `#tarot-minor`) but **no
per-card anchor ids and no `?q=` prefill** on its `#q` search box. A mini-search over
`window.TAROT_DECK` names could filter to a matching card but could not **deep-link to that
card's entry** — only to the section, where the reader would re-type the same search. That is
non-discriminating "results theater" the brief warns against. Also: this room already carries
per-card follow readings + the spread key + the how-to-read expander + the yellow ball, so a
search adds nothing here; the mini's real home is the broader live rooms (desk/photo-scan) that
have no per-card reading on the page. Building the *draggable* half also opens genuine
interaction-design surface (WCAG 2.5.7 keyboard-drag alternative + labelled reset) out of scope
for quiet chrome.

**The clean seam (turnkey later):**
- Markup: a second `.br-ball--orange` (~30px, stacked slightly above/beside the yellow, e.g.
  `bottom:60px; right:22px`) toggling a small `.br-ball-panel` (draggable via a light
  `pointerdown` handler; click-on-yellow-home resets position) holding one `<input>` and a
  `<ul>` of ≤5 results.
- Data source (already on-page, no fetch, no `data.js` edit): `window.TAROT_DECK` (78 names +
  group) for card matches, plus `SPREADS[STATE.tierKey].positions` / `.notes` / `.explain` for
  in-progress position matches. Pure client-side substring match.
- Result target: only once `codex.html` gains `#card-<slug>` anchors or `?q=` prefill — wire
  each result `<a>` straight to it. **Until then this component must not ship.** The container
  already supports the stacked second child structurally; only the mini's own JS + panel is
  deferred.

### F3 acceptance criteria

- [x] Yellow ball present in **every** state (outside `[data-view]`), a real anchor to
      `../codex.html#tarot-guide`, works with JS off.
- [x] Keyboard-openable, labelled, uses the shared focus ring; reduced-motion + ≤620px handled
      in the single existing RM/responsive blocks.
- [x] Gold-amber lamp, **not** the currency `--gold` token; quiet at rest, magnetic on
      hover/focus; no ambient loop (doesn't fight the cards).
- [x] `.br-ball` is a self-contained, documented, drop-in component for later live-room reuse.
- [x] Orange mini-Codex designed with a clean seam; deliberately not shipped (documented
      reason).

---

## COPY CATALOG (use verbatim — no paraphrasing at build time)

**F1 exits.** `data-again-bottom` (dynamic): "Another glance" / "New sitting" / "New reading" ·
`data-back-tier` (pre-cut): "‹ Choose a different reading" · `data-back-room` (close): "Choose a
different reading" · `data-leave-room` (close, new): "Leave to Blue Room" · `data-leave`
(persistent mark): "Blue Room" (aria "Leave the room").

**F2 keep.** Default: "Keep this reading" · confirmed: "Kept." · copy: "Copy the record's link"
→ "Copied." · storage-failed fallback: "Not kept here — but the link below still opens it." ·
announce: "Kept." / "Link copied." / "Could not keep it here — the link still opens this
reading."

**F2 drawer.** Trigger: "Your readings" (badge " (n)") · title: "Your readings" · empty:
"Nothing kept yet. A Sitting or a Deep Read can be kept from its close." · row blank-question:
"No question was set down." · row meta: "BR-XXXXX · filed 24 July 2026" · remove aria: "Remove
this reading from Your readings" · close aria: "Close".

**F3 ball.** aria-label: "Open the Codex — how to read the cards, and what each one means" ·
tooltip: "The Codex".

---

## GLOBAL ACCEPTANCE

- [x] `index.html` / `style.css` / `app.js` only; `data.js` / `voice.js` / `voice-ext.js`
      untouched.
- [x] Runnable over http; **zero console errors** across tier / ceremony / complete / cold-open
      for A Glance and A Sitting (verified this pass).
- [x] Canon intact: engine, ceremony, per-card reading, mood, white cards, single
      reduced-motion block, two live regions, one focus token — all preserved.
- [x] Restraint held: the reading stays the crown; F1/F2/F3 are quiet chrome. Accent copper on
      the card, gold for currency only (the one crossover is the "Kept." currency mark).
      Cormorant/Inter/IBM Plex Mono throughout. Reduced-motion-safe, keyboard-accessible,
      responsive.
