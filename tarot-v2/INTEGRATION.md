# INTEGRATION.md — the selective graft of tarot-v2 into the live Drawing Room

**Reissued 2026-08-11 against live HEAD `a4f6571`.** The previous edition was written when
tarot-v2 was new and the live room had not moved. Live has since moved a long way, and
following the old checklist verbatim would now **redo or regress shipped work** — two of its
eight steps were completed by BR-S314, which read this very file to find them.

## The ruling

**SELECTIVE GRAFT. Live HEAD is canonical; tarot-v2 is a donor.**

Do not replace the live Drawing Room with tarot-v2, and do not port the folder wholesale.
Live already holds the corrected hash, unique seals, the router, the full 78-card copy source,
the current product structure, and several already-harvested visual decisions. Harvest only
the rows still marked **STILL SUPERIOR** below, verify, then tag and retire the folder.

Live references (repo root):
`drawing-room.js` (the engine + views) · `arcana-profile.css` (`--pf-*` tokens, `.dr-*`) ·
`styles.css` (`--t-*`, room bg, and the M1/M2 sample card face).

---

## 0. THE GRAFT IS DOM IDENTITY, NOT KEYFRAMES

This is the finding that reframes everything else, and it is the reason a straight
copy-the-CSS approach fails.

| | live `drawing-room.js` | `tarot-v2/app.js` |
|---|---|---|
| State | `STATE.view` — `landing / intake / reading` | `STATE.phase` — `tier … complete` |
| Render | **replaces whole views**: `stage().innerHTML = …` on entering intake, on the cut, on a pull, and after **every card turn** | **mutates nodes in place**: `face.innerHTML = faceHTML(…)` on an existing node (`app.js:1010`, `:1223`) |

A ceremony is a ~3.5s chain of transitions over **stable DOM identity**. A single
`innerHTML` re-render mid-deal destroys the nodes and every in-flight transition with them.
So the ceremony cannot be grafted onto the current render discipline at all — it has to be
given one.

**The architecture (decided — do NOT convert the whole room):**

Keep the live product-level machine exactly as it is:

```
landing → intake → reading          (STATE.view — unchanged, live architecture retained)
```

Inside the reading surface only, introduce a **persistent ceremony subtree** created once and
mutated surgically, with its own local phase:

```
ready → shuffling → shuffled → committed → cutting → dealing → dealt → revealing → complete
```

Everything outside that subtree keeps the existing live architecture. This is deliberately
**not** a port of v2's `STATE.phase` model: converting the whole Drawing Room would be
invasive for no gain, and the regression surface is the entire product rather than one
subtree.

---

## 1. THE COMMITMENT TRANSACTION — decided, and it is a correction to v2 as well

**The money beat happens at Cut.** Not before the shuffle (shuffle is preparatory,
reversible, playful — charging there bills the user before they have committed the question),
and not after the reading (that makes the transaction a toll on the way out). The final beat
is **Filed**, never *Paid*.

```
Question → Shuffle → Cut / Commit → Deal → Read → Filed
                         ↑
                    the money beat
```

Causal spine: shuffle = possibility · cut = commitment · settle = consequence ·
deal = revelation · file = permanence.

### 1a. The click is the irreversible moment — v2 has this backwards

v2 (and live's `cut()`) currently do:

1. user clicks Cut
2. the UI begins the 620ms violet→gold settle
3. **only then** `doCut()` reads the question, mints the token and seed, draws, and consumes
   the free-sitting bit

So the interface says **Settled** while the record is still unfrozen. Invert it — everything
freezes synchronously **on the click**:

```
CLICK CUT
  ├─ question read and frozen
  ├─ token + seed minted and frozen
  ├─ draw resolved and frozen
  ├─ free-sitting bit consumed
  └─ back / edit closed
        ↓  (only now does anything animate)
   violet → gold, "Settled"
```

The interface and the underlying state then agree on the exact millisecond commitment
happens. For a future real payment this also gives the right seam: the **draw stays frozen on
click** while the *reveal* is gated on settlement resolving — if payment fails, no card leaves
the deck.

### 1b. Overlap the settle with the cut — do not queue it

Sequential 620ms settle + 1020ms cutlift puts **1.64s of nothing** in front of the deal. The
settlement is not a modal pause; it is a material transformation happening *while* the
committed action begins:

```
t=0        CLICK — question / seed / draw frozen; violet starts resolving
~150-220   the deck physically begins to cut and lift
620        violet has become gold; "Settled" resolves
1020       the cut finishes
~1540      the first card launches, after the existing anticipation
```

One perceived event — *"I cut the deck, and the transaction sealed"* — rather than
*"I paid. Wait. Now an animation starts."*

### 1c. Money stays visually silent

**Do not add** coins, receipts, payment sheets, flying dollar signs, or violet particles.
The registers already carry the meaning: **violet = unsettled value, gold = entered into the
record.** `CUT THE DECK · $1.99` in violet → click → the violet drains into the existing gold
register → *Settled* → the physical cut completes.

One restrained detail worth building: let the gold **transfer from the button into the cut
hairline / deck edge** rather than merely recolouring the button. Payment then reads as
physically incorporated into the ceremony, and gold stops meaning "premium" and starts
meaning **this has crossed the threshold** — a better semantic use of the colour.

---

## 2. CURRENT DELTA MATRIX (against `a4f6571`)

### ✅ ALREADY GRAFTED — these steps are DONE. Do not redo them.

| Piece | Where | Status |
|---|---|---|
| `hash()` → `Math.imul(h, 16777619) >>> 0` | `drawing-room.js:64` | **DONE — BR-S314 `a4f6571`** |
| Non-colliding seal token | `drawing-room.js` `sealNow()` | **DONE — BR-S314 `a4f6571`** |

The old edition listed both as steps 4 and 4a. They were real: the float multiply measured
**10.18% Reversed over 600,000 draws** against a canon 50/50 (bit0 set 13.0%, bit1 17.9%,
bit2 44.3%, bit3+ 50.1% — the low bits round away past 2^53 and reversal reads the lowest
one), and the minute-granular seal made the same question twice inside a minute produce an
identical seed, spread and BR code. Both are fixed in live. **Every pre-S314 `?read=` receipt
now replays a different reading** — unavoidable, and the reason the engine had to be settled
before any ceremony work.

### ⏸ IDENTICAL — no action

`pick` / `norm` / `drawSpread` structure · `brCode` / `accession` formula ·
`SPREADS.sitting` + `SPREADS.deep` shape and values · the gate (`br_dr_sitting_used`,
fail-open) · the Pull seed · the 620ms settle beat and its copy · the canon strings.

### 🎯 STILL SUPERIOR IN V2 — the actual harvest list

| Piece | Live equivalent | Note |
|---|---|---|
| Deck pile — 7 layers, `renderDeck()` `app.js:546` | **none** | `translate(k*1.3, k*1.7)`, `hsl(34 22% 13-k%)` → `hsl(32 20% 8-min(k,6)%)` |
| `riffle` 820ms | **none** | |
| `cutlift` 1020ms | **none** | overlap with the settle per §1b |
| Deal: ~520ms anticipation → travel `.54s cubic-bezier(.16,.86,.26,1)` → stagger `.42` (n=5) / `.52` | **none** | |
| `slam` `.56s` + shock ring | **none** | `grep riffle\|cutlift\|slam\|shock` → live **0**, v2 **11** |
| Locked Ink | **none** | v2 13 hits, live 0 |
| Completion corner accession | live has the code, not the treatment | v2 23 `accession` hits vs live 2 |
| Shrinking stack | **none** | |
| `SPREADS.pull` + the `filed` flag | live handles Pull outside `SPREADS` | clean superset; low value, low risk, optional |

### 🚫 OBSOLETE — already resolved upstream, do not port

| Piece | Resolved by |
|---|---|
| Parchment palette (`--parchment`, ink `#1c150d`, copper `#c98a5e`) | BR-S287/288 `507a5c1` |
| Typographic card face → the M1/M2 sample card | BR-S289 `e3b58ff` |
| Dark-deck / parchment disagreement | BR-S306 `cdbd829` |
| Fixed 980×470 stage | v2 itself discarded it for the fluid stage |

### ⛔ MUST NOT PORT — live is canonical

| Piece | Why |
|---|---|
| v2's local CSS tokens (`--accent`, …) | `--pf-*` / `--t-*` are canonical |
| `voice.js` (22 Majors only) | live's `window.BRArcanaCopy` covers all 78 — shipping v2's slice would **regress the Minors** |
| Single opaque base64 `?read=` | live's three-param `read` / `t` / `q` behind `inApp()` is shipping and verified |
| Dropped `inApp()` guard, neutralised Reliquary nav | the live router and filing path stay |
| "No reset once shuffling starts" | conflicts with the spatial law — every path must be reversible. **Escape / back aborts**, nothing filed, the free-sitting bit not consumed until the cut |

### ❌ CORRECTED CLAIM — the previous edition was wrong

> ~~"Suit glyphs (4 inline SVG) + Minor card-face header branch — new face work, ships as-is."~~

**There are no suit glyphs in tarot-v2.** `faceHTML` (`app.js:525-542`) puts a single ◆ on
*every* card, with the comment *"the diamond — the original card art, on EVERY card"*, and
`app.js` contains **zero** `<svg>` elements. The fleet had drifted the face into per-suit
glyphs and the builder explicitly removed them in BR-S222/223. **Porting "suit glyphs" would
reverse a decision already made.**

What is real is the **Minor header branch** (`app.js:528`):
`major → "ARCANA · <rank>"`, otherwise `"<SUIT> · <ELEMENT>"`. That one line is worth taking.

### 🔍 OPEN FINDING — the card face is still split, and it must be closed BEFORE the ceremony

BR-S306 made the storefront and the dealing room agree on **colour** but not on **structure**:

| Surface | Face |
|---|---|
| M1 / M2 sample card | v2's real **typographic** face (BR-S289) |
| The Drawing Room's own dealt card | parchment-coloured, but still the **engraved `dr-plate` SVG** (`drawing-room.js:127-135`) |

The same incoherence S306 closed, one layer down. **Do not build a ceremony around a card
face already known to be structurally inconsistent between the storefront and the card that is
actually dealt.** Close this first.

### 📄 DOCS

- `SPEC.md` §8 acceptance criteria — harvest as the **test plan**, not as code.
- `GUIDE_COPY.md` — BR-S232 `22f72b0` shipped a full Codex tarot guide; check overlap before
  treating v2's copy as unique.

---

## 3. EXECUTION ORDER

1. **Reissue this file against HEAD** — *done, this edition.*
2. **Close the card-face split** (§2 open finding). Before any ceremony work.
3. **Persistent ceremony subtree** — created once, surgically mutated, local phase machine
   only (§0). Do not convert the rest of the Drawing Room.
4. **Static deck pile.** Verify layout, responsive, accessibility. Judgeable, zero risk.
5. **`riffle`.**
6. **The commitment transaction** — freeze synchronously on click, overlap settle with cut
   (§1a, §1b, §1c).
7. **`cutlift`.**
8. **Deal + stagger + slam / shock.**
9. **Locked Ink + shrinking stack + completion accession.**
10. **Full parity and feel QA** against `SPEC.md` §8.
11. Only once live is unquestionably superior in every relevant dimension: **tag tarot-v2's
    final state, then retire the folder and its route.**

---

## 4. HOW ANY OF THIS GETS VERIFIED

State this before starting, because it has cost real time repeatedly:

**The preview pane freezes `requestAnimationFrame` AND the transition clock.** A ~3.5s chained
ceremony cannot be watched there, and `getComputedStyle` returns **frozen start frames** for
anything mid-transition — three correct rules once looked broken because of it. So:

- **State machine** — assert synchronous side effects only, one case per fresh load.
- **Timing** — audit the delay chain numerically (total-to-turnable, per-card landing times,
  the reduced-motion path), the way the ROOMS springs were audited.
- **Geometry** — measure with transitions force-disabled:
  `.dr-* { transition: none !important }`, read, then remove.
- **Feel** — the builder's eye. There is no substitute and no point pretending otherwise.

## 5. A NOTE ON READING THE HISTORY

**BR-S numbers are reused across parallel sessions.** `BR-S222` is both "Fortune wheel" and
"Tarot Sitting v2"; `BR-S231` is three different commits. tarot-v2's real build is
**S222 `1aaf5dc` → S223 `f17ec27` → S224 `757847e`**; the later commits touching this folder
are live-room and orb work brushing it. Never infer a feature's history from its BR-S number —
read the path.
