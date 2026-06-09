import { useParams, Link } from 'react-router-dom';
import { useMemo, useEffect, useState } from 'react';
import { SERVICES_DETAIL } from '@/data/servicesData';
import Footer from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, MessageSquare, Plus, Minus, CheckCircle, Cpu, ShieldAlert } from 'lucide-react';
import { AnimatedContent } from '@/components/animations/AnimatedContent';
import SEO from '@/components/SEO';
import StarBorder from '@/components/animations/StarBorder';
import BorderGlow from '@/components/animations/BorderGlow';
import FloatingParticles from '@/components/animations/FloatingParticles';

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 py-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-white hover:text-green-400 transition-colors py-2 focus:outline-none"
      >
        <span className="text-base sm:text-lg font-semibold pr-4">{question}</span>
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 transition-colors">
          {isOpen ? (
            <Minus className="w-4 h-4 text-green-500" />
          ) : (
            <Plus className="w-4 h-4 text-green-500" />
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="mt-3 text-gray-400 leading-relaxed text-sm sm:text-base pr-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = useMemo(() => (slug ? SERVICES_DETAIL[slug] : undefined), [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center text-white">
        <div className="text-center px-6">
          <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <p className="text-gray-500 mb-8 max-w-md">
            The service path you requested does not exist or has been moved.
          </p>
          <Link to="/" className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 font-semibold transition-colors">
            <ArrowLeft className="w-4 h-4" /> Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  // Pre-fill the contact form message based on service
  const contactMessage = `Hi SPARX! I'm interested in your "${service.title}" service (${service.primaryKeyword}). Could you please share how we can get started?`;

  return (
    <div className="relative min-h-screen text-white selection:bg-green-500/30 overflow-hidden">
      <SEO
        title={service.metaTitle}
        description={service.metaDescription}
        keywords={[service.primaryKeyword, ...service.secondaryKeywords].join(', ')}
        ogType="website"
      />

      {/* Background elements */}
      <div className="absolute inset-0 grid-bg-fade pointer-events-none opacity-40" />
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-green-500/[0.05] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/[0.05] blur-[150px] pointer-events-none" />
      <FloatingParticles count={20} color="rgba(34, 197, 94, 0.15)" minSize={2} maxSize={5} />

      <main className="pt-32 pb-24 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link
            to="/#services"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Back to Solutions</span>
          </Link>

          {/* Header Section */}
          <header className="mb-16">
            <AnimatedContent direction="up">
              <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-widest border border-green-500/20 mb-6 inline-block">
                Service Catalog
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.15]">
                {service.h1}
              </h1>
              <p className="text-gray-400 text-lg sm:text-xl max-w-3xl leading-relaxed">
                Expert solutions in <span className="text-green-400 font-semibold">{service.title}</span> designed to scale your business, optimize operations, and amplify your digital reach.
              </p>
            </AnimatedContent>
          </header>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mb-20">
            {/* Main Content */}
            <div className="lg:col-span-7 space-y-10">
              <AnimatedContent direction="up" delay={0.05}>
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white tracking-tight border-b border-white/5 pb-4">
                  {service.h2s[0] || "Overview"}
                </h2>
                <div className="space-y-6 text-gray-400 text-base sm:text-lg leading-relaxed">
                  {service.longDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </AnimatedContent>

              {/* Core Deliverables list */}
              <AnimatedContent direction="up" delay={0.1}>
                <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/5">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                    <Cpu className="w-5 h-5 text-green-500" />
                    Key Benefits & Deliverables
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-gray-400">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span><strong>SEO-Optimized Setup:</strong> Tailored architectures built to satisfy search bots and human visitors.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-400">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span><strong>High-Performance Delivery:</strong> Supercharged load speeds and lightweight code implementation.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-400">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span><strong>Scalable Structures:</strong> Modular components designed to adapt to your future operational expansion.</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-400">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span><strong>Continuous Support:</strong> Dedicated assistance and performance monitoring to guarantee uptime.</span>
                    </li>
                  </ul>
                </div>
              </AnimatedContent>
            </div>

            {/* Sidebar info */}
            <div className="lg:col-span-5 space-y-8">
              <AnimatedContent direction="up" delay={0.1}>
                <BorderGlow
                  className="w-full"
                  borderRadius={24}
                  glowRadius={25}
                  backgroundColor="#0A0A0A"
                  glowColor="142 72 55"
                  colors={['#22c55e', '#10b981', '#06b6d4']}
                  glowIntensity={0.6}
                >
                  <div className="p-6 sm:p-8 relative z-10">
                    <h3 className="text-lg font-bold uppercase tracking-wider text-green-400 mb-6">
                      Target Keywords
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs text-gray-500 block uppercase mb-1.5 tracking-widest font-mono">Primary Keyword</span>
                        <div className="px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white font-medium text-sm inline-block">
                          {service.primaryKeyword}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 block uppercase mb-1.5 tracking-widest font-mono">Secondary Focus</span>
                        <div className="flex flex-wrap gap-2">
                          {service.secondaryKeywords.map((kw, i) => (
                            <span key={i} className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-gray-300 text-xs font-medium">
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </BorderGlow>
              </AnimatedContent>

              {/* Technologies / Tools Used */}
              <AnimatedContent direction="up" delay={0.15}>
                <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/5">
                  <h3 className="text-lg font-bold uppercase tracking-wider text-gray-300 mb-6">
                    Technologies & Tools
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {service.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-green-500/30 hover:bg-green-500/5 hover:text-green-400 transition-all text-sm font-semibold text-gray-300 cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedContent>
            </div>
          </div>

          {/* FAQ Accordion Section */}
          <section className="mb-24 pt-12 border-t border-white/5">
            <AnimatedContent direction="up">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-10 text-white tracking-tight">
                Frequently Asked Questions
              </h2>
              <div className="max-w-4xl space-y-2">
                {service.faqs.map((faq, index) => (
                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </AnimatedContent>
          </section>

          {/* Call to Action Section */}
          <AnimatedContent direction="up">
            <div className="p-8 sm:p-12 md:p-16 rounded-[2.5rem] bg-gradient-to-br from-green-500/20 via-white/[0.02] to-transparent border border-green-500/20 relative overflow-hidden group">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="flex-grow text-center md:text-left">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
                    Ready to scale your business?
                  </h2>
                  <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto md:mx-0">
                    Let's collaborate to build an impactful strategy around our <strong className="text-green-400 font-bold">{service.title}</strong> expertise. Contact our consultants today.
                  </p>
                  <StarBorder
                    as={Link}
                    to="/#contact"
                    state={{ message: contactMessage }}
                    color="#55f78e"
                    speed="5s"
                  >
                    <span className="flex items-center gap-2 px-6 py-2.5 text-base font-bold">
                      Book a Free Consultation <ArrowRight className="w-5 h-5" />
                    </span>
                  </StarBorder>
                </div>
                <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-green-500/10 rounded-full flex items-center justify-center animate-pulse border border-green-500/20">
                  <MessageSquare className="w-10 h-10 sm:w-14 sm:h-14 text-green-400" />
                </div>
              </div>

              {/* Background accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-green-500/20 transition-all duration-700 pointer-events-none" />
            </div>
          </AnimatedContent>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
