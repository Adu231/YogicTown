import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bell, Lock, CreditCard, Shield, User, Moon, Globe, Check } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { useScrollTop } from '@/hooks/useScrollTop';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { toast } from 'sonner';

const TABS = [
  { id: 'account', label: 'Account', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'security', label: 'Security', icon: Lock },
];

const Settings = () => {
  useScrollTop();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [tab, setTab] = useState('account');
  const [saving, setSaving] = useState(false);
  const [notifs, setNotifs] = useState({
    classReminders: true,
    communityUpdates: false,
    weeklyReport: true,
    newContent: true,
    promotions: false,
    emailDigest: true,
  });
  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    showProgress: false,
    showGoals: true,
    dataCollection: true,
  });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Settings saved successfully!');
    }, 900);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Please sign in to access settings.</p>
          <Link to="/login" className="btn-primary">Sign In</Link>
        </div>
      </div>
    );
  }

  const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button onClick={onChange}
      className={`relative inline-flex w-11 h-6 rounded-full transition-colors duration-200 ${checked ? '' : 'bg-muted'}`}
      style={checked ? { background: 'hsl(133 18% 59%)' } : {}}>
      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>Settings</h1>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Nav */}
            <div className="lg:w-52 shrink-0">
              <div className="card-wellness p-2">
                {TABS.map((t) => {
                  const Icon = t.icon;
                  return (
                    <button key={t.id} onClick={() => setTab(t.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${tab === t.id ? 'text-white' : 'hover:bg-muted'}`}
                      style={tab === t.id ? { background: 'hsl(133 18% 59%)' } : {}}>
                      <Icon size={16} />
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-5">
              {tab === 'account' && (
                <div className="card-wellness">
                  <h2 className="text-lg font-semibold mb-6">Account Preferences</h2>
                  <div className="space-y-5">
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <div className="flex items-center gap-3">
                        <Moon size={18} className="text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">Dark Mode</div>
                          <div className="text-xs text-muted-foreground">Switch interface appearance</div>
                        </div>
                      </div>
                      <ToggleSwitch checked={theme === 'dark'} onChange={toggleTheme} />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <div className="flex items-center gap-3">
                        <Globe size={18} className="text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">Language</div>
                          <div className="text-xs text-muted-foreground">Platform display language</div>
                        </div>
                      </div>
                      <select className="text-sm bg-muted border border-border rounded-lg px-2 py-1 focus:outline-none">
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Spanish</option>
                        <option>French</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <Globe size={18} className="text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">Timezone</div>
                          <div className="text-xs text-muted-foreground">For class scheduling</div>
                        </div>
                      </div>
                      <select className="text-sm bg-muted border border-border rounded-lg px-2 py-1 focus:outline-none">
                        <option>Asia/Kolkata (IST)</option>
                        <option>America/New_York (EST)</option>
                        <option>Europe/London (GMT)</option>
                        <option>Asia/Singapore (SGT)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {tab === 'notifications' && (
                <div className="card-wellness">
                  <h2 className="text-lg font-semibold mb-6">Notification Preferences</h2>
                  <div className="space-y-4">
                    {Object.entries(notifs).map(([key, val]) => {
                      const labels: Record<string, { title: string; desc: string }> = {
                        classReminders: { title: 'Class Reminders', desc: 'Get notified 30 min before scheduled classes' },
                        communityUpdates: { title: 'Community Updates', desc: 'Activity in your groups and forums' },
                        weeklyReport: { title: 'Weekly Progress Report', desc: 'Summary of your wellness journey' },
                        newContent: { title: 'New Content Alerts', desc: 'When new classes and programs launch' },
                        promotions: { title: 'Promotions & Offers', desc: 'Special deals and membership discounts' },
                        emailDigest: { title: 'Email Digest', desc: 'Weekly digest of wellness tips' },
                      };
                      return (
                        <div key={key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                          <div>
                            <div className="text-sm font-medium">{labels[key].title}</div>
                            <div className="text-xs text-muted-foreground">{labels[key].desc}</div>
                          </div>
                          <ToggleSwitch checked={val} onChange={() => setNotifs({ ...notifs, [key]: !val })} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {tab === 'privacy' && (
                <div className="card-wellness">
                  <h2 className="text-lg font-semibold mb-6">Privacy Settings</h2>
                  <div className="space-y-4">
                    {Object.entries(privacy).map(([key, val]) => {
                      const labels: Record<string, { title: string; desc: string }> = {
                        publicProfile: { title: 'Public Profile', desc: 'Allow others to discover your profile' },
                        showProgress: { title: 'Show Progress', desc: 'Share your wellness stats with community' },
                        showGoals: { title: 'Show Goals', desc: 'Display your wellness goals publicly' },
                        dataCollection: { title: 'Analytics Collection', desc: 'Help us improve by sharing usage data' },
                      };
                      return (
                        <div key={key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                          <div>
                            <div className="text-sm font-medium">{labels[key].title}</div>
                            <div className="text-xs text-muted-foreground">{labels[key].desc}</div>
                          </div>
                          <ToggleSwitch checked={val} onChange={() => setPrivacy({ ...privacy, [key]: !val })} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {tab === 'billing' && (
                <div className="card-wellness">
                  <h2 className="text-lg font-semibold mb-6">Billing & Subscription</h2>
                  <div className="p-4 rounded-xl mb-5" style={{ background: 'hsl(133 20% 92%)' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold" style={{ color: 'hsl(133 20% 35%)' }}>Yogi Plan (Monthly)</div>
                        <div className="text-sm text-muted-foreground">$39/month · Renews Jun 15, 2026</div>
                      </div>
                      <Link to="/pricing" className="btn-primary text-xs px-3 py-1.5">Manage</Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-3">Payment Method</h3>
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-border">
                      <CreditCard size={18} className="text-muted-foreground" />
                      <span className="text-sm">•••• •••• •••• 4242</span>
                      <span className="text-xs text-muted-foreground ml-auto">Expires 12/27</span>
                    </div>
                  </div>
                </div>
              )}

              {tab === 'security' && (
                <div className="card-wellness">
                  <h2 className="text-lg font-semibold mb-6">Security Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-3 py-2.5 rounded-xl bg-muted border border-transparent focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">New Password</label>
                      <input type="password" placeholder="Min. 6 characters" className="w-full px-3 py-2.5 rounded-xl bg-muted border border-transparent focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Confirm New Password</label>
                      <input type="password" placeholder="Repeat new password" className="w-full px-3 py-2.5 rounded-xl bg-muted border border-transparent focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button (only for relevant tabs) */}
              {['notifications', 'privacy', 'security'].includes(tab) && (
                <button onClick={handleSave} disabled={saving}
                  className="btn-primary flex items-center gap-2">
                  <Check size={15} /> {saving ? 'Saving...' : 'Save Settings'}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Settings;
