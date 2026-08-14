# THE CLAIM AUDIT — where the copy says more than the engine does

**Filed 2026-08-14**, out of the copy fleet's TRUTH pass. Every line below was verified
against the source before being written down.

★ **These are not prototype defects. Two of them are LIVE**, in `app.js`, on the shipped
front door — and they have been repeated into roughly a dozen prototypes because every
fleet was told to use the real strings.

---

## 1. "GIVEN, NOT DRAWN" — false for half the six

**Where it lives:** `app.js:2462` (the birth door's kicker, LIVE) · `app.js:2548` (the
reading paragraph, LIVE) · and the prototypes below.

**Why it is false.** `arcana-reading.js:109`, the engine's own comment:

> *"birth-derived reading: sun sign from the date, animal from the year, life path from
> the digit sum; **the rest drawn from the name+date seed**"*

And `arcana-reading.js:120`:

```
rune:pick(by.rune,seed+"f"), trigram:pick(by.trigram,seed+"g"), hex:pick(by.hexagram,seed+"h")
```

`pick(l,s)` is `l[hash(s)%l.length]`. Three of the six marks are **looked up from the
date**. The other three are **drawn from a hash of the name and date**. Deterministic —
but drawn, and the code itself uses that word.

**The fix, and it costs nothing:** *given, not **chosen***. True of all six — none was
picked by the visitor or selected to flatter them — and it keeps the entire force of the
claim. One word.

**Applied in:** `_door1.html`, `_reading-page.html`. **NOT yet applied in `app.js`.**

---

## 2. "THE SAME DATE RETURNS THE SAME SIX" — the seed is name + date

`readingForSeed()` splits `birth~NAME~y~m~d`. Change the name, get three different marks.
A reader who tries a nickname falsifies it in ten seconds.

**The fix:** *the same **name and the same date** return the same six.* Or, better, the
thing determinism actually buys: **nothing is rolled and nothing is re-rolled on re-view**
— which is already the engine's own phrasing and is true without qualification.

---

## 3. "A DATE OF BIRTH. NOTHING ELSE." — the intake asks for the name first

`app.js:1476`'s own call to action is literally **"Give a name and date"**, and
`arcane.js:279` asks for *"The name borne"*. A door promising less than the next screen
demands is the cheapest kind of broken promise, and it breaks at the worst moment — one
click after the decision.

**The fix:** *a name and a date of birth.*

---

## 4. "OUT OF THE SIX COMES ONE CROWNED NAME" — four of them, actually

`crownOf()` (`arcana-reading.js:100-101`) uses the **sun sign and year animal** for the
epithet, the **rune** for the role, and the **trigram** for the binding. **Life path and
hexagram contribute nothing** to the name; `fragment()` returns `null` for both.

**The fix, which is also a better sentence:** *four of the marks build it, and the other
two stand beside it and are read with it.*

---

## 5. "LIFE PATH — 9 IN THE ARCHIVE" — it is 12

`codex.html` holds `nu-01`…`nu-12`, because `reduceNum()` stops at the master numbers 11,
22 and 33. Nine is the count of single-digit paths, not of entries. The archive is one
click away from the claim.

---

## 6. "IT SITS ON YOUR SHELF" — there is no reading store

The only persistence is a boolean: `br_has_reading` (`arcane.js:1205`), and `br_holdings`
is labelled **in the code** as the mock flag. Nothing stores a reading.

**What is true today:** the record has a link, and the link reopens it. That is a real
mechanism and a good promise. **What is not yet true:** anything that says the reading is
kept for you, on any screen — that is the drawn room *Your shelf, on any screen*, and
until it ships this claim must not be made.

---

## WHERE THE CORRECTIONS STILL HAVE TO GO

| Surface | State |
|---|---|
| `_reading-page.html` | ✅ all six corrected |
| `_door1.html` | ✅ claims 1 and 3 corrected |
| **`app.js:2462` and `app.js:2548`** | ❌ **LIVE and still wrong** |
| `_m1-final.html`, `_m1-master2.html`, `_m1-team4.html`, `_m1-field.html`, `_m1-hand*.html`, `_m1-passage.html`, `_m1-thehand.html`, `_door3.html`, `_door4.html`, `_m1-team7-plaindoor.html` | ❌ inherited, untracked scratch — correct if any is promoted |

★ **The general lesson, and it is worth more than the six fixes.** Every fleet was told to
use the real shipped strings, which is normally the right instruction — it stops agents
inventing copy. But it also propagates a false claim into every prototype at once, and
nobody checks a string that came from the codebase. **Verify the claim, not just the
source.** The copy fleet caught this only because one agent was given the single job of
testing claims against the engine rather than judging the writing.

Relates to `docs/SURFACE_BRIEF_V1.md` PART 0 (the house register — certainty demonstrated,
not claimed), `_reading-copy.md`.
