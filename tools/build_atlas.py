#!/usr/bin/env python3
"""Generate docs/ATLAS_GENERATED.md from the code, not from memory.

WHY THIS EXISTS. docs/ATLAS.md says it about itself, in its own header:

    "It is hand-written today and that is a known defect. Every previous register in
     this repo (review-map, the devnav rail, FILE_MAP, TASK_QUEUE) rotted the same way:
     it was written once and the code moved."

It was composed against BR-S275 and HEAD is now far past it. A register that has to be
maintained by hand is a register that is wrong most of the time, and a wrong map is worse
than no map because it is trusted. So this reads the four places the truth actually lives
and writes them out:

    the ?dev= allow-list      app.js  — the single route gate
    the ROOMS registry        app.js  — what the site says its rooms are
    MENU_PANELS               app.js  — the horizontal track M1 sits on
    real directories on disk          — the addresses that need no route at all

It deliberately does NOT try to say what anything is FOR. That belongs in a hand-written
companion, because intent is not extractable and pretending otherwise is how the last
register started lying. This file answers "what exists and where". Nothing else.

Run: python tools/build_atlas.py
"""

import io
import os
import re
import subprocess
from datetime import datetime, timezone

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APP = os.path.join(ROOT, "app.js")
OUT = os.path.join(ROOT, "docs", "ATLAS_GENERATED.md")

# Directories that are infrastructure rather than places a visitor can stand in.
NOT_SURFACES = {
    ".git", ".claude", "node_modules", "__pycache__", "assets", "dist", "live",
    "preview", "docs", "tools", "arcana-build", "halo", "data", "reveal",
}


def read(path):
    return io.open(path, encoding="utf-8", errors="replace").read()


def head():
    try:
        return subprocess.check_output(
            ["git", "-C", ROOT, "log", "-1", "--format=%h %s"],
            stderr=subprocess.DEVNULL,
        ).decode("utf-8", "replace").strip()
    except Exception:
        return "unknown"


def dev_routes(src):
    """The allow-list is the ONLY route gate — index.html returns 200 for any ?dev=
    value, so HTTP status proves nothing. Anything not in this list falls silently to
    the Desk with the bad param still in the URL."""
    m = re.search(r"DEV_ROUTES?\s*=\s*\[(.*?)\]", src, re.S)
    if not m:
        m = re.search(r"(?:allow|ALLOW)[A-Z_a-z]*\s*=\s*\[(.*?)\]", src, re.S)
    if m:
        return sorted(set(re.findall(r"\"([a-z-]+)\"|'([a-z-]+)'", m.group(1))[0]
                          for _ in [0])) if False else sorted(
            set(a or b for a, b in re.findall(r"\"([a-z-]+)\"|'([a-z-]+)'", m.group(1))))
    # fall back to every ?dev= literal the file mentions, and say so in the output
    return sorted(set(re.findall(r"\?dev=([a-z-]+)", src)))


def rooms(src):
    i = src.find("const ROOMS = [")
    if i < 0:
        return []
    blk = src[i:i + 6000]
    out = []
    for m in re.finditer(r"\{[^{}]*key:\s*\"([a-z-]+)\"[^{}]*\}", blk, re.S):
        e = m.group(0)

        def g(k, d="-"):
            mm = re.search(k + r":\s*\"([^\"]*)\"", e) or re.search(k + r":\s*(true|false)", e)
            return mm.group(1) if mm else d

        out.append({
            "key": m.group(1),
            "name": g("name"),
            "state": g("state"),
            "free": g("free"),
            "internal": g("internal", "false"),
        })
    return out


def panels(src):
    m = re.search(r"MENU_PANELS\s*=\s*\[(.*?)\];", src, re.S)
    if not m:
        return []
    out = []
    for row in re.finditer(r"\{[^{}]*cls:\s*\"([a-z0-9-]+)\"[^{}]*\}", m.group(1), re.S):
        e = row.group(0)
        h = re.search(r"hash:\s*(null|\"([^\"]*)\")", e)
        out.append({
            "cls": row.group(1),
            "sel": (re.search(r"sel:\s*\"([^\"]+)\"", e) or [None, "-"])[1],
            "hash": "null (no address)" if (h and h.group(1) == "null")
                    else ("\"\" (site root)" if h and h.group(2) == "" else (h.group(2) if h else "-")),
        })
    return out


def dirs():
    out = []
    for n in sorted(os.listdir(ROOT)):
        p = os.path.join(ROOT, n)
        if os.path.isdir(p) and n not in NOT_SURFACES and not n.startswith("."):
            has_index = os.path.exists(os.path.join(p, "index.html"))
            out.append((n, has_index))
    return out


def main():
    src = read(APP)
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    L = []
    w = L.append

    w("# THE ATLAS — GENERATED")
    w("")
    w("**What exists, and where. Read out of the code, not remembered.**")
    w("")
    w("> Generated %s against `%s` by `tools/build_atlas.py`." % (now, head()))
    w("> Re-run the script rather than editing this file — anything typed here is lost on")
    w("> the next run, which is the point. `docs/ATLAS.md` is the older hand-written")
    w("> register and carries the reasoning this file deliberately does not.")
    w("")
    w("★ **This file says what exists and where. It does not say what anything is FOR.**")
    w("Intent is not extractable, and the last four registers in this repo rotted because")
    w("they mixed the two. Purpose belongs in a hand-written companion that is allowed to")
    w("be opinionated and is expected to be re-read, not trusted.")
    w("")
    w("---")
    w("")

    w("## THE TRACK — the horizontal spine M1 lives on")
    w("")
    w("Source: `MENU_PANELS` in `app.js`. Arrow keys move between these; `U1` hangs below")
    w("the panel whose hash is the site root.")
    w("")
    w("| # | class | selector | address |")
    w("|---|---|---|---|")
    for i, p in enumerate(panels(src)):
        w("| %d | `%s` | `%s` | %s |" % (i, p["cls"], p["sel"], p["hash"]))
    w("")

    w("## THE ROOMS, as the site itself declares them")
    w("")
    w("Source: the `ROOMS` registry in `app.js`. This array is what `u1Public()` reads to")
    w("build the list on U1. ★ Note what it is not: there is no rooms hub page anywhere in")
    w("this repo. `ROOMS` is data feeding a list, not a destination.")
    w("")
    w("| key | name | state | free |")
    w("|---|---|---|---|")
    for r in rooms(src):
        w("| `%s` | %s | %s | %s |" % (r["key"], r["name"], r["state"], r["free"]))
    w("")

    w("## REAL ADDRESSES — directories served without a route")
    w("")
    w("A directory with an `index.html` is reachable on GitHub Pages with no server and no")
    w("`?dev=` param. BR-S304 moved the two products here for exactly that reason: *things")
    w("be where you think they be* fails at the address bar first.")
    w("")
    w("| path | has index.html |")
    w("|---|---|")
    for n, has in dirs():
        w("| `/%s/` | %s |" % (n, "yes" if has else "**no — not reachable**"))
    w("")

    routes = dev_routes(src)
    w("## `?dev=` ROUTES referenced in app.js")
    w("")
    w("★ `index.html` returns 200 for **any** `?dev=` value, so an HTTP status proves")
    w("nothing about whether a route exists. Anything outside the gate falls silently to")
    w("the Desk with the bad param still in the URL.")
    w("")
    w("%d referenced: %s" % (len(routes), " · ".join("`%s`" % r for r in routes)))
    w("")

    w("---")
    w("")
    w("## WHAT THIS FILE CANNOT TELL YOU")
    w("")
    w("- what any surface is FOR, or who it is for")
    w("- which are finished, which are drafts, which are abandoned")
    w("- what is coming that has no code yet")
    w("- how a stranger is supposed to move through any of it")
    w("")
    w("Those are the questions worth answering, and none of them is extractable. That is")
    w("the companion document's job.")

    io.open(OUT, "w", encoding="utf-8").write("\n".join(L) + "\n")
    print("wrote %s  (%d rooms, %d panels, %d dirs, %d routes)"
          % (OUT, len(rooms(src)), len(panels(src)), len(dirs()), len(routes)))


if __name__ == "__main__":
    main()
