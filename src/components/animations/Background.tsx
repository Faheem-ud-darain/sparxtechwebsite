import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Background = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Only track mouse on devices that have it
      if (window.innerWidth < 768) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth) - 0.5);
      mouseY.set((clientY / innerHeight) - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Parallax transforms
  const moveX1 = useTransform(springX, (v) => v * 100);
  const moveY1 = useTransform(springY, (v) => v * 100);
  const moveX2 = useTransform(springX, (v) => v * -150);
  const moveY2 = useTransform(springY, (v) => v * -150);

  // Detect if we are on mobile to disable heavy effects
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#030303]">
      {/* Decorative Blobs with Parallax - Simplified on Mobile */}
      <motion.div
        style={{ x: moveX1, y: moveY1, willChange: 'transform' }}
        animate={isMobile ? { opacity: 0.1 } : {
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={isMobile ? {} : {
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-green-500/10 rounded-full blur-[120px]"
      />
      
      <motion.div
        style={{ x: moveX2, y: moveY2, willChange: 'transform' }}
        animate={isMobile ? { opacity: 0.05 } : {
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={isMobile ? {} : {
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-emerald-500/10 rounded-full blur-[150px]"
      />

      <motion.div
        animate={isMobile ? { opacity: 0.05 } : {
          x: [0, 50, 0],
          y: [0, -50, 0],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={isMobile ? {} : {
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ willChange: 'transform, opacity' }}
        className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-green-400/5 rounded-full blur-[100px]"
      />

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay z-[1] animate-grain" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-bg opacity-[0.07] z-[0]" />
      
      {/* Center Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.03)_0%,transparent_70%)]" />
    </div>
  );
};

export default Background;
