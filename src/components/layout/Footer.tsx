import React from 'react';
import { m } from 'framer-motion';
import { useContactForm } from '@/hooks/useContactForm';
import { CONTACT_INFO, SOCIAL_LINKS } from '@/data/constants';

import { AnimatedContent } from '@/components/animations/AnimatedContent';
import BorderGlow from '@/components/animations/BorderGlow';
import Logo from '@/assets/Full Logo Tranparent.webp';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Clock, CloudSun } from 'lucide-react';

const MagicRings = React.lazy(() => import('@/components/animations/MagicRings'));

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, status, errorMessage, handleChange, handleSubmit, reset, setFormField } =
    useContactForm();

  const [pakistanTime, setPakistanTime] = React.useState('');

  React.useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Karachi',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      };
      setPakistanTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Track if we've already processed this specific message to avoid loops
  const prefilledRef = React.useRef<string | null>(null);

  // Handle dynamic message pre-fill from blog posts
  React.useEffect(() => {
    const state = location.state as { message?: string };
    
    // Only pre-fill if there's a message and we haven't already filled THIS specific message
    if (state?.message && prefilledRef.current !== state.message) {
      setFormField('message', state.message);
      prefilledRef.current = state.message;
      
      // Ensure we scroll to the contact form
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }

      // Clear the state via navigate to keep the URL clean
      navigate(location.pathname + location.search + location.hash, { 
        replace: true, 
        state: {} 
      });
    }
  }, [location, setFormField, navigate]);

  return (
    <footer id="contact" className="relative bg-[#030303] overflow-hidden">
      {/* Contact Section */}
      <div className="relative border-t border-white/[0.06] min-h-[500px]">
        {/* Magic Rings Background */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <React.Suspense fallback={null}>
            <MagicRings
              color="#55f78e"
              colorTwo="#63f1c5"
              ringCount={8}
              speed={0.8}
              attenuation={10}
              lineThickness={1.5}
              baseRadius={0.25}
              radiusStep={0.15}
              scaleRate={0.12}
              opacity={0.6}
              noiseAmount={0.05}
              ringGap={1.2}
              followMouse={true}
              mouseInfluence={0.15}
            />
          </React.Suspense>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16">
            {/* Left: Contact Info */}
            <div>
              <AnimatedContent direction="up">
                <span className="pill-badge mb-4">
                  <span className="glow-dot" />
                  GET IN TOUCH
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 tracking-tight">
                  Let's Build Something<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                    Extraordinary
                  </span>
                </h2>
                <p className="text-gray-500 mt-6 text-lg max-w-md leading-relaxed">
                  Have a project in mind? We'd love to hear about it. Drop us a message 
                  and we'll get back to you within 24 hours.
                </p>
              </AnimatedContent>

              <AnimatedContent direction="up" delay={0.2}>
                <div className="mt-10 space-y-6">
                  <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:border-green-500/30 transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-green-400"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                      <p className="text-white group-hover:text-green-400 transition-colors">{CONTACT_INFO.email}</p>
                    </div>
                  </a>

                  <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:border-green-500/30 transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-green-400"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Phone</p>
                      <p className="text-white group-hover:text-green-400 transition-colors">{CONTACT_INFO.phone}</p>
                    </div>
                  </a>

                  <a href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:border-green-500/30 transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-7.6 8.38 8.38 0 0 1 3.8.9L21 4.5z"/>
                        <path d="M16 10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">WhatsApp</p>
                      <p className="text-white group-hover:text-green-400 transition-colors">{CONTACT_INFO.whatsapp}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-green-400"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Office</p>
                      <p className="text-white text-sm leading-relaxed">{CONTACT_INFO.address}</p>
                    </div>
                  </div>
                </div>
              </AnimatedContent>
            </div>

            {/* Right: Contact Form */}
            <AnimatedContent direction="up" delay={0.15}>
              <div className="relative">
                <BorderGlow 
                  colors={['#22c55e', '#10b981', '#059669']}
                  glowColor="142 72 40"
                  borderRadius={32}
                  backgroundColor="rgba(3, 3, 3, 0.7)"
                  className="p-1"
                >
                  <div className="p-8 md:p-10">
                    {status === 'success' ? (
                      <m.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <m.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 20 }}
                          className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center"
                        >
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-green-400"><path d="M20 6 9 17l-5-5"/></svg>
                        </m.div>
                        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                        <p className="text-gray-400 mb-8 max-w-[240px] mx-auto">We've received your request and will get back to you shortly.</p>
                        <button 
                          onClick={reset} 
                          className="inline-flex items-center gap-2 text-green-400 text-sm font-semibold px-6 py-2 rounded-full bg-green-500/10 hover:bg-green-500/20 transition-all"
                        >
                          Send Another Message
                        </button>
                      </m.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {[
                          { label: "Full Name", name: "name", type: "text", placeholder: "John Doe" },
                          { label: "Email Address", name: "email", type: "email", placeholder: "john@company.com" }
                        ].map((field, i) => (
                          <m.div 
                            key={field.name}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                          >
                            <label className="block text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold mb-2 ml-1">{field.label}</label>
                            <div className="relative group/input">
                              <input
                                type={field.type}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={(formData as any)[field.name]}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl px-5 py-4 text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-green-500/50 focus:bg-white/[0.05] transition-all duration-300"
                              />
                              <div className="absolute inset-0 rounded-2xl bg-green-500/5 opacity-0 group-focus-within/input:opacity-100 pointer-events-none transition-opacity" />
                            </div>
                          </m.div>
                        ))}

                        <m.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <label className="block text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold mb-2 ml-1">Your Message</label>
                          <div className="relative group/input">
                            <textarea
                              name="message"
                              placeholder="Tell us about your vision..."
                              rows={4}
                              value={formData.message}
                              onChange={handleChange}
                              required
                              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl px-5 py-4 text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-green-500/50 focus:bg-white/[0.05] transition-all duration-300 resize-none"
                            />
                            <div className="absolute inset-0 rounded-2xl bg-green-500/5 opacity-0 group-focus-within/input:opacity-100 pointer-events-none transition-opacity" />
                          </div>
                        </m.div>

                        {status === 'error' && errorMessage && (
                          <m.p 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="text-red-400 text-sm font-medium"
                          >
                            {errorMessage}
                          </m.p>
                        )}

                        <m.button
                          type="submit"
                          disabled={status === 'submitting'}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          className="group relative w-full bg-green-500 text-black font-bold py-4 rounded-2xl text-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,197,94,0.3)] disabled:opacity-50"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            {status === 'submitting' ? (
                              <>
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Sending...
                              </>
                            ) : (
                              <>
                                Launch Project
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="m9 18 6-6-6-6"/></svg>
                              </>
                            )}
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </m.button>
                      </form>
                    )}
                  </div>
                </BorderGlow>
              </div>
            </AnimatedContent>
          </div>
        </div>
      </div>

      {/* Full-width Branded Dark Footer */}
      <div className="relative border-t border-white/[0.06] bg-[#030303] text-[#f5f5f7] pt-16 pb-8 overflow-hidden">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes strokeLoop {
            0% {
              stroke-dashoffset: 2200;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
        `}} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Top Row: Links and Branding */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-2">
            {/* Branding Column */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-black tracking-wider text-white mb-4">
                  SPARX STUDIOZ & TECHNOLOGY
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                  An independent creative studio and digital technology partner. We design and build premium software solutions, web experiences, and creative brand assets.
                </p>
              </div>
            </div>

            {/* Explore links */}
            <div className="md:col-span-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-green-400 mb-4">
                Explore
              </h4>
              <ul className="space-y-3 text-sm font-medium">
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/portfolio" className="text-gray-400 hover:text-white transition-colors">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link to="/team" className="text-gray-400 hover:text-white transition-colors">
                    Team
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white transition-colors" onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Follow me (Social links) */}
            <div className="md:col-span-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-green-400 mb-4">
                Follow me
              </h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 group text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <span className="w-8 h-8 rounded-full bg-white/[0.02] border border-white/[0.06] flex items-center justify-center group-hover:border-green-500/30 group-hover:bg-green-500/5 transition-all">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                  </span>
                  <span>Facebook</span>
                </a>

                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 group text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <span className="w-8 h-8 rounded-full bg-white/[0.02] border border-white/[0.06] flex items-center justify-center group-hover:border-green-500/30 group-hover:bg-green-500/5 transition-all">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </span>
                  <span>Instagram</span>
                </a>

                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 group text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <span className="w-8 h-8 rounded-full bg-white/[0.02] border border-white/[0.06] flex items-center justify-center group-hover:border-green-500/30 group-hover:bg-green-500/5 transition-all">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </span>
                  <span>LinkedIn</span>
                </a>

                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 group text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <span className="w-8 h-8 rounded-full bg-white/[0.02] border border-white/[0.06] flex items-center justify-center group-hover:border-green-500/30 group-hover:bg-green-500/5 transition-all">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-7.6 8.38 8.38 0 0 1 3.8.9L21 4.5z"/>
                    </svg>
                  </span>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Card Middle: Giant Text (Cropped bottom) */}
          <div className="relative mt-0 select-none pointer-events-none w-full overflow-hidden z-0">
          <svg viewBox="0 0 1000 65" className="w-full h-auto scale-[1.05] sm:scale-100">
            <defs>
              {/* Moving stroke gradient */}
              <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22c55e">
                  <animate attributeName="stop-color" values="#22c55e; #10b981; #3b82f6; #22c55e" dur="6s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#10b981">
                  <animate attributeName="stop-color" values="#10b981; #3b82f6; #22c55e; #10b981" dur="6s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#3b82f6">
                  <animate attributeName="stop-color" values="#3b82f6; #22c55e; #10b981; #3b82f6" dur="6s" repeatCount="indefinite" />
                </stop>
              </linearGradient>

              {/* Soft glow filter (reduced stdDeviation to make glow subtle) */}
              <filter id="textGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Animated glowing border stroke (behind the solid fill to hide inner joints and only show outer glow) */}
            <text
              x="50%"
              y="105"
              textAnchor="middle"
              className="font-black text-[115px] fill-none stroke-[url(#glowGradient)] stroke-[1.5px] uppercase"
              style={{
                fontFamily: "'Inter', sans-serif",
                filter: 'url(#textGlow)',
                strokeDasharray: '2200',
                animation: 'strokeLoop 15s linear infinite',
                letterSpacing: '0.06em',
                opacity: 0.45
              }}
            >
              SPARX STUDIOZ
            </text>

            {/* Base solid text in front (White text as requested) */}
            <text
              x="50%"
              y="105"
              textAnchor="middle"
              className="font-black text-[115px] fill-white uppercase"
              style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.06em' }}
            >
              SPARX STUDIOZ
            </text>
          </svg>
          </div>
        </div>

        {/* Card Bottom Row: Copyright + Time/Weather */}
        <div className="border-t border-white/[0.06] relative z-10 bg-[#030303]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-gray-500 font-medium justify-center sm:justify-start">
              <span>SPARX © {new Date().getFullYear()}</span>
              <Link to="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
            
            {/* Clock & Weather Widget */}
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 gap-y-1.5 text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Abbottabad, PK
              </span>
              <span className="w-1.5 h-1.5 bg-white/10 rounded-full hidden sm:block" />
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                {pakistanTime || '...'}
              </span>
              <span className="w-1.5 h-1.5 bg-white/10 rounded-full" />
              <span className="flex items-center gap-1">
                <CloudSun className="w-3.5 h-3.5 text-amber-500" />
                24°C Sunny
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
