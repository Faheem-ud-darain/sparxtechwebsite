import { SERVICES } from '@/data/constants';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MessageSquare, Compass } from 'lucide-react';
import { AnimatedContent } from '@/components/animations/AnimatedContent';
import BorderGlow from '@/components/animations/BorderGlow';
import FloatingParticles from '@/components/animations/FloatingParticles';
import AnimatedIcon from '@/components/animations/AnimatedIcon';
import SEO from '@/components/SEO';
import StarBorder from '@/components/animations/StarBorder';
import { useEffect, useState } from 'react';

const ServicesIndex = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative min-h-screen text-white selection:bg-green-500/30 overflow-hidden">
      <SEO
        title="Our Digital Services & Capabilities | SPARX Studioz"
        description="Explore our complete suite of 20 specialized services including Web Development, UI/UX Design, Web Scraping, Digital Marketing, and Quality Assurance."
        keywords="digital services, web development, software engineering, uiux design, social ads, ecommerce store management, sparx"
        ogType="website"
      />

      {/* Background elements */}
      <div className="absolute inset-0 grid-bg-fade pointer-events-none opacity-40" />
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-green-500/[0.05] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/[0.05] blur-[150px] pointer-events-none" />
      <FloatingParticles count={30} color="rgba(34, 197, 94, 0.15)" minSize={2} maxSize={5} />

      <main className="pt-32 pb-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Back to Hub</span>
          </Link>

          {/* Page Header */}
          <header className="mb-20 text-center max-w-3xl mx-auto">
            <AnimatedContent direction="up">
              <span className="pill-badge mb-4">
                <span className="glow-dot" />
                OUR CAPABILITIES
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                Specialized Digital <span className="text-green-500">Solutions</span>
              </h1>
              <p className="text-gray-400 text-lg sm:text-xl leading-relaxed">
                We engineer and execute premium digital experiences across 20 specialized capabilities to scale your operations, build brand trust, and drive conversions.
              </p>
            </AnimatedContent>
          </header>

          {/* Grid Layout of all 20 Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-24">
            {SERVICES.map((service, index) => {
              const slug = service.title
                .toLowerCase()
                .replace(/\//g, '-')
                .replace(/ & /g, '-')
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '');

              return (
                <AnimatedContent
                  key={index}
                  direction="up"
                  delay={index * 0.04}
                  className="flex flex-col h-full"
                >
                  <BorderGlow
                    className="h-full w-full"
                    borderRadius={24}
                    glowRadius={25}
                    backgroundColor="#0A0A0A"
                    glowColor="142 72 55"
                    colors={['#22c55e', '#10b981', '#06b6d4']}
                    glowIntensity={0.7}
                  >
                    <div className="group p-6 sm:p-8 h-full flex flex-col relative overflow-hidden">
                      {/* Number Watermark */}
                      <div className="absolute top-6 right-8 text-4xl font-mono font-bold text-white/[0.02] group-hover:text-green-500/[0.06] transition-colors duration-500 select-none">
                        {service.number}
                      </div>

                      {/* Animated Icon */}
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-6 group-hover:scale-105 group-hover:bg-green-500/10 group-hover:border-green-500/20 transition-all duration-500">
                        <AnimatedIcon
                          name={service.lucideIcon || 'HelpCircle'}
                          className="w-6 h-6 text-green-500"
                          size={isMobile ? 24 : 28}
                        />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 flex-1">
                        {service.description}
                      </p>

                      {/* Footer Link */}
                      <div className="pt-5 border-t border-white/[0.05] mt-auto">
                        <Link
                          to={`/services/${slug}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 group-hover:text-green-400 transition-colors"
                        >
                          Explore Service
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </BorderGlow>
                </AnimatedContent>
              );
            })}
          </div>

          {/* Bottom CTA Box */}
          <AnimatedContent direction="up">
            <div className="p-8 sm:p-12 md:p-16 rounded-[2.5rem] bg-gradient-to-br from-green-500/20 via-white/[0.02] to-transparent border border-green-500/20 relative overflow-hidden group">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="flex-grow text-center md:text-left">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
                    Need a custom capability?
                  </h2>
                  <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto md:mx-0">
                    Let's discuss your specific technical and creative requirements. Our cross-functional engineers are built to adapt.
                  </p>
                  <StarBorder
                    as={Link}
                    to="/#contact"
                    state={{ message: "Hi SPARX! I looked through your complete services catalog and I'm interested in discussing a project. Let's arrange a consultation call." }}
                    color="#55f78e"
                    speed="5s"
                  >
                    <span className="flex items-center gap-2 px-6 py-2.5 text-base font-bold">
                      Consult with Our Team <Compass className="w-5 h-5" />
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

export default ServicesIndex;
