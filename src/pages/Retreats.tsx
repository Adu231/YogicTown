import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { useScrollTop } from '@/hooks/useScrollTop';
import { MapPin, Calendar, Star, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RETREATS } from '@/constants';
import { toast } from 'sonner';
import retreatImage from '@/assets/retreat-landscape.jpg';

const Retreats = () => {
  useScrollTop();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative min-h-[50vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={retreatImage} alt="Retreats" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,25,18,0.85) 0%, rgba(10,25,18,0.4) 100%)' }} />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-16 text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm mb-5" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}>
              <MapPin size={13} /> Wellness Retreats Worldwide
            </div>
            <h1 className="text-5xl font-bold mb-5 leading-tight">
              Discover Life-Changing<br />
              <span style={{ color: 'hsl(45 61% 80%)' }}>Retreat Experiences</span>
            </h1>
            <p className="text-xl text-white/75 max-w-xl mb-8">Handpicked yoga and wellness retreats in the world's most sacred destinations. From Rishikesh ashrams to Bali sanctuaries.</p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm"><Star size={14} fill="currentColor" style={{ color: 'hsl(45 61% 78%)' }} /> 4.9 average retreat rating</div>
              <div className="flex items-center gap-2 text-sm"><Users size={14} /> 8,500+ retreat alumni</div>
              <div className="flex items-center gap-2 text-sm"><Calendar size={14} /> 100+ upcoming dates</div>
            </div>
          </div>
        </section>

        {/* Retreat Cards */}
        <section className="section-padding bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-1">Upcoming Retreats</h2>
                <p className="text-muted-foreground text-sm">Reserve your spot — spaces fill quickly</p>
              </div>
              <div className="tag-pill">Yogi plan: 15% off · Master: 30% off</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {RETREATS.map((retreat) => (
                <div key={retreat.id} className="card-wellness overflow-hidden p-0 group">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={retreat.image} alt={retreat.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute top-3 left-3">
                      <div className="tag-orange">{retreat.spots} spots left</div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-base leading-snug flex-1 pr-2">{retreat.title}</h3>
                      <div className="flex items-center gap-1 shrink-0">
                        <Star size={13} fill="currentColor" style={{ color: 'hsl(27 87% 67%)' }} />
                        <span className="text-sm font-semibold">{retreat.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <MapPin size={12} /> {retreat.location}
                      <span className="mx-1">·</span>
                      <Calendar size={12} /> {retreat.dates}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {retreat.highlights.slice(0, 3).map((h) => (
                        <div key={h} className="tag-pill text-xs">{h}</div>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground mb-4">Led by <strong>{retreat.instructor}</strong></div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'hsl(133 20% 40%)' }}>${retreat.price.toLocaleString()}</span>
                        <span className="text-xs text-muted-foreground ml-1">/ person</span>
                      </div>
                      <button onClick={() => toast.success(`Booking request sent for ${retreat.title}!`)}
                        className="btn-accent text-xs px-4 py-2">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Partner CTA */}
            <div className="rounded-3xl p-8 md:p-10 text-center border border-border" style={{ background: 'hsl(133 20% 96%)' }}>
              <h2 className="text-3xl font-bold mb-3">Are You a Retreat Organizer?</h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">List your retreat on YogicTown and reach 120,000+ wellness seekers. We handle discovery, booking, and payments.</p>
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Partner With Us <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Retreats;
