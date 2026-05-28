import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';
import { PRICING_PLANS } from '@/constants';
import { useAuth } from '@/hooks/useAuth';

export function PricingSection() {
  const { user } = useAuth();
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="section-padding" style={{ background: 'hsl(60 17% 98%)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="tag-pill mx-auto mb-4 w-fit">
            <Sparkles size={12} /> Membership Plans
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent<br />
            <span className="italic" style={{ color: 'hsl(27 87% 60%)' }}>Pricing</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg mb-8">
            Start free, upgrade when you are ready. No hidden fees, no lock-ins.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-xl bg-muted">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${!isYearly ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${isYearly ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}
            >
              Yearly
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'hsl(133 20% 92%)', color: 'hsl(133 20% 35%)' }}>
                Save 25%
              </span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border p-6 transition-all duration-300 ${
                plan.highlighted
                  ? 'shadow-2xl scale-105'
                  : 'bg-card hover:shadow-lg'
              }`}
              style={plan.highlighted ? {
                background: 'linear-gradient(145deg, hsl(133 18% 59%), hsl(133 22% 48%))',
                borderColor: 'transparent',
                color: 'white',
              } : {}}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: 'hsl(27 87% 67%)', color: 'white' }}>
                  {plan.badge}
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-lg font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>{plan.name}</h3>
                <p className={`text-xs leading-relaxed ${plan.highlighted ? 'text-white/75' : 'text-muted-foreground'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                    ${isYearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className={`text-sm mb-1.5 ${plan.highlighted ? 'text-white/70' : 'text-muted-foreground'}`}>
                      /mo
                    </span>
                  )}
                </div>
                {isYearly && plan.price.monthly > 0 && (
                  <div className={`text-xs ${plan.highlighted ? 'text-white/70' : 'text-muted-foreground'}`}>
                    Billed ${plan.price.yearly * 12}/year
                  </div>
                )}
              </div>

              <ul className="space-y-2.5 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check size={14} className={`shrink-0 mt-0.5 ${plan.highlighted ? 'text-white' : ''}`}
                      style={!plan.highlighted ? { color: 'hsl(133 18% 59%)' } : {}} />
                    <span className={plan.highlighted ? 'text-white/90' : 'text-muted-foreground'}>{feature}</span>
                  </li>
                ))}
              </ul>

              {user ? (
                <Link
                  to="/payment"
                  state={{ planId: plan.id, isYearly }}
                  className={`block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    plan.highlighted
                      ? 'bg-white hover:bg-white/90'
                      : 'hover:opacity-90'
                  }`}
                  style={plan.highlighted
                    ? { color: 'hsl(133 18% 59%)' }
                    : { background: 'hsl(133 18% 59%)', color: 'white' }
                  }
                >
                  {plan.id === 'free' ? 'Activate Seeker Plan' : 'Subscribe & Align Now'}
                </Link>
              ) : (
                <Link
                  to={plan.id === 'free' ? '/register' : '/register'}
                  className={`block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    plan.highlighted
                      ? 'bg-white hover:bg-white/90'
                      : 'hover:opacity-90'
                  }`}
                  style={plan.highlighted
                    ? { color: 'hsl(133 18% 59%)' }
                    : { background: 'hsl(133 18% 59%)', color: 'white' }
                  }
                >
                  {plan.id === 'free' ? 'Get Started Free' : 'Start 7-Day Trial'}
                </Link>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          All plans include a 7-day free trial. No credit card required for the Seeker plan.
        </p>
      </div>
    </section>
  );
}
