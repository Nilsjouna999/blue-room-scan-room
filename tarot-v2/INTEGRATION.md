# INTEGRATION.md — grafting tarot_v2 back into the live app

How each v2 piece maps onto the live `drawing-room.js` and `arcana-profile.css`. The live files
were read to write this; v2 was built to be **graft-ready**, so most of the engine is already
canon-identical and the deltas are small and enumerated.

Live references:
- `.../mystifying-hawking-7adffd/drawing-room.js` — the tarot engine (IIFE, `window`-mounted).
- `.../mystifying-hawking-7adffd/arcana-profile.css` — `--pf-*` tokens, `.dr-*` + `.pf-*` classes.
- `.../mystifying-hawking-7adffd/styles.css` — main app tokens (room bg, `--t-*`, `--line`).

---

## A. Already canon-identical — copy across unchanged

| Piece | Status |
|---|---|
| `pick`, `norm`, `drawSpread` (structure) | **Byte-identical** to live `drawing-room.js` lines ~33–71 (the draw loop, distinct-by-name, per-slot orientation seeding). v2 copied them verbatim. No change on graft. **NB:** `hash` is the one exception — it carries a canon correction; see §B4. |
| `brCode(seed)` / v2 `accession(seed)` | Identical formula `"BR-"+(…hash(seed+"br")%0xFFFFF…)`. Live already computes it. |
| `SPREADS.sitting` / `SPREADS.deep` (key/title/n/paid/price/positions/notes) | **Identical object shape and values** to live. v2 only *adds* a `pull` entry + a `filed` flag (see §C). |
| Gate: `sittingUsed()` / `isPaidNow()` + key `br_dr_sitting_used` | **Identical**, same try/catch fail-open pattern. |
| Pull seed `"pull~"+SESSION+"~"+(pullN++)` | Identical (live line ~220). Ephemeral, unfiled. |
| Settle beat = 620ms violet→gold, label `Settled`, announce `"Settled. The deck is cut."` | Identical timing + copy (live lines ~239–246). |
| Reduced-motion `reduce` guard around the settle | Live already branches on it; v2 keeps the same fail-to-instant behavior. |
| Canon copy (`The cut does not choose the cards. It closes the question.`, positions, notes) | Identical strings. |

**Net:** the entire deterministic core, the gate, the tier table for sitting/deep, and the
settle transaction transfer with **no logic change.**

---

## B. Intentional deviations (must translate on graft)

v2 deliberately diverges here for correctness; the graft must translate these back to the app.

1. **Token.** Live uses `sealNow()` = `Math.floor(Date.now()/60000).toString(36)` (minute-
   granular). v2 uses a frozen random token `Date.now().toString(36)+Math.random().toString(36)
   .slice(2,8)`.
   - **Why:** `sealNow()` collides two same-minute cuts of the same normalized question+spread
     into one seed and one BR code. This is a **latent determinism bug in live** — flag it.
   - **Graft options:** (a) adopt v2's random token in `drawing-room.js` (recommended fix), or
     (b) keep `sealNow()` but add sub-minute entropy. Either way the seed string
     `"read~"+key+"~"+norm(q)+"~"+t` is unchanged; only `t`'s recipe differs.

2. **URL params.** Live writes **three** params gated behind `inApp()`:
   `?dev=drawing-room&read=<key>&t=<token>&q=<question>` (live line ~233), and `reopen()` reads
   `param("read")`, `param("t")`, `param("q")` (lines ~259–263). v2 writes **one opaque param**
   `?read=<base64({k,q,t})>` and **drops the `inApp()` guard** (standalone always writes).
   - **Graft:** restore the live three-param write + the `inApp()` guard, OR keep v2's single
     opaque token if the app router is taught to read it. Mapping is mechanical:
     `{k,q,t}` ⇄ `read=k & q=q & t=t`. `reopen()` logic (rebuild seed, `shown:true`, never gate)
     is otherwise identical — live already does exactly this.

3. **Router coupling.** Live `showLanding()` / door nav uses `inApp()` + `location.href` to
   `?dev=profile` / `pathname` (lines ~218, ~273). v2 has no Reliquary page — it keeps filed-
   stamp *text* as flavor and neutralizes those nav links. **Graft:** re-attach the live router
   (`?dev=profile`, back-to-menu); no v2 markup change needed beyond re-pointing the hrefs.

4. **`hash()` multiply — the one engine correction (live must adopt it).** v2 uses
   `h = Math.imul(h, 16777619) >>> 0`; live `drawing-room.js` (~line 33) uses the float
   multiply `h = (h * 16777619) >>> 0`. **These are NOT equivalent.** For `h` up to 2^32,
   `h · 16777619` reaches ~2^56 — past the 2^53 float-integer ceiling — so the low ~3 bits
   round away. Since reversal is `(hash(seed+"o"+k) & 1)`, that lost low bit collapses
   reversal from the canon 50/50 (SPEC §3.3) to ~5% Reversed (verified: ~4.6% over 600k
   samples on live vs exact 50.0% on v2). The two hashes also return different values for the
   same seed (e.g. `read~sitting~x~abc` → live 4290524224 vs v2 3772232759).
   - **Consequence if not grafted:** leaving live's float multiply keeps live's non-canon
     ~5% reversal, AND makes every v2 `?read=` receipt replay a *different* reading in the
     live app (the seeds are cross-incompatible). So this is not optional polish — the graft
     must change live line ~33 to `Math.imul(h, 16777619) >>> 0`.
   - **Scope:** only the multiply changes. `pick` / `norm` / `drawSpread` structure stays
     verbatim (§A). This is the single most load-bearing engine delta in the whole graft.

---

## C. New in v2 — additive, safe to fold in

| Piece | Graft note |
|---|---|
| `SPREADS.pull` entry (`n:1, filed:false`) + `filed` flag on all tiers | Live handles Pull separately (not in `SPREADS`). Folding Pull into the table + adding `filed` is a clean superset; existing sitting/deep behavior unchanged. |
| `voice.js` (`window.BRArcanaVoice`, 22-Major slice) | In the live app, **do not ship the copied file** — instead point `bindRead()` at the real `window.BRArcanaCopy.get('tarot',name)` from `arcana-reading-copy.js` (already loaded in-app). v2's copy exists only to keep the standalone path-independent. The `bindRead` matrix (Major+Upright→`.p`, else codex) is identical either way. |
| Suit glyphs (4 inline SVG) + Minor card-face header branch | New face work (live prototype was Majors-only). Pure CSS/markup; no engine impact. Ships as-is. |
| Fluid FLIP stage (getBoundingClientRect travel) | **Already the live model** — `arcana-profile.css` `.dr-spread` is flex-wrap + `clamp()` with one 620px breakpoint. v2's fluid stage matches it, so this is graft-ready (the prototype's fixed 980×470 canvas was intentionally discarded to avoid a second rewrite). |
| Completion corner accession code + Locked Ink + shrinking stack + slam/shock retune | Additive presentation. The slam/shock retune (3-stop slam, .30-opacity shock) should also be pushed **into** the live drawing-room CSS as the anti-yippi fix. |

---

## D. Tokens / CSS — rename to `--pf-*` on graft

v2 `style.css` defines its own local tokens so the standalone is self-contained. The live app
already defines the canonical ones in `arcana-profile.css`; on graft, **delete v2's local
definitions and reference the live vars** (values are already the same — confirmed):

| v2 local var | Live canonical (`arcana-profile.css`) | Value |
|---|---|---|
| `--accent` / gold register | `--pf-gold` | `#a2864a` |
| `--accent-lit` | `--pf-gold-lit` | `#c0a05d` |
| violet register | `--pf-violet` | `#8a6fb0` |
| violet lit / line | `--pf-violet-lit` / `--pf-violet-line` | `#a487c8` / `rgba(138,111,176,.4)` |
| serif font | `--pf-serif` | Cormorant Garamond stack |
| mono font | `--pf-mono` | IBM Plex Mono stack |
| hairline | `--pf-line` | (live line token) |

Text ramp (`--t-display #e9e5dc`, `--t-primary #d7d3ca`, `--t-body #b1ada4`, `--t-meta #948f87`,
`--t-ghost #6e6b63`) and room bg
`radial-gradient(120% 90% at 50% -8%, #191512 0%, #100f0c 52%, #0a0b0d 100%)` come from
`styles.css` — reference them, don't redefine.

**Focus rings already match live canon** — keep verbatim: generic
`outline:2px solid var(--pf-gold-lit); outline-offset:3px`; `.dr-cardbtn`
`outline:2px solid var(--pf-gold-lit); outline-offset:6px; border-radius:12px` (`arcana-
profile.css` lines ~43, ~418). Card-face parchment/back hexes stay hardcoded (they are card
stock, not theme tokens).

---

## E. Graft checklist (order)
1. Swap v2 local CSS tokens → live `--pf-*` / `--t-*` (§D); delete duplicated definitions.
2. Repoint `bindRead()` from `window.BRArcanaVoice` → live `window.BRArcanaCopy` (§C); drop
   `voice.js`.
3. Translate the URL receipt: single opaque `?read=` → live three-param `read/t/q` behind
   `inApp()`, OR adopt the opaque token app-wide (§B2).
4. Decide the token fix: adopt v2's random token or add sub-minute entropy to `sealNow()` (§B1).
4a. **Correct the hash multiply in live `drawing-room.js` (~line 33)** to
    `h = Math.imul(h, 16777619) >>> 0` (§B4) — mandatory, not optional: it fixes live's
    ~5% reversal to canon 50/50 and makes v2 `?read=` receipts replay identically in-app.
5. Re-attach the live router for door / back / Reliquary nav (§B3).
6. Fold `pull` + `filed` into the live `SPREADS`; wire the Pull's light path into the in-app flow.
7. Push the slam/shock retune, shrinking-stack, Locked Ink, and the completion corner code into
   the live drawing-room CSS/JS as presentation upgrades.
8. Re-run the §8 acceptance criteria in-app.
