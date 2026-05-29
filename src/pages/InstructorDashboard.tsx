import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Leaf, Home, BookOpen, Users, BarChart3, Settings, LogOut,
  Menu, X, Bell, Play, Plus, Star, Clock, DollarSign,
  CheckCircle, Video, Calendar, MessageSquare,
  Award, Upload, Eye, Edit2, Trash2, Filter, Mail, Phone,
  MapPin, TrendingUp, Target, Search,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { ThemeToggle } from '@/components/features/ThemeToggle';
import { useScrollTop } from '@/hooks/useScrollTop';
import { Modal, FormField, inputClass, selectClass, textareaClass } from '@/components/features/Modal';
import { toast } from 'sonner';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, BarChart, Bar, Legend,
} from 'recharts';

// ─── Data ────────────────────────────────────────────────────────────────────

const earningsData = [
  { month: 'Jan', earnings: 12400, students: 45 },
  { month: 'Feb', earnings: 15800, students: 58 },
  { month: 'Mar', earnings: 13200, students: 52 },
  { month: 'Apr', earnings: 18900, students: 71 },
  { month: 'May', earnings: 21500, students: 83 },
  { month: 'Jun', earnings: 24300, students: 96 },
];

const INITIAL_CLASSES = [
  { id: 1, title: 'Morning Vinyasa Flow', level: 'Intermediate', students: 248, rating: 4.9, price: 599, status: 'live', schedule: 'Mon, Wed, Fri · 7:00 AM', duration: '45 min', description: 'A dynamic flowing practice that builds strength, flexibility, and mindful awareness through breath-synchronized movement.' },
  { id: 2, title: 'Yin Yoga for Recovery', level: 'Beginner', students: 182, rating: 4.8, price: 499, status: 'live', schedule: 'Tue, Thu · 7:00 PM', duration: '60 min', description: 'Deep, passive stretches held for extended periods to target connective tissues and promote deep relaxation.' },
  { id: 3, title: 'Advanced Arm Balances', level: 'Advanced', students: 64, rating: 4.7, price: 799, status: 'draft', schedule: 'Sat · 8:00 AM', duration: '75 min', description: 'Explore challenging arm balance postures with step-by-step progressions for advanced practitioners.' },
  { id: 4, title: 'Yoga for Stress Relief', level: 'All Levels', students: 315, rating: 4.9, price: 399, status: 'live', schedule: 'Daily · 6:30 AM', duration: '30 min', description: 'Gentle restorative practice combining breathwork and calming postures to dissolve stress and tension.' },
];

const INITIAL_STUDENTS = [
  { id: 1, name: 'Meera Singh', email: 'meera@example.com', phone: '+91 98765 43210', avatar: 'https://ui-avatars.com/api/?name=Meera+Singh&background=84A98C&color=fff', joinedDays: 28, sessionsCompleted: 22, progress: 78, plan: 'Premium', enrolledIn: 'Morning Vinyasa Flow', goal: 'Improve flexibility and reduce anxiety', lastSession: '2 days ago', notes: 'Progressing well. Consistent attendance.' },
  { id: 2, name: 'Rahul Verma', email: 'rahul@example.com', phone: '+91 87654 32100', avatar: 'https://ui-avatars.com/api/?name=Rahul+Verma&background=F4A261&color=fff', joinedDays: 14, sessionsCompleted: 10, progress: 45, plan: 'Basic', enrolledIn: 'Yoga for Stress Relief', goal: 'Stress relief and better sleep', lastSession: '3 days ago', notes: 'Needs encouragement. Struggles with consistency.' },
  { id: 3, name: 'Anjali Patel', email: 'anjali@example.com', phone: '+91 76543 21098', avatar: 'https://ui-avatars.com/api/?name=Anjali+Patel&background=5B8FB9&color=fff', joinedDays: 45, sessionsCompleted: 38, progress: 92, plan: 'Elite', enrolledIn: 'Advanced Arm Balances', goal: 'Master advanced inversions', lastSession: 'Yesterday', notes: 'Outstanding student. Ready for teacher training.' },
  { id: 4, name: 'Kiran Shah', email: 'kiran@example.com', phone: '+91 65432 10987', avatar: 'https://ui-avatars.com/api/?name=Kiran+Shah&background=A98B84&color=fff', joinedDays: 7, sessionsCompleted: 5, progress: 20, plan: 'Free', enrolledIn: 'Yin Yoga for Recovery', goal: 'Post-surgery rehabilitation', lastSession: '5 days ago', notes: 'New student. Extra support needed initially.' },
  { id: 5, name: 'Deepak Kumar', email: 'deepak@example.com', phone: '+91 54321 09876', avatar: 'https://ui-avatars.com/api/?name=Deepak+Kumar&background=84A98C&color=fff', joinedDays: 60, sessionsCompleted: 55, progress: 100, plan: 'Premium', enrolledIn: 'Morning Vinyasa Flow', goal: 'Achieve certification level practice', lastSession: 'Today', notes: 'Completed all modules. Excellent progress.' },
];

const INITIAL_SESSIONS = [
  { id: 1, title: 'Morning Vinyasa Flow', time: 'Today, 7:00 AM', students: 24, platform: 'Live Studio', classId: 1 },
  { id: 2, title: 'Yoga for Stress Relief', time: 'Today, 6:30 PM', students: 31, platform: 'Recorded', classId: 4 },
  { id: 3, title: 'Yin Yoga for Recovery', time: 'Tomorrow, 7:00 PM', students: 18, platform: 'Live Studio', classId: 2 },
];

const REVIEWS = [
  { student: 'Meera S.', rating: 5, comment: 'Ananya is an exceptional instructor. Her cues are precise and her classes are deeply transformative.', date: '2 days ago' },
  { student: 'Deepak K.', rating: 5, comment: 'Best yoga classes I have ever taken. The progression is perfectly structured.', date: '1 week ago' },
  { student: 'Priya R.', rating: 4, comment: 'Very knowledgeable and patient. Would love more classes at beginner level.', date: '2 weeks ago' },
];

const NAV = [
  { icon: Home, label: 'Overview', id: 'overview' },
  { icon: Video, label: 'My Classes', id: 'classes' },
  { icon: Users, label: 'Students', id: 'students' },
  { icon: Calendar, label: 'Schedule', id: 'schedule' },
  { icon: DollarSign, label: 'Earnings', id: 'earnings' },
  { icon: Star, label: 'Reviews', id: 'reviews' },
];

const ACCENT = 'hsl(27 87% 67%)';

// ─── Component ───────────────────────────────────────────────────────────────

const InstructorDashboard = () => {
  useScrollTop();
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('overview');

  // Data state
  const [classes, setClasses] = useState(() => {
    const stored = localStorage.getItem('instructor_classes');
    if (stored) {
      try { return JSON.parse(stored); } catch { return INITIAL_CLASSES; }
    }
    return INITIAL_CLASSES;
  });

  const [students, setStudents] = useState(() => {
    const stored = localStorage.getItem('instructor_students');
    if (stored) {
      try { return JSON.parse(stored); } catch { return INITIAL_STUDENTS; }
    }
    return INITIAL_STUDENTS;
  });

  const [sessions, setSessions] = useState(() => {
    const stored = localStorage.getItem('instructor_sessions');
    if (stored) {
      try { return JSON.parse(stored); } catch { return INITIAL_SESSIONS; }
    }
    return INITIAL_SESSIONS;
  });

  const [reviews, setReviews] = useState(() => {
    const stored = localStorage.getItem('instructor_reviews');
    if (stored) {
      try { return JSON.parse(stored); } catch { }
    }
    return REVIEWS.map((r, idx) => ({ ...r, id: idx + 1, reply: '' }));
  });

  // Notifications State
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(() => {
    const stored = localStorage.getItem('instructor_notifications');
    if (stored) {
      try { return JSON.parse(stored); } catch { }
    }
    return [
      { id: 1, title: 'New Student Enrolled 🧘', desc: 'Meera Singh joined Morning Vinyasa Flow.', time: '2h ago', read: false },
      { id: 2, title: 'Payout Processed 💳', desc: 'Your monthly payout of ₹24,300 has been transferred.', time: '1d ago', read: true },
    ];
  });

  // Reply review states
  const [replyingReviewId, setReplyingReviewId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  // Messaging Modal State
  const [messageStudentOpen, setMessageStudentOpen] = useState(false);
  const [messageText, setMessageText] = useState('');

  // Dynamic Session Started states
  const [startedSessions, setStartedSessions] = useState<number[]>(() => {
    const stored = localStorage.getItem('instructor_started_sessions');
    if (stored) {
      try { return JSON.parse(stored); } catch { return []; }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('instructor_started_sessions', JSON.stringify(startedSessions));
  }, [startedSessions]);

  const handleStartSession = (id: number, title: string) => {
    setStartedSessions((prev) => {
      const isAlreadyStarted = prev.includes(id);
      if (isAlreadyStarted) {
        toast.info(`Session ended: ${title}`);
        return prev.filter(x => x !== id);
      } else {
        toast.success(`Session started! Live now: ${title} 🎥`);
        return [...prev, id];
      }
    });
  };

  // Student list filtering state
  const [studentPlanFilter, setStudentPlanFilter] = useState('All');
  const [studentClassFilter, setStudentClassFilter] = useState('All');
  const [studentSearchQuery, setStudentSearchQuery] = useState('');

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('instructor_classes', JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem('instructor_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('instructor_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('instructor_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('instructor_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Modal states
  const [newClassOpen, setNewClassOpen] = useState(false);
  const [newSessionOpen, setNewSessionOpen] = useState(false);
  const [viewClassOpen, setViewClassOpen] = useState(false);
  const [viewStudentOpen, setViewStudentOpen] = useState(false);
  const [editStudentOpen, setEditStudentOpen] = useState(false);
  
  const [selectedClass, setSelectedClass] = useState<typeof INITIAL_CLASSES[0] | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<typeof INITIAL_STUDENTS[0] | null>(null);
  
  const [editingClass, setEditingClass] = useState<typeof INITIAL_CLASSES[0] | null>(null);
  const [editingSession, setEditingSession] = useState<typeof INITIAL_SESSIONS[0] | null>(null);
  const [editingStudent, setEditingStudent] = useState<typeof INITIAL_STUDENTS[0] | null>(null);

  // Forms
  const [classForm, setClassForm] = useState({ title: '', level: 'Beginner', duration: '', price: '', schedule: '', description: '', status: 'draft' });
  const [sessionForm, setSessionForm] = useState({ classId: '', date: '', time: '', platform: 'Live Studio', maxStudents: '' });
  const [studentForm, setStudentForm] = useState({
    name: '',
    email: '',
    phone: '',
    plan: 'Premium',
    enrolledIn: 'Morning Vinyasa Flow',
    goal: '',
    progress: '0',
    notes: '',
  });

  if (!user) { navigate('/login', { replace: true }); return null; }
  const handleLogout = () => { logout(); toast.success('See you soon! Namaste 🙏'); navigate('/'); };

  // Class Actions
  const openEditClass = (cls: typeof INITIAL_CLASSES[0]) => {
    setEditingClass(cls);
    setClassForm({
      title: cls.title,
      level: cls.level,
      duration: cls.duration,
      price: String(cls.price),
      schedule: cls.schedule,
      description: cls.description,
      status: cls.status,
    });
    setNewClassOpen(true);
  };

  const closeClassModal = () => {
    setNewClassOpen(false);
    setEditingClass(null);
    setClassForm({ title: '', level: 'Beginner', duration: '', price: '', schedule: '', description: '', status: 'draft' });
  };

  const handleSaveClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!classForm.title || !classForm.duration || !classForm.price) { toast.error('Please fill all required fields'); return; }
    
    if (editingClass) {
      setClasses(prev => prev.map(c => c.id === editingClass.id ? {
        ...c,
        title: classForm.title,
        level: classForm.level,
        price: Number(classForm.price),
        status: classForm.status as 'live' | 'draft',
        schedule: classForm.schedule || 'TBD',
        duration: classForm.duration,
        description: classForm.description,
      } : c));
      toast.success(`Class "${classForm.title}" updated successfully!`);
    } else {
      const newClass = {
        id: classes.length > 0 ? Math.max(...classes.map(c => c.id)) + 1 : 1,
        title: classForm.title,
        level: classForm.level,
        students: 0,
        rating: 0,
        price: Number(classForm.price),
        status: classForm.status as 'live' | 'draft',
        schedule: classForm.schedule || 'TBD',
        duration: classForm.duration,
        description: classForm.description,
      };
      setClasses(prev => [...prev, newClass]);
      toast.success(`Class "${classForm.title}" created successfully!`);
    }
    closeClassModal();
  };

  // Session Actions
  const openEditSession = (sess: typeof INITIAL_SESSIONS[0]) => {
    setEditingSession(sess);
    let dateVal = '';
    let timeVal = '';
    if (sess.time.includes(', ')) {
      const parts = sess.time.split(', ');
      dateVal = parts[0];
      timeVal = parts[1];
    } else {
      dateVal = sess.time;
    }
    
    let formattedDate = dateVal;
    if (dateVal === 'Today') {
      formattedDate = new Date().toISOString().split('T')[0];
    } else if (dateVal === 'Tomorrow') {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      formattedDate = tomorrow.toISOString().split('T')[0];
    }
    
    let formattedTime = timeVal;
    if (timeVal) {
      const match = timeVal.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (match) {
        let hours = parseInt(match[1]);
        const minutes = match[2];
        const ampm = match[3].toUpperCase();
        if (ampm === 'PM' && hours < 12) hours += 12;
        if (ampm === 'AM' && hours === 12) hours = 0;
        formattedTime = `${String(hours).padStart(2, '0')}:${minutes}`;
      }
    }

    setSessionForm({
      classId: String(sess.classId),
      date: formattedDate,
      time: formattedTime,
      platform: sess.platform,
      maxStudents: '',
    });
    setNewSessionOpen(true);
  };

  const closeSessionModal = () => {
    setNewSessionOpen(false);
    setEditingSession(null);
    setSessionForm({ classId: '', date: '', time: '', platform: 'Live Studio', maxStudents: '' });
  };

  const handleSaveSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionForm.classId || !sessionForm.date || !sessionForm.time) { toast.error('Please fill all required fields'); return; }
    
    let dateStr = sessionForm.date;
    try {
      const d = new Date(sessionForm.date);
      if (!isNaN(d.getTime())) {
        const todayStr = new Date().toISOString().split('T')[0];
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split('T')[0];
        if (sessionForm.date === todayStr) {
          dateStr = 'Today';
        } else if (sessionForm.date === tomorrowStr) {
          dateStr = 'Tomorrow';
        } else {
          dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
      }
    } catch (e) {
      // fallback
    }

    let timeStr = sessionForm.time;
    try {
      const [h, m] = sessionForm.time.split(':');
      let hours = parseInt(h);
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      if (hours === 0) hours = 12;
      timeStr = `${hours}:${m} ${ampm}`;
    } catch (e) {
      // fallback
    }

    const cls = classes.find(c => c.id === Number(sessionForm.classId));
    
    if (editingSession) {
      setSessions(prev => prev.map(s => s.id === editingSession.id ? {
        ...s,
        title: cls?.title || s.title,
        time: `${dateStr}, ${timeStr}`,
        platform: sessionForm.platform,
        classId: Number(sessionForm.classId),
      } : s));
      toast.success('Session updated successfully!');
    } else {
      const newSession = {
        id: sessions.length > 0 ? Math.max(...sessions.map(s => s.id)) + 1 : 1,
        title: cls?.title || 'New Session',
        time: `${dateStr}, ${timeStr}`,
        students: 0,
        platform: sessionForm.platform,
        classId: Number(sessionForm.classId),
      };
      setSessions(prev => [...prev, newSession]);
      toast.success('Session scheduled successfully!');
    }
    closeSessionModal();
  };

  // Student Actions
  const openEditStudent = (s: typeof INITIAL_STUDENTS[0]) => {
    setEditingStudent(s);
    setStudentForm({
      name: s.name,
      email: s.email,
      phone: s.phone,
      plan: s.plan,
      enrolledIn: s.enrolledIn,
      goal: s.goal,
      progress: String(s.progress),
      notes: s.notes,
    });
    setEditStudentOpen(true);
  };

  const closeStudentModal = () => {
    setEditStudentOpen(false);
    setEditingStudent(null);
    setStudentForm({
      name: '',
      email: '',
      phone: '',
      plan: 'Premium',
      enrolledIn: 'Morning Vinyasa Flow',
      goal: '',
      progress: '0',
      notes: '',
    });
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentForm.name || !studentForm.email) { toast.error('Name and email are required'); return; }
    
    if (editingStudent) {
      setStudents(prev => prev.map(s => s.id === editingStudent.id ? {
        ...s,
        name: studentForm.name,
        email: studentForm.email,
        phone: studentForm.phone,
        plan: studentForm.plan,
        enrolledIn: studentForm.enrolledIn,
        goal: studentForm.goal,
        progress: Number(studentForm.progress),
        notes: studentForm.notes,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(studentForm.name)}&background=84A98C&color=fff`,
      } : s));
      toast.success(`Student "${studentForm.name}" updated successfully!`);
    }
    closeStudentModal();
  };

  const openViewClass = (cls: typeof INITIAL_CLASSES[0]) => { setSelectedClass(cls); setViewClassOpen(true); };
  const openViewStudent = (s: typeof INITIAL_STUDENTS[0]) => { setSelectedStudent(s); setViewStudentOpen(true); };

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
            Yogic<span style={{ color: ACCENT }}>Town</span>
          </span>
        </Link>
        <div className="px-3 py-3 border-b border-sidebar-border mx-3 mt-2 mb-1 rounded-xl" style={{ background: 'hsl(27 87% 93%)' }}>
          <div className="text-xs font-semibold" style={{ color: 'hsl(27 60% 45%)' }}>Instructor Portal</div>
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
              <h1 className="text-base font-semibold">Welcome, {user.name.split(' ')[0]}! ✨</h1>
              <p className="text-xs text-muted-foreground">Instructor Dashboard</p>
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
                  { label: 'Total Students', value: String(students.length * 162), change: '+48 this month', icon: Users, color: 'hsl(133 18% 59%)', bg: 'hsl(133 20% 92%)' },
                  { label: 'Active Classes', value: String(classes.filter(c => c.status === 'live').length), change: `${classes.filter(c => c.status === 'draft').length} draft`, icon: Video, color: ACCENT, bg: 'hsl(27 87% 93%)' },
                  { label: 'Monthly Earnings', value: '₹24,300', change: '+13% vs last', icon: DollarSign, color: 'hsl(160 40% 50%)', bg: 'hsl(160 40% 93%)' },
                  { label: 'Avg. Rating', value: '4.85', change: '312 reviews', icon: Star, color: 'hsl(45 80% 50%)', bg: 'hsl(45 80% 93%)' },
                ].map(({ label, value, change, icon: Icon, color, bg }, i) => (
                  <div key={i} className="card-wellness">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: bg }}>
                        <Icon size={18} style={{ color }} />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">{change}</span>
                    </div>
                    <div className="text-3xl font-bold mb-0.5" style={{ fontFamily: 'Playfair Display, serif', color }}>{value}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 card-wellness">
                  <h3 className="font-semibold mb-4">Earnings Overview (6 months)</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={earningsData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gEarnings" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(27,87%,67%)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(27,87%,67%)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
                      <Tooltip formatter={(v: number) => [`₹${v.toLocaleString()}`, 'Earnings']} contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))' }} />
                      <Area type="monotone" dataKey="earnings" stroke="hsl(27,87%,67%)" fill="url(#gEarnings)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="card-wellness">
                  <h3 className="font-semibold mb-4">Today's Sessions</h3>
                  <div className="space-y-3">
                    {sessions.slice(0, 3).map((s, i) => {
                      const isStarted = startedSessions.includes(s.id);
                      return (
                        <div key={i} className="p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                          <div className="text-sm font-medium mb-1">{s.title}</div>
                          <div className="text-xs text-muted-foreground mb-2">{s.time} · {s.students} joined</div>
                          <button
                            onClick={() => handleStartSession(s.id, s.title)}
                            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                            style={isStarted
                              ? { background: isDark ? 'hsl(133 20% 20%)' : 'hsl(133 20% 92%)', color: isDark ? 'hsl(133 25% 65%)' : 'hsl(133 20% 40%)' }
                              : { background: ACCENT, color: 'white' }}>
                            {isStarted ? 'Started ✓' : <><Play size={10} fill="currentColor" /> Go Live</>}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card-wellness">
                  <h3 className="font-semibold mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Create New Class', icon: Plus, action: () => { setNewClassOpen(true); } },
                      { label: 'View Students', icon: Users, action: () => setActiveNav('students') },
                      { label: 'Schedule Session', icon: Calendar, action: () => setNewSessionOpen(true) },
                      { label: 'View Analytics', icon: BarChart3, action: () => setActiveNav('earnings') },
                    ].map(({ label, icon: Icon, action }, i) => (
                      <button key={i} onClick={action} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted hover:bg-muted/80 transition-colors text-center">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'hsl(27 87% 93%)' }}>
                          <Icon size={18} style={{ color: 'hsl(27 87% 55%)' }} />
                        </div>
                        <span className="text-xs font-medium">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="card-wellness">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Recent Reviews</h3>
                    <button onClick={() => setActiveNav('reviews')} className="text-xs" style={{ color: ACCENT }}>See all</button>
                  </div>
                  <div className="space-y-3">
                    {reviews.slice(0, 2).map((r, i) => (
                      <div key={i} className="p-3 rounded-xl bg-muted/40">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">{r.student}</span>
                          <div className="flex">{Array.from({ length: r.rating }).map((_, j) => <Star key={j} size={10} fill="hsl(45 80% 50%)" color="hsl(45 80% 50%)" />)}</div>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{r.comment}</p>
                        {r.reply && (
                          <div className="mt-1.5 pl-2 border-l border-primary/40 text-[10px] text-muted-foreground italic">
                            Reply: {r.reply}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Classes ── */}
          {activeNav === 'classes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">My Classes</h2>
                  <p className="text-sm text-muted-foreground">Manage and publish your yoga classes</p>
                </div>
                <button onClick={() => setNewClassOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                  style={{ background: ACCENT }}>
                  <Plus size={15} /> New Class
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {classes.map((cls) => (
                  <div key={cls.id} className="card-wellness hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold mb-1">{cls.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{cls.level}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cls.status === 'live' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {cls.status === 'live' ? '● Live' : '● Draft'}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold" style={{ color: ACCENT, fontFamily: 'Playfair Display, serif' }}>₹{cls.price}</div>
                        <div className="text-xs text-muted-foreground">per month</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                      <div className="p-2 rounded-lg bg-muted/50">
                        <div className="text-sm font-bold">{cls.students}</div>
                        <div className="text-xs text-muted-foreground">Students</div>
                      </div>
                      <div className="p-2 rounded-lg bg-muted/50">
                        <div className="text-sm font-bold flex items-center justify-center gap-1">
                          {cls.rating > 0 ? cls.rating : '—'} {cls.rating > 0 && <Star size={10} fill="hsl(45 80% 50%)" color="hsl(45 80% 50%)" />}
                        </div>
                        <div className="text-xs text-muted-foreground">Rating</div>
                      </div>
                      <div className="p-2 rounded-lg bg-muted/50">
                        <div className="text-sm font-bold">{cls.duration}</div>
                        <div className="text-xs text-muted-foreground">Duration</div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">📅 {cls.schedule}</p>
                    <div className="flex gap-2">
                      <button onClick={() => openViewClass(cls)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border border-border hover:bg-muted transition-colors">
                        <Eye size={12} /> View
                      </button>
                      <button onClick={() => openEditClass(cls)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border border-border hover:bg-muted transition-colors">
                        <Edit2 size={12} /> Edit
                      </button>
                      <button onClick={() => {
                        setClasses(prev => prev.map(c => c.id === cls.id ? { ...c, status: c.status === 'live' ? 'draft' : 'live' } : c));
                        toast.success(cls.status === 'live' ? 'Class paused' : 'Class published!');
                      }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-white"
                        style={{ background: cls.status === 'live' ? 'hsl(0 60% 60%)' : 'hsl(133 18% 59%)' }}>
                        {cls.status === 'live' ? 'Pause' : 'Publish'}
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add class card */}
                <div className="card-wellness border-dashed border-2 flex flex-col items-center justify-center py-10 text-center hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => setNewClassOpen(true)}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: 'hsl(27 87% 93%)' }}>
                    <Plus size={20} style={{ color: ACCENT }} />
                  </div>
                  <p className="text-sm font-semibold">Create New Class</p>
                  <p className="text-xs text-muted-foreground mt-1">Add a yoga class to your portfolio</p>
                </div>
              </div>
            </div>
          )}

          {/* ── Students ── */}
          {activeNav === 'students' && (() => {
            const filteredStudents = students.filter(s => {
              const planMatch = studentPlanFilter === 'All' || s.plan === studentPlanFilter;
              const classMatch = studentClassFilter === 'All' || s.enrolledIn === studentClassFilter;
              const searchMatch = studentSearchQuery.trim() === '' || 
                s.name.toLowerCase().includes(studentSearchQuery.toLowerCase()) || 
                s.email.toLowerCase().includes(studentSearchQuery.toLowerCase());
              return planMatch && classMatch && searchMatch;
            });
            return (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold">My Students</h2>
                    <p className="text-sm text-muted-foreground">Track progress and engagement of your students</p>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Search Filter */}
                    <div className="relative">
                      <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search student..."
                        value={studentSearchQuery}
                        onChange={(e) => setStudentSearchQuery(e.target.value)}
                        className="bg-muted border border-border rounded-lg pl-8 pr-3 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary w-40 sm:w-48"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Plan:</span>
                      <select
                        value={studentPlanFilter}
                        onChange={(e) => setStudentPlanFilter(e.target.value)}
                        className="bg-muted border border-border rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="All">All Plans</option>
                        <option value="Premium">Premium</option>
                        <option value="Elite">Elite</option>
                        <option value="Basic">Basic</option>
                        <option value="Free">Free</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Class:</span>
                      <select
                        value={studentClassFilter}
                        onChange={(e) => setStudentClassFilter(e.target.value)}
                        className="bg-muted border border-border rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="All">All Classes</option>
                        {Array.from(new Set(students.map(s => s.enrolledIn))).map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <button 
                      onClick={() => {
                        setStudentPlanFilter('All');
                        setStudentClassFilter('All');
                        setStudentSearchQuery('');
                        toast.info('Filters reset to default');
                      }}
                      className="px-3 py-1 rounded-lg text-xs font-semibold border border-border hover:bg-muted"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                <div className="card-wellness overflow-x-auto">
                  {filteredStudents.length > 0 ? (
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left text-xs font-medium text-muted-foreground py-3 pr-4">Student</th>
                          <th className="text-left text-xs font-medium text-muted-foreground py-3 pr-4">Plan</th>
                          <th className="text-left text-xs font-medium text-muted-foreground py-3 pr-4">Sessions</th>
                          <th className="text-left text-xs font-medium text-muted-foreground py-3 pr-4">Progress</th>
                          <th className="text-left text-xs font-medium text-muted-foreground py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredStudents.map((s) => (
                          <tr key={s.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                            <td className="py-3 pr-4">
                              <div className="flex items-center gap-3">
                                <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-full" />
                                <div>
                                  <div className="text-sm font-medium">{s.name}</div>
                                  <div className="text-xs text-muted-foreground">Joined {s.joinedDays}d ago</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 pr-4">
                              <span className="text-xs px-2 py-1 rounded-full bg-muted font-medium">{s.plan}</span>
                            </td>
                            <td className="py-3 pr-4 text-sm">{s.sessionsCompleted}</td>
                            <td className="py-3 pr-4 w-32">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                                  <div className="h-full rounded-full" style={{ width: `${s.progress}%`, background: ACCENT }} />
                                </div>
                                <span className="text-xs text-muted-foreground w-8">{s.progress}%</span>
                              </div>
                            </td>
                            <td className="py-3">
                              <div className="flex items-center gap-2">
                                <button onClick={() => openViewStudent(s)}
                                  className="flex items-center gap-1 text-xs font-medium hover:underline"
                                  style={{ color: ACCENT }}>
                                  <Eye size={12} /> View
                                </button>
                                <button onClick={() => openEditStudent(s)}
                                  className="flex items-center gap-1 text-xs font-medium hover:underline text-muted-foreground">
                                  <Edit2 size={12} /> Edit
                                </button>
                                <button onClick={() => { setSelectedStudent(s); setMessageStudentOpen(true); }}
                                  className="flex-none flex items-center gap-1 text-xs font-medium hover:underline text-muted-foreground">
                                  <MessageSquare size={12} /> Msg
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center py-10">
                      <Users size={32} className="mx-auto mb-2 text-muted-foreground opacity-40" />
                      <p className="text-sm text-muted-foreground">No students match the selected plan or class filters.</p>
                      <button 
                        onClick={() => {
                          setStudentPlanFilter('All');
                          setStudentClassFilter('All');
                          setStudentSearchQuery('');
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

          {/* ── Schedule ── */}
          {activeNav === 'schedule' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Class Schedule</h2>
                  <p className="text-sm text-muted-foreground">Manage your live sessions and upcoming classes</p>
                </div>
                <button onClick={() => setNewSessionOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                  style={{ background: ACCENT }}>
                  <Plus size={15} /> Schedule Session
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {sessions.map((s, i) => (
                  <div key={i} className="card-wellness">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold mb-1">{s.title}</h3>
                        <p className="text-sm text-muted-foreground">{s.time}</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: 'hsl(27 87% 93%)', color: 'hsl(27 60% 45%)' }}>
                        {s.platform}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <Users size={14} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{s.students} students registered</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStartSession(s.id, s.title)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all"
                        style={startedSessions.includes(s.id)
                          ? { background: isDark ? 'hsl(133 20% 20%)' : 'hsl(133 20% 92%)', color: isDark ? 'hsl(133 25% 65%)' : 'hsl(133 20% 40%)' }
                          : { background: ACCENT, color: 'white' }}>
                        {startedSessions.includes(s.id) ? 'Started ✓' : <><Play size={12} fill="currentColor" /> Start Session</>}
                      </button>
                      <button onClick={() => openEditSession(s)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold border border-border hover:bg-muted transition-colors">
                        <Edit2 size={12} />
                      </button>
                      <button onClick={() => { setSessions(prev => prev.filter(x => x.id !== s.id)); toast.error('Session cancelled'); }}
                        className="px-4 py-2 rounded-xl text-xs font-semibold border border-border hover:bg-muted transition-colors text-destructive">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="card-wellness border-dashed border-2 flex flex-col items-center justify-center py-10 text-center hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => setNewSessionOpen(true)}>
                  <Plus size={24} className="text-muted-foreground mb-2" />
                  <p className="text-sm font-medium text-muted-foreground">Schedule New Session</p>
                </div>
              </div>
            </div>
          )}

          {/* ── Earnings ── */}
          {activeNav === 'earnings' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold">Earnings & Analytics</h2>
                <p className="text-sm text-muted-foreground">Track your revenue, payouts, and growth metrics</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Total Earnings', value: '₹1,05,400', sub: 'All time', color: 'hsl(133 18% 59%)' },
                  { label: 'This Month', value: '₹24,300', sub: '+13.4% vs last', color: ACCENT },
                  { label: 'Pending Payout', value: '₹8,200', sub: 'Transfers June 30', color: 'hsl(160 40% 50%)' },
                ].map((k, i) => (
                  <div key={i} className="card-wellness text-center py-6">
                    <div className="text-3xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: k.color }}>{k.value}</div>
                    <div className="text-sm font-medium mb-0.5">{k.label}</div>
                    <div className="text-xs text-muted-foreground">{k.sub}</div>
                  </div>
                ))}
              </div>
              <div className="card-wellness">
                <h3 className="font-semibold mb-4">Monthly Earnings vs Students</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={earningsData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis yAxisId="left" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))' }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar yAxisId="left" dataKey="earnings" name="Earnings (₹)" fill="hsl(27,87%,67%)" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="right" dataKey="students" name="New Students" fill="hsl(133,18%,59%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* ── Reviews ── */}
          {activeNav === 'reviews' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold">Reviews & Ratings</h2>
                <p className="text-sm text-muted-foreground">Student feedback and testimonials</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card-wellness text-center py-6">
                  <div className="text-5xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: 'hsl(45 80% 50%)' }}>4.85</div>
                  <div className="flex justify-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} fill="hsl(45 80% 50%)" color="hsl(45 80% 50%)" />)}
                  </div>
                  <p className="text-sm text-muted-foreground">Based on 312 reviews</p>
                </div>
                <div className="card-wellness col-span-2">
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-3">
                        <div className="flex items-center gap-1 w-12 shrink-0">
                          <Star size={12} fill="hsl(45 80% 50%)" color="hsl(45 80% 50%)" />
                          <span className="text-xs">{stars}</span>
                        </div>
                        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${[78, 14, 5, 2, 1][5 - stars]}%`, background: 'hsl(45 80% 50%)' }} />
                        </div>
                        <span className="text-xs text-muted-foreground w-8">{[78, 14, 5, 2, 1][5 - stars]}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {reviews.map((r: any, i: number) => (
                  <div key={r.id || i} className="card-wellness">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{r.student}</span>
                        <div className="flex">{Array.from({ length: r.rating }).map((_, j) => <Star key={j} size={11} fill="hsl(45 80% 50%)" color="hsl(45 80% 50%)" />)}</div>
                      </div>
                      <span className="text-xs text-muted-foreground">{r.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{r.comment}</p>
                    
                    {r.reply && (
                      <div className="mt-3 p-3 rounded-xl bg-muted/60 border border-border/30 pl-4 border-l-4" style={{ borderLeftColor: ACCENT }}>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-xs font-bold text-foreground">Your Reply</span>
                          <span className="text-[10px] text-muted-foreground font-medium bg-primary/10 text-primary px-1.5 py-0.5 rounded-full" style={{ background: 'hsl(27 87% 93%)', color: ACCENT }}>Instructor</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{r.reply}</p>
                      </div>
                    )}

                    <div className="mt-3 flex gap-2">
                      <button onClick={() => {
                        setReplyingReviewId(replyingReviewId === r.id ? null : r.id);
                        setReplyText(r.reply || '');
                      }} className="text-xs font-medium hover:underline" style={{ color: ACCENT }}>
                        {r.reply ? 'Edit Reply' : 'Reply'}
                      </button>
                      {r.reply && (
                        <button onClick={() => {
                          setReviews(prev => prev.map(item => item.id === r.id ? { ...item, reply: '' } : item));
                          toast.error('Reply deleted');
                        }} className="text-xs font-medium text-destructive hover:underline">
                          Delete
                        </button>
                      )}
                    </div>

                    {replyingReviewId === r.id && (
                      <div className="mt-3 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type your wellness reply..."
                          rows={2}
                          className="w-full p-2.5 text-xs bg-muted border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              if (!replyText.trim()) { toast.error('Reply cannot be empty'); return; }
                              setReviews(prev => prev.map(item => item.id === r.id ? { ...item, reply: replyText } : item));
                              setReplyingReviewId(null);
                              setReplyText('');
                              toast.success('Reply submitted successfully!');
                            }}
                            className="px-3 py-1.5 rounded-lg text-white font-semibold text-xs transition-opacity hover:opacity-90"
                            style={{ background: ACCENT }}
                          >
                            Post Reply
                          </button>
                          <button
                            onClick={() => {
                              setReplyingReviewId(null);
                              setReplyText('');
                            }}
                            className="px-3 py-1.5 rounded-lg border border-border text-xs font-semibold hover:bg-muted"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ── Modal: New Class ── */}
      <Modal open={newClassOpen} onClose={closeClassModal} title={editingClass ? "Edit Class" : "Create New Class"} subtitle={editingClass ? "Modify class details" : "Add a new yoga class to your teaching portfolio"} accentColor={ACCENT}>
        <form onSubmit={handleSaveClass} className="space-y-4">
          <FormField label="Class Title" required>
            <input value={classForm.title} onChange={e => setClassForm(p => ({ ...p, title: e.target.value }))}
              placeholder="e.g. Sunrise Hatha Yoga" className={inputClass} />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Level" required>
              <select value={classForm.level} onChange={e => setClassForm(p => ({ ...p, level: e.target.value }))} className={selectClass}>
                {['Beginner', 'Intermediate', 'Advanced', 'All Levels'].map(l => <option key={l}>{l}</option>)}
              </select>
            </FormField>
            <FormField label="Duration" required>
              <input value={classForm.duration} onChange={e => setClassForm(p => ({ ...p, duration: e.target.value }))}
                placeholder="e.g. 45 min" className={inputClass} />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Monthly Price (₹)" required>
              <input type="number" value={classForm.price} onChange={e => setClassForm(p => ({ ...p, price: e.target.value }))}
                placeholder="e.g. 599" className={inputClass} />
            </FormField>
            <FormField label="Status">
              <select value={classForm.status} onChange={e => setClassForm(p => ({ ...p, status: e.target.value }))} className={selectClass}>
                <option value="draft">Draft</option>
                <option value="live">Publish Now</option>
              </select>
            </FormField>
          </div>
          <FormField label="Schedule" hint="e.g. Mon, Wed, Fri · 7:00 AM">
            <input value={classForm.schedule} onChange={e => setClassForm(p => ({ ...p, schedule: e.target.value }))}
              placeholder="Mon, Wed, Fri · 7:00 AM" className={inputClass} />
          </FormField>
          <FormField label="Description">
            <textarea value={classForm.description} onChange={e => setClassForm(p => ({ ...p, description: e.target.value }))}
              placeholder="Describe what students will learn and experience..." rows={3} className={textareaClass} />
          </FormField>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={closeClassModal}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-border hover:bg-muted transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: ACCENT }}>
              {editingClass ? "Save Changes" : "Create Class"}
            </button>
          </div>
        </form>
      </Modal>

      {/* ── Modal: Schedule Session ── */}
      <Modal open={newSessionOpen} onClose={closeSessionModal} title={editingSession ? "Edit Session" : "Schedule New Session"} subtitle={editingSession ? "Modify session details" : "Add a live or recorded session to your calendar"} accentColor={ACCENT}>
        <form onSubmit={handleSaveSession} className="space-y-4">
          <FormField label="Select Class" required>
            <select value={sessionForm.classId} onChange={e => setSessionForm(p => ({ ...p, classId: e.target.value }))} className={selectClass}>
              <option value="">— Choose a class —</option>
              {classes.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Date" required>
              <input type="date" value={sessionForm.date} onChange={e => setSessionForm(p => ({ ...p, date: e.target.value }))} className={inputClass} />
            </FormField>
            <FormField label="Time" required>
              <input type="time" value={sessionForm.time} onChange={e => setSessionForm(p => ({ ...p, time: e.target.value }))} className={inputClass} />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Platform">
              <select value={sessionForm.platform} onChange={e => setSessionForm(p => ({ ...p, platform: e.target.value }))} className={selectClass}>
                <option>Live Studio</option>
                <option>Recorded</option>
                <option>Zoom</option>
                <option>Google Meet</option>
              </select>
            </FormField>
            <FormField label="Max Students" hint="Leave blank for unlimited">
              <input type="number" value={sessionForm.maxStudents} onChange={e => setSessionForm(p => ({ ...p, maxStudents: e.target.value }))}
                placeholder="e.g. 30" className={inputClass} />
            </FormField>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={closeSessionModal}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-border hover:bg-muted transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: ACCENT }}>
              {editingSession ? "Save Changes" : "Schedule Session"}
            </button>
          </div>
        </form>
      </Modal>

      {/* ── Modal: View Class Details ── */}
      <Modal open={viewClassOpen} onClose={() => setViewClassOpen(false)} title="Class Details" subtitle={selectedClass?.title} accentColor={ACCENT} size="lg">
        {selectedClass && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Students', value: String(selectedClass.students), color: 'hsl(133 18% 59%)' },
                { label: 'Rating', value: selectedClass.rating > 0 ? `${selectedClass.rating}★` : 'No ratings', color: 'hsl(45 80% 50%)' },
                { label: 'Duration', value: selectedClass.duration, color: ACCENT },
                { label: 'Price', value: `₹${selectedClass.price}/mo`, color: 'hsl(160 40% 50%)' },
              ].map((s, i) => (
                <div key={i} className="p-3 rounded-xl bg-muted/50 text-center">
                  <div className="text-lg font-bold" style={{ color: s.color, fontFamily: 'Playfair Display, serif' }}>{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-muted/40">
                <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Description</div>
                <p className="text-sm leading-relaxed">{selectedClass.description || 'No description provided.'}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-muted/40">
                  <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Schedule</div>
                  <p className="text-sm font-medium">📅 {selectedClass.schedule}</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/40">
                  <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Level</div>
                  <p className="text-sm font-medium">{selectedClass.level}</p>
                </div>
              </div>
              <div className="p-4 rounded-xl" style={{ background: selectedClass.status === 'live' ? 'hsl(133 20% 93%)' : 'hsl(45 80% 93%)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: selectedClass.status === 'live' ? 'hsl(133 18% 50%)' : 'hsl(45 70% 55%)' }} />
                  <span className="text-sm font-semibold" style={{ color: selectedClass.status === 'live' ? 'hsl(133 18% 35%)' : 'hsl(45 70% 35%)' }}>
                    Status: {selectedClass.status === 'live' ? 'Live & Accepting Students' : 'Draft — Not Published'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => { openEditClass(selectedClass); setViewClassOpen(false); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-border hover:bg-muted transition-colors flex items-center justify-center gap-2">
                <Edit2 size={14} /> Edit Class
              </button>
              <button onClick={() => { setNewSessionOpen(true); setViewClassOpen(false); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2"
                style={{ background: ACCENT }}>
                <Calendar size={14} /> Schedule Session
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ── Modal: View Student Details ── */}
      <Modal open={viewStudentOpen} onClose={() => setViewStudentOpen(false)} title="Student Profile" subtitle={selectedStudent?.name} accentColor={ACCENT} size="lg">
        {selectedStudent && (
          <div className="space-y-5">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/40">
              <img src={selectedStudent.avatar} alt={selectedStudent.name} className="w-16 h-16 rounded-full border-2" style={{ borderColor: ACCENT }} />
              <div>
                <h3 className="font-bold text-lg">{selectedStudent.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                  <Mail size={13} /> {selectedStudent.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                  <Phone size={13} /> {selectedStudent.phone}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Sessions', value: String(selectedStudent.sessionsCompleted), color: ACCENT },
                { label: 'Progress', value: `${selectedStudent.progress}%`, color: 'hsl(133 18% 59%)' },
                { label: 'Joined', value: `${selectedStudent.joinedDays}d ago`, color: 'hsl(220 70% 60%)' },
              ].map((s, i) => (
                <div key={i} className="p-3 rounded-xl bg-muted/50 text-center">
                  <div className="text-xl font-bold" style={{ color: s.color, fontFamily: 'Playfair Display, serif' }}>{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-muted/40">
                <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Enrolled In</div>
                <p className="text-sm font-medium">{selectedStudent.enrolledIn}</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/40">
                <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Wellness Goal</div>
                <p className="text-sm">{selectedStudent.goal}</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/40">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Progress</div>
                  <span className="text-xs font-bold" style={{ color: ACCENT }}>{selectedStudent.progress}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${selectedStudent.progress}%`, background: ACCENT }} />
                </div>
              </div>
              <div className="p-4 rounded-xl bg-muted/40">
                <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Instructor Notes</div>
                <p className="text-sm text-muted-foreground">{selectedStudent.notes}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock size={13} /> Last session: {selectedStudent.lastSession}
                <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-muted">{selectedStudent.plan} Plan</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => { openEditStudent(selectedStudent); setViewStudentOpen(false); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-border hover:bg-muted transition-colors flex items-center justify-center gap-2">
                <Edit2 size={14} /> Edit Profile
              </button>
              <button onClick={() => { setMessageStudentOpen(true); setViewStudentOpen(false); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-border hover:bg-muted transition-colors flex items-center justify-center gap-2">
                <MessageSquare size={14} /> Send Message
              </button>
              <button onClick={() => { toast.success('Progress report generated!'); setViewStudentOpen(false); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2"
                style={{ background: ACCENT }}>
                <Target size={14} /> View Full Report
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ── Modal: Edit Student ── */}
      <Modal open={editStudentOpen} onClose={closeStudentModal} title="Edit Student Profile" subtitle={editingStudent?.name} accentColor={ACCENT} size="lg">
        <form onSubmit={handleSaveStudent} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Full Name" required>
              <input value={studentForm.name} onChange={e => setStudentForm(p => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Meera Singh" className={inputClass} />
            </FormField>
            <FormField label="Email Address" required>
              <input type="email" value={studentForm.email} onChange={e => setStudentForm(p => ({ ...p, email: e.target.value }))}
                placeholder="student@example.com" className={inputClass} />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Phone Number">
              <input value={studentForm.phone} onChange={e => setStudentForm(p => ({ ...p, phone: e.target.value }))}
                placeholder="+91 98765 43210" className={inputClass} />
            </FormField>
            <FormField label="Subscription Plan">
              <select value={studentForm.plan} onChange={e => setStudentForm(p => ({ ...p, plan: e.target.value }))} className={selectClass}>
                {['Free', 'Basic', 'Premium', 'Elite'].map(p => <option key={p}>{p}</option>)}
              </select>
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Enrolled Class">
              <select value={studentForm.enrolledIn} onChange={e => setStudentForm(p => ({ ...p, enrolledIn: e.target.value }))} className={selectClass}>
                {classes.map(c => <option key={c.id} value={c.title}>{c.title}</option>)}
              </select>
            </FormField>
            <FormField label="Progress (%)">
              <input type="number" min="0" max="100" value={studentForm.progress} onChange={e => setStudentForm(p => ({ ...p, progress: e.target.value }))}
                placeholder="0" className={inputClass} />
            </FormField>
          </div>
          <FormField label="Wellness Goal">
            <input value={studentForm.goal} onChange={e => setStudentForm(p => ({ ...p, goal: e.target.value }))}
              placeholder="e.g. Improve flexibility and reduce anxiety" className={inputClass} />
          </FormField>
          <FormField label="Notes">
            <textarea value={studentForm.notes} onChange={e => setStudentForm(p => ({ ...p, notes: e.target.value }))}
              placeholder="Notes on progress, consistent attendance, challenges, etc." rows={3} className={textareaClass} />
          </FormField>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={closeStudentModal}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-border hover:bg-muted transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: ACCENT }}>
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* ── Modal: Message Student ── */}
      <Modal open={messageStudentOpen} onClose={() => { setMessageStudentOpen(false); setMessageText(''); }} title="Message Student" subtitle={selectedStudent ? `Send a custom message to ${selectedStudent.name}` : ''} accentColor={ACCENT}>
        <div className="space-y-4">
          <FormField label="Message Content" required>
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type your personal message or session reminder here..."
              rows={4}
              className={textareaClass}
            />
          </FormField>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => { setMessageStudentOpen(false); setMessageText(''); }}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-border hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (!messageText.trim()) { toast.error('Message cannot be empty'); return; }
                toast.success(`Message successfully sent to ${selectedStudent?.name || 'student'}! 📩`);
                setMessageStudentOpen(false);
                setMessageText('');
              }}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: ACCENT }}
            >
              Send Message
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InstructorDashboard;
