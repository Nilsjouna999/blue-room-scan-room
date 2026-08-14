Final state verified. Here is the report.

---

# FINISHER'S REPORT — `_m1-final.html`

**Files:** `C:/Users/nilsj/OneDrive/Documents/blue-room-scan-room/_m1-final.html` · new: `tools/m1-measure.py` (the gate) · new: `tools/m1-place-marks.py` (the shoal solver)

## 1. What passed, what I fixed, what I couldn't

**The one that matters: the shoal never painted.** Setting all 28 marks to opaque red changed **zero pixels** on screen. Two independent causes, both now fixed:
- `.m1sect__field` had been swept into a `position:relative; z-index:2` selector list, overriding its `position:absolute`. It became a zero-height grid row with `overflow:hidden`, clipping all 28 marks out of existence.
- Once it had a box, the guard hid all 28 anyway. Eviction measured **block-element bounding boxes**, and a paragraph's box spans the full column even where its last line is three words. The whole section read as occupied. It now measures `Range.getClientRects()` — one rect per rendered *line*, ending where the line's text ends. That is what "part around words" means.
- The hand-authored positions then cleared nothing on their own, so I wrote `tools/m1-place-marks.py`, which solves against real type at 1200/1440/1920 and emits literals to paste. Positions stay frozen data — no PRNG, nothing re-rolled. **Now: 28/28 paint, 0 evicted, 0 text overlaps** (item 14 ★ genuinely passes for the first time).

**Other real defects found and fixed:**
- `#mwGold`'s first stop was `var(--gold)`, but the `<defs>` is a child of `<body>`, outside `.menu__draw` scope. It computed to **black** — the crown and the Star's rays were rendering black-to-brown. Now a literal, with a comment explaining why it must stay one.
- Marks were `#948f87`, not the specified `#9c9790`: `--silver-dim` is remapped to `--t-meta` inside `.menu__draw`. Items 11 and 82 contradict each other; I satisfied both by giving `.m1mark` the literal.
- The caption said "The Star" in markup while the default face is birth — a paint-1/paint-2 disagreement.
- Mount had two writers: `m2SetFace("birth")` returned early on `which === M2_FACE`, so `settle()` never ran, and the aria-label/berth were hand-patched beside it. Now one `force:true` call does all four.
- `is-stirred` was applied at mount, putting 12 gold marks on the page at rest — item 74 ★. Removed; nothing has been chosen yet.
- Spent-sitting copy invented "Your first is spent." The sheet drops the clause. Fixed (item 29 ★).
- `window.location.href="?"` / `"rooms/"` deleted (item 55 ★); `buildField` now skips one bad mark instead of aborting all 28 (item 28); exits' negative margin removed (69); berth converted to `rem` (52); caption's AT-only honesty suffix added (40); specimen flagged as a merge-checklist item (93 ★); birth face given six real glyphs (42 ★).

**Verified passing, measured not assumed:** grid/areas/DOM order, h3 door names, `aria-labelledby` resolution, all 28 cids exist in `codex.html`, the six inks match `arcana-profile.css:566–573` exactly, `container-type:size`, hero `max-width:392px` + `120/190`, **berth `min-height` computes to exactly 152px**, no line-clamp, no PRNG, no keyframes, no key/wheel listeners, no prices, gold-at-rest sweep now returns **zero elements**, console clean.

**Could not fix — and why:**
- **The gate fails at 4 of 9 brackets.** 375×667 (+168), 320×568 (+322), 812×375 (+338, offer clipped), 768×1024 (+409). At those sizes the offer alone fits but the object does not, and *removing the object on small screens is a design decision the sheet never made and I won't make by fiat*. 320×568 is the sheet's own declared residual ("reported, never hidden") — the gate reports it.
- Items 27, 38, 55-in-app, 58, 60, 70-in-CI: standalone-file limits (no `mountMenu`, no deck, no `app.js`). Real merge conditions, not fixed here.

## 2. Honest state of the file

**Ready to be looked at at 430×932, 1280×720 and 1440×900.** Those are clean, and the two you'd screenshot first are the two that improved most. 430×932 now lands at 822px against an 892px budget with 70px to spare — the critique's #1 finding is closed, and it was *not* closed when I got the file (1132px).

**What a screenshot will still reveal, honestly:**
- **The shoal lives in the right and bottom gutters, not distributed through the sections.** That is the only space 24px clearance leaves. Tarot fits its 16 at 33px separation comfortably; birth's 12 are squeezed to 16px minimum, and I had to give its tightest slots the smallest glyphs to stop them touching. Birth cannot hold 12 well-separated marks — measured, not guessed. It caps at 9–11.
- **768×1024 is visibly broken** — a 560px column stranded in a 768px viewport, scrolling ~400px. The sheet designed a wide grid, a phone stack and a landscape phone. It never designed a tablet.
- The phone card is a thumbnail. It's legible now (I graded the face by container query — two columns → one → glyphs-only) but it is small.

**Where I think the sheet is wrong, not the file:**
- The object rung `clamp(170px, 24svh, 260px)` computes to 224px at 430×932 and makes that bracket *worse*. The file's smaller value is right.
- The berth's "height ≤700px" bracket is unmeasured; its own stated rationale ("the reading lives one tap behind either door") is height-independent.
- Item 5 wants an `<h1>`; the sheet says the panel's existing `<h2>`. I kept the `<h2>`.
- Item 26 says a *door* needs two taps; the sheet says a *mark* does. I kept the sheet's — two-tapping a door would be hostile.

**Two deviations I made deliberately, declared in-file in comments, not silently:** the berth comes off at ≤430px width (not just ≤700px height), and the placard is hidden below 430px because THE CODEX already has its word in the exits row 40px below it.

## 3. The three things I'd do next

1. **Decide the small-screen object.** 375×667, 320×568 and 812×375 all fail by exactly the object's height. Either it comes off below some bracket, or the one-screen contract is conceded there and the `app.js:4749` seatbelt carries it. This is one call and it unblocks three brackets.
2. **Design the tablet.** 768×1024 is the worst bracket by 409px and the only one with no designed layout at all. The landscape two-column arrangement is most of the answer.
3. **Thin the sections or thin the shoal.** The measurement is unambiguous: the birth section cannot host 12 marks at 24px clearance without crowding. Either drop birth to one glyph per system — six marks, which rhymes with the reading being six — or move the specimen out of the section so the shoal has room to be a shoal.