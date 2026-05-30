import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { useScrollTop } from '@/hooks/useScrollTop';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import { MapPin, Calendar, Star, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RETREATS } from '@/constants';
import { toast } from 'sonner';
import { Modal, FormField, inputClass, selectClass, textareaClass } from '@/components/features/Modal';
import retreatImage from '@/assets/retreat-landscape.jpg';

const Retreats = () => {
  useScrollTop();
  const { isDark } = useTheme();
  const { user } = useAuth();

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedRetreat, setSelectedRetreat] = useState<typeof RETREATS[0] | null>(null);
  const [bookingForm, setBookingForm] = useState({ name: '', email: '', phone: '', guests: 1, notes: '' });

  const handleOpenBooking = (retreat: typeof RETREATS[0]) => {
    setSelectedRetreat(retreat);
    setBookingForm({
      name: user ? user.name : '',
      email: user ? user.email : '',
      phone: '',
      guests: 1,
      notes: ''
    });
    setBookingModalOpen(true);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email || !bookingForm.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    const nextIdNum = Math.floor(100 + Math.random() * 900);
    const bookingId = `BK${nextIdNum}`;

    const storedBookingsRaw = localStorage.getItem('organizer_bookings');
    let bookingsList = [];
    if (storedBookingsRaw) {
      try { bookingsList = JSON.parse(storedBookingsRaw); } catch { bookingsList = []; }
    } else {
      bookingsList = [
        { id: 'BK001', guest: 'Meera Singh', email: 'meera@ex.com', phone: '+91 98765 43210', retreat: 'Sacred Valley Yoga & Meditation Retreat', date: 'Jun 10, 2026', amount: 1299, status: 'confirmed', guests: 1, avatar: 'https://ui-avatars.com/api/?name=Meera+Singh&background=84A98C&color=fff', notes: 'Vegetarian meal preference.' },
        { id: 'BK002', guest: 'Rahul Sharma', email: 'rahul.s@ex.com', phone: '+91 87654 32109', retreat: 'Bali Sunrise Wellness Journey', date: 'Jun 8, 2026', amount: 2199, status: 'confirmed', guests: 1, avatar: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=F4A261&color=fff', notes: 'First-time experience.' },
        { id: 'BK003', guest: 'Anjali Patel', email: 'anjali@ex.com', phone: '+91 76543 21098', retreat: 'Himalayan Spiritual Immersion', date: 'Jun 5, 2026', amount: 999, status: 'pending', guests: 2, avatar: 'https://ui-avatars.com/api/?name=Anjali+Patel&background=5B8FB9&color=fff', notes: 'Booking for 2 guests.' }
      ];
    }

    const amount = selectedRetreat ? selectedRetreat.price * bookingForm.guests : 0;
    const newBooking = {
      id: bookingId,
      guest: bookingForm.name,
      email: bookingForm.email,
      phone: bookingForm.phone,
      retreat: selectedRetreat ? selectedRetreat.title : '',
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      amount: amount,
      status: 'pending',
      guests: Number(bookingForm.guests),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(bookingForm.name)}&background=84A98C&color=fff`,
      notes: bookingForm.notes
    };

    bookingsList = [newBooking, ...bookingsList];
    localStorage.setItem('organizer_bookings', JSON.stringify(bookingsList));

    const storedNotifsRaw = localStorage.getItem('organizer_notifications');
    let organizerNotifs = [];
    if (storedNotifsRaw) {
      try { organizerNotifs = JSON.parse(storedNotifsRaw); } catch { organizerNotifs = []; }
    }
    const newNotif = {
      id: Date.now(),
      title: 'New Booking Request! 🧘',
      desc: `${bookingForm.name} requested to book ${selectedRetreat?.title} for ${bookingForm.guests} guest(s).`,
      time: 'Just now',
      read: false
    };
    organizerNotifs = [newNotif, ...organizerNotifs];
    localStorage.setItem('organizer_notifications', JSON.stringify(organizerNotifs));

    setBookingModalOpen(false);
    toast.success(`Booking request submitted successfully for ${selectedRetreat?.title}!`);
  };

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
                      <button onClick={() => handleOpenBooking(retreat)}
                        className="btn-accent text-xs px-4 py-2">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Partner CTA */}
            <div className="rounded-3xl p-8 md:p-10 text-center border border-border" style={{ background: isDark ? 'hsl(150 12% 14%)' : 'hsl(133 20% 96%)' }}>
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

      {/* Retreat Booking Modal */}
      <Modal 
        open={bookingModalOpen} 
        onClose={() => setBookingModalOpen(false)} 
        title="Book Retreat Spot" 
        subtitle={selectedRetreat?.title}
        accentColor="hsl(133 18% 59%)"
      >
        {selectedRetreat && (
          <form onSubmit={handleConfirmBooking} className="space-y-4">
            <div className="p-4 rounded-xl bg-muted/40 flex justify-between items-center mb-4">
              <div>
                <span className="text-xs text-muted-foreground block">Selected Retreat Price</span>
                <span className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'hsl(133 20% 40%)' }}>
                  ${selectedRetreat.price} <span className="text-xs text-muted-foreground font-normal">/ person</span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-muted-foreground block">Led by</span>
                <span className="text-sm font-semibold">{selectedRetreat.instructor}</span>
              </div>
            </div>

            <FormField label="Full Name" required>
              <input 
                type="text" 
                value={bookingForm.name} 
                onChange={e => setBookingForm(p => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Meera Singh" 
                className={inputClass}
                required
              />
            </FormField>

            <FormField label="Email Address" required>
              <input 
                type="email" 
                value={bookingForm.email} 
                onChange={e => setBookingForm(p => ({ ...p, email: e.target.value }))}
                placeholder="meera@example.com" 
                className={inputClass}
                required
              />
            </FormField>

            <FormField label="Phone Number" required>
              <input 
                type="tel" 
                value={bookingForm.phone} 
                onChange={e => setBookingForm(p => ({ ...p, phone: e.target.value }))}
                placeholder="+91 98765 43210" 
                className={inputClass}
                required
              />
            </FormField>

            <FormField label="Number of Guests" required>
              <select 
                value={bookingForm.guests} 
                onChange={e => setBookingForm(p => ({ ...p, guests: Number(e.target.value) }))}
                className={selectClass}
              >
                {[1, 2, 3, 4, 5].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </FormField>

            <FormField label="Special Requests / Dietary Preferences">
              <textarea 
                value={bookingForm.notes} 
                onChange={e => setBookingForm(p => ({ ...p, notes: e.target.value }))}
                placeholder="e.g., Vegetarian meals, quiet room requested..." 
                rows={3} 
                className={textareaClass}
              />
            </FormField>

            <div className="pt-4 flex justify-between items-center border-t border-border mt-6">
              <div>
                <span className="text-xs text-muted-foreground block">Total Amount</span>
                <span className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'hsl(133 20% 40%)' }}>
                  ${(selectedRetreat.price * bookingForm.guests).toLocaleString()}
                </span>
              </div>
              <div className="flex gap-2">
                <button 
                  type="button" 
                  onClick={() => setBookingModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl text-sm font-semibold border border-border hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="py-2.5 px-6 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: 'hsl(133 18% 59%)' }}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default Retreats;
