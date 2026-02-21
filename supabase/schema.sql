-- ============================================================
-- ArchiPro Database Schema
-- Run this in Supabase SQL Editor to set up all tables + RLS
-- ============================================================

-- ── Enums ──
CREATE TYPE user_role AS ENUM ('admin', 'editor');
CREATE TYPE project_status AS ENUM ('draft', 'published');

-- ── Profiles ──
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT,
    role user_role NOT NULL DEFAULT 'editor',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Anyone can read profiles (needed for display names)
CREATE POLICY "Public read profiles"
    ON profiles FOR SELECT
    USING (true);

-- Users can update their own profile
CREATE POLICY "Users update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- Auto-create a profile row when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, display_name, role)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email), 'editor');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ── Helper: check if current user has admin or editor role ──
CREATE OR REPLACE FUNCTION public.has_role(required_role user_role)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid()
        AND (role = required_role OR role = 'admin')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── Site Content (key-value pairs for editable text) ──
CREATE TABLE site_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL DEFAULT '',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_by UUID REFERENCES profiles(id)
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read site_content"
    ON site_content FOR SELECT
    USING (true);

-- Editors can insert/update site_content
CREATE POLICY "Editors insert site_content"
    ON site_content FOR INSERT
    WITH CHECK (public.has_role('editor'));

CREATE POLICY "Editors update site_content"
    ON site_content FOR UPDATE
    USING (public.has_role('editor'))
    WITH CHECK (public.has_role('editor'));

-- ── Projects ──
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    details TEXT,
    tags TEXT[] DEFAULT '{}',
    featured BOOLEAN NOT NULL DEFAULT false,
    status project_status NOT NULL DEFAULT 'draft',
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Public can only see published projects
CREATE POLICY "Public read published projects"
    ON projects FOR SELECT
    USING (status = 'published');

-- Editors can see all projects (including drafts) when authenticated
CREATE POLICY "Editors read all projects"
    ON projects FOR SELECT
    USING (public.has_role('editor'));

CREATE POLICY "Editors insert projects"
    ON projects FOR INSERT
    WITH CHECK (public.has_role('editor'));

CREATE POLICY "Editors update projects"
    ON projects FOR UPDATE
    USING (public.has_role('editor'))
    WITH CHECK (public.has_role('editor'));

CREATE POLICY "Editors delete projects"
    ON projects FOR DELETE
    USING (public.has_role('editor'));

-- ── Project Images ──
CREATE TABLE project_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    alt_text TEXT DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read project_images"
    ON project_images FOR SELECT
    USING (true);

CREATE POLICY "Editors insert project_images"
    ON project_images FOR INSERT
    WITH CHECK (public.has_role('editor'));

CREATE POLICY "Editors update project_images"
    ON project_images FOR UPDATE
    USING (public.has_role('editor'))
    WITH CHECK (public.has_role('editor'));

CREATE POLICY "Editors delete project_images"
    ON project_images FOR DELETE
    USING (public.has_role('editor'));

-- ── Seed default site content ──
INSERT INTO site_content (key, value) VALUES
    ('hero_headline', 'HADI LAL\nDULEIMI'),
    ('hero_subheadline', 'ARCHITECT & DESIGNER — MELBOURNE, AU'),
    ('hero_overlay_opacity', '0.55'),
    ('hero_video_path', ''),
    ('about_intro', 'I''m Hadil Al-Duleimi, an architect and designer based in Melbourne, Australia. With over 8 years of experience in architectural design, I specialize in creating spaces that blend functionality with innovative design.'),
    ('about_tagline', 'Architect · Designer · Melbourne'),
    ('contact_email', 'hello@hadilalduleimi.com'),
    ('contact_cta', 'Ready to bring your project to life?')
ON CONFLICT (key) DO NOTHING;

-- ── Updated_at trigger for projects ──
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER site_content_updated_at
    BEFORE UPDATE ON site_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
