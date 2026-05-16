import React from 'react';
import { motion } from 'framer-motion';
import TiltedCard from './TiltedCard';

const HeroDashboard: React.FC = () => {
  return (
    <div className="relative w-full max-w-[450px] aspect-square flex items-center justify-center p-4">
      <TiltedCard tiltMax={10} glareEnable={true} className="w-full h-full">
        <div className="w-full h-full bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[2rem] p-8 flex flex-col gap-6 relative overflow-hidden shadow-2xl">
          {/* Animated Background Pulse */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -right-20 w-60 h-60 bg-green-500 rounded-full blur-[60px] pointer-events-none"
          />

          {/* Top Section: Status */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest text-green-500/60 font-mono">System Core</span>
              <h4 className="text-xl font-bold text-white tracking-tight">Active Matrix</h4>
            </div>
            <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] text-green-500 font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              LIVE
            </div>
          </div>

          {/* Middle Section: Visualization */}
          <div className="flex-1 flex items-center justify-center relative">
             <div className="w-full h-full border border-white/5 rounded-2xl bg-black/20 flex flex-col items-center justify-center gap-4 overflow-hidden">
                {/* Simulated Waveform */}
                <div className="flex items-end gap-1 h-12">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [10, Math.random() * 40 + 10, 10] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                      className="w-1.5 bg-green-500/40 rounded-t-sm"
                    />
                  ))}
                </div>
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Frequency Output</div>
             </div>
          </div>

          {/* Bottom Section: Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
              <span className="text-[9px] uppercase text-white/40 tracking-wider">Stability</span>
              <span className="text-lg font-bold text-white">99.9%</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
              <span className="text-[9px] uppercase text-white/40 tracking-wider">Uptime</span>
              <span className="text-lg font-bold text-white">2.4k h</span>
            </div>
          </div>

          {/* Decorative Corner Label */}
          <div className="absolute bottom-4 right-8 text-[8px] font-mono text-white/10 tracking-[0.5em] uppercase rotate-90 origin-right">
            SPX_UNIT_77
          </div>
        </div>
      </TiltedCard>
    </div>
  );
};

export default HeroDashboard;
