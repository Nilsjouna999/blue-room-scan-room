# -*- coding: utf-8 -*-
import urllib.request, re, base64, os
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
BASE = os.path.dirname(os.path.abspath(__file__))  # arcana-build/

def get(url, binary=False):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read() if binary else r.read().decode("utf-8")

# family spec -> the @font-face family name we want in output
JOBS = [
    ("Cormorant+Garamond:ital,wght@0,500;0,600;1,500", "Cormorant Garamond"),
    ("IBM+Plex+Mono:wght@400;500", "IBM Plex Mono"),
]
# keep only latin + latin-ext subsets (covers the reading incl. accents); drop cyrillic/greek/vietnamese
KEEP = ("U+0000", "U+0100", "U+0102", "U+1E", "U+2")  # latin + latin-ext-ish range starts

out_css = []
total = 0
for spec, fam in JOBS:
    css = get("https://fonts.googleapis.com/css2?family=" + spec + "&display=swap")
    blocks = re.findall(r'@font-face\s*{[^}]+}', css)
    kept = 0
    for b in blocks:
        ur = re.search(r'unicode-range:\s*([^;]+);', b)
        rng = (ur.group(1) if ur else "").strip()
        # keep ONLY basic-latin (U+0000...) + latin-ext (U+0100...); drop vietnamese/greek/cyrillic
        if not (rng.startswith("U+0000") or rng.startswith("U+0100")):
            continue
        m = re.search(r'src:\s*url\((https://[^)]+\.woff2)\)\s*format\(([^)]+)\)', b)
        if not m: continue
        woff = get(m.group(1), binary=True)
        total += len(woff)
        data = "data:font/woff2;base64," + base64.b64encode(woff).decode("ascii")
        b2 = b.replace(m.group(1), data)
        # force swap
        if "font-display" not in b2:
            b2 = b2.replace("@font-face {", "@font-face {font-display:swap;")
        out_css.append(b2)
        kept += 1
    print(fam, "kept", kept, "blocks")

css_text = "\n".join(out_css)
open(os.path.join(BASE, "fonts.css"), "w", encoding="utf-8").write(css_text)
print("total woff2 bytes", round(total/1024,1), "KB | fonts.css", round(len(css_text)/1024,1), "KB (base64)")
