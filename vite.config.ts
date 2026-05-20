import path from "path"
import { defineConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import { createRequire } from 'module'

// Create standard require for CommonJS packages in ES Module scope
if (typeof globalThis.require === 'undefined') {
  (globalThis as any).require = createRequire(import.meta.url);
}

const getBlogRoutes = () => {
  const blogDir = path.resolve(__dirname, './src/content/blog')
  if (!fs.existsSync(blogDir)) return []
  return fs.readdirSync(blogDir)
    .filter(file => file.endsWith('.md'))
    .map(file => `/blog/${file.replace('.md', '')}`)
}

export default defineConfig(async ({ command }): Promise<UserConfig> => {
  const isBuild = command === 'build';
  const plugins: any[] = [...react()];

  if (isBuild) {
    try {
      const PrerenderModule = await import('vite-plugin-prerender');
      const Prerender = PrerenderModule.default;
      plugins.push(
        Prerender({
          staticDir: path.join(__dirname, 'dist'),
          routes: ['/', '/about', '/portfolio', '/team', '/blog', ...getBlogRoutes()],
          renderer: new Prerender.PuppeteerRenderer({
            renderAfterTime: 2000,
            maxConcurrentRoutes: 1,
            inject: {
              prerendered: true
            },
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
          }),
          postProcess(renderedRoute: any) {
            renderedRoute.html = renderedRoute.html.replace(
              /window.__PRERENDER_INJECTED = true;/g,
              ''
            );
            return renderedRoute;
          },
        })
      );
    } catch (err: any) {
      console.warn('Prerender plugin could not be loaded, skipping SSG. Error detail:', err?.message || err);
    }
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
                return 'vendor-react';
              }
              if (id.includes('framer-motion')) {
                return 'vendor-framer';
              }
              if (id.includes('three') || id.includes('ogl')) {
                return 'vendor-3d';
              }
              if (id.includes('gsap')) {
                return 'vendor-gsap';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              return 'vendor-others';
            }
          },
        },
      },
      sourcemap: false,
    },
  };
});
