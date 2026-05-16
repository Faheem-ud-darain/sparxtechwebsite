import React, { useRef } from 'react';
import { m, useSpring, useMotionValue, useTransform } from 'framer-motion';

interface TiltedCardProps {
  children: React.ReactNode;
  className?: string;
  tiltMax?: number;
  scale?: number;
  glareEnable?: boolean;
  borderRadius?: string;
}

const TiltedCard: React.FC<TiltedCardProps> = ({
  children,
  className = '',
  tiltMax = 12,
  scale = 1.02,
  glareEnable = true,
  borderRadius = '2rem',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Use MotionValues for high-performance tracking
  const rotateX = useSpring(0, { stiffness: 200, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 30 });
  const scaleVal = useSpring(1, { stiffness: 200, damping: 30 });
  
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useSpring(0, { stiffness: 300, damping: 40 });

  // Transform coordinates into a radial gradient string
  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    rotateX.set((y - 0.5) * -tiltMax);
    rotateY.set((x - 0.5) * tiltMax);
    
    glareX.set(x * 100);
    glareY.set(y * 100);
  };

  const handleMouseEnter = () => {
    scaleVal.set(scale);
    glareOpacity.set(1);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    scaleVal.set(1);
    glareX.set(50);
    glareY.set(50);
    glareOpacity.set(0);
  };

  return (
    <m.div
      ref={ref}
      className={`relative ${className} group/tilted`}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        scale: scaleVal,
        borderRadius,
        willChange: 'transform'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {/* Glare overlay - optimized with MotionValue */}
      {glareEnable && (
        <m.div
          className="absolute inset-0 pointer-events-none z-30"
          style={{
            borderRadius,
            background: glareBackground,
            opacity: glareOpacity
          }}
        />
      )}
    </m.div>
  );
};

export default TiltedCard;
