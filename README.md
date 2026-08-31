# Esha Mirza, portfolio

AI/ML engineer portfolio. Static site, no backend, deployed straight from this
repository with GitHub Pages.

Live: <https://esha-mirza.github.io/>

## How it is put together

The site is a React app that is compiled ahead of time into two static files.
Nothing is fetched from a CDN at runtime and nothing is compiled in the
visitor's browser.

```
src/
  index.html          page shell (the template; the built page lands at ./index.html)
  main.jsx            entry point, mounts <App/>
  components/*.jsx    one component per section
  styles/main.css     Tailwind directives + the site's own CSS
assets/
  fonts/              self-hosted Inter (variable, latin subset)
  images/             the exact images the browser downloads
  images/_source/     originals; never served, only used to regenerate the above
dist/                 build output: app.js + styles.css
```

`dist/` and the root `index.html` are committed on purpose. GitHub Pages has no
build step, so whatever is in the branch is what ships.

## Working on it

```bash
npm install
npm run dev      # build, watch src/, and serve on http://localhost:8080
npm run build    # one-off production build
```

`npm run dev` rebuilds on every save in `src/`. Refresh the browser to pick the
change up.

Edit files under `src/`. Do not edit `index.html` or `dist/` at the repository
root by hand: both are generated, and the next build overwrites them.

### Images

`assets/images/` is generated from `assets/images/_source/`:

```bash
npm run build:images    # needs Python 3 with Pillow and fontTools
```

This resizes each picture to the size it is actually displayed at, encodes it as
WebP, and draws the favicon, the Apple touch icon and the 1200x630 social card.
Add a new original to `_source/`, add a case to `scripts/optimize_images.py`, and
re-run it.

### Icons

Icons are Lucide glyphs written as CSS masks and inlined into the stylesheet.
`scripts/build-icons.mjs` scans `src/` for `icon-*` class names on each build and
emits only the ones in use, so adding `<div className="icon-rocket" />` to a
component is all that is needed; the next build picks it up.

## Two things to know before editing the CSS

`src/styles/main.css` puts the `@tailwind` directives at the **bottom** of the
file, which is unusual and deliberate. The site used to load Tailwind from
`cdn.tailwindcss.com`, which generated its stylesheet in the browser and injected
it into `<head>` after `styles.css`, so Tailwind won every specificity tie against
the site's own rules. Parts of the layout depend on that: the hero's flip card
carries both `absolute` and `.shimmer-border`, and `.shimmer-border { position:
relative }` would drop the card's back face into the document flow if it came
last. Keep Tailwind at the end.

The `@font-face` rule declares `font-weight: 400 700` even though the woff2 file
covers 400 to 900. The original page loaded Inter at 300;400;500;600;700, so
`font-black` (900) had no real face and browsers synthesised it from 700.
Capping the range reproduces that rendering exactly. Change it to `400 900` to
use Inter's genuine 900 weight in the hero headline; the file already contains
it, so nothing extra is downloaded.

## Deploying

Commit the build output along with the source, and push:

```bash
npm run build
git add -A
git commit -m "..."
git push
```

GitHub Pages serves the branch as-is. Because every path in the page is relative,
the same files also work from a subdirectory or straight off the filesystem.
