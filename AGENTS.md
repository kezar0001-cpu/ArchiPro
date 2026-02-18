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
- **Fonts**: Space Grotesk (headings/body), JetBrains Mono (monospace accents)

## Design System
- **Style**: Neo-Brutalist "Paper & Ink"
- **Palette**: Paper `#FBFBFB`, Ink `#0A0A0A`, Accent `#FF5F00`, Accent-Alt `#CCFF00`, Muted `#6B6B6B`
- **Borders**: 3px solid ink
- **Shadows**: Hard offset (4px 4px 0 0), no blur
- **Grid**: 12-column blueprint grid, 1440px max-width

## Structure
```
src/
  components/
    Nav.jsx       — Fixed top nav, mobile overlay
    Hero.jsx      — Full-viewport hero with title block
  App.jsx         — Root composition
  main.jsx        — Entry point
  index.css       — Design system & Tailwind config
```
