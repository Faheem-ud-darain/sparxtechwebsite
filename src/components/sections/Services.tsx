import React from 'react';
import { SERVICES } from '@/data/constants';
import { AnimatedContent } from '@/components/animations/AnimatedContent';
import BorderGlow from '@/components/animations/BorderGlow';
import FloatingParticles from '@/components/animations/FloatingParticles';
import LottieIcon from '@/components/animations/LottieIcon';
import { SERVICE_ICONS } from '@/data/lottieIcons';
import { HashLink } from 'react-router-hash-link';

const Services = () => {
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
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory gap-6 lg:gap-8 pb-12 pt-8 px-4 -mx-4 md:px-0 md:mx-0 hide-scrollbar md:hide-scrollbar-none">
          {SERVICES.map((service, index) => (
            <AnimatedContent 
              key={index} 
              direction="up" 
              delay={index * 0.05}
              className="min-w-[300px] sm:min-w-[340px] md:min-w-0 snap-center shrink-0 flex flex-col"
            >
              <BorderGlow
                className="h-full w-full"
                borderRadius={24}
                backgroundColor="#0A0A0A"
                glowColor="142 72 55"
                colors={['#22c55e', '#10b981', '#06b6d4']}
                glowIntensity={0.8}
              >
                <div className="group p-8 h-full flex flex-col">
                  {/* Number Watermark */}
                  <div className="absolute top-6 right-8 text-4xl font-mono font-bold text-white/[0.03] group-hover:text-green-500/[0.08] transition-colors duration-500 select-none">
                    {service.number}
                  </div>

                  {/* Lottie Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-green-500/10 group-hover:border-green-500/20 transition-all duration-500">
                    {SERVICE_ICONS[service.title] ? (
                      <LottieIcon
                        animationData={SERVICE_ICONS[service.title]}
                        className="w-8 h-8"
                      />
                    ) : (
                      <span className="text-3xl">{service.icon}</span>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-8 flex-1">
                    {service.description}
                  </p>

                  {/* Footer Link */}
                  <div className="pt-6 border-t border-white/[0.06] mt-auto">
                    <HashLink
                      smooth
                      to="/#contact"
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
                    </HashLink>
                  </div>
                </div>
              </BorderGlow>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
