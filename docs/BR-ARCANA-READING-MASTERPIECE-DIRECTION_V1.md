# Arcana Reading Page — Masterpiece Design Direction (V1)

> Synthesized from a 34-agent research pass (20 Haiku research · 10 Sonnet sub-systems · 3 Opus direction/gate/spec · 1 Fable masterstroke), grounded in Blue Room canon (DESIGN_TOKENS, GOLDEN_NUGGETS, the `reveal/` machinery, READING_ZONE_INVENTORY, ARCANA_CEREMONY_PLAN). This replaces `arcana-result.*` ("The Armor Received"). Status: **direction, pre-build.** New untracked file — keep, move, or delete freely.

---

## 0. The one axiom (read this first)

**Revelation is the subtraction of occlusion from a constant object. Reward is addition to it. This page may only ever subtract.**

Every reward animation ever built — the chest opening, the badge bursting, the loot glow — is an *addition* at the moment of payoff. That is the actual DNA of "gamey," deeper than confetti or scores. The armor figure was one symptom; the disease is additive payoff. So the governing test for every decision, forever: **does it add, or does it subtract?** Gold-rationing, seal-not-lock, evidence-not-score, absolute finality — the team's four separate anti-gamey rules are four faces of this one law.

The corollary that makes it operational: **the crown is never improved — only unveiled.** The forged crown from the ceremony is bit-identical at the top of the page and at the finale. The only thing that changes between them is the reader — which is the entire claim of divination.

---

## 1. Governing metaphor — the Illuminated Dossier, crowned by a Reliquary

Kill the armor figure **and its whole family** — body-slots, mandala, orrery, constellation-wheel, radial hub. Every one of those puts 12 things *around* 1 thing, which is a diagram by construction and reads gamey the instant it's legible. A rounder diagram is still a diagram.

Replace it with a metaphor that is **temporal, not spatial**: an illuminated archival scroll the reader *descends* through, page after page, like a bound dossier. The 12 readings are flat entries in that record. The crown is not a hub — it is the **reliquary**: one cased, elevated object at the head of the record and returned to at the close. The armor said "you are equipped." The dossier says **"you are on file — here is the evidence, and here is the name it converges on."** Equipment → evidence; worn → witnessed. That reframing is what severs the RPG cord.

---

## 2. The load-bearing device — the crown appears twice

Almost every agent converged here independently. The crown is rendered **twice, from the same markup**:

1. **SEALED** (top): the name is present as an *object* but withheld as *meaning* — a redacted-archival treatment (low opacity, heavy tracking, low-contrast cream), never a loading skeleton.
2. **CONSECRATED** (~85–90% depth — see §6 fix): the same object, now fully legible, because the 11 readings between the two sightings **assembled the case for the name.**

This converts "12 readings then a crown" into **one unresolved sentence — "what does this name mean?"** — that the page spends its whole length resolving. The reader is always mid-sentence, never mid-list.

### Two fixes that make the device *real* (from the adversarial gate — non-negotiable)

- **The name must arrive SEALED from the first painted frame.** The ceremony handoff flash consecrates the *object/silhouette* (a glow on the reliquary form), **never the legible name.** A bright, readable name at load spoils the finale in second one. *(This is also Fable's demand: the finale subtracts occlusion; nothing legible may precede it.)*
- **The finale must ASSEMBLE the name from parts the reader has already met** — the thrice-threaded archive-lexicon word + the concrete symbols of the CONFIRMED pair. Otherwise "earned legibility" is just an opacity fade — a dimmer switch, not an inference. The reader must *see why this name*, from pieces they recognize. This is the single most important thing to get right; the whole device is decoration without it.

---

## 3. Composition

- **One centered column**, `max-width: 680px; width: 90vw`, persistent dark Room margins (the body floor showing through). **No grid, no multi-column, no horizontal scroll at any breakpoint.** Mobile is the *same* column full-width — never a responsive 3×N grid (that grid *is* the armor mistake restated).
- **Atomic unit = the archival ROW** (reuse `.rv-row`), never a card, never a grid cell. A thin rule draws left→right, then label + value fade in. No bordered boxes, no drop-shadows, no icons at rest.
- **Eleven readings are flat Plate; the crown alone is Artifact** (the one element with object-depth). Legibility of twelve is achieved through **sequence** (one plate in view at a time), never simultaneous arrangement.
- The eleven group into **five plates / chapters**, each with one IBM Plex Mono small-caps zone header (~40% opacity — the only labeling chrome):
  - **I · ORIGIN** (quiet, solo) — ground first stood on.
  - **II · TRINITY** (quiet) — Sun sign · Year animal · Life Path, *stacked* (never a 3-col row).
  - **III · COUNSEL** (medium→loud) — Tarot major · Tarot counsel · Rune · I Ching trigram. Each keeps its **native internal density** when opened (tarot = illustration; rune = carved whitespace; trigram = line-diagram). Do not flatten to matching boxes.
  - **IV · BINDING** (loud) — path forward · belt seal · lexicon word.
  - **V · CROWN RETURN** (finale) — the reliquary reopens, then closing stillness.
- The crown **never enters the row sequence as a 13th press-target.** It is full-bleed at load → demoted to a small (~24–32px) gold running-head sigil through I–IV (the only wayfinding) → returned full-scale at the finale. **No drawn line, ring, connector, or spoke** anywhere between the crown and any reading. Sequence and the sigil are the only links.

---

## 4. Experience arc & tension curve

Scroll is the **ritual clock** — native scroll physics only; no scroll-jacking, snap, autoplay, or progress bar. One continuous descent, four acts reprising the ceremony's rhythm.

`HOLD → QUIET → MEDIUM → LOUD → THE EXHALE → FINALE → DENOUEMENT`

- **ACT I · HOLD** — the sealed crown alone, name withheld. A near-empty dark buffer **gated by minimum-elapsed-time** (not just intersection) so even a momentum-scroller gets 2–3s of nothing but the sealed object. This forced breath-hold is the entry ritual.
- **ACT II · QUIET** — Origin, then the Trinity cluster. Longest dark gaps; 120ms sibling stagger.
- **ACT III · MEDIUM** — Counsel. Gaps compress; stagger tightens to ~90ms; the reader *feels* the pace pick up. The optional CONVERGE beat may surface here (see §8).
- **ACT IV · LOUD** — Binding. Gaps tightest; ~60ms stagger; the one legal Act-IV bright-gold word-flash.
- **THE EXHALE** — the single largest dark gap on the page, longer than the opening hold. A full breath-out that resets attention to zero.
- **FINALE** — the crown consecrates (§7). Tension *resolved,* not escalated.
- **DENOUEMENT** — a short quiet fall-off to one mono seal line, then blank stage. The page ends like a completed sentence.

> **Pacing carried by TWO instruments, not one.** The gate flagged that gap-length alone is invisible to momentum/trackpad scrollers. So the *acceleration* also lives in reveal timing (stagger + reveal duration on IntersectionObserver, which fires regardless of scroll speed). Fast and slow scrollers get two valid experiences — design both.

---

## 5. Motion & breath

**Invert game-UI logic: the ROOM breathes; everything else is frozen until acted on.** Breath lives in the container, not the content. Whole taxonomy = four buckets (any future animation fits one or is cut): (a) ambient room-breath, (b) crown glow, (c) reveal/recede/press, (d) hover/focus confirm.

- **At most ONE continuously-looping element on screen at any instant.** Room-breath: floor opacity 0.98↔1.0, 8s, subliminal (if you can consciously see it pulse, the amplitude is wrong). One optional parallax (archive-grain <2px, transform-only). Reading rows/text **never** parallax.
- **Crown glow-breath**: warm-gold box-shadow .25↔.4, 7s — the single sanctioned loop exception (canon names the crown the one Artifact). Dims when a reading is in press-focus so the two never compete.
- **Three gestures only**, used identically everywhere: opacity fade, an 8–16px vertical drift, and the crown's one reserved glow. Easing always **weighted** (`cubic-bezier(0.22,1,0.36,1)`) — a seal pressed into wax, never a bounce. **Banned:** spin, scale-pop on scroll, rotation loops, particles, confetti, sparkle, typewriter/per-character reveals, elastic/spring.
- **Reduced-motion = poetic substitution, not deletion.** Breath → static; reveals → 200ms opacity crossfade. Critically, the SEALED→CONSECRATED reveal **still happens** via instant style-swap — it is *content,* not decoration.

---

## 6. Expand / tunnel / showcase — Focal-Press-In-Place

The one real conflict in the research (scroll-auto-focus vs click-to-expand) is resolved by **two orthogonal layers, with SCALE reserved for press exactly as gold is reserved for the crown:**

- **MACRO = SCROLL.** Owns reveal + recede only (opacity fade + drift; recede exited plates to ~30%). **Scroll never scales, blurs, or reorders.** "One reading in focus" is a pure opacity gradient. **Reading the whole page without ever pressing delivers the full arc** — the macro layer is complete on its own.
- **MICRO = PRESS.** The only thing that ever scales. Press a row → it scales to ~1.12, brightens to full cream, gains a 2px gold left-border *only while open*; other rows **dim in place** (they never move or hide — that's what makes "return" feel like returning to *something*); a detail panel unfolds beneath within its own footprint.
  - **Fix (gate):** use **opacity-only dimming**, not blur. Blur-others is a lightbox spectacle and a mobile-GPU cost — reverence is better served by quiet recession.
- **One reading open at a time** (opening another auto-collapses the first). **Four equal return paths**, all reversing the identical curve: same row, another row, Escape, empty stage. The trigger *is* the return — no floating modal X. Mobile is identical grammar (cap scale <1.12 so the column never overflows 375px).
- **Invert the layers (gate):** put the load-bearing synthesis (the resonance beats, the woven pivot sentence, the CONVERGE line) in the **always-visible macro layer**; reserve press for genuinely secondary depth (native glyph, provenance, full gloss). Don't hide the content that makes the page cohere behind an optional tap.

---

## 7. The crown payoff — subtractive

**Delete the three finale-exclusive *additions* the first draft carried** — the once-only glow-pulse, the 4–6° tilt, the bright `#e2c489` re-trigger. (Fable's core move; the gate independently demanded the same. They are additions by construction, and no easing can gamify a removal-turned-addition.)

Consecration becomes **exactly one subtraction:** the name's own **opacity (sealed → 100%) and tracking (wide → normal)** resolving on the same DOM node over the page's **slowest transition (~1200–1500ms)**, while the crown rests untouched at permanent `#c9a35c` throughout. Silence, slowness, subtraction are the three intensifiers that cannot be faked — the spec already owns silence (the Exhale) and slowness. A ~90-point opacity resolution is already the largest single visual change on the page; it needs no help.

Consequences to enforce:
- **The seal is intrinsic, never an overlay.** The sealed state *is* the name's own low opacity — never a blur layer or redaction bar over it. Then unveiling is literally the same text becoming legible (one class toggle; honest reduced-motion for free).
- **Legibility gates on scroll position, never on completion.** A reader who jumps to the finale sees the full crown. No "witnessed 11 of 11" flag — that would make the seal a *lock*, the exact padlock grammar the canon bans.
- **No tier explains the crown, and the crown explains nothing.** If any reading glosses the crown, the subtraction has nothing left to reveal — the finale arrives empty.
- **Do NOT upgrade the second crown.** The moment anything arrives at consecration that wasn't present at load — larger, brighter, glossier, a pulse, a tilt — the relic becomes a prize and every gram of restraint is refunded as build-up to a reward animation.

---

## 8. Symbolic coherence — 12 systems, one voice

The 12 readings are **converging evidence for a verdict already reached** (the crown), not 12 independent horoscopes sharing a palette. Each answers the *same* question — "who is this, and what are they called to?" — from a different angle. Honor each system's **native grammar** (don't flatten to equal icon-slots), but bind them:

- **Coherence engine:** a binary **CONFIRM / HOLD** resonance check on three fixed, correspondence-grounded pairs (Sun-element vs Year-animal-element; Life-Path-archetype vs Tarot-major-archetype; Rune-axis vs Trigram-line). This is what makes 12 systems cohere authentically rather than decoratively.
- **Fix (gate):** **decouple the arc from whether tension exists.** Name-assembly (the finale's job) is *always* present. The paradox/CONVERGE beat is an **optional accent**, fired only on genuine tension, degrading gracefully to a quiet resonance beat otherwise. Allow "no strong signal" — a false CONFIRM (manufactured harmony) is worse than a quiet one.
- **One archive-lexicon word** threads exactly three times (Origin line · one Structure line · closing seal) — the single consciously-trackable throughline, and part of the name the finale assembles.
- **Voice:** deadpan archival, third-person-of-the-artifact ("Reading filed. Twelve systems consulted. One name confirmed."). **Weave, don't list** — fold two systems into one clause, name concrete symbols ("Leo," not "your Sun sign"), one interpretive pivot per reading. Banned: *unlocked / earned / level-up / congratulations,* exclamation points, second-person flattery.
- **Fix (gate):** the reverent register **cannot** rest on free-generated copy. Constrain the generator (curated hand-authored fragments per symbol + fixed connective grammar), budget a real editorial gate, and make typography/space/pacing carry reverence **even when a sentence is only adequate** — so quality variance degrades gracefully, not catastrophically.

---

## 9. Palette · type · material

- **Luminosity = depth-plane membership, not brightness.** A stack of near-black planes separated by tiny luminance steps. Grey ladder (warm-neutral): `--room #0a0b0d` · `--plate ~#131315` · `--plate-hover ~#1a1a1a` · `--plate-line #232320`. No pure black, no pure white; cream `#ece7dc` is the text ceiling.
- **GOLD RATIONING (the hardest discipline — every sub-system flagged it independently).** `#c9a35c`/`#e2c489` appear ONLY on (a) the crown, permanently, and (b) whichever one reading is currently pressed, transiently. Every other gold impulse — dividers, rules, icons — is refused and rendered warm-grey.
  - **Fix (gate):** the current draft re-violated this — the 40vh orientation hairline and the running-head sigil are *both* gold, so a press yields three gold bearers. **The hairline is chrome → render it warm-grey.** The sigil is the crown's own permanent bearer; when a row is pressed it is what makes the total "two," so nothing else may ever carry gold.
- **Ember `#b25f39`** has ONE reserved role: the shadow/counsel/HOLD marker. **Fix (gate):** bind it to a *structurally guaranteed* element (the Tarot counsel reading, present for every user) so it appears exactly once regardless of resonance outcome — never a hover or generic secondary highlight.
- **Material:** the crown is the ONLY object-depth element (radial-gradient volume + warm — never black — drop-shadow + glow). The eleven readings are flat, *recessed* (inset shadow), never raised.
- **Type — five tiers; hierarchy carried by leading/tracking/color, NOT size** (leading is the rhythm engine; size stays flat until the crown alone spikes). **Fix (gate):** body prose is **Cormorant 400 minimum** (reserve 300 for the crown display only) and interpretive prose stays at **full cream, not 60% opacity** — Cormorant 300 at body size on near-black at 60% fails WCAG AA. Dim *labels,* never prose. Contrast-test on a real dark-mode phone before locking.

---

## 10. Why it isn't gamey (the subtractive test)

De-gamification is **subtractive discipline, not a skin.** The operational test for every element: *does it open a loop back into the product, or close the ceremony?*

1. **Absolute finality** (highest leverage). After the crown resolves, nothing invites return — no CTA, no "read another," no save/share/rate, no history, no "past crowns" gallery. The scrapped "View full verdict" button is deleted outright — **the crown IS the verdict.**
   - **Fix (gate):** distinguish *loop* (streaks, galleries — banned) from *preservation.* A person moved by the reading currently has no way to keep it. Allow a quiet, non-promoted permalink/seal to return to — or at least name no-save as a **deliberate sacrifice,** not a free win.
2. **Hierarchy, not inventory.** One dominant element + eleven subordinate entries revealed in sequence — never all twelve at once, never a grid/wheel/body-diagram of equal pins.
3. **Evidence, not score.** No numbers, no "%compatibility," no meters. Show evidence (CONFIRM/HOLD), let the reader supply the verdict. Disagreement is named and left unresolved — the artifact is read, the person is never rated.
4. **Seal, not lock.** Depth is opened by the reader's own press (something already complete), never a padlock implying withheld-for-payment. Anti-paywall is a hard constraint.
5. **Accent as currency.** Gold on two bearers, bright on two moments, ember on one role, one Artifact, one loop, one slow transition. No per-reading color-coding (fire=orange, water=blue is an RPG stat-type convention).

Overcorrection risk (sterile/cold) is held off by keeping exactly ONE interaction (press) and ONE ambient breath (the room) — reverent-warm, not dead.

---

## 11. Build spec — reuse the machinery you already have

- **REUSE `reveal/reading-panel.js` + `reveal.css` (`.rv-row` grammar) verbatim** as the atomic row: `.rv-row__rule` (scaleX 0→1 left→right draw, 480ms) + `.rv-row__label` (mono small-caps) + `.rv-row__val` (Cormorant), the `.is-writing` trigger with per-item `--i` stagger, the `motionOff()` reduced-motion helper, and the `tabindex=-1` headline-focus-on-settle pattern for panels. Extend with an at-rest teaser + a `.rv-row__detail` press panel. **Do not** reuse the two-column side-by-side reveal-stage layout — this is a single vertical column.
- **REUSE `reveal/card-frame.js`** (stacked layers in one grid cell, crossfade by opacity, zoom-not-width) for the **crown reliquary**, so SEALED and CONSECRATED are the same markup, opacity-swapped, zero layout shift.
- **REUSE the token ramp** (`--t-display/-primary/-body/-meta/-ghost`, `--ink-950`, the Cormorant/Inter/IBM-Plex-Mono role split, the weighted easing) from `DESIGN_TOKENS.md` + `reveal.css :root`.
- **ADD tokens** absent today: `--gold #c9a35c`, `--gold-bright #e2c489`, `--ember #b25f39` (the reveal system uses `--violet`; arcana needs gold as currency).
- **REUSE `app.js mountDev()`** to host the surface at `?dev=arcana-reading`, mirroring how `BRArcanaResult.mount(host)` is wired.
- **DELETE / REPLACE** `arcana-result.js` + `arcana-result.css` (the armor-figure hero, `.ar-card` body-slot pins, `.ar-conn` connectors, `.ar-ring`, `.ar-threshold`, `.ar-verdict` button, `.ar-foot` loop). **Salvage only** the 12 reading DATA (`CARDS[]` names/kickers) and the inline SVG glyph set `G{}` — repurpose the glyphs as the flat per-system detail-panel marks (zero drop-shadow), and re-slot the crown as the reliquary.

**DOM skeleton:** `.arc-floor` (fixed, room-breath + grain) · `.arc-reliquary` (crown, 3 states) · `.arc-sigil` (running-head) · `.arc-hairline` (warm-grey, 40vh) · `.arc-record` (5 `.arc-plate`s, each one `.arc-zonehead` + `.rv-row`s) · `.arc-seal` (closing mono line). One small `arc.observe.js` IntersectionObserver (threshold ~0.4) adds `.is-writing` on first entry, tracks a per-row `has-revealed` flag (never re-fires), recedes exited plates, and owns the Act-I time-gate.

---

## 12. Open questions to resolve before build

1. **Name-assembly generator.** The finale assembling the crown name from the lexicon word + CONFIRMED symbols is the make-or-break; it needs a concrete algorithm + curated fragment bank, not designer intuition.
2. **Copy generator surface.** Curated fragments + fixed grammar + an editorial gate — proven on ~20 real 12-reading combinations for stiffness before it ships.
3. **Finale depth.** Move from ~62% to **~85–90%** so the denouement is a coda, not a 38% post-climax scroll tax. Keep the longest gap *before* the finale.
4. **Sealed-vs-consecrated art direction.** The opacity/tracking delta between the two crown states must be unmistakable (never read as duplicate content or a slow-loading field) — a real render pass, not just spec.
5. **Mobile long-gap reassurance.** Gaps as `vh` fractions (not fixed px) + a stronger "content is coming" cue than one hairline (e.g., the next zone-header ghosting in). Real-device test.
6. **Contrast + small-caps.** Cormorant Body ≥400 on `#0a0b0d` against WCAG AA; verify true small-caps via `font-feature-settings` across browsers.
7. **Preservation stance.** Decide the permalink/keep question (§10 fix 1) deliberately.
8. **Ember guarantee & the scroll-scale contradiction.** Bind ember to the Tarot counsel row; strike the stray `1.02` scroll-scale from the IA sub-system (scroll owns opacity + drift only).
