# -*- coding: utf-8 -*-
# Arcana reading — generator. Portable: reads its inputs from this folder
# (arcana-build/) and codex-data.json from the repo root one level up.
# Run:  python gen_artifact3.py   -> writes arcana-reading-artifact.html here.
import json, io, os
BASE = os.path.dirname(os.path.abspath(__file__))          # arcana-build/
REPO = os.path.dirname(BASE)                                # blue-room-scan-room/
codex = json.dumps(json.load(open(os.path.join(REPO, 'codex-data.json'), encoding='utf-8')), ensure_ascii=True, separators=(',', ':'))
kb = open(os.path.join(BASE, 'kb_compact.json'), encoding='utf-8').read()

# --- fleet-authored practical depth for all 36 identity results ---
PRACTICAL = open(os.path.join(BASE, 'practical.json'), encoding='utf-8').read()

HEAD = open(os.path.join(BASE, 'gen_head.css'), encoding='utf-8').read()
BODY = open(os.path.join(BASE, 'gen_body.js'), encoding='utf-8').read()
FONTS = open(os.path.join(BASE, 'fonts.css'), encoding='utf-8').read()
KWCOLOR = open(os.path.join(BASE, 'kwcolor.json'), encoding='utf-8').read()

html = (HEAD.replace("__FONTS__", FONTS) + "\n" + BODY
        .replace("__CODEX__", codex).replace("__KB__", kb).replace("__PRACTICAL__", PRACTICAL).replace("__KWCOLOR__", KWCOLOR))
# ASCII-safe
parts, res = html.split('<script'), []
for i, p in enumerate(parts):
    if i == 0:
        res.append(''.join(c if ord(c) < 128 else '&#%d;' % ord(c) for c in p))
    else:
        h, sep, tail = p.partition('>')
        res.append('<script' + h + sep + ''.join(c if ord(c) < 128 else '\\u%04x' % ord(c) for c in tail))
html = ''.join(res)
assert html.isascii()
out = os.path.join(BASE, 'arcana-reading-artifact.html')
io.open(out, 'w', encoding='utf-8').write(html)
print("written KB", round(len(html.encode('utf-8'))/1024, 1), "ascii", html.isascii())
