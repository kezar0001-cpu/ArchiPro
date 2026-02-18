import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/schemas';

/**
 * Sanity Studio Configuration
 *
 * This config is used both by the embedded Studio component
 * and by the Sanity CLI for schema management.
 */
export default defineConfig({
    name: 'archi-pro',
    title: 'ArchiPro CMS',

    projectId: 'uk1engd4',
    dataset: 'production',
    apiVersion: '2024-01-01',

    plugins: [structureTool(), visionTool()],

    schema: {
        types: schemaTypes,
    },
});
