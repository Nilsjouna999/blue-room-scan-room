
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
