import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface FloatingParticlesProps {
  count?: number;
  color?: string;
  className?: string;
  minSize?: number;
  maxSize?: number;
}

const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  count = 20,
  color = 'rgba(34, 197, 94, 0.15)',
  className = '',
  minSize = 2,
  maxSize = 6,
}) => {
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: minSize + Math.random() * (maxSize - minSize),
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 5,
      opacity: 0.3 + Math.random() * 0.5,
    }));
  }, [count, minSize, maxSize]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: color,
            filter: `blur(${p.size > 4 ? 1 : 0}px)`,
          }}
          animate={{
            y: [0, -100, 40, -80, 0],
            x: [0, 60, -40, 30, 0],
            opacity: [p.opacity, p.opacity * 1.5, p.opacity * 0.5, p.opacity * 1.2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
