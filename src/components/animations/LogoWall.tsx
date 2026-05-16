import React from 'react';
import { TECH_STACK } from '@/data/constants';
import { AnimatedContent } from './AnimatedContent';

export const LogoWall: React.FC = () => {
  return (
    <AnimatedContent direction="up" delay={0.2}>
      <div className="relative w-full bg-[#030303] py-8 border-y border-white/[0.06] overflow-hidden">
        {/* Edge fade gradients */}
        <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee whitespace-nowrap flex items-center">
          {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK].map((tech, index) => (
            <span
              key={index}
              className="tech-logo mx-10 text-sm font-semibold text-gray-600 uppercase tracking-[0.15em] transition-colors duration-300 select-none cursor-default"
              style={{ '--brand-color': tech.color } as React.CSSProperties}
            >
              {tech.name}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        .tech-logo:hover {
          color: var(--brand-color);
        }
      `}</style>
    </AnimatedContent>
  );
};
