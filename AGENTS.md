# Project Context — ArchiPro

## Domain
- **Professional Domain**: https://hadilalduleimi.com

## Hosting
- **Provider**: Vercel
- **Project**: `kezar0001-cpus-projects/archi-pro`
- **Config**: `vercel.json` with alias `hadilalduleimi.com`

## Tech Stack
- **Framework**: React 19 + Vite 7
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite`)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **CMS**: Sanity.io (`@sanity/client`, `@sanity/image-url`)
- **Fonts**: Space Grotesk (headings/body), JetBrains Mono (monospace accents)

## Design System (v2 — Grayscale Monochrome)
- **Style**: Neo-Brutalist, strictly grayscale
- **Palette**: Black `#000000`, White `#FFFFFF`, Grey `#888888`, Grey-Light `#F5F5F5`
- **No color accents** — contrast through structure only
- **Borders**: 3px solid black
- **Shadows**: Hard offset (4px 4px 0 0 #000), no blur
- **Grid**: 12-column blueprint grid, 1440px max-width

## Sanity CMS
- **Env vars**: `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`
- **Schemas**: `heroContent` (singleton), `project` (documents)
- **Queries**: `src/lib/queries.js`

## Structure
```
src/
  components/
    Nav.jsx         — Fixed nav, transparent→solid on scroll, grayscale
    Hero.jsx        — Video hero with overlay, Sanity-driven content
  lib/
    sanity.js       — Client config, image/file URL helpers
    queries.js      — GROQ query functions
  schemas/
    heroContent.js  — Hero singleton schema
    project.js      — Project document schema
    index.js        — Schema barrel export
  App.jsx           — Root with Sanity data fetching
  main.jsx          — Entry point
  index.css         — Design system & Tailwind v4 @theme
```
