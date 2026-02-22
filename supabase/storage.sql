-- Safe re-run: skips existing buckets, drops and recreates all policies

INSERT INTO storage.buckets (id, name, public) VALUES ('project-images',      'project-images',      true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('hero-video',           'hero-video',           true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('resume-documents',     'resume-documents',     true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('contact-attachments',  'contact-attachments',  true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('profile-photo',        'profile-photo',        true) ON CONFLICT (id) DO NOTHING;

-- Drop all existing storage policies
DO $$
DECLARE pol RECORD;
BEGIN
  FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', pol.policyname);
  END LOOP;
END $$;

-- project-images
CREATE POLICY "Public read project-images"      ON storage.objects FOR SELECT USING (bucket_id = 'project-images');
CREATE POLICY "Editors upload project-images"   ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'project-images' AND public.has_role('editor'));
CREATE POLICY "Editors update project-images"   ON storage.objects FOR UPDATE USING (bucket_id = 'project-images' AND public.has_role('editor'));
CREATE POLICY "Editors delete project-images"   ON storage.objects FOR DELETE USING (bucket_id = 'project-images' AND public.has_role('editor'));

-- hero-video
CREATE POLICY "Public read hero-video"          ON storage.objects FOR SELECT USING (bucket_id = 'hero-video');
CREATE POLICY "Editors upload hero-video"       ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'hero-video' AND public.has_role('editor'));
CREATE POLICY "Editors update hero-video"       ON storage.objects FOR UPDATE USING (bucket_id = 'hero-video' AND public.has_role('editor'));
CREATE POLICY "Editors delete hero-video"       ON storage.objects FOR DELETE USING (bucket_id = 'hero-video' AND public.has_role('editor'));

-- resume-documents
CREATE POLICY "Public read resume-documents"    ON storage.objects FOR SELECT USING (bucket_id = 'resume-documents');
CREATE POLICY "Editors upload resume-documents" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'resume-documents' AND public.has_role('editor'));
CREATE POLICY "Editors update resume-documents" ON storage.objects FOR UPDATE USING (bucket_id = 'resume-documents' AND public.has_role('editor'));
CREATE POLICY "Editors delete resume-documents" ON storage.objects FOR DELETE USING (bucket_id = 'resume-documents' AND public.has_role('editor'));

-- contact-attachments (public upload allowed)
CREATE POLICY "Public read contact-attachments"   ON storage.objects FOR SELECT USING (bucket_id = 'contact-attachments');
CREATE POLICY "Anyone upload contact-attachments" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'contact-attachments');

-- profile-photo
CREATE POLICY "Public read profile-photo"       ON storage.objects FOR SELECT USING (bucket_id = 'profile-photo');
CREATE POLICY "Editors upload profile-photo"    ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'profile-photo' AND public.has_role('editor'));
CREATE POLICY "Editors update profile-photo"    ON storage.objects FOR UPDATE USING (bucket_id = 'profile-photo' AND public.has_role('editor'));
CREATE POLICY "Editors delete profile-photo"    ON storage.objects FOR DELETE USING (bucket_id = 'profile-photo' AND public.has_role('editor'));