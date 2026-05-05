import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// ── Portable Text (Block Content) ──────────────────────────────────
export interface PortableTextBlock {
  _type: 'block';
  _key: string;
  style?: string;
  children: {
    _type: 'span';
    _key: string;
    text: string;
    marks?: string[];
  }[];
  markDefs?: {
    _type: string;
    _key: string;
    href?: string;
  }[];
}

// ── Sanity Slug ────────────────────────────────────────────────────
export interface SanitySlug {
  _type: 'slug';
  current: string;
}

// ── Project Document ───────────────────────────────────────────────
export interface Project {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: SanitySlug;
  coverImage: SanityImageSource;
  category: string;
  challenge: PortableTextBlock[];
  solution: PortableTextBlock[];
  techStack: string[];
}

// ── Slim card projection (used in portfolio grid) ──────────────────
export interface ProjectCard {
  _id: string;
  title: string;
  slug: SanitySlug;
  coverImage: SanityImageSource;
  category: string;
}
