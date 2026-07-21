I have everything I need. The codex is a flat 166-card grid of static meanings (name/tag/keywords/meaning/reversed per entry); the detail pages are the new layer that extends each card outward. Here is the content architecture.

---

# BLUE ROOM — ARCANA DETAIL-PAGE CONTENT ARCHITECTURE v1

## 0. Where this sits

`codex-data.json` is a flat list of 8 system groups; every entry carries exactly five fields — `name`, `tag`, `keywords`, `meaning` (~4 sentences), `reversed` (tarot-only in practice). `codex.html` renders these as a searchable card grid ("the first bank," 166 entries). **The detail page is a second bank layered on top of the first.** Its one job is to extend outward from the existing `meaning` paragraph — never restate it — into sourced provenance, correspondences-as-attributed-systems, and one or two non-transferable textual hooks. The existing five fields become the page's masthead, not its body.

The architecture below is one skeleton across all 7 divinatory systems (the Lexicon is native Blue Room content and out of scope), so 154 pages stay navigable, but the skeleton is a **checklist of slots, not a template to fill with boilerplate.** Distinctness is enforced structurally, at three named choke points, described in §7.

---

## 1. The single load-bearing device: the attestation tier

Every factual claim on every page is stamped with one of three tiers. This is the one move no competitor site makes, it is the brief's core mandate made mechanical, and it is what lets the deadpan-archival voice work — the page files each claim by date rather than flattening centuries into one authorless "ancient wisdom" voice.

- **ATTESTED** — in a primary source, with named text + century. (Ptolemy c.150 CE; the Old English Rune Poem, Cotton Domitian A.ix, 10th c.; the Zhouyi Judgment text.)
- **REVIVAL** — a named 19th–20th c. occultist or institution added it. (Golden Dawn 1888; Waite/Smith 1909; von List; Balliett 1908; Wilhelm 1924 / Baynes 1950; Alan Leo; R.H. Naylor 1930.)
- **MODERN** — no lineage; a post-war or internet-era convention. (merkstave rune reversals; the Life-Path↔Tarot number map; "shadow-work" reversed readings.)

Rendered as a small monospaced stamp inline with the claim, or as a left-margin rail glyph (`▪ATT` / `▪REV` / `▪MOD`). It is a **data attribute on the claim, not decoration** — the QA gate (§8) rejects any tier label not backed by a citation in that entry's source list.

---

## 2. Depth tiers — the three readers

The page serves three readers simultaneously through progressive disclosure. Every section declares which reader it serves; that governs whether it renders open, collapsed, or on-demand.

| Reader | Wants | Gets, by default | Budget |
|---|---|---|---|
| **The skimmer** | "What is this, and is any of it actually old?" | Masthead + cold open + a one-line provenance spine, all open, no clicks | ~60–90 words visible |
| **The interested reader** | The story of how the meaning was made | Record, Provenance, Correspondences, the Hook — open or one-tap expand | 300–600 words |
| **The researcher** | Sources, disputes, variants they can chase | Contested notes, source citations, cross-system links — expand-on-demand | unbounded, but folded away |

**Disclosure rule:** the page opens showing the skimmer layer fully and the interested-reader layer's *headings* with their first sentence visible (a "peek" of ~1 line each), everything below the fold collapsed. Nothing that carries a factual claim is more than one interaction from view — no nested accordions. The researcher tier (contested + sources) is always collapsed by default but always present; its collapsed label states its payload ("3 disputed points," "5 sources") so the researcher knows to open it and the skimmer knows to skip it.

---

## 3. Universal section skeleton

Same order every page. The **hook rotates slots** (§7) so pages don't feel stamped, but the order is fixed for navigability.

1. **MASTHEAD** *(skimmer · always open)* — `name`, `tag`, glyph/line-diagram, `keywords` as chips. Pulled verbatim from `codex-data.json`. This is the only place the existing card content appears; the body never repeats it. The ~4-sentence `meaning` is shown once here, collapsed under a "standing meaning" toggle, as the thing the page extends *from* — labeled as the codex's own gloss, not re-narrated below.

2. **COLD OPEN** *(skimmer · always open · 2–4 sentences)* — starts in the middle of a documented fact: a date, a named scribe, a manuscript, a scholarly argument, an artifact. Banned openers: "Since ancient times…", "[Name] is known for…", "The symbol of…". Same-system swap test applies (§8). This is where distinctness is won; it gets the most editorial effort.

3. **THE RECORD** *(interested · open · attestation-stamped)* — what the primary source actually says, named and dated. Quote sparingly: **≤15 words, in quotation marks, attributed** (copyright discipline). Where poems/decks/translations disagree, state the divergence rather than averaging it.

4. **PROVENANCE SPINE** *(skimmer sees the one-liner; interested expands)* — the timeline: ancient core → revival addition → modern invention, each dated and named. Rendered as an actual horizontal ledger (era → who → what changed), not a disclaimer paragraph bolted on. The **collapsed state is a single sentence** ("Gaming card 1440s · occult reframing 1781 · Golden Dawn system 1888 · current image 1909") — that one line is the skimmer's entire provenance payoff.

5. **CORRESPONDENCES** *(interested · expand · every cell tier-stamped)* — the symbolic apparatus (element / planet / Hebrew letter / trigram pair / Earthly Branch / decan / body part). Rendered as a grid where **every cell carries its tier stamp**, so a reader sees at a glance which cells are primary-source and which are 1888 retrofits. Cells with two attested values (e.g. Prior- vs Later-Heaven trigram directions) show both, labeled — never silently pick one.

6. **THE HOOK** *(interested · open · the anti-template section)* — the one fact/image/line unique to this entry within its own system, pulled to a callout. Mandatory field. This section must never be templated; the swap test (§8) is applied to it specifically.

7. **CONTESTED** *(researcher · collapsed · only if a real dispute exists)* — named popular claim → who originated it → when → what it displaced, narrated with **no verdict**. Let the juxtaposition of dates do the debunking ("Court de Gébelin proposed an Egyptian origin in 1781; no evidence has surfaced since, and the claim still circulates as settled"). Do not manufacture controversy for entries that lack it — an absent Contested block is itself information.

8. **CROSS-SYSTEM LINKS** *(researcher · collapsed · always labeled interpretive)* — the three product resonance pairs (element, archetype, polarity) ship **only here and only labeled "correspondence layer — modern syncretic, not inherited."** Never in The Record or Correspondences. This quarantine is non-negotiable per the meta-research verdict.

9. **SOURCES** *(researcher · collapsed · footer)* — 2–5 citations, primary + academic/museum + one reputable reference. Not footnoted inline; this is the backing list. In-prose citation stays light (name + work + approx. date, woven into the sentence, one parenthetical per section max). No URLs in prose.

10. **CLOSE** — there is none. No summary, no "in conclusion," no character read, no predictive line. The page ends on the last record detail or an open thread in the scholarship. The Sources footer is the visual terminus.

---

## 4. How sources appear (two-layer)

- **In-prose (visible to interested reader):** lightweight, woven — "Waite's own 1910 *Pictorial Key*…", "the Hávamál's rune stanzas…", "Wilhelm's 1924 German, rendered by Baynes in 1950…". One per section, max. Hedge in-line when a claim is secondary or contested ("by one account…", "the attribution is disputed").
- **Sources block (researcher):** the 2–5 backing citations, primary-first. This is where a reader who wants to go deeper gets an actual document pointer — the thing no content-farm page provides.

Never a URL, never a blog, in the prose. Blogs are backing research only; if a fact rests solely on a tertiary/enthusiast source it is either hedged in-prose or cut.

---

## 5. How the voice stays deadpan-archival while carrying scholarship

Structural enforcement, not tone-policing:

- **The masthead/body split** forces every sentence below the fold to be *new record*, which kills the flattering-restatement reflex.
- **The tier stamps** make the analyst's detachment mechanical — the page reports "REVIVAL — Golden Dawn, 1888" rather than asserting a meaning as eternal.
- **Contested-as-narration** (dates, no verdict) replaces both the credulous voice and the condescending "none of this is real" disclaimer — either would break archival tone. The rule: name the claim, name who made it and when, name what it displaced, stop.
- **The banned-opener + swap test** stops the horoscope-column cadence at the one place it creeps in (the first sentence).
- **No-close rule** prevents the inspirational landing every competitor page defaults to.
- **Copyedit sweep** across all 154 for stock transitions ("Interestingly…", "It's worth noting…") and for the Barnum reflex (any second-person "you will / you are").

---

## 6. Data contract (how this attaches to the existing file)

Keep `codex-data.json` untouched as the masthead source. Add a **parallel `codex-detail.json`**, keyed by the exact `name` string per system (so the merge is a lookup, never a fork). Per-entry detail schema:

```
{ system, name,                       // join keys, must match codex-data.json exactly
  cold_open,                          // 2–4 sentences, string
  record:        [ {text, tier, cite} ],
  provenance:    [ {era, who, change, tier} ],   // renders as spine + collapsed one-liner
  correspondences:[ {label, value, tier, cite} ],
  hook:          {text, slot},        // slot ∈ record|correspondences|contested (rotation, §7)
  contested:     [ {claim, originator, year, displaced} ],   // may be empty
  cross_system:  [ {system, entry, note} ],       // always labeled interpretive
  sources:       [ {author, work, year} ] }
```

Rendering reads both files, mastheads from the first, bodies from the second. Absent detail entry = card falls back to today's flat behavior, so the bank can ship incrementally per system.

---

## 7. Distinctness enforcement (the three choke points)

1. **`hook.slot` rotation** — the strongest fact does not always live in section 6. For some entries the hook is in The Record (a manuscript variant), for others in Correspondences (a rulership rupture), for others in Contested (a debunked origin). If the hook is always in the same slot, 22/24/64 pages read as stamped even with different facts. The renderer promotes the flagged slot's block.
2. **Same-system swap test** — for cold open AND hook: if the sentence stays true after changing only the name to a sibling in that system, it is rejected. Applied at write-time and re-run as a QA grep.
3. **Per-system opening register** — tarot opens on an image/deck, runes on a phonetic/etymological fact, hexagrams on line structure, sun signs on a calendrical/astronomical fact, numerology on the arithmetic itself, Chinese zodiac on the Earthly Branch, trigrams on the family-role line pattern. Different entry-point *kind* per system keeps the seven banks from converging.

Per-system knobs (new-material word budgets, from the writing guide): Tarot 450–600 · Trigrams 400–550 · Runes / Zodiac / Chinese 350–480 · Numerology 300–420 · Hexagrams 220–320 (lean — largest set, template-fatigue risk highest).

---

## 8. QA gates (before any system batch ships)

- **Tier audit:** every ATTESTED/REVIVAL stamp traces to a citation in that entry's Sources block; unbacked stamp = fail.
- **Swap-grep:** diff the 64 `hook` and `cold_open` fields within a system; any near-duplicate phrasing = fail.
- **Voice sweep:** zero second-person predictive/flattering sentences; zero banned openers; zero stock transitions; zero on-page "conclusion."
- **Known-myth check:** actively test tarot entries against the Court de Gébelin Egyptian-origin myth, numerology against "ancient Pythagorean calculation," runes against "preserved pagan"/Nazi-preservation framing — these are the field's three most-repeated false-ancient claims.
- **Quarantine check:** the three resonance pairs appear only in Cross-System Links, only labeled interpretive.
- **Batch spot-check** for the 64 hexagrams specifically: audit #30, #45, #60 (mid-batch) for reused boilerplate — long-tail fatigue lives there.

---

---

# WORKED PAGE OUTLINE 1 — TAROT · THE TOWER (XVI)

*Existing codex meaning (masthead only, not restated in body): "sudden, disruptive upheaval that destroys false structures…"* — Budget: ~500 new words.

**§1 MASTHEAD** — The Tower · XVI · Major Arcana · chips: sudden upheaval / destruction / revelation / chaos / awakening · [standing meaning ▾] · [reversed ▾ Waite: disaster narrowly avoided…].

**§2 COLD OPEN** *(open):*
> The Visconti-Sforza deck, the oldest tarot cards to survive intact (Milan, c.1450), contains no card resembling this one. The earliest images under the trump's various names show a bolt striking a tree, or a fortress under siege — not a crowned tower shedding its inhabitants. The falling-crown composition most readers assume is original was fixed by Pamela Colman Smith in 1909, under Waite's direction.

**§3 THE RECORD** *(open · stamped):* Waite's *Pictorial Key* (1910) ▪ATT-to-Waite gives the upright as ruin, disruption, and "unforeseen catastrophe" (≤15-word quote, cited). Earlier French decks title it *La Maison Dieu* — the House of God — not a tower at all. The name is unstable across traditions: at least five distinct historical titles, with no settled meaning behind the image.

**§4 PROVENANCE SPINE** — collapsed one-liner for skimmer: *"Fortress/tree image 15th c. · reframed as 'House of God' 18th c. · Mars + path assigned 1888 · crown-and-figures fixed 1909."* Expanded ledger: 15th c. Italian trump (civic/gaming) → 18th c. French *Maison Dieu* → Golden Dawn 1888 (REVIVAL) → RWS 1909 (REVIVAL, Smith's composition).

**§5 CORRESPONDENCES** *(grid, stamped):* Planet Mars — ▪REV Golden Dawn 1888 · Hebrew letter Peh — ▪REV Lévi/GD, absent from Renaissance tarocchi · Tree-of-Life path Netzach–Hod — ▪REV · Element (disputed, no GD consensus) — ▪flag.

**§6 THE HOOK** *(slot: The Record — etymological chaos):*
> Of all 22 trumps this is the one whose *name* never stabilized — tower, House of God, lightning, fire of heaven — a card defined by the absence of a fixed referent rather than by a fixed one.

**§7 CONTESTED** *(collapsed · "1 point"):* The "ancient tower of Babel" reading is a modern gloss; the medieval image it most plausibly descends from is the *Maison Dieu* / struck fortress, and the Babel identification postdates the imagery.

**§8 CROSS-SYSTEM** *(collapsed · interpretive):* number XVI → Life Path 7 in modern numerology-tarot content — MODERN convention, no historical link.

**§9 SOURCES:** Waite, *Pictorial Key to the Tarot* (1910); Kaplan, *Encyclopedia of Tarot* vol. 1; Met Museum tarot essay. *No close.*

---

# WORKED PAGE OUTLINE 2 — RUNE · ANSUZ (Elder Futhark, 4th)

*Existing codex meaning (masthead only): "the breath or voice of the divine… communication, wisdom, inspired speech."* — Budget: ~450 new words. Opening register: etymological.

**§1 MASTHEAD** — Ansuz · ᚨ · A · "a god (Odin) / divine breath" · chips: communication / wisdom / inspiration / divine message / speech · 4th rune, 1st ætt. (reversed field empty in codex — the page notes reversals are a modern practice, §7.)

**§2 COLD OPEN** *(open):*
> The Old English Rune Poem gives this letter's stanza to *Os* and calls it the source of speech, punning on the Latin loanword *ōs*, "mouth." The later Old Norwegian poem assigns the phonetically matching rune, *Óss*, to a river's estuary; the Old Icelandic poem gives it to Odin — "aged Gautr, prince of Ásgard." Three medieval traditions, three centuries and two languages apart, disagreeing about what one letter-shape stood for.

**§3 THE RECORD** *(open · stamped):* Proto-Germanic *\*ansuz*, "a god, one of the Æsir" ▪ATT (reconstructed). Elder Futhark inscriptions of the 3rd–8th c. use the letter simply as the sound /a/ ▪ATT; the "divine voice" meaning is reconstructed backward through the disagreeing poems, not stated in any surviving Migration-Period text.

**§4 PROVENANCE SPINE** — one-liner: *"Sound-value /a/ 3rd–8th c. · rune-poem meanings 9th–13th c. (three, divergent) · Armanen 'Os' 1908 · divination revival 1980s."* Expanded: inscriptional /a/ → rune-poem layer (with a Christian-scribal overlay in the OE poem) → von List Armanen (REVIVAL) → modern divination meanings (MODERN).

**§5 CORRESPONDENCES** *(grid, stamped):* Deity Odin — ▪ATT via Old Icelandic poem + Hávamál · Anglo-Saxon Futhorc split: Ansuz → *Os, Æsc, Ac* (three runes) — ▪ATT · planet/element/tarot links — ▪REV Golden Dawn-lineage, no textual basis · reversibility (merkstave) — ▪MOD.

**§6 THE HOOK** *(slot: Correspondences — the split):*
> When the Anglo-Saxons expanded the futhark, this single rune fissioned into three separate letters (*Os, Æsc, Ac*) to track sound changes in Old English — one of the few Elder Futhark runes to leave more descendants than it had forms.

**§7 CONTESTED** *(collapsed · "2 points"):* (a) The upright/reversed "merkstave" reading is absent from all three rune poems and is a post-1980 divination convention — hence the empty reversed field. (b) The mythological Odin-anchor is genuine (Hávamál) but the OE poem's version is already Christianized, so "pure pagan voice of the god" overstates the record.

**§8 CROSS-SYSTEM** *(collapsed · interpretive):* rune "active/receptive" polarity vs. trigram yin/yang — structural echo only, independent traditions, MODERN comparative move.

**§9 SOURCES:** Old English Rune Poem (Cotton Domitian A.ix, 10th c.); Old Icelandic & Old Norwegian Rune Poems; *Poetic Edda*, Hávamál. *No close.*

---

# WORKED PAGE OUTLINE 3 — I CHING · HEXAGRAM 1, QIÁN (乾)

*Existing codex meaning (masthead only): "Pure yang energy, doubled… sustained effort, firm perseverance…"* — Budget: ~300 new words (lean). Opening register: line structure.

**§1 MASTHEAD** — 1 · The Creative (Qián) 乾 · "Heaven over Heaven" · ䷀ · chips: strength / initiative / creative power / perseverance / leadership.

**§2 COLD OPEN** *(open · line-structure register):*
> Six unbroken lines, the only all-yang figure in the sequence — its structural opposite, Hexagram 2 (Kūn), is the only all-yin one. Qián opens the received text not by accident of ordering: the Ten Wings commentary treats first position as cosmologically deliberate, the single purest statement before anything is mixed.

**§3 THE RECORD** *(open · stamped):* The Judgment is four characters — *yuán hēng lì zhēn* ▪ATT (Zhouyi) — which Wilhelm renders "sublime success, furthering through perseverance" ▪REV (Wilhelm 1924 / Baynes 1950), and Legge more flatly as "great, penetrating, advantageous, correct." The Image (*xiàng*): heaven's motion is unceasing; the superior person makes themselves strong without rest.

**§4 PROVENANCE SPINE** — one-liner: *"Zhou-era Judgment/line texts ~1000–750 BCE · Ten Wings commentary Warring States · Wilhelm German 1924 · Baynes/Jung English 1950."*

**§5 CORRESPONDENCES** *(grid, stamped):* Doubled trigram Qián/Qián · family role: Father ▪ATT (Shuo Gua) · Later-Heaven direction NW / Prior-Heaven direction S — both shown, ▪layer-3 retrofit · King Wen pair: Hexagram 2 Kūn.

**§6 THE HOOK** *(slot: Contested-adjacent Record — the dragon line + the Wenyan):*
> Qián's line texts run a sequence of dragons — the "hidden dragon" at the bottom, the "flying dragon in the heavens" at the fifth, the "arrogant dragon" who "will have cause to repent" at the top. Only this hexagram and Kūn receive the *Wényán*, a dedicated Ten Wings commentary given to no other of the 64.

**§7 CONTESTED** *(collapsed · "2 points"):* (a) "King Wen composed this" is traditional attribution, not established fact — modern scholarship (Shaughnessy, Rutt) disputes authorship and dating. (b) Wilhelm-Baynes carries a Jungian gloss (via the 1950 foreword) that later sinology treats as interpretation, not the Zhou text — flagged once at system level, noted here.

**§8 CROSS-SYSTEM** *(collapsed · interpretive):* Qián ↔ numerology "1"/leadership — MODERN occult-revival pairing, no Chinese lineage.

**§9 SOURCES:** *Zhouyi* (Judgment & line texts); the Ten Wings (*Tuàn*, *Xiàng*, *Wényán*); Wilhelm/Baynes, *The I Ching* (1950). *No close.*

---

**Key findings for the caller:** (1) The detail pages are a *second* data file (`codex-detail.json`) joined to the existing `codex-data.json` by `name` — no edit to the shipped codex, incremental per-system rollout. (2) The one differentiator from every competitor is the **per-claim attestation tier (ATTESTED/REVIVAL/MODERN)** rendered as a data-backed stamp, not prose. (3) Distinctness is guaranteed by three mechanical gates — `hook.slot` rotation, the same-system swap test, and a per-system opening register — not by writing effort. (4) The three product "resonance pairs" are quarantined to a labeled interpretive Cross-System block and never touch the sourced sections. (5) Progressive disclosure maps cleanly to the three readers: skimmer gets masthead + cold open + a one-line provenance spine with zero clicks; researcher gets contested + sources folded away but always present.