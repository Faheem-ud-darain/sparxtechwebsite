import React from 'react';
import CircularGallery from '@/components/animations/CircularGallery';
import { AnimatedContent } from '@/components/animations/AnimatedContent';

const TESTIMONIALS = [
  {
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
    text: "I couldn't be happier with the results from the marketing firm I've partnered with! Their expert team has significantly boosted my watch business, implementing creative strategies that truly resonate with our audience. They understand my vision and have delivered exceptional campaigns.",
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
    designation: "Student, United Kingdom",
    service: "Academic Consulting",
    rating: 5
  },
  {
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
    text: "Excellent service from SparX! We utilized both their model services and their studio space for our latest project. The models were punctual and talented, and the location itself was decent, spacious, and very well-maintained.",
    author: "Hassan",
    designation: "CEO, Mofasa Organics",
    service: "Model Services & Studio Rental",
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

      <div className="relative h-[500px] md:h-[750px] w-full">
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
