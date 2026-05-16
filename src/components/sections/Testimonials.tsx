import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { AnimatedContent } from '@/components/animations/AnimatedContent';
import TechPattern from '@/components/animations/TechPattern';

const TESTIMONIALS = [
  {
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
    text: "I couldn't be happier with the results from the marketing firm I've partnered with! Their expert team has significantly boosted my watch business, implementing creative strategies that truly resonate with our audience.",
    author: "Nate Apodaca",
    designation: "Founder, Kingdom Watch Company",
    service: "Marketing & Strategy",
    rating: 5
  },
  {
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    text: "You really work hard and it was really helpful for us, as a team work i really appreciate your efforts in Social Media Marketing and Graphics Design.",
    author: "Ijaz Ur Rehman",
    designation: "CEO, Gold of Himalaya",
    service: "SMM & Graphics Design",
    rating: 5
  },
  {
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    text: "I had a great experience working with him on my assignments and projects. The work was always well structured, original, and delivered on time. He understands requirements very clearly.",
    author: "Abdullah Tariq",
    designation: "Client, United Kingdom",
    service: "Academic Consulting",
    rating: 5
  },
  {
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
    text: "Excellent service from SparX! We utilized both their model services and their studio space. The models were punctual and talented, and the location was very well-maintained.",
    author: "Hassan",
    designation: "CEO, Mofasa Organics",
    service: "Model Services & Studio Rental",
    rating: 5
  },
  {
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop',
    text: "The 3D web experience developed by SparX for our product launch was phenomenal. It significantly increased our user engagement and converted better than any previous landing page.",
    author: "Sarah Chen",
    designation: "CMO, TechVision Global",
    service: "3D Web Development",
    rating: 5
  },
  {
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop',
    text: "Their attention to detail in brand identity is unmatched. They captured our vision perfectly and transformed our digital presence into something truly premium.",
    author: "Marcus Thorne",
    designation: "Creative Director, Obsidian Arch",
    service: "Branding & UI/UX",
    rating: 5
  }
];

import { Suspense } from 'react';
const CircularGallery = React.lazy(() => import('@/components/animations/CircularGallery'));



const Testimonials = () => {
  return (
    <section id="testimonials" className="py-32 bg-[#030303] relative overflow-hidden border-t border-white/[0.03]">
      <TechPattern color="rgba(34, 197, 94, 0.12)" opacity={0.3} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10 text-center relative z-10">
        <AnimatedContent direction="up">
          <span className="pill-badge mb-6">
            <span className="glow-dot" />
            CLIENT SUCCESS STORIES
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]">
            Global Client<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
              Testimonials
            </span>
          </h2>
        </AnimatedContent>
      </div>

      <div style={{ height: '600px', position: 'relative' }}>
        <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white/20">Loading Gallery...</div>}>
          <CircularGallery 
            items={TESTIMONIALS}
            bend={1}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollSpeed={2}
            scrollEase={0.05}
          />
        </Suspense>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/[0.03] blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
};

export default Testimonials;
