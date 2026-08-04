# The Business Architects — Website

Marketing site for **The Business Architects**, rebuilt as a [Next.js 16](https://nextjs.org) (App Router) application from the original single-file `website.html`. The structure, copy, styling and interactive behaviour are preserved 1:1 with the original.

## Stack

- **Next.js 16.2.10** (App Router, Turbopack) · **React 19** · **TypeScript**
- No CSS framework — the original hand-written CSS is ported verbatim into `src/app/globals.css` so the design is pixel-identical.
- Fonts (Cormorant Garamond, DM Sans, Bebas Neue) load from Google Fonts, matching the original.

## How it's structured

| File | Purpose |
| --- | --- |
| `src/app/layout.tsx` | Root layout — metadata + Google Fonts links |
| `src/app/globals.css` | The original `<style>` block, verbatim |
| `src/app/page.tsx` | Server page, renders the client site |
| `src/components/MarketingSite.tsx` | The full page as JSX (nav, hero, services, brochure, mind-map, partnerships, process, contact, footer, admin panel) |
| `src/lib/site-runtime.js` | The original `<script>` (custom cursor, scroll reveal, canvas mind-map, flip-book brochure, contact form, admin dashboard), ported verbatim and run once on mount |
| `src/lib/brochure.ts` | The interactive flip-book brochure document, rendered inside the two brochure `<iframe srcDoc>` elements |

The interactive logic is the original vanilla JS, executed in a single `useEffect` after mount. It manipulates the DOM imperatively by `id`/`class` exactly as the standalone page did; React never re-renders those nodes, so behaviour is identical.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

## Notes

- **Logo** — the header/footer reference `IMG_0896.png` (as the original did). Drop that file into `public/` to show the logo; until then it hides itself gracefully, matching the original's `onerror` fallback.
- **Integrations** — the contact form posts to Web3Forms (placeholder key `YOUR_WEB3FORMS_KEY`) and ServiceM8, and the `⚙` admin panel stores data in the browser's `localStorage`, exactly as in the original file. Replace the keys / move secrets server-side before going live.
