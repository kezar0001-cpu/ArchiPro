/**
 * Sanity Schema: Project
 *
 * Each document represents a portfolio project with:
 * - Title, slug, description
 * - Thumbnail and image gallery
 * - Tags for categorization
 * - Featured flag for hero gallery selection
 */
const project = {
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 4,
            description: 'Short project description for cards and previews.',
        },
        {
            name: 'thumbnail',
            title: 'Thumbnail',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: 'Main image shown on project cards.',
        },
        {
            name: 'images',
            title: 'Gallery Images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                },
            ],
            description: 'Full project image gallery.',
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
            description: 'Category tags (e.g. "Architecture", "Residential").',
        },
        {
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            description: 'Show this project in the hero/featured section.',
            initialValue: false,
        },
    ],
    preview: {
        select: {
            title: 'title',
            media: 'thumbnail',
            featured: 'featured',
        },
        prepare({ title, media, featured }) {
            return {
                title: `${featured ? '⭐ ' : ''}${title}`,
                media,
            };
        },
    },
};

export default project;
