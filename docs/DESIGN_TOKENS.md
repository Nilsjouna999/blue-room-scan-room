# DESIGN TOKENS (spec)

Layer: ACTIVE SPECS · Status: ACTIVE · Promoted from research/SPINE.md
§14 on 2026-06-12. The implemented values live in styles.css `:root`;
this spec states the grammar those values must obey.

## Spatial grammar

```
Room  = dark stage        (the page)
Plate = flat archive document   (panels, dossier sections)
Artifact = raised card object   (the card — the only true artifact)
```

- The card is the only element with object-depth (shadow, halo, material
  edge). Panels and dossier sections are plates: flat, bordered, quiet.
- Card remains compressed; the dossier carries the depth.

## Color law

- **Accent is currency, not paint.** Spend it where it earns: stamps,
  fills, the card's material. Never wash a panel in accent.
- **One palette speaks at a time:** Free = graphite/moss archive; Halo =
  the source's material (`--halo-a/b/c` — Warm Glass Copper / Cold Prism
  Frost). They never mix in one state.
- No pure white; warm archive greys (`--silver-bright` ceiling).

## Type system

- Cormorant Garamond — display: card title, oracle, plate titles
- Inter — UI and body reading
- IBM Plex Mono — metadata, serials, stat numbers, receipts
- Hierarchy is tiered, not improvised: display → label → body → meta →
  micro. (SPINE's 5-tier "Vault scale" is the target; current sizes in
  styles.css approximate it.)

## Treatment depth law

Halo looks *more developed* through depth, light, material, and
restraint — never through clutter. Paid ≠ more stuff; paid = the same
object, finished.

## Dossier rhythm (target)

```
quiet → medium → medium → LOUD → medium → quiet → LOUD finale
```

(Current order: Source Record → Evidence → Stats → HIDDEN STAT →
Fit+Aura → Mint Record → ORACLE — already close; tune loudness via
plate accent, not new sections.)

## Locked token canon (Base-Hex + Warm-Ramp Lock v1 · 2026-06-14)

The values these names must carry — the lock that gates all contrast/type
work (`RESEARCH_SYNTHESIS_V1` build-now list; DECISION_LOG 2026-06-14):

- **Base hex (Room floor): `#0a0b0d`** → `--ink-950`. The deepest room-shadow
  stop. Faintly cool by the numbers but visually neutral at < 1% luminance; it
  is the only sanctioned cool-leaning surface, and only as the floor. The
  warm-neutral rule below still governs every lighter surface.
- **Warm "Sand" text ramp — the ONE neutral ramp: `--t-*`** → Display `#e9e5dc`
  · Primary `#d7d3ca` · Body `#b1ada4` · Meta `#948f87` · Ghost `#6e6b63`. Warm
  archive greys, no pure white. This is the single canonical ramp. The cool
  `--vault-*` alternative (`research/TEXT_EYE_TRAVEL.md`) is **killed** — never
  implemented, overruled by warm-neutral.
- **Warm-neutral rule:** all non-frost surfaces stay warm-neutral; cool is
  reserved for the Cold Prism Frost material + the violet bridge.

Deferred (gated behind this lock — see TASK_QUEUE; do NOT silently fold in):
re-derive the upper `--ink-*` surface stops + the tier-band ratios against
`#0a0b0d` (**preserve the Muted/Clean/Strong/Charged/Peak ladder**); consolidate
only the base/default plate-bg (**preserve the per-source Copper/Frost plates**),
with the engraved text-shadow re-tune as that task's last step. No letterpress
shadow PAIR exists today; do not invent one here.
