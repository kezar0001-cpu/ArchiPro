-- ============================================================
-- ArchiPro Storage Buckets
-- Run this in Supabase SQL Editor AFTER schema.sql
-- ============================================================

-- Create buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('hero-video', 'hero-video', true);

-- ── project-images policies ──
CREATE POLICY "Public read project-images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'project-images');

CREATE POLICY "Editors upload project-images"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'project-images'
        AND public.has_role('editor')
    );

CREATE POLICY "Editors update project-images"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'project-images'
        AND public.has_role('editor')
    );

CREATE POLICY "Editors delete project-images"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'project-images'
        AND public.has_role('editor')
    );

-- ── hero-video policies ──
CREATE POLICY "Public read hero-video"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'hero-video');

CREATE POLICY "Editors upload hero-video"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'hero-video'
        AND public.has_role('editor')
    );

CREATE POLICY "Editors update hero-video"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'hero-video'
        AND public.has_role('editor')
    );

CREATE POLICY "Editors delete hero-video"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'hero-video'
        AND public.has_role('editor')
    );
