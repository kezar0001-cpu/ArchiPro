/**
 * Sanity Schema: Hero Content (Singleton)
 *
 * A single document that controls the hero section:
 * - Video file for background
 * - Headline + Subheadline text
 * - Overlay opacity slider
 */
const heroContent = {
    name: 'heroContent',
    title: 'Hero Content',
    type: 'document',
    fields: [
        {
            name: 'headline',
            title: 'Headline',
            type: 'string',
            description: 'Main hero text. Use \\n for line breaks (e.g. "HADI LAL\\nDULEIMI").',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'subheadline',
            title: 'Subheadline',
            type: 'string',
            description: 'Smaller text below the headline.',
        },
        {
            name: 'videoFile',
            title: 'Hero Video',
            type: 'file',
            description: 'Upload an MP4 video for the hero background. Recommended: 1920×1080, under 20MB.',
            options: {
                accept: 'video/mp4,video/webm',
            },
        },
        {
            name: 'overlayOpacity',
            title: 'Overlay Opacity',
            type: 'number',
            description: 'Controls darkness of the overlay on the video (0 = transparent, 1 = solid black). Default: 0.55.',
            validation: (Rule) => Rule.min(0).max(1),
            initialValue: 0.55,
        },
    ],
    __experimental_actions: ['update', 'publish'],
};

export default heroContent;
