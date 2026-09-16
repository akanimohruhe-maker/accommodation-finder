"""
Generate local brand-aligned gradient placeholder images for the
Accommodation Finders demo. Replaces Unsplash URLs which are blocked
in the sandbox.

Output: /home/z/my-project/public/images/
"""
import os
import math
import random
from PIL import Image, ImageDraw, ImageFilter, ImageFont

OUT_DIR = "/home/z/my-project/public/images"
os.makedirs(OUT_DIR, exist_ok=True)

# Brand palette (from globals.css)
BRAND     = (46, 49, 148)    # #2E3194 — navy
BRAND_SOFT= (67, 56, 202)    # #4338CA
ACCENT    = (249, 180, 58)   # #F9B43A — gold
ACCENT_HOT= (255, 183, 0)    # #FFB700
INK       = (15, 23, 42)     # #0F172A — slate-900
INK_SOFT  = (71, 85, 105)    # slate-600
LINE      = (226, 232, 240)  # slate-200

# Seed for reproducibility
random.seed(2026)


def linear_gradient(size, color_top, color_bottom, angle_deg=0):
    """Create an angled linear gradient."""
    w, h = size
    angle = math.radians(angle_deg)
    # Compute gradient bounding box
    cx, cy = w / 2, h / 2
    diag = int(math.hypot(w, h))
    base = Image.new("RGB", (diag, diag), color_top)
    top = Image.new("RGB", (diag, diag), color_top)
    bottom = Image.new("RGB", (diag, diag), color_bottom)
    # Fill top with vertical gradient
    for y in range(diag):
        t = y / diag
        r = int(color_top[0] + (color_bottom[0] - color_top[0]) * t)
        g = int(color_top[1] + (color_bottom[1] - color_top[1]) * t)
        b = int(color_top[2] + (color_bottom[2] - color_top[2]) * t)
        for x in range(diag):
            top.putpixel((x, y), (r, g, b))
    # Rotate
    top = top.rotate(-angle_deg, resample=Image.BICUBIC)
    # Crop to original size
    left = (diag - w) // 2
    upper = (diag - h) // 2
    return top.crop((left, upper, left + w, upper + h))


def radial_gradient(size, color_center, color_edge):
    """Radial vignette gradient."""
    w, h = size
    cx, cy = w / 2, h / 2
    max_r = math.hypot(cx, cy)
    base = Image.new("RGB", size, color_edge)
    for y in range(h):
        for x in range(w):
            d = math.hypot(x - cx, y - cy) / max_r
            t = max(0.0, 1.0 - d)
            r = int(color_edge[0] + (color_center[0] - color_edge[0]) * t)
            g = int(color_edge[1] + (color_center[1] - color_edge[1]) * t)
            b = int(color_edge[2] + (color_center[2] - color_edge[2]) * t)
            base.putpixel((x, y), (r, g, b))
    return base


def add_noise(img, intensity=10):
    """Add subtle grain."""
    px = img.load()
    w, h = img.size
    for _ in range(int(w * h * 0.05)):
        x = random.randint(0, w - 1)
        y = random.randint(0, h - 1)
        r, g, b = px[x, y]
        n = random.randint(-intensity, intensity)
        px[x, y] = (max(0, min(255, r + n)),
                    max(0, min(255, g + n)),
                    max(0, min(255, b + n)))
    return img


def add_buildings(img, color=INK, density=0.5):
    """Overlay a stylised city skyline at bottom."""
    w, h = img.size
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    base_y = h - int(h * 0.18)
    x = 0
    while x < w:
        bw = random.randint(40, 140)
        bh = random.randint(int(h * 0.15), int(h * 0.55))
        top = base_y - bh
        if top < 0:
            top = 0
        # Building rectangle with rounded top
        draw.rectangle([x, top, x + bw, h], fill=(*color, 220))
        # Windows
        win_size = 3
        win_gap = 7
        for wy in range(top + 12, h - 8, win_gap + win_size):
            for wx in range(x + 6, x + bw - 6, win_gap + win_size):
                if random.random() < density:
                    draw.rectangle(
                        [wx, wy, wx + win_size, wy + win_size],
                        fill=(255, 230, 130, 180),  # warm yellow windows
                    )
        x += bw + random.randint(2, 8)
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    return img


def add_text_label(img, label, sublabel=None):
    """Add a small city name label at the bottom-left."""
    w, h = img.size
    draw = ImageDraw.Draw(img)
    # Try to find a font; fall back to default
    try:
        font_large = ImageFont.truetype(
            "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf", 28
        )
        font_small = ImageFont.truetype(
            "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf", 14
        )
    except Exception:
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()
    # Subtle dark gradient at bottom for label readability
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.rectangle([0, h - 80, w, h], fill=(0, 0, 0, 90))
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    draw = ImageDraw.Draw(img)
    # Label
    draw.text((20, h - 60), label, fill=(255, 255, 255), font=font_large)
    if sublabel:
        draw.text((20, h - 28), sublabel, fill=(255, 255, 255, 200), font=font_small)
    return img


def make_city_image(name, palette, sublabel, size=(1200, 900)):
    """Compose a city hero image: gradient + skyline + label."""
    img = linear_gradient(size, palette[0], palette[1], angle_deg=180)
    img = add_buildings(img, color=INK, density=0.55)
    # Subtle gold glow upper-right
    glow = Image.new("RGBA", size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse(
        [size[0] - 280, -100, size[0] + 80, 220],
        fill=(*ACCENT, 80),
    )
    glow = glow.filter(ImageFilter.GaussianBlur(60))
    img = Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")
    img = add_noise(img, intensity=8)
    img = add_text_label(img, name, sublabel)
    return img


def make_property_image(name, palette, sublabel, size=(1000, 750)):
    """Compose a property image: gradient + abstract shapes + label."""
    img = linear_gradient(size, palette[0], palette[1], angle_deg=180)
    # Add abstract interior-ish shapes (warm wood / soft furniture vibe)
    overlay = Image.new("RGBA", size, (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    # Soft arc (like a lamp glow)
    od.ellipse([size[0] - 280, -80, size[0] + 40, 200], fill=(*ACCENT, 70))
    # Geometric blocks (furniture silhouettes)
    od.rectangle([0, size[1] - 180, size[0] // 2, size[1]], fill=(*INK, 180))
    od.rectangle(
        [size[0] // 2 - 80, size[1] - 140, size[0] - 100, size[1]],
        fill=(*INK_SOFT, 160),
    )
    # Window grid (upper-left)
    for i in range(3):
        for j in range(2):
            od.rectangle(
                [40 + j * 90, 60 + i * 60, 100 + j * 90, 100 + i * 60],
                fill=(255, 230, 130, 60),
                outline=(255, 230, 130, 120),
            )
    overlay = overlay.filter(ImageFilter.GaussianBlur(2))
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    img = add_noise(img, intensity=6)
    img = add_text_label(img, name, sublabel)
    return img


# ============================================================
# Hero (full-width, large)
# ============================================================
hero_palette = (BRAND, INK)
hero_img = linear_gradient((2400, 1600), BRAND, INK, angle_deg=180)
hero_img = add_buildings(hero_img, color=INK, density=0.6)
# Add warm sunset glow upper-right
overlay = Image.new("RGBA", (2400, 1600), (0, 0, 0, 0))
od = ImageDraw.Draw(overlay)
od.ellipse([2400 - 600, -200, 2400 + 100, 500], fill=(*ACCENT, 110))
overlay = overlay.filter(ImageFilter.GaussianBlur(80))
hero_img = Image.alpha_composite(hero_img.convert("RGBA"), overlay).convert("RGB")
hero_img = add_noise(hero_img, intensity=10)
hero_img.save(os.path.join(OUT_DIR, "hero.jpg"), quality=85)

# ============================================================
# Cities (5)
# ============================================================
cities = [
    ("London",      (BRAND, INK),          "Capital · 412 listings"),
    ("Manchester",  (BRAND_SOFT, INK),     "Northern Quarter · 268 listings"),
    ("Birmingham",  ((60, 30, 80), INK),   "Aston · 187 listings"),
    ("Leicester",   ((40, 70, 110), INK),  "City Centre · 142 listings"),
    ("Northampton", ((100, 60, 30), INK), "Waterside · 89 listings"),
]
for name, palette, sublabel in cities:
    img = make_city_image(name, palette, sublabel)
    img.save(os.path.join(OUT_DIR, f"city-{name.lower()}.jpg"), quality=85)

# ============================================================
# Properties (6)
# ============================================================
properties = [
    ("Skyline View Apartments",   (BRAND, INK),         "Canary Wharf · Studio"),
    ("The Northern Quarter Lofts", (BRAND_SOFT, INK),   "Manchester · 2-bed"),
    ("Aston Square Residence",     ((80, 40, 100), INK),"Birmingham · Studio"),
    ("Victoria House",             ((40, 80, 100), INK),"Leicester · Shared"),
    ("Waterside Apartments",       ((120, 80, 40), INK),"Northampton · 1-bed"),
    ("King's Cross Hub",           (BRAND, INK),         "London · Co-living"),
]
for name, palette, sublabel in properties:
    img = make_property_image(name, palette, sublabel)
    safe = name.lower().replace(" ", "-").replace("'", "")
    img.save(os.path.join(OUT_DIR, f"property-{safe}.jpg"), quality=85)

# ============================================================
# Author avatar (testimonial)
# ============================================================
avatar_palette = (BRAND_SOFT, INK)
avatar = linear_gradient((200, 200), BRAND_SOFT, INK, angle_deg=180)
overlay = Image.new("RGBA", (200, 200), (0, 0, 0, 0))
od = ImageDraw.Draw(overlay)
od.ellipse([140, 60, 220, 160], fill=(*ACCENT, 120))  # face-ish blob
od.ellipse([20, 100, 80, 200], fill=(*ACCENT, 90))    # shoulder
overlay = overlay.filter(ImageFilter.GaussianBlur(20))
avatar = Image.alpha_composite(avatar.convert("RGBA"), overlay).convert("RGB")
avatar.save(os.path.join(OUT_DIR, "avatar-chidinma.jpg"), quality=85)

print("Generated images:")
for f in sorted(os.listdir(OUT_DIR)):
    path = os.path.join(OUT_DIR, f)
    size_kb = os.path.getsize(path) // 1024
    print(f"  /images/{f}  ({size_kb} KB)")
