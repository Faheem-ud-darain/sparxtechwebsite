import { useEffect, useState } from 'react';
import { client } from '@/config/sanityClient';
import { ALL_PROJECTS_QUERY, PROJECT_BY_SLUG_QUERY } from '@/config/queries';
import type { Project, ProjectCard } from '@/types/sanity';

// ── Fetch all projects (slim cards) ────────────────────────────────
export function useProjects() {
  const [projects, setProjects] = useState<ProjectCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    client
      .fetch<ProjectCard[]>(ALL_PROJECTS_QUERY)
      .then((data) => {
        if (!cancelled) setProjects(data ?? []);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { projects, loading, error };
}

// ── Fetch a single project by slug ─────────────────────────────────
export function useProject(slug: string | undefined) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    client
      .fetch<Project>(PROJECT_BY_SLUG_QUERY, { slug })
      .then((data) => {
        if (!cancelled) setProject(data ?? null);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { project, loading, error };
}
