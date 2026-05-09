import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProjects } from '@/hooks/useSanity';
import { urlFor } from '@/config/sanityClient';
import { AnimatedContent } from '@/components/animations/AnimatedContent';
import TiltedCard from '@/components/animations/TiltedCard';
import FloatingParticles from '@/components/animations/FloatingParticles';

import EcomImg from '@/assets/ecommerce-mockup.png';
import SaasImg from '@/assets/saas-mockup.png';
import MobileImg from '@/assets/mobile-mockup.png';
import { mockProjects } from '@/data/mockProjects';

interface PortfolioGridProps {
  showViewAll?: boolean;
}

const PortfolioGrid: React.FC<PortfolioGridProps> = ({ showViewAll = true }) => {
  const { projects, loading } = useProjects();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const mergedProjects = mockProjects.map(mock => {
    const sanityProj = projects?.find(p => p.slug?.current === mock.slug.current);
    if (sanityProj) {
      return { ...mock, ...sanityProj };
    }
    return mock;
  });

  const displayProjects = showViewAll ? mergedProjects.slice(0, 5) : mergedProjects;
  const usePlaceholders = !projects || projects.length === 0;

  return (
    <section 
      ref={sectionRef} 
      id="portfolio" 
      className="relative py-32 bg-[#050505] overflow-hidden"
    >
      <motion.div style={{ scale, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 grid-bg-fade pointer-events-none opacity-40" />
      </motion.div>
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full bg-green-500/[0.08] blur-[150px] pointer-events-none animate-float-slower" />
      <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-blue-600/[0.08] blur-[120px] pointer-events-none animate-float-slow" />
      <FloatingParticles count={20} color="rgba(85, 173, 247, 0.2)" minSize={2} maxSize={6} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <AnimatedContent direction="up">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 md:mb-20">
            <div>
              <span className="pill-badge mb-4">
                <span className="glow-dot" />
                PORTFOLIO
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 tracking-tight">
                Selected <span className="text-green-500">Works</span>
              </h2>
            </div>
            {showViewAll && (
              <Link
                to="/portfolio"
                className="mt-6 md:mt-0 inline-flex items-center gap-2 text-green-400 text-sm font-medium hover:text-green-300 transition-colors group z-20 relative"
              >
                All Projects
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
            )}
          </div>
        </AnimatedContent>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[240px] gap-6">
            <div className="md:col-span-4 md:row-span-2 rounded-[2rem] bg-white/[0.03] border border-white/[0.06] animate-pulse" />
            <div className="md:col-span-2 md:row-span-1 rounded-[2rem] bg-white/[0.03] border border-white/[0.06] animate-pulse" />
            <div className="md:col-span-2 md:row-span-2 rounded-[2rem] bg-white/[0.03] border border-white/[0.06] animate-pulse" />
            <div className="md:col-span-2 md:row-span-1 rounded-[2rem] bg-white/[0.03] border border-white/[0.06] animate-pulse" />
          </div>
        )}

        {/* Project Bento Grid with TiltedCard */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[300px] sm:auto-rows-[320px] md:auto-rows-[240px] gap-4 sm:gap-5 md:gap-6">
            {displayProjects.map((project, index) => (
              <AnimatedContent 
                key={project._id} 
                direction="up" 
                delay={index * 0.05}
                className={(project as any).gridClass || (index % 3 === 0 ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1')}
              >
                <TiltedCard
                  className="h-full w-full cursor-pointer"
                  tiltMax={8}
                  scale={1.02}
                  glareEnable={true}
                  borderRadius="2rem"
                >
                  <Link
                    to={`/project/${project.slug?.current || '#'}`}
                    className="group relative block h-full rounded-[2rem] bg-[#0A0A0A] border border-white/[0.05] hover:border-green-500/30 transition-all duration-700 shadow-2xl"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Inner container for background and standard images that must be clipped */}
                    <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none">
                      {/* Image or gradient placeholder */}
                      {(!usePlaceholders && (project as any).coverImage) ? (
                        <img
                          src={urlFor((project as any).coverImage).width(1200).height(800).url()}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                          loading="lazy"
                        />
                      ) : (project as any).image ? (
                        <img
                          src={(project as any).image}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                          loading="lazy"
                        />
                      ) : (
                        <div className={`absolute inset-0 transition-opacity duration-700 group-hover:opacity-40 ${
                          index === 0 ? 'bg-gradient-to-br from-green-900/40 to-black' :
                          index === 1 ? 'bg-gradient-to-br from-blue-900/40 to-black' :
                          index === 2 ? 'bg-gradient-to-br from-purple-900/40 to-black' :
                          index === 3 ? 'bg-gradient-to-br from-orange-900/40 to-black' :
                          'bg-gradient-to-br from-emerald-900/40 to-black'
                        }`} />
                      )}

                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />

                      {/* Animated shimmer on hover (magic bento effect) */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out" />
                      </div>
                    </div>

                    {/* 3D Pop-out Image (WEBP) */}
                    {(project as any).image3D && (
                      <div 
                        className="absolute -top-8 bottom-0 -right-1 w-[85%] sm:-top-12 sm:-right-2 sm:w-[88%] md:-top-24 md:bottom-2 md:-right-10 md:w-[85%] pointer-events-none"
                        style={{ transform: 'translateZ(60px)' }}
                      >
                        <img
                          src={(project as any).image3D}
                          alt={`${project.title} 3D Preview`}
                          className="w-full h-full object-contain object-right-top transition-transform duration-1000 group-hover:scale-110 group-hover:-translate-y-2 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 md:p-8 pointer-events-none" style={{ transform: 'translateZ(30px)' }}>
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 w-[90%] sm:w-[85%] md:w-[75%]">
                        <div className="flex flex-wrap gap-1.5 mb-2 sm:mb-3">
                          <span className="px-2.5 py-0.5 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-green-400 bg-green-500/10 border border-green-500/20 rounded-full whitespace-nowrap">
                            {project.category}
                          </span>
                          {(project as any).techStack?.slice(0, 2).map((t: string) => (
                            <span key={t} className="px-2.5 py-0.5 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-white/5 border border-white/10 rounded-full whitespace-nowrap transition-all duration-500 group-hover:bg-white/[0.15] group-hover:backdrop-blur-xl group-hover:border-white/30 group-hover:text-white group-hover:shadow-[0_4px_12px_rgba(255,255,255,0.05)]">
                              {t}
                            </span>
                          ))}
                          {((project as any).techStack?.length || 0) > 2 && (
                            <span className="px-2.5 py-0.5 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-white/5 border border-white/10 rounded-full whitespace-nowrap transition-all duration-500 group-hover:bg-white/[0.15] group-hover:backdrop-blur-xl group-hover:border-white/30 group-hover:text-gray-200 group-hover:shadow-[0_4px_12px_rgba(255,255,255,0.05)]">
                              +{(project as any).techStack.length - 2}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1.5 sm:mb-2 leading-tight drop-shadow-md line-clamp-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 text-[11px] sm:text-xs md:text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 drop-shadow">
                          High-performance digital solution crafted with precision, focusing on {project.category.toLowerCase()} and user-centric design.
                        </p>
                      </div>
                    </div>

                    {/* Corner Arrow */}
                    <div className="absolute top-5 right-5 sm:top-6 sm:right-6 md:top-8 md:right-8 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0" style={{ transform: 'translateZ(40px)' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
                    </div>

                    {/* Bottom Line Glow */}
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-700 rounded-b-[2rem]" />
                  </Link>
                </TiltedCard>
              </AnimatedContent>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioGrid;
