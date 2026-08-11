# PERFORMANCE BUDGET

Layer: ACTIVE SPECS · Status: ACTIVE · Promoted from research/SPINE.md
§5, §15 on 2026-06-12.

## Cost law

- **Free Pull must be low-cost and not AI-heavy.** No heavy AI call for
  every free scan — file validation, simple quality checks, declared
  route, deterministic templates, static sample data. A tiny/cheap API
  call is a last resort, later.
- Halo Mint carries the expensive pass — once, paid, deliberate.

## Effects law

**Premium means fewer effects placed better.**

- Heavy effects are allowed only on the central card/artifact — never on
  plates/panels.
- Every effect must respect `prefers-reduced-motion`.
- Effects degrade gracefully: no effect = still a good card.

**Safe:** transform · opacity · static shadows · static radial glow ·
pseudo-element shimmer moved with transform.

**Dangerous (avoid; justify or cut):** animated box-shadow · repeated
large blur · backdrop-filter · full-screen mix-blend-mode · SVG
turbulence loops · too many simultaneous animated layers · big
uncompressed video.

**Effect priority order:** 1. static hierarchy → 2. static card glow →
3. simple shimmer → 4. optional card-local pulse → 5. light-stream only
if tested → 6. WebGL/video only later, only if clearly worth it.

## Performance testing checklist (before shipping any effect)

- [ ] Screenshots look good *static* before any motion is added
- [ ] Effect runs only on the card, not plates
- [ ] No layout thrash: animation uses transform/opacity only
- [ ] Tested at 1600×900 with both sources × both tiers
- [ ] `prefers-reduced-motion` disables it
- [ ] Page scroll stays smooth with the dossier mounted
- [ ] No new network or AI cost added to Free Pull

---

## Where the room is allowed to get bigger (BR-S296, 2026-08-09)

A reminder to read while building, not a gate to pass. Every number here was
measured on this codebase during the BR-S269→S295 run; nothing is borrowed from a
blog. Where a figure is derived rather than observed it says so.

### The one fact that reverses the instinct

> **A phone rasterises more pixels than the laptop does.**
> 390×844 at DPR 3 = **2.96M device pixels**. 1440×900 at DPR 1 = **1.30M**.

So "small screen, keep it cheap; big screen, go rich" is backwards for anything
that costs *per pixel*. The phone is doing 2.3× the raster work on a thermally
throttled GPU. Scale the things that cost per *element* or per *point*; be careful
with the things that cost per *pixel*, and be most careful with them on phones.

### Free to scale up on a wide screen

- **Layout space** — more columns, more shown at once. Costs nothing.
- **Type and vector objects** — a 40px mark at 128px is the same work.
- **Element count**, *if the elements are plain* (no blend, no filter, no shadow).
- **Hover interactions** — already gated behind `pointer: coarse`, so they cost a
  phone literally nothing. This is the biggest genuinely free desktop budget there
  is; spend it there rather than on effects.

### Not free anywhere, and worse on a phone

`mix-blend-mode` · `backdrop-filter` · `blur()` · large animated shadows ·
oversized promoted layers. These scale with area, and DPR multiplies them again.

Measured here: the Desk carries **~1.76M px² of blend inside a ~1.25M px²
viewport** — about **1.4 blend passes per viewport pixel**. That ratio does not
improve on a phone; DPR makes it worse. It is why BR-S276 suppresses blends for
the duration of a travel rather than trying to make them cheaper.

### The two ceilings worth remembering

1. **Any single promoted layer under ~2× the viewport.**
   Measured: the menu track is 3.5MB at DPR 1 — fine. The same audit found two
   layers at **1440×14975, 82MB each**. Layer *area* is an upper bound rather than
   resident memory (Chrome tiles raster), so treat it as a lead, not a verdict —
   but that is the shape of the real danger, and it is not element count.

2. **Style recalc is node-bound, not pixel-bound.**
   Measured: a universal selector matching **427 nodes cost 8.1–9.9ms** per class
   toggle on this laptop. Derived: roughly 25–30ms on a mid-range phone. So more
   elements on a wide screen is fine; more elements *matched by broad selectors* is
   not, on either. Never scope a state class with `*` — name the targets.

### The habit, in one line

Ask which axis a thing costs on. **Per point** (layout, type, hover) → spend it on
desktop freely. **Per pixel** (blend, blur, shadow, layer) → the phone is the
constraint even though it looks smaller, so budget it there first and let desktop
inherit the restraint.
