import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { useScrollTop } from '@/hooks/useScrollTop';
import { PricingSection } from '@/components/features/PricingSection';
import { FAQSection } from '@/components/features/FAQSection';
import { TestimonialsSection } from '@/components/features/TestimonialsSection';
import { CTABannerSection } from '@/components/features/CTABannerSection';
import { Leaf, Check } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const COMPARISON = [
  { feature: 'Free yoga classes', seeker: '20+', practitioner: 'Unlimited', yogi: 'Unlimited', master: 'Unlimited' },
  { feature: 'Meditation library', seeker: 'Basic', practitioner: 'Full', yogi: 'Full', master: 'Full' },
  { feature: 'Live classes/month', seeker: '—', practitioner: '4', yogi: 'Unlimited', master: 'Unlimited' },
  { feature: 'AI Wellness Coach', seeker: '—', practitioner: 'Basic', yogi: 'Advanced', master: 'Premium' },
  { feature: '1-on-1 sessions/month', seeker: '—', practitioner: '—', yogi: '2', master: 'Unlimited' },
  { feature: 'Retreat discounts', seeker: '—', practitioner: '—', yogi: '15%', master: '30%' },
  { feature: 'Family sharing', seeker: '—', practitioner: '—', yogi: '2 members', master: '5 members' },
  { feature: 'Analytics dashboard', seeker: 'Basic', practitioner: 'Standard', yogi: 'Advanced', master: 'Full' },
  { feature: 'Downloadable content', seeker: '—', practitioner: '—', yogi: true, master: true },
  { feature: 'Priority support', seeker: '—', practitioner: true, yogi: true, master: 'White-glove' },
];

const PricingPage = () => {
  useScrollTop();
  const { isDark } = useTheme();

  const renderVal = (val: string | boolean | undefined) => {
    if (val === true) return <Check size={16} style={{ color: 'hsl(133 18% 59%)' }} className="mx-auto" />;
    if (val === '—' || !val) return <span className="text-muted-foreground/40 text-sm">—</span>;
    return <span className="text-sm">{val}</span>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="section-padding" style={{ background: isDark ? 'linear-gradient(135deg, hsl(150 15% 12%) 0%, hsl(150 15% 8%) 100%)' : 'linear-gradient(135deg, hsl(133 20% 96%) 0%, hsl(60 17% 98%) 100%)' }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="tag-pill mx-auto mb-5 w-fit"><Leaf size={12} /> Membership Plans</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-foreground">
              Invest in Your<br />
              <span className="italic" style={{ color: 'hsl(27 87% 60%)' }}>Wellbeing</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Simple transparent pricing with a free plan that never expires. Upgrade when you are ready, cancel anytime.
            </p>
          </div>
        </section>

        <PricingSection />

        {/* Comparison Table */}
        <section className="section-padding bg-background">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">Feature Comparison</h2>
              <p className="text-muted-foreground">See exactly what is included in each plan.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Feature</th>
                    {['Seeker', 'Practitioner', 'Yogi', 'Master'].map((p) => (
                      <th key={p} className={`text-center py-3 px-3 font-semibold ${p === 'Yogi' ? 'text-primary' : ''}`}
                        style={p === 'Yogi' ? { color: 'hsl(133 18% 59%)' } : {}}>{p}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr key={i} className={`border-b border-border/50 ${i % 2 === 0 ? 'bg-muted/20' : ''}`}>
                      <td className="py-3 px-4 text-muted-foreground">{row.feature}</td>
                      <td className="py-3 px-3 text-center">{renderVal(row.seeker)}</td>
                      <td className="py-3 px-3 text-center">{renderVal(row.practitioner)}</td>
                      <td className="py-3 px-3 text-center" style={{ background: isDark ? 'hsl(150 12% 14%)' : 'hsl(133 20% 98%)' }}>{renderVal(row.yogi)}</td>
                      <td className="py-3 px-3 text-center">{renderVal(row.master)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <TestimonialsSection />
        <FAQSection />
        <CTABannerSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default PricingPage;
