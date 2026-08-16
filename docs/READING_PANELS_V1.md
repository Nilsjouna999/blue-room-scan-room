# THE READING PANELS — one panel, two uses

Requirement, 2026-08-16: **"need high quality reading panels that are accurate"**, for
**both** the U1 tutorial and the real reading a customer receives.

---

## ★★ THE ARCHITECTURE, AND IT IS THE WHOLE IDEA

**ONE panel component. Rendered twice.**

    the real reading   →  panel(customer's derivation)
    U1's tutorial      →  panel(the John Bon fixture)

The tutorial does not *depict* the product. It **is** the product, running on a fixture.

★ Why this and not two implementations: accuracy stops being a discipline and becomes a
property. A tutorial built separately drifts the moment the reading changes, and drift in
a tutorial is a lie about what you are selling. Two codebases showing "the same" reading
is exactly how "given, not drawn" ended up false on half the six marks.

★ It also collapses the quality problem into one surface. Make the panel good once and
both places are good. The scrapped U1 built its own boxes and they were the weakest thing
in the repo.

---

## 1. ACCURATE — mechanically decidable, so decide it mechanically

- every printed string is **re-derived through the shipped engine** (`arcana-reading.js`
  over `codex-data.json`), never authored to look right
- the derivation runs at **gate time** and the build fails on a mismatch — the same check
  that caught the Profile printing Aries/Snake/Life Path 7 for a date the engine reads as
  Capricorn/Dragon/4
- a panel may present a FIXTURE, but a fixture's arithmetic may never be wrong.
  The ruling: *"mathematically accurate not reality, its tutorial showcase, and keep john"*
- ★ **the coupling prohibition holds here too**: the rune determines the trigram and the
  hexagram, so no panel may print a combination count, an odds figure or a "1 in N"
- no label, heading or caption may name a property the engine does not actually produce

## 2. HIGH QUALITY — not decidable that way, so put the eye in the loop

The bar is comparative and the comparators are in this repo already:

| passes | why |
|---|---|
| the Codex chamber | real geometry, a membrane you can read, depth |
| the card | material — foil, grain, tone, an object under glass |
| the Accord socket | three depth planes, transmission, a closure that means something |

★ **If the panel is the weakest thing on that shelf it is not finished**, however correct
its derivation. "Underwhelming" was a verdict on a build that passed every number it
could check.

★ **Object first, then fill it.** Not a container that receives content. The order the
Accord socket was built in, and the order the scrapped U1 was not.

## 3. THE TENSION TO HOLD

A panel that looks authoritative makes a **stronger claim** than a plain one. The better
these look, the harder §1 has to hold. Polish is what let the false claims spread — they
were believed because they appeared in shipped-looking strings.

## 4. AND IN U1, THEY FILL

Per `U1_MOTION_V1.md`: in the tutorial the panels **write themselves out as you scroll**,
driven by scroll position, with the letter written on the same scalar. In the real
reading they simply arrive. Same panel, same content, different delivery — the filling is
a presentation of the panel, never a different panel.

## 5. HOW A BUILD IS JUDGED

1. gate: every string re-derived, zero mismatches, zero forbidden claims
2. eye: placed beside the codex and the card — is it the weakest?
3. the stranger test: scrolling once, can they say what the product does and what they
   would receive?

All three, in that order. Two of them are not measurements.
