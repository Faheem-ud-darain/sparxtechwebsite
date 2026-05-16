import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AnimatedContent } from '@/components/animations/AnimatedContent';
import { Suspense, lazy } from 'react';
const Orb = lazy(() => import('@/components/animations/Orb'));
import FloatingParticles from '@/components/animations/FloatingParticles';
import SplitText from '@/components/animations/SplitText';
import StarBorder from '@/components/animations/StarBorder';
import TechPattern from '@/components/animations/TechPattern';
import FuturisticHUD from '@/components/animations/FuturisticHUD';
import HeroDashboard from '@/components/animations/HeroDashboard';
import { STATS } from '@/data/constants';

const Hero = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const yScroll = useTransform(scrollYProgress, [0, 0.3], [0, 50]);
  const yOrb = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  
  // New: Receding scale effect for the entire content block
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const handleSectionClick = (href: string) => {
    if (href.startsWith('/#')) {
      const id = href.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate(href);
  };

  return (
    <section ref={ref} className="relative min-h-[170vh] w-full bg-[#030303] flex flex-col justify-start overflow-hidden">
      {/* ── BACKGROUND LAYERS ── */}
      <motion.div style={{ y: yOrb, scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 z-0 overflow-hidden">
        <Suspense fallback={<div className="absolute inset-0 bg-[#030303]" />}>
          <Orb
            hue={69}
            hoverIntensity={0.46}
            rotateOnHover={true}
            forceHoverState={false}
            backgroundColor="#030303"
          />
        </Suspense>
      </motion.div>

      <TechPattern opacity={0.4} color="rgba(34, 197, 94, 0.15)" />
      <FuturisticHUD />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/80 via-[#030303]/20 to-[#030303] pointer-events-none z-0" />

      {/* Floating Particles */}
      <FloatingParticles count={40} color="rgba(34, 197, 94, 0.25)" minSize={1} maxSize={4} />

      {/* Parallax Background Elements */}
      <motion.div style={{ y: yBg, scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-green-500/[0.05] blur-[120px] animate-float-slow" />
        <div className="absolute bottom-[30%] right-[5%] w-[500px] h-[500px] rounded-full bg-emerald-500/[0.05] blur-[120px] animate-float-slower" />
      </motion.div>

      {/* ─── CONTENT ─── */}
      <motion.div
        style={{ y, opacity, scale: heroScale }}
        className="sticky top-0 z-10 max-w-7xl mx-auto w-full px-5 sm:px-6 pt-32 sm:pt-40 md:pt-48 pb-20 pointer-events-none"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ── LEFT COLUMN: TEXT ── */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Badge */}
            <AnimatedContent direction="up" delay={0.1} className="pointer-events-auto">
              <span className="pill-badge mb-8 backdrop-blur-md border-white/10">
                <span className="glow-dot" />
                <span className="text-[10px] tracking-[0.3em] font-bold uppercase">SYSTEM STATUS: OPTIMIZED</span>
              </span>
            </AnimatedContent>

            {/* Heading */}
            <div className="mb-6 pointer-events-auto relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-green-500/20 hidden lg:block" />
              <SplitText
                className="text-4xl xs:text-5xl md:text-6xl lg:text-8xl font-black leading-[0.95] tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                delay={30}
                entryDelay={0.1}
                duration={0.8}
                splitType="chars"
                tag="h1"
              >
                Sparking Future Technology
              </SplitText>
              {/* Manual gradient span because SplitText handles chars */}
              <div className="mt-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 drop-shadow-[0_0_20px_rgba(34,197,94,0.3)] text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-[0.2em]">
                Elite Agency
              </div>
            </div>

            {/* Subtext */}
            <AnimatedContent direction="up" delay={0.15} className="pointer-events-auto">
              <div className="max-w-xl">
                <p className="text-base md:text-lg lg:text-xl text-gray-400 leading-relaxed font-medium">
                  We bridge the gap between imagination and execution. Specialized in 
                  <span className="text-white"> Next-Gen Design</span>, 
                  <span className="text-white"> Advanced Development</span>, and 
                  <span className="text-white"> Digital Evolution</span>.
                </p>
                
                {/* Visual Data Line */}
                <div className="mt-8 h-[2px] w-full max-w-[100px] bg-gradient-to-r from-green-500 to-transparent rounded-full mx-auto lg:mx-0" />
              </div>
            </AnimatedContent>

            {/* CTAs */}
            <AnimatedContent direction="up" delay={0.2} className="pointer-events-auto">
              <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6">
                <button 
                  onClick={() => handleSectionClick('/#contact')} 
                  className="bg-transparent border-none p-0 cursor-pointer group"
                >
                  <StarBorder color="#55f78e" speed="5s" className="scale-110">
                    <span className="flex items-center justify-center gap-3 px-2 py-1">
                      Start Your Project
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </span>
                  </StarBorder>
                </button>
                <button
                  onClick={() => handleSectionClick('/#services')}
                  className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-sm font-bold text-white/70 border border-white/10 hover:border-green-500/30 hover:text-green-500 transition-all duration-300 bg-white/[0.02] backdrop-blur-sm"
                >
                  Our Expertise
                </button>
              </div>
            </AnimatedContent>
          </div>

          {/* ── RIGHT COLUMN: INTERACTIVE DASHBOARD ── */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center pointer-events-auto">
            <AnimatedContent direction="left" delay={0.3}>
              <HeroDashboard />
            </AnimatedContent>
          </div>

        </div>
      </motion.div>

      {/* ── STATS BAR ── */}
      <div className="relative z-10 mt-auto border-t border-white/[0.05] bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {STATS.map((stat, i) => (
              <AnimatedContent key={stat.label} direction="up" delay={0.3 + i * 0.05} className="pointer-events-auto">
                <div className="flex flex-col items-center md:items-start gap-2 group">
                  <div className="text-3xl md:text-5xl font-black text-white group-hover:text-green-500 transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-green-500/50" />
                    <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-[0.2em] font-bold">{stat.label}</span>
                  </div>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-3 text-white/20 z-10"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase font-bold">Initialize Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-green-500/50 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
