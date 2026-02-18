# HADI LAL DULEIMI — Neo-Brutalist Portfolio
## Build Plan v2.0 — Grayscale Monochrome + CMS

---

## Phase 1 · Design System (Grayscale Monochrome)
> Strictly Black, White, and Grey. No color accents. Brutalism through structure & contrast alone.

| Token            | Value                              | Purpose                          |
| ---------------- | ---------------------------------- | -------------------------------- |
| `--black`        | `#000000`                         | Primary borders, text, shadows   |
| `--white`        | `#FFFFFF`                         | Hero typography, inverted areas  |
| `--grey`         | `#888888`                         | Muted text, captions, metadata   |
| `--grey-light`   | `#F5F5F5`                         | Page background, cards           |
| `--overlay`      | `rgba(0,0,0,0.55)`               | Video overlay for readability    |
| Font primary     | **Space Grotesk** (Google Fonts)   | Headlines, body                  |
| Font mono        | **JetBrains Mono** (Google Fonts)  | Code-like accents, metadata      |
| Border weight    | `3px solid var(--black)`           | Neo-Brutalist signature          |
| Shadow           | `4px 4px 0 0 var(--black)`        | Hard, un-blurred offset          |
| Grid             | 12-column, `1440px` max           | Architectural blueprint layout   |

---

## Phase 2 · CMS Integration (Sanity.io)
> All dynamic content managed via Sanity Studio — no code changes needed to update the site.

### 2.1 Sanity Studio
- Embedded Sanity Studio at `/studio` route (or standalone).
- Dataset: `production`.
- API version: `2024-01-01`.

### 2.2 Content Schemas

#### `heroContent` (Singleton)
| Field           | Type            | Description                               |
| --------------- | --------------- | ----------------------------------------- |
| `headline`      | `string`        | Main hero headline text                   |
| `subheadline`   | `string`        | Subtitle / tagline                        |
| `videoFile`     | `file`          | Uploaded video for hero background        |
| `overlayOpacity`| `number`        | 0–1 slider for video overlay darkness     |

#### `project` (Document)
| Field           | Type            | Description                               |
| --------------- | --------------- | ----------------------------------------- |
| `title`         | `string`        | Project name                              |
| `slug`          | `slug`          | URL-safe slug                             |
| `description`   | `text`          | Short project description                 |
| `thumbnail`     | `image`         | Gallery thumbnail                         |
| `images`        | `array<image>`  | Full project gallery                      |
| `tags`          | `array<string>` | Category tags                             |
| `featured`      | `boolean`       | Show in hero gallery selection            |

---

## Phase 3 · Core Components

### 3.1 Navigation Bar (`<Nav />`)
- Fixed top, full-width, transparent bg over video → solid `--grey-light` on scroll.
- Left: Name logotype in Space Grotesk Bold, uppercase, white over hero / black elsewhere.
- Right: Links — WORK · ABOUT · CONTACT (grayscale only).
- Mobile: Hamburger → full-screen black overlay with stacked white links.

### 3.2 Hero Section (`<Hero />`)
- Full-viewport, looping muted autoplay video background (fetched from Sanity).
- Semi-transparent black overlay (`--overlay`) for readability.
- Massive white headline centered or bottom-anchored.
- Subtitle in JetBrains Mono, white, letter-spaced.
- Animated entrance via framer-motion.

### 3.3 Project Card (`<ProjectCard />`)
- Aspect-ratio 4:3, `3px` black border, hard shadow.
- Hover: shadow collapses, card snaps (grayscale effect).
- Content fetched from Sanity `project` documents.

### 3.4 Footer (`<Footer />`)
- Full-width, `--black` background, `--white` text.
- Left: Copyright + domain link.
- Right: Social icons (lucide-react, white).

---

## Phase 4 · Pages & Routing

| Route             | Component        | Content                              |
| ----------------- | ---------------- | ------------------------------------ |
| `/`               | `<HomePage />`   | Video Hero + featured project grid   |
| `/work/:slug`     | `<ProjectPage/>` | Full case study from Sanity          |
| `/about`          | `<AboutPage />`  | Bio, skills, downloadable CV         |
| `/studio`         | Sanity Studio    | CMS admin interface                  |

---

## Phase 5 · Deployment & SEO

### 5.1 Vercel
- `vercel.json` with alias `hadilalduleimi.com`.
- Environment vars: `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_TOKEN`.
- Preview deployments on PR branches.

### 5.2 SEO
- `<title>` and `<meta description>` per route.
- Open Graph + Twitter Card meta tags.
- `sitemap.xml` generated at build time.
- Canonical URL: `https://hadilalduleimi.com`.

---

## Current Status
- [x] Phase 1 — Design tokens defined (v2: grayscale)
- [x] Phase 1 — Tailwind v4 theme reconfigured to grayscale
- [x] Phase 2 — Sanity Studio initialized (project ID: uk1engd4)
- [x] Phase 2 — Content schemas created (heroContent, project)
- [x] Phase 3 — Nav component (grayscale update)
- [x] Phase 3 — Hero component (video background)
- [x] Phase 3 — Project Card (brutal-hover, 4:3 aspect, grayscale filter)
- [x] Phase 3 — Footer (black bg, white text, social icons)
- [x] Phase 4 — Routing setup (/, /work/:slug, /about, /studio)
- [ ] Phase 5 — **SEO & Deployment ← NEXT**
