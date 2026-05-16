import { useEffect } from 'react';
import { m, useMotionValue, useSpring } from 'framer-motion';

const Background = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

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

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Dynamic Gradient Background */}
      <m.div 
        className="absolute inset-0 opacity-50 bg-[#050505]"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #0a0a0a 0%, #030303 100%)'
        }}
      />
      
      {/* Animated Light Blobs */}
      <m.div
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-green-500/10 blur-[120px]"
        style={{
          x: springX.get() * 100,
          y: springY.get() * 100,
        }}
      />
      <m.div
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]"
        style={{
          x: springX.get() * -100,
          y: springY.get() * -100,
        }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-bg-fade opacity-30" />
      
      {/* Grain Overlay */}
      <div className="absolute inset-0 noise-bg opacity-[0.02] mix-blend-overlay" />
    </div>
  );
};

export default Background;
