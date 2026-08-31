"""Resize and re-encode the site's images to the sizes they are actually shown at.

Originals live in assets/images/_source and are never served. Everything this
script writes into assets/images is what the browser downloads.

Run via `npm run build:images`.
"""
import io
import os

from PIL import Image, ImageDraw, ImageFont

SOURCE_DIR = os.path.join('assets', 'images', '_source')
OUT_DIR = os.path.join('assets', 'images')
FONT_WOFF2 = os.path.join('assets', 'fonts', 'inter-latin.woff2')

BG = (2, 6, 23)
ACCENT = (96, 165, 250)
MUTED = (148, 163, 184)


def load(name):
    return Image.open(os.path.join(SOURCE_DIR, name))


def save_webp(image, name, quality=82):
    path = os.path.join(OUT_DIR, name)
    image.save(path, 'WEBP', quality=quality, method=6)
    return path


def cover(image, width, height):
    """Resize and centre-crop to exactly width x height, matching object-fit: cover."""
    src_ratio = image.width / image.height
    dst_ratio = width / height
    if src_ratio > dst_ratio:
        new_w = int(round(image.height * dst_ratio))
        box = ((image.width - new_w) // 2, 0, (image.width - new_w) // 2 + new_w, image.height)
    else:
        new_h = int(round(image.width / dst_ratio))
        box = (0, (image.height - new_h) // 2, image.width, (image.height - new_h) // 2 + new_h)
    return image.resize((width, height), Image.LANCZOS, box=box)


def inter_font(size):
    """Load the site's own Inter woff2, converting it to TTF in memory."""
    try:
        from fontTools.ttLib import TTFont
        font = TTFont(FONT_WOFF2)
        buffer = io.BytesIO()
        font.flavor = None
        font.save(buffer)
        buffer.seek(0)
        return ImageFont.truetype(buffer, size)
    except Exception:
        for fallback in ('C:/Windows/Fonts/segoeuib.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'):
            if os.path.exists(fallback):
                return ImageFont.truetype(fallback, size)
        return ImageFont.load_default()


def set_weight(font, weight):
    """Inter is a variable font; pick a named weight where Pillow supports it."""
    try:
        font.set_variation_by_axes([weight])
    except Exception:
        pass
    return font


def build_portrait():
    """About section portrait: an aspect-[4/5] box roughly 500 CSS px wide."""
    src = load('profilepic.jpeg')
    written = []
    for width in (520, 1040):
        image = cover(src.convert('RGB'), width, int(width * 5 / 4))
        written.append(save_webp(image, f'profilepic-{width}.webp', quality=80))
    return written


def build_hero_badge():
    """Hero identity tile: rendered at most 224 CSS px square."""
    src = load('hero-b.png').convert('RGBA')
    image = cover(src, 448, 448)
    flat = Image.new('RGBA', image.size, BG + (255,))
    flat.alpha_composite(image)
    return [save_webp(flat.convert('RGB'), 'hero-b.webp', quality=82)]


def build_logo():
    """Logo: shown at most 128 CSS px, and reused for the icons."""
    src = load('logo-b.png').convert('RGBA')
    written = [save_webp(src.resize((256, 256), Image.LANCZOS), 'logo-b.webp', quality=88)]

    favicon = src.resize((32, 32), Image.LANCZOS)
    favicon.save(os.path.join(OUT_DIR, 'favicon.png'), 'PNG', optimize=True)
    written.append(os.path.join(OUT_DIR, 'favicon.png'))

    return written


def build_og_image():
    """The 1200x630 social card the meta tags pointed at but that never existed."""
    width, height = 1200, 630
    card = Image.new('RGB', (width, height), BG)
    draw = ImageDraw.Draw(card, 'RGBA')

    # A soft blue glow in the upper left, echoing the site's backdrop.
    for radius, alpha in ((520, 5), (380, 7), (240, 9)):
        draw.ellipse((160 - radius, 150 - radius, 160 + radius, 150 + radius), fill=(37, 99, 235, alpha))

    # Faint grid, same 40px rhythm as the hero.
    for x in range(0, width, 40):
        draw.line((x, 0, x, height), fill=(59, 130, 246, 14))
    for y in range(0, height, 40):
        draw.line((0, y, width, y), fill=(59, 130, 246, 14))

    logo = load('logo-b.png').convert('RGBA').resize((104, 104), Image.LANCZOS)
    card.paste(logo, (80, 74), logo)

    name_font = set_weight(inter_font(92), 900)
    role_font = set_weight(inter_font(44), 700)
    tag_font = set_weight(inter_font(26), 500)
    label_font = set_weight(inter_font(22), 700)

    draw.text((80, 230), 'Esha Mirza', font=name_font, fill=(255, 255, 255))
    draw.text((80, 344), 'AI/ML Engineer', font=role_font, fill=ACCENT)
    draw.text((80, 424), 'LLMs · Multi-Agent Systems · RAG Pipelines', font=tag_font, fill=MUTED)

    draw.line((80, 510, 340, 510), fill=(59, 130, 246, 140), width=3)
    draw.text((80, 534), 'esha-mirza.github.io', font=label_font, fill=(100, 116, 139))

    path = os.path.join(OUT_DIR, 'og-image.png')
    card.save(path, 'PNG', optimize=True)
    return [path]


def main():
    if not os.path.isdir(SOURCE_DIR):
        raise SystemExit(f'missing {SOURCE_DIR}; originals must live there')

    written = []
    for build in (build_portrait, build_hero_badge, build_logo, build_og_image):
        written += build()

    print(f'{len(written)} images written')
    for path in written:
        print(f'  {path:<44} {os.path.getsize(path) / 1024:8.1f} kB')


if __name__ == '__main__':
    main()
