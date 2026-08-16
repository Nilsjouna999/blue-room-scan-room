<!-- ═══════════════════════════════════════════════════════════════════════════════
     THE TRUTH CONTRACT — the fixture, derived.  `docs/U1_TRUTH_CONTRACT_V1.md`

     The six marks of the U1 fixture (John Bon, 26 July 1965) traced through the REAL
     engine and checked against the hardcoded literals at `_u1-rack.js:178-185`.

     ★★ THE HEADLINE IS THE OPPOSITE OF WHAT WAS EXPECTED. The array is CORRECT today —
     all six values, all six name formats (middots, the diacritics in Duì and Shī, the
     bare "9", the untruncated "7 · The Army (Shī)") and all 25 keyword tokens are exact
     members of that entry's own bank in codex-data.json. It was proved by MUTATION: the
     two BR-S500 defects were re-inserted into a copy and the check named them; the file
     as shipped passes.

     So the danger is not that the values are wrong. It is that nothing re-derives them —
     codex-data.json can be reworded tomorrow and this file will go on printing
     yesterday's words, silently. That is exactly how BR-S500 happened, and the mechanism
     is still installed.

     ★ AND IT CORRECTED THE MAIN LOOP. An earlier pass in this same session declared
     `FIXTURE_SPECIFICATION.md` a fleet invention. It is not: it exists at the REPO ROOT,
     8,215 bytes, added at d5b5573, and it verifies Margaret / 15 April 1988. The original
     fleet cited it with no directory, which was correct; the main loop added a `docs/`
     prefix, checked only `docs/`, and reported its own invention as missing. The
     withdrawals are recorded in place in `docs/U1_LENS_PASS_V1.md` and
     `docs/U1_CONCEPT_V1.md`. A path with no directory means SEARCH THE REPO.
     ═══════════════════════════════════════════════════════════════════════════════ -->

# THE TRUTH CONTRACT — the fixture, derived

Everything below was opened. Values marked **[computed]** were reproduced by running the shipped arithmetic against the real `codex-data.json`, not read off a prior report.

**Derivation source.** One live path, no second: `arcana-build/gen_body.js`. `build_inapp.py:19-29` unwraps its `<script>` IIFE verbatim and re-wraps it as `function ENGINE(){…}` → `arcana-reading.js` (offset +8 lines; `hash` at `gen_body.js:35` = `arcana-reading.js:43`). A repo-wide grep for `sunSign|chineseAnimal|lifePathNum` outside `.claude/worktrees/`, `live/`, `preview/`, `parked/`, `bench/` returns only those two files, plus `test_fixtures.py` (an unwired one-shot Python generator that writes `fixtures_report.txt`, referenced nowhere but `docs/CODE_NOTES_V1.md:305`) and three comment lines in `arcana-profile.js:77-79`.

**Route.** `app.js:104` registers `arcana-reading`; `app.js:6187` mounts `window.BRArcanaReading.mount(host)`. `/reading/index.html` is the same shell, same branch.

**Seed.** Built at intake, `arcane.js:1202-1203` — `"birth~" + nm + "~" + b.y + "~" + b.m + "~" + b.d`, with `b.{y,m,d}` unary-plus **numbers** (so `~7~`, never `~07~`). `readingForSeed` (`gen_body.js:114`) passes the **unsplit** original string on as `birthReading`'s 5th arg. Fixture seed: `birth~John Bon~1965~7~26`, 24 ASCII chars.

**A note on a prior fabrication.** `FIXTURE_SPECIFICATION.md` **does exist**, at the repo root — added at `d5b5573` (BR-S420, "the prototype archive"). It is about Margaret / 15 April 1988, not John Bon. There is no `docs/FIXTURE_SPECIFICATION.md`. If a previous fleet cited that path it invented the *directory*, not the file.

---

## 1. VERDICT

**`_u1-rack.js:178-185` is correct today.** All six `name` values, all six name **formats** (including the U+00B7 middots, the diacritics in `Duì` and `Shī`, the bare-numeral `"9"`, the untruncated `"7 · The Army (Shī)"`), and all 25 keyword tokens are exact. Every keyword is a verbatim member of that entry's own `keywords` array in `codex-data.json`. No mismatch found in lines 178-185.

I proved this by mutation: re-inserting the two BR-S500 defects into a copy of the file and running the derivation-based check in §4 — the Snake row's `"private · watchful · restraint"` fails with three named strays, and `name: "The Army"` fails as "the engine derives `'7 · The Army (Shī)'`, the rack does not print it." The check passes on the file as shipped.

### Findings outside 178-185, same fixture, same class

| # | Where | Finding |
|---|---|---|
| **A** | `_u1-rack.js:250` | The crown **name** `"The Twice-Kindled Wayfarer"` is correct **[computed]**. `wEl("♌ · Jul 23–Aug 22 · Fire · Fixed · Sun")`→`fire`; `cEl("… · Fixed element: Fire")`→`fire`; `EP["fire\|fire"]`=`Twice-Kindled` (`gen_body.js:81`); `RO[norm("Raidho")]`=`Wayfarer` (`:83`). |
| **B** | `_u1-rack.js:251` | **WORDING MISMATCH.** The rack prints `bound in open water`. `BIND["dui"]` is `"in open water"` (`gen_body.js:84`) — correct — but the engine's verb is **`filed`**, never "bound": `gen_body.js:352` renders `… · filed in open water · keyed to movement`, and `:117` says `This mark filed the reading "…"`. "bound" is U1's own word for an engine string that has a fixed verb attached to it everywhere it ships. |
| **C** | `_u1-rack.js:251` | **OMISSION.** The engine's seal carries a fourth term the rack drops: `lexicon`. `lex(Raidho, Duì)` (`gen_body.js:89-91`) walks `["journey","movement","travel","life path","right action"] + ["lake","joy","openness","pleasure","youngest daughter"]`, skips `journey` (in `DENY`, `:85`), and returns **`movement`** **[computed]**. Not an error; the rack's crown is a strict subset of the engine's. |
| **D** | `_u1-rack.js:227` | **SHAPE MISMATCH, not value.** `markArticle` (`gen_body.js:323-332`) prints `keysHTML(e.keywords)` — the **whole** array, one `<li>` per keyword, each individually coloured from `arcana-build/kwcolor.json`. Every rack row prints a hand-picked 4-or-5-token subset as one `" · "`-joined string with no colour. Contents correct; cardinality and colour are not the engine's. |
| **E** | `_u1-rack.js:255` | **The claim line is now arguably wrong.** See §5 — the rune index **determines** the trigram index. "three drawn" describes three slots but two degrees of freedom. |
| **F** | `_u1-rack.js:178-185` | The standing defect: these are typed literals. Nothing re-derives them. `codex-data.json` can be re-worded tomorrow and this file will go on printing yesterday's words, silently. That is the mechanism BR-S500 failed through, and it is still installed. |

**CANNOT DETERMINE:** nothing in the fixture. Two things I did not establish and will not assert — (i) whether `rune` (`%24`) and `hexagram` (`%64`) are uniform under `Math.imul`; the BR-S373 note (`gen_body.js:20-34`) *measured* only trigram (10,608 seeds, spread 78×→1.06×) and *asserts* the other two by "same hash". My own 60,000-seed sweep used a structured seed family, so its spreads (rune 1.16×, hex 1.28×) are not a clean uniformity measurement either way. (ii) Whether the M2 card's own six marks (`app.js`, `m2bface__marks`) derive or hardcode — out of scope, not opened.

---

## 2. THE SIX, AS THE ENGINE PRODUCES THEM

Fixture: **John Bon, 26 July 1965** · seed `birth~John Bon~1965~7~26` · base `hash` = **2540886986** (`0x9772DBCA`) **[computed]**.

| Mark | Value (engine) | Provenance line for U1 | Kind |
|---|---|---|---|
| Sun sign | **Leo** | `read · day + month` | **Read from the date.** `sunSign(7,26)`, `gen_body.js:103`: row `[7,23,"Leo"]`; `26 >= 23` → Leo. (Below 23 it would fall back to `b[(7+10)%12]` = Cancer.) |
| Year animal | **Snake** | `read · the year` | **Read from the date.** `chineseAnimal(1965)`, `:104`: `((1965-4)%12+12)%12` = `1961 % 12` = **5**; `ANI[5]`=Snake (`:64`). |
| Life path | **9** | `read · the date's digits` | **Read from the date.** `lifePathNum`, `:106`: `"1965"+"07"+"26"` → `1+9+6+5+0+7+2+6 = 36` → `reduceNum(36)` → `3+6 = 9`. |
| Rune | **Raidho** | `drawn · name + date` | **Drawn from the seed.** `pick(by.rune, seed+"f")`, `:111`. `hash = 365940676` → `% 24` = **4**. |
| Trigram | **☱ Duì · Lake** | `drawn · name + date` | **Drawn from the seed.** `pick(by.trigram, seed+"g")`. `hash = 382718295` → `% 8` = **7**. |
| Hexagram | **7 · The Army (Shī)** | `drawn · name + date` | **Drawn from the seed.** `pick(by.hexagram, seed+"h")`. `hash = 198164486` → `% 64` = **6**. |

Bank sizes **[computed]**, after the `gen_body.js:45` filter that cuts the 5 Wu Xing element rows out of the 17 raw `chinese` entries: sun 12 · chinese 12 · lifePath 12 · rune 24 · trigram 8 · hexagram 64.

**On the provenance copy.** The six lines above are one shape in two families — `read ·` and `drawn ·`. That is not a taste call: it is the page's own summary sentence at `_u1-rack.js:255` ("three read from the date · three drawn from the name and date") made true row by row. Today's `from:` fields mix three shapes ("from the date" / "from the year" / "from the digits" / "drawn · name + date"), so the reader has to infer the two families rather than see them.

If a longer line is wanted anywhere (a caption, a record page), these are the concrete forms, each stating the actual step and nothing more:

- Sun sign — `26 July falls inside Leo's band.`
- Year animal — `1965 is a Snake year.`
- Life path — `1+9+6+5+0+7+2+6 = 36, and 3+6 = 9.`
- Rune / Trigram / Hexagram — `Drawn from the name and the date together. The same name and the same date always draw the same one.`

No jargon appears on screen: no "hash", no "seed", no "algorithm", no "modulo". "Drawn" is already the engine's own word (`drawFor`, `gen_body.js:98`) and already ships in the About copy.

---

## 3. THE REPLACEMENT

### The blocker, stated exactly

**The engine cannot be called from `_u1-rack.js` today.** `arcana-reading.js:628` exposes exactly one thing:

```js
window.BRArcanaReading = { mount: function (host) { … } };
```

`readingForSeed`, `birthReading`, `marksFor`, `pick` and the six banks all live inside `function ENGINE(){…}`, a closure `mount()` invokes and never returns from. Nothing else is on `window`.

**And booting `ENGINE()` headlessly is not an option** — I checked what it does on the way in and out, and it is disqualifying for a scroll-driven surface:

- `gen_body.js:13-16` — `document.getElementById("codex"/"kb"/"practical"/"kwcolor")`; it reads its data out of the *document*, not an argument.
- `:615-618` — binds click handlers to `#home` and `#redraw`, then calls `route()`.
- `:573` — `route()` ends with **`window.scrollTo(0,0)`**. The rack is driven by scroll position. This alone rules the hack out.
- `:577-578` — installs permanent `hashchange` and `scroll` listeners on `window` that write into a `#bar` inside the host you were about to remove.

So: **there is no export, and there is no safe back door. The missing piece is a build step that emits the pure half of the engine as its own file.**

### The smallest change that exposes it

Three sentinel pairs in the source, ~20 lines in the builder, one new emitted file. No logic is retyped — the builder slices the same characters `arcana-reading.js` is already made of, so there is one source of truth, not two.

**(a) `arcana-build/gen_body.js` — six comment lines, no code touched.** The pure derivation is already three contiguous blocks, and nothing inside them reaches outside them (`crownOf`→`norm`; `lex`→`DENY`; `by`→`CODEX`, which becomes a parameter):

| Wrap | Lines | What it holds |
|---|---|---|
| `/*<<PURE*/ … /*PURE>>*/` | **35-39** | `hash`, `pick`, `deac`, `slugify`, `norm` |
| `/*<<PURE*/ … /*PURE>>*/` | **41-45** | the `by` slotting + the `fixed element:` chinese filter |
| `/*<<PURE*/ … /*PURE>>*/` | **64** | `ANI` |
| `/*<<PURE*/ … /*PURE>>*/` | **81-114** | `EP`,`RO`,`BIND`,`DENY`,`wEl`,`cEl`,`triKey`,`lex`,`crownOf`,`CH`,`drawFor`,`marksFor`,`MON`,`sunSign`,`chineseAnimal`,`reduceNum`,`lifePathNum`,`findByName`,`birthReading`,`readingForSeed` |

**(b) `arcana-build/build_inapp.py` — append after the existing `arcana-reading.js` write (`:73`):**

```python
# ---- JS: the PURE half of the same source -> arcana-marks.js -------------------
# Anything that wants the six marks without mounting a reading page (U1's rack) has,
# until now, had to retype them. ENGINE() cannot be borrowed: it reads its data out of
# document.getElementById, and route() ends in window.scrollTo(0,0) plus two permanent
# window listeners. So the derivation is emitted a second time from the SAME characters
# rather than reimplemented — a typed copy is exactly the failure BR-S500 found.
pure = re.findall(r'/\*<<PURE\*/(.*?)/\*PURE>>\*/', body, re.S)
assert len(pure) == 4, "gen_body.js: expected 4 PURE regions, found %d" % len(pure)
marks = (
'/* ============================================================\n'
'   THE MARKS, WITHOUT THE PAGE — window.BRArcanaMarks\n'
'   GENERATED from arcana-build/gen_body.js. DO NOT hand-edit —\n'
'   regenerate: python arcana-build/build_inapp.py\n'
'============================================================ */\n'
'(function () {\n'
'  "use strict";\n'
'  function DERIVE(CODEX) {\n'
+ "\n".join(pure) + '\n'
'    return { readingForSeed: readingForSeed, marksFor: marksFor, banks: by };\n'
'  }\n'
'  var p = null;\n'
'  window.BRArcanaMarks = { load: function () {\n'
'    if (!p) p = fetch("codex-data.json?v=200").then(function (r) { return r.json(); })\n'
'                   .then(function (j) { return DERIVE(j); });\n'
'    return p;\n'
'  } };\n'
'})();\n'
)
open(os.path.join(REPO, 'arcana-marks.js'), 'w', encoding='utf-8').write(marks)
```

`import re` is needed at the top of `build_inapp.py`. The `?v=200` matches the URL `arcana-reading.js` already fetches, so it is the same HTTP cache entry, not a second download.

**(c) `index.html` — one tag, before line 145's `_u1-rack.js`:**

```html
  <script src="arcana-marks.js?v=512"></script>
```

**(d) `build_public.py` — add `"arcana-marks.js"` to `COPY_FILES` (`:174`).** It ships to both builds: `codex-data.json` is already on that list, and the file is inert until `load()` is called.

### The `_u1-rack.js` replacement

Replaces the `SIX` literal at `:178-185` and `NAME`/`BORN` at `:186`. It keeps a first-paint copy of the marks so the rack never renders empty or reflows, and overwrites it with the engine's answer when the bank lands — but the seed, not the answer, is the thing that is authored:

```js
  /* ── THE FIXTURE. The seed is the only thing typed here; the six marks are asked
       for. The rows below are a first-paint placeholder so the rack never draws an
       empty stack, and they are overwritten by the engine's own answer as soon as
       codex-data.json lands. If the two ever disagree the build fails before this
       ships — see build_public.py's probe_fixture(). ─────────────────────────── */
  var FIXTURE = { name: "John Bon", y: 1965, m: 7, d: 26 };
  var SEED = "birth~" + FIXTURE.name + "~" + FIXTURE.y + "~" + FIXTURE.m + "~" + FIXTURE.d;
  var NAME = FIXTURE.name;
  var BORN = "born " + FIXTURE.d + " " + MONTHS[FIXTURE.m - 1] + " " + FIXTURE.y;

  /* read · from the date  |  drawn · from the name and date. Same two families as the
     line at the foot of the rack; the engine decides which mark is which, not this. */
  var FROM = { "Sun sign": "read \u00b7 day + month", "Year animal": "read \u00b7 the year",
               "Life path": "read \u00b7 the date's digits", "Rune": "drawn \u00b7 name + date",
               "Trigram": "drawn \u00b7 name + date", "Hexagram": "drawn \u00b7 name + date" };

  var SIX = [
    { slot: "Sun sign",    name: "Leo",                from: FROM["Sun sign"],    kw: "confident \u00b7 generous \u00b7 dramatic \u00b7 proud \u00b7 creative" },
    { slot: "Year animal", name: "Snake",              from: FROM["Year animal"], kw: "intuitive \u00b7 wise \u00b7 secretive \u00b7 strategic" },
    { slot: "Life path",   name: "9",                  from: FROM["Life path"],   kw: "compassion \u00b7 completion \u00b7 idealism \u00b7 letting go" },
    { slot: "Rune",        name: "Raidho",             from: FROM["Rune"],        kw: "journey \u00b7 movement \u00b7 travel \u00b7 right action" },
    { slot: "Trigram",     name: "\u2631 Du\u00ec \u00b7 Lake", from: FROM["Trigram"],  kw: "lake \u00b7 joy \u00b7 openness \u00b7 youngest daughter" },
    { slot: "Hexagram",    name: "7 \u00b7 The Army (Sh\u012b)", from: FROM["Hexagram"], kw: "discipline \u00b7 organization \u00b7 leadership \u00b7 collective effort" }
  ];
  var CROWN = { name: "The Twice-Kindled Wayfarer", binding: "in open water" };

  /* ASK THE ENGINE. Fire-and-forget: a failed fetch leaves the placeholder standing,
     which is the correct failure for a tutorial — a rack with no marks teaches nothing.
     KEYWORDS ARE TRUNCATED, NEVER CHOSEN: the first four the codex itself lists, in the
     codex's order and the codex's spelling. Choosing would be inventing again. */
  var KW_SHOWN = 4;
  function askEngine(onReady) {
    if (!window.BRArcanaMarks || typeof window.BRArcanaMarks.load !== "function") return;
    window.BRArcanaMarks.load().then(function (E) {
      var R = E.readingForSeed(SEED);
      SIX = R.marks.map(function (m) {
        return { slot: m.slot, name: m.entry.name, from: FROM[m.slot] || "",
                 kw: (m.entry.keywords || []).slice(0, KW_SHOWN).join(" \u00b7 ") };
      });
      CROWN = { name: R.crown.name, binding: R.crown.binding };
      NAME = R.person.name;
      BORN = "born " + R.person.born;
      if (typeof onReady === "function") onReady();
    })["catch"](function () {});
  }
```

`MONTHS` is a 12-string array the rack does not currently hold; `R.person.born` (`gen_body.js:113`) already returns `"26 July 1965"`, so once the engine answers it supersedes the local one. `onReady` is the rack's existing remount path — it re-renders `MARKUP()` and re-runs `measure()`, because the row text changing can change the stack's measured height.

**Note finding B:** the crown line at `:251` must become `'filed ' + CROWN.binding` (or drop the verb) — `bound` is not a word the engine produces.

---

## 4. THE DRIFT TEST

**Where it runs.** `build_public.py`, alongside `probe_build()` (`:615-640`), called from the same place at `:682`. That is the existing mechanism: `PROBES` (`:300-341`) is a `(label, file-inside-the-build, regex, {variant: must-be-present})` table, and `probe_build` walks it against `DIST`, collecting **every** failure before `sys.exit`. It runs per-variant, and a preview-only file missing from `live/` is a pass, not an error (`:622-628`).

**Why it cannot be a `PROBES` row.** A `PROBES` row asserts a fixed regex. This test's expected strings are not fixed — they are whatever `codex-data.json` says today. So it is a sibling function, same shape, same collect-then-exit discipline. `_u1-rack.js` is in `PREVIEW_ONLY` (`:228`), so it self-skips for `live/` by the same "file absent = strongest absence" rule.

**Requires** `import json` added to `build_public.py:26`.

```python
# ── BR-Sxxx — THE FIXTURE DRIFT PROBE ────────────────────────────────────────────
# _u1-rack.js prints six marks under a comment claiming they are derived. They are
# typed. BR-S500 found four of the six rows inventing the codex's own keywords, and
# nothing but a reader's eye caught it. This re-derives them here, from codex-data.json,
# by the engine's own arithmetic, and fails the build if the rack no longer prints what
# comes out — because the whole argument of that page is that the marks are looked up.
FIXTURE_SEED = "birth~John Bon~1965~7~26"
FIXTURE_Y, FIXTURE_M, FIXTURE_D = 1965, 7, 26


def _fnv(s):                       # gen_body.js:35, Math.imul == exact 32-bit truncation
    h = 2166136261
    for ch in s:
        h ^= ord(ch)
        h = (h * 16777619) & 0xFFFFFFFF
    return h


def _banks():                      # gen_body.js:41-45, including the chinese filter
    with io.open(os.path.join(ROOT, "codex-data.json"), encoding="utf-8") as f:
        codex = json.load(f)
    slots = ((r"western|sun sign", "sun"), (r"chinese", "chinese"),
             (r"numerolog", "lifePath"), (r"tarot", "tarotMajor"),
             (r"rune|futhark", "rune"), (r"trigram", "trigram"), (r"i ching", "hexagram"))
    by = {}
    for sysd in codex:
        k = str(sysd.get("system", "")).lower()
        for pat, slot in slots:
            if re.search(pat, k):
                by[slot] = sysd.get("entries", [])
                break
    an = [e for e in by["chinese"] if re.search(r"fixed element:", str(e.get("tag", "")), re.I)]
    if an:
        by["chinese"] = an
    return by


def derive_six():
    by = _banks()
    SUN = [(1, 20, "Aquarius"), (2, 19, "Pisces"), (3, 21, "Aries"), (4, 20, "Taurus"),
           (5, 21, "Gemini"), (6, 21, "Cancer"), (7, 23, "Leo"), (8, 23, "Virgo"),
           (9, 23, "Libra"), (10, 23, "Scorpio"), (11, 22, "Sagittarius"), (12, 22, "Capricorn")]
    ANI = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake",
           "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"]
    y, m, d = FIXTURE_Y, FIXTURE_M, FIXTURE_D
    cur = SUN[m - 1]
    sun = cur[2] if d >= cur[1] else SUN[(m + 10) % 12][2]
    ani = ANI[((y - 4) % 12 + 12) % 12]
    n = sum(int(c) for c in "%04d%02d%02d" % (y, m, d))
    while n > 9 and n not in (11, 22, 33):
        n = sum(int(c) for c in str(n))

    def named(slot, nm):
        for e in by[slot]:
            if str(e["name"]) == nm:
                return e
        sys.exit("build_public: the engine derives %r, and the %s bank has no such "
                 "entry — the fixture cannot be checked." % (nm, slot))

    def drawn(slot, salt):
        lst = by[slot]
        return lst[_fnv(FIXTURE_SEED + salt) % len(lst)]

    return [("Sun sign", named("sun", sun)), ("Year animal", named("chinese", ani)),
            ("Life path", named("lifePath", str(n))), ("Rune", drawn("rune", "f")),
            ("Trigram", drawn("trigram", "g")), ("Hexagram", drawn("hexagram", "h"))]


def probe_fixture(folder, report):
    """Every string the rack shows a visitor, checked against what the engine produces."""
    path = os.path.join(DIST, "_u1-rack.js")
    if not os.path.isfile(path):
        return                       # live/ — the rack is cut there; nothing to check
    src = io.open(path, encoding="utf-8").read()
    failures = []
    for slot, e in derive_six():
        row = re.search(r'\{[^{}]*name:\s*"%s"[^{}]*\}' % re.escape(e["name"]), src)
        if not row:
            failures.append("%-12s the engine derives %r; the rack does not print it"
                            % (slot, e["name"]))
            continue
        kw = re.search(r'kw:\s*"([^"]*)"', row.group(0))
        words = [w.strip() for w in kw.group(1).split("\u00b7")] if kw else []
        bank = [str(k) for k in e.get("keywords", [])]
        if not words:
            failures.append("%-12s %s prints no keywords" % (slot, e["name"]))
        for w in words:
            if w not in bank:
                failures.append("%-12s %r is not one of %s's words in the codex: %s"
                                % (slot, w, e["name"], ", ".join(bank)))
    if failures:
        sys.exit("build_public: the U1 fixture has drifted from the engine. This is the\n"
                 "one page whose argument is that its marks are not invented:\n    %s"
                 % "\n    ".join(failures))
    report.append("fixture: 6/6 marks match the engine for %s/" % folder)


# The half above cannot see: the ENGINE's arithmetic changing under a bank that did not.
# The Python here is a second implementation and would drift silently with it, so the
# shapes it copies are asserted verbatim against the source they were copied from.
# gen_body.js is not in COPY_FILES, so this one reads ROOT, not DIST.
ENGINE_SHAPE = [
    ("hash",        r"h=2166136261,i;.*Math\.imul\(h,16777619\)>>>0"),
    ("salts",       r'rune:pick\(by\.rune,seed\+"f"\),trigram:pick\(by\.trigram,seed\+"g"\),'
                    r'hex:pick\(by\.hexagram,seed\+"h"\)'),
    ("salt c",      r'life\|\|pick\(by\.lifePath,seed\+"c"\)'),
    ("seed split",  r'seed\.indexOf\("birth~"\)===0'),
    ("sun band",    r'\[7,23,"Leo"\]'),
    ("animals",     r'ANI=\["Rat","Ox","Tiger","Rabbit","Dragon","Snake",'),
    ("epoch",       r'ANI\[\(\(y-4\)%12\+12\)%12\]'),
    ("masters",     r"n>9&&n!==11&&n!==22&&n!==33"),
    ("lp digits",   r'""\+y\+\(m<10\?"0"\+m:m\)\+\(d<10\?"0"\+d:d\)'),
    ("chinese cut", r'/fixed element:/i\.test\(String\(e\.tag\|\|""\)\)'),
]


def probe_engine_shape(report):
    src = io.open(os.path.join(ROOT, "arcana-build", "gen_body.js"), encoding="utf-8").read()
    miss = [lbl for lbl, pat in ENGINE_SHAPE if not re.search(pat, src)]
    if miss:
        sys.exit("build_public: gen_body.js changed under the fixture probe — %s no "
                 "longer reads as copied. Re-derive the fixture before trusting it."
                 % ", ".join(miss))
    report.append("engine shape: %d/%d unchanged in gen_body.js" % (len(ENGINE_SHAPE),
                                                                   len(ENGINE_SHAPE)))
```

Called next to the existing probe at `build_public.py:682`:

```python
    probe_build(folder, report)
    probe_fixture(folder, report)
    probe_engine_shape(report)
```

**What it asserts, precisely.** (1) The exact name the engine derives for each of the six slots appears verbatim in the built `_u1-rack.js` — catching a rename, a re-ordering of `codex-data.json`, a bank-length change (which moves every `%` index), and truncation. (2) Every `·`-separated token in that row's `kw` is a member of that entry's own `keywords` array — catching invention, paraphrase, and a spelling the bank does not use. (3) The ten arithmetic shapes the Python copied still read as copied in `gen_body.js`.

**Verified, not proposed.** I ran all of it. Against the file as shipped: pass, both halves, all ten shape regexes matching. Against a copy with the BR-S500 Snake row restored: three named failures (`private`, `watchful`, `restraint`). Against a copy with `name: "The Army"`: `Hexagram — the engine derives '7 · The Army (Shī)'; the rack does not print it`.

**The honest limit,** in `probe_build`'s own tradition: this is text over built files, not DOM over a rendered page. It proves the strings are in the file, not that the file draws them.

---

## 5. WHAT THIS CONSTRAINS ON SCREEN

### The finding that constrains the most — and it is not the skew

**The rune index fully determines the trigram index.** Not a tendency; an identity, provable from the arithmetic and confirmed at 60,000 seeds with **0 violations** and a complete 24→8 map **[computed]**.

Why: FNV-1a is streaming, so the salt is one final round. `102 ("f") ^ 103 ("g") = 1` — a single bit. Let `x = H ^ 102`. Then `H ^ 103 = x ^ 1 = x ± 1`, so `h_g = h_f ± 16777619`. `16777619 ≡ 3 (mod 8)`, and because the prime is odd, `parity(h_f) = parity(x)` — which decides the sign. So `h_g mod 8 = (h_f ± 3) mod 8`, and `h_f mod 24` already carries both `h_f mod 8` and `h_f mod 2`. For the fixture: rune index 4 → even → `(4+3) mod 8` = **7** = Duì. Exactly what shipped.

**Raidho always draws Duì. Every Raidho, every seeker, forever.** The hexagram (`"h"`, `102^104 = 14`, four bits) is genuinely independent — 52,514 disagreements over the same 60,000 seeds.

This is the `name-engine-salt-bug` note's finding, and it applies here, to these salts, in this file.

### What U1 may say

- **"Drawn from the name and the date."** True and precise for all three.
- **"The same name and the same date always draw the same marks."** True — the derivation is a pure function of the seed string. Nothing is random, nothing is re-rolled per visit, no clock or session is read.
- **"Three are read from your date. Three are drawn from your name and date."** True as a description of the six slots, and it is what `_u1-rack.js:255` already says.
- **The three date-read marks may be called what they are** — `26 July falls in Leo's band`, `1965 is a Snake year`, `the digits add to 9`. These are lookups and can be shown as arithmetic on screen.
- **The rack's own "A worked example" marker** (`_u1-rack.js:239`) is load-bearing and must stay. Six real marks at that size without it is a reading.

### What U1 may not say

- **Not "six independent marks", and not any count that treats rune and trigram as two draws.** There are five degrees of freedom, not six. `_u1-rack.js:255`'s "three drawn" is now a claim I would not defend; "drawn from the name and date" without the count is safe.
- **Not any rarity, odds, or "one in N" figure.** `1/24 · 1/8 · 1/64` is wrong twice over — the trigram carries no information the rune has not already spent, and rune/hexagram uniformity is asserted in the BR-S373 note, not measured. Only trigram uniformity was measured (10,608 seeds, 1.06×).
- **Not "even", "uniform", "every mark equally likely", or anything that implies the draw was checked for fairness.** The one measured figure covers the one slot whose value is entailed by another.
- **Not "given", "revealed", "read from you", "already true of you", or "found".** The three drawn marks are *assigned by* the name and date, not observed in them. `docs/CLAIM_AUDIT_V1.md` exists because "given, not drawn" was shipped and was false for exactly these three.
- **Not "permanent", "yours forever", or "your link will always show this".** BR-S373 (`gen_body.js:20-34`) changed the arithmetic and, in its author's words, changed every existing seed — and it says so. Nothing is stored on a server. A marks-are-fixed-for-life claim is contradicted by the repo's own change log.
- **Not "bound"** for the trigram's binding — the engine's verb is `filed` (finding B).

**The safe formulation, and it is also the true one:** the marks are *fixed by* the name and the date — the same two facts always produce the same six. That is a statement about determinism, which is proven, and it says nothing about fairness, rarity, or independence, none of which hold.