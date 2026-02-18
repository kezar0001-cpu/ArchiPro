import { sanityClient, fileUrl } from './sanity';

/**
 * GROQ Queries for fetching content from Sanity CMS.
 */

// ── Hero Content (singleton) ──
export async function getHeroContent() {
    const query = `*[_type == "heroContent"][0]{
    headline,
    subheadline,
    videoFile,
    overlayOpacity
  }`;

    const data = await sanityClient.fetch(query);

    if (!data) return null;

    return {
        headline: data.headline || null,
        subheadline: data.subheadline || null,
        videoUrl: data.videoFile ? fileUrl(data.videoFile) : null,
        overlayOpacity: data.overlayOpacity ?? 0.55,
    };
}

// ── Featured Projects ──
export async function getFeaturedProjects() {
    const query = `*[_type == "project" && featured == true] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    thumbnail,
    tags
  }`;

    return sanityClient.fetch(query);
}

// ── Single Project by Slug ──
export async function getProjectBySlug(slug) {
    const query = `*[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    description,
    thumbnail,
    images,
    tags
  }`;

    return sanityClient.fetch(query, { slug });
}

// ── All Projects ──
export async function getAllProjects() {
    const query = `*[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    thumbnail,
    tags,
    featured
  }`;

    return sanityClient.fetch(query);
}
