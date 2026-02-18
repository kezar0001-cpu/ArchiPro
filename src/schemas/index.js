/**
 * Schema index — export all Sanity schemas.
 *
 * Import this array into your sanity.config.js when
 * initializing Sanity Studio.
 */
import heroContent from './heroContent';
import project from './project';

export const schemaTypes = [heroContent, project];
