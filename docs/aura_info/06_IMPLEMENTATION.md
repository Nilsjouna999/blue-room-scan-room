# 06 — Implementation (S4 architecture + S7 schema + S8 render/CSS)


# S4 — Normalized Doc 04 (Aura Field Map / Implementation)

Source: `04_aura_field_map_implementation.md` (blue_room_research). Cross-checked against repo (app.js, data.js, reveal/reading-panel.js, README.md) — all load-bearing repo claims below are VERIFIED unless flagged.

---

## 1. Repo findings doc 04 claims (verified against O1 territory)

| Claim | Verified | Anchor |
|---|---|---|
| `renderDossier()` builds a stack with Surface Record, Archetype, Aura, Mint Record, Oracle Read; Archetype and Aura are reserved stubs | TRUE | `app.js` grep `function renderDossier(src, treatment)`; stub bodies at `dplate("02", "Archetype", ...)` and `dplate("03", "Aura", ...)` render `<p class="dstat__undeveloped">…read — reserved. Develops in a later pass.</p>` |
| Aura's stub comment ties it to Surface/Finish split | TRUE, and more specific than doc 04 says | `app.js` comment directly above the aura stub: `/* 03 — Aura (BR-S115: emptied to a reserved stub — the standalone right-panel "Finish" module now carries the material/finish read; Aura is parked for a later pass. Mirrors the Archetype stub.) */` — this is a **decision ID (BR-S115)**, not just an inference; cite it exactly. |
| README still says "seven-plate" including "Fit + Aura," live renderer produces five plates | TRUE — confirmed conflict is real, not stale research | `README.md` grep `Fit \+ Aura`: *"Dossier → Hidden Stat → Fit + Aura → Mint Record → Oracle Read) continues"*; `app.js` line-25 comment says `dossier … renderDossier (7 plates)` (README/comment drift, both legacy) vs. the actual `renderDossier()` body which constructs board/archetype/aura/mintRecord/oracle = **5 plates**. Doc 04's instruction to build against renderer reality, not README, is correct and should be repeated verbatim in synthesis. |
| Copy system: deadpan archival seriousness, "aura" is a careful-use word, preferred lexicon signal/artifact/frame/scene/charge/record/markings/container | NOT independently re-verified by S4 (owned by doc/COPY_SYSTEM.md, outside this agent's assigned extraction — flag for O1/whoever owns COPY_SYSTEM.md verification) | `docs/COPY_SYSTEM.md` (not grepped by S4; note as unverified pass-through, not a repo fact S4 confirmed first-hand) |
| SRC-01/SRC-02 already carry aura chips (`["Idle-Engine","Open-Palm","Northbound"]` / `["Auger-Braced","Sun-Struck","Low-Horizon"]`) and authored analysis notes | TRUE, but **incomplete as stated** | `data.js` grep `aura:` — **five** sources carry `aura` chip arrays, not two: SRC-01 `["Idle-Engine","Open-Palm","Northbound"]`, SRC-02 `["Auger-Braced","Sun-Struck","Low-Horizon"]`, plus SRC-03 `["Lateral","Dispatched","Shore-Filed"]`, SRC-04 `["Approach","Channel","Diffuse"]`, SRC-05 `["Carapace","Fluorescent","Cyan-Tank"]`. **New repo fact beyond doc 04's citation** — the raw chip material for a synthesis pass already exists for all five live sources, not just the two doc 04 walks through. |
| — (not in doc 04, found during verification) | NEW FINDING | `data.js` also has a distinct `fitAura:` object (grep hits at lines tied to variant/fit records) — **do not conflate with the dossier's `Aura` plate or the `aura[]` chip array**. `fitAura` appears to be a fit/variant-scoped structure unrelated to the felt-field concept doc 04 is designing for. Flag for O1: is `fitAura` namespace collision risk if a new `auraField` schema (below) is introduced? Naming needs to stay clearly distinct from existing `fitAura`. |
| `reveal/reading-panel.js` renders AURA as a decorative placeholder: sketch + capsule like "warm glass copper / held steady" | TRUE | `reveal/reading-panel.js` grep: `h += mod("4", "AURA", artcap("aura", cap(["warm glass copper", "held steady"])));` — confirmed placeholder, confirmed lower priority per doc 04's own file-change table. |
| `PROJECT_OS.md` assigns dossier/right layers to meaning, Oracle = single verdict | NOT independently re-verified by S4 (outside assigned grep scope) — flag as pass-through, consistent with ground-truth rule 7 (Oracle stays the only verdict) already locked at the mission level. |

**Net verification verdict: doc 04's repo findings hold up.** The one correction is completeness (5 sources have aura chips, not 2) and one addition (`fitAura` naming-collision risk). Both should be forwarded to O1/F1 as refinements, not contradictions.

---

## 2. Aura definition + two-layer vocabulary

Doc 04's definition:

> **Aura is the image's felt field: the way a photograph presses, holds, leaks, cools, or lingers once the evidence is known.**

**CONFLICT TO FLAG (per mission brief instruction) — definition-size mismatch:** this is a *medium-density, multi-verb, atmosphere-genre* definition (press/hold/leak/cool/linger — five verbs, open-ended field metaphor). It is in tension with the mission's Subtraction-Gate ground truth, which defines Aura's irreducible job much more narrowly as **the RELATION a frame stages between two co-present elements** (tension/edge/mismatch/fit BETWEEN them), expressed as **one ordinal band + one kind-word + one short verdict line**, explicitly **"a THIN synthesis-capstone... NOT a big plate."** Doc 04's felt-field definition is broader and does not itself require a *relation between two elements* — it could just as easily describe a single-element mood, which is closer to what the Subtraction Gate wants to avoid (redundant single-element reading, restated). **This is the load-bearing conflict S4 was asked to surface — do not resolve it here; route to O6/F1.**

**Internal derivation lexicon** (doc 04's proposed backstage-only vocabulary — never all shown onscreen):

| Term | Working definition |
|---|---|
| Projector | Cue that sends the image outward |
| Container | Structure that holds the field |
| Rim | Edge where field cools/leaks/opens |
| Residue | What remains after first look |
| Front pressure | Read that advances toward viewer |
| Held field | Contained rather than dispersed |
| Cold edge | Cooling exit at perimeter |
| Warm hold | Warmer retained interiority |
| Task gravity | Field organized around work |
| Afterimage | Simplified lingering trace |
| Seal point | The one cue that "fixes" the read |
| Release path | Line the eye exits along |

Doc 04 ties each to SRC-01 (raised palm / cabin roof-seat-wheel / fjord window band / warm-red-vs-cold-grey / palm-meets-lens / cabin-owns-frame / window-band / red-layer / secondary / palm-silhouette+glass-strip / open palm / palm→lens→window) and SRC-02 (auger brace-downward vector / snow plane+low crouch / treeline horizon upper quarter / cold task-pressure / not primary / centered-low-mass-locked / horizon line-snow glare / minimal-sun-struck / primary-downward-into-ice / black-crouch-on-white / gloves-on-brace / tracks+vector-into-ice).

**Editorial output lexicon** (visible class-label style, e.g. Warm Refusal / Quiet Labour / Cold Exit / Held Field) — **NOTE THE CONVERGENCE flagged in the mission ground truth**: these contradiction-shaped labels (Warm + Refusal, Quiet + Labour) are structurally the same move as the Subtraction Gate's "kind-word" (a two-term relation compressed to one label). **This is the part of doc 04 that should marry cleanly into the Subtraction Gate spine** — the labels are candidate *kind-words*, but per ground truth they must be **schema-constrained to frame-geometry nouns** (Standoff/Edge/Figure-Ground/Light-Fit/Vector-into-Void), which means doc 04's specific labels (Warm Refusal, Quiet Labour, Cold Exit, Held Field) likely need re-casting into geometry-noun form rather than adopted verbatim — flag this recasting need for whoever owns final vocabulary (O6/F1), don't resolve here.

---

## 3. Visible class labels proposed

- **SRC-01:** Warm Refusal, Direct Address, Cold Exit
- **SRC-02:** Quiet Labour, Task Gravity, Low Horizon

Doc 04's own gloss: "Warm Refusal" reads the contradiction between the palm stopping the viewer and the cabin's warmth keeping the image non-hostile — this is explicitly a **two-element relation** (palm-cue vs. cabin-cue), which is actually consistent with the Subtraction Gate's relation-based spine even though doc 04's own top-line *definition* (section 2 above) is broader/atmosphere-flavored. Worth noting for synthesis: the worked examples are more relation-shaped than the stated definition — the examples may be more reusable than the definition sentence itself.

---

## 4. `auraField` schema + `AuraAnchor` type

Doc 04's proposed data model:

| Field | Type | Required | Purpose |
|---|---|---:|---|
| `id` | `string` | yes | Stable internal identifier |
| `classLabel` | `string` | yes | Public class line, e.g. `Warm Refusal` |
| `chips` | `string[]` | yes | Three short tags |
| `reading` | `string` | yes | One short, evocative field sentence |
| `anchors` | `AuraAnchor[]` | yes | Four core anchor records |
| `visual.mode` | `string` | yes | Render mode (per doc 02: seam/smear/tension — **not** doc 04's original map mode) |
| `visual.tint` | `string` | yes | Restrained tint, usually from `src.halo.a` |
| `safety.imageActBasis` | `string[]` | yes | Which re-authorable cues justify the read |
| `safety.noStableTraitClaim` | `boolean` | yes | Must remain `true` |
| `sourceRefs` | `string[]` | yes | Human-readable list of repo cues used |
| `ariaSummary` | `string` | yes | Text alternative for screen readers/export |

```ts
type AuraAnchor = {
  key: "projector" | "container" | "rim" | "residue";
  label: string;   // visible label can vary
  cue: string;     // concrete image cue
  effect: string;  // what the cue does
  x?: number;      // 0-100 normalized
  y?: number;
};
```

**CONFLICT TO FLAG:** this schema is sized for doc 04's medium-density plate (4 anchors, chips, reading, class label, full visual object). Per ground truth #3, if Aura becomes a THIN capstone (one band + one kind-word + one short verdict line, provenance pointing at `src.stance`), most of this schema is oversized: `anchors[]` (4 records) may be internal-only derivation scratch (never serialized to the shipped object), and `provenance` should point at `src.stance` per the Subtraction Gate's condition (a), which this schema does **not** currently have a field for — it has `sourceRefs` (cue list) and `safety.imageActBasis`, neither of which is the same as "provenance = stance." **This is a second, more granular instance of the same definition-size conflict — flag both together for O6/F1**, since the schema is the concrete artifact where the "thin capstone vs. medium plate" disagreement will actually have to be resolved (which fields ship vs. stay internal-derivation-only).

Also note: the mission ground truth requires **at least one authored null-relation sample** (condition b) and a **schema-constrained kind vocabulary** (condition c) — doc 04's schema has no `null`/no-relation state and no enum constraint on `classLabel` (it's typed as an open `string`). Both are gaps relative to ground truth, not necessarily errors in doc 04 (which predates the Subtraction Gate verdict) — flag as schema deltas to reconcile, not bugs.

---

## 5. Mapping method (mechanical → editorial → safety → visual pass)

Doc 04's four-pass pipeline, using existing fields as stable inputs (`markers`, `analysis`, `diagram.gesture`, `diagram.arrow`, `diagram.pressure`, `card.note`, `reads.charge`, `aura`, `sceneRole`, `halo`):

1. **Mechanical pass** — identify likely projector/container/rim/residue from source structure (machine-proposable).
2. **Editorial pass** — write the class label and one-sentence reading in Blue Room voice (human-authored).
3. **Safety pass** — verify the sentence names a read of the image-act, not a stable trait (gate).
4. **Visual pass** — render one dominant residue mark (per doc 02), not a syntax-heavy diagram.

This four-pass structure is **compatible** with mission ground truth #5 (authored-first: "machine proposes anchor evidence; a human writes the final Aura line") — doc 04 states this explicit rule verbatim: *"The algorithm should never generate the final sentence directly."* **This part of doc 04 survives cleanly and should carry forward unmodified.** It's also compatible with rule #3's operational four-zone filter (Record/Read/Reach/Ban) from docs 03/05 — doc 04's "safety pass" step is the natural slot where that filter would run, though doc 04 predates and does not name that filter explicitly (worth the synthesis noting doc 04's step 3 and docs 03/05's four-zone filter are the same gate, described independently — convergence, not conflict).

---

## 6. Visual grammar — [SUPERSEDED → doc 02 residue]

**Everything under doc 04's original "Visual grammar" section describing contour rings + vector + container band + rim line is SUPERSEDED by doc 02's residue directions (one-seam burn / ghost smear / off-center tension line) per explicit user direction, already flagged inline by doc 04's own author** (doc 04 contains a self-aware `> NOTE FOR THE BUILDER` at the top and a restated "superseded" note at the section head — doc 04 was written aware of this and structured to make the swap easy). Concretely superseded:

- [SUPERSEDED → doc 02 residue] The literal Field Map concept: contour rings + vector arrow + container band + rim line as the rendered SVG.
- [SUPERSEDED → doc 02 residue] The `visual.mode` schema field's original intended values (map-shaped) — **repoint to doc 02's seam/smear/tension vocabulary**, which doc 04 itself already does in the schema table above (S4 confirms doc 04 updated the schema field's description to say "see doc 02" — the schema row is NOT superseded, only the original map-rendering intent behind it was).

**What survives unchanged from doc 04 despite the map being killed** (doc 04's own framing, confirmed correct by S4):
- Semantic architecture (`.dplate--aura` / `.daura__*`, never `nth-of-type()`)
- Authored-first data model (schema + AuraAnchor, modulo the thin-vs-medium sizing conflict flagged above)
- Class-label + reading + chips copy structure
- Accessibility requirements
- File placement (data.js / app.js / styles.css / reveal/reading-panel.js)

Doc 04's retained repo-fit visual constraints (apply regardless of which visual renders):
- One restrained tint derived from source Halo material; otherwise warm-silver archive palette.
- Base strokes `var(--line-strong)`; active tint `color-mix(in srgb, var(--halo-a) 55%, var(--silver))`; residue fill 8–12% opacity.
- Inline SVG first (crisp scaling, text-addressable labels, tint substitution, single export path).

Doc 04's "avoid entirely" list (still valid, visual-implementation-agnostic — none of these entries are specific to the killed map, they're general Blue Room anti-patterns): neon glows/bloom halos, chakra rings/person-outline aura, rainbow gradients, dense topographic maps, heatmaps, sparkles/stars/particles, six-plus labels.

---

## 7. Plate layout table — [PARTIALLY SUPERSEDED, sizing conflict]

Doc 04 states Aura should be a **"medium-density plate"** with a two-column body grid:

| Zone | Recommendation |
|---|---|
| Plate title | Existing dossier title treatment |
| Body grid | `grid-template-columns: minmax(0, 1.05fr) minmax(340px, 0.95fr)` |
| Gap | 32px desktop, 20px narrower |
| Min height | 320px developed |
| Left line length | 34–42ch |
| Right visual frame | 16/10 or 4/3 |
| Class line | 14–16px serif or medium display |
| Reading line | 15–17px display serif, 1.45–1.55 line-height |
| Chip row | 3 chips max, mono, inline-flex wrap |

**[SUPERSEDED / FLAGGED]:** this two-column, 320px-min-height, dual-content (text column + full visual frame at 16/10 or 4/3 aspect) layout is sized for doc 04's medium-density plate concept. It directly conflicts with mission ground truth #3's "THIN synthesis-capstone (one band + one kind-word + one short verdict line), NOT a big plate." A one-band+one-word+one-line capstone almost certainly does NOT need a 320px-min-height two-column grid with a dedicated right-side visual frame at photo-like aspect ratios — that scale of layout reads as a "big plate" by the ground truth's own language. **Flag explicitly for O6/F1/whoever owns final layout:** doc 04's plate-layout table should likely be treated as a ceiling/legacy reference, not the target — the thin-capstone direction implies something closer to a single compact row or inline band, not a `.dplate__body` two-column module matching Surface Record's scale. The sample left-copy mockups below (section 8) are useful as **prose-voice reference** even if the surrounding layout shrinks dramatically.

---

## 8. SRC-01/02 copy mockups (voice reference, not final sizing)

**SRC-01:**
```
WARM REFUSAL

Reads as a stop-sign you end up trusting.
The hand takes the first hit; the cabin keeps the image human;
one cold strip at the glass keeps it open.

[front pressure] [warm hold] [cold exit]
```

**SRC-02:**
```
QUIET LABOUR

All function, no plea.
The frame drops its whole weight into the brace
and leaves the cold on your hands.

[task gravity] [held field] [low horizon]
```

These mockups are useful primarily as **voice/register calibration** (short, charged, image-directed, no named emotion, no resolved-feeling clause) — both pass the person-safety kill-list on inspection (no "which evokes/lands as," no named emotion word attached to a person, gestures described as image action: "the hand takes the first hit," "the frame drops its whole weight"). If the final Aura shrinks to a one-line capstone, these three-line mockups are themselves oversized and should be read as an upper bound on register, not a literal target length.

---

## 9. File-change table

| File | What to add | Why (doc 04's framing) |
|---|---|---|
| `data.js` | `auraField` objects per source | Keeps Aura content authored and source-specific |
| `app.js` | `renderAuraPlate()` and plate insertion | Dossier owns the canonical Aura plate |
| `styles.css` | `.dplate--aura`, `.daura__*` styling | Semantic styling avoids fragile positional selectors |
| `reveal/reading-panel.js` | reduced Aura capsule later | Optional follow-up once dossier version is stable |

S4 note: naming `auraField` in `data.js` should be checked against the existing `fitAura` key (section 1 above) to avoid confusable near-duplicate names in the same file — not a blocker, just a naming-hygiene flag for whoever implements.

---

## 10. Accessibility notes (unaffected by the map supersession — carry forward as-is)

- Aura's visual is a complex image; needs a full text equivalent nearby.
- Left text column = human-readable equivalent; right SVG wrapped in `role="img"` with `aria-label`/`aria-labelledby` pointing to the left-column summary.
- Non-text contrast 3:1 for graphical objects; 4.5:1 for normal text (matches mission ground truth #6 exactly).
- Motion optional/minimal; honor `prefers-reduced-motion`; freeze final state instantly.

These accessibility requirements are layout-size-agnostic — they apply whether Aura ships as a medium plate or a thin capstone, so none of this needs to wait on the definition-size conflict being resolved.

---

## 11. Testing checklist (carry forward, still valid post-supersession)

| Area | Check |
|---|---|
| Copy safety | Every Aura sentence passes: re-authorable cue, grammatical subject on image/read, no stable-trait residue |
| No duplication | Aura must not repeat left-panel Diagram labels verbatim; at least one visible phrase per source is a synthesized class/verdict |
| Surface separation | Aura does not repeat palette %, finish notes, or material claims owned by Surface Record |
| Oracle separation | Aura is not the final mic-drop line; Oracle remains the only verdict |
| Semantic styling | No `nth-of-type()` for Aura look; use `.dplate--aura` |
| Accessibility | Left text explains the visual; strokes meet contrast; SVG has accessible name; tint is never the only channel |
| Reduced motion | Aura fully understandable with animation removed |
| Source fidelity | SRC-01 reads warm/refusal/cold-edge; SRC-02 reads downward/held/low-horizon. If either could be swapped without feeling wrong, the system is too generic |

This checklist's "source fidelity" swap-test is functionally the same instrument as ground-truth rule #2's "swap test" from docs 03/05 — convergent, not duplicative; worth noting the two research threads independently proposed the same verification method.

---

## CONFLICTS (for O6/F1 — do not resolve here)

1. **Definition-size / density conflict (primary, as instructed):** Doc 04 defines Aura as a broad, five-verb "felt field" (presses/holds/leaks/cools/lingers) rendered as a **medium-density two-column plate** (320px min-height, dedicated visual frame, 4-anchor schema, chips + reading + class label). This conflicts with the mission's Subtraction Gate ground truth, which defines Aura's irreducible job narrowly as **the relation between two co-present elements**, shipped as a **THIN capstone: one ordinal band + one kind-word + one short verdict line**, provenance-linked to `src.stance`. These are not compatible defaults — someone must decide whether doc 04's plate scaffolding (layout table, schema breadth) is downsized to fit the capstone, or whether the capstone concept itself absorbs doc 04's richer visual/schema as an "expanded/developed" state. Doc 04 predates the Subtraction Gate verdict and cannot be assumed to already reflect it.

2. **Schema field gap:** doc 04's `auraField` schema has no field equivalent to "provenance = `src.stance`" (ground truth condition a) and no enum/constrained vocabulary for `classLabel` (condition c) or null-relation state (condition b). These are additions needed, not contradictions, but they touch the same schema doc 04 proposes, so should be reconciled together with conflict #1 rather than patched independently.

3. **Vocabulary re-casting need:** doc 04's editorial class labels (Warm Refusal, Quiet Labour, Cold Exit, Held Field) are contradiction/relation-shaped (good fit for Subtraction Gate's kind-word idea) but are NOT frame-geometry nouns as ground truth #3 requires (Standoff/Edge/Figure-Ground/Light-Fit/Vector-into-Void). Someone needs to decide whether doc 04's specific labels get retired in favor of the geometry-noun set, or whether the geometry-noun set is a category-header with doc 04's labels as sub-instances.

4. **Minor completeness correction (not a real conflict, but material):** doc 04 describes aura chips as present for "SRC-01 and SRC-02" as if that's the current extent of the raw material in `data.js`. In fact all five live sources (SRC-01 through SRC-05) already carry `aura: [...]` chip arrays. This doesn't change doc 04's recommendations, but whoever scopes the initial build should know the authored raw material already spans all five sources, not two.

5. **Naming collision risk (housekeeping, not a real conflict):** `data.js` already has an unrelated `fitAura` key (fit/variant-scoped). Introducing `auraField` per doc 04 is fine but should be double-checked for confusability during implementation — flagging so it isn't missed, not asking for a decision now.

---

## Anchors for re-grep (repo, line numbers will drift)

- `app.js` — grep `function renderDossier(src, treatment)` (dossier assembly); grep `BR-S115` (Aura-stub decision comment); grep `dplate("03", "Aura"` (current stub body); grep `dplate("02", "Archetype"` (sibling stub); grep `Fit \+ Aura` is NOT in app.js (only README) — app.js's stale plate-count comment is grep `(7 plates)` near top-of-file legend.
- `README.md` — grep `Fit \+ Aura` (stale seven-plate description).
- `data.js` — grep `aura:` (5 chip arrays, SRC-01..05); grep `fitAura` (separate, unrelated key — naming-collision flag).
- `reveal/reading-panel.js` — grep `warm glass copper` (current reveal placeholder capsule).


---

## S7 — DATA SCHEMA DRAFT (FINAL, post-supersede, post-boundary)

Role: draft the `data.js` `auraField` object literal per source, marrying S4's doc-04 structure to the Subtraction Gate spine (O2's boundary rulings + O4's copy system). This is a **schema + worked-entry proposal**, not an implementation — no repo files were touched (read-only per mission rule).

Repo grounding re-verified this session (fresh grep, not relying on S4/O2/O4's citations alone):
- `data.js` grep `aura:` — confirms 5 chip arrays exist (SRC-01..05), each `["Idle-Engine","Open-Palm","Northbound"]` shape — verbatim match to O2/O4.
- `data.js` grep `stance:` — confirms all 5 `stance` strings verbatim (SRC-01 line 269-270, SRC-02 line 456, SRC-03 line 589, SRC-04 line 721, SRC-05 line 854).
- `data.js` grep `frame.signature.band` — SRC-01 Charged, SRC-02 Strong, SRC-03 Strong, SRC-04 Charged, SRC-05 Charged. Matches O4's worked-read citations exactly.
- `data.js` grep `fitAura` (lines ~1075, 1105, 1136, 1165, 1195) — confirmed a **separate, unrelated** key exists in a different object family (the post-scan `tierOutputs`-adjacent block), each with its own `label`/fields tied to `sceneCharge`. This is NOT the same thing as the proposed `auraField`. Per O2/S4's naming-collision flag, I've named the new key `auraField` (not `aura` — that's the existing chip array — and not `fitAura`) to keep all three visually and grep-distinct.
- `app.js` grep `dplate("03", "Aura"` — confirms the live stub this schema targets (currently renders only `<p class="dstat__undeveloped">Aura read — reserved. Develops in a later pass.</p>`, gated `BR-S115`).
- `app.js` grep `function tierBand` (app.js:61) — confirms the live ladder is `Muted < 25, Clean 25-47, Strong 48-65, Charged 66-82, Peak 83+`, band words only, no public 0-100. `auraField.tier` reuses these five words verbatim — no new ladder invented.

---

### Design decisions this draft locks in (synthesizing S4 + O2 + O4, nothing new asserted)

1. **One key only: `auraField`.** Not `aura` (taken — the raw chip array, kept as-is, becomes an INPUT the human author may consult, never a rendered field of `auraField`), not `fitAura` (unrelated existing key). `auraField` sits as a sibling to `frame`, `dossier`, `card`, `reads`, `halo`, etc. on each source object.
2. **`kind` is a closed enum of 5 frame-geometry nouns** (O2 ruling + O4 Tier-A): `"Standoff" | "Edge" | "Figure-Ground" | "Light-Fit" | "Vector-into-Void" | null`. `null` is legal — the falsifiability condition (S4/O4 conflict #5, mission condition b).
3. **`classLine` is the ONE rendered kind-word/title** (O2 ruling (c): classLabel and kind-word collapse into ONE thing). It is the Tier-B authored contradiction pair (e.g. "Warm Refusal"), not a second field alongside `kind` — `kind` is the schema-locked enum backstage, `classLine` is what a human reads. No `chips[]` field ships (O2 ruling (a) — `aura[]` verbatim chip-row is KILLED, BR-S109 law).
4. **`tier` reuses the live ladder word**, stored redundantly as a string (not computed) because this is hand-authored, never scored (matches `frame.signature.band`'s own convention — a hand-set word, not a live function call, per data.js's "Hand-authored, never computed" comment at data.js:165-166).
5. **`verdictLine` is the one authored sentence** (O4 §b spec). Stored as plain string, authored-first, no template.
6. **`anchors[]` survives as INTERNAL DERIVATION SCRATCH only** — per S4's flagged schema-size conflict, resolved here by keeping a *trimmed* 2–4 entry array (projector/container/rim/residue) but documenting inline that it is machine-proposable evidence, NOT independently rendered — only `classLine`/`verdictLine`/`visual` reach the DOM. This satisfies ground-truth #5 (machine proposes anchor evidence; human writes the line) while not shipping a second plate's worth of prose.
7. **`visual.mode` is constrained to `"seam" | "smear" | "tension" | "type"`** per doc 02 (never doc 04's original map values) — S4 already confirmed doc 04's own schema table repoints here.
8. **`provenance.stanceRef: true` + `provenance.sourceRefs: []`** — satisfies mission condition (a): provenance points at `src.stance`, not a redundant invented field. `sourceRefs` is a human-readable list of the *other* cues consulted (aura chips, event label, field conjunction) for QA/audit trail only, never rendered as a chip row.
9. **`safety.imageActBasis[]` + `safety.noStableTraitClaim: true`** carried forward verbatim from doc 04 (S4 confirmed these survive unmodified).
10. **`ariaSummary`** — one plain-text sentence for `role="img"` SVG accessibility (doc 04 §10, unaffected by map supersession).
11. **SRC-04/SRC-05 stubs additionally carry a `TODO_conjunctionOnly` comment** naming the exact `field.weight` string that must NOT be re-narrated (O2 ruling (b)), so the eventual human author has the guardrail inline rather than needing to re-find O2's ruling.
12. **The NULL-RELATION example is a new, invented 6th illustrative entry** (not one of the 5 real sources — none of the 5 authored stances is relation-free per O1/O4's own finding), clearly marked as a schema-demonstration fixture, not a live source.

---

### The type shape (for reference — repo has no TS, this is documentation-only, matching how S4 presented `AuraAnchor`)

```
auraField: {
  kind: "Standoff" | "Edge" | "Figure-Ground" | "Light-Fit" | "Vector-into-Void" | null,
  classLine: string | null,      // the ONE rendered title, e.g. "Warm Refusal" — null iff kind is null
  tier: "Muted" | "Clean" | "Strong" | "Charged" | "Peak" | null,
  verdictLine: string | null,    // the one authored sentence — null iff kind is null
  anchors: [                     // 2-4 entries, INTERNAL DERIVATION ONLY — never rendered verbatim
    { key: "projector"|"container"|"rim"|"residue", cue: string, effect: string, x?: number, y?: number }
  ],
  visual: { mode: "seam" | "smear" | "tension" | "type" | null, tint: string }, // tint usually src.halo.a
  safety: { imageActBasis: string[], noStableTraitClaim: true },
  provenance: { stanceRef: true, sourceRefs: string[] },
  ariaSummary: string | null,
}
```

---

### FULL DRAFT — `data.js` object literals (plain JS, matching repo comment/quote conventions)

```js
/* ---- auraField (BR-S1xx, DRAFT — not yet wired to renderDossier) ------------
   Thin synthesis-capstone per Subtraction Gate verdict: ONE relation-kind word
   (schema-locked frame-geometry noun, backstage) + ONE authored class line (the
   only rendered title) + ONE tier word (reuses the live Muted..Peak ladder,
   tierBand() app.js:61 — hand-set here, never computed, matching frame.signature's
   own convention) + ONE verdict line. Provenance points at THIS source's own
   `stance` string — never a new relation-prose field. `anchors[]` is machine-
   proposable derivation scratch (doc 04 S4/O2), NOT independently rendered — only
   classLine/verdictLine/visual reach the DOM. `aura[]` (the existing chip array
   above) is candidate INPUT ore for the human author, never re-rendered here —
   the 3-chip tag-row form is KILLED (BR-S109, "a CODE reads as FILING"). Do not
   confuse this key with the unrelated `fitAura` object (fit/variant-scoped,
   defined later in this file near tierOutputs) — different concept, kept
   deliberately distinct in name. */

// ---- SRC-01 (Checkpoint Wave / "Open-Window Operator") — FULLY POPULATED reference entry
auraField: {
  kind: "Edge", // warm cabin interior meets the cold fjord window seam
  classLine: "Warm Refusal",
  tier: "Charged", // mirrors frame.signature.band (data.js:173) — same hand-set word, not recomputed
  verdictLine: "The palm holds you at the glass; the cabin keeps the warmth behind it.",
  anchors: [
    { key: "projector", cue: "raised flat palm, five-spread, dead-on to lens", effect: "sends the read outward, first point of contact" },
    { key: "container", cue: "cabin roof-line + seat + wheel", effect: "holds the frame in warm interior register" },
    { key: "rim", cue: "fjord window band, right third", effect: "the one cold edge the field opens onto" },
    { key: "residue", cue: "palm-silhouette lingering over the glass strip", effect: "what's left once the stop-gesture is read" },
  ],
  visual: { mode: "seam", tint: "var(--halo-a)" }, // src.halo.a = "#c98a5e" (Warm Glass Copper)
  safety: {
    imageActBasis: ["raised palm (performed gesture-intent, RULE 0's one allowance)", "window-band crop"],
    noStableTraitClaim: true,
  },
  provenance: {
    stanceRef: true, // src.stance: "One arm holding the wheel's territory, the other raised flat to the
                      // lens — half stop-sign, half salute... neither departing nor stationary."
    sourceRefs: ["stance", "frame.event.label: Raised palm", "aura[]: Idle-Engine/Open-Palm/Northbound (input only, not rendered)"],
  },
  ariaSummary: "Aura reading: Edge, tier Charged, class Warm Refusal. The raised palm holds the viewer at the glass while the cabin keeps its warmth behind that seam.",
},

// ---- SRC-02 (Two Feet of Quiet / "Frost Surveyor") — FULLY POPULATED reference entry
auraField: {
  kind: "Figure-Ground", // crouched body reads as function inside a dominating white field
  classLine: "Quiet Labour",
  tier: "Strong", // mirrors frame.signature.band (data.js:363)
  verdictLine: "The body bends into the task, not toward the lens; the ice keeps the rest.",
  anchors: [
    { key: "projector", cue: "crouched brace, gloves stacked, gaze on task not lens", effect: "sends a work-read, not an address-read" },
    { key: "container", cue: "snow plane, three quarters of frame", effect: "the field that receives and grounds the whole mass" },
    { key: "rim", cue: "birch treeline, upper quarter, one clean band", effect: "the horizon that closes the field off from above" },
    { key: "residue", cue: "auger's hard diagonal into the ice", effect: "the one line the subject actively drew inside the field" },
  ],
  visual: { mode: "tension", tint: "var(--halo-a)" }, // src.halo.a = "#5fd4e0" (Cold Prism Frost)
  safety: {
    imageActBasis: ["crouched brace + gaze redirected to task (re-authorable posture/gaze cue)", "auger tool-axis"],
    noStableTraitClaim: true,
  },
  provenance: {
    stanceRef: true, // src.stance: "Crouched at full commitment, both gloves stacked on the brace...
                      // Nothing performed — the auger doesn't care, and the frame doesn't pretend otherwise."
    sourceRefs: ["stance", "frame.event.label: Crouched brace", "aura[]: Auger-Braced/Sun-Struck/Low-Horizon (input only, not rendered)"],
  },
  ariaSummary: "Aura reading: Figure-Ground, tier Strong, class Quiet Labour. The crouched figure bends into its task rather than the lens, and the surrounding ice field keeps everything else.",
},

// ---- SRC-03 (Field Dispatch) — STUB, TODO
auraField: {
  kind: null, // TODO: candidate Standoff — the horizontal catch vs. vertical torso hold the frame in
              // opposition (O2 table #10 area; not yet human-ruled). Do not ship a kind without an
              // authored verdictLine to match — both land together or not at all.
  classLine: null, // TODO: candidates from O4 worked read — "Flat Witness" / "Plain Record" — UNCONFIRMED,
                    // needs a human author pass, not auto-promoted from research docs.
  tier: null, // TODO: frame.signature.band for this source is "Strong" (data.js:533) — likely tier once
              // kind/classLine are authored, but not set here pre-authorship (avoid a tier with no class).
  verdictLine: null, // TODO: draft candidate for author's consideration only, NOT pre-shipped —
                      // "The catch states the terms; the shore does the staging." (10 words, verb-hidden,
                      // sourced directly from this source's own stance clause below) — needs a human sign-off.
  anchors: [
    // TODO: mechanical pass not yet run. Candidate cues from stance/analysis: transverse hold (catch
    // perpendicular to camera axis), shore-as-field-document framing. Populate projector/container/
    // rim/residue once a human author confirms the kind.
  ],
  visual: { mode: null, tint: "var(--halo-a)" }, // TODO: mode candidate "tension" (Standoff pairs pair with
                                                   // tension-line residue per doc 02) — not confirmed.
  safety: {
    imageActBasis: [], // TODO: populate once verdictLine is authored and safety-gated (re-authorable cue,
                        // image-act grammatical subject, connotation-strip, swap test, two-second test).
    noStableTraitClaim: true,
  },
  provenance: {
    stanceRef: true, // src.stance: "Transverse hold, catch presented perpendicular to the camera axis. The
                      // frame stays a field document — the shore does the staging, the catch states the terms."
    sourceRefs: ["stance", "frame.event.label: Transverse hold filed", "aura[]: Lateral/Dispatched/Shore-Filed (input only)"],
  },
  ariaSummary: null, // TODO: author only after classLine/verdictLine are final.
},

// ---- SRC-04 (Closing Distance) — STUB, TODO, Comp-Field-overlap guardrail inline
auraField: {
  kind: null, // TODO: candidate Vector-into-Void per O2 ruling (b) — the stride fires lens-direct,
              // corridor holds it. CONJUNCTION ONLY: read (stride-vector) AGAINST (corridor/enclosure),
              // never restate frame.field.weight below verbatim.
  classLine: null, // TODO: candidates — "Lens-Direct Break" / "Open Reach" — UNCONFIRMED, human pass required.
  tier: null, // TODO: frame.signature.band for this source is "Charged" (data.js:665).
  verdictLine: null, // TODO: draft candidate for author's consideration only —
                      // "The stride breaks forward into the lens; the corridor holds it a beat before
                      // contact." (14 words) — needs human sign-off, especially against guardrail below.
  anchors: [
    // TODO: mechanical pass not yet run.
  ],
  visual: { mode: null, tint: "var(--halo-a)" }, // TODO: candidate "smear" (directional vector residue).
  safety: {
    imageActBasis: [],
    noStableTraitClaim: true,
  },
  provenance: {
    stanceRef: true, // src.stance: "Mid-stride foreground break, lens-direct approach, four limbs extended
                      // at peak. The path wedge and grass-bank enclosure hold the action in a corridor."
    sourceRefs: ["stance", "frame.event? (no explicit event.label on this source — verify)", "aura[]: Approach/Channel/Diffuse (input only)"],
  },
  ariaSummary: null, // TODO
  // GUARDRAIL (O2 ruling b, do not remove when authoring): frame.field.weight for this source =
  // "Upper centre — foreground mass arriving into the lens" (data.js:666). This is OWNED by Metrics'
  // Composition Field plate. The auraField verdictLine must read the CONJUNCTION (vector vs. corridor),
  // and must NOT survive if you delete the Composition Field plate and re-read it as a lone caption to
  // "foreground mass arriving into the lens." Test before shipping.
},

// ---- SRC-05 (Spiny Encounter) — STUB, TODO, Comp-Field-overlap guardrail inline
auraField: {
  kind: null, // TODO: candidate Light-Fit per O2 ruling (b) — hard fluorescent illuminant governs a body
              // not designed for it. CONJUNCTION ONLY: read (illuminant) AGAINST (surface/specimen),
              // never restate frame.field.weight below verbatim, and never restate Finish/Surface's
              // material read (that plate owns palette/material, not Aura).
  classLine: null, // TODO: candidates — "Borrowed Light" / "Hard Housing" — UNCONFIRMED, human pass required.
  tier: null, // TODO: frame.signature.band for this source is "Charged" (data.js:798).
  verdictLine: null, // TODO: draft candidate for author's consideration only —
                      // "The shell is lifted into a light that was never its own." (single beat, embedded
                      // turn) — CAUTION: cross-check against this source's own oracle line below before
                      // shipping, Aura must stay dryer/shorter than Oracle, never restate its wit.
  anchors: [
    // TODO: mechanical pass not yet run.
  ],
  visual: { mode: null, tint: "var(--halo-a)" }, // TODO: candidate "seam" or "smear" (illuminant-edge residue).
  safety: {
    imageActBasis: [],
    noStableTraitClaim: true,
  },
  provenance: {
    stanceRef: true, // src.stance: "Vertical cradle, specimen face-forward, antennae extended upper-left.
                      // The frame organizes around the held armature, lifted into house light."
    sourceRefs: ["stance", "frame.event.label? (verify)", "aura[]: Carapace/Fluorescent/Cyan-Tank (input only)"],
  },
  ariaSummary: null, // TODO
  // GUARDRAIL (O2 ruling b): frame.field.weight for this source = "Near centre — pulled slightly down
  // by the tank-blue band" (data.js:799). OWNED by Composition Field — do not restate. Also do not
  // restate the material/finish read (Surface Record + standalone Finish module own palette/material,
  // BR-S115) — Aura's lane here is the illuminant-vs-surface CONJUNCTION only, not a second material caption.
},

// ---- NULL-RELATION EXAMPLE (illustrative fixture, NOT one of the 5 live sources — demonstrates the
// falsifiability condition: a lone-element/no-staged-relation frame legitimately renders a null band.
// None of SRC-01..05's authored stances are relation-free (O1/O4 finding), so this is a synthetic
// stand-in for whichever future source has, e.g., a single centered subject against a plain seamless
// backdrop with no second co-present term to stage a relation against.)
auraField: {
  kind: null, // no second co-present element for the frame to stage a relation against — legitimately null,
              // not an unauthored gap. Distinguish from the SRC-03/04/05 stubs above (those are null
              // because authorship hasn't happened yet; this is null because there IS no relation to name).
  classLine: null, // no class line ships when kind is null — never invent a relation to fill the field.
  tier: "Muted", // or "Clean" — a null-relation frame sits at the low end of the ladder by construction,
                 // since there is no staged tension to rank upward. Hand-set per source once real, not derived.
  verdictLine: "Two elements, no edge between them; the frame files them side by side.",
  // ^ O4's proposed null-copy shape (O4 §CONFLICTS #5), reproduced verbatim as the house pattern: states
  // the ABSENCE of relation in frame terms, never invents one. This is the falsifiability proof — if the
  // schema can only ever populate kind/classLine, the band isn't really ranking anything.
  anchors: [
    { key: "projector", cue: "(example) centered subject, plain seamless backdrop", effect: "sends a single, uncontested read" },
  ],
  visual: { mode: "type", tint: "var(--silver)" }, // "type" mode = plain text-set state, no residue mark
                                                     // drawn when there's no relation to render a mark for.
  safety: {
    imageActBasis: ["(example) single subject framing, no second element"],
    noStableTraitClaim: true,
  },
  provenance: {
    stanceRef: true, // this fixture assumes a stance string that itself asserts no relation, e.g. a
                      // hypothetical "Centered, alone in frame — nothing else present to answer it."
    sourceRefs: ["stance (hypothetical null-relation source)"],
  },
  ariaSummary: "Aura reading: no staged relation. Tier Muted. The frame presents its elements side by side without naming a tension between them.",
},
```

---

### Notes on what did NOT make it into the shipped schema (and why — cross-referencing S4/O2/O4)

- **No `chips[]` field.** Doc 04 proposed one; O2 ruling (a) kills any rendered chip-row (BR-S109 law: "a CODE reads as FILING"). The existing `aura: [...]` array one level up is left completely untouched by this schema — it remains raw input ore, not a field of `auraField`.
- **No separate `classLabel` distinct from a kind-word.** O2 ruling (c) collapses these to one — `classLine` here IS that single merged field, geometry-constrained via its paired backstage `kind` enum.
- **No `x`/`y` coordinates on the shipped anchors in the two reference entries above** — kept optional per S4's original `AuraAnchor` type, but since `anchors[]` is now internal-derivation-only (never independently rendered as a positioned map), I omitted coordinates entirely in the worked SRC-01/02 entries to avoid implying a map is drawn from them. If a future visual implementation needs positioning for the residue mark, that's a `visual`-only concern (mode + tint), not an anchor-coordinate concern — flagging this as a divergence from S4's literal type in case O6/F1 wants coordinates preserved for some other reason.
- **No plate-layout fields** (no `chips: 3 max`, no aspect-ratio, no grid-column spec) — those are `styles.css`/`app.js` rendering concerns per the thin-capstone ruling, not `data.js` schema concerns. This draft is data-only, as scoped.
- **`tier` and `kind` are independently nullable but co-required** — the schema comment states they land together or not at all (a `classLine` with no `kind`, or a `tier` with no `classLine`, would be an inconsistent authored state). This isn't enforced in code (plain JS, no validation layer exists anywhere in this repo's data.js), so it's a documented authoring discipline, not a runtime guarantee — flagging that gap explicitly rather than silently assuming enforcement.

---

## CONFLICTS (for O6/F1 — not resolved here, forwarded as required)

1. **Carried from S4/O2: doc 04's original 4-field-anchor schema vs. thin-capstone sizing.** My resolution — keep `anchors[]` but demote it to internal-derivation-only, never rendered — is a specific implementation of the conflict's likely resolution, but it is still a judgment call, not something O2/O4 explicitly ratified at the field level. O6/F1 should confirm that `anchors[]` shipping in `data.js` (even if `app.js` never reads it into the DOM) is acceptable, versus the alternative of not persisting it in `data.js` at all and treating it as ephemeral authoring scratch outside the shipped file entirely.
2. **`classLine` naming.** I chose `classLine` (not `classLabel`, not `kindWord`) to avoid implying it's the same shape as doc 04's killed multi-chip `classLabel` while still reading clearly as "the one line that names the class." If O6/F1 prefer a different field name, this is a pure rename, no structural change.
3. **SRC-03/04/05's `frame.event.label` presence unverified in this pass.** I flagged "verify" inline on SRC-04/SRC-05's `sourceRefs` TODO because I did not re-grep every `event:` block for those three sources individually this session (only SRC-01/02/03's `frame.event.label` values were directly confirmed: Raised palm, Crouched brace; SRC-03 O2 cites "Transverse hold filed" but I did not independently re-verify SRC-04/05's event labels against O2's claims of "Lens-direct stride" / "Shell lifted" in this session — those are carried from O2's report, not fresh-grepped by S7). This is a data-completeness flag for whoever finalizes the stubs, not a contradiction.
4. **The null-relation fixture is invented, not sourced from a real future SRC-06+.** I built it strictly to satisfy the falsifiability condition (mission condition b) using O4's own proposed null-copy language verbatim. If a real 6th source is added later with an actual null relation, this fixture should be replaced/reconciled with the real entry, not kept as permanent placeholder data.

---

## Anchors for re-grep (repo, line numbers will drift)

- `data.js` — grep `aura:` (5 existing chip arrays, kept as-is, untouched by this schema); grep `stance:` (provenance source, all 5 verbatim strings quoted above); grep `fitAura` (separate unrelated key, confirmed distinct); grep `frame.signature.band` region / grep `band: "Charged"` etc. (tier source values); grep `field: { node:` (the two Composition-Field guardrail strings quoted verbatim on SRC-04/SRC-05 stubs).
- `app.js` — grep `dplate("03", "Aura"` (current stub this schema targets); grep `function tierBand` (the live 5-word ladder this schema's `tier` field reuses verbatim, no new ladder).
- `docs/FILE_MAP.md` — grep `data.js.*ALL content` (confirms data.js is the correct/only file for this content per repo's own routing table).


---


# S8 — RENDER/CSS GUIDANCE DRAFT (Aura: `.dplate--aura`)

**Scope:** the semantic render/CSS layer that would implement O5's residue-visual ruling + S4's normalized doc-04 schema + O1's repo ground truth, IF Aura is built. Read-only — no files touched, no code shipped. Everything below is a **draft sketch for review**, not a patch. All CSS variable names, function signatures, and class names are verified live against the repo (see anchors). Judged against: *Aura reads what the image does — charged, terse, verdict-shaped — without diagnosing the person and without becoming a second Diagram/Surface/Metrics/Oracle.*

---

## 0. Repo facts this draft is built on (re-verified, not inherited on faith)

- `dplate(no, title, paid, body, extraClass = "")` — the plate helper (`app.js` grep `function dplate`) returns exactly:
  ```html
  <section class="dplate ${extraClass}">
    <span class="dplate__spine" aria-hidden="true">${no}</span>
    <div class="dplate__body">
      <header class="dplate__head"><h3 class="dplate__title">${esc(title)}</h3><span class="dplate__rule"></span></header>
      ${body}
    </div>
  </section>
  ```
  Aura would call `dplate("03", "Aura", paid, auraBody, "dplate--aura")` — the `extraClass` slot already exists and is exactly how `.dplate--mint` / `.dplate--oracle` are wired today (`app.js` grep `dplate("04", "Mint Record", paid, mintBody, "dplate--mint")`). **No new plumbing needed for the modifier class itself.**
- Live stub to replace: `app.js` grep `03 — Aura (BR-S115` → `dplate("03", "Aura", paid, '<p class="dstat__undeveloped">Aura read — reserved. Develops in a later pass.</p>')`.
- **`.dplate--aura` and `.daura__*` do not exist in `styles.css` today.** Confirmed by grep — only `.dplate--mint` (styles.css:2622) and `.dplate--oracle` (styles.css:2665) exist as plate modifiers. This draft proposes the third.
- **`metTier(name, tier, mat)`** (app.js:363-367) is the exact reusable band function:
  ```js
  function metTier(name, tier, mat) {
    const fill = MET_TIER_FILL[tier] || 3;
    const segs = Array.from({ length: 5 }, (_, i) =>
      `<span class="met-tier__seg" style="${i < fill ? `background:${metRgba(mat, 0.85)};` : ""}"></span>`
    ).join("");
    return `<div class="met-tier"><div class="met-tier__top"><span class="met-tier__n">${esc(name)}</span><span class="met-tier__v" style="color:${metMatText(mat)};">${esc(tier)}</span></div><div class="met-tier__meter">${segs}</div></div>`;
  }
  ```
  `MET_TIER_FILL = { Peak: 5, Charged: 4, Strong: 3, Clean: 2, Muted: 1 }` (app.js:345). `metRgba(hex, a)` → rgba string (app.js:346-348). `metMatText(mat)` → `` color-mix(in srgb, ${mat} 72%, var(--silver)) `` (app.js:350). CSS: `.met-tier__seg { flex: 1; height: 5px; border-radius: 99px; background: rgba(177, 173, 164, 0.12); }` (styles.css:2028) — the unfilled-segment track color.
- **Metrics renders THREE `metTier` calls per plate inside `.met-bands`** (app.js:442, 455 — `met-bands` wraps `Drift/Clarity/Depth` and `Legibility/Charge/Containment`). Per O5 §4 rule 1: **Aura renders exactly ONE `metTier` call, never wrapped in `.met-bands`.** Wrapping it in that class would visually and semantically re-declare it as a Metrics instrument.
- **`--halo-a` is already plumbed onto the render root** (app.js:559, 2352, 2424: `style="--halo-a:${esc(src.halo.a)}; --halo-b:${esc(src.halo.b)}; --halo-c:${esc(src.halo.c)};"`, and `document.body.style.setProperty("--halo-a", src.halo.a)` at app.js:2498/2568). **No new color plumbing required** — Aura reuses the existing cascade.
- **Confirmed variables to build against** (styles.css):
  - `--silver: #c8c4bb` (styles.css:36)
  - `--silver-bright: var(--t-display)` → `#e9e5dc` (styles.css:37,14)
  - `--silver-dim: var(--t-meta)` → `#948f87` (styles.css:38,15)
  - `--line: rgba(233,229,220,0.12)`, `--line-faint: rgba(233,229,220,0.07)`, `--line-strong: rgba(233,229,220,0.2)` (styles.css:31-33)
  - `--violet: #8b7bff`, `--cyan: #5fd4e0` (styles.css:49-50) — matches O5's cited `halo.b` cool-violet register
  - `--ink-950: #0a0b0d` (styles.css:26) — **the actual "near-black field" variable.** Neither O5 nor the mission brief's literal `--bg` exists in the repo; `--ink-950` (plus the body radial-gradient at styles.css:76 mixing `--ink-900`/`--ink-950`) is the true black-field token. **Correction flagged: cite `--ink-950`, not `--bg`, in any build.**
  - `--r-plate: 4px` (styles.css:44) — the plate corner radius, for consistency if the SVG frame gets a border-radius clip.
  - `color-mix(in srgb, X Y%, Z)` is the established repo idiom (styles.css:739, 1097-1098, 1109, 1113-1118, 1125-1132, 1800-1803) — O5's `color-mix(in srgb, var(--halo-a) 55%, var(--silver))` recipe matches house syntax exactly.
- **`prefers-reduced-motion` pattern** (styles.css:3580-3595): the repo's existing convention is `animation: none !important` / `transition: none !important` on named classes inside one consolidated `@media (prefers-reduced-motion: reduce)` block near the end of the file, e.g. `.card, .fr__pip, .photo__shimmer, .card__sparkles, .card__halo { animation: none !important; }`. Aura's reduced-motion rule should append to this **same existing block**, not open a new media query elsewhere.
- **Accessible-SVG pattern already in house style** is `role="img" aria-label="..."` directly on the `<svg>` (app.js:636, 1816: `<svg class="cardqr__code" ... role="img" aria-label="Card scan code (placeholder)">`, `<svg class="vqr__svg" ... role="img" aria-label="Mint access code (placeholder)">`). **The repo does not use `aria-labelledby` anywhere for SVG.** Doc 04 §10 / O5 §7 propose `aria-labelledby` pointing at the left-column summary — that's a reasonable idea but it would be a **new accessibility pattern for this codebase**, not a reuse of an existing one. Flagging so the choice is made deliberately: either (a) follow house convention with a direct `aria-label` string built from the authored line, or (b) introduce `aria-labelledby` as this repo's first instance of it. I recommend (a) for consistency unless O6/F1 wants to standardize on (b) repo-wide.
- **The killed `.dfitaura` CSS still physically exists in styles.css** (styles.css: "05 — fit + aura" comment, `.dfitaura`, `.dfitaura__col`, `.dfitaura__stance`, `.dfitaura__fit`, `.dfitaura--tease`) even though the plate was killed (BR-S109, O1 §c.7). **Do not reuse `.dfitaura*` classes or its two-column `1.1fr 1fr` grid pattern for Aura** — that is the exact killed tag-row/two-column form. If dead CSS cleanup is ever scoped, this block is a candidate, but that is out of S8's scope (read-only, no mutating action).
- **Positional-selector bug confirmed** (styles.css:2355-2371): `.dossier__inner .dplate:nth-of-type(1)`, `nth-of-type(4)`, `nth-of-type(6)`, `nth-of-type(7)` still exist and reference plate positions from the old 7-plate stack; with 5 live plates today, `nth-of-type(4)` now lands on Mint Record, not the originally-intended plate. This is direct, already-broken evidence for ground truth #6 — **Aura must not add any new `nth-of-type()` dependency**, and ideally this existing breakage is migrated to semantic modifiers in a future pass (flagged, not S8's job to fix).

---

## 1. `.dplate--aura` plate structure (inside the `dplate()` convention)

```js
// app.js — replacing the BR-S115 stub, illustrative only, NOT shipped by this agent
const aura = dplate("03", "Aura", paid, renderAuraBody(src), "dplate--aura");
```

`renderAuraBody(src)` (name illustrative) would emit, inside the existing `.dplate__body` slot `dplate()` already provides:

```html
<div class="daura">
  <div class="daura__mark-wrap">
    <svg class="daura__mark" viewBox="0 0 240 160" role="img" aria-label="${escapedAuthoredLine}">
      <!-- mode-specific residue graphic: seam | smear | tension (see §2) -->
    </svg>
  </div>
  <div class="daura__read">
    <div class="daura__kind">${esc(kindWord)}</div>
    ${metTier("Aura", tierWord, src.halo.a)}
    <p class="daura__line">${esc(authoredLine)}</p>
  </div>
</div>
```

Notes on this structure:
- **`.daura` is a single-column stack**, not a two-column grid — this is the concrete rejection of doc 04's `minmax(0,1.05fr) minmax(340px,0.95fr)` two-column layout (S4 §7 conflict), consistent with ground truth #3's "thin synthesis-capstone, not a big plate." The mark sits above, the read sits below — one vertical read order, matching the 80/20 mark-then-text sequence O5 specifies (§2 below).
- **No min-height: 320px, no 16/10 photo-aspect frame.** The SVG viewBox above (`240×160`, a wide low band) is illustrative of a *thin strip*, not a photo-sized panel. Actual dimensions are O6/F1's call (flagged already by O5 CONFLICT 4 / S4 CONFLICT 1) — this draft assumes the capstone reading wins, and sizes accordingly, but the CSS below uses relative units so it isn't locked to one pixel value.
- **`metTier("Aura", tierWord, src.halo.a)` is called exactly once** — reusing the existing function verbatim, no fork, no new band component. `tierWord` is the source's `event.charge` (`data.js` grep `event:` → `charge: "Charged"` etc., verified live for all 5 sources — see §0 data anchors) or `signature.band`, per ground truth #3 condition (a): no new invented score.

---

## 2. `.daura__*` class map

| Class | Role | CSS approach |
|---|---|---|
| `.daura` | outer stack (mark → band → line) | `display:grid; gap:` house rhythm; single column |
| `.daura__mark-wrap` | SVG frame/mount, black-field container | `background:` derived from `--ink-950`, houses the residue SVG |
| `.daura__mark` | the residue SVG itself | `width:100%; height:auto;` no fixed aspect lock — mode-dependent internal viewBox |
| `.daura__kind` | the schema-constrained kind-word (Standoff/Edge/Figure-Ground/Light-Fit/Vector-into-Void) | reuses `.met-tier__n`-style mono kicker treatment — small, uppercase, letter-spaced, `--t-ghost` |
| *(reused, not new)* `.met-tier`, `.met-tier__top`, `.met-tier__n`, `.met-tier__v`, `.met-tier__meter`, `.met-tier__seg` | the ONE ordinal band | verbatim reuse of app.js `metTier()` output + existing styles.css rules — **zero new CSS needed for the band itself** |
| `.daura__line` | the authored verdict line (subordinate witness, not headline) | display-serif body text, sized below `.dplate__title` but above `.dstat__undeveloped` — a real sentence, not italic-meta |
| `.daura__mark--seam` / `.daura__mark--smear` / `.daura__mark--tension` | mode modifier on `.daura__mark`, selects which internal `<g>`/paths are visible/styled | class-based mode switch — **never positional** |
| `.daura__anchor` | decorative anchor dots (tension-line mode only) | `aria-hidden="true"`, `fill: var(--line-strong)` |
| `.daura__rim` | the thin cold/warm exit edge shared across all 3 modes | `stroke` tinted via `--daura-tint-cold` (see §3) |

No `nth-of-type()` anywhere in this map — every state is a class, matching ground truth #6 and directly fixing the failure pattern O1 found at styles.css:2355-2371.

---

## 3. Residue SVG hooks — inline-SVG-first, tint via `color-mix`

Per O5 §0 ruling: **off-center tension line is the DEFAULT mode; seam and smear are per-source alternates; type-burn is reserved and unbuilt.** This draft implements all three shipping modes as one SVG template with mode-scoped `<g>` blocks, toggled by the `.daura__mark--*` modifier class (CSS `display: none` / `display: block` per mode) — **one component, three faces**, not three separate templates, so future sources can be reassigned mode without a new build.

```css
/* --- .daura tint plumbing — derives from the EXISTING --halo-a cascade, no new color pipeline --- */
.daura {
  --daura-tint: color-mix(in srgb, var(--halo-a) 55%, var(--silver));
  --daura-tint-cold: color-mix(in srgb, var(--halo-b, var(--violet)) 40%, var(--silver-dim));
}

.daura__mark-wrap {
  background: var(--ink-950);
  border: 1px solid var(--line-faint);
  border-radius: var(--r-plate);
  padding: 18px 20px;
}

.daura__mark { width: 100%; height: auto; display: block; }

/* mode visibility — class-driven, never nth-of-type */
.daura__mark .daura__g-tension,
.daura__mark .daura__g-seam,
.daura__mark .daura__g-smear { display: none; }
.daura__mark--tension .daura__g-tension { display: block; }
.daura__mark--seam .daura__g-seam { display: block; }
.daura__mark--smear .daura__g-smear { display: block; }

/* shared stroke/fill discipline (O5 §3, §5) */
.daura__anchor { fill: var(--line-strong); }
.daura__filament, .daura__seam-line { stroke: var(--daura-tint); stroke-width: 2; fill: none; }
.daura__rim { stroke: var(--daura-tint-cold); stroke-width: 1; fill: none; }
.daura__bleed { fill: var(--daura-tint); opacity: .1; } /* 8-12% ceiling, O5 §3 */
```

```html
<!-- illustrative single-template sketch; mode class set server-side per source -->
<svg class="daura__mark daura__mark--tension" viewBox="0 0 240 100" role="img" aria-label="${escapedAuthoredLine}">
  <!-- TENSION (default): two anchors + one biased filament -->
  <g class="daura__g-tension">
    <circle class="daura__anchor" cx="30"  cy="50" r="2.5" aria-hidden="true"/>
    <circle class="daura__anchor" cx="210" cy="50" r="2.5" aria-hidden="true"/>
    <path class="daura__filament" d="M30,50 Q135,${50 + biasY} 210,50" aria-hidden="true"/>
  </g>
  <!-- SEAM (alternate: threshold) -->
  <g class="daura__g-seam">
    <rect class="daura__bleed" x="${seamX-14}" y="0" width="14" height="100" aria-hidden="true"/>
    <line class="daura__seam-line" x1="${seamX}" y1="6" x2="${seamX}" y2="94" aria-hidden="true"/>
    <line class="daura__rim" x1="${seamX+3}" y1="6" x2="${seamX+3}" y2="94" aria-hidden="true"/>
  </g>
  <!-- SMEAR (alternate: retained motion) -->
  <g class="daura__g-smear">
    <path class="daura__bleed" d="${smearDragPath}" aria-hidden="true"/>
    <line class="daura__rim" x1="${rimX}" y1="10" x2="${rimX}" y2="90" aria-hidden="true"/>
  </g>
</svg>
```

- **Bias/geometry values (`biasY`, `seamX`, `smearDragPath`, `rimX`) are derived from `src.field.node {x,y}`** (verified present for all 5 sources — `data.js` grep `node:`), not invented per-card, per O5 §6 per-source table.
- **Fill/bleed capped at 8–12% opacity** (`.daura__bleed { opacity: .1; }`) per O5 §3 — codified as a single shared class so no per-mode build can silently drift past the ceiling.
- **All decorative sub-elements are `aria-hidden="true"`** — the single accessible name is the `role="img" aria-label` on the outer `<svg>` (§0 house-convention note), carrying the authored line as the text equivalent (doc 04 §10 requirement, satisfied without needing a separate `aria-labelledby` target).
- **No contour rings, no vector arrows, no gradient/heatmap fills, no `nth-of-type` mode-selection** — enforced by the class-toggle architecture above; there is structurally no slot for those anti-patterns to slip into (O5 §5).

---

## 4. Band row — reusing `metTier` / `MET_TIER_FILL` verbatim

```js
// inside renderAuraBody(src) — illustrative
const tierWord = src.event?.charge || src.signature?.band || "Muted"; // ground truth #3(a): existing data, no new score
const bandHtml = metTier("Aura", tierWord, src.halo.a); // ZERO new CSS — reuses .met-tier* wholesale
```

No `.met-bands` wrapper — that class is reserved for Metrics' 3-band groups (app.js:442,455). Aura's single band renders as a bare `metTier()` output inside `.daura__read`, visually reading as "one tick," matching O5 §4 rule 1. If a future review wants a thin top-border separator matching `.met-bands`' `border-top: 1px solid var(--line-faint)` rhythm, that's a one-line addition, not a new component.

**Null-relation state** (ground truth #3 condition b): `tierWord = "Muted"` naturally renders `MET_TIER_FILL.Muted = 1` (1 of 5 segments) — the existing function already supports a legitimate low/null read with zero new code. The design gap is authoring-side (at least one source needs a genuinely null `event.charge`/`stance`), not render-side.

---

## 5. Free-vs-develop render states

Repo convention already exists at `.dstat__undeveloped` (styles.css:2560-2564: `font-size: 11.5px; font-style: italic; color: var(--faint);`) — the established "teaser line" look used across the dossier for withheld content (Archetype stub, Aura stub today, Surface's `cfdeep` teaser at app.js:1005: `<p class="dstat__undeveloped">Surface proofs develop with the mint.</p>`).

**Aura should follow this exact pattern for its free state — do not invent a new teaser convention:**

```html
<!-- FREE / undeveloped state -->
<div class="daura daura--tease">
  <div class="daura__mark-wrap daura__mark-wrap--sealed"><!-- dim/static mark, no bias reveal, OR omitted entirely --></div>
  <p class="dstat__undeveloped">Aura read — reserved. Develops with the mint.</p>
</div>

<!-- DEVELOPED / paid state -->
<div class="daura">
  <div class="daura__mark-wrap">${residueSvg}</div>
  <div class="daura__read">
    <div class="daura__kind">${kindWord}</div>
    ${metTier("Aura", tierWord, mat)}
    <p class="daura__line">${authoredLine}</p>
  </div>
</div>
```

Two sub-options for the free-state mark, both defensible, flagged for O6/F1:
- **(a) Omit the mark entirely on free**, matching today's literal stub (single `.dstat__undeveloped` line, nothing else) — simplest, zero risk of the mark "leaking" the paid verdict.
- **(b) Show a dimmed/static mark with the band+line withheld**, matching the `.dhidden--tease` pattern elsewhere (styles.css: "free state reads as an intentionally sealed compartment... dashed frame + a quiet 'development pending' stamp" — `.dhidden--tease .dhidden__score { border: 1px dashed var(--line); }`). This would give free users a taste of "something is there" without the verdict, consistent with **FREE IS COMPLETE / free shows the parts** (ground truth #8) — free would show that a relation exists, paid names it.

This draft leans toward **(b)** as more consistent with the house's established free-state philosophy elsewhere in the dossier (Surface Record's `cfdeep` teaser shows 3 of N rows before the undeveloped line; Hidden-Stat-descendant `.dhidden--tease` shows a sealed dashed frame, not nothing) — but this is a product call, not a rendering constraint, so it's offered as a recommendation, not a lock.

---

## 6. Reduced motion, contrast, and role/aria — concrete rules

**Reduced motion** — append to the existing consolidated block at styles.css:3580 (do not open a new `@media` query):
```css
@media (prefers-reduced-motion: reduce) {
  /* ...existing rules... */
  .daura__mark * { animation: none !important; transition: none !important; }
}
```
Any motion-on settle (mark → band → line, ≤600ms, one-shot, per O5 §2) must be authored so its *absence* still leaves the final state correctly painted — no opacity:0 traps, no transform offsets left mid-flight. This mirrors the repo's own "climax + reveal snap to final assigned value" rule already codified at styles.css:3587-3593 for the card-reveal ceremony.

**Contrast** (ground truth #6, matches doc 04 §10 and O5 §7 verbatim):
- Graphical strokes (`.daura__filament`, `.daura__seam-line`, `.daura__rim`) ≥ **3:1** against `--ink-950`. Because `--daura-tint` is derived at 55% `--halo-a` into `--silver` (a light warm-neutral base), and `--silver` itself is `#c8c4bb` (light), the resulting mixed color sits far enough from `#0a0b0d` to clear 3:1 for all five sources' `halo.a` values (copper/cyan/steel-blue/green/teal) — worth a manual per-source contrast spot-check at build time rather than assuming from the recipe alone, since `color-mix` output isn't hand-verified in this draft.
- Text (`.daura__line`, `.daura__kind`, `.met-tier__n`, `.met-tier__v`) ≥ **4.5:1** — reuse `--silver-bright` (`#e9e5dc`, already the repo's AA-cleared display color per the styles.css:25 comment: *"chip text (worst case 5.97:1 on --silver-dim; all three chips clear AA)"*) for `.daura__line`, and existing `--t-ghost`/mono kicker treatment for `.daura__kind` (already used elsewhere at this same contrast tier).
- **Tint is never the only channel** — shape (the mark's geometry) carries the read in grayscale/high-contrast-forced modes; verified achievable because `.daura__filament`/`.daura__seam-line`/`.daura__rim` are drawn as actual `stroke`d paths, not tint-only fills.

**Role/aria:**
- `<svg class="daura__mark" role="img" aria-label="${authoredLine}">` — direct label, matching house convention (§0), not a new `aria-labelledby` pattern, unless O6/F1 wants to standardize the latter repo-wide.
- All internal decorative marks (`.daura__anchor`, `.daura__bleed`, rim/seam/filament paths) get `aria-hidden="true"` so the SVG doesn't produce a confusing subtree for assistive tech — the single accessible name at the `<svg>` root is the entire text equivalent.

---

## 7. What this draft explicitly does NOT do (guardrails)

- Does not ship type-burn — no `.daura__mark--typeburn` mode exists in the class map (O5 §1, benched not deleted; ground truth #7).
- Does not add a second/third band or any `.met-bands` wrapper around Aura's single `metTier()` call (O5 §4).
- Does not reuse or extend `.dfitaura*` classes (killed BR-S109 form).
- Does not introduce any `nth-of-type()` dependency.
- Does not render contour rings, vectors, heatmaps, or chakra/sparkle motifs — structurally impossible in the 3-mode class-toggle template above, since only seam/smear/tension `<g>` blocks exist.
- Does not decide the plate's final pixel dimensions/density (thin capstone vs. medium plate) — that's O6/F1's open call (S4 CONFLICT 1, O5 CONFLICT 4); this draft's CSS uses relative sizing so it can absorb either outcome without a rewrite, but the illustrative `viewBox="0 0 240 100"` assumes the thin-capstone reading.

---

## CONFLICTS / OPEN ITEMS (for O6/F1 — not resolved here)

1. **`--bg` cited in the mission brief does not exist in the repo.** The actual near-black field token is `--ink-950: #0a0b0d` (styles.css:26), with the body's radial-gradient blending `--ink-900`/`--ink-950` (styles.css:76). Any build should cite `--ink-950`, not `--bg`. Not a product conflict, just a naming correction for whoever implements.

2. **`aria-labelledby` (doc 04 §10 / O5 §7) vs. house convention (`aria-label` direct string, confirmed at app.js:636, 1816).** This draft recommends following house convention (direct `aria-label`) for consistency, but flags that doc 04/O5's `aria-labelledby`-pointing-at-left-column approach is a legitimate alternative if O6/F1 wants to establish it as a new, better pattern. Either satisfies the accessibility ground truth; they are not equivalent in implementation cost (labelledby requires a stable `id` on the text block and doesn't survive text edits as gracefully).

3. **Free-state mark treatment: omit vs. sealed-dim (§5 above).** Two defensible options, one recommendation offered (dashed/sealed, matching `.dhidden--tease`), final call deferred — this is a product/copy decision more than a rendering one.

4. **Plate density/dimensions remain unresolved upstream** (inherited from S4 CONFLICT 1 / O5 CONFLICT 4) — this draft's CSS is written to be density-agnostic (relative units, no hardcoded 320px min-height, no fixed 16/10 frame) specifically so it doesn't need a rewrite once that call is made, but the illustrative SVG viewBox and copy assume the thin-capstone reading is the target.

5. **No repo-vs-research conflict introduced by S8.** This draft is pure implementation-mapping of decisions already made upstream (O5's mode ruling, S4's schema-density flag, O1's file-map/class-convention facts) onto verified, re-grepped repo primitives (`dplate()`, `metTier()`, `--halo-a`, `color-mix`, the reduced-motion block). Where the mission brief's literal wording didn't match the repo (`--bg` vs `--ink-950`; `aria-labelledby` vs house `aria-label`), those are flagged above as corrections, not disputes.

---

## KEY REPO ANCHORS (re-grep; line numbers drift)

- `app.js` — grep `function dplate` (plate helper + extraClass slot); grep `03 — Aura (BR-S115` (current stub to replace); grep `function metTier` (band function, verbatim reusable); grep `MET_TIER_FILL` (tier→segment-count map); grep `function metRgba` / `function metMatText` (color helpers); grep `met-bands` (3-band Metrics wrapper — Aura must NOT use); grep `--halo-a:${esc(src.halo.a)}` and `setProperty("--halo-a"` (existing tint injection, reused as-is); grep `dplate("04", "Mint Record", paid, mintBody, "dplate--mint")` (the exact extraClass precedent Aura would follow).
- `styles.css` — grep `.dplate {` (base plate grid); grep `.dplate--mint` / `.dplate--oracle` (existing modifier precedents; `.dplate--aura` does not yet exist); grep `.dstat__undeveloped` (house free-state teaser convention, reuse verbatim); grep `.dhidden--tease` (sealed/dashed free-state alternate pattern); grep `.dfitaura` (KILLED form — do not reuse); grep `met-tier__seg` (band segment CSS, reuse verbatim); grep `--silver:`, `--silver-bright`, `--line-strong:`, `--ink-950:`, `--r-plate:` (variables used above); grep `color-mix(in srgb` (established tint idiom, multiple precedents); grep `prefers-reduced-motion` (single consolidated block at ~3580, append here); grep `nth-of-type(4)` (confirmed-broken positional rhythm — do not extend this pattern).
- `data.js` — grep `node:` / `balance:` (per-source `field.node{x,y}` bias vectors, all 5 sources verified present); grep `charge: "` inside `event:` blocks (per-source tier word for the band, all 5 verified: Charged/Clean/Strong/Peak/Charged for SRC-01..05); grep `aura:` (existing 3-chip arrays per source, raw material, not verbatim renderable per O1 §c.7/O5 anti-pattern).
