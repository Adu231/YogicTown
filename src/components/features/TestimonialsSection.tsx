import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/constants';

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  return (
    <section className="section-padding bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="tag-pill mx-auto mb-4 w-fit">
            <Star size={12} /> Community Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Voices of Our<br />
            <span className="italic" style={{ color: 'hsl(27 87% 60%)' }}>Wellness Community</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Real practitioners sharing authentic stories of transformation through yoga, meditation, and holistic living.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.id} className={`card-wellness relative ${i === 0 ? 'lg:col-span-1 row-span-1' : ''}`}>
              <Quote size={28} className="mb-3 opacity-30" style={{ color: 'hsl(133 18% 59%)' }} />
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
                <div className="ml-auto flex">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={12} fill="currentColor" style={{ color: 'hsl(27 87% 67%)' }} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="card-wellness mx-4">
            <Quote size={28} className="mb-3 opacity-30" style={{ color: 'hsl(133 18% 59%)' }} />
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">&ldquo;{TESTIMONIALS[current].text}&rdquo;</p>
            <div className="flex items-center gap-3">
              <img src={TESTIMONIALS[current].avatar} alt={TESTIMONIALS[current].name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <div className="text-sm font-semibold">{TESTIMONIALS[current].name}</div>
                <div className="text-xs text-muted-foreground">{TESTIMONIALS[current].role}</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{ background: i === current ? 'hsl(133 18% 59%)' : 'hsl(60 15% 88%)' }} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Trust bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
          {[
            { text: '4.9/5 Average Rating', icon: '⭐' },
            { text: '120,000+ Active Members', icon: '🧘' },
            { text: 'Featured in Forbes & Vogue', icon: '📰' },
            { text: 'No.1 Wellness App 2025', icon: '🏆' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{item.icon}</span>
              <span className="font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
