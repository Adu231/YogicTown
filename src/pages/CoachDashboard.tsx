import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Leaf, Home, Users, BookOpen, Calendar, BarChart3, Settings, LogOut,
  Menu, X, Bell, Plus, Star, Clock, DollarSign, MessageSquare,
  Edit2, Activity, CheckCircle, Heart, TrendingUp,
  Filter, Video, Award, Mail, Phone, MapPin, Target, FileText,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { ThemeToggle } from '@/components/features/ThemeToggle';
import { useScrollTop } from '@/hooks/useScrollTop';
import { Modal, FormField, inputClass, selectClass, textareaClass } from '@/components/features/Modal';
import { toast } from 'sonner';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from 'recharts';

// ─── Data ────────────────────────────────────────────────────────────────────

const clientData = [
  { month: 'Jan', clients: 12, sessions: 48 },
  { month: 'Feb', clients: 15, sessions: 60 },
  { month: 'Mar', clients: 18, sessions: 72 },
  { month: 'Apr', clients: 22, sessions: 88 },
  { month: 'May', clients: 26, sessions: 104 },
  { month: 'Jun', clients: 31, sessions: 124 },
];

const INITIAL_CLIENTS = [
  { id: 1, name: 'Meera Singh', email: 'meera@example.com', phone: '+91 98765 43210', avatar: 'https://ui-avatars.com/api/?name=Meera+Singh&background=84A98C&color=fff', goal: 'Weight Management', sessions: 18, progress: 72, nextSession: 'Today, 3 PM', status: 'active', plan: 'Premium', diet: 'Vegetarian', allergies: 'None', notes: 'Good progress. Maintain calorie deficit. Increase water intake to 3L.' },
  { id: 2, name: 'Rahul Verma', email: 'rahul@example.com', phone: '+91 87654 32100', avatar: 'https://ui-avatars.com/api/?name=Rahul+Verma&background=F4A261&color=fff', goal: 'Stress Relief & Sleep', sessions: 12, progress: 58, nextSession: 'Tomorrow, 10 AM', status: 'active', plan: 'Basic', diet: 'Non-vegetarian', allergies: 'Dairy', notes: 'Struggling with consistency. Focus on sleep hygiene routine.' },
  { id: 3, name: 'Anjali Patel', email: 'anjali@example.com', phone: '+91 76543 21098', avatar: 'https://ui-avatars.com/api/?name=Anjali+Patel&background=5B8FB9&color=fff', goal: 'Digestive Health', sessions: 24, progress: 91, nextSession: 'Jun 29, 2 PM', status: 'active', plan: 'Elite', diet: 'Vegan', allergies: 'Gluten', notes: 'Excellent improvement. Ready for maintenance phase.' },
  { id: 4, name: 'Kiran Shah', email: 'kiran@example.com', phone: '+91 65432 10987', avatar: 'https://ui-avatars.com/api/?name=Kiran+Shah&background=A98B84&color=fff', goal: 'Immunity Boost', sessions: 6, progress: 30, nextSession: 'Jun 30, 11 AM', status: 'new', plan: 'Basic', diet: 'Vegetarian', allergies: 'Nuts', notes: 'New client. Start with basic Ayurvedic protocol.' },
  { id: 5, name: 'Deepak Kumar', email: 'deepak@example.com', phone: '+91 54321 09876', avatar: 'https://ui-avatars.com/api/?name=Deepak+Kumar&background=84A98C&color=fff', goal: 'Hormonal Balance', sessions: 30, progress: 100, nextSession: 'Completed', status: 'completed', plan: 'Elite', diet: 'Non-vegetarian', allergies: 'None', notes: 'Program complete. Suggest transition to maintenance plan.' },
];

const INITIAL_PROGRAMS = [
  { id: 1, title: 'Ayurvedic Detox Protocol', duration: '21 days', enrolled: 45, rating: 4.9, price: 2999, category: 'Detox', description: 'A comprehensive 21-day Panchakarma-inspired detox using Ayurvedic principles to cleanse and rejuvenate the body.' },
  { id: 2, title: 'Anti-Inflammatory Meal Plan', duration: '30 days', enrolled: 62, rating: 4.8, price: 1999, category: 'Nutrition', description: 'Science-backed nutrition plan targeting inflammation reduction through whole foods and Ayurvedic herbs.' },
  { id: 3, title: 'Stress & Cortisol Reset', duration: '14 days', enrolled: 38, rating: 4.7, price: 2499, category: 'Wellness', description: 'Targeted plan to reduce chronic stress hormones through adaptogens, breathwork, and sleep optimization.' },
  { id: 4, title: 'Gut Health Transformation', duration: '28 days', enrolled: 29, rating: 4.9, price: 3499, category: 'Gut Health', description: 'Holistic gut healing protocol combining probiotics, fermented foods, and targeted Ayurvedic remedies.' },
];

const INITIAL_CONSULTATIONS = [
  { id: 1, client: 'Meera Singh', type: 'Video Call', time: 'Today, 3:00 PM', duration: '45 min', topic: 'Weekly check-in', notes: 'Review meal diary and adjust plan.', avatar: 'https://ui-avatars.com/api/?name=Meera+Singh&background=84A98C&color=fff' },
  { id: 2, client: 'Rahul Verma', type: 'Chat', time: 'Today, 5:00 PM', duration: '30 min', topic: 'Meal plan review', notes: 'Discuss dairy-free alternatives.', avatar: 'https://ui-avatars.com/api/?name=Rahul+Verma&background=F4A261&color=fff' },
  { id: 3, client: 'Anjali Patel', type: 'Video Call', time: 'Tomorrow, 10:00 AM', duration: '60 min', topic: 'Progress assessment', notes: 'Final progress evaluation before maintenance phase.', avatar: 'https://ui-avatars.com/api/?name=Anjali+Patel&background=5B8FB9&color=fff' },
];

const wellnessRadar = [
  { subject: 'Nutrition', value: 85 },
  { subject: 'Hydration', value: 72 },
  { subject: 'Sleep', value: 68 },
  { subject: 'Digestion', value: 80 },
  { subject: 'Energy', value: 75 },
  { subject: 'Stress', value: 60 },
];

const NAV = [
  { icon: Home, label: 'Overview', id: 'overview' },
  { icon: Users, label: 'My Clients', id: 'clients' },
  { icon: BookOpen, label: 'Programs', id: 'programs' },
  { icon: Calendar, label: 'Consultations', id: 'consultations' },
  { icon: BarChart3, label: 'Analytics', id: 'analytics' },
];

const ACCENT = 'hsl(160 40% 50%)';
const ACCENT_BG = 'hsl(160 40% 93%)';

// ─── Component ───────────────────────────────────────────────────────────────

const CoachDashboard = () => {
  useScrollTop();
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('overview');

  // Data state
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [programs, setPrograms] = useState(INITIAL_PROGRAMS);
  const [consultations, setConsultations] = useState(INITIAL_CONSULTATIONS);

  // Modal states
  const [newClientOpen, setNewClientOpen] = useState(false);
  const [newProgramOpen, setNewProgramOpen] = useState(false);
  const [newConsultOpen, setNewConsultOpen] = useState(false);
  const [viewClientOpen, setViewClientOpen] = useState(false);
  const [viewProgramOpen, setViewProgramOpen] = useState(false);
  const [viewConsultOpen, setViewConsultOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<typeof INITIAL_CLIENTS[0] | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<typeof INITIAL_PROGRAMS[0] | null>(null);
  const [selectedConsult, setSelectedConsult] = useState<typeof INITIAL_CONSULTATIONS[0] | null>(null);

  // Forms
  const [clientForm, setClientForm] = useState({ name: '', email: '', phone: '', goal: '', plan: 'Basic', diet: 'Vegetarian', allergies: '', notes: '' });
  const [programForm, setProgramForm] = useState({ title: '', duration: '', price: '', category: 'Nutrition', description: '' });
  const [consultForm, setConsultForm] = useState({ client: '', type: 'Video Call', date: '', time: '', duration: '45 min', topic: '', notes: '' });

  if (!user) { navigate('/login', { replace: true }); return null; }
  const handleLogout = () => { logout(); toast.success('See you soon! Namaste 🙏'); navigate('/'); };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientForm.name || !clientForm.email) { toast.error('Name and email are required'); return; }
    const newClient = {
      id: clients.length + 1,
      name: clientForm.name, email: clientForm.email, phone: clientForm.phone,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(clientForm.name)}&background=84A98C&color=fff`,
      goal: clientForm.goal || 'General Wellness', sessions: 0, progress: 0,
      nextSession: 'TBD', status: 'new' as const, plan: clientForm.plan,
      diet: clientForm.diet, allergies: clientForm.allergies || 'None', notes: clientForm.notes,
    };
    setClients(prev => [newClient, ...prev]);
    setNewClientOpen(false);
    setClientForm({ name: '', email: '', phone: '', goal: '', plan: 'Basic', diet: 'Vegetarian', allergies: '', notes: '' });
    toast.success(`Client "${newClient.name}" added!`);
  };

  const handleAddProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!programForm.title || !programForm.price) { toast.error('Title and price are required'); return; }
    const newProgram = {
      id: programs.length + 1,
      title: programForm.title, duration: programForm.duration || '30 days',
      enrolled: 0, rating: 0, price: Number(programForm.price),
      category: programForm.category, description: programForm.description,
    };
    setPrograms(prev => [...prev, newProgram]);
    setNewProgramOpen(false);
    setProgramForm({ title: '', duration: '', price: '', category: 'Nutrition', description: '' });
    toast.success(`Program "${newProgram.title}" created!`);
  };

  const handleAddConsult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultForm.client || !consultForm.date) { toast.error('Client and date are required'); return; }
    const newConsult = {
      id: consultations.length + 1,
      client: consultForm.client, type: consultForm.type,
      time: `${consultForm.date}, ${consultForm.time}`,
      duration: consultForm.duration, topic: consultForm.topic || 'General Check-in',
      notes: consultForm.notes,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(consultForm.client)}&background=84A98C&color=fff`,
    };
    setConsultations(prev => [newConsult, ...prev]);
    setNewConsultOpen(false);
    setConsultForm({ client: '', type: 'Video Call', date: '', time: '', duration: '45 min', topic: '', notes: '' });
    toast.success('Consultation scheduled!');
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed lg:relative z-40 inset-y-0 left-0 flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-64' : 'lg:w-64 w-0'} overflow-hidden`}
        style={{ background: 'hsl(var(--sidebar-background))', borderRight: '1px solid hsl(var(--sidebar-border))' }}>
        <div className="flex items-center gap-2 px-5 py-5 border-b border-sidebar-border">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'hsl(133 18% 59%)' }}>
            <Leaf size={16} className="text-white" />
          </div>
          <span className="font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'hsl(150 15% 12%)' }}>
            Yogic<span style={{ color: 'hsl(27 87% 67%)' }}>Town</span>
          </span>
        </div>
        <div className="px-3 py-3 border-b border-sidebar-border mx-3 mt-2 mb-1 rounded-xl" style={{ background: ACCENT_BG }}>
          <div className="text-xs font-semibold" style={{ color: 'hsl(160 40% 30%)' }}>Coach Portal</div>
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
          <Link to="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
            <Settings size={18} /> Settings
          </Link>
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
              <h1 className="text-base font-semibold">Welcome, {user.name.split(' ')[0]}! 🌿</h1>
              <p className="text-xs text-muted-foreground">Wellness Coach Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted relative">
              <Bell size={18} />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
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
                  { label: 'Active Clients', value: String(clients.filter(c => c.status === 'active').length), sub: '+5 this month', icon: Users, color: ACCENT, bg: ACCENT_BG },
                  { label: 'Sessions This Month', value: '124', sub: '+20 vs last', icon: Video, color: 'hsl(27 87% 67%)', bg: 'hsl(27 87% 93%)' },
                  { label: 'Monthly Revenue', value: '₹93,200', sub: 'Before platform fee', icon: DollarSign, color: 'hsl(220 70% 60%)', bg: 'hsl(220 70% 95%)' },
                  { label: 'Avg. Rating', value: '4.93', sub: '187 reviews', icon: Star, color: 'hsl(45 80% 50%)', bg: 'hsl(45 80% 93%)' },
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

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 card-wellness">
                  <h3 className="font-semibold mb-4">Client Growth</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={clientData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gClients" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(160,40%,50%)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(160,40%,50%)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))' }} />
                      <Area type="monotone" dataKey="clients" name="Clients" stroke="hsl(160,40%,50%)" fill="url(#gClients)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="card-wellness">
                  <h3 className="font-semibold mb-4">Today's Consultations</h3>
                  <div className="space-y-3">
                    {consultations.slice(0, 2).map((c, i) => (
                      <div key={i} className="p-3 rounded-xl bg-muted/50">
                        <div className="flex items-center gap-2 mb-1">
                          <img src={c.avatar} alt={c.client} className="w-6 h-6 rounded-full" />
                          <div className="text-sm font-medium">{c.client}</div>
                        </div>
                        <div className="text-xs text-muted-foreground mb-1">{c.time} · {c.duration}</div>
                        <div className="text-xs text-muted-foreground mb-2">{c.topic}</div>
                        <button onClick={() => toast.success(`Joining session with ${c.client}`)}
                          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-white"
                          style={{ background: ACCENT }}>
                          <Video size={10} /> Join
                        </button>
                      </div>
                    ))}
                    <button onClick={() => setNewConsultOpen(true)}
                      className="w-full py-2 rounded-xl text-xs font-medium border border-dashed border-border hover:bg-muted transition-colors flex items-center justify-center gap-1.5"
                      style={{ color: ACCENT }}>
                      <Plus size={12} /> Schedule New
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card-wellness">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Client Progress</h3>
                    <button onClick={() => setActiveNav('clients')} className="text-xs" style={{ color: ACCENT }}>View all</button>
                  </div>
                  <div className="space-y-3">
                    {clients.filter(c => c.status !== 'completed').slice(0, 4).map((c) => (
                      <div key={c.id} className="flex items-center gap-3">
                        <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium truncate">{c.name}</span>
                            <span className="text-xs ml-2 shrink-0" style={{ color: ACCENT }}>{c.progress}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${c.progress}%`, background: ACCENT }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card-wellness">
                  <h3 className="font-semibold mb-4">Average Client Wellness</h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <RadarChart data={wellnessRadar}>
                      <PolarGrid stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'} />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                      <Radar name="Wellness" dataKey="value" stroke="hsl(160,40%,50%)" fill="hsl(160,40%,50%)" fillOpacity={0.25} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* ── Clients ── */}
          {activeNav === 'clients' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">My Clients</h2>
                  <p className="text-sm text-muted-foreground">Track progress and health journeys</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toast.info('Filter applied')} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm border border-border hover:bg-muted transition-colors">
                    <Filter size={14} /> Filter
                  </button>
                  <button onClick={() => setNewClientOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                    style={{ background: ACCENT }}>
                    <Plus size={15} /> Add Client
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {clients.map((c) => (
                  <div key={c.id} className="card-wellness hover:shadow-md transition-all">
                    <div className="flex items-start gap-3 mb-4">
                      <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm">{c.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.status === 'active' ? 'bg-green-100 text-green-700' : c.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-muted text-muted-foreground'}`}>{c.status}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">{c.goal}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-muted/50 text-center">
                        <div className="text-sm font-bold">{c.sessions}</div>
                        <div className="text-xs text-muted-foreground">Sessions</div>
                      </div>
                      <div className="p-2 rounded-lg bg-muted/50 text-center">
                        <div className="text-sm font-bold" style={{ color: ACCENT }}>{c.progress}%</div>
                        <div className="text-xs text-muted-foreground">Progress</div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${c.progress}%`, background: ACCENT }} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                      <Clock size={11} /> Next: {c.nextSession}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => toast.success(`Opening chat with ${c.name}`)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border border-border hover:bg-muted transition-colors">
                        <MessageSquare size={12} /> Message
                      </button>
                      <button onClick={() => { setSelectedClient(c); setViewClientOpen(true); }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-white"
                        style={{ background: ACCENT }}>
                        View Plan
                      </button>
                    </div>
                  </div>
                ))}
                <div className="card-wellness border-dashed border-2 flex flex-col items-center justify-center py-10 text-center hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => setNewClientOpen(true)}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: ACCENT_BG }}>
                    <Plus size={20} style={{ color: ACCENT }} />
                  </div>
                  <p className="text-sm font-semibold">Add New Client</p>
                  <p className="text-xs text-muted-foreground mt-1">Start a new wellness journey</p>
                </div>
              </div>
            </div>
          )}

          {/* ── Programs ── */}
          {activeNav === 'programs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Wellness Programs</h2>
                  <p className="text-sm text-muted-foreground">Manage and publish your nutrition & wellness programs</p>
                </div>
                <button onClick={() => setNewProgramOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                  style={{ background: ACCENT }}>
                  <Plus size={15} /> Create Program
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {programs.map((p) => (
                  <div key={p.id} className="card-wellness hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold mb-1">{p.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{p.category}</span>
                          <span className="text-xs text-muted-foreground">{p.duration}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold" style={{ color: ACCENT, fontFamily: 'Playfair Display, serif' }}>₹{p.price}</div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{p.description}</p>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-muted/50 text-center">
                        <div className="text-sm font-bold">{p.enrolled}</div>
                        <div className="text-xs text-muted-foreground">Enrolled</div>
                      </div>
                      <div className="p-2 rounded-lg bg-muted/50 text-center flex items-center justify-center gap-1">
                        <div className="text-sm font-bold">{p.rating > 0 ? p.rating : '—'}</div>
                        {p.rating > 0 && <Star size={11} fill="hsl(45 80% 50%)" color="hsl(45 80% 50%)" />}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setSelectedProgram(p); setViewProgramOpen(true); }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border border-border hover:bg-muted transition-colors">
                        <FileText size={12} /> View
                      </button>
                      <button onClick={() => toast.success(`Editing: ${p.title}`)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border border-border hover:bg-muted transition-colors">
                        <Edit2 size={12} /> Edit
                      </button>
                      <button onClick={() => toast.success('Program promoted!')}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-white"
                        style={{ background: ACCENT }}>
                        Promote
                      </button>
                    </div>
                  </div>
                ))}
                <div className="card-wellness border-dashed border-2 flex flex-col items-center justify-center py-10 text-center hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => setNewProgramOpen(true)}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: ACCENT_BG }}>
                    <Plus size={20} style={{ color: ACCENT }} />
                  </div>
                  <p className="text-sm font-semibold">Create New Program</p>
                  <p className="text-xs text-muted-foreground mt-1">Publish a wellness or nutrition program</p>
                </div>
              </div>
            </div>
          )}

          {/* ── Consultations ── */}
          {activeNav === 'consultations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Consultations</h2>
                  <p className="text-sm text-muted-foreground">Manage your scheduled 1-on-1 sessions</p>
                </div>
                <button onClick={() => setNewConsultOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                  style={{ background: ACCENT }}>
                  <Plus size={15} /> Schedule
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {consultations.map((c) => (
                  <div key={c.id} className="card-wellness hover:shadow-md transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <img src={c.avatar} alt={c.client} className="w-10 h-10 rounded-full border-2" style={{ borderColor: ACCENT }} />
                      <div>
                        <div className="text-sm font-semibold">{c.client}</div>
                        <div className="text-xs text-muted-foreground">{c.type}</div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock size={13} className="text-muted-foreground" />
                        <span>{c.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted">{c.duration}</span>
                        <span className="text-xs">{c.topic}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setSelectedConsult(c); setViewConsultOpen(true); }}
                        className="flex-1 py-2 rounded-xl text-xs font-semibold border border-border hover:bg-muted transition-colors flex items-center justify-center gap-1">
                        <FileText size={11} /> Details
                      </button>
                      <button onClick={() => toast.success(`Reschedule requested for ${c.client}`)}
                        className="flex-1 py-2 rounded-xl text-xs font-semibold border border-border hover:bg-muted transition-colors">
                        Reschedule
                      </button>
                      <button onClick={() => toast.success(`Joining session with ${c.client}`)}
                        className="flex-1 py-2 rounded-xl text-xs font-semibold text-white"
                        style={{ background: ACCENT }}>
                        Join
                      </button>
                    </div>
                  </div>
                ))}
                <div className="card-wellness border-dashed border-2 flex flex-col items-center justify-center py-10 text-center hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => setNewConsultOpen(true)}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: ACCENT_BG }}>
                    <Plus size={20} style={{ color: ACCENT }} />
                  </div>
                  <p className="text-sm font-semibold">Schedule Session</p>
                  <p className="text-xs text-muted-foreground mt-1">Book a 1-on-1 consultation</p>
                </div>
              </div>
            </div>
          )}

          {/* ── Analytics ── */}
          {activeNav === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold">Coach Analytics</h2>
                <p className="text-sm text-muted-foreground">Track your client outcomes and business growth</p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Clients Served', value: '148', icon: Users, color: ACCENT },
                  { label: 'Avg. Client Progress', value: '74%', icon: TrendingUp, color: 'hsl(27 87% 67%)' },
                  { label: 'Session Hours', value: '620h', icon: Clock, color: 'hsl(220 70% 60%)' },
                  { label: 'Success Rate', value: '94%', icon: Award, color: 'hsl(45 80% 50%)' },
                ].map(({ label, value, icon: Icon, color }, i) => (
                  <div key={i} className="card-wellness text-center py-5">
                    <Icon size={22} className="mx-auto mb-2" style={{ color }} />
                    <div className="text-2xl font-bold mb-0.5" style={{ fontFamily: 'Playfair Display, serif', color }}>{value}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
              <div className="card-wellness">
                <h3 className="font-semibold mb-4">Client & Session Growth</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={clientData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gC2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(160,40%,50%)" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="hsl(160,40%,50%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))' }} />
                    <Area type="monotone" dataKey="clients" name="Clients" stroke="hsl(160,40%,50%)" fill="url(#gC2)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ── Modal: Add Client ── */}
      <Modal open={newClientOpen} onClose={() => setNewClientOpen(false)} title="Add New Client" subtitle="Onboard a new wellness coaching client" accentColor={ACCENT} size="lg">
        <form onSubmit={handleAddClient} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Full Name" required>
              <input value={clientForm.name} onChange={e => setClientForm(p => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Meera Sharma" className={inputClass} />
            </FormField>
            <FormField label="Email Address" required>
              <input type="email" value={clientForm.email} onChange={e => setClientForm(p => ({ ...p, email: e.target.value }))}
                placeholder="client@example.com" className={inputClass} />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Phone Number">
              <input value={clientForm.phone} onChange={e => setClientForm(p => ({ ...p, phone: e.target.value }))}
                placeholder="+91 98765 43210" className={inputClass} />
            </FormField>
            <FormField label="Subscription Plan">
              <select value={clientForm.plan} onChange={e => setClientForm(p => ({ ...p, plan: e.target.value }))} className={selectClass}>
                {['Free', 'Basic', 'Premium', 'Elite'].map(p => <option key={p}>{p}</option>)}
              </select>
            </FormField>
          </div>
          <FormField label="Wellness Goal">
            <input value={clientForm.goal} onChange={e => setClientForm(p => ({ ...p, goal: e.target.value }))}
              placeholder="e.g. Weight management, stress relief, gut health..." className={inputClass} />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Dietary Preference">
              <select value={clientForm.diet} onChange={e => setClientForm(p => ({ ...p, diet: e.target.value }))} className={selectClass}>
                {['Vegetarian', 'Vegan', 'Non-vegetarian', 'Pescatarian', 'Keto', 'Other'].map(d => <option key={d}>{d}</option>)}
              </select>
            </FormField>
            <FormField label="Allergies / Intolerances">
              <input value={clientForm.allergies} onChange={e => setClientForm(p => ({ ...p, allergies: e.target.value }))}
                placeholder="e.g. Gluten, dairy, nuts or 'None'" className={inputClass} />
            </FormField>
          </div>
          <FormField label="Initial Notes">
            <textarea value={clientForm.notes} onChange={e => setClientForm(p => ({ ...p, notes: e.target.value }))}
              placeholder="Medical history, current challenges, coaching objectives..." rows={3} className={textareaClass} />
          </FormField>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setNewClientOpen(false)}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-border hover:bg-muted transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: ACCENT }}>Add Client</button>
          </div>
        </form>
      </Modal>

      {/* ── Modal: Create Program ── */}
      <Modal open={newProgramOpen} onClose={() => setNewProgramOpen(false)} title="Create Wellness Program" subtitle="Publish a nutrition or wellness program" accentColor={ACCENT}>
        <form onSubmit={handleAddProgram} className="space-y-4">
          <FormField label="Program Title" required>
            <input value={programForm.title} onChange={e => setProgramForm(p => ({ ...p, title: e.target.value }))}
              placeholder="e.g. 21-Day Ayurvedic Detox" className={inputClass} />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Duration" hint="e.g. 21 days">
              <input value={programForm.duration} onChange={e => setProgramForm(p => ({ ...p, duration: e.target.value }))}
                placeholder="21 days" className={inputClass} />
            </FormField>
            <FormField label="Category">
              <select value={programForm.category} onChange={e => setProgramForm(p => ({ ...p, category: e.target.value }))} className={selectClass}>
                {['Nutrition', 'Detox', 'Wellness', 'Gut Health', 'Weight Loss', 'Hormones', 'Immunity'].map(c => <option key={c}>{c}</option>)}
              </select>
            </FormField>
          </div>
          <FormField label="Price (₹)" required>
            <input type="number" value={programForm.price} onChange={e => setProgramForm(p => ({ ...p, price: e.target.value }))}
              placeholder="e.g. 2999" className={inputClass} />
          </FormField>
          <FormField label="Description">
            <textarea value={programForm.description} onChange={e => setProgramForm(p => ({ ...p, description: e.target.value }))}
              placeholder="Describe what clients will achieve, the approach, and key components..." rows={3} className={textareaClass} />
          </FormField>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setNewProgramOpen(false)}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-border hover:bg-muted transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: ACCENT }}>Create Program</button>
          </div>
        </form>
      </Modal>

      {/* ── Modal: Schedule Consultation ── */}
      <Modal open={newConsultOpen} onClose={() => setNewConsultOpen(false)} title="Schedule Consultation" subtitle="Book a 1-on-1 client session" accentColor={ACCENT}>
        <form onSubmit={handleAddConsult} className="space-y-4">
          <FormField label="Select Client" required>
            <select value={consultForm.client} onChange={e => setConsultForm(p => ({ ...p, client: e.target.value }))} className={selectClass}>
              <option value="">— Choose a client —</option>
              {clients.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Session Type">
              <select value={consultForm.type} onChange={e => setConsultForm(p => ({ ...p, type: e.target.value }))} className={selectClass}>
                <option>Video Call</option>
                <option>Chat</option>
                <option>Phone Call</option>
                <option>In-Person</option>
              </select>
            </FormField>
            <FormField label="Duration">
              <select value={consultForm.duration} onChange={e => setConsultForm(p => ({ ...p, duration: e.target.value }))} className={selectClass}>
                <option>30 min</option>
                <option>45 min</option>
                <option>60 min</option>
                <option>90 min</option>
              </select>
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Date" required>
              <input type="date" value={consultForm.date} onChange={e => setConsultForm(p => ({ ...p, date: e.target.value }))} className={inputClass} />
            </FormField>
            <FormField label="Time">
              <input type="time" value={consultForm.time} onChange={e => setConsultForm(p => ({ ...p, time: e.target.value }))} className={inputClass} />
            </FormField>
          </div>
          <FormField label="Session Topic">
            <input value={consultForm.topic} onChange={e => setConsultForm(p => ({ ...p, topic: e.target.value }))}
              placeholder="e.g. Weekly check-in, meal plan review..." className={inputClass} />
          </FormField>
          <FormField label="Preparation Notes">
            <textarea value={consultForm.notes} onChange={e => setConsultForm(p => ({ ...p, notes: e.target.value }))}
              placeholder="Topics to cover, questions to ask, documents to review..." rows={2} className={textareaClass} />
          </FormField>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setNewConsultOpen(false)}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-border hover:bg-muted transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: ACCENT }}>Schedule Session</button>
          </div>
        </form>
      </Modal>

      {/* ── Modal: View Client Plan ── */}
      <Modal open={viewClientOpen} onClose={() => setViewClientOpen(false)} title="Client Wellness Plan" subtitle={selectedClient?.name} accentColor={ACCENT} size="lg">
        {selectedClient && (
          <div className="space-y-5">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/40">
              <img src={selectedClient.avatar} alt={selectedClient.name} className="w-16 h-16 rounded-full border-2" style={{ borderColor: ACCENT }} />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg">{selectedClient.name}</h3>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selectedClient.status === 'active' ? 'bg-green-100 text-green-700' : selectedClient.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-muted text-muted-foreground'}`}>{selectedClient.status}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted font-medium">{selectedClient.plan} Plan</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { icon: Mail, label: 'Email', value: selectedClient.email },
                { icon: Phone, label: 'Phone', value: selectedClient.phone || 'N/A' },
                { icon: Clock, label: 'Sessions Done', value: String(selectedClient.sessions) },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="p-3 rounded-xl bg-muted/40 flex items-start gap-2">
                    <Icon size={14} className="text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                      <div className="text-sm font-medium">{item.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-muted/40">
                <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Wellness Goal</div>
                <p className="text-sm font-medium flex items-center gap-2"><Target size={13} style={{ color: ACCENT }} /> {selectedClient.goal}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-muted/40">
                  <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Dietary Preference</div>
                  <p className="text-sm font-medium">🥗 {selectedClient.diet}</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/40">
                  <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Allergies</div>
                  <p className="text-sm font-medium">⚠️ {selectedClient.allergies}</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-muted/40">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Progress</div>
                  <span className="text-sm font-bold" style={{ color: ACCENT }}>{selectedClient.progress}%</span>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${selectedClient.progress}%`, background: ACCENT }} />
                </div>
              </div>
              <div className="p-4 rounded-xl bg-muted/40">
                <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Coach Notes</div>
                <p className="text-sm leading-relaxed text-muted-foreground">{selectedClient.notes || 'No notes added yet.'}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar size={13} /> Next Session: <span className="font-medium">{selectedClient.nextSession}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => { toast.success(`Message sent to ${selectedClient.name}`); setViewClientOpen(false); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-border hover:bg-muted transition-colors flex items-center justify-center gap-2">
                <MessageSquare size={14} /> Message
              </button>
              <button onClick={() => { setNewConsultOpen(true); setConsultForm(p => ({ ...p, client: selectedClient.name })); setViewClientOpen(false); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2"
                style={{ background: ACCENT }}>
                <Calendar size={14} /> Schedule Session
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ── Modal: View Program ── */}
      <Modal open={viewProgramOpen} onClose={() => setViewProgramOpen(false)} title="Program Details" subtitle={selectedProgram?.title} accentColor={ACCENT}>
        {selectedProgram && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Enrolled', value: String(selectedProgram.enrolled), color: ACCENT },
                { label: 'Rating', value: selectedProgram.rating > 0 ? `${selectedProgram.rating}★` : 'No ratings', color: 'hsl(45 80% 50%)' },
                { label: 'Duration', value: selectedProgram.duration, color: 'hsl(27 87% 67%)' },
                { label: 'Price', value: `₹${selectedProgram.price}`, color: 'hsl(220 70% 60%)' },
              ].map((s, i) => (
                <div key={i} className="p-3 rounded-xl bg-muted/50 text-center">
                  <div className="text-xl font-bold" style={{ color: s.color, fontFamily: 'Playfair Display, serif' }}>{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-muted/40">
              <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Category</div>
              <p className="text-sm font-medium">{selectedProgram.category}</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/40">
              <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Description</div>
              <p className="text-sm leading-relaxed">{selectedProgram.description || 'No description provided.'}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => { toast.success(`Editing: ${selectedProgram.title}`); setViewProgramOpen(false); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-border hover:bg-muted transition-colors flex items-center justify-center gap-2">
                <Edit2 size={14} /> Edit Program
              </button>
              <button onClick={() => { toast.success('Program promoted!'); setViewProgramOpen(false); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2"
                style={{ background: ACCENT }}>
                Promote
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ── Modal: View Consultation ── */}
      <Modal open={viewConsultOpen} onClose={() => setViewConsultOpen(false)} title="Consultation Details" subtitle={selectedConsult?.topic} accentColor={ACCENT}>
        {selectedConsult && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/40">
              <img src={selectedConsult.avatar} alt={selectedConsult.client} className="w-14 h-14 rounded-full border-2" style={{ borderColor: ACCENT }} />
              <div>
                <h3 className="font-bold">{selectedConsult.client}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: ACCENT_BG, color: ACCENT }}>{selectedConsult.type}</span>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Scheduled Time', value: selectedConsult.time },
                { label: 'Duration', value: selectedConsult.duration },
                { label: 'Topic', value: selectedConsult.topic },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/40">
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
            {selectedConsult.notes && (
              <div className="p-4 rounded-xl bg-muted/40">
                <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Preparation Notes</div>
                <p className="text-sm">{selectedConsult.notes}</p>
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => { toast.success('Reschedule requested'); setViewConsultOpen(false); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-border hover:bg-muted transition-colors">Reschedule</button>
              <button onClick={() => { toast.success(`Joining session with ${selectedConsult.client}`); setViewConsultOpen(false); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2"
                style={{ background: ACCENT }}>
                <Video size={14} /> Join Session
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CoachDashboard;
