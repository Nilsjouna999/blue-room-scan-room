# docs/aura_info/ — README

## What this folder is

The **aura_info** directory is the decision-ready knowledge base for Blue Room's Aura dossier section. It synthesizes research from five investigative documents, repo ground truth from docs/BR-AURA-RESEARCH.md, and the architectural constraints baked into the live product (data.js, app.js, reveal/reading-panel.js, styles.css). This folder is not a research archive; it is a field guide for builders, writers, and reviewers shipping Aura as a first-class dossier plate.

**Use this folder when:** you are implementing Aura (code or copy), reviewing an Aura PR, writing safety audits, or answering "what counts as a valid Aura read?" **Do not use this folder for:** architectural debate (that is locked in the repo), person-safety law revision (that is BR-S113, LOCKED in the Aura research), or visual-system rethinking (that is decided via the residue rule, doc 02).

---

## How to use this folder

### For builders (implementation-first path)

1. **Start here:** `00_EXEC_BRIEF.md` — two pages, the one-thing promise + three no's
2. **Then:** `14_AURA_SPEC.md` — the full data schema, field names, required values, examples
3. **Then:** `06_IMPLEMENTATION.md` — file locations, integration points, mechanical derivation rules
4. **Dip in as needed:** `07_WRITERS_PLAYBOOK.md` (copy tone), `04_SAFETY_GATE.md` (review checklist), `08_QA_CHECKLIST.md` (verification)

### For writers (voice-first path)

1. **Start here:** `00_EXEC_BRIEF.md` — the charge promise + what it is not
2. **Then:** `03_COPY_SYSTEM.md` — the class-line / verdict-line formula, tone rules, contradiction pairs
3. **Then:** `07_WRITERS_PLAYBOOK.md` — worked examples, phrase bank, the bridge-hinge mechanics
4. **Safety first:** `04_SAFETY_GATE.md` — the four-zone filter, swap test, two-second test, banned phrases

### For reviewers (verification-first path)

1. **Start here:** `04_SAFETY_GATE.md` — the three gates all Aura copy must clear
2. **Then:** `08_QA_CHECKLIST.md` — point-by-point verification against repo law
3. **Reference:** `05_VISUAL_SYSTEM.md` (visual anti-patterns), `10_LEXICON.md` (exact word-use rules)
4. **If conflict arises:** `09_CONFLICTS_AND_GAPS.md` — the repo-vs-research decisions with their reasoning

---

## Authority order (the hierarchy that resolves conflicts)

When two sources disagree about what is allowed, use this rank:

1. **REPO LAW** — what lives in `data.js`, `app.js`, `styles.css`, and the locked docs (`BR-AURA-RESEARCH.md`, `COPY_SYSTEM.md`, `HUMAN_READ_LINE_V1.md`, `PROJECT_OS.md`). If the repo does a thing, the repo is right.
   - Example: The repo's existing `aura[]` chip structure takes precedence over any new schema proposal.
   - Cite: file path + grep-able anchor (line number drifts; anchor on the stable phrase).

2. **SUBTRACTION GATE VERDICT** — the deep research verdict from doc 04, sections "Subtraction gate" and "Convergence": Aura's irreducible job is the RELATION the frame stages (ordinal band + kind-word + relation + verdict line). This was adversarially verified and is treated as ground truth alongside repo law.
   - Example: A proposed Aura visual that reads as "chart" instead of "residue" is rejected by this rule.
   - Cite: `04_aura_field_map_implementation.md` "Subtraction Gate Verdict"

3. **RESEARCH DOCS** (normalized, lowest authority) — the five synthesis documents (docs 01–05). Useful as concept bank and operational details, but yield to repo law.
   - Example: A copy pattern from doc 01 that conflicts with COPY_SYSTEM.md's banned words is rewritten to obey the system.
   - Cite: doc number + section + page/line

---

## Key supersede rule: Doc 04's visual map → Doc 02's residue

**CRITICAL:** The originating research (doc 04) proposed a **literal Field Map** — contour rings + vector + container band + rim — as the visual. This is **SUPERSEDED**.

Per `02_aura_visual_grammar_residue.md` and explicit user direction:
- **Keep:** doc 04's semantic architecture, data schema, class labels, authorized-first model, accessibility guidelines, and file placement.
- **Discard:** doc 04's map-like SVG (contour lines, topographic logic, labeled zones).
- **Replace with:** doc 02's residue directions — one-seam burn / ghost smear / off-center tension line. These are the visual grammar, the "what remains after contact" philosophy, and the line selection heuristic.

Anywhere doc 04 is cited for visual implementation, apply doc 02's logic instead. Anywhere doc 04 is cited for schema, copy structure, or prose framework, it is authoritative.

---

## Header and format conventions (for all 14 files)

### Section structure

Each file follows a three-layer structure:

1. **Executive headline** — one sentence; what decision/rule this file decides
2. **Body** — detailed reasoning, examples, worked rewrites, edge cases
3. **Checklists / tables** — scannable rules, pass/fail gates, verification steps

### Citation format (always use these)

- **Repo files:** `filename.md` line XXX; include a grep-able phrase as anchor
  - Example: `BR-AURA-RESEARCH.md` line 45; "Master filter: every clause pinned to a concrete in-frame noun"
- **Research docs:** `NN_docname.md` section "Section Title" 
  - Example: `02_aura_visual_grammar_residue.md` section "One-seam burn"
- **Other files in this folder:** `NN_filename.md` "Header Name"
  - Example: `04_SAFETY_GATE.md` "The four-zone filter"

### Language rules for this folder

- **Never hedge.** Write "This is X" not "This might be X" (repo law and verified research do not waffle).
- **Cite every factual claim.** No unsourced assertions about the repo, the product, or the research.
- **Use the repo's own voice.** The copy system says "deadpan field analyst"; these files are internal so sound like that.
- **Separate "what we know" from "what builders should decide."** Rules go in CAPS; suggestions use "recommend/consider/may".
- **Never re-litigate locked law.** BR-S113 (person safety), the Subtraction Gate verdict, and the residue rule are closed. Flag them, obey them, move forward.

---

## The folder structure (what each file does)

| File | Purpose | Audience | Read time |
|------|---------|----------|-----------|
| `00_EXEC_BRIEF.md` | One-page orientation: the Aura promise, three "not" boundary-markers, why it matters | everyone | 5 min |
| `01_REPO_GROUND_TRUTH.md` | Repo facts: what data structures exist, what the copy system requires, what has been killed | builders + reviewers | 10 min |
| `02_WHAT_AURA_IS.md` | The clean definition: artifact-focused, relation-focused, field-synthesis framing | everyone | 8 min |
| `03_COPY_SYSTEM.md` | The formula: class-line structure, verdict-line anatomy, contradiction pairs, tone rules | writers | 12 min |
| `04_SAFETY_GATE.md` | The three gates every read must clear, the four-zone filter, swap test, worked rewrites | reviewers + writers | 15 min |
| `05_VISUAL_SYSTEM.md` | Residue grammar: the four directions (seam/smear/tension/type), anti-patterns, selection heuristic | builders + designers | 12 min |
| `06_IMPLEMENTATION.md` | Practical build guide: files to edit, mechanical derivation, author-first workflow, integration points | builders | 10 min |
| `07_WRITERS_PLAYBOOK.md` | Applied examples: worked Aura lines per source, the bridge phrases, pattern A/B/C, confidence markers | writers | 15 min |
| `08_QA_CHECKLIST.md` | Point-by-point verification: copy safety, visual fidelity, no duplication, separation from Oracle, semantic CSS | reviewers | 10 min |
| `09_CONFLICTS_AND_GAPS.md` | Logged conflicts between research and repo; gaps where builders must decide; revisit conditions | everyone | 8 min |
| `10_LEXICON.md` | Exact word use: approved terms (internal + visible), avoided terms, why each choice matters | writers + reviewers | 10 min |
| `11_DO_NOT.md` | The kill list: phrases that read as diagnosis, purple prose, cliché, redundancy with Diagram/Oracle | writers + reviewers | 8 min |
| `12_BIBLIOGRAPHY.md` | Sources: repo docs, research docs, external scholarship (Benjamin, Gell, Barthes, etc.), access notes | everyone | 5 min |
| `13_SYNTHESIS.md` | The bridge from research to product: how the five GPT docs converge, how the Subtraction Gate verdict arose | architects | 15 min |
| `14_AURA_SPEC.md` | The canonical data schema: fields, types, required values, derivation rules, TS type definitions | builders + reviewers | 12 min |
| `_appendix/` | Raw research docs normalized; cross-reference index; examples compared; repo Aura hits; rewrite bank | reference | — |

---

## The one-page orientation

**Aura is the image's felt field: the way a photograph presses, holds, leaks, cools, or lingers once the evidence is known.** It is not a second Diagram (that lives to the left and explains geometry). It is not a second Oracle (that comes after Aura and delivers the final spoken verdict). It is not a diagnosis of the person; it is a reading of the image's action on the viewer.

### It does this three ways:

1. **Class-line verdict** — a short charged phrase (e.g., "Warm Refusal", "Quiet Labour") that names the relation the frame stages
2. **One-sentence reading** — a charged image-centered description using the bridge hinge (reads as / plays as / lands as)
3. **Residue visual** — one restrained mark (seam / smear / tension line) that feels like afterimage, not explanation

### It is NOT:

- A second Diagram (no vector fields, no geometric maps, no mechanical explanation)
- A second Surface (no material-language, no finish vocabulary, no aesthetic classification)
- A second Metrics (no quantified bands, no numerical score, no confidence as a bar)
- A second Oracle (no final verdict, no the-last-word, no mic-drop authority)

### Why it matters:

The dossier runs: Source Record → Evidence Board → Stat Dossier → Hidden Stat → **Aura** → Mint Record → Oracle Read. Aura is the last *felt* beat before Mint; Oracle is the last *spoken* beat. That three-plate stack (stat/aura/oracle) is the narrative shape that sells a card. Aura makes it work.

---

## If you only read three files

1. **`00_EXEC_BRIEF.md`** — understand what Aura does
2. **`04_SAFETY_GATE.md`** — understand what is forbidden
3. **`14_AURA_SPEC.md`** — understand the data structure

That gives you 90% of what you need for a PR.

---

## How conflicts are logged (and who resolves them)

Every conflict between the research and the repo is recorded in `09_CONFLICTS_AND_GAPS.md` in a table with:

- **Topic** — what disagrees
- **Research says** — the proposal / claim
- **Repo says** — what the code or locked doc establishes
- **Resolution** — which wins and why
- **Impact** — what builders need to change
- **Revisit condition** — if any, when this decision should be re-examined

**Important:** conflicts are logged for transparency, NOT for debate. The authority order above is the final answer. If you find a new conflict, log it in the file and apply the authority rule; do not re-open resolved conflicts unless the revisit condition is met.

---

## Version and maintenance

- **Last updated:** 2026-07-05
- **Built by:** H8 (README/INDEX agent in the Aura synthesis fleet)
- **Authority:** All files are read-only synthesis from locked repo law + adversarially verified research; no file here overrides the repo
- **Maintenance:** Update when repo law changes; update when research contradicts live behavior; update when a revisit condition is met

---

## Questions this folder answers

| Question | File |
|----------|------|
| What does Aura do, in one sentence? | `00_EXEC_BRIEF.md` |
| What data does the repo already have for Aura? | `01_REPO_GROUND_TRUTH.md` |
| What copy am I allowed to write? | `04_SAFETY_GATE.md` + `07_WRITERS_PLAYBOOK.md` |
| What visual can I build? | `05_VISUAL_SYSTEM.md` |
| How do I implement this? | `06_IMPLEMENTATION.md` |
| How do I test this? | `08_QA_CHECKLIST.md` |
| Where did this come from? | `13_SYNTHESIS.md` + `12_BIBLIOGRAPHY.md` |
| What if the repo disagrees with the research? | `09_CONFLICTS_AND_GAPS.md` |
| What words should I use? | `10_LEXICON.md` |
| What should I never do? | `11_DO_NOT.md` |

---

## Contact and revisit

This folder is the authoritative synthesis for Aura as of 2026-07-05. The next major revisit is conditional on:

- Code merge of the Aura dossier plate (triggers builder feedback loop)
- Live testing with real scans (triggers copy safety audit)
- Changes to BR-S113 or the person-safety law (would require full re-audit)
- Architectural changes to renderDossier() (would require file-map update)

Builders and writers should reference this folder on every Aura PR; reviewers should use it as their authority; architects should use `13_SYNTHESIS.md` to understand how the pieces fit.

---

## Files included in this README's folder

```
docs/aura_info/
├── README.md (this file)
├── 00_EXEC_BRIEF.md
├── 01_REPO_GROUND_TRUTH.md
├── 02_WHAT_AURA_IS.md
├── 03_COPY_SYSTEM.md
├── 04_SAFETY_GATE.md
├── 05_VISUAL_SYSTEM.md
├── 06_IMPLEMENTATION.md
├── 07_WRITERS_PLAYBOOK.md
├── 08_QA_CHECKLIST.md
├── 09_CONFLICTS_AND_GAPS.md
├── 10_LEXICON.md
├── 11_DO_NOT.md
├── 12_BIBLIOGRAPHY.md
├── 13_SYNTHESIS.md
├── 14_AURA_SPEC.md
└── _appendix/
    ├── 01_research_normalized.md
    ├── 02_research_normalized.md
    ├── 03_research_normalized.md
    ├── 04_research_normalized.md
    ├── 05_research_normalized.md
    ├── cross_reference.md
    ├── examples_compared.md
    ├── repo_aura_hits.md
    └── rewrite_bank.md
```
