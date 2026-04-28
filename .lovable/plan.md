# Update sitemap.xml

The current `public/sitemap.xml` is missing 22 tool routes that exist in `src/App.tsx`, and uses an old `lastmod` date (2026-03-12).

## Missing tool URLs to add

**Image Tools (3):** image-cropper, image-to-base64, text-to-image

**Text Tools (6):** text-reverser, find-replace, text-to-morse, text-repeater, lorem-ipsum-generator, word-frequency

**SEO Tools (1):** text-to-slug

**Developer Tools (9):** base64-encode-decode, csv-to-json, json-minifier, hex-to-rgb, html-encoder, markdown-preview, diff-checker, timestamp-converter, color-picker

**Number/List Tools (4):** random-number-generator, number-to-words, number-sorter, list-sorter

## Changes

1. Rewrite `public/sitemap.xml` to include all 8 main pages + 48 tool routes (56 total URLs), grouped by category with comments matching `App.tsx`.
2. Update every `<lastmod>` to `2026-04-28` (today).
3. Keep the existing priority scheme: homepage 1.0, /tools 0.9, hero tools 0.9, secondary tools 0.8, legal pages 0.4–0.6.
4. Assign new tools priority 0.8 by default, except house-planner (0.9, flagship), which already exists.
5. No changes to `robots.txt` (already references `/sitemap.xml`).

## Out of scope

- No new tool routes added — only sitemap synced to existing routes.
- No design/UI changes.
