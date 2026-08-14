#!/usr/bin/env python3
"""
M1 SHOAL PLACER — solves for mark positions that actually clear the words, then
prints them as frozen literals to paste into _m1-final.html.

The sheet requires the field's positions to be AUTHORED LITERALS (no PRNG, nothing
re-rolled on re-view) and requires the field to part around the words at every
width the field exists at. Those two requirements together mean the positions have
to be *solved once, offline, against the real type* and then frozen — which is what
this does. Run it, paste the output, commit the numbers. The runtime eviction stays
as a guard; it should now have nothing to evict.

    python tools/m1-place-marks.py
"""
import importlib.util, json, time, math, os, sys

spec = importlib.util.spec_from_file_location("m", os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "m1-measure.py"))
m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)

URL = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8815/_m1-final.html"
WIDTHS = [(1200, 900), (1440, 900), (1920, 1080)]   # must clear at ALL of them
CLEAR = 26.0        # >= the runtime guard's 24px, with 2px of authoring margin
SEP   = 16.0        # min centre-to-centre gap between two marks, in px

GEOM = """JSON.stringify((()=>{
  const out={};
  ['secTarot','secBirth'].forEach(id=>{
    const s=document.getElementById(id);
    const f=s.querySelector('.m1sect__field');
    const fr=f.getBoundingClientRect();
    const rects=[];
    const w=document.createTreeWalker(s,NodeFilter.SHOW_TEXT,{acceptNode:n=>{
      if(!n.nodeValue||!n.nodeValue.trim())return NodeFilter.FILTER_REJECT;
      if(n.parentElement.closest('.m1sect__field'))return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;}});
    const r=document.createRange(); let n;
    while((n=w.nextNode())){ r.selectNodeContents(n);
      for(const q of r.getClientRects())
        if(q.width>0&&q.height>0) rects.push([q.left,q.top,q.right,q.bottom]); }
    out[id]={field:[fr.left,fr.top,fr.width,fr.height],text:rects};
  });
  return out;})())"""


def dist(px, py, r):
    cx = max(r[0], min(px, r[2]))
    cy = max(r[1], min(py, r[3]))
    return math.hypot(px - cx, py - cy)


def collect():
    ch = m.Chrome(m.find_chrome(), port=9399)
    per = {}
    try:
        ch.cmd("Page.enable")
        for w, h in WIDTHS:
            ch.cmd("Emulation.setDeviceMetricsOverride", width=w, height=h,
                   deviceScaleFactor=1, mobile=False)
            ch.cmd("Page.navigate", url=URL)
            time.sleep(1.1)
            # un-evict so the guard's display:none doesn't perturb layout
            ch.cmd("Runtime.evaluate", expression=
                   "document.querySelectorAll('.m1mark').forEach(m=>m.style.display='')")
            time.sleep(0.3)
            r = ch.cmd("Runtime.evaluate", expression=GEOM, returnByValue=True)
            per[(w, h)] = json.loads(r["result"]["value"])
    finally:
        ch.close()
    return per


def solve(per, sect, n):
    """Candidate (left%,top%) that clears CLEAR px of ink at EVERY width."""
    cands = []
    for lx in range(3, 98):
        for ty in range(3, 98):
            ok = True
            worst = 1e9
            for key in per:
                g = per[key][sect]
                fx, fy, fw, fh = g["field"]
                px = fx + fw * lx / 100.0
                py = fy + fh * ty / 100.0
                d = min((dist(px, py, r) for r in g["text"]), default=1e9)
                if d < CLEAR:
                    ok = False
                    break
                worst = min(worst, d)
            if ok:
                cands.append((lx, ty, worst))
    if not cands:
        return []
    # greedy farthest-point spread, seeded by the roomiest candidate. SEP is a
    # hard floor in PIXELS at the narrowest wide width: marks are 11.5-17.5px and
    # a shoal whose glyphs touch reads as typographic noise, not as marks.
    key0 = min(per, key=lambda k: k[0])
    fw = per[key0][sect]["field"][2]
    fh = per[key0][sect]["field"][3]
    def pxdist(a, b):
        return math.hypot((a[0]-b[0])/100.0*fw, (a[1]-b[1])/100.0*fh)
    chosen = [max(cands, key=lambda c: c[2])]
    while len(chosen) < n:
        best, bestd = None, -1
        for c in cands:
            d = min(pxdist(c, k) for k in chosen)
            if d > bestd:
                bestd, best = d, c
        if best is None or bestd < SEP:
            break
        chosen.append(best)
    return chosen


def main():
    per = collect()
    for sect, n in (("secTarot", 16), ("secBirth", 12)):
        got = solve(per, sect, n)
        print("\n/* %s — %d of %d positions clear >=%.0fpx of ink at %s */"
              % (sect, len(got), n, CLEAR,
                 ", ".join("%dx%d" % k for k in per)))
        for lx, ty, worst in got:
            print("   [%3d, %3d]   /* clearance %.0fpx */" % (lx, ty, worst))
    print("\n(paste the left%%/top%% pairs into TAROT_FIELD / BIRTH_FIELD in order)")


if __name__ == "__main__":
    main()
