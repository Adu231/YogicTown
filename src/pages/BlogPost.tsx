import { Link, useParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { useScrollTop } from '@/hooks/useScrollTop';
import { ArrowLeft, Clock, Tag, Share2, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '@/constants';

const BlogPost = () => {
  useScrollTop();
  const { id } = useParams();
  const post = BLOG_POSTS.find((p) => p.id === id) || BLOG_POSTS[0];
  const related = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero Image */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,20,15,0.7) 0%, transparent 60%)' }} />
        </div>

        <div className="max-w-3xl mx-auto px-4 md:px-8 py-10">
          {/* Back */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <div className="tag-pill">{post.category}</div>
            <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock size={12} /> {post.readTime}</span>
            <span className="text-xs text-muted-foreground">{post.publishedAt}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">{post.title}</h1>

          {/* Author */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
            <div className="flex items-center gap-3">
              <img src={post.authorAvatar} alt={post.author} className="w-11 h-11 rounded-full object-cover" />
              <div>
                <div className="font-semibold text-sm">{post.author}</div>
                <div className="text-xs text-muted-foreground">Wellness Contributor · YogicTown</div>
              </div>
            </div>
            <button onClick={handleShare} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors">
              <Share2 size={14} /> Share
            </button>
          </div>

          {/* Article Content */}
          <div className="prose-custom space-y-5 text-muted-foreground leading-relaxed text-base">
            <p className="text-lg font-medium text-foreground">{post.excerpt}</p>
            <p>Yoga has been practiced for thousands of years, and modern science is only beginning to understand the profound effects it has on the human body and mind. Research from leading institutions consistently shows that a regular yoga practice produces measurable changes in brain structure, hormonal balance, and cardiovascular health.</p>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">The Neuroscience of Consistent Practice</h2>
            <p>When we practice yoga regularly, particularly in the morning hours when cortisol levels are naturally rising, we engage the hypothalamic-pituitary-adrenal (HPA) axis in a uniquely beneficial way. Unlike intense cardio that can spike cortisol further, yoga's combination of movement, breathwork, and mindful attention creates what researchers call "eustress" — beneficial stress that strengthens the body's adaptive capacity.</p>
            <p>Studies using functional MRI have documented increased gray matter density in the insula and prefrontal cortex of long-term practitioners. These areas govern self-awareness, emotional regulation, and executive decision-making — the very capacities most depleted by modern workplace stress.</p>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Building Your Practice</h2>
            <p>The key to unlocking these benefits lies in consistency over intensity. A 30-minute daily practice will produce more lasting transformation than occasional 90-minute sessions. Begin with simple foundational poses — Tadasana, Balasana, Adho Mukha Svanasana — and build from there as your body adapts and strengthens.</p>
            <p>The breath is your anchor. In every pose, every transition, and every moment of stillness, the breath serves as your most reliable guide. When breathing becomes labored or constricted, you have found your edge — the threshold between effort and injury. Practice here, at the edge, with curiosity rather than force.</p>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Integration with Daily Life</h2>
            <p>Perhaps the most underappreciated aspect of yoga practice is its capacity to transform how we move through ordinary moments. The body awareness cultivated on the mat — the attention to alignment, the sensitivity to sensation — gradually permeates daily life. How you sit at your desk, how you carry groceries, how you breathe during a difficult conversation: all of these shift when yoga becomes a genuine daily practice rather than a workout.</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
            {post.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 tag-pill">
                <Tag size={10} /> {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        <section className="py-12 px-4 md:px-8" style={{ background: 'hsl(133 20% 96%)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-7">
              <BookOpen size={18} style={{ color: 'hsl(133 18% 59%)' }} />
              <h2 className="text-2xl font-bold">Related Articles</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rp) => (
                <Link key={rp.id} to={`/blog/${rp.id}`} className="card-wellness group overflow-hidden p-0">
                  <div className="aspect-video overflow-hidden">
                    <img src={rp.thumbnail} alt={rp.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <div className="tag-pill mb-2 w-fit">{rp.category}</div>
                    <h3 className="font-semibold text-sm leading-snug mb-2 line-clamp-2">{rp.title}</h3>
                    <div className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={10} /> {rp.readTime}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default BlogPost;
