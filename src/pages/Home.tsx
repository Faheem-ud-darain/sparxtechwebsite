import { lazy } from 'react';
import Hero from '@/components/sections/Hero';
import { AnimatedContent } from '@/components/animations/AnimatedContent';
import SEO from '@/components/SEO';
import { LazySection } from '@/components/layout/LazySection';

// Lazy load sections
const LogoWall = lazy(() => import('@/components/animations/LogoWall').then(module => ({ default: module.LogoWall })));
const Services = lazy(() => import('@/components/sections/Services'));
const PortfolioGrid = lazy(() => import('@/components/sections/PortfolioGrid'));
const LiveSiteShowcase = lazy(() => import('@/components/sections/LiveSiteShowcase'));
const Process = lazy(() => import('@/components/sections/Process'));
const Testimonials = lazy(() => import('@/components/sections/Testimonials'));
const BlogHighlight = lazy(() => import('@/components/sections/BlogHighlight'));
const Footer = lazy(() => import('@/components/layout/Footer'));

const Home = () => {
  return (
    <div className="relative min-h-screen text-white selection:bg-green-500/30">
      <SEO />
      <main className="relative">
        <Hero />
        
        <LazySection>
          <AnimatedContent direction="up" delay={0.1}>
            <LogoWall />
          </AnimatedContent>
        </LazySection>

        <LazySection>
          <Services />
        </LazySection>

        <LazySection>
          <PortfolioGrid />
        </LazySection>

        <LazySection>
          <LiveSiteShowcase />
        </LazySection>

        <LazySection>
          <Process />
        </LazySection>

        <LazySection>
          <Testimonials />
        </LazySection>

        <LazySection>
          <BlogHighlight />
        </LazySection>
      </main>
      
      <LazySection>
        <Footer />
      </LazySection>
    </div>
  );
};

export default Home;
