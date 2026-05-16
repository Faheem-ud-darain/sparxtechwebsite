import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { BlobCursor } from '@/components/animations/BlobCursor';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import Background from '@/components/animations/Background';
import PageTransition from '@/components/animations/PageTransition';
import Preloader from '@/components/animations/Preloader';
import PageLoader from '@/components/animations/PageLoader';
import { useState, lazy, Suspense } from 'react';
import CookieConsent from '@/components/layout/CookieConsent';
import Header from '@/components/layout/Header';

import Home from '@/pages/Home';

// Lazy load other sub-pages for performance
const About = lazy(() => import('@/pages/About'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const CaseStudy = lazy(() => import('@/pages/CaseStudy'));
const Team = lazy(() => import('@/pages/Team'));
const Terms = lazy(() => import('@/pages/Terms'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <>
      <PageLoader key={location.pathname + location.hash} pathname={location.pathname} />
      <Suspense fallback={null}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
            <Route path="/project/:slug" element={<PageTransition><CaseStudy /></PageTransition>} />
            <Route path="/team" element={<PageTransition><Team /></PageTransition>} />
            <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
            <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
            <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
            <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative bg-[#030303] selection:bg-green-500/30 min-h-screen">
      <AnimatePresence mode="wait">
        {loading && (
          <Preloader key="preloader" onComplete={() => {
            setLoading(false);
            // Trigger prerender for SSG
            setTimeout(() => {
              document.dispatchEvent(new Event('custom-render-trigger'));
            }, 1000);
          }} />
        )}
      </AnimatePresence>
      
      <main className="relative">
        <SmoothScroll>
          <Background />
          <BlobCursor />
          <Router>
            <ScrollToTop />
            <CookieConsent />
            <Header />
            <AnimatedRoutes />
          </Router>
        </SmoothScroll>
      </main>
    </div>
  );
}

export default App;
