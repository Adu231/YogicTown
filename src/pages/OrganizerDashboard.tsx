import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Leaf, Home, MapPin, Calendar, Users, BarChart3, Settings, LogOut,
  Menu, X, Bell, Plus, DollarSign, Star, Clock,
  Edit2, Eye, CheckCircle, Ticket, Globe, Filter, Trash2,
  Mail, Phone, Hash, FileText, Search,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import SettingsView from '@/pages/Settings';
import { ThemeToggle } from '@/components/features/ThemeToggle';
import { useScrollTop } from '@/hooks/useScrollTop';
import { Modal, FormField, inputClass, selectClass, textareaClass } from '@/components/features/Modal';
import { toast } from 'sonner';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, BarChart, Bar,
} from 'recharts';

// ─── Data ────────────────────────────────────────────────────────────────────

const bookingData = [
  { month: 'Jan', bookings: 38, revenue: 285000 },
  { month: 'Feb', bookings: 52, revenue: 390000 },
  { month: 'Mar', bookings: 41, revenue: 307500 },
  { month: 'Apr', bookings: 68, revenue: 510000 },
  { month: 'May', bookings: 74, revenue: 555000 },
  { month: 'Jun', bookings: 89, revenue: 667500 },
];

const INITIAL_RETREATS = [
  { id: 1, title: '7-Day Himalayan Yoga Retreat', location: 'Rishikesh, India', dates: 'Jul 10–17, 2026', price: 45000, spotsTotal: 20, spotsFilled: 16, status: 'open', rating: 4.9, category: 'Yoga', description: 'A transformative 7-day immersive journey into the heart of yoga, nestled in the sacred mountains of Rishikesh.', includes: 'Accommodation, Meals, Daily Yoga, Meditation' },
  { id: 2, title: 'Vipassana Meditation Intensive', location: 'Dharamshala, India', dates: 'Aug 1–10, 2026', price: 35000, spotsTotal: 15, spotsFilled: 15, status: 'full', rating: 5.0, category: 'Meditation', description: 'A 10-day silent Vipassana retreat for deep meditation practice and inner transformation.', includes: 'Accommodation, Vegetarian Meals, Guided Sessions' },
  { id: 3, title: 'Ayurvedic Detox & Wellness', location: 'Kerala, India', dates: 'Sep 5–12, 2026', price: 55000, spotsTotal: 12, spotsFilled: 6, status: 'open', rating: 4.8, category: 'Ayurveda', description: 'Rejuvenate your body and mind with traditional Panchakarma treatments and yoga by the backwaters of Kerala.', includes: 'Treatments, Accommodation, Ayurvedic Meals' },
  { id: 4, title: 'Kundalini Awakening Weekend', location: 'Mysore, India', dates: 'Jun 28–30, 2026', price: 12000, spotsTotal: 25, spotsFilled: 20, status: 'open', rating: 4.7, category: 'Spiritual', description: 'A powerful 3-day Kundalini yoga experience to awaken dormant energy and elevate consciousness.', includes: 'Daily Sessions, Lunch, Materials' },
];

const INITIAL_BOOKINGS = [
  { id: 'BK001', guest: 'Meera Singh', email: 'meera@ex.com', phone: '+91 98765 43210', retreat: '7-Day Himalayan Yoga', date: 'Jun 10, 2026', amount: 45000, status: 'confirmed', guests: 1, avatar: 'https://ui-avatars.com/api/?name=Meera+Singh&background=84A98C&color=fff', notes: 'Vegetarian meal preference. First-time retreat.' },
  { id: 'BK002', guest: 'Rahul Sharma', email: 'rahul.s@ex.com', phone: '+91 87654 32109', retreat: 'Vipassana Intensive', date: 'Jun 8, 2026', amount: 35000, status: 'confirmed', guests: 1, avatar: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=F4A261&color=fff', notes: 'Has previous Vipassana experience.' },
  { id: 'BK003', guest: 'Anjali Patel', email: 'anjali@ex.com', phone: '+91 76543 21098', retreat: 'Ayurvedic Detox', date: 'Jun 5, 2026', amount: 55000, status: 'pending', guests: 2, avatar: 'https://ui-avatars.com/api/?name=Anjali+Patel&background=5B8FB9&color=fff', notes: 'Booking for 2 guests. Payment pending confirmation.' },
  { id: 'BK004', guest: 'Kiran Shah', email: 'kiran@ex.com', phone: '+91 65432 10987', retreat: '7-Day Himalayan Yoga', date: 'Jun 3, 2026', amount: 45000, status: 'confirmed', guests: 1, avatar: 'https://ui-avatars.com/api/?name=Kiran+Shah&background=A98B84&color=fff', notes: 'Special dietary requirements.' },
  { id: 'BK005', guest: 'Deepak Kumar', email: 'deepak@ex.com', phone: '+91 54321 09876', retreat: 'Kundalini Weekend', date: 'Jun 1, 2026', amount: 12000, status: 'cancelled', guests: 1, avatar: 'https://ui-avatars.com/api/?name=Deepak+Kumar&background=84A98C&color=fff', notes: 'Cancelled due to travel constraints.' },
];

const INITIAL_EVENTS = [
  { id: 1, title: 'Wellness Summit 2026', location: 'Bangalore', date: 'Jul 25, 2026', tickets: 500, sold: 387, price: 2500, description: 'Annual wellness summit with keynote speakers, workshops, and exhibitions.' },
  { id: 2, title: 'Yoga Nidra Workshop', location: 'Online', date: 'Jun 30, 2026', tickets: 200, sold: 148, price: 800, description: 'Deep relaxation and yogic sleep practice for all levels.' },
  { id: 3, title: 'Sound Healing Festival', location: 'Pune', date: 'Aug 15, 2026', tickets: 300, sold: 201, price: 1500, description: 'A full-day immersive sound bath featuring Tibetan bowls, gongs, and kirtan.' },
];

const NAV = [
  { icon: Home, label: 'Overview', id: 'overview' },
  { icon: MapPin, label: 'Retreats', id: 'retreats' },
  { icon: Ticket, label: 'Bookings', id: 'bookings' },
  { icon: Globe, label: 'Events', id: 'events' },
  { icon: BarChart3, label: 'Analytics', id: 'analytics' },
];

const ACCENT = 'hsl(200 60% 55%)';

// ─── Component ───────────────────────────────────────────────────────────────

const OrganizerDashboard = () => {
  useScrollTop();
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('overview');

  // Data state
  const [retreats, setRetreats] = useState(() => {
    const stored = localStorage.getItem('organizer_retreats');
    if (stored) {
      try { return JSON.parse(stored); } catch { }
    }
    return INITIAL_RETREATS;
  });

  const [bookings, setBookings] = useState(() => {
    const stored = localStorage.getItem('organizer_bookings');
    if (stored) {
      try { return JSON.parse(stored); } catch { }
    }
    return INITIAL_BOOKINGS;
  });

  const [events, setEvents] = useState(() => {
    const stored = localStorage.getItem('organizer_events');
    if (stored) {
      try { return JSON.parse(stored); } catch { }
    }
    return INITIAL_EVENTS;
  });

  const [promotedRetreats, setPromotedRetreats] = useState<number[]>(() => {
    const stored = localStorage.getItem('organizer_promoted_retreats');
    if (stored) {
      try { return JSON.parse(stored); } catch { return []; }
    }
    return [];
  });

  // Notifications State
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(() => {
    const stored = localStorage.getItem('organizer_notifications');
    if (stored) {
      try { return JSON.parse(stored); } catch { }
    }
    return [
      { id: 1, title: 'New Booking Confirmed! 🎉', desc: 'Meera Singh booked 7-Day Himalayan Yoga Retreat.', time: '2h ago', read: false },
      { id: 2, title: 'Payout Released 💳', desc: 'Payout of ₹3,90,000 has been transferred successfully.', time: '1d ago', read: true },
    ];
  });

  // Bookings list filtering state
  const [bookingStatusFilter, setBookingStatusFilter] = useState('All');
  const [bookingRetreatFilter, setBookingRetreatFilter] = useState('All');
  const [bookingSearchQuery, setBookingSearchQuery] = useState('');

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('organizer_retreats', JSON.stringify(retreats));
  }, [retreats]);

  useEffect(() => {
    localStorage.setItem('organizer_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('organizer_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('organizer_promoted_retreats', JSON.stringify(promotedRetreats));
  }, [promotedRetreats]);

  useEffect(() => {
    localStorage.setItem('organizer_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Modal states
  const [newRetreatOpen, setNewRetreatOpen] = useState(false);
  const [newEventOpen, setNewEventOpen] = useState(false);
  const [viewRetreatOpen, setViewRetreatOpen] = useState(false);
  const [viewBookingOpen, setViewBookingOpen] = useState(false);
  const [viewEventOpen, setViewEventOpen] = useState(false);
  const [selectedRetreat, setSelectedRetreat] = useState<typeof INITIAL_RETREATS[0] | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<typeof INITIAL_BOOKINGS[0] | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<typeof INITIAL_EVENTS[0] | null>(null);

  const [editingRetreat, setEditingRetreat] = useState<typeof INITIAL_RETREATS[0] | null>(null);
  const [editingEvent, setEditingEvent] = useState<typeof INITIAL_EVENTS[0] | null>(null);

  // Forms
  const [retreatForm, setRetreatForm] = useState({ title: '', location: '', dates: '', price: '', spotsTotal: '', category: 'Yoga', description: '', includes: '' });
  const [eventForm, setEventForm] = useState({ title: '', location: '', date: '', tickets: '', price: '', description: '' });

  const handleTogglePromoteRetreat = (id: number) => {
    const isPromoted = promotedRetreats.includes(id);
    if (isPromoted) {
      setPromotedRetreats(prev => prev.filter(x => x !== id));
      toast.success('Retreat promotion cancelled');
    } else {
      setPromotedRetreats(prev => [...prev, id]);
      toast.success('Retreat promoted successfully! 🚀');
    }
  };

  if (!user) { navigate('/login', { replace: true }); return null; }
  const handleLogout = () => { logout(); toast.success('See you soon! Namaste 🙏'); navigate('/'); };

  const openEditRetreat = (r: typeof INITIAL_RETREATS[0]) => {
    setEditingRetreat(r);
    setRetreatForm({
      title: r.title,
      location: r.location,
      dates: r.dates,
      price: String(r.price),
      spotsTotal: String(r.spotsTotal),
      category: r.category,
      description: r.description || '',
      includes: r.includes || '',
    });
    setNewRetreatOpen(true);
  };

  const closeRetreatModal = () => {
    setNewRetreatOpen(false);
    setEditingRetreat(null);
    setRetreatForm({ title: '', location: '', dates: '', price: '', spotsTotal: '', category: 'Yoga', description: '', includes: '' });
  };

  const handleSaveRetreat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!retreatForm.title || !retreatForm.location || !retreatForm.price) { toast.error('Please fill all required fields'); return; }
    
    if (editingRetreat) {
      setRetreats(prev => prev.map(r => r.id === editingRetreat.id ? {
        ...r,
        title: retreatForm.title,
        location: retreatForm.location,
        dates: retreatForm.dates,
        price: Number(retreatForm.price),
        spotsTotal: Number(retreatForm.spotsTotal) || 20,
        category: retreatForm.category,
        description: retreatForm.description,
        includes: retreatForm.includes,
      } : r));
      toast.success(`Retreat "${retreatForm.title}" updated successfully!`);
    } else {
      const newRetreat = {
        id: retreats.length > 0 ? Math.max(...retreats.map(r => r.id)) + 1 : 1,
        title: retreatForm.title, location: retreatForm.location, dates: retreatForm.dates,
        price: Number(retreatForm.price), spotsTotal: Number(retreatForm.spotsTotal) || 20, spotsFilled: 0,
        status: 'open' as const, rating: 0, category: retreatForm.category,
        description: retreatForm.description, includes: retreatForm.includes,
      };
      setRetreats(prev => [...prev, newRetreat]);
      toast.success(`Retreat "${newRetreat.title}" created successfully!`);
    }
    closeRetreatModal();
  };

  const openEditEvent = (evt: typeof INITIAL_EVENTS[0]) => {
    setEditingEvent(evt);
    setEventForm({
      title: evt.title,
      location: evt.location,
      date: evt.date,
      tickets: String(evt.tickets),
      price: String(evt.price),
      description: evt.description || '',
    });
    setNewEventOpen(true);
  };

  const closeEventModal = () => {
    setNewEventOpen(false);
    setEditingEvent(null);
    setEventForm({ title: '', location: '', date: '', tickets: '', price: '', description: '' });
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title || !eventForm.location || !eventForm.date) { toast.error('Please fill all required fields'); return; }
    
    if (editingEvent) {
      setEvents(prev => prev.map(evt => evt.id === editingEvent.id ? {
        ...evt,
        title: eventForm.title,
        location: eventForm.location,
        date: eventForm.date,
        tickets: Number(eventForm.tickets) || 100,
        price: Number(eventForm.price) || 0,
        description: eventForm.description,
      } : evt));
      toast.success(`Event "${eventForm.title}" updated successfully!`);
    } else {
      const newEvent = {
        id: events.length > 0 ? Math.max(...events.map(evt => evt.id)) + 1 : 1,
        title: eventForm.title, location: eventForm.location, date: eventForm.date,
        tickets: Number(eventForm.tickets) || 100, sold: 0,
        price: Number(eventForm.price) || 0, description: eventForm.description,
      };
      setEvents(prev => [...prev, newEvent]);
      toast.success(`Event "${newEvent.title}" created successfully!`);
    }
    closeEventModal();
  };

  const statusColor = (s: string) =>
    s === 'confirmed' ? 'bg-green-100 text-green-700' :
    s === 'pending' ? 'bg-yellow-100 text-yellow-700' :
    'bg-red-100 text-red-700';

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed lg:relative z-40 inset-y-0 left-0 flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-64' : 'lg:w-64 w-0'} overflow-hidden`}
        style={{ background: 'hsl(var(--sidebar-background))', borderRight: '1px solid hsl(var(--sidebar-border))' }}>
        <Link to="/" className="flex items-center gap-2 px-5 py-5 border-b border-sidebar-border hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'hsl(133 18% 59%)' }}>
            <Leaf size={16} className="text-white" />
          </div>
          <span className="font-bold text-[#101f18] dark:text-foreground" style={{ fontFamily: 'Playfair Display, serif' }}>
            Yogic<span style={{ color: 'hsl(27 87% 67%)' }}>Town</span>
          </span>
        </Link>
        <div className="px-3 py-3 border-b border-sidebar-border mx-3 mt-2 mb-1 rounded-xl" style={{ background: 'hsl(200 60% 93%)' }}>
          <div className="text-xs font-semibold" style={{ color: 'hsl(200 60% 35%)' }}>Organizer Portal</div>
          <div className="text-xs text-muted-foreground truncate">{user.name}</div>
        </div>
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {NAV.map(({ icon: Icon, label, id }) => (
            <button key={id} onClick={() => { setActiveNav(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeNav === id ? 'text-white' : 'text-sidebar-foreground hover:bg-sidebar-accent'}`}
              style={activeNav === id ? { background: ACCENT } : {}}>
              <Icon size={18} /> {label}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-sidebar-border space-y-1">
          <button onClick={() => { setActiveNav('settings'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeNav === 'settings' ? 'text-white' : 'text-sidebar-foreground hover:bg-sidebar-accent'}`}
            style={activeNav === 'settings' ? { background: ACCENT } : {}}>
            <Settings size={18} /> Settings
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted">
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div>
              <h1 className="text-base font-semibold">Welcome, {user.name.split(' ')[0]}! 🏔️</h1>
              <p className="text-xs text-muted-foreground">Organizer Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted relative"
              >
                <Bell size={18} />
                {notifications.some(n => !n.read) && (
                  <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-border bg-card p-4 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between border-b border-border pb-2 mb-3">
                    <h4 className="font-bold text-sm">Notifications</h4>
                    <button 
                      onClick={() => {
                        setNotifications(notifications.map(n => ({ ...n, read: true })));
                        toast.success('All marked as read');
                      }}
                      className="text-xs font-semibold hover:opacity-85"
                      style={{ color: ACCENT }}
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((n) => (
                        <div 
                          key={n.id} 
                          onClick={() => {
                            setNotifications(notifications.map(item => item.id === n.id ? { ...item, read: true } : item));
                          }}
                          className={`p-2.5 rounded-xl text-left transition-colors cursor-pointer ${n.read ? 'bg-background hover:bg-muted/40 border border-transparent' : 'bg-primary/5 hover:bg-primary/10 border border-primary/20 border-l-2 border-l-primary'}`}
                          style={!n.read ? { borderLeftColor: ACCENT } : {}}
                        >
                          <div className="flex justify-between items-start gap-2 mb-0.5">
                            <h5 className="font-semibold text-xs text-foreground leading-tight">{n.title}</h5>
                            <span className="text-[10px] text-muted-foreground whitespace-nowrap">{n.time}</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground leading-relaxed">{n.desc}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-muted-foreground text-center py-4">No new notifications</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <Link to="/profile">
              <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border-2" style={{ borderColor: ACCENT }} />
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">

          {/* ── Overview ── */}
          {activeNav === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Active Retreats', value: String(retreats.filter(r => r.status === 'open').length), sub: `${retreats.filter(r => r.status === 'full').length} fully booked`, icon: MapPin, color: ACCENT, bg: 'hsl(200 60% 93%)' },
                  { label: 'Total Bookings', value: String(bookings.filter(b => b.status === 'confirmed').length * 60), sub: '+89 this month', icon: Ticket, color: 'hsl(133 18% 59%)', bg: 'hsl(133 20% 92%)' },
                  { label: 'Monthly Revenue', value: '₹6.68L', sub: '+20% vs last', icon: DollarSign, color: 'hsl(27 87% 67%)', bg: 'hsl(27 87% 93%)' },
                  { label: 'Avg. Rating', value: (retreats.reduce((s, r) => s + r.rating, 0) / retreats.length).toFixed(1), sub: '248 reviews', icon: Star, color: 'hsl(45 80% 50%)', bg: 'hsl(45 80% 93%)' },
                ].map(({ label, value, sub, icon: Icon, color, bg }, i) => (
                  <div key={i} className="card-wellness">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: bg }}>
                        <Icon size={18} style={{ color }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{sub}</span>
                    </div>
                    <div className="text-3xl font-bold mb-0.5" style={{ fontFamily: 'Playfair Display, serif', color }}>{value}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card-wellness">
                  <h3 className="font-semibold mb-4">Monthly Bookings</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={bookingData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gBook" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(200,60%,55%)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(200,60%,55%)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: isDark ? '#a3a3a3' : '#666666' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: isDark ? '#a3a3a3' : '#666666' }} axisLine={false} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: isDark ? 'hsl(var(--card))' : '#ffffff', 
                          borderColor: isDark ? 'hsl(var(--border))' : '#e2e8f0', 
                          borderRadius: '12px',
                        }} 
                        labelStyle={{
                          color: isDark ? 'hsl(var(--foreground))' : '#000000',
                          fontWeight: 'bold',
                        }}
                        itemStyle={{
                          color: ACCENT,
                        }}
                      />
                      <Area type="monotone" dataKey="bookings" stroke="hsl(200,60%,55%)" fill="url(#gBook)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="card-wellness">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Recent Bookings</h3>
                    <button onClick={() => setActiveNav('bookings')} className="text-xs" style={{ color: ACCENT }}>View all</button>
                  </div>
                  <div className="space-y-3">
                    {bookings.slice(0, 4).map((b) => (
                      <div key={b.id} className="flex items-center gap-3">
                        <img src={b.avatar} alt={b.guest} className="w-8 h-8 rounded-full shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{b.guest}</div>
                          <div className="text-xs text-muted-foreground truncate">{b.retreat}</div>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${statusColor(b.status)}`}>{b.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card-wellness">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Retreat Occupancy</h3>
                  <button onClick={() => setActiveNav('retreats')} className="text-xs" style={{ color: ACCENT }}>View all</button>
                </div>
                <div className="space-y-4">
                  {retreats.map((r) => (
                    <div key={r.id} className="flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="font-medium truncate">{r.title}</span>
                          <span className="text-xs text-muted-foreground ml-2 shrink-0">{r.spotsFilled}/{r.spotsTotal}</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${(r.spotsFilled / r.spotsTotal) * 100}%`, background: r.status === 'full' ? 'hsl(0 60% 60%)' : ACCENT }} />
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${r.status === 'full' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {r.status === 'full' ? 'Full' : 'Open'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Retreats ── */}
          {activeNav === 'retreats' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Retreats & Packages</h2>
                  <p className="text-sm text-muted-foreground">Manage your published retreat programs</p>
                </div>
                <button onClick={() => setNewRetreatOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                  style={{ background: ACCENT }}>
                  <Plus size={15} /> New Retreat
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {retreats.map((r) => (
                  <div key={r.id} className="card-wellness hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 pr-3">
                        <h3 className="font-semibold mb-1">{r.title}</h3>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                          <MapPin size={11} /> {r.location} · 📅 {r.dates}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{r.category}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${r.status === 'full' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                            {r.status === 'full' ? 'Fully Booked' : 'Accepting Bookings'}
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xl font-bold" style={{ color: ACCENT, fontFamily: 'Playfair Display, serif' }}>₹{r.price.toLocaleString()}</div>
                        {r.rating > 0 && (
                          <div className="flex items-center gap-1 text-xs justify-end mt-0.5">
                            <Star size={10} fill="hsl(45 80% 50%)" color="hsl(45 80% 50%)" /> {r.rating}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Occupancy</span>
                        <span className="font-medium">{r.spotsFilled}/{r.spotsTotal} spots</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${(r.spotsFilled / r.spotsTotal) * 100}%`, background: r.status === 'full' ? 'hsl(0 60% 60%)' : ACCENT }} />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setSelectedRetreat(r); setViewRetreatOpen(true); }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border border-border hover:bg-muted transition-colors">
                        <Eye size={12} /> View
                      </button>
                      <button onClick={() => openEditRetreat(r)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border border-border hover:bg-muted transition-colors">
                        <Edit2 size={12} /> Edit
                      </button>
                      <button onClick={() => handleTogglePromoteRetreat(r.id)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all ${promotedRetreats.includes(r.id) ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400 border border-green-200 dark:border-green-800' : 'text-white'}`}
                        style={promotedRetreats.includes(r.id) ? {} : { background: ACCENT }}>
                        {promotedRetreats.includes(r.id) ? 'Promoted ✓' : 'Promote'}
                      </button>
                    </div>
                  </div>
                ))}
                <div className="card-wellness border-dashed border-2 flex flex-col items-center justify-center py-10 text-center hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => setNewRetreatOpen(true)}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: 'hsl(200 60% 93%)' }}>
                    <Plus size={20} style={{ color: ACCENT }} />
                  </div>
                  <p className="text-sm font-semibold">Create New Retreat</p>
                  <p className="text-xs text-muted-foreground mt-1">Add a wellness retreat or package</p>
                </div>
              </div>
            </div>
          )}

          {/* ── Bookings ── */}
          {activeNav === 'bookings' && (() => {
            const filteredBookings = bookings.filter(b => {
              const statusMatch = bookingStatusFilter === 'All' || b.status === bookingStatusFilter;
              const retreatMatch = bookingRetreatFilter === 'All' || b.retreat.toLowerCase().includes(bookingRetreatFilter.toLowerCase());
              const searchMatch = bookingSearchQuery.trim() === '' ||
                b.guest.toLowerCase().includes(bookingSearchQuery.toLowerCase()) ||
                b.email.toLowerCase().includes(bookingSearchQuery.toLowerCase()) ||
                b.id.toLowerCase().includes(bookingSearchQuery.toLowerCase());
              return statusMatch && retreatMatch && searchMatch;
            });
            return (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold">Bookings Management</h2>
                    <p className="text-sm text-muted-foreground">View and manage all retreat bookings</p>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Search Filter */}
                    <div className="relative">
                      <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search guest or ID..."
                        value={bookingSearchQuery}
                        onChange={(e) => setBookingSearchQuery(e.target.value)}
                        className="bg-muted border border-border rounded-lg pl-8 pr-3 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary w-40 sm:w-48"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Status:</span>
                      <select
                        value={bookingStatusFilter}
                        onChange={(e) => setBookingStatusFilter(e.target.value)}
                        className="bg-muted border border-border rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="All">All Statuses</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Retreat:</span>
                      <select
                        value={bookingRetreatFilter}
                        onChange={(e) => setBookingRetreatFilter(e.target.value)}
                        className="bg-muted border border-border rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary max-w-[150px]"
                      >
                        <option value="All">All Retreats</option>
                        {Array.from(new Set(bookings.map(b => b.retreat))).map(r => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>

                    <button 
                      onClick={() => {
                        setBookingStatusFilter('All');
                        setBookingRetreatFilter('All');
                        setBookingSearchQuery('');
                        toast.info('Filters reset to default');
                      }}
                      className="px-3 py-1 rounded-lg text-xs font-semibold border border-border hover:bg-muted"
                    >
                      Reset
                    </button>
                  </div>
                </div>
                <div className="card-wellness overflow-x-auto">
                  {filteredBookings.length > 0 ? (
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left text-xs font-medium text-muted-foreground py-3 pr-4">ID</th>
                          <th className="text-left text-xs font-medium text-muted-foreground py-3 pr-4">Guest</th>
                          <th className="text-left text-xs font-medium text-muted-foreground py-3 pr-4 hidden md:table-cell">Retreat</th>
                          <th className="text-left text-xs font-medium text-muted-foreground py-3 pr-4 hidden sm:table-cell">Date</th>
                          <th className="text-left text-xs font-medium text-muted-foreground py-3 pr-4">Amount</th>
                          <th className="text-left text-xs font-medium text-muted-foreground py-3 pr-4">Status</th>
                          <th className="text-left text-xs font-medium text-muted-foreground py-3">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBookings.map((b) => (
                          <tr key={b.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                            <td className="py-3 pr-4 text-xs text-muted-foreground font-mono">{b.id}</td>
                            <td className="py-3 pr-4">
                              <div className="flex items-center gap-2">
                                <img src={b.avatar} alt={b.guest} className="w-7 h-7 rounded-full" />
                                <span className="text-sm font-medium">{b.guest}</span>
                              </div>
                            </td>
                            <td className="py-3 pr-4 hidden md:table-cell text-sm text-muted-foreground">{b.retreat}</td>
                            <td className="py-3 pr-4 hidden sm:table-cell text-sm text-muted-foreground">{b.date}</td>
                            <td className="py-3 pr-4 text-sm font-semibold">₹{b.amount.toLocaleString()}</td>
                            <td className="py-3 pr-4">
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(b.status)}`}>{b.status}</span>
                            </td>
                            <td className="py-3">
                              <button onClick={() => { setSelectedBooking(b); setViewBookingOpen(true); }}
                                className="flex items-center gap-1 text-xs font-medium hover:underline"
                                style={{ color: ACCENT }}>
                                <Eye size={12} /> View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center py-10">
                      <Ticket size={32} className="mx-auto mb-2 text-muted-foreground opacity-40" />
                      <p className="text-sm text-muted-foreground">No bookings match the selected filters.</p>
                      <button 
                        onClick={() => {
                          setBookingStatusFilter('All');
                          setBookingRetreatFilter('All');
                          setBookingSearchQuery('');
                        }}
                        className="mt-3 text-xs font-medium hover:underline" 
                        style={{ color: ACCENT }}
                      >
                        Reset filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          {/* ── Events ── */}
          {activeNav === 'events' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Events & Festivals</h2>
                  <p className="text-sm text-muted-foreground">Manage wellness events, workshops, and festivals</p>
                </div>
                <button onClick={() => setNewEventOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                  style={{ background: ACCENT }}>
                  <Plus size={15} /> Create Event
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {events.map((evt) => (
                  <div key={evt.id} className="card-wellness hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {evt.location === 'Online' ? '🌐 Online' : `📍 ${evt.location}`}
                      </span>
                      <span className="text-xs text-muted-foreground">{evt.date}</span>
                    </div>
                    <h3 className="font-semibold mb-1">{evt.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{evt.description}</p>
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-muted-foreground">Tickets Sold</span>
                        <span className="font-medium">{evt.sold}/{evt.tickets}</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${(evt.sold / evt.tickets) * 100}%`, background: ACCENT }} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground">₹{evt.price}/ticket</span>
                      <span className="text-sm font-bold" style={{ color: ACCENT }}>₹{(evt.sold * evt.price).toLocaleString()}</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setSelectedEvent(evt); setViewEventOpen(true); }}
                        className="flex-1 py-2 rounded-xl text-xs font-semibold border border-border hover:bg-muted transition-colors flex items-center justify-center gap-1">
                        <Eye size={11} /> View
                      </button>
                      <button onClick={() => openEditEvent(evt)}
                        className="flex-1 py-2 rounded-xl text-xs font-semibold border border-border hover:bg-muted transition-colors flex items-center justify-center gap-1">
                        <Edit2 size={11} /> Edit
                      </button>
                      <button onClick={() => toast.success('Event promoted!')}
                        className="flex-1 py-2 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1"
                        style={{ background: ACCENT }}>
                        Promote
                      </button>
                    </div>
                  </div>
                ))}
                <div className="card-wellness border-dashed border-2 flex flex-col items-center justify-center py-10 text-center hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => setNewEventOpen(true)}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: 'hsl(200 60% 93%)' }}>
                    <Plus size={20} style={{ color: ACCENT }} />
                  </div>
                  <p className="text-sm font-semibold">Create New Event</p>
                  <p className="text-xs text-muted-foreground mt-1">Add a festival, workshop, or webinar</p>
                </div>
              </div>
            </div>
          )}

          {/* ── Analytics ── */}
          {activeNav === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold">Performance Analytics</h2>
                <p className="text-sm text-muted-foreground">Revenue, bookings, and retreat performance insights</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card-wellness">
                  <h3 className="font-semibold mb-4">Monthly Revenue (₹)</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={bookingData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: isDark ? '#a3a3a3' : '#666666' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: isDark ? '#a3a3a3' : '#666666' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 100000).toFixed(1)}L`} />
                      <Tooltip 
                        formatter={(v: number) => [`₹${v.toLocaleString()}`, 'Revenue']} 
                        contentStyle={{ 
                          backgroundColor: isDark ? 'hsl(var(--card))' : '#ffffff', 
                          borderColor: isDark ? 'hsl(var(--border))' : '#e2e8f0', 
                          borderRadius: '12px',
                        }} 
                        labelStyle={{
                          color: isDark ? 'hsl(var(--foreground))' : '#000000',
                          fontWeight: 'bold',
                        }}
                        itemStyle={{
                          color: ACCENT,
                        }}
                      />
                      <Bar dataKey="revenue" name="Revenue" fill="hsl(200,60%,55%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="card-wellness">
                  <h3 className="font-semibold mb-4">Top Performing Retreats</h3>
                  <div className="space-y-4">
                    {retreats.map((r, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0" style={{ background: 'hsl(200 60% 93%)', color: 'hsl(200 60% 40%)' }}>
                          {i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium truncate">{r.title}</span>
                            <span className="font-bold ml-2 shrink-0" style={{ color: ACCENT }}>₹{(r.price * r.spotsFilled / 1000).toFixed(0)}K</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${(r.spotsFilled / r.spotsTotal) * 100}%`, background: ACCENT }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Settings ── */}
          {activeNav === 'settings' && <SettingsView hideLayout={true} />}

        </main>
      </div>

      {/* ── Modal: New Retreat ── */}
      <Modal open={newRetreatOpen} onClose={closeRetreatModal} title={editingRetreat ? "Edit Retreat" : "Create New Retreat"} subtitle={editingRetreat ? "Modify retreat details" : "Publish a wellness retreat or immersive program"} accentColor={ACCENT} size="lg">
        <form onSubmit={handleSaveRetreat} className="space-y-4">
          <FormField label="Retreat Title" required>
            <input value={retreatForm.title} onChange={e => setRetreatForm(p => ({ ...p, title: e.target.value }))}
              placeholder="e.g. 7-Day Himalayan Yoga Retreat" className={inputClass} />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Location" required>
              <input value={retreatForm.location} onChange={e => setRetreatForm(p => ({ ...p, location: e.target.value }))}
                placeholder="City, Country" className={inputClass} />
            </FormField>
            <FormField label="Category">
              <select value={retreatForm.category} onChange={e => setRetreatForm(p => ({ ...p, category: e.target.value }))} className={selectClass}>
                {['Yoga', 'Meditation', 'Ayurveda', 'Spiritual', 'Fitness', 'Sound Healing'].map(c => <option key={c}>{c}</option>)}
              </select>
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Dates" hint="e.g. Jul 10–17, 2026">
              <input value={retreatForm.dates} onChange={e => setRetreatForm(p => ({ ...p, dates: e.target.value }))}
                placeholder="Jul 10–17, 2026" className={inputClass} />
            </FormField>
            <FormField label="Price per Person (₹)" required>
              <input type="number" value={retreatForm.price} onChange={e => setRetreatForm(p => ({ ...p, price: e.target.value }))}
                placeholder="e.g. 45000" className={inputClass} />
            </FormField>
          </div>
          <FormField label="Total Spots" hint="Maximum number of participants">
            <input type="number" value={retreatForm.spotsTotal} onChange={e => setRetreatForm(p => ({ ...p, spotsTotal: e.target.value }))}
              placeholder="e.g. 20" className={inputClass} />
          </FormField>
          <FormField label="What's Included">
            <input value={retreatForm.includes} onChange={e => setRetreatForm(p => ({ ...p, includes: e.target.value }))}
              placeholder="e.g. Accommodation, Meals, Daily Yoga, Meditation" className={inputClass} />
          </FormField>
          <FormField label="Description">
            <textarea value={retreatForm.description} onChange={e => setRetreatForm(p => ({ ...p, description: e.target.value }))}
              placeholder="Describe the retreat experience, highlights, and what participants will gain..." rows={3} className={textareaClass} />
          </FormField>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={closeRetreatModal}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-border hover:bg-muted transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: ACCENT }}>{editingRetreat ? "Save Changes" : "Create Retreat"}</button>
          </div>
        </form>
      </Modal>

      {/* ── Modal: New Event ── */}
      <Modal open={newEventOpen} onClose={closeEventModal} title={editingEvent ? "Edit Event" : "Create New Event"} subtitle={editingEvent ? "Modify event details" : "Host a festival, workshop, or wellness webinar"} accentColor={ACCENT}>
        <form onSubmit={handleSaveEvent} className="space-y-4">
          <FormField label="Event Title" required>
            <input value={eventForm.title} onChange={e => setEventForm(p => ({ ...p, title: e.target.value }))}
              placeholder="e.g. Wellness Summit 2026" className={inputClass} />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Location" required>
              <input value={eventForm.location} onChange={e => setEventForm(p => ({ ...p, location: e.target.value }))}
                placeholder="City or 'Online'" className={inputClass} />
            </FormField>
            <FormField label="Event Date" required>
              <input type="date" value={eventForm.date} onChange={e => setEventForm(p => ({ ...p, date: e.target.value }))} className={inputClass} />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Total Tickets">
              <input type="number" value={eventForm.tickets} onChange={e => setEventForm(p => ({ ...p, tickets: e.target.value }))}
                placeholder="e.g. 300" className={inputClass} />
            </FormField>
            <FormField label="Ticket Price (₹)">
              <input type="number" value={eventForm.price} onChange={e => setEventForm(p => ({ ...p, price: e.target.value }))}
                placeholder="e.g. 1500 (0 for free)" className={inputClass} />
            </FormField>
          </div>
          <FormField label="Description">
            <textarea value={eventForm.description} onChange={e => setEventForm(p => ({ ...p, description: e.target.value }))}
              placeholder="What will attendees experience at this event?" rows={3} className={textareaClass} />
          </FormField>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={closeEventModal}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-border hover:bg-muted transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: ACCENT }}>{editingEvent ? "Save Changes" : "Create Event"}</button>
          </div>
        </form>
      </Modal>

      {/* ── Modal: View Retreat ── */}
      <Modal open={viewRetreatOpen} onClose={() => setViewRetreatOpen(false)} title="Retreat Details" subtitle={selectedRetreat?.title} accentColor={ACCENT} size="lg">
        {selectedRetreat && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Price', value: `₹${selectedRetreat.price.toLocaleString()}`, color: ACCENT },
                { label: 'Spots', value: `${selectedRetreat.spotsFilled}/${selectedRetreat.spotsTotal}`, color: 'hsl(133 18% 59%)' },
                { label: 'Rating', value: selectedRetreat.rating > 0 ? `${selectedRetreat.rating}★` : 'New', color: 'hsl(45 80% 50%)' },
                { label: 'Status', value: selectedRetreat.status === 'full' ? 'Full' : 'Open', color: selectedRetreat.status === 'full' ? 'hsl(0 60% 60%)' : 'hsl(133 18% 59%)' },
              ].map((s, i) => (
                <div key={i} className="p-3 rounded-xl bg-muted/50 text-center">
                  <div className="text-lg font-bold" style={{ color: s.color, fontFamily: 'Playfair Display, serif' }}>{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-muted/40">
                  <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Location</div>
                  <p className="text-sm flex items-center gap-1.5"><MapPin size={12} /> {selectedRetreat.location}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/40">
                  <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Dates</div>
                  <p className="text-sm flex items-center gap-1.5"><Calendar size={12} /> {selectedRetreat.dates}</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-muted/40">
                <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Description</div>
                <p className="text-sm leading-relaxed">{selectedRetreat.description || 'No description provided.'}</p>
              </div>
              {selectedRetreat.includes && (
                <div className="p-4 rounded-xl bg-muted/40">
                  <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">What's Included</div>
                  <p className="text-sm">{selectedRetreat.includes}</p>
                </div>
              )}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground font-medium">Occupancy</span>
                  <span className="font-semibold" style={{ color: ACCENT }}>{Math.round((selectedRetreat.spotsFilled / selectedRetreat.spotsTotal) * 100)}% filled</span>
                </div>
                <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(selectedRetreat.spotsFilled / selectedRetreat.spotsTotal) * 100}%`, background: ACCENT }} />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => { openEditRetreat(selectedRetreat); setViewRetreatOpen(false); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-border hover:bg-muted transition-colors flex items-center justify-center gap-2">
                <Edit2 size={14} /> Edit Retreat
              </button>
              <button onClick={() => { setActiveNav('bookings'); setViewRetreatOpen(false); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2"
                style={{ background: ACCENT }}>
                <Users size={14} /> View Bookings
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ── Modal: View Booking ── */}
      <Modal open={viewBookingOpen} onClose={() => setViewBookingOpen(false)} title="Booking Details" subtitle={selectedBooking?.id} accentColor={ACCENT}>
        {selectedBooking && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/40">
              <img src={selectedBooking.avatar} alt={selectedBooking.guest} className="w-14 h-14 rounded-full border-2" style={{ borderColor: ACCENT }} />
              <div>
                <h3 className="font-bold">{selectedBooking.guest}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(selectedBooking.status)}`}>{selectedBooking.status}</span>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { icon: Hash, label: 'Booking ID', value: selectedBooking.id },
                { icon: Mail, label: 'Email', value: selectedBooking.email },
                { icon: Phone, label: 'Phone', value: selectedBooking.phone },
                { icon: MapPin, label: 'Retreat', value: selectedBooking.retreat },
                { icon: Calendar, label: 'Booking Date', value: selectedBooking.date },
                { icon: Users, label: 'Guests', value: `${selectedBooking.guests} guest${selectedBooking.guests > 1 ? 's' : ''}` },
                { icon: DollarSign, label: 'Amount Paid', value: `₹${selectedBooking.amount.toLocaleString()}` },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/40">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'hsl(200 60% 93%)' }}>
                      <Icon size={13} style={{ color: ACCENT }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                      <div className="text-sm font-medium truncate">{item.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            {selectedBooking.notes && (
              <div className="p-4 rounded-xl bg-muted/40">
                <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Notes</div>
                <p className="text-sm">{selectedBooking.notes}</p>
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => {
                setBookings(prev => prev.map(b => b.id === selectedBooking.id ? { ...b, status: 'cancelled' } : b));
                setSelectedBooking(prev => prev ? { ...prev, status: 'cancelled' } : null);
                toast.success(`Refund processed & booking cancelled for ${selectedBooking.guest}`);
              }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-border hover:bg-muted transition-colors">
                Cancel & Refund
              </button>
              <button onClick={() => {
                setBookings(prev => prev.map(b => b.id === selectedBooking.id ? { ...b, status: 'confirmed' } : b));
                setSelectedBooking(prev => prev ? { ...prev, status: 'confirmed' } : null);
                toast.success(`Booking confirmed & email sent to ${selectedBooking.guest}! 📩`);
              }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2"
                style={{ background: ACCENT }}>
                <Mail size={14} /> Confirm Booking
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ── Modal: View Event ── */}
      <Modal open={viewEventOpen} onClose={() => setViewEventOpen(false)} title="Event Details" subtitle={selectedEvent?.title} accentColor={ACCENT}>
        {selectedEvent && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Tickets Sold', value: `${selectedEvent.sold}/${selectedEvent.tickets}`, color: ACCENT },
                { label: 'Revenue', value: `₹${(selectedEvent.sold * selectedEvent.price).toLocaleString()}`, color: 'hsl(133 18% 59%)' },
                { label: 'Ticket Price', value: selectedEvent.price === 0 ? 'Free' : `₹${selectedEvent.price}`, color: 'hsl(27 87% 67%)' },
                { label: 'Fill Rate', value: `${Math.round((selectedEvent.sold / selectedEvent.tickets) * 100)}%`, color: 'hsl(45 80% 50%)' },
              ].map((s, i) => (
                <div key={i} className="p-3 rounded-xl bg-muted/50 text-center">
                  <div className="text-xl font-bold" style={{ color: s.color, fontFamily: 'Playfair Display, serif' }}>{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-muted/40">
                  <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Location</div>
                  <p className="text-sm font-medium">{selectedEvent.location === 'Online' ? '🌐 Online' : `📍 ${selectedEvent.location}`}</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/40">
                  <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Date</div>
                  <p className="text-sm font-medium">📅 {selectedEvent.date}</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-muted/40">
                <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Description</div>
                <p className="text-sm leading-relaxed">{selectedEvent.description}</p>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Ticket Sales Progress</span>
                  <span className="font-semibold" style={{ color: ACCENT }}>{selectedEvent.sold}/{selectedEvent.tickets} sold</span>
                </div>
                <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(selectedEvent.sold / selectedEvent.tickets) * 100}%`, background: ACCENT }} />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => { openEditEvent(selectedEvent); setViewEventOpen(false); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-border hover:bg-muted transition-colors flex items-center justify-center gap-2">
                <Edit2 size={14} /> Edit Event
              </button>
              <button onClick={() => { toast.success('Event promoted!'); setViewEventOpen(false); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2"
                style={{ background: ACCENT }}>
                Promote Event
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrganizerDashboard;
