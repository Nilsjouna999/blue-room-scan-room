# BR-S108 — Fleet Audit (ranked menu for BR-S108.1)

**What this is.** The output of the BR-S108 fleet — 25 agents (10 Haiku per-section critics + 10 Sonnet
judges → 4 Opus cross-cutting → 1 Opus synthesizer) sweeping all 5 live cards on the loop-fixed base
(post BR-S107.1). Breadth in the gathering, **ruthless cut in the output**: the synthesizer force-ranked to
the highest-leverage fixes + the best new ideas and killed the rest. This is the **menu for the next pass
(BR-S108.1)** — not a build. Audit + idea-gen only; no runtime was touched.

**Provenance.** 20 critics + 4 cross-cut returned · ~775k tokens · 2026-06-22 · pointed at the WEAK cards
(Driver, Run); three cards (Ice Field, Shore, Tank) clear the bar. Proportions/strings below are the fleet's
*proposed* turnkey copy — verify/tune at build.

---

## THE RANKED SHORT LIST — 7 fixes (force-ranked by leverage)

### 1 · Build the Proportion Strip — colour-as-measurement (the seed, finally built)
**Weak:** the front swatch chips + the back Surface-Record prose grid are the page's densest, most airless
modules, and a label chip lets an 8% accent masquerade as a co-equal of a 79% field.
**Why (highest leverage):** four separate critics independently converged here. It's the literal seed
(colour as *measurement*, not label), the lightest build (one `pct` data field + a flex bar), reads only
pixels so it can **never** rate the person, and it turns both weak cards' worst module into the page's most
scientific one. The "photo-as-artifact" move — a card you screenshot because it *measures itself*.
**Turnkey — `COLOUR FIELD`** (replaces "Light & Surface"; one line per surface, dominant first, accent last;
bar filled in card accent colour; % right-aligned tabular ~9–10px):
```
DRIVER    — Cabin grey 79% · Fjord band 13% · Red layer 8%
ICE FIELD — Snow plane 78% · Cold sky 14% · Black silhouette 6% · Treeline 2%
SHORE     — Fjord water 58% · Gravel shore 21% · Mottled scale 13% · Snow ridge 8%
RUN       — Overcast sky 61% · Gravel path 23% · Coat 16%
TANK      — Cyan tank 44% · Painted wall 23% · Carapace 21% · Fluorescent 12%
```
Surface prose collapses to one parenthetical per line where warranted ("Cabin grey — 79% — moulded dash and
headliner, matte"); no chips, no brackets, no separate back grid.

### 2 · Break RUN's flatlined stat row
**Weak:** Run's four stats (87/91/84/88) genuinely differ but render as one repeated tier word (≈"PEAK"×4) — a
stuck readout, not a peak card. On the strongest-on-paper card, the brag row a viewer screenshots looks the
most broken.
**Why:** flips Run from "looks broken" to mintable with zero new copy; gives the weak card a *shape* instead
of an undifferentiated MAX slab.
**Turnkey:** number-forward chips whose fill/word tracks each value — Signal 91 "PEAK" (cresting) · Scene
Charge 88 "CLOSING-PEAK" · Frame Presence 87 "STRONG+" · Visual Impact 84 "STRONG". Number is the hero; a thin
proportional bar under each scales to its value so the row reads as a **podium, not a wall of one word**.

### 3 · Rebuild the Mint Record plate so the certificate breathes
**Weak:** the paid Mint plate (`app.js`) is an 8-row ruled dt/dd grid — the single most airless block on the
page, and the seed's explicit second target. Dead rows (Treatment="Halo Mint", Treatment Family, Archive
Status="Developed") restate the edition the reader already reached.
**Why:** the collectible payoff plate yet breathes least; the fix is pure subtraction + the same proof/space
logic that already makes Surface Record breathe.
**Turnkey** (replaces the dl + note block):
```
<dl class="drecord drecord--mint">
  <div><dt>Developed From</dt><dd>SRC-${pad2(src.no)} · ${esc(src.capture.code)}</dd></div>
  <div><dt>Triggers</dt><dd>${trig0} · ${trig1}</dd></div>
  <div><dt>Material</dt><dd class="drecord__material">${material}</dd></div>
  <div><dt>Mint Serial</dt><dd>${serial}</dd></div>
</dl>
<p class="dmint__note">"${esc(d.mint.note)}"</p>
```
Cut "The print already exists in full." — the quoted note is the landing. (Optional: lift Triggers into a
`.dmint__triggers` block with `border-left:2px solid var(--line-strong); padding:0 0 18px 12px`.)

### 4 · Re-archetype RUN so it stops sharing "The Encounter" with TANK
**Weak:** the single loudest taxonomy collapse — two of five cards carry the byte-for-byte identical
KIND-label across a dog-mid-leap and a held lobster. (Driver+Tank also collide on "gesture-triggered".)
**Why:** the subtitle is supposed to say what *species* of object you hold and instead erases the difference;
one move un-collides Run from Tank on all three shared axes and turns the weak card's best idea (arrival, not
crossing) into its distinct silhouette.
**Turnkey:** Title "Closing Distance" (or "The Arrival") · Archetype/Mint class "Lens-Direct" / "Arrival
Class" (unique in the set) · Trigger slug "approach-triggered" · Mint: "One stride from contact, and holding."

### 5 · Replace DRIVER's Mint copy
**Weak:** "Minted from the exact moment between farewell and blessing" is airless — farewell and blessing are
both *departures*, synonyms posing as opposites, so "the moment between" has no drama.
**Why:** replaces two fake-opposites with the card's actual collision (the hand signals departure, the engine
contradicts it), tying to the Hidden Stat's "nobody is getting out" without repeating it.
**Turnkey:** "Minted from the moment the hand went up and the engine stayed off."

### 6 · Collapse the Source Record grid to two lines (all cards)
**Weak:** the 5-slot label:value grid restates other lenses — locale ≈ Scene Role (often verbatim), session ≈
the light already in Surface Record; the ellipses on Shore/Run signal rote filling. "Halo Mint" appears
verbatim 5/5 and carries zero comparison information.
**Why:** the seed's first named target; pure subtraction that removes documentary duplication and gives the
weak cards air.
**Turnkey** (two lines, no colons, no slot names — keep only the differentiating `[X]-triggered` tag):
```
DRIVER    — Cabin, driver's seat. Engine off, fjord held in the right window.  / Gesture-triggered · cabin light, no hotspot on the glass.
ICE FIELD — Frozen lake, open plateau, late March. Hard sun, −12° inferred.    / Field-triggered · high contrast, highlights held.
SHORE     — Shore-side gravel, open fjord. Catch held transverse, overcast.    / Dispatch-triggered · flat light, full resolution.
RUN       — Gravel-grass path, outdoor. Low angle, candid.                     / Approach-triggered · overcast plate, no shadow cast.
TANK      — Seafood tank interior. Specimen held to fluorescent.               / Gesture-triggered · hard overhead, no fill.
```

### 7 · Replace RUN's Hidden Stat (it still re-argues the Signal Note)
**Weak:** "Running At, Not Past" restates the face note (dog as terminus, arriving not crossing) — the
distinction is real but it's the caption again, not something *hidden*.
**Why:** the Hidden Stat is prime real estate revealing nothing the face doesn't. The genuinely hidden layer
is the **man** behind the dog — already in the posture of aftermath, an ex-participant. A second meaning no
other section names; deepens Run's arrival/handover idea instead of repeating it.
**Turnkey — "The Man Let It Go":** "The figure in the background is already in release — not reaching, not
calling, stance open. Whatever command existed has been rescinded by the stride. The dog is operating on its
own authority now, and the frame caught the handover."

---

## THE 2 BEST NEW IDEAS (concrete enough to build)

### A · The Set Wall — a collection doorway
The five photos coexist as one archive, reachable from the "◆ BLUE ROOM ARCHIVE" header: a thumbnail grid of
all five card faces, each with its archetype class + one stat tier, plus a single cross-card line that reads
the COLLECTION as a proportion ("5 filed · 3 Encounter-class → 2 after Run re-archetype · 2 archive-grade · 1
still undeveloped").
**Form:** a new render only, **no new authoring** — reuse `scan.archetype` + `tierOutputs` across SRC-01..05,
lay the five existing faces in a CSS grid, count them for the header line. Turns the card from a kingdom into
a crown *on a shelf* (the product vision) and creates a set worth completing; the cross-card proportion read
extends the diagram instinct from one card to the whole archive.

### B · Zone Silence — engineered breathing between the dossier zones
Insert thin hairline + 2–3-word zone captions ("— EVIDENCE —", "— PRODUCTION —", "— METHODS —") with generous
margin between the reading-order zones; and drop the `.dossier__register` negative margin (currently
`margin-bottom:-24px`, which yanks each new-zone label into the plate it introduces — halving the breath
exactly where the page announces a threshold).
**Form:** pure CSS — a one-line separator render between zones + change `.dossier__register` margin from −24px
to −8px or 0. Converts a flush stack of boxes into a paced read with held breath between movements.

---

## ONE LINE PER WEAK CARD (the single thing keeping it from mintable)

- **Driver:** every beat except the one good containment idea ("engine off / nobody's getting out") defaults
  to generic archive-voice — the core idea is stated once in the Hidden Stat and never infects the Mint,
  Signature, or Source Record the way strong cards let their one idea bend every line. **Let the engine-off
  collision own the card.**
- **Run:** it has the set's best numbers but they render as a flatlined wall of one tier word, and its
  sharpest line (arrival, not crossing) is buried in a Hidden Stat while the title "Stride Break" contradicts
  it and the archetype collides with Tank. **Give the stats a podium and let "closing/arrival" own the title,
  class, trigger, and Mint.**

---

## BOUNDARY
Audit + idea-gen only. No runtime touched. This is the **menu** for BR-S108.1 — scope that pass after reading
this. Notable: fixes #4/#5/#6/#7 are copy (data.js), #1/#2/#3 are render+CSS, the 2 ideas are new renders;
none rate the person, none expose a token (the Proportion Strip reads only pixels). Photos stay gitignored.
