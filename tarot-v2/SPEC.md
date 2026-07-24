# Blue Room Tarot v2 — Master Build Spec

**Status:** authoritative. The builder follows this literally. Where sources disagreed, the
resolution is stated inline under **RESOLVED**. This is a **standalone prototype** — it must
**not** edit any live app file (`app.js`, `drawing-room.js`, `styles.css`, `arcana-profile.css`).

All deliverable files live in this directory:
`.../scratchpad/tarot_v2/` → `index.html`, `style.css`, `app.js`, `voice.js` (new),
`data.js` (already exists — **do not overwrite**), plus this `SPEC.md` and `INTEGRATION.md`.

Runnable by serving the build dir over http (e.g. `python -m http.server`) and opening
`index.html`.

---

## 1. NORTH-STAR CONCEPT — "THE ACCESSION" (merged)

Both judge panels converged. **Winner = THE ACCESSION** (the reading is a *filing*, not a
fortune; the **cut is the event**, the flip is discovery of an already-decided thing), with
**THE SETTLE's motion discipline grafted in wholesale** and a short list of ideas killed.

**The one-sentence spine:** *A tarot sitting is a record being formally entered into an
archive, and you are present for the filing. The cut is the stamp; after it falls the outcome
is administrative fact. Every later beat — deal, turn, close — is the paperwork of an
already-decided thing being made visible, in order, by your own hand.*

### Merged-in (adopted)
- **SETTLE's motion retune, verbatim numbers:** slam collapses to one overshoot + one settle;
  shockwave becomes a faint held pressure-ring, never a flare. (§4)
- **"Silence as sound design"** written into this spec as a binding authoring constraint:
  easing curves *are* the sound; a landing thuds once, it does not ring. (§4)
- **N=5 stagger tightened to 0.42s** so the Deep Read's slow, deliberate cut does not read as
  sluggish. (§4)
- **Shrinking stack** — the 7-layer deck pile loses a sliver of height as each card launches,
  as a *size-only* tweak to the existing offset math (no new system). (§5)
- **Administrative aria-live vocabulary** (Mixing / Sealed / Filing / Awaiting the turn /
  Filed) routed almost entirely through aria-live; **at most ONE small mono status line**
  visible on screen. (§7)
- **The completion accession code** (`BR-XXXXX`) settles quietly into the reading-panel corner
  at completion, strictly subordinate to the closing line — the single permanent identity. (§5, §7)
- **Currency-into-ink:** the violet→gold settle beat and the corner code are the *same gold
  register* — paying and filing read as one species of event. (§6)
- **Locked Ink:** on cut the question field goes read-only and its text darkens/tightens once
  (`--t-primary`→`--t-display`, ~300ms), the on-screen correlate of "the cut closes the
  question." (§6)

### KILLED (do not build — both panels agreed)
1. **No apex stamp-glyph-flash** at the cutlift's ~40% apex. The cut's meaning is already
   carried by violet→gold + Locked Ink + the URL receipt. A second flashing mark is redundant
   and the top yippi/timing-fragility risk. The code is written **once, at completion**, in the
   corner — **never also at the cut.**
2. **No persistent on-stage "accession plate" object.** It violates card-is-crown /
   restraint-over-density and has the worst feasibility. Its entire function demotes to the
   quiet corner code.
3. **No "no-reveal-all-ever, forever" dogma.** Per-card manual turning is the **default** and
   the shipped behavior (it is better ceremony), but it is *not* enshrined as an immovable
   prohibition. Do not add a reveal-all control; do not write copy promising one can never
   exist.
4. **No edge-glint flip** (SETTLE SM4). It reintroduces a "screen effect" at exactly the moment
   the quiet corner code should own the eye. The flip stays plain.
5. **No prominent on-screen phase-caption vocabulary.** The full Mixing/Sealed/Filing/Filed set
   lives in aria-live; on screen there is at most one small mono status line.
6. **No meta reduced-motion "fairness" copy** ("see, it's the same reading!"). The honesty
   lives entirely in the mechanism.

### Non-negotiable taste
Restraint over density; magnetic not yippi (no rainbow, no sparkles, no stacked loops, no
whole-card wash); **free is the hero** (A Glance is the lightest, most inviting door);
room/page is the dish, the card is the crown not the kingdom; archival voice
(frame/record/charge/filed), third-person-of-the-record, present indicative, **no advice**;
accent used **sparingly, as currency.**

---

## 2. FILE PLAN

| File | Role |
|---|---|
| `index.html` | Structure only. Loads Google Fonts, then `./data.js`, `./voice.js`, then `./style.css` and `./app.js`. Contains the ceremony region skeleton (tier doors, intake, stage mount point, controls row, reading panel, aria-live regions). No inline styles or scripts beyond the tag wiring. |
| `style.css` | All styling: tokens, card face/back, stage/deck/glow, reading panel, all `@keyframes` (riffle, rifTop, cutlift, slam, shock, deal-travel, flip, settle), responsive (single `max-width:620px` breakpoint + clamp), and a **single terse reduced-motion block near the bottom**. |
| `app.js` | The engine + choreography wiring: state machine, hash/pick/drawSpread, seed, seal-at-cut, `?read=` write + reopen, tiers, gate, render, and the motion sequencing (`setTimeout` chains gated on `motionOK`). |
| `voice.js` | **New, self-contained.** `window.BRArcanaVoice` = the 22-entry Major tarot slice copied from the live `arcana-reading-copy.js` `BANK.tarot`, plus a verbatim `get(slot,key)`. Keeps tarot_v2 with **zero path dependency** on the live repo. Under ~5KB. Optional at runtime — the engine fails open to codex text if it's absent. |
| `data.js` | **ALREADY EXISTS — DO NOT CHANGE.** Shape below. |

### `data.js` shape (confirmed by reading the file)
```
window.TAROT_DECK = [ {
  name,            // "The Fool" / "Ten of Swords"  (display, verbatim)
  tag,             // "0 · Major Arcana" / "Ace · Wands · Fire"  (canon display string)
  keywords: [..],  // 4–5 items, meaning-ordered (strongest first)
  meaning,         // full UPRIGHT codex prose (paragraph)
  reversed,        // full REVERSED codex prose (paragraph) — a STRING, not a boolean
  group,           // "major" | "minor"  (lowercase)
  rank,            // majors: roman/"0" ("XI"); minors: word ("Ace","Two"…"King")
  suit,            // minors: "Wands"/"Cups"/"Swords"/"Pentacles"; majors: null
  element          // "Fire"/"Water"/"Air"/"Earth"; majors: "Major Arcana"
}, … ]  // 78 entries: 22 major + 56 minor
window.TAROT_META = { … }  // present; not required by v2
```
**Critical:** `data.js` `reversed` is prose text, not a boolean. The engine computes a
**separate** `isReversed` boolean per slot; it is never stored on the card object.

### `voice.js` shape (build it)
```
window.BRArcanaVoice = {
  BANK: { tarot: { "The Fool": {e,p,c}, … all 22 majors … } },  // p = pivot sentence (UPRIGHT only)
  get: function(slot, key){ /* exact-match then normalized fallback, verbatim from live */ }
};
```
The bank has **no reversed variant** — `p` is upright-only. Voice is preferred only for
**Major + Upright**; every other case uses codex text.

---

## 3. ENGINE SPEC

Everything below the cut is a **pure function of the sealed seed**. All animation is decoupled
theater. **Purity invariant:** after the cut, nothing touching card identity or orientation may
call `Math.random()`, `Date.now()`, or read the clock — the only entropy is the frozen token
inside the seed.

### 3.1 Hash / pick (FNV-1a 32-bit — structurally live, with the multiply corrected)
```js
function hash(s){ var h=2166136261; for(var i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619)>>>0; } return h>>>0; }
function pick(list,seed){ return list && list.length ? list[hash(seed)%list.length] : null; }
```
- FNV offset basis `2166136261`; prime `16777619`; force uint32 with `>>>0` after every multiply
  and at return.
- **RESOLVED (multiply):** use `Math.imul(h,16777619)`, **not** the live float multiply
  `(h*16777619)>>>0`. `h·16777619` reaches ~2^56 (past 2^53), so the float form rounds away the
  low ~3 bits and collapses `(&1)` reversal to ~5% — violating §3.3's required 50/50. This is the
  one engine primitive that changes from live; `pick`/`norm`/`drawSpread` stay verbatim. Flagged in
  INTEGRATION.md §B4 as the correction live `drawing-room.js` must adopt on graft.

### 3.2 Seed (norm is LOSSY on purpose)
```js
function norm(s){ return String(s==null?"":s).toLowerCase().replace(/[^a-z0-9]+/g," ").trim(); }
function makeSeed(key,q,token){ return "read~"+key+"~"+norm(q)+"~"+token; }
function makeToken(){ return Date.now().toString(36)+Math.random().toString(36).slice(2,8); } // frozen ONCE at cut
```
- `norm()` is punctuation/case-insensitive → two questions that normalize identically yield the
  **same** reading. This is canon-consistent. The **raw** question is stored separately for
  display only.
- **RESOLVED (token):** the standalone uses a **frozen random token**, deliberately **not** the
  live `sealNow()` (minute-granular base36). `sealNow()` collides two same-minute cuts of the
  same normalized question+spread into one seed; the random token guarantees each cut is unique.
  Flagged in INTEGRATION.md as the fix to graft back to live.

### 3.3 Deterministic draw (verbatim from live)
```js
function drawSpread(seed,n){
  var out=[], used={}, i=0, DECK=window.TAROT_DECK, cap=(DECK.length||78)*4; // cap=312
  while(out.length<n && i<cap){
    var c=pick(DECK, seed+"~"+i); i++;
    if(!c||used[c.name]) continue;                         // distinct BY NAME
    used[c.name]=1;
    out.push({ card:c, reversed:(hash(seed+"o"+out.length)&1)===1 }); // orient by FINAL slot idx, 50/50
  }
  return out;
}
```
- Per-card draw seed = `seed+"~"+i` (i increments across skipped duplicates).
- Per-card orientation seed = `seed+"o"+out.length` (the FINAL slot index k), so orientation is
  stable per position even when the distinct-draw loop skips a duplicate.
- **RESOLVED (reversal):** exactly **50/50** via `(hash(seed+"o"+k)&1)===1`. The prototype's
  `Math.random()<0.42` bias is **removed wholesale.**

### 3.4 Accession code (deterministic)
```js
function accession(seed){ return "BR-"+("00000"+(hash(seed+"br")%0xFFFFF).toString(16).toUpperCase()).slice(-5); }
```

### 3.5 Read-text binding (pure; voice optional; fail-open)
```js
function bindRead(card, rev){
  if(rev) return card.reversed;                            // codex reversed prose (major OR minor)
  if(card.group==="major"){
    try{ var v = window.BRArcanaVoice && BRArcanaVoice.get("tarot", card.name); if(v && v.p) return v.p; }
    catch(e){ /* fail open */ }
  }
  return card.meaning;                                     // codex upright prose
}
```
Matrix: Major+Upright → voice `p` (else `meaning`); Major+Reversed → `reversed`;
Minor+Upright → `meaning`; Minor+Reversed → `reversed`. Removing `voice.js` entirely still
renders every card with valid codex text.

### 3.6 Tiers table
```js
var SPREADS = {
  pull:    { key:"pull",    title:"A Glance",     n:1, paid:false, price:null,    filed:false,
             positions:[null], notes:[null] },
  sitting: { key:"sitting", title:"A Sitting",    n:3, paid:false, price:"$1.99", filed:true,
             positions:["The Ground","The Crossing","The Turn"],
             notes:["what the matter rests on","what stands against it","where it tends, left as it stands"] },
  deep:    { key:"deep",    title:"The Deep Read", n:5, paid:true,  price:"$2.99", filed:true,
             positions:["The Ground","The Crossing","The Root","The Crown","The Turn"],
             notes:["what it rests on","what stands against it","what it grew from","what it reaches for","where it tends"] }
};
```
Only the two **filed** tiers seal a seed to the URL. **A Glance** is ephemeral: seed
`"pull~"+SESSION+"~"+(pullN++)` re-rolls every press, **no URL, no gate, no code, no position
label.** `SESSION = makeToken()` at mount; `pullN` starts at 0.

### 3.7 Gate (one bit, fail-open, set AT THE CUT)
```js
function sittingUsed(){ try{ return localStorage.getItem("br_dr_sitting_used")==="1"; }catch(e){ return false; } }
function isPaidNow(key){ var sp=SPREADS[key]; return !!(sp && (sp.paid || (key==="sitting" && sittingUsed()))); }
```
- Key `br_dr_sitting_used`, value `"1"`. Read+write inside try/catch → **fail-open** (blocked
  storage treated as free).
- The bit is **set at the cut** (inside `doCut`, sitting only) so an abandoned reveal still
  consumed the free sitting. Deep is always paid; Pull is never gated.
- **Dev reset:** honor `?resetgate=1` on load → `localStorage.removeItem('br_dr_sitting_used')`.
  Never auto-clear on a normal load.

### 3.8 State machine
Phases (one-way, committed): `tier → intake → ready → shuffled → cut → dealing → dealt →
revealing → complete`.
```
STATE = { phase, tierKey, question(raw), token, seed, drawn:[{card,reversed,shown}], revealed, replay }
```
- **Committed sitting:** once `cut()` fires there is **no reset control** until every card is
  turned. Only then does the new-sitting control appear and reset to the tier chooser.
- **A Glance** takes a light path: Shuffle → deal-1 → user turns the single card. It never
  seals, never writes `?read=`, never touches the gate, lands in a "complete" framing directly.

### 3.9 The cut = the seal (the sole decision point)
`cut()` is the single commerce + seal chokepoint. On a paid tier it runs the settle beat first,
then `doCut()`; on a free tier it calls `doCut()` directly.

**`doCut()` strict order (nothing after step 3 may re-derive identity/orientation):**
1. Freeze `token = makeToken()` **once**.
2. `seed = makeSeed(sp.key, STATE.question, token)`.
3. `STATE.drawn = drawSpread(seed, sp.n)` with `shown:false` — **CARDS ARE CHOSEN HERE, nowhere else.**
4. If `key==='sitting'`: `try{ localStorage.setItem('br_dr_sitting_used','1'); }catch(e){}`.
5. Write the `?read=` receipt (`history.replaceState`, §3.10) — **before** any deal animation.
6. Lock the question field (Locked Ink, §6).
7. `announce()` (aria-live assertive): free `"The deck is cut."`, paid `"Settled. The deck is cut."`.
8. `phase='cut'` → play cutlift → auto-run deal (animation only; **reuses** `STATE.drawn`, never
   re-draws).

The CSS cutlift animation must not begin until steps 1–6 have committed synchronously.

### 3.10 `?read=` receipt + reopen
**RESOLVED (URL scheme):** standalone uses a **single opaque param**, not the live three-param
scheme, and **drops the `inApp()` guard** (standalone always writes the receipt).
```js
function writeReceipt(key,q,token){
  if(!history.replaceState) return;
  var payload = btoa(JSON.stringify({ k:key, q:q||"", t:token }));
  history.replaceState(null,"","?read="+encodeURIComponent(payload));
}
function tryReopen(){                    // called ONCE on load, before wiring controls
  var p = new URLSearchParams(location.search).get("read"); if(!p) return false;
  var o; try{ o = JSON.parse(atob(decodeURIComponent(p))); }catch(e){ return false; }
  if(!o || !SPREADS[o.k]) return false;
  var sp = SPREADS[o.k], seed = makeSeed(o.k, o.q, o.t);
  STATE = { phase:"complete", tierKey:o.k, question:o.q, token:o.t, seed:seed,
            drawn: drawSpread(seed, sp.n).map(function(d){ d.shown=true; return d; }),
            revealed: sp.n, replay:true };
  renderColdOpen();                      // NO deck, NO shuffle/cut/deal, single soft fade-in
  if(sp.filed) stampAccession(accession(seed));
  return true;
}
```
- Reopen **replays byte-identically**, **skips the gate** (never touches `localStorage`),
  **skips all ceremony** (cold open). The payload carries `k` + **raw** `q` (for display) + `t`
  (for the seed) so both the draw and the display question rebuild.
- **A Glance never writes `?read=`** → a Glance is never reopenable.

---

## 4. MOTION SPEC

Ceremony choreography (riffle, rifTop, cutlift, deal-travel, 3D flip) is ported at existing
timings. **Only slam and shock are retuned** (SETTLE's numbers, ratified by both panels).
Every keyframe animates **transform and/or opacity only** — the sole documented exception is the
settle beat's `color`/`background`/`border-color` transition. `will-change:transform` is added
only for a card's active ~1.6s window and removed after; never on the 7 static deck layers.

**Authoring constraint — "silence as sound design":** there is no audio; easing curves are the
sound. A landing must look like it made one dull thud, never ring like a bell. This is why the
extra slam rebound is removed. No future contributor may "brighten" a landing back into a flash.

### 4.1 Final keyframe values
| Keyframe | Value |
|---|---|
| **riffle** (deck pile) | `0.8s cubic-bezier(.3,.7,.2,1)`; 7 stops `0/12/28/44/60/78/100%`; translate `-11..11px`; rotate `-4..4deg`; scaleY `.965–1`. |
| **rifTop** (top card, concurrent) | `0.8s cubic-bezier(.3,.7,.2,1)`; translate peak `(-17px,-13px)`; rotate `-8..7deg`. Both clear at 820ms → phase `shuffled`. |
| **cutlift** (the SEAL gesture) | `1.02s cubic-bezier(.3,.72,.2,1)`; stops `0/18/40/62/82/92/100%`; lift `-108px@18%`; swing `(172px,-100px)@40%`; lower `(172px,-22px)@62%`; settle `(34px,6px)@82%`; overshoot `(0,-7px)@92%`; home `100%`. **Slowest, most deliberate motion on the stage** — unchanged amplitude, kept full. |
| **deal-travel** | transform-only, `0.54s cubic-bezier(.16,.86,.26,1)`, straight line, **no tilt/rotation**, from deck home to slot. `transition-delay = i*stagger`. |
| **slam** — RETUNED (3-stop) | `0.56s cubic-bezier(.22,.9,.28,1)`; `0%{scale(1.10,1.10)} 18%{scale(1.13,.90)} 45%{scale(.97,1.04)} 100%{scale(1,1)}`. **No 58%/78% stops anywhere.** |
| **shock** — RETUNED (pressure-ring) | `0.5s ease-out`; `0%{scale(.85); opacity:.30} 100%{scale(1.22); opacity:0}`. **Peak opacity never exceeds .30.** |
| **3D flip** | `0.75s cubic-bezier(.3,.7,.2,1)`; revealed face rests at `rotateY(180deg)`. |
| **settle** (paid only) | `~620ms`, color/opacity only, violet→gold; runs **fully before** cutlift starts; **skipped entirely (0ms) on free cuts**. |

### 4.2 Stagger (per-card deal delay)
```js
function stagger(n){ return n===5 ? 0.42 : 0.52; } // seconds
```
- slam + shock `animation-delay` are **numerically identical per card**: `delay = stagger*i + 0.54s`.
  They must start on the same frame. `stagger = 0.52` for n∈{1,3}, `0.42` for n=5 only.
- Mount-on-deck anticipation hold: ~520ms before the first launch.
- Total dealt-ready wait: `520 + (n-1)*stagger*1000 + 540 + 560 + 320` ms.

### 4.3 3D flip mechanics (fragile — port exactly)
- `transform-style:preserve-3d` **and** `-webkit-transform-style:preserve-3d` on the flip
  **container** (not the faces).
- `backface-visibility:hidden` **and** `-webkit-backface-visibility:hidden` on **BOTH** faces.
- **NEVER** `overflow:hidden` on a backface-hidden face (disables Chromium backface culling).
  If a face needs clipped corners, put `border-radius`+`overflow` on an **inner** wrapper that is
  not itself backface-hidden, or use `clip-path`.
- Face is `transform:rotateY(180deg)`. **Verify in Chromium (Chrome/Edge)** — no mirror-flash.

### 4.4 Deck pile + shrinking stack
- 7 layers: `translate(k*1.3px, k*1.7px) rotate(k%2?0.5deg:-0.4deg)`,
  `background hsl(34 22% (13-k)%)`→`hsl(32 20% (8-min(k,6))%)`.
- **Shrinking stack:** as each card launches, hide the topmost inert layer — a size-only change
  to the existing offset math, no new system.
- Deck pile + ambient glow fade to opacity 0 once the first card launches (`.is-launched`), never
  before, never mid-shuffle.

### 4.5 Reduced-motion path (parallel terse block near bottom of style.css)
Detection: `window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches`.
Under `@media (prefers-reduced-motion: reduce)`, **kill** riffle/rifTop/cutlift/deal-travel/slam/
shock (set `animation:none`/`transition:none`). Collapse per phase:
- **Shuffle:** single ≤150ms opacity crossfade on the deck; no translate/rotate.
- **Settle (paid):** shrinks to a ≤150ms **color-only** crossfade — **kept, not skipped** (it
  carries the transaction's meaning; strip only its motion). Button still shows `Settled` in gold.
- **Deal:** per-card opacity fade ~200–250ms (optional ≤120ms opacity-only stagger), no
  transform; the shockwave ring stays permanently `opacity:0`.
- **Flip:** opacity crossfade back↔front, ~150–200ms, **no rotateY / no preserve-3d.**
- **Hover micro-motions** (card lift, button lift) collapse to color/shadow only, no translate.

**JS parity (critical):** every `setTimeout`/transition-delay sequencing chain must be
short-circuited to near-zero waits under reduced motion — **not** merely CSS-hidden while JS
still waits out the full durations, or keyboard/SR users get dead air. Use a `motionOK` check at
the top of each `run*` and distinct shortened constants.

**Parity invariant:** the final rendered state (which cards, which orientations, which reads, in
which order) is **byte-identical** to the full-motion run for the same seed. Reduced motion
changes presentation timing **only** — never content, order, or outcome.

### 4.6 Reopen ≠ reduced-motion
A `?read=` reopen skips ceremony for **every** user (cards render already face-up, no deck, no
shuffle/cut/deal), independent of the reduced-motion media query.

---

## 5. CARD + STAGE + LAYOUT + RESPONSIVE SPEC

### 5.1 Card box
150×238px design size, `border-radius:12px` (do not scale radius below 10px). Face is 100%
typographic/geometric — **no illustration** (real art comes later). Both faces of one 3D-flip
element share the footprint.

**Face** — `linear-gradient(165deg,#efe9db,#dcd4c2)`, `border 1px solid rgba(20,14,8,.35)`,
`box-shadow 0 20px 40px rgba(0,0,0,.6)`, `padding 14px 12px`, ink `#1c150d`. Five centered bands,
no sixth:

| Band | Spec |
|---|---|
| Header row (flex space-between) | **Left:** meta label, 11px IBM Plex Mono 600, letter-spacing .12em, `#5c503c`. **Right:** orientation glyph, 13px Cormorant 700, `color:var(--accent)`, `rotate(180deg)` when reversed. |
| — header-left MAJOR | `"ARCANA · " + card.rank` (rank is already the roman/"0" string). |
| — header-left MINOR | `card.suit.toUpperCase() + " · " + card.element.toUpperCase()` e.g. `WANDS · FIRE`. (Equivalently split `card.tag` — prefer reading `tag` to avoid drift.) |
| — header-right glyph | Majors: diamond ◆ (unchanged). Minors: one **suit glyph** (§5.2) in the identical slot/size/weight. Both rotate 180° reversed via one CSS rule. |
| Name | `card.name` verbatim, 20px Cormorant 600 (**18px when `name.length>=13`**), line-height 1.05, `#1c150d`, centered, max 2 lines. |
| Divider | 26px × 1px `rgba(28,21,13,.35)`, 8px margin top/bottom. |
| Orientation tag | 8.5px IBM Plex Mono 600, letter-spacing .14em, uppercase; `Upright`=`#6a5c45`, `Reversed`=`var(--accent)`. **Only per-card color signal besides the header glyph — no bg wash / border change for reversed.** |
| Keyword line | 9px IBM Plex Mono 500, letter-spacing .06em, uppercase, `#6a5c45`, centered, line-height 1.5, single line. `card.keywords.slice(0,3).join("  ·  ")`. |

Corner ticks (face + back, 4 corners): 10×10px, `border-left+border-top 1.5px`; face
`rgba(28,21,13,.5)`, back `rgba(233,229,220,.12)`. Port geometry verbatim.

**Back** (one design for all 78, both orientations; deck-pile top = unrevealed dealt face):
`linear-gradient(158deg,#241c13,#120f0a 70%,#0e0b07)`; double inset hairline frame at inset
7px/12px (`rgba(233,229,220,.12)` outer / `.08` inner); concentric double-ring diamond (outer
82px / inner 58px, 1px hairlines); centered diamond glyph 26px Cormorant 700 accent-faint; top
micro-mono `ARCANA` 7.5px IBM Plex Mono 600 letter-spacing .34em `rgba(233,229,220,.18)`; bottom
micro-mono `BLUE ROOM` same size/weight/spacing `rgba(233,229,220,.32)`; radial sheen (upper-left
biased, low opacity). All back decoration `aria-hidden="true"`.

### 5.2 Suit glyphs (the one new visual system)
4 monochrome, stroke-only, no-fill glyphs, each ~10–13px, same weight class as the ◆, in the
header-right slot. **Implement as inline SVG** (`viewBox 0 0 14 14`, `stroke=currentColor`,
`stroke-width 1`, `fill=none`) defined once and reused by suit — **not** webfont/unicode
(cross-platform risk). Glyph color = ink `#1c150d` on face; reversed = the same 180° CSS rotate
(no separate reversed SVG).
- **Wands** = thin vertical rod (short serif cap top/bottom, no flame).
- **Cups** = shallow open arc / bowl (open top, no handle, no liquid).
- **Swords** = thin vertical blade with a small horizontal crossguard near the top third.
- **Pentacles** = thin unfilled ring (echoes the back's concentric-ring motif).

### 5.3 Accent = currency, not a fixed hue
The header-right glyph and reversed orientation tag read `var(--accent)` / `var(--accent-lit)`
CSS custom properties set by tier/settle state — the face never hardcodes violet/gold. Register:
neutral/gold-adjacent for A Glance and a first/free Sitting; **violet during an unsettled paid
cut, resolving to gold after the settle beat** for a repeat Sitting or Deep Read. The whole
stage (glow, back ring, corner ticks) relights in sync at settle because they share the same var.

### 5.4 Stage = real fluid DOM (not the prototype's 980×470 canvas)
**RESOLVED (layout model):** build the stage as flex/grid + `clamp()` fluid DOM; compute
deal/cut travel at runtime via `getBoundingClientRect()` deltas (FLIP), so the ported keyframes
work unmodified at any viewport. The prototype's absolute 980×470 canvas + hardcoded pixel slot
math (`gap = n<=3?170:30`, `x_i` formula) is **replaced**, not ported — this makes v2
graft-ready against the already-fluid live `arcana-profile.css` model instead of needing a second
rewrite at integration.

- **Card widths (clamp, tier-driven, match live canon):**
  - Pull: `clamp(170px,38vw,210px)`, aspect-ratio `120/190`.
  - Sitting: `clamp(96px,21vw,132px)`, aspect-ratio `150/238`.
  - Deep Read: `clamp(80px,16vw,110px)`, aspect-ratio `150/238`.
  - Deck plate matches the active tier's clamp so deck and dealt cards read as one object.
- **Spread container:** `display:flex; flex-wrap:wrap; justify-content:center; align-items:flex-start; gap:16px 14px; width:100%`. Deep Read (5): free-wrap alone orphans the 5th card into a 4+1 row below ~520px, so `.stage.is-deep` is capped there to exactly 3 card-widths (`max-width:calc(var(--card-w)*3 + 28px)`), wrapping it into a composed **3-over-2** ritual line. Sitting (3) and Pull (1) need no cap.
- **Slot column:** `display:flex; flex-direction:column; align-items:center; gap:8px` — label above card, measurable and responsive. Label = two lines (11px mono 600 uppercase letter-spacing .22em name + 11px mono 500 letter-spacing .24em ghost sub-label), width = card width, opacity 0→1 over .5s once dealt (skip transition under reduced motion).
- **Stage outer:** `width:min(980px,96vw); margin:0 auto; padding:36px 20px 56px` (desktop) / `24px 14px 40px` (≤620px).
- **Ambient glow:** sized 220%×220% of the deck plate, `aspect-ratio:1`, centered, radial-gradient `rgba(150,112,74,0.09) 0% → transparent 66%`, opacity 1→0 on `.is-launched` (`transition opacity .6s`).
- **Shockwave ring:** an absolutely-positioned pseudo-element 100% of the card box, so the `scale(.85→1.22)` keeps it proportionate at every clamp size.
- **Reading panel:** `display:flex; flex-direction:column; gap:22px; margin:0 auto`. Width `max-width:48ch` (Sitting/Deep) or `max-width:380px` (Pull). Each row: `border:1px solid var(--line)`; `border-inline-start:2px solid var(--line)` pre-reveal → `var(--accent)` once revealed; `padding:16px 16px 18px`; `min-height:120px` (verify against the longest actual `data.js` meaning; raise if clipped); `background:rgba(233,229,220,.03)`; `border-radius:8px`. Use `border-inline-start` (logical), not fixed-side.
- **Controls row:** `min-height:56px` (desktop) / `48px` (≤620px), `display:flex; align-items:center; justify-content:center`; **exactly ONE visible control at a time** (button OR progress string OR new-sitting ghost) so the stage never jumps.

### 5.5 Responsive
- **Single hard breakpoint:** `@media (max-width:620px)` (matches live). Above it everything is
  fluid via clamp/vw. Optional non-load-bearing `@media (max-width:900px)` may tighten stage
  padding only.
- **FLIP travel re-measured fresh at each card's launch** (not cached from mount) so a
  portrait↔landscape change mid-shuffle never produces a wrong-distance travel.
- **Touch targets:** every interactive control ≥44×44px CSS px hit area at every breakpoint via
  padding (WCAG 2.5.5); `@media (hover:none) and (pointer:coarse)` bumps control padding ~10px→~14px.
- **No horizontal body scroll** at 320–1920px in any phase/tier.
- **A Glance composition:** stage `max-width:min(480px,92vw)`; deck + single slot centered in the
  narrow column; deal is a short **vertical** hop (deck→slot below), **no position label**, reading
  panel a single centered ≤380px column.

### 5.6 FLIP travel (runtime)
```js
function launchCard(i, cardEl, deckPlateEl, slotCardEl, staggerUnit){
  var d=deckPlateEl.getBoundingClientRect(), s=slotCardEl.getBoundingClientRect();
  var dx=d.left-s.left, dy=d.top-s.top, sr=d.width/s.width;  // ~1 within a tier
  cardEl.style.transform="translate("+dx+"px,"+dy+"px) scale("+sr+")";
  cardEl.style.opacity="1";
  cardEl.style.transitionDelay=(i*staggerUnit)+"s";
  requestAnimationFrame(function(){
    cardEl.style.transition="transform .54s cubic-bezier(.16,.86,.26,1)";
    cardEl.style.transform="translate(0,0) scale(1)";
  });
  cardEl.addEventListener("transitionend", function(){ cardEl.classList.add("is-landed"); }, {once:true});
}
```
Reduced motion: skip the transform entirely; `transform:none; opacity:0→1; transition:opacity .2s`.

---

## 6. COMMERCE / SETTLE SPEC

Commerce is **fully mock** — no sheet, no form, no charge. The **entire transaction is the
~620ms settle beat at the cut**, where the tier control's violet resolves to gold and the label
reads `Settled`. `cut()` is the single commerce chokepoint.

- **Price visibility rides paid state:** first Sitting shows **no price** and sub "…your first is
  free."; once the bit is set, sub "…your first is filed." + ` · $1.99`. Deep Read always shows
  ` · $2.99`. The Pull never shows a price and never touches storage or the URL.
- **`cut()`:** compute `isPaidNow(key)`; if paid and `motionOK`, disable the button, add
  `is-settling`, set `Settled`, run the 620ms violet→gold color/opacity transition, **then**
  `doCut()`. If paid and reduced-motion, instant color swap to gold `Settled` (kept, not skipped)
  then `doCut()`. If free, `doCut()` immediately with no color beat.
- **Currency law:** violet `#8a6fb0` (lit `#a487c8`, line `rgba(138,111,176,.4)`) → gold
  `#a2864a` (lit `#c0a05d`). The settle transitions `color`/`background`/`border` only — **zero
  scale, zero bounce, zero glow-blur growth.** Copy says `Settled`, never `Paid`/`Purchased`/
  `Buy`/`Checkout`.
- **Currency-into-ink:** the settle gold and the completion corner code are the same register —
  the `BR-XXXXX` is written in the resolved gold. Paying and filing read as one event.
- **Mock note** — the exact string `Dev mock — no real payment in this build.` appears on
  **every** surface where `isPaidNow(key)` is true (used-Sitting intake AND Deep Read intake),
  absent when false.
- **Locked Ink:** the instant `doCut()` step 6 runs, the question field becomes `readOnly` +
  `aria-readonly="true"` (NOT `aria-disabled` — the filed value stays focusable/reviewable; the
  native `readonly` already conveys non-editability) and its text transitions once
  `--t-primary (#d7d3ca)` → `--t-display
  (#e9e5dc)` with a small letter-spacing tighten (~300ms, or instant under reduced motion), no
  scale/glow.
- **Reopen skips it all** — no settle, no gate write; §3.10.

---

## 7. ALL COPY STRINGS

Voice law: third-person-of-the-record, present indicative, archival. Banned after the cut
(case-insensitive, grep-checked): `drawing, revealing, casting, predicting, choosing,
calculating, loading, Paid, Purchased, Buy, Checkout`. Status-word lock: `Mixing / Sealed /
Filing / Awaiting the turn / Filed / Settled`.

### Brand / section
- Kicker (small mono, above stage): `THE DRAWING ROOM`. Optional italic subline pre-cut only:
  `A reading, kept exactly as it is drawn.`
- Section aria-label (role=region): `Tarot glance` / `Tarot sitting` / `Tarot deep read` per tier.

### Tier doors (order: A Glance / A Sitting / The Deep Read; framing, never "buy")
- **A Glance** — title `A Glance`, sub `One card, for looking, not keeping.` No price ever.
- **A Sitting, unused** — title `A Sitting`, sub `Three cards to one question — your first is free.`
- **A Sitting, used** — sub `Three cards to one question — your first is filed.`, price ` · $1.99`.
- **The Deep Read** — title `The Deep Read`, sub `Five cards, the fuller record.`, price ` · $2.99` (always).

### Intake
- Label: `Lay a matter on the table — optional`
- Placeholder: `a question, in your own words`
- Help / aria (via `aria-describedby`): `It is kept with your reading, and it does not choose the cards.`
- `maxlength=120`, `autocomplete="off"`.

### Cut
- Canon note (above the cut button, **sitting/deep only**, pre-press): `The cut does not choose the cards. It closes the question.`
- Button, phase `ready`: `Shuffle`
- Button, phase `shuffled`, free: `Cut the deck`
- Button, phase `shuffled`, paid unsettled: `Cut the deck · $1.99` (Sitting repeat) / `Cut the deck · $2.99` (Deep Read)
- Button, mid-settle (paid, disabled): `Settled`
- Mock note (any paid surface): `Dev mock — no real payment in this build.`

### Status line (single visible mono line; mirrors aria-live)
- shuffling: `Mixing.`
- cut (once): free `The deck is cut.` · paid `Settled. The deck is cut.`
- dealing: `Filing.`
- dealt, before first turn (per-column ghost): `Awaiting the turn`

### Turn-hint counter (visible small mono; **not shown for A Glance**)
- n=3: `Turn the first.` → `One turned, two to go.` → `One left. Turn the last.`
- n=5: `Turn the first.` → `One turned, four to go.` → `Two turned, three to go.` → `Two left.` → `One left. Turn the last.`

### Positions
- Sitting: `The Ground` / `what the matter rests on`; `The Crossing` / `what stands against it`; `The Turn` / `where it tends, left as it stands`.
- Deep Read: `The Ground` / `what it rests on`; `The Crossing` / `what stands against it`; `The Root` / `what it grew from`; `The Crown` / `what it reaches for`; `The Turn` / `where it tends`.
- A Glance: **no position label** (deliberate absence — signals "not filed").

### Reading-column header (once a card is turned)
- Sitting/Deep: `{position} — {card name}, {Upright|Reversed}`
- A Glance: `{card name}, {Upright|Reversed}`

### Closing line (once, after the last card; italic Cormorant, centered — the real centerpiece)
- A Glance: `A glance, not kept.`
- A Sitting: `The sitting is filed.`
- The Deep Read: `The read is filed, in full.`

### Completion accession code (filed tiers only; corner mono; once; subordinate to closing line)
- `BR-{code}` with caption directly beneath, muted, same size: `filed {date}`.
  `{date}` = `D Month YYYY` (e.g. `24 July 2026`).

### Post-reveal control (replaces turn controls)
- Sitting / Deep Read: `New sitting`
- A Glance: `Another glance`

### Reopen (`?read=`) — no ceremony, no progress language
- Quiet note above the record: `Reopened from your record. Filed {date}.`

### ARIA
- Per-card turn button, face-down: `{position}, card {i+1} of {n}, face down. Press to turn it.`
  (A Glance drops position: `Card, face down. Press to turn it.`)
- Per-card turn button, revealed: `{position}: {card name}, {Upright|Reversed}.`
- aria-live **polite** sequence (once per run, in order): `Mixing.` → cut announcement → `Filing.` → `Awaiting the turn.`
- aria-live **assertive**, one append per turn (never a full-region rewrite):
  `{position}: {card name}, {Upright|Reversed}. {read text}.` (A Glance omits position). Final
  append = the tier's closing line verbatim. Append child nodes; never rewrite `textContent`.

---

## 8. HARD ACCEPTANCE CRITERIA

**Determinism / engine**
1. For fixed (spreadKey, normalized question, token), `drawSpread` returns byte-identical cards
   **and** orientations on every call, across reloads and reopen. Two questions differing only in
   case/punctuation yield the same reading.
2. No code path selects a card/orientation outside `doCut()`/`tryReopen()`. Grep proves
   `runDeal`/`turnCard`/`render` never call `drawSpread`, `Math.random`, or `Date.now` on
   identity. A debugger paused between `doCut` step 3 and the first flip shows `STATE.drawn`
   fully populated.
3. Every spread has n **distinct** cards by name (fuzz 10k tokens, n=1,3,5).
4. Per-slot reversal probability = 0.5 ± noise over a large sample (**not** 0.42); reversal for
   slot k depends only on `seed+"o"+k`.
5. Accession code = `BR-` + 5 uppercase hex, deterministic from `seed+"br"`.

**Gate / commerce**
6. Gate reads/writes are try/catch fail-open; stubbing `localStorage` to throw still renders the
   sitting as free and completes the cut with no uncaught exception.
7. Fresh browser: first Sitting cut shows no price, no settle beat; a second Sitting cut shows
   `$1.99`, the mock note, and runs the 620ms violet→gold settle. `?resetgate=1` restores free.
8. Every Deep Read cut runs the settle and shows `$2.99` + mock note regardless of storage.
9. The bit is set the instant the cut fires — abandoning the reveal and returning shows the
   sitting priced.
10. The Pull never writes `?read=`, never reads/writes the gate, shows no position label, no
    counter, no accession code; consecutive presses produce different cards.

**Receipt / reopen**
11. Immediately after a filed-tier cut, `location.search` contains `?read=<token>` decoding to
    `{k,q,t}` matching the sitting.
12. Loading a captured `?read=` URL renders the finished record cold (cards face-up, closing line
    + accession code present), plays **no** shuffle/cut/deal, does **not** modify
    `br_dr_sitting_used`, and shows identical cards/orientations/reads/code as the original.

**Read binding**
13. Reversed Major → `card.reversed` (never voice); Upright Major → voice `.p` when present, else
    `card.meaning`; Minors → `card.meaning`/`card.reversed`. Deleting `voice.js` still renders
    every card with valid codex text.

**Cards / stage**
14. All 78 cards render with no JS error / no undefined text: 22 majors show `ARCANA · <roman>` +
    diamond; 56 minors show `<SUIT> · <ELEMENT>` + the correct suit glyph.
15. No card name wraps to a 3rd line at any tier width (test longest: `Knight of Pentacles`,
    `Nine of Pentacles`, `The Hierophant`). Keyword line never wraps.
16. Reversed is signaled **only** via header-glyph 180° rotate + orientation-tag text/color; no
    other face element changes upright↔reversed.
17. Suit glyphs are inline SVG (not webfont/unicode), stroke-only, one ink color, distinct at
    10–13px. Card back is one shared class for deck pile and unrevealed dealt cards.
18. No card face renders a hardcoded accent hex — it references a CSS custom property (grep).

**Layout / responsive**
19. 1280px+: Sitting = 3 cards in a centered row w/ labels; Deep Read = 5 cards one row, both
    under the stage cap. 375px: Deep Read wraps 3-over-2 with no body horizontal scroll, nothing
    clipped; Sitting fits/wraps cleanly.
20. Reading panel is always a single vertical column. Deck/glow/dealt sizes match within a tier.
    Deal travel is measured fresh at launch (resize mid-shuffle lands centered). Controls row
    never shows two controls at once; min-height holds across swaps.
21. A Glance renders no position label, narrower stage, ≤380px reading column.

**Motion**
22. Each keyframe matches §4.1 exactly. slam has **no** 58%/78% stops. shock peak opacity never
    exceeds .30. slam+shock delays are numerically identical per card (`stagger*i+0.54`).
23. Card selection is fully committed to `STATE` before the cutlift CSS animation starts.
24. 3D flip: both faces backface-hidden (+ `-webkit-`), container preserve-3d (+ `-webkit-`),
    neither face `overflow:hidden`, revealed face `rotateY(180deg)`; verified in Chromium with no
    mirror-flash.
25. Under reduced motion: all six ceremony animations are none; shuffle/deal/flip collapse to
    opacity per §4.5; the paid settle is a ≤150ms color-only crossfade (kept, not skipped); JS
    waits are shortened (not full durations hidden); final content is byte-identical to
    full-motion for the same seed.

**Copy / a11y**
26. Grep of the finished build for the banned-word set (case-insensitive) in the cut/reveal flow
    returns zero hits. No `reveal all`/`turn all`/`show all` control exists in the DOM.
27. At most one visible status-line element at any moment. Closing line appears exactly once,
    after the final turn, byte-identical to §7. Accession code + `filed {date}` renders below and
    quieter than the closing line, never on A Glance.
28. aria-live polite gets exactly the four-phase sequence in order; assertive gets exactly one
    append per turn + one closing-line append (child count = n+1 for Sitting/Deep, 2 for A
    Glance). Intake accessible name matches the help text verbatim via `aria-describedby`.
29. Focus rings: generic `outline:2px solid var(--pf-gold-lit); outline-offset:3px`; per-card
    turn button `outline:2px solid var(--pf-gold-lit); outline-offset:6px; border-radius:12px`.
    No element ships `:hover,:focus-visible{outline:none}` without a separate explicit
    focus-visible outline rule. New-sitting control receives programmatic focus when it appears.

**Isolation**
30. The build touches only files under `scratchpad/tarot_v2` (`index.html`, `style.css`,
    `app.js`, `voice.js`, `SPEC.md`, `INTEGRATION.md`). `data.js` is not overwritten. No live
    `app.js`/`drawing-room.js`/`styles.css`/`arcana-profile.css` is modified.
