import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/assets/Full Logo Tranparent.webp';
import GooeyNav from './GooeyNav';
import StaggeredMenu from './StaggeredMenu';
import Dock from './Dock';
import { SOCIAL_LINKS } from '@/data/constants';
import { Home, Layers, Info, Briefcase, Users, Mail } from 'lucide-react';

const navLinks = [
  { label: "Services", href: "/services", icon: <Layers size={20} /> },
  { label: "About", href: "/about", icon: <Info size={20} /> },
  { label: "Portfolio", href: "/portfolio", icon: <Briefcase size={20} /> },
  { label: "Team", href: "/team", icon: <Users size={20} /> },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // Robust scroll detection
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollPos > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }
    return () => { 
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, [isMenuOpen]);

  const dockItems = [
    { icon: <Home size={20} />, label: 'Home', onClick: () => navigate('/') },
    ...navLinks.map(link => ({
      icon: link.icon,
      label: link.label,
      onClick: () => {
        if (link.href.startsWith('/#')) {
          const id = link.href.split('#')[1];
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          } else {
            navigate(link.href);
          }
        } else {
          navigate(link.href);
        }
      }
    })),
    { 
      icon: <Mail size={20} />, 
      label: 'Contact', 
      onClick: () => {
        const contact = document.getElementById('contact');
        if (contact) contact.scrollIntoView({ behavior: 'smooth' });
        else navigate('/#contact');
      } 
    },
  ];

  return (
    <>
      {/* Standard Header - Hidden on scroll */}
      <m.header
        initial={false}
        animate={{ 
          y: isScrolled ? -120 : 0,
          opacity: isScrolled ? 0 : 1,
          pointerEvents: isScrolled ? 'none' : 'auto'
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 right-0 z-[60] px-4 sm:px-6 hidden lg:block top-4 md:top-8"
      >
        <div className="max-w-7xl mx-auto rounded-full bg-transparent py-4 md:py-6">
          <div className="px-4 md:px-8 flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="relative z-[70] flex items-center">
              <img 
                src={Logo} 
                alt="SPARX Studioz" 
                className="h-10 md:h-12 w-auto object-contain transition-transform duration-500 hover:scale-105"
              />
            </Link>

            {/* Right Side: Nav + CTA */}
            <div className="flex items-center gap-4 lg:gap-10 relative z-[70]">
              {/* Desktop Nav - Gooey Effect */}
              <div className="hidden lg:block">
                <GooeyNav items={navLinks.map(({label, href}) => ({label, href}))} />
              </div>

            <button
                onClick={() => {
                  const contact = document.getElementById('contact');
                  if (contact) {
                    contact.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('/#contact');
                  }
                }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-400 text-black text-sm font-bold px-7 py-3 rounded-full hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                Contact Us
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>
      </m.header>

      {/* Floating Dock (Bottom) - Shown on scroll */}
      <AnimatePresence>
        {isScrolled && (
          <m.div
            initial={{ y: 100, opacity: 0, x: '-50%' }}
            animate={{ y: 0, opacity: 1, x: '-50%' }}
            exit={{ y: 100, opacity: 0, x: '-50%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-10 left-1/2 z-[100] hidden lg:flex justify-center items-center pointer-events-none"
          >
            <div className="pointer-events-auto">
              <Dock items={dockItems} panelHeight={64} baseItemSize={50} magnification={70} />
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Mobile Staggered Menu */}
      <div className="lg:hidden">
        {/* Mobile Header Glass Background */}
        <m.div
          initial={false}
          animate={{
            backgroundColor: isScrolled ? 'rgba(3, 3, 3, 0.7)' : 'rgba(3, 3, 3, 0)',
            backdropFilter: isScrolled ? 'blur(16px)' : 'blur(0px)',
            borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0)',
          }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 h-20 z-[55] pointer-events-none"
        />

        <StaggeredMenu
          isFixed={true}
          logoUrl={Logo}
          items={[
            ...navLinks.map(l => ({ label: l.label, ariaLabel: `Go to ${l.label}`, link: l.href })),
            { label: "Blog", ariaLabel: "Explore our Blog", link: "/blog" }
          ]}
          socialItems={[
            { label: 'Instagram', link: SOCIAL_LINKS.instagram, icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> },
            { label: 'LinkedIn', link: SOCIAL_LINKS.linkedin, icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg> },
            { label: 'Facebook', link: SOCIAL_LINKS.facebook, icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> }
          ]}
          colors={['#059669', '#10b981']}
          accentColor="#10b981"
          menuButtonColor={isScrolled ? '#10b981' : '#fff'}
          onMenuOpen={() => setIsMenuOpen(true)}
          onMenuClose={() => setIsMenuOpen(false)}
        />
      </div>
    </>
  );
};

export default Header;
