import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [percent, setPercent] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsDone(true), 500);
          setTimeout(onComplete, 1500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#030303] flex flex-col items-center justify-center overflow-hidden"
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
        >
          {/* Animated Background Text */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
          >
            <span className="text-[25vw] font-black tracking-tighter text-white">SPARX</span>
          </motion.div>

          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-[0.2em] uppercase">
                SPARX<span className="text-green-500">.</span>
              </h1>
            </motion.div>

            <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden mb-4">
              <motion.div 
                className="h-full bg-green-500"
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <div className="text-mono text-gray-500 text-xs tracking-[0.3em] uppercase">
              Initializing Experience {percent}%
            </div>
          </div>

          {/* Animated lines */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-green-500/10"
                style={{
                  width: '1px',
                  height: '100%',
                  left: `${20 * i + 10}%`,
                  top: 0
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1, delay: i * 0.1, ease: "easeInOut" }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
