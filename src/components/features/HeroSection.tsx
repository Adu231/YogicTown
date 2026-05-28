import { Link } from 'react-router-dom';
import { Play, Star, ArrowRight, Sparkles } from 'lucide-react';
import heroImage from '@/assets/hero-yoga.jpg';
import { AnimatedCounter } from './AnimatedCounter';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Yoga practice" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(250,250,247,0.92) 0%, rgba(200,225,210,0.75) 50%, rgba(250,250,247,0.4) 100%)' }} />
        <div className="absolute inset-0 dark:block hidden" style={{ background: 'linear-gradient(135deg, rgba(10,20,15,0.92) 0%, rgba(15,30,22,0.85) 50%, rgba(10,20,15,0.7) 100%)' }} />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-24 right-12 w-72 h-72 rounded-full opacity-20 animate-spin-slow"
        style={{ background: 'radial-gradient(circle, hsl(133 18% 59%) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-16 left-8 w-48 h-48 rounded-full opacity-15 animate-float"
        style={{ background: 'radial-gradient(circle, hsl(27 87% 67%) 0%, transparent 70%)', filter: 'blur(30px)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-16">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium" 
            style={{ background: 'hsl(133 20% 92%)', color: 'hsl(133 20% 35%)' }}>
            <Sparkles size={14} />
            AI-Powered Wellness Platform
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            Find Your <br />
            <span style={{ color: 'hsl(133 20% 40%)' }}>Inner Peace</span>{' '}
            <span className="italic" style={{ color: 'hsl(27 87% 60%)' }}>Here</span>
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
            Connect with certified yoga instructors, attend live classes, discover retreats worldwide, and let your personalized AI wellness coach guide every step of your journey.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Link to="/register" className="btn-accent text-base px-8 py-3.5">
              Begin Your Journey <ArrowRight size={18} />
            </Link>
            <button className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl border border-border bg-background/70 backdrop-blur-sm hover:bg-background/90 transition-all duration-200 text-sm font-medium">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'hsl(133 18% 59%)' }}>
                <Play size={14} className="text-white ml-0.5" fill="white" />
              </div>
              Watch Demo
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex -space-x-2">
              {[
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=80',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80',
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&q=80',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=80',
              ].map((src, i) => (
                <img key={i} src={src} alt="" className="w-9 h-9 rounded-full border-2 border-background object-cover" />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-current" style={{ color: 'hsl(27 87% 67%)' }} />
                ))}
                <span className="text-sm font-semibold ml-1">4.9/5</span>
              </div>
              <p className="text-xs text-muted-foreground">Trusted by <strong>120,000+</strong> practitioners</p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: 120000, suffix: '+', label: 'Active Practitioners' },
            { value: 2500, suffix: '+', label: 'Yoga Classes' },
            { value: 500, suffix: '+', label: 'Certified Instructors' },
            { value: 98, suffix: '%', label: 'Satisfaction Rate' },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-5 text-center">
              <div className="text-3xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: 'hsl(133 20% 40%)' }}>
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
