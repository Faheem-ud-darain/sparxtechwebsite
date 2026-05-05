// ── GROQ Queries for Sanity ─────────────────────────────────────────
// All queries are co-located here so they stay easy to audit and update.

/**
 * Fetch every project as a slim card (used on the portfolio grid).
 * Ordered newest-first.
 */
export const ALL_PROJECTS_QUERY = `
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    coverImage,
    category
  }
`;

/**
 * Fetch a single project by its slug (used on the case-study page).
 * Returns the full document including rich text fields.
 */
export const PROJECT_BY_SLUG_QUERY = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    coverImage,
    category,
    challenge,
    solution,
    techStack
  }
`;

/**
 * Fetch all unique categories for optional filtering on the portfolio page.
 */
export const ALL_CATEGORIES_QUERY = `
  array::unique(*[_type == "project"].category)
`;
