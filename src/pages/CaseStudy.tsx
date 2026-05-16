import { useParams, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Footer from '@/components/layout/Footer';
import { AnimatedContent } from '@/components/animations/AnimatedContent';
import { mockProjects } from '@/data/mockProjects';

const renderPortableText = (blocks: any[] | undefined) => {
  if (!blocks || blocks.length === 0) return <p className="text-gray-400 text-lg leading-relaxed">Detailed content for this project will be available soon.</p>;

  return blocks.map((block, idx) => {
    if (block._type !== 'block') return null;
    const text = block.children?.map((child: any) => child.text).join('');
    
    switch (block.style) {
      case 'h2': return <h2 key={idx} className="text-3xl font-bold mt-12 mb-6 text-white">{text}</h2>;
      case 'h3': return <h3 key={idx} className="text-xl font-bold mt-8 mb-4 text-white/90">{text}</h3>;
      default: return <p key={idx} className="text-gray-400 text-lg leading-relaxed mb-6">{text}</p>;
    }
  });
};

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const activeProject = mockProjects.find(p => p.slug.current === slug);
  
  return (
    <div className="bg-[#030303] min-h-screen text-white selection:bg-green-500/30">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] bg-green-500/[0.03] blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-5%] w-[400px] h-[400px] bg-blue-600/[0.03] blur-[120px]" />
        <div className="absolute inset-0 grid-bg-fade opacity-30" />
      </div>

      <main className="relative z-10 pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-28 md:pb-32">
        {activeProject ? (
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* Breadcrumb */}
            <AnimatedContent direction="up">
              <HashLink 
                smooth
                to="/#portfolio" 
                className="inline-flex items-center gap-2 text-gray-500 hover:text-green-400 transition-colors mb-12 group"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
                <span className="text-sm font-medium tracking-wide uppercase">Back to Portfolio</span>
              </HashLink>
            </AnimatedContent>

            {/* Header Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-20">
              <div className="lg:col-span-8">
                <AnimatedContent direction="up" delay={0.1}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold tracking-widest uppercase">
                      {activeProject.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">Case Study</span>
                  </div>
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                    {activeProject.title}
                  </h1>
                </AnimatedContent>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <AnimatedContent direction="up" delay={0.2}>
                  <p className="text-gray-400 text-lg leading-relaxed max-w-sm lg:ml-auto">
                    A deep dive into how we transformed vision into a high-performance digital reality.
                  </p>
                </AnimatedContent>
              </div>
            </div>

            {/* Hero Image */}
            <AnimatedContent direction="up" delay={0.3}>
              <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/[0.08] shadow-2xl group mb-16 sm:mb-24 md:mb-32 bg-[#050505]">
                {activeProject.image3D ? (
                  <div className="absolute inset-0 w-full h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#0A0A0A] to-green-900/20" />
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)', backgroundSize: '32px 32px' }} />

                    {/* Left Side Props */}
                    <div className="absolute left-0 top-0 bottom-0 w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center pointer-events-none z-10">
                      <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-transparent mb-6 md:mb-8" />
                      <div className="text-white/[0.04] font-black text-4xl xs:text-5xl md:text-8xl tracking-tighter uppercase leading-[0.85] break-words">
                        {activeProject.category.split('/')[0].trim()}<br/>
                        Overview
                      </div>
                      
                      <div className="mt-8 md:mt-12 flex flex-wrap gap-2 md:gap-3">
                        {activeProject.techStack?.slice(0, 4).map((t: string) => (
                          <div key={t} className="px-3 py-1.5 md:px-4 md:py-2 rounded-xl md:rounded-2xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-md text-white/40 text-[10px] md:text-xs font-mono uppercase tracking-widest shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                            {t}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Side 3D Image */}
                    <div className="absolute top-0 bottom-0 -right-4 md:-right-10 w-[80%] md:w-[60%] flex items-center justify-end pointer-events-none z-20">
                      <img
                        src={activeProject.image3D}
                        alt={`${activeProject.title} 3D Preview`}
                        className="w-full h-[120%] object-contain object-right transition-transform duration-1000 group-hover:scale-105 group-hover:-translate-x-2 md:group-hover:-translate-x-4 drop-shadow-[0_40px_60px_rgba(0,0,0,0.8)]"
                      />
                    </div>
                  </div>
                ) : activeProject.image ? (
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center">
                    <span className="text-gray-500 font-mono text-xs tracking-widest uppercase italic">High-Fidelity Preview: {activeProject.title}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
            </AnimatedContent>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              {/* Sidebar Info */}
              <div className="lg:col-span-4 space-y-12 order-2 lg:order-1">
                <AnimatedContent direction="up" delay={0.4}>
                  <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.techStack?.map((tech: string, i: number) => (
                        <span key={i} className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-gray-300 text-sm font-medium hover:bg-white/[0.08] transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </AnimatedContent>

                <AnimatedContent direction="up" delay={0.5}>
                  <div className="p-8 rounded-3xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20">
                    <h3 className="text-sm font-bold text-green-400 uppercase tracking-widest mb-4">The Impact</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Optimized for speed, accessibility, and high conversion, this project delivered a 40% increase in user engagement.
                    </p>
                  </div>
                </AnimatedContent>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-8 order-1 lg:order-2">
                <AnimatedContent direction="up" delay={0.4}>
                  <div className="space-y-16">
                    <section>
                      <h2 className="text-green-500 font-mono text-sm tracking-widest uppercase mb-6 flex items-center gap-4">
                        <span className="w-8 h-[1px] bg-green-500/30" />
                        The Challenge
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        {renderPortableText(activeProject.challenge)}
                      </div>
                    </section>

                    <section>
                      <h2 className="text-blue-500 font-mono text-sm tracking-widest uppercase mb-6 flex items-center gap-4">
                        <span className="w-8 h-[1px] bg-blue-500/30" />
                        The Solution
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        {renderPortableText(activeProject.solution)}
                      </div>
                    </section>
                  </div>
                </AnimatedContent>
              </div>
            </div>

            {/* Next Project Link */}
            <AnimatedContent direction="up" delay={0.6}>
              <div className="mt-32 pt-20 border-t border-white/[0.06] flex justify-center">
                <Link 
                  to="/portfolio"
                  className="group flex flex-col items-center gap-4 text-center"
                >
                  <span className="text-gray-500 text-xs font-bold tracking-[0.3em] uppercase">Next Adventure</span>
                  <span className="text-4xl md:text-6xl font-bold text-white group-hover:text-green-500 transition-colors flex items-center gap-4">
                    View Portfolio
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-4 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </span>
                </Link>
              </div>
            </AnimatedContent>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto px-6 text-center py-40">
            <h1 className="text-6xl font-extrabold mb-8">Project <span className="text-green-500">Not Found</span></h1>
            <p className="text-gray-500 text-xl mb-12 max-w-lg mx-auto">
              The project you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className="inline-flex items-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-full hover:bg-green-500 transition-all">
              Return Home
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudy;
