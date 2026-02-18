# ArchiPro Deployment Guide

## ✅ Pre-Deployment Checklist

### Repository Structure
- [x] `/studio` folder created with standalone Sanity Studio
- [x] Studio has own `package.json` with correct scripts
- [x] Schemas moved from `/src/schemas` to `/studio/schemas`
- [x] Studio configured for root hosting (`basePath: '/'`)
- [x] Studio route removed from Vite app (`/studio` no longer exists)
- [x] Main app cleaned of Studio dependencies

### Configuration Files

#### `/studio/sanity.config.js`
```js
export default defineConfig({
    name: 'archi-pro',
    title: 'ArchiPro CMS',
    projectId: 'uk1engd4',
    dataset: 'production',
    apiVersion: '2024-01-01',
    basePath: '/',  // Root hosting - no subpath
    plugins: [structureTool(), visionTool()],
    schema: { types: schemaTypes },
});
```

#### `/studio/package.json` Scripts
```json
{
  "scripts": {
    "dev": "sanity dev",
    "build": "sanity build",
    "start": "sanity start"
  }
}
```

## 🚀 Deployment Steps

### Step 1: Deploy Main Website to Vercel

1. **Create Vercel Project**
   - Go to [vercel.com](https://vercel.com)
   - Import Git repository
   - Name: `archipro` (or your choice)

2. **Configure Build Settings**
   - **Framework Preset**: Vite
   - **Root Directory**: `/` (leave empty)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Add Environment Variables**
   ```
   VITE_SANITY_PROJECT_ID=uk1engd4
   VITE_SANITY_DATASET=production
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

5. **Add Custom Domain**
   - Go to Project Settings → Domains
   - Add: `www.hadilalduleimi.com`
   - Configure DNS (see below)

### Step 2: Deploy Sanity Studio to Vercel

1. **Create Second Vercel Project**
   - Go to [vercel.com](https://vercel.com)
   - Import same Git repository
   - Name: `archipro-studio` (or your choice)

2. **Configure Build Settings**
   - **Framework Preset**: Other
   - **Root Directory**: `studio` (IMPORTANT!)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Add Environment Variables**
   ```
   SANITY_STUDIO_PROJECT_ID=uk1engd4
   SANITY_STUDIO_DATASET=production
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

5. **Add Custom Domain**
   - Go to Project Settings → Domains
   - Add: `studio.hadilalduleimi.com`
   - Configure DNS (see below)

### Step 3: DNS Configuration

#### Option A: Using Vercel DNS (Recommended)
1. Add both domains in Vercel
2. Point nameservers to Vercel:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

#### Option B: Using External DNS
Add these records at your DNS provider:

**For www.hadilalduleimi.com:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**For studio.hadilalduleimi.com:**
```
Type: CNAME
Name: studio
Value: cname.vercel-dns.com
```

**For root domain (hadilalduleimi.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

### Step 4: Verify Deployment

1. **Main Website**
   - Visit: https://www.hadilalduleimi.com
   - Check: Hero loads, navigation works
   - Check: Projects section displays (may be empty initially)

2. **Sanity Studio**
   - Visit: https://studio.hadilalduleimi.com
   - Check: Studio interface loads
   - Check: Can login with Sanity credentials
   - Check: Schemas appear (Hero Content, Projects)

3. **Content Flow**
   - Add hero content in Studio
   - Add test project in Studio
   - Publish content
   - Refresh main website
   - Verify content appears

## 🔧 Troubleshooting

### Build Fails on Main Site
- Ensure `.env` has correct `VITE_SANITY_PROJECT_ID`
- Check that `@sanity/client` and `@sanity/image-url` are in dependencies
- Verify no imports reference old `/studio` route

### Build Fails on Studio
- Ensure Root Directory is set to `studio` in Vercel
- Check `studio/package.json` has all required dependencies
- Verify `studio/schemas/index.js` exports `schemaTypes`

### Studio Shows "Tool not found: studio"
- This error should not occur with root hosting (`basePath: '/'`)
- If it does, verify `basePath` is set in `studio/sanity.config.js`
- Check build output includes `dist/` folder

### Content Not Appearing on Website
- Verify environment variables match in both projects
- Check browser console for CORS errors
- Confirm content is published (not just saved as draft) in Studio

## 📋 Post-Deployment Tasks

- [ ] Add hero video and content in Studio
- [ ] Create 3-6 portfolio projects
- [ ] Test all routes: `/`, `/work/:slug`, `/about`
- [ ] Verify responsive design on mobile
- [ ] Test form submissions (if applicable)
- [ ] Set up Vercel Analytics (optional)
- [ ] Configure preview deployments for branches

## 🔄 Future Updates

### Updating Main Website
```bash
git add .
git commit -m "Update website"
git push
```
Vercel auto-deploys on push to main branch.

### Updating Studio
```bash
cd studio
# Make changes to schemas or config
git add .
git commit -m "Update Studio schemas"
git push
```
Studio project auto-deploys separately.

### Adding New Content Schema
1. Create schema file in `studio/schemas/`
2. Export from `studio/schemas/index.js`
3. Push to trigger Studio rebuild
4. Add corresponding query in `src/lib/queries.js` (main site)
5. Create UI component to display content (main site)
6. Push main site changes

## 📞 Support

For Sanity-specific issues:
- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Slack Community](https://slack.sanity.io)

For Vercel deployment issues:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)
