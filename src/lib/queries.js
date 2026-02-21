import { supabase, getPublicUrl } from './supabase';

/**
 * Fetch a single site_content value by key.
 */
export async function getSiteContent(key) {
    const { data, error } = await supabase
        .from('site_content')
        .select('value')
        .eq('key', key)
        .single();

    if (error) return null;
    return data?.value ?? null;
}

/**
 * Fetch all site_content rows as a key-value map.
 */
export async function getAllSiteContent() {
    const { data, error } = await supabase
        .from('site_content')
        .select('key, value');

    if (error) return {};
    return Object.fromEntries((data || []).map((row) => [row.key, row.value]));
}

/**
 * Build hero data from site_content rows.
 */
export async function getHeroContent() {
    const content = await getAllSiteContent();
    if (!content.hero_headline) return null;

    const videoPath = content.hero_video_path;
    const videoUrl = videoPath ? getPublicUrl('hero-video', videoPath) : null;

    return {
        headline: content.hero_headline || null,
        subheadline: content.hero_subheadline || null,
        videoUrl,
        overlayOpacity: parseFloat(content.hero_overlay_opacity) || 0.55,
    };
}

/**
 * Fetch featured published projects.
 */
export async function getFeaturedProjects() {
    const { data, error } = await supabase
        .from('projects')
        .select('id, title, slug, description, tags, featured, sort_order')
        .eq('status', 'published')
        .eq('featured', true)
        .order('sort_order', { ascending: true });

    if (error) {
        console.warn('Error fetching featured projects:', error.message);
        return [];
    }

    // Attach thumbnail (first image) for each project
    const projectsWithThumbs = await Promise.all(
        (data || []).map(async (project) => {
            const { data: images } = await supabase
                .from('project_images')
                .select('storage_path, alt_text')
                .eq('project_id', project.id)
                .order('sort_order', { ascending: true })
                .limit(1);

            const thumb = images?.[0];
            return {
                ...project,
                thumbnailUrl: thumb ? getPublicUrl('project-images', thumb.storage_path) : null,
                thumbnailAlt: thumb?.alt_text || project.title,
            };
        })
    );

    return projectsWithThumbs;
}

/**
 * Fetch all published projects.
 */
export async function getAllProjects() {
    const { data, error } = await supabase
        .from('projects')
        .select('id, title, slug, description, tags, featured, sort_order')
        .eq('status', 'published')
        .order('sort_order', { ascending: true });

    if (error) {
        console.warn('Error fetching projects:', error.message);
        return [];
    }

    const projectsWithThumbs = await Promise.all(
        (data || []).map(async (project) => {
            const { data: images } = await supabase
                .from('project_images')
                .select('storage_path, alt_text')
                .eq('project_id', project.id)
                .order('sort_order', { ascending: true })
                .limit(1);

            const thumb = images?.[0];
            return {
                ...project,
                thumbnailUrl: thumb ? getPublicUrl('project-images', thumb.storage_path) : null,
                thumbnailAlt: thumb?.alt_text || project.title,
            };
        })
    );

    return projectsWithThumbs;
}

/**
 * Fetch a single project by slug, including all images.
 */
export async function getProjectBySlug(slug) {
    const { data: project, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

    if (error || !project) return null;

    const { data: images } = await supabase
        .from('project_images')
        .select('id, storage_path, alt_text, sort_order')
        .eq('project_id', project.id)
        .order('sort_order', { ascending: true });

    return {
        ...project,
        images: (images || []).map((img) => ({
            ...img,
            url: getPublicUrl('project-images', img.storage_path),
        })),
    };
}
