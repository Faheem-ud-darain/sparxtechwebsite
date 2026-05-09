import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedContentProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const AnimatedContent: React.FC<AnimatedContentProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up'
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const getVariants = () => {
    switch(direction) {
      case 'up': return { hidden: { y: 60, opacity: 0, scale: 0.9 }, visible: { y: 0, opacity: 1, scale: 1 } };
      case 'down': return { hidden: { y: -60, opacity: 0, scale: 0.9 }, visible: { y: 0, opacity: 1, scale: 1 } };
      case 'left': return { hidden: { x: 60, opacity: 0, scale: 0.9 }, visible: { x: 0, opacity: 1, scale: 1 } };
      case 'right': return { hidden: { x: -60, opacity: 0, scale: 0.9 }, visible: { x: 0, opacity: 1, scale: 1 } };
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={getVariants()}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.8, delay: delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
