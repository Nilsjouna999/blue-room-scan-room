# THE TURNING WORLD — THE ANSWER SHEET

**Status:** produced 2026-08-12 by a 23-agent fleet against
`docs/TURNING_WORLD_QUESTIONS_V1.md`. Ten answer sets, each attacked by a separate
adversarial agent; concept and visual were answered twice independently and merged;
the final sheet was written by Fable.

**It found two live defects nobody asked about** — the FNV float-multiply skewing
every birth reading (72% Heaven) and the Concord localStorage key carrying two
people's names and birth dates in plaintext. Both are fixed in BR-S373. Read §7 for
what else the 85 questions failed to ask.

Nothing else in this document is built. It is the sheet the builder decides from.

---

# THE ANSWER SHEET — THE TURNING WORLD

*Synthesis of 85 questions, six answer sets, six adversarial critiques, and the settled CONCEPT/VISUAL merges. Where a critique overturned an answer, the corrected position appears here. Settled concept/visual merges are law and override earlier section answers where they conflict (noted inline).*

---

## 1. THE TEN DECISIONS THAT MATTER

**1. Fix `hash()` upstream before anything else exists.** `arcana-reading.js:28`'s float multiply (`h*16777619`) destroys the low bits past 2^53; under real JS double semantics the live terrain distribution is **~58% Heaven, top three terrains 96.6%, Water/Fire under 0.5%**, rune and hexagram equally skewed, and rune↔trigram are correlated (45 of 192 pairs occur). Salting does not fix it — FNV-1a's low bits are structurally weak; the fix is `Math.imul` **plus a 32-bit avalanche finalizer**, landed in `arcana-build/` (the file is generated — never hand-edit), regenerated, and shipped **before** `br_world` stores any marks and before any terrain is drawn. It is a migration: every existing reading's rune/trigram/hex changes, so it must precede permanence, not follow it. Land the lunar-new-year animal fix (~9.6% of visitors have the wrong creature today; 1.5KB table, 1920–2040) in the same session, for the same reason: the world turns a text error into a monument. *Unblocks: everything. Skipping it means drawing eight terrains for a distribution about to change.*

**2. Build the store — the world has no data source.** Verified: `arcana-profile.js` makes zero localStorage calls; `arcane.js` throws the seed away. One key, **`br_world`**, versioned envelope, **seeds not renders** (~60 bytes/reading), `id = "r_" + hash(seed).toString(16)` so re-opening a `?seed=` URL dedupes and rebuilds identically. Read-modify-write immediately before every write plus a `storage` listener — never write from a mount-time copy. Fail open to the sky-only world. **Absorb `br_concord~*`**, whose keys today carry two real people's names and birth dates in plaintext — a live privacy defect in the shipping product; opaque hashed ids in keys, display names only in values. *Unblocks: H2, H4, H8, defects #2/#12/#27, and it re-truths the settings ledger copy.*

**3. Rings are unidentified presences.** Terrain + creature + sky beside a first name reconstructs a third party's DOB to within a month, and viewer-side aggregation is marked BLOCKING in `TASK_QUEUE.md:1624`. A ring contributes **a light or dwelling with no name, no relation word, and no date-narrowing mark anywhere in world or DOM**. Their marks stay on the shelf. Removal: one click, deletes the ring record and nothing else (never a paid Concord). Named rings wait for the dedicated social spec. *This overrides the brief's own "your mother's Horse on her own terrain" — that version does not ship without the spec.*

**4. Freeze `ground_seed` at the first reading.** The land/stone/weather hash a **typed name string** ("José" ≠ "Jose"), so a naive float lets terrain be shopped by retyping and a naive freeze punishes marriage and transition. The rule: the intake has no path to the ground, ever; from the **filed record only**, a date correction **replaces** (old reading files below the line) and a name change **re-strikes** (both worlds are yours). One field now, unrecoverable later. *The one irreversible schema decision.*

**5. You rotate with the world (V2).** Your longitude is pinned at frame centre: terrain, stone, creature, lights, monuments are in frame **100% of the time** — occupancy is defined away (the 23.5%-visible arithmetic that killed the naive version). What turns is the sky and the light. **Placement is killed** (C5): arrangement was the only non-re-derivable state and a dominion claim over people; ordering is impersonal (birth date). *Dissolves X2's trilemma, H3's duty-cycle collapse, and S4 entirely.*

**6. The crown stays a control at the threshold; nothing above the horizon is ever clickable.** It stands as the near field at the line, occluding world behind it (never seated in rotating ground — a static object on a moving floor moonwalks; and in the empty state it occludes sky, so it works for the majority visitor). Size cut to `clamp(128px, 17vw, 168px)`; re-crop first (44% of its box is transparent). The `pfBreath` 12s pool dies the day the world lands or L4 breaks in the most visible object on the page. **The builder must write the supersession of `TASK_QUEUE.md:1609`** ("Idle Room→Kingdom… never a lead build") — §11 requires the relaxation be named where it is made.

**7. The motion is one CSS declaration, zero runtime JS.** `animation: turn 86400s linear infinite; animation-delay: -<seconds since local midnight>s` — compositor-timed, correct phase at frame 1, background-tab-safe with **no** visibilitychange handler, no interval (the proposed 60s-transition interval visibly spins 90° after a backgrounded lunch — deleted, not patched). The **sky group runs at sidereal 86164s from epoch**, so it beats against the solar light with a ~year period and no habitual visitor ever sees the same 15:00 twice — the L4 hole the pure local-hour clock leaves open. Light sweep from local hour only. Animate **HTML wrapper elements, not SVG `<g>`** (SVG children don't get compositor layers). Reduced motion (media query **plus** `html[data-motion="reduced"]`, minus `"full"` — `BRMotion` is the site's real authority): read clock once at load, `animation: none`, static transform — provably the same world at the visitor's own hour.

**8. The curve is decided by a print, not prose.** Mechanism settled: angle constant across widths (frame-relative), tiles authored on a straight baseline with curvature as a parameter. Number open between the concept merge's 3° and the visual merge's 6°: ship `?arc=` in the unshipped harness, print stills at **3/6/9° at 1440 and 375, at two hours (lit and dark)**, judging the *speed of the sky layer* with the curve, because they travel together. Band height capped so sagitta = 8–10% of band (`clamp(180px, 30svh, 235px)` — the 30svh ceiling reconciled down to V1's 235px cap).

**9. The free world is the product, and it is: one drawn horizon hairline (`--pf-line`), the real almanac sky on the real date, one crosser.** Nothing is persisted from the free Pull (re-rollable slot machine, unrecoverable, contradicts "Drawn once. Not reissued.") — a pull leaves a session-only crosser, gone on reload. Land is the paid mark; the free state never shows generic land. Build and judge the empty state **first** (kill test, below), because it is the state of 100% of visitors who have not paid $4.99.

**10. The build starts at the page, not the world.** `build_public.py` + `gate_public.py` **already exist and are committed** (BR-S355/356/365) — the stale memory says otherwise; the consequence is the world lands on a **live public front door from its first commit**. Order: hash fix → store → the five load-bearing §9 defects (own commits) → spacing scale → **a sheet of drawings, no more specs** → the still world → the clock → rings → monuments only when the Mint exists. The world fixes none of the 27 defects; 22 of them are explicitly not a gate.

---

## 2. WHAT IS SETTLED

### Concept (C1–C15) — settled merge, law
- **C1** World is subject and ground; crown is a control at the threshold; nothing above the horizon clickable (L1 = a selector test). Supersession of TASK_QUEUE:1609 owed in writing.
- **C2** Moving toward nothing — keeping time; 24h is the only imperceptible-loop period; phase from local midnight; budget exactly one crosser besides the turn.
- **C3** Yours as a birthplace is yours; only the birth half re-strikes; you may remove guests, never place them.
- **C4** Empty world = horizon hairline + almanac sky + one crosser; the Pull leaves a moment, never a structure.
- **C5** Placement killed; impersonal ordering; named nothing in copy; internally ABOVE GROUND, never "kingdom."
- **C6** "Kingdom" is taken twice — retired; neighbour is the Desk; ladder Room→window→above ground→threshold→shelf→vault; fix §9 #1 and #23 before the world's name is written anywhere.
- **C7** Ring = anonymous presence; no share surface, structurally; deletion removes the ring record only.
- **C8** Stature is never a variable; equal ink/height/feature-count; value = inhabitation; 40×40 bitmap harness (±10% of eight-terrain mean) exists before the first terrain is drawn.
- **C9** Grammar not grandeur; one exclusive motif per terrain; every terrain distinct at every hour; blind-ID test + 28-pair "is one better off?" — "can't tell" ≥80%, no terrain last in >3 of 7 pairings.
- **C10** Permanent: sky/creature/lights (date) + land/stone (frozen seed). Accumulating: rings, monuments. Turning: hour + weather = f(hexagram, local date). Deleted: arrangement.
- **C11** Ground frozen at first reading; date-correction replaces, name-change re-strikes, filed-record only; birthplace is collected and unused — a live future vector.
- **C12** Profile only, ≥3 versions; `world.js` + `world.css`, `mount(marks, secondsSinceLocalMidnight)`, zero localStorage inside; scrub lives in an unshipped harness.
- **C13** Minimum viable = hour-lit ground **with the drift on** (a still sat with for 60s is waiting); CSS-animation form; tiles on straight baselines, curve a parameter.
- **C14** Survives product pivots — crown is a sibling of the marks; Mint-first is the one break (fallback: plinth + mint-date sky, stated not planned); first job: prove sky + horizon + crosser reads as a place with no land at all.
- **C15** Nothing new in the avatar corner; future seal (own crown/trigram glyph) only when accounts are real.

### Visual (V1–V10) — settled merge, law
- **V1** 6° leading, print test 3/6/9 decides; sagitta 1.309%W at 6°; frame-relative always; band pinned by sag = 8–10% of band height; CSS 86400s animation — never a per-minute jump.
- **V2** No limb, ever; horizon runs off both frame edges; you rotate with the world; marks are generators of a continuous world — 2–4 discrete elements in frame at all times.
- **V3** Mass far, contour near — the split *is* depth; constant ~1.4 device-px stroke authored per size class; no `vector-effect`; the world is decorative (WCAG-exempt) therefore **may never carry information, state, count, or affordance**; `forced-colors: display:none` in the first commit.
- **V4** Discriminate by topology; trigram lines are a generator, not a proof of discriminability; Water = open doubled horizon, Lake = the set's only closed shape; creatures at rest, facing left, true relative scale, filled-silhouette 40px gate; terrains are grammars with period/amplitude/seam, tested as line-versions on the real ground at CR 1.85, alone-naming first; first six drawings: Dog, Tiger, Rat, Rabbit, Water, Lake.
- **V5** The local ground is **#13100a**, not #0a0b0d — all contrast computed there; one cool hue `#8a9099` at five alphas (table in §5); lights cream `#dcd6c9`, never gold; 3:1 ceiling behind the column tested on **composited pixels**, 1.27 floor; hue A/B (cool vs warm ghost) still owed.
- **V6** Four planes (SKY/FAR/MID/NEAR), no blur ever; free-visitor solo sky promoted to .30; weight constant, content attenuates with distance; parallax authored as two angular rates.
- **V7** One drawing + exposure multiplier; night contour floors at .28; lights come ON at night (night holds more information); no terminator; the world's clock is 06:00/18:00 flat; L7 reads the clock once and freezes.
- **V8** No disc, no moon, nothing in the sky is an object; light centre x = (hour/24)·2.4 − 0.7, never fully unlit; the crown never lights the world + 20px keep-out; content enters right, light sweeps against the drift.
- **V9** Two static masks: DETAIL keyed to frame edges, VALUE keyed to the live column; the horizon contour survives to both frame edges at full value; nothing reaches zero; margins may run to CR ≈3.5.
- **V10** Flat vector, no hatching, no second grain; world sits **above** the page grain; one static noise tile on the sky layer, outside the rotating group, at shipped ~0.45 amplitude.

### Design (D1–D10) — answers as amended by critique
- **D1** Horizon ≠ threshold (a labelled rule cannot be a curve); band splits ~61% sky / 39% near ground; the intervening clamps (`.pf-wrap` padding, `.pf-surface` margin+padding) must be explicitly zeroed and #19 fixed via padding, or the y-numbers are fiction; the world is a **sibling of `.pf-wrap`** (overflow-x + 620px make full-bleed-inside impossible) — decide the overlap mechanism now.
- **D2** Superseded: crown = near field at the threshold, occluding, never seated in the rotating ground; size cut kept.
- **D3** Change of ground, nothing drawn; masks per V9 (fixed/column-keyed, not percentages — 12% eats the world under the column at 375); the horizon is a tonal boundary, not a stroke.
- **D4** The spine line, **ungated** — it renders for everyone, prints whatever is held in world order (1 to 5+ marks), and must gain trigram + rune (the profile currently never shows the two marks the largest world elements derive from). No labels, tooltips, headings, or tours, ever.
- **D5** Visible from the first pixel; no reveal, no entrance; transform computed inside the `render()` string (page mounts via `mountDev`, so first paint = first mount paint).
- **D6** The sky has no top and runs to y=0 — but painted **on the world block** (the `.pf` radial is viewport-fixed and cannot scroll with it), and the masthead's `backdrop-filter: blur(2px)` comes off (a continuously drifting sky under a backdrop blur is a full-width blur pass per frame).
- **D7** The world appears strictly once; nothing of it below the line.
- **D8** Constant angle at every width; parts keep their pixel size, the population thins (slots 5 / 3 / 2); check the 375px sagitta on a real device.
- **D9** Superseded by C15: nothing new ships in the corner. The one-door fix (wordmark + "← Main Menu") stands on its own. When accounts land: reuse `.pf-id`'s paint, never its ARIA (#14/#15), live rows only.
- **D10** Reduced motion is the same page with the number frozen; every moving thing is a pure function of time; sky driven from **epoch at sidereal period** (fixes the daily-return L4 hole), light from local hour; judge at 03/09/15/21.

### System (S1–S10)
- **S1** One key `br_world`, seeds not renders, versioned; RMW before every write + `storage` listener; fail open; absorbs `br_concord~*` (there are five flags today plus that unbounded key family, not three).
- **S2** Readings array + `self` pointer; ring = reading with `for:"other"`; **`id` derived from seed** via the fixed hash; `marks` a cache re-derived on `v` bump; gems = `readings.length` (not marks); `arrange` deleted per C5; `hidden` kept.
- **S3** World = pure total `draw(marks, hour)`; nothing rendered is ever persisted.
- **S4** Loss degrades gracefully; `?seed=`/`?read=` URLs re-file by derived id; deterministic default placement; never an account pitch. Owed: one shipped way the visitor keeps their link.
- **S5** No cap, no message; ~12 rings is the comfortable figure but the 24° floor gets measured on the contact sheet, not asserted; **no DOM windowing** until the node budget forces it, and then cull by opacity, never timed removal (an arriving node is an L2 event).
- **S6** ≤180 nodes (cap kept, false 427-provenance dropped), ≤3 animated groups, ≤38KB/~11KB gz, zero filter/blend/backdrop/raster; runtime = CSS animation with negative delay — **no interval, no visibilitychange machinery**; honour `BRMotion` three-state; two new script requests on every route is the honest cost — accept or inline.
- **S7** Two seeds: placement = hash(id), detail = hash(seed+feature); never the clock; **only after the upstream hash fix** — the ordering constraint is absolute (fix → store → world).
- **S8** Three gates (mark-not-act; closed unchosen set; whole-set 40px legibility) + never named/counted/hovered. Pulls never file into the world (state it in the data floor). Mints stay in the ontology per C10 but are built only when the Mint exists. Concord = one holding, two creatures — it must pass discrimination (generated from both parties' marks) or it files on the shelf. The world is **finished** once marks + rings + monuments are drawn; every future product defaults to SHELF.
- **S9** `?hour=` not `?t=` (double collision); the tuning-param regex gates **authored links only** — the real lock is the unshipped harness file and/or `?devnav`; fixtures are seeds using only the two allow-listed names; mechanical contact-sheet diff (≥12% pixel pair difference); still-first eight screenshots; **the composite-luminance harness over 24h is the only version of L5 that can fail a build** — keep exactly as written.
- **S10** `world.js` + `world.css` on `COPY_FILES` + `index.html` tags in the ship step; **no raster** (the assets copier is pattern-based — the one file type that ships unnamed); **no fetch, ever** (`<base href="../">` injection makes this a hard rule); prototypes onto `PROTOTYPE_FILES`.

### Spacing (P1–P10)
- **P1** Kill the 620/760 double declaration now (one declaration, 620). Widening waits on the cabin: column = 651 + 2×frame-padding if the 3-slot grid is wanted; switch the Showcase to `auto-fit` so the default one-invite state stops degrading; real 4-mini threshold is 675 (vaultbox padding).
- **P2** World band `clamp(180px, 30svh, 235px)`; affordable only with the crown at the threshold; `pfBreath` dies; real hero baseline ~600px at 900-tall (not 765).
- **P3** One owner: **padding** (uncollapsible) on `.pf-shelfline`, symmetric `clamp(48px, 8vh, 80px)`; selector `.pf-shelfline + .pf-sec` (`:first-of-type` matches nothing); adjacent margins zeroed.
- **P4** `clamp(…, 30svh, …)` — svh because `vh` overstates the first-paint viewport by the browser chrome (the "resizes while you scroll" claim was false); floor lowered (~140px) below 600px-tall viewports or the floor inverts the share.
- **P5** One section token `clamp(32px, 5.5vh, 48px)`; rows unified at 12; fix `.pf-lede:last-child`; the `.dr-*` half of the file is explicitly out of scope — say so in the commit.
- **P6** Nothing below the line changes **because of** the world; the band is a plain in-flow full-bleed block; any side-margin world is a separate fixed layer — the rollback is two removals; P3 commits before the world.
- **P7** The eye lands on the crowned name **by isolation** (BREATH above, threshold air below, empty right measure) — but only after the lamp moves: re-anchor `.pf-wrap::before` to the identity band and onto a full-width layer, or the column-clipped gradient becomes a vertical warm seam the moment the margins are lit.
- **P8** Margins symmetric; drawn content asymmetric; side world gated `@media (min-width: 1100px)` (210px minimum); the masthead sits inside the margins and owes a contrast floor (world ≤ L\*30 behind it keeps the 10px mono at 4.75:1).
- **P9** Budget holds at 1440×900 (88.2%); **fails at real iPhone-SE viewport (590 > 553)** — a named exclusion, not a footnote; the empty branch gets its own budget as the primary page; contingent on decision 6.
- **P10** The Threshold Scale: rungs 4/8/12/16/24/32/48/64/96 + exactly three fluid steps (section `32–48/5.5vh`, half `48–80/8vh`, world clamp); every value a rung or rung−border; keep `.pf-cards`'s 2px inset; do not blanket-zero the nudges; the 14px→16/12 migration (14 sites) is the big one — migrate per-site with eyes open.

### Process (R1–R10)
- **R1** `_tw-probe.html` (untracked) mounts the real shipped renderer + one sibling SVG: still, one terrain, lights, one hour; creature deliberately absent; note aloud: the probe cannot test L2/L8.
- **R2** Judge the 24-frame contact sheet (dignity + night) plus a fine sheet across one hour boundary; the scrub hunts frames, never feels rotation; phase from epoch, offset captured once; three gate layers.
- **R3** Three attempts, one variable; round 1 = curve at 0°/candidate/3×, **at two hours**; the arc knob is a JS path recompute, not a CSS var — half a day, schedule it.
- **R4** Fixtures are **seeds run through the real engine at render time** — both attempts hand-listed marks and both were wrong; only "The Seeker"/"The Companion" names; target-terrain search recorded (failures are the finding); the empty fixture is promoted to first-class.
- **R5** Still-first because the still carries nearly all the judgement — plus one ten-minute sit on the running world (drift = weather or slow bug?); the still and the running world are *not* the same image.
- **R6** A measured gate before the eye (composite contrast × 24h, node/filter/layer budget, hidden-tab silence), then the builder alone judges rest/dignity; add the cold 20-second viewer ("what is this page for?" — naming the world first fails C1); the §7 six remain separate tests.
- **R7** Kill-1 = the empty world, rendered **first**, A/B against today's page in random order, verdict criteria written before the render exists; the refusal list stands; kill-2's real finding is "the last-ranked terrain is the one most visitors get" until the hash fix lands.
- **R8** Real content, mocked marks; the adapter is the **only** caller of the engine, in a file the world never imports.
- **R9** Order stands with corrections: making the profile read storage is *work*, not a fact; the silhouette sheet is the largest unowned cost — name the owner; §9 fixes ride alongside in their own commits, never the world's.
- **R10** Own files + one guarded mount line; tag `baseline-vN` (playbook convention); world = one commit → `git revert`; `--tw-night` partial rollback for the 3am case; COPY_FILES additions belong in the ship step; fastest pull is a default-off flag.

### Blindspots (X1–X10)
- **X1** No faces, no mid-stride, 15% band-height cap; the centre-third rule is replaced by a **dwell rule** (no figure is the brightest/largest thing at any of the 24 hours); cold test is the open question, not a forced choice.
- **X2** The trilemma is dissolved: drawn arc, drift rate, and circumference are independent knobs, and V2 removes the duty-cycle problem entirely; arc from the print test.
- **X3** L5's luminance gate corrected: **area-weighted band mean ≤ L\*20, point lights permitted to L\*55 at ≤0.05% of band area** (a light dimmer than the dimmest text is not a light); territory and zero-below-the-line gates stand.
- **X4** Confirmed: no data source (and `br_reduced_motion` was the missed fifth key → L7 has two switches). Free state per C4 — unlit land gives the purchase away; the empty world is built first.
- **X5** The "uniform 12.5%" measurement was wrong (exact-integer emulation of a double-arithmetic engine) — superseded by the hash finding. Fairness = C8's harness + a content checklist per terrain (one horizon-breaking form, one human-hand form, one light-catcher). The 8-trigram Codex wall already ships — the comparison surface exists today.
- **X6** The 0-of-154 base rate was false (art ships inline; 379 `<path>` elements) — the real lesson: **the next world artefact is a sheet of drawings or nothing; no more specs.** The marks-brief §0 anti-pictorial law collides head-on with a Mountain that looks like a mountain — builder ruling required before a line is drawn.
- **X7** Lunar-new-year bug verified; a migration, shipped before the world; rotation clocks per decision 7; `filedDate()` is moot.
- **X8** Do not freeze the world — the CSS-animation form is cheaper than the interval *and* keeps L2/L8; the one real check: screenshot-diff a test layer at 1s on a real phone for sub-pixel snap ticks (0.0042°/s may render as a 1px tick every few seconds — worse than either option).
- **X9** Superseded by C15. The existing chip stays the page's only identity object.
- **X10** The COPY_FILES tripwire gates nothing (the world can live inside already-shipped files); replace with the cadence rule — **no world session lands without a profile defect closed in the same session** — plus an enforceable gate check; `br_holdings` is read by `hasHoldings()` and settings, making step 1 cheaper than claimed.

### Highest leverage (H1–H10)
- **H1** Split: H1a probe (an afternoon, eight flat profiles, stranger sort) goes first; H1b sixth. Terrains **generated** — the real reason: the ground must extend seamlessly beyond the frame and vary per detail-seed, and you seed a band, you don't hand-draw one. Creatures hand-authored path strings. Creature px size constant across breakpoints; population thins.
- **H2** Diagnosis stands (launch blocker #2 wearing a hat) — but the free sky is the **almanac sky**, not persisted pulls (C4 overrides the last-7-draws proposal); the store is `br_world`; the Concord key-privacy call is made here.
- **H3** Superseded by V1 + V2: curve by print; no parade, no stations, no duty-cycle problem.
- **H4** Rings last; anonymous per C7; permanence is a property of your own marks — guests may leave; the store holds opaque ids and no arrangement.
- **H5** Clock settled; CSS form; the resync handler solves a problem the mechanism doesn't have — cut; animate HTML wrappers; no single promoted band over 2× viewport.
- **H6** Folded into S8 (the discrimination clause is the addition that matters); Codex → shelf; Concord back through discrimination; Games/payment/referral never.
- **H7** Build reduced-motion first; four stills × two seeds; the allow-list cannot strip in-file code — the scrub lives in its own never-copied file.
- **H8** Four fixtures (none/sky/land/household) on the existing `?holdings=` machinery; two pre-stated kill criteria; `none` designed first and reviewed hardest.
- **H9** Superseded by P10 (the verified inventory); the 14px point is absorbed as "migrate per-site."
- **H10** Step 0 is already done (gate + build committed); order starts at the hash fix; "the world fixes none of the 27 defects, five ride along, 22 are not a gate" stands as written.

---

## 3. WHAT NEEDS THE BUILDER

1. **The arc number (3° vs 6° vs 9°).** Concept merge pinned 3° (drift 2.2px/s survives as passenger motion; mobile sagitta dies), visual merge pinned 6° (≈ the real airliner horizon; 1.0px/s). Mechanism settled either way. *Settled by:* the `?arc=` print test, 1440 + 375, lit + dark. Twenty minutes. **Recommendation: 6°**, because it is the Earth from a plane and the sag survives at 375 (4.9px).
2. **The hue.** Cool `#8a9099` vs warm `--pf-ghost` at matched luminance. *Settled by:* two renders, read a shelf paragraph in each. **Recommendation: cool** — the passenger feeling stated in colour — but warm is a one-token change if it doesn't fight.
3. **The TASK_QUEUE:1609 supersession.** The builder ruled against exactly this object ("videogame tone is a brand RISK… never a lead build"). He has since chosen it, but §11 requires the relaxation written where the caution lives. One paragraph. **Nothing ships before it exists.**
4. **The marks-brief §0 collision.** "A mark that looks like its meaning has already failed" vs a Mountain that must look like a mountain. *Recommendation:* rule that the world is a separate art track (distance, not classification) sharing only the stroke contract — but it must be the builder's ruling, in writing.
5. **The cabin.** Does the column get an opaque background, and at what padding? P1's width formula and P8's side world both wait on it. *Recommendation:* yes, minimal (16px), because a full-bleed world behind a transparent column fails V9's value mask by definition.
6. **Kill-1's verdict, pre-committed.** The empty-world A/B criteria must be written by the builder **before** the render exists, or the idea is unfalsifiable and gets budgeted as art.
7. **Who draws.** The silhouette sheet is the largest cost line in the plan and has no owner and no tool named. A schedule that lists an unowned item first is not a schedule.
8. **The V2 seam.** "Your longitude is pinned" and "a neighbour's dwelling drifts in over hours" cannot both be literally true. *Recommendation:* fixed window; the hour-light's sweep reveals and conceals the neighbours' quarter (no new motion, no new cost). One sentence from the builder closes it.
9. **The car test.** Rest-vs-waiting cannot be verified in the preview pane (rAF frozen) or by any harness. Real browser, real phone, builder's eye, sixty seconds. Standing appointment, not a checkbox.
10. **Monuments.** C10 keeps them; S8's critique cuts them (the Mint doesn't exist; gate 2 strains). *Recommendation:* keep in the ontology, build nothing until the Mint ships — which defers the gate-2 argument to a day it can be tested against a real product.

---

## 4. THE SILHOUETTE SHEET

**Terrain rules (all eight):** derived from the trigram's three lines read bottom→top as BASE/MID/CREST (solid = continuous mass in that register, broken = split/open) — a generator, not a proof. Equal ink: 9–12 strokes, same bounding box, same max height; ±10% set-pixel count on the 40×40 harness; one exclusive motif each; value lives only in what stands on the land; drawn as **profile grammars** (period, amplitude, texture rule, seam-free join) spanning ~3 frame-widths on a straight baseline, curved by parameter. Gate: line version at ship size on #13100a at CR 1.85, 1× and 3× DPR, alone-naming first, then eight-to-eight matching.

- **HEAVEN** (☰ three solid) — dead-level unbroken horizon, featureless ground; the drawing is entirely in the sky: layered strata. *40px tell: the only flat line with a banded sky.*
- **EARTH** (☷ three broken) — worked plain: parallel furrows raking to one low boundary wall and a threshold stone; the only terrain where things grow. *Tell: repeated parallels meeting one perpendicular.* Furrows read at low sun; growth reads at high.
- **THUNDER** (☳ solid base) — one riven split: a single cleft breaking the ground line itself, raw faces, split stone. *Tell: the only discontinuity in the horizon.*
- **WATER** (☵ solid mid) — two wavering parallel horizons with a lighter running band between, **open at both frame edges** — a channel cutting through. *Tell: doubled horizon, open-ended.*
- **MOUNTAIN** (☶ solid crest) — one peaked ridge, dominant summit off-centre, straight flanks. *Tell: the only acute apex above the set's mean height.*
- **WIND/WOOD** (☴ solid mid+crest) — a stand of trees all leaning one way: a forest, not a gust; near-parallel trunks, canopies streamed toward the exit edge. *Tell: the only repeated verticals, all inclined the same.*
- **FIRE** (☲ solid base+crest) — a low burn line along spare, cleared ground; interior rim lit from within after dark, banked and smoked at noon. *Tell: interior brightness line, minimal silhouette; the terrain that inverts at night.*
- **LAKE** (☱ broken crest) — the set's **only closed shape**: a held level lying below the horizon, land rising on both sides, one reflected inner edge. *Tell: closed vs Water's open, judged at frame centre.*

**Creature rules (all twelve):** profile, facing left, at rest — never mid-stride; no eye, no mouth, no three-quarter pose; filled silhouette is the gate, at true relative scale (tallest = 40px); ground contact mandatory including Dragon; identity attempted only on MID/NEAR — at FAR a creature is mass, nothing more. Height band in px:

| | px | The one fact that separates it at 40px |
|---|---|---|
| **Dragon** | 40 | the only body that leaves the ground — serpentine double arch, two ground contacts (foreclaw, tail), horned head lowered to rest; no wings; never exceeds the box |
| **Horse** | 38 | the tall standing quadruped — straight vertical legs, high shoulder, head **dropped to the grazing line**; tail falls straight |
| **Ox** | 30 | the heaviest single mass; no visible neck; head below the shoulder line; horns one low forward arc |
| **Goat** | 26 | standing, back sloping to the tail; horns curve **down and back**; chin tuft |
| **Tiger** | 24 | long-low, level back; tail long, held in a raised low S, **clear of the ground** |
| **Dog** | 22 | seated — vertical foreleg, haunch curve, muzzle horizontal; tail **flat along the ground** |
| **Rooster** | 22 | the only bird; single body mass, tail plumes falling behind and down, never above the crest cap; one leg line |
| **Monkey** | 20 | on haunches, forelimbs to ground; tail rises in an **up-curl** — the only upward tail |
| **Pig** | 18 | low single-arc round mass; **straight** brush tail (the only straight one); one blunt snout notch |
| **Rabbit** | 16 | seated haunch triangle; **ears the tallest feature**, over half body height; tail a dot |
| **Rat** | 14 | lowest and longest-tailed; tail longer than the body, laid in one **ground-dragging** curve; nose to ground |
| **Snake** | 10 | the only legless mark; flat stack of three coils, head resting on the top coil |

The four long-low quadrupeds (Dog, Tiger, Rat, Rabbit) separate entirely on **tail topology** — flat / raised-S / dragging-long / dot. They are the hard cases and, with Water and Lake, they are **H1's real gate**: one colour, ship size, CR 1.85, side by side, forced-choice naming, cold. One page of drawings; if it fails, the concept fails there, cheaply.

---

## 5. THE NUMBERS

**Geometry & motion**
- Arc: **6°** leading (R = 9.5537W, sagitta 1.309%W → 18.9px @1440, 4.9px @375); print test 3/6/9. Frame-relative always.
- Band: `clamp(180px, 30svh, 235px)`; sagitta = 8–10% of band; horizon apex at ~61% of band; sides gated ≥1100px.
- Periods: ground/light **86400s** (local midnight phase); sky **86164s sidereal** (epoch phase); one CSS animation each, negative delay, no JS after mount. Sky drift ~1.0px/s @1440 at 6°.
- Light: centre x = (hour/24)·2.4 − 0.7; sweeps left→right against content entering right; world clock 06:00/18:00 flat; no terminator.

**Colour (all vs local ground #13100a)** — one hue `#8a9099`: SKY .10 (1.13) / solo-sky .30 (1.57) / FAR .18 (1.27) / MID mass .24 (1.42) / MID contour .38 (**1.85** — the horizon) / NEAR .45 (2.14) / worst composite 2.78 / margins ≤.70 (3.48). Ceiling **3:1 behind the column, on composited pixels**; floor 1.27; horizon ≥1.35 at every hour, night floor .28; night ground ≈#0d0b08, ≥1.35 between adjacent planes. Lights cream `#dcd6c9` .30–.34 (2.19–2.48), on at night only. Band mean ≤ L\*20 area-weighted; point lights ≤ L\*55 at ≤0.05% area. Masthead: world ≤ L\*30 behind the scrim keeps 10px mono at 4.75:1.

**Stroke:** constant ~1.4 device px, authored per class (≈0.6 units @96px, 1.2 @40px); no `vector-effect`; FAR strokes below the horizon are forbidden (1.12:1 vs MID mass — invisible).

**Budget (L6, finally numbered):** ≤180 SVG nodes (~120 typical); ≤3 animated groups, HTML wrappers, no promoted layer >2× viewport; 2–4 discrete elements in frame; zero blur/blend/backdrop-filter/raster/fetch; ≤38KB uncompressed (~11KB gz); zero JS after mount; `forced-colors: display:none`.

**Spacing:** rungs **4/8/12/16/24/32/48/64/96** + three fluid steps: section `clamp(32px,5.5vh,48px)`, half `clamp(48px,8vh,80px)` (threshold padding, symmetric, on `.pf-shelfline` itself), world clamp above. Every value a rung or rung−1px-border.

**Measure:** one declaration, 620 now; widen only to `651 + 2×cabin-pad` (Showcase 3-up) after the cabin decision; 4-mini threshold 675; lede capped at 60ch = 65 chars regardless.

**First viewport @1440×900:** masthead 54 + world 235–270 + breath 64 + identity 132 + air 72 + line 12 + air 72 + first row 118 ≈ **760–795px (≤88%)** — line and first shelf row visible unscrolled. Known exclusion: real iPhone-SE viewport (553px) does not fit; the empty branch gets its own budget as the primary page.

**Data:** `br_world` one key; ~60B/reading; refuse writes >32KB; `id = "r_"+hash(seed).toString(16)`; hash = FNV-1a with `Math.imul` + avalanche (`h^=h>>>16; h=imul(h,2246822507); h^=h>>>13; h=imul(h,3266489909); h^=h>>>16`). LNY table 1920–2040 ≈1.5KB.

**Crown:** `clamp(128px,17vw,168px)`; re-crop (44% of box empty); 20px keep-out; `pfBreath` retired.

---

## 6. THE BUILD ORDER

The page is live, public, and a front door. Every step is its own commit; never `git add -A`; tag `baseline-vN` before step 6.

0. **Already done — do not re-plan it:** `build_public.py` + `gate_public.py` are committed (BR-S355/356/365); `profile` is in `PUBLIC_ROOMS`. Consequence, stated as a constraint: the world is public from its first commit.
1. **The hash fix**, upstream in `arcana-build/` (both generators + check `arcana-name-engine.js`), with the avalanche finalizer, plus the **lunar-new-year table**, regenerated and shipped. A migration — every reading's rune/trigram/hex changes, ~10% of animals change — which is exactly why it precedes any stored mark and any drawn terrain.
2. **`br_world`** (decision 2), profile reads it, the empty branch renders (the `?holdings=` machinery already exists to copy), the visitor gets a kept copy of their `?seed=` link. Concord absorption + key-privacy fix here.
3. **The five load-bearing §9 fixes, own commits:** #1 (Shelf names three things), #23 (`pf-vault*` prefix — both before the world is named anywhere, per C6), #10 (sub-AA `#7c766c`), #19 (inert margins → P3's padding fix), #7 (shelf label gold), plus the 620/760 dual declaration. The other 22 defects stay in their own lane and never gate the world.
4. **The Threshold Scale** (P10), one morning, before the page gains its biggest-ever block.
5. **The sheet of drawings — no more specs** (X6's law): Dog/Tiger/Rat/Rabbit + Water/Lake at ship size, forced-choice cold; and C14's prior test — sky + horizon + one crosser as a place, rendered and looked at ten times. This is the go/no-go and it costs an afternoon.
6. **The curve print** (`?arc=` in the untracked harness): 3/6/9° × 1440/375 × lit/dark. Then the number is law.
7. **The still world**: `world.js` + `world.css`, marks-in contract, adapter separate, empty state first, kill-1 A/B with the pre-written verdict, forced-colors rule in the first commit, COPY_FILES + index.html tags in the ship commit, one commit total (revert-clean), `--tw-night` partial-rollback custom property built in on day one.
8. **The clock**: one declaration per layer; the ten-minute drift sit; the sub-pixel snap screenshot-diff on a real phone; L7/BRMotion wiring; composite-luminance harness green across all 24 hours.
9. **Rings** (anonymous presences) — after the store has Concord data to feed them. **Monuments only when the Mint exists.** The named-ring version waits for the BLOCKING social spec.

Cadence rule, replacing the broken tripwire: **no world session lands without a profile defect closed the same session.**

---

## 7. WHAT THE QUESTION SET MISSED

1. **The hash defect** — the largest finding in the entire exercise, found by zero of 85 questions and two critiques independently. 58% of all worlds would have been Heaven; terrain, stone, and weather share three weak bits. Everything downstream was nearly built on it.
2. **Fact (a)** — no question asked "where does the world's data come from?" The answer was: nowhere. The first task of the whole project fell out of a critique, not the question set.
3. **The lunar-new-year bug** — a wrong creature standing in a person's land forever, shipping today, unasked.
4. **`br_concord~*` privacy** — two real people's names and birth dates in plaintext localStorage keys, in the shipped product, on a repo whose privacy incident is still open. Found only while auditing the store design.
5. **The lamp** — `.pf-wrap::before` is column-clipped; the first lit margin turns it into a full-height warm seam. Nobody asked what the page's one light source does when the page gains a second lit region.
6. **The masthead's backdrop-blur** vs a continuously drifting sky — a per-frame full-width blur pass hiding in two shipped declarations.
7. **The grain z-order** (`.pf::before` soft-light layer): above it, the world is the one surface without tooth and reads pasted-on; below it, L3 gets cheaper for free. Undecided, free to decide now, expensive to discover as "the world looks flat."
8. **The profile never shows the trigram or hexagram** — the two largest world elements derive from marks the hub has never displayed. D4's ungated spine (now carrying trigram + rune) is the fix, but no question asked it.
9. **Who draws** — 85 questions about the world; none about the hand, the tool, or the owner of its most expensive artefact. The repo's own history (27,700 words of art spec, art shipped only inline) says this is the failure mode.
10. **Shared devices** — `br_world` assumes one visitor per browser. A second person taking their own reading on the same device collides with the frozen ground seed. C11's filed-record re-strike covers it by accident; nobody asked it on purpose.
11. **The almanac sky needs a spec** — "the real sky on the real date" is settled as the free state, but its mechanism (a small precomputed by-date table, no fetch, no library) is specified nowhere. One page of data; someone must write it before step 7.
12. **L6 had no number in any brief** while `PERFORMANCE_BUDGET.md` sat uncited in the repo. Fixed in §5 above — but the pattern (a law with no unit is a law that gets waived) is the thing to carry forward.