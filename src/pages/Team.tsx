import { useState, useRef } from 'react';
import Footer from '@/components/layout/Footer';
import { AnimatedContent } from '@/components/animations/AnimatedContent';
import ProfileCard from '@/components/animations/ProfileCard';
import { motion } from 'framer-motion';
import PixelCard from '@/components/animations/PixelCard';
import SEO from '@/components/SEO';

import FaheemImg from '@/assets/Faheem Jadoon.webp';
import ZainImg from '@/assets/Zain Jadoon.webp';
import IbaadImg from '@/assets/Ibaad Jadoon.jpeg';
import AraizImg from '@/assets/Araiz Jadoon.webp';
import RajaImg from '@/assets/Raja Abdullah.webp';

const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Faheem Jadoon',
    title: 'Founder',
    handle: 'aka_faheem',
    status: 'In Studio',
    image: FaheemImg,
    instagram: 'https://instagram.com/aka_faheem',
    linkedin: 'https://www.linkedin.com/in/faheemuddarain/',
  },
  {
    id: 2,
    name: 'Zain Jadoon',
    title: 'CEO',
    handle: 'nka_zain',
    status: 'In Meeting',
    image: ZainImg,
    instagram: 'https://instagram.com/nka_zain',
    linkedin: 'https://www.linkedin.com/in/zun-nurain-271773378/',
  },
  {
    id: 3,
    name: 'Ibaad Jadoon',
    title: 'Project Manager',
    handle: 'aka_ibaad',
    status: 'Planning',
    image: IbaadImg,
    instagram: 'https://instagram.com/aka_ibaad',
    linkedin: '',
  },
  {
    id: 4,
    name: 'Araiz Jadoon',
    title: 'HR Specialist',
    handle: 'aka_araiz',
    status: 'Available',
    image: AraizImg,
    instagram: 'https://instagram.com/aka_araiz',
    linkedin: 'https://www.linkedin.com/in/araiz-jadoon-3a730a357/',
  },
  {
    id: 5,
    name: 'Raja Abdullah',
    title: 'Senior Web Developer & Team Lead',
    handle: 'ok._.abdullah1',
    status: 'Coding',
    image: RajaImg,
    instagram: 'https://instagram.com/ok._.abdullah1',
    linkedin: 'https://www.linkedin.com/in/raja-abdullah-khan-b902421b6/',
  }
];



const Team = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / TEAM_MEMBERS.length;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(idx, 0), TEAM_MEMBERS.length - 1));
  };

  const scrollTo = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / TEAM_MEMBERS.length;
    el.scrollTo({ left: cardWidth * idx, behavior: 'smooth' });
  };

  return (
    <main className="relative min-h-screen text-white selection:bg-green-500/30">
      <SEO 
        title="Our Team" 
        description="Meet the experts at Sparx Studioz & Technologies. Our team of designers, engineers, and strategists are dedicated to building extraordinary digital products." 
      />

      {/* Decorative Props */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ y: [0, -25, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[5%] w-32 h-32 border border-green-500/5 rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[10%] w-48 h-48 border border-emerald-500/5 rounded-3xl rotate-45"
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-36 md:pt-40 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 overflow-hidden">

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <AnimatedContent direction="up">
            <span className="pill-badge mb-6">
              <span className="glow-dot" />
              THE MINDS BEHIND SPARX
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6">
              Meet Our <span className="text-green-500">Team</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              We are a collective of designers, engineers, and strategists united by a shared passion for
              building extraordinary digital products.
            </p>
          </AnimatedContent>
        </div>
      </section>

      {/* ─── MOBILE: horizontal snap carousel ─── */}
      <section className="md:hidden relative pb-12 overflow-hidden">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" />

        {/* Snap-scroll track */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-6 pt-2 scroll-smooth"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            touchAction: 'pan-x pan-y'
          }}
        >
          {/* Invisible spacers for centering first/last card */}
          <div className="shrink-0 w-[calc(50vw-130px)]" />
          
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="snap-center shrink-0 flex justify-center"
              style={{ width: '260px', touchAction: 'pan-y' }}
            >
              <PixelCard variant="green" className="w-full h-full">
                <ProfileCard
                  name={member.name}
                  title={member.title}
                  handle={member.handle}
                  status={member.status}
                  avatarUrl={member.image}
                  instagramUrl={member.instagram}
                  linkedInUrl={member.linkedin}
                  className="pointer-events-auto"
                />
              </PixelCard>
            </div>
          ))}

          <div className="shrink-0 w-[calc(50vw-130px)]" />
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {TEAM_MEMBERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              aria-label={`View ${TEAM_MEMBERS[idx].name}`}
              className={`rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? 'w-7 h-2 bg-green-400 shadow-[0_0_10px_rgba(34,197,94,0.7)]'
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Active member label */}
        <div className="text-center mt-3 min-h-[36px]">
          <p className="text-sm font-medium text-white/70 transition-all duration-300">
            {TEAM_MEMBERS[activeIndex].name}
          </p>
          <p className="text-xs text-green-500/60 uppercase tracking-widest mt-0.5">
            {TEAM_MEMBERS[activeIndex].title}
          </p>
        </div>
      </section>

      <section className="hidden md:block py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-wrap justify-center -space-x-12 gap-y-16">
            {TEAM_MEMBERS.map((member, index) => (
              <AnimatedContent 
                key={member.id} 
                direction="up" 
                delay={index * 0.1} 
                className="relative transition-all duration-500 hover:z-50 hover:scale-105 group"
              >
                <div className="w-[380px] aspect-[4/5.5]">
                  <PixelCard variant="green" className="w-full h-full">
                    <ProfileCard
                      name={member.name}
                      title={member.title}
                      handle={member.handle}
                      status={member.status}
                      avatarUrl={member.image}
                      instagramUrl={member.instagram}
                      linkedInUrl={member.linkedin}
                    />
                  </PixelCard>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Team;
