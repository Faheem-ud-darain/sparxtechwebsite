import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HashLink } from 'react-router-hash-link';
import { AnimatedContent } from '@/components/animations/AnimatedContent';
import { Suspense, lazy } from 'react';
const Orb = lazy(() => import('@/components/animations/Orb'));
import FloatingParticles from '@/components/animations/FloatingParticles';
import SplitText from '@/components/animations/SplitText';
import StarBorder from '@/components/animations/StarBorder';
import { STATS } from '@/data/constants';

import Magnetic from '@/components/animations/Magnetic';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const yScroll = useTransform(scrollYProgress, [0, 0.3], [0, 50]);
  const yOrb = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  
  // New: Receding scale effect for the entire content block
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[150vh] w-full bg-[#030303] flex flex-col justify-start overflow-hidden">
      {/* Orb WebGL Background */}
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

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/60 via-transparent to-[#030303] pointer-events-none z-0" />

      {/* Floating Particles — fewer on mobile */}
      <FloatingParticles count={25} color="rgba(34, 197, 94, 0.2)" minSize={2} maxSize={5} />

      {/* Parallax Background Elements */}
      <motion.div style={{ y: yBg, scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[30%] -left-[20%] md:left-[10%] w-[260px] md:w-[500px] h-[260px] md:h-[500px] rounded-full bg-green-500/[0.12] md:bg-green-500/[0.08] blur-[80px] md:blur-[150px] animate-float-slow" />
        <div className="absolute bottom-[20%] -right-[20%] md:right-[10%] w-[260px] md:w-[400px] h-[260px] md:h-[400px] rounded-full bg-emerald-500/[0.12] md:bg-emerald-500/[0.08] blur-[80px] md:blur-[150px] animate-float-slower" />
        <div className="absolute inset-0 grid-bg-fade opacity-30 h-full w-full" />
      </motion.div>

      {/* Vertical accent line — desktop only */}
      <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-white/[0.06] to-transparent pointer-events-none" />

      {/* ─── CONTENT ─── */}
      <motion.div
        style={{ y, opacity, scale: heroScale }}
        className="sticky top-0 z-10 max-w-6xl mx-auto w-full px-5 sm:px-6 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 pointer-events-none"
      >

        {/* ── MOBILE layout (< md) ── */}
        <div className="md:hidden flex flex-col items-center text-center">

          {/* Badge */}
          <AnimatedContent direction="up" delay={0.1} className="pointer-events-auto">
            <span className="pill-badge mb-6">
              <span className="glow-dot" />
              SPARX STUDIOZ
            </span>
          </AnimatedContent>

          {/* Heading */}
          <div className="mb-4 px-2 pointer-events-auto">
            <SplitText
              className="text-3xl xs:text-4xl leading-[1.2] font-extrabold tracking-tight text-white"
              delay={40}
              entryDelay={0.1}
              duration={1}
              splitType="chars"
              tag="h1"
              textAlign="center"
            >
              Technology That{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                Sparks
              </span>{' '}
              Tomorrow
            </SplitText>
          </div>

          {/* Short tagline */}
          <AnimatedContent direction="up" delay={0.15} className="pointer-events-auto">
            <p className="mt-4 text-sm sm:text-base text-gray-400 leading-relaxed max-w-[280px] mx-auto">
              Creative agency building innovative design, advanced development&nbsp;&amp; modern marketing solutions.
            </p>
          </AnimatedContent>

          {/* CTAs — stacked, compact */}
          <AnimatedContent direction="up" delay={0.2} className="pointer-events-auto">
            <div className="mt-8 flex flex-col gap-2.5 w-full max-w-[220px] mx-auto">
              <StarBorder as={HashLink} smooth to="/#contact" color="#55f78e" speed="5s" className="w-full">
                <span className="flex items-center justify-center gap-2 py-1">
                  Let's Connect
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </span>
              </StarBorder>
              <HashLink
                smooth
                to="/#services"
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium text-white/60 border border-white/10 hover:border-white/20 hover:bg-white/[0.03] transition-all duration-300"
              >
                Explore Services
              </HashLink>
            </div>
          </AnimatedContent>
        </div>

        {/* ── DESKTOP layout (md+) ── */}
        <div className="hidden md:flex flex-col items-center text-center">

          {/* Badge */}
          <AnimatedContent direction="up" delay={0.1} className="pointer-events-auto">
            <div className="mb-8">
              <span className="pill-badge">
                <span className="glow-dot" />
                SPARX STUDIOZ &amp; TECHNOLOGIES
              </span>
            </div>
          </AnimatedContent>

          {/* Heading */}
          <div className="mb-4 pointer-events-auto">
            <SplitText
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-white max-w-5xl mx-auto"
              delay={40}
              entryDelay={0.1}
              duration={1}
              splitType="chars"
              tag="h1"
              textAlign="center"
            >
              Technology That{' '}
              <span className="text-green-400 bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                Sparks
              </span>{' '}
              Tomorrow
            </SplitText>
          </div>

          {/* Subtext */}
          <AnimatedContent direction="up" delay={0.15} className="pointer-events-auto">
            <div className="mt-8 flex flex-col items-center gap-4 max-w-2xl mx-auto">
              <div className="w-[40px] h-[3px] bg-gradient-to-r from-green-500/0 via-green-500 to-green-500/0 rounded-full" />
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                We are a creative and technology-driven digital agency dedicated to empowering businesses through
                innovative design, advanced development, and modern marketing strategies.
              </p>
            </div>
          </AnimatedContent>

          {/* CTA Buttons */}
          <AnimatedContent direction="up" delay={0.2} className="pointer-events-auto">
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <StarBorder as={HashLink} smooth to="/#contact" color="#55f78e" speed="5s">
                <span className="flex items-center justify-center gap-2">
                  Let's Connect
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </span>
              </StarBorder>
              <HashLink
                smooth
                to="/#services"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium text-white/80 border border-white/10 hover:border-white/20 hover:bg-white/[0.03] transition-all duration-300"
              >
                Explore Services
              </HashLink>
            </div>
          </AnimatedContent>
        </div>
      </motion.div>

      {/* Stats Bar (Insight Section) — Anchored to bottom */}
      <div className="relative z-10 border-t border-white/[0.06] mt-auto pt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-6 md:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-4 sm:gap-6 md:gap-8">
            {STATS.map((stat, i) => (
              <AnimatedContent key={stat.label} direction="up" delay={0.25 + i * 0.05} className="pointer-events-auto">
                <div className="text-center md:text-left">
                  <div className="text-xl sm:text-2xl md:text-4xl font-bold text-white">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 mt-0.5 md:mt-1 uppercase tracking-wider">{stat.label}</div>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator — desktop only */}
      <motion.div
        style={{ opacity, y: yScroll }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:flex absolute bottom-72 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-gray-600 z-10"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-gray-600 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
