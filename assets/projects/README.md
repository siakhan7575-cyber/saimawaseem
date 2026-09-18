# Project screenshots

Drop your website preview images here, then point to them from
[`assets/js/data.js`](../js/data.js).

## How to add a screenshot

1. Take a screenshot of the website (full-width, top of the page looks best).
2. Save it here as `.jpg` or `.webp` — e.g. `salon.jpg`.
   - Recommended size: **1600 × 1000 px** (16:10). Keep it under ~300 KB.
3. In `assets/js/data.js`, set the project's `image` field:

   ```js
   {
     name: "Lumière Salon",
     image: "assets/projects/salon.jpg",   // ← this line
     ...
   }
   ```

That's it — the card updates automatically.

## No screenshot yet?

Leave `image: ""`. A clean branded placeholder shows in its place, so the
layout never breaks and you can add the real image whenever it's ready.

## Suggested filenames (match the current projects)

- `salon.jpg` — Lumière Salon
- `terra-trio.jpg` — Terra Trio
- `portrait.jpg` — your About photo (referenced from `index.html`)
