# BUILD_PUBLIC — SPEC v1

**Status:** specified, not built. Written 2026-08-12, after BR-S347 found the builder's
real name, birth date, home town and a second real person's birth data live on the
public site, and after an audit found six prototype pages and a dev A/B toggle
publicly reachable.

**The one sentence:** one repository, three outputs — Workshop, Sandbox, Public — where
the public site cannot contain a workshop file, because the workshop's files are never
copied into it.

---

## 1. Why a generator and not a flag

A runtime flag (`if (!PUBLIC) renderDevNav()`) does not remove anything. The file still
ships, the route still resolves for anyone who types it, and the personal fixture is
still in the bundle. This is a static site: **the only way to not ship a file is to not
copy it.**

The repo already proves the pattern works — `build_routes.py` generates the four route
stubs from `index.html`, and its assert (`no "?dev=" in the head`) has already caught one
real mistake. `build_public.py` is the same discipline at whole-site scale.

---

## 2. The three outputs

| | What it is | Contains | Who sees it |
|---|---|---|---|
| **Workshop** | this repo, `main` | everything: 17 dev routes, prototypes, harnesses, the builder's own reading as a fixture | the builder |
| **Sandbox** | `dist/` served locally, or a private preview deploy | byte-identical to what Public would be | the builder, before publishing |
| **Public** | `dist/` deployed to its own target | finished rooms only | everyone |

**Sandbox is the point.** It is not a third variant to maintain — it is the Public build,
looked at before it goes out. Every leak found in BR-S347 would have been visible in a
sandbox walk-through.

**The workshop repo becomes private.** Public deploys from generated output only. Until
that happens, everything below is mitigation, not protection.

---

## 3. What ships and what does not

### Rooms — the allow-list is the whole security model

`app.js` currently accepts 17 `?dev=` values. The public build ships an app that accepts
a **named subset**, and the generator writes that subset into the output — it is not a
runtime check that a URL can bypass.

**Public rooms (5):**

| route | address | why |
|---|---|---|
| the desk / menu | `/` | the front door |
| `drawing-room` | `/tarot/` | a product |
| `arcane` | `/reading/` | a product |
| `arcana-reading` | — | the reading a purchase opens |
| `settings` | — | Motion, the local ledger, About & Legal |
| `roadmap` | `/roadmap/` | what is coming |
| `profile` | — | The Shelf |

**Cut (12):** `uploaded-result`, `uploaded-blocked`, `free-scan-sim`, `halo-gate`,
`before-after`, `review-map`, `proto-cards`, `staged-reveal`, `menu-reveal`, `vault`,
`ceremony`, and the dev-nav rail.

### Pages — six prototypes are live right now

`git ls-files "*.html"` at root returns eight. **Two belong in public** (`index.html`,
`codex.html`). The other six are committed and therefore reachable today:

```
arcana-name-harness.html   arrow-orbit-test.html   compass-wheel.html
dev-live.html              fortune-wheel.html      fortune-wheel-black.html
```

The build copies an explicit allow-list of files. Nothing is excluded by pattern —
**a new prototype is invisible to the build by default**, which is the correct failure
direction.

### Controls that must not ship

- the **M1 A/B toggle** (`data-m1-variant`) — its own comment says "remove it once the
  variant is chosen"; BR-S260 chose it
- the **dev-nav rail** (`?devnav=1`)
- `?m2=dark`, `?orbit=wings`, `?tilt=0`, `?edge=hard` and every other tuning parameter

---

## 4. Personal data: the fixture rule

The builder wants their own reading available in the workshop. That is reasonable and it
is also exactly how BR-S347 happened.

```
br-fixture.js        gitignored, workshop only. Real names, real dates.
                     Absent  ->  the neutral sample identities ship.
```

- `arcana-reading.js`, `arcana-profile.js` read the fixture **if present** and fall back
  to `The Seeker / 1 January 2000` when it is not.
- `build_public.py` **never copies it**, and asserts it is absent from the output.
- The fallback is what is committed, so a fresh clone is already clean.

---

## 5. The gate — a failed build beats a live leak

Before writing anything, the generator greps the assembled output against a denylist and
**exits non-zero** on any hit. Nothing is deployed by a build that did not run.

| check | fails on |
|---|---|
| identity | the builder's name, the second person's name, the email, the home town |
| birth data | `birth~` seeds containing anything but the sample identities |
| dev routes | any `?dev=` value outside the public list, in any shipped file |
| dev controls | `data-m1-variant`, `devnav`, `?m2=`, `?tilt=`, `?orbit=` |
| repo | `github.com/`, any `mailto:` |
| dates | `\b(19|20)\d{2}~\d{1,2}~\d{1,2}\b` outside the sample seed |

Case-insensitive, all of them. **BR-S347's predecessor audit reported clean because its
regex was case-sensitive** while uppercase leftovers were live. That mistake is now a
line in the gate.

Run the same gate as a **pre-push hook** and in CI, so it fires even when nobody ran the
build.

---

## 6. Shape of the generator

```
build_public.py
  1. clean  dist/
  2. copy   the file allow-list (js, css, assets actually referenced)
  3. emit   index.html with the dev scripts and dev markup stripped
  4. write  the public room allow-list into the app
  5. run    build_routes.py against dist/index.html for /tarot/ /reading/
            /roadmap/ /about/
  6. GATE   grep the denylist over every file in dist/; exit 1 on any hit
  7. report what shipped, what was cut, and the byte delta
```

Step 7 matters: a build that silently drops something is the same class of problem as
one that silently ships something.

---

## 7. The one thing that breaks

**Removing M1 orphans U1.** U1 is a section of the long desk page and `/about/` boots the
menu and seats it there. If M1 leaves the public build, `/about/` has nothing to seat.

Current thinking (BR-S344 onward): M2 becomes the boot panel and M1 becomes a slide you
travel to — so M1 **stays in the build** but stops being the front door. U1 keeps its
host and its address. This also addresses the measured M1→M2 lag, since M1 carries ~100%
of the paint weight (BR-S276) and would no longer be painted first.

**Open question for the builder:** does Public keep
`nilsjouna999.github.io/blue-room-scan-room`, or move to a domain / differently-named
repo? The answer decides the deploy target and whether today's URL keeps working — and
the current URL contains the builder's username, which the same privacy pass would
otherwise have removed.

---

## 8. Order of work

1. the fixture split + neutral fallbacks *(half done — BR-S347 shipped the fallbacks)*
2. the gate, as a standalone script — **useful before the build exists** *(DONE — BR-S355,
   `gate_public.py`. `--selftest` proves every pattern fires; `--audit` gates the workshop
   tree and today returns **135 hits across 5 checks** — that list is what step 3 must
   strip. The identity strings live in gitignored `gate_identity.txt`; without it the gate
   exits 2 rather than passing a weaker check. Identity hits on the tracked tree: **zero**,
   which is BR-S347 verified rather than asserted.)*
3. `build_public.py` steps 1–5
4. wire the gate in as step 6, plus the pre-push hook
5. sandbox: serve `dist/` locally and walk it
6. deploy target + make the workshop repo private
