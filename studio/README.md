# ArchiPro Studio — Sanity CMS

Standalone Sanity Studio deployment for managing portfolio content.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start Studio dev server (localhost:3333)
npm run dev

# Build for production
npm run build
```

## 📦 Deployment (Vercel)

This Studio is deployed separately from the main website.

### Vercel Settings

- **Root Directory**: `/studio`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework Preset**: Other

### Environment Variables

```
SANITY_STUDIO_PROJECT_ID=uk1engd4
SANITY_STUDIO_DATASET=production
```

### Custom Domain

- **Studio URL**: [studio.hadilalduleimi.com](https://studio.hadilalduleimi.com)

## 📋 Content Schemas

### Hero Content (Singleton)
- Headline (with line breaks)
- Subheadline
- Video file upload
- Overlay opacity slider

### Projects
- Title, slug
- Description
- Thumbnail image
- Gallery images
- Tags array
- Featured flag

## ⚙️ Configuration

- **Project ID**: `uk1engd4`
- **Dataset**: `production`
- **API Version**: `2024-01-01`
- **Base Path**: `/` (root hosting)
- **Plugins**: Structure Tool, Vision Tool

## 🔗 Integration

The main website (`www.hadilalduleimi.com`) fetches content from this CMS using:
- `@sanity/client` for API calls
- GROQ queries for content retrieval
- Environment variables for project credentials
