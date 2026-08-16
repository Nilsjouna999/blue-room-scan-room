#!/usr/bin/env python3
"""
M1 ONE-SCREEN GATE  —  the sheet's verification table, as a script.

The sheet (THE INHABITED ORIGINAL v2, "AT 430px") requires that M1's panel fit
one screen at every named bracket, and says so as an executable merge condition
rather than a paper table: v1 asserted the table and never ran it.

RULE:  scrollHeight  <=  innerHeight - HEADROOM   at every bracket.
       HEADROOM is 40px, and it is not slack. The numbers come from headless
       Chrome; iOS Safari's real visible viewport is shorter than the CSS
       viewport it reports, so the 40px is Safari's allowance, not ours.

Exit code 0 = pass (safe to merge).  1 = a bracket is over (blocks merge).
Anything the ladder deliberately drops at a bracket (the berth, the caption,
the placard) is REPORTED, never silently hidden — the sheet's own instruction
for a residual is that it be reported.

Usage:
    python tools/m1-measure.py [url-or-path]
Defaults to the local _m1-final.html over the running preview server if one is
up, else file://.

Requires only Chrome + the standard library: it speaks CDP over a raw WebSocket
implemented below, because this repo has no node.
"""

import base64, hashlib, json, os, re, socket, struct, subprocess, sys, tempfile, time
import urllib.request

HEADROOM = 40

# width, height, label. The sheet's brackets, in its own order.
BRACKETS = [
    (430,  932, "iPhone 14/15 Pro Max  — the width the builder named"),
    (430,  900, "430-class, shorter"),
    (375,  667, "iPhone SE"),
    (393,  852, "iPhone 14/15 Pro"),
    (320,  568, "the 320-class residual"),
    (812,  375, "landscape phone"),
    (768, 1024, "tablet portrait"),
    (1280, 720, "small laptop"),
    (1440, 900, "laptop"),
]

# What the ladder is allowed to drop, and where we expect to see it gone.
# Reported at every bracket so an omission is always visible in the output.
PRESENCE = [
    ("berth",    ".menu__draw-head"),
    ("caption",  ".m2hero__name"),
    ("flip",     ".m2flip"),
    ("placard",  ".menu__draw-placard"),
    ("shoal",    ".m1sect__field"),
    ("specimen", ".m1spec"),
    ("spine",    ".menu__draw-spine"),
    ("deepline", ".m1deep__line"),
]

PROBE = """(() => {
  const d = document.documentElement;
  const vis = s => { const e = document.querySelector(s);
    if (!e) return false;
    return e.getClientRects().length > 0; };
  // NOT scrollHeight: body carries min-height:100vh (it centres the panel), which
  // floors scrollHeight at the viewport and would make the rule unsatisfiable by
  // construction. What we want is the height the PANEL actually needs, plus the
  // page padding it sits in.
  const panel = document.querySelector('.menu__draw');
  const bs = getComputedStyle(document.body);
  const contentH = Math.ceil(panel.getBoundingClientRect().height)
                 + parseFloat(bs.paddingTop) + parseFloat(bs.paddingBottom);
  const out = { vw: innerWidth, vh: innerHeight,
                contentH: Math.ceil(contentH),
                scrollH: d.scrollHeight, scrollW: d.scrollWidth, present: {} };
  %s
  // the offer must be on the first screen, whatever else yields (item 98)
  const doors = ['#doorTarot', '#doorBirth'].map(s => {
    const e = document.querySelector(s); if (!e) return null;
    const r = e.getBoundingClientRect();
    return { top: Math.round(r.top), bottom: Math.round(r.bottom),
             right: Math.round(r.right) };
  });
  out.doors = doors;
  out.marks = document.querySelectorAll('.m1mark').length;
  // getClientRects, not computed display: a mark inside a display:none field
  // still computes display:block on itself.
  out.marksShown = [...document.querySelectorAll('.m1mark')]
      .filter(m => m.getClientRects().length > 0).length;
  return JSON.stringify(out);
})()""" % "\n  ".join(
    "out.present[%r] = vis(%r);" % (n, s) for n, s in PRESENCE
)


# ---------------------------------------------------------------- websocket
class WS:
    """Barely enough client-side WebSocket to drive CDP. No dependencies."""

    def __init__(self, url):
        m = re.match(r"ws://([^:/]+):(\d+)(/.*)", url)
        host, port, path = m.group(1), int(m.group(2)), m.group(3)
        self.s = socket.create_connection((host, port), timeout=20)
        key = base64.b64encode(os.urandom(16)).decode()
        self.s.sendall(
            ("GET %s HTTP/1.1\r\nHost: %s:%d\r\nUpgrade: websocket\r\n"
             "Connection: Upgrade\r\nSec-WebSocket-Key: %s\r\n"
             "Sec-WebSocket-Version: 13\r\n\r\n" % (path, host, port, key)).encode()
        )
        buf = b""
        while b"\r\n\r\n" not in buf:
            buf += self.s.recv(4096)
        assert b"101" in buf.split(b"\r\n")[0], buf[:200]
        self.buf = buf.split(b"\r\n\r\n", 1)[1]

    def _read(self, n):
        while len(self.buf) < n:
            chunk = self.s.recv(65536)
            if not chunk:
                raise IOError("socket closed")
            self.buf += chunk
        out, self.buf = self.buf[:n], self.buf[n:]
        return out

    def send(self, payload):
        data = json.dumps(payload).encode()
        head = b"\x81"
        n = len(data)
        mask = os.urandom(4)
        if n < 126:
            head += bytes([0x80 | n])
        elif n < 65536:
            head += bytes([0x80 | 126]) + struct.pack(">H", n)
        else:
            head += bytes([0x80 | 127]) + struct.pack(">Q", n)
        self.s.sendall(head + mask + bytes(b ^ mask[i % 4] for i, b in enumerate(data)))

    def recv(self):
        while True:
            b0, b1 = self._read(2)
            op, n = b0 & 0x0F, b1 & 0x7F
            if n == 126:
                n = struct.unpack(">H", self._read(2))[0]
            elif n == 127:
                n = struct.unpack(">Q", self._read(8))[0]
            data = self._read(n)
            if op == 1:
                return json.loads(data)
            if op == 8:
                raise IOError("websocket closed by peer")


class Chrome:
    def __init__(self, binary, port=9333):
        self.dir = tempfile.mkdtemp(prefix="m1gate-")
        self.p = subprocess.Popen(
            [binary, "--headless=new", "--remote-debugging-port=%d" % port,
             "--user-data-dir=" + self.dir, "--no-first-run", "--no-default-browser-check",
             "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
             "about:blank"],
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        for _ in range(100):
            try:
                v = json.load(urllib.request.urlopen(
                    "http://127.0.0.1:%d/json/list" % port, timeout=1))
                tgt = [t for t in v if t["type"] == "page"]
                if tgt:
                    self.ws = WS(tgt[0]["webSocketDebuggerUrl"])
                    self.i = 0
                    return
            except Exception:
                time.sleep(0.15)
        raise RuntimeError("could not reach headless Chrome on port %d" % port)

    def cmd(self, method, **params):
        self.i += 1
        self.ws.send({"id": self.i, "method": method, "params": params})
        while True:
            msg = self.ws.recv()
            if msg.get("id") == self.i:
                if "error" in msg:
                    raise RuntimeError(method + ": " + json.dumps(msg["error"]))
                return msg.get("result", {})

    def close(self):
        try:
            self.p.terminate()
        except Exception:
            pass


def find_chrome():
    for p in [
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/usr/bin/google-chrome", "/usr/bin/chromium",
    ]:
        if os.path.exists(p):
            return p
    raise SystemExit("m1-measure: no Chrome found")


def main():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    target = sys.argv[1] if len(sys.argv) > 1 else None
    if not target:
        local = os.path.join(root, "_m1-final.html")
        try:
            urllib.request.urlopen("http://localhost:8744/_m1-final.html", timeout=1)
            target = "http://localhost:8744/_m1-final.html"
        except Exception:
            target = "file:///" + local.replace("\\", "/")

    print("M1 ONE-SCREEN GATE")
    print("target   :", target)
    print("rule     : panel content height <= innerHeight - %d" % HEADROOM)
    print()

    ch = Chrome(find_chrome())
    fails, rows = [], []
    try:
        ch.cmd("Page.enable")
        for w, h, label in BRACKETS:
            ch.cmd("Emulation.setDeviceMetricsOverride",
                   width=w, height=h, deviceScaleFactor=1, mobile=(w < 768))
            ch.cmd("Page.navigate", url=target)
            time.sleep(0.9)
            r = ch.cmd("Runtime.evaluate", expression=PROBE, returnByValue=True)
            d = json.loads(r["result"]["value"])

            budget = d["vh"] - HEADROOM
            over = d["contentH"] - budget
            hoverflow = d["scrollW"] > d["vw"]
            ok = over <= 0 and not hoverflow

            # item 98: the offer itself must sit on the first screen
            offer_ok = all(x and x["bottom"] <= d["vh"] and x["right"] <= d["vw"]
                           for x in d["doors"])
            ok = ok and offer_ok

            dropped = [n for n, _ in PRESENCE if not d["present"][n]]
            rows.append((w, h, d["contentH"], budget, over, ok, dropped,
                         d["marksShown"], hoverflow, offer_ok, label))
            if not ok:
                fails.append((w, h, over, hoverflow, offer_ok))
    finally:
        ch.close()

    for (w, h, sh, budget, over, ok, dropped, marks, hof, offer_ok, label) in rows:
        print("%-4s %sx%-5s  content %-5d budget %-5d  %s%s%s"
              % ("PASS" if ok else "FAIL", w, h, sh, budget,
                 ("+%d OVER" % over) if over > 0 else "%d to spare" % -over,
                 "  H-OVERFLOW" if hof else "",
                 "  OFFER CLIPPED" if not offer_ok else ""))
        print("       %s" % label)
        print("       marks shown: %d   yielded: %s"
              % (marks, ", ".join(dropped) if dropped else "nothing"))
        print()

    if fails:
        print("GATE FAILED at %d bracket(s) — this blocks merge." % len(fails))
        return 1
    print("GATE PASSED at all %d brackets." % len(rows))
    return 0


if __name__ == "__main__":
    sys.exit(main())
