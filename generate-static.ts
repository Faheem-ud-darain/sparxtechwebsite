import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { SERVICES_DETAIL } from './src/data/servicesData';

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

/**
 * Lightweight synchronous markdown-to-HTML converter
 */
function markdownToHtml(md: string): string {
  let html = md.trim();

  // Escape HTML tags first to prevent syntax breakage
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const lines = html.split('\n');
  let inTable = false;
  let inList = false;
  let inNumberedList = false;
  let tableRows: string[] = [];
  const parsedLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // 1. Parse tables
    if (line.startsWith('|') && line.endsWith('|')) {
      if (line.match(/^\|[\s-:-|]+\|$/)) {
        continue; // skip separator lines like |---|---|
      }
      const cells = line.split('|').slice(1, -1).map(c => c.trim());
      const cellTag = !inTable ? 'th' : 'td';
      const row = `<tr>${cells.map(c => `<${cellTag}>${c}</${cellTag}>`).join('')}</tr>`;
      
      if (!inTable) {
        inTable = true;
        tableRows.push('<thead>' + row + '</thead><tbody>');
      } else {
        tableRows.push(row);
      }
      continue;
    } else {
      if (inTable) {
        tableRows.push('</tbody>');
        parsedLines.push(`<table>${tableRows.join('')}</table>`);
        tableRows = [];
        inTable = false;
      }
    }

    // 2. Parse bulleted lists
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const content = line.substring(2).trim();
      if (!inList) {
        inList = true;
        parsedLines.push('<ul>');
      }
      parsedLines.push(`<li>${content}</li>`);
      continue;
    } else {
      if (inList) {
        parsedLines.push('</ul>');
        inList = false;
      }
    }

    // 3. Parse numbered lists
    if (line.match(/^\d+\.\s+/)) {
      const content = line.replace(/^\d+\.\s+/, '').trim();
      if (!inNumberedList) {
        inNumberedList = true;
        parsedLines.push('<ol>');
      }
      parsedLines.push(`<li>${content}</li>`);
      continue;
    } else {
      if (inNumberedList) {
        parsedLines.push('</ol>');
        inNumberedList = false;
      }
    }

    // 4. Parse blockquotes
    if (line.startsWith('> ')) {
      parsedLines.push(`<blockquote>${line.substring(2).trim()}</blockquote>`);
      continue;
    }

    parsedLines.push(lines[i]);
  }

  // Close any open lists or tables at the end of the text
  if (inTable) {
    tableRows.push('</tbody>');
    parsedLines.push(`<table>${tableRows.join('')}</table>`);
  }
  if (inList) {
    parsedLines.push('</ul>');
  }
  if (inNumberedList) {
    parsedLines.push('</ol>');
  }

  html = parsedLines.join('\n');

  // Headers
  html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');

  // Bold & Italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
  html = html.replace(/_(.*?)_/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr />');

  // Paragraphs: Wrap text segments that aren't already block elements
  const blocks = html.split(/\n\n+/);
  const finishedBlocks = blocks.map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    if (
      trimmed.startsWith('<h') ||
      trimmed.startsWith('<ul') ||
      trimmed.startsWith('<ol') ||
      trimmed.startsWith('<table') ||
      trimmed.startsWith('<blockquote') ||
      trimmed.startsWith('<hr') ||
      trimmed.startsWith('<div')
    ) {
      return trimmed;
    }
    return `<p>${trimmed.replace(/\n/g, '<br />')}</p>`;
  });

  return finishedBlocks.join('\n');
}

/**
 * Parses PortableText block text from mockProjects.ts to HTML
 */
function parseBlocksToHtml(blockText: string): string {
  if (!blockText) return '';
  
  const blockRegex = /\{\s*_type:\s*['"]block['"][\s\S]*?\}/g;
  const blocks = [...blockText.matchAll(blockRegex)];
  
  if (blocks.length === 0) {
    // Fallback: extract all text strings directly
    const textRegex = /text:\s*['"]([\s\S]*?)['"]/g;
    const matches = [...blockText.matchAll(textRegex)];
    return matches.map(m => `<p>${m[1].replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, '<br />')}</p>`).join('\n');
  }
  
  return blocks.map(b => {
    const blockContent = b[0];
    const styleMatch = blockContent.match(/style:\s*['"]([^'"]+)['"]/);
    const style = styleMatch ? styleMatch[1] : 'normal';
    
    const textRegex = /text:\s*['"]([\s\S]*?)['"]/g;
    const textMatches = [...blockContent.matchAll(textRegex)];
    const text = textMatches.map(tm => tm[1]).join('');
    
    const cleanText = text.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, '<br />');
    if (!cleanText) return '';
    
    if (style === 'h2') return `<h2>${cleanText}</h2>`;
    if (style === 'h3') return `<h3>${cleanText}</h3>`;
    return `<p>${cleanText}</p>`;
  }).filter(Boolean).join('\n');
}

// 2. Parse projects from mockProjects.ts
const projectsFile = fs.readFileSync(path.resolve(__dirname, './src/data/mockProjects.ts'), 'utf-8');
const projectBlocks = projectsFile.split(/_id:\s*['"]\d+['"]/);
const projects: Array<{ title: string; slug: string; category: string; challengeHtml: string; solutionHtml: string }> = [];

for (const block of projectBlocks) {
  const titleMatch = block.match(/title:\s*['"]([^'"]+)['"]/);
  const slugMatch = block.match(/slug:\s*\{\s*current:\s*['"]([^'"]+)['"]\s*\}/);
  const categoryMatch = block.match(/category:\s*['"]([^'"]+)['"]/);
  const challengeMatch = block.match(/challenge:\s*\[([\s\S]*?)\]/);
  const solutionMatch = block.match(/solution:\s*\[([\s\S]*?)\]/);
  
  if (titleMatch && slugMatch) {
    let challengeHtml = '';
    if (challengeMatch) {
      challengeHtml = parseBlocksToHtml(challengeMatch[1]);
    }
    let solutionHtml = '';
    if (solutionMatch) {
      solutionHtml = parseBlocksToHtml(solutionMatch[1]);
    }

    projects.push({
      title: titleMatch[1],
      slug: slugMatch[1],
      category: categoryMatch ? categoryMatch[1] : 'Case Study',
      challengeHtml,
      solutionHtml
    });
  }
}

// 3. Parse blogs from Markdown files
const blogDir = path.resolve(__dirname, './src/content/blog');
const blogs: Array<{ slug: string; title: string; excerpt: string; image: string; author: string; date: string; content: string }> = [];

if (fs.existsSync(blogDir)) {
  const blogFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
  for (const file of blogFiles) {
    const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
    const { data, content: markdownBody } = matter(content);
    blogs.push({
      slug: file.replace('.md', ''),
      title: data.title || 'Blog Post',
      excerpt: data.excerpt || data.description || 'Read our latest blog post on SPARX Studioz & Technologies.',
      image: data.image || '/og-image.jpg',
      author: data.author || 'Sparx AI Research',
      date: data.date || '',
      content: markdownBody
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
  bodyHtml?: string;
  schema?: any;
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
    path: '/services',
    title: `Our Digital Services & Capabilities | ${SITE_NAME}`,
    description: 'Explore our complete suite of 20 specialized services including Web Development, UI/UX Design, Web Scraping, Digital Marketing, and Quality Assurance.',
    keywords: 'digital services, web development, software engineering, uiux design, social ads, ecommerce store management, sparx',
    ogImage: '/logo.jpg',
    ogType: 'website',
    bodyHtml: `
      <main class="services-index-prerender">
        <h1>Our Digital Services &amp; Capabilities</h1>
        <p>We engineer and execute premium digital experiences across 20 specialized capabilities to scale your operations, build brand trust, and drive conversions.</p>
        <div class="services-grid">
          ${Object.values(SERVICES_DETAIL).map(service => `
            <div class="service-card">
              <h2>${service.title}</h2>
              <p>${service.metaDescription}</p>
              <a href="/services/${service.slug}">Explore Service &rarr;</a>
            </div>
          `).join('\n')}
        </div>
      </main>
    `.trim()
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
  ...projects.map(proj => {
    const caseStudyHtml = `
      <main class="case-study-prerender">
        <article>
          <h1>${proj.title}</h1>
          <p><strong>Category:</strong> ${proj.category} - Case Study</p>
          <section>
            <h2>The Challenge</h2>
            <div>${proj.challengeHtml}</div>
          </section>
          <section>
            <h2>The Solution</h2>
            <div>${proj.solutionHtml}</div>
          </section>
        </article>
      </main>
    `.trim();

    return {
      path: `/project/${proj.slug}`,
      title: `${proj.title} | Case Study | ${SITE_NAME}`,
      description: `Case Study: ${proj.title}. Discover how SPARX Studioz & Technologies engineered success for this project in the ${proj.category} space.`,
      keywords: `${proj.category}, case study, portfolio, software solutions`,
      ogImage: '/logo.jpg',
      ogType: 'article',
      bodyHtml: caseStudyHtml
    };
  }),
  // Blog Posts
  ...blogs.map(blog => {
    const blogHtml = `
      <main class="blog-prerender">
        <article>
          <h1>${blog.title}</h1>
          <p class="meta"><strong>Published by:</strong> ${blog.author} | <strong>Date:</strong> ${blog.date}</p>
          <div class="content">
            ${markdownToHtml(blog.content)}
          </div>
        </article>
      </main>
    `.trim();

    return {
      path: `/blog/${blog.slug}`,
      title: `${blog.title} | Blog | ${SITE_NAME}`,
      description: blog.excerpt,
      keywords: 'tech blog, web development, digital insights, artificial intelligence, design trends',
      ogImage: blog.image.startsWith('http') ? blog.image : blog.image,
      ogType: 'article',
      bodyHtml: blogHtml
    };
  }),
  // Service Pages
  ...Object.values(SERVICES_DETAIL).map(service => {
    const serviceHtml = `
      <main class="services-prerender">
        <article>
          <h1>${service.h1}</h1>
          <p class="primary-keyword"><strong>Core Expertise:</strong> ${service.primaryKeyword}</p>
          <div class="description">
            ${service.longDescription.split('\n\n').map(p => `<p>${p}</p>`).join('\n')}
          </div>
          
          <section class="tech-stack">
            <h2>Technologies &amp; Tools</h2>
            <ul>
              ${service.techStack.map(tech => `<li>${tech}</li>`).join('\n')}
            </ul>
          </section>

          <section class="faqs">
            <h2>Frequently Asked Questions</h2>
            ${service.faqs.map(faq => `
              <div class="faq-item">
                <h3>${faq.question}</h3>
                <p>${faq.answer}</p>
              </div>
            `).join('\n')}
          </section>
        </article>
      </main>
    `.trim();

    return {
      path: `/services/${service.slug}`,
      title: service.metaTitle,
      description: service.metaDescription,
      keywords: [service.primaryKeyword, ...service.secondaryKeywords].join(', '),
      ogImage: '/logo.jpg',
      ogType: 'website',
      bodyHtml: serviceHtml,
      schema: service.schema
    };
  })
];

console.log(`Generating SEO files for ${routes.length} routes...`);

// 5. Generate and write HTML files
routes.forEach(route => {
  const fullUrl = `${SITE_URL}${route.path === '/' ? '' : route.path}`;
  const ogImgUrl = route.ogImage.startsWith('http') ? route.ogImage : `${SITE_URL}${route.ogImage}`;
  
  // Format the SEO tags replacement
  let seoTags = `
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

  if (route.schema) {
    seoTags += `\n\n    <!-- Structured Data Schema -->\n    <script type="application/ld+json">\n      ${JSON.stringify(route.schema, null, 2)}\n    </script>`;
  }

  // Replace placeholders in base template
  let pageContent = baseTemplate
    .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
    .replace(/<meta name="seo-placeholder" content="true"\s*\/?>/, seoTags);

  // Inject prerendered body inside the React mounting point
  if (route.bodyHtml) {
    pageContent = pageContent.replace('<div id="root"></div>', `<div id="root">${route.bodyHtml}</div>`);
  }

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

// 6. Generate dynamic sitemap.xml
const sitemapPathPublic = path.resolve(__dirname, './public/sitemap.xml');
const sitemapPathDist = path.resolve(distDir, 'sitemap.xml');

const today = new Date().toISOString().split('T')[0];

const sitemapUrls = routes.map(route => {
  const fullUrl = `${SITE_URL}${route.path === '/' ? '' : route.path}`;
  let priority = '0.5';
  let changefreq = 'monthly';

  if (route.path === '/') {
    priority = '1.0';
    changefreq = 'weekly';
  } else if (route.path.startsWith('/services/') || route.path === '/services') {
    priority = '0.9';
    changefreq = 'weekly';
  } else if (route.path === '/portfolio' || route.path === '/blog') {
    priority = '0.8';
    changefreq = 'daily';
  } else if (route.path.startsWith('/project/')) {
    priority = '0.7';
    changefreq = 'monthly';
  } else if (route.path.startsWith('/blog/')) {
    priority = '0.7';
    changefreq = 'monthly';
  } else if (route.path === '/about' || route.path === '/team') {
    priority = '0.7';
    changefreq = 'monthly';
  }

  return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n');

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>
`;

fs.writeFileSync(sitemapPathPublic, sitemapContent, 'utf-8');
fs.writeFileSync(sitemapPathDist, sitemapContent, 'utf-8');
console.log('✓ Dynamic sitemap.xml successfully generated and written!');
