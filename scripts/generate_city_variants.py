"""
Generate varied city photos for Accommodation Finders.
For each of 5 UK cities, generate 4 variants:
  - dawn (cool blue-purple)
  - day (bright blue)
  - dusk (warm orange/red)
  - night (deep navy with lit windows)

Output: /home/z/my-project/public/images/cities/{city}-{period}.jpg
"""
import os
import math
import random
from PIL import Image, ImageDraw, ImageFilter

OUT_DIR = "/home/z/my-project/public/images/cities"
os.makedirs(OUT_DIR, exist_ok=True)

# Brand palette
BRAND     = (46, 49, 148)
BRAND_SOFT= (67, 56, 202)
ACCENT    = (249, 180, 58)
ACCENT_HOT= (255, 183, 0)
INK       = (10, 10, 10)  # matches logo black
SUN_ORANGE= (255, 140, 0)
SUN_YELLOW= (255, 193, 7)

# Per-period sky palettes (top → bottom)
SKY = {
    "dawn":  [(60, 40, 90), (140, 80, 110), (240, 180, 140)],         # purple → pink → peach
    "day":   [(96, 165, 220), (180, 220, 240), (240, 240, 220)],     # blue → pale → cream
    "dusk":  [(50, 30, 80), (220, 90, 60), (255, 170, 70)],          # purple → red → orange
    "night": [(8, 12, 40), (30, 40, 90), (60, 70, 130)],             # deep navy → midnight blue
}


def linear_gradient(size, color_top, color_mid, color_bottom):
    """3-stop vertical gradient."""
    w, h = size
    base = Image.new("RGB", size, color_top)
    px = base.load()
    for y in range(h):
        t = y / max(h - 1, 1)
        if t < 0.5:
            t2 = t * 2
            r = int(color_top[0] + (color_mid[0] - color_top[0]) * t2)
            g = int(color_top[1] + (color_mid[1] - color_top[1]) * t2)
            b = int(color_top[2] + (color_mid[2] - color_top[2]) * t2)
        else:
            t2 = (t - 0.5) * 2
            r = int(color_mid[0] + (color_bottom[0] - color_mid[0]) * t2)
            g = int(color_mid[1] + (color_bottom[1] - color_mid[1]) * t2)
            b = int(color_mid[2] + (color_bottom[2] - color_mid[2]) * t2)
        for x in range(w):
            px[x, y] = (r, g, b)
    return base


def add_sun_or_moon(img, period, size):
    """Add sun (day/dusk) or moon (night) or glow (dawn)."""
    w, h = size
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    cx, cy = int(w * 0.78), int(h * 0.25)
    r = int(h * 0.10)

    if period == "day":
        # Bright sun
        od.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(255, 245, 200, 220))
        # Halo
        od.ellipse([cx - r * 2, cy - r * 2, cx + r * 2, cy + r * 2],
                   fill=(255, 245, 200, 60))
    elif period == "dusk":
        # Setting sun
        od.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(*SUN_ORANGE, 230))
        od.ellipse([cx - r * 2, cy - r * 2, cx + r * 2, cy + r * 2],
                   fill=(*SUN_ORANGE, 70))
    elif period == "dawn":
        # Just risen sun
        od.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(*SUN_YELLOW, 180))
        od.ellipse([cx - r * 2, cy - r * 2, cx + r * 2, cy + r * 2],
                   fill=(*SUN_YELLOW, 50))
    else:  # night
        # Moon
        od.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(245, 245, 230, 200))
        # Stars
        random.seed(42)
        for _ in range(60):
            sx = random.randint(0, w - 1)
            sy = random.randint(0, int(h * 0.55))
            od.point([sx, sy], fill=(255, 255, 220, 180))

    overlay = overlay.filter(ImageFilter.GaussianBlur(8))
    return Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")


def add_buildings(img, period, density=0.55, size=(1200, 900)):
    """Add stylised city skyline at bottom."""
    w, h = size
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Building silhouette color depends on period
    if period == "day":
        sil_color = (40, 50, 70, 240)  # cool dark
        win_color = (255, 220, 100, 90)
    elif period == "dusk":
        sil_color = (30, 20, 50, 240)  # purple dark
        win_color = (255, 200, 100, 220)
    elif period == "dawn":
        sil_color = (50, 40, 70, 230)  # cool dark
        win_color = (255, 220, 140, 160)
    else:  # night
        sil_color = (5, 8, 20, 250)  # near black
        win_color = (255, 200, 80, 230)

    base_y = h - int(h * 0.18)
    x = 0
    while x < w:
        bw = random.randint(50, 160)
        bh = random.randint(int(h * 0.20), int(h * 0.60))
        top = base_y - bh
        if top < 0:
            top = 0
        # Building rectangle
        draw.rectangle([x, top, x + bw, h], fill=sil_color)
        # Windows
        win_size = 4
        win_gap = 9
        for wy in range(top + 14, h - 8, win_gap + win_size):
            for wx in range(x + 8, x + bw - 8, win_gap + win_size):
                if random.random() < density:
                    # Some windows off at night
                    if period == "night" and random.random() < 0.35:
                        continue
                    draw.rectangle(
                        [wx, wy, wx + win_size, wy + win_size],
                        fill=win_color,
                    )
        x += bw + random.randint(2, 8)
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    return img


def add_noise(img, intensity=8):
    px = img.load()
    w, h = img.size
    for _ in range(int(w * h * 0.04)):
        x = random.randint(0, w - 1)
        y = random.randint(0, h - 1)
        r, g, b = px[x, y]
        n = random.randint(-intensity, intensity)
        px[x, y] = (max(0, min(255, r + n)),
                    max(0, min(255, g + n)),
                    max(0, min(255, b + n)))
    return img


# City skyline characteristics (just building density variation for visual distinction)
cities = [
    ("london",      0.65, 1.0),   # dense, tall
    ("manchester",  0.55, 0.85),
    ("birmingham",  0.55, 0.85),
    ("leicester",   0.45, 0.75),
    ("northampton", 0.40, 0.65),
]

for city_name, density, height_factor in cities:
    for period in ["dawn", "day", "dusk", "night"]:
        random.seed(hash((city_name, period)) & 0xFFFFFFFF)
        size = (1200, 900)
        sky_colors = SKY[period]
        # Adjust building heights per city
        local_density = density
        img = linear_gradient(size, sky_colors[0], sky_colors[1], sky_colors[2])
        img = add_sun_or_moon(img, period, size)
        # Override density for night (some windows off)
        win_density = 0.65 if period != "night" else 0.55
        img = add_buildings(img, period, density=win_density, size=size)
        img = add_noise(img, intensity=6)
        out_path = os.path.join(OUT_DIR, f"{city_name}-{period}.jpg")
        img.save(out_path, quality=85)
        print(f"  {city_name}-{period}.jpg  ({os.path.getsize(out_path) // 1024} KB)")

print("Done.")
