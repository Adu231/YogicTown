import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Leaf, Mail, Lock, ChevronDown } from 'lucide-react';
import { login, MOCK_USERS, getRoleDashboardPath } from '@/lib/auth';
import { toast } from 'sonner';
import { useScrollTop } from '@/hooks/useScrollTop';
import { ThemeToggle } from '@/components/features/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';

const DEMO_ACCOUNTS = [
  { email: 'priya@example.com', password: 'demo123', role: 'user', label: 'Wellness User', color: 'hsl(133 18% 59%)', bg: 'hsl(133 20% 92%)', emoji: '🧘' },
  { email: 'instructor@example.com', password: 'demo123', role: 'instructor', label: 'Yoga Instructor', color: 'hsl(27 87% 67%)', bg: 'hsl(27 87% 93%)', emoji: '✨' },
  { email: 'organizer@example.com', password: 'demo123', role: 'organizer', label: 'Retreat Organizer', color: 'hsl(200 60% 55%)', bg: 'hsl(200 60% 93%)', emoji: '🏔️' },
  { email: 'coach@example.com', password: 'demo123', role: 'coach', label: 'Wellness Coach', color: 'hsl(160 40% 50%)', bg: 'hsl(160 40% 93%)', emoji: '🌿' },
  { email: 'admin@example.com', password: 'demo123', role: 'admin', label: 'Admin', color: 'hsl(220 70% 60%)', bg: 'hsl(220 70% 95%)', emoji: '🛡️' },
];

const Login = () => {
  useScrollTop();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDemoAccounts, setShowDemoAccounts] = useState(true);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.email || !form.email.includes('@')) errs.email = 'Enter a valid email address';
    if (!form.password || form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const doLogin = async (email: string, password: string) => {
    const user = await login(email, password);
    const path = getRoleDashboardPath(user.role);
    toast.success(`Welcome! Redirecting to your ${user.role} dashboard 🙏`);
    navigate(path);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await doLogin(form.email, form.password);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = async (account: typeof DEMO_ACCOUNTS[0]) => {
    setDemoLoading(account.role);
    try {
      await doLogin(account.email, account.password);
    } catch {
      toast.error('Demo login failed');
    } finally {
      setDemoLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, hsl(133 18% 59%) 0%, hsl(133 22% 45%) 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full border-2 border-white" />
          <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full border-2 border-white" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-white" />
        </div>
        <div className="relative z-10 text-center text-white px-12">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <Leaf size={28} className="text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Return to Your Practice
          </h2>
          <p className="text-white/75 leading-relaxed max-w-xs mx-auto mb-8">
            Your wellness journey continues. Every day on the mat is a step toward your truest self.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-3 text-sm">
            {[
              { emoji: '🧘', label: 'Wellness User', desc: 'Track your practice' },
              { emoji: '✨', label: 'Yoga Instructor', desc: 'Teach & earn' },
              { emoji: '🏔️', label: 'Retreat Organizer', desc: 'Host events' },
              { emoji: '🌿', label: 'Wellness Coach', desc: 'Guide clients' },
              { emoji: '🛡️', label: 'Admin', desc: 'Manage platform' },
            ].map((role, i) => (
              <div key={i} className="flex items-center gap-3 text-white/80 px-4 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <span>{role.emoji}</span>
                <div className="text-left">
                  <div className="text-xs font-semibold">{role.label}</div>
                  <div className="text-xs text-white/60">{role.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-1/2 flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between px-8 py-5">
          <Link to="/" className="flex items-center gap-2 font-bold">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'hsl(133 18% 59%)' }}>
              <Leaf size={14} className="text-white" />
            </div>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem' }}>
              Yogic<span style={{ color: 'hsl(27 87% 67%)' }}>Town</span>
            </span>
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex-1 flex items-center justify-center px-8 py-6">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Welcome Back</h1>
            <p className="text-muted-foreground mb-6">Sign in to continue your wellness journey.</p>

            {/* Demo accounts */}
            <div className="mb-6">
              <button
                onClick={() => setShowDemoAccounts(!showDemoAccounts)}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-dashed border-primary/40 hover:bg-muted/50 transition-colors mb-2 text-sm font-medium"
                style={{ color: 'hsl(133 18% 59%)' }}>
                <span>🎯 Try a Demo Account</span>
                <ChevronDown size={15} className={`transition-transform ${showDemoAccounts ? 'rotate-180' : ''}`} />
              </button>
              {showDemoAccounts && (
                <div className="grid grid-cols-1 gap-2">
                  {DEMO_ACCOUNTS.map((acc) => (
                    <button
                      key={acc.role}
                      onClick={() => handleDemo(acc)}
                      disabled={!!demoLoading}
                      className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-current/40 transition-all text-left disabled:opacity-60"
                      style={{ borderColor: demoLoading === acc.role ? acc.color : undefined }}
                    >
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0" style={{ background: acc.bg }}>
                        {demoLoading === acc.role ? '⏳' : acc.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold">{acc.label}</div>
                        <div className="text-xs text-muted-foreground truncate">{acc.email}</div>
                      </div>
                      <span className="text-xs font-medium shrink-0 px-2 py-0.5 rounded-full"
                        style={{ background: acc.bg, color: acc.color }}>
                        {demoLoading === acc.role ? 'Logging in...' : 'Try'}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or sign in with email</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-muted border focus:outline-none focus:ring-2 text-sm ${errors.email ? 'border-destructive' : 'border-transparent focus:ring-primary'}`} />
                </div>
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input type={showPass ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-10 py-3 rounded-xl bg-muted border focus:outline-none focus:ring-2 text-sm ${errors.password ? 'border-destructive' : 'border-transparent focus:ring-primary'}`} />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  Remember me
                </label>
                <Link to="/forgot-password" className="text-sm hover:underline" style={{ color: 'hsl(133 18% 59%)' }}>
                  Forgot password?
                </Link>
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 disabled:opacity-60"
                style={{ background: 'hsl(133 18% 59%)' }}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              New to YogicTown?{' '}
              <Link to="/register" className="font-medium hover:underline" style={{ color: 'hsl(133 18% 59%)' }}>
                Create free account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
