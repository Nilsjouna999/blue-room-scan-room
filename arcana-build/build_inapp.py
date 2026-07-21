# -*- coding: utf-8 -*-
# Build the IN-APP arcana reading from the artifact sources. Produces, at the repo
# root: arcana-reading.js (window.BRArcanaReading.mount) + arcana-reading.css.
# The full engine (birth-derived draw + per-draw record pages) is ported verbatim
# from gen_body.js; only its data source (inline -> fetch) and mount are adapted.
#   Run:  python arcana-build/build_inapp.py
import os, json
BASE = os.path.dirname(os.path.abspath(__file__))   # arcana-build/
REPO = os.path.dirname(BASE)                          # repo root

# ---- CSS: gen_head.css -> arcana-reading.css (drop <title>/<style> wrapper, inline fonts) ----
head  = open(os.path.join(BASE, 'gen_head.css'), encoding='utf-8').read()
fonts = open(os.path.join(BASE, 'fonts.css'),    encoding='utf-8').read()
css   = head.replace('__FONTS__', fonts)
css   = css[css.index('<style>') + len('<style>') : css.rindex('</style>')].strip()
css  += '\n.top__back{border:1px solid var(--edge);border-radius:2px;padding:6px 12px}'   # in-app back-to-profile button
open(os.path.join(REPO, 'arcana-reading.css'), 'w', encoding='utf-8').write(css)

# ---- JS: gen_body.js -> arcana-reading.js ----
body = open(os.path.join(BASE, 'gen_body.js'), encoding='utf-8').read()
skeleton, _, rest = body.partition('<script>')       # split at the engine script
engine, _, _      = rest.rpartition('</script>')     # the IIFE:  (function(){ ... })();
for ph in ('__CODEX__', '__KB__', '__PRACTICAL__', '__KWCOLOR__'):
    skeleton = skeleton.replace(ph, '')              # data filled at runtime, not build time
# in-app only: a back-to-profile link in the reading header (the standalone artifact has none)
skeleton = skeleton.replace('<header class="top">', '<header class="top"><a href="?dev=profile" class="top__back">← Profile</a>', 1)
eng = engine.strip()
assert eng.startswith('(function(){') and eng.endswith('})();'), eng[:40]
eng_body = eng[len('(function(){'):-len('})();')]    # unwrap the IIFE

js = (
'/* ============================================================\n'
'   THE ARCANA READING (?dev=arcana-reading) — the FULL reading:\n'
'   birth-derived draw (default: Antton Aikio, 9 Apr 2001, Inari) + per-draw\n'
'   record pages ("Open the record"). PORTED IN-APP from the artifact engine\n'
'   (arcana-build/gen_body.js), data inline->fetch. Exposes window.BRArcanaReading.\n'
'   DO NOT hand-edit — regenerate: python arcana-build/build_inapp.py\n'
'============================================================ */\n'
'(function () {\n'
'  "use strict";\n'
'  var SKELETON = ' + json.dumps(skeleton) + ';\n'
'  var cssDone = false;\n'
'  function injectCSS() {\n'
'    if (cssDone || document.getElementById("arc-full-css")) return;\n'
'    cssDone = true;\n'
'    var l = document.createElement("link");\n'
'    l.id = "arc-full-css"; l.rel = "stylesheet"; l.href = "arcana-reading.css";\n'
'    document.head.appendChild(l);\n'
'  }\n'
'  function ENGINE() {\n'
+ eng_body + '\n'
'  }\n'
'  window.BRArcanaReading = { mount: function (host) {\n'
'    injectCSS();\n'
'    Promise.all([\n'
'      fetch("codex-data.json").then(function (r) { return r.text(); }),\n'
'      fetch("arcana-build/kb_compact.json").then(function (r) { return r.text(); }),\n'
'      fetch("arcana-build/practical.json").then(function (r) { return r.text(); }),\n'
'      fetch("arcana-build/kwcolor.json").then(function (r) { return r.text(); })\n'
'    ]).then(function (t) {\n'
'      host.innerHTML = SKELETON;\n'
'      host.querySelector("#codex").textContent = t[0];\n'
'      host.querySelector("#kb").textContent = t[1];\n'
'      host.querySelector("#practical").textContent = t[2];\n'
'      host.querySelector("#kwcolor").textContent = t[3];\n'
'      ENGINE();\n'
'    }).catch(function (e) {\n'
'      host.innerHTML = \'<p style="padding:48px;color:#948f87;text-align:center;font-family:sans-serif">The reading failed to load (\' + e + \').</p>\';\n'
'    });\n'
'  } };\n'
'})();\n'
)
open(os.path.join(REPO, 'arcana-reading.js'), 'w', encoding='utf-8').write(js)
print("wrote arcana-reading.js", round(len(js) / 1024, 1), "KB ; arcana-reading.css", round(len(css) / 1024, 1), "KB")
