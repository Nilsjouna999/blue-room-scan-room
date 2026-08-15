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
# ★ THIS FILE DOES NOT YET IMPLEMENT THAT RULE. Today preview/ and live/ differ by ONE
# thing, the build flip; everything else ships to both. The rule needs a third tier —
# a PREVIEW_ONLY list cut from live/ but kept in preview/ — and two populations move
# into it the moment it exists:
#   · the vision room, currently in CUT_ROOMS (semi-finished: a draft text and a
#     POST_TARGET of null) — under the rule it is preview/ material, not dev-only
#   · the 101 gate hits that fail live/ today: the dev-nav (38), the dev-route links
#     (49), the M1 A/B toggle (4) and the tuning params (10). The dev-nav and the
#     tuning params are workshop tools and belong to dev alone; the M1 toggle's own
#     comment says to remove it once chosen.
# Doing that properly is its own task, because it changes what is published. Recorded
# here rather than half-done, so the next session inherits the rule and not a guess.
#
# (folder, keeps the flip)
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

# BR-S378 — the flip, cut from `live/` only. The call goes first and the functions after,
# so the removal is checked by the same "no live reference survives" rule as every other
# cut. The CSS block goes too: it would be inert with no element to style, but shipping
# the rules for a control that does not exist is a signpost to a door.
FLIP_CALL = "syncBuildFlip();   // BR-S377 — the dev⇄public flip, once, on every room\n"
# BR-S480 — the PEEK goes with the pill. It opens the other builds in a frame from the
# pill itself, so with the pill cut it is unreachable code — and unreachable code that
# still names the control is exactly the signpost the note above says not to ship. All
# five are reachable only from syncBuildFlip (via _peekWire) or from each other; the
# "no live reference survives" assert below is what proves it rather than this comment.
FLIP_FUNCTIONS = ["brBuildSides", "syncBuildFlip",
                  "_peekWire", "_peekBuild", "_peekFit", "_peekClose", "_peekEsc"]
FLIP_CSS_OPEN = "/* BR-S377 — THE BUILD FLIP"
# BR-S480 — the anchor moves to the END of the peek's rules, and the peek's CSS was moved
# in the stylesheet to sit directly after the flip's, so the two are ONE contiguous block.
# Leaving the peek's rules in live/ would have shipped styling for a control that does not
# exist there — precisely the "signpost to a door" the note above forbids. The styles for
# a cut thing are part of the cut thing.
FLIP_CSS_LAST = "@media (prefers-reduced-motion: reduce) { #brBuildPeek"

# Top-level functions reachable ONLY from a cut branch. Verified one call site each, all
# inside a removed branch — re-verify with `grep -c` before adding to this list.
CUT_FUNCTIONS = ["renderProtoCards", "renderVault", "wireVault", "renderReviewMap",
                 "renderBeforeAfter", "renderHaloGateMock", "renderUploadedScanResultDev",
                 "renderVision", "wireVision", "u1Aside"]

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
]

# <head>/<body> lines pulled out of index.html: the surfaces those files serve are cut.
STRIP_TAGS = ["ceremony.css", "ceremony.js"]

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
    ("build pill",     "app.js",       r"\bbrBuildFlip\b",    {"preview": True,  "live": False}),
    ("the card",       "app.js",       r"\bm2hero\b",         {"preview": True,  "live": True}),
    ("six marks",      "app.js",       r"\bm2bface__marks\b", {"preview": True,  "live": True}),
    ("specimen panel", "_six-live.js", r"\bsx-",              {"preview": True,  "live": True}),
    ("roadmap box",    "app.js",       r"\brmpop\b",          {"preview": True,  "live": True}),
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


def cut_flip(src, report):
    """Remove the build flip — `live/` only. Anchored and asserted like every other cut:
    a flip that survived into the launch site would be a labelled door into the workshop,
    so a missed anchor fails the build instead."""
    if FLIP_CALL not in src:
        sys.exit("build_public: the syncBuildFlip() boot call no longer matches, so the "
                 "flip cannot be cut from live/. That would ship a door into the dev "
                 "build. Re-anchor FLIP_CALL against the current app.js.")
    src = src.replace(FLIP_CALL, "")
    i = src.find("var BR_BUILDS = [")
    if i < 0:
        sys.exit("build_public: BR_BUILDS is gone from app.js — re-anchor the flip cut.")
    src = src[:i] + src[src.index("];", i) + 3:]
    for fn in FLIP_FUNCTIONS:
        anchor = "function %s(" % fn
        if anchor not in src:
            sys.exit("build_public: %s() is gone from app.js — re-anchor the flip cut." % fn)
        j = src.index(anchor)
        end = _match_block(src, j)
        line_start = src.rfind("\n", 0, j) + 1
        src = src[:line_start] + src[end + 1:]
    live = [ln for ln in _code_only(src).splitlines()
            if re.search(r"\b(brBuildSides|syncBuildFlip|BR_BUILDS|brBuildFlip)\b", ln)]
    if live:
        sys.exit("build_public: the flip still has %d live reference(s) in live/:\n    %s"
                 % (len(live), live[0].strip()[:90]))
    report.append("flip removed: dev/preview/live pill is not in this build")
    return src


def transform_styles(src, report, keep_flip):
    """styles.css is copied verbatim for `preview/`; for `live/` the flip's rules go too."""
    if keep_flip:
        return src
    i = src.find(FLIP_CSS_OPEN)
    j = src.find(FLIP_CSS_LAST)
    if i < 0 or j < i:
        sys.exit("build_public: the #brBuildFlip CSS block no longer matches its anchors. "
                 "Re-anchor FLIP_CSS_OPEN / FLIP_CSS_LAST against the current styles.css.")
    end = src.index("\n", j) + 1
    src = src[:i] + src[end:]
    assert "brBuildFlip" not in src and "br-flip__" not in src
    report.append("styles.css: the flip's rules removed with it")
    return src


def transform_app(src, report, keep_flip=True):
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

    # 4. the flip — kept in preview/, cut from live/
    if not keep_flip:
        src = cut_flip(src, report)

    # the asserts that make a bad build fail here rather than on the live site
    for room in CUT_ROOMS:
        assert 'state.dev === "%s"' % room not in src, room
    assert '"%s"' % PUBLIC_ROOMS[0] in src
    for room in CUT_ROOMS:
        assert '"%s", "' % room not in src.split("includes(dev)")[0][-400:], room
    return src


def transform_index(src, report):
    # Match the href/src VALUE, never the whole line: styles.css's cache-bust comment
    # mentions reveal/stage-controller.js, and a substring test drops the site's main
    # stylesheet on the strength of a footnote.
    out = []
    for line in src.splitlines(True):
        ref = re.search(r'(?:src|href)="([^"]+)"', line)
        if ref and any(t in ref.group(1) for t in STRIP_TAGS):
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
    for t in STRIP_TAGS:
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


def build(folder="preview", keep_flip=True):
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
        dst = os.path.join(DIST, rel)
        d = os.path.dirname(dst)
        if d and not os.path.isdir(d):
            os.makedirs(d)
        if rel == "app.js":
            text = io.open(src, encoding="utf-8").read()
            before = len(text)
            text = transform_app(text, report, keep_flip)
            io.open(dst, "w", encoding="utf-8", newline="").write(text)
            report.append("app.js: %d -> %d bytes (-%d)" % (before, len(text), before - len(text)))
        elif rel == "styles.css":
            text = transform_styles(io.open(src, encoding="utf-8").read(), report, keep_flip)
            io.open(dst, "w", encoding="utf-8", newline="").write(text)
        else:
            shutil.copy2(src, dst)
        src_bytes += os.path.getsize(dst)

    idx = io.open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()
    io.open(os.path.join(DIST, "index.html"), "w", encoding="utf-8", newline="").write(
        transform_index(idx, report))

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
    for _folder, _keep in VARIANTS:
        build(_folder, _keep)
        print("")
    if "--no-gate" in sys.argv[1:]:
        print("--no-gate: neither output is cleared for deploy.")
        sys.exit(0)
    # Every output is gated on its own. live/ is the one a launch would serve, but a leak
    # in preview/ is still a leak on the same public host, so neither gets a pass.
    _rc = 0
    for _folder, _keep in VARIANTS:
        print("gate: %s/" % _folder)
        _rc |= subprocess.call([sys.executable, os.path.join(ROOT, "gate_public.py"),
                                "--target", os.path.join(ROOT, _folder)], cwd=ROOT)
        print("")
    sys.exit(_rc)
