# THE SITTING — Authoritative Build Spec (v2, rebuild)

Blue Room Tarot · the "Sitting" room, magnified into a private audience.
Files: `index.html`, `style.css`, `app.js` in `tarot-v2/`. **`data.js` and `voice.js` are frozen — never edit.** Only external dependency = Google Fonts. Serve over http; deploys to `nilsjouna999.github.io/blue-room-scan-room/tarot-v2/`.

This document supersedes the prior SPEC.md. It is the single source of truth. Where a subsystem spec and a design panel disagree, the resolution is written here and here wins.

---

## 0. THE SPINE — "THE LOW LAMP" (mood through-line, non-negotiable)

The sitting is a private audience in a late archive room. Every decision serves five laws:

1. **One lamp per view.** The white parchment card is the only lit object. At no scroll position may two fully-lit white reading cards be framed together (the top spread is the exception — it is *the table*, not the reading).
2. **Suspense = withheld information + enforced stillness**, never added effects. A face-down card that visibly *holds its question* is the whole thriller. The pause before a card speaks is the product, not dead time.
3. **Question → breath → answer is the room's only rhetorical figure.** It repeats at every scale: intake (guide → pause → cut), the turn (prompt → held beat → face), the reading entry (eyebrow → beat → read).
4. **The page is a descent.** Public tier doors at the top → the darkest, most private register at the bottom. Scrolling *is* deepening.
5. **Free is the hero; accent is currency.** Copper only on the card (◆ + reversed tag) and as the reading's one hairline; violet→gold only for the paid settle. No rainbow, no sparkle, no whole-card wash, no loop-pile. Silence over caption. Clarity beats poetry at the exits.

**The arc:** RECEIVED (arrival) → CONFIDED (question) → COMMITTED (cut) → WITNESSED (deal) → ASKED-THEN-ANSWERED (each turn) → ACCOMPANIED (the descent, one card per view) → FILED (close).

**The KILLED list (stays killed):** apex flash, reveal-all plate, edge-glint flip, phase-caption theater, film grain, any second accent hue, any infinite loop except at most ONE ambient cue visible at a time (deck-glow breath OR descend chevron, never both), and mandatory scroll-snap.

---

## 1. LOCKED DECISIONS

**D1 — WHITE ONLY.** Remove the White/Copper finish toggle entirely (markup + CSS + JS + `?card=`). Lock the single white parchment card. Keep `color-scheme: dark`. See §11.

**D2 — CANON PRESERVED.** Keep, byte-for-byte in behavior: the deterministic sealed-seed engine (`hash` via `Math.imul` FNV-1a, `pick`, `norm`, `makeSeed`, `makeToken`, `drawSpread`, `accession`, `bindRead`); the `?read=` receipt + cold-open reopen; the 3 tiers (`SPREADS`) + `TIER_STYLE`; the violet→gold paid settle (620ms); the cut as the sole decision point ("the cut does not choose the cards. It closes the question."); reduced-motion safety; keyboard/ARIA a11y (two live regions, focus-on-transition); `localStorage` fail-open gate; `window.__BRTarot`. The card FACE is locked exactly (see §4). The deck-pile back stays generic.

---

## 2. CANON TO PRESERVE VERBATIM (do not "improve")

- **Engine internals** (`app.js` ~16–62): `hash`/`pick`/`norm`/`makeSeed`/`makeToken`/`drawSpread`/`accession`/`bindRead`. FNV-1a `Math.imul` correction stays. `drawSpread` = distinct-by-name, 50/50 reversal by final slot index.
- **The cut = the seal** (`cut`/`runSettle`/`doCut`/`lockInk`/`writeReceipt`): token→seed→draw frozen at the cut; receipt to `?read=`; sitting gate to `localStorage`; the pull path stays ephemeral (no token/seal/gate/receipt).
- **Deal choreography** (`runShuffle` 820ms, `runCutlift` 1020ms, `runDeal`: on-deck mount → ~520ms anticipation → staggered travel `.54s cubic-bezier(.16,.86,.26,1)`, stagger `.42`(n=5)/`.52`(else) → slam `.56s` + shock ring → held breath). **Do not re-time shuffle/cutlift/travel/stagger/slam.** Sole permitted additive: extend the trailing post-deal hush (§8).
- **The 3D flip** (`.flip` 0.75s `cubic-bezier(.3,.7,.2,1)`, `preserve-3d`, both faces `backface-visibility:hidden`, **no `overflow:hidden`**). Duration/easing unchanged. R1 wraps timing *around* it.
- **Reduced-motion**: exactly ONE `@media (prefers-reduced-motion: reduce)` block. Extend it; never add a parallel block.
- **Live regions**: exactly two (`data-live-polite`, `data-live-assertive`) via `announce()`. Never add a third.
- **Card face**, **deck-pile back**, **SPREADS/TIER_STYLE**, **`__BRTarot`**.

---

## 3. THE SPACING SCALE (R5) — LOCKED, canonical

Add to `:root`. **No raw px in any margin/padding/gap after this lands** (except the coarse-pointer and reduced-motion blocks).

```
--sp-1: 8px;   --sp-2: 14px;  --sp-3: 22px;  --sp-4: 36px;
--sp-5: 56px;  --sp-6: 88px;  --sp-7: 136px; --sp-8: clamp(160px, 20vw, 220px);
```

Step → use: `--sp-1` micro (tick/pill padding, sub-gap); `--sp-2` tight-internal (label pos→sub, help→input); `--sp-3` component-internal (door padding-inline, tiers gap, reading-entry internal gap); `--sp-4` component-to-component (controls, door padding-block, intake padding); `--sp-5` beat-to-beat (cut-note→stage, stage→intake); `--sp-6` arc-joint (masthead-bottom, tiers→ceremony, room top/bottom, closing lead-in); `--sp-7` threshold (spread/controls → reading section start); `--sp-8` reading rhythm token (the reading uses per-item min-height as the primary one-at-a-time mechanism — §6).

At `@media (max-width:620px)` redefine only the large joints (ratios preserved): `--sp-6:64px; --sp-7:96px; --sp-8:clamp(96px,22vw,140px)`.

---

## 4. THE CARD (locked) + the two backs + type system

**Face — do NOT change (D2).** 150×238 base; parchment `linear-gradient(165deg,#efe9db,#dcd4c2)`; ink `#1c150d`; copper ◆ (`--card-accent #c98a5e`) top-right; `ARCANA · <roman>` or `<SUIT> · <ELEMENT>` top-left; card name (Cormorant 600, 20px); Upright/Reversed tag; two corner ticks (tl+br); no keyword line. `.card-rev` rotates only the ◆ + accents the orient tag. `faceHTML()` reused verbatim for the reading-echo card (§6).

**Deck-pile back — generic, unchanged:** `backHTML()` no args → frame/ring/◆/`ARCANA`/`BLUE ROOM`/ticks.

**Dealt filed-card back — carries its question (R1):** `backHTML(pos,sub)` gains a `.back-prompt` band (§5). A Glance + deck pile pass no prompt → generic back.

**Type system (5 voices).** DISPLAY (Cormorant): kicker (mono, unchanged), subline 22px italic, closing 28px italic. LABEL-MONO (IBM Plex Mono, tight 10–13px band, never competes with Cormorant for size): position kickers, status, turn-hint, accession. PROMPT (R1): back-prompt = mono, dim on the dark back, resolving into the mono label above. CARD (locked). READ (§6): eyebrow mono 11–12px; card name Cormorant 600 `clamp(26px,3.6vw,34px)`; read body Cormorant italic `clamp(18px,2vw,20px)`/1.66, `--t-primary`, measure 44ch.

---

## 5. R1 — THE FLIP HANDS ITS QUESTION UP (authoritative)

**Model = a RELAY, not a flying clone** (resize/scroll-safe; no `position:fixed`/`getBoundingClientRect`). The prompt is printed on the card BACK; the label slot ships EMPTY (a centered hairline); on turn, two same-axis animations hand the question upward while the flip is held back a beat, so the ask departs BEFORE the card rotates to answer.

### 5.1 Empty label + printed back
- `backHTML(pos,sub)`: `has=!!pos`; when `has`, insert `<div class="back-prompt" aria-hidden="true"><span class="bp-pos">{pos}</span><span class="bp-sub">{sub}</span></div>` before the bottom `BLUE ROOM` mono, and add `has-prompt` to `.back`. `renderDeck()` → `backHTML()` (generic). `mountCard()` → `backHTML(sp.positions[i], sp.notes[i])`; A Glance → null → generic.
- `renderSkeleton()` ships the label **textless**: positioned slots get `<div class="slot-label"><span class="label-wait" aria-hidden="true"></span><span class="pos"></span><span class="sub"></span></div>`; `.pos`/`.sub` textContent empty at deal, delivered at turn from `SPREADS`. Keep `.slot.is-dealt .slot-label{opacity:1}`. A Glance slots: empty label (no wait/pos/sub).
- The strings live in ONE place at render (the back). The label receives the SAME strings on turn → reads as delivery, not duplication.

### 5.2 The turn (`turnCard(i)`)
After `flip.classList.add("is-turned")` + `faceUpLabel` aria swap: set label `.pos`/`.sub` textContent from `SPREADS`, add `is-answered` to the label, add `is-lifting` to `.back-prompt` (guard null). `.slot.has-prompt .flip` carries a **180ms transition-delay** → these get their head start in the same tick.

### 5.3 CSS (transition/opacity only)
- `.slot-label{position:relative}`. `.slot-label .pos,.slot-label .sub{opacity:0}` (withheld; opacity:0 keeps the 34px height → no jump).
- `.label-wait{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:16px;height:1px;background:var(--line);opacity:.6;transition:opacity .2s ease}`; `.slot-label.is-answered .label-wait{opacity:0}`.
- `@keyframes labelDeliver{0%{opacity:0;transform:translateY(9px)}100%{opacity:1;transform:translateY(0)}}` → `.is-answered .pos{animation:labelDeliver .34s cubic-bezier(.22,.7,.18,1) .04s both}`; `.is-answered .sub{... .13s both}` (sub trails pos ~90ms).
- `.back-prompt{position:absolute;left:9%;right:9%;top:58%;transform:translateY(-50%);display:flex;flex-direction:column;align-items:center;gap:4px;text-align:center}`; `.bp-pos{font:600 9.5px var(--f-mono);letter-spacing:.18em;text-transform:uppercase;color:rgba(233,229,220,.44)}`; `.bp-sub{font:500 8px var(--f-mono);letter-spacing:.10em;color:rgba(233,229,220,.24);max-width:20ch}`. Both mono, same casing as the label (the rhyme carries the illusion).
- `@keyframes backPromptExit{0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-14px)}}` → `.back-prompt.is-lifting{animation:backPromptExit .26s cubic-bezier(.4,0,1,1) both}`. No blur.
- Recede ring/◆ only when `has-prompt`: `.back.has-prompt .back-mono.top{opacity:0}`; `.back.has-prompt .back-ring{width:52px;height:52px;top:33%}`; `.back.has-prompt .back-diamond{font-size:15px;top:33%;opacity:.34}`. Deep downshift: `.stage.is-deep .bp-pos{font-size:8.5px;letter-spacing:.1em} .stage.is-deep .bp-sub{font-size:7.5px}`.
- Hold the flip: `.slot.has-prompt .flip{transition:transform .75s cubic-bezier(.3,.7,.2,1) .18s}`. Base `.flip` (no delay) stays for A Glance.

### 5.4 Timeline (filed card, full motion, one click)
`t=0` label text + `is-answered` + `is-lifting` + `is-turned`. `0–260ms` back-prompt lifts/fades UP while label pos rises in (`.04s`), then sub (`.13s`) — card still flat. `t=180ms` rotateY begins. `t≈555ms` edge-on. `t≈930ms` face legible + label lit above + read arrives below (deferred, §6.4). One gesture: hands its question up, holds a beat, answers.

### 5.5 Reduced motion (extend the single block)
`.back-prompt.is-lifting{animation:none!important;opacity:0;transition:opacity .12s ease}` + `.slot-label.is-answered .pos,.slot-label.is-answered .sub{animation:none!important;opacity:1}`. Existing `.flip{...!important}` already strips the delay+rotateY. Order survives (prompt out → label in → face crossfade); no travel.

### 5.6 Cold-open
Deliver the label STATICALLY: set textContent, add `is-answered no-anim` (`.slot-label.no-anim .pos,.slot-label.no-anim .sub{animation:none!important;opacity:1}`). No back-prompt (already face-up). No flip animation (existing inline `transition:'none'`).

### 5.7 A11y
`faceDownLabel()`/`faceUpLabel()` unchanged. The `.flip` accessible name comes from its explicit `aria-label` and is never doubled by the `aria-hidden` back-prompt (verify computed name == the label string, Chromium a11y pane + VoiceOver).

---

## 6. R2 + R3 — THE DESCENT: each card follows to its own reading (authoritative)

**Invariant (write it, enforce it):** a white reading card exists ONLY inside `.read-item.is-revealed`; every revealed item is `min-height: min(82vh,760px)`, content vertically centered, hairline-separated. Unrevealed items are compact and show a DARK silhouette, never white. A partial record reads white-above / dark-below. This is the mechanism, not decoration.

### 6.1 DOM (rebuild `renderReadingSkeleton` + `fillReadCol`)
Container `.reading[ is-pull]` → first child `<div class="reading-head"><h2 class="rh-eyebrow">The Reading</h2><p class="rh-sub">Read in the order it fell.</p></div>` (opacity:0). Then per `i`: `<article class="read-item[ is-pull]" data-read-item aria-labelledby="rh-i">` with `<div class="ri-card" aria-hidden="true"><div class="ri-silhouette"></div></div>` + `<div class="ri-body">`. In `ri-body` (filed): `<p class="ri-index">{roman i} of {roman n}</p>` + `<p class="ri-eyebrow" id="rh-i"><span class="pos">{position}</span> · <span class="sub">{note}</span></p>`; always: `<h3 class="ri-name" id="rn-i"><span class="nm">—</span></h3>` + `<p class="ri-read ri-ghost">Not yet turned.</p>`. Pull omits index+eyebrow, labels by `rn-i`.

**`fillReadCol` MUST resolve items by `D.reading.querySelectorAll('[data-read-item]')[i]`** (children are offset by the reading-head — index-by-children is now a bug; fix at BOTH call sites: `turnCard` and the `renderColdOpen` loop). Then: mount `<div class="ri-face{ card-rev}">{faceHTML(dd.card,dd.reversed)}</div>` into `.ri-card`; set `.ri-name` = `{name}<span class="ri-orient{ is-rev}">{Upright|Reversed}</span>`; `.ri-read` textContent = `bindRead(dd.card,dd.reversed)`, add `is-brief` iff `read.length < 130` (drops `ri-ghost`); add `is-revealed` to item; add `is-shown` to reading-head.

### 6.2 Reveal engine (calm, scroll-driven, one-shot)
`initReadIO()` (call in `boot()` after `grab()`, before `tryReopen`): only when `('IntersectionObserver' in window) && motionOK` → add `html.js-io` + observer `{threshold:0.28, rootMargin:'0px 0px -18% 0px'}` that adds `.in` and unobserves on intersect. `observeItem(it)` for every skeleton item. The `js-io` gate is load-bearing: reduced-motion / no-IO get fully-visible content by default (no invisible-content trap).

Fill-on-turn mounts content below the fold (unseen during ceremony). As the user scrolls down, each item crossing the band gets `.in` → gentle fade+rise CASCADE (card → index → eyebrow → name → read). Exactly ONE animation per item; pure opacity+translate; **no card rotation** — visibly calmer than the flip. Suspense belongs to the initial turn only.

### 6.3 CSS (key values)
- `.reading{max-width:760px;margin:clamp(80px,14vh,160px) auto 0;--read-card-w:clamp(150px,22vw,188px)}` `.reading.is-pull{max-width:520px}`. `.reading-head{margin:0 0 clamp(40px,8vh,88px);text-align:center;opacity:0;transition:opacity .6s ease}` `.reading-head.is-shown{opacity:1}`.
- `.read-item{display:grid;grid-template-columns:var(--read-card-w) minmax(0,46ch);column-gap:clamp(32px,5vw,64px);justify-content:center;align-items:center;align-content:center;padding-block:22px;scroll-margin-top:clamp(24px,8vh,96px)}` `.read-item + .read-item{border-top:1px solid var(--line)}` `.read-item.is-revealed{min-height:min(82vh,760px);padding-block:clamp(40px,7vh,80px)}` (`align-content:center` frames short reads; min-height NOT transitioned).
- `.ri-card{position:relative;width:var(--read-card-w);aspect-ratio:150/238;justify-self:end}` `.ri-silhouette{position:absolute;inset:0;border-radius:12px;background:linear-gradient(158deg,#241c13,#120f0a 70%,#0e0b07);border:1px solid var(--line);opacity:.5}` `.ri-face{position:absolute;inset:0;border-radius:12px;background:var(--parchment);border:1px solid rgba(20,14,8,.35);box-shadow:0 16px 34px rgba(0,0,0,.5);color:var(--card-ink);padding:14px 12px;display:flex;flex-direction:column;align-items:center}` (reuse global `.face-*`; `.card-rev` drives glyph/orient).
- `.ri-index{font:400 10px var(--f-mono);letter-spacing:.18em;color:var(--t-ghost);margin:0 0 6px}` `.ri-eyebrow{font:600 11px var(--f-mono);letter-spacing:.2em;line-height:1.5;margin:0 0 10px}` (`.pos` uppercase `--t-meta`, `.sub` `--t-ghost`) `.ri-name{font:600 clamp(26px,3.6vw,34px) var(--f-display);line-height:1.08;color:var(--t-display);display:flex;align-items:baseline;flex-wrap:wrap;gap:10px;margin:0 0 16px}` `.ri-orient{font:600 11px var(--f-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--t-meta)}` `.ri-orient.is-rev{color:var(--accent)}`.
- `.ri-read{font:italic 500 clamp(18px,2vw,20px)/1.66 var(--f-display);letter-spacing:.002em;color:var(--t-primary);max-width:44ch;margin:0}` `.ri-read.is-brief{font-size:clamp(21px,2.6vw,25px);line-height:1.5;max-width:30ch}` `.ri-read.ri-ghost{color:var(--t-ghost)}`. Italic in ALL regimes; size/measure/leading compensate.
- Cascade (scoped `html.js-io` only): pending `.read-item .ri-card,.ri-index,.ri-eyebrow,.ri-name,.ri-read{opacity:0;transform:translateY(14px)}`; arrived `.read-item.in ...{opacity:1;transform:none;transition:opacity .6s ease, transform .7s cubic-bezier(.2,.8,.26,1)}`; stagger on `.in`: card 0 · index .12s · eyebrow .16s · name .24s · read .40s.
- Pull: `.read-item.is-pull{grid-template-columns:none;justify-items:center;text-align:center}` `.is-pull.is-revealed{min-height:min(72vh,600px)}`.
- `@media (max-width:700px){.read-item{grid-template-columns:1fr;justify-items:center;row-gap:clamp(20px,4vh,32px)} .read-item .ri-card{--read-card-w:clamp(150px,44vw,190px);justify-self:center} .read-item .ri-body{max-width:36ch;text-align:left} .read-item .ri-eyebrow,.ri-index{text-align:center} .ri-name{justify-content:center} .read-item.is-revealed{min-height:min(86vh,640px)}}` (card centered above a LEFT-aligned read — never centered prose).
- Reduced motion: swap the dead `.read-col` in the existing `transition-duration:.12s` line for `.reading-head`. No other reduced-motion rules needed (js-io never added → content visible).

### 6.4 Deferred read arrival (couples R1↔R2)
The visible read must arrive AT/after the face. Defer `fillReadCol(i,sp,dd)` and `complete(sp)` to `motionOK ? 930ms : 150ms` after the turn click, **STATE-guarded** (re-check phase inside the timeout; a fast reset must abort). The synchronous assertive `announce()` stays at click (SR never waits on visuals).

### 6.5 `is-brief` threshold
`< 130` chars catches only major+upright voice pivots (measured: pivots ≤~100, reversed ≥145, meaning ≥290). Document in code; re-verify if `voice.js`/codex change.

---

## 7. R4 — THE MATTER, GUIDED (authoritative)

Replace the bare optional field with a welcoming "matter station." For **filed tiers the intake LEADS — rendered ABOVE the stage** (confide → then the deck below is what you shuffle). Pull replaces the whole intake with one line.

### 7.1 Markup
```
<div class="intake" data-intake>
  <p class="intake-eyebrow">THE MATTER</p>
  <label class="intake-label" for="question">Lay a matter on the table.</label>
  <p class="intake-help" id="intake-help">A matter, held loosely — it is kept with your reading, and does not choose the cards.</p>
  <input class="intake-input" id="question" type="text" maxlength="120" autocomplete="off"
         placeholder="the matter, in your own words" aria-describedby="intake-help" />
  <div class="intake-examples" data-intake-examples>
    <span class="intake-examples-label">or lean on one —</span>
    <div class="intake-chips" data-intake-chips role="group" aria-label="Example matters"></div>
    <button type="button" class="intake-refresh" data-intake-refresh aria-label="Show other examples">⟳ others</button>
  </div>
  <p class="intake-permit">Or lay down nothing. The cards will speak to the shape of things as they stand.</p>
  <button type="button" class="intake-silence" data-intake-silence aria-pressed="false">— or leave it unspoken</button>
</div>
```
Plus sibling `<p class="pull-note" data-pullnote hidden>A glance takes no question. Look, and let it pass.</p>` for Pull.

### 7.2 Behavior
- **Chips** JS-rendered `<button type="button" class="intake-chip" data-chip-text="…">` from a fixed pool (§7.4). Rotation is **deterministic per tier-entry, never a timer**: module `chipOffset`, in `chooseTier(key)` for filed tiers `chipOffset=(chipOffset+3)%POOL.length; renderChips(chipOffset)` (3 contiguous). `⟳ others` advances by the same +3.
- **Chip click** MUST route through the existing path (seed integrity): `D.input.value=text; STATE.question=text;` (identical to the `input` handler), clear `is-silent`, `D.input.focus()`, caret to end. Never auto-submit; never advance phase. **Do not re-seed** (seed freezes only at the cut).
- **Silence toggle** toggles `is-silent` + `aria-pressed`; placeholder swaps to "Laid in silence."; clicking with text present clears the field first; focus/typing clears `is-silent` automatically.
- **Static help** (`#intake-help`, `aria-describedby`) is always in the DOM — the a11y guarantee. Rotation lives ONLY in the chip row, never in a rotating placeholder.
- **Pull**: `chooseTier('pull')` → `D.intake.hidden=true; D.pullNote.hidden=false`. `chooseTier(non-pull)`/`resetToTiers` reverse both, clear `is-silent`, reset `aria-pressed=false`.
- **Post-cut echo**: `lockInk()` adds `is-locked` to `.intake` and hides `.intake-examples` + `.intake-silence`. If empty at lock, the "Laid in silence." placeholder carries it.
- **Reading epigraph (thread the matter forward)**: at `complete()` and in `renderColdOpen()`, render the sitter's question ONCE at the head of the reading (above `reading-head`): `THE MATTER` eyebrow + words in Cormorant italic quotes (escape via `esc()`), or the permission line if unspoken. Round-trips free on reopen (`o.q`). Filed tiers only.

### 7.3 CSS
`.intake{max-width:520px;margin:var(--sp-5) auto var(--sp-4)}`. `.intake-eyebrow{font:600 11px var(--f-mono);letter-spacing:.18em;text-transform:uppercase;color:var(--t-meta)}` `.intake-help{max-width:44ch;margin:var(--sp-2) auto 0;font-size:12.5px;color:var(--t-ghost);line-height:1.5}` `.intake-examples{margin-top:var(--sp-3);display:flex;flex-direction:column;align-items:center;gap:var(--sp-1)}` `.intake-chip{font:14.5px var(--f-display);padding:7px 14px;min-height:36px;border:1px solid var(--line);border-radius:999px;background:rgba(233,229,220,.02);color:var(--t-meta);cursor:pointer;transition:color .18s,border-color .18s,background .18s}` `.intake-chip:hover,.intake-chip:focus-visible{color:var(--t-primary);border-color:rgba(233,229,220,.24)}` `.intake-permit{margin-top:var(--sp-2);font:italic 15px var(--f-display);color:var(--t-meta)}` `.intake-silence{margin-top:var(--sp-3);background:none;border:0;font:italic 15px var(--f-display);color:var(--t-ghost);text-decoration:underline;text-underline-offset:3px;cursor:pointer}` `.intake-input.is-silent::placeholder{font-style:italic;color:var(--t-ghost)}` `.pull-note{margin:var(--sp-3) auto;max-width:420px;text-align:center;font:italic 17px var(--f-display);color:var(--t-ghost)}`. Coarse-pointer block gains `.intake-chip{padding:10px 16px;min-height:44px} .intake-input{padding:15px 16px}`.

### 7.4 Example pool (9, archival, statements not questions, no `?`)
`the offer I have not answered` · `what to do about my brother` · `whether to stay the winter` · `the house, and whether to sell it` · `the work, and where it is going` · `what I owe her, if anything` · `the move I keep not making` · `whether this is the year` · `the thing I said, and what it cost`.

---

## 8. R6 — PACING & SUSPENSE (beats + timings)

Three scales of suspense: the user's own pause before each click; the held beat inside each turn; the off-screen withholding of the reading behind the scroll. Replicate the deal's native breath grammar; do not invent a new rhythm.

- **ARRIVAL (RECEIVED).** Masthead + 3 doors stage in on load: opacity 0→1 + translateY 6px→0, ~600ms, ~90ms stagger; subline fades up ~900ms after load. One entrance, `motionOK`-gated, one-shot. No ambient motion at rest.
- **QUESTION (CONFIDED).** §7. Chips are the first suspense beat (leaning in). No churn.
- **CUT (COMMITTED) — untouched.** The loudest moment; everything around it quietest. Keep the settle (620ms), Locked Ink, the canon line, the receipt exactly (D2). The Locked-Ink question stays visible through the sitting. No new cut effect.
- **DEAL (WITNESSED) — preserved.** Sole additive: extend the trailing post-deal hush from `+320` to **`+560`** (`motionOK`; reduced-motion ≤250ms) so "the filing is done" separates from "now turn one." Stagger/slam/cutlift/shuffle UNTOUCHABLE.
- **TURN (ASKED-THEN-ANSWERED).** Per §5.4: ~200ms lift → 180ms flip pre-roll → 750ms flip → read arrives ~930ms (deferred). Held beat before the read speaks. Delay the `turn-hint` update ~200ms after the read fades so two content changes never share a frame. Rhythm identical for every card in every tier.
- **DESCENT (ACCOMPANIED).** §6.2 — calm scroll cascade, never a second reveal.
- **CLOSE (FILED).** After the last read settles, hold ~650ms, then resolve as one gesture (~2s, one-shot, never re-fires): a 1px `var(--line)` rule draws L→R (`scaleX 0→1`, 420ms) with a 6px copper ◆ (`var(--card-accent)`, reuse — the card's own mark on the ledger line) fading in mid-draw; the closing line fades+rises (360ms); the accession stamp fades in (~300ms) on gold; then the close-actions cluster (§9). Focus lands on the primary control at the end (~T0+1.9s). Reduced motion: single 120ms opacity fade for the whole block, focus immediate. Assertive `announce()` fires at T0 regardless.

---

## 9. R7 — NAVIGATION & STATES (no dead ends)

State enum unchanged (`tier → intake → ready → shuffling → shuffled → cut → dealing → dealt → revealing → complete` + reopen). R1/R2 add choreography within states, not new phases.

- **Leave-mark (every state, incl. reopen).** First child of `<main class="room">`, before the masthead: `<a class="leave-mark" data-leave href="../index.html" aria-label="Leave the sitting — back to Blue Room">Blue Room</a>`. Fixed top-left, `z-index:40`, mono 10px `.16em` uppercase, opacity .55→1 hover/focus, `var(--t-ghost)→var(--t-primary)`. Reuses the freed `.cardswitch` corner. Never removed/mid-screen; passive during motion. **Verify the href against the deployed path before ship** (`../index.html` targets repo root; use `../` if the entry has no index filename).
- **Pre-cut escape.** `<p class="pretier-nav" data-pretier-nav hidden><button type="button" class="link-quiet" data-back-tier>Choose a different reading</button></p>` after `.mock-note`, before `.stage` — NOT in `.controls` (that row stays one-visible-control). Visible only in `ready|shuffling|shuffled`; `disabled` during `shuffling`; hidden the instant `doCut()` runs (same block as `D.cut.hidden=true`, synchronous, before any async draw). Click → `resetToTiers()`. Post-cut there is NO reset (canon).
- **Price early.** `<p class="price-note" data-price-note hidden></p>` after `.mock-note`; in `chooseTier`, if `isPaidNow(key)` set `This cut carries a charge of {price}.` visible (sitting-repeat + deep only), hidden otherwise and at cut.
- **Descend cue** (filed tiers only). In `complete(sp)` before `showClosing`, reveal `<div class="descend" data-descend><button class="descend-btn" data-descend-btn aria-label="Read the record below"><span aria-hidden="true">⌄</span></button><p class="descend-label" aria-hidden="true">Read it down</p></div>` below `.spread`. Click smooth-scrolls (`behavior: motionOK?'smooth':'auto', block:'start'`) to the first `[data-read-item]`. Chevron pulse opacity .4↔.7 / 3000ms (the sole ambient loop; static .55 reduced-motion). Never shown for pull. The ONE signpost — no separate text cue.
- **Close-actions cluster** (bottom, after accession): `<div class="close-actions" data-close-actions hidden><button class="btn btn-ghost" data-again-bottom></button><button class="link-quiet" data-back-room>Back to the room</button></div>`. Both → `resetToTiers`. `complete()` sets `D.closeActions.hidden=false` and mirrors `D.againBottom.textContent = D.again.textContent`. Focus stays on the TOP `D.again`.
- **Again labels (fix register slip):** pull → `Another glance`; sitting → `New sitting`; **deep → `New reading`** (top + bottom instances).
- **Reopen forward path.** `renderColdOpen`: keep top `New reading`; also show the bottom cluster; no pretier-nav; descend cue shown unconditionally for sitting/deep; every reading item pre-`is-revealed`, IO bypassed (fully readable, zero scroll dependence); leave-mark present.
- CSS: `.link-quiet{background:none;border:0;padding:2px 0;font:500 12px var(--f-ui);color:var(--t-ghost);text-decoration:underline;text-underline-offset:3px;cursor:pointer}` `.link-quiet:hover,.link-quiet:focus-visible{color:var(--t-primary)}`. Every new interactive element reuses the existing `:focus-visible` token — no second focus style.

---

## 10. MOOD LAYER (achromatic only)

`<div class="mood-field" aria-hidden="true"></div>` first inside `<body>` before `<main>`; `.room{position:relative;z-index:1}`. `.mood-field{position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(120% 100% at 50% 32%, transparent 44%, rgba(6,7,9,.34) 100%);transition:background 700ms ease}`. Deepens by phase via `data-mood` on `<body>`: `tier`/base `.34`; `cut` `.46` (settle beat); `reading` `.58` (first item mounts). Never exceeds `.58` (> AA against `--t-primary`). Optional warm pool behind the single active card: `.is-focal::before{background:radial-gradient(60% 46% at 50% 40%, rgba(201,138,94,.055), transparent 70%)}`, ≤.06 alpha, one at a time — copper hue at near-zero alpha, never reads as a second accent. **No grain, no new hue.** `pointer-events:none` always.

---

## 11. D1 — WHITE-LOCK REMOVAL (pure subtraction)

Delete, in order (JS → CSS → HTML, one commit): `app.js` `setCardVariant`/`initCardSwitch` (~746–766) + the `initCardSwitch();` call in `boot()` (~771); `style.css` the `:root[data-card="copper"]` block (~52–61) and the `.cardswitch*` rules (~104–121); `index.html` the `.cardswitch` div (21–26). Keep `color-scheme: dark`. Confirm base `:root` = white spec (parchment `linear-gradient(165deg,#efe9db,#dcd4c2)`, ink `#1c150d`, `--card-accent #c98a5e`). Grep-clean: zero hits for `data-card`, `data-cardvar`, `data-cardswitch`, `br_card_variant`, `setCardVariant`, `initCardSwitch`, `?card=`.

---

## 12. FILE PLAN

- **`index.html`** — remove `.cardswitch` (D1); add `.mood-field` + `.leave-mark`; reorder filed-tier flow so `.intake` renders ABOVE `.stage` (add `.pull-note` sibling); rebuild `.intake` markup (§7.1); add `.pretier-nav`, `.price-note` (§9); `.reading` stays an empty `[data-reading]` mount (structure JS-emitted); add `.close-actions` after `.accession`; `.descend` injected in `complete`. `<head>`/fonts/`color-scheme` unchanged.
- **`style.css`** — spacing + type tokens into `:root` (§3/§4); D1 deletions; rewrite `.slot-label`/back-prompt block (§5); rewrite the entire `.reading`/`.read-col` block into `.reading-head`/`.read-item`/`.ri-*` (§6); intake station (§7); nav rules (§9); `.mood-field` (§10); add keyframes `labelDeliver`, `backPromptExit`; extend the SINGLE reduced-motion block (swap dead `.read-col` for `.reading-head`, add R1 rules); add the 700px reading breakpoint; retune every touched margin/gap to tokens.
- **`app.js`** — D1 deletions (§11); `backHTML(pos,sub)` + `mountCard` pass positions (§5.1); `renderSkeleton` ships empty label + `label-wait` (§5.1); `turnCard` label-delivery + `is-lifting` + deferred STATE-guarded `fillReadCol`/`complete` (§5.2/§6.4); rebuild `renderReadingSkeleton`/`fillReadCol` to the descent structure, resolve items by `[data-read-item]` (§6.1); `initReadIO`/`observeItem` + `boot()` call (§6.2); intake pool + `chipOffset` + `renderChips` + chip/refresh/silence handlers + pull swap + `chooseTier`/`resetToTiers` resets + `lockInk` locks intake (§7); reading epigraph in `complete`/`renderColdOpen` (§7.2); nav wiring — leave-mark, pretier-nav, price-note, descend, bottom close-actions, deep→`New reading` (§9); `data-mood` at chooseTier/cut/first-reading-mount (§10); extend post-deal hush to +560 (§8); `renderColdOpen` parity throughout. **`data.js`, `voice.js` — untouched.**
- **`SPEC.md`** — this file. **`COPY.md`** — mirror §5/§7/§9 copy verbatim as a sibling deliverable.

---

## 13. HARD ACCEPTANCE CRITERIA

**Engine/canon:** 1) `drawSpread` distinct-by-name, 50/50 reversal. 2) Same `?read=` token reopens an identical reading and skips gate + ceremony. 3) The cut is the only place cards are chosen/sealed; pull leaves no token/receipt. 4) `window.__BRTarot.state().question` equals the visible input value at cut time — including after a chip click. 5) Reduced-motion preserves ORDER everywhere (label resolves before/with the face; read mounts after the face) with no dead time. 6) Deal stagger/slam/cutlift/shuffle constants unchanged; only the trailing hush is +560.

**R1:** 7) Pre-turn, each dealt filed slot's label shows ONLY the `.label-wait` hairline; `.pos`/`.sub` empty; position text is on the BACK. 8) On turn the position arrives in the label (delivered, not pre-present) and the back-prompt is gone; the rotateY visibly begins AFTER the prompt starts lifting. 9) Deck pile + every A Glance card show the generic back. 10) `.flip` accessible name == the label string in every state (never doubled). 11) Reduced motion: ordered crossfade, no rotateY/translate/delay.

**R2/R3:** 12) At ≥900px, scrolling a completed Deep Read never frames two `.ri-card` white faces fully in-viewport at once. 13) Unrevealed reading items show the dark silhouette, never white. 14) With IO disabled, all items render at full opacity, no missing content. 15) `.ri-card` is `aria-hidden`; SR reads each item once (h3 + eyebrow + read), no duplication. 16) `.ri-read` computed `max-width` ≤44ch (≤30ch `is-brief`; ≤36ch <700px); color `--t-primary`. 17) The reading arrives at/after the face via the deferred, STATE-guarded fill.

**R4:** 18) `#intake-help` static, non-empty, `aria-describedby`-linked (present with CSS/JS disabled). 19) A chip click updates BOTH the visible input and `STATE.question` to the identical string. 20) Focusing/typing permanently stops chip rotation for that tier session; rotation never runs on a timer. 21) Pull shows `.pull-note`, no field; filed tiers show the station above the stage. 22) Chips + input Tab-reachable, ≥44×44 under coarse-pointer.

**R5:** 23) Grep: zero bare px in margin/padding/gap outside `:root`, coarse-pointer, and reduced-motion blocks. 24) Tier-choice screen fits without scrolling at 1280×720.

**R6:** 25) One held beat between face-legible and read-visible on every turn; turn-hint update doesn't share a frame with the read reveal. 26) Close resolves as one ~2s one-shot gesture (rule + copper ◆ + line + stamp), never re-firing on re-scroll; reduced-motion = single 120ms fade.

**R7:** 27) Leave-mark present + focusable in tier, every ceremony sub-phase, complete, and reopen; href resolves. 28) Pre-cut escape visible only in ready/shuffling/shuffled, gone at/after cut; clicking lands on the doors with the first door focused. 29) No state renders zero exits. 30) Complete + reopen show top AND bottom exits; deep says "New reading"; descend cue only sitting/deep.

**D1:** 31) Grep-clean of all cardswitch/copper identifiers; single white parchment card; `color-scheme:dark` intact.

**Global:** 32) `.mood-field` never above `z-index:0`, never occludes a click target. 33) Exactly two live regions, one reduced-motion block, at most one ambient loop visible at a time. 34) Full keyboard walkthrough (door → chip → Shuffle → Cut → each flip in order → New sitting) with zero mouse, zero dead-ends, zero focus loss; a11y audit shows no new violations vs. baseline across all states.

---

## 14. RISK REGISTER (top load-bearing)

- **`fillReadCol` index bug:** children of `.reading` are offset by `reading-head` → MUST use `querySelectorAll('[data-read-item]')[i]` at both call sites. Highest-risk edit.
- **Leave-mark href** is the only exit to Blue Room — a wrong relative path silently 404s. Verify against deployed sibling paths, not the scratch folder.
- **Pre-cut escape** must hide synchronously inside `doCut` before any async draw, or a mid-cut click corrupts STATE.
- **R1 relay legibility** on slow devices: keep durations short + same easing family + same vertical axis; if it separates, shorten `labelDeliver` before touching anything else. Fallback = fade-only handoff.
- **Deferred fillReadCol re-entrancy:** re-check STATE inside the timeout; never defer the assertive announce.
- **`--sp-8`/82vh rhythm:** validate on a real 800–900px-tall desktop with a 5-card Deep Read; first lever if hollow is min(72vh…), not decoration.
- **Deep-tier back-prompt fit** at ~92px: the `.stage.is-deep` downshift is mandatory; fallback = drop `.bp-sub`, keep `.bp-pos`.
- **`is-brief` threshold (130)** validated against the current corpus; re-verify if `voice.js`/codex change.

---

## 15. DEFERRED (Phase 2, do NOT build now)
Reading lede/body split of `bindRead` into pull-quote + prose — baseline stays the single read string + `is-brief` switch. The "rising ledger" spine line. Scroll-snap (min-height carries one-at-a-time; snap at most a `proximity` nicety, never `mandatory`).
