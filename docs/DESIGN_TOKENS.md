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
