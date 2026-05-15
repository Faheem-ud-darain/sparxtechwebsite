import React from 'react';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';

interface AnimatedIconProps {
  name: string;
  className?: string;
  size?: number;
  color?: string;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ name, className, size = 24, color = 'currentColor' }) => {
  // Find the icon in lucide-react
  // Many names might be passed as "Rocket" or "RocketIcon"
  const iconKey = name.endsWith('Icon') ? name : `${name}Icon`;
  const IconComponent = (LucideIcons as any)[name] || (LucideIcons as any)[iconKey] || LucideIcons.HelpCircle;

  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
    >
      <IconComponent size={size} color={color} strokeWidth={1.5} />
      
      {/* Subtle background glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-green-500/20 blur-xl rounded-full -z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1.2 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default AnimatedIcon;
