/** @type {import('tailwindcss').Config} */
module.exports = {
  // Scanning the real sources lets Tailwind emit only the utilities this site
  // uses. The old setup pulled cdn.tailwindcss.com, which shipped the entire
  // JIT compiler to every visitor and generated the stylesheet in the browser.
  content: ['./src/**/*.{js,jsx}', './src/index.html'],
  theme: {
    extend: {},
  },
  plugins: [],
};
