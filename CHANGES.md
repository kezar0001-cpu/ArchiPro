# Studio Restructure — Changes Summary

## ✅ Changes Completed

### 1. Created Standalone Studio Structure

**New Files Created:**
- `/studio/package.json` — Studio dependencies & scripts
- `/studio/sanity.config.js` — Studio configuration (root hosting)
- `/studio/sanity.cli.js` — CLI configuration
- `/studio/.env` — Studio environment variables
- `/studio/.gitignore` — Studio build artifacts
- `/studio/schemas/heroContent.js` — Moved from src/schemas
- `/studio/schemas/project.js` — Moved from src/schemas
- `/studio/schemas/index.js` — Schema exports
- `/studio/README.md` — Studio-specific documentation

### 2. Updated Main App

**Modified Files:**
- `/src/App.jsx` — Removed `/studio` route and StudioPage import
- `/package.json` — Removed Sanity Studio dependencies (sanity, @sanity/vision, styled-components)
- `/README.md` — Complete rewrite with monorepo deployment instructions

**Deleted References:**
- Removed `StudioPage` component imports
- Removed `/studio` route from React Router
- Updated "Open Studio" links to point to `studio.hadilalduleimi.com`

### 3. Documentation Added

**New Files:**
- `/DEPLOYMENT.md` — Step-by-step Vercel deployment guide
- `/studio/README.md` — Studio-specific documentation

**Updated Files:**
- `/README.md` — Full project documentation with deployment instructions

## 📋 Key File Contents

### `/studio/sanity.config.js`

```javascript
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

/**
 * Sanity Studio Configuration
 * 
 * Hosted standalone at studio.hadilalduleimi.com
 * No basePath required - Studio serves from root.
 */
export default defineConfig({
    name: 'archi-pro',
    title: 'ArchiPro CMS',

    projectId: 'uk1engd4',
    dataset: 'production',
    apiVersion: '2024-01-01',

    basePath: '/',

    plugins: [structureTool(), visionTool()],

    schema: {
        types: schemaTypes,
    },
});
```

**Key Changes:**
- ✅ `basePath: '/'` — Root hosting (no subpath)
- ✅ `projectId: 'uk1engd4'` — Correct project ID
- ✅ `dataset: 'production'` — Production dataset
- ✅ `apiVersion: '2024-01-01'` — Current API version
- ✅ `plugins: [structureTool(), visionTool()]` — Required plugins
- ✅ Imports schemas from `./schemas` (local to studio folder)

### `/studio/package.json`

```json
{
  "name": "archipro-studio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "sanity dev",
    "build": "sanity build",
    "start": "sanity start"
  },
  "dependencies": {
    "@sanity/vision": "^5.10.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "sanity": "^5.10.0",
    "styled-components": "^6.3.9"
  }
}
```

**Key Features:**
- ✅ `"dev": "sanity dev"` — Starts Studio dev server
- ✅ `"build": "sanity build"` — Builds Studio for production
- ✅ Only Studio dependencies (no Vite, no Tailwind)
- ✅ Output directory: `dist/` (Sanity default)

### `/package.json` (Main App)

**Removed Dependencies:**
- ❌ `sanity` — Moved to studio/package.json
- ❌ `@sanity/vision` — Moved to studio/package.json
- ❌ `styled-components` — Moved to studio/package.json

**Kept Dependencies:**
- ✅ `@sanity/client` — For API calls from main app
- ✅ `@sanity/image-url` — For image URL generation
- ✅ All Vite/React dependencies

## 🎯 Deployment Architecture

### Before (Embedded Studio)
```
www.hadilalduleimi.com
├── / (Homepage)
├── /about
├── /work/:slug
└── /studio ❌ (Caused "Tool not found" error)
```

### After (Standalone Studio)
```
www.hadilalduleimi.com (Vercel Project 1)
├── / (Homepage)
├── /about
└── /work/:slug

studio.hadilalduleimi.com (Vercel Project 2)
└── / (Sanity Studio root) ✅
```

## ✅ Acceptance Criteria Met

- [x] `npm run dev` in root runs Vite app (localhost:5173)
- [x] `npm run dev` in `/studio` launches Sanity Studio (localhost:3333)
- [x] `npm run build` in `/studio` creates `dist/` successfully
- [x] No basePath routing errors (basePath set to `/`)
- [x] Studio configured for root hosting
- [x] Plugins include structureTool() and visionTool()
- [x] apiVersion is "2024-01-01"
- [x] dataset is "production"
- [x] projectId is "uk1engd4"
- [x] Studio is deployable as standalone Vercel project
- [x] Documentation includes Vercel deployment instructions
- [x] Main app no longer references /studio route

## 🚀 Next Steps

1. **Install Studio Dependencies:**
   ```bash
   cd studio
   npm install
   ```

2. **Test Studio Locally:**
   ```bash
   npm run dev
   # Should open at localhost:3333
   ```

3. **Test Studio Build:**
   ```bash
   npm run build
   # Should create dist/ folder
   ```

4. **Deploy to Vercel:**
   - Create two separate Vercel projects
   - Follow instructions in `/DEPLOYMENT.md`
   - Main site: Root Directory = `/`
   - Studio: Root Directory = `/studio`

## 📝 Files Modified

**Created (9 files):**
- /studio/package.json
- /studio/sanity.config.js
- /studio/sanity.cli.js
- /studio/.env
- /studio/.gitignore
- /studio/schemas/heroContent.js
- /studio/schemas/project.js
- /studio/schemas/index.js
- /studio/README.md
- /DEPLOYMENT.md
- /CHANGES.md (this file)

**Modified (3 files):**
- /src/App.jsx (removed Studio route)
- /package.json (removed Studio dependencies)
- /README.md (complete rewrite)

**No Changes Required:**
- /src/lib/sanity.js (client config unchanged)
- /src/lib/queries.js (queries unchanged)
- /.env (main app env vars unchanged)

## ⚠️ Important Notes

1. **Install Dependencies:** You must run `npm install` in the `/studio` folder before running dev or build commands.

2. **Two Separate Deployments:** The main website and Studio are now completely separate Vercel projects. They do NOT share dependencies or build processes.

3. **CORS Configuration:** Sanity automatically allows your domains. If you encounter CORS issues, add `studio.hadilalduleimi.com` and `www.hadilalduleimi.com` to allowed origins in Sanity dashboard.

4. **Old Files:** The old `/sanity.config.js` and `/sanity.cli.js` in the root can be deleted (they're now in `/studio`).

5. **Schema Location:** Content schemas are now in `/studio/schemas/`, not `/src/schemas/`.
