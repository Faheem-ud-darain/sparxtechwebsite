import React from 'react';
import CircularGallery from '@/components/animations/CircularGallery';
import { AnimatedContent } from '@/components/animations/AnimatedContent';

const TESTIMONIALS = [
  {
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
    text: "I couldn't be happier with the results from the marketing firm I've partnered with! Their expert team has significantly boosted my watch business, implementing creative strategies that truly resonate with our audience. They understand my vision and have delivered exceptional campaigns.",
    author: "Nate Apodaca",
    designation: "Founder, Kingdom Watch Company",
    service: "Graphics Design & Marketing",
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
    designation: "Student, United Kingdom",
    service: "Academic & Professional Consulting",
    rating: 5
  },
  {
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    text: "Innovative solutions and a dedicated support team. Partnering with SPARX was the best decision for our startup's digital presence and growth strategy.",
    author: "Emily Watson",
    designation: "Founder of GreenPulse",
    service: "Mobile App Development",
    rating: 5
  },
  {
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop',
    text: "Their UI/UX expertise significantly improved our user engagement metrics. Truly a world-class agency for modern digital products and creative excellence.",
    author: "David Miller",
    designation: "Creative Head at PixelPerfect",
    service: "Product Design",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-[#030303] relative overflow-hidden border-t border-white/[0.03]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12 text-center">
        <AnimatedContent direction="up">
          <span className="pill-badge mb-4">
            <span className="glow-dot" />
            TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 tracking-tight">
            What Our Clients<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
              Are Saying
            </span>
          </h2>
        </AnimatedContent>
      </div>

      <div className="relative h-[500px] md:h-[600px] w-full">
        <CircularGallery 
          items={TESTIMONIALS}
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollSpeed={2}
          scrollEase={0.05}
        />
      </div>

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-green-500/[0.03] blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

export default Testimonials;
