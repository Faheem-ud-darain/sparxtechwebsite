import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Sparkles, TrendingUp } from 'lucide-react';
import { getPosts, getInterestedCategories } from '@/lib/blog';
import type { BlogPost } from '@/lib/blog';
import { AnimatedContent } from '@/components/animations/AnimatedContent';
import BorderGlow from '@/components/animations/BorderGlow';

const BlogHighlight = () => {
  const [userInterests, setUserInterests] = useState<string[]>([]);
  const allPosts = useMemo(() => getPosts(), []);

  useEffect(() => {
    // Check for cookie-based interests
    setUserInterests(getInterestedCategories());
  }, []);

  const displayedPosts = useMemo(() => {
    if (userInterests.length > 0) {
      // Find top interest
      const counts: Record<string, number> = {};
      userInterests.forEach(cat => counts[cat] = (counts[cat] || 0) + 1);
      const topCategory = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
      
      const personalized = allPosts.filter(p => p.category === topCategory).slice(0, 3);
      // Fallback if not enough in that category
      if (personalized.length < 3) {
        const remaining = allPosts.filter(p => p.category !== topCategory).slice(0, 3 - personalized.length);
        return [...personalized, ...remaining];
      }
      return personalized;
    }
    
    // Default trending (most recent)
    return allPosts.slice(0, 3);
  }, [allPosts, userInterests]);

  const isPersonalized = userInterests.length > 0;

  return (
    <section className="py-24 relative overflow-hidden bg-[#030303]">
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <AnimatedContent direction="up">
            <div className="flex items-center gap-2 mb-4">
              {isPersonalized ? (
                <Sparkles className="w-5 h-5 text-yellow-500 fill-yellow-500/20" />
              ) : (
                <TrendingUp className="w-5 h-5 text-green-500" />
              )}
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
                {isPersonalized ? 'Recommended for You' : 'Trending Now'}
              </span>
            </div>
            <h2 className="text-2xl md:text-5xl font-bold text-white tracking-tight">
              Latest from the <span className="text-green-500">Journal</span>
            </h2>
          </AnimatedContent>

          <AnimatedContent direction="left" delay={0.2}>
            <Link 
              to="/blog" 
              className="group flex items-center gap-3 text-white/60 hover:text-green-500 transition-colors duration-300"
            >
              <span className="text-[10px] md:text-sm font-bold uppercase tracking-widest">Explore All Articles</span>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-green-500 group-hover:bg-green-500 group-hover:text-black transition-all duration-300">
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </div>
            </Link>
          </AnimatedContent>
        </div>

        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-8 pb-8 hide-scrollbar snap-x snap-mandatory">
          {displayedPosts.map((post, index) => (
            <div 
              key={post.slug} 
              className="min-w-[280px] w-[85vw] md:w-auto snap-center md:snap-align-none"
            >
              <AnimatedContent direction="up" delay={0.1 * index}>
                <Link to={`/blog/${post.slug}`} className="group block h-full">
                  <BorderGlow color="rgba(34, 197, 94, 0.4)" className="h-full">
                    <div className="h-full bg-white/[0.02] backdrop-blur-sm rounded-3xl overflow-hidden flex flex-col border border-white/[0.05]">
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-60" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-green-400 text-[8px] font-bold uppercase tracking-widest border border-white/10">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 md:p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 text-[8px] text-gray-500 uppercase tracking-widest mb-3">
                          <span className="flex items-center gap-1"><Calendar className="w-2.5 h-2.5" /> {new Date(post.date).toLocaleDateString()}</span>
                          <span className="flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> {post.readTime}</span>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight group-hover:text-green-500 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 text-xs md:text-sm line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>
                        <div className="mt-auto flex items-center justify-between text-green-500 font-bold text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Read Story
                          <ArrowRight className="w-3.5 h-3.5 translate-x-[-10px] group-hover:translate-x-0 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </BorderGlow>
                </Link>
              </AnimatedContent>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogHighlight;
