# BLUE ROOM — THE PUBLIC GATE
#
# Greps a tree for things that must never reach the public site, and EXITS NON-ZERO on
# any hit. Nothing is deployed by a build that did not run this.
#
# Spec: docs/BUILD_PUBLIC_SPEC_V1.md §5. It is step 2 of §8's order of work, deliberately
# ahead of build_public.py, because a gate is useful before the build it guards exists —
# `python gate_public.py --audit` names what is wrong with the tree we ship TODAY.
#
# WHY THIS FILE CONTAINS NO REAL NAMES. A denylist of the builder's name, committed to a
# public repo, publishes the builder's name. So the identity strings live in
# `gate_identity.txt`, which is gitignored, and this file only knows the SHAPE of a leak.
# Without that file the gate does not quietly skip the identity check — it fails and says
# so. A check that can silently not run is not a check.
#
# THE MISTAKE THIS EXISTS TO NOT REPEAT. BR-S347's predecessor audit reported the tree
# clean while real personal data was live, because its regex was case-sensitive and the
# leftovers were capitalised. Every pattern here is case-insensitive, and `--selftest`
# proves each one still fires by running it against a synthetic leak.
#
# USAGE
#   python gate_public.py                 gate dist/ (the real gate; the build's step 6)
#   python gate_public.py --audit         gate the workshop tree — EXPECTED to fail today
#   python gate_public.py --target dir    gate any tree
#   python gate_public.py --selftest      prove every pattern fires, then run nothing else

import io, os, re, sys

ROOT = os.path.dirname(os.path.abspath(__file__))

# The five rooms the public site is allowed to resolve, plus the three the spec lists as
# reachable-but-unaddressed. Everything else in app.js's 17 is CUT. This is the whole
# security model: a ?dev= value not on this list is a leak wherever it appears.
PUBLIC_ROOMS = ["drawing-room", "arcane", "arcana-reading", "settings", "roadmap", "profile"]

# The neutral identities that SHIP. A birth~ seed naming anyone else is real personal data.
SAMPLE_NAMES = ["the seeker", "the companion"]

# Files the public site is made of. Anything else is not shipped, so not scanned.
SHIP_EXT = (".html", ".js", ".css", ".json", ".svg", ".txt", ".webmanifest")

# Trees that are not the site. In dist/ none of these exist, so this list costs nothing
# there; in --audit it keeps the workshop's own notes from drowning the real findings.
SKIP_DIRS = {".git", ".claude", "node_modules", "docs", "arcana-build", "dist", "__pycache__"}

# The identity sweep walks everything except what is not text or not ours. It does NOT
# skip docs/ — see scan()'s docstring. arcana-build/ comes off this list too: BR-S364
# found that build_public.py copies three JSON banks out of it into dist/, so a tree the
# gate never opened was shipping.
ALWAYS_SKIP = {".git", ".claude", "node_modules", "__pycache__", "dist"}
SCAN_EXT = SHIP_EXT + (".md", ".py")

# The denylist is made of the strings it bans, so scanning it reports itself. It is
# gitignored and never copied, so its presence in a tree is not a leak — but if it ever
# turned up inside dist/ that WOULD be one, so the copy step must refuse it, not this.
SKIP_FILES = {"gate_identity.txt"}

# Prototypes that are committed and therefore reachable on the live site right now
# (BUILD_PUBLIC_SPEC §3). The build copies an allow-list, so their presence in an output
# tree means the allow-list leaked.
PROTOTYPE_FILES = [
    "arcana-name-harness.html", "arrow-orbit-test.html", "compass-wheel.html",
    "dev-live.html", "fortune-wheel.html", "fortune-wheel-black.html",
]


def _dev_route_pattern():
    """Any ?dev= or BR_ROOM naming a room outside PUBLIC_ROOMS."""
    ok = "|".join(re.escape(r) for r in PUBLIC_ROOMS)
    return re.compile(r'(?:\?dev=|BR_ROOM\s*=\s*["\'])(?!(?:%s)\b)([a-z0-9-]+)' % ok, re.I)


def _birth_seed_pattern():
    """birth~NAME~y~m~d where NAME is not one of the sample identities."""
    ok = "|".join(re.escape(n) for n in SAMPLE_NAMES)
    return re.compile(r'birth~(?!(?:%s)~)([^~"\'&<]{1,40})~\d{4}~\d{1,2}~\d{1,2}' % ok, re.I)


# (id, compiled pattern, what a hit means, a synthetic string --selftest must catch)
CHECKS = [
    ("dev-route", _dev_route_pattern(),
     "a dev room outside the public list",
     '<a href="?dev=Halo-Gate">'),
    ("birth-data", _birth_seed_pattern(),
     "a birth seed naming someone who is not a sample identity",
     'seed=birth~Real Person~1988~3~4'),
    ("m1-toggle", re.compile(r'data-m1-variant', re.I),
     "the M1 A/B toggle, whose own comment says to remove it once chosen",
     'body.setAttribute("data-M1-Variant", v)'),
    ("dev-nav", re.compile(r'\bdevnav\b', re.I),
     "the dev-nav rail",
     'if (qs.get("DevNav") === "1")'),
    ("tuning-param", re.compile(r'[?&](?:m2|tilt|orbit|edge|lab|rv)=', re.I),
     "a dev tuning parameter",
     'href="index.html?Orbit=wings"'),
    ("repo-url", re.compile(r'github\.com/', re.I),
     "a link back to the workshop repository",
     'see https://GitHub.com/someone/repo'),
    ("mailto", re.compile(r'mailto:', re.I),
     "an email address published on the page",
     '<a href="MailTo:someone@example.com">'),
]


def _identity_checks():
    """Literal strings from the gitignored gate_identity.txt, one per line, # comments ok.

    Returns (checks, path, present). When the file is absent the caller FAILS — it does
    not proceed with a weaker gate, because the identity check is the one that BR-S347
    would have needed.
    """
    path = os.path.join(ROOT, "gate_identity.txt")
    if not os.path.isfile(path):
        return [], path, False
    out = []
    for raw in io.open(path, encoding="utf-8").read().splitlines():
        s = raw.strip()
        if not s or s.startswith("#"):
            continue
        out.append(("identity", _identity_pattern(s),
                    "a real identity string (%d chars, from gate_identity.txt)" % len(s), None))
    return out, path, True


def _identity_pattern(s):
    """A literal identity string, matched through any separator a URL or slug can use.

    BR-S364: the first version matched the literal only, and missed the builder's real
    name in docs/ATLAS.md because that file carried the URL-ENCODED form — a working
    seed which, pasted into the running site, opens the real person's reading. A space
    in a name is a space, a %20, a +, an underscore, a hyphen, or nothing at all,
    depending on who wrote the link. All of them are the same leak.

    (This docstring names no example on purpose. The first draft of it spelled the
    encoded form out, and the gate promptly flagged its own source file — a denylist
    that quotes what it bans publishes what it bans.)
    """
    parts = [re.escape(p) for p in s.split()]
    sep = r"(?:\s|%20|\+|_|-|\.)*"
    return re.compile(sep.join(parts), re.I)


def scan(target, checks, everywhere=False):
    """Every hit in the tree, as (relpath, lineno, check_id, why, the matched text).

    `everywhere` drops SKIP_DIRS and the extension filter. BR-S364: the identity check
    must run with it. The structural checks are about what reaches dist/, so skipping
    docs/ is right for them — a spec that names a dev route is not a leak. Identity is
    about what is PUBLISHED, and the workshop repo is public, so a real name in
    docs/ATLAS.md is exactly as exposed as one in app.js. Skipping docs/ for both is
    why this gate reported clean over a tree that still carried the builder's name,
    birth date and home town in four files.
    """
    hits = []
    for dirpath, dirnames, filenames in os.walk(target):
        dirnames[:] = [d for d in dirnames
                       if d not in (ALWAYS_SKIP if everywhere else SKIP_DIRS)]
        for fn in sorted(filenames):
            if fn in SKIP_FILES:
                continue
            if not everywhere and not fn.lower().endswith(SHIP_EXT):
                continue
            if everywhere and not fn.lower().endswith(SCAN_EXT):
                continue
            full = os.path.join(dirpath, fn)
            rel = os.path.relpath(full, target).replace("\\", "/")
            try:
                text = io.open(full, encoding="utf-8", errors="replace").read()
            except (IOError, OSError) as e:
                hits.append((rel, 0, "unreadable", "could not be read, so could not be cleared: %s" % e, ""))
                continue
            for lineno, line in enumerate(text.splitlines(), 1):
                for cid, pat, why, _ in checks:
                    m = pat.search(line)
                    if m:
                        hits.append((rel, lineno, cid, why, m.group(0)[:70]))
    return hits


def scan_prototypes(target, is_workshop):
    hits = [(f, 0, "prototype-file", "a prototype page that must not be copied into the build", f)
            for f in PROTOTYPE_FILES if os.path.isfile(os.path.join(target, f))]
    # The denylist is skipped during the text scan (it is made of the strings it bans), so
    # its own presence in an OUTPUT tree has to be caught here or it would ship silently.
    if not is_workshop and os.path.isfile(os.path.join(target, "gate_identity.txt")):
        hits.append(("gate_identity.txt", 0, "denylist-shipped",
                     "the identity denylist was copied into the output — it IS the leak", ""))
    return hits


def selftest(checks):
    """Prove each pattern still fires. A gate nobody tested is a gate that reports clean."""
    print("gate_public --selftest: %d structural patterns" % len(CHECKS))
    bad = 0
    for cid, pat, _, sample in CHECKS:
        if sample is None:
            continue
        ok = bool(pat.search(sample))
        print("  %-14s %s   %s" % (cid, "FIRES " if ok else "MISSED", sample))
        if not ok:
            bad += 1
    # the case-sensitivity trap itself, as a test: every sample above is deliberately
    # mis-cased relative to how the pattern reads, so a case-sensitive rewrite fails here.
    clean = 'a page with ?dev=arcane and birth~The Seeker~2000~1~1 and nothing else'
    for cid, pat, _, _ in checks:
        if pat.search(clean):
            print("  %-14s FALSE POSITIVE on the known-clean line" % cid)
            bad += 1
    print("selftest: %s" % ("PASS" if not bad else "%d PATTERN(S) BROKEN" % bad))
    return 0 if not bad else 1


def main(argv):
    audit = "--audit" in argv
    no_identity = "--no-identity" in argv
    target = None
    if "--target" in argv:
        target = argv[argv.index("--target") + 1]
    elif audit:
        target = ROOT
    else:
        target = os.path.join(ROOT, "dist")

    ident, ipath, ipresent = _identity_checks()
    checks = list(CHECKS) + ident

    if "--selftest" in argv:
        return selftest(checks)

    if not os.path.isdir(target):
        print("gate_public: nothing to gate — %s does not exist." % target)
        print("             Run build_public.py first, or `--audit` to gate the workshop tree.")
        return 1

    if not ipresent and not no_identity:
        print("gate_public: BLOCKED — the identity check cannot run.")
        print("  %s is missing." % ipath)
        print("  It is gitignored and holds one literal string per line: the real names,")
        print("  the email, the home town. Without it this gate would pass a tree that")
        print("  still carries them, which is exactly how BR-S347 happened.")
        print("  Create it, or pass --no-identity to say out loud that you are skipping it.")
        return 2

    # Two sweeps, two threat models. Structural over what ships; identity over everything.
    hits = scan(target, CHECKS) + scan_prototypes(target, os.path.abspath(target) == ROOT)
    if ident:
        hits += scan(target, ident, everywhere=True)

    label = "the workshop tree" if audit else target
    print("gate_public: %d checks over %s" % (len(checks) + 1, label))
    print("  identity strings: %s" % ("%d loaded" % len(ident) if ipresent else "SKIPPED (--no-identity)"))

    if not hits:
        print("CLEAN — nothing on the denylist reached %s." % label)
        return 0

    by_check = {}
    for rel, lineno, cid, why, text in hits:
        by_check.setdefault(cid, []).append((rel, lineno, why, text))

    print("")
    for cid in sorted(by_check):
        rows = by_check[cid]
        print("%s — %s  (%d)" % (cid.upper(), rows[0][2], len(rows)))
        for rel, lineno, _, text in rows[:12]:
            where = "%s:%d" % (rel, lineno) if lineno else rel
            print("    %-46s %s" % (where, text))
        if len(rows) > 12:
            print("    ... and %d more" % (len(rows) - 12))
        print("")

    print("FAILED — %d hits across %d checks." % (len(hits), len(by_check)))
    if audit:
        print("This is the expected result on the workshop tree: it is the list of what")
        print("build_public.py has to strip. On dist/ the same output means do not deploy.")
    return 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
