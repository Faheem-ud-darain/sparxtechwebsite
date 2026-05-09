import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const BlobCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  // Use MotionValues to bypass React re-renders on mousemove
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth the motion with springs
  const springX = useSpring(mouseX, { stiffness: 500, damping: 35, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 35, mass: 0.5 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], .interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Cursor dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{ 
          x: springX, 
          y: springY,
          translateX: isHovering ? '-50%' : '-50%',
          translateY: isHovering ? '-50%' : '-50%',
          width: isHovering ? 60 : 8,
          height: isHovering ? 60 : 8,
          backgroundColor: 'white'
        }}
        animate={{
          scale: isHovering ? 1 : 1,
        }}
      />

      {/* Ambient glow that follows cursor - use raw mouse values for zero lag */}
      <motion.div
        className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-[-1] hidden lg:block opacity-40"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)',
          willChange: 'transform'
        }}
      />
    </>
  );
};
