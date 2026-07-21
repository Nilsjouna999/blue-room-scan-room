# Blue Room · Arcana — Handoff: Diagrams + Profile/Hub

> **For the next chat.** This is a self-contained brief: current state, the design law to hold, and two executable build commands. Everything here is authored-data-driven — the pages are built directly from a static bank, **no runtime AI**. Hold the voice and the canon; they are the product.

---

## 0. Where things stand (ground truth)

**The product.** Blue Room Arcana is a divination *reading* experience. A cinematic ceremony (a witch reads, a crow carries the commission, a forger forges a **crown**, it is consecrated) hands off to a **reading page**: a person's draw across up to 8 systems (sun sign, year animal, life path, tarot draw + counsel, rune, trigram, hexagram), crowned by an assembled **name** (e.g. *The Twice-Kindled Founder*). Every draw opens a **record page** — an *accession* of that draw in this reading, not a generic encyclopedia entry.

**Live artifact (self-contained, shareable):** `https://claude.ai/code/artifact/f6c3fa45-cb5d-436e-9b40-5a2a47703221`
It currently opens on a real birth reading — **Antton Aikio, 9 April 2001, Inari** → Aries · Snake · Life Path 7 → *The Twice-Kindled Founder*.

**What is built and working:**
- Reading page (birth-derived: sun from date, animal from year, life path from digit-sum; the rest seeded from name+date). "Draw again" rolls a random one.
- Record pages per result, **meaning-first / history-last**: *The reading (codex quoted as Source) → Essence → Gifts → Strengths & Shadow → Hardships → What it turns on → In love → Friendships → Compatibility (wheel) → Variations → [history:] Origin · Attributions · Correspondences · Deeper hooks · Contested.*
- The crown name shown as a **verifiable sum** (each draw's record shows the fragment it contributed).
- **Coloured perks** — each keyword tinted by an authored semantic-family lexicon (see §1).
- 154-result sourced knowledge bank; embedded Cormorant + IBM Plex Mono; compatibility wheel (zodiac trines/opposition, Chinese San-He/Liu-He/clash).

**Where the code lives (the build pipeline):**
- Generator (in the session scratchpad — port to the repo when ready): `gen_head.css` (styles + embedded @font-face), `gen_body.js` (all render logic), `gen_artifact3.py` (assembles them + embeds the data, forces ASCII, writes the self-contained HTML).
- Data banks: `codex-data.json` (name/tag/keywords/meaning/reversed per entry), `arcana-knowledge.json` (sourced depth: origin/attributions/correspondences/deeper_hooks/contested), `practical.json` (authored interpretive dimensions: strengths, shadow, whatMatters, growthEdge, inLove, essence, gifts, hardships, friendships, variations), `kwcolor.json` (keyword→hex), `fonts.css` (base64 woff2).
- Repo product surfaces (`blue-room-scan-room`): the ceremony, the codex, the card/scan Vault system, mounted via `?dev=` in `app.js`. **The profile/hub (Command 2) unifies the Arcana reading with these existing surfaces.**
- Repo specs to read first: `docs/BR-ARCANA-READING-MASTERPLAN.md`, `docs/BR-ARCANA-READING-MASTERPIECE-DIRECTION_V1.md`, `docs/DESIGN_TOKENS.md`, `docs/GOLDEN_NUGGETS.md`.

---

## 1. The design law (hold this exactly)

**Ground & type.** Near-black `#0a0b0d`; warm archive greys `#e9e5dc / #d7d3ca / #b1ada4 / #9c9790 / #96918a`; **no pure white**. Cormorant Garamond (display + prose, embedded), IBM Plex Mono (labels/data), system-ui (UI chrome). Crown title Cormorant **600**, dimmed cream `#e0dacd`. The crown is the one element with object-depth.

**Voice.** Deadpan archival — the analyst is dead-serious, the mythic is treated as filed record. Describe the archetype, **never rate the person, never predict**. Reflective, not predictive. Everything attributed where it is interpretation.

**The colour law — four registers, and only four:**
1. **GOLD** `#c9a35c` / `#e2c489` — *currency of the reading*. Crown, slot labels, focus/hover, the one highlighted node in a diagram. Never on prose.
2. **EMBER** `#b25f39` (mark) / `#d1794f` (legible text) — *one role*: the reversed/shadow read and its dot, and the clash marks in the wheel.
3. **PERK PALETTE** — *the sanctioned colour-on-text surface*. ~19 muted semantic families (intuition→amethyst `#9a86bd`, wisdom→sage `#a9a06a`, secrecy→periwinkle `#7f88b6`, elegance→dusty-rose `#c691a0`, strategy→steel `#6f9bc0`, guard→drab-olive `#8f9068`, calm→jade, emotion→aqua, growth→moss, endurance→taupe, power→violet-slate, passion→rust-rose, courage, joy, freedom, order, creativity, ambition). Authored in `kwcolor.json`, rendered directly on the keyword row. A *considered dusty-jewel set*, never a rainbow. **Client-approved.**
4. **PURPLE / VIOLET** — *NEW, commerce & threshold register* (this handoff codifies it). This is the "violet bridge" already reserved in `DESIGN_TOKENS.md`. Purple owns the **buy/paywall-crossing** actions only — the $4.99 buttons — and nothing else. It must read as a *threshold you choose to cross*, not a hype CTA. Suggested: base `#8a6fb0`, lit `#a487c8` (tune on dark; keep it muted, gemstone not neon).

Gold is the reading's value; purple is the door to a new reading; ember is shadow; the perk palette is the one place traits wear their own colour. Anything outside these four registers stays warm-grey.

**Ethics carried forward (non-negotiable).** Anti-paywall: the $4.99 buys a **new reading with new inputs and more results** — never unlocks withheld worth of a reading already given. No fear hooks, no false urgency, no "curse/removal," no scores or star-ratings. "For insight, not instruction." Empowerment over fatalism. (See the craft/ethics research already on file.)

---

## 2. ▶ BUILD COMMAND 1 — The record-page diagrams (no GPT art)

Add four inline-SVG diagrams to the record page. **All are currentColor-driven line art on the near-black ground; gold only on the one highlighted/terminal element; ember never appears; no bars, no percentages, no scores.** Captions in the archival voice ("the tradition places…"). **GPT hero imagery is dropped for now** — the diagrams and the soul-signature *are* the visual interest.

1. **Soul-Signature Bloom** *(all 7 systems — build first, highest leverage).* A radial 9-spoke crest from the entry's existing 9-bit cipher (first 9 bits of `SHA-1(entry name)`, row-major) — 9 spokes at 40°, each ending in a filled disc (bit 1) or open ring (bit 0). viewBox ~200×200, 2px stroke to rhyme with the sealed marks, gold via page `currentColor` (never a baked coloured file). **Placement:** directly under the record title, where a portrait would sit — the page's own crest. Zero new data.
2. **Elemental Cycle (Wu Xing)** *(Chinese year-animals).* The five-phase generative ring (Wood→Fire→Earth→Metal→Water) + inner controlling pentagon (ke cycle). The animal's fixed element (parse `Fixed element: X` from `codex.tag`) is the one gold node; its two touching generative arcs go gold; the rest ghost-grey. viewBox ~200×200. Caption: *"The tradition places the Snake under Fire, which feeds Earth and is checked by Water."* **Placement:** after Hardships, before the compatibility wheel.
3. **Decan Strip** *(zodiac sun-signs).* The sign's 30° arc split into its 3 Chaldean decans (10° each) with each ruling-planet glyph in ghost-grey; all three shown neutral (the app knows only the Sun sign — show them as three facets, not a personal pin). Horizontal strip viewBox ~300×60, 1px hairline dividers, gold only on the frame/labels. **Placement:** same slot as the Wu Xing (after Hardships).
4. **Numerology Reduction Geometry** *(life-path).* The literal digit-sum descent (birth digits → intermediate sums → root) as a stepped column of ~24px circles joined by a hairline, gold on the terminal circle only; an explicit fork/notch at 11/22/33 where reduction halts. **Placement:** late — mechanism/provenance — right before the history section.

**Guardrails:** verify the Chinese fixed-element parse for all 12 animals; keep every diagram inside the four-register colour law; the Bloom's gold must be page-supplied `currentColor`, not a coloured asset.

---

## 3. ▶ BUILD COMMAND 2 — The Profile / Hub

Build the **profile page as the hub** of the whole product — the place a seeker returns to, that holds their crown, their vault, their people, and every door out. Same canon, same voice, same near-black archive. Below is the spec; items marked **[PLACEHOLDER — reserve the slot]** are not to be finalised now, only framed and given a home + a data model.

### 3.1 Layout & navigation (the doors)
A single reverent page. Persistent, quiet wayfinding to: **Main Menu**, **The Arcana Room** (the ceremony/reading entry), **The Codex** (exists), **The Vault** (§3.5). Doors are archival links, not app tabs — hairline, gold-on-focus.

### 3.2 Essentials (the identity block)
The profile's core: the seeker's chosen name/handle, avatar (or a **profile-picture card**, §3.6), and — if they have taken an Arcana reading — their **Crown** at the head (§3.3). Quiet, no vanity metrics.

### 3.3 The Crown — the earned centrepiece **[VISUAL PLACEHOLDER — reserve the slot + build the data model]**
Earned only by taking an Arcana reading. It sits at the head of the profile.

- **Ornamentation scales with depth of the reading.** The crown gains marbles/jewels in proportion to (a) **how much information the seeker provided** (name, date, place of birth, exact time, and any further inputs) and (b) **how many results that reading produced**. More info + more results → a richer, more-jewelled crown. The jewels are a *legible record of how much was consulted* — provenance made visible, **not a status score** (hold the anti-gamey line: it reads as "this crown holds N results," never "level N").
- **Redraw** for **$4.99** (§3.7): a seeker who now has more info (e.g. adds birth time or place) can redraw and receive a **new reading with their extra/remaining info and more results** — yielding a more-jewelled crown that shows how many results it carries. (This is a *new reading*, not unlocking the old one — anti-paywall intact.)
- **Data model to build now** (visual later): `crown_record { reading_id, inputs_provided[], result_count, jewel_count (derived), created_at, is_current }`. Reserve the profile slot and render a placeholder crown keyed to `result_count`. **Flag:** the final crown art/mechanic is undecided — build the *spot* and the *counting*, not the finished jewels.

### 3.4 Crown Family — mini-crowns **[reserve + model]**
A constellation of **mini-crowns** on the account, each earned by mapping a **family member or friend** through an Arcana read done for them. It shows the seeker's people as a small heraldry of lesser crowns beside their own. Model: `family_crown { relation, reading_id, result_count, label }`, collected under the profile.

### 3.5 The Vault
The seeker's collection of **minted cards / image mints** (ties to the existing Blue Room card/scan product — the Vault already exists in the repo). Give it a clear home from the profile; cards live inside it. This is the "space where image mints appear."

### 3.6 Showcase + privacy
The profile can **feature** chosen artifacts: a specific **card**, a **profile-picture card**, and the **Crown**. Each showcased element carries its own **visibility control**: *Everyone · Friends · No one* (per element, independently). Nothing is public by default beyond what the seeker chooses. Privacy is a first-class, per-item setting, not a global toggle.

### 3.7 Pricing & the purple buy button
- **Arcana reading = $4.99.** **Redraw (new reading with more info) = $4.99.**
- The **buy button is purple/violet** (§1 register 4) — the one commerce colour, the threshold you choose to cross. It must state exactly what it does ("Draw your Arcana — $4.99") and, on completion, confirm plainly. No urgency, no scarcity, no fear framing.
- Framed as buying a *reading/experience*, never as unlocking withheld worth of an existing one.

### 3.8 Friend system
Add and see friends; view a friend's profile and whatever their showcase privacy permits (§3.6). Keep it a quiet register of people, not a social feed. (Reuse/extend any existing account model in the repo.)

### 3.9 Referral program
A quiet entry on the profile that **leads to** the referral program's page/details. Model it as a door to a dedicated referral surface (its own spec later); this handoff only reserves the link + a home for it.

---

## 4. Open decisions (surface to the client before finalising)
1. **Crown art & jewel mechanic** — explicitly *not final*. Needs its own design pass: how a jewel maps to a result/input, the crown's visual language, whether it's 2D/SVG or GPT-art later.
2. **Extra readings** — which additional inputs unlock which extra results (birth *time* → houses/rising? *place* → localised chart? other systems?). Define the input→result map before the redraw ships.
3. **The Vault ↔ Arcana** relationship — are Arcana crowns/cards minted into the same Vault as scan cards, or a parallel shelf? Decide the unification.
4. **Purple exact hex** — confirm the violet on dark beside gold (tie to the `DESIGN_TOKENS.md` "violet bridge").
5. **Accounts/payments** — no backend exists yet (repo is static HTML/CSS/JS, no build step, `node` not installed). The profile/hub is buildable as a static design surface first; real auth + payment is a later, separate track. **Do not** implement payment collection in the static prototype — mock the flow.

---

## 5. Build notes for the next chat
- The Arcana artifact is generated by `gen_artifact3.py` (assembles `gen_head.css` + `gen_body.js`, embeds the JSON banks + `fonts.css`, forces the whole file to ASCII, writes the self-contained HTML). Rebuild → copy to `blue-room-scan-room/_artifact-preview.html` → verify on the local server → publish to the **same artifact URL** (pass `url:` to keep the link).
- New content is **always authored into the banks** (`practical.json`, `arcana-knowledge.json`, `kwcolor.json`) and rendered directly — never generated at runtime. This is the client's explicit architecture.
- Hold the four-register colour law, the archival voice, and the anti-paywall/empowerment ethics through everything.
- Start with **Command 1, Diagram 1 (Soul-Signature Bloom)** — zero new data, all 7 systems, highest leverage — then the system-specific diagrams, then the profile/hub as a static design surface with mocked commerce.

*Enchantment lives in restraint here: the crown that only ever gains what it truly holds, the perks that wear their own quiet colour, the door that costs a coin and opens a new reading — none of it shouting, all of it filed.*
