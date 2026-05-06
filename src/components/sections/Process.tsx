import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { PROCESS_STEPS } from '@/data/constants';
import FloatingParticles from '@/components/animations/FloatingParticles';

const ProcessStep = ({ step, index, progress }: { step: any, index: number, progress: any }) => {
  // Each step takes 25% of the total 500vh scroll
  const start = index * 0.25;
  const end = (index + 1) * 0.25;
  
  // Opacity: fade in, stay, fade out
  const opacity = useTransform(
    progress, 
    [start, start + 0.05, end - 0.05, end], 
    [0, 1, 1, 0]
  );
  
  // Scale: grow in, shrink out
  const scale = useTransform(
    progress, 
    [start, start + 0.1, end - 0.1, end], 
    [0.8, 1, 1, 0.8]
  );
  
  // Y-axis: slide up in, slide up out
  const y = useTransform(
    progress, 
    [start, start + 0.1, end - 0.1, end], 
    [100, 0, 0, -100]
  );

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-12"
    >
      <div className="glass-card max-w-4xl w-full p-8 md:p-16 relative overflow-hidden group">
        {/* Large background number */}
        <span className="absolute -top-10 -right-10 text-[150px] md:text-[200px] font-black text-white/[0.03] leading-none select-none pointer-events-none group-hover:text-green-500/[0.05] transition-colors duration-700">
          {step.number}
        </span>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8 items-center">
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-green-500/30 flex items-center justify-center text-2xl md:text-3xl font-bold text-green-500 bg-green-500/10 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
              {step.number}
            </div>
            <div className="h-20 w-[2px] bg-gradient-to-b from-green-500/50 to-transparent mt-4 hidden md:block" />
          </div>
          
          <div>
            <span className="text-green-400 text-sm font-mono tracking-widest uppercase mb-4 block">Phase {step.number}</span>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">{step.title}</h3>
            <p className="text-gray-400 text-base md:text-xl leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>

        {/* Decorative corner */}
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent via-transparent to-green-500/5 pointer-events-none" />
      </div>
    </motion.div>
  );
};

const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use scroll progress within this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth the scroll progress for a more "premium" feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);
  const rotate = useTransform(smoothProgress, [0, 1], [0, 5]);

  return (
    <section 
      id="process" 
      ref={containerRef} 
      className="relative bg-[#030303]"
      style={{ height: '500vh' }} // Forced height for the scroll duration
    >
      {/* Sticky Container - This is what stays pinned */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center z-30">
        <FloatingParticles count={10} color="rgba(34, 197, 94, 0.08)" minSize={2} maxSize={5} />
        
        {/* Background Visuals */}
        <motion.div 
          style={{ y: backgroundY, rotate }}
          className="absolute inset-0 opacity-10 pointer-events-none"
        >
          <div className="absolute top-[10%] left-[5%] text-[15vw] font-black text-white/[0.02] leading-none">PROCESS</div>
          <div className="absolute bottom-[10%] right-[5%] text-[15vw] font-black text-white/[0.02] leading-none">STRATEGY</div>
        </motion.div>

        {/* Floating Header */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-40 text-center w-full px-6">
          <span className="pill-badge mb-4">
            <span className="glow-dot" />
            THE ROADMAP
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 tracking-tight">How we bring ideas to life</h2>
        </div>

        {/* The Stacked Cards */}
        <div className="relative h-full w-full max-w-7xl mx-auto px-6 mt-20">
          <div className="relative h-full">
            {PROCESS_STEPS.map((step, index) => (
              <ProcessStep 
                key={index} 
                step={step} 
                index={index} 
                progress={smoothProgress} 
              />
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-40">
          <span className="text-[10px] font-mono text-gray-500 tracking-[0.2em] uppercase">Scroll to Discover</span>
          <div className="w-32 h-[1px] bg-white/10 relative overflow-hidden">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-green-500"
              style={{ width: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
            />
          </div>
        </div>

        {/* Progress Dots (Side) */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40 hidden md:flex">
          {PROCESS_STEPS.map((_, i) => {
            const stepStart = i * 0.25;
            const stepEnd = (i + 1) * 0.25;
            
            return (
              <motion.div 
                key={i} 
                className="w-1 rounded-full bg-white/10"
                style={{ 
                  height: '40px',
                  backgroundColor: useTransform(
                    smoothProgress,
                    [stepStart, stepStart + 0.1, stepEnd - 0.1, stepEnd],
                    ["rgba(255,255,255,0.1)", "rgba(34,197,94,0.5)", "rgba(34,197,94,0.5)", "rgba(255,255,255,0.1)"]
                  )
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
