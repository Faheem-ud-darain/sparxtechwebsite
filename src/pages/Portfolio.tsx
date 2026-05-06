import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PortfolioGrid from '@/components/sections/PortfolioGrid';
import { AnimatedContent } from '@/components/animations/AnimatedContent';

const Portfolio = () => {
  return (
    <div className="bg-[#030303] min-h-screen text-white selection:bg-green-500/30">
      <Header />
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[-5%] w-[600px] h-[600px] bg-green-500/[0.02] blur-[150px]" />
        <div className="absolute bottom-[20%] right-[-5%] w-[500px] h-[500px] bg-blue-600/[0.02] blur-[150px]" />
      </div>

      <main className="relative z-10 pt-28 sm:pt-36 md:pt-48 pb-20 sm:pb-28 md:pb-32">
        <div className="container mx-auto px-4 sm:px-6 mb-12 sm:mb-16 md:mb-24">
          <AnimatedContent direction="up">
            <span className="text-green-500 font-mono text-sm tracking-[0.3em] uppercase mb-6 block text-center">Our Work</span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter text-center mb-6 sm:mb-8">
              Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Excellence</span>
            </h1>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-center text-base sm:text-lg leading-relaxed">
              A curated showcase of our most complex digital transformations, high-performance web systems, and innovative user experiences.
            </p>
          </AnimatedContent>
        </div>
        
        <PortfolioGrid showViewAll={false} />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
