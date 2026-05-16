import Footer from '@/components/layout/Footer';
import { AnimatedContent } from '@/components/animations/AnimatedContent';
import CardSwap, { Card } from '@/components/animations/CardSwap';
import { motion } from 'framer-motion';
import { CheckCircle2, Target } from 'lucide-react';
import AnimatedIcon from '@/components/animations/AnimatedIcon';
import SEO from '@/components/SEO';

const WHY_CHOOSE_US_DATA = [
  {
    title: "All-in-One Solution",
    description: "From UI/UX design to custom software and marketing, we provide everything under one roof.",
    icon: <AnimatedIcon name="Rocket" className="w-8 h-8 text-green-500" />
  },
  {
    title: "Innovation Driven",
    description: "We use the latest technology stacks (Next.js, AI, etc.) to keep your business ahead of the curve.",
    icon: <AnimatedIcon name="Zap" className="w-8 h-8 text-green-500" />
  },
  {
    title: "Affordable Excellence",
    description: "High-quality, scalable digital solutions that are customized to fit your budget and goals.",
    icon: <AnimatedIcon name="Award" className="w-8 h-8 text-green-500" />
  },
  {
    title: "Expert Professionals",
    description: "Our team consists of dedicated specialists in every domain, from DevOps to Graphic Design.",
    icon: <AnimatedIcon name="Users" className="w-8 h-8 text-green-500" />
  }
];

const About = () => {
  return (
    <div className="relative min-h-screen text-white selection:bg-green-500/30">
      <SEO 
        title="About Our Agency" 
        description="Learn more about Sparx Studioz & Technologies, a results-oriented creative agency delivering innovative tech and marketing solutions worldwide." 
      />
      
      <main className="pt-32 pb-24">
        {/* 1. About Us Section */}
        <section className="px-4 mb-32 relative overflow-hidden">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedContent direction="left">
              <span className="pill-badge mb-6">
                <span className="glow-dot" />
                ABOUT THE COMPANY
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
                Technology That <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                  Sparks Tomorrow
                </span>
              </h1>
              <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                <p>
                  SPARX Studioz & Technologies is a creative and technology-driven digital agency dedicated to empowering businesses through innovative design, advanced development, and modern marketing strategies.
                </p>
                <p>
                  Our expertise spans across <strong>UI/UX Design, Web & Mobile Development, AI Solutions, and Strategic Marketing</strong>. We have successfully delivered over 17+ projects across the USA, UK, India, and Pakistan, helping brands like Tooth Clinic, Kingdom Watch Company, and Daehan Links achieve measurable digital growth.
                </p>
                <p>
                  Whether it's a startup looking for an online presence or an enterprise seeking automation, SPARX delivers custom-built, results-oriented digital solutions that spark tomorrow's success today.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                  <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
                  <p className="text-sm text-gray-400">To become a global leader in digital innovation — transforming businesses through technology, creativity, and strategy.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                  <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
                  <p className="text-sm text-gray-400">To deliver reliable, high-quality digital solutions that empower brands while maintaining affordability and excellence.</p>
                </div>
              </div>
            </AnimatedContent>

            <AnimatedContent direction="right" className="relative">
              <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 min-h-[400px] lg:h-[600px] bg-gradient-to-br from-green-500/10 to-transparent flex items-center justify-center">
                <div className="p-8 sm:p-12 text-center">
                  <div className="w-20 h-20 sm:w-32 sm:h-32 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 animate-pulse">
                     <Target className="w-10 h-10 sm:w-16 sm:h-16 text-green-400" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">Results Oriented</h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">We don't just deliver projects; we deliver measurable success for our partners across the globe.</p>
                </div>
              </div>
              {/* Background glows */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-500/20 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
            </AnimatedContent>
          </div>
        </section>

        {/* 2. Why Choose Us Section */}
        <section className="py-32 bg-white/[0.01] border-y border-white/[0.05] relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <AnimatedContent direction="left">
                <span className="pill-badge mb-6">
                  <span className="glow-dot" />
                  WHY CHOOSE US
                </span>
                <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                  The SPARX Edge: <br />
                  <span className="text-green-400">Innovation & Excellence</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-1">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Affordable & Scalable</h4>
                      <p className="text-gray-400 text-sm">We provide high-end solutions that scale with your business without breaking the bank.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-1">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Expert Support</h4>
                      <p className="text-gray-400 text-sm">Dedicated and skilled professionals in every domain ensure transparency and continuous support.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-1">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Creativity & Tech Blend</h4>
                      <p className="text-gray-400 text-sm">A unique mix of creative storytellers and precision engineers under one roof.</p>
                    </div>
                  </div>
                </div>
              </AnimatedContent>

              <div className="h-[400px] sm:h-[500px] relative mt-12 lg:mt-0">
                <CardSwap
                  width="100%"
                  height="100%"
                  cardDistance={40}
                  verticalDistance={50}
                  delay={4000}
                  pauseOnHover
                >
                  {WHY_CHOOSE_US_DATA.map((card, idx) => (
                    <Card key={idx} className="p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-2xl">
                      <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-2xl bg-green-500/10">
                        {card.icon}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">{card.title}</h3>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-[240px] sm:max-w-[280px]">
                        {card.description}
                      </p>
                    </Card>
                  ))}
                </CardSwap>
              </div>
            </div>
          </div>
        </section>

        {/* Global Impact / Reach (derived from portfolio) */}
        <section className="py-24 px-4 text-center">
          <AnimatedContent direction="up">
             <h2 className="text-2xl md:text-3xl font-bold mb-12">Global Reach, Local Expertise</h2>
             <div className="flex flex-wrap justify-center gap-4 md:gap-8 opacity-60 hover:opacity-100 transition-opacity duration-500">
                {["Pakistan", "USA", "UK", "India", "South Korea"].map(country => (
                  <span key={country} className="text-lg md:text-xl font-medium px-6 py-2 rounded-full border border-white/10 bg-white/5">{country}</span>
                ))}
             </div>
             <p className="mt-12 text-gray-400 max-w-2xl mx-auto">
               From Meta Ads for clinics in Pakistan to premium watch photography in the USA and AI research for UK clients, we bring world-class standards to every project.
             </p>
          </AnimatedContent>
        </section>
      </main>

      <Footer />

      {/* Decorative Props */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[5%] w-12 h-12 border border-green-500/20 rounded-xl"
        />
        <motion.div
          animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[30%] left-[5%] w-16 h-16 border border-emerald-500/10 rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] left-[10%] w-2 h-2 bg-green-400 rounded-full glow-dot"
        />
      </div>
    </div>
  );
};

export default About;
