<!-- ═══════════════════════════════════════════════════════════════════════════════
     U1 — THE LENS PASS.  `docs/U1_LENS_PASS_V1.md`

     Five lenses over `docs/U1_SHOWCASE_V1.md`, run 2026-08-16 immediately after that
     sheet was written: continuity, buildability, narrow/mobile, truth-and-claims, and a
     quality check whose first job was to VERIFY every reference in the sheet against the
     repo rather than to have an opinion about it.

     Six agents. Every finding had to carry file:line evidence or be dropped, because a
     previous fleet on this same surface invented a source file and a rune. That rule
     earned its keep twice over — see "CLAIMS THAT DID NOT SURVIVE VERIFICATION", which
     catches two of this pass's OWN lenses overstating, and separately confirms the sheet
     itself contains no invented references.

     ★ THREE BLOCKERS WERE RE-VERIFIED BY HAND in the main loop before this was filed:
       · B1 — `renderCard()`'s only value block is `app.js:613`,
         ["presence","signal","visualImpact","charge"]. No name, no date, no six-mark
         region. CONFIRMED.
       · B3 — `docs/U1_MOTION_V1.md:205-231` is titled "THE LAW THAT WAS MISSED — added
         after the first build was scrapped" and says the filling IS the demonstration.
         CONFIRMED.
       · B4 — `build_public.py:263` puts `_m2-accord.js/.css` on DEV_ONLY, and `:333-335`
         assert both ABSENT from preview and live. The socket also has zero scroll,
         pointer, touch or IntersectionObserver handlers. CONFIRMED.

     ★★ B3 IS THE DANGEROUS ONE, AND ITS ORIGIN IS THIS SESSION. The audit listed "no
     typing effect" among its constraints; the main loop carried that into the brief the
     sheet was written from, as law. It contradicts a LATER, builder-authored ruling added
     after the previous U1 was scrapped — and the thing that build was scrapped FOR was
     precisely that nothing typed. Building to the sheet as written would have repeated
     the exact failure. An error can be inherited from an audit as easily as invented by a
     fleet; the fix is the same either way, which is that both get checked against the
     repo before they become law.
     ═══════════════════════════════════════════════════════════════════════════════ -->

# U1 SHEET — THE LENS PASS

## BLOCKERS

**B1 · The hero the sheet locks does not have the parts §5 puts on it.**
WHERE — §2 ("the existing card — `renderCard()`'s article … its four stat rows … No substitute, no simplified stand-in, no second render path") against §5 AT DEPTH ("The name and the date are legible on it. The six mark positions are present and empty"). Evidence: `renderCard()` is `app.js:550`; the complete article is `app.js:563-660`. Its only value block is `app.js:613` — `["presence","signal","visualImpact","charge"]`, four rows. Its text is `card__house`, `card__rarity`, `photo__meta` (`app.js:588`), titleblock `c.title/c.archetype/c.note/c.signature` (`app.js:592-601`), mintstrip serial (`app.js:633`). There is no person name, no birth date, no six-mark region anywhere in it. The only six-slot list in the app is `app.js:2996-2998` (`m2bface__marks`), on M2's birth face, and it prints slot *labels*, not values — a different object with no photo, no halo, no stat rows, no mintstrip.
WHY — the still frame the sheet exists to produce cannot be composed. A builder must either invent a region on the locked card (which §2 forbids) or swap heroes (which the audit forbids). Four lenses hit this independently; it is the single largest defect.
FIX — add to §2: "The card carries a six-mark region and a name/date line that `renderCard()` does not render today. Building them is in scope and is the only permitted addition: a block inside `.card__plate` between `.titleblock` (ends `app.js:601`) and `.framereading` (`app.js:603`), rendering values, not slot labels. The four stat rows are untouched." Then say in §5 whether AT DEPTH shows six empty frames or six labels.

**B2 · §1 specifies a per-visitor derivation that was RULED out the same day.**
WHERE — §1 ("derived from what they supplied"), §5 AT DEPTH ("it is already this person's"). Conflicting: `docs/U1_MOTION_V1.md:54-64` — *"mathematically accurate not reality, its tutorial showcase, and keep john"* … *"no intake form, no engine call at page load, no per-visitor state"*; restated `docs/U1_MOTION_V1.md:188-191`. The sheet never names the fixture; the shipped one is `_u1-rack.js:186` (`John Bon`, `born 26 July 1965`).
WHY — the two documents describe different products. A build reading only the sheet constructs the intake the builder deleted.
FIX — §1: "…a real card is being derived, on a labelled specimen, from the two things a reading starts from." §5: "it is the specimen's, and the specimen is named on the surface." Add the fixture and the no-intake rule to §2.

**B3 · §7 bans the one mechanism added as law after the last U1 was scrapped.**
WHERE — §7 ("no typing effect"), inherited from `docs/U1_AUDIT_V1.md:48`. Conflicting and later: `docs/U1_MOTION_V1.md:207` — *"it was missing info writing on each box filling it out like the product need to work"*; `:210-214` — *"The filling IS the demonstration. Each box writes itself out as you scroll … A box that arrives already full has shown them nothing."*; `:229` — *"A defect in HOW something fills is never a reason to stop it filling."* §5 DERIVING's "marks resolve" is the arrives-already-full shape.
WHY — this is exactly what cost the 956 lines scrapped at `build_public.py:256-259`.
FIX — §7: "no autoplay and no ambient loop; the writing is scroll-driven, never time-driven." §5 DERIVING: "each mark and its derivation line write themselves out as the plane passes, on the same scalar." Note in §2 that this overrides the audit's blanket "no typing".

**B4 · The container is not reusable in any of the three senses §2 claims.**
WHERE — §2 ("U1 reuses that shell … It does not build a new system"); §7 ("Touch: identical mapping"). Evidence: (a) inert without a flag — `_m2-accord.js:44` `if (!/[?&]m2=accord/i.test(q)) return;`, header at `:10`; (b) mounts to M2 only and is a singleton — `_m2-accord.js:134` `.menu__draw-stage [data-m2-hero]`, `:175` `if (!h || doc.querySelector(".m2acc")) return false`, `:178` sets `aria-hidden="true"`; (c) it has no motion driver at all — its only interaction rules are `_m2-accord.css:379-388` (`:hover` / `:focus-within`), and there is no scroll, pointermove, touch or IntersectionObserver handler in `_m2-accord.js`; (d) both files are on the deny-list — `build_public.py:263` `DEV_ONLY = [… "_m2-accord.js", "_m2-accord.css"]`, asserted absent from preview *and* live at `build_public.py:333-335`. `docs/U1_INTENT_V1.md:149` already names *"It is not on the launch build at all"* as one of the three failures a masterclass U1 must not repeat.
WHY — as written the showcase renders only under `?m2=accord`, on M2's slot, with no mechanism, and the build asserts it stays out of every build a visitor can reach.
FIX — §2: the recess is **ported**, not reused. Take `.m2acc` and its wall/floor/pane/gleam/trace rules (`_m2-accord.css:111-148`, `435-457`) into a U1-owned file with its own mount, no `aria-hidden`, no flag; the bottle plane does not come. State that the scroll driver is new work, not inherited. State the promotion path: the new file enters `build_public.py`'s tier list and `PROBES` at whichever tier U1 ships on, on the mounting commit.

**B5 · AVAILABLE has nothing behind it — the controls cannot fire, and the product is not for sale.**
WHERE — §8 ("the card's own controls come live in place … the same controls, the same handlers"). Evidence: both handlers refuse outside the room — `app.js:7045-7046` `const card = trig.closest("#stageZone .card"); if (!card) return; // menu / proto / dev reuses: inert`, and `app.js:7088-7089` for Mint Record, which additionally requires `card.dataset.treatment !== "free"` (`app.js:7090`) and an existing `#dossierMount .dplate--mint` (`app.js:7096`). Two of the four things §8 names are inert spans: `app.js:632` `mintstrip__state`, `app.js:633` `mintstrip__serial`. And the product itself: `app.js:3633` — *"Stage your image as a local draft. The scan engine isn't connected yet — nothing reads it."*
WHY — §8 says the advance "is the only thing that happens". As written, nothing happens, and §5's proof ("the thing you can now have") is false on the front door's own words.
FIX — §8: name only the two real controls, `button.mintlink[data-mint-showcase]` (`app.js:635`) and `button.barcode[data-card-qr]` (`app.js:636`), and specify the work: widen both `closest()` gates to a shared `[data-live-card]`, and state that U1 has no dossier plate so Mint Record needs a different target. Then state in §2 what U1's card **is** commercially — if the photo card is the roadmap product, §8's door goes to the reading that ships.

## SERIOUS

**S1 · §5's "reuse that beat" is timer-driven and one-way; §7 forbids both.**
`reveal/card-frame.js:123-125` (`ddur=3550`, `pipT0=3486`, `ritualDur=1360`) driven by `setTimeout` at `:128,138,141,146,162-166,173`; `reveal/reveal.css:322-323` (2400ms/3550ms). Nothing reads a position, and the ladder has no reverse. §7 promises reversibility. FIX — strike "Reuse that beat"; keep the *visual* treatment (the free→halo crossfade) re-authored on the position scalar, and say plainly no `setTimeout` sits in the plane's path.

**S2 · §7's keyboard clause invokes behaviour deleted on instruction.**
`app.js:5101-5115` — *"★★ BR-S457 — THE CHECKPOINTS ARE GONE … The builder: 'delete check points.'"* `_navStops()` returns two stops; `_navStep` bails below two (`app.js:5123`). FIX — "↓/↑ step between plateaus inside the recess only. This is new; the page walk was deleted at BR-S457 and is not revived. `ys[1]`/`_u1Seat()` is untouched; plateau stepping rides `_u1GlideTo()`."

**S3 · The recess geometry cuts the card and draws the frame §4 forbids.**
`_m2-accord.css:113-114` `max-width: 462px; aspect-ratio: 0.808`, `:123-124` `overflow:hidden; isolation:isolate`. The card is content-height, `width:min(var(--card-w),100%)` (`styles.css:383`), `--card-w: 500px`, with `box-shadow: 0 44px 90px` (`styles.css:388`) and `.card__halo { inset:-40px; z-index:-1 }` (`styles.css:809`) — the card sets no stacking context, so the halo resolves against `.m2acc` and paints behind its wall/floor. FIX — drop `aspect-ratio` and `max-width` on the U1 copy; wrap the card in a slot node carrying `isolation:isolate` (the pattern at `reveal/reveal.css:224`); pad the recess by at least 40px + the 90px blur; re-derive the recess ratio from the card — 0.808 is the bottle's.

**S4 · The treatment is never named, and §2 and §5 resolve oppositely depending on it.**
§2 "Its controls and effects stay live" vs §5 "Nothing loops. Nothing breathes." The loops exist only on shiny — `styles.css:1035` `holo-spin`, `:1096` `halo-breathe`, `:1109` `twinkle`; on free both controls ship `tabindex="-1"` (`app.js:635-636`). FIX — state the treatment in §2. If free, §5's "nothing loops" is free; if shiny, §5 must name the three loops it suppresses, enumerated from the live DOM at build time, not from this list.

**S5 · §7's flick-settle contradicts its own "never captures the page" and a refusal already paid for.**
`app.js:5169-5171` — *"a deliberate choice over snapping every checkpoint: a reading surface that fights a trackpad is worse than one that lands imprecisely."* FIX — cut the settle; plateaus are a non-linear map from `p` to plane position and capture nothing. A flick ends where it ends.

**S6 · §6's "out of the reading engine at run time" has no export to call.**
`arcana-reading.js:628` exposes only `{ mount }`; `sunSign` `:111`, `lifePathNum` `:114`, `drawFor`/`birthReading` `:104,118` are IIFE-private, and `mount()` fetches before deriving. FIX — specify build-time: a generator writes a fixture module from the private derivation. If run-time is ever wanted, name the required export; forbid `mount()` on U1.

**S7 · §7's reversibility rationale overstates the dependency.**
"the interpretation … depended on them" — `crownOf()` (`arcana-reading.js:100-101`) reads only sun, chinese, rune, trigram; `fragment()` (`:123-127`) returns `null` for Life path and Hexagram. Already documented: `docs/CLAIM_AUDIT_V1.md:66`. FIX — four marks build the sentence, two stand beside it; name only the four as dependencies.

**S8 · §6 presents the rune and trigram as two independent draws; the salts are adjacent.**
`arcana-reading.js:120` `rune:pick(by.rune,seed+"f"), trigram:pick(by.trigram,seed+"g")` — the measured consequence (trigram determined by rune, 0 violations in 60,000 seeds) is a held finding. FIX — §6: either the salt is fixed before this ships, or the two resolve as one event with one derivation line.

**S9 · Below 1199px there is no margin for the interpretation to sit in.**
`styles.css:2728-2745` — `.menu__inner` collapses to `grid-template-columns: 1fr; grid-template-areas: "head" "stage" "ctrl"`, `max-width: 500px`. §5 puts the derivation line "at the same height in the margin". FIX — specify the narrow variant: interpretation below the card in the same column, same plane keying, explicit order.

**S10 · §4 buries the hero, and §9 cannot catch it.**
`docs/SURFACE_BRIEF_V1.md:38-43` — *"a thing that has sunk in … has become part of the wall. Holding requires the object to still be PRESENT and OFFERED. Weight, not burial."* All three kill criteria test only for the showcase being too loud. FIX — add a fourth: "**It buries the card.**" And bound the depth in §4.

**S11 · §8 gives ownership a second home and leaves U1 with no exit.**
`docs/SURFACE_BRIEF_V1.md:114-116` — a thing you HAVE goes to the Profile, "ownership has one home"; U1 is `#about`, a section (`app.js:5014`), not an address. `docs/U1_INTENT_V1.md:97` — U1 keeps one link out to the roadmap. FIX — one door forward; add the roadmap link as U1's floor.

## MINOR

**M1** — "the lip", "the seam", "the margin" are used across §4/§5/§7 and never located. Define all three once in §4; the causal beat the audit asked for is expressed entirely in them.
**M2** — §6's citation is off by one and misnames the drift: the array is `_u1-rack.js:178-185`, `:186` is `NAME`/`BORN`, and the BR-S500 defect (`_u1-rack.js:160-177`) was four rows inventing the **codex's** keywords, checked against `codex-data.json` — not drift from the reading engine.
**M3** — nothing states the mark order, the margin's rest content, or the first-paint value of `p`; visitors arrive mid-page via `_u1Seat()` (`app.js:5099-5100`). Add both; the shipped order is Sun sign, Year animal, Life path, Rune, Trigram, Hexagram (`_u1-rack.js:179-184`).
**M4** — reduced motion needs one switch: `_u1-rack.js:297` reads `matchMedia` directly and so ignores the Settings override at `data.js:16-21` (`BRMotion.prefersReduced`). Specify `BRMotion`, and specify the mapping (quantise `p` to plateau index), not a second code path.
**M5** — §7's resize clause is silent on mobile URL-bar resize, which `_u1-rack.js:52-55` already guards with `svh`-first for this exact reason. Require `svh`/`dvh` geometry.
**M6** — §9 judges "beneath the real menu"; `docs/BUILD_PUBLIC_SPEC_V1.md:175` plans M2 as the boot panel. Reword to "before its host panel".
**M7** — §3 "one object carries the entire experience" reads as reopening `docs/U1_INTENT_V1.md:102` (*"The mechanism is the background, not an object"*). One sentence reconciling it (the recess is cut into the surface; the ground is the mechanism) prevents the next reader treating it as a silent reversal.

## VERIFIED CLEAN

- Every path the sheet cites resolves. No invented files, no invented rune — `Raidho` is `_u1-rack.js:182`, the fixture is `John Bon` at `:186`.
- Every part §2 lists on the card exists: halo vars (`app.js:565`), plate and corners (`:567-569`), photo overlays (`:581-586`), titleblock (`:592-601`), four stat rows with pips and tier words (`:613-626`), mintstrip (`:631-638`).
- The Accord's stated *visual* properties are all true: aspect-locked box (`_m2-accord.css:114`), one clip + one stacking context (`:123-124`), value falloff with no drawn frame, faint flush pane (`:435-457`).
- §6's premise is real: `_u1-rack.js:178-185` is a hardcoded literal array, and it has drifted once (`:160-177`).
- §6's sample-labelling requirement already ships: `_u1-rack.js:239` "A worked example", with the intake block below it.

## CLAIMS THAT DID NOT SURVIVE VERIFICATION

- **"`REDUCED` is read at module scope and never re-read."** False — `_u1-rack.js:572-579` re-reads on the media-query `change` event. What survives is narrower and is M4: it ignores the Settings-layer override.
- **"This repo already ships `animation-timeline: view()` `@supports`-gated at `styles.css:2341-2350`."** NOT FOUND. Searched `styles.css` for `animation-timeline`: no hits; every `@supports` in the file guards `corner-shape: bevel` (`styles.css:421`, `1121`, `1142`). Do not plan on scroll-linked animations being precedented here.
- **"`docs/FIXTURE_SPECIFICATION.md`"** (cited by the previous fleet, not by this sheet) — NOT FOUND, confirmed absent from `docs/`.
- The BUILD lens's `styles.css:3764` for `.m2hero` height is off — the rule opens at `styles.css:3750`; the clamp value was not verified, so do not quote it.

## THE SHORTEST PATH

Nothing is buildable until the sheet says **what the card is**. Fix in this order:

1. **B1** — write the six-mark region and the name/date line into §2 as a permitted addition, or change the hero. Every other finding downstream of the card resolves once this is decided.
2. **B2 + M3** — paste the fixture (John Bon, 26 July 1965), the no-intake rule, and the mark order into §2/§5. Two paragraphs, no build cost.
3. **B3** — flip §7's typing clause and §5's "marks resolve" to scroll-driven writing. This is the scrapped build's cause of death; it must be right before any code.
4. **B5 + S11** — decide the commercial end of the sheet: which product, which door, which controls. It rewrites §1's last clause, §5 AVAILABLE and all of §8.
5. **B4 + S3** — the port note and the geometry note. Both are §2 edits; both must land before anyone opens a CSS file, because the current text says "reuse" and the current CSS clips the card.
6. **S1, S2, S4, S5** — the four interaction/beat corrections in §5 and §7. Cheap text, expensive if discovered mid-build.

Deferrable until after the still frame: **S6** (engine plumbing — the frame can use the existing literals), **S7 and S8** (truth-contract precision — no pixel depends on them), **S9 and M5** (narrow and mobile — the frame is judged at desktop actual size), **M1, M2, M4, M6, M7**.