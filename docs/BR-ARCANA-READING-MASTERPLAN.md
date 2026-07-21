# Blue Room Arcana Reading — Master Plan to Masterpiece (corrected)

> Synthesis of a 27-agent plan fleet + a 43-agent knowledge fleet. The raw master plan, adversarial gate, detail-page spec, art brief, and Fable masterstroke are saved alongside; this is the **corrected, decision-ready** version — the gate's fact-checks and the masterstroke's reframe are folded in. Scope split holds throughout: **this team owns design, layout, text, buttons, behaviour; GPT owns art. We brief art, we never make it.**

---

## The one idea that makes it a masterpiece (adopt this)

**The deep page is not an encyclopedia article about a symbol — it is an accession record of *this draw*.**

Ten thousand sites already have a page "about The Tower." A well-built reference site is still just that. But this room's whole voice is an archive's — *"the marks are set," "filed in the open," the mythic treated as filed record* — and an archive holds no general knowledge; it holds *this* object, accessioned *then*, from *this* dig. The moment a deep page speaks generically about a category, the fiction collapses into Wikipedia in costume.

So the deep page, when reached from a reading, reads as a filing:

> **THE TOWER** · Mark IV of VIII · filed under *The Ember-Banked Founder*
> *This mark supplied "Breaker" to the name borne.*
> — and the codex meaning sits below on a visibly quoted **SOURCE · CODEX** plate, not as the page's own prose.

**The proof this is right and not invented:** `arcana-name-engine.js` `assemble()` *already returns* a `derivation` trail mapping every draw to the exact name-fragment it produced (I built it earlier). The per-entry "encyclopedia" plan is structurally unable to display it; neither the plan nor the audit noticed it. This move makes the crown name a **verifiable sum** — click any draw, see the fragment it contributed — which is the whole point of the name.

Two registers, one template:
- **FILED** (URL carries `from=<seed>`): the accession header above, then the quoted codex source.
- **UNFILED** (no seed — a shared or stray link): opens *"UNFILED — codex source only. No record attached,"* then the catalog copy. This also solves sharing with zero machinery: share with `from` and you share your filing; strip it and you share the catalog. No accounts, no save, no gallery.

---

## Corrections the gate forced (these were wrong in the raw plan — do not rebuild them)

1. **`reversed` is Tarot-only (22 entries), not "broadly populated."** The plan grepped the key and counted 166 empty strings. So the ember shadow-read (and its corner dot) is a Tarot-only feature *by data* — correct behaviour, false rationale. Don't promise a shadow read the other six systems don't have.
2. **The corpus is 166 entries, not 154 drawable ones.** The `chinese` block ships **17** (12 animals **+ 5 Wu Xing elements**), and there's an 8th **"Blue Room Lexicon"** block (7 internal-vocabulary entries). The 7 drawable systems = 154. Any loop over `indexCodex()` must **whitelist the 7 drawable keys and hard-exclude `chineseElements` and `lexicon`**, or 12 phantom results leak into marks/routes/browse.
3. **Only one live "Twelve systems" bug, not three.** `index.html` loads only `arcana-name-engine.js` + `arcana-reading.js`; the `compose.js` copies are in the dead `arcana-reading-sheet.html` harness. Fix the one live site.
4. **KILL the entry cipher.** The raw plan's 3×3 hashed dot-matrix is GitHub-identicon noise: provably collision-prone (9 bits = 512 patterns, ~27 expected collisions), its interim (djb2) and final (SHA-1) algorithms don't even match, and it reads "computer-generated" in an artifact whose thesis is "hand-filed record." **Ship the authentic system emblem alone.** Every system already owns a real, recognisable mark — zodiac glyph, tarot numeral, the rune's own shape, the hexagram's six lines, the trigram's three, the animal, the numeral. Meaningful, collision-free, on-canon.
5. **The hero mark is archive GREY, not gold.** A 240px permanently-gold glyph on 154 pages spends the one currency reserved for the crown. Gold stays a focus/hover accent; the emblem earns presence through scale, not gold.
6. **Drop `role=counsel` from the URL** — it changes no lookup. If the same card is drawn twice, both links point at the same holding; the two accessions are distinguished by the reading context, not the URL.
7. **`slugify()` must handle the hard 85%** — CJK, diacritics, bare numbers. Transliterate (Qián→qian), use ordinals for hexagram/trigram, namespace numerology (`lifePath/11`, never a naked `11`). Test against the real names, not "The Tower."
8. **WCAG AA is 4.5:1, not 4.1:1** for body text — lift `--t-ghost` accordingly or restrict it to large/decorative use.
9. **Defer the correspondence engine (old Phase 5).** ~220 cross-tradition links + hand-authored "resonance" pairs is editorial voice a filing archive hasn't earned, on spec. The "Also drawn in this reading" strip (free, from `from=seed`) already satisfies "related."

---

## The three governing decisions (kept from the plan, corrected)

**1. The reading page is never abridged.** Full meaning + reversed + keywords + tag stay inline for every draw. No teaser, no expand/collapse (reads as paywall, breaks canon). The deep page *adds* — it never holds back "the rest of this text."

**2. The right-side affordance is a marginal link + inline emblem, not a sticky rail.** Each draw gets a right-aligned mono **`OPEN THE RECORD →`** real `<a href>` (outside the prose measure; reflows inline under 900px) plus the small emblem beside its slot label, with a 6px ember dot when the entry has a reversed read. Answers asks #2 and #3 today, zero new visual language, fully reversible. The full sticky rail is deferred.

**3. Identity = authentic System Emblem, grey, code-rendered now, GPT-swappable later.** One emblem per result from the real traditional notation, in a fixed-size slot so a future GPT-authored bespoke SVG drops in with no layout change. The GPT brief is written as *"an accession stamp for a holding,"* not *"a logo for a concept."*

**Locked URL contract** (one source of truth or links die): `index.html?dev=arcana-entry&system=<key>&slug=<slug>&from=<seed>`, `system` ∈ the **7 drawable keys** (`sun, chinese, lifePath, tarotMajor, rune, trigram, hexagram`), `slug = slugify(name)`, `from` optional. Reading page constructs it; detail page parses it; both import the same map + same `slugify()`.

---

## Phased roadmap (hard gates)

- **Phase 0 — Truth & a11y.** Fix the live "Twelve"→`draws.length`; fix `[object Error]` catch → in-voice line + `console.error`; chapter divs → `<h2>`; `:focus-visible`, progressbar ARIA, keyword `<ul>`, `<noscript>`, lift ghost to 4.5:1. *No dependencies — ships now.*
- **Phase 1 — The shared contract.** `arcana-system-map.js` (`window.BRArcanaSystems`): the one table — 7 routing keys → codex system string → display label → mono chip → the shared `slugify()` handling CJK/diacritic/number. **Everything below depends on this.**
- **Phase 2 — Emblem marks.** `arcana-marks.js` (`emblemFor(systemKey, entry) → glyph/figure`) + `arcana-marks.css`, two call sites (44px reading, ~200px detail hero, grey). Emblem lookup is a small authored table for tarot numerals / rune glyphs / animals; zodiac/trigram/hexagram parse from data.
- **Phase 3 — Right-side affordance.** `readHTML()` gains the marginal `OPEN THE RECORD →` `<a href>` + inline emblem + ember dot; capture `scrollY` to `sessionStorage` by seed; the page's first real breakpoint (≥900px margin link, reflow below).
- **Phase 4 — The accession page (the masterpiece move).** `entry.html` + `entry.js` + `entry.css` via `?dev=arcana-entry`. Two registers (FILED/UNFILED) consuming the `derivation` trail; canonical order: accession header → contributed-fragment line → quoted **SOURCE · CODEX** plate (meaning + `systemNote`) → keywords → reversed (Tarot only) → deep material from `arcana-knowledge.json` → adjacent-in-sequence → "Also drawn in this reading" → provenance close. Grey hero emblem. Page-turn veil + scroll restore. In-voice not-found.
- **Phase 5 — Knowledge depth.** Wire `arcana-knowledge.json` (already gathered — 164 sourced entries) into the deep page's lower sections under the accuracy gate: attested vs occult-revival vs modern flagged; `contested` claims excluded from flat statements. Tiered depth — full treatment for the 22 majors + 12 signs, leaner sourced template for the 64 hexagrams.

**Highest-leverage move:** build `arcana-system-map.js` first. Once that table is right, the detail template, the emblem generator, and every deep link are pure functions of data already present — the whole feature set ships with no new required JSON field, no build step, and a ~3-line `app.js` diff.

---

## Definition of done
- Reading page: full inline reading intact; every draw carries an emblem + a live `OPEN THE RECORD →` real `<a href>`; true live count; `<h2>` chapters; first breakpoint; a11y (focus-visible, progressbar ARIA, 4.5:1, keyword `<ul>`, `<noscript>`).
- Deep page: one template resolves all 154 by system+slug; **FILED** register renders the accession from the derivation trail; **UNFILED** declares itself; codex quoted as source; grey hero emblem; reload/share-safe; in-voice not-found; back restores scroll.
- Identity: 154 authentic emblems from code; fixed slot ready for the GPT SVG swap; accession-stamp brief handed off.
- Canon held: gold only on crown / slot labels / focus; ember only on the Tarot reversed block + its dot; no pure white; anti-paywall; no rating, diagnosis, prediction, save/share/loop.
- Knowledge: `arcana-knowledge.json` wired under the accuracy gate; nothing contested stated as fact.
