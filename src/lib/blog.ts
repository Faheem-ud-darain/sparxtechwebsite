export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  image: string;
  readTime: string;
  tags: string[];
  content: string;
}

// Vite magic to import all markdown files as raw strings
const postsRaw = import.meta.glob('/src/content/blog/*.md', { query: '?raw', eager: true });

export const getPosts = (): BlogPost[] => {
  return Object.keys(postsRaw).map((path) => {
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    const rawContent = (postsRaw[path] as any).default as string;
    
    // Simple frontmatter parser
    const match = rawContent.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);
    if (!match) {
      return {
        slug,
        title: slug,
        date: '',
        author: '',
        category: 'General',
        excerpt: '',
        image: '',
        readTime: '',
        tags: [],
        content: rawContent
      };
    }

    const yaml = match[1];
    const content = match[2];
    const data: any = {};
    
    yaml.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
        if (value.startsWith('[') && value.endsWith(']')) {
          data[key.trim()] = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
        } else {
          data[key.trim()] = value;
        }
      }
    });

    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      author: data.author || '',
      category: data.category || 'General',
      excerpt: data.excerpt || '',
      image: data.image || '',
      readTime: data.readTime || '',
      tags: data.tags || [],
      content: content.trim()
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return getPosts().find(p => p.slug === slug);
};

export const getCategories = (): string[] => {
  const posts = getPosts();
  return Array.from(new Set(posts.map(p => p.category)));
};

// --- Cookie Helpers for Interest Tracking ---

export const setCookie = (name: string, value: string, days = 30) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
};

export const getCookie = (name: string): string => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');
};

export const trackInterest = (category: string) => {
  const existing = getCookie('blog_interests');
  const interests = existing ? JSON.parse(existing) : [];
  interests.push(category);
  // Keep last 10 interests
  const latest = interests.slice(-10);
  setCookie('blog_interests', JSON.stringify(latest));
};

export const getInterestedCategories = (): string[] => {
  const existing = getCookie('blog_interests');
  return existing ? JSON.parse(existing) : [];
};
