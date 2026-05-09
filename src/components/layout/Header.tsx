import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Logo from '@/assets/Full Logo Tranparent.png';
import TextHover from '@/components/animations/TextHover';
import StaggeredMenu from './StaggeredMenu';
import { SOCIAL_LINKS } from '@/data/constants';

const MotionLink = motion.create(Link);
const MotionHashLink = motion.create(HashLink);

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Team", href: "/team" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-0 right-0 z-[60] transition-all duration-500 px-4 sm:px-6 hidden lg:block ${
          isScrolled ? 'top-4' : 'top-4 md:top-8'
        }`}
      >
        <div className={`max-w-7xl mx-auto rounded-full transition-all duration-500 ${
          isScrolled
            ? 'backdrop-blur-2xl bg-black/70 border border-white/[0.06] py-3 md:py-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'bg-transparent py-4 md:py-6'
        }`}>
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
              {/* Desktop Nav */}
              <nav className="flex items-center gap-8">
                {navLinks.map((link) => (
                  link.href.startsWith('/#') ? (
                    <HashLink
                      smooth
                      key={link.label}
                      to={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-300 tracking-wide"
                    >
                      <TextHover text={link.label} />
                    </HashLink>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-300 tracking-wide"
                    >
                      <TextHover text={link.label} />
                    </Link>
                  )
                ))}
              </nav>

              <HashLink
                smooth
                to="/#contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-400 text-black text-sm font-bold px-7 py-3 rounded-full hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                Contact Us
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </HashLink>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Staggered Menu */}
      <div className="lg:hidden">
        <StaggeredMenu
          isFixed={true}
          logoUrl={Logo}
          items={navLinks.map(l => ({ label: l.label, ariaLabel: `Go to ${l.label}`, link: l.href }))}
          socialItems={[
            { label: 'Instagram', link: SOCIAL_LINKS.instagram },
            { label: 'LinkedIn', link: SOCIAL_LINKS.linkedin },
            { label: 'Facebook', link: SOCIAL_LINKS.facebook }
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
