import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const PATH_MESSAGES: Record<string, string> = {
  '/': 'Returning to Base',
  '/about': 'Diving into our Story',
  '/services': 'Our Expertise',
  '/portfolio': 'Witnessing Excellence',
  '/contact': 'Starting a Conversation',
  '/case-study': 'Deconstructing the Process',
  '/team': 'the brains behind brawls'
};

const PageLoader = ({ pathname = '/' }: { pathname?: string }) => {
  const message = PATH_MESSAGES[pathname] || 'Initializing';
  const [canExit, setCanExit] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const checkReady = async () => {
      // 1. Minimum cinematic display time
      const minTime = new Promise<void>(resolve => setTimeout(() => resolve(), 800));
      
      // 2. Safety timeout (Max 3.5 seconds total)
      const safetyTimeout = new Promise<void>(resolve => setTimeout(() => resolve(), 3500));
      
      // 3. Image Loading Logic
      const imagesReady = (async () => {
        try {
          // Wait longer for React to render lazy components
          await new Promise<void>(resolve => setTimeout(() => resolve(), 300));
          
          const images = Array.from(document.querySelectorAll('img'));
          if (images.length === 0) return;

          await Promise.all(images.map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise<void>(r => {
              // Add a per-image timeout to be extra safe
              const timer = setTimeout(() => r(), 2000);
              img.onload = () => { clearTimeout(timer); r(); };
              img.onerror = () => { clearTimeout(timer); r(); };
            });
          }));
        } catch (err) {
          console.warn('PageLoader image check failed:', err);
        }
      })();

      // Wait for either everything to be ready OR the safety timeout
      await Promise.race([
        Promise.all([minTime, imagesReady]),
        safetyTimeout
      ]);

      if (isMounted) setCanExit(true);
    };

    checkReady();
    return () => { isMounted = false; };
  }, [pathname]);

  return (
    <AnimatePresence>
      {!canExit && (
        <motion.div
          key="page-loader-wrapper"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-[200] pointer-events-none"
        >
          {/* Top Panel */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 left-0 right-0 h-1/2 bg-[#030303] border-b border-white/[0.05]"
          />
          
          {/* Bottom Panel */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed bottom-0 left-0 right-0 h-1/2 bg-[#030303] border-t border-white/[0.05]"
          />

          {/* Center Branding */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[210] flex flex-col items-center justify-center"
          >
            {/* Animated Background Lines */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
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

            <div className="relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 rounded-full border border-green-500/10 border-t-green-500"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-2 overflow-hidden text-center">
              <div className="text-white font-bold tracking-[0.4em] text-[10px] sm:text-xs uppercase whitespace-nowrap">
                SPARX Studioz & Technologies
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-500/60 font-mono text-[9px] uppercase tracking-[0.2em]"
              >
                {message}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
