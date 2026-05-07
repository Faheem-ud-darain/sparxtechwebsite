import React from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import { LogoWall } from '@/components/animations/LogoWall';
import Services from '@/components/sections/Services';
import PortfolioGrid from '@/components/sections/PortfolioGrid';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import Footer from '@/components/layout/Footer';

const Home = () => {
  return (
    <div className="min-h-screen text-white">
      <Header />
      <main>
        <Hero />
        <LogoWall />
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
