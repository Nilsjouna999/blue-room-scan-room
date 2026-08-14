# CODE NOTES — a note-only sweep

> 10 agents swept app.js, styles.css, the reading engine, the rooms, the four new
> overlay modules, all user-facing copy and the Python. Two opus verifiers then opened
> every cited line and killed what they could not confirm. **36 confirmed.**

> ★ THE BUILDER'S RULE, AND IT WAS THE BRIEF: *"only noting not changing, listed notes
> will be checked again and fixed later."* **NOTHING HERE IS FIXED.** Every entry carries
> file:line and a quote so it can be checked in five seconds.

> ★ ONE CORRECTION FROM ME, because the sweep could not know it: the notes that call
> `settings.js`'s "Card Mint" a stale name are right about the INCONSISTENCY and wrong
> about the direction. The builder reversed BR-S406 this session — **Card Mint is the
> name that wins**, so `app.js:1499` and `:3220` move to it, not the other way round.


---

## HIGH — 10

### 1. `_codex-membrane.js:288` — unguarded · certain

```
if (canvas) { canvas.remove(); canvas = null; ctx = null; L = null; W = 0; }
```

uninstall() nulls canvas/ctx but never disconnects the MutationObserver created at _codex-membrane.js:281-282 (watching host class) nor removes the resize listener added at _codex-membrane.js:284. That resize handler is `function(){ W = 0; place(); }`, and place() (_codex-membrane.js:100) reaches `canvas.width = Math.round(W * DPR)` with no null guard whenever vw !== W — which W = 0 guarantees. So a window resize after a clean uninstall() throws TypeError on null canvas. A reachable crash, not just a leak.

### 2. `arcana-reading.js:493` — logic · certain

```
if((ia+3)%5===ib)return WUXING[ia][0]+" checks "+WUXING[ib][0]+" — the first tempers the second.";
    return WUXING[ib][0]+" checks "+WUXING[ia][0]+" — the second tempers the first.";
```

Both branches of the Wu Xing controlling (Ke) cycle in bondElements are reversed. WUXING order is [Wood, Fire, Earth, Metal, Water] (arcana-reading.js:227), so X is controlled by (X+3)%5 — which is exactly how the same file uses the same formula correctly in wuxingBlock (arcana-reading.js:239: 'and is checked by '+WUXING[(idx+3)%5][0]). In bondElements, (ia+3)%5===ib means ib controls ia, but the code prints 'ia checks ib'. The trailing else covers ib=(ia+2)%5, i.e. ia controls ib, but prints 'ib checks ia'. Concretely a Wood/Metal pair renders 'Wood checks Metal' when Metal controls Wood. Identical bug at arcana-build/gen_body.js:485-486, which build_inapp.py copies verbatim into the shipped arcana-reading.js.

### 3. `arcane.js:1225` — logic · certain

```
ceremony = ForgeCeremony(ceremonyHost, nameVal, MATERIAL, exitCeremony);
```

`nameVal` is not declared anywhere in arcane.js (this is its only occurrence in the file). The in-scope variable holding the entered name is `nm` (arcane.js:1202). This is the fallback path taken when window.BRCeremony failed to load; if hit, it throws ReferenceError: nameVal is not defined, killing the whole draw flow instead of running the inline ForgeCeremony fallback. ForgeCeremony's own signature (arcane.js:686) is (host, nameMark, material, onExit), so the intended argument is `nm`.

### 4. `data.js:1086` — logic · certain

```
statsShown: ["presence", "signal", "visualImpact", "charge"],
```

tierOutputs.free.statsShown includes "charge" and omits "frame", contradicting the file's own repeated law. data.js:255-257 states 'Free-front four = presence(Frame Presence)/frame/signal/visualImpact ... charge(Scene Charge) is Halo-depth now ... never a Free-front stat', and data.js:1056 repeats it. The free tier is configured to show the Halo-only stat and hide one of its declared four.

### 5. `reveal/reading-panel.js:211` — copy · certain

```
'<h2 class="rv-read__headline" tabindex="-1">Stats & Readings</h2>' +
```

The panel headline is hardcoded to "Stats & Readings" for BOTH engines. readings.data.js gives the halo read its own headline — `headline: "The Developed Record"` (reveal/readings.data.js:67) — and it is never read. So the deep/paid read renders under the free read's title. html(r,src) branches on r.engine only; nothing in reading-panel.js ever touches r.headline.

### 6. `scan-contract.js:77-78` — logic · certain

```
function isUnderStats(path) {
    return path.indexOf("stats.") !== -1 || /(^|\.)stats($|\.|\[)/.test(path);
```

Substring test, not a path-segment test, so the positional enforcement the comment promises can be sidestepped. The comment at scan-contract.js:89-92 says 'value' is allowed only as "a numeric stat under stats.*" and is "enforced positionally". But `indexOf("stats.")` is true for any ancestor key that merely ENDS in "stats" — e.g. path `substats.value` or `worthstats.value` returns true, so `{ substats: { value: 88 } }` passes the human-worth check that FORBIDDEN_TERMS lists 'value' to catch. The regex half of the OR is the correct segment-anchored test; the indexOf half defeats it. This is the one check in a file that calls itself a SAFETY VALVE.

### 7. `settings.js:203` — copy · certain

```
'<li><b>The Free Pull card</b> — a complete card front from your photograph, sealed at the back.</li>'
```

Inside the 'Always open, always free' list, this presents a card front produced from the visitor's photograph as a working feature. The same file's How It Works section states the opposite about the same feature: settings.js:353 'When you stage a photo in Card Mint ... The scan engine that would read it is not connected yet, so nothing analyzes it either.' The one page whose purpose is to state plainly what works contradicts itself on exactly that.

### 8. `settings.js:342` — copy · certain

```
romanItem("IV · Card Mint", "bring a photo; it is already a card...
```

Stale room name in user-facing About copy. BR-S406 renamed this room to 'The Forge' (app.js:1499: `{ key: "mint", state: "drawn", free: true, name: "The Forge",`), with a comment at app.js:1493-1498 explaining the rename. settings.js still calls it Card Mint.

### 9. `settings.js:353` — copy · certain

```
lead("The photo.", "When you stage a photo in Card Mint, it is held in your browser’s own memory...
```

Same stale room name — should be 'The Forge' per app.js:1499. This is the how-it-works explanation of photo handling, so a reader is sent to look for a room that no longer exists by that name.

### 10. `settings.js:392` — copy · certain

```
"Any photo you stage in Card Mint — held in page memory only, never uploaded, gone on reload.",
```

Same stale room name — should be 'The Forge' per app.js:1499. This one is in the privacy list, i.e. the strongest promise on the page names a room by an old name.


---

## MEDIUM — 16

### 1. `_rooms-u1.js:104-106` — comment-lies · certain

```
list.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest(".u1door__go")) e.stopPropagation();
    }, true);
```

The comment two lines above says the fix is to "Stop it at the card", but the selector is `.u1door__go`, which is only the small CTA anchor at the bottom of a door (app.js:1632), not the card. The name, line, cost, emblem and ordinal (app.js:1625-1631) sit OUTSIDE `.u1door__go`, so a click on any of them still bubbles to `.orbit__field`, which carries `data-orbit-close` (app.js:6967), and reaches the document close handler at app.js:7454. It also does not cover a door built with no href, which renders no `.u1door__go` at all (app.js:1632) and therefore has no protected region whatsoever. The blast radius is limited today only because BR-S294 made that handler a no-op unless a plate is displayed — the guard itself is narrower than the comment claims.

### 2. `_six-live.js:284` — leak · certain

```
if(ul){ ul.classList.remove("sx-on"); delete ul.dataset.sx; }
```

uninstall() deletes the ul.dataset.sx one-time-setup guard but removes none of the listeners install() attached: pointerenter/focus/click per <li> (_six-live.js:219-221), the document keydown (223), pointerenter/pointerleave on card and box (270-271), and focus/blur per <li> (274-275). It also never disconnects the MutationObserver on .m2hero (259-260). Because the guard is cleared, the next install() re-enters the block and adds a second complete set plus a second observer, none of them ever removed.

### 3. `_whats-coming.js:118` — leak · certain

```
if (docRef) { var s = docRef.getElementById("__wcpop"); if (s) s.remove(); docRef.__wcWired = false; }
```

uninstall() resets the docRef.__wcWired guard (checked at _whats-coming.js:100) but never removeEventListener's the capture-phase click (102) or the keydown (109) that wire() attached to the document. The next install()/tick() -> wire() therefore attaches a second click and keydown listener while the first pair is still live, so a roadmap-link click runs open() twice.

### 4. `app.js:5657` — copy · certain

```
'<p class="menu__trust">Image-as-artifact scan — it reads frame, gesture and signal, never the person.</p>'
```

The ?dev=menu-reveal preview branch still ships the pre-BR-S351 wording. The comment at app.js:3176-3180 explains BR-S351 corrected this exact sentence because it claimed in the present tense that the room reads the photograph while the scan engine is not connected; the corrected live string (app.js:3181) reads 'Image-as-artifact scan — frame, gesture and signal, never the person. Not connected yet.' The dev preview keeps the over-claiming version.

### 5. `app.js:5660` — copy · certain

```
'<span class="msample__type">SRC-01 · Archive</span>'
```

Hardcoded SRC-01 in the ?dev=menu-reveal branch, but the desk's source is SRC-03 (M1_SRC_INDEX = 2, app.js:4118). The BR-S259 comment at app.js:4112-4117 and the BR-S398 comment at app.js:2166-2170 both name this exact string — a hardcoded 'SRC-01 · Archive' at a desk showing SRC-03 — as the drift m1Source()/m1SrcCode() were built to end. This code path never adopted them.

### 6. `app.js:5669` — copy · certain

```
'<span class="menu__door-desc">See the sample card in its room — SRC-01. A sample, not your photo.</span>'
```

Second stale SRC-01 hardcode in the same ?dev=menu-reveal template; the live sample is SRC-03 via m1Source()/m1SrcCode() (app.js:4118-4125).

### 7. `app.js:6903` — logic · certain

```
var NAMES = { "": "The Archive Desk", "is-wall": "The Reading Rooms", "is-reliquary": "Your Profile" }; ... var RANK = { "is-wall": 0, "": 2, "is-reliquary": 3 }; ... var key = p.cls || "";
```

The ROOMS orbit map keys NAMES/SUBS/RANK/WING/MARKS by MENU_PANELS[i].cls, but since BR-S400 the sealed front-door panel carries cls "is-l1", not "" (app.js:4102). The "" entries in all five dicts are therefore unreachable dead code, and the real L1 panel misses every dict and falls through to the generic fallbacks at app.js:6933-6935: label 'Room 1', empty sub, rank 6 (tied last with Settings instead of its intended 2), wing 'work', mark ORBIT_MARKS.desk. The locked front door renders as an unnamed placeholder plate in the ROOMS overview.

### 8. `arcana-build/build_inapp.py:47` — comment-lies · certain

```
'    l.id = "arc-full-css"; l.rel = "stylesheet"; l.href = "arcana-reading.css?v=201";\n'   # version param: bump with index.html's arcana-reading.js?v= (cache-bust law)
```

The comment states the rule the code does not follow: index.html:117 loads `arcana-reading.js?v=373a`, but the generated CSS link is pinned at v=201. The generated file's own stylesheet cache-bust is ~172 bumps behind the script that carries it, so a rebuild ships new CSS behind a stale cache key.

### 9. `arcana-reading.js:101` — unguarded · certain

```
...lexicon:lex(d.rune,d.trigram),sunEl:wEl(d.sun.tag),chiEl:cEl(d.chinese.tag)}}
```

The comment on the line above (arcana-reading.js:100, 'BR-S201: tolerate a null sun/chinese (bad date)') claims null sun/chinese is tolerated, and the `el` expression does guard it (`wEl(d.sun&&d.sun.tag)`). But the returned object reads `d.sun.tag` and `d.chinese.tag` unguarded. birthReading (arcana-reading.js:119) sets sun via findByName(by.sun, sunSign(m,d)), and sunSign fail-opens to null on an out-of-range month (arcana-reading.js:111), so findByName returns null and crownOf throws TypeError reading '.tag' of null — the exact case the comment says is tolerated. Same at arcana-build/gen_body.js:93.

### 10. `arcana-reading.js:112` — logic · suspected

```
function chineseAnimal(y){return ANI[((y-4)%12+12)%12]}
```

The year animal is derived from the calendar year alone, with no Lunar New Year cutoff (late Jan–mid Feb). Someone born in January or early February is traditionally still under the previous year's animal, but this always returns the calendar-year animal; m and d are computed in birthReading (arcana-reading.js:119) and never passed here. Flagged as suspected because it may be a deliberate simplification rather than an oversight — but it is a real derivation inaccuracy in a birth-derived reading, and it propagates via arcana-build/gen_body.js:104.

### 11. `data.js:1056` — comment-lies · certain

```
freeVisible: { ...src.card.stats }, // Free four = Frame Presence / Frame / Signal / Visual Impact (charge is Halo-depth)
```

src.card.stats has five keys — presence, frame, signal, visualImpact, charge (see data.js:258). Spreading it whole puts charge into freeVisible, which the same-line comment defines as a 'Free four' that explicitly excludes charge. The code contradicts its own inline comment.

### 12. `reveal/readings.data.js:32-108` — unreachable · certain

```
headline / leftInstrument / coreMeters / signalNote / rightPanel / dossierState / dossier / dossierSlots / closingBeat
```

Of the whole freeReading/haloReading payload, reading-panel.js reads exactly ONE property: `r.engine` (line 209 `var halo = r.engine === "halo";` and line 229 `el.dataset.engine = r.engine`). Every other field — including FREE_METERS/HALO_METERS (lines 17-28) and the two closingBeat lines — is dead. The panel builds its content from `src` instead (buildFree/buildHalo). Note also that the dead FREE_METERS carries "SCENE CHARGE" (line 21) as a free-tier meter, which contradicts the free-four law stated all through data.js; the LIVE path (reading-panel.js:153-158) correctly shows impact/signal/frame/presence with no charge.

### 13. `reveal/stage-controller.js:46` — copy · suspected

```
'<span class="reveal-stage__devtag">DEV · STAGED REVEAL — not a product surface yet</span>' +
```

The dev banner is only skipped when `bare` is true (embedded/menustage/opts.bare, line 21). The plain ?dev=staged-reveal route still renders it — fine — but the same header block also carries the thesis line 'Every photo is already a card. Watch the room develop it.' (line 48), which is the present-tense over-claim BR-S351 corrected everywhere else on the grounds that the scan engine is not connected yet (app.js:3176-3181). Same sentence family, same route class, uncorrected here.

### 14. `tarot-v2/app.js:413-418` — leak · certain

```
var done = function () { D.archiveDrawer.hidden = true; };
    if (motionOK) setTimeout(done, 320); else done();
```

The close timer is never stored or cancelled. Close the archive drawer and reopen it inside 320ms (a double-click on the toggle, or Escape then the open button) and openArchive() sets `hidden = false` (line 407), then the still-pending `done` fires and sets `hidden = true` on a drawer the user just opened — the panel vanishes with is-open still on it. Every other timer in this file that can be re-entered is held in a variable (e.g. copyResetTimer at line 491); this one is not.

### 15. `tarot-v2/voice.js:28` — copy · certain

```
"The Tower": { e: "foundation-struck", p: "The Tower drops the roof before the walls and files the wreckage as evidence.", c: "landing on what was already built" },
```

The `c` clause does not derive from this entry's own `p`, breaking the pattern every other one of the 22 entries holds (the file header, line 5, and voice-ext.js:13 both define c as "the participial clause form of the pivot"). Compare The Star — p "pours water under a dark sky it did not clear itself" / c "pouring water under a sky it did not clear". Here p is about dropping the roof and filing wreckage; c is "landing on what was already built", a different image (the strike). The epithet `foundation-struck` also names the foundation while p names the roof.

### 16. `tools/build_atlas.py:66` — unreachable · certain

```
return sorted(set(re.findall(r"\"([a-z-]+)\"|'([a-z-]+)'", m.group(1))[0]
                          for _ in [0])) if False else sorted(
            set(a or b for a, b in re.findall(...)))
```

`if False else` — the first arm can never evaluate. It is a disabled/abandoned expression left inline rather than deleted, and it makes the live expression (the else arm) hard to read as the only real code path.


---

## LOW — 10

### 1. `app.js:5671` — copy · certain

```
'<p class="menu__foot">One sample · SRC-01 · Driver.</p>'
```

Three errors in one line. The BR-S352 comment at app.js:3235-3237 records that the 'One sample' footer was CUT from the live desk, yet it still renders in the ?dev=menu-reveal branch; the source code is the stale SRC-01 instead of SRC-03; and the card name 'Driver' is stale — the live sample at M1_SRC_INDEX = 2 is 'Shore Dispatch' (app.js:4113).

### 2. `codex.html:1371-1372` — logic · suspected

```
if(Math.abs(V[b].length-t.length)>1) continue;
 if(V[b].length<t.length) continue;
```

correct() only ever considers vocabulary words of length t.length or t.length+1, so it can repair a DROPPED letter or a substitution but never an EXTRA one — "hermitt", "aquariuss", "tempperance" get no correction. within1() (codex.html:1350-1362) is written to handle the length gap in EITHER direction (line 1357 picks `s`/`l` by which is shorter), so the second guard discards exactly half of what the helper was built for. Nothing in the code or the comment at line 1407 ("one correction, and it is shown") states the asymmetry is deliberate.

### 3. `gate_public.py:219-222` — comment-lies · certain

```
# the case-sensitivity trap itself, as a test: every sample above is deliberately
    # mis-cased relative to how the pattern reads, so a case-sensitive rewrite fails here.
    clean = 'a page with ?dev=arcane and birth~The Seeker~2000~1~1 and nothing else'
```

The comment describes the mis-cased-sample loop ABOVE it (lines 216-224 of the FIRES pass), but it sits immediately above the false-positive loop, which tests a known-CLEAN line and has nothing to do with case sensitivity. A reader takes the comment as documenting the code under it; it documents the code over it.

### 4. `gate_public.py:240` — unguarded · certain

```
target = argv[argv.index("--target") + 1]
```

No bounds check on the value after the flag. `python gate_public.py --target` with the flag last raises IndexError and the gate dies with a traceback instead of a usage message — in a file whose whole thesis (lines 13-14) is "A check that can silently not run is not a check." A crashed gate is also a gate that did not run.

### 5. `gate_public.py:277` — off-by-one · certain

```
print("gate_public: %d checks over %s" % (len(checks) + 1, label))
```

The +1 undercounts by one. scan_prototypes() contributes TWO distinct checks, not one — "prototype-file" (gate_public.py:242) and "denylist-shipped" (gate_public.py:247) — and both can appear in the by-check report printed twenty lines below. This is the same file that argues (lines 275-277) that the printed number is the only visible trace a blind spot leaves.

### 6. `reveal/readings.data.js:3` — comment-lies · certain

```
TWO self-contained readings of the SAME photo (SRC-01, Driver).
```

Stale source claim, same family as the SRC-01 drift already noted in app.js. stage-controller.js:30-33 records that the desk sample moved to SRC-03 "Shore Dispatch" (BR-S259) and threads `opts.src`. The header comment still names SRC-01 / Driver as the photo these readings describe.

### 7. `styles.css:3379` — unit · certain

```
animation-duration: var(--m2ask-cycle, 36s);
```

The CSS fallback is 36s but the cycle is 44s (app.js:2406, `const M2_CYCLE = 44;`). Two nearby comments are stale to match: styles.css:3388 says 'the CYCLE grew 36s -> 44s' (so the file knows) and styles.css:3397 still says 'Ten lines over 36s'. Masked today because app.js:2583 always writes an inline `--m2ask-cycle:44s`, so the fallback never applies — but the fallback and the 3397 comment now state the wrong number, and if the inline style were dropped the schedule (whose delays are `at - M2_CYCLE`) would silently mismatch the animation.

### 8. `test_fixtures.py:213` — typo · certain

```
output_lines.append(f"\nCandidicate {i}: {r['name']} - ...
```

Typo in output text: 'Candidicate' should be 'Candidate'.

### 9. `tools/build_atlas.py:64` — logic · certain

```
m = re.search(r"(?:allow|ALLOW)[A-Z_a-z]*\s*=\s*\[(.*?)\]", src, re.S)
```

The character class [A-Z_a-z] contains no digits, so this fallback route-list matcher cannot match any identifier with a digit in it — e.g. ALLOW_ROOMS_V2 = [ ... ] fails, because after consuming '_ROOMS_V' the pattern requires \s*= and finds '2'. Only the digit-free names match, which is not what a name-tolerant fallback pattern is for.

### 10. `u1-boxes-prototype.html:275` — copy · certain

```
shipped:{ name:'Card Mint',
```

The prototype's A/B data labels 'Card Mint' as the SHIPPED name and 'The Card Mint' as the fresh alternative (line 278), but the actually-shipped name has been 'The Forge' since BR-S406 (app.js:1499). The whole point of the shipped/fresh split is to compare against what is live, and the 'shipped' side is wrong.
