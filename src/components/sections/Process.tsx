import React from 'react';
import { AnimatedContent } from '@/components/animations/AnimatedContent';
import { PROCESS_STEPS } from '@/data/constants';
import FloatingParticles from '@/components/animations/FloatingParticles';

const Process = () => {
  return (
    <section id="process" className="relative py-24 bg-[#030303] overflow-hidden">
      <FloatingParticles count={15} color="rgba(34, 197, 94, 0.08)" minSize={2} maxSize={5} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <AnimatedContent direction="up">
          <div className="mb-20 text-center">
            <span className="pill-badge mb-4">
              <span className="glow-dot" />
              THE ROADMAP
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 tracking-tight">
              How we bring <span className="text-green-500">ideas to life</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
              Our streamlined process ensures transparency, efficiency, and 
              exceptional results from initial concept to final launch.
            </p>
          </div>
        </AnimatedContent>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-green-500/50 via-green-500/20 to-transparent md:-translate-x-1/2" />

          <div className="space-y-12 md:space-y-24">
            {PROCESS_STEPS.map((step, index) => (
              <AnimatedContent 
                key={index} 
                direction={index % 2 === 0 ? "left" : "right"} 
                delay={index * 0.1}
                className={`relative flex items-center gap-8 md:gap-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className="flex-1 md:w-1/2">
                  <div className={`glass-card p-8 md:p-10 relative group hover:border-green-500/30 transition-all duration-500 ${
                    index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                  }`}>
                    <span className="absolute -top-6 -right-6 text-8xl font-black text-white/[0.02] group-hover:text-green-500/[0.04] transition-colors">
                      {step.number}
                    </span>
                    <span className="text-green-400 text-xs font-mono tracking-widest uppercase mb-3 block">Phase {step.number}</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{step.title}</h3>
                    <p className="text-gray-400 text-lg leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* Dot on line */}
                <div className="absolute left-4 md:left-1/2 w-10 h-10 rounded-full bg-[#030303] border-4 border-green-500/30 flex items-center justify-center z-20 -translate-x-1/2 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                </div>

                {/* Empty space for grid alignment */}
                <div className="hidden md:block md:w-1/2" />
              </AnimatedContent>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
