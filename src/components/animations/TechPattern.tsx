import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface TechPatternProps {
  className?: string;
  color?: string;
  opacity?: number;
}

const TechPattern: React.FC<TechPatternProps> = ({ 
  className = '', 
  color = 'rgba(34, 197, 94, 0.1)', 
  opacity = 0.5 
}) => {
  const lines = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: 1 + Math.random() * 3,
      height: 40 + Math.random() * 100,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} style={{ opacity }}>
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05]" 
        style={{ 
          backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} 
      />
      
      {/* Animated Data Streams */}
      {lines.map((line) => (
        <motion.div
          key={line.id}
          className="absolute rounded-full"
          style={{
            left: `${line.x}%`,
            top: `${line.y}%`,
            width: `${line.width}px`,
            height: `${line.height}px`,
            background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
            boxShadow: `0 0 15px ${color}`,
          }}
          animate={{
            y: [-200, 800],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: line.duration,
            repeat: Infinity,
            ease: "linear",
            delay: line.delay,
          }}
        />
      ))}

      {/* Hexagon Pattern Placeholder (Optional SVG if needed) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
            <path d="M25 0.75 L46.65 13.25 L46.65 38.25 L25 50.75 L3.35 38.25 L3.35 13.25 Z" fill="none" stroke={color} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>
    </div>
  );
};

export default TechPattern;
