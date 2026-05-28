import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { useScrollTop } from '@/hooks/useScrollTop';
import { Search, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '@/constants';
import { CTABannerSection } from '@/components/features/CTABannerSection';

const CATEGORIES = ['All', 'Yoga Science', 'Meditation', 'Ayurveda', 'Retreats', 'Nutrition', 'Pranayama'];

const Blog = () => {
  useScrollTop();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = BLOG_POSTS.filter((post) => {
    const matchesCat = category === 'All' || post.category === category;
    const matchesSearch = !search || post.title.toLowerCase().includes(search.toLowerCase()) || post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featured = BLOG_POSTS[0];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="section-padding" style={{ background: 'linear-gradient(135deg, hsl(133 20% 96%) 0%, hsl(60 17% 98%) 100%)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="tag-pill mx-auto mb-5 w-fit"><BookOpen size={12} /> Wellness Journal</div>
            <h1 className="text-5xl font-bold mb-5">Insights for Your<br /><span className="italic" style={{ color: 'hsl(27 87% 60%)' }}>Wellness Journey</span></h1>
            <p className="text-xl text-muted-foreground mb-8">Expert articles on yoga, meditation, Ayurveda, nutrition, and spiritual living — curated by certified practitioners.</p>
            <div className="relative max-w-md mx-auto">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm shadow-sm" />
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          {/* Featured Post */}
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden border border-border shadow-sm">
              <div className="relative aspect-[16/9] lg:aspect-auto">
                <img src={featured.thumbnail} alt={featured.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4">
                  <div className="tag-orange">Featured</div>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center bg-card">
                <div className="tag-pill mb-3 w-fit">{featured.category}</div>
                <h2 className="text-2xl font-bold mb-3 leading-tight">{featured.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{featured.excerpt}</p>
                <div className="flex items-center gap-3 mb-5">
                  <img src={featured.authorAvatar} alt={featured.author} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-medium">{featured.author}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={10} /> {featured.readTime} · {featured.publishedAt}</div>
                  </div>
                </div>
                <Link to={`/blog/${featured.id}`} className="btn-primary w-fit">
                  Read Article <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${category === cat ? 'border-transparent text-white' : 'border-border hover:border-primary/40'}`}
                style={category === cat ? { background: 'hsl(133 18% 59%)' } : {}}>
                {cat}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.slice(1).map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`} className="card-wellness group overflow-hidden p-0">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="tag-pill">{post.category}</div>
                    </div>
                    <h3 className="font-bold text-base mb-2 leading-snug group-hover:text-primary transition-colors" style={{ color: 'inherit' }}>{post.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-2">
                      <img src={post.authorAvatar} alt={post.author} className="w-7 h-7 rounded-full object-cover" />
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">{post.author}</span> · <Clock size={9} className="inline" /> {post.readTime}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🌿</div>
              <h3 className="text-lg font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground text-sm">Try a different search or category.</p>
              <button onClick={() => { setSearch(''); setCategory('All'); }} className="mt-4 text-sm font-medium hover:underline" style={{ color: 'hsl(133 18% 59%)' }}>
                Clear filters
              </button>
            </div>
          )}
        </div>

        <CTABannerSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Blog;
