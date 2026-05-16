import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Check, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Delay showing the banner for better UX
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
    // Optional: Clear any existing non-essential cookies here
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 left-6 right-6 z-[9999] md:left-auto md:max-w-md"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0A0A0A]/80 p-6 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-green-500/10 blur-3xl pointer-events-none" />
            
            <div className="relative flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 border border-green-500/20">
                    <Cookie className="h-5 w-5 text-green-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Cookie Settings</h3>
                </div>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="rounded-full p-1 text-gray-500 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3">
                <p className="text-sm leading-relaxed text-gray-400">
                  We use cookies to enhance your experience, analyze site traffic, and provide personalized blog recommendations based on your interests.
                </p>
                <Link 
                  to="/privacy-policy" 
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-green-500 hover:text-green-400 transition-colors uppercase tracking-widest"
                >
                  <ShieldCheck className="h-3 w-3" />
                  Privacy Policy
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <button
                  onClick={handleAccept}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-green-500 py-3.5 text-sm font-bold text-black transition-all hover:bg-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] active:scale-[0.98]"
                >
                  <Check className="h-4 w-4" />
                  Accept All
                </button>
                <button
                  onClick={handleDecline}
                  className="flex flex-1 items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10 active:scale-[0.98]"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
