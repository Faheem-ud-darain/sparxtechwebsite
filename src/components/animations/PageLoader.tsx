import React from 'react';
import { motion } from 'framer-motion';

const PATH_MESSAGES: Record<string, string> = {
  '/': 'Returning to Base',
  '/about': 'Diving into our Story',
  '/services': 'Our Expertise',
  '/portfolio': 'Witnessing Excellence',
  '/contact': 'Starting a Conversation',
  '/case-study': 'Deconstructing the Process'
};

const PageLoader = ({ pathname = '/' }: { pathname?: string }) => {
  const message = PATH_MESSAGES[pathname] || 'Initializing';

  return (
    <>
      {/* Top Panel */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: ["-100%", "0%", "0%", "-100%"] }}
        transition={{ 
          duration: 2.0, 
          times: [0, 0.35, 0.75, 1],
          ease: [0.76, 0, 0.24, 1] 
        }}
        className="fixed top-0 left-0 right-0 h-1/2 z-[200] bg-[#030303] pointer-events-none border-b border-white/[0.05]"
      />
      
      {/* Bottom Panel */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: ["100%", "0%", "0%", "100%"] }}
        transition={{ 
          duration: 2.0, 
          times: [0, 0.35, 0.75, 1],
          ease: [0.76, 0, 0.24, 1] 
        }}
        className="fixed bottom-0 left-0 right-0 h-1/2 z-[200] bg-[#030303] pointer-events-none border-t border-white/[0.05]"
      />

      {/* Center Branding */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0, 1, 1, 0],
          scale: [0.8, 1, 1, 1.1],
        }}
        transition={{ 
          duration: 2.0, 
          times: [0, 0.35, 0.75, 1],
          ease: "easeInOut"
        }}
        className="fixed inset-0 z-[210] flex flex-col items-center justify-center pointer-events-none"
      >
        {/* Animated Background Lines */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
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
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: ["100%", "0%", "0%", "-100%"] }}
            transition={{ duration: 2.0, times: [0, 0.35, 0.75, 1] }}
            className="text-white font-bold tracking-[0.4em] text-[10px] sm:text-xs uppercase whitespace-nowrap"
          >
            SPARX Studioz & Technologies
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              y: [10, 0, 0, -10]
            }}
            transition={{ duration: 2.0, times: [0, 0.35, 0.75, 1] }}
            className="text-green-500/60 font-mono text-[9px] uppercase tracking-[0.2em]"
          >
            {message}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default PageLoader;
