import React from 'react';
import { motion } from 'framer-motion';

const FuturisticHUD: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Corner Brackets */}
      <div className="absolute top-16 left-16 w-14 h-14 border-t border-l border-green-500/30 rounded-tl-xl" />
      <div className="absolute top-16 right-16 w-14 h-14 border-t border-r border-green-500/30 rounded-tr-xl" />
      <div className="absolute bottom-16 left-16 w-14 h-14 border-b border-l border-green-500/30 rounded-bl-xl" />
      <div className="absolute bottom-16 right-16 w-14 h-14 border-b border-r border-green-500/30 rounded-br-xl" />

      {/* Grid Reference Points */}
      <div className="absolute top-1/4 left-12 text-[8px] font-mono text-green-500/20 rotate-90 tracking-widest">LAT: 34.0522</div>
      <div className="absolute top-3/4 left-12 text-[8px] font-mono text-green-500/20 rotate-90 tracking-widest">LNG: -118.2437</div>
      <div className="absolute top-1/4 right-12 text-[8px] font-mono text-green-500/20 -rotate-90 tracking-widest">SYS: ACTIVE</div>
      <div className="absolute top-3/4 right-12 text-[8px] font-mono text-green-500/20 -rotate-90 tracking-widest">PWR: 100%</div>

      {/* Rotating HUD Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-dashed border-green-500 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[10%] border border-dotted border-emerald-500 rounded-full"
        />
      </div>

      {/* Scanning Line */}
      <motion.div
        animate={{ y: ["0%", "100%", "0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-green-500/10 to-transparent z-[1]"
      />

      {/* Side Decorative Numbers */}
      <div className="hidden md:flex absolute left-10 top-1/2 -translate-y-1/2 flex-col gap-4 text-[10px] font-mono text-green-500/10">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-8 h-[1px] bg-green-500/20" />
            0{i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FuturisticHUD;
