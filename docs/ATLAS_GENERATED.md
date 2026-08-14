# THE ATLAS — GENERATED

**What exists, and where. Read out of the code, not remembered.**

> Generated 2026-08-14 10:11 UTC against `5f579a3 BR-S409: U1 was hidden by one line, and it took four reports to look` by `tools/build_atlas.py`.
> Re-run the script rather than editing this file — anything typed here is lost on
> the next run, which is the point. `docs/ATLAS.md` is the older hand-written
> register and carries the reasoning this file deliberately does not.

★ **This file says what exists and where. It does not say what anything is FOR.**
Intent is not extractable, and the last four registers in this repo rotted because
they mixed the two. Purpose belongs in a hand-written companion that is allowed to
be opinionated and is expected to be re-read, not trusted.

---

## THE TRACK — the horizontal spine M1 lives on

Source: `MENU_PANELS` in `app.js`. Arrow keys move between these; `U1` hangs below
the panel whose hash is the site root.

| # | class | selector | address |
|---|---|---|---|
| 0 | `is-l1` | `.menu__panel--desk` | null (no address) |
| 1 | `is-wall` | `.menu__panel--wall` | "" (site root) |
| 2 | `is-reliquary` | `.menu__panel--reliquary` | #reliquary |

## THE ROOMS, as the site itself declares them

Source: the `ROOMS` registry in `app.js`. This array is what `u1Public()` reads to
build the list on U1. ★ Note what it is not: there is no rooms hub page anywhere in
this repo. `ROOMS` is data feeding a list, not a destination.

| key | name | state | free |
|---|---|---|---|
| `shelf` | Your Profile | open | true |
| `codex` | The Codex | open | true |
| `tarot` | Tarot Divination | open | true |
| `arcana` | The Birth Reading | open | false |
| `mint` | The Forge | drawn | true |
| `pay` | Paying for a reading | bench | - |
| `keep` | A reading that waits for you | bench | - |
| `deal` | The whole dealing | bench | - |
| `unlock` | The Codex, opened by your reading | drawn | - |

## REAL ADDRESSES — directories served without a route

A directory with an `index.html` is reachable on GitHub Pages with no server and no
`?dev=` param. BR-S304 moved the two products here for exactly that reason: *things
be where you think they be* fails at the address bar first.

| path | has index.html |
|---|---|
| `/about/` | yes |
| `/bench/` | **no — not reachable** |
| `/parked/` | **no — not reachable** |
| `/profile/` | yes |
| `/reading/` | yes |
| `/roadmap/` | yes |
| `/tarot/` | yes |
| `/tarot-v2/` | yes |

## `?dev=` ROUTES referenced in app.js

★ `index.html` returns 200 for **any** `?dev=` value, so an HTTP status proves
nothing about whether a route exists. Anything outside the gate falls silently to
the Desk with the bad param still in the URL.

17 referenced: `about-back` · `arcana-reading` · `arcane` · `before-after` · `drawing-room` · `free-scan-sim` · `halo-gate` · `menu-reveal` · `profile` · `proto-cards` · `review-map` · `settings` · `staged-reveal` · `uploaded-blocked` · `uploaded-result` · `vault` · `vision`

---

## WHAT THIS FILE CANNOT TELL YOU

- what any surface is FOR, or who it is for
- which are finished, which are drafts, which are abandoned
- what is coming that has no code yet
- how a stranger is supposed to move through any of it

Those are the questions worth answering, and none of them is extractable. That is
the companion document's job.
