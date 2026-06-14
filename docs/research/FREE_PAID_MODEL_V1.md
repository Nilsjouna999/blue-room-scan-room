# BLUE ROOM — Free / Paid Model v1 (design research)

Layer: RESEARCH (informs, never implements — GOVERNANCE_OS §3). Date: 2026-06-14.
Source: a White Death pass on the free/paid question — 4 grounded inspectors (spec /
code+menu / value-copy / data-visual-zone) → Opus audit → 5 scouts → Opus rank.
**Approves nothing.** Pull a piece via the normal pre-edit critique, one commit behind
`baseline-v1`.

**Headline:** the free/paid *boundary* is already right (HALO_GATE_BOUNDARY_V1: complete
**front** / sealed **back**). The defect is a **presentation/framing failure** on three
user-facing surfaces that encode a **quality ladder** ("pick the better grade") — which
is exactly why Free reads as the raw leftover. Fix the framing, not the model.

## Sharpened question
Not *"where is the free/paid line"* but: **"How do we make the SAME artifact carry two
reading MODES (front = self-serve glance / back = sealed production record) so the
surface a user lands on never frames Free as the raw incomplete leftover and Paid as its
polished completion?"** The lever is **affordance + copy**, not what's gated: replace the
tier-ladder (top-bar toggle + side-by-side compare + "develops →" + "Develops:"
inventory) with **one complete object + a sealed-back-to-turn-over**, so Paid reads as a
different MODE, never a higher grade.

## Decision axes — where the line cuts (precise)

| Axis | The line | Free side | Paid side |
|---|---|---|---|
| **Design (affordance)** | tier-selector **vs spatial flip** (the nav metaphor, not content) | the complete card **front**, a whole self-contained artifact the user owns; no compare partner on screen | the sealed **back** of that same card, reached by intent (turn-it-over), after free value lands |
| **Data (kind vs amount)** | a **different KIND** of record, not more of the same | glanceable facts: image, archetype, 4 tier-band stats (no 0–100), 2–3 receipt chips, one oracle line, qualitative sealed-back hint | the **production record**: The Read · Strongest Lever · Three Active Levers · Keep This · Two Variant Routes · One Reduce · Next Pull Setup + hidden-axis stat + full evidence — *reads the image's construction, not a re-score.* De-emphasize the stat-count delta; the 3 extra same-family stats are the weakest "different-mode" carriers |
| **Visual** | complete-but-**matte** vs complete-but-developed | its **own** finished archive palette (graphite/charcoal/moss) + a real Free-Pull edition stamp — **not** desaturated/dashed-UNMINTED/ghost-serial (those signal incompleteness *on the object*) | the source's material palette (Warm Glass Copper / Cold Prism Frost); a different *finish*, not a brighter version |
| **Funnel timing** | invite **after** value lands | the lobby/menu sells **the artifact** (one complete card), not a free-vs-paid compare; sealed-back is atmosphere only (no counts) | the Halo invitation arrives by intent, downstream; price under proof of contents, never up-front, never the primary attractor in the free state |
| **Per-zone** | **one** gate location | Lobby = threshold (no gating) · Scan Room = complete free front + public modules + partial diagram + dossier 01–03 as complete archive material | **Card Record / Dossier = the ONLY gate** (the 7 production-note modules, hidden stat, full evidence/diagram/metrics, oracle, mint record). Vault/Codex = backlog |

**The current bug:** the gate is *smeared* across every surface (menu compare-tiles +
top-bar toggle + 7× ARCHIVE-PULL plate tags + right-panel veils), so every zone restates
"you don't have the real thing." Concentrate it at the **Card Record back-seam**.

## Model shortlist (verdicts)
- **KEEP (High):** *Free = complete front / Paid = sealed back of the same card (added
  production-note depth, not a higher outcome).* The current locked model — upheld; it is
  the strongest available "different mode."
- **DILUTE:** *Free = raw artifact / Paid = structured record-depth (a different reading
  INSTRUMENT).* The user's instinct — correct, and it **folds into** the KEEP: front = the
  raw glance, back = the structured record.
- **IDEA-ONLY:** Paid = the **Vault**/collection layer · Paid = the **develop
  ceremony** (experience, not data).
- **KILLED (3):** "free = developed-but-shallow / paid = deeper (same axis, more)";
  "paid = same data re-skinned" (dishonest / dark-pattern-adjacent); the amount-not-kind
  framing generally. *"Shown differently" was the right instinct, wrong literalization —
  the honest version is the front/back MODE split where the back holds different material.*

## The menu fix (concrete — fixes the "wack" menu)
1. **Delete the compare-tiles** (`renderMenu` `msample__compare`) → render **one complete
   card**, finished in its own graphite/moss key (not desaturated, not paired with a halo
   tile). Promote the already-correct `renderFreePullMock` framing ("the front is already
   complete") to the actual menu sample.
2. **Kill the "develops →" arrow** + the tier chip-pairs (the literal quality ladder).
   Caption the single card with completeness + one qualitative line *"This card has a
   sealed back · held in conservation"* (no counts/inventory).
3. **Reframe the back as a turn-over discovered by intent**, not the top-bar
   `data-treatment` toggle ("pick a grade"); opening happens downstream in the Card Record
   chamber (the HaloGateMock copy is already right).
4. **Fix the in-room free CTA** — drop the enumerated "Develops: hidden stat · evidence…"
   (reads as withheld inventory); use *"The front is complete. The same card has a sealed
   back."* (structure/mode language).
5. **Soften the 7× ARCHIVE-PULL/DEVELOPED plate tags** so free plates read as complete
   archive material; reserve developed framing for genuinely sealed plates.

**Net:** the user lands on **one complete artifact with a sealed back to turn over** —
never two grades side by side. (All within existing laws — this UPHOLDS the locked model
and fixes its presentation; no Core Change Review needed.)

## Scouted inspiration (ranked; native metaphors first)
| # | Inspiration | Maps to | Verdict |
|---|---|---|---|
| 1 | **Contact sheet vs finished print** — two complete-but-different instruments of one negative; a contact sheet isn't a broken print | the whole model (front=glance / back=production instrument) | KEEP |
| 2 | **TCG base card vs holo + first-edition stamp** — base is complete; foil is a treatment *applied to* a finished card; stamp = provenance not content; both play identically | visual axis (free complete + own stamp) | KEEP |
| 3 | **Readwise Lite vs Full** — passive daily-resurface (complete) vs active organizational instrument on the same corpus | data axis (kind not amount) | KEEP |
| 4 | **Letterboxd Pro** — analytical mirror reading the same diary back ("not more entries unlocked") | data axis | KEEP |
| 5 | **Bandcamp listener→collector** — same music, different *relationship*, not a quality upgrade | funnel timing / model | KEEP |
| 6 | **RevenueCat split-model** — gated = "a different destination, not a roadblock"; names the compounding-erosion trap; engagement-not-calendar triggers | funnel timing | KEEP |
| 7 | **Spotify** — gate the *context* the artifact lives in, not the artifact | per-zone (Med) | KEEP |
| — | Sorare (each tier its own complete material identity) · ethical cosmetics-as-identity · Gods Unchained (paid = tradability/ownership = different kind) | visual / model | DILUTE |

`Scout KILLED: 3` — Strava (remove-features-feels-crippled), Are.na (volume cap = trial
not complete), Airtable (no raw-vs-structured decision to borrow).

## How to pull
The **menu fix** is the highest-leverage, lowest-risk first build (it fixes the exact
"wack menu" complaint and only restyles/recopies — no model change). After that, the
visual axis (give Free its own complete matte stamp instead of dashed/ghosted) and the
data axis (lead Halo with the production-note modules, de-headline the stat-count) are the
next coherent pulls. Each: pre-edit critique → one commit behind `baseline-v1` →
screenshot-verify.
