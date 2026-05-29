import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Leaf, Home, BookOpen, Heart, Users, BarChart3, Settings, LogOut,
  Menu, X, Play, Calendar, Flame, Target, Clock, Star, Bell,
  ChevronRight, Zap, Lock, CheckCircle, Wind, Moon, Volume2,
  MessageSquare, Trophy, TrendingUp, Activity, Droplets, Apple,
  ChevronDown, ChevronUp, Plus, Filter, RefreshCw, Award,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { ThemeToggle } from '@/components/features/ThemeToggle';
import { useScrollTop } from '@/hooks/useScrollTop';
import { toast } from 'sonner';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  BarChart, Bar, Legend,
} from 'recharts';

// ─── Data ────────────────────────────────────────────────────────────────────

const weeklyData = [
  { day: 'Mon', yoga: 45, meditation: 20 },
  { day: 'Tue', yoga: 60, meditation: 15 },
  { day: 'Wed', yoga: 30, meditation: 25 },
  { day: 'Thu', yoga: 75, meditation: 30 },
  { day: 'Fri', yoga: 50, meditation: 20 },
  { day: 'Sat', yoga: 90, meditation: 45 },
  { day: 'Sun', yoga: 40, meditation: 35 },
];

const monthlyData = [
  { week: 'W1', yoga: 210, meditation: 90 },
  { week: 'W2', yoga: 280, meditation: 120 },
  { week: 'W3', yoga: 245, meditation: 100 },
  { week: 'W4', yoga: 390, meditation: 170 },
];

const radarData = [
  { subject: 'Flexibility', value: 72 },
  { subject: 'Strength', value: 58 },
  { subject: 'Balance', value: 85 },
  { subject: 'Mindfulness', value: 90 },
  { subject: 'Breathing', value: 68 },
  { subject: 'Endurance', value: 55 },
];

const upcomingClasses = [
  { id: 1, title: 'Morning Vinyasa Flow', instructor: 'Ananya Krishnan', time: 'Today, 7:00 AM', duration: '45 min', level: 'Intermediate', isLive: true },
  { id: 2, title: 'Yin Yoga for Recovery', instructor: 'Serene Kapoor', time: 'Today, 7:00 PM', duration: '60 min', level: 'Beginner', isLive: false },
  { id: 3, title: 'Kundalini Awakening', instructor: 'Rohan Das', time: 'Tomorrow, 6:30 AM', duration: '50 min', level: 'Advanced', isLive: false },
];

const recentActivities = [
  { title: 'Hatha Yoga Session', time: '2 hours ago', duration: '45 min', type: 'yoga' },
  { title: 'Morning Meditation', time: 'Yesterday', duration: '15 min', type: 'meditation' },
  { title: 'Pranayama Practice', time: '2 days ago', duration: '20 min', type: 'breathing' },
];

const PROGRAMS = [
  { id: 1, title: '30-Day Beginner Yoga', instructor: 'Ananya Krishnan', progress: 73, lessons: 30, completed: 22, level: 'Beginner', tag: 'In Progress', color: 'hsl(133 18% 59%)', category: 'yoga' },
  { id: 2, title: 'Mindful Meditation Journey', instructor: 'Serene Kapoor', progress: 45, lessons: 20, completed: 9, level: 'All Levels', tag: 'In Progress', color: 'hsl(220 70% 60%)', category: 'meditation' },
  { id: 3, title: 'Advanced Vinyasa Flow', instructor: 'Rohan Das', progress: 0, lessons: 25, completed: 0, level: 'Advanced', tag: 'Not Started', color: 'hsl(27 87% 67%)', category: 'yoga' },
  { id: 4, title: 'Ayurvedic Wellness Basics', instructor: 'Dr. Priya Nair', progress: 100, lessons: 12, completed: 12, level: 'Beginner', tag: 'Completed', color: 'hsl(160 40% 50%)', category: 'wellness' },
  { id: 5, title: 'Pranayama & Breathwork', instructor: 'Yogi Arun', progress: 20, lessons: 15, completed: 3, level: 'Intermediate', tag: 'In Progress', color: 'hsl(280 50% 60%)', category: 'breathing' },
  { id: 6, title: 'Sleep Yoga & Yoga Nidra', instructor: 'Nisha Mehta', progress: 0, lessons: 10, completed: 0, level: 'All Levels', tag: 'Not Started', color: 'hsl(200 60% 55%)', category: 'sleep' },
];

const MEDITATIONS = [
  { id: 1, title: 'Morning Calm', duration: '10 min', type: 'Guided', category: 'Morning', icon: '🌅', plays: 1240, free: true },
  { id: 2, title: 'Deep Sleep Journey', duration: '20 min', type: 'Sleep', category: 'Sleep', icon: '🌙', plays: 3210, free: true },
  { id: 3, title: 'Stress Relief Breathing', duration: '8 min', type: 'Breathing', category: 'Stress', icon: '💨', plays: 890, free: true },
  { id: 4, title: 'Chakra Balancing', duration: '25 min', type: 'Guided', category: 'Spiritual', icon: '🔮', plays: 650, free: false },
  { id: 5, title: 'Body Scan Relaxation', duration: '15 min', type: 'Mindfulness', category: 'Relaxation', icon: '🧘', plays: 2100, free: true },
  { id: 6, title: 'Sound Healing – Tibetan Bowls', duration: '30 min', type: 'Sound', category: 'Healing', icon: '🎶', plays: 780, free: false },
  { id: 7, title: 'Anxiety Relief', duration: '12 min', type: 'Guided', category: 'Stress', icon: '🌿', plays: 1560, free: true },
  { id: 8, title: 'Kundalini Awakening', duration: '40 min', type: 'Advanced', category: 'Spiritual', icon: '✨', plays: 430, free: false },
];

const SCHEDULE_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const SCHEDULE_EVENTS: Record<string, { title: string; time: string; duration: string; color: string; instructor: string }[]> = {
  Mon: [{ title: 'Morning Flow', time: '7:00 AM', duration: '45 min', color: 'hsl(133 18% 59%)', instructor: 'Ananya' }],
  Tue: [{ title: 'Breath & Balance', time: '6:30 AM', duration: '30 min', color: 'hsl(220 70% 60%)', instructor: 'Serene' }],
  Wed: [],
  Thu: [
    { title: 'Power Vinyasa', time: '7:00 AM', duration: '60 min', color: 'hsl(27 87% 67%)', instructor: 'Rohan' },
    { title: 'Evening Yin', time: '7:30 PM', duration: '45 min', color: 'hsl(200 60% 55%)', instructor: 'Nisha' },
  ],
  Fri: [{ title: 'Meditation Circle', time: '8:00 AM', duration: '20 min', color: 'hsl(280 50% 60%)', instructor: 'Serene' }],
  Sat: [
    { title: 'Weekend Retreat Practice', time: '9:00 AM', duration: '90 min', color: 'hsl(133 18% 59%)', instructor: 'Ananya' },
  ],
  Sun: [{ title: 'Restorative Yoga', time: '10:00 AM', duration: '60 min', color: 'hsl(160 40% 50%)', instructor: 'Yogi Arun' }],
};

const COMMUNITY_POSTS = [
  { id: 1, user: 'Meera S.', avatar: 'https://ui-avatars.com/api/?name=Meera+S&background=84A98C&color=fff', time: '2h ago', content: 'Just completed my 30-day yoga challenge! The transformation has been incredible. My flexibility improved by so much 🙏', likes: 48, comments: 2, tag: 'Achievement' },
  { id: 2, user: 'Amit K.', avatar: 'https://ui-avatars.com/api/?name=Amit+K&background=F4A261&color=fff', time: '5h ago', content: 'Looking for a meditation buddy! Anyone interested in joining a virtual sunrise meditation at 6 AM IST daily?', likes: 23, comments: 1, tag: 'Community' },
  { id: 3, user: 'Priya R.', avatar: 'https://ui-avatars.com/api/?name=Priya+R&background=5B8FB9&color=fff', time: '1d ago', content: 'The Rishikesh retreat was life-changing. Sharing my notes and insights from the week-long Panchakarma + yoga retreat.', likes: 91, comments: 0, tag: 'Retreat' },
  { id: 4, user: 'Ananya K.', avatar: 'https://ui-avatars.com/api/?name=Ananya+K&background=A98B84&color=fff', time: '2d ago', content: 'Sharing my favorite morning pranayama routine. Start with 5 mins Anulom Vilom, then 3 mins Kapalabhati. Game changer for energy!', likes: 64, comments: 0, tag: 'Tips' },
];

const GROUPS = [
  { name: 'Beginner Yogis', members: 4820, icon: '🌱', joined: true },
  { name: 'Morning Warriors', members: 2340, icon: '☀️', joined: true },
  { name: 'Meditation Masters', members: 1980, icon: '🧘', joined: false },
  { name: 'Vinyasa Flow Tribe', members: 3120, icon: '🌊', joined: false },
  { name: 'Ayurveda & Wellness', members: 1560, icon: '🌿', joined: false },
];

const NAV_ITEMS = [
  { icon: Home, label: 'Dashboard', id: 'dashboard' },
  { icon: BookOpen, label: 'My Programs', id: 'programs' },
  { icon: Heart, label: 'Meditation', id: 'meditation' },
  { icon: Calendar, label: 'Schedule', id: 'schedule' },
  { icon: Users, label: 'Community', id: 'community' },
  { icon: BarChart3, label: 'Analytics', id: 'analytics' },
];

// ─── Sub-panels ───────────────────────────────────────────────────────────────

function ProgramsPanel() {
  const [filter, setFilter] = useState('all');
  const filters = ['all', 'yoga', 'meditation', 'breathing', 'wellness', 'sleep'];
  const filtered = filter === 'all' ? PROGRAMS : PROGRAMS.filter((p) => p.category === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">My Programs</h2>
          <p className="text-sm text-muted-foreground">Track your enrolled courses and learning progress</p>
        </div>
        <button onClick={() => toast.success('Explore new programs coming soon!')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: 'hsl(133 18% 59%)' }}>
          <Plus size={15} /> Browse More
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all border ${filter === f ? 'text-white border-transparent' : 'border-border hover:border-primary/40'}`}
            style={filter === f ? { background: 'hsl(133 18% 59%)' } : {}}>
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((program) => (
          <div key={program.id} className="card-wellness group hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0 pr-2">
                <h3 className="font-semibold text-sm leading-snug mb-1">{program.title}</h3>
                <p className="text-xs text-muted-foreground">{program.instructor}</p>
              </div>
              <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${
                program.tag === 'Completed' ? 'bg-green-100 text-green-700' :
                program.tag === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                'bg-muted text-muted-foreground'
              }`}>
                {program.tag}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{program.level}</span>
              <span className="text-xs text-muted-foreground">{program.lessons} lessons</span>
            </div>

            {/* Progress bar */}
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">{program.completed}/{program.lessons} completed</span>
                <span className="font-semibold" style={{ color: program.color }}>{program.progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${program.progress}%`, background: program.color }} />
              </div>
            </div>

            <button
              onClick={() => toast.success(`Resuming: ${program.title}`)}
              className="w-full py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2"
              style={program.tag === 'Completed'
                ? { background: 'hsl(133 20% 92%)', color: 'hsl(133 20% 40%)' }
                : { background: program.color, color: 'white' }}>
              {program.tag === 'Completed' ? <><CheckCircle size={13} /> Review</> :
               program.tag === 'Not Started' ? <><Play size={13} fill="currentColor" /> Start Program</> :
               <><Play size={13} fill="currentColor" /> Continue</>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function MeditationPanel() {
  const [playing, setPlaying] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Morning', 'Sleep', 'Stress', 'Spiritual', 'Relaxation', 'Healing'];
  const filtered = activeCategory === 'All' ? MEDITATIONS : MEDITATIONS.filter((m) => m.category === activeCategory);

  const handlePlay = (id: number, title: string, isFree: boolean) => {
    if (!isFree) { toast.error('Upgrade to Yogi plan to unlock this session'); return; }
    if (playing === id) { setPlaying(null); toast.info('Session paused'); }
    else { setPlaying(id); toast.success(`Now playing: ${title} 🎵`); }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Meditation Center</h2>
        <p className="text-sm text-muted-foreground">Guided sessions for peace, sleep, and mindfulness</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Sessions This Week', value: '7', icon: Heart, color: 'hsl(220 70% 60%)', bg: 'hsl(220 70% 95%)' },
          { label: 'Total Minutes', value: '420', icon: Clock, color: 'hsl(133 18% 59%)', bg: 'hsl(133 20% 92%)' },
          { label: 'Mindful Streak', value: '14d', icon: Flame, color: 'hsl(27 87% 67%)', bg: 'hsl(27 87% 93%)' },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="card-wellness text-center p-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ background: s.bg }}>
                <Icon size={16} style={{ color: s.color }} />
              </div>
              <div className="text-2xl font-bold mb-0.5" style={{ fontFamily: 'Playfair Display, serif', color: s.color }}>{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Quick breathing exercise */}
      <div className="card-wellness" style={{ background: 'linear-gradient(135deg, hsl(220 70% 60%), hsl(220 60% 48%))', color: 'white', borderColor: 'transparent' }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Wind size={16} />
              <span className="font-semibold text-sm">4-7-8 Breathing Exercise</span>
            </div>
            <p className="text-xs text-white/75">Inhale 4s · Hold 7s · Exhale 8s — Reduces anxiety instantly</p>
          </div>
          <button onClick={() => toast.success('Breathing exercise started! Follow the rhythm.')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold shrink-0 hover:bg-white/20 transition-all"
            style={{ border: '1px solid rgba(255,255,255,0.4)' }}>
            <Play size={13} fill="currentColor" /> Start
          </button>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button key={c} onClick={() => setActiveCategory(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${activeCategory === c ? 'text-white border-transparent' : 'border-border hover:border-primary/40'}`}
            style={activeCategory === c ? { background: 'hsl(220 70% 60%)' } : {}}>
            {c}
          </button>
        ))}
      </div>

      {/* Session cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {filtered.map((session) => (
          <div key={session.id} className={`card-wellness p-4 group transition-all duration-300 ${playing === session.id ? 'ring-2 ring-[hsl(220_70%_60%)]' : ''}`}>
            <div className="text-3xl mb-3">{session.icon}</div>
            <div className="flex items-start justify-between gap-1 mb-1">
              <h4 className="font-semibold text-sm leading-snug flex-1">{session.title}</h4>
              {!session.free && <Lock size={12} className="shrink-0 mt-0.5 text-muted-foreground" />}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <Clock size={11} /> {session.duration}
              <span>·</span>
              <span>{session.type}</span>
            </div>
            <div className="text-xs text-muted-foreground mb-3">{session.plays.toLocaleString()} plays</div>
            <button
              onClick={() => handlePlay(session.id, session.title, session.free)}
              className={`w-full py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                !session.free ? 'opacity-60 cursor-not-allowed' : ''
              }`}
              style={playing === session.id
                ? { background: 'hsl(220 70% 95%)', color: 'hsl(220 70% 60%)' }
                : { background: 'hsl(220 70% 60%)', color: 'white' }}>
              {!session.free ? <><Lock size={11} /> Unlock</> :
               playing === session.id ? 'Pause ⏸' : <><Play size={11} fill="currentColor" /> Play</>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SchedulePanel() {
  const [selectedDay, setSelectedDay] = useState('Thu');
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [newClassTitle, setNewClassTitle] = useState('');
  const [newClassTime, setNewClassTime] = useState('7:00 AM');
  const [newClassDuration, setNewClassDuration] = useState('30 min');
  const [newClassInstructor, setNewClassInstructor] = useState('');
  
  const today = new Date();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayName = dayNames[today.getDay()];

  const handleAddClass = () => {
    if (!newClassTitle.trim() || !newClassInstructor.trim()) {
      toast.error('Please fill in all class details');
      return;
    }

    const newClass = {
      title: newClassTitle,
      time: newClassTime,
      duration: newClassDuration,
      instructor: newClassInstructor,
      color: 'hsl(133 18% 59%)'
    };

    // Add to schedule
    SCHEDULE_EVENTS[selectedDay] = [...(SCHEDULE_EVENTS[selectedDay] || []), newClass];
    
    setShowAddClassModal(false);
    setNewClassTitle('');
    setNewClassTime('7:00 AM');
    setNewClassDuration('30 min');
    setNewClassInstructor('');
    
    toast.success(`Class "${newClassTitle}" added to ${selectedDay}'s schedule!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">My Schedule</h2>
          <p className="text-sm text-muted-foreground">Your weekly class planner and upcoming sessions</p>
        </div>
        <button onClick={() => setShowAddClassModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: 'hsl(133 18% 59%)' }}>
          <Plus size={15} /> Add Class
        </button>
      </div>

      {/* Add Class Modal */}
      {showAddClassModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4">Add New Class</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Class Title</label>
                <input
                  type="text"
                  value={newClassTitle}
                  onChange={(e) => setNewClassTitle(e.target.value)}
                  className="w-full p-2 border border-border rounded-lg bg-background"
                  placeholder="e.g., Morning Vinyasa Flow"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Instructor</label>
                <input
                  type="text"
                  value={newClassInstructor}
                  onChange={(e) => setNewClassInstructor(e.target.value)}
                  className="w-full p-2 border border-border rounded-lg bg-background"
                  placeholder="e.g., Ananya Krishnan"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Time</label>
                  <select
                    value={newClassTime}
                    onChange={(e) => setNewClassTime(e.target.value)}
                    className="w-full p-2 border border-border rounded-lg bg-background"
                  >
                    <option value="6:00 AM">6:00 AM</option>
                    <option value="7:00 AM">7:00 AM</option>
                    <option value="8:00 AM">8:00 AM</option>
                    <option value="5:00 PM">5:00 PM</option>
                    <option value="6:00 PM">6:00 PM</option>
                    <option value="7:00 PM">7:00 PM</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Duration</label>
                  <select
                    value={newClassDuration}
                    onChange={(e) => setNewClassDuration(e.target.value)}
                    className="w-full p-2 border border-border rounded-lg bg-background"
                  >
                    <option value="30 min">30 min</option>
                    <option value="45 min">45 min</option>
                    <option value="60 min">60 min</option>
                    <option value="90 min">90 min</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddClass}
                className="flex-1 py-2 px-4 rounded-lg text-white font-semibold"
                style={{ background: 'hsl(133 18% 59%)' }}
              >
                Add Class
              </button>
              <button
                onClick={() => setShowAddClassModal(false)}
                className="flex-1 py-2 px-4 rounded-lg border border-border font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Week calendar */}
      <div className="card-wellness">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm">Week View — May 2026</h3>
          <div className="flex items-center gap-2">
            <button onClick={() => toast.info('Previous week')} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
              <ChevronDown size={14} />
            </button>
            <button onClick={() => toast.info('Next week')} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
              <ChevronUp size={14} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-4">
          {SCHEDULE_DAYS.map((day, i) => {
            const isToday = day === todayName;
            const isSelected = day === selectedDay;
            const hasEvents = SCHEDULE_EVENTS[day]?.length > 0;
            return (
              <button key={day} onClick={() => setSelectedDay(day)}
                className={`flex flex-col items-center py-2.5 px-1 rounded-xl transition-all ${isSelected ? 'text-white' : 'hover:bg-muted'}`}
                style={isSelected ? { background: 'hsl(133 18% 59%)' } : {}}>
                <span className={`text-xs font-medium mb-1 ${isSelected ? 'text-white/80' : 'text-muted-foreground'}`}>{day}</span>
                <span className={`text-base font-bold ${isSelected ? 'text-white' : isToday ? '' : ''}`}
                  style={isToday && !isSelected ? { color: 'hsl(27 87% 67%)' } : {}}>
                  {i + 26}
                </span>
                {hasEvents && (
                  <div className={`w-1.5 h-1.5 rounded-full mt-1 ${isSelected ? 'bg-white' : ''}`}
                    style={!isSelected ? { background: 'hsl(133 18% 59%)' } : {}} />
                )}
              </button>
            );
          })}
        </div>

        {/* Events for selected day */}
        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Calendar size={14} style={{ color: 'hsl(133 18% 59%)' }} />
            {selectedDay === todayName ? "Today's" : selectedDay + "'s"} Classes
          </h4>
          {SCHEDULE_EVENTS[selectedDay]?.length > 0 ? (
            <div className="space-y-2">
              {SCHEDULE_EVENTS[selectedDay].map((event, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 group hover:bg-muted transition-colors">
                  <div className="w-1 h-10 rounded-full shrink-0" style={{ background: event.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{event.title}</div>
                    <div className="text-xs text-muted-foreground">{event.time} · {event.duration} · {event.instructor}</div>
                  </div>
                  <button onClick={() => toast.success(`Joining: ${event.title}`)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white shrink-0"
                    style={{ background: event.color }}>
                    <Play size={10} fill="currentColor" /> Join
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar size={32} className="mx-auto mb-2 text-muted-foreground opacity-40" />
              <p className="text-sm text-muted-foreground">No classes scheduled for {selectedDay}</p>
              <button onClick={() => setShowAddClassModal(true)}
                className="mt-3 text-xs font-medium hover:underline" style={{ color: 'hsl(133 18% 59%)' }}>
                Add a class
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming this week */}
      <div className="card-wellness">
        <h3 className="font-semibold mb-4">Upcoming Live Classes</h3>
        <div className="space-y-3">
          {upcomingClasses.map((cls) => (
            <div key={cls.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted transition-colors group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'hsl(133 20% 92%)' }}>
                <BookOpen size={16} style={{ color: 'hsl(133 18% 59%)' }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{cls.title}</div>
                <div className="text-xs text-muted-foreground">{cls.instructor} · {cls.time} · {cls.duration}</div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {cls.isLive && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: 'hsl(0 70% 95%)', color: 'hsl(0 70% 55%)' }}>
                    ● Live
                  </span>
                )}
                <button onClick={() => toast.success(`Joining: ${cls.title}`)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
                  style={{ background: 'hsl(133 18% 59%)' }}>
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CommunityPanel() {
  const { user } = useAuth();
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [joinedGroups, setJoinedGroups] = useState<string[]>(['Beginner Yogis', 'Morning Warriors']);
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTag, setNewPostTag] = useState('Tips');
  const [posts, setPosts] = useState(COMMUNITY_POSTS);
  
  // Comments mapping and active state
  const [activeCommentText, setActiveCommentText] = useState('');
  const [expandedPostComments, setExpandedPostComments] = useState<number | null>(null);
  const [commentsMap, setCommentsMap] = useState<Record<number, { id: number; user: string; avatar: string; time: string; text: string }[]>>({
    1: [
      { id: 1, user: 'Amit K.', avatar: 'https://ui-avatars.com/api/?name=Amit+K&background=F4A261&color=fff', time: '1h ago', text: 'Incredible work Meera! Highly inspiring!' },
      { id: 2, user: 'Priya R.', avatar: 'https://ui-avatars.com/api/?name=Priya+R&background=5B8FB9&color=fff', time: '45m ago', text: 'Wow, 30 days is no joke. I hope to reach that level soon!' }
    ],
    2: [
      { id: 1, user: 'Meera S.', avatar: 'https://ui-avatars.com/api/?name=Meera+S&background=84A98C&color=fff', time: '3h ago', text: 'I am totally down for sunrise meditation! Adding you.' }
    ]
  });

  const toggleLike = (id: number) => {
    setLikedPosts((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const toggleGroup = (name: string) => {
    setJoinedGroups((prev) => {
      if (prev.includes(name)) { toast.info(`Left ${name}`); return prev.filter((x) => x !== name); }
      toast.success(`Joined ${name}! 🌿`); return [...prev, name];
    });
  };

  const handleAddPost = () => {
    if (!newPostContent.trim()) {
      toast.error('Please write something to post');
      return;
    }

    const newPost = {
      id: posts.length + 1,
      user: user?.name || 'You',
      avatar: user?.avatar || 'https://ui-avatars.com/api/?name=You&background=84A98C&color=fff',
      time: 'Just now',
      content: newPostContent,
      likes: 0,
      comments: 0,
      tag: newPostTag
    };

    setPosts([newPost, ...posts]);
    setShowAddPostModal(false);
    setNewPostContent('');
    setNewPostTag('Tips');
    toast.success('Post published to community!');
  };

  const handleAddComment = (postId: number) => {
    if (!activeCommentText.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }

    const newComment = {
      id: (commentsMap[postId] || []).length + 1,
      user: user?.name || 'You',
      avatar: user?.avatar || 'https://ui-avatars.com/api/?name=You&background=84A98C&color=fff',
      time: 'Just now',
      text: activeCommentText
    };

    setCommentsMap({
      ...commentsMap,
      [postId]: [...(commentsMap[postId] || []), newComment]
    });

    setPosts(posts.map(p => p.id === postId ? { ...p, comments: p.comments + 1 } : p));
    setActiveCommentText('');
    toast.success('Comment added successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">Community</h2>
          <p className="text-sm text-muted-foreground">Connect with 120,000+ wellness practitioners worldwide</p>
        </div>
        <button onClick={() => setShowAddPostModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: 'hsl(133 18% 59%)' }}>
          <Plus size={15} /> New Post
        </button>
      </div>

      {/* Add Post Modal */}
      {showAddPostModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4">Create New Post</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Post Content</label>
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="w-full p-3 border border-border rounded-lg bg-background min-h-[100px]"
                  placeholder="Share your yoga journey, meditation experience, or wellness tips..."
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <select
                  value={newPostTag}
                  onChange={(e) => setNewPostTag(e.target.value)}
                  className="w-full p-2 border border-border rounded-lg bg-background"
                >
                  <option value="Tips">Tips</option>
                  <option value="Achievement">Achievement</option>
                  <option value="Community">Community</option>
                  <option value="Retreat">Retreat</option>
                  <option value="Question">Question</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddPost}
                className="flex-1 py-2 px-4 rounded-lg text-white font-semibold"
                style={{ background: 'hsl(133 18% 59%)' }}
              >
                Publish Post
              </button>
              <button
                onClick={() => setShowAddPostModal(false)}
                className="flex-1 py-2 px-4 rounded-lg border border-border font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feed */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-semibold text-sm">Community Feed</h3>
          {posts.map((post) => (
            <div key={post.id} className="card-wellness">
              <div className="flex items-start gap-3 mb-3">
                <img src={post.avatar} alt={post.user} className="w-9 h-9 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold">{post.user}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{post.tag}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{post.time}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.content}</p>
              <div className="flex items-center gap-4 pt-3 border-t border-border">
                <button onClick={() => toggleLike(post.id)}
                  className="flex items-center gap-1.5 text-xs transition-colors"
                  style={likedPosts.includes(post.id) ? { color: 'hsl(0 70% 60%)' } : {}}>
                  <Heart size={14} fill={likedPosts.includes(post.id) ? 'currentColor' : 'none'} />
                  {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                </button>
                <button onClick={() => setExpandedPostComments(expandedPostComments === post.id ? null : post.id)}
                  className={`flex items-center gap-1.5 text-xs transition-colors ${expandedPostComments === post.id ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'}`}
                  style={expandedPostComments === post.id ? { color: 'hsl(133 18% 45%)' } : {}}
                >
                  <MessageSquare size={14} /> {post.comments}
                </button>
                <button onClick={() => toast.success('Post shared!')}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors ml-auto">
                  Share
                </button>
              </div>

              {/* Functional Comments Section */}
              {expandedPostComments === post.id && (
                <div className="mt-4 pt-4 border-t border-border space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* List of comments */}
                  <div className="space-y-3 pl-2 md:pl-4">
                    {(commentsMap[post.id] || []).length > 0 ? (
                      (commentsMap[post.id] || []).map((comment) => (
                        <div key={comment.id} className="flex gap-2.5 items-start bg-muted/30 p-2.5 rounded-xl border border-border/30">
                          <img 
                            src={comment.avatar} 
                            alt={comment.user} 
                            className="w-7 h-7 rounded-full object-cover" 
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-bold text-foreground">{comment.user}</span>
                              <span className="text-[10px] text-muted-foreground">{comment.time}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{comment.text}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-muted-foreground italic pl-2">No comments yet. Be the first to share your thoughts!</p>
                    )}
                  </div>

                  {/* Add comment input */}
                  <div className="flex items-center gap-2 mt-2">
                    <img 
                      src={user?.avatar || 'https://ui-avatars.com/api/?name=You&background=84A98C&color=fff'} 
                      alt={user?.name || 'You'} 
                      className="w-7 h-7 rounded-full object-cover border" 
                      style={{ borderColor: 'hsl(133 18% 59%)' }}
                    />
                    <input 
                      type="text"
                      placeholder="Write a reply..."
                      className="flex-1 bg-muted/60 border border-border focus:border-primary focus:outline-none rounded-xl px-3 py-2 text-xs"
                      value={activeCommentText}
                      onChange={(e) => setActiveCommentText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAddComment(post.id);
                        }
                      }}
                    />
                    <button 
                      onClick={() => handleAddComment(post.id)}
                      className="px-3 py-2 rounded-xl text-white font-bold text-xs shrink-0 transition-opacity hover:opacity-90"
                      style={{ background: 'hsl(133 18% 59%)' }}
                    >
                      Post
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Groups sidebar */}
        <div className="space-y-4">
          <div className="card-wellness">
            <h3 className="font-semibold text-sm mb-4">Wellness Groups</h3>
            <div className="space-y-3">
              {GROUPS.map((group) => {
                const isJoined = joinedGroups.includes(group.name);
                return (
                  <div key={group.name} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 bg-muted">
                      {group.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{group.name}</div>
                      <div className="text-xs text-muted-foreground">{group.members.toLocaleString()} members</div>
                    </div>
                    <button onClick={() => toggleGroup(group.name)}
                      className="px-3 py-1 rounded-lg text-xs font-semibold transition-all shrink-0"
                      style={isJoined
                        ? { background: 'hsl(133 20% 92%)', color: 'hsl(133 20% 40%)' }
                        : { background: 'hsl(133 18% 59%)', color: 'white' }}>
                      {isJoined ? 'Joined' : 'Join'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Challenges */}
          <div className="card-wellness" style={{ background: 'linear-gradient(135deg, hsl(27 87% 67%), hsl(27 70% 55%))', color: 'white', borderColor: 'transparent' }}>
            <div className="flex items-center gap-2 mb-3">
              <Trophy size={16} />
              <span className="font-semibold text-sm">Active Challenge</span>
            </div>
            <h4 className="font-bold mb-1">21-Day Mindfulness</h4>
            <p className="text-xs text-white/75 mb-3">Day 14 of 21 — Keep going!</p>
            <div className="h-2 rounded-full bg-white/20 overflow-hidden mb-3">
              <div className="h-full rounded-full bg-white" style={{ width: '67%' }} />
            </div>
            <button onClick={() => toast.success('Challenge progress updated!')}
              className="w-full py-2 rounded-xl text-xs font-semibold hover:bg-white/20 transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.4)' }}>
              Log Today's Practice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsPanel({ isDark }: { isDark: boolean }) {
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly');
  const chartData = period === 'weekly' ? weeklyData : monthlyData;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">Wellness Analytics</h2>
          <p className="text-sm text-muted-foreground">Deep insights into your holistic health progress</p>
        </div>
        <div className="flex items-center gap-1 p-1 rounded-xl bg-muted">
          {(['weekly', 'monthly'] as const).map((p) => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${period === p ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Yoga Sessions', value: '28', change: '+12%', icon: Activity, color: 'hsl(133 18% 59%)', bg: 'hsl(133 20% 92%)' },
          { label: 'Meditation Minutes', value: '420', change: '+8%', icon: Moon, color: 'hsl(220 70% 60%)', bg: 'hsl(220 70% 95%)' },
          { label: 'Calories Burned', value: '4,820', change: '+5%', icon: Flame, color: 'hsl(27 87% 67%)', bg: 'hsl(27 87% 93%)' },
          { label: 'Water Intake (avg)', value: '2.4L', change: '+15%', icon: Droplets, color: 'hsl(200 60% 55%)', bg: 'hsl(200 60% 93%)' },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="card-wellness">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: kpi.bg }}>
                  <Icon size={16} style={{ color: kpi.color }} />
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: 'hsl(133 20% 92%)', color: 'hsl(133 20% 40%)' }}>
                  {kpi.change}
                </span>
              </div>
              <div className="text-2xl font-bold mb-0.5" style={{ fontFamily: 'Playfair Display, serif', color: kpi.color }}>{kpi.value}</div>
              <div className="text-xs text-muted-foreground">{kpi.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity chart */}
        <div className="card-wellness">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">{period === 'weekly' ? 'Daily' : 'Weekly'} Activity (min)</h3>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1.5 rounded-full inline-block" style={{ background: 'hsl(133 18% 59%)' }} /> Yoga
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1.5 rounded-full inline-block" style={{ background: 'hsl(220 70% 60%)' }} /> Meditation
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gYoga" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(133,18%,59%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(133,18%,59%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gMed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(220,70%,60%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(220,70%,60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
              <XAxis dataKey={period === 'weekly' ? 'day' : 'week'} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }} />
              <Area type="monotone" dataKey="yoga" stroke="hsl(133,18%,59%)" fill="url(#gYoga)" strokeWidth={2} />
              <Area type="monotone" dataKey="meditation" stroke="hsl(220,70%,60%)" fill="url(#gMed)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Radar chart */}
        <div className="card-wellness">
          <h3 className="font-semibold text-sm mb-4">Wellness Dimensions</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'} />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
              <Radar name="Score" dataKey="value" stroke="hsl(133,18%,59%)" fill="hsl(133,18%,59%)" fillOpacity={0.25} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly comparison */}
      <div className="card-wellness">
        <h3 className="font-semibold text-sm mb-4">Monthly Comparison (min)</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={monthlyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
            <XAxis dataKey="week" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="yoga" name="Yoga" fill="hsl(133,18%,59%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="meditation" name="Meditation" fill="hsl(220,70%,60%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Goal tracking */}
      <div className="card-wellness">
        <div className="flex items-center gap-2 mb-4">
          <Award size={16} style={{ color: 'hsl(27 87% 67%)' }} />
          <h3 className="font-semibold text-sm">Goal Progress</h3>
        </div>
        <div className="space-y-4">
          {[
            { label: 'Yoga Sessions / Month', current: 28, target: 30, color: 'hsl(133 18% 59%)' },
            { label: 'Meditation Minutes / Week', current: 105, target: 120, color: 'hsl(220 70% 60%)' },
            { label: 'Wellness Score', current: 83, target: 90, color: 'hsl(27 87% 67%)' },
            { label: 'Flexibility Score', current: 72, target: 85, color: 'hsl(160 40% 50%)' },
          ].map((goal, i) => (
            <div key={i}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-medium">{goal.label}</span>
                <span className="text-muted-foreground">{goal.current} / {goal.target}</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%`, background: goal.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nutrition snapshot */}
      <div className="card-wellness">
        <div className="flex items-center gap-2 mb-4">
          <Apple size={16} style={{ color: 'hsl(27 87% 67%)' }} />
          <h3 className="font-semibold text-sm">Nutrition & Lifestyle Snapshot</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Avg Sleep', value: '7.2h', icon: Moon, color: 'hsl(220 70% 60%)' },
            { label: 'Avg Water', value: '2.4L', icon: Droplets, color: 'hsl(200 60% 55%)' },
            { label: 'Plant-Based Meals', value: '68%', icon: Apple, color: 'hsl(133 18% 59%)' },
            { label: 'Screen-free Hours', value: '3.8h', icon: TrendingUp, color: 'hsl(27 87% 67%)' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="p-3 rounded-xl bg-muted/50 text-center">
                <Icon size={20} className="mx-auto mb-2" style={{ color: item.color }} />
                <div className="text-lg font-bold mb-0.5" style={{ fontFamily: 'Playfair Display, serif', color: item.color }}>{item.value}</div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

const Dashboard = () => {
  useScrollTop();
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');
  
  // Notification states
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Session Starting soon', desc: 'Your Yin Yoga session with Serene Kapoor starts in 15 minutes.', time: '15m ago', read: false },
    { id: 2, title: 'Achievement Unlocked! 🏆', desc: 'Congratulations! You completed a 7-day yoga streak.', time: '2h ago', read: false },
    { id: 3, title: 'Community Update', desc: 'Amit K. liked your comment in the Sunrise Meditation thread.', time: '1d ago', read: true }
  ]);

  const greeting = (() => {
    const h = new Date().getHours();
    return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  })();

  if (!user) {
    navigate('/login', { replace: true });
    return null;
  }

  // Role-based redirect for non-user roles
  if (user.role === 'instructor') { navigate('/instructor-dashboard', { replace: true }); return null; }
  if (user.role === 'organizer') { navigate('/organizer-dashboard', { replace: true }); return null; }
  if (user.role === 'coach') { navigate('/coach-dashboard', { replace: true }); return null; }
  if (user.role === 'admin') { navigate('/admin-dashboard', { replace: true }); return null; }

  const handleLogout = () => {
    logout();
    toast.success('See you soon! Namaste 🙏');
    navigate('/');
  };

  const activeLabel = NAV_ITEMS.find((n) => n.id === activeNav)?.label || 'Dashboard';

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-40 inset-y-0 left-0 flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-64' : 'lg:w-64 w-0'} overflow-hidden`}
        style={{ background: 'hsl(var(--sidebar-background))', borderRight: '1px solid hsl(var(--sidebar-border))' }}>
        <Link to="/" className="flex items-center gap-2 px-5 py-5 border-b border-sidebar-border hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'hsl(133 18% 59%)' }}>
            <Leaf size={16} className="text-white" />
          </div>
          <span className="font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'hsl(150 15% 12%)' }}>
            Yogic<span style={{ color: 'hsl(27 87% 67%)' }}>Town</span>
          </span>
        </Link>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id}
                onClick={() => { setActiveNav(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeNav === item.id ? 'text-white' : 'text-sidebar-foreground hover:bg-sidebar-accent'}`}
                style={activeNav === item.id ? { background: 'hsl(133 18% 59%)' } : {}}>
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
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

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div>
              <h1 className="text-base font-semibold">
                {activeNav === 'dashboard' ? `${greeting}, ${user.name.split(' ')[0]}! 🙏` : activeLabel}
              </h1>
              <p className="text-xs text-muted-foreground">
                {activeNav === 'dashboard' ? 'Your wellness journey continues' :
                 activeNav === 'programs' ? 'Track your enrolled courses' :
                 activeNav === 'meditation' ? 'Find your inner peace' :
                 activeNav === 'schedule' ? 'Your weekly class planner' :
                 activeNav === 'community' ? 'Connect with practitioners worldwide' :
                 'Your holistic health insights'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted transition-colors relative"
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
                      style={{ color: 'hsl(133 18% 45%)' }}
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
                          style={!n.read ? { borderLeftColor: 'hsl(133 18% 59%)' } : {}}
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
              <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border-2"
                style={{ borderColor: 'hsl(133 18% 59%)' }} />
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">

          {/* ── Overview ── */}
          {activeNav === 'dashboard' && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Streak Days', value: '28', icon: Flame, color: 'hsl(27 87% 67%)', bg: 'hsl(27 87% 93%)', change: '+3 this week' },
                  { label: 'Sessions Done', value: '142', icon: Target, color: 'hsl(133 18% 59%)', bg: 'hsl(133 20% 92%)', change: '+5 this month' },
                  { label: 'Meditation Min', value: '420', icon: Clock, color: 'hsl(220 70% 60%)', bg: 'hsl(220 70% 95%)', change: '+35 this week' },
                  { label: 'Wellness Score', value: '83', icon: Star, color: 'hsl(45 80% 50%)', bg: 'hsl(45 80% 93%)', change: '+5 pts' },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="card-wellness">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: stat.bg }}>
                          <Icon size={18} style={{ color: stat.color }} />
                        </div>
                        <span className="text-xs font-medium" style={{ color: 'hsl(133 18% 59%)' }}>{stat.change}</span>
                      </div>
                      <div className="text-3xl font-bold mb-0.5" style={{ fontFamily: 'Playfair Display, serif', color: stat.color }}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2 card-wellness">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Weekly Activity</h3>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full inline-block" style={{ background: 'hsl(133 18% 59%)' }} /> Yoga</span>
                      <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full inline-block" style={{ background: 'hsl(220 70% 60%)' }} /> Meditation</span>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={180}>
                    <AreaChart data={weeklyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorYoga" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(133,18%,59%)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(133,18%,59%)" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorMed" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(220,70%,60%)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(220,70%,60%)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
                      <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))' }} />
                      <Area type="monotone" dataKey="yoga" stroke="hsl(133,18%,59%)" fill="url(#colorYoga)" strokeWidth={2} />
                      <Area type="monotone" dataKey="meditation" stroke="hsl(220,70%,60%)" fill="url(#colorMed)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="card-wellness">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Today's Classes</h3>
                    <button className="text-xs" style={{ color: 'hsl(133 18% 59%)' }}
                      onClick={() => setActiveNav('schedule')}>View all</button>
                  </div>
                  <div className="space-y-3">
                    {upcomingClasses.map((cls) => (
                      <div key={cls.id} className="p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="text-sm font-medium leading-tight">{cls.title}</div>
                          {cls.isLive && (
                            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs font-medium shrink-0" style={{ background: 'hsl(0 70% 95%)', color: 'hsl(0 70% 55%)' }}>
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Live
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">{cls.instructor}</div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">{cls.time}</span>
                          <button className="flex items-center gap-1 text-xs font-medium" style={{ color: 'hsl(133 18% 59%)' }}
                            onClick={() => toast.success(`Joining: ${cls.title}`)}>
                            <Play size={11} fill="currentColor" /> Join
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="card-wellness">
                  <h3 className="font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {recentActivities.map((a, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'hsl(133 20% 92%)' }}>
                          {a.type === 'yoga' ? <BookOpen size={16} style={{ color: 'hsl(133 18% 59%)' }} /> :
                            a.type === 'meditation' ? <Heart size={16} style={{ color: 'hsl(220 70% 60%)' }} /> :
                              <Zap size={16} style={{ color: 'hsl(27 87% 67%)' }} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{a.title}</div>
                          <div className="text-xs text-muted-foreground">{a.duration} · {a.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-wellness" style={{ background: 'linear-gradient(135deg, hsl(133 18% 59%) 0%, hsl(133 22% 48%) 100%)', borderColor: 'transparent', color: 'white' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
                      <Zap size={16} />
                    </div>
                    <span className="font-semibold text-sm">AI Wellness Insight</span>
                  </div>
                  <p className="text-sm text-white/85 leading-relaxed mb-4">
                    You have been most consistent on Thursday and Saturday. Consider adding a Wednesday session to balance your weekly flow.
                  </p>
                  <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.15)' }}>
                    <div className="text-xs font-medium mb-1">Today's Recommendation</div>
                    <div className="text-sm font-semibold">15 min Yin Yoga + 10 min Breathwork</div>
                  </div>
                  <button className="mt-4 w-full py-2 rounded-xl text-sm font-semibold transition-all hover:bg-white/20"
                    style={{ border: '1px solid rgba(255,255,255,0.3)' }}
                    onClick={() => setActiveNav('analytics')}>
                    View Full Plan
                  </button>
                </div>

                <div className="card-wellness">
                  <h3 className="font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Browse Programs', icon: BookOpen, action: () => setActiveNav('programs') },
                      { label: 'Start Meditation', icon: Heart, action: () => setActiveNav('meditation') },
                      { label: 'View Schedule', icon: Calendar, action: () => setActiveNav('schedule') },
                      { label: 'Community Feed', icon: Users, action: () => setActiveNav('community') },
                      { label: 'My Analytics', icon: BarChart3, action: () => setActiveNav('analytics') },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <button key={i} onClick={item.action}
                          className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-muted transition-colors group">
                          <div className="flex items-center gap-2.5">
                            <Icon size={15} style={{ color: 'hsl(133 18% 59%)' }} />
                            <span className="text-sm">{item.label}</span>
                          </div>
                          <ChevronRight size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── Programs ── */}
          {activeNav === 'programs' && <ProgramsPanel />}

          {/* ── Meditation ── */}
          {activeNav === 'meditation' && <MeditationPanel />}

          {/* ── Schedule ── */}
          {activeNav === 'schedule' && <SchedulePanel />}

          {/* ── Community ── */}
          {activeNav === 'community' && <CommunityPanel />}

          {/* ── Analytics ── */}
          {activeNav === 'analytics' && <AnalyticsPanel isDark={isDark} />}

        </main>
      </div>
    </div>
  );
};

export default Dashboard;
