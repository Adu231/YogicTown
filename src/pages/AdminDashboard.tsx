import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Leaf, Home, Users, BookOpen, BarChart3, Settings, LogOut,
  Menu, X, Bell, DollarSign, Shield, AlertCircle,
  CheckCircle, UserCheck, UserX, Eye, Filter, Search, Trash2,
  Globe, Activity, Database, Flag, ChevronUp, Mail, Phone, MapPin,
  Calendar, Lock, Edit,
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
  CartesianGrid, BarChart, Bar, PieChart, Pie, Cell, Legend,
} from 'recharts';

// ─── Data ────────────────────────────────────────────────────────────────────

const platformData = [
  { month: 'Jan', users: 12400, revenue: 485000, sessions: 9800 },
  { month: 'Feb', users: 15800, revenue: 620000, sessions: 12400 },
  { month: 'Mar', users: 13200, revenue: 534000, sessions: 10600 },
  { month: 'Apr', users: 22900, revenue: 890000, sessions: 18200 },
  { month: 'May', users: 31500, revenue: 1240000, sessions: 25100 },
  { month: 'Jun', users: 42800, revenue: 1680000, sessions: 34200 },
];

const subData = [
  { name: 'Free', value: 68, color: 'hsl(220 10% 70%)' },
  { name: 'Basic', value: 14, color: 'hsl(133 18% 59%)' },
  { name: 'Yogi', value: 12, color: 'hsl(27 87% 67%)' },
  { name: 'Elite', value: 6, color: 'hsl(45 80% 50%)' },
];

const INITIAL_USERS = [
  { id: 1, name: 'Meera Singh', email: 'meera@ex.com', phone: '+91 98765 43210', role: 'user', plan: 'Premium', joined: 'May 10', status: 'active', location: 'Bangalore', bio: 'Yoga practitioner for 3 years. Loves Vinyasa and morning meditation.', sessions: 42, avatar: 'https://ui-avatars.com/api/?name=Meera+Singh&background=84A98C&color=fff' },
  { id: 2, name: 'Ananya Krishnan', email: 'instructor@example.com', phone: '+91 87654 32109', role: 'instructor', plan: 'Elite', joined: 'Jun 10, 24', status: 'verified', location: 'Mumbai', bio: 'Certified RYT-500 with 8 years experience.', sessions: 312, avatar: 'https://ui-avatars.com/api/?name=Ananya+K&background=F4A261&color=fff' },
  { id: 3, name: 'Rishikesh Wellness', email: 'organizer@example.com', phone: '+91 76543 21098', role: 'organizer', plan: 'Elite', joined: 'Mar 22, 24', status: 'active', location: 'Rishikesh', bio: 'Premier yoga retreat center in the Himalayas.', sessions: 0, avatar: 'https://ui-avatars.com/api/?name=RW+Center&background=5B8FB9&color=fff' },
  { id: 4, name: 'Rahul Verma', email: 'rahul@ex.com', phone: '+91 65432 10987', role: 'user', plan: 'Free', joined: 'May 28', status: 'active', location: 'Delhi', bio: 'Beginner looking to reduce stress through yoga.', sessions: 8, avatar: 'https://ui-avatars.com/api/?name=Rahul+V&background=A98B84&color=fff' },
  { id: 5, name: 'Dr. Priya Nair', email: 'coach@example.com', phone: '+91 54321 09876', role: 'coach', plan: 'Elite', joined: 'Sep 5, 24', status: 'verified', location: 'Pune', bio: 'Ayurvedic nutritionist with 10+ years experience.', sessions: 187, avatar: 'https://ui-avatars.com/api/?name=Dr+Priya&background=84A98C&color=fff' },
  { id: 6, name: 'Kiran Shah', email: 'kiran@ex.com', phone: '+91 43210 98765', role: 'user', plan: 'Basic', joined: 'Jun 5', status: 'suspended', location: 'Ahmedabad', bio: 'Intermediate practitioner focusing on flexibility.', sessions: 15, avatar: 'https://ui-avatars.com/api/?name=Kiran+S&background=D97B7B&color=fff' },
];

const PENDING_VERIFICATIONS = [
  { name: 'Yogi Arun Kumar', type: 'Instructor', cert: 'RYT-200', submitted: '2 days ago', specialization: 'Kundalini Yoga', experience: '5 years', avatar: 'https://ui-avatars.com/api/?name=Yogi+Arun&background=84A98C&color=fff' },
  { name: 'Serene Wellness Spa', type: 'Organizer', cert: 'Business Registration', submitted: '5 days ago', specialization: 'Ayurvedic Retreats', experience: '3 years', avatar: 'https://ui-avatars.com/api/?name=Serene+W&background=5B8FB9&color=fff' },
  { name: 'Nisha Mehta', type: 'Coach', cert: 'Nutrition Diploma', submitted: '1 day ago', specialization: 'Sports Nutrition', experience: '7 years', avatar: 'https://ui-avatars.com/api/?name=Nisha+M&background=F4A261&color=fff' },
];

const FLAGGED_CONTENT = [
  { content: 'Spam comment in Beginner Yogis group offering crypto trading bots', reporter: 'Meera S.', time: '1h ago', severity: 'low' },
  { content: 'Misleading retreat pricing claims - showing ₹500 instead of ₹50,000 to attract clicks', reporter: 'Rahul V.', time: '3h ago', severity: 'high' },
  { content: 'Inappropriate profile photo containing offensive graphics', reporter: 'System (AI Shield)', time: '6h ago', severity: 'medium' },
  { content: 'Abusive language and personal attacks in Advanced Pranayama forum', reporter: 'Ananya K.', time: '12h ago', severity: 'high' },
  { content: 'Promotional link spam in Kerala Detox retreat chat', reporter: 'Yogi Arun', time: '1d ago', severity: 'low' },
  { content: 'Copyrighted audio upload in Sound Healing session without owner permission', reporter: 'System (Copyright Filter)', time: '2d ago', severity: 'medium' },
  { content: 'Disruptive behavior and shouting reported during live Kundalini session', reporter: 'Serene K.', time: '3d ago', severity: 'medium' },
  { content: 'Suspicious login attempts detected from multiple countries for instructor account', reporter: 'System Security', time: '4d ago', severity: 'high' },
  { content: 'Unverified medical advice claiming yoga cures stage 4 cancer in group post', reporter: 'Dr. Priya', time: '5d ago', severity: 'medium' },
  { content: 'Duplicate accounts creation spam from single IP range in short succession', reporter: 'System Security', time: '6d ago', severity: 'low' },
  { content: 'Off-topic political argument in Rishikesh travel advisory thread', reporter: 'Rahul Verma', time: '1w ago', severity: 'low' },
  { content: 'Payment fraud alert flagged by gatekeeper integrations (Stripe Shield)', reporter: 'System', time: '1w ago', severity: 'high' },
  { content: 'Selling unauthorized herbal products claiming weight loss of 10kg in 1 week', reporter: 'Nisha Mehta', time: '1w ago', severity: 'medium' },
  { content: 'Impersonating a certified coach and sending private solicitations', reporter: 'Kiran Shah', time: '1w ago', severity: 'high' },
  { content: 'Harassment reported in direct messaging - continuous spamming and offensive remarks', reporter: 'Priya N.', time: '2w ago', severity: 'high' },
  { content: 'Spamming multiple retreat discussions with affiliate product links', reporter: 'Yogi Arun Kumar', time: '2w ago', severity: 'low' },
  { content: 'Irrelevant advertisement post for an insurance company in meditation room', reporter: 'System (Ad Detector)', time: '2w ago', severity: 'low' },
  { content: 'Violent or threatening comments in the Himalayan Retreat general forum', reporter: 'Rahul Verma', time: '3w ago', severity: 'high' },
];

const NAV = [
  { icon: Home, label: 'Overview', id: 'overview' },
  { icon: Users, label: 'User Management', id: 'users' },
  { icon: UserCheck, label: 'Verifications', id: 'verifications' },
  { icon: Flag, label: 'Moderation', id: 'moderation' },
  { icon: BarChart3, label: 'Platform Analytics', id: 'analytics' },
  { icon: Database, label: 'Subscriptions', id: 'subscriptions' },
];

const ADMIN_COLOR = 'hsl(220 70% 60%)';

// ─── Component ───────────────────────────────────────────────────────────────

const AdminDashboard = () => {
  useScrollTop();
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const [userList, setUserList] = useState(() => {
    const stored = localStorage.getItem('admin_users');
    if (stored) {
      try { return JSON.parse(stored); } catch { return INITIAL_USERS; }
    }
    return INITIAL_USERS;
  });

  const [pendingList, setPendingList] = useState(() => {
    const stored = localStorage.getItem('admin_pending_verifications');
    if (stored) {
      try { return JSON.parse(stored); } catch { return PENDING_VERIFICATIONS; }
    }
    return PENDING_VERIFICATIONS;
  });

  const [flaggedList, setFlaggedList] = useState(() => {
    const stored = localStorage.getItem('admin_flagged_content_v2');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.length === 0 || parsed.length < 5) {
          return FLAGGED_CONTENT;
        }
        return parsed;
      } catch { return FLAGGED_CONTENT; }
    }
    return FLAGGED_CONTENT;
  });

  const [notifications, setNotifications] = useState(() => {
    const stored = localStorage.getItem('admin_notifications');
    if (stored) {
      try { return JSON.parse(stored); } catch { return []; }
    }
    return [
      { id: 1, title: 'New Verification Request 👤', desc: 'Yogi Arun Kumar submitted certification documents.', time: '2 hours ago', read: false },
      { id: 2, title: 'Flagged Content Report 🚩', desc: 'Meera S. reported a spam comment in the Beginner Yogis group.', time: '5 hours ago', read: false },
      { id: 3, title: 'System Security Update 🔒', desc: 'Automatic system security protocols completed successfully.', time: '1 day ago', read: true },
    ];
  });

  const [userSortBy, setUserSortBy] = useState('name-asc');
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  // Modal states
  const [newUserOpen, setNewUserOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [viewUserOpen, setViewUserOpen] = useState(false);
  const [viewVerifOpen, setViewVerifOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof INITIAL_USERS[0] | null>(null);
  const [selectedVerif, setSelectedVerif] = useState<typeof PENDING_VERIFICATIONS[0] | null>(null);

  // User form states
  const [newUserForm, setNewUserForm] = useState({ name: '', email: '', phone: '', role: 'user', plan: 'Free', location: '', bio: '', password: '' });
  const [editUserForm, setEditUserForm] = useState({ name: '', email: '', phone: '', role: 'user', plan: 'Free', location: '', bio: '' });

  // Persistence effects
  useEffect(() => { localStorage.setItem('admin_users', JSON.stringify(userList)); }, [userList]);
  useEffect(() => { localStorage.setItem('admin_pending_verifications', JSON.stringify(pendingList)); }, [pendingList]);
  useEffect(() => { localStorage.setItem('admin_flagged_content_v2', JSON.stringify(flaggedList)); }, [flaggedList]);
  useEffect(() => { localStorage.setItem('admin_notifications', JSON.stringify(notifications)); }, [notifications]);

  if (!user) { navigate('/login', { replace: true }); return null; }
  const handleLogout = () => { logout(); toast.success('See you soon!'); navigate('/'); };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserForm.name || !newUserForm.email || !newUserForm.password) { toast.error('Please fill all required fields'); return; }
    const nextId = userList.length > 0 ? Math.max(...userList.map(u => u.id)) + 1 : 1;
    const newUser = {
      id: nextId,
      name: newUserForm.name,
      email: newUserForm.email,
      phone: newUserForm.phone,
      role: newUserForm.role,
      plan: newUserForm.plan,
      joined: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      status: 'active',
      location: newUserForm.location,
      bio: newUserForm.bio,
      sessions: 0,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newUserForm.name)}&background=84A98C&color=fff`,
    };
    setUserList(prev => [newUser, ...prev]);
    setNewUserOpen(false);
    setNewUserForm({ name: '', email: '', phone: '', role: 'user', plan: 'Free', location: '', bio: '', password: '' });
    toast.success(`User "${newUser.name}" created successfully!`);
  };

  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !editUserForm.name || !editUserForm.email) { toast.error('Please fill all required fields'); return; }
    const updatedUser = {
      ...selectedUser,
      name: editUserForm.name,
      email: editUserForm.email,
      phone: editUserForm.phone,
      role: editUserForm.role,
      plan: editUserForm.plan,
      location: editUserForm.location,
      bio: editUserForm.bio,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(editUserForm.name)}&background=84A98C&color=fff`,
    };
    setUserList(prev => prev.map(u => u.id === selectedUser.id ? updatedUser : u));
    setEditUserOpen(false);
    toast.success(`User "${editUserForm.name}" updated successfully!`);
  };

  const openEditModal = (user: typeof INITIAL_USERS[0]) => {
    setSelectedUser(user);
    setEditUserForm({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      role: user.role,
      plan: user.plan,
      location: user.location || '',
      bio: user.bio || '',
    });
    setEditUserOpen(true);
  };

  const filteredUsers = userList.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    if (userSortBy === 'name-asc') {
      return a.name.localeCompare(b.name);
    }
    if (userSortBy === 'name-desc') {
      return b.name.localeCompare(a.name);
    }
    if (userSortBy === 'joined-new') {
      return b.id - a.id;
    }
    if (userSortBy === 'role') {
      return a.role.localeCompare(b.role);
    }
    return 0;
  });

  const suspendUser = (id: number) => {
    setUserList(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'suspended' ? 'active' : 'suspended' } : u));
    toast.success('User status updated');
  };

  const approveVerification = (name: string) => {
    setPendingList(prev => prev.filter(v => v.name !== name));
    toast.success(`${name} verified successfully!`);
  };


  const statusColor = (s: string) =>
    s === 'active' ? 'bg-green-100 text-green-700' :
    s === 'verified' ? 'bg-blue-100 text-blue-700' :
    s === 'suspended' ? 'bg-red-100 text-red-700' :
    'bg-muted text-muted-foreground';

  const roleColor = (r: string) =>
    r === 'instructor' ? 'bg-orange-100 text-orange-700' :
    r === 'organizer' ? 'bg-blue-100 text-blue-700' :
    r === 'coach' ? 'bg-green-100 text-green-700' :
    r === 'admin' ? 'bg-purple-100 text-purple-700' :
    'bg-muted text-muted-foreground';

  const dismissFlag = (content: string) => {
    setFlaggedList(prev => prev.filter(f => f.content !== content));
    toast.success('Flag dismissed');
  };

  const warnUser = (content: string, reporter: string) => {
    setFlaggedList(prev => prev.filter(f => f.content !== content));
    toast.warning('Warning alert dispatched to content creator');
    const newNotif = {
      id: Date.now(),
      title: 'Warning Dispatched ⚠️',
      desc: `Warning alert dispatched for flagged activity reported by ${reporter}.`,
      time: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const resolveFlag = (content: string, reporter: string) => {
    setFlaggedList(prev => prev.filter(f => f.content !== content));
    toast.success('Content removed and warning dispatched');
    const newNotif = {
      id: Date.now(),
      title: 'Content Moderated 🛑',
      desc: `Content has been removed in response to standard report by ${reporter}.`,
      time: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

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
        <div className="px-3 py-3 border-b border-sidebar-border mx-3 mt-2 mb-1 rounded-xl" style={{ background: 'hsl(220 70% 95%)' }}>
          <div className="flex items-center gap-1.5">
            <Shield size={12} style={{ color: ADMIN_COLOR }} />
            <div className="text-xs font-semibold" style={{ color: 'hsl(220 70% 40%)' }}>Admin Portal</div>
          </div>
          <div className="text-xs text-muted-foreground truncate">{user.name}</div>
        </div>
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {NAV.map(({ icon: Icon, label, id }) => (
            <button key={id} onClick={() => { setActiveNav(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeNav === id ? 'text-white' : 'text-sidebar-foreground hover:bg-sidebar-accent'}`}
              style={activeNav === id ? { background: ADMIN_COLOR } : {}}>
              <Icon size={18} /> {label}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-sidebar-border space-y-1">
          <button onClick={() => { setActiveNav('settings'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeNav === 'settings' ? 'text-white' : 'text-sidebar-foreground hover:bg-sidebar-accent'}`}
            style={activeNav === 'settings' ? { background: ADMIN_COLOR } : {}}>
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
              <h1 className="text-base font-semibold flex items-center gap-2">
                <Shield size={16} style={{ color: ADMIN_COLOR }} /> Admin Control Center
              </h1>
              <p className="text-xs text-muted-foreground">Platform management & governance</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="relative">
              <button onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted relative">
                <Bell size={18} />
                {notifications.some(n => !n.read) && (
                  <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
                )}
              </button>
              {notifDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotifDropdownOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-border mb-1">
                      <span className="font-semibold text-sm">Notifications</span>
                      <button onClick={() => { setNotifications(prev => prev.map(n => ({ ...n, read: true }))); toast.success('All marked as read'); }}
                        className="text-xs hover:underline font-semibold" style={{ color: ADMIN_COLOR }}>
                        Mark all read
                      </button>
                    </div>
                    <div className="max-h-64 overflow-y-auto divide-y divide-border/60">
                      {notifications.length === 0 ? (
                        <p className="text-center text-xs text-muted-foreground py-6">No new notifications</p>
                      ) : (
                        notifications.map(n => (
                          <div key={n.id} className={`p-3 text-left hover:bg-muted/40 transition-colors ${!n.read ? 'bg-muted/20 font-medium' : ''}`}>
                            <div className="flex justify-between gap-2 mb-1">
                              <span className="font-semibold text-xs truncate">{n.title}</span>
                              <span className="text-[10px] text-muted-foreground shrink-0">{n.time}</span>
                            </div>
                            <p className="text-muted-foreground text-[11px] leading-relaxed">{n.desc}</p>
                            {!n.read && (
                              <button onClick={() => setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, read: true } : item))}
                                className="text-[10px] mt-1.5 hover:underline block font-semibold" style={{ color: ADMIN_COLOR }}>
                                Mark as read
                              </button>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            <Link to="/profile">
              <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border-2" style={{ borderColor: ADMIN_COLOR }} />
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">

          {/* ── Overview ── */}
          {activeNav === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Users', value: String(userList.length * 20842), change: '+2,341 this month', icon: Users, color: ADMIN_COLOR, bg: 'hsl(220 70% 95%)' },
                  { label: 'Monthly Revenue', value: '₹16.8L', change: '+35% growth', icon: DollarSign, color: 'hsl(133 18% 59%)', bg: 'hsl(133 20% 92%)' },
                  { label: 'Active Sessions', value: '34,218', change: '+8,140 this month', icon: Activity, color: 'hsl(27 87% 67%)', bg: 'hsl(27 87% 93%)' },
                  { label: 'Platform Health', value: '99.8%', change: 'Uptime this month', icon: Globe, color: 'hsl(160 40% 50%)', bg: 'hsl(160 40% 93%)' },
                ].map(({ label, value, change, icon: Icon, color, bg }, i) => (
                  <div key={i} className="card-wellness">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: bg }}>
                        <Icon size={18} style={{ color }} />
                      </div>
                      <div className="flex items-center gap-1 text-xs" style={{ color: 'hsl(133 18% 59%)' }}>
                        <ChevronUp size={12} /> {change.split(' ')[0]}
                      </div>
                    </div>
                    <div className="text-3xl font-bold mb-0.5" style={{ fontFamily: 'Playfair Display, serif', color }}>{value}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {[
                  { label: 'Pending Verifications', value: pendingList.length, color: 'hsl(45 80% 50%)', bg: 'hsl(45 80% 93%)', icon: UserCheck, action: () => setActiveNav('verifications') },
                  { label: 'Flagged Content', value: flaggedList.length, color: 'hsl(0 70% 60%)', bg: 'hsl(0 70% 93%)', icon: Flag, action: () => setActiveNav('moderation') },
                  { label: 'Support Tickets', value: 7, color: ADMIN_COLOR, bg: 'hsl(220 70% 95%)', icon: AlertCircle, action: () => toast.info('Opening support tickets...') },
                ].map(({ label, value, color, bg, icon: Icon, action }, i) => (
                  <button key={i} onClick={action} className="card-wellness flex items-center gap-4 hover:shadow-md transition-all text-left w-full">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg }}>
                      <Icon size={20} style={{ color }} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color }}>{value}</div>
                      <div className="text-xs text-muted-foreground">{label} — click to review</div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 card-wellness">
                  <h3 className="font-semibold mb-4">Platform Growth (6 months)</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={platformData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gUsers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(220,70%,60%)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(220,70%,60%)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                      <Tooltip 
                        formatter={(v: number) => [`${v.toLocaleString()}`, 'Users']} 
                        contentStyle={{ 
                          backgroundColor: isDark ? 'hsl(var(--card))' : '#ffffff', 
                          borderColor: isDark ? 'hsl(var(--border))' : '#e2e8f0', 
                          borderRadius: '12px',
                          color: isDark ? 'hsl(var(--foreground))' : '#000000'
                        }} 
                        itemStyle={{ color: isDark ? 'hsl(var(--foreground))' : '#000000' }}
                        labelStyle={{ color: isDark ? 'hsl(var(--foreground))' : '#000000', fontWeight: 600 }}
                      />
                      <Area type="monotone" dataKey="users" name="Users" stroke="hsl(220,70%,60%)" fill="url(#gUsers)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="card-wellness">
                  <h3 className="font-semibold mb-4">Subscription Split</h3>
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie data={subData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                        {subData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip 
                        formatter={(v: number) => [`${v}%`, '']} 
                        contentStyle={{ 
                          backgroundColor: isDark ? 'hsl(var(--card))' : '#ffffff', 
                          borderColor: isDark ? 'hsl(var(--border))' : '#e2e8f0', 
                          borderRadius: '12px',
                          color: isDark ? 'hsl(var(--foreground))' : '#000000'
                        }} 
                        itemStyle={{ color: isDark ? 'hsl(var(--foreground))' : '#000000' }}
                        labelStyle={{ color: isDark ? 'hsl(var(--foreground))' : '#000000', fontWeight: 600 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-1.5">
                    {subData.map((d, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                          <span>{d.name}</span>
                        </div>
                        <span className="font-medium">{d.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Users ── */}
          {activeNav === 'users' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold">User Management</h2>
                  <p className="text-sm text-muted-foreground">Manage all platform users and roles</p>
                </div>
                <div className="flex gap-2 items-center flex-wrap">
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 rounded-xl bg-muted border border-transparent focus:outline-none focus:ring-2 focus:ring-primary text-sm w-48 text-foreground"
                    />
                  </div>
                  <select
                    value={userSortBy}
                    onChange={(e) => setUserSortBy(e.target.value)}
                    className="px-3 py-2 rounded-xl text-sm border border-border bg-background font-medium focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  >
                    <option value="name-asc">Sort: Name (A-Z)</option>
                    <option value="name-desc">Sort: Name (Z-A)</option>
                    <option value="joined-new">Sort: Newest Joined</option>
                    <option value="role">Sort: Role</option>
                  </select>
                  <button onClick={() => setNewUserOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: ADMIN_COLOR }}>
                    + Add User
                  </button>
                </div>
              </div>

              <div className="card-wellness overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-xs font-medium text-muted-foreground py-3 pr-4">User</th>
                      <th className="text-left text-xs font-medium text-muted-foreground py-3 pr-4 hidden md:table-cell">Role</th>
                      <th className="text-left text-xs font-medium text-muted-foreground py-3 pr-4 hidden sm:table-cell">Plan</th>
                      <th className="text-left text-xs font-medium text-muted-foreground py-3 pr-4 hidden lg:table-cell">Joined</th>
                      <th className="text-left text-xs font-medium text-muted-foreground py-3 pr-4">Status</th>
                      <th className="text-left text-xs font-medium text-muted-foreground py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-3">
                            <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full" />
                            <div>
                              <div className="text-sm font-medium">{u.name}</div>
                              <div className="text-xs text-muted-foreground hidden sm:block">{u.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 pr-4 hidden md:table-cell">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${roleColor(u.role)}`}>{u.role}</span>
                        </td>
                        <td className="py-3 pr-4 hidden sm:table-cell">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted font-medium">{u.plan}</span>
                        </td>
                        <td className="py-3 pr-4 hidden lg:table-cell text-xs text-muted-foreground">{u.joined}</td>
                        <td className="py-3 pr-4">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(u.status)}`}>{u.status}</span>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <button onClick={() => { setSelectedUser(u); setViewUserOpen(true); }}
                              className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" title="View Details">
                              <Eye size={13} />
                            </button>
                            <button onClick={() => openEditModal(u)}
                              className="p-1.5 rounded-lg hover:bg-muted transition-colors text-blue-600" title="Edit User">
                              <Edit size={13} />
                            </button>
                            <button onClick={() => suspendUser(u.id)}
                              className={`p-1.5 rounded-lg hover:bg-muted transition-colors ${u.status === 'suspended' ? 'text-green-600' : 'text-red-500'}`}
                              title={u.status === 'suspended' ? 'Unsuspend' : 'Suspend'}>
                              {u.status === 'suspended' ? <CheckCircle size={13} /> : <UserX size={13} />}
                            </button>
                            <button onClick={() => { 
                              if (window.confirm(`Are you sure you want to delete ${u.name}?`)) {
                                setUserList(prev => prev.filter(x => x.id !== u.id)); 
                                toast.success('User removed'); 
                              }
                            }}
                              className="p-1.5 rounded-lg hover:bg-muted transition-colors text-red-500" title="Delete">
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && (
                      <tr><td colSpan={6} className="py-10 text-center text-sm text-muted-foreground">No users found matching your search.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Verifications ── */}
          {activeNav === 'verifications' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold">Instructor & Partner Verifications</h2>
                <p className="text-sm text-muted-foreground">Review and approve certification submissions</p>
              </div>
              {pendingList.length === 0 ? (
                <div className="card-wellness text-center py-16">
                  <CheckCircle size={40} className="mx-auto mb-3" style={{ color: 'hsl(133 18% 59%)' }} />
                  <h3 className="font-semibold mb-1">All Caught Up!</h3>
                  <p className="text-sm text-muted-foreground">No pending verifications at this time.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingList.map((v, i) => (
                    <div key={i} className="card-wellness flex flex-wrap items-center gap-4">
                      <img src={v.avatar} alt={v.name} className="w-12 h-12 rounded-full shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-semibold text-sm">{v.name}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'hsl(220 70% 95%)', color: ADMIN_COLOR }}>{v.type}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">📄 {v.cert} · Submitted {v.submitted} · {v.specialization}</div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => { setSelectedVerif(v); setViewVerifOpen(true); }}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-border hover:bg-muted transition-colors">
                          <Eye size={12} /> View Docs
                        </button>
                        <button onClick={() => approveVerification(v.name)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white"
                          style={{ background: 'hsl(133 18% 59%)' }}>
                          <CheckCircle size={12} /> Approve
                        </button>
                        <button onClick={() => { 
                          if (window.confirm(`Reject verification for ${v.name}?`)) {
                            setPendingList(prev => prev.filter(x => x.name !== v.name)); 
                            toast.error('Verification rejected'); 
                          }
                        }}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white"
                          style={{ background: 'hsl(0 60% 60%)' }}>
                          <UserX size={12} /> Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Moderation ── */}
          {activeNav === 'moderation' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold">Community Moderation</h2>
                  <p className="text-sm text-muted-foreground">Review flagged content and community violations</p>
                </div>
                <button
                  onClick={() => {
                    setFlaggedList(FLAGGED_CONTENT);
                    toast.success('Mock moderation data re-seeded successfully!');
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 bg-amber-600"
                >
                  <Flag size={14} /> Re-seed Mock Data
                </button>
              </div>
              {flaggedList.length === 0 ? (
                <div className="card-wellness text-center py-16">
                  <CheckCircle size={40} className="mx-auto mb-3" style={{ color: 'hsl(133 18% 59%)' }} />
                  <h3 className="font-semibold mb-1">Community is Clean!</h3>
                  <p className="text-sm text-muted-foreground">No flagged content to review.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {flaggedList.map((f, i) => (
                    <div key={i} className="card-wellness">
                      <div className="flex items-start gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${f.severity === 'high' ? 'bg-red-100' : f.severity === 'medium' ? 'bg-yellow-100' : 'bg-muted'}`}>
                          <Flag size={18} className={f.severity === 'high' ? 'text-red-600' : f.severity === 'medium' ? 'text-yellow-600' : 'text-muted-foreground'} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${f.severity === 'high' ? 'bg-red-100 text-red-700' : f.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-muted text-muted-foreground'}`}>{f.severity} severity</span>
                            <span className="text-xs text-muted-foreground">{f.time}</span>
                          </div>
                          <p className="text-sm font-medium mb-1">{f.content}</p>
                          <p className="text-xs text-muted-foreground">Reported by: {f.reporter}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => dismissFlag(f.content)}
                          className="flex-1 py-2 rounded-xl text-xs font-semibold border border-border hover:bg-muted transition-colors">Dismiss</button>
                        <button onClick={() => warnUser(f.content, f.reporter)}
                          className="flex-1 py-2 rounded-xl text-xs font-semibold border border-yellow-300 text-yellow-700 hover:bg-yellow-50 transition-colors">Warn User</button>
                        <button onClick={() => resolveFlag(f.content, f.reporter)}
                          className="flex-1 py-2 rounded-xl text-xs font-semibold text-white" style={{ background: 'hsl(0 60% 60%)' }}>Remove Content</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Analytics ── */}
          {activeNav === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold">Platform Analytics</h2>
                <p className="text-sm text-muted-foreground">Comprehensive platform performance metrics</p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Sessions', value: '3.4M', color: ADMIN_COLOR },
                  { label: 'Avg. Session Length', value: '38 min', color: 'hsl(27 87% 67%)' },
                  { label: 'Retention Rate', value: '72%', color: 'hsl(133 18% 59%)' },
                  { label: 'NPS Score', value: '67', color: 'hsl(45 80% 50%)' },
                ].map((k, i) => (
                  <div key={i} className="card-wellness text-center py-5">
                    <div className="text-3xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: k.color }}>{k.value}</div>
                    <div className="text-xs text-muted-foreground">{k.label}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card-wellness">
                  <h3 className="font-semibold mb-4">Revenue Trend (₹)</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={platformData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 100000).toFixed(1)}L`} />
                      <Tooltip 
                        formatter={(v: number) => [`₹${v.toLocaleString()}`, 'Revenue']} 
                        contentStyle={{ 
                          backgroundColor: isDark ? 'hsl(var(--card))' : '#ffffff', 
                          borderColor: isDark ? 'hsl(var(--border))' : '#e2e8f0', 
                          borderRadius: '12px',
                          color: isDark ? 'hsl(var(--foreground))' : '#000000'
                        }} 
                        itemStyle={{ color: isDark ? 'hsl(var(--foreground))' : '#000000' }}
                        labelStyle={{ color: isDark ? 'hsl(var(--foreground))' : '#000000', fontWeight: 600 }}
                      />
                      <Bar dataKey="revenue" name="Revenue" fill="hsl(220,70%,60%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="card-wellness">
                  <h3 className="font-semibold mb-4">Session Volume</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={platformData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gSess" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(133,18%,59%)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(133,18%,59%)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: isDark ? 'hsl(var(--card))' : '#ffffff', 
                          borderColor: isDark ? 'hsl(var(--border))' : '#e2e8f0', 
                          borderRadius: '12px',
                          color: isDark ? 'hsl(var(--foreground))' : '#000000'
                        }} 
                        itemStyle={{ color: isDark ? 'hsl(var(--foreground))' : '#000000' }}
                        labelStyle={{ color: isDark ? 'hsl(var(--foreground))' : '#000000', fontWeight: 600 }}
                      />
                      <Area type="monotone" dataKey="sessions" name="Sessions" stroke="hsl(133,18%,59%)" fill="url(#gSess)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* ── Subscriptions ── */}
          {activeNav === 'subscriptions' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold">Subscription Management</h2>
                <p className="text-sm text-muted-foreground">Monitor memberships and revenue across all plans</p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { plan: 'Free', users: '84,892', revenue: '₹0', color: 'hsl(220 10% 70%)' },
                  { plan: 'Basic (Seeker)', users: '17,478', revenue: '₹3.49L', color: 'hsl(133 18% 59%)' },
                  { plan: 'Yogi', users: '14,981', revenue: '₹8.96L', color: 'hsl(27 87% 67%)' },
                  { plan: 'Elite', users: '7,491', revenue: '₹4.35L', color: 'hsl(45 80% 50%)' },
                ].map((p, i) => (
                  <div key={i} className="card-wellness text-center py-5">
                    <div className="w-3 h-3 rounded-full mx-auto mb-3" style={{ background: p.color }} />
                    <div className="text-xs font-semibold mb-2 text-muted-foreground">{p.plan}</div>
                    <div className="text-2xl font-bold mb-0.5" style={{ fontFamily: 'Playfair Display, serif', color: p.color }}>{p.users}</div>
                    <div className="text-xs text-muted-foreground">users</div>
                    <div className="text-sm font-semibold mt-2" style={{ color: p.color }}>{p.revenue}/mo</div>
                  </div>
                ))}
              </div>
              <div className="card-wellness">
                <h3 className="font-semibold mb-4">Subscription Distribution</h3>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <ResponsiveContainer width={200} height={200}>
                    <PieChart>
                      <Pie data={subData} cx="50%" cy="50%" outerRadius={80} dataKey="value" paddingAngle={4}>
                        {subData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip 
                        formatter={(v: number) => [`${v}%`, '']} 
                        contentStyle={{ 
                          backgroundColor: isDark ? 'hsl(var(--card))' : '#ffffff', 
                          borderColor: isDark ? 'hsl(var(--border))' : '#e2e8f0', 
                          borderRadius: '12px',
                          color: isDark ? 'hsl(var(--foreground))' : '#000000'
                        }} 
                        itemStyle={{ color: isDark ? 'hsl(var(--foreground))' : '#000000' }}
                        labelStyle={{ color: isDark ? 'hsl(var(--foreground))' : '#000000', fontWeight: 600 }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex-1 space-y-4 w-full">
                    {subData.map((d, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="font-medium">{d.name}</span>
                          <span className="font-bold" style={{ color: d.color }}>{d.value}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${d.value}%`, background: d.color }} />
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

      {/* ── Modal: Add New User ── */}
      <Modal open={newUserOpen} onClose={() => setNewUserOpen(false)} title="Add New User" subtitle="Create a new platform account" accentColor={ADMIN_COLOR}>
        <form onSubmit={handleAddUser} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Full Name" required>
              <input value={newUserForm.name} onChange={e => setNewUserForm(p => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Meera Sharma" className={inputClass} />
            </FormField>
            <FormField label="Email Address" required>
              <input type="email" value={newUserForm.email} onChange={e => setNewUserForm(p => ({ ...p, email: e.target.value }))}
                placeholder="user@example.com" className={inputClass} />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Phone Number">
              <input value={newUserForm.phone} onChange={e => setNewUserForm(p => ({ ...p, phone: e.target.value }))}
                placeholder="+91 98765 43210" className={inputClass} />
            </FormField>
            <FormField label="Location">
              <input value={newUserForm.location} onChange={e => setNewUserForm(p => ({ ...p, location: e.target.value }))}
                placeholder="City, Country" className={inputClass} />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Role" required>
              <select value={newUserForm.role} onChange={e => setNewUserForm(p => ({ ...p, role: e.target.value }))} className={selectClass}>
                <option value="user">Wellness User</option>
                <option value="instructor">Yoga Instructor</option>
                <option value="organizer">Retreat Organizer</option>
                <option value="coach">Wellness Coach</option>
                <option value="admin">Admin</option>
              </select>
            </FormField>
            <FormField label="Subscription Plan">
              <select value={newUserForm.plan} onChange={e => setNewUserForm(p => ({ ...p, plan: e.target.value }))} className={selectClass}>
                {['Free', 'Basic', 'Premium', 'Elite'].map(p => <option key={p}>{p}</option>)}
              </select>
            </FormField>
          </div>
          <FormField label="Temporary Password" required>
            <input type="password" value={newUserForm.password} onChange={e => setNewUserForm(p => ({ ...p, password: e.target.value }))}
              placeholder="Min. 8 characters" className={inputClass} />
          </FormField>
          <FormField label="Bio / Notes">
            <textarea value={newUserForm.bio} onChange={e => setNewUserForm(p => ({ ...p, bio: e.target.value }))}
              placeholder="Brief description or admin notes..." rows={2} className={textareaClass} />
          </FormField>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setNewUserOpen(false)}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-border hover:bg-muted transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: ADMIN_COLOR }}>Create User</button>
          </div>
        </form>
      </Modal>

      {/* ── Modal: Edit User ── */}
      <Modal open={editUserOpen} onClose={() => setEditUserOpen(false)} title="Edit User" subtitle={selectedUser?.name} accentColor={ADMIN_COLOR}>
        {selectedUser && (
          <form onSubmit={handleEditUser} className="space-y-4">
            <div className="flex items-center gap-4 mb-4 p-4 rounded-xl bg-muted/40">
              <img src={selectedUser.avatar} alt={selectedUser.name} className="w-12 h-12 rounded-full border-2" style={{ borderColor: ADMIN_COLOR }} />
              <div>
                <h3 className="font-bold">Editing: {selectedUser.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(selectedUser.status)}`}>{selectedUser.status}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Full Name" required>
                <input value={editUserForm.name} onChange={e => setEditUserForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Full name" className={inputClass} />
              </FormField>
              <FormField label="Email Address" required>
                <input type="email" value={editUserForm.email} onChange={e => setEditUserForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="Email address" className={inputClass} />
              </FormField>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Phone Number">
                <input value={editUserForm.phone} onChange={e => setEditUserForm(p => ({ ...p, phone: e.target.value }))}
                  placeholder="Phone number" className={inputClass} />
              </FormField>
              <FormField label="Location">
                <input value={editUserForm.location} onChange={e => setEditUserForm(p => ({ ...p, location: e.target.value }))}
                  placeholder="City, Country" className={inputClass} />
              </FormField>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Role" required>
                <select value={editUserForm.role} onChange={e => setEditUserForm(p => ({ ...p, role: e.target.value }))} className={selectClass}>
                  <option value="user">Wellness User</option>
                  <option value="instructor">Yoga Instructor</option>
                  <option value="organizer">Retreat Organizer</option>
                  <option value="coach">Wellness Coach</option>
                  <option value="admin">Admin</option>
                </select>
              </FormField>
              <FormField label="Subscription Plan">
                <select value={editUserForm.plan} onChange={e => setEditUserForm(p => ({ ...p, plan: e.target.value }))} className={selectClass}>
                  {['Free', 'Basic', 'Premium', 'Elite'].map(p => <option key={p}>{p}</option>)}
                </select>
              </FormField>
            </div>
            
            <FormField label="Bio / Notes">
              <textarea value={editUserForm.bio} onChange={e => setEditUserForm(p => ({ ...p, bio: e.target.value }))}
                placeholder="User bio or admin notes..." rows={3} className={textareaClass} />
            </FormField>
            
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setEditUserOpen(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-border hover:bg-muted transition-colors">Cancel</button>
              <button type="submit" className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: ADMIN_COLOR }}>Save Changes</button>
            </div>
          </form>
        )}
      </Modal>

      {/* ── Modal: View User Details ── */}
      <Modal open={viewUserOpen} onClose={() => setViewUserOpen(false)} title="User Details" subtitle={selectedUser?.name} accentColor={ADMIN_COLOR} size="lg">
        {selectedUser && (
          <div className="space-y-5">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/40">
              <img src={selectedUser.avatar} alt={selectedUser.name} className="w-16 h-16 rounded-full border-2" style={{ borderColor: ADMIN_COLOR }} />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg">{selectedUser.name}</h3>
                <div className="flex items-center gap-4 mt-1 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${roleColor(selectedUser.role)}`}>{selectedUser.role}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(selectedUser.status)}`}>{selectedUser.status}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted font-medium">{selectedUser.plan} Plan</span>
                </div>
              </div>
              <button 
                onClick={() => { setViewUserOpen(false); openEditModal(selectedUser); }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border border-border hover:bg-muted transition-colors"
                title="Edit this user">
                <Edit size={12} /> Edit
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { icon: Mail, label: 'Email', value: selectedUser.email },
                { icon: Phone, label: 'Phone', value: selectedUser.phone || 'N/A' },
                { icon: MapPin, label: 'Location', value: selectedUser.location || 'N/A' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="p-3 rounded-xl bg-muted/40 flex items-start gap-2">
                    <Icon size={14} className="text-muted-foreground mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                      <div className="text-sm font-medium truncate">{item.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-muted/40">
                <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Joined</div>
                <p className="text-sm font-medium flex items-center gap-1.5"><Calendar size={13} /> {selectedUser.joined}</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/40">
                <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Total Sessions</div>
                <p className="text-lg font-bold" style={{ color: ADMIN_COLOR, fontFamily: 'Playfair Display, serif' }}>{selectedUser.sessions}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-muted/40">
              <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Bio</div>
              <p className="text-sm leading-relaxed">{selectedUser.bio || 'No bio provided.'}</p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => { suspendUser(selectedUser.id); setViewUserOpen(false); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors flex items-center justify-center gap-2 ${selectedUser.status === 'suspended' ? 'border-green-300 text-green-700 hover:bg-green-50' : 'border-red-300 text-red-700 hover:bg-red-50'}`}>
                {selectedUser.status === 'suspended' ? <><CheckCircle size={14} /> Unsuspend</> : <><UserX size={14} /> Suspend</>}
              </button>
              <button onClick={() => { toast.success(`Impersonating ${selectedUser.name} (demo)`); setViewUserOpen(false); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2"
                style={{ background: ADMIN_COLOR }}>
                <Eye size={14} /> View as User
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ── Modal: View Verification Details ── */}
      <Modal open={viewVerifOpen} onClose={() => setViewVerifOpen(false)} title="Verification Review" subtitle={selectedVerif?.name} accentColor={ADMIN_COLOR}>
        {selectedVerif && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/40">
              <img src={selectedVerif.avatar} alt={selectedVerif.name} className="w-14 h-14 rounded-full border-2" style={{ borderColor: ADMIN_COLOR }} />
              <div>
                <h3 className="font-bold">{selectedVerif.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'hsl(220 70% 95%)', color: ADMIN_COLOR }}>{selectedVerif.type}</span>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Certification', value: `📄 ${selectedVerif.cert}` },
                { label: 'Specialization', value: selectedVerif.specialization },
                { label: 'Experience', value: selectedVerif.experience },
                { label: 'Submission Date', value: selectedVerif.submitted },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/40">
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-muted/40">
              <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Submitted Documents</div>
              <div className="space-y-2">
                {['Certification Certificate.pdf', 'Government ID.pdf', 'Profile Photo.jpg'].map((doc, i) => (
                  <button key={i} onClick={() => toast.success(`Opening ${doc}...`)}
                    className="w-full flex items-center gap-3 p-2.5 rounded-lg bg-background border border-border hover:bg-muted transition-colors text-left">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: 'hsl(220 70% 95%)', color: ADMIN_COLOR }}>
                      {doc.endsWith('.pdf') ? 'PDF' : 'IMG'}
                    </div>
                    <span className="text-sm">{doc}</span>
                    <Eye size={13} className="ml-auto text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => { 
                if (window.confirm(`Reject verification for ${selectedVerif.name}?`)) {
                  setPendingList(prev => prev.filter(x => x.name !== selectedVerif.name)); 
                  toast.error('Verification rejected'); 
                  setViewVerifOpen(false); 
                }
              }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-red-300 text-red-700 hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
                <UserX size={14} /> Reject
              </button>
              <button onClick={() => { approveVerification(selectedVerif.name); setViewVerifOpen(false); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2"
                style={{ background: 'hsl(133 18% 59%)' }}>
                <CheckCircle size={14} /> Approve & Verify
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminDashboard;
