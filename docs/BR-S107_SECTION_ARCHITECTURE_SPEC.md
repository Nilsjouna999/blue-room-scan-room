# BR-S107 — Section Architecture Rebuild Spec (the fuel-split)

**STATUS: v2 — APPROVED TO BUILD (amendments folded in).** v2 changelog: (1) the two C-sections are split at the FORM level — Light & Surface (front) = palette-at-a-glance, Surface Record (back) = palette + per-chip proof-noun annotations; (2) Metrics stays strictly numeric. Build runs under execute → report → HOLD; nothing pushes until the builder's "push it".
**BOUNDARY:** this is the architecture spec only (dependency layer 1). It defines *what each section is*
(fuel · job · register · form · reveal-state) and the kills/merges. It does NOT write the final copy
(layer 2), wire the reveals (layer 3), or tune mood (layer 4) — those fill in on top, in order.

**Provenance:** the fuel-split map (builder's breakthrough) + three accepted hardenings (Push #1–3).
Consumes `BR-CRAFT-INSIGHT-BANK.md` (registers) and the BR-S106 Signal Note (which survives intact).

---

## §1 — The principle
Every section drinks from **one lens** (its fuel), does **one thing** no other section can (its job),
speaks in **one register** (its voice), and is **one kind of object** (its form). When two sections share
a fuel, one is the **front taste** and the other the **back depth** — never the same thing twice.

The disease being cured: the live page reads **one lens (geometry) ~7×** and leaves the others homeless.
The cure: **geometry as prose lives in exactly two places — Diagram (visual) + Metrics (numeric) — and
nowhere else.** That frees every other section to read a *different* lens.

## §2 — The five lenses (the fuel streams)
A photo-as-artifact splits into five honest streams; each has exactly one home and never appears as prose
outside it.

| Lens | Reads | Prose home(s) |
|---|---|---|
| **A · OPTICS & GEOMETRY** | composition, axes, depth, crop, frame pressure, distortion | Diagram + Metrics ONLY |
| **B · GESTURE & SUBJECT** | what the subject does — pose, held object, eye-line, the action/moment | Signal Note (front) · Hidden Stat (back) |
| **C · LIGHT, COLOR & SURFACE** | light quality, color anchors, specular, material of surfaces | Light & Surface (front) · Surface Record (back) |
| **D · SCENE & PROVENANCE** | where, when, container, capture context | Scene Role (front) · Source Record (back) |
| **E · ESSENCE** | the synthesis *across* A–D — the kind, the placement, the verdict, the wit | Card tag (teaser) · Fit+Aura (placement) · Oracle (verdict) |
| *(F · FINISH & MINT)* | not a photo read — the record of the card itself: finish, serial, tier | Mint Record |

**Lens-discipline rule (enforced at the writing level):** each section's writing rule names its lens and
forbids the others — above all, *"never geometry"* outside Diagram/Metrics. With no engine, this is the
enforcement; when an engine exists, the five lenses become data fields and the split becomes structural.

---

## §3 — FRONT architecture (free · what you see first)

| Zone | Fuel | Job | Register | Form | Reveal |
|---|---|---|---|---|---|
| **The Card** — photo · title · **archetype tag** (carries "a photo role, not a person") · **Signal Note** | **B** | **GREET** — name the subject, one turn, withhold the verdict | withhold-and-point (BR-S106) | the card object: photo + tag + one line | always open |
| **4 face-stats** (on the card) | **A/B/C/D-E** (diversified — §5) | the at-a-glance vital signs — appear ONCE, here | stat labels / tier bands only | stat block | always open |
| **Diagram** (left toggle) | **A** | **POINT** — composition, spatially, on the photo | terse technical labels | lines on the photo | always open |
| **Metrics** (left toggle) | **A** | **THE RECIPE** — quantify how the read was weighted | numbers, minimal words | bars + figures | always open |
| **Light & Surface** (right col — replaces Stat Reading) | **C** | what the light, color, and surface are doing | cool, anti-sentimental, photo-as-object | 2-3 swatches + one cool line (the palette at a glance) | always open |
| **Scene Role** (right col) | **D** | where this sits — what the setting is doing | clerical-spatial | a filed line | always open |

**The front carries all five lenses, geometry confined to Diagram/Metrics/stats.** Essence appears on the
front ONLY as the Card's archetype tag (teaser). **The standalone front "Archetype" section is DROPPED**
(Push #1 — it duplicated the tag).

## §4 — BACK architecture (Artifact Record · the developed depth)
Each back section is the **deep** version of one stream — never a repeat of the front.

| # | Section | Fuel | Job | Register | Form | Reveal |
|---|---|---|---|---|---|---|
| 01 | **Source Record** | **D** | **THE FILING** — full provenance, the clerical record | clerical / flat honesty | filed form (label:value) | always open |
| 02 | **Surface Record** *(was Evidence Board, refueled)* | **C** | the deep physical-evidence read — light, color, material, proof-nouns | forensic, proof-noun | full swatch set, each chip annotated with its proof-noun | always open |
| 03 | **Hidden Stat** | **B** | **REVEAL** — the one non-obvious thing about the subject/gesture | withheld-then-sprung | sealed reveal | **SEALED** (tap to develop — free) |
| 04 | **Fit + Aura Layer** | **E** | **PLACEMENT** — where it sits · its family · its aura chips (NOT a verdict) | declarative-minimal, badge | badge-set | always open |
| 05 | **Mint Record** | **F** | the card-as-object record — finish, serial, tier | neutral / informative | receipt (monospace) | always open |
| 06 | **Oracle Read** | **E** (synthesis across A–D) | **PRONOUNCE** — the verdict everything built toward | the pronouncement: periodic, weighted, close-on-image | centered / large / alone | **SEALED** (tap to develop — free) |
| — | **Technical Receipts** *(appendix)* | A/C raw spec | the **raw capture spec** (lens, light, optics values) — de-overlapped from Source Record's narrative | dry spec | collapsed list | **COLLAPSED** appendix (tap to expand) |

---

## §5 — The 4 face-stats (diversified — SETTLED)
Each stat reads a different lens, so the card's vital signs are inherently multi-dimensional and each back
section that goes deep on a stat goes deep on a *different* lens.

| Stat | Lens | Reads |
|---|---|---|
| **Frame Presence** | A · geometry | how much frame the subject commands |
| **Signal** | B · gesture | readability of the action |
| **Visual Impact** | C · light/color | contrast, the punch |
| **Scene Charge** *(replaces "Frame")* | D/E · scene | the scene's energy / mood / current / emotion — the affective charge of the setting |

**Data note (conscious reversal — §13):** "Scene Charge" promotes the existing `charge` value to a Free
front stat; the redundant second geometry stat ("Frame") leaves the free four. Geometry's only numeric home
is now Metrics.

## §6 — Kills & merges (explicit)
- **Stat Reading (front right) — KILLED.** It was geometry reworded as prose. Its slot becomes **Light &
  Surface** (lens C).
- **Stat Dossier (back) — KILLED / merged into Metrics.** Geometry-prose a second time; the numbers live in
  Metrics. **Metrics stays NUMERIC — labels and figures only, never prose annotation. Any content that wants to be sentences is not Metrics; it does not exist (geometry-prose stays killed).**
- **Evidence Board → Surface Record (refueled).** Same slot, new fuel (C); stops being geometry-with-arrows,
  becomes the light/color/surface deep read in **swatch** form.
- **Technical Receipts ↔ Source Record — DE-OVERLAPPED.** Technical Receipts = collapsed **raw capture spec**
  (light/lens/optics). Source Record = provenance **narrative** (where/when/container/route-context). They no
  longer say the same thing.
- **Front Archetype section — DROPPED** (folded into the Card tag · Push #1).
- Net: ~13 prose boxes → ~10 distinct sections, each reading a different lens, zero repeats.

---

## §7 — Push #1: kill the essence-loop (CRITICAL)
Essence (E) must not become the new geometry. It appears three times, each a **distinct** job — never
"what kind of card this is" repeated:
1. **Front — the Card tag ONLY** (the one-line kind teaser; carries the "a photo role, not a person"
   disclaimer). No separate front Archetype section.
2. **Back — Fit + Aura = PLACEMENT** (where it sits · its family · its aura chips), as **badges/tags**,
   **never a prose verdict.**
3. **Back — Oracle = the ONLY verdict** (synthesis across A–D).

Ladder: **teaser → placement → verdict.** If Fit+Aura ever drifts into "summing up the card," it has stolen
the Oracle's job — cut it back to badges. This also resolves the front↔back placement question.

## §8 — Push #2: the seal is "develop," never paywall (CRITICAL)
Sealing Hidden Stat + Oracle behind a click is the "shaped-hole" pull-by-giving move. It must **not** trip:
- the **banned-copy law** — no `locked / unlock / premium / upgrade / paywall`; the seal reads as
  **"tap to develop / reveal."**
- the **no-magnetism / no-compulsion rule** — no countdown, scarcity, streak, or pressure. The gap is closed
  by the user's own reach, and the payoff is always delivered.

**The free/paid line (explicit):** the click-reveal of Hidden Stat + Oracle is a **FREE interaction** —
developing a card you already hold — **not a paywall.** The Free-front-complete / paid-sealed-back boundary
is preserved: the genuinely paid depth remains the paid Develop; this seal is a *free* develop beat inside
the card the user already has.

## §9 — Push #3: a thin lens states its flatness (replaces "go shorter")
There are no empty lenses — **flatness is a read.** A lens with little to say **states its own flatness as
a concrete line** (e.g. the dog's light = *"diffuse overcast, no shadow to throw"*). It **never** pads with
geometry to fill space, and it **never vanishes** — omission breaks the consistent spine that makes the card
a system. Honest thinness is content; padding is the disease.

## §10 — The form/shape layer (what makes it *felt*)
Organized ≠ alive. Felt-contrast comes from each section being a **different kind of object** on the page, so
the eye re-engages section-to-section. Form is a first-class section property, specified above and collected
here:

| Section | Form |
|---|---|
| Source Record | a **filed form** — label:value pairs, document-like |
| Light & Surface *(front · taste)* | **2-3 swatches + one cool line** — the palette at a glance |
| Surface Record *(back · depth)* | **the full swatch set, each chip annotated with the proof-noun that earned it** — the palette with its evidence (specular band on the shell, +1.2 EV snow floor). Visibly a different object from the front palette, not the same box. |
| Diagram | **lines on the photo** — spatial |
| Metrics | **bars + figures** — numeric |
| Hidden Stat | a **sealed reveal** — one line behind a tap; the shape IS the withholding |
| Fit + Aura | a **badge-set** — archetype/aura as chips, not prose |
| Oracle | **centered, large, alone** — the only section with whitespace and weight around it; shape = importance |
| Mint Record | the **receipt** — monospace, serial, dry |

*(Constraint: the form variation lives in the page sections; the **one-master-card-base LOCK is untouched** —
the card geometry stays singular. Forms must respect "plates stay flat — edge + tone + type only" or flag it
as a conflict — see §13.)*

## §11 — Reveal scope (SETTLED)
- **Sealed (the two payoffs, free develop):** Hidden Stat · Oracle.
- **Collapsed appendix (raw data, not a tease):** Technical Receipts.
- **Always open (the grounding floor):** the Card, Diagram/Metrics, Source Record, Surface Record, Fit+Aura,
  Mint Record. The grounding sections don't tease — they're the floor.
- Fit+Aura stays **always-open** as badges. Two seals = two clean beats; a third makes the page feel gated.

---

## §12 — Per-section WRITING RULES (the enforcement layer)
With no engine, the fuel-split is enforced here — each rule names the lens, forbids the rest, and sets the
register (drawn from `BR-CRAFT-INSIGHT-BANK.md`) and form. Claude Code writes from these.

- **Signal Note (front · B):** name the SUBJECT (the dog/salmon/lobster, never "the foreground mass"); one
  turn on an in-frame thing; end on the object; withhold the verdict; survive the swap test. **Never** lead
  with composition/axes/geometry. *Register: GREET/withhold-and-point. Form: one line on the card.*
- **Light & Surface (front · C):** only light quality, color anchors, specular, surface material. **Never**
  geometry/gesture/scene. *Register: cool, anti-sentimental, photo-as-object. Form: 2-3 swatches + one cool line — the palette at a glance (taste).*
- **Scene Role (front · D):** only where/when/container/capture context. **Never** geometry/gesture/light.
  *Register: clerical-spatial. Form: a filed line.*
- **Diagram + Metrics (front · A):** the ONLY geometry homes. Visual lines / numeric bars; minimal words. **Metrics is labels + figures only — never prose annotation (including the merged Stat Dossier content); anything that wants to be a sentence does not exist.**
  *No prose geometry exists anywhere else.*
- **Source Record (back · D):** full provenance, clerical record (the filing narrative). **Never** the raw
  capture spec (that's Technical Receipts). *Register: clerical / flat honesty. Form: filed form.*
- **Surface Record (back · C):** the deep physical-evidence read — material, light, color, proof-nouns
  (name the object that earned the read). **Never** geometry, **no** effect-arrows. *Register: forensic,
  proof-noun. Form: the full swatch set, each chip annotated with the proof-noun that earned it — the palette with its evidence (depth). A visibly different object from the front Light & Surface palette.*
- **Hidden Stat (back · B):** the one non-obvious gesture/subject read; withheld then sprung. *Register:
  REVEAL / info-gap. Form: sealed reveal.*
- **Fit + Aura (back · E):** placement only — where it fits · family · aura chips, as badges. **Never** a
  verdict/synthesis line (that's the Oracle). *Register: declarative-minimal. Form: badge-set.*
- **Mint Record (back · F):** finish, serial, tier — the card-as-object. *Register: neutral. Form: receipt.*
- **Oracle (back · E synthesis):** the ONE verdict, synthesized across A–D; periodic, weighted, closes on an
  image. *Register: PRONOUNCE. Form: centered/large/alone.*
- **Technical Receipts (appendix · raw):** raw capture values (lens/light/optics), dry, de-overlapped from
  Source Record. *Form: collapsed list.*
- **Thin-lens (all):** if a lens is flat, state the flatness as a concrete line; never pad with geometry;
  never omit the section.

---

## §13 — Pre-flagged Core-Change overrides (authorize knowingly · ratify in DECISION_LOG when built)
These are deliberate overrides of standing decisions, surfaced now per the execute→report protocol:
1. **The 7-plate dossier** (DECISION_LOG 2026-06-12): we kill **Stat Dossier** and rename **Evidence Board →
   Surface Record**. The plate set changes.
2. **The stat taxonomy** (DECISION_LOG 2026-06-13 + `CARD_SYSTEM_V1` §2): `charge` was deliberately made
   Halo-depth; **Scene Charge promotes it to a Free front stat — a conscious reversal.** "Frame" leaves the
   free four.
3. **"Plates stay flat — edge + tone + type only"** (`DESIGN_TOKENS`): the form/shape layer (swatches /
   badges / centered Oracle) rubs this. The **one-master-card-base LOCK is NOT threatened** (that's the card;
   form variation is in the page sections) — stated so it isn't over-applied.

## §14 — The hard line (NEVER override · comply + flag if the spec collides)
Child-safety, person-reading bans (worth / body / character / status / identity), and engine-token-leak bans
are **not** up for override. If any section's rule ever appears to read the person or surface an engine token,
that is a **spec bug to fix**, not a rule to override. (The Signal Note names the image-act/gesture, never the
person; Surface Record names surfaces, never the body; no route/Subject-lock/confidence tokens surface.)

## §15 — Build protocol (Steps 3–4 · for when this spec is approved)
- **Build as ONE coherent pass.** Single builder holds the architecture — no generation panel.
- **Two cross-cutting agents only (Opus):** (1) **Contrast auditor** — reads all rebuilt sections together,
  flags any that collapse into the same shape/voice; (2) **Screenshot red-team** — adversarial "why would I
  still NOT mint this card / which section still loops or bores?"
- **Execute → report → HOLD.** Build per spec even where it conflicts with a standing rule (never silently
  auto-kill a decision); then produce the conflict report (rule · our spec · what I did · my read: redundant
  vs real catch) and **hold the push** for the builder's "push it."

## §16 — Status
**Settled & folded in:** five lenses · one-fuel/job/voice/form · front-taste/back-depth · 4-stat
diversification (Scene Charge) · Surface Record name · keep Fit+Aura · Push #1 (essence ladder, drop front
Archetype) · Push #2 (free-develop seal) · Push #3 (thin-lens) · reveal scope (seal Hidden Stat + Oracle only)
· the form/shape layer. **No open architecture decisions remain.**

**Next:** builder approves this spec → build one-pass + 2 agents → conflict report → hold for "push it."
Layers 2 (per-section language) → 3 (reveal wiring) → 4 (mood) fill in on top, in that order.
