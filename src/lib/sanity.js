import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

/**
 * Sanity Client Configuration
 *
 * Reads project credentials from environment variables.
 * In Vite, these must be prefixed with VITE_ to be exposed to the client.
 *
 * Required env vars:
 *   VITE_SANITY_PROJECT_ID  — Your Sanity project ID
 *   VITE_SANITY_DATASET     — Dataset name (usually 'production')
 */
export const sanityClient = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '',
    dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: true, // `false` if you want fresh data for previews
});

// Image URL builder helper
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
    return builder.image(source);
}

/**
 * Get the download URL for a Sanity file asset (e.g., video).
 * File references follow the pattern: file-{id}-{extension}
 */
export function fileUrl(fileAsset) {
    if (!fileAsset?.asset?._ref) return null;

    const ref = fileAsset.asset._ref;
    // ref format: file-<id>-<extension>
    const [, id, extension] = ref.split('-');
    const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
    const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

    return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${extension}`;
}
