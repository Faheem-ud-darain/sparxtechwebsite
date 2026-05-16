import { useParams, Link } from 'react-router-dom';
import { useMemo, useEffect, useState } from 'react';
import Footer from '@/components/layout/Footer';
import { getPostBySlug, trackInterest } from '@/lib/blog';
import { motion, useScroll, useSpring } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, Clock, User, Share2, MessageSquare, ArrowRight } from 'lucide-react';
import { AnimatedContent } from '@/components/animations/AnimatedContent';
import SEO from '@/components/SEO';
import StarBorder from '@/components/animations/StarBorder';

const BlogPost = () => {
  const { slug } = useParams();
  const post = useMemo(() => (slug ? getPostBySlug(slug) : undefined), [slug]);
  const [copied, setCopied] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track interest in category via browser cookies
  useEffect(() => {
    if (post) {
      trackInterest(post.category);
    }
    window.scrollTo(0, 0);
  }, [post]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <Link to="/blog" className="text-green-500 hover:underline">Return to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white selection:bg-green-500/30">
      <SEO 
        title={post.title} 
        description={post.excerpt} 
        ogType="article"
      />

      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-green-500 origin-left z-[100]"
        style={{ scaleX }}
      />

      <main className="pt-32 pb-24 px-4 sm:px-6">
        <article className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors mb-12 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Back to Journal</span>
          </Link>

          {/* Header */}
          <header className="mb-12">
            <AnimatedContent direction="up">
              <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-widest border border-green-500/20 mb-6 inline-block">
                {post.category}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-8 leading-[1.1]">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center justify-between gap-6 py-8 border-y border-white/5">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center border border-white/10">
                      <User className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white uppercase tracking-wider">{post.author}</div>
                      <div className="text-[10px] text-gray-500">Author</div>
                    </div>
                  </div>
                  <div className="h-8 w-[1px] bg-white/10" />
                  <div className="flex items-center gap-4 text-[10px] text-gray-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {new Date(post.date).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {post.readTime} read</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={handleShare} className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-all relative">
                    <Share2 className="w-4 h-4 text-gray-400" />
                    {copied && <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[9px] bg-green-500 text-black px-2 py-1 rounded">Copied!</span>}
                  </button>
                </div>
              </div>
            </AnimatedContent>
          </header>

          {/* Featured Image */}
          <AnimatedContent direction="up" delay={0.1} className="mb-16">
            <div className="rounded-3xl overflow-hidden border border-white/10 aspect-video relative group">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/60 to-transparent" />
            </div>
          </AnimatedContent>

          {/* Content */}
          <div className="prose prose-invert prose-green max-w-none mb-24">
            <ReactMarkdown 
              components={{
                h2: ({node, ...props}) => <h2 className="text-3xl font-bold mt-16 mb-8 text-white tracking-tight" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-2xl font-bold mt-12 mb-6 text-white tracking-tight" {...props} />,
                p: ({node, ...props}) => <p className="text-gray-400 text-lg leading-relaxed mb-8" {...props} />,
                ul: ({node, ...props}) => <ul className="space-y-4 mb-8 text-gray-400 list-none p-0" {...props} />,
                li: ({node, ...props}) => (
                  <li className="flex items-start gap-3" {...props}>
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                    <span>{props.children}</span>
                  </li>
                ),
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-green-500 bg-green-500/5 px-8 py-10 my-12 rounded-r-3xl italic text-xl text-white font-medium" {...props} />
                ),
                strong: ({node, ...props}) => <strong className="text-green-400 font-bold" {...props} />
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* CTA Box - Monetization B */}
          <AnimatedContent direction="up">
            <div className="p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-br from-green-500/20 via-white/[0.02] to-transparent border border-green-500/20 relative overflow-hidden group">
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-grow text-center md:text-left">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">Inspired by this story?</h2>
                  <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
                    Let's discuss how we can bring this level of innovation to your next project. Our team is ready to scale your vision.
                  </p>
                  <StarBorder 
                    as={Link} 
                    to="/#contact" 
                    state={{ 
                      message: `Hi SPARX! I just read your article "${post.title}" and I'm interested in learning more about how your ${post.category} expertise can help my business.`
                    }}
                    color="#55f78e" 
                    speed="5s"
                  >
                    <span className="flex items-center gap-2 px-4 py-1">
                      Start Your Journey <ArrowRight className="w-4 h-4" />
                    </span>
                  </StarBorder>
                </div>
                <div className="w-32 h-32 flex-shrink-0 bg-green-500/20 rounded-full flex items-center justify-center animate-pulse">
                  <MessageSquare className="w-12 h-12 text-green-400" />
                </div>
              </div>
              
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-green-500/20 transition-all duration-700" />
            </div>
          </AnimatedContent>

          {/* Tags & Related */}
          <div className="mt-24 pt-12 border-t border-white/5">
            <div className="flex flex-wrap gap-2 mb-12">
              {post.tags.map(tag => (
                <span key={tag} className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-4 py-2 rounded-full border border-white/5 hover:border-green-500/30 hover:text-green-500 cursor-default transition-all">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
