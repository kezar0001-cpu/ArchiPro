import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

/**
 * Sanity Studio Configuration
 * 
 * Hosted standalone at studio.hadilalduleimi.com
 * No basePath required - Studio serves from root.
 */
export default defineConfig({
    name: 'archi-pro',
    title: 'ArchiPro CMS',

    projectId: 'uk1engd4',
    dataset: 'production',
    apiVersion: '2024-01-01',

    basePath: '/',

    plugins: [structureTool(), visionTool()],

    schema: {
        types: schemaTypes,
    },
});
