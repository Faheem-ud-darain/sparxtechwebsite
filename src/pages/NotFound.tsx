import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { AnimatedContent } from '@/components/animations/AnimatedContent';

const NotFound = () => {
  return (
    <div className="relative min-h-screen bg-[#030303] flex items-center justify-center overflow-hidden px-4">
      <SEO title="404 - Page Not Found" description="The page you are looking for does not exist." />
      
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      <div className="relative z-10 text-center">
        <AnimatedContent direction="up">
          <motion.h1 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[12rem] md:text-[18rem] font-bold text-white/5 leading-none select-none"
          >
            404
          </motion.h1>
        </AnimatedContent>

        <div className="mt-[-4rem] md:mt-[-6rem]">
          <AnimatedContent direction="up" delay={0.2}>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Lost in <span className="text-green-500">Space?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-md mx-auto mb-10 leading-relaxed">
              The page you're looking for has vanished into the digital void. Let's get you back on track.
            </p>
          </AnimatedContent>

          <AnimatedContent direction="up" delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-green-500 text-black px-8 py-4 rounded-full font-bold hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all hover:scale-105 active:scale-95"
              >
                Return Home
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
              >
                View Portfolio
              </Link>
            </div>
          </AnimatedContent>
        </div>
      </div>

      {/* Floating particles or decorative elements */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[15%] hidden md:block"
      >
        <div className="w-16 h-16 rounded-2xl border border-green-500/20 bg-green-500/5 rotate-12 backdrop-blur-sm" />
      </motion.div>
      
      <motion.div 
        animate={{ 
          y: [0, 30, 0],
          rotate: [0, -15, 0]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] left-[15%] hidden md:block"
      >
        <div className="w-24 h-24 rounded-full border border-blue-500/20 bg-blue-500/5 -rotate-12 backdrop-blur-sm" />
      </motion.div>
    </div>
  );
};

export default NotFound;
