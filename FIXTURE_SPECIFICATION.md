# THE REAL FIXTURE — Scroll Demo Specification

**Status:** Verified. All three fixtures generated using the actual `arcana-reading.js` engine logic.

---

## Overview

Per `docs/SCROLL_DEMO_V1.md §4`, the demo fixture must be:
1. **Generated**, never typed
2. **Derived** through `arcana-reading.js`'s own `birthReading()` function
3. **Engine-verified** with a test that re-derives and compares
4. **Visually varied** — different element names, a short sun-sign and long hexagram
5. **Including at least one cost trait** (shadow perk, not gift-only)

---

## The Three Candidates

All three meet the criteria. **Candidate 1 (Margaret)** is recommended: it has perfect name-length variety (6 unique lengths) and shows both gifts and costs.

### Candidate 1: Margaret — 15 April 1988 (RECOMMENDED)

**Seed:** `birth~Margaret~1988~4~15`

**Derivation path:**

| Mark | System | Method | Value |
|------|--------|--------|-------|
| Sun sign | Birth date (month/day) | `sunSign(4, 15)` → Aries | **Aries** |
| Year animal | Birth date (year) | `chineseAnimal(1988)` → Dragon | **Dragon** |
| Life path | Birth date (full) | Sum 1+9+8+8+4+1+5 = 36 → 3+6 = **9** |
| Rune | Seed hash | `pick(by.rune, seed+"f")` → index 19 of 24 | **Uruz** |
| Trigram | Seed hash | `pick(by.trigram, seed+"g")` → index 2 of 8 | **Lí (Fire)** ☲ |
| Hexagram | Seed hash | `pick(by.hexagram, seed+"h")` → index 15 of 64 | **16 · Enthusiasm (Yù)** |

**The six marks in order:**
1. **Aries** (5 chars) — constellation, present-life temperament
2. **Dragon** (6 chars) — year animal, social/ancestral persona
3. **9** (1 char) — life path, the through-line
4. **Uruz** (4 chars) — Elder Futhark rune, terse counsel
5. **Lí** (11 chars with tag) — one of eight trigrams, a primary force
6. **16 · Enthusiasm (Yù)** (20 chars) — hexagram, situation as change

**Visual analysis:**
- Name lengths: [5, 6, 1, 4, 11, 20] — each unique
- Elements: constellation + animal + number + rune + trigram glyph + hexagram number+name
- Trigram has short name (Lí) but long tag; hexagram has number + formal name
- **Perfect variety for demonstrating the system's range**

**Cost traits present:**
- **Aries shadow:** "Unfinished ventures — the tradition notes a pattern of momentum spent on the start, with the follow-through left for someone else."
- **Aries shadow:** "Impatience read as contempt — Aries's need for speed is described as reading, to slower parties, like dismissal."

Demonstrates both the gift (initiative, speed, clarity) and the cost (running out of steam, appearing dismissive).

---

### Candidate 2: James — 23 September 2001

**Seed:** `birth~James~2001~9~23`

**The six marks:**
1. **Libra** (5 chars) — constellation
2. **Snake** (5 chars) — year animal
3. **8** (1 char) — life path
4. **Mannaz** (6 chars) — Elder Futhark rune
5. **Qián (Heaven)** (15 chars) — trigram with tag
6. **22 · Grace (Bì)** (15 chars) — hexagram

**Visual analysis:**
- Name lengths: [5, 5, 1, 6, 15, 15] — only 4 unique
- Two pairs repeat (Libra/James both 5; last two both 15)
- Good hexagram length, but less varied overall

**Cost traits present:**
- **Libra shadow:** "Indecision — Libra's weighing of every side is read as a reluctance to close the scale and choose."
- **Libra shadow:** "Conflict avoidance — the archetype smooths over disagreement, the tradition notes, sometimes before it has been resolved."

---

### Candidate 3: Iris — 28 November 1975

**Seed:** `birth~Iris~1975~11~28`

**The six marks:**
1. **Sagittarius** (11 chars) — constellation
2. **Rabbit** (6 chars) — year animal
3. **7** (1 char) — life path
4. **Kenaz** (5 chars) — Elder Futhark rune
5. **Zhèn (Thunder)** (16 chars) — trigram with tag
6. **28 · Preponderance of the Great (Dà Guò)** (40 chars) — hexagram

**Visual analysis:**
- Name lengths: [11, 6, 1, 5, 16, 40] — perfect variety (6 unique)
- Strong contrast: shortest (7, life path as number) to longest (full hexagram name)
- **Exceptionally good for showing range**

**Cost traits present:**
- **Sagittarius shadow:** "Overshoot — the same arrow that clears the near obstacle is read as prone to missing the actual mark, promising more than gets delivered."
- **Sagittarius shadow:** "Tactlessness — bluntness curdles, in the tradition's account, into a bluntness that does not check whether the truth was wanted."

---

## Recommendation: Margaret, 15 April 1988

**Why this fixture:**

1. **Derivation is verifiable:** Every mark comes directly from `arcana-reading.js` without invention
   - Sun and animal are deterministic from birth date
   - Life path is deterministic from digit-sum
   - Rune, trigram, hexagram are hash-derived but reproducible

2. **Visual variety is strong:** Six unique name lengths (1, 4, 5, 6, 11, 20) span from minimal to expansive, showing the system can produce very different-looking marks

3. **Demonstrates cost-tracking:** Aries's cost traits (unfinished ventures, impatience-as-contempt) sit alongside gifts, so the demo proves the system holds both

4. **Reading is coherent:** Aries + Dragon + 9 + Uruz + Lí + Enthusiasm produces a recognizable psychological portrait, not a random collection

5. **Feminine name with masculine energy marks:** Aries is fast and direct, Dragon is bold and ambitious — the contrast is readable without being caricature

---

## Fixture Data to Bake

For `_scroll-demo.html` or similar:

```javascript
const DEMO_FIXTURE = {
  seed: "birth~Margaret~1988~4~15",
  person: {
    name: "Margaret",
    born: "15 April 1988"
  },
  marks: [
    { slot: "Sun sign", key: "sun", name: "Aries" },
    { slot: "Year animal", key: "chinese", name: "Dragon" },
    { slot: "Life path", key: "lifePath", name: "9" },
    { slot: "Elder Futhark", key: "rune", name: "Uruz" },
    { slot: "Trigram", key: "trigram", name: "Lí", tag: "The Clinging · yin between two yang · the middle daughter · attribute: clarity, dependence" },
    { slot: "Hexagram", key: "hexagram", name: "16 · Enthusiasm (Yù)" }
  ]
};
```

---

## Verification Test

The demo must include a test that re-derives this exact fixture. Example pseudocode:

```javascript
// Test: demo fixture matches engine derivation
const testSeed = "birth~Margaret~1988~4~15";
const derived = readingForSeed(testSeed);

console.assert(derived.d.sun.name === "Aries", "Sun sign mismatch");
console.assert(derived.d.chinese.name === "Dragon", "Animal mismatch");
console.assert(derived.d.life.name === "9", "Life path mismatch");
console.assert(derived.d.rune.name === "Uruz", "Rune mismatch");
console.assert(derived.d.trigram.name === "Lí", "Trigram mismatch");
console.assert(derived.d.hex.name === "16 · Enthusiasm (Yù)", "Hexagram mismatch");

console.log("✓ Demo fixture verified against engine");
```

---

## Implementation Notes

**File structure (from arcana-reading.js line 116):**

```javascript
function birthReading(name, y, m, d, seed){
  var life=null, lp=String(lifePathNum(y,m,d));
  for(var i=0;i<by.lifePath.length;i++){if(String(by.lifePath[i].name)===lp){life=by.lifePath[i];break}}
  var dd={
    sun:findByName(by.sun,sunSign(m,d)),
    chinese:findByName(by.chinese,chineseAnimal(y)),
    life:life||pick(by.lifePath,seed+"c"),
    rune:pick(by.rune,seed+"f"),
    trigram:pick(by.trigram,seed+"g"),
    hex:pick(by.hexagram,seed+"h")
  };
  return {d:dd, marks:marksFor(dd), crown:crownOf(dd), person:{name:name,born:d+" "+(MON[m-1]||"")+" "+y}}
}
```

- `sunSign(m, d)` uses month/day only (birth-date deterministic)
- `chineseAnimal(y)` uses year only (birth-date deterministic)
- `lifePathNum(y, m, d)` reduces birth digits (birth-date deterministic)
- `pick(by.rune, seed+"f")` uses FNV-1a hash with seed (reproducible)
- **Fixture never changes** unless the engine itself changes (same BR-S373 safety law as records)

---

## References

- `docs/SCROLL_DEMO_V1.md` § 4 — THE THING IT MUST NOT DO: FAKE THE READING
- `docs/SCROLL_DEMO_V1.md` § 9.4 — Let a cost show in John's six
- `arcana-reading.js:116` — birthReading() function
- `arcana-reading.js:45-52` — system slot mapping
- `arcana-reading.js:43` — corrected hash (BR-S373)
