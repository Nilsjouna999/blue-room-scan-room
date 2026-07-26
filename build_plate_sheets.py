#!/usr/bin/env python
# BR — U1 "About Blue Room" photographic plates.
# Bakes five disjoint windows of assets/plate-stock.png into five alpha masks.
# Run:  python build_plate_sheets.py        (needs Pillow + numpy, nothing else)
#
# The photograph is never composited as colour. Its luminance becomes the ALPHA
# of a mask; the CSS paints rgba(233,229,220,a) through it. Alpha 0 = zero paint
# = the plate stock survives byte for byte.  (L1)
#
# Two darkroom operations are baked in, both static, no live filter (L2):
#   1. FLAT-FIELD  — divide by the sheet's own illumination envelope so the
#      3.7x left-to-right ramp cannot rake light across a plate (a "wash").
#   2. LEVELS      — per crop: black point at p70, white point at p99.5,
#      gamma 0.5. Nothing is synthesised; this is what a print gets.

import numpy as np
from PIL import Image

SRC   = "assets/plate-stock.png"
W, H  = 288, 208           # source window, px
FIELD = (170, 150, 746, 1051)   # x0,y0,x1,y1 — clean field, clear of the frame halo
BLUR_R= 56                 # box radius x3 passes ~= gaussian sigma 96
LO_P, HI_P, GAMMA = 70.0, 99.5, 0.5
QUANT = 8                  # 5-bit alpha: one step = 0.53 rendered levels

# plate, (x, y) in FULL-IMAGE coords, horizontal flip
PLATES = [
    ("sheet-01", 170, 614, True ),   # I   The Codex
    ("sheet-02", 458, 774, False),   # II  Tarot Divination
    ("sheet-03", 170, 406, False),   # III The Arcana Reading
    ("sheet-04", 458, 246, True ),   # IV  Card Mint
    ("sheet-05", 170, 150, False),   # V   The Unlit Room
]

def box1(x, r, ax):
    n = x.shape[ax]; pad = [(0,0),(0,0)]; pad[ax] = (r,r)
    cs = np.cumsum(np.pad(x, pad, mode="reflect"), axis=ax)
    cs = np.concatenate([np.zeros_like(np.take(cs,[0],axis=ax)), cs], axis=ax)
    return (np.take(cs, range(2*r+1, 2*r+1+n), axis=ax) - np.take(cs, range(0,n), axis=ax)) / (2*r+1)

def blur(x, r, passes=3):
    for _ in range(passes):
        x = box1(x, r, 0); x = box1(x, r, 1)
    return x

def main():
    a = np.asarray(Image.open(SRC).convert("L")).astype(np.float64)
    x0, y0, x1, y1 = FIELD
    fld = a[y0:y1, x0:x1]
    env = blur(fld, BLUR_R)
    flat = fld * (env.mean() / np.maximum(env, 0.8))          # 1. flat-field
    for name, X, Y, flip in PLATES:
        c = flat[Y-y0:Y-y0+H, X-x0:X-x0+W]
        lo, hi = np.percentile(c, LO_P), np.percentile(c, HI_P)
        m = np.clip((c - lo) / (hi - lo), 0, 1) ** GAMMA       # 2. levels
        q = (np.round(np.round(m*255) / QUANT) * QUANT).clip(0,255).astype(np.uint8)
        if flip:
            q = q[:, ::-1]
        img = Image.fromarray(np.dstack([np.full_like(q,255), q]), "LA")
        img.save("assets/%s.png" % name, optimize=True)
        print("%s  src(%d,%d,%dx%d) flip=%-5s lo=%.2f hi=%.2f  zero-alpha=%.1f%%"
              % (name, X, Y, W, H, flip, lo, hi, 100*(q==0).mean()))

if __name__ == "__main__":
    main()
