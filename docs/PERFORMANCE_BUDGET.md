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
