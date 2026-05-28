import { Link } from 'react-router-dom';
import { Brain, Heart, Users, Video, Calendar, BarChart3, Leaf, Zap, ArrowRight } from 'lucide-react';

const FEATURES = [
  {
    icon: Leaf,
    title: 'Yoga Learning Platform',
    description: 'From beginner fundamentals to advanced asana mastery — structured programs designed by RYT-certified instructors.',
    color: 'hsl(133 18% 59%)',
    bg: 'hsl(133 20% 92%)',
    href: '/features',
  },
  {
    icon: Brain,
    title: 'Meditation & Mindfulness',
    description: 'Guided sessions, breathing exercises, sleep meditations, and sound healing for complete mental wellness.',
    color: 'hsl(220 70% 60%)',
    bg: 'hsl(220 70% 95%)',
    href: '/features',
  },
  {
    icon: Zap,
    title: 'AI Wellness Coach',
    description: 'Personalized daily guidance powered by AI — nutrition tips, habit coaching, and adaptive wellness plans.',
    color: 'hsl(27 87% 67%)',
    bg: 'hsl(27 87% 93%)',
    href: '/features',
  },
  {
    icon: Users,
    title: 'Instructor Marketplace',
    description: 'Browse 500+ certified yoga instructors. Book 1-on-1 sessions or join curated group classes.',
    color: 'hsl(280 60% 65%)',
    bg: 'hsl(280 60% 95%)',
    href: '/instructors',
  },
  {
    icon: Video,
    title: 'Live Virtual Studio',
    description: 'Attend interactive live classes, workshops, and virtual retreats from anywhere in the world.',
    color: 'hsl(0 70% 60%)',
    bg: 'hsl(0 70% 95%)',
    href: '/features',
  },
  {
    icon: Calendar,
    title: 'Retreat Discovery',
    description: 'Curated wellness retreats and spiritual events globally — from Rishikesh to Bali. Book with confidence.',
    color: 'hsl(160 60% 40%)',
    bg: 'hsl(160 60% 92%)',
    href: '/retreats',
  },
  {
    icon: Heart,
    title: 'Nutrition & Ayurveda',
    description: 'Personalized meal plans, Ayurvedic recommendations, and holistic diet tracking for body-mind alignment.',
    color: 'hsl(340 70% 60%)',
    bg: 'hsl(340 70% 95%)',
    href: '/features',
  },
  {
    icon: BarChart3,
    title: 'Wellness Analytics',
    description: 'Track your yoga progress, meditation streaks, wellness scores, and holistic health improvement over time.',
    color: 'hsl(45 80% 50%)',
    bg: 'hsl(45 80% 93%)',
    href: '/dashboard',
  },
];

export function FeaturesSection() {
  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="tag-pill mx-auto mb-4">
            <Leaf size={12} /> Complete Wellness Ecosystem
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything Your Wellness Journey <br />
            <span className="italic" style={{ color: 'hsl(27 87% 60%)' }}>Needs to Thrive</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            One platform integrating yoga, meditation, nutrition, community, and AI guidance for a truly holistic practice.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Link
                key={i}
                to={feature.href}
                className="card-wellness group cursor-pointer"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-200"
                  style={{ background: feature.bg }}
                >
                  <Icon size={20} style={{ color: feature.color }} />
                </div>
                <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: feature.color }}>
                  Learn more <ArrowRight size={12} />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link to="/features" className="btn-primary inline-flex">
            Explore All Features <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
