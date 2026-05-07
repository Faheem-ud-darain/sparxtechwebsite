import React from 'react';
import { motion } from 'framer-motion';
import { useContactForm } from '@/hooks/useContactForm';
import { CONTACT_INFO } from '@/data/constants';
import { AnimatedContent } from '@/components/animations/AnimatedContent';
import MagicRings from '@/components/animations/MagicRings';
import BorderGlow from '@/components/animations/BorderGlow';
import Logo from '@/assets/Full Logo Tranparent.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { formData, status, errorMessage, handleChange, handleSubmit, reset } =
    useContactForm();

  return (
    <footer id="contact" className="relative bg-[#030303] overflow-hidden">
      {/* Contact Section */}
      <div className="relative border-t border-white/[0.06] min-h-[500px]">
        {/* Magic Rings Background */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
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
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 20 }}
                          className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center"
                        >
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-green-400"><path d="M20 6 9 17l-5-5"/></svg>
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                        <p className="text-gray-400 mb-8 max-w-[240px] mx-auto">We've received your request and will get back to you shortly.</p>
                        <button 
                          onClick={reset} 
                          className="inline-flex items-center gap-2 text-green-400 text-sm font-semibold px-6 py-2 rounded-full bg-green-500/10 hover:bg-green-500/20 transition-all"
                        >
                          Send Another Message
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {[
                          { label: "Full Name", name: "name", type: "text", placeholder: "John Doe" },
                          { label: "Email Address", name: "email", type: "email", placeholder: "john@company.com" }
                        ].map((field, i) => (
                          <motion.div 
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
                          </motion.div>
                        ))}

                        <motion.div
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
                        </motion.div>

                        {status === 'error' && errorMessage && (
                          <motion.p 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="text-red-400 text-sm font-medium"
                          >
                            {errorMessage}
                          </motion.p>
                        )}

                        <motion.button
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
                        </motion.button>
                      </form>
                    )}
                  </div>
                </BorderGlow>
              </div>
            </AnimatedContent>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center">
            <img 
              src={Logo} 
              alt="SPARX Studioz" 
              className="h-8 w-auto object-contain brightness-90 hover:brightness-100 transition-all"
            />
          </div>
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} SPARX Studioz & Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="text-gray-600 hover:text-white transition-colors text-sm">Privacy</Link>
            <Link to="/terms" className="text-gray-600 hover:text-white transition-colors text-sm">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
