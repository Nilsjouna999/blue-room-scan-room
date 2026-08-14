/* ═══════════════════════════════════════════════════════════════════════════
   THE SIX, LIVE — the hover-specimen system installed on the REAL M1 card.

   `_six-hover.html` proved the idea on a copy of the card. This runs it on the
   actual one: the six marks inside .m2bface become the control, and .m2read —
   the column that already sits opposite them — becomes the specimen panel.

   INSTALLED FROM THE PARENT, INTO THE IFRAME. _palette-lab.html already owns
   this pattern (it injects a <style> into the frame every 250ms and never stops
   asserting). Same discipline here: install() is idempotent and re-runs, because
   the app rebuilds .m2read on every menu mount and would otherwise wipe us.

   NOTHING TRACKED IS TOUCHED. This is an overlay; remove the script and the
   page is byte-identical to what ships.
   ═══════════════════════════════════════════════════════════════════════════ */
(function (root) {
  "use strict";

  /* r = [name, tag, perks] lines to RESERVE for this mark — its own measured worst case,
     not the panel's. See the note on .sx__name in CSS for why per-mark beats global. */
  var SIX = [
    { key: "Sun sign",    from: "from the date",          sys: 0, n: 12, g: "tagfirst",  c: "sun",     r: [1, 2, 2] },
    { key: "Year animal", from: "from the year",          sys: 1, n: 12, g: "cjk",       c: "animal",  r: [1, 2, 2] },
    { key: "Life path",   from: "the digits, reduced",    sys: 2, n: 12, g: "name",      c: "path",    r: [1, 1, 2] },
    { key: "Rune",        from: "from the name and date", sys: 6, n: 24, g: "rune",      c: "rune",    r: [1, 1, 2] },
    { key: "Trigram",     from: "from the name and date", sys: 7, n: 8,  g: "namefirst", c: "trigram", r: [1, 2, 2] },
    { key: "Hexagram",    from: "from the name and date", sys: 8, n: 64, g: "namefirst", c: "hex",     r: [3, 1, 3] }
  ];
  var CJK  = ["鼠","牛","虎","兔","龍","蛇","馬","羊","猴","雞","狗","猪"];
  var RUNE = "ᚠᚢᚦᚨᚱᚲᚷᚻᛁᛇᛉᛋᛏᛒᛖᛚᛞᛟᛣᛠᛦᚩᛃᛝ".split("");

  /* ★★ THE PERK COLOURS ARE NOT MINE, AND NEVER SHOULD HAVE BEEN.
     arcana-build/kwcolor.json — 625 authored keyword->colour entries across 20 muted
     families, built by build_kwcolor.py, and ALREADY LOADED BY THE REAL READING
     (arcana-reading.js:623). Its own header: "~14 muted semantic families (dusty jewel
     tones that read on near-black and cohere as one considered palette, NOT a rainbow)
     ... Each perk gets a fitting colour via its family."
     That is the brief I was handed, answered before I started. I invented an element
     scale and then a five-family scale over the top of it. Second time in one session
     (see the card, BR-S289) — LOOK FOR THE EXISTING SYSTEM FIRST.

     COVERAGE, measured: 625 of the archive's 785 distinct keywords are in the bank
     (80%). But #9c9790 — the DEFAULT neutral — accounts for 275 of them, so only
     ~350 words (45%) actually land in a family. The rest are grey by fallback, not
     by decision. That gap is the real work, not a new palette. */
  var KWC = null, KWDEF = "#9c9790";

  /* ★ THE GIFT/COST SPLIT IS CUT FROM THE RENDER. It was a good idea and it is not
     DATA: kwcolor colours by family, and family is not valence — "proud" is power,
     "restless" is change, neither is marked a cost anywhere. Shipping a roman/italic
     distinction off a 22-word list I typed is exactly the invented claim BR-S410 was
     committed to stop. It comes back when codex-data.json carries the field. */

  var DATA = null, bags = {}, current = -1;

  /* The six mark colours, DARK stock — styles.css:3793. Copied rather than read out
     of the frame, because html.m2-parch overwrites them with the parchment forms and
     the panel sits on the dark ground, not on the card. */
  var CSS = ""
    + ".sx{--sx-sun:#c6a466;--sx-animal:#ad7962;--sx-path:#78838f;"
    +      "--sx-rune:#8a9184;--sx-trigram:#6e918d;--sx-hex:#9c968c;}"
    /* the marks become a control without changing how they look at rest */
    + ".m2bface__marks li{cursor:pointer;transition:opacity 90ms ease}"
    + ".m2bface__marks.sx-on li{opacity:.42}"
    + ".m2bface__marks.sx-on li[aria-current='true']{opacity:1}"
    + ".m2bface__marks li:focus-visible{outline:1px solid rgba(28,21,13,.5);outline-offset:3px}"
    /* the panel, inserted into .m2read. The app's own children are hidden, not
       removed — it rewrites them on every mount and would throw if they vanished. */
    + ".sx-hide{display:none!important}"
    /* ★ THE TOP EDGE DOES NOT MOVE. Every specimen is a different height — the name is
       one or two lines, the perks wrap or do not, the paragraph runs three to eight
       lines. If the block is centred (or the column is), that variation is shared out
       ABOVE the text as well as below, so the rule and the first line slide up and down
       on every hover. That is what reads as unsleek: the thing you are not changing
       appears to move. Anchor the column to its top and the whole variance falls to the
       bottom, where nothing is looking. */
    + ".m2read{justify-content:flex-start!important;align-items:stretch!important}"
    /* and reserve the tallest case, so the region below the panel does not breathe either */
    + ".sx{transition:opacity 110ms ease;min-height:430px}"
    + ".sx.is-out{opacity:0}"
    /* ★ THE PANEL IS A CONSEQUENCE OF THE GESTURE, NOT A FIXTURE. Leave the card and it
       goes — and because the app's own children were HIDDEN rather than removed, they
       come back rather than leaving a hole. The column returns to the page as designed
       instead of emptying. `display:none` and not just opacity, or the 430px reserve
       would hold a gap open under nothing. */
    + ".sx.is-away{display:none}"
    + ".sx-hide.is-back{display:revert!important;animation:sxfade 180ms ease both}"
    + "@keyframes sxfade{from{opacity:0}to{opacity:1}}"
    + ".sx__src{font-family:var(--font-mono);font-size:9px;letter-spacing:.2em;"
    +   "text-transform:uppercase;color:#6e6b63;margin:0 0 16px;display:flex;gap:7px}"
    + ".sx__src b{color:#948f87;font-weight:400}"
    + ".sx__glyph{font-size:34px;line-height:1;margin-bottom:13px;color:var(--sxc);"
    +   "font-family:'Segoe UI Symbol','Cambria Math',var(--font-display),serif;font-variant-emoji:text}"
    + ".sx__label{font-family:var(--font-mono);font-size:9.5px;letter-spacing:.2em;"
    +   "text-transform:uppercase;color:#6e6b63;margin:0 0 8px}"
    /* ★ RESERVE PER MARK, NOT PER PANEL. Measured from codex-data.json:
         name  3-11 chars (sun) ... 15-58 chars (hexagram)
         tag   7-97 chars       perks 38-99 chars      meaning 260-515 chars
       Reserving the GLOBAL worst case would leave ~4 empty lines under a Leo, which
       costs more than the movement it removes. But you only ever compare specimens
       WITHIN one mark — re-hovering Sun sign deals twelve names of 3-11 characters,
       all one line. The big variance is BETWEEN marks, where the colour, glyph and
       label all change too, and movement is not noise: something different arrived.
       So each mark reserves its own worst case (--rn / --rt / --rp line counts) and
       browsing one mark is perfectly still. */
    + ".sx__name{font-family:var(--font-display);font-size:29px;font-weight:600;"
    +   "color:#dcd7cb;margin:0 0 10px;line-height:1.1;min-height:calc(var(--rn,1) * 1.1em)}"
    + ".sx__attrs{font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;"
    +   "color:#605d55;line-height:1.75;margin:0 0 13px;font-variant-emoji:text;"
    +   "min-height:calc(var(--rt,1) * 1.75em)}"
    /* THE PERKS — Cormorant italic, the card's own face. Easy on the eye at 17px,
       and it has a voice; 10px tracked mono was a spec sheet. A COST is set ROMAN,
       so the gift/cost split survives with colour switched off (house rule: status
       is never colour alone) and needs no dot, badge or orb to carry it. */
    + ".sx__perks{display:flex;flex-wrap:wrap;gap:4px 16px;align-items:baseline;margin:0 0 17px;"
    +   "align-content:flex-start;min-height:calc(var(--rp,2) * 1.4em)}"
    + ".sx__pk{font-family:var(--font-display);font-style:italic;font-weight:500;"
    +   "font-size:17px;letter-spacing:.012em;line-height:1.4;color:var(--pk)}"
    + ".sx__pk--cost{font-style:normal;font-weight:400;color:#8b837e;opacity:.8}"
    + ".sx__say{font-size:13px;line-height:1.62;color:#948f87;margin:0}"
    + ".sx__close{margin-top:15px;padding-top:12px;border-top:1px solid rgba(233,229,220,.09);"
    +   "display:flex;align-items:baseline;gap:9px}"
    + ".sx__close i{color:var(--sxc);font-size:9px;font-style:normal;line-height:1.7}"
    + ".sx__close span{font-family:var(--font-display);font-style:italic;font-size:13px;color:#a8a294}";

  function esc(s){ return String(s).replace(/[&<>]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;"}[c];}); }

  /* shuffled bag, not random() — plain random deals the same animal twice running and
     the whole point (there are twelve of these) fails to land */
  function deal(i){
    var n = SIX[i].n;
    if(!bags[i] || !bags[i].length){
      var a=[]; for(var k=0;k<n;k++) a.push(k);
      for(var j=a.length-1;j>0;j--){var r=Math.floor(Math.random()*(j+1)),t=a[j];a[j]=a[r];a[r]=t;}
      bags[i]=a;
    }
    return bags[i].pop();
  }

  function glyphFor(sp,e,idx){
    if(sp.g==="tagfirst")  return String(e.tag||"").trim().charAt(0);
    if(sp.g==="cjk")       return CJK[idx]||"";
    if(sp.g==="rune")      return RUNE[idx]||"";
    if(sp.g==="name")      return String(e.name);
    if(sp.g==="namefirst"){var c=String(e.name).trim().charAt(0);return /[☰-☷]/.test(c)?c:"☰";}
    return "";
  }

  function render(d, i){
    if(!DATA) return;
    var sp=SIX[i], idx=deal(i), e=DATA[sp.sys].entries[idx];
    var box=d.querySelector(".sx"); if(!box) return;
    /* ★★ BR-S437 — THE LATENCY WAS MINE, AND IT WAS 280ms PER MARK.
       "scrolling throught these options still read bit slow latency or not feeling
       smooth enough or satisfying." Correct, and it is not performance: this faded the
       panel OUT over 150ms, waited 130ms, then wrote the new specimen and faded it back.
       Walking the six meant a quarter-second of blank panel at every step — and if you
       move faster than that you are only ever looking at the fade.
       A cross-fade is right when a thing is REPLACED and wrong when it is BROWSED. These
       are index cards, not slides: the swap is now synchronous, and the fade survives
       only for the panel's first arrival, where there is genuinely something to reveal.
       Nothing is lost — the specimen still changes, it just changes at the speed of the
       hand that asked for it. */
    (function(){
      box.style.setProperty("--sxc","var(--sx-"+sp.c+")");
      box.style.setProperty("--rn",sp.r[0]);          /* this mark's reserved lines — so */
      box.style.setProperty("--rt",sp.r[1]);          /* every specimen WITHIN a mark    */
      box.style.setProperty("--rp",sp.r[2]);          /* lands at identical heights      */
      box.querySelector(".sx__src").innerHTML='<span>&#9670;</span><span>From the archive &middot; <b>one of '+sp.n+'</b></span>';
      var g=glyphFor(sp,e,idx);
      box.querySelector(".sx__glyph").textContent = g&&g.length===1 ? g+"︎" : g;
      box.querySelector(".sx__label").textContent = sp.key+" · "+sp.from;
      box.querySelector(".sx__name").textContent  = e.name;
      box.querySelector(".sx__attrs").innerHTML   = e.tag ? esc(e.tag) : "";
      var pk=box.querySelector(".sx__perks"); pk.innerHTML="";
      (e.keywords||[]).slice(0,5).forEach(function(k){
        var s=d.createElement("span");
        /* the authored bank, matched case-insensitively; anything outside it takes the
           bank's OWN default rather than a colour I would have to invent for it */
        var c = KWC ? (KWC[k] || KWC[String(k).toLowerCase()] || KWDEF) : KWDEF;
        s.className="sx__pk"; s.style.setProperty("--pk",c);
        s.textContent=k; pk.appendChild(s);
      });
      box.querySelector(".sx__say").textContent = String(e.meaning||"");
      box.classList.remove("is-out");
    })();

    var ul=d.querySelector(".m2bface__marks");
    if(ul){
      ul.classList.add("sx-on");
      Array.prototype.forEach.call(ul.children,function(li,k){
        li.setAttribute("aria-current", k===i?"true":"false");
      });
    }
    current=i;
  }

  function install(d){
    if(!d || !d.querySelector(".m2bface__marks") || !d.querySelector(".m2read")) return false;

    if(!d.getElementById("__sixlive")){
      var st=d.createElement("style"); st.id="__sixlive"; st.textContent=CSS;
      d.head.appendChild(st);
    }

    /* the panel — inserted beside the app's own children, which are hidden rather
       than removed because the app rewrites them on every menu mount */
    var read=d.querySelector(".m2read");
    if(!read.querySelector(".sx")){
      Array.prototype.forEach.call(read.children,function(c){ c.classList.add("sx-hide"); });
      var box=d.createElement("div"); box.className="sx";
      box.innerHTML='<p class="sx__src"></p><div class="sx__glyph"></div>'
        +'<p class="sx__label"></p><h2 class="sx__name"></h2><p class="sx__attrs"></p>'
        +'<div class="sx__perks"></div><p class="sx__say"></p>'
        +'<div class="sx__close"><i>&#9670;</i><span>Yours is this one read against your other five.</span></div>';
      read.appendChild(box);
    }

    var ul=d.querySelector(".m2bface__marks");
    if(!ul.dataset.sx){
      ul.dataset.sx="1";
      /* .m2bface is pointer-events:none with `> *` set back to auto (styles.css:3680),
         so the <li>s do not take the pointer by default — grant it explicitly. */
      ul.style.pointerEvents="auto";
      Array.prototype.forEach.call(ul.children,function(li,i){
        li.style.pointerEvents="auto";
        li.setAttribute("tabindex","0");
        li.setAttribute("role","button");
        li.addEventListener("pointerenter",function(){ render(d,i); });
        li.addEventListener("focus",function(){ render(d,i); });
        li.addEventListener("click",function(){ render(d,i); });
      });
      d.addEventListener("keydown",function(e){
        if(e.key!=="ArrowDown"&&e.key!=="ArrowUp") return;
        var ls=d.querySelectorAll(".m2bface__marks li"); if(!ls.length) return;
        ls[(current+(e.key==="ArrowDown"?1:SIX.length-1)+SIX.length)%SIX.length].focus();
        e.preventDefault();
      });

      /* ── PRESENT ONLY WHILE THE CARD IS BEING READ ────────────────────────────
         Active = the pointer is on the card OR on the panel. The panel is included
         deliberately: it holds a paragraph, and a reader who moves toward it to look
         closer must not have it vanish as they arrive.
         The 140ms grace is what stops the flicker between marks — leaving mark 3 and
         entering mark 4 fires leave-then-enter, and without the delay the column would
         blink out and back on every step down the six. */
      var awayT = null;
      function away(on){
        var box=d.querySelector(".sx"), read=d.querySelector(".m2read");
        if(!box||!read) return;
        box.classList.toggle("is-away",on);
        Array.prototype.forEach.call(read.children,function(c){
          if(c!==box) c.classList.toggle("is-back",on);
        });
        var ul=d.querySelector(".m2bface__marks");
        if(ul&&on){ ul.classList.remove("sx-on");
          Array.prototype.forEach.call(ul.children,function(li){ li.setAttribute("aria-current","false"); }); }
        if(ul&&!on) ul.classList.add("sx-on");
      }
      /* ★ THE TAROT FACE IS NOT OURS. The card flips birth <-> tarot, and
         `.m2hero[data-face="tarot"] .m2bface{display:none}` (styles.css:3676) takes the
         six marks with it. Without this guard the panel kept a stale birth specimen up
         while the tarot face was showing, AND the app's own tarot text stayed hidden
         behind it — so flipping the card broke the column. On any face but birth we
         stand down completely and the page gets its own text back. */
      var hero = d.querySelector(".m2hero");
      function onBirth(){ return !hero || hero.getAttribute("data-face") === "birth"; }
      if (hero && root.MutationObserver) {
        new root.MutationObserver(function(){ if(!onBirth()) { if(awayT) root.clearTimeout(awayT); away(true); } })
          .observe(hero, { attributes: true, attributeFilter: ["data-face"] });
      }

      /* ★ AND IT MAY NOT TAKE THE COLUMN UNTIL IT CAN FILL IT. Even with the fetch
         above, there is a window between mount and the archive arriving. Hiding the
         app's own text during it is the same blank column in miniature — so the panel
         simply does not come forward until DATA exists. Nothing is lost: the page
         shows what it always showed until the moment the specimen is ready. */
      function hold(){ if(!onBirth() || !DATA) return; if(awayT){ root.clearTimeout(awayT); awayT=null; } away(false); }
      function release(){ if(awayT) root.clearTimeout(awayT); awayT=root.setTimeout(function(){ away(true); },140); }

      var card=d.querySelector(".m2hero"), box=d.querySelector(".sx");
      [card,box].forEach(function(el){
        if(!el) return;
        el.addEventListener("pointerenter",hold);
        el.addEventListener("pointerleave",release);
      });
      /* keyboard is its own kind of active: focus holds it, leaving the six lets it go */
      Array.prototype.forEach.call(ul.children,function(li){
        li.addEventListener("focus",hold);
        li.addEventListener("blur",release);
      });

      if (DATA) render(d,0);   /* built, then put away — the page opens as it always did */
      away(true);
    }
    return true;
  }

  function uninstall(d){
    if(!d) return;
    var st=d.getElementById("__sixlive"); if(st) st.remove();
    var box=d.querySelector(".sx"); if(box) box.remove();
    var read=d.querySelector(".m2read");
    if(read) Array.prototype.forEach.call(read.children,function(c){ c.classList.remove("sx-hide"); });
    var ul=d.querySelector(".m2bface__marks");
    if(ul){ ul.classList.remove("sx-on"); delete ul.dataset.sx; }
  }

  root.SixLive = {
    data: function (d) { DATA = d; },
    kwcolor: function (m) { KWC = m; },
    install: install,
    uninstall: uninstall,
    ready: function () { return !!DATA; }
  };

  /* ★ SELF-INSTALL IN THE APP — the same promotion the membrane got at BR-S427.
     The builder has now reported this "not working" three times, and every time the
     answer was that it lives in the lab behind ?sx=1 while being discussed as shipped.
     That is not a communication problem to solve with a better sentence; it is a thing
     that should be ON THE SITE. Loaded from index.html the module installs itself
     against its own document; the lab keeps working because install() is exported and
     idempotent and the lab hands it the FRAME'S document instead. One module, two hosts.

     It waits for .m2bface__marks, which app.js writes at menu mount, and re-asserts on
     a slow tick because the app rebuilds .m2read on every mount and would otherwise
     drop the panel. ?sx=0 turns it off. */
  if (root.document && !root.frameElement) {
    /* ★★ THE BUG THE BUILDER SAW: THE PANEL OPENED EMPTY AND ATE THE COLUMN.
       install() only wires the DOM. The archive and the perk palette were fetched by
       the LAB (_palette-lab.html did SixLive.data() / .kwcolor()), and when the module
       was promoted to the app at BR-S430 nothing took that job over. So DATA stayed
       null, render() returned at its first line — but away(false) had already run, so
       the app's own three children were hidden behind a box with nothing in it.
       A blank column, which is worse than no feature, because the feature REMOVED
       something to show nothing. The module now loads its own data. */
    var base = "";
    try {
      var sc = root.document.currentScript
        || root.document.querySelector('script[src*="_six-live"]');
      if (sc) base = String(sc.getAttribute("src") || "").replace(/_six-live\.js.*$/, "");
    } catch (e) {}
    root.fetch(base + "codex-data.json").then(function (r) { return r.json(); })
      .then(function (d) { DATA = d; })
      .catch(function () {});
    root.fetch(base + "arcana-build/kwcolor.json").then(function (r) { return r.json(); })
      .then(function (m) { KWC = m; })
      .catch(function () {});

    var boot = function () {
      if (/[?&]sx=0/.test(String(root.location.search || ""))) return true;
      return install(root.document);
    };
    if (!boot()) {
      var n = 0, iv = root.setInterval(function () {
        if (boot() || ++n > 60) root.clearInterval(iv);
      }, 150);
    }
    /* the app rebuilds the menu on view changes; re-assert rather than trust one call */
    root.setInterval(function () {
      if (!/[?&]sx=0/.test(String(root.location.search || ""))) install(root.document);
    }, 700);
  }
})(window);
