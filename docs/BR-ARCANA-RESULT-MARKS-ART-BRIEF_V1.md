# Arcana Result Marks — "Sealed Marks" Art Brief (V1)

> Hand this to the third-party artist (GPT) who produces the 154 result identity marks. It is written to be executed by someone who **cannot ask us questions.** Everything you need — the concept, the grammar, the exact emblem for every entry, the exact cipher for every entry, the exact filename for every file — is in this document. Where a value is given (Appendix A–G), you **transcribe** it; you do not invent, interpret, or "improve" it. Blue Room does not draw these marks. You do. But you draw them from our table, not from your taste.

---

## 0. The one law

**These are classification marks, not icons.** Each mark is the same two shapes in the same two positions, 154 times, with only the two values swapped. If your instinct is to make a mark *look like its meaning* — a tower that topples, a sun that shines, a dragon that coils — you have already failed. The Tower and The Sun are the same object with a different numeral and a different dot-pattern. A stranger flipping through all 154 must feel they are holding **one archive's filing stamps**, not 154 illustrations. Restraint is the entire brief. When in doubt, make it plainer.

---

## 1. The concept — the Sealed Mark

Every result is stamped with a **two-register mark**, read top-to-bottom:

- **Top register — the System Emblem (~40% of height).** The real, traditional glyph of the system, transcribed exactly: the zodiac sign, the tarot numeral, the Elder Futhark rune, the trigram, the drawn hexagram line-stack, the Chinese year-animal character, the life-path numeral. Identical geometry across every entry in a system; only the glyph swaps. This is what lets a viewer recognise *"this is a rune"* before reading a word.
- **A single 1px hairline rule** at the 40% mark, separating the two registers.
- **Bottom register — the Entry Cipher (~60% of height).** A 3×3 grid of nine cells. Each cell is either a **filled dot** (`1`) or an **open ring** (`0`), per a fixed nine-character pattern we computed for every entry (Appendix). The cipher is a name-seeded texture — the mark's fingerprint — not something you design.

Identity is carried by **emblem and cipher jointly.** The emblem is always unique within a system; the cipher adds a second axis of difference. You never need to make a mark "distinct" by hand — the table already did it.

---

## 2. The unifying visual grammar (all 7 systems read as one archive)

Non-negotiable constants — identical in every one of the 154 files:

1. **One canvas:** 96×96 viewBox, square, transparent.
2. **One construction:** emblem top, hairline, cipher grid bottom — same three zones, same proportions, same positions, every time.
3. **One colour:** none. Single-colour line art on `currentColor` (see §4). No fills except the stroke/shape in that one inherited colour.
4. **One stroke:** 2px stroke weight at 96px scale, uniform across all 154 files. Same line cap (round), same corner treatment, everywhere.
5. **One grid:** the cipher is always the same 3×3 lattice at the same coordinates. A filled cell is a solid disc; an empty cell is a ring (stroked circle, hollow centre) of the same outer diameter — so filled and empty read as the *same object in two states*, never as two different sizes.
6. **One margin:** 8px clear-space inside the canvas on all four sides. Nothing touches the edge.
7. **No flourish anywhere:** no drop shadow, no bevel, no gradient, no dimensional rendering, no texture, no decorative frame, no baseline drift. Flat vector only.

The system varies in exactly **one place:** which emblem sits in the top register. The cipher varies per entry. Nothing else moves. That single discipline is what makes 154 files a coherent set instead of 154 drawings.

---

## 3. Canvas, format, sizing

| Spec | Value |
|---|---|
| Format | **SVG only.** No PNG/raster tier, ever. |
| viewBox | `0 0 96 96` |
| Aspect | Square, 1:1 |
| Background | Transparent (no `<rect>` fill behind the art) |
| Colour source | `currentColor` on every stroke/fill — never a baked hex |
| Stroke weight | 2px at 96px scale, uniform |
| Inner margin | 8px clear-space all sides (art lives in the inner 80×80) |
| Emblem zone | Top ~40% (roughly y = 8–40) |
| Divider | 1px hairline at ~y = 44, spanning the inner width |
| Cipher zone | Bottom ~60% (roughly y = 48–88), 3×3 lattice centred |
| Legibility floors | Must stay crisp and legible at **24px** (reading-page inline size) AND **240px** (detail-page hero). Test both before delivering any batch. |
| Optimisation | Clean hand-authorable SVG: integer/one-decimal coords, no editor cruft, no embedded metadata, no `<style>` blocks with hardcoded colour. |

**Prototype-first gate:** the hexagram 6-bar stack is the tightest emblem to fit. Draw **one** hexagram mark first and verify the six bars stay legible at 24px inside the 8px margin before batching the other 63. If they crowd, the whole hexagram set may take a fractionally taller emblem zone — decide it once, on the prototype, then hold it constant across all 64.

---

## 4. Colour constraints — gold is currency, so the mark carries no colour at all

Blue Room's canon: **gold (`#c9a35c`–`#e2c489`) is currency — it is spent, never decorative.** A mark file that bakes gold into itself would spend the currency 154 times over and destroy it.

Therefore the rule is absolute and simple:

- **The SVG contains no colour value. None.** Every stroke and fill is `currentColor`. There is no `#c9a35c`, no `gold`, no `#000`, no `#fff`, no ember `#b25f39`, no grey — anywhere in the file.
- The **page** supplies the colour by setting CSS `color` on the mark's container. At rest the mark inherits ghost-grey; on focus/hover of its "explore" link it inherits gold; on the detail-page hero it inherits gold permanently. The exact same file renders quiet-grey in one context and consecrated-gold in another **because it declared no colour of its own.**
- This is the *only* way a mark "uses gold": it never holds it — it inherits it, and only in the two moments the page grants it (focus, and hero). That keeps gold a spent event, not a painted-on default.
- **Ember is not yours to touch.** Ember has exactly one reserved role in the product (the reversed/shadow read). If a drawn result is reversed, the page draws a 6px ember indicator dot at the mark's corner **at runtime, in CSS.** You do **not** add it, and you do **not** leave room for it. No ember appears in any SVG.

If any of the 154 files contains a literal colour token, the batch is rejected.

---

## 5. Per-system emblem rules (the top register)

Transcribe the emblem from the Appendix. Do not source glyphs from memory — use the exact character/numeral/shape given per row. Notes per system:

- **A · Sun sign (12).** Emblem = the Unicode zodiac glyph (♈–♓), drawn as clean vector line art at consistent weight. Not a picture of the constellation, not a mythic figure — the classification symbol only.
- **B · Year animal (12).** Emblem = the **traditional Chinese character** given per row (鼠, 牛, 虎 …), rendered as even-weight vector strokes. Not an animal silhouette, not a cartoon. The character is the mark.
- **C · Life path (12).** Emblem = a plain geometric numeral matching mono proportions. Digits 1–9 single; **master numbers 11 / 22 / 33 stay unreduced, drawn as two digits.** No numerological ornament.
- **D · Major Arcana (22).** Emblem = the **Roman numeral** (0, I–XXI) — this matches the cards' own numbering. Never a miniature of the card's illustration.
- **E · Elder Futhark (24).** Emblem = the **literal rune shape** (ᚠ, ᚢ, ᚦ …) as straight-stroke vector, angular and even. Not a decorated or "runic-flavoured" invention — the real stave.
- **F · Trigram (8).** Emblem = the trigram symbol (☰–☷): three horizontal bars, each solid (yang) or centre-split (yin), evenly spaced. Draw these as bars, matched to the cipher/hexagram bar style, not a shrunk Unicode paste.
- **G · Hexagram (64).** Emblem = the **drawn six-bar King Wen line-stack** — six horizontal bars stacked bottom-to-top, each solid (yang) or centre-split (yin). **Do not use the tiny Unicode hexagram glyph** (illegible at size). Build the stack from the `tag`, which reads *Upper over Lower* (e.g. "Water over Heaven"): the lower trigram is the bottom three bars, the upper trigram the top three. The Appendix gives each hexagram's tag; the trigram bar-patterns are the eight standard forms in System F.

The **emblem geometry is identical across every entry in a system** — same size, same position, same weight. Only the glyph value changes.

---

## 6. The entry cipher (the bottom register) — transcribe, never compute, never adjust

We computed the cipher for all 154 entries so there is zero room for artist error or drift:

- **Rule (for reference only — you do not run it):** cipher = the first 9 bits of `SHA-1(exact entry name, UTF-8)`, read most-significant-bit first, laid **row-major** into the 3×3 grid — bit 0 = top-left, bit 2 = top-right, bit 8 = bottom-right.
- **Encoding:** `1` = filled disc, `0` = open ring.
- **You transcribe the 9-character string from the Appendix.** Example: `111100011` (The Tower) →
  ```
  ● ● ●
  ● ○ ○
  ○ ● ●
  ```
- **All-filled and all-empty are valid.** Hexagram 60 (Limitation) is `000000000` — nine open rings. That is correct, not a bug. Draw it.
- **Cipher collisions between two different entries are expected and acceptable.** Nine bits is 512 patterns; a handful of entries share a cipher (e.g. **Uruz/Ingwaz** in runes; hexagrams **36/61** and **49/58**; and pairs across different systems). This is fine — the **emblem** always disambiguates, so no two full marks are ever identical. **Never alter a cipher to avoid a collision.** The table is the source of truth; a "fixed" cipher can no longer be regenerated from the name and breaks the system. Transcribe exactly.

---

## 7. What makes a mark FAIL review

A file is rejected on **any** of these:

1. **Any literal colour** in the SVG (hex, named colour, `black`, `white`, gold, ember) instead of `currentColor`.
2. **Baked background** — any opaque rect/shape behind the art.
3. **Illustration creep** — the emblem depicts the *meaning* (a falling tower, a shining sun, a coiled dragon) instead of transcribing the classification glyph/numeral/character.
4. **Invented glyph** — a zodiac/rune/trigram/character/numeral that isn't the exact Appendix value (wrong rune, stylised numeral, decorative rune "in the spirit of").
5. **Cipher mismatch** — dot pattern doesn't match the Appendix string bit-for-bit, or filled/ring are swapped, or the grid is transposed/mirrored.
6. **Cipher "correction"** — a collision or an all-empty/all-filled pattern was changed to look more unique.
7. **Inconsistent construction** — different stroke weight, different margin, different grid position, filled dots and rings drawn at different diameters, or the two registers at different proportions than the rest of the set.
8. **Flourish** — shadow, bevel, gradient, texture, frame, glow, or dimensional rendering.
9. **Legibility failure** — emblem or cipher muddies at 24px, or the hexagram bars merge.
10. **Ember present** — any reversed/shadow indicator drawn into the file.
11. **Wrong filename** — doesn't match the Appendix filename exactly (see §9/§10).
12. **A file produced for an excluded entry** (see §9).

---

## 8. Worked examples (transcribe these to internalise the pattern)

Each is: emblem (from §5/Appendix) over hairline over the 9-cell cipher (from Appendix), `currentColor`, 2px, 8px margin.

1. **`sun-aries.svg`** — Emblem: ♈ (zodiac Aries). Cipher `111101001`:
   `● ● ●  /  ● ○ ●  /  ○ ○ ●`
2. **`tarot-16-tower.svg`** — Emblem: Roman numeral **XVI** (not a tower). Cipher `111100011`:
   `● ● ●  /  ● ○ ○  /  ○ ● ●`
3. **`rune-01-fehu.svg`** — Emblem: the stave **ᚠ** (single vertical with two upward-slanting arms). Cipher `110000011`:
   `● ● ○  /  ○ ○ ○  /  ○ ● ●`
4. **`animal-dragon.svg`** — Emblem: the character **龍** (not a drawn dragon). Cipher `111010110`:
   `● ● ●  /  ○ ● ○  /  ● ● ○`
5. **`lifepath-22.svg`** — Emblem: geometric **22**, two digits, unreduced. Cipher `000100101`:
   `○ ○ ○  /  ● ○ ○  /  ● ○ ●`
6. **`trigram-qian.svg`** — Emblem: **☰** (three solid bars). Cipher `100011010`:
   `● ○ ○  /  ○ ● ●  /  ○ ● ○`
7. **`hexagram-01-qian.svg`** — Emblem: six **solid** bars (Heaven over Heaven). Cipher `100001100`:
   `● ○ ○  /  ○ ○ ●  /  ● ○ ○`
8. **`hexagram-60-jie.svg`** — Emblem: Water over Lake (top three bars = ☵ Water, bottom three = ☱ Lake). Cipher `000000000` — nine open rings (valid):
   `○ ○ ○  /  ○ ○ ○  /  ○ ○ ○`

Note how examples 1 and 8-vs-others differ only by the two values. That sameness is the deliverable.

---

## 9. What must NOT be produced

- **No marks for the 5 Wu Xing elements** (Wood, Fire, Earth, Metal, Water). They live inside the Chinese-zodiac data block but are **not results** — the page renders them as an inline element *badge* on the year-animal entry, not as their own draw. Producing element marks is out of scope. Year animals = **12**, not 17.
- **No marks for the "Blue Room Lexicon"** entries (Metrics, and its six siblings). That block is internal UI glossary, not a divination result. Zero marks.
- **No colour, no raster, no second file format** (covered in §4/§3, restated because it is a hard reject).
- **No reversed/ember indicator** baked into any file (the page adds it at runtime).
- **No bespoke per-entry art, no photography, no mascots, no scene, no “hero” variant.** One construction, 154 times.
- **No crown mark and no background** — those are separate, GPT-owned art tracks brief'd elsewhere. This brief is *only* the 154 result marks.
- **No extra sizes/exports.** One 96px SVG per result; the page scales it.

**Total deliverable: exactly 154 SVG files.** 12 sun + 12 year-animal + 12 life-path + 22 major-arcana + 24 rune + 8 trigram + 64 hexagram = 154.

---

## 10. Delivery manifest

- **154 SVG files, one flat directory** (`/assets/seals/`). No per-system subfolders — the filename prefix sorts them.
- **Filenames are given per-row in the Appendix and are authoritative** — transcribe exactly, lowercase, `.svg`. Scheme, for reference: `sun-<sign>`, `animal-<animal>`, `lifepath-<NN>` (zero-padded), `tarot-<NN>-<name>` (numeral-ordered), `rune-<NN>-<name>` (Futhark-ordered), `trigram-<pinyin>`, `hexagram-<NN>-<pinyin>` (King Wen-ordered). Numeric prefixes keep every set machine-sortable in canonical order.
- **Batch order (prototype gates between):** (1) draw `hexagram-01-qian.svg` as the fit prototype and clear the 24px legibility gate; (2) one full system end-to-end (recommend Sun, 12) as the construction template; (3) the remaining six systems. Deliver one worked SVG of each of the three example types (a numeral system, a character/rune system, the hexagram stack) for sign-off before the full 154 run.
- **Regenerability:** because every mark is `emblem(Appendix) + cipher(Appendix)` and nothing is hand-judged, any lost file can be reproduced exactly from this document. Preserve that — never introduce a hand-decision that can't be read back out of the table.

---

# Appendix — the 154 emblem + cipher + filename tables

Transcribe per row: **Emblem** into the top register, **Cipher** into the 3×3 (row-major, `1`=filled disc, `0`=open ring), save as **Filename**. These values are the source of truth.
### A. SUN SIGN — emblem = Unicode zodiac glyph

| Entry | Emblem | Filename | Cipher |
|---|---|---|---|
| Aries | ♈ | `sun-aries.svg` | `111101001` |
| Taurus | ♉ | `sun-taurus.svg` | `110001011` |
| Gemini | ♊ | `sun-gemini.svg` | `110111011` |
| Cancer | ♋ | `sun-cancer.svg` | `000001111` |
| Leo | ♌ | `sun-leo.svg` | `110011111` |
| Virgo | ♍ | `sun-virgo.svg` | `000011110` |
| Libra | ♎ | `sun-libra.svg` | `110010111` |
| Scorpio | ♏ | `sun-scorpio.svg` | `001001100` |
| Sagittarius | ♐ | `sun-sagittarius.svg` | `000101010` |
| Capricorn | ♑ | `sun-capricorn.svg` | `110010011` |
| Aquarius | ♒ | `sun-aquarius.svg` | `001111100` |
| Pisces | ♓ | `sun-pisces.svg` | `110110100` |

### B. YEAR ANIMAL — emblem = traditional Chinese character

| Entry | Emblem | Filename | Cipher |
|---|---|---|---|
| Rat | 鼠 | `animal-rat.svg` | `001101001` |
| Ox | 牛 | `animal-ox.svg` | `001011100` |
| Tiger | 虎 | `animal-tiger.svg` | `110111010` |
| Rabbit | 兔 | `animal-rabbit.svg` | `001010011` |
| Dragon | 龍 | `animal-dragon.svg` | `111010110` |
| Snake | 蛇 | `animal-snake.svg` | `100100001` |
| Horse | 馬 | `animal-horse.svg` | `001001101` |
| Goat | 羊 | `animal-goat.svg` | `000011100` |
| Monkey | 猴 | `animal-monkey.svg` | `010010111` |
| Rooster | 雞 | `animal-rooster.svg` | `100011111` |
| Dog | 狗 | `animal-dog.svg` | `101110000` |
| Pig | 豬 | `animal-pig.svg` | `011101101` |

### C. LIFE PATH — emblem = geometric numeral (master numbers 11/22/33 unreduced, two digits)

| Entry | Emblem | Filename | Cipher |
|---|---|---|---|
| 1 | 1 | `lifepath-01.svg` | `001101010` |
| 2 | 2 | `lifepath-02.svg` | `110110100` |
| 3 | 3 | `lifepath-03.svg` | `011101111` |
| 4 | 4 | `lifepath-04.svg` | `000110110` |
| 5 | 5 | `lifepath-05.svg` | `101011000` |
| 6 | 6 | `lifepath-06.svg` | `110000011` |
| 7 | 7 | `lifepath-07.svg` | `100100000` |
| 8 | 8 | `lifepath-08.svg` | `111111100` |
| 9 | 9 | `lifepath-09.svg` | `000010101` |
| 11 | 11 | `lifepath-11.svg` | `000101111` |
| 22 | 22 | `lifepath-22.svg` | `000100101` |
| 33 | 33 | `lifepath-33.svg` | `101101100` |

### D. MAJOR ARCANA — emblem = Roman numeral (0, I–XXI)

| Entry | Emblem | Filename | Cipher |
|---|---|---|---|
| The Fool | 0 | `tarot-00-fool.svg` | `111000000` |
| The Magician | I | `tarot-01-magician.svg` | `101101110` |
| The High Priestess | II | `tarot-02-high-priestess.svg` | `101001000` |
| The Empress | III | `tarot-03-empress.svg` | `011101000` |
| The Emperor | IV | `tarot-04-emperor.svg` | `011011011` |
| The Hierophant | V | `tarot-05-hierophant.svg` | `111110101` |
| The Lovers | VI | `tarot-06-lovers.svg` | `100100110` |
| The Chariot | VII | `tarot-07-chariot.svg` | `100011111` |
| Strength | VIII | `tarot-08-strength.svg` | `001001001` |
| The Hermit | IX | `tarot-09-hermit.svg` | `110101001` |
| Wheel of Fortune | X | `tarot-10-wheel-of-fortune.svg` | `011011101` |
| Justice | XI | `tarot-11-justice.svg` | `011101011` |
| The Hanged Man | XII | `tarot-12-hanged-man.svg` | `011010100` |
| Death | XIII | `tarot-13-death.svg` | `110110001` |
| Temperance | XIV | `tarot-14-temperance.svg` | `111101001` |
| The Devil | XV | `tarot-15-devil.svg` | `110000010` |
| The Tower | XVI | `tarot-16-tower.svg` | `111100011` |
| The Star | XVII | `tarot-17-star.svg` | `001100011` |
| The Moon | XVIII | `tarot-18-moon.svg` | `110010000` |
| The Sun | XIX | `tarot-19-sun.svg` | `011010011` |
| Judgement | XX | `tarot-20-judgement.svg` | `001110001` |
| The World | XXI | `tarot-21-world.svg` | `111000001` |

### E. ELDER FUTHARK — emblem = rune shape (Futhark order 01–24)

| Entry | Emblem | Filename | Cipher |
|---|---|---|---|
| Fehu | ᚠ | `rune-01-fehu.svg` | `110000011` |
| Uruz | ᚢ | `rune-02-uruz.svg` | `000001111` |
| Thurisaz | ᚦ | `rune-03-thurisaz.svg` | `010000110` |
| Ansuz | ᚨ | `rune-04-ansuz.svg` | `100000111` |
| Raidho | ᚱ | `rune-05-raidho.svg` | `101100101` |
| Kenaz | ᚲ | `rune-06-kenaz.svg` | `011010010` |
| Gebo | ᚷ | `rune-07-gebo.svg` | `000101100` |
| Wunjo | ᚹ | `rune-08-wunjo.svg` | `011110100` |
| Hagalaz | ᚺ | `rune-09-hagalaz.svg` | `101111101` |
| Nauthiz | ᚾ | `rune-10-nauthiz.svg` | `001001010` |
| Isa | ᛁ | `rune-11-isa.svg` | `000010101` |
| Jera | ᛃ | `rune-12-jera.svg` | `010001011` |
| Eihwaz | ᛇ | `rune-13-eihwaz.svg` | `100000010` |
| Perthro | ᛈ | `rune-14-perthro.svg` | `101011111` |
| Algiz | ᛉ | `rune-15-algiz.svg` | `001001110` |
| Sowilo | ᛊ | `rune-16-sowilo.svg` | `100111001` |
| Tiwaz | ᛏ | `rune-17-tiwaz.svg` | `101100011` |
| Berkano | ᛒ | `rune-18-berkano.svg` | `110011101` |
| Ehwaz | ᛖ | `rune-19-ehwaz.svg` | `101001101` |
| Mannaz | ᛗ | `rune-20-mannaz.svg` | `110001101` |
| Laguz | ᛚ | `rune-21-laguz.svg` | `101111010` |
| Ingwaz | ᛜ | `rune-22-ingwaz.svg` | `000001111` |
| Dagaz | ᛞ | `rune-23-dagaz.svg` | `011110001` |
| Othala | ᛟ | `rune-24-othala.svg` | `100010111` |

### F. TRIGRAM — emblem = trigram symbol

| Entry | Emblem | Filename | Cipher |
|---|---|---|---|
| ☰ Qián · Heaven | ☰ | `trigram-qian.svg` | `100011010` |
| ☷ Kūn · Earth | ☷ | `trigram-kun.svg` | `010001001` |
| ☳ Zhèn · Thunder | ☳ | `trigram-zhen.svg` | `011111001` |
| ☵ Kǎn · Water | ☵ | `trigram-kan.svg` | `010000011` |
| ☶ Gèn · Mountain | ☶ | `trigram-gen.svg` | `011000000` |
| ☴ Xùn · Wind/Wood | ☴ | `trigram-xun.svg` | `000010100` |
| ☲ Lí · Fire | ☲ | `trigram-li.svg` | `100110100` |
| ☱ Duì · Lake | ☱ | `trigram-dui.svg` | `001101111` |

### G. HEXAGRAM — emblem = drawn 6-bar King Wen line stack (NOT the Unicode glyph). `tag` = Upper over Lower.

Bar = solid (yang) or centre-split (yin), stacked bottom-to-top. Bottom trigram of the stack is the LOWER named in the tag.

| Entry | Emblem | Filename | Cipher |
|---|---|---|---|
| 1 · The Creative (Qián) | (6-bar stack — draw per tag) | `hexagram-01-qian.svg` | `100001100` |
| 2 · The Receptive (Kūn) | (6-bar stack — draw per tag) | `hexagram-02-kun.svg` | `010100111` |
| 3 · Difficulty at the Beginning (Zhūn) | (6-bar stack — draw per tag) | `hexagram-03-zhun.svg` | `110100110` |
| 4 · Youthful Folly (Méng) | (6-bar stack — draw per tag) | `hexagram-04-meng.svg` | `101101110` |
| 5 · Waiting (Xū) | (6-bar stack — draw per tag) | `hexagram-05-xu.svg` | `111000111` |
| 6 · Conflict (Sòng) | (6-bar stack — draw per tag) | `hexagram-06-song.svg` | `100001110` |
| 7 · The Army (Shī) | (6-bar stack — draw per tag) | `hexagram-07-shi.svg` | `111010110` |
| 8 · Holding Together (Bǐ) | (6-bar stack — draw per tag) | `hexagram-08-bi.svg` | `100110010` |
| 9 · The Taming Power of the Small (Xiǎo Chù) | (6-bar stack — draw per tag) | `hexagram-09-xiao-chu.svg` | `100010010` |
| 10 · Treading (Lǚ) | (6-bar stack — draw per tag) | `hexagram-10-lu.svg` | `100111000` |
| 11 · Peace (Tài) | (6-bar stack — draw per tag) | `hexagram-11-tai.svg` | `101001101` |
| 12 · Standstill [Stagnation] (Pǐ) | (6-bar stack — draw per tag) | `hexagram-12-pi.svg` | `101111000` |
| 13 · Fellowship with Men (Tóng Rén) | (6-bar stack — draw per tag) | `hexagram-13-tong-ren.svg` | `001101001` |
| 14 · Possession in Great Measure (Dà Yǒu) | (6-bar stack — draw per tag) | `hexagram-14-da-you.svg` | `100101011` |
| 15 · Modesty (Qiān) | (6-bar stack — draw per tag) | `hexagram-15-qian.svg` | `011101101` |
| 16 · Enthusiasm (Yù) | (6-bar stack — draw per tag) | `hexagram-16-yu.svg` | `011101110` |
| 17 · Following (Suí) | (6-bar stack — draw per tag) | `hexagram-17-sui.svg` | `000110010` |
| 18 · Work on What Has Been Spoiled (Gǔ) | (6-bar stack — draw per tag) | `hexagram-18-gu.svg` | `011010111` |
| 19 · Approach (Lín) | (6-bar stack — draw per tag) | `hexagram-19-lin.svg` | `100100101` |
| 20 · Contemplation (Guān) | (6-bar stack — draw per tag) | `hexagram-20-guan.svg` | `001000100` |
| 21 · Biting Through (Shì Kè) | (6-bar stack — draw per tag) | `hexagram-21-shi-ke.svg` | `100111101` |
| 22 · Grace (Bì) | (6-bar stack — draw per tag) | `hexagram-22-bi.svg` | `000101101` |
| 23 · Splitting Apart (Bō) | (6-bar stack — draw per tag) | `hexagram-23-bo.svg` | `001011011` |
| 24 · Return (The Turning Point) (Fù) | (6-bar stack — draw per tag) | `hexagram-24-turning-point.svg` | `110000010` |
| 25 · Innocence (The Unexpected) (Wú Wàng) | (6-bar stack — draw per tag) | `hexagram-25-unexpected.svg` | `011000111` |
| 26 · The Taming Power of the Great (Dà Xù) | (6-bar stack — draw per tag) | `hexagram-26-da-xu.svg` | `101110110` |
| 27 · The Corners of the Mouth (Providing Nourishment) (Yí) | (6-bar stack — draw per tag) | `hexagram-27-providing-nourishment.svg` | `110011100` |
| 28 · Preponderance of the Great (Dà Guò) | (6-bar stack — draw per tag) | `hexagram-28-da-guo.svg` | `000010011` |
| 29 · The Abysmal (Water) (Kǎn) | (6-bar stack — draw per tag) | `hexagram-29-water.svg` | `010011001` |
| 30 · The Clinging, Fire (Lí) | (6-bar stack — draw per tag) | `hexagram-30-li.svg` | `101010001` |
| 31 · Influence (Wooing) (Xián) | (6-bar stack — draw per tag) | `hexagram-31-wooing.svg` | `010100101` |
| 32 · Duration (Héng) | (6-bar stack — draw per tag) | `hexagram-32-heng.svg` | `001010011` |
| 33 · Retreat (Dùn) | (6-bar stack — draw per tag) | `hexagram-33-dun.svg` | `000001011` |
| 34 · The Power of the Great (Dà Zhuàng) | (6-bar stack — draw per tag) | `hexagram-34-da-zhuang.svg` | `000011110` |
| 35 · Progress (Jìn) | (6-bar stack — draw per tag) | `hexagram-35-jin.svg` | `011110101` |
| 36 · Darkening of the Light (Míng Yí) | (6-bar stack — draw per tag) | `hexagram-36-ming-yi.svg` | `100000110` |
| 37 · The Family (Jiā Rén) | (6-bar stack — draw per tag) | `hexagram-37-jia-ren.svg` | `101010011` |
| 38 · Opposition (Kuí) | (6-bar stack — draw per tag) | `hexagram-38-kui.svg` | `010000010` |
| 39 · Obstruction (Jiǎn) | (6-bar stack — draw per tag) | `hexagram-39-jian.svg` | `100101000` |
| 40 · Deliverance (Xiè) | (6-bar stack — draw per tag) | `hexagram-40-xie.svg` | `001000011` |
| 41 · Decrease (Sǔn) | (6-bar stack — draw per tag) | `hexagram-41-sun.svg` | `010101000` |
| 42 · Increase (Yì) | (6-bar stack — draw per tag) | `hexagram-42-yi.svg` | `010101011` |
| 43 · Breakthrough (Guài) | (6-bar stack — draw per tag) | `hexagram-43-guai.svg` | `010111010` |
| 44 · Coming to Meet (Gòu) | (6-bar stack — draw per tag) | `hexagram-44-gou.svg` | `011000001` |
| 45 · Gathering Together (Cuì) | (6-bar stack — draw per tag) | `hexagram-45-cui.svg` | `111000010` |
| 46 · Pushing Upward (Shēng) | (6-bar stack — draw per tag) | `hexagram-46-sheng.svg` | `011111101` |
| 47 · Oppression (Kùn) | (6-bar stack — draw per tag) | `hexagram-47-kun.svg` | `101000011` |
| 48 · The Well (Jǐng) | (6-bar stack — draw per tag) | `hexagram-48-jing.svg` | `010000000` |
| 49 · Revolution (Gé) | (6-bar stack — draw per tag) | `hexagram-49-ge.svg` | `010001100` |
| 50 · The Cauldron (Dǐng) | (6-bar stack — draw per tag) | `hexagram-50-ding.svg` | `101000010` |
| 51 · The Arousing, Shock (Zhèn) | (6-bar stack — draw per tag) | `hexagram-51-zhen.svg` | `101111101` |
| 52 · Keeping Still, Mountain (Gèn) | (6-bar stack — draw per tag) | `hexagram-52-gen.svg` | `001111001` |
| 53 · Development, Gradual Progress (Jiàn) | (6-bar stack — draw per tag) | `hexagram-53-jian.svg` | `010001010` |
| 54 · The Marrying Maiden (Guī Mèi) | (6-bar stack — draw per tag) | `hexagram-54-gui-mei.svg` | `101100001` |
| 55 · Abundance, Fullness (Fēng) | (6-bar stack — draw per tag) | `hexagram-55-feng.svg` | `001100111` |
| 56 · The Wanderer (Lǚ) | (6-bar stack — draw per tag) | `hexagram-56-lu.svg` | `000110001` |
| 57 · The Gentle, Penetrating, Wind (Xùn) | (6-bar stack — draw per tag) | `hexagram-57-xun.svg` | `010110001` |
| 58 · The Joyous, Lake (Duì) | (6-bar stack — draw per tag) | `hexagram-58-dui.svg` | `010001100` |
| 59 · Dispersion, Dissolution (Huàn) | (6-bar stack — draw per tag) | `hexagram-59-huan.svg` | `001101011` |
| 60 · Limitation (Jié) | (6-bar stack — draw per tag) | `hexagram-60-jie.svg` | `000000000` |
| 61 · Inner Truth (Zhōng Fú) | (6-bar stack — draw per tag) | `hexagram-61-zhong-fu.svg` | `100000110` |
| 62 · Preponderance of the Small (Xiǎo Guò) | (6-bar stack — draw per tag) | `hexagram-62-xiao-guo.svg` | `101000111` |
| 63 · After Completion (Jì Jì) | (6-bar stack — draw per tag) | `hexagram-63-ji-ji.svg` | `111110000` |
| 64 · Before Completion (Wèi Jì) | (6-bar stack — draw per tag) | `hexagram-64-wei-ji.svg` | `101001011` |
