import React, { useRef } from 'react';
import { m, useInView } from 'framer-motion';

interface SplitTextProps {
  text?: string;
  children?: string;
  className?: string;
  delay?: number; // Stagger delay (ms)
  entryDelay?: number; // Initial delay (s)
  duration?: number; // Animation duration (s)
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  splitType?: 'chars' | 'words';
  textAlign?: 'left' | 'center' | 'right';
  onAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  children,
  className = '',
  delay = 30, // Default stagger in ms
  entryDelay = 0,
  duration = 0.6,
  tag = 'div',
  splitType = 'chars',
  textAlign = 'left',
  onAnimationComplete,
}) => {
  const content = text || children || '';
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const words = content.split(' ');

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay / 1000,
        delayChildren: entryDelay,
        onComplete: onAnimationComplete
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: '100%',
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: duration,
        ease: [0.215, 0.61, 0.355, 1] as any // cubic-out
      }
    }
  };

  const Tag = tag as any;

  return (
    <Tag
      ref={containerRef}
      className={`inline-block overflow-hidden ${className}`}
      style={{ textAlign, verticalAlign: 'top' }}
    >
      <m.span
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="inline-block whitespace-normal"
      >
        {splitType === 'words' ? (
          words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <m.span
                variants={itemVariants}
                className="inline-block"
                style={{ marginRight: '0.25em' }}
              >
                {word}
              </m.span>
            </span>
          ))
        ) : (
          words.map((word, wordIndex) => {
            const chars = Array.from(word);
            return (
              <span key={wordIndex} className="inline-block whitespace-nowrap">
                {chars.map((char, charIndex) => (
                  <span key={charIndex} className="inline-block overflow-hidden">
                    <m.span
                      variants={itemVariants}
                      className="inline-block"
                    >
                      {char}
                    </m.span>
                  </span>
                ))}
                {/* Space between words */}
                {wordIndex < words.length - 1 && (
                  <span className="inline-block overflow-hidden">
                    <m.span
                      variants={itemVariants}
                      className="inline-block"
                      style={{ whiteSpace: 'pre' }}
                    >
                      {'\u00A0'}
                    </m.span>
                  </span>
                )}
              </span>
            );
          })
        )}
      </m.span>
    </Tag>
  );
};

export default SplitText;
