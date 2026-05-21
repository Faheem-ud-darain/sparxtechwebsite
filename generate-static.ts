import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

// Get current directory in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://sparxtechwebsite.vercel.app';
const SITE_NAME = 'SPARX Studioz & Technologies';

// 1. Read the base built template
const distDir = path.resolve(__dirname, './dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error(`Error: Base template not found at "${templatePath}". Run 'vite build' first.`);
  process.exit(1);
}

const baseTemplate = fs.readFileSync(templatePath, 'utf-8');

// 2. Parse projects from mockProjects.ts
const projectsFile = fs.readFileSync(path.resolve(__dirname, './src/data/mockProjects.ts'), 'utf-8');
const projectBlocks = projectsFile.split(/_id:\s*['"]\d+['"]/);
const projects: Array<{ title: string; slug: string; category: string }> = [];

for (const block of projectBlocks) {
  const titleMatch = block.match(/title:\s*['"]([^'"]+)['"]/);
  const slugMatch = block.match(/slug:\s*\{\s*current:\s*['"]([^'"]+)['"]\s*\}/);
  const categoryMatch = block.match(/category:\s*['"]([^'"]+)['"]/);
  
  if (titleMatch && slugMatch) {
    projects.push({
      title: titleMatch[1],
      slug: slugMatch[1],
      category: categoryMatch ? categoryMatch[1] : 'Case Study'
    });
  }
}

// 3. Parse blogs from Markdown files
const blogDir = path.resolve(__dirname, './src/content/blog');
const blogs: Array<{ slug: string; title: string; excerpt: string; image: string }> = [];

if (fs.existsSync(blogDir)) {
  const blogFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
  for (const file of blogFiles) {
    const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
    const { data } = matter(content);
    blogs.push({
      slug: file.replace('.md', ''),
      title: data.title || 'Blog Post',
      excerpt: data.excerpt || data.description || 'Read our latest blog post on SPARX Studioz & Technologies.',
      image: data.image || '/og-image.jpg'
    });
  }
}

// Define the route interface
interface Route {
  path: string;
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  ogType: string;
}

// 4. Construct all routes
const routes: Route[] = [
  // Core routes
  {
    path: '/',
    title: `${SITE_NAME} | Digital Crafting & Innovation`,
    description: 'A premium digital agency specializing in high-end web experiences, software solutions, and creative design.',
    keywords: 'software development, 3d web development, digital marketing, meta ads, custom software, graphics design, video editing, SPARX',
    ogImage: '/logo.jpg',
    ogType: 'website'
  },
  {
    path: '/about',
    title: `About Us | ${SITE_NAME}`,
    description: 'Learn about SPARX Studioz & Technologies, our mission, vision, and how we craft premium digital experiences.',
    keywords: 'about sparx, digital agency team, software development company, Abbottabad IT firm',
    ogImage: '/logo.jpg',
    ogType: 'website'
  },
  {
    path: '/portfolio',
    title: `Our Work & Portfolio | ${SITE_NAME}`,
    description: 'Explore our portfolio of high-end web applications, custom software, digital marketing campaigns, and creative designs.',
    keywords: 'portfolio, case studies, client work, web development portfolio, digital marketing results',
    ogImage: '/logo.jpg',
    ogType: 'website'
  },
  {
    path: '/team',
    title: `Meet the Team | ${SITE_NAME}`,
    description: 'Get to know the creative minds, developers, and strategists behind SPARX Studioz & Technologies.',
    keywords: 'sparx team, developers, designers, digital marketers, software engineers',
    ogImage: '/logo.jpg',
    ogType: 'website'
  },
  {
    path: '/blog',
    title: `Insights & Tech Blog | ${SITE_NAME}`,
    description: 'Stay updated with the latest trends in web development, artificial intelligence, digital marketing, and design.',
    keywords: 'tech blog, web design trends, AI news, marketing strategies, software development tips',
    ogImage: '/logo.jpg',
    ogType: 'website'
  },
  {
    path: '/terms',
    title: `Terms of Service | ${SITE_NAME}`,
    description: 'Read the terms of service and conditions for working with SPARX Studioz & Technologies.',
    keywords: 'terms of service, legal, contract, agency terms',
    ogImage: '/logo.jpg',
    ogType: 'website'
  },
  {
    path: '/privacy-policy',
    title: `Privacy Policy | ${SITE_NAME}`,
    description: 'Our privacy policy explains how we collect, use, and protect your personal information.',
    keywords: 'privacy policy, data protection, privacy, compliance',
    ogImage: '/logo.jpg',
    ogType: 'website'
  },
  // Case Studies
  ...projects.map(proj => ({
    path: `/project/${proj.slug}`,
    title: `${proj.title} | Case Study | ${SITE_NAME}`,
    description: `Case Study: ${proj.title}. Discover how SPARX Studioz & Technologies engineered success for this project in the ${proj.category} space.`,
    keywords: `${proj.category}, case study, portfolio, ${proj.techStack ? proj.techStack.join(', ') : 'software solutions'}`,
    ogImage: '/logo.jpg', // Default to logo or specific fallback
    ogType: 'article'
  } as Route)),
  // Blog Posts
  ...blogs.map(blog => ({
    path: `/blog/${blog.slug}`,
    title: `${blog.title} | Blog | ${SITE_NAME}`,
    description: blog.excerpt,
    keywords: 'tech blog, web development, digital insights, artificial intelligence, design trends',
    ogImage: blog.image.startsWith('http') ? blog.image : blog.image,
    ogType: 'article'
  }))
];

console.log(`Generating SEO files for ${routes.length} routes...`);

// 5. Generate and write HTML files
routes.forEach(route => {
  const fullUrl = `${SITE_URL}${route.path === '/' ? '' : route.path}`;
  const ogImgUrl = route.ogImage.startsWith('http') ? route.ogImage : `${SITE_URL}${route.ogImage}`;
  
  // Format the SEO tags replacement
  const seoTags = `
    <!-- Primary Meta Tags -->
    <meta name="title" content="${route.title}" />
    <meta name="description" content="${route.description}" />
    <meta name="keywords" content="${route.keywords}" />
    <meta name="author" content="SPARX Studioz" />
    <link rel="canonical" href="${fullUrl}" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="${route.ogType}" />
    <meta property="og:url" content="${fullUrl}" />
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:image" content="${ogImgUrl}" />
    <meta property="og:site_name" content="${SITE_NAME}" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="${fullUrl}" />
    <meta property="twitter:title" content="${route.title}" />
    <meta property="twitter:description" content="${route.description}" />
    <meta property="twitter:image" content="${ogImgUrl}" />
    <meta property="twitter:site" content="@sparxstudioz" />
    <meta property="twitter:creator" content="@sparxstudioz" />

    <!-- Additional SEO -->
    <meta name="robots" content="index, follow" />
    <meta name="googlebot" content="index, follow" />
  `.trim();

  // Replace placeholders in base template
  let pageContent = baseTemplate
    .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
    .replace(/<meta name="seo-placeholder" content="true"\s*\/?>/, seoTags);

  if (route.path === '/') {
    // Write directly to index.html
    fs.writeFileSync(templatePath, pageContent, 'utf-8');
    console.log(`✓ Generated: ${route.path} -> dist/index.html`);
  } else {
    // Write to folder/index.html
    const targetFolder = path.join(distDir, route.path);
    fs.mkdirSync(targetFolder, { recursive: true });
    fs.writeFileSync(path.join(targetFolder, 'index.html'), pageContent, 'utf-8');
    console.log(`✓ Generated: ${route.path} -> dist${route.path}/index.html`);
  }
});

console.log('Static SEO pages generation complete!');
