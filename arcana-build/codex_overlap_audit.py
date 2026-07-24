#!/usr/bin/env python3
"""
Blue Room Codex — Overlap Audit (the "free version" discrimination harness).

Axiom (GOD'S FINGER golden node): a codex entry's information IS its discrimination
from its co-drawn neighbours; non-discrimination is dead weight. So distinctiveness
is a MEASURABLE property of the bank, not a matter of taste.

This computes pairwise keyword overlap (Jaccard) WITHIN each system and emits a
ranked collision queue — the entries that "say nothing twice" when stacked in a
reading. Run it before and after any codex revision to see whether the change
actually increased distinctiveness (measure before you fix).

Usage:  python arcana-build/codex_overlap_audit.py
Writes: codex-overlap-report.md   (+ prints a summary)
"""
import json, ast, itertools, os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
DATA = os.path.join(ROOT, "codex-data.json")
OUT  = os.path.join(ROOT, "codex-overlap-report.md")


def kwset(entry):
    kws = entry.get("keywords", [])
    if isinstance(kws, str):
        try:
            kws = ast.literal_eval(kws)
        except Exception:
            kws = [w for w in kws.replace("[", "").replace("]", "").split(",")]
    return set(str(w).strip().strip("'\"").lower() for w in kws if str(w).strip())


def jaccard(a, b):
    if not a or not b:
        return 0.0
    return len(a & b) / len(a | b)


def main():
    data = json.load(open(DATA, encoding="utf-8"))
    lines = []
    lines.append("# Blue Room Codex — Overlap Audit")
    lines.append("")
    lines.append("*Pairwise keyword Jaccard WITHIN each system. High overlap = entries that "
                 "carry no new information when co-drawn (\"say nothing twice\"). This is the "
                 "cheap mechanical screen — the blind-test is the real measure. Re-run after "
                 "any revision to confirm distinctiveness actually rose.*")
    lines.append("")

    all_pairs = []
    per_system = []
    for sysobj in data:
        sysname = sysobj["system"]
        entries = sysobj["entries"]
        pairs = []
        for a, b in itertools.combinations(entries, 2):
            j = jaccard(kwset(a), kwset(b))
            shared = sorted(kwset(a) & kwset(b))
            pairs.append((j, a.get("name", "?"), b.get("name", "?"), shared))
        pairs.sort(reverse=True)
        mean = sum(p[0] for p in pairs) / len(pairs) if pairs else 0.0
        worst = pairs[0][0] if pairs else 0.0
        per_system.append((sysname, len(entries), mean, worst))
        all_pairs += [(j, sysname, na, nb, sh) for (j, na, nb, sh) in pairs]

    # headline: baseline table
    lines.append("## Baseline (lower mean = more distinct; beat these numbers)")
    lines.append("")
    lines.append("| System | Entries | Mean Jaccard | Worst pair |")
    lines.append("|---|---|---|---|")
    for name, n, mean, worst in per_system:
        lines.append(f"| {name} | {n} | {mean:.3f} | {worst:.2f} |")
    lines.append("")

    # top collisions across the whole codex
    all_pairs.sort(reverse=True)
    lines.append("## Top 25 worst collisions — the revision queue")
    lines.append("")
    for j, sysn, na, nb, sh in all_pairs[:25]:
        if j <= 0:
            break
        lines.append(f"- **{j:.2f}**  [{sysn}]  {na} / {nb} — shared: {', '.join(sh)}")
    lines.append("")

    # per-system worst
    lines.append("## Worst pair per system")
    lines.append("")
    for sysobj in data:
        sysname = sysobj["system"]
        entries = sysobj["entries"]
        best = (0.0, "", "", [])
        for a, b in itertools.combinations(entries, 2):
            j = jaccard(kwset(a), kwset(b))
            if j > best[0]:
                best = (j, a.get("name", "?"), b.get("name", "?"), sorted(kwset(a) & kwset(b)))
        lines.append(f"- **{sysname}** — {best[0]:.2f}  {best[1]} / {best[2]}"
                     + (f" (shared: {', '.join(best[3])})" if best[3] else ""))
    lines.append("")

    open(OUT, "w", encoding="utf-8").write("\n".join(lines))
    print("\n".join(lines[:6]))
    print(f"\n... full report -> {OUT}  ({len(all_pairs)} pairs across {len(data)} systems)")


if __name__ == "__main__":
    main()
