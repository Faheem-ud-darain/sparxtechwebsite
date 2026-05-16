import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Background = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  useEffect(() => {
    // Only handle mouse on non-touch devices for performance
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth) - 0.5);
      mouseY.set((clientY / innerHeight) - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Subtle parallax transforms
  const moveX1 = useTransform(springX, (v) => v * 60);
  const moveY1 = useTransform(springY, (v) => v * 60);
  const moveX2 = useTransform(springX, (v) => v * -80);
  const moveY2 = useTransform(springY, (v) => v * -80);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#030303]">
      {/* Optimized Decorative Blobs - No continuous scaling loops */}
      <motion.div
        style={{ x: moveX1, y: moveY1 }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-green-500/5 rounded-full blur-[100px] opacity-40"
      />
      
      <motion.div
        style={{ x: moveX2, y: moveY2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-emerald-500/5 rounded-full blur-[120px] opacity-30"
      />

      <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-green-400/5 rounded-full blur-[80px] opacity-20" />

      {/* Grid Pattern - Static for performance */}
      <div className="absolute inset-0 grid-bg opacity-[0.05] z-[0]" />
      
      {/* Center Glow - Static gradient is much cheaper than animating blurs */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.02)_0%,transparent_70%)]" />
    </div>
  );
};

export default Background;
