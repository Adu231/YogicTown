import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { useScrollTop } from '@/hooks/useScrollTop';
import { useTheme } from '@/hooks/useTheme';
import { FAQSection } from '@/components/features/FAQSection';
import { CTABannerSection } from '@/components/features/CTABannerSection';
import { Link } from 'react-router-dom';
import { HelpCircle, MessageSquare, BookOpen } from 'lucide-react';

const FAQ = () => {
  useScrollTop();
  const { isDark } = useTheme();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="section-padding" style={{ background: isDark ? 'linear-gradient(135deg, hsl(150 15% 12%) 0%, hsl(150 15% 8%) 100%)' : 'linear-gradient(135deg, hsl(133 20% 96%) 0%, hsl(60 17% 98%) 100%)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="tag-pill mx-auto mb-5 w-fit"><HelpCircle size={12} /> Help Center</div>
            <h1 className="text-5xl font-bold mb-5">Frequently Asked<br /><span className="italic" style={{ color: 'hsl(27 87% 60%)' }}>Questions</span></h1>
            <p className="text-xl text-muted-foreground">Find answers to the most common questions about YogicTown, our plans, and your wellness journey.</p>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-10 px-4 md:px-8 bg-background">
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: BookOpen, title: 'Getting Started', desc: 'New to YogicTown? Start here.', href: '/register' },
              { icon: MessageSquare, title: 'Contact Support', desc: "Can't find your answer? Reach us.", href: '/contact' },
              { icon: HelpCircle, title: 'Billing Questions', desc: 'Plans, payments, and refunds.', href: '/pricing' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Link key={i} to={item.href} className="card-wellness flex items-start gap-4 hover:shadow-md">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: isDark ? 'hsl(150 12% 14%)' : 'hsl(133 20% 92%)' }}>
                    <Icon size={18} style={{ color: isDark ? 'hsl(133 25% 75%)' : 'hsl(133 18% 59%)' }} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-1">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <FAQSection />

        {/* Still need help */}
        <section className="py-12 px-4 md:px-8 bg-background">
          <div className="max-w-xl mx-auto text-center">
            <div className="card-wellness">
              <div className="text-3xl mb-3">🙏</div>
              <h3 className="text-xl font-bold mb-2">Still Have Questions?</h3>
              <p className="text-muted-foreground text-sm mb-5">Our wellness support team is available 6 days a week. We respond within 4 hours on business days.</p>
              <Link to="/contact" className="btn-primary inline-flex">Contact Our Team</Link>
            </div>
          </div>
        </section>

        <CTABannerSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default FAQ;
