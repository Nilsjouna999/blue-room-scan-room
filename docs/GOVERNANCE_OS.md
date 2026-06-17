# BLUE ROOM — Governance OS

Compact rules for how this solo project changes. Built for one builder
working with Fable/Claude/GPT sessions. Last updated: 2026-06-15.

## Authority layers (4)

1. **CORE LAW** — LOCKED rules in PROJECT_OS + DECISION_LOG + COPY_SYSTEM
   bans. Changes require Core Change Review (below).
2. **ACTIVE SPECS** — current working direction: PROJECT_OS (CURRENT
   sections), COPY_SYSTEM, FILE_MAP, CHANGE_MAP, SESSION_BRIEF, SCREENS.
   Implementable directly.
3. **RESEARCH** — `docs/research/` (SPINE.md on top, raw files below) and
   CARD_TECH_LAB. Informs; never implements. **Raw research cannot
   directly change product or code.** Research pasted in chat has
   RESEARCH authority unless explicitly promoted.
4. **ARCHIVE** — retired decisions, `_OLD_ARCHIVE_DO_NOT_USE`, stale
   audits. Read-only history. Never resurrect silently.

## Statuses (5)

- **LOCKED** — core law; change only via Core Change Review.
- **ACTIVE** — current direction; change via Spec Change Review.
- **DRAFT** — proposed, not yet binding.
- **RETIRED** — kept for history; do not build from it.
- **ASSERTED-NOT-ENFORCED** (suffix `-STATE-A`/`-STATE-B`) — a LOCKED-grade safety rule enforced today only by absence (no engine) is `LOCKED-STATE-A`; it flips to `-STATE-B` in place when the engine ships. Entry: the home spec explicitly distinguishes the two states (e.g. the `UNIVERSE_ZONE_MAP_V1` §7 aggregate wall).

## Research promotion funnel

```
raw research (docs/research/*.md, chat pastes)
   → filtered into docs/research/SPINE.md   (high-signal principles only)
   → promoted into an ACTIVE spec           (PROJECT_OS / COPY_SYSTEM / new spec via FILE_MAP entry)
   → implemented in code                    (only from ACTIVE/LOCKED, via SESSION_BRIEF)
```

Skipping a step is drift. A session may *read* research, but may only
*build* from ACTIVE specs.

## Core Change Review (for LOCKED rules)

1. Name the law and the clearly stronger reason.
2. Write a DECISION_LOG entry (date / decision / why / revisit condition).
3. Update PROJECT_OS in the same commit.
Only then may code change. No entry → no change.

## Spec Change Review (slim — for ACTIVE items)

1. One-line rationale in the commit message or DECISION_LOG.
2. Update the owning doc in the same session as the code.
That's it.

## Default read order (per session)

1. `docs/SESSION_BRIEF.md` — today's scope
2. `docs/FILE_MAP.md` — where things live
3. Only the docs the brief lists under Read
Daily coding sessions do **not** open raw research unless the brief says so.

**Source-of-truth for live state:** SESSION_BRIEF is *per-session scope* and can lag
(some sessions ship without a brief). For the authoritative "what shipped / what's next"
picture, read **`docs/TASK_QUEUE.md` (Completed + Ready) + `docs/DECISION_LOG.md` +
`git log`** — not SESSION_BRIEF.

## Anti-drift rules

- Fable obeys SESSION_BRIEF scope. No file outside its Edit list changes.
- If SESSION_BRIEF is stale, missing today's task/session ID, or doesn't
  match the user's current ask: **stop and ask.**
- If instructions conflict (chat vs docs, doc vs doc): **stop and name
  the conflict.** Do not pick silently.
- Issues found outside scope go to TASK_QUEUE, not into code. **Capture/promotion map:**
  observations + deferred work → `TASK_QUEUE.md` Backlog; security/privacy/upload/payment
  findings → `docs/security/SECURITY_REVIEW_PLAYBOOK.md` §3; law changes → `DECISION_LOG.md`;
  research principles → `research/SPINE.md`. No new capture doc (anti-clutter rule below).
- Stale info: verify against current files before repeating any claim;
  superseded claims get corrected at the source, not re-litigated.
- **One canonical statement per principle.** A principle has exactly ONE
  canonical home — precedence **CORE LAW** (LOCKED `DECISION_LOG`/`PROJECT_OS`)
  **> CANON** (`GOLDEN_NUGGETS`) **> ACTIVE > RESEARCH**. Every other mention
  must CITE it, never restate it. (Append-only `DECISION_LOG` decision *records*
  are authoritative sources, not restatements — never rewrite them to pointers.)
- **Decided ⇒ Backlog, not Parked.** An item with a governing `DECISION_LOG`
  decision belongs in `TASK_QUEUE` Backlog/roadmap, never `PARKED_IDEAS`.
  `PARKED_IDEAS` holds only wild, far-from-core directions with no decision to
  pursue them yet.

## Signal Map — altitude placement rule (sources `SIGNAL_MAP_TABLE.md`)

An item's **altitude** is the widest thing that breaks if it is removed or changed, scored against its **designed** scope (not runtime reach). Five bands, highest first:

- **L1 Project-Law** — whole-product law / safety / versioning, across all surfaces.
- **L2 System/Subsystem-Spec** — one named authored subsystem's whole spec.
- **L3 Surface-Spec** — one surface, zone, or panel.
- **L4 Element/Technique** — one component / technique / stat / treatment, or a mechanism for an unbuilt zone-feature.
- **L5 Detail-Cue** — one copy line, token value, or micro-cue.

**Evaluate** L1→L5, stop at first yes. **Tie:** a blast-radius spanning two adjacent bands places at the **higher** band; authority/status/lifecycle/kind tiebreak *within* a band, never across.
**Intended-scope:** an asserted-but-unenforced safety rule keeps its designed altitude (§7 is L1 though runtime-vacuous today). **Status-source:** read the token from the item's highest-grade governing home, never a downstream prose mention.
**Separability:** a compound splits into sibling rows only if inner parts' blast-radii are independently computable AND ≥1 band apart; a **non-split override** (the source titles the parts as one unit, or binds them in one sentence) outranks the split — except a part ≥1 band *above* the container forces a split; a not-split row takes the **container's own** scope.
**Meta:** this rule + the table place once in the table's reserved META row; the table holds **pointers + status only**, canon stays at the source. *(Worked example: `SIGNAL_MAP_TABLE.md` preamble.)*

## Warrant audit — control vs warrant (bare-rule check; full spec a held DRAFT, unratified)

A rule's CONTROL (altitude) can outrun its WARRANT; THE GATE (contradiction) and `-STATE-A/-B`
(enforcement) both miss it. When a rule **fails to cleanly decide a live case**, log it to `TASK_QUEUE`
Backlog as `warrant-debt` [rule-pointer + trigger-case]; it rides the 4-BR-S holding-age clock and
resolves via `DECISION_LOG` / Backlog. Corollary of build-from-ACTIVE-only — a bare rule can't be the
SOLE deciding ground until its basis is drawn (strike it from the `DECISION_LOG` **Why**; if the verdict collapses, it was the decider). Flags, never auto-demotes; full loop stays RESEARCH, auto-dropping to this line if unearned (≥3 non-seed captures) by BR-S +8.

## Anti-clutter rules

- No new doc without a FILE_MAP entry and explicit approval.
- One Active task in TASK_QUEUE at a time.
- Length caps: GOVERNANCE_OS ≤ 120 lines · SESSION_BRIEF fill ≤ 40 ·
  SPINE.md ≤ ~900 · DECISION_LOG entries ≤ 8 lines each · new specs ≤ 300.
  If a doc outgrows its cap, split or distill — don't sprawl.
- Cut before adding. Retired content moves to ARCHIVE status, not deleted.
