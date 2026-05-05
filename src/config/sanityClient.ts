import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// ── Sanity Client ──────────────────────────────────────────────────
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'placeholder-id',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-05-05',
});

// ── Image URL Builder ──────────────────────────────────────────────
const builder = createImageUrlBuilder(client);

/**
 * Generate an optimised image URL from a Sanity image asset reference.
 * Usage:  urlFor(project.coverImage).width(800).url()
 */
export const urlFor = (source: SanityImageSource) => builder.image(source);
