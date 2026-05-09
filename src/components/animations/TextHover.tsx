import React, { useRef } from 'react';
import { gsap } from 'gsap';

interface TextHoverProps {
  text: string;
  className?: string;
  hoverColor?: string;
}

const TextHover: React.FC<TextHoverProps> = ({ text, className = '', hoverColor = '#22c55e' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const handleMouseEnter = () => {
    gsap.to(charsRef.current, {
      y: -5,
      color: hoverColor,
      stagger: {
        amount: 0.2,
        from: "start"
      },
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(charsRef.current, {
      y: 0,
      color: 'inherit',
      stagger: {
        amount: 0.2,
        from: "start"
      },
      duration: 0.4,
      ease: "power2.in"
    });
  };

  return (
    <div 
      ref={containerRef}
      className={`inline-block cursor-pointer overflow-hidden py-1 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text.split('').map((char, i) => (
        <span
          key={i}
          ref={el => charsRef.current[i] = el}
          className="inline-block transition-colors"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default TextHover;
