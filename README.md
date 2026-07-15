# Cognivanta Rising — Cognivanta Labs website rebuild

This is the full source for the new Cognivanta Labs marketing site, exported
from the Lovable project "Cognivanta Rising" so it can be developed locally
without Lovable.

## Stack

- TanStack Start (SSR React framework) + TanStack Router (file-based routing
  in `src/routes/`)
- React 19, Tailwind CSS v4, shadcn/ui ("new-york" style)
- Lucide icons

## Getting started

```bash
npm install     # or: bun install
npm run dev     # or: bun run dev — starts a local dev server
npm run build   # production build
```

## What's here

- `src/data/products.ts` — every product in the ecosystem (CINTENT, ShunyAI,
  NyayNetra, CHAXU, BlissTrail, IKSHANA, CWOS, Health Hub, Design Studio,
  AskCOGNI, Cognitive Cobots, AWCS, Externovate) as a single config array.
  Add a new product here and it automatically appears on `/products` and the
  homepage — no template changes needed.
- `src/data/industries.ts` — the 12 application domains shown on `/applications`.
- `src/routes/*.tsx` — one file per page (`/`, `/platform`, `/products`,
  `/applications`, `/research`, `/about`, `/contact`). `__root.tsx` is the
  shared app shell (header/footer, fonts, SEO defaults).
- `src/components/site/` — Header, Footer, the animated OrbitDiagram, the
  ProductCard, and the Reveal scroll-in-animation wrapper.
- `src/styles.css` — the whole design system: colors, gradients, glass
  effect, animations. Everything is a CSS variable / Tailwind `@utility`, so
  re-theming means editing this one file.

### Three products need real copy

`IKSHANA`, `CWOS`, and `Health Hub` in `src/data/products.ts` currently carry
`draftNote` fields because only their name + one-line tagline were confirmed
(pulled from an internal pitch deck). Replace `description` and remove
`draftNote` once you have the real product copy.

### Not included

- `bun.lock` — the original lockfile was 180k+ characters and regenerates
  automatically on `npm install` / `bun install`, so it's not carried over.
- `public/favicon.ico` — a binary file the export API couldn't return as
  text. Drop your own favicon at `public/favicon.ico`.
- ~25 unused shadcn/ui primitives (calendar, carousel, chart, command,
  context-menu, drawer, form, hover-card, input-otp, menubar,
  navigation-menu, pagination, popover, progress, radio-group, resizable,
  scroll-area, sheet, sidebar, skeleton, slider, sonner, switch, table,
  toggle, toggle-group) that Lovable scaffolds by default but the site
  doesn't currently use. If you need one, add it with:
  `npx shadcn@latest add <component-name>`
- The original `vite.config.ts` depended on `@lovable.dev/vite-tanstack-config`,
  a wrapper only available inside Lovable. It's been replaced here with a
  plain Vite config that wires up the same plugins directly (TanStack Start,
  React, Tailwind v4, tsconfig paths) so the project builds standalone.

## Live preview (Lovable-hosted, still active)

https://id-preview--2794e392-f380-400c-840d-b88df16e695b.lovable.app
