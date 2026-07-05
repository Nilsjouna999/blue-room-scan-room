# O6 — CONTRADICTION & GAP HUNTER

**Role:** Adversarial reconciliation pass over the five normalizations (S1–S5) + O1 + H5, re-verified against the live repo. I do NOT resolve repo-vs-research conflicts alone — I flag each with a *recommended* resolution for F1. Repo wins on product law, voice, file structure, and what has been killed; every conflict says so explicitly and never silently picks a side.

**Verification note:** every repo claim below was re-grepped against the live tree this session (line numbers cited are current-as-of-read; grep the quoted anchor). Where O1/S4 were slightly off, I correct them in-line rather than repeat.

---

## READER'S MAP

- **CONFLICT LEDGER** — 14 entries. C-01…C-08 are the eight the mission mandated; C-09…C-14 are additional live conflicts I surfaced during verification. Each has: the two sides, what the repo actually says (verified), a **RECOMMENDED RESOLUTION (for F1)**, and a **blocker/non-blocker** flag on whether the build can proceed before F1 rules.
- **GAPS LIST** — 12 open questions the research does not answer, each marked **BLOCKER** or **non-blocker**.
- **CROSS-AGENT DISCREPANCIES** — where S1–S5 / O1 / H5 disagree *with each other* (as opposed to repo-vs-research), so F1 doesn't inherit a hidden fork.

---

# CONFLICT LEDGER

## C-01 — Doc 03/05 "narrow person-law" vs LOCKED BR-S113 `[MANDATED #1]`

**The conflict.** Doc 03 proposes a *replacement* law: "name the depicted person + the image's charge + the viewer's response in fully charged language." Doc 05's Reach zone adds second-person felt-transfer clauses. Both make the depicted person (or the viewer's named feeling) a legitimate grammatical subject of charge.

**What the repo says (verified).** BR-AURA-RESEARCH.md:5 — RULE 0 is LOCKED (BR-S113): *"If a sentence's grammatical subject is the person, it has fallen off the cliff."* The kill-list at BR-AURA-RESEARCH.md:85–88 bans the exact mechanism doc 03's rewrite table runs on — the **resolved-feeling clause** ("…which evokes / conveys / creates a sense of…") — by name. Every one of doc 03's 16 rewrite pairs launders a named emotion through that banned bridge ("land as loneliness," "recoil of shame," "sting of contempt").

**Recommended resolution (for F1).** **REPO WINS — already ground-truth #2, re-confirming.** Doc 03's proposed law and doc 05's unrestricted Reach are REJECTED as *law*. What SURVIVES and should be normalized into the Aura spec: the **mechanics** — the `is → reads-as` grammatical pivot, the swap test, the two-second test, the four-zone filter (Record/Read/Reach/Ban) as an *operational gate*, and the evidence-anchoring discipline. What DIES: named-emotion payloads even behind a hinge, and any claim on the subject's interior. S3's per-mechanic SURVIVES/DIES table is correct and F1 should adopt it verbatim as the gate.

**Flag → non-blocker.** Already adjudicated at mission level; recorded here for the paper trail. Build can proceed on the mechanics.

---

## C-02 — Doc 04 "felt field / medium plate" vs Subtraction-Gate THIN capstone `[MANDATED #2]`

**The conflict (the single most load-bearing one in the fleet).** Doc 04 defines Aura as *"the image's felt field: the way a photograph presses, holds, leaks, cools, or lingers once the evidence is known"* — a five-verb, open-ended, single-element-permitting *atmosphere* definition — and sizes it as a **medium-density two-column plate**: `grid-template-columns: minmax(0,1.05fr) minmax(340px,0.95fr)`, `min-height:320px`, a dedicated right-side 16:10 visual frame, a 4-anchor schema, `chips[]` + `reading` + `classLabel`. Ground-truth #3 (the Subtraction-Gate verdict) defines Aura's irreducible job *narrowly*: the **RELATION** the frame stages between two co-present elements, shipped as **one ordinal band + one kind-word + one short verdict line** — *"a THIN synthesis-capstone… NOT a big plate."*

**What the repo says.** The repo is silent on Aura's final size (it's a parked stub, app.js:1020). But the repo's structural laws pull hard toward THIN: (a) the *dossier owns depth, the panel stays tight* builder ruling; (b) **geometry-as-prose lives in exactly two places — Diagram + Metrics — nowhere else** (BR-S107_SECTION_ARCHITECTURE_SPEC.md:19; a medium anchor-grid plate risks becoming a third); (c) *density kills* / restraint-over-density is a repeated house law. Note the internal tension S4 caught: doc 04's own *worked examples* ("Warm Refusal" = palm-cue vs cabin-cue) are **more relation-shaped than its own stated definition** — the examples are closer to the Subtraction Gate than the definition sentence is.

**Recommended resolution (for F1).** **Subtraction-Gate spine WINS on job definition and default size; doc 04 is demoted from "target" to "ceiling reference."** Concretely:
- Adopt the Subtraction-Gate *definition* (relation between two co-present elements), NOT doc 04's five-verb felt-field sentence. The felt-field sentence permits a single-element mood read, which is the exact decay the Gate exists to prevent.
- Treat doc 04's plate-layout table (320px min-height, two-column, dedicated visual frame) as an **upper bound / "developed-state" reference, not the ship target.** The thin capstone is closer to a single compact band + one kind-word + one line, with the residue mark as a small inline mark, not a photo-aspect frame.
- KEEP from doc 04: the semantic-class architecture (`.dplate--aura`/`.daura__*`), the authored-first four-pass pipeline (mechanical→editorial→safety→visual), the accessibility block, the file-placement table, and the *copy-structure idea* (a label + a line), all of which are size-agnostic.
- The doc 04 `anchors[]` (projector/container/rim/residue) should be **internal derivation scratch, not a shipped 4-record grid.** If they render as four visible labeled records, the plate re-inflates to medium and re-collides with Diagram.

**Flag → BLOCKER.** This is the one conflict that must be resolved before any schema or CSS is authored, because it decides which fields ship vs stay internal and whether there's a two-column body at all. F1/human must rule.

---

## C-03 — Doc 04 map vs Doc 02 residue: confirm no residual map logic leaks the schema `[MANDATED #3, pre-superseded]`

**The conflict.** Pre-superseded by ground-truth #4: doc 04's literal Field Map (contour rings + vectors + container band + rim line SVG) is dead; doc 02's residue directions (one-seam burn / ghost smear / off-center tension line) win. My mandated job is to **confirm no residual map logic leaks through the surviving schema.**

**What I found (the leak check).** Two residual map-logic vectors survive in doc 04's schema and must be scrubbed:
1. **`AuraAnchor.x?/y?` (0–100 normalized coordinates).** These exist *only* to plot anchors onto a spatial field — i.e., to draw the killed map. A residue mark (seam/smear/tension) does not consume per-anchor x/y coordinates; it's one gestural mark. **Recommendation: drop `x`/`y` from any shipped `AuraAnchor`.** If anchors survive at all they're internal derivation notes (C-02), and even internally x/y is map-thinking. This is the clearest residual-map leak in the schema.
2. **`visual.mode` value space.** S4 confirmed doc 04 repointed the *description* to doc 02 (seam/smear/tension), but the schema field is still typed as an open `string`. **Recommendation: constrain to the enum `"seam" | "smear" | "tension" | "type"`** so a future author can't reintroduce `"map"`/`"contour"`/`"vector"`.
3. **`anchors: AuraAnchor[]` sized at exactly 4 (projector/container/rim/residue)** is itself a soft map residue — four labeled field-positions is the vocabulary of the map. Folds into C-02's "internal-only" recommendation.

**Recommended resolution (for F1).** Confirmed: residue wins, AND the schema still carries three map-logic residues (`x/y`, unconstrained `visual.mode`, 4-anchor grid). Scrub all three. Doc 02's red-line anti-patterns (contour/vector/heatmap/rainbow/chakra) must be copied into the implementation guidance as a hard visual ban list regardless of which residue mark ships.

**Flag → non-blocker** for the *decision* (residue wins is settled) but the schema scrub is a **must-do-before-authoring** item; folds into C-02's blocker.

---

## C-04 — chips-verbatim vs decay-to-Frame-Event `[MANDATED #4]`

**The conflict.** Doc 04's schema ships `chips: string[]` (three tags), and all five live sources already carry `aura: [...]` chip arrays in data.js (verified: SRC-01 `["Idle-Engine","Open-Palm","Northbound"]` line 267; SRC-02 `["Auger-Braced","Sun-Struck","Low-Horizon"]` line 454; SRC-03 `["Lateral","Dispatched","Shore-Filed"]` line 587; SRC-04 `["Approach","Channel","Diffuse"]` line 719; SRC-05 `["Carapace","Fluorescent","Cyan-Tank"]` line 852). Ground-truth #3 warns of *"decay-to-Frame-Event if aura[] chips render verbatim."*

**What the repo says (verified — this is a HARD kill, not a soft warning).** DECISION_LOG.md:562 — BR-S109: *"Fit + Aura is ONE struck CLASS designation."* The 4-tag badge row (Class badge + 3 aura chips + placement line) was **KILLED** for reading as *a second Source Record (filing)*. DECISION_LOG.md:572 generalizes it into law: *"in this dossier a CODE reads as FILING, because filing already owns codes."* Separately, the chips themselves were already cleaned once for reading as person-traits: "Slow-Burn"/"Load-Bearing" → cue-named "Auger-Braced" (CHANGE_MAP.md:308, HUMAN_READ_LINE_V1.md:69, TASK_QUEUE.md:1653 — still listed as a known leak).

**Recommended resolution (for F1).** **REPO WINS decisively — a verbatim 3-chip `aura[]` row is the resurrection of a KILLED form (BR-S109) AND doc 04's own decay risk.** Do NOT render the existing `aura[]` arrays as a visible tag row in the Aura plate. Two safe paths for F1 to choose between:
- (a) Chips become **internal derivation scratch only** (feed the authored line, never shown) — safest, consistent with C-02's thin capstone.
- (b) If any chip-like surface ships, it must NOT read as a code/call-number/filing row and must NOT be the existing person-trait-adjacent arrays — it would need fresh, frame-geometry-anchored, non-address-shaped labels. Given BR-S109 + the density law, I recommend (a).

**Flag → non-blocker** (the kill is settled law; the build just must not do the killed thing). Recorded so no downstream agent treats the 5 existing `aura[]` arrays as "the chips are already authored, just render them."

---

## C-05 — metTier ordinal band vs doc 02's "no-meters" instinct `[MANDATED #5]`

**The conflict.** Ground-truth #3 puts an **ordinal band on the existing `metTier` ladder (Muted/Clean/Strong/Charged/Peak)** at the spine of Aura. Doc 02's whole thesis is *residue, not map/measure* — it bans heatmaps/Likert/sentiment-meters and warns any measurement-flavored visual "falsely implies evidence the card doesn't have." A visible ordinal band is measurement-flavored on its face; there's a real instinct-clash.

**What the repo says (verified).** The ladder is real and live: `tierBand()` app.js:61 → `<25 Muted · 25-47 Clean · 48-65 Strong · 66-82 Charged · 83+ Peak`, explicitly *"no public 0-100"* (app.js:58-60). `frame.event`/`frame.field`/`frame.signature.band` already emit these exact words as authored per-source labels. So an Aura band is a *synthesis of words the repo already ships*, not a new meter. Critically, the repo's own framing (app.js:603-608) uses the ladder as a **word-band, never a 0-100** — the anti-meter instinct is already baked into the repo's own ladder.

**Recommended resolution (for F1).** **No true contradiction — they operate on different layers, and the repo's ladder already honors doc 02's instinct.** Reconcile as: the ordinal band is a **word** (Muted…Peak), never a number, never a filled progress bar, never a gauge/dial. Doc 02's ban is on *pseudo-measurement visuals* (heatmaps, Likert, meters, contour), not on a one-word ordinal label that rides an existing repo ladder. **Recommendation: the band renders as a single ordinal word, styled as archival typography, NOT as a bar/gauge/tick-scale.** If F1 wants belt-and-suspenders, the band can even be carried inside the verdict line's diction rather than as a separate visual chip — but a one-word ordinal is compatible with doc 02 as long as it's never given meter chrome.

**Flag → non-blocker,** with one binding constraint: **the band must never acquire meter/gauge/bar visual treatment** (that WOULD violate doc 02 and the repo's own "no public 0-100"). F1 should confirm the band's *visual form* (word vs any chrome) when it resolves C-02's layout.

---

## C-06 — GPT worked lines that break the kill-list `[MANDATED #6]`

**The conflict.** Several research-doc worked lines violate the LOCKED kill-list and must not be copied verbatim into shipped copy.

**Confirmed violators (verified against BR-AURA-RESEARCH.md:85-88):**
- **Doc 02, SRC-02 worked read: "…the lake holding its breath."** Textbook **pathetic fallacy** — banned by name at BR-AURA-RESEARCH.md:86 ("the sky mourns," "the room weeps"). The mission brief itself flags this line. S2 correctly marks it FAIL. The *rest* of that read is clean; the failure is isolated to the final four words.
- **Doc 01's cold-register word-bank includes "recoil"** (and invites emotion-adjacent terminal words for "hardest word last"). "recoil"/"shame"/"loneliness" as named-emotion payloads = kill-list. S1 correctly flags this: the "hardest word last" rule must be constrained to frame/geometry/procedural nouns, never a feeling word.
- **Doc 01's class-line word-bank (mercy, pardon, devotion, debt, custody, severance, tax)** is tonally foreign to the repo's archival-forensic voice and skews gothic/legal/tarot. Not a *safety* violation but a *voice* violation (COPY_SYSTEM deadpan-archival).
- **All 16 of doc 03's rewrite pairs** ("land as loneliness," "recoil of shame," "sting of contempt," "sink into heaviness") = the banned resolved-feeling clause. Non-shippable as written (S3 confirmed).
- **Doc 05's Reach examples that die:** "you realize he is kind," "you trust him," "you know she is lonely" (S5 confirmed).

**Cleared on inspection (safe worked lines, usable as voice reference):** doc 04's SRC-01/SRC-02 mockups ("the hand takes the first hit; the cabin keeps the image human"; "the frame drops its whole weight into the brace and leaves the cold on your hands") — image-act subjects, no named emotion, no resolved-feeling clause. S4 confirmed these pass. Doc 02's SRC-01/03/04/05 worked reads pass (only SRC-02 fails).

**Recommended resolution (for F1).** **REPO KILL-LIST WINS — import mechanisms, never the offending words.** F1 should carry forward a single explicit instruction to the copy author: (1) doc 01's *mechanism* (2-word noun-ending class line; 6–14-word two-beat verdict; one contradiction; hardest word last) transfers wholesale, but its *word-bank* is replaced by frame-geometry nouns screened through BR-S113; (2) "hardest word last" is constrained to non-emotion nouns; (3) no research worked-read ships verbatim without re-clearing all three gates; (4) doc 04's mockups are the closest voice-calibration reference but are three-line and likely oversized for a thin capstone (upper bound on register, not length).

**Flag → non-blocker** (author-discipline gate; settled that mechanisms transfer and words don't). Enforcement is by review, not code (see C-11).

---

## C-07 — "aura" as careful-use word vs the section being NAMED Aura `[MANDATED #7]`

**The conflict.** COPY_SYSTEM.md §3 lists "aura" as a **careful-use word, "never as a headline."** Yet the dossier plate is titled "Aura" (app.js:1020). Doc 01's *own* class-line ban list also bans "aura" as a class word — so doc 01 and the repo agree here.

**Recommended resolution (for F1).** **Not a real contradiction; a copy-discipline note.** The plate *title* "Aura" is a fixed section name (like a museum case label), which is a different register from a *headline* or a copy-body word. The binding rule: **the body copy, class label, and verdict line must NOT lean on the word "aura"** — reach for the preferred lexicon (signal · frame · charge · record · scene · gesture · provenance · markings, and the relation-nouns). Recommendation: keep the title, forbid "aura" anywhere in the authored line/label/chips.

**Flag → non-blocker.** Copy-pass constraint only.

---

## C-08 — Doc 04's repo claims vs O1's actual findings `[MANDATED #8]`

**The conflict.** Doc 04 makes repo claims that O1 (and my re-verification) partly correct.

**Verified reconciliation (three items):**
1. **Plate stack.** Doc 04 says "five plates" (Surface Record · Archetype · Aura · Mint Record · Oracle). **CONFIRMED against live code** — `renderDossier()` return at app.js:1068 builds exactly `board·archetype·aura·mintRecord·oracle` with two `<div class="dossier__register">` dividers (THE RECORD / THE ORACLE). Doc 04 is right; README ("7 plates") and PROJECT_OS and the app.js:25 legend comment are all stale (see C-09).
2. **Aura chips extent.** Doc 04 implies chips exist for "SRC-01 and SRC-02." **CORRECTED: all five sources carry `aura[]` arrays** (verified lines 267/454/587/719/852). O1 and S4 both caught this. Material for whoever scopes the build: the raw chip ore already spans five sources — but per C-04 it must NOT be rendered verbatim.
3. **Reveal placeholder.** Doc 04 calls the `reveal/reading-panel.js` AURA a decorative placeholder. **CONFIRMED** — reading-panel.js:192 `mod("4","AURA", artcap("aura", cap(["warm glass copper","held steady"])))` and readings.data.js:96. It's a **material/finish restatement** = the single-element decay the Gate bans, AND it collides with the lane BR-S115 gave to the standalone Finish module (app.js:797). O1's flag stands.

**Recommended resolution (for F1).** Doc 04's repo findings hold up modulo (2)'s completeness correction. **The dev `reveal` AURA module is a placeholder, NOT a precedent — never copy it forward.** Finish owns material; Aura owns the RELATION. Also note the naming-hygiene flag: data.js already has a distinct `fitAura` key (verified lines 1075/1105/1136/1165/1195, fit/variant-scoped) — a new `auraField`/`auraRelation` schema must not be confused with it.

**Flag → non-blocker** (all corrections are informational; none block). The reveal-module reconciliation is a scoping note, not a gate.

---

## C-09 — README/PROJECT_OS/in-code legacy 7-plate drift vs live 5-plate `[ADDITIONAL — verified]`

**The conflict.** Three stale artifacts describe a 7-plate dossier that no longer exists:
- **README.md:27-28** — *"scan dossier (7 archive plates: Source Record → Evidence Board → Stat Dossier → Hidden Stat → Fit + Aura → Mint Record → Oracle Read)."*
- **PROJECT_OS.md:65** — *"03 Stat Dossier · 04 Hidden Stat · 05 Fit + Aura Layer · 06 Mint Record."* Plus PROJECT_OS.md:193 ("3. Aura Profile"), :232 ("Aura Profile — three label chips"), :297-302 (legacy tier/latent table). **All verified present.**
- **app.js:18** legend comment lists `tierBand` etc. under a stale map (and O1 cites app.js:25 `(7 plates)` comment drift).

**What the repo says (verified).** Live `renderDossier()` builds 5 plates (C-08). The 7-plate legend is the original 2026-06-12 design, progressively cut (Source Record killed BR-S113 1A; Stat Dossier killed BR-S107; Hidden Stat removed BR-S114; Fit+Aura → Aura → stub BR-S114/S115).

**Recommended resolution (for F1).** **REPO CODE WINS — these are documentation drift, not design questions.** Two specific hazards for the Aura build: (a) **PROJECT_OS.md:232 "Aura Profile — three label chips" must NOT be treated as the Aura spec** — that 3-chip form was explicitly KILLED in BR-S109 (see C-04). (b) An Aura build is a natural moment to reconcile README/PROJECT_OS, but that's a doc-hygiene follow-up, **out of scope for the Aura content decision itself.**

**Flag → non-blocker,** but with a trap flagged: do not let the stale "three label chips" line re-authorize the killed chip-row form.

---

## C-10 — Positional CSS (`nth-of-type`) vs semantic mandate — AND the rhythm is actively broken `[ADDITIONAL — verified, worse than O1 stated]`

**The conflict.** Ground-truth #6 mandates semantic `.dplate--aura`/`.daura__*`, never `nth-of-type()`. The repo currently styles dossier rhythm positionally — AND it's broken.

**What the repo says (verified — I confirmed the breakage).** styles.css:2346-2372 comments *"quiet → medium → medium → LOUD → medium → quiet → LOUD finale"* and targets `.dplate:nth-of-type(1)`, `(4)`, `(6)`, `(7)`. **But the live stack is only 5 `.dplate` sections.** Confirmed consequences:
- `nth-of-type(6)` and `nth-of-type(7)` **match nothing** — dead rules (the "quiet plate 6" and "LOUD finale 7" styling never applies).
- **LOUD styling (padding 38px, 24px title, 28px spine) lands on `nth-of-type(4)` = Mint Record**, not the intended Oracle payoff. The register `<div>`s were deliberately made non-`<section>` "invisible to nth-of-type" (styles.css:2292-2293), confirming the whole positional system is brittle and now mis-targeted.
- Same broken selectors repeat in the scroll-animation block at styles.css:2705-2708 (comment even says "07 is .dplate--oracle" while targeting `nth-of-type(7)` which doesn't exist).
- Note: `.dplate--mint` and `.dplate--oracle` semantic modifiers DO already exist (styles.css:2622, 2665) — so the semantic pattern is established; the rhythm layer just never migrated to it.

**Recommended resolution (for F1).** **This is a repo BUG + a design-law confirmation, not a repo-vs-research conflict.** An Aura build should (a) introduce `.dplate--aura` per ground-truth #6, and (b) is the right moment to migrate the positional rhythm to semantic modifiers (`.dplate--mint`/`--oracle` already exist to key off). **Recommendation: flag the nth-of-type breakage to the builder as a pre-existing bug** — the LOUD finale currently lands on Mint, not Oracle, which also touches ground-truth #7 (Oracle stays the crown) since Oracle isn't getting its intended LOUD treatment via this path.

**Flag → non-blocker for Aura content,** but a **strong recommendation** to fix the rhythm during the Aura build since Aura insertion changes plate positions again and would further scramble any surviving positional logic.

---

## C-11 — Person-safety is LAW but NOT enforced in code `[ADDITIONAL — verified]`

**The conflict.** The three-gate rule + BR-S113 are asserted as binding, but HUMAN_READ_LINE_V1.md:41,65 states plainly: *"Still asserted, not enforced… Blue Room does not yet fully enforce this."* Gates 2/3 are not validator-encoded; `PERSON_TRUTH` doesn't scan aura/evidence; `safetyFlags` are self-attested; no aggregate guard. The doc names still-present leaks in data.js ("the cap and beard do structural work," "nobody crouches by accident," character aura chips — HUMAN_READ_LINE_V1.md:69).

**Recommended resolution (for F1).** **Not a doc-vs-doc conflict — a reality-vs-aspiration gap that constrains HOW Aura ships.** Any Aura authoring is gated by **author discipline + review only**, not code. Recommendation: F1's Aura spec must state this explicitly and make the three-gate check a mandatory human review step in the authoring checklist, since there's no code backstop. Do NOT assume a validator will catch a bad line.

**Flag → non-blocker for the design,** but a binding process constraint on the build (review is the only gate).

---

## C-12 — Doc 05 Reach (second-person "you") vs the repo's repeated retirement of second-person `[ADDITIONAL — the sharpest live conflict, verified both sides]`

**The conflict (S5's Conflict 1, which I re-verified and am escalating as genuinely unresolved).** Doc 05 makes second-person felt-transfer ("you stop," "you keep looking," "you get checked at the glass") a load-bearing bridge device for Aura's Reach zone. But the repo has *actively retired* second-person address multiple times, citing "second-person address" as the defect itself:
- COPY_SYSTEM.md retired "does not let **you** observe" and "performs **for you**" citing second-person address.
- DATA_COPY_SYSTEM_AUDIT_V1 lists "no second-person person-address" as a PASS criterion.
- SAMPLE_ROOM_18 audit fixed "performed **for you**" → "for the lens."
- TASK_QUEUE has an OPEN prospective item to de-second-person more notes.
- READING_DOCTRINE Layer 3: "No second-person identity claim… only partially backstopped."

**AGAINST that:** the repo's OWN canonical SAFE example for the aura/magnetism cliché is itself second-person — **BR-AURA-RESEARCH.md:94: "the frame keeps you at arm's length — near but walled off by the turned shoulder and the glass."** **I verified this line is live and un-retired** in the doc that governs Aura directly. So the repo simultaneously (a) retires "you" in shipped copy elsewhere and (b) ships "you" as its model SAFE Aura line.

**Recommended resolution (for F1) — I do NOT resolve this; it needs a human call.** The question is whether the repo's second-person retirement is:
- **(a) a blanket ban on any "you" in shipped copy** — in which case BR-AURA-RESEARCH.md:94's own example is already in violation and doc 05's entire Reach zone is DEAD for Aura; or
- **(b) a narrower ban on *possessive-identity / for-you-flattery / passive-observer address* shapes** (which is what every retired example actually is: "for you," "your attention," "let you observe" — and what `PERSON_TRUTH`'s regex actually catches: `you are`, `you're`, `your (personality|character|soul|worth…)`), in which case doc 05's *active momentary viewer-verb* clauses ("you stop," "you get checked at the glass") are a different grammatical family and can survive narrowly.

**My recommendation to F1:** the evidence leans (b) — every retired line is address/flattery/possessive, none is an active momentary perceptual verb, and the repo's own model Aura line uses exactly the (b)-type "you." **But this must be ruled explicitly, because if F1 reads it as (a), the repo's own governing example needs a retroactive fix and doc 05's Reach is dead.** Do not let synthesis silently pick.

**Flag → BLOCKER for the Reach clause specifically** (whether Aura may use any second-person transfer clause). Non-blocker for the rest of Aura — the hinge/Read zone stands regardless. This is the #2 blocker after C-02.

---

## C-13 — Doc 02's four visual directions are NOT mapped to the Subtraction-Gate's five kind-words `[ADDITIONAL — unresolved mapping, flagged by S2 & S4]`

**The conflict.** Two vocabularies were built independently and never reconciled 1:1:
- Doc 02's four **visual-render directions:** one-seam burn / ghost smear / off-center tension line / type-burn.
- Ground-truth #3's five schema-constrained **relation-kind words:** Standoff / Edge / Figure-Ground / Light-Fit / Vector-into-Void.

They *suggest* pairings (Standoff/Edge ≈ tension-line or seam; Vector-into-Void ≈ smear) but no one has decided whether they're **the same axis** (fixed lookup: kind-word → mandatory render), or **two independent axes** (kind-word chosen semantically, render chosen per-source regardless).

**Recommended resolution (for F1).** **Unresolved — needs a design call.** My recommendation: keep them **independent** — the kind-word is the *schema-constrained relation label* (what relation the frame stages), the visual direction is *how the residue renders*, and forcing a fixed lookup would over-constrain both (e.g., two different Standoffs might legitimately want a seam vs a tension-line depending on the source's geometry). A loose default mapping can guide authors without being a hard enum-to-enum lock. But this is F1's call, not mine.

**Flag → non-blocker** (both vocabularies exist; the build can author kind-word and render-direction per-source by hand even without a formal mapping). Becomes relevant only if someone wants to auto-derive one from the other.

---

## C-14 — "kind-word" vocabulary source: doc 04's contradiction-labels vs the geometry-noun schema constraint `[ADDITIONAL — the convergence that still needs recasting]`

**The conflict.** Ground-truth #3 notes the CONVERGENCE: doc 04's editorial labels ("Warm Refusal," "Quiet Labour," "Cold Exit," "Held Field") are contradiction-pairs = the same two-term relation idea as the Subtraction-Gate kind-word. BUT ground-truth #3 also constrains the kind-word vocabulary *at the schema* to **frame-geometry nouns** (Standoff/Edge/Figure-Ground/Light-Fit/Vector-into-Void) and explicitly BANS subject-intention phrasing (e.g., "neither arriving nor leaving"). Doc 04's labels are NOT frame-geometry nouns — "Refusal"/"Labour" are institutional/action nouns, and S1 flags they'd read tonally foreign next to the shipped voice ("Gesture Geometry," "Field Silence").

**The trap I'm flagging:** SRC-01's stance prose contains *"neither departing nor stationary"* (verified data.js:269 region) — this is exactly the subject-intention phrasing ground-truth #3 bans as a *kind-label*. It's fine as **provenance prose** (the stance sentence Aura distills from) but must NOT become the chip/kind-word.

**Recommended resolution (for F1).** **Two distinct roles, don't conflate them:**
- The **kind-word** (the schema-constrained label) = a frame-geometry noun. Doc 04's contradiction-labels are the *right shape* (two-term relation) but the *wrong vocabulary* (action/institutional, not geometry). They should be **recast into geometry-noun form**, not adopted verbatim — OR F1 decides the geometry-nouns are category-headers with doc 04's labels as sub-instances. Either is defensible; F1 must pick one.
- The **verdict line** (the authored sentence, doc 01's two-beat craft) is where the *charge* and the doc 04 mockup register live — this can carry "warm refusal" *as prose diction* even if the kind-word chip is "Standoff."
- **Provenance = `src.stance`** (verified live for all five sources; SRC-01/02 are multi-clause, SRC-03/04/05 are one-liners — a quality asymmetry worth noting, see Gap G-11), NOT a redundant invented field, and NOT the source of the kind-word verbatim.

**Flag → non-blocker** (author can hand-pick geometry kind-words per source), but F1 should **explicitly rule the substitution** (doc 04 labels recast to geometry nouns) so doc 04's action-nouns don't leak into the schema enum. S1, S2, and S4 all independently flagged this exact recasting need.

---

# GAPS LIST

Open questions the research does NOT answer. Each marked **BLOCKER** (build cannot correctly proceed until answered) or **non-blocker** (can be authored/deferred).

**G-01 — The null-relation sample does not exist. `[BLOCKER]`**
Ground-truth #3 condition (b) requires *at least one authored null-relation sample so the band can legitimately read null.* **Verified: all five `stance` fields in data.js assert a LIVE relation** (SRC-01 "the two-arm split holds the frame in suspension"; SRC-03 "the shore does the staging"; etc.). None is null/neutral. No research doc addresses how a verdict line or band reads when the relation is deliberately null (doc 01 explicitly *assumes* every line has a locatable contradiction; S1 flags this gap). Whoever builds must author a null sample from scratch, and no one has specified what "null relation" even looks like on the metTier ladder (is it "Muted"? a separate null state below Muted?). **Blocker: the schema's null state and its first sample are undefined.**

**G-02 — Real visual assets for SRC-03/04/05 residue marks are unspecified. `[BLOCKER for those three sources; non-blocker for SRC-01/02]`**
Docs 02/04 give worked residue directions for SRC-01 (smear) and SRC-02 (seam), and doc 02 sketches SRC-03 (tension line), 04 (smear), 05 (type/seam). But there are no authored class-labels, verdict lines, or finalized visual specs for SRC-03/04/05 — only direction. H5 lists this as known future work. The residue mark for each needs the actual source-image geometry to be built (which cue is the seam? which gesture is the smear?), and the dossier screenshot that might have shown current visual treatment (`1783253951358_image.png`) is **ABSENT** (verified: not in repo, per mission also not in Downloads). Build for SRC-01/02 can proceed; SRC-03/04/05 need authoring.

**G-03 — Palette baseline for the residue mark is under-specified. `[non-blocker]`**
Doc 02 says "warm smeared into black, one cold/purple edge, no rainbow." Doc 04 gives `color-mix(in srgb, var(--halo-a) 55%, var(--silver))` at 8–12% residue opacity. But: what is the actual `--halo-a` value per source, does it give enough warm/cold contrast for the seam vs smear, and does it meet the 3:1 non-text contrast against archive-black? No one has checked the five halo materials against the residue-palette requirement. Authorable with a contrast check; not blocking the concept.

**G-04 — Where exactly the ordinal band SITS in the plate is undefined. `[BLOCKER — folds into C-02]`**
Ground-truth #3 says "one band + one kind-word + one verdict line," but no doc specifies the *layout relationship*: is the band a leading chip above the line? Inline in the line? A left-margin stamp? Doc 04's two-column layout is superseded-as-target (C-02) but nothing replaced it with a thin-capstone layout. This is the concrete "which fields ship where" question that C-02's resolution must produce. Blocker because you can't write `.daura__*` CSS without it.

**G-05 — Repeat behavior across scans is unspecified. `[non-blocker, but safety-adjacent]`**
HUMAN_READ_LINE_V1 bans *aggregation* (many pulls reconstructing a stable trait; "aura re-derived fresh per scan"). But no doc specifies whether a *re-scan of the same source* shows the same Aura (deterministic authored content) or varies. For the two authored sources it's static/authored, so no aggregation risk today — but the mission's future multi-form/uploaded-photo direction makes this a latent question. Non-blocker now; flag for the uploaded-photo engine.

**G-06 — Reveal-surface derivative scope is undefined. `[non-blocker]`**
Doc 04's file-table lists "reduced Aura capsule later" in `reveal/reading-panel.js` as optional follow-up. The dev module currently ships a material/finish restatement (C-08) that must be reconciled or ignored. No one has decided whether the reveal surface eventually gets a *relation*-shaped Aura derivative or stays a dev placeholder. H5 defers it. Non-blocker: dossier is canonical; reveal is isolated dev.

**G-07 — Provenance field name & shape are unspecified (and collide with `fitAura`). `[non-blocker, but must resolve before schema authoring]`**
Ground-truth #3 says "provenance points at `src.stance`." Doc 04's schema has `sourceRefs[]` and `safety.imageActBasis[]` but NO field that means "provenance = stance." And a new `auraField`/`auraRelation` key risks confusion with the existing `fitAura` key (verified data.js:1075+). Nobody has named the provenance field or confirmed it's a *reference to* `src.stance` rather than a *copy of* it (a copy would be redundant-invented-field, which condition (a) bans). Authorable once C-02 sizes the schema.

**G-08 — Schema-constrained kind-word enum is not authored. `[BLOCKER — folds into C-14]`**
Ground-truth #3 condition (c) requires a schema-constrained kind vocabulary. The five candidate geometry-nouns (Standoff/Edge/Figure-Ground/Light-Fit/Vector-into-Void) are proposed but not ratified, and doc 04's schema types `classLabel` as an open `string` with no enum. Which five (or N) geometry-nouns are the canonical set, and which one does each of the five live sources map to? Undefined. Blocker for the schema.

**G-09 — Whether a visible chip-surface exists at all. `[non-blocker — resolved-ish by C-04]`**
Given BR-S109 killed the 3-chip row and C-04 recommends chips-as-internal-scratch, the open question is only whether F1 wants *zero* visible chips or *some* re-authored non-filing chip surface. Leaning zero. Non-blocker; C-04 gives the safe default.

**G-10 — The band's own visual form (word vs any chrome). `[non-blocker — folds into C-05]`**
C-05 establishes the band must be a word, never a meter. But the exact typographic treatment (is it the same as `frame.event` labels? a distinct Aura stamp?) is unspecified. Non-blocker; a styling detail once C-02/G-04 fix layout.

**G-11 — Provenance QUALITY is asymmetric across sources. `[non-blocker — newly surfaced]`**
I verified that SRC-01/02 `stance` fields are rich multi-clause relation-narrations ("the two-arm split holds the frame in suspension: neither departing nor stationary"), while SRC-03/04/05 stances are single terse sentences ("Transverse hold, catch presented perpendicular to the camera axis…"). Since provenance = stance, the Aura verdict-line authoring has *more ore* to distill for SRC-01/02 than for SRC-03/04/05. Not a blocker, but whoever authors SRC-03/04/05 lines should know the source sentence is thinner and may need more authorial lift (or a stance enrichment pass first). No research doc anticipated this asymmetry.

**G-12 — No decision on whether Aura's band/kind-word may reuse `frame.event`/`sceneCharge` words verbatim. `[non-blocker, but a decay-risk to flag]`**
`sceneCharge.label` already emits one-word relation-ish labels (Idling/Contained/Filed/Closing/Selecting — verified data.js:1080+) and `frame.event` emits tier words. If Aura's band or kind-word simply re-prints these, Aura decays into a restatement of Metrics/Surface (the exact "don't be a second X" hazard). No doc addresses whether Aura *synthesizes* from these or must *differ* from them. Recommendation to flag: Aura must be a synthesis that reads differently from `sceneCharge`, not a re-print. Non-blocker but a checklist item for the no-duplication gate.

---

# CROSS-AGENT DISCREPANCIES (so F1 doesn't inherit a hidden fork)

These are places S1–S5 / O1 / H5 disagree *with each other* — distinct from repo-vs-research conflicts.

**X-01 — H5 adopts doc 04's medium plate; the Subtraction-Gate spine (and S4) reject it.**
**H5 is the outlier.** H5's PART III ships doc 04's full medium-density spec near-verbatim: the two-column `minmax(0,1.05fr) minmax(340px,0.95fr)` grid, `min-height:320px`, a 16:10 right visual frame, the 4-anchor `AuraField`/`AuraAnchor` schema with `x?/y?`, three visible chips, and multi-sentence readings (its SRC-01 "reading" is 3 sentences). This directly contradicts ground-truth #3's THIN capstone and S4's explicit C-02 flag. **Recommendation for F1: H5's PART III layout/schema is doc-04-sized and must be down-scoped to the thin capstone before use.** Treat H5 as an excellent *kill-list consolidator* (its PART II deduped DO-NOT list is the most complete in the fleet and should be adopted) but NOT as the sizing/schema authority — it pre-committed to doc 04's plate before the Subtraction Gate verdict was applied. This is the single most important cross-agent correction: **do not let H5's PART III be read as the ratified spec.**

**X-02 — H5 renders `x?/y?` coordinates and 3 visible chips; C-03/C-04 scrub both.**
H5's schema keeps `AuraAnchor.x?/y?` (map residue, C-03) and ships `chips[]` as visible tags (killed form, C-04). F1 should apply the C-03/C-04 scrubs to H5's schema, not inherit it as-is.

**X-03 — S2 leaves the direction↔kind-word mapping open; H5 implicitly fixes it per-source.**
S2 explicitly flags the 4-directions↔5-kind-words mapping as unresolved (C-13). H5 quietly assigns one direction per source (SRC-01 smear, SRC-02 seam, SRC-03 tension) as if settled. **S2 is correct that it's unresolved**; H5's per-source assignments are reasonable *defaults* but should be labeled as defaults, not a ratified lookup.

**X-04 — S1 and S4 agree doc 04's labels need recasting to geometry-nouns; H5 ships "Warm Refusal"/"Quiet Labour" as the class labels.**
H5 uses doc 04's action-noun labels directly as `classLabel` values. S1/S4/C-14 say these need recasting (or demotion to verdict-line diction) because the schema kind-word must be a frame-geometry noun. F1 should apply C-14's split (geometry-noun for the schema chip; doc 04's contradiction-labels allowed only as prose diction in the verdict line).

**No other material cross-agent forks.** On the safety law (C-01), S1/S2/S3/S5/O1/H5 all converge: repo BR-S113 wins, doc 03's law is rejected, the mechanics survive. On residue-not-map (C-03), S2/S4/H5 converge. On the second-person question (C-12), S5 is the only agent to surface it and correctly flags it as needing a human call — no other agent contradicts S5; they just didn't raise it.

---

# THE ONE-LINE VERDICT FOR F1

Aura reads what the image does — charged, terse, verdict-shaped — by naming the **relation the frame stages between two co-present elements** as *one ordinal word-band + one frame-geometry kind-word + one authored two-beat verdict line*, provenance-referencing `src.stance`, rendered as one restrained residue mark (never a map, meter, or chip-row), authored-first and human-gated (no code enforcement). **Two hard blockers gate the build: C-02 (thin capstone vs doc-04 medium plate — decides schema/layout) and C-12 (may Aura use any second-person "you" clause — the repo's own model Aura line says yes, its audit trail says retire it). Everything else is authorable or deferrable.** The biggest trap in the inherited material is **H5's PART III**, which ships doc 04's medium plate as if ratified — down-scope it before anyone treats it as the spec.

---

# F1 FINAL RESOLUTIONS

# 09_CONFLICTS_AND_GAPS — F1 FINAL RULINGS (append)

Authority order applied throughout: **repo law > Subtraction Gate verdict > research docs.** Every ledger item ruled; nothing left silently open.

## The mandated eight

- **C-01 (doc 03/05 law vs BR-S113):** RATIFIED as adjudicated — repo wins, BR-S113 stays locked. Mechanics survive (pivot, swap, two-second, connotation-strip, four-zone filter, short cue-bound viewer-transfer); named-emotion payloads and person-subject claims die. S3/O3's SURVIVES-DIES split adopted verbatim, with one tightening: see O3-5c below.
- **C-02 (thin capstone vs doc-04 medium plate) — BLOCKER, CLEARED:** **Thin capstone WINS** (the THIN mandate is mission ground truth; the repo's structural laws — dossier-owns-depth, geometry-prose-in-two-places-only, restraint-over-density — all pull the same way; doc 04's own worked examples are more relation-shaped than its felt-field definition). Doc 04 demoted to donor: keep semantic classes, four-pass pipeline, a11y intent, tint recipe, label+line copy structure; kill the 320px two-column plate, 16:10 frame, 4-anchor grid, felt-field definition sentence. Layout fixed in spec §9 (also clears G-04).
- **C-03 (residual map logic):** RATIFIED + EXTENDED. `x`/`y` dead everywhere (including internally); `visual.mode` closed to `"tension"|"seam"|"smear"|null` — **"type" also removed** (benched = absent from the shipped enum; re-adding it later is a reviewed schema change gated on "Oracle still has somewhere richer to go"); `anchors[]` **not persisted in `data.js` at all** (stricter of S7's two options) — derivation scratch lives in the authoring note/PR per S10's audit-trail recommendation. Doc 02's red-line list copied into spec §6 as hard law.
- **C-04 (chips verbatim):** RATIFIED, path (a) — `aura[]` is INPUT-ONLY, zero visible chip surface (clears G-09). BR-S109 is settled law; the stale PROJECT_OS "three label chips" line is a trap, never a spec.
- **C-05 (band vs no-meters):** RULED — no true contradiction. `auraField.tier` is a **hand-authored word ranking the RELATION** (never computed, never a 0-100, never re-tiering a Metrics-banded property — resolves O2#1 vs O5-rule-2: equality with `event.charge` is allowed but must be author-justified, and S8's mechanical `event.charge` fallback is vetoed). Renders as ONE `metTier()` row — the house's shipped expression of the word-ladder — never in `.met-bands`, never a second row/%/gauge. O6's word-only form is the recorded fallback if visual QA reads the built plate as an instrument. (Clears G-10.)
- **C-06 (GPT lines breaking the kill-list):** RATIFIED — mechanisms transfer, word-banks die; no research line ships without re-clearing the gate. **EXTENDED with two new kills found by F1 verification:** O4's SRC-05 tighter line and the SRC-04 candidate line both pre-spend their source's Oracle verbatim (`data.js:832/858`; `:699/725`) — vetoed; replacements provided in spec §8; QA row 2.5 amended to require side-by-side oracle reads.
- **C-07 ("aura" careful-use vs plate title):** RATIFIED — the title stays (fixed section name); the word "aura" is banned from classLine, verdictLine, freeLine, and all body copy; reach for the preferred lexicon.
- **C-08 (doc 04 repo claims):** RATIFIED — five-plate stack confirmed; `aura[]` exists on all five sources; the dev `reveal` AURA module is a placeholder, NEVER a precedent (Finish owns material; Aura owns the relation); new key named `auraField`, grep-distinct from `aura[]` and `fitAura`.

## Additional ledger items

- **C-09 (7-plate doc drift):** RATIFIED — code wins; README/PROJECT_OS/app.js-comment are stale. Doc-hygiene follow-up task, out of Aura's scope; the "Aura Profile — three label chips" line explicitly de-authorized.
- **C-10 (nth-of-type breakage):** RATIFIED as repo bug + design-law confirmation. Clarification added: **the Aura build does NOT shift plate positions** (the stub already occupies slot 3 of 5), so the broken rhythm is decoupled from this build. Aura introduces `.dplate--aura` and zero positional selectors; the rhythm migration to semantic modifiers is its own recommended session.
- **C-11 (safety asserted, not enforced):** RATIFIED — human review is the whole wall. The S10 sheet is mandatory per source and the filled sign-off is committed as a durable artifact (recommend `docs/audits/`). Stated verbatim in spec §5 and as GO condition 4.
- **C-12 (second-person) — BLOCKER, CLEARED:** RULED **(b), narrow ban.** Rationale: (i) every retired line in the trail (COPY_SYSTEM :80/:144/:230, SAMPLE_ROOM_18 :68, TASK_QUEUE) is possessive/flattery/passive-observer grammar; (ii) the code floor's `PERSON_TRUTH` regex family encodes exactly the (b) boundary; (iii) the governing Aura doc's own canonical SAFE line is second-person and un-retired (verified live, `BR-AURA-RESEARCH.md:94`); (iv) mission ground truth #2 already lists short cue-bound viewer-transfer clauses among the surviving mechanics. Constraints: minority of lines, one clause, late, cue-bound, bodily/perceptual viewing-event only; `you are/you're/your <identity-noun>`/"for you" shapes dead on sight. **One-time human ratification at first review is GO condition 2**; SRC-01's no-you fallback is pre-authored so an overturn costs one string swap.
- **C-13 (4 directions ↔ 5 kinds):** RULED — **two projections of one relation, render layer not lookup** (O5's proposal adopted). Default map: Standoff/Figure-Ground→tension, Edge/Light-Fit→seam, Vector-into-Void→smear. Per-source override legal WITH a written reason (SRC-02 = the canonical legal override: Centred balance would render a false-null tension line). (Also resolves X-03.)
- **C-14 (kind vocabulary):** RULED — **the two-tier split is law.** KIND = closed backstage geometry enum (schema, QA, residue default, aria — never rendered as text); classLine = the single rendered authored contradiction pair. Doc 04's action-noun labels survive ONLY as classLine register, gesture-pinned and documented in `safety.imageActBasis`; they never enter the enum. Subject-intention phrasing ("neither departing nor stationary") is provenance prose only, never label. This refines O2's ruling (c) — O2's singularity + schema-constraint demands are both fully honored; rendering the charged pair instead of the bare geometry noun is the deliberate choice (a bare "Figure-Ground" chip reads as a second Metrics taxonomy term). (Also resolves X-04 and O4's conflict 3 / S9's conflict 2: social nouns allowed narrowly, gesture-pinned, with the pure-frame fallback pairs on record if the human ever wants zero social nouns.)

## Gaps

- **G-01 (null sample) — BLOCKER, CLEARED at spec level:** null state fully specified (kind null · no classLine · tier Muted · no mark · absence-shaped verdict, house pattern adopted from O4). Ships as a marked non-rendered fixture in `data.js`; render path must handle it and be visually verified (GO condition 3); replaced by the first real null source, never kept as permanent data.
- **G-02 (SRC-03/04/05 assets) — CLEARED for scaffolding, OPEN for ship:** kind/direction/band/tint/geometry now assigned for all three (spec §8); final verdict lines require the human pass (GO condition 5). Screenshot remains absent — not a blocker.
- **G-03 (palette check):** answered — tint table + recipe in spec §6; per-source 3:1 contrast spot-check is a build step, not assumed.
- **G-04 (band placement) — BLOCKER, CLEARED:** layout fixed — single column, mark → classLine → band → verdict (spec §9).
- **G-05 (repeat behavior):** non-blocker — deterministic authored content for the five sources; the future upload engine inherits the rule: aura re-derived fresh per scan, never joined by person key (cross-pull wall).
- **G-06 (reveal derivative):** RULED — ignore now; the dev placeholder never ships to a live surface; any future reveal capsule must be relation-shaped and fully re-gated.
- **G-07 (provenance field):** answered — `auraField.provenance = { stanceRef: true, sourceRefs: [] }`; a reference, never a copy; no `fitAura` collision.
- **G-08 (kind enum) — BLOCKER, CLEARED:** ratified — exactly the five geometry nouns + null; per-source mapping in spec §8; a sixth noun = reviewed schema change with an O2-style boundary check.
- **G-09:** zero visible chips (per C-04).
- **G-10:** band form ruled (per C-05).
- **G-11 (stance asymmetry):** acknowledged — SRC-03/04/05 authors get thinner ore; a stance-enrichment pass FIRST is legal (stance is authored content); inventing unanchored aura claims is not.
- **G-12 (verbatim reuse of sceneCharge/event words):** rule adopted — classLine/verdict never re-print `sceneCharge.label` or a Metrics-banded label as the payload; tier-word equality with `event.charge` allowed only with an authoring-note justification.

## Cross-agent forks

- **X-01:** H5 PART III formally SET ASIDE as spec source (doc-04-sized); H5's PART II kill-list consolidation adopted into the QA sweep.
- **X-02:** H5's `x/y` + visible chips scrubbed per C-03/C-04.
- **X-03:** resolved per C-13 (default map, not lookup; H5's per-source picks relabeled defaults).
- **X-04:** resolved per C-14.

## Agent-level items not covered above

- **O3 conflict 3:** any doc citing doc 03's "conditionally safe" tier must annotate "image-property/geometry claims only, never named emotion" — adopted. **O3 conflict 4:** closed by the schema's provenance field. **O3 §5c pathetic-fallacy carve-out:** REJECTED — the repo kill-list (`BR-AURA-RESEARCH.md:86`) bans the pathetic fallacy flat; "the lake holding its breath" is dead; S10 row 1.6c corrected accordingly.
- **O4 conflict 4 (render law):** ratified — the classLine renders only as part of the composed capstone, never as a naked chip row. **O4 conflict 5:** null copy shape adopted.
- **O5 per-source forks:** SRC-01 direction overridden to tension line (via O5's own selection tree — a held raised palm is a biased balance, not retained motion); SRC-02 KIND ruled Figure-Ground with a legal seam override; SRC-05 KIND ruled Light-Fit; type-burn benched-not-deleted with its re-entry gate on record.
- **S7 conflicts:** anchors[] ruled NOT persisted (stricter option); `classLine` name kept; SRC-04/05 `event.label` values now verified live this session ("Lens-direct stride" `data.js:667`, "Shell lifted" `:800`); null fixture kept as fixture-until-real.
- **S8 items:** `--ink-950` adopted (`--bg` does not exist); direct `aria-label` adopted (house convention, `aria-labelledby` declined); free-state ruled — authored freeLine + undeveloped line, NO mark (sealed-dim rejected: it dangles the verdict and can leak bias or fake a null); plate density ruled thin per C-02.
- **S9 conflicts 1–4:** all closed by C-12, C-14, C-13, G-01 respectively.
- **S10 conflicts 1–4:** Reach rows active under ruling (b) pending one-time ratification; 6.4 numeric budgets supplied (spec §9); 4.5 ruled "fields absent"; sign-off artifact committed to `docs/audits/` — adopted as process law.