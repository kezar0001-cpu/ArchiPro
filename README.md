# ArchiPro — Neo-Brutalist Portfolio

A grayscale monochrome portfolio built with React 19, Vite 7, Tailwind CSS v4, and Sanity.io CMS.

## 🏗️ Architecture

This is a **monorepo** with two deployments:

1. **Main Website** (`/`) — React + Vite app deployed to [www.hadilalduleimi.com](https://www.hadilalduleimi.com)
2. **Sanity Studio** (`/studio`) — Standalone CMS deployed to [studio.hadilalduleimi.com](https://studio.hadilalduleimi.com)

## 🚀 Local Development

### Main Website (Vite App)

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Runs on `http://localhost:5173`

### Sanity Studio

```bash
# Navigate to studio folder
cd studio

# Install dependencies
npm install

# Start Studio dev server
npm run dev

# Build Studio for production
npm run build
```

Runs on `http://localhost:3333`

## 📦 Deployment

### Vercel Setup — Main Website

- **Project Name**: `archipro` (or your choice)
- **Root Directory**: `/` (repo root)
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**:
  - `VITE_SANITY_PROJECT_ID=uk1engd4`
  - `VITE_SANITY_DATASET=production`
- **Custom Domain**: `www.hadilalduleimi.com`

### Vercel Setup — Sanity Studio

- **Project Name**: `archipro-studio` (or your choice)
- **Root Directory**: `/studio`
- **Framework Preset**: Other
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**:
  - `SANITY_STUDIO_PROJECT_ID=uk1engd4`
  - `SANITY_STUDIO_DATASET=production`
- **Custom Domain**: `studio.hadilalduleimi.com`

## 🎨 Tech Stack

- **Frontend**: React 19, Vite 7
- **Styling**: Tailwind CSS v4, Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM v7
- **CMS**: Sanity.io v5
- **Hosting**: Vercel

## 📁 Project Structure

```
/
├── src/                    # Vite app source
│   ├── components/         # Nav, Hero, ProjectCard, Footer
│   ├── pages/             # ProjectPage, AboutPage
│   ├── lib/               # Sanity client, queries
│   └── schemas/           # (moved to /studio)
├── studio/                # Sanity Studio (standalone)
│   ├── schemas/           # CMS content schemas
│   ├── sanity.config.js   # Studio configuration
│   └── package.json       # Studio dependencies
├── public/                # Static assets
├── package.json           # Main app dependencies
└── vercel.json            # Vercel config for main site
```

## 🎯 Content Management

- Access Sanity Studio at [studio.hadilalduleimi.com](https://studio.hadilalduleimi.com)
- Content types:
  - **Hero Content** (singleton) — Video background, headline, overlay
  - **Projects** — Portfolio items with images, tags, featured flag

## 🔧 Configuration

### Sanity Studio Config (`/studio/sanity.config.js`)

- `projectId`: `uk1engd4`
- `dataset`: `production`
- `apiVersion`: `2024-01-01`
- `basePath`: `/` (root hosting, no subpath)
- Plugins: `structureTool()`, `visionTool()`

## 🎨 Design System

- **Palette**: Black (#000000), White (#FFFFFF), Grey (#888888), Grey-Light (#F5F5F5)
- **Fonts**: Space Grotesk (body), JetBrains Mono (monospace accents)
- **Borders**: 3px solid black
- **Shadows**: Hard offset (4px 4px 0 0 #000), no blur
- **Grid**: 12-column, 1440px max-width

## 📄 License

Private project. All rights reserved.
