import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const BlobCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Cursor dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        animate={{
          x: mousePosition.x - (isHovering ? 20 : 4),
          y: mousePosition.y - (isHovering ? 20 : 4),
          width: isHovering ? 40 : 8,
          height: isHovering ? 40 : 8,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
        style={{ backgroundColor: 'white' }}
      />

      {/* Ambient glow that follows cursor */}
      <motion.div
        className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-[-1] hidden lg:block"
        animate={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 150,
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0.15 }}
        style={{
          background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)',
        }}
      />
    </>
  );
};
