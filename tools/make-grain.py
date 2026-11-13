"""Draws assets/grain.png: the fine grain that lies over the glass panes (switch «Glass finish»).

A tile of black and white specks, each at a few percent of alpha, so it needs no blend mode:
it is one more background layer over the pane's fill. The specks come from a seeded generator, so
the same arguments give the same tile every time. Needs Pillow.

    python tools/make-grain.py [size=192] [strength=1.0] [out=assets/grain.png]
"""
import random
import sys
from pathlib import Path

from PIL import Image

size = int(sys.argv[1]) if len(sys.argv) > 1 else 192
strength = float(sys.argv[2]) if len(sys.argv) > 2 else 1.0
out = Path(sys.argv[3]) if len(sys.argv) > 3 else Path(__file__).resolve().parent.parent / "assets" / "grain.png"
rnd = random.Random(20261111)          # the same tile every time

img = Image.new("LA", (size, size))
px = img.load()
for y in range(size):
    for x in range(size):
        v = rnd.gauss(0, 1)
        alpha = min(int(abs(v) * 7.5 * strength), 26)      # most specks 0–8 of 255, a few up to 10 %
        px[x, y] = (255 if v > 0 else 0, alpha)

img.save(out, optimize=True)
print(out, out.stat().st_size, "bytes")
