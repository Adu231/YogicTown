import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Leaf, User, Mail, Lock, CheckCircle } from 'lucide-react';
import { register } from '@/lib/auth';
import { toast } from 'sonner';
import { useScrollTop } from '@/hooks/useScrollTop';
import { ThemeToggle } from '@/components/features/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';

const GOALS = ['Stress Relief', 'Flexibility', 'Strength', 'Better Sleep', 'Weight Loss', 'Spiritual Growth', 'Meditation', 'Back Pain Relief'];

const Register = () => {
  useScrollTop();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [goals, setGoals] = useState<string[]>([]);
  const [level, setLevel] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim() || form.name.length < 2) errs.name = 'Name must be at least 2 characters';
    if (!form.email || !form.email.includes('@')) errs.email = 'Enter a valid email';
    if (!form.password || form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async () => {
    if (!level) { toast.error('Please select your yoga experience level'); return; }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success('Account created! Welcome to YogicTown 🌿');
      navigate('/dashboard');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, hsl(27 87% 67%) 0%, hsl(27 70% 55%) 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full border-2 border-white" />
          <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full border-2 border-white" />
        </div>
        <div className="relative z-10 text-center text-white px-12">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <Leaf size={28} />
          </div>
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Start Your Journey</h2>
          <p className="text-white/75 leading-relaxed max-w-xs mx-auto">
            Join 120,000+ practitioners and transform your life through the ancient wisdom of yoga and mindfulness.
          </p>
          <div className="mt-10 space-y-3 text-sm text-white/70">
            <div className="flex items-center gap-3"><CheckCircle size={16} /> Free plan — no credit card required</div>
            <div className="flex items-center gap-3"><CheckCircle size={16} /> Personalized AI wellness plan</div>
            <div className="flex items-center gap-3"><CheckCircle size={16} /> Access 20+ free yoga classes</div>
            <div className="flex items-center gap-3"><CheckCircle size={16} /> Join global wellness community</div>
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="flex items-center justify-between px-8 py-5">
          <Link to="/" className="flex items-center gap-2 font-bold">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'hsl(133 18% 59%)' }}>
              <Leaf size={14} className="text-white" />
            </div>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem' }}>
              Yogic<span style={{ color: 'hsl(27 87% 67%)' }}>Town</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {[1, 2].map((s) => (
                <div key={s} className="w-6 h-1.5 rounded-full transition-colors"
                  style={{ background: s <= step ? 'hsl(133 18% 59%)' : 'hsl(60 15% 88%)' }} />
              ))}
            </div>
            <ThemeToggle />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-8 py-8">
          <div className="w-full max-w-md">
            {step === 1 ? (
              <>
                <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Create Account</h1>
                <p className="text-muted-foreground mb-8">Join the YogicTown community for free.</p>
                <form onSubmit={handleStep1} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Full Name</label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-muted border focus:outline-none focus:ring-2 text-sm ${errors.name ? 'border-destructive' : 'border-transparent focus:ring-primary'}`} />
                    </div>
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Email Address</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-muted border focus:outline-none focus:ring-2 text-sm ${errors.email ? 'border-destructive' : 'border-transparent focus:ring-primary'}`} />
                    </div>
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Password</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input type={showPass ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Min. 6 characters"
                        className={`w-full pl-10 pr-10 py-3 rounded-xl bg-muted border focus:outline-none focus:ring-2 text-sm ${errors.password ? 'border-destructive' : 'border-transparent focus:ring-primary'}`} />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Confirm Password</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} placeholder="Repeat your password"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-muted border focus:outline-none focus:ring-2 text-sm ${errors.confirmPassword ? 'border-destructive' : 'border-transparent focus:ring-primary'}`} />
                    </div>
                    {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>}
                  </div>
                  <button type="submit" className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90" style={{ background: 'hsl(133 18% 59%)' }}>
                    Continue to Wellness Goals
                  </button>
                </form>
                <p className="text-center text-xs text-muted-foreground mt-4">
                  By registering, you agree to our{' '}
                  <Link to="/terms" className="underline">Terms</Link> and{' '}
                  <Link to="/privacy" className="underline">Privacy Policy</Link>.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Your Wellness Goals</h1>
                <p className="text-muted-foreground mb-6">Help us personalize your journey. Select all that apply.</p>

                <div className="mb-6">
                  <label className="text-sm font-medium mb-3 block">Yoga Experience Level</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Beginner', 'Intermediate', 'Advanced'].map((l) => (
                      <button key={l} onClick={() => setLevel(l.toLowerCase())} type="button"
                        className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${level === l.toLowerCase() ? 'border-primary text-primary' : 'border-border hover:border-primary/50'}`}
                        style={level === l.toLowerCase() ? { borderColor: 'hsl(133 18% 59%)', color: 'hsl(133 18% 59%)', background: 'hsl(133 20% 92%)' } : {}}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="text-sm font-medium mb-3 block">Wellness Goals (Select up to 3)</label>
                  <div className="flex flex-wrap gap-2">
                    {GOALS.map((g) => (
                      <button key={g} onClick={() => setGoals((prev) => prev.includes(g) ? prev.filter((x) => x !== g) : prev.length < 3 ? [...prev, g] : prev)} type="button"
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${goals.includes(g) ? '' : 'border-border hover:border-primary/50'}`}
                        style={goals.includes(g) ? { background: 'hsl(27 87% 93%)', color: 'hsl(27 80% 50%)', borderColor: 'hsl(27 87% 80%)' } : {}}>
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl font-semibold text-sm border border-border hover:bg-muted transition-colors">
                    Back
                  </button>
                  <button onClick={handleSubmit} disabled={loading} className="flex-1 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 disabled:opacity-60"
                    style={{ background: 'hsl(27 87% 67%)' }}>
                    {loading ? 'Creating...' : 'Create Account'}
                  </button>
                </div>
              </>
            )}

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already a member?{' '}
              <Link to="/login" className="font-medium hover:underline" style={{ color: 'hsl(133 18% 59%)' }}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
