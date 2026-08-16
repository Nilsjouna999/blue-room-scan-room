# BLUE ROOM — THE PUBLIC BUILD
#
# Generates dist/ — the site the public sees — from this workshop repo.
# Spec: docs/BUILD_PUBLIC_SPEC_V1.md.  Gate: gate_public.py (step 6, run at the end).
#
# THE ONE IDEA. This is a static site, so the only way to not ship a file is to not copy
# it. Everything here is an ALLOW-LIST: a file that nobody named is invisible to the
# build. A new prototype dropped at the repo root does not reach dist/ by default, which
# is the correct direction to fail in.
#
# WHAT IT DOES TO app.js. Three anchored edits, each asserted:
#   1. the ?dev= resolver array is rewritten to the public rooms, so a cut room no longer
#      RESOLVES — typing ?dev=vault lands on the menu. This is the actual lock.
#   2. the mountDev branches for cut rooms are removed by brace-matching from their exact
#      `if (state.dev === "x") {` anchor.
#   3. the four render functions those branches were the only callers of are removed the
#      same way, so their markup and their ?dev= links go too.
# Anything more entangled (the devnav rail, the uploaded-scan harness) is LEFT IN and the
# gate reports it. A build that quietly half-removes something is worse than one that
# tells you what it could not reach.
#
# USAGE
#   python build_public.py            build dist/, then gate it
#   python build_public.py --no-gate  build only (for debugging a failing gate)

import io, os, re, shutil, subprocess, sys

ROOT = os.path.dirname(os.path.abspath(__file__))

# BR-S378 — TWO PUBLIC OUTPUTS, not one. Same transform, one difference: `preview/`
# keeps the dev⇄preview⇄live flip so the builder can compare the three standing in the
# same place, and `live/` has it cut out, because a launch site must not carry a
# labelled door into the workshop. Both sit beside the dev site rather than replacing
# it, so the three are three URLs on one Pages deploy. They are BUILD OUTPUT that is
# committed on purpose — a static host can only serve what is in the repo.
# ★ BR-S396 — WHAT EACH BUILD IS FOR. The builder's rule, and it is the law this file
# should be read against:
#
#   dev      (/)          EVERYTHING. Every room, every ?dev= route, ambiguous ideas
#                         included. Nothing is hidden from the workshop.
#   preview  (/preview/)  WHERE SEMI-FINISHED WORK IS CONNECTED INTO A COHERENT PAGE.
#                         Anything not launch-cleared belongs HERE — not cut, not live.
#   live     (/live/)     MASTERCLASS QUALITY ONLY. If it is not finished to that bar,
#                         it does not appear.
#
# ★ BR-S485 — THE THIRD TIER EXISTS NOW. PREVIEW_ONLY (below) is the list this note spent
# two sessions asking for: files kept in preview/ and cut from live/, tag and all. It was
# built the moment an unfinished surface reached the launch build, which is what the rule
# was written to prevent.
#
# STILL OUTSTANDING, and each is a judgement about what the public site publishes rather
# than a mechanism that is missing:
#   · the vision room, currently in CUT_ROOMS (semi-finished: a draft text and a
#     POST_TARGET of null) — under the rule it is preview/ material, not dev-only
#   · the gate hits that fail live/ today: the dev-nav, the dev-route links, the M1 A/B
#     toggle and the tuning params. The dev-nav and the tuning params are workshop tools
#     and belong to dev alone; the M1 toggle's own comment says to remove it once chosen.
#
# (folder, is_preview — drives PREVIEW_ONLY, and nothing else)
VARIANTS = [("preview", True), ("live", False)]

# Set per variant by build(); every helper writes through it.
DIST = os.path.join(ROOT, "preview")

# The rooms the public app is allowed to resolve. Written INTO the app — not a runtime
# check a URL can walk around.
PUBLIC_ROOMS = ["drawing-room", "arcane", "arcana-reading", "settings", "profile"]

# The rooms cut from the resolver, and whose mountDev branches are deleted.
# BR-S381: "vision" joins this list, and it is the one entry here that is expected to
# LEAVE it. The room is built and the U1 boxes point at it, but its first section — the
# vision itself — is empty until the builder writes it, and a public page headed "What
# this is for" that answers "not written yet" is worse than no page. It ships the day
# VISION has paragraphs in it: delete it here, add it to PUBLIC_ROOMS, drop u1Aside and
# the two render functions from the cut lists below.
CUT_ROOMS = ["uploaded-result", "uploaded-blocked", "free-scan-sim", "halo-gate",
             "before-after", "review-map", "proto-cards", "staged-reveal", "menu-reveal",
             "vault", "ceremony", "vision"]

# The U1 boxes that open that room. Cut with it, or the public roadmap grows a third
# track whose two doors both fall through to the menu.
ASIDE_CALL = "        cols.push(u1Aside());\n"

# BR-S376 — THE PROFILE GATE, public build only.
# The Profile is a members' page: M3 shows the sealed "Held in conservation" niche until
# a reading is kept (renderReliquaryTeaser / renderReliquaryOpen, chosen by hasHoldings()).
# But "profile" is a plain entry in the ?dev= resolver, so typing the URL walks straight
# past that door. The DEV app keeps it open on purpose — the builder works in both states
# and needs to see them. The PUBLIC app must not, so the guard is added here, at build
# time, rather than as a runtime flag that would also lock the builder out.
# Sends the visitor to the sealed niche itself (#reliquary is M3's hash, app.js:3333),
# not to a dead end — the door and the route then tell the same story.
PROFILE_MOUNT = ('    if (window.BRArcanaProfile && typeof window.BRArcanaProfile.mount '
                 '=== "function") window.BRArcanaProfile.mount(host);')
PROFILE_GUARD = ('    // Public build: the Profile opens only once something is kept.\n'
                 '    if (!hasHoldings()) { location.replace("./#reliquary"); return; }\n')

# ★ BR-S486 — THE FLIP IS NO LONGER CUT, AND THIS IS THE ONE PLACE THAT SAYS WHY.
# BR-S378 cut the build pill from live/ so a launch site would not carry a labelled door
# into the workshop. The cost was that clicking "live" was a one-way trip — the control
# that took you there did not exist once you arrived. The builder's requirement is both
# halves at once: the buttons stay while inspecting, and the real launch site has none.
#
# The three builds share an ORIGIN, so they share a localStorage, so the builder's dev
# flag is readable from inside live/. The pill therefore ships everywhere and renders
# only for the builder (app.js#brFlipVisible). The guarantee moves from build time to
# run time, which is weaker, and that is accepted for THIS control alone because its
# entire content is three links to three already-public directories — a flag that fails
# open leaks nothing. Anything carrying a secret stays in CUT_ROOMS / PREVIEW_ONLY.
#
# What replaced the cut is a PROBE that the gate exists (see PROBES). Deleting the guard
# now fails the build, which is the property the cut was really providing.
# The FLIP_CALL / FLIP_FUNCTIONS / FLIP_CSS_* anchors and cut_flip() are gone with it:
# an anchor kept for a cut nobody performs is a re-anchoring chore forever, paid on every
# edit to a block the build no longer touches.

# ★★ BR-S488 — THE M3 PREVIEW TOGGLE IS REMOVED FROM THE BUILD, NOT GATED INSIDE IT.
#
# BR-S484 gated `reliqPreviewToggle` behind the dev flag, which stopped a visitor seeing
# the control. An audit then showed the gate is not a boundary: the dev flag is settable
# from a URL param, from localStorage, AND from an unauthenticated backtick keypress on
# the launch build itself. Two clicks after that keypress still reach the fabricated
# sample profile. The impact is bounded — the data is a hardcoded mock, not anyone's
# record — but the shape is wrong, and BR-S486's own note reasoned that the flag "fails
# open leaks nothing" on the strength of the pill's three links, without accounting for
# what else the same flag un-gates.
#
# So the rule this file already states is applied instead: a static site can only hide
# what it never copies. The callers are stripped, then the functions are cut, and the
# build's existing "no live reference survives" assert proves it.
#
# The ?holdings= writer goes too. Gating the visible control and leaving a URL that sets
# the same flag was exactly the door/window pairing BR-S486 claimed to have closed.
PUBLIC_STRIPS = [
    ("    + reliqPreviewToggle(false)\n", ""),
    ("    + reliqPreviewToggle(true)\n", ""),
    ('  host.removeEventListener("click", onReliqPreviewClick);'
     '   // BR-S230: M3 preview state toggle — single-bind across remounts\n'
     '  host.addEventListener("click", onReliqPreviewClick);\n', ""),
    ('  const hp = DEVNAV ? raw : null;\n'
     '  if (hp === "1") localStorage.setItem("br_holdings", "1");\n'
     '  else if (hp === "0") localStorage.removeItem("br_holdings");\n',
     "  // Public build: no code path here can write the holdings flag.\n"),
    # The dev rail's own holdings flip. Its BUTTON is already gone from the public
    # builds — transform_index strips the rail's markup — so this is unreachable rather
    # than dangerous. It is stripped anyway, because "the trigger does not ship" is a
    # weaker claim than "the writer does not exist", and the whole point of this pass
    # was that the weaker claim is the one that kept being wrong.
    # BR-S498: re-anchored — the flip now reloads instead of remounting, because the ROOMS
    # registry derives the Profile door from this same flag and a remount would leave the
    # two surfaces disagreeing. The guard caught the edit and refused to build, which is
    # the behaviour it was written for: an anchor that drifts must stop the build, not
    # quietly ship the writer it exists to remove.
    ('  else if (kind === "holdings") { try { localStorage.getItem("br_holdings") === "1"'
     ' ? localStorage.removeItem("br_holdings") : localStorage.setItem("br_holdings", "1"); }'
     ' catch (e) {} location.reload(); return; }',
     '  // Public build: the dev rail\'s holdings flip is not part of it.'),
]

# Top-level functions reachable ONLY from a cut branch. Verified one call site each, all
# inside a removed branch — re-verify with `grep -c` before adding to this list.
# BR-S488: the two M3 preview functions join it, their callers stripped just above.
CUT_FUNCTIONS = ["renderProtoCards", "renderVault", "wireVault", "renderReviewMap",
                 "renderBeforeAfter", "renderHaloGateMock", "renderUploadedScanResultDev",
                 "renderVision", "wireVision", "u1Aside",
                 "reliqPreviewToggle", "onReliqPreviewClick"]

# mountDev's tail is the fallthrough for ?dev=uploaded-result / uploaded-blocked. With
# both rooms cut it is unreachable, but it is a STATEMENT rather than an if-block, so the
# branch remover cannot see it. Anchored and asserted like everything else.
MOUNTDEV_TAIL = '  const result = state.dev === "uploaded-blocked"'

# The files the public site is made of. Nothing is copied by pattern.
COPY_FILES = [
    "codex.html",
    # stylesheets
    "styles.css", "arcane.css", "arcana-profile.css", "arcana-reading.css",
    "settings.css",
    # scripts
    "data.js", "scan-contract.js", "arcane.js", "arcana-reading.js", "arcana-profile.js",
    "drawing-room.js", "settings.js", "app.js",
    # data banks — arcana-reading.js fetches these three at runtime
    "codex-data.json",
    "arcana-build/kb_compact.json", "arcana-build/practical.json",
    "arcana-build/kwcolor.json",
    # reveal/ SHIPS. It looks like a dev surface — it was built for ?dev=staged-reveal —
    # but BR-S150 promoted the develop ceremony to the LIVE menu entrance, and
    # renderMenu's wireMenuReveal calls window.BRReveal. Cutting it silently kills the
    # front door's entrance. Only the two ?dev= routes onto it are cut.
    "reveal/reveal.css", "reveal/readings.data.js", "reveal/arrow-button.js",
    "reveal/card-frame.js", "reveal/reading-panel.js", "reveal/warning-modal.js",
    "reveal/stage-controller.js",
    # BR-S430 — the two overlay modules index.html loads. They were referenced by every
    # host and copied to none, so preview/ and live/ 404'd on them from the moment
    # BR-S427 added the tag. A file in the <head> that the build does not carry is a
    # broken host, not a missing feature.
    "_codex-membrane.js", "_six-live.js", "_rooms-u1.js", "_whats-coming.js",
    "_codex-perks.js",
    # BR-S484 — U1's middle. index.html loads it, so leaving it off this list would ship
    # the same broken host the note above describes.
    "_u1-rack.js",
    # BR-S487 — the M2 case prototype. The .css is fetched BY the .js rather than by a
    # tag, so it has no index.html reference to strip — it still has to be copied, and
    # still has to be kept out of live/, which is why both are named in both lists.
]

# <head>/<body> lines pulled out of index.html: the surfaces those files serve are cut.
STRIP_TAGS = ["ceremony.css", "ceremony.js"]

# ★ BR-S485 — THE THIRD TIER, FINALLY BUILT. The note at the top of this file has said
# since BR-S396 that the builder's rule needs a PREVIEW_ONLY list — semi-finished work
# kept in preview/ and cut from live/ — and that without it "today preview/ and live/
# differ by ONE thing, the build flip; everything else ships to both". That gap shipped
# an unfinished surface to the launch build, which is the failure the rule exists to
# prevent, so here is the list.
#
# A FILE ON THIS LIST IS NOT COPIED TO live/, AND ITS TAG IS PULLED FROM live/index.html.
# Both halves are required and neither is optional: copying it without the tag ships dead
# weight, and pulling the tag without the copy is fine — but copying nothing while LEAVING
# the tag is a 404 in the <head> of the launch site, which is exactly the broken host the
# COPY_FILES note above records. The probe table asserts the absence, so a file that
# quietly starts shipping again fails the build.
#
# Note what is NOT here. The vision room stays in CUT_ROOMS and the gate's standing hits
# (the dev-nav, the dev-route links, the M1 A/B toggle, the tuning params) stay where they
# are. Each is a judgement about what the public site publishes and each deserves its own
# look, rather than being swept in behind a mechanism that was added for one file.
PREVIEW_ONLY = ["_u1-rack.js"]

# ★★ BR-S492 — DEV ONLY. THE PROTOTYPES ARE NOT PUBLISHED ANYWHERE.
# The builder: "do not ship prototypes just build."
#
# The four M2 treatment prototypes (the case, the GPT vitrine, the pod, and the shared
# mounter/bench) were on the copy list as preview-only. That was the wrong tier for
# them, and this file's own rule says why: preview/ is "where semi-finished work is
# CONNECTED into a coherent page". Four competing answers to one question, behind a URL
# switch, with a bench of toggles for comparing them, is not connected work — it is the
# workshop, and the workshop is what dev/ is for.
#
# A file on this list is never copied to ANY public build, and its tag is pulled from
# both index.html outputs. It exists at the repo root, it runs on the dev site, and it
# reaches nobody. The probe table asserts the absence in both directions so a prototype
# that quietly starts shipping again fails the build.
#
# THIS IS NOT A CUT. Nothing is deleted and nothing is disabled: every prototype still
# stands at its own ?case= switch on the dev site, which is where they are looked at.
#
# BR-S504 adds U1's rebuilt room, and it is worth naming why it lands on THIS tier and
# not the one below it. The surface it replaces is preview-only, so preview-only would
# have looked like the matching choice. But the two would then stand in the same build
# driving the same section, which is the collision the module's own header opens by
# closing — and a prototype that has never been in front of the builder's eyes has not
# earned a build a visitor can walk into. It graduates by moving one line down to
# PREVIEW_ONLY, and the surface it supersedes moves up here on the same commit.
DEV_ONLY = ["_m2-box.js", "_m2-box.css", "_m2-vitrine.css", "_m2-pod.css",
            "_u1-room.js", "_u1-room.css"]

# Links into a room this build removed. Deleting the LISTENER leaves a button that looks
# alive and does nothing, which is worse than a dead link — so these are re-pointed at the
# nearest public room, not cut. (from, to) pairs, both asserted present/absent.
DEAD_LINK_REWRITES = [
    # The menu entrance's right-edge handoff went to the example Vault (?dev=vault, cut).
    # The Shelf it was an example OF is the Profile, which ships — so the button keeps its
    # meaning instead of losing its handler.
    ('if (fwd) fwd.addEventListener("click", function () { location.href = "?dev=vault"; });',
     'if (fwd) fwd.addEventListener("click", function () { location.href = "?dev=profile"; });'),
]

# BR-S484 — THE PROBE TABLE, MOVED IN FROM THE COCKPIT.
#
# The cockpit (deleted at BR-S480, three things doing one job) tiled the three builds in
# iframes and asked each rendered page a short list of direct questions, because you
# cannot see the absence of a dev control in a thumbnail. That was its one good idea and
# it died with it. Here it is again as a build step, so the question is asked on every
# build instead of whenever someone remembers to open a page and look.
#
# WHY THIS IS NOT COVERED BY THE ASSERTS ABOVE. Those are one-way: each proves a cut
# HAPPENED. Nothing proved the opposite direction — that what the build is supposed to
# KEEP survived the cutting. A regex re-anchored slightly wide takes the card, the marks
# or the specimen panel out of `live/` and every existing assert still passes, because
# every existing assert is about removal. Half this table is `True`, and that half is the
# new coverage.
#
# THE HONEST LIMIT. These are text probes over the built files, not DOM probes over a
# rendered page — the cockpit had a browser and this does not. So this catches a control
# whose SOURCE did not ship, not one that ships and is drawn anyway by code the build
# left in. The dev-nav is exactly that case: its markup is stripped from index.html
# (asserted in transform_index) but its render function is deliberately left in app.js,
# so what is proven below is that the markup is gone, not that nothing can redraw it.
# Closing that needs the browser battery, not this file.
#
# (label, file inside the build, regex, {variant: must-be-present})
PROBES = [
    ("dev-nav rail",   "index.html",   r'class="devnav"',     {"preview": False, "live": False}),
    # BR-S486 — the pill ships to BOTH now, so the meaningful assertion moved: not
    # "is it absent from live" but "is the gate that hides it from a visitor still
    # there". Deleting brFlipVisible() is what would put buttons on the launch site,
    # and that is the failure this pair exists to catch.
    ("build pill",     "app.js",       r"\bbrBuildFlip\b",       {"preview": True, "live": True}),
    ("pill gate",      "app.js",       r"function brFlipVisible", {"preview": True, "live": True}),
    ("the card",       "app.js",       r"\bm2hero\b",         {"preview": True,  "live": True}),
    ("six marks",      "app.js",       r"\bm2bface__marks\b", {"preview": True,  "live": True}),
    ("specimen panel", "_six-live.js", r"\bsx-",              {"preview": True,  "live": True}),
    ("roadmap box",    "app.js",       r"\brmpop\b",          {"preview": True,  "live": True}),
    # BR-S485 — both halves of the preview-only cut, stated separately. The module and
    # the tag that loads it fail independently, and the pairing that actually hurts is
    # "tag kept, file cut" — a 404 in the launch site's own <head>.
    ("U1 rack",        "_u1-rack.js",  r"\bu1rack__vp\b",     {"preview": True,  "live": False}),
    ("U1 rack tag",    "index.html",   r"_u1-rack\.js",       {"preview": True,  "live": False}),
    # BR-S492 — the prototypes are dev-only, so every one of these is ABSENT everywhere.
    # Asserting a negative in both builds is the whole point: this is the direction the
    # build has never been able to check, and it is the direction a prototype leaks in.
    ("M2 mounter",     "_m2-box.js",     r"\bm2box__cavity\b", {"preview": False, "live": False}),
    ("M2 case css",    "_m2-box.css",    r"\.m2box__cavity\b", {"preview": False, "live": False}),
    ("M2 vitrine css", "_m2-vitrine.css", r"\.br-vitrine\b",   {"preview": False, "live": False}),
    ("M2 pod css",     "_m2-pod.css",    r"\.m2pod__cavity|\.m2pod\b", {"preview": False, "live": False}),
    ("M2 mounter tag", "index.html",     r"_m2-box\.js",       {"preview": False, "live": False}),
    # BR-S504 — U1's rebuilt room, same tier and the same three assertions: the
    # mechanism, its stylesheet, and the tag. The tag matters most of the three here,
    # because this one loads FIRST in the block and a tag left behind by a cut file
    # would 404 ahead of everything under it.
    ("U1 room js",     "_u1-room.js",    r"\bu1rm__marks\b",   {"preview": False, "live": False}),
    ("U1 room css",    "_u1-room.css",   r"\.u1rm__marks\b",   {"preview": False, "live": False}),
    ("U1 room tag",    "index.html",     r"_u1-room\.js",      {"preview": False, "live": False}),
]

# Emitted by build_routes.py's ROUTES; re-emitted here against dist/index.html.
sys.path.insert(0, ROOT)


def _match_block(src, start):
    """End index of the {...} block whose first { is at or after `start`. Brace-matched,
    with string and comment literals skipped — a naive counter trips on a { inside a
    template literal, and app.js is full of markup strings."""
    i = src.index("{", start)
    depth, n = 0, len(src)
    while i < n:
        c = src[i]
        if c in "\"'`":
            q, i = c, i + 1
            while i < n:
                if src[i] == "\\":
                    i += 2
                    continue
                if src[i] == q:
                    break
                i += 1
        elif c == "/" and i + 1 < n and src[i + 1] == "/":
            i = src.find("\n", i)
            if i < 0:
                return n
        elif c == "/" and i + 1 < n and src[i + 1] == "*":
            i = src.find("*/", i) + 1
        elif c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                return i + 1
        i += 1
    raise ValueError("unbalanced braces from offset %d" % start)


def _code_only(src):
    """`src` with comments blanked, so a function name mentioned in app.js's own
    table-of-contents header is not mistaken for a call that would throw."""
    out, i, n = [], 0, len(src)
    while i < n:
        c = src[i]
        if c in "\"'`":
            q, j = c, i + 1
            while j < n:
                if src[j] == "\\":
                    j += 2
                    continue
                if src[j] == q:
                    break
                j += 1
            out.append(src[i:j + 1])
            i = j + 1
        elif c == "/" and i + 1 < n and src[i + 1] == "/":
            j = src.find("\n", i)
            j = n if j < 0 else j
            out.append("\n" * src.count("\n", i, j))
            i = j
        elif c == "/" and i + 1 < n and src[i + 1] == "*":
            j = src.find("*/", i)
            j = n if j < 0 else j + 2
            out.append("\n" * src.count("\n", i, j))
            i = j
        else:
            out.append(c)
            i += 1
    return "".join(out)


def transform_app(src, report, is_preview=True):
    # 1. the resolver — the lock
    m = re.search(r'if \(\[("(?:[a-z-]+)"(?:,\s*"[a-z-]+")+)\]\.includes\(dev\)\)', src)
    if not m:
        sys.exit("build_public: app.js's ?dev= resolver array no longer matches. It is the "
                 "whole security model, so this fails rather than shipping an unlocked app. "
                 "Re-anchor the regex here against the current app.js line.")
    old = m.group(1)
    new = ", ".join('"%s"' % r for r in PUBLIC_ROOMS)
    src = src[:m.start(1)] + new + src[m.end(1):]
    report.append("resolver: %d rooms -> %d" % (old.count(",") + 1, len(PUBLIC_ROOMS)))

    # 2. the mountDev branches for cut rooms
    for room in CUT_ROOMS:
        anchor = 'if (state.dev === "%s")' % room
        while anchor in src:
            i = src.index(anchor)
            j = _match_block(src, i)
            line_start = src.rfind("\n", 0, i) + 1
            src = src[:line_start] + src[j + 1:]
            report.append("branch removed: ?dev=%s" % room)

    # 2a. one-line guards on a cut room — `if (state.dev === "vault" && ...) doThing();`
    # is a statement, not a block, so the brace matcher above cannot see it. NOTE: `grep`
    # calls app.js a binary file and stops early, which hid this line; the removals here
    # are found by reading the file, never by grepping it.
    kept = []
    for line in src.splitlines(True):
        code = _code_only(line).strip()
        hit = next((r for r in CUT_ROOMS if 'state.dev === "%s"' % r in code), None)
        if hit and code.endswith((";", "}")) and not code.startswith("const"):
            report.append("guard removed: one-line %s check" % hit)
            continue
        kept.append(line)
    src = "".join(kept)

    # 2a-ii. links into a room this build removed, re-pointed at a public one
    for dead, live in DEAD_LINK_REWRITES:
        if dead not in src:
            sys.exit("build_public: a DEAD_LINK_REWRITES anchor is no longer in app.js:\n"
                     "    %s\nEither it was fixed upstream (drop the pair) or it was "
                     "reworded (re-anchor it)." % dead[:90])
        src = src.replace(dead, live)
        assert dead not in src and live in src
        report.append("dead link re-pointed: %s" % live[live.index("?dev="):].split('"')[0])

    # 2a-ii-b. BR-S488 — strip the callers of the M3 preview toggle and the ?holdings=
    # writer, BEFORE the function cut below, so "no live reference survives" can prove
    # the removal instead of tripping on it. Each pair is asserted present: a strip that
    # silently matched nothing would ship the exact code it exists to remove.
    for dead, live in PUBLIC_STRIPS:
        if dead not in src:
            sys.exit("build_public: a PUBLIC_STRIPS anchor is no longer in app.js:\n"
                     "    %s\nThis would ship the M3 preview toggle or the holdings "
                     "writer to the public builds, so it fails instead. Re-anchor it."
                     % dead.strip()[:90])
        src = src.replace(dead, live)
        report.append("stripped: %s" % dead.strip().split("\n")[0][:64])

    # 2a-iii. the Profile gate (see PROFILE_GUARD). Fails the build rather than shipping
    # an ungated members' page, on the same principle as the resolver above.
    if PROFILE_MOUNT not in src:
        sys.exit("build_public: the ?dev=profile mount line no longer matches, so the "
                 "Profile gate cannot be placed. This would ship the members' page to "
                 "anyone who types the URL, so it fails instead. Re-anchor PROFILE_MOUNT "
                 "against the current app.js.")
    if "function hasHoldings(" not in src:
        sys.exit("build_public: hasHoldings() is gone from app.js — the Profile gate has "
                 "nothing to ask. Re-anchor the gate against whatever replaced it.")
    src = src.replace(PROFILE_MOUNT, PROFILE_GUARD + PROFILE_MOUNT, 1)
    assert 'location.replace("./#reliquary")' in src
    report.append("gate added: ?dev=profile now requires holdings (public build only)")

    # 2b. mountDev's uploaded-scan fallthrough, now unreachable
    if MOUNTDEV_TAIL not in src:
        sys.exit("build_public: mountDev's uploaded-scan tail no longer starts with the "
                 "anchored line. Re-anchor MOUNTDEV_TAIL against the current app.js.")
    i = src.index(MOUNTDEV_TAIL)
    end = src.index("renderUploadedScanResultDev(result);", i)
    end = src.index("\n", end) + 1
    src = src[:i] + "  // The uploaded-scan harness is not part of the public build.\n" + src[end:]
    report.append("branch removed: mountDev's uploaded-scan fallthrough")

    # 2c. the U1 aside's CALL, before its function is cut below — otherwise the "no live
    # reference survives" check fires on a call site this build meant to remove.
    # BR-S457: renderAbout no longer lays out the roadmap board at all — the room list and
    # the roadmap both left U1 — so there may be no call site to strip. That is a legitimate
    # state, not a drift, and the guard must tell the two apart or it either blocks a correct
    # build or waves through the failure it exists for.
    #
    # The guard's REAL question was never "does this exact string appear" — it was "will a
    # live call to u1Aside() survive into a build that cuts the room it opens". So ask that:
    # the anchor missing is fine ONLY IF no call to u1Aside() remains anywhere outside its
    # own definition. If a call is still there under different whitespace, that is exactly
    # the drift the guard was written for and it stays fatal.
    if ASIDE_CALL in src:
        src = src.replace(ASIDE_CALL, "")
        report.append("U1: the vision / idea boxes removed with the room they open")
    else:
        stray = [m.start() for m in re.finditer(r"u1Aside\s*\(", src)]
        defn = re.search(r"function\s+u1Aside\s*\(", src)
        calls = [p for p in stray if not (defn and p == defn.start() + len("function "))]
        if calls:
            sys.exit("build_public: ASIDE_CALL did not match, but %d call(s) to u1Aside() "
                     "remain in app.js. That would leave the public roadmap with a track "
                     "opening a room this build removes. Re-anchor ASIDE_CALL." % len(calls))
        report.append("U1: no u1Aside() call site — renderAbout no longer builds the board")

    # 3. the functions those branches were the only callers of
    for fn in CUT_FUNCTIONS:
        anchor = "function %s(" % fn
        if anchor not in src:
            sys.exit("build_public: %s is not in app.js — the cut list is stale." % fn)
        i = src.index(anchor)
        j = _match_block(src, i)
        line_start = src.rfind("\n", 0, i) + 1
        src = src[:line_start] + src[j + 1:]
        report.append("function removed: %s()" % fn)
        # A leftover mention in a COMMENT is prose, not a call. A leftover mention in code
        # is a ReferenceError waiting on the live site, so that one is fatal.
        live = [ln for ln in _code_only(src).splitlines() if re.search(r"\b%s\b" % fn, ln)]
        if live:
            sys.exit("build_public: %s still has %d live reference(s) after removal — it "
                     "would throw at runtime:\n    %s" % (fn, len(live), live[0].strip()[:90]))

    # 4. BR-S486: the flip is no longer cut from either build. It ships to all three and
    # renders only for the builder — see the note beside PREVIEW_ONLY, and the probe that
    # asserts the gate is still there.

    # the asserts that make a bad build fail here rather than on the live site
    for room in CUT_ROOMS:
        assert 'state.dev === "%s"' % room not in src, room
    assert '"%s"' % PUBLIC_ROOMS[0] in src
    for room in CUT_ROOMS:
        assert '"%s", "' % room not in src.split("includes(dev)")[0][-400:], room
    return src


def transform_index(src, report, is_preview=True):
    # Match the href/src VALUE, never the whole line: styles.css's cache-bust comment
    # mentions reveal/stage-controller.js, and a substring test drops the site's main
    # stylesheet on the strength of a footnote.
    # BR-S485: for live/, the preview-only files' tags go with the files themselves.
    # BR-S492: the dev-only prototypes' tags go from BOTH builds, for the same reason —
    # a tag whose file was never copied is a 404 in the public site's own <head>.
    drop = list(STRIP_TAGS) + list(DEV_ONLY) + ([] if is_preview else list(PREVIEW_ONLY))
    out = []
    for line in src.splitlines(True):
        ref = re.search(r'(?:src|href)="([^"]+)"', line)
        if ref and any(t in ref.group(1) for t in drop):
            report.append("index.html: dropped %s" % ref.group(1))
            continue
        out.append(line)
    src = "".join(out)

    # the dev-nav rail's markup. The rail is JS-gated, but an empty <nav> in the public
    # page is a signpost to a door that should not be visible at all.
    src = re.sub(r'[ \t]*<!-- DEV NAV.*?-->\s*<nav class="devnav".*?</nav>\n', "",
                 src, flags=re.S)
    assert 'class="devnav"' not in src, "the dev-nav markup survived the strip"
    report.append("index.html: dev-nav rail removed")

    # assert on what the page actually LOADS, not on what its comments mention
    loaded = re.findall(r'(?:src|href)="([^"]+)"', src)
    for t in drop:
        assert not any(t in u for u in loaded), t
    return src


def copy_tracked_assets(report):
    out = subprocess.check_output(["git", "ls-files", "assets"], cwd=ROOT)
    files = [f for f in out.decode("utf-8").splitlines() if f.strip()]
    for rel in files:
        src = os.path.join(ROOT, rel)
        if not os.path.isfile(src):
            continue
        dst = os.path.join(DIST, rel)
        d = os.path.dirname(dst)
        if not os.path.isdir(d):
            os.makedirs(d)
        shutil.copy2(src, dst)
    report.append("assets: %d tracked files copied (untracked scratch never reaches dist/)" % len(files))
    return len(files)


def emit_routes(report):
    """build_routes.py's ROUTES, re-emitted against dist/index.html. Imported rather than
    re-listed, so a route added there is not silently missing from the public build."""
    from build_routes import ROUTES
    src = io.open(os.path.join(DIST, "index.html"), encoding="utf-8").read()
    for path, room, _label in ROUTES:
        if room not in PUBLIC_ROOMS and room != "about":
            report.append("route SKIPPED: /%s/ names the cut room %s" % (path, room))
            continue
        out = src.replace("<head>", '<head>\n  <base href="../" />', 1)
        out = out.replace('<script src="data.js',
                          '<!-- GENERATED by build_public.py -- do not edit. -->\n'
                          '  <script>window.BR_ROOM = "%s";</script>\n'
                          '  <script src="data.js' % room, 1)
        assert "?dev=" not in out.split("</head>")[0], path
        d = os.path.join(DIST, path)
        if not os.path.isdir(d):
            os.makedirs(d)
        io.open(os.path.join(d, "index.html"), "w", encoding="utf-8", newline="").write(out)
        report.append("route: /%s/ -> %s" % (path, room))


def probe_build(folder, report):
    """Ask the finished build the cockpit's questions. Every mismatch is collected before
    anything exits, because "the pill is still in live/" and "the card is gone from live/"
    are different emergencies and seeing one should not hide the other."""
    failures = []
    for label, rel, pattern, want in PROBES:
        expected = want[folder]
        path = os.path.join(DIST, rel)
        if not os.path.isfile(path):
            # A file that is not there at all is the STRONGEST form of absent, so for a
            # preview-only cut this is the pass, not an error. Only an expected-present
            # file going missing is a failure.
            if not expected:
                continue
            failures.append("%-14s %s was never written to %s/" % (label, rel, folder))
            continue
        found = re.search(pattern, io.open(path, encoding="utf-8").read()) is not None
        if found != expected:
            failures.append("%-14s expected %s in %s/%s, found %s"
                            % (label, "PRESENT" if expected else "ABSENT", folder, rel,
                               "present" if found else "absent"))
    if failures:
        sys.exit("build_public: %s/ failed %d probe(s) — the build is not what it claims "
                 "to be, so it fails here rather than on the host:\n    %s"
                 % (folder, len(failures), "\n    ".join(failures)))
    report.append("probes: %d/%d as expected for %s/" % (len(PROBES), len(PROBES), folder))


def build(folder="preview", is_preview=True):
    global DIST
    DIST = os.path.join(ROOT, folder)
    report = []
    if os.path.isdir(DIST):
        shutil.rmtree(DIST)
    os.makedirs(DIST)

    src_bytes = 0
    for rel in COPY_FILES:
        src = os.path.join(ROOT, rel)
        if not os.path.isfile(src):
            sys.exit("build_public: %s is on the copy list but not in the repo." % rel)
        # BR-S485 — the third tier. Checked AFTER the exists test on purpose: a
        # preview-only file that has been deleted is still a stale list, and skipping
        # it here would hide that from the one build that does not carry it.
        if not is_preview and rel in PREVIEW_ONLY:
            report.append("preview-only: %s kept out of live/" % rel)
            continue
        dst = os.path.join(DIST, rel)
        d = os.path.dirname(dst)
        if d and not os.path.isdir(d):
            os.makedirs(d)
        if rel == "app.js":
            text = io.open(src, encoding="utf-8").read()
            before = len(text)
            text = transform_app(text, report, is_preview)
            io.open(dst, "w", encoding="utf-8", newline="").write(text)
            report.append("app.js: %d -> %d bytes (-%d)" % (before, len(text), before - len(text)))
        else:
            shutil.copy2(src, dst)
        src_bytes += os.path.getsize(dst)

    idx = io.open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
    io.open(os.path.join(DIST, "index.html"), "w", encoding="utf-8", newline="").write(
        transform_index(idx, report, is_preview))

    copy_tracked_assets(report)
    emit_routes(report)
    probe_build(folder, report)

    # what was CUT — step 7 of the spec. A build that silently drops something is the same
    # class of problem as one that silently ships something.
    tracked = subprocess.check_output(["git", "ls-files"], cwd=ROOT).decode("utf-8").splitlines()
    shippable = [f for f in tracked
                 if f.endswith((".html", ".js", ".css", ".json"))
                 and not f.startswith(("docs/", ".claude"))]
    shipped = set(COPY_FILES) | {"index.html"} | {r + "/index.html" for r in ("tarot", "reading", "about", "roadmap")}
    cut = sorted(f for f in shippable if f not in shipped)

    print("build_public: %s/ built" % folder)
    for line in report:
        print("  " + line)
    print("")
    print("CUT — %d tracked files the public build does not copy:" % len(cut))
    for f in cut:
        print("    " + f)
    return cut


if __name__ == "__main__":
    for _folder, _is_preview in VARIANTS:
        build(_folder, _is_preview)
        print("")
    if "--no-gate" in sys.argv[1:]:
        print("--no-gate: neither output is cleared for deploy.")
        sys.exit(0)
    # Every output is gated on its own. live/ is the one a launch would serve, but a leak
    # in preview/ is still a leak on the same public host, so neither gets a pass.
    _rc = 0
    for _folder, _is_preview in VARIANTS:
        print("gate: %s/" % _folder)
        _rc |= subprocess.call([sys.executable, os.path.join(ROOT, "gate_public.py"),
                                "--target", os.path.join(ROOT, _folder)], cwd=ROOT)
        print("")
    sys.exit(_rc)
