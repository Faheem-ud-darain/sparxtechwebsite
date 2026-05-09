import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Critical assets to preload for a smooth first impression
const CRITICAL_ASSETS = [
  '/assets/Sparx tech Agency Website.webp',
  '/assets/Kingdom Watch Company.png',
  '/assets/NMA Watch Guy.webp',
  '/assets/Albatross Edvisors.png',
  '/assets/Daehan Links.png'
];

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const totalAssets = CRITICAL_ASSETS.length;

    // Preload images
    const preloadImage = (src: string) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve; // Continue even if one fails
      });
    };

    const startLoading = async () => {
      // Minimum artificial progress for smoothness
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90 && !assetsLoaded) return 90; // Stall at 90% until assets are ready
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 50);

      // Real asset loading
      await Promise.all(CRITICAL_ASSETS.map(async (asset) => {
        await preloadImage(asset);
        loadedCount++;
        // If we want to sync progress more tightly:
        // setProgress(Math.floor((loadedCount / totalAssets) * 100));
      }));

      setAssetsLoaded(true);
      setProgress(100);
      
      setTimeout(() => setIsDone(true), 800);
    };

    startLoading();
  }, [assetsLoaded]);

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
            <motion.div 
              animate={{ x: [0, -2000] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex gap-20 items-center"
            >
              {[...Array(4)].map((_, i) => (
                <h2 key={i} className="text-[20vw] font-black leading-none tracking-tighter uppercase">
                  SPARX Studioz & Technologies
                </h2>
              ))}
            </motion.div>
          </div>

          {/* Cinematic Looping Lines */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              initial={{ x: "-100%", y: "25%", rotate: -15 }}
              animate={{ x: "200%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
              className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-green-500/50 to-transparent"
            />
            <motion.div
              initial={{ x: "200%", y: "60%", rotate: 15 }}
              animate={{ x: "-200%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 0.2 }}
              className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
            />
            <motion.div
              initial={{ x: "-100%", y: "85%", rotate: -5 }}
              animate={{ x: "200%" }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear", repeatDelay: 0.8 }}
              className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-green-400/50 to-transparent"
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
              <motion.div 
                animate={{ x: [0, -1000] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="flex whitespace-nowrap gap-20 items-center"
              >
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="text-sm font-bold text-white/40 tracking-[0.6em] uppercase flex items-center gap-20">
                    SPARX Studioz & Technologies
                    <span className="w-2 h-2 bg-green-500 rounded-full opacity-50" />
                  </span>
                ))}
              </motion.div>
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
