# -*- coding: utf-8 -*-
import json, html, io, os
SP = os.path.dirname(os.path.abspath(__file__))
data = json.load(open(os.path.join(SP, 'codex-data.json'), encoding='utf-8'))

def disp(sysname):
    s = sysname.lower()
    if 'western' in s or ('zodiac' in s and 'sun' in s): return ('western', 'The Western Zodiac', 'the twelve sun signs')
    if 'chinese' in s: return ('chinese', 'The Chinese Zodiac & Five Elements', 'twelve animals, five elements')
    if 'numerolog' in s: return ('numerology', 'Numerology', 'the core & master numbers')
    if 'tarot' in s or 'arcana' in s: return ('tarot', 'The Major Arcana', 'the twenty-two')
    if 'rune' in s or 'futhark' in s: return ('runes', 'The Elder Futhark', 'the twenty-four runes')
    if 'trigram' in s: return ('trigrams', 'The Eight Trigrams', 'the building blocks')
    if 'ching' in s or 'hexagram' in s: return ('iching', 'The I Ching', 'the sixty-four hexagrams')
    if 'lexicon' in s: return ('lexicon', 'The Blue Room Lexicon', 'the instruments & records')
    return (s.replace(' ', '-'), sysname, '')

def esc(x): return html.escape(str(x if x is not None else ''))

secs = []
navs = []
for w in data:
    sid, title, sub = disp(w.get('system', ''))
    navs.append(f'<a href="#{sid}">{esc(title)}</a>')
    cards = []
    for e in w.get('entries', []):
        kw = ''.join(f'<span class="kw">{esc(k)}</span>' for k in (e.get('keywords') or []))
        rev = e.get('reversed') or ''
        rev_html = f'<p class="rev"><span class="rev-l">Reversed</span> {esc(rev)}</p>' if rev.strip() else ''
        cards.append(
            '<article class="card" data-search="' + esc((e.get('name','') + ' ' + ' '.join(e.get('keywords') or []) + ' ' + e.get('tag','')).lower()) + '">'
            + f'<h3 class="c-name">{esc(e.get("name",""))}</h3>'
            + f'<p class="c-tag">{esc(e.get("tag",""))}</p>'
            + (f'<div class="c-kw">{kw}</div>' if kw else '')
            + f'<p class="c-mean">{esc(e.get("meaning",""))}</p>'
            + rev_html
            + '</article>')
    note = esc(w.get('systemNote', ''))
    img = esc(w.get('systemImage', ''))
    img_html = (f'<figure class="sys-img"><img src="{img}" alt="{esc(title)}" loading="lazy"></figure>' if img else '')
    secs.append(
        f'<section class="sys" id="{sid}">'
        + f'<div class="sys-head"><h2 class="sys-title">{esc(title)}</h2><span class="sys-sub">{esc(sub)}</span></div>'
        + img_html
        + (f'<p class="sys-note">{note}</p>' if note else '')
        + f'<div class="grid">{"".join(cards)}</div>'
        + '</section>')

total = sum(len(w.get('entries', [])) for w in data)
CSS = """
:root{--bg:#100e0c;--bg2:#17130f;--ink:#e9e2d5;--ink-2:#c7bdae;--dim:#8c8175;--faint:#645a4f;--hair:#332c25;--hair-2:#241f1a;--gold:#c69b63;--gold-dim:#8f7145;--card:#1a1510}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:radial-gradient(130% 90% at 50% -8%,#1c1712 0%,var(--bg) 62%);color:var(--ink);font-family:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,"Times New Roman",serif;-webkit-font-smoothing:antialiased;line-height:1.5}
.mono{font-family:"SFMono-Regular",ui-monospace,"Cascadia Mono",Consolas,"Liberation Mono",monospace}
.wrap{max-width:1120px;margin:0 auto;padding:0 26px}
header.top{text-align:center;padding:66px 0 26px}
.brand{font-family:"SFMono-Regular",ui-monospace,Consolas,monospace;font-size:11px;letter-spacing:.42em;text-transform:uppercase;color:var(--gold-dim)}
.title{font-size:clamp(38px,6vw,60px);font-weight:600;letter-spacing:.01em;margin:12px 0 6px;color:var(--ink)}
.tagline{font-style:italic;font-size:15px;color:var(--dim);margin:0}
.count{font-family:"SFMono-Regular",ui-monospace,Consolas,monospace;font-size:10.5px;letter-spacing:.24em;text-transform:uppercase;color:var(--faint);margin-top:16px}
nav.index{position:sticky;top:0;z-index:5;background:linear-gradient(180deg,rgba(16,14,12,.97),rgba(16,14,12,.86));backdrop-filter:blur(6px);border-top:1px solid var(--hair-2);border-bottom:1px solid var(--hair-2);padding:12px 0;margin-top:26px}
nav.index .wrap{display:flex;gap:20px;flex-wrap:wrap;align-items:center;justify-content:center}
nav.index a{font-family:"SFMono-Regular",ui-monospace,Consolas,monospace;font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--dim);text-decoration:none;transition:color .15s}
nav.index a:hover{color:var(--gold)}
.search{display:block;margin:6px auto 0;width:min(420px,86vw);background:#0d0b09;border:1px solid var(--hair);border-radius:999px;color:var(--ink);font-family:"SFMono-Regular",ui-monospace,Consolas,monospace;font-size:12px;letter-spacing:.06em;padding:9px 16px;outline:none}
.search::placeholder{color:var(--faint)}
.search:focus{border-color:var(--gold-dim)}
main{padding:20px 0 90px}
.sys{padding:44px 0 8px}
.sys-head{display:flex;align-items:baseline;gap:14px;border-bottom:1px solid var(--hair);padding-bottom:12px;margin-bottom:8px}
.sys-title{font-size:27px;font-weight:600;margin:0;color:var(--ink)}
.sys-sub{font-family:"SFMono-Regular",ui-monospace,Consolas,monospace;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold-dim)}
.sys-note{font-style:italic;font-size:13.5px;color:var(--dim);max-width:760px;margin:14px 0 24px;line-height:1.6}
.sys-img{margin:20px 0 6px;max-width:460px}
.sys-img img{width:100%;height:auto;display:block;border:1px solid var(--hair);border-radius:10px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}
.card{background:linear-gradient(180deg,rgba(255,255,255,.014),rgba(0,0,0,.14)),var(--card);border:1px solid var(--hair);border-radius:9px;padding:17px 19px}
.c-name{font-size:20px;font-weight:600;margin:0 0 5px;color:var(--ink)}
.c-tag{font-family:"SFMono-Regular",ui-monospace,Consolas,monospace;font-size:10.5px;letter-spacing:.06em;color:var(--gold-dim);margin:0 0 11px}
.c-kw{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 12px}
.kw{font-family:"SFMono-Regular",ui-monospace,Consolas,monospace;font-size:9.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--dim);border:1px solid var(--hair);border-radius:4px;padding:3px 7px}
.c-mean{font-size:14px;color:var(--ink-2);margin:0;line-height:1.62}
.rev{font-size:13px;color:var(--dim);margin:11px 0 0;padding-top:10px;border-top:1px solid var(--hair-2);line-height:1.55}
.rev-l{font-family:"SFMono-Regular",ui-monospace,Consolas,monospace;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold-dim);margin-right:8px}
.no-results{display:none;text-align:center;color:var(--dim);font-style:italic;padding:60px 0}
footer{text-align:center;color:var(--faint);font-family:"SFMono-Regular",ui-monospace,Consolas,monospace;font-size:10px;letter-spacing:.24em;text-transform:uppercase;padding:30px 0 60px;border-top:1px solid var(--hair-2)}
.back{position:fixed;top:20px;left:24px;z-index:10;font-family:"SFMono-Regular",ui-monospace,Consolas,monospace;font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--dim);text-decoration:none;transition:color .15s}
.back:hover{color:var(--gold)}
.searchrow{display:flex;gap:14px;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;margin-top:6px}
.searchrow .search{margin:0}
.searchrow #q{flex:1 1 300px;max-width:520px}
.dict{position:relative;flex:0 1 300px;margin-left:auto}
.search--dict{width:100%}
.dict-out{position:absolute;right:0;top:calc(100% + 8px);z-index:6;width:min(380px,86vw);background:#0d0b09;border:1px solid var(--hair);border-radius:10px;padding:14px 16px;box-shadow:0 18px 44px rgba(0,0,0,.55)}
.dict-out[hidden]{display:none}
.dict-word{font-size:18px;font-weight:600;color:var(--ink)}
.dict-phon{font-family:"SFMono-Regular",ui-monospace,Consolas,monospace;font-size:12px;color:var(--gold-dim);margin-left:6px}
.dict-pos{font-family:"SFMono-Regular",ui-monospace,Consolas,monospace;font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold-dim);margin:12px 0 5px}
.dict-def{font-size:13.5px;color:var(--ink-2);line-height:1.55;margin:0 0 5px}
.dict-status{font-style:italic;color:var(--dim);font-size:13px}
.dict-src{font-family:"SFMono-Regular",ui-monospace,Consolas,monospace;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--faint);margin-top:12px}
"""
JS = """
const q=document.getElementById('q');const cards=[...document.querySelectorAll('.card')];const syss=[...document.querySelectorAll('.sys')];const nr=document.getElementById('nr');
q.addEventListener('input',()=>{const v=q.value.trim().toLowerCase();let any=false;cards.forEach(c=>{const hit=!v||c.dataset.search.includes(v);c.style.display=hit?'':'none';if(hit)any=true;});syss.forEach(s=>{const vis=[...s.querySelectorAll('.card')].some(c=>c.style.display!=='none');s.style.display=vis?'':'none';});nr.style.display=any?'none':'block';});
/* the English dictionary — a second search, far right; looks up definitions via the free Dictionary API */
const dq=document.getElementById('dq');const dout=document.getElementById('dict-out');
function de(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function dstat(t){dout.hidden=false;dout.innerHTML='<div class="dict-status">'+t+'</div>';}
function dlookup(w){w=(w||'').trim();if(!w){dout.hidden=true;return;}dstat("looking up “"+de(w)+"”…");
fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+encodeURIComponent(w.toLowerCase())).then(function(r){return r.ok?r.json():Promise.reject();}).then(function(data){var e=data[0]||{};var ph=e.phonetic||((e.phonetics||[]).map(function(p){return p.text;}).filter(Boolean)[0]||'');var h='<div class="dict-word">'+de(e.word||w)+(ph?'<span class="dict-phon">'+de(ph)+'</span>':'')+'</div>';(e.meanings||[]).slice(0,3).forEach(function(m){h+='<div class="dict-pos">'+de(m.partOfSpeech||'')+'</div>';(m.definitions||[]).slice(0,2).forEach(function(d,i){h+='<div class="dict-def">'+(i+1)+'. '+de(d.definition||'')+'</div>';});});h+='<div class="dict-src">Free Dictionary · English</div>';dout.hidden=false;dout.innerHTML=h;}).catch(function(){dstat("No English definition found for “"+de(w)+"”.");});}
dq.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();dlookup(dq.value);}});
document.addEventListener('click',function(e){if(!e.target.closest('.dict'))dout.hidden=true;});
"""
doc = (
    '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
    + '<title>Blue Room · Codex</title><style>' + CSS + '</style></head><body>'
    + '<a class="back" href="index.html">← Blue Room</a>'
    + '<header class="top"><div class="wrap"><div class="brand">◆ Blue Room · Codex</div>'
    + '<h1 class="title">The Codex</h1><p class="tagline">the archive’s standing meanings — what each sign, number, card, animal, rune, and hexagram holds</p>'
    + f'<div class="count">{total} entries · {len(data)} systems · the first bank</div></div></header>'
    + '<nav class="index"><div class="wrap">' + ''.join(navs) + '</div></nav>'
    + '<div class="wrap searchrow">'
    +   '<input id="q" class="search" type="search" placeholder="search the codex — a sign, a card, a keyword…" autocomplete="off">'
    +   '<div class="dict"><input id="dq" class="search search--dict" type="search" placeholder="define an English word…" autocomplete="off"><div id="dict-out" class="dict-out" hidden></div></div>'
    + '</div>'
    + '<main><div class="wrap">' + ''.join(secs) + '<div id="nr" class="no-results">No entry matches.</div></div></main>'
    + '<footer>Blue Room Codex · first bank · canonical meanings, plainly stated</footer>'
    + '<script>' + JS + '</script></body></html>')
io.open(os.path.join(SP, 'codex.html'), 'w', encoding='utf-8').write(doc)
print('codex.html written,', total, 'entries,', len(doc), 'chars')
