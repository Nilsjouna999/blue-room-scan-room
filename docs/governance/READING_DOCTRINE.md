> STATUS: DRAFT — forged, not ratified. Honest-status doctrine; rules labeled
> CODE-ENFORCED / SHIP-GATED / POLICY-PROMISED. Not binding law until ratified.

*Provenance: saved verbatim from last session's 15-agent forge (verdict SURVIVES_NARROWED; OPUS-RED residuals already folded in), with two post-forge accuracy fixes verified against `scan-contract.js` — (1) FORBIDDEN_TERMS non-schema keys are substring-matched, not whole-word; (2) the blocklist is 26 terms, not 30.*

# BLUE ROOM — The Two-Wall Reading Doctrine (final, honest-status)

> Status of this doctrine: a mix of CODE-ENFORCED, SHIP-GATED, and POLICY-PROMISED rules, each labeled as such. Nowhere does it claim an architectural guarantee the code does not deliver. Where a wall is only a promise, it says "promise." This honesty is the doctrine — a reading system that overclaims its own safety is the failure mode (H1).

## The one-line claim (corrected and de-inflated)
Blue Room's ethic is NOT "we see everything and choose not to speak it" — that is the profiler's alibi (H1), and it is dead. Nor is it "the compute wall carries the load" as a settled fact — because the compute wall has **zero verifiable enforcement for any real engine** (H3/S2). The honest claim is narrower:

**Blue Room commits to two walls and is honest about which is real when.** Wall 1 (never-COMPUTE / never-CONSTITUTE) is the wall that *would* carry the ethical load — and TODAY it is real only by the absence of any engine; for any future engine it is a governance promise the validator cannot verify. Wall 2 (never-SURFACE) is the only wall with running code, and that code is a partial, synonym-evadable blocklist. **Neither wall is sufficient alone, and the doctrine's integrity is in naming exactly how each falls short — not in pretending either is a guarantee.**

---

## The two states (this resolves the core ambiguity OPUS-RED named)
The node's headline — "some things are NEVER computed at all" — is true in one state and false in the other. The doctrine must always say which state it is in:

- **STATE A — NO ENGINE (today).** There is no AI, no upload, no backend, no encoder, no person key in the codebase (verified: scan-contract.js calls no AI; app.js carries no aggregate/person-key machinery). In State A, "never computed" is literally true *because nothing computes anything*. The deep-reading INSPECTION core does not exist either — so the node's central "reads deep in private" claim is **vacuous in State A**. State A's safety is real but it is the safety of an empty room.
- **STATE B — ENGINE EXISTS (the only state where the node is non-vacuous).** The moment a real vision encoder reads a photo, attractiveness / age / morphology are computed as entangled distributed features in the backbone embedding (H3/S2, conceded as correct). In State B, "never computed" is FALSE for any standard encoder; it becomes a policy promise the validator (a post-inference JSON filter) cannot verify.

**The node survives only by living openly in this split:** it must never cite State A's "never computed" guarantee while operating in State B. A doctrine that does is committing the exact laundering H1 named.

---

## Layer 1 — INSPECTION (what may be read at depth) — STATE B only
Reads the **IMAGE-ACT**: the re-authorable performed set — posture, gesture, gaze, crop, light, styling, scene-role — what a reshoot could change (HUMAN_READ_LINE_V1). It may read deep ON A SINGLE PHOTO. **This layer only exists in State B**; asserting both "the inspection core reads deep" and "never-compute is enforced by absence" in the same breath is the contradiction OPUS-RED caught. In State B the inspection core is live and the never-compute wall is a promise, not absence.

## Layer 2 — TRANSFORM (raw read → facing text) — a CONTRACT, not a running function
**Honest status, stated first:** there is no transform function in the codebase. S5 is conceded in substance. What exists is scan-contract.js — a post-hoc validator on an already-formed object. The "transform" is therefore a **renderer/prompt CONTRACT** the future engine must satisfy, plus a partial code backstop. It is an honor system with a thin enforced floor.

The CONTRACT (HUMAN_READ_LINE_V1 §transformation, asserted-not-enforced):
1. name the observable cue (grammatical subject = the photograph);
2. frame it as what the cue *does to the frame* (effect on composition, not interiority);
3. keep it re-authorable (cue in the performed set, not body/face/build);
4. never rank or assign fixed worth → route to tier-band / archetype / diagram / oracle.

The 3 GATES a read must clear to reach FACING:
- **Gate 1 — re-authorable cue.** (Partially backstopped by the FORBIDDEN_TERMS body/biology lexicon.)
- **Gate 2 — grammatical subject is the photo.** ASSERTED, NOT ENFORCED. No code checks sentence subject.
- **Gate 3 — connotation-strip** (remove the photo-noun; if a stable disposition remains, fail). ASSERTED, NOT ENFORCED. **This is the only named separator for the moment/person boundary (H6) and the recognition/judgment boundary (S6) — and it does not run.** Any body-position read ("the braced shoulders," "the closed posture") surfaces freely; strip the noun and "this person is guarded" remains, with nothing to catch it.

The ENFORCED FLOOR (what actually runs, scan-contract.js): the 26-term FORBIDDEN_TERMS walk over every string value; the positional `value`-key rule; PERSON_TRUTH (5 literal regexes) over `artifact.title` + `readings.*` only; the 4 safetyFlags must be false. **This floor is trivially synonym-evadable** — "the stance reads as dominant," "high status signal," "the gaze reads predatory" all pass (none of those words is in the list). The floor blocks the dumbest violations and nothing subtle.

## Layer 3 — FACING (what the person receives)
Tier bands (Muted/Clean/Strong/Charged/Peak), receipts (observed cue → artifact effect), archetype-as-photo-role, oracle-as-fiction. No public 0–100 (PROJECT_OS §9, LOCKED). No second-person identity claim — *as a contract*, only partially backstopped (see Tier A limit).

---

## TIER A — the never-SURFACE list (the ONLY code-enforced wall) — with its real coverage stated
Enforced TODAY on any result object by scan-contract.js:
- **FORBIDDEN_TERMS** — **substring**-matched in any non-schema KEY (so a sneaked-in `ageGuess` / `attractivenessScore` is caught), **whole-word**-matched in ANY string VALUE — 26 terms: attractiveness, beauty, hotness, sexy, race, ethnicity, gender, age, health, diagnosis, disorder, personality, iq, class, alpha, beta, value, worth, rank, skull, jaw, canthal, dimorphism, biology, genetic, breed.
- **PERSON_TRUTH** — exactly 5 regexes: `/you are/`, `/you're/`, `/this proves/`, `/proves (that )?you/`, `/your (personality|character|soul|worth|value|iq|future)/` — scanning ONLY `artifact.title` and `readings.*`.
- **The 4 safetyFlags** (`containsSensitiveInference`, `containsHumanWorthScoring`, `containsAttractivenessScoring`, `containsBiologyRating`) must all be false.

**HONEST LIMITS (corrected from prior drafts that overstated this wall):**
- There are **FOUR** enforced safetyFlags, not five. `containsPersonTruthClaim` exists ONLY in the docs-only HALO_DOSSIER_SCHEMA_V1 spec (explicitly "no runtime build"); **the validator never checks it.** Any doctrine that counts it as a live flag is fabricating enforcement.
- PERSON_TRUTH is **5 literal strings over 2 paths**. It does NOT scan `aura` / `evidence` / `discoveryNote`. It catches "you are" / "you're" / "your [closed-list-noun]" and nothing else. Sentences like "You carry yourself with quiet authority," "You read as someone who dominates a frame," "Carrying yourself with menace" **pass clean.** Do not present these as blocked.
- The FORBIDDEN_TERMS value-walk blocks the WORD `class` / `value` / `rank` / `beta` in any prose string — which means the doctrine's own archetype-CLASS vocabulary must NOT appear as the standalone word in a string value (use it only in the allowlisted KEY `archetypeClass`, never as prose like "archetype class: X"). This is a real consistency constraint, not a free pass.
- **This is an OUTPUT filter.** It proves a word/claim does not SURFACE in covered paths. It proves NOTHING about what was derived upstream.

Tier A's honest one-line: *a partial, path-limited, synonym-evadable never-surface blocklist — a real floor against crude violations, not a wall against a determined or careless engine.*

## TIER B — the never-COMPUTE / never-CONSTITUTE list (the wall that WOULD carry the load) — POLICY, not guarantee
Designated never-compute, even privately, even un-surfaced:
1. The PERMANENT set (HUMAN_READ_LINE): age, ethnicity, gender-as-essence, orientation, health, hardwired personality, any human-as-evaluable score.
2. Any attractiveness / human-worth / biology rating.
3. Any PERSON-KEYED join (the aggregate — see below).
4. Any cross-session stable-trait derivation (S1: the invariant across many photos IS the person).

**HOW TIER B IS ENFORCED — stated without inflation:**
- **STATE A:** enforced by absence. Real, but only because no engine exists — and in State A the inspection core the node celebrates also does not exist.
- **STATE B:** a **POLICY PROMISE the validator CANNOT verify.** On any standard ViT/CLIP/DINO backbone the forbidden quantities are computed in the embedding regardless of which output register is read (H3/S2 land, fully conceded). The only HONEST structural enforcement is a purpose-built encoder trained to provably orthogonalize/remove the forbidden subspaces, adversarially verified — **which is not specified, referenced, or implied anywhere in the codebase.** Until it exists, Tier B is an aspiration, not an architecture. The doctrine states this in the open rather than letting the validator masquerade as proof.

**Resolution of the "which wall carries the load" contradiction OPUS-RED named:** the doctrine does NOT claim Wall 1 carries the load as an enforced fact. It claims Wall 1 is the wall that *ought* to and *would* carry the load — and that it currently does so only by absence (State A) or by promise (State B), while all running code lives on the insufficient Wall 2. **This is the honest, stable position:** the ethical weight is on a wall that is, today, a commitment rather than a mechanism — and the doctrine's job is to make that commitment visible, ship-gated, and architecturally honest, not to disguise its unenforced status.

## "Never person-keyed" = the aggregate-refusal wall (the one STRUCTURAL future-guarantee) — and its honest limit
UNIVERSE_ZONE_MAP_V1 §7 (LOCKED-grade): no scan output may be joined by an uploader/person key; archetype, hidden stat, aura re-derived fresh per scan; no streaks, counts, or history across pulls; the cross-pull surface (Vault, Codex) must be STRUCTURALLY incapable of reconstructing a stable trait; the serial is an OBJECT address (Object→Scan→Card→Mint). **SHIP-GATE:** the aggregate guard ships in the SAME change as the uploaded-photo engine, or the engine does not ship.

This is the one place the doctrine can offer a structural (not merely policy) future-guarantee, because "no person-key join" can be enforced by schema/architecture rather than by inspecting embeddings.

**HONEST LIMIT — H5 is conceded, not defeated.** Object-keying defeats AGGREGATION (the multi-read dossier). It does NOTHING about the SINGLE deep behavioral read the node explicitly authorizes ("read deep ON A SINGLE PHOTO"). A breach or subpoena of ONE object-keyed record of an identifiable person's self-portrait still exposes how that person posed, gazed, styled, and presented — and the image itself IS a person handle, regardless of the absence of an explicit ID field. The doctrine therefore adds a rule it cannot dodge: **a per-scan record may be RETAINED only if (a) object-keyed with no cross-scan join AND (b) it is acknowledged that holding even one deep behavioral read is itself a risk surface — so retention should be minimized, time-bounded, and the deep read should not be persisted beyond what the single card requires.** H5's core (holding ANY deep inference is the harm) is owned, not renamed: the defense reduces the harm to the single-record floor; it does not eliminate it.

---

## The recognition-vs-judgment boundary (S6) — a CONTRACT, with an HONEST worked example
S6 is correct: "the frame routes toward The Threshold" is a classification of a human performance, and grammatical indirection alone is not innocence. The boundary is NOT "we describe, we don't judge." It is: **a judgment is permitted only about the photograph-as-made — re-authorable, win-neutral, and defensible from a visible receipt — and forbidden about the person-as-fixed.**

**Honest status of this boundary: it is a renderer CONTRACT held by Gate 3 (connotation-strip), and Gate 3 DOES NOT RUN in code.** Therefore S6 and H6 are *governed by contract, not blocked by mechanism.* The doctrine does not claim otherwise.

- **RECOGNITION (contract-allowed):** a ranked assessment of the IMAGE-ACT a reshoot could move, phrased as effect-on-frame, where no outcome is a loss. "The raised palm reads as a clean barrier signal → the frame routes toward The Signal Bearer." Re-authorable (drop the palm, route changes); win-neutral (every route is a different valid card — REFRAME_MAP).
- **JUDGMENT (contract-forbidden):** the same sentence if connotation-strip leaves a stable disposition. "The Threshold-type holds themselves like someone who confronts" → strip → "this person is confrontational" = FAIL.

**WORKED EXAMPLE — corrected so it does not claim a block the code does not perform:**
Input: raised palm, direct gaze, muted cabin.
- **Recognition (contract-pass):** "Subject anchor holds the lower-left third; the raised palm adds barrier pressure → Frame Presence: Charged. The frame routes toward The Signal Bearer." Subject = the frame; cue = re-authorable; every band is a valid card.
- **Judgment (contract-forbidden — but NOTE the enforcement truth):** "You carry yourself with quiet authority; you're the type who holds a room." This violates the recognition contract (Gate 2 + Gate 3). **In actual code, only the substring "you're" trips PERSON_TRUTH; "You carry yourself with quiet authority" and "holds a room" match NONE of the 5 regexes, and Gate 3 does not run.** So this line is *forbidden by the contract and largely UNBLOCKED by the validator.* The gap between contract and enforcement is exactly the residual risk, and the doctrine names it rather than hiding it behind a false "blocked."

The archetype-selection step is the dangerous seam (S6's strongest point): an archetype is a category of person-performance assigned by the machine. It is held legal ONLY by contract — each archetype must be defensible from a visible re-authorable receipt and reshootable into a different archetype, and the named set must be win-neutral (no implied ranking). **None of these conditions has a code verifier.** Where re-authorability cannot be shown, the archetype is judgment and must not render — a rule the renderer must self-enforce, with no validator to catch a violation.

---

## What the original node got WRONG (the narrowing, plainly)
- "Some things are NEVER computed at all" → **true only in State A (no engine), where the inspection core is also vacuous; a policy promise the validator cannot verify in State B.** Honest structural enforcement needs an orthogonalized encoder that does not exist.
- "a deliberate TRANSFORM" → **a renderer/prompt CONTRACT (3-gate + 4-step), enforced in code only by a partial, synonym-evadable word/structure floor; Gates 2/3 do not run.**
- "the ethical lock is a discipline on what is SURFACED" → **rejected as the sole reading (the profiler's alibi, H1).** Re-stated as: the lock is FIRST a (currently unenforced) discipline on what is COMPUTED and CONSTITUTED, SECOND a (partially enforced) discipline on what is surfaced — with the honest admission that all running code is on the second, weaker wall.

## What the attacks could NOT take (the genuine survivor core)
- **H2/H4 ("the depth is projection, it's not there") — absorbed, not fatal.** Blue Room does not claim to detect interiority; it names the image-act and the viewer completes the meaning. "All reading is projection" *strengthens* the lock: it is precisely why the read must stay re-authorable and receipt-bound, and why the never-compute list refuses to assert the system detected the person. The honest product is "a forensic reading of the photograph-act you may recognize yourself in," never "a detector of your essence."
- **S4 (cost-of-success) — owned, paid knowingly.** Perfect enforcement DOES forbid "this is how you hold yourself in the world." The product chooses the artifact frame over that felt-value on purpose. That is the price of the lock.
- **The ship-gate and the object-keyed serial — the two real structural commitments** that survive into State B and are not mere word-filters: no engine ships without the aggregate guard; identity is an object address, never a person address.

## Consistency-with-locks note (corrected)
Consistent with: scan-contract.js (the 4 REQUIRED_SAFETY_FALSE flags — NOT five; FORBIDDEN_TERMS whole-word value-walk + substring non-schema-key walk; positional `value`-key rule; PERSON_TRUTH over artifact.title + readings.* only); HALO_GATE_BOUNDARY_V1 §D framing law + §B exact-count ban; HALO_DOSSIER_SCHEMA_V1 §4 LOCKED rules + Artifact Test (noting its 5th flag is docs-only, unenforced); HUMAN_READ_LINE_V1 3-gate + image-act/permanent split + aggregation-as-unenforced-harm + the explicit Enforcement-gap; UNIVERSE_ZONE_MAP_V1 §7 aggregate-refusal wall + object-keyed serial; PROJECT_OS no-face-rating / no-public-0–100 LOCKED. **Caveat the prior draft omitted:** doctrine prose and module copy must avoid the standalone words `class`/`value`/`rank`/`beta` in string VALUES or they will trip the very validator cited. Nothing here relaxes a LOCKED rule; the additions are (a) the State A / State B split, (b) honest labeling of each wall's enforcement status, and (c) the H5 single-record retention-minimization rule.

# PART 2 — Attack / Rule Record

## LANDED attacks → the rule each forced → why the rule must never be undone

- **H1 (Profiling-Rationalization) — LANDED.** "We see everything, we just don't speak it" is the profiler's confession. → RULE: the doctrine may NEVER present surfacing-discipline (Tier A) as the whole ethic; the never-COMPUTE/never-CONSTITUTE walls are named as primary *even though they are the unenforced ones*, and the doctrine openly admits all running code lives on the weaker surfacing wall. → Undoing this re-creates the exact alibi: a system that reads humans deep and calls silence virtue.

- **H3 / S2 (Enforceability / Technical-Enforceability) — LANDED, FATAL to the literal claim.** "Never computed" is unverifiable; a standard encoder computes attractiveness/age/morphology in entangled embedding dimensions regardless of output. → RULE: "never computed" is downgraded everywhere to a POLICY PROMISE for any real engine; the only honest structural enforcement is a named, not-yet-existent orthogonalized encoder; the validator is explicitly a post-inference filter, never proof of non-derivation. → Undoing this lets a four-flag JSON filter masquerade as a computational guarantee.

- **S5 (Transform-is-vapor) — LANDED.** There is no transform function; scan-contract.js is a post-hoc blocklist. → RULE: the TRANSFORM is labeled a renderer/prompt CONTRACT with a thin, synonym-evadable enforced floor; "function" language is banned. → Undoing it dresses an honor system as a mechanism.

- **S6 (Recognition-vs-judgment) — LANDED.** Archetype selection IS judgment of a human performance; grammatical indirection is not innocence. → RULE: archetypes are legal only as re-authorable, win-neutral, receipt-defensible PHOTO-roles, enforced by CONTRACT (Gate 3), which is admitted not to run. → Undoing it lets "the frame routes toward X" launder a social verdict on the person.

- **H6 (Boundary-creep) — LANDED.** "Subject anchor" IS the person; the moment/person boundary has no operative separator. → RULE: the named separator (connotation-strip, Gate 3) is explicitly flagged asserted-not-enforced; body-position reads are acknowledged to surface freely. → Undoing the honesty hides an open seam.

- **H5 (Abuse) — LANDED in substance.** A single per-scan behavioral read of an identifiable self-portrait is a breachable dossier; the image is itself a person handle. → RULE: object-keying defeats only AGGREGATION; the single-record harm is conceded; retention must be minimized/time-bounded and the deep read not over-persisted. → Undoing it pretends "no person key" deletes the harm of holding one deep read.

- **S1 (Drift) — LANDED.** Revenue features migrate toward cross-session stable-trait inference, none tripping the validator. → RULE: cross-session stable-trait derivation is a Tier B never-compute; the aggregate guard is SHIP-GATED to the engine's same change. → Undoing the ship-gate lets the line "migrate, not break."

- **S3 (Steelman-opposite: shallow beats deep) — LANDED (severe).** The transform is downstream of the harm; the inference already happened. → RULE: the doctrine concedes the deep private read is a real risk surface (feeds H5 retention rule) and does not claim the transform "launders" it safe. → Undoing it revives "extract then sanitize" as if extraction were free.

- **S4 (Cost-of-success) — LANDED (severe), accepted as price.** Perfect enforcement forbids the personal-feeling claim that is the product's charge. → RULE: the product chooses the artifact frame over felt-value, stated as a knowing cost, not denied. → Undoing it would tempt re-introducing person-claims to recover "magic."

## OPUS-RED residual corrections folded in (these were forge softenings, now removed)
- Fabricated 5th safetyFlag (`containsPersonTruthClaim`) — REMOVED; doctrine now states exactly 4 enforced flags.
- Worked-example "blocked" line that the cited regexes do not block — CORRECTED to show the contract/enforcement gap openly.
- "Enforced by absence" conflated with a live inspection core — RESOLVED via the explicit State A / State B split.
- "Which wall carries the load" contradiction — RESOLVED: Wall 1 is the wall that *ought to* carry the load and currently does so only by absence or promise; all code is on Wall 2.
- FORBIDDEN_TERMS over-blocking the doctrine's own `class`/`value`/`rank`/`beta` vocabulary in prose — DISCLOSED as a real constraint.

## REJECTED attacks (considered, rejected — do not re-litigate)
- **"H2/H4 prove the reading is empty, therefore the node is hollow and dead."** REJECTED as fatal. Conceded as TRUE and ABSORBED: the system never claimed to detect interiority; "all reading is projection" is the *reason* the never-compute list and the re-authorable/receipt-bound discipline exist, not a refutation of them. Hollowness is fatal only to a node that claims to detect the person — this node explicitly refuses that claim. It lands as a narrowing of what "deep" means (forensic reading of the photo-act, viewer completes meaning), not as a kill.
- **"The node should be KILLED outright because every wall has a gap."** REJECTED. A clean kill would be correct IF no honest survivor existed — but a survivor does: a doctrine that (a) splits State A / State B, (b) labels each wall's true enforcement status, (c) ship-gates the one structural future-guarantee (no person-key) to the engine, and (d) accepts S4's price. That survivor is materially narrower than the original node and makes zero false enforcement claims. Killing it would discard the genuine structural commitments (object-keyed serial, aggregate ship-gate) that DO survive into State B. The honest verdict is SURVIVES_NARROWED, not KILLED — but only because the narrowing strips every overclaim the attacks exposed.
