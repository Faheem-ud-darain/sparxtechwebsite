import React from 'react';
import { motion } from 'framer-motion';

export const LiquidBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black z-0 pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black" />
      
      {/* Animated blurry orbs */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-green-500/10 blur-[120px]"
        animate={{
          x: ['0%', '10%', '-5%', '0%'],
          y: ['0%', '-10%', '10%', '0%'],
          scale: [1, 1.1, 0.9, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <motion.div
        className="absolute bottom-[-10%] right-[-20%] w-[70%] h-[70%] rounded-full bg-blue-600/10 blur-[150px]"
        animate={{
          x: ['0%', '-15%', '5%', '0%'],
          y: ['0%', '15%', '-5%', '0%'],
          scale: [1, 0.8, 1.2, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      
      <motion.div
        className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-purple-500/5 blur-[100px]"
        animate={{
          x: ['0%', '20%', '-20%', '0%'],
          y: ['0%', '-20%', '20%', '0%'],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />

      {/* Grid overlay for high-tech feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
};
