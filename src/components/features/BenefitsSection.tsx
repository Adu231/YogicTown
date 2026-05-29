import meditationImage from '@/assets/meditation-group.jpg';
import { CheckCircle, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const BENEFITS_LEFT = [
  'Reduce stress and anxiety by 60% within 8 weeks',
  'Improve flexibility and strength through structured programs',
  'Build a consistent daily practice with smart reminders',
  'Access expert guidance without expensive studio memberships',
];

const BENEFITS_RIGHT = [
  'Connect with a global community of 120,000+ practitioners',
  'Personalized programs that evolve as you grow',
  'Holistic approach: mind, body, spirit, and nutrition',
  'Track real progress with science-backed wellness metrics',
];

const STATS = [
  { value: '8 Weeks', label: 'Average transformation time' },
  { value: '92%', label: 'Report reduced stress' },
  { value: '3.2×', label: 'More consistent practice' },
  { value: '4.9★', label: 'Average instructor rating' },
];

export function BenefitsSection() {
  const { user } = useAuth();
  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Column */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <img src={meditationImage} alt="Group meditation" className="w-full h-full object-cover" />
              <div className="absolute inset-0 rounded-3xl" style={{ background: 'linear-gradient(to top, rgba(20,40,30,0.4) 0%, transparent 60%)' }} />
            </div>

            {/* Floating stat cards */}
            <div className="absolute -top-4 -right-4 glass-card p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'hsl(133 18% 59%)' }}>
                  <Leaf size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>120K+</div>
                  <div className="text-xs text-muted-foreground">Practitioners</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 glass-card p-4 shadow-xl">
              <div className="text-sm font-semibold mb-1">Daily Sessions Today</div>
              <div className="text-2xl font-bold" style={{ color: 'hsl(27 87% 67%)', fontFamily: 'Playfair Display, serif' }}>8,420</div>
              <div className="flex gap-1 mt-1">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="flex-1 h-1 rounded-full" style={{ background: `hsl(133 18% ${40 + i * 8}%)` }} />
                ))}
              </div>
            </div>

            {/* Decorative ring */}
            <div className="absolute -z-10 inset-6 rounded-3xl border-2 border-dashed opacity-30" style={{ borderColor: 'hsl(133 18% 59%)' }} />
          </div>

          {/* Content Column */}
          <div>
            <div className="tag-pill mb-4">
              <CheckCircle size={12} /> Why 120,000+ Choose YogicTown
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Real Transformation,<br />
              <span className="italic" style={{ color: 'hsl(27 87% 60%)' }}>Not Just Fitness</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              YogicTown is not just a workout app. It is a complete wellness ecosystem built on ancient wisdom, modern science, and compassionate community.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {[...BENEFITS_LEFT, ...BENEFITS_RIGHT].map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: 'hsl(133 18% 59%)' }} />
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {STATS.map((stat, i) => (
                <div key={i} className="p-4 rounded-xl border border-border bg-muted/30">
                  <div className="text-2xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: 'hsl(133 20% 40%)' }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            <Link to={user ? "/dashboard" : "/register"} className="btn-accent inline-flex">
              Start Your Free Journey Today
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
