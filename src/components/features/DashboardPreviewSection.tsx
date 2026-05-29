import { Link } from 'react-router-dom';
import { Activity, Flame, Clock, Target, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import dashboardImg from '@/assets/dashboard-preview.jpg';

export function DashboardPreviewSection() {
  return (
    <section className="section-padding overflow-hidden relative bg-background">
      <div className="absolute inset-0 dark:hidden" style={{ background: 'linear-gradient(135deg, hsl(133 20% 96%) 0%, hsl(60 17% 98%) 100%)' }} />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="tag-orange mx-auto mb-4 w-fit">
            <Activity size={12} /> Live Dashboard Preview
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Your Wellness Hub,<br />
            <span className="italic" style={{ color: 'hsl(133 20% 40%)' }}>Always in View</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            A beautiful, intuitive dashboard that keeps you motivated and aligned with your wellness goals every single day.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left: Stats Cards */}
          <div className="flex flex-col gap-4">
            <div className="card-wellness">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">Today's Streak</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'hsl(27 87% 93%)' }}>
                  <Flame size={16} style={{ color: 'hsl(27 87% 67%)' }} />
                </div>
              </div>
              <div className="text-4xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: 'hsl(27 87% 60%)' }}>
                28
              </div>
              <div className="text-xs text-muted-foreground">Consecutive days</div>
              <div className="flex gap-1 mt-3">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="flex-1 h-2 rounded-full" style={{ background: i < 6 ? 'hsl(27 87% 67%)' : 'hsl(60 15% 88%)' }} />
                ))}
              </div>
            </div>

            <div className="card-wellness">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">Weekly Goal</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'hsl(133 20% 92%)' }}>
                  <Target size={16} style={{ color: 'hsl(133 18% 59%)' }} />
                </div>
              </div>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'hsl(133 20% 40%)' }}>5</span>
                <span className="text-muted-foreground text-sm mb-2">/ 7 sessions</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: '71%', background: 'hsl(133 18% 59%)' }} />
              </div>
              <div className="text-xs text-muted-foreground mt-1.5">71% complete this week</div>
            </div>

            <div className="card-wellness">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">Meditation Time</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'hsl(220 70% 95%)' }}>
                  <Clock size={16} style={{ color: 'hsl(220 70% 60%)' }} />
                </div>
              </div>
              <div className="text-4xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: 'hsl(220 70% 60%)' }}>
                420
              </div>
              <div className="text-xs text-muted-foreground">Minutes this month</div>
            </div>
          </div>

          {/* Center: Main Preview */}
          <div className="lg:col-span-1 relative rounded-2xl overflow-hidden shadow-2xl">
            <img src={dashboardImg} alt="Dashboard preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Link to="/dashboard">
                <button className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-105"
                  style={{ background: 'hsl(133 18% 59%)' }}>
                  <Play size={22} className="text-white ml-1" fill="white" />
                </button>
              </Link>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="glass-card p-3">
                <div className="text-xs font-semibold mb-1">Now Live: Morning Vinyasa Flow</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">with Ananya Krishnan • 842 attending</span>
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse-soft" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Activity List */}
          <div className="flex flex-col gap-4">
            <div className="card-wellness">
              <h4 className="text-sm font-semibold mb-4">Today's Schedule</h4>
              <div className="space-y-3">
                {[
                  { time: '6:30 AM', title: 'Morning Pranayama', status: 'done', duration: '15 min' },
                  { time: '7:00 AM', title: 'Vinyasa Flow', status: 'done', duration: '45 min' },
                  { time: '12:30 PM', title: 'Midday Breathwork', status: 'upcoming', duration: '10 min' },
                  { time: '7:00 PM', title: 'Sleep Meditation', status: 'upcoming', duration: '20 min' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 shrink-0">
                      {item.status === 'done' ? (
                        <CheckCircle2 size={18} style={{ color: 'hsl(133 18% 59%)' }} />
                      ) : (
                        <div className="w-4.5 h-4.5 rounded-full border-2" style={{ borderColor: 'hsl(133 18% 59%)' }} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium truncate">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.time} · {item.duration}</div>
                    </div>
                    {item.status === 'upcoming' && (
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'hsl(27 87% 67%)' }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="card-wellness">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold">Wellness Score</h4>
                <span className="text-xs text-muted-foreground">This week</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16">
                  <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(60 15% 88%)" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(133 18% 59%)" strokeWidth="3"
                      strokeDasharray="83 17" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-bold" style={{ color: 'hsl(133 20% 40%)' }}>83</div>
                </div>
                <div>
                  <div className="text-sm font-semibold">Excellent</div>
                  <div className="text-xs text-muted-foreground">+5 points vs last week</div>
                </div>
              </div>
            </div>

            <Link to="/dashboard" className="btn-primary w-full justify-center">
              Open Full Dashboard <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
