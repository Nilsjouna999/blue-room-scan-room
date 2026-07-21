# BLUE ROOM · ARCANA — Handoff: build the final Profile / Hub

**For the next chat, with zero context loss. You are the BUILDER** (you hold the repo at
`C:\Users\nilsj\OneDrive\Documents\blue-room-scan-room`, a static HTML/CSS/JS site, no build step, `node` not installed).
Re-grep line numbers — they drift every session. Written 2026-07-21.

**★ NEXT MISSION:** design + build the **final Profile / Hub**. The user is running a separate deep-research
pass on "world-class profile/hub craft + the Blue Room variant" and **will paste a research paper into your chat** —
read it first, hold the canon below, then build. Do not start guessing a direction before that paper lands; when it
does, synthesize it into a concrete build.

---

## Canon (non-negotiable — holds across every surface)
- **Ground/type:** near-black archive `#0a0b0d` (warm radial `#15110b→#0a0b0d→#070607`); **no pure white**;
  Cormorant Garamond (display/prose), IBM Plex Mono (labels/data), system-ui (UI chrome).
- **Four-register colour law:** GOLD `#c9a35c`/`#e2c489` = the reading's value (crown, focus, wayfinding) ·
  EMBER `#b25f39` = shadow/reversed only · PERK palette = trait colours · **VIOLET `#8a6fb0`/`#a487c8` = commerce/threshold ONLY.**
  Everything else warm-grey (`#b1ada4`/`#9c9790`/`#96918a`). Violet's exact hex is still the brief's *suggested* value — confirm.
- **Voice:** deadpan-archival; describe the archetype, never rate the person; reflective, not predictive.
- **Ethics:** ANTI-PAYWALL (a coin buys a NEW, richer reading — never unlocks worth already given), no fear/urgency,
  no scores/stars, "for insight, not instruction," empowerment over fatalism. **"Enchantment lives in restraint."**

## Where the Profile/Hub stands (repo surface `?dev=profile`)
Built + verified, **uncommitted**. Files: `arcana-profile.js` (`window.BRArcanaProfile`, IIFE, `.mount`) +
`arcana-profile.css`; wired in `app.js` (dev list + `mountDev` branch) and `index.html` (link+script), mirroring the
`arcana-reading` pattern. Current design = the design-panel's **"Half-Frame Ledger"**:
- **Above-ground "surface" box** (`.pf-surface`) holding the crown + identity, sealed at its base by a gold
  **Kingdom-Threshold horizon** that breaks at a centre crown-gate sigil. Menu doors are chrome *above* the box.
- **Underground = content sections** as open **L-bracket ledger panels** (gold spine + fading top-rule + folder-tab
  heading), flat, nothing lifted.
- **Sections:** the Crown centrepiece (parametric SVG, rubies = readings held, reads "holds N", never "level N") ·
  **Rings** (was "Crown Family" — mini-crowns for family/friends read for) · Vault (door-bar + card previews, cards open
  their reading) · Showcase (per-item Everyone/Friends/No-one privacy, expandable) · Friends · Referral door · footer.
- **Commerce removed from the hub** — the hub is DOORS to every room; the `$4.99` draw + redraw confirm live in the
  **input room** now. Redraw is **additive** (a richer crown, original kept — never destructive). "Open this reading" is a
  free gold door.
- Modal focus-trap, `aria`, reduced-motion all in. Fleet-audit fixes applied (identity name+avatar, working vault cards,
  microcopy sizing, no pure-white hover, etc.). **Audit deferrals still open:** ruby "results vs readings" terminology,
  cross-linking the one reading across crown/vault/showcase, whether "Arcana Room" + "$4.99 draw" are two doors to the
  same room, day-one empty states.

## Identity-treatment (the name/handle/avatar look) — DECISION PENDING
The user iterated hard on the hero identity's letter treatment. **Winner so far = "White letters, black nitrogen"**
(6-agent fleet + Opus lead): white letterforms with black liquid-nitrogen currents + an occasional whip-crack churning
*inside* them. Built + **pixel-verified** as a standalone prototype (63% white / 3% black), **NOT yet wired into
`arcana-profile.js`.** Mechanism (works, self-contained SVG): `feFlood #f3f7ff` white body; black layers minted with the
built-in **`luminanceToAlpha`** (NOT a hand-rolled `feColorMatrix` matrix — that renders as *nothing* in this engine);
`color-interpolation-filters="sRGB"` MANDATORY; merged once → painted over white → clipped to the glyph
(`feComposite in2="SourceAlpha" operator="in"`); a crisp unfiltered white text copy under the filtered one is the
legibility floor. Prototype artifact: `https://claude.ai/code/artifact/72710fe2-f329-4deb-ae95-4ce00c5fe649`.
When wiring the final hero, decide with the user whether this treatment lands, or the simpler luminous-white, or the
framed halo.

## Input room (`arcane.js`) — done, uncommitted
Added a **"For whom is this drawn?"** selector (self / family / friend crown / someone new), the **$4.99 buy button**
(violet), and a **redraw banner** (additive/gain framing, "the original is kept, never lost"). Reads handoff query
params from the profile (`?dev=arcane&for=…&intent=redraw&subject=…`). **GPT owns only the ceremony ANIMATION**
(`ceremony.js/.css`, `assets/arcana/ceremony/*`) — the intake `arcane.js` is the repo chat's lane. Do NOT touch ceremony.

## Command 1 — record-page diagrams (DONE, LIVE, COMMITTED)
Four inline-SVG diagrams (Soul-Signature Bloom / Wu Xing / Decan strip / Numerology geometry) built into the reading
generator (`arcana-build/gen_body.js` + `gen_head.css`), verified, **published to the live reading artifact**
(`https://claude.ai/code/artifact/f6c3fa45-cb5d-436e-9b40-5a2a47703221`), and **committed** as `c6a2735`
**BR-S168** (local, **not pushed** — push = deploy; the user hasn't authorized a push).

## Pipeline & environment notes
- **Reading artifact** is generated from `arcana-build/` — `python gen_artifact3.py` assembles `gen_head.css`+`gen_body.js`,
  embeds the data banks + `fonts.css`, forces ASCII. See `arcana-build/README.md`. The Profile/Hub is a **repo surface**,
  separate from that artifact.
- **Preview:** `python -m http.server` in the repo, open `?dev=profile` / `?dev=arcane`. `.claude/launch.json` defines
  `scanroom` (:8744) — but another chat may hold it; serve on a free port.
- **★ Screenshots are BROKEN in this environment** (the browser-pane capture times out regardless of page). Verify
  visuals instead by **rendering SVG to a `<canvas>` and reading pixels** (`getImageData`) — this is how the white/black
  identity treatment was confirmed. For DOM/interaction, use `read_page` / `javascript_tool`. Publish self-contained
  **Artifacts** (fonts embedded from `arcana-build/fonts.css`) so the user can actually see motion/colour.
- **Browser cache:** the in-app browser caches `arcane.js`/`arcana-profile.js` hard; force-navigate or use a
  `?v=` cache-busted harness when verifying edits.

## Git / commit state
- Committed (local, unpushed): `c6a2735 BR-S168` = `arcana-build/` pipeline + Command 1 diagrams.
- **Uncommitted:** `arcana-profile.js/.css` (hub), `arcane.js/.css` (input-room additions), `app.js` + `index.html`
  (wiring), plus pre-existing untracked `arcana-reading.*` etc. Nothing pushed. The user typically commits directly to
  `main` (BR-S### convention); **confirm before pushing** (push = deploy/live).

## Do first, in order
1. Read the user's pasted **research paper** on profile/hub craft + the Blue Room variant.
2. Reconcile it with the current `?dev=profile` build and this canon; agree the final direction with the user.
3. Build the final Profile/Hub; wire the chosen identity-treatment into the hero; resolve the open audit deferrals.
4. Verify (canvas pixel-read for SVG, DOM checks, published Artifact preview). Then commit (and ask before push).
