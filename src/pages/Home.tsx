import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import { LogoWall } from '@/components/animations/LogoWall';
import Services from '@/components/sections/Services';
import PortfolioGrid from '@/components/sections/PortfolioGrid';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import Footer from '@/components/layout/Footer';
import { AnimatedContent } from '@/components/animations/AnimatedContent';

const Home = () => {
  return (
    <div className="relative min-h-screen text-white selection:bg-green-500/30">
      <Header />
      <main className="relative">
        <Hero />
        <AnimatedContent direction="up" delay={0.1}>
          <LogoWall />
        </AnimatedContent>
        <Services />
        <PortfolioGrid />
        <Process />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
