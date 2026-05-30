import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Leaf } from 'lucide-react';
import retreatImage from '@/assets/retreat-landscape.jpg';
import { useAuth } from '@/hooks/useAuth';

export function CTABannerSection() {
  const { user } = useAuth();
  const location = useLocation();

  const handleExplore = (e: React.MouseEvent) => {
    if (location.pathname === '/features') {
      e.preventDefault();
      const element = document.getElementById('explore-features');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  return (
    <section className="relative overflow-hidden py-24 px-4 md:px-8">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={retreatImage} alt="Retreat" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(20,40,28,0.85) 0%, rgba(30,55,40,0.75) 100%)' }} />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-8 left-8 opacity-20">
        <Leaf size={120} className="text-white rotate-12" />
      </div>
      <div className="absolute bottom-8 right-8 opacity-15">
        <Leaf size={90} className="text-white -rotate-20" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium"
          style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <span className="animate-pulse-soft inline-block w-2 h-2 rounded-full bg-green-400" />
          Join 120,000+ active practitioners
        </div>

        <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
          Begin Your Transformation<br />
          <span style={{ color: 'hsl(45 61% 80%)' }}>Today — For Free</span>
        </h2>

        <p className="text-white/75 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          No credit card required. Start with 20+ free classes, guided meditations, and your personalized wellness assessment. Upgrade anytime.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={user ? "/dashboard" : "/register"}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:scale-105"
            style={{ background: 'hsl(27 87% 67%)', color: 'white', boxShadow: '0 8px 30px rgba(244,162,97,0.4)' }}>
            Start Your Free Journey <ArrowRight size={18} />
          </Link>
          <Link to="/features" onClick={handleExplore}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:bg-white/20"
            style={{ border: '2px solid rgba(255,255,255,0.4)', color: 'white' }}>
            Explore Platform Features
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sm text-white/60">
          <span>✓ Free plan forever</span>
          <span>✓ 7-day premium trial</span>
          <span>✓ Cancel anytime</span>
          <span>✓ No hidden fees</span>
        </div>
      </div>
    </section>
  );
}
