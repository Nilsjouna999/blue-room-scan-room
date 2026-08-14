# THE CLAIM GUARD — the check that keeps user-facing claims true

> A 12-agent run: 4 harvested every user-facing string, 6 tested each against the
> engine that would have to make it true, 1 refuted the verdicts, 1 designed the
> guard. 114 claims collected. Verbatim; nothing re-summarised.
>
> Supersedes nothing — docs/CLAIM_AUDIT_V1.md remains the record of the first six.
> ★ NOTHING BELOW IS FIXED YET. This is the note list.

---

# The Guard, then the Fixes

## PART 1 — THE GUARD

### The shape: a claims manifest with executable probes

Two files, no dependencies, ~1s runtime, sitting beside `gate_public.py` in the same step order (`docs/BUILD_PUBLIC_SPEC_V1.md` §8):

- `docs/claims.json` — the manifest. One record per user-facing claim.
- `check_claims.py` — the runner. Exits non-zero on any failure. `--audit` for the workshop tree, `--selftest` to prove every probe still fires (the pattern `gate_public.py` already established after BR-S347's case-sensitive regex reported a clean tree over live personal data).

A manifest record:

```json
{
  "id": "C-014",
  "string": "The same inputs always produce the same result: no chance, no re-roll.",
  "where": "settings.js",
  "verdict": "TRUE",
  "audited": "2026-08-14",
  "probes": [
    {"kind": "absent", "file": "drawing-room.js", "pattern": "Math\\.random",
     "because": "a draw the copy calls deterministic must not be salted"},
    {"kind": "absent", "file": "arcana-reading.js", "pattern": "Math\\.random|Date\\.now"}
  ]
}
```

### The six probe kinds — each derives a fact, none reads a comment

| kind | what it does | catches |
|---|---|---|
| `count` | Runs a snippet against real data (`len(codex-data.json)`, `sum(len(s.entries))`) and asserts the number **written in the claim string** equals it | "222 entries", "ten systems", "six further systems" |
| `agree` | Extracts a value by regex from N files and asserts they are identical | `$4.99` across `arcane.js`/`app.js`/`arcana-profile.js`; "five systems" vs "six systems" vs "six systems consulted" |
| `absent` | A regex that must NOT appear in a named file/function | `Math.random` under any determinism claim |
| `present` | A regex that MUST appear | a `localStorage.setItem` that writes reading *content*, under any persistence claim |
| `shape` | Counts call-sites of two competing mechanisms in one function and asserts the ratio | `birthReading()`: `findByName(` = 3, `pick(` = 3 — any claim saying "looks **each one** up" fails |
| `pin` | The claim string must appear **verbatim** in its file; the record stores a hash of the string *and* of the code region the probes read | copy edited → claim goes STALE → gate fails until re-audited |

`pin` is the anti-cheat. You cannot satisfy this gate by editing a comment — comments are never read by any probe. You cannot satisfy it by editing the copy either: changing the string breaks the pin, and the only way to green it is to re-run the audit and re-stamp `audited`.

### The two sweeps that matter more than the probes

**1. The unaudited-string sweep.** Scan every shipped `.js`/`.html` for claim-*shaped* strings not covered by any manifest record, and fail as `UNAUDITED`:

```
\$\d+\.\d{2}          |  \b(free|Free)\b near a product noun
\b\d+\s+(entries|systems|cards|rooms|marks)\b
\b(always|never|forever|every|nothing|yours to keep|is kept|not kept|no chance)\b
```

This is what makes the guard grow with the site instead of decaying. A new false claim written next month fails not because someone predicted it, but because it is claim-shaped and nobody audited it.

**2. The retraction denylist.** Once a claim is judged FALSE, its exact string is appended to `docs/claims-retracted.txt`, and the gate fails on that string **anywhere in the tree — prototypes included** (`_m1-*.html`, `u1-boxes-*.html`, `tarot-v2/`, `parked/`). This is the single mechanism aimed at the lesson in the brief: "Given, not drawn" spread into a dozen prototypes because a retracted string is indistinguishable from a shipped one once it is copied. A retraction list makes it distinguishable, cheaply, forever.

### What it would have caught of what shipped this week

| Shipped defect | Probe that fires |
|---|---|
| "Given, not drawn" / "Nothing is drawn here — each mark is looked up" | `shape` on `birthReading()` — 3 `findByName` vs 3 `pick` ≠ "each one" |
| "no chance, no re-roll" over a tarot draw (`settings.js:354`, `:445`) | `absent: Math\.random` on `drawing-room.js` — fires at `:70` |
| "keeps every one on a shelf" (`settings.js:336`) | `present:` no writer of reading content exists; the only `setItem` calls are `br_dr_sitting_used`, `br_holdings`, `br_has_reading`, one pairKey→URL |
| "six further systems" vs 222/ten (`settings.js:339`) | `count` — data says seven non-tarot systems, string says six |
| "five systems" (`app.js:1681`) vs "six systems" (`settings.js:341`) vs "six systems consulted" (`arcana-reading.js:358`) | `agree` across three files |
| Its propagation into a dozen prototypes | retraction denylist, tree-wide |
| The Shelf claim on `app.js:1460` | same `present` probe as the About one, so it cannot be fixed on one surface and missed on the other — which is exactly what happened at BR-S351 (the fix landed at `settings.js:363` and missed `settings.js:336` twenty-seven lines above) |

That is **six of the eleven live findings, plus the propagation vector**.

### What it could NOT have caught — and the honest limit

- **Implicature.** "Everything read here is yours to keep" contains no false fact; it implies filing that does not exist. No regex sees an implication. The guard can only tag it `FRAGILE` and force a human re-verdict when its file changes.
- **The M3 preview toggle.** The falsity is not in a string, it is that `reliqPreviewToggle()` ships ungated (`app.js:3053`, `:3069`) and two clicks fabricate a crowned name from the hardcoded `SEEKER`. A *targeted* probe can be written (`present: DEVNAV guard within N lines of reliqPreviewToggle`), but nothing generic would have found it. Reachability is a different audit than truth.
- **The aria-label/heading mismatch** (`app.js:3283`). Needs a rendered DOM, not a grep. Belongs in the existing browser-verified battery, not here.
- **Unverifiables.** "Built by one person", "never uploaded" (true only because no server exists yet). The manifest holds them with `verdict: UNVERIFIABLE` and a re-review date — logged, not gated.
- **The probe nobody thought to write.** The guard checks what someone encoded. Its real defence against that is sweep #1: uncovered claim-shaped strings fail loudly rather than passing silently.

### Cost

One JSON file, one ~150-line Python file, no dependencies, sub-second. The manifest for the eleven claims below is an hour's work — the proofs are already written.

---

## PART 2 — THE FIX LIST, RANKED

Ranked by *what a visitor is actually shown*, not by defect elegance. Ranks 1–3 fabricate or promise; 4–6 misdescribe; 7–8 are internal disagreement; 9–10 are hygiene.

### 1. `app.js:3053, :3069, :3086-3091` — the ungated preview fabricates a reading
**FALSE.** `reliqPreviewToggle()` is called from both render paths with no `?devnav` guard, so every visitor gets "No account / The profile →". `onReliqPreviewClick` sets `br_holdings=1` and navigates; `arcana-profile.js:124` then unlocks a page built entirely from the hardcoded `SEEKER` (`:53-114`, `BR-3F9A2C` / "The Twice-Kindled Giver") with no on-screen marker that it is sample data. Two clicks turn *"It opens the moment a reading is drawn and kept"* (`app.js:3048`) into a crowned name the visitor never earned.

**Smallest true fix:** apply the gate the code's own comment already prescribes (`app.js:3070-3074`) — wrap the toggle in the `?devnav` check. If it must ship, then: `"The shelf is yours"` → `"A preview of a filled shelf"`; `"What has been kept is held here"` → `"What a filled shelf would hold — sample only."`

### 2. `settings.js:336` — About still promises the Shelf that How-It-Works retracted
**FALSE.** No code path writes reading content anywhere. `drawing-room.js:481` writes `br_dr_sitting_used`; `app.js:3091` writes the boolean `br_holdings`; `arcana-reading.js:600` writes one pairKey→URL. The corrected sentence already sits 27 lines below at `settings.js:363`.

**Replacement:** "Blue Room draws the readings and develops the cards. Each record lives at its own link — keep the link and it reopens exactly as it fell. Come down slowly; the light stays on while you read your way into what you did not know was here."

### 3. `app.js:1460` — "The Shelf inside it holds every reading you have drawn"
**FALSE** (upgraded from fragile). The Shelf holds readings in no browser at all — `arcana-profile.js` has one `localStorage` read and zero writes. Note for whoever fixes it: "saved in this browser only" would ship a *second* untrue claim.

**Replacement:** "Your own page in the archive. Every reading you draw keeps its own link, and the Shelf is where they gather."

### 4. `settings.js:354` — "no chance, no re-roll", asserted over a tarot draw
**FALSE.** `drawing-room.js:70` `sealNow()` = `Date.now()+Math.random()`, folded into the seed at `:480`. Two cuts of the same question return different cards **by design** — `:62-69` calls seed recurrence "the worst possible collision: it reissues." True of the Free Pull and the Birth Reading (`arcana-reading.js:43-44`, pure FNV-1a), false of the one the sentence names.

**Replacement:** "A reading — the Free Pull or the Birth Reading — is produced by a fixed engine built into the page itself: the same inputs always return the same result, no chance, no re-roll. A tarot draw is different: cutting the deck is chance, by design — but once cut, its own link always reopens to the exact same cards."

### 5. `settings.js:445` — the same false determinism, second surface
**FALSE**, same mechanism. This is the propagation pattern the fleet exists to catch, inside a single file.

**Replacement:** "Built by one person, working alone. The reading engines — the birth readings, the Codex tables — are hand-built lookups and formulas, not generative models, and output the same result every time; a tarot draw is deliberately left to chance when it is cut, and is never regenerated afterward. Nothing here is produced by a language model at runtime."

*Adjacent, non-copy:* the comment block at `settings.js:356-362` is two comments spliced together mid-sentence ("…promising a Shelf / a normal thing to want, but it is also the string that ties…"). Harmless to visitors, but it is the BR-S351 note that a future fixer will read to decide whether this is done.

### 6. `app.js:2239` and `app.js:1663-1668` — "yours to keep" / "it stays there, and it stays yours"
**TRUE-BUT-FRAGILE.** Nothing Blue Room controls stores a record; the link genuinely reopens forever and is never paywalled, but persistence is the reader's browser history doing the work. The site's own careful accounting at `settings.js:363` says so.

**Replacement:** "Everything read here is yours to keep — at its own link." · "If you never open a record again, its link still does, and it stays yours."

### 7. `settings.js:341` — "the room looks each one up in the Codex"
**FALSE** (mechanism only; "given, not chosen" is true of all six). `birthReading()` (`arcana-reading.js:116-121`) looks up three — `findByName(by.sun, …)`, `findByName(by.chinese, …)`, life path by digit sum (`:112-114`). The other three are `pick(by.rune, seed+'f')`, `pick(by.trigram, seed+'g')`, `pick(by.hex, seed+'h')` — a hash of name+date mod list length (`:43-44`). A draw *from* the table, not a look-up *in* it.

**Replacement:** "The marks are given, not chosen — three are read from the date itself, three from the name and date together, and each is then read out of the Codex."

### 8. `settings.js:339` — "plus six further systems"
**FALSE.** `codex-data.json` parses to ten top-level systems totalling 222 entries: Western Zodiac 12 · Chinese 17 · numerology 12 · Reading the Cards 0 · Major Arcana 22 · Minor Arcana 56 · Runes 24 · Trigrams 8 · I Ching 64 · Blue Room Lexicon 7. Minus the three tarot systems leaves **seven**. The omitted one is the Chinese zodiac — which supplies the year animal, one of the six birth marks.

**Replacement:** "seventy-eight tarot cards, plus seven further systems — the Western zodiac, the Chinese zodiac, numerology, runes, trigrams, I-Ching hexagrams, and the Blue Room lexicon"

### 9. `app.js:1681-1682` — "five systems"
**TRUE-BUT-FRAGILE.** The parenthetical "which gives two" makes it internally coherent and the trigrams do belong to the I Ching tradition. What is real is the cross-surface disagreement: `app.js:1673` says "ten systems" eight lines earlier (which only reaches ten by counting trigrams and hexagrams separately), `settings.js:341` says six, `arcana-reading.js:358` renders "six systems consulted" to the reader. Three live surfaces say six; this one says five.

**Replacement:** "The six marks are drawn from six systems — astrology, the Chinese year, numerology, the runes, the eight trigrams, and the I Ching. Each is read on its own terms, then filed beside the others."

### 10. `arcana-reading.js:551` — "the same concord, always… forever"
**TRUE-BUT-FRAGILE.** Only `pairKey()→URL` is stored (`:464`, `:600`); the marks are recomputed from the seed every open. So "always" is a promise about a hash function — and the file's own change log (`:30-42`) records that it has already broken once: the seed hash used a float multiply whose low bits were rounded away, was fixed to `Math.imul` (`:43`), and the comment states plainly that an old `?seed=` link now replays different marks. No version pin guards a repeat.

**Replacement:** "The same two names, the same dates — the same concord, for as long as the engine that draws it stands."

### 11. `app.js:3283` — region label disagrees with its own heading
**FALSE** (accessibility). The `.menu__panel--wall` section carries `aria-label="The Reading Rooms"` while `renderWall()` renders `<h2>Blue Room</h2>` at `app.js:2455`; "The Reading Rooms" is now a `menu__draw-doorlabel` scoped to the two doors (`app.js:2480`). BR-S418's own comment (`app.js:2450-2452`) states the house is the headline now; the region label was not updated.

**Replacement:** `aria-label="Blue Room"`

---

**Build order.** Ship 1 first — it is the only one that manufactures a fake record rather than mis-describing a real one. Then 2–5 in one pass (all four are settings.js/app.js copy, all four are the same two root facts: nothing is stored, and cutting a deck is chance). Then stand the guard up with those five as its first manifest records, so 6–11 are fixed *against* a gate rather than in front of one.
