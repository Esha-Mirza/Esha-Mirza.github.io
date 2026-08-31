/**
 * Regenerates the served images from the originals in assets/images/_source.
 *
 * The originals are full-resolution camera/export files: the portrait alone was a
 * 3358x4096 JPEG weighing 4.3 MB, displayed in a box about 500 CSS px wide. This
 * script resizes each image to the size it is actually rendered at (plus a 2x
 * variant for high-density screens) and encodes it as WebP.
 *
 *   node scripts/optimize-images.mjs
 *
 * Requires Python with Pillow, which is only needed at build time; the committed
 * output in assets/images is what the site serves.
 */
import { spawn } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PY_SCRIPT = path.join(HERE, 'optimize_images.py');

const python = spawn(process.platform === 'win32' ? 'python' : 'python3', [PY_SCRIPT], {
  cwd: path.join(HERE, '..'),
  stdio: 'inherit',
});

python.on('close', (code) => process.exit(code ?? 1));
python.on('error', (err) => {
  console.error('Could not run Python. Install Python 3 with Pillow to rebuild images.');
  console.error(err.message);
  process.exit(1);
});
