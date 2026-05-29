import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { useScrollTop } from '@/hooks/useScrollTop';
import { CTABannerSection } from '@/components/features/CTABannerSection';
import { Link } from 'react-router-dom';
import { Brain, Heart, Users, Video, Calendar, BarChart3, Leaf, Zap, Shield, Smartphone, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const FEATURE_SECTIONS = [
  {
    icon: Leaf, color: 'hsl(133 18% 59%)', bg: 'hsl(133 20% 92%)',
    title: 'Yoga Learning Platform',
    tagline: 'From first downward dog to advanced inversions',
    description: 'Our comprehensive yoga library spans 2,500+ classes across Hatha, Vinyasa, Ashtanga, Kundalini, Yin, Restorative, and more. Structured beginner to advanced programs designed by our expert instructors ensure you progress safely and effectively.',
    features: ['2,500+ on-demand yoga classes', '30+ structured programs', 'Asana library with 500+ poses', 'Real-time pose guidance', 'Daily practice plans', 'Challenge programs with community'],
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80',
  },
  {
    icon: Brain, color: 'hsl(220 70% 60%)', bg: 'hsl(220 70% 95%)',
    title: 'Meditation & Mindfulness Center',
    tagline: 'Science-backed programs for mental clarity',
    description: 'Over 300 guided meditation sessions for every goal — sleep improvement, stress relief, focus enhancement, and spiritual growth. Our mindfulness center includes breathing exercises, sound healing, and structured 30-day courses.',
    features: ['300+ guided meditations', 'Sleep meditation programs', 'Breathing exercise library', 'Sound healing sessions', '30-day mindfulness courses', 'Stress relief toolkit'],
    image: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=600&q=80',
  },
  {
    icon: Zap, color: 'hsl(27 87% 67%)', bg: 'hsl(27 87% 93%)',
    title: 'AI Wellness Coach',
    tagline: 'Your always-available personal guide',
    description: 'Our AI analyzes your wellness profile, progress data, and daily feedback to generate deeply personalized recommendations. Ask any wellness question, get habit improvement suggestions, nutrition guidance, and adaptive practice plans that evolve as you grow.',
    features: ['Daily personalized recommendations', 'Nutrition & meal guidance', 'Habit tracking & coaching', 'Intelligent practice scheduling', 'Wellness Q&A chat', 'Progress-adaptive plans'],
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&q=80',
  },
  {
    icon: Users, color: 'hsl(280 60% 65%)', bg: 'hsl(280 60% 95%)',
    title: 'Instructor Marketplace',
    tagline: 'Connect with the world\'s best yoga teachers',
    description: 'Browse 500+ certified instructors with verified credentials, detailed profiles, and genuine student reviews. Book one-on-one private sessions or join specialized group classes. Every instructor undergoes a rigorous vetting process.',
    features: ['500+ certified instructors', 'Credential verification badge', 'Private 1-on-1 sessions', 'Group classes & workshops', 'Flexible scheduling system', 'Secure in-app payments'],
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80',
  },
  {
    icon: Video, color: 'hsl(0 70% 60%)', bg: 'hsl(0 70% 95%)',
    title: 'Live Virtual Studio',
    tagline: 'Real-time yoga from anywhere in the world',
    description: 'Join live interactive yoga classes with real-time instructor feedback. Attend virtual workshops, webinars, and spiritual sessions from anywhere. Premium members get unlimited live class access plus a growing library of 1,000+ recordings.',
    features: ['Daily live yoga classes', 'Interactive workshops', 'Virtual retreat experiences', '1,000+ recorded sessions', 'Real-time instructor feedback', 'Multi-timezone scheduling'],
    image: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=600&q=80',
  },
  {
    icon: Calendar, color: 'hsl(160 60% 40%)', bg: 'hsl(160 60% 92%)',
    title: 'Retreat & Event Discovery',
    tagline: 'Life-changing wellness journeys worldwide',
    description: 'Discover curated retreats from Rishikesh to Bali, Tuscany to Costa Rica. Browse detailed itineraries, real reviews, and transparent pricing. Book with confidence through our secure platform — Yogi and Master plan members receive exclusive discounts.',
    features: ['100+ global retreat listings', 'Detailed itineraries & reviews', 'Secure booking system', 'Wellness festival calendar', 'Retreat package options', 'Member discounts up to 30%'],
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80',
  },
];

const TECHNICAL_FEATURES = [
  { icon: Shield, title: 'Privacy First', desc: 'End-to-end encryption for all health data. GDPR & HIPAA aligned.' },
  { icon: Smartphone, title: 'Mobile Optimized', desc: 'Native-quality experience on iOS and Android via our web app.' },
  { icon: BarChart3, title: 'Deep Analytics', desc: 'Detailed wellness reports, habit tracking, and progress visualization.' },
  { icon: Heart, title: 'Health Integrations', desc: 'Connect Apple Health, Google Fit, and popular smartwatches.' },
];

const FeaturesPage = () => {
  useScrollTop();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="section-padding" style={{ background: 'linear-gradient(135deg, hsl(133 20% 96%) 0%, hsl(60 17% 98%) 100%)' }}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="tag-pill mx-auto mb-5 w-fit"><Leaf size={12} /> Platform Features</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Everything You Need for<br />
              <span className="italic" style={{ color: 'hsl(27 87% 60%)' }}>Complete Wellness</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
              A fully integrated wellness ecosystem — yoga, meditation, AI coaching, live classes, retreats, and community — all in one thoughtfully designed platform.
            </p>
            <Link to={user ? "/dashboard" : "/register"} className="btn-accent inline-flex">
              Start Free Today <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Feature Sections */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 space-y-20">
          {FEATURE_SECTIONS.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={i} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: feature.bg }}>
                    <Icon size={22} style={{ color: feature.color }} />
                  </div>
                  <div className="text-xs font-medium mb-2 uppercase tracking-wider text-muted-foreground">{feature.tagline}</div>
                  <h2 className="text-3xl font-bold mb-4">{feature.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{feature.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                    {feature.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: feature.color }} />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`rounded-3xl overflow-hidden aspect-[16/10] ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
                </div>
              </div>
            );
          })}
        </section>

        {/* Technical Features */}
        <section className="section-padding" style={{ background: 'hsl(133 20% 96%)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Built for Real Life</h2>
              <p className="text-muted-foreground">Technical excellence that supports your practice everywhere, every day.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {TECHNICAL_FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="card-wellness text-center">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: 'hsl(133 20% 92%)' }}>
                      <Icon size={20} style={{ color: 'hsl(133 18% 59%)' }} />
                    </div>
                    <h3 className="font-semibold mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                );
              })}
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

export default FeaturesPage;
