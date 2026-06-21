# BLUE ROOM — Commercial System Spec v1

**Status:** RATIFIED (decision document) · **Date:** 2026-06-21 · **Scope:** SPEC / GOVERNANCE ONLY
**Source of truth:** commit `a191769` · grounds in `HALO_GATE_UPGRADE_LAYUP_V1` §8, `HALO_GATE_BOUNDARY_V1`,
`MAGNETISM_MODEL_V1`, `scan-contract.js`, `app.js`. Pressure-tested by a 4-lens read-only panel
(model scoring · predatory-design adversary · paid-language safety · sequencing).

> **This is not code.** No runtime change, no payment implementation, no checkout/backend/email automation.
> The commercial spec must **not** become the next code lane — the flagged next concern is a separate
> creative/product stress-test on paid-reading VALUE (visual reward, colour, section identity, reveal moments,
> Hidden Stat / Oracle payoff, which sections are worth paying to read, Mint vs future rooms).

> **Copy correction (binding, user-facing language):** avoid **“unlock”** in any user-facing string — even
> neutrally. Prefer: **Develop this scan · Open the sealed back · Card Back · Developed Record ·
> One-time develop · this scan only.** (Internal CSS class names like `.unlock__price` are code, not
> user-facing; they are out of scope here and unchanged.)

---

## 1. Current product spine summary
Stable, law-clean desktop spine: Archive Desk (two-door menu, real Free card hero) → Card Room
(diagram-left / card-center / reading-panel-right) → Developed Reading (oracle-led panel) → Card Back /
Artifact Record (7-plate dossier with register neighborhoods). The Develop flow **dead-ends** today at
placeholder copy “dev mock — no real payment in this build” (`app.js` ~629, ~1005). No real upload flow
exists (the menu card is a static fixture). `scan-contract.js` programmatically enforces no-person-judgement /
no public 0–100 / no worth-rank-value on rendered scan-result objects.

## 2. Commercial premise
How does Blue Room charge for Develop/Halo **without** violating: Free is complete, and paid only opens the
sealed back of the **same** card? Paid is never a better score, better person-read, higher human value,
rarity rank, or hidden worth. The transaction must **pull by giving** (more depth of the same artifact),
never by manufactured pressure. Revenue is explicitly **not** the optimization target — trust, product law,
and simple implementation are.

## 3. Purchase model options (scored 1–5: trust · law · simplicity · taste = total)
| Model | Score | Note |
|---|---|---|
| **A** one scan = one Develop | **20** | clean discrete act, zero balance psychology; only model consistent with locked spec + live copy |
| B scan credits (balance) | 8 | sunk-cost meter + top-up nag; banned §8 |
| C packs of Develops | 8 | balance + “buy more to save”; banned §8 |
| D monthly membership | 5 | recurring-charge anxiety + use-it-or-lose-it; **release blocker** |
| E free daily scan + paid Develop | 13 | paid side clean, but “daily” = streak/cadence; meters Free |
| F account / Vault later | 13 | not a price model — a future *home*; backlog |

B/C import balance/inventory psychology; D imports recurring-charge + cadence; E meters Free (contradicts
“Free is unconditionally complete”) and adds cadence. Only **A** and **F** keep every purchase a clean
discrete act. D/B/C are the higher-revenue models **and** the ones that break the law — disqualified
regardless of revenue.

## 4. Recommended purchase model — **RATIFIED: Model A**
**One scan = one Develop.** A single, low, one-time per-scan purchase (~$7; exact figure validated
post-upload, see §14). Each Develop is a discrete, **dollar-denominated** purchase of the sealed back of
**one** specific card the user already holds. No balance, no credits, no packs, no membership, no in-app
currency, no streak, no cadence. Needs no account and no balance store — the lightest build and the
highest-trust posture. Already locked in §8 and spoken in live copy; this spec ratifies it.
The builder fork (one-time vs ongoing) is **resolved toward one-time**. The “more potent space” paid seed is
satisfied by **depth the engine gives** (the developed dossier) and may *later* become a separate stronger
standing room — but never as a recurring **charge**.

## 5. First-purchase flow
1. User scans/uploads a photo → receives a **complete** Free card (front + reading).
2. The card shows **one** quiet, non-nagging entry — “Develop this scan” (open the sealed back) — with the
   one-time scope and a single transparent **$** price shown **before** the click.
3. Click → a plain checkout with full card entry (**no saved card at launch**) and a clear $-priced confirm.
   A shame-free “Keep the free card as it is” path is equally easy.
4. Confirm → payment → the sealed back **opens in place** on the same card. Instant; no artificial
   “developing…” delay-then-upsell. A frictionless receipt is shown.
5. The screen after Develop is the developed card **and nothing else** (no upsell).

Price is shown **under** the proof of contents (what Develop adds), never as the up-front attractor. The
purchase is **idempotent per scan** — the same card can never be charged twice.

## 6. Repeat-purchase flow
There is **no separate repeat-purchase machine** — that absence *is* the non-predatory design. Repeat = the
user, unprompted, scans a **different** photo; that new card surfaces its own sealed back and its own
one-time Develop entry. Object-keyed (serial → filing-event → mint #). Hard rules: no running purchase
count, no “you’ve developed N cards,” no history surface, no streak, no cadence, **no “develop another”
prompt** after a completed Develop, and **one-offer rule** (an offer is never re-pinged after dismissal
within a session). Repeat revenue comes honestly from people having more photos worth developing — never
from a manufactured meter. Collecting developed cards is the eventual job of a Vault (Model F), which stays
**backlog** and must **never** become a prerequisite to buy or a “buy more” nudge.

## 7. Payment trigger locations
- **Primary (intent point):** the in-room “Develop This Scan” entry in the Free reading panel
  (`app.js` ~620–630) — already correctly placed; a real $ confirm attaches here.
- **Menu Develop door** (`app.js` ~996–1006): once a real scan exists, “Develop a scan” routes into the
  upload/develop path (a scan first, then the per-card trigger above) — **not** a separate checkout, and
  **not** the current dead-end to the sample room (wiring bug, §14.2).
- The in-room **HOLD MINT / Develop** control is the confirm action that fires the one charge.
- No payment trigger anywhere else. No checkout in the dossier, no upsell modals.

## 8. What the user receives
The **same** card’s sealed back, opened in place: the developed dossier / deeper **production record** —
full oracle read, stance, fit coherence, frame impact, lore density, hidden stat, mint record, evidence —
i.e. depth the engine **gives**, framed as “added depth, not a hidden result.” **Never** a different/better/
higher-tier card, never a new score, never a worth/rank change. Delivery is immediate and in-place on the
card they already hold. (Re-download / persistence of owned developed cards = a future Vault job, not part
of the launch transaction.)

## 9. Email role
- **At launch:** receipt only (a plain transactional purchase receipt). That is all.
- **Opt-in, later (default OFF, never nudged):** “save / email me this developed card link” for re-access.
- **Never** (predatory cadence): no abandoned-Develop reminder, no “you haven’t developed lately,” no
  streak/re-engagement email, no marketing drip tied to buying.

Email automation is out of scope for this lane; this section only fixes its **ceiling**: transactional
receipt only at launch, opt-in save later, no behavioral nudging ever.

## 10. Free module / veiled module decision
**Decision:** collapse the three **named** veiled Free modules (Stance Read, Fit Coherence, Oracle Read
teasers, `app.js` ~631–633) into a **single qualitative sealed-back entry**. The three named placeholders
read as a withheld inventory and edge toward “exact locked counts” (`HALO_GATE_BOUNDARY` forbids), and
create visual tension with “Free is complete.” Keep one entry — “Develop this scan” (open the sealed back) —
plus one qualitative line (“The front is complete. The same card has a sealed back.”). Drop the enumerated
teaser list so Free reads as **unconditionally complete**, not a trial-with-locked-slots. *(Copy/framing
change for the implementation lane — not done in this spec.)*

## 11. Safe paid language (deadpan-archival; “depth the engine gives”)
- “This card is complete as it is. **Develop opens its sealed back** — the same scan, a deeper record, when
  you want it.”
- “The sealed back of this card develops with the mint — **added depth, not a hidden result**.”
- “**One-time develop · this scan only**” (price/scope line — dev-mock clause removed).
- “The front is complete. The same card has a sealed back.”
- “**Develop this scan** · the card finishes developing in place.”
- “deeper **production record** / a deeper read of the same artifact” (depth, never “better”).
- “a **more potent space** — a stronger room that develops more of the same scan” (paid seed as depth the
  engine gives, never status the buyer gains).
- “**Keep the free card as it is.**” (shame-free decline — Free is the hero).

Preferred user-facing vocabulary: **Develop this scan · Open the sealed back · Card Back · Developed Record ·
One-time develop · this scan only**. Template: lead with completeness → frame as the **same** card’s sealed
back → price as scope, not a ladder → never imply the buyer gains status/score/worth.

## 12. Banned paid language
- “**unlock**” as user-facing language (even neutral) → use Develop / Open the sealed back instead.
- “unlock your real score” / “premium score” / “your real score is hidden” / “see your true score” / any
  public 0–100 on a paid surface.
- “higher value” / “worth” / “what you really are” / “pay to reveal what you really are.”
- “rare pull” / “rank” / “rarity ladder” / “UNCOMMON/COMMON/RARE” as a ranked tier.
- “your best result is hidden” / “better result” / “better/real read” / “the real reading.”
- “develop = a better card / higher tier / upgrade your card” (it is the **same** card’s back).
- exact pre-unlock sealed counts (“3 sealed stats remaining,” “7 hidden plates”).
- balance/scarcity/cadence: “credits / develops left / balance / tokens,” “unlimited develops,” “top up,”
  “running low,” “streak,” “expires / last chance / closing soon,” “limited edition — only N left,”
  “develop another now.”
- “your card is incomplete until you develop” (contradicts: Free is **complete**).
- confirmshaming / any decline copy referencing the person or a withheld result.
- attractiveness / beauty / personality / IQ / age / gender / class judgement of the person.

> `scan-contract.js` FORBIDDEN_TERMS today catches rank/worth/value but **not** score/premium/rare/pull/tier/
> upgrade/unlock — a paid-surface copy lint must be added (§14.7).

## 13. Risk analysis (non-predatory design — the central concern)
**Why repeat purchases feel dangerously easy (mechanisms to avoid):** stored balance / sunk-cost credits
(spend feels free → faster, less-reflective spend + top-up nag); one-click + saved card (deletes the
pause-to-decide — the biggest impulse lever); drip/obscured pricing (tokens hide real dollars); streaks &
cadence / daily resets (manufacture obligation to return); confirmshaming; artificial scarcity/FOMO;
post-purchase upsell at the dopamine peak; variable-reward/loot framing (“what rarity will you pull?”); and
the engineered **regret-loop** (free implies a withheld “real” answer) — the gravest fit-risk and exactly
what the law bans.

**Useful UX (keep) vs manipulative (forbid):** *useful* = one transparent $ price before the click; instant
delivery; a frictionless shame-free decline; never double-charging a scan; one discoverable entry point;
(later) not re-typing a card for a **new** scan the user freshly chose to make. *Manipulative* = stored
balances; saved-card one-click-to-charge at launch; currency abstraction; streaks/timers/re-engagement;
post-develop upsell; confirmshaming; scarcity on the card; membership “unlimited” quotas; any pre-unlock
count or 0–100.

**How Blue Room stays non-predatory:** Model A only; price in real dollars at the decision point (nothing to
run down → no top-up nag, no sunk cost); charge per card, idempotent; Free stays the complete hero; **no
saved card at launch**; **no post-purchase upsell**; defer Vault.

**Saved payment / one-click verdict:** appropriate **later, never at launch, never one-click-to-charge.**
Required conditions if ever built: (1) strictly opt-in, default OFF, never nudged; (2) it only skips
re-typing — it **never** removes the per-purchase $-confirm (“one click to a confirm screen,” not “one click
to charge”); (3) scoped to new scans only, never fires on an already-developed card; (4) one-step removal +
visible purchase history; (5) ships only after a track record proves pull-by-giving. A genuine
pause-to-decide must survive every purchase; a charge-without-confirm capability should simply never be built.

**Guardrails:** hard-cap the surface (no balance/packs/membership/currency); one-offer rule; no
post-purchase upsell; no cadence mechanics; no scarcity/FOMO; price-in-dollars always; shame-free decline;
extend the copy gate (§12/§14.7); saved-card governance; always-available plain spend record.

**Even Model A can drift (steelman + neutralizer):** micro-transaction treadmill (“just $7” × many photos)
→ show cumulative spend plainly + a calm, non-shaming high-frequency self-check (“these are yours; no need
to rush”), never paternalistic caps. Manufactured-incompleteness regret → keep Free demonstrably complete
(why §10 collapses the veiled modules). Per-card compulsion / “what will its back say” loot-pull → frame
Develop as completing **one** artifact’s record, never a graded reveal. Re-scan churn → keep reframe/setup
guidance as craft advice, explicitly **not** a re-buy prompt.

**Residual risks:** unbounded-volume “just $7” anchoring; copy-drift toward withheld-“real” while passing
term gates (needs human review of all commercial strings); payment-SDK defaults that save cards / enable
one-click (must be actively disabled at integration); refund/mistake path must exist (developing the wrong
card is a trust wound if unrecoverable).

## 14. Required pre-implementation tasks (ordered)
**Sequencing answer:** decide the **model now** (this doc) — it determines the entire shape of the
upload/payment wiring, so building upload first means building it twice. But the **price figure** and the
**locked-module UX** cannot be finalized until a real uploaded scan result exists. So: model now → upload
flow → payment last.

1. **Ratify Model A in `DECISION_LOG.md`** (done with this doc).
2. **Fix the two-doors-same-room wiring** — the Develop door (`app.js` ~997/~1002, both `data-view-to="room"`)
   must route to a distinct develop path, not the sample room.
3. **Build the real upload → scan → render flow** — wire the CORE SEAM adapter (`app.js` ~14–16,
   `uploaded-v1 → render-model`) → validate via `scan-contract` → route to the card/dossier path. *(Needs the
   scan engine — a separate gated program; out of this lane’s scope.)*
4. **Remove/reframe the dev-only rarity ladder “UNCOMMON PULL”** (`scan-contract.js` ~414; renderer
   `app.js` ~1513–1520) before any live upload/share/payment path reuses that fixture — a rarity band is a
   rank violation. (Keep edition labels ARCHIVE EDITION / HALO MINT — state names, not a ladder.)
5. **Apply the veiled-module decision** (§10): collapse 3 named teasers → 1 qualitative sealed-back entry.
6. **Set the real price + remove the “dev mock — no real payment” strings** (`app.js` ~629, ~1005); both drop
   into existing CSS slots with no layout change.
7. **Add a paid-surface copy lint** (extend `scan-contract` beyond FORBIDDEN_TERMS to cover CTA/price/checkout
   strings; add `score|premium|rare|pull|tier|upgrade|"unlock"`).
8. **Run the security pre-ship playbook** before any payment code (server-side trust boundary / no client
   secrets / CSP / the §7 aggregate wall — asserted, not yet enforced).

## 15. Final recommended next build after the spec
The structural unlock is the upload → scan → render flow (14.3), but it depends on the scan **engine**, which
is explicitly deferred (backend/AI out of scope). **Per the builder, the commercial spec must not become the
next code lane.** The flagged next work is a **separate creative/product stress-test on paid-reading VALUE**
(visual reward, colour usage, section identity, limited reveal/opening moments, Hidden Stat / Oracle payoff,
which stats/sections are worth paying to read, what belongs to Blue Room Mint vs future rooms) — because the
developed reading still feels too dry / document-like, and that question must be answered before any
commercial hardening or payment.

When a small **pre-commercial hardening** lane is eventually wanted (front-end-only, no backend, law-positive
regardless of payment timing), it is: (1) fix the Develop-door wiring (14.2), (2) remove/reframe the
“UNCOMMON PULL” rarity landmine (14.4), (3) collapse the veiled Free modules to one qualitative sealed-back
entry (14.5). The upload → engine → payment chain is the subsequent structural program, gated on the engine
being greenlit; price validation + module-UX finalization happen there with real scan results.

**Do not** start payment integration, backend, or email automation now.
