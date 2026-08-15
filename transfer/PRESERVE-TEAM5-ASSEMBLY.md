All numbers verified against source. Here is the assembly.

---

# (a) `_m2-preserve.css` â€” build-ready, complete

```css
/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   M2 Â· THE BIRTH PRESERVE â€” the assembled exhibit.   `_m2-preserve.css`

   PROTOTYPE. Loaded only on `?case=preserve` by _m2-box.js. Never imported into
   styles.css; deleting this file and its mode branch removes the exhibit entirely.
   Built to transfer/BIRTH-PRESERVE-SPEC.md, as corrected by the critique brief.

   â˜… THIS FILE IS ORDERED BY Â§9, TOP TO BOTTOM, AND THE STACK LITERALLY MATCHES IT.
   The z-index table below is the single place the order is declared; every section
   header names its Â§9 layer. Source order and z-index agree, so a mounter that
   appends in the wrong order still composites correctly â€” Â§9's own warning
   ("correct compositing is critical to adhesion credibility") is answered twice.

       Â§9.1  niche back wall .............. __niche + __seam __sill __contact  z 1-2
       Â§9.2  jar rear glass ............... .pj__neck .pj__shoulder .pj__body  z 1
       Â§9.3  rear silhouettes ............. .pj-veg                           z 2
       Â§9.4  brine body + edge density .... .pj__brine                        z 3
       Â§9.5  front contents, mineral foot . .pj-dill .pj-seeds .pj-bed        z 4
       Â§9.6  inner refraction + meniscus .. .pj__refract .pj__meniscus        z 5
       Â§9.7  exterior sticker ............. .pickle-jar__label                z 6
       Â§9.8  sticker ink + mark regions ... .m2bface  (inside the film)
       Â§9.9  sticker spot varnish ......... .m2bface__marks::after
       Â§9.10 foreground reflections ....... .pj__gleam .pj__edge .pj__foot     z 7
       Â§9.11 lid and security seal ........ .pj__lid .pj__strip               z 8

   â˜… WHAT THE FOUR LAYER-AUTHORS EACH CONTRIBUTED, so their work is findable:
     vessel   â€” the niche's five-value depth order, the returns, the caustic, the
                three-region reflection law, the notch/:has() binding, the lid.
     preserve â€” the brine's six-layer stack, the meniscus-as-value-step with its
                capillary climb, the cucumber and its measured subordination ladder.
     label    â€” the fresh-stock contrast ledger, the anti-SKU rules, the tint as a
                pseudo-element, the a11y finding on `.m2bface[aria-hidden]`.
     integration â€” the reserved-seat argument, the deck-proof token block, the
                dry-mount tarot exhibit, the pointer channel as a normalised pair.
   Where two disagreed, the correction brief decided; the seams I had to pick are
   listed in the hand-off, not here.
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */


/* â•â•â• 1 Â· THE PRESERVATION GATE â€” the column does not move, in either axis â•â•â•â•â•â•

   VERTICAL. `.birth-preserve` declares a height BYTE-IDENTICAL to the expression
   `.m2hero` contributes today (styles.css:3716) and everything is fitted inside it.
   This is the panel's own idiom, not an invention: styles.css:4051 reserves
   `.menu__draw-act { min-height: 38px }` for exactly this reason (BR-S346). The
   seat's height does not depend on the exhibit's content, so the guarantee is
   structural rather than an arithmetic result that has to be re-checked.
   It matters because `.menu__draw` is `grid-template-rows: 1fr auto 1fr` with
   `.menu__draw-ctrl` and `.menu__draw-head` both `align-self: center`
   (styles.css:3223, :3231-3232): grow the stage by Î” and both side columns
   re-centre by Î”/2. _m2-pod.css:117-136 measured that failure at +61 to +116px.

   HORIZONTAL. The stage track is `minmax(0, 1fr)` (styles.css:3222) between two
   FIXED columns, so its min-content is floored at 0 and no content here can grow
   it. The track is therefore a constant of viewport width alone:
       track = min(1180px, 92vw) âˆ’ 630px âˆ’ 2Â·clamp(24px, 3vw, 52px)
   â€” the identical term _m2-box.css:78 and _m2-pod.css:115 already derive. The
   exhibit is capped at track âˆ’ 32px so Â§13's 16px gap to either side column
   always holds. WITHOUT the width leg the exhibit overflows the track at â‰¥1900px
   wide; without the height leg the column moves. Both legs, one `min()`.

   â˜… THE Â§13 GUTTER IS MEASURED TO THE NICHE, NOT THE JAR. The brief's chain put
   the 16px on the jar, which leaves the recess itself outside the gate â€” at 1920
   the jar would land on the floor and the niche's own 28px of cheek would sit ON
   the side columns. The niche is the outermost painted element, so it is what the
   gate is about. Its worked consequence is the geometry table handed over with
   this file.
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

.birth-preserve {
  /* â”€â”€ THE SEAT. Change styles.css:3716 and this is the one line to change with it. */
  --bp-seat: clamp(400px, 56vh, 620px);
  --bp-track: calc(min(1180px, 92vw) - 630px - 2 * clamp(24px, 3vw, 52px));
  --bp-air: 16px;      /* Â§13: minimum visual gap, niche to either side column     */
  --bp-cheek: 14px;    /* the recess's side return â€” the same value as its sill     */
  --bp-niche-t: 10px;  /* head-air above the lid: a recess with air reads as        */
  --bp-niche-b: 14px;  /* architecture; one shrink-wrapped to its occupant is a border */

  /* â”€â”€ THE DERIVATION. Two budgets, the jar takes the smaller.
     â˜… EVERY TERM IS AN ABSOLUTE LENGTH. Not one percentage enters this chain, and
     that is deliberate: a percentage inside a custom property resolves against
     whichever AXIS consumes it, so a `100%` term written once and read by both
     `width` and `height` silently yields two different boxes. The `max-width`
     belt at the foot of this block is the only percentage in the file, and it is
     in a width property. */
  --bp-open-h: calc(var(--bp-seat) - var(--bp-niche-t) - var(--bp-niche-b));
  --bp-ratio: .72;                                    /* Â§5: 0.70â€“0.74, the middle */
  --bp-jar-h: min(var(--bp-open-h),
                  calc((var(--bp-track) - 2 * var(--bp-air) - 2 * var(--bp-cheek)) / .72));
  --bp-jar-w: calc(var(--bp-jar-h) * var(--bp-ratio));
  --bp-niche-w: calc(var(--bp-jar-w) + 2 * var(--bp-cheek));

  /* â”€â”€ Â§5's BANDS, as fractions of jar height.  lid 8 Â· neck 5 Â· shoulder 7 Â·
     body 73 Â· foot 7 = 100.
     â˜… BODY IS THE DERIVED REMAINDER, NOT AN INDEPENDENT RANGE. Â§5's five ranges
     sum to 93â€“105%, so they cannot all be honoured; the ruling is that
     body = 100 âˆ’ (lid + neck + shoulder + foot). That puts body at 73% against
     Â§5's stated 66â€“70% â€” the one Â§5 figure this build does not meet, and it is
     met by arithmetic rather than by taste. */
  --bp-lid: .08; --bp-neck: .05; --bp-shoulder: .07; --bp-foot: .07;
  --bp-body-top: calc(var(--bp-jar-h) * .20);         /* lid + neck + shoulder     */
  --bp-body-h: calc(var(--bp-jar-h) * .73);

  /* â”€â”€ THE LABEL.
     â˜…â˜… Â§5's LABEL HEIGHT BAND (62â€“68% of body height) IS UNBUILDABLE AND IS NOT
     FOLLOWED. At 1440Ã—900 the body is 350.4px, so Â§5's ceiling gives a 238px
     label â€” into which Â§8 asks for eight typographic ranks that measure 281px at
     Â§8's own sizes. It misses by 43px at the best desktop viewport, and shrinking
     the type or closing the 12px mark gap are both forbidden (SC 2.5.8 makes the
     gap a hard floor: row pitch 13 + 12 = 25px against a 24px minimum). So the
     band is 84%, and Â§2's "the centre of the label is optically calm and fully
     readable" plus Â§15's hierarchy gate are the authority for overriding Â§5 here.
     The honest cost is in the hand-off: the label keeps all of the shipped card's
     ink and loses nearly all of its air.
     WIDTH stays inside Â§5's band at 58%, which is what leaves the two vertical
     brine bands Â§5 requires â€” 72.6px each side at 1440. */
  --bp-label-band: .84;
  --bp-label-h: calc(var(--bp-body-h) * var(--bp-label-band));
  --bp-label-w: calc(var(--bp-jar-w) * .58);
  --bp-free: calc(var(--bp-body-h) - var(--bp-label-h));   /* split above/below   */
  --bp-label-top: calc(var(--bp-body-top) + var(--bp-free) / 2);
  /* THE MENISCUS IS DERIVED, NEVER DECLARED BESIDE THE LABEL. Â§2 lists a level
     meniscus as an absolute truth and Â§5 forbids the label touching it â€” but an
     opaque label covering the surface line just looks like a full jar, so a hard
     fill line converts a visible failure into an invisible one. Half-way between
     the shoulder's end and the label's top edge, it cannot be touched at any
     label height: 14px of clear liquid each way at 1440. */
  --bp-menisc: calc(var(--bp-body-top) + var(--bp-free) / 4);

  /* â”€â”€ THE POINTER CHANNEL. A normalised [-1,1] pair and nothing else; Â§10's
     displacement magnitudes are applied per-layer at Â§3 and Â§9, so the module
     cannot move something the spec says is fixed. 0/0 IS the designed still
     composition, which is why the exhibit is correct in a pane with rAF frozen. */
  --bp-px: 0; --bp-py: 0;

  position: relative;
  display: grid;
  place-items: center;
  height: var(--bp-seat);       /* â˜… the whole vertical gate, in one declaration */
  width: 100%;                  /* of a track minmax(0,1fr) forbids from growing */
  max-width: calc(100% - 2 * var(--bp-air));   /* the belt; see the percentage note */
  margin: 0;
}

/* â•â•â• 2 Â· THE MATERIAL â€” one metal, one stock, one ink family â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

   â˜…â˜… EVERY COLOUR-CARRYING TOKEN THE LABEL CONSUMES IS DECLARED ON THE FILM, AT
   THREE CLASSES, UNCONDITIONALLY. app.js:4657 adds `html.m2-parch` unless the URL
   says `?m2=dark`, and the card's ink is declared twice:
       .m2hero                 (0,1,0)   --bf-ink #e9e5dc + the six LIGHT pigments
       html.m2-parch .m2hero   (0,2,1)   --bf-ink #1c150d + the six DARK pigments
   A two-class selector `.birth-preserve .m2hero` is (0,2,0) and LOSES to the
   second â€” the trap _m2-pod.css:238-242 already recorded. Measured, with no
   override, `?m2=dark` puts #e9e5dc on cream at 1.22:1 (the crowned name,
   invisible) and the six marks at 1.53â€“2.51:1. That is exactly the failure an
   earlier review round shipped and no lens caught. The sticker is a NEW opaque
   plane, so it declares its own stock and its own ink and NEITHER deck reaches it.
   `html.m2-parch` appears in this file exactly three times, in two rules at Â§14
   and Â§13, and only to cancel or restate rules that exist only on that deck. A
   fourth occurrence is a bug.

   â˜… THE SPEC'S ANTIQUE GOLD CANNOT TOUCH THE LABEL, AND THIS IS MEASURED.
       #a88c50 on #dfcfad = 2.09:1     #c1a669 on #dfcfad = 1.53:1
   Both fail even the 3:1 owed a non-text mark. This is BR-S289's finding arriving
   from a new direction (styles.css:3787, "gold does not survive on parchment").
   Â§7's gold keeps its other two jobs verbatim â€” the niche's interior seam and the
   lid's seam and tamper strip â€” where the ground is blue-black and 2.09-against-
   cream is irrelevant. On the film, gold is #6b4c14, which is not an invention:
   it is the house's own gold-leaf pigment, the shipped `--mk-sun` on parchment
   (styles.css:4017). 5.12:1.
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

.birth-preserve {
  --bp-gold: #a88c50;        /* Â§7, verbatim â€” NICHE AND LID ONLY */
  --bp-gold-lit: #c1a669;

  /* the niche's five values, chosen against each other. Relative luminance, WCAG,
     computed from declared hex:
       sill      #1a2028  L .015677   catches most (the eye sits above centre)
       head      #121820  L .009004
       room      #0b1015  L .005423   Â§7's room base, the page behind
       cheek     #080c12  L .003583   edge-on, nearly black
       backplate #06090e  L .002657   THE DARKEST VALUE ON THE SCREEN
     The two darkest values on the page are both inside the opening, which is what
     a hole is. The step that does the work is sill against cheek â€” 4.38Ã— â€” meeting
     at the two bottom corners. Â§5 forbids an exterior shadow, so that corner IS
     the depth cue and nothing else is needed. The backplate is also cooler than
     the room by construction: blue:red 14/6 = 2.33 against the room's 21/11 = 1.91. */
  --bp-back: #06090e;
  --bp-cheek-c: #080c12;
  --bp-head-c: #121820;
  --bp-sill-c: #1a2028;
}

.birth-preserve .pickle-jar .pickle-jar__label {
  /* â”€â”€ THE STOCK. Â§7's label cream, both ends, used as a three-step so a 200Ã—294
     cream rectangle does not read as a swatch. EVERY RATIO IN THIS FILE IS QUOTED
     AGAINST #dfcfad, the darkest cream anywhere on the film â€” the worst case, not
     the average. */
  --bp-cream-hi: #eadcbd;    /* the shoulder end, taking more of the room's light */
  --bp-cream:    #e4d5b5;
  --bp-cream-lo: #dfcfad;    /* the foot end, and the ground the perimeter darkens */

  /* â”€â”€ THE INK. Â§7's #251b12â€“#332619 used as a hierarchy rather than one colour,
     because Â§8 asks for five ranks and a single ink flattens them.
       #251b12  10.98:1   the crowned name, the margin rule, the focus ring
       #332619   9.54:1   the product name; the rules take it at alpha
       #4a3a26   7.10:1   institutional line and the closing line
     Floor 7.10 against a 4.5 gate. The calibration for this pipeline is the
     repo's own two figures: it returns 4.409 where _m2-box.css:24 says 4.41 for
     #6a5c45 on #dcd4c2, and 6.091 where styles.css:4013 says 6.09. */
  --bp-ink: #251b12;
  --bp-ink-2: #332619;
  --bp-meta: #4a3a26;
  --bp-label-gold: #6b4c14;  /* 5.12:1 â€” the âœ¦ only, and never in the perimeter */

  /* â”€â”€ THE SIX PIGMENTS: THE SHIPPED SIX, DEEPENED ONE STEP.
     â˜…â˜… THIS IS NOT A PALETTE CHANGE MADE FOR TASTE. It is what makes Â§10's own
     interaction legal. Measured on #dfcfad, with Â§10's material tint behind the
     word and Â§9's spot varnish over it, the WORST of the six computes:
         shipped set  + tint .10 + varnish .06  =  3.96 : 1   FAILS
         deepened set + tint .10 + varnish .06  =  4.77 : 1   passes
         deepened set + tint .12 + varnish .06  =  4.62 : 1   the ceiling
     The shipped set clears 4.5 bare (5.12â€“7.18) and fails the moment Â§10's own
     two layers land on it. Deepening continues BR-S358's recorded direction in
     its own words â€” "Every one goes DARKER, so the whole set gains contrast
     rather than spending it" (styles.css:4010-4015) â€” same six materials, same
     six identities, and worst pairwise Î”E76 rises to 16.3 against the shipped
     set's 9.4, so the six are measurably MORE distinguishable, not less.
       gold leaf 6.23 Â· cinnabar 6.61 Â· iron gall 8.53 Â· stone 6.38 Â·
       verdigris 6.47 Â· ash 6.41   (bare, on #dfcfad) */
  --mk-sun: #5c400f; --mk-animal: #67331c; --mk-path: #28313f;
  --mk-rune: #35492c; --mk-trigram: #20494a; --mk-hex: #4a423b;
  /* Â§10's "ink darkens one step" â€” each pigment mixed 28% toward --bp-ink, so the
     step is the same material under more ink rather than a second colour arriving.
     Darker on a light ground can only raise the ratio; the set runs 8.21â€“10.17:1. */
  --mk-sun-a: #452f0c; --mk-animal-a: #4d2617; --mk-path-a: #1e242c;
  --mk-rune-a: #283724; --mk-trigram-a: #17373a; --mk-hex-a: #38312c;

  /* the deck tokens `.m2bface` reads (styles.css:3905, :3913, :3959), re-pointed
     at the film so the ink inside resolves against the STICKER's palette on both
     decks without touching one shipped rule */
  --bf-ink: var(--bp-ink);
  --bf-meta: var(--bp-meta);
  --bf-rule: rgba(37, 27, 18, .30);
}


/* â•â•â• 3 Â· Â§9 LAYER 1 Â· THE NICHE â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Rectangular with nearly square corners (Â§5). 3px, not 0: a perfectly square
   corner reads as a crop mark rather than as cut stone.
   NO box-shadow. Not a small one. None (Â§5: "Exterior shadow: none"). Depth is
   carried entirely by the value order declared at Â§2. */
.birth-preserve__niche {
  position: relative;
  isolation: isolate;
  width: var(--bp-niche-w);
  height: var(--bp-seat);
  margin: 0;
  border-radius: 3px;
  overflow: clip;             /* same crop as hidden, not a scroll container â€”
                                 the house rule at _m2-box.css:110 */
  background:
    radial-gradient(120% 46% at 50% 0%, #0a0f16 0%, rgba(10,15,22,0) 72%),
    linear-gradient(180deg, #080c12 0%, var(--bp-back) 38%, #050810 100%);
  box-shadow: none;
}

/* THE THREE RETURNS, as one element and four background slices, so the value
   order lives in one place and cannot get out of order across four rules â€” the
   idiom _m2-box.css:135-146 uses for its aperture hairline.
   The returns are foreshortened by an eye-line slightly above the niche's centre:
   sill .62 Â· head .30 Â· cheek .22 of the apparent depth. Those three fractions
   ARE the viewer's position; change one and the viewer moves. Â§5's apparent depth
   is 18â€“24px and 21px is the middle. Kept in px, not as a fraction of the card:
   a recess that gets deeper on a big screen is a bigger recess, not the same one
   further away. */
.birth-preserve__niche::before {
  content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none;
  --d: 21px;
  background:
    linear-gradient(180deg, var(--bp-head-c) 0%, rgba(18,24,32,.55) 62%, rgba(18,24,32,0) 100%)
      top left / 100% calc(var(--d) * .30) no-repeat,
    linear-gradient(90deg, var(--bp-cheek-c) 0%, rgba(8,12,18,.40) 70%, rgba(8,12,18,0) 100%)
      top left / calc(var(--d) * .22) 100% no-repeat,
    linear-gradient(270deg, var(--bp-cheek-c) 0%, rgba(8,12,18,.40) 70%, rgba(8,12,18,0) 100%)
      top right / calc(var(--d) * .22) 100% no-repeat,
    linear-gradient(0deg, var(--bp-sill-c) 0%, #141a22 58%, rgba(20,32,40,0) 100%)
      bottom left / 100% calc(var(--d) * .62) no-repeat;
}

/* ONE THIN ANTIQUE-GOLD INTERIOR SEAM (Â§5, singular there and singular here).
   Brightest along the sill, because that is the face the light reaches. The .34
   peak is a restraint number: composited over the backplate it computes to
   #3d3524, 1.62:1 â€” a seam you can see and not a stripe you look at. `.menu__draw`
   already spends two warm accents on this panel; this is frame metal, not a third
   accent (the argument _m2-box.css:132-134 lands on). */
.birth-preserve__seam {
  position: absolute; z-index: 2; pointer-events: none;
  top: 6px; right: 5px; bottom: 13px; left: 5px;
  background:
    linear-gradient(90deg, rgba(168,140,80,0) 6%, rgba(168,140,80,.16) 30%,
      rgba(193,166,105,.24) 50%, rgba(168,140,80,.16) 70%, rgba(168,140,80,0) 94%)
      top left / 100% 1px no-repeat,
    linear-gradient(180deg, rgba(168,140,80,0) 4%, rgba(168,140,80,.13) 40%,
      rgba(168,140,80,.20) 88%, rgba(168,140,80,0) 100%) top left / 1px 100% no-repeat,
    linear-gradient(180deg, rgba(168,140,80,0) 4%, rgba(168,140,80,.10) 40%,
      rgba(168,140,80,.16) 88%, rgba(168,140,80,0) 100%) top right / 1px 100% no-repeat,
    linear-gradient(90deg, rgba(168,140,80,0) 4%, rgba(168,140,80,.22) 26%,
      rgba(193,166,105,.34) 50%, rgba(168,140,80,.22) 74%, rgba(168,140,80,0) 96%)
      bottom left / 100% 1px no-repeat;
}

/* â”€â”€ THE SILL, AND THE ONE DECISION ARITHMETIC CANNOT MAKE (B7 / Â§g).
   Â§5 asks for an 18â€“24px recess with no exterior shadow. PART 0 of
   docs/SURFACE_BRIEF_V1.md:39-43 records why that failed once already: "A thing
   that has sunk in is no longer being handed to youâ€¦ Weight, not burial."
   DEFAULT IS PROUD. The jar's front face sits AT the wall plane, standing on a
   sill whose lit lip runs in FRONT of the foot, and it casts a contact shadow
   onto that sill. `.birth-preserve.is-recessed` is the other reading, built at
   Â§12 â€” one switch, side by side, answered by looking. */
.birth-preserve__sill {
  position: absolute; z-index: 2; pointer-events: none;
  left: 0; right: 0; bottom: 0;
  height: calc(var(--bp-niche-b) + var(--bp-jar-h) * .05);
  background:
    /* the lit lip, in front of the foot â€” this is what "proud" means */
    linear-gradient(90deg, rgba(38,52,64,0) 8%, rgba(38,52,64,.55) 30%,
      rgba(52,68,82,.72) 50%, rgba(38,52,64,.55) 70%, rgba(38,52,64,0) 92%)
      bottom left / 100% 1px no-repeat;
}
/* the contact shadow â€” TIGHT and DARK, never soft and wide. Â§5: "the jar receives
   no theatrical exterior glow", and a wide soft shadow under a seated object is
   that glow in negative. It sits BEHIND the jar so its top edge runs under the
   foot and is covered: an overlap that is hidden is what contact looks like. */
.birth-preserve__contact {
  position: absolute; z-index: 2; pointer-events: none;
  left: 50%; bottom: calc(var(--bp-niche-b) - 3px);
  width: calc(var(--bp-jar-w) * 1.04); height: calc(var(--bp-jar-h) * .05);
  transform: translateX(-50%);
  border-radius: 50%;
  background: radial-gradient(50% 50% at 50% 34%, rgba(0,0,0,.86) 0%,
    rgba(0,0,0,.52) 44%, rgba(0,0,0,0) 82%);
}
/* THE CAUSTIC â€” the one warm thing outside the jar, and it is warm because it is
   light that came THROUGH the brine. Â§10 allows it 2â€“4px of displacement; the 3px
   clamp is applied HERE, at the site where the spec's number lives, so the module
   supplies a normalised value and physically cannot exceed it. */
.birth-preserve__caustic {
  position: absolute; z-index: 2; pointer-events: none;
  left: 50%; bottom: calc(var(--bp-niche-b) * .18);
  width: calc(var(--bp-jar-w) * .44); height: calc(var(--bp-niche-b) * .8);
  border-radius: 50%;
  transform: translateX(-50%) translateX(calc(clamp(-1, var(--bp-px), 1) * 3px));
  transition: transform 200ms var(--ease-settle, cubic-bezier(.2,.7,.2,1));
  background: radial-gradient(50% 50% at 50% 50%, rgba(143,129,80,.20) 0%,
    rgba(143,129,80,.09) 46%, rgba(143,129,80,0) 80%);
}


/* â•â•â• 4 Â· THE JAR, AND WHY THERE IS NO clipPath â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Â§12 asks for gradients, masks and pseudo-elements, and reserves its one inline
   SVG for "irregular cucumber/dill silhouettes". An earlier layer built the whole
   vessel as a shared `clip-path: url(#pjVessel)` in objectBoundingBox units. That
   was rejected here for two reasons and neither is taste: the id is document-
   global (a second mount silently redefines it), and objectBoundingBox units are
   non-uniform, so every clipped layer must keep the SAME box or the shoulder
   taper reappears in the middle of the liquid.
   Instead the silhouette is THREE stacked boxes, and the only one that carries
   liquid â€” the body â€” is a plain rounded rect. Nothing has to agree about an edge
   because nothing shares one.
     neck      0    â†’ 13%   narrow, 46% of the body's width
     shoulder  13%  â†’ 20%   one clip-path polygon, the taper
     body      20%  â†’ 100%  straight-sided, rounded at the foot
   Â§5's "centre viewing surface: subtly flattened" is the body's own edge-density
   gradient below, not a shape: a straight-sided jar seen face-on IS flat in the
   middle, with curvature only at the extremes. */
.pickle-jar {
  position: absolute; z-index: 3;
  left: 50%; bottom: var(--bp-niche-b);
  width: var(--bp-jar-w); height: var(--bp-jar-h);
  transform: translateX(-50%);
  isolation: isolate;         /* Â§9's layer numbers below are LOCAL to this box */
  pointer-events: none;       /* Â§10; the label re-grants it at Â§5 */
}

/* â”€â”€ Â§9 LAYER 2 Â· JAR REAR GLASS. What you see through the jar where there is no
   liquid: the niche's back wall, one step lifted because glass reflects a little
   of the head return, cooled to Â§7's deep-glass band #0d1a20â€“#14262a. */
.pj__neck, .pj__shoulder, .pj__body {
  position: absolute; left: 0; right: 0; z-index: 1;
  background:
    linear-gradient(90deg, #14262a 0%, rgba(20,38,42,.62) 6%, rgba(20,38,42,.10) 13%,
      rgba(20,38,42,0) 26%, rgba(20,38,42,0) 74%, rgba(20,38,42,.10) 87%,
      rgba(20,38,42,.62) 94%, #14262a 100%),
    linear-gradient(180deg, #0e1a21 0%, #0d1a20 22%, #0a1319 100%);
}
.pj__neck {
  top: 0; height: 13%;
  left: 27%; right: 27%;          /* 46% of the body â€” a preserving jar's neck */
  border-radius: 1px 1px 0 0;
}
.pj__shoulder {
  top: 13%; height: 7%;
  /* the taper, as one polygon. 27% in at the top, flush at the bottom; the two
     mid-points at 84%/16% are what bend it into an S rather than a cone â€” a cone
     reads as a bottle, and Â§1 rejects the capsule for the same family of reason. */
  clip-path: polygon(27% 0%, 73% 0%, 84% 38%, 100% 100%, 0% 100%, 16% 38%);
}
.pj__body {
  top: 20%; bottom: 0;
  border-radius: 1.5% 1.5% 6% 6% / 1% 1% 4% 4%;
  overflow: clip;                 /* everything liquid is clipped by the body    */
}

/* â”€â”€ Â§9 LAYER 3 Â· REAR CUCUMBER AND BOTANICAL SILHOUETTES.
   â˜… THE ONE RECOGNISABLE PICKLE, AND IT PASSES BEHIND THE LABEL ON PURPOSE.
   Occlusion is the only PROOF a thing is in front of another thing â€” everything
   else is evidence, which is the reasoning _m2-box.css:191-198 reached for its
   lapped frame. Here it costs nothing: the cucumber spans 8â†’29% of the body's
   width and the label's edge is at 21%, so its right third disappears under the
   sticker. A vegetable CUT by the label's edge cannot be inside the jar with it,
   and Â§15's adhesion gate is answered in the still state for free.
   SIZE FROM THE JAR'S HEIGHT, POSITION FROM THE BODY'S BOX: the jar's width is
   capped against the track above 1900px, so its aspect is not constant and a
   purely percentage-sized child would deform. `aspect-ratio` holds the drawing.
   THE BLUR IS ONE STATIC RASTER, never animated: a vector edge stays crisp behind
   a translucent wash and reads as a decal, and .0013H of blur is the cheapest
   "seen through liquid" cue there is. Delete the one `filter` line if the
   performance gate ever objects â€” the drawing survives it. */
.pj-veg {
  position: absolute; z-index: 2;
  left: 8%; top: 12%;
  width: min(calc(var(--bp-jar-h) * .152), 24%);
  aspect-ratio: 72 / 212;
  height: auto;
  filter: blur(calc(var(--bp-jar-h) * .0013));
  background: radial-gradient(ellipse 44% 4.5% at 52% 99%,
    rgba(0,0,0,.42) 0%, rgba(0,0,0,.16) 46%, rgba(0,0,0,0) 74%);
}

/* â”€â”€ Â§9 LAYER 4 Â· THE BRINE BODY AND ITS EDGE DENSITY.
   Â§6 gives four values and Â§7 gives their hexes; there is no fifth green in this
   file. The darkening below the tea-green is BLACK, because depth is absorption
   and absorption has no hue of its own â€” more #26301f would LIGHTEN the floor,
   since #26301f is lighter than the room base.

   â˜…â˜… THE EDGE DENSITY IS A RIM, NOT A FIELD, AND THIS IS THE SPEC FIGHTING
   ITSELF. Â§6 wants "edge density deep bottle green"; Â§6 also wants a recognisable
   cucumber behind the LEFT exposed band; Â§3 forbids bright grocery green. With a
   broad bottle-green field the veil over the cucumber reaches 51% alpha, and
   solving for a cucumber that still clears 2.1:1 through it gives #657a5c â€” a
   bright leaf green, the exact thing Â§3 names first. So "edge density" is read as
   density AT the edge: 10% of the body width each side, clear by 11%. If that rim
   is ever widened past ~14%, re-measure the cucumber before touching its colour â€”
   the rim is what will have moved, not the vegetable.

   â˜… "NO MILKINESS" MADE TESTABLE (Â§6 forbids it and gives no test): NO BRINE
   LAYER MAY CARRY A PALE ACHROMATIC STOP. Every chromatic stop below is â‰¥30%
   saturation; the only achromatic stop is black, at the floor, which is the
   opposite of milk. Check the rule by reading the six rgba() heads.

   â˜… THE CHAMPAGNE CORE IS HIGH, NOT CENTRED. Â§6 says "centre translucent
   champagne", which read literally puts the brightest paint dead-centre â€” behind
   an opaque label, where nothing can see it, with its falloff landing exactly on
   the label's perimeter where the adhesive darkening has to read. Light enters a
   jar through its SURFACE, so the core sits just under the meniscus: the paint is
   spent where it shows, the meniscus gains a bright field and becomes unmistakable
   without being drawn brighter, and the label's flanks meet calm mid-field olive.

   â˜… AUTHORED FOR THE LABEL-REMOVED STATE TOO. Â§15's silhouette gate hides the
   label, so the liquid is complete across the whole body and the label is simply
   something in front of part of it. Nothing is cut out behind it. */
.pj__brine {
  position: absolute; z-index: 3; inset: 0;
  --fill: calc(var(--bp-menisc) - var(--bp-body-top));
  -webkit-mask-image: linear-gradient(180deg, transparent 0, transparent var(--fill),
    #000 calc(var(--fill) + .5px), #000 100%);
  mask-image: linear-gradient(180deg, transparent 0, transparent var(--fill),
    #000 calc(var(--fill) + .5px), #000 100%);
  /* the .5px feather is not softness: it stops the level crawling a pixel as the
     viewport resizes and the fill length lands on a half-pixel */
  background:
    /* 1 Â· edge density, the two glass walls, deep bottle green */
    linear-gradient(90deg,
      rgba(38,48,31,.74) 0%, rgba(38,48,31,.46) 3%, rgba(38,48,31,.22) 6.5%,
      rgba(38,48,31,0) 11%, rgba(38,48,31,0) 89%, rgba(38,48,31,.22) 93.5%,
      rgba(38,48,31,.46) 97%, rgba(38,48,31,.74) 100%),
    /* 2 Â· the champagne core, high â€” see the note above */
    radial-gradient(52% 26% at 50% 9%,
      rgba(180,154,97,.30) 0%, rgba(180,154,97,.11) 48%, rgba(180,154,97,0) 80%),
    /* 3 Â· the weak broad centre, a tenth as strong, so "centre champagne" still
       holds in the side bands at mid-height. A presence, not a light. */
    radial-gradient(74% 44% at 50% 46%,
      rgba(180,154,97,.10) 0%, rgba(180,154,97,.03) 54%, rgba(180,154,97,0) 84%),
    /* 4 Â· the mid-field, muted olive-gold. Peaks at .21; every contrast figure for
       the cucumber is computed at the .205 that lands across its band, so moving
       this moves the vegetable ladder with it. */
    linear-gradient(180deg,
      rgba(143,129,80,.14) 0%, rgba(143,129,80,.20) 22%, rgba(143,129,80,.21) 55%,
      rgba(143,129,80,.17) 76%, rgba(143,129,80,.10) 100%),
    /* 5 Â· the low accumulation, dark tea-green. Starts at 46% â€” the top half has
       nothing to accumulate through. */
    linear-gradient(180deg,
      rgba(57,64,42,0) 46%, rgba(57,64,42,.20) 72%,
      rgba(57,64,42,.28) 88%, rgba(57,64,42,.34) 100%),
    /* 6 Â· depth. Absorption, not a colour. Bottom of the stack so the tea-green
       cast paints ON the darkened result and survives it. */
    linear-gradient(180deg,
      rgba(0,0,0,0) 40%, rgba(0,0,0,.18) 66%,
      rgba(0,0,0,.34) 84%, rgba(0,0,0,.60) 100%);
}

/* â”€â”€ Â§9 LAYER 5 Â· FRONT CONTENTS AND THE MINERAL FOOT.
   â˜… THE DILL SITS AT LAYER 5, NOT LAYER 3, AND THAT IS A DELIBERATE DEVIATION.
   Â§9 groups it with the rear silhouettes. Measured there, behind the .50 edge
   density plus the olive, a 0.9px stroke composites to 1.24:1 and is simply not
   present; in front of the brine it reaches 1.45:1 â€” a whisper you find on the
   second look, which is what Â§14's fifth risk asks for. Â§9's own layer 5 is
   "front contents", and a frond pressed to the front pane is the ordinary way
   dill sits in a packed jar, so the deviation is toward the physics. */
.pj-dill {
  position: absolute; z-index: 4;
  right: 3%; top: 26%;
  width: min(calc(var(--bp-jar-h) * .098), 16%);
  aspect-ratio: 38 / 127;
  height: auto;
  opacity: .92;      /* no blur: 0.9px strokes do not survive it. Distance is alpha. */
}

/* Â§6: two or three mustard seeds. ONE element, three background layers â€” three
   spans would be three nodes and three paints for ~20pxÂ² of speck. Sizes and
   positions declared here so the file renders its own composition without a
   mounter, the fault _m2-pod.css:317-323 had to be fixed for. Measured 1.76:1
   against the lower brine, deliberately below the cucumber's body figure. */
.pj-seeds {
  position: absolute; z-index: 4; inset: 0;
  --s1: calc(var(--bp-jar-h) * .0056);
  --s2: calc(var(--bp-jar-h) * .0044);
  --s3: calc(var(--bp-jar-h) * .0037);
  background:
    radial-gradient(circle at 38% 32%, rgba(143,129,80,.42) 0%, rgba(143,129,80,.30) 52%,
      rgba(38,48,31,.40) 88%, rgba(38,48,31,0) 100%),
    radial-gradient(circle at 40% 34%, rgba(143,129,80,.38) 0%, rgba(143,129,80,.26) 52%,
      rgba(38,48,31,.38) 88%, rgba(38,48,31,0) 100%),
    radial-gradient(circle at 38% 30%, rgba(143,129,80,.34) 0%, rgba(143,129,80,.22) 52%,
      rgba(38,48,31,.34) 88%, rgba(38,48,31,0) 100%);
  background-size: var(--s1) var(--s1), var(--s2) var(--s2), var(--s3) var(--s3);
  background-position: 30% 62%, 58% 91%, 72% 74%;
  background-repeat: no-repeat;
}

/* Â§6: a few pale salt crystals settled in the foot. Five crystals plus one very
   faint deposit band â€” the band matters, because five isolated dots are five dots
   and five dots ON a whisper of deposit are a settled mineral. .06 alpha over the
   darkest region of the jar, and warm rather than grey, so the no-milkiness rule
   holds. Measured 1.94:1 against the floor composite; high as a ratio and
   negligible as a presence, since each is 1.5â€“2.5px. */
.pj-bed {
  position: absolute; z-index: 4; inset: 0;
  --a: calc(var(--bp-jar-h) * .0046);
  --b: calc(var(--bp-jar-h) * .0033);
  background:
    radial-gradient(circle at 46% 42%, rgba(223,207,173,.26) 0%, rgba(223,207,173,.10) 58%, rgba(223,207,173,0) 100%),
    radial-gradient(circle at 46% 42%, rgba(223,207,173,.24) 0%, rgba(223,207,173,.09) 58%, rgba(223,207,173,0) 100%),
    radial-gradient(circle at 46% 42%, rgba(223,207,173,.26) 0%, rgba(223,207,173,.10) 58%, rgba(223,207,173,0) 100%),
    radial-gradient(circle at 46% 42%, rgba(223,207,173,.22) 0%, rgba(223,207,173,.08) 58%, rgba(223,207,173,0) 100%),
    radial-gradient(circle at 46% 42%, rgba(223,207,173,.24) 0%, rgba(223,207,173,.09) 58%, rgba(223,207,173,0) 100%),
    linear-gradient(180deg, rgba(223,207,173,0) 0%, rgba(223,207,173,.045) 62%, rgba(223,207,173,.06) 100%);
  background-size: var(--a) var(--a), var(--b) var(--b), var(--a) var(--a),
                   var(--b) var(--b), var(--b) var(--b), 100% calc(var(--bp-jar-h) * .035);
  background-position: 12% 96%, 27% 98.4%, 44% 94.6%, 63% 98.2%, 84% 96.4%, left bottom;
  background-repeat: no-repeat;
}

/* THE ONE BUBBLE. Â§6: "at most two visible bubbles at one time"; Â§10: "one small
   bubble releases from the adjacent brine for no more than 700ms" and "only one
   notch and one bubble may be active at once". ONE element, restarted â€” not a
   pool, not a spawner, and nothing is created or destroyed per activation.
   â˜… IT FIRES ON DELIBERATE ACTIVATION ONLY. PART 0 forbids anything that repeats
   (docs/SURFACE_BRIEF_V1.md:37), and _six-live.js:735-737 funnels pointerenter,
   focus AND click through one ask() â€” so a pointer sweep or an arrow traverse
   would fire six. The module binds the force path only.
   â˜… NO will-change. A transform+opacity animation is composited automatically for
   its duration; Â§12's "use will-change only while pointer interaction is active"
   is satisfied by using none at all.
   â˜… 640ms UNDER A 700ms CAP: a value sitting on its limit leaves no room for the
   easing's tail, and 640 is the house's own settled interval.
   â˜… IT STOPS SHORT OF THE SURFACE, already fading. Crossing the meniscus would
   puncture the level surface â€” and Â§2 lists the level surface as an absolute
   truth while listing the bubble as an optional response. */
.pj-bubble {
  position: absolute; z-index: 4;
  --sz: calc(var(--bp-jar-h) * .0085);
  --y0: calc(var(--bp-label-h) * (.18 + (var(--i, 3) - 1) * .12));
  left: 88%;                 /* the RIGHT band: the left band is the cucumber's,
                                and a bubble crossing it would read as a bubble in
                                front of the pickle rather than in the brine */
  top: calc(var(--bp-label-top) - var(--bp-body-top) + var(--y0));
  width: var(--sz); height: var(--sz);
  margin-left: calc(var(--sz) / -2);
  border-radius: 50%;
  opacity: 0;
  background: radial-gradient(circle at 36% 30%,
    rgba(234,220,189,.78) 0%, rgba(180,154,97,.24) 40%,
    rgba(180,154,97,.06) 70%, rgba(180,154,97,0) 72%);
  box-shadow: inset 0 0 0 .5px rgba(234,220,189,.30);
}
.pj-bubble.is-rising { animation: bp-bubble 640ms cubic-bezier(.30,.62,.50,1) both; }
@keyframes bp-bubble {
  /* the easing is the physics: a bubble breaks away readily, then reaches terminal
     velocity in a viscous brine and travels almost linearly. One lateral wobble out
     and back, inside the same transform, so this is one animated property not two. */
  0%   { transform: translate3d(0,0,0) scale(.72); opacity: 0; }
  14%  { opacity: .82; }
  50%  { transform: translate3d(calc(var(--bp-jar-h) * .0055),
                                calc((var(--y0) + var(--bp-label-top) - var(--bp-menisc)) * -.52), 0) scale(1); }
  82%  { opacity: .62; }
  100% { transform: translate3d(0,
                                calc((var(--y0) + var(--bp-label-top) - var(--bp-menisc)) * -1), 0) scale(1.06);
         opacity: 0; }
}

/* â”€â”€ Â§9 LAYER 6 Â· INNER REFRACTION AND THE MENISCUS.
   Everything here is INSIDE the glass, so the sticker at layer 7 interrupts it â€”
   physically exact and free. The manufacturing seam in particular runs the full
   height of a real jar and is simply hidden behind the label for its middle third;
   that interruption is one of the cheapest adhesion cues on the object, and it
   comes from the layer order rather than from a mask. */
.pj__refract {
  position: absolute; z-index: 5; inset: 0;
  background:
    /* the two inner wall lines: light bending at the inside face of the glass */
    linear-gradient(180deg, rgba(120,160,172,0) 4%, rgba(120,160,172,.16) 18%,
      rgba(120,160,172,.10) 82%, rgba(120,160,172,0) 96%) left 3.4% top 0 / 1.5px 100% no-repeat,
    linear-gradient(180deg, rgba(120,160,172,0) 4%, rgba(120,160,172,.10) 18%,
      rgba(120,160,172,.07) 82%, rgba(120,160,172,0) 96%) right 3.4% top 0 / 1.5px 100% no-repeat,
    /* ONE faint vertical manufacturing seam (Â§6). Right of centre, so it is a fault
       in the mould rather than an axis of symmetry â€” a seam on the centre line reads
       as a fold. */
    linear-gradient(180deg, rgba(150,180,190,0) 2%, rgba(150,180,190,.07) 16%,
      rgba(150,180,190,.05) 88%, rgba(150,180,190,0) 100%) left 63% top 0 / 1px 100% no-repeat,
    /* THE HEAVY FOOT: a dense band with one bright line where the base's thick glass
       turns the light. Â§6's "thick rim and foot" is a value, not an outline â€” there
       is no stroke anywhere in this file (Â§6: no universal white outline). */
    linear-gradient(180deg, rgba(180,205,212,0) 0%, rgba(180,205,212,.13) 8%,
      rgba(13,26,32,.30) 22%, rgba(6,14,18,.72) 100%)
      left 0 bottom 0 / 100% calc(var(--bp-jar-h) * .09) no-repeat;
}

/* â˜…â˜… THE MENISCUS: THE LINE IS NOT WHAT MAKES IT READ â€” THE VALUE STEP IS.
   A bright hairline on a uniformly tinted body is a hairline drawn on a body. What
   says liquid is that ABOVE the line the jar is cool, dark and empty and BELOW it
   it is warm, dense and full; the line is merely the seam of that step. So this
   element paints the AIR as well as the surface, and the brine above stops dead at
   the fill line rather than fading into it. The test: delete the ::after hairline
   and the jar still reads as filled; delete the air band and it does not â€” which
   is why the air band is 4Ã— the height of the line.
   â˜… THE CAPILLARY CLIMB IS THE CHEAPEST TRUTH IN THE FILE. Aqueous brine wets
   glass, so the surface is CONCAVE and rises at both walls. Two small upturns, one
   pseudo-element, and the line stops being a rule drawn across a jar and becomes a
   surface seen edge-on. */
.pj__meniscus {
  position: absolute; z-index: 5; left: 0; right: 0;
  --air: calc(var(--bp-jar-h) * .052);
  --surf: calc(var(--bp-jar-h) * .012);
  top: calc(var(--bp-menisc) - var(--bp-body-top) - var(--air));
  height: calc(var(--air) + var(--surf));
  background:
    linear-gradient(180deg, rgba(38,48,31,0) 0%, rgba(38,48,31,0) 77%,
      rgba(38,48,31,.34) 82%, rgba(38,48,31,0) 100%),
    linear-gradient(180deg, rgba(13,26,32,0) 0%, rgba(13,26,32,.26) 54%,
      rgba(13,26,32,.44) 78%, rgba(13,26,32,0) 81%);
}
.pj__meniscus::after {
  content: ""; position: absolute; left: 0; right: 0;
  top: var(--air); height: max(1px, calc(var(--bp-jar-h) * .0022));
  background: linear-gradient(90deg,
    rgba(234,220,189,0) 0%, rgba(234,220,189,.30) 7%, rgba(234,220,189,.62) 26%,
    rgba(234,220,189,.70) 50%, rgba(234,220,189,.62) 74%, rgba(234,220,189,.30) 93%,
    rgba(234,220,189,0) 100%);
}
.pj__meniscus::before {
  content: ""; position: absolute; left: 0; right: 0;
  top: calc(var(--air) - var(--bp-jar-h) * .009);
  height: calc(var(--bp-jar-h) * .011);
  background:
    radial-gradient(ellipse 62% 100% at 0%   100%, rgba(234,220,189,.34) 0%, rgba(234,220,189,0) 74%),
    radial-gradient(ellipse 62% 100% at 100% 100%, rgba(234,220,189,.34) 0%, rgba(234,220,189,0) 74%);
  background-size: calc(var(--bp-jar-h) * .026) 100%, calc(var(--bp-jar-h) * .026) 100%;
  background-position: left bottom, right bottom;
  background-repeat: no-repeat;
}


/* â•â•â• 5 Â· Â§9 LAYER 7 Â· THE STICKER FILM â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   The EXISTING `[data-m2-hero]` node, moved here and given one class. Not copied,
   not re-rendered, not wrapped in a second box â€” the mounter does what
   _m2-box.js:104 already does. `_six-live.js:707` finds the marks with a
   document-level `querySelector`, with no assumption about ancestry, so moving the
   card changes nothing it depends on: the <li> keep their tabindex, role, their
   three listeners (:730-747) and the ul's keydown handler (:773). That is the
   whole reconciliation the brief asked for â€” the six become "actual accessible
   controls" because they ALREADY ARE (_six-live.js:732-733), and this exhibit's
   contribution is to stop covering them and to answer them on the lid. */
.birth-preserve .pickle-jar .pickle-jar__label {
  position: absolute; z-index: 6;
  left: 50%;
  top: var(--bp-label-top);
  width: var(--bp-label-w);
  height: var(--bp-label-h);
  margin: 0;
  aspect-ratio: auto;         /* â˜… revokes styles.css:3716's height/aspect/width
                                 triple; leaving any one of them makes the label
                                 the card's shape again */
  border-radius: 2.5%;        /* Â§5: 2â€“3% of label width */
  overflow: hidden;           /* the film has a CUT EDGE */
  isolation: isolate;         /* Â§9: nothing from the glass layers may blend into
                                 the film, or the label floats inside the jar */
  pointer-events: auto;       /* the marks are the only hit targets; styles.css:3892
                                 hands it down from `.m2bface > *` */

  /* â˜…â˜… THE LABEL DOES NOT TILT, AND app.js IS NOT EDITED.
     Â§2: "the card/label remains perfectly stationary under pointer movement".
     Â§14's fourth risk: any label tilt destroys the adhesion. The shipped loop
     targets `.m2hero` by class (app.js:7327) and writes --tilt-x/--tilt-y as
     INLINE custom properties (app.js:7276-7277), which beat any stylesheet value â€”
     so pinning the variables cannot work. The TRANSFORM is a stylesheet rule at
     (0,1,0) (styles.css:3849) and can be beaten, and it is, at (0,3,0), by the
     `translateX` below.
     An earlier layer used `transform: perspective(1200px)` instead, to preserve
     the stacking context and the absolute containing block. Neither is at risk
     here: `.m2hero` is `position: relative` already (styles.css:3702), so the
     containing block never depended on the transform, and this rule gives it an
     explicit `z-index`, which with `position: relative` creates the stacking
     context on its own. `translateX(-50%)` is therefore the only transform on the
     element and it is static. The loop keeps running and writing; nothing reads it. */
  transform: translateX(-50%);
  transition: none;

  /* â”€â”€ THE FILM SURFACE. Three static images; no animation, no filter, nothing
     that repaints (Â§15's performance gate).
     1 Â· THE ONE TRAPPED-AIR IMPERFECTION (Â§6: "at most" one). A 2.2px lens,
         off-axis, low, where a squeegee would have left it. It is a BACKGROUND
         layer and not a ::after on purpose: air trapped under the adhesive sits
         BELOW the ink, and background layers paint below children.
     2 Â· THE FIBRE. Â§6: "slight fibre or tooth, visible only at close range". One
         inline turbulence, one octave, 3.5%, rasterised once. REJECTED: a pair of
         repeating-linear-gradients at 3px/7px pitch, which is the cheaper trick â€”
         it beats at fractional zoom and, worse, reads as STRIPES, which is
         distressing rather than tooth (Â§3 names "heavy rust, grime or torn edges").
         Mineral tooth is isotropic; stripes are not.
     3 Â· THE CREAM. 172deg rather than 180, so the light arrives from the same side
         as the room's (Â§4) instead of straight down, which reads as a scan. */
  background-image:
    radial-gradient(1.1px 1.1px at 27% 71%, rgba(255,255,255,.30) 0 55%, rgba(37,27,18,.10) 62%, transparent 100%),
    url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='bpf'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.92' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23bpf)' opacity='.035'/%3E%3C/svg%3E"),
    linear-gradient(172deg, var(--bp-cream-hi) 0%, var(--bp-cream) 46%, var(--bp-cream-lo) 100%);
  background-blend-mode: normal, multiply, normal;
  background-color: var(--bp-cream);   /* Â§2: the label is OPAQUE. If the turbulence
                                          data-URI ever fails to parse the plane must
                                          still be cream, not brine. */

  /* â˜… NO BOX-SHADOW. NOT ONE. Â§6: "No conventional card drop shadow"; Â§14's fourth
     risk: "any label tilt, float, displaced shadow â€¦ destroys the sticker illusion."
     A sticker adhered to glass has no gap to cast into. The temptation is a 1px
     contact shadow "to give it thickness" â€” it was tried and it is exactly what
     makes it hover. Adhesion is sold instead by the perimeter darkening below, the
     cut-edge hairline, the cucumber's occluded third, and Â§9 layer 10 keeping every
     reflection off it. */
  box-shadow: none;
  border: 0;
  filter: none;               /* cancels the shipped pair-hover brightness (styles.css:3534) */
}

/* THE PERIMETER â€” adhesive, and the 5â€“7% of each side that bends (Â§5, Â§6). One
   pseudo-element, because both are the same physical fact: the film's edge is
   where it meets curved glass and where the adhesive has taken up the most light.
   â˜… THE DARKENING IS CAPPED AND THE CAP IS DERIVED. Left free it eats the two
   metadata rows that sit in it. #4a3a26 measures 7.10:1 on the clean cream and
   6.29:1 on #d4c39f; #d4c39f is the darkest the ring is allowed to reach, and the
   alphas below are set so the composite never passes it. If this ring is ever
   deepened, re-measure the institutional row and the closing line FIRST â€” they are
   the only text in it, and the only thing tuning it can break.
   â˜… THE CENTRE IS FLAT (Â§2: "optically calm and fully readable"). A hard
   transparent plateau from 7% to 93%; only the outer 6% bends, inside Â§5's 5â€“7%.
   Shading, never a transform: no perspective, no skew, no curved baseline (Â§8). */
.birth-preserve .pickle-jar .pickle-jar__label::before {
  content: ""; position: absolute; inset: 0; z-index: 1;
  border-radius: inherit; pointer-events: none;
  background:
    linear-gradient(90deg,
      rgba(58,44,26,.17) 0%, rgba(58,44,26,.05) 4.2%,
      transparent 7%, transparent 93%,
      rgba(58,44,26,.05) 95.8%, rgba(58,44,26,.17) 100%),
    radial-gradient(126% 112% at 50% 42%,
      transparent 0 62%, rgba(58,44,26,.055) 84%, rgba(58,44,26,.105) 100%);
  /* the cut edge â€” a hairline, not a shadow. This is where the film STOPS, and it
     is the strongest adhesion cue available without lying about depth. */
  box-shadow: inset 0 0 0 .5px rgba(37,27,18,.16);
}


/* â•â•â• 6 Â· Â§9 LAYER 8 Â· THE STICKER INK â€” Â§8's master layout â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

   THE MAP. Six of Â§8's eight rows already exist in renderWall() and are reached
   without renaming one hook:

     Â§8 row                    hook (app.js)                          status
     â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
     BLUE ROOM PRESERVES       .bp-inst                               NEW (1 line)
     THE BIRTH READING   âœ¦     .m2face-meta / .m2face-glyph  (:2957)  EXISTING
     â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€          .m2bface__headrule            (:2973)  EXISTING
     The Crowned Name          .m2bface__name                (:2974)  EXISTING
     SUN SIGN â€¦ HEXAGRAM       .m2bface__marks li Ã—6         (:2976)  EXISTING
     â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€               .m2face-div in the bottom wall(:2980)  EXISTING
     BY BIRTH ALONE            .m2face-orient                (:2981)  EXISTING

   â˜…â˜… TWO OF Â§8's LINES ARE CUT, AND THE CUTS ARE THE BRIEF'S (B6).
   "REGISTER 01" â€” a number identical on every unit is a LOT CODE, which is the
   exact grocery tell Â§14 opens by warning about, and there is no registry behind
   it. "SEALED AT FIRST BREATH Â· NOT REVISED" â€” 36 characters against Â§8's own
   ~24-character rule; it does not fit (177px against a 180px field, on an
   unverified font metric); it duplicates "By birth alone"; and it asserts
   observation at the moment of birth, which the engine does not do
   (docs/CLAIM_AUDIT_V1.md). One cut clears three defects.
   So ONE new string enters the label: BLUE ROOM PRESERVES, which Â§8 mandates and
   which is institutional metadata, not copy.

   â˜… THE ANTI-SKU RULES, WHICH ARE THE WHOLE DIFFERENCE BETWEEN AN ARCHIVE LABEL
   AND A CONDIMENT (Â§14's primary risk): no box, no rule, no reversed panel around
   the institutional line â€” a boxed code is a barcode's grammar; no digits at all;
   and it does not out-track the product name it introduces.

   â˜… AND `.m2tick` EARNS ITS KEEP RATHER THAN BEING TOLERATED. On a card they are
   card corners; on a conservation film they read as printer's registration crops,
   which is what an archival label has. Their shipped alpha (styles.css:3819)
   measures 6.10:1 on this cream unchanged â€” tuned for parchment at BR-S326 and it
   lands here for free.

   â˜… THE INK LAYER IS THE EXISTING `.m2bface`, KEPT WHOLE. It is
   `position:absolute; inset:0` already (styles.css:3900) and `border-radius:
   inherit` (:3903), so making the film its positioned parent fits it to the label
   and rounds it to the label's corners with no edit to either rule. Keeping the
   element also keeps two behaviours that would otherwise have to be rebuilt:
   `.m2hero[data-face="tarot"] .m2bface{display:none}` (styles.css:3887), which
   _six-live.js:807 depends on by name to stand down; and the pointer-events pair
   at styles.css:3891-3892 that the marks' hit-testing rides on. */

.birth-preserve .m2bface {
  --bp-pad: 12px;  --bp-mast-mb: 3px;  --bp-rule-mt: 9px;
  --bp-marks-mt: 16px;  --bp-wall-mt: 11px;  --bp-wall-mb: 10px;
  padding: var(--bp-pad) 10px;
  color: var(--bp-ink);
  /* the shipped rule is `padding: 14px 12px` (styles.css:3902). 10px of side
     padding leaves a 180.4px text column at 1440, which is what Â§8's ~24-character
     rule is measured against: 24 mono characters at 8px/.14em = 142px. */
}

/* â”€â”€ Â§8 row 1 Â· the institutional line, alone, at metadata weight (B6). Centred
   rather than flush-left as Â§8's sketch draws it, because with REGISTER cut there
   is no right-hand item to hold the other end of the line, and a single flush-left
   run under a centred reading reads as a stray. */
.birth-preserve .bp-inst {
  margin: 0 0 var(--bp-mast-mb);
  font-family: var(--font-mono); font-weight: 500;
  font-size: 8px; letter-spacing: .14em; text-transform: uppercase;
  color: var(--bp-meta);
  /* .14em rather than Â§8's "wide" .20em, and the reason is measured: 19 characters
     at 8px/.20em is 121.6px, which is fine at 1440 and collides at 1280 where the
     field is 157px. .14em gives 112.5px and holds at every supported width. This is
     the one instruction in Â§8 the label's own width will not pay for. */
}

/* â”€â”€ Â§8 row 2 Â· the product name and the âœ¦. Both are shipped hooks with shipped
   strings; Â§8 asks for exactly these two things in this arrangement, so nothing is
   invented. The product name takes --bp-ink-2 (9.54:1) where the row above takes
   --bp-meta (7.10:1): the institution is WHO kept it, the product name is WHAT was
   kept, and one step of ink is the cheapest way to say which is which.
   BR-S362's fourth correction is preserved exactly â€” 9.5px against the marks' 10px,
   because a label larger than its subject inverts the hierarchy. */
.birth-preserve .m2bface .m2face-meta { color: var(--bp-ink-2); }
.birth-preserve .m2bface .m2face-glyph {
  color: var(--bp-label-gold);
  /* the antique-gold micro-accent in its dark form, and the ONLY gold on the film.
     5.12:1 here in the central field. It is kept OUT of the perimeter, where it
     would measure 4.54:1 â€” a pass, but not a margin. That is a placement decided
     by the arithmetic, not by Â§8's sketch. */
}
.birth-preserve .m2bface .m2bface__headrule {
  margin: var(--bp-rule-mt) 0 0;
  background: rgba(37,27,18,.30);
}
/* BR-S362's second correction preserved: the masthead rule must be LIGHTER than
   the ledge that closes the reading, or equal ink over a longer line out-weighs it
   and the order inverts. .30 over .50. Both are decorative hairlines â€” the reading
   is complete without them â€” so 1.4.11's 3:1 is not owed; measured anyway so a
   later pass has the number: .30 = 1.82:1, .50 = 2.93:1 on --bp-cream-lo. */
.birth-preserve .m2bface .m2bface__wall--bot .m2face-div {
  margin: var(--bp-wall-mt) 0 var(--bp-wall-mb);
  background: rgba(37,27,18,.50);
}

/* â”€â”€ Â§8 Â· the crowned name, the primary title.
   24px, the FLOOR of Â§8's 24â€“28px band, and that is a measured choice: at 25px
   "The Crowned Name" computes to 176px in a 180.4px field at 1440 â€” 4px of slack,
   which is not a margin for the one line that carries the object. 24px gives 169px
   and 11px of slack. It is also the one figure in this file resting on an
   unverified font metric (Cormorant's ~0.44em average advance); see the hand-off.
   `margin: auto 0 0` is the shipped card's own free-space distributor
   (styles.css:4031, paired with `.m2bface__wall--bot{margin:0 0 auto}` at :3930).
   An auto margin guarantees no MINIMUM, so `padding-top` supplies the floor while
   the auto still takes the surplus â€” two mechanisms, one per direction. */
.birth-preserve .m2bface .m2bface__name {
  margin: auto 0 0;
  padding-top: 4px;
  font-size: 24px;
  line-height: 1.05;
  color: var(--bp-ink);
  text-wrap: balance;
  hyphens: none;
}

/* â”€â”€ Â§8 Â· the closing line. `.m2face-orient` is already uppercase, already tracked
   (styles.css:3818) and already carries BR-S362's optical-centring text-indent
   (:3954) â€” letter-spacing puts a trailing space after the last character too, so
   centred tracked text sits half a unit left of true centre. That correction is
   inherited and must not be undone here. */
.birth-preserve .m2bface .m2face-orient { color: var(--bp-meta); }

.birth-preserve .m2bface .m2tick { border-color: rgba(28,21,13,.74); }   /* 6.10:1 */


/* â•â•â• 7 Â· Â§9 LAYER 8b Â· THE SIX MARKS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

   Â§2: "the six marks are interactive, but their printed appearance remains
   primary." Â§10: "ink darkens one step Â· a restrained material tint appears behind
   the word Â· no line shifts position Â· focus remains visibly identifiable".

   â˜…â˜… THE DEFECT THE SPEC NEVER MENTIONS AND THIS FILE HAS TO UNDO.
   `_six-live.js:65` injects `.m2bface__marks.sx-on li{opacity:.42}`, which fades
   the five marks that are not currently showing. Measured on this cream:

       gold leaf 1.94 Â· cinnabar 2.00 Â· iron gall 2.16
       stone     1.94 Â· verdigris 1.97 Â· ash       1.94

   Five of six between 1.94 and 2.16:1 against a 4.5 gate, on the primary content
   of the exhibit, arriving through a stylesheet nobody would think to check. The
   dim cannot be retuned into range: .80 gives 4.05 and .85 gives 4.53, so the
   MECHANISM is wrong for a 4.5:1 plane, not its value.

   â˜… SO THE SIGNAL INVERTS: THE ONE IS LIT, THE FIVE ARE NOT DIMMED â€” which is the
   better design independently of the arithmetic. Â§2 says the printed appearance
   remains primary, and a printed label does not fade five of its own lines because
   a reader looked at the sixth. Nothing is lost: the active mark is now marked by
   FOUR things at once â€” ink one step darker, a material tint behind the word, a
   leading rule in the margin, and its lid notch â€” where before it was marked by
   the absence of a fade on its neighbours.

   â˜… THE OVERRIDE WINS ON SPECIFICITY, NOT ON ORDER, AND THAT IS DELIBERATE. The
   module appends `<style id="__sixlive">` to head at install time
   (_six-live.js:690-691) and _m2-box.js:53-58 appends this stylesheet's <link> at
   mount time; which lands later depends on when the archive fetch resolves, so
   source order is not a thing this file may rely on. The module's rule is (0,2,1);
   the rule below is (0,3,1) and wins in every ordering. No `!important` â€” the
   house does not use it on this surface and a later author must be able to
   override this too.

   â˜…â˜… AND THE NON-HUE CUE IS NOT OPTIONAL. The six are distinguished by hue alone
   (styles.css:3997-4002), and hue is unavailable in forced-colors â€” so as
   CONTROLS they fail 1.4.1 without something else carrying the state. The leading
   rule at `li::after` is that something. It is what makes the active mark
   identifiable in monochrome, at thumbnail, and for a reader who cannot separate
   the six pigments at all. */

.birth-preserve .m2bface__marks {
  position: relative;         /* the varnish is an absolutely positioned pseudo */
  margin: var(--bp-marks-mt) 0 0;
  width: 100%;
  justify-items: stretch;     /* each row is the full text column: the hit region
                                 is 180Ã—13px at 1440 with no layout change */
  /* â˜… gap STAYS 12px. It is a hard floor for two independent reasons: BR-S358's
     own record ("At 5px apart the marks bundled into one block and the block is
     what read as a flag", styles.css:3988-3991) and SC 2.5.8, since the row pitch
     is 13 + 12 = 25px against a 24px minimum â€” the spacing exception passes by
     1px. No overflow anywhere in this file is ever solved by closing it. */
}

/* THE RESTING DIM, KILLED. `.sx-on` stays on the <ul> â€” the module toggles it in
   away() (_six-live.js:802-804) and nothing here needs it gone; only its one
   visual consequence is replaced. */
.birth-preserve .m2bface__marks.sx-on > li,
.birth-preserve .m2bface__marks.sx-on > li[aria-current="false"] { opacity: 1; }

.birth-preserve .m2bface__marks > li {
  position: relative;
  border-radius: 2px;
  transition: color 160ms var(--ease-settle, cubic-bezier(.2,.7,.2,1));
  /* Â§10: "no line shifts position". The ONLY transitionable property on a mark is
     colour; nothing here may be given a transform, a margin or a padding step. */
}
.birth-preserve .m2bface__marks > li:nth-child(1) { color: var(--mk-sun); }
.birth-preserve .m2bface__marks > li:nth-child(2) { color: var(--mk-animal); }
.birth-preserve .m2bface__marks > li:nth-child(3) { color: var(--mk-path); }
.birth-preserve .m2bface__marks > li:nth-child(4) { color: var(--mk-rune); }
.birth-preserve .m2bface__marks > li:nth-child(5) { color: var(--mk-trigram); }
.birth-preserve .m2bface__marks > li:nth-child(6) { color: var(--mk-hex); }

/* â”€â”€ Â§10's "restrained material tint behind the word".
   â˜… IT IS A PSEUDO-ELEMENT, AND THAT IS AN ENGINEERING CONSTRAINT, NOT A STYLE.
   `_six-live.js:775` resolves the active mark with `indexOf` over `ul.children`,
   `:774` reads `ls.length` for the arrow wrap and `:803` iterates `ul.children`
   writing aria-current â€” a seventh child breaks all three, silently. A pseudo-
   element is not a child node. Grep-confirmed free: no ::before/::after exists on
   `.m2bface__marks li` in styles.css, _six-live.js, _m2-pod.css, _m2-box.css or
   _m2-vitrine.css.
   `background: currentColor` means the tint IS the mark's own pigment for all six,
   with no second palette to keep in step.
   â˜… AND IT IS NOT A PILL. 2px of radius is a printed edge. A capsule radius here
   turns six printed marks into six buttons and loses Â§2's primary truth in one
   property.
   ALPHA .10, CAPPED. Measured with Â§9's varnish over it, the active ink computes
   6.13â€“7.51:1 and the resting ink 4.77 (the belt figure, if the ink step were ever
   removed); at .12 the belt is 4.62 and at .15 it is 4.43 and fails. .10 is the
   value, .12 is the ceiling, and the number is published here so a craft pass
   cannot erode it without seeing it. */
.birth-preserve .m2bface__marks > li::before {
  content: ""; position: absolute; z-index: -1;
  inset: -2px -6px;
  border-radius: inherit;
  background: currentColor;
  opacity: 0;
  transition: opacity 160ms var(--ease-settle, cubic-bezier(.2,.7,.2,1));
  pointer-events: none;
}

/* â”€â”€ THE MARGIN RULE â€” the non-hue cue, and the label's half of Â§10's notch
   sentence. A 4px ink rule in the film's left margin on the active row only.
   Absolutely positioned, so it costs no layout. Ink rather than gold: gold at
   #6b4c14 is 5.12:1 and would be fine, but the rule is a state indicator and ink
   at 10.98:1 is the one that survives a forced palette. */
.birth-preserve .m2bface__marks > li::after {
  content: ""; position: absolute;
  left: -6px; top: 50%;
  width: 4px; height: 1px;
  transform: translateY(-.5px);
  background: var(--bp-ink);
  opacity: 0;
  transition: opacity 160ms var(--ease-settle, cubic-bezier(.2,.7,.2,1));
  pointer-events: none;
}

/* THE STATES. Three selectors, ONE appearance: `:hover` and `:focus-visible` are
   the immediate answer to the hand and the keyboard; `[aria-current="true"]` is
   the persistent "this is the one the right column is showing", which the module
   sets at _six-live.js:627. They look identical deliberately â€” a reader hovering
   mark 4 while mark 4 is the one showing must not see two states stack.
   Nothing here is bound by JS. The module wires no listener for any of it. */
.birth-preserve .m2bface__marks > li:hover::before,
.birth-preserve .m2bface__marks > li:focus-visible::before,
.birth-preserve .m2bface__marks > li[aria-current="true"]::before { opacity: .10; }
.birth-preserve .m2bface__marks > li:hover::after,
.birth-preserve .m2bface__marks > li:focus-visible::after,
.birth-preserve .m2bface__marks > li[aria-current="true"]::after { opacity: 1; }

/* the ink step, per mark â€” "one step darker" of six different pigments is six
   different colours, and a filter or a blend would have taken the tint with it */
.birth-preserve .m2bface__marks > li:nth-child(1):is(:hover,:focus-visible,[aria-current="true"]) { color: var(--mk-sun-a); }
.birth-preserve .m2bface__marks > li:nth-child(2):is(:hover,:focus-visible,[aria-current="true"]) { color: var(--mk-animal-a); }
.birth-preserve .m2bface__marks > li:nth-child(3):is(:hover,:focus-visible,[aria-current="true"]) { color: var(--mk-path-a); }
.birth-preserve .m2bface__marks > li:nth-child(4):is(:hover,:focus-visible,[aria-current="true"]) { color: var(--mk-rune-a); }
.birth-preserve .m2bface__marks > li:nth-child(5):is(:hover,:focus-visible,[aria-current="true"]) { color: var(--mk-trigram-a); }
.birth-preserve .m2bface__marks > li:nth-child(6):is(:hover,:focus-visible,[aria-current="true"]) { color: var(--mk-hex-a); }

/* FOCUS. The module's own ring is `1px solid rgba(28,21,13,.5)` at offset 3px
   (_six-live.js:67). On this film it composites to 3.07:1 â€” clearing 1.4.11's 3:1
   by 0.07, which is not a margin for the only visible sign that a control has
   keyboard focus; and at 3px offset on 13px rows, adjacent rings very nearly meet.
   2px of near-full ink at 7.66:1, offset 1px, which sits inside the row's own line
   box and cannot reach its neighbour.
   â˜… `outline` DOES NOT AFFECT LAYOUT. That is the whole reason it is the ring and
   not a border or a box-shadow spread â€” Â§10: "no line shifts position". */
.birth-preserve .m2bface__marks > li:focus-visible {
  outline: 2px solid rgba(37,27,18,.85);
  outline-offset: 1px;
}


/* â•â•â• 8 Â· Â§9 LAYER 9 Â· THE SPOT VARNISH â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Â§6: "spot varnish over the six marks only." Two facts sell it and neither is a
   shine: a varnish has a hard EDGE where it stops, and it is directional.
   â˜… IT IS A PSEUDO OF THE <ul>, POSITIONED ABSOLUTELY. `.m2bface__marks` is
   `display: grid` (styles.css:3993), so an in-flow ::after becomes a SEVENTH GRID
   ROW and silently adds a mark's worth of height. Positioned, it is out of flow
   and the grid is untouched.
   â˜… IT PAINTS ABOVE THE INK, WHICH IS Â§9's ORDER (7 film Â· 8 ink Â· 9 varnish): a
   positioned pseudo paints after its non-positioned siblings in the same stacking
   context, so the order falls out of the DOM rather than out of a z-index someone
   has to maintain.
   â˜… IT IS STATIONARY (Â§10's reflection law: "sticker varnish stationary"). No
   pointer variable is read here and no property is transitioned.
   â˜… CONTRAST: it LIGHTENS the ground AND the ink together, so it costs the marks
   ~0.8 of ratio rather than halving them â€” that is why the resting mark under it
   is 5.43:1 and not 3.9. CAPPED AT .06; Â§10's own budget allows .10, at which the
   belt figure falls to 4.33 and fails. .06 is the value and it is the ceiling. */
.birth-preserve .m2bface__marks::after {
  content: ""; position: absolute;
  inset: -5px -9px;
  border-radius: 3px;
  pointer-events: none;
  background: linear-gradient(104deg,
    transparent 16%,
    rgba(255,252,242,.06) 37%,
    rgba(255,252,242,.02) 53%,
    transparent 76%);
  /* the lip â€” the only part of spot varnish that is not optional, and the part
     that says "a film stops here" rather than "something is shiny" */
  box-shadow:
    inset 0 0 0 .5px rgba(255,252,242,.16),
    inset 0 -.5px 0 rgba(58,44,26,.05);
}


/* â•â•â• 9 Â· Â§9 LAYER 10 Â· FOREGROUND REFLECTIONS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

   â˜…â˜… Â§9 IS ABSOLUTE: "A broad glass reflection must never cross the opaque label.
   If it does, the label will appear to float inside the jar."

   The obvious implementation is one full-jar reflection with the label's rectangle
   masked out of it. REJECTED, and the reason is the failure mode: a mask that
   mis-registers by one pixel â€” because the label's box is derived from tokens, or
   because a browser rounds a percentage differently â€” puts a bright line along the
   sticker's edge, which is precisely the artifact Â§14's fourth risk names. A mask
   is a promise that has to hold.

   Instead the foreground reflection is THREE elements, each inset into a region of
   EXPOSED glass, each expressed from the same tokens the label itself uses. There
   is no geometry in which they can reach the sticker, because they are not big
   enough to. It is not a promise; it is a shape.

     gleam   above the label   neck â†’ label top      full width
     edge    left of the label label top â†’ bottom    the left exposed band
     foot    below the label   label bottom â†’ base   full width

   The RIGHT band gets no broad reflection at all: Â§6 says "cool edge reflection on
   ONE side only", and the right side is differentiated by the mould seam in layer
   6 instead. Two sides, two different pieces of evidence, one of them absent â€”
   which is what real glass looks like. */
.pj__gleam {
  position: absolute; z-index: 7; pointer-events: none;
  left: 8%; right: 8%;
  top: calc(var(--bp-jar-h) * .08);
  /* âˆ’2px: the region ENDS two pixels short of the sticker. Ending exactly on it
     would be correct physics and still the wrong build â€” two boxes sharing an edge
     across a z boundary is where a half-pixel rounding difference puts a bright
     hairline along the label. The gap is smaller than the label's own die-cut
     radius, so it is not visible. */
  height: calc(var(--bp-label-top) - var(--bp-jar-h) * .08 - 2px);
  transform: translateX(calc(clamp(-1, var(--bp-px), 1) * 8px));   /* Â§10: max 8px */
  transition: transform 200ms var(--ease-settle, cubic-bezier(.2,.7,.2,1));
  background:
    linear-gradient(90deg, rgba(214,226,230,0) 30%, rgba(214,226,230,.13) 46%,
      rgba(214,226,230,.05) 58%, rgba(214,226,230,0) 66%)
      left 0 top 0 / 100% calc(var(--bp-jar-h) * .06) no-repeat,
    radial-gradient(38% 62% at 38% 74%, rgba(214,226,230,.11) 0%, rgba(214,226,230,0) 74%);
}
/* THE COOL EDGE, ONE SIDE ONLY (Â§6). Â§10's reflection law gives this one an
   OPACITY CHANGE ONLY â€” it may not slide, because a cool edge reflection is the
   glass's own rim and a rim that moves is a rim that is not attached.
   Base .58, so the jar is complete with no pointer at all (Â§2: "the design must
   remain understandable without hover"). */
.pj__edge {
  position: absolute; z-index: 7; pointer-events: none;
  left: 0; width: calc((var(--bp-jar-w) - var(--bp-label-w)) / 2);
  top: var(--bp-label-top); height: var(--bp-label-h);
  opacity: calc(.58 + clamp(0, var(--bp-py), 1) * .42);
  transition: opacity 200ms var(--ease-settle, cubic-bezier(.2,.7,.2,1));
  background: linear-gradient(90deg, rgba(146,186,200,0) 8%, rgba(146,186,200,.20) 20%,
    rgba(146,186,200,.06) 34%, rgba(146,186,200,0) 52%);
}
/* the foot's own reflection: a short bright turn where the heavy base catches the
   sill's light back up into the glass. Static â€” Â§10 gives movement to the shoulder
   highlight and the caustic and to nothing else. */
.pj__foot {
  position: absolute; z-index: 7; pointer-events: none;
  left: 12%; right: 12%;
  top: calc(var(--bp-label-top) + var(--bp-label-h)); bottom: 0;
  background: linear-gradient(90deg, rgba(196,214,220,0) 12%, rgba(196,214,220,.10) 38%,
    rgba(196,214,220,.14) 50%, rgba(196,214,220,.10) 62%, rgba(196,214,220,0) 88%)
    left 0 bottom calc(var(--bp-jar-h) * .04) / 100% 1.5px no-repeat;
}


/* â•â•â• 10 Â· Â§9 LAYER 11 Â· THE LID AND THE SEAL â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Â§6: blackened brass or dark blue enamel, fine grooves, one narrow antique-gold
   seam, six shallow notches, one narrow brass tamper strip ending in a tiny
   diamond seal, and NO handle large enough to become a second focal point â€” which
   is why there is no knob here at all. The lid is a cap and the six notches are
   the only incident on it. */
.pj__lid {
  position: absolute; z-index: 8; pointer-events: none;
  left: 50%; top: 0;
  width: 62%;               /* caps the 46% neck with an 8% overhang each side â€” a
                               lid flush with its neck reads as a bottle top, a lid
                               as wide as the body reads as a tin */
  height: 8%;
  transform: translateX(-50%);
  border-radius: 2px 2px 1px 1px;
  background:
    /* the fine grooves. 3px pitch, not 2: at 2px the pitch beats against fractional
       element widths and the whole band shimmers as the viewport resizes. Alpha is
       near the floor â€” grooves are a texture you find, not a pattern you read. */
    repeating-linear-gradient(90deg,
      rgba(255,255,255,.030) 0px, rgba(255,255,255,.030) 1px,
      rgba(0,0,0,.10) 1px, rgba(0,0,0,.10) 3px),
    linear-gradient(180deg, #1b2129 0%, #141920 34%, #0f141a 72%, #171d25 100%);
  box-shadow: inset 0 1px 0 rgba(214,226,230,.10), inset 0 -1px 0 rgba(0,0,0,.6);
}
/* ONE NARROW ANTIQUE-GOLD SEAM (Â§6), where the crown meets the skirt. */
.pj__lid::after {
  content: ""; position: absolute; left: 4%; right: 4%; top: 42%; height: 1px;
  background: linear-gradient(90deg, rgba(168,140,80,0) 0%, rgba(168,140,80,.30) 22%,
    rgba(193,166,105,.44) 50%, rgba(168,140,80,.30) 78%, rgba(168,140,80,0) 100%);
}

/* â”€â”€ THE SIX NOTCHES. Â§2: "the lid has six restrained notches; they are a seal
   system, not decoration." So they are evenly pitched, identical, and their only
   variable is which one is lit.
     pitch  = 88 / 6 = 14.667%    centre = 6% + pitch Ã— (i âˆ’ .5)
   i = 1 â†’ 13.33%, i = 6 â†’ 86.67%; the pair averages 50.0, so the set is symmetric
   about the tamper strip. `--i` is set inline by the mounter â€” the same mechanism
   _m2-pod.css:324-326 uses for its ticks, and for the reason its note gives:
   :nth-of-type parity breaks the moment another <span> joins the parent.
   The notch itself is a SHALLOW CUT, present whether or not it is lit â€” a dark slot
   with a lit lower lip, which is what a groove pressed into metal looks like from
   slightly above. It must be legible with every effect off (Â§15's no-effects test). */
.pj__notch {
  --lit: 0;
  position: absolute; top: 52%; height: 34%;
  width: calc(var(--bp-jar-w) * .022);
  left: calc(var(--i, 1) * 14.667% - 1.333%);
  transform: translateX(-50%);
  border-radius: .5px;
  background: linear-gradient(180deg, rgba(0,0,0,.62) 0%, rgba(0,0,0,.44) 62%,
    rgba(214,226,230,.08) 100%);
}
/* the restrained point of light (Â§10). One point, low, at the notch's floor â€”
   light collecting in a cut, not a bulb behind it. */
.pj__notch::after {
  content: ""; position: absolute; left: -55%; right: -55%; bottom: -12%; height: 62%;
  border-radius: 50%;
  opacity: var(--lit);
  transition: opacity 160ms var(--ease-settle, cubic-bezier(.2,.7,.2,1));
  background: radial-gradient(50% 50% at 50% 62%, rgba(193,166,105,.85) 0%,
    rgba(168,140,80,.30) 42%, rgba(168,140,80,0) 76%);
}

/* â”€â”€ THE TAMPER STRIP AND ITS SEAL (Â§6). Narrow, brass, from the crown down over
   the neck, terminating in a tiny diamond.
   â˜… "The seal remains intact in every Birth state" (Â§6). It is intact here BY
   OMISSION: no rule in this file, in any state, class or media query, changes its
   opacity, size, colour or position. That is the implementation. If a later layer
   ever wants to animate it, this comment is the objection. */
.pj__strip {
  position: absolute; z-index: 8; pointer-events: none;
  left: 50%; top: 2.5%;
  width: calc(var(--bp-jar-w) * .018);
  height: 11.5%;
  transform: translateX(-50%);
  background: linear-gradient(90deg, rgba(120,98,52,.9) 0%, rgba(193,166,105,.92) 38%,
    rgba(168,140,80,.9) 62%, rgba(104,84,44,.9) 100%);
}
.pj__strip::after {
  content: ""; position: absolute; left: 50%; bottom: 0;
  width: calc(var(--bp-jar-w) * .034); height: calc(var(--bp-jar-w) * .034);
  transform: translate(-50%, 42%) rotate(45deg);
  border-radius: .5px;
  background: linear-gradient(135deg, var(--bp-gold-lit) 0%, var(--bp-gold) 52%, #6f5a2e 100%);
  box-shadow: inset 0 0 0 .5px rgba(0,0,0,.42);
}

/* â”€â”€ THE NOTCH BINDING â€” NO SCRIPT AT ALL, AND IT IS THE ANSWER TO THE <button>
   REWRITE THAT FAILED BEFORE.
   `_six-live.js:627` sets aria-current="true" on the active <li> and clears it at
   :803. `:has()` reads that with no script, so the notches answer the marks by
   pointer AND by keyboard the moment the exhibit is mounted, and they answer
   THROUGH the module that already owns the marks rather than around it. An earlier
   proposal promoted the six <li> to <button> and broke both the module's focus
   handler and its arrow navigation, because it resolves the active mark by finding
   the focused <li> among its siblings (_six-live.js:775) and a focused inner button
   returns âˆ’1. Here the elements are not touched at all.
   `:hover`/`:focus-visible` are included beside aria-current because
   `_six-live.js:687` returns false unless `.m2bface__marks` AND `.m2read` both
   exist and the archive has landed â€” without it the marks are still controls and
   the notch must still answer them.
   COST, named: six :has() rules invalidate on aria-current changes, once per mark
   hover or arrow press. styles.css already uses :has() 29Ã— on this same panel
   (its own note at :3467-3470), so this is the house's mechanism at its own scale. */
.birth-preserve:has(.m2bface__marks > li:nth-child(1):is(:hover,:focus-visible,[aria-current="true"])) .pj__notch--1,
.birth-preserve:has(.m2bface__marks > li:nth-child(2):is(:hover,:focus-visible,[aria-current="true"])) .pj__notch--2,
.birth-preserve:has(.m2bface__marks > li:nth-child(3):is(:hover,:focus-visible,[aria-current="true"])) .pj__notch--3,
.birth-preserve:has(.m2bface__marks > li:nth-child(4):is(:hover,:focus-visible,[aria-current="true"])) .pj__notch--4,
.birth-preserve:has(.m2bface__marks > li:nth-child(5):is(:hover,:focus-visible,[aria-current="true"])) .pj__notch--5,
.birth-preserve:has(.m2bface__marks > li:nth-child(6):is(:hover,:focus-visible,[aria-current="true"])) .pj__notch--6 {
  --lit: 1;
}


/* â•â•â• 11 Â· POINTER-TRANSPARENCY, AS ONE LAW â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Â§10: "glass and liquid layers pointer-events:none"; Â§12: "keep visual layers
   pointer-transparent except the six mark buttons". The six marks are real
   controls owned by _six-live.js (it grants them pointer-events and tabindex at
   :712/:731/:732) and a SINGLE decorative layer above them with pointer-events at
   auto kills that module silently â€” no error, no visual change, the specimen panel
   simply stops opening.
   â˜… IT IS AN EXPLICIT LIST, NOT `.birth-preserve [aria-hidden="true"]`. That
   blanket was written first and cut: `.m2bface` itself carries aria-hidden
   (app.js:2956), so the blanket reaches the six marks' parent. It is harmless
   today only because of styles.css:3891-3892, and "harmless because of two lines
   in another file" is not a property to build the exhibit's only interactive
   surface on. */
.birth-preserve__seam, .birth-preserve__sill,
.birth-preserve__contact, .birth-preserve__caustic,
.pj__neck, .pj__shoulder, .pj__body, .pj-veg, .pj__brine, .pj-dill,
.pj-seeds, .pj-bed, .pj-bubble, .pj__refract, .pj__meniscus,
.pj__gleam, .pj__edge, .pj__foot, .pj__lid, .pj__notch, .pj__strip,
.dry-mount, .dry-mount > * {
  pointer-events: none;
}


/* â•â•â• 12 Â· THE TWO SWITCHES â€” the builder's own Â§g calls â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Neither can be verified in the preview pane (rAF frozen, no IntersectionObserver),
   so both must survive to a real browser. The bench carries them.

   SWITCH ONE Â· PROUD vs SUNK. "Is it being handed to you, or has it become part of
   the wall?" Â§5 specifies an 18â€“24px recess with no exterior shadow; PART 0 records
   that sinking an object into the page failed precisely because "a thing that has
   sunk in is no longer being handed to you." Proud is the default; this is the
   other reading, and it is three declarations. */
.birth-preserve.is-recessed .birth-preserve__niche::before { z-index: 4; }  /* the returns lap the jar */
.birth-preserve.is-recessed .birth-preserve__sill { background: none; }     /* no forward lip */
.birth-preserve.is-recessed .birth-preserve__contact {
  width: calc(var(--bp-jar-w) * .96);
  background: radial-gradient(50% 50% at 50% 20%, rgba(0,0,0,.92) 0%,
    rgba(0,0,0,.40) 52%, rgba(0,0,0,0) 78%);
}

/* SWITCH TWO Â· AMBIGUOUS vs UNMISTAKABLE CUCUMBER. The same look answers the
   design's actual product question: does the object land as STRANGE or as FUNNY?
   Strange leaves a question only a reading resolves; funny resolves itself and
   converts nothing. The difference lives entirely in this one element's
   recognisability. Default is ambiguous â€” dark, blurred, a third of it under the
   label. This is the other end: lifted, sharper, and further out of the label's
   shadow, plus the second cropped form Â§6 allows "only if the jar fails
   recognition without it". */
.birth-preserve.is-plain-cucumber .pj-veg {
  left: 5%;
  filter: blur(calc(var(--bp-jar-h) * .0006));
  opacity: 1;
}
.birth-preserve.is-plain-cucumber .pj-veg--crop { display: block; }
.pj-veg--crop {
  display: none;              /* the rule ships; the node is mounted by the switch */
  position: absolute; z-index: 2;
  right: -7%; bottom: 4%;
  width: min(calc(var(--bp-jar-h) * .108), 19%);
  aspect-ratio: 72 / 212; height: auto;
  transform: rotate(13deg);
  opacity: .82;
  /* cropped against the RIGHT WALL, not the floor: a second jar-packed form
     disappearing into the edge density reads as "the jar is full of these"; one
     disappearing through the floor reads as a bug. */
}


/* â•â•â• 13 Â· BIRTH / TAROT â€” ONE CONTROLLER, ZERO NEW JS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   m2SetFace (app.js:3312) is the source of truth and stays it: it writes data-face
   on the hero inside settle() (:3327) and toggles `.is-turning` around it
   (:3344-3348). The exhibit reads both with `:has()` â€” the technique
   styles.css:3476 already uses on this exact panel. No second controller, no
   duplicated reading state (Â§12), no second timer to drift. Reduced motion is
   inherited for free, because m2SetFace already branches at :3341-3343 and settles
   with no `.is-turning` at all.

   â˜… THE FLIP IS KILLED, AND THAT IS THE POINT. styles.css:3874 runs
   `m2-flip 480ms` â€” a rotateY of the whole card. A sticker adhered to glass cannot
   rotate. The SAME 480ms is spent on Â§10's own prescription instead: "the centre
   stage darkens, the current exhibit recedes, and the next resolves from the same
   fixed centre." Because data-face flips at the animation's own 240ms midpoint,
   the swap lands in the trough with nothing further to arrange. */
.birth-preserve .m2hero.is-turning { animation: none; }
.birth-preserve:has(.m2hero.is-turning) .birth-preserve__niche {
  animation: bp-recede 480ms cubic-bezier(.42,0,.58,1) both;
}
@keyframes bp-recede {
  /* no scale on the jar: the OBJECT does not shrink; the light in the recess goes
     out and comes back with something else in it */
  0%   { filter: brightness(1);   opacity: 1; }
  50%  { filter: brightness(.34); opacity: .62; }
  100% { filter: brightness(1);   opacity: 1; }
}

/* â”€â”€ THE TAROT EXHIBIT: A DRY MOUNT. Â§16: "Do not make Tarot another pickle jar.
   Give Tarot a dry black-card exhibit occupying the same fixed stage." Because the
   seat's height and the niche's box are both independent of which face is up, the
   footprint is not "kept the same" â€” it IS the same box, and the columns cannot
   move on a flip.
   â˜… THE DROP SHADOW IS THE ARGUMENT, AND IT IS ONE PROPERTY. The sticker gets no
   shadow because it is adhered â€” nothing stands away from anything. The dry card
   DOES, because it stands in a recess on a ledge. Preserved versus drawn, said in
   the physics rather than in a caption, which is what Â§3's "no line of interface
   copy should explain or perform the joke" demands of the whole object. */
.birth-preserve:has(.m2hero[data-face="tarot"]) .pickle-jar > *:not(.m2hero),
.birth-preserve:has(.m2hero[data-face="tarot"]) .birth-preserve__caustic { display: none; }
.birth-preserve:has(.m2hero[data-face="birth"]) .dry-mount { display: none; }
.dry-mount { position: absolute; inset: 0; z-index: 4; }
.dry-mount__ledge {
  position: absolute; left: 8%; right: 8%; bottom: calc(var(--bp-niche-b) - 2px); height: 2px;
  background: linear-gradient(90deg, rgba(52,68,82,0) 6%, rgba(52,68,82,.62) 50%, rgba(52,68,82,0) 94%);
}
.dry-mount__clip {
  position: absolute; top: 18%; width: 7px; height: 22px; border-radius: 1px;
  background: linear-gradient(180deg, var(--bp-gold-lit), var(--bp-gold) 60%, #6f5a2e);
  opacity: .72;
}
.dry-mount__clip--l { left: 17%; }
.dry-mount__clip--r { right: 17%; }

/* the card returns to ITS OWN proportion â€” it is a card again, not a label.
   height-driven at 120/190, with `width:auto`, which is the correct form and NOT
   the compound calc an earlier layer wrote (it multiplied a percentage of the jar's
   WIDTH by a ratio that cancelled to 1). */
.birth-preserve:has(.m2hero[data-face="tarot"]) .pickle-jar__label {
  position: absolute;
  left: 50%; top: 4%;
  height: 88%; width: auto;
  aspect-ratio: 120 / 190;
  transform: translateX(-50%);
  border-radius: 5px;
  overflow: visible;
  background: linear-gradient(178deg, #171b22 0%, #12151b 46%, #0d1014 100%);
  box-shadow: 0 14px 30px rgba(0,0,0,.58), inset 0 0 0 1px rgba(200,173,112,.16);
}
/* the dry card keeps the SHIPPED dark stock on both decks â€” under the parchment
   deck styles.css:3779 would repaint it cream, and Â§16 says black card.
   (0,5,0) beats html.m2-parch .m2hero at (0,2,1). */
html.m2-parch .birth-preserve:has(.m2hero[data-face="tarot"]) .pickle-jar__label {
  background: linear-gradient(178deg, #171b22 0%, #12151b 46%, #0d1014 100%);
  border: 0;
}
/* â˜… THE ACCESSION PLATE IS DELIBERATELY EMPTY, AND THE RULE STAYS SO THE SLOT IS
   FOUND AGAIN. A mount wants a plate and the design has a place for one. It gets
   no text here: that would be new customer-facing copy arriving through a
   prototype, which Â§8's copy rules forbid and which _m2-box.js:121-124 already
   refused once for the pod. The builder writes the line, or there is no line. */
.dry-mount__plate { position: absolute; left: 50%; bottom: 3%; transform: translateX(-50%); }
.dry-mount__plate:empty { display: none; }


/* â•â•â• 14 Â· WHAT THE SHIPPED CARD BRINGS THAT THE STICKER MUST NOT â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Three rules, each cancelling one shipped behaviour that is true of a card and
   false of a label. All three are written at three classes or better; see Â§2 on
   why two would silently lose on the parchment deck. */

/* the tilt's engraved light lobes (styles.css:3858-3869) â€” Â§9's forbidden
   reflection, arriving from inside the card */
.birth-preserve .pickle-jar .m2hero::before { display: none; }

/* the pair-hover bloom (styles.css:3795-3798): a drop shadow by another name,
   swinging on hover of a NEIGHBOURING column. Its selector is (0,4,1) with :has,
   so this must beat it â€” and it does, at (0,6,0).
   â˜… THIS IS THE MOST FRAGILE PAIR IN THE FILE only in the sense that it depends on
   two shipped selectors staying where they are; if either moves, re-derive. */
html.m2-parch .menu__draw:has(.menu__draw-stage:hover) .birth-preserve .pickle-jar .pickle-jar__label,
html.m2-parch .menu__draw:has(.m2read:hover) .birth-preserve .pickle-jar .pickle-jar__label {
  box-shadow: none;
}
/* the shipped hover brightness AND its gold bloom (styles.css:3533-3535) â€” a card
   standing free on the panel responds to a pointer nearby; a sticker on glass does
   not. This rule is UNQUALIFIED by deck in styles.css, so without the box-shadow
   line here `?m2=dark` would swing a gold ring onto the sticker even though the
   parchment kill above never fires. */
.menu__draw:has(.menu__draw-stage:hover) .birth-preserve .pickle-jar .pickle-jar__label,
.menu__draw:has(.m2read:hover) .birth-preserve .pickle-jar .pickle-jar__label {
  filter: none;
  box-shadow: none;
}


/* â•â•â• 15 Â· STILLNESS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   THERE ARE EXACTLY TWO @keyframes IN THIS FILE â€” the 640ms bubble and the 480ms
   recede â€” and NEITHER is idle. Â§10: "default completely still Â· no continuous
   wobble, shimmer, breathing or floating"; the house register rules out "anything
   that pulses, bounces, jitters, or repeats" (docs/SURFACE_BRIEF_V1.md:37). Both
   are one-shots answering direct input; every other movement in the file is a
   transition, i.e. a return journey. */

@media (prefers-reduced-motion: reduce) {
  /* Â§10: "no bubbles Â· no parallax Â· static reflection Â· immediate state swap Â·
     ALL CONTENT AND CONTROLS REMAIN AVAILABLE." The last clause is the one that is
     easy to fail. Everything removed here is MOTION: the six marks still darken,
     still tint, still show their margin rule, still light their notch, and the face
     still switches â€” m2SetFace already settles instantly at app.js:3341-3343, so
     bp-recede is never armed and nothing here has to arrange it. */
  .pj-bubble { display: none; }
  .birth-preserve__niche { animation: none; }
  .birth-preserve { --bp-px: 0; --bp-py: 0; }   /* second lock; the module also
                                                   declines to bind the listener */
  /* each returns to its OWN rest transform, never to `none` â€” the caustic is
     centred by a translate and `transform:none` would slide it half its width off
     the axis. _m2-pod.css:435-438 records the same class of mistake. */
  .birth-preserve__caustic { transform: translateX(-50%); }
  .pj__gleam { transform: none; }
  .pj__edge { opacity: .58; }
  .birth-preserve__caustic, .pj__gleam, .pj__edge,
  .birth-preserve .m2bface__marks > li,
  .birth-preserve .m2bface__marks > li::before,
  .birth-preserve .m2bface__marks > li::after,
  .pj__notch::after { transition: none; }
  /* the notch still LIGHTS â€” it is information, not decoration. It arrives
     instantly instead. Â§10: reduced motion removes movement "without removing
     information". */
}

/* will-change ONLY while a pointer is actually working the exhibit (Â§12), and only
   on the two layers that move. Left on, these are two permanently promoted layers
   on the most expensive element on the page â€” the cost _m2-box.css went out of its
   way to remove for its own lamp. */
.birth-preserve.is-live .pj__gleam,
.birth-preserve.is-live .birth-preserve__caustic { will-change: transform; }

/* forced colours: the film is a picture of a material and cannot survive a forced
   palette, so it stops pretending. The reading stays â€” Â§10's reduced-motion
   principle applied to a different axis: remove the effect, never the information.
   â˜… AND THIS IS WHY THE MARGIN RULE EXISTS. The six are separated by hue alone in
   the shipped design; here the active mark is also the one with a leading rule,
   which survives forced-colors and monochrome both. */
@media (forced-colors: active) {
  .birth-preserve .pickle-jar .pickle-jar__label { background: Canvas; border: 1px solid CanvasText; }
  .birth-preserve .pickle-jar .pickle-jar__label::before,
  .birth-preserve .m2bface__marks::after,
  .birth-preserve .m2bface__marks > li::before { display: none; }
  .birth-preserve .m2bface,
  .birth-preserve .m2bface .m2face-meta,
  .birth-preserve .m2bface .m2face-orient,
  .birth-preserve .bp-inst,
  .birth-preserve .m2bface__marks > li { color: CanvasText; forced-color-adjust: none; }
  .birth-preserve .m2bface__marks > li::after { background: CanvasText; forced-color-adjust: none; }
}


/* â•â•â• 16 Â· THE SHORT-VIEWPORT COMPRESSION â€” the one place the fit is real work â•â•

   THE PROBLEM, STATED PLAINLY. The label's ink measures 281.2px at Â§8's own type
   (the audit is in the hand-off, term by term). label height = jar Ã— .73 Ã— .84, so
   the ink needs a 458.6px jar, a 482.6px seat, and therefore a VIEWPORT AT LEAST
   862px TALL. Below that the reading overruns its own plane: at 800px tall the
   label is 260px and the ink is 281 â€” a 21px overrun; at the 400px seat floor it
   is 231 and the overrun is 50.

   THE FIX TAKES 44px OUT OF WHITESPACE AND NOTHING ELSE. Not the type, not the
   12px mark gap â€” the prohibition is absolute and SC 2.5.8 backs it. Six spacing
   tokens step down, and the label's own band goes .84 â†’ .90, which buys the plane
   back 7% of the body at the cost of the free brine above and below it (28px â†’ 15px
   at 1440-equivalent geometry). Every supported viewport then passes with 10â€“59px
   in hand, except 320px wide â€” see the branch below.

   Written as a HEIGHT query because that is the real variable; the width query is a
   separate axis and the two compose. */
@media (max-height: 861px) {
  .birth-preserve { --bp-label-band: .90; }
  .birth-preserve .m2bface {
    --bp-pad: 5px; --bp-mast-mb: 1px; --bp-rule-mt: 4px;
    --bp-marks-mt: 7px; --bp-wall-mt: 5px; --bp-wall-mb: 4px;
  }
  .birth-preserve .m2bface .m2bface__name { padding-top: 2px; }
}


/* â•â•â• 17 Â· RESPONSIVE (Â§13) â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   styles.css:4134-4144 collapses `.menu__draw` to ONE left-anchored column at
   â‰¤1199px and re-sizes the card at :4141 to `height:auto; width: min(72vw,300px)`,
   with aspect-ratio 120/190 still in force â€” so its height becomes
   width Ã— 190/120. The seat re-derives from that same expression, and the exhibit
   is height-neutral on mobile exactly as it is on desktop.

   â˜… BELOW 1200px THERE ARE NO SIDE COLUMNS, so Â§13's 16px gutter is not owed;
   only its 24px page-edge clearance, which `.menu__panel`'s own `padding: 34px
   24px` (styles.css:2834) supplies. That is also why `min(100%, 370px)` is the
   right cap and `calc(100vw - 48px)` is not: 100vw includes the scrollbar, which
   Â§13's own responsive gate forbids re-importing. The percentage appears in a
   `max-width` â€” a width property â€” and never in the derivation chain. */
@media (max-width: 1199px) {
  .birth-preserve {
    --bp-seat: calc(min(72vw, 300px) * 190 / 120);
    --bp-track: min(calc(100vw - 48px), 520px);
    --bp-air: 0px;
    justify-items: start;      /* .menu__draw-stage is align-items:flex-start here */
    max-width: 100%;
  }
  .birth-preserve__niche { max-width: min(100%, 370px); }
  /* the product row's tracking comes down so it still sets on one line in a 135px
     field: 17 characters at 9.5px/.14em is 119.5px + the âœ¦ and its gap = ~138,
     which is 3px over. At .10em it is 113px and holds. */
  .birth-preserve .m2bface .m2face-meta { letter-spacing: .10em; }
  /* the crowned name goes to `.m2face-name`'s OWN shipped size (styles.css:3813) â€”
     not an invented value. BR-S361 chose 25px as a desktop decision ("at 25px
     against 10px marks the size contrast does the work a rule would have done");
     at a 148px field 24px measures 169px and wraps to two lines it cannot afford. */
  .birth-preserve .m2bface .m2bface__name { font-size: 20px; }
}

/* â˜…â˜… 320px IS THE EXHIBIT'S FLOOR, AND IT IS SAID HERE RATHER THAN PAPERED OVER.
   At 320Ã—568 the niche is capped by the track at 272px, so the label is 141px wide
   and its text column is 121px â€” and Â§8's own institutional line, "BLUE ROOM
   PRESERVES" at 8px/.14em, measures 112.5px. The field is nearly full before the
   reading starts. Three steps close it, all inside Â§8's spirit rather than its
   letter, and none of them touches the marks or their 12px gap:
     Â· institutional tracking .14em â†’ .06em     (112.5px â†’ 100.3px)
     Â· the crowned name to 17px, one line       (119.8px into a 121.5px field)
     Â· the label band .90 â†’ .94                 (232.6px of plane against 229.9 of ink)
   IT FITS BY 2.7px VERTICALLY AND 1.7px HORIZONTALLY, both computed from an
   unverified Cormorant advance. That is not a margin, it is a coincidence, and it
   is flagged as such. THE NUMBER THAT WOULD GIVE IT A REAL MARGIN: 20px more label
   height needs a 364px jar, a 290px niche, a 290px track â€” i.e. a 338px viewport.
   A 360px phone has 17px in hand; a 320px one has 2.7. The band is NOT taken to
   1.0, which would close it comfortably, because at 1.0 the label fills the body,
   the free brine above and below goes to zero, and the meniscus lands on the
   label's top edge â€” breaking two of Â§2's absolute truths to pass a gate. */
@media (max-width: 359px) {
  .birth-preserve { --bp-label-band: .94; }
  .birth-preserve .bp-inst { letter-spacing: .06em; }
  .birth-preserve .m2bface .m2bface__name { font-size: 17px; }
}


/* â•â•â• 18 Â· THE BENCH ROW â€” prototype furniture, never product â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   `_m2-box.css:296-315` already styles `.m2box-bench`; this adds nothing to it.
   The two switches at Â§12 are the two rows the bench must carry, and they are the
   two open questions: proud-or-sunk, and strange-or-funny. */
```

Mechanically verified on the delivered file: braces 131/131, parens 772/772, **zero `!important`**, **zero `mix-blend-mode`**, **zero `url(#â€¦)` external references**, **two `@keyframes`, both one-shots**, `html.m2-parch` appears exactly 3 times in 2 rules, every rule namespaced under `.birth-preserve` / `.pickle-jar` / `.pj-*` / `.dry-mount`.

---

# (b) The markup â€” Â§9 layer order, Â§12 blueprint structure

`â€¹app nodeâ€º` marks the **one** element that already exists and is **moved**, never rebuilt.

```html
<section class="birth-preserve" aria-label="The Birth Reading preserve">
  <div class="birth-preserve__niche">

    <!-- Â§9.1 Â· the niche back wall is the niche's own background + ::before returns -->
    <span class="birth-preserve__seam"    aria-hidden="true"></span>
    <span class="birth-preserve__sill"    aria-hidden="true"></span>
    <span class="birth-preserve__contact" aria-hidden="true"></span>
    <span class="birth-preserve__caustic" aria-hidden="true"></span>

    <div class="pickle-jar">
      <!-- Â§9.2 Â· rear glass, as three boxes; only the body carries liquid -->
      <span class="pj__neck"     aria-hidden="true"></span>
      <span class="pj__shoulder" aria-hidden="true"></span>
      <div  class="pj__body"     aria-hidden="true">

        <!-- Â§9.3 Â· THE ONE RECOGNISABLE PICKLE. viewBox is cropped to the drawing's
             own bounds (x 16â€“88, y 4â€“216) so the element's box IS the vegetable's
             box â€” no invisible padding to position around, which is what lets
             `left: 8%` mean what it says. Two fills of one path: a HORIZONTAL ridge
             gradient (the longitudinal facets a cucumber has, suggested as two lifts
             rather than drawn as five lines) and a VERTICAL form gradient in black
             (the ends turning away from the light). Neither is a new colour: the
             ridge is the exact midpoint of Â§7's Dill green row (#435240) moved TEN
             POINTS YELLOW to #455236 â€” those ten points are the whole distance
             between a preserved cucumber and Â§3's first-named taste killer
             (#455236 is value 32%/sat 34%; grocery green #4caf50 is 69%/57%).
             The path is deliberately NOT symmetrical â€” a slight waist at yâ‰ˆ84, the
             belly leaning right at yâ‰ˆ118 â€” because a form that mirrors perfectly
             about its axis reads as a capsule, which Â§1's rejected list opens with. -->
        <svg class="pj-veg" viewBox="16 4 72 212" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="bpVegRidge" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0"    stop-color="#303926"/><stop offset="0.10" stop-color="#455236"/>
              <stop offset="0.27" stop-color="#4f5d3e"/><stop offset="0.42" stop-color="#455236"/>
              <stop offset="0.56" stop-color="#3a452e"/><stop offset="0.70" stop-color="#4a573a"/>
              <stop offset="0.85" stop-color="#3a452e"/><stop offset="1"    stop-color="#303926"/>
            </linearGradient>
            <linearGradient id="bpVegForm" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0"    stop-color="#000" stop-opacity=".45"/>
              <stop offset="0.16" stop-color="#000" stop-opacity="0"/>
              <stop offset="0.82" stop-color="#000" stop-opacity="0"/>
              <stop offset="1"    stop-color="#000" stop-opacity=".42"/>
            </linearGradient>
          </defs>
          <path d="M46 10 C31 10, 23 21, 22 37 C21 60, 20 84, 23 108 C26 134, 28 160, 33 180
                   C36 196, 41 208, 54 210 C69 210, 78 197, 80 177 C82 152, 83 124, 80 98
                   C78 74, 79 48, 75 34 C71 19, 62 10, 46 10 Z" fill="url(#bpVegRidge)"/>
          <path d="M46 10 C31 10, 23 21, 22 37 C21 60, 20 84, 23 108 C26 134, 28 160, 33 180
                   C36 196, 41 208, 54 210 C69 210, 78 197, 80 177 C82 152, 83 124, 80 98
                   C78 74, 79 48, 75 34 C71 19, 62 10, 46 10 Z" fill="url(#bpVegForm)"/>
          <ellipse cx="55" cy="199" rx="13" ry="4.5" fill="#303926" opacity=".30"/>
          <!-- the bumps: Â§3 wants them "suggested rather than drawn", so they are
               LIGHTER than the ridge they sit on and never outlined -->
          <g fill="#4f5d3e">
            <circle cx="36" cy="52"  r="2.2" opacity=".20"/><circle cx="41" cy="78"  r="1.6" opacity=".16"/>
            <circle cx="34" cy="104" r="2.4" opacity=".22"/><circle cx="39" cy="132" r="1.8" opacity=".17"/>
            <circle cx="35" cy="158" r="2.0" opacity=".18"/><circle cx="63" cy="66"  r="1.5" opacity=".14"/>
            <circle cx="66" cy="118" r="1.9" opacity=".16"/><circle cx="62" cy="172" r="1.4" opacity=".14"/>
          </g>
          <g fill="#303926" opacity=".30">
            <circle cx="48" cy="40" r="1.1"/><circle cx="52" cy="120" r="1.3"/><circle cx="46" cy="186" r="1.0"/>
          </g>
          <path d="M43 15 C46 13, 50 13, 53 15" fill="none" stroke="#303926"
                stroke-width=".9" stroke-linecap="round" opacity=".50"/>
        </svg>

        <span class="pj__brine" aria-hidden="true"></span>          <!-- Â§9.4 -->

        <!-- Â§9.5 Â· one fine dill branch. One stem, four whorls, each whorl a single
             <path> carrying its five rays as subpaths â€” five path elements for a
             twenty-one-stroke frond. The whorls fade upward (.55 â†’ .38): the crown is
             furthest into the brine. Thread-thin on purpose; Â§14's fifth risk is
             material noise, and a heavy frond is the fastest way to get it. -->
        <svg class="pj-dill" viewBox="8 4 38 127" aria-hidden="true" focusable="false">
          <g fill="none" stroke="#526149" stroke-linecap="round">
            <path d="M42 130 C36 106, 30 82, 25 58 C22 42, 19 24, 16 8" stroke-width="1.1" opacity=".55"/>
            <path d="M30 82 C26 76, 21 71, 18 68 M30 82 C28 74, 25 68, 23 64 M30 82 C30 74, 30 67, 30 62
                     M30 82 C33 74, 35 69, 37 66 M30 82 C36 77, 40 74, 43 72" stroke-width=".9"  opacity=".50"/>
            <path d="M25 58 C21 52, 17 48, 14 45 M25 58 C24 51, 22 46, 20 42 M25 58 C25 51, 25 45, 25 41
                     M25 58 C27 51, 29 47, 31 44 M25 58 C30 53, 33 50, 36 48" stroke-width=".85" opacity=".46"/>
            <path d="M21 38 C18 33, 15 30, 12 27 M21 38 C20 32, 19 28, 18 24 M21 38 C21 32, 21 27, 21 24
                     M21 38 C23 32, 25 28, 26 25 M21 38 C25 34, 28 31, 31 29" stroke-width=".8"  opacity=".42"/>
            <path d="M17 18 C15 14, 13 11, 11 9 M17 18 C16 13, 16 9, 16 6 M17 18 C18 13, 19 10, 20 7
                     M17 18 C20 15, 22 13, 24 11" stroke-width=".75" opacity=".38"/>
          </g>
        </svg>
        <span class="pj-seeds"  aria-hidden="true"></span>          <!-- Â§9.5 -->
        <span class="pj-bed"    aria-hidden="true"></span>          <!-- Â§9.5 -->
        <span class="pj-bubble" aria-hidden="true"></span>          <!--     inert at rest -->

        <span class="pj__refract"  aria-hidden="true"></span>       <!-- Â§9.6 -->
        <span class="pj__meniscus" aria-hidden="true"></span>       <!-- Â§9.6 -->
      </div>

      <!-- â•â•â• Â§9.7 / Â§9.8 / Â§9.9 â€” THE STICKER â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
           â€¹app nodeâ€º THE EXISTING [data-m2-hero] NODE, MOVED HERE. The mounter does
           what _m2-box.js:104 already does â€” insertBefore/appendChild â€” and adds ONE
           class. Not copied, not re-rendered, not wrapped in a second box: a wrapper
           would have to be sized identically to the card inside it and would add a
           box between the jar and the sticker for no gain. -->
      <div class="m2hero pickle-jar__label" data-m2-hero data-face="birth">

        <div class="m2bface">                                        <!-- Â§9.8, the ink -->
          <!-- â˜… INSERTED BY THE MOUNTER as the FIRST child of .m2bface. A DIRECT
               child, never wrapped: a `.bp-field` wrapper around the existing hooks
               was written and thrown away, because it costs .m2face-div,
               .m2bface__name, .m2bface__marks and .m2bface__wall--bot their status as
               `.m2bface > *`, which is the selector styles.css:3892 uses to hand the
               pointer back on a pointer-events:none face. _six-live.js:712/:731
               re-asserts that inline for the marks, so they would have survived â€”
               silently, by a second mechanism, which is exactly the kind of
               load-bearing accident this repo's comments keep warning about. -->
          <p class="bp-inst">Blue Room Preserves</p>

          <!-- everything below is the SHIPPED markup from app.js:2957-2984, byte for
               byte, with no renamed hook and no changed string -->
          <div class="m2face-head"><span class="m2face-meta">THE BIRTH READING</span>
            <span class="m2face-glyph">&#10022;</span></div>
          <div class="m2face-div m2bface__headrule"></div>
          <div class="m2face-name m2bface__name">The Crowned Name</div>

          <!-- â˜…â˜… EXACTLY SIX CHILDREN, ALL BARE <li>, AND THIS EXHIBIT ADDS NONE.
               _six-live.js:775 resolves the active mark with indexOf over
               ul.children, :774 reads ls.length for the arrow wrap, and :803 iterates
               ul.children writing aria-current. A seventh child breaks all three
               silently. The tint Â§10 asks for is an li::before â€” a pseudo-element is
               not a child node. The <li> also stay <li>: :732-733 already makes them
               tabindex="0" role="button", and a nested <button> would make
               activeElement the button and return âˆ’1 from :775, killing arrow
               navigation, Enter/Space and the focus handler together. -->
          <ul class="m2bface__marks">
            <li>Sun sign</li><li>Year animal</li><li>Life path</li>
            <li>Rune</li><li>Trigram</li><li>Hexagram</li>
          </ul>

          <div class="m2bface__wall m2bface__wall--bot">
            <div class="m2face-div"></div>
            <div class="m2face-orient">By birth alone</div>
          </div>
          <span class="m2tick tl" aria-hidden="true"></span>
          <span class="m2tick br" aria-hidden="true"></span>
        </div>

        <div class="m2face" aria-hidden="true"> â€¦ </div>   <!-- the tarot face, untouched -->
      </div>

      <!-- Â§9.10 Â· three regions of EXPOSED glass, never one masked plane -->
      <span class="pj__gleam" aria-hidden="true"></span>
      <span class="pj__edge"  aria-hidden="true"></span>
      <span class="pj__foot"  aria-hidden="true"></span>

      <!-- Â§9.11 Â· the lid and the security seal. Each notch carries BOTH a positional
           --i (which one it is) and an ordinal class (which one to light): two hooks
           because they answer two questions, and collapsing them into :nth-of-type is
           the parity trap _m2-pod.css:317 already paid for. -->
      <span class="pj__lid" aria-hidden="true">
        <span class="pj__notch pj__notch--1" style="--i:1"></span>
        <span class="pj__notch pj__notch--2" style="--i:2"></span>
        <span class="pj__notch pj__notch--3" style="--i:3"></span>
        <span class="pj__notch pj__notch--4" style="--i:4"></span>
        <span class="pj__notch pj__notch--5" style="--i:5"></span>
        <span class="pj__notch pj__notch--6" style="--i:6"></span>
      </span>
      <span class="pj__strip" aria-hidden="true"></span>
    </div>

    <!-- THE TAROT EXHIBIT â€” a SIBLING of .pickle-jar, not a second copy of the card.
         The card node exists once and re-seats itself between the two rects by CSS
         alone. Â§16's dry black-card exhibit, same niche, same seat, same footprint. -->
    <div class="dry-mount" aria-hidden="true">
      <span class="dry-mount__ledge"></span>
      <span class="dry-mount__clip dry-mount__clip--l"></span>
      <span class="dry-mount__clip dry-mount__clip--r"></span>
      <span class="dry-mount__plate"></span>   <!-- deliberately empty; see the CSS -->
    </div>
  </div>
</section>
```

**Two SVG ids are document-global.** `bpVegRidge` / `bpVegForm` are unique in this document (app.js's hero SVGs use `mwGold` / `mwInk`, app.js:2914-2915) â€” but if `.pj-veg--crop` is ever mounted, give its defs their own ids first, or the second definition silently wins for both.

---

# (c) The JS

### `_m2-preserve.js` â€” the interaction module (complete, self-contained)

```js
/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   M2 Â· THE BIRTH PRESERVE â€” the interaction.   `_m2-preserve.js`

   Loaded from index.html beside _m2-box.js; inert until the mounter calls wire().
   THREE jobs, and nothing else:

     1. Â§10's pointer law â€” the reflections and the caustic move; the jar and the
        label never do. This file publishes a normalised [-1,1] pair and has no
        opinion about pixels; the magnitudes live in _m2-preserve.css Â§3 and Â§9.
     2. Â§10's one bubble â€” 640ms, one at a time, on DELIBERATE ACTIVATION ONLY.
     3. Â§10's visibility law and reduced motion.

   â˜…â˜… WHAT THIS MODULE DELIBERATELY DOES NOT DO, and it is the whole design:

   IT DOES NOT OWN THE MARKS. `_six-live.js:730-747` already made each <li> a
   control (pointer-events, tabindex="0", role="button") and owns
   pointerenter/focus/click on it; `:773-784` owns Enter/Space and
   ArrowUp/ArrowDown, resolving the active mark by finding document.activeElement
   among ul.children (:775). This file binds TWO passive delegated listeners on
   the <ul> and never calls preventDefault, never moves focus, never
   stopsPropagation, never renders, and never adds a child to the <ul>. It is a
   paint listener, not a second controller â€” Â§12's ban is on duplicating reading
   state, and no state is read or written here.

   IT DOES NOT LIGHT THE NOTCH. That is six `:has()` rules in the stylesheet,
   driven by the `aria-current` the module already writes (_six-live.js:627), so
   the exhibit answers the marks with no script at all â€” which is what Â§15's
   motion gate ("the design remains complete with every animation disabled")
   effectively asks for.

   IT DOES NOT OWN THE FACE. m2SetFace (app.js:3312) writes data-face at the 240ms
   midpoint of a 480ms turn (:3327, :3345) and toggles `.is-turning` around it. The
   exhibit reads both with `:has()`. No second controller, no second timer, and
   reduced motion is inherited free because m2SetFace already branches at :3341.

   â˜… IT SURVIVES A FROZEN rAF, WHICH THE PREVIEW PANE GUARANTEES. Every pointer
   property has a correct value of 0 at rest, and pointerleave writes 0 DIRECTLY
   as well as through the frame â€” a queued frame that never lands would otherwise
   leave the exhibit displaced forever after one gesture. No IntersectionObserver
   anywhere; the pane never delivers one.
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
(function (root) {
  "use strict";
  var doc = root.document;

  var BUBBLE_MS = 640;      /* Â§10 caps it at 700; a value on its limit leaves no
                               room for the easing's tail, and 640 is the house's
                               own settled interval */

  function reduced() {
    return !!(root.matchMedia && root.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  function wire(box) {
    if (!box || box._bpWired) return;
    box._bpWired = true;

    var niche  = box.querySelector(".birth-preserve__niche");
    var bubble = box.querySelector(".pj-bubble");
    var ul     = box.querySelector(".m2bface__marks");
    if (!niche) return;

    var bubT = null, wcT = null;

    /* â”€â”€ 1 Â· THE BUBBLE, ON THE FORCE PATH ONLY. â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
       PART 0 forbids "anything that â€¦ repeats" (docs/SURFACE_BRIEF_V1.md:37), and
       `_six-live.js:735-737` funnels pointerenter, focus AND click through one
       ask() â€” so binding to that funnel's full surface means a pointer sweep down
       the six, or six arrow presses, fires six bubbles. Â§10's own wording is "one
       small bubble releases â€¦ only one notch and one bubble may be active at
       once", which a sweep cannot honour.
       So: click, and Enter/Space. The same two gestures _six-live.js treats as
       FORCE (:761-766, "click FORCES, which turns the click into deal me
       another"). Hover and arrow-traverse light the notch and tint the mark â€”
       both instant, neither repeating â€” and release nothing.
       ONE element, restarted. Not a pool, not a spawner; nothing is created or
       destroyed per activation, so there is no node churn on the most expensive
       element on the page. */
    function markIndex(t) {
      var li = t && t.closest && t.closest(".m2bface__marks > li");
      if (!li || !ul) return -1;
      return Array.prototype.indexOf.call(ul.children, li);
    }

    function release(i) {
      if (!bubble || i < 0) return;
      if (reduced() || doc.hidden) return;      /* Â§10 reduced motion + visibility */

      /* --i is 1-based and sets the release depth in the stylesheet; the six
         points are spread down the band the six printed marks occupy, so the
         release is legible as an answer to the thing you touched. Deterministic,
         never random: Â§6 calls the six "a seal system, not decoration", and a
         randomised release would make it a toy. */
      bubble.style.setProperty("--i", String(i + 1));

      /* â˜… will-change IS ARMED AND CLEARED BY ARITHMETIC, and app.js:3399-3409
         records the counter-example this is written against: a hint set on an
         element whose animationend never fired, holding compositor memory for a
         whole session. Armed only after the two guards above prove the element
         will actually animate; cleared by animationend AND by a timer that
         cannot be skipped. Both paths are idempotent. */
      bubble.classList.remove("is-rising");
      void bubble.offsetWidth;                  /* one forced reflow, per activation */
      bubble.style.willChange = "transform, opacity";
      bubble.classList.add("is-rising");

      root.clearTimeout(bubT); root.clearTimeout(wcT);
      bubT = root.setTimeout(function () { bubble.classList.remove("is-rising"); }, BUBBLE_MS);
      wcT  = root.setTimeout(function () { bubble.style.willChange = ""; }, BUBBLE_MS + 80);
      bubble.addEventListener("animationend", function () { bubble.style.willChange = ""; }, { once: true });
    }

    function onClick(e) { release(markIndex(e.target)); }
    function onKey(e) {
      if (e.key !== "Enter" && e.key !== " " && e.key !== "Spacebar") return;
      /* the same `at < 0` guard `_six-live.js:777` uses, and for the same reason:
         when focus is not on a mark the keys belong to the page. This handler
         never calls preventDefault, so the module's own Enter/Space handling is
         untouched either way. */
      release(markIndex(doc.activeElement));
    }
    if (ul) {
      ul.addEventListener("click", onClick, { passive: true });
      ul.addEventListener("keydown", onKey, { passive: true });
    }

    /* â”€â”€ 2 Â· THE POINTER LAW (Â§10). ONE rAF-throttled handler, TWO properties.
       â˜… THE PROOF THAT NOTHING FORBIDDEN MOVES IS A GREP: --bp-px and --bp-py
       appear on exactly four selectors in _m2-preserve.css, and neither
       `.pickle-jar` nor `.pickle-jar__label` is one of them. A future layer
       cannot move the jar by accident without the diff showing it. */
    var pending = false, px = 0, py = 0;
    function write() {
      box.style.setProperty("--bp-px", px.toFixed(3));
      box.style.setProperty("--bp-py", py.toFixed(3));
    }
    function onMove(e) {
      if (doc.hidden) return;
      var r = niche.getBoundingClientRect();
      if (!r.width || !r.height) return;
      px = ((e.clientX - r.left) / r.width  - 0.5) * 2;
      py = ((e.clientY - r.top)  / r.height - 0.5) * 2;
      if (pending) return;
      pending = true;
      root.requestAnimationFrame(function () { pending = false; write(); });
    }
    function enter() { box.classList.add("is-live"); }     /* Â§12: will-change only
                                                              while the pointer works */
    function rest() {
      px = 0; py = 0;
      write();                 /* â˜… DIRECTLY, not only through the frame â€” see the
                                  header on the frozen-rAF pane */
      box.classList.remove("is-live");
    }

    /* â˜… REDUCED MOTION GETS NO LISTENER AT ALL, rather than a listener that writes
       zeros. Â§10's "no parallax" as an absence of machinery. The stylesheet pins
       the two properties as well, so the value can be neither written nor read. */
    if (!reduced()) {
      niche.addEventListener("pointerenter", enter,  { passive: true });
      niche.addEventListener("pointermove",  onMove, { passive: true });
      niche.addEventListener("pointerleave", rest,   { passive: true });
    }

    /* â”€â”€ 3 Â· THE VISIBILITY LAW (Â§10: "motion stops when the page is not
       visible"). There IS no idle motion to stop â€” the exhibit is completely
       still by design â€” so this is about the two things a hidden page can be left
       holding: a running bubble and a compositor hint. Both are dropped. */
    function onHide() {
      if (!doc.hidden) return;
      root.clearTimeout(bubT); root.clearTimeout(wcT);
      if (bubble) { bubble.classList.remove("is-rising"); bubble.style.willChange = ""; }
      rest();
    }
    doc.addEventListener("visibilitychange", onHide);

    box._bpTeardown = function () {
      doc.removeEventListener("visibilitychange", onHide);
      root.clearTimeout(bubT); root.clearTimeout(wcT);
      if (bubble) bubble.style.willChange = "";
      /* the ul and niche listeners are NOT removed by hand: they die with the
         nodes, which is the point of having bound them there and not on document
         â€” the stacking bug _six-live.js:755-760 records. */
    };
  }

  function unwire(box) {
    if (box && box._bpTeardown) { box._bpTeardown(); box._bpTeardown = null; box._bpWired = false; }
  }

  root.BPPreserve = { wire: wire, unwire: unwire };
})(window);
```

### Additions to `_m2-box.js` â€” a fourth MODE, no `renderWall()` edit

```js
// â”€â”€ line 42-43, MODE detection â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  var MODE = (arg === "vitrine" || arg === "v") ? "vitrine"
           : (arg === "preserve" || arg === "jar") ? "preserve"
           : (arg === "pod") ? "pod" : "box";
  var wantSunk = false;      // preserve only â€” Â§g switch one, PROUD is the default
  var wantPlain = false;     // preserve only â€” Â§g switch two, ambiguous is the default

// â”€â”€ line 59-63, styles() â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    else if (MODE === "preserve") style("m2pres-css", "_m2-preserve.css?v=491");
// â˜… THE CACHE TOKEN IS PER-ASSET: bumping app.js does not bump this file, and four
//   commits of correct CSS have already been invisible in this repo for exactly
//   that reason. Bump `v=` here when this stylesheet changes, and nowhere else.

// â”€â”€ line 66 / line 72, shell() and the wrap guard â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  function shell() { return doc.querySelector(".m2box, .br-vitrine, .m2pod, .birth-preserve"); }
    if (!h || h.closest(".m2box, .br-vitrine, .m2pod, .birth-preserve")) return false;

// â”€â”€ inside wrap(), beside the other branches â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    } else if (MODE === "preserve") {
      /* a <section> with a label, not a div: it is a self-contained exhibit inside
         the panel and Â§12 authors it that way. Everything inside is aria-hidden
         decoration except the card, which brings its own semantics. */
      box = doc.createElement("section");
      box.className = "birth-preserve";
      box.setAttribute("aria-label", "The Birth Reading preserve");
      inner = doc.createElement("div"); inner.className = "birth-preserve__niche";
    }

// â”€â”€ after `inner.appendChild(h)` at line 104, REPLACING it for this mode â”€â”€â”€â”€â”€
    if (MODE === "preserve") {
      /* ORDER IS THE COMPOSITE (Â§9). What belongs BEHIND the sticker goes in before
         it, what belongs IN FRONT after it â€” the builder's own note at
         _m2-box.js:90-95. z-index in _m2-preserve.css enforces it a second time, so
         a future re-order fails visibly rather than silently. */
      ["seam", "sill", "contact", "caustic"].forEach(function (n) {
        inner.appendChild(el("span", "birth-preserve__" + n));
      });
      var jar = el("div", "pickle-jar"); jar.removeAttribute("aria-hidden");
      inner.appendChild(jar);
      jar.appendChild(el("span", "pj__neck"));
      jar.appendChild(el("span", "pj__shoulder"));
      var body = el("div", "pj__body"); jar.appendChild(body);
      body.appendChild(svgVeg());                       /* Â§9.3 â€” see the markup */
      body.appendChild(el("span", "pj__brine"));        /* Â§9.4 */
      body.appendChild(svgDill());                      /* Â§9.5 */
      ["pj-seeds", "pj-bed", "pj-bubble", "pj__refract", "pj__meniscus"]
        .forEach(function (n) { body.appendChild(el("span", n)); });

      jar.appendChild(h);                               /* Â§9.7 â€” THE STICKER */
      h.classList.add("pickle-jar__label");

      /* â˜… THE ONE a11y CORRECTION, AND IT IS A LIVE DEFECT THIS EXHIBIT INHERITS
         RATHER THAN CREATES. app.js:2956 serves `.m2bface` aria-hidden="true", and
         _six-live.js:732-733 then puts tabindex="0" + role="button" on six <li>s
         inside it. Focusable controls inside an aria-hidden subtree is a hard ARIA
         violation (axe: aria-hidden-focus): the marks are reachable by Tab and by
         the module's own arrow handler, and a screen-reader user landing on one is
         told nothing, because the node is not in the accessibility tree. Â§2 requires
         the six to be "actual accessible controls", and a control inside an
         aria-hidden subtree is not one.
         Done HERE and not in renderWall(): reversible, inside Â§11's allowed change
         boundary (it is the exhibit), and one line to revert. The decorative parts
         carry aria-hidden individually instead â€” the markup block above. */
      var face = h.querySelector(".m2bface");
      if (face) {
        face.removeAttribute("aria-hidden");
        var inst = doc.createElement("p");
        inst.className = "bp-inst";
        inst.textContent = "Blue Room Preserves";      /* Â§8's institutional line */
        face.insertBefore(inst, face.firstChild);
      }

      ["pj__gleam", "pj__edge", "pj__foot"].forEach(function (n) {   /* Â§9.10 */
        jar.appendChild(el("span", n));
      });
      var lid = el("span", "pj__lid");                               /* Â§9.11 */
      for (var k = 1; k <= 6; k++) {
        var nk = el("span", "pj__notch pj__notch--" + k);
        nk.style.setProperty("--i", k);
        lid.appendChild(nk);
      }
      jar.appendChild(lid);
      jar.appendChild(el("span", "pj__strip"));

      var dry = el("div", "dry-mount");                              /* Â§16 */
      ["ledge", "clip dry-mount__clip--l", "clip dry-mount__clip--r", "plate"]
        .forEach(function (n) { dry.appendChild(el("span", "dry-mount__" + n)); });
      inner.appendChild(dry);

      /* the interaction, in its own module â€” the same hand-off as wireGlass(box) at
         _m2-box.js:135. Absent module = a correct, completely still exhibit: the
         notch still lights, the mark still darkens and tints, only the bubble and
         the pointer-reactive light are missing. */
      if (root.BPPreserve) root.BPPreserve.wire(box);
    }

// â”€â”€ unwrap(), before `box.remove()` at line 145 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (root.BPPreserve) root.BPPreserve.unwire(box);
    if (h) {
      h.classList.remove("pickle-jar__label");   /* or a second mount finds a hero
                                                    already labelled and the geometry
                                                    silently sticks */
      var f = h.querySelector(".m2bface");
      if (f) {
        f.setAttribute("aria-hidden", "true");   /* restore the shipped state exactly */
        var i2 = f.querySelector(".bp-inst"); if (i2) i2.remove();
      }
    }

// â”€â”€ apply(), beside the other branches at line 222-224 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    else if (MODE === "preserve") {
      box.classList.toggle("is-recessed", wantSunk);
      box.classList.toggle("is-plain-cucumber", wantPlain);
    }

// â”€â”€ bench(), a fourth radio + the two Â§g rows â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
      + '<label><input type="radio" name="mbmode" data-mb="mode" value="preserve"'
      + (MODE === "preserve" ? " checked" : "") + '> the preserve</label>'
    var presRows =
        '<label><input type="checkbox" data-mb="sunk"' + (wantSunk ? " checked" : "") + '> sunk into the wall</label>'
      + '<label><input type="checkbox" data-mb="plain"' + (wantPlain ? " checked" : "") + '> unmistakable cucumber</label>'
      + '<i>Two questions arithmetic cannot answer. <b>Is it being handed to you, or '
      + 'has it become part of the wall?</b> &mdash; proud is the default; PART 0 says '
      + 'a thing that has sunk in is no longer being handed to you. <b>Strange or '
      + 'funny?</b> &mdash; strange leaves a question only a reading resolves; funny '
      + 'resolves itself and converts nothing. Column shift 0.00px either way.</i>';
    // ...and in the change handler:
      if (k === "sunk")  wantSunk  = e.target.checked;
      if (k === "plain") wantPlain = e.target.checked;

// â”€â”€ index.html: load _m2-preserve.js BETWEEN _six-live.js (:138) and _m2-box.js
//    (:149). The `if (root.BPPreserve)` guard makes a wrong order fail to a still,
//    correct exhibit rather than an error â€” but it would fail SILENTLY, so the
//    order is stated rather than trusted.
```

---

# (d) The geometry table

**The chain** â€” every term an absolute length, no percentage anywhere in it:

```
seat    = clamp(400px, 56vh, 620px)                     â† .m2hero's own, styles.css:3716
track   = min(1180px,92vw) âˆ’ 630px âˆ’ 2Â·clamp(24px,3vw,52px)
jar_h   = min(seat âˆ’ 24, (track âˆ’ 32 âˆ’ 28) / 0.72)      â† both legs, one min()
jar_w   = jar_h Ã— 0.72     niche_w = jar_w + 28     niche_h = seat
label_h = jar_h Ã— 0.73 Ã— band     label_w = jar_w Ã— 0.58
```

| viewport | seat | track | jar hÃ—w | niche w | gap/side | label hÃ—w | text col | binds | ink fit |
|---|---|---|---|---|---|---|---|---|---|
| 1200Ã—800 | 448.0 | 402.0 | 424.0 Ã— 305.3 | 333.3 | **34.4** | 278.6 Ã— 177.1 | 157.1 | height | +41 |
| 1280Ã—800 | 448.0 | 470.8 | 424.0 Ã— 305.3 | 333.3 | **68.8** | 278.6 Ã— 177.1 | 157.1 | height | +41 |
| 1366Ã—768 | 430.1 | 468.0 | 406.1 Ã— 292.4 | 320.4 | **73.8** | 266.8 Ã— 169.6 | 149.6 | height | +30 |
| **1440Ã—900** | **504.0** | **463.6** | **480.0 Ã— 345.6** | **373.6** | **45.0** | **294.3 Ã— 200.4** | **180.4** | height | **+13** |
| 1600Ã—1000 | 560.0 | 454.0 | 536.0 Ã— 385.9 | 413.9 | **20.0** | 328.7 Ã— 223.8 | 203.8 | height | +47 |
| 1920Ã—1080 | 604.8 | 446.0 | 536.1 Ã— 386.0 | 414.0 | **16.00** | 328.7 Ã— 223.9 | 203.9 | **WIDTH** | +48 |
| 2560Ã—1440 | 620.0 | 446.0 | 536.1 Ã— 386.0 | 414.0 | **16.00** | 328.7 Ã— 223.9 | 203.9 | **WIDTH** | +48 |
| 1440Ã—700 | 400.0 | 463.6 | 376.0 Ã— 270.7 | 298.7 | **82.4** | 247.0 Ã— 157.0 | 137.0 | height | +10 |
| 768Ã—1024 áµ | 475.0 | 520.0 | 451.0 Ã— 324.7 | 352.7 | 83.6 | 296.3 Ã— 188.3 | 168.3 | height | +59 |
| 414Ã—896 áµ | 472.0 | 366.0 | 448.0 Ã— 322.5 | 350.5 | 7.7 | 294.3 Ã— 187.1 | 167.1 | height | +57 |
| 375Ã—812 áµ | 427.5 | 327.0 | 403.5 Ã— 290.5 | 318.5 | 4.2 | 265.1 Ã— 168.5 | 148.5 | height | +28 |
| 360Ã—740 áµ | 410.4 | 312.0 | 386.4 Ã— 278.2 | 306.2 | 2.9 | 253.9 Ã— 161.4 | 141.4 | height | +17 |
| 320Ã—568 áµ | 364.8 | 272.0 | 338.9 Ã— 244.0 | 272.0 | 0.0 | 232.6 Ã— 141.5 | 121.5 | WIDTH | **+2.7** |

áµ = below the 1199px collapse; there are no side columns there, so Â§13's 16px gutter is not owed and the page-edge clearance is `.menu__panel`'s own 24px padding + the gap: **40.2 / 31.7 / 28.2 / 26.9 / 24.0px** â€” every one clears Â§13's 24px floor, and 320px lands on it exactly.

**Column shift = +0.00px at every one of the thirteen viewports, in both axes.** Vertically because `--bp-seat` is `.m2hero`'s own clamp byte for byte and the niche's height *is* that seat. Horizontally because the stage track is `minmax(0,1fr)` between two fixed columns and the niche is capped at `track âˆ’ 32px`; at 1920 and above the width leg binds and lands on 16.00px, the Â§13 minimum, by construction rather than by luck.

**The vertical ink audit** (Â§8's own type, term by term, the number the whole responsive story hangs on):

```
  padding-top                          12.0
  BLUE ROOM PRESERVES  8px Ã— 1.35      11.0        + margin-bottom  3.0
  THE BIRTH READING / âœ¦  11px line box 17.0
  masthead rule  margin 9 + 1px        10.0
  crowned name   padding-top 4         +  24px Ã— 1.05 = 25.2      29.2
  marks margin-top                     16.0
  six marks  6 Ã— 13 line box + 5 Ã— 12  138.0   â† the 12px gap is a HARD FLOOR
  closing ledge  margin 11 + 1 + 10    22.0
  BY BIRTH ALONE  9px Ã— 1.2            11.0
  padding-bottom                       12.0
  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  TOTAL                               281.2 px   into 294.3 at 1440Ã—900
```

**IT DOES NOT FIT BELOW 862px OF VIEWPORT HEIGHT, and here is the number.** 281.2 Ã· (0.73 Ã— 0.84) = a 458.6px jar â†’ a 482.6px seat â†’ **56vh â‰¥ 482.6 â†’ viewport height â‰¥ 862px**. At 800px tall the label is 260px and the ink is 281 â€” a 21px overrun; at the 400px seat floor the overrun is 50. The `@media (max-height: 861px)` branch closes it by taking **44px out of whitespace only** (six spacing tokens) and moving the label band .84 â†’ .90, never touching the type and never touching the 12px gap. Compressed budget: **237.2px**, which then fits every supported viewport with 10â€“59px in hand.

Three further numbers the builder will want:

- **A permanent two-line reserve for the crowned name** â€” which real generated names need (`arcana-name-engine.js` emits up to 29 characters, ~306px at 24px) â€” costs +25.2px, needs a 499.7px jar, a 523.7px seat, and a **935px-tall viewport**. It is deliberately *not* built in now, per the brief's Â§e12; the storefront string is the static placeholder.
- **"The Crowned Name" at 24px Cormorant computes to 169px in a 180.4px field at 1440.** 11px of slack â€” and it is the one figure in this build resting on an unverified font metric (~0.44em average advance). At 25px it is 176px and 4px of slack, which is why 24px was taken. If Cormorant runs wider than 0.44em and the name wraps at 1440, the label overruns by ~12px; the one-token fix is `--bp-label-band: .84 â†’ .88`, which buys exactly 14px and costs the free brine band 7px each side.
- **320Ã—568 fits by 2.7px.** That is a coincidence, not a margin. A real margin needs 20px more label height â†’ a 364px jar â†’ a 290px track â†’ **a 338px-wide viewport**. A 360px phone has 17px in hand.

---

# (e) The contrast table

WCAG 2.x, computed from declared hex, pipeline calibrated against the repo's own two stated figures: it returns **4.409** where `_m2-box.css:24` says 4.41 (#6a5c45 on #dcd4c2) and **6.091** where `styles.css:4013` says 6.09 (#6b4c14 on #e7e2d7). Every ratio is quoted against **#dfcfad**, the *darkest* cream anywhere on the film â€” the worst case, not the average. Gate: **4.5:1** (Â§8).

| element | ink | ground | ratio | |
|---|---|---|---|---|
| The Crowned Name Â· 24px serif | `#251b12` | `#dfcfad` | **10.98** | |
| THE BIRTH READING Â· 9.5px mono | `#332619` | `#dfcfad` | **9.54** | |
| BLUE ROOM PRESERVES Â· 8px mono | `#4a3a26` | `#dfcfad` | **7.10** | |
| BY BIRTH ALONE Â· 9px mono | `#4a3a26` | `#dfcfad` | **7.10** | |
| âœ¦ glyph Â· 11px | `#6b4c14` | `#dfcfad` | **5.12** | Â§7's gold at 2.09/1.53 fails; this is the house's own gold-leaf pigment |
| active-mark margin rule | `#251b12` | `#dfcfad` | **10.98** | non-text; the non-hue cue |
| focus ring Â· 2px | `#251b12` @ .85 | `#dfcfad` | **7.66** | 1.4.11 owes 3:1; the module's own ring is 3.07 |
| registration ticks | `rgba(28,21,13,.74)` | `#dfcfad` | **6.10** | shipped alpha, unchanged |

**The six marks, through every layer Â§9 and Â§10 put on them:**

| mark | pigment | rest | + varnish .06 | active ink | active + tint .10 + varnish .06 |
|---|---|---|---|---|---|
| SUN SIGN Â· gold leaf | `#5c400f` | 6.23 | **5.43** | 8.21 | **6.23** |
| YEAR ANIMAL Â· cinnabar | `#67331c` | 6.61 | **5.78** | 8.51 | **6.37** |
| LIFE PATH Â· iron gall | `#28313f` | 8.53 | **7.33** | 10.17 | **7.51** |
| RUNE Â· stone | `#35492c` | 6.38 | **5.51** | 8.22 | **6.13** |
| TRIGRAM Â· verdigris | `#20494a` | 6.47 | **5.60** | 8.31 | **6.20** |
| HEXAGRAM Â· ash | `#4a423b` | 6.41 | **5.54** | 8.31 | **6.25** |

**Floor across every state on the label: 5.43:1** (SUN SIGN at rest, under the varnish). Gate 4.5. Margin 0.93. The belt figure â€” resting ink under *both* the tint and the varnish, a state that cannot occur because the tint only appears where the ink has already darkened â€” is **4.77**, and it is what caps the tint at Î± .10 and the varnish at Î± .06. Nothing on this label is under 4.5:1, so there is nothing in this section to report as a defect.

**Two defects were found and are fixed by this file, both inherited rather than created:**

| defect | measured | fix |
|---|---|---|
| `_six-live.js:65` `.sx-on li{opacity:.42}` | five marks at **1.94â€“2.16:1** | the dim is killed at (0,3,1); the signal inverts to lighting the one |
| `?m2=dark` tokens on cream, with no override | `--bf-ink` **1.22:1**, marks **1.53â€“2.51:1** | every token declared on the film at (0,3,0), unconditionally |

**And two findings that decided the palette:**
- Â§7's antique gold `#a88c50` = **2.09:1** / `#c1a669` = **1.53:1** on the label cream. Both fail even the 3:1 owed a non-text mark. Gold is restricted to the niche seam and the lid; if a glyph must read as metal, `#6f5430` = 4.58.
- The **shipped** six pigments clear 4.5 bare (5.12â€“7.18) and land at **3.96:1 â€” a failure â€”** the moment Â§10's own tint and Â§9's own varnish are on them. The deepened set is what makes the spec's own interaction legal, and its worst pairwise Î”E76 is **16.3** against the shipped set's 9.4.

Decorative hairlines, measured so a later pass has the number rather than a shrug (1.4.11 not owed â€” the reading is complete without them): masthead rule `.30` = **1.82**, closing ledge `.50` = **2.93**. The masthead stays lighter than the ledge, preserving BR-S362's second correction.

---

# (f) Seams I could not close

**1 Â· The jar's size â€” the four layers were built to three different objects.** Layer 1: jar = 0.88 Ã— the niche opening, niche wider than the card. Layer 2: jar = the card's clamp verbatim. Layer 3: label sized from Â§5's 42â€“46% figure. Layer 4: niche = seat Ã— .74, jar = 90% of it. I re-derived from the correction brief and **moved the Â§13 16px gutter from the jar to the niche** â€” the brief put it on the jar, which leaves the recess itself outside the gate, and at 1920 the jar would sit exactly on the floor while the niche's own 28px of cheek lapped onto the side columns. The niche is the outermost painted thing; it is what the gate is about.

**2 Â· Â§5's label-height band is unbuildable and I did not follow it.** 62â€“68% of body height gives a 238px label at 1440; Â§8's own type measures 281px. It misses by 43px at the *best* desktop viewport, and both cheap outs â€” shrinking type, closing the mark gap â€” are forbidden (SC 2.5.8 makes the 25px row pitch a hard floor against a 24px minimum). I took 84%, on Â§2's "optically calm and fully readable" and Â§15's hierarchy gate. **Â§5's label band and Â§8's type cannot both be honoured, and this is the choice I made.** Body at 73% is outside Â§5's 66â€“70% for the same reason: Â§5's five bands sum to 93â€“105%, so body has to be the derived remainder.

**3 Â· `transform: none` vs `perspective(1200px)`.** Layer 1 argued `none` destroys the stacking context every child of `.m2hero` depends on. It does not, here: `.m2hero` is `position: relative` already (styles.css:3702), so the containing block never depended on the transform, and the film's explicit `z-index` creates the stacking context on its own. I took `translateX(-50%)` as the only transform, which is what B8 wanted and what the centring needs anyway. **If a future edit removes that `z-index`, the objection becomes real** â€” the comment is the whole defence.

**4 Â· The six pigments: shipped vs deepened.** Layers 3 and 4 both kept the shipped parchment set; the brief ordered them deepened. I took the deepened set, and the arithmetic â€” not the brief â€” is the reason: shipped + Â§10's tint + Â§9's varnish = **3.96:1**, a failure on the exhibit's primary content. This is the one place the assembly changes a shipped pigment identity, and the builder should know it happened.

**5 Â· Container queries.** Layer 3 used `container-type: inline-size` + `cqw`; layer 4 used `container-type: size` + `cqh`. Incompatible, both new to this repo, both unverified, and layer 4's `size` containment applies `contain: size layout style` to a node two other modules query into. **I cut both.** The type is at Â§8's stated px and the fit is a single height media query â€” which is also what makes the vertical audit exactly true rather than approximately.

**6 Â· The bubble.** Layer 2 built a CSS-only bubble driven by `--i`; layer 4 built a JS one firing on `pointerover`/`focusin`, which would release six on a pointer sweep. I took layer 4's mechanism on layer 2's animation, restricted to the **force path only** (click, Enter/Space â€” the same two gestures `_six-live.js:761-766` already treats as "deal me another"). Hover and arrow-traverse light the notch and tint the mark and release nothing.

**7 Â· The `clipPath`.** Layer 1's shared `url(#pjVessel)` in objectBoundingBox units is the more elegant vessel, and I cut it: the id is document-global (a second mount silently redefines it), and non-uniform units mean every clipped layer must keep the identical box or the shoulder reappears mid-liquid. Three stacked boxes instead â€” neck, one clip-path polygon shoulder, plain rounded body. **The cost is real: the S-curve shoulder is now a six-point polygon rather than a bezier, and it is the single highest-value thing to look at first.** It is one `clip-path` line to correct.

**8 Â· The dill at Â§9 layer 5, not layer 3.** Layer 2's deviation, and I kept it, because its measurement decides it: at layer 3 a 0.9px stroke composites to 1.24:1 and is not present; at layer 5 it reaches 1.45:1. This is the one place the built stack deviates from Â§9's stated order, and it deviates toward the physics â€” a frond pressed to the front pane is how dill sits in a packed jar.

**9 Â· `aria-hidden` on `.m2bface`.** Layer 3 found a live axe `aria-hidden-focus` violation on the shipped storefront: `app.js:2956` serves the birth face `aria-hidden`, and `_six-live.js:732-733` then puts `tabindex="0"` inside it. Â§2 requires the six to be "actual accessible controls" and a control inside an aria-hidden subtree is not one. **I removed it â€” in the mounter, not in `renderWall()`, so it is one line to revert and `unwrap()` restores the shipped state exactly.** It does change the accessibility tree of a surface Â§11 calls immutable; it is inside the exhibit, so Â§11 permits it, and it is flagged rather than slipped in.

**10 Â· What I could not resolve at all: 320px.** It fits by 2.7px of vertical slack and 1.7px of horizontal slack on the crowned name, both computed from an unverified Cormorant advance. That is a coincidence, not a margin. I refused the fix that would close it comfortably â€” `--bp-label-band: 1.0` â€” because at 1.0 the label fills the body, the free brine above and below goes to zero, and the meniscus lands on the label's top edge, breaking two of Â§2's absolute truths to pass a gate. **The number that gives it a real margin is a 338px viewport.**

**Nothing here has been seen.** Every figure above is computed from declared values and from source I read; none is sampled from a paint. The gates Â§15 settles by looking â€” silhouette, hierarchy, adhesion, taste, the five-second test â€” are untouched by any of it. I can tell you the columns do not move and the floor is 5.43:1. I cannot tell you whether it lands as a rare preserved object first and a pickle jar second, and that is the only question the spec says decides it.

**Files:** `C:\Users\nilsj\AppData\Local\Temp\claude\C--Users-nilsj-OneDrive-Documents-blue-room-scan-room\a06f3317-3800-4381-891d-c04f82866c1b\scratchpad\_m2-preserve.css` and `\_m2-preserve.js` (scratch copies, validated); `\bp.py` and `\geo.py` are the two scripts that produced every number in (d) and (e) and are re-runnable.


=================== GATE RUN ===================

# GATE RUN â€” THE BIRTH PRESERVE

Every figure below was recomputed from source. Calibration: my WCAG pipeline returns **4.409** where `_m2-box.css:24` says 4.41 and **6.091** where `styles.css:4013` says 6.09, so it agrees with the repo's own two published numbers.

**Headline: two hard FAILs, both in the half of the object the assembler built last and measured least â€” the Tarot exhibit. On the shipped parchment deck the dry-mount card's body ink measures 1.01:1. The card is blank.**

---

## THE TWELVE GATES

### 1 Â· ORIGINAL-MENU PRESERVATION â€” **PASS** (with one flagged mutation)

- **Namespace, mechanically checked on the delivered file.** `grep -E "^[ ]*[.a-zA-Z@#\[][^{}/]*\{"` filtered against `birth-preserve|pickle-jar|\.pj-|\.pj__|dry-mount|@media|@keyframes` returns **zero rows**. Every rule head carries an exhibit token. `!important` 0 Â· `mix-blend-mode` 0 Â· `url(#â€¦)` in CSS 0 Â· `infinite` 0 Â· `html.m2-parch` 3 occurrences in 2 rules, as claimed.
- Four rules begin outside the exhibit (`html.m2-parch .menu__draw:has(â€¦)` Ã—2, `.menu__draw:has(â€¦)` Ã—2) but every one of them has `.pickle-jar__label` as its subject. They restyle nothing outside. Not a failure.
- **Vertical**: `--bp-seat: clamp(400px,56vh,620px)` is byte-identical to `styles.css:3716`, and `.birth-preserve{height:var(--bp-seat)}` is the whole guarantee. It matters because `.menu__draw` is `grid-template-rows: 1fr auto 1fr` (**styles.css:3224**, not :3223 as the file's comment says â€” :3223 is `grid-template-areas`) with `.menu__draw-ctrl`/`-head` both `align-self:center` (**:3231-3232**; the correction brief's ":3255-3256" is wrong, :3255 is `.menu__draw-herosub`). Î” = 0.
- **Horizontal**: the stage track is `minmax(0,1fr)` (**styles.css:3222**) between fixed 300px/330px columns, so content cannot grow it. `.menu__draw-stage` is `align-self:center; display:flex; flex-direction:column; align-items:center` (**styles.css:3254**) and was already full-track-width, so `.menu__draw-stage:hover` â€” which drives `.m2read__seg--*` at :3658-3668 and `.m2hero` at :3533 â€” fires over exactly the same box as before. Î” = 0.
- The `<li>` are moved, not rebuilt, so `_six-live.js`'s per-node listeners (`:730-747`) and the `ul` keydown handler (`:773`) survive the move. Focus order unchanged.
- **Flagged mutation**: the mounter does `face.removeAttribute("aria-hidden")` on `.m2bface` (shipped `aria-hidden="true"` at **app.js:2956**). This is inside the exhibit, Â§11 permits it, `unwrap()` restores it, and it fixes a real `aria-hidden-focus` violation. Correct call, correctly flagged. Not a gate failure.

### 2 Â· SILHOUETTE â€” **FAIL** (and this is the gate with no arithmetic anywhere in the file)

The file computes contrast for eight text elements and six pigments and **never once computes the jar against the wall it is supposed to stand out from.** From its own declared hex:

| plane | vs backplate `#06090e` |
|---|---|
| deep glass `#0d1a20` | **1.13 : 1** |
| glass edge `#14262a` | **1.27 : 1** |
| lid mid `#141920` | **1.13 : 1** |
| lid top `#1b2129` | **1.23 : 1** |
| sill `#1a2028` | 1.22 : 1 |

The correction brief set the standard itself (Â§e9: *"below the ~3:1 a plane needs to separate at thumbnail"*) and the assembler honoured it for the brine (`#8f8150` capped, 2.52:1) â€” then left the vessel at 1.13. Below the fill line the brine carries the shape. **Above it there is nothing**: lid 8% + neck 5% + shoulder 7% + the 14px air band = the top fifth of the object, which is precisely what Â§15 names â€” *"with the label hidden, the silhouette **and lid** still identify a preserving jar."* In monochrome at 120px that fifth is a black rectangle on a black rectangle.

Also: the file's own Â§2 comment claims *"the step that does the work is sill against cheek â€” 4.38Ã—."* L(`#1a2028`)/L(`#080c12`) = .01406/.00358 = **3.93Ã—**. The number does not reproduce.

### 3 Â· HIERARCHY â€” **CANNOT-CHECK-WITHOUT-A-BROWSER** (blur test, five-second test)

The arithmetic that *supports* it is sound: label plane 10.98:1 for the crowned name, 9.54 for the product line, 7.10 for both metadata rows, 5.43:1 floor across every mark state. All fourteen figures in table (e) reproduce exactly on my pipeline. The one structural risk the assembler names honestly: the label keeps 277px of the shipped card's 283px of ink inside a 294px plane against the card's 476px â€” **ink lost: none, air lost: nearly all.** Â§2 requires the label's centre to be "optically calm" and calm is what the air was buying. Only a look settles it.

### 4 Â· ADHESION â€” **PASS on the reflection law, FAIL on the perimeter**

**No reflection crosses the label â€” verified geometrically, not taken on trust:**
- `.pj__gleam` â€” `height: calc(var(--bp-label-top) âˆ’ var(--bp-jar-h)*.08 âˆ’ 2px)`, stops 2px above the film. Its 8px translate is horizontal only. âœ“
- `.pj__edge` â€” `width: calc((var(--bp-jar-w) âˆ’ var(--bp-label-w))/2)` = 21% of jar width; the label spans 21%â†’79%. Abuts, never overlaps, and its gradient is already at 0Î± by 52% of its own width (â‰ˆ10.9% of the jar). âœ“
- `.pj__foot` â€” `top: calc(var(--bp-label-top) + var(--bp-label-h))`. âœ“
- Everything liquid is inside `.pj__body` (z 1); the film is z 6. `.pj__lid` (0â†’8%) and `.pj__strip` (2.5â†’14%, diamond to ~15%) end at 72.7px against a label top of 124.05px at 1440. âœ“
- `.is-recessed` lifts `.birth-preserve__niche::before` to z 4, over the jar â€” but the cheek returns are `calc(21px Ã— .22)` = **4.62px** from each niche edge, and the label's nearest edge is 14px of cheek + 21% of 345.6px = 86.6px away. âœ“ Genuinely safe.

**But the adhesive perimeter is applied on two sides only.** `::before`'s first layer is `linear-gradient(90deg, â€¦)` â€” left and right. There is **no 180deg layer**, so the film's top and bottom edges carry no adhesive darkening at all. And the second layer is dead paint: `radial-gradient(126% 112% at 50% 42%, transparent 0 62%, â€¦)`. Along the centre lines the ray never reaches 62% (0.62 Ã— 1.26 = 78% of box width, half-width is 50%; 0.62 Ã— 1.12 = 69% of box height, the far edge is 58%). At the worst corner, âˆš((0.5/1.26)Â² + (0.58/1.12)Â²) = **0.652** â†’ interpolated alpha **.008**. The vignette the file spends 14 lines explaining and capping is invisible everywhere.

So the whole adhesion case rests on: the cucumber's occluded third (real, strong), the interrupted mould seam at `left 63%` (real, .07Î±), a 0.5px inset ring (sub-pixel), and a 14px darkening on two of four edges. Thinner than the file claims.

**Second adhesion defect â€” Â§9's stated stack is not the built stack.** The file's own header says *"Source order and z-index agreeâ€¦ Â§9's own warning is answered twice."* It is not: the label's `::before` (perimeter, layer 7) carries `z-index: 1`, while `.m2bface` (layer 8, ink) and `.m2bface__marks::after` (layer 9, varnish) are positioned descendants at z-index auto in the same stacking context (`.pickle-jar__label`, which is `position:relative` + `z-index:6`). **Layer 7 composites above layers 8 and 9.** The perimeter-over-ink half is physically right and the contrast ledger already assumed it; the varnish-under-perimeter half is not.

### 5 Â· TASTE â€” **CANNOT-CHECK-WITHOUT-A-BROWSER**, one letter-of-spec deviation recorded

Â§8's *"Preferred closing: SEALED AT FIRST BREATH Â· NOT REVISED"* and `REGISTER 01` are both cut. That is the correction brief's B6, followed correctly and for good reasons (36 chars against Â§8's own ~24 rule; a lot code is the grocery tell; `docs/CLAIM_AUDIT_V1.md` on the birth-observation claim). Where my brief and the spec disagree the spec wins â€” so record this as **Â§8 not met to the letter, by a documented decision.** It needs the builder's ratification, not mine.

### 6 Â· BLUE ROOM â€” **PASS**

Warm is confined to the film (`#dfcfad`â€“`#eadcbd`), the brine (`#8f8150` peaking at .21Î±), the caustic (.20Î± over 44% of the jar's width in a 14px band), and four hairline gold seams. `--bp-back #06090e` and `--bp-cheek-c #080c12` are the two darkest values on the page and both are inside the opening â€” a genuinely good move. Â§7's antique gold is verified off the film: `#a88c50` = **2.09**, `#c1a669` = **1.53** on `#dfcfad`. Both confirmed, both correctly banished.

### 7 Â· PHYSICAL-TRUTH â€” **FAIL** (three counts)

- **Level meniscus: PASS.** `--bp-menisc: calc(--bp-body-top + --bp-free/4)` = 110.0px at 1440, the brine mask's `--fill` = `menisc âˆ’ body_top` = 14.0px, and `.pj__meniscus::after` lands at `âˆ’10.96 + 24.96 = 14.0`. The line, the fill and the label's 124.05px top agree to the pixel, and Â§5's "never touching the meniscus" holds by 14px. Clean work.
- **The cucumber floats. FAIL.** `.pj-veg { top: 12%; width: min(jar_hÃ—.152, 24%); aspect-ratio: 72/212; height: auto }`. At 1440: width 72.96 â†’ height **214.8**; top = 12% Ã— 350.4 = **42.05**; bottom = **256.9** in a body **350.4** tall. **93.5px â€” 27% of the body â€” of clear brine under a cucumber that is drawn with its own contact shadow at `at 52% 99%`.** Nothing supports it. Â§15: "contents obey gravity."
- **The dry-mount card floats 40px above its ledge. FAIL.** `.dry-mount__ledge { bottom: calc(var(--bp-niche-b) âˆ’ 2px) }` = 12px above the niche floor. The card's foot is at `niche_b + .08 Ã— jar_h` = 14 + 38.4 = **52.4px**. A 40.4px gap, under a card carrying `box-shadow: 0 14px 30px rgba(0,0,0,.58)` â€” Â§14's fourth risk exactly. The clips are worse: `top: 18%` of the niche = 90.7px from the top, while the card's top edge is at `seat âˆ’ niche_b âˆ’ .96 Ã— jar_h` = 29.2px from the top. **The clips sit 61px down the card's face**, two gold bars gripping nothing.
- Minor: `min(calc(--bp-jar-h Ã— .152), 24%)` â€” the 24% leg can never bind, because 24% of jar_w = .1728 Ã— jar_h > .152 Ã— jar_h at every viewport. And the comment justifying it (*"the jar's width is capped against the track above 1900px, so its aspect is not constant"*) is false about its own code: `--bp-jar-w: calc(var(--bp-jar-h) * var(--bp-ratio))` makes the aspect **constant at .72 everywhere**; the width cap acts on `--bp-jar-h`.

### 8 Â· PRODUCT-TRUTH â€” **PASS**

Label copy: `Blue Room Preserves`, `THE BIRTH READING`, `The Crowned Name`, six mark names, `By birth alone`. No drawing language. `.dry-mount__plate` is deliberately empty with `:empty{display:none}` â€” the right call, and the same one `_m2-box.js` already made for the pod.

### 9 Â· INTERACTION â€” **PASS**, and this is the file's best work

- The six stay bare `<li>`, direct children, count six. `_six-live.js:775`'s `indexOf(ul.children, activeElement)`, `:774`'s `ls.length` and `:803`'s `ul.children` walk are all intact. The tint is `li::before` and the varnish is `ul::after` â€” pseudo-elements, not children. **B3 followed exactly.**
- The resting dim is killed at the right specificity: module `:65` `.m2bface__marks.sx-on li` = (0,2,1); override `.birth-preserve .m2bface__marks.sx-on > li` = (0,3,1). Wins in either load order â€” which matters, because `<style id="__sixlive">` is appended at install (`:690-691`) and the mode stylesheet at mount. Measured, the dim put five of six marks at **1.94â€“2.16:1**; that number reproduces.
- Focus ring: the module's `1px rgba(28,21,13,.5)` at offset 3px is replaced by `2px rgba(37,27,18,.85)` at offset 1px, `.birth-preserve â€¦:focus-visible` = (0,3,1) beating (0,2,1), both `outline` and `outline-offset` declared. `outline` doesn't affect layout, so Â§10's "no line shifts position" holds.
- The notch binding is six `:has()` rules on the `aria-current` the module already writes at `:627` â€” zero new JS, works by pointer and keyboard, works before the archive lands.
- The bubble is bound to the **force path only** (click / Enter / Space), matching the gestures `_six-live.js:761-766` already treats as force. B9 followed.
- Every decorative layer is pointer-transparent, and the explicit list is right to reject the `[aria-hidden]` blanket â€” `.m2bface` itself carries aria-hidden (app.js:2956).

### 10 Â· RESPONSIVE â€” **PASS, but by accident, not by the fix B10 ordered**

`--bp-track: min(calc(100vw - 48px), 520px)` is still in the file at â‰¤1199px â€” **the very thing B10 struck** â€” and the file's own Â§17 comment says, three lines above the declaration, *"That is also why B10's `min(100%, 370px)` is the right cap and `calc(100vw - 48px)` is not."* The comment contradicts the code it introduces.

It does not overflow, for two reasons the file never states: `body { overflow-x: hidden }` (**styles.css:86**), and `.birth-preserve__niche{max-width:min(100%,370px)}` clamps to the real container. The visible cost is silent â€” at 320px with a classic scrollbar the niche is clamped from 272 to 257 while `--bp-jar-w` stays 244, so `--bp-cheek` collapses from its declared **14px to ~6.5px**. A number stops meaning what it says.

Geometry table spot-checks all reproduce: 1440 track 463.6 / jar 480Ã—345.6 / gap 45.0 âœ“ Â· 1920 track 446 / jar 536.1Ã—386.0 / gap **16.00** âœ“ (width leg binds, lands on Â§13's floor by construction) Â· 1366 track 468.0 / jar 406.1 âœ“ Â· 1200 track 402.0 âœ“.

One unstated consequence: when the width leg binds (â‰¥1900px), the niche keeps `height: var(--bp-seat)` = 604.8 while the jar is 536.1 â€” so `--bp-niche-t`, declared and commented as **10px of head-air**, is actually **54.7px**. The jar sits low in a tall recess at exactly the viewport the builder is most likely to open it on.

### 11 Â· MOTION â€” **FAIL**

Two `@keyframes`, both one-shots, `infinite` count 0, no `transition` fires without input, the composition is complete at `--bp-px/--bp-py: 0`. All true **of this file**. But the exhibit does not disable what it inherits:

**`styles.css:4130` â€” `.m2pip-glow { animation: m2-breath 9s ease-in-out infinite; }`**, inside `@media (prefers-reduced-motion: no-preference)` at :4123. `.m2pip-glow` lives in the `.m2hero__face` SVG (app.js:2915). On `?m2=dark`, `.m2face` is `display:none` (styles.css:3799) and the SVG face is what shows â€” so **on the dark deck the Tarot exhibit breathes on a 9s loop.** Â§2: *"The design contains no automatic idle animation."* Â§10 bans *"breathing"* by name; the shipped keyframe is literally named `m2-breath`. One line fixes it, and the file's own Â§6 checklist ("the dark deck must be checked separately") is exactly what would have caught it.

Secondary: `bp-recede` animates `filter: brightness()` on a 373Ã—504 box holding ~25 gradient layers for 480ms â€” bounded, but the most expensive property in the file and it is not named as a cost.

Also, code-vs-comment: `.pj-bubble`'s comment says *"IT STOPS SHORT OF THE SURFACE."* At `--i:6` the 100% keyframe translates by `(y0 + label_top âˆ’ menisc) Ã— âˆ’1` = exactly the fill line, then `scale(1.06)` â€” the bubble's top edge crosses the meniscus. It is invisible only because opacity is 0 there. The claim is not what the arithmetic does.

### 12 Â· PERFORMANCE â€” **PASS**

No canvas, no WebGL, no `backdrop-filter`, no `mix-blend-mode`, one static `blur()`, `will-change` armed behind two guards and cleared by both `animationend` and an unskippable timer (the counter-example at app.js:3399-3409 is real and correctly cited), `.is-live` scoped to pointerenter/leave, all listeners `{passive:true}` on nodes that die with the exhibit. The turbulence data-URI is a 120Ã—120 raster tiled once.

---

## AGAINST THE CORRECTION BRIEF

| | order | verdict |
|---|---|---|
| B1 | delete Â§5's 42â€“46% | âœ“ absent |
| B2 | both axes, one `min()` | âœ“ built, both legs verified |
| B3 | no `<button>`, no rename | âœ“ exactly |
| B4 | strike Â§10's "right column untouched" | âœ“ the module is left owning `.m2read` |
| B5 | kill the resting dim + non-hue cue | âœ“ both, at correct specificity |
| B6 | cut two label lines | âœ“ both |
| B7 | proud default, `.is-recessed` behind a switch | âœ“ |
| B8 | kill `.m2hero` transform **and** `::before` | âœ“ both, at (0,3,0) |
| B9 | bubble on activation only | âœ“ |
| **B10** | **`min(100%,370px)` instead of `calc(100vwâˆ’48px)`** | **âœ— HALF-FOLLOWED â€” the cap was added, the `100vw` was not removed, and the comment claims it was** |

Also not carried across: the brief's `--bp-jar-w: min(â€¦, calc(var(--bp-stage-w) âˆ’ 32px))` put Â§13's gutter on the **jar**; the assembler moved it to the **niche** and argued the reversal in (f). That reversal is correct and is the one place the assembler improved on its orders.

---

## MUST FIX, RANKED

**1 Â· The Tarot dry-mount is invisible on the shipped deck.** `html.m2-parch .m2face { â€¦ color: #1c150d }` (styles.css:3801) over a forced-black card `#12151b` = **1.01 : 1**. Meta `#5c503c` = 2.32, orient `#6a5c45` = 2.81, glyph `#8a6a42` = 3.67. The file spends its longest comment (Â§2) on deck-proofing the Birth face and then makes the same mistake on the face it invented.

```css
/* Â§16's dry card is black stock on BOTH decks, so the tarot face's ink must travel
   with it. styles.css:3801 sets #1c150d on the parchment deck: measured on this
   stock #12151b that is 1.01:1 â€” the card is blank. The DARK deck's own inks are
   the fix; they were authored for exactly this stock (styles.css:3897).
   (0,4,2) â€” html + .m2-parch + .birth-preserve + :has(.m2hero[data-face]) + .m2face
   â€” beats html.m2-parch .m2face at (0,2,1). */
html.m2-parch .birth-preserve:has(.m2hero[data-face="tarot"]) .m2face,
html.m2-parch .birth-preserve:has(.m2hero[data-face="tarot"]) .m2face .m2face-name {
  color: #e9e5dc;                                   /* 14.54:1 */
}
html.m2-parch .birth-preserve:has(.m2hero[data-face="tarot"]) .m2face .m2face-meta,
html.m2-parch .birth-preserve:has(.m2hero[data-face="tarot"]) .m2face .m2face-orient {
  color: #a49c8c;                                   /*  6.71:1 */
}
html.m2-parch .birth-preserve:has(.m2hero[data-face="tarot"]) .m2face .m2face-glyph {
  color: #c8ad70;                                   /*  8.42:1 â€” the house gold, and
                                                       legal here because the ground
                                                       is black, not cream */
}
html.m2-parch .birth-preserve:has(.m2hero[data-face="tarot"]) .m2face .m2face-div {
  background: rgba(233, 229, 220, .28);             /* the dark deck's --bf-rule */
}
```

**2 Â· The inherited idle animation.**

```css
/* Â§2: "The design contains no automatic idle animation"; Â§10 bans "breathing" by
   name. styles.css:4130 runs `.m2pip-glow { animation: m2-breath 9s infinite }`
   inside a (prefers-reduced-motion: no-preference) block. On ?m2=dark the SVG face
   is the one that shows (html.m2-parch hides it at :3776-3778), so the exhibit
   inherits a 9s loop it never declared. Outside a media query, so it always wins. */
.birth-preserve .m2pip-glow { animation: none; opacity: .62; }
```

**3 Â· The dry card floats; the clips grip nothing.** The ledge and clips are in NICHE coordinates, the card is in JAR coordinates. Derive both from the card's own box.

```css
.birth-preserve {
  --bp-dry-h: calc(var(--bp-jar-h) * .88);            /* the tarot card's own height */
  --bp-dry-w: calc(var(--bp-dry-h) * 120 / 190);
}
/* the ledge sat 12px above the niche floor while the card's foot is at
   niche-b + jar_hÂ·.08 = 52.4px at 1440 â€” a 40px gap under a card carrying a
   0 14px 30px drop, which IS Â§14's fourth risk. */
.dry-mount__ledge {
  bottom: calc(var(--bp-niche-b) + var(--bp-jar-h) * .08 - 2px);
  left:  calc(50% - var(--bp-dry-w) / 2 - 10px);
  right: calc(50% - var(--bp-dry-w) / 2 - 10px);
}
/* the clips lap the card's TOP CORNERS. top:18% of the niche put them 61px down
   its face, which reads as two gold bars printed on the card. */
.dry-mount__clip {
  top: calc(var(--bp-seat) - var(--bp-niche-b) - var(--bp-jar-h) * .96 - 5px);
  height: 20px;
}
.dry-mount__clip--l { left:  calc(50% - var(--bp-dry-w) / 2 + 12px); }
.dry-mount__clip--r { right: calc(50% - var(--bp-dry-w) / 2 + 12px); }
```

**4 Â· The cucumber floats with 93.5px of clear brine beneath it.**

```css
/* it stood in mid-brine with its own contact shadow drawn at `at 52% 99%` and
   nothing under it â€” 27% of the body height of clear liquid. Seated on the mineral
   bed and grown to .186, it spans 8%â†’33.8% of the body against a label edge at 21%,
   so the occlusion argument gets STRONGER (38% of it under the film, not 38% of a
   smaller form) while gravity stops being violated. */
.pj-veg {
  top: auto;
  bottom: calc(var(--bp-jar-h) * .012);
  width: min(calc(var(--bp-jar-h) * .186), 26%);
}
```

**5 Â· The perimeter is a two-sided adhesive and a dead vignette.**

```css
.birth-preserve .pickle-jar .pickle-jar__label::before {
  background:
    linear-gradient(90deg, rgba(58,44,26,.17) 0%, rgba(58,44,26,.05) 4.2%,
      transparent 7%, transparent 93%, rgba(58,44,26,.05) 95.8%, rgba(58,44,26,.17) 100%),
    /* NEW â€” the top and bottom edges take the same adhesive. 3% rather than 4.2%
       because the label is 1.47x taller than wide: 3% of 294 = 8.8px against
       4.2% of 200 = 8.4px, so both edges darken over the same DISTANCE. */
    linear-gradient(180deg, rgba(58,44,26,.15) 0%, rgba(58,44,26,.045) 3%,
      transparent 5%, transparent 95%, rgba(58,44,26,.045) 97%, rgba(58,44,26,.15) 100%),
    /* the vignette's inner stop comes 62% -> 34%. At 62% it painted NOTHING: the
       worst corner solves to sqrt((.5/1.26)^2+(.58/1.12)^2) = .652, which interpolates
       to alpha .008. Re-measure the institutional row and the closing line after
       moving it â€” they are the only text in it. */
    radial-gradient(126% 112% at 50% 42%, transparent 0 34%,
      rgba(58,44,26,.055) 76%, rgba(58,44,26,.105) 100%);
}
/* Â§9.9 is the TOP of the film. The label's ::before is z-index 1 and .m2bface is a
   positioned descendant at z auto in the same stacking context, so as built the
   perimeter composites above the ink AND the varnish. Perimeter-over-ink is right
   (the adhesive is behind the film; light lost through it dims both). Perimeter-
   over-varnish is not. */
.birth-preserve .m2bface__marks::after { z-index: 2; }
```

**6 Â· The silhouette gate needs a number and a value step.** Nothing in the file addresses it, and 1.13:1 will not survive the monochrome-at-120px test the brief called *"the cheapest gate and the likeliest to fail."* The top fifth of the object carries no brine to help it. Candidates measured against `#06090e`: `#232b35` = 1.39 Â· `#2a3440` = 1.58 Â· `#313d4b` = 1.80 Â· `#384656` = 2.07 (lid); `#1c3238` = 1.48 Â· `#243e46` = 1.76 (glass edge). **This is a look, not an arithmetic call** â€” but it must be looked at before anything else about this object is judged, because the sticker-removal test is the one gate that decides whether it is a jar at all.

**7 Â· B10, finished properly, plus the clip belt.**

```css
@media (max-width: 1199px) {
  .birth-preserve {
    /* 520px is `.menu__draw`'s own max-width (styles.css:4137). The 100vw leg stays
       because a length is needed in a chain that feeds a HEIGHT â€” a percentage there
       is the axis trap this file's Â§1 warns about â€” but the belt below is what makes
       it safe, and the Â§17 comment must stop claiming the 100vw is not here. */
    --bp-track: min(calc(100vw - 48px), 520px);
  }
  /* THE BELT. When the niche's max-width bites (scrollbar width, up to ~17px), the
     jar is not re-derived; today it survives only because the 28px cheek reserve is
     larger than any scrollbar. Stated as a rule so it stays true. */
  .pickle-jar { max-width: calc(100% - 2 * var(--bp-cheek)); }
}
```

**8 Â· Five dead tokens, one of them the Â§5 band system.** `--bp-lid`, `--bp-neck`, `--bp-shoulder`, `--bp-foot` and `--bp-gold` each appear exactly **once** in the file â€” their declaration. The geometry hard-codes `.20` and `.73` beside them and every gold in the niche and lid is written as a literal `rgba(168,140,80,â€¦)`. Either wire them or cut them; a token that looks authoritative and drives nothing is worse than no token.

```css
  --bp-body-top: calc(var(--bp-jar-h) * (var(--bp-lid) + var(--bp-neck) + var(--bp-shoulder)));
  --bp-body-h:   calc(var(--bp-jar-h) * (1 - var(--bp-lid) - var(--bp-neck)
                                           - var(--bp-shoulder) - var(--bp-foot)));
```

**9 Â· The bubble, made to do what its comment says.**

```css
  100% { transform: translate3d(0,
           calc((var(--y0) + var(--bp-label-top) - var(--bp-menisc)
                 - var(--bp-jar-h) * .022) * -1), 0) scale(1.06);
         opacity: 0; }
```

**10 Â· The non-hue cue sits in the darkest 4px of the film.** `li::after { left: -6px }` puts the 4px margin rule ~4px from the label's cut edge â€” inside the .17Î± adhesive run (8.4px) and under the perimeter pseudo. It is the only thing carrying state in forced-colors and monochrome. `left: 2px; width: 5px` clears the run.

**11 Â· Two numbers and one artifact discrepancy.**
- *"sill against cheek â€” 4.38Ã—"*: L(`#1a2028`)/L(`#080c12`) = **3.93Ã—**.
- *"the jar's width is cappedâ€¦ so its aspect is not constant"*: `--bp-jar-w: calc(--bp-jar-h * --bp-ratio)` makes it **constant at .72 at every viewport**; the `24%` leg of `.pj-veg`'s `min()` is therefore unreachable.
- **The delivered text and the delivered file are not the same object.** The paste says `@media (max-height: 861px)`; `_m2-preserve.css` on disk says **`860px`**. The file's own ink audit (281.2 Ã· (.73 Ã— .84) = 458.6px jar â†’ 482.6px seat â†’ 56vh â‰¥ 482.6) makes **861** the correct boundary, so at exactly 861px of viewport height the delivered file overruns by 0.3px. The paste's "braces 131/131, parens 772/772" also do not reproduce against the file (I get 127/127 and 632/632 comment-stripped). Re-cut one from the other before anyone builds.

---

## HONEST JUDGEMENT

It achieves the first beat and it has not yet earned the second. What is genuinely strong here is the *register*: the niche is architecture rather than a container, the two darkest values on the page are both inside the opening, the film is a new opaque plane carrying its own 10.98:1 instead of spending the shipped card's 4.41, and the six marks answering on the lid through `aria-current` and `:has()` â€” with no second controller and no rewritten DOM â€” is the one thing on this surface that proves an archive exists rather than describing one. At 200ms it will read grave, which is what the correction brief correctly said Â§1's promise had to be rewritten as. **But the second beat is delivered almost entirely by one element, and that element is broken: the pickle floats in 27% of clear brine with a contact shadow drawn under nothing, and the vessel that is supposed to say "jar" before any copy separates from its own wall at 1.13:1.** Strip the label as Â§15 demands and what remains is a dark rectangle in a dark rectangle with an olive wash in the middle. So the risk it has landed on is not the one the spec named â€” it is not premium grocery packaging, because there is no crest, no box, no digit, no reversed panel, and the anti-SKU discipline was genuinely kept. The risk it has landed on is **the abstract failure Â§1 names second**: "if it never arrives, the design is too abstract." Fix the silhouette values and seat the cucumber and the second beat has a chance; leave them and this is a beautiful cream label on a shape nobody will name.

And the tell that this pass exists to catch: the file argues for eleven paragraphs that the parchment deck is a trap that eats two-class selectors, deck-proofs every one of forty-odd Birth tokens against it â€” and then hands over a Tarot exhibit whose body ink measures **1.01:1** on that same deck. The discipline was real. It just stopped at the object the author cared about.