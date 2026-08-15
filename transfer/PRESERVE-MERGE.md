I have everything I need. Producing the deliverable.

---

# (a) THE OWNERSHIP RULING

**The label HOSTS the shipped marks. It does not replace them.** Settled by one fact I read out of both files rather than inferred: `transfer/m2preserve.css:218â€“223` declares `#6b4c14 / #74402c / #313d4c / #465241 / #315854 / #514c44`, and `styles.css:4017â€“4018` declares `--mk-sun â€¦ --mk-hex` as **the same six hex values, byte for byte**. The "second reading system" is not a second design â€” it is a transcription of the shipped one, so hosting costs nothing it was trying to buy. Replacing costs three things, all silent: `all: unset` on a `<li>` resolves `display` to `inline`, collapsing `styles.css:3991â€“3993`'s six grid rows onto one line; a nested `<button>` makes `_six-live.js:775` `indexOf.call(ul.children, d.activeElement)` return âˆ’1, so `:777` (Enter/Space) and `:781` (Arrow) both early-return and keyboard activation dies with no error; and renaming the container fails `_six-live.js:687`, whose `install()` returns false forever while `:967` re-calls it every 700ms â€” deleting THE SIX, LIVE outright. **Delete from the stylesheet:** `.pickle-jar__name`, `.pickle-jar__marks`, `.pickle-jar__mark`, `.pickle-jar__mark:focus-visible`, the six `.pickle-jar__mark--*` pairs, `.pickle-jar__product`, `.pickle-jar__product-mark`, `.pickle-jar__rule`, `.pickle-jar__ledge`, `.pickle-jar__closing-mark`, `.pickle-jar__notch.is-lit`. Every one has a shipped counterpart inside `.m2bface` (app.js:2956â€“2984). **The unit that moves is the whole `.m2hero`, not `.m2bface`** â€” because `styles.css:3887` (`.m2hero[data-face="tarot"] .m2bface{display:none}`), `styles.css:3897/4004` (`--bf-*`, `--mk-*` declared *on* the hero) and `_six-live.js:812/874` (the face observer and the only mouse release path) are all rooted on `.m2hero`, and `_m2-box.js:104` already moves that exact node. **What is lost:** nothing behavioural. **What is paid:** the reading plane shrinks from a 382Ã—605 card (1920) to a 207Ã—270 sticker â€” a 42% smaller reading surface. That is the real price of the preserve, and it is a taste call, not a defect. It is ranked first in (f).

---

# (b) THE COMPLETE MARKUP

Element order **is** paint order â€” the stylesheet declares no `z-index` anywhere in 281 lines. Every inline style is a coordinate the stylesheet does not supply. Built by `preserveTree()` in the mounter (Â§e); shown here as literal HTML.

```html
<div class="birth-preserve__seat">
<section class="birth-preserve" aria-label="The Birth Reading preserve">

  <!-- 1 Â· niche back wall and the four returns -->
  <span class="birth-preserve__head"   aria-hidden="true"></span>
  <span class="birth-preserve__sill"   aria-hidden="true"></span>
  <span class="birth-preserve__cheekL" aria-hidden="true"></span>
  <span class="birth-preserve__cheekR" aria-hidden="true"></span>

  <div class="birth-preserve__cavity" aria-hidden="true">
    <span class="birth-preserve__seam"></span>
    <span class="birth-preserve__contact"></span>
    <span class="birth-preserve__caustic"></span>

    <div class="pickle-jar">

      <!-- 2 Â· jar rear glass -->
      <span class="pickle-jar__neck"     aria-hidden="true"></span>
      <span class="pickle-jar__neck-lip" aria-hidden="true"></span>

      <!-- 3-4-5 Â· THE BRINE AND ITS CONTENTS. Â§9 splits rear contents (3) from brine
           body (4), but .pickle-jar__brine's background is opaque at every stop
           (m2preserve.css:103-105 â€” no alpha anywhere), so anything ordered before it
           is annihilated. The contents go INSIDE, and .pickle-jar__cuke-occl is the
           "brine over it" wash that layer 4 was meant to supply. Coordinates below are
           BRINE-LOCAL (the brine starts at jar-y 84), which is also the gravity proof:
           the cuke at top:66 as a JAR child would sit at jar-y 66, 44px ABOVE the
           meniscus at jar-y 110 â€” a pickle floating in air. -->
      <div class="pickle-jar__brine" aria-hidden="true">
        <span class="pickle-jar__shoulder-shade"></span>

        <div class="pickle-jar__cuke">
          <!-- bumps are CUKE children so they rotate with it (3.5deg) -->
          <span class="pickle-jar__cuke-bump" style="left:8px;top:38px;width:8px;height:6px"></span>
          <span class="pickle-jar__cuke-bump" style="left:20px;top:96px;width:5.5px;height:4.5px"></span>
          <span class="pickle-jar__cuke-bump" style="left:11px;top:158px;width:9px;height:7px"></span>
        </div>
        <span class="pickle-jar__cuke-edge"></span>
        <span class="pickle-jar__cuke-occl"></span>

        <!-- dill: stem at brine-x 310.5. Branches reach LEFT to x 297 at their
             longest, which is what keeps the bubble lane at 300 clear. Unequal
             spacing and unequal length, per Â§6 â€” regular spacing reads as scratches. -->
        <span class="pickle-jar__dill-stem"></span>
        <span class="pickle-jar__dill-branch" style="right:27px;top:74px;width:14px;transform:rotate(-24deg);transform-origin:right center"></span>
        <span class="pickle-jar__dill-branch" style="right:27px;top:126px;width:11px;transform:rotate(-13deg);transform-origin:right center"></span>
        <span class="pickle-jar__dill-branch" style="right:27px;top:181px;width:13px;transform:rotate(-31deg);transform-origin:right center"></span>
        <span class="pickle-jar__dill-leaf" style="right:40px;top:70px"></span>
        <span class="pickle-jar__dill-leaf" style="right:37px;top:123px"></span>
        <span class="pickle-jar__dill-leaf" style="right:39px;top:177px"></span>

        <!-- seeds: only in the exposed bands (jar-x <54 or >284), or the opaque
             sticker hides them. brine-y 284..326 = jar-y 368..410, below the marks
             and above the accumulation. -->
        <span class="pickle-jar__seed" style="left:36px;top:300px;width:3.5px;height:3.5px"></span>
        <span class="pickle-jar__seed" style="right:44px;top:284px;width:2.5px;height:2.5px"></span>
        <span class="pickle-jar__seed" style="left:30px;top:326px;width:3px;height:3px"></span>

        <span class="pickle-jar__accum"></span>

        <!-- salt AFTER the accumulation or its rgba(16,22,16,.72) swallows it.
             bottom 9..18 = brine-y 367..376 = jar-y 451..460: inside the foot
             (425..469) and below the label's bottom edge (420), so visible full-width. -->
        <span class="pickle-jar__salt" style="left:126px;bottom:16px;width:2.5px;height:2px"></span>
        <span class="pickle-jar__salt" style="left:152px;bottom:11px;width:1.5px;height:1.5px"></span>
        <span class="pickle-jar__salt" style="left:171px;bottom:18px;width:3px;height:2.5px"></span>
        <span class="pickle-jar__salt" style="right:132px;bottom:13px;width:2px;height:1.5px"></span>
        <span class="pickle-jar__salt" style="left:196px;bottom:9px;width:1.5px;height:1.5px"></span>

        <!-- the bubble is mounted HERE by the module, one at a time -->

        <span class="pickle-jar__meniscus"></span>
        <span class="pickle-jar__meniscus-fall"></span>
      </div>

      <!-- 5-6 Â· mineral foot, inner refraction, and the mould seam. All three are
           BEFORE the sticker: a seam in the glass is behind a film on the glass. -->
      <span class="pickle-jar__foot"       aria-hidden="true"></span>
      <span class="pickle-jar__refractL"   aria-hidden="true"></span>
      <span class="pickle-jar__refractR"   aria-hidden="true"></span>
      <span class="pickle-jar__mould-seam" aria-hidden="true"></span>

      <!-- 7-8-9 Â· THE STICKER. Its ink is the SHIPPED .m2hero, moved here by the
           module â€” never cloned, or _six-live.js's six wired <li> die with the copy. -->
      <div class="pickle-jar__label">
        <span class="pickle-jar__label-fibre"    aria-hidden="true"></span>
        <span class="pickle-jar__label-adhesion" aria-hidden="true"></span>
        <span class="pickle-jar__label-curve"    aria-hidden="true"></span>
        <span class="pickle-jar__label-air"      aria-hidden="true"></span>

        <!-- â˜… COPY NOTE. These three strings are NOT invented here: Â§8's copy rules
             prescribe them verbatim ("Use BLUE ROOM PRESERVES only as institutional
             metadata", "Preferred closing: SEALED AT FIRST BREATH Â· NOT REVISED").
             They have still had no human pass. Marked the way _m2-box.js:121-124
             marked the pod's caption, so a later reader knows their provenance. -->
        <p class="pickle-jar__inst"><span>Blue Room Preserves</span><span>Register 01</span></p>

        <!-- [data-m2-hero] lands here (app.js:2913-2986), between the two label lines -->

        <p class="pickle-jar__sealed">Sealed at first breath &middot; Not revised</p>

        <!-- Â§9 layer 9: the spot varnish is LAST inside the label, over the ink.
             Appended by the mounter after the hero, for the same reason. -->
        <span class="pickle-jar__varnish" aria-hidden="true"></span>
      </div>

      <!-- 10 Â· foreground reflections, exposed glass only. shoulder-hl MUST be a JAR
           child: at brine-local top:88 it would land at jar-y 172 and cross the label
           (x 54..284, y 120..420); as a jar child it is y 88..97, clear by 23px. -->
      <span class="pickle-jar__shoulder-hl" aria-hidden="true"></span>
      <span class="pickle-jar__edge-hl" aria-hidden="true"></span>
      <span class="pickle-jar__edge-hl pickle-jar__edge-hl--r" aria-hidden="true"></span>

      <!-- 11 Â· lid and security seal. The strip, fold and seal are SIBLINGS of the
           lid, not children: the lid is overflow:hidden and 40px tall, and the strip
           runs top:4 -> 88, which is exactly the crossing onto the neck that
           m2preserve.css:232-234 describes and a child could never make. -->
      <div class="pickle-jar__lid" aria-hidden="true">
        <span class="pickle-jar__lid-grooves"></span>
        <span class="pickle-jar__lid-seam"></span>
        <!-- 6 x 12px on a 36px pitch = 192px in a 240px lid, 24px margin each side.
             The tamper strip occupies lid-x 115.5..124.5; notch 3 ends at 108 and
             notch 4 starts at 132, so it passes between them with 7.5px each side. -->
        <span class="pickle-jar__notch" data-mark="0" style="left:24px"></span>
        <span class="pickle-jar__notch" data-mark="1" style="left:60px"></span>
        <span class="pickle-jar__notch" data-mark="2" style="left:96px"></span>
        <span class="pickle-jar__notch" data-mark="3" style="left:132px"></span>
        <span class="pickle-jar__notch" data-mark="4" style="left:168px"></span>
        <span class="pickle-jar__notch" data-mark="5" style="left:204px"></span>
      </div>
      <span class="pickle-jar__strip"      aria-hidden="true"></span>
      <span class="pickle-jar__strip-fold" aria-hidden="true"></span>
      <span class="pickle-jar__seal"       aria-hidden="true"></span>

    </div>
  </div>
</section>
</div>
```

**The adhesion test, computed.** Label box in jar coordinates: **x 54..284, y 120..420**. Every jar-level layer measured against it:

| layer | rect (jar px) | verdict |
|---|---|---|
| `__refractL` | x 0..24, y 84..469 | clear by 30 |
| `__refractR` | x 322..338 | clear by 38 |
| `__shoulder-hl` | x 40..140, y 88..97 | clear by 23 above |
| `__edge-hl` | x 12..32, blur(5) â†’ ~47 | clear by 7 |
| `__edge-hl--r` | x 316..324, blur(4) â†’ 310..330 | clear by 26 |
| `__foot` | y 425..469 | clear by 5 |
| `__lid` / `__strip` / `__seal` | y 0..96.5 | clear by 23.5 |
| **`__mould-seam` as authored** | **x 88..89, y 104..425** | **CROSSES â€” the label's full 300px height** |

One violation of ten. Corrected in Â§d.

---

# (c) THE INTERACTION JS

Three parts. The **notch is a condition** and needs no JS at all. The **bubble is an event** and needs ~30 lines that *observe* `_six-live.js`'s own `aria-current` (written at `:626â€“628`, cleared at `:802â€“803`) rather than deciding anything â€” Â§12's "do not duplicate reading state in a second controller", taken literally. The **pointer light** rides two custom properties consumed by transforms, exactly as `_m2-box.js:157â€“178` wires the vitrine glass.

```js
  /* â•â• THE BUBBLE. ONE AT A TIME, ON DEMAND, AND NO SECOND CONTROLLER. â•â•â•â•â•â•â•â•â•
     _six-live.js:626-628 already writes aria-current="true" on the active <li>
     from all three entry points (pointerenter :744, focus :745, click :746) and
     its away() clears all six (:802-803). That attribute IS the state. This
     observes it. Delete this file and the six still work; only the jar goes quiet.

     â˜… MOUNT, NEVER TOGGLE. `animation` is declared on .pickle-jar__bubble ITSELF
     (m2preserve.css:272), so the run begins the instant the node enters the
     document. Toggling a class that carries only colour does not restart an
     animation â€” _six-live.js:172-177 paid for that lesson already, and a re-fire
     that does nothing "does not look broken, it looks like nothing happened".

     â˜… A TIMER, NOT animationend. Under prefers-reduced-motion the stylesheet sets
     `animation:none` so animationend never fires; and the preview pane freezes the
     animation clock, so it never fires there either. Either way the node leaks
     one per hover. */
  function wireBubble(box) {
    if (box._presWired) return;
    var ul  = doc.querySelector(".m2bface__marks");
    var brine = box.querySelector(".pickle-jar__brine");
    if (!ul || !brine || !root.MutationObserver) return;   // six-live has not mounted yet
    box._presWired = true;

    var reduced = !!(root.matchMedia && root.matchMedia("(prefers-reduced-motion: reduce)").matches);
    /* brine-local `bottom`, one per mark, DERIVED not guessed. The six marks land at
       label-y 92..211 (see the label-fit sum in the stylesheet); +120 puts them in
       jar coords, -84 into the brine's frame -> brine-y 128..247 on a 21px pitch.
       bottom = 385 - brineY - 24 - 4: each bubble is released 24px under its own
       mark and rises 96px past it. */
    var BOTTOM = [222, 201, 180, 159, 138, 117];
    var live = null, T = null;

    function drop() {
      if (live) { live.remove(); live = null; }
      if (T) { root.clearTimeout(T); T = 0; }
    }
    function fire(i) {
      drop();                                   /* Â§10: only one bubble at once. Six
                                                   pointerenters in a second would
                                                   otherwise stack five 700ms runs. */
      if (reduced || doc.hidden) return;        /* Â§10: motion stops when not visible */
      var b = doc.createElement("span");
      b.className = "pickle-jar__bubble";
      b.setAttribute("aria-hidden", "true");
      /* THE EXPOSED BAND, NEVER THE STICKER. The label is x 54..284 of 338 and the
         bubble's whole rise sits inside the label's y-range, so `left` is not
         styling â€” it is the layer-order law expressed as a number. 300..304 rising
         to 303..307: 3.5px clear of the dill stem at 310.5, 18px clear of
         .pickle-jar__refractR at 322. The stylesheet ships NO `left` at all, so
         without this every bubble resolves to its static position. */
      b.style.left = "300px";
      b.style.bottom = BOTTOM[i] + "px";
      brine.appendChild(b);
      live = b;
      b.addEventListener("animationend", drop, { once: true });
      T = root.setTimeout(drop, 760);
    }

    new root.MutationObserver(function (recs) {
      for (var k = 0; k < recs.length; k++) {
        var t = recs[k].target;
        if (t.getAttribute && t.getAttribute("aria-current") === "true") {
          fire(Array.prototype.indexOf.call(ul.children, t));
          return;
        }
      }
      /* every mark reported false -> the panel stood down; the notches follow by
         CSS, the bubble follows here. */
      drop();
    }).observe(ul, { subtree: true, attributes: true, attributeFilter: ["aria-current"] });
  }

  /* â•â• THE POINTER LIGHT, ON THE EXPOSED GLASS ONLY. â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
     Â§10 is explicit: reflection displacement 6-10px, base caustic 2-4px, contents
     1-2px, LABEL TRANSFORM NONE, JAR TRANSFORM NONE. So the pointer moves three
     named layers and nothing else. Two custom properties written at most once per
     frame and consumed by `transform` â€” never a paint property, which is the fault
     _m2-box.js:148-156 records against the vitrine's original.
     â˜… It listens on .birth-preserve, NOT on .m2hero. app.js:7327 hit-tests
     `.m2hero` and drives --tilt-x/--lx on it; the stylesheet cancels both inside
     the exhibit (see .birth-preserve .m2hero), so this is the replacement, not a
     second copy. */
  function wireLight(box) {
    if (box._lightWired) return;
    box._lightWired = true;
    if (root.matchMedia && root.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var pending = false, px = 0, py = 0;
    box.addEventListener("pointermove", function (e) {
      if (e.pointerType === "touch") return;
      var r = box.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width  - 0.5) * 2;
      py = ((e.clientY - r.top)  / r.height - 0.5) * 2;
      if (pending) return;
      pending = true;
      root.requestAnimationFrame(function () {
        pending = false;
        box.style.setProperty("--pv-px", px.toFixed(3));
        box.style.setProperty("--pv-py", py.toFixed(3));
      });
    }, { passive: true });
    box.addEventListener("pointerleave", function () {
      box.style.setProperty("--pv-px", "0");
      box.style.setProperty("--pv-py", "0");
    });
  }

  /* â•â• THE FIT. The one number CSS cannot compute. â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
     `zoom` needs a unitless factor and calc() cannot divide a length by a length.
     Everything else â€” the reserved seat, the stage track â€” is pure CSS below. */
  function fit() {
    var box = doc.querySelector(".birth-preserve");
    var stage = doc.querySelector(".menu__draw-stage");
    if (!box || !stage) return;
    var H = Math.min(620, Math.max(400, doc.documentElement.clientHeight * 0.56));  // styles.css:3716
    var W = stage.getBoundingClientRect().width;                                    // the real track
    var k = Math.min(H / 522, W / 460);
    box.style.setProperty("--pv-k", k.toFixed(5));
  }
```

**The notch, in pure CSS** (in the stylesheet below, restated here so the chain is legible in one place): six `:has()` rules keyed on the same `aria-current` the bubble observes, so the ink step, the notch and the bubble all light on **one frame from one source**, and the notch cannot drift when `_six-live.js` changes â€” which it has eleven times in this branch's commit range.

---

# (d) THE CORRECTED STYLESHEET

`_m2-preserve.css` â€” complete. Confirmed fixes applied; everything I could not confirm is dropped or marked.

```css
/* =============================================================
   M2 Â· THE BIRTH PRESERVE â€” a labelled preserving jar in a shallow
   blue-black niche, replacing the Birth face's object and nothing else.
   PROTOTYPE. Loaded only on ?case=preserve by _m2-box.js. Nothing here
   paints on the normal menu.

   PROVENANCE. The design is the builder's, assembled as transfer/m2preserve.css
   from transfer/BIRTH-PRESERVE-SPEC.md. This is that file after a four-lens
   review. What changed and why is recorded at each site.

   GOVERNING SENTENCE. The six marks were given once, preserved together,
   and labelled without revision.

   THE LABEL IS THE READING; the jar is the preserving body. The sticker is
   an OPAQUE conservation film on the EXTERIOR glass â€” every reflection is
   positioned in the exposed bands or on the shoulder so nothing crosses it.
   If a highlight crosses the label, the label reads as floating inside the
   jar and the whole illusion goes.

   â˜…â˜… THE LABEL HOSTS THE SHIPPED BIRTH FACE. It does not reproduce it.
   The six pigments the original declared are BYTE-IDENTICAL to the shipped
   parchment set (styles.css:4017-4018), so the "parallel system" was a
   transcription, not a design. The whole .m2hero is MOVED into the sticker by
   the mounter â€” the hero and not just .m2bface, because styles.css:3887 (the
   face switch), styles.css:3897/4004 (--bf-* and --mk-*) and _six-live.js:812
   and :874 (the face observer and the only mouse release path) are all rooted
   on that element. This file owns PAINT; _six-live.js owns BEHAVIOUR; app.js
   owns MARKUP. Nothing here writes a class, attribute or inline style onto the
   hero, so unwrapping restores it byte-identical.

   â˜…â˜… FOOTPRINT â€” THE ORIGINAL CLAIM WAS FALSE AND IS REPLACED BY A DERIVATION.
   It said "460x522 â€” the exact box the parchment card occupied". The card is
   `height: clamp(400px,56vh,620px); aspect-ratio: 120/190` (styles.css:3716),
   so its width is height x 0.63158 and its MAXIMUM width is 620 x 0.63158 =
   391.6px. 460 exceeds that at every viewport that exists; 460/1.065 = 431.9
   still does. Measured:
       1280x800   card 282.9 x 448     stage track 470.8
       1440x900   card 318.3 x 504     stage track 463.6
       1920x1080  card 382.0 x 604.8   stage track 446.0
   (track = min(1180px,92vw) - 300 - 330 - 2*clamp(24px,3vw,52px), from
   styles.css:3212/3222/3227. Note it SHRINKS as the viewport grows.) The card's
   ratio is 0.632; the exhibit's is 0.881. No constant reconciles them, and the
   height delta changes SIGN across those three, so no single number could.

   SO THE FOOTPRINT IS SPLIT IN TWO, and only the half that matters is fixed:
     Â· THE SEAT reserves exactly clamp(400px,56vh,620px) â€” the card's own box,
       in pure CSS, on every viewport. The stage is a centred column
       (styles.css:3254), so a height delta d moves the Birth/Tarot selector by
       d/2. With the seat, d is ZERO and the selector cannot move on any flip.
       That is what Â§11 actually protects, and BR-S346 already paid for the
       lesson (app.js:2998-3003: an IDENTICAL card still looked like it changed
       because the column shortened by 24px).
     Â· THE NICHE is 460x522 authored, scaled UNIFORMLY by
       k = min(cardHeight/522, track/460) and centred in the seat.
           1280x800  k = min(0.858, 1.024) = 0.858   ->  395 x 448
           1366x768  k = min(0.824, 1.017) = 0.824   ->  379 x 430
           1440x900  k = min(0.966, 1.008) = 0.966   ->  444 x 504
           1920x1080 k = min(1.159, 0.970) = 0.970   ->  446 x 506
       At 1280 and 1440 the height term binds and the niche is exactly as tall
       as the card was. At 1920 the width binds and the niche is 99px shorter
       than the card â€” the object is smaller, the reserved box is identical, and
       the selector still does not move. That is Â§10's "the current exhibit
       recedes, and the next resolves from the same fixed centre" kept honestly.

   â˜… `zoom`, NOT `transform: scale()`. The house rule (view-switch-url-truth):
   never clamp a card with max-width, scale with zoom. It is already the lever
   at styles.css:2561, :2744 and :4341. `transform` would create a containing
   block for fixed descendants, which styles.css:2751-2752 forbids for any
   ancestor of the reveal machinery; `zoom` creates neither a containing block
   nor a stacking context. (And .m2hero already carries
   `transform: perspective(...)` at styles.css:3849, so nothing fixed can live
   inside it today in any case.) k is set by the mounter because calc() cannot
   divide a length by a length; it defaults to 1.

   SCALE. Values below are app CSS px â€” the same statement m2case.css:13-14,
   m2pod.css:15 and m2recess.css:18 all make. The original header alone said
   "divide by 1.065", and its own type sizes disprove it: at /1.065 the
   institutional line falls to 7.51px against Â§8's 8-9px floor, the marks to
   8.92px against Â§8's 9.5-10px, and "The Crowned Name" wraps in the label.
   A sheet whose type is already at its floor cannot also be pre-scaled up.
   ============================================================= */

/* â”€â”€ THE SEAT. Pure CSS, no JS, no zoom: the card's own box, reserved.
   This is the whole of the "no column jump" promise, and it is exact rather
   than true at one screen height. */
.birth-preserve__seat {
  flex: none;
  width: 100%;
  height: clamp(400px, 56vh, 620px);   /* styles.css:3716, verbatim */
  display: grid;
  place-items: center;
}

.birth-preserve {
  --niche-back-1: #0c1319;   /* blue-black, cooler than the brine */
  --niche-back-2: #070b10;
  --glass-edge: #152420;     /* deep bottle green at the jar's edges */
  --brine-light: #9b8b52;    /* transmitted light, in the EXPOSED bands */
  --brine-dark: #26301f;
  --label-cream: #eadcbd;
  --label-ink: #251b12;
  --gold: #c1a669;
  --pv-px: 0; --pv-py: 0;    /* the pointer, written by wireLight() */

  position: relative;
  width: 460px; height: 522px;
  zoom: var(--pv-k, 1);
  padding: 14px;
  box-sizing: border-box;
  border-radius: 4px;
  background: #0b1015;
  /* NO exterior shadow. The niche supplies the contact shadow; the jar
     never hovers, and a drop here would turn the hole into an object. */
}

/* the four returns: shallow (10/8/9), so the depth points INWARD. A heavier
   bevel makes the exhibit read as a framed picture. */
.birth-preserve__head,
.birth-preserve__sill,
.birth-preserve__cheekL,
.birth-preserve__cheekR { position: absolute; pointer-events: none; }
.birth-preserve__head  { left: 0; right: 0; top: 0; height: 10px; border-radius: 4px 4px 0 0;
  background: linear-gradient(180deg, #1d222a 0%, #12171d 62%, #0b1015 100%); }
.birth-preserve__sill  { left: 0; right: 0; bottom: 0; height: 9px;
  background: linear-gradient(0deg, #20262e 0%, #151a21 60%, #0b1015 100%); }
.birth-preserve__cheekL { left: 0; top: 7px; bottom: 0; width: 8px;
  background: linear-gradient(90deg, #161b22 0%, #0d1218 58%, #090d12 100%); }
.birth-preserve__cheekR { right: 0; top: 7px; bottom: 0; width: 8px;
  background: linear-gradient(270deg, #141a20 0%, #0c1116 58%, #090d12 100%); }

/* the cavity: blue-black, with one local warm bounce off the jar's own light */
.birth-preserve__cavity {
  position: absolute; left: 8px; right: 8px; top: 10px; bottom: 9px; overflow: hidden;
  background:
    radial-gradient(56% 34% at 50% 62%, rgba(150,132,78,.10) 0%, rgba(150,132,78,.03) 54%, rgba(0,0,0,0) 78%),
    radial-gradient(82% 66% at 50% 46%, rgba(0,0,0,0) 26%, rgba(0,0,0,.82) 100%),
    linear-gradient(180deg, var(--niche-back-1) 0%, #0a1016 46%, var(--niche-back-2) 100%);
  transition: filter 200ms var(--ease-settle, cubic-bezier(.2,.7,.2,1));
}
.birth-preserve__seam { /* one thin antique-gold interior seam */
  position: absolute; left: 1px; right: 1px; top: 1px; bottom: 1px; pointer-events: none;
  box-shadow: inset 0 0 0 1px rgba(168,140,80,.16);
}
/* the internal sill: the jar's contact shadow and one caustic.
   â˜… THE CAVITY IS THE JAR'S PARENT, AND THE CONTACT SHADOW PROVES IT. The cavity
   is 444 x 503 (460-16 x 522-19). The jar at left:53 width:338 leaves 53 on the
   right too â€” symmetric. And .birth-preserve__contact at bottom:10 height:14 is
   y 479..493 in that 503-tall box, while the jar at top:10 height:469 ends at
   479 â€” the shadow's top edge meets the jar's base TO THE PIXEL. Under
   .birth-preserve instead, the jar would be 16px off-centre and the shadow would
   float 19px below it. */
.birth-preserve__contact,
.birth-preserve__caustic { position: absolute; left: 50%; border-radius: 50%; pointer-events: none; }
.birth-preserve__contact { bottom: 10px; width: 272px; height: 14px;
  transform: translateX(-50%);
  background: radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,.72) 0%, rgba(0,0,0,.34) 58%, rgba(0,0,0,0) 100%); }
/* Â§10: "Base caustic displacement 2-4px". The ONE contents/base layer the pointer
   is allowed to move, and it moves by transform, never by a paint property. */
.birth-preserve__caustic { bottom: 8px; width: 160px; height: 7px;
  transform: translateX(calc(-50% + var(--pv-px) * 3px));
  background: radial-gradient(50% 50% at 50% 50%, rgba(178,152,94,.20) 0%, rgba(178,152,94,0) 100%); }

/* â”€â”€ THE JAR. 338 x 469, ratio .721 â€” lid 40 (9%) Â· neck 60 (6% visible) Â·
   shoulder 30 Â· body 320 (68%) Â· foot 44 (9%). Straight-sided; corners
   present but never capsule. The silhouette must survive the label being
   hidden, which is why the lid is NARROWER than the body and sits on a
   visible neck. â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.pickle-jar { position: absolute; left: 53px; top: 10px; width: 338px; height: 469px; }

.pickle-jar__neck {
  position: absolute; left: 69px; top: 32px; width: 200px; height: 60px;
  border-radius: 5px 5px 0 0; pointer-events: none;
  background: linear-gradient(90deg, #0b1317 0%, #132126 22%, #1b2c32 50%, #132126 78%, #0b1317 100%);
  box-shadow: inset 0 1px 0 rgba(196,220,228,.10);
}
.pickle-jar__neck-lip {
  position: absolute; left: 69px; top: 32px; width: 200px; height: 5px; pointer-events: none;
  background: linear-gradient(90deg, rgba(196,220,228,0), rgba(196,220,228,.18), rgba(196,220,228,0));
}

/* THE BRINE. The light is in the EXPOSED bands (20-30% and 70-80%), not at
   the centre â€” the centre is under an opaque label, so a champagne core
   there is light you never see and the visible liquid goes muddy.
   â˜… ITS BACKGROUND IS OPAQUE AT EVERY STOP (no alpha anywhere below), which is
   why Â§9's layer 3 "rear contents" is unreachable and the contents are children
   of this element rather than siblings before it. .pickle-jar__cuke-occl is the
   translucent "brine over it" that layer 4 was meant to supply.
   â˜… pointer-events is INHERITED, so this one declaration covers every content
   child â€” Â§12's "keep visual layers pointer-transparent", once. */
.pickle-jar__brine {
  position: absolute; left: 0; top: 84px; right: 0; bottom: 0; overflow: hidden; pointer-events: none;
  border-radius: 38px 38px 14px 14px / 30px 30px 18px 18px;
  background:
    linear-gradient(90deg, var(--glass-edge) 0%, #22301f 10%, #6f6a40 20%, var(--brine-light) 30%,
      #6a6338 42%, #4a4a2c 50%, #6a6338 58%, var(--brine-light) 70%, #6f6a40 80%, #22301f 90%, var(--glass-edge) 100%),
    linear-gradient(180deg, #39402a 0%, var(--brine-dark) 100%);
  box-shadow: inset 0 0 22px rgba(0,0,0,.55);
}
/* the meniscus comes up 4px. Â§5: "Top position: below the shoulder, never
   touching the meniscus." As authored the falloff ended at jar-y 117 against a
   label top edge of 120 â€” a 3px gap, one rounding step from touching, and the
   exhibit renders at non-integer zoom on every viewport. 22/24 opens it to 7px. */
.pickle-jar__meniscus { /* level, thin, unmistakable â€” 2px line, 5px falloff */
  position: absolute; left: 8px; right: 8px; top: 22px; height: 2px; border-radius: 50%;
  background: linear-gradient(90deg, rgba(226,214,168,.12), rgba(232,222,180,.62), rgba(226,214,168,.12));
}
.pickle-jar__meniscus-fall { position: absolute; left: 8px; right: 8px; top: 24px; height: 5px;
  border-radius: 50%; background: linear-gradient(180deg, rgba(226,214,168,.10), rgba(226,214,168,0)); }
.pickle-jar__shoulder-shade { position: absolute; left: 0; right: 0; top: 0; height: 30px;
  background: linear-gradient(180deg, rgba(9,13,18,.92) 0%, rgba(9,13,18,.72) 46%, rgba(9,13,18,.18) 100%); }

/* ONE cucumber: tapered, leaning 3.5deg, four unequal radii, dark centre with
   a thin transmitted edge light, three surface bumps, brine over it. It must
   be discovered as organic matter, never mistaken for a lit tube.
   â˜… ITS 8px OVERLAP WITH THE STICKER IS A FEATURE AND MUST BE KEPT. The cuke is
   jar-x 26..62 and the label starts at 54, so the sticker occludes the pickle's
   right edge â€” the single strongest cue that the film is on the OUTSIDE of the
   glass. It only works because .pickle-jar__cuke precedes .pickle-jar__label in
   the DOM. Â§6's "behind the left exposed glass band" still holds: 28 of its
   36px sit in the exposed 0..54 band. */
.pickle-jar__cuke {
  position: absolute; left: 26px; top: 66px; width: 36px; height: 206px; transform: rotate(3.5deg);
  border-radius: 19px 15px 22px 17px / 44px 34px 40px 30px;
  background: linear-gradient(100deg, #1f2917 0%, #33401f 26%, #465428 48%, #2c3a1c 74%, #1b2413 100%);
  box-shadow: inset 0 0 14px rgba(0,0,0,.6);
}
.pickle-jar__cuke-edge { position: absolute; left: 27px; top: 74px; width: 4px; height: 184px;
  transform: rotate(3.5deg); border-radius: 4px;
  background: linear-gradient(180deg, rgba(150,166,104,0), rgba(150,166,104,.34) 22%, rgba(150,166,104,.20) 76%, rgba(150,166,104,0)); }
.pickle-jar__cuke-bump { position: absolute; border-radius: 50%; background: rgba(20,28,14,.46); }
.pickle-jar__cuke-occl { position: absolute; left: 20px; top: 60px; width: 52px; height: 220px; pointer-events: none;
  background: radial-gradient(50% 50% at 50% 50%, rgba(26,34,20,.4) 0%, rgba(26,34,20,0) 76%); }

/* dill: one main stem, three branches at unequal spacing, three leaf
   fragments. Without the branching logic it reads as surface scratches. */
.pickle-jar__dill-stem { position: absolute; right: 26px; top: 52px; width: 1.5px; height: 176px;
  background: linear-gradient(180deg, rgba(96,112,84,.85), rgba(52,67,55,.3)); }
.pickle-jar__dill-branch { position: absolute; height: 1.5px; background: rgba(88,104,76,.6); }
.pickle-jar__dill-leaf { position: absolute; width: 3px; height: 1.5px; border-radius: 50%;
  background: rgba(112,128,94,.5); }
.pickle-jar__seed { position: absolute; border-radius: 50%; background: #9c8748; }
.pickle-jar__accum { position: absolute; left: 0; right: 0; bottom: 0; height: 38px;
  background: linear-gradient(180deg, rgba(24,32,22,.35) 0%, rgba(16,22,16,.72) 100%); }
.pickle-jar__salt { position: absolute; border-radius: 50%; background: rgba(226,220,196,.42); }

/* the foot: transparent thick glass with a lit inner surface â€” NOT an opaque
   bar (an opaque band reads as a UI overlay and crops the sticker) */
.pickle-jar__foot {
  position: absolute; left: 0; right: 0; bottom: 0; height: 44px; pointer-events: none;
  border-radius: 0 0 14px 14px / 0 0 20px 20px;
  background: linear-gradient(180deg, rgba(190,214,220,.10) 0%, rgba(120,150,158,.06) 30%,
    rgba(20,38,42,.32) 72%, rgba(9,16,20,.58) 100%);
  box-shadow: inset 0 1px 0 rgba(214,236,242,.22), inset 0 -1px 0 rgba(0,0,0,.5);
}
/* refraction and reflections: exposed glass only, never across the sticker */
.pickle-jar__refractL { position: absolute; left: 0; top: 84px; width: 24px; bottom: 0; pointer-events: none;
  border-radius: 38px 0 0 14px / 30px 0 0 18px;
  background: linear-gradient(90deg, rgba(196,220,228,.16) 0%, rgba(196,220,228,.04) 46%, rgba(196,220,228,0) 100%); }
.pickle-jar__refractR { position: absolute; right: 0; top: 84px; width: 16px; bottom: 0; pointer-events: none;
  border-radius: 0 38px 14px 0 / 0 30px 18px 0;
  background: linear-gradient(270deg, rgba(196,220,228,.10) 0%, rgba(196,220,228,0) 100%); }

/* â˜…â˜… THE ONE LAYER THAT CROSSED THE STICKER. `left: 88px` put this 1px seam at
   x 88..89 running y 104..425 â€” 34px INSIDE the label's left edge (54) and over
   its ENTIRE 300px height, which is exactly the failure Â§9's closing sentence
   and Â§14's fourth risk both name by hand, on the one surface the whole design
   exists to sell. Every other front layer was measured and is clean.
   MOVED TO 40, the left exposed band. The right band is full (dill branches to
   297, stem 310.5, edge-hl--r blurred 310..330, refractR 322..338); 40 is 14px
   clear of the label and sits just past .pickle-jar__edge-hl's blur tail
   (12..32 + blur(5px) ~= 39.5). It crosses the cucumber over jar-y 150..356 and
   that is PHYSICALLY CORRECT â€” a mould seam is IN the front glass and the
   cucumber is behind it â€” and a pale seam over a dark vegetable is more visible
   than one over the lit brine, not less. Edit this number, never override it,
   or the next reader finds the old one. */
.pickle-jar__mould-seam { position: absolute; left: 40px; top: 104px; bottom: 44px; width: 1px; pointer-events: none;
  background: linear-gradient(180deg, rgba(214,232,238,0), rgba(214,232,238,.07) 30%, rgba(214,232,238,.05) 70%, rgba(214,232,238,0)); }

/* Â§10: "Shoulder highlight horizontal displacement up to 8px" and "Cool glass
   edge opacity change only". Both by transform/opacity; the sticker and the jar
   never move. This is the whole of the pointer response the design permits. */
.pickle-jar__shoulder-hl { position: absolute; left: 40px; top: 88px; width: 100px; height: 9px;
  border-radius: 50%; pointer-events: none;
  transform: translateX(calc(var(--pv-px) * 8px));
  background: linear-gradient(90deg, rgba(214,232,238,0), rgba(214,232,238,.20), rgba(214,232,238,0)); }
.pickle-jar__edge-hl { position: absolute; left: 12px; top: 110px; width: 20px; height: 250px;
  border-radius: 50%; pointer-events: none; filter: blur(5px);
  opacity: calc(1 - var(--pv-px) * .22);
  background: linear-gradient(180deg, rgba(226,240,246,0) 0%, rgba(226,240,246,.10) 26%, rgba(226,240,246,.12) 62%, rgba(226,240,246,0) 100%); }
.pickle-jar__edge-hl--r { left: auto; right: 14px; top: 150px; width: 8px; height: 160px; filter: blur(4px);
  opacity: calc(1 + var(--pv-px) * .22);
  background: linear-gradient(180deg, rgba(226,240,246,0), rgba(226,240,246,.07) 50%, rgba(226,240,246,0)); }

/* â”€â”€ THE STICKER. Opaque, matte, adhered. A flex column: the closing line
   rides margin-top:auto so the reserved foot is a real constraint â€” with it
   absolutely positioned the flow overran and clipped the closing statement.
   â˜… isolation:isolate IS LOAD-BEARING, NOT TIDINESS. .pickle-jar__label-fibre
   below uses mix-blend-mode:multiply, which resolves against the nearest
   ancestor STACKING CONTEXT â€” and neither this element (position:absolute,
   z-index:auto), nor .pickle-jar, nor .birth-preserve__cavity (overflow:hidden
   is not a stacking context) is one. Without this the "opaque" film multiplies
   against the brine behind it and reads faintly wet where the liquid is
   brightest. One declaration, no side effects; do not delete it as cleanup. */
.pickle-jar__label {
  position: absolute; left: 54px; top: 120px; width: 230px; height: 300px;
  box-sizing: border-box; padding: 13px 13px 18px; border-radius: 6px; text-align: center;
  display: flex; flex-direction: column;
  isolation: isolate;
  background: linear-gradient(168deg, var(--label-cream) 0%, #e5d5b4 46%, #dfcfad 100%);
  /* a hairline of adhesive, and NO drop shadow â€” a shadow floats it */
  box-shadow: 0 0 0 1px rgba(52,40,24,.22), inset 0 0 12px rgba(120,96,56,.10);

  /* â˜…â˜… THE LABEL PINS THE PARCHMENT INK, AND IT IS THE ONLY DEFENCE AGAINST
     ?m2=dark. app.js:4657 adds html.m2-parch unless the URL carries ?m2=dark;
     without it, styles.css:3897 and :4004-4007 hand the hosted face the DARK-
     STOCK tokens â€” --bf-ink #e9e5dc, --mk-sun #c6a466 and the rest, authored for
     a near-black card. Measured on this cream's darkest stop #dfcfad: the name
     1.09:1, the sun mark 1.74:1, the meta line 1.77:1. The whole reading
     vanishes on a switch this repo still ships.
     The sticker is cream on BOTH decks, so it always takes the dark-ink set.
     â˜… THE PIN IS APPLIED TO .m2hero, NOT HERE â€” see the block below. Custom
     properties inherit, and inheritance stops at the first ancestor that
     DECLARES: .m2hero declares its own --mk-*, so a declaration on this element
     (its ancestor) would never reach the marks. */
}
.pickle-jar__label-fibre { position: absolute; inset: 0; border-radius: 6px; pointer-events: none;
  opacity: .12; mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='280'%3E%3Cfilter id='pfib'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='280' height='280' filter='url(%23pfib)' opacity='0.7'/%3E%3C/svg%3E"); }
.pickle-jar__label-adhesion { position: absolute; inset: 0; border-radius: 6px; pointer-events: none;
  box-shadow: inset 0 0 5px rgba(74,56,30,.22); }
/* the outer 6% of each side is shaded: the film bends with the glass. Do NOT
   reduce it â€” it is the one layer saying the film follows the jar's curve.
   The two label lines are padded clear of it instead; see .pickle-jar__inst. */
.pickle-jar__label-curve { position: absolute; inset: 0; border-radius: 6px; pointer-events: none;
  background: linear-gradient(90deg, rgba(58,42,20,.20) 0%, rgba(58,42,20,.05) 6%, rgba(58,42,20,0) 12%,
    rgba(58,42,20,0) 88%, rgba(58,42,20,.05) 94%, rgba(58,42,20,.20) 100%); }
.pickle-jar__label-air { position: absolute; left: 52px; top: 38px; width: 3px; height: 3px;
  border-radius: 50%; pointer-events: none; background: rgba(120,98,58,.18); }   /* one trapped bubble, at most */

/* â”€â”€ THE SPOT VARNISH â€” REGISTERED, AND THINNED.
   REGISTRATION. Authored at top:110 height:112 it covered label-y 110..222,
   while the six marks land at label-y 92..211 (the flow sum is written out
   under .pickle-jar__label .m2bface__marks below). It missed the first mark by
   18px and overhung the ledge by 11. 88/127 brackets the stack with ~4px of
   bleed each side, which is what Â§6 and Â§9 both ask for: "over the six marks
   only".
   â˜… ALPHA .10 -> .07, AND THIS IS THE ONE PLACE THE PRESERVE ALMOST GAVE BACK
   ITS OWN WIN. Computed through the WCAG formula, the six pigments BARE on this
   cream's darkest stop measure sun 5.12 Â· trigram 5.24 Â· rune 5.35 Â· animal
   5.41 Â· hex 5.58 Â· path 7.26 â€” floor 5.12, so the original's ":217 All clear
   4.5:1" is TRUE, and the preserve really does escape the shipped parchment
   card's 4.49:1 tax by replacing the plane instead of laying over it. It then
   spent the win on its own last layer: a white veil over a light stock lifts
   the INK proportionally more than the paper. At .10 the first mark (which sits
   under the gradient's strongest corner) fell to 4.87 bare and 4.68 with the
   fibre's 12% multiply modelled in. At .07 it is 4.84 / 4.66 â€” still the floor,
   but the gesture is visually indistinguishable and the margin is bought back.
   â˜… THE PIGMENTS ARE NOT TOUCHED. The palette is closed and these six ARE the
   shipped assay (styles.css:4017). Thin the film, never repaint the ink.
   â˜… THE FIBRE FIGURE IS MODELLED, NOT SAMPLED â€” feTurbulence taken as mid-grey,
   which is the pessimistic bound (its own rect carries opacity 0.7 inside a .12
   layer). 4.66 is a floor, not a measurement. UNCONFIRMED against a render. */
.pickle-jar__varnish { position: absolute; left: 34px; top: 88px; right: 34px; height: 127px;
  border-radius: 3px; pointer-events: none;
  background: linear-gradient(112deg, rgba(255,252,242,.07) 0%, rgba(255,252,242,.015) 34%, rgba(255,252,242,0) 60%); }

/* â”€â”€ THE TWO LABEL LINES. Both are Â§8's own prescribed strings; neither has had
   a human copy pass (see the markup note).
   â˜… INK #6b573a -> #5a4830 AND 14px OF SIDE PADDING. .pickle-jar__inst is
   space-between, so its two ends run INTO .pickle-jar__label-curve's shaded
   band. #6b573a measures 4.52:1 at the label's bottom stop bare and 4.37:1
   under the curve+adhesion composite â€” a fail at 8px. #5a4830 measures 5.77
   bare; the padding puts both lines 27px in from the label's edge (11.7%),
   outside the curve's 12% falloff, so the bare figure is the one that applies.
   â˜… TRACKING .22em -> .10em and .14em -> .09em, AND IT IS FIT, NOT TASTE. IBM
   Plex Mono advances 0.6em. "BLUE ROOM PRESERVES" + "REGISTER 01" at 8px/.22em
   is 19x6.56 + 11x6.56 = 197px in a 176px box after the padding â€” it collides.
   At .10em it is 168px. The closing line's 36 characters at 8px/.14em is 213px
   in a 204px box and WRAPS; at .09em it is 198px. Re-run both sums if either
   string changes. */
.pickle-jar__inst { position: relative; display: flex; align-items: baseline; justify-content: space-between;
  padding: 0 14px; font-family: var(--font-mono); font-size: 8px; line-height: 1.25;
  letter-spacing: .10em; text-transform: uppercase; color: #5a4830; }
.pickle-jar__sealed { position: relative; margin-top: auto; padding: 10px 14px 0; font-family: var(--font-mono);
  font-size: 8px; line-height: 1.25; letter-spacing: .09em; text-transform: uppercase; color: #5a4830; }

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   THE STICKER HOSTS THE SHIPPED BIRTH FACE.
   Every rule below is a RE-POINT of a shipped rule onto the same node at the
   label's own scale. Nothing here invents a value.

   â˜… THE SPECIFICITY LADDER IS DELIBERATE AND IT IS NOT UNIFORM. _six-live.js
   injects its stylesheet from JS (:689-691), so it lands in the head at a time
   that depends on when install() first succeeds â€” indeterminate relative to a
   <link> added at DOMContentLoaded. EVERY rule here must therefore win on
   specificity alone, never on order. Two ties to avoid by name:
     Â· `.pickle-jar__label .m2bface__marks li` is (0,2,1) â€” an EXACT tie with
       _six-live.js:293. Written with the extra `.m2bface` it is (0,3,1).
     Â· NEVER set `opacity` or `pointer-events` on the marks. _six-live.js:65-66
       carries the entire "which of the six am I on" signal in opacity, and
       :712/:731 set pointer-events INLINE, which no stylesheet can outrank. */

/* â˜…â˜… THE INK PIN. Declared on .m2hero itself because that is where the shipped
   tokens live and inheritance stops there. TWO selectors, one block: the bare
   form (0,2,0) beats styles.css:3897/4004 at (0,1,0) on the dark deck, and the
   html.m2-parch form (0,3,1) beats styles.css:3898/4016 at (0,2,1) on the deck
   that actually ships. This is the fight _m2-pod.css:239-242 had to have, and
   the reason its comment says the qualifier "is not decoration".
   The six values are styles.css:4017-4018 verbatim â€” not a new palette; the
   original file's .pickle-jar__mark--* declared these same six hex, which is
   the whole evidence for hosting rather than replacing. */
.birth-preserve .m2hero,
html.m2-parch .birth-preserve .m2hero {
  --mk-sun: #6b4c14; --mk-animal: #74402c; --mk-path: #313d4c;
  --mk-rune: #465241; --mk-trigram: #315854; --mk-hex: #514c44;
  --bf-ink: var(--label-ink);        /* 10.97:1 at the cream's darkest stop */
  --bf-rule: rgba(52,40,24,.30);
  /* â˜… --bf-meta #6a5c45 -> #5f4e33. The card's own metadata ink does not
     survive the move to a darker ground: it paints BOTH the masthead
     (styles.css:3905/3957) and "By birth alone" (styles.css:3959), and the
     orient line sits at label-y 218-229, ~75% down the cream gradient, where
     #6a5c45 measures 4.26:1 at 9px â€” a fail. #5f4e33 measures 5.29 there and
     5.93 at the masthead, and it sits inside this file's own quiet-ink band
     rather than introducing a seventh grey. */
  --bf-meta: #5f4e33;
}

/* â”€â”€ THE HOSTED CARD STOPS BEING A CARD. Each override is matched to the
   shipped rule it must clear; the specificity is written out because two of
   them are (0,5,1) and a bare `.birth-preserve .m2hero` would silently lose. */
.birth-preserve .m2hero {
  /* styles.css:3702-3723 (0,1,0) â€” the box */
  position: relative; flex: 1 1 auto; min-height: 0;
  width: 100%; height: auto; aspect-ratio: auto; border-radius: 0;
  /* styles.css:3848-3852 (0,1,0) â€” THE JAR DOES NOT LEAN. app.js:7327 keeps
     hit-testing .m2hero and writing --tilt-x/--tilt-y as INLINE custom
     properties, which no stylesheet can outrank â€” but the transform that
     CONSUMES them is a normal declaration and this is one step above it.
     Â§2: "The card/label remains perfectly stationary under pointer movement."
     Â§14's fourth risk: any label tilt destroys the adhesion illusion. */
  transform: none;
  transition: none;
  background: none; box-shadow: none; border: 0;
  filter: none;                      /* styles.css:3535 brightness(1.035) */
}
/* â˜…â˜… AND NOTHING CROSSES THE STICKER. styles.css:3858-3868 is a z-index:5,
   mix-blend-mode:soft-light layer with two 128px radial lobes tracking the
   pointer at frame rate â€” a moving highlight over the opaque conservation film,
   the single worst version of the failure Â§9's closing sentence names, and it
   would be inherited silently just by hosting the hero. */
.birth-preserve .m2hero::before { display: none; }
/* styles.css:3874 â€” you cannot turn over a sticker that is glued to a jar. The
   exhibit's own recede/resolve replaces it, below. */
.birth-preserve .m2hero.is-turning { animation: none; }
/* styles.css:3744/3779 (0,2,1) and :3795 (0,5,1) â€” the card stock and both
   hover drops. Written at (0,3,1) and (0,6,1). */
html.m2-parch .birth-preserve .m2hero {
  background: none; border-color: transparent; box-shadow: none;
}
html.m2-parch .menu__draw:has(.menu__draw-stage:hover) .birth-preserve .m2hero,
html.m2-parch .menu__draw:has(.m2read:hover) .birth-preserve .m2hero { box-shadow: none; }
.menu__draw:has(.menu__draw-stage:hover) .birth-preserve .m2hero,
.menu__draw:has(.m2read:hover) .birth-preserve .m2hero { filter: none; box-shadow: none; }

/* â”€â”€ THE FACE, AT THE STICKER'S SCALE.
   â˜…â˜… THESE SIZES ARE THE FIT, NOT THE TASTE. The label's content box is
   230-26 = 204 wide by 300-13-18 = 269 tall; the two label lines take 10 and
   20, so .m2hero gets 239. At the card's SHIPPED metrics (marks 10px/gap
   12/margin-top 26, name 25px) the flow computes to 13 + 11 + 26.25 + 158 + 41
   = 249 â€” a 10px overflow, and because .pickle-jar__sealed rides margin-top:
   auto the failure mode is the closing line silently clipping rather than the
   block visibly overrunning. At the sizes below it computes to
       head 13 + headrule 11 + name 25 + marks 129 + bottom wall 41 = 219
   leaving 20px of slack, which the two auto margins the card already carries
   (styles.css:4031 on the name, :3930 on the wall) split 10 each. Change any
   number here and re-run that sum.
   â˜… line-height is PINNED on the marks and the head. Left at `normal` the row
   height depends on IBM Plex Mono's own metrics, which is the one figure four
   reviews could not confirm without a browser; pinned, the arithmetic above is
   deterministic. */
.pickle-jar__label .m2bface { padding: 0; }                        /* (0,2,0) > :3899 (0,1,0) */
.pickle-jar__label .m2bface .m2face-head { line-height: 1.2; }     /* (0,3,0) */
.pickle-jar__label .m2bface .m2face-meta {                         /* (0,3,0) > :3905/:3957 (0,2,0) */
  font-size: 9.5px; letter-spacing: .12em;
}
/* the âœ¦ stays at the shipped #8a6a42 (styles.css:3812), which measures 3.60:1
   on this cream. It is the same glyph on every card and carries no
   information â€” a non-text mark, where the house has already ruled 3:1 is the
   bar (styles.css:3819, BR-S326, in this exact situation). Hosting also FIXES
   it: the file's own .pickle-jar__product-mark was #a88c50 at 2.09:1, which is
   the defect BR-S326 removed, reintroduced. Nothing to do but not undo it. */
.pickle-jar__label .m2bface .m2bface__headrule {                    /* (0,3,0) > :3925/:3955 */
  margin: 10px 0 0; background: rgba(52,40,24,.30);
}
.pickle-jar__label .m2bface .m2bface__name {                        /* (0,3,0) > :4031 (0,1,0) */
  font-size: 24px; line-height: 1.04;
}
.pickle-jar__label .m2bface__marks {                                /* (0,2,0) > :3991 (0,1,0) */
  margin: 10px 0 0; gap: 7px; font-size: 10px; justify-items: center;
}
/* (0,3,1) â€” one step past _six-live.js:293's (0,2,1), which it would otherwise
   TIE, leaving the transition to be decided by stylesheet load order. */
.pickle-jar__label .m2bface .m2bface__marks li {
  line-height: 1.2; padding: 1px 6px; border-radius: 2px;
  transition: color 160ms var(--ease-settle, cubic-bezier(.2,.7,.2,1)),
              background 160ms var(--ease-settle, cubic-bezier(.2,.7,.2,1));
}
.pickle-jar__label .m2bface .m2bface__wall--bot .m2face-div {        /* (0,4,0) > :3956 (0,3,0) */
  width: 64px; max-width: none; margin: 16px auto 13px; background: rgba(52,40,24,.32);
}
.pickle-jar__label .m2bface .m2face-orient {                         /* (0,3,0) > :3932/:3954/:3959 */
  font-size: 9px; line-height: 1.2; letter-spacing: .16em;
}
/* Â§3's taste killer: "busy label borders". Once .m2bface resolves against a
   204x239 plane instead of a 382x605 card, its two 10px corner brackets are
   proportionally twice as loud and read as a frame around the sticker. The
   archival ticks belong to a CARD; a sticker is not a card. */
.pickle-jar__label .m2tick { display: none; }                        /* (0,2,0) > :3819 (0,1,0) */

/* NO FOCUS RULE HERE, DELIBERATELY. _six-live.js:67 already injects
   `outline: 1px solid rgba(28,21,13,.5); outline-offset: 3px`, which measures
   3.07:1 against this cream's darkest stop and clears WCAG 1.4.11's 3:1. The
   original file's own rgba(52,40,24,.5) at offset 2 measures 2.68:1 and FAILS â€”
   re-pointing it would have replaced a passing focus indicator with a failing
   one on the only keyboard-reachable control in the exhibit. Â§15's Interaction
   gate requires "focus remains visibly identifiable". Do not add one back. */

/* â˜…â˜… THE INK STEP IS KEYED TO aria-current, NOT :hover, AND THAT IS THE WHOLE
   PARITY ARGUMENT. _six-live.js:626-628 sets aria-current from THREE entry
   points â€” pointerenter (:744), focus (:745) and click (:746) â€” and its own
   dim/lit signal keys off that attribute, not off :hover. Keyed to :hover, a
   keyboard reader arrowing the six would get the opacity signal and no ink
   step while a mouse reader got both. Â§10 asks for parity in one sentence:
   "On hover OR keyboard focus: ink darkens one step".
   Specificity (0,4,1): beats styles.css:3997-4002 (0,2,1), _six-live.js:293
   (0,2,1) and :66 (0,3,1). It sets colour and background ONLY â€” never opacity,
   so :66's `opacity:1` still lights the active mark. The six darkened forms and
   the .09 tints are the original file's own values, unchanged. */
.pickle-jar__label .m2bface__marks li:nth-child(1)[aria-current="true"] { color:#472f06; background:rgba(107,76,20,.09); }
.pickle-jar__label .m2bface__marks li:nth-child(2)[aria-current="true"] { color:#50261a; background:rgba(116,64,44,.09); }
.pickle-jar__label .m2bface__marks li:nth-child(3)[aria-current="true"] { color:#1c2530; background:rgba(49,61,76,.09); }
.pickle-jar__label .m2bface__marks li:nth-child(4)[aria-current="true"] { color:#2b3527; background:rgba(70,82,65,.09); }
.pickle-jar__label .m2bface__marks li:nth-child(5)[aria-current="true"] { color:#1b3b37; background:rgba(49,88,84,.09); }
.pickle-jar__label .m2bface__marks li:nth-child(6)[aria-current="true"] { color:#332f29; background:rgba(81,76,68,.09); }

/* â”€â”€ THE LID: dark enamel, narrower than the body, sitting ON the neck.
   Six notches (one per mark) and a tamper strip that crosses the lid's front
   edge onto the neck and terminates in the seal. â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.pickle-jar__lid {
  position: absolute; left: 49px; top: 0; width: 240px; height: 40px; overflow: hidden; pointer-events: none;
  border-radius: 6px 6px 2px 2px;
  background: linear-gradient(180deg, #1b2026 0%, #12161b 44%, #0d1116 78%, #181d23 100%);
  box-shadow: inset 0 1px 0 rgba(214,232,238,.12), 0 4px 10px rgba(0,0,0,.65);
}
.pickle-jar__lid-grooves { position: absolute; inset: 0; opacity: .5;
  background: repeating-linear-gradient(90deg, rgba(214,232,238,.05) 0 1px, rgba(0,0,0,0) 1px 5px); }
.pickle-jar__lid-seam { position: absolute; left: 0; right: 0; bottom: 8px; height: 1px;
  background: linear-gradient(90deg, rgba(168,140,80,0), rgba(193,166,105,.55) 22%, rgba(193,166,105,.55) 78%, rgba(168,140,80,0)); }
/* one notch per mark. NO transition: it must light on the same frame the
   bubble mounts and clear on the frame it ends, or the 700ms law is a lie. */
.pickle-jar__notch {
  position: absolute; top: 3px; width: 12px; height: 5px; border-radius: 0 0 3px 3px; transition: none;
  background: rgba(9,13,18,.9); box-shadow: inset 0 -1px 0 rgba(214,232,238,.10);
}
/* â˜…â˜… THE NOTCH READS _six-live's OWN STATE AND NEEDS NO JS AT ALL. `.is-lit`
   is deleted: nothing could ever set it, and a class would have been a second
   owner of a state CSS can already see (styles.css:3527-3528 states that rule
   for this page). aria-current is written by _six-live.js:626 and cleared by
   its own away() at :803, so this cannot drift when that module changes â€” and
   it has changed eleven times in this branch. Six rules, no controller.
   The notch is a CONDITION (lit while the mark is showing); the bubble is an
   EVENT and is the only part that needs a node. */
.birth-preserve:has(.m2bface__marks li:nth-child(1)[aria-current="true"]) .pickle-jar__notch[data-mark="0"],
.birth-preserve:has(.m2bface__marks li:nth-child(2)[aria-current="true"]) .pickle-jar__notch[data-mark="1"],
.birth-preserve:has(.m2bface__marks li:nth-child(3)[aria-current="true"]) .pickle-jar__notch[data-mark="2"],
.birth-preserve:has(.m2bface__marks li:nth-child(4)[aria-current="true"]) .pickle-jar__notch[data-mark="3"],
.birth-preserve:has(.m2bface__marks li:nth-child(5)[aria-current="true"]) .pickle-jar__notch[data-mark="4"],
.birth-preserve:has(.m2bface__marks li:nth-child(6)[aria-current="true"]) .pickle-jar__notch[data-mark="5"] {
  background: rgba(214,190,130,.85);
  box-shadow: 0 0 6px rgba(214,190,130,.55), inset 0 -1px 0 rgba(255,246,222,.5);
}
.pickle-jar__strip { position: absolute; left: 50%; top: 4px; width: 9px; height: 84px;
  transform: translateX(-50%); pointer-events: none;
  background: linear-gradient(180deg, #c9ae70 0%, #a98d4e 34%, var(--gold) 44%, #8e7440 62%, #6f5a2e 100%);
  box-shadow: 0 0 0 1px rgba(0,0,0,.45); }
.pickle-jar__strip-fold { position: absolute; left: 50%; top: 36px; width: 13px; height: 5px;
  transform: translateX(-50%); pointer-events: none;
  background: linear-gradient(180deg, rgba(0,0,0,.55), rgba(0,0,0,.15)); }
.pickle-jar__seal { position: absolute; left: 50%; top: 88px; width: 7px; height: 7px;
  transform: translateX(-50%) rotate(45deg); pointer-events: none; background: var(--gold);
  box-shadow: 0 0 0 1px rgba(0,0,0,.5), 1px 1px 2px rgba(0,0,0,.5); }

/* â”€â”€ the one motion in the exhibit: a single bubble, on demand, 700ms. No
   idle animation anywhere. `left` and `bottom` are supplied by the module â€”
   the original declared neither, so an absolutely-positioned box with auto
   insets on both sides resolved to its static position and every bubble fired
   at the same wrong place regardless of which mark asked for it. â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.pickle-jar__bubble {
  position: absolute; width: 4px; height: 4px; border-radius: 50%; pointer-events: none;
  background: radial-gradient(circle at 34% 28%, rgba(255,248,228,.9) 0%, rgba(226,214,168,.25) 46%, rgba(226,214,168,0) 74%);
  box-shadow: inset 0 0 0 .5px rgba(255,246,222,.3);
  animation: preserve-bubble 700ms cubic-bezier(.2,.7,.2,1) forwards;
}
@keyframes preserve-bubble {
  0%   { transform: translate3d(0,0,0) scale(.7); opacity: 0; }
  18%  { opacity: .55; }
  100% { transform: translate3d(3px,-96px,0) scale(1); opacity: 0; }
}

/* â•â• TAROT. Â§10: "the jar belongs to Birth only... on transition the centre
   stage darkens, the current exhibit recedes, and the next resolves from the
   same fixed centre. Transition reuses the existing midpoint content swap."
   â˜… IT IS READ WITH :has(), NOT WITH A SECOND CONTROLLER â€” app.js:3327 already
   writes data-face on the hero, at the flip's 240ms MIDPOINT (:3345), which is
   the exact instant the card is edge-on. The 200ms recede below therefore lands
   inside that window for free. Â§12's "do not duplicate reading state", kept.
   â˜… THE HERO IS NOT RE-PARENTED FOR THE FLIP, and that is deliberate: moving a
   node cancels and restarts its CSS animation, so unwrapping at the midpoint
   would make the shipped 480ms m2-flip visibly restart from 0deg.
   â˜… v1 LIMITATION, NAMED: Tarot gets the SHIPPED parchment card standing on the
   niche's own sill, not the "dry black-card exhibit" Â§16 describes. That exhibit
   is a design nobody has drawn, and inventing one here would be worse than
   showing the honest object. Everything else Â§10 asks for is satisfied.
   â˜… NO reduce BRANCH IS NEEDED: app.js:3343 returns BEFORE adding is-turning
   under reduced motion and settles immediately, so data-face flips in one frame
   and these transitions have nothing to interpolate across. */
.birth-preserve:has(.m2hero.is-turning) .birth-preserve__cavity { filter: brightness(.5); }

.pickle-jar > :not(.pickle-jar__label),
.pickle-jar__label > :not(.m2hero) { transition: opacity 200ms var(--ease-settle, cubic-bezier(.2,.7,.2,1)); }
.birth-preserve:has(.m2hero[data-face="tarot"]) .pickle-jar > :not(.pickle-jar__label),
.birth-preserve:has(.m2hero[data-face="tarot"]) .pickle-jar__label > :not(.m2hero) { opacity: 0; }
.birth-preserve:has(.m2hero[data-face="tarot"]) .pickle-jar__label {
  left: 50%; top: 50%; margin: -182px 0 0 -115px;      /* 230 x 364 = the deck's own 120/190 */
  width: 230px; height: 364px; padding: 14px 12px; border-radius: 12px;
  isolation: auto;
  background: linear-gradient(165deg, #efe9db, #dcd4c2);              /* styles.css:3780 */
  box-shadow: 0 20px 40px rgba(0,0,0,.6);                             /* styles.css:3782 */
  transition: width 200ms var(--ease-settle), height 200ms var(--ease-settle),
              margin 200ms var(--ease-settle), background 200ms var(--ease-settle);
}

@media (prefers-reduced-motion: reduce) {
  .pickle-jar__bubble { animation: none; opacity: 0; }
  .birth-preserve__cavity,
  .pickle-jar > *, .pickle-jar__label, .pickle-jar__label > * { transition: none; }
  /* Â§10's reduced-motion law: "no parallax, static reflection". The pointer
     light never installs under reduce (wireLight returns early), but pin the
     consumers too so a stale custom property cannot leave a layer displaced. */
  .birth-preserve { --pv-px: 0; --pv-py: 0; }
}

/* â”€â”€ BELOW 1200 THE EXHIBIT STANDS DOWN, and it is the module that takes it
   down (see apply()), not this file. Stated here so the reason is where the
   next reader looks:
   `zoom` scales the ink with the glass. At the panel widths available below
   the menu's own 1199px collapse (styles.css:4133-4143), k falls under 0.72 and
   the six marks render below 7.2px â€” under the 8px floor this exhibit sets for
   its own smallest type. A jar whose label you cannot read is a picture of a
   jar. Â§2's "at mobile width, the entire jar fits without horizontal clipping"
   is satisfied by not being there; the shipped card, which the collapse already
   re-drives by WIDTH at styles.css:4141, takes the phone. */
```

---

# (e) THE MOUNTER BRANCH

Edits to `_m2-box.js`, at its own line numbers, in its own idiom.

```js
/* :42 â€” MODE falls through to "box" for any unrecognised arg, so ?case=preserve
   currently mounts THE CASE. */
  var MODE = (arg === "vitrine" || arg === "v") ? "vitrine"
           : (arg === "pod") ? "pod"
           : (arg === "preserve" || arg === "jar") ? "preserve" : "box";

/* :59-63 â€” cache tokens are PER-ASSET: bumping app.js does not bump this one. */
  function styles() {
    if (MODE === "box") style("m2box-css", "_m2-box.css?v=491");
    else if (MODE === "pod") style("m2pod-css", "_m2-pod.css?v=491");
    else if (MODE === "preserve") style("m2pres-css", "_m2-preserve.css?v=494");
    else style("m2vit-css", "_m2-vitrine.css?v=491");
  }

/* :66 and :72 â€” THE ONE SHARED LINE THIS MODE MUST NOT GET WRONG. shell() and
   wrap()'s re-entry guard carry the same selector written twice. boot() (:283)
   attaches a MutationObserver on #menuView that calls apply() on every childList
   change, and apply() calls wrap() unconditionally â€” so if only shell() learns
   .birth-preserve, every menu remount (a draft save, the holdings flip) wraps
   the already-wrapped hero again: a jar inside a jar inside a jar, invisible on
   first load. Hoisted to one constant so the two cannot disagree. */
  var SHELLS = ".m2box, .br-vitrine, .m2pod, .birth-preserve__seat";
  function shell() { return doc.querySelector(SHELLS); }
  /* inside wrap(), :72 */
  if (!h || h.closest(SHELLS)) return false;

/* a sibling of el(): el() force-sets aria-hidden, which is wrong for the seat
   and the label. */
  function ele(cls, css) {
    var n = doc.createElement("span");
    n.className = cls;
    if (css) n.style.cssText = css;
    return n;
  }

/* :74-83 â€” the mode branch inside wrap(). `inner` is the LABEL, so
   inner.appendChild(h) at :104 lands the shipped hero inside the sticker. */
    } else if (MODE === "preserve") {
      var t = preserveTree();
      box = t.seat; inner = t.label;
    }

/* :88 â€” ONE CONDITION, and the only shared line the new mode touches. The
   original assumes `inner` is a direct child of `box`; here it is four levels
   down (seat > section > cavity > jar > label). */
    if (inner !== box && !box.contains(inner)) box.appendChild(inner);

/* after :104's inner.appendChild(h) â€” Â§9 layer 9 rides ON TOP of the ink, so
   the varnish is appended after the hero rather than authored before it. And
   the two label lines must bracket the hero, so .pickle-jar__sealed is moved
   back after it. */
    if (MODE === "preserve") {
      inner.appendChild(inner.querySelector(".pickle-jar__sealed"));
      inner.appendChild(ele("pickle-jar__varnish"));
      inner.querySelector(".pickle-jar__varnish").setAttribute("aria-hidden", "true");
    }

/* :217-225 â€” apply() gains the preserve tail, and the stand-down. */
  function apply() {
    if (!wantCase || (MODE === "preserve" && root.innerWidth < 1200)) { unwrap(); return; }
    wrap();
    var box = shell();
    if (!box) return;
    if (MODE === "box") { lamp(wantLamp); box.classList.toggle("is-lap", wantLap); }
    else if (MODE === "pod") { stir(wantStir); box.classList.toggle("is-full", wantFull); }
    else if (MODE === "preserve") {
      var pre = box.querySelector(".birth-preserve");
      fit(); wireBubble(pre); wireLight(pre);
    }
    else { box.classList.toggle("is-gold", wantGold); box.classList.toggle("is-seated", wantSeat); }
  }

/* :280-284 â€” boot(). One listener; fit() re-derives k and apply() handles the
   1200px stand-down in the same pass. No IntersectionObserver and no idle rAF:
   the preview pane delivers neither. */
  function boot() {
    styles(); bench(); apply();
    var host = doc.getElementById("menuView");
    if (host && root.MutationObserver) new root.MutationObserver(apply).observe(host, { childList: true });
    root.addEventListener("resize", function () { apply(); fit(); }, { passive: true });
  }

/* :253-256 â€” the bench gains a fourth radio and its own note. */
      + '<label><input type="radio" name="mbmode" data-mb="mode" value="preserve"' + (MODE === "preserve" ? " checked" : "") + '> the preserve</label>'
    var presRows =
        '<i>The label HOSTS the shipped birth face &mdash; the six pigments it '
      + 'declared are byte-identical to styles.css:4017, so nothing was ever new. '
      + '460&times;522 is NOT the card&rsquo;s box (max width 391.6); the seat reserves '
      + 'the card&rsquo;s height so the selector cannot move, and the niche scales to '
      + 'fit. Stands down under 1200px: zoom takes the marks below 7.2px.</i>';
```

`unwrap()` at `:140-146` needs **no change**: `box.querySelector("[data-m2-hero]")` finds the hero however deeply nested, `insertBefore` puts it back among its own siblings (the cap and herosub before it, the flip and act row after it â€” the order the delegated handlers read), and `box.remove()` takes the jar with it. Because every preserve rule is scoped under `.birth-preserve`/`.birth-preserve__seat` and **nothing is written onto the hero itself**, the restored card is byte-identical. Keep it that way.

`preserveTree()` returns `{ seat, label }` and builds the tree in Â§b's order using `el()` for the `aria-hidden` decoration and `ele()` for the coordinate-carrying spans. `_six-live.js` needs no change and notices nothing: `:708`'s `!ul.dataset.sx` one-shot guard travels with the moved node, and moving a node carries its listeners, so the six stay wired through the wrap and the `:967` re-assert does not double-wire.

---

# (f) WHAT ONLY THE BUILDER CAN SETTLE

1. **The reading plane shrinks 42%.** The card gives the reading 382Ã—605 at 1920; the sticker gives it 207Ã—270. The six marks render 8.2â€“9.7px depending on viewport against Â§8's own 9.5â€“10px band, and the crowned name 19.8â€“23.3px against Â§8's 24â€“28px. The preserve genuinely escapes the parchment card's 4.49:1 contrast tax â€” the marks measure 5.12â€“7.26 bare on cream against the shipped floor of 6.09 on parchment, with nothing crossing them once the mould seam is moved â€” but it pays for that in size. **This is the one thing looking at it will settle in five seconds and no amount of arithmetic will.** The levers, in order of cost: grow the label inside the jar (already at 68% against Â§5's 55â€“60%), grow the jar inside the niche (73.5% now), or shrink the niche's returns.

2. **Â§5 and Â§8 cannot both hold, and the stylesheet already chose.** Â§5 says the label is 55â€“60% of jar body width; the assembled file ships 68%. That is forced, not sloppy: "The Crowned Name" at 24px Cormorant needs ~190px plus 26px of padding, so the label cannot go below 216px, the jar cannot go below 360px, and the niche cannot go below ~460 â€” which is exactly the number in the file. At Â§5's 60% the label is 203px and the name wraps to two lines. Separately, Â§5's "jar occupies 42â€“46% of the centre-column width" would put the jar at ~200px wide at 1440 where the file puts it at 326. Amend the spec or shrink the name; I have kept the file's own choice and left the conflict visible.

3. **1920 and above: the niche is 99px shorter than the card was.** The width term binds (k = 0.970 vs 1.159 for height), so the object is smaller than the card at large viewports while the reserved box is identical and the selector never moves. The alternative is to let the exhibit overflow its grid track into the 52px column gap, which buys ~10px of scale and costs Â§13's 16px clearance. A judgement about how a smaller object reads next to the same two columns.

4. **The three label strings.** "Blue Room Preserves", "Register 01", "Sealed at first breath Â· Not revised" are Â§8's own prescribed copy, so they are not invented â€” but no human has written them and the house memory is explicit that the live words are placeholder. Blanking both lines frees 30px that the flex autos absorb, so this stays a live A/B rather than a commitment.

5. **`aria-hidden="true"` on `.m2bface` (app.js:2956) wraps six focusable controls.** `_six-live.js:732-733` puts `tabindex="0"` and `role="button"` on each `<li>` inside an aria-hidden subtree â€” tab-reachable, keyboard-operable, never announced. **This is a shipped defect the move surfaces, not one it causes**, and I have deliberately *not* fixed it in the mounter: removing that attribute changes what a screen reader announces on a live surface, and Â§10's promise ("Birth-mark rows become actual accessible controls") plus Â§15's Interaction gate cannot honestly be signed off until it is. The one-line fix belongs in `renderWall()`, whether or not this prototype ships.

6. **Two 2â€“4px calls that want an eye, not a formula.** The meniscus was moved up 4px to open a 7px gap to the label's top edge (Â§5 forbids touching, and the exhibit renders at non-integer zoom everywhere). The label's bottom edge sits 5px above the foot's lit lip; growing the foot would break Â§5's 7â€“9% band, so the options are accept 5px or move the label to `top:118px; height:298px`.

7. **Unconfirmed, and it is one browser check.** `zoom` on an ancestor of `.m2hero`: the spec says it creates neither a containing block nor a stacking context, and `.m2hero` already carries `transform: perspective(...)` (styles.css:3849) so nothing fixed can live inside it today anyway â€” but styles.css:2751-2752 is emphatic enough about the reveal's fullview machinery that it is worth one look. Also unverified without a render: every rendered-height figure here is arithmetic from the declared box model with line-heights now pinned, and the fibre's contrast cost is modelled at mid-grey (the pessimistic bound), not sampled.