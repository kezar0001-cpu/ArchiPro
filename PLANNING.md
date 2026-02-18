# HADI LAL DULEIMI — Neo-Brutalist Portfolio
## Build Plan v1.0

---

## Phase 1 · Design System
> Establish the visual DNA before writing any components.

| Token          | Value                              | Purpose                          |
| -------------- | ---------------------------------- | -------------------------------- |
| `--paper`      | `#FBFBFB`                         | Off-white background (concrete)  |
| `--ink`        | `#0A0A0A`                         | Primary text / borders           |
| `--accent`     | `#FF5F00`                         | Safety-orange CTA / highlight    |
| `--accent-alt` | `#CCFF00`                         | Secondary pop (hover states)     |
| `--muted`      | `#6B6B6B`                         | Captions / metadata              |
| Font primary   | **Space Grotesk** (Google Fonts)   | Headlines, body                  |
| Font mono      | **JetBrains Mono** (Google Fonts)  | Code-like accents, metadata      |
| Border weight  | `3px solid var(--ink)`             | Neo-Brutalist signature          |
| Shadow         | `4px 4px 0 0 var(--ink)`          | Hard, un-blurred offset          |
| Grid           | 12-column, `80px` gutter          | Architectural blueprint layout   |
| Spacing scale  | 4 / 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128 px | Strict 8-point system  |

---

## Phase 2 · Core Components
> Each component strict to design tokens; no ad-hoc styling.

### 2.1 Navigation Bar (`<Nav />`)
- Fixed top, full-width, `--paper` bg with a `3px` bottom border.
- Left: Name logotype in Space Grotesk Bold, uppercase.
- Right: Links — WORK · ABOUT · CONTACT.
- Mobile: Hamburger → full-screen overlay with stacked links.

### 2.2 Hero Section (`<Hero />`)
- Full-viewport height, 12-column grid visible as faint blueprint lines.
- Massive headline: "HADI LAL DULEIMI" set in ~8vw.
- Subtitle: "LAUNCHING SOON" in JetBrains Mono, letter-spaced.
- Animated horizontal rule (framer-motion, draws from left to right).
- Bottom-left: metadata block (location, date, status) styled like a technical drawing title block.

### 2.3 Project Card (`<ProjectCard />`)
- Aspect-ratio 4:3, `3px` ink border, hard shadow.
- Hover: shadow collapses to 0, card translates by shadow offset (snap effect).
- Image fills card, overlay with project title on hover.

### 2.4 Footer (`<Footer />`)
- Full-width, `--ink` background, `--paper` text.
- Left: Copyright + domain link.
- Right: Social icons (lucide-react).
- Top border: thick accent-colored divider.

---

## Phase 3 · Pages & Routing
> React Router v7, lazy-loaded routes.

| Route             | Component        | Content                              |
| ----------------- | ---------------- | ------------------------------------ |
| `/`               | `<HomePage />`   | Hero + featured project grid         |
| `/work/:slug`     | `<ProjectPage/>` | Full case study with image gallery   |
| `/about`          | `<AboutPage />`  | Bio, skills, downloadable CV         |

---

## Phase 4 · Deployment & SEO

### 4.1 Vercel
- `vercel.json` already configured with alias `hadilalduleimi.com`.
- Preview deployments on PR branches.
- Production on `main` branch push.

### 4.2 SEO
- `<title>` and `<meta description>` per route (react-helmet-async).
- Open Graph + Twitter Card meta tags with generated social images.
- `sitemap.xml` generated at build time.
- Canonical URL: `https://hadilalduleimi.com`.
- Structured data (JSON-LD) for Person schema.

### 4.3 Performance
- Image optimization via `vite-imagetools` or Vercel Image Optimization.
- Font subsetting (latin only) with `font-display: swap`.
- Lighthouse target: 95+ across all categories.

---

## Current Status
- [x] Phase 1 — Design tokens defined
- [ ] Phase 1 — Tailwind v4 theme configured
- [ ] Phase 2 — Nav component
- [ ] Phase 2 — Hero component
- [ ] Phase 2 — Project Card
- [ ] Phase 2 — Footer
- [ ] Phase 3 — Routing setup
- [ ] Phase 4 — SEO & Deployment
