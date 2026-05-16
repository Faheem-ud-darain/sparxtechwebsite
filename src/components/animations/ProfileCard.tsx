import React, { useRef } from 'react';

const Instagram = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface ProfileCardProps {
  avatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  instagramUrl?: string;
  linkedInUrl?: string;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  avatarUrl = '',
  name = '',
  title = '',
  status = '',
  instagramUrl = '',
  linkedInUrl = '',
  className = '',
}) => {
  const shellRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!shellRef.current) return;
    
    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    frameRef.current = requestAnimationFrame(() => {
      if (!shellRef.current) return;
      const { left, top, width, height } = shellRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      const rotateX = (y - 0.5) * -15; 
      const rotateY = (x - 0.5) * 15;
      
      // Remove transition class for immediate response
      shellRef.current.style.transition = 'none';
      shellRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  };

  const handleMouseLeave = () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    if (!shellRef.current) return;
    
    // Add transition back for smooth reset
    shellRef.current.style.transition = 'transform 0.5s ease-out';
    shellRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div 
      className={`relative w-full h-full ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div 
        ref={shellRef}
        className="relative w-full h-full"
        style={{ 
          transformStyle: 'preserve-3d',
          willChange: 'transform'
        }}
      >
        {/* 1. Background Image - Contained and rounded here */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[2.5rem] border border-white/5">
          <img
            src={avatarUrl}
            alt={name}
            width={400}
            height={500}
            decoding="async"
            className="w-full h-full object-cover object-top opacity-100"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </div>

        {/* 2. Top Content: Name & Title - Hidden on mobile, visible on desktop */}
        <div className="hidden md:block absolute top-10 left-0 w-full text-center z-[25] pointer-events-none px-6" style={{ transform: 'translateZ(30px)' }}>
          <h3 className="text-3xl md:text-4xl font-black text-white mb-1 drop-shadow-2xl tracking-tighter" style={{ fontFamily: "'Inter', sans-serif" }}>
            {name}
          </h3>
          <p className="text-[9px] md:text-[10px] font-bold text-gray-400 tracking-[0.4em] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
            {title}
          </p>
        </div>

        {/* 3. Bottom Pill - FIXED Positioning at bottom center */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center z-[30]" style={{ transform: 'translateZ(50px)' }}>
          <div className="w-[90%] bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 md:p-3 flex items-center justify-between shadow-2xl">
            {/* User Info */}
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-white/20 flex-shrink-0 bg-gray-900">
                <img src={avatarUrl} alt="" width={40} height={40} decoding="async" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] md:text-[13px] font-bold text-white leading-none mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {name}
                </span>
                <span className="text-[8px] md:text-[9px] font-black text-green-400 tracking-widest uppercase flex items-center gap-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-green-500 animate-pulse" />
                  {status || 'Active'}
                </span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-1.5 md:gap-2">
              {instagramUrl && (
                <a 
                  href={instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 md:p-2.5 rounded-xl bg-white/5 hover:bg-green-500/20 border border-white/10 transition-all text-white group/icon"
                >
                  <Instagram className="w-3 h-3 md:w-3.5 md:h-3.5 transition-transform group-hover/icon:scale-110" />
                </a>
              )}
              {linkedInUrl && (
                <a 
                  href={linkedInUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 md:p-2.5 rounded-xl bg-white/5 hover:bg-green-500/20 border border-white/10 transition-all text-white group/icon"
                >
                  <Linkedin className="w-3 h-3 md:w-3.5 md:h-3.5 transition-transform group-hover/icon:scale-110" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProfileCard);
