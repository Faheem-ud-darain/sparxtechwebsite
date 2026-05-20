import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/components/layout/Footer';
import { AnimatedContent } from '@/components/animations/AnimatedContent';
import { getPosts, getCategories, getInterestedCategories } from '@/lib/blog';
import CategoryPillNav from '@/components/animations/CategoryPillNav';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowUpDown, Calendar, Clock, ArrowUpRight, Star } from 'lucide-react';
import SEO from '@/components/SEO';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'readingTime'>('newest');
  const [userInterests, setUserInterests] = useState<string[]>([]);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const allPosts = useMemo(() => getPosts(), []);
  const categories = useMemo(() => ['All', ...getCategories()], []);

  // Load user interests from cookies (Smart recommendations)
  useEffect(() => {
    setUserInterests(getInterestedCategories());
  }, []);

  const filteredPosts = useMemo(() => {
    let result = allPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortBy === 'readingTime') {
      result.sort((a, b) => parseInt(a.readTime) - parseInt(b.readTime));
    }

    return result;
  }, [allPosts, searchQuery, selectedCategory, sortBy]);

  // Recommended posts based on most visited category
  const recommendedPosts = useMemo(() => {
    if (userInterests.length === 0) return allPosts.slice(0, 2);
    
    // Count frequencies
    const counts: Record<string, number> = {};
    userInterests.forEach(cat => counts[cat] = (counts[cat] || 0) + 1);
    const topCategory = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    
    return allPosts.filter(p => p.category === topCategory).slice(0, 2);
  }, [allPosts, userInterests]);

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  return (
    <div className="relative min-h-screen text-white selection:bg-green-500/30">
      <SEO 
        title="Insight & Innovation Blog" 
        description="Explore the latest trends in 3D web design, custom software development, and digital marketing strategy from the experts at Sparx Studioz." 
      />

      <main className="pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 sm:mb-24">
            <AnimatedContent direction="up">
              <span className="pill-badge mb-6">
                <span className="glow-dot" />
                INSIGHTS & INNOVATION
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6">
                The Editorial <span className="text-green-500">Journal</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Exploring the intersection of cinematic design, high-performance engineering, and strategic marketing.
              </p>
            </AnimatedContent>
          </div>

          {/* Smart Recommendations */}
          {userInterests.length > 0 && recommendedPosts.length > 0 && (
            <div className="mb-20">
              <div className="flex items-center gap-2 mb-8">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <h2 className="text-xl font-bold uppercase tracking-widest text-white/80">Recommended for You</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {recommendedPosts.map(post => (
                  <Link key={post.slug} to={`/blog/${post.slug}`} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition-all hover:bg-white/[0.05]">
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-start mb-6">
                        <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-widest border border-green-500/20">
                          {post.category}
                        </span>
                        <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-green-500 transition-colors" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-green-400 transition-colors">{post.title}</h3>
                      <p className="text-gray-400 text-sm mb-6 line-clamp-2">{post.excerpt}</p>
                      <div className="mt-auto flex items-center gap-4 text-[10px] text-gray-500 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {new Date(post.date).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Results Grid Toolbar (Desktop: Sticky Top, Mobile: Floating Bottom via Portal) */}
          <div className="hidden lg:block sticky top-6 z-[100] mb-12">
            <div className="mx-auto max-w-4xl bg-black/60 backdrop-blur-2xl border border-white/10 rounded-xl p-2 flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-white/20">
              {/* Search Input */}
              <div className="relative group flex-shrink-0 w-48 transition-all duration-300 focus-within:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-green-500 transition-colors pointer-events-none" />
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/[0.05] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-green-500/50 transition-all placeholder:text-gray-600"
                />
              </div>

              <div className="w-px h-6 bg-white/10 flex-shrink-0" />

              {/* Categories */}
              <div className="flex-grow overflow-x-auto no-scrollbar py-1">
                <CategoryPillNav 
                  items={categories.map(cat => ({ label: cat, id: cat }))}
                  activeId={selectedCategory}
                  onSelect={setSelectedCategory}
                  className="min-w-max"
                />
              </div>

              <div className="w-px h-6 bg-white/10 flex-shrink-0" />

              {/* Sort Trigger */}
              <div className="relative flex-shrink-0">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center px-4 h-10 bg-white/[0.05] border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-green-500/30 transition-all group"
                >
                  <ArrowUpDown className="w-4 h-4 mr-2 text-gray-500 group-hover:text-green-500 transition-colors" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Sort: {sortBy === 'readingTime' ? 'Time' : sortBy}</span>
                </button>

                <AnimatePresence>
                  {isSortOpen && (
                    <>
                      <div className="fixed inset-0 z-[10000]" onClick={() => setIsSortOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-2 w-48 z-[10001] bg-[#0A0A0A]/95 backdrop-blur-2xl border border-white/10 rounded-xl p-2 shadow-2xl overflow-hidden"
                      >
                        {[
                          { id: 'newest', label: 'Newest First' },
                          { id: 'oldest', label: 'Oldest First' },
                          { id: 'readingTime', label: 'Reading Time' }
                        ].map((option) => (
                          <button
                            key={option.id}
                            onClick={() => {
                              setSortBy(option.id as any);
                              setIsSortOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-[10px] transition-all ${
                              sortBy === option.id 
                              ? 'bg-green-500/10 text-green-400 font-bold' 
                              : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            {option.label}
                            {sortBy === option.id && (
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <AnimatedContent key={post.slug} direction="up" delay={index * 0.05}>
                <Link to={`/blog/${post.slug}`} className="group block h-full">
                  <div className="h-full flex flex-col rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 hover:-translate-y-2">
                    {/* Image Area */}
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-green-400 text-[9px] font-bold uppercase tracking-widest border border-white/10">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-[9px] text-gray-500 uppercase tracking-widest mb-4">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {new Date(post.date).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-green-500 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-3 mb-6">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-600 group-hover:text-white transition-colors uppercase tracking-[0.2em]">Read Article</span>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-green-500 transition-all">
                          <ArrowUpRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedContent>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-32">
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
              <button 
                onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
                className="mt-4 text-green-500 hover:underline text-sm font-bold uppercase tracking-widest"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Mobile Floating Dock - Bottom Fixed */}
      {createPortal(
        <div className="lg:hidden fixed bottom-[20px] left-1/2 -translate-x-1/2 w-[92%] z-[200] bg-black/80 backdrop-blur-3xl border border-white/10 rounded-2xl p-2 flex items-center gap-2 shadow-[0_20px_50px_rgba(0,0,0,0.9)] transition-all duration-300">
          {/* Mobile Search - Expandable */}
          <motion.div 
            initial={false}
            animate={{ 
              width: isSearchExpanded ? '100%' : '48px',
              backgroundColor: isSearchExpanded ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'
            }}
            className="relative flex items-center border border-white/10 rounded-xl overflow-hidden h-12"
          >
            <button 
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="w-12 h-12 flex flex-shrink-0 items-center justify-center text-white hover:text-green-500 transition-colors z-10"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5" />
            </button>
            <AnimatePresence>
              {isSearchExpanded && (
                <motion.input
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  type="text"
                  autoFocus
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-grow bg-transparent border-none py-2 pr-4 text-sm text-white focus:outline-none placeholder:text-gray-500"
                />
              )}
            </AnimatePresence>
          </motion.div>

          {!isSearchExpanded && (
            <>
              <div className="w-px h-6 bg-white/10 flex-shrink-0" />

              {/* Categories */}
              <div className="flex-grow overflow-x-auto no-scrollbar py-1">
                <CategoryPillNav 
                  items={categories.map(cat => ({ label: cat, id: cat }))}
                  activeId={selectedCategory}
                  onSelect={setSelectedCategory}
                  className="min-w-max"
                />
              </div>

              <div className="w-px h-6 bg-white/10 flex-shrink-0" />

              {/* Sort */}
              <div className="relative flex-shrink-0">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center justify-center w-12 h-12 bg-white/[0.05] border border-white/10 rounded-xl text-white hover:text-green-500 transition-colors"
                >
                  <ArrowUpDown className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {isSortOpen && (
                    <>
                      <div className="fixed inset-0 z-[10000]" onClick={() => setIsSortOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full right-0 mb-4 w-48 z-[10001] bg-[#0A0A0A]/95 backdrop-blur-2xl border border-white/10 rounded-xl p-2 shadow-2xl"
                      >
                        {[
                          { id: 'newest', label: 'Newest First' },
                          { id: 'oldest', label: 'Oldest First' },
                          { id: 'readingTime', label: 'Reading Time' }
                        ].map((option) => (
                          <button
                            key={option.id}
                            onClick={() => {
                              setSortBy(option.id as any);
                              setIsSortOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-[10px] transition-all ${
                              sortBy === option.id 
                              ? 'bg-green-500/10 text-green-400 font-bold' 
                              : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            {option.label}
                            {sortBy === option.id && (
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>,
        document.body
      )}
    </div>
  );
};

export default Blog;
