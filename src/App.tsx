import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { BlobCursor } from '@/components/animations/BlobCursor';
import Home from '@/pages/Home';
import Portfolio from '@/pages/Portfolio';
import CaseStudy from '@/pages/CaseStudy';
import Team from '@/pages/Team';
import About from '@/pages/About';
import Terms from '@/pages/Terms';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import Background from '@/components/animations/Background';

function App() {
  return (
    <SmoothScroll>
      <Background />
      <BlobCursor />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/project/:slug" element={<CaseStudy />} />
          <Route path="/team" element={<Team />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </Router>
    </SmoothScroll>
  );
}

export default App;
