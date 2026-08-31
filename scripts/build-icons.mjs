// Builds a CSS icon set containing only the Lucide glyphs this site actually uses.
//
// The stock `lucide-static` webfont ships ~1,500 glyphs (a woff2 plus a
// render-blocking stylesheet, both from a third-party CDN) to draw the ~50 this
// site needs. Instead each used glyph is inlined here as a CSS mask, so the icons
// cost a few kB inside the main stylesheet and no extra network request.
//
// The generated rules deliberately mirror how the webfont behaved: the glyph is
// drawn by a `::before` pseudo-element sized 1em, while the host element keeps
// its normal line box. Putting the mask on the host element itself would pin it
// to 1em tall and quietly reflow every row an icon sits in.
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const ICON_DIR = path.join(process.cwd(), 'node_modules', 'lucide-static', 'icons');
const SOURCE_DIRS = ['src'];

// `icon-hover-bounce` is a local animation helper, not a Lucide glyph.
const NOT_A_GLYPH = new Set(['hover-bounce']);

async function collectSourceFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? collectSourceFiles(full) : [full];
  }));
  return files.flat();
}

function svgToDataUri(svg) {
  const minified = svg
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .replace(/> </g, '><')
    .replace(/ \/>/g, '/>')
    .trim();
  // Only the characters that actually break an unquoted url() need escaping.
  const escaped = minified
    .replace(/"/g, "'")
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E');
  return `data:image/svg+xml,${escaped}`;
}

export async function buildIconCss() {
  const sourceFiles = (await Promise.all(SOURCE_DIRS.map(collectSourceFiles))).flat()
    .filter((file) => /\.(jsx?|tsx?|html)$/.test(file));

  const used = new Set();
  for (const file of sourceFiles) {
    const contents = await readFile(file, 'utf8');
    for (const match of contents.matchAll(/\bicon-([a-z0-9]+(?:-[a-z0-9]+)*)\b/g)) {
      used.add(match[1]);
    }
  }

  const available = new Set((await readdir(ICON_DIR)).map((f) => path.basename(f, '.svg')));
  const names = [...used].filter((name) => available.has(name)).sort();
  const missing = [...used].filter((name) => !available.has(name) && !NOT_A_GLYPH.has(name));
  if (missing.length) {
    console.warn(`  ! no Lucide glyph for: ${missing.join(', ')}`);
  }

  // One shared rule draws the glyph; per-icon rules only supply the artwork.
  const shared = `${names.map((name) => `.icon-${name}::before`).join(',')}{` +
    `content:"";` +
    `display:inline-block;` +
    `width:1em;height:1em;` +
    `background-color:currentColor;` +
    `-webkit-mask-image:var(--lucide);mask-image:var(--lucide);` +
    `-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;` +
    `-webkit-mask-position:center;mask-position:center;` +
    `-webkit-mask-size:contain;mask-size:contain;` +
    // Chosen by measuring both renderings against each other: at this offset the
    // mask box occupies the same line box the webfont's glyphs did, and every
    // section of the page keeps the exact height it had before.
    `vertical-align:-0.125em}`;

  const rules = await Promise.all(names.map(async (name) => {
    const svg = await readFile(path.join(ICON_DIR, `${name}.svg`), 'utf8');
    return `.icon-${name}{--lucide:url("${svgToDataUri(svg)}")}`;
  }));

  return { css: `${shared}\n${rules.join('\n')}\n`, count: names.length };
}
