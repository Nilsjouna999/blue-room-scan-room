# PARKED — kept on purpose, not shipped

Nothing in this directory is loaded by the site. `build_public.py` copies an
allow-list, so a file here is invisible to the build by construction — parking
something costs nothing and is the reversible direction. Deleting is not.

## u1-membrane.js · u1-plates.css — U1's first design (BR-S251 → BR-S366)

Retired when U1 was rebuilt as one page reading a single room registry (BR-S366).
The builder's call: clean sweep on the design, **keep the membrane code in case we
want it again.** So it is here, whole, not in the history.

**`u1-membrane.js`** — the twin white liquid-current threshold lines: a
"reverse-magnet" box deflection with born/dies-at-the-line decimation, drawn on
the real `#about` surface. Flag-gated (`?u1lines`, persisted in localStorage),
finds `.about__plate` dynamically each frame because the menu is mounted at
runtime, and clears every inline style when U1 is off-screen. It was promoted to
live-by-default in BR-S228.

**`u1-plates.css`** — the photographed sheet as a **stencil**, not a composite:
the plate photograph's luminance is used as a mask's alpha and the archive's own
light is painted through it, so alpha 0 issues zero paint. Plus the hover frame
and U1's type corrections. Loaded after `styles.css` on purpose — every rule in
it was a deliberate override of the `.about__` block.

### To bring either back

They depend on markup that no longer exists: `#about`, `.about__plate`,
`.about__rail`, `.about__nugget`. Reviving one means either restoring that markup
or re-pointing its selectors at the new structure. The membrane is the more
portable of the two — it only needs an element to follow, not a whole rail.

Re-add the `<script>` / `<link>` to `index.html`, add the path to
`build_public.py`'s `COPY_FILES`, and re-run `build_routes.py`.
