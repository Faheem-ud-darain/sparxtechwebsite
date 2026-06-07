import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NewspaiPreview from '@/assets/newspai_preview.png';
import HairsaloonPreview from '@/assets/hairsaloon_preview.png';
import ObsidianPreview from '@/assets/house3d_preview.webp';
import NewspaiEditor from '@/assets/newspai_editor.png';
import NewspaiLogin from '@/assets/newspai_login.png';

interface ProjectSite {
  id: string;
  title: string;
  tag: string;
  description: string;
  tech: string[];
  url: string;
  previewImg: string;
}

export default function LiveSiteShowcase() {
  const [activeSite, setActiveSite] = useState<'newspai' | 'hairsaloon' | 'obsidian'>('newspai');
  const [activeDevice, setActiveDevice] = useState<'macbook' | 'ipad' | 'iphone'>('macbook');
  const [sessionStarted, setSessionStarted] = useState<Record<'newspai' | 'hairsaloon' | 'obsidian', boolean>>({
    newspai: false,
    hairsaloon: false,
    obsidian: false
  });
  const [iframeLoading, setIframeLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'live' | 'walkthrough' | 'credentials'>('live');
  const [copiedField, setCopiedField] = useState<'email' | 'password' | null>(null);

  // For the AI summarizer simulation
  const [summaryInput, setSummaryInput] = useState('');
  const [summarizing, setSummarizing] = useState(false);
  const [summaryResult, setSummaryResult] = useState('');

  const sites: Record<'newspai' | 'hairsaloon' | 'obsidian', ProjectSite> = {
    newspai: {
      id: 'newspai',
      title: 'NewsPAI - Automated News & Formatting Portal',
      tag: 'AI SaaS / Web App',
      description: 'An innovative application that automates editorial formatting. Input copy and images, choose predefined templates, and let our multi-column CSS grids flow your newspaper layouts dynamically.',
      tech: ['Next.js', 'React', 'Generative AI', 'Node.js', 'TailwindCSS'],
      url: 'https://newspai-kohl.vercel.app/?demo=true',
      previewImg: NewspaiPreview
    },
    hairsaloon: {
      id: 'hairsaloon',
      title: 'Cut & Shave - Luxury Hair Salon',
      tag: 'Creative Marketing Page',
      description: 'A responsive corporate landing page for a luxury barber shop, featuring custom parallax, scheduling interfaces, and slick branding elements.',
      tech: ['HTML5', 'Vanilla CSS', 'JavaScript', 'Parallax Scrolling'],
      url: 'https://faheem-ud-darain.github.io/Hairsaloon-sample-web/?preview=true',
      previewImg: HairsaloonPreview
    },
    obsidian: {
      id: 'obsidian',
      title: 'The Obsidian - Luxury 3D Apartment Walkthrough',
      tag: '3D Web Experience',
      description: 'An immersive digital estate showcase allowing users to explore high-end apartment interiors in a 3D environment with seamless viewport scroll-framed transitions.',
      tech: ['Next.js', 'React', 'Three.js', 'WebGL', 'GSAP ScrollTrigger'],
      url: 'https://3-d-house-web-demo.vercel.app/',
      previewImg: ObsidianPreview
    }
  };

  const currentSite = sites[activeSite];
  const isStarted = sessionStarted[activeSite];

  const containerRef = useRef<HTMLDivElement>(null);
  
  const getDefaultWidth = () => {
    if (activeDevice === 'macbook') return 580;
    if (activeDevice === 'ipad') return 400;
    return 250;
  };

  const [containerWidth, setContainerWidth] = useState(getDefaultWidth());

  useEffect(() => {
    setContainerWidth(getDefaultWidth());
    
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const newWidth = entry.contentRect.width;
        if (newWidth > 0) {
          setContainerWidth(prev => prev === newWidth ? prev : newWidth);
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [activeDevice, isStarted]);

  // Reset tab and loader states when changing sites
  useEffect(() => {
    setIframeLoading(true);
    setActiveTab('live');
    if (activeSite === 'newspai') {
      setActiveDevice('macbook');
    }
  }, [activeSite]);

  const startSession = () => {
    setSessionStarted(prev => ({ ...prev, [activeSite]: true }));
    setIframeLoading(true);
  };

  const resetSession = () => {
    setSessionStarted(prev => ({ ...prev, [activeSite]: false }));
  };

  const copyToClipboard = (text: string, field: 'email' | 'password') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Run mock summarizer action
  const handleSummarize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!summaryInput.trim()) return;

    setSummarizing(true);
    setSummaryResult('');

    setTimeout(() => {
      setSummarizing(false);
      setSummaryResult(
        `[AI Analysis Complete] NewsPAI Aggregator has successfully parsed the article. \n\nKey Insights:\n1. The core focus centers on rapid digital transformation across client verticals.\n2. Visual interface optimization yields 40%+ conversion improvement.\n3. Modern frontend scaling methodologies drastically cut CPL overhead.`
      );
    }, 2000);
  };

  return (
    <section className="relative py-24 sm:py-32 bg-[#030303] overflow-hidden border-t border-white/[0.04]">
      {/* Background Glow */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/[0.02] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-green-500/[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold tracking-widest uppercase self-start mb-4 inline-block">
              Interactive Demos
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Live Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Sandboxes</span>
            </h2>
            <p className="text-gray-400 mt-2 max-w-xl leading-relaxed">
              Interact directly with our deployed client websites. Switch devices, test responsiveness, and explore app interfaces live.
            </p>
          </div>

          {/* Site Selector Buttons */}
          <div className="flex flex-wrap gap-2 bg-white/[0.02] border border-white/[0.06] p-1.5 rounded-2xl self-start md:self-auto">
            <button
              onClick={() => setActiveSite('newspai')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold font-mono tracking-wider uppercase transition-all duration-300 ${
                activeSite === 'newspai'
                  ? 'bg-blue-500/10 border border-blue-500/25 text-blue-400 shadow-lg'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              NewsPAI (SaaS)
            </button>
            <button
              onClick={() => setActiveSite('hairsaloon')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold font-mono tracking-wider uppercase transition-all duration-300 ${
                activeSite === 'hairsaloon'
                  ? 'bg-green-500/10 border border-green-500/25 text-green-400 shadow-lg'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Cut & Shave (Salon)
            </button>
            <button
              onClick={() => setActiveSite('obsidian')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold font-mono tracking-wider uppercase transition-all duration-300 ${
                activeSite === 'obsidian'
                  ? 'bg-yellow-500/10 border border-yellow-500/25 text-yellow-500 shadow-lg'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              The Obsidian (3D)
            </button>
          </div>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left panel: Info & Controls */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold font-mono text-green-500/80 uppercase tracking-widest">{currentSite.tag}</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">{currentSite.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{currentSite.description}</p>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {currentSite.tech.map((t, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.05] text-[10px] font-mono text-gray-400">
                    {t}
                  </span>
                ))}
              </div>

              {/* NewsPAI Custom Controls (Tabs) */}
              {activeSite === 'newspai' && (
                <div className="space-y-3 pt-4 border-t border-white/[0.05]">
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold font-mono block">Choose Viewer Perspective:</span>
                  <div className="grid grid-cols-3 gap-1 bg-white/[0.01] border border-white/[0.04] p-1 rounded-xl">
                    <button
                      onClick={() => setActiveTab('live')}
                      className={`py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${
                        activeTab === 'live' ? 'bg-white/[0.05] text-white' : 'text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      Landing Page
                    </button>
                    <button
                      onClick={() => setActiveTab('walkthrough')}
                      className={`py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${
                        activeTab === 'walkthrough' ? 'bg-white/[0.05] text-white' : 'text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      AI Dashboard
                    </button>
                    <button
                      onClick={() => setActiveTab('credentials')}
                      className={`py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${
                        activeTab === 'credentials' ? 'bg-white/[0.05] text-white' : 'text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      Demo Account
                    </button>
                  </div>
                </div>
              )}

              {/* Hair Salon Blur Warning */}
              {activeSite === 'hairsaloon' && (
                <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-xs text-amber-400 leading-relaxed font-mono flex items-start gap-2.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="flex-shrink-0 mt-0.5"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                  <span>
                    <strong>Demo Privacy Active:</strong> Client telephone numbers and emails are automatically blurred in the sandbox via the `?preview=true` parameter.
                  </span>
                </div>
              )}

              {/* Obsidian 3D Information */}
              {activeSite === 'obsidian' && (
                <div className="p-4 rounded-2xl bg-yellow-500/5 border border-yellow-500/10 text-xs text-yellow-500/90 leading-relaxed font-mono flex items-start gap-2.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="flex-shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  <span>
                    <strong>3D Scroll Walkthrough:</strong> Scroll the viewport inside the sandbox frame to explore the luxury apartment interior in full 3D space.
                  </span>
                </div>
              )}
            </div>

            {/* Device Layout Toggles */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md space-y-3">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">Responsive Layout:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveDevice('macbook')}
                  className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase font-mono transition-all flex items-center justify-center gap-1.5 ${
                    activeDevice === 'macbook' ? 'bg-white/10 text-white' : 'bg-white/[0.02] text-gray-500 hover:bg-white/[0.04] hover:text-gray-300'
                  }`}
                >
                  🖥️ Laptop
                </button>
                <button
                  onClick={() => setActiveDevice('ipad')}
                  disabled={activeSite === 'newspai'}
                  className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase font-mono transition-all flex items-center justify-center gap-1.5 ${
                    activeSite === 'newspai' 
                      ? 'opacity-30 cursor-not-allowed text-gray-600 bg-white/[0.01]' 
                      : activeDevice === 'ipad' ? 'bg-white/10 text-white' : 'bg-white/[0.02] text-gray-500 hover:bg-white/[0.04] hover:text-gray-300'
                  }`}
                  title={activeSite === 'newspai' ? 'NewsPAI is Desktop Only' : undefined}
                >
                  📟 Tablet {activeSite === 'newspai' && '🚫'}
                </button>
                <button
                  onClick={() => setActiveDevice('iphone')}
                  disabled={activeSite === 'newspai'}
                  className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase font-mono transition-all flex items-center justify-center gap-1.5 ${
                    activeSite === 'newspai' 
                      ? 'opacity-30 cursor-not-allowed text-gray-600 bg-white/[0.01]' 
                      : activeDevice === 'iphone' ? 'bg-white/10 text-white' : 'bg-white/[0.02] text-gray-500 hover:bg-white/[0.04] hover:text-gray-300'
                  }`}
                  title={activeSite === 'newspai' ? 'NewsPAI is Desktop Only' : undefined}
                >
                  📱 Phone {activeSite === 'newspai' && '🚫'}
                </button>
              </div>
            </div>
          </div>

          {/* Right panel: Live Screen Mockup with emerging 3D infinity effect */}
          <div className="lg:col-span-8 flex flex-col justify-center items-center relative">
            
            {/* Screen Mockup Container */}
            <div className="w-full relative pt-12 pb-32 px-4 flex justify-center items-center overflow-hidden min-h-[580px]">
              
              {/* Mockup Frame Wrapper with infinite perspective animations */}
              <motion.div
                key={`${activeSite}-${activeDevice}`}
                animate={{
                  y: (!isStarted && activeTab === 'live') ? 95 : 0,
                  scale: (!isStarted && activeTab === 'live') ? 0.94 : 1,
                  rotateX: (!isStarted && activeTab === 'live') ? 8 : 0,
                }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 75, 
                  damping: 18 
                }}
                className="w-full flex justify-center items-center origin-bottom"
                style={{ 
                  perspective: 1200,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* MacBook Pro frame */}
                {activeDevice === 'macbook' && (
                  <div className="w-full max-w-[620px] transition-all duration-500">
                    {/* Laptop screen with Space Gray metallic gradient border */}
                    <div className="relative aspect-[16/10] p-[10px] bg-gradient-to-b from-[#3a3b45] via-[#2a2a30] to-[#1b1c22] rounded-t-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden">
                      {/* Inner Screen Border Shadow overlay */}
                      <div className="absolute inset-[10px] border border-black/40 rounded-t-lg pointer-events-none z-20" />
                      {/* Top Notch Camera */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-gradient-to-b from-[#222328] to-[#1b1c22] rounded-b-lg z-30 flex items-center justify-center border-x border-b border-white/5">
                        <div className="w-2 h-2 bg-[#050505] rounded-full border border-blue-500/20" />
                      </div>
                      {/* Screen View */}
                      <div ref={containerRef} className="w-full h-full relative rounded-t-lg overflow-hidden bg-[#0c0c0f]">
                        <ScreenViewContent />
                      </div>
                    </div>
                    {/* Keyboard base */}
                    <div className="w-[110%] h-3 bg-gradient-to-b from-[#3a3b45] via-[#1b1c22] to-[#0d0e11] rounded-b-2xl mx-auto border-t border-white/10 relative -left-[5%] shadow-2xl flex justify-center">
                      <div className="w-16 h-1 bg-black/40 rounded-b-sm" />
                    </div>
                  </div>
                )}

                {/* iPad Pro frame */}
                {activeDevice === 'ipad' && (
                  <div className="w-full max-w-[440px] transition-all duration-500">
                    {/* Tablet screen with Space Gray metallic gradient border */}
                    <div className="relative aspect-[4/3] p-[14px] bg-gradient-to-tr from-[#1f2026] via-[#3c3d47] to-[#111215] rounded-[2rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden">
                      {/* Inner Screen Border Shadow */}
                      <div className="absolute inset-[14px] border border-black/40 rounded-[1.3rem] pointer-events-none z-20" />
                      {/* Screen View */}
                      <div ref={containerRef} className="w-full h-full relative rounded-[1.2rem] overflow-hidden bg-[#0c0c0f]">
                        <ScreenViewContent />
                      </div>
                      {/* Home bar indicator */}
                      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/30 rounded-full z-20" />
                    </div>
                  </div>
                )}

                {/* iPhone 17 Pro frame */}
                {activeDevice === 'iphone' && (
                  <div className="w-full max-w-[270px] transition-all duration-500">
                    {/* Phone screen with Space Gray metallic gradient border */}
                    <div className="relative aspect-[9/19] p-[9px] bg-gradient-to-tr from-[#1b1c22] via-[#464856] to-[#0d0e11] rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9)] overflow-hidden">
                      {/* Inner border glass highlights */}
                      <div className="absolute inset-[9px] border border-black/40 rounded-[2.05rem] pointer-events-none z-20" />
                      {/* Dynamic Island Notch */}
                      <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#0a0a0f] rounded-full z-30 flex items-center justify-center border border-white/5">
                        <div className="w-2 h-2 bg-[#020204] rounded-full absolute right-3" />
                      </div>
                      {/* Screen View */}
                      <div ref={containerRef} className="w-full h-full relative rounded-[1.95rem] overflow-hidden bg-[#0c0c0f]">
                        <ScreenViewContent />
                      </div>
                      {/* Bottom home bar */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/30 rounded-full z-20" />
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Infinite Perspective Fade & Blur bottom overlay */}
              <AnimatePresence>
                {!isStarted && activeTab === 'live' && (
                  <div className="absolute inset-0 z-20 flex flex-col justify-end items-center pointer-events-none pb-8 sm:pb-12">
                    {/* Dark gradient blur covering bottom of device with gradual gradient backdrop-blur mask */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent pointer-events-none"
                      style={{
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        maskImage: 'linear-gradient(to top, black 10%, rgba(0, 0, 0, 0.6) 45%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to top, black 10%, rgba(0, 0, 0, 0.6) 45%, transparent 100%)',
                      }}
                    />
                    
                    {/* Action Trigger Card */}
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 30, opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                      className="relative z-30 p-6 rounded-2xl bg-[#09090b]/80 border border-white/[0.08] backdrop-blur-lg text-center space-y-4 max-w-sm mx-auto shadow-2xl pointer-events-auto"
                    >
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-mono text-green-400 uppercase tracking-widest font-extrabold">Live Sandbox</span>
                        <h4 className="text-sm font-bold text-white leading-tight">Interact with Live Project</h4>
                        <p className="text-[10px] text-gray-400 leading-relaxed">
                          Click below to initialize a secure sandbox session and load the active website live.
                        </p>
                      </div>
                      
                      <button
                        onClick={startSession}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-400 hover:to-emerald-300 text-black text-xs font-black tracking-wide uppercase transition-all duration-300 transform active:scale-95 shadow-[0_4px_20px_rgba(16,185,129,0.25)] cursor-pointer"
                      >
                        Start Session ⚡
                      </button>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              {/* Floating Close Session Button */}
              {isStarted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-6 right-6 z-30"
                >
                  <button
                    onClick={resetSession}
                    className="px-4 py-2 rounded-xl bg-[#09090b]/90 hover:bg-[#121217]/90 border border-red-500/20 hover:border-red-500/40 text-[10px] font-bold font-mono text-red-400 hover:text-red-300 transition-all flex items-center gap-1.5 shadow-lg backdrop-blur-md cursor-pointer"
                    title="Terminate live sandbox session"
                  >
                    <span>🔌</span> Close Sandbox Session
                  </button>
                </motion.div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );

  // Sub-component rendering what is on the device screen
  function ScreenViewContent() {
    const isStarted = sessionStarted[activeSite];

    // If it's NewsPAI and they chose Credentials tab
    if (activeSite === 'newspai' && activeTab === 'credentials') {
      return (
        <div className="w-full h-full bg-[#07070a] p-6 sm:p-8 flex flex-col justify-between font-mono text-xs text-gray-300">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-6">
              <span className="text-[10px] font-bold text-blue-400">🔑 DEMO ACCOUNT ACCESS</span>
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            </div>
            
            <p className="text-[11px] text-gray-400 leading-relaxed mb-6">
              Use these credentials to log in to the live NewsPAI app. These credentials will grant you read-only dashboard permissions.
            </p>

            <div className="space-y-4">
              <div>
                <span className="text-[9px] text-gray-600 block mb-1">EMAIL ADDRESS</span>
                <div className="flex items-center justify-between bg-white/[0.02] border border-white/[0.05] p-2.5 rounded-xl">
                  <span className="text-white select-all">demo@sparxtechwebsite.com</span>
                  <button
                    onClick={() => copyToClipboard('demo@sparxtechwebsite.com', 'email')}
                    className="px-2.5 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] text-[10px] text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedField === 'email' ? 'Copied ✓' : 'Copy'}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[9px] text-gray-600 block mb-1">PASSWORD</span>
                <div className="flex items-center justify-between bg-white/[0.02] border border-white/[0.05] p-2.5 rounded-xl">
                  <span className="text-white select-all">demosst1</span>
                  <button
                    onClick={() => copyToClipboard('demosst1', 'password')}
                    className="px-2.5 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] text-[10px] text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedField === 'password' ? 'Copied ✓' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl text-[10px] text-blue-400 leading-normal">
              💡 Switch back to the **Landing Page** tab, launch the live session, and copy-paste these credentials to explore the app.
            </div>
            
            <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl text-[9px] text-amber-400 leading-normal">
              🔒 <strong>Vercel Security Refused to Connect?</strong> If the live sandbox frame is blocked, please configure your NewsPAI next.config.js headers to allow framing from our domain. (See instructions in chat)
            </div>
          </div>
        </div>
      );
    }

    // If it's NewsPAI and they chose Walkthrough tab (Actual app dashboard preview)
    if (activeSite === 'newspai' && activeTab === 'walkthrough') {
      return (
        <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
          {/* Editor screenshot */}
          <img
            src={NewspaiEditor}
            alt="NewsPAI Editor Dashboard"
            className="w-full h-full object-cover opacity-95"
          />
          {/* Subtle dark layout tint */}
          <div className="absolute inset-0 bg-black/5" />
          {/* Walkthrough Tag Overlay */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded bg-black/60 border border-white/10 text-[9px] font-mono text-gray-300 backdrop-blur-md uppercase tracking-wider">
            Editor Canvas Preview
          </div>
        </div>
      );
    }

    // Inactive (Placeholder State showing clean, full screenshot)
    if (!isStarted) {
      return (
        <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
          {/* Background image mockup */}
          <img
            src={currentSite.previewImg}
            alt={`${currentSite.title} Mockup Preview`}
            className="w-full h-full object-cover opacity-80 transition-transform duration-1000"
          />
          {/* Subtle dark layout tint */}
          <div className="absolute inset-0 bg-black/10" />
        </div>
      );
    }

    // Active (Live Iframe Session)
    let virtualWidth = 1280;
    let virtualHeight = 800;
    
    if (activeDevice === 'ipad') {
      virtualWidth = 1024;
      virtualHeight = 768;
    } else if (activeDevice === 'iphone') {
      virtualWidth = 390;
      virtualHeight = 824;
    }

    const scale = containerWidth / virtualWidth;

    return (
      <div className="w-full h-full relative bg-[#050507] overflow-hidden">
        {/* Loading Spinner */}
        {iframeLoading && (
          <div className="absolute inset-0 bg-[#0c0c0f] z-20 flex flex-col items-center justify-center space-y-4 font-mono text-xs text-gray-500">
            <svg className="animate-spin h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="animate-pulse">Loading live sandbox environment...</span>
          </div>
        )}

        {/* Live Iframe Wrapper to scale to virtual dimensions */}
        <div 
          style={{
            width: `${virtualWidth}px`,
            height: `${virtualHeight}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <iframe
            src={currentSite.url}
            className="w-full h-full border-0 bg-[#0c0c0f]"
            onLoad={() => setIframeLoading(false)}
            title={`Live Interactive Sandbox: ${currentSite.title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </div>
      </div>
    );
  }
}
