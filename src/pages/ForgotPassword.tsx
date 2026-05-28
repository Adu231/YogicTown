import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { sendPasswordReset } from '@/lib/auth';
import { toast } from 'sonner';
import { useScrollTop } from '@/hooks/useScrollTop';
import { ThemeToggle } from '@/components/features/ThemeToggle';

const ForgotPassword = () => {
  useScrollTop();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) { setError('Enter a valid email address'); return; }
    setError('');
    setLoading(true);
    try {
      await sendPasswordReset(email);
      setSent(true);
      toast.success('Reset link sent! Check your inbox.');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-10">
          <Link to="/" className="flex items-center gap-2 font-bold">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'hsl(133 18% 59%)' }}>
              <Leaf size={14} className="text-white" />
            </div>
            <span style={{ fontFamily: 'Playfair Display, serif' }}>
              Yogic<span style={{ color: 'hsl(27 87% 67%)' }}>Town</span>
            </span>
          </Link>
          <ThemeToggle />
        </div>

        {!sent ? (
          <>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'hsl(133 20% 92%)' }}>
              <Mail size={24} style={{ color: 'hsl(133 18% 59%)' }} />
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Reset Password</h1>
            <p className="text-muted-foreground mb-8">Enter your email and we will send you a secure reset link.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} placeholder="you@example.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl bg-muted border focus:outline-none focus:ring-2 text-sm ${error ? 'border-destructive' : 'border-transparent focus:ring-primary'}`} />
                </div>
                {error && <p className="text-xs text-destructive mt-1">{error}</p>}
              </div>
              <button type="submit" disabled={loading} className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 disabled:opacity-60"
                style={{ background: 'hsl(133 18% 59%)' }}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'hsl(133 20% 92%)' }}>
              <CheckCircle size={28} style={{ color: 'hsl(133 18% 59%)' }} />
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Check Your Inbox</h1>
            <p className="text-muted-foreground mb-6">
              We have sent a password reset link to <strong>{email}</strong>. The link expires in 24 hours.
            </p>
            <p className="text-sm text-muted-foreground">
              Did not receive the email?{' '}
              <button onClick={() => setSent(false)} className="font-medium hover:underline" style={{ color: 'hsl(133 18% 59%)' }}>
                Try again
              </button>
            </p>
          </div>
        )}

        <div className="mt-8">
          <Link to="/login" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={14} /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
