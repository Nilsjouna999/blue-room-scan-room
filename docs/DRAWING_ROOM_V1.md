<!-- ═══════════════════════════════════════════════════════════════════════════════
     THE DRAWING ROOM — THE DESIGN.  `docs/DRAWING_ROOM_V1.md`

     The tarot product page's below-the-fold, designed 2026-08-16 by a 60-agent fleet:
     6 grounding readers · 14 discipline specialists · 6 competing architectures ·
     5 question clusters · 4 rival sample readings · 8 adversaries · 5 wildcards ·
     3 judges · a synthesis lead · a content lead · then 3 critics, 2 nitpickers and a
     stress test on the FINISHED work, and a final synthesiser. 0 errors, ~40 minutes.

     SCOPE WAS FENCED IN THE BRIEF ITSELF: the Drawing Room only. The Scan Room, SRC,
     the photo card, Free Pull, Halo, the Lab and the Birth Reading were declared out of
     scope for every agent, and findings that depended on them were to be dropped.

     ★★ THE BEST THING ABOUT THIS DOCUMENT IS THAT IT DID NOT INVENT THE SPREAD. The
     positions it names are the ones the shipped code ALREADY has —
     `drawing-room.js:123` carries `notes: ["what the matter rests on", "what stands
     against it", "where it tends, left as it stands"]`, and `bindingLine()` at `:147-150`
     already prints "Read as one — the matter rests on X, is crossed by Y, and tends
     toward Z." The copy uses the machine's own verbs rather than a vocabulary invented
     alongside it. That is why it settles on "tends", never "leans".

     ★ VERIFIED BY THE MAIN LOOP before filing:
       · `bindingLine()` and the `notes` arrays exist as quoted — CONFIRMED
       · Ten of Wands, Four of Cups and Six of Swords all exist in `codex-data.json`,
         all carry a real `reversed` field, all carry "Traditionally shown" —  CONFIRMED.
         The sample reading quotes the bank rather than paraphrasing it, which is the
         difference between a demonstration and an advertisement for one.

     ★ NOT AN IMPLEMENTATION. Nothing here is built. The document's own §8 names the
     smallest slice worth building first, and §9 names what the fleet could not settle.
     The builder's eye has not passed on any of it: no agent in this fleet could see.
     ═══════════════════════════════════════════════════════════════════════════════ -->

# THE DRAWING ROOM — FINAL

*All strings below re-verified in `drawing-room.js`, `arcana-profile.css`, `codex-data.json`, and `codex.html` today. Anything I could not open is marked CANNOT CONFIRM.*

## THE PAGE IN ONE PARAGRAPH

A stranger lands on near-black. The room's name, then one serif sentence at the second-largest size on the page telling him what tarot does here and that every card that falls comes back to him in words. Two doors — a Sitting, a Deep Read — each naming its own axis in a plain sentence, not a card count beside a price. A returning visitor is finished at this point in two clicks. Below the doors, a long floor, one drawn hairline, and one line saying the rest is for the first time. Then a Sitting already cut, on a fixture: a real matter, three face-down cards that turn under his hand, and — verbatim, unretouched — exactly what the product prints. One paragraph after it tells him what a cut produces and what it leaves to him. Then the grammar: the same card under two different seats, the coin that turns half the deck, and the one sentence the room actually writes. Then three and five, honestly: a second axis, not a better answer. Then what to lay on the table, in four ordinary sentences a person might really type, and one fact about where the typed words live. The two doors again, unchanged. Then the quiet answers, in continuous prose. Then the stamp, and one arrow into the Codex. He can leave at the doors and have lost nothing; he can reach the bottom and have been told nothing untrue.

---

## 1. RECOMMENDED ARCHITECTURE

| | Station | The question it answers |
|---|---|---|
| **S0** | Head, standing line, two doors | *What does this do, and which one do I want?* |
| **S1** | Floor, one hairline, one line | *Is there more, and is it for me?* |
| **S2** | A Sitting, already cut — running on a fixture | *What actually arrives? Do I need to know tarot? Is this worth an evening?* |
| **S3** | What you just watched | *How does a card in a position become a reading? Is reversed bad?* |
| **S4** | Three and five | *What does the extra £1 buy, honestly?* |
| **S5** | What to lay down | *What do I type? What if it's about someone else? Where do my words go?* |
| **—** | The doors again | *(no new words — the readiness peak)* |
| **S6** | The quiet answers | *What are the traps?* |
| **S7** | The record, and the Codex | *What is the seal claiming? Where does the study live?* |

Everything from S1 down lives inside `landingHTML()`. `startReading()` (`:508`) and `showLanding()` (`:507`) replace `[data-dr-stage]` wholesale and `reopen()` (`:600`) never renders the landing — so education cannot stand between a visitor and a reading, with no visibility bookkeeping. **One named exception:** two sentences move *into* `intakeHTML()` (`:321`) — the privacy fact and the health/money/law line — because a person who scrolled past them before choosing must still meet them at the field. Purity is an aesthetic rule; that one is a safety rule.

**House style, decided:** US spelling throughout (the bank is US and is most of the visible text). Oxford comma. Digits in mono labels, words in prose. **`tends`, never `leans`** — `bindingLine()` prints "tends toward" and `SPREADS.sitting.notes` prints "where it tends, left as it stands"; the page uses the object's verb. Seat names always take the article: *The Ground*.

---

## 2. THE FULL COPY

### Shell (always present)

Eyebrow and `h1` unchanged. Standing line replaces `:228` and is **promoted out of `.dr-fineprint`** (9.5px mono, `--pf-ghost`, verified `arcana-profile.css:524`) into the serif reading voice:

> The tarot does not predict the future. It takes a matter you are already inside and lays it out in parts — what it rests on, what stands against it, where it tends, left as it stands. Every card that falls is written out for you.

Deck-failure string replaces `:641`:

> The deck is not answering. Refresh, or come back in a moment.

### S0 — the doors

Tiers label (`:260`) — **delete.** The sentence above now does its work, and "kept at its own link" above a price is the one place the room over-claims.

**A Sitting** — meta `3 CARDS · FIRST ONE FREE`, becoming `3 CARDS · $1.99` once spent.

> One matter as it stands now — what it rests on, what stands against it, where it tends. Your first sitting is free; after that it is $1.99.

Once `sittingUsed()`:

> One matter as it stands now — what it rests on, what stands against it, where it tends. Your free sitting is spent; a new one is $1.99.

**The Deep Read** — meta `5 CARDS · $2.99`.

> The same matter with time laid across it — what it grew from, and what it is pulled toward. Take it when the matter has a history.

Door 1 owns *now*; door 2 owns *time*. Neither is the other plus extra. The state change stays in the **sentence**, as the live code does today (`:262`), never demoted to 9px mono.

### S1 — the threshold

> What follows is for the first time you do this. It stays here for the fifth.

Once `sittingUsed()`:

> Your free sitting is spent. A new matter is a new cut.

### S2 — a Sitting, already cut

Eyebrow: `A SITTING, ALREADY CUT`

> *"I keep saying yes to more at work and telling myself it's temporary."*

Cue, the room's own live string: **Turn each card.**

**The Ground** — *what the matter rests on* · **Ten of Wands** · Upright

> The Ten of Wands embodies burden, overload, and the weight of responsibilities carried alone. Traditionally shown as a figure bent under the weight of ten wands, struggling toward a distant home with vision nearly blocked by the load. Fusing the number ten's culmination with the driving effort of Wands, the card signals success achieved through sheer determination but now strained by too much taken on at once. It favors recognizing when a load has grown unsustainable, and considering what can be set down or shared.

**The Crossing** — *what stands against it* · **Four of Cups** · Upright

> The Four of Cups embodies apathy, contemplation, and a discontent that has turned inward. Traditionally shown as a young figure seated beneath a tree with arms crossed, staring at three cups on the ground while a hand offers a fourth from a cloud unnoticed, it depicts a mind too absorbed in its own feelings to see what is being offered. Combining the number four's stillness and stability with the emotional inwardness of Cups, the card signals boredom, emotional withdrawal, or a reevaluation that has settled into restless dissatisfaction. It can also relate to taking a needed pause, though one that risks curdling into indifference if it lasts too long.

**The Turn** — *where it tends, left as it stands* · **Six of Swords** · Reversed

> Reversed, the Six of Swords indicates resistance to necessary change, or being unable to leave a difficult situation behind. It can point to a stalled transition, unresolved baggage carried into the next chapter, or a return to old troubles.

Binding line — **the machine's own output for this draw**, with the orientation repair applied:

> *Read as one — the matter rests on burden, is crossed by apathy, and tends toward transition, inward.*

Close:

> Three paragraphs and one sentence — that is the whole of what a cut produces. What is not on the table is the part you do: holding the first against the second, and asking whether the third is somewhere you are willing to arrive. Most entries end with what the card traditionally favors. That is a note about the card, not an instruction to you.

Lineage, verifiable against the bank (52 of 78 entries carry the phrase "Traditionally shown"):

> Each entry describes the traditional image the card is drawn from — the figure bent under ten wands, the ferryman on still water. The room deals the card by name; the picture is in the words.

Last line of S2:

> A matter you have already decided does not need three cards. A matter you keep re-deciding might.

### S3 — what you just watched

`THE SEAT ASKS`

> The Crossing did not hand you a worse card than the Ground. It asked a different question of it. Here is the Four of Cups in each seat.

Toggle — one card, one entry paragraph shown once and never swapped, two seat headers and two bridge lines that do:

- **The Ground** · *what the matter rests on* — *Then the matter already stands on a turning-away. Whatever is being asked now is being asked of someone who stopped looking up a while ago.*
- **The Crossing** · *what stands against it* — *Then the turning-away is the obstacle itself. Something is being held out, and the not-looking is what keeps it out of reach.*

Under both, fixed:

> The entry is the same in both. The seat is the question you put to it. That is how tarot has always worked, and it is why the position is printed above every card.

`UPRIGHT AND REVERSED`

> Half the deck lands turned; the shuffle is a coin. Upright, a card is out in the open. Reversed, it is the same card held back, delayed, or still gathering — inward, not yet.

The last three words are the two words already printed on the card face (`:214`). They appear here and nowhere else.

`READ AS ONE`

> Every Sitting closes on one sentence, built from the cards' own first words: *the matter rests on ___, is crossed by ___, tends toward ___.* Three holes, the same three, in the same order, every time. Filling them is the room's work. What they add up to is yours.

### S4 — three and five

> The Ground and The Crossing read the present tension. The Root and The Crown put the same matter in time. Five is a second axis, not more cards on the first, and the last clause is the same clause in both.
>
> A Turn summing four things has more to account for, not more to know. Take three when the matter is present and pressing. Take five when it has a history you already suspect is doing the work. A matter about another person takes three: no deck reaches into someone else's past or their wanting.

### S5 — what to lay down

> The field takes one sentence in your own words, and it is optional — with nothing laid down, the seats ask on their own. A matter works when you are standing inside it. It works less well when it asks for a date or a verdict.

1. *"I keep saying yes to more at work and telling myself it's temporary."*
2. *"I've been offered the job and I don't know which version of it I'd regret."*
3. *"Whether to keep putting money into something that has stopped paying its way."*
4. *"My sister and I haven't spoken since March and I don't know what I want from it."*

Set apart, with its line — *A matter about someone else comes back to you:*

5. *"Is he going to leave."* → 6. *"What I keep agreeing to here, without saying so."*

One and two are present, and are Sittings. Three and four carry a history, and are where five earns itself without a word of upsell. All six are under the field's `maxlength="120"` (`:325`) with room to spare; none teaches the ceiling. Static italic lines, not chips, not clickable.

Privacy — **this sentence renders at the field, in `intakeHTML()`, not on the scroll**:

> The matter is written into the reading's own address — that is how the reading comes back. Whoever holds the link reads it with the cards. Leave the field empty and the reading is whole either way.

### The doors again

Identical markup, identical strings. No escalation.

### S6 — the quiet answers

Continuous prose. No headings, no bolded questions.

> Some cards name cost, pressure, or refusal. A card that names a cost has described one, and describing is all it does. A new matter is a new cut and the cards fall fresh; a reading already drawn stays as it was cut. The reading lives at its own address and opens exactly as it fell, so the link is the whole of it — keep the link and you keep the reading. And a reading is a way of looking at a matter. Health, money, and law stay with the people qualified to speak to them.

### S7 — the record, and the Codex

> The mark and the code belong to the record, not to the cards. A reading that could be redrawn would be a record of nothing.
>
> Every card the deck can deal has a full entry in the Codex, and the method these spreads are built from is written out there in full, on the plate called The Antechamber.
>
> **The Antechamber, in the Codex →**

No per-card link row: it reopens what the reading just closed.

### Strings changed inside the reading flow

- **`:326` aria-label** → `"A question or situation. Optional. It is written into the reading's link."`
- **`:329`** — `"Nothing is charged here yet."` **stays.** (See §5.)
- **New, in `intakeHTML()` under the cut note:** `"A reading is a way of looking at a matter. Health, money, and law stay with the people qualified to speak to them."`
- **`:423`, gated on `st.question`** — with a matter: unchanged. Without: `"A reflection to sit with, not a forecast."`

---

## 3. THE SPREAD DOCTRINE

One shared string table; both spreads read from it.

**A SITTING — three cards, one polarity and its lean.**
· **The Ground** — what the matter rests on
· **The Crossing** — what stands against it
· **The Turn** — where it tends, left as it stands

**THE DEEP READ — the same three, with time laid across them.**
· **The Ground** — what the matter rests on
· **The Crossing** — what stands against it
· **The Root** — what it grew from
· **The Crown** — what it is pulled toward
· **The Turn** — where it tends, left as it stands

`SPREADS.deep` (`:126`) today ends `"where it tends"` and reads `"what it reaches for"`. Both change. `"left as it stands"` is the Turn's note in **both** spreads, from one source, with no exception — and the standing line at the top of the page uses the same words, so the page and the object print one phrase. `bindingLine()`'s five-card clause changes `"reaches for"` → `"is pulled toward"` to match.

**What five adds, honestly.** The Ground and The Crossing are a present-tense polarity. The Root and The Crown are a past/future polarity. Five is a second axis, not more cards on the first, and the Turn is the last clause of both sentences, unchanged. The cost, admitted in the same breath: a Turn summing four terms has more to account for, not more to know. Questions about another person route **down** to the Sitting — the Root and Crown on someone else's life invite the one claim doctrine forbids.

---

## 4. VISUAL BLUEPRINT

**Where the scroll begins.** The doors must finish with nothing competing in the same glance, and the hairline must be reachable in one gesture. Floor between the last door and the mark: roughly `clamp(56px, 12vh, 120px)`, against `.dr-landing`'s existing `clamp(34px, 7vh, 66px)`. A full empty screen on a page that has never scrolled reads as the end of the page.

**Rhythm.** The threshold gap is the only one that reads as a change of ground; every later gap is about half of it. Stations are deliberately unequal — S2 and S5 tall, S3 and S4 medium, S6 and S7 short. Each closes on a full-width hairline in `--pf-line-soft`. Rest is created, not assumed.

**Surfaces.** Parchment appears exactly once below the doors: the sample's card faces, reusing `.dr-cardface--front` unmodified **except** that the gold glow (`0 0 30px rgba(201,163,92,.10)`, `arcana-profile.css:546`) is dropped — that shadow is the room's signal for *this was cut for you*. No hallmark, no BR code, no filed date on the sample. Everything else is text on the ambient ground. **No new bordered container anywhere below the doors** — a bordered box around prose claims it as a feature, and two side by side is a pricing grid whatever the opacity.

**Marks — one, and it does work no sentence can.** The threshold hairline, in `--pf-line-cut`, with a slight hand waver: it stands for the cut, which the room already says is made by a hand. Drawn once on IntersectionObserver, then frozen; if the section is already substantially in view when it fires, snap to fully drawn — an unfinished line reads as broken, not as ceremony. Never loops. `aria-hidden="true"`, no hover, no cursor change, no tab stop.

**No placeholder glyph anywhere.** The blueprint's `▮` is cut: `READ AS ONE` and S4 quote the machine's real sentence instead, so the teaching device is the object rather than a typographic stand-in with no accessible name.

**No address strip.** It cannot show the truth legibly: the real address holds `encodeURIComponent` output (`:526`), and a 68-character matter becomes ~100 characters of percent-soup that would wrap to four lines inside `.pf-wrap`'s 294px at 320px. Show the truth and it is unreadable; prettify it and the disclosure is a lie. The sentence at the field does the work.

**Hover and focus.** The sample's face-down cards are real buttons carrying `[data-dr-turn]`'s existing aria-label shape and the inherited `.pf :focus-visible { outline: 2px solid var(--pf-gold-lit) }` — but they carry a **`data-dr-demo`** attribute, never `data-dr-turn` (see §6). The seat toggle is a real control with the same ring. Example matters are static italic lines.

**Mobile.** `.dr-tier` is a single-line flex row today (`align-items: baseline`, no wrap, `arcana-profile.css:604`). The longer subs need `flex-wrap: wrap` plus `flex-basis: 100%` on `.dr-tier__sub`: name and meta on line one, sub beneath. The sample deals through the existing `.dr-spread` clamps and the existing `max-width: 620px` rule already drops the suit/element line — no new breakpoint. The seat toggle stacks label above prose. The page body must never scroll horizontally.

**Reduced motion.** The hairline renders already drawn. The card flip is already collapsed by `@media (prefers-reduced-motion: reduce) { .dr-card { transition: none } }` — inherit it. The seat toggle swaps text with no crossfade. Nothing here is time-keyed; scroll is the only clock and the hand is the only trigger.

---

## 5. WHAT CHANGED IN THIS PASS

**Applied.**

- **The sample no longer out-performs the product** (CRITIC-PROBLEM 1). The blueprint's per-seat authored clauses are gone. The sample prints exactly what a cut produces — seat, note, name, orientation, bank paragraph, binding line — and the authored voice appears once, after it, saying what the reader adds. Nobody is surprised after paying.
- **Fatal #2 is dissolved, not built.** `readsHTML` (`:412`) *does* consume the position — it prints the label and the note. What it does not do is vary the meaning by seat, and it never should: in tarot the entry is constant and the seat is the question. The page now teaches exactly that (`"The entry is the same in both. The seat is the question you put to it."`), which kills a 390-string content build and satisfies visitor 5 rather than embarrassing the room.
- **Recognition and "why begin"** (CRITIC-PROBLEM 2): *"A matter you have already decided does not need three cards. A matter you keep re-deciding might."* It also disqualifies some visitors, which is why it is credible.
- **The scroller who never turns a card** (CRITIC-PROBLEM 3): *"Every card that falls is written out for you"* moved into the standing line, at the top, where nobody can miss it.
- **The superset door** (CRITIC-VISITOR 1): the two doors now name two axes — *as it stands now* / *with time laid across it* — and door 2 ends on a fit claim, not a size claim.
- **Examples a person could have written** (CRITIC-VISITOR 2): both therapy-shaped prompts cut; two flat, ordinary, half-specified matters added.
- **`"Nothing is charged here yet."` restored** (CRITIC-VISITOR 3): `controlHTML` (`:317`) already prints `Cut the deck · $2.99`, so money is in that step whatever the copy does. Deleting the reassurance does not remove the till; it removes the only thing letting a curious visitor look and leave.
- **Register**: eighteen denials down to five. The triad cut. *"There is no bad card"* cut. *"a force out in the open"* cut. *"The room supplies the grammar"* cut. `leans` → `tends` everywhere.
- **The invented lineage claim deleted** (CRITIC-VISITOR 6). Verified today: `codex.html` contains **zero** `<img>` elements and `codex-data.json` contains **zero** occurrences of "Rider" or "Waite". Replaced with a claim the bank actually supports — 52 of 78 entries carry "Traditionally shown".
- **`left as it stands` now genuinely ships** (NIT-LINE 1, NIT-STRUCTURE 1) — in both Turn notes and in the standing line.
- Case, spelling, Oxford comma, article, aspect, and numeral rules all fixed and stated.
- **The Codex CTA names the plate the Codex actually renders** — `codex.html:987` prints `'PLATE '+W_.roman+' · '+W_.title.toUpperCase()`, and "The Antechamber" is the title.

**Rejected.**

- **STRESSTEST 2's remedy** — that the 48 `"It favors"` clauses block commit 2. The finding is real and verified (48 of 78; 47 of them Minors; a three-card Sitting avoids all of them only 5.3% of the time). The remedy is wrong: the clause's grammatical subject is the card, the failure is a reading failure, and rewriting the bank rewrites the Codex, which is out of this page's scope. One sentence at the point of first contact converts it into something taught: *"Most entries end with what the card traditionally favors. That is a note about the card, not an instruction to you."* The data pass is a follow-on with a named owner, not a gate.
- **JUDGE-SAMPLE's "the miniature must be authored prose."** A sample that must be authored routes around the render path and destroys the only property worth building.
- **SILENCE-AUDIT's cut of the reversal beat** — partially. My sample's Turn is reversed, so the walk does carry one; the beat is cut from ~48 words to three sentences rather than deleted, because a newcomer will not infer "same card, held back" from a face label alone.
- **CRITIC-VISITOR 5's "the bench" objection** — moot; that sample is gone.

---

## 6. FATAL DETAILS

1. **`showLanding()` destroys a completed reading's address** (`:507`, `history.replaceState(null, "", addr())`), reachable from `tailHTML`'s `← the deck` (`:439`), two lines under *"Keep the link and it opens exactly as it fell."* The seal is `Date.now()+Math.random()` (`:109`) — unrecoverable. One line. This is the second visit's entire product.
2. **`showLanding()` also resets nothing else** — `STATE.drawn`, `STATE.revealed`, and `STATE.spread` survive, and the delegated handler (`:613`) matches `[data-dr-turn]` **anywhere** under `HOST`. So a visitor who abandons a draw, returns to the landing, and clicks a sample card runs `turn()` against the dead draw and hears a stranger's card read aloud through `[data-dr-live]`. Two fixes, both needed: the sample uses `data-dr-demo`, and `showLanding()` clears `drawn / revealed / spread / seed`.
3. **`bindingLine()` is orientation-blind** (`:147–150`; `firstKw()` at `:115` reads `keywords[0]` and never `.reversed`). Repair: append `", inward"` to a reversed card's keyword — the doctrine's own first word, met for the third time. Note the honest cost: this changes what an already-filed link *displays*. The seed still deals identical cards, so the record is intact; the prose around it is a rendering. That distinction should be stated once, to the builder, and never to a visitor.
4. **The deck runs incompatible reversal doctrines.** Verified: Eight of Cups reversed reads *"reluctance to leave a situation that has already run its course"* — the resolution family, not the inward family, and the opposite of what the face's `inward, not yet` promises. One doctrine across all 78, or the page may not print "the same card held back."
5. **`filedDate()` calls `new Date()` at render** (`:113`), above *"Drawn once. Not reissued."* and now under S7's *"A reading that could be redrawn would be a record of nothing."* `t` is already `Date.now().toString(36)` — decode it.
6. **`settings.js` states the opposite of the code** — the typed question rides in the URL and reaches the host on every reopen, while Settings lists tarot draws under what never leaves the device. Third instance of this defect shape on this surface.
7. **`"Drawn to the matter you laid down"` renders unconditionally** (`:423`) — told, at the emotional close, to the visitor who left the field empty.
8. **The doors and the scroll wait on the deck fetch.** `landingHTML()` runs only inside `fetch("codex-data.json?v=208").then` (`:640`). Neither needs card data. Render them first; let only the cut wait.
9. **`norm()` strips non-ASCII**, so a question in Cyrillic, Arabic, or Chinese contributes zero entropy to the seed. Reopen still matches, so it is cosmetic — but *"It closes the question"* is hollow for those visitors.

---

## 7. ACCEPTANCE CRITERIA

**Universal.** Tapping either door removes 100% of the scroll — assert `[data-dr-stage]` contains no explanatory node after `startReading()`. A `?read=` URL renders no scroll node. `← the deck` from a completed reading leaves the address bar unchanged, or Back restores it. Clicking a sample card after abandoning a real draw changes nothing in `STATE` and announces nothing. The string `left as it stands` appears in both spreads' Turn note, from one source. **The sample's rendered card text is byte-identical to what the live render path emits for those three cards in those seats and orientations** — built from a pinned `drawn` array, not a seed. *(CANNOT CONFIRM that any seed produces this exact triple; the sample must not claim one.)* Cover any **authored** line and the next authored line stops parsing; the bank paragraphs stand alone by design. No `<details>`, no bolded-question stack, no bordered box below the doors.

**Per lens.** **V1:** within one screen of the walk, one sentence names where the imagery comes from, and it is checkable against the bank. **V2:** door → Cut in two clicks, unchanged; the free-sitting state change appears in the door's **sentence**, not only its meta; the claim is true-or-silent, since `sittingUsed()` fails open (`:130`). **V3:** the standing line renders larger than any mono on the page; the words "beginner" and "no experience needed" appear nowhere; asked after S3 what reversed means, the answer contains neither "bad" nor "opposite". **V4:** both door subs name their own axis at position zero, and neither is the other plus extra. **V5:** the binding line for the sample carries the reversal; the seat toggle leaves the entry paragraph unchanged and says so; no sentence anywhere promises the card's words change by seat.

---

## 8. THE SMALLEST SLICE

1. `showLanding()` stops overwriting a completed reading's address, and resets the draw. Two lines. Nothing below the fold survives a visitor discovering their first reading is gone.
2. The standing line rewritten and promoted to serif; the tiers label deleted; both door subs and both metas replaced; the doors rendered before the fetch. **Zero new words below the fold.** This alone is testable and reaches visitor 4 before she buys.
3. Below the doors: floor, one hairline, one line, and **S2 only** — the three-card sample on a fixture, rendered through the live path, gated on the `bindingLine()` orientation branch.

If a stranger scrolls once, turns three cards, and can afterwards say what the seats did — with no S3, S4, S5, S6, or S7 in the build — the architecture is validated and the rest is writing. If they cannot, the remaining 600 words will not fix it, and the fleet has learned that for the price of one section.

---

## 9. WHAT REMAINS UNRESOLVED

**The price on the free door.** `$1.99` is invisible until spent (`:272`). I ship *"Your first sitting is free; after that it is $1.99."* and I have not resolved whether printing it costs more first draws than it buys returning trust. Fallback if refused: `3 CARDS · FIRST ONE FREE` with the sub ending at *"where it tends."* **That is a commercial call and it needs the builder's eye.** Related and unaddressed by anyone: five cards at $2.99 is 60¢ a card against the Sitting's 66¢, so the price ladder argues for five on exactly the axis the doctrine forbids. Copy cannot fix arithmetic.

**The reversal beat.** SILENCE-AUDIT would cut it entirely now that the walk carries a reversed Turn. I kept three sentences. If someone with an eye judges the walk carries it alone, cut the block — the page loses nothing else.

**The 48 counsel clauses.** I ruled it a follow-on, not a gate, and I may be wrong. If a first visitor reads *"It favors recognizing when a load has grown unsustainable"* as advice despite the framing sentence twelve lines above, the framing failed and the data pass becomes the gate after all. This is decidable only by watching one person read it.

**The half-believer.** S7's first paragraph is my attempt at the reconciliation nobody had written — the seal is a claim about the record, not about the cards. I am not confident it is enough, and I cannot see whether the stamp reads as a relic or as a receipt.

**I have no eye.** Nothing above is a claim that any of it looks good. The rhythm, the hairline's waver, the sample's weight against the doors, and whether the threshold reads as an invitation or as the end of the page are all judgments this synthesis cannot make and must not pretend to.

---

# APPENDIX A — THE BLUEPRINT (the synthesis lead, before the critics)

# THE DRAWING ROOM — DESIGN

Synthesis of 52 reports. Every code fact below was re-opened by me, not inherited. Line numbers are `drawing-room.js` unless marked.

---

## 1 · CURRENT-STATE AUDIT

**Strong — and load-bearing.** The seat sets are a practitioner's, not a content farm's: `The Ground / The Crossing / The Turn`, notes `what the matter rests on · what stands against it · where it tends, left as it stands` (:122–123). The three is *contained whole* inside the five (:125), so the free tier is structurally complete rather than clipped. `"The cut does not choose the cards. It closes the question."` (:328) is the best sentence in the building — it refuses the magic claim while keeping the ritual. The free Sitting withholds nothing internally. There is no daily card, no streak, no significator, no clarifier upsell, no per-minute pricing. The reversal gloss `inward, not yet` (:214) fires at the one instant it can teach. `reopen()` is correct and ungated — a filed reading's URL is its receipt.

**Absent.** Any positive substitution for "does not predict" — the clause after the negation is about custody, not about what a reading *does to a situation*. Any statement of what three and five differ *in*. Any question guidance. Any privacy fact. Any Codex link (grep: zero `href="codex` in `drawing-room.js` or the `.dr-*` CSS block). Any pair-read anywhere in the output.

**Confusing.** `3 cards` vs `5 cards · $2.99` (:272) is the only visible axis at position zero, and a number beside a price teaches exactly one thing — the thing doctrine forbids. `A Sitting` / `The Deep Read` are house nouns with no gloss, read by a newcomer as vocabulary they were supposed to have. `"kept at their link"` is heard as *saved to my account*, which is false (:11–15). `ARCANA · XVI` and `PENTACLES · EARTH` are stamped on the card face with no derivation anywhere.

**MUST NOT CHANGE.** The doors' position and count. The cut note (:328). The reversal gloss's two words, in every place they appear. The seat *names*. `reopen()`'s ungated path. The dark-backed / light-faced deck law. The absence of streaks, daily draws, and a tenth position. And the free Sitting's completeness.

---

## 2 · VISITOR-LENS MATRIX

| | **knows** | **feels** | **fears** | **must have answered** | **ready for** |
|---|---|---|---|---|---|
| **1 · New to Blue Room, not to tarot** | tarot; nothing about this house | evaluative, mildly curious | that this is a generator with good typography | is there a practice behind this | a sample they can inspect in eight seconds |
| **2 · Returning, immediate access** | the room; her own last draw | transactional, in a hurry | that something moved | is my free sitting spent (already answered on the door) | one tap, and her old link still working |
| **3 · Knows almost nothing** | that tarot exists | exposed the moment the page asks him to *produce* | being seen not understanding — expressed only at the blank field | then what is it **for**; what do I type; is a reversed card bad | a gesture he can perform at zero risk before any word explains it |
| **4 · Knows a little** | card names, "past/present/future" | confident, skimming | nothing — this is the danger | that three vs five is not size but axis | correction of one specific wrong model, delivered where he'll hit it |
| **5 · Experienced** | more than the page | auditing; decision made in ~8s on the sample, never on the claim | shallow spread logic; incoherent reversal doctrine | whose deck; does position govern the read; is the synthesis real | method stated as specification, and a worked reading that performs it |

Visitor 4 is the one nobody can re-catch — she draws anyway. She is also the only one who buys five for the forbidden reason, which is why the tier correction must live at position zero, not six screens down.

---

## 3 · EMOTIONAL JOURNEY

| station | enters feeling | delivered | leaves feeling | failure mode |
|---|---|---|---|---|
| **S0 head + doors** | curious / transactional | what tarot does here; two doors, each naming its seats | oriented, or gone (correctly) | thesis stays at 9.5px and is never read |
| **S1 floor + mark** | is that all? | there is more, and it is optional | willing to descend | reads as the end of the page |
| **S2 the Sitting, running** | idle | a gesture, then a reading that issues no order | **agency** — hand moved, object responded | it acquires a hallmark/code/glow and becomes a stranger's fortune in the visitor's seat |
| **S3 what you watched** | "what just happened" | position governs card (shown, not stated); reversal = direction; the spine | **comprehension**, retroactive | it explains a demo visitor 4 skipped |
| **S4 three and five** | which one | same sentence, two clauses inserted, identical last clause | **safety** — five is wider, not truer | reads as base-plus-addon, i.e. a pricing tile |
| **S5 what to lay down** | can I ask mine | three worked questions; other-people reframed; where the question travels | **readiness** with a sentence in hand | the blank field, unfurnished — the page's one exit where a person can feel stupid |
| **doors** | ready | nothing new | acting | escalated copy converts one offer into a funnel |
| **S6 quiet answers** | checking for traps | link, free sitting, not-advice | **trust** | rendered as a Q&A block; becomes SaaS support |
| **S7 record + Codex** | finished | the stamp as an object; one door to the study | **respect** | a link row reopens what the reading just closed |

---

## 4 · THE THREE WORTH PRESENTING

Six were built. Three are live options; three are cut. **Question-led** puts a bank of eight example matters at the highest-traffic scroll position — the genre's most tired artifact, and a menu, which ages worst for the returning visitor. **Object-led** is a connoisseur's grammar that serves visitor 5 best and visitor 3 worst — and visitor 3 is the brief's stated problem. **Doctrine-led** organises eleven stations around the page's rarest live objection; the objection ledger is decisive that "does this predict the future" is not in the top six reasons this tab closes.

| | **DEMONSTRATION-LED (2)** | **ESSAY-LED (5)** | **MINIMAL (6)** |
|---|---|---|---|
| **strength** | delivers *agency first* — the brief's opening emotion — by gesture, not assertion; wins visitor 5 on the sample before any preamble; every later section is an answer, so it self-limits | transitions do argumentative work, so "more context, not more accuracy" is inherited rather than asserted; cheapest to build; the only form a content farm cannot fake | every claim it makes is one the code already keeps; doors stay the tallest object; no new component can drift from the real spread |
| **risk** | one framing element away from a stranger's fortune; cannot ship over the three defects | no handles — this page's traffic is scanners; one flat paragraph collapses the descent below it | no second instrument if a first reading lands flat; gives up recognition entirely |
| **density** | uneven — one heavy object, then thin | low per screen, ~1,000 words total | very high; every line does two jobs |
| **mystery** | high, produced by an object | high, produced by pacing; slips to coy if overturned | high by omission |
| **clarity** | highest — comprehension is retroactive | total for a reader, near-zero for a scanner | complete on the decision, thin on the practice |
| **fit** | 19/20 | 17/20 | 11/20 as architecture; **first** as a patch set |

---

## 5 · THE RECOMMENDED ARCHITECTURE

**RULING — build Demonstration-led, and ship it in two commits, gated.** Minimal is right that explanation is leverage on a defect, and every architecture's centrepiece is falsified by the same three code faults. That is a sequencing argument, not an architecture argument. **Commit 1** is the repair plus Minimal's position-zero edits (§8). **Commit 2** is the scroll. No blending: Minimal never ships as the destination, and the scroll never ships before the gate.

The entire stack lives inside `landingHTML()`. `startReading()` (:508) and `showLanding()` (:507) replace `[data-dr-stage]` wholesale, and `reopen()` (:600) never renders the landing — so education cannot stand between a visitor and a reading, for free, with no visibility bookkeeping. Scroll-keyed anything listens on `.pf`, which is the scroll container; `window.scrollY` is dead here.

**S0 · HEAD AND DOORS.** *Why now:* visitor 2 must complete here. Two changes only. The standing line is rewritten to substitute rather than change subject — *"The tarot does not predict the future. It takes a situation you are already inside and lays it out in parts — what it rests on, what stands against it, where it leans if nothing moves."* — and **promoted out of `.dr-fineprint`** into the serif reading voice. `"and kept at their link"` is deleted here and survives in `tailHTML`, where custody actually exists. Each door's `.dr-tier__sub` names its seats *in the sentence*, never as a `·` list under a price. This is the only fix for the tier inference that reaches visitor 4 before she buys.

**S1 · FLOOR AND ONE MARK.** *Why now:* this page has never scrolled; there is no learned expectation of more. One hairline in `--pf-line-cut`, drawn once on intersection and frozen, and one line: *"What follows is for the first time you do this. It stays here for the fifth."* **Ruling against SILENCE-AUDIT**, which cut it as signage: silence only works on a visitor who knows to look, and this one does not.

**S2 · THE SITTING, RUNNING.** *Why now:* agency is the brief's first emotion and it arrives by hand, not by reading. Three face-down cards on a fixture, turning on click via the room's own flip. **Rendered through the live `readsHTML` path.** No hallmark, no BR code, no filed date, no gold glow — the absence of every artifact of a real cut is what marks it as a sample, plus one frame line.

**S3 · WHAT YOU JUST WATCHED.** *Why now:* every abstraction has a referent five seconds old. Cut the lifted sentence *"a card in a position is an answer"* entirely — replace with the **seat swap**: one fixed card, a two-state seat label, prose that changes underneath. Then the reversal beat, using only the two words already on the face. Then the spine, named as a spine.

**S4 · THREE AND FIVE.** *Why now:* five is honestly describable only as three-plus-a-second-axis, and the grammar was taught one station ago. The spine shown empty, then with two clauses inserted, **identical last clause**. Costs two clauses, not a section.

**S5 · WHAT TO LAY DOWN.** *Why now:* the blank field is this room's only exit where a person can feel stupid, and it is the last thing before they act. Three examples — not eight. One visibly turned back toward the asker. The privacy fact stated as an affordance, plus a static mono strip under the field showing the address forming as they type, emptying when they clear it.

**DOORS, again.** Same two doors, same words, no escalation. This is the readiness peak.

**S6 · THE QUIET ANSWERS.** *Why now:* these are the questions of someone who has decided and is checking for traps. Continuous prose, no headings, no bolded questions.

**S7 · THE RECORD, AND THE CODEX.** *Why now:* the page ends by naming where the study lives, not by selling again. The `.dr-filed` stamp as an object, then one line and the existing `→` into the Antechamber guide plate. **Not per-card links** — they reopen what the reading just closed, and I **CANNOT CONFIRM** the Codex's anchor scheme, so per-card deep links are a build, not a string.

---

## 6 · THE SPREAD DOCTRINE, SETTLED

One shared string table. Both spreads read from it. The `deep` set is the outlier against both `sitting` and the Codex guide, and it loses.

**A SITTING — three cards, one polarity and its lean.**
- **The Ground** — what the matter rests on
- **The Crossing** — what stands against it
- **The Turn** — where it tends, left as it stands

**THE DEEP READ — the same three, with time laid across them.**
- **The Ground** — what the matter rests on
- **The Crossing** — what stands against it
- **The Root** — what it grew from
- **The Crown** — what the matter is being pulled toward, by the person holding it
- **The Turn** — where it tends, left as it stands

`"left as it stands"` appears every time the Turn is named, in both spreads, with no exception. The Crown is never left subjectless — *"what it reaches for"* alone is an outcome card, and an outcome card is a forecast.

**What five adds, stated honestly:** Ground↔Crossing is a present-tense polarity; Root↔Crown is a past/future polarity. Five is not more cards on one axis, it is a second axis. The Turn is the last clause of **both** sentences, unchanged. And the cost, admitted in the same breath: a Turn summing four terms is more constrained and less resolved — five buys a Turn that has to account for more, not one that knows more. Questions about another person route **down** to the Sitting, because Root and Crown on someone else's life invite the one claim doctrine forbids.

---

## 7 · HIGH-LEVERAGE DETAILS, RANKED

1. **The thesis is set as fine print.** Verified: `.dr-fineprint` is 9.5px mono in `--pf-ghost` (`arcana-profile.css:524`), directly under a `clamp(30px,4.6vw,46px)` serif headline that says "The Drawing Room" — a name already said in the eyebrow above it. The one sentence that decides whether a stranger stays is reached second or not at all. **+0 words below the fold, −13 above, one type-ramp promotion.** Highest leverage on the surface.
2. **The seats, named in the door sub-sentence.** Kills the "five is better" inference at position zero, six screens earlier than any scroll can.
3. **The seat swap (S3).** Teaches position-governs-card with no sentence, and cannot be built over a renderer that ignores seats — building it forces the fix.
4. **The address strip under the field.** The only disclosure a true newcomer cannot route around, and it hands agency back by visibly emptying.
5. **The sample rendered through `readsHTML`.** Converts the demonstration from a claim into a test the product must pass.
6. **Three examples, not eight.** A menu is the fastest-ageing object on any page; three read as shapes, eight as an inventory of the house's imagination.
7. **Delete `"Nothing is charged here yet."`** — do not replace. A sentence stating a free step is free introduces money to a step that had none.
8. **Fix the `aria-label` (:326).** *"It is kept with your reading"* is the only description of the question's fate in the room and it implies custody — served exclusively to people who cannot see the page.

---

## 8 · FATAL DETAILS, RANKED — the gate on commit 2

1. **`showLanding()` destroys a completed reading's address.** Verified at :507 — `history.replaceState(null, "", addr())`, reachable from `tailHTML`'s `← the deck` (:439), two lines under *"Keep the link and it opens exactly as it fell."* `doCut()` also used `replaceState` (:526), so the reading never held its own history entry and Back does not restore it. The seal is `Date.now()+Math.random()`; it is unrecoverable. **One line. This is the second visit's entire product.**
2. **`readsHTML` consumes no position.** Verified at :412–414: the position and note render as a caption, and the body is `(rev && c.reversed) ? c.reversed : c.meaning`. The Tower in The Ground and in The Turn print byte-identical text. Every architecture's comprehension beat stakes itself on a claim the renderer refutes three times per Sitting.
3. **`bindingLine()` is orientation-blind.** :147–149 → `firstKw()` (:115) returns `keywords[0]` and never reads `.reversed`. The one sentence claiming to read the cards together discards half the information the ceremony spent 720ms per card teaching.
4. **The deck runs three incompatible reversal doctrines.** Verified sample: Eight of Cups reversed reads *"reluctance to leave a situation that has already run its course"* — the resolution family, not the inward family, and the opposite of what the face's `inward, not yet` promises. One doctrine across all 78, or no page may print "the same force, turned inward."
5. **The paid door drops the anti-prediction guard.** Verified: `sitting` (:123) ends `"where it tends, left as it stands"`; `deep` (:126) ends `"where it tends"`.
6. **`settings.js` states the opposite of the code.** Verified at :398 — *"the only thing in Blue Room that sends anything you have typed anywhere"* — and :404, under *"What never leaves your device, under any circumstance in this build,"* lists *"Every tarot draw."* The typed question rides in the URL and reaches GitHub on every reopen. Third instance of this exact defect shape on this page.
7. **`$1.99` is invisible until spent.** Verified at :272 — price prints only when `paidNow`. A first-timer never sees the post-trial price while deciding whether to spend the trial.
8. **`"Drawn to the matter you laid down"` renders unconditionally** (:423). The visitor who left the field empty is told at their emotional close that the reading was drawn to a step they did not take.
9. **`filedDate()` calls `new Date()` at render** (:113). The record restamps itself, above *"Drawn once. Not reissued."*

---

## 9 · ACCEPTANCE CRITERIA

**Universal, testable.** · Tapping either door removes 100% of the scroll — assert `[data-dr-stage]` contains no explanatory node after `startReading()`. · A `?read=` URL renders zero explanatory nodes. · `← the deck` from a completed reading leaves the address bar unchanged, or Back restores it. · The string `left as it stands` appears in both spreads' Turn note, from one source. · The sample's rendered per-card text is byte-identical to what `readsHTML` emits for those cards in those seats. · Cover any sample paragraph and the next one stops parsing. · No `<details>`, no bolded-question stack, no bordered comparison boxes, no filled parallel containers anywhere below the doors.

**Per lens.** · **V1:** within one screen of the walk, one sentence names the deck's lineage and that the faces are set, not illustrated. · **V2:** floor path is door → Cut, two clicks, unchanged; no conditional sentence below the doors makes a free-tier claim (true-or-silent, never true-or-wrong — `sittingUsed()` fails open at :130). · **V3:** the thesis sentence renders larger than the room's name; the address strip updates on keystroke; the word "beginner" and the phrase "no experience needed" appear nowhere. · **V4:** the seats appear inside both door sub-sentences at position zero, before any scroll. · **V5:** swapping any one card in the sample changes the closing paragraph; the binding line for the sample's draw carries the reversal; `readsHTML` output differs by seat.

---

## 10 · UNRESOLVED DISAGREEMENTS

**I overruled JUDGE-SAMPLE on the sample, and it is the closest call here.** It picked SAMPLE 2 (Relational) on interlock, reversal fidelity and its close — all correct — then required fix #4: *"the miniature must be authored prose."* A sample that must be authored is a sample that routes around `readsHTML`, which destroys the one property that makes the demonstration worth building. **SAMPLE 4 (Vocation) ships**: Ace of Wands reversed reads *"inspiration that has not yet found its direction"* verbatim in the bank, so it survives the live render path unchanged. This also overrules five documents (`READING-SHAPE`, ARCH-2/3/4/5) that insisted on the Codex's own walked Sitting — that instruction was a fabrication guard, and S4 satisfies it while additionally satisfying the render test the Codex walk fails. Consequence: *"whether to keep holding something that has stopped paying its way"* is freed and becomes the lead example in S5, dissolving `COHERENCE` conflict #3.

**Still open, genuinely.** · **SILENCE-AUDIT vs. everyone on the orientation beat.** It argues that if the walk carries a reversal, a standalone beat is the sixth explanation of one rule and two words on the object beat ninety in front of it. `PATRONISE` independently counted six explanations. I kept a compressed beat in S3 because S4's reversal is in the Crossing rather than the Ground and does less teaching work than The Tower would. If someone with an eye judges the walk carries it alone, cut S3's second block entirely.

· **`OBJECTION-LEDGER` vs. `PATRONISE` on "what if I get a bad card."** Patronise ranks it a newcomer anxiety beneath visitor 5; the ledger argues fifteen-year readers hold it harder. I sided with the ledger and kept it — but it survives dissolved into S6's prose, not as an FAQ entry, which satisfies neither of them fully.

· **`COMMERCE` vs. `OBJECTION-LEDGER` on the hidden `$1.99`.** Commerce calls it the most cynical element on the page; the ledger demotes it — a price you cannot see cannot make you leave. Both are right on their own axis. I ranked it 7th under fatal because its damage is deferred to visitor 2's good faith, and I have not resolved whether printing it on the free door costs more first-draws than it buys returning trust. **That is a live commercial question and it needs the builder's eye, not another agent.**

· **The half-believer.** `OBJECTION-LEDGER` alone identified it: the copy says descriptive instrument, the object hands over a sealed relic with an accession code. Its proposed reconciliation — the seal is a claim about the *record*, not about the cards — is one sentence and nobody has written it. I have not placed it. It probably belongs in S7, and I am not confident.

· **`READERS-KNIFE`'s per-seat clause.** It demands one clause per card, written before the dictionary paragraph, or the position claim gets deleted. That is a content build of 78×5 strings, or a generator, and no document has scoped it. Until it exists, S3's seat swap has two states and no more — and the page must not promise that every card reads differently in every seat, only that these do.

---

# APPENDIX B — THE CONTENT LEAD PASS (superseded by the FINAL above where they differ)

# THE DRAWING ROOM — CONTENT

Architecture as locked: Demonstration-led, two commits, gated. Everything below lives inside `landingHTML()`. All quoted live strings re-verified in `drawing-room.js` and `arcana-profile.css`; all card text re-read from `codex-data.json`.

---

## 1 · TEXT WIREFRAME

| # | Station | Volume | Hierarchy | Disclosure |
|---|---|---|---|---|
| **S0** | Head · thesis · two doors | ~70 w | thesis is the **second-largest** type on the page; doors are the tallest objects | default-visible |
| **S1** | Floor · one hairline · one line | 15 w | smallest voice on the page (`.dr-fineprint` register) | default-visible; one state-swap when `sittingUsed()` |
| **S2** | A Sitting, running | ~40 w authored + live render | tallest block; card faces are the only parchment | **gesture-gated**: three cards start face-down and turn on click — the product's own gesture, not a widget |
| **S3** | What you just watched | ~150 w | three sub-blocks, each opening on a mono label | **gesture-gated**: the seat toggle, two states |
| **S4** | Three and five | ~70 w | the spine, twice, set in `.dr-binding`'s serif voice | default-visible |
| **S5** | What to lay down | ~150 w + 6 question strings | examples set as spoken italic lines, never chips | default-visible; address strip updates on keystroke |
| **—** | **The doors again** | 0 new words | identical markup to S0 | default-visible |
| **S6** | The quiet answers | ~120 w | continuous prose, no headings, no bolded questions | default-visible |
| **S7** | The record · the Codex | ~60 w | ends on one arrow | default-visible |

Total new visitor-facing copy: **≈ 675 words**, against the fleet's drafted 1,485. No `<details>` anywhere. Nothing on this page is hidden behind a click; two things are *performed* by one.

---

## 2 · EXACT DRAFT COPY

### S0 — head and doors

**Standing line** (replaces `:228`, promoted out of `.dr-fineprint` into the serif reading voice):

> The tarot does not predict the future. It takes a situation you are already inside and lays it out in parts — what it rests on, what stands against it, where it leans if nothing moves.

`"and kept at their link"` is deleted here. It survives in `tailHTML`, where custody actually exists.

**Tiers label** (`:260`) — **delete.** "kept at its own link" in a sales position above a price is the one place the room over-claims, and the sentence above now does the label's job.

**Door 1 — A Sitting**
- meta: `3 CARDS · FIRST FREE, THEN $1.99` → once spent: `3 CARDS · $1.99`
- sub: *Three seats to one matter — what it rests on, what stands against it, where it leans.*

**Door 2 — The Deep Read**
- meta: `5 CARDS · $2.99`
- sub: *The same three, with time laid across them — what it grew from, and what it is being pulled toward.*

The seats live **inside the sentence**, never as a `·` list under a price. Together these two subs kill the five-is-better inference at position zero, six screens before any scroll can. Printing `$1.99` on the free door is a commercial call flagged in the blueprint as the builder's; the string above is my recommendation, and the fallback if it is refused is `3 CARDS · FIRST FREE`.

### S1 — floor and first mark

> What follows is for the first time you do this. It stays here for the fifth.

When `sittingUsed()` is true, this one line — and nothing else below it — swaps to:

> A new question is a new draw. The one you drew is at the link you kept.

True whether or not they kept it, makes no claim about the person, and degrades to the first-visit line when storage is blocked. **True-or-silent, never true-or-wrong.**

### S2 — the Sitting, running

Eyebrow (mono): `A SITTING, ALREADY READ`

Matter, in the field's italic serif voice:

> *"I'm being offered the studio job and I'd have to shelve my own work to take it. I don't know which one I'd regret."*

Cue, reusing the room's own live string (`:420`): **Turn each card.**

After the third turn, the close:

> The Ground named what is being appraised. The Crossing named the thing that cannot be appraised yet. The Turn named the direction those two make, if neither moves. Nothing in the three chose for you.

Then the lineage sentence — one screen from the walk, satisfying V1:

> The readings follow the Rider–Waite–Smith tradition, which is where the imagery in them comes from. The faces here are set rather than illustrated; the pictures live in the Codex.

### S3 — what you just watched

`THE SEAT ASKS`

> The Crossing did not describe a worse card than the Ground. It asked a different question, and the same card answers it differently.

Then the toggle: one fixed card, a seat label with two states, prose changing underneath. Eight of Cups (`walking away · seeking meaning · letting go · disillusionment · a deeper search`):

- **In the Ground** — *The matter already stands on a departure that has happened. The question is being asked from the far side of it.*
- **In the Crown** — *Leaving is what the matter reaches toward, and has not done.*

`UPRIGHT AND REVERSED`

> Half the deck lands turned; the shuffle is a coin. A card upright is a force out in the open. The same card reversed is that force with its face turned away — held back, delayed, or still gathering. Inward, not yet. Not its opposite, and not its punishment.

The last three words of the gloss are the two words already printed on the card face. They appear here and nowhere else.

`READ AS ONE`

> The three seats are a sentence with three holes in it: **rests on ▮, is crossed by ▮, leans toward ▮.** The room supplies the grammar. What the cards make of it is yours to read.

A spine, never "the room writes you a sentence." That framing survives the machine; the other one does not.

### S4 — three and five

> Ground and Crossing read the present tension. Root and Crown put the same matter in time. Five is not more cards on one axis — it is a second axis, and the last clause is the same clause in both.
>
> *rests on ▮, is crossed by ▮, **grew from ▮, is pulled toward ▮,** leans toward ▮*
>
> A Turn summing four things has more to account for, not more to know. Take three when the matter is present and pressing. Take five when it has a history you already suspect is doing the work. A matter about another person takes three: no deck reaches into someone else's past or their wanting.

That last sentence recommends **down** the price ladder, and it is doctrinally required rather than generous.

### S5 — what to lay down

Introducing line, and then the questions (§3 below).

Privacy, at the field, before the cut:

> The matter is written into the reading's own address — that is how the reading comes back. Whoever holds the link reads it with the cards. Leave the field empty and the reading is whole either way.

### S6 — the quiet answers

Continuous prose. No headings, no bolded questions, no Q&A alternation.

> There is no bad card. Some name cost, pressure or refusal, and a card that names a cost has not handed you one. A new matter is a new cut and the cards fall fresh; a reading already drawn is never redrawn. The reading lives at its own address and opens exactly as it fell — it is not on a shelf and it is not on this device, so the link is the whole of it. And a reading is a way of looking at a matter, not counsel on health, money or law. Those stay with the people qualified to give them.

### S7 — the record, and the Codex

> The mark and the code belong to the record, not to the cards. A reading that could be redrawn would not be a record of anything.
>
> Every card the deck can deal has a full entry in the Codex, and the method these spreads are built from is written out there in full. A reading tells you where a card fell. The Codex tells you what the card is.
>
> **Reading the Cards, in the Codex →**

The first paragraph is the reconciliation the blueprint left unplaced: it lets a reader hold "descriptive instrument" and "sealed relic" at once, by saying what the seal is a claim *about*. One arrow, one destination, the plate's own title as its label. No per-card link row — it reopens what the reading just closed.

---

## 3 · THE QUESTIONS ON THE PAGE

Six question strings appear, in this order. Not eight: a bank is a menu, and a menu is the fastest-ageing object on the page for the visitor who comes back.

**Introducing line, S5:**

> The field takes one sentence in your own words, and it is optional — with nothing laid down, the seats ask on their own. A matter works when you are standing inside it. It works less well when it asks for a date or a verdict.

1. *"I'm being offered the studio job and I'd have to shelve my own work to take it. I don't know which one I'd regret."* — S2's own, printed above the sample. 114 chars, inside the field's `maxlength="120"`.
2. *"Whether to keep holding something that has stopped paying its way."*
3. *"What I am actually protecting by staying quiet."*
4. *"What keeps putting me back in this same place."*

Then, set apart, the reframe pair with its line — *A matter about someone else comes back to you:*

5. *"Whether she is going to change her mind."*
6. *"What I keep agreeing to here, without saying so."*

Order is load-bearing. 2 and 3 are Sittings; 4 is the one shape three cards structurally cannot answer, so it argues for five without a sentence of upsell; the pair last, because it teaches the boundary by demonstration and closes on the asker's own participation. Nothing here is a mystical prompt, and none of the four forward examples can be answered *yes*.

For the first slice these are **not clickable**. There is no question field on the landing, and pre-fill machinery introduces a pending-state and a commercial decision the visitor did not make.

---

## 4 · THE SAMPLE READING AS IT APPEARS

**Rendered through the live `readsHTML` path.** The authored layer is exactly three things: the matter, one clause per seat, and the close. The dictionary paragraph under each clause is the bank's own text, unaltered — that is the point of the object.

**The Ground · Seven of Pentacles, upright**
> *A stock-take, not a fork. What the matter rests on is labour already spent and a yield you can name.*

**The Crossing · Ace of Wands, reversed**
> *And the other side has no yield to name — the spark is still in the hand. The stall is not indecision; only one of the two things is currently an object.*

**The Turn · Eight of Pentacles, upright**
> *So it leans toward whichever one can be practised, and at the moment only one of them can be. The lean is toward the bench. It does not say whose.*

Binding line — verbatim machine output for this draw, verified against `firstKw()`:

> *Read as one — the matter rests on patience, is crossed by inspiration, and tends toward diligence.*

**The interlock test, run:** cover the Ground clause and *"the other side has no yield to name"* has no other side. Cover the Crossing and *"whichever one can be practised"* has no antecedent. The authored clauses break when separated; the bank paragraphs do not, and cannot — which is precisely the difference the sample exists to show.

**Two gate items this sample surfaces, both verified today, neither optional:**

- `bindingLine()` prints *"is crossed by inspiration"* for a card that is reversed. Repaired: *"is crossed by inspiration, not yet out"* — the same two words as the face gloss, met for the third time.
- The Seven and Eight of Pentacles both end their bank meaning with **"It favors…"** — an instruction, printed under a close that says nothing chose for you. The trailing clause on these three cards must be made descriptive before commit 2. The other ~45 are a follow-on, not a blocker.

---

## 5 · VISUAL BLUEPRINT

**Where the first new content becomes visible.** The doors must finish — nothing competing in the same glance — and the hairline must be reachable in one gesture. Floor between the last door and the mark: roughly `clamp(56px, 12vh, 120px)`, against `.dr-landing`'s existing `clamp(34px, 7vh, 66px)`. On a 900px viewport the mark's top edge should sit close enough below the fold that one scroll lands it; a full empty screen on a page that has never scrolled reads as the end of the page.

**Rhythm.** The threshold gap is the only one that reads as a change of ground; every later station gap is about half of it. Stations are deliberately unequal — S2 and S5 tall, S3 and S4 medium, S6 and S7 short. Each closes on a full-width hairline in `--pf-line-soft`. Rest is created, not assumed.

**Parchment.** Tier 2 appears **once**: the sample's card faces, reusing `.dr-cardface--front` unmodified except that the gold glow (`0 0 30px rgba(201,163,92,.10)`) is dropped — that shadow is the room's signal for *this was cut for you*, and a sample must not borrow it. No hallmark, no BR code, no filed date. Everything else on the scroll is Tier 0: text on the ambient ground, separated by hairlines. **No new bordered container anywhere below the doors** — a bordered box around prose claims it as a feature, and two bordered boxes side by side is a pricing grid whatever the opacity.

**Marks, and whether they mean anything.** Two, and both do work no sentence can. (1) The threshold hairline, in `--pf-line-cut`, with a slight hand waver — it stands for the cut, which the room already says is made by a hand. Drawn once on IntersectionObserver, then frozen; if the section is already substantially in view when it fires, snap to fully drawn rather than play late — an unfinished line reads as broken, not as ceremony. Never loops: a cut that repeats is not a cut. (2) The address strip under the field, mono, hairline, showing `?read=sitting&t=…&q=` with the visitor's own words appearing inside as they type, and visibly shrinking back to nothing when they clear it. Static. No fade, no highlight, no colour change — animating a privacy disclosure is theatre where the register forbids it.

**Hover and focus.** The sample's face-down cards are real buttons: reuse `[data-dr-turn]`'s existing aria-label shape, and the inherited `.pf :focus-visible { outline: 2px solid var(--pf-gold-lit) }`. The seat toggle is a real control and takes the same ring. The hairline and the address strip carry **no** hover, no cursor change, no tab stop, and the hairline is `aria-hidden="true"` — giving an explanatory mark the affordance of a control is the failure this page exists to avoid. The example matters are static italic lines, not chips.

**Mobile.** `.dr-tier` is today a single-line flex row (`align-items: baseline`, no wrap). The longer subs need it to become a two-line block: name and meta on the first line, sub on its own line beneath (`flex-wrap: wrap` + `flex-basis: 100%` on `.dr-tier__sub`). The sample deals through the existing `.dr-spread` clamps, and the existing `max-width: 620px` rule already drops the suit/element line — no new breakpoint. The seat toggle stacks label-above-prose. **The address strip is the one real hazard**: a 120-character question in mono will push the page sideways unless it wraps inside its own block. The page body must never scroll horizontally.

**Reduced motion.** The hairline renders already drawn. The card flip is already collapsed by `@media (prefers-reduced-motion: reduce) { .dr-card { transition: none } }` — inherit it, do not add a faster version. The seat toggle swaps its text with no crossfade. Nothing on this page is time-keyed; scroll is the only clock, and the visitor's hand is the only trigger.

---

## 6 · WHAT TO PROTOTYPE FIRST

**The seat swap in S3, over a repaired `readsHTML`.** It is the only device in the build that cannot be faked around the defect it demonstrates: over a renderer that ignores position, the two states print identical prose and the page refutes itself in one click, in public. Building it forces fatal #2 to land. Every other element on this scroll can be shipped over the broken renderer and merely be dishonest.

Second: the standing line at its new size. That is a type-ramp change, not a copy change, and it is the highest-leverage edit on the surface — the sentence that decides whether a stranger stays is currently 9.5px in `--pf-ghost` beneath a 46px headline that repeats the room's own name.

---

## 7 · WHAT TO TEST WITH VISITORS

**First-time, tarot-naïve.** Ask, before they scroll, "what does this do?" — if the answer is about links or permanence, the standing line has not substituted. Watch whether they turn a card in S2 unprompted; if they read past it, the face-down affordance failed and the whole architecture is inert. After S3, ask what "reversed" means — the answer must not contain "bad" or "opposite." At the field, watch for the pause: the cursor blinking in an empty box is this page's only place a person can feel stupid.

**First-time, experienced.** Time to first scroll. Then hand them the sample and ask what is wrong with it — if they find the binding line before you fix it, that is the eight-second verdict, live.

**Returning.** Two things only: does their old link still open, and can they reach a cut in two clicks. Then ask what they expected "kept at its link" to mean the first time — the answer to that question is the second visit's entire product.

**One thing not to test:** whether people prefer more explanation. They will say yes. The page is judged on whether the object keeps what the scroll promised, and that is a code question.

---

## 8 · THE SMALLEST IMPLEMENTATION SLICE

One landing block, no new components, validating the whole thesis:

1. `showLanding()` stops overwriting a completed reading's address (`:507`). One line. It is not part of the scroll, and nothing below the fold survives a visitor discovering their first reading is gone.
2. The standing line rewritten and promoted to serif; `"and kept at their link"` deleted; the tiers label deleted; both door subs and both meta strings replaced. **Zero new words below the fold** — this alone is testable, and it reaches visitor 4 before she buys.
3. Below the doors: floor, one hairline, one line, and **S2 only** — the three-card sample on a fixture, rendered through `readsHTML`, gated on the per-seat clause for three cards and the orientation branch in `bindingLine()`.

That is the concept. If a stranger scrolls once, turns three cards, and can say afterwards what the seats did — with no S3, S4, S5, S6 or S7 in the build — the architecture is validated and the rest is writing. If they cannot, no amount of the remaining 600 words will fix it, and the fleet has learned that for the price of one section.