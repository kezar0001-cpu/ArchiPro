# ArchiPro — Neo-Brutalist Portfolio

A grayscale monochrome architecture portfolio with a built-in admin area, powered by React 19, Vite 7, Tailwind CSS v4, and Supabase (Auth + Postgres + Storage).

## Tech Stack

- **Frontend**: React 19, Vite 7, Tailwind CSS v4, Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM v7
- **Backend**: Supabase (Auth, Postgres, Storage)
- **Hosting**: Vercel

## Local Development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # Production build → dist/
npm run preview    # Preview production build
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the SQL Editor to create tables + RLS policies
3. Run `supabase/storage.sql` to create storage buckets
4. Create a user in Authentication → Users for admin access
5. Update the user's `role` to `admin` in the `profiles` table

## Project Structure

```
src/
  components/       Nav, Hero, ProjectCard, Footer, RequireAuth
  pages/
    admin/          LoginPage, AdminLayout, DashboardPage,
                    ContentPage, HeroVideoPage, ProjectsPage,
                    ProjectEditPage
    AboutPage.jsx   Bio, skills, CV download
    ProjectPage.jsx Individual project detail
    WorkPage.jsx    All published projects
  lib/
    supabase.js     Supabase client + helpers
    queries.js      Data fetching functions
    AuthContext.jsx  Auth state management
  App.jsx           Routes (public + admin)
  main.jsx          Entry point
  index.css         Design system + Tailwind v4 @theme
supabase/
  schema.sql        Database tables, RLS, triggers
  storage.sql       Storage buckets + policies
public/
  robots.txt
  sitemap.xml
```

## Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Homepage: hero, featured projects, about, contact |
| `/work` | Public | All published projects |
| `/work/:slug` | Public | Project detail page |
| `/about` | Public | Bio, skills, experience |
| `/admin/login` | Public | Admin login |
| `/admin` | Auth | Dashboard |
| `/admin/content` | Auth | Edit site text (hero, about, contact) |
| `/admin/hero-video` | Auth | Upload/replace hero background video |
| `/admin/projects` | Auth | CRUD projects |
| `/admin/projects/:id` | Auth | Edit project + manage images |

## Deployment (Vercel)

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- **Custom Domain**: `hadilalduleimi.com`

## Design System

- **Palette**: Black (#000), White (#FFF), Grey (#888), Grey-Light (#F5F5F5)
- **Fonts**: Space Grotesk (headings/body), JetBrains Mono (accents)
- **Borders**: 3px solid black
- **Shadows**: Hard offset (4px 4px 0 0 #000), no blur
- **Grid**: 12-column, 1440px max-width

## License

Private project. All rights reserved.
