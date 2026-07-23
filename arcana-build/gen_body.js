<header class="top">
  <a href="#" id="home">Blue&nbsp;Room &middot; Arcana</a>
  <span class="bar"><i id="bar"></i></span>
  <button class="redraw" id="redraw" type="button">Draw again</button>
</header>
<main id="app"></main>
<script id="codex" type="application/json">__CODEX__</script>
<script id="kb" type="application/json">__KB__</script>
<script id="practical" type="application/json">__PRACTICAL__</script>
<script id="kwcolor" type="application/json">__KWCOLOR__</script>
<script>
(function(){
  var CODEX=JSON.parse(document.getElementById("codex").textContent);
  var KB=JSON.parse(document.getElementById("kb").textContent);
  var PRAC=JSON.parse(document.getElementById("practical").textContent);
  var KWC=JSON.parse(document.getElementById("kwcolor").textContent);
  // authored keyword-colour lexicon: each perk tinted by its semantic family
  function keysHTML(kws){return kws&&kws.length?'<ul class="keys">'+kws.map(function(k){return '<li style="color:'+(KWC[String(k).toLowerCase()]||"#9c9790")+'">'+esc(k)+'</li>'}).join("")+'</ul>':""}
  function esc(s){return String(s==null?"":s).replace(/[&<>]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;"}[c]})}
  function hash(s){var h=2166136261,i;for(i=0;i<s.length;i++){h^=s.charCodeAt(i);h=(h*16777619)>>>0}return h>>>0}
  function pick(l,s){return l&&l.length?l[hash(s)%l.length]:null}
  function deac(s){return String(s).normalize("NFD").replace(/[̀-ͯ]/g,"")}
  function slugify(s){return deac(String(s)).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"x"}
  function norm(s){return deac(s).toLowerCase().replace(/^the\s+/,"").replace(/[^a-z0-9 ]/g,"").trim()}

  var by={};
  CODEX.forEach(function(sys){var k=String(sys.system||"").toLowerCase();
    var slot=/western|sun sign/.test(k)?"sun":/chinese/.test(k)?"chinese":/numerolog/.test(k)?"lifePath":/tarot/.test(k)?"tarotMajor":/rune|futhark/.test(k)?"rune":/trigram/.test(k)?"trigram":/i ching/.test(k)?"hexagram":null;
    if(slot)by[slot]=sys.entries||[];});
  if(by.chinese){var an=by.chinese.filter(function(e){return /fixed element:/i.test(String(e.tag||""))});if(an.length)by.chinese=an}
  var LABEL={sun:"Constellation",chinese:"Year Animal",lifePath:"Life Path",tarotMajor:"Tarot",rune:"Elder Futhark",trigram:"Trigram",hexagram:"I Ching"};
  var JOB={sun:"The present-life temperament — how the pattern is read to show up now.",
    chinese:"The social and ancestral persona — the year's animal, read relationally.",
    lifePath:"The through-line — the single number a life is said to reduce to.",
    tarotMajor:"The open draw — a situation handed back as an archetype to sit with.",
    rune:"A terse counsel — one stave, one prompt, nothing more.",
    trigram:"A primary force — one of the eight gates the changes are built from.",
    hexagram:"The situation as change — a moment in motion, never a fixed fate."};
  var IDENTITY={sun:1,chinese:1,lifePath:1};

  var RUNE={Fehu:"ᚠ",Uruz:"ᚢ",Thurisaz:"ᚦ",Ansuz:"ᚨ",Raidho:"ᚱ",Kenaz:"ᚲ",Gebo:"ᚷ",Wunjo:"ᚹ",Hagalaz:"ᚺ",Nauthiz:"ᚾ",Isa:"ᛁ",Jera:"ᛃ",Eihwaz:"ᛇ",Perthro:"ᛈ",Algiz:"ᛉ",Sowilo:"ᛊ",Tiwaz:"ᛏ",Berkano:"ᛒ",Ehwaz:"ᛖ",Mannaz:"ᛗ",Laguz:"ᛚ",Ingwaz:"ᛜ",Dagaz:"ᛞ",Othala:"ᛟ"};
  /* BR-S195: the eight trigrams keyed by the hexagram tags' own words ("X over Y");
     l = lines bottom→top (1 yang solid, 0 yin broken), fam = the bagua family role.
     TRIG_RING is the ring order with all four complementary pairs facing (+4 = opposite). */
  var TRIG={Heaven:{g:"☰",l:[1,1,1],fam:"the father"},Earth:{g:"☷",l:[0,0,0],fam:"the mother"},Thunder:{g:"☳",l:[1,0,0],fam:"the eldest son"},Water:{g:"☵",l:[0,1,0],fam:"the middle son"},Mountain:{g:"☶",l:[0,0,1],fam:"the youngest son"},Wind:{g:"☴",l:[0,1,1],fam:"the eldest daughter"},Fire:{g:"☲",l:[1,0,1],fam:"the middle daughter"},Lake:{g:"☱",l:[1,1,0],fam:"the youngest daughter"}};
  var TRIG_RING=["Heaven","Wind","Water","Mountain","Earth","Thunder","Fire","Lake"];
  var ZOD=["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
  var ZGL=["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"];
  var ANI=["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"];
  var KAN={Rat:"鼠",Ox:"牛",Tiger:"虎",Rabbit:"兔",Dragon:"龍",Snake:"蛇",Horse:"馬",Goat:"羊",Monkey:"猴",Rooster:"雞",Dog:"狗",Pig:"豬"};
  function emblem(key,e){
    if(key==="rune")return RUNE[e.name]||"ᚠ";
    if(key==="chinese")return KAN[e.name]||e.name.charAt(0);
    if(key==="lifePath")return String(e.name);
    if(key==="trigram")return String(e.name).trim().charAt(0);
    if(key==="hexagram"){var n=parseInt(String(e.name),10);return n?String.fromCodePoint(0x4DBF+n):"?"}
    if(key==="tarotMajor")return String(e.tag||"").split(/\s+/)[0]||"?";
    if(key==="sun"){var m=/([♈-♓])/.exec(String(e.tag||""));return m?m[1]:e.name.charAt(0)}
    return e.name.charAt(0);
  }
  function emblemHTML(key,e,cls){var g=emblem(key,e);
    var sub=(key==="hexagram")?'<sub>'+esc((String(e.name).match(/^\d+/)||[""])[0])+'</sub>':"";
    return '<span class="emblem '+cls+'" aria-hidden="true">'+esc(g)+sub+'</span>';}

  // crown name from the draw
  var EP={"fire|wood":"Kindling-Fed","fire|fire":"Twice-Kindled","fire|earth":"Ember-Banked","fire|metal":"Forge-Hot","fire|water":"Steam-Tempered","earth|wood":"Root-Bound","earth|fire":"Slow-Burning","earth|earth":"Unmoved","earth|metal":"Ore-Veined","earth|water":"Deep-Rooted","air|wood":"Branch-Borne","air|fire":"Quick-Kindled","air|earth":"Ballasted","air|metal":"Keen-Edged","air|water":"Mist-Minded","water|wood":"Sap-Risen","water|fire":"Quenched","water|earth":"Silt-Bearing","water|metal":"Cold-Forged","water|water":"Twice-Tided"};
  // ROLE ← the RUNE (BR-S191 — tarot moved to the Drawing Room; keys = norm(rune name), agent-nouns, no EP-epithet stem echoes)
  var RO={"fehu":"Steward","uruz":"Stalwart","thurisaz":"Breaker","ansuz":"Speaker","raidho":"Wayfarer","kenaz":"Illuminator","gebo":"Giver","wunjo":"Gladdener","hagalaz":"Weatherer","nauthiz":"Endurer","isa":"Stillholder","jera":"Harvester","eihwaz":"Upholder","perthro":"Caster","algiz":"Warder","sowilo":"Daybringer","tiwaz":"Oathkeeper","berkano":"Cultivator","ehwaz":"Rider","mannaz":"Knower","laguz":"Seafarer","ingwaz":"Seedkeeper","dagaz":"Awakener","othala":"Inheritor"};
  var BIND={qian:"under an unresting sky",kun:"on ground that receives",zhen:"at the first shock",xun:"by patient penetration",kan:"through the defile",li:"in clinging light",gen:"at the stopping place",dui:"in open water"};
  var DENY=/^(wealth|success|victory|achievement|abundance|earned|reward|prosperity|triumph|glory|luck|fortune|gain|win|journey|destiny|blessing|harmony)$/i;
  function wEl(t){var m=/\b(fire|earth|air|water)\b/i.exec(String(t||""));return m?m[1].toLowerCase():null}
  function cEl(t){var m=/fixed element:\s*([a-z]+)/i.exec(String(t||""));return m?m[1].toLowerCase():null}
  function triKey(n){var m=/([A-Za-z]{2,})/.exec(deac(n));return m?m[1].toLowerCase():""}
  function lex(r,t){var pool=(r.keywords||[]).concat(t.keywords||[]),i,w;
    for(i=0;i<pool.length;i++){w=String(pool[i]).toLowerCase().trim();if(/^[a-z-]+$/.test(w)&&!DENY.test(w))return w}
    for(i=0;i<pool.length;i++){var p=String(pool[i]).toLowerCase().trim().split(/[\s\/]+/);w=p[p.length-1];if(w&&!DENY.test(w))return w}return "record"}
  function crownOf(d){var el=(wEl(d.sun.tag)||"earth")+"|"+(cEl(d.chinese.tag)||"earth");
    return {name:"The "+(EP[el]||"Twice-Marked")+" "+(RO[norm(d.rune.name)]||"Bearer"),epithet:EP[el]||"Twice-Marked",role:RO[norm(d.rune.name)]||"Bearer",binding:BIND[triKey(d.trigram.name)]||"in the open",lexicon:lex(d.rune,d.trigram),sunEl:wEl(d.sun.tag),chiEl:cEl(d.chinese.tag)}}

  var CH=[["I · The Named",[["Sun sign","sun","sun"],["Year animal","chinese","chinese"],["Life path","lifePath","life"]]],
          ["II · The Counsel",[["Rune","rune","rune"],["Trigram","trigram","trigram"]]],
          ["III · The Standing",[["Hexagram","hexagram","hex"]]]];
  function drawFor(seed){var d={sun:pick(by.sun,seed+"a"),chinese:pick(by.chinese,seed+"b"),life:pick(by.lifePath,seed+"c"),rune:pick(by.rune,seed+"f"),trigram:pick(by.trigram,seed+"g"),hex:pick(by.hexagram,seed+"h")};
    return {d:d,marks:marksFor(d),crown:crownOf(d)}}
  function marksFor(d){var marks=[];CH.forEach(function(ch){ch[1].forEach(function(p){var e=d[p[2]];if(e)marks.push({slot:p[0],key:p[1],entry:e,chapter:ch[0]})})});return marks}
  // ---- birth-derived reading: sun sign from the date, animal from the year, life path from the digit sum; the rest drawn from the name+date seed ----
  var MON=["January","February","March","April","May","June","July","August","September","October","November","December"];
  function sunSign(m,d){var b=[[1,20,"Aquarius"],[2,19,"Pisces"],[3,21,"Aries"],[4,20,"Taurus"],[5,21,"Gemini"],[6,21,"Cancer"],[7,23,"Leo"],[8,23,"Virgo"],[9,23,"Libra"],[10,23,"Scorpio"],[11,22,"Sagittarius"],[12,22,"Capricorn"]];var cur=b[m-1];return d>=cur[1]?cur[2]:b[(m+10)%12][2]}
  function chineseAnimal(y){return ANI[((y-4)%12+12)%12]}
  function reduceNum(n){while(n>9&&n!==11&&n!==22&&n!==33){var t=0;String(n).split("").forEach(function(c){t+=+c});n=t}return n}
  function lifePathNum(y,m,d){var s=""+y+(m<10?"0"+m:m)+(d<10?"0"+d:d),sum=0;s.split("").forEach(function(c){sum+=+c});return reduceNum(sum)}
  function findByName(l,nm){for(var i=0;i<l.length;i++)if(l[i].name===nm)return l[i];return null}
  function birthReading(name,y,m,d,seed){
    var life=null,lp=String(lifePathNum(y,m,d));
    for(var i=0;i<by.lifePath.length;i++){if(String(by.lifePath[i].name)===lp){life=by.lifePath[i];break}}
    var dd={sun:findByName(by.sun,sunSign(m,d)),chinese:findByName(by.chinese,chineseAnimal(y)),life:life||pick(by.lifePath,seed+"c"),
      rune:pick(by.rune,seed+"f"),trigram:pick(by.trigram,seed+"g"),hex:pick(by.hexagram,seed+"h")};
    return {d:dd,marks:marksFor(dd),crown:crownOf(dd),person:{name:name,born:d+" "+MON[m-1]+" "+y}}}
  function readingForSeed(seed){if(seed&&seed.indexOf("birth~")===0){var p=seed.split("~");return birthReading(p[1],+p[2],+p[3],+p[4],seed)}return drawFor(seed)}
  function fragment(mark,c){
    if(mark.slot==="Sun sign"||mark.slot==="Year animal")return "This mark supplied the "+(mark.slot==="Sun sign"?(c.sunEl||"element"):(c.chiEl||"element"))+" behind “"+c.epithet+"” to the name borne.";
    if(mark.slot==="Trigram")return "This mark filed the reading “"+c.binding+"”.";
    if(mark.slot==="Rune")return "This mark supplied “"+c.role+"” to the name borne and set “"+c.lexicon+"” — the word the record keeps returning to.";
    return null;}
  var ROMAN=["","I","II","III","IV","V","VI","VII","VIII"];
  function paras(t,cls){var s=String(t||"").trim().split(/(?:\.\s+)/),o=[],b=[];s.forEach(function(x,i){b.push(x.replace(/\.?$/,"."));if(b.join(" ").length>250||i===s.length-1){o.push(b.join(" "));b=[]}});return o.map(function(p){return '<p class="'+cls+'">'+esc(p)+'</p>'}).join("")}
  function list(arr,cls){return (arr||[]).map(function(x){return '<li>'+esc(x)+'</li>'}).join("")||('<li class="'+cls+'">—</li>')}

  // knowledge-bank lookup (keys differ per system)
  function kbFor(key,e){var pool=KB[key];if(!pool)return null;if(pool[e.name])return pool[e.name];
    if(key==="hexagram"){var n=(String(e.name).match(/\d+/)||[])[0];for(var k in pool){if((k.match(/\d+/)||[])[0]===n)return pool[k]}}
    var want=norm(e.name).split(" ")[0];for(var k in pool){if(norm(k).split(" ")[0]===want)return pool[k]}return null}
  function pracFor(key,e){var pool=PRAC[key];if(!pool)return null;if(pool[e.name])return pool[e.name];
    if(key==="lifePath"){var n=(String(e.name).match(/\d+/)||[])[0];if(pool[n])return pool[n]}return null}

  // ---- compatibility ----
  var ZEL=["Fire","Earth","Air","Water"];
  function sunCompat(i){return {kindred:[(i+4)%12,(i+8)%12],mirror:(i+6)%12,tension:[(i+3)%12,(i+9)%12],element:ZEL[i%4],comp:ZEL[(i%4+2)%4]}}
  function chiCompat(i){return {sanhe:[(i+4)%12,(i+8)%12],liuhe:(13-i)%12,clash:(i+6)%12}}
  function polar(cx,cy,r,i,n){var a=(-90+i*(360/n))*Math.PI/180;return [cx+r*Math.cos(a),cy+r*Math.sin(a)]}
  function wheel(order,glyphs,i,gold,ember){
    var cx=136,cy=136,R=104,pts=order.map(function(_,k){return polar(cx,cy,R,k,order.length)});
    var s='<circle cx="136" cy="136" r="104" fill="none" stroke="rgba(201,163,92,.13)" stroke-width="1"/>';
    gold.forEach(function(j){s+='<line x1="'+pts[i][0].toFixed(1)+'" y1="'+pts[i][1].toFixed(1)+'" x2="'+pts[j][0].toFixed(1)+'" y2="'+pts[j][1].toFixed(1)+'" stroke="#c9a35c" stroke-width="1.25" opacity=".68"/>'});
    ember.forEach(function(j){s+='<line x1="'+pts[i][0].toFixed(1)+'" y1="'+pts[i][1].toFixed(1)+'" x2="'+pts[j][0].toFixed(1)+'" y2="'+pts[j][1].toFixed(1)+'" stroke="#d9704a" stroke-width="1.25" stroke-dasharray="1.5 3.5" opacity=".72"/>'});
    order.forEach(function(_,k){var p=pts[k],cur=k===i,g=gold.indexOf(k)>=0,em=ember.indexOf(k)>=0;
      var col=cur?"#0a0b0d":em?"#d9704a":g?"#e2c489":"#9c968c";
      if(cur)s+='<circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="15" fill="#c9a35c" stroke="#e2c489" stroke-width="1"/>';
      s+='<text x="'+p[0].toFixed(1)+'" y="'+p[1].toFixed(1)+'" text-anchor="middle" dominant-baseline="central" font-size="17" font-weight="500" fill="'+col+'">'+esc(glyphs[k])+'</text>';});
    return '<svg class="wheel" viewBox="0 0 272 272" aria-hidden="true">'+s+'</svg>';}

  function compatSection(key,e){
    if(key==="sun"){var i=ZOD.indexOf(e.name);if(i<0)return "";var c=sunCompat(i);
      var w=wheel(ZOD,ZGL,i,c.kindred,[c.mirror]);
      var nm=function(x){return ZOD[x]};
      var leg='<div><b class="k">Kindred — same element (trine)</b><em>'+nm(c.kindred[0])+' · '+nm(c.kindred[1])+'</em>. Read as easy recognition; the two are said to burn at one temperature.</div>'+
        '<div><b>Complement — '+c.comp+' to '+c.element+'</b>The supporting element. Read as feeding the fire rather than matching it.</div>'+
        '<div><b class="m">Mirror — the opposition</b><em>'+nm(c.mirror)+'</em>. Read as the missing half it is measured against, not the enemy.</div>'+
        '<div><b>In tension — the squares</b><em>'+nm(c.tension[0])+' · '+nm(c.tension[1])+'</em>. Read as friction that sharpens or exhausts, depending.</div>';
      return sec("Compatibility",'<div class="compat">'+w+'<div class="legend">'+leg+'</div></div><p class="prose" style="margin-top:18px;color:var(--t-meta);font-size:14px;font-style:italic">Element pairings are Ptolemaic (the triplicities); sign compatibility is a tendency the tradition draws, never a rule about a person.</p>');}
    if(key==="chinese"){var i=ANI.indexOf(e.name);if(i<0)return "";var c=chiCompat(i);
      var w=wheel(ANI,ANI.map(function(a){return KAN[a]}),i,c.sanhe.concat([c.liuhe]),[c.clash]);
      var nm=function(x){return ANI[x]};
      var leg='<div><b class="k">San He (三合) — three-harmony triangle</b><em>'+nm(c.sanhe[0])+' · '+nm(c.sanhe[1])+'</em>. The tradition’s strongest alliance.</div>'+
        '<div><b>Liu He (六合) — the secret-friend pair</b><em>'+nm(c.liuhe)+'</em>. A quiet, reliable combination.</div>'+
        '<div><b class="m">Clash (六冲) — directly opposite</b><em>'+nm(c.clash)+'</em>. Read as friction to work with, not doom.</div>';
      return sec("Compatibility",'<div class="compat">'+w+'<div class="legend">'+leg+'</div></div>');}
    return "";}

  function sec(h,body,foot){return '<section class="sec'+(foot?' sec--foot':'')+'"><h3 class="sec__h">'+esc(h)+'</h3>'+body+'</section>'}
  function glance(key,e){
    if(key!=="sun")return "";var parts=String(e.tag||"").split("·").map(function(x){return x.trim()});
    if(parts.length<5)return "";
    return sec("At a glance",'<dl class="glance"><div><dt>Dates</dt><dd>'+esc(parts[1])+'</dd></div><div><dt>Element</dt><dd>'+esc(parts[2])+'</dd></div><div><dt>Mode</dt><dd>'+esc(parts[3])+'</dd></div><div><dt>Ruler</dt><dd>'+esc(parts[4])+'</dd></div></dl>');}

  function findEntry(key,slug){var l=by[key]||[];for(var i=0;i<l.length;i++)if(slugify(l[i].name)===slug)return {entry:l[i],idx:i,list:l};return null}

  var CROWN_SVG='<svg viewBox="0 0 24 18" aria-hidden="true"><path d="M2 16 L2.6 5 L8 9.5 L12 2 L16 9.5 L21.4 5 L22 16 Z" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linejoin="round"/><path d="M3.2 16 L20.8 16" stroke="currentColor" stroke-width="1.05"/></svg>';

  // ======== RECORD-PAGE DIAGRAMS (Command 1) ========
  // Line-art on the near-black ground; gold only on the one highlighted/terminal
  // element; ember never; no bars, no scores. SVG presentation attrs take literal
  // colours (CSS var() is not valid there) — kept to the token values.
  var GOLD="#c9a35c",GOLDLIT="#e2c489",GHOST="#96918a",EDGEC="rgba(201,163,92,.13)",ROOM="#0a0b0d";

  // -- SHA-1 (compact, correct) — the soul-signature cipher, derived at render time
  function sha1bytes(str){
    function rotl(n,c){return (n<<c)|(n>>>(32-c))}
    var b=[],i,cc;
    for(i=0;i<str.length;i++){cc=str.charCodeAt(i);
      if(cc<0x80)b.push(cc);
      else if(cc<0x800)b.push(0xc0|(cc>>6),0x80|(cc&0x3f));
      else if(cc<0xd800||cc>=0xe000)b.push(0xe0|(cc>>12),0x80|((cc>>6)&0x3f),0x80|(cc&0x3f));
      else{i++;var u=0x10000+(((cc&0x3ff)<<10)|(str.charCodeAt(i)&0x3ff));b.push(0xf0|(u>>18),0x80|((u>>12)&0x3f),0x80|((u>>6)&0x3f),0x80|(u&0x3f))}}
    var ml=b.length*8;b.push(0x80);while(b.length%64!==56)b.push(0);
    for(i=7;i>=0;i--)b.push((Math.floor(ml/Math.pow(2,i*8)))&0xff);
    var h0=0x67452301,h1=0xEFCDAB89,h2=0x98BADCFE,h3=0x10325476,h4=0xC3D2E1F0,j;
    for(j=0;j<b.length;j+=64){var w=[],a,f,k,t;
      for(i=0;i<16;i++)w[i]=(b[j+i*4]<<24)|(b[j+i*4+1]<<16)|(b[j+i*4+2]<<8)|(b[j+i*4+3]);
      for(i=16;i<80;i++)w[i]=rotl(w[i-3]^w[i-8]^w[i-14]^w[i-16],1);
      a=h0;var bb=h1,c=h2,d=h3,e=h4;
      for(i=0;i<80;i++){
        if(i<20){f=(bb&c)|((~bb)&d);k=0x5A827999}
        else if(i<40){f=bb^c^d;k=0x6ED9EBA1}
        else if(i<60){f=(bb&c)|(bb&d)|(c&d);k=0x8F1BBCDC}
        else{f=bb^c^d;k=0xCA62C1D6}
        t=(rotl(a,5)+f+e+k+w[i])|0;e=d;d=c;c=rotl(bb,30);bb=a;a=t}
      h0=(h0+a)|0;h1=(h1+bb)|0;h2=(h2+c)|0;h3=(h3+d)|0;h4=(h4+e)|0}
    function u8(h){return [(h>>>24)&0xff,(h>>>16)&0xff,(h>>>8)&0xff,h&0xff]}
    return u8(h0).concat(u8(h1),u8(h2),u8(h3),u8(h4));}
  function sigBits(name,n){var by=sha1bytes(String(name)),o=[],i;for(i=0;i<n;i++)o.push((by[i>>3]>>(7-(i&7)))&1);return o}

  // 1 · SOUL-SIGNATURE BLOOM — 9 spokes @40deg from the first 9 SHA-1 bits; filled disc=1, open ring=0
  function bloomSVG(name){
    var bits=sigBits(name,9),cx=100,cy=100,R=72,inner=16,s='',i;
    s+='<circle cx="100" cy="100" r="8.5" fill="none" stroke="currentColor" stroke-width="1" opacity=".45"/>';
    for(i=0;i<9;i++){var a=(-90+i*40)*Math.PI/180,ex=(cx+R*Math.cos(a)).toFixed(1),ey=(cy+R*Math.sin(a)).toFixed(1),sx=(cx+inner*Math.cos(a)).toFixed(1),sy=(cy+inner*Math.sin(a)).toFixed(1);
      s+='<line x1="'+sx+'" y1="'+sy+'" x2="'+ex+'" y2="'+ey+'" stroke="currentColor" stroke-width="2" opacity=".82"/>';
      s+=bits[i]?'<circle cx="'+ex+'" cy="'+ey+'" r="7" fill="currentColor"/>':'<circle cx="'+ex+'" cy="'+ey+'" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/>';}
    return '<svg class="bloom" viewBox="0 0 200 200" role="img" aria-label="Soul-signature crest">'+s+'</svg>';}
  // (bloomBlock removed BR-S195 — the crest now renders seal-scale beside the filing line)

  // 2 · ELEMENTAL CYCLE (Wu Xing) — generative ring + inner controlling pentagram; fixed element is the one gold node
  var WUXING=[["Wood","木"],["Fire","火"],["Earth","土"],["Metal","金"],["Water","水"]];
  function wuIdx(el){var w=String(el||"").toLowerCase();for(var k=0;k<5;k++)if(WUXING[k][0].toLowerCase()===w)return k;return -1}
  function wuxingSVG(el){var idx=wuIdx(el),cx=100,cy=100,R=66,s='',i,pts=[];
    for(i=0;i<5;i++){var a=(-90+i*72)*Math.PI/180;pts.push([cx+R*Math.cos(a),cy+R*Math.sin(a)])}
    for(i=0;i<5;i++){var j=(i+2)%5;s+='<line x1="'+pts[i][0].toFixed(1)+'" y1="'+pts[i][1].toFixed(1)+'" x2="'+pts[j][0].toFixed(1)+'" y2="'+pts[j][1].toFixed(1)+'" stroke="'+EDGEC+'" stroke-width="1" stroke-dasharray="2 3"/>'}
    for(i=0;i<5;i++){var j2=(i+1)%5,lit=idx>=0&&(i===idx||j2===idx);
      s+='<line x1="'+pts[i][0].toFixed(1)+'" y1="'+pts[i][1].toFixed(1)+'" x2="'+pts[j2][0].toFixed(1)+'" y2="'+pts[j2][1].toFixed(1)+'" stroke="'+(lit?GOLD:GHOST)+'" stroke-width="'+(lit?"1.75":"1")+'" opacity="'+(lit?".85":".38")+'"/>'}
    for(i=0;i<5;i++){var p=pts[i],gold=i===idx;
      s+='<circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="16" fill="'+ROOM+'" stroke="'+(gold?GOLDLIT:EDGEC)+'" stroke-width="'+(gold?"1.5":"1")+'"/>';
      s+='<text x="'+p[0].toFixed(1)+'" y="'+p[1].toFixed(1)+'" text-anchor="middle" dominant-baseline="central" font-size="16" fill="'+(gold?GOLDLIT:GHOST)+'">'+WUXING[i][1]+'</text>'}
    return '<svg class="wux" viewBox="0 0 200 200" aria-hidden="true">'+s+'</svg>';}
  function wuxingBlock(animal,el){var idx=wuIdx(el);if(idx<0)return "";
    var cap='The tradition places the '+esc(animal)+' under '+WUXING[idx][0]+', which feeds '+WUXING[(idx+1)%5][0]+' and is checked by '+WUXING[(idx+3)%5][0]+'.';
    return sec("The five phases",'<div class="dia dia--wux">'+wuxingSVG(el)+'<p class="dia__cap">'+cap+'</p></div>');}

  // 3 · DECAN STRIP — the sign's 30deg arc in three Chaldean decans; planet glyphs ghost, all three neutral
  var DECANS=[["Mars","Sun","Venus"],["Mercury","Moon","Saturn"],["Jupiter","Mars","Sun"],["Venus","Mercury","Moon"],["Saturn","Jupiter","Mars"],["Sun","Venus","Mercury"],["Moon","Saturn","Jupiter"],["Mars","Sun","Venus"],["Mercury","Moon","Saturn"],["Jupiter","Mars","Sun"],["Venus","Mercury","Moon"],["Saturn","Jupiter","Mars"]];
  var PLGL={Sun:"☉",Moon:"☽",Mercury:"☿",Venus:"♀",Mars:"♂",Jupiter:"♃",Saturn:"♄"};
  function decanSVG(sign){var i=ZOD.indexOf(sign);if(i<0)return "";var r=DECANS[i],W=300,H=64,pad=8,iw=W-pad*2,cw=iw/3,s='',k;
    s+='<rect x="'+pad+'" y="14" width="'+iw+'" height="36" rx="1.5" fill="none" stroke="'+GOLD+'" stroke-width="1" opacity=".5"/>';
    for(k=0;k<3;k++){var x0=pad+cw*k,cx=x0+cw/2;
      if(k>0)s+='<line x1="'+x0.toFixed(1)+'" y1="14" x2="'+x0.toFixed(1)+'" y2="50" stroke="'+GOLD+'" stroke-width="1" opacity=".28"/>';
      s+='<text x="'+cx.toFixed(1)+'" y="29" text-anchor="middle" dominant-baseline="central" font-size="18" fill="'+GHOST+'">'+PLGL[r[k]]+'</text>';
      s+='<text x="'+cx.toFixed(1)+'" y="43" text-anchor="middle" dominant-baseline="central" font-size="7" letter-spacing="0.5" fill="'+GOLD+'" opacity=".78" font-family="IBM Plex Mono,monospace">'+(k*10)+'°–'+((k+1)*10)+'°</text>'}
    return '<svg class="dec" viewBox="0 0 300 64" aria-hidden="true">'+s+'</svg>';}
  function decanBlock(sign){if(ZOD.indexOf(sign)<0)return "";
    var cap='Each sign divides into three ten-degree decans, each under a planet in the Chaldean order. The reading holds the sign, not the degree — so all three faces are shown, none pinned.';
    return sec("The three decans",'<div class="dia dia--dec">'+decanSVG(sign)+'<p class="dia__cap">'+cap+'</p></div>');}

  // 4 · NUMEROLOGY REDUCTION GEOMETRY — the literal digit-sum descent to the root; gold terminal only; fork halts at 11/22/33
  function reductionSteps(y,m,d){var str=""+y+(m<10?"0"+m:m)+(d<10?"0"+d:d),digits=str.split("").map(Number),n=digits.reduce(function(a,b){return a+b},0),steps=[n];
    while(n>9&&n!==11&&n!==22&&n!==33){var t=0;String(n).split("").forEach(function(c){t+=+c});n=t;steps.push(n)}
    return {digits:digits,steps:steps,root:n,master:(n===11||n===22||n===33)}}
  function numgeoSVG(st){var W=220,cx=110,top=16,s='',y=top,k;
    if(st.digits&&st.digits.length){var n=st.digits.length,gap=Math.min(19,(W-44)/(n-1||1)),x0=cx-gap*(n-1)/2;
      for(k=0;k<n;k++){var x=x0+gap*k;
        s+='<circle cx="'+x.toFixed(1)+'" cy="'+y+'" r="7" fill="none" stroke="'+GHOST+'" stroke-width="1" opacity=".5"/>';
        s+='<text x="'+x.toFixed(1)+'" y="'+y+'" text-anchor="middle" dominant-baseline="central" font-size="8.5" fill="'+GHOST+'" opacity=".85">'+st.digits[k]+'</text>'}
      y+=32}
    var stepY=[];for(k=0;k<st.steps.length;k++){stepY.push(y);y+=44}
    if(st.digits&&st.digits.length)s+='<line x1="'+cx+'" y1="'+(top+8)+'" x2="'+cx+'" y2="'+(stepY[0]-13)+'" stroke="'+GOLD+'" stroke-width="1" opacity=".28"/>';
    for(k=0;k<st.steps.length;k++){var v=st.steps[k],yy=stepY[k],term=(k===st.steps.length-1);
      if(k>0)s+='<line x1="'+cx+'" y1="'+(stepY[k-1]+13)+'" x2="'+cx+'" y2="'+(yy-13)+'" stroke="'+GHOST+'" stroke-width="1" opacity=".42"/>';
      s+='<circle cx="'+cx+'" cy="'+yy+'" r="13" fill="'+(term?"rgba(201,163,92,.10)":"none")+'" stroke="'+(term?GOLD:GHOST)+'" stroke-width="'+(term?"1.75":"1")+'"/>';
      s+='<text x="'+cx+'" y="'+yy+'" text-anchor="middle" dominant-baseline="central" font-size="'+(term?"15":"13")+'" fill="'+(term?GOLDLIT:GHOST)+'">'+v+'</text>'}
    if(st.master){var ty=stepY[stepY.length-1],would=String(st.root).split("").reduce(function(a,c){return a+(+c)},0),bx=cx+42,by=ty+34;
      s+='<line x1="'+(cx+13)+'" y1="'+ty+'" x2="'+(bx-9)+'" y2="'+by+'" stroke="'+GHOST+'" stroke-width="1" stroke-dasharray="2 3" opacity=".5"/>';
      var mx=(cx+13+bx-9)/2,my=(ty+by)/2;
      s+='<line x1="'+(mx-6).toFixed(1)+'" y1="'+(my+6).toFixed(1)+'" x2="'+(mx+6).toFixed(1)+'" y2="'+(my-6).toFixed(1)+'" stroke="'+GHOST+'" stroke-width="1.25" opacity=".7"/>';
      s+='<circle cx="'+bx+'" cy="'+by+'" r="9" fill="none" stroke="'+GHOST+'" stroke-width="1" stroke-dasharray="2 3" opacity=".5"/>';
      s+='<text x="'+bx+'" y="'+by+'" text-anchor="middle" dominant-baseline="central" font-size="10" fill="'+GHOST+'" opacity=".7">'+would+'</text>';
      y=Math.max(y,by+14)}
    return '<svg class="num" viewBox="0 0 '+W+' '+(y+4)+'" aria-hidden="true">'+s+'</svg>';}
  function numgeoBlock(seed,rootName){var st,p=seed?String(seed).split("~"):[];
    if(p[0]==="birth"&&p.length>=5){st=reductionSteps(+p[p.length-3],+p[p.length-2],+p[p.length-1])}
    else{var root=parseInt(String(rootName),10)||0;st={digits:null,steps:[root],root:root,master:(root===11||root===22||root===33)}}
    var cap=st.digits?('The birth digits are summed, then reduced until one root remains'+(st.master?' — save at 11, 22 and 33, where the tradition holds the reduction.':'.')):('The life path reduces to a single root'+(st.master?'; at 11, 22 and 33 the reduction is held.':'.'));
    return sec("How the number reduces",'<div class="dia dia--num">'+numgeoSVG(st)+'<p class="dia__cap">'+cap+'</p></div>');}

  // 5 · THE SIX LINES (BR-S195) — the hexagram drawn as its six strokes, braced into its
  // two trigrams. Strokes ghost (the figure); the two gate labels gold (the insight).
  function hexLinesBlock(e){
    var m=/^(\w+) over (\w+)/.exec(String(e.tag||""));if(!m)return "";
    var up=TRIG[m[1]],lo=TRIG[m[2]];if(!up||!lo)return "";
    var lines=lo.l.concat(up.l),s='',k,x=20,w=120;
    for(k=0;k<6;k++){var y=162-k*26;
      if(lines[k])s+='<line x1="'+x+'" y1="'+y+'" x2="'+(x+w)+'" y2="'+y+'" stroke="'+GHOST+'" stroke-width="7"/>';
      else s+='<line x1="'+x+'" y1="'+y+'" x2="'+(x+50)+'" y2="'+y+'" stroke="'+GHOST+'" stroke-width="7"/><line x1="'+(x+70)+'" y1="'+y+'" x2="'+(x+w)+'" y2="'+y+'" stroke="'+GHOST+'" stroke-width="7"/>';}
    function grp(top,bot,label,sub){return '<path d="M150 '+top+' L156 '+top+' L156 '+bot+' L150 '+bot+'" fill="none" stroke="'+GOLD+'" stroke-width="1" opacity=".35"/>'
      +'<text x="168" y="'+(((top+bot)/2)-2)+'" font-size="13" fill="'+GOLD+'">'+label+'</text>'
      +'<text x="168" y="'+(((top+bot)/2)+14)+'" font-size="8" letter-spacing="1.5" fill="'+GHOST+'" font-family="IBM Plex Mono,monospace">'+sub+'</text>';}
    s+=grp(24,88,up.g+' '+esc(m[1]),'ABOVE')+grp(102,166,lo.g+' '+esc(m[2]),'BELOW');
    var svg='<svg class="hexlines" viewBox="0 0 262 190" aria-hidden="true">'+s+'</svg>';
    return sec("The six lines",'<div class="dia dia--hexlines">'+svg+'<p class="dia__cap">Read from the bottom line up — '+esc(m[2])+' below, '+esc(m[1])+' above. The standing is these two gates set together.</p></div>');
  }

  // 6 · THE AETT STRIP (BR-S195) — the elder futhark in its three rows of eight; the drawn stave gold
  function aettBlock(e){
    var names=Object.keys(RUNE),idx=names.indexOf(e.name);if(idx<0)return "";
    var s='',k,cw=35,rh=38;
    for(k=0;k<24;k++){var r=Math.floor(k/8),c=k%8,ax=11+c*cw+cw/2,ay=26+r*rh,cur=k===idx;
      if(cur)s+='<circle cx="'+ax+'" cy="'+(ay-5)+'" r="14" fill="rgba(201,163,92,.10)" stroke="'+GOLD+'" stroke-width="1.2"/>';
      s+='<text x="'+ax+'" y="'+ay+'" text-anchor="middle" font-size="15" fill="'+(cur?GOLDLIT:GHOST)+'" opacity="'+(cur?'1':'.5')+'">'+RUNE[names[k]]+'</text>';}
    var svg='<svg class="aett" viewBox="0 0 302 128" aria-hidden="true">'+s+'</svg>';
    var row=["first","second","third"][Math.floor(idx/8)];
    return sec("The three rows",'<div class="dia dia--aett">'+svg+'<p class="dia__cap">Stave '+(idx+1)+' of 24, in the '+row+' row of eight. The elder futhark keeps its staves in three rows; the names later tradition gave those rows are a modern convention.</p></div>');
  }

  // 7 · THE EIGHT GATES (BR-S195) — the bagua ring, complementary gates facing; the drawn gate gold
  function gatesBlock(e){
    var g0=String(e.name).trim().charAt(0),i=-1,k;
    for(k=0;k<TRIG_RING.length;k++){if(TRIG[TRIG_RING[k]].g===g0){i=k;break}}
    if(i<0)return "";
    var w=wheel(TRIG_RING,TRIG_RING.map(function(n){return TRIG[n].g}),i,[],[]);
    var parts=String(e.tag||"").split("·").map(function(x){return x.trim()});
    var cap=(parts[2]||"one gate of eight")+' — '+(parts[1]||"").toLowerCase()+'. Opposite gates face each other across the ring.';
    return sec("The eight gates",'<div class="dia dia--gates">'+w+'<p class="dia__cap">'+esc(cap.charAt(0).toUpperCase()+cap.slice(1))+'</p></div>');
  }

  // ---------- READING VIEW ----------
  function renderReading(seed){
    var R=readingForSeed(seed),lastCh=null,html="";
    R.marks.forEach(function(m){
      if(m.chapter!==lastCh){html+='<div class="chap">'+esc(m.chapter)+'</div>';lastCh=m.chapter}
      var e=m.entry;
      var href="#/e/"+m.key+"/"+slugify(e.name)+"/"+encodeURIComponent(seed);
      html+='<article class="read anim"><div>'+
        '<div class="read__head">'+emblemHTML(m.key,e,"emblem--sm")+'<span class="slot">'+esc(m.slot)+'</span></div>'+
        '<h2>'+esc(e.name)+'</h2>'+keysHTML(e.keywords)+(e.tag?'<div class="tag">'+esc(e.tag)+'</div>':"")+
        paras(e.meaning,"body")+(e.reversed?'<div class="rev"><b><span class="revdot" aria-hidden="true"></span>Reversed</b>'+esc(e.reversed)+'</div>':"")+
        '</div><div class="aff"><a class="aff__open" href="'+href+'">Open the record<span class="arr" aria-hidden="true">→</span></a></div></article>';
    });
    var c=R.crown;
    var eyebrow=R.person?(esc(R.person.name)+' &middot; born '+esc(R.person.born)):'The name borne';
    var sub=R.person?'The name borne &middot; six systems consulted.':'Six systems consulted. The record follows.';
    return '<section class="crown">'+CROWN_SVG+'<div class="eyebrow">'+eyebrow+'</div><h1>'+esc(c.name)+'</h1><p>'+sub+'</p></section>'+
      '<div class="col">'+html+'<div class="seal"><div class="seal__name"><b>'+esc(c.epithet)+'</b> · <b>'+esc(c.role)+'</b> · filed '+esc(c.binding)+' · keyed to <b>'+esc(c.lexicon)+'</b></div>'+
        '<div class="seal__foot">The marks are set in the order drawn<br>Nothing is re-rolled on re-view<br>BR-'+hash(seed).toString(16).toUpperCase().slice(0,6)+'</div></div></div>';
  }

  // ---------- ACCESSION (DETAIL) VIEW ----------
  function renderEntry(key,slug,seed){
    var f=findEntry(key,slug);
    if(!f)return '<section class="acc"><a class="acc__back" href="#/">← Return</a><div class="acc__mark" style="margin-top:40px">Not on file. No holding answers to that mark.</div><div class="acc__close"><a href="#/">← Back to the reading</a></div></section>';
    var e=f.entry, filed=null;
    if(seed){var R=readingForSeed(seed);for(var i=0;i<R.marks.length;i++){var m=R.marks[i];if(m.key===key&&slugify(m.entry.name)===slug){filed={R:R,m:m,pos:i+1,frag:fragment(m,R.crown)};break}}}
    var head=filed?'<a class="acc__back" href="#/">← '+esc(filed.R.crown.name)+'</a>':'<a class="acc__back" href="#/">← Browse the codex</a>';
    // BR-S195: the bloom is heraldry, not a diagram — seal-scale crest beside the filing line, caption gone
    var crest='<span class="acc__crest" aria-hidden="true">'+bloomSVG(e.name)+'</span>';
    var mark=filed?'<div class="acc__mark">'+crest+'Mark '+ROMAN[filed.pos]+' of VI &nbsp;·&nbsp; filed under <span style="color:var(--gold)">'+esc(filed.R.crown.name)+'</span></div>'+(filed.frag?'<div class="acc__frag">'+esc(filed.frag)+'</div>':""):'<div class="acc__mark">'+crest+'Unfiled &nbsp;·&nbsp; codex source only. No record attached.</div>';

    var kb=kbFor(key,e), pr=pracFor(key,e);
    // TIER 1 - source
    var source=sec("The reading",'<div class="source"><div class="source__label">Source · Codex</div>'+paras(e.meaning,"prose")+(e.reversed?'<div class="rev" style="margin-top:20px"><b><span class="revdot" aria-hidden="true"></span>Reversed</b>'+esc(e.reversed)+'</div>':"")+'</div>');

    // TIER 2 - identity archetype OR symbol
    var depth="";
    if(IDENTITY[key]&&pr){
      // MEANING first
      if(pr.es)depth+=sec("Essence",'<p class="prose lead-prose">'+esc(pr.es)+'</p>');
      depth+=glance(key,e);
      if(pr.gi&&pr.gi.length)depth+=sec("Gifts",'<ul class="facts">'+list(pr.gi)+'</ul>');
      depth+=sec("Strengths & shadow",'<div class="two"><div class="strengths"><div class="lbl">Strengths</div><ul>'+list(pr.s)+'</ul></div><div class="shadow"><div class="lbl">Shadow</div><ul>'+list(pr.d)+'</ul></div></div>');
      if(pr.ha)depth+=sec("Hardships",'<p class="prose">'+esc(pr.ha)+'</p>');
      depth+=sec("What it turns on",'<div class="turn"><p class="prose"><span class="lead">What matters</span>'+esc(pr.m)+'</p><p class="prose"><span class="lead med">The turn</span>'+esc(pr.g)+'</p></div>');
      // RELATIONSHIPS
      depth+=sec((key==="lifePath"?"In relationship":"In love"),'<p class="prose">'+esc(pr.l)+'</p>');
      if(pr.fr)depth+=sec("Friendships",'<p class="prose">'+esc(pr.fr)+'</p>');
      // system diagram, after Hardships, before the compatibility wheel
      if(key==="chinese")depth+=wuxingBlock(e.name,cEl(e.tag));
      else if(key==="sun")depth+=decanBlock(e.name);
      depth+=compatSection(key,e);
      // DEPTH
      if(pr.va&&pr.va.length)depth+=sec("Variations",'<div class="vars">'+pr.va.map(function(v){return '<div class="varrow"><div class="varrow__l">'+esc(v.label)+'</div><div class="varrow__n">'+esc(v.note)+'</div></div>'}).join("")+'</div>');
      // numerology reduction geometry — late, mechanism/provenance, right before the history section
      if(key==="lifePath")depth+=numgeoBlock(seed,e.name);
    } else if(kb&&kb.y){
      depth+=sec("The symbol",'<p class="prose">'+esc(kb.y)+'</p>');
      // BR-S195 counsel plates — each counsel page's single structure plate, between symbol and counsel
      if(key==="hexagram")depth+=hexLinesBlock(e);
      else if(key==="rune")depth+=aettBlock(e);
      else if(key==="trigram")depth+=gatesBlock(e);
      depth+=sec("As counsel",'<p class="prose" style="color:var(--t-body)">'+esc(JOB[key])+'</p>');
    }

    // TIER 3 - lineage from KB
    var lin="";
    if(kb){
      lin+='<div class="acc__rule"></div>';
      if(kb.o)lin+=sec("Origin & lineage",'<p class="prose">'+esc(kb.o)+'</p>',1);
      if(kb.a&&kb.a.length)lin+=sec("Attributions",'<ul class="facts dim">'+list(kb.a)+'</ul>',1);
      if(kb.c&&kb.c.length)lin+=sec("Correspondences",'<ul class="facts dim">'+list(kb.c)+'</ul>',1);
      if(kb.h&&kb.h.length)lin+=sec("Deeper in the record",'<ul class="facts">'+list(kb.h)+'</ul>',1);
      if(kb.x&&kb.x.length)lin+=sec("Contested",'<div class="contested">'+(kb.x||[]).map(function(x){return '<p>'+esc(x)+'</p>'}).join("")+'</div>',1);
    }

    // adjacency + agency + disclaimer
    function elink(x){return x?"#/e/"+key+"/"+slugify(x.name)+(seed?"/"+encodeURIComponent(seed):""):null}
    var prev=f.idx>0?f.list[f.idx-1]:null, next=f.idx<f.list.length-1?f.list[f.idx+1]:null;
    var adj='<div class="acc__adj">'+(prev?'<a href="'+elink(prev)+'"><span class="lbl">Preceding in '+esc(LABEL[key])+'</span>← '+esc(prev.name)+'</a>':'<span></span>')+(next?'<a href="'+elink(next)+'" style="text-align:right"><span class="lbl">Following in '+esc(LABEL[key])+'</span>'+esc(next.name)+' →</a>':'<span></span>')+'</div>';
    var agency='<div class="agency">Read as a mirror, not a verdict. What here matches something you already suspected — and what does not fit at all? The record holds; you decide what to do with it.</div>';
    var disc='<div class="disclaimer">A reflective record, not a prediction. Blue Room reads the draw and the figure, never the person — take what fits and leave what does not. Nothing here is medical, legal, or financial counsel.</div>';

    return '<section class="acc">'+head+
      '<div class="acc__head">'+emblemHTML(key,e,"emblem--hero")+'<div class="acc__filing"><div class="acc__slot">'+esc(filed?filed.m.slot:LABEL[key])+'</div><h1>'+esc(e.name)+'</h1>'+(e.tag?'<div class="acc__tag">'+esc(e.tag)+'</div>':"")+'<div class="acc__job">'+esc(JOB[key])+'</div>'+keysHTML(e.keywords)+'</div></div>'+
      mark+source+depth+lin+adj+agency+disc+
      '<div class="acc__close"><a href="#/">← '+(filed?"Back to the reading":"The reading")+'</a></div></section>';
  }

  // router — the reading comes from ?seed= (the intake builds "birth~name~y~m~d");
  // with no seed it opens the reference reading (Antton Aikio, 9 April 2001).
  var curSeed=(function(){try{return new URLSearchParams(location.search).get("seed")||""}catch(e){return ""}})()||"birth~Antton Aikio~2001~4~9",n=0;
  function route(){
    var h=location.hash.replace(/^#/,""),m=h.match(/^\/e\/([^\/]+)\/([^\/]+)(?:\/([^\/]+))?$/),app=document.getElementById("app");
    if(m){app.innerHTML=renderEntry(m[1],decodeURIComponent(m[2]),m[3]?decodeURIComponent(m[3]):null);document.getElementById("bar").style.width="0";window.scrollTo(0,0);return}
    app.innerHTML=renderReading(curSeed);window.scrollTo(0,0);
    var reads=[].slice.call(document.querySelectorAll(".read"));
    if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12,rootMargin:"0px 0px -6% 0px"});reads.forEach(function(el){io.observe(el)})}else reads.forEach(function(el){el.classList.add("in")});
  }
  addEventListener("hashchange",route);
  addEventListener("scroll",function(){var mx=document.documentElement.scrollHeight-innerHeight,b=document.getElementById("bar");if(b&&!location.hash.match(/\/e\//))b.style.width=(mx>0?scrollY/mx*100:0)+"%"},{passive:true});
  document.getElementById("home").addEventListener("click",function(ev){ev.preventDefault();if(location.hash)location.hash="";else route()});
  document.getElementById("redraw").addEventListener("click",function(){n++;curSeed="draw-"+n+"-"+(n*7919);if(location.hash)location.hash="";else route()});
  route();
})();
</script>
