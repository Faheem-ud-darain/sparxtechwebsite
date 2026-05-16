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
  
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
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
    <section ref={ref} className="relative min-h-[160vh] w-full bg-[#030303] flex flex-col justify-start overflow-hidden">
      {/* ── BACKGROUND LAYERS ── */}
      <motion.div style={{ y: yOrb, scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 z-0 overflow-hidden">
        <Suspense fallback={<div className="absolute inset-0 bg-[#030303]" />}>
          <Orb
            hue={69}
            hoverIntensity={0.4}
            rotateOnHover={true}
            backgroundColor="#030303"
          />
        </Suspense>
      </motion.div>

      {/* Tech Pattern Background */}
      <TechPattern opacity={0.3} color="rgba(34, 197, 94, 0.1)" />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/70 via-transparent to-[#030303] pointer-events-none z-0" />

      {/* Floating Particles */}
      <FloatingParticles count={30} color="rgba(34, 197, 94, 0.15)" minSize={1} maxSize={4} />

      {/* Parallax Background Elements */}
      <motion.div style={{ y: yBg, scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-green-500/[0.03] blur-[120px] animate-float-slow" />
        <div className="absolute bottom-[30%] right-[10%] w-[500px] h-[500px] rounded-full bg-emerald-500/[0.03] blur-[120px] animate-float-slower" />
        <div className="absolute inset-0 grid-bg-fade opacity-20 h-full w-full" />
      </motion.div>

      {/* ─── CONTENT ─── */}
      <motion.div
        style={{ y, opacity, scale: heroScale }}
        className="sticky top-0 z-10 max-w-5xl mx-auto w-full px-6 pt-32 sm:pt-40 md:pt-48 pb-20 pointer-events-none"
      >
        <div className="flex flex-col items-center text-center relative">
          
          {/* HUD Brackets Framing the Content (Desktop only) */}
          <div className="hidden lg:block absolute -inset-10 pointer-events-none opacity-20">
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-green-500 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-green-500 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-green-500 rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-green-500 rounded-br-2xl" />
          </div>

          {/* Badge */}
          <AnimatedContent direction="up" delay={0.1} className="pointer-events-auto">
            <div className="mb-10">
              <span className="pill-badge backdrop-blur-md border-white/10 bg-white/[0.03] px-6 py-2">
                <span className="glow-dot" />
                <span className="text-[10px] tracking-[0.4em] font-bold uppercase text-green-400/80">SPARX STUDIOZ & TECHNOLOGIES</span>
              </span>
            </div>
          </AnimatedContent>

          {/* Heading */}
          <div className="mb-8 pointer-events-auto">
            <SplitText
              className="text-4xl xs:text-5xl md:text-7xl lg:text-[5.5rem] font-black leading-[1] tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              delay={35}
              entryDelay={0.1}
              duration={0.8}
              splitType="chars"
              tag="h1"
              textAlign="center"
            >
              Technology That Sparks Tomorrow
            </SplitText>
            
            {/* Visual accent line */}
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100px", opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="h-[3px] bg-gradient-to-r from-transparent via-green-500 to-transparent rounded-full mx-auto mt-8"
            />
          </div>

          {/* Subtext */}
          <AnimatedContent direction="up" delay={0.15} className="pointer-events-auto">
            <div className="mt-4 flex flex-col items-center gap-6 max-w-2xl mx-auto">
              <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed font-medium">
                We are a creative and technology-driven digital agency dedicated to empowering businesses through
                <span className="text-white"> innovative design</span>, 
                <span className="text-white"> advanced development</span>, and 
                <span className="text-white"> modern marketing strategies</span>.
              </p>
            </div>
          </AnimatedContent>

          {/* CTA Buttons */}
          <AnimatedContent direction="up" delay={0.2} className="pointer-events-auto">
            <div className="mt-14 flex flex-wrap items-center justify-center gap-6">
              <button 
                onClick={() => handleSectionClick('/#contact')} 
                className="bg-transparent border-none p-0 cursor-pointer group"
              >
                <StarBorder color="#55f78e" speed="5s" className="scale-110">
                  <span className="flex items-center justify-center gap-3 px-6 py-2 font-bold uppercase tracking-widest text-xs">
                    Let's Connect
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </span>
                </StarBorder>
              </button>
              <button
                onClick={() => handleSectionClick('/#services')}
                className="inline-flex items-center gap-3 px-10 py-4.5 rounded-full text-xs font-black uppercase tracking-[0.2em] text-white/50 border border-white/10 hover:border-green-500/40 hover:text-green-400 transition-all duration-500 bg-white/[0.01] backdrop-blur-md group"
              >
                Our Expertise
                <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-green-500 transition-colors" />
              </button>
            </div>
          </AnimatedContent>
        </div>
      </motion.div>

      {/* Stats Bar */}
      <div className="relative z-10 border-t border-white/[0.05] mt-auto bg-black/40 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {STATS.map((stat, i) => (
              <AnimatedContent key={stat.label} direction="up" delay={0.3 + i * 0.05} className="pointer-events-auto">
                <div className="flex flex-col items-center md:items-start gap-3 group">
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
        style={{ opacity, y: yScroll }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:flex absolute bottom-40 left-1/2 -translate-x-1/2 flex-col items-center gap-3 text-white/20 z-10"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase font-bold">Initialize Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-green-500/50 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
