import { useState, useEffect } from 'react';
import { SERVICES } from '@/data/constants';
import { AnimatedContent } from '@/components/animations/AnimatedContent';
import BorderGlow from '@/components/animations/BorderGlow';
import FloatingParticles from '@/components/animations/FloatingParticles';
import { Link } from 'react-router-dom';
import AnimatedIcon from '@/components/animations/AnimatedIcon';

const Services = () => {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show 6 services initially on desktop, all services on mobile
  const displayedServices = showAll || isMobile ? SERVICES : SERVICES.slice(0, 6);

  return (
    <section id="services" className="relative py-32 bg-[#030303] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg-fade pointer-events-none opacity-40" />
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-green-500/[0.08] blur-[150px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/[0.08] blur-[150px] pointer-events-none animate-float-slower" />
      <FloatingParticles count={25} color="rgba(34, 197, 94, 0.2)" minSize={2} maxSize={5} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <AnimatedContent direction="up">
          <div className="mb-20 text-center">
            <span className="pill-badge mb-4">
              <span className="glow-dot" />
              EXPERTISE
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 tracking-tight">
              Our Specialized <span className="text-green-500">Services</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
              We combine creative vision with technical excellence to deliver
              impactful digital solutions that scale with your business.
            </p>
          </div>
        </AnimatedContent>

        {/* Services Grid: Grid on desktop/tablet, scroll on mobile */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory gap-5 md:gap-8 pb-4 pt-8 px-6 -mx-6 md:px-0 md:mx-0 hide-scrollbar md:hide-scrollbar-none">
          {displayedServices.map((service, index) => (
            <AnimatedContent 
              key={index} 
              direction="up" 
              delay={index * 0.05}
              className="w-[82vw] sm:w-[320px] md:w-auto snap-center shrink-0 flex flex-col"
            >
              <BorderGlow
                className="h-full w-full"
                borderRadius={24}
                glowRadius={30}
                backgroundColor="#0A0A0A"
                glowColor="142 72 55"
                colors={['#22c55e', '#10b981', '#06b6d4']}
                glowIntensity={0.8}
              >
                <div className="group p-5 sm:p-8 h-full flex flex-col">
                  {/* Number Watermark */}
                  <div className="absolute top-6 right-8 text-4xl font-mono font-bold text-white/[0.03] group-hover:text-green-500/[0.08] transition-colors duration-500 select-none">
                    {service.number}
                  </div>

                  {/* Animated Icon */}
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 group-hover:bg-green-500/10 group-hover:border-green-500/20 transition-all duration-500">
                    <AnimatedIcon
                      name={service.lucideIcon || 'HelpCircle'}
                      className="w-6 h-6 sm:w-8 sm:h-8 text-green-500"
                      size={isMobile ? 24 : 32}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg sm:text-2xl font-bold text-white mb-2 sm:mb-4 group-hover:text-green-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-base leading-relaxed mb-6 sm:mb-8 flex-1">
                    {service.description}
                  </p>

                  {/* Footer Link */}
                  <div className="pt-6 border-t border-white/[0.06] mt-auto">
                    <Link
                      to="/#contact"
                      state={{ 
                        message: `Hi SPARX! I'm interested in your ${service.title} services. Could you please provide more details on how we can get started?`
                      }}
                      className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 group-hover:text-green-400 transition-colors"
                    >
                      Discuss Project
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="group-hover:translate-x-1 transition-transform duration-300"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </BorderGlow>
            </AnimatedContent>
          ))}
        </div>

        {/* See All Button - Desktop only */}
        {!isMobile && !showAll && SERVICES.length > 6 && (
          <AnimatedContent direction="up" delay={0.2}>
            <div className="mt-16 text-center">
              <button
                onClick={() => setShowAll(true)}
                className="group relative px-8 py-4 bg-white/[0.03] border border-white/10 hover:border-green-500/50 rounded-full transition-all duration-500"
              >
                <div className="absolute inset-0 bg-green-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                <span className="relative z-10 flex items-center gap-3 text-sm font-semibold text-white group-hover:text-green-400 transition-colors">
                  Explore All {SERVICES.length} Services
                  <svg 
                    width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    className="group-hover:translate-y-0.5 transition-transform"
                  >
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </span>
              </button>
            </div>
          </AnimatedContent>
        )}
      </div>
    </section>
  );
};

export default Services;
