import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AnimatedContent } from '@/components/animations/AnimatedContent';
import ProfileCard from '@/components/animations/ProfileCard';

import FaheemImg from '@/assets/Faheem Jadoon.png';
import ZainImg from '@/assets/Zain Jadoon.png';
import IbaadImg from '@/assets/Ibaad Jadoon.jpeg';
import AraizImg from '@/assets/Araiz Jadoon.png';
import RajaImg from '@/assets/Raja Abdullah.png';

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
  return (
    <main className="min-h-screen bg-[#030303] text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 grid-bg-fade pointer-events-none opacity-40" />
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] rounded-full bg-green-500/[0.08] blur-[150px] pointer-events-none animate-float-slow" />

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <AnimatedContent direction="up">
            <span className="pill-badge mb-6">
              <span className="glow-dot" />
              THE MINDS BEHIND SPARX
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Meet Our <span className="text-green-500">Team</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              We are a collective of designers, engineers, and strategists united by a shared passion for building extraordinary digital products.
            </p>
          </AnimatedContent>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {TEAM_MEMBERS.map((member, index) => (
              <AnimatedContent key={member.id} direction="up" delay={index * 0.1} className="relative z-10 hover:z-50">
                <div className="flex justify-center">
                  <ProfileCard
                    name={member.name}
                    title={member.title}
                    handle={member.handle}
                    status={member.status}
                    avatarUrl={member.image}
                    instagramUrl={member.instagram}
                    linkedInUrl={member.linkedin}
                  />
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
