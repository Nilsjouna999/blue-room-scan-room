# Tarot v2 — Guide Copy (final)

The single source of authored copy for both surfaces: the reading page's on-page
essentials, and the Codex's full tarot guide. Everything below is either **LIVE**
(quoted verbatim from the shipped code) or explicitly marked **PROPOSED** (drafted,
not yet wired in). Implementers should quote this file, not paraphrase it.

Voice: archival, human, intimate, spare. Never corny, never backend jargon — say
what the reader sees and what it means. Cormorant Garamond for reads, Inter for UI,
IBM Plex Mono for labels/eyebrows. Copper (`--accent-lit`) marks structural intent;
gold stays reserved for currency.

---

## 1. The positions — intent, explanation, polarity

The reading's whole fix lives here. Each position now carries three tiers of copy:
a short **NOTE** (terse, on the card back and slot label), a full-sentence **ROLE**
(intent + its named polarity counterweight, in one breath — this is the piece that
used to be missing), and its place in the **arc**.

### The Sitting (3 cards)

| # | Position | NOTE (short) | ROLE — intent + polarity (LIVE, `.ri-role`) |
|---|---|---|---|
| I | **The Ground** | what the matter rests on | "The base it already stands on — what's settled or given, under the question itself. Its counterweight is the Crossing." |
| II | **The Crossing** | what stands against it | "What stands against it — the friction or opposition the Ground has to bear. Its counterweight is the Ground." |
| III | **The Turn** | where it tends, left as it stands | "Where it tends, left exactly as it stands — the close of the arc, not a verdict." |

**Polarity, stated plainly:** Ground and Crossing are a pair — what holds, against
what pushes back. The Turn is not a third position in that pair; it is their sum,
the direction the tension is already leaning.

### The Deep Read (5 cards)

| # | Position | NOTE (short) | ROLE — intent + polarity (LIVE, `.ri-role`) |
|---|---|---|---|
| I | **The Ground** | what it rests on | "The base it already stands on — what's settled or given, under the question itself. Its counterweight is the Crossing." |
| II | **The Crossing** | what stands against it | "What stands against it — the friction or opposition the Ground has to bear. Its counterweight is the Ground." |
| III | **The Root** | what it grew from | "What it grew from — the origin underneath both, older than either. Its counterweight is the Crown." |
| IV | **The Crown** | what it reaches for | "What it reaches for — the aim pulling from above, the shape it's growing toward. Its counterweight is the Root." |
| V | **The Turn** | where it tends | "Where it tends, left exactly as it stands — the close of the arc, not a verdict." |

**Two polarity pairs, one direction:** Ground/Crossing is the present-tense
polarity — what holds, against what resists. Root/Crown is the past/future
polarity — where it grew from, against what it reaches for. The Turn is the sum
of both pairs, not a separate prophecy.

### The Glance (1 card, no position)

The Glance is a Sitting or Deep Read's opposite move: not one piece of an arc, but
the whole utterance, on its own. It gets no position note and no polarity — that
absence is the point, and should read as deliberate, not missing.

- **Intake note (LIVE, `index.html` `.pull-note`):** "A glance takes no question.
  Look, and let it pass."
- **Close note (LIVE, `closeNote()`):** "No question was set down, so nothing here
  repeats."
- **Closing line (LIVE, `closingLine()`):** "A glance, not kept."

*(PROPOSED, not yet wired — a short on-page frame for the Glance's non-position,
for symmetry with the Sitting/Deep intent lines: "One card, entire — nothing under
it, nothing set against it." Optional; the Glance's existing silence is also a
legitimate, restrained choice.)*

---

## 2. The Bridges — the connective voice between cards (LIVE)

`BRIDGES` in `app.js`, printed between per-card reads as each position is turned,
keyed by position name. This is where the polarity between neighboring cards is
spoken aloud, in the room's own voice, as the reading descends:

- **The Crossing:** "Set against the ground just laid —"
- **The Root:** "Underneath both of those —"
- **The Crown:** "Reaching up out of that —"
- **The Turn:** "Which leaves it here —"

---

## 3. On-page essentials — "how to read this" (LIVE)

Everything below renders inside the reading section itself (`reading-head`), once,
before the descent — not repeated per card, not gatekeeping the reveal.

### 3.1 Reading head (LIVE)

- Eyebrow: **THE READING**
- Sub-line: the tier `ARC` line (§3.7) — the bare fall-order movement.
- Immediately beneath it, a native `<details class="how-to-read">` labeled
  **"How to read this"** — one paragraph per tier (§3.2). It is rendered **open on a
  live reading** (the sitter explicitly wants to learn how to read it) and **collapsed
  on a reopened receipt** (`coldOpen`), where the calm recap is the point.
- At the foot of the how-to, one quiet mono link — **"The full guide lives in the
  Codex →"** (`.how-to-more a`, → `../codex.html#tarot-guide`) — the single path from
  the on-page essentials to the Codex's full guide, closing the two-surface loop.

### 3.2 How to read this — full body copy (LIVE, `HOWTO`)

**Sitting:**
> "Read the three in the order they fell — Ground, then Crossing, then Turn — as
> one line, not three separate answers. Ground and Crossing are a pair: what the
> matter already stands on, weighed against what opposes it. Neither wins — the
> tension between them is the real subject. The Turn is where that tension is
> heading if nothing moves: a likely drift, not a sentence. Reversed doesn't mean
> opposite — it's the same meaning turned inward: blocked, delayed, or not yet
> outward."

**Deep Read:**
> "Read the five in the order they fell, as one movement in two pairs and a close.
> Ground and Crossing are the first pair — what the matter already stands on,
> weighed against what opposes it. Root and Crown are the second — what it grew
> from, reaching toward what it's aiming at. The Turn closes the arc: where all
> four are tending, left exactly as they stand. Notice where the cards agree and
> where they pull apart — agreement confirms, disagreement marks the real work.
> Reversed doesn't mean opposite — it's the same meaning turned inward: blocked,
> delayed, or not yet outward."

Teaches, in order: (1) read in the order it fell — an arc, not a list; (2) the
polarity pairs, named explicitly; (3) what angle to watch (agreement vs.
disagreement between paired cards); (4) what a reversed card means, plainly.

### 3.3 Reversed, inline (LIVE)

A reversal is now glossed in **two** always-visible places, so the scariest single
word in the ceremony is disarmed the instant it appears:

1. **On the card face itself** (`faceHTML`, `.fo-gloss`) — under the word "Reversed",
   printed on its own line, un-capsed and small: **"inward, not yet."** This teaches
   the reversed meaning *at the table, at the moment of contact* — not only later in
   the reading. Upright cards carry no gloss (upright is the default, unmarked case).
2. **In the per-card read name row** (`ORIENT_GLOSS`, `.ri-orient-gloss`) — beside the
   "Reversed" tag: the same **"inward, not yet."** Lifted off the visibility floor to
   `--t-meta` (from the faint `--t-ghost`) so the meaning is actually readable at a
   glance.

### 3.4 Closing synthesis (LIVE, `fillSynthesis`)

Printed once, after every card is turned, as the reading's own recap of the arc it
just walked:

- **Sitting:** "Ground, crossing, turn — what it rests on, what stands against it,
  where it leans if nothing changes." *(+ if a question was set: "That is what the
  sitting returns to it.")*
- **Deep Read:** "Ground against crossing, root against crown — what holds it, what
  opposes it, what it grew from, what it reaches for — and the turn, where it leans
  if nothing changes." *(+ "That is what the read returns to it.")* The deep recap
  now follows the true polarity pairing (Ground↔Crossing, Root↔Crown), not the old
  beneath/above spatial grouping, so it agrees with the axes and every other surface.

### 3.5 Close note, at filing (LIVE, `closeNote`)

The close is the reading's quietest, most personal beat. The synthesis (§3.4) already
restates the arc at the foot of the reading; the close no longer prints the triad a
second time — it is demoted to a bare filing fact so the "filed / kept for you" lines
land un-narrated.

- **Sitting:** "Three cards, kept in the order they fell."
- **Deep Read:** "Five cards, kept in full."
- **Glance:** "No question was set down, so nothing here repeats."

### 3.6 Visibility fix (LIVE, CSS)

The position note and role text were the dimmest text on the page
(`--t-ghost #6e6b63`, 10.5px mono) — the literal cause of the "hidden/blended"
complaint. Now: `.slot-label .sub` and `.ri-eyebrow .sub` render at `--t-body`;
the position **name** (`.ri-eyebrow .pos`) renders in `--accent-lit` (copper), so
it is the first thing the eye catches on each card's read; `.ri-role` (the new
intent+polarity sentence) sits directly beneath it, accent-bordered, in Cormorant
italic.

### 3.7 The Spread Key / axis glyph — LIVE (`data-spread-key`, `renderSpreadKey`)

Now wired. One always-visible block, revealed the instant the cards land face-down
(before any turn) directly beneath the table, and held through the whole turning
pass — the "immediately see what this is directed at" beat the per-card reads used
to defer. It states the arc as one movement, then couples each polarity pair with a
copper `↔` so the boundary between the seats is literal, not only prose. On A Glance
it never appears (the pull has no seats). The stale pre-cut cut-note is hidden at the
same beat, so exactly one informational line sits under the table.

- **Eyebrow (LIVE, `.sk-eyebrow`):** "THE SHAPE OF IT"
- **Sitting legend (LIVE, `.sk-legend`):** "Three seats, one arc — what it rests on,
  what stands against it, and where it tends."
- **Deep legend (LIVE, `.sk-legend`):** "Five seats, one arc — what it rests on and
  what stands against it, what it grew from and what it reaches for, and where it all
  tends." *(The conjunctions now bind the TRUE polarity pairs — rests-on with
  stands-against, grew-from with reaches-for — so the legend sentence agrees with the
  `GROUND ↔ CROSSING` / `ROOT ↔ CROWN` axes printed directly beneath it. The earlier
  wording paired rests-on with grew-from, contradicting its own axes.)*
- **Axis labels (LIVE, `.sk-pair`, mono uppercase, coupled with a copper `↔`):**
  `GROUND ↔ CROSSING` — caption *"support · resistance"*; `ROOT ↔ CROWN` (Deep only)
  — caption *"origin · reach"*. The Turn takes no axis row — it is the sum of the
  pairs, not a pair, and the legend sentence already closes on it.

**Arc line (LIVE, `ARC`, on the reading head `.rh-sub` in `--t-body`):** trimmed to
the bare movement in fall order. The seats' MEANINGS + polarity are owned by the
Spread Key (with its ↔ axes) directly above, so the head names only the sequence to
walk — the triad gloss is no longer restated a fourth time.
- **Sitting:** "Read in the order it fell — ground, crossing, turn."
- **Deep:** "Read in the order it fell — ground, crossing, root, crown, turn."

---

## 4. The Codex — full Tarot Guide (LIVE)

Generated from `codex-data.json` (a `"kind": "guide"` entry, id `tarot-guide`) via
`build_codex.py` into `codex.html`, placed immediately before "The Major Arcana."
Reuses the codex's existing tokens and a new `.guide`/`.suit-grid`/`.pos-grid`
layout — no new palette.

**Section title (`.sys-title`, from the JSON `system` field):** Tarot — Reading the
Cards. *(`build_codex.py` now sources the title from `w['system']`, so the doc, the
JSON, and the render all agree — no more hardcoded "Reading the Tarot" drift.)*
**Sub-eyebrow (`.sys-sub`, mono):** "how a spread is built, and how to read one"
**Systemnote line (`.sys-note`, italic, from the JSON `systemNote`):** "the essentials,
at length — what the cards are, how a spread holds its shape, and how to read what
falls"

**Intro:**
> "A tarot reading is not a prophecy. It is seventy-eight fixed portraits of human
> situations, laid into a shape that asks a question, and read by someone standing
> close enough to their own life to recognize what the cards are pointing at. The
> deck doesn't know your life. It offers a structure honest enough to hold it. What
> follows is the whole method — what the cards are, how a spread is built, and how
> to actually read one."

### 4.1 Major and Minor — the two registers
> "The seventy-eight cards split into two unequal registers, and knowing which one
> you're looking at is the first read. The **Major Arcana** — twenty-two cards, The
> Fool through The World — are the large turning forces: death, love, ruin,
> awakening, the wheel of fortune itself. When a Major lands in a spread, the
> matter is a chapter, not an afternoon. The **Minor Arcana** — fifty-six cards
> across four suits — are the weather inside those chapters: a hard conversation, a
> slow debt, a burst of energy, a quiet Tuesday. A reading heavy with Majors says
> *this is a real turning point*. A reading mostly Minor says *this is the texture
> of an ordinary week, and the ordinary is where it will actually be lived.*"

### 4.2 The four suits — where the weather comes from
> "Each Minor card belongs to one of four suits, and each suit is an element — a
> domain of life with its own temperature."
- **Wands · Fire** — "Will, drive, ambition, the creative spark and the risk taken
  to act on it. Wands questions are about wanting something enough to move."
- **Cups · Water** — "Feeling, bond, the inner tide. Cups questions are about love,
  grief, intimacy — what moves beneath the visible surface of a life."
- **Swords · Air** — "Thought, conflict, truth spoken plainly. Swords questions are
  about clarity — what must be seen, decided, or finally said."
- **Pentacles · Earth** — "Body, money, work, the material ground underfoot.
  Pentacles questions are about what's built, kept, spent, or made to last."
> "A spread clustered in one suit is telling you which room of the life this
> reading actually concerns — even when the guided question pointed elsewhere."

### 4.3 Numbers and the court — the arc inside a suit
> "Within each suit, the numbered cards run a single arc: **Ace** is the seed, pure
> potential before it has taken a shape; the cards climb through struggle,
> partnership, rest, and choice; **Ten** is completion — harvest, or overflow, or
> the weight of a thing carried all the way through. Where a numbered card sits on
> that arc tells you whether the matter is just beginning or already coming due."
>
> "The four **court cards** — Page, Knight, Queen, King — are postures more than
> people, though they can be either. **Page**: a student, a message arriving,
> something still being learned. **Knight**: pursuit, momentum, a cause taken up
> and ridden hard, for better or worse. **Queen**: mastery held inward — command
> through depth and attunement. **King**: mastery held outward — command through
> structure and authority. When a court card falls, ask first whether it names a
> person in the matter, and only then what stance it's asking to be taken."

### 4.4 Upright and reversed — same force, different direction
> "A reversed card is not a bad card. It is the same force, turned inward rather
> than outward — **delayed, blocked, withheld, or not yet ready to be met in the
> open.** Upright Strength shown plainly is courage in the room; reversed, it's
> courage still gathering, not yet trusted, maybe spent quietly instead of shown.
> Read a reversal as a direction, not a verdict: the energy the card names is
> present in the matter, but its outward face is turned away for now — toward the
> private, the delayed, or the still-forming."

### 4.5 How a spread is built — positions and polarity
> "A card by itself is a meaning. A card in a **position** is an answer — the
> position is the question, and the card is what came back. This is the part most
> readings skip past, and it's the part that actually makes a spread legible. Blue
> Room's spreads are built from a small set of positions, each with a distinct job
> and most of them paired against an opposite:"

- **The Ground** — *what the matter rests on* — "The foundation already in place —
  the condition, habit, or fact the situation is standing on, whether or not it's
  been named yet. Read it as the floor, not the story."
- **The Crossing** — *what stands against it* — "The Ground's polarity partner. Not
  a villain — the friction, the obstacle, or the counter-pressure the Ground has to
  move through. Ground and Crossing are read as a pair: what holds, against what
  pushes."
- **The Root** — *what it grew from* — "The past tense of the matter — where this
  began, the seed condition beneath the present moment. Root looks backward."
- **The Crown** — *what it reaches for* — "The Root's polarity partner, and the
  future tense — the outcome being reached for, consciously or not. Root and Crown
  are read as a pair: where it came from, against where it wants to go."
- **The Turn** — *where it tends, left as it stands* — "Not a fixed fate — the
  direction the whole configuration is leaning *if nothing changes.* The Turn is
  what the other positions add up to, read together."

> "Two polarity pairs, one direction: **Ground / Crossing** is a present-tense
> polarity (what holds vs. what resists); **Root / Crown** is a past/future
> polarity (where it grew from vs. what it reaches for). The Turn is the sum — not
> a separate prophecy, but what those tensions resolve toward if left alone."

### 4.6 The interpretive process — what to actually watch for
> "Read the cards in the order they fell, not the order that feels most
> interesting. A spread is a small sequence, and it is built to be walked, not
> scanned. From there, four angles do most of the real work:"
1. "**Position first, card second.** Ask what the position is asking before you
   ask what the card means in general. The same card in the Ground and in the
   Crown says two different things — one is a floor, the other is a horizon."
2. "**Read the pairs against each other.** Ground vs. Crossing, Root vs. Crown —
   don't read either half alone. The tension between the two is usually where the
   honest read lives, more than either card by itself."
3. "**Notice the pattern across the spread.** A run of one suit, a cluster of
   Majors, several reversals in a row — these are not noise. They are the spread
   telling you, structurally, what register and what room this reading actually
   belongs to."
4. "**Let the Turn be a direction, not a sentence.** It names where things lean if
   nothing changes — which means it is exactly the position most useful to a
   person who intends to change something."

### 4.6b A reading, walked — one sitting, read aloud (LIVE)

The guide's one worked example — a concrete 3-card Sitting drawn and read end-to-end,
so the method in §4.6 is *shown*, not only stated. Rendered from `codex-data.json`
(guide section id `walked`, inserted between `process` and `honest`) with a
`.walk-draw` card and a `.walk-read` block. The question put to it: *whether to keep
holding something that has stopped paying its way.*

The draw: **Ground —** Four of Pentacles · **Crossing —** The Tower, reversed ·
**Turn —** Two of Cups.

The read demonstrates, in order: **position first, card second** (the Ground is a
grip because Four of Pentacles is the closed hand); **reading the pair against each
other** (the Ground clings, the Crossing — Tower reversed — is the collapse pressing
to be let happen); **handling the reversal as inward, not opposite** ("it turned the
Tower's outward crash into an inward, not-yet strain"); and **letting the Turn land as
a direction, not a verdict** (Two of Cups: "left as it stands, this tends toward
release into connection … Not a promise and not an instruction — a lean"). It closes
by assembling the three seats into one arc, noting that "nowhere did a card issue an
order."

### 4.7 How to hold it — the honest approach
> "Tarot doesn't know anything you don't already carry. What it offers is a
> structure specific enough to organize a question you'd otherwise think about in
> circles — a Ground to name what's actually underfoot, a Crossing to name what's
> actually in the way, a Turn to name where it's headed if left alone. Reading a
> card well is an act of honest attention, not obedience: the card is an invitation
> to look at something, not an instruction to do something. The reading belongs to
> the one reading it. Treat the cards as a mirror held at a useful angle — not a
> verdict, and not an escape from deciding for yourself."

---

## 5. Framing / headers — full inventory

| Surface | Element | Copy | Status |
|---|---|---|---|
| Page | Reading-head eyebrow | THE READING | LIVE |
| Page | How-to-read summary label | How to read this | LIVE |
| Page | How-to-read → Codex link | The full guide lives in the Codex → | LIVE |
| Codex | Guide section title (`.sys-title`) | Tarot — Reading the Cards | LIVE |
| Codex | Guide sub-eyebrow (`.sys-sub`) | how a spread is built, and how to read one | LIVE |
| Codex | Guide systemNote (`.sys-note`) | the essentials, at length — what the cards are, how a spread holds its shape, and how to read what falls | LIVE |
| Page | Glance pull-note | A glance takes no question. Look, and let it pass. | LIVE |
| Page | Reversed inline gloss | inward, not yet | LIVE |
| Page | Sitting closing line | The sitting is filed. | LIVE |
| Page | Deep closing line | The read is filed, in full. | LIVE |
| Page | Glance closing line | A glance, not kept. | LIVE |
| Codex | Guide intro | (§4 intro, above) | LIVE |
| Codex | Section 1 heading | Major and Minor — the two registers | LIVE |
| Codex | Section 2 heading | The four suits — where the weather comes from | LIVE |
| Codex | Section 3 heading | Numbers and the court — the arc inside a suit | LIVE |
| Codex | Section 4 heading | Upright and reversed — same force, different direction | LIVE |
| Codex | Section 5 heading | How a spread is built — positions and polarity | LIVE |
| Codex | Section heading (worked example) | A reading, walked — one sitting, read aloud | LIVE |
| Codex | Section 6 heading | The interpretive process — what to actually watch for | LIVE |
| Codex | Section 7 heading | How to hold it — the honest approach | LIVE |
| Page | Reading-head arc sub (Sitting) | Read in the order it fell — ground, crossing, turn. | LIVE |
| Page | Reading-head arc sub (Deep) | Read in the order it fell — ground, crossing, root, crown, turn. | LIVE |
| Page | Card-face reversed gloss (`.fo-gloss`) | inward, not yet | LIVE |
| Page | Spread Key eyebrow | THE SHAPE OF IT | LIVE |
| Page | Sitting legend | Three seats, one arc — what it rests on, what stands against it, and where it tends. | LIVE |
| Page | Deep legend | Five seats, one arc — what it rests on and what stands against it, what it grew from and what it reaches for, and where it all tends. | LIVE |
| Page | Axis captions | support · resistance / origin · reach | LIVE |
| Page (proposed) | Glance intent line | One card, entire — nothing under it, nothing set against it. | PROPOSED |

---

## 6. Encoding — verified clean (former false positive)

An earlier pass flagged `codex-data.json`'s system-name em-dashes (including this
guide's title `"Tarot — Reading the Cards"`) as encoding-corrupted. Verified at the
byte level: the em-dash is stored as correct UTF-8 (`0xE2 0x80 0x94`, U+2014). The
`�` seen previously was Windows console codepage mangling on print, not a file
defect. No fix needed. **For future editors:** always re-save `codex-data.json` as
UTF-8 (via the Edit tool or `json.dump(..., ensure_ascii=False, encoding='utf-8')`),
never through PowerShell redirection, or the dashes *will* actually corrupt.

---

*Six sections above (1–6), all reconciled against the live `app.js`, `style.css`,
`index.html`, `codex-data.json`, and generated `codex.html` as of this pass — no
paraphrase, copy is quoted verbatim from source where marked LIVE.*
