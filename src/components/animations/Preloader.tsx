import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import LogoImg from '@/assets/Full Logo Tranparent.png';

// Essential brand assets
const CRITICAL_ASSETS = [
  LogoImg
];

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    // Preload images helper
    const preloadImage = (src: string) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        if (img.complete) {
          resolve(true);
        } else {
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
        }
      });
    };

    const startLoading = async () => {
      // 1. Initial burst
      setProgress(15);
      
      // 2. Load critical assets
      const total = CRITICAL_ASSETS.length;
      let loaded = 0;
      
      await Promise.all(CRITICAL_ASSETS.map(async (asset) => {
        await preloadImage(asset);
        if (!isMounted) return;
        loaded++;
        setProgress(15 + (loaded / total) * 35); // Up to 50%
      }));

      // 3. Simulated final check
      await new Promise(r => setTimeout(r, 400));
      if (!isMounted) return;
      
      setProgress(100);
      
      setTimeout(() => {
        if (isMounted) setIsDone(true);
      }, 500);
    };

    // Fast fallback for mobile/poor connections
    const fallback = setTimeout(() => {
      if (isMounted) {
        setProgress(100);
        setTimeout(() => setIsDone(true), 400);
      }
    }, 5000);

    startLoading();
    
    return () => {
      isMounted = false;
      clearTimeout(fallback);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030303] overflow-hidden"
        >
          {/* Background Text Overlay — Cinematic Loop */}
          <div className="absolute inset-0 flex items-center overflow-hidden opacity-[0.02] select-none pointer-events-none whitespace-nowrap">
            <div className="flex gap-20 items-center animate-preloader-cinematic-bg">
              {[...Array(4)].map((_, i) => (
                <h2 key={i} className="text-[20vw] font-black leading-none tracking-tighter uppercase">
                  SPARX Studioz & Technologies
                </h2>
              ))}
            </div>
          </div>

          {/* Cinematic Looping Lines */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-green-500/50 to-transparent animate-line-right-fast"
              style={{ top: "25%" }}
            />
            <div
              className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent animate-line-left-medium"
              style={{ top: "60%" }}
            />
            <div
              className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-green-400/50 to-transparent animate-line-right-slow"
              style={{ top: "85%" }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center w-full">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 relative"
            >
              <div className="w-20 h-20 border border-green-500/10 border-t-green-500 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
              </div>
            </motion.div>

            {/* Looping Marquee Text */}
            <div className="w-full overflow-hidden mb-6 py-2 border-y border-white/[0.03] bg-white/[0.01]">
              <div className="flex whitespace-nowrap gap-20 items-center animate-preloader-marquee">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="text-sm font-bold text-white/40 tracking-[0.6em] uppercase flex items-center gap-20">
                    SPARX Studioz & Technologies
                    <span className="w-2 h-2 bg-green-500 rounded-full opacity-50" />
                  </span>
                ))}
              </div>
            </div>
            
            <div className="w-64 h-[1px] bg-white/5 relative overflow-hidden mt-2 shadow-[0_0_15px_rgba(255,255,255,0.02)]">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-green-500 shadow-[0_0_10px_#22c55e]"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <motion.div 
              className="mt-6 flex flex-col items-center gap-1"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-green-500 font-mono text-lg font-light tracking-tighter">
                {Math.round(progress)}%
              </span>
              <span className="text-[10px] text-gray-600 tracking-[0.3em] uppercase">
                {progress < 100 ? "Syncing Assets" : "System Primed"}
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
